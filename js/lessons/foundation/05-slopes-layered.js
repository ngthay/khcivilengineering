/* Lesson 5 — Footings on slopes and on layered soil (CCES Foundation Ch. 1 §VI–VIII) */
KCE_COURSE.lessons.push({
  id: 'slopes-layered',
  num: 5,
  title: 'Footings on Slopes and Layered Soils',
  desc: 'Bearing capacity factors N′c and N′q for footings on or near a slope, two-layer clay (Brown & Meyerhof), sand over clay, average parameters, and the general equation with shape, depth and inclination factors.',
  icon: '⛰️',
  color: 'amber',
  meta: ['Ch. 1 §VI–VIII', 'N′c, N′q', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Two common situations reduce bearing capacity: a <strong>slope</strong> beside the footing removes the passive soil on one side, and a <strong>weaker layer</strong> below a strong one can be reached by the failure surface. Both are handled with modified bearing-capacity factors.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>On or near a slope</th><td>Strip: \(q_{net} = cN'_c + (N'_q - 1)\gamma_sD + \tfrac12\gamma BN_\gamma\); rectangle with the usual shape factors. \(N'_c, N'_q\) from tables of slope angle β, φ, D/B and b/B (distance from the crest).</td></tr>
    <tr><th>Two clay layers</th><td>Failure depth \(H = 0.5B\tan(45° + \varphi_1/2)\); if \(H &lt; d_1\) use layer 1 only, otherwise combine the layers.</td></tr>
    <tr><th>Average parameters</th><td>\(c_{av} = \dfrac{\sum c_iH_i}{\sum H_i}\), \(\varphi_{av} = \arctan\dfrac{\sum H_i\tan\varphi_i}{\sum H_i}\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Slope: compute β, φ, \(D/B\), \(b/B\); read \(N'_c\), \(N'_q\) from the table (Bowles); \(F = 3\).</li>
  <li>Layered clay: \(C_R = c_{u2}/c_{u1}\). If \(C_R &lt; 1\) (soft under stiff): strip \(N_c = \dfrac{1.5d_1}{B} + 5.14C_R \le 5.14\); square \(N_c = \dfrac{3d_1}{B} + 6.05C_R \le 6.05\).</li>
  <li>If \(C_R &gt; 1\) (stiff under soft): strip \(N_1 = 0.5B/d_1 + 4.14\), \(N_2 = 1.1B/d_1 + 4.14\); square \(N_1 = 0.33B/d_1 + 5.05\), \(N_2 = 0.66B/d_1 + 5.05\); \(N_c = \dfrac{2N_1N_2}{N_1 + N_2}\), reduced by 10 % when \(C_R &gt; 0.7\).</li>
  <li>Sand over clay: \(q_{net} = q_{net2} + \dfrac{PP_vK_s\tan\varphi_1}{A_f} + \dfrac{Pd_1c_1}{A_f} \le q_{net1}\), \(P = 2(B + L)\), \(P_v = 0.5\gamma_1d_1^2 + \gamma_sDd_1\), \(K_s = 1 - \sin\varphi_1\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 230" role="img" aria-label="Footing near a slope">
    <path class="ln" d="M20 80 H300 L460 200"/>
    <rect class="conc" x="150" y="110" width="80" height="20"/><rect class="conc" x="182" y="60" width="16" height="50"/>
    <path class="dim" d="M230 96 H300 M120 80 V130 M150 150 H230"/>
    <text x="252" y="92" class="m">b</text><text x="100" y="110" class="m">D</text><text x="184" y="166" class="m">B</text>
    <path class="thin" d="M340 110 A 50 50 0 0 1 335 140"/><text x="346" y="132" class="m">β</text>
    <path class="dim" d="M300 80 H460"/>
  </svg>
  <figcaption>Figure 1 — Footing near the crest of a slope: b = distance to the crest.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'General equation (De Beer, Hansen, Meyerhof)', html: String.raw`
$$q_d = c\lambda_{cs}\lambda_{cd}\lambda_{ci}N_c + \gamma D\lambda_{qs}\lambda_{qd}\lambda_{qi}N_q + \tfrac12\gamma B\lambda_{\gamma s}\lambda_{\gamma d}\lambda_{\gamma i}N_\gamma$$
<ul>
  <li><strong>Shape:</strong> \(\lambda_{cs} = 1 + \tfrac BL\tfrac{N_q}{N_c}\), \(\lambda_{qs} = 1 + \tfrac BL\tan\varphi\), \(\lambda_{\gamma s} = 1 - 0.4\tfrac BL\).</li>
  <li><strong>Depth</strong> (\(D/B \le 1\)): \(\lambda_{qd} = 1 + 2\tan\varphi(1 - \sin\varphi)^2\tfrac DB\), \(\lambda_{cd} = \lambda_{qd} - \dfrac{1 - \lambda_{qd}}{N_q\tan\varphi}\), \(\lambda_{\gamma d} = 1\); for \(D/B &gt; 1\) replace \(D/B\) by \(\arctan(D/B)\). For \(\varphi = 0\): \(\lambda_{cd} = 1 + 0.4D/B\).</li>
  <li><strong>Inclination:</strong> \(\lambda_{ci} = \lambda_{qi} = (1 - \alpha/90°)^2\), \(\lambda_{\gamma i} = (1 - \alpha/\varphi)^2\).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Strip footing near a clay slope', html: String.raw`
<div class="ex">
  <div class="ex-head">A strip footing B = 2 m at D = 2 m stands b = 4 m from the crest of a 60° slope, 20 m high, in clay (\(c = 100\) kPa, \(\varphi = 0\), \(\gamma = 20\) kN/m³). It carries 200 kN/m. Find the width needed (F = 3).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(b/B = 2\), \(D/B = 1\), β = 60°, φ = 0 → \(N'_c = 5.14\), \(N'_q = 1.03\), \(N_\gamma = 0\).</li>
      <li>\(q_d = 100(5.14) + (1.03 - 1)(20)(2) = 515.2\) kPa → \(q_{all} = 171.7\) kPa.</li>
      <li>\(B = 200/171.7 = 1.16\) m → use 1.2 m. (On the slope face, b = 0: \(N'_c = 4.70\), \(N'_q = 0.37\) → 444.8 kPa, B = 1.4 m.)
        <span class="result">B = 1.2 m set back 4 m; 1.4 m if placed on the slope face</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Soft clay over stiff clay', html: String.raw`
<div class="ex">
  <div class="ex-head">A 3 m × 6 m footing; the upper clay \(c_{u1} = 77\) kPa extends \(d_1 = 1.22\) m below the base; below it \(c_{u2} = 115\) kPa. Find \(q^{all}_{net}\).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(H = 0.5(3)\tan45° = 1.5\) m \(&gt; d_1\) → both layers matter; \(C_R = 115/77 = 1.5 &gt; 1\).</li>
      <li>\(N_1 = 0.5(3)/1.22 + 4.14 = 5.37\), \(N_2 = 1.1(3)/1.22 + 4.14 = 6.84\); \(N_c = \dfrac{2(5.37)(6.84)}{12.21} = 6.02\); \(C_R &gt; 0.7\) → \(N_c = 0.9(6.02) = 5.42\).</li>
      <li>\(q_{net} = 5.42(77) = 417.2\) kPa → \(q^{all}_{net} = 139\) kPa.
        <span class="result">q_all,net ≈ 139 kPa</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Setting a footing back from the crest can recover most of the capacity.</li>
  <li>Check whether the failure depth \(H\) reaches the second layer before combining layers.</li>
  <li>A weak layer close below the base can govern even if the top layer is strong.</li>
</ul>` }
      ]
    }
  ]
});
