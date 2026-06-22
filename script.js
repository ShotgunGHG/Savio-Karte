/**
 * SAVIO — iOS-native digital menu
 * Tabs: Getränke | Speisen | Suche
 */

const S = {
  menu: null,
  all: [],
  activeTab: 'drinks',
  drinksCat: 'all',
  foodCat: 'all',
  activeFilter: 'all',
  searchQuery: '',
};

// ══ BOOT ═══════════════════════════════════════════
async function boot() {
  try {
    const r = await fetch('menu.json');
    S.menu = await r.json();
  } catch(e) {
    document.getElementById('drinks-content').innerHTML =
      '<p style="text-align:center;padding:40px;color:var(--text3)">Menü nicht verfügbar.</p>';
    return;
  }

  S.menu.categories.forEach(cat => {
    cat.items.forEach(item => {
      S.all.push({ ...item, catId: cat.id, catName: cat.name, catType: cat.type, catEmoji: cat.emoji });
    });
  });

  buildChips('drinks');
  buildChips('food');
  renderDrinks();
  renderFood();
  wire();
}

// ══ TAB SWITCHING ══════════════════════════════════
function switchTab(tab) {
  S.activeTab = tab;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('screen-' + tab).classList.add('active');
  if (tab === 'search') setTimeout(() => document.getElementById('search-input').focus(), 280);
}

// ══ CATEGORY CHIPS ═════════════════════════════════
function buildChips(type) {
  const el = document.getElementById(type + '-chips');
  const cats = S.menu.categories.filter(c => c.type === type);
  const allBtn = `<button class="chip active" data-cat="all" data-type="${type}">Alle</button>`;
  const catBtns = cats.map(c =>
    `<button class="chip" data-cat="${c.id}" data-type="${type}">${c.emoji} ${c.name}</button>`
  ).join('');
  el.innerHTML = allBtn + catBtns;
  el.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      if (type === 'drinks') S.drinksCat = btn.dataset.cat;
      else S.foodCat = btn.dataset.cat;
      el.querySelectorAll('.chip').forEach(b => b.classList.toggle('active', b.dataset.cat === btn.dataset.cat));
      if (type === 'drinks') renderDrinks();
      else renderFood();
    });
  });
}

// ══ RENDER DRINKS ══════════════════════════════════
function renderDrinks() {
  renderType('drinks', 'drinks-content', S.drinksCat);
}
function renderFood() {
  renderType('food', 'food-content', S.foodCat);
}

function renderType(type, elId, activeCat) {
  const el = document.getElementById(elId);
  let cats = S.menu.categories.filter(c => c.type === type);
  if (activeCat !== 'all') cats = cats.filter(c => c.id === activeCat);
  if (!cats.length) { el.innerHTML = ''; return; }
  el.innerHTML = cats.map(cat => catSection(cat, cat.items)).join('');
}

// ══ RENDER HELPERS ═════════════════════════════════
function catSection(cat, items) {
  return `
    <div class="cat-section" id="cat-${cat.id}">
      <div class="cat-header" onclick="toggleCat('${cat.id}')">
        <span class="cat-emoji">${cat.emoji}</span>
        <span class="cat-title">${cat.name}</span>
        <span class="cat-count">${items.length}</span>
        <span class="cat-chevron">›</span>
      </div>
      <div class="cat-rows">${items.map(item => rowHTML({
        ...item, catId: cat.id, catName: cat.name, catType: cat.type, catEmoji: cat.emoji
      })).join('')}</div>
    </div>`;
}

function rowHTML(item) {
  const sub = item.ingredients || item.description || '';
  const isPopular = item.tags && item.tags.includes('popular');
  return `
    <div class="item-row" onclick="openSheet('${item.id}')">
      ${isPopular ? '<div class="popular-dot"></div>' : ''}
      <div class="item-row-body">
        <div class="item-row-name">${escHtml(item.name)}</div>
        ${sub ? `<div class="item-row-sub">${escHtml(truncate(sub, 52))}</div>` : ''}
      </div>
      <div class="item-row-right">
        <span class="item-price">${fmtPrice(item.price)}</span>
        <span class="row-chevron">›</span>
      </div>
    </div>`;
}

function toggleCat(id) {
  document.getElementById('cat-' + id)?.classList.toggle('collapsed');
}

