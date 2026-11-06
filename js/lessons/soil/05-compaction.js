/* Lesson 5 — Compaction and CBR (CCES Soil Mechanics §5) */
KCE_COURSE.lessons.push({
  id: 'compaction',
  num: 5,
  title: 'Compaction, CBR and Field Control',
  desc: 'Standard and modified Proctor tests, optimum water content and maximum dry density, the California Bearing Ratio, compaction plant, specifications, and field checks with the sand cone and dynamic cone penetrometer.',
  icon: '🚜',
  color: 'amber',
  meta: ['§5', 'Proctor · CBR', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Compaction</strong> densifies soil by expelling air with mechanical energy. It raises strength and bearing capacity and reduces settlement and permeability — essential for roads, embankments, dams and fills. For a given energy the dry density is greatest at one water content, the <strong>optimum water content</strong> \(w_{opt}\): water lubricates the grains up to that point; beyond it, water takes the space of the grains.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl num">
  <thead><tr><th></th><th>Standard Proctor</th><th>Modified Proctor</th></tr></thead>
  <tbody>
    <tr><td>Use</td><td>Light roads, small fills</td><td>Airfields, heavy roads, dams</td></tr>
    <tr><td>Mould</td><td>101.6 mm × 943.2 cm³</td><td>101.6 mm (or 152.4 mm)</td></tr>
    <tr><td>Rammer</td><td>24.4 N falling 304.8 mm</td><td>44.5 N falling 457.2 mm</td></tr>
    <tr><td>Layers × blows</td><td>3 × 25</td><td>5 × 25</td></tr>
    <tr><td>Energy</td><td>591.3 kN·m/m³</td><td>2696 kN·m/m³</td></tr>
  </tbody>
</table>
$$\rho_d = \frac{\rho}{1 + w},\qquad \rho_{d,sat} = \frac{G_s\rho_w}{1 + wG_s}\ \text{(zero-air-voids line)}$$` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Prepare 4 – 6 samples at increasing water contents (e.g. 4, 6, 8, 10 %).</li>
  <li>Compact each in the mould with the specified layers and blows; weigh and find \(\rho\).</li>
  <li>Measure \(w\) of each (average of three specimens); compute \(\rho_d\).</li>
  <li>Plot \(\rho_d\) against \(w\): the peak of the parabola gives \(\rho_{d,max}\) and \(w_{opt}\). The curve stays below the zero-air-voids line.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 250" role="img" aria-label="Compaction curve">
    <path class="thin" d="M60 210 H490 M60 210 V20"/>
    <path class="acc" d="M100 170 Q 240 40, 400 140"/>
    <path class="ln" d="M200 40 Q 330 90, 470 160"/>
    <path class="dim" d="M60 90 H244 V210"/>
    <text x="10" y="94" class="m">ρ_d max</text><text x="226" y="228" class="m">w_opt</text>
    <text x="400" y="110" class="m">zero air voids (S = 1)</text>
    <text x="440" y="228" class="m">w (%)</text><text x="10" y="30" class="m">ρ_d</text>
    <text x="110" y="196" class="m">dry side</text><text x="330" y="196" class="m">wet side</text>
  </svg>
  <figcaption>Figure 1 — Proctor curve: the optimum lies below the saturation line.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'California Bearing Ratio (CBR)', html: String.raw`
<p>Developed by the California highway department: a 19.35 cm² piston is pushed into soil compacted at \(w_{opt}\) (modified Proctor) and soaked 4 days. The load at 2.54 mm and 5.08 mm is compared with that on a standard crushed stone:</p>
$$CBR_{2.5} = \frac{P_{2.54}}{70\ \text{kgf/cm}^2}\times100,\qquad CBR_{5} = \frac{P_{5.08}}{105\ \text{kgf/cm}^2}\times100$$
<p>Correct the curve origin if it starts concave. Use the larger value; if \(CBR_5 > CBR_{2.5}\) repeat the test, and if it is confirmed use \(CBR_5\). At least 3 tests are made; the spread allowed is 3 (CBR &lt; 10), 5 (10 – 30), 10 (30 – 60).</p>` },
        { title: 'Field compaction and control', html: String.raw`
<ul>
  <li><strong>Plant:</strong> smooth rollers, sheep-foot rollers, pneumatic rollers, vibratory rollers and plate compactors; layer thickness 0.10 – 0.50 m depending on the machine and soil.</li>
  <li><strong>Specifications</strong> (relative compaction to modified Proctor): natural ground 90 %, embankment 90 – 95 %, sub-base 95 %, base course 100 %.</li>
  <li><strong>Sand-cone test:</strong> dig a hole, weigh the soil removed, fill the hole with calibrated sand to find its volume → field \(\rho\) and \(\rho_d\).</li>
  <li><strong>Dynamic cone penetrometer (DCP):</strong> penetration per blow (mm/blow) correlated with CBR, e.g. TRRL: \(\log CBR = 2.48 - 1.057\log(\text{mm/blow})\).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Sand-cone density check', html: String.raw`
<div class="ex">
  <div class="ex-head">A sand-cone test removes 2.000 kg of moist soil (w = 10 %) from a hole whose volume, from the calibrated sand, is 1214.3 cm³. The laboratory gives \(\rho_{d,max} = 1.65\) g/cm³ (modified Proctor). Find the relative compaction.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\rho = 2000/1214.3 = 1.647\) g/cm³; \(\rho_d = 1.647/1.10 = 1.497\) g/cm³.</li>
      <li>Relative compaction \(= 1.497/1.65 = 90.7\,\%\).
        <span class="result">RC ≈ 91 % — enough for an embankment (90 %), not for a sub-base (95 %)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Compaction removes air, not water — the curve can never cross the zero-air-voids line.</li>
  <li>Compact slightly wet of optimum for clay cores (flexible, low permeability); near optimum for roads.</li>
  <li>Check every layer in the field before placing the next.</li>
</ul>` }
      ]
    }
  ]
});
