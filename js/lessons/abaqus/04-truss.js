/* Lesson 4 — Abaqus/CAE interface and project 1: 1D truss (videos 15–19) */
KCE_COURSE.lessons.push({
  id: 'truss',
  num: 4,
  title: 'Project 1 — 1D Truss: Interface and Full Workflow',
  desc: 'The Abaqus/CAE window, model tree, modules and mouse actions, then a complete 2D wire truss analysis: displacements at the joints, member stresses, reaction forces and XY plots.',
  icon: '🔺',
  color: 'sky',
  meta: ['Section 3', 'T2D2 truss', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The Abaqus/CAE window has a <strong>model tree</strong> (left), the <strong>module</strong> list and toolbox, the <strong>viewport</strong> and the message area. Mouse: Ctrl + Alt + left = rotate, + middle = pan, + right = zoom (or use the view toolbar). Work always starts with <em>File → Set Work Directory</em> and saving the .cae file.</p>` },
        { title: 'Description', html: String.raw`
<p><strong>Problem:</strong> a steel truss (4 panels of 1 m, height 1 m) carries 100 N at each of the three interior bottom joints. E = 201 GPa, ν = 0.3, ρ = 7.85e-9 t/mm³, cross-section 1 mm². Find (1) the joint displacements, (2) the most stressed members, (3) the reaction forces.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Part:</strong> Create Part → 2D Planar → Deformable → Wire; sketch the truss lines (dimensions in mm).</li>
  <li><strong>Property:</strong> Create Material → Mechanical → Elasticity → Elastic (E = 201000, ν = 0.3); Create Section → Beam → <em>Truss</em>, area 1; Assign Section to all members.</li>
  <li><strong>Assembly:</strong> Create Instance.</li>
  <li><strong>Step:</strong> Create Step → Static, General.</li>
  <li><strong>Load:</strong> Concentrated force (CF2 = −100) at the three nodes; BC: pin (U1 = U2 = 0) at the left support, roller (U2 = 0) at the right.</li>
  <li><strong>Mesh:</strong> seed one element per member; element type <em>Truss (T2D2)</em>.</li>
  <li><strong>Job:</strong> Create Job → Submit → Monitor; open results.</li>
  <li><strong>Visualization:</strong> plot U (U2), S11 with labels (Viewport annotation options → show min/max), probe values (Tools → Query → Probe values → write to file), XY data: RF2 at the supports.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 540 220" role="img" aria-label="Truss of project 1">
    <g class="ln"><path d="M60 170 H480 M60 170 L165 70 H375 L480 170 M165 70 V170 M270 70 V170 M375 70 V170 M165 70 L270 170 L375 70"/></g>
    <polygon class="ln" points="60,170 50,188 70,188"/><circle class="ln" cx="480" cy="180" r="8"/>
    <g class="acc"><path d="M165 176 V200 M270 176 V200 M375 176 V200"/></g>
    <g class="accf"><polygon points="165,206 160,196 170,196"/><polygon points="270,206 265,196 275,196"/><polygon points="375,206 370,196 380,196"/></g>
    <text x="150" y="218" class="m">100 N</text><text x="255" y="218" class="m">100 N</text><text x="360" y="218" class="m">100 N</text>
    <text x="100" y="164" class="m">1 m</text><text x="490" y="124" class="m">1 m</text>
    <text x="20" y="100" class="a">≈ 212 MPa (C)</text>
  </svg>
  <figcaption>Figure 1 — Truss with three 100 N loads; the end diagonals carry the largest force.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Hand check', html: String.raw`
<p>By symmetry each support reaction is \(3 \times 100/2 = 150\) N. At an end joint the diagonal (45°) carries the whole reaction: \(F = 150/\sin45° = 212\) N in compression; with A = 1 mm² that is <strong>212 MPa</strong> — exactly what Abaqus reports for the end diagonals. The bottom chord next to the support carries \(F\cos45° = 150\) N → 150 MPa tension.</p>` }
      ]
    },
    {
      title: 'Results',
      subs: [
        { title: 'Answers', html: String.raw`
<div class="ex">
  <div class="ex-head">Abaqus results for the truss.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Vertical displacement of the joints (mm): −6.02 (node 1, centre bottom), −4.8, 0 (supports), −4.4 … The maximum deflection is about 6.0 mm at mid-span.</li>
      <li>The maximum stress occurs in the end diagonals (members 3 and 7): about 212 MPa in compression; next highest about 200 MPa (top chord, member 9).</li>
      <li>Reactions: RF2 = 150 N at each support; applied force 300 N = total reaction 300 N ✓.
        <span class="result">δ_max ≈ 6.0 mm · σ_max ≈ 212 MPa · ΣR = 300 N</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use truss elements only when loads act at the joints.</li>
  <li>Check equilibrium: sum of reactions = sum of loads.</li>
  <li>Compare one member force with a hand calculation before trusting the model.</li>
</ul>` }
      ]
    }
  ]
});
