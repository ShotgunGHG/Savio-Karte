"""
sync_menu.py — Savio Menu Sync Bot
====================================
Scrapes both official Café Savio menu pages once per day,
compares them to the current menu.json and a raw snapshot,
detects any changes (price changes, new items, removed items,
description/ingredient changes), updates menu.json if needed,
and outputs a GitHub Actions summary + email body.

URLs monitored:
  - https://cafe-savio.at/cafe/getraenke/  (drinks)
  - https://cafe-savio.at/cafe/snacks/     (food)
"""

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# ── CONFIG ─────────────────────────────────────────────────────────
URLS = {
    "drinks": "https://cafe-savio.at/cafe/getraenke/",
    "food":   "https://cafe-savio.at/cafe/snacks/",
}
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; SavioMenuBot/1.0; "
        "+https://github.com/ShotgunGHG/Savio-Kart)"
    )
}
TIMEOUT = 20

ROOT        = Path(__file__).parent.parent
MENU_JSON   = ROOT / "menu.json"
SNAPSHOT    = Path(__file__).parent / "menu_snapshot.json"
GITHUB_OUT  = os.environ.get("GITHUB_OUTPUT", "")

# ── HELPERS ────────────────────────────────────────────────────────

def gh_output(key: str, value: str):
    """Write a key=value pair to GitHub Actions output."""
    if GITHUB_OUT:
        with open(GITHUB_OUT, "a") as f:
            # Multiline values need the heredoc syntax
            if "\n" in value:
                delim = "EOF_DELIM"
                f.write(f"{key}<<{delim}\n{value}\n{delim}\n")
            else:
                f.write(f"{key}={value}\n")
    else:
        print(f"[OUTPUT] {key}={value[:80]}{'...' if len(value) > 80 else ''}")


def clean(text: str) -> str:
    """Normalise whitespace."""
    return re.sub(r"\s+", " ", text).strip()


def parse_price(raw: str) -> float | None:
    """Extract a float price from a string like '€ 8,50' or '8.50'."""
    raw = raw.replace(",", ".").replace("€", "").replace("EUR", "")
    m = re.search(r"\d+\.\d{1,2}", raw)
    if m:
        return float(m.group())
    m = re.search(r"\d+", raw)
    if m:
        return float(m.group())
    return None


# ── SCRAPING ───────────────────────────────────────────────────────

def fetch_page(url: str) -> BeautifulSoup:
    resp = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, "html.parser")


def scrape_items(soup: BeautifulSoup, page_type: str) -> list[dict]:
    """
    Generic extractor — tries multiple common WordPress/WooCommerce
    menu plugin structures used by cafe-savio.at.
    Returns a flat list of dicts: {name, price, description, ingredients, raw_text}
    """
    items = []

    # Strategy 1: look for structured menu/price list elements
    # Common selectors used by FoodMenu, WP Restaurant Menu, custom themes
    selectors = [
        "div.menu-item",
        "div.food-menu-item",
        "li.menu-item",
        "div.menu_item",
        "article.menu-item",
        "div.menu-list-item",
        "tr.menu-row",
        "div.wp-block-group",   # Gutenberg blocks
        "div.elementor-widget-text-editor",
    ]

    found_structured = False
    for sel in selectors:
        elements = soup.select(sel)
        if len(elements) >= 3:
            found_structured = True
            for el in elements:
                name_el = (
                    el.select_one(".menu-item-name, .item-name, .food-name, h3, h4, h5, strong")
                )
                price_el = (
                    el.select_one(".menu-item-price, .item-price, .food-price, .price, span.price")
                )
                desc_el = (
                    el.select_one(".menu-item-description, .item-description, .food-description, p")
                )
                if not name_el:
                    continue
                name = clean(name_el.get_text())
                price_raw = clean(price_el.get_text()) if price_el else ""
                price = parse_price(price_raw)
                desc = clean(desc_el.get_text()) if desc_el else ""
                if name and len(name) > 1:
                    items.append({
                        "name": name,
                        "price": price,
                        "description": desc,
                        "raw": clean(el.get_text()),
                        "type": page_type,
                    })
            break

    # Strategy 2: regex over full page text — find lines with a price pattern
    if not found_structured or len(items) < 3:
        items = []
        full_text = soup.get_text(separator="\n")
        lines = [clean(l) for l in full_text.splitlines() if clean(l)]

        # Price pattern: optional € then digits, comma/dot, two digits
        price_re = re.compile(r"€?\s*(\d{1,3}[.,]\d{2})\s*€?")

        i = 0
        while i < len(lines):
            line = lines[i]
            m = price_re.search(line)
            if m:
                price_str = m.group(1)
                price = parse_price(price_str)
                # Name is likely the line before the price or the text before the price on the same line
                name_part = line[:m.start()].strip(" ·–—-")
                if not name_part and i > 0:
                    name_part = lines[i - 1]
                desc = lines[i + 1] if i + 1 < len(lines) and not price_re.search(lines[i + 1]) else ""
                if name_part and len(name_part) > 1 and not price_re.search(name_part):
                    items.append({
                        "name": clean(name_part),
                        "price": price,
                        "description": clean(desc),
                        "raw": line,
                        "type": page_type,
                    })
            i += 1

    # Deduplicate by name (keep first occurrence)
    seen = set()
    unique = []
    for item in items:
        key = item["name"].lower()
        if key not in seen and len(item["name"]) > 1:
            seen.add(key)
            unique.append(item)

    return unique


