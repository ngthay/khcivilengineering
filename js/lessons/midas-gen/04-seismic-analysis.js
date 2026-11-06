/* Lesson 4 — Static seismic loads, response spectrum, P-Delta and eigenvalue analysis */
KCE_COURSE.lessons.push({
  id: 'seismic-analysis',
  num: 4,
  title: 'Seismic Loads and Analysis — ELF, Response Spectrum, P-Delta and Modes',
  desc: 'ASCE 7-10 site coefficients and design spectral accelerations, the seismic design category, the period limit CᵤTₐ, the seismic response coefficient, accidental eccentricity load cases, the response spectrum function and load cases RX and RY, P-Delta control and the eigenvalue analysis.',
  icon: '🌐',
  color: 'violet',
  meta: ['ASCE 7-10 §11–12', 'RSA · P-Δ', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
${midasSource}
<p>Two kinds of earthquake load are defined. The <strong>static</strong> equivalent lateral force (ELF) cases EXP, EXN, EYP and EYN give the code base shear V and include accidental torsion. The <strong>response spectrum</strong> cases RX and RY give the dynamic distribution of forces over the height. ASCE 7-10 §12.9.4 then requires the spectrum results to be scaled up if their base shear is less than 85 % of V (Lesson 5).</p>` },
        { title: 'Design spectral accelerations', html: String.raw`
<p>From the mapped values for the site (S_S = 1.0 g, S₁ = 0.3 g) and site class C (ASCE 7-10 Tables 11.4-1 and 11.4-2):</p>
$$F_a = 1.0,\quad F_v = 1.5\qquad S_{MS} = F_aS_S = 1.0\,g,\quad S_{M1} = F_vS_1 = 0.45\,g$$
$$S_{DS} = \tfrac23S_{MS} = 0.667\,g,\qquad S_{D1} = \tfrac23S_{M1} = 0.30\,g$$
$$T_s = \frac{S_{D1}}{S_{DS}} = 0.45\ \text{s},\qquad T_0 = 0.2T_s = 0.09\ \text{s}$$
<figure class="fig">
  <svg viewBox="0 0 540 240" role="img" aria-label="ASCE 7-10 design response spectrum for SDS 0.667 g and SD1 0.30 g">
    <path class="thin" d="M60 200H500 M60 200V20"/>
    <g class="m" text-anchor="middle"><text x="60.0" y="216">0</text><text x="133.3" y="216">0.5</text><text x="206.7" y="216">1</text><text x="280.0" y="216">1.5</text><text x="353.3" y="216">2</text><text x="426.7" y="216">2.5</text><text x="500.0" y="216">3</text></g>
    <g class="m" text-anchor="end"><text x="54" y="204.0">0.0</text><text x="54" y="161.5">0.2</text><text x="54" y="119.0">0.4</text><text x="54" y="76.5">0.6</text><text x="54" y="34.0">0.8</text></g>
    <polyline class="acc" fill="none" points="60.0,143.3 63.3,122.1 66.6,100.8 69.9,79.6 73.2,58.3 73.2,58.3 86.4,58.3 99.6,58.3 112.8,58.3 126.0,58.3 126.0,58.3 132.3,70.7 138.7,81.2 145.0,90.0 151.4,97.7 157.7,104.3 164.0,110.1 170.4,115.3 176.7,119.9 183.1,124.0 189.4,127.7 195.7,131.1 202.1,134.2 208.4,137.0 214.7,139.6 221.1,142.0 227.4,144.2 233.8,146.2 240.1,148.1 246.4,149.8 252.8,151.5 259.1,153.0 265.5,154.5 271.8,155.9 278.1,157.1 284.5,158.3 290.8,159.5 297.2,160.6 303.5,161.6 309.8,162.6 316.2,163.5 322.5,164.4 328.8,165.2 335.2,166.0 341.5,166.8 347.9,167.5 354.2,168.2 360.5,168.9 366.9,169.5 373.2,170.1 379.6,170.7 385.9,171.3 392.2,171.9 398.6,172.4 404.9,172.9 411.3,173.4 417.6,173.9 423.9,174.3 430.3,174.7 436.6,175.2 442.9,175.6 449.3,176.0 455.6,176.4 462.0,176.7 468.3,177.1 474.6,177.5 481.0,177.8 487.3,178.1 493.7,178.4 500.0,178.8"/>
    <path class="dim" d="M73.2 200V58.3 M126.0 200V58.3 M236.0 200V146.9H60"/>
    <circle cx="236.0" cy="146.9" r="4" class="accf"/>
    <text x="134.0" y="52.3" class="a">S_DS = 0.667 g</text>
    <text x="244.0" y="138.9" class="a">T = 1.2 s: S_a = 0.25 g</text>
    <text x="353.3" y="154.1" class="m">S_D1 / T</text>
    <text x="67.2" y="230" class="m" text-anchor="end">T₀ = 0.09</text><text x="130.0" y="230" class="m">T_s = 0.45</text>
    <text x="490" y="230" class="m" text-anchor="end">T (s)</text><text x="12" y="18" class="m">S_a (g)</text>
  </svg>
  <figcaption>Figure 1 — ASCE 7-10 design spectrum for these values (5 % damping), drawn for this course; the plateau is S_DS, the descending branch S_D1/T.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Design Procedure',
      subs: [
        { title: 'Static seismic load cases', html: String.raw`
<p><em>Load › Static Loads › Lateral › Seismic Loads</em>, code IBC 2012 (ASCE 7-10):</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Input</th><th>EXP</th><th>EXN</th><th>EYP</th><th>EYN</th></tr></thead>
  <tbody>
    <tr><td>Site class, S_S, S₁, I_e</td><td colspan="4">C, 1.0, 0.3, 1.0 (seismic design category entered as E in the tutorial)</td></tr>
    <tr><td>Period (code), X / Y</td><td>1.2 / 0</td><td>1.2 / 0</td><td>0 / 1.2</td><td>0 / 1.2</td></tr>
    <tr><td>R, X / Y</td><td colspan="4">8 (special moment frame) / 8 (dual system with special walls)</td></tr>
    <tr><td>Scale factor X / Y</td><td>1 / 0</td><td>1 / 0</td><td>0 / 1</td><td>0 / 1</td></tr>
    <tr><td>Accidental eccentricity</td><td>positive</td><td>negative</td><td>positive</td><td>negative</td></tr>
  </tbody>
</table></div>
<p>Enter each case and click ${mIco('5832601')}; after EYN click ${mIco('5856281')} and ${mIco('5872537')}.</p>
${mRow(['0536729', '0557081'], 'Figure 2 — Static seismic load input (IBC 2012 / ASCE 7-10) for the four cases EXP, EXN, EYP and EYN.')}
<p><strong>Accidental eccentricity</strong> (§12.8.4.2): the centre of mass is moved by ±5 % of the plan dimension perpendicular to the load — ±0.05 × 66 = ±3.3 ft for loads in X and ±0.05 × 182 = ±9.1 ft for loads in Y. Two cases per direction cover both senses of the resulting torsion.</p>` },
        { title: 'Response spectrum function and load cases', html: String.raw`
<ol>
  <li><em>Load › Seismic › Response Spectrum Data › Response Spectrum Functions</em> › <strong>Design Spectrum</strong>: IBC 2012 (ASCE 7-10), site class C, S_S = 1.0, S₁ = 0.3 ${mIco('0565017')} ${mIco('0565017')}, then ${mIco('5953177')}. The program draws the spectrum of Figure 1 (damping 5 %).
    ${mImg('5963545', 'Figure 3 — Response spectrum function: the IBC 2012 (ASCE 7-10) design spectrum for site class C.')}</li>
  <li><em>Response Spectrum Load Cases</em>:
    <ul>
      <li><strong>RX</strong>: direction X-Y, excitation angle 0°, scale factor <strong>I/R = 1/8 = 0.125</strong>, period modification 1, linear interpolation, accidental eccentricity on, modal combination <strong>SRSS</strong>, ${mIco('5979929')}.</li>
      <li><strong>RY</strong>: the same with excitation angle 90°, ${mIco('5979929')}, then ${mIco('5953177')}.</li>
    </ul></li>
</ol>
${mImg('5994777', 'Figure 4 — Response spectrum load cases RX and RY with the scale factor I/R = 0.125.')}
<p>The spectrum is the elastic demand; multiplying by I_e/R reduces it to the design level for a ductile system, exactly as in the static formula C_s = S_DS/(R/I_e).</p>
<div class="note">SRSS is appropriate when the modal periods are well separated. For buildings with closely spaced modes (often torsional and translational modes near each other) use <strong>CQC</strong>, which midas Gen also offers.</div>` },
        { title: 'P-Delta and eigenvalue analysis', html: String.raw`
<ul>
  <li><em>Analysis › P-Delta Analysis Control</em>: 5 iterations, tolerance 10⁻⁵, P-Delta load combination <strong>DL × 1.0</strong> ${mIco('5979929')} <strong>+ LL × 0.25</strong> ${mIco('5979929')}, then ${mIco('0701593')}. midas Gen iterates on this gravity load to find the geometric stiffness, then uses the reduced stiffness for all load cases, including the eigenvalue and spectrum analyses.</li>
  <li><em>Analysis › Eigenvalue Analysis Control</em>: Eigen vectors by <strong>subspace iteration</strong>, 10 frequencies, 20 iterations, tolerance 10⁻¹⁰, ${mIco('0701593')}.</li>
  <li><em>Analysis › Perform Analysis</em>.</li>
</ul>
${mRow(['0741913', '6040601'], 'Figure 5 — The P-Delta and eigenvalue analysis control dialogs.')}
<p>After the run, check the <strong>mass participation</strong> table (Results › Result Tables › Vibration Mode Shape): ASCE 7-10 §12.9.1 requires enough modes for at least 90 % of the mass in each direction. If 10 modes are not enough, increase the number.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Hand check of the static seismic coefficient', html: String.raw`
<div class="ex">
  <div class="ex-head">Check the seismic response coefficient that midas Gen uses for the ELF cases (h_n = 148 ft, T = 1.2 s, R = 8, I_e = 1.0).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Approximate period (§12.8.2.1), “all other structures”: \(T_a = C_th_n^x = 0.02 \times 148^{0.75} = 0.849\) s. With S_D1 = 0.30, C_u = 1.4, so the upper limit is \(C_uT_a = 1.19 \approx 1.2\) s — the value entered in the tutorial.
        For the concrete moment frame alone (C_t = 0.016, x = 0.9), \(T_a = 1.44\) s and \(C_uT_a = 2.01\) s; using 1.2 s in X is therefore conservative.</li>
      <li>\(C_s = S_{DS}/(R/I_e) = 0.667/8 = 0.0833\).</li>
      <li>Upper limit (T ≤ T_L): \(S_{D1}/[T(R/I_e)] = 0.30/(1.2 \times 8) = 0.0313\) — governs.</li>
      <li>Lower limit: \(0.044S_{DS}I_e = 0.0293 \ge 0.01\); S₁ &lt; 0.6 g, so the extra limit does not apply.</li>
      <li>Vertical distribution exponent \(k = 1 + (1.2 - 0.5)/2 = 1.35\).
        <span class="result">C_s = 0.0313: V = 3.13 % of the seismic weight W in each direction; F_x ∝ w_x h_x^1.35</span></li>
    </ol>
  </div>
</div>
<div data-widget="asce7-seismic" data-title="ASCE 7-10 spectrum values and seismic response coefficient"></div>
<div class="note"><strong>Seismic design category.</strong> With S_DS = 0.667 g and S_D1 = 0.30 g, ASCE 7-10 Tables 11.6-1 and 11.6-2 give SDC <strong>D</strong> for risk categories I–III; category E applies only where S₁ ≥ 0.75 g. The tutorial enters E. Both D and E allow these systems at this height (dual system: no height limit; special moment frame: no limit), and in midas Gen the category mainly controls code checks and limits, not the force level — but enter the category that the code gives for your site.</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Compute S_DS, S_D1 and the SDC by hand once and compare with the program.</li>
  <li>Period for the ELF base shear: not more than C_uT_a.</li>
  <li>Four ELF cases with ± accidental eccentricity; spectrum cases scaled by I_e/R.</li>
  <li>P-Delta with the expected gravity load; enough modes for 90 % mass participation.</li>
</ul>` }
      ]
    }
  ]
});
