/* Lesson 4 — Flexural design of beams */
KCE_COURSE.lessons.push({
  id: 'flexural-design',
  num: 4,
  title: 'Flexural Design of Beams',
  desc: 'Sizing beams and selecting steel: Ru–ρ relation, minimum depth, doubly reinforced and T-beam design.',
  icon: '✏️',
  color: 'mint',
  meta: ['ACI 318M-19 Ch.9, 22.2', 'Beams', 'Design'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Design</strong> is the reverse of analysis: the factored moment \(M_u\) is known and we choose the section size and the steel. A good design is tension-controlled (\(\phi\) = 0.90), uses a practical steel ratio and satisfies the deflection depth limits.</p>` },
        { title: 'Description', html: String.raw`
<p>Minimum depth when deflections are not calculated (ACI 318-19 Table 9.3.1.1 for beams, Table 7.3.1.1 for one-way slabs; written for normal-weight concrete and \(f_y\) = 420 MPa — multiply by \(0.4 + f_y/700\) for other grades, §9.3.1.1.1):</p>
<table class="tbl num">
  <thead><tr><th>Member</th><th>Simply supported</th><th>One end continuous</th><th>Both ends continuous</th><th>Cantilever</th></tr></thead>
  <tbody>
    <tr><td>Beams</td><td>L/16</td><td>L/18.5</td><td>L/21</td><td>L/8</td></tr>
    <tr><td>One-way slabs</td><td>L/20</td><td>L/24</td><td>L/28</td><td>L/10</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Compute \(M_u\) from factored loads (estimate self-weight first).</li>
  <li>Choose a steel ratio (≈ 0.5 – 0.6 \(\rho_{tc}\) or \(\rho \approx 0.01\)) and get the required \(bd^2\).</li>
  <li>Select \(b\), \(h\) (round to 50 mm), compute \(d\).</li>
  <li>Find the exact \(\rho\) from \(R_u\), then \(A_s\); choose bars.</li>
  <li>Check \(a\), \(\varepsilon_t \ge \varepsilon_{ty} + 0.003\) (§9.3.3.1), \(\phi M_n \ge M_u\), \(A_{s,min}\), spacing.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 200" role="img" aria-label="Design flow">
    <g>
      <rect class="conc" x="10" y="70" width="110" height="56" rx="10"/><text x="30" y="96">Loads → Mu</text><text x="34" y="114" class="m">1.2D + 1.6L</text>
      <rect class="conc" x="140" y="70" width="110" height="56" rx="10"/><text x="160" y="96">Choose ρ</text><text x="156" y="114" class="m">bd² = Mu/φRu</text>
      <rect class="conc" x="270" y="70" width="110" height="56" rx="10"/><text x="292" y="96">Size b, h</text><text x="288" y="114" class="m">h ≥ hmin</text>
      <rect class="conc" x="400" y="70" width="110" height="56" rx="10"/><text x="420" y="96">As, bars</text><text x="420" y="114" class="m">ρ from Ru</text>
      <rect class="conc" x="530" y="70" width="100" height="56" rx="10"/><text x="552" y="96">Check</text><text x="542" y="114" class="m">εt, φMn, ρmin</text>
      <path class="acc" d="M120 98h20M250 98h20M380 98h20M510 98h20"/>
    </g>
  </svg>
  <figcaption>Figure 1 — Flexural design flow for a rectangular beam.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Ru – ρ relation', html: String.raw`
<p>Writing \(M_u = \phi M_n\) with \(a = \rho f_y d/(0.85f'_c)\):</p>
$$R_u = \frac{M_u}{\phi b d^2} = \rho f_y\left(1 - 0.59\,\rho\frac{f_y}{f'_c}\right)$$
$$\rho = \frac{0.85f'_c}{f_y}\left(1 - \sqrt{1 - \frac{2R_u}{0.85f'_c}}\right)$$
<p>A beam must be tension-controlled (ACI 318-19 §9.3.3.1), so the largest usable ratio is</p>
$$\rho_{max} = \rho_{tc} = 0.85\beta_1\frac{f'_c}{f_y}\cdot\frac{0.003}{0.006 + \varepsilon_{ty}},\qquad \varepsilon_{ty} = \frac{f_y}{E_s}$$
<p>If the required \(\rho\) exceeds it, enlarge the section or add compression steel.</p>
<div data-widget="flexure-design" data-title="Required tension steel"></div>` },
        { title: 'Doubly reinforced design', html: String.raw`
<ol>
  <li>\(M_{u1} = \phi R_{u,max} b d^2\) with \(\rho_{max} = \rho_{tc}\); \(A_{s1} = \rho_{max} b d\).</li>
  <li>\(M_{u2} = M_u - M_{u1}\); \(A_{s2} = M_{u2}/[\phi f_y (d - d')]\).</li>
  <li>Check compression steel strain at \(c = \frac{0.003}{0.006 + \varepsilon_{ty}}d\): \(\varepsilon'_s = 0.003(c - d')/c\). If \(\varepsilon'_s < \varepsilon_{ty}\), \(f'_s = E_s\varepsilon'_s\).</li>
  <li>\(A_s = A_{s1} + A_{s2}\); \(A'_s = A_{s2} f_y/f'_s\).</li>
  <li>After choosing bars, re-analyse: the bars provided must still give \(\varepsilon_t \ge \varepsilon_{ty} + 0.003\). Rounding \(A_s\) up can push the section into the transition zone — add a little more \(A'_s\) if needed.</li>
</ol>` },
        { title: 'T-beam design', html: String.raw`
<p>Compute the moment the full flange can carry: \(\phi M_{nf} = \phi\,0.85f'_c b_e t\,(d - t/2)\).</p>
<ul>
  <li>If \(M_u \le \phi M_{nf}\): \(a \le t\), design as a rectangle of width \(b_e\).</li>
  <li>If \(M_u > \phi M_{nf}\): \(A_{sf} = 0.85f'_c(b_e - b_w)t/f_y\), \(M_{uf} = \phi A_{sf}f_y(d - t/2)\), and the web carries \(M_u - M_{uf}\) as a rectangle of width \(b_w\).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples — Rectangular',
      subs: [
        { title: 'Example 1: simply supported beam', html: String.raw`
<div class="ex">
  <div class="ex-head">L = 6 m, DL = 21 kN/m (incl. self-weight), LL = 10 kN/m, f'c = 28, fy = 450</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(w_u = 1.2(21) + 1.6(10) = 41.2\) kN/m; \(M_u = 41.2(6)^2/8 = 185.4\) kN·m.</li>
      <li>Try \(\rho = 0.01\): \(R_u = 0.01(450)[1 - 0.59(0.01)(450/28)] = 3.667\) MPa, \(bd^2 = 185.4×10^6/(0.9 × 3.667) = 50.56×10^6\) mm³.</li>
      <li>Choose b = 250 → d = 450 mm; adopt <strong>h = 520 mm</strong>, d = 455 mm (h ≥ L/16 × (0.4 + 450/700) = 391 mm ✓, Table 9.3.1.1).</li>
      <li>\(R_u = 185.4×10^6/(0.9 × 250 × 455^2) = 3.98\) MPa → \(\rho = 0.00974\), \(A_s = 1108\) mm² (\(\rho_{tc}\) = 0.01635 ✓) → <strong>3DB22</strong> (1140 mm²).</li>
      <li>Check: \(a = 86.2\) mm, \(c = 101.4\) mm, \(\varepsilon_t = 0.0105 \ge \varepsilon_{ty} + 0.003 = 0.00525\) ✓
        <span class="result">\(\phi M_n = 190.2\) kN·m ≥ 185.4 kN·m → OK</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 2: doubly reinforced (A\'s yields)', html: String.raw`
<div class="ex">
  <div class="ex-head">b = 250, h = 560, d = 470, d' = 65, Mu = 357 kN·m, f'c = 21, fy = 340</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\varepsilon_{ty} = 340/200\,000 = 0.0017\) → \(c/d = 0.003/0.0077 = 0.3896\).
        \(\rho_{max} = 0.85(0.85)(21/340)(0.3896) = 0.017386\), \(R_{u,max} = 4.930\) MPa.</li>
      <li>\(M_{u1} = 0.9(4.930)(250)(470^2)/10^6 = 245.0\) kN·m; \(A_{s1} = 2043\) mm².</li>
      <li>\(M_{u2} = 357 - 245.0 = 112.0\) kN·m; \(A_{s2} = 112.0×10^6/[0.9(340)(405)] = 904\) mm².</li>
      <li>\(c = 0.3896(470) = 183.1\) mm; \(\varepsilon'_s = 0.003(183.1 - 65)/183.1 = 0.00194 > \varepsilon_{ty} = 0.0017\) → yields.</li>
      <li>Bars: \(A_s\) = 2947 mm² → 6DB25 (2945 mm², 2 layers); \(A'_s\) = 904 mm² → 2DB25 (982 mm²).
        Re-analysis: \(c = 176.0\) mm, \(\varepsilon_t = 0.00501 \ge 0.0047\) ✓, \(\phi M_n = 359.1\) kN·m ≥ 357 ✓.
        <span class="result">6DB25 tension, 2DB25 compression</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 3: doubly reinforced (A\'s does not yield)', html: String.raw`
<div class="ex">
  <div class="ex-head">b = 300, h = 510, d = 420, d' = 65, Mu = 400 kN·m, f'c = 27, fy = 410</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\varepsilon_{ty} = 0.00205\), \(c/d = 0.3727\): \(\rho_{max} = 0.017731\), \(R_{u,max} = 6.115\) MPa, \(M_{u1} = 291.2\) kN·m, \(A_{s1} = 2234\) mm².</li>
      <li>\(M_{u2} = 108.8\) kN·m, \(A_{s2} = 108.8×10^6/[0.9(410)(355)] = 830\) mm².</li>
      <li>\(c = 156.5\) mm, \(\varepsilon'_s = 0.003(156.5 - 65)/156.5 = 0.00175 < \varepsilon_{ty}\) → \(f'_s = 350.8\) MPa.</li>
      <li>\(A'_s = 830(410)/350.8 = 970\) mm²; \(A_s\) = 3064 mm² → 5DB28 (3079 mm²).</li>
      <li>Re-analysis with 2DB25 (982 mm²) gives \(\varepsilon_t = 0.00504\) — just short of 0.00505 because \(A_s\) was rounded up. Use <strong>3DB22</strong> (1140 mm²): \(c = 149.6\) mm, \(\varepsilon_t = 0.00542\) ✓, \(\phi M_n = 404.4\) kN·m ≥ 400 ✓.
        <span class="result">5DB28 tension; 3DB22 compression</span></li>
    </ol>
  </div>
</div>` }
      ]
    },
    {
      title: 'Worked Examples — T-Beams',
      subs: [
        { title: 'Example 4: rectangular behaviour', html: String.raw`
<div class="ex">
  <div class="ex-head">be = 1000, t = 100, bw = 250, d = 370, Mu = 430 kN·m, f'c = 21, fy = 410</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\phi M_{nf} = 0.9(0.85)(21)(1000)(100)(370 - 50)/10^6 = 514.1\) kN·m > \(M_u\) → rectangular, b = 1000.</li>
      <li>\(R_u = 430×10^6/(0.9 × 1000 × 370^2) = 3.49\) MPa → \(\rho = 0.009563\), \(A_s = 3538\) mm².</li>
      <li>With 6DB28 (3695 mm²): \(a = 84.9 \text{ mm} < t\), \(\varepsilon_t = 0.0081 \ge 0.00505\) ✓, \(\phi M_n = 446.6\) kN·m ≥ 430 ✓
        <span class="result">6DB28 (3695 mm²) in two layers</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 5: floor T-beam', html: String.raw`
<div class="ex">
  <div class="ex-head">bw = 300, t = 80, clear span ℓn = 6 m, d = 445, Mu = 730 kN·m, f'c = 21, fy = 410 (beams far apart)</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Overhang = least of \(8(80) = 640\), \(s_w/2\) (large), \(6000/8 = 750\) → 640 mm; \(b_e = 300 + 2(640) = 1580\) mm.</li>
      <li>\(\phi M_{nf} = 0.9(0.85)(21)(1580)(80)(405)/10^6 = 822.4\) kN·m > 730 → rectangular.</li>
      <li>\(\rho = 0.00686\), \(A_s = 4826\) mm²; with 8DB28 (4926 mm²) \(a = 71.6\) mm < t, \(\varepsilon_t = 0.0128\) ✓, \(\phi M_n = 743.8\) kN·m
        <span class="result">8DB28 (4926 mm²)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 6: choosing the depth', html: String.raw`
<div class="ex">
  <div class="ex-head">be = 1220, t = 100, bw = 300, Mu = 1100 kN·m, f'c = 21, fy = 410</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Let the flange just carry \(M_u\): \(0.9(0.85)(21)(1220)(100)(d - 50) = 1100×10^6\) → \(d = 611\) mm (\(A_{s} \approx\) 5312 mm²).</li>
      <li>Adopt <strong>d = 620, h = 710 mm</strong>; \(R_u = 2.61\) MPa → \(\rho = 0.006904\), \(A_s = 5222\) mm².</li>
      <li>Choose 7DB32 (5630 mm²). Now rectangular \(a\) = 106 mm > t, so check as a true T: \(A_{sf} = 0.85(21)(920)(100)/410 = 4005\) mm², \(a = 124.4\) mm, \(c = 146.3\) mm, \(\varepsilon_t = 0.0097\) ✓.
        \(M_n = 4005(410)(570) + 1625(410)(557.8) = 1307.7\) kN·m
        <span class="result">7DB32 (5630 mm²): φMn = 1176.9 kN·m ≥ 1100 ✓</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Design checklist', html: String.raw`
<ul class="check">
  <li>Self-weight included in \(M_u\).</li>
  <li>\(h \ge h_{min}\) from ACI 318-19 Table 9.3.1.1, or deflections calculated (§24.2).</li>
  <li>\(A_{s,min} \le A_s\) and the <em>bars provided</em> give \(\varepsilon_t \ge \varepsilon_{ty} + 0.003\) (or add compression steel).</li>
  <li>Bars fit in \(b\) with clear spacing ≥ 25 mm and \(d_b\); recompute \(d\) for two layers.</li>
  <li>Final \(\phi M_n \ge M_u\).</li>
</ul>` }
      ]
    }
  ]
});
