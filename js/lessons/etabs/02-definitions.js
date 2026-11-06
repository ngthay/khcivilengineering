/* Lesson 2 — Materials, frame sections, load cases and combinations (guide pp. 4–5) */
KCE_COURSE.lessons.push({
  id: 'definitions',
  num: 2,
  title: 'Define — Materials, Frame Sections, Load Cases and Combinations',
  desc: 'The Define menu: material properties (mass, weight, E, ν and design strengths), rectangular frame sections, static load cases with the self-weight multiplier, and load combinations.',
  icon: '🧱',
  color: 'sky',
  meta: ['Guide §5–8', 'Define menu', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Before drawing, tell ETABS <strong>what</strong> the structure is made of and <strong>which loads</strong> act on it. Everything you define appears later in drop-down lists. Members are drawn with a section name, and loads are assigned to a load case by name.</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Definition</th><th>Menu</th><th>Icon</th><th>Used by</th></tr></thead>
  <tbody>
    <tr><td>Material</td><td>Define → Material Properties</td><td>${etabsIco('p04-2')}</td><td>Frame and wall/slab sections</td></tr>
    <tr><td>Frame section</td><td>Define → Frame Sections</td><td>${etabsIco('p04-4')}</td><td>Beams, columns, braces</td></tr>
    <tr><td>Load case</td><td>Define → Static Load Cases</td><td>${etabsIco('p05-1')}</td><td>Every assigned load</td></tr>
    <tr><td>Load combination</td><td>Define → Load Combinations</td><td>${etabsIco('p05-3')}</td><td>Design and result envelopes</td></tr>
  </tbody>
</table></div>` }
      ]
    },
    {
      title: 'Step by step',
      subs: [
        { title: 'Material properties', html: String.raw`
<p><em>Define → Material Properties</em> lists the materials CONC, OTHER and STEEL. Click <strong>Add New Material…</strong> (or <em>Modify/Show Material…</em>) to open the <strong>Material Property Data</strong> form:</p>
${etabsShot('p04-3', 659, 'Figure 1 — Define Materials → Add New Material opens Material Property Data.')}
<ul>
  <li><strong>Mass per unit Volume</strong> is used for the dynamic and seismic mass. <strong>Weight per unit Volume</strong> is used for self-weight in any load case with a self-weight multiplier.</li>
  <li><strong>Modulus of Elasticity E</strong>, <strong>Poisson’s ratio ν</strong> and the coefficient of thermal expansion are the analysis properties. The shear modulus \(G = E/2(1+\nu)\) is calculated for you.</li>
  <li><strong>Design Property Data</strong> gives \(f'_c\), \(f_y\) and \(f_{ys}\) for concrete design. ETABS 9.7 uses ACI 318-05/IBC 2003 by default.</li>
</ul>
<p>The default CONC material is US concrete converted to kN-m: mass 2.4007 t/m³, weight 23.5616 kN/m³ (150 pcf), E = 24 821 128 kN/m² (3600 ksi), ν = 0.2, \(f'_c\) = 27 579 kN/m² (4 ksi) and \(f_y\) = 413 685 kN/m² (60 ksi). Replace these values with the ones your design code requires.</p>` },
        { title: 'Frame sections', html: String.raw`
<p><em>Define → Frame Sections</em> lists the built-in sections (A-CompBm, A-GravCol …). From the second drop-down choose <strong>Add Rectangular</strong> (or Add Circle, Add I/Wide Flange …, or <em>Import I/Wide Flange</em> from a steel table). Then give the section a name, a material, its depth t3 and its width t2.</p>
${etabsShot('p04-5', 660, 'Figure 2 — Define Frame Properties → Add Rectangular → Rectangular Section.')}
<p>Depth <strong>t3</strong> is measured along the local 2-axis and resists bending about the local 3-axis (the strong axis). Width <strong>t2</strong> is the other dimension. For a concrete section, the <em>Reinforcement…</em> button sets the design type (Column or Beam) and the cover. Lesson 4 does this for the example.</p>` },
        { title: 'Static load cases', html: String.raw`
<p><em>Define → Static Load Cases</em> holds the load cases. Each one has a name, a type (DEAD, SUPER DEAD, LIVE, WIND, QUAKE …), a <strong>self-weight multiplier</strong> and, for lateral types, an auto lateral load (a code wind or seismic load).</p>
${etabsShot('p05-2', 587, 'Figure 3 — Define Static Load Case Names: DEAD (self-weight multiplier 1) and LIVE (0).')}
<ul>
  <li>Give the self-weight multiplier <strong>1</strong> to <em>one</em> case only, normally DEAD. A 1 in two cases counts the self-weight twice.</li>
  <li>To add a case, type its name, choose its type and click <strong>Add New Load</strong>. To change one, select it and click <strong>Modify Load</strong>.</li>
</ul>` },
        { title: 'Load combinations', html: String.raw`
<p><em>Define → Load Combinations → Add New Combo…</em> opens <strong>Load Combination Data</strong>. Name the combination, choose its type, then add each case with a scale factor.</p>
${etabsShot('p05-4', 660, 'Figure 4 — Define Load Combinations → Add New Combo → Load Combination Data.')}
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Type</th><th>Result</th></tr></thead>
  <tbody>
    <tr><td>ADD</td><td>Linear sum of the scaled cases (strength and service combinations).</td></tr>
    <tr><td>ENVE</td><td>Envelope: the maximum and minimum over the listed cases or combinations.</td></tr>
    <tr><td>ABS</td><td>Sum of the absolute values.</td></tr>
    <tr><td>SRSS</td><td>Square root of the sum of the squares (for example, two seismic directions).</td></tr>
  </tbody>
</table></div>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Typical combinations', html: String.raw`
<p>The scale factors come from the design code, not from ETABS. For example, ASCE 7 / ACI 318 strength combinations include</p>
$$1.4D,\qquad 1.2D + 1.6L,\qquad 1.2D + 1.0L + 1.0W,\qquad 0.9D + 1.0W$$
<p>Wind and seismic loads usually need to be checked acting in both + and − directions. You can do that by making separate combinations with factors of +1.0 and −1.0, then an <strong>ENVE</strong> combination of all of them for design.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Check the material values in the current units (weight ≈ 25 kN/m³ for concrete in kN-m).</li>
  <li>Name sections by size, for example C20X30 or B20X40, so they are easy to check.</li>
  <li>Use self-weight multiplier 1 in one load case only.</li>
  <li>Take the combination factors from the design code you are using.</li>
</ul>` }
      ]
    }
  ]
});
