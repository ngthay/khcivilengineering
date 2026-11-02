/* Lesson 5 — Inquiry, UCS, layers and dimensions */
KCE_COURSE.lessons.push({
  id: 'dims-layers',
  num: 5,
  title: 'Inquiry, Layers and Dimensions',
  desc: 'AREA, BOUNDARY, LIST, ID, UCS, LAYER, dimension styles and every dimension command, with a dimensioned practice part.',
  icon: '📐',
  color: 'pink',
  meta: ['Lesson 5', 'Intermediate', 'Layer · Dimension'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A drawing is only useful when it can be read and measured. This lesson covers the <strong>inquiry</strong> commands that measure what you have drawn, <strong>layers</strong> that organise objects by type (outlines, centre lines, hatching, dimensions, text), and the <strong>dimension</strong> commands that annotate sizes.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Command</th><th>Alias</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>AREA</td><td><kbd>AA</kbd></td><td>Area and perimeter of an object or of a boundary you pick point by point.</td></tr>
    <tr><td>BOUNDARY</td><td><kbd>BO</kbd></td><td>Creates a closed polyline or region from the area around a picked point — useful before AREA or HATCH.</td></tr>
    <tr><td>LIST</td><td><kbd>LI</kbd></td><td>Shows the properties of selected objects: layer, length, area, coordinates.</td></tr>
    <tr><td>ID</td><td><kbd>ID</kbd></td><td>Shows the X, Y, Z coordinates of a point.</td></tr>
    <tr><td>DIST</td><td><kbd>DI</kbd></td><td>Distance and angle between two points.</td></tr>
    <tr><td>UCS</td><td><kbd>UCS</kbd></td><td>Moves or rotates the user coordinate system (origin and X/Y axes). UCSICON controls the axis icon.</td></tr>
    <tr><td>LAYER</td><td><kbd>LA</kbd></td><td>Creates and manages layers: name, colour, linetype, lineweight, on/off, freeze, lock.</td></tr>
    <tr><td>LAYOFF / LAYON</td><td>—</td><td>Turns off the layer of a picked object / turns all layers back on.</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Create the layers first (e.g. OUTLINE, CENTER, HIDDEN, HATCH, DIM, TEXT) with colours and linetypes.</li>
  <li>Set up a dimension style (<kbd>D</kbd>): text height, arrow size, units and precision, overall scale.</li>
  <li>Dimension with linear, aligned, radius, diameter and angular dimensions; chain them with Continue or Baseline.</li>
  <li>Check sizes with LIST, DIST and AREA.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 420 290" role="img" aria-label="Dimensioned practice part">
    <path class="ln" d="M60 40 H120 A70 70 0 0 0 260 40 H320 V170 A60 60 0 0 1 260 230 H120 A60 60 0 0 1 60 170 Z"/>
    <circle class="ln" cx="130" cy="170" r="30"/><circle class="ln" cx="250" cy="170" r="30"/>
    <path class="dim" d="M190 30 V250 M90 170 h200"/>
    <g class="thin">
      <path d="M60 22 h60 M60 16 v12 M120 16 v12 M260 22 h60 M260 16 v12 M320 16 v12"/>
      <path d="M60 262 h260 M60 256 v12 M320 256 v12"/>
      <path d="M346 40 v190 M340 40 h12 M340 230 h12"/>
      <path d="M190 40 L232 92 L292 92"/>
      <path d="M250 170 L292 130 L340 130"/>
      <path d="M60 210 L30 240 L10 240"/>
    </g>
    <text x="80" y="16">30</text><text x="280" y="16">30</text><text x="176" y="282">130</text><text x="352" y="140">95</text>
    <text x="246" y="88" class="a">R35</text><text x="296" y="126" class="a">2× Ø30</text><text x="8" y="236" class="a">R30</text>
  </svg>
  <figcaption>Figure 1 — Practice part: 130 wide × 95 high, R35 notch at the top, R30 bottom corners and two Ø30 holes. Dimension it with DLI, DRA and DDI.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Layers',
      subs: [
        { title: 'Suggested layer set', html: String.raw`
<table class="tbl">
  <thead><tr><th>Layer</th><th>Colour</th><th>Linetype</th><th>Lineweight</th><th>For</th></tr></thead>
  <tbody>
    <tr><td>OUTLINE</td><td>White/black (7)</td><td>Continuous</td><td>0.50 mm</td><td>Visible edges, concrete outline</td></tr>
    <tr><td>REBAR</td><td>Red (1)</td><td>Continuous</td><td>0.35 mm</td><td>Reinforcement</td></tr>
    <tr><td>CENTER</td><td>Yellow (2)</td><td>CENTER</td><td>0.18 mm</td><td>Axes, centre lines</td></tr>
    <tr><td>HIDDEN</td><td>Cyan (4)</td><td>HIDDEN</td><td>0.18 mm</td><td>Hidden edges</td></tr>
    <tr><td>HATCH</td><td>Grey (8)</td><td>Continuous</td><td>0.13 mm</td><td>Section hatching</td></tr>
    <tr><td>DIM / TEXT</td><td>Green (3)</td><td>Continuous</td><td>0.18 mm</td><td>Dimensions and notes</td></tr>
  </tbody>
</table>
<p>Lineweights here are typical office values, not a standard. Load linetypes with LINETYPE (<kbd>LT</kbd>) and set their scale with LTSCALE (<kbd>LTS</kbd>).</p>` }
      ]
    },
    {
      title: 'Dimensions',
      subs: [
        { title: 'Dimension commands', html: String.raw`
<table class="tbl">
  <thead><tr><th>Command</th><th>Alias</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>DIMSTYLE</td><td><kbd>D</kbd></td><td>Creates and edits dimension styles (text, arrows, units, scale).</td></tr>
    <tr><td>DIMLINEAR</td><td><kbd>DLI</kbd></td><td>Horizontal or vertical distance.</td></tr>
    <tr><td>DIMALIGNED</td><td><kbd>DAL</kbd></td><td>Distance parallel to a sloping edge.</td></tr>
    <tr><td>DIMCONTINUE</td><td><kbd>DCO</kbd></td><td>A chain of dimensions, each starting where the previous one ended.</td></tr>
    <tr><td>DIMBASELINE</td><td><kbd>DBA</kbd></td><td>Several dimensions measured from one common baseline.</td></tr>
    <tr><td>DIMANGULAR</td><td><kbd>DAN</kbd></td><td>Angle between two lines or of an arc.</td></tr>
    <tr><td>DIMRADIUS</td><td><kbd>DRA</kbd></td><td>Radius of an arc or circle (R…).</td></tr>
    <tr><td>DIMDIAMETER</td><td><kbd>DDI</kbd></td><td>Diameter of a circle (Ø…).</td></tr>
    <tr><td>DIMJOGGED</td><td><kbd>DJO</kbd> / <kbd>JOG</kbd></td><td>Radius of a very large arc with a jogged (zig-zag) dimension line.</td></tr>
    <tr><td>DIMARC</td><td><kbd>DAR</kbd></td><td>Arc length.</td></tr>
    <tr><td>DIMORDINATE</td><td><kbd>DOR</kbd></td><td>X or Y distance of a point from the origin (ordinate dimension).</td></tr>
    <tr><td>DIMCENTER</td><td><kbd>DCE</kbd></td><td>Centre mark or centre lines of circles and arcs.</td></tr>
    <tr><td>QDIM</td><td>—</td><td>Quick dimension: many dimensions at once from a selection.</td></tr>
    <tr><td>DIMSPACE</td><td>—</td><td>Makes the spacing between parallel dimension lines equal.</td></tr>
    <tr><td>DIMBREAK</td><td>—</td><td>Breaks extension/dimension lines where they cross other objects.</td></tr>
    <tr><td>DIMINSPECT</td><td>—</td><td>Adds an inspection frame to a dimension.</td></tr>
    <tr><td>DIMTEDIT / DIMEDIT</td><td><kbd>DED</kbd></td><td>Moves or rotates dimension text / edits text and extension lines.</td></tr>
    <tr><td>HATCHEDIT</td><td><kbd>HE</kbd></td><td>Changes an existing hatch (pattern, scale, angle).</td></tr>
  </tbody>
</table>
<div class="note"><p>Alias corrections to the Khmer tutorial: jogged dimension is <kbd>DJO</kbd> (not "dio"), and arc length is <kbd>DAR</kbd> (not "ARC").</p></div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Every object is on the right layer — never draw on layer 0 except block contents.</li>
  <li>One dimension style per plot scale (or an annotative style).</li>
  <li>Dimensions snap to real geometry (Endpoint, Center) so they update when the drawing changes.</li>
  <li>Check key sizes and areas with LIST, DIST and AREA before issuing the drawing.</li>
</ul>` }
      ]
    }
  ]
});