# ── DIFFING ────────────────────────────────────────────────────────

def build_snapshot_from_scraped(drinks: list, food: list) -> dict:
    """Turn scraped items into a keyed snapshot dict for easy diffing."""
    snapshot = {}
    for item in drinks + food:
        key = item["name"].lower().strip()
        snapshot[key] = item
    return snapshot


def load_snapshot() -> dict:
    if SNAPSHOT.exists():
        return json.loads(SNAPSHOT.read_text(encoding="utf-8"))
    return {}


def diff_snapshots(old: dict, new: dict) -> dict:
    """Compare old and new snapshots. Returns categorised changes."""
    changes = {
        "added":   [],
        "removed": [],
        "price_changed": [],
        "description_changed": [],
    }

    old_keys = set(old.keys())
    new_keys = set(new.keys())

    for key in new_keys - old_keys:
        changes["added"].append(new[key])

    for key in old_keys - new_keys:
        changes["removed"].append(old[key])

    for key in old_keys & new_keys:
        o, n = old[key], new[key]
        if o.get("price") is not None and n.get("price") is not None:
            if abs((o["price"] or 0) - (n["price"] or 0)) > 0.005:
                changes["price_changed"].append({
                    "name":      n["name"],
                    "old_price": o["price"],
                    "new_price": n["price"],
                    "type":      n["type"],
                })
        if o.get("description") != n.get("description") and n.get("description"):
            changes["description_changed"].append({
                "name": n["name"],
                "old":  o.get("description", ""),
                "new":  n.get("description", ""),
            })

    return changes


def has_changes(diff: dict) -> bool:
    return any(diff[k] for k in diff)


# ── REPORTING ──────────────────────────────────────────────────────

def build_summary(diff: dict) -> str:
    parts = []
    if diff["added"]:
        parts.append(f"{len(diff['added'])} neu")
    if diff["removed"]:
        parts.append(f"{len(diff['removed'])} entfernt")
    if diff["price_changed"]:
        parts.append(f"{len(diff['price_changed'])} Preisänderung(en)")
    if diff["description_changed"]:
        parts.append(f"{len(diff['description_changed'])} Beschreibungsänderung(en)")
    return ", ".join(parts) if parts else "Keine Änderungen"


def build_email_body(diff: dict, now: str) -> str:
    lines = [
        f"Savio Menu Sync — {now}",
        "=" * 48,
        "",
    ]

    if diff["added"]:
        lines.append(f"🆕 NEUE ITEMS ({len(diff['added'])}):")
        for item in diff["added"]:
            price_str = f"€ {item['price']:.2f}".replace(".", ",") if item.get("price") else "Preis unbekannt"
            lines.append(f"  + {item['name']} — {price_str}")
        lines.append("")

    if diff["removed"]:
        lines.append(f"❌ ENTFERNTE ITEMS ({len(diff['removed'])}):")
        for item in diff["removed"]:
            lines.append(f"  - {item['name']}")
        lines.append("")

    if diff["price_changed"]:
        lines.append(f"💰 PREISÄNDERUNGEN ({len(diff['price_changed'])}):")
        for ch in diff["price_changed"]:
            old = f"€ {ch['old_price']:.2f}".replace(".", ",")
            new = f"€ {ch['new_price']:.2f}".replace(".", ",")
            lines.append(f"  ~ {ch['name']}: {old} → {new}")
        lines.append("")

    if diff["description_changed"]:
        lines.append(f"📝 BESCHREIBUNGSÄNDERUNGEN ({len(diff['description_changed'])}):")
        for ch in diff["description_changed"]:
            lines.append(f"  ~ {ch['name']}")
            lines.append(f"    Vorher: {ch['old'][:80]}")
            lines.append(f"    Nachher: {ch['new'][:80]}")
        lines.append("")

    lines += [
        "—",
        "Quellen:",
        "  https://cafe-savio.at/cafe/getraenke/",
        "  https://cafe-savio.at/cafe/snacks/",
        "",
        "menu.json wurde automatisch aktualisiert und committed.",
        "Bitte prüfe das Repository: https://github.com/ShotgunGHG/Savio-Kart",
    ]

    return "\n".join(lines)


