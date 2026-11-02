/* Lesson 13 — Deflection of cantilevers; conjugate beam, propped cantilevers (Bansal, Ch. 13–14) */
KCE_COURSE.lessons.push({
  id: 'cantilevers',
  num: 13,
  title: 'Cantilevers, Conjugate Beam and Propped Cantilevers',
  desc: 'Slope and deflection of cantilevers by integration and moment-area, the conjugate beam method, and propped cantilevers.',
  icon: '🪝',
  color: 'lilac',
  meta: ['Bansal Ch. 13–14', 'Deflection', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>In a cantilever the slope and deflection are zero at the fixed end, which makes the moment-area method especially direct: the slope at the free end is the area of the \(M/EI\) diagram, and the deflection is its moment about the free end. The <strong>conjugate beam</strong> method turns the same idea into a loading problem, and the <strong>propped cantilever</strong> uses deflection compatibility to find the prop reaction.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Cantilever load</th><th>Slope at free end</th><th>Deflection at free end</th></tr></thead>
  <tbody>
    <tr><td>\(W\) at free end</td><td>\(WL^2/(2EI)\)</td><td>\(WL^3/(3EI)\)</td></tr>
    <tr><td>\(W\) at \(a\) from fixed end</td><td>\(Wa^2/(2EI)\)</td><td>\(\dfrac{Wa^3}{3EI} + \dfrac{Wa^2}{2EI}(L - a)\)</td></tr>
    <tr><td>UDL \(w\) over the whole length</td><td>\(wL^3/(6EI)\)</td><td>\(wL^4/(8EI)\)</td></tr>
    <tr><td>UDL over length \(a\) from fixed end</td><td>\(wa^3/(6EI)\)</td><td>\(\dfrac{wa^4}{8EI} + \dfrac{wa^3}{6EI}(L - a)\)</td></tr>
    <tr><td>UVL 0 at free end → \(w\) at fixed end</td><td>\(wL^3/(24EI)\)</td><td>\(wL^4/(30EI)\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Draw the bending moment diagram of the cantilever.</li>
  <li>Slope at the free end = area of \(M\) diagram ÷ \(EI\).</li>
  <li>Deflection at the free end = (area × distance of its centroid from the free end) ÷ \(EI\).</li>
  <li>Propped cantilever: deflection at the prop due to the load = deflection due to the prop reaction \(P\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 600 230" role="img" aria-label="Cantilever with two point loads and its BMD">
    <path class="thin" d="M60 20 V100"/><g class="thin"><path d="M60 30 l-10 10 M60 55 l-10 10 M60 80 l-10 10"/></g>
    <path class="ln" d="M60 60 H500"/>
    <path class="acc" d="M280 20 V58 M500 20 V58"/><polygon class="accf" points="280,58 275,48 285,48"/><polygon class="accf" points="500,58 495,48 505,48"/>
    <text x="260" y="16">20 kN</text><text x="480" y="16">20 kN</text><text x="160" y="80" class="m">1 m</text><text x="380" y="80" class="m">1 m</text>
    <path class="thin" d="M60 120 H500"/>
    <path class="acc" d="M60 120 V210 L280 150 L500 120"/>
    <text x="66" y="206">60</text><text x="270" y="146">20</text><text x="420" y="116" class="m">BMD (kN·m, hogging)</text>
  </svg>
  <figcaption>Figure 1 — Problem 13.12: cantilever 2 m with 20 kN at mid-length and at the free end.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Conjugate beam method', html: String.raw`
<p>Load an imaginary <strong>conjugate beam</strong> with the \(M/EI\) diagram of the real beam. Then:</p>
<ul>
  <li>Slope of the real beam at a point = shear force of the conjugate beam there.</li>
  <li>Deflection of the real beam = bending moment of the conjugate beam there.</li>
  <li>Supports change: fixed ↔ free; simple support stays simple; an internal hinge ↔ internal support.</li>
</ul>` },
        { title: 'Propped cantilevers', html: String.raw`
<table class="tbl">
  <thead><tr><th>Loading</th><th>Prop reaction</th></tr></thead>
  <tbody>
    <tr><td>Cantilever, UDL \(w\), prop at free end</td><td>\(P = 3wL/8\)</td></tr>
    <tr><td>Cantilever, \(W\) at mid-span, prop at free end</td><td>\(P = 5W/16\)</td></tr>
    <tr><td>Simply supported beam, UDL, prop at centre</td><td>\(P = 5wL/8\)</td></tr>
  </tbody>
</table>
<p>After finding \(P\), draw the SFD and BMD as for a statically determinate beam.</p>` }
    ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Problem 13.12 — moment-area method', html: String.raw`
<div class="ex">
  <div class="ex-head">Cantilever L = 2 m with 20 kN at the free end and 20 kN at the centre; E = 10⁵ N/mm², I = 10⁸ mm⁴. Find slope and deflection at the free end.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>BM: 0 at B, −20 kN·m at C, −60 kN·m at A.</li>
      <li>Split the BMD: triangle CB area \(A_1 = \tfrac12(20)(1) = 10\); rectangle under AC \(A_2 = 20(1) = 20\); triangle \(A_3 = \tfrac12(40)(1) = 20\) kN·m²; total 50 kN·m² = 50×10¹² N·mm².</li>
      <li>\(\theta_B = \dfrac{50×10^{12}}{10^5 × 10^8} = 0.005\) rad.</li>
      <li>Moment about B: \(10(\tfrac23) + 20(1.5) + 20(1 + \tfrac23) = 70\) kN·m³ = 7×10¹³ N·mm³ → \(y_B = 7×10^{13}/10^{13} = 7\) mm.
        <span class="result">θB = 0.005 rad, yB = 7 mm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Slope and deflection are zero at the fixed end.</li>
  <li>Take moments of the \(M/EI\) area about the point whose deflection you want.</li>
  <li>Superposition: deflections from separate loads add.</li>
</ul>` }
      ]
    }
  ]
});
