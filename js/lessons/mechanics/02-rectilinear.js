/* Lesson 2 — Rectilinear motion */
KCE_COURSE.lessons.push({
  id: 'rectilinear',
  num: 2,
  title: 'Rectilinear Motion',
  desc: 'Position, velocity and acceleration on a line; uniform and uniformly accelerated motion; average speed and free fall.',
  icon: '➡️',
  color: 'mint',
  meta: ['Kinematics §1–3, §8', 'Particle on a line', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Kinematics</strong> describes motion without asking what causes it. For a point moving on a straight line \(x'Ox\), the motion is known once the <strong>time equation</strong> \(x = x(t)\) is known; velocity and acceleration follow by differentiation.</p>` },
        { title: 'Description', html: String.raw`
$$v = \frac{dx}{dt} = \dot x,\qquad a = \frac{dv}{dt} = \frac{d^2x}{dt^2} = \ddot x,\qquad a = v\frac{dv}{dx}$$
<p>Conversely \(v = \int a\,dt\), \(x = \int v\,dt\), and \(\int v\,dv = \int a\,dx\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose an origin, a positive direction and \(t = 0\).</li>
  <li>Write the initial conditions \(x_0\), \(v_0\).</li>
  <li>Use the formula set for the type of motion (uniform or uniformly varying).</li>
  <li>Accelerating if \(a\cdot v > 0\); decelerating if \(a\cdot v < 0\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 200" role="img" aria-label="Position-time graphs">
    <path class="thin" d="M40 170 H290 M40 170 V20"/><path class="acc" d="M40 130 L280 40"/><text x="150" y="190" class="m">uniform: x = v₀t + x₀</text><text x="20" y="134">x₀</text>
    <path class="thin" d="M360 170 H610 M360 170 V20"/><path class="acc" d="M360 150 Q 450 170 600 30"/><text x="410" y="190" class="m">uniformly accelerated: parabola</text>
    <text x="276" y="186">t</text><text x="600" y="186">t</text><text x="26" y="30">x</text><text x="346" y="30">x</text>
  </svg>
  <figcaption>Figure 1 — x–t graphs: a straight line for uniform motion, a parabola for uniformly accelerated motion.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Uniform and uniformly varying motion', html: String.raw`
<table class="tbl">
  <thead><tr><th>Motion</th><th>Acceleration</th><th>Velocity</th><th>Position</th></tr></thead>
  <tbody>
    <tr><td>Uniform rectilinear</td><td>\(a = 0\)</td><td>\(v = v_0\)</td><td>\(x = v_0t + x_0\)</td></tr>
    <tr><td>Uniformly varying</td><td>\(a\) = const</td><td>\(v = at + v_0\)</td><td>\(x = \tfrac12at^2 + v_0t + x_0\)</td></tr>
  </tbody>
</table>
$$v^2 - v_0^2 = 2a(x - x_0)\quad(\text{independent of time})$$` },
        { title: 'Free fall', html: String.raw`
<p>Air resistance neglected, axis \(Oz\) downward, \(a = g\):</p>
$$z = \tfrac12gt^2 + v_0t,\qquad v = gt + v_0,\qquad v^2 - v_0^2 = 2gz$$
<p>Released from rest: \(v = \sqrt{2gz}\). Thrown upward with \(v_0\): use \(v_0\) negative (or the axis upward with \(a = -g\)).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Exercises 5–6 — average speed', html: String.raw`
<div class="ex">
  <div class="ex-head">A car travels at v₁ = 80 km/h and then v₂ = 40 km/h. Find the average speed if (a) each speed lasts half the time, (b) each speed covers half the distance.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) \(x = v_1\tfrac t2 + v_2\tfrac t2\) → \(v_m = \tfrac12(v_1 + v_2) = 60\) km/h.</li>
      <li>(b) \(t = \dfrac{x/2}{v_1} + \dfrac{x/2}{v_2}\) → \(v_m = \dfrac{2v_1v_2}{v_1 + v_2} = \dfrac{2(80)(40)}{120} = 53.3\) km/h.
        <span class="result">60 km/h (equal times), 53.3 km/h (equal distances)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Exercise 8 — time equation x = 3t² − 2t', html: String.raw`
<div class="ex">
  <div class="ex-head">A particle moves with x = 3t² − 2t (SI). Find the average velocity between t = 0 and 1 s, the initial velocity, the acceleration, and describe the motion.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\Delta x = x(1) - x(0) = 1\) m in 1 s → \(v_m = 1\) m/s.</li>
      <li>\(v = 6t - 2\) → \(v_0 = -2\) m/s; \(a = 6\) m/s² (uniformly varying).</li>
      <li>\(v = 0\) at \(t = \tfrac13\) s, where \(x = -\tfrac13\) m (vertex of the parabola): decelerating before, accelerating after.
        <span class="result">vm = 1 m/s, v₀ = −2 m/s, a = 6 m/s², turns back at t = 1/3 s</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Exercise 51 — distance in the nth second of free fall', html: String.raw`
<div class="ex">
  <div class="ex-head">A body falls from rest. Find the distance it travels during the nth second.</div>
  <div class="ex-body">
    <p>\(x_n - x_{n-1} = \tfrac12gn^2 - \tfrac12g(n - 1)^2 = g\left(n - \tfrac12\right)\). For the 3rd second: \(9.8(2.5) = 24.5\) m.</p>
    <span class="result">Δx = g(n − ½) — 24.5 m in the 3rd second</span>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Average speed is total distance ÷ total time, not the average of speeds.</li>
  <li>Fix the sign convention before writing \(v_0\) and \(a\).</li>
  <li>Use \(v^2 - v_0^2 = 2a\Delta x\) when time is not given.</li>
</ul>` }
      ]
    }
  ]
});
