/* Lesson 1 — ETABS window, units, new model, grid and views (guide pp. 1–4, 7–8) */
KCE_COURSE.lessons.push({
  id: 'getting-started',
  num: 1,
  title: 'Getting Started — Window, Units, New Model and Views',
  desc: 'Open ETABS, choose consistent kN-m units, start a new model from a grid and story template, save the .EDB file, and move around the model with plan, elevation and 3D views.',
  icon: '🏢',
  color: 'mint',
  meta: ['Guide §1–4', 'ETABS 9.7', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>ETABS</strong> (Extended Three-dimensional Analysis of Building Systems, by CSI) is a program for analysing and designing buildings. A building is modelled as <em>stories</em> over a plan <em>grid</em>: beams, columns and braces are line objects, and slabs and walls are area objects. ETABS then assembles the finite element model, analyses it and designs the members.</p>` },
        { title: 'Description', html: String.raw`
<p>Every ETABS model follows the same order:</p>
<ol>
  <li>Units and a new model (grid + stories).</li>
  <li>Define: materials, frame sections, load cases, load combinations.</li>
  <li>Draw: columns, beams, braces, slabs, walls.</li>
  <li>Assign: supports (restraints), loads, releases.</li>
  <li>Analyze: analysis options, then <em>Run Analysis</em>.</li>
  <li>Display: deformed shape, member force diagrams, tables; then design.</li>
</ol>
<p>This lesson covers step 1 and the view tools. Lessons 2–3 cover steps 2–4, and Lessons 4–6 apply the whole workflow to an example frame.</p>` }
      ]
    },
    {
      title: 'Step by step',
      subs: [
        { title: 'Open ETABS', html: String.raw`
<p>Double-click the ETABS icon on the desktop, or use <em>Start → Programs → ETABS → ETABS</em>. The empty program window opens with the menu bar (File, Edit, View, Define, Draw, Select, Assign, Analyze, Display, Design, Options, Help), two rows of toolbars at the top, the drawing toolbar on the left and the status bar at the bottom.</p>
${etabsShot('p02-1', 553, 'Figure 1 — The ETABS 9.7 window before a model is opened.')}` },
        { title: 'Choose the units', html: String.raw`
<p>The units box is at the bottom-right corner of the window. Pick it <em>before</em> typing any number. In this course we use <strong>kN-m</strong>: forces in kN, lengths in m, stresses in kN/m² (kPa), unit weight in kN/m³.</p>
${etabsShot('p02-2', 100, 'Figure 2 — Units drop-down list: select KN-m.')}
<div class="note"><p>In kN-m units, <strong>mass</strong> is in kN·s²/m, which is the same as tonnes. So concrete has a mass per unit volume of about 2.5 t/m³ and a weight per unit volume of about 25 kN/m³. Don’t mix in kgf or tf values while kN-m is selected. Lesson 4 shows a case where that happened.</p></div>` },
        { title: 'Start a new model', html: String.raw`
<p>Use <em>File → New Model</em>, the New Model icon ${etabsIco('p02-3')}, or <kbd>Ctrl</kbd>+<kbd>N</kbd>.</p>
${etabsShot('p02-4', 188, 'Figure 3 — The New Model button (Ctrl+N).')}
<p>ETABS first asks whether to copy definitions and preferences from an existing <code>.edb</code> file. Choose <strong>No</strong> to start from the program defaults. <em>Choose .edb</em> reuses the materials, sections and load cases of an earlier project, and <em>Default.edb</em> uses your saved defaults.</p>
${etabsShot('p03-1', 307, 'Figure 4 — New Model Initialization: choose No.')}
<p>The <strong>Building Plan Grid System and Story Data Definition</strong> form then opens:</p>
<ul>
  <li><strong>Grid Dimensions (Plan):</strong> the number of grid lines in X and Y and their spacing. The default is 4 × 4 lines at 6 m. For uneven bays choose <em>Custom Grid Spacing → Edit Grid</em>.</li>
  <li><strong>Story Dimensions:</strong> the number of stories, the typical story height and the bottom story height. The default is 4 stories of 3 m. <em>Custom Story Data</em> allows a different height for each story.</li>
  <li><strong>Add Structural Objects:</strong> templates (steel deck, staggered truss, flat slab, waffle slab, two-way slab …). <em>Grid Only</em> gives an empty grid to draw on.</li>
</ul>
${etabsShot('p03-2', 453, 'Figure 5 — Building Plan Grid System and Story Data Definition (4 × 4 grid at 6 m, 4 stories of 3 m).')}
<p>Click <strong>OK</strong>. ETABS shows a plan view (left) and a 3D view (right) of the empty grid.</p>
${etabsShot('p03-3', 488, 'Figure 6 — Plan view of STORY4 and the 3D view of the new grid.')}` },
        { title: 'Save the model', html: String.raw`
<p>Save straight away and often: <em>File → Save</em> or the disk icon ${etabsIco('p04-1')}. Choose a folder and a file name. ETABS stores the model in an <code>.EDB</code> file and writes its analysis files to the same folder, so give each project its own folder.</p>` },
        { title: 'Views and view options', html: String.raw`
<p>The <strong>View</strong> menu sets the 3D, plan or elevation view, zooms, pans, and refreshes the window. The same commands are on the toolbar: ${etabsIco('p08-2', true)} sets a 3D, plan or elevation view, and the arrows ${etabsIco('p08-3', true)} move the plan view one story up or down. Each story can be checked or edited this way.</p>
${etabsShot('p08-1', 276, 'Figure 7 — The View menu.')}
<p><em>View → Set Building View Options</em> ${etabsIco('p07-2')} chooses what is drawn on screen. For example, you can colour objects by section or material, show line labels and section names, or show the supports and local axes. Turning on <em>Line Labels</em> and <em>Line Sections</em> is the quickest way to check that every member has the right section.</p>
${etabsShot('p07-3', 660, 'Figure 8 — Set Building View Options.')}` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Menus in ETABS 9.7 and in current ETABS', html: String.raw`
<p>The guide uses ETABS 9.7. Current versions (ETABS 2016 and later) have renamed some commands:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Task</th><th>ETABS 9.7 (this guide)</th><th>Current ETABS</th></tr></thead>
  <tbody>
    <tr><td>Grid and stories</td><td>Edit → Edit Grid Data / Edit Story Data</td><td>Edit → Edit Stories and Grid Systems</td></tr>
    <tr><td>Sections</td><td>Define → Frame Sections</td><td>Define → Section Properties → Frame Sections</td></tr>
    <tr><td>Load types</td><td>Define → Static Load Cases</td><td>Define → Load Patterns</td></tr>
    <tr><td>Combinations</td><td>Define → Load Combinations</td><td>Define → Load Combinations</td></tr>
    <tr><td>Draw members</td><td>Draw → Draw Line Objects</td><td>Draw → Draw Beam/Column/Brace Objects</td></tr>
    <tr><td>Supports</td><td>Assign → Joint/Point → Restraints</td><td>Assign → Joint → Restraints</td></tr>
    <tr><td>Member loads</td><td>Assign → Frame/Line Loads</td><td>Assign → Frame Loads</td></tr>
    <tr><td>Results</td><td>Display → Show Member Forces/Stress Diagram</td><td>Display → Force/Stress Diagrams</td></tr>
    <tr><td>Tables</td><td>File → Print Tables / Display → Show Tables</td><td>Display → Show Tables (Ctrl+T)</td></tr>
  </tbody>
</table></div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Set the units (kN-m) before entering any value.</li>
  <li>Plan the grid and story heights from the architectural drawings first.</li>
  <li>Save the .EDB file in its own project folder, and save often.</li>
  <li>Use plan, elevation and 3D views together to check the geometry.</li>
</ul>` }
      ]
    }
  ]
});
