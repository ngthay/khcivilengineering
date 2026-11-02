/* Lesson 14 — Fixed and continuous beams (Bansal, Ch. 15) */
KCE_COURSE.lessons.push({
  id: 'fixed-beams',
  num: 14,
  title: 'Fixed and Continuous Beams',
  desc: 'Fixed-end moments, slope and deflection of fixed beams, sinking supports and the theorem of three moments.',
  icon: '🔒',
  color: 'peach',
  meta: ['Bansal Ch. 15', 'Indeterminate beams', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>fixed beam</strong> has both ends built in, so the slope there is zero. The supports develop <strong>fixed-end moments</strong> \(M_A\), \(M_B\) that reduce the mid-span moment and the deflection compared with a simply supported beam. A <strong>continuous beam</strong> runs over more than two supports.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Load</th><th>\(M_A\)</th><th>\(M_B\)</th><th>Max deflection</th></tr></thead>
  <tbody>
    <tr><td>\(W\) at centre</td><td>\(WL/8\)</td><td>\(WL/8\)</td><td>\(WL^3/(192EI)\)</td></tr>
    <tr><td>\(W\) at \(a\) from A</td><td>\(Wab^2/L^2\)</td><td>\(Wa^2b/L^2\)</td><td>Under load: \(\dfrac{Wa^3b^3}{3EIL^3}\)</td></tr>
    <tr><td>UDL \(w\)</td><td>\(wL^2/12\)</td><td>\(wL^2/12\)</td><td>\(wL^4/(384EI)\)</td></tr>
    <tr><td>Support B sinks by \(\delta\)</td><td>\(6EI\delta/L^2\)</td><td>\(6EI\delta/L^2\)</td><td>—</td></tr>
  </tbody>
</table>
<p>Fixing the ends reduces the UDL deflection to one-fifth of the simply supported value.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Draw the free (simply supported) BMD from the loads.</li>
  <li>Draw the fixed-end-moment BMD (a trapezium).</li>
  <li>Equate the areas of the two diagrams (zero change of slope end to end) and equate their first moments (zero deflection end to end) → \(M_A\), \(M_B\).</li>
  <li>Combine the diagrams; find reactions and points of contraflexure.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 600 220" role="img" aria-label="Fixed beam with UDL: BMD">
    <path class="thin" d="M60 20 V90 M540 20 V90"/>
    <path class="ln" d="M60 55 H540"/>
    <path class="thin" d="M60 35 H540"/><g class="thin"><path d="M90 35 v18 M150 35 v18 M210 35 v18 M270 35 v18 M330 35 v18 M390 35 v18 M450 35 v18 M510 35 v18"/></g>
    <text x="280" y="28">w</text>
    <path class="thin" d="M60 150 H540"/>
    <path class="acc" d="M60 110 Q 300 230 540 110"/><path class="dim" d="M60 110 V150 M540 110 V150"/>
    <text x="10" y="118">−wL²/12</text><text x="270" y="196">+wL²/24</text>
    <circle class="accf" cx="161" cy="150" r="3"/><circle class="accf" cx="439" cy="150" r="3"/><text x="150" y="168" class="m">0.211L</text>
  </svg>
  <figcaption>Figure 1 — Fixed beam with UDL: end moments −wL²/12, mid-span +wL²/24, contraflexure at 0.211L from each end.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Theorem of three moments (Clapeyron)', html: String.raw`
<p>For two adjacent spans \(L_1\) and \(L_2\) of a continuous beam with constant \(EI\):</p>
$$M_AL_1 + 2M_B(L_1 + L_2) + M_CL_2 = -\frac{6a_1\bar x_1}{L_1} - \frac{6a_2\bar x_2}{L_2}$$
<p>\(a_1\), \(a_2\) = areas of the free BMDs on spans 1 and 2; \(\bar x_1\) from A, \(\bar x_2\) from C. For UDLs the right side becomes \(-\tfrac14(w_1L_1^3 + w_2L_2^3)\).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Problem 15.2 — eccentric point load', html: String.raw`
<div class="ex">
  <div class="ex-head">Fixed beam 3 m, 45 kN at 2 m from A, EI = 1×10⁴ kN·m².</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(M_A = Wab^2/L^2 = 45(2)(1)^2/9 = 10\) kN·m; \(M_B = Wa^2b/L^2 = 45(4)(1)/9 = 20\) kN·m.</li>
      <li>Deflection under the load: \(\dfrac{Wa^3b^3}{3EIL^3} = \dfrac{45(8)(1)}{3(10^4)(27)} = 0.444\) mm.</li>
      <li>Maximum deflection at \(x = \dfrac{2aL}{b + 3a} = 1.714\) m: \(\dfrac{2Wa^3b^2}{3EI(b + 3a)^2} = 0.490\) mm.
        <span class="result">MA = 10 kN·m, MB = 20 kN·m, y = 0.444 mm, ymax = 0.49 mm at 1.714 m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problems 15.4 and 15.5 — symmetric loads', html: String.raw`
<div class="ex">
  <div class="ex-head">(a) Fixed beam 6 m with 30 kN at 2 m from each end. (b) Fixed beam 5 m, UDL 9 kN/m, EI = 4.5×10³ kN·m².</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) \(M_A = \dfrac{30(2)(4)^2}{36} + \dfrac{30(4)(2)^2}{36} = 26.67 + 13.33 = 40\) kN·m = \(M_B\). Free BM under the loads = 60 kN·m, so the mid-span BM = 60 − 40 = 20 kN·m.</li>
      <li>(b) \(M_A = M_B = wL^2/12 = 9(25)/12 = 18.75\) kN·m; \(y_c = \dfrac{wL^4}{384EI} = \dfrac{9(625)}{384(4500)} = 3.26\) mm.
        <span class="result">(a) 40 kN·m at ends; (b) 18.75 kN·m, yc = 3.26 mm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 15.6 — UDL on half the span', html: String.raw`
<div class="ex">
  <div class="ex-head">Fixed beam 6 m, UDL 4 kN/m over the left half. Find the fixing moments and reactions.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Area equation: \(3(M_A + M_B) = 36\) → \(M_A + M_B = 12\).</li>
      <li>Moment equation about A: \(6(M_A + 2M_B) = 94.5\) → \(M_A + 2M_B = 15.75\).</li>
      <li>\(M_B = 3.75\) kN·m; \(M_A = 8.25\) kN·m.</li>
      <li>\(6R_B + 8.25 = 4(3)(1.5) + 3.75\) → \(R_B = 2.25\) kN; \(R_A = 12 - 2.25 = 9.75\) kN.
        <span class="result">MA = 8.25, MB = 3.75 kN·m; RA = 9.75, RB = 2.25 kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>The larger fixed-end moment is at the end nearer the load.</li>
  <li>Check: fixed-end moment diagram area = free BMD area.</li>
  <li>Reactions include the effect of unequal end moments \((M_B - M_A)/L\).</li>
</ul>` }
      ]
    }
  ]
});
