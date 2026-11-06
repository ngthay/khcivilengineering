/* Lesson 5 — Response spectra (Paz & Leigh, Chapter 5) */
KCE_COURSE.lessons.push({
  id: 'response-spectra',
  num: 5,
  title: 'Response Spectra — Elastic, Design and Inelastic',
  desc: 'Spectral displacement, pseudo-velocity and pseudo-acceleration, the tripartite chart, the El Centro 1940 spectra, Newmark–Hall design spectra and amplification factors, the influence of soil, and inelastic spectra with the ductility ratio.',
  icon: '📉',
  color: 'rose',
  meta: ['Chapter 5', 'S_D · S_V · S_A', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>response spectrum</strong> is a plot of the maximum response of a whole family of simple oscillators (each with its own natural frequency and damping) to one ground motion. Once the spectrum exists, the peak response of any one-degree-of-freedom structure is read off directly — no time integration is needed.</p>
$$S_D = |u_r|_{max},\qquad S_V = \omega S_D,\qquad S_A = \omega^2 S_D$$
<p>S_V and S_A are the <em>pseudo</em>-velocity and <em>pseudo</em>-acceleration: for an undamped system S_A equals the true maximum absolute acceleration; with damping it is a very close approximation.</p>` },
        { title: 'Description', html: String.raw`
<p>Since \(\log S_V = \log f + \log 2\pi S_D\) and \(\log S_V = -\log f + \log S_A/2\pi\), lines of constant S_D and S_A are straight lines at ±45° on a log–log plot of S_V against f. This <strong>tripartite chart</strong> shows all three quantities at once.</p>
<p>The 1940 El Centro N–S record (peak 0.32 g) was for decades the standard input. Its spectrum is jagged; for design, the spectra of many records are smoothed into a <strong>design spectrum</strong>.</p>` },
        { title: 'Methodology', html: String.raw`
<p><strong>Newmark–Hall design spectrum.</strong> Draw the ground-motion maxima (normalised to 1.0 g: 48 in/s and 36 in) on tripartite paper and multiply each by an amplification factor:</p>
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>Damping %</th><th>Displacement</th><th>Velocity</th><th>Acceleration</th></tr></thead>
  <tbody>
    <tr><td>0</td><td>2.5</td><td>4.0</td><td>6.4</td></tr>
    <tr><td>0.5</td><td>2.2</td><td>3.6</td><td>5.8</td></tr>
    <tr><td>1</td><td>2.0</td><td>3.2</td><td>5.2</td></tr>
    <tr><td>2</td><td>1.8</td><td>2.8</td><td>4.3</td></tr>
    <tr><td>5</td><td>1.4</td><td>1.9</td><td>2.6</td></tr>
    <tr><td>7</td><td>1.2</td><td>1.5</td><td>1.9</td></tr>
    <tr><td>10</td><td>1.1</td><td>1.3</td><td>1.5</td></tr>
    <tr><td>20</td><td>1.0</td><td>1.1</td><td>1.2</td></tr>
  </tbody>
</table></div>
<p>The amplified acceleration line runs to about 6 cps and then drops to the ground acceleration at about 30 cps. Scale the whole spectrum by the design peak ground acceleration.</p>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="Design spectrum shape">
    <path class="thin" d="M50 170 H490 M50 170 V20"/><text x="440" y="190" class="m">period T</text><text x="14" y="28" class="m">S_A</text>
    <path class="acc" d="M50 120 L95 60 H200 C260 90 330 120 490 150"/>
    <path class="dim" d="M95 60 V170 M200 60 V170"/>
    <text x="110" y="52" class="a">constant S_A plateau</text><text x="290" y="84" class="m">S_A ∝ 1/T (constant S_V)</text>
    <text x="60" y="135" class="m">PGA</text>
  </svg>
  <figcaption>Figure 1 — A smoothed design spectrum: rising branch, acceleration plateau, then a velocity-controlled decay.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Local soil conditions', html: String.raw`
<p>Records on soft soil have their peaks at longer periods than records on rock. The book gives normalised spectral shapes S_A (5 % damping, per 1 g of ground acceleration) by soil type (SEAOC-90 / UBC):</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Soil type</th><th>Rising</th><th>Plateau</th><th>Decay</th></tr></thead>
  <tbody>
    <tr><td>I — rock and stiff soil</td><td>1 + 10T, T ≤ 0.15</td><td>2.5, 0.15–0.39 s</td><td>0.975/T</td></tr>
    <tr><td>II — deep cohesionless or stiff clay</td><td>1 + 10T, T ≤ 0.15</td><td>2.5, 0.15–0.585 s</td><td>1.463/T</td></tr>
    <tr><td>III — soft to medium clay and sand</td><td>1 + 7.5T, T ≤ 0.2 (printed “75T” in the book)</td><td>2.5, 0.2–0.915 s</td><td>2.288/T</td></tr>
  </tbody>
</table></div>
<p>These elastic values are then divided by the structural factor R (4–12) for design.</p>` },
        { title: 'Inelastic spectra and ductility', html: String.raw`
<p>With the <strong>ductility ratio</strong> \(\mu = u_{max}/u_y\), an elastoplastic system can be designed for a smaller force than an elastic one:</p>
<ul>
  <li><strong>Displacement and velocity regions</strong> (low and medium frequency) — equal displacements: \(F_y = F_E/\mu\), \(S_a = S_{aE}/\mu\).</li>
  <li><strong>Acceleration region</strong> (high frequency) — equal energy (area under the curves): \(F_E^2/2k = F_y^2(2\mu-1)/2k\), so \(S_a = S_{aE}/\sqrt{2\mu-1}\).</li>
</ul>
<p>Read S_A and S_V directly from an inelastic chart; spectral displacements read from it must be multiplied by μ. Ductility of 1–1.5 limits damage in concrete walls; 2–3 is used to prevent collapse.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 5.1 — reading the spectra', html: String.raw`
<div class="ex">
  <div class="ex-head">A one-DOF structure with T = 1 s and ξ = 10 %. Find S_D, S_V and S_A for (a) the El Centro 1940 N–S record and (b) the Newmark–Hall design spectrum scaled to 0.32 g.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) El Centro spectra at f = 1 cps, ξ = 0.10: \(S_D = 3.3\) in, \(S_V = 18.5\) in/s, \(S_A = 0.30\,g\).</li>
      <li>(b) Design spectrum (1 g) at f = 1 cps, ξ = 0.10: S_D = 9.5 in, S_V = 60 in/s, S_A = 0.95 g; scale by 0.32:
        <span class="result">S_D = 3.04 in · S_V = 19.2 in/s · S_A = 0.304 g</span></li>
      <li>Check the relations: \(\omega = 2\pi\); \(S_V = \omega S_D = 6.283\times3.04 = 19.1\) in/s ✓; \(S_A = \omega S_V = 120\) in/s² = 0.31 g ✓.</li>
    </ol>
  </div>
</div>` },
        { title: 'Inelastic reduction', html: String.raw`
<div class="ex">
  <div class="ex-head">The elastic design acceleration of a structure is 0.75 g. What yield level is needed for μ = 4 (a) if T lies in the velocity region and (b) if it lies in the acceleration region?</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) Equal displacement: \(S_a = 0.75/4 = 0.19\,g\).</li>
      <li>(b) Equal energy: \(S_a = 0.75/\sqrt{2\times4-1} = 0.75/2.65 = 0.28\,g\).
        <span class="result">Short-period structures gain less from ductility</span></li>
    </ol>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use S_A = ω²S_D and S_V = ωS_D to move between the three scales.</li>
  <li>Scale a normalised design spectrum by the design peak ground acceleration.</li>
  <li>Choose the spectral shape for the site soil.</li>
  <li>Reduce for ductility by μ (long periods) or √(2μ − 1) (short periods).</li>
</ul>` }
      ]
    }
  ]
});
