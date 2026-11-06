/* Lesson 4 — Example 1: portal frame, grid, sections, material, load cases (guide pp. 10–16) */
KCE_COURSE.lessons.push({
  id: 'example-setup',
  num: 4,
  title: 'Example 1 — Portal Frame: Grid, Sections, Material and Load Cases',
  desc: 'A one-bay concrete portal frame with dead, live and wind loads: a 2D grid, the C20×30 column and B20×40 beam sections with reinforcement data, B20 concrete, and the DEAD, LIVE and WIND load cases.',
  icon: '🏗️',
  color: 'violet',
  meta: ['Example 1 · part 1', 'B20 concrete', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Problem', html: String.raw`
<p><strong>Example 1.</strong> Find the internal forces in the frame below. The distributed load <em>q</em> is a <strong>dead load</strong>, the point load P₁ is a <strong>live load</strong> and the point load P₂ is a <strong>wind load</strong>. The concrete is B20 (#250), with \(E = 2.7\times10^{7}\ \text{kN/m}^2\), \(\gamma = 25\ \text{kN/m}^3\) and \(\nu = 0.2\).</p>
${etabsShot('p10-1', 497, 'Figure 1 — Portal frame: span 6 m, height 3 m, q = 20 kN/m (dead), P₁ = 50 kN at mid-span (live), P₂ = 10 kN at the top-left joint (wind); left base fixed, right base pinned.')}
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Item</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>Span / height</td><td>6 m / 3 m</td></tr>
    <tr><td>Columns</td><td>C20×30: 0.20 m wide × 0.30 m deep</td></tr>
    <tr><td>Beam</td><td>B20×40: 0.20 m wide × 0.40 m deep</td></tr>
    <tr><td>Supports</td><td>A (left) fixed; B (right) pinned</td></tr>
    <tr><td>Loads</td><td>DEAD q = 20 kN/m · LIVE P₁ = 50 kN · WIND P₂ = 10 kN (+X)</td></tr>
  </tbody>
</table></div>` },
        { title: 'Description', html: String.raw`
<p>The frame is drawn on a grid with two lines in X (A at 0 m, B at 6 m), one line in Y and one 3 m story. The left plan or elevation window shows elevation 1, and the right window shows the 3D view.</p>
${etabsShot('p10-2', 624, 'Figure 2 — Elevation 1 (grid lines A and B, BASE and STORY1) and the 3D view.')}` }
      ]
    },
    {
      title: 'Step by step',
      subs: [
        { title: 'Grid data', html: String.raw`
<p>Start a new model with 2 lines in X, 1 line in Y and 1 story of 3 m. Then correct the ordinates in <em>Edit → Edit Grid Data</em>: X grid A at 0, B at 6, and Y grid 1 at 0.</p>
${etabsShot('p11-1', 690, 'Figure 3 — Define Grid Data: X grid A = 0, B = 6; Y grid 1 = 0.')}` },
        { title: 'Column section C20X30', html: String.raw`
<p>Open <em>Define → Frame Sections…</em></p>
${etabsShot('p11-2', 256, 'Figure 4 — Define → Frame Sections.')}
<ol>
  <li>Choose <strong>Add Rectangular</strong>, because the column is rectangular.</li>
  <li>Name the section <strong>C20X30</strong> (20 cm × 30 cm).</li>
  <li>Enter Depth t3 = <strong>0.3</strong> and Width t2 = <strong>0.2</strong>.</li>
  <li>Choose the material, here B20 (defined below). It could also be steel or another material.</li>
  <li>Under <em>Concrete → Reinforcement…</em> set the design type to <strong>Column</strong>.</li>
</ol>
${etabsShot('p12-1', 689, 'Figure 5 — Rectangular Section C20X30: depth 0.3, width 0.2, material B20, Reinforcement.')}
<p>Click OK. C20X30 now appears in the list of frame properties.</p>
${etabsShot('p12-2', 269, 'Figure 6 — C20X30 in Define Frame Properties.')}` },
        { title: 'Beam section B20X40', html: String.raw`
<p>Repeat the steps for the beam: Add Rectangular, name <strong>B20X40</strong>, depth 0.4, width 0.2, material B20. In <em>Reinforcement…</em>, set the design type to <strong>Beam</strong>, not Column, and the cover to the rebar centre to 0.04 m at both the top and the bottom.</p>
${etabsShot('p13-1', 689, 'Figure 7 — Rectangular Section B20X40 and Reinforcement Data (Design Type = Beam, cover 0.04 m).')}` },
        { title: 'Material B20', html: String.raw`
<p>Use <em>Define → Material Properties…</em> and then <strong>Add New Material…</strong>. You could use the default CONC instead, but here a new material named <strong>B20</strong> is added. In practice, define the material <em>before</em> the sections so that it already appears in their Material list.</p>
${etabsRow([['p13-2', 259], ['p13-3', 271]], 'Figure 8 — Define → Material Properties → Add New Material.')}
${etabsShot('p14-1', 613, 'Figure 9 — Material Property Data for B20 as entered in the guide (mass 0.25, weight 2.5, E = 2.1e+6).')}
<div class="warn"><p><strong>Check the units.</strong> The guide entered mass 0.25, weight 2.5 and E = 2.1 × 10⁶. Those are tf-m values (t·s²/m⁴, tf/m³, tf/m²), but the units box was set to kN-m. In kN-m the problem data are:</p>
<p>mass per unit volume = <strong>2.5</strong> (t/m³) · weight per unit volume = <strong>25</strong> kN/m³ · E = <strong>2.7e7</strong> kN/m² · ν = 0.2</p>
<p>The guide’s values make the self-weight 10 times too small. The internal forces don’t depend on E, but the deflections do. Lesson 6 shows how much each mistake changes the results.</p></div>
<p>Design codes differ from country to country in their concrete properties. Find out which standard the project requires before choosing the values.</p>` },
        { title: 'Load cases DEAD, LIVE, WIND', html: String.raw`
<p>Use <em>Define → Static Load Cases…</em>. DEAD and LIVE already exist. Type <strong>WIND</strong>, choose the type WIND, set the self-weight multiplier to 0 and the auto lateral load to None, then click <strong>Add New Load</strong>.</p>
${etabsRow([['p14-2', 255], ['p15-1', 587]], 'Figure 10 — Define → Static Load Cases: DEAD (multiplier 1), LIVE (0) and the new WIND (0).')}` },
        { title: 'Load combination', html: String.raw`
<p>Load combinations are under <em>Define → Load Combinations…</em>, or the toolbar button <em>Define Load Combinations</em>.</p>
${etabsRow([['p15-2', 253], ['p15-3', 187]], 'Figure 11 — The Define Load Combinations button and menu item.')}
<p>The guide adds <strong>COMB1</strong>, type ADD, with DEAD × 1. For a real design, add the code combinations, for example 1.2D + 1.6L and 1.2D + 1.0L + 1.0W (see Lesson 2).</p>
${etabsShot('p16-1', 690, 'Figure 12 — Load Combination Data: COMB1 = 1 × DEAD (ADD).')}` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Section properties used by ETABS', html: String.raw`
$$I_{beam} = \frac{0.2\times0.4^3}{12} = 1.067\times10^{-3}\ \text{m}^4,\qquad I_{col} = \frac{0.2\times0.3^3}{12} = 4.50\times10^{-4}\ \text{m}^4$$
<p>The beam is \(1.067/0.45 \times 3/6 = 1.19\) times as stiff (in EI/L) as each column. The frame is not symmetric, because the left base is fixed and the right base is pinned. So even the gravity loads make it sway slightly sideways, and the two beam-end moments are different.</p>
<p>The self-weight of the beam is \(\gamma b h = 25 \times 0.2 \times 0.4 = 2.0\) kN/m. With the guide’s weight of 2.5 it is only 0.2 kN/m.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Grid ordinates match the drawing (A = 0, B = 6 m; story 3 m).</li>
  <li>Material in kN-m units: mass 2.5, weight 25, E = 2.7e7.</li>
  <li>Columns use design type Column, and beams use Beam.</li>
  <li>DEAD has self-weight multiplier 1; LIVE and WIND have 0.</li>
</ul>` }
      ]
    }
  ]
});
