/* Lesson 15 — Torsion of shafts and springs (Bansal, Ch. 16) */
KCE_COURSE.lessons.push({
  id: 'torsion',
  num: 15,
  title: 'Torsion of Shafts and Springs',
  desc: 'Torsion equation, solid and hollow shafts, power transmission, composite shafts, combined bending and torsion, close-coiled springs.',
  icon: '🌀',
  color: 'sky',
  meta: ['Bansal Ch. 16', 'T/J = τ/R = Cθ/L', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A shaft twisted by a torque \(T\) develops shear stresses that grow linearly from zero at the centre to a maximum at the surface, and the shaft twists through an angle \(\theta\) along its length. The book uses \(C\) (or \(G\)) for the modulus of rigidity.</p>` },
        { title: 'Description', html: String.raw`
$$\frac{T}{J} = \frac{\tau}{R} = \frac{C\theta}{L}$$
<table class="tbl">
  <tbody>
    <tr><th>Polar moment \(J\)</th><td>Solid: \(\pi D^4/32\); hollow: \(\pi(D_o^4 - D_i^4)/32\)</td></tr>
    <tr><th>Torque capacity</th><td>Solid: \(T = \dfrac{\pi}{16}\tau D^3\); hollow: \(T = \dfrac{\pi}{16}\tau\dfrac{D_o^4 - D_i^4}{D_o}\)</td></tr>
    <tr><th>Power</th><td>\(P = \dfrac{2\pi NT}{60}\) W (\(N\) in rpm, \(T\) in N·m)</td></tr>
    <tr><th>Torsional rigidity</th><td>\(CJ\) — torque per radian of twist per unit length</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the design torque from the power and speed (use the maximum torque if given as a ratio to the mean).</li>
  <li>Size the shaft for the permissible shear stress; check the angle of twist.</li>
  <li>Composite shafts: equal twist, torques add; shafts in series: same torque, twists add.</li>
  <li>Combined bending and torsion: use the equivalent moments below.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 600 200" role="img" aria-label="Shaft in torsion">
    <rect class="conc" x="60" y="60" width="380" height="80" rx="40"/>
    <ellipse class="ln" cx="440" cy="100" rx="20" ry="40"/>
    <path class="acc" d="M40 70 A 30 30 0 0 0 40 130"/><polygon class="accf" points="40,130 34,120 46,122"/>
    <path class="acc" d="M470 70 A 30 30 0 0 1 470 130"/><polygon class="accf" points="470,70 464,80 476,78"/>
    <text x="20" y="60">T</text><text x="480" y="60">T</text>
    <path class="dim" d="M60 100 L440 116"/><text x="250" y="96" class="m">θ</text>
    <path class="thin" d="M520 60 V140"/><path class="acc" d="M520 100 L560 60 M520 100 L480 140"/><text x="540" y="56" class="m">τmax at R</text>
  </svg>
  <figcaption>Figure 1 — Shaft under torque: shear stress linear with radius; twist θ over length L.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Combined bending and torsion', html: String.raw`
$$\sigma_{1,2} = \frac{16}{\pi D^3}\left(M \pm \sqrt{M^2 + T^2}\right),\qquad \tau_{max} = \frac{16}{\pi D^3}\sqrt{M^2 + T^2}$$
<p>Equivalent bending moment \(M_e = \tfrac12\left(M + \sqrt{M^2 + T^2}\right)\); equivalent torque \(T_e = \sqrt{M^2 + T^2}\). The principal planes are at \(\theta\) with \(\tan 2\theta = T/M\).</p>` },
        { title: 'Close-coiled helical springs', html: String.raw`
<p>Mean radius \(R\), wire diameter \(d\), \(n\) turns, axial load \(W\):</p>
$$\tau = \frac{16WR}{\pi d^3},\qquad \delta = \frac{64WR^3n}{Cd^4},\qquad \text{stiffness } k = \frac{W}{\delta} = \frac{Cd^4}{64R^3n}$$` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Problem 16.25 — composite shaft (corrected)', html: String.raw`
<div class="ex">
  <div class="ex-head">Copper rod Ø30 mm inside a steel tube 50 mm outside, 10 mm thick, welded together at both ends; torque 1000 N·m; C_steel = 2 C_copper. Find the stresses.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(J_c = \frac{\pi}{32}(30)^4 = 79\,522\) mm⁴; \(J_s = \frac{\pi}{32}(50^4 - 30^4) = \frac{\pi}{32}(544×10^4) = 534\,071\) mm⁴.</li>
      <li>Equal twist: \(\dfrac{T_c}{J_cC_c} = \dfrac{T_s}{J_sC_s}\) → \(T_c = \dfrac{J_c}{2J_s}T_s = 0.0744\,T_s\).</li>
      <li>\(T_c + T_s = 10^6\) N·mm → \(T_s = 930\,710\) N·mm, \(T_c = 69\,290\) N·mm.</li>
      <li>\(\tau_c = T_cR/J_c = 69\,290(15)/79\,522 = 13.1\) N/mm²; \(\tau_s = 930\,710(25)/534\,071 = 43.6\) N/mm².
        <span class="result">τ copper = 13.1 N/mm², τ steel = 43.6 N/mm²</span></li>
    </ol>
    <div class="warn"><p>The book writes \(50^4\) as \(125×10^4\) (it is \(625×10^4\)), so it gets \(J_s\) far too small and reports 90.4 and 301.4 N/mm². The corrected values are above.</p></div>
  </div>
</div>` },
        { title: 'Problem 16.26 — combined bending and torsion', html: String.raw`
<div class="ex">
  <div class="ex-head">Solid shaft Ø80 mm with twisting moment 8 MN·mm and bending moment 5 MN·mm at a point. Find the principal stresses and their planes.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\dfrac{16}{\pi D^3} = \dfrac{16}{\pi(80)^3} = 9.95×10^{-6}\) mm⁻³; \(\sqrt{M^2 + T^2} = 9.434×10^6\) N·mm.</li>
      <li>\(\sigma_1 = 9.95×10^{-6}(5 + 9.434)×10^6 = 143.6\) N/mm²; \(\sigma_2 = 9.95×10^{-6}(5 - 9.434)×10^6 = -44.1\) N/mm².</li>
      <li>\(\tau_{max} = 93.8\) N/mm²; \(\tan 2\theta = 8/5\) → \(\theta = 29.0°\) and 119.0°.
        <span class="result">σ₁ = 143.6, σ₂ = −44.1 N/mm²; planes at 29° and 119°</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Convert power to torque: \(T = 60P/(2\pi N)\).</li>
  <li>Hollow shafts are lighter for the same strength.</li>
  <li>Check both shear stress and angle of twist.</li>
  <li>For shafts with bending, use \(\sqrt{M^2 + T^2}\).</li>
</ul>` }
      ]
    }
  ]
});
