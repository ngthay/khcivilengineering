/* Lesson 6 — Project 3: 2D shell, plate with a circular hole (videos 22–25) */
KCE_COURSE.lessons.push({
  id: 'plate-hole',
  num: 6,
  title: 'Project 3 — Shell Plate with a Circular Hole',
  desc: '2D element library, the concept of linear static analysis, shell sections, partitioning for a mapped mesh, shell edge loads, and the stress concentration factor compared with theory.',
  icon: '⭕',
  color: 'blue',
  meta: ['Section 4', 'S4R shell', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Linear static analysis</strong> assumes small deformation, linear elastic material and loads applied slowly with no inertia: \([K]\{u\} = \{F\}\). A thin plate is modelled with <strong>shell elements</strong> on its mid-surface; the thickness is a section property. A hole raises the stress locally — the <strong>stress concentration</strong>.</p>` },
        { title: 'Description', html: String.raw`
<p><strong>Problem:</strong> a plate 70 mm × 50 mm, 1.2 mm thick, with a hole of radius 4 mm at its centre, is pulled by 1500 N on one short edge and held on the other. E = 210 GPa, ν = 0.3. Find the maximum stress near the hole and its difference from theory.</p>
<p>2D element library: plane stress (thin, in-plane loads), plane strain (long bodies), axisymmetric, and <strong>shells</strong> (S3R, S4R, S8R) for thin parts loaded in and out of plane.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Part:</strong> 3D → Deformable → Shell → Planar; sketch the 70 × 50 rectangle and the 8 mm hole.</li>
  <li><strong>Property:</strong> steel; Create Section → Shell → Homogeneous, thickness 1.2; assign; check with <em>Render shell thickness</em>.</li>
  <li><strong>Step:</strong> Static, General.</li>
  <li><strong>Mesh:</strong> partition the face through the hole centre (four quadrants) so a structured quad mesh fits; fine seed around the hole; element S4R.</li>
  <li><strong>Load:</strong> Shell edge load = 1500/50 = 30 N/mm on the right edge; BC: encastre (or symmetry) on the left edge.</li>
  <li><strong>Job</strong> → Submit; <strong>Visualization:</strong> U1, S11 / Mises with max location; XY plot of the summed reactions (RF1) = 1500 N.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Plate with hole">
    <rect class="comp" x="100" y="40" width="280" height="150"/><circle class="conc" cx="240" cy="115" r="16"/>
    <path class="ln" d="M100 40 V190"/><path class="dim" d="M88 50 L100 40 M88 80 L100 70 M88 110 L100 100 M88 140 L100 130 M88 170 L100 160"/>
    <g class="acc"><path d="M380 60 H430 M380 100 H430 M380 140 H430 M380 175 H430"/></g>
    <g class="accf"><polygon points="436,60 426,55 426,65"/><polygon points="436,100 426,95 426,105"/><polygon points="436,140 426,135 426,145"/><polygon points="436,175 426,170 426,180"/></g>
    <text x="440" y="120">1500 N</text><text x="224" y="146" class="m">Ø 8</text>
    <path class="dim" d="M100 206 H380"/><text x="226" y="218" class="m">70 mm</text><text x="44" y="120" class="m">50 mm</text>
    <circle class="accf" cx="240" cy="99" r="4"/><text x="250" y="96" class="a">σ_max</text>
  </svg>
  <figcaption>Figure 1 — Tensile plate: the peak stress is at the top and bottom of the hole.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Theoretical calculation', html: String.raw`
<p>Shell edge load \(= 1500/50 = 30\) N/mm; gross stress \(= 1500/(50 \times 1.2) = 25\) MPa.</p>
$$\sigma_{nom} = \frac{F}{(w - d)t} = \frac{1500}{(50 - 8)(1.2)} = 29.76\ \text{MPa},\qquad \sigma_{max} = K_t\sigma_{nom}$$
<p>For \(d/w = 8/50 = 0.16\) the chart gives \(K_t \approx 2.55\) → \(\sigma_{max} = 2.55 \times 29.76 = 75.9\) MPa.</p>` }
      ]
    },
    {
      title: 'Results',
      subs: [
        { title: 'Comparison', html: String.raw`
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th></th><th>σ_max (MPa)</th></tr></thead>
  <tbody>
    <tr><td>Theory (K_t = 2.55)</td><td>75.9</td></tr>
    <tr><td>Abaqus (S4R)</td><td>72.5</td></tr>
    <tr><td>Difference</td><td>4.3 %</td></tr>
  </tbody>
</table></div>
<p>The maximum stress is at the edge of the hole, perpendicular to the load. Maximum displacement U1 ≈ 0.009 mm at the loaded edge. A finer mesh at the hole moves the FEA result closer to theory.</p>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Shells need a thickness — render it to check.</li>
  <li>Partition around holes for a clean quad mesh and refine there.</li>
  <li>Check that the summed reaction equals the applied load.</li>
</ul>` }
      ]
    }
  ]
});
