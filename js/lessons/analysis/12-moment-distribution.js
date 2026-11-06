/* Lesson 12 — Displacement method: moment distribution (Chhay/Hibbeler Ch. 12) */
KCE_COURSE.lessons.push({
  id: 'moment-distribution',
  num: 12,
  title: 'Moment Distribution',
  desc: 'Stiffness, distribution and carry-over factors, the Hardy Cross procedure for continuous beams, modified stiffness for pinned ends and symmetry, and frames with and without sidesway.',
  icon: '🔁',
  color: 'amber',
  meta: ['Ch. 12', 'Hardy Cross', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Moment distribution</strong> (Hardy Cross, 1930) solves the slope-deflection equations by successive approximation, without writing them. Every joint is first locked; then the joints are released one at a time, the unbalanced moment is shared among the members by their stiffness, and half of each share is carried over to the far end. The cycles converge quickly.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Member stiffness factor</th><td>\(K = 4EI/L\) (far end fixed)</td></tr>
    <tr><th>Joint stiffness factor</th><td>\(K_T = \sum K\) of the members at the joint</td></tr>
    <tr><th>Distribution factor</th><td>\(DF = K/\sum K\); \(DF = 0\) at a fixed support, \(DF = 1\) at a pin or roller end</td></tr>
    <tr><th>Carry-over factor</th><td>\(+\tfrac12\) to a fixed far end (prismatic member)</td></tr>
  </tbody>
</table>
<p>Sign convention: clockwise moments on the member ends are positive (as in slope-deflection).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Compute the distribution factors at every joint and the fixed-end moments of every span.</li>
  <li>Unlock each joint: distribute the negative of its unbalanced moment in proportion to the DFs.</li>
  <li>Carry over half of each distributed moment to the far end of the member.</li>
  <li>Repeat distribute → carry-over until the carry-overs are negligible; sum each column for the final end moments.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 170" role="img" aria-label="Three-span beam of Example 12-1">
    <rect class="conc" x="26" y="50" width="14" height="50"/><path class="ln" d="M40 75 H500"/><rect class="conc" x="500" y="50" width="14" height="50"/>
    <polygon class="ln" points="212,75 204,90 220,90"/><polygon class="ln" points="385,75 377,90 393,90"/>
    <g class="acc"><path d="M212 40 H385 M212 40 V72 M241 40 V72 M270 40 V72 M299 40 V72 M328 40 V72 M357 40 V72 M385 40 V72"/></g><text x="270" y="32">20 kN/m</text>
    <path class="acc" d="M442 26 V71"/><polygon class="accf" points="442,74 437,64 447,64"/><text x="450" y="34">250 kN</text>
    <text x="30" y="118">A</text><text x="208" y="108">B</text><text x="381" y="108">C</text><text x="502" y="118">D</text>
    <text x="110" y="140" class="m">12 m</text><text x="284" y="140" class="m">12 m</text><text x="414" y="140" class="m">4 m + 4 m</text>
  </svg>
  <figcaption>Figure 1 — Example 12-1: A and D fixed, rollers at B and C, EI constant.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Stiffness-factor modifications', html: String.raw`
<table class="tbl">
  <thead><tr><th>Case</th><th>Stiffness K</th><th>Carry-over</th></tr></thead>
  <tbody>
    <tr><td>Far end fixed</td><td>\(4EI/L\)</td><td>½</td></tr>
    <tr><td>Far end pinned (end span)</td><td>\(3EI/L\)</td><td>0</td></tr>
    <tr><td>Symmetric beam and load (centre span)</td><td>\(2EI/L\)</td><td>—</td></tr>
    <tr><td>Antisymmetric loading (centre span)</td><td>\(6EI/L\)</td><td>—</td></tr>
  </tbody>
</table>
<p>With a pinned end span, first release the pin once and carry over to the interior joint, then use \(3EI/L\) for that span.</p>` },
        { title: 'Frames with sidesway', html: String.raw`
<p>Analyse in two stages: (1) prevent sway with an imaginary support, distribute, and find the holding force \(R\); (2) allow an arbitrary sway, e.g. assume column FEMs of 100 kN·m (\(M = 6EI\Delta/L^2\)), distribute and find the force \(R'\) it needs. The final moments are stage 1 + \((R/R')\) × stage 2.</p>
<div data-widget="continuous-beam" data-title="Continuous beam solver — check your moment distribution"></div>
<p><em>The default values reproduce Example 12-1. The solver gives the exact stiffness solution, so it may differ from a hand table in the last decimal.</em></p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 12-1 — three-span beam', html: String.raw`
<div class="ex">
  <div class="ex-head">Find the internal moments at each support of the beam in Figure 1.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Stiffness: \(K_{AB} = K_{BC} = 4EI/12\), \(K_{CD} = 4EI/8\). DFs: \(DF_{BA} = DF_{BC} = 0.5\); \(DF_{CB} = \dfrac{4EI/12}{4EI/12 + 4EI/8} = 0.4\), \(DF_{CD} = 0.6\); fixed ends 0.</li>
      <li>FEMs: \((FEM)_{BC} = -20(12)^2/12 = -240\), \((FEM)_{CB} = 240\); \((FEM)_{CD} = -250(8)/8 = -250\), \((FEM)_{DC} = 250\) kN·m.</li>
      <li>Distribution table (kN·m):
        <div class="tbl-wrap"><table class="tbl num">
          <thead><tr><th>Joint</th><th>A</th><th colspan="2">B</th><th colspan="2">C</th><th>D</th></tr>
            <tr><th>Member</th><th>AB</th><th>BA</th><th>BC</th><th>CB</th><th>CD</th><th>DC</th></tr></thead>
          <tbody>
            <tr><th>DF</th><td>0</td><td>0.5</td><td>0.5</td><td>0.4</td><td>0.6</td><td>0</td></tr>
            <tr><th>FEM</th><td></td><td></td><td>−240</td><td>240</td><td>−250</td><td>250</td></tr>
            <tr><th>Dist.</th><td></td><td>120</td><td>120</td><td>4</td><td>6</td><td></td></tr>
            <tr><th>CO</th><td>60</td><td></td><td>2</td><td>60</td><td></td><td>3</td></tr>
            <tr><th>Dist.</th><td></td><td>−1</td><td>−1</td><td>−24</td><td>−36</td><td></td></tr>
            <tr><th>CO</th><td>−0.5</td><td></td><td>−12</td><td>−0.5</td><td></td><td>−18</td></tr>
            <tr><th>Dist.</th><td></td><td>6</td><td>6</td><td>0.2</td><td>0.3</td><td></td></tr>
            <tr><th>CO</th><td>3</td><td></td><td>0.1</td><td>3</td><td></td><td>0.2</td></tr>
            <tr><th>Dist.</th><td></td><td>−0.05</td><td>−0.05</td><td>−1.2</td><td>−1.8</td><td></td></tr>
            <tr><th>CO</th><td>−0.02</td><td></td><td>−0.6</td><td>−0.02</td><td></td><td>−0.9</td></tr>
            <tr><th>Dist.</th><td></td><td>0.3</td><td>0.3</td><td>0.01</td><td>0.01</td><td></td></tr>
            <tr><th>ΣM</th><td>62.5</td><td>125.2</td><td>−125.2</td><td>281.5</td><td>−281.5</td><td>234.3</td></tr>
          </tbody>
        </table></div></li>
      <li>Reactions (statics on each span): \(A_y = 15.6\) kN down, \(B_y = 122.6\) kN, \(C_y = 263.9\) kN, \(D_y = 119.1\) kN.
        <span class="result">Beam moments: M_A = +62.5 (unloaded span AB bends the other way), M_B = −125.2, M_C = −281.5, M_D = −234.3 kN·m; max sagging in BC ≈ 161 kN·m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Distribution factors at each joint add up to 1.</li>
  <li>After the last distribution every interior joint is balanced (ΣM = 0).</li>
  <li>Use the modified stiffness 3EI/L at pinned ends to save cycles.</li>
</ul>` }
      ]
    }
  ]
});
