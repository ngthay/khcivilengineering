/* Lesson 7 — Stresses in a soil mass (CCES Soil Mechanics §7–8) */
KCE_COURSE.lessons.push({
  id: 'stresses',
  num: 7,
  title: 'Stresses in Soil: Geostatic and Applied Loads',
  desc: 'Overburden and effective stress, Boussinesq point load, circular and rectangular loaded areas with the corner method, the 2:1 approximation and embankment loading.',
  icon: '⬇️',
  color: 'blue',
  meta: ['§7–8', 'Boussinesq', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Two kinds of vertical stress act at a point in the ground: the <strong>geostatic stress</strong> from the weight of the soil above, and the <strong>stress increase</strong> \(\Delta\sigma_z\) from foundations and fills. The increase spreads out and decreases with depth; settlement and bearing-layer checks need both.</p>` },
        { title: 'Description', html: String.raw`
$$\sigma'_o = \sum\gamma_ih_i\quad(\gamma' = \gamma_{sat} - \gamma_w\ \text{below the water table}),\qquad \sigma = \sigma' + u$$
<table class="tbl">
  <tbody>
    <tr><th>Point load Q (Boussinesq)</th><td>\(\Delta\sigma_z = \dfrac{3Q}{2\pi z^2}\left[\dfrac{1}{1 + (r/z)^2}\right]^{5/2}\)</td></tr>
    <tr><th>Uniform circle, under the centre</th><td>\(\Delta\sigma_z = q(1 - \cos^3\alpha)\), \(\tan\alpha = R/z\)</td></tr>
    <tr><th>Rectangle, under a corner</th><td>\(\Delta\sigma_z = Kq\) (or \(I_2q\)), \(K = f(m = B/z,\ n = L/z)\)</td></tr>
    <tr><th>2:1 method</th><td>\(\Delta\sigma_z = \dfrac{Q}{(B + z)(L + z)}\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Compute \(\sigma'_o\) layer by layer down to the depth of interest.</li>
  <li>Choose the formula for the loaded area; for a rectangle, split it into rectangles that all have a corner at the point (<strong>corner method</strong>).</li>
  <li>Add the \(K\) values of the rectangles that contain the point and subtract those added in excess.</li>
  <li>Use \(\sigma'_o + \Delta\sigma_z\) in settlement calculations; stop where \(\Delta\sigma_z \approx 0.1\)–\(0.2\,\sigma'_o\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 240" role="img" aria-label="Corner method for a point outside the loaded area">
    <rect class="comp" x="110" y="40" width="200" height="120"/>
    <path class="dim" d="M310 40 H360 V200 H110 V160 M310 160 H360"/>
    <circle class="accf" cx="360" cy="200" r="5"/><text x="368" y="214">M</text>
    <text x="196" y="104" class="a">q = 100 kPa</text>
    <text x="120" y="190" class="m">III</text><text x="320" y="190" class="m">IV</text><text x="320" y="100" class="m">II</text><text x="120" y="60" class="m">I</text>
    <text x="110" y="234" class="m">σ_M = q(K_I + K_II − K_III − K_IV)</text>
  </svg>
  <figcaption>Figure 1 — Point M outside the footing: big rectangles minus the strips added in excess.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Rectangle factor and embankment', html: String.raw`
<p>Corner factor (Steinbrenner / Newmark):</p>
$$I_2 = \frac{1}{4\pi}\left[\frac{2mn\sqrt{m^2 + n^2 + 1}}{m^2 + n^2 + m^2n^2 + 1}\cdot\frac{m^2 + n^2 + 2}{m^2 + n^2 + 1} + \arctan\frac{2mn\sqrt{m^2 + n^2 + 1}}{m^2 + n^2 - m^2n^2 + 1}\right]$$
<p>Under the centre of a rectangle use four quarter-rectangles: \(\Delta\sigma = 4I_2q\).</p>
<p><strong>Embankment</strong> (load \(q_o = \gamma H\), slope width \(B_2\), half crest \(B_1\)):</p>
$$\Delta\sigma_z = \frac{q_o}{\pi}\left[\frac{B_1 + B_2}{B_2}(\alpha_1 + \alpha_2) - \frac{B_1}{B_2}\alpha_2\right],\quad \alpha_1 = \arctan\frac{B_1 + B_2}{z} - \arctan\frac{B_1}{z},\quad \alpha_2 = \arctan\frac{B_1}{z}$$` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Point outside a loaded rectangle', html: String.raw`
<div class="ex">
  <div class="ex-head">A footing carries q = 100 kPa. Point M lies at a depth z = 5 m, outside one corner of the footing, 0.5 m beyond each side (Figure 1). Find \(\Delta\sigma_z\) at M.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Draw four rectangles with a corner at M and read the table with \(b/a\) and \(z/2a\) (2a = width, 2b = length of each rectangle):
        I: 2b = 2.5, 2a = 0.5 → \(b/a = 5\), \(z/2a = 10\) → \(K_I = 0.020\); II: 2b = 2.5, 2a = 1.0 → 2.5, 5 → \(K_{II} = 0.039\).</li>
      <li>Rectangles counted in excess: III: 2b = 2a = 0.5 → 1, 10 → \(K_{III} = 0.005\); IV: 2b = 0.5, 2a = 1.0 → 0.5, 5 → \(K_{IV} = 0.009\).</li>
      <li>\(\Delta\sigma_z = 100(0.020 + 0.039 - 0.005 - 0.009) = 4.5\) kPa.
        <span class="result">Δσ_z = 4.5 kPa at M</span></li>
    </ol>
  </div>
</div>` },
        { title: '2:1 method', html: String.raw`
<div class="ex">
  <div class="ex-head">A 2 m × 2.5 m footing carries 500 kN. Estimate the vertical stress increase under it at 5 m depth.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\Delta\sigma_z = \dfrac{500}{(2 + 5)(2.5 + 5)} = 9.52\) kPa.
        <span class="result">Δσ_z ≈ 9.5 kPa (average over the spread area)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Below the water table use the submerged unit weight for \(\sigma'_o\).</li>
  <li>In the corner method every rectangle must have a corner at the point.</li>
  <li>The 2:1 method gives an average, not the peak under the centre.</li>
</ul>` }
      ]
    }
  ]
});
