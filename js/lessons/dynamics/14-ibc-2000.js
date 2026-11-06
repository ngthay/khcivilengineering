/* Lesson 14 — International Building Code IBC-2000 (Paz & Leigh, Chapter 25) */
KCE_COURSE.lessons.push({
  id: 'ibc-2000',
  num: 14,
  title: 'Earthquake Design by IBC-2000 — Mapped Spectra and Base Shear',
  desc: 'Mapped MCE accelerations S_S and S₁, site classes and coefficients F_a and F_v, design spectral accelerations S_DS and S_D1, the design spectrum, seismic use group and design category, approximate period, seismic response coefficient C_s and its limits, and the vertical force distribution.',
  icon: '🗺️',
  color: 'sky',
  meta: ['Chapter 25', 'V = C_sW', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>IBC-2000 replaced the zone map of UBC-97 by maps of the <strong>Maximum Considered Earthquake</strong> (MCE): the 5 %-damped spectral acceleration on rock (site class B) at a short period, \(S_S\) (T = 0.2 s), and at 1 s, \(S_1\). The maps give the same level of risk everywhere in the United States. The code also introduces the <strong>Seismic Use Group</strong> (similar to the importance factor) and the <strong>Seismic Design Category</strong>, which sets the allowed analysis procedure, height limits and detailing.</p>` },
        { title: 'Description', html: String.raw`
<p><strong>Site modification and design values:</strong></p>
$$S_{MS} = F_aS_S,\quad S_{M1} = F_vS_1,\qquad S_{DS} = \tfrac23S_{MS},\quad S_{D1} = \tfrac23S_{M1}$$
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>Site class</th><th colspan="5">F_a for S_S ≤ 0.25 / 0.50 / 0.75 / 1.00 / ≥ 1.25</th><th colspan="5">F_v for S₁ ≤ 0.1 / 0.2 / 0.3 / 0.4 / ≥ 0.5</th></tr></thead>
  <tbody>
    <tr><td>A hard rock</td><td>0.8</td><td>0.8</td><td>0.8</td><td>0.8</td><td>0.8</td><td>0.8</td><td>0.8</td><td>0.8</td><td>0.8</td><td>0.8</td></tr>
    <tr><td>B rock</td><td>1.0</td><td>1.0</td><td>1.0</td><td>1.0</td><td>1.0</td><td>1.0</td><td>1.0</td><td>1.0</td><td>1.0</td><td>1.0</td></tr>
    <tr><td>C very dense soil</td><td>1.2</td><td>1.2</td><td>1.1</td><td>1.0</td><td>1.0</td><td>1.7</td><td>1.6</td><td>1.5</td><td>1.4</td><td>1.3</td></tr>
    <tr><td>D stiff soil</td><td>1.6</td><td>1.4</td><td>1.2</td><td>1.1</td><td>1.0</td><td>2.4</td><td>2.0</td><td>1.8</td><td>1.6</td><td>1.5</td></tr>
    <tr><td>E soft soil</td><td>2.5</td><td>1.7</td><td>1.2</td><td>0.9</td><td>*</td><td>3.5</td><td>3.2</td><td>2.8</td><td>2.4</td><td>*</td></tr>
  </tbody>
</table></div>
<p>* and site class F: site-specific study. (The book’s F_v table heads its columns with S_S by mistake; they are values of S₁.) Site classes are set by the top 100 ft: shear-wave velocity &gt; 5000 ft/s (A), 2500–5000 (B), 1200–2500 (C), 600–1200 (D), &lt; 600 ft/s (E).</p>` },
        { title: 'Methodology', html: String.raw`
<p><strong>Design spectrum:</strong> \(T_0 = 0.2S_{D1}/S_{DS}\), \(T_s = S_{D1}/S_{DS}\); S_a rises from 0.4S_DS to S_DS at T₀, stays at S_DS to T_s, then follows S_D1/T.</p>
<p><strong>Equivalent lateral force procedure</strong> (IBC-2000 §1617.4):</p>
$$V = C_sW,\qquad C_s = \frac{S_{DS}}{R/I_E}\ \le\ \frac{S_{D1}}{(R/I_E)T},\qquad C_s \ge 0.044S_{DS}I_E,\qquad C_s \ge \frac{0.5S_1}{R/I_E}\ (\text{if } S_1 \ge 0.6g)$$
<ol>
  <li>Approximate period \(T_a = C_th_N^{3/4}\) (C_t = 0.035 steel MRF, 0.030 concrete MRF and EBF, 0.020 others) or \(T_a = 0.1N\) for moment frames up to 12 stories. A computed period may be used but not more than \(C_uT_a\) (C_u = 1.2 for S_D1 ≥ 0.4 up to 1.7 for S_D1 ≤ 0.1).</li>
  <li>Importance factor I_E = 1.0, 1.25, 1.5 for Seismic Use Groups I, II, III.</li>
  <li>Distribute: \(F_x = C_{vx}V\), \(C_{vx} = w_xh_x^k/\sum w_ih_i^k\), with k = 1 for T ≤ 0.5 s, k = 2 for T ≥ 2.5 s, linear in between.</li>
  <li>Small buildings: the <em>simplified</em> procedure \(V = 1.2S_{DS}W/R\) (SUG I, up to 3 stories of light frame or 2 stories otherwise); category A: minimum forces \(F_x = 0.01w_x\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="IBC design response spectrum">
    <path class="thin" d="M50 170 H490 M50 170 V20"/><text x="460" y="190" class="m">T</text><text x="12" y="28" class="m">S_a</text>
    <path class="acc" d="M50 120 L80 50 H200 C250 80 330 110 490 135"/>
    <path class="dim" d="M80 50 V170 M200 50 V170 M300 100 V170 M50 100 H300"/>
    <text x="74" y="186" class="m">T₀</text><text x="194" y="186" class="m">T_s</text><text x="290" y="186" class="m">1.0 s</text>
    <text x="110" y="44" class="a">S_DS</text><text x="306" y="94" class="m">S_D1 at 1 s</text><text x="330" y="112" class="m">S_D1/T</text><text x="56" y="134" class="m">0.4S_DS</text>
  </svg>
  <figcaption>Figure 1 — IBC-2000 design response spectrum built from S_DS and S_D1.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Seismic Design Category', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>S_DS</th><th>S_D1</th><th>SUG I</th><th>SUG II</th><th>SUG III</th></tr></thead>
  <tbody>
    <tr><td>&lt; 0.167g</td><td>&lt; 0.067g</td><td>A</td><td>A</td><td>A</td></tr>
    <tr><td>0.167–0.33g</td><td>0.067–0.133g</td><td>B</td><td>B</td><td>C</td></tr>
    <tr><td>0.33–0.50g</td><td>0.133–0.20g</td><td>C</td><td>C</td><td>D</td></tr>
    <tr><td>≥ 0.50g</td><td>≥ 0.20g</td><td>D</td><td>D</td><td>D</td></tr>
  </tbody>
</table></div>
<p>The more severe of the two columns governs; when S₁ ≥ 0.75g the category is E (SUG I, II) or F (SUG III).</p>
<div data-widget="ibc-base-shear" data-title="IBC-2000 seismic response coefficient and base shear"></div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'The four-story warehouse under IBC-2000', html: String.raw`
<div class="ex">
  <div class="ex-head">Redesign the building of Example 23.1 (W = 3012.4 kip, h_N = 48 ft, concrete special moment frame) by IBC-2000 for S_S = 1.5g, S₁ = 0.6g on rock (site class B), Seismic Use Group I, R = 8. (Worked for this course; these mapped values are those of the book’s Table 25.7.)</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Site B: F_a = F_v = 1.0 → \(S_{MS} = 1.5g\), \(S_{M1} = 0.6g\); \(S_{DS} = 1.0g\), \(S_{D1} = 0.4g\); \(T_s = 0.40\) s.</li>
      <li>Category: S_DS ≥ 0.50 and S_D1 ≥ 0.20, S₁ &lt; 0.75 → <strong>D</strong>.</li>
      <li>\(T_a = 0.030\times48^{3/4} = 0.547\) s.</li>
      <li>\(C_s = 1.0/8 = 0.125\); upper limit \(0.4/(8\times0.547) = 0.0914\) (governs); lower limits \(0.044\times1.0 = 0.044\) and \(0.5\times0.6/8 = 0.0375\).</li>
      <li>\(V = 0.0914\times3012.4 = 275.3\) kip; k = 1 + (0.547 − 0.5)/2 = 1.02.</li>
    </ol>
    <div class="tbl-wrap"><table class="tbl num">
      <thead><tr><th>Level</th><th>w_x (kip)</th><th>h_x (ft)</th><th>F_x (kip)</th><th>V_x (kip)</th><th>UBC-97 F_x</th></tr></thead>
      <tbody>
        <tr><td>4</td><td>645.1</td><td>48</td><td>98.0</td><td>98.0</td><td>68.2</td></tr>
        <tr><td>3</td><td>789.1</td><td>36</td><td>89.3</td><td>187.3</td><td>62.6</td></tr>
        <tr><td>2</td><td>789.1</td><td>24</td><td>59.0</td><td>246.3</td><td>41.8</td></tr>
        <tr><td>1</td><td>789.1</td><td>12</td><td>29.0</td><td>275.3</td><td>20.7</td></tr>
      </tbody>
    </table></div>
    <p class="result">V = 275 kip (9.1 % of W) against 193 kip by UBC-97 zone 3 — the plateau S_DS = 1.0g is higher than 2.5C_a = 0.75g of zone 3</p>
    <p>IBC-2000 forces are at strength level, like UBC-97; both are combined with gravity with the same load factors.</p>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Read S_S and S₁ from the maps for the site; get F_a and F_v from the site class.</li>
  <li>Design values are two thirds of the MCE values.</li>
  <li>Check C_s against both upper and lower limits.</li>
  <li>The Seismic Design Category decides the procedure and the detailing.</li>
</ul>` }
      ]
    }
  ]
});
