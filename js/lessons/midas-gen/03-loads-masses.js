/* Lesson 3 — Load cases, self-weight, floor loads, wind and masses */
KCE_COURSE.lessons.push({
  id: 'loads-masses',
  num: 3,
  title: 'Loads and Masses — Self-Weight, Floor Loads, Wind and Seismic Mass',
  desc: 'The eight static load cases, self-weight, floor load types and two-way distribution to the beams, copying floor loads up the building, ASCE 7-10 wind loads, and converting self-weight and loads to the masses used in the dynamic analysis.',
  icon: '⚖️',
  color: 'peach',
  meta: ['Floor loads · wind', 'Loads to masses', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
${midasSource}
<p>There are no slab elements in this model: the floors are represented by <strong>floor loads</strong> that midas Gen distributes to the surrounding beams, and by the rigid-diaphragm action that the storey data provides. The same loads, divided by g, give the <strong>masses</strong> for the eigenvalue and response spectrum analysis.</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Load case</th><th>Name</th><th>Type</th></tr></thead>
  <tbody>
    <tr><td>Dead load</td><td>DL</td><td>Dead</td></tr>
    <tr><td>Live load</td><td>LL</td><td>Live</td></tr>
    <tr><td>Wind in X / in Y</td><td>WX / WY</td><td>Wind on structure</td></tr>
    <tr><td>Earthquake X, eccentricity + / −</td><td>EXP / EXN</td><td>Earthquake</td></tr>
    <tr><td>Earthquake Y, eccentricity + / −</td><td>EYP / EYN</td><td>Earthquake</td></tr>
  </tbody>
</table></div>
${mImg('6728089', 'Figure 1 — The eight static load cases.')}
<p>Create them in <em>Load › Static Load › Create Load Cases › Static Load Cases</em>. The <strong>type</strong> matters: the automatic load combinations in Lesson 5 use it to decide the factors.</p>` }
      ]
    },
    {
      title: 'Design Procedure',
      subs: [
        { title: 'Self-weight', html: String.raw`
<p><em>Load › Static Loads › Structure Loads/Masses › Self Weight</em>: load case DL, factor Z = <strong>−1</strong> (gravity acts in −Z), ${mIco('6048281')}. The program multiplies the volume of every element by the unit weight of its material (150 pcf for normal-weight concrete).</p>
${mImg('8029081', 'Figure 2 — Self Weight in load case DL with factor Z = −1.')}` },
        { title: 'Floor loads', html: String.raw`
<ol>
  <li><strong>Define Floor Load Type</strong> (<em>Load › Initial Forces/Misc. › Assign Floor Loads</em>):
    <ul>
      <li>“Typical Floor”: DL = −30 psf, LL = −75 psf ${mIco('8036505')}</li>
      <li>“Roof Level”: DL = −10 psf, LL = −20 psf ${mIco('8036505')}, then ${mIco('6091673')} and ${mIco('6099737')}</li>
    </ul></li>
  <li><strong>Assign Floor Load</strong> for the typical floors: type Typical Floor, <strong>two-way</strong> distribution, <em>Copy Floor Load</em> on along the z-axis with distance <kbd>10@12</kbd>, and pick the four corner nodes of the floor (1, 8, 32, 25 on 2F). The load is applied to 2F and copied to the ten floors above (3F … 12F).</li>
  <li>For the roof: type Roof Level, Copy off, corner nodes 386, 387, 417, 410.</li>
</ol>
${mRow(['8081433', '8101529'], 'Figure 3 — Assign Floor Loads: two-way distribution, copied 10 @ 12 ft up the building.')}
${mImg('6136473', 'Figure 4 — Floor load distribution to the beams.')}
<p>With <strong>two-way distribution</strong> each 26 × 22 ft panel sends its load to the four edge beams by the 45° rule: trapezoids on the long (26 ft) beams and triangles on the short (22 ft) beams — the same rule as in hand design of two-way slabs.</p>
<div class="note">The negative signs mean “downward” in the global Z direction. The 30 psf dead load is a superimposed load (finishes, partitions, services); the self-weight of beams, columns and walls comes from the Self Weight case. In this tutorial the slab weight is not modelled separately — in a real project, add it (a 6-in slab weighs 75 psf).</div>` },
        { title: 'Wind loads', html: String.raw`
<p><em>Load › Static Loads › Lateral › Wind Loads</em>:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Input</th><th>WX</th><th>WY</th></tr></thead>
  <tbody>
    <tr><td>Code</td><td colspan="2">IBC 2012 (ASCE 7-10), alternate method on</td></tr>
    <tr><td>Basic wind speed</td><td colspan="2">85 mph, exposure B</td></tr>
    <tr><td>Scale factor X / Y</td><td>1 / 0</td><td>0 / 1</td></tr>
  </tbody>
</table></div>
<p>Enter WX and click ${mIco('8145689')}, change the name and the scale factors for WY and click ${mIco('8145689')} again, then ${mIco('6091673')} and ${mIco('6099737')}.</p>
${mRow(['6150809', '6169497'], 'Figure 5 — Wind load input (IBC 2012 / ASCE 7-10, 85 mph, exposure B) and the wind load profile.')}
<p>midas Gen uses the storey data to compute the pressure at each level and applies a storey force at the centre of the exposed width. Check the generated profile with the <em>Wind Load Profile</em> button.</p>
<div class="warn">ASCE 7-10 basic wind speeds are <strong>ultimate</strong> (strength-level) speeds, typically 110–150 mph, used with a load factor of 1.0. A speed of 85 mph is an allowable-stress-level value of the older standards. Use the speed from the ASCE 7-10 maps for the risk category of your building.</div>` },
        { title: 'Masses for the dynamic analysis', html: String.raw`
<ol>
  <li><em>Structure › Type › Structure Type</em>: 3-D, <strong>Convert Self-weight into Masses</strong> on, convert to X and Y, gravity 32.1719 ft/s².
    ${mImg('6181913', 'Figure 6 — Structure Type: convert the self-weight to masses in X and Y.')}</li>
  <li><em>Load › Static Loads › Structure Loads/Masses › Nodal Masses › Loads to Masses</em>: mass direction X, Y; load type All; load case DL × <strong>1.0</strong> ${mIco('6186009')} and LL × <strong>0.25</strong> ${mIco('6186009')}, then ${mIco('6091673')}.</li>
</ol>
${mImg('6193689', 'Figure 7 — Loads to Masses: DL × 1.0 and LL × 0.25.')}
<p>Masses are converted only in X and Y, so the vertical vibration modes do not appear and the first modes are the lateral and torsional ones that matter for earthquake design.</p>
<div class="note">ASCE 7-10 §12.7.2 requires 25 % of the floor live load in the seismic weight only for <strong>storage</strong> areas (plus partitions, permanent equipment and snow &gt; 30 psf). Including 25 % of all live load, as the tutorial does, is conservative for an office floor — but keep the same choice in the static seismic weight and the masses.</div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Loads on one panel', html: String.raw`
<div class="ex">
  <div class="ex-head">Find the superimposed loads that one 26 × 22 ft panel of a typical floor sends to its beams.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Panel area 26 × 22 = 572 ft². Dead: 30 × 572 = 17.2 kip; live: 75 × 572 = 42.9 kip.</li>
      <li>45° lines from the corners meet at 11 ft from each long side. A short (22 ft) beam carries a triangle of area ½ × 22 × 11 = 121 ft²; a long (26 ft) beam a trapezoid of (572 − 2 × 121)/2 = 165 ft².</li>
      <li>Short beam: dead 30 × 121 = 3.63 kip, peak intensity 30 × 11 = 330 lb/ft. Long beam: dead 30 × 165 = 4.95 kip, plateau 330 lb/ft.
        <span class="result">Check: 2 × 3.63 + 2 × 4.95 = 17.2 kip ✓ — the program does the same for every panel</span></li>
    </ol>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Every load case has the correct type (Dead, Live, Wind, Earthquake).</li>
  <li>Floor loads: sign, distribution type, copied to the right floors, roof separate.</li>
  <li>Wind: code, speed, exposure and direction factors; check the profile.</li>
  <li>Masses: self-weight converted once, DL × 1.0 + LL × chosen factor, X and Y only.</li>
</ul>` }
      ]
    }
  ]
});
