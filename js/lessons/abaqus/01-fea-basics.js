/* Lesson 1 — Introduction of finite element analysis (videos 1–6) */
KCE_COURSE.lessons.push({
  id: 'fea-basics',
  num: 1,
  title: 'Introduction to Finite Element Analysis',
  desc: 'The design cycle, degrees of freedom and supports, why we mesh, 1D, 2D and 3D meshing, and linear versus quadratic elements.',
  icon: '🧊',
  color: 'lilac',
  meta: ['Section 1', 'DOF · mesh', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Abaqus/CAE</strong> (Dassault Systèmes SIMULIA) is one of the most powerful finite element programs, especially for <em>nonlinear</em> problems. The <strong>finite element method</strong> divides a structure into many small elements joined at nodes, writes simple equations for each element and solves them together for the displacements; stresses and strains follow from the displacements.</p>
<p>In the product <strong>design cycle</strong> FEA replaces many physical prototypes: concept → CAD model → FEA (check strength, stiffness, vibration) → modify design → prototype and test → production.</p>` },
        { title: 'Description', html: String.raw`
<p>A <strong>degree of freedom (DOF)</strong> is an independent way a node can move. A point in space has up to <strong>6 DOF</strong>: three translations \(U_x, U_y, U_z\) and three rotations \(R_x, R_y, R_z\).</p>
<table class="tbl">
  <thead><tr><th>Support</th><th>Fixed DOF</th><th>Free DOF</th></tr></thead>
  <tbody>
    <tr><td>Fixed (encastre)</td><td>\(U_x = U_y = U_z = R_x = R_y = R_z = 0\)</td><td>none</td></tr>
    <tr><td>Pin</td><td>\(U_x = U_y = U_z = 0\)</td><td>rotations</td></tr>
    <tr><td>Roller (2D, on the x-axis)</td><td>\(U_y = 0\)</td><td>\(U_x\), \(R_z\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<p>Choose the mesh dimension from the geometry:</p>
<ol>
  <li><strong>1D (line) mesh</strong> — one dimension much larger than the other two: towers, trusses, frames. Geometry drawn as lines; captures axial, bending and torsion; very fast.</li>
  <li><strong>2D (shell) mesh</strong> — thickness much smaller than length and width (rule of thumb \(t/L &lt; 1/10\) to \(1/20\)): pressure vessels, car body panels, sheet metal. Extract the mid-surface and give the thickness as a section property.</li>
  <li><strong>3D (solid) mesh</strong> — castings, thick components, contact problems, or where local stress accuracy and thickness effects matter.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 540 220" role="img" aria-label="Linear and quadratic elements">
    <text x="40" y="30" class="a">Linear (1st order)</text><text x="300" y="30" class="a">Quadratic (2nd order)</text>
    <path class="ln" d="M40 60 H200"/><g class="accf"><circle cx="40" cy="60" r="5"/><circle cx="200" cy="60" r="5"/></g><text x="80" y="86" class="m">2 nodes, straight</text>
    <path class="ln" d="M300 60 Q 380 40 460 60"/><g class="accf"><circle cx="300" cy="60" r="5"/><circle cx="380" cy="50" r="5"/><circle cx="460" cy="60" r="5"/></g><text x="330" y="86" class="m">3 nodes, can curve</text>
    <polygon class="comp" points="60,200 120,110 180,200"/><g class="accf"><circle cx="60" cy="200" r="4"/><circle cx="120" cy="110" r="4"/><circle cx="180" cy="200" r="4"/></g>
    <polygon class="comp" points="320,200 380,110 440,200"/><g class="accf"><circle cx="320" cy="200" r="4"/><circle cx="380" cy="110" r="4"/><circle cx="440" cy="200" r="4"/><circle cx="350" cy="155" r="4"/><circle cx="410" cy="155" r="4"/><circle cx="380" cy="200" r="4"/></g>
    <text x="196" y="170" class="m">tria 3 nodes</text><text x="456" y="170" class="m">tria 6 nodes</text>
  </svg>
  <figcaption>Figure 1 — Linear elements have corner nodes only; quadratic elements add mid-side nodes.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Why mesh?', html: String.raw`
<p>A real body has infinitely many points, so its equations cannot be solved directly. Meshing replaces it by a finite number of nodes: the computer solves for the nodal DOF and interpolates in between. A finer mesh is more accurate but slower; refine where stresses change quickly (holes, fillets, contacts) and check that the result no longer changes with refinement (<strong>mesh convergence</strong>).</p>` },
        { title: 'Linear vs quadratic elements', html: String.raw`
<table class="tbl">
  <thead><tr><th></th><th>Linear (first order)</th><th>Quadratic (second order)</th></tr></thead>
  <tbody>
    <tr><td>Nodes</td><td>Corners only: line 2, tria 3, quad 4, tetra 4, hex 8</td><td>+ mid-side: line 3, tria 6, quad 8, tetra 10, hex 20</td></tr>
    <tr><td>Edges</td><td>Straight</td><td>Can curve — follow curved geometry</td></tr>
    <tr><td>Use</td><td>Hex meshes, contact, large models</td><td>Tetra meshes of complex parts, bending, stress concentrations</td></tr>
  </tbody>
</table>
<p>Linear tetrahedra are too stiff in bending; prefer quadratic tetra (C3D10) for complex castings and linear hexahedra (C3D8R) for regular shapes.</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Choosing the mesh type', html: String.raw`
<div class="ex">
  <div class="ex-head">Choose the mesh for (a) a 30 m telecom tower, (b) a 1.2 mm steel car door panel 900 mm wide, (c) an engine block.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) Long and slender members → 1D beam/truss mesh.</li>
      <li>(b) \(t/L = 1.2/900 \approx 1/750 \ll 1/20\) → 2D shell mesh on the mid-surface, thickness 1.2 mm.</li>
      <li>(c) Thick, complex casting → 3D solid, quadratic tetrahedra.
        <span class="result">1D · 2D shell · 3D solid</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Restrain enough DOF to prevent rigid-body motion — otherwise the solver fails.</li>
  <li>Use the simplest element dimension that captures the behaviour.</li>
  <li>Refine the mesh where stress gradients are high and check convergence.</li>
</ul>` }
      ]
    }
  ]
});
