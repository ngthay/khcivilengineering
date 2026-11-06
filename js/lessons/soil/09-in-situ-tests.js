/* Lesson 9 — In-situ tests (CCES Soil Mechanics §10) */
KCE_COURSE.lessons.push({
  id: 'in-situ-tests',
  num: 9,
  title: 'In-Situ Tests: CPT, DCP and SPT',
  desc: 'Static cone penetration (CPT), dynamic cone penetration, the Standard Penetration Test, corrections to N, and correlations for friction angle, modulus, undrained cohesion and consistency.',
  icon: '📍',
  color: 'mint',
  meta: ['§10', 'q_c · N', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Laboratory tests need undisturbed samples, which are hard to take from sand and expensive in general. <strong>In-situ tests</strong> measure the soil’s resistance in place, quickly and continuously with depth, and are correlated with the design parameters.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Test</th><th>Measures</th></tr></thead>
  <tbody>
    <tr><td>Static cone (CPT)</td><td>Cone pushed at constant speed: tip resistance \(q_c\) (10 cm², 60° cone) and, with a sleeve (150 cm²), side friction \(f_s\)</td></tr>
    <tr><td>Dynamic cone</td><td>Blows of a falling hammer to drive the cone: dynamic resistance \(q_d\) (Dutch formula)</td></tr>
    <tr><td>SPT</td><td>Blows of a 635 N hammer falling 762 mm to drive a split spoon: \(N = N_1 + N_2\) for the last 2 × 15 cm (after 15 cm seating)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>CPT:</strong> \(c_u = \dfrac{q_c - \sigma_o}{N_k}\) (\(N_k \approx 20\), \(\sigma_o\) = total overburden); sand: \(\varphi = \arctan\left[0.1 + 0.38\log(q_c/\sigma'_o)\right]\), \(E \approx 2q_c\).</li>
  <li><strong>Dynamic cone</strong> (Dutch formula): \(q_d = \dfrac{M}{e(M + M')}\cdot\dfrac{MH}{A}\) — \(M\) hammer, \(M'\) rods, \(H\) drop, \(e\) penetration per blow, \(A\) cone area.</li>
  <li><strong>SPT:</strong> stop if N &gt; 50 for 15 cm (refusal). Correct the field value, then use correlations.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 250" role="img" aria-label="SPT split-spoon test">
    <rect class="soil" x="20" y="90" width="480" height="150"/>
    <path class="ln" d="M240 20 V200"/><rect class="conc" x="226" y="40" width="28" height="30"/>
    <path class="acc" d="M210 46 V66"/><polygon class="accf" points="210,70 205,60 215,60"/>
    <rect class="ln" x="232" y="170" width="16" height="60"/>
    <path class="dim" d="M270 170 H300 M270 200 H300 M270 230 H300 M290 170 V230"/>
    <text x="306" y="186" class="m">15 cm (seating)</text><text x="306" y="206" class="m">15 cm → N₁</text><text x="306" y="228" class="m">15 cm → N₂</text>
    <text x="270" y="50" class="m">635 N hammer, 762 mm drop</text>
    <text x="30" y="110" class="a">N = N₁ + N₂</text>
  </svg>
  <figcaption>Figure 1 — Standard Penetration Test: blows for the last 30 cm.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'SPT corrections and correlations', html: String.raw`
<ul>
  <li><strong>Fine silty sand below water</strong> with \(N' > 15\): \(N = 15 + \tfrac12(N' - 15)\).</li>
  <li><strong>Overburden:</strong> \(N = N'C_N\), e.g. \(C_N = 9.78\sqrt{1/\sigma'_o}\) (Liao & Whitman 1986, \(\sigma'_o\) in kPa), \(C_N = 0.77\log(2000/\sigma'_o)\) (Peck 1974).</li>
  <li><strong>Friction angle:</strong> \(\varphi = \sqrt{20N} + 20\) (Hatanaka & Uchida), \(\varphi = 0.36N + 27\) (buildings), \(\varphi = 27.1 + 0.3N - 0.00054N^2\) (Wolff).</li>
  <li><strong>Modulus (kPa):</strong> saturated sand \(766N\); dense sand \(500(N + 15)\) or \(2600N\); clayey sand \(320(N + 15)\); silts \(300(N + 6)\).</li>
  <li><strong>Clay:</strong> \(c_u = KN\) with \(K\) = 3.5 – 6.5 kPa (≈ 4.4), or \(c_u = 29N^{0.72}\) kPa (Hara 1971).</li>
</ul>
<table class="tbl num">
  <thead><tr><th>Sand</th><th>N</th><th>D_r %</th><th>φ</th><th>Clay</th><th>N</th><th>q_u (kPa)</th></tr></thead>
  <tbody>
    <tr><td>Very loose</td><td>0 – 4</td><td>0 – 15</td><td>&lt; 28°</td><td>Very soft</td><td>&lt; 2</td><td>&lt; 25</td></tr>
    <tr><td>Loose</td><td>4 – 10</td><td>15 – 35</td><td>28 – 30°</td><td>Soft</td><td>2 – 4</td><td>25 – 50</td></tr>
    <tr><td>Medium</td><td>10 – 30</td><td>35 – 65</td><td>30 – 36°</td><td>Medium</td><td>4 – 8</td><td>50 – 100</td></tr>
    <tr><td>Dense</td><td>30 – 50</td><td>65 – 85</td><td>36 – 41°</td><td>Stiff</td><td>8 – 15</td><td>100 – 200</td></tr>
    <tr><td>Very dense</td><td>&gt; 50</td><td>85 – 100</td><td>&gt; 41°</td><td>Very stiff / hard</td><td>15 – 30 / &gt; 30</td><td>200 – 400 / &gt; 400</td></tr>
  </tbody>
</table>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'SPT in sand', html: String.raw`
<div class="ex">
  <div class="ex-head">An SPT at 6 m in a medium sand gives N′ = 18; the effective overburden is \(\sigma'_o = 75\) kPa. Correct N and estimate φ and E.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(C_N = 9.78\sqrt{1/75} = 1.13\) → \(N = 18 \times 1.13 = 20.3 \approx 20\).</li>
      <li>\(\varphi = \sqrt{20 \times 20} + 20 = 40°\) (Hatanaka) or \(0.36(20) + 27 = 34.2°\) (buildings) — use the more conservative ≈ 34°.</li>
      <li>\(E = 500(20 + 15) = 17\,500\) kPa.
        <span class="result">N ≈ 20, φ ≈ 34°, E ≈ 17.5 MPa — medium-dense sand</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Record the blows for each 15 cm; ignore the first (seating) increment.</li>
  <li>Correlations scatter widely — use the conservative one and compare several.</li>
  <li>CPT is unsuitable in gravel; SPT in very soft clay gives N ≈ 0 and little information.</li>
</ul>` }
      ]
    }
  ]
});
