/* Lesson 4 — Circular motion and simple harmonic motion */
KCE_COURSE.lessons.push({
  id: 'circular-shm',
  num: 4,
  title: 'Circular and Simple Harmonic Motion',
  desc: 'Uniform and uniformly varying circular motion, angular velocity and acceleration, frequency and period, sinusoidal motion.',
  icon: '🔄',
  color: 'sky',
  meta: ['Kinematics §6–7', 'ω · β · T · f', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Circular motion is curvilinear motion with constant radius \(R\). Positions are measured by the angle \(\alpha\) (rad), and the arc length is \(S = R\alpha\). The projection of uniform circular motion on a diameter is <strong>simple harmonic (sinusoidal) motion</strong>.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Angular velocity</th><td>\(\omega = d\alpha/dt\) (rad/s); \(v = R\omega\)</td></tr>
    <tr><th>Angular acceleration</th><td>\(\beta = d\omega/dt\) (rad/s²); \(a_t = R\beta\)</td></tr>
    <tr><th>Centripetal acceleration</th><td>\(a_n = v^2/R = \omega^2R\)</td></tr>
    <tr><th>Frequency, period</th><td>\(f = \omega/2\pi\), \(T = 1/f = 2\pi/\omega\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Get \(\omega(t)\) and \(\beta(t)\) from \(\alpha(t)\) by differentiation.</li>
  <li>Convert to linear quantities with \(R\): \(v = R\omega\), \(a_t = R\beta\), \(a_n = R\omega^2\).</li>
  <li>For SHM write \(x = x_m\sin(\omega t + \varphi)\); find \(x_m\), \(\varphi\) from the initial conditions.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 600 220" role="img" aria-label="Circular motion and its projection">
    <circle class="ln" cx="120" cy="110" r="80"/><circle class="accf" cx="120" cy="110" r="3"/>
    <path class="thin" d="M120 110 L177 53"/><circle class="accf" cx="177" cy="53" r="5"/><text x="183" y="48">M</text>
    <path class="thin" d="M150 110 A 30 30 0 0 0 141 89"/><text x="152" y="100" class="m">α</text>
    <path class="dim" d="M177 53 V110"/><path class="thin" d="M20 110 H220"/>
    <path class="thin" d="M300 110 H580"/><path class="acc" d="M300 110 C 330 40, 360 40, 390 110 S 450 180, 480 110 S 540 40, 570 110"/>
    <text x="300" y="36" class="m">x = xₘ sin(ωt + φ)</text><text x="560" y="128">t</text>
  </svg>
  <figcaption>Figure 1 — Uniform circular motion and its projection, simple harmonic motion.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Circular motion equations', html: String.raw`
<table class="tbl">
  <thead><tr><th>Motion</th><th>Equations</th></tr></thead>
  <tbody>
    <tr><td>Uniform (\(\omega\) const)</td><td>\(\alpha = \omega t + \alpha_0\), \(S = vt + S_0\), \(a = a_n = \omega^2R\)</td></tr>
    <tr><td>Uniformly varying (\(\beta\) const)</td><td>\(\omega = \beta t + \omega_0\), \(\alpha = \tfrac12\beta t^2 + \omega_0t + \alpha_0\), \(\omega^2 - \omega_0^2 = 2\beta(\alpha - \alpha_0)\)</td></tr>
  </tbody>
</table>` },
        { title: 'Simple harmonic motion', html: String.raw`
$$x = x_m\sin(\omega t + \varphi),\quad v = x_m\omega\cos(\omega t + \varphi),\quad a = -\omega^2x$$
$$\ddot x + \omega^2x = 0,\qquad T = \frac{2\pi}{\omega}$$
<p>\(x\) = elongation, \(x_m\) = amplitude, \(\omega\) = angular frequency (pulsation), \(\varphi\) = initial phase.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Exercise 32 — linear from angular', html: String.raw`
<div class="ex">
  <div class="ex-head">A point on a circle of radius 100 cm has ω = 30 rad/s and β = 40 rad/s². Find v and the tangential acceleration.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(R\) = 100 cm = 1 m.</li>
      <li>\(v = \omega R = 30(1) = 30\) m/s; \(a_t = \beta R = 40(1) = 40\) m/s²; \(a_n = \omega^2R = 900\) m/s².
        <span class="result">v = 30 m/s, aₜ = 40 m/s²</span></li>
    </ol>
    <div class="note"><p>The book converts 100 cm to 0.1 m and gets 3 m/s and 4 m/s²; 100 cm = 1 m, so the values above are correct.</p></div>
  </div>
</div>` },
        { title: 'Exercise 33 — θ = 4t² + 3t', html: String.raw`
<div class="ex">
  <div class="ex-head">A wheel turns with θ = 4t² + 3t (rad, s). Find ω and β at t = 4 s, and v and aₜ of a point at R = 1.6 m.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\omega = d\theta/dt = 8t + 3 = 35\) rad/s at \(t\) = 4 s; \(\beta = 8\) rad/s² (constant).</li>
      <li>\(v = \omega R = 35(1.6) = 56\) m/s; \(a_t = \beta R = 8(1.6) = 12.8\) m/s².
        <span class="result">ω = 35 rad/s, β = 8 rad/s², v = 56 m/s, aₜ = 12.8 m/s²</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Exercise 34 — uniform circular motion', html: String.raw`
<div class="ex">
  <div class="ex-head">M moves uniformly on a circle (centre O, radius R) with angular velocity ω, starting on Ox at t = 0.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\theta = \omega t\) → \(x = R\cos\omega t\), \(y = R\sin\omega t\); \(x^2 + y^2 = R^2\) (circle).</li>
      <li>\(\vec v = -R\omega\sin\omega t\,\vec i + R\omega\cos\omega t\,\vec j\) → \(v = R\omega\) (constant).</li>
      <li>\(a_t = 0\); \(a_n = v^2/R = R\omega^2\) towards O.
        <span class="result">v = Rω, a = Rω² centripetal</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Angles in radians; rpm × 2π/60 = rad/s.</li>
  <li>Even uniform circular motion has an acceleration (centripetal).</li>
  <li>In SHM the acceleration is always directed towards the centre and proportional to \(x\).</li>
</ul>` }
      ]
    }
  ]
});
