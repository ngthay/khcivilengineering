/* Lesson 11 — Displacement method: slope-deflection equations (Chhay/Hibbeler Ch. 11) */
KCE_COURSE.lessons.push({
  id: 'slope-deflection',
  num: 11,
  title: 'Slope-Deflection Method',
  desc: 'Degrees of freedom, the slope-deflection equation and fixed-end moments, analysis of continuous beams and of frames with and without sidesway.',
  icon: '📐',
  color: 'lilac',
  meta: ['Ch. 11', 'Displacement method', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The <strong>displacement method</strong> takes the unknown joint rotations and translations (the <strong>degrees of freedom</strong>) as the primary unknowns. Each member end moment is written in terms of them by the slope-deflection equation; joint equilibrium then gives one equation per unknown. It is the hand version of the stiffness method used by computer programs.</p>` },
        { title: 'Description', html: String.raw`
$$M_N = 2Ek\,(2\theta_N + \theta_F - 3\psi) + (FEM)_N,\qquad k = \frac{I}{L},\quad \psi = \frac{\Delta}{L}$$
<p>N = near end, F = far end. Moments and rotations are positive <strong>clockwise</strong>. If the far end is a pin (moment zero), the modified form is \(M_N = 3Ek(\theta_N - \psi) + (FEM)_N\).</p>
<table class="tbl num">
  <thead><tr><th>Load on a fixed-end span</th><th>FEM at each end</th></tr></thead>
  <tbody>
    <tr><td>Point load P at mid-span</td><td>\(PL/8\)</td></tr>
    <tr><td>Uniform load w</td><td>\(wL^2/12\)</td></tr>
    <tr><td>Triangular load, 0 → w</td><td>\(wL^2/30\) (zero end), \(wL^2/20\) (heavy end)</td></tr>
    <tr><td>Symmetric triangle, peak w at mid-span</td><td>\(5wL^2/96\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Identify the unknown rotations (free joints) and, for frames that can sway, the storey translation Δ.</li>
  <li>Compute the fixed-end moments (FEM) of each span.</li>
  <li>Write the slope-deflection equation for every member end.</li>
  <li>Equilibrium: the end moments at each free joint sum to zero; for sway, the column shears balance the storey force.</li>
  <li>Solve, substitute back for the end moments, then draw the shear and moment diagrams.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 270" role="img" aria-label="Two-span beam of Example 11-1">
    <rect class="conc" x="30" y="40" width="14" height="50"/><path class="ln" d="M44 65 H504"/>
    <polygon class="ln" points="306,65 298,80 314,80"/><rect class="conc" x="504" y="40" width="14" height="50"/>
    <path class="acc" d="M306 64 L504 20 V64"/><text x="460" y="16">6 kN/m</text>
    <text x="38" y="108">A</text><text x="302" y="98">B</text><text x="504" y="108">C</text>
    <text x="170" y="98" class="m">8 m</text><text x="400" y="98" class="m">6 m</text>
    <path class="thin" d="M44 170 H504"/>
    <polyline class="acc" points="44.0,160.7 306.9,188.5 306.9,188.5 315.1,182.0 323.3,175.5 331.5,169.3 339.7,163.3 347.9,157.7 356.1,152.5 364.4,148.0 372.6,144.1 380.8,140.9 389.0,138.6 397.2,137.2 405.4,136.8 413.6,137.6 421.9,139.6 430.1,142.9 438.3,147.6 446.5,153.8 454.7,161.6 462.9,171.1 471.1,182.4 479.4,195.5 487.6,210.6 495.8,227.8 504.0,247.1"/>
    <text x="8" y="164" class="m">1.54</text><text x="286" y="206" class="m">−3.09</text><text x="400" y="128" class="m">5.53</text><text x="470" y="262" class="m">−12.86</text><text x="516" y="174" class="m">M</text>
  </svg>
  <figcaption>Figure 1 — Example 11-1: A and C fixed, roller at B; moment diagram in kN·m.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Frames with sidesway', html: String.raw`
<p>A frame sways when its geometry or loading is not symmetric and there is no brace. All columns of a storey move by the same Δ, so each gets \(\psi = \Delta/h\). The extra equation is horizontal equilibrium: the sum of column shears \(V = -(M_{top} + M_{bottom})/h\) equals the applied storey force.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 11-1 — continuous beam', html: String.raw`
<div class="ex">
  <div class="ex-head">Draw the moment diagram of the beam in Figure 1: AB = 8 m, BC = 6 m with a triangular load rising from 0 at B to 6 kN/m at C. EI constant.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>FEM: \((FEM)_{BC} = -wL^2/30 = -6(36)/30 = -7.2\) kN·m, \((FEM)_{CB} = wL^2/20 = 10.8\) kN·m. Only \(\theta_B\) is unknown (\(\theta_A = \theta_C = 0\), \(\psi = 0\)).</li>
      <li>\(M_{AB} = \tfrac{EI}{4}\theta_B\), \(M_{BA} = \tfrac{EI}{2}\theta_B\), \(M_{BC} = \tfrac{2EI}{3}\theta_B - 7.2\), \(M_{CB} = \tfrac{EI}{3}\theta_B + 10.8\).</li>
      <li>Joint B: \(M_{BA} + M_{BC} = 0\) → \(\tfrac{7EI}{6}\theta_B = 7.2\) → \(EI\theta_B = 6.17\).</li>
      <li>\(M_{AB} = 1.54\), \(M_{BA} = 3.09\), \(M_{BC} = -3.09\), \(M_{CB} = 12.86\) kN·m. Reactions: \(A_y = 0.579\) kN (down), \(B_y = 4.95\) kN, \(C_y = 13.63\) kN.</li>
      <li>Maximum in BC: \(V = 4.37 - x^2/2 = 0\) → \(x = 2.96\) m from B; \(M = -3.09 + 4.37(2.96) - 2.96^3/6 = 5.53\) kN·m <em>(the Khmer edition shows 5.47)</em>.
        <span class="result">M_A = 1.54 kN·m, M_B = −3.09 kN·m, M_C = −12.86 kN·m; max span BC moment 5.53 kN·m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 11-5 — frame without sidesway', html: String.raw`
<div class="ex">
  <div class="ex-head">A symmetric portal frame: columns AB and DC 12 m high (fixed at A and D), beam BC 8 m carrying a symmetric triangular load with peak 24 kN/m at mid-span. EI constant. Find the moments at the joints.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\((FEM)_{BC} = -5wL^2/96 = -5(24)(64)/96 = -80\) kN·m, \((FEM)_{CB} = +80\). Symmetric → no sway, \(\psi = 0\).</li>
      <li>\(M_{AB} = 0.1667EI\theta_B\), \(M_{BA} = 0.333EI\theta_B\), \(M_{BC} = 0.5EI\theta_B + 0.25EI\theta_C - 80\), \(M_{CB} = 0.5EI\theta_C + 0.25EI\theta_B + 80\), \(M_{CD} = 0.333EI\theta_C\).</li>
      <li>Joints: \(M_{BA} + M_{BC} = 0\), \(M_{CB} + M_{CD} = 0\) → \(EI\theta_B = 137.1\), \(EI\theta_C = -137.1\).
        <span class="result">M_A = 22.9 kN·m, M_B = M_C = 45.7 kN·m; mid-span moment wL²/12 − 45.7 = 128 − 45.7 = 82.3 kN·m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Clockwise end moments and rotations are positive in the slope-deflection equation.</li>
  <li>One equilibrium equation per unknown: joint moments for θ, storey shear for Δ.</li>
  <li>Check: the end moments at every free joint must add to zero (or to the applied couple).</li>
</ul>` }
      ]
    }
  ]
});
