/* Lesson 10 — Earth pressure and retaining walls (CCES Foundation Ch. 3) */
KCE_COURSE.lessons.push({
  id: 'retaining-walls',
  num: 10,
  title: 'Earth Pressure and Retaining Walls',
  desc: 'At-rest, active and passive pressure, Rankine coefficients for cohesionless and cohesive soils, tension cracks, water and layered backfill, sloping backfill, Coulomb’s method, gravity and cantilever walls and their stability against overturning, sliding and bearing.',
  icon: '🧱',
  color: 'lilac',
  meta: ['Ch. 3', 'K_a · K_p', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A retaining wall holds back soil. The soil behind it pushes with the <strong>active</strong> force \(F_a\) (the wall moves slightly away), the soil in front resists with the <strong>passive</strong> force \(F_p\), and the base carries the normal reaction N and friction T. If the wall does not move, the soil stays <strong>at rest</strong>.</p>` },
        { title: 'Description', html: String.raw`
$$K_o = 1 - \sin\varphi',\qquad K_a = \frac{1 - \sin\varphi}{1 + \sin\varphi} = \tan^2\!\left(45° - \frac\varphi2\right),\qquad K_p = \frac{1}{K_a}$$
<table class="tbl">
  <tbody>
    <tr><th>Sand (c = 0)</th><td>\(\sigma_{ha} = K_a\gamma z\); \(F_a = \tfrac12\gamma K_aH^2\) at \(H/3\)</td></tr>
    <tr><th>Clay (c ≠ 0)</th><td>\(\sigma_{ha} = K_a\gamma z - 2c\sqrt{K_a}\); tension crack depth \(h_t = \dfrac{2c}{\gamma\sqrt{K_a}}\); \(F_a = \tfrac12\gamma K_aH^2 - 2c\sqrt{K_a}H\)</td></tr>
    <tr><th>Passive</th><td>\(\sigma_{hp} = K_p\gamma z + 2c\sqrt{K_p}\)</td></tr>
    <tr><th>Below water</th><td>\(\sigma'_{ha} = K_a\sigma'_v\) plus water pressure \(u = \gamma_wz_w\) (water is not reduced by K)</td></tr>
  </tbody>
</table>
<p>Typical \(K_o\): loose sand 0.45 – 0.50, dense sand 0.40 – 0.45, normally consolidated clay 0.50, overconsolidated clay &gt; 0.5 (can exceed 1).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Draw the pressure diagram layer by layer (change of K at each layer, water pressure separately).</li>
  <li>Split it into rectangles and triangles; \(F_a = \sum F_i\); the line of action from \(\sum F_iz_i = F_az\).</li>
  <li>Compute the wall weight W and its moments about the toe.</li>
  <li>Check overturning, sliding and bearing (Theory).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 540 250" role="img" aria-label="Active pressure with water">
    <path class="ln" d="M100 30 V220"/><path class="dim" d="M100 30 H260"/>
    <polygon class="comp" points="100,30 100,87 130,87"/><polygon class="comp" points="100,87 130,87 168,220 100,220"/>
    <polygon class="conc" points="300,87 300,220 360,220"/>
    <path class="acc" d="M20 87 H90"/><polygon class="ln" points="60,82 52,72 68,72"/>
    <text x="136" y="92" class="m">18 kPa</text><text x="174" y="224" class="m">41 kPa</text><text x="366" y="224" class="m">u = 70 kPa</text>
    <text x="270" y="160">+</text><text x="20" y="60" class="m">H_w = 3 m</text><text x="20" y="160" class="m">7 m</text>
    <text x="400" y="80" class="a">F_a ≈ 479 kN/m</text><text x="400" y="100" class="m">at 2.95 m above the base</text>
  </svg>
  <figcaption>Figure 1 — Wall 10 m high, water 3 m below the top: soil pressure plus water pressure.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Sloping backfill and Coulomb', html: String.raw`
<p>Rankine, backfill at slope β: \(K_{a(\beta)} = \cos\beta\dfrac{\cos\beta - \sqrt{\cos^2\beta - \cos^2\varphi}}{\cos\beta + \sqrt{\cos^2\beta - \cos^2\varphi}}\); the force \(F = \tfrac12\gamma K_{a\beta}H^2\) acts parallel to the slope: \(V = F\sin\beta\), \(H = F\cos\beta\).</p>
<p>Coulomb (wall back inclined θ, wall friction δ, backfill slope α):</p>
$$K_a = \frac{\cos^2(\varphi - \theta)}{\cos^2\theta\cos(\theta + \delta)\left[1 + \sqrt{\dfrac{\sin(\varphi + \delta)\sin(\varphi - \alpha)}{\cos(\theta + \delta)\cos(\theta - \alpha)}}\right]^2}$$` },
        { title: 'Wall stability', html: String.raw`
<ul>
  <li><strong>Overturning</strong> about the toe: \(FS = \dfrac{\sum M_R}{\sum M_O} \ge 1.5\) (2 used in the examples).</li>
  <li><strong>Sliding:</strong> \(FS = \dfrac{(\sum V)\tan(k\varphi_2) + Bkc_2 + P_p}{P_{ah}} \ge 1.5\), \(k = \tfrac12\)–\(\tfrac23\); \(P_p = \tfrac12\gamma D^2K_p + 2cD\sqrt{K_p}\). Base friction \(\tan\varphi'\) ≈ 0.55 (clean sand, gravel), 0.45 (silty sand), 0.35 (silt). Add a shear key if FS &lt; 1.5.</li>
  <li><strong>Bearing:</strong> \(e = \dfrac B2 - \dfrac{\sum M_R - \sum M_O}{\sum V} \le \dfrac B6\); \(q_{max,min} = \dfrac{\sum V}{B}\left(1 \pm \dfrac{6e}{B}\right)\); \(FS = q_u/q_{max} \ge 3\) using inclination factors with \(\alpha = \arctan(P_a\cos\alpha/\sum V)\).</li>
  <li>Proportions: gravity wall base ½H – ⅔H, top ≥ 30 cm (H/12); cantilever wall stem top ≥ 30 cm, base slab H/12 thick.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Active force with groundwater', html: String.raw`
<div class="ex">
  <div class="ex-head">A 10 m smooth wall retains sand (\(\varphi = 30°\), \(\gamma = 18\), \(\gamma_{sat} = 20\) kN/m³); water 3 m below the top (Figure 1). Find \(F_a\) and its position.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(K_a = 0.333\). At 3 m: \(\sigma'_{ha} = 3(18)(0.333) = 18\) kPa; at 10 m: \(18 + 10(7)(0.333) = 41.3\) kPa; water \(u = 10(7) = 70\) kPa.</li>
      <li>\(F_1 = \tfrac12(18)(3) = 27\), \(F_2 = 18(7) = 126\), \(F_3 = \tfrac12(7)(23.3) = 81.6\), \(F_4 = \tfrac12(70)(7) = 245\) kN/m → \(F_a ≈ 479\) kN/m.</li>
      <li>Moments about the base: \(27(8) + 126(3.5) + 81.6(2.33) + 245(2.33) = F_a\bar z\) → \(\bar z = 2.96\) m.
        <span class="result">F_a ≈ 479 kN/m at 2.95 m above the base (the notes round to 478.5)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Cohesive backfill', html: String.raw`
<div class="ex">
  <div class="ex-head">A 10 m wall retains clay with \(c = 10\) kPa, \(\varphi = 25°\), \(\gamma = 20\) kN/m³. Find the tension-crack depth and \(F_a\).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(K_a = 0.405\); top \(\sigma_{ha} = -2(10)\sqrt{0.405} = -12.7\) kPa; bottom \(20(10)(0.405) - 12.7 = 68.3\) kPa.</li>
      <li>\(h_t = \dfrac{2(10)}{20\sqrt{0.405}} = 1.57\) m.</li>
      <li>\(F_a = \tfrac12(20)(10^2)(0.405) - 2(10)\sqrt{0.405}(10) = 278\) kN/m, acting 2.57 m above the base.
        <span class="result">h_t = 1.57 m, F_a = 278 kN/m (ignoring the tension zone gives 288 kN/m at 2.81 m)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Stability of a cantilever wall', html: String.raw`
<div class="ex">
  <div class="ex-head">A cantilever wall with a 4 m base and H = 7.16 m (backfill sloping 10°, sand \(\gamma = 18\), \(\varphi = 30°\); foundation soil \(\gamma = 19\), \(\varphi = 20°\), \(c = 40\) kPa; base 1.5 m deep). \(P_a = 152.1\) kN/m, \(P_h = 149.8\), \(P_v = 26.4\); \(\sum W = 477.9\) kN/m; \(\sum M_R = 1136.1\) kN·m/m.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Overturning: \(M_O = 149.8(2.386) = 357.4\) → \(FS = 1136.1/357.4 = 3.18 &gt; 2\) ✓.</li>
      <li>Sliding: \(K_p = 2.04\), \(P_p = 0.5(2.04)(19)(1.5^2) + 2(40)(1.5)\sqrt{2.04} = 215\) kN/m;
        \(FS = \dfrac{477.9\tan(0.67 \times 20°) + 4(0.67)(40) + 215}{149.8} = 2.91 &gt; 1.5\) ✓.</li>
      <li>Bearing: \(e = 2 - \dfrac{1136.1 - 357.4}{477.9} = 0.37 &lt; B/6 = 0.67\); \(q_{max} = \dfrac{477.9}{4}\left(1 + \dfrac{6(0.37)}{4}\right) = 185.8\) kPa; \(q_u = 507\) kPa → \(FS = 2.73 &lt; 3\) ✗.
        <span class="result">Safe against overturning and sliding, but bearing FS = 2.73 &lt; 3 — widen the base</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Water pressure acts fully (K = 1) — drains behind the wall remove it.</li>
  <li>Keep the resultant in the middle third of the base.</li>
  <li>Count passive resistance only if the soil in front will always be there.</li>
</ul>` }
      ]
    }
  ]
});
