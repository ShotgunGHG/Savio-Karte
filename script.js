/**
 * SAVIO — iOS-native digital menu
 * script.js
 */

// ══ STATE ══════════════════════════════════════════
const S = {
  menu: null,
  all: [],           // flat items with cat info
  favorites: new Set(),
  activeTab: 'home',
  activeCat: 'all',
  activeFilter: 'all',
  searchQuery: '',
  currentSheetId: null,
};

// ══ BOOT ═══════════════════════════════════════════
async function boot() {
  loadStorage();
  try {
    const r = await fetch('menu.json');
    S.menu = await r.json();
  } catch(e) {
    document.getElementById('menu-content').innerHTML =
      '<p style="text-align:center;padding:40px;color:var(--text3)">Menü nicht verfügbar.</p>';
    return;
  }
  S.menu.categories.forEach(cat => {
    cat.items.forEach(item => {
      S.all.push({ ...item, catId: cat.id, catName: cat.name, catType: cat.type, catEmoji: cat.emoji });
    });
  });
  buildCatChips();
  renderHome();
  wire();
  updateBadges();
}

// ══ STORAGE ════════════════════════════════════════
function loadStorage() {
  try {
    const f = localStorage.getItem('savio-favs');
    if (f) S.favorites = new Set(JSON.parse(f));
  } catch(e) {}
}
function saveStorage() {
  try { localStorage.setItem('savio-favs', JSON.stringify([...S.favorites])); } catch(e) {}
}

// ══ TAB NAVIGATION ═════════════════════════════════
function switchTab(tab) {
  S.activeTab = tab;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('screen-' + tab).classList.add('active');
  if (tab === 'favs') renderFavs();
  if (tab === 'search') {
    setTimeout(() => document.getElementById('search-input').focus(), 300);
  }
}

// ══ CATEGORY CHIPS ═════════════════════════════════
function buildCatChips() {
  const el = document.getElementById('cat-chips');
  const all = `<button class="chip active" data-cat="all">Alle</button>`;
  const cats = S.menu.categories.map(c =>
    `<button class="chip" data-cat="${c.id}">${c.emoji} ${c.name}</button>`
  ).join('');
  el.innerHTML = all + cats;
  el.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      S.activeCat = btn.dataset.cat;
      el.querySelectorAll('.chip').forEach(b => b.classList.toggle('active', b.dataset.cat === S.activeCat));
      renderHome();
    });
  });
}

// ══ HOME RENDER ════════════════════════════════════
function renderHome() {
  const el = document.getElementById('menu-content');
  let cats = S.menu.categories;
  if (S.activeCat !== 'all') cats = cats.filter(c => c.id === S.activeCat);

  if (cats.length === 0) { el.innerHTML = emptyHTML('Keine Ergebnisse', ''); return; }

  el.innerHTML = cats.map(cat => {
    const items = cat.items;
    const rows = items.map(item => rowHTML({ ...item, catId: cat.id, catName: cat.name, catType: cat.type, catEmoji: cat.emoji })).join('');
    return `
      <div class="cat-section" id="cat-${cat.id}">
        <div class="cat-header" onclick="toggleCat('${cat.id}')">
          <span class="cat-emoji">${cat.emoji}</span>
          <span class="cat-title">${cat.name}</span>
          <span class="cat-count">${items.length}</span>
          <span class="cat-chevron">›</span>
        </div>
        <div class="cat-rows">${rows}</div>
      </div>`;
  }).join('');
}

function rowHTML(item) {
  const isFav = S.favorites.has(item.id);
  const sub = item.ingredients || item.description || '';
  const isPopular = item.tags && item.tags.includes('popular');
  return `
    <div class="item-row" onclick="openSheet('${item.id}')">
      ${isPopular ? '<div class="popular-dot"></div>' : ''}
      <div class="item-row-body">
        <div class="item-row-name">${escHtml(item.name)}</div>
        ${sub ? `<div class="item-row-sub">${escHtml(truncate(sub, 48))}</div>` : ''}
      </div>
      <div class="item-row-right">
        <span class="item-price">${fmtPrice(item.price)}</span>
        <button class="fav-btn ${isFav ? 'active' : ''}"
          onclick="event.stopPropagation();toggleFav('${item.id}',this)"
          aria-label="Favorit">${isFav ? '❤️' : '🤍'}</button>
        <span class="row-chevron">›</span>
      </div>
    </div>`;
}

function toggleCat(id) {
  document.getElementById('cat-' + id)?.classList.toggle('collapsed');
}

