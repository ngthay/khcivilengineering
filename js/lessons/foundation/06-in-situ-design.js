/* Lesson 6 — Bearing capacity from in-situ tests (CCES Foundation Ch. 1 §IX) */
KCE_COURSE.lessons.push({
  id: 'in-situ-design',
  num: 6,
  title: 'Bearing Capacity from CPT, DCP and SPT',
  desc: 'Allowable pressure from static cone resistance (Meyerhof, Schmertmann), dynamic cone resistance, and SPT methods (Meyerhof, Bowles, Teng) with groundwater corrections.',
  icon: '📌',
  color: 'rose',
  meta: ['Ch. 1 §IX', 'q_c · R_d · N', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>In sands, undisturbed samples are rarely available, so the bearing capacity is taken directly from field tests. The test value is averaged over a depth of about <strong>2B below the footing base</strong>, where most of the stress goes.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Static cone (sand)</th><td>\(q_{all} = q_c/15\) (B &lt; 1.22 m); \(q_{all} = \dfrac{q_c}{25}\left(\dfrac{3.28B + 1}{3.28B}\right)^2\) (B &gt; 1.22 m)</td></tr>
    <tr><th>Static cone (clay)</th><td>\(c_u = q_c/10\) (cone without sleeve) or \(q_c/15\) (with sleeve), then the \(c_u\) equations</td></tr>
    <tr><th>Schmertmann (D/B ≤ 1.5)</th><td>Sand: strip \(q_d = 28 - 0.0052(300 - q_c)^{1.5}\), square \(48 - 0.009(300 - q_c)^{1.5}\); clay: strip \(2 + 0.28q_c\), square \(5 + 0.34q_c\) (kgf/cm²); F = 3 – 6</td></tr>
    <tr><th>Dynamic cone</th><td>\(q_{all} = R_d/20\) (D/B ≥ 1, water below the base); \(R_d/15\) in dense sand</td></tr>
    <tr><th>SPT (Meyerhof, 25 mm)</th><td>\(q_{all} = 11.98N_{cor}\) kPa (B &lt; 1.22 m); \(7.99N_{cor}\left(\dfrac{3.28B + 1}{3.28B}\right)^2\) (B &gt; 1.22 m)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Average the test values between the base and about 2B below it.</li>
  <li>Correct SPT: submerged fine sand \(N' = 15 + \tfrac12(N - 15)\) if \(N &gt; 15\); overburden \(N' = N\dfrac{3.5}{q'_o + 0.7} \le N\) (\(q'_o\) in kgf/cm²).</li>
  <li>Apply the formula and the water correction factors.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Averaging zone below a footing">
    <path class="dim" d="M20 50 H500"/><rect class="conc" x="190" y="90" width="140" height="22"/><rect class="conc" x="248" y="50" width="24" height="40"/>
    <rect class="comp" x="190" y="112" width="140" height="90"/>
    <path class="dim" d="M350 112 V202"/><text x="358" y="160" class="m">≈ 2B: average q_c or N</text>
    <polygon class="ln" points="120,124 112,114 128,114"/><path class="acc" d="M40 128 H160"/><text x="40" y="146" class="m">water (D_b)</text>
  </svg>
  <figcaption>Figure 1 — Test values are averaged over about 2B below the base.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'SPT methods with groundwater (Teng)', html: String.raw`
<p>Bowles (1977) raised Meyerhof’s values: \(q_{all} = 19.16N_{cor}\left(1 + 0.33\tfrac DB\right)\left(\tfrac{S}{25}\right)\) (B &lt; 1.22 m), \(q_{all} = 11.98\left(\tfrac{3.28B + 1}{3.28B}\right)^2N_{cor}\left(1 + 0.33\tfrac DB\right)\left(\tfrac{S}{25}\right)\) (B &gt; 1.22 m), with \(1 + 0.33D/B \le 1.33\) and S the allowable settlement (mm); \(N_{cor} = N_{field}C_N\), \(C_N = 9.78\sqrt{1/\sigma'_o} \le 2\).</p>
<p>Teng (strip footing, kN/m²): \(q_d = 0.48N^2BR'_w + 0.80(100 + N^2)DR_w\), with \(R_w = 1 - \tfrac{D_a}{2D}\) (\(D_a &lt; D\), water above the base) or 0.5, and \(R'_w = 0.5(1 + D_b/B)\) (\(D_b &lt; B\), water below the base) or 1.</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'SPT design with water above the base', html: String.raw`
<div class="ex">
  <div class="ex-head">A strip footing 3 m wide at D = 2 m in fine sand (\(\gamma = 19\), \(\gamma_{sat} = 21\) kN/m³); water 1 m below the surface; SPT N = 25 at 2 m. Find \(q_{all}\) (F = 3).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Submerged fine sand: \(N' = 15 + \tfrac12(25 - 15) = 20\).</li>
      <li>\(q'_o = 19(1) + (21 - 10)(1) = 30\) kPa = 0.3 kgf/cm²; \(N' = 20\tfrac{3.5}{0.3 + 0.7} = 70 &gt; N\) → keep N = 20.</li>
      <li>\(D_a = 1 &lt; D\): \(R_w = 1 - \tfrac{1}{4} = 0.75\); water above the base → \(R'_w = 0.5\).</li>
      <li>\(q_d = 0.48(20)^2(3)(0.5) + 0.80(100 + 400)(2)(0.75) = 288 + 600 = 888\) kPa.
        <span class="result">q_all = 888/3 = 296 kPa</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Average over the right depth (≈ 2B) — a single test value can mislead.</li>
  <li>Groundwater can halve the capacity of sand: include \(R_w\), \(R'_w\).</li>
  <li>SPT-based charts limit settlement to 25 mm; scale by S/25 if more is acceptable.</li>
</ul>` }
      ]
    }
  ]
});
