/* Lesson 2 — Building the model: grid, beams, columns, walls, floors, storeys, supports */
KCE_COURSE.lessons.push({
  id: 'modelling',
  num: 2,
  title: 'Building the Model — Grid, Beams, Columns, Walls and Storeys',
  desc: 'Setting the UCS at the second-floor level, line grids, drawing the beams of one floor, extruding columns downward, assigning interior column sections by drag and drop, wall elements, Building Generation of the upper floors, storey data and fixed supports.',
  icon: '🧱',
  color: 'blue',
  meta: ['Structure · Node/Element', 'Building Generation', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
${midasSource}
<p>The model is built from one typical floor. The beams of the second floor are drawn on a grid, the first-storey columns are extruded down to the base, the walls are added, and then the whole storey is copied eleven times upward with <strong>Building Generation</strong>. Finally the program creates the <strong>storey data</strong> (needed for seismic loads and drift tables) and the bases are fixed.</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Element</th><th>Element type in midas Gen</th></tr></thead>
  <tbody>
    <tr><td>Beams, columns</td><td>Beam (general beam with 6 DOF per node)</td></tr>
    <tr><td>Shear walls</td><td>Wall — membrane type (in-plane and out-of-plane stiffness), one element per storey and wall ID</td></tr>
  </tbody>
</table></div>` }
      ]
    },
    {
      title: 'Design Procedure',
      subs: [
        { title: 'Grid and the second-floor beams', html: String.raw`
<ol>
  <li>Units: length = <strong>ft</strong>.</li>
  <li>${mIco('6661785')} <strong>Set UCS to X-Y Plane</strong> with origin (0, 0, 16) and <em>Change View Direction</em> on ${mIco('3165081')}. The working plane is now the second floor, 16 ft above the base.</li>
  <li>${mIco('3169689')} <strong>Set Line Grid</strong> ${mIco('3174041')}: grid name “2F”.
    <ul>
      <li>X-grid lines ${mIco('3174041')}: <em>Relative</em> on, <kbd>7@26</kbd> ${mIco('3165081')}</li>
      <li>Y-grid lines ${mIco('3174041')}: <em>Relative</em> on, <kbd>3@22</kbd> ${mIco('3165081')}</li>
      <li>Add/Modify Grid Lines ${mIco('3165081')}, Define Grids ${mIco('3165081')}</li>
    </ul></li>
  <li>Turn on ${mIco('6685209')} <strong>Line Grid</strong> and ${mIco('6692249')} <strong>Line Grid Snap</strong>.</li>
</ol>
${mImg('3202457', 'Figure 1 — Creating the line grid: 7 @ 26 ft in X and 3 @ 22 ft in Y.')}
${mImg('3206297', 'Figure 2 — The grid lines in the X-Y plane at the second-floor level.')}
<h4>Floor beams</h4>
<ol>
  <li>Toggle on ${mIco('3210393')} Hidden, ${mIco('3216153')} Node Number and ${mIco('3224601')} Element Number.</li>
  <li>${mIco('6725401')} <strong>Create Elements</strong>: element type General Beam / Tapered Beam, material 1, section <strong>3: Beam</strong>. Click from grid point to grid point along all four X lines and all eight Y lines — every grid segment becomes a beam.</li>
</ol>
${mImg('3236761', 'Figure 3 — The beams of the second floor, with node and element numbers.')}
<div class="note">The input <kbd>7@26</kbd> means “7 spaces of 26 ft”. The same shorthand works for nodes, copies and load distances (<kbd>10@12</kbd> in Lesson 3).</div>` },
        { title: 'Columns by extrusion', html: String.raw`
<ol>
  <li>${mIco('6737689')} Change to GCS, ${mIco('3258905')} <strong>Select All</strong>.</li>
  <li>${mIco('3263385')} <strong>Extrude Element</strong>: Node → Line Element, <strong>Reverse I-J</strong> on, element type Beam, material 1: Grade C4000, section <strong>1: Edge column</strong>, dx, dy, dz = <strong>0, 0, −16</strong>, then ${mIco('6764441')}.</li>
</ol>
${mImg('6771865', 'Figure 4 — Extruding the floor nodes downward by 16 ft to create the first-storey columns.')}
<p>Each floor node now has a column down to the base. <em>Reverse I-J</em> makes node i the lower end, so the column’s local x-axis points upward — the usual convention, which keeps the sign of member forces and the design output consistent.</p>
<h4>Interior columns</h4>
<ol>
  <li>In the <em>Works</em> tree, make <em>Properties › Section › 1: Edge column</em> active, and turn on ${mIco('3590425')} <em>Display › Property › Property Name</em> ${mIco('6778137')}.</li>
  <li>In the top view, ${mIco('3596185')} select the 12 interior columns with a window.</li>
  <li>Drag <em>Works › Properties › Section › 2: Interior column</em> from the tree and drop it on the model. Dropping a property on selected elements assigns it to them — a fast way to change many members.</li>
</ol>
${mRow(['3608601', '3618969'], 'Figure 5 — Left: the columns with the beams made inactive. Right: dragging section 2 onto the selected interior columns.')}` },
        { title: 'Walls', html: String.raw`
<ol>
  <li>${mIco('6419097')} Hidden off, ${mIco('6444441')} Node Number on, ${mIco('3652249')} <em>Display › Property › Property Name</em> off.</li>
  <li>${mIco('3658393')} Select the frame of the first wall bay with a window and press ${mIco('3662873')} <strong>Active</strong>, so only that part of the model is shown.</li>
  <li>${mIco('6467865')} <strong>Create Elements</strong>, type <strong>Wall</strong>, <strong>Membrane</strong> on, Wall ID auto-increment from 1, material 1: Grade C4000, thickness 1: 1.5 ft, <em>Intersect Node</em> on.</li>
  <li>Nodal connectivity <strong>50, 42, 10, 18</strong> — the four corners of the wall panel between the two interior columns of the second grid line, from the base to the second floor.</li>
  <li>Select wall element 1 and <strong>Translate Element › Copy</strong> with equal distance dx, dy, dz = <strong>130, 0, 0</strong> (five bays of 26 ft) ${mIco('3719833')}, Wall ID increment 1 ${mIco('3731993')} — the second wall, on the seventh grid line.</li>
</ol>
${mImg('6549017', 'Figure 6 — Selecting the bay where the first wall is placed.')}
${mImg('6571161', 'Figure 7 — Nodal connectivity of the wall element: nodes 50, 42, 10 and 18.')}
${mImg('3788185', 'Figure 8 — The wall copied 130 ft along X to create the second wall.')}
<div class="warn">Wall elements in midas Gen are grouped by <strong>Wall ID</strong>: elements with the same ID on different storeys form one wall for the design of wall forces. Give each physical wall its own ID.</div>` },
        { title: 'Building Generation and storey data', html: String.raw`
<ol>
  <li>${mIco('3258905')} <strong>Select All</strong>, then <em>Structure › Building › Control Data › Building Generation</em>: number of copies <strong>11</strong>, distance (global Z) <strong>12</strong> ft ${mIco('3792793')} ${mIco('3719833')}. The first storey (columns, walls and the beams on top) is copied to form storeys 2 to 12.</li>
  <li><em>Structure › Building › Control Data › Story</em>: ${mIco('3808409')} — let the program generate the storey data automatically, then ${mIco('3819417')} and ${mIco('6665881')}. The levels are 1F (base), 2F at 16 ft, 3F … 12F, and Roof at 148 ft.</li>
</ol>
${mImg('6601241', 'Figure 9 — Building Generation: 11 copies at 12 ft give the twelve storeys.')}
${mImg('6674713', 'Figure 10 — Storey data generated by the program.')}
<p>Storey data is what lets midas Gen apply code seismic and wind loads floor by floor, calculate the centre of mass and of stiffness, and print storey shear, drift and stability tables.</p>
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>Item</th><th>Count</th></tr></thead>
  <tbody>
    <tr><td>Levels with floors</td><td>12 (2F … Roof)</td></tr>
    <tr><td>Columns</td><td>32 per storey × 12 = 384</td></tr>
    <tr><td>Beams</td><td>(4 × 7 + 8 × 3) = 52 per floor × 12 = 624</td></tr>
    <tr><td>Wall elements</td><td>2 per storey × 12 = 24</td></tr>
  </tbody>
</table></div>` },
        { title: 'Supports', html: String.raw`
<p>The lower ends of the columns (and walls) are assumed <strong>fixed</strong>: <em>Boundary › Supports › Define Supports</em> with D-All and R-All on; ${mIco('6700441')} select all the nodes at the base with a window and ${mIco('3854617')}.</p>
${mImg('3865625', 'Figure 11 — Fixed supports at the base of every column and wall.')}
<div class="note">Fixed bases are the usual assumption on a stiff mat or pile caps with grade beams. If the foundation can rotate, use point springs (<em>Boundary › Point Spring</em>) instead — base fixity changes the period and the column base moments.</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Model one floor carefully, then copy it — errors are copied too.</li>
  <li>Columns: correct section and local axes (Reverse I-J for downward extrusion).</li>
  <li>Walls: membrane type, correct thickness, one Wall ID per physical wall.</li>
  <li>Generate the storey data after the building is complete; check the levels.</li>
  <li>Check supports at every base node.</li>
</ul>` }
      ]
    }
  ]
});