// ══ SHEET ══════════════════════════════════════════
function openSheet(itemId) {
  const item = S.all.find(i => i.id === itemId);
  if (!item) return;

  const tagHtml = (item.tags || []).map(t => {
    const cls = ['alcoholic','vegetarian','vegan','popular','signature'].includes(t) ? `tag-${t}` : 'tag-default';
    const lbl = { alcoholic:'Alkoholisch', vegetarian:'Vegetarisch', vegan:'Vegan',
                  popular:'⭐ Beliebt', signature:'✦ Signature' }[t] || t;
    return `<span class="sheet-tag ${cls}">${lbl}</span>`;
  }).join('');

  document.getElementById('sheet-body').innerHTML = `
    <p class="sheet-cat">${item.catEmoji} ${item.catName}</p>
    <p class="sheet-name">${escHtml(item.name)}</p>
    <p class="sheet-price">${fmtPrice(item.price)}${item.volume ? ` <span class="sheet-volume">/ ${item.volume}</span>` : ''}</p>
    ${tagHtml ? `<div class="sheet-tags">${tagHtml}</div>` : ''}
    ${item.description ? `<div class="sheet-divider"></div><p class="sheet-label">Beschreibung</p><p class="sheet-value">${escHtml(item.description)}</p>` : ''}
    ${item.ingredients ? `<div class="sheet-divider"></div><p class="sheet-label">Zutaten</p><p class="sheet-value">${escHtml(item.ingredients)}</p>` : ''}
    ${item.allergens ? `<div class="sheet-divider"></div><p class="sheet-label">Allergene</p><p class="sheet-value">${escHtml(item.allergens)}</p>` : ''}`;

  document.getElementById('sheet-backdrop').hidden = false;
  document.getElementById('item-sheet').hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeSheet() {
  document.getElementById('sheet-backdrop').hidden = true;
  document.getElementById('item-sheet').hidden = true;
  document.body.style.overflow = '';
}

// ══ SEARCH ═════════════════════════════════════════
let searchTimer;
function handleSearch(query) {
  S.searchQuery = query;
  document.getElementById('search-clear').hidden = !query;
  clearTimeout(searchTimer);
  searchTimer = setTimeout(renderSearch, 120);
}

function renderSearch() {
  const el = document.getElementById('search-results');
  const q = S.searchQuery.trim().toLowerCase();
  const f = S.activeFilter;

  if (!q && f === 'all') {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><p class="empty-title">Suchen…</p><p class="empty-sub">Name, Zutat oder Kategorie</p></div>`;
    return;
  }

  let items = [...S.all];
  if (f === 'drinks') items = items.filter(i => i.catType === 'drinks');
  else if (f === 'food') items = items.filter(i => i.catType === 'food');
  else if (f !== 'all') items = items.filter(i => i.tags && i.tags.includes(f));

  if (q) items = items.filter(i =>
    i.name.toLowerCase().includes(q) ||
    (i.description && i.description.toLowerCase().includes(q)) ||
    (i.ingredients && i.ingredients.toLowerCase().includes(q)) ||
    i.catName.toLowerCase().includes(q)
  );

  if (!items.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-icon">😕</div><p class="empty-title">Nichts gefunden</p><p class="empty-sub">Anderen Begriff versuchen</p></div>`;
    return;
  }

  const grouped = new Map();
  S.menu.categories.forEach(cat => {
    const ci = items.filter(i => i.catId === cat.id);
    if (ci.length) grouped.set(cat, ci);
  });

  el.innerHTML = [...grouped.entries()].map(([cat, ci]) => `
    <p class="results-group-label">${cat.emoji} ${cat.name}</p>
    <div class="results-group">
      ${ci.map(item => rowHTML(item)).join('')}
    </div>`).join('');
}

// ══ RANDOM TOAST ═══════════════════════════════════
function showRandom(type) {
  const pool = S.all.filter(i => i.catType === type);
  if (!pool.length) return;
  const item = pool[Math.floor(Math.random() * pool.length)];
  const el = document.getElementById('toast');
  el.innerHTML = `<strong>${escHtml(item.name)}</strong>${fmtPrice(item.price)} · ${item.catEmoji} ${item.catName}
    <br><button class="toast-open-btn" onclick="openSheet('${item.id}');hideToast()">Details ansehen</button>`;
  el.hidden = false;
  clearTimeout(el._t);
  el._t = setTimeout(hideToast, 5000);
}
function hideToast() { document.getElementById('toast').hidden = true; }
window.hideToast = hideToast;

// ══ HELPERS ════════════════════════════════════════
function fmtPrice(p) { return `€\u202f${p.toFixed(2).replace('.', ',')}` }
function truncate(s, n) { return s.length > n ? s.slice(0, n) + '…' : s; }
function escHtml(s) { return s ? s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : ''; }

window.openSheet = openSheet;
window.toggleCat = toggleCat;

// ══ WIRE ═══════════════════════════════════════════
function wire() {
  document.querySelectorAll('.tab').forEach(t =>
    t.addEventListener('click', () => switchTab(t.dataset.tab)));

  document.getElementById('btn-random-drink').addEventListener('click', () => showRandom('drinks'));
  document.getElementById('btn-random-food').addEventListener('click', () => showRandom('food'));

  document.getElementById('sheet-backdrop').addEventListener('click', closeSheet);

  const inp = document.getElementById('search-input');
  inp.addEventListener('input', e => handleSearch(e.target.value));
  document.getElementById('search-clear').addEventListener('click', () => {
    inp.value = ''; handleSearch(''); inp.focus();
  });
  document.getElementById('search-cancel').addEventListener('click', () => {
    inp.value = ''; handleSearch(''); switchTab('drinks');
  });

  document.querySelectorAll('#filter-chips .chip').forEach(btn => {
    btn.addEventListener('click', () => {
      S.activeFilter = btn.dataset.filter;
      document.querySelectorAll('#filter-chips .chip').forEach(b =>
        b.classList.toggle('active', b.dataset.filter === S.activeFilter));
      renderSearch();
    });
  });

  // Swipe down sheet
  const sheet = document.getElementById('item-sheet');
  let startY = 0;
  sheet.addEventListener('touchstart', e => { startY = e.touches[0].clientY; }, { passive: true });
  sheet.addEventListener('touchend', e => {
    if (e.changedTouches[0].clientY - startY > 80) closeSheet();
  }, { passive: true });

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
}

document.addEventListener('DOMContentLoaded', boot);
