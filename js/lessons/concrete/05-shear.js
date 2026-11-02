/* Lesson 5 — Shear and diagonal tension */
KCE_COURSE.lessons.push({
  id: 'shear',
  num: 5,
  title: 'Shear and Diagonal Tension',
  desc: 'Diagonal cracking, concrete shear strength Vc, stirrup design zones, spacing limits and shear at d from the support.',
  icon: '✂️',
  color: 'pink',
  meta: ['ACI 318M-19 §9.6.3, 9.7.6, 22.5', 'Beams', 'Shear'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Shear in a beam produces principal tensile stresses inclined at about 45°. When they exceed the tensile strength of concrete, <strong>diagonal cracks</strong> form. Shear failure is sudden and brittle, so beams are designed to fail in flexure first: web reinforcement (<strong>stirrups</strong>) crosses the cracks and carries the shear the concrete cannot.</p>` },
        { title: 'Description', html: String.raw`
<p>Nominal shear strength is the sum of the concrete and steel contributions:</p>
$$V_u \le \phi V_n = \phi(V_c + V_s),\qquad \phi = 0.75$$
<p>Shear failure modes: <em>diagonal tension</em> (most common), <em>shear compression</em> (concrete crushing above the crack) and, in short deep beams, arch action failure.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Draw the factored shear diagram; take the critical \(V_u\) at distance \(d\) from the support face.</li>
  <li>Check the section size: \(V_u \le \phi(V_c + 0.66\sqrt{f'_c}\,b_wd)\) (§22.5.1.2).</li>
  <li>Classify the zone: no stirrups / minimum stirrups / designed stirrups (§9.6.3.1).</li>
  <li>Compute \(V_s = V_u/\phi - V_c\) and the spacing \(s = A_v f_{yt} d/V_s\).</li>
  <li>Apply maximum spacing along and across the beam (Table 9.7.6.2.2) and \(A_{v,min}\) (Table 9.6.3.4).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 220" role="img" aria-label="Beam with diagonal crack and stirrups">
    <rect class="conc" x="30" y="40" width="580" height="110"/>
    <g class="thin" style="stroke:#e0565b">
      <line x1="80" y1="45" x2="80" y2="145"/><line x1="120" y1="45" x2="120" y2="145"/><line x1="160" y1="45" x2="160" y2="145"/>
      <line x1="200" y1="45" x2="200" y2="145"/><line x1="240" y1="45" x2="240" y2="145"/><line x1="300" y1="45" x2="300" y2="145"/>
      <line x1="360" y1="45" x2="360" y2="145"/>
    </g>
    <line x1="30" y1="138" x2="610" y2="138" style="stroke:#e0565b;stroke-width:3"/>
    <path class="acc" d="M95 150 L140 120 L175 95 L215 60" style="stroke-dasharray:6 4"/>
    <text x="220" y="60" class="a">diagonal crack</text>
    <polygon class="ln" points="40,150 30,170 50,170"/><circle class="ln" cx="600" cy="160" r="9"/>
    <text x="260" y="190" class="m">stirrups closer near the support, where shear is high</text>
    <text x="370" y="110" class="m">Av at spacing s</text>
  </svg>
  <figcaption>Figure 1 — Stirrups crossing a diagonal (inclined) crack near the support.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Concrete shear strength Vc', html: String.raw`
<p>ACI 318-19 Table 22.5.5.1 gives \(V_c\) for nonprestressed members. Which equation applies depends on whether at least the minimum shear reinforcement is provided:</p>
<table class="tbl">
  <thead><tr><th>Case</th><th>\(V_c\)</th></tr></thead>
  <tbody>
    <tr><td rowspan="2">\(A_v \ge A_{v,min}\) — either of</td><td>(a) \(\left[0.17\lambda\sqrt{f'_c} + \dfrac{N_u}{6A_g}\right]b_wd\)</td></tr>
    <tr><td>(b) \(\left[0.66\lambda\,\rho_w^{1/3}\sqrt{f'_c} + \dfrac{N_u}{6A_g}\right]b_wd\)</td></tr>
    <tr><td>\(A_v < A_{v,min}\)</td><td>(c) \(\left[0.66\lambda_s\lambda\,\rho_w^{1/3}\sqrt{f'_c} + \dfrac{N_u}{6A_g}\right]b_wd\)</td></tr>
  </tbody>
</table>
$$\lambda_s = \sqrt{\frac{2}{1 + 0.004d}} \le 1.0,\qquad \rho_w = \frac{A_s}{b_wd},\qquad V_c \le 0.42\lambda\sqrt{f'_c}\,b_wd$$
<p>\(N_u\) is positive in compression; \(N_u/6A_g \le 0.05f'_c\). The <strong>size-effect factor</strong> \(\lambda_s\) reduces the strength of deep members without stirrups (\(\lambda_s < 1\) when \(d > 250\) mm), and the \(\rho_w^{1/3}\) term makes lightly reinforced members weaker. Beams with stirrups normally use (a), the familiar \(0.17\sqrt{f'_c}\,b_wd\).</p>
<div class="note"><p><strong>Change from ACI 318-08:</strong> the old \(V_c = 0.17\sqrt{f'_c}b_wd\) applied to all members. Now it applies only when \(A_v \ge A_{v,min}\). Slabs and footings without stirrups use equation (c) — see lessons 11, 12 and 14.</p></div>` },
        { title: 'Stirrup strength and limits', html: String.raw`
$$V_s = \frac{A_v f_{yt} d}{s}\ \ (\text{vertical stirrups}),\qquad s = \frac{A_v f_{yt} d}{V_s}$$
<table class="tbl">
  <thead><tr><th>Zone (beams)</th><th>Requirement</th></tr></thead>
  <tbody>
    <tr><td>\(V_u \le \phi\,0.083\lambda\sqrt{f'_c}\,b_wd\)</td><td>No stirrups required (§9.6.3.1)</td></tr>
    <tr><td>\(\phi\,0.083\lambda\sqrt{f'_c}\,b_wd < V_u \le \phi V_c\)</td><td>Minimum stirrups \(A_{v,min}/s = \max(0.062\sqrt{f'_c},\,0.35)\,b_w/f_{yt}\) (Table 9.6.3.4)</td></tr>
    <tr><td>\(V_u > \phi V_c\)</td><td>Design stirrups: \(V_s = V_u/\phi - V_c\)</td></tr>
    <tr><td>\(V_u > \phi(V_c + 0.66\sqrt{f'_c}\,b_wd)\)</td><td><strong>Not permitted</strong> — enlarge the section (§22.5.1.2)</td></tr>
  </tbody>
</table>
<p>Exceptions to the minimum-stirrup rule (Table 9.6.3.1): shallow beams with \(h \le 250\) mm, and beams integral with a slab with \(h \le\) greater of \(2.5t_f\) and \(0.5b_w\) and \(h \le 600\) mm — these need \(A_{v,min}\) only where \(V_u > \phi V_c\).</p>
<table class="tbl">
  <thead><tr><th>Required \(V_s\) (Table 9.7.6.2.2)</th><th>Max. spacing along the beam</th><th>Max. spacing of legs across the width</th></tr></thead>
  <tbody>
    <tr><td>\(V_s \le 0.33\sqrt{f'_c}\,b_wd\)</td><td>lesser of \(d/2\) and 600 mm</td><td>lesser of \(d\) and 600 mm</td></tr>
    <tr><td>\(V_s > 0.33\sqrt{f'_c}\,b_wd\)</td><td>lesser of \(d/4\) and 300 mm</td><td>lesser of \(d/2\) and 300 mm</td></tr>
  </tbody>
</table>
<p>Design yield of stirrups is limited to \(f_{yt} \le 420\) MPa (Table 20.2.2.4(a)).</p>` },
        { title: 'Critical section', html: String.raw`
<p>When the support reaction introduces compression into the end of the member and no concentrated load acts within \(d\) of the face, sections closer than \(d\) may be designed for \(V_u\) at \(d\) (ACI §9.4.3.2). Otherwise (beam hung from a girder, load near support) use the shear at the face.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 1: classifying shear', html: String.raw`
<div class="ex">
  <div class="ex-head">b = 300, d = 546, f'c = 27, fy = 410, DB10 two-leg stirrups (Av = 157 mm²)</div>
  <div class="ex-body">
    <p>With stirrups, \(V_c = 0.17\sqrt{27}(300)(546)/10^3 = 144.7\) kN; \(\phi V_c = 108.5\) kN. No-stirrup threshold \(\phi\,0.083\sqrt{27}(300)(546)/10^3 = 53.0\) kN. Limits: \(0.33\sqrt{f'_c}b_wd = 280.9\) kN; section limit \(\phi(V_c + 0.66\sqrt{f'_c}b_wd) = 0.75(144.7 + 561.7) = 529.8\) kN.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>\(V_u\) (kN)</th><th>\(V_s\) (kN)</th><th>Result</th></tr></thead>
      <tbody>
        <tr><td>53</td><td>—</td><td>53 > 53.0 (just) → minimum stirrups. Under ACI 318-08 (\(0.5\phi V_c\) = 54.3) none were needed.</td></tr>
        <tr><td>110</td><td>2.0</td><td>Minimum governs: \(s \le A_vf_{yt}/(0.35b_w) = 613\), \(d/2 = 273\) → DB10 @ 250</td></tr>
        <tr><td>270</td><td>215.3</td><td>\(s = 157(410)(546)/215\,300 = 163\) → DB10 @ 160</td></tr>
        <tr><td>387</td><td>371.3 > 280.9</td><td>\(s = 94.7\), \(d/4 = 136\) → DB10 @ 90</td></tr>
        <tr><td>645</td><td>—</td><td class="ng">645 > 529.8 → section too small, enlarge</td></tr>
      </tbody>
    </table></div>
    <p>Two-leg stirrups in a 300 mm web: leg spacing across the width ≈ 220 mm ≤ \(d\) ✓.</p>
  </div>
</div>` },
        { title: 'Example 2: point load', html: String.raw`
<div class="ex">
  <div class="ex-head">b = 300, d = 637.5, f'c = 25, fyt = 420, Vu = 200 kN, DB10 two legs</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(V_c = 0.17(5)(300)(637.5)/10^3 = 162.6\) kN, \(\phi V_c = 121.9\) kN < \(V_u\) → stirrups needed.</li>
      <li>\(V_s = 200/0.75 - 162.6 = 104.1\) kN; \(s = 157(420)(637.5)/104\,100 = 404\) mm.</li>
      <li>Limits: \(V_s\) < \(0.33\sqrt{f'_c}b_wd\) → \(d/2 = 318\) mm, 600 mm; \(A_{v,min}\) → \(s \le 157(420)/(0.35 × 300) = 628\) mm.
        <span class="result">DB10 stirrups @ 300 mm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 3: uniformly loaded beam', html: String.raw`
<div class="ex">
  <div class="ex-head">Span 7 m c/c, supports 0.3 m wide, wD = 40 kN/m, wL = 25 kN/m, b = 300, h = 600, d = 542, f'c = 28, 8 mm two-leg stirrups (fyt = 420)</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(w_u = 1.2(40) + 1.6(25) = 88\) kN/m. Shear at face: \(88(3.5 - 0.15) = 294.8\) kN; at \(d\) from face: \(V_u = 88(3.5 - 0.15 - 0.542) = 247.1\) kN.</li>
      <li>\(V_c = 0.17\sqrt{28}(300)(542)/10^3 = 146.3\) kN, \(\phi V_c = 109.7\) kN.</li>
      <li>\(V_s = 247.1/0.75 - 146.3 = 183.2\) kN; with \(A_v\) = 100.5 mm², \(f_{yt}\) = 420 MPa: \(s = 100.5(420)(542)/183\,200 = 125\) mm → <strong>@ 120 mm</strong>. Check \(V_s \le 0.33\sqrt{f'_c}b_wd = 284\) kN → \(s_{max} = d/2 = 271\) mm ✓.</li>
      <li>This spacing is kept up to where \(V_u = \phi V_c\): 2.25 m from the support centreline.</li>
      <li>\(V_u = \phi V_c\) at 1.247 m from midspan. Minimum stirrups are required down to \(V_u = \phi\,0.083\sqrt{28}(300)(542)/10^3 = 53.6\) kN, i.e. to 0.61 m from midspan; \(s \le d/2 = 271\) → <strong>@ 250 mm</strong>. Only the central 1.2 m needs no stirrups; in practice continue φ8 @ 250 across it.
        <span class="result">φ8 @ 120 mm (end zones, 2.25 m) — φ8 @ 250 mm (middle)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Deep beams and checklist', html: String.raw`
<div class="warn"><p>Members with clear span \(\ell_n \le 4h\), or with a concentrated load within \(2h\) of the support, are <strong>deep beams</strong> (ACI 318-19 §9.9). Older lecture notes give special \(V_c\) formulas (ACI 318-99 §11.8). ACI 318-19 designs them with the <strong>strut-and-tie method</strong> (Chapter 23), limits \(V_u \le \phi\,0.83\sqrt{f'_c}\,b_wd\) (§9.9.2.1), and requires distributed web steel of at least \(0.0025b_ws\) in both directions (§9.9.3.1).</p></div>
<ul class="check">
  <li>Shear diagram from factored loads; critical section at \(d\) where allowed.</li>
  <li>\(V_u \le \phi(V_c + 0.66\sqrt{f'_c}b_wd)\), else enlarge the section.</li>
  <li>Stirrups wherever \(V_u > \phi\,0.083\lambda\sqrt{f'_c}b_wd\) (unless a Table 9.6.3.1 exception applies).</li>
  <li>Spacing along: \(d/2\) / 600 (or \(d/4\) / 300 for high shear); across: \(d\) / 600 (or \(d/2\) / 300); and \(A_{v,min}\).</li>
  <li>Round spacing down to 10 or 25 mm and use few distinct spacings.</li>
</ul>` }
      ]
    }
  ]
});
