/* Lesson 7 — One-key shortcuts and function keys (Autodesk Shortcuts Guide) */
KCE_COURSE.lessons.push({
  id: 'one-key',
  num: 7,
  title: 'One-Key Shortcuts',
  desc: 'The 22 single-letter command aliases and the F1–F12 function keys, shown on the keyboard.',
  icon: '⌨️',
  color: 'sky',
  meta: ['Shortcuts Guide p.2', 'Keyboard', 'Speed'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The fastest way to work in AutoCAD is to keep one hand on the keyboard: the most-used commands need only <strong>one letter + Space</strong>. Autodesk's shortcuts guide assigns 22 letter keys to commands and uses the function keys F1–F12 to switch drawing aids on and off.</p>` },
        { title: 'Description', html: String.raw`
<p>Type the letter on an empty command line and press <kbd>Space</kbd> or <kbd>Enter</kbd>. Function keys act immediately, even in the middle of a command (for example, press <kbd>F8</kbd> while drawing a line to switch Ortho).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Learn the drawing letters first: <kbd>L</kbd> <kbd>C</kbd> <kbd>A</kbd> <kbd>H</kbd> <kbd>T</kbd>.</li>
  <li>Then the editing letters: <kbd>E</kbd> <kbd>M</kbd> <kbd>O</kbd> <kbd>F</kbd> <kbd>S</kbd> <kbd>X</kbd> <kbd>J</kbd>.</li>
  <li>Keep <kbd>F3</kbd>, <kbd>F8</kbd>, <kbd>F10</kbd>, <kbd>F12</kbd> under your fingers for snaps, ortho, polar and dynamic input.</li>
  <li>Print the keyboard below and stick it next to your screen until the keys are automatic.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<div class="kb" role="img" aria-label="Keyboard with AutoCAD one-key shortcuts">
  <div class="kb-row fn">
    <span class="key on"><b>F1</b><small>Help</small></span><span class="key on"><b>F2</b><small>Text screen</small></span><span class="key on"><b>F3</b><small>Osnap</small></span><span class="key on"><b>F4</b><small>3DOsnap</small></span><span class="key on"><b>F5</b><small>Isoplane</small></span><span class="key on"><b>F6</b><small>Dyn UCS</small></span><span class="key on"><b>F7</b><small>Grid</small></span><span class="key on"><b>F8</b><small>Ortho</small></span><span class="key on"><b>F9</b><small>Snap</small></span><span class="key on"><b>F10</b><small>Polar</small></span><span class="key on"><b>F11</b><small>Osnap track</small></span><span class="key on"><b>F12</b><small>Dyn input</small></span>
  </div>
  <div class="kb-row r1">
    <span class="key on"><b>Q</b><small>QSAVE</small></span><span class="key on"><b>W</b><small>WBLOCK</small></span><span class="key on"><b>E</b><small>ERASE</small></span><span class="key on"><b>R</b><small>REDRAW</small></span><span class="key on"><b>T</b><small>MTEXT</small></span><span class="key"><b>Y</b></span><span class="key"><b>U</b></span><span class="key on"><b>I</b><small>INSERT</small></span><span class="key on"><b>O</b><small>OFFSET</small></span><span class="key on"><b>P</b><small>PAN</small></span>
  </div>
  <div class="kb-row r2">
    <span class="key on"><b>A</b><small>ARC</small></span><span class="key on"><b>S</b><small>STRETCH</small></span><span class="key on"><b>D</b><small>DIMSTYLE</small></span><span class="key on"><b>F</b><small>FILLET</small></span><span class="key on"><b>G</b><small>GROUP</small></span><span class="key on"><b>H</b><small>HATCH</small></span><span class="key on"><b>J</b><small>JOIN</small></span><span class="key"><b>K</b></span><span class="key on"><b>L</b><small>LINE</small></span>
  </div>
  <div class="kb-row r3">
    <span class="key on"><b>Z</b><small>ZOOM</small></span><span class="key on"><b>X</b><small>EXPLODE</small></span><span class="key on"><b>C</b><small>CIRCLE</small></span><span class="key on"><b>V</b><small>VIEW</small></span><span class="key on"><b>B</b><small>BLOCK</small></span><span class="key"><b>N</b></span><span class="key on"><b>M</b><small>MOVE</small></span>
  </div>
</div>
<p class="fig-caption">Figure 1 — One-key shortcuts (after the Autodesk AutoCAD Shortcuts Guide).</p>` }
      ]
    },
    {
      title: 'Letter Keys',
      subs: [
        { title: 'Drawing and annotation', html: String.raw`
<table class="tbl">
  <thead><tr><th>Key</th><th>Command</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td><kbd>L</kbd></td><td>LINE</td><td>Creates straight line segments.</td></tr>
    <tr><td><kbd>C</kbd></td><td>CIRCLE</td><td>Creates a circle.</td></tr>
    <tr><td><kbd>A</kbd></td><td>ARC</td><td>Creates an arc.</td></tr>
    <tr><td><kbd>H</kbd></td><td>HATCH</td><td>Fills an enclosed area or selected objects with a hatch pattern, solid fill or gradient fill.</td></tr>
    <tr><td><kbd>T</kbd></td><td>MTEXT</td><td>Creates a multiline text object.</td></tr>
    <tr><td><kbd>D</kbd></td><td>DIMSTYLE</td><td>Creates and modifies dimension styles.</td></tr>
    <tr><td><kbd>B</kbd></td><td>BLOCK</td><td>Creates a block definition from selected objects.</td></tr>
    <tr><td><kbd>I</kbd></td><td>INSERT</td><td>Inserts a block or drawing into the current drawing.</td></tr>
    <tr><td><kbd>W</kbd></td><td>WBLOCK</td><td>Writes objects or a block to a new drawing file.</td></tr>
    <tr><td><kbd>G</kbd></td><td>GROUP</td><td>Creates and manages saved sets of objects called groups.</td></tr>
  </tbody>
</table>` },
        { title: 'Editing, view and file', html: String.raw`
<table class="tbl">
  <thead><tr><th>Key</th><th>Command</th><th>What it does</th></tr></thead>
  <tbody>
    <tr><td><kbd>E</kbd></td><td>ERASE</td><td>Removes objects from a drawing.</td></tr>
    <tr><td><kbd>M</kbd></td><td>MOVE</td><td>Moves objects a specified distance in a specified direction.</td></tr>
    <tr><td><kbd>O</kbd></td><td>OFFSET</td><td>Creates concentric circles, parallel lines and parallel curves.</td></tr>
    <tr><td><kbd>F</kbd></td><td>FILLET</td><td>Rounds and fillets the edges of objects.</td></tr>
    <tr><td><kbd>S</kbd></td><td>STRETCH</td><td>Stretches objects crossed by a selection window or polygon.</td></tr>
    <tr><td><kbd>X</kbd></td><td>EXPLODE</td><td>Breaks a compound object into its component objects.</td></tr>
    <tr><td><kbd>J</kbd></td><td>JOIN</td><td>Joins similar objects to form a single, unbroken object.</td></tr>
    <tr><td><kbd>Z</kbd></td><td>ZOOM</td><td>Increases or decreases the magnification of the view in the current viewport.</td></tr>
    <tr><td><kbd>P</kbd></td><td>PAN</td><td>Moves the view in the current viewport without changing the magnification.</td></tr>
    <tr><td><kbd>V</kbd></td><td>VIEW</td><td>Saves and restores named views, camera views, layout views and preset views.</td></tr>
    <tr><td><kbd>R</kbd></td><td>REDRAW</td><td>Refreshes the display in the current viewport.</td></tr>
    <tr><td><kbd>Q</kbd></td><td>QSAVE</td><td>Saves the current drawing.</td></tr>
  </tbody>
</table>
<div class="note"><p>The printed guide describes P (PAN) as "Adds a parameter with grips to a dynamic block definition" — that text belongs to BPARAMETER. PAN moves the view, as written above.</p></div>` }
      ]
    },
    {
      title: 'Function Keys',
      subs: [
        { title: 'F1 – F12', html: String.raw`
<table class="tbl">
  <thead><tr><th>Key</th><th>Toggle</th><th>When to use it</th></tr></thead>
  <tbody>
    <tr><td><kbd>F1</kbd></td><td>Display Help</td><td>Help for the command that is running.</td></tr>
    <tr><td><kbd>F2</kbd></td><td>Text screen</td><td>Expands the command history.</td></tr>
    <tr><td><kbd>F3</kbd></td><td>Object snap mode</td><td>Switch running snaps off when they grab the wrong point.</td></tr>
    <tr><td><kbd>F4</kbd></td><td>3D object snap</td><td>Snaps on 3D faces, edges and vertices.</td></tr>
    <tr><td><kbd>F5</kbd></td><td>Isoplane</td><td>Cycles top/right/left planes in isometric drafting.</td></tr>
    <tr><td><kbd>F6</kbd></td><td>Dynamic UCS</td><td>Temporarily aligns the UCS with 3D faces.</td></tr>
    <tr><td><kbd>F7</kbd></td><td>Grid mode</td><td>Shows or hides the grid.</td></tr>
    <tr><td><kbd>F8</kbd></td><td>Ortho mode</td><td>Locks the cursor to horizontal/vertical.</td></tr>
    <tr><td><kbd>F9</kbd></td><td>Snap mode</td><td>Locks the cursor to the snap spacing.</td></tr>
    <tr><td><kbd>F10</kbd></td><td>Polar tracking</td><td>Guides the cursor along set angles (e.g. every 15° or 30°).</td></tr>
    <tr><td><kbd>F11</kbd></td><td>Object snap tracking</td><td>Tracks alignment lines from snap points.</td></tr>
    <tr><td><kbd>F12</kbd></td><td>Dynamic input</td><td>Shows the input boxes next to the cursor.</td></tr>
  </tbody>
</table>
<div class="tip"><p>Ortho (<kbd>F8</kbd>) and Polar (<kbd>F10</kbd>) cannot both be on — turning one on turns the other off.</p></div>` }
      ]
    }
  ]
});
