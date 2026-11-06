/* Lesson 1 — The project: building, structural systems, materials and workflow */
KCE_COURSE.lessons.push({
  id: 'project-data',
  num: 1,
  title: 'The Project — A 12-Storey RC Building with Frames and Shear Walls',
  desc: 'The example building, its lateral systems (special moment frame along X, dual wall–frame system along Y), materials and member sizes, the analysis methods (response spectrum and P-Delta), units, and the complete midas Gen workflow followed in this course.',
  icon: '🏢',
  color: 'rose',
  meta: ['Overview', 'ASCE 7-10 · ACI 318-11', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
${midasSource}
<p>This course designs a <strong>reinforced concrete building</strong> for gravity, wind and earthquake loads in <strong>midas Gen</strong>. The building is modelled in 3-D, analysed with a <strong>response spectrum</strong> analysis that includes <strong>P-Delta</strong> effects, and its beams, columns and walls are designed to ACI 318-11 with the special seismic provisions.</p>
<p>The example is a typical exam and office problem: a regular building in a high-seismic area, where the two directions use different lateral systems. Working through it teaches both the program and the code checks behind its results.</p>` },
        { title: 'Description', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Item</th><th>Data</th></tr></thead>
  <tbody>
    <tr><td>Storeys</td><td>12; first storey 16 ft, storeys above 12 ft; roof at h_n = 148 ft</td></tr>
    <tr><td>Plan</td><td>7 bays @ 26 ft = 182 ft (X) × 3 bays @ 22 ft = 66 ft (Y)</td></tr>
    <tr><td>Lateral system, X (longitudinal)</td><td>Special reinforced concrete moment frame</td></tr>
    <tr><td>Lateral system, Y (transverse)</td><td>Dual system: special RC structural walls with a special moment frame</td></tr>
    <tr><td>Seismicity</td><td>High (S_S = 1.0 g, S₁ = 0.3 g, site class C)</td></tr>
    <tr><td>Supports</td><td>Column bases fixed</td></tr>
  </tbody>
</table></div>` },
        { title: 'Methodology', html: String.raw`
<ul>
  <li><strong>Equivalent lateral force</strong> loads (ASCE 7-10 §12.8) are generated to obtain the static base shear, with accidental eccentricity in both senses.</li>
  <li><strong>Response spectrum analysis</strong> (§12.9) with the ASCE 7-10 design spectrum, combined by SRSS, scaled by I/R and then scaled up so that it is not less than 85 % of the static base shear.</li>
  <li><strong>P-Delta analysis</strong> with the gravity load D + 0.25L, so that second-order effects are included in all results.</li>
  <li><strong>Design</strong> to ACI 318-11 with the provisions for special moment frames and special structural walls.</li>
</ul>` },
        { title: 'Model', html: String.raw`
${mImg('3103769', 'Figure 1 — The reinforced concrete building model in midas Gen; the two shear walls are shown in blue.')}
<figure class="fig">
  <svg viewBox="0 0 540 250" role="img" aria-label="Typical floor plan: 7 bays of 26 ft by 3 bays of 22 ft with two shear walls">
    <g class="thin"><path d="M50 40V190"/><path d="M110 40V190"/><path d="M170 40V190"/><path d="M230 40V190"/><path d="M290 40V190"/><path d="M350 40V190"/><path d="M410 40V190"/><path d="M470 40V190"/><path d="M50 40H470"/><path d="M50 90H470"/><path d="M50 140H470"/><path d="M50 190H470"/></g>
    <path class="ln" d="M50 40H470 M50 90H470 M50 140H470 M50 190H470 M50 40V190 M110 40V190 M170 40V190 M230 40V190 M290 40V190 M350 40V190 M410 40V190 M470 40V190"/>
    <g class="conc"><rect x="46.0" y="36.0" width="8" height="8"/><rect x="46.0" y="86.0" width="8" height="8"/><rect x="46.0" y="136.0" width="8" height="8"/><rect x="46.0" y="186.0" width="8" height="8"/><rect x="106.0" y="36.0" width="8" height="8"/><rect x="105.0" y="85.0" width="10" height="10"/><rect x="105.0" y="135.0" width="10" height="10"/><rect x="106.0" y="186.0" width="8" height="8"/><rect x="166.0" y="36.0" width="8" height="8"/><rect x="165.0" y="85.0" width="10" height="10"/><rect x="165.0" y="135.0" width="10" height="10"/><rect x="166.0" y="186.0" width="8" height="8"/><rect x="226.0" y="36.0" width="8" height="8"/><rect x="225.0" y="85.0" width="10" height="10"/><rect x="225.0" y="135.0" width="10" height="10"/><rect x="226.0" y="186.0" width="8" height="8"/><rect x="286.0" y="36.0" width="8" height="8"/><rect x="285.0" y="85.0" width="10" height="10"/><rect x="285.0" y="135.0" width="10" height="10"/><rect x="286.0" y="186.0" width="8" height="8"/><rect x="346.0" y="36.0" width="8" height="8"/><rect x="345.0" y="85.0" width="10" height="10"/><rect x="345.0" y="135.0" width="10" height="10"/><rect x="346.0" y="186.0" width="8" height="8"/><rect x="406.0" y="36.0" width="8" height="8"/><rect x="405.0" y="85.0" width="10" height="10"/><rect x="405.0" y="135.0" width="10" height="10"/><rect x="406.0" y="186.0" width="8" height="8"/><rect x="466.0" y="36.0" width="8" height="8"/><rect x="466.0" y="86.0" width="8" height="8"/><rect x="466.0" y="136.0" width="8" height="8"/><rect x="466.0" y="186.0" width="8" height="8"/></g>
    <g class="accf"><rect x="106" y="90" width="8" height="50"/><rect x="406" y="90" width="8" height="50"/></g>
    <g class="m" text-anchor="middle"><text x="80.0" y="28">26′</text><text x="140.0" y="28">26′</text><text x="200.0" y="28">26′</text><text x="260.0" y="28">26′</text><text x="320.0" y="28">26′</text><text x="380.0" y="28">26′</text><text x="440.0" y="28">26′</text></g>
    <g class="m"><text x="12" y="69.0">22′</text><text x="12" y="119.0">22′</text><text x="12" y="169.0">22′</text></g>
    <text x="118" y="120" class="a">wall</text><text x="370" y="120" class="a">wall</text>
    <text x="50" y="218" class="m">X (longitudinal): 7 @ 26 ft = 182 ft — special moment frame</text>
    <text x="50" y="234" class="m">Y (transverse): 3 @ 22 ft = 66 ft — dual system (walls + moment frame)</text>
  </svg>
  <figcaption>Figure 2 — Typical floor plan. Edge columns 24 × 24 in, interior columns 30 × 30 in (larger squares), two 18-in walls (coloured) in the middle transverse bay.</figcaption>
</figure>
<figure class="fig">
  <svg viewBox="0 0 540 260" role="img" aria-label="Longitudinal section: 12 storeys, first storey 16 ft, others 12 ft">
    <path class="ln" d="M70 235V27.8 M122 235V27.8 M174 235V27.8 M226 235V27.8 M278 235V27.8 M330 235V27.8 M382 235V27.8 M434 235V27.8 M70 212.6H434 M70 195.8H434 M70 179.0H434 M70 162.2H434 M70 145.4H434 M70 128.6H434 M70 111.8H434 M70 95.0H434 M70 78.2H434 M70 61.4H434 M70 44.6H434 M70 27.8H434"/>
    <path class="soil" d="M56 235H448V245H56Z"/>
    <g class="m"><text x="444" y="239.0" font-size="10">1F</text><text x="444" y="216.6" font-size="10">2F</text><text x="444" y="199.8" font-size="10">3F</text><text x="444" y="183.0" font-size="10">4F</text><text x="444" y="166.2" font-size="10">5F</text><text x="444" y="149.4" font-size="10">6F</text><text x="444" y="132.6" font-size="10">7F</text><text x="444" y="115.8" font-size="10">8F</text><text x="444" y="99.0" font-size="10">9F</text><text x="444" y="82.2" font-size="10">10F</text><text x="444" y="65.4" font-size="10">11F</text><text x="444" y="48.6" font-size="10">12F</text><text x="444" y="31.8" font-size="10">Roof</text></g>
    <path class="dim" d="M48 235V212.6 M40 235H56 M40 212.6H56 M48 212.6V27.8 M40 27.8H56"/>
    <text x="4" y="227.8" class="m">16′</text>
    <text x="40" y="120.2" class="m" transform="rotate(-90 40 120.2)" text-anchor="middle">11 @ 12′ = 132′</text>
    <text x="70" y="259" class="m">hₙ = 16 + 11 × 12 = 148 ft · fixed column bases</text>
  </svg>
  <figcaption>Figure 3 — Longitudinal section.</figcaption>
</figure>
${mRow(['6637081', '6646937'], 'Figure 4 — The typical floor plan and the longitudinal section as drawn in the tutorial.')}` }
      ]
    },
    {
      title: 'Design Data',
      subs: [
        { title: 'Materials and sections', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Property</th><th>Value</th><th>midas Gen name</th></tr></thead>
  <tbody>
    <tr><td>Concrete</td><td>f′c = 4,000 psi</td><td>Material 1: Grade C4000</td></tr>
    <tr><td>Main reinforcement</td><td>f_y = 60,000 psi (ASTM Grade 60)</td><td>set in the design materials</td></tr>
    <tr><td>Ties / stirrups</td><td>ASTM Grade 40</td><td>sub-rebar grade</td></tr>
    <tr><td>Edge columns</td><td>24 × 24 in</td><td>Section 1: Edge column</td></tr>
    <tr><td>Interior columns</td><td>30 × 30 in</td><td>Section 2: Interior column</td></tr>
    <tr><td>Beams</td><td>20 × 24 in (b × h)</td><td>Section 3: Beam</td></tr>
    <tr><td>Walls</td><td>18 in = 1.5 ft thick, in-plane and out-of-plane stiffness</td><td>Thickness 1: 1.5 ft</td></tr>
  </tbody>
</table></div>
${mImg('6656153', 'Figure 5 — Material and section dialogs: Grade C4000 concrete and the three rectangular sections.')}
<p>Materials are defined in <em>Properties › Material</em> (choose the ASTM(RC) standard and grade C4000) and the sections in <em>Properties › Section</em> as solid rectangles. Number them exactly as above, because the later steps refer to the numbers.</p>` },
        { title: 'Loads', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Load</th><th>Value</th></tr></thead>
  <tbody>
    <tr><td>Self-weight</td><td>Generated by the program from the member sizes</td></tr>
    <tr><td>Typical floor</td><td>Superimposed dead 30 psf, live 75 psf</td></tr>
    <tr><td>Roof</td><td>Superimposed dead 10 psf, live 20 psf</td></tr>
    <tr><td>Wind</td><td>IBC 2012 / ASCE 7-10, basic wind speed 85 mph, exposure B, in X and Y</td></tr>
    <tr><td>Earthquake</td><td>ASCE 7-10: S_S = 1.0, S₁ = 0.3, site class C, I_e = 1.0, R = 8 in both directions</td></tr>
    <tr><td>Seismic mass</td><td>Self-weight + dead load + 25 % of the live load</td></tr>
  </tbody>
</table></div>` }
      ]
    },
    {
      title: 'Workflow',
      subs: [
        { title: 'Steps in midas Gen', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Step</th><th>Main menus</th><th>Lesson</th></tr></thead>
  <tbody>
    <tr><td>Materials and sections</td><td>Properties</td><td>1</td></tr>
    <tr><td>Grid, beams, columns, walls; copy the floors; storey data; supports</td><td>Structure, Node/Element, Boundary</td><td>2</td></tr>
    <tr><td>Load cases, self-weight, floor loads, wind, masses</td><td>Load, Structure › Type</td><td>3</td></tr>
    <tr><td>Static seismic loads, response spectrum, P-Delta and eigenvalue control, run</td><td>Load › Seismic, Analysis</td><td>4</td></tr>
    <tr><td>Combinations, spectrum scaling, design parameters, RC design and results</td><td>Results, Design</td><td>5</td></tr>
  </tbody>
</table></div>
<div class="note"><strong>Units.</strong> Set the length unit to <strong>ft</strong> (status bar at the bottom of the screen) before modelling, and use kip or lbf for force as you prefer. Inputs such as floor loads in psf can be typed after switching the unit; midas Gen converts everything internally.</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Know the lateral system and R factor in each direction before modelling.</li>
  <li>Define the materials and the three sections with the numbers used later.</li>
  <li>Set the length unit to ft.</li>
  <li>Keep the tutorial open beside this course for the dialog screenshots.</li>
</ul>` }
      ]
    }
  ]
});
