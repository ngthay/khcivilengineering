/* Lesson 1 — Simple stresses and strains (Bansal, Ch. 1) */
KCE_COURSE.lessons.push({
  id: 'simple-stress',
  num: 1,
  title: 'Simple Stresses and Strains',
  desc: 'Stress, strain, Hooke’s law, factor of safety, bars of varying and composite section, and thermal stresses.',
  icon: '📏',
  color: 'blue',
  meta: ['Bansal Ch. 1', 'Axial load', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>When an external force acts on a body, the body deforms and its molecules resist the deformation. The internal resisting force per unit area is the <strong>stress</strong>; the deformation per unit length is the <strong>strain</strong>. Within the elastic limit stress is proportional to strain (Hooke’s law), and the constant of proportionality is the modulus of elasticity \(E\).</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Quantity</th><th>Definition</th><th>Unit</th></tr></thead>
  <tbody>
    <tr><td>Normal stress \(\sigma\)</td><td>\(P/A\), acting normal to the section (tensile or compressive)</td><td>N/mm² = MPa</td></tr>
    <tr><td>Shear stress \(\tau\)</td><td>\(P/A\), acting tangential to the section</td><td>N/mm²</td></tr>
    <tr><td>Linear strain \(e\)</td><td>\(\delta L/L\)</td><td>—</td></tr>
    <tr><td>Shear strain \(\phi\)</td><td>Angle of distortion (rad)</td><td>—</td></tr>
    <tr><td>Young’s modulus \(E\)</td><td>\(\sigma/e\) within the elastic limit (steel ≈ 2×10⁵ N/mm²)</td><td>N/mm²</td></tr>
  </tbody>
</table>
<p>1 N/mm² = 10⁶ N/m² = 1 MPa; 1 GPa = 10³ MPa.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Draw the bar, mark the load and cut a section — the internal force equals the external force there.</li>
  <li>Stress \(\sigma = P/A\); strain \(e = \sigma/E\); elongation \(\delta L = PL/(AE)\).</li>
  <li>For several segments add the elongations; for composite bars use equal strain and force sharing.</li>
  <li>Compare the working stress with the permissible stress = ultimate stress ÷ factor of safety.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 220" role="img" aria-label="Bar in tension and stress-strain curve">
    <rect class="conc" x="60" y="70" width="220" height="50"/>
    <path class="acc" d="M60 95 h-40 M280 95 h40"/><polygon class="accf" points="20,95 30,90 30,100"/><polygon class="accf" points="320,95 310,90 310,100"/>
    <text x="14" y="84">P</text><text x="316" y="84">P</text>
    <path class="dim" d="M170 60 v70"/><text x="150" y="150" class="m">section x–x: σ = P/A</text>
    <path class="thin" d="M60 170 h220 M60 164 v12 M280 164 v12"/><text x="160" y="190">L (+δL)</text>
    <line class="thin" x1="390" y1="190" x2="620" y2="190"/><line class="thin" x1="390" y1="190" x2="390" y2="30"/>
    <path class="acc" d="M390 190 L450 80 C 470 70, 500 66, 540 52 C 570 46, 590 60, 610 80"/>
    <text x="440" y="74" class="m">elastic limit</text><text x="530" y="44" class="m">ultimate</text><text x="604" y="98" class="m">fracture</text>
    <text x="370" y="40">σ</text><text x="600" y="208">e</text><text x="404" y="150" class="a">E = σ/e</text>
  </svg>
  <figcaption>Figure 1 — Bar under axial pull and the stress–strain curve of mild steel; Hooke’s law holds up to the elastic limit.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Bars of varying section', html: String.raw`
<p>The same axial force passes through every segment; the elongations add:</p>
$$\delta L = \frac{P}{E}\left(\frac{L_1}{A_1} + \frac{L_2}{A_2} + \frac{L_3}{A_3} + \cdots\right)$$
<p><strong>Uniformly tapering circular rod</strong> (diameters \(D_1\) to \(D_2\)) and <strong>tapering rectangular bar</strong> (thickness \(t\), widths \(a\) to \(b\)):</p>
$$\delta L = \frac{4PL}{\pi E D_1D_2},\qquad \delta L = \frac{PL}{Et(a - b)}\ln\frac{a}{b}$$
<p><strong>Bar hanging under its own weight</strong> (unit weight \(\rho g\)): \(\delta L = \rho gL^2/(2E)\) — half that of the same weight applied at the end.</p>` },
        { title: 'Composite bars and thermal stresses', html: String.raw`
<p>Two materials fixed together carry a load with <strong>equal strain</strong>:</p>
$$\frac{\sigma_1}{E_1} = \frac{\sigma_2}{E_2},\qquad P = \sigma_1A_1 + \sigma_2A_2$$
<p>The ratio \(E_1/E_2\) is the <strong>modular ratio</strong>. A bar heated by \(T\) and prevented from expanding develops the thermal stress</p>
$$\sigma = \alpha TE\quad\left(\text{or } \sigma = \frac{\alpha TL - \delta}{L}E \text{ if the support yields by } \delta\right)$$` },
        { title: 'Factor of safety', html: String.raw`
$$\text{Factor of safety} = \frac{\text{Ultimate stress}}{\text{Permissible (working) stress}}$$
<p>From a tensile test: percentage elongation = \(100\,\delta L_{total}/L\); percentage reduction in area = \(100(A_0 - A_f)/A_0\).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Problem 1.1 — rod in tension', html: String.raw`
<div class="ex">
  <div class="ex-head">Rod L = 150 cm, D = 20 mm, axial pull P = 20 kN, E = 2.0×10⁵ N/mm². Find stress, strain and elongation.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(A = \frac{\pi}{4}(20)^2 = 100\pi = 314.16\) mm².</li>
      <li>\(\sigma = 20\,000/314.16 = 63.66\) N/mm².</li>
      <li>\(e = \sigma/E = 63.66/(2×10^5) = 0.000318\).</li>
      <li>\(\delta L = eL = 0.000318 × 1500 = 0.477\) mm.
        <span class="result">σ = 63.66 N/mm², e = 0.000318, δL = 0.477 mm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 1.4 — tensile test', html: String.raw`
<div class="ex">
  <div class="ex-head">Mild steel bar Ø30 mm, gauge length 200 mm; load at elastic limit 250 kN; extension 0.21 mm at 150 kN; maximum load 380 kN; total extension 60 mm; diameter at failure 22.5 mm.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(A = \frac{\pi}{4}(30)^2 = 706.86\) mm².</li>
      <li>Young’s modulus (within the elastic limit): \(E = \dfrac{150\,000/706.86}{0.21/200} = 2.02×10^5\) N/mm² = 202 GPa.</li>
      <li>Stress at elastic limit: \(250\,000/706.86 = 353.7\) N/mm².</li>
      <li>Percentage elongation = 60/200 × 100 = 30 %.</li>
      <li>Reduction in area = \((30^2 - 22.5^2)/30^2 × 100 = 43.75\) %.
        <span class="result">E = 202 GPa, σel = 353.7 MPa, elongation 30 %, area reduction 43.75 %</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 1.6 — hollow column', html: String.raw`
<div class="ex">
  <div class="ex-head">Hollow steel column, axial load 1.9 MN, ultimate stress 480 N/mm², factor of safety 4, external diameter 200 mm. Find the internal diameter.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Working stress = 480/4 = 120 N/mm².</li>
      <li>\(A = P/\sigma = 1\,900\,000/120 = 15\,833\) mm² = \(\frac{\pi}{4}(200^2 - d^2)\).</li>
      <li>\(d^2 = 40\,000 - 20\,159.6 = 19\,840.4\) → \(d = 140.9\) mm.
        <span class="result">Internal diameter d = 140.85 mm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use consistent units: N and mm give stress in N/mm² (MPa).</li>
  <li>Use the load and extension <em>within the elastic limit</em> to compute \(E\).</li>
  <li>For stepped bars add segment elongations; for composite bars use equal strain.</li>
  <li>Check working stress ≤ ultimate stress / factor of safety.</li>
</ul>` }
      ]
    }
  ]
});
