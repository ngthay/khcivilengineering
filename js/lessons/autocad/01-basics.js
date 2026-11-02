/* Lesson 1 — Getting started: interface, settings, object snaps, first commands */
KCE_COURSE.lessons.push({
  id: 'basics',
  num: 1,
  title: 'Getting Started and First Commands',
  desc: 'The AutoCAD screen, Options, drawing setup and paper sizes, object snaps, and the first drawing and file commands.',
  icon: '🚀',
  color: 'blue',
  meta: ['Lesson 1', 'Beginner', 'Line · Circle · Arc · Copy · Move'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>AutoCAD is driven by <strong>commands</strong>. You type a command name or its short alias (for example <kbd>L</kbd> for LINE) on the command line, press <kbd>Enter</kbd> or <kbd>Space</kbd>, and follow the prompts. This lesson covers the screen, the basic settings, precise point picking with object snaps, and the first set of drawing, editing and file commands.</p>
<div class="tip"><p>The key to using AutoCAD fluently is <strong>practice</strong>: draw the exercises until you remember the commands and their aliases without looking them up.</p></div>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Key</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td><kbd>Enter</kbd> or <kbd>Space</kbd></td><td>Runs the command you typed, finishes the current command, or — on an empty command line — <strong>repeats the last command</strong>.</td></tr>
    <tr><td><kbd>Esc</kbd></td><td>Cancels the current command.</td></tr>
    <tr><td><kbd>F8</kbd></td><td>Ortho on/off: the cursor moves only horizontally or vertically.</td></tr>
    <tr><td><kbd>F3</kbd></td><td>Object snap (OSNAP) on/off.</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Set up the drawing: units, limits and scale (OPTIONS, MVSETUP).</li>
  <li>Turn on the object snaps you need (OSNAP, <kbd>F3</kbd>).</li>
  <li>Draw with LINE, CIRCLE and ARC, typing exact lengths and angles.</li>
  <li>Edit with ERASE, COPY and MOVE; navigate with ZOOM and PAN.</li>
  <li>Save often with <kbd>Ctrl</kbd>+<kbd>S</kbd>.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 330" role="img" aria-label="AutoCAD screen layout">
    <rect class="thin" x="10" y="10" width="620" height="310" rx="10"/>
    <rect class="comp" x="10" y="10" width="620" height="54" rx="10"/>
    <text x="24" y="32" class="a">Ribbon</text><text x="24" y="52" class="m">Home · Insert · Annotate · Layout · View — tool panels</text>
    <rect class="conc" x="20" y="74" width="600" height="168"/>
    <text x="420" y="100" class="m">Drawing area (model space)</text>
    <path class="ln" d="M40 220 v-30 M40 220 h30" /><text x="44" y="186" class="m">Y</text><text x="74" y="224" class="m">X</text>
    <text x="80" y="236" class="m">UCS icon</text>
    <path class="acc" d="M330 150 m-14 0 h28 m-14 -14 v28"/><rect class="acc" x="325" y="145" width="10" height="10"/>
    <text x="345" y="176" class="m">crosshair cursor</text>
    <rect class="thin" x="20" y="250" width="600" height="30" rx="4"/>
    <text x="30" y="270">Command: <tspan class="a">L</tspan>  LINE  Specify first point:</text>
    <rect class="thin" x="20" y="288" width="600" height="24" rx="4"/>
    <text x="30" y="305" class="m">Status bar: Model/Layout · Grid · Snap · Ortho (F8) · Polar · OSNAP (F3) · Lineweight</text>
  </svg>
  <figcaption>Figure 1 — The AutoCAD screen: ribbon, drawing area with UCS icon and cursor, command line and status bar.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Settings and Drawing Setup',
      subs: [
        { title: 'OPTIONS (OP)', html: String.raw`
<p>Opens the Options dialog, where the program settings are grouped in tabs: <em>Files, Display, Open and Save, Plot and Publish, System, User Preferences, Drafting, 3D Modeling, Selection</em> and <em>Profiles</em>. Typical changes: background colour (Display), automatic save interval (Open and Save), cursor and snap marker size (Drafting).</p>` },
        { title: 'MVSETUP and paper sizes', html: String.raw`
<p><strong>MVSETUP</strong> sets up a drawing for a given scale and paper size, so that the border fits the sheet you will print on. The ISO A-series sheet sizes are:</p>
<table class="tbl num">
  <thead><tr><th>Sheet</th><th>A0</th><th>A1</th><th>A2</th><th>A3</th><th>A4</th><th>A5</th><th>A6</th></tr></thead>
  <tbody><tr><th>Size (mm)</th><td>841 × 1189</td><td>594 × 841</td><td>420 × 594</td><td>297 × 420</td><td>210 × 297</td><td>148 × 210</td><td>105 × 148</td></tr></tbody>
</table>
<p>Each size is half of the previous one (fold the long side in two). Structural drawings are usually A1 or A3.</p>` },
        { title: 'Object snaps (OS)', html: String.raw`
<p><strong>OSNAP</strong> (alias <kbd>OS</kbd>) chooses the running object snaps — exact points on objects that the cursor locks onto. Toggle them with <kbd>F3</kbd>; toggle object snap tracking with <kbd>F11</kbd>.</p>
<table class="tbl">
  <thead><tr><th>Snap mode</th><th>Snaps to</th></tr></thead>
  <tbody>
    <tr><td>Endpoint</td><td>The start or end point of a line, arc or polyline segment.</td></tr>
    <tr><td>Midpoint</td><td>The middle of a line or arc.</td></tr>
    <tr><td>Center</td><td>The centre of a circle, arc or ellipse.</td></tr>
    <tr><td>Node</td><td>A point object (e.g. points created by DIVIDE or MEASURE).</td></tr>
    <tr><td>Quadrant</td><td>The 0°, 90°, 180° and 270° points of a circle or arc.</td></tr>
    <tr><td>Intersection</td><td>Where two objects cross.</td></tr>
    <tr><td>Extension</td><td>A point on the imaginary extension of a line or arc, at a distance you type.</td></tr>
    <tr><td>Insertion</td><td>The insertion point of a block or text.</td></tr>
    <tr><td>Perpendicular</td><td>The foot of a perpendicular to an object.</td></tr>
    <tr><td>Tangent</td><td>The tangent point on a circle or arc.</td></tr>
    <tr><td>Nearest</td><td>The closest point on an object.</td></tr>
    <tr><td>Apparent intersection</td><td>Where two objects would meet if extended, or appear to cross in a view.</td></tr>
    <tr><td>Parallel</td><td>Draws a line parallel to an existing line.</td></tr>
  </tbody>
</table>` }
      ]
    },
    {
      title: 'First Commands',
      subs: [
        { title: 'Drawing commands', html: String.raw`
<table class="tbl">
  <thead><tr><th>Command</th><th>Alias</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>LINE</td><td><kbd>L</kbd></td><td>Draws straight line segments. Type lengths with polar input, e.g. <code>@120&lt;0</code> (120 long at 0°) or relative coordinates <code>@30,60</code>.</td></tr>
    <tr><td>CIRCLE</td><td><kbd>C</kbd></td><td>Draws a circle by centre and radius/diameter, 2 points, 3 points or tangent-tangent-radius.</td></tr>
    <tr><td>ARC</td><td><kbd>A</kbd></td><td>Draws an arc from one point to another, e.g. start–centre–end or start–end–radius.</td></tr>
  </tbody>
</table>` },
        { title: 'Editing and view commands', html: String.raw`
<table class="tbl">
  <thead><tr><th>Command</th><th>Alias</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>ERASE</td><td><kbd>E</kbd> or <kbd>Delete</kbd></td><td>Removes the selected objects.</td></tr>
    <tr><td>COPY</td><td><kbd>CO</kbd> / <kbd>CP</kbd></td><td>Copies objects from a base point to one or more new points.</td></tr>
    <tr><td>MOVE</td><td><kbd>M</kbd></td><td>Moves objects from a base point to a new point.</td></tr>
    <tr><td>ZOOM</td><td><kbd>Z</kbd></td><td>Enlarges or reduces the view. <code>Z ↵ E ↵</code> (Extents) shows the whole drawing; the mouse wheel also zooms.</td></tr>
    <tr><td>PAN</td><td><kbd>P</kbd></td><td>Slides the view without changing the zoom; holding the mouse wheel also pans.</td></tr>
  </tbody>
</table>
<div class="note"><p>The Khmer tutorial lists PAN as "O". In AutoCAD <kbd>O</kbd> is OFFSET; the standard alias for PAN is <kbd>P</kbd>.</p></div>` },
        { title: 'File shortcuts', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><td><kbd>Ctrl</kbd>+<kbd>N</kbd></td><td>New drawing</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>O</kbd></td><td>Open an existing drawing</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>S</kbd></td><td>Save the current drawing</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd></td><td>Save As — save to a new name or folder</td></tr>
  </tbody>
</table>` }
      ]
    },
    {
      title: 'Practice Drawings',
      subs: [
        { title: 'Exercise set 1: straight lines', html: String.raw`
<p>Use LINE with relative coordinates, <kbd>F8</kbd> (Ortho) and the Endpoint snap. Dimensions are in mm.</p>
<figure class="fig">
  <svg viewBox="0 0 800 212" role="img" aria-label="Exercises a, b and c">
    <polygon class="ln" points="30,140 222,140 270,44 78,44"/>
    <path class="thin" d="M30 30 h240 M30 24 v12 M78 24 v12 M270 24 v12 M290 44 v96 M284 44 h12 M284 140 h12"/>
    <text x="46" y="24">30</text><text x="160" y="24">120</text><text x="296" y="96">60</text>
    <text x="140" y="176" class="a">a</text>
    <g transform="translate(24 0)">
    <polygon class="ln" points="330,150 498,150 498,108 442,38 330,38"/>
    <path class="thin" d="M330 168 h168 M330 162 v12 M498 162 v12 M330 24 h112 M330 18 v12 M442 18 v12 M316 38 v112 M310 38 h12 M310 150 h12 M514 108 v42 M508 108 h12 M508 150 h12"/>
    <text x="400" y="185">120</text><text x="378" y="18">80</text><text x="292" y="98">80</text><text x="520" y="133">30</text>
    <text x="410" y="200" class="a">b</text>
    <polygon class="ln" points="560,150 720,150 688,54 592,54"/>
    <path class="thin" d="M560 168 h160 M560 162 v12 M720 162 v12 M592 40 h96 M592 34 v12 M688 34 v12 M740 54 v96 M734 54 h12 M734 150 h12"/>
    <text x="628" y="185">100</text><text x="630" y="34">60</text><text x="746" y="106">60</text>
    <text x="636" y="200" class="a">c</text>
    </g>
  </svg>
  <figcaption>Figure 2 — Draw each shape with LINE. Hint for (a): start bottom-left, <code>@120&lt;0</code>, <code>@30,60</code>, <code>@-120&lt;0</code>, then <code>C</code> to close.</figcaption>
</figure>` },
        { title: 'Exercise set 2: outlines', html: String.raw`
<div class="grid2">
<figure class="fig">
  <svg viewBox="0 0 400 230" role="img" aria-label="House-shaped outline">
    <polygon class="ln" points="88,190 280,190 280,94 328,94 328,78 184,30 40,78 40,94 88,94"/>
    <path class="thin" d="M40 212 h288 M40 206 v12 M88 206 v12 M280 206 v12 M328 206 v12 M18 30 v160 M12 30 h12 M12 190 h12 M352 94 v96 M346 94 h12 M346 190 h12 M352 78 v16 M346 78 h12"/>
    <text x="54" y="228">30</text><text x="172" y="228">120</text><text x="294" y="228">30</text>
    <text x="0" y="116">100</text><text x="358" y="146">60</text><text x="358" y="90">10</text>
  </svg>
  <figcaption>(d) Outline with a pitched top.</figcaption>
</figure>
<figure class="fig">
  <svg viewBox="0 0 300 230" role="img" aria-label="Plate with notch and chamfers">
    <polygon class="ln" points="40,148 88,180 216,180 264,148 264,52 184,52 184,84 120,84 120,52 40,52"/>
    <path class="thin" d="M40 36 h80 M40 30 v12 M120 30 v12 M184 36 h80 M184 30 v12 M264 30 v12 M20 52 v128 M14 52 h12 M14 180 h12 M30 148 v32 M196 52 v32 M190 84 h12 M40 200 h48 M216 200 h48 M40 216 h224 M40 194 v28 M264 194 v28 M88 194 v12 M216 194 v12"/>
    <text x="70" y="30">50</text><text x="214" y="30">50</text><text x="2" y="120">80</text><text x="200" y="74">20</text><text x="56" y="196">30</text><text x="232" y="196">30</text><text x="140" y="230">140</text>
  </svg>
  <figcaption>(e) Plate with a top notch and 30 × 20 chamfers.</figcaption>
</figure>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use <kbd>Space</kbd>/<kbd>Enter</kbd> to repeat the last command and <kbd>Esc</kbd> to cancel.</li>
  <li>Turn on Endpoint, Midpoint, Center, Intersection and Perpendicular snaps.</li>
  <li>Type exact lengths and angles — never estimate with the mouse.</li>
  <li>Save with <kbd>Ctrl</kbd>+<kbd>S</kbd> every few minutes.</li>
</ul>` }
      ]
    }
  ]
});
