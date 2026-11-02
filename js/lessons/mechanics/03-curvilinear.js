/* Lesson 3 — Motion in space and curvilinear motion */
KCE_COURSE.lessons.push({
  id: 'curvilinear',
  num: 3,
  title: 'Motion in Space and Curvilinear Motion',
  desc: 'Position, velocity and acceleration vectors; trajectory; tangential and normal acceleration; radius of curvature.',
  icon: '〰️',
  color: 'lilac',
  meta: ['Kinematics §4–5', 'Vectors', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>In space, the position of a point M is the vector \(\vec r = \overrightarrow{OM} = x\vec i + y\vec j + z\vec k\). Its velocity is always <strong>tangent</strong> to the trajectory; its acceleration has a <strong>tangential</strong> part (change of speed) and a <strong>normal</strong> part (change of direction).</p>` },
        { title: 'Description', html: String.raw`
$$\vec v = \frac{d\vec r}{dt} = \dot x\vec i + \dot y\vec j + \dot z\vec k,\qquad \vec a = \frac{d\vec v}{dt} = \ddot x\vec i + \ddot y\vec j + \ddot z\vec k$$
$$v = \sqrt{\dot x^2 + \dot y^2 + \dot z^2},\qquad a = \sqrt{\ddot x^2 + \ddot y^2 + \ddot z^2}$$
<p>Average velocity \(\vec v_m = \Delta\vec r/\Delta t\); average acceleration \(\vec a_m = \Delta\vec v/\Delta t\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Write the parametric equations \(x(t)\), \(y(t)\), \(z(t)\).</li>
  <li>Eliminate \(t\) to get the trajectory equation.</li>
  <li>Differentiate for \(\vec v\) and \(\vec a\); split \(\vec a\) into \(a_t = dv/dt\) and \(a_n = v^2/\rho\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 230" role="img" aria-label="Tangential and normal acceleration">
    <path class="acc" d="M40 190 Q 220 20 520 150"/>
    <circle class="accf" cx="260" cy="88" r="5"/><text x="246" y="80">M</text>
    <path class="ln" d="M260 88 L380 70"/><polygon class="accf" points="382,70 371,66 373,76"/><text x="386" y="70">v (tangent)</text>
    <path class="ln" d="M260 88 L330 79"/><text x="300" y="60" class="m">aₜ = dv/dt · u</text>
    <path class="ln" d="M260 88 L272 168"/><polygon class="accf" points="272,170 266,160 278,159"/><text x="278" y="178" class="m">aₙ = v²/ρ · n</text>
    <path class="dim" d="M260 88 L280 220"/><text x="290" y="214" class="m">ρ to centre of curvature</text>
  </svg>
  <figcaption>Figure 1 — Frenet frame: unit tangent u and unit normal n; a = aₜu + aₙn.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Intrinsic (Frenet) components', html: String.raw`
<p>With the arc length \(S(t)\) along the curve and unit vectors \(\vec u\) (tangent) and \(\vec n\) (towards the centre of curvature):</p>
$$\vec v = \frac{dS}{dt}\vec u,\qquad \vec a = \frac{dv}{dt}\vec u + \frac{v^2}{\rho}\vec n,\qquad a = \sqrt{\left(\frac{dv}{dt}\right)^2 + \left(\frac{v^2}{\rho}\right)^2}$$
<p>Angular velocity \(\omega = \dot\alpha = v/\rho\), so \(a_n = \rho\omega^2\). Radius of curvature of \(y = f(x)\):</p>
$$\rho = \frac{\left[1 + \left(\dfrac{dy}{dx}\right)^2\right]^{3/2}}{\left|\dfrac{d^2y}{dx^2}\right|}$$
<ul>
  <li>\(\rho \to \infty\): straight-line motion (\(a_n = 0\)); \(\rho\) constant: circular motion.</li>
  <li>\(a_t\cdot v > 0\): speeding up; \(a_t\cdot v < 0\): slowing down.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Exercise 35 — trajectory from the velocity', html: String.raw`
<div class="ex">
  <div class="ex-head">The velocity components of a point are ẋ = 2 sin t, ẏ = cos t (m/s). At t = 0 it is on Ox at x = 2 m. Find the position and the trajectory.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(x = \int 2\sin t\,dt = -2\cos t + C\); \(x(0) = 2\) → \(C = 4\): \(x = 4 - 2\cos t\).</li>
      <li>\(y = \int\cos t\,dt = \sin t\) (with \(y(0) = 0\)).</li>
      <li>Eliminate \(t\): \(\cos t = (4 - x)/2\), \(\sin t = y\) → \(\left(\dfrac{4 - x}{2}\right)^2 + y^2 = 1\), i.e. \(4y^2 + (4 - x)^2 = 4\).
        <span class="result">Elliptical trajectory centred at (4, 0), semi-axes 2 m and 1 m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Velocity is tangent to the path; acceleration points to the inside of the curve.</li>
  <li>Use the initial conditions to fix integration constants.</li>
  <li>Uniform motion on a curve still has \(a_n = v^2/\rho \ne 0\).</li>
</ul>` }
      ]
    }
  ]
});
