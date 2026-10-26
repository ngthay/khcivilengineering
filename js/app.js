/* =========================================================
   app.js
   Reads window.KCE_DATA (from data.js) and builds the
   sidebar menu, subject cards, progress bars and quick
   links. Also runs search, dark mode, progress tracking
   and the phone menu.
   ========================================================= */

(function () {
  const { categories, sections, subjects, links } = window.KCE_DATA;

  /* ---------- Helpers ---------- */

  // localStorage can be blocked (private mode etc.), so never let it crash the page
  function load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  const byCategory = (ids) => subjects.filter((s) => ids.includes(s.category));

  // Parts of the page that only exist on index.html
  const isDashboard = !!document.getElementById('sections');

  /* ---------- 1. Sidebar menu ---------- */
  function renderSidebar() {
    // Highlight the link for the page we are on
    const page = location.pathname.split('/').pop() || 'index.html';
    const active = (href) => (href === page ? ' class="active"' : '');

    let html = `<a href="index.html"${active('index.html')}><span class="ico">🏠</span>Home</a>`;
    categories.forEach((cat) => {
      html += `<div class="nav-label">${cat.label}</div>`;
      byCategory([cat.id]).forEach((s) => {
        html += `<a href="${s.href}"${active(s.href)}><span class="ico">${s.icon}</span>${s.title}</a>`;
      });
    });
    document.getElementById('nav').innerHTML = html;
  }

  /* ---------- 2. Subject card sections ---------- */
  function cardHTML(s) {
    return `
      <a class="card" href="${s.href}">
        <div class="thumb" style="background: var(--card-${s.color})"><span>${s.icon}</span></div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </a>`;
  }

  function renderSections() {
    const html = sections.map((sec) => {
      const items = byCategory(sec.categories);
      // Sort to follow the order of sec.categories, not the order in the subjects list
      items.sort((a, b) => sec.categories.indexOf(a.category) - sec.categories.indexOf(b.category));
      const viewAll = items.length ? items[0].href : '#';
      return `
        <section class="section" data-group="${sec.id}">
          <div class="section-head">
            <h2>${sec.title}</h2>
            <a class="view-all" href="${viewAll}">View all</a>
          </div>
          <div class="cards">${items.map(cardHTML).join('')}</div>
        </section>`;
    }).join('');
    document.getElementById('sections').innerHTML = html;
  }

  /* ---------- 3. Study progress widget ---------- */
  function renderProgress() {
    document.getElementById('progressBody').innerHTML = sections.map((sec) => `
      <div class="progress-row">
        <div class="dot" style="background:${sec.progress.color}">${sec.progress.icon}</div>
        <div class="info">
          <div class="bar"><i id="bar-${sec.id}"></i></div>
          <div class="meta"><span>${sec.progress.label}</span><span id="pct-${sec.id}">0% done</span></div>
        </div>
      </div>`).join('');
  }

  /* ---------- 4. Quick links widget ---------- */
  function renderLinks() {
    document.getElementById('links').innerHTML = links.map((l) => `
      <a class="link-item" href="${l.href}" target="_blank">
        <div class="logo" style="background:${l.color}">
          <img src="${l.logo}" alt="" data-fallback="${l.fallback}">
        </div>
        <div class="info"><strong>${l.title}</strong><small>${l.subtitle}</small></div>
        <span class="btn-small">Visit</span>
      </a>`).join('');

    // Swap in the emoji when a logo image file is missing
    document.querySelectorAll('#links img').forEach((img) => {
      img.addEventListener('error', () => img.replaceWith(img.dataset.fallback));
    });
  }

  /* ---------- Progress tracking ----------
     A subject counts as done once its card has been clicked.
     Visited pages are remembered in localStorage. */
  const visited = new Set(load('visited', []));

  function updateProgress() {
    document.querySelectorAll('.section').forEach((sec) => {
      const cards = sec.querySelectorAll('.card');
      let done = 0;
      cards.forEach((card) => {
        const isVisited = visited.has(card.getAttribute('href'));
        card.classList.toggle('visited', isVisited);
        if (isVisited) done++;
      });
      const pct = cards.length ? Math.round((done / cards.length) * 100) : 0;
      document.getElementById('bar-' + sec.dataset.group).style.width = pct + '%';
      document.getElementById('pct-' + sec.dataset.group).textContent = pct + '% done';
    });
  }

  function setupProgress() {
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('click', () => {
        visited.add(card.getAttribute('href'));
        save('visited', [...visited]);
        updateProgress();
      });
    });

    // On/off switch hides or shows the bars
    const toggle = document.getElementById('progressToggle');
    toggle.addEventListener('click', () => {
      const on = toggle.getAttribute('aria-pressed') !== 'true';
      toggle.setAttribute('aria-pressed', on);
      document.getElementById('progressBody').classList.toggle('hidden', !on);
    });

    updateProgress();
  }

  /* ---------- Search: filter cards by title and description ---------- */
  function setupSearch() {
    document.getElementById('search').addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      let total = 0;
      document.querySelectorAll('.section').forEach((sec) => {
        let shown = 0;
        sec.querySelectorAll('.card').forEach((card) => {
          const match = card.textContent.toLowerCase().includes(q);
          card.style.display = match ? '' : 'none';
          if (match) shown++;
        });
        sec.style.display = shown ? '' : 'none';   // hide sections with no matches
        total += shown;
      });
      document.getElementById('empty').style.display = total ? 'none' : 'block';
    });
  }

  /* ---------- Dark mode (choice is remembered) ---------- */
  function setupTheme() {
    const root = document.documentElement;
    root.dataset.theme = load('theme', 'light');
    document.getElementById('themeBtn').addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      save('theme', root.dataset.theme);
    });
  }

  /* ---------- Phone menu (☰ opens, tapping outside closes) ---------- */
  function setupMenu() {
    const sidebar = document.getElementById('sidebar');
    document.getElementById('menuBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      document.body.classList.toggle('nav-open');
    });
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target)) document.body.classList.remove('nav-open');
    });
  }

  /* ---------- Start ---------- */
  // Shared by every page
  setupTheme();
  renderSidebar();
  setupMenu();

  // Home page only (other pages, e.g. library.js, handle their own search)
  if (isDashboard) {
    renderSections();
    renderProgress();
    renderLinks();
    setupProgress();
    setupSearch();
  }
})();
