/* Lesson 8 — Nonlinear analysis, contacts and project 5 (videos 30–34) */
KCE_COURSE.lessons.push({
  id: 'contact',
  num: 8,
  title: 'Nonlinear Analysis, Contacts and Project 5 — Tie vs Contact Pair',
  desc: 'Geometric, material and contact nonlinearity, master and slave surfaces, tie constraints, contact pairs with small or finite sliding, node-to-surface and surface-to-surface discretisation, and a sliding block example.',
  icon: '🧲',
  color: 'violet',
  meta: ['Section 6', 'Tie · contact pair', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>In a <strong>nonlinear</strong> analysis the load–displacement curve is not a straight line: the stiffness changes during loading, \([K(X)]X = F\), and Abaqus solves it in increments with Newton iterations. There are three sources:</p>
<ul>
  <li><strong>Geometric</strong> — large deformation or rotation changes the stiffness (a fishing rod bending under a heavy fish).</li>
  <li><strong>Material</strong> — the stress–strain curve is not linear: yielding, plasticity, hyperelastic rubber, temperature effects.</li>
  <li><strong>Contact</strong> — parts touch, slide or separate, so the load path changes (a book pressed onto a table).</li>
</ul>` },
        { title: 'Description', html: String.raw`
<p>Contact acts between two surfaces: the <strong>master</strong> (usually larger and stiffer) and the <strong>slave</strong> (smaller, softer, finer mesh). Slave nodes may not penetrate the master; the master may penetrate the slave slightly.</p>
<table class="tbl">
  <tbody>
    <tr><th>Tie</th><td>Two parts permanently joined (weld, glue): no relative motion.</td></tr>
    <tr><th>Contact pair</th><td>Parts touch but may separate, slide and transfer pressure (bearings, gears).</td></tr>
    <tr><th>Small sliding</th><td>The node–surface relationship is fixed at the start — fast.</td></tr>
    <tr><th>Finite sliding</th><td>Abaqus keeps tracking which master facet each slave node touches — general.</td></tr>
    <tr><th>Discretisation</th><td>Node-to-surface or surface-to-surface (smoother pressure, accounts for shell thickness).</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<p><strong>Project 5:</strong> a steel plate (100 mm long, 5 mm thick, bottom fixed) carries a 20 × 20 × 20 mm steel block; the block is pushed 5 mm sideways (a displacement BC through a reference point), with gravity.</p>
<ol>
  <li>Part: block and plate (solid extrusions); Property: steel; Assembly: place the block on the plate.</li>
  <li>Step: Static, General (Nlgeom on); field output S, U, RF; history output RF at the reference point.</li>
  <li>Interaction: (a) <em>Tie</em> constraint between the block bottom (slave) and plate top (master); (b) in a copy of the model, a <em>Surface-to-surface contact</em> pair with friction coefficient 0.1 and hard normal contact.</li>
  <li>Constraint: couple the block’s side face to a reference point (RP); apply U1 = 5 mm at RP.</li>
  <li>Load: gravity (−9810 mm/s² in Y); BC: encastre plate bottom.</li>
  <li>Mesh, Job, Visualization: compare the two models side by side.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="Block on a plate">
    <rect class="soil" x="40" y="120" width="440" height="20"/><path class="ln" d="M40 140 H480"/>
    <rect class="conc" x="80" y="60" width="60" height="60"/><path class="acc" d="M140 90 H200"/><polygon class="accf" points="206,90 196,85 196,95"/>
    <text x="210" y="94">u = 5 mm</text><path class="acc" d="M80 120 H140" style="stroke-width:4"/>
    <text x="70" y="168" class="m">tie → block bends with the plate</text><text x="290" y="168" class="m">contact pair → block slides</text>
    <text x="300" y="60" class="m">friction μ = 0.1</text>
  </svg>
  <figcaption>Figure 1 — Steel block on a steel plate, pushed 5 mm sideways.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Force to slide the block', html: String.raw`
<p>Block volume \(20^3 = 8000\) mm³ = \(8\times10^{-6}\) m³; mass \(m = 7850 \times 8\times10^{-6} = 0.0628\) kg; weight \(N = mg = 0.616\) N. With μ = 0.1 the friction force is</p>
$$F = \mu N = 0.1 \times 0.616 = 0.062\ \text{N}$$` }
      ]
    },
    {
      title: 'Results',
      subs: [
        { title: 'Answers', html: String.raw`
<div class="ex">
  <div class="ex-head">Tie versus contact pair.</div>
  <div class="ex-body">
    <ol class="steps">
      <li><strong>Tie:</strong> the block cannot slide; pushing it bends and stresses the plate and the block — very high stresses near the joint.</li>
      <li><strong>Contact pair:</strong> the block slides 5 mm over the plate with almost no stress.</li>
      <li>Force needed to keep the block sliding ≈ 0.062 N (the RF1 history at the reference point).
        <span class="result">Tie = bonded; contact pair = slides at F ≈ μmg = 0.062 N</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Choose the master as the stiffer, larger, coarser surface.</li>
  <li>Use tie only where the real joint cannot slip or open.</li>
  <li>Contact problems are nonlinear: allow enough increments and check convergence messages.</li>
</ul>` }
      ]
    }
  ]
});