// ══ SHEET (item detail) ════════════════════════════
function openSheet(itemId) {
  const item = S.all.find(i => i.id === itemId);
  if (!item) return;
  S.currentSheetId = itemId;
  const isFav = S.favorites.has(itemId);

  const tagHtml = (item.tags || []).map(t => {
    const cls = ['alcoholic','vegetarian','vegan','popular','signature'].includes(t) ? `tag-${t}` : 'tag-default';
    const lbl = {alcoholic:'Alkoholisch',vegetarian:'Vegetarisch',vegan:'Vegan',popular:'⭐ Beliebt',signature:'✦ Signature',food:'Essen',drinks:'Getränke'}[t] || t;
    return `<span class="sheet-tag ${cls}">${lbl}</span>`;
  }).join('');

  document.getElementById('sheet-body').innerHTML = `
    <p class="sheet-cat">${item.catEmoji} ${item.catName}</p>
    <p class="sheet-name">${escHtml(item.name)}</p>
    <p class="sheet-price">${fmtPrice(item.price)}${item.volume ? ` <span class="sheet-volume">/ ${item.volume}</span>` : ''}</p>
    ${tagHtml ? `<div class="sheet-tags">${tagHtml}</div>` : ''}
    ${item.description ? `<div class="sheet-divider"></div><p class="sheet-label">Beschreibung</p><p class="sheet-value">${escHtml(item.description)}</p>` : ''}
    ${item.ingredients ? `<div class="sheet-divider"></div><p class="sheet-label">Zutaten</p><p class="sheet-value">${escHtml(item.ingredients)}</p>` : ''}
    ${item.allergens ? `<div class="sheet-divider"></div><p class="sheet-label">Allergene</p><p class="sheet-value">${escHtml(item.allergens)}</p>` : ''}
    <div class="sheet-divider"></div>
    <button class="sheet-fav-btn ${isFav ? 'active' : ''}" id="sheet-fav-btn" onclick="toggleFavSheet('${itemId}')">
      ${isFav ? '❤️  Aus Favoriten entfernen' : '🤍  Zu Favoriten hinzufügen'}
    </button>`;

  document.getElementById('sheet-backdrop').hidden = false;
  document.getElementById('item-sheet').hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeSheet() {
  document.getElementById('sheet-backdrop').hidden = true;
  document.getElementById('item-sheet').hidden = true;
  document.body.style.overflow = '';
  S.currentSheetId = null;
}

// ══ FAVORITES ══════════════════════════════════════
function toggleFav(id, btn) {
  const isNowFav = !S.favorites.has(id);
  if (isNowFav) S.favorites.add(id); else S.favorites.delete(id);
  saveStorage();
  updateBadges();
  if (btn) {
    btn.textContent = isNowFav ? '❤️' : '🤍';
    btn.classList.toggle('active', isNowFav);
  }
  if (S.activeTab === 'favs') renderFavs();
}

function toggleFavSheet(id) {
  const isNowFav = !S.favorites.has(id);
  if (isNowFav) S.favorites.add(id); else S.favorites.delete(id);
  saveStorage();
  updateBadges();
  const btn = document.getElementById('sheet-fav-btn');
  if (btn) {
    btn.textContent = isNowFav ? '❤️  Aus Favoriten entfernen' : '🤍  Zu Favoriten hinzufügen';
    btn.classList.toggle('active', isNowFav);
  }
  // Update row button in background
  const rowBtn = document.querySelector(`.fav-btn[onclick*="'${id}'"]`);
  if (rowBtn) { rowBtn.textContent = isNowFav ? '❤️' : '🤍'; rowBtn.classList.toggle('active', isNowFav); }
  if (S.activeTab === 'favs') renderFavs();
}

function updateBadges() {
  const n = S.favorites.size;
  ['fav-badge','tab-fav-badge'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = n;
    el.hidden = n === 0;
  });
}

function renderFavs() {
  const el = document.getElementById('fav-content');
  if (S.favorites.size === 0) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">🤍</div><p class="empty-title">Keine Favoriten</p><p class="empty-sub">Tippe auf ♡ um Artikel zu speichern</p></div>`;
    return;
  }

  // Group by category
  const grouped = new Map();
  S.menu.categories.forEach(cat => {
    const items = cat.items.filter(i => S.favorites.has(i.id));
    if (items.length) grouped.set(cat, items);
  });

  el.innerHTML = [...grouped.entries()].map(([cat, items]) => `
    <p class="fav-section-label">${cat.emoji} ${cat.name}</p>
    <div class="results-group">
      ${items.map(item => rowHTML({ ...item, catId: cat.id, catName: cat.name, catType: cat.type, catEmoji: cat.emoji })).join('')}
    </div>`).join('');
}

// ══ SEARCH ═════════════════════════════════════════
let searchTimer;
function handleSearch(query) {
  S.searchQuery = query;
  document.getElementById('search-clear').hidden = !query;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => renderSearch(), 120);
}

