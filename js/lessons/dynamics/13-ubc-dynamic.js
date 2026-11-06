/* Lesson 13 — UBC-97 dynamic method: modal response spectrum analysis (Paz & Leigh, Chapter 24) */
KCE_COURSE.lessons.push({
  id: 'ubc-dynamic',
  num: 13,
  title: 'Earthquake Design by UBC-97 — Dynamic (Modal Spectrum) Method',
  desc: 'Modal equations with the participation factor, modal spectral values, effective modal weight and the 90 % rule, modal lateral forces, shears, displacements, drift and overturning, SRSS combination and scaling to the static base shear — applied to the two-story frame.',
  icon: '🌐',
  color: 'violet',
  meta: ['Chapter 24', 'Effective modal weight', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The <strong>dynamic method</strong> applies the response spectrum to each mode of the building (Lesson 8) and combines the modal results. UBC-97 requires it for regular buildings over 240 ft, irregular buildings over five stories or 65 ft, buildings in zones 3–4 with dissimilar structural systems, and buildings on soil S_F with T &gt; 0.7 s; it may be used for any building.</p>
$$[M]\{\ddot u_r\} + [K]\{u_r\} = -[M]\{1\}\ddot u_s(t)\ \Rightarrow\ \ddot z_m + 2\xi_m\omega_m\dot z_m + \omega_m^2z_m = -\Gamma_m\ddot u_s(t)$$` },
        { title: 'Description', html: String.raw`
<p>With normalised modes and floor weights W_x, mode m gives</p>
$$\Gamma_m = \frac{\sum\phi_{im}W_i}{\sum\phi_{im}^2W_i} = \frac1g\sum_i\phi_{im}W_i,\qquad W_m = \frac{\left(\sum\phi_{im}W_i\right)^2}{\sum\phi_{im}^2W_i}\ \text{(effective modal weight)}$$
<p>The effective modal weights add up to the total weight, \(\sum_m W_m = W\). UBC-97 requires enough modes for <strong>at least 90 %</strong> of the weight.</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Quantity (mode m, level x)</th><th>Formula</th></tr></thead>
  <tbody>
    <tr><td>Base shear</td><td>\(V_m = W_mS_{am}\) (S_am in g)</td></tr>
    <tr><td>Lateral force</td><td>\(F_{xm} = C_{xm}V_m,\ C_{xm} = \phi_{xm}W_x/\sum\phi_{im}W_i\)</td></tr>
    <tr><td>Story shear</td><td>\(V_{xm} = \sum_{i\ge x}F_{im}\)</td></tr>
    <tr><td>Displacement</td><td>\(\delta_{xm} = \dfrac{g}{4\pi^2}\dfrac{T_m^2F_{xm}}{W_x}\)</td></tr>
    <tr><td>Drift</td><td>\(\Delta_{xm} = \delta_{xm} - \delta_{(x-1)m}\)</td></tr>
    <tr><td>Overturning</td><td>\(M_{xm} = \sum_{i>x}F_{im}(h_i - h_x)\)</td></tr>
  </tbody>
</table></div>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Solve the eigenproblem; normalise the modes.</li>
  <li>For each mode read S_am from the design spectrum at T_m. The UBC-97 elastic spectrum (5 % damping) rises from C_a at T = 0 to the plateau 2.5C_a between T₀ = 0.2T_s and \(T_s = C_v/2.5C_a\), then falls as C_v/T.</li>
  <li>Divide by R (and multiply by I) to get the design level.</li>
  <li>Compute the modal forces, shears, displacements and moments.</li>
  <li>Combine by <strong>SRSS</strong> (or CQC when frequencies are close). Combine <em>each response quantity</em> — never derive shears from combined forces.</li>
  <li>Scale: the dynamic base shear must be at least 90 % of the static base shear for regular buildings (100 % for irregular ones).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="UBC design spectrum with two modal periods">
    <path class="thin" d="M50 170 H490 M50 170 V20"/><text x="452" y="190" class="m">T (s)</text><text x="12" y="28" class="m">S_a (g)</text>
    <path class="acc" d="M50 120 L80 50 H170 C230 80 330 110 490 135"/>
    <path class="dim" d="M80 50 V170 M170 50 V170 M120 50 V170 M240 90 V170"/>
    <text x="74" y="186" class="m">T₀</text><text x="164" y="186" class="m">T_s</text><text x="114" y="186" class="a">T₂</text><text x="234" y="186" class="a">T₁</text>
    <text x="180" y="44" class="m">2.5C_a</text><text x="300" y="110" class="m">C_v/T</text>
  </svg>
  <figcaption>Figure 1 — UBC-97 design spectrum; each mode is read at its own period.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Why the first mode dominates', html: String.raw`
<p>For regular buildings the first mode carries most of the effective weight (often 75–90 %), so the static method — a first-mode force pattern — works well. Higher modes matter for tall, flexible or irregular buildings, for top-story shears and for accelerations of equipment and contents.</p>
<div data-widget="shear-building-2dof" data-title="Two-story building — modes, participation and effective mass"></div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Modal spectrum analysis of the two-story frame', html: String.raw`
<div class="ex">
  <div class="ex-head">Apply the UBC-97 dynamic method to the steel frame of Example 7.1 (W₁ = 52,500 lb, W₂ = 25,500 lb) in zone 3 on rock S_B (C_a = C_v = 0.3), I = 1.0, special moment frame R = 8.5. (Worked for this course with the book’s method.)</div>
  <div class="ex-body">
    <ol class="steps">
      <li>From Lesson 7: T₁ = 0.531 s, T₂ = 0.191 s; φ₁ = (0.06437, 0.08130), φ₂ = (0.0567, −0.0924).</li>
      <li>Spectrum: \(T_s = 0.3/(2.5\times0.3) = 0.40\) s. Mode 1: \(S_a = C_v/T = 0.3/0.531 = 0.565\,g\); mode 2 (on the plateau): \(S_a = 0.75\,g\).</li>
      <li>Participation: \(\Gamma_1 = 136(0.06437) + 66(0.0813) = 14.12\); \(\Gamma_2 = 136(0.0567) - 66(0.0924) = 1.613\).</li>
      <li>Effective weights: \(W_1 = 76{,}980\) lb (98.7 %), \(W_2 = 1000\) lb (1.3 %) → one mode already exceeds 90 %.</li>
      <li>Design base shears (÷ R): \(V_1 = 76{,}980\times0.565/8.5 = 5115\) lb; \(V_2 = 1000\times0.75/8.5 = 88\) lb.</li>
      <li>Floor forces: mode 1 (3171, 1944) lb; mode 2 (422, −334) lb. Story shears: first story (5115, 88), second story (1944, −334).</li>
      <li>SRSS: base shear \(\sqrt{5115^2 + 88^2} = 5116\) lb; second-story shear \(\sqrt{1944^2 + 334^2} = 1973\) lb.</li>
      <li>Static check: \(T_A = 0.035(25)^{3/4} = 0.39\) s &lt; T_s, so \(V = 2.5C_aIW/R = 2.5(0.3)(78{,}000)/8.5 = 6880\) lb; 90 % of it is 6190 lb.
        <span class="result">Scale the dynamic results by 6190/5116 = 1.21 → design base shear 6190 lb</span></li>
    </ol>
    <p>Elastic (design-level) displacements of mode 1 are 0.167 and 0.210 in; the expected inelastic displacements are 0.7R times larger (about 1.0 and 1.25 in).</p>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Include modes until the effective weights reach 90 % of W.</li>
  <li>Use S_a/R for forces; multiply displacements by 0.7R for drift checks.</li>
  <li>Combine each response quantity by SRSS (CQC for closely spaced modes).</li>
  <li>Scale to at least 90 % (regular) or 100 % (irregular) of the static base shear.</li>
</ul>` }
      ]
    }
  ]
});
