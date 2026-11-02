/* Lesson 6 — References, polyline editing, layouts and printing; footing drawings */
KCE_COURSE.lessons.push({
  id: 'layout-print',
  num: 6,
  title: 'References, Layouts and Printing',
  desc: 'IMAGE, XREF, SPLINEDIT, PEDIT, LAYOFF/LAYON, LAYOUT and PLOT, finishing with reinforced-concrete footing drawings.',
  icon: '🖨️',
  color: 'peach',
  meta: ['Lesson 6', 'Intermediate', 'Layout · Plot · RC drawings'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The last step is to turn the model into <strong>sheets</strong>. You draw at full size (1 unit = 1 mm) in <em>model space</em>, then arrange scaled views of it on a <em>layout</em> with a title block, and plot the layout to paper or PDF. References let several drawings share the same background, such as an architectural plan.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Command</th><th>Alias</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>IMAGE / IMAGEATTACH</td><td><kbd>IM</kbd> / <kbd>IAT</kbd></td><td>Attaches a picture (scan, photo, logo) to the drawing.</td></tr>
    <tr><td>XREF</td><td><kbd>XR</kbd> / <kbd>ER</kbd></td><td>Opens External References to attach other DWG files (e.g. the architectural plan) without copying them in.</td></tr>
    <tr><td>SPLINEDIT</td><td><kbd>SPE</kbd></td><td>Edits a spline: fit points, control vertices, open/close.</td></tr>
    <tr><td>PEDIT</td><td><kbd>PE</kbd></td><td>Edits polylines: join segments, set width, add vertices, convert lines to a polyline.</td></tr>
    <tr><td>LAYOFF / LAYON</td><td>—</td><td>Hides the layer of a selected object / shows all layers again.</td></tr>
    <tr><td>LAYOUT</td><td><kbd>LO</kbd></td><td>Creates and manages layout (sheet) tabs.</td></tr>
    <tr><td>MVIEW</td><td><kbd>MV</kbd></td><td>Creates viewports on a layout.</td></tr>
    <tr><td>PLOT</td><td><kbd>PRINT</kbd> / <kbd>Ctrl</kbd>+<kbd>P</kbd></td><td>Prints the current layout or model view to a printer, plotter or PDF.</td></tr>
  </tbody>
</table>
<div class="note"><p>The Khmer tutorial gives "Eref" for XREF. The real aliases are <kbd>XR</kbd> (XREF) and <kbd>ER</kbd> (EXTERNALREFERENCES).</p></div>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Draw everything in model space at 1:1 (mm).</li>
  <li>Open a layout tab, set the page (Page Setup: printer, paper A1/A3, plot style).</li>
  <li>Insert the title block, create viewports with MVIEW, and set each viewport scale (1:20, 1:50…); lock the viewport.</li>
  <li>Plot with <kbd>Ctrl</kbd>+<kbd>P</kbd> — Preview first, then print or save as PDF.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 230" role="img" aria-label="Model space and layout">
    <rect class="conc" x="20" y="20" width="250" height="180"/>
    <text x="70" y="40" class="a">Model space (1:1, mm)</text>
    <rect class="ln" x="60" y="80" width="140" height="40"/><path class="ln" d="M110 120 v60 M150 120 v60"/>
    <path class="acc" d="M285 110 h50"/><polygon class="accf" points="335,110 325,104 325,116"/>
    <rect class="thin" x="350" y="20" width="270" height="190"/>
    <rect class="ln" x="360" y="30" width="250" height="170"/>
    <rect class="dim" x="372" y="44" width="150" height="110"/>
    <rect class="ln" x="395" y="80" width="70" height="20"/><path class="ln" d="M420 100 v30 M440 100 v30"/>
    <rect class="thin" x="530" y="150" width="76" height="46"/><text x="537" y="170" class="m">Title</text><text x="537" y="188" class="m">block</text>
    <text x="378" y="148" class="m">viewport 1:50</text>
    <text x="410" y="222" class="a">Layout (A3 sheet)</text>
  </svg>
  <figcaption>Figure 1 — Draw full size in model space; show it at scale through a viewport on a layout sheet with a title block.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Practice: Footing Drawings',
      subs: [
        { title: 'Exercise 1: pad footing section', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 700 340" role="img" aria-label="Reinforced concrete pad footing section">
    <defs>
      <pattern id="acad-lean" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="3" r="0.9" fill="currentColor" opacity=".55"/><circle cx="7" cy="7" r="0.7" fill="currentColor" opacity=".55"/>
      </pattern>
    </defs>
    <!-- ground -->
    <path class="thin" d="M70 60 H560"/>
    <text x="440" y="56" class="m">× × × × ×</text><text x="110" y="56" class="m">× × × × ×</text>
    <!-- lean concrete -->
    <rect x="148" y="276" width="384" height="12" class="thin" style="fill:url(#acad-lean)"/>
    <!-- footing outline -->
    <path class="ln" d="M160 276 H520 V240 L370 186 V20 M310 20 V186 L160 240 V276"/>
    <path class="ln" d="M302 30 l8 -10 l8 10 M362 30 l8 -10 l8 10" style="stroke-width:1"/>
    <!-- column bars and ties -->
    <g class="thin" style="stroke:#e0565b">
      <path d="M318 26 V266 M362 26 V266"/>
      <path d="M318 80 h44 M318 98 h44 M318 116 h44 M318 134 h44 M318 152 h44 M318 170 h44 M318 188 h44"/>
      <path d="M170 266 H510"/>
    </g>
    <g fill="#e0565b">
      <circle cx="180" cy="262" r="3.2"/><circle cx="200" cy="262" r="3.2"/><circle cx="220" cy="262" r="3.2"/><circle cx="240" cy="262" r="3.2"/><circle cx="260" cy="262" r="3.2"/><circle cx="280" cy="262" r="3.2"/><circle cx="300" cy="262" r="3.2"/>
      <circle cx="380" cy="262" r="3.2"/><circle cx="400" cy="262" r="3.2"/><circle cx="420" cy="262" r="3.2"/><circle cx="440" cy="262" r="3.2"/><circle cx="460" cy="262" r="3.2"/><circle cx="480" cy="262" r="3.2"/><circle cx="500" cy="262" r="3.2"/>
    </g>
    <!-- levels -->
    <g class="thin">
      <path d="M30 60 h30 M30 96 h30 M30 186 h30 M30 276 h30"/>
      <path d="M40 60 l-5 -8 h10 Z M40 96 l-5 -8 h10 Z M40 186 l-5 -8 h10 Z M40 276 l-5 -8 h10 Z"/>
    </g>
    <text x="28" y="50" class="m">±0.000</text><text x="30" y="86" class="m">−0.30</text><text x="30" y="176" class="m">−1.05</text><text x="30" y="266" class="m">−1.80</text>
    <!-- leaders -->
    <g class="thin">
      <path d="M362 110 L420 110 H470"/><path d="M362 152 L420 140 H470"/>
      <path d="M500 262 L540 230 H600"/><path d="M490 266 L548 250 H600"/>
    </g>
    <text x="424" y="106">6Ø22 ③</text><text x="424" y="136">Ø8 a200 ④</text>
    <text x="544" y="226">14Ø14 a170 ①</text><text x="544" y="246">16Ø10 a190 ②</text>
    <!-- dimensions -->
    <g class="thin"><path d="M148 306 H532 M148 300 v12 M160 300 v12 M340 300 v12 M520 300 v12 M532 300 v12 M160 324 H520 M160 318 v12 M520 318 v12"/></g>
    <text x="236" y="302">1500</text><text x="416" y="302">1500</text><text x="326" y="338">3000</text>
    <g class="thin"><path d="M660 60 V276 M654 60 h12 M654 186 h12 M654 240 h12 M654 276 h12"/></g>
    <text x="666" y="128" class="m">1050</text><text x="666" y="218" class="m">450</text><text x="666" y="262" class="m">300</text>
  </svg>
  <figcaption>Figure 2 — Pad footing section (redrawn from the tutorial): footing 3000 wide on 100 mm lean concrete, 300 thick at the edge sloping to 750 at the column, bottom at −1.80. Bars: ① 14Ø14 @170 and ② 16Ø10 @190 at the bottom, ③ 6Ø22 column bars, ④ Ø8 ties @200.</figcaption>
</figure>
<ol>
  <li>Draw the outline with PLINE using the levels: −1.80, −1.50, −1.05.</li>
  <li>Draw the lean-concrete strip and HATCH it (AR-CONC or a dot pattern).</li>
  <li>Draw bars on the REBAR layer: lines for bars in elevation, DONUT (inside Ø 0, outside = bar size) for bars in section; place them with ARRAY or MEASURE.</li>
  <li>Add level symbols as a BLOCK with an attribute, the bar marks with MLEADER (<kbd>MLD</kbd>), and the dimensions with DLI + DCO.</li>
</ol>` },
        { title: 'Exercise 2: footing plan', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 470 330" role="img" aria-label="Footing plan">
    <rect class="ln" x="60" y="30" width="272" height="272"/>
    <rect class="thin" x="52" y="22" width="288" height="288"/>
    <rect class="ln" x="176" y="146" width="40" height="40"/>
    <path class="thin" d="M60 30 L176 146 M332 30 L216 146 M60 302 L176 186 M332 302 L216 186"/>
    <g class="thin" style="stroke:#e0565b">
      <path d="M236 206 H320 M236 222 H320 M236 238 H320 M236 254 H320 M236 270 H320 M236 286 H320"/>
      <path d="M244 198 V294 M262 198 V294 M280 198 V294 M298 198 V294 M316 198 V294"/>
    </g>
    <path class="dim" d="M20 166 H372 M196 4 V326"/>
    <path class="thin" d="M320 230 L360 210 H410 M316 260 L360 250 H410"/>
    <text x="356" y="206">20Ø14 a120</text><text x="356" y="246">18Ø12 a190</text>
    <path class="thin" d="M60 322 H332 M60 316 v12 M332 316 v12"/><text x="180" y="318">3400</text>
  </svg>
  <figcaption>Figure 3 — Plan of a 3400 × 3400 footing with a 500 × 500 column: only one corner of the bottom mesh is drawn (20Ø14 @120 one way, 18Ø12 @190 the other), which is the usual drafting convention.</figcaption>
</figure>
<div class="tip"><p>These footings are designed in the Concrete course, lesson 14. Draw the plan and the section on separate viewports of one A3 layout at 1:25.</p></div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Model space at 1:1; scales are set only in viewports.</li>
  <li>Viewports locked after scaling, on a non-plotting layer (Defpoints or VIEWPORT).</li>
  <li>Plot preview checked before printing; save a PDF for issue.</li>
  <li>External references attached (not copied) so updates flow through.</li>
</ul>` }
      ]
    }
  ]
});
