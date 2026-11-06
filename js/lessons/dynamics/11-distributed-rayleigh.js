/* Lesson 11 — Systems with distributed properties and Rayleigh's method (Paz & Leigh, Chapters 17 and 21) */
KCE_COURSE.lessons.push({
  id: 'distributed-rayleigh',
  num: 11,
  title: 'Distributed Mass and Rayleigh’s Method',
  desc: 'The flexural vibration equation of a uniform beam, natural frequencies and mode shapes for simple, free, fixed and cantilever beams, orthogonality, generalized coordinates, and Rayleigh’s energy method for springs, cantilevers and multistory buildings.',
  icon: '🎸',
  color: 'mint',
  meta: ['Chapters 17 · 21', 'βL · Rayleigh', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A beam has infinitely many degrees of freedom. Equilibrium of a small element including its inertia gives the partial differential equation</p>
$$EI\frac{\partial^4 y}{\partial x^4} + \bar m\frac{\partial^2 y}{\partial t^2} = p(x,t)$$
<p>Separating variables, \(y = \Phi(x)\sin\omega t\), gives \(\Phi'''' - a^4\Phi = 0\) with \(a^4 = \bar m\omega^2/EI\), whose solution is</p>
$$\Phi(x) = A\sin ax + B\cos ax + C\sinh ax + D\cosh ax$$
<p>The four boundary conditions give a frequency equation; its roots \(a_nL\) set the natural frequencies</p>
$$\omega_n = (a_nL)^2\sqrt{\frac{EI}{\bar mL^4}}$$` },
        { title: 'Description', html: String.raw`
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>Supports</th><th>Frequency equation</th><th>a₁L</th><th>a₂L</th><th>a₃L</th></tr></thead>
  <tbody>
    <tr><td>Simple–simple</td><td>sin aL = 0</td><td>π</td><td>2π</td><td>3π</td></tr>
    <tr><td>Free–free</td><td>cos aL cosh aL = 1</td><td>4.730</td><td>7.853</td><td>10.996</td></tr>
    <tr><td>Fixed–fixed</td><td>cos aL cosh aL = 1</td><td>4.730</td><td>7.853</td><td>10.996</td></tr>
    <tr><td>Cantilever</td><td>cos aL cosh aL = −1</td><td>1.875</td><td>4.694</td><td>7.855</td></tr>
    <tr><td>Fixed–simple</td><td>tan aL = tanh aL</td><td>3.927</td><td>7.069</td><td>10.210</td></tr>
  </tbody>
</table></div>
<p>Simple beam modes are \(\Phi_n = \sin(n\pi x/L)\). Modes of a uniform beam are orthogonal: \(\int_0^L \bar m\,\Phi_m\Phi_n\,dx = 0\) for m ≠ n, so forced vibration can again be solved by modal superposition. Axial vibration of a bar follows the same path with \(\omega_n = \frac{(2n-1)\pi}{2L}\sqrt{E/\rho}\) for a fixed–free bar.</p>
<div data-widget="beam-frequencies" data-title="Natural frequencies of a uniform beam"></div>` },
        { title: 'Methodology', html: String.raw`
<p><strong>Rayleigh’s method.</strong> Assume a deflected shape for the fundamental mode, write the motion as harmonic, and equate the maximum strain energy to the maximum kinetic energy:</p>
$$V_{max} = \frac12\int_0^L EI\,(y'')^2dx,\qquad T_{max} = \frac{\omega^2}{2}\int_0^L \bar m\,y^2dx\ \ (+\ \tfrac12\omega^2\textstyle\sum m_iy_i^2)$$
$$\omega^2 = \frac{\int EI\,(y'')^2dx}{\int \bar m\,y^2dx + \sum m_iy_i^2}$$
<ol>
  <li>Choose a shape that satisfies at least the geometric boundary conditions (the static deflection curve is excellent).</li>
  <li>Compute both energies; the ratio gives ω².</li>
  <li>The result is always <strong>above</strong> the true ω₁; the better the shape, the closer.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 170" role="img" aria-label="Cantilever with tip mass">
    <path class="thin" d="M60 40 V140"/><path class="dim" d="M50 50 L60 60 M50 70 L60 80 M50 90 L60 100 M50 110 L60 120"/>
    <path class="ln" d="M60 90 H400" style="stroke-width:4"/><path class="acc" d="M60 90 Q260 96 400 130"/>
    <rect class="conc" x="384" y="66" width="34" height="26"/><text x="424" y="84">m</text>
    <text x="180" y="78" class="m">m_b = m̄L distributed</text><text x="260" y="150" class="a">≈ m + (33/140) m_b at the tip</text>
  </svg>
  <figcaption>Figure 1 — Rayleigh’s method lumps a fraction of the distributed mass at the tip.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Classic Rayleigh results', html: String.raw`
<ul>
  <li><strong>Spring with mass m_s</strong> carrying m: with a linear displacement along the spring, \(\omega = \sqrt{k/(m + m_s/3)}\) — add one third of the spring mass.</li>
  <li><strong>Cantilever with tip mass</strong>, using the static deflection shape \(y = C(3x^2L - x^3)/2L^3\): \(\omega = \sqrt{3EI/[L^3(m + \tfrac{33}{140}m_b)]}\). With m = 0 this gives \(\sqrt{3\times140/33} = 3.567\) against the exact 1.875² = 3.516 — only 1.5 % high.</li>
  <li><strong>Multistory building</strong> with lateral forces F_i producing deflections u_i (for example F_i = W_i):
  $$\omega^2 = \frac{g\sum F_iu_i}{\sum W_iu_i^2},\qquad T = 2\pi\sqrt{\frac{\sum W_iu_i^2}{g\sum F_iu_i}}$$
  — the period formula used by the building codes (Lesson 12).</li>
</ul>
<p>The <em>improved</em> Rayleigh method uses the inertial forces of the first estimate to compute a new deflected shape and repeats; it converges quickly to the exact fundamental frequency.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Fixed beam — exact versus finite elements', html: String.raw`
<div class="ex">
  <div class="ex-head">The fixed beam of Lesson 10 (L = 200 in, EI = 6.58×10⁸ lb·in², m̄ = 0.10 lb·s²/in²): exact frequencies.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\sqrt{EI/\bar mL^4} = \sqrt{6.58\times10^8/(0.1\times200^4)} = 2.028\) rad/s.</li>
      <li>\(\omega_1 = 4.730^2\times2.028 = 45.37\) rad/s → \(f_1 = 7.22\) cps; \(f_2 = 7.853^2\times2.028/2\pi = 19.9\) cps.
        <span class="result">f₁ = 7.22 cps (four consistent-mass elements: 7.23 cps)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Rayleigh estimate for the two-story building', html: String.raw`
<div class="ex">
  <div class="ex-head">Estimate ω₁ of the Example 7.1 building (W₁ = 52,500 lb, W₂ = 25,500 lb, k₁ = 30,700 lb/in, k₂ = 44,300 lb/in) by applying the floor weights as lateral loads.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Story shears: 78,000 and 25,500 lb → drifts 78,000/30,700 = 2.541 in and 25,500/44,300 = 0.576 in → u₁ = 2.541 in, u₂ = 3.116 in.</li>
      <li>\(\omega^2 = \dfrac{386(52{,}500\times2.541 + 25{,}500\times3.116)}{52{,}500\times2.541^2 + 25{,}500\times3.116^2} = 140.1\).
        <span class="result">ω₁ ≈ 11.84 rad/s, T₁ ≈ 0.531 s (eigenvalue solution 11.83 rad/s)</span></li>
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
  <li>Use the aL table for uniform beams; check the support case.</li>
  <li>Rayleigh needs only a reasonable shape — the static deflection under the weights is best.</li>
  <li>Rayleigh always overestimates ω₁ (underestimates T₁).</li>
  <li>Add 1/3 of a spring’s mass and about 1/4 (33/140) of a cantilever’s mass to the tip mass.</li>
</ul>` }
      ]
    }
  ]
});
