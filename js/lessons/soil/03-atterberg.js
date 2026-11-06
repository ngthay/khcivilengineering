/* Lesson 3 — Atterberg limits (CCES Soil Mechanics §3) */
KCE_COURSE.lessons.push({
  id: 'atterberg',
  num: 3,
  title: 'Atterberg Limits and Consistency',
  desc: 'Shrinkage, plastic and liquid limits, the Casagrande cup test, plasticity index, liquidity index and consistency index of fine soils.',
  icon: '💧',
  color: 'sky',
  meta: ['§3', 'w_S, w_P, w_L', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A clay changes state as its water content changes — from solid to semi-solid, plastic and finally liquid. The Swedish scientist <strong>Atterberg</strong> defined the water contents at these boundaries. They are simple tests on disturbed soil but tell a lot about the compressibility and strength of fine soils.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Shrinkage limit \(w_S\)</th><td>Below it, drying no longer reduces the volume (solid / semi-solid).</td></tr>
    <tr><th>Plastic limit \(w_P\)</th><td>Lowest water content at which the soil is plastic (semi-solid / plastic).</td></tr>
    <tr><th>Liquid limit \(w_L\)</th><td>Water content at which the soil starts to flow (plastic / liquid).</td></tr>
  </tbody>
</table>
$$I_P = w_L - w_P,\qquad I_L = \frac{w - w_P}{I_P},\qquad I_C = \frac{w_L - w}{I_P}$$
<p>\(I_L < 0\) or \(I_C > 1\): hard soil; \(I_L > 1\) or \(I_C < 0\): liquid soil.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Dry and crush the soil, pass it through the 0.42 mm sieve, mix about 350 g with water and leave it 24 h.</li>
  <li><strong>Shrinkage limit:</strong> fill a dish of known volume, dry it slowly then at 105 °C; measure the dry volume by mercury displacement (ρ = 13.6 g/cm³).</li>
  <li><strong>Plastic limit:</strong> roll threads by hand until they crack at 3 mm diameter; measure their water content.</li>
  <li><strong>Liquid limit</strong> (ASTM D4318, Casagrande cup): spread a 12 mm layer in the cup, cut a groove, drop the cup 1 cm at 2 drops/s; count the blows N to close the groove over 12 mm. Repeat at three water contents and read \(w\) at N = 25 on the \(w\)–log N line.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 170" role="img" aria-label="States of consistency">
    <path class="ln" d="M40 90 H520"/><polygon class="accf" points="524,90 514,85 514,95"/>
    <path class="ln" d="M160 80 V100 M300 80 V100 M420 80 V100"/>
    <text x="80" y="70">Solid</text><text x="196" y="70">Semi-solid</text><text x="336" y="70">Plastic</text><text x="450" y="70">Liquid</text>
    <text x="150" y="120" class="a">w_S</text><text x="290" y="120" class="a">w_P</text><text x="410" y="120" class="a">w_L</text>
    <path class="dim" d="M300 140 H420"/><text x="330" y="160" class="m">I_P = w_L − w_P</text>
    <text x="480" y="120" class="m">water content →</text>
  </svg>
  <figcaption>Figure 1 — Atterberg limits on the water-content axis.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Using the limits', html: String.raw`
<ul>
  <li>\(I_P\) measures the range of plastic behaviour — high \(I_P\) means more clay minerals, higher compressibility and swelling.</li>
  <li>\(w_L\) and \(I_P\) place the soil on the <strong>Casagrande plasticity chart</strong> (A-line \(I_P = 0.73(w_L - 20)\)) used in classification (Lesson 4).</li>
  <li>\(w_L\) also gives a first estimate of the compression index, e.g. \(C_c = 0.009(w_L - 10)\) (Skempton) — see Lesson 8.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Consistency of a clay', html: String.raw`
<div class="ex">
  <div class="ex-head">A clay has \(w_L = 48\,\%\), \(w_P = 22\,\%\) and natural water content \(w = 30\,\%\). Find \(I_P\), \(I_L\) and \(I_C\) and describe its state.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(I_P = 48 - 22 = 26\,\%\).</li>
      <li>\(I_L = (30 - 22)/26 = 0.31\); \(I_C = (48 - 30)/26 = 0.69\).
        <span class="result">I_P = 26 %, I_L = 0.31, I_C = 0.69 → plastic, stiff consistency</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use only the soil passing the 0.42 mm sieve.</li>
  <li>Take at least three Casagrande points bracketing 25 blows.</li>
  <li>Check \(I_L + I_C = 1\).</li>
</ul>` }
      ]
    }
  ]
});
