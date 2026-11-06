/* Lesson 9 — Pile foundations (CCES Foundation Ch. 2) */
KCE_COURSE.lessons.push({
  id: 'piles',
  num: 9,
  title: 'Pile Foundations: Capacity and Driving Formulas',
  desc: 'Pile types and installation, dynamic (driving) formulas — Dutch, ENR, Danish, Pacific Coast — and static capacity in clay (α/β method), sand (critical depth), layered soil, negative skin friction and capacity from CPT and SPT.',
  icon: '📏',
  color: 'peach',
  meta: ['Ch. 2', 'Q = Q_p/2 + Q_f/3', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>When the good soil is deep (\(D/B &gt; 10\)), loads are carried down by <strong>piles</strong> — of timber, concrete or steel; driven (precast, by hammer, vibration or jacking) or cast in place (bored, with or without casing). A pile carries load by <strong>end bearing</strong> \(Q_p\) at the tip and <strong>skin friction</strong> \(Q_f\) along the shaft.</p>` },
        { title: 'Description', html: String.raw`
$$Q_{allow} = \frac{Q_p}{2} + \frac{Q_f}{3},\qquad Q_p = q_pA_p,\qquad Q_f = q_fA_f$$
<table class="tbl">
  <tbody>
    <tr><th>Clay (\(\varphi_u = 0\))</th><td>\(q_p = 9c_u + \gamma D\) (net \(9c_u\)); \(q_f = c_a = \beta c_u\), \(\beta = 16.715c_u^{-0.7765} \le 1\), \(c_a \le 100\) kPa</td></tr>
    <tr><th>Sand</th><td>\(q_p = 50N_q\tan\varphi + 1.3cN_c\), \(N_q = e^{7\tan\varphi}\); \(\tau = \sigma_h\tan\delta\), \(\sigma_h = K\gamma z\) (z ≤ critical depth \(D_c = \tfrac B4N_q^{2/3}\))</td></tr>
    <tr><th>End-bearing on rock</th><td>\(Q_p = \dfrac RFA\), concrete strength \(R\) ≈ 20 000 kPa, F = 4</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Divide the shaft into layers; compute \(q_f\) in each (clay: \(\beta c_u\); sand: \(K\sigma'_v\tan\delta\)).</li>
  <li>Ignore friction over the critical depth \(D_c\) at the tip and in fill or very soft layers.</li>
  <li>Compute \(Q_p\) at the tip layer and \(Q_f = \sum q_{fi}Ph_i\).</li>
  <li>\(Q_{allow} = Q_p/2 + Q_f/3\); check driving formulas and load tests on site.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 250" role="img" aria-label="Pile end bearing and skin friction">
    <path class="dim" d="M20 50 H500"/><rect class="conc" x="240" y="30" width="30" height="190"/>
    <path class="acc" d="M255 6 V26"/><polygon class="accf" points="255,30 250,20 260,20"/><text x="264" y="18">Q</text>
    <g class="ln"><path d="M228 80 V64 M228 120 V104 M228 160 V144 M282 80 V64 M282 120 V104 M282 160 V144"/></g>
    <g class="accf"><polygon points="228,60 224,68 232,68"/><polygon points="228,100 224,108 232,108"/><polygon points="228,140 224,148 232,148"/><polygon points="282,60 278,68 286,68"/><polygon points="282,100 278,108 286,108"/><polygon points="282,140 278,148 286,148"/></g>
    <path class="acc" d="M245 245 V224 M255 245 V224 M265 245 V224"/><polygon class="accf" points="255,222 250,232 260,232"/>
    <text x="300" y="110" class="m">τ — skin friction Q_f</text><text x="300" y="236" class="m">q_p — end bearing Q_p</text>
    <path class="dim" d="M200 50 V220"/><text x="182" y="140" class="m">D</text>
  </svg>
  <figcaption>Figure 1 — Load transfer: skin friction along the shaft and end bearing at the tip.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Dynamic (driving) formulas', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Dutch</th><td>\(Q_{allow} = \dfrac1F\cdot\dfrac{MgH}{e}\cdot\dfrac{1}{1 + M'/M}\), F = 6 (M hammer, M′ pile, e set per blow)</td></tr>
    <tr><th>ENR</th><td>\(Q_u = \dfrac{W_Rh}{S + C}\) (C = 2.54 cm drop hammer, 0.254 cm steam hammer), F = 6; modified \(Q_u = \dfrac{EW_Rh}{S + C}\cdot\dfrac{W_R + n^2W_P}{W_R + W_P}\)</td></tr>
    <tr><th>Danish</th><td>\(Q_u = \dfrac{EH_E}{S + \sqrt{EH_EL/2A_pE_p}}\), F = 3 – 6</td></tr>
  </tbody>
</table>
<p>Hammer efficiency E: drop 0.7 – 0.85, single-acting 0.8 – 0.9; restitution n: 0.4 – 0.5 (steel on concrete cap), 0.25 – 0.3 (timber). Formulas suit sand and gravel; in clay use static methods and load tests.</p>` },
        { title: 'Negative skin friction and in-situ methods', html: String.raw`
<p>Where soft clay or new fill consolidates around the pile, the soil moves down relative to the pile and drags it: <strong>negative skin friction</strong> adds load instead of resisting. It must be added to the pile load for those layers.</p>
<p><strong>CPT:</strong> \(q_p\) = average of the mean \(q_c\) over 8B above the tip and over 3.75B below it; \(q_{p,all} = q_p/2.5\); friction \(q_f = q_c/30\) (soft clay), \(q_c/50\) (stiffer clay), \(q_c/100\) (sand). <strong>SPT (Meyerhof):</strong> \(Q = \tfrac14\left(400NA_p + 2\bar NA_f\right)\) kN.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Dutch formula', html: String.raw`
<div class="ex">
  <div class="ex-head">A 0.3 m × 0.3 m concrete pile, 8 m long (\(\gamma_b = 25\) kN/m³), is driven by a 3000 kg hammer falling 0.5 m; it sinks 0.05 m in the last 10 blows. Find \(Q_{allow}\).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Pile weight \(M' = 25(0.3^2)(8) = 18\) kN; \(e = 0.05/10 = 0.005\) m.</li>
      <li>$$Q_{allow} = \frac16\cdot\frac{3000(9.81)(0.5)}{0.005}\cdot\frac{1}{1 + 18\,000/30\,000} = 306\,500\ \text{N}$$
        <span class="result">Q_allow ≈ 306 kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Pile in clay', html: String.raw`
<div class="ex">
  <div class="ex-head">The same 8 m pile passes 7 m of clay (\(c_u = 30\) kPa) into 1 m of stiff clay (\(c_u = 150\) kPa). Find \(Q_{allow}\).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Tip: \(q_p = 9(150) = 1350\) kPa → \(Q_p = 1350(0.09) = 121.5\) kN.</li>
      <li>Adhesion: \(c_{a1} = 30(16.715)(30)^{-0.7765} = 35.7\) kPa → limited to \(c_u\) = 30 kPa; \(c_{a2} = 150(16.715)(150)^{-0.7765} = 51.2\) kPa.</li>
      <li>\(Q_f = 30(0.3 \times 4)(7) + 51.2(0.3 \times 4)(1) = 313.5\) kN.</li>
      <li>\(Q_{allow} = 121.5/2 + 313.5/3 = 165.2\) kN.
        <span class="result">Q_allow ≈ 165 kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Pile in sand with water', html: String.raw`
<div class="ex">
  <div class="ex-head">A 0.4 m square concrete pile 12 m long in sand (\(\varphi = 35°\), \(\gamma = 18\), \(\gamma_{sat} = 20\) kN/m³); water at 5 m. Find \(Q_{allow}\).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(N_q = e^{7\tan35°} = 134.5\); \(D_c = \tfrac{0.4}{4}(134.5)^{2/3} = 2.62\) m; \(q_p = 50(134.5)\tan35° = 4708\) kPa → \(Q_p = 4708(0.16) = 753\) kN.</li>
      <li>Concrete pile, φ &gt; 30°: \(K = 1.83\), \(\delta = \tfrac34\varphi = 26.25°\). Mid-depth of each part: \(\tau_1 = 18(2.5)(1.83)\tan26.25° = 40.6\) kPa (0 – 5 m); \(\tau_2 = (18(5) + 10(3.5))(1.83)\tan26.25° = 112.8\) kPa (5 – 12 m).</li>
      <li>\(q_f = \dfrac{40.6(5) + 112.8(7)}{12} = 82.7\) kPa; \(Q_f = (12 - 2.62)(4 \times 0.4)(82.7) = 1241\) kN.</li>
      <li>\(Q = 753/2 + 1241/3 = 790.5\) kN.
        <span class="result">Q_allow ≈ 790 kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use different safety factors for tip (2) and friction (3).</li>
  <li>Exclude the critical depth near the tip and any layer that may settle (negative friction).</li>
  <li>Confirm design capacity with a static load test (settlement ≤ 25 mm under the working load).</li>
</ul>` }
      ]
    }
  ]
});
