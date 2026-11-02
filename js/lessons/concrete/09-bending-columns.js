/* Lesson 9 — Columns under axial load and bending */
KCE_COURSE.lessons.push({
  id: 'bending-columns',
  num: 9,
  title: 'Columns under Combined Axial Load and Bending',
  desc: 'Strain compatibility, interaction diagrams, balanced point, φ variation and biaxial bending by Bresler\'s method.',
  icon: '📈',
  color: 'sky',
  meta: ['ACI 318M-19 §21.2, 22.2–22.4', 'Columns', 'P–M interaction'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Almost every column carries a moment as well as axial load — from frame action, unbalanced spans or eccentric beams. An axial load \(P\) at eccentricity \(e = M/P\) is equivalent to \(P\) and \(M\). The strength of the section is described by an <strong>interaction diagram</strong>: every combination \((M_n, P_n)\) that brings the extreme concrete fibre to a strain of 0.003.</p>` },
        { title: 'Description', html: String.raw`
<ul>
  <li><strong>Compression-controlled</strong> (small \(e\)): concrete crushes before tension steel yields, \(\varepsilon_t \le \varepsilon_{ty}\).</li>
  <li><strong>Balanced</strong>: concrete crushes as tension steel yields, \(c = c_b\).</li>
  <li><strong>Tension-controlled</strong> (large \(e\)): steel yields first, \(\varepsilon_t \ge \varepsilon_{ty} + 0.003\) (ACI 318-19 Table 21.2.2), behaves like a beam.</li>
</ul>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose a neutral axis depth \(c\).</li>
  <li>Compute strains in each bar layer from \(\varepsilon_{cu}\) = 0.003 and stresses \(f_{si} = E_s\varepsilon_{si}\), \(|f_{si}| \le f_y\).</li>
  <li>Sum forces: \(P_n = 0.85f'_c ab + \sum A_{si}f_{si}\).</li>
  <li>Sum moments about the plastic centroid: \(M_n\).</li>
  <li>Repeat for several \(c\) to draw the diagram; apply \(\phi\) and the \(\phi P_{n,max}\) cap.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 300" role="img" aria-label="Interaction diagram">
    <line class="thin" x1="60" y1="270" x2="520" y2="270"/><line class="thin" x1="60" y1="270" x2="60" y2="20"/>
    <text x="490" y="290" class="m">Mn</text><text x="20" y="30" class="m">Pn</text>
    <path class="acc" d="M60 40 C 200 50, 300 110, 330 150 C 345 175, 300 230, 210 270"/>
    <path class="ln" d="M60 95 L 200 95 C 230 115, 250 140, 260 160 C 265 185, 225 235, 155 270" style="stroke-dasharray:6 4"/>
    <circle class="accf" cx="330" cy="150" r="5"/><text x="340" y="148" class="a">balanced (Mb, Pb)</text>
    <text x="70" y="36">P0</text><text x="70" y="90">φPn,max</text>
    <line class="dim" x1="60" y1="270" x2="330" y2="150"/><text x="150" y="215" class="m">e = eb</text>
    <text x="140" y="140" class="m">compression controls</text><text x="300" y="250" class="m">tension controls</text>
    <text x="400" y="200">— Pn–Mn</text><text x="400" y="220">- - φPn–φMn</text>
  </svg>
  <figcaption>Figure 1 — Nominal and design interaction diagrams. Radial lines from the origin are lines of constant eccentricity.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Strain compatibility', html: String.raw`
$$\varepsilon_{si} = 0.003\,\frac{c - d_i}{c},\qquad f_{si} = 200\,000\,\varepsilon_{si},\quad -f_y \le f_{si} \le f_y$$
$$P_n = 0.85f'_c\,\beta_1 c\,b + \sum_i A_{si}(f_{si} - 0.85f'_c\,[d_i < a])$$
$$M_n = 0.85f'_c\,ab\left(\frac{h}{2} - \frac{a}{2}\right) + \sum_i A_{si}f_{si}\left(\frac{h}{2} - d_i\right)$$
<p>(compression positive; the bracket deducts the concrete displaced by bars inside the stress block).</p>` },
        { title: 'Key points of the diagram', html: String.raw`
<table class="tbl">
  <thead><tr><th>Point</th><th>Neutral axis</th><th>\(\phi\)</th></tr></thead>
  <tbody>
    <tr><td>Pure compression \(P_0\)</td><td>\(c = \infty\)</td><td>0.65 (cap \(0.80\phi P_0\))</td></tr>
    <tr><td>Balanced (\(\varepsilon_t = \varepsilon_{ty}\))</td><td>\(c_b = \frac{600}{600 + f_y}d\)</td><td>0.65</td></tr>
    <tr><td>Tension-controlled limit (\(\varepsilon_t = \varepsilon_{ty} + 0.003\))</td><td>\(c = \frac{0.003}{0.006 + \varepsilon_{ty}}d\) (= \(\tfrac38 d\) for \(\varepsilon_{ty}\) = 0.002)</td><td>0.90</td></tr>
    <tr><td>Between</td><td>—</td><td>\(0.65 + 0.25\frac{\varepsilon_t - \varepsilon_{ty}}{0.003}\)</td></tr>
    <tr><td>Pure bending</td><td>from \(P_n = 0\)</td><td>0.90</td></tr>
  </tbody>
</table>
<p>For a symmetrical section with \(A_s = A'_s\) where both yield at balanced conditions, \(P_b = 0.85f'_c\,\beta_1 c_b\,b\) (steel forces cancel).</p>` },
        { title: 'Design with interaction charts', html: String.raw`
<p>Non-dimensional charts plot \(K_n = P_n/(f'_cA_g)\) against \(R_n = P_n e/(f'_cA_gh)\) for a bar arrangement and \(\gamma = \) (distance between bar layers)/\(h\). Procedure: compute \(K_n\), \(R_n\) from \(P_u/\phi\), \(M_u/\phi\); read \(\rho_g\) from the chart; interpolate between \(\gamma\) values.</p>` },
        { title: 'Biaxial bending — Bresler', html: String.raw`
<p>Corner columns and columns with beams in both directions see \(e_x\) and \(e_y\). Bresler's reciprocal load method (valid for \(P_n \ge 0.1f'_cA_g\)):</p>
$$\frac{1}{P_n} = \frac{1}{P_{nx}} + \frac{1}{P_{ny}} - \frac{1}{P_0}$$
<p>\(P_{nx}\): strength with \(e_y\) only (bending about x); \(P_{ny}\): strength with \(e_x\) only. For low axial load use the load contour: \(M_{ux}/\phi M_{nx} + M_{uy}/\phi M_{ny} \le 1\).</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Section and balanced point', html: String.raw`
<div class="ex">
  <div class="ex-head">400 × 600 mm column, 8DB32, f'c = 35 (β1 = 0.80), fy = 400, ex = 200 mm, ey = 300 mm</div>
  <div class="ex-body">
    <p>Conservatively ignore the middle bars: \(A_s = A'_s\) = 3DB32 = 2413 mm² on each face for the bending direction considered; \(d' \approx 65\) mm (cover 40 + tie 10 + ½ bar 16).</p>
    <ol class="steps">
      <li>Strong axis (h = 600, d = 535): \(c_b = \frac{600}{600 + 400}(535) = 321\) mm.</li>
      <li>Both steel layers yield and cancel, less the concrete displaced by \(A'_s\): \(P_b = [0.85(35)(0.8)(321)(400) - 0.85(35)(2413)]/10^3 \approx 2984\) kN; \(M_b \approx 961\) kN·m; \(e_b \approx 322\) mm.</li>
      <li>\(e_y\) = 300 mm < \(e_b\) → compression controls.</li>
    </ol>
  </div>
</div>` },
        { title: 'Uniaxial strengths and Bresler', html: String.raw`
<div class="ex">
  <div class="ex-head">Trial-and-error on c until Pn·e = Mn about the centroid</div>
  <div class="ex-body">
    <ol class="steps">
      <li><strong>Bending about x</strong> (\(e_y\) = 300, h = 600): \(c\) = 331 mm → \(P_{nx}\) = 3158 kN.</li>
      <li><strong>Bending about y</strong> (\(e_x\) = 200, h = 400): \(c\) = 206.5 mm → \(P_{ny}\) = 2942 kN.</li>
      <li>\(P_0 = 0.85(35)(240\,000 - 6434) + 400(6434) = 9522\) kN.</li>
      <li>\(\dfrac{1}{P_n} = \dfrac{1}{3158} + \dfrac{1}{2942} - \dfrac{1}{9522}\) → \(P_n = 1813\) kN.</li>
      <li>Both uniaxial cases are compression-controlled (\(\varepsilon_t \approx 0.0019 < \varepsilon_{ty}\) = 0.002) → \(\phi\) = 0.65.
        <span class="result">\(\phi P_n = 0.65 × 1813 ≈ 1178\) kN</span></li>
    </ol>
    <div class="note"><p>Check validity: \(P_n = 1813 \ge 0.1f'_cA_g = 840\) kN ✓.</p></div>
  </div>
</div>` },
        { title: 'Design checklist', html: String.raw`
<ul class="check">
  <li>Compute \(e = M_u/P_u\) and compare with \(e_b\) to know the failure mode.</li>
  <li>Use strain compatibility (or charts) to get \((\phi M_n, \phi P_n)\) on the same radial line.</li>
  <li>Apply the correct \(\phi\) from \(\varepsilon_t\) and the cap \(\phi P_{n,max}\).</li>
  <li>Biaxial: Bresler for \(P_n \ge 0.1f'_cA_g\), load contour otherwise.</li>
  <li>Check slenderness (lesson 10) before trusting the section design.</li>
</ul>` }
      ]
    }
  ]
});
