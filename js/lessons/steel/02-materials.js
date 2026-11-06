/* Lesson 2 — Material and design requirements (Handbook Ch. 2) */
KCE_COURSE.lessons.push({
  id: 'materials',
  num: 2,
  title: 'Steel Material, Grades and Properties',
  desc: 'Steel products, the stress–strain curve, physical properties, steel types and grades, yield and tensile strengths by thickness, and brittle fracture.',
  icon: '🔩',
  color: 'mint',
  meta: ['Ch. 2', 'f_y · f_u · E', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Structural steel is strong, stiff and <strong>ductile</strong>: after yielding it stretches a lot before breaking, which lets members redistribute load and gives warning of failure. Design uses the yield stress \(f_y\) and tensile strength \(f_u\) of the grade, which fall slightly for thicker plates.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl num">
  <tbody>
    <tr><th>Elastic modulus E</th><td>200 000 MPa</td><th>Shear modulus G</th><td>80 000 MPa</td></tr>
    <tr><th>Poisson’s ratio ν</th><td>0.3</td><th>Thermal expansion α</th><td>11.7 × 10⁻⁶ /°C</td></tr>
    <tr><th>Density</th><td>7850 kg/m³</td><th>Elongation at fracture</th><td>≈ 20 – 30 %</td></tr>
  </tbody>
</table>
<table class="tbl num">
  <thead><tr><th>Product / grade</th><th>Thickness (mm)</th><th>f_y (MPa)</th><th>f_u (MPa)</th></tr></thead>
  <tbody>
    <tr><td>Hot-rolled UB, UC, PFC — Grade 300</td><td>≤ 11 / 11–17 / &gt; 17</td><td>320 / 300 / 280</td><td>440</td></tr>
    <tr><td>Plate — Grade 250</td><td>≤ 8 / 8–12 / 12–50</td><td>280 / 260 / 250</td><td>410</td></tr>
    <tr><td>Hot-rolled sections — Grade 350</td><td>≤ 11 / 12–40 / ≥ 40</td><td>360 / 340 / 330</td><td>480</td></tr>
    <tr><td>Plate — Grade 300 (welded sections)</td><td>≤ 8 / 9–12 / 13–20 / 21–150</td><td>320 / 310 / 300 / 280</td><td>430</td></tr>
    <tr><td>Plate — Grade 400</td><td>≤ 12 / 13–20 / 21–80</td><td>400 / 380 / 360</td><td>480</td></tr>
    <tr><td>Hollow sections C350L0 / C450L0</td><td>all</td><td>350 / 450</td><td>430 / 500</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose the product (hot-rolled, welded, cold-formed hollow section, plate) and grade.</li>
  <li>Read \(f_y\) and \(f_u\) for the thickness of each element (flange and web may differ: \(f_{yf}\), \(f_{yw}\)).</li>
  <li>Check brittle fracture: select a steel with an impact grade (L0, L15 …) suited to the lowest service temperature and the thickness.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 230" role="img" aria-label="Stress–strain curve of mild steel">
    <path class="thin" d="M50 200 H500 M50 200 V20"/>
    <path class="acc" d="M50 200 L80 80 L84 84 L170 84 Q 300 30, 420 40 L 460 70"/>
    <path class="dim" d="M50 84 H170 M50 40 H420"/>
    <text x="14" y="88" class="m">f_y</text><text x="14" y="44" class="m">f_u</text>
    <text x="60" y="140" class="m">E</text><text x="100" y="100" class="m">yield plateau</text><text x="250" y="60" class="m">strain hardening</text><text x="440" y="90" class="m">fracture</text>
    <text x="470" y="218" class="m">ε</text><text x="34" y="26" class="m">σ</text>
  </svg>
  <figcaption>Figure 1 — Stress–strain curve of structural steel: elastic, yield plateau, strain hardening.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Brittle fracture', html: String.raw`
<p>At low temperature, with thick plates, notches and high tensile stress, steel can break suddenly without yielding. AS 4100 (Section 10) relates the lowest one-day mean ambient temperature (+ corrections for thickness and fabrication) to the permissible service temperature of each steel type; impact-tested grades (e.g. L0 = Charpy tested at 0 °C) extend the range.</p>
<p>Other material topics: weldability (carbon-equivalent), corrosion resistance (weathering steel), and fire (strength falls above ~ 300 °C — Lesson 13).</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Yield stress for a UB', html: String.raw`
<div class="ex">
  <div class="ex-head">A 410UB53.7 Grade 300 has a 10.9 mm flange and a 7.6 mm web. Find \(f_{yf}\) and \(f_{yw}\).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Both thicknesses ≤ 11 mm → \(f_y = 320\) MPa.
        <span class="result">f_yf = f_yw = 320 MPa, f_u = 440 MPa</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use the thickness of the element you are checking to get \(f_y\).</li>
  <li>Specify an impact-tested grade for cold climates or thick welded plates.</li>
  <li>E is the same for all grades — higher grades do not reduce deflection.</li>
</ul>` }
      ]
    }
  ]
});
