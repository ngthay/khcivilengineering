/* Lesson 11 — One-way slabs */
KCE_COURSE.lessons.push({
  id: 'one-way-slab',
  num: 11,
  title: 'One-Way Slabs',
  desc: 'Slabs spanning in one direction: minimum thickness, ACI moment coefficients, main and shrinkage reinforcement.',
  icon: '▭',
  color: 'blue',
  meta: ['ACI 318M-19 Ch.7, §6.5, 24.4', 'Slabs', 'Design'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A slab supported on two opposite sides, or a panel whose long side is more than twice its short side (\(L/S > 2\)), carries load mainly in the short direction. It is designed as a series of parallel <strong>1 m wide beams</strong> spanning between supports.</p>` },
        { title: 'Description', html: String.raw`
<ul>
  <li>Main steel runs in the short (span) direction; shrinkage and temperature steel runs perpendicular.</li>
  <li>Slabs normally have no stirrups, so their one-way shear strength uses the ACI 318-19 equation for members without shear reinforcement (it depends on \(\rho_w\) and slab depth).</li>
  <li>Continuous slabs with nearly equal spans may use the ACI moment and shear coefficients.</li>
</ul>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose \(h \ge h_{min}\) (ACI 318-19 Table 7.3.1.1), compute self-weight.</li>
  <li>Factored load \(w_u\) per metre width.</li>
  <li>Moments by coefficients \(M_u = C\,w_u\ell_n^2\) or by analysis.</li>
  <li>Steel for each critical section with \(b\) = 1000 mm; check \(A_{s,min}\) and spacing.</li>
  <li>Shrinkage steel; shear check \(V_u \le \phi V_c\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 220" role="img" aria-label="One-way slab on beams">
    <polygon class="conc" points="80,60 520,60 600,120 160,120"/>
    <polygon class="comp" points="250,60 330,60 410,120 330,120"/>
    <line class="ln" x1="80" y1="60" x2="160" y2="120"/><line class="ln" x1="520" y1="60" x2="600" y2="120"/>
        <text x="300" y="50" class="a">1 m strip</text>
    <line class="dim" x1="160" y1="150" x2="600" y2="150"/><text x="340" y="170">long side L</text>
    <line class="dim" x1="610" y1="120" x2="530" y2="60"/><text x="585" y="80">S</text>
    <text x="180" y="200" class="m">L/S > 2 → load goes to the long beams, slab spans S</text>
  </svg>
  <figcaption>Figure 1 — One-way slab: a 1 m strip spanning the short direction S is designed as a beam.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'ACI moment coefficients', html: String.raw`
<p>Valid for two or more spans, the larger of two adjacent spans not more than 20 % longer than the shorter, uniform load, \(L/D \le 3\), prismatic members (ACI 318-19 §6.5.1; coefficients from Table 6.5.2, shears from Table 6.5.4). \(\ell_n\) = clear span; for negative moment at interior supports use the average of adjacent clear spans.</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Location</th><th>Coefficient \(C\) (\(M_u = Cw_u\ell_n^2\))</th></tr></thead>
  <tbody>
    <tr><td>Positive, end span — discontinuous end unrestrained</td><td>1/11</td></tr>
    <tr><td>Positive, end span — discontinuous end integral with support</td><td>1/14</td></tr>
    <tr><td>Positive, interior spans</td><td>1/16</td></tr>
    <tr><td>Negative, exterior face of first interior support — two spans</td><td>1/9</td></tr>
    <tr><td>Negative, exterior face of first interior support — more than two spans</td><td>1/10</td></tr>
    <tr><td>Negative, other faces of interior supports</td><td>1/11</td></tr>
    <tr><td>Negative, all supports — slabs with spans ≤ 3 m, or beams where Σ column stiffness / beam stiffness > 8 at each end</td><td>1/12</td></tr>
    <tr><td>Negative, interior face of exterior support — support is a spandrel beam</td><td>1/24</td></tr>
    <tr><td>Negative, interior face of exterior support — support is a column</td><td>1/16</td></tr>
    <tr><td>Shear: end span at first interior support / all other supports</td><td>\(1.15w_u\ell_n/2\) / \(w_u\ell_n/2\)</td></tr>
  </tbody>
</table></div>` },
        { title: 'One-way shear', html: String.raw`
<p>Slabs have no stirrups (\(A_v < A_{v,min}\)), so ACI 318-19 Table 22.5.5.1(c) applies:</p>
$$V_c = 0.66\,\lambda_s\lambda\,\rho_w^{1/3}\sqrt{f'_c}\,b_wd,\qquad \lambda_s = \sqrt{\frac{2}{1 + 0.004d}} \le 1.0$$
<p>with \(\rho_w = A_s/(bd)\) of the tension steel at the section and \(b\) = 1000 mm. For slabs with \(d \le 250\) mm, \(\lambda_s\) = 1.0. Minimum shear reinforcement is not required in slabs (§7.6.3.1 applies only where \(V_u > \phi V_c\)).</p>
<div class="note"><p>For a lightly reinforced slab (\(\rho_w\) ≈ 0.004) this gives about \(0.10\sqrt{f'_c}\,bd\) — roughly 40 % less than the old \(0.17\sqrt{f'_c}\,bd\). Shear rarely governs one-way slabs, but check it.</p></div>` },
        { title: 'Minimum and shrinkage steel', html: String.raw`
<table class="tbl">
  <thead><tr><th>Steel (ACI 318-19)</th><th>Minimum</th><th>Max. spacing</th></tr></thead>
  <tbody>
    <tr><td>Flexural steel (§7.6.1.1)</td><td>\(A_{s,min} = 0.0018A_g\), all grades</td><td>\(\min(3h,\ 450)\) mm (§7.7.2.3)</td></tr>
    <tr><td>Shrinkage and temperature steel (§24.4.3.2)</td><td>\(0.0018A_g\), all grades</td><td>\(\min(5h,\ 450)\) mm (§24.4.3.3)</td></tr>
  </tbody>
</table>
<div class="note"><p><strong>Change from ACI 318-08:</strong> the ratio was 0.0020 for Grade 280/350 bars and \(0.0018 × 420/f_y\) for higher grades. ACI 318-19 uses 0.0018 for every grade of deformed bar.</p></div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 1: simply supported slab', html: String.raw`
<div class="ex">
  <div class="ex-head">Span 3.65 m, superimposed DL = 5.7 kPa, LL = 4.8 kPa, f'c = 21, fy = 400</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(h_{min} = \frac{L}{20}(0.4 + \frac{400}{700}) = \frac{3650}{20}(0.971) = 177\) mm → <strong>h = 190 mm</strong>, d = 160 mm.</li>
      <li>Self-weight 0.19 × 24 = 4.56 kPa; \(w_u = 1.2(5.7 + 4.56) + 1.6(4.8) \approx 20.0\) kN/m per metre.</li>
      <li>\(M_u = 20(3.65^2)/8 = 33.3\) kN·m/m; \(R_u = 1.45\) MPa → \(\rho = 0.003773\), \(A_s = 604\) mm²/m.</li>
      <li>DB10 @ 125 (628 mm²/m), s ≤ 3h = 570 ✓; \(a = 14.1\) mm, \(\phi M_n = 34.6\) kN·m ✓.</li>
      <li>Main steel ≥ \(A_{s,min} = 0.0018(1000)(190) = 342\) mm²/m ✓. Shrinkage: 342 mm²/m → DB10 @ 200 (393 mm²/m; s ≤ 5h, 450 ✓).</li>
      <li>Shear: \(V_u = 20(3.65)/2 = 36.5\) kN at the support, 33.3 kN at \(d\). \(\rho_w = 628/(1000 × 160) = 0.00393\), \(\lambda_s\) = 1.0 (d = 160):
        \(\phi V_c = 0.75(0.66)(0.00393)^{1/3}\sqrt{21}(1000)(160)/10^3 = 57.3\) kN ≥ 33.3 kN ✓ (ACI 318-08 gave 93.5 kN).
        <span class="result">h = 190 mm, main DB10 @ 125, shrinkage DB10 @ 200</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 2: two-span continuous slab', html: String.raw`
<div class="ex">
  <div class="ex-head">Clear spans 3.6 m and 3.8 m on 0.2 m beams, DL = 4.2 kPa + self-weight, LL = 7.5 kPa, f'c = 25, fy = 400</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(h_{min} = \ell/24\) (one end continuous) → 4000/24 × 0.971 = 162 → <strong>h = 170 mm</strong>, d = 144 mm; self-weight 4.08 kPa.</li>
      <li>\(w_u = 1.2(4.2 + 4.08) + 1.6(7.5) = 21.94\) kN/m.</li>
    </ol>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Section</th><th>C</th><th>\(M_u\) (kN·m/m)</th><th>\(A_s\) (mm²/m)</th><th>Bars</th></tr></thead>
      <tbody>
        <tr><td>Span A, exterior support</td><td>−1/24</td><td>11.85</td><td>min 306</td><td>DB10 @ 250</td></tr>
        <tr><td>Span A, midspan</td><td>+1/14</td><td>20.31</td><td>402</td><td>DB12 @ 250</td></tr>
        <tr><td>Interior support (ℓn avg 3.7)</td><td>−1/9</td><td>33.37</td><td>673</td><td>DB12 @ 160</td></tr>
        <tr><td>Span B, midspan</td><td>+1/14</td><td>22.63</td><td>450</td><td>DB12 @ 250</td></tr>
        <tr><td>Span B, exterior support</td><td>−1/24</td><td>13.20</td><td>min 306</td><td>DB10 @ 250</td></tr>
      </tbody>
    </table></div>
    <p>\(A_{s,min}\) = shrinkage steel = 0.0018(1000)(170) = 306 mm²/m → DB10 @ 250 (314 mm²/m; ≤ 3h = 510 and 450 ✓).</p>
    <p>Maximum shear \(1.15w_u\ell_n/2 = 47.9\) kN at the first interior support, where the top steel is DB12 @ 160: \(\rho_w = 707/(1000 × 144) = 0.00491\), so \(\phi V_c = 0.75(0.66)(0.00491)^{1/3}(5)(1000)(144)/10^3 = 60.6\) kN ≥ 47.9 kN ✓.</p>
  </div>
</div>` },
        { title: 'Design checklist', html: String.raw`
<ul class="check">
  <li>\(L/S > 2\) (or supported on two sides only) → one-way action.</li>
  <li>\(h \ge h_{min}\) (Table 7.3.1.1); cover 20 mm (not exposed, Table 20.5.1.3.1).</li>
  <li>Coefficients valid (spans within 20 %, \(L/D \le 3\)).</li>
  <li>Main steel ≥ 0.0018\(A_g\); spacing ≤ 3h / 450.</li>
  <li>Shear: \(V_u \le \phi\,0.66\lambda_s\rho_w^{1/3}\sqrt{f'_c}\,bd\).</li>
  <li>Shrinkage steel ⟂ main steel; spacing ≤ 5h / 450.</li>
</ul>` }
      ]
    }
  ]
});
