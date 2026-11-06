/* Lesson 6 — Shear strength of soil (CCES Soil Mechanics §6) */
KCE_COURSE.lessons.push({
  id: 'shear-strength',
  num: 6,
  title: 'Shear Strength of Soil',
  desc: 'The Mohr–Coulomb failure criterion, the failure plane, effective stress, the direct shear test, triaxial tests (CD, CU, UU) and the unconfined compression test.',
  icon: '✂️',
  color: 'rose',
  meta: ['§6', 'τ = c + σ tan φ', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Soil fails in <strong>shear</strong>: the grains slide over each other along a surface. Its shear strength comes from <strong>cohesion</strong> \(c\) (bonding between clay particles) and <strong>internal friction</strong> \(\varphi\). It governs bearing capacity, earth pressure and slope stability.</p>` },
        { title: 'Description', html: String.raw`
$$\tau_f = c + \sigma\tan\varphi\qquad \text{(Mohr–Coulomb)}$$
<p>In saturated soil only the grain-to-grain stress resists shear (Terzaghi): \(\sigma = \sigma' + u\), so</p>
$$\tau_f = c' + (\sigma - u)\tan\varphi'$$
<p>Failure plane inclination to the major principal plane: \(\theta = 45° + \varphi/2\). At failure \(\sigma_1 = \sigma_3\tan^2(45° + \varphi/2) + 2c\tan(45° + \varphi/2)\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Test three or more specimens at different normal (or cell) pressures.</li>
  <li><strong>Direct shear:</strong> plot peak \(\tau\) against \(\sigma\); the straight line gives \(c\) (intercept) and \(\varphi\) (slope).</li>
  <li><strong>Triaxial:</strong> draw a Mohr circle for each test (\(\sigma_3\), \(\sigma_1\)); the common tangent is the failure envelope.</li>
  <li>Choose total-stress (\(c_u, \varphi_u\)) or effective-stress (\(c', \varphi'\)) parameters according to the drainage of the real problem.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 540 250" role="img" aria-label="Mohr circles and failure envelope">
    <path class="thin" d="M50 210 H520 M70 230 V20"/>
    <circle class="thin" cx="200" cy="210" r="60"/><circle class="thin" cx="330" cy="210" r="100"/>
    <path class="acc" d="M70 189 L520 43"/>
    <text x="50" y="194" class="a">c</text><text x="390" y="64" class="a">τ = c + σ tan φ</text>
    <path class="dim" d="M70 189 H140"/><path class="thin" d="M130 189 A 60 60 0 0 0 129 170"/><text x="136" y="182" class="m">φ</text>
    <text x="500" y="228" class="m">σ</text><text x="76" y="30" class="m">τ</text>
    <text x="134" y="228" class="m">σ₃</text><text x="254" y="228" class="m">σ₁</text>
  </svg>
  <figcaption>Figure 1 — Mohr circles at failure and the Mohr–Coulomb envelope.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Laboratory tests', html: String.raw`
<table class="tbl">
  <thead><tr><th>Test</th><th>Procedure</th><th>Gives</th></tr></thead>
  <tbody>
    <tr><td>Direct shear (Casagrande box)</td><td>Normal load on a split box; lower half pushed at ≈ 1.2 mm/min</td><td>\(c, \varphi\); peak and residual (critical-state) strength</td></tr>
    <tr><td>CD triaxial (drained)</td><td>Consolidate under \(\sigma_3\), shear slowly with drainage (\(u = 0\))</td><td>\(c', \varphi'\) — long-term stability</td></tr>
    <tr><td>CU triaxial</td><td>Consolidate, then shear undrained measuring \(u\)</td><td>\(c_{cu}, \varphi_{cu}\) and \(c', \varphi'\)</td></tr>
    <tr><td>UU triaxial</td><td>No drainage at any stage</td><td>\(c_u\) with \(\varphi_u = 0\) — short-term stability of clays</td></tr>
    <tr><td>Unconfined compression</td><td>\(\sigma_3 = 0\), axial load to failure</td><td>\(q_u\); \(c_u = q_u/2\)</td></tr>
  </tbody>
</table>
<p>Normally consolidated clays and sands have \(c' \approx 0\) and \(\varphi'\) ≈ 20 – 30° (clay) or 28 – 40° (sand); overconsolidated clays show some \(c'\). Skempton’s pore-pressure coefficient \(B = \Delta u/\Delta\sigma_3\) ≈ 1 for saturated soft clay.</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Direct shear results', html: String.raw`
<div class="ex">
  <div class="ex-head">Direct shear tests on a clayey sand give peak shear stresses of 62, 97 and 132 kPa under normal stresses of 50, 110 and 170 kPa. Find \(c\) and \(\varphi\), and the strength at \(\sigma = 140\) kPa.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Slope \(\tan\varphi = (132 - 62)/(170 - 50) = 0.583\) → \(\varphi = 30.3°\).</li>
      <li>Intercept \(c = 62 - 50(0.583) = 32.8\) kPa.</li>
      <li>\(\tau_f = 32.8 + 140(0.583) = 114.5\) kPa.
        <span class="result">c ≈ 33 kPa, φ ≈ 30°, τ_f(140 kPa) ≈ 115 kPa</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Short-term in clay: undrained \(c_u\), \(\varphi = 0\). Long-term: \(c'\), \(\varphi'\).</li>
  <li>Use effective stresses whenever pore pressure is known.</li>
  <li>For sand the envelope passes through the origin (\(c = 0\)).</li>
</ul>` }
      ]
    }
  ]
});
