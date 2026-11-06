/* Lesson 9 — Project 6: three-point bending with plasticity and contact (videos 35–36) */
KCE_COURSE.lessons.push({
  id: 'three-point-bending',
  num: 9,
  title: 'Project 6 — Three-Point Bending of a Plate (Plasticity + Contact)',
  desc: 'Rigid indenter and supports, plastic material data, Nlgeom and automatic stabilisation, surface-to-surface contact, displacement-controlled loading, PEEQ and the force–deflection curve.',
  icon: '🔨',
  color: 'mint',
  meta: ['Section 6', 'All three nonlinearities', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>This project combines all three nonlinearities: large deformation of the plate (geometric), yielding of the steel (material), and the indenter and supports touching it (contact). The indenter is pushed by a prescribed <strong>displacement</strong>, which is more stable than applying a force.</p>` },
        { title: 'Description', html: String.raw`
<p><strong>Problem:</strong> a steel plate 120 mm long and 2 mm thick (20 mm wide) rests on two supports; a rigid indenter (10 mm wide, rounded) pushes its centre down 5 mm. E = 2.1e5 MPa, ν = 0.3. Indenter and supports are rigid bodies. Plastic data:</p>
<table class="tbl num">
  <thead><tr><th>Yield stress (MPa)</th><td>350</td><td>565.26</td><td>600.96</td><td>661.31</td><td>731.44</td><td>735</td></tr></thead>
  <tbody><tr><th>Plastic strain</th><td>0</td><td>1.0e-5</td><td>0.01</td><td>0.04</td><td>0.16</td><td>0.17</td></tr></tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Part:</strong> plate — 3D deformable solid; indenter and supports — 3D <em>discrete rigid</em> (shell) with a reference point (Tools → Reference Point).</li>
  <li><strong>Property:</strong> Elastic + Plastic (table above) for the plate only.</li>
  <li><strong>Assembly:</strong> place the supports under the plate ends and the indenter above the centre (translate to touch).</li>
  <li><strong>Step:</strong> Static, General, <em>Nlgeom ON</em>, automatic stabilisation (dissipated energy fraction 0.0002), small initial increment.</li>
  <li><strong>Interaction:</strong> surface-to-surface contacts indenter–plate top and supports–plate bottom (rigid = master), with friction.</li>
  <li><strong>BC:</strong> supports fixed at their RPs; indenter RP: U2 = −5 mm, other DOF fixed.</li>
  <li><strong>Mesh:</strong> partition the plate, hex C3D8R; rigid parts meshed with R3D4.</li>
  <li><strong>Visualization:</strong> U2, Mises, PEEQ; XY: RF2 at the support RP and U2 at the indenter → <em>Operate on XY data → combine(U2, RF2)</em> gives force vs deflection.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 210" role="img" aria-label="Three-point bending set-up">
    <path class="conc" d="M60 110 H460 V122 H60 Z"/>
    <path class="comp" d="M245 40 H275 V90 Q 260 112 245 90 Z"/><path class="acc" d="M260 14 V36"/><polygon class="accf" points="260,40 255,30 265,30"/><text x="270" y="26">u = 5 mm</text>
    <path class="comp" d="M80 124 Q 95 120 110 124 V170 H80 Z"/><path class="comp" d="M410 124 Q 425 120 440 124 V170 H410 Z"/>
    <path class="dim" d="M60 190 H460"/><text x="236" y="204" class="m">120 mm</text><text x="470" y="120" class="m">t = 2 mm</text>
  </svg>
  <figcaption>Figure 1 — Rigid indenter and supports on a deformable plate.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Entering plasticity in Abaqus', html: String.raw`
<p>Abaqus needs <strong>true stress</strong> against <strong>true plastic strain</strong>, starting at zero plastic strain at the yield stress. From an engineering test curve: \(\sigma_{true} = \sigma_{eng}(1 + \varepsilon_{eng})\), \(\varepsilon_{true} = \ln(1 + \varepsilon_{eng})\), \(\varepsilon_{pl} = \varepsilon_{true} - \sigma_{true}/E\). Beyond the last point the material is perfectly plastic.</p>
<p>Displacement control lets the solution pass peaks and contact changes; automatic stabilisation adds small damping to help initial contact converge — check that the stabilisation energy (ALLSD) stays small compared with the strain energy (ALLIE).</p>` }
      ]
    },
    {
      title: 'Results',
      subs: [
        { title: 'Answers', html: String.raw`
<div class="ex">
  <div class="ex-head">Abaqus results for three-point bending.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Maximum displacement of the plate: 5 mm, under the indenter.</li>
      <li>Maximum equivalent plastic strain PEEQ ≈ 0.5 % at mid-span (top and bottom surfaces) — the plate has yielded locally.</li>
      <li>Force–deflection curve: linear at first, then bending over as the plate yields, reaching about 500 N at 5 mm.
        <span class="result">δ = 5 mm · PEEQ_max ≈ 0.5 % · nonlinear F–δ curve</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Turn Nlgeom on for large deformation.</li>
  <li>Rigid parts need a reference point to carry BCs and to read forces.</li>
  <li>Plot PEEQ: any non-zero value means permanent deformation.</li>
</ul>` }
      ]
    }
  ]
});
