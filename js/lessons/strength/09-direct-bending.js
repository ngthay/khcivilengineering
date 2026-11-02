/* Lesson 9 — Direct and bending stresses (Bansal, Ch. 9) */
KCE_COURSE.lessons.push({
  id: 'direct-bending',
  num: 9,
  title: 'Direct and Bending Stresses',
  desc: 'Eccentric loads on columns, resultant stress about one or two axes, and the core (kernel) of a section.',
  icon: '🏛️',
  color: 'rose',
  meta: ['Bansal Ch. 9', 'Eccentric load', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A load that does not act through the centroid of a column produces a <strong>direct stress</strong> \(P/A\) plus a <strong>bending stress</strong> from the moment \(Pe\). The resultant stress varies linearly across the section; if the eccentricity is large enough one face goes into tension — a problem for masonry and concrete, which are weak in tension.</p>` },
        { title: 'Description', html: String.raw`
$$\sigma = \frac{P}{A} \pm \frac{M_x\,y}{I_{xx}} \pm \frac{M_y\,x}{I_{yy}},\qquad M_x = Pe_y,\ M_y = Pe_x$$
<p>For a rectangle \(b × d\) with eccentricity \(e\) about one axis: \(\sigma_{max,min} = \dfrac{P}{bd}\left(1 \pm \dfrac{6e}{d}\right)\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the eccentricities \(e_x\), \(e_y\) of the load from the centroid.</li>
  <li>Compute \(P/A\) and the bending stresses at each corner with the correct signs.</li>
  <li>Add them; negative (tension) results show where the section cracks.</li>
  <li>No tension if the load lies inside the core (kernel) of the section.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 260" role="img" aria-label="Middle third rule and kernel">
    <rect class="conc" x="40" y="40" width="180" height="180"/>
    <polygon class="comp" points="130,100 160,130 130,160 100,130"/>
    <path class="dim" d="M40 130 H220 M130 40 V220"/>
    <text x="70" y="246" class="m">Rectangle: rhombus, diagonals b/3, d/3</text>
    <circle class="conc" cx="380" cy="130" r="90"/>
    <circle class="comp" cx="380" cy="130" r="22.5"/>
    <text x="326" y="246" class="m">Circle: core diameter D/4</text>
    <circle class="accf" cx="148" cy="118" r="4"/><text x="152" y="112" class="m">P</text>
  </svg>
  <figcaption>Figure 1 — The core (kernel): a load inside the shaded area causes no tension anywhere in the section (middle-third and middle-quarter rules).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Middle third and middle quarter rules', html: String.raw`
<p>No tension requires \(\sigma_{min} \ge 0\):</p>
<ul>
  <li>Rectangle: \(e \le d/6\) — the load must lie in the middle third of each axis.</li>
  <li>Solid circle: \(e \le D/8\) — the middle quarter.</li>
  <li>Hollow circle: \(e \le \dfrac{D^2 + d^2}{8D}\).</li>
  <li>Hollow rectangle (\(B×D\) outside, \(b×d\) inside): \(e \le \dfrac{BD^3 - bd^3}{6D(BD - bd)}\).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Load eccentric about both axes', html: String.raw`
<div class="ex">
  <div class="ex-head">Section 80 × 60 mm, P = 40 kN with eₓ = 10 mm (about X-X) and e_y = 5 mm (about Y-Y). Find the maximum compressive and tensile stresses.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(A = 4800\) mm²; \(M_x = 40\,000 × 10 = 400\,000\) N·mm; \(M_y = 200\,000\) N·mm.</li>
      <li>\(I_{xx} = 80(60)^3/12 = 1.44×10^6\); \(I_{yy} = 60(80)^3/12 = 2.56×10^6\) mm⁴.</li>
      <li>Corner C (x = 40, y = 30): \(8.33 + \frac{200\,000 × 40}{2.56×10^6} + \frac{400\,000 × 30}{1.44×10^6} = 8.33 + 3.125 + 8.33 = 19.79\) N/mm².</li>
      <li>Corner A (x = −40, y = −30): \(8.33 - 3.125 - 8.33 = -3.13\) N/mm².
        <span class="result">19.79 N/mm² compression, 3.13 N/mm² tension</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 9.9 — load on the diagonal', html: String.raw`
<div class="ex">
  <div class="ex-head">Column 300 × 400 mm, P = 360 kN on a diagonal at one quarter of its length from a corner. Find the stresses at the four corners.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Diagonal = 500 mm; distance from centre = 125 mm → \(e_x = 75\) mm, \(e_y = 100\) mm.</li>
      <li>\(P/A = 360\,000/120\,000 = 3\) N/mm²; \(M_x = 36×10^6\), \(M_y = 27×10^6\) N·mm; \(I_{xx} = 16×10^8\), \(I_{yy} = 9×10^8\) mm⁴.</li>
      <li>Bending stresses at the corners: \(\frac{27×10^6 × 150}{9×10^8} = 4.5\) and \(\frac{36×10^6 × 200}{16×10^8} = 4.5\) N/mm².</li>
      <li>C = 3 + 4.5 + 4.5 = <strong>12</strong>; B = D = 3 + 4.5 − 4.5 = <strong>3</strong>; A = 3 − 4.5 − 4.5 = <strong>−6</strong> N/mm².
        <span class="result">12, 3, 3 N/mm² compression; 6 N/mm² tension at the far corner</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Write the sign of each bending term at each corner before adding.</li>
  <li>For masonry, concrete and soil keep the resultant inside the core.</li>
  <li>Use the least \(I\) direction for slender members (lesson 17).</li>
</ul>` }
      ]
    }
  ]
});
