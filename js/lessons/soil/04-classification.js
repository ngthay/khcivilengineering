/* Lesson 4 — Soil classification (CCES Soil Mechanics §4) */
KCE_COURSE.lessons.push({
  id: 'classification',
  num: 4,
  title: 'Soil Classification: USCS and AASHTO',
  desc: 'Classification systems, the Unified Soil Classification System for buildings, the plasticity chart, the AASHTO system for roads and the group index.',
  icon: '🏷️',
  color: 'lilac',
  meta: ['§4', 'USCS · AASHTO', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A classification system groups soils with similar behaviour under a short symbol, using only grading and Atterberg limits. Many systems exist (Soviet, French AFNOR, British BS); the notes follow the two American systems: <strong>USCS</strong> (Casagrande 1942, ASTM D2487) for buildings and <strong>AASHTO</strong> for highways.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>USCS symbol</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td>G / S</td><td>Gravel / sand — coarse: more than 50 % retained on 0.075 mm; gravel if more than half the coarse part is retained on 4.76 mm</td></tr>
    <tr><td>W / P</td><td>Well / poorly graded (clean, fines &lt; 5 %), using \(C_u\) and \(C_c\)</td></tr>
    <tr><td>M / C</td><td>With silt / clay fines (fines &gt; 12 %); 5 – 12 % gives dual symbols (GW-GM …)</td></tr>
    <tr><td>M, C, O</td><td>Fine soils (≥ 50 % passing 0.075 mm): silt, clay, organic</td></tr>
    <tr><td>L / H</td><td>Low / high plasticity: \(w_L &lt; 50\) or \(\ge 50\,\%\)</td></tr>
    <tr><td>Pt</td><td>Peat</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>From the grading curve find % passing 0.075 mm and 4.76 mm, and \(C_u, C_c\).</li>
  <li>Coarse soil: decide G or S, then W/P (clean) or M/C (with fines, using the plasticity chart).</li>
  <li>Fine soil: plot \(w_L\), \(I_P\) on the plasticity chart — above the A-line \(I_P = 0.73(w_L - 20)\) it is clay (C), below it silt (M); then L or H.</li>
  <li>Add the descriptive name (e.g. sandy lean clay, gravelly fat clay) from the % sand and gravel.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 260" role="img" aria-label="Plasticity chart">
    <path class="thin" d="M60 220 H500 M60 220 V20"/>
    <path class="acc" d="M148 220 L480 55"/><path class="dim" d="M280 220 V20"/>
    <path class="ln" d="M95 220 L421 20"/>
    <text x="200" y="160">CL</text><text x="330" y="100">CH</text><text x="200" y="205">ML / OL</text><text x="380" y="180">MH / OH</text>
    <text x="440" y="70" class="a">A-line</text><text x="410" y="34" class="m">U-line</text>
    <text x="268" y="238" class="m">50</text><text x="420" y="246" class="m">w_L (%)</text><text x="14" y="30" class="m">I_P (%)</text>
  </svg>
  <figcaption>Figure 1 — Casagrande plasticity chart for fine soils.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'AASHTO and the group index', html: String.raw`
<p>AASHTO groups soils from A-1 (best subgrade) to A-7 (worst). Granular soils have ≤ 35 % passing 0.075 mm; silt-clay soils more than 35 %. Within a group, the <strong>group index</strong> ranks the quality — the larger, the worse the subgrade:</p>
$$GI = 0.2a + 0.005ac + 0.01bd$$
<table class="tbl num">
  <tbody>
    <tr><th>a</th><td>\(P_{200} - 35\), limited to 0 – 40</td><th>b</th><td>\(P_{200} - 15\), limited to 0 – 40</td></tr>
    <tr><th>c</th><td>\(w_L - 40\), limited to 0 – 20</td><th>d</th><td>\(I_P - 10\), limited to 0 – 20</td></tr>
  </tbody>
</table>` },
        { title: 'Consistency of fine soils', html: String.raw`
<p>Moisture state by degree of saturation: dry \(S = 0\); slightly moist \(0 < S < 50\,\%\); moist 50 – 80 %; saturated \(S > 80\,\%\). Consistency is described as very soft, soft, medium stiff, stiff, very stiff, hard (see SPT, Lesson 9).</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'AASHTO group index', html: String.raw`
<div class="ex">
  <div class="ex-head">A soil has 38 % retained on 0.075 mm, \(w_L = 28\,\%\), \(w_P = 15\,\%\). Classify it by AASHTO.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(P_{200} = 100 - 38 = 62\,\% > 35\,\%\) → silt-clay soil. \(I_P = 28 - 15 = 13\,\%\).</li>
      <li>\(w_L = 28 < 40\) and \(I_P = 13 > 10\) → group A-6.</li>
      <li>\(a = 62 - 35 = 27\); \(b = 40\) (\(P_{200} > 55\)); \(c = 0\) (\(w_L < 40\)); \(d = 13 - 10 = 3\).
        $$GI = 0.2(27) + 0.005(27)(0) + 0.01(40)(3) = 6.6 \approx 7$$
        <span class="result">A-6 (7) — clayey soil, fair to poor subgrade</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Decide coarse or fine first, from % passing 0.075 mm.</li>
  <li>Clamp a, b, c, d to their limits before computing GI; round GI to a whole number.</li>
  <li>Use the plasticity chart — not \(w_L\) alone — to separate silt from clay.</li>
</ul>` }
      ]
    }
  ]
});
