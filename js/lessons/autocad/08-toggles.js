/* Lesson 8 — Toggles and screen management (Autodesk Shortcuts Guide p.3) */
KCE_COURSE.lessons.push({
  id: 'toggles',
  num: 8,
  title: 'Toggles and Screen Management',
  desc: 'Ctrl-key shortcuts for toggles, palettes, clipboard, undo/redo and managing drawings.',
  icon: '🎛️',
  color: 'violet',
  meta: ['Shortcuts Guide p.3', 'Keyboard', 'Ctrl keys'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Besides command aliases, AutoCAD uses <kbd>Ctrl</kbd> combinations — mostly the same ones as other Windows programs — to switch features, open palettes, use the clipboard and manage open drawings.</p>` },
        { title: 'Description', html: String.raw`
<p>The shortcuts fall into five groups: general toggles, drawing-mode toggles (the F-keys, lesson 7), screen management (palettes), workflow (clipboard, undo) and drawing management (open, save, plot, switch tabs).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><kbd>Ctrl</kbd>+<kbd>1</kbd> (Properties) and <kbd>Ctrl</kbd>+<kbd>9</kbd> (command line) are the two palettes to remember first.</li>
  <li>Use <kbd>Ctrl</kbd>+<kbd>0</kbd> (Clean Screen) to get the largest drawing area.</li>
  <li>Use <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> to copy with a base point so pasted objects land exactly.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<div class="kb" role="img" aria-label="Most useful Ctrl shortcuts">
  <div class="kb-row">
    <span class="key wide on"><b>Ctrl</b><small>+ key</small></span>
    <span class="key on"><b>1</b><small>Properties</small></span><span class="key on"><b>9</b><small>Cmd line</small></span><span class="key on"><b>0</b><small>Clean</small></span>
    <span class="key on"><b>Z</b><small>Undo</small></span><span class="key on"><b>Y</b><small>Redo</small></span><span class="key on"><b>S</b><small>Save</small></span><span class="key on"><b>P</b><small>Plot</small></span><span class="key on"><b>A</b><small>Select all</small></span>
  </div>
</div>
<p class="fig-caption">Figure 1 — The Ctrl shortcuts you will use every day.</p>` }
      ]
    },
    {
      title: 'Toggles',
      subs: [
        { title: 'General features', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><td><kbd>Ctrl</kbd>+<kbd>D</kbd></td><td>Toggle coordinate display</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>G</kbd></td><td>Toggle grid</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>E</kbd></td><td>Cycle isometric planes</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>F</kbd></td><td>Toggle running object snaps</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>H</kbd></td><td>Toggle pick style</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>H</kbd></td><td>Toggle hide palettes</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>I</kbd></td><td>Toggle coordinates</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd></td><td>Toggle infer constraints</td></tr>
  </tbody>
</table>` },
        { title: 'Drawing modes', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><td><kbd>F1</kbd></td><td>Display Help</td><td><kbd>F7</kbd></td><td>Toggle grid mode</td></tr>
    <tr><td><kbd>F2</kbd></td><td>Toggle text screen</td><td><kbd>F8</kbd></td><td>Toggle ortho mode</td></tr>
    <tr><td><kbd>F3</kbd></td><td>Toggle object snap mode</td><td><kbd>F9</kbd></td><td>Toggle snap mode</td></tr>
    <tr><td><kbd>F4</kbd></td><td>Toggle 3DOsnap</td><td><kbd>F10</kbd></td><td>Toggle polar mode</td></tr>
    <tr><td><kbd>F5</kbd></td><td>Toggle isoplane</td><td><kbd>F11</kbd></td><td>Toggle object snap tracking</td></tr>
    <tr><td><kbd>F6</kbd></td><td>Toggle dynamic UCS</td><td><kbd>F12</kbd></td><td>Toggle dynamic input mode</td></tr>
  </tbody>
</table>` }
      ]
    },
    {
      title: 'Screen, Workflow and Drawings',
      subs: [
        { title: 'Manage screen', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><td><kbd>Ctrl</kbd>+<kbd>0</kbd></td><td>Clean screen</td><td><kbd>Ctrl</kbd>+<kbd>6</kbd></td><td>DBConnect Manager</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>1</kbd></td><td>Properties palette</td><td><kbd>Ctrl</kbd>+<kbd>7</kbd></td><td>Markup Set Manager palette</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>2</kbd></td><td>DesignCenter palette</td><td><kbd>Ctrl</kbd>+<kbd>8</kbd></td><td>QuickCalc</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>3</kbd></td><td>Tool palette</td><td><kbd>Ctrl</kbd>+<kbd>9</kbd></td><td>Command line</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>4</kbd></td><td>Sheet Set palette</td><td></td><td></td></tr>
  </tbody>
</table>` },
        { title: 'Manage workflow', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><td><kbd>Ctrl</kbd>+<kbd>C</kbd></td><td>Copy object</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>X</kbd></td><td>Cut object</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>V</kbd></td><td>Paste object</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd></td><td>Copy to clipboard with base point</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd></td><td>Paste data as block</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Z</kbd></td><td>Undo last action</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Y</kbd></td><td>Redo last action</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>[</kbd> or <kbd>Ctrl</kbd>+<kbd>\</kbd></td><td>Cancel current command</td></tr>
    <tr><td><kbd>Esc</kbd></td><td>Cancel current command</td></tr>
  </tbody>
</table>` },
        { title: 'Manage drawings', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><td><kbd>Ctrl</kbd>+<kbd>N</kbd></td><td>New drawing</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>S</kbd></td><td>Save drawing</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>O</kbd></td><td>Open drawing</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>P</kbd></td><td>Plot dialog box</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Tab</kbd></td><td>Switch to next drawing</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Tab</kbd></td><td>Switch to previous drawing</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Page Up</kbd></td><td>Switch to previous tab in current drawing</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Page Down</kbd></td><td>Switch to next tab in current drawing</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>Q</kbd></td><td>Exit</td></tr>
    <tr><td><kbd>Ctrl</kbd>+<kbd>A</kbd></td><td>Select all objects</td></tr>
  </tbody>
</table>` }
      ]
    }
  ]
});
