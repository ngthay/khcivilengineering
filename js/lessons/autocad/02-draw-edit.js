/* Lesson 2 — Construction lines, rectangles, offset, trim, polygons */
KCE_COURSE.lessons.push({
  id: 'draw-edit',
  num: 2,
  title: 'Construction Lines, Offset, Trim and Polygons',
  desc: 'XLINE, RAY, MLINE, RECTANG, OFFSET, TRIM, BREAK, JOIN and POLYGON, with polygon practice drawings.',
  icon: '📏',
  color: 'mint',
  meta: ['Lesson 2', 'Beginner', 'Offset · Trim · Polygon'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Most drawings are not built line by line. You lay out <strong>construction lines</strong>, copy edges at exact distances with <strong>OFFSET</strong>, and cut away what you do not need with <strong>TRIM</strong>. This "offset and trim" workflow is the fastest way to draw plans, sections and details accurately.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Command</th><th>Alias</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>XLINE</td><td><kbd>XL</kbd></td><td>A line of infinite length in both directions — for grid lines and construction.</td></tr>
    <tr><td>RAY</td><td><kbd>RAY</kbd></td><td>A line that starts at a point and runs to infinity in one direction.</td></tr>
    <tr><td>MLINE</td><td><kbd>ML</kbd></td><td>Several parallel lines drawn together (e.g. both faces of a wall).</td></tr>
    <tr><td>RECTANG</td><td><kbd>REC</kbd></td><td>A rectangle as one polyline, from two opposite corners (<code>@60,40</code>), optionally with chamfered or filleted corners.</td></tr>
    <tr><td>OFFSET</td><td><kbd>O</kbd></td><td>A parallel copy of a line, arc, circle or polyline at a given distance.</td></tr>
    <tr><td>TRIM</td><td><kbd>TR</kbd></td><td>Cuts objects back to cutting edges formed by other objects.</td></tr>
    <tr><td>BREAK</td><td><kbd>BR</kbd></td><td>Removes the part of an object between two points (or splits it at one point).</td></tr>
    <tr><td>JOIN</td><td><kbd>J</kbd></td><td>Joins collinear lines, or connected lines/arcs, into one object.</td></tr>
    <tr><td>POLYGON</td><td><kbd>POL</kbd></td><td>A regular polygon with 3 to 1024 sides, inscribed in or circumscribed about a circle, or by edge length.</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Draw grid/reference lines with XLINE or LINE.</li>
  <li>OFFSET them by the dimensions on the drawing.</li>
  <li>TRIM the crossing lines back to the required outline (in recent versions, Quick mode: just pick the pieces to remove).</li>
  <li>Use JOIN or PEDIT to make the outline a single polyline if needed.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 210" role="img" aria-label="Offset and trim workflow">
    <g class="dim"><path d="M20 40 h170 M20 170 h170 M40 20 v170 M170 20 v170"/></g>
    <text x="60" y="205" class="a">1. Offset lines</text>
    <g class="dim"><path d="M240 40 h170 M240 170 h170 M260 20 v170 M390 20 v170"/></g>
    <path class="ln" d="M260 40 H390 V170 H260 Z" style="stroke:#e0565b"/>
    <text x="270" y="205" class="a">2. Pick pieces to trim</text>
    <rect class="ln" x="480" y="40" width="130" height="130"/>
    <text x="500" y="205" class="a">3. Clean outline</text>
    <path class="acc" d="M200 105 h28 M436 105 h28"/>
  </svg>
  <figcaption>Figure 1 — The offset-and-trim workflow.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Using the Commands',
      subs: [
        { title: 'Offset and trim step by step', html: String.raw`
<ol>
  <li><kbd>O</kbd> ↵, type the distance (e.g. <code>30</code>) ↵.</li>
  <li>Pick the object to offset, then click on the side where the copy should go. Repeat, then ↵.</li>
  <li><kbd>TR</kbd> ↵. In AutoCAD 2021 and later, Quick mode is the default: click each segment to remove. In older versions select the cutting edges first, ↵, then pick the parts to remove.</li>
  <li>Hold <kbd>Shift</kbd> while picking in TRIM to <em>extend</em> instead of trim.</li>
</ol>` },
        { title: 'Polygon options', html: String.raw`
<table class="tbl">
  <thead><tr><th>Option</th><th>Size you give</th><th>Typical use</th></tr></thead>
  <tbody>
    <tr><td>Inscribed in circle (I)</td><td>Radius to the <em>corners</em></td><td>Known distance across corners</td></tr>
    <tr><td>Circumscribed about circle (C)</td><td>Radius to the <em>middle of the sides</em></td><td>Known distance across flats (bolt heads, nuts)</td></tr>
    <tr><td>Edge (E)</td><td>Two end points of one side</td><td>Known side length</td></tr>
  </tbody>
</table>` }
      ]
    },
    {
      title: 'Practice Drawings',
      subs: [
        { title: 'Polygon exercises', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 800 185" role="img" aria-label="Polygon exercises">
    <polygon class="ln" points="130,90 100,38 40,38 10,90 40,142 100,142"/>
    <path class="thin" d="M10 165 h120 M10 159 v12 M130 159 v12"/><text x="60" y="181">50</text>
    <text x="55" y="20" class="a">1</text>
    <polygon class="ln" points="319.3,90 284.6,30 215.4,30 180.7,90 215.4,150 284.6,150"/>
    <path class="thin" d="M250 30 v120 M244 30 h12 M244 150 h12"/><text x="256" y="96">50</text>
    <text x="245" y="20" class="a">2</text>
    <polygon class="ln" points="490,90 460,38 400,38 370,90 400,142 460,142"/>
    <path class="thin" d="M400 162 h60 M400 156 v12 M460 156 v12"/><text x="422" y="178">25</text>
    <text x="425" y="20" class="a">3</text>
    <rect class="ln" x="560" y="48" width="85" height="85"/><path class="ln" d="M560 48 L645 133 M645 48 L560 133"/>
    <path class="thin" d="M548 145 L633 60"/><text x="572" y="112">50</text>
    <text x="598" y="36" class="a">4</text>
    <polygon class="ln" points="720,52 678.4,124 761.6,124"/>
    <path class="thin" d="M780 52 v72 M774 52 h12 M774 124 h12"/><text x="786" y="94">30</text>
    <text x="714" y="40" class="a">5</text>
  </svg>
  <figcaption>Figure 2 — (1) hexagon 50 across corners — inscribed, radius 25; (2) hexagon 50 across flats — circumscribed, radius 25; (3) hexagon by edge, side 25; (4) square whose diagonal is 50, with both diagonals; (5) equilateral triangle 30 high.</figcaption>
</figure>
<div class="tip"><p>For (4), draw POLYGON with 4 sides, inscribed, radius 25, then rotate 45° — or use RECTANG with side 50/√2 = 35.36. For (5), side = 30 / sin 60° = 34.64.</p></div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Build outlines with OFFSET + TRIM instead of many separate LINE commands.</li>
  <li>Choose Inscribed vs Circumscribed according to which size is dimensioned.</li>
  <li>Keep construction lines on their own layer (lesson 5) so they can be hidden.</li>
</ul>` }
      ]
    }
  ]
});
