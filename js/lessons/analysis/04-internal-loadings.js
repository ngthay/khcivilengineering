/* Lesson 4 — Internal loadings in structural members (Chhay/Hibbeler Ch. 4) */
KCE_COURSE.lessons.push({
  id: 'internal-loadings',
  num: 4,
  title: 'Internal Loadings: Shear and Moment Diagrams',
  desc: 'Normal force, shear and moment at a section, shear and moment functions, load–shear–moment relations, diagrams for beams and frames, and moment diagrams by superposition.',
  icon: '📊',
  color: 'lilac',
  meta: ['Ch. 4', 'V and M diagrams', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Cutting a member at a section exposes three internal loadings: the <strong>normal force N</strong>, the <strong>shear force V</strong> and the <strong>bending moment M</strong>. Plotting V and M along a beam gives the diagrams the designer uses to locate the critical sections.</p>` },
        { title: 'Description', html: String.raw`
<p><strong>Sign convention (beams):</strong> N positive in tension; V positive when it rotates the segment clockwise; M positive when it bends the segment concave upward (sagging).</p>
$$\frac{dV}{dx} = w(x),\qquad \frac{dM}{dx} = V,\qquad \Delta V = \int w\,dx,\qquad \Delta M = \int V\,dx$$
<p>Here \(w\) is positive upward, so a downward load makes the shear diagram slope down. A concentrated force makes V jump by the force; a concentrated couple makes M jump by the couple (up for a clockwise couple).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the support reactions.</li>
  <li>Start at the left end with V = reaction; follow the loads: V changes by the area under the load, jumps at point loads.</li>
  <li>Start with M = 0 at a pin or roller (or the fixed-end moment); M changes by the area of the shear diagram, jumps at couples.</li>
  <li>The maximum moment is where V = 0 (or changes sign); find that point from the shear function.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 320" role="img" aria-label="Shear and moment diagrams of Example 4-9">
    <path class="ln" d="M60 60 H480"/><polygon class="ln" points="60,60 50,78 70,78"/><circle class="ln" cx="480" cy="70" r="9"/>
    <path class="acc" d="M270 20 V56"/><polygon class="accf" points="270,58 265,48 275,48"/><text x="250" y="16">3 kN</text>
    <path class="acc" d="M360 46 A 16 16 0 1 1 390 46"/><polygon class="accf" points="391,52 386,40 396,42"/><text x="396" y="26">6 kN·m</text>
    <text x="54" y="98">A</text><text x="266" y="80">C</text><text x="372" y="80">D</text><text x="476" y="98">B</text>
    <text x="150" y="96" class="m">3 m</text><text x="310" y="96" class="m">1.5 m</text><text x="414" y="96" class="m">1.5 m</text>
    <path class="thin" d="M60 150 H480"/>
    <path class="acc" d="M60 150 V142 H270 V190 H480 V150"/>
    <text x="140" y="136" class="m">+0.5</text><text x="300" y="182" class="m">−2.5</text><text x="490" y="154" class="m">V (kN)</text>
    <path class="thin" d="M60 260 H480"/>
    <path class="acc" d="M60 260 L270 239 L375 291.5 V207.5 L480 260"/>
    <text x="256" y="232" class="m">1.5</text><text x="330" y="304" class="m">−2.25</text><text x="380" y="204" class="m">3.75</text><text x="490" y="264" class="m">M (kN·m)</text>
  </svg>
  <figcaption>Figure 1 — Example 4-9: A_y = 0.5 kN, B_y = 2.5 kN; the 6 kN·m couple makes M jump at D.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Shear and moment functions', html: String.raw`
<p>Choose a coordinate \(x\), cut the beam at \(x\) in each region between load discontinuities, and write \(\sum F_y = 0\) and \(\sum M = 0\) for the segment. Each region gives one pair of functions \(V(x)\), \(M(x)\).</p>` },
        { title: 'Frames and superposition', html: String.raw`
<ul>
  <li><strong>Frames:</strong> find the reactions, then the end forces of each member; draw V and M for each member as for a beam. At a rigid joint with no external couple the moment is continuous around the corner.</li>
  <li><strong>Moment diagram by superposition:</strong> draw the moment diagram of each load separately on a simply supported span (with the end moments as separate loads) and add them. This is quick and is used in the moment-area method (Lesson 8).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 4-6 — shear and moment functions', html: String.raw`
<div class="ex">
  <div class="ex-head">A 9 m simply supported beam carries a load varying linearly from 10 kN/m at the left support to 30 kN/m at the right. Find V and M as functions of x and the maximum moment.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Resultants: rectangle 90 kN at 4.5 m, triangle 90 kN at 6 m → \(B_y = (90(4.5) + 90(6))/9 = 105\) kN, \(A_y = 75\) kN.</li>
      <li>At distance \(x\) the load is \(10 + 20x/9\):
        $$V = 75 - 10x - \tfrac12\left(\tfrac{20x}{9}\right)x = 75 - 10x - 1.11x^2$$
        $$M = 75x - 5x^2 - 0.370x^3$$</li>
      <li>\(V = 0\) → \(x = 4.87\) m; \(M_{max} = 75(4.87) - 5(4.87)^2 - 0.370(4.87)^3 = 204\) kN·m.
        <span class="result">V = 75 − 10x − 1.11x², M = 75x − 5x² − 0.370x³, M_max ≈ 204 kN·m at x = 4.87 m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 4-9 — diagrams by the load relations', html: String.raw`
<div class="ex">
  <div class="ex-head">Draw the shear and moment diagrams for the beam in Figure 1 (3 kN at C, 6 kN·m clockwise couple at D).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Reactions: \(\sum M_A = 0\): \(B_y(6) - 3(3) - 6 = 0\) → \(B_y = 2.5\) kN; \(A_y = 0.5\) kN.</li>
      <li>Shear: \(V = +0.5\) kN from A to C; the 3 kN load drops it to −2.5 kN, which stays constant to B (\(w = 0\)).</li>
      <li>Moment: \(M_C = 0.5(3) = 1.5\) kN·m; \(M_{D^-} = 1.5 - 2.5(1.5) = -2.25\) kN·m; the clockwise couple adds 6: \(M_{D^+} = 3.75\) kN·m; \(M_B = 3.75 - 2.5(1.5) = 0\) ✓.
        <span class="result">V: +0.5 / −2.5 kN · M: 1.5, −2.25, +3.75, 0 kN·m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>The moment diagram must close at free ends, pins and rollers (M = 0 unless a couple acts there).</li>
  <li>Slope of V = load intensity; slope of M = shear.</li>
  <li>Report the maximum moment at V = 0, not only at load points.</li>
</ul>` }
      ]
    }
  ]
});
