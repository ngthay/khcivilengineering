/* Lesson 6 — Development length and splices */
KCE_COURSE.lessons.push({
  id: 'development-length',
  num: 6,
  title: 'Development Length and Splices',
  desc: 'Bond, tension development length ld, standard hooks, compression bars, lap splices and bar cut-off points.',
  icon: '🔗',
  color: 'amber',
  meta: ['ACI 318M-19 Ch.25, §9.7.3', 'Detailing', 'Bond'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A bar can only develop its yield force if it is embedded far enough for bond stresses to transfer that force into the concrete. This embedment is the <strong>development length</strong> \(\ell_d\). It controls where bars may be cut off, how bars are anchored at supports and how long lap splices must be.</p>` },
        { title: 'Description', html: String.raw`
<p>Bond between deformed bars and concrete comes mainly from the bearing of the ribs. Bond failure is either a <em>pull-out</em> (large cover) or <em>splitting</em> of the cover along the bar (small cover or close spacing). Transverse steel (stirrups) restrains splitting and shortens \(\ell_d\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Compute the required \(\ell_d\) (straight), \(\ell_{dh}\) (hooked) or \(\ell_{dc}\) (compression).</li>
  <li>Compare with the available length from the critical section (max moment, face of support).</li>
  <li>If too short: use a hook, smaller bars, or more transverse steel.</li>
  <li>For splices, classify Class A/B and use \(1.0\ell_d\) or \(1.3\ell_d\).</li>
  <li>For cut-offs, extend bars beyond the theoretical point by \(d\) or \(12d_b\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 200" role="img" aria-label="Bar embedment and hook">
    <rect class="conc" x="30" y="40" width="380" height="100"/>
    <line x1="60" y1="120" x2="410" y2="120" style="stroke:#e0565b;stroke-width:5"/>
    <line class="dim" x1="60" y1="160" x2="300" y2="160"/><text x="150" y="178" class="a">ℓd</text>
    <text x="320" y="110" class="m">critical section</text><line class="dim" x1="300" y1="40" x2="300" y2="150"/>
    <rect class="conc" x="460" y="40" width="160" height="120"/>
    <path d="M610 60 L490 60 L490 140" style="fill:none;stroke:#e0565b;stroke-width:5"/>
    <line class="dim" x1="490" y1="30" x2="610" y2="30"/><text x="535" y="24" class="a">ℓdh</text>
    <text x="500" y="125" class="m">12db</text>
  </svg>
  <figcaption>Figure 1 — Straight development length (left) and a 90° standard hook (right).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Tension development length', html: String.raw`
<p>General equation (ACI 318-19 Eq. 25.4.2.4a):</p>
$$\ell_d = \frac{f_y}{1.1\lambda\sqrt{f'_c}}\cdot\frac{\psi_t\psi_e\psi_s\psi_g}{\left(\dfrac{c_b + K_{tr}}{d_b}\right)}\,d_b \;\ge 300\text{ mm},\qquad \frac{c_b + K_{tr}}{d_b}\le 2.5$$
<p>\(K_{tr} = 40A_{tr}/(s\,n)\) (\(n\) = number of bars developed); \(K_{tr}\) = 0 is always permitted. Factors (Table 25.4.2.5):</p>
<table class="tbl">
  <thead><tr><th>Factor</th><th>Condition</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>\(\psi_t\) casting position</td><td>More than 300 mm of fresh concrete below the bar / other</td><td>1.3 / 1.0</td></tr>
    <tr><td>\(\psi_e\) epoxy</td><td>Epoxy-coated, cover &lt; 3\(d_b\) or spacing &lt; 6\(d_b\) / other epoxy / uncoated</td><td>1.5 / 1.2 / 1.0</td></tr>
    <tr><td>\(\psi_s\) size</td><td>No. 19 (DB20) and smaller / No. 22 and larger</td><td>0.8 / 1.0</td></tr>
    <tr><td>\(\psi_g\) grade <em>(new in 318-19)</em></td><td>Grade 280 or 420 / Grade 550 / Grade 690</td><td>1.0 / 1.15 / 1.3</td></tr>
    <tr><td>\(\lambda\)</td><td>Normal-weight / lightweight concrete</td><td>1.0 / 0.75</td></tr>
  </tbody>
</table>
<p>\(\psi_t\psi_e \le 1.7\); \(\sqrt{f'_c} \le 8.3\) MPa (§25.4.1.4).</p>
<p>Simplified (Table 25.4.2.3):</p>
<table class="tbl">
  <thead><tr><th>Condition</th><th>DB ≤ 20</th><th>DB ≥ 22</th></tr></thead>
  <tbody>
    <tr><td>Clear spacing ≥ \(d_b\), cover ≥ \(d_b\), code-minimum stirrups — or clear spacing ≥ \(2d_b\) and cover ≥ \(d_b\)</td><td>\(\dfrac{f_y\psi_t\psi_e\psi_g}{2.1\lambda\sqrt{f'_c}}d_b\)</td><td>\(\dfrac{f_y\psi_t\psi_e\psi_g}{1.7\lambda\sqrt{f'_c}}d_b\)</td></tr>
    <tr><td>Other cases</td><td>\(\dfrac{f_y\psi_t\psi_e\psi_g}{1.4\lambda\sqrt{f'_c}}d_b\)</td><td>\(\dfrac{f_y\psi_t\psi_e\psi_g}{1.1\lambda\sqrt{f'_c}}d_b\)</td></tr>
  </tbody>
</table>` },
        { title: 'Hooks and compression bars', html: String.raw`
<p>ACI 318-19 §25.4.3.1 uses a new equation for standard hooks in tension (\(d_b^{1.5}\), from tests by Sperry et al.):</p>
$$\ell_{dh} = \frac{f_y\,\psi_e\psi_r\psi_o\psi_c}{23\lambda\sqrt{f'_c}}\,d_b^{1.5} \;\ge\; \max(8d_b,\ 150\text{ mm})$$
<table class="tbl">
  <thead><tr><th>Factor (Table 25.4.3.2)</th><th>Condition</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>\(\psi_e\)</td><td>Epoxy or dual-coated / uncoated</td><td>1.2 / 1.0</td></tr>
    <tr><td>\(\psi_r\) confining steel</td><td>No. 36 and smaller with ties \(A_{th} \ge 0.4A_{hs}\), or hook spacing ≥ 6\(d_b\) / other</td><td>1.0 / 1.6</td></tr>
    <tr><td>\(\psi_o\) location</td><td>Ending inside the column core with side cover ≥ 65 mm, or side cover ≥ 6\(d_b\) / other</td><td>1.0 / 1.25</td></tr>
    <tr><td>\(\psi_c\) concrete strength</td><td>\(f'_c\) &lt; 42 MPa / ≥ 42 MPa</td><td>\(f'_c/105 + 0.6\) / 1.0</td></tr>
  </tbody>
</table>
<div class="note"><p><strong>Change from ACI 318-08:</strong> the old \(0.24\psi_ef_yd_b/\sqrt{f'_c}\) with its 0.7 and 0.8 reductions is gone. Hooks without confining ties are now considerably longer (\(\psi_r\) = 1.6).</p></div>
<p>Compression bars (§25.4.9.2), with \(\psi_r\) = 1.0 permitted:</p>
$$\ell_{dc} = \max\left(\frac{0.24f_y\psi_r}{\lambda\sqrt{f'_c}}d_b,\ 0.043f_y\psi_rd_b\right) \ge 200\text{ mm}$$
<div data-widget="dev-length" data-title="Development lengths"></div>` },
        { title: 'Lap splices', html: String.raw`
<table class="tbl">
  <thead><tr><th>Type</th><th>Length</th><th>When</th></tr></thead>
  <tbody>
    <tr><td>Tension, Class A</td><td>\(1.0\ell_d\) (≥ 300 mm)</td><td>\(A_{s,prov}/A_{s,req} \ge 2\) and ≤ 50 % of bars spliced within the lap length</td></tr>
    <tr><td>Tension, Class B</td><td>\(1.3\ell_d\) (≥ 300 mm)</td><td>All other cases</td></tr>
    <tr><td>Compression</td><td>\(0.071f_yd_b\) for \(f_y \le 420\) (≥ 300 mm)</td><td>Column bars; × 1.33 if \(f'_c\) < 21 MPa</td></tr>
  </tbody>
</table>
<p>ACI 318-19 Table 25.5.2.1 and §25.5.5.1. For \(420 < f_y \le 550\) MPa the compression lap is \((0.13f_y - 24)d_b\). Bars larger than No. 36 may not be lap spliced (§25.5.1.1). Here \(\ell_d\) is computed without the excess-steel reduction.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 1: bottom bars of a beam', html: String.raw`
<div class="ex">
  <div class="ex-head">4DB25 bottom bars, b = 305, h = 560, d = 500, f'c = 20, fy = 410, stirrups DB10 @ 152, clear cover 38 mm</div>
  <div class="ex-body">
    <ol class="steps">
      <li><strong>Simplified:</strong> clear spacing \((305 - 2(38+10) - 4(25))/3 = 36 \ge d_b\), stirrups ≥ minimum; \(f_y\) = 410 ≤ 420 → \(\psi_g\) = 1.0. \(\ell_d = \frac{410}{1.7\sqrt{20}}d_b = 53.9d_b = 1348\) mm.</li>
      <li><strong>General:</strong> \(c_b = \min(38 + 10 + 12.5,\ \tfrac12(61.3)) = 30.7\) mm (half centre spacing governs); \(K_{tr} = 40(157)/(152 × 4) = 10.33\); \((c_b + K_{tr})/d_b = 1.64\).
        \(\ell_d = \frac{410}{1.1\sqrt{20}}\cdot\frac{1.0}{1.64}(25) = 1270\) mm.</li>
    </ol>
    <span class="result">ℓd ≈ 1270 mm (general) vs 1350 mm (simplified)</span>
  </div>
</div>` },
        { title: 'Example 2: hooked top bars at an exterior column', html: String.raw`
<div class="ex">
  <div class="ex-head">DB25 top bars, f'c = 28, fy = 410, available embedment in column = 480 mm, hooks end inside the column core (side cover ≥ 65 mm)</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Straight top bar: \(\ell_d = \frac{410(1.3)}{1.7\sqrt{28}}(25) = 1481 \text{ mm} > 480\) → hook needed.</li>
      <li>\(\psi_c = 28/105 + 0.6 = 0.867\); \(\psi_o\) = 1.0; \(d_b^{1.5} = 25^{1.5} = 125\).</li>
      <li><strong>Without confining ties</strong> (\(\psi_r\) = 1.6): \(\ell_{dh} = \frac{410(1.0)(1.6)(1.0)(0.867)}{23\sqrt{28}}(125) = 584 \text{ mm} > 480\) ✗.</li>
      <li><strong>With column ties confining the hooks</strong>, \(A_{th} \ge 0.4A_{hs}\) (\(\psi_r\) = 1.0): \(\ell_{dh} = 365 \text{ mm} \le 480\) ✓.</li>
    </ol>
    <span class="result">Use a 90° standard hook (tail 12db = 300 mm) and confine it with column ties: ℓdh = 365 mm</span>
    <div class="note"><p>Under ACI 318-08 the same hook needed 465 mm with no tie requirement. The 318-19 rule rewards confinement and penalises hooks without it.</p></div>
  </div>
</div>` },
        { title: 'Example 3: lap splice', html: String.raw`
<div class="ex">
  <div class="ex-head">6DB25, f'c = 35, fy = 410, clear spacing 63 mm, cover 38 mm</div>
  <div class="ex-body">
    <p>\(\ell_d = \frac{410}{1.7\sqrt{35}}(25) = 1019\) mm (spacing ≥ 2\(d_b\), cover ≥ \(d_b\)).</p>
    <span class="result">Class A lap = 1020 mm; Class B lap = 1.3 × 1019 = 1325 mm</span>
  </div>
</div>` },
        { title: 'Example 4: bar cut-off points', html: String.raw`
<div class="ex">
  <div class="ex-head">Simply supported L = 6 m, wu = 58 kN/m, b = 305, d = 510, 4DB25, f'c = 20, fy = 345</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(M_u = 58(6^2)/8 = 261\) kN·m. With 4DB25: \(a = 134.9\) mm, \(\phi M_n\) per bar ≈ 69.7 kN·m.</li>
      <li>Moment at x from the support: \(M_u(x) = \tfrac{w_uL}{2}x - \tfrac{w_u}{2}x^2 = 174x - 29x^2\). Points where 3, 2, 1 bars are enough:
        x = 1.661 m (3 bars), 0.952 m (2 bars), 0.431 m (1 bar).</li>
      <li>Extend each cut bar beyond its theoretical point by \(\max(d, 12d_b) = 510\) mm; continuing bars must have \(\ell_d = 1134\) mm past the point where the cut bars stop being needed.</li>
      <li>Code rule: at least ⅓ of positive steel runs at least 150 mm into the support (ACI 318-19 §9.7.3.8.1); cut bars extend \(\max(d, 12d_b)\) past the theoretical point (§9.7.3.3).</li>
    </ol>
    <span class="result">Keep 2 bars full length; cut 1 bar at ≈ 1.15 m and 1 bar at ≈ 0.44 m from each support</span>
    <div class="note"><p>Cutting bars in a tension zone also requires a shear check (ACI 318-19 §9.7.3.5) — in practice it is simpler to cut where \(V_u \le \tfrac23\phi V_n\) or add extra stirrups.</p></div>
  </div>
</div>` },
        { title: 'Detailing checklist', html: String.raw`
<ul class="check">
  <li>Every bar has \(\ell_d\) on both sides of its point of maximum stress.</li>
  <li>Top-bar factor 1.3 applied to bars with > 300 mm concrete below; grade factor \(\psi_g\) for \(f_y\) > 420 MPa.</li>
  <li>Hooks used where straight length is not available — and confined by ties so \(\psi_r\) = 1.0.</li>
  <li>Splices staggered and placed in low-stress regions; Class B by default.</li>
  <li>⅓ (simple) or ¼ (continuous) of positive steel extends 150 mm into the support.</li>
</ul>` }
      ]
    }
  ]
});
