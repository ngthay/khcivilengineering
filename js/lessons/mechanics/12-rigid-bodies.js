/* Lesson 12 — Moments, equilibrium and rigid-body motion */
KCE_COURSE.lessons.push({
  id: 'rigid-bodies',
  num: 12,
  title: 'Moments, Equilibrium and Rigid Bodies',
  desc: 'Moment of a force, angular momentum, equilibrium of a particle and a rigid body, rigid-body kinematics and rotation about a fixed axis.',
  icon: '⚙️',
  color: 'lilac',
  meta: ['Dynamics §7–9, §13', 'Statics + rotation', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>rigid body</strong> keeps all distances between its points fixed. Its motion can be translation, rotation about a fixed axis, or both (general plane motion). Forces tend to translate it; their <strong>moments</strong> tend to rotate it. Equilibrium requires both the resultant force and the resultant moment to vanish.</p>` },
        { title: 'Description', html: String.raw`
$$\vec M_O(\vec F) = \overrightarrow{OA}\wedge\vec F,\qquad M_O = Fr\sin\alpha = Fd\ \ (\text{N·m})$$
<p>\(d\) = lever arm (perpendicular distance from O to the line of action). In components: \(M_x = yF_z - zF_y\), \(M_y = zF_x - xF_z\), \(M_z = xF_y - yF_x\).</p>
<p>Angular momentum \(\vec\sigma_A = \vec r\wedge m\vec v\); its rate of change equals the moment of the forces: \(\dfrac{d\vec\sigma_A}{dt} = \vec M_A(\vec F)\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Equilibrium:</strong> \(\sum\vec F = \vec 0\) and \(\sum\vec M = \vec 0\) (in a plane: \(\sum F_x = 0\), \(\sum F_y = 0\), \(\sum M = 0\)).</li>
  <li><strong>Rotation about a fixed axis:</strong> \(\sum M = J\ddot\theta\), plus Newton’s law for each hanging mass.</li>
  <li>Link the linear and angular accelerations through the radii: \(a = R\ddot\theta\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 250" role="img" aria-label="Stepped pulley with two masses">
    <circle class="conc" cx="200" cy="80" r="60"/><circle class="ln" cx="200" cy="80" r="30"/><circle class="accf" cx="200" cy="80" r="3"/>
    <path class="ln" d="M140 80 V190 M230 80 V160"/>
    <rect class="comp" x="124" y="190" width="32" height="32"/><text x="96" y="212">M₁</text>
    <rect class="comp" x="218" y="160" width="24" height="24"/><text x="246" y="178">M₂</text>
    <text x="268" y="40" class="m">R₁ = 0.2 m (M₁ = 20 kg)</text><text x="268" y="62" class="m">R₂ = 0.1 m (M₂ = 50 kg)</text>
    <text x="268" y="90" class="m">J = μρ², μ = 4 kg, ρ = 8 cm</text>
  </svg>
  <figcaption>Figure 1 — Stepped pulley: masses on opposite sides on radii R₁ and R₂.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Kinematics of a rigid body', html: String.raw`
<ul>
  <li><strong>Translation:</strong> all points have the same velocity and acceleration: \(\vec v_B = \vec v_A\).</li>
  <li><strong>Rotation about a fixed axis:</strong> \(\omega = \dot\theta\), \(\beta = \ddot\theta\); a point at radius \(r\): \(\vec v = \vec\omega\wedge\vec r\), \(a_t = \beta r\), \(a_n = \omega^2r\).</li>
  <li><strong>General plane motion:</strong> \(\vec v_B = \vec v_A + \vec\omega\wedge\vec r_{B/A}\), \(\vec a_B = \vec a_A + \vec\beta\wedge\vec r_{B/A} - \omega^2\vec r_{B/A}\).</li>
  <li><strong>Instantaneous centre of rotation (IC):</strong> the point with zero velocity at that instant; every other point moves as if rotating about it, \(\vec v_B = \vec\omega\wedge\vec r_{B/IC}\).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Exercise 40 — stepped pulley', html: String.raw`
<div class="ex">
  <div class="ex-head">A stepped pulley (J = μρ², μ = 4 kg, ρ = 8 cm) carries M₁ = 20 kg on R₁ = 0.2 m and M₂ = 50 kg on R₂ = 0.1 m on opposite sides. Released from rest; g = 9.8 m/s². Find the angular acceleration and the cable tensions.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Masses: \(P_1 - T_1 = M_1R_1\ddot\theta\); \(P_2 - T_2 = -M_2R_2\ddot\theta\). Pulley: \(J\ddot\theta = T_1R_1 - T_2R_2\).</li>
      <li>\(J = 4(0.08)^2 = 0.0256\) kg·m². Eliminating the tensions:
        $$\ddot\theta = \frac{(M_1R_1 - M_2R_2)g}{M_1R_1^2 + M_2R_2^2 + J} = \frac{(4 - 5)(9.8)}{0.8 + 0.5 + 0.0256} = -7.4\ \text{rad/s}^2$$
        (negative: M₂ goes down).</li>
      <li>\(T_1 = M_1(g - R_1\ddot\theta) = 20(9.8 + 1.48) = 225.6\) N; \(T_2 = M_2(g + R_2\ddot\theta) = 50(9.8 - 0.74) = 453\) N.
        <span class="result">θ̈ = 7.4 rad/s² (M₂ descends), T₁ = 225.6 N, T₂ = 453 N</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Take moments about the fixed axis to eliminate its reaction.</li>
  <li>Choose one positive rotation direction and keep it for every equation.</li>
  <li>Check the sign of the answer to see which way the system actually moves.</li>
</ul>` }
      ]
    }
  ]
});
