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
          <p class="crumbs"><a href="index.html">Home</a> › ${course.categoryHref ? `<a href="${course.categoryHref}">${course.category}</a>` : course.category} › ${course.title}</p>
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
                <small>${l.sections.length} sections · ${minutes(l)} min read</small>
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
        <b>${pad(l.num)}</b> ${l.title}
      </a>`).join('');

    root.innerHTML = `
      <div class="lesson-layout">
        <article class="panel lesson">
          <p class="crumbs"><a href="index.html">Home</a> › ${course.categoryHref ? `<a href="${course.categoryHref}">${course.category}</a>` : course.category} › <a href="${page}">${course.title}</a> › Lesson ${lesson.num}</p>
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

    // Copy buttons on code listings (js/code-blocks.js)
    document.querySelectorAll('.code-block').forEach((block) => {
      const btn = document.createElement('button');
      btn.className = 'code-copy';
      btn.type = 'button';
      btn.textContent = 'Copy';
      btn.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(block.querySelector('code').textContent); toast('Code copied'); }
        catch (e) { toast('Select the code and press Ctrl+C'); }
      });
      block.querySelector('.code-head').appendChild(btn);
    });

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
    },

    /* Reduced floor live load, ASCE 7-22 §4.7.2 – 4.7.3 (SI) */
    'live-load-reduction'(el) {
      calc(el, [
        { name: 'Lo', label: 'Lo (kN/m²)', value: 2.4 },
        { name: 'KLL', label: 'KLL (Table 4.7-1)', value: 4 },
        { name: 'AT', label: 'AT (m²)', value: 45 },
        { name: 'floors', label: 'Floors supported', value: 1 }
      ], (v) => {
        const KA = v.KLL * v.AT;
        const lim = v.floors > 1 ? 0.4 : 0.5;
        if (KA < 37.16) {
          return `<span>KLL·AT = ${fmt(KA, 1)} m² &lt; 37.16 m²</span><span class="big">No reduction: L = ${fmt(v.Lo, 2)} kN/m²</span>`;
        }
        const raw = v.Lo * (0.25 + 4.57 / Math.sqrt(KA));
        const L = Math.max(raw, lim * v.Lo);
        return `
          <span>KLL·AT = ${fmt(KA, 1)} m²</span><span>Formula = ${fmt(raw, 3)} kN/m²</span>
          <span>Limit ${lim}Lo = ${fmt(lim * v.Lo, 2)} kN/m²</span>
          <span class="big ok">L = ${fmt(L, 2)} kN/m² (${fmt(100 * L / v.Lo, 1)} % of Lo)</span>
          <span>Load on member = ${fmt(L * v.AT, 1)} kN</span>`;
      });
    },

    /* Shallow foundation bearing capacity — general equation used in the
       CCES Foundation notes: Nq = tan²(45+φ/2)e^(π tanφ), Nc = (Nq−1)cotφ,
       Nγ = 2(Nq+1)tanφ, shape factors (1+0.2B/L), (1+B/L·tanφ), (1−0.4B/L) */
    'bearing-capacity'(el) {
      calc(el, [
        { name: 'B', label: 'B (m)', value: 2 },
        { name: 'L', label: 'L (m, 0 = strip)', value: 0 },
        { name: 'D', label: 'D (m)', value: 1.5 },
        { name: 'c', label: 'c (kPa)', value: 4 },
        { name: 'phi', label: 'φ (°)', value: 30 },
        { name: 'g', label: 'γ (kN/m³)', value: 18 },
        { name: 'local', label: 'Local shear (1/0)', value: 1 },
        { name: 'F', label: 'Safety factor F', value: 3 }
      ], (v) => {
        const rad = Math.PI / 180;
        let c = v.c, phi = v.phi;
        if (v.local === 1) { c = 2 / 3 * c; phi = Math.atan(2 / 3 * Math.tan(phi * rad)) / rad; }
        const t = Math.tan(phi * rad);
        const Nq = phi > 0 ? Math.pow(Math.tan((45 + phi / 2) * rad), 2) * Math.exp(Math.PI * t) : 1;
        const Nc = phi > 0 ? (Nq - 1) / t : 5.14;
        const Ng = 2 * (Nq + 1) * t;
        const r = v.L > 0 ? v.B / v.L : 0;
        const qd = (1 + 0.2 * r) * c * Nc + v.g * v.D * Nq * (1 + r * t) + (1 - 0.4 * r) * v.g * v.B / 2 * Ng;
        const qnet = qd - v.g * v.D;
        return `
          <span>φ used = ${fmt(phi, 1)}°</span><span>c used = ${fmt(c, 2)} kPa</span>
          <span>N꜀ = ${fmt(Nc, 2)}</span><span>N_q = ${fmt(Nq, 2)}</span><span>N_γ = ${fmt(Ng, 2)}</span>
          <span class="big">q_d = ${fmt(qd, 1)} kPa · q_net = ${fmt(qnet, 1)} kPa</span>
          <span class="big ok">q_allow = q_net / F + γD = ${fmt(qnet / v.F + v.g * v.D, 1)} kPa</span>
          <span>${v.L > 0 ? `Q_allow = ${fmt((qnet / v.F + v.g * v.D) * v.B * v.L, 0)} kN` : `Q_allow = ${fmt((qnet / v.F + v.g * v.D) * v.B, 0)} kN/m`}</span>`;
      });
    },

    /* Natural frequencies of a uniform cantilever (Euler–Bernoulli), consistent
       Abaqus units: mm, N, MPa, tonne/mm³ → Hz */
    'cantilever-frequency'(el) {
      calc(el, [
        { name: 'L', label: 'L (mm)', value: 914 },
        { name: 'b', label: 'Width b (mm)', value: 20 },
        { name: 'h', label: 'Depth h, bending direction (mm)', value: 5 },
        { name: 'E', label: 'E (MPa)', value: 210000 },
        { name: 'rho', label: 'ρ (tonne/mm³)', value: 7.85e-9 }
      ], (v) => {
        const I = v.b * v.h ** 3 / 12, A = v.b * v.h;
        const base = Math.sqrt(v.E * I / (v.rho * A * v.L ** 4)) / (2 * Math.PI);
        const f = [1.8751, 4.6941, 7.8548].map((bl) => bl * bl * base);
        return `
          <span>I = ${fmt(I, 1)} mm⁴</span><span>A = ${fmt(A, 1)} mm²</span>
          <span class="big ok">f₁ = ${fmt(f[0], 2)} Hz</span>
          <span>f₂ = ${fmt(f[1], 1)} Hz</span><span>f₃ = ${fmt(f[2], 1)} Hz</span>`;
      });
    },

    /* Single-bay portal frame (left base fixed, right base pinned or fixed):
       2D frame stiffness method with axial and shear deformation (ν = 0.2),
       moments at joint centrelines — the ETABS example in the ETABS course */
    'portal-frame'(el) {
      calc(el, [
        { name: 'L', label: 'Span L (m)', value: 6 },
        { name: 'H', label: 'Height h (m)', value: 3 },
        { name: 'bb', label: 'Beam width b (m)', value: 0.2 },
        { name: 'hb', label: 'Beam depth (m)', value: 0.4 },
        { name: 'bc', label: 'Column width b (m)', value: 0.2 },
        { name: 'hc', label: 'Column depth (m)', value: 0.3 },
        { name: 'q', label: 'q on beam (kN/m)', value: 20.2 },
        { name: 'P', label: 'P at mid-span (kN)', value: 0 },
        { name: 'W', label: 'Lateral W at top-left (kN)', value: 0 },
        { name: 'E', label: 'E (kN/m²)', value: 2.7e7 },
        { name: 'fix', label: 'Right base: 0 = pin, 1 = fixed', value: 0 }
      ], (v) => {
        const X = [[0, 0], [0, v.H], [v.L / 2, v.H], [v.L, v.H], [v.L, 0]];
        const col = [v.bc, v.hc], bm = [v.bb, v.hb];
        const els = [[0, 1, col, 0], [1, 2, bm, 1], [2, 3, bm, 1], [4, 3, col, 0]];
        const G = v.E / 2.4, n = 15;
        const K = Array.from({ length: n }, () => new Array(n).fill(0)), F = new Array(n).fill(0);
        const data = els.map(([i, j, [b, h], loaded]) => {
          const A = b * h, I = b * h ** 3 / 12, As = A * 5 / 6;
          const dx = X[j][0] - X[i][0], dy = X[j][1] - X[i][1], L = Math.hypot(dx, dy), c = dx / L, s = dy / L;
          const ph = 12 * v.E * I / (G * As * L * L), k = v.E * I / (L ** 3 * (1 + ph)), a = v.E * A / L;
          const kl = [
            [a, 0, 0, -a, 0, 0],
            [0, 12 * k, 6 * L * k, 0, -12 * k, 6 * L * k],
            [0, 6 * L * k, (4 + ph) * L * L * k, 0, -6 * L * k, (2 - ph) * L * L * k],
            [-a, 0, 0, a, 0, 0],
            [0, -12 * k, -6 * L * k, 0, 12 * k, -6 * L * k],
            [0, 6 * L * k, (2 - ph) * L * L * k, 0, -6 * L * k, (4 + ph) * L * L * k]];
          const T = [[c, s, 0, 0, 0, 0], [-s, c, 0, 0, 0, 0], [0, 0, 1, 0, 0, 0],
            [0, 0, 0, c, s, 0], [0, 0, 0, -s, c, 0], [0, 0, 0, 0, 0, 1]];
          const w = loaded ? -v.q : 0;
          const fe = [0, w * L / 2, w * L * L / 12, 0, w * L / 2, -w * L * L / 12];
          const idx = [3 * i, 3 * i + 1, 3 * i + 2, 3 * j, 3 * j + 1, 3 * j + 2];
          for (let p = 0; p < 6; p++) {
            for (let r = 0; r < 6; r++) {
              let sum = 0;
              for (let m = 0; m < 6; m++) for (let t = 0; t < 6; t++) sum += T[m][p] * kl[m][t] * T[t][r];
              K[idx[p]][idx[r]] += sum;
            }
            let f = 0;
            for (let m = 0; m < 6; m++) f += T[m][p] * fe[m];
            F[idx[p]] += f;
          }
          return { kl, T, idx, fe };
        });
        F[7] -= v.P; F[3] += v.W;
        const fixed = v.fix >= 0.5 ? [0, 1, 2, 12, 13, 14] : [0, 1, 2, 12, 13];
        const free = [...Array(n).keys()].filter((d) => !fixed.includes(d));
        const M = free.map((r) => [...free.map((c) => K[r][c]), F[r]]), m = free.length;
        for (let c = 0; c < m; c++) {
          let p = c;
          for (let r = c + 1; r < m; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
          [M[c], M[p]] = [M[p], M[c]];
          for (let r = 0; r < m; r++) {
            if (r === c) continue;
            const f = M[r][c] / M[c][c];
            for (let t = c; t <= m; t++) M[r][t] -= f * M[c][t];
          }
        }
        const u = new Array(n).fill(0);
        free.forEach((d, r) => { u[d] = M[r][m] / M[r][r]; });
        const end = data.map(({ kl, T, idx, fe }) => {
          const ug = idx.map((d) => u[d]);
          const ul = T.map((row) => row.reduce((s, t, q) => s + t * ug[q], 0));
          return kl.map((row, r) => row.reduce((s, t, q) => s + t * ul[q], 0) - fe[r]);
        });
        const ok = isFinite(u[3]);
        if (!ok) return '<span class="ng">Check the inputs</span>';
        return `
          <span>M at left base = ${fmt(Math.abs(end[0][2]), 2)} kN·m</span>
          <span>M at left joint = ${fmt(Math.abs(end[0][5]), 2)} kN·m</span>
          <span class="big ok">M at mid-span = ${fmt(Math.abs(end[1][5]), 2)} kN·m</span>
          <span>M at right joint = ${fmt(Math.abs(end[3][5]), 2)} kN·m</span>
          <span>M at right base = ${fmt(Math.abs(end[3][2]), 2)} kN·m</span>
          <span>Sway at beam level = ${fmt(u[3] * 1000, 2)} mm</span>`;
      });
    },

    /* Structural Dynamics course (Paz & Leigh) — US units lb, in, sec; g = 386 in/s² */

    /* Free vibration of the damped oscillator (Chapters 1–2) */
    'sdof-vibration'(el) {
      calc(el, [
        { name: 'W', label: 'Weight W (lb)', value: 10 },
        { name: 'k', label: 'Stiffness k (lb/in)', value: 20 },
        { name: 'xi', label: 'Damping ratio ξ', value: 0.026 },
        { name: 'u0', label: 'Initial u₀ (in)', value: 1 },
        { name: 'v0', label: 'Initial v₀ (in/s)', value: 0 }
      ], (v) => {
        const m = v.W / 386, w = Math.sqrt(v.k / m), ccr = 2 * Math.sqrt(v.k * m);
        if (!(v.xi < 1)) return `<span class="ng">ξ must be less than 1 (underdamped)</span>`;
        const wd = w * Math.sqrt(1 - v.xi ** 2), delta = 2 * Math.PI * v.xi / Math.sqrt(1 - v.xi ** 2);
        const C = Math.sqrt(v.u0 ** 2 + ((v.v0 + v.u0 * v.xi * w) / wd) ** 2);
        return `
          <span>m = ${fmt(m, 4)} lb·s²/in</span><span>c_cr = ${fmt(ccr, 3)} lb·s/in</span><span>c = ${fmt(v.xi * ccr, 4)} lb·s/in</span>
          <span class="big ok">ω = ${fmt(w, 2)} rad/s · f = ${fmt(w / 2 / Math.PI, 3)} cps · T = ${fmt(2 * Math.PI / w, 4)} s</span>
          <span>ω_D = ${fmt(wd, 2)} rad/s</span><span>δ = ${fmt(delta, 4)}</span><span>u_i/u_i+1 = ${fmt(Math.exp(delta), 3)}</span>
          <span>Amplitude C = ${fmt(C, 4)} in</span><span>Cycles to reduce ×10: ${fmt(Math.log(10) / delta, 2)}</span>`;
      });
    },

    /* Steady-state harmonic response and force transmissibility (Chapter 3) */
    'harmonic-response'(el) {
      calc(el, [
        { name: 'W', label: 'Weight W (lb)', value: 3860 },
        { name: 'k', label: 'Stiffness k (lb/in)', value: 100000 },
        { name: 'xi', label: 'Damping ratio ξ', value: 0.1 },
        { name: 'F0', label: 'Force amplitude F₀ (lb)', value: 7000 },
        { name: 'wb', label: 'Forcing ω̄ (rad/s)', value: 60 }
      ], (v) => {
        const m = v.W / 386, w = Math.sqrt(v.k / m), r = v.wb / w, ust = v.F0 / v.k;
        const den = Math.sqrt((1 - r * r) ** 2 + (2 * r * v.xi) ** 2), D = 1 / den;
        const th = Math.atan2(2 * r * v.xi, 1 - r * r) * 180 / Math.PI;
        const Tr = Math.sqrt(1 + (2 * r * v.xi) ** 2) * D;
        return `
          <span>ω = ${fmt(w, 2)} rad/s</span><span>r = ω̄/ω = ${fmt(r, 3)}</span><span>u_st = ${fmt(ust, 4)} in</span>
          <span>D = ${fmt(D, 3)}</span>
          <span class="big ok">U = ${fmt(ust * D, 4)} in · θ = ${fmt(th, 1)}°</span>
          <span>T_r = ${fmt(Tr, 3)}</span><span class="big ${Tr < 1 ? 'ok' : 'ng'}">A_T = ${fmt(v.F0 * Tr, 0)} lb ${Tr < 1 ? '(isolated)' : '(amplified)'}</span>`;
      });
    },

    /* Maximum dynamic load factor of the undamped oscillator for a pulse (Chapter 4) */
    'pulse-dlf'(el) {
      calc(el, [
        { name: 'type', label: 'Pulse: 1 = rectangular, 2 = triangular', value: 1 },
        { name: 'T', label: 'Natural period T (s)', value: 0.2446 },
        { name: 'td', label: 'Pulse duration t_d (s)', value: 0.1 },
        { name: 'F0', label: 'Peak force F₀ (lb)', value: 3000 },
        { name: 'k', label: 'Stiffness k (lb/in)', value: 8544 }
      ], (v) => {
        const w = 2 * Math.PI / v.T, td = v.td, tri = v.type >= 1.5;
        const dlf = (t) => {
          if (tri) {
            return t <= td ? 1 - Math.cos(w * t) + Math.sin(w * t) / (w * td) - t / td
              : (Math.sin(w * t) - Math.sin(w * (t - td))) / (w * td) - Math.cos(w * t);
          }
          return t <= td ? 1 - Math.cos(w * t) : Math.cos(w * (t - td)) - Math.cos(w * t);
        };
        let best = 0, tb = 0;
        const tEnd = td + 1.5 * v.T, n = 6000;
        for (let i = 1; i <= n; i++) {
          const t = tEnd * i / n, d = Math.abs(dlf(t));
          if (d > best) { best = d; tb = t; }
        }
        const ust = v.F0 / v.k;
        return `
          <span>t_d/T = ${fmt(td / v.T, 3)}</span><span>u_st = ${fmt(ust, 4)} in</span>
          <span class="big ok">DLF_max = ${fmt(best, 3)} at t = ${fmt(tb, 3)} s ${tb > td ? '(after the pulse)' : '(during the pulse)'}</span>
          <span>u_max = ${fmt(best * ust, 4)} in</span>`;
      });
    },

    /* Elastoplastic SDOF by the step-by-step linear acceleration method (Chapter 6, Paz §6.7) */
    'elastoplastic-sdof'(el) {
      el.classList.add('calc');
      const fields = [
        { name: 'm', label: 'm (kip·s²/in)', value: 0.2 },
        { name: 'k', label: 'k (kip/in)', value: 12.35 },
        { name: 'xi', label: 'Damping ratio ξ', value: 0.087 },
        { name: 'Ry', label: 'Yield force R_t = −R_c (kip)', value: 15 },
        { name: 'dt', label: 'Time step Δt (s)', value: 0.1 },
        { name: 'tend', label: 'End time (s)', value: 1.5 }
      ];
      el.innerHTML = `
        <div class="calc-head">🧮 ${el.dataset.title || 'Calculator'}</div>
        <div class="calc-grid">
          ${fields.map((f) => `<label>${f.label}<input type="number" step="any" name="${f.name}" value="${f.value}"></label>`).join('')}
          <label style="grid-column: 1 / -1">Load points t, F (s, kip) separated by “;”<input type="text" name="pts" value="0,0; 0.45,20; 1.1,0; 1.2,-10; 1.4,0"></label>
        </div>
        <div class="calc-out"></div>
        <div class="tbl-wrap"><table class="tbl num ep-table"></table></div>`;
      const out = el.querySelector('.calc-out'), table = el.querySelector('.ep-table');
      const run = () => {
        const v = {};
        el.querySelectorAll('input[type=number]').forEach((i) => { v[i.name] = num(i.value); });
        const pts = el.querySelector('input[name=pts]').value.split(';')
          .map((s) => s.split(',').map(Number)).filter((p) => p.length === 2 && p.every(isFinite))
          .sort((a, b) => a[0] - b[0]);
        if (!pts.length || !(v.m > 0 && v.k > 0 && v.dt > 0 && v.Ry > 0)) { out.innerHTML = '<span class="ng">Check the inputs</span>'; table.innerHTML = ''; return; }
        const F = (t) => {
          if (t <= pts[0][0]) return pts[0][1];
          for (let i = 1; i < pts.length; i++) {
            if (t <= pts[i][0]) {
              const [t0, f0] = pts[i - 1], [t1, f1] = pts[i];
              return f0 + (f1 - f0) * (t - t0) / (t1 - t0);
            }
          }
          return 0;
        };
        const { m, k, dt } = v, c = v.xi * 2 * Math.sqrt(k * m), Rt = v.Ry, Rc = -v.Ry;
        let u = 0, ud = 0, ua = F(0) / m, ut = Rt / k, uc = Rc / k, key = 0, R = 0;
        let umax = 0, rows = [`<tr><td>0</td><td>${fmt(F(0), 3)}</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>`];
        const steps = Math.min(2000, Math.round(v.tend / dt));
        for (let i = 0; i < steps; i++) {
          const t = i * dt, kp = key === 0 ? k : 0;
          const kb = kp + 6 / dt ** 2 * m + 3 / dt * c;
          const dFb = F(t + dt) - F(t) + (6 / dt * m + 3 * c) * ud + (3 * m + dt / 2 * c) * ua;
          const du = dFb / kb, dv = 3 / dt * du - 3 * ud - dt / 2 * ua;
          const u1 = u + du, v1 = ud + dv;
          if (key === 0) R = Rt - (ut - u1) * k;
          if (key === 0) {
            if (u1 > ut) { key = 1; R = Rt; } else if (u1 < uc) { key = -1; R = Rc; }
          } else if (key === 1) {
            R = Rt;
            if (v1 < 0) { key = 0; ut = u1; uc = u1 - (Rt - Rc) / k; }
          } else {
            R = Rc;
            if (v1 > 0) { key = 0; uc = u1; ut = u1 + (Rt - Rc) / k; }
          }
          ua = (F(t + dt) - c * v1 - R) / m; u = u1; ud = v1;
          umax = Math.max(umax, Math.abs(u));
          if (i < 60) rows.push(`<tr><td>${fmt(t + dt, 3)}</td><td>${fmt(F(t + dt), 3)}</td><td>${fmt(u, 4)}</td><td>${key}</td><td>${fmt(ud, 4)}</td><td>${fmt(R, 3)}</td></tr>`);
        }
        out.innerHTML = `
          <span>c = ${fmt(c, 3)}</span><span>u_y = ${fmt(Rt / k, 3)} in</span><span>T = ${fmt(2 * Math.PI * Math.sqrt(m / k), 3)} s</span>
          <span class="big ok">|u|max = ${fmt(umax, 3)} in · ductility μ = ${fmt(umax / (Rt / k), 2)}</span>`;
        table.innerHTML = `<thead><tr><th>t (s)</th><th>F</th><th>u (in)</th><th>KEY</th><th>u̇ (in/s)</th><th>R</th></tr></thead><tbody>${rows.join('')}</tbody>`;
      };
      el.addEventListener('input', run);
      run();
    },

    /* Two-story shear building: frequencies, normal modes, participation (Chapters 7–8) */
    'shear-building-2dof'(el) {
      calc(el, [
        { name: 'm1', label: 'm₁ (lb·s²/in)', value: 136 },
        { name: 'm2', label: 'm₂ (lb·s²/in)', value: 66 },
        { name: 'k1', label: 'k₁ (lb/in)', value: 30700 },
        { name: 'k2', label: 'k₂ (lb/in)', value: 44300 }
      ], (v) => {
        const { m1, m2, k1, k2 } = v;
        const a = m1 * m2, b = -((k1 + k2) * m2 + m1 * k2), cc = k1 * k2;
        const disc = Math.sqrt(b * b - 4 * a * cc);
        const lam = [(-b - disc) / (2 * a), (-b + disc) / (2 * a)];
        const modes = lam.map((l) => {
          const ratio = (k1 + k2 - m1 * l) / k2; // a2/a1
          const s = Math.sqrt(m1 + m2 * ratio * ratio);
          const p1 = 1 / s, p2 = ratio / s, G = m1 * p1 + m2 * p2;
          return { w: Math.sqrt(l), ratio, p1, p2, G, eff: G * G / (m1 + m2) };
        });
        return modes.map((md, i) => `
          <span class="big ok">ω${i + 1} = ${fmt(md.w, 2)} rad/s · f = ${fmt(md.w / 2 / Math.PI, 2)} cps · T = ${fmt(2 * Math.PI / md.w, 3)} s</span>
          <span>a₂/a₁ = ${fmt(md.ratio, 3)}</span><span>φ = (${fmt(md.p1, 5)}, ${fmt(md.p2, 5)})</span>
          <span>Γ = ${fmt(md.G, 3)}</span><span>Effective mass ${fmt(md.eff * 100, 1)} %</span>`).join('');
      });
    },

    /* Natural frequencies of uniform beams with distributed mass (Chapter 17) */
    'beam-frequencies'(el) {
      calc(el, [
        { name: 'bc', label: 'Supports: 1 SS, 2 free–free, 3 fixed–fixed, 4 cantilever, 5 fixed–SS', value: 3 },
        { name: 'L', label: 'Length L (in)', value: 200 },
        { name: 'E', label: 'E (psi)', value: 6.58e6 },
        { name: 'I', label: 'I (in⁴)', value: 100 },
        { name: 'm', label: 'm̄ (lb·s²/in per in)', value: 0.1 }
      ], (v) => {
        const table = {
          1: [Math.PI, 2 * Math.PI, 3 * Math.PI],
          2: [4.7300, 7.8532, 10.9956],
          3: [4.7300, 7.8532, 10.9956],
          4: [1.8751, 4.6941, 7.8548],
          5: [3.9266, 7.0686, 10.2102]
        };
        const al = table[Math.round(v.bc)];
        if (!al) return '<span class="ng">Choose supports 1–5</span>';
        const base = Math.sqrt(v.E * v.I / (v.m * v.L ** 4));
        return al.map((a, i) => `<span class="${i ? '' : 'big ok'}">f${i + 1} = ${fmt(a * a * base / (2 * Math.PI), 2)} cps (C = ${fmt(a * a, 2)})</span>`).join('');
      });
    },

    /* UBC-97 equivalent lateral force method for a building of up to four levels (Chapter 23) */
    'ubc-elf'(el) {
      calc(el, [
        { name: 'w1', label: 'w₁ (kip)', value: 789.1 },
        { name: 'w2', label: 'w₂ (kip)', value: 789.1 },
        { name: 'w3', label: 'w₃ (kip)', value: 789.1 },
        { name: 'w4', label: 'w₄ roof (kip)', value: 645.1 },
        { name: 'h', label: 'Story height (ft)', value: 12 },
        { name: 'Ct', label: 'C_t', value: 0.03 },
        { name: 'Ca', label: 'C_a', value: 0.3 },
        { name: 'Cv', label: 'C_v', value: 0.3 },
        { name: 'I', label: 'I', value: 1.0 },
        { name: 'R', label: 'R', value: 8.5 }
      ], (v) => {
        const w = [v.w1, v.w2, v.w3, v.w4].filter((x) => x > 0);
        const n = w.length, hN = n * v.h, W = w.reduce((s, x) => s + x, 0);
        const T = v.Ct * hN ** 0.75;
        const V0 = v.Cv * v.I / (v.R * T) * W, Vmax = 2.5 * v.Ca * v.I / v.R * W, Vmin = 0.11 * v.Ca * v.I * W;
        const V = Math.max(Math.min(V0, Vmax), Vmin);
        const Ft = T > 0.7 ? Math.min(0.07 * T * V, 0.25 * V) : 0;
        const wh = w.map((x, i) => x * v.h * (i + 1)), sum = wh.reduce((s, x) => s + x, 0);
        const Fx = wh.map((x) => (V - Ft) * x / sum);
        let acc = Ft;
        const Vx = Fx.map((_, i) => Fx[n - 1 - i]).map((f) => (acc += f));
        return `
          <span>W = ${fmt(W, 1)} kip</span><span>h_N = ${fmt(hN, 0)} ft</span><span>T = ${fmt(T, 3)} s</span>
          <span>C_vIW/RT = ${fmt(V0, 1)}</span><span>max ${fmt(Vmax, 1)}</span><span>min ${fmt(Vmin, 1)}</span>
          <span class="big ok">V = ${fmt(V, 1)} kip · F_t = ${fmt(Ft, 1)} kip</span>
          ${Fx.map((f, i) => `<span>F${i + 1} = ${fmt(f, 1)} · V${i + 1} = ${fmt(Vx[n - 1 - i], 1)}</span>`).join('')}`;
      });
    },

    /* IBC-2000 seismic base shear by the equivalent lateral force method (Chapter 25) */
    'ibc-base-shear'(el) {
      calc(el, [
        { name: 'Ss', label: 'S_S (g)', value: 1.5 },
        { name: 'S1', label: 'S₁ (g)', value: 0.6 },
        { name: 'Fa', label: 'F_a', value: 1.0 },
        { name: 'Fv', label: 'F_v', value: 1.0 },
        { name: 'R', label: 'R', value: 8 },
        { name: 'IE', label: 'I_E', value: 1.0 },
        { name: 'hN', label: 'h_N (ft)', value: 48 },
        { name: 'Ct', label: 'C_t', value: 0.03 },
        { name: 'W', label: 'W (kip)', value: 3012.4 }
      ], (v) => {
        const SDS = 2 / 3 * v.Fa * v.Ss, SD1 = 2 / 3 * v.Fv * v.S1;
        const Ta = v.Ct * v.hN ** 0.75, Ts = SD1 / SDS;
        const Cs0 = SDS / (v.R / v.IE), Cmax = SD1 / (v.R / v.IE * Ta);
        let Cmin = 0.044 * SDS * v.IE;
        if (v.S1 >= 0.6) Cmin = Math.max(Cmin, 0.5 * v.S1 / (v.R / v.IE));
        const Cs = Math.max(Math.min(Cs0, Cmax), Cmin);
        return `
          <span>S_MS = ${fmt(v.Fa * v.Ss, 3)} g</span><span>S_M1 = ${fmt(v.Fv * v.S1, 3)} g</span>
          <span>S_DS = ${fmt(SDS, 3)} g</span><span>S_D1 = ${fmt(SD1, 3)} g</span><span>T_s = ${fmt(Ts, 3)} s</span>
          <span>T_a = ${fmt(Ta, 3)} s</span><span>S_DS/(R/I) = ${fmt(Cs0, 4)}</span><span>max ${fmt(Cmax, 4)}</span><span>min ${fmt(Cmin, 4)}</span>
          <span class="big ok">C_s = ${fmt(Cs, 4)} · V = ${fmt(Cs * v.W, 1)} kip</span>`;
      });
    },

    /* AI course: least-squares fit of x, y points — straight line or
       Abrams-type exponential (a straight line in ln y) — with a plot */
    'linreg-fit'(el) {
      el.classList.add('calc');
      el.innerHTML = `
        <div class="calc-head">🧮 ${el.dataset.title || 'Calculator'}</div>
        <div class="calc-grid">
          <label style="grid-column: 1 / -1">Data points x, y (one pair per line)<textarea name="pts">0.40, 45.0\n0.45, 40.5\n0.50, 35.0\n0.55, 32.0\n0.60, 28.0</textarea></label>
          <label>Model<select name="model"><option value="lin">Line: y = b₀ + b₁x</option><option value="exp">Abrams: y = A / Bˣ</option></select></label>
          <label>Predict at x<input type="number" step="any" name="xp" value="0.48"></label>
        </div>
        <div class="calc-out"></div>
        <svg class="plot" viewBox="0 0 520 250" role="img" aria-label="Data points and fitted curve"></svg>`;
      const out = el.querySelector('.calc-out'), svg = el.querySelector('svg');
      const run = () => {
        const pts = el.querySelector('textarea').value.split(/[;\n]/)
          .map((s) => s.trim().split(/[,\s]+/).map(Number)).filter((p) => p.length === 2 && p.every(isFinite));
        const exp = el.querySelector('select').value === 'exp';
        const xp = num(el.querySelector('input[name=xp]').value);
        const n = pts.length;
        if (n < 2 || (exp && pts.some((p) => p[1] <= 0))) {
          out.innerHTML = `<span class="ng">Enter at least two points${exp ? ' with y &gt; 0' : ''}</span>`; svg.innerHTML = ''; return;
        }
        const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
        const Y = exp ? ys.map(Math.log) : ys;
        const mx = xs.reduce((a, b) => a + b) / n, mY = Y.reduce((a, b) => a + b) / n;
        let sxx = 0, sxy = 0;
        xs.forEach((x, i) => { sxx += (x - mx) ** 2; sxy += (x - mx) * (Y[i] - mY); });
        if (sxx === 0) { out.innerHTML = '<span class="ng">The x values must not all be equal</span>'; svg.innerHTML = ''; return; }
        const b1 = sxy / sxx, b0 = mY - b1 * mx;
        const f = (x) => (exp ? Math.exp(b0 + b1 * x) : b0 + b1 * x);
        const my = ys.reduce((a, b) => a + b) / n;
        let sse = 0, sst = 0;
        ys.forEach((y, i) => { sse += (y - f(xs[i])) ** 2; sst += (y - my) ** 2; });
        const r2 = sst > 0 ? 1 - sse / sst : 1;
        out.innerHTML = `
          ${exp ? `<span>A = ${fmt(Math.exp(b0), 2)}</span><span>B = ${fmt(Math.exp(-b1), 3)}</span>`
                : `<span>b₀ = ${fmt(b0, 3)}</span><span>b₁ = ${fmt(b1, 3)}</span>`}
          <span>n = ${n}</span><span>RMSE = ${fmt(Math.sqrt(sse / n), 3)}</span>
          <span class="big">R² = ${fmt(r2, 4)}${isFinite(xp) ? ` · prediction at x = ${xp}: y = ${fmt(f(xp), 2)}` : ''}</span>`;
        // Plot
        const X0 = 50, X1 = 505, Y0 = 215, Y1 = 15;
        let xl = Math.min(...xs), xh = Math.max(...xs);
        if (isFinite(xp)) { xl = Math.min(xl, xp); xh = Math.max(xh, xp); }
        const padx = (xh - xl) * 0.06 || 1; xl -= padx; xh += padx;
        const curve = Array.from({ length: 61 }, (_, i) => xl + (xh - xl) * i / 60).map((x) => [x, f(x)]);
        const all = ys.concat(curve.map((c) => c[1]));
        let yl = Math.min(...all), yh = Math.max(...all);
        const pady = (yh - yl) * 0.08 || 1; yl -= pady; yh += pady;
        const sx = (x) => X0 + (x - xl) / (xh - xl) * (X1 - X0), sy = (y) => Y0 - (y - yl) / (yh - yl) * (Y0 - Y1);
        const dec = (r) => (r >= 50 ? 0 : r >= 5 ? 1 : r >= 0.5 ? 2 : 3);
        const ticks = (lo, hi) => Array.from({ length: 5 }, (_, i) => lo + (hi - lo) * i / 4);
        svg.innerHTML = `
          <g style="stroke:var(--line)">${ticks(xl, xh).map((t) => `<path d="M${sx(t)} ${Y1}V${Y0}"/>`).join('')}${ticks(yl, yh).map((t) => `<path d="M${X0} ${sy(t)}H${X1}"/>`).join('')}</g>
          <path d="M${X0} ${Y1}V${Y0}H${X1}" fill="none" style="stroke:var(--muted)"/>
          <g style="fill:var(--muted)" font-size="11">
            ${ticks(xl, xh).map((t) => `<text x="${sx(t)}" y="${Y0 + 16}" text-anchor="middle">${t.toFixed(dec(xh - xl))}</text>`).join('')}
            ${ticks(yl, yh).map((t) => `<text x="${X0 - 6}" y="${sy(t) + 4}" text-anchor="end">${t.toFixed(dec(yh - yl))}</text>`).join('')}
            <text x="${X1}" y="${Y0 + 32}" text-anchor="end">x</text><text x="${X0 - 40}" y="${Y1 + 4}">y</text>
          </g>
          <polyline fill="none" stroke-width="2.2" style="stroke:var(--accent)" points="${curve.map((c) => `${sx(c[0]).toFixed(1)},${sy(c[1]).toFixed(1)}`).join(' ')}"/>
          ${pts.map((p) => `<circle cx="${sx(p[0])}" cy="${sy(p[1])}" r="4.5" fill="#f7a98b" stroke="#c4623f"/>`).join('')}
          ${isFinite(xp) ? `<circle cx="${sx(xp)}" cy="${sy(f(xp))}" r="5" fill="none" stroke-width="2" style="stroke:var(--success)"/>` : ''}`;
      };
      el.addEventListener('input', run);
      run();
    },

    /* AI course: confusion matrix -> accuracy, precision, recall, F1 */
    'confusion-metrics'(el) {
      calc(el, [
        { name: 'tp', label: 'TP (true positive)', value: 33 },
        { name: 'fp', label: 'FP (false alarm)', value: 3 },
        { name: 'fn', label: 'FN (missed)', value: 5 },
        { name: 'tn', label: 'TN (true negative)', value: 59 }
      ], (v) => {
        const n = v.tp + v.fp + v.fn + v.tn;
        if (!(n > 0) || [v.tp, v.fp, v.fn, v.tn].some((x) => !(x >= 0))) return '<span class="ng">Enter counts ≥ 0</span>';
        const precision = v.tp / (v.tp + v.fp), recall = v.tp / (v.tp + v.fn);
        const spec = v.tn / (v.tn + v.fp), f1 = 2 * precision * recall / (precision + recall);
        return `
          <span>Cases = ${n}</span><span>Accuracy = ${fmt((v.tp + v.tn) / n, 3)}</span>
          <span>Precision = ${fmt(precision, 3)}</span><span>Recall (sensitivity) = ${fmt(recall, 3)}</span>
          <span>Specificity = ${fmt(spec, 3)}</span><span>Missed positives = ${fmt(100 * v.fn / (v.tp + v.fn), 1)} %</span>
          <span class="big">F1 = ${fmt(f1, 3)}</span>`;
      });
    },

    /* AI course: one artificial neuron with three inputs */
    'neuron'(el) {
      calc(el, [
        { name: 'x1', label: 'Input x₁', value: 0.5 },
        { name: 'x2', label: 'Input x₂', value: -1.0 },
        { name: 'x3', label: 'Input x₃', value: 0 },
        { name: 'w1', label: 'Weight w₁', value: 0.8 },
        { name: 'w2', label: 'Weight w₂', value: -0.4 },
        { name: 'w3', label: 'Weight w₃', value: 0 },
        { name: 'b', label: 'Bias b', value: 0.1 }
      ], (v) => {
        const z = v.x1 * v.w1 + v.x2 * v.w2 + v.x3 * v.w3 + v.b;
        return `
          <span>z = Σwᵢxᵢ + b = ${fmt(z, 4)}</span>
          <span>ReLU = ${fmt(Math.max(0, z), 4)}</span>
          <span>Sigmoid = ${fmt(1 / (1 + Math.exp(-z)), 4)}</span>
          <span>tanh = ${fmt(Math.tanh(z), 4)}</span>
          <span class="big">Output with ReLU: ${fmt(Math.max(0, z), 4)}${z <= 0 ? ' (neuron is “off”)' : ''}</span>`;
      });
    },

    /* midas Gen course: ASCE 7-10 design spectrum values, seismic design
       category, period limit and equivalent lateral force coefficient */
    'asce7-seismic'(el) {
      el.classList.add('calc');
      const fields = [
        { name: 'Ss', label: 'S_S (g)', value: 1.0 },
        { name: 'S1', label: 'S₁ (g)', value: 0.3 },
        { name: 'R', label: 'R', value: 8 },
        { name: 'Ie', label: 'I_e', value: 1.0 },
        { name: 'hn', label: 'h_n (ft)', value: 148 },
        { name: 'T', label: 'T used (s)', value: 1.2 },
        { name: 'TL', label: 'T_L (s)', value: 8 }
      ];
      el.innerHTML = `
        <div class="calc-head">🧮 ${el.dataset.title || 'Calculator'}</div>
        <div class="calc-grid">
          <label>Site class<select name="site"><option>A</option><option>B</option><option selected>C</option><option>D</option><option>E</option></select></label>
          ${fields.map((f) => `<label>${f.label}<input type="number" step="any" name="${f.name}" value="${f.value}"></label>`).join('')}
          <label>System for T_a<select name="sys"><option value="0.016,0.9">Concrete moment frame</option><option value="0.028,0.8">Steel moment frame</option><option value="0.03,0.75">Steel EBF / BRBF</option><option value="0.02,0.75" selected>All other (dual, walls)</option></select></label>
        </div>
        <div class="calc-out"></div>`;
      const out = el.querySelector('.calc-out');
      // ASCE 7-10 Tables 11.4-1 and 11.4-2 (linear interpolation)
      const FA = { A: [0.8, 0.8, 0.8, 0.8, 0.8], B: [1, 1, 1, 1, 1], C: [1.2, 1.2, 1.1, 1.0, 1.0], D: [1.6, 1.4, 1.2, 1.1, 1.0], E: [2.5, 1.7, 1.2, 0.9, 0.9] };
      const FV = { A: [0.8, 0.8, 0.8, 0.8, 0.8], B: [1, 1, 1, 1, 1], C: [1.7, 1.6, 1.5, 1.4, 1.3], D: [2.4, 2.0, 1.8, 1.6, 1.5], E: [3.5, 3.2, 2.8, 2.4, 2.4] };
      const interp = (xs, ys, x) => {
        if (x <= xs[0]) return ys[0];
        for (let i = 1; i < xs.length; i++) if (x <= xs[i]) return ys[i - 1] + (ys[i] - ys[i - 1]) * (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
        return ys[ys.length - 1];
      };
      const run = () => {
        const v = {};
        el.querySelectorAll('input').forEach((i) => { v[i.name] = num(i.value); });
        const site = el.querySelector('select[name=site]').value;
        const [Ct, x] = el.querySelector('select[name=sys]').value.split(',').map(Number);
        if (!(v.Ss > 0 && v.S1 > 0 && v.R > 0 && v.Ie > 0 && v.T > 0 && v.hn > 0)) { out.innerHTML = '<span class="ng">Check the inputs</span>'; return; }
        const Fa = interp([0.25, 0.5, 0.75, 1.0, 1.25], FA[site], v.Ss), Fv = interp([0.1, 0.2, 0.3, 0.4, 0.5], FV[site], v.S1);
        const SDS = 2 / 3 * Fa * v.Ss, SD1 = 2 / 3 * Fv * v.S1;
        const cat = (val, lims) => (val < lims[0] ? 'A' : val < lims[1] ? 'B' : val < lims[2] ? 'C' : 'D');
        const sdcA = cat(SDS, [0.167, 0.33, 0.5]), sdcB = cat(SD1, [0.067, 0.133, 0.2]);
        const sdc = v.S1 >= 0.75 ? 'E' : (sdcA > sdcB ? sdcA : sdcB);
        const Ta = Ct * v.hn ** x, Cu = interp([0.1, 0.15, 0.2, 0.3, 0.4], [1.7, 1.6, 1.5, 1.4, 1.4], SD1);
        const RI = v.R / v.Ie;
        const CsCalc = SDS / RI;
        const CsMax = v.T <= v.TL ? SD1 / (v.T * RI) : SD1 * v.TL / (v.T ** 2 * RI);
        let CsMin = Math.max(0.044 * SDS * v.Ie, 0.01);
        if (v.S1 >= 0.6) CsMin = Math.max(CsMin, 0.5 * v.S1 / RI);
        const Cs = Math.max(Math.min(CsCalc, CsMax), CsMin);
        const k = v.T <= 0.5 ? 1 : v.T >= 2.5 ? 2 : 1 + (v.T - 0.5) / 2;
        out.innerHTML = `
          <span>F_a = ${fmt(Fa, 3)}</span><span>F_v = ${fmt(Fv, 3)}</span>
          <span>S_DS = ${fmt(SDS, 4)} g</span><span>S_D1 = ${fmt(SD1, 4)} g</span>
          <span>T₀ = ${fmt(0.2 * SD1 / SDS, 3)} s</span><span>T_s = ${fmt(SD1 / SDS, 3)} s</span>
          <span>SDC (risk category I–III) = ${sdc}</span>
          <span>T_a = ${fmt(Ta, 3)} s</span><span>C_u = ${fmt(Cu, 2)}</span><span>C_uT_a = ${fmt(Cu * Ta, 3)} s</span>
          ${v.T > 1.02 * Cu * Ta ? '<span class="ng">T used &gt; C_uT_a: not allowed for the ELF base shear</span>'
            : v.T > Cu * Ta ? '<span>T used ≈ C_uT_a (rounded)</span>' : ''}
          <span>C_s = S_DS/(R/I) = ${fmt(CsCalc, 4)}</span><span>max = ${fmt(CsMax, 4)}</span><span>min = ${fmt(CsMin, 4)}</span>
          <span>k = ${fmt(k, 3)}</span>
          <span class="big">C_s = ${fmt(Cs, 4)} → V = ${fmt(Cs, 4)} W (${fmt(100 * Cs, 2)} % of the seismic weight)</span>`;
      };
      el.addEventListener('input', run);
      run();
    },

    /* midas Gen course: ASCE 7-10 §4.7 live load reduction factor */
    'llr-asce7'(el) {
      calc(el, [
        { name: 'KLL', label: 'K_LL (columns: 4)', value: 4 },
        { name: 'AT', label: 'Tributary area A_T (ft²)', value: 572 },
        { name: 'floors', label: 'Floors supported', value: 1 }
      ], (v) => {
        const area = v.AT * v.floors;
        if (!(v.KLL > 0 && area > 0)) return '<span class="ng">Check the inputs</span>';
        const kat = v.KLL * area;
        const raw = kat < 400 ? 1 : 0.25 + 15 / Math.sqrt(kat);
        const min = v.floors >= 2 ? 0.4 : 0.5;
        const f = Math.max(raw, min);
        return `
          <span>K_LL·A_T = ${fmt(kat, 0)} ft²</span>
          ${kat < 400 ? '<span>K_LL·A_T &lt; 400 ft²: no reduction</span>' : `<span>0.25 + 15/√(K_LL A_T) = ${fmt(raw, 3)}</span>`}
          <span>Lower limit = ${min} (${v.floors >= 2 ? 'two or more floors' : 'one floor'})</span>
          <span class="big">L / L₀ = ${fmt(f, 3)}</span>`;
      });
    },

    /* AS 4100 §6.3.3: member axial capacity of a steel column */
    'steel-column'(el) {
      calc(el, [
        { name: 'A', label: 'A_n (mm²)', value: 4020 },
        { name: 'kf', label: 'Form factor k_f', value: 1.0 },
        { name: 'fy', label: 'f_y (MPa)', value: 350 },
        { name: 'le', label: 'l_e (mm)', value: 3800 },
        { name: 'r', label: 'r (mm)', value: 75.4 },
        { name: 'ab', label: 'α_b (−1, −0.5, 0, 0.5, 1)', value: -0.5 },
        { name: 'N', label: 'N* (kN)', value: 1030 }
      ], (v) => {
        const Ns = v.kf * v.A * v.fy / 1000;
        const ln = v.le / v.r * Math.sqrt(v.kf) * Math.sqrt(v.fy / 250);
        const aa = 2100 * (ln - 13.5) / (ln * ln - 15.3 * ln + 2050);
        const lam = ln + aa * v.ab;
        const eta = Math.max(0.00326 * (lam - 13.5), 0);
        const r2 = (lam / 90) ** 2;
        const xi = (r2 + 1 + eta) / (2 * r2);
        const ac = Math.min(1, xi * (1 - Math.sqrt(Math.max(0, 1 - (90 / (xi * lam)) ** 2))));
        const phiNc = 0.9 * ac * Ns;
        const ok = v.N <= phiNc;
        return `
          <span>N_s = ${fmt(Ns, 0)} kN</span><span>λ_n = ${fmt(ln, 1)}</span><span>α_c = ${fmt(ac, 3)}</span>
          <span class="big ${ok ? 'ok' : 'ng'}">φN_c = ${fmt(phiNc, 0)} kN ${ok ? '≥' : '<'} N* = ${fmt(v.N, 0)} kN → ${ok ? 'OK' : 'NOT OK'}</span>`;
      });
    },

    /* AS 4100 §5.6.1: member moment capacity of a doubly symmetric I-beam */
    'steel-beam'(el) {
      calc(el, [
        { name: 'fy', label: 'f_y (MPa)', value: 360 },
        { name: 'Ze', label: 'Z_e (10³ mm³)', value: 9840 },
        { name: 'Iy', label: 'I_y (10⁶ mm⁴)', value: 179 },
        { name: 'J', label: 'J (10³ mm⁴)', value: 4020 },
        { name: 'Iw', label: 'I_w (10⁹ mm⁶)', value: 35000 },
        { name: 'le', label: 'l_e (mm)', value: 13900 },
        { name: 'am', label: 'α_m', value: 1.35 },
        { name: 'M', label: 'M* (kN·m)', value: 806 }
      ], (v) => {
        const E = 200000, G = 80000;
        const Ms = v.fy * v.Ze * 1e3 / 1e6;
        const A = Math.PI ** 2 * E * v.Iy * 1e6 / v.le ** 2;
        const B = Math.PI ** 2 * E * v.Iw * 1e9 / v.le ** 2;
        const Mo = Math.sqrt(A * (G * v.J * 1e3 + B)) / 1e6;
        const as = 0.6 * (Math.sqrt((Ms / Mo) ** 2 + 3) - Ms / Mo);
        const Mb = Math.min(v.am * as * Ms, Ms);
        const ok = v.M <= 0.9 * Mb;
        return `
          <span>M_s = ${fmt(Ms, 0)} kN·m</span><span>M_o = ${fmt(Mo, 0)} kN·m</span><span>α_s = ${fmt(as, 3)}</span>
          <span class="big ${ok ? 'ok' : 'ng'}">φM_b = ${fmt(0.9 * Mb, 0)} kN·m ${ok ? '≥' : '<'} M* = ${fmt(v.M, 0)} kN·m → ${ok ? 'OK' : 'NOT OK'}</span>`;
      });
    },

    /* Continuous beam (up to 3 spans, constant EI) by the stiffness method:
       UDL w and a mid-span point load P on each span; ends fixed (1) or pinned (0) */
    'continuous-beam'(el) {
      calc(el, [
        { name: 'L1', label: 'L1 (m)', value: 12 }, { name: 'w1', label: 'w1 (kN/m)', value: 0 }, { name: 'P1', label: 'P1 mid (kN)', value: 0 },
        { name: 'L2', label: 'L2 (m, 0 = none)', value: 12 }, { name: 'w2', label: 'w2 (kN/m)', value: 20 }, { name: 'P2', label: 'P2 mid (kN)', value: 0 },
        { name: 'L3', label: 'L3 (m, 0 = none)', value: 8 }, { name: 'w3', label: 'w3 (kN/m)', value: 0 }, { name: 'P3', label: 'P3 mid (kN)', value: 250 },
        { name: 'fixL', label: 'Left end fixed (1/0)', value: 1 }, { name: 'fixR', label: 'Right end fixed (1/0)', value: 1 }
      ], (v) => {
        const spans = [[v.L1, v.w1, v.P1], [v.L2, v.w2, v.P2], [v.L3, v.w3, v.P3]].filter((s) => s[0] > 0);
        if (!spans.length) return '<span class="big ng">Enter at least one span length.</span>';
        const n = spans.length + 1;
        // Rotation DOFs only (EI = 1); FEM counter-clockwise positive
        const K = Array.from({ length: n }, () => new Array(n).fill(0));
        const F = new Array(n).fill(0);
        const fem = spans.map(([L, w, P]) => w * L * L / 12 + P * L / 8);
        spans.forEach(([L], i) => {
          K[i][i] += 4 / L; K[i][i + 1] += 2 / L; K[i + 1][i] += 2 / L; K[i + 1][i + 1] += 4 / L;
          F[i] -= fem[i]; F[i + 1] += fem[i];
        });
        const free = [...Array(n).keys()].filter((i) => !((i === 0 && v.fixL === 1) || (i === n - 1 && v.fixR === 1)));
        // Gauss elimination on the free rotations
        const A = free.map((r) => free.map((c) => K[r][c]).concat(F[r]));
        for (let p = 0; p < A.length; p++) {
          for (let r = p + 1; r < A.length; r++) {
            const f = A[r][p] / A[p][p];
            for (let c = p; c <= A.length; c++) A[r][c] -= f * A[p][c];
          }
        }
        const th = new Array(n).fill(0);
        for (let p = A.length - 1; p >= 0; p--) {
          let s = A[p][A.length];
          for (let c = p + 1; c < A.length; c++) s -= A[p][c] * th[free[c]];
          th[free[p]] = s / A[p][p];
        }
        const R = new Array(n).fill(0);
        const Msup = new Array(n).fill(0);
        const spanMax = [];
        spans.forEach(([L, w, P], i) => {
          const Mi = (4 * th[i] + 2 * th[i + 1]) / L + fem[i];      // member end moments (ccw +)
          const Mj = (2 * th[i] + 4 * th[i + 1]) / L - fem[i];
          const Vi = (w * L * L / 2 + P * L / 2 + Mi + Mj) / L;
          R[i] += Vi; R[i + 1] += w * L + P - Vi;
          Msup[i] = -Mi; Msup[i + 1] = Mj;                          // beam sign: sagging +
          let best = -Infinity, at = 0;
          for (let k = 0; k <= 200; k++) {
            const x = L * k / 200;
            const M = -Mi + Vi * x - w * x * x / 2 - (x > L / 2 ? P * (x - L / 2) : 0);
            if (M > best) { best = M; at = x; }
          }
          spanMax.push(`<span>Span ${i + 1}: M⁺max = ${fmt(best, 1)} kN·m at x = ${fmt(at, 2)} m</span>`);
        });
        const names = 'ABCD';
        return `
          <span class="big">Support moments (− = hogging): ${Msup.map((m, i) => `M${names[i]} = ${fmt(m, 1)}`).join(' · ')} kN·m</span>
          <span class="big ok">Reactions: ${R.map((r, i) => `R${names[i]} = ${fmt(r, 1)}`).join(' · ')} kN</span>
          ${spanMax.join('')}`;
      });
    }
  };

  /* ---------- Start ---------- */
  const lesson = lessons.find((l) => l.id === params.get('lesson'));
  if (lesson) renderLesson(lesson);
  else renderIndex(params.get('q') || '');
})();
