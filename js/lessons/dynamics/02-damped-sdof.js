/* Lesson 2 — Damped single-degree-of-freedom system (Paz & Leigh, Chapter 2) */
KCE_COURSE.lessons.push({
  id: 'damped-sdof',
  num: 2,
  title: 'Damped Single-Degree-of-Freedom System',
  desc: 'Viscous damping, the equation of motion with damping, critically damped, overdamped and underdamped motion, the damped frequency, and the logarithmic decrement — with the free-vibration test, platform and beam-mounted machine examples.',
  icon: '〰️',
  color: 'sky',
  meta: ['Chapter 2', 'mü + cu̇ + ku = 0', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Real structures stop vibrating because energy is dissipated by friction, cracking, yielding and many other mechanisms. The simplest mathematical model is <strong>viscous damping</strong>: a force proportional to the velocity, \(F_D = c\dot u\), where \(c\) is the damping coefficient (lb·s/in). The equation of free motion becomes</p>
$$m\ddot u + c\dot u + ku = 0$$` },
        { title: 'Description', html: String.raw`
<p>Substituting \(u = Ce^{pt}\) gives \(p = -\frac{c}{2m} \pm \sqrt{\left(\frac{c}{2m}\right)^2 - \frac km}\). The <strong>critical damping</strong> makes the radical zero:</p>
$$c_{cr} = 2\sqrt{km} = 2m\omega,\qquad \xi = \frac{c}{c_{cr}}$$
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Case</th><th>Motion</th></tr></thead>
  <tbody>
    <tr><td>Critically damped, ξ = 1</td><td>Returns to rest fastest without oscillating</td></tr>
    <tr><td>Overdamped, ξ &gt; 1</td><td>Creeps back without oscillating</td></tr>
    <tr><td>Underdamped, ξ &lt; 1</td><td>Oscillates with decaying amplitude — every real structure (ξ ≈ 2–10 %)</td></tr>
  </tbody>
</table></div>` },
        { title: 'Methodology', html: String.raw`
<p>For the underdamped system the free vibration is</p>
$$u(t) = e^{-\xi\omega t}\left(u_0\cos\omega_D t + \frac{v_0 + u_0\xi\omega}{\omega_D}\sin\omega_D t\right),\qquad \omega_D = \omega\sqrt{1-\xi^2}$$
<p>The motion repeats with the <strong>damped period</strong> \(T_D = 2\pi/\omega_D\), and the amplitude decays along the envelope \(Ce^{-\xi\omega t}\). For ξ = 0.2, \(\omega_D = 0.98\,\omega\) — damping hardly changes the frequency of real structures.</p>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="Decaying free vibration">
    <path class="thin" d="M40 100 H500 M40 20 V180"/>
    <path class="acc" d="M40 30 C70 30 80 160 110 160 C140 160 150 50 180 50 C210 50 220 142 250 142 C280 142 290 66 320 66 C350 66 360 128 390 128 C420 128 430 80 460 80 C480 80 490 110 500 110"/>
    <path class="dim" d="M40 30 Q250 70 500 92 M40 170 Q250 130 500 108"/>
    <text x="300" y="40" class="m">envelope C·e^(−ξωt)</text><text x="460" y="120" class="m">t</text><text x="10" y="30" class="m">u</text>
    <text x="95" y="182" class="a">u₁</text><text x="240" y="160" class="a">u₂ (one T_D later)</text>
  </svg>
  <figcaption>Figure 1 — Underdamped free vibration: successive peaks shrink by the same ratio each cycle.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Logarithmic decrement', html: String.raw`
<p>The ratio of two consecutive peaks one damped period apart is constant, so damping is measured from a free-vibration record:</p>
$$\delta = \ln\frac{u_1}{u_2} = \xi\omega T_D = \frac{2\pi\xi}{\sqrt{1-\xi^2}} \approx 2\pi\xi$$
<p>Peak accelerations give the same ratio, and they are easier to record. After \(k\) cycles, \(\ln(u_0/u_k) = k\delta\).</p>
<div data-widget="sdof-vibration" data-title="Damped free vibration"></div>
<p>The defaults are Example 2.1 (W = 10 lb, k = 20 lb/in, ξ = 0.026).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 2.1 — damping from a decay record', html: String.raw`
<div class="ex">
  <div class="ex-head">W = 10 lb on a spring k = 20 lb/in; two consecutive amplitudes are 1.00 and 0.85. Find ω, δ, ξ, c and ω_D.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\omega = \sqrt{20\times386/10} = 27.78\) rad/s, \(f = 4.42\) cps.</li>
      <li>\(\delta = \ln(1.00/0.85) = 0.163\); \(\xi \approx \delta/2\pi = 0.026\).</li>
      <li>\(c = \xi c_{cr} = 2\times0.026\sqrt{10\times20/386} = 0.037\) lb·s/in.</li>
      <li>\(\omega_D = 27.78\sqrt{1-0.026^2} = 27.77\) rad/s.
        <span class="result">ξ = 2.6 % · c = 0.037 lb·s/in · ω_D ≈ ω</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 2.2 — platform on four columns', html: String.raw`
<div class="ex">
  <div class="ex-head">A 4000 lb platform deflects 0.10 in under a horizontal 1000 lb force; damping is 5 % of critical. Find ω, c, δ, and the cycles and time for the amplitude to drop from 0.1 to 0.01 in.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(k = 1000/0.1 = 10{,}000\) lb/in; \(\omega = \sqrt{10{,}000\times386/4000} = 31.06\) rad/s.</li>
      <li>\(c_{cr} = 2\sqrt{10{,}000\times4000/386} = 643.8\) lb·s/in; \(c = 0.05\times643.8 = 32.19\) lb·s/in.</li>
      <li>\(\delta \approx 2\pi(0.05) = 0.314\); \(u_0/u_1 = e^{0.314} = 1.37\).</li>
      <li>\(\ln(0.1/0.01) = 0.314k\) → \(k = 2.303/0.314 = 7.33\) → <strong>8 cycles</strong>. (The book prints 7.73; ln 10 = 2.303, so 7.33 — the answer of 8 cycles is unchanged.)</li>
      <li>\(\omega_D = 31.02\) rad/s, \(T_D = 0.2025\) s; \(t = 8T_D\)
        <span class="result">8 cycles in 1.62 s</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 2.3 — machine on springs on a beam', html: String.raw`
<div class="ex">
  <div class="ex-head">A 1000 lb machine sits on springs k = 2000 lb/in at the centre of a simple beam (EI = 10⁷ lb·in², L = 40 in). Find the equivalent k_E, m_E and c_E for 10 % damping (beam mass neglected).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Beam stiffness at mid-span: \(k_b = 48EI/L^3 = 48\times10^7/40^3 = 7500\) lb/in.</li>
      <li>Springs and beam in series: \(1/k_E = 1/2000 + 1/7500\) → \(k_E = 1579\) lb/in.</li>
      <li>\(m_E = 1000/386 = 2.59\) lb·s²/in; \(c_{cr} = 2\sqrt{1579\times2.59} = 127.9\) lb·s/in.
        <span class="result">k_E = 1579 lb/in · m_E = 2.59 lb·s²/in · c_E = 0.1 × 127.9 = 12.8 lb·s/in</span></li>
    </ol>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Measure damping from the decay of peaks: δ = ln(u₁/u₂), ξ ≈ δ/2π.</li>
  <li>For ξ below about 20 % use ω_D ≈ ω.</li>
  <li>Damping in buildings is usually 2–7 %; never assume it is zero in a resonance check.</li>
  <li>c is in lb·s/in (force per unit velocity); ξ is dimensionless.</li>
</ul>` }
      ]
    }
  ]
});
