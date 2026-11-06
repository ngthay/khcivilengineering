/* Lesson 3 — Drawing beams and columns, supports and loads (guide pp. 6–9) */
KCE_COURSE.lessons.push({
  id: 'draw-assign',
  num: 3,
  title: 'Draw and Assign — Beams, Columns, Supports and Loads',
  desc: 'Drawing line objects on the grid (beams by region or clicks, columns at grid intersections), the Properties of Object box, joint restraints, and frame and joint loads.',
  icon: '✏️',
  color: 'peach',
  meta: ['Guide §9–11', 'Draw · Assign', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Once materials, sections and load cases exist, the structure is <strong>drawn</strong> on the grid and then given its supports and loads with the <strong>Assign</strong> menu. Assign commands always act on the objects that are currently <em>selected</em>, so the routine is always: select the objects, then Assign.</p>` },
        { title: 'Description', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Object</th><th>Command</th><th>Typical use</th></tr></thead>
  <tbody>
    <tr><td>Line (frame)</td><td>Draw Lines / Create Lines in Region or at Clicks</td><td>Beams, braces</td></tr>
    <tr><td>Column</td><td>Create Columns in Region or at Clicks (Plan)</td><td>Columns at grid intersections, over the story height</td></tr>
    <tr><td>Secondary beam</td><td>Create Secondary Beams in Region or at Clicks</td><td>Joists between main beams</td></tr>
    <tr><td>Area</td><td>Draw Area Objects</td><td>Slabs, decks, walls</td></tr>
  </tbody>
</table></div>` }
      ]
    },
    {
      title: 'Step by step',
      subs: [
        { title: 'Draw beams (lines)', html: String.raw`
<p>Use <em>Draw → Draw Line Objects → Create Lines in Region or at Clicks (Plan, Elev, 3D)</em> or the toolbar button on the left. A floating <strong>Properties of Object</strong> box opens. There you choose the type of line (Frame), the <strong>Property</strong> (the section), the moment releases (Continuous or Pinned) and the plan offset.</p>
${etabsRow([['p06-1', 93], ['p06-2', 293]], 'Figure 1 — The Create Lines button and the Properties of Object box (section A-LatBm).')}
<p>Drag a window over a grid line, or click on it. Every grid segment inside the window becomes a beam, which is drawn in yellow.</p>
${etabsRow([['p06-4', 287], ['p06-3', 340]], 'Figure 2 — Drag a window across the grid line (left); the beam is created (right).')}
<p>To draw a beam between any two points, use <em>Draw Lines (Plan, Elev, 3D)</em> instead: click the start point, click the end point, and press <kbd>Esc</kbd> to stop.</p>` },
        { title: 'Draw columns', html: String.raw`
<p>Use <em>Draw → Draw Line Objects → Create Columns in Region or at Clicks (Plan)</em> ${etabsIco('p06-5')}. In a <strong>plan view</strong>, click a grid intersection or drag a window around several. Each intersection gets a column from the current story down to the story below.</p>
${etabsRow([['p06-6', 229], ['p06-7', 269]], 'Figure 3 — Window around grid intersections (left); columns placed (right).')}
<p>The Properties of Object box for columns sets the section, the moment releases, the <strong>angle</strong> (rotation of the section about its axis) and the plan offsets X and Y.</p>
${etabsShot('p07-1', 298, 'Figure 4 — Properties of Object for a column (A-LatCol, angle 0).')}` },
        { title: 'Supports (restraints)', html: String.raw`
<p>Supports are easiest to see in an <strong>elevation view</strong>. Select the base joints, then use <em>Assign → Joint/Point → Restraints (Supports)</em> or the toolbar button ${etabsIco('p08-4', true)}.</p>
${etabsShot('p09-1', 284, 'Figure 5 — Assign Restraints: ticked translations and rotations are fixed.')}
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Fast restraint</th><th>Fixed DOF</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>Fixed</td><td>UX UY UZ RX RY RZ</td><td>Fixed base (clamped)</td></tr>
    <tr><td>Pinned</td><td>UX UY UZ</td><td>Hinge: no translation, free rotation</td></tr>
    <tr><td>Roller</td><td>UZ</td><td>Vertical support only</td></tr>
    <tr><td>Free</td><td>none</td><td>Removes a restraint</td></tr>
  </tbody>
</table></div>` },
        { title: 'Loads', html: String.raw`
<p>Select the members or joints that carry the load, then open the <strong>Assign</strong> menu:</p>
<ul>
  <li><em>Joint/Point Loads → Force</em>: a point force or moment at a joint.</li>
  <li><em>Frame/Line Loads → Point</em>: point loads along a beam.</li>
  <li><em>Frame/Line Loads → Distributed</em>: uniform or trapezoidal line loads.</li>
  <li><em>Frame/Line Loads → Temperature</em>: a temperature change.</li>
  <li><em>Shell/Area Loads</em>: uniform pressure on slabs.</li>
</ul>
${etabsShot('p09-2', 413, 'Figure 6 — Assign → Frame/Line Loads: Point, Distributed, Temperature.')}
<p>Every load form asks for the <strong>load case name</strong>, the direction and an option: <em>Add to Existing Loads</em>, <em>Replace Existing Loads</em> or <em>Delete Existing Loads</em>. After the loads are in, run the analysis and view the results. The example in Lessons 4–6 goes through every step.</p>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Load directions', html: String.raw`
<p>In ETABS, <strong>Gravity</strong> means the −Z global direction, so a positive gravity load acts downwards. Global X, Y and Z loads follow the sign of the axis. For example, a wind load of +10 in Global X acts in the +X direction, and −10 acts the other way. <em>Local</em> directions (1, 2, 3) follow each member’s own axes.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Choose the section in Properties of Object before you click, not afterwards.</li>
  <li>Draw columns in a plan view and check them in an elevation.</li>
  <li>Assign restraints only at the base joints.</li>
  <li>Select objects first, then Assign; check the result with Display → Show Loads.</li>
</ul>` }
      ]
    }
  ]
});
