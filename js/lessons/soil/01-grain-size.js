/* Lesson 1 — Soil particle size (CCES Soil Mechanics §1) */
KCE_COURSE.lessons.push({
  id: 'grain-size',
  num: 1,
  title: 'Particle Size: Sieve and Hydrometer Analysis',
  desc: 'Origin of soils, coarse and fine soils, sieve analysis, percentage retained and passing, the grading curve, uniformity and curvature coefficients, and the hydrometer test.',
  icon: '🪨',
  color: 'peach',
  meta: ['§1', 'Grading curve', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Soil</strong> is the loose material formed by the weathering of rock (granite, sandstone, basalt …). Its behaviour depends first on the size of its grains. Soils are split into two families:</p>
<ul>
  <li><strong>Coarse-grained soils</strong> — gravel and sand — whose grains are measured by <em>sieving</em>.</li>
  <li><strong>Fine-grained (cohesive) soils</strong> — silt and clay — whose grains are too small for sieves and are measured by <em>sedimentation</em> with a hydrometer.</li>
</ul>` },
        { title: 'Description', html: String.raw`
<table class="tbl num">
  <thead><tr><th>Sieve opening (mm)</th><td>9.52</td><td>4.76</td><td>2.00</td><td>1.19</td><td>0.42</td><td>0.21</td><td>0.105</td><td>0.075</td></tr></thead>
</table>
<p>For each sieve: percentage retained \(\%R_i = \dfrac{W_i}{W}\times100\); cumulative retained \(\sum\%R\); percentage passing \(\%P = 100 - \sum\%R\). The grading curve plots \(\%P\) against grain size on a log scale.</p>
$$C_u = \frac{d_{60}}{d_{10}},\qquad C_c = \frac{d_{30}^2}{d_{10}\,d_{60}}$$
<p>\(d_{60}, d_{30}, d_{10}\) = grain sizes at 60, 30 and 10 % passing. A soil is <strong>well graded</strong> when \(C_u > 4\) (gravel) or \(> 6\) (sand) and \(1 \le C_c \le 3\); otherwise it is uniform (poorly graded).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Dry the sample (105 °C, 24 h), weigh it, wash it on the 0.075 mm sieve if it contains fines.</li>
  <li>Shake it through the sieve stack; weigh the soil retained on each sieve.</li>
  <li>Compute %R, cumulative %R and %P; plot the grading curve and read \(d_{10}, d_{30}, d_{60}\).</li>
  <li>For the part finer than 0.075 mm, run a hydrometer test and add its points to the same curve.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 260" role="img" aria-label="Grading curve">
    <path class="thin" d="M60 220 H520 M60 220 V30"/>
    <path class="dim" d="M60 182 H520 M60 144 H520 M60 106 H520 M60 68 H520"/>
    <path class="acc" d="M80 216 C 170 210, 220 190, 270 150 S 380 60, 500 40"/>
    <path class="dim" d="M60 201 H185 V220 M60 163 H245 V220 M60 106 H322 V220"/>
    <text x="24" y="205" class="m">10 %</text><text x="24" y="167" class="m">30 %</text><text x="24" y="110" class="m">60 %</text><text x="20" y="34" class="m">%P</text>
    <text x="170" y="238" class="m">d₁₀</text><text x="232" y="238" class="m">d₃₀</text><text x="310" y="238" class="m">d₆₀</text>
    <text x="400" y="238" class="m">grain size (log scale) →</text>
    <text x="360" y="150" class="a">Cᵤ = d₆₀/d₁₀</text>
  </svg>
  <figcaption>Figure 1 — Grading curve: the sizes at 10, 30 and 60 % passing give Cᵤ and C꜀.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Hydrometer analysis', html: String.raw`
<p>Fine grains settle in water at a speed given by <strong>Stokes’ law</strong>, so after a time \(t\) only grains smaller than \(D\) remain above depth \(L\):</p>
$$D = \sqrt{\frac{18\,\eta}{(\gamma_s - \gamma_w)}\cdot\frac{L}{t}} = K\sqrt{\frac{L}{t}}$$
<p>The hydrometer reading \(R\) (density of the suspension) gives the percentage still in suspension. Readings are corrected for the meniscus (+0.4 in the notes’ example: \(R' = 32 + 0.4\)), temperature, and the dispersing agent (\(R - X\), e.g. \(32 - 4 = 28\)); the effective depth \(L\) is read from a table as a function of \(R'\).</p>` },
        { title: 'What grading tells you', html: String.raw`
<ul>
  <li>A well-graded soil packs densely: small grains fill the voids between large ones — higher strength, lower permeability and compressibility.</li>
  <li>A uniform soil (one grain size) has more voids and is harder to compact.</li>
  <li>The fines content (% passing 0.075 mm) decides whether the soil is classed as coarse (&lt; 50 %) or fine (≥ 50 %).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Grading coefficients', html: String.raw`
<div class="ex">
  <div class="ex-head">From a grading curve: \(d_{10} = 0.15\) mm, \(d_{30} = 0.42\) mm, \(d_{60} = 1.20\) mm. Is the sand well graded?</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(C_u = 1.20/0.15 = 8.0 > 6\).</li>
      <li>\(C_c = 0.42^2/(0.15\times1.20) = 0.98\) — just below 1.
        <span class="result">Cᵤ = 8.0, C꜀ = 0.98 → poorly graded sand (SP), because C꜀ &lt; 1</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use the dry mass of the whole sample as \(W\) for every percentage.</li>
  <li>The sum of the masses retained plus the pan must equal the initial mass (within about 1 %).</li>
  <li>Both \(C_u\) and \(C_c\) must satisfy the limits for “well graded”.</li>
</ul>` }
      ]
    }
  ]
});
