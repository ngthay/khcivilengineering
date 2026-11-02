/* Lesson 6 — Relative motion, dependent motion, polar coordinates */
KCE_COURSE.lessons.push({
  id: 'relative-polar',
  num: 6,
  title: 'Relative Motion, Dependent Motion and Polar Coordinates',
  desc: 'Velocity and acceleration relative to a moving frame, Coriolis acceleration, pulley-linked motion and radial/transverse components.',
  icon: '🧭',
  color: 'violet',
  meta: ['Kinematics §10–12', 'Frames of reference', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Motion depends on the observer. If point A carries a moving frame \(Ax'y'z'\), the position, velocity and acceleration of B relative to the fixed frame are those of A plus those of B relative to A. Points linked by a cable move in a <strong>dependent</strong> way, and some motions are easiest in <strong>polar coordinates</strong> \((r, \theta)\).</p>` },
        { title: 'Description', html: String.raw`
$$\vec r_B = \vec r_A + \vec r_{B/A},\qquad \vec v_B = \vec v_A + \vec v_{B/A},\qquad \vec a_B = \vec a_A + \vec a_{B/A}\quad(\text{translating frame})$$
<p>\(\vec v_A\) is the <em>transport (drive) velocity</em> and \(\vec a_A\) the transport acceleration.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Identify the fixed frame, the moving frame and the point.</li>
  <li>Add vectors (draw the velocity triangle).</li>
  <li>For a rotating frame add the \(\vec\omega \wedge \overrightarrow{AB}\) terms and the Coriolis acceleration.</li>
  <li>For pulleys write the constant cable length and differentiate.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 220" role="img" aria-label="Polar components">
    <path class="thin" d="M40 190 H300 M40 190 V20"/>
    <path class="ln" d="M40 190 L210 90"/><circle class="accf" cx="210" cy="90" r="5"/><text x="214" y="84">M</text>
    <path class="acc" d="M210 90 L262 60"/><polygon class="accf" points="264,59 253,59 258,68"/><text x="266" y="58">uᵣ</text>
    <path class="acc" d="M210 90 L180 38"/><polygon class="accf" points="179,36 178,47 187,42"/><text x="160" y="32">u_θ</text>
    <path class="thin" d="M90 190 A 50 50 0 0 0 83 165"/><text x="96" y="176" class="m">θ</text><text x="110" y="132">r</text>
    <text x="330" y="70">v = ṙ uᵣ + rθ̇ u_θ</text>
    <text x="330" y="110">aᵣ = r̈ − rθ̇²</text><text x="330" y="140">a_θ = 2ṙθ̇ + rθ̈</text>
  </svg>
  <figcaption>Figure 1 — Radial and transverse (orthoradial) unit vectors and components.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Rotating frame and Coriolis', html: String.raw`
<p>If the moving frame also rotates with angular velocity \(\vec\omega\):</p>
$$\vec v_B = \vec v_A + \vec\omega \wedge \overrightarrow{AB} + \vec v_{B/A}$$
$$\vec a_B = \vec a_A + \frac{d\vec\omega}{dt}\wedge\overrightarrow{AB} + \vec\omega\wedge(\vec\omega\wedge\overrightarrow{AB}) + 2\vec\omega\wedge\vec v_{B/A} + \vec a_{B/A}$$
<p>The term \(\vec a_C = 2\vec\omega \wedge \vec v_{B/A}\) is the <strong>Coriolis acceleration</strong>.</p>` },
        { title: 'Dependent motion', html: String.raw`
<p>For two blocks hung from a pulley system with an inextensible cable, the cable length gives \(x_A + x_B = \) constant (or \(2x_A + x_B\) = const for a movable pulley). Differentiating: \(v_A = -v_B\), \(a_A = -a_B\) — when A rises, B falls.</p>` },
        { title: 'Polar coordinates', html: String.raw`
$$\overrightarrow{OM} = r\vec u_r,\qquad \vec v = \dot r\vec u_r + r\dot\theta\vec u_\theta,\qquad v = \sqrt{\dot r^2 + (r\dot\theta)^2}$$
$$\vec a = (\ddot r - r\dot\theta^2)\vec u_r + (2\dot r\dot\theta + r\ddot\theta)\vec u_\theta,\qquad a_\theta = \frac1r\frac{d}{dt}(r^2\dot\theta)$$
<p>Cartesian link: \(x = r\cos\theta\), \(y = r\sin\theta\).</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Boat crossing a current', html: String.raw`
<div class="ex">
  <div class="ex-head">A boat heads north at 40 km/h relative to the water; the river flows east at 30 km/h. Find the boat’s velocity relative to the bank.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\vec v_{boat} = \vec v_{water} + \vec v_{boat/water}\); the two vectors are perpendicular.</li>
      <li>\(v = \sqrt{40^2 + 30^2} = 50\) km/h; \(\tan\phi = 30/40\) → \(\phi = 36.9°\) east of north.
        <span class="result">50 km/h at 36.9° east of north</span></li>
    </ol>
    <div class="note"><p>This example was written for the lesson (the book’s relative-velocity exercises use the same vector triangle).</p></div>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Write the subscripts carefully: \(\vec v_{B/A} = \vec v_B - \vec v_A\).</li>
  <li>Coriolis appears only in rotating frames and only if \(\vec v_{B/A} \ne 0\).</li>
  <li>In polar coordinates the radial acceleration includes \(-r\dot\theta^2\).</li>
</ul>` }
      ]
    }
  ]
});
