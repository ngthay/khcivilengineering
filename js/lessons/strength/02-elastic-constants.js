/* Lesson 2 — Elastic constants (Bansal, Ch. 2) */
KCE_COURSE.lessons.push({
  id: 'elastic-constants',
  num: 2,
  title: 'Elastic Constants',
  desc: 'Lateral strain, Poisson’s ratio, volumetric strain, bulk modulus, complementary shear and the relations between E, G and K.',
  icon: '🧮',
  color: 'mint',
  meta: ['Bansal Ch. 2', 'E · G · K · μ', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A bar pulled along its length gets longer (<strong>longitudinal strain</strong>) and thinner (<strong>lateral strain</strong>). The ratio of the two is <strong>Poisson’s ratio</strong> \(\mu\). Together with Young’s modulus \(E\), the modulus of rigidity \(G\) and the bulk modulus \(K\), these are the <strong>elastic constants</strong>; only two of them are independent.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Poisson’s ratio</th><td>\(\mu = \dfrac{\text{lateral strain}}{\text{longitudinal strain}}\) — 0.25 to 0.33 for metals</td></tr>
    <tr><th>Volumetric strain</th><td>\(e_v = \delta V/V\)</td></tr>
    <tr><th>Bulk modulus</th><td>\(K = \dfrac{\text{direct stress}}{e_v}\) under equal stress in three directions</td></tr>
    <tr><th>Modulus of rigidity</th><td>\(G = \tau/\phi\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find longitudinal strain \(\delta L/L\) and lateral strain \(\delta d/d\) from the measurements.</li>
  <li>\(\mu\) = lateral / longitudinal strain; \(E = \sigma/e\).</li>
  <li>Volumetric strain: rectangular bar \(e_v = e(1 - 2\mu)\); cylindrical rod \(e_v = \delta L/L - 2\,\delta d/d\).</li>
  <li>Use \(E = 3K(1 - 2\mu) = 2G(1 + \mu)\) to get the remaining constants.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 600 190" role="img" aria-label="Lateral contraction and pure shear">
    <rect class="thin" x="40" y="60" width="200" height="70" style="stroke-dasharray:5 4"/>
    <rect class="conc" x="30" y="66" width="220" height="58"/>
    <path class="acc" d="M30 95 h-24 M250 95 h24"/><polygon class="accf" points="6,95 14,91 14,99"/><polygon class="accf" points="274,95 266,91 266,99"/>
    <text x="60" y="160" class="m">longer by δL, thinner by δd</text>
    <rect class="conc" x="380" y="50" width="100" height="100"/>
    <path class="acc" d="M385 44 h90 M486 145 v-90 M475 156 h-90 M374 55 v90"/>
    <polygon class="accf" points="475,44 467,40 467,48"/><polygon class="accf" points="486,55 482,63 490,63"/><polygon class="accf" points="385,156 393,152 393,160"/><polygon class="accf" points="374,145 370,137 378,137"/>
    <path class="dim" d="M380 150 L480 50"/><text x="490" y="44">τ</text><text x="500" y="110" class="m">complementary τ′ = τ</text>
  </svg>
  <figcaption>Figure 1 — Left: a bar in tension contracts laterally. Right: a block in pure shear; the complementary shear stresses are equal, and the diagonals carry σ = ±τ.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Volumetric strain and bulk modulus', html: String.raw`
<p>Rectangular bar under axial stress \(\sigma\): \(e_v = e(1 - 2\mu)\). Cube under equal stress \(\sigma\) on all faces:</p>
$$\frac{\delta V}{V} = \frac{3\sigma}{E}(1 - 2\mu)\quad\Rightarrow\quad K = \frac{E}{3(1 - 2\mu)},\qquad E = 3K(1 - 2\mu)$$` },
        { title: 'Complementary shear and E–G relation', html: String.raw`
<p>Moment equilibrium of an element shows that a shear stress \(\tau\) on one pair of faces is always accompanied by an equal <strong>complementary</strong> shear stress on the perpendicular faces. Pure shear produces tension \(\tau\) along one diagonal and compression \(\tau\) along the other, so the diagonal strain is \(\tau(1 + \mu)/E = \phi/2\), giving:</p>
$$E = 2G(1 + \mu),\qquad E = \frac{9KG}{3K + G}$$` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Problem 2.8 — bulk modulus', html: String.raw`
<div class="ex">
  <div class="ex-head">E = 1.2×10⁵ N/mm², μ = 1/4. Find K.</div>
  <div class="ex-body">
    <p>\(K = \dfrac{E}{3(1 - 2\mu)} = \dfrac{1.2×10^5}{3(1 - 0.5)}\)
    <span class="result">K = 0.8×10⁵ N/mm²</span></p>
  </div>
</div>` },
        { title: 'Problem 2.9 — E, μ and K from a test', html: String.raw`
<div class="ex">
  <div class="ex-head">Bar Ø30 mm, pull 60 kN, extension 0.1 mm on 200 mm gauge length, change in diameter 0.004 mm.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(A = 225\pi = 706.86\) mm²; \(\sigma = 60\,000/706.86 = 84.88\) N/mm².</li>
      <li>Longitudinal strain = 0.1/200 = 0.0005 → \(E = 84.88/0.0005 = 1.6975×10^5\) N/mm².</li>
      <li>Lateral strain = 0.004/30 = 0.000133 → \(\mu = 0.000133/0.0005 = 0.266\).</li>
      <li>\(K = \dfrac{1.6975×10^5}{3(1 - 2 × 0.266)} = 1.209×10^5\) N/mm².
        <span class="result">E = 1.70×10⁵, μ = 0.266, K = 1.21×10⁵ N/mm²</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Lateral strain is opposite in sign to longitudinal strain.</li>
  <li>\(\mu\) must lie between 0 and 0.5 (at 0.5 the material is incompressible).</li>
  <li>Any two constants give the others: \(E = 2G(1 + \mu) = 3K(1 - 2\mu)\).</li>
</ul>` }
      ]
    }
  ]
});
