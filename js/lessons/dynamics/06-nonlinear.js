/* Lesson 6 — Nonlinear structural response (Paz & Leigh, Chapter 6) */
KCE_COURSE.lessons.push({
  id: 'nonlinear',
  num: 6,
  title: 'Nonlinear Response — Step-by-Step Integration of an Elastoplastic System',
  desc: 'The incremental equation of motion with tangent stiffness, the linear acceleration and Newmark β methods, elastoplastic behaviour with loading and unloading, and the complete step-by-step algorithm — reproducing the book’s Table 6.1.',
  icon: '🪢',
  color: 'mint',
  meta: ['Chapter 6', 'Linear acceleration', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>In a strong earthquake or blast, members yield: the restoring force is no longer \(ku\) and superposition (Duhamel, modal analysis) no longer applies. The equation of motion is solved <strong>step by step</strong> in time, assuming the properties stay constant inside each short interval Δt:</p>
$$m\,\Delta\ddot u_i + c_i\,\Delta\dot u_i + k_i\,\Delta u_i = \Delta F_i$$
<p>where \(k_i\) is the tangent stiffness at the start of the step (k when elastic, 0 when yielding).</p>` },
        { title: 'Description', html: String.raw`
<p><strong>Linear acceleration method.</strong> The acceleration varies linearly within Δt. Eliminating \(\Delta\ddot u\) and \(\Delta\dot u\) gives a static-looking equation:</p>
$$\bar k_i\,\Delta u_i = \Delta\bar F_i$$
$$\bar k_i = k_i + \frac{6}{\Delta t^2}m + \frac{3}{\Delta t}c_i,\qquad \Delta\bar F_i = \Delta F_i + \left(\frac{6}{\Delta t}m + 3c_i\right)\dot u_i + \left(3m + \frac{\Delta t}{2}c_i\right)\ddot u_i$$
$$\Delta\dot u_i = \frac{3}{\Delta t}\Delta u_i - 3\dot u_i - \frac{\Delta t}{2}\ddot u_i$$
<p>The method is only conditionally stable (Δt &lt; about T/10 is advisable). <strong>Newmark’s β method</strong> generalises it: β = 1/6 is linear acceleration, β = 1/4 (constant average acceleration) is unconditionally stable.</p>` },
        { title: 'Methodology', html: String.raw`
<p><strong>Elastoplastic algorithm</strong> (yield force R_t in tension, R_c in compression; yield points u_t = R_t/k, u_c = R_c/k):</p>
<ol>
  <li>Set u₀ = u̇₀ = 0, ü₀ = F(0)/m. KEY = 0 elastic, 1 yielding in tension, −1 yielding in compression.</li>
  <li>Each step: k_p = k (KEY = 0) or 0; compute \(\bar k\), \(\Delta\bar F\), Δu, Δu̇, then u and u̇ at the end.</li>
  <li>Update KEY: elastic → yield if u &gt; u_t (or &lt; u_c); yielding → elastic when the velocity reverses, with new limits \(u_t = u_{max}\), \(u_c = u_{max} - (R_t - R_c)/k\) (and the mirror case).</li>
  <li>Restoring force R = R_t − (u_t − u)k when elastic, R_t or R_c when plastic.</li>
  <li>Acceleration from equilibrium at the end of the step: \(\ddot u_{i+1} = [F(t_{i+1}) - c\dot u_{i+1} - R]/m\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 210" role="img" aria-label="Elastoplastic force-displacement loop">
    <path class="thin" d="M40 110 H490 M260 20 V200"/><text x="470" y="128" class="m">u</text><text x="268" y="28" class="m">R</text>
    <path class="acc" d="M260 110 L320 50 H420 L300 170 H220 L340 50"/>
    <path class="dim" d="M40 50 H490 M40 170 H490"/><text x="44" y="44" class="m">R_t = 15 kip</text><text x="44" y="186" class="m">R_c = −15 kip</text>
    <text x="410" y="140" class="a">elastic k</text><text x="372" y="44" class="a">plastic</text>
  </svg>
  <figcaption>Figure 1 — Elastoplastic restoring force: elastic loading, yielding at constant force, elastic unloading with the original slope.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Choice of time step', html: String.raw`
<p>Errors come from the step size and from the change of state happening inside a step (the stiffness used is the one at the start). The book keeps Δt constant for clarity; in practice the step is subdivided near yielding and unloading. A useful check: run again with Δt/2 — the peak displacement should change little.</p>
<div data-widget="elastoplastic-sdof" data-title="Elastoplastic SDOF — linear acceleration step by step"></div>
<p>The defaults are Example 6.1 with the same load points; the table matches the book’s Table 6.1. Try Δt = 0.01 s to see the more accurate answer.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 6.1 — elastoplastic frame', html: String.raw`
<div class="ex">
  <div class="ex-head">A one-story frame (two fixed-base columns, I = 100 in⁴, L = 15 ft, E = 30×10³ ksi) carries m = 0.2 kip·s²/in; ξ = 0.087; the columns yield at a total force of ±15 kip. The load rises to 20 kip at 0.45 s, falls to 0 at 1.1 s, reaches −10 kip at 1.2 s and returns to 0 at 1.4 s. Use Δt = 0.1 s.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(k = 12E(2I)/L^3 = 12\times30\times10^3\times200/180^3 = 12.35\) kip/in; \(T = 2\pi\sqrt{0.2/12.35} = 0.80\) s.</li>
      <li>\(c = 0.087\times2\sqrt{0.2\times12.35} = 0.274\) kip·s/in; \(u_t = 15/12.35 = 1.215\) in, \(u_c = -1.215\) in.</li>
      <li>\(\bar k = k_p + 6(0.2)/0.1^2 + 3(0.274)/0.1 = k_p + 128.22\); \(\Delta\bar F = \Delta F + 12.822\dot u + 0.613\ddot u\); \(\Delta\dot u = 30\Delta u - 3\dot u - 0.05\ddot u\).</li>
      <li>The frame yields between t ≈ 0.35 and 0.85 s; the velocity reverses at 0.9 s.
        <span class="result">u_max = 3.83 in at t = 0.9 s → ductility μ = 3.83/1.215 ≈ 3.2</span></li>
    </ol>
    <div class="tbl-wrap"><table class="tbl num">
      <thead><tr><th>t (s)</th><th>F (kip)</th><th>u (in)</th><th>KEY</th><th>u̇ (in/s)</th><th>R (kip)</th></tr></thead>
      <tbody>
        <tr><td>0.3</td><td>13.33</td><td>0.667</td><td>0</td><td>5.38</td><td>8.23</td></tr>
        <tr><td>0.4</td><td>17.78</td><td>1.268</td><td>1</td><td>6.37</td><td>15.00</td></tr>
        <tr><td>0.6</td><td>15.38</td><td>2.650</td><td>1</td><td>7.02</td><td>15.00</td></tr>
        <tr><td>0.8</td><td>9.23</td><td>3.724</td><td>1</td><td>2.88</td><td>15.00</td></tr>
        <tr><td>0.9</td><td>6.15</td><td>3.832</td><td>0</td><td>−0.91</td><td>15.00</td></tr>
        <tr><td>1.1</td><td>0</td><td>2.927</td><td>0</td><td>−7.03</td><td>3.83</td></tr>
        <tr><td>1.3</td><td>−5.00</td><td>1.421</td><td>0</td><td>−5.81</td><td>−14.76</td></tr>
        <tr><td>1.4</td><td>0</td><td>1.174</td><td>−1</td><td>1.39</td><td>−15.00</td></tr>
      </tbody>
    </table></div>
    <p>After the load ends, the frame no longer vibrates about u = 0: yielding in both directions has shifted its rest position — the permanent set that marks inelastic response.</p>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use step-by-step integration whenever members yield; superposition is invalid.</li>
  <li>Keep Δt ≤ T/10 and refine near changes of state.</li>
  <li>Track loading and unloading: unloading is elastic with the original stiffness.</li>
  <li>Report the ductility demand μ = u_max/u_y and the permanent displacement.</li>
</ul>` }
      ]
    }
  ]
});
