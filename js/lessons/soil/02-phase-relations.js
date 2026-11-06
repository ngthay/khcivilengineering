/* Lesson 2 — Soil composition and index properties (CCES Soil Mechanics §2) */
KCE_COURSE.lessons.push({
  id: 'phase-relations',
  num: 2,
  title: 'Phase Relations and Index Properties',
  desc: 'The three phases of soil, void ratio, porosity, degree of saturation, water content, densities and unit weights, specific gravity, relative density, and undisturbed and disturbed samples.',
  icon: '🧪',
  color: 'mint',
  meta: ['§2', 'e, n, S, w, γ', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A unit volume of natural soil contains three phases: <strong>solid grains</strong>, <strong>water</strong> and <strong>air</strong>. Separating them in a <em>phase diagram</em> gives simple ratios that describe how loose, wet and heavy the soil is — the starting data for every geotechnical calculation.</p>` },
        { title: 'Description', html: String.raw`
<p>Volumes \(V = V_a + V_w + V_s\), \(V_v = V_a + V_w\); weights \(W = W_w + W_s\) (air weighs nothing).</p>
<table class="tbl">
  <tbody>
    <tr><th>Void ratio</th><td>\(e = V_v/V_s\)</td><th>Porosity</th><td>\(n = V_v/V = e/(1 + e)\)</td></tr>
    <tr><th>Degree of saturation</th><td>\(S = V_w/V_v\) (0 – 100 %)</td><th>Water content</th><td>\(w = W_w/W_s\)</td></tr>
    <tr><th>Bulk density</th><td>\(\rho = W/V\); \(\gamma = \rho g\)</td><th>Dry density</th><td>\(\rho_d = W_s/V = \rho/(1 + w)\)</td></tr>
    <tr><th>Specific gravity</th><td>\(G_s = \rho_s/\rho_w\) (≈ 2.65 – 2.75)</td><th>Relative density</th><td>\(D_r = \dfrac{e_{max} - e}{e_{max} - e_{min}}\)</td></tr>
  </tbody>
</table>
<p>Key relation: \(Se = wG_s\). Also \(\rho_d = \dfrac{G_s\rho_w}{1 + e}\), \(\rho_{sat} = \dfrac{(G_s + e)\rho_w}{1 + e}\), submerged \(\gamma' = \gamma_{sat} - \gamma_w\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Water content:</strong> weigh can \(m_0\), can + wet soil \(m_1\), dry at 105 °C for 24 h, weigh \(m_2\): \(w = \dfrac{m_1 - m_2}{m_2 - m_0}\).</li>
  <li><strong>Bulk density:</strong> push a ring of known volume into an undisturbed sample and weigh it.</li>
  <li><strong>Specific gravity:</strong> pycnometer — weigh it empty, with dry soil, with soil + water (de-aired by boiling), and with water only.</li>
  <li>Derive \(e, n, S, \rho_d\) from the phase relations.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 240" role="img" aria-label="Phase diagram">
    <rect class="thin" x="200" y="20" width="120" height="50"/><rect class="comp" x="200" y="70" width="120" height="60"/><rect class="conc" x="200" y="130" width="120" height="90"/>
    <text x="244" y="50">Air</text><text x="238" y="104">Water</text><text x="236" y="180">Solids</text>
    <path class="dim" d="M180 20 V130 M180 130 V220 M160 20 V220"/>
    <text x="140" y="80" class="m">V_v</text><text x="140" y="180" class="m">V_s</text><text x="120" y="130" class="m">V</text>
    <path class="dim" d="M340 70 V130 M340 130 V220 M360 70 V220"/>
    <text x="346" y="104" class="m">W_w</text><text x="346" y="180" class="m">W_s</text><text x="368" y="150" class="m">W</text>
    <text x="400" y="60" class="a">Se = wGₛ</text>
  </svg>
  <figcaption>Figure 1 — Phase diagram: volumes on the left, weights on the right.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Samples and relative density', html: String.raw`
<ul>
  <li><strong>Undisturbed samples</strong> keep the natural structure and water content (thin-wall or split-spoon tubes); used for strength and consolidation tests. A sample counts as undisturbed when the <strong>area ratio</strong> \(A_R = \dfrac{D_o^2 - D_i^2}{D_i^2}\times100 < 10\,\%\).</li>
  <li><strong>Disturbed samples</strong> lose the structure; used for grading, limits, specific gravity and compaction.</li>
  <li><strong>Relative density</strong> of sand: \(e_{max}\) from the loosest pouring, \(e_{min}\) from the densest packing. \(D_r\) near 0 = very loose, near 1 = very dense.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Saturated soil', html: String.raw`
<div class="ex">
  <div class="ex-head">A saturated soil has a water content of 25 % and \(G_s = 2.70\). Find its void ratio, dry density and saturated density.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Saturated → \(S = 1\): \(e = wG_s = 0.25 \times 2.70 = 0.675\).</li>
      <li>\(\rho_d = \dfrac{G_s\rho_w}{1 + e} = \dfrac{2.70}{1.675} = 1.612\) g/cm³.</li>
      <li>\(\rho_{sat} = \dfrac{(G_s + e)\rho_w}{1 + e} = \dfrac{3.375}{1.675} = 2.015\) g/cm³ <em>(the notes print 2.025)</em>.
        <span class="result">e = 0.675, ρ_d = 1.612 g/cm³, ρ_sat = 2.015 g/cm³</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Borrow volume for an embankment', html: String.raw`
<div class="ex">
  <div class="ex-head">A road embankment needs 1000 m³ of compacted soil with a dry density of 2.00 t/m³. The borrow soil has a bulk density of 2.00 t/m³ and a water content of 12 %. What volume must be excavated?</div>
  <div class="ex-body">
    <ol class="steps">
      <li>The dry mass is the same before and after compaction: \(W_s = 2.00 \times 1000 = 2000\) t.</li>
      <li>Borrow dry density \(\rho_d = \dfrac{2.00}{1 + 0.12} = 1.786\) t/m³.</li>
      <li>\(V = 2000/1.786 = 1120\) m³.
        <span class="result">About 1120 m³ of borrow soil is needed</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Water content is referred to the <em>dry</em> weight, not the total weight.</li>
  <li>For saturated soils use \(S = 1\) and \(e = wG_s\).</li>
  <li>Earthworks: balance the <em>dry</em> mass between borrow pit and fill.</li>
</ul>` }
      ]
    }
  ]
});
