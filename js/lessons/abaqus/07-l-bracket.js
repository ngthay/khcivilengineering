/* Lesson 7 — Project 4: 3D solid L-bracket and the input file (videos 26–29) */
KCE_COURSE.lessons.push({
  id: 'l-bracket',
  num: 7,
  title: 'Project 4 — 3D Solid L-Bracket and the Input File',
  desc: 'Extruded solid part, partitioning for a hex mesh, pressure load from a 20 kg mass, displacement, von Mises and principal stresses, and reading and editing the Abaqus .inp input file.',
  icon: '📐',
  color: 'peach',
  meta: ['Section 5', 'C3D8R solid', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Solid (3D) elements are needed when the thickness, fillets and local stresses matter. Hexahedral (brick) meshes are accurate and efficient but need the geometry to be <strong>partitioned</strong> into simple sweepable blocks.</p>` },
        { title: 'Description', html: String.raw`
<p><strong>Problem:</strong> a steel bookshelf bracket (S355J2, E = 210 GPa, ν = 0.3, yield 355 MPa), 10 mm thick: horizontal arm 100 mm × 5 mm, vertical leg 50 mm, inside radius 2.5 mm, fixed at the vertical leg. A 20 kg load rests on the top face. Find the displacement, von Mises stress, and tensile and compressive stresses.</p>
<p>Load: \(20 \times 9.81 = 196.2\) N over \(100 \times 10 = 1000\) mm² → pressure <strong>0.1962 MPa</strong>.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Part:</strong> 3D → Deformable → Solid → Extrusion; sketch the L profile (with R2.5 fillet), depth 10.</li>
  <li><strong>Property:</strong> material S355J2; Solid, Homogeneous section; assign.</li>
  <li><strong>Step:</strong> Static, General; field output S, U, RF (increment size 0.1 to see the load growing).</li>
  <li><strong>Load:</strong> Pressure 0.1962 on the top face; BC: Encastre on the back face of the vertical leg.</li>
  <li><strong>Mesh:</strong> partition cells with datum planes at the bend; global seed; <em>Mesh Controls → Hex → Sweep</em>; element C3D8R (3D stress).</li>
  <li><strong>Job</strong> → Submit; <strong>Visualization:</strong> U2, Mises, Max. Principal (abs), Min. Principal; use display groups to view inside.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="L bracket">
    <path class="conc" d="M80 40 H360 V58 H100 V190 H80 Z"/>
    <path class="ln" d="M70 40 V200"/><path class="dim" d="M60 50 L70 40 M60 80 L70 70 M60 110 L70 100 M60 140 L70 130 M60 170 L70 160"/>
    <g class="acc"><path d="M120 14 V36 M180 14 V36 M240 14 V36 M300 14 V36 M350 14 V36"/></g>
    <text x="370" y="30">p = 0.1962 MPa (20 kg)</text>
    <text x="240" y="80" class="m">100 mm × 5 mm</text><text x="110" y="140" class="m">50 mm leg</text>
    <circle class="accf" cx="104" cy="62" r="4"/><text x="110" y="100" class="a">σ peak at the bend</text>
  </svg>
  <figcaption>Figure 1 — L-bracket fixed at the wall; the stress peaks at the inside fillet.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'The input file (.inp)', html: String.raw`
<p>Abaqus/CAE writes the model to a text <strong>input file</strong> (<em>Job → Write Input</em>) that the solver reads. It is organised in keyword blocks:</p>
<pre><code>*Heading
*Part, name=Part-1
*Node            ← node numbers and coordinates
*Element, type=S4  ← connectivity
*Shell Section, elset=..., material=STEEL
*Assembly / *Instance
*Material, name=STEEL
*Density  7.85e-09
*Elastic  210000., 0.3
*Step, name=STATIC, nlgeom=NO
*Static
*Boundary   Set-1, ENCASTRE
*Cload      Set-2, 2, -100.
*Output, field / history
*End Step</code></pre>
<p>Editing the .inp (in a text editor or with <em>Model → Edit Keywords</em>) is a quick way to change a load, material or output and re-run without rebuilding the model. Other files: .cae (model database), .odb (results), .dat, .msg, .sta (solver messages and status).</p>` }
      ]
    },
    {
      title: 'Results',
      subs: [
        { title: 'Answers', html: String.raw`
<div class="ex">
  <div class="ex-head">Abaqus results for the L-bracket (C3D8R).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Maximum displacement: 0.954 mm (vertical, at the tip of the arm).</li>
      <li>Maximum von Mises stress: 256 MPa, at the inside fillet of the bend — below the 355 MPa yield.</li>
      <li>Maximum tensile (max principal) stress 190 MPa; maximum compressive (min principal) stress 270 MPa.
        <span class="result">δ = 0.954 mm · Mises 256 MPa &lt; 355 MPa → elastic, safe</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Convert masses to forces (× 9.81) and forces to pressures (÷ area).</li>
  <li>Partition until every cell turns green/yellow for hex meshing.</li>
  <li>Compare Mises with yield; look at principal stresses to see tension and compression.</li>
</ul>` }
      ]
    }
  ]
});
