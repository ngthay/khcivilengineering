/* Lesson 3 — Abaqus basics and FEA fundamentals (videos 10–14) */
KCE_COURSE.lessons.push({
  id: 'basics-units',
  num: 3,
  title: 'FEA Workflow, Stress Outputs and Consistent Units',
  desc: 'Pre-processing, solution and post-processing, stress and strain, von Mises, equivalent plastic strain and principal stresses, types of loads, and Abaqus’ consistent unit system.',
  icon: '📏',
  color: 'amber',
  meta: ['Section 2', 'mm · N · MPa · tonne', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Every FEA program follows three stages. Abaqus/CAE groups them in <strong>modules</strong> chosen from the Module list: Part, Property, Assembly, Step, Interaction, Load, Mesh, Job and Visualization.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Pre-processor</th><td>Geometry creation / modification / import; mesh; element types; material properties; boundary conditions; loads</td></tr>
    <tr><th>Solution</th><td>Solving (Job → Submit); monitor for warnings and errors</td></tr>
    <tr><th>Post-processing</th><td>Results visualisation: stresses, strains, displacements, reaction forces, XY plots</td></tr>
  </tbody>
</table>
<p><strong>Loads</strong>: concentrated force, moment, pressure, shell edge load, surface traction, gravity, body force, bolt load; plus boundary conditions (fixed, pinned, displacement) and predefined fields (temperature).</p>` },
        { title: 'Methodology', html: String.raw`
<p>Abaqus has <strong>no built-in units</strong> — every input must be in one consistent set. The course uses SI (mm):</p>
<table class="tbl num">
  <thead><tr><th>Quantity</th><th>Unit</th><th>Quantity</th><th>Unit</th></tr></thead>
  <tbody>
    <tr><td>Length</td><td>mm</td><td>Time</td><td>s</td></tr>
    <tr><td>Force</td><td>N</td><td>Mass</td><td>tonne</td></tr>
    <tr><td>Stress / E</td><td>MPa (N/mm²)</td><td>Density</td><td>tonne/mm³ (steel 7.85e-9)</td></tr>
    <tr><td>Angle</td><td>radians</td><td>Displacement</td><td>mm</td></tr>
  </tbody>
</table>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 160" role="img" aria-label="Rod example of unit consistency">
    <path class="ln" d="M40 40 V120"/><path class="dim" d="M30 50 L40 40 M30 70 L40 60 M30 90 L40 80 M30 110 L40 100"/>
    <path class="acc" d="M40 80 H360"/><polygon class="accf" points="380,80 360,72 360,88"/>
    <text x="390" y="85">45 000 N</text><text x="180" y="110" class="m">L = 2 m → enter 2000</text>
    <text x="120" y="40" class="m">E = 2e11 Pa → enter 2.1e5 MPa · ρ = 7.85e-9 t/mm³</text>
  </svg>
  <figcaption>Figure 1 — Converting a 2 m steel rod into consistent mm–N–MPa units.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Stress and strain outputs', html: String.raw`
<ul>
  <li><strong>Stress</strong> \(\sigma = F/A\) — internal resistance per unit area (Pa, MPa). <strong>Strain</strong> \(\varepsilon = \Delta L/L\) — change in length over original length. Simple analogy: stress = how hard you pull, strain = how much it stretches.</li>
  <li>Direct stresses: <em>normal</em> (tension/compression, S11, S22, S33) and <em>shear</em> (S12 …).</li>
  <li><strong>S, Mises</strong> — von Mises stress, one value combining all components; compare with the yield stress for ductile metals.</li>
  <li><strong>PEEQ</strong> — equivalent plastic strain, how close the material is to failure; zero means no yielding.</li>
  <li><strong>S, Max. Principal</strong> — largest normal stress (most tensile); <strong>S, Min. Principal</strong> — smallest (most compressive).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Converting inputs', html: String.raw`
<div class="ex">
  <div class="ex-head">A steel rod 2 m long, E = 210 GPa, ρ = 7850 kg/m³, carries 45 kN. Write the Abaqus inputs.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Length 2 m → <strong>2000</strong> mm. Force 45 kN → <strong>45000</strong> N.</li>
      <li>E = 210 GPa = 210 000 N/mm² → <strong>2.1e5</strong> MPa.</li>
      <li>ρ = 7850 kg/m³ = 7.85 t/m³ = 7.85 × 10⁻⁹ t/mm³ → <strong>7.85e-9</strong>.
        <span class="result">Results then come out in mm and MPa</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>The commonest error is mixing units — length in m with E in MPa gives nonsense.</li>
  <li>Density in tonne/mm³ is needed for gravity and dynamics (mm–N system).</li>
  <li>Use Mises for ductile yield checks and principal stresses for brittle materials.</li>
</ul>` }
      ]
    }
  ]
});
