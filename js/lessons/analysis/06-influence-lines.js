/* Lesson 6 — Influence lines for statically determinate structures (Chhay/Hibbeler Ch. 6) */
KCE_COURSE.lessons.push({
  id: 'influence-lines',
  num: 6,
  title: 'Influence Lines for Determinate Structures',
  desc: 'Influence lines for reactions, shear and moment by tabulation, equations and the Müller-Breslau principle; floor girders and trusses; moving point loads, uniform loads, series of wheel loads and absolute maximum moment.',
  icon: '📈',
  color: 'rose',
  meta: ['Ch. 6', 'Moving loads', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Bridges, crane girders and conveyors carry loads that <strong>move</strong>. An <strong>influence line</strong> shows how one response — a reaction, a shear or a moment at one fixed point — changes as a unit load travels across the structure. It tells where to place the live load to get the maximum effect.</p>` },
        { title: 'Description', html: String.raw`
<p>Do not confuse the two kinds of diagrams:</p>
<table class="tbl">
  <tbody>
    <tr><th>Shear / moment diagram</th><td>Effect of a <em>fixed</em> load at <em>every point</em> of the member</td></tr>
    <tr><th>Influence line</th><td>Effect at <em>one point</em> of a load placed <em>anywhere</em></td></tr>
  </tbody>
</table>
<p>For statically determinate structures every influence line is made of straight segments.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Tabulate or write equations:</strong> place a unit load at distance \(x\), solve for the response, plot it against \(x\).</li>
  <li><strong>Müller-Breslau principle:</strong> remove the restraint that gives the response (a support for a reaction, a sliding cut for shear, a hinge for moment) and give the structure a unit displacement in the positive direction — the deflected shape is the influence line.</li>
  <li><strong>Concentrated load P:</strong> response = P × ordinate. <strong>Uniform load w:</strong> response = w × area of the influence line under it (load only the parts with the sign you want).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 250" role="img" aria-label="Influence line for shear at mid-span with axle loads">
    <path class="ln" d="M60 70 H480"/><polygon class="ln" points="60,70 50,88 70,88"/><circle class="ln" cx="480" cy="80" r="9"/>
    <text x="54" y="106">A</text><text x="266" y="94">B</text><text x="476" y="106">C</text>
    <path class="acc" d="M81 20 V66 M144 20 V66 M270 20 V66 M396 20 V66"/>
    <g class="accf"><polygon points="81,68 76,58 86,58"/><polygon points="144,68 139,58 149,58"/><polygon points="270,68 265,58 275,58"/><polygon points="396,68 391,58 401,58"/></g>
    <text x="64" y="16" class="m">18</text><text x="128" y="16" class="m">40.5</text><text x="256" y="16" class="m">67.5</text><text x="384" y="16" class="m">45 kN</text>
    <path class="thin" d="M60 170 H480"/>
    <path class="acc" d="M60 170 L270 205 V135 L480 170"/>
    <path class="dim" d="M81 170 V173.5 M144 170 V184 M396 170 V156"/>
    <text x="214" y="222" class="m">−0.5</text><text x="276" y="132" class="m">+0.5</text>
    <text x="70" y="192" class="m">−0.05</text><text x="140" y="200" class="m">−0.2</text><text x="400" y="146" class="m">+0.2</text>
    <text x="490" y="174" class="m">V_B</text>
    <text x="150" y="245" class="m">beam AC = 6 m, B at mid-span; axle spacing 0.9 · 1.8 · 1.8 m</text>
  </svg>
  <figcaption>Figure 1 — Influence line for shear at B, with the axle group in its critical position (Example on pages 192–196).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Standard influence lines (simple span L)', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Reaction \(A_y\)</th><td>\(1 - x/L\) (1 at A to 0 at the far support)</td></tr>
    <tr><th>Shear at C (distance \(a\))</th><td>\(-x/L\) left of C, jumps by 1 to \(1 - x/L\) right of C</td></tr>
    <tr><th>Moment at C</th><td>Triangle with peak \(a(L - a)/L\) at C</td></tr>
  </tbody>
</table>
<p><strong>Floor girders:</strong> loads reach the girder only through the floor beams at the panel points, so the influence line is straight between panel points (panel shear is constant in a panel). <strong>Trusses:</strong> the same idea — compute the member force with the unit load at each panel point of the loaded chord and join the ordinates with straight lines.</p>` },
        { title: 'Series of loads and absolute maximum', html: String.raw`
<ul>
  <li><strong>Maximum at a point:</strong> move the load group step by step; for each move compute the change \(\Delta V\) (or \(\Delta M\)) from the slopes of the influence line. Keep moving while the change is positive.</li>
  <li><strong>Absolute maximum shear</strong> in a simple beam occurs next to a support, with the loads placed as close to it as possible.</li>
  <li><strong>Absolute maximum moment</strong> occurs under one of the loads (usually the one closest to the resultant), when the beam centreline is midway between that load and the resultant of the whole group.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 6-1 & 6-2 — influence lines for reactions', html: String.raw`
<div class="ex">
  <div class="ex-head">(a) A 10 m simply supported beam AB: influence line for \(A_y\). (b) A beam with a pin at A, a roller at B (5 m) and a 5 m overhang: influence line for \(B_y\).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) Unit load at \(x\): \(\sum M_B = 0\): \(-A_y(10) + (10 - x)(1) = 0\) → \(A_y = 1 - x/10\) (1 at A, 0.5 at mid-span, 0 at B).</li>
      <li>(b) \(\sum M_A = 0\): \(B_y(5) - 1(x) = 0\) → \(B_y = x/5\): 0 at A, 1 at B, 2 at the end of the overhang.
        <span class="result">A_y = 1 − x/10 · B_y = x/5 (0 ≤ x ≤ 10 m)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Series of wheel loads — maximum shear at mid-span', html: String.raw`
<div class="ex">
  <div class="ex-head">Axle loads 18, 40.5, 67.5 and 45 kN at spacings 0.9, 1.8 and 1.8 m cross a 6 m simple beam AC. Find the maximum positive shear at mid-span B.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Influence line (Figure 1): 0 → −0.5 from A to B, jump to +0.5, then 0.5 → 0 at C; slope 1/6 per metre (0.5/3).</li>
      <li>Start with the 18 kN just right of B and move the group left; for each step add the jump (−load crossing B) and the slope effect \(\Sigma P(0.5/3)\Delta x\). The changes stay positive until the 67.5 kN load sits just right of B.</li>
      <li>Critical position: 18 kN at 0.3 m, 40.5 kN at 1.2 m, 67.5 kN at 3 m⁺, 45 kN at 4.8 m:
        $$V_{B,max} = 18(-0.05) + 40.5(-0.2) + 67.5(0.5) + 45(0.2) = 33.8\ \text{kN}$$
        <em>(the Khmer edition prints 37.5 for the 67.5 kN load in this line; its total, 33.8 kN, uses 67.5)</em>.
        <span class="result">V_B,max = 33.8 kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Apply the unit load and draw the influence line before placing any real loads.</li>
  <li>Uniform live load: load only the positive (or only the negative) areas for the maximum of that sign.</li>
  <li>Dead load acts everywhere: its effect = w × net area of the influence line.</li>
</ul>` }
      ]
    }
  ]
});
