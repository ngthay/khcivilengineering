/* Lesson 18 — Theories of failure (Bansal, Ch. 24) */
KCE_COURSE.lessons.push({
  id: 'failure-theories',
  num: 18,
  title: 'Theories of Failure',
  desc: 'Maximum principal stress, principal strain, shear stress, strain energy and distortion energy theories, with design of a bolt.',
  icon: '💥',
  color: 'amber',
  meta: ['Bansal Ch. 24', 'Combined stress', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A tensile test tells us when a bar fails under <em>simple</em> tension. Real members carry combined stresses. A <strong>theory of failure</strong> compares some quantity of the combined stress state (stress, strain, shear stress or energy) with the same quantity at failure in simple tension.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Theory</th><th>Author</th><th>Design condition (σ₁ ≥ σ₂ ≥ σ₃, σₜ = permissible tensile stress)</th></tr></thead>
  <tbody>
    <tr><td>Maximum principal stress</td><td>Rankine</td><td>\(\sigma_1 \le \sigma_t\)</td></tr>
    <tr><td>Maximum principal strain</td><td>St. Venant</td><td>\(\sigma_1 - \mu(\sigma_2 + \sigma_3) \le \sigma_t\)</td></tr>
    <tr><td>Maximum shear stress</td><td>Guest / Tresca</td><td>\(\sigma_1 - \sigma_3 \le \sigma_t\)</td></tr>
    <tr><td>Maximum strain energy</td><td>Haigh</td><td>\(\sigma_1^2 + \sigma_2^2 + \sigma_3^2 - 2\mu(\sigma_1\sigma_2 + \sigma_2\sigma_3 + \sigma_3\sigma_1) \le \sigma_t^2\)</td></tr>
    <tr><td>Maximum shear strain energy (distortion)</td><td>von Mises–Hencky</td><td>\(\tfrac12[(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2] \le \sigma_t^2\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the principal stresses at the critical point (lesson 3).</li>
  <li>Choose the theory: brittle materials → maximum principal stress; ductile materials → maximum shear stress or distortion energy.</li>
  <li>Permissible stress = elastic-limit stress ÷ factor of safety; apply the condition.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 300" role="img" aria-label="Failure envelopes">
    <path class="thin" d="M30 150 H430 M230 280 V20"/><text x="420" y="144">σ₁</text><text x="236" y="28">σ₂</text>
    <rect class="ln" x="130" y="50" width="200" height="200" style="stroke-dasharray:5 4"/>
    <polygon class="acc" points="330,150 330,50 230,50 130,150 130,250 230,250"/>
    <ellipse class="ln" cx="230" cy="150" rx="141" ry="82" transform="rotate(-45 230 150)" style="stroke:#e0565b"/>
    <text x="340" y="44" class="m">principal stress (square)</text><text x="300" y="270" class="m" style="fill:#e0565b">distortion energy (ellipse)</text>
    <text x="12" y="96" class="a">max shear</text><text x="12" y="112" class="a">(hexagon)</text>
  </svg>
  <figcaption>Figure 1 — Failure envelopes for a 2-D stress state; inside an envelope the material is safe by that theory.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Bolt under axial load and shear', html: String.raw`
<div class="ex">
  <div class="ex-head">A bolt carries an axial pull of 9 kN and a transverse shear of 4.5 kN. Elastic limit in tension 225 N/mm², factor of safety 3, μ = 0.3. Find the diameter by the maximum shear stress and the maximum strain energy theories.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\sigma_t = 225/3 = 75\) N/mm². Stresses: \(\sigma = 9000/(\pi d^2/4) = 11\,459/d^2\), \(\tau = 4500/(\pi d^2/4) = 5729.5/d^2\).</li>
      <li>\(\sqrt{(\sigma/2)^2 + \tau^2} = 8103/d^2\); principal stresses \(\sigma_{1,2} = (5729.5 \pm 8103)/d^2 = 13\,832.5/d^2,\ -2373.5/d^2\).</li>
      <li><strong>Maximum shear stress:</strong> \(8103/d^2 = 75/2\) → \(d = 14.70\) mm.</li>
      <li><strong>Maximum strain energy:</strong> \(\sigma_1^2 + \sigma_2^2 - 2\mu\sigma_1\sigma_2 = 75^2\) → \(21\,667×10^4/d^4 = 5625\) → \(d = 14.01\) mm.
        <span class="result">d = 14.70 mm (shear stress theory), 14.01 mm (strain energy theory)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 24.7 — strain energy check', html: String.raw`
<div class="ex">
  <div class="ex-head">Principal stresses 200 N/mm² (T), 100 N/mm² (T), 50 N/mm² (C); elastic limit in simple tension 200 N/mm²; μ = 0.3. Will the material fail by the maximum strain energy theory?</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\sigma_1^2 + \sigma_2^2 + \sigma_3^2 - 2\mu(\sigma_1\sigma_2 + \sigma_2\sigma_3 + \sigma_3\sigma_1) = 52\,500 - 0.6(5000) = 49\,500\).</li>
      <li>Limit \(\sigma_t^{*2} = 200^2 = 40\,000\). Since 49 500 &gt; 40 000:
        <span class="result ng">Failure will occur according to the maximum strain energy theory</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Find all three principal stresses (σ₃ = 0 in plane stress).</li>
  <li>Ductile: Tresca (conservative) or von Mises; brittle: Rankine.</li>
  <li>Apply the factor of safety to the simple-tension limit.</li>
</ul>` }
      ]
    }
  ]
});
