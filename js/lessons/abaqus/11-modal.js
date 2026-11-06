/* Lesson 11 — Dynamics introduction and projects 8–9: modal analysis (videos 45–49) */
KCE_COURSE.lessons.push({
  id: 'modal',
  num: 11,
  title: 'Dynamic Analysis and Projects 8–9 — Modal (Eigen) Analysis',
  desc: 'Static versus dynamic analysis, natural frequency and mode shapes, the Frequency (Lanczos) step, a cantilever ruler, and free-free versus fixed modal analysis of a frame.',
  icon: '〰️',
  color: 'rose',
  meta: ['Sections 8–9', 'f = (1/2π)√(k/m)', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<table class="tbl">
  <thead><tr><th>Aspect</th><th>Static</th><th>Dynamic</th></tr></thead>
  <tbody>
    <tr><td>Time</td><td>Loads applied gradually and stay constant</td><td>Loads vary with time, frequency or are sudden</td></tr>
    <tr><td>Inertia &amp; damping</td><td>Ignored</td><td>Included — critical</td></tr>
    <tr><td>Equation</td><td>\([K]\{u\} = \{F\}\)</td><td>\([M]\ddot u + [C]\dot u + [K]u = F(t)\)</td></tr>
    <tr><td>Loads</td><td>Constant force, pressure, gravity</td><td>Transient, harmonic, random, seismic, impact</td></tr>
    <tr><td>Analyses</td><td>Linear and nonlinear static</td><td>Modal, harmonic (FRF), transient, spectrum, random, explicit</td></tr>
  </tbody>
</table>` },
        { title: 'Description', html: String.raw`
<p><strong>Modal analysis</strong> solves the free-vibration problem \([M]\ddot X + [K]X = 0\) for the <strong>natural frequencies</strong> (how fast the structure vibrates) and the <strong>mode shapes</strong> (the pattern of vibration). For one mass on a spring \(f = \dfrac{1}{2\pi}\sqrt{\dfrac km}\) Hz (cycles per second). Results are the basis of FRF and transient analyses and show whether an operating frequency is close to resonance.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Material must include <strong>density</strong> (mass) as well as E and ν.</li>
  <li><strong>Step:</strong> Linear perturbation → <em>Frequency</em>; eigensolver Lanczos; number of eigenvalues (e.g. 10) or a frequency range.</li>
  <li>BCs as in service (fixed analysis) or none (free-free analysis).</li>
  <li>Mesh, Job; read the eigenvalue table in the .dat file or Visualization → Step/Frame; animate each mode shape.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="Cantilever mode shapes">
    <rect class="conc" x="40" y="40" width="14" height="120"/>
    <path class="dim" d="M54 100 H470"/>
    <path class="acc" d="M54 100 Q 300 100 470 50"/><text x="476" y="54" class="a">mode 1</text>
    <path class="ln" d="M54 100 Q 200 120 330 100 T 470 140"/><text x="476" y="144" class="m">mode 2</text>
    <text x="180" y="186" class="m">ruler 914 × 20 × 5 mm, fixed at one end</text>
  </svg>
  <figcaption>Figure 1 — First two bending mode shapes of a cantilever.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Cantilever natural frequencies', html: String.raw`
$$f_n = \frac{(\beta_nL)^2}{2\pi}\sqrt{\frac{EI}{\rho AL^4}},\qquad \beta_1L = 1.875,\ \beta_2L = 4.694,\ \beta_3L = 7.855$$
<div data-widget="cantilever-frequency" data-title="Cantilever natural frequencies (mm · N · MPa · t/mm³)"></div>
<p><em>Defaults: the steel ruler of Project 8 — f₁ = 5.0 Hz. Swap b and h for the stiff (lateral) direction: f ≈ 20 Hz, Abaqus mode 2.</em></p>` },
        { title: 'Free-free vs fixed', html: String.raw`
<table class="tbl">
  <thead><tr><th>Free-free</th><th>Fixed</th></tr></thead>
  <tbody><tr><td>No boundary conditions. The first six modes are rigid-body modes with (near-)zero frequency — a check that the model is fully connected.</td><td>Boundary conditions applied; frequencies are non-zero from the first mode.</td></tr></tbody>
</table>` }
      ]
    },
    {
      title: 'Results',
      subs: [
        { title: 'Project 8 — cantilever ruler', html: String.raw`
<div class="ex">
  <div class="ex-head">A steel ruler 914 mm × 20 mm × 5 mm (E = 2.1e5, ρ = 7.85e-9, ν = 0.3), fixed at one end, B31 beam elements.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Abaqus mode 1: 5.0 Hz — bending about the weak axis. Hand formula: \(I = 20(5^3)/12 = 208\) mm⁴ → \(f_1 = 5.0\) Hz ✓.</li>
      <li>Mode 2 ≈ 20 Hz: bending in the stiff direction (\(I = 5(20^3)/12\), four times the depth → four times the frequency).
        <span class="result">f₁ = 5 Hz, first mode shape = bending</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Project 9 — rectangular frame', html: String.raw`
<div class="ex">
  <div class="ex-head">A steel frame 1000 mm × 500 mm, 50 mm members, 50 mm thick; (1) free-free, (2) base fixed.</div>
  <div class="ex-body">
    <div class="tbl-wrap"><table class="tbl num">
      <thead><tr><th>Mode</th><th>Free-free (Hz)</th><th>Shape</th><th>Fixed base (Hz)</th><th>Shape</th></tr></thead>
      <tbody>
        <tr><td>1 – 6</td><td>8.7e-4 … 9.5e-4</td><td>Rigid body</td><td>31.54 / 53.40 / 85.45 / 219.49 / 229.57 / 290.97</td><td>Bending / lateral / twisting / bending / lateral / twisting</td></tr>
        <tr><td>7</td><td>132.53</td><td>Twisting</td><td>309.16</td><td>Lateral</td></tr>
      </tbody>
    </table></div>
    <span class="result">Free-free: six rigid-body modes, first elastic mode 132.5 Hz · fixed: 31.5 Hz</span>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>No density → no modal results.</li>
  <li>Run free-free first: exactly six ~0 Hz modes confirm the mesh is connected.</li>
  <li>Keep operating frequencies away from natural frequencies (±10 – 20 %).</li>
</ul>` }
      ]
    }
  ]
});
