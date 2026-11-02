/* Lesson 14 — Footing design */
KCE_COURSE.lessons.push({
  id: 'footings',
  num: 14,
  title: 'Footing Design',
  desc: 'Isolated, eccentrically loaded, combined, trapezoidal, strip and mat foundations: bearing, punching and beam shear, flexure.',
  icon: '🏗️',
  color: 'peach',
  meta: ['ACI 318M-19 Ch.13, §22.5–22.6', 'ASCE 7-22 §2.3', 'Foundations'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Footings spread column loads over enough soil that the bearing pressure stays below the allowable value \(q_a\) and settlements are acceptable. The <strong>size</strong> of a footing is set with <em>service</em> loads and \(q_a\); the <strong>thickness and steel</strong> are designed with <em>factored</em> loads and the factored soil pressure \(q_u\).</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Type</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>Isolated (spread) footing</td><td>One column; square or rectangular</td></tr>
    <tr><td>Eccentric footing</td><td>Column with moment, or column off-centre</td></tr>
    <tr><td>Combined footing (rectangular / trapezoidal)</td><td>Two columns close together, or an exterior column at the property line</td></tr>
    <tr><td>Strip (continuous) footing</td><td>A row of columns or a wall</td></tr>
    <tr><td>Mat (raft)</td><td>Weak soil or large loads — one slab under the whole building</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Area from service loads: \(A = P_s/q_{a,net}\) (net of soil and footing weight).</li>
  <li>Factored pressure from ASCE 7-22 combinations: \(q_u = P_u/A\) (uniform) or \(P_u/A \pm M_u/S\).</li>
  <li>Thickness from punching shear at \(d/2\) and one-way shear at \(d\); \(d \ge 150\) mm (§13.3.1.2).</li>
  <li>Flexural steel at the column face; minimum \(0.0018A_g\).</li>
  <li>Development length, bearing and column dowels.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 260" role="img" aria-label="Isolated footing critical sections">
    <rect class="soil" x="20" y="150" width="600" height="100"/>
    <rect class="conc" x="120" y="150" width="400" height="60"/>
    <rect class="conc" x="290" y="40" width="60" height="110"/>
    <line x1="130" y1="198" x2="510" y2="198" style="stroke:#e0565b;stroke-width:3"/>
    <line class="acc" x1="268" y1="150" x2="268" y2="210" style="stroke-dasharray:5 4"/><line class="acc" x1="372" y1="150" x2="372" y2="210" style="stroke-dasharray:5 4"/>
    <line class="ln" x1="290" y1="150" x2="290" y2="230" style="stroke-dasharray:2 3"/>
    <line class="ln" x1="440" y1="150" x2="440" y2="230" style="stroke-dasharray:2 3"/>
    <text x="236" y="236" class="a">d/2</text><text x="420" y="246" class="m">d (one-way)</text><text x="265" y="246" class="m">face (moment)</text>
    <g class="accf"><polygon points="140,230 135,220 145,220"/><polygon points="200,230 195,220 205,220"/><polygon points="260,230 255,220 265,220"/><polygon points="380,230 375,220 385,220"/><polygon points="440,230 435,220 445,220"/><polygon points="500,230 495,220 505,220"/></g>
    <text x="360" y="100">Pu</text><line class="acc" x1="320" y1="10" x2="320" y2="38"/>
    <text x="530" y="226" class="m">qu</text>
  </svg>
  <figcaption>Figure 1 — Critical sections: punching shear at d/2 from the column, one-way shear at d, moment at the column face.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Bearing pressure', html: String.raw`
$$q_{a,net} = q_a - \gamma_s(D_f - h) - \gamma_c h - \text{surcharge},\qquad A_{req} = \frac{D + L}{q_{a,net}}$$
<p>With moment: \(q = \dfrac{P}{A} \pm \dfrac{Mc}{I}\). If \(e = M/P \le L/6\) the whole base is in compression; if \(e > L/6\): \(q_{max} = \dfrac{2P}{3B(L/2 - e)}\).</p>` },
        { title: 'Shear', html: String.raw`
<p>ACI 318-19 §13.2.6.2 allows footings and mats to <strong>neglect the size-effect factor</strong> (\(\lambda_s\) = 1) in both one-way and two-way shear.</p>
<p><strong>Punching (two-way)</strong>, perimeter \(b_0\) at \(d/2\) (Table 22.6.5.2 with \(\lambda_s\) = 1):</p>
$$V_u = q_u\left[A - (c_1 + d)(c_2 + d)\right],\quad \phi V_c = 0.75\min\left\{0.33,\ 0.17\left(1 + \tfrac{2}{\beta}\right),\ 0.083\left(2 + \tfrac{\alpha_sd}{b_0}\right)\right\}\lambda\sqrt{f'_c}\,b_0d$$
<p><strong>One-way (beam)</strong> at \(d\) from the face: \(V_u = q_u\,B\,(\text{overhang} - d)\). Footings have no stirrups, so Table 22.5.5.1(c) applies with \(\lambda_s\) = 1:</p>
$$\phi V_c = 0.75 × 0.66\,\lambda\,\rho_w^{1/3}\sqrt{f'_c}\,Bd,\qquad \rho_w = \frac{A_s}{Bd}$$
<div class="warn"><p><strong>Change from ACI 318-08:</strong> one-way shear was \(\phi\,0.17\sqrt{f'_c}\,Bd\). With the usual footing steel ratio of 0.002 – 0.004, \(0.66\rho_w^{1/3}\) is only 0.08 – 0.10, so one-way shear capacity drops by about half. Isolated footings usually still pass, but long combined and strip footings that act like beams often need minimum stirrups in the high-shear zones. With \(A_v \ge A_{v,min}\), Table 22.5.5.1(a) gives back \(V_c = 0.17\lambda\sqrt{f'_c}\,b_wd\).</p></div>` },
        { title: 'Flexure and steel distribution', html: String.raw`
$$M_u = \frac{q_u B\,\ell^2}{2},\quad \ell = \text{overhang beyond the column face}$$
<p>Steel ≥ \(0.0018A_g\) (all grades), spacing ≤ 3h, 450 mm; cover 75 mm (cast against soil). In rectangular footings the short-direction steel is concentrated in a central band of width \(B\) (§13.3.3.3):</p>
$$\frac{A_{s,band}}{A_{s,total}} = \frac{2}{\beta + 1},\qquad \beta = L/B$$` }
      ]
    },
    {
      title: 'Isolated Footings',
      subs: [
        { title: 'Example 1: concentric footing', html: String.raw`
<div class="ex">
  <div class="ex-head">Ps = 580 kN, Pu = 750 kN, qa,net = 200 kPa, column 500 × 200, h = 500 (d = 435), f'c = 25, fy = 420</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(A = 580/200 = 2.9\) m² → <strong>1.8 × 1.8 m</strong> (3.24 m²); \(q_u = 750/3.24 \approx 230\) kPa.</li>
      <li>Punching: \(b_0 = 2(935 + 635) = 3140\) mm; \(V_u = 230[3.24 - 0.935(0.635)] = 612.6\) kN.
        \(\phi V_c = \min(1690,\ 1567,\ 3206) = 1567\) kN (β = 2.5 governs, \(\lambda_s\) = 1 per §13.2.6.2) ✓.</li>
      <li>One-way (overhang from the 200 mm face = 0.8 m): \(V_u = 230(1.8)(0.8 - 0.435) = 151.1\) kN. With DB12 @ 125 (905 mm²/m), \(\rho_w = 0.00208\):
        \(\phi V_c = 0.75(0.66)(0.00208)^{1/3}(5)(1800)(435)/10^3 = 247.4\) kN ≥ 151.1 ✓ (ACI 318-08 gave 499.2 kN).</li>
      <li>\(M_u = 230(0.8^2)/2 = 73.6\) kN·m/m → \(\rho = 0.00104\) < minimum.
        \(A_{s,min} = 0.0018(1000)(500) = 900\) mm²/m.
        <span class="result">DB12 @ 125 mm both ways</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 2: footing with moment', html: String.raw`
<div class="ex">
  <div class="ex-head">D = 900 kN, L = 450 kN, Ms = 150 kN·m, Mu = 200 kN·m, column 500 × 500, h = 600 (d = 530), f'c = 25, fy = 420</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Try <strong>3.5 × 2.5 m</strong>: \(A = 8.75\) m², \(I = 2.5(3.5^3)/12 = 8.932\) m⁴, \(e = 150/1350 = 0.111 < L/6 = 0.583\).
        Service \(q = 154.3 \pm 29.4\) → 183.7 / 124.9 kPa ≤ \(q_a\) ✓.</li>
      <li>\(P_u = 1.2(900) + 1.6(450) = 1800\) kN: \(q_u = 205.7 \pm 39.2\) → 244.9 / 166.5 kPa.</li>
      <li>Punching: \(b_0 = 4(1030) = 4120\) mm, \(V_u = 1800 - 205.7(1.03^2) = 1582\) kN; \(\phi V_c = 0.75(0.33)(5)(4120)(530)/10^3 = 2702\) kN ✓. (The slide subtracted the pressure over the whole footing — 1798 kN — which is not the correct punching load.)</li>
      <li>One-way at \(d\) from the face (1.25 − 0.53 = 0.72 m from the high-pressure edge, \(q_u\) = 228.8 kPa there): \(V_u = \tfrac{244.9 + 228.8}{2}(0.72)(2.5) = 426\) kN. With the long-direction steel DB16 @ 140 (\(\rho_w = 0.00271\)):
        \(\phi V_c = 0.75(0.66)(0.00271)^{1/3}(5)(2500)(530)/10^3 = 457\) kN ≥ 426 ✓ — only 7 % margin (ACI 318-08 gave 844.7 kN).</li>
      <li>Long direction: \(M_u = 657.3\) kN·m at the column face → \(\rho = 0.00254\), \(A_s = 3366\) mm² → <strong>DB16 @ 140</strong>.</li>
      <li>Short direction: overhang 1.0 m, \(M_u = 360\) kN·m → minimum governs: 3780 mm² total. Band ratio \(2/(1.4 + 1) = 0.833\) → 3150 mm² in the central 2.5 m (<strong>DB14 @ 120</strong>); each outer 0.5 m strip still needs the minimum \(0.0018(500)(600) = 540\) mm² → <strong>4DB14</strong>.</li>
    </ol>
  </div>
</div>` }
      ]
    },
    {
      title: 'Combined and Strip Footings',
      subs: [
        { title: 'Example 3: rectangular combined footing', html: String.raw`
<div class="ex">
  <div class="ex-head">Column A (exterior, at property line) 800 kN, column B 1200 kN (service; factored ≈ 1.3 × service), columns 400 × 400, 6.0 m c/c, qa,net = 200 kPa, h = 800 (d = 730), f'c = 25, fy = 420</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Resultant from A's outer edge: \(0.2 + 1200(6.0)/2000 = 3.8\) m = L/2 → <strong>L = 7.6 m</strong>; required B = 1.32 m → <strong>B = 1.8 m</strong>.</li>
      <li>\(q_u = 1.3(2000)/(7.6 × 1.8) = 190\) kPa → \(w = 342\) kN/m along the footing.</li>
      <li>Punching A (3-sided, edge column): \(b_0 = 2660\) mm, \(\phi V_c = 2403 ≥ 875.8\) kN ✓. Punching B: \(b_0 = 4520\) mm, \(\phi V_c = 4083 ≥ 1317.4\) kN ✓.</li>
      <li>Shear diagram: \(V_u\) at \(d\) from the inner faces = 653.4 kN (A) and 762.9 kN (B). Without stirrups, using the top steel (\(\rho_w = 0.00394\)): \(\phi V_c = 0.75(0.66)(0.00394)^{1/3}(5)(1800)(730)/10^3 = 514\) kN ✗.
        <strong>Provide minimum stirrups</strong> where \(V_u > 514\) kN — from A to 1.54 m and from 4.54 m to B. Then Table 22.5.5.1(a): \(\phi V_c = 0.75(0.17)(5)(1800)(730)/10^3 = 837.7\) kN ≥ 762.9 ✓.
        \(A_{v,min}/s = 0.35(1800)/420 = 1.5\) mm²/mm, \(s \le d/2 = 365\) → <strong>4-leg DB12 @ 300</strong> (452 mm²; legs ≈ 550 mm apart ≤ \(d\) ✓).</li>
      <li>Maximum hogging \(M_u = -1373\) kN·m at 3.04 m from A (zero shear) → top steel \(\rho = 0.00394\), \(A_s = 5177\) mm² → <strong>DB20 @ 100 top</strong>.</li>
      <li>Sagging at face of B, +246 kN·m → minimum 2592 mm² → <strong>DB16 @ 140 bottom</strong>.</li>
      <li>Transverse: under A (band 0.765 m) \(M_u = 141.6\) kN·m → 6DB16; under B (band 1.13 m) \(M_u = 212.3\) kN·m → min 1627 mm² → DB16 @ 140.</li>
    </ol>
    <div class="note"><p>The slide perimeter for column A (2260 mm) is an arithmetic slip; \(b_0 = 2(400 + d/2) + (400 + d) = 2660\) mm. The factor 1.3 is an average for 1.2D + 1.6L when only service totals are given; with separate D and L use ASCE 7-22 combination 2.</p>
<p>Deepening the footing instead of adding stirrups does not help much: \(\rho_w\) falls as \(d\) grows, so even h = 1100 mm still fails one-way shear near B.</p></div>
  </div>
</div>` },
        { title: 'Example 4: trapezoidal combined footing', html: String.raw`
<div class="ex">
  <div class="ex-head">P_A = 1200 kN (0.4 m column), P_B = 750 kN (0.3 m column), 4.0 m c/c, L = 4.35 m, qa,net = 180 kPa (service total 1950 kN), h = 750 (d = 665)</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Centroid of loads from A's outer face \(\bar x = 0.2 + 750(4.0)/1950 = 1.738\) m (< L/2 → wide end at A). Area 1950/180 = 10.83 m² → \(B_1 + B_2 = 2A/L = 4.98\); \(\bar x = \frac{L}{3}\cdot\frac{B_1 + 2B_2}{B_1 + B_2}\) → <strong>B₁ = 4.0 m, B₂ = 1.0 m</strong>; \(q_u ≈ 233\) kPa.</li>
      <li>Punching A: \(b_0 = 2530\), \(\phi V_c = 2082 ≥ 1378\) kN ✓. Punching B: \(b_0 = 2230\), \(\phi V_c = 1835 ≥ 832.7\) kN ✓.</li>
      <li>Maximum moment 1158 kN·m at x = 2.03 m (width 2.60 m) → \(\rho = 0.002739\), \(A_s = 4736\) mm² → <strong>DB16 @ 100 top</strong>; bottom minimum 1350 mm²/m → DB14 @ 110.</li>
      <li>Beam shear at \(d\) from the faces (no stirrups, \(\rho_w\) = 0.00274 from the top steel): near A, width 3.27 m, \(V_u\) = 658 ≤ \(\phi V_c\) = 752 kN ✓. Near B, width 1.67 m, \(V_u\) = 675 &gt; \(\phi V_c\) = 384 kN ✗.
        → <strong>4-leg DB12 @ 300</strong> stirrups from x = 2.89 m to the face of B (\(A_{v,min}/s = 0.35(1666)/420 = 1.39\) mm²/mm); then \(\phi V_c = 0.75(0.17)(5)(1666)(665)/10^3 = 706\) kN ≥ 675 ✓.</li>
      <li>Transverse: under A \(M_u = 583.6\) kN·m → 8DB20; under B 84.6 kN·m → minimum 6DB14.</li>
    </ol>
  </div>
</div>` },
        { title: 'Example 5: strip footing under three columns', html: String.raw`
<div class="ex">
  <div class="ex-head">Service loads 800 / 1280 / 960 kN (factored ≈ 1.3 × service) at x = 0.6, 5.1, 10.6 m; L = 11.3 m, qa,net = 180 kPa → B = 1.8 m; columns 400 mm, h = 700 (d = 630), f'c = 24, fy = 420</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Resultant \(= (800 × 0.6 + 1280 × 5.1 + 960 × 10.6)/3040 = 5.65\) m = L/2 → uniform pressure. \(q_u = 1.3(3040)/(11.3 × 1.8) = 194.3\) kPa, \(w = 349.7\) kN/m.</li>
      <li>Punching under B: \(b_0 = 4120\) mm, \(\phi V_c = 3212 ≥ 1457\) kN ✓.</li>
      <li>Moment diagram (statics): span AB −922 kN·m at x = 2.97 m; span BC −1343 kN·m at x = 7.73 m; small positive moments under the columns (≈ 63 / 132 / 96 kN·m, bottom steel).</li>
      <li>Shear at \(d\) from the column faces: 540 / 453 / 630 / 713 kN. Without stirrups (\(\rho_w\) = 0.0053): \(\phi V_c = 0.75(0.66)(0.0053)^{1/3}\sqrt{24}(1800)(630)/10^3 = 481\) kN — only the 453 kN section passes.</li>
      <li>Provide <strong>4-leg DB12 @ 300</strong> stirrups (\(A_{v,min}/s = 1.5\) mm²/mm, \(s \le d/2 = 315\)) right of A (to 1.6 m), right of B (5.3 – 6.4 m) and left of C (9.1 – 10.4 m). With stirrups \(\phi V_c = 0.75(0.17)\sqrt{24}(1800)(630)/10^3 = 708.4\) kN; at 713 kN a small \(V_s\) = 6 kN is needed, and the stirrups give \(V_s = 452(420)(630)/300/10^3 = 399\) kN → \(\phi V_n = 1007\) kN ✓.</li>
      <li>Top steel for 1343 kN·m: \(\rho ≈ 0.0053\), \(A_s ≈ 6050\) mm² → <strong>DB22 @ 110</strong>; bottom minimum 1260 mm²/m → DB14 @ 120.</li>
    </ol>
  </div>
</div>` }
      ]
    },
    {
      title: 'Mat Foundations',
      subs: [
        { title: 'Rigid mat method', html: String.raw`
<p>For a rigid mat (column spacing small relative to stiffness), soil pressure is linear:</p>
$$q = \frac{\sum P}{A} \pm \frac{M_y\,x}{I_y} \pm \frac{M_x\,y}{I_x},\qquad M_x = \sum P\,e_y,\ M_y = \sum P\,e_x$$
<ol>
  <li>Find the resultant of all column loads and its eccentricities.</li>
  <li>Check \(q_{max} \le q_a\) at the corners.</li>
  <li>Divide the mat into strips along column lines; each strip carries its columns and the soil pressure under it.</li>
  <li>Strip loads seldom balance: use the average of column total and soil reaction, then scale column loads and soil pressure to match.</li>
  <li>Check punching for interior (4 sides), edge (3 sides) and corner (2 sides) columns.</li>
</ol>` },
        { title: 'Strip example', html: String.raw`
<div class="ex">
  <div class="ex-head">Strip 13.0 m long with column loads 62 / 180 / 180 / 62 t, soil reaction 35.82 t/m</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Column total = 484 t; soil total = 35.82 × 13.0 = 465.7 t → average 474.8 t.</li>
      <li>Modified soil pressure = 474.8/13.0 = 36.525 t/m; column factor 474.8/484 = 0.981.</li>
      <li>Modified column loads 60.825 / 176.59 / 176.59 / 60.825 t → draw shear and moment diagrams and design as an inverted continuous beam.</li>
    </ol>
  </div>
</div>` },
        { title: 'Design checklist', html: String.raw`
<ul class="check">
  <li>Size with service loads and net allowable pressure; design with factored pressure.</li>
  <li>Punching at \(d/2\) and one-way shear at \(d\) — usually decide the thickness; \(\lambda_s\) = 1 permitted for footings (§13.2.6.2).</li>
  <li>One-way shear without stirrups: \(\phi\,0.66\rho_w^{1/3}\sqrt{f'_c}\,Bd\) — add minimum stirrups in beam-like combined/strip footings where it governs.</li>
  <li>Moments at column faces; minimum 0.0018\(A_g\); band steel in rectangular footings; \(d \ge 150\) mm.</li>
  <li>Combined footings: centroid of area under the resultant of the column loads.</li>
  <li>Bars developed from the critical section; dowels and bearing at the column base.</li>
  <li>Cover 75 mm for concrete cast against soil.</li>
</ul>` }
      ]
    }
  ]
});
