/* Lesson 5 — Project 2: 1D cantilever beam (videos 20–21) */
KCE_COURSE.lessons.push({
  id: 'beam',
  num: 5,
  title: 'Project 2 — 1D Cantilever Beam',
  desc: 'A 3D wire beam with a rectangular profile, beam orientation, B31 elements, deflection, bending stress and reaction compared with theory.',
  icon: '➖',
  color: 'rose',
  meta: ['Section 3', 'B31 beam', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Beam elements carry axial force, bending, shear and torsion, so the section shape and its <strong>orientation</strong> must be defined. A cantilever is a good first test because the exact answer is known.</p>` },
        { title: 'Description', html: String.raw`
<p><strong>Problem:</strong> a cantilever of length 200 mm with a 4 mm × 4 mm square section carries 60 N at the free end. E = 2e5 MPa, ν = 0.3, ρ = 7.85e-9. Find the maximum deflection, maximum stress and reaction, and compare with theory.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Part:</strong> 3D → Deformable → Wire; line of 200 mm.</li>
  <li><strong>Property:</strong> material; <em>Create Profile</em> → Rectangular (4 × 4) (or T-shape etc.); Create Section → Beam → Beam, with the profile; Assign Section; <em>Assign Beam Orientation</em> (n₁ direction, e.g. 0, 0, −1). Turn on <em>View → Part Display → Render beam profiles</em> to check.</li>
  <li><strong>Step:</strong> Static, General. <strong>Load:</strong> CF2 = −60 at the free end; BC: Encastre at the other end.</li>
  <li><strong>Mesh:</strong> seed (e.g. 20 elements), element type <em>Beam B31</em>.</li>
  <li><strong>Job</strong> → Submit. <strong>Visualization:</strong> U2, S11 (bottom-left corner of the section), RF2.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 180" role="img" aria-label="Cantilever beam">
    <rect class="conc" x="40" y="40" width="14" height="80"/><path class="ln" d="M54 80 H380"/><path class="dim" d="M54 80 Q 260 92 380 128"/>
    <path class="acc" d="M380 30 V74"/><polygon class="accf" points="380,78 375,68 385,68"/><text x="388" y="44">60 N</text>
    <rect class="comp" x="440" y="60" width="40" height="40"/><text x="446" y="120" class="m">4 × 4 mm</text>
    <path class="dim" d="M54 150 H380"/><text x="196" y="168" class="m">200 mm</text><text x="386" y="134" class="m">δ = 37.5 mm</text>
  </svg>
  <figcaption>Figure 1 — Cantilever with a tip load; the beam profile is a 4 mm square.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Theoretical calculation', html: String.raw`
$$I = \frac{bh^3}{12} = \frac{4(4)^3}{12} = 21.3\ \text{mm}^4,\qquad \delta = \frac{FL^3}{3EI} = \frac{60(200)^3}{3(2\times10^5)(21.3)} = 37.5\ \text{mm}$$
$$\sigma = \frac{My}{I} = \frac{60(200)(2)}{21.3} = 1125\ \text{MPa},\qquad R = 60\ \text{N}$$
<p>(The stress is far above yield — the example only checks the elastic solver.)</p>` }
      ]
    },
    {
      title: 'Results',
      subs: [
        { title: 'Comparison', html: String.raw`
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th></th><th>Max deflection (mm)</th><th>Max stress (MPa)</th><th>Reaction (N)</th></tr></thead>
  <tbody>
    <tr><td>Theory</td><td>37.5</td><td>1125</td><td>60</td></tr>
    <tr><td>Abaqus (B31)</td><td>37.5</td><td>1117</td><td>60</td></tr>
    <tr><td>Difference</td><td>0 %</td><td>0.7 %</td><td>0 %</td></tr>
  </tbody>
</table></div>
<p>Abaqus reports stress at integration points, slightly inside the fixed end, so it reads a little below the peak.</p>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Always assign a beam orientation, and render the profiles to check it.</li>
  <li>S11 at a section point shows the bending stress; choose the extreme fibre.</li>
  <li>A beam model this simple must match theory — if not, look for unit or orientation errors.</li>
</ul>` }
      ]
    }
  ]
});
