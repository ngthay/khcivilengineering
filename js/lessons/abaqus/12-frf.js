/* Lesson 12 — Project 10: frequency response function analysis (videos 50–55) */
KCE_COURSE.lessons.push({
  id: 'frf',
  num: 12,
  title: 'Project 10 — Frequency Response (FRF) of a Lower Link',
  desc: 'Sources of vibration, frequency response analysis, steady-state dynamics modal versus direct, importing a STEP part, virtual topology and tet meshing, modal damping, and finding resonance.',
  icon: '📶',
  color: 'blue',
  meta: ['Section 10', 'Steady-state dynamics', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Machines vibrate: rotating parts (imbalance, misalignment, bearing wear), motors, pumps, compressors. <strong>Frequency response analysis</strong> finds how much a structure vibrates at each excitation frequency under a harmonic (sinusoidal) load. A peak in the response shows <strong>resonance</strong> — the excitation frequency matches a natural frequency.</p>
<table class="tbl">
  <tbody>
    <tr><th>Modal analysis</th><td>Natural frequencies and mode shapes</td></tr>
    <tr><th>FRF analysis</th><td>Response to external excitation across frequencies; detects resonance</td></tr>
  </tbody>
</table>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Steady-state dynamics, Modal (modal superposition)</th><td>Run a Frequency step first, then the response is built from the modes — fast; needs modal damping.</td></tr>
    <tr><th>Steady-state dynamics, Direct</th><td>Solves the full equations at each frequency — slower, more exact, handles frequency-dependent properties.</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<p><strong>Problem:</strong> an aluminium lower control arm (ρ = 2.7e-9 t/mm³, E ≈ 72 000 MPa, ν = 0.33) is fixed at one end and loaded by a 1000 N harmonic force at the other. Check for resonance and find the resonance frequency and maximum amplitude.</p>
<ol>
  <li><strong>Part:</strong> File → Import → Part (LOWER_ARM.stp).</li>
  <li><strong>Mesh:</strong> partition with datum planes; <em>Virtual topology</em> to merge small faces; <em>Verify mesh</em>; tetrahedral C3D10.</li>
  <li><strong>Step-1:</strong> Frequency (e.g. first 5 modes) → modes 155.14, 188.15, 241.58 Hz.</li>
  <li><strong>Step-2:</strong> Steady-state dynamics, Modal; frequency range 0 – 250 Hz, linear scale; damping (e.g. direct modal damping 0.03).</li>
  <li>Coupling of the bushing hole to a reference point; load: 1000 N (CF2) in Step-2; BC: encastre at the fixed end.</li>
  <li>History output: U2 at a node set (RESPONSE) at the loaded end.</li>
  <li><strong>Visualization:</strong> XY data → U2 magnitude vs frequency; probe the peak.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Frequency response curve">
    <path class="thin" d="M60 190 H490 M60 190 V20"/>
    <path class="acc" d="M60 186 C 150 184, 230 180, 262 150 C 272 130, 276 40, 280 30 C 284 40, 288 130, 300 155 C 330 180, 420 184, 490 186"/>
    <path class="dim" d="M280 30 V190"/><text x="286" y="40" class="a">≈ 18 mm at 155 Hz</text>
    <text x="440" y="210" class="m">frequency (Hz)</text><text x="14" y="30" class="m">U2</text>
    <text x="270" y="208" class="m">155</text>
  </svg>
  <figcaption>Figure 1 — FRF of the lower link: a sharp resonance peak at the first natural frequency.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Resonance', html: String.raw`
<p>For a single-DOF system under \(F_0\sin\omega t\) the steady amplitude is \(X = \dfrac{F_0/k}{\sqrt{(1 - r^2)^2 + (2\zeta r)^2}}\), \(r = \omega/\omega_n\). At \(r = 1\) the amplitude is limited only by damping: \(X = \dfrac{F_0}{2\zeta k}\). Three terms matter: <strong>natural frequency</strong> (structure), <strong>excitation frequency</strong> (load), <strong>operating frequency</strong> (machine speed) — when the natural frequency matches the excitation, resonance occurs.</p>` }
      ]
    },
    {
      title: 'Results',
      subs: [
        { title: 'Answers', html: String.raw`
<div class="ex">
  <div class="ex-head">Lower link FRF results.</div>
  <div class="ex-body">
    <div class="tbl-wrap"><table class="tbl num">
      <thead><tr><th>Mode</th><th>Frequency (Hz)</th><th>Type</th></tr></thead>
      <tbody><tr><td>1</td><td>155.14</td><td>Bending</td></tr><tr><td>2</td><td>188.15</td><td>Lateral</td></tr><tr><td>3</td><td>241.58</td><td>Twisting</td></tr></tbody>
    </table></div>
    <span class="result">Yes — resonance at about 155 Hz, maximum vibration amplitude ≈ 18 mm</span>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Modal-based FRF needs a Frequency step whose range covers the excitation range.</li>
  <li>Without damping the peak is infinite — always define damping.</li>
  <li>Clean imported CAD with virtual topology before meshing.</li>
</ul>` }
      ]
    }
  ]
});
