/* Lesson 13 — Transient dynamic analysis and the shock tower project (videos 56–58) */
KCE_COURSE.lessons.push({
  id: 'transient',
  num: 13,
  title: 'Transient Dynamic Analysis — Shock Tower Bracket',
  desc: 'When to use transient analysis, modal dynamics versus dynamic implicit, a time-varying load from a tabular amplitude, time increments, plasticity and the dynamic reaction force at the chassis.',
  icon: '⚡',
  color: 'peach',
  meta: ['Section 11', 'Dynamic, Implicit', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Transient dynamic analysis</strong> is time-dependent: the load changes with time and the response — including inertia and damping — is calculated at every time step. Use it when the load varies over a moderate duration: a vehicle on a rough road, a washing machine spin-up. (A car crash, over milliseconds with huge deformation, needs explicit dynamics.)</p>
<table class="tbl">
  <thead><tr><th>Static</th><th>Transient dynamic</th><th>FRF</th></tr></thead>
  <tbody>
    <tr><td>Time-independent; load constant or very slow</td><td>Time-dependent loads</td><td>Frequency-dependent loads</td></tr>
    <tr><td>No inertia or damping</td><td>Inertia and damping</td><td>Inertia and damping</td></tr>
    <tr><td>Static loads</td><td>Rough-road inputs, shocks</td><td>Resonance, vibration</td></tr>
  </tbody>
</table>` },
        { title: 'Description', html: String.raw`
<p>Two methods in Abaqus: <strong>Modal dynamics</strong> (Frequency step, then response by mode superposition — linear only) and <strong>Dynamic, Implicit</strong> (direct integration — can include plasticity, contact and large deformation).</p>` },
        { title: 'Methodology', html: String.raw`
<p><strong>Problem:</strong> a shock-tower bracket (STEP file) carries a time-varying load from the shock absorber mount. E = 2.1e5 MPa, ρ = 7.85e-9, ν = 0.3, with the given plastic curve (250 MPa at 0, … 430 MPa at 0.2 plastic strain). Find (1) the plasticity, (2) the maximum dynamic force at the chassis connection.</p>
<ol>
  <li><strong>Part:</strong> import SHOCK_TOWER.stp; <strong>Property:</strong> elastic + plastic + density.</li>
  <li><strong>Interaction:</strong> couple the mounting faces to reference points (load RP, chassis RPs).</li>
  <li><strong>Step:</strong> Dynamic, Implicit; time period 0.1 s; fixed increment 0.0001 s → 0.1/0.0001 = 1000 increments; Nlgeom on.</li>
  <li><strong>Amplitude:</strong> Tabular — the time–force table (0 → 7, 0.01 → 1050, 0.03 → 2759.82, … 0.1 → 5016.9 N, with negative values for rebound).</li>
  <li><strong>Load:</strong> concentrated force of magnitude 1 × amplitude at the load RP; BC: encastre at the chassis RPs.</li>
  <li><strong>Output:</strong> field every increment (or every 10); history RF at the chassis RPs.</li>
  <li><strong>Mesh:</strong> global seed with curvature control; tets for the imported geometry.</li>
  <li><strong>Visualization:</strong> Mises, PEEQ animation over time; XY: RF vs time at the chassis.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Time-varying load">
    <path class="thin" d="M60 110 H490 M60 200 V20"/>
    <polyline class="acc" points="60,110 79,104 98,85 117,75 136,58 155,70 174,47 193,60 212,30 231,135 250,190 269,160 288,128 307,55 326,32 345,128 364,40"/>
    <text x="440" y="128" class="m">time (s)</text><text x="14" y="30" class="m">force (N)</text>
    <text x="70" y="214" class="m">0 → 0.1 s, Δt = 0.0001 s (1000 increments)</text>
  </svg>
  <figcaption>Figure 1 — Tabular amplitude: the load varies quickly with time, including reversals.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Time step choice', html: String.raw`
<p>The increment must resolve both the load history and the important vibration modes: as a rule \(\Delta t \le T_{max\,mode}/20\) for the highest mode of interest, and small enough to follow each change in the load table (here 0.005 s between points → 50 increments per segment). Implicit integration (Hilber–Hughes–Taylor) is unconditionally stable, so accuracy — not stability — sets Δt.</p>` }
      ]
    },
    {
      title: 'Results',
      subs: [
        { title: 'Answers', html: String.raw`
<div class="ex">
  <div class="ex-head">Shock tower transient results.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Maximum equivalent plastic strain: 1.8 % — the bracket yields locally around the mounting slots during the peak loads.</li>
      <li>Maximum reaction force at the chassis mounting location ≈ 8048 N, at the rebound peak (the load table reaches −8052 N at 0.08 s). The reaction follows the load closely because the load changes slowly compared with the bracket’s natural periods; the time history shows when the peak occurs and in which direction.
        <span class="result">PEEQ_max = 1.8 % · peak chassis reaction ≈ 8048 N</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use Dynamic, Implicit when plasticity or contact matters; modal dynamics only for linear response.</li>
  <li>Choose the increment from the load table and the modes of interest.</li>
  <li>Dynamic reactions can exceed the static load — always read RF over time.</li>
</ul>` }
      ]
    }
  ]
});
