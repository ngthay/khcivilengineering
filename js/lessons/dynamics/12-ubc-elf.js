/* Lesson 12 — UBC-97 equivalent lateral force method (Paz & Leigh, Chapter 23) */
KCE_COURSE.lessons.push({
  id: 'ubc-elf',
  num: 12,
  title: 'Earthquake Design by UBC-97 — Equivalent Lateral Force Method',
  desc: 'Earthquake ground motion, magnitude and intensity, the UBC-97 seismic coefficients, fundamental period, design base shear and its limits, vertical distribution with the top force F_t, story shear, overturning, drift and P-Δ — with the four-story warehouse example.',
  icon: '🌋',
  color: 'peach',
  meta: ['Chapter 23', 'V = C_vIW/RT', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Earthquakes release energy at a rupture inside the crust (the focus or hypocentre; the point above it is the epicentre). The <strong>Richter magnitude</strong> \(M = \log_{10}(A/A_0)\) measures the size of the event from a Wood–Anderson record 100 km away; the energy is about \(E = 10^{4.8+1.5M}\) joules, so one unit of M is about 32 times more energy. The <strong>Modified Mercalli Intensity</strong> (I–XII) describes the damage at a particular site: up to VI there is little damage; VII–XII causes progressively heavier damage.</p>
<p>Building codes turn the dynamics of Lessons 5–8 into simple rules. UBC-97 allows two procedures: the <strong>Equivalent Lateral Force</strong> (static) method and the <strong>Dynamic</strong> method (Lesson 13). The static method is allowed for regular buildings up to 240 ft and irregular buildings up to five stories or 65 ft.</p>` },
        { title: 'Description', html: String.raw`
<p><strong>Design base shear</strong> (UBC-97 eq. 30-4 to 30-7):</p>
$$V = \frac{C_vI}{RT}W,\qquad V \le \frac{2.5C_aI}{R}W,\qquad V \ge 0.11C_aIW,\qquad V \ge \frac{0.8ZN_vI}{R}W\ \text{(Zone 4)}$$
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Symbol</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>Z</td><td>Zone factor: zone 1 = 0.075, 2A = 0.15, 2B = 0.20, 3 = 0.30, 4 = 0.40</td></tr>
    <tr><td>C_a, C_v</td><td>Seismic coefficients from Z and the soil profile S_A–S_F (with near-source factors N_a, N_v in zone 4)</td></tr>
    <tr><td>I</td><td>Importance factor: 1.0 standard, 1.25 essential or hazardous facilities</td></tr>
    <tr><td>R</td><td>Structural system factor, 2.8–8.5 (8.5 for special moment-resisting frames)</td></tr>
    <tr><td>T</td><td>Fundamental period: \(T = C_th_N^{3/4}\), C_t = 0.035 steel MRF, 0.030 concrete MRF and EBF, 0.020 others (h_N in ft)</td></tr>
    <tr><td>W</td><td>Seismic weight: dead load + 25 % of floor live load in storage + partitions + equipment</td></tr>
  </tbody>
</table></div>` },
        { title: 'Methodology', html: String.raw`
<p>Seismic coefficients for rock and stiff-soil sites (UBC-97 Tables 16-Q and 16-R, zone 4 values times N_a or N_v):</p>
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>Soil</th><th colspan="5">C_a for Z = 0.075 / 0.15 / 0.20 / 0.30 / 0.40</th><th colspan="5">C_v for Z = 0.075 / 0.15 / 0.20 / 0.30 / 0.40</th></tr></thead>
  <tbody>
    <tr><td>S_A</td><td>0.06</td><td>0.12</td><td>0.16</td><td>0.24</td><td>0.32N_a</td><td>0.06</td><td>0.12</td><td>0.16</td><td>0.24</td><td>0.32N_v</td></tr>
    <tr><td>S_B</td><td>0.08</td><td>0.15</td><td>0.20</td><td>0.30</td><td>0.40N_a</td><td>0.08</td><td>0.15</td><td>0.20</td><td>0.30</td><td>0.40N_v</td></tr>
    <tr><td>S_C</td><td>0.09</td><td>0.18</td><td>0.24</td><td>0.33</td><td>0.40N_a</td><td>0.13</td><td>0.25</td><td>0.32</td><td>0.45</td><td>0.56N_v</td></tr>
    <tr><td>S_D</td><td>0.12</td><td>0.22</td><td>0.28</td><td>0.36</td><td>0.44N_a</td><td>0.18</td><td>0.32</td><td>0.40</td><td>0.54</td><td>0.64N_v</td></tr>
    <tr><td>S_E</td><td>0.19</td><td>0.30</td><td>0.34</td><td>0.36</td><td>0.36N_a</td><td>0.26</td><td>0.50</td><td>0.64</td><td>0.84</td><td>0.96N_v</td></tr>
  </tbody>
</table></div>
<ol>
  <li>Weights w_x at each level and total W.</li>
  <li>Period T; coefficients; base shear V with its limits.</li>
  <li>Top force \(F_t = 0.07TV \le 0.25V\) if T &gt; 0.7 s, otherwise 0.</li>
  <li>Distribute: \(F_x = \dfrac{(V - F_t)w_xh_x}{\sum w_ih_i}\) (an inverted triangle for uniform weights — the first-mode shape).</li>
  <li>Story shear \(V_x = F_t + \sum_{i\ge x}F_i\); overturning \(M_x = F_t(h_N - h_x) + \sum_{i>x}F_i(h_i - h_x)\).</li>
  <li>Add accidental torsion (5 % of the plan dimension), check drift and P-Δ.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Lateral force distribution">
    <path class="ln" d="M160 200 V30 M300 200 V30"/>
    <g class="conc"><rect x="154" y="160" width="152" height="8"/><rect x="154" y="120" width="152" height="8"/><rect x="154" y="80" width="152" height="8"/><rect x="154" y="40" width="152" height="8"/></g>
    <path class="thin" d="M140 200 H320"/>
    <g class="acc"><path d="M130 164 H150 M100 124 H150 M70 84 H150 M58 44 H150"/></g>
    <g class="accf"><polygon points="154,164 144,159 144,169"/><polygon points="154,124 144,119 144,129"/><polygon points="154,84 144,79 144,89"/><polygon points="154,44 144,39 144,49"/></g>
    <text x="100" y="160" class="a">F₁</text><text x="70" y="120" class="a">F₂</text><text x="40" y="80" class="a">F₃</text><text x="28" y="40" class="a">F₄</text>
    <path class="acc" d="M210 210 H260"/><polygon class="accf" points="206,210 216,205 216,215"/><text x="266" y="214" class="a">V</text>
    <text x="330" y="80" class="m">4 @ 12 ft = 48 ft</text><text x="330" y="110" class="m">F_x ∝ w_x h_x</text>
  </svg>
  <figcaption>Figure 1 — Base shear distributed over the height in proportion to w_x·h_x.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Drift, P-Δ and irregularities', html: String.raw`
<ul>
  <li><strong>Drift:</strong> the inelastic drift \(\Delta_M = 0.7R\Delta_S\) must not exceed 0.025h (T &lt; 0.7 s) or 0.020h (T ≥ 0.7 s).</li>
  <li><strong>P-Δ:</strong> the gravity load P on a story drifted by Δ adds a moment PΔ (an extra shear PΔ/L); it may be neglected when the secondary moment is at most 10 % of the primary moment (in zones 3 and 4, when the drift ratio is at most 0.02/R).</li>
  <li><strong>Irregularities</strong> (UBC Tables 16-L, 16-M): soft or weak stories, mass and geometric irregularity, in-plane and out-of-plane offsets, torsion (drift at one end more than 1.2 × the average), re-entrant corners, diaphragm discontinuity, non-parallel systems — these limit the static method and may require the dynamic method.</li>
</ul>
<div data-widget="ubc-elf" data-title="UBC-97 equivalent lateral forces (up to four levels)"></div>
<p>The defaults are Example 23.1; set a weight to 0 for fewer stories. The calculator keeps T = 0.547 s unrounded, so it gives V = 194.3 kip against the book’s 193.3 kip with T = 0.55 s.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 23.1 — four-story concrete warehouse', html: String.raw`
<div class="ex">
  <div class="ex-head">A four-story reinforced concrete special moment frame (E = 3000 ksi), plan 96 ft × 48 ft, stories 12 ft. Dead load 140 psf; live load 125 psf (warehouse). Hard rock (S_B), Seattle (zone 3). Find the lateral forces.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Weights: floors include 25 % of the warehouse live load: 140 + 0.25×125 = 171.25 psf; roof 140 psf. Area 4608 ft² → \(w_1 = w_2 = w_3 = 789.1\) kip, \(w_4 = 645.1\) kip; W = 3012.4 kip.</li>
      <li>\(T = 0.030\times48^{3/4} = 0.55\) s.</li>
      <li>Z = 0.3, S_B → C_a = C_v = 0.3; I = 1.0; R = 8.5:
        $$V = \frac{0.3\times1.0}{8.5\times0.55}\times3012.4 = 193.3\ \text{kip}$$</li>
      <li>Limits: \(2.5C_aIW/R = 265.8\) kip (book misprints W as 2012.4 here, but uses 3012.4) and \(0.11C_aIW = 99.4\) kip → V = 193.3 kip governs. T &lt; 0.7 s → F_t = 0.</li>
    </ol>
    <div class="tbl-wrap"><table class="tbl num">
      <thead><tr><th>Level</th><th>w_x (kip)</th><th>h_x (ft)</th><th>w_xh_x</th><th>F_x (kip)</th><th>V_x (kip)</th></tr></thead>
      <tbody>
        <tr><td>4</td><td>645.1</td><td>48</td><td>30,965</td><td>68.2</td><td>68.2</td></tr>
        <tr><td>3</td><td>789.1</td><td>36</td><td>28,408</td><td>62.6</td><td>130.8</td></tr>
        <tr><td>2</td><td>789.1</td><td>24</td><td>18,939</td><td>41.8</td><td>172.6</td></tr>
        <tr><td>1</td><td>789.1</td><td>12</td><td>9,469</td><td>20.7</td><td>193.3</td></tr>
        <tr><td></td><td></td><td></td><td>Σ = 87,781</td><td></td><td></td></tr>
      </tbody>
    </table></div>
    <p class="result">V = 193.3 kip (6.4 % of W) · base overturning moment ≈ 68.2(48) + 62.6(36) + 41.8(24) + 20.7(12) = 6780 kip·ft</p>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Include 25 % of storage live load in W; none on the roof.</li>
  <li>Check V against the upper (2.5C_aIW/R) and lower (0.11C_aIW) limits.</li>
  <li>F_t = 0 when T ≤ 0.7 s.</li>
  <li>Check the regularity rules before relying on the static method.</li>
</ul>` }
      ]
    }
  ]
});
