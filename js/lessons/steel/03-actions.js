/* Lesson 3 — Design actions (Handbook Ch. 3) */
KCE_COURSE.lessons.push({
  id: 'actions',
  num: 3,
  title: 'Design Actions and Load Combinations',
  desc: 'Permanent and imposed actions, wind and earthquake actions, notional horizontal forces, temperature, crane loads and the strength and serviceability combinations of AS/NZS 1170.0.',
  icon: '⚖️',
  color: 'amber',
  meta: ['Ch. 3', '1.2G + 1.5Q', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Actions</strong> are the loads and imposed deformations a structure must resist. They are taken from the loading code (AS/NZS 1170 in the Handbook), factored and combined so that the most severe credible combination is found for each member.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Combination (strength)</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>\(1.35G\)</td><td>Dead load dominant</td></tr>
    <tr><td>\(1.2G + 1.5Q\)</td><td>Gravity — the usual case</td></tr>
    <tr><td>\(1.2G + \psi_cQ + W_u\)</td><td>Wind with gravity</td></tr>
    <tr><td>\(0.9G + W_u\)</td><td>Wind uplift / overturning</td></tr>
    <tr><td>\(G + \psi_cQ + E_u\)</td><td>Earthquake</td></tr>
  </tbody>
</table>
<p>\(\psi_c\) = combination factor (0.4 for floors in offices and homes, 0 for roofs). Serviceability: \(G + \psi_sQ\), \(G + \psi_lQ\), \(W_s\) with short- and long-term factors.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Permanent G:</strong> self-weight of steel (≈ 0.1 – 0.3 kPa for roofs), slabs, finishes, services.</li>
  <li><strong>Imposed Q:</strong> floor loads from AS/NZS 1170.1 (e.g. 3 kPa offices, 1.5 kPa homes; 0.25 kPa non-trafficable roofs).</li>
  <li><strong>Wind:</strong> \(p = 0.5\rho_{air}V_{des,\theta}^2C_{fig}C_{dyn}\) with the regional speed, terrain/height, shielding and topographic multipliers.</li>
  <li><strong>Earthquake:</strong> static base shear \(V = k_pZ\,C_h(T_1)\,\dfrac{S_p}{\mu}W_t\) (AS 1170.4).</li>
  <li>Form every combination; analyse and keep the worst effect for each member.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Portal frame actions">
    <path class="ln" d="M100 190 V90 L260 50 L420 90 V190"/>
    <g class="acc"><path d="M120 30 V80 M180 20 V64 M240 12 V48 M300 12 V48 M360 20 V64 M410 30 V80"/></g>
    <g class="accf"><polygon points="120,84 115,74 125,74"/><polygon points="180,68 175,58 185,58"/><polygon points="240,52 235,42 245,42"/><polygon points="300,52 295,42 305,42"/><polygon points="360,68 355,58 365,58"/><polygon points="410,84 405,74 415,74"/></g>
    <text x="210" y="10" class="a">G + Q (gravity)</text>
    <path class="ln" d="M30 120 H90 M30 150 H90"/><polygon class="accf" points="94,120 84,115 84,125"/><polygon class="accf" points="94,150 84,145 84,155"/>
    <text x="20" y="108" class="m">wind W_u</text>
    <path class="dim" d="M100 200 H420"/><text x="210" y="216" class="m">combinations: 1.2G + 1.5Q · 1.2G + W_u · 0.9G + W_u</text>
  </svg>
  <figcaption>Figure 1 — A portal frame under gravity and wind: each combination is analysed separately.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Notional horizontal forces and other actions', html: String.raw`
<ul>
  <li><strong>Notional horizontal force</strong> (AS 4100 Cl. 3.2.4): 0.002 × the factored vertical load at each floor, applied alone, to cover out-of-plumb erection — important for braced cores and tall frames.</li>
  <li><strong>Temperature:</strong> long buildings expand \(\Delta L = \alpha\Delta T L\); provide expansion joints or design for the restraint.</li>
  <li><strong>Cranes:</strong> vertical wheel loads with dynamic factors, lateral surge and longitudinal braking (AS 1418).</li>
  <li><strong>Others:</strong> silo and bin loads, snow, liquid pressure, construction loads.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Factored loads on a floor beam', html: String.raw`
<div class="ex">
  <div class="ex-head">A simply supported 8 m beam carries G = 4.17 kN/m and Q = 8.00 kN/m, plus a central point load with \(P_G = 104\) kN and \(P_Q = 140\) kN (Handbook Example 5.1). Find \(M^*\) and \(V^*\).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(w^* = 1.2(4.17) + 1.5(8.00) = 17.0\) kN/m; \(P^* = 1.2(104) + 1.5(140) = 334.8\) kN.</li>
      <li>\(M^* = \dfrac{17.0(8)^2}{8} + \dfrac{334.8(8)}{4} = 136 + 670 = 806\) kN·m.</li>
      <li>\(V^* = 17.0(4) + 334.8/2 = 235\) kN.
        <span class="result">M* = 806 kN·m, V* = 235 kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Check \(0.9G + W_u\) for uplift on light roofs — it often governs purlins and holding-down bolts.</li>
  <li>Do not forget the notional horizontal force in braced frames.</li>
  <li>Serviceability uses different (smaller) factors from strength.</li>
</ul>` }
      ]
    }
  ]
});
