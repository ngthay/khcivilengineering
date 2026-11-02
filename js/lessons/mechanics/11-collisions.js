/* Lesson 11 — Impulse and collisions */
KCE_COURSE.lessons.push({
  id: 'collisions',
  num: 11,
  title: 'Impulse and Collisions',
  desc: 'Impulse, conservation of momentum, elastic, inelastic and perfectly inelastic collisions, and oblique collisions.',
  icon: '🎱',
  color: 'amber',
  meta: ['Dynamics §12', 'Momentum', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>During a collision large internal forces act for a very short time. They are equal and opposite (3rd law), so the total <strong>momentum</strong> of the colliding bodies is conserved. Whether kinetic energy is also conserved depends on the type of collision.</p>` },
        { title: 'Description', html: String.raw`
$$\vec I = \Delta\vec p = \int_{t_1}^{t_2}\vec F\,dt,\qquad m_1\vec v_1 + m_2\vec v_2 = m_1\vec v_1' + m_2\vec v_2'$$
<table class="tbl">
  <thead><tr><th>Collision</th><th>Momentum</th><th>Kinetic energy</th></tr></thead>
  <tbody>
    <tr><td>Elastic</td><td>conserved</td><td>conserved</td></tr>
    <tr><td>Inelastic (\(0 < e < 1\))</td><td>conserved</td><td>partly lost</td></tr>
    <tr><td>Perfectly inelastic (stick together, \(e = 0\))</td><td>conserved</td><td>maximum loss</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the velocities just before impact (often from energy conservation).</li>
  <li>Apply momentum conservation (vector, or along each axis).</li>
  <li>Add the restitution condition \(v_2' - v_1' = -e(v_2 - v_1)\).</li>
  <li>After impact, continue with energy or Newton’s law.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 160" role="img" aria-label="Head-on collision">
    <circle class="conc" cx="90" cy="80" r="26"/><text x="82" y="85">m₁</text>
    <path class="acc" d="M120 80 H180"/><polygon class="accf" points="182,80 172,75 172,85"/><text x="140" y="70">v₁</text>
    <rect class="conc" x="220" y="54" width="52" height="52"/><text x="236" y="85">m₂</text>
    <path class="thin" d="M310 80 H330"/><polygon class="accf" points="332,80 322,75 322,85"/>
    <circle class="conc" cx="390" cy="80" r="26"/><rect class="conc" x="416" y="54" width="52" height="52"/>
    <path class="acc" d="M480 80 H540"/><polygon class="accf" points="542,80 532,75 532,85"/><text x="496" y="70">v′</text>
    <text x="370" y="140" class="m">perfectly inelastic: move together</text>
  </svg>
  <figcaption>Figure 1 — Before and after a perfectly inelastic head-on collision.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Velocities after a head-on collision', html: String.raw`
<p><strong>Elastic:</strong></p>
$$v_1' = \frac{2m_2v_2 + v_1(m_1 - m_2)}{m_1 + m_2},\qquad v_2' = \frac{2m_1v_1 + v_2(m_2 - m_1)}{m_1 + m_2}$$
<p><strong>Inelastic</strong> (coefficient of restitution \(e\)):</p>
$$v_1' = \frac{m_2(1 + e)v_2 + (m_1 - em_2)v_1}{m_1 + m_2},\qquad v_2' = \frac{m_1(1 + e)v_1 + (m_2 - em_1)v_2}{m_1 + m_2}$$
<p><strong>Perfectly inelastic:</strong> \(v' = \dfrac{m_1v_1 + m_2v_2}{m_1 + m_2}\); energy lost \(\Delta E_C = -\tfrac12\mu(v_1 - v_2)^2\) with \(\mu = \dfrac{m_1m_2}{m_1 + m_2}\).</p>
<p><strong>Oblique elastic collision</strong> with \(m_2\) at rest: momentum is conserved as a vector and \(\tfrac12m_1v_1^2 = \tfrac12m_1v_1'^2 + \tfrac12m_2v_2'^2\); for example \(v_2' = \dfrac{2m_1v_1}{m_1 + m_2}\cos\theta_2\).</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Block slides down, sticks, and compresses a spring', html: String.raw`
<div class="ex">
  <div class="ex-head">S₁ (m₁ = 50 g) slides from rest down a frictionless incline AB = 1 m at 30°, then hits S₂ (m₂ = 200 g) at rest; they stick together and the combination is stopped by a spring k = 50 N/m. g = 10 m/s².</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Speed at B (energy): \(m_1g\,AB\sin\alpha = \tfrac12m_1v_1^2\) → \(v_1 = \sqrt{2(10)(1)(0.5)} = \sqrt{10} = 3.16\) m/s.</li>
      <li>Perfectly inelastic impact: \(v_G = \dfrac{m_1v_1}{m_1 + m_2} = \dfrac{0.05(3.16)}{0.25} = 0.63\) m/s.</li>
      <li>Then SHM with \(\omega_0 = \sqrt{k/(m_1 + m_2)} = \sqrt{200} = 14.14\) rad/s; amplitude \(x_m = v_G/\omega_0 = 0.63/14.14 = 0.044\) m.
        <span class="result">v₁ = 3.16 m/s, v_G = 0.63 m/s, spring compressed 4.4 cm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Momentum is conserved in every collision; kinetic energy only in elastic ones.</li>
  <li>Use energy before and after the impact, momentum across it.</li>
  <li>Keep velocity signs consistent along the chosen axis.</li>
</ul>` }
      ]
    }
  ]
});
