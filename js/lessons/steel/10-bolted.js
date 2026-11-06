/* Lesson 10 — Bolted connections (Handbook Ch. 8 §8.1–8.4) */
KCE_COURSE.lessons.push({
  id: 'bolted',
  num: 10,
  title: 'Bolted Connections',
  desc: 'Connection design principles, bolt categories (4.6/S, 8.8/S, 8.8/TB, 8.8/TF), bolt shear, tension and combined capacity, ply bearing and tear-out, bolt groups, minimum design actions and connected plate elements.',
  icon: '🔩',
  color: 'sky',
  meta: ['Ch. 8 §8.2–8.4', 'φV_f = 0.8 × 0.62f_ufk_r(n_nA_c + n_xA_o)', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Connections transfer forces between members; they often govern cost and must be as strong as the analysis assumes (simple, rigid or semi-rigid). Bolts are designated by property class and tightening: <strong>4.6/S</strong> (commercial, snug-tight), <strong>8.8/S</strong> (high-strength, snug-tight), <strong>8.8/TB</strong> (fully tensioned, bearing) and <strong>8.8/TF</strong> (fully tensioned, friction-grip, for slip-critical or fatigue-loaded joints).</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Bolt shear</th><td>\(V_f = 0.62f_{uf}k_r(n_nA_c + n_xA_o)\) — \(n_n\), \(n_x\) shear planes through threads / shank; \(k_r\) = 1.0 for joint length &lt; 300 mm</td></tr>
    <tr><th>Bolt tension</th><td>\(N_{tf} = A_sf_{uf}\)</td></tr>
    <tr><th>Combined</th><td>\(\left(\dfrac{V_f^*}{\varphi V_f}\right)^2 + \left(\dfrac{N_{tf}^*}{\varphi N_{tf}}\right)^2 \le 1.0\)</td></tr>
    <tr><th>Ply bearing</th><td>\(V_b = \min(3.2d_ft_pf_{up},\ a_et_pf_{up})\) — crushing and tear-out</td></tr>
    <tr><th>Friction (TF)</th><td>\(V_{sf} = \mu n_{ei}N_{ti}k_h\), μ ≈ 0.35 for clean mill scale</td></tr>
  </tbody>
</table>
<p>φ = 0.8 for bolts, 0.9 for plies. M20 8.8: \(f_{uf} = 830\) MPa, \(A_c = 225\), \(A_o = 314\), \(A_s = 245\) mm².</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Design actions: the larger of the analysis result and the minimum actions (e.g. tension members: \(0.3\varphi N_t\); simple beam connections: at least 40 kN shear).</li>
  <li>Choose bolt size, category and number; check bolt shear (threads in or out of the shear planes).</li>
  <li>Check bearing and tear-out of every ply, and net-section capacity of the plates.</li>
  <li>For eccentric bolt groups find the force on the critical bolt by elastic analysis: \(V_{res} = \sqrt{(V/n + M y_{max}/I_p)^2 + (Mx_{max}/I_p)^2}\), \(I_p = \sum(x^2 + y^2)\).</li>
  <li>Detail: edge distances ≥ 1.5d (sheared edge 1.75d), pitch ≥ 2.5d.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 540 200" role="img" aria-label="Lap splice in double shear">
    <rect class="conc" x="40" y="80" width="230" height="40"/><rect class="conc" x="280" y="80" width="220" height="40"/>
    <rect class="comp" x="200" y="64" width="160" height="16"/><rect class="comp" x="200" y="120" width="160" height="16"/>
    <g class="ln"><path d="M225 60 V140 M255 60 V140 M305 60 V140 M335 60 V140"/></g>
    <path class="ln" d="M40 100 H6"/><polygon class="accf" points="2,100 12,95 12,105"/><path class="ln" d="M500 100 H534"/><polygon class="accf" points="538,100 528,95 528,105"/>
    <text x="70" y="160" class="m">200 × 20 tie member</text><text x="250" y="160" class="m">2 splice plates 180 × 12</text><text x="210" y="50" class="m">M20 8.8/S, 35 – 70 – 35</text>
  </svg>
  <figcaption>Figure 1 — Example 8.1: splice in double shear, two bolts per row.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Choosing the bolting category', html: String.raw`
<ul>
  <li><strong>4.6/S</strong> — light, secondary connections (purlins, girts).</li>
  <li><strong>8.8/S</strong> — the standard structural bolt in snug-tight bearing joints.</li>
  <li><strong>8.8/TB</strong> — fully tensioned for rigidity, still designed in bearing.</li>
  <li><strong>8.8/TF</strong> — no slip under service loads: fatigue, reversing loads, oversize holes. Contact surfaces must be unpainted (or specially treated).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Example 8.1 — tension splice', html: String.raw`
<div class="ex">
  <div class="ex-head">A 200 × 20 Grade 300 flat tie carries \(N^* = 800\) kN. Splice it with two 180 × 12 plates and M20 8.8/S bolts in double shear (Figure 1). Holes 22 mm.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Tie: \(\varphi N_{tf} = 0.9(0.85)(1.0)(3120)(440) = 1050\) kN; \(\varphi N_{ty} = 0.9(4000)(280) = 1010\) kN → 1010 ≥ 800 ✓. Minimum action \(0.3\varphi N_t = 303\) kN &lt; 800.</li>
      <li>Splice plates: \(\varphi N_t = \min(1100, 1170) = 1100\) kN ≥ 800 ✓.</li>
      <li>Bolts, threads included in one plane: \(\varphi V_f = 0.8(0.62)(830)(1.0)(225 + 314)/10^3 = 222\) kN per bolt → \(n = 800/222 = 3.6\) → use <strong>4 bolts</strong> each side (888 kN ≥ 800 ✓).</li>
      <li>Tear-out with \(a_e = 35\) mm: \(\varphi V_b = 0.9(35)(20)(440) = 277\) kN/bolt → 1110 kN ✓; crushing \(0.9(3.2)(20)(20)(440) = 507\) kN/bolt → 2030 kN ✓.
        <span class="result">4 M20 8.8/S bolts each side, edge distance 35 mm — adequate</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>State whether threads are included in the shear planes — it changes capacity by about 40 %.</li>
  <li>Check every ply for bearing and tear-out, not just the bolts.</li>
  <li>Apply the minimum design actions of AS 4100 §9.1.4.</li>
</ul>` }
      ]
    }
  ]
});
