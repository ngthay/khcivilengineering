/* Lesson 9 — Work, power and energy */
KCE_COURSE.lessons.push({
  id: 'work-energy',
  num: 9,
  title: 'Work, Power and Energy',
  desc: 'Work of a force, power, kinetic and potential energy, the work–energy theorem and conservation of mechanical energy.',
  icon: '🔋',
  color: 'mint',
  meta: ['Dynamics §4–5', 'Energy methods', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Energy methods solve many dynamics problems without finding the acceleration. The <strong>work</strong> done by the forces on a body equals the change in its <strong>kinetic energy</strong>; if only conservative forces (gravity, springs) act, the total <strong>mechanical energy</strong> stays constant.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Work</th><td>\(W_{A\to B} = \int_A^B \vec F\cdot d\vec r\); constant force on a straight path: \(W = F\,AB\cos\alpha\) (J)</td></tr>
    <tr><th>Power</th><td>\(P = dW/dt = \vec F\cdot\vec v = Fv\cos\alpha\) (W)</td></tr>
    <tr><th>Kinetic energy</th><td>Translation \(\tfrac12mv^2\); rotation \(\tfrac12J\omega^2\); rolling \(\tfrac12mv^2 + \tfrac12J\omega^2\)</td></tr>
    <tr><th>Potential energy</th><td>Gravity \(mgh\); spring \(\tfrac12kx^2\); electric \(qV\); torsion \(\tfrac12C\theta^2\)</td></tr>
  </tbody>
</table>
<p>Work is positive (driving) for \(0 \le \alpha < 90°\), zero for \(\alpha = 90°\), negative (resisting) for \(90° < \alpha \le 180°\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose the two positions A and B.</li>
  <li>Kinetic-energy theorem: \(E_C(B) - E_C(A) = \sum W_{A\to B}\) of all forces.</li>
  <li>If only conservative forces work: \(E_M = E_C + E_P\) = constant.</li>
  <li>With friction: \(\Delta E_M = W(\vec f)\) (negative).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Quarter-circle track">
    <path class="ln" d="M80 30 V40 A 150 150 0 0 0 230 190 H420"/>
    <rect class="comp" x="70" y="24" width="20" height="16"/><text x="56" y="22">1</text>
    <rect class="comp" x="222" y="176" width="16" height="14"/><text x="226" y="210">2</text>
    <path class="dim" d="M80 40 V190 H230"/><text x="140" y="206" class="m">r = 1 m</text>
    <text x="270" y="120">Eₚ(1) = mgr → E_c(2) = ½mv₂²</text>
  </svg>
  <figcaption>Figure 1 — Block sliding down a quarter-circle track.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Conservative forces and potential energy', html: String.raw`
$$W_{A\to B} = E_P(A) - E_P(B),\qquad F = -\frac{dE_P}{dr}$$
<p>The work of a conservative force around a closed path is zero. The work of a force perpendicular to the motion (normal reaction, tension in circular motion) is zero.</p>` },
        { title: 'Moment of inertia (for rotational energy)', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><td>Ring or thin hoop about its axis</td><td>\(mr^2\)</td><td>Disc / solid cylinder</td><td>\(\tfrac12mr^2\)</td></tr>
    <tr><td>Solid sphere</td><td>\(\tfrac25mr^2\)</td><td>Rod about its centre</td><td>\(\tfrac1{12}m\ell^2\)</td></tr>
  </tbody>
</table>
<p>Parallel-axis (Huygens) theorem: \(J_\Delta = J_G + md^2\).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Dynamics exercise 4 — work of all forces', html: String.raw`
<div class="ex">
  <div class="ex-head">A 1 kg block is pulled 10 m along a horizontal floor by F = 20 N at 60° to the horizontal; friction f = 2 N. Find the total work.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Weight and normal reaction are perpendicular to the motion → no work.</li>
      <li>\(W = -f\ell + F\ell\cos\alpha = -2(10) + 20(10)(0.5) = 80\) J.
        <span class="result">W = 80 J</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Dynamics exercise 5 — quarter-circle track', html: String.raw`
<div class="ex">
  <div class="ex-head">A 0.5 kg block slides from rest down a quarter circle of radius 1 m (Figure 1). (a) Speed at the bottom without friction. (b) With friction the speed is 3 m/s — find the work of friction.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) \(mgr = \tfrac12mv_2^2\) → \(v_2 = \sqrt{2gr} = \sqrt{2(9.8)(1)} = 4.43\) m/s.</li>
      <li>(b) \(W_f = \tfrac12m(3)^2 - \tfrac12m(4.43)^2 = 2.25 - 4.90 = -2.65\) J.
        <span class="result">v = 4.43 m/s; friction work = −2.65 J</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Dynamics exercise 8 — rolling sphere up an incline', html: String.raw`
<div class="ex">
  <div class="ex-head">A solid sphere of mass 1 kg rolls without slipping at v = 20 m/s and then up a 30° slope. Find its kinetic energy and how far up it rolls (g = 10 m/s²).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(E_C = \tfrac12Mv^2 + \tfrac12\left(\tfrac25MR^2\right)\dfrac{v^2}{R^2} = \tfrac{7}{10}Mv^2 = 280\) J.</li>
      <li>All of it becomes \(mgh\): \(h = 280/(1 × 10) = 28\) m; distance along the slope \(28/\sin 30° = 56\) m.
        <span class="result">E = 280 J; rises 28 m (56 m along the slope)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Include rotational kinetic energy for rolling bodies.</li>
  <li>Normal reactions do no work on a fixed surface.</li>
  <li>Friction work is always negative and equals the loss of mechanical energy.</li>
</ul>` }
      ]
    }
  ]
});
