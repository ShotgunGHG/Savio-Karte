# Savio Menu Sync — Setup

The daily menu sync runs automatically via GitHub Actions every day at 08:00 Vienna time.
It scrapes both Café Savio menu pages, diffs them against the last known state,
and emails you if anything changed.

## One-time Setup (5 minutes)

### 1. Add these 3 Secrets to your GitHub repo

Go to: **Settings → Secrets and variables → Actions → New repository secret**

| Secret name      | Value                                      |
|------------------|--------------------------------------------|
| `NOTIFY_EMAIL`   | Your email address (where to send alerts)  |
| `MAIL_USERNAME`  | A Gmail address to send FROM               |
| `MAIL_PASSWORD`  | Gmail App Password (not your normal password — see below) |

### 2. Create a Gmail App Password

1. Go to myaccount.google.com → Security
2. Enable 2-Step Verification (if not already on)
3. Search for "App passwords"
4. Create one named "Savio Bot" → copy the 16-character password
5. Paste it as `MAIL_PASSWORD` secret

### 3. That's it

The workflow runs daily at 06:00 UTC automatically.
You can also trigger it manually: **Actions tab → Daily Menu Sync → Run workflow**

## What it checks

- ✅ New items added to the menu
- ✅ Items removed from the menu  
- ✅ Price changes (any item)
- ✅ Description / ingredient changes

## What happens when changes are found

1. `menu.json` is automatically patched with the new prices
2. The change is committed back to the repo
3. GitHub Pages redeploys automatically (takes ~1 minute)
4. You receive an email with a full breakdown of what changed

## Files

- `.github/workflows/menu-sync.yml` — the GitHub Actions workflow
- `scripts/sync_menu.py` — the scraper and diff logic
- `scripts/menu_snapshot.json` — the last known state (auto-updated)
