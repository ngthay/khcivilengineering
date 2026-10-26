/* =========================================================
   library.js
   Builds library.html from window.KCE_BOOKS (js/books.js):
   shelf filter buttons, book covers or list rows, the
   icon / list view switch, and search by title / author.
   ========================================================= */

(function () {
  const { folders, books } = window.KCE_BOOKS;
  const folderById = Object.fromEntries(folders.map((f) => [f.id, f]));
  const DEFAULT_FOLDER = { id: '', label: 'Other', icon: '📚', color: 'blue' };

  let activeShelf = 'all';
  let view = load('libraryView', 'grid');   // 'grid' (icons) or 'list'
  let query = '';

  /* ---------- Helpers ---------- */
  function load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  const folderOf = (b) => folderById[b.folder] || DEFAULT_FOLDER;
  const fileType = (b) => b.file.split('.').pop().toUpperCase();   // PDF, DOCX, ...
  const metaOf = (b) => [b.author, b.year].filter(Boolean).join(' · ');

  // Cover picture: `cover` if given, otherwise a .jpg with the same name as the book
  // (made by tools/make-covers.py). If the picture is missing it removes itself and
  // the colored cover underneath shows instead.
  const coverImg = (b, cls) => {
    const src = b.cover || b.file.replace(/\.[^./]+$/, '.jpg');
    return `<img class="${cls}" src="${encodeURI(src)}" alt="" onerror="this.remove()">`;
  };

  /* ---------- Shelf filter buttons ---------- */
  function renderShelves() {
    // Only show shelves that actually have books
    const used = folders.filter((f) => books.some((b) => b.folder === f.id));
    const chips = [{ id: 'all', label: 'All', icon: '📚' }, ...used];

    document.getElementById('shelves').innerHTML = chips.map((c) => {
      const count = c.id === 'all' ? books.length : books.filter((b) => b.folder === c.id).length;
      return `<button class="chip${c.id === activeShelf ? ' active' : ''}" data-shelf="${c.id}">
                ${c.icon} ${c.label} <span>${count}</span>
              </button>`;
    }).join('');

    document.querySelectorAll('.chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        activeShelf = chip.dataset.shelf;
        renderShelves();
        renderBooks();
      });
    });
  }

  /* ---------- Book views ---------- */

  function bookActions(href) {
    return `
      <div class="book-actions">
        <a class="btn-small" href="${href}" target="_blank">Read</a>
        <a class="btn-outline" href="${href}" download>Download</a>
      </div>`;
  }

  // Icon view: tall cover (real picture on top of the colored fallback)
  function bookTile(b) {
    const f = folderOf(b);
    const href = encodeURI(b.file);                       // handles spaces in file names
    return `
      <article class="book">
        <a class="cover" href="${href}" target="_blank" style="background: var(--card-${f.color})">
          <span class="cover-icon">${f.icon}</span>
          <span class="cover-title">${b.title}</span>
          ${coverImg(b, 'cover-img')}
          <span class="cover-type">${fileType(b)}</span>
        </a>
        <h3 title="${b.title}">${b.title}</h3>
        <p>${metaOf(b) || f.label}</p>
        ${bookActions(href)}
      </article>`;
  }

  // List view: one row per book
  function bookRow(b) {
    const f = folderOf(b);
    const href = encodeURI(b.file);
    return `
      <div class="row">
        <a class="row-thumb" href="${href}" target="_blank" style="background: var(--card-${f.color})">${f.icon}${coverImg(b, '')}</a>
        <span class="row-main">
          <strong title="${b.title}">${b.title}</strong>
          <small>${[metaOf(b), f.label].filter(Boolean).join(' · ')}</small>
        </span>
        <span class="row-meta">${fileType(b)}</span>
        ${bookActions(href)}
      </div>`;
  }

  function renderBooks() {
    const list = books.filter((b) => {
      const inShelf = activeShelf === 'all' || b.folder === activeShelf;
      const text = `${b.title} ${b.author || ''}`.toLowerCase();
      return inShelf && text.includes(query);
    });

    const box = document.getElementById('books');
    box.className = `books ${view}`;
    box.innerHTML = list.map(view === 'grid' ? bookTile : bookRow).join('');

    document.getElementById('bookCount').textContent =
      `${books.length} book${books.length === 1 ? '' : 's'} on the shelf`;

    const empty = document.getElementById('empty');
    empty.style.display = list.length ? 'none' : 'block';
    empty.textContent = books.length
      ? 'No books match your search.'
      : 'No books yet. Add files to the books/ folder and list them in js/books.js.';

    // Highlight the active view button
    document.querySelectorAll('.view-toggle button').forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.view === view);
    });
  }

  /* ---------- Events ---------- */

  // Icon / list switch (choice is remembered)
  document.querySelectorAll('.view-toggle button').forEach((btn) => {
    btn.addEventListener('click', () => {
      view = btn.dataset.view;
      save('libraryView', view);
      renderBooks();
    });
  });

  // Search box in the top bar
  document.getElementById('search').addEventListener('input', (e) => {
    query = e.target.value.trim().toLowerCase();
    renderBooks();
  });

  renderShelves();
  renderBooks();
})();
