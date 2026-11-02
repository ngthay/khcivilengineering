/* Lesson 2 — Flexural analysis of beams */
KCE_COURSE.lessons.push({
  id: 'flexural-analysis',
  num: 2,
  title: 'Flexural Analysis of Beams',
  desc: 'Whitney stress block, balanced/tension-controlled sections, φ factor, and capacity of singly and doubly reinforced beams.',
  icon: '📐',
  color: 'blue',
  meta: ['ACI 318M-19 §9.3.3, 21.2, 22.2', 'Beams', 'Analysis'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Analysis</strong> means the section is known (size, steel, materials) and we find its moment capacity \(\phi M_n\). A beam goes through three stages as load increases: uncracked (elastic), cracked with elastic stresses (service), and the ultimate stage where concrete reaches a strain of 0.003. Strength design uses the ultimate stage.</p>` },
        { title: 'Description', html: String.raw`
<p>Basic assumptions (ACI 318-19 §22.2):</p>
<ul>
  <li>Plane sections remain plane — strain varies linearly with depth.</li>
  <li>Maximum usable concrete strain \(\varepsilon_{cu} = 0.003\).</li>
  <li>Steel stress \(f_s = E_s\varepsilon_s \le f_y\).</li>
  <li>Tensile strength of concrete is ignored.</li>
  <li>The concrete compression zone may be replaced by an equivalent rectangle of stress \(0.85f'_c\) over a depth \(a = \beta_1 c\) (Whitney stress block).</li>
</ul>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Assume the tension steel yields; find \(a\) from equilibrium \(C = T\).</li>
  <li>Find \(c = a/\beta_1\) and the net tensile strain \(\varepsilon_t\).</li>
  <li>Check \(\varepsilon_t \ge \varepsilon_{ty}\) (steel yields) and \(\varepsilon_t \ge \varepsilon_{ty} + 0.003\) — ACI 318-19 §9.3.3.1 requires beams to be <strong>tension-controlled</strong>.</li>
  <li>Get \(\phi\) from \(\varepsilon_t\), then \(\phi M_n = \phi A_s f_y (d - a/2)\).</li>
  <li>Check \(\rho \ge \rho_{min}\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 260" role="img" aria-label="Section, strain and stress block">
    <rect class="conc" x="40" y="30" width="110" height="200"/>
    <circle class="bar" cx="65" cy="205" r="7"/><circle class="bar" cx="95" cy="205" r="7"/><circle class="bar" cx="125" cy="205" r="7"/>
    <line class="dim" x1="40" y1="90" x2="150" y2="90"/><text x="160" y="94" class="m">N.A.</text>
    <text x="80" y="250">b</text><text x="10" y="125">d</text>
    <line class="thin" x1="22" y1="30" x2="22" y2="205"/>
    <!-- strain -->
    <line class="thin" x1="270" y1="30" x2="270" y2="230"/>
    <polygon points="270,30 310,30 270,90" class="comp"/><polygon points="270,90 210,205 270,205" class="comp" style="fill:rgba(224,86,91,.18);stroke:#e0565b"/>
    <line class="acc" x1="310" y1="30" x2="210" y2="205"/>
    <text x="314" y="34">εcu = 0.003</text><text x="160" y="222">εt</text><text x="278" y="64" class="m">c</text>
    <text x="230" y="250" class="a">Strain</text>
    <!-- stress block -->
    <rect class="comp" x="430" y="30" width="60" height="50"/>
    <line class="thin" x1="430" y1="30" x2="430" y2="230"/>
    <text x="496" y="34">0.85 f'c</text><text x="410" y="60">a</text>
    <line class="acc" x1="460" y1="55" x2="560" y2="55"/><polygon class="accf" points="560,55 550,50 550,60"/><text x="566" y="59">C</text>
    <line class="acc" x1="560" y1="205" x2="460" y2="205" style="stroke:#e0565b"/><polygon points="460,205 470,200 470,210" style="fill:#e0565b"/><text x="566" y="209">T = As fy</text>
    <line class="dim" x1="545" y1="55" x2="545" y2="205"/><text x="550" y="135" class="m">d − a/2</text>
    <text x="440" y="250" class="a">Whitney block</text>
  </svg>
  <figcaption>Figure 1 — Rectangular section at ultimate: linear strain, equivalent rectangular stress block and internal couple.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Whitney stress block', html: String.raw`
<p>Equilibrium of a singly reinforced rectangular section:</p>
$$C = 0.85f'_c\,a\,b,\qquad T = A_s f_y,\qquad a = \frac{A_s f_y}{0.85 f'_c b}$$
$$M_n = A_s f_y\left(d - \frac{a}{2}\right)$$
<p>The depth factor \(\beta_1\) (ACI Table 22.2.2.4.3):</p>
$$\beta_1 = 0.85 - 0.05\,\frac{f'_c - 28}{7},\qquad 0.65 \le \beta_1 \le 0.85$$` },
        { title: 'Balanced and maximum steel', html: String.raw`
<p>In a <strong>balanced</strong> section the steel yields exactly when concrete reaches 0.003:</p>
$$c_b = \frac{600}{600 + f_y}\,d,\qquad \rho_b = 0.85\beta_1\frac{f'_c}{f_y}\cdot\frac{600}{600 + f_y}$$
<p>The balanced section is only a reference point — it is not allowed for a beam. ACI 318-19 §9.3.3.1 requires nonprestressed beams (\(P_u < 0.10f'_cA_g\)) to be <strong>tension-controlled</strong>, i.e. \(\varepsilon_t \ge \varepsilon_{ty} + 0.003\), where \(\varepsilon_{ty} = f_y/E_s\) (0.002 may be used for Grade 420). From the strain diagram, \(c/d = 0.003/(0.006 + \varepsilon_{ty})\), so the largest steel ratio is</p>
$$\rho_{tc} = 0.85\beta_1\frac{f'_c}{f_y}\cdot\frac{0.003}{0.006 + \varepsilon_{ty}}$$
<table class="tbl num">
  <thead><tr><th>\(f_y\) (MPa)</th><th>\(\varepsilon_{ty}\)</th><th>\(\varepsilon_t\) limit</th><th>\(c/d\) limit</th></tr></thead>
  <tbody>
    <tr><td>300</td><td>0.0015</td><td>0.0045</td><td>0.400</td></tr>
    <tr><td>400 / 420</td><td>0.002</td><td>0.0050</td><td>0.375</td></tr>
    <tr><td>410</td><td>0.00205</td><td>0.00505</td><td>0.373</td></tr>
    <tr><td>550</td><td>0.00275</td><td>0.00575</td><td>0.343</td></tr>
  </tbody>
</table>
<div class="note"><p><strong>Change from ACI 318-08:</strong> beams were allowed down to \(\varepsilon_t = 0.004\) with a reduced \(\phi\), and the tension-controlled limit was a fixed 0.005. ACI 318-19 makes the limit grade-dependent and does not allow transition-zone beams at all.</p></div>
<p>Minimum steel (ACI §9.6.1.2):</p>
$$A_{s,min} = \max\left(\frac{0.25\sqrt{f'_c}}{f_y},\ \frac{1.4}{f_y}\right)b_wd$$` },
        { title: 'Strength reduction factor φ', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="Variation of phi with net tensile strain">
    <line class="thin" x1="60" y1="170" x2="490" y2="170"/><line class="thin" x1="60" y1="170" x2="60" y2="20"/>
    <polyline class="acc" points="60,120 180,120 360,45 480,45"/>
    <line class="dim" x1="180" y1="120" x2="180" y2="170"/><line class="dim" x1="360" y1="45" x2="360" y2="170"/>
    <text x="20" y="124">0.65</text><text x="20" y="49">0.90</text>
    <text x="170" y="188" class="m">εty</text><text x="330" y="188" class="m">εty + 0.003</text><text x="440" y="188" class="m">εt</text>
    <text x="80" y="110" class="m">compression</text><text x="225" y="110" class="m">transition</text><text x="380" y="35" class="m">tension-controlled</text>
  </svg>
  <figcaption>Figure 2 — φ for tied members (ACI 318-19 Table 21.2.2). For spiral members the lower value is 0.75.</figcaption>
</figure>
$$\phi = 0.65 + 0.25\,\frac{\varepsilon_t - \varepsilon_{ty}}{0.003}\quad (\text{tied, transition zone})$$
<p>Columns may fall in the transition zone; beams may not (§9.3.3.1).</p>` },
        { title: 'Capacity calculator', html: String.raw`
<p>Change any input and the capacity updates. Defaults are the 3DB20 beam from Example 1.</p>
<div data-widget="flexure-check" data-title="Singly reinforced rectangular beam"></div>` }
      ]
    },
    {
      title: 'Worked Examples — Singly Reinforced',
      subs: [
        { title: 'Example 1: balanced and actual capacity', html: String.raw`
<div class="ex">
  <div class="ex-head">b = 200 mm, d = 450 mm, f'c = 25 MPa, fy = 400 MPa</div>
  <div class="ex-body">
    <ol class="steps">
      <li><strong>Balanced:</strong> \(c_b = \frac{600}{1000}(450) = 270\) mm, \(\rho_b = 0.85(0.85)\frac{25}{400}(0.6) = 0.02709\), \(A_{sb} = 2438\) mm². \(M_{n,b} = 327\) kN·m but \(\phi\) = 0.65 → \(\phi M_n\) = 212.6 kN·m — not permitted for a beam (\(\varepsilon_t = \varepsilon_{ty}\) = 0.002).</li>
      <li><strong>Tension-controlled limit</strong> (\(\varepsilon_{ty}\) = 400/200 000 = 0.002, so \(\varepsilon_t\) = 0.005): \(c = \frac{3}{8}d = 168.75\) mm, \(\rho = 0.016934\), \(A_s = 1524\) mm², \(a = 143.4\) mm,
        <span class="result">\(\phi M_n = 0.9(1524)(400)(450 - 71.7)/10^6 = 207.5\) kN·m</span></li>
      <li><strong>Actual 3DB20</strong> (\(A_s\) = 942.5 mm²): \(a = \frac{942.5(400)}{0.85(25)(200)} = 88.7\) mm, \(c = 104.4\) mm, \(\varepsilon_t = 0.003\frac{450-104.4}{104.4} = 0.0099 \ge 0.005\) → tension-controlled, \(\phi\) = 0.90.
        <span class="result">\(\phi M_n = 0.9(942.5)(400)(450 - 44.4)/10^6 = 137.6\) kN·m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 2: cantilever check', html: String.raw`
<div class="ex">
  <div class="ex-head">Cantilever L = 2.44 m, DL = 22 kN/m (incl. self-weight), LL = 10 kN/m</div>
  <div class="ex-body">
    <ul class="given"><li>b = 200 mm</li><li>d = 400 mm</li><li>As = 1161 mm²</li><li>f'c = 27 MPa</li><li>fy = 410 MPa</li></ul>
    <ol class="steps">
      <li>\(w_u = 1.2(22) + 1.6(10) = 42.4\) kN/m; \(M_u = w_u L^2/2 = 42.4(2.44)^2/2 = 126.2\) kN·m.</li>
      <li>\(a = \frac{1161(410)}{0.85(27)(200)} = 103.7\) mm; \(\beta_1 = 0.85\), \(c = 122.0\) mm.</li>
      <li>\(\varepsilon_{ty} = 410/200\,000 = 0.00205\); \(\varepsilon_t = 0.003(400 - 122)/122 = 0.00684 \ge 0.00505\) → tension-controlled, \(\phi\) = 0.90.</li>
      <li>\(\phi M_n = 0.9(1161)(410)(400 - 51.9)/10^6\)
        <span class="result">\(\phi M_n = 149.1\) kN·m ≥ \(M_u\) = 126.2 kN·m → OK</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 3: allowable live load', html: String.raw`
<div class="ex">
  <div class="ex-head">Simply supported, L = 6 m, b = 250, d = 440, As = 1520 mm², f'c = 21, fy = 410</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(a = \frac{1520(410)}{0.85(21)(250)} = 139.65\) mm, \(c = 164.3\) mm, \(\varepsilon_t = 0.003(440 - 164.3)/164.3 = 0.00503\).</li>
      <li>Limit \(\varepsilon_{ty} + 0.003 = 0.00505\): the beam is <em>just</em> in the transition zone → \(\phi = 0.65 + 0.25(0.00503 - 0.00205)/0.003 = 0.899\).</li>
      <li>\(\phi M_n = 0.899(1520)(410)(440 - 69.8)/10^6 = 207.3\) kN·m.</li>
      <li>Maximum factored load \(w_u = 8\phi M_n/L^2 = 46.1\) kN/m (1.2D + 1.6L governs over 1.4D here).</li>
      <li>Self-weight \(0.25 × 0.50 × 24 = 3.0\) kN/m: \(1.6\,LL = 46.1 - 1.2(3.0)\)
        <span class="result">Allowable service live load LL ≈ 26.5 kN/m</span></li>
    </ol>
    <div class="warn"><p>Under ACI 318-19 §9.3.3.1 this beam does not quite satisfy the tension-controlled requirement (0.00503 &lt; 0.00505). Under ACI 318-08 it was acceptable. A new design should use slightly less steel or about 5 mm more depth.</p></div>
  </div>
</div>` }
      ]
    },
    {
      title: 'Doubly Reinforced Beams',
      subs: [
        { title: 'Theory', html: String.raw`
<p>Compression steel \(A'_s\) is added when the section size is limited. The moment is split into two couples: concrete + part of tension steel, and \(A'_s\) + the rest of the tension steel:</p>
$$M_n = (A_s - A'_s) f_y\left(d - \frac{a}{2}\right) + A'_s f'_s (d - d')$$
<p>Compression steel yields when</p>
$$\rho - \rho' \;\ge\; \bar\rho_{cy} = 0.85\beta_1\frac{f'_c\,d'}{f_y\,d}\cdot\frac{600}{600 - f_y}$$
<p>Otherwise find \(c\) from the quadratic \(0.85f'_c\beta_1 b\,c + A'_s\,600\frac{c - d'}{c} = A_s f_y\) and use \(f'_s = 600\frac{c-d'}{c}\).</p>` },
        { title: 'Example A: compression steel yields', html: String.raw`
<div class="ex">
  <div class="ex-head">b = 300, d = 545, d' = 60, As = 3882, A's = 774 mm², f'c = 27, fy = 410</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\rho - \rho' = (3882 - 774)/(300 × 545) = 0.01901\); limit \(\bar\rho_{cy} = 0.01654\) → \(A'_s\) yields.</li>
      <li>\(a = \frac{(3882 - 774)410}{0.85(27)(300)} = 185.1\) mm, \(c = 217.7\) mm.</li>
      <li>\(\varepsilon_t = 0.003(545 - 217.7)/217.7 = 0.00451 < \varepsilon_{ty} + 0.003 = 0.00505\) → transition, \(\phi = 0.65 + 0.25(0.00451 - 0.00205)/0.003 = 0.855\).</li>
      <li>\(M_n = 3108(410)(545 - 92.6) + 774(410)(485) = 730.5\) kN·m → \(\phi M_n = 0.855 × 730.5 = 624.5\) kN·m.</li>
    </ol>
    <div class="result ng">Not permitted as a beam under ACI 318-19 §9.3.3.1 (not tension-controlled).</div>
    <p><strong>Fix:</strong> more compression steel lowers \(c\). With \(A'_s\) = 3DB22 (1140 mm²): \(c = 192.1\) mm, \(\varepsilon_t = 0.00551 \ge 0.00505\), \(\phi\) = 0.90, \(M_n = 747.6\) kN·m.</p>
    <span class="result">\(\phi M_n = 672.8\) kN·m with A's = 3DB22 — tension-controlled ✓</span>
  </div>
</div>` },
        { title: 'Example B: compression steel does not yield', html: String.raw`
<div class="ex">
  <div class="ex-head">b = 350, d = 570, d' = 60, As = 4916, A's = 1520 mm², f'c = 35 (β1 = 0.80), fy = 410</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Check: \(\rho - \rho' = 0.01702 <\) limit → \(A'_s\) does not yield.</li>
      <li>Equilibrium, deducting the concrete displaced by \(A'_s\): \(0.85(35)(0.8)(350)c + 1520\left[600\frac{c - 60}{c} - 0.85(35)\right] = 4916(410)\) → \(c = 175.4\) mm.</li>
      <li>\(f'_s = 600(175.4 - 60)/175.4 = 394.7\) MPa \(< f_y\); \(a = 0.8c = 140.3\) mm.</li>
      <li>\(\varepsilon_t = 0.003(570 - 175.4)/175.4 = 0.00675 \ge 0.00505\) → tension-controlled, \(\phi\) = 0.90.</li>
      <li>\(M_n = 0.85(35)(140.3)(350)(570 - 70.2) + 1520(394.7 - 29.75)(510) = 1013.1\) kN·m
        <span class="result">\(\phi M_n = 911.8\) kN·m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Analysis checklist', html: String.raw`
<ul class="check">
  <li>Compute \(\beta_1\) from \(f'_c\).</li>
  <li>Find \(a\) and \(c\); verify the steel strains (tension and, if present, compression).</li>
  <li>Beams must be tension-controlled: \(\varepsilon_t \ge \varepsilon_{ty} + 0.003\) (§9.3.3.1), so \(\phi\) = 0.90.</li>
  <li>Check \(\rho \ge \rho_{min}\) and bar spacing.</li>
  <li>Compare \(\phi M_n\) with \(M_u\).</li>
</ul>` }
      ]
    }
  ]
});
