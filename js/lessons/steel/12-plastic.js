/* Lesson 12 — Plastic design (Handbook Ch. 9) */
KCE_COURSE.lessons.push({
  id: 'plastic',
  num: 12,
  title: 'Plastic Design',
  desc: 'Plastic hinges and the plastic moment, collapse mechanisms, plastic analysis of beams and portal frames, member requirements for plastic design, beam-columns, deflections and comparison with elastic design.',
  icon: '🔥',
  color: 'rose',
  meta: ['Ch. 9', 'M_p = f_yS', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Because steel is ductile, a cross-section can yield completely and keep rotating at a constant moment — a <strong>plastic hinge</strong>. An indeterminate structure keeps carrying load after the first hinge forms, until enough hinges create a <strong>mechanism</strong>. Plastic design uses this reserve, giving lighter and simpler continuous beams and portal frames.</p>` },
        { title: 'Description', html: String.raw`
$$M_p = f_yS,\qquad \text{fixed-ended beam, UDL: } w_{u}\frac{L^2}{8} = 2M_p \Rightarrow M_p = \frac{w^*L^2}{16}$$
<p>The plastic analysis equalises the hogging and sagging moments: draw the free (simply supported) moment diagram, then move the closing line until the support and span moments are equal.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Check the section is compact (plastic hinges must rotate without local buckling) and Grade ≤ 450 MPa.</li>
  <li>Find the collapse mechanism (beam, sway, combined) by virtual work or by the static method; get the required \(M_p\).</li>
  <li>Choose a section with \(\varphi M_s \ge M^*\) at the hinges; restrain hinge regions so no lateral-torsional buckling occurs.</li>
  <li>Check shear at the hinges (\(V^* \le 0.6\varphi V_v\) or reduced capacity), axial force, and full-strength connections at hinges.</li>
  <li>Check deflection at serviceability loads (elastic).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 230" role="img" aria-label="Plastic moment diagram of a fixed beam">
    <rect class="conc" x="40" y="30" width="14" height="50"/><rect class="conc" x="466" y="30" width="14" height="50"/>
    <path class="ln" d="M54 55 H466"/>
    <path class="thin" d="M54 150 H466"/>
    <path class="acc" d="M54 110 Q 260 270, 466 110"/><path class="dim" d="M54 110 L466 110 M54 110 V150 M466 110 V150"/>
    <circle class="accf" cx="54" cy="55" r="6"/><circle class="accf" cx="466" cy="55" r="6"/><circle class="accf" cx="260" cy="55" r="6"/>
    <text x="64" y="104" class="m">−M_p</text><text x="420" y="104" class="m">−M_p</text><text x="236" y="208" class="m">+M_p</text>
    <text x="130" y="226" class="m">free moment wL²/8 = 2M_p; three hinges form a mechanism</text>
  </svg>
  <figcaption>Figure 1 — Fixed-ended beam: equal hogging and sagging plastic moments.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Portal frames and beam-columns', html: String.raw`
<p>For pinned-base gabled portal frames with roof slope ≤ 6°, the plastic moment can be read from a chart: \(M_p = K_pw^*l^2\), with \(K_p\) depending on the rise/height ratio and horizontal load. In beam-columns the plastic moment is reduced by axial force (e.g. \(M_{prx} = 1.18M_{px}(1 - N^*/\varphi N_s)\)), and second-order effects must be considered when the elastic buckling load factor is low.</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Example 9.1 — fixed-ended beam', html: String.raw`
<div class="ex">
  <div class="ex-head">A 6 m beam fixed at both ends, fully restrained against lateral buckling, carries G = 27.0 kN/m and Q = 45.0 kN/m. Design it plastically in Grade 300.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(w^* = 1.2(27.0) + 1.5(45.0) = 99.9\) kN/m; free moment \(M_o = 99.9(6.0^2)/8 = 450\) kN·m.</li>
      <li>Equal plastic moments: \(M_A^* = M_1^* = 0.5M_o = 225\) kN·m.</li>
      <li>Trial 410UB53.7: \(\varphi M_s = 304\) kN·m — too much reserve. Try <strong>360UB44.7</strong>: \(\varphi M_s = 222\) kN·m ≈ 225 ✓ (compact).</li>
      <li>Shear: \(V^* = 99.9(6)/2 = 300\) kN; \(\varphi V_v = 420\) kN but at the hinges \(\varphi V_{vm} = 243\) kN &lt; 300 → web stiffeners near the supports; full-strength (welded end plate) connections required.
        <span class="result">360UB44.7 Grade 300 with stiffened webs at the supports</span></li>
      <li>Elastic design would need \(M^* = w^*L^2/12 = 300\) kN·m → 410UB53.7, about 20 % heavier.</li>
    </ol>
  </div>
</div>
<p><em>The Handbook prints 4.5 kN/m for Q in its shear line; the result, 300 kN, uses 45 kN/m.</em></p>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Only compact sections in ductile steel may form plastic hinges.</li>
  <li>Restrain the compression flange at and near each hinge.</li>
  <li>Connections at hinges must be full strength.</li>
</ul>` }
      ]
    }
  ]
});
