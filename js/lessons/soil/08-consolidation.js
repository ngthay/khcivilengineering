/* Lesson 8 — Consolidation (CCES Soil Mechanics §9) */
KCE_COURSE.lessons.push({
  id: 'consolidation',
  num: 8,
  title: 'Consolidation and the Oedometer Test',
  desc: 'Immediate, primary and secondary settlement, the oedometer test, e–log σ′ curve, compression and swell indices, preconsolidation pressure, OCR, modulus, and the coefficient of consolidation by Casagrande’s method.',
  icon: '📉',
  color: 'violet',
  meta: ['§9', 'Cc · Cs · Cv', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>When a saturated clay is loaded, the water in its pores carries the load first. As the water slowly drains, the load passes to the grains and the soil compresses — this time-dependent settlement is <strong>consolidation</strong>. Building on soft clay without studying it can lead to large, uneven settlement and damage years later.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Immediate settlement</th><td>Elastic, at loading; dominant in sand (high permeability).</td></tr>
    <tr><th>Primary consolidation</th><td>Drainage of pore water; dominant in clay, may last years.</td></tr>
    <tr><th>Secondary compression</th><td>Creep of the soil skeleton; large in organic soils (10 – 30 years).</td></tr>
  </tbody>
</table>
$$C_c = \frac{-\Delta e}{\Delta\log\sigma'}\ \text{(virgin branch)},\qquad C_s = \frac{-\Delta e}{\Delta\log\sigma'}\ \text{(unloading)},\qquad OCR = \frac{\sigma'_p}{\sigma'_o}$$` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Trim an undisturbed sample into the oedometer ring (e.g. 20 cm² × 15 mm, or 45 cm² × 19 mm), between porous stones, flooded with water.</li>
  <li>Apply loads in steps (e.g. 0.5, 1, 2, 4, 8 kgf/cm²), each for 24 h, reading the dial at 6″, 15″, 30″, 1′, 2′, 4′ … 24 h; then unload in steps.</li>
  <li>From \(e_o = (h_o - H_s)/H_s\) and each final height compute \(e\); plot \(e\) against \(\log\sigma'\).</li>
  <li>Read \(C_c\), \(C_s\) and the preconsolidation pressure \(\sigma'_p\) (Casagrande construction).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 240" role="img" aria-label="e–log σ′ curve">
    <path class="thin" d="M60 210 H490 M60 210 V20"/>
    <path class="acc" d="M80 50 Q 200 60, 240 90 L 460 190"/>
    <path class="ln" d="M460 190 Q 380 170, 300 150"/>
    <path class="dim" d="M240 90 V210"/><text x="222" y="228" class="m">σ′_p</text>
    <text x="330" y="120" class="a">C꜀ (slope)</text><text x="250" y="186" class="m">C_s (unloading)</text>
    <text x="430" y="228" class="m">log σ′</text><text x="40" y="30" class="m">e</text>
  </svg>
  <figcaption>Figure 1 — Oedometer curve: recompression, virgin compression (C꜀) and swelling (C_s).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Consolidation settlement', html: String.raw`
<ul>
  <li><strong>Normally consolidated</strong> (\(\sigma'_p = \sigma'_o\)): \(S = \dfrac{C_cH}{1 + e_o}\log\dfrac{\sigma'_o + \Delta\sigma}{\sigma'_o}\).</li>
  <li><strong>Overconsolidated</strong>, \(\sigma'_o + \Delta\sigma \le \sigma'_p\): \(S = \dfrac{C_sH}{1 + e_o}\log\dfrac{\sigma'_o + \Delta\sigma}{\sigma'_o}\).</li>
  <li><strong>Overconsolidated</strong>, \(\sigma'_o + \Delta\sigma > \sigma'_p\): \(S = \dfrac{C_sH}{1 + e_o}\log\dfrac{\sigma'_p}{\sigma'_o} + \dfrac{C_cH}{1 + e_o}\log\dfrac{\sigma'_o + \Delta\sigma}{\sigma'_p}\).</li>
</ul>
<p>Without a test, \(C_c \approx 0.2343\,(w_L/100)\,G_s\) and \(C_s \approx 0.0463\,(w_L/100)\,G_s\) (Nagaraj & Murthy 1985). Oedometer modulus \(E = \beta\dfrac{1 + e_o}{-\Delta e}\Delta\sigma\) with \(\beta\) = 0.74 (sand), 0.62 (silt), 0.40 (clay).</p>` },
        { title: 'Time rate — Casagrande’s log-time method', html: String.raw`
<p>Plot dial reading against log time. Extend the straight parts of the primary and secondary branches: their intersection gives \(\delta_{100}\). Find \(\delta_0\) from two times \(t_1\) and \(4t_1\) in the early parabolic part. Then \(\delta_{50} = (\delta_0 + \delta_{100})/2\) gives \(t_{50}\), and</p>
$$C_v = \frac{0.197\,H^2}{t_{50}},\qquad H = \tfrac12\left(h_o - \delta_{50}\right)\ \text{(double drainage)}$$` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Settlement of a normally consolidated clay', html: String.raw`
<div class="ex">
  <div class="ex-head">A 4 m thick normally consolidated clay layer has \(e_o = 0.90\), \(C_c = 0.30\); at its mid-depth \(\sigma'_o = 60\) kPa and a footing adds \(\Delta\sigma = 40\) kPa. Find the primary consolidation settlement.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>$$S = \frac{0.30 \times 4}{1 + 0.90}\log\frac{60 + 40}{60} = 0.632 \times 0.222 = 0.140\ \text{m}$$
        <span class="result">S ≈ 140 mm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Find \(\sigma'_p\) first — overconsolidated clays settle much less.</li>
  <li>Split thick layers into sub-layers and sum their settlements.</li>
  <li>For drainage on both faces use half the layer thickness as the drainage path.</li>
</ul>` }
      ]
    }
  ]
});