def print_github_summary(diff: dict, now: str):
    """Write a Markdown summary to GitHub Actions job summary."""
    summary_file = os.environ.get("GITHUB_STEP_SUMMARY", "")
    if not summary_file:
        return

    lines = [f"## ☕ Savio Menu Sync — {now}\n"]

    if not has_changes(diff):
        lines.append("✅ **Keine Änderungen** — Menü ist aktuell.\n")
    else:
        if diff["added"]:
            lines.append(f"### 🆕 Neue Items ({len(diff['added'])})\n")
            for item in diff["added"]:
                price_str = f"€ {item['price']:.2f}".replace(".", ",") if item.get("price") else "?"
                lines.append(f"- **{item['name']}** — {price_str}")
            lines.append("")

        if diff["removed"]:
            lines.append(f"### ❌ Entfernte Items ({len(diff['removed'])})\n")
            for item in diff["removed"]:
                lines.append(f"- ~~{item['name']}~~")
            lines.append("")

        if diff["price_changed"]:
            lines.append(f"### 💰 Preisänderungen ({len(diff['price_changed'])})\n")
            lines.append("| Item | Alt | Neu |")
            lines.append("|------|-----|-----|")
            for ch in diff["price_changed"]:
                old = f"€ {ch['old_price']:.2f}".replace(".", ",")
                new = f"€ {ch['new_price']:.2f}".replace(".", ",")
                lines.append(f"| {ch['name']} | {old} | **{new}** |")
            lines.append("")

        if diff["description_changed"]:
            lines.append(f"### 📝 Beschreibungsänderungen ({len(diff['description_changed'])})\n")
            for ch in diff["description_changed"]:
                lines.append(f"- **{ch['name']}**")
            lines.append("")

    with open(summary_file, "a") as f:
        f.write("\n".join(lines))


# ── MAIN ───────────────────────────────────────────────────────────

def main():
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    print(f"[{now}] Starting Savio menu sync...")

    # 1. Scrape both pages
    scraped_drinks, scraped_food = [], []
    errors = []

    for page_type, url in URLS.items():
        try:
            print(f"  Fetching {url} ...")
            soup = fetch_page(url)
            items = scrape_items(soup, page_type)
            print(f"  Found {len(items)} items on {page_type} page.")
            if page_type == "drinks":
                scraped_drinks = items
            else:
                scraped_food = items
        except Exception as e:
            errors.append(f"{url}: {e}")
            print(f"  ERROR: {e}", file=sys.stderr)

    if errors:
        # Don't overwrite good data if scrape failed
        print("Scrape errors — aborting update to avoid data loss.", file=sys.stderr)
        gh_output("changes_found", "false")
        gh_output("summary", "Scrape-Fehler — kein Update")
        sys.exit(0)

    if len(scraped_drinks) + len(scraped_food) < 5:
        print("Too few items scraped — site structure may have changed. Skipping.", file=sys.stderr)
        gh_output("changes_found", "false")
        gh_output("summary", "Zu wenig Items gescraped — manuell prüfen")
        sys.exit(0)

    # 2. Build new snapshot
    new_snapshot = build_snapshot_from_scraped(scraped_drinks, scraped_food)

    # 3. Load old snapshot and diff
    old_snapshot = load_snapshot()
    diff = diff_snapshots(old_snapshot, new_snapshot)

    print_github_summary(diff, now)

    if not has_changes(diff):
        print("  No changes detected.")
        gh_output("changes_found", "false")
        gh_output("summary", "Keine Änderungen")
        # Always save fresh snapshot timestamp
        SNAPSHOT.write_text(json.dumps(new_snapshot, ensure_ascii=False, indent=2), encoding="utf-8")
        return

    # 4. Changes found — report
    summary = build_summary(diff)
    email_body = build_email_body(diff, now)
    print(f"  Changes found: {summary}")

    gh_output("changes_found", "true")
    gh_output("summary", summary)
    gh_output("email_body", email_body)

    # 5. Update the snapshot file (menu.json update is manual — bot flags it)
    SNAPSHOT.write_text(json.dumps(new_snapshot, ensure_ascii=False, indent=2), encoding="utf-8")

    # 6. Patch menu.json prices for items we can confidently match by name
    try:
        menu = json.loads(MENU_JSON.read_text(encoding="utf-8"))
        patched = 0
        for cat in menu["categories"]:
            for item in cat["items"]:
                key = item["name"].lower().strip()
                if key in new_snapshot:
                    scraped = new_snapshot[key]
                    if scraped.get("price") and abs((item.get("price") or 0) - scraped["price"]) > 0.005:
                        print(f"  Patching price: {item['name']} {item.get('price')} → {scraped['price']}")
                        item["price"] = scraped["price"]
                        patched += 1
                    if scraped.get("description") and scraped["description"] != item.get("description", ""):
                        item["description"] = scraped["description"]
        if patched:
            MENU_JSON.write_text(json.dumps(menu, ensure_ascii=False, indent=2), encoding="utf-8")
            print(f"  Patched {patched} items in menu.json.")
    except Exception as e:
        print(f"  Could not patch menu.json: {e}", file=sys.stderr)


if __name__ == "__main__":
    main()
