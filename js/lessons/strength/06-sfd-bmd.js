/* Lesson 6 — Shear force and bending moment (Bansal, Ch. 6) */
KCE_COURSE.lessons.push({
  id: 'sfd-bmd',
  num: 6,
  title: 'Shear Force and Bending Moment Diagrams',
  desc: 'Beam and load types, sign conventions, SFD and BMD for cantilevers, simply supported and overhanging beams, and load–shear–moment relations.',
  icon: '📊',
  color: 'sky',
  meta: ['Bansal Ch. 6', 'Beams', 'Statics'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>At any section of a beam the part on one side is held in equilibrium by a <strong>shear force</strong> \(F\) (algebraic sum of vertical forces on one side) and a <strong>bending moment</strong> \(M\) (algebraic sum of moments of those forces about the section). Plotting them along the beam gives the SFD and BMD, which locate the critical sections for design.</p>` },
        { title: 'Description', html: String.raw`
<ul>
  <li><strong>Beams:</strong> cantilever, simply supported, overhanging, fixed, continuous.</li>
  <li><strong>Loads:</strong> point load, uniformly distributed load (UDL), uniformly varying load (UVL), couple.</li>
  <li><strong>Sign convention:</strong> shear positive when the left part tends to move up relative to the right; bending moment positive when sagging.</li>
</ul>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the support reactions from \(\sum F_y = 0\) and \(\sum M = 0\).</li>
  <li>Compute \(F\) just left and right of every load; join with straight lines (point loads) or sloping lines (UDL).</li>
  <li>Compute \(M\) at supports, loads and the point of zero shear — the maximum bending moment is where the shear changes sign.</li>
  <li>Points of contraflexure are where \(M = 0\) inside the span.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 660 345" role="img" aria-label="SFD and BMD of the worked example">
    <path class="ln" d="M40 60 H620"/><polygon class="ln" points="40,60 30,78 50,78"/><circle class="ln" cx="620" cy="70" r="9"/>
    <path class="acc" d="M156 20 V58 M388 20 V58"/><polygon class="accf" points="156,58 151,48 161,48"/><polygon class="accf" points="388,58 383,48 393,48"/>
    <path class="thin" d="M156 40 h232 M156 40 v18 M388 40 v18"/><text x="230" y="36">10 kN/m</text>
    <text x="134" y="16">50 kN</text><text x="366" y="16">40 kN</text>
    <text x="26" y="96">RA = 80</text><text x="590" y="96">RB = 50</text>
    <text x="90" y="74" class="m">2 m</text><text x="260" y="74" class="m">4 m</text><text x="490" y="74" class="m">4 m</text>
    <path class="thin" d="M40 170 H620"/>
    <path class="acc" d="M40 170 V130 H156 V155 L388 175 V195 H620 V170"/>
    <text x="80" y="124" class="m">+80</text><text x="160" y="150" class="m">+30</text><text x="330" y="190" class="m">−10</text><text x="500" y="210" class="m">−50</text>
    <text x="296" y="165" class="m">0 at x = 5 m</text><text x="630" y="174" class="m">SFD</text>
    <path class="thin" d="M40 230 H620"/>
    <polyline class="acc" points="40.0,230.0 54.5,239.0 69.0,248.0 83.5,257.0 98.0,266.0 112.5,275.0 127.0,284.0 141.5,293.0 156.0,302.0 170.5,305.2 185.0,308.2 199.5,310.9 214.0,313.2 228.5,315.4 243.0,317.2 257.5,318.7 272.0,320.0 286.5,321.0 301.0,321.7 315.5,322.1 330.0,322.2 344.5,322.1 359.0,321.7 373.5,321.0 388.0,320.0 402.5,314.4 417.0,308.8 431.5,303.1 446.0,297.5 460.5,291.9 475.0,286.2 489.5,280.6 504.0,275.0 518.5,269.4 533.0,263.8 547.5,258.1 562.0,252.5 576.5,246.9 591.0,241.2 605.5,235.6 620.0,230.0"/>
    <text x="128" y="318" class="m">160</text><text x="300" y="338" class="m">205 max</text><text x="396" y="328" class="m">200</text><text x="630" y="234" class="m">BMD (kN·m)</text>
  </svg>
  <figcaption>Figure 1 — Problem 6.12: SFD and BMD (bending moment drawn downward = sagging).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Standard cases', html: String.raw`
<table class="tbl">
  <thead><tr><th>Beam and load</th><th>Max shear</th><th>Max moment</th></tr></thead>
  <tbody>
    <tr><td>Cantilever, \(W\) at free end</td><td>\(W\)</td><td>\(WL\) at support</td></tr>
    <tr><td>Cantilever, UDL \(w\)</td><td>\(wL\)</td><td>\(wL^2/2\)</td></tr>
    <tr><td>Cantilever, UVL 0 → \(w\) at support</td><td>\(wL/2\)</td><td>\(wL^2/6\)</td></tr>
    <tr><td>Simply supported, \(W\) at mid-span</td><td>\(W/2\)</td><td>\(WL/4\)</td></tr>
    <tr><td>Simply supported, \(W\) at \(a\) from A</td><td>\(Wb/L\)</td><td>\(Wab/L\)</td></tr>
    <tr><td>Simply supported, UDL \(w\)</td><td>\(wL/2\)</td><td>\(wL^2/8\)</td></tr>
    <tr><td>Simply supported, UVL 0 → \(w\) at centre → 0</td><td>\(wL/4\)</td><td>\(wL^2/12\)</td></tr>
    <tr><td>Simply supported, UVL 0 → \(w\) at B</td><td>\(wL/3\) at B</td><td>\(wL^2/(9\sqrt3)\) at \(L/\sqrt3\)</td></tr>
  </tbody>
</table>` },
        { title: 'Load, shear and moment relations', html: String.raw`
$$\frac{dF}{dx} = -w,\qquad \frac{dM}{dx} = F$$
<p>So the slope of the BMD equals the shear force, \(M\) is maximum where \(F = 0\), and the change in \(M\) between two points equals the area of the SFD between them.</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Problem 6.12 — point loads and UDL', html: String.raw`
<div class="ex">
  <div class="ex-head">Simply supported beam, 10 m span: 50 kN at 2 m from A, UDL 10 kN/m from 2 m to 6 m, 40 kN at 6 m. Draw SFD and BMD and find the maximum BM.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\sum M_A = 0\): \(10R_B = 50(2) + 40(4) + 40(6) = 500\) → \(R_B = 50\) kN; \(R_A = 130 - 50 = 80\) kN.</li>
      <li>Shear: +80 from A to C; 30 just right of C; falls by 10 kN/m to \(-10\) just left of D; \(-50\) from D to B.</li>
      <li>Zero shear between C and D: \(80 - 50 - 10(x - 2) = 0\) → \(x = 5\) m.</li>
      <li>\(M_C = 80 × 2 = 160\) kN·m; \(M_D = 80(6) - 50(4) - 40(2) = 200\) kN·m; \(M_E = 80(5) - 50(3) - 10(3)(1.5) = 205\) kN·m.
        <span class="result">Maximum BM = 205 kN·m at 5 m from A</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Check reactions: their sum equals the total load.</li>
  <li>The SFD jumps by the value of each point load; the BMD has a kink there.</li>
  <li>Maximum BM is where the shear crosses zero; check both ends of overhangs too.</li>
</ul>` }
      ]
    }
  ]
});