function renderSearch() {
  const el = document.getElementById('search-results');
  const q = S.searchQuery.trim().toLowerCase();
  const f = S.activeFilter;

  if (!q && f === 'all') {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><p class="empty-title">Nach Getränken suchen</p><p class="empty-sub">Name, Zutat oder Kategorie</p></div>`;
    return;
  }

  let items = [...S.all];

  if (f !== 'all') {
    if (f === 'food') items = items.filter(i => i.catType === 'food');
    else if (f === 'drinks') items = items.filter(i => i.catType === 'drinks');
    else items = items.filter(i => i.tags && i.tags.includes(f));
  }

  if (q) {
    items = items.filter(i =>
      i.name.toLowerCase().includes(q) ||
      (i.description && i.description.toLowerCase().includes(q)) ||
      (i.ingredients && i.ingredients.toLowerCase().includes(q)) ||
      i.catName.toLowerCase().includes(q)
    );
  }

  if (!items.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">😕</div><p class="empty-title">Nichts gefunden</p><p class="empty-sub">Anderen Begriff versuchen</p></div>`;
    return;
  }

  // Group by category
  const grouped = new Map();
  S.menu.categories.forEach(cat => {
    const catItems = items.filter(i => i.catId === cat.id);
    if (catItems.length) grouped.set(cat, catItems);
  });

  el.innerHTML = [...grouped.entries()].map(([cat, catItems]) => `
    <p class="results-group-label">${cat.emoji} ${cat.name}</p>
    <div class="results-group">
      ${catItems.map(item => {
        const hi = q ? highlightItem(item, q) : item;
        return rowHTML(hi);
      }).join('')}
    </div>`).join('');
}

function highlightItem(item, q) {
  return {
    ...item,
    name: hl(item.name, q),
    ingredients: item.ingredients ? hl(item.ingredients, q) : item.ingredients,
    description: item.description ? hl(item.description, q) : item.description,
  };
}
function hl(text, q) {
  if (!text || !q) return text;
  const safe = q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  return text.replace(new RegExp(`(${safe})`,'gi'),'<mark>$1</mark>');
}

// ══ RANDOM ═════════════════════════════════════════
function showRandom(type) {
  const pool = S.all.filter(i => i.catType === type);
  if (!pool.length) return;
  const item = pool[Math.floor(Math.random() * pool.length)];
  showToast(item);
}

function showToast(item) {
  const el = document.getElementById('toast');
  el.innerHTML = `<strong>${escHtml(item.name)}</strong>${fmtPrice(item.price)} · ${item.catEmoji} ${item.catName}<br><button class="toast-open-btn" onclick="openSheet('${item.id}');hideToast()">Details ansehen</button>`;
  el.hidden = false;
  clearTimeout(el._t);
  el._t = setTimeout(hideToast, 5000);
}
function hideToast() { document.getElementById('toast').hidden = true; }
window.hideToast = hideToast;

// ══ HELPERS ════════════════════════════════════════
function fmtPrice(p) { return `€\u202f${p.toFixed(2).replace('.',',')}` }
function truncate(s, n) { return s.length > n ? s.slice(0, n) + '…' : s; }
function escHtml(s) { return s ? s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : ''; }
function emptyHTML(title, sub) {
  return `<div class="empty-state"><div class="empty-icon">📋</div><p class="empty-title">${title}</p><p class="empty-sub">${sub}</p></div>`;
}

// Expose globals for inline handlers
window.openSheet = openSheet;
window.toggleFav = toggleFav;
window.toggleFavSheet = toggleFavSheet;
window.toggleCat = toggleCat;
window.renderFavs = renderFavs;
window.updateBadges = updateBadges;

// ══ WIRE ═══════════════════════════════════════════
function wire() {
  // Tabs
  document.querySelectorAll('.tab').forEach(t =>
    t.addEventListener('click', () => switchTab(t.dataset.tab)));

  // Favorites shortcut in home nav
  document.getElementById('btn-fav-open')?.addEventListener('click', () => switchTab('favs'));

  // Random
  document.getElementById('btn-random-drink').addEventListener('click', () => showRandom('drinks'));
  document.getElementById('btn-random-food').addEventListener('click', () => showRandom('food'));

  // Sheet close
  document.getElementById('sheet-backdrop').addEventListener('click', closeSheet);

  // Search input
  const inp = document.getElementById('search-input');
  inp.addEventListener('input', e => handleSearch(e.target.value));
  document.getElementById('search-clear').addEventListener('click', () => {
    inp.value = ''; handleSearch(''); inp.focus();
  });
  document.getElementById('search-cancel').addEventListener('click', () => {
    inp.value = ''; handleSearch(''); switchTab('home');
  });

  // Filter chips in search
  document.querySelectorAll('#filter-chips .chip').forEach(btn => {
    btn.addEventListener('click', () => {
      S.activeFilter = btn.dataset.filter;
      document.querySelectorAll('#filter-chips .chip').forEach(b =>
        b.classList.toggle('active', b.dataset.filter === S.activeFilter));
      renderSearch();
    });
  });

  // Swipe down to close sheet
  const sheet = document.getElementById('item-sheet');
  let startY = 0;
  sheet.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  sheet.addEventListener('touchend', e => {
    if (e.changedTouches[0].clientY - startY > 80) closeSheet();
  }, { passive: true });

  // Keyboard ESC
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
}

// ══ GO ═════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', boot);
