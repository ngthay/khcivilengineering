/* Lesson 5 — Beams: bending moment capacity (Handbook Ch. 5 §5.1–5.7) */
KCE_COURSE.lessons.push({
  id: 'beam-bending',
  num: 5,
  title: 'Beams: Section and Member Moment Capacity',
  desc: 'Flexural behaviour, section slenderness and effective modulus, lateral-torsional buckling, beam segments and restraints, effective length factors, moment modification factor and the full design procedure.',
  icon: '➖',
  color: 'rose',
  meta: ['Ch. 5', 'M_b = α_m α_s M_s', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A steel beam can fail by yielding of its cross-section (<strong>section capacity</strong> \(M_s\)) or, if its compression flange is not restrained, by twisting sideways — <strong>lateral-torsional buckling</strong> — at a lower <strong>member capacity</strong> \(M_b\). Restraints at the supports and along the span are therefore as important as the section size.</p>` },
        { title: 'Description', html: String.raw`
$$M_s = f_yZ_e,\qquad M_b = \alpha_m\alpha_sM_s \le M_s$$
$$\alpha_s = 0.6\left[\sqrt{\left(\frac{M_s}{M_o}\right)^2 + 3} - \frac{M_s}{M_o}\right],\qquad M_o = \sqrt{\frac{\pi^2EI_y}{l_e^2}\left(GJ + \frac{\pi^2EI_w}{l_e^2}\right)}$$
<p>\(Z_e\) = effective section modulus: compact sections \(Z_e = S \le 1.5Z\); non-compact and slender sections are reduced according to the plate element slenderness \(\lambda_e = \dfrac bt\sqrt{f_y/250}\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find \(M^*\), \(V^*\) and the moment diagram; locate the restraints (F full, P partial, L lateral, U unrestrained) to define the segments.</li>
  <li>\(l_e = k_tk_lk_rl\): twist factor \(k_t\), load-height factor \(k_l\) (1.4 for loads on the top flange of a segment with P or F ends), rotation factor \(k_r\).</li>
  <li>\(\alpha_m\) from the moment shape, e.g. \(\alpha_m = \dfrac{1.7M_m^*}{\sqrt{M_2^{*2} + M_3^{*2} + M_4^{*2}}} \le 2.5\) (quarter-point moments).</li>
  <li>Compute \(M_s\), \(M_o\), \(\alpha_s\), \(M_b\) and check \(M^* \le \varphi M_b\) with φ = 0.9; check deflection.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Lateral-torsional buckling">
    <path class="ln" d="M60 110 H460"/><path class="acc" d="M60 110 Q 260 60 460 110"/>
    <polygon class="ln" points="60,110 50,128 70,128"/><polygon class="ln" points="460,110 450,128 470,128"/>
    <text x="220" y="70" class="a">compression flange buckles sideways</text>
    <g transform="translate(260 170)"><path class="ln" d="M-30 -30 H30 M0 -30 V30 M-30 30 H30"/><path class="acc" d="M-20 -40 H40 M10 -40 L-10 40 M-40 40 H20"/></g>
    <text x="320" y="176" class="m">section twists and moves laterally</text>
  </svg>
  <figcaption>Figure 1 — Lateral-torsional buckling of an unrestrained beam.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Restraints and segments', html: String.raw`
<ul>
  <li><strong>Full (F):</strong> prevents lateral movement of the critical flange and twist of the section (e.g. web stiffener with bolted cleat). <strong>Partial (P):</strong> prevents lateral movement of some point other than the critical flange, twist partly prevented (e.g. bottom flange bolted to a support). <strong>Lateral (L):</strong> prevents lateral movement only.</li>
  <li>Effective length factor \(k_t = 1 + \dfrac{2d_1}{l}\left(\dfrac{t_f}{2t_w}\right)^3\) for PP ends; 1.0 for FF.</li>
  <li>Full lateral restraint (no LTB) when the segment length is short enough, e.g. \(l/r_y \le (80 + 50\beta_m)\sqrt{250/f_y}\), or when a slab is fixed to the compression flange.</li>
</ul>
<div data-widget="steel-beam" data-title="Member moment capacity — AS 4100 §5.6.1"></div>
<p><em>Defaults: Example 5.1 below (900WB218 Grade 400, l_e = 13.9 m, α_m = 1.35).</em></p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Example 5.1 — 8 m girder, top-flange loads', html: String.raw`
<div class="ex">
  <div class="ex-head">The 8 m simply supported beam of Lesson 3 (\(M^* = 806\) kN·m, loads on the top flange, bottom flange bolted at the ends, no intermediate restraint). Check a 900WB218 Grade 400 (\(f_{yf} = 360\) MPa, \(Z_{ex} = 9.84\times10^6\) mm³, \(I_y = 179\times10^6\) mm⁴, \(J = 4020\times10^3\) mm⁴, \(I_w = 35.0\times10^{12}\) mm⁶).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Quarter-point moments \(M_2^* = M_4^* = 437\), \(M_3^* = M_m^* = 806\) kN·m: \(\alpha_m = \dfrac{1.7(806)}{\sqrt{437^2 + 806^2 + 437^2}} = 1.35\).</li>
      <li>\(k_t = 1 + \tfrac{2(860)}{8000}\left(\tfrac{0.5(25)}{12}\right)^3 = 1.24\); \(l_e = 1.24(1.4)(1.0)(8000) = 13\,900\) mm.</li>
      <li>\(M_o = \sqrt{1.83\times10^6\,(322\times10^9 + 358\times10^9)} = 1120\) kN·m; \(M_s = 360(9.84\times10^6) = 3540\) kN·m.</li>
      <li>\(\alpha_s = 0.6\left[\sqrt{(3540/1120)^2 + 3} - 3540/1120\right] = 0.266\).</li>
      <li>\(\varphi M_b = 0.9(1.35)(0.266)(3540) = 1140\) kN·m \(\ge 806\) ✓ (71 %).</li>
      <li>With one restraint at mid-span each 4 m segment has quarter-point moments 227, 437 and 630 kN·m: \(\alpha_m = 1.71\), \(l_e = 6940\) mm — a lighter 700WB115 Grade 400 then suffices.
        <span class="result">900WB218 OK at 71 %; a mid-span restraint allows 700WB115</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Loads on the top flange of an unrestrained beam are destabilising: \(k_l = 1.4\).</li>
  <li>Adding a restraint is often cheaper than a heavier section.</li>
  <li>Check section slenderness first — non-compact sections have \(Z_e &lt; S\).</li>
</ul>` }
      ]
    }
  ]
});
