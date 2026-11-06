/* Lesson 5 — Load combinations, spectrum scaling and ACI 318-11 RC design */
KCE_COURSE.lessons.push({
  id: 'rc-design',
  num: 5,
  title: 'RC Design — Combinations, Spectrum Scaling, Design Parameters and Results',
  desc: 'Automatic ACI 318-11 load combinations, scaling the response spectrum to 85 % of the static base shear, sway and non-sway frame definition, live load reduction factors checked by hand, unbraced lengths and Cm, special seismic provisions, rebar materials, and reading the beam, column and wall design results.',
  icon: '🛠️',
  color: 'mint',
  meta: ['ACI 318-11', 'Scale-up factor', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
${midasSource}
<p>With the analysis complete, the design stage has three parts: <strong>combinations</strong> (including the scale-up of the spectrum results), <strong>design parameters</strong> (frame type, live load reduction, effective lengths, code and materials), and the <strong>design runs</strong> for beams, columns and walls.</p>` }
      ]
    },
    {
      title: 'Design Procedure',
      subs: [
        { title: 'Load combinations and the scale-up factor', html: String.raw`
<p><em>Results › Combinations › Concrete Design › Auto Generation</em>: option Add, design code <strong>ACI 318-11</strong>. In the same dialog set the <strong>scale-up factors</strong> for the spectrum cases: <strong>1.48 for RX</strong> ${mIco('6050457')} and <strong>1.0 for RY</strong> ${mIco('6050457')}, then ${mIco('0701593')}.</p>
${mImg('0781977', 'Figure 1 — Automatic generation of the ACI 318-11 load combinations with the scale-up factors for RX and RY.')}
<p>The factors come from ASCE 7-10 §12.9.4.1: if the modal base shear V_t is less than 85 % of the ELF base shear V, the spectrum forces must be multiplied by</p>
$$\text{scale factor} = \frac{0.85\,V}{V_t}\ \ (\ge 1)$$
<p>To find them, compare the two base shears:</p>
<ul>
  <li><strong>RX, RY</strong>: <em>Results › Tables › Result Tables › Story › Story Shear (Response Spectrum Analysis)</em>, cases RX(RS) and RY(RS) ${mIco('0701593')}, shear force without spring.</li>
  <li><strong>EX, EY</strong>: <em>Load › Static Loads › Lateral › Seismic Loads</em>, select EXP › Modify › <em>Seismic Load Profile</em> with Story Shear on (repeat for EXN, EYP, EYN).</li>
</ul>
${mImg('6073241', 'Figure 2 — Storey shears from the response spectrum cases RX and RY.')}
${mImg('0813721', 'Figure 3 — Storey shears from the static seismic load profile.')}
<p>In X the frame is flexible and the spectrum gives a much lower base shear than the ELF formula, so V_t ≈ 0.85V/1.48 ≈ 0.57V and the factor is 1.48. In Y the walls make the building stiffer and the spectrum shear already exceeds 0.85V, so no scaling is needed.</p>
<div class="warn">The tutorial omits the <strong>bi-directional</strong> combination. In SDC D–F, ASCE 7-10 §12.5.4 requires 100 % of the seismic forces in one direction plus 30 % in the other for columns and walls that belong to two intersecting lateral systems and carry seismic axial load of at least 20 % of their axial strength — here, the columns at the ends of the walls. Add these combinations in a real design.</div>` },
        { title: 'Frame definition', html: String.raw`
<p><em>Design › General › General Design Parameter › Definition of Frame</em>:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Direction</th><th>Setting</th><th>Reason</th></tr></thead>
  <tbody>
    <tr><td>X</td><td>Unbraced | Sway</td><td>Only moment frames resist lateral load; columns can sway</td></tr>
    <tr><td>Y</td><td>Braced | Non-sway</td><td>The two shear walls prevent sway of the frame</td></tr>
  </tbody>
</table></div>
<p>Design type 3-D, and <em>Auto Calculate Effective Length Factors</em> on — the program computes k for every column from the relative stiffness of the beams and columns at its ends (alignment-chart method). Click ${mIco('0701593')}.</p>
${mImg('0819225', 'Figure 4 — Definition of Frame: sway in X, non-sway in Y.')}` },
        { title: 'Live load reduction', html: String.raw`
<p><em>Design › General › General Design Parameter › Modify Live Load Reduction Factor</em>, option Add/Replace, applied to the <strong>axial force</strong> of the columns. In the top view ${mIco('0055705')} select each group with a window and click ${mIco('0070681')}: interior 0.56, edge 0.69, corner 0.88. These are the ASCE 7-10 §4.7 factors</p>
$$L = L_0\left(0.25 + \frac{15}{\sqrt{K_{LL}A_T}}\right)\qquad (K_{LL} = 4 \text{ for columns})$$
<p>evaluated with the tributary area of <em>one</em> floor:</p>
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>Column</th><th>A_T (ft²)</th><th>K_LL A_T</th><th>Factor</th></tr></thead>
  <tbody>
    <tr><td>Interior</td><td>26 × 22 = 572</td><td>2288</td><td>0.25 + 15/47.8 = 0.564</td></tr>
    <tr><td>Edge</td><td>26 × 11 = 286</td><td>1144</td><td>0.25 + 15/33.8 = 0.693</td></tr>
    <tr><td>Corner</td><td>13 × 11 = 143</td><td>572</td><td>0.25 + 15/23.9 = 0.877</td></tr>
  </tbody>
</table></div>
${mImg('0107417', 'Figure 5 — Live load reduction factors assigned to the column axial forces.')}
<div data-widget="llr-asce7" data-title="ASCE 7-10 live load reduction factor"></div>
<p>A column that supports several floors may use the sum of their tributary areas, which gives a larger reduction (down to 0.4 for members supporting two or more floors). Using the one-floor values for all columns, as the tutorial does, is simple and conservative. Live loads above 100 psf, garages and assembly areas are not reduced.</p>` },
        { title: 'Unbraced length, C_m, code and materials', html: String.raw`
<ul>
  <li><strong>Unbraced Length (L, Lb)</strong>: L_y = L_x = 0 for all members — zero tells the program to use the member length between nodes; laterally unbraced length is not considered (it matters for steel, not for these beams); ${mIco('0121369')} Select All, ${mIco('0070681')}.</li>
  <li><strong>Equivalent Moment Correction Factor (C_m)</strong>: calculated by the program for all members, from the end moments (ACI 318-11 §10.10.6.4: \(C_m = 0.6 + 0.4M_1/M_2\) for non-sway members without transverse loads); ${mIco('0121369')} Select All, ${mIco('0070681')}, ${mIco('0145561')}.</li>
  ${mRow(['0150681', '6815897'], 'Figure 6 — Unbraced length (left) and equivalent moment correction factor C<sub>m</sub> (right).')}
  <li><em>Design › RC Design › Design Code</em>: <strong>ACI 318-11</strong>, <strong>Apply Special Provisions for Seismic Design</strong> on, frame type <strong>Special Moment Frames</strong> — this adds the Chapter 21 checks (capacity-design shear, strong column–weak beam, joint shear, minimum and maximum steel, wall boundary elements); ${mIco('0178969')}.
    ${mImg('0192921', 'Figure 7 — Concrete design code: ACI 318-11 with the special seismic provisions for special moment frames.')}</li>
  <li><em>Strength Reduction Factors</em>: Update By Code (φ = 0.90 flexure, 0.75 shear, 0.65 tied columns; and 0.60 for shear in walls and other members whose nominal shear strength is less than the shear at their nominal flexural strength, ACI 318-11 §9.3.4); ${mIco('0178969')}.
    ${mImg('2375065', 'Figure 8 — Strength reduction factors updated by code.')}</li>
  <li><em>Design Criteria for Rebars</em>: bar sizes to try for beams, columns and walls (main bars and ties/stirrups), and the cover to the bar centroid.
    ${mImg('2382105', 'Figure 9 — Design criteria for rebars.')}</li>
  <li><em>Modify Concrete Materials</em>: for material 1, rebar code ASTM (RC), main rebar Grade 60, sub-rebar (ties, stirrups) Grade 40; ${mIco('4044313')}, ${mIco('2399513')}.
    ${mImg('2403737', 'Figure 10 — Modify Concrete Materials: ASTM rebar, Grade 60 main bars and Grade 40 ties.')}</li>
</ul>` },
        { title: 'Design results', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Run</th><th>Menu</th><th>What to read</th></tr></thead>
  <tbody>
    <tr><td>Beams</td><td>Design › RC Design › Concrete Code Design › Beam Design, sorted by member</td><td>Top and bottom bars at the ends and middle, stirrups; ratios of required to provided strength (OK / NG)</td></tr>
    <tr><td>Columns</td><td>… › Column Design</td><td>Longitudinal bars and ties, axial–moment ratio from the P-M interaction, slenderness (k, KL/r, magnified moments), strong column–weak beam check</td></tr>
    <tr><td>Walls</td><td>… › Wall Design, sorted by Wall ID + storey</td><td>Vertical and horizontal reinforcement, P-M and shear ratios; need for boundary elements; select Wall ID 1, storey 1F and the <em>Graphic</em> button for the detailed calculation sheet</td></tr>
  </tbody>
</table></div>
<p>In each design dialog choose the sorting and click ${mIco('2410393')} to run.</p>
${mImg('2424089', 'Figure 11 — Concrete beam design results.')}
${mImg('2431897', 'Figure 12 — Concrete column design results.')}
${mImg('6935577', 'Figure 13 — Concrete wall design results, sorted by Wall ID and storey.')}
${mImg('6953753', 'Figure 14 — Graphic output of the design of wall 1 at storey 1F.')}
<p>Members that fail (NG) are usually fixed by changing the section, not only the bars: enlarge the section, update the model, re-run the analysis (the stiffness and the forces change) and design again. The <em>Graphic</em> and <em>Detail</em> outputs give a calculation sheet for each member that can be checked by hand.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Reading the scale-up factor', html: String.raw`
<div class="ex">
  <div class="ex-head">The X-direction ELF base shear is V. After the analysis the spectrum case RX gives a base shear V_t. What does the factor 1.48 imply, and what would you do if V_t were 0.95V?</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Factor = 0.85V/V_t = 1.48 → V_t = 0.85V/1.48 = 0.574V: the modal analysis gives only 57 % of the static shear, typical of a flexible moment frame whose real period (from the eigenvalue analysis) is longer than the 1.2 s used for V.</li>
      <li>After scaling, the design base shear from RX is exactly 0.85V.</li>
      <li>If V_t = 0.95V, it already exceeds 0.85V: the factor is 1.0 (as for RY). Do not scale down.
        <span class="result">Scale factor = max(1, 0.85V/V_t), applied to all RX forces; drifts may use the unscaled results where §12.9.4.2 allows</span></li>
    </ol>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Compare spectrum and ELF base shears; enter the scale-up factor for each direction.</li>
  <li>Add 100 % + 30 % bi-directional combinations where ASCE 7-10 §12.5.4 requires them.</li>
  <li>Set sway / non-sway per direction to match the lateral system.</li>
  <li>Check live load reduction factors, C_m and effective lengths.</li>
  <li>Use the special seismic provisions and the correct rebar grades; re-analyse after changing sections.</li>
</ul>` }
      ]
    }
  ]
});
