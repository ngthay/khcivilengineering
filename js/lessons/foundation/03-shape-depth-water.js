/* Lesson 3 — Shape, depth, groundwater and safety factor (CCES Foundation Ch. 1 §I–IV) */
KCE_COURSE.lessons.push({
  id: 'shape-depth-water',
  num: 3,
  title: 'Footing Shape, Depth, Water Table and Safety Factor',
  desc: 'Square, circular and rectangular footings, Skempton’s factors for clay, Meyerhof’s equations, the effect of groundwater, net bearing capacity, safety factor, compensated mats and checking a footing.',
  icon: '🟦',
  color: 'sky',
  meta: ['Ch. 1 §I–IV', 'q_net, F = 3', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Terzaghi’s strip equation is extended to real footings by <strong>shape factors</strong>, to deeper footings by <strong>depth factors</strong>, and to wet ground by using submerged unit weights. Design then works with the <strong>net</strong> pressure the soil can take beyond what it already carried, divided by a <strong>safety factor</strong>.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Square</th><td>\(q_d = 1.3cN_c + \gamma_sDN_q + 0.4\gamma BN_\gamma\)</td></tr>
    <tr><th>Circular (B = diameter)</th><td>\(q_d = 1.3cN_c + \gamma_sDN_q + 0.3\gamma BN_\gamma\)</td></tr>
    <tr><th>Rectangle (general)</th><td>\(q_d = \left(1 + 0.2\tfrac BL\right)cN_c + \gamma_sDN_q\left(1 + \tfrac BL\tan\varphi\right) + \left(1 - 0.4\tfrac BL\right)\tfrac{\gamma B}{2}N_\gamma\)</td></tr>
    <tr><th>Clay, \(\varphi_u = 0\) (Skempton)</th><td>\(q_d = \left(1 + 0.2\tfrac DB\right)\left(1 + 0.2\tfrac BL\right)5.14c_u + \gamma_sD\), with \(D/B \le 2.5\)</td></tr>
    <tr><th>Net capacity</th><td>\(q_{net} = q_d - \gamma_sD\); allowable \(q_{all} = q_{net}/F + \gamma_sD\), \(F = 3\) (ultimate) or 2 (service)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose the equation for the footing shape and soil (drained \(c, \varphi\) or undrained \(c_u\)).</li>
  <li>Correct for groundwater (Theory).</li>
  <li>Compute \(q_{net}\) and \(q_{all}\).</li>
  <li>Check: footing load + footing weight + soil on the footing, divided by \(BL\), must not exceed \(q_{all}\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 230" role="img" aria-label="Footing with water table">
    <path class="dim" d="M20 50 H500"/><rect class="conc" x="180" y="130" width="160" height="26"/><rect class="conc" x="246" y="50" width="28" height="80"/>
    <path class="acc" d="M20 186 H500"/><polygon class="ln" points="440,180 432,170 448,170"/>
    <path class="dim" d="M370 50 V156 M370 156 V186 M180 205 H340"/>
    <text x="378" y="104" class="m">D</text><text x="378" y="176" class="m">Z_w</text><text x="252" y="222" class="m">B</text>
    <text x="40" y="120" class="m">γ above water</text><text x="40" y="214" class="m">γ′ = γ_sat − γ_w below</text>
  </svg>
  <figcaption>Figure 1 — Water table at depth Z_w below the footing base.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Groundwater', html: String.raw`
<ul>
  <li><strong>Water above the base</strong>: use \(\gamma_s D = \gamma h_1 + \gamma'h_2\) for the surcharge and \(\gamma'\) in the \(N_\gamma\) term.</li>
  <li><strong>Water below the base</strong> at \(Z_w \le B\): \(\gamma_{calc} = \gamma' + \dfrac{Z_w}{B}(\gamma - \gamma')\) in the \(N_\gamma\) term; \(Z_w &gt; B\): no effect.</li>
</ul>` },
        { title: 'Meyerhof (1951 – 1963)', html: String.raw`
<p>Total stress (\(\varphi = 0\)): \(q_d = 5.14c_u\left(1 + 0.2\tfrac BL\right)\left(1 + 0.2\tfrac DB\right) + \gamma_sD\). Effective stress: \(q_d = \gamma_sDN_qS_qd_q + 0.5\gamma BN_\gamma S_\gamma d_\gamma\) with \(N_q = e^{\pi\tan\varphi}\tan^2(45 + \varphi/2)\), \(N_\gamma = (N_q - 1)\tan1.4\varphi\), \(S_q = S_\gamma = 1 + 0.1K_p\tfrac BL\), \(d_q = d_\gamma = 1 + 0.1\sqrt{K_p}\tfrac DB\), \(K_p = \tan^2(45 + \varphi/2)\).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Square footing on clay (Skempton)', html: String.raw`
<div class="ex">
  <div class="ex-head">A 2 m × 2.5 m footing at D = 1.5 m on saturated clay: \(c_u = 65\) kPa, \(\gamma = 19.5\) kN/m³, soil above \(\gamma_s = 20\) kN/m³. Find \(q_d\).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>$$q_d = \left(1 + 0.2\tfrac{1.5}{2}\right)\left(1 + 0.2\tfrac{2}{2.5}\right)5.14(65) + 20(1.5) = 1.15(1.16)(334.1) + 30$$
        <span class="result">q_d = 475.7 kPa</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Water table below the base', html: String.raw`
<div class="ex">
  <div class="ex-head">A strip footing B = 2 m at D = 1.5 m in sand (\(c = 0\), \(\varphi = 38°\), \(\gamma = 18\), \(\gamma_{sat} = 20\), \(\gamma' = 10\) kN/m³); water 1 m below the base. Loose to medium sand.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Local shear: \(\tan\varphi' = \tfrac23\tan38° = 0.52\) → \(\varphi' = 27°\): \(N_q = 13.20\), \(N_\gamma = 14.47\).</li>
      <li>\(Z_w = 1 &lt; B\) → \(\gamma_{calc} = 10 + \tfrac12(18 - 10) = 14\) kN/m³.</li>
      <li>\(q_d = 18(1.5)(13.20) + 14\tfrac{2}{2}(14.47) = 559.0\) kPa.
        <span class="result">q_d ≈ 559 kPa</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checking a square footing', html: String.raw`
<div class="ex">
  <div class="ex-head">A 1.8 m × 1.8 m footing, 0.3 m thick, with a 0.25 m column, is founded at 2.0 m in clay (\(c_u = 100\) kPa, \(\gamma_s = 20\), concrete 25 kN/m³); column load 600 kN. Check it with F = 3.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(q_{net} = 5.14(100)(1 + 0.2)(1 + 0.2\tfrac{2}{1.8}) = 753.9\) kPa → \(q^{all}_{net} = 251.3\) kPa.</li>
      <li>First check: \(600/1.8^2 = 185.2 &lt; 251.3\) ✓.</li>
      <li>Concrete \(V_f = 1.8^2(0.3) + 0.25^2(1.7) = 1.078\) m³ → 26.95 kN; soil \(V_s = 1.8^2(2) - 1.078 = 5.402\) m³ → 108.0 kN. Total \(Q = 735.0\) kN.</li>
      <li>\(735.0/1.8^2 = 226.8\) kPa \(&lt; q^{all}_{brut} = 251.3 + 20(2) = 291.3\) kPa ✓.
        <span class="result">The footing is safe</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Compare like with like: net pressure with \(q^{all}_{net}\), gross pressure with \(q^{all}_{brut}\).</li>
  <li>Include the weight of the footing and the backfill on it.</li>
  <li>A mat founded at \(D = q/\gamma_s\) is fully compensated — the soil sees no extra load.</li>
</ul>` }
      ]
    }
  ]
});
