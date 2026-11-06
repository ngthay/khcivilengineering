/* Lesson 3 — Response to harmonic loading (Paz & Leigh, Chapter 3) */
KCE_COURSE.lessons.push({
  id: 'harmonic',
  num: 3,
  title: 'Response to Harmonic Loading — Resonance and Vibration Isolation',
  desc: 'Steady-state response of the damped oscillator to F₀ sin ω̄t, the dynamic magnification factor and phase, resonance and the half-power method, rotating unbalance, support motion, transmissibility and the force transmitted to the foundation.',
  icon: '🔁',
  color: 'peach',
  meta: ['Chapter 3', 'Frequency ratio r = ω̄/ω', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Rotating machines, reciprocating engines and vibrating equipment load their supports with a force that repeats harmonically, \(F(t) = F_0\sin\bar\omega t\). The equation of motion</p>
$$m\ddot u + c\dot u + ku = F_0\sin\bar\omega t$$
<p>has a transient part (free vibration, which damping removes) and a <strong>steady-state</strong> part that oscillates at the forcing frequency \(\bar\omega\):</p>
$$u_p = U\sin(\bar\omega t - \theta),\quad U = \frac{u_{st}}{\sqrt{(1-r^2)^2 + (2r\xi)^2}},\quad \tan\theta = \frac{2r\xi}{1-r^2}$$
<p>with \(u_{st} = F_0/k\) and the <strong>frequency ratio</strong> \(r = \bar\omega/\omega\).</p>` },
        { title: 'Description', html: String.raw`
<p>The <strong>dynamic magnification factor</strong> \(D = U/u_{st}\) depends only on r and ξ:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Region</th><th>Behaviour</th></tr></thead>
  <tbody>
    <tr><td>r ≪ 1</td><td>D ≈ 1 — the load acts almost statically, response in phase with the force.</td></tr>
    <tr><td>r ≈ 1 (resonance)</td><td>D = 1/2ξ — large amplitude limited only by damping; θ = 90°.</td></tr>
    <tr><td>r ≫ 1</td><td>D → 0 — the mass cannot follow; response 180° out of phase.</td></tr>
  </tbody>
</table></div>
<p>A machine with an unbalanced mass \(m'\) at eccentricity \(e_0\) produces \(F_0 = m'e_0\bar\omega^2\), so the force grows with speed.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Model the supporting structure as an oscillator: k from the structure, m from the machine (and part of the structure).</li>
  <li>Compute ω, r = ω̄/ω and u_st = F₀/k.</li>
  <li>Amplitude U = D·u_st; internal forces and stresses follow from U (for example V = kU per column).</li>
  <li>Force transmitted to the foundation: \(A_T = F_0 T_r\) with the transmissibility
  $$T_r = \frac{\sqrt{1+(2r\xi)^2}}{\sqrt{(1-r^2)^2+(2r\xi)^2}}$$</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 210" role="img" aria-label="Transmissibility curves">
    <path class="thin" d="M50 180 H490 M50 180 V20"/>
    <text x="470" y="198" class="m">r</text><text x="16" y="28" class="m">T_r</text>
    <path class="dim" d="M50 140 H490"/><text x="20" y="144" class="m">1</text>
    <path class="dim" d="M245 20 V180"/><text x="232" y="198" class="m">√2</text><text x="180" y="198" class="m">1</text>
    <path class="acc" d="M50 140 C120 130 160 40 188 30 C210 25 225 120 245 140 C300 160 380 170 490 175"/>
    <path class="ln" d="M50 140 C120 134 170 100 188 92 C212 84 228 128 245 140 C300 152 380 162 490 168"/>
    <text x="196" y="40" class="a">ξ small</text><text x="110" y="112" class="m">ξ larger</text>
    <text x="300" y="120" class="m">isolation: T_r &lt; 1 for r &gt; √2</text>
  </svg>
  <figcaption>Figure 1 — Transmissibility: all curves pass through T_r = 1 at r = √2; above it, more damping isolates less.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Resonance and the half-power method', html: String.raw`
<p>At resonance the amplitude is \(U = u_{st}/2\xi\), so a measured resonant amplitude gives \(\xi = 1/(2D_{r=1})\). Alternatively, the two frequencies \(f_1, f_2\) where the amplitude is \(1/\sqrt2\) of the peak (the <em>half-power points</em>) give</p>
$$\xi \approx \frac{f_2 - f_1}{f_2 + f_1}$$` },
        { title: 'Support motion and isolation', html: String.raw`
<p>When the support moves as \(u_s = u_0\sin\bar\omega t\), the motion transmitted to the mass, \(U/u_0\), is the same \(T_r\) as the force transmitted from a machine to its foundation. Isolation (\(T_r < 1\)) needs \(r > \sqrt2\): a <strong>soft</strong> mounting with a natural frequency well below the disturbing frequency. Damping limits resonance during start-up but slightly reduces the isolation above \(\sqrt2\).</p>
<div data-widget="harmonic-response" data-title="Harmonic steady state and transmissibility"></div>
<p>The defaults are Example 3.8.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 3.1 — motor on a steel beam', html: String.raw`
<div class="ex">
  <div class="ex-head">A 16,000 lb motor runs at 300 rpm at mid-span of a simple beam (L = 12 ft, I = 128.4 in⁴, E = 30×10⁶ psi). The rotor has an unbalance of 40 lb at e₀ = 10 in; ξ = 10 %. Find the steady-state amplitude.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(k = 48EI/L^3 = 48\times30\times10^6\times128.4/144^3 = 61{,}920\) lb/in; \(\omega = \sqrt{61{,}920/(16{,}000/386)} = 38.65\) rad/s.</li>
      <li>\(\bar\omega = 300\times2\pi/60 = 31.41\) rad/s; \(r = 0.813\).</li>
      <li>\(F_0 = m'e_0\bar\omega^2 = (40/386)(10)(31.41)^2 = 1022\) lb.</li>
      <li>\(U = \dfrac{1022/61{,}920}{\sqrt{(1-0.813^2)^2 + (2\times0.813\times0.1)^2}}\)
        <span class="result">U = 0.044 in</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 3.2 — frame with a rotating machine', html: String.raw`
<div class="ex">
  <div class="ex-head">A 15 ft frame with a rigid girder (15 kip) and two pinned-base W8×20 columns (I = 69.2 in⁴, S = 17 in³) carries F(t) = 200 sin 5.3t lb; ξ = 5 %. Find the amplitude and the maximum column stress.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Pinned-base columns: \(k = 3E(2I)/L^3 = 3\times30\times10^6\times138.4/180^3 = 2136\) lb/in.</li>
      <li>\(\omega = \sqrt{2136\times386/15{,}000} = 7.41\) rad/s; \(r = 5.3/7.41 = 0.715\); \(u_{st} = 200/2136 = 0.0936\) in.</li>
      <li>\(U = 0.0936/\sqrt{(1-0.715^2)^2 + (2\times0.715\times0.05)^2} = 0.189\) in.</li>
      <li>Column shear \(V = 3EIU/L^3 = 202\) lb (book 201.8); \(M = VL \approx 36{,}400\) lb·in (book 36,324).
        <span class="result">σ_max = M/S ≈ 2140 psi</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 3.5 — isolating an instrument', html: String.raw`
<div class="ex">
  <div class="ex-head">A 100 lb instrument on a rubber pad; the floor vibrates at 0.1 g, f = 10 cps. For the rubber k/c = 100 s⁻¹. Find the pad stiffness so that the instrument feels only 0.01 g.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(T_r = 0.01/0.1 = 0.1\). Assume ξ = 0.10: \(\dfrac{1+0.04r^2}{(1-r^2)^2+0.04r^2} = 0.01\) → \(r^2 = 13.35\), \(r = 3.65\).</li>
      <li>\(\bar\omega = 2\pi(10) = 62.83\) rad/s; \(\omega = 62.83/3.65 = 17.2\) rad/s.</li>
      <li>\(k = m\omega^2 = (100/386)(17.2)^2 = 76.6\) lb/in.</li>
      <li>Check the damping: \(c = k/100 = 0.766\); \(c_{cr} = 2\sqrt{76.6\times0.259} = 8.91\); ξ = 0.086 (close to the 0.10 assumed — iterate if desired).
        <span class="result">k ≈ 76.6 lb/in (r = 3.65 ≫ √2)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 3.8 — force transmitted by a piston machine', html: String.raw`
<div class="ex">
  <div class="ex-head">A 3860 lb machine on a simple beam (L = 10 ft, I = 120 in⁴, E = 30,000 ksi) produces F₀ = 7000 lb at ω̄ = 60 rad/s; ξ = 10 %. Find the amplitude, the force on the supports and the phase angle.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(k = 48EI/L^3 = 10^5\) lb/in; \(\omega = \sqrt{10^5/10} = 100\) rad/s; \(r = 0.6\); \(u_{st} = 0.07\) in.</li>
      <li>\(U = 0.07/\sqrt{(1-0.36)^2 + 0.12^2} = 0.1075\) in, \(\theta = 10.6°\).</li>
      <li>\(T_r = \sqrt{1+0.12^2}/\sqrt{0.64^2+0.12^2} = 1.547\) → \(A_T = 7000\times1.547 = 10{,}827\) lb.</li>
      <li>\(\tan\phi = 2\xi r^3/(1-r^2+4\xi^2r^2)\) → φ = 3.78°.
        <span class="result">U = 0.1075 in · A_T = 10,827 lb (more than F₀, because r &lt; √2)</span></li>
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
  <li>Keep the operating frequency away from resonance (0.8 &lt; r &lt; 1.2 is dangerous).</li>
  <li>Unbalance force grows with ω̄² — check every operating speed and the start-up.</li>
  <li>For isolation choose a soft mount with r ≥ 2.5–3.</li>
  <li>Below r = √2 the support force is larger than the machine force.</li>
</ul>` }
      ]
    }
  ]
});
