/* Lesson 2 — Element types and the governing equation (videos 7–9) */
KCE_COURSE.lessons.push({
  id: 'elements',
  num: 2,
  title: 'Element Types in Abaqus and the Governing Equation',
  desc: 'Truss, beam, shell and solid element names, rigid elements (kinematic and distributing coupling), mass and rotary inertia, springs, and the equation of motion for static and dynamic analysis.',
  icon: '🧩',
  color: 'mint',
  meta: ['Section 1', 'B31 · S4R · C3D8R', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The <strong>element type</strong> decides how an element behaves under load: which forces it carries, how many nodes it has and how it interpolates. Abaqus names say it all: <strong>C3D8R</strong> = Continuum, 3-D, 8 nodes, Reduced integration.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Family</th><th>Carries</th><th>Linear</th><th>Quadratic</th></tr></thead>
  <tbody>
    <tr><td>Truss</td><td>Axial load only</td><td>T2D2 / T3D2</td><td>T2D3 / T3D3</td></tr>
    <tr><td>Beam</td><td>Axial, bending, torsion, shear</td><td>B31</td><td>B32</td></tr>
    <tr><td>Shell — tria</td><td>Membrane + bending</td><td>S3R</td><td>STRI65</td></tr>
    <tr><td>Shell — quad</td><td>Membrane + bending</td><td>S4 / S4R</td><td>S8R</td></tr>
    <tr><td>Solid — tetra</td><td>Full 3D stress</td><td>C3D4</td><td>C3D10 / C3D10M</td></tr>
    <tr><td>Solid — wedge</td><td>Full 3D stress</td><td>C3D6</td><td>C3D15</td></tr>
    <tr><td>Solid — hex (brick)</td><td>Full 3D stress</td><td>C3D8 / C3D8I</td><td>C3D20R</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose the family from the mesh dimension (Lesson 1).</li>
  <li>Choose the order: linear for hex and contact, quadratic for tetra and curved geometry.</li>
  <li>Set the element in <em>Mesh → Assign Element Type</em>; check the family (e.g. Truss, Beam, 3D Stress).</li>
  <li>Add special elements where the real part is not modelled: rigid couplings, point masses, springs.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="Kinematic coupling to a reference point">
    <rect class="comp" x="40" y="60" width="140" height="100"/><rect class="comp" x="340" y="60" width="140" height="100"/>
    <circle class="accf" cx="260" cy="110" r="7"/><text x="232" y="90" class="a">RP</text>
    <g class="dim"><path d="M180 70 L260 110 M180 110 L260 110 M180 150 L260 110 M340 70 L260 110 M340 110 L260 110 M340 150 L260 110"/></g>
    <text x="70" y="186" class="m">component 1</text><text x="370" y="186" class="m">component 2</text>
    <text x="196" y="40" class="m">rigid links to slave nodes</text>
  </svg>
  <figcaption>Figure 1 — Rigid element: slave nodes tied to one reference point (RP).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Special elements', html: String.raw`
<ul>
  <li><strong>Rigid elements</strong> connect two parts, apply loads or boundary conditions through a reference point, or represent a rigid component without modelling it. <em>Kinematic coupling</em> (like Nastran RBE2) moves all slave nodes as a rigid body — adds stiffness. <em>Distributing coupling</em> (like RBE3) only distributes force and moment — slave nodes deform naturally, no added stiffness.</li>
  <li><strong>MASS</strong> represents translational mass; <strong>ROTARYI</strong> represents rotational inertia — e.g. a water tank on a frame, modelled as a point at its centre of gravity coupled to the supports.</li>
  <li><strong>Springs</strong>: SPRING1 node to ground (tyre on the road); SPRING2 node to node in a user-defined direction; SPRINGA node to node along the line between them (shock absorber).</li>
</ul>` },
        { title: 'Governing equation', html: String.raw`
$$[M]\ddot X + [C]\dot X + [K]X = F(t)$$
<p>[M] mass matrix (inertia), [C] damping matrix (energy dissipation), [K] stiffness matrix; \(X\), \(\dot X\), \(\ddot X\) displacement, velocity, acceleration.</p>
<table class="tbl">
  <tbody>
    <tr><th>Linear static</th><td>\([K]X = F\) — K constant</td></tr>
    <tr><th>Nonlinear static</th><td>\([K(X)]X = F\) — K changes with deformation, solved iteratively</td></tr>
    <tr><th>Free vibration</th><td>\([M]\ddot X + [K]X = 0\) → natural frequencies</td></tr>
    <tr><th>Forced vibration</th><td>\([M]\ddot X + [C]\dot X + [K]X = F(t)\)</td></tr>
  </tbody>
</table>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Decoding element names', html: String.raw`
<div class="ex">
  <div class="ex-head">What are T3D2, B32, S4R and C3D10?</div>
  <div class="ex-body">
    <ol class="steps">
      <li>T3D2 — truss in 3D, 2 nodes (linear, axial only).</li>
      <li>B32 — beam in space, quadratic (3 nodes).</li>
      <li>S4R — 4-node shell, reduced integration.</li>
      <li>C3D10 — continuum 3D, 10-node quadratic tetrahedron.
        <span class="result">Letters = family and features; numbers = dimension and node count</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Trusses cannot carry bending — use beams for frames.</li>
  <li>Use distributing coupling to apply loads without stiffening the part.</li>
  <li>Static problems need only [K]; dynamic problems also need [M] (density!).</li>
</ul>` }
      ]
    }
  ]
});
