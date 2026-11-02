/* Lesson 8 — Circular dynamics, springs and pendulums */
KCE_COURSE.lessons.push({
  id: 'oscillators',
  num: 8,
  title: 'Circular Dynamics, Springs and Pendulums',
  desc: 'Centripetal force, mass–spring oscillator, conical and simple pendulums, and damped oscillation on an incline.',
  icon: '🕰️',
  color: 'peach',
  meta: ['Dynamics §3', 'Oscillations', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A body in uniform circular motion needs a net inward (centripetal) force. A body attached to a spring, or a pendulum displaced slightly, experiences a restoring force proportional to its displacement and oscillates with simple harmonic motion.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>System</th><th>Equation</th><th>Period</th></tr></thead>
  <tbody>
    <tr><td>Uniform circular motion</td><td>\(F = ma_n = mv^2/R = m\omega^2R\)</td><td>\(2\pi/\omega\)</td></tr>
    <tr><td>Mass–spring (\(F = -kx\))</td><td>\(\ddot x + \frac{k}{m}x = 0\)</td><td>\(T_0 = 2\pi\sqrt{m/k}\)</td></tr>
    <tr><td>Simple pendulum (small \(\alpha\))</td><td>\(\ddot\alpha + \frac{g}{\ell}\alpha = 0\)</td><td>\(T_0 = 2\pi\sqrt{\ell/g}\)</td></tr>
    <tr><td>Conical pendulum</td><td>\(\cos\alpha = g/(\omega^2\ell)\)</td><td>lifts off the axis only if \(\omega \ge \sqrt{g/\ell}\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>At equilibrium find the static extension: \(kx_0 = mg\) (vertical) or \(mg\sin\alpha\) (incline).</li>
  <li>Write Newton’s law for a displacement \(x\) from equilibrium → \(m\ddot x + kx = 0\).</li>
  <li>Solution \(x = x_m\cos(\omega_0t + \varphi)\), \(\omega_0 = \sqrt{k/m}\); constants from the initial conditions.</li>
  <li>With viscous friction \(\vec f = -b\vec v\): \(m\ddot x + b\dot x + kx = 0\) (damped).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 230" role="img" aria-label="Spring and pendulum">
    <path class="thin" d="M60 20 H160"/><path class="ln" d="M110 20 l0 10 l-12 6 l24 10 l-24 10 l24 10 l-24 10 l24 10 l-12 6 l0 10"/>
    <rect class="conc" x="92" y="112" width="36" height="30"/><text x="134" y="132">m</text><text x="120" y="64">k</text>
    <path class="dim" d="M180 127 V200"/><text x="186" y="170">x</text>
    <path class="thin" d="M330 20 H470"/><path class="ln" d="M400 20 L460 150"/><circle class="accf" cx="460" cy="150" r="10"/>
    <path class="dim" d="M400 20 V180"/><path class="thin" d="M400 60 A 40 40 0 0 0 418 56"/><text x="404" y="78" class="m">α</text><text x="436" y="90">ℓ</text>
  </svg>
  <figcaption>Figure 1 — Mass–spring oscillator and simple pendulum.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Spring on an incline (book exercise, collision chapter)', html: String.raw`
<div class="ex">
  <div class="ex-head">A spring of natural length 12 cm stretches to 14 cm when a 0.1 kg mass hangs from it (g = 10 m/s²). (a) Find k. (b) On a frictionless incline the same spring is 11.5 cm long (compressed) at equilibrium — find the incline angle. (c) Find the period of free oscillation.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) \(k(\ell_1 - \ell_0) = mg\) → \(k = \dfrac{0.1 × 10}{0.02} = 50\) N/m.</li>
      <li>(b) Along the incline \(kx = mg\sin\alpha\), \(x\) = 0.5 cm → \(\sin\alpha = \dfrac{50 × 0.005}{0.1 × 10} = 0.25\) → \(\alpha = 14.5°\).</li>
      <li>(c) \(T_0 = 2\pi\sqrt{m/k} = 2\pi\sqrt{0.1/50} = 0.28\) s; released 4.5 cm from equilibrium: \(x = 0.045\cos(\omega_0t)\), \(\omega_0 = 22.4\) rad/s.
        <span class="result">k = 50 N/m, α = 14.5°, T₀ = 0.28 s</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Measure displacement from the <em>equilibrium</em> position — gravity then drops out.</li>
  <li>The period of a mass–spring system does not depend on the amplitude or on g.</li>
  <li>The pendulum formula needs small angles (sin α ≈ α).</li>
</ul>` }
      ]
    }
  ]
});
