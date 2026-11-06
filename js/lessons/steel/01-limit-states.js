/* Lesson 1 — Introduction and limit states design (Handbook Ch. 1) */
KCE_COURSE.lessons.push({
  id: 'limit-states',
  num: 1,
  title: 'Introduction and Limit States Design',
  desc: 'The design process, standards, the limit states method, strength and serviceability limit states, capacity reduction factors, and criteria for economical design and detailing.',
  icon: '📘',
  color: 'blue',
  meta: ['Ch. 1', 'φR_u ≥ S*', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Steel structures are designed by the <strong>limit states method</strong>: the structure is checked against each condition in which it would stop fulfilling its purpose — collapse, excessive deflection, vibration, fatigue, fire, corrosion. For strength, the factored load effects must not exceed the factored capacity.</p>` },
        { title: 'Description', html: String.raw`
$$S^* \le \varphi R_u$$
<p>\(S^*\) = design action effect (moment, shear, axial force) from factored loads; \(R_u\) = nominal capacity; \(\varphi\) = capacity reduction factor (AS 4100 Table 3.4):</p>
<table class="tbl num">
  <thead><tr><th>Item</th><th>φ</th><th>Item</th><th>φ</th></tr></thead>
  <tbody>
    <tr><td>Members: bending, shear, axial, tension</td><td>0.9</td><td>Bolts (shear, tension, bearing)</td><td>0.8</td></tr>
    <tr><td>Connection plates</td><td>0.9</td><td>Fillet / butt welds, SP category</td><td>0.8 (0.9 complete penetration)</td></tr>
    <tr><td>Ply in bearing</td><td>0.9</td><td>Welds, GP category</td><td>0.6</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Concept:</strong> choose the structural system, spans and materials.</li>
  <li><strong>Actions:</strong> dead, live, wind, earthquake … from AS/NZS 1170 (Lesson 3).</li>
  <li><strong>Analysis:</strong> design action effects, first- or second-order (Lesson 4).</li>
  <li><strong>Member and connection design:</strong> check every \(S^* \le \varphi R_u\) (Lessons 5 – 12).</li>
  <li><strong>Serviceability:</strong> deflection, vibration, durability, then detailing and documentation.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Load effect and resistance distributions">
    <path class="thin" d="M40 190 H500"/>
    <path class="acc" d="M60 190 C 120 190, 140 60, 180 60 S 240 190, 300 190"/>
    <path class="ln" d="M220 190 C 280 190, 300 70, 340 70 S 400 190, 480 190"/>
    <path class="dim" d="M180 60 V190 M340 70 V190 M230 40 V190 M290 40 V190"/>
    <text x="150" y="50" class="a">S (load effect)</text><text x="330" y="60">R (resistance)</text>
    <text x="214" y="34" class="m">S*</text><text x="276" y="34" class="m">φR_u</text>
    <text x="250" y="210" class="m">safe if S* ≤ φR_u</text>
  </svg>
  <figcaption>Figure 1 — Load factors raise S to S*; the capacity factor lowers R to φR_u.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Limit states in AS 4100', html: String.raw`
<ul>
  <li><strong>Strength:</strong> members, connections, overall stability (overturning, sliding), and brittle fracture.</li>
  <li><strong>Serviceability:</strong> deflection, sway, vibration, bolt slip in friction-grip joints, corrosion.</li>
  <li><strong>Others:</strong> fatigue, fire, earthquake ductility, durability.</li>
</ul>
<p>Analysis may be elastic (first- or second-order) or plastic; AS 4100 also allows advanced analysis.</p>` },
        { title: 'Economy in steel design', html: String.raw`
<ul>
  <li>Minimise the number of different sections and connection types — fabrication labour often costs more than the steel.</li>
  <li>Prefer simple bolted site connections, shop welding, and standard sections (UB, UC, PFC, SHS, CHS).</li>
  <li>Avoid stiffeners where a slightly heavier section removes them; design to available lengths.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Strength check', html: String.raw`
<div class="ex">
  <div class="ex-head">A beam has \(M^* = 806\) kN·m and a nominal member capacity \(M_b = 1266\) kN·m. Is it adequate?</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\varphi M_b = 0.9 \times 1266 = 1140\) kN·m.</li>
      <li>\(M^* = 806 \le 1140\) ✓; utilisation \(806/1140 = 71\,\%\).
        <span class="result">Adequate, 71 % utilised (this is Example 5.1 of Lesson 5)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Every member and every connection needs its own \(S^* \le \varphi R_u\) check.</li>
  <li>Serviceability uses unfactored (or lightly factored) loads.</li>
  <li>Economy comes from simple, repetitive details as much as from light sections.</li>
</ul>` }
      ]
    }
  ]
});
