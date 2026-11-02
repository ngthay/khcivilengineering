/* Lesson 5 — Projectile motion */
KCE_COURSE.lessons.push({
  id: 'projectiles',
  num: 5,
  title: 'Projectile Motion',
  desc: 'Horizontal and oblique launch, trajectory equation, range and maximum height, with aircraft-drop examples.',
  icon: '🎯',
  color: 'amber',
  meta: ['Kinematics §9', '2-D motion', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A projectile moves under gravity alone. Its motion splits into two independent motions: <strong>uniform</strong> along the horizontal (\(a_x = 0\)) and <strong>uniformly accelerated</strong> along the vertical (\(a_y = -g\)). The trajectory is a parabola.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Axis</th><th>Initial conditions</th><th>Acceleration</th><th>Velocity</th><th>Position</th></tr></thead>
  <tbody>
    <tr><td>Ox</td><td>\(x_0 = 0\), \(v_{0x} = v_0\cos\alpha\)</td><td>0</td><td>\(v_x = v_0\cos\alpha\)</td><td>\(x = v_0\cos\alpha\,t\)</td></tr>
    <tr><td>Oy</td><td>\(y_0 = 0\), \(v_{0y} = v_0\sin\alpha\)</td><td>\(-g\)</td><td>\(v_y = -gt + v_0\sin\alpha\)</td><td>\(y = -\tfrac12gt^2 + v_0\sin\alpha\,t\)</td></tr>
  </tbody>
</table>
<p>Horizontal launch: \(\alpha = 0\), so \(y = -\tfrac12gt^2\) and the trajectory is \(y = -\dfrac{g x^2}{2v_0^2}\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Put the origin at the launch point; resolve \(v_0\) into components.</li>
  <li>Write \(x(t)\), \(y(t)\); eliminate \(t\) for the trajectory.</li>
  <li>Time of flight from \(y = \) landing height; range from \(x\) at that time.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 600 230" role="img" aria-label="Projectile trajectory">
    <path class="thin" d="M40 200 H570 M40 200 V20"/>
    <path class="acc" d="M40 200 Q 290 -60 540 200"/>
    <path class="ln" d="M40 200 L120 130"/><polygon class="accf" points="122,128 111,131 116,139"/><text x="96" y="124">v₀</text>
    <path class="thin" d="M80 200 A 40 40 0 0 0 70 174"/><text x="84" y="188" class="m">α</text>
    <path class="dim" d="M290 70 V200"/><text x="296" y="140">Yₘ = v₀² sin²α / 2g</text>
    <path class="thin" d="M40 215 H540"/><text x="230" y="228">d = v₀² sin 2α / g</text>
  </svg>
  <figcaption>Figure 1 — Oblique launch: parabolic path, maximum height and range on level ground.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Trajectory, range and height', html: String.raw`
$$y = -\frac{g}{2v_0^2\cos^2\alpha}x^2 + x\tan\alpha$$
$$d = \frac{v_0^2\sin 2\alpha}{g},\qquad Y_m = \frac{v_0^2\sin^2\alpha}{2g}$$
<p>The range is largest at \(\alpha = 45°\); complementary angles (e.g. 30° and 60°) give the same range.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Exercise 59 — velocity at 45°', html: String.raw`
<div class="ex">
  <div class="ex-head">A stone thrown horizontally has its velocity at 45° to the horizontal 5 s later. Find its speed then (g = 10 m/s²).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>At 45°: \(v_x = v_y\), so \(v = v_y\sqrt2\).</li>
      <li>\(v_y = gt = 10(5) = 50\) m/s → \(v = 50\sqrt2 = 70.7\) m/s (and \(v_0 = v_x = 50\) m/s).
        <span class="result">v = 70.7 m/s</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Exercise 60 — dropping a package from an aircraft', html: String.raw`
<div class="ex">
  <div class="ex-head">(A) An aircraft flying horizontally at h = 7840 m and 450 km/h drops a package. (B) At h = 1960 m, what speed puts the package 200 m from the release point (horizontally)? g = 9.8 m/s².</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(A) Time of fall: \(t = \sqrt{2h/g} = \sqrt{2(7840)/9.8} = 40\) s.</li>
      <li>Horizontal distance: \(v_0 = 450\) km/h = 125 m/s → \(x = 125 × 40 = 5000\) m = 5 km. The aircraft is directly above the package when it lands.</li>
      <li>(B) \(y = \dfrac{g}{2v_0^2}x^2\) → \(v_0 = \sqrt{\dfrac{4.9 × 200^2}{1960}} = 10\) m/s = 36 km/h.
        <span class="result">(A) 40 s, 5 km; (B) v₀ = 10 m/s (36 km/h) — too slow for an aircraft</span></li>
    </ol>
    <div class="note"><p>The question in the book prints the height as 8740 m but the solution uses 7840 m, which gives the 40 s quoted.</p></div>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Horizontal velocity is constant; only the vertical velocity changes.</li>
  <li>Same time \(t\) in both component equations.</li>
  <li>Use the landing height (not always \(y = 0\)) to find the flight time.</li>
</ul>` }
      ]
    }
  ]
});
