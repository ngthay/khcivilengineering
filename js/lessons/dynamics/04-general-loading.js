/* Lesson 4 — Response to general dynamic loading (Paz & Leigh, Chapter 4) */
KCE_COURSE.lessons.push({
  id: 'general-loading',
  num: 4,
  title: 'Response to General Dynamic Loading — Duhamel’s Integral and Pulses',
  desc: 'The impulse response and Duhamel’s integral, constant, rectangular and triangular loads, the dynamic load factor and its shock spectrum, base excitation as an effective force, and exact integration for piecewise-linear loads — with the blast-loaded frame example.',
  icon: '💥',
  color: 'amber',
  meta: ['Chapter 4', 'DLF · Duhamel', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A short impulse \(F(\tau)d\tau\) gives the mass a velocity \(F(\tau)d\tau/m\); its free vibration afterwards is \(du = \frac{F(\tau)d\tau}{m\omega}\sin\omega(t-\tau)\). Adding all impulses gives <strong>Duhamel’s integral</strong>:</p>
$$u(t) = \frac{1}{m\omega}\int_0^t F(\tau)\sin\omega(t-\tau)\,d\tau \qquad\text{(undamped)}$$
$$u(t) = \frac{1}{m\omega_D}\int_0^t F(\tau)e^{-\xi\omega(t-\tau)}\sin\omega_D(t-\tau)\,d\tau \qquad\text{(damped)}$$` },
        { title: 'Description', html: String.raw`
<p>The <strong>dynamic load factor</strong> DLF = u(t)/u_st compares the dynamic and static displacement (u_st = F₀/k). Closed forms for the undamped oscillator at rest:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Load</th><th>DLF</th><th>Maximum</th></tr></thead>
  <tbody>
    <tr><td>Constant F₀ (suddenly applied)</td><td>1 − cos ωt</td><td>2</td></tr>
    <tr><td>Rectangular, duration t_d</td><td>1 − cos ωt (t ≤ t_d); cos ω(t − t_d) − cos ωt (t ≥ t_d)</td><td>2 sin(πt_d/T) for t_d/T ≤ ½; 2 otherwise</td></tr>
    <tr><td>Triangular F₀(1 − t/t_d)</td><td>(sin ωt − sin ω(t − t_d))/ωt_d − cos ωt (t ≥ t_d)</td><td>→ 2 for long t_d</td></tr>
  </tbody>
</table></div>
<p>A suddenly applied load doubles the static displacement. The plot of DLF_max against t_d/T is a <strong>response (shock) spectrum</strong>.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Compute T of the structure and the ratio t_d/T.</li>
  <li>Read DLF_max from the spectral chart (or the formulas above).</li>
  <li>u_max = DLF_max × F₀/k; internal forces from u_max.</li>
  <li>For short pulses (t_d/T &lt; 0.4) the peak comes <em>after</em> the load ends — follow the free vibration for about one more period. Damping has little effect on the first peak.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 190" role="img" aria-label="Rectangular and triangular pulses">
    <path class="thin" d="M40 160 H240 M40 160 V30 M290 160 H490 M290 160 V30"/>
    <path class="acc" d="M40 160 V60 H140 V160"/><text x="80" y="52" class="a">F₀</text><text x="132" y="178" class="m">t_d</text>
    <path class="acc" d="M290 60 L390 160"/><path class="acc" d="M290 160 V60"/><text x="296" y="52" class="a">F₀</text><text x="382" y="178" class="m">t_d</text>
    <text x="70" y="22" class="m">rectangular pulse</text><text x="320" y="22" class="m">triangular pulse</text>
  </svg>
  <figcaption>Figure 1 — Two basic impulsive loads.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Base excitation and numerical integration', html: String.raw`
<p>If the support accelerates with \(\ddot u_s(t)\), the motion relative to the base \(u_r = u - u_s\) obeys</p>
$$m\ddot u_r + c\dot u_r + ku_r = -m\ddot u_s(t) = F_{eff}(t)$$
<p>so an earthquake acts like an effective force \(-m\ddot u_s\). For a general record, the load is taken as <strong>linear between points</strong> at Δt; inside each interval the exact solution is (with \(A_i = (F_{i+1}-F_i)/k\Delta t\), \(B_i = (F_i - cA_i)/k\))</p>
$$u = e^{-\xi\omega(t-t_i)}\left[C_i\cos\omega_D(t-t_i) + D_i\sin\omega_D(t-t_i)\right] + B_i + A_i(t-t_i)$$
<p>with \(C_i = u_i - B_i\), \(D_i = (\dot u_i - A_i - \xi\omega C_i)/\omega_D\). Stepping through the intervals gives the full time history (the book’s Program 2).</p>
<div data-widget="pulse-dlf" data-title="Maximum dynamic load factor for a pulse"></div>
<p>The defaults are Example 4.1; switch to 2 for the triangular pulse.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 4.1 — frame under a rectangular blast pulse', html: String.raw`
<div class="ex">
  <div class="ex-head">A one-story frame 15 ft high with two fixed-base steel columns (I = 69.2 in⁴, S = 17 in³, E = 30×10⁶ psi) and a rigid beam carrying W = 5000 lb is hit by a horizontal rectangular pulse of 3000 lb lasting t_d = 0.1 s. Find the maximum displacement and column stress.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(k = 12E(2I)/L^3 = 12\times30\times10^6\times2\times69.2/180^3 = 8544\) lb/in; \(m = 5000/386 = 12.95\) lb·s²/in.</li>
      <li>\(T = 2\pi\sqrt{m/k} = 0.2446\) s; \(t_d/T = 0.408\).</li>
      <li>Chart: DLF_max ≈ 1.9 (exact \(2\sin(0.408\pi) = 1.92\)); \(u_{st} = 3000/8544 = 0.351\) in.</li>
      <li>\(u_{max} = 1.9\times0.351 = 0.667\) in.</li>
      <li>Column moment \(M = 6EIu/L^2 = 6\times30\times10^6\times69.2\times0.667/180^2 = 256{,}400\) lb·in.
        <span class="result">u_max = 0.667 in · σ_max = M/S = 15,080 psi</span></li>
    </ol>
    <p>With the exact DLF of 1.92 the displacement is 0.674 in and the stress about 15,230 psi — chart readings are good to a few percent.</p>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Compare the pulse duration with the natural period: t_d/T controls the DLF.</li>
  <li>A sudden, long load doubles the static effect (DLF = 2).</li>
  <li>For short pulses look for the peak after the load has ended.</li>
  <li>Earthquakes: use −m·ü_s as the effective force on the fixed-base model.</li>
</ul>` }
      ]
    }
  ]
});
