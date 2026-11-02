/* Lesson 8 — Axially loaded columns */
KCE_COURSE.lessons.push({
  id: 'axial-columns',
  num: 8,
  title: 'Axially Loaded Columns',
  desc: 'Tied and spiral short columns under concentric load: capacity, steel limits, ties and spiral design.',
  icon: '🏛️',
  color: 'violet',
  meta: ['ACI 318M-19 Ch.10, §22.4, 25.7', 'Columns', 'Axial'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Columns carry floor loads down to the foundations. A <strong>short column</strong> fails by material crushing; its slenderness does not reduce strength. This lesson covers short columns under (nearly) concentric load, which is the starting point for combined bending (lesson 9) and slender columns (lesson 10).</p>` },
        { title: 'Description', html: String.raw`
<div class="grid2">
  <div><h4>Tied columns</h4><p>Longitudinal bars held by lateral ties at spacing \(s\). Failure is sudden after the cover spalls. \(\phi\) = 0.65, minimum 4 bars (rectangular).</p></div>
  <div><h4>Spiral columns</h4><p>A continuous helix confines the core, giving a ductile failure with large deformation. \(\phi\) = 0.75, minimum 6 bars.</p></div>
</div>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Factored axial load \(P_u\).</li>
  <li>Assume \(\rho_g\) (1 – 3 %) and compute the required \(A_g\).</li>
  <li>Choose dimensions, compute \(A_{st}\), select bars.</li>
  <li>Design ties or spiral.</li>
  <li>Check \(\phi P_{n,max} \ge P_u\) and detailing limits.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 220" role="img" aria-label="Tied and spiral column sections">
    <rect class="conc" x="60" y="30" width="160" height="160"/>
    <rect class="thin" x="78" y="48" width="124" height="124" style="stroke:#e0565b;stroke-width:2"/>
    <circle class="bar" cx="88" cy="58" r="8"/><circle class="bar" cx="192" cy="58" r="8"/><circle class="bar" cx="88" cy="162" r="8"/><circle class="bar" cx="192" cy="162" r="8"/>
    <circle class="bar" cx="140" cy="58" r="8"/><circle class="bar" cx="140" cy="162" r="8"/>
    <text x="110" y="212" class="a">Tied (φ = 0.65)</text>
    <circle class="conc" cx="440" cy="110" r="85"/>
    <circle class="bar-o" cx="440" cy="110" r="68"/>
    <g class="bar">
      <circle cx="440" cy="52" r="8"/><circle cx="490" cy="81" r="8"/><circle cx="490" cy="139" r="8"/>
      <circle cx="440" cy="168" r="8"/><circle cx="390" cy="139" r="8"/><circle cx="390" cy="81" r="8"/>
    </g>
    <line class="dim" x1="372" y1="110" x2="508" y2="110"/><text x="430" y="104" class="m">Dc</text>
    <text x="390" y="212" class="a">Spiral (φ = 0.75)</text>
  </svg>
  <figcaption>Figure 1 — Tied column (min. 4 bars) and spiral column (min. 6 bars) with core diameter Dc.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Axial strength', html: String.raw`
$$P_0 = 0.85f'_c(A_g - A_{st}) + f_yA_{st}$$
<p>Nominal strength (ACI 318-19 Eq. 22.4.2.2) with \(f_y \le 550\) MPa: \(P_0 = 0.85f'_c(A_g - A_{st}) + f_yA_{st}\). Because a small accidental eccentricity is always present, Table 22.4.2.1 caps it at \(P_{n,max}\):</p>
$$\text{Tied: }\ \phi P_{n,max} = 0.80\,\phi P_0,\ \phi = 0.65\qquad \text{Spiral: }\ \phi P_{n,max} = 0.85\,\phi P_0,\ \phi = 0.75$$
<p>For design, with \(A_{st} = \rho_g A_g\):</p>
$$A_{g,req} = \frac{P_u}{0.80\phi[0.85f'_c(1 - \rho_g) + f_y\rho_g]}\quad(\text{tied})$$
<div data-widget="column-axial" data-title="Short column capacity"></div>` },
        { title: 'Detailing limits', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Steel ratio (§10.6.1.1)</th><td>\(0.01 \le \rho_g \le 0.08\) (practical ≤ 0.04 because of lap splices)</td></tr>
    <tr><th>Clear bar spacing (§25.2.3)</th><td>≥ max(1.5\(d_b\), 40 mm, \(\tfrac43 d_{agg}\)); clear distance ≤ 150 mm between laterally supported bars (§25.7.2.3)</td></tr>
    <tr><th>Tie size (§25.7.2.2)</th><td>No. 10 (DB10) for bars ≤ No. 32; No. 13 (DB12) for No. 36 and larger and bundles</td></tr>
    <tr><th>Tie spacing (§25.7.2.1)</th><td>\(s \le \min(16d_b,\ 48d_{tie},\ \text{least dimension})\)</td></tr>
    <tr><th>Spiral (§25.7.3)</th><td>\(\rho_s \ge 0.45\left(\dfrac{A_g}{A_{ch}} - 1\right)\dfrac{f'_c}{f_{yt}}\) with \(f_{yt} \le 690\) MPa; clear pitch 25 – 75 mm; bar ≥ 9.5 mm; 1½ extra turns at each end</td></tr>
  </tbody>
</table>
<p>Spiral ratio from geometry: \(\rho_s = \dfrac{4a_s(D_c - d_s)}{D_c^2\,s}\) → \(s = \dfrac{4a_s(D_c - d_s)}{D_c^2\,\rho_s}\).</p>` }
    ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 1: capacity of a tied column', html: String.raw`
<div class="ex">
  <div class="ex-head">250 × 400 mm, 6φ16 (As = 1206 mm²), f'c = 28, fy = 420</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\rho_g = 1206/100\,000 = 1.21\,\%\) ✓ (1 – 8 %). Clear spacing on long face ≈ 128 mm < 150 mm ✓.</li>
      <li>Ties φ8: \(s \le \min(16 × 16,\ 48 × 8,\ 250) = 250\) mm → φ8 @ 250.</li>
      <li>\(P_0 = [0.85(28)(100\,000 - 1206) + 420(1206)]/10^3 = 2858\) kN.
        <span class="result">\(\phi P_{n,max} = 0.80(0.65)(2858) = 1486\) kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 2: design a tied column', html: String.raw`
<div class="ex">
  <div class="ex-head">Pu = 1000 kN, one side b = 250 mm, f'c = 30, fy = 420, assume ρg = 1 %</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(A_g = \frac{1000×10^3}{0.8(0.65)[0.85(30)(0.99) + 420(0.01)]} = 65\,311\) mm² → h = 261 → <strong>250 × 300 mm</strong> (\(A_g\) = 75 000, more than required).</li>
      <li>\(A_{st} = 0.01(75\,000) = 750\) mm² → <strong>4DB16</strong> (804 mm²).</li>
      <li>Ties DB10: \(s \le \min(256,\ 480,\ 250)\) → DB10 @ 250.</li>
      <li>\(\phi P_{n,max} = 0.52[0.85(30)(75\,000 - 804) + 420(804)]/10^3\)
        <span class="result">\(\phi P_{n,max} = 1159\) kN ≥ 1000 kN → OK</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 3: square tied column', html: String.raw`
<div class="ex">
  <div class="ex-head">300 × 300 mm, 4DB28, ties DB10 @ 300, f'c = 28, fy = 400</div>
  <div class="ex-body">
    <p>\(A_{st} = 2463\) mm², \(\rho_g = 2.74\,\%\). Ties: \(s \le \min(448,\ 480,\ 300) = 300\) ✓.</p>
    <span class="result">\(\phi P_{n,max} = 0.52[0.85(28)(87\,537) + 400(2463)]/10^3 = 1595.7\) kN</span>
  </div>
</div>` },
        { title: 'Example 4: design a spiral column', html: String.raw`
<div class="ex">
  <div class="ex-head">PD = 2225 kN, PL = 890 kN, f'c = 28, fy = 400, assume ρg = 3 %, cover 40 mm</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(P_u = 1.2(2225) + 1.6(890) = 4094\) kN.</li>
      <li>\(A_g = \frac{4094×10^3}{0.85(0.75)[0.85(28)(0.97) + 400(0.03)]} = 183\,035\) mm² → D = 483 → <strong>D = 500 mm</strong>.</li>
      <li>With D = 500 mm (\(A_g\) = 196 350 mm²) solve for the steel: \(\frac{4094×10^3}{0.85(0.75)} = 0.85(28)(196\,350 - A_{st}) + 400A_{st}\) → \(A_{st} = 4650\) mm² → <strong>8DB28</strong> (4926 mm², \(\rho_g\) = 2.5 %).</li>
      <li>Core \(D_c = 500 - 2(40) = 420\) mm; \(\rho_{s,min} = 0.45\left(\frac{196\,350}{138\,544} - 1\right)\frac{28}{400} = 0.01314\).</li>
      <li>DB10 spiral: \(s = \frac{4(78.5)(420 - 10)}{420^2(0.01314)} = 55\) mm (clear 45 mm, within 25 – 75) ✓.
        <span class="result">D = 500, 8DB28, DB10 spiral @ 55 mm pitch</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>\(1\,\% \le \rho_g \le 8\,\%\); at least 4 (tied) or 6 (spiral) bars.</li>
  <li>Tie spacing ≤ 16\(d_b\), 48\(d_{tie}\), least dimension; every corner and alternate bar tied.</li>
  <li>Spiral: \(\rho_s \ge \rho_{s,min}\), clear pitch 25 – 75 mm.</li>
  <li>Moments present? → use the interaction diagram (lesson 9). Slender? → lesson 10.</li>
</ul>` }
      ]
    }
  ]
});
