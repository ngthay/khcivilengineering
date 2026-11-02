/* Lesson 10 — Slender columns */
KCE_COURSE.lessons.push({
  id: 'slender-columns',
  num: 10,
  title: 'Slender Columns',
  desc: 'Second-order effects, effective length factor k, non-sway and sway frames, and the moment magnifier method.',
  icon: '📏',
  color: 'rose',
  meta: ['ACI 318M-19 §6.2.5, 6.6.4', 'ASCE 7-22 §2.3', 'Columns'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>In a slender column the lateral deflection \(\Delta\) under load adds a moment \(P\Delta\) (the <strong>P–Δ effect</strong>), so the actual moment is larger than the first-order frame moment. ACI 318 accounts for this by multiplying the first-order moments by a <strong>moment magnifier</strong> \(\delta\), then designing the section for the magnified moment as in lesson 9.</p>` },
        { title: 'Description', html: String.raw`
<ul>
  <li><strong>Non-sway (braced) frames</strong> — lateral movement prevented by walls or bracing; magnification comes from member curvature (\(\delta_{ns}\)).</li>
  <li><strong>Sway (unbraced) frames</strong> — the storey drifts; lateral-load moments are magnified by \(\delta_s\) (P–Δ of the whole storey).</li>
  <li>A storey is non-sway if the stability index \(Q = \sum P_u\Delta_0/(V_{us}\ell_c) \le 0.05\).</li>
</ul>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Decide sway / non-sway.</li>
  <li>Find \(k\) (alignment chart with \(\psi_A, \psi_B\)) and \(r = 0.3h\) (rectangular).</li>
  <li>Check if slenderness may be ignored.</li>
  <li>Compute \(EI\), \(P_c\), \(C_m\), \(\delta\).</li>
  <li>Design the section for \(P_u\) and \(M_c\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 240" role="img" aria-label="Braced and unbraced column deflected shapes">
    <line class="thin" x1="60" y1="30" x2="200" y2="30"/><line class="thin" x1="60" y1="210" x2="200" y2="210"/>
    <path class="acc" d="M130 30 Q 175 120 130 210"/><line class="dim" x1="130" y1="30" x2="130" y2="210"/>
    <text x="70" y="232" class="a">Non-sway: k ≤ 1</text><text x="165" y="124" class="m">δ</text>
    <line class="thin" x1="360" y1="30" x2="500" y2="30"/><line class="thin" x1="300" y1="210" x2="440" y2="210"/>
    <path class="acc" d="M370 210 C 370 140, 430 100, 430 30"/><line class="dim" x1="370" y1="30" x2="370" y2="210"/>
    <line class="dim" x1="370" y1="22" x2="430" y2="22"/><text x="392" y="16">Δ</text>
    <text x="320" y="232" class="a">Sway: k ≥ 1</text>
    <text x="470" y="124" class="m">P–Δ moment</text>
  </svg>
  <figcaption>Figure 1 — Deflected shape of a braced column (left) and a column in a sway frame (right).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'When can slenderness be ignored?', html: String.raw`
<p>ACI 318-19 §6.2.5.1:</p>
$$\text{Non-sway: } \frac{k\ell_u}{r} \le 34 + 12\frac{M_1}{M_2}\ \text{ and } \le 40,\qquad \text{Sway: } \frac{k\ell_u}{r} \le 22$$
<p>\(M_1/M_2\) is <strong>negative for single curvature</strong> and positive for double curvature (\(|M_1| \le |M_2|\)). \(\ell_u\) = clear (unsupported) height; \(r = 0.3h\) (rectangular) or \(0.25D\) (circular) (§6.2.5.2).</p>
<div class="note"><p><strong>Change from ACI 318-08:</strong> the sign convention was reversed (old: \(34 - 12M_1/M_2\) with single curvature positive). The numbers are the same — only the sign of \(M_1/M_2\) changed. Mixing the two conventions is a common mistake.</p></div>
<p>The total second-order moment may not exceed 1.4 times the first-order moment (§6.2.5.3); larger values mean the structure is too flexible.</p>` },
        { title: 'Effective length factor', html: String.raw`
$$\psi = \frac{\sum (EI/\ell_c)_{columns}}{\sum (EI/\ell)_{beams}}$$
<p>Use cracked stiffnesses (Table 6.6.3.1.1(a)): columns \(0.70E_cI_g\), beams \(0.35E_cI_g\), flat plates \(0.25E_cI_g\). For non-sway members \(k\) = 1.0 may be used; for sway members \(k \ge 1.0\) (§6.6.4.4.3). Read \(k\) from the Jackson–Moreland alignment charts, or for sway frames with \(\psi_m\) = average:</p>
$$\psi_m < 2:\ k = \frac{20 - \psi_m}{20}\sqrt{1 + \psi_m};\qquad \psi_m \ge 2:\ k = 0.9\sqrt{1 + \psi_m}$$` },
        { title: 'Moment magnifier — non-sway', html: String.raw`
$$M_c = \delta_{ns}M_2,\qquad \delta_{ns} = \frac{C_m}{1 - \dfrac{P_u}{0.75P_c}} \ge 1.0,\qquad P_c = \frac{\pi^2EI}{(k\ell_u)^2}$$
$$(EI)_{eff} = \frac{0.4E_cI_g}{1 + \beta_{dns}}\quad\text{or}\quad \frac{0.2E_cI_g + E_sI_{se}}{1 + \beta_{dns}}\quad\text{or}\quad \frac{E_cI}{1 + \beta_{dns}}$$
$$C_m = 0.6 - 0.4\frac{M_1}{M_2}\ \ (\text{no transverse load}),\qquad C_m = 1.0\ \ (\text{transverse load between supports})$$
$$M_{2,min} = P_u(15 + 0.03h)\ \text{mm}$$
<p>\(\beta_{dns}\) = maximum factored sustained axial load / maximum factored axial load in the same combination (§6.6.4.4.4). In the third \(EI\) expression, \(I\) comes from Table 6.6.3.1.1(b) and depends on \(\rho_g\), \(M_u/P_uh\) and \(P_u/P_0\).</p>` },
        { title: 'Moment magnifier — sway', html: String.raw`
$$M_1 = M_{1ns} + \delta_sM_{1s},\qquad M_2 = M_{2ns} + \delta_sM_{2s}$$
$$\delta_s = \frac{1}{1 - Q} \ge 1\quad\text{or}\quad \delta_s = \frac{1}{1 - \dfrac{\sum P_u}{0.75\sum P_c}} \ge 1$$
<p>\(Q = \sum P_u\Delta_o/(V_{us}\ell_c)\) is the stability index; \(\sum P_u\), \(\sum P_c\) are summed over the storey, with \(\beta_{ds}\) (sustained <em>shear</em> ratio, usually 0 for wind and earthquake) in place of \(\beta_{dns}\). If \(\delta_s > 1.5\), only the \(\sum P_c\) form or a second-order analysis may be used (§6.6.4.6.2).</p>
<p>Second-order effects along the column length (§6.6.4.6.4) are checked with the non-sway magnifier, using \(M_1\) and \(M_2\) from above to compute \(C_m\). (This replaces the old \(\ell_u/r > 35/\sqrt{P_u/f'_cA_g}\) test of ACI 318-08.)</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 1: braced column', html: String.raw`
<div class="ex">
  <div class="ex-head">300 × 300, 4DB16, d' = 46, f'c = 25, fy = 400, ℓu = 5 m, non-sway, k = 1</div>
  <div class="ex-body">
    <ul class="given"><li>PD = 100 kN</li><li>PL = 80 kN</li><li>MD = 12 kN·m</li><li>ML = 8 kN·m</li><li>equal end moments, single curvature</li></ul>
    <ol class="steps">
      <li>\(P_u = 1.2(100) + 1.6(80) = 248\) kN; \(M_u = 1.2(12) + 1.6(8) = 27.2\) kN·m.</li>
      <li>Single curvature → \(M_1/M_2 = -1\). \(r = 0.3(300) = 90\) mm; \(k\ell_u/r = 5000/90 = 55.6 > 34 + 12(-1) = 22\) → slender.</li>
      <li>\(\beta_{dns} = 120/248 = 0.484\); \(E_c = 23\,500\) MPa, \(I_g = 675×10^6\) mm⁴; \(EI = 0.4(23\,500)(675×10^6)/1.484 = 4.276×10^{12}\) N·mm².</li>
      <li>\(P_c = \pi^2(4.276×10^{12})/5000^2 = 1688\) kN; \(C_m = 0.6 - 0.4(-1) = 1.0\).</li>
      <li>\(\delta_{ns} = 1/(1 - 248/(0.75 × 1688)) = 1.244\); \(M_c = 1.244 × 27.2 = 33.8\) kN·m (> \(M_{2,min}\) = 6.0 kN·m).</li>
      <li>Section check at \(e = 33.8/248 = 136\) mm: strain compatibility gives \(P_n = 739.7\) kN with \(\varepsilon_t = 0.00252\) → transition, \(\phi = 0.65 + 0.25(0.00252 - 0.002)/0.003 = 0.693\).
        <span class="result">\(\phi P_n ≈ 513\) kN ≥ \(P_u\) = 248 kN → OK</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 2: column in a sway frame — stiffness and k', html: String.raw`
<div class="ex">
  <div class="ex-head">8-storey frame, interior column 450 × 450, f'c = 35, fy = 410, ℓu = 4.8 m (storey above 3.35 m)</div>
  <div class="ex-body">
    <ul class="given"><li>PD = 1700 kN</li><li>PL = 635 kN</li><li>MD = 43 / 73</li><li>ML = 27 / 49</li><li>MW = ±108.8 kN·m (strength-level wind)</li><li>ΣEI/ℓ beams = 40 680 kN·m</li><li>36 columns per storey</li></ul>
    <ol class="steps">
      <li>\(E_c = 4700\sqrt{35} = 27\,806\) MPa; \(I_g = 450^4/12 = 3.417×10^9\) mm⁴.</li>
      <li>\(\psi_A = 1.184\), \(\psi_B = 1.0\) → \(k = 1.367\) (sway); \(k\ell_u/r = 1.367(4800)/135 = 48.6 > 22\) → slender.</li>
      <li>Storey: 14 interior, 18 edge (⅔ load), 4 corner (⅓ load) columns.</li>
      <li>Wind: ASCE 7-22 wind loads are strength-level, so the load factor is 1.0. The original notes used a service-level moment of 68 kN·m × 1.6 = 108.8 kN·m; the factored moment is unchanged.</li>
    </ol>
  </div>
</div>` },
        { title: 'Example 2 (cont.): load combinations', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Combination</th><th>\(P_u\) (kN)</th><th>\(\delta_s\)</th><th>\(M_c\) (kN·m)</th><th>\(e\) (mm)</th></tr></thead>
  <tbody>
    <tr><td>Comb. 2: 1.2D + 1.6L (gravity only)</td><td>3056</td><td>—</td><td>166</td><td>54</td></tr>
    <tr><td>Comb. 4: 1.2D + 1.0W + L</td><td>2675</td><td>1.451</td><td>136.6 + 1.451(108.8) = 294.5</td><td>110</td></tr>
    <tr><td>Comb. 5: 0.9D + 1.0W</td><td>1530</td><td>1.216</td><td>198</td><td>129</td></tr>
  </tbody>
</table></div>
<p>For the wind combination: \(\sum P_u = 73\,117\) kN; each column \(P_c = \pi^2(0.4E_cI_g)/(k\ell_u)^2 = 8712\) kN (\(\beta_{ds}\) = 0 for short-term wind), \(\sum P_c = 313\,632\) kN, so \(\delta_s = 1/(1 - 73\,117/(0.75 × 313\,632)) = 1.451\).</p>
<p>\(\delta_s\) = 1.451 ≤ 1.5, so the \(\sum P_c\) method is allowed. Second-order/first-order = 294.5/245.4 = 1.20 ≤ 1.4 ✓.</p>
<p><strong>Along the length (§6.6.4.6.4):</strong> \(M_2 = 294.5\), \(M_1 = 1.2(43) + 27 + 1.451(108.8) = 236.5\) kN·m, double curvature under sway → \(M_1/M_2 = +0.80\), \(C_m = 0.6 - 0.4(0.80) = 0.28\). With \(k\) = 1, \(\beta_{dns} = 2040/2675 = 0.763\): \(P_c = 9236\) kN, \(\delta_{ns} = 0.28/(1 - 2675/6927) = 0.46\) → take 1.0. No further magnification.</p>
<p>The live-load factor in combination 4 could be reduced to 0.5 (ASCE 7-22 §2.3.1, Exception 1, since \(L_o \le 4.79\) kPa and the floor is not assembly). It is kept at 1.0 here, which is conservative for compression.</p>
<div class="result ng">4DB32 (one per corner): φPn = 2639 kN < 2675 kN — fails by about 1 %.</div>
<div class="result">6DB32 (3 per face): φPn = 2908 / 3889 / 2640 kN ≥ Pu for the three combinations → OK</div>` },
        { title: 'Design checklist', html: String.raw`
<ul class="check">
  <li>Classify the storey as sway / non-sway (\(Q\) or bracing).</li>
  <li>Use cracked \(EI\) for \(\psi\) and \(\beta_d\) for creep.</li>
  <li>Second-order moment ≤ 1.4 × first-order moment (§6.2.5.3); \(\delta_s \le 1.5\) for the \(\sum P_c\) method.</li>
  <li>Use the 318-19 sign convention: \(M_1/M_2\) negative in single curvature.</li>
  <li>Strength-level wind (ASCE 7-22): factor 1.0, not 1.6.</li>
  <li>Check every load combination; the governing one is often a wind/seismic case.</li>
  <li>Use \(M_{2,min}\) when frame moments are small.</li>
</ul>` }
      ]
    }
  ]
});
