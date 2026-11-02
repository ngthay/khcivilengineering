/* Lesson 3 — Modify commands, polylines and text */
KCE_COURSE.lessons.push({
  id: 'modify-text',
  num: 3,
  title: 'Modify Commands, Polylines and Text',
  desc: 'EXTEND, CHAMFER, FILLET, ROTATE, SCALE, MIRROR, PLINE and the text commands, with practice drawings and a roof truss.',
  icon: '🛠️',
  color: 'lilac',
  meta: ['Lesson 3', 'Intermediate', 'Fillet · Mirror · Text'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Once the basic outline exists, the <strong>modify</strong> commands shape it: round or bevel corners, turn, resize and mirror objects. Polylines keep many segments together as one object, and the text commands add notes and titles.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Command</th><th>Alias</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>EXTEND</td><td><kbd>EX</kbd></td><td>Lengthens objects to meet a boundary edge.</td></tr>
    <tr><td>CHAMFER</td><td><kbd>CHA</kbd></td><td>Bevels a corner by two distances (or a distance and an angle).</td></tr>
    <tr><td>FILLET</td><td><kbd>F</kbd></td><td>Rounds a corner with a given radius. Radius 0 makes a sharp corner — a quick way to join two lines.</td></tr>
    <tr><td>ROTATE</td><td><kbd>RO</kbd></td><td>Turns objects about a base point by an angle (positive = counter-clockwise).</td></tr>
    <tr><td>SCALE</td><td><kbd>SC</kbd></td><td>Enlarges or reduces objects by a factor about a base point; the proportions stay the same.</td></tr>
    <tr><td>MIRROR</td><td><kbd>MI</kbd></td><td>Makes a mirror copy about a line (and optionally deletes the original).</td></tr>
    <tr><td>PLINE</td><td><kbd>PL</kbd></td><td>Draws a polyline — like LINE, but all segments (and arcs) are joined into one object, which can also have width.</td></tr>
    <tr><td>MTEXT</td><td><kbd>T</kbd> / <kbd>MT</kbd></td><td>Multiline text in a paragraph box.</td></tr>
    <tr><td>TEXT</td><td><kbd>DT</kbd></td><td>Single-line text — short labels such as drawing titles.</td></tr>
    <tr><td>STYLE</td><td><kbd>ST</kbd></td><td>Creates text styles: font, height, width factor.</td></tr>
  </tbody>
</table>
<div class="note"><p>Alias corrections to the Khmer tutorial: <kbd>T</kbd> runs MTEXT (not single-line text), <kbd>M</kbd> runs MOVE (MTEXT is <kbd>MT</kbd>), and single-line TEXT is <kbd>DT</kbd>.</p></div>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Draw half of a symmetric part, then MIRROR it.</li>
  <li>Set the FILLET radius (<code>F ↵ R ↵ 5 ↵</code>) or CHAMFER distances first, then pick the two edges.</li>
  <li>Use ROTATE with the Reference option to align objects to an existing angle.</li>
  <li>Create a text style before writing notes, so all text has the same font and height.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 620 150" role="img" aria-label="Rectangle variants">
    <rect class="ln" x="20" y="30" width="120" height="80"/>
    <path class="ln" d="M180 30 H280 L290 40 V100 L280 110 H180 L170 100 V40 Z"/>
    <rect class="ln" x="320" y="30" width="120" height="80" rx="10"/>
    <rect class="ln" x="470" y="30" width="120" height="80" rx="40"/>
    <g class="thin"><path d="M20 128 h120 M170 128 h120 M320 128 h120 M470 128 h120 M8 30 v80 M158 30 v80 M308 30 v80 M458 30 v80"/></g>
    <text x="70" y="144">60</text><text x="220" y="144">60</text><text x="370" y="144">60</text><text x="520" y="144">60</text>
    <text x="0" y="22" class="m">40 high</text>
    <text x="232" y="22" class="m">chamfer 5</text><text x="380" y="22" class="m">fillet R5</text><text x="510" y="22" class="m">fillet R20</text>
  </svg>
  <figcaption>Figure 1 — A 60 × 40 rectangle: plain, chamfered 5 × 5, filleted R5, and filleted R20 (a slot).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Practice Drawings',
      subs: [
        { title: 'Frames and patterns', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 800 220" role="img" aria-label="Braced frame, square with circle, hexagon star">
    <rect class="ln" x="20" y="20" width="320" height="160"/>
    <path class="ln" d="M180 20 V180 M20 100 H340 M20 20 L180 100 M180 20 L20 100 M180 20 L340 100 M340 20 L180 100 M20 100 L180 180 M180 100 L20 180 M180 100 L340 180 M340 100 L180 180"/>
    <path class="thin" d="M20 200 h320"/><text x="168" y="216">160</text><text x="346" y="106">80</text>
    <rect class="ln" x="400" y="20" width="160" height="160"/>
    <circle class="ln" cx="480" cy="100" r="80"/>
    <polygon class="ln" points="480,20 560,100 480,180 400,100"/>
    <path class="ln" d="M400 20 L560 180 M560 20 L400 180"/>
    <path class="thin" d="M400 200 h160"/><text x="468" y="216">100</text><text x="566" y="106">100</text>
    <g class="ln">
      <polygon points="778,100 739,167.5 661,167.5 622,100 661,32.5 739,32.5"/>
      <path d="M778 100 L661 167.5 M778 100 L622 100 M778 100 L661 32.5 M739 167.5 L622 100 M739 167.5 L661 32.5 M739 167.5 L739 32.5 M661 167.5 L661 32.5 M661 167.5 L739 32.5 M622 100 L739 32.5"/>
    </g>
    <path class="thin" d="M661 190 h78"/><text x="690" y="206">60</text>
  </svg>
  <figcaption>Figure 2 — (1) 160 × 80 braced frame: offset the mid-lines, draw the diagonals with Endpoint/Midpoint snaps, then MIRROR. (2) 100 × 100 square, circle Ø100, inscribed square and diagonals. (3) Hexagon of side 60 with every diagonal.</figcaption>
</figure>` },
        { title: 'Roof truss', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 660 240" role="img" aria-label="Roof truss">
    <g class="ln">
      <path d="M30 190 H606"/>
      <polyline points="30,190 126,94 222,82 318,46 414,82 510,94 606,190" style="fill:none"/>
      <path d="M126 190 V94 M222 190 V82 M318 190 V46 M414 190 V82 M510 190 V94"/>
      <path d="M126 190 L222 82 M222 190 L318 46 M414 190 L318 46 M510 190 L414 82"/>
    </g>
    <path class="thin" d="M30 212 h576 M30 206 v12 M606 206 v12 M126 206 v12"/>
    <text x="60" y="230">6 × 40</text><text x="300" y="230">240</text>
    <text x="131" y="150" class="m">40</text><text x="227" y="150" class="m">45</text><text x="323" y="150" class="m">60</text>
  </svg>
  <figcaption>Figure 3 — A roof truss, span 240 in six 40-unit panels, with heights 40, 45 and 60 at the panel points. Draw the left half, then MIRROR about the centre vertical.</figcaption>
</figure>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Draw half, then MIRROR; check that MIRRTEXT = 0 so text does not mirror.</li>
  <li>Use FILLET radius 0 to close corners quickly.</li>
  <li>Prefer PLINE/RECTANG for closed outlines — they can be offset in one step and their area is easy to measure.</li>
  <li>Use one text style and a consistent text height for each plot scale.</li>
</ul>` }
      ]
    }
  ]
});
