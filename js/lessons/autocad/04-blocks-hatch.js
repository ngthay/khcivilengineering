/* Lesson 4 — Blocks, arrays, divide/measure and hatching */
KCE_COURSE.lessons.push({
  id: 'blocks-hatch',
  num: 4,
  title: 'Blocks, Arrays and Hatching',
  desc: 'EXPLODE, BLOCK, DIVIDE, MEASURE, DONUT, SPLINE, ARRAY, STRETCH, REFEDIT and HATCH, with array and hatch practice drawings.',
  icon: '🧩',
  color: 'amber',
  meta: ['Lesson 4', 'Intermediate', 'Block · Array · Hatch'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Engineering drawings repeat the same things many times: bolts, piles, bars, columns, door symbols. <strong>Blocks</strong> store a group of objects as one named symbol, <strong>arrays</strong> place many copies in rows or around a circle, and <strong>hatches</strong> fill areas to show materials such as concrete, soil or steel in section.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Command</th><th>Alias</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>EXPLODE</td><td><kbd>X</kbd></td><td>Breaks a compound object (block, polyline, region, dimension) into its individual pieces.</td></tr>
    <tr><td>BLOCK</td><td><kbd>B</kbd></td><td>Saves selected objects as a named block definition with a base point.</td></tr>
    <tr><td>INSERT</td><td><kbd>I</kbd></td><td>Places a block or another drawing into the current drawing.</td></tr>
    <tr><td>DIVIDE</td><td><kbd>DIV</kbd></td><td>Places points (or blocks) that divide an object into N equal parts.</td></tr>
    <tr><td>MEASURE</td><td><kbd>ME</kbd></td><td>Places points (or blocks) at a fixed spacing along an object.</td></tr>
    <tr><td>DONUT</td><td><kbd>DO</kbd></td><td>A filled ring or filled circle — the standard symbol for a rebar in section.</td></tr>
    <tr><td>SPLINE</td><td><kbd>SPL</kbd></td><td>A smooth curve through or near given points.</td></tr>
    <tr><td>ARRAY</td><td><kbd>AR</kbd></td><td>Copies objects in a rectangular grid, around a centre (polar), or along a path.</td></tr>
    <tr><td>STRETCH</td><td><kbd>S</kbd></td><td>Lengthens or shortens objects crossed by a crossing window, keeping connections.</td></tr>
    <tr><td>REFEDIT</td><td>—</td><td>Edits a block in place without exploding it (BEDIT, <kbd>BE</kbd>, opens the Block Editor).</td></tr>
    <tr><td>HATCH</td><td><kbd>H</kbd></td><td>Fills a closed area with a hatch pattern, solid fill or gradient.</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Draw one item (e.g. a bolt hole), make it a BLOCK with a sensible base point.</li>
  <li>Place copies with ARRAY: rectangular (rows, columns, spacing) or polar (centre, number, angle).</li>
  <li>Close the outlines that must be filled, then HATCH by picking an internal point.</li>
  <li>Edit a hatch later with HATCHEDIT (<kbd>HE</kbd>) — pattern, scale, angle.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 680 230" role="img" aria-label="Rectangular and polar arrays">
    <rect class="ln" x="20" y="20" width="360" height="180" rx="36"/>
    <g class="ln">
      <circle cx="56" cy="38" r="9"/><circle cx="92" cy="38" r="9"/><circle cx="128" cy="38" r="9"/><circle cx="164" cy="38" r="9"/><circle cx="200" cy="38" r="9"/><circle cx="236" cy="38" r="9"/><circle cx="272" cy="38" r="9"/><circle cx="308" cy="38" r="9"/><circle cx="344" cy="38" r="9"/>
      <circle cx="56" cy="110" r="9"/><circle cx="92" cy="110" r="9"/><circle cx="128" cy="110" r="9"/><circle cx="164" cy="110" r="9"/><circle cx="200" cy="110" r="9"/><circle cx="236" cy="110" r="9"/><circle cx="272" cy="110" r="9"/><circle cx="308" cy="110" r="9"/><circle cx="344" cy="110" r="9"/>
      <circle cx="56" cy="182" r="9"/><circle cx="92" cy="182" r="9"/><circle cx="128" cy="182" r="9"/><circle cx="164" cy="182" r="9"/><circle cx="200" cy="182" r="9"/><circle cx="236" cy="182" r="9"/><circle cx="272" cy="182" r="9"/><circle cx="308" cy="182" r="9"/><circle cx="344" cy="182" r="9"/>
    </g>
    <path class="thin" d="M56 218 h288 M56 212 v12 M344 212 v12"/><text x="186" y="230">160 (8 × 20)</text>
    <circle class="ln" cx="560" cy="110" r="89.6"/><circle class="ln" cx="560" cy="110" r="19.2"/>
    <g class="ln">
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z"/>
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z" transform="rotate(30 560 110)"/>
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z" transform="rotate(60 560 110)"/>
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z" transform="rotate(90 560 110)"/>
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z" transform="rotate(120 560 110)"/>
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z" transform="rotate(150 560 110)"/>
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z" transform="rotate(180 560 110)"/>
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z" transform="rotate(210 560 110)"/>
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z" transform="rotate(240 560 110)"/>
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z" transform="rotate(270 560 110)"/>
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z" transform="rotate(300 560 110)"/>
      <path d="M579.2 110 A56 56 0 0 1 649.6 110 A56 56 0 0 1 579.2 110 Z" transform="rotate(330 560 110)"/>
    </g>
    <text x="506" y="222" class="m">Ø112, Ø24, R35</text>
  </svg>
  <figcaption>Figure 1 — Left: a rectangular ARRAY — 3 rows × 9 columns of Ø10 holes at 20 × 40 spacing on a 200 × 100 plate with R20 corners. Right: a polar ARRAY of one R35 petal, 12 copies around 360°.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Using the Commands',
      subs: [
        { title: 'Rectangular and polar array', html: String.raw`
<ol>
  <li><strong>Rectangular:</strong> <code>AR ↵</code>, select the hole, choose <em>Rectangular</em>. In the ribbon set Columns = 9, spacing 20; Rows = 3, spacing 40.</li>
  <li><strong>Polar:</strong> <code>AR ↵</code>, select the petal, choose <em>Polar</em>, pick the centre of the circle, set Items = 12, Fill angle = 360.</li>
  <li>Arrays stay <em>associative</em> (one object you can re-edit). EXPLODE the array if you need to edit single items.</li>
</ol>
<div class="tip"><p>In structural drawings, use MEASURE with a block to place stirrups at a fixed spacing along a beam, and DONUT (inside diameter 0) for bar sections.</p></div>` },
        { title: 'Hatching a section', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 200" role="img" aria-label="Hatched section">
    <defs>
      <pattern id="acad-h45" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" stroke-width="1" opacity=".55"/>
      </pattern>
    </defs>
    <path d="M40 30 H260 V170 H40 Z M110 100 m-36 0 a36 36 0 1 0 72 0 a36 36 0 1 0 -72 0 Z M200 70 h30 v60 h-30 Z" fill="url(#acad-h45)" fill-rule="evenodd" class="ln" style="fill:url(#acad-h45)"/>
    <text x="70" y="192" class="m">ANSI31 — steel / general section</text>
    <rect x="360" y="30" width="240" height="140" class="ln"/>
    <g fill="currentColor" opacity=".55">
      <circle cx="380" cy="50" r="2"/><circle cx="420" cy="78" r="1.5"/><circle cx="455" cy="45" r="2.2"/><circle cx="500" cy="90" r="1.6"/><circle cx="545" cy="58" r="2"/><circle cx="580" cy="120" r="1.8"/>
      <circle cx="400" cy="140" r="2"/><circle cx="440" cy="118" r="1.5"/><circle cx="480" cy="150" r="2.2"/><circle cx="520" cy="130" r="1.6"/><circle cx="560" cy="155" r="2"/><circle cx="470" cy="70" r="1.4"/>
      <path d="M392 96 l8 -6 l3 9 Z M510 50 l9 -3 l-2 9 Z M545 100 l8 4 l-7 5 Z M430 160 l7 -6 l3 8 Z"/>
    </g>
    <text x="400" y="192" class="m">AR-CONC — concrete</text>
  </svg>
  <figcaption>Figure 2 — HATCH fills closed areas; holes (islands) are left empty automatically. Use ANSI31 for general sections and AR-CONC for concrete.</figcaption>
</figure>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Give blocks meaningful names and a useful base point (e.g. the centre of a column).</li>
  <li>Create blocks on layer 0 so they take on the layer of the insertion.</li>
  <li>Close outlines before hatching; set the hatch scale to suit the plot scale.</li>
  <li>Use STRETCH with a crossing window (right-to-left) to change lengths without breaking connections.</li>
</ul>` }
      ]
    }
  ]
});
