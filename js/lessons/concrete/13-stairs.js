/* Lesson 13 — Stair design */
KCE_COURSE.lessons.push({
  id: 'stairs',
  num: 13,
  title: 'Stair Design',
  desc: 'Stair types and dimensions, loads on inclined slabs, transversely and longitudinally spanning stairs, cantilever stairs.',
  icon: '🪜',
  color: 'amber',
  meta: ['ACI 318M-19 Ch.7, 9', 'ASCE 7-22 Table 4.3-1, §4.15', 'Stairs'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>An RC stair is an inclined slab (the <strong>waist</strong>) with steps cast on top. Depending on its supports it spans either <strong>across</strong> the flight (between side walls or stringer beams) or <strong>along</strong> the flight (between landings or floor beams). A third common type is the cantilever stair, where each step projects from a wall or central spine beam.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Riser R</th><td>150 – 190 mm (residential ≤ 190, public ≈ 150 – 170)</td></tr>
    <tr><th>Going (tread) G</th><td>250 – 300 mm; comfort rule \(2R + G \approx 600 – 640\) mm</td></tr>
    <tr><th>Width</th><td>≥ 900 mm (residential), ≥ 1200 – 1500 mm (public)</td></tr>
    <tr><th>Waist t</th><td>longitudinal spans ≈ span/20 – span/25; ≥ 75 mm for transverse spans</td></tr>
    <tr><th>Live load (ASCE 7-22 Table 4.3-1)</th><td>Stairs and exit ways: 4.79 kPa on plan; one- and two-family dwellings only: 1.92 kPa</td></tr>
    <tr><th>Concentrated load (§4.15)</th><td>1.33 kN on 50 × 50 mm of any tread, <em>not</em> acting together with the uniform load</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose geometry (R, G, width) and the structural system.</li>
  <li>Compute loads on <em>plan</em> area: waist \(\gamma t/\cos\alpha\) + steps \(\gamma R/2\) + finishes + live load (ASCE 7-22).</li>
  <li>Check the uniform live load and, separately, the 1.33 kN tread load.</li>
  <li>Analyse the span (horizontal projection).</li>
  <li>Design steel per metre (or per step); distribution steel perpendicular.</li>
  <li>Check shear and detail bars at the kinks.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 240" role="img" aria-label="Stair flight section">
    <path class="conc" d="M60 200 L60 180 L120 180 L120 160 L180 160 L180 140 L240 140 L240 120 L300 120 L300 100 L360 100 L360 80 L420 80 L420 60 L560 60 L560 90 L430 90 L80 220 Z"/>
    <line x1="85" y1="207" x2="430" y2="80" style="stroke:#e0565b;stroke-width:3"/>
    <text x="190" y="190" class="a">waist t</text>
    <line class="dim" x1="240" y1="140" x2="240" y2="120"/><text x="246" y="134" class="m">R</text>
    <line class="dim" x1="240" y1="112" x2="300" y2="112"/><text x="262" y="108" class="m">G</text>
    <text x="470" y="52">landing</text><text x="140" y="232" class="m">cos α = G/√(G² + R²)</text>
    <path class="thin" d="M80 220 A 40 40 0 0 0 118 206"/><text x="124" y="214" class="m">α</text>
  </svg>
  <figcaption>Figure 1 — Longitudinal section of a flight: steps on an inclined waist, main steel along the slope.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Loads on a flight', html: String.raw`
<p>All loads are expressed per square metre of <strong>horizontal projection</strong>:</p>
$$w_{waist} = \frac{\gamma_c t}{\cos\alpha},\qquad w_{steps} = \gamma_c\frac{R}{2},\qquad w_u = 1.2(w_{waist} + w_{steps} + w_{finish}) + 1.6\,LL$$
<p>For a stair spanning transversely each step is a small beam of trapezoidal section; average depth \(h_{avg} = R/2 + t/\cos\alpha\).</p>` },
        { title: 'Structural systems', html: String.raw`
<div class="grid2">
  <div><h4>Transverse span</h4><p>Supported by walls or stringers on both sides; each step spans across the width. One bar per step at the bottom, distribution bars along the waist.</p></div>
  <div><h4>Longitudinal span</h4><p>Flight and landings act as one inclined slab spanning between beams/walls at the ends. Span is the horizontal projection. ACI coefficients do not apply; use statics.</p></div>
</div>
<div class="warn"><p>At a re-entrant kink (where a flight meets a landing on the underside) the tension bars must <strong>not</strong> follow the inside corner — they would push out the cover. Cross the bars and anchor each one with \(\ell_d\) into the compression zone.</p></div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 1: transversely spanning stair', html: String.raw`
<div class="ex">
  <div class="ex-head">Span 1.5 m between walls, R = 160, G = 300, waist 75 mm, LL = 4.79 kPa (ASCE 7-22 stairs), finishes 0.5 kPa, f'c = 24, fy = 420</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\cos\alpha = 300/\sqrt{300^2 + 160^2} = 0.882\); \(h_{avg} = 80 + 75/0.882 = 165\) mm; one step, \(d\) ≈ 139 mm.</li>
      <li>Per step (G = 0.3 m): DL = 0.3(0.165 × 24 + 0.5) ≈ 1.74 kN/m (with finishes on the riser); LL = 0.3 × 4.79 = 1.44 kN/m.</li>
      <li>Uniform load: \(w_u = 1.2(1.74) + 1.6(1.44) = 4.39\) kN/m; \(M_u = 4.39(1.5^2)/8 = 1.23\) kN·m; \(V_u = 3.29\) kN.</li>
      <li>Tread load 1.33 kN at midspan (alone): \(M_u = 1.2(1.74)(1.5^2)/8 + 1.6(1.33)(1.5)/4 = 1.39\) kN·m (governs), \(V_u = 3.69\) kN.</li>
      <li>Minimum steel governs (treated as slab, \(0.0018\,G\,h_{avg}\)): ≈ 89 mm² per step → <strong>1DB12 per step</strong> (\(\phi M_n\) = 5.8 kN·m).</li>
      <li>No stirrups → Table 22.5.5.1(c): \(\rho_w = 113/(300 × 139) = 0.0027\), \(\phi V_c = 0.75(0.66)(0.0027)^{1/3}\sqrt{24}(300)(139)/10^3 = 14.1\) kN ≥ 3.69 ✓; distribution bars φ8 @ 150 along the slope.</li>
    </ol>
  </div>
</div>` },
        { title: 'Example 2: longitudinally spanning dog-leg stair', html: String.raw`
<div class="ex">
  <div class="ex-head">Span 5.25 m (landing 1.125 + flight 3.0 + landing 1.125), width 1.05 m, h = 270 mm (waist), LL = 4.79 kPa (ASCE 7-22 stairs), finishes 2 kPa, f'c = 24, fy = 420</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Flight: waist \(0.27 × 24 = 6.75\) kPa on slope → 6.75/cos α = 7.65 kPa on plan; steps 2.0; finishes 2.0 → DL = 11.65 kPa. Landing: \(6.75 + 2.0 = 8.75\) kPa.</li>
      <li>Combination 2 (1.2D + 1.6L): flight \(w_u\) = 1.2(11.65) + 1.6(4.79) = 21.64 kPa → ×1.05 = 22.73 kN/m; landing 1.2(8.75) + 7.66 = 18.16 → 19.07 kN/m.</li>
      <li>Reactions \(R = [2(19.07)(1.125) + 22.73(3.0)]/2 = 55.5\) kN; \(M_{max}\) at midspan = 76.0 kN·m.</li>
      <li>\(d\) = 244 mm, \(b\) = 1050: \(\rho = 0.00333\), \(A_s = 853\) mm² (≥ 0.0018\(bh\) = 510) → <strong>8DB12</strong> (905 mm², @ 130), \(\phi M_n\) = 80.4 kN·m ✓.</li>
      <li>No stirrups → Table 22.5.5.1(c), \(\lambda_s\) = 1.0 (d &lt; 250): \(\rho_w = 0.00353\), \(\phi V_c = 0.75(0.66)(0.00353)^{1/3}\sqrt{24}(1050)(244)/10^3 = 94.6\) kN ≥ 55.5 kN ✓.</li>
    </ol>
    <div class="note"><p>The original slide used LL = 3 kPa and left the step weight out of the flight load (\(M_{max}\) = 57.5 kN·m). With the step weight and the ASCE 7-22 stair load of 4.79 kPa the moment is 76.0 kN·m and the steel goes from 7DB12 to 8DB12.</p></div>
  </div>
</div>` },
        { title: 'Example 3: cantilever stair', html: String.raw`
<div class="ex">
  <div class="ex-head">Steps cantilevering 1.5 m from a wall, h = 150 (step), rib bw = 100, LL = 4.79 kPa (ASCE 7-22), f'c = 24, fy = 420</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Per step (G = 0.3 m): DL ≈ 1.15 kN/m, LL = 0.3 × 4.79 = 1.44 kN/m.</li>
      <li>Uniform: \(w_u = 1.2(1.15) + 1.6(1.44) = 3.68\) kN/m → \(M_u = 3.68(1.5^2)/2 = 4.14\) kN·m (top tension), \(V_u = 5.52\) kN.</li>
      <li>Tread load 1.33 kN at the tip (alone): \(M_u = 1.2(1.15)(1.5^2)/2 + 1.6(1.33)(1.5) = 4.74\) kN·m — governs.</li>
      <li>\(d\) = 124 mm, \(b_w\) = 100 mm: \(\rho = 0.0090\), \(A_s = 112\) mm² → <strong>2DB10 top</strong> (157 mm²): \(c = 38.1\) mm, \(\varepsilon_t = 0.0068 \ge 0.005\) ✓ tension-controlled, \(\phi M_n = 6.40\) kN·m ✓.</li>
      <li>\(\phi V_c\) (no stirrups) \(= 0.75(0.66)(0.0127)^{1/3}\sqrt{24}(100)(124)/10^3 = 7.0\) kN ≥ 5.52 kN ✓; anchor the top bars into the wall with \(\ell_d\) or a hook.</li>
    </ol>
    <div class="warn"><p>The original 75 mm rib with 2DB10 gives \(\varepsilon_t\) = 0.0043 — not tension-controlled, which ACI 318-19 §9.3.3.1 no longer allows for a beam. Widening the rib to 100 mm fixes it.</p></div>
  </div>
</div>` },
        { title: 'Design checklist', html: String.raw`
<ul class="check">
  <li>2R + G within 600 – 640 mm; constant risers along the flight.</li>
  <li>Loads converted to plan area (waist ÷ cos α, steps R/2); LL = 4.79 kPa (1.92 kPa for one- and two-family dwellings).</li>
  <li>Tread concentrated load 1.33 kN checked separately from the uniform load.</li>
  <li>Span measured on plan; landings included in longitudinal spans.</li>
  <li>Main bars along the span, distribution bars ≥ shrinkage steel.</li>
  <li>Bars at kinks crossed and anchored, not bent around the inside corner.</li>
</ul>` }
      ]
    }
  ]
});
