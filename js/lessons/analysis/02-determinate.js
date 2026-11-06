/* Lesson 2 — Analysis of statically determinate structures (Chhay/Hibbeler Ch. 2) */
KCE_COURSE.lessons.push({
  id: 'determinate',
  num: 2,
  title: 'Statically Determinate Structures',
  desc: 'Idealised supports and joints, tributary loading, superposition, equations of equilibrium, determinacy and stability, and support reactions of beams and frames.',
  icon: '⚖️',
  color: 'mint',
  meta: ['Ch. 2', 'ΣF = 0, ΣM = 0', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>To analyse a real structure we replace it by an <strong>idealised model</strong>: members become lines, connections become pins or fixed joints, and supports become rollers, pins or fixed supports. If the three equations of equilibrium are enough to find every reaction and internal force, the structure is <strong>statically determinate</strong>.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Support</th><th>Prevents</th><th>Unknowns</th></tr></thead>
  <tbody>
    <tr><td>Roller / rocker / smooth surface</td><td>Movement perpendicular to the surface</td><td>1 force</td></tr>
    <tr><td>Pin (hinge)</td><td>Translation in any direction</td><td>2 forces</td></tr>
    <tr><td>Fixed</td><td>Translation and rotation</td><td>2 forces + 1 moment</td></tr>
    <tr><td>Internal hinge</td><td>Relative translation (moment = 0)</td><td>2 forces</td></tr>
  </tbody>
</table>
<p><strong>Tributary loading:</strong> a slab with \(L_2/L_1 > 2\) acts as <em>one-way</em> — load goes to the long beams on strips of width \(L_1/2\). If \(L_2/L_1 \le 2\) it is <em>two-way</em>: 45° lines from the corners give triangular loads on the short beams and trapezoidal loads on the long beams.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Draw the free-body diagram of the whole structure and, when needed, of each part; resolve inclined and distributed loads into components and resultants.</li>
  <li>Count unknowns \(r\) and equations \(3n\) (\(n\) = number of parts): \(r = 3n\) determinate, \(r > 3n\) indeterminate to degree \(r - 3n\).</li>
  <li>Check stability: reactions must not be all concurrent or all parallel, and \(r \ge 3n\).</li>
  <li>Take moments about a point where several unknowns meet to get one unknown per equation, then use \(\sum F_x = 0\), \(\sum F_y = 0\).</li>
  <li>A negative answer means the assumed sense was wrong; keep the sign when it is substituted into later equations.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 230" role="img" aria-label="Pinned frame of Example 2-12">
    <path class="ln" d="M80 190 L240 70 H420"/>
    <polygon class="ln" points="80,190 68,210 92,210"/><circle class="ln" cx="240" cy="70" r="6"/>
    <rect class="conc" x="420" y="50" width="16" height="40"/>
    <path class="acc" d="M178 54 L204 89"/><polygon class="accf" points="208,94 198,89 206,83"/><text x="140" y="52">8 kN</text>
    <g class="acc"><path d="M260 40 V64 M300 40 V64 M340 40 V64 M380 40 V64 M420 40 V64 M240 40 H420"/></g><text x="300" y="30">3 kN/m</text>
    <path class="dim" d="M80 218 H240 M240 70 V190 M240 200 H420"/>
    <text x="150" y="230" class="m">2 m</text><text x="250" y="140" class="m">1.5 m</text><text x="320" y="215" class="m">2 m</text>
    <text x="64" y="186">A</text><text x="230" y="62">B</text><text x="444" y="74">C</text>
  </svg>
  <figcaption>Figure 1 — Example 2-12: members AB and BC joined by a pin at B; load 8 kN perpendicular to AB at 2 m from A.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Superposition and equilibrium', html: String.raw`
<p><strong>Principle of superposition:</strong> the total displacement or internal force at a point equals the sum of those caused by each load separately — valid when the material is linear elastic (Hooke’s law) and displacements are small so the geometry does not change.</p>
$$\sum F_x = 0,\qquad \sum F_y = 0,\qquad \sum M_O = 0$$
<p>These apply to the whole structure, to any part of it, and to any member or joint.</p>` },
        { title: 'Determinacy and stability', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>\(r = 3n\)</th><td>Statically determinate (if stable)</td></tr>
    <tr><th>\(r > 3n\)</th><td>Statically indeterminate, degree \(r - 3n\)</td></tr>
    <tr><th>\(r < 3n\)</th><td>Unstable — a mechanism</td></tr>
  </tbody>
</table>
<p>Even with \(r \ge 3n\) a structure is <strong>geometrically unstable</strong> if all reactions are concurrent (they cannot resist a moment about that point) or all parallel (they cannot resist a force across them).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 2-8 — cantilever with a trapezoidal load', html: String.raw`
<div class="ex">
  <div class="ex-head">A 12 m cantilever fixed at A carries a linearly varying load from 15 kN/m at A to 5 kN/m at the free end. Find the reactions at A.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Split the load: rectangle \(5(12) = 60\) kN at 6 m from A; triangle \(\tfrac12(10)(12) = 60\) kN at 4 m from A.</li>
      <li>\(\sum F_x = 0\): \(A_x = 0\). \(\sum F_y = 0\): \(A_y - 60 - 60 = 0\) → \(A_y = 120\) kN.</li>
      <li>\(\sum M_A = 0\): \(M_A - 60(4) - 60(6) = 0\) → \(M_A = 600\) kN·m.
        <span class="result">A_y = 120 kN, M_A = 600 kN·m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 2-12 — three-hinged frame', html: String.raw`
<div class="ex">
  <div class="ex-head">Find the horizontal and vertical reactions at pins A, B and C of the frame in Figure 1.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Member BC (6 kN resultant at its mid-point): \(\sum M_C = 0\): \(-B_y(2) + 6(1) = 0\) → \(B_y = 3\) kN.</li>
      <li>Member AB (length 2.5 m; the 8 kN load has components \(\tfrac35\) and \(\tfrac45\)):
        \(\sum M_A = 0\): \(-8(2) - 3(2) + B_x(1.5) = 0\) → \(B_x = 14.7\) kN.</li>
      <li>\(\sum F_x = 0\): \(A_x + \tfrac35(8) - 14.7 = 0\) → \(A_x = 9.87\) kN. \(\sum F_y = 0\): \(A_y - \tfrac45(8) - 3 = 0\) → \(A_y = 9.40\) kN.</li>
      <li>Member BC: \(C_x = B_x = 14.7\) kN; \(3 - 6 + C_y = 0\) → \(C_y = 3\) kN.
        <span class="result">A = (9.87, 9.40) kN · B = (14.7, 3) kN · C = (14.7, 3) kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Count unknowns before solving — know whether statics alone will work.</li>
  <li>At an internal pin, the forces on the two members are equal and opposite.</li>
  <li>Use one spare equation (e.g. \(\sum M\) about another point) to check the answers.</li>
</ul>` }
      ]
    }
  ]
});
