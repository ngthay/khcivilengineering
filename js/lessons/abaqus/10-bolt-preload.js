/* Lesson 10 — Project 7: bolt preload with multiple steps (videos 37–44) */
KCE_COURSE.lessons.push({
  id: 'bolt-preload',
  num: 10,
  title: 'Project 7 — Bolt Preload in a Torque Block (Multiple Steps)',
  desc: 'Why bolts are preloaded, torque–preload relation T = K·D·P, bolt load on an internal surface, two analysis steps (preload, then external moment), coupling, tie and general contact, and the change in bolt force.',
  icon: '🔩',
  color: 'amber',
  meta: ['Section 7', 'T = K·D·P', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Tightening a bolt with a torque stretches it and clamps the parts together with a <strong>preload</strong>. The preload keeps the joint closed and reduces the fatigue load in the bolt. Abaqus models it with a <strong>bolt load</strong> on an internal cutting surface of the bolt shank, applied in a first step and then <em>locked</em> while the external load is applied in a second step.</p>` },
        { title: 'Description', html: String.raw`
$$T = K \times D \times P\quad\Rightarrow\quad P = \frac{T}{K\,D}$$
<table class="tbl num">
  <thead><tr><th>K (nut factor)</th><th>Bolt condition</th></tr></thead>
  <tbody>
    <tr><td>0.20</td><td>Steel bolts, no plating</td></tr>
    <tr><td>0.15</td><td>Cadmium plated</td></tr>
    <tr><td>0.28</td><td>Zinc plated</td></tr>
    <tr><td>0.18</td><td>Lubricated</td></tr>
  </tbody>
</table>
<p>T = torque (N·mm), D = nominal (major) diameter (mm), P = preload (N).</p>` },
        { title: 'Methodology', html: String.raw`
<p><strong>Problem:</strong> an L-bracket is bolted (M4) to a base plate. A moment of 5 N·m is applied through the two holes of the vertical leg; the bolt torque is 2.6 N·m; the base is fixed. All parts steel (E = 2.1e5 MPa, ν = 0.3, ρ = 7.85e-9), the L-bracket with nonlinear plastic data. Find the plasticity in the bracket and the % change in bolt pretension.</p>
<ol>
  <li><strong>Part:</strong> base plate, L-bracket, bolt and nut (solids); split the bolt shank with a datum plane to create the bolt-load surface; datum axis along the bolt.</li>
  <li><strong>Property:</strong> elastic steel for all, plus plastic table for the bracket.</li>
  <li><strong>Step:</strong> Step-1 BOLTPRELOAD, Step-2 EXTERNAL_LOAD (Static, General, Nlgeom); integrated output section on the bolt surface for the bolt force (SOF).</li>
  <li><strong>Interaction:</strong> ties (bolt–nut threads), rigid coupling of the hole faces to a reference point for the moment, general contact between all other parts.</li>
  <li><strong>Load:</strong> Step-1: bolt load P = 3250 N on the internal surface, base fixed. Step-2: bolt load → <em>Fix at current length</em> (lock), moment 5000 N·mm at the RP.</li>
  <li><strong>Mesh:</strong> partition for hex where possible; finer around the bolt and holes.</li>
  <li><strong>Visualization:</strong> Mises and PEEQ per step; XY: SOFM (total force on the bolt section) through both steps.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Bolted torque block">
    <rect class="soil" x="40" y="170" width="440" height="20"/>
    <path class="conc" d="M140 150 H380 V164 H140 Z"/><path class="conc" d="M330 60 H346 V150 H330 Z"/>
    <rect class="comp" x="230" y="120" width="30" height="80"/><rect class="comp" x="218" y="112" width="54" height="12"/>
    <circle class="ln" cx="338" cy="90" r="5"/><circle class="ln" cx="338" cy="120" r="5"/>
    <path class="acc" d="M370 90 A 30 30 0 1 1 370 120"/><polygon class="accf" points="370,124 364,114 376,114"/><text x="430" y="100">M = 5 N·m</text>
    <text x="150" y="104" class="a">P = 3250 N</text><text x="60" y="210" class="m">base fixed</text>
  </svg>
  <figcaption>Figure 1 — L-bracket bolted to a base: preload first, then the external moment.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Preload calculation', html: String.raw`
$$P = \frac{T}{K\,D} = \frac{2600}{0.2 \times 4} = 3250\ \text{N}$$
<p>Applying it as a <em>bolt load</em> shortens the shank across the cut surface until the force equals P; in later steps the length is fixed, so any external load changes the bolt force only through joint stiffness.</p>` }
      ]
    },
    {
      title: 'Results',
      subs: [
        { title: 'Answers', html: String.raw`
<div class="ex">
  <div class="ex-head">Abaqus results for the torque block.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Plasticity in the L-shaped bracket: PEEQ = 0 — the bracket stays elastic (max Mises in the bracket ≈ 212 MPa; the bolt reaches ≈ 367 MPa).</li>
      <li>Bolt force: 3250 N after Step-1, 3266.76 N after the external moment.
        $$\%\ \text{change} = \frac{3266.76 - 3250}{3250}\times100 = 0.5\,\%$$
        <span class="result">No plasticity in the bracket; bolt pretension rises only 0.5 %</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Apply the preload in its own step, then change it to “fix at current length”.</li>
  <li>The bolt-load surface must cut through the shank only.</li>
  <li>Request an integrated output section to read the bolt force directly.</li>
</ul>` }
      ]
    }
  ]
});
