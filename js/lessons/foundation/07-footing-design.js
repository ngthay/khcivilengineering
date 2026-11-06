/* Lesson 7 — Footing thickness, strip and combined/strap footings (CCES Foundation Ch. 1 §X–XI) */
KCE_COURSE.lessons.push({
  id: 'footing-design',
  num: 7,
  title: 'Footing Sizing: Plain, Reinforced and Strap Footings',
  desc: 'Stepped plain-concrete footings, minimum thickness of plain and reinforced footings, sizing with the footing self-weight, and strap (cantilever) footings for edge columns with their shear and moment diagrams.',
  icon: '📐',
  color: 'blue',
  meta: ['Ch. 1 §X–XI', 'h ≥ (B − b)/4', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Once the allowable pressure is known, the footing is sized: its area from the loads, its thickness from the spread of load in the concrete. Plain concrete footings rely on a 45° spread and must be thick; reinforced footings are thinner. Columns at a property line cannot have a centred footing, so they are tied to an interior footing by a <strong>strap beam</strong>.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Plain strip footing</th><td>\(h \ge \dfrac{B - b}{4} + 0.05\) m, \(h \ge 15\) cm</td></tr>
    <tr><th>Reinforced footing</th><td>\(B \ge Q/q_{all}\), \(d \ge \dfrac{B - b}{4}\), cover \(c \ge 3\) cm, edge \(e \ge \max(15\ \text{cm},\ 6\varphi + 6\ \text{cm},\ 12\varphi + 6\ \text{cm with hooks})\)</td></tr>
    <tr><th>Stepped plain footing</th><td>Steps of 30 – 45 cm (e.g. H = 90 cm → 30 + 30 + 30)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>First size \(B = Q/q_{all}\) from the column or wall load.</li>
  <li>Choose the thickness, compute the footing weight per metre and add it to the load.</li>
  <li>Recompute \(B\) and check the bearing pressure again.</li>
  <li>For edge columns, size a strap footing (Theory) and design the beam for the shear and moment diagrams.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 220" role="img" aria-label="Strap footing">
    <rect class="conc" x="40" y="130" width="120" height="30"/><rect class="conc" x="360" y="130" width="140" height="30"/>
    <rect class="comp" x="40" y="104" width="460" height="26"/>
    <rect class="conc" x="40" y="40" width="20" height="64"/><rect class="conc" x="420" y="40" width="20" height="64"/>
    <path class="acc" d="M50 10 V36 M430 10 V36"/><polygon class="accf" points="50,40 45,30 55,30"/><polygon class="accf" points="430,40 425,30 435,30"/>
    <text x="64" y="22">Q₁ = 578 kN</text><text x="444" y="22">Q₂ = 890 kN</text>
    <path class="dim" d="M50 180 H430"/><text x="220" y="196" class="m">S = 6.10 m</text>
    <path class="dim" d="M100 170 V176"/><text x="80" y="214" class="m">R₁ at e = 1.0 m</text>
    <path class="dim" d="M20 100 V160"/><text x="0" y="96" class="m">property line</text>
  </svg>
  <figcaption>Figure 1 — Strap footing: the edge footing is offset and the strap beam balances the moment.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Strap footing', html: String.raw`
<p>Choose the eccentricity \(e\) of the edge footing reaction from the column, so the distance between reactions is \(S' = S - e\). From \(\sum M = 0\) about the interior reaction:</p>
$$R_1 = Q_1\frac{S}{S'},\qquad R_2 = Q_2 - \frac{Q_1e}{S'}$$
<p>Then \(A_1 = R_1/q_{all}\) with \(L_1 = 2(e + c/2)\), \(B_1 = A_1/L_1\); \(A_2 = R_2/q_{all}\) with a square \(B_2 = \sqrt{A_2}\). The strap beam carries the shear and moment between the columns; the footings act as cantilevers from the beam.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Plain concrete strip footing', html: String.raw`
<div class="ex">
  <div class="ex-head">A 30 cm wall carries 300 kN/m; \(q_{all} = 100\) kPa. Size a plain concrete strip footing.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(B = 300/100 = 3\) m; \(h \ge (3 - 0.3)/4 + 0.05 = 0.725\) m.</li>
      <li>Weight \(25(3)(0.725) = 54.4\) kN/m → total 354.4 kN/m → \(B_1 = 3.54\) m.
        <span class="result">B ≈ 3.55 m, h = 0.75 m — a reinforced footing would be much thinner</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Strap footing for an edge column', html: String.raw`
<div class="ex">
  <div class="ex-head">An edge column (0.4 × 0.4 m) carries 578 kN; an interior column 6.10 m away carries 890 kN; \(q_{all} = 100\) kPa. Size the footings with \(e = 1.0\) m.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(S' = 6.10 - 1.0 = 5.10\) m; \(R_1 = 578\tfrac{6.10}{5.10} = 691\) kN; \(R_2 = 890 - 578\tfrac{1.0}{5.10} = 777\) kN. Check \(R_1 + R_2 = 1468 = Q_1 + Q_2\) ✓.</li>
      <li>Edge footing: \(A_1 = 6.91\) m², \(L_1 = 2(1.0 + 0.2) = 2.40\) m, \(B_1 = 2.88\) m.</li>
      <li>Interior footing: \(A_2 = 7.77\) m² → \(B_2 = 2.79\) m square.</li>
      <li>Strap beam: maximum moment ≈ 465 kN·m (hogging) near the edge footing; shears 520 kN and 501 kN.
        <span class="result">Footing 1: 2.40 × 2.88 m · Footing 2: 2.79 × 2.79 m · R₁ = 691 kN, R₂ = 777 kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Always add the footing self-weight and re-check the size.</li>
  <li>The strap beam must be stiff and must not bear on the soil.</li>
  <li>Check \(\sum F_y = 0\) for the reactions of a strap footing.</li>
</ul>` }
      ]
    }
  ]
});
