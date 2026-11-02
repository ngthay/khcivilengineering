/* Lesson 1 — Properties of reinforced concrete */
KCE_COURSE.lessons.push({
  id: 'properties',
  num: 1,
  title: 'Properties of Reinforced Concrete',
  desc: 'Concrete and steel as materials: strength, modulus, creep, shrinkage, rebar sizes, cover, φ factors and ASCE 7-22 loads.',
  icon: '🧪',
  color: 'peach',
  meta: ['ACI 318M-19 Ch.5, 19–21', 'ASCE 7-22 Ch.2, 4', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Reinforced concrete (RC) combines two materials that complement each other: <strong>concrete</strong>, which is strong and cheap in compression but weak and brittle in tension, and <strong>steel reinforcing bars</strong>, which carry the tension. Because the two have almost the same thermal expansion coefficient and concrete bonds well to deformed bars, they deform together and act as one material.</p>
<p>This first lesson sets out the material properties used in every later lesson: the compressive strength \(f'_c\), the modulus of elasticity \(E_c\), the modulus of rupture \(f_r\), and time effects (creep and shrinkage). It also covers the yield strength \(f_y\) of rebar, bar sizes, concrete cover, the strength reduction factors \(\phi\) of ACI 318-19, and the loads and load combinations of ASCE/SEI 7-22.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Item</th><th>Value used in this course</th></tr></thead>
  <tbody>
    <tr><th>Design code</th><td>ACI 318M-19 (SI) — strength design</td></tr>
    <tr><th>Loads</th><td>ASCE/SEI 7-22: live loads (Table 4.3-1) and strength load combinations (§2.3)</td></tr>
    <tr><th>Concrete</th><td>\(f'_c \ge 17\) MPa (ACI Table 19.2.1.1), cylinder 150 × 300 mm at 28 days</td></tr>
    <tr><th>Reinforcement</th><td>Deformed bars (DB), Grade 280 – 550 (\(f_y\) = 280 – 550 MPa); round bars (RB) mainly for ties</td></tr>
    <tr><th>Steel modulus</th><td>\(E_s\) = 200 000 MPa (§20.2.2.2)</td></tr>
    <tr><th>Unit weight</th><td>Reinforced concrete ≈ 24 kN/m³</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose the concrete strength \(f'_c\) and steel grade \(f_y\) for the project.</li>
  <li>Derive the properties needed in design: \(E_c\), \(f_r\), \(\beta_1\), \(\varepsilon_{ty} = f_y/E_s\).</li>
  <li>Select bar sizes and respect spacing and cover rules.</li>
  <li>Take loads from ASCE 7-22 and combine them with the §2.3 strength combinations to get \(U\).</li>
  <li>Compare factored actions with the design strength \(\phi S_n\) (lessons 2 – 14).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 250" role="img" aria-label="Stress-strain curves of concrete and steel">
    <!-- concrete -->
    <line class="thin" x1="40" y1="210" x2="300" y2="210"/><line class="thin" x1="40" y1="210" x2="40" y2="30"/>
    <path class="acc" d="M40 210 C 90 120, 130 70, 170 62 S 240 90, 280 120"/>
    <line class="dim" x1="170" y1="62" x2="170" y2="210"/><line class="dim" x1="40" y1="62" x2="170" y2="62"/>
    <text x="20" y="66">f'c</text><text x="150" y="226" class="m">≈0.002</text><text x="262" y="226" class="m">0.003</text>
    <text x="110" y="24" class="a">Concrete</text><text x="250" y="244" class="m">strain ε</text>
    <!-- steel -->
    <line class="thin" x1="370" y1="210" x2="620" y2="210"/><line class="thin" x1="370" y1="210" x2="370" y2="30"/>
    <path class="acc" d="M370 210 L400 80 L560 80 L610 60" style="stroke:#e0565b"/>
    <line class="dim" x1="400" y1="80" x2="400" y2="210"/>
    <text x="352" y="84">fy</text><text x="390" y="226" class="m">εty = fy/Es</text>
    <text x="470" y="24" class="a" style="fill:#e0565b">Steel</text><text x="470" y="74" class="m">yield plateau</text>
  </svg>
  <figcaption>Figure 1 — Concrete is nonlinear and crushes at ε = 0.003 (ACI §22.2.2.1); steel is elastic–plastic with a long yield plateau.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Concrete',
      subs: [
        { title: 'Compressive strength', html: String.raw`
<p>The specified compressive strength \(f'_c\) is measured on 150 × 300 mm cylinders at 28 days. ACI 318-19 requires \(f'_c \ge 17\) MPa for structural concrete (more for some exposure classes and seismic members). Strength grows with age; for ordinary Portland cement the 7-day strength is about 65 – 70 % of \(f'_c\). Main factors that control strength:</p>
<ul>
  <li><strong>Water–cementitious materials ratio</strong> — the most important factor; lower w/cm gives higher strength and durability (ACI Table 19.3.2.1 sets maximum w/cm by exposure class).</li>
  <li>Type of cement, aggregate quality and grading, admixtures.</li>
  <li><strong>Curing</strong> — keep moist for at least 7 days; drying early can lose 30 – 40 % of strength.</li>
  <li>Age of concrete and temperature.</li>
</ul>
<p>Cube strength (150 mm cube) is roughly 1.20 – 1.25 × cylinder strength; for example a cube strength of 300 ksc ≈ 24 MPa cylinder.</p>` },
        { title: 'Modulus of elasticity', html: String.raw`
<p>ACI 318-19 §19.2.2.1 gives the modulus of normal-weight concrete:</p>
$$E_c = 4700\sqrt{f'_c}\ \text{(MPa)}\qquad\text{or in general}\qquad E_c = w_c^{1.5}\,0.043\sqrt{f'_c}$$
<p>with \(w_c\) the unit weight in kg/m³ (1440 – 2560). The modular ratio \(n = E_s/E_c\) is used to transform steel into an equivalent concrete area in elastic (cracked-section) analysis.</p>` },
        { title: 'Tensile strength and modulus of rupture', html: String.raw`
<p>Direct tensile strength is only about 8 – 15 % of \(f'_c\). For cracking and deflection checks ACI §19.2.3.1 uses the modulus of rupture:</p>
$$f_r = 0.62\,\lambda\sqrt{f'_c}\ \text{(MPa)}$$
<p>where \(\lambda\) = 1.0 for normal-weight concrete and 0.75 – 1.0 for lightweight concrete (§19.2.4).</p>` },
        { title: 'Creep and shrinkage', html: String.raw`
<p><strong>Creep</strong> is the increase in strain under sustained stress. Final creep strain is about 1.5 – 3 times the elastic strain, so long-term deflection of beams and slabs is much larger than the immediate deflection. ACI §24.2.4.1 multiplies the immediate sustained-load deflection by \(\lambda_\Delta = \xi/(1+50\rho')\) (\(\xi\) = 2.0 at 5 years or more), so compression steel reduces it.</p>
<p><strong>Shrinkage</strong> is the volume loss as concrete dries (ultimate strain ≈ 0.0002 – 0.0008). Restrained shrinkage causes cracks, which is why slabs need a minimum <em>shrinkage and temperature</em> reinforcement of \(0.0018A_g\) (ACI §24.4.3.2, lesson 11).</p>` },
        { title: 'Worked example', html: String.raw`
<div class="ex">
  <div class="ex-head">Example 1 — Properties of \(f'_c\) = 25 MPa concrete</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Modulus of elasticity: \(E_c = 4700\sqrt{25} = 23\,500\) MPa.</li>
      <li>Modular ratio: \(n = 200\,000/23\,500 = 8.5\).</li>
      <li>Modulus of rupture: \(f_r = 0.62\sqrt{25} = 3.1\) MPa.</li>
      <li>Expected 7-day strength ≈ 0.70 × 25 = 17.5 MPa.</li>
      <li>Stress-block factor: \(\beta_1 = 0.85\) (since \(f'_c \le 28\) MPa, ACI Table 22.2.2.4.3).</li>
    </ol>
  </div>
</div>` }
      ]
    },
    {
      title: 'Reinforcing Steel',
      subs: [
        { title: 'Grades and properties', html: String.raw`
<table class="tbl">
  <thead><tr><th>Grade (ASTM A615M / A706M)</th><th>Nearest Thai grade (TIS 24)</th><th>\(f_y\) (MPa)</th><th>\(\varepsilon_{ty} = f_y/E_s\)</th></tr></thead>
  <tbody>
    <tr><td>Grade 280</td><td>SD30 (\(f_y\) = 295)</td><td>280</td><td>0.0014</td></tr>
    <tr><td>Grade 420</td><td>SD40 (\(f_y\) = 390)</td><td>420</td><td>0.0021 (0.002 permitted, §21.2.2.1)</td></tr>
    <tr><td>Grade 550</td><td>SD50 (\(f_y\) = 490)</td><td>550</td><td>0.00275</td></tr>
    <tr><td>—</td><td>Round bar SR24</td><td>235 – 240</td><td>0.0012 — ties and spirals only</td></tr>
  </tbody>
</table>
<p>All grades have \(E_s\) = 200 000 MPa. ACI 318-19 Table 20.2.2.4(a) limits the design value of \(f_y\): up to 550 MPa for flexure and axial load (690 MPa in special cases), and \(f_{yt} \le 420\) MPa for shear reinforcement. Higher grades also increase development lengths through the grade factor \(\psi_g\) (lesson 6).</p>` },
        { title: 'Bar areas', html: String.raw`
<p>Area of one bar \(A_b = \pi d_b^2/4\). The table below gives the total area (cm²) of 1 – 15 bars, and the mass per metre (\(7850\) kg/m³).</p>
<div data-widget="bar-table"></div>` },
        { title: 'Spacing and cover', html: String.raw`
<p><strong>Minimum spacing (ACI §25.2.1):</strong> clear spacing between parallel bars in a layer ≥ max(25 mm, \(d_b\), \(\tfrac43 d_{agg}\)). Bars in layers: upper bars directly above lower bars, clear distance between layers ≥ 25 mm. Column bars (§25.2.3): clear spacing ≥ max(40 mm, 1.5\(d_b\), \(\tfrac43 d_{agg}\)).</p>
<table class="tbl">
  <thead><tr><th>Exposure (ACI Table 20.5.1.3.1)</th><th>Member / bars</th><th>Cover (mm)</th></tr></thead>
  <tbody>
    <tr><td>Cast against and permanently in contact with ground</td><td>All</td><td>75</td></tr>
    <tr><td rowspan="2">Exposed to weather or in contact with ground</td><td>No. 19 (DB20) and larger</td><td>50</td></tr>
    <tr><td>No. 16 (DB16) and smaller</td><td>40</td></tr>
    <tr><td rowspan="2">Not exposed to weather or ground</td><td>Slabs, joists, walls — No. 36 and smaller</td><td>20</td></tr>
    <tr><td>Beams, columns, pedestals — to stirrups/ties</td><td>40</td></tr>
  </tbody>
</table>` }
      ]
    },
    {
      title: 'Design Philosophy & Loads',
      subs: [
        { title: 'Strength design method', html: String.raw`
<p>The member is proportioned so that its <strong>design strength</strong> is at least the <strong>required strength</strong> from factored loads (ACI §4.6):</p>
$$\phi\,S_n \;\ge\; U$$
<p>The strength reduction factor \(\phi\) (ACI Table 21.2.1 and 21.2.2) depends on how ductile the failure is. For moment and axial force it is set by the net tensile strain \(\varepsilon_t\) of the extreme tension steel, compared with \(\varepsilon_{ty} = f_y/E_s\):</p>
<table class="tbl">
  <thead><tr><th>Net tensile strain \(\varepsilon_t\)</th><th>Classification</th><th>\(\phi\) — tied</th><th>\(\phi\) — spiral</th></tr></thead>
  <tbody>
    <tr><td>\(\varepsilon_t \le \varepsilon_{ty}\)</td><td>Compression-controlled</td><td>0.65</td><td>0.75</td></tr>
    <tr><td>\(\varepsilon_{ty} < \varepsilon_t < \varepsilon_{ty} + 0.003\)</td><td>Transition</td><td>\(0.65 + 0.25\dfrac{\varepsilon_t - \varepsilon_{ty}}{0.003}\)</td><td>\(0.75 + 0.15\dfrac{\varepsilon_t - \varepsilon_{ty}}{0.003}\)</td></tr>
    <tr><td>\(\varepsilon_t \ge \varepsilon_{ty} + 0.003\)</td><td>Tension-controlled</td><td colspan="2">0.90</td></tr>
  </tbody>
</table>
<table class="tbl">
  <thead><tr><th>Other actions (Table 21.2.1)</th><th>\(\phi\)</th></tr></thead>
  <tbody>
    <tr><td>Shear and torsion</td><td>0.75</td></tr>
    <tr><td>Bearing</td><td>0.65</td></tr>
    <tr><td>Strut-and-tie models</td><td>0.75</td></tr>
  </tbody>
</table>
<div class="note"><p><strong>Change from ACI 318-08:</strong> the tension-controlled limit was a fixed 0.005. Since ACI 318-19 it is \(\varepsilon_{ty} + 0.003\), so it grows with the steel grade (0.0051 for \(f_y\) = 410 MPa, 0.00575 for Grade 550). For Grade 420 it is permitted to use \(\varepsilon_{ty}\) = 0.002, giving 0.005.</p></div>` },
        { title: 'Live loads — ASCE 7-22', html: String.raw`
<p>Minimum uniformly distributed live loads \(L_o\) and concentrated loads from ASCE 7-22 Table 4.3-1 (selected rows):</p>
<table class="tbl">
  <thead><tr><th>Occupancy</th><th>Uniform (kN/m²)</th><th>Concentrated (kN)</th></tr></thead>
  <tbody>
    <tr><td>Residential: one- and two-family dwellings (all areas except stairs)</td><td>1.92</td><td>—</td></tr>
    <tr><td>Residential: other — private rooms and corridors serving them</td><td>1.92</td><td>—</td></tr>
    <tr><td>Residential: public rooms and corridors serving them</td><td>4.79</td><td>—</td></tr>
    <tr><td>Office buildings: offices</td><td>2.40</td><td>8.90</td></tr>
    <tr><td>Office buildings: lobbies and first-floor corridors</td><td>4.79</td><td>8.90</td></tr>
    <tr><td>Office buildings: corridors above first floor</td><td>3.83</td><td>8.90</td></tr>
    <tr><td>Schools: classrooms</td><td>1.92</td><td>4.45</td></tr>
    <tr><td>Stairs and exit ways (one- and two-family dwellings only: 1.92)</td><td>4.79</td><td>1.33 on 50 × 50 mm</td></tr>
    <tr><td>Ordinary flat, pitched and curved roofs \(L_r\)</td><td>0.96</td><td>1.33 (maintenance workers)</td></tr>
  </tbody>
</table>
<p>Members with a large influence area may use reduced live load \(L = L_o\left(0.25 + \dfrac{4.57}{\sqrt{K_{LL}A_T}}\right)\) (§4.7), not less than 0.50\(L_o\) (one floor) or 0.40\(L_o\) (two or more floors).</p>` },
        { title: 'Load combinations', html: String.raw`
<p>ASCE 7-22 §2.3.1 and §2.3.6 (the same set is repeated in ACI 318-19 Table 5.3.1). D = dead, L = live, L<sub>r</sub> = roof live, S = snow, R = rain, W = wind, E = earthquake:</p>
<table class="tbl">
  <tbody>
    <tr><td>1.</td><td>U = 1.4D</td></tr>
    <tr><td>2.</td><td>U = 1.2D + 1.6L + 0.5(L<sub>r</sub> or 0.3S or R)</td></tr>
    <tr><td>3.</td><td>U = 1.2D + (1.6L<sub>r</sub> or 1.0S or 1.6R) + (L or 0.5W)</td></tr>
    <tr><td>4.</td><td>U = 1.2D + 1.0W + L + 0.5(L<sub>r</sub> or 0.3S or R)</td></tr>
    <tr><td>5.</td><td>U = 0.9D + 1.0W</td></tr>
    <tr><td>6.</td><td>U = 1.2D + E<sub>v</sub> + E<sub>h</sub> + L + 0.15S</td></tr>
    <tr><td>7.</td><td>U = 0.9D − E<sub>v</sub> + E<sub>h</sub></td></tr>
  </tbody>
</table>
<ul>
  <li>ASCE 7-22 maps ground snow loads at strength level, so S takes a factor of 1.0 when it is the principal load and 0.3 as a companion load. ACI 318-19 Table 5.3.1 (written for ASCE 7-16) still shows 1.6S / 0.5S / 0.2S — use the ASCE 7-22 factors together with ASCE 7-22 snow loads.</li>
  <li>The factor on L in combinations 3, 4 and 6 may be 0.5 where \(L_o \le 4.79\) kN/m², except garages and places of public assembly.</li>
  <li>W is a strength-level wind load, so its factor is 1.0 (not the 1.6 of older codes).</li>
</ul>
<div class="tip"><p>Old lecture notes may use U = 1.4D + 1.7L with \(\phi\) = 0.90 / 0.70 / 0.85 (ACI 318-99), or 1.2D + 1.6L + 1.6W (ACI 318-08). Do not mix them with the ACI 318-19 \(\phi\) factors.</p></div>` },
        { title: 'Design checklist', html: String.raw`
<ul class="check">
  <li>State \(f'_c\), \(f_y\), \(E_s\), exposure and cover at the start of every calculation.</li>
  <li>Compute \(E_c\), \(f_r\), \(\beta_1\) and \(\varepsilon_{ty}\).</li>
  <li>Check bar spacing and cover (§25.2, Table 20.5.1.3.1) before finalising a bar layout.</li>
  <li>Take live loads from ASCE 7-22 Table 4.3-1; apply all relevant §2.3 combinations.</li>
  <li>Use the ACI 318-19 \(\phi\) factors with the ASCE 7-22 load factors — never mix code editions.</li>
</ul>` }
      ]
    }
  ]
});
