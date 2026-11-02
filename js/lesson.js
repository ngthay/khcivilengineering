/* =========================================================
   lesson.js
   Builds a course page (e.g. concrete.html) from
   window.KCE_COURSE (js/lessons/<course>/*.js).

   concrete.html                     -> course outline (lesson cards)
   concrete.html?lesson=footings     -> one lesson, laid out as:
       title, "0. Contents" table, numbered sections
       (1. Summary -> 1-1 Overview ...), and a sticky
       right card with Contents / Article Map, Share, Follow.

   Lesson text may contain TeX: \( inline \) and $$ display $$,
   rendered by KaTeX when it is available.
   ========================================================= */

(function () {
  const course = window.KCE_COURSE;
  const root = document.getElementById('course');
  if (!course || !root) return;

  const lessons = course.lessons.slice().sort((a, b) => a.num - b.num);
  const page = location.pathname.split('/').pop() || 'index.html';
  const params = new URLSearchParams(location.search);

  /* ---------- Helpers ---------- */
  function load(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  const readKey = course.id + ':read';
  const followKey = course.id + ':follow';
  const read = new Set(load(readKey, []));
  const followed = new Set(load(followKey, []));

  const lessonUrl = (l) => `${page}?lesson=${l.id}`;
  const pad = (n) => String(n).padStart(2, '0');
  const stripTags = (html) => html.replace(/<[^>]+>/g, ' ');
  const minutes = (l) => {
    const words = stripTags(l.sections.map((s) => s.subs.map((x) => x.html).join(' ')).join(' '))
      .split(/\s+/).filter(Boolean).length;
    return Math.max(3, Math.round(words / 160));
  };

  function renderMath(el) {
    if (window.renderMathInElement) {
      window.renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '\\[', right: '\\]', display: true },
          { left: '\\(', right: '\\)', display: false }
        ],
        throwOnError: false
      });
    }
  }

  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 1800);
  }

  /* =========================================================
     Course outline
     ========================================================= */
  function renderIndex(query) {
    document.title = `${course.title} · KCE`;
    const done = lessons.filter((l) => read.has(l.id)).length;
    const pct = Math.round((done / lessons.length) * 100);

    root.innerHTML = `
      <section class="course-hero">
        <div class="course-hero-text">
          <p class="crumbs"><a href="index.html">Home</a> › ${course.category} › ${course.title}</p>
          <h1>${course.icon} ${course.title}</h1>
          <p>${course.subtitle}</p>
          <div class="hero-chips">${course.chips.map((c) => `<span>${c}</span>`).join('')}</div>
        </div>
        <div class="course-progress">
          <div class="ring" style="--p:${pct}"><span>${pct}%</span></div>
          <small>${done} of ${lessons.length} lessons read</small>
        </div>
      </section>

      <section class="panel course-list">
        <div class="section-head">
          <h2>Course outline</h2>
          <span class="view-all">${lessons.length} lessons</span>
        </div>
        <div class="lesson-cards" id="lessonCards">
          ${lessons.map((l) => `
            <a class="lesson-card${read.has(l.id) ? ' read' : ''}" href="${lessonUrl(l)}" data-text="${(l.title + ' ' + l.desc + ' ' + l.sections.map((s) => s.title + ' ' + s.subs.map((x) => x.title).join(' ')).join(' ')).toLowerCase().replace(/"/g, '')}">
              <div class="lc-num" style="background: var(--card-${l.color || 'peach'})"><b>${pad(l.num)}</b><span>${l.icon}</span></div>
              <div class="lc-body">
                <h3>${l.title}${followed.has(l.id) ? ' <i class="star" title="Following">★</i>' : ''}</h3>
                <p>${l.desc}</p>
                <small>${l.sections.length} sections · ${minutes(l)} min read${read.has(l.id) ? ' · <em>Read ✓</em>' : ''}</small>
              </div>
            </a>`).join('')}
        </div>
        <p class="empty" id="empty">No lessons match your search.</p>
      </section>`;

    // Search filters the lesson cards
    const input = document.getElementById('search');
    const filter = (q) => {
      q = q.trim().toLowerCase();
      let shown = 0;
      document.querySelectorAll('.lesson-card').forEach((card) => {
        const match = !q || card.dataset.text.includes(q);
        card.style.display = match ? '' : 'none';
        if (match) shown++;
      });
      document.getElementById('empty').style.display = shown ? 'none' : 'block';
    };
    if (input) {
      input.placeholder = 'Search lessons...';
      input.value = query;
      input.addEventListener('input', (e) => filter(e.target.value));
    }
    filter(query);
  }

  /* =========================================================
     One lesson
     ========================================================= */
  function renderLesson(lesson) {
    document.title = `[${course.tag}] ${lesson.title} · KCE`;
    const i = lessons.indexOf(lesson);
    const prev = lessons[i - 1];
    const next = lessons[i + 1];

    // Numbered ids: s1, s1-1, s1-2 ...
    const secs = lesson.sections.map((s, si) => ({
      ...s, n: si + 1, id: `s${si + 1}`,
      subs: s.subs.map((x, xi) => ({ ...x, n: `${si + 1}-${xi + 1}`, id: `s${si + 1}-${xi + 1}` }))
    }));

    const contentsTable = `
      <table class="contents-table">
        ${secs.map((s) => `
          <tr>
            <th><a href="#${s.id}">${s.n}. ${s.title}</a></th>
            <td>${s.subs.map((x) => `<a href="#${x.id}">${x.n} ${x.title}</a>`).join('')}</td>
          </tr>`).join('')}
      </table>`;

    const body = secs.map((s) => `
      <section class="l-section" id="${s.id}">
        <h2>${s.n}. ${s.title}</h2>
        ${s.subs.map((x) => `
          <div class="l-sub" id="${x.id}">
            <h3>${x.n} ${x.title}</h3>
            ${x.html}
          </div>`).join('')}
      </section>`).join('');

    const tocList = `
      <a href="#contents" data-target="contents" class="toc-l1">0. Contents</a>
      ${secs.map((s) => `
        <a href="#${s.id}" data-target="${s.id}" class="toc-l1">${s.n}. ${s.title}</a>
        ${s.subs.map((x) => `<a href="#${x.id}" data-target="${x.id}" class="toc-l2">${x.n} ${x.title}</a>`).join('')}
      `).join('')}`;

    const mapList = lessons.map((l) => `
      <a href="${lessonUrl(l)}" class="toc-l1${l === lesson ? ' current' : ''}">
        <b>${pad(l.num)}</b> ${l.title}${read.has(l.id) && l !== lesson ? ' <span class="tick">✓</span>' : ''}
      </a>`).join('');

    root.innerHTML = `
      <div class="lesson-layout">
        <article class="panel lesson">
          <p class="crumbs"><a href="index.html">Home</a> › ${course.category} › <a href="${page}">${course.title}</a> › Lesson ${lesson.num}</p>
          <h1 class="lesson-title">[${course.tag}] ${lesson.title}</h1>
          <div class="lesson-meta">
            ${lesson.meta.map((m) => `<span>${m}</span>`).join('')}
            <span>⏱ ${minutes(lesson)} min read</span>
          </div>

          <section class="l-section" id="contents">
            <h2>0. Contents</h2>
            ${contentsTable}
          </section>

          ${body}

          <nav class="lesson-pager">
            ${prev ? `<a href="${lessonUrl(prev)}" class="pg prev"><small>← Previous</small><strong>${pad(prev.num)} · ${prev.title}</strong></a>` : '<span></span>'}
            ${next ? `<a href="${lessonUrl(next)}" class="pg next"><small>Next →</small><strong>${pad(next.num)} · ${next.title}</strong></a>` : `<a href="${page}" class="pg next"><small>Finished →</small><strong>Back to course outline</strong></a>`}
          </nav>
        </article>

        <aside class="lesson-aside">
          <div class="toc-card">
            <div class="toc-tabs" role="tablist">
              <button role="tab" aria-selected="true" data-tab="toc">Contents</button>
              <button role="tab" aria-selected="false" data-tab="map">Article Map</button>
            </div>
            <nav class="toc-list" id="tocList">${tocList}</nav>
            <nav class="toc-list" id="mapList" hidden>${mapList}</nav>
            <div class="toc-foot">
              <span>SHARE</span>
              <button class="share-btn" id="shareBtn" aria-label="Share this lesson">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>
                </svg>
              </button>
            </div>
          </div>
          <button class="follow-btn" id="followBtn" aria-pressed="false"></button>
        </aside>
      </div>`;

    // Mark as read
    read.add(lesson.id);
    save(readKey, [...read]);

    // Search: Enter jumps to the outline, filtered
    const input = document.getElementById('search');
    if (input) {
      input.placeholder = 'Search lessons...';
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') location.href = `${page}?q=${encodeURIComponent(input.value)}`;
      });
    }

    // Tabs: Contents | Article Map
    document.querySelectorAll('.toc-tabs button').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.toc-tabs button').forEach((b) => b.setAttribute('aria-selected', b === btn));
        document.getElementById('tocList').hidden = btn.dataset.tab !== 'toc';
        document.getElementById('mapList').hidden = btn.dataset.tab !== 'map';
      });
    });

    // Share
    document.getElementById('shareBtn').addEventListener('click', async () => {
      const data = { title: document.title, url: location.href };
      if (navigator.share) {
        try { await navigator.share(data); } catch (e) {}
      } else {
        try { await navigator.clipboard.writeText(location.href); toast('Link copied'); }
        catch (e) { toast(location.href); }
      }
    });

    // Follow (bookmark, remembered in localStorage)
    const followBtn = document.getElementById('followBtn');
    const paintFollow = () => {
      const on = followed.has(lesson.id);
      followBtn.setAttribute('aria-pressed', on);
      followBtn.innerHTML = on ? 'Following <span>★</span>' : 'Follow <span>☆</span>';
    };
    followBtn.addEventListener('click', () => {
      followed.has(lesson.id) ? followed.delete(lesson.id) : followed.add(lesson.id);
      save(followKey, [...followed]);
      paintFollow();
      toast(followed.has(lesson.id) ? 'Added to followed lessons' : 'Removed from followed lessons');
    });
    paintFollow();

    // Widgets (calculators, generated tables) and math
    document.querySelectorAll('[data-widget]').forEach((el) => {
      const fn = WIDGETS[el.dataset.widget];
      if (fn) fn(el);
    });
    renderMath(root.querySelector('.lesson'));

    // Scroll-spy: highlight the TOC entry of the heading in view
    const links = [...document.querySelectorAll('#tocList a')];
    const targets = links.map((a) => document.getElementById(a.dataset.target)).filter(Boolean);
    const spy = () => {
      let current = targets[0];
      targets.forEach((t) => { if (t.getBoundingClientRect().top < 120) current = t; });
      links.forEach((a) => a.classList.toggle('active', current && a.dataset.target === current.id));
    };
    window.addEventListener('scroll', spy, { passive: true });
    spy();

    // Jump to #hash after the content exists
    if (location.hash) {
      const t = document.getElementById(location.hash.slice(1));
      if (t) t.scrollIntoView();
    }
  }

  /* =========================================================
     Widgets: small calculators placed in lessons with
     <div data-widget="name"></div>
     ========================================================= */
  const num = (v) => parseFloat(v);
  const fmt = (v, d = 1) => (isFinite(v) ? v.toFixed(d) : '—');
  const beta1 = (fc) => Math.max(0.65, Math.min(0.85, 0.85 - 0.05 * (fc - 28) / 7));
  // ACI 318-19 §21.2.2.1: εty = fy/Es (0.002 permitted for Grade 420)
  const epsTy = (fy) => (fy === 420 ? 0.002 : fy / 200000);
  // ACI 318-19 Table 21.2.2 (tied / other transverse reinforcement)
  const phiOf = (et, fy) => {
    const ey = epsTy(fy);
    return et >= ey + 0.003 ? 0.9 : et <= ey ? 0.65 : 0.65 + 0.25 * (et - ey) / 0.003;
  };
  // ρ that gives εt = εty + 0.003 (tension-controlled limit)
  const rhoTc = (fc, fy) => 0.85 * beta1(fc) * fc / fy * 0.003 / (0.006 + epsTy(fy));
  // ACI 318-19 §9.6.1.2
  const rhoMin = (fc, fy) => Math.max(1.4 / fy, 0.25 * Math.sqrt(fc) / fy);

  function calc(el, fields, compute) {
    el.classList.add('calc');
    el.innerHTML = `
      <div class="calc-head">🧮 ${el.dataset.title || 'Calculator'}</div>
      <div class="calc-grid">
        ${fields.map((f) => `
          <label>${f.label}<input type="number" step="any" name="${f.name}" value="${f.value}"></label>`).join('')}
      </div>
      <div class="calc-out"></div>`;
    const out = el.querySelector('.calc-out');
    const run = () => {
      const v = {};
      el.querySelectorAll('input').forEach((i) => { v[i.name] = num(i.value); });
      out.innerHTML = compute(v);
    };
    el.addEventListener('input', run);
    run();
  }

  const WIDGETS = {
    /* Search box that filters the rows of the tables matching data-target
       (e.g. the AutoCAD hot keys); sub-sections with no matches are hidden */
    'filter-table'(el) {
      const tables = [...document.querySelectorAll(el.dataset.target || 'table')];
      el.classList.add('tbl-filter');
      el.innerHTML = `
        <input type="search" placeholder="${el.dataset.placeholder || 'Filter…'}" aria-label="Filter table">
        <span class="tbl-filter-count"></span>`;
      const input = el.querySelector('input');
      const count = el.querySelector('.tbl-filter-count');
      const run = () => {
        const q = input.value.trim().toLowerCase();
        let shown = 0;
        tables.forEach((t) => {
          let inTable = 0;
          t.querySelectorAll('tbody tr').forEach((tr) => {
            const match = !q || tr.textContent.toLowerCase().includes(q);
            tr.style.display = match ? '' : 'none';
            if (match) inTable++;
          });
          shown += inTable;
          const sub = t.closest('.l-sub');
          if (sub) sub.style.display = inTable ? '' : 'none';
        });
        count.textContent = q ? `${shown} match${shown === 1 ? '' : 'es'}` : `${shown} shortcuts`;
      };
      input.addEventListener('input', run);
      run();
    },

    /* Area of N bars (cm²) for common diameters */
    'bar-table'(el) {
      const dias = [6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 30, 32, 36, 38];
      const ns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15];
      el.innerHTML = `
        <div class="tbl-wrap"><table class="tbl num">
          <thead><tr><th>Ø (mm)</th><th>kg/m</th>${ns.map((n) => `<th>${n}</th>`).join('')}</tr></thead>
          <tbody>${dias.map((d) => {
            const a = Math.PI * d * d / 400;   // cm²
            return `<tr><th>${d}</th><td>${(a * 0.785).toFixed(3)}</td>${ns.map((n) => `<td>${(a * n).toFixed(2)}</td>`).join('')}</tr>`;
          }).join('')}</tbody>
        </table></div>`;
    },

    /* Singly reinforced rectangular section: capacity check */
    'flexure-check'(el) {
      calc(el, [
        { name: 'b', label: 'b (mm)', value: 200 },
        { name: 'd', label: 'd (mm)', value: 450 },
        { name: 'As', label: 'As (mm²)', value: 942 },
        { name: 'fc', label: "f'c (MPa)", value: 25 },
        { name: 'fy', label: 'fy (MPa)', value: 400 },
        { name: 'Mu', label: 'Mu (kN·m)', value: 120 }
      ], (v) => {
        const b1 = beta1(v.fc);
        const a = v.As * v.fy / (0.85 * v.fc * v.b);
        const c = a / b1;
        const et = 0.003 * (v.d - c) / c;
        const phi = phiOf(et, v.fy);
        const etLim = epsTy(v.fy) + 0.003;
        const Mn = v.As * v.fy * (v.d - a / 2) / 1e6;
        const rho = v.As / (v.b * v.d);
        const rmin = rhoMin(v.fc, v.fy);
        const ok = phi * Mn >= v.Mu;
        return `
          <span>β₁ = ${fmt(b1, 3)}</span><span>a = ${fmt(a)} mm</span><span>c = ${fmt(c)} mm</span>
          <span>εt = ${fmt(et, 5)}</span><span>εty + 0.003 = ${fmt(etLim, 5)}</span><span>φ = ${fmt(phi, 3)}</span>
          <span>ρ = ${fmt(rho, 4)} ${rho >= rmin ? '≥' : '<'} ρmin ${fmt(rmin, 4)}</span>
          <span class="big ${ok ? 'ok' : 'ng'}">φMn = ${fmt(phi * Mn)} kN·m ${ok ? '≥' : '<'} Mu ${ok ? '✓' : '✗'}</span>
          ${et < etLim ? '<span class="ng">εt < εty + 0.003: a beam must be tension-controlled (ACI 318-19 §9.3.3.1)</span>' : ''}`;
      });
    },

    /* Required steel for a given Mu (rectangular, singly reinforced) */
    'flexure-design'(el) {
      calc(el, [
        { name: 'Mu', label: 'Mu (kN·m)', value: 185.4 },
        { name: 'b', label: 'b (mm)', value: 250 },
        { name: 'd', label: 'd (mm)', value: 455 },
        { name: 'fc', label: "f'c (MPa)", value: 28 },
        { name: 'fy', label: 'fy (MPa)', value: 450 }
      ], (v) => {
        const Rn = v.Mu * 1e6 / (0.9 * v.b * v.d * v.d);
        const inside = 1 - 2 * Rn / (0.85 * v.fc);
        const rmax = rhoTc(v.fc, v.fy);
        const rmin = rhoMin(v.fc, v.fy);
        if (inside < 0) return '<span class="ng">Section too small: increase d or add compression steel.</span>';
        const rho = 0.85 * v.fc / v.fy * (1 - Math.sqrt(inside));
        const r = Math.max(rho, rmin);
        const As = r * v.b * v.d;
        return `
          <span>Rn = ${fmt(Rn, 3)} MPa</span><span>ρ = ${fmt(rho, 5)}</span>
          <span>ρmin = ${fmt(rmin, 4)}</span><span>ρmax = ${fmt(rmax, 4)}</span>
          <span class="big ${rho <= rmax ? 'ok' : 'ng'}">As = ${fmt(As, 0)} mm² ${rho <= rmax ? '✓ tension-controlled' : '✗ ρ > ρmax → doubly reinforce'}</span>`;
      });
    },

    /* Combined shear and torsion, solid rectangular beam, ACI 318-19 §22.7 (θ = 45°, two-leg closed stirrups) */
    'torsion-design'(el) {
      calc(el, [
        { name: 'b', label: 'bw (mm)', value: 400 },
        { name: 'h', label: 'h (mm)', value: 600 },
        { name: 'c', label: 'c to stirrup ℄ (mm)', value: 50 },
        { name: 'd', label: 'd (mm)', value: 540 },
        { name: 'fc', label: "f'c (MPa)", value: 25 },
        { name: 'fy', label: 'fy long. (MPa)', value: 400 },
        { name: 'fyt', label: 'fyt stirrups (MPa)', value: 400 },
        { name: 'Vu', label: 'Vu (kN)', value: 245 },
        { name: 'Tu', label: 'Tu (kN·m)', value: 50 },
        { name: 'db', label: 'Stirrup Ø (mm)', value: 12 }
      ], (v) => {
        const phi = 0.75;
        const sq = Math.min(Math.sqrt(v.fc), 8.3);
        const Acp = v.b * v.h, pcp = 2 * (v.b + v.h), k = Acp * Acp / pcp;
        const Tth = 0.083 * sq * k / 1e6, Tcr = 0.33 * sq * k / 1e6;
        const x1 = v.b - 2 * v.c, y1 = v.h - 2 * v.c, Aoh = x1 * y1, ph = 2 * (x1 + y1), A0 = 0.85 * Aoh;
        const fyt = Math.min(v.fyt, 420), fy = Math.min(v.fy, 420);
        const Vc = 0.17 * sq * v.b * v.d;
        const lhs = Math.hypot(v.Vu * 1e3 / (v.b * v.d), v.Tu * 1e6 * ph / (1.7 * Aoh * Aoh));
        const rhs = phi * (Vc / (v.b * v.d) + 0.66 * sq);
        if (v.Tu < phi * Tth) {
          return `<span>φTth = ${fmt(phi * Tth, 2)} kN·m</span>
            <span class="big ok">Tu &lt; φTth — torsion may be neglected (§9.5.4.1); design for shear only (lesson 5).</span>`;
        }
        const Avs = Math.max(0, (v.Vu * 1e3 / phi - Vc) / (fyt * v.d));
        const Ats = v.Tu * 1e6 / (2 * phi * A0 * fyt);
        const need = Math.max(Avs + 2 * Ats, Math.max(0.062 * sq, 0.35) * v.b / fyt);
        const Aleg = Math.PI * v.db * v.db / 4;
        const smax = Math.min(ph / 8, 300, v.d / 2);
        const s = Math.min(2 * Aleg / need, smax);
        const Al = Ats * ph * fyt / fy;
        const base = 0.42 * sq * Acp / fy;
        const AlMin = Math.min(base - Ats * ph * fyt / fy, base - 0.175 * v.b / fyt * ph * fyt / fy);
        const ok = lhs <= rhs;
        return `
          <span>φTth = ${fmt(phi * Tth, 2)} kN·m</span><span>φTcr = ${fmt(phi * Tcr, 2)} kN·m</span>
          <span>Aoh = ${fmt(Aoh, 0)} mm²</span><span>ph = ${fmt(ph, 0)} mm</span>
          <span class="${ok ? 'ok' : 'ng'}">Section: ${fmt(lhs, 2)} ${ok ? '≤' : '>'} ${fmt(rhs, 2)} MPa</span>
          <span>Av/s = ${fmt(Avs, 3)}</span><span>At/s = ${fmt(Ats, 3)} mm²/mm</span><span>Av/s + 2At/s = ${fmt(need, 3)}</span>
          <span class="big ${ok ? 'ok' : 'ng'}">${ok ? `Closed Ø${v.db} stirrups @ ${fmt(Math.floor(s / 10) * 10, 0)} mm (s ≤ ${fmt(smax, 0)})` : 'Enlarge the section (§22.7.7.1)'}</span>
          <span class="big">Aℓ = ${fmt(Math.max(Al, AlMin), 0)} mm² (Aℓ,min = ${fmt(Math.max(AlMin, 0), 0)})</span>`;
      });
    },

    /* Short column under concentric load */
    'column-axial'(el) {
      calc(el, [
        { name: 'b', label: 'b (mm)', value: 250 },
        { name: 'h', label: 'h (mm)', value: 400 },
        { name: 'Ast', label: 'Ast (mm²)', value: 1206 },
        { name: 'fc', label: "f'c (MPa)", value: 28 },
        { name: 'fy', label: 'fy (MPa)', value: 420 },
        { name: 'spiral', label: 'Spiral? (1 = yes, 0 = tied)', value: 0 }
      ], (v) => {
        const Ag = v.b * v.h;
        const sp = v.spiral >= 1;
        const phi = sp ? 0.75 : 0.65;
        const k = sp ? 0.85 : 0.8;
        const P0 = (0.85 * v.fc * (Ag - v.Ast) + v.fy * v.Ast) / 1e3;
        const rg = v.Ast / Ag;
        return `
          <span>Ag = ${fmt(Ag, 0)} mm²</span><span>ρg = ${fmt(rg * 100, 2)} % ${rg >= 0.01 && rg <= 0.08 ? '✓' : '✗ (1–8 %)'}</span>
          <span>P₀ = ${fmt(P0, 0)} kN</span><span>φ = ${phi}, K = ${k}</span>
          <span class="big ok">φPn,max = ${fmt(phi * k * P0, 0)} kN</span>`;
      });
    },

    /* Development lengths, ACI 318-19 §25.4 (simplified Table 25.4.2.3, hooks §25.4.3) */
    'dev-length'(el) {
      calc(el, [
        { name: 'db', label: 'db (mm)', value: 25 },
        { name: 'fc', label: "f'c (MPa)", value: 20 },
        { name: 'fy', label: 'fy (MPa)', value: 410 },
        { name: 'pt', label: 'ψt (1.0 or 1.3 top)', value: 1.0 },
        { name: 'pe', label: 'ψe (1.0 / 1.2 / 1.5)', value: 1.0 },
        { name: 'lam', label: 'λ (1.0 normal)', value: 1.0 },
        { name: 'pr', label: 'Hook ψr (1.0 confined / 1.6)', value: 1.0 },
        { name: 'po', label: 'Hook ψo (1.0 / 1.25)', value: 1.0 }
      ], (v) => {
        const sq = Math.min(Math.sqrt(v.fc), 8.3);
        const pte = Math.min(v.pt * v.pe, 1.7);
        const pg = v.fy <= 420 ? 1.0 : v.fy <= 550 ? 1.15 : 1.3;        // grade factor ψg
        const small = v.db <= 20;
        const k1 = small ? 2.1 : 1.7;
        const k2 = small ? 1.4 : 1.1;
        const ld1 = Math.max(300, v.fy * pte * pg / (k1 * v.lam * sq) * v.db);
        const ld2 = Math.max(300, v.fy * pte * pg / (k2 * v.lam * sq) * v.db);
        const pc = v.fc < 42 ? v.fc / 105 + 0.6 : 1.0;                    // ψc for hooks
        const peh = v.pe > 1 ? 1.2 : 1.0;
        const ldh = Math.max(8 * v.db, 150, v.fy * peh * v.pr * v.po * pc / (23 * v.lam * Math.sqrt(v.fc)) * Math.pow(v.db, 1.5));
        const ldc = Math.max(200, Math.max(0.24 * v.fy / (v.lam * sq), 0.043 * v.fy) * v.db);
        return `
          <span>ψg = ${pg}</span><span>ψc = ${fmt(pc, 3)}</span>
          <span class="big ok">ℓd (spacing/cover met) = ${fmt(ld1, 0)} mm</span>
          <span class="big">ℓd (other cases) = ${fmt(ld2, 0)} mm</span>
          <span>ℓdh (std. hook) = ${fmt(ldh, 0)} mm</span><span>ℓdc (compression) = ${fmt(ldc, 0)} mm</span>
          <span>Class B lap = ${fmt(1.3 * ld1, 0)} – ${fmt(1.3 * ld2, 0)} mm</span>`;
      });
    }
  };

  /* ---------- Start ---------- */
  const lesson = lessons.find((l) => l.id === params.get('lesson'));
  if (lesson) renderLesson(lesson);
  else renderIndex(params.get('q') || '');
})();
