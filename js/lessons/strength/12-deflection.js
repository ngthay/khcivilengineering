/* Lesson 12 — Deflection of beams (Bansal, Ch. 12) */
KCE_COURSE.lessons.push({
  id: 'deflection',
  num: 12,
  title: 'Deflection of Simply Supported Beams',
  desc: 'Curvature equation, double integration, standard deflections, Macaulay’s method and moment-area method.',
  icon: '📉',
  color: 'amber',
  meta: ['Bansal Ch. 12', 'EI d²y/dx² = M', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A beam must be strong enough <em>and</em> stiff enough. The deflected shape (elastic curve) follows from the relation between bending moment and curvature. Integrating once gives the slope; integrating twice gives the deflection.</p>` },
        { title: 'Description', html: String.raw`
$$\frac{1}{R} = \frac{M}{EI}\quad\Rightarrow\quad EI\frac{d^2y}{dx^2} = M$$
<p>\(EI\) is the flexural rigidity. Constants of integration come from the boundary conditions (e.g. \(y = 0\) at supports, \(dy/dx = 0\) at a point of symmetry).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Write \(M(x)\) for a section at distance \(x\) from one end.</li>
  <li>Integrate \(EI\,y'' = M\) twice; find the constants from the support conditions.</li>
  <li>For several point loads use <strong>Macaulay’s method</strong>: one equation with bracketed terms \(\langle x - a\rangle\) that are ignored when negative.</li>
  <li>Maximum deflection is where the slope is zero.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 600 180" role="img" aria-label="Elastic curve of a simply supported beam">
    <path class="dim" d="M60 60 H540"/>
    <path class="acc" d="M60 60 Q 300 160 540 60"/>
    <polygon class="ln" points="60,60 50,78 70,78"/><circle class="ln" cx="540" cy="70" r="9"/>
    <path class="thin" d="M300 60 V110"/><text x="308" y="92">yc (max)</text>
    <path class="thin" d="M60 60 L150 100"/><text x="96" y="58" class="m">θA</text>
    <text x="250" y="150" class="m">w per unit length over L</text>
  </svg>
  <figcaption>Figure 1 — Elastic curve: slope θ at the supports, maximum deflection yc at mid-span.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Standard results — simply supported', html: String.raw`
<table class="tbl">
  <thead><tr><th>Load</th><th>Slope at support</th><th>Max deflection</th></tr></thead>
  <tbody>
    <tr><td>\(W\) at mid-span</td><td>\(WL^2/(16EI)\)</td><td>\(WL^3/(48EI)\)</td></tr>
    <tr><td>UDL, total \(W = wL\)</td><td>\(WL^2/(24EI)\)</td><td>\(5WL^3/(384EI)\)</td></tr>
    <tr><td>\(W\) at \(a\) from A</td><td>\(\theta_A = \dfrac{Wb(L^2 - b^2)}{6EIL}\)</td><td>Under load: \(\dfrac{Wa^2b^2}{3EIL}\)</td></tr>
    <tr><td>Uniform moment \(M\)</td><td>\(ML/(2EI)\)</td><td>\(ML^2/(8EI)\)</td></tr>
  </tbody>
</table>` },
        { title: 'Moment-area method (Mohr’s theorems)', html: String.raw`
<ol>
  <li>The change of slope between two points = area of the \(M/EI\) diagram between them.</li>
  <li>The deflection of one point relative to the tangent at another = first moment of that area about the first point.</li>
</ol>
<p>For a symmetric beam the tangent at mid-span is horizontal, so the slope at a support = half-area of the \(M/EI\) diagram, and the central deflection = its moment about the support.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Problem 12.5 — slope and deflection', html: String.raw`
<div class="ex">
  <div class="ex-head">Rectangular beam 200 × 300 mm, simply supported, span 5 m, UDL 9 kN/m, E = 1×10⁴ N/mm².</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(I = 200(300)^3/12 = 4.5×10^8\) mm⁴; \(W = 9 × 5 = 45\) kN.</li>
      <li>\(\theta_A = \dfrac{WL^2}{24EI} = \dfrac{45\,000(5000)^2}{24(10^4)(4.5×10^8)} = 0.0104\) rad.</li>
      <li>\(y_c = \dfrac{5WL^3}{384EI} = \dfrac{5(45\,000)(5000)^3}{384(10^4)(4.5×10^8)} = 16.3\) mm.
        <span class="result">θA = 0.0104 rad, yc = 16.3 mm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 12.6 — size a beam for stress and deflection', html: String.raw`
<div class="ex">
  <div class="ex-head">Same span and load; permissible bending stress 7 N/mm², central deflection ≤ 10 mm, E = 1×10⁴ N/mm². Find b and d.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Deflection: \(10 = \dfrac{5(45\,000)(5000)^3}{384(10^4)I}\) → \(bd^3 = 12I = 878.9×10^7\) mm⁴.</li>
      <li>Stress: \(M = WL/8 = 28.125×10^6\) N·mm; \(M = 7\,bd^2/6\) → \(bd^2 = 24.11×10^6\) mm³.</li>
      <li>Divide: \(d = 878.9×10^7/24.11×10^6 = 364.6\) mm; \(b = 24.11×10^6/364.6^2 = 181.4\) mm.
        <span class="result">b = 181 mm, d = 365 mm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Keep units consistent: N, mm, N/mm² give deflection in mm.</li>
  <li>Use Macaulay brackets for several point loads in one equation.</li>
  <li>Check both strength (σ ≤ permissible) and stiffness (y ≤ limit).</li>
</ul>` }
      ]
    }
  ]
});
