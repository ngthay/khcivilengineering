/* Lesson 8 — Deflections: geometric methods (Chhay/Hibbeler Ch. 8) */
KCE_COURSE.lessons.push({
  id: 'deflection',
  num: 8,
  title: 'Deflections: Elastic Curve, Moment-Area and Conjugate Beam',
  desc: 'Sketching the deflected shape, elastic-curve theory, the double-integration method, the two moment-area theorems and the conjugate-beam method.',
  icon: '〰️',
  color: 'violet',
  meta: ['Ch. 8', 'EI d²v/dx² = M', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Deflections must be limited for serviceability (cracked finishes, ponding, vibration) and are needed to analyse indeterminate structures. For linear elastic beams the curvature of the <strong>elastic curve</strong> is proportional to the bending moment, so slopes and deflections come from integrating the \(M/EI\) diagram — directly, graphically (moment-area) or by analogy (conjugate beam).</p>` },
        { title: 'Description', html: String.raw`
$$\frac{1}{\rho} = \frac{M}{EI},\qquad EI\frac{d^2v}{dx^2} = M(x),\qquad \theta = \frac{dv}{dx}$$
<p><strong>Sketching:</strong> supports give zero deflection (and zero slope at a fixed end); positive M bends the beam concave up, negative M concave down; the change of curvature is an <strong>inflection point</strong> where M = 0.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Double integration:</strong> write \(M(x)\) for each region, integrate twice, find the constants from the boundary conditions (v = 0 at supports, θ = 0 at a fixed end) and continuity between regions.</li>
  <li><strong>Moment-area:</strong> draw the \(M/EI\) diagram, then use Theorem 1 for slope changes and Theorem 2 for tangential deviations, starting from a tangent of known direction.</li>
  <li><strong>Conjugate beam:</strong> load an imaginary beam with \(M/EI\); its shear = real slope and its moment = real deflection.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 250" role="img" aria-label="Cantilever and its M/EI diagram, Example 8-5">
    <rect class="conc" x="40" y="30" width="16" height="70"/>
    <path class="ln" d="M56 64 H476"/>
    <path class="acc" d="M476 20 V58"/><polygon class="accf" points="476,62 471,52 481,52"/><text x="484" y="34">10 kN</text>
    <path class="dim" d="M56 64 Q 300 80 476 120"/>
    <text x="30" y="118">A</text><text x="262" y="56">B</text><text x="482" y="70">C</text>
    <text x="150" y="90" class="m">5 m</text><text x="360" y="90" class="m">5 m</text>
    <path class="thin" d="M56 150 H476"/>
    <path class="acc" d="M56 150 V230 L476 150"/>
    <path class="dim" d="M266 150 V190"/>
    <text x="0" y="234" class="m">−100/EI</text><text x="272" y="200" class="m">−50/EI</text><text x="490" y="154" class="m">M/EI</text>
  </svg>
  <figcaption>Figure 1 — Example 8-5: cantilever with 10 kN at the free end and its M/EI diagram.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Moment-area theorems', html: String.raw`
<p><strong>Theorem 1:</strong> the change in slope between A and B equals the area of the \(M/EI\) diagram between them:</p>
$$\theta_{B/A} = \int_A^B \frac{M}{EI}\,dx$$
<p><strong>Theorem 2:</strong> the vertical deviation of B from the tangent drawn at A equals the moment of that area about B:</p>
$$t_{B/A} = \bar x \int_A^B \frac{M}{EI}\,dx$$
<p>A positive \(t_{B/A}\) means B lies above the tangent at A.</p>` },
        { title: 'Conjugate-beam supports', html: String.raw`
<table class="tbl">
  <thead><tr><th>Real beam</th><th>Conjugate beam</th></tr></thead>
  <tbody>
    <tr><td>Fixed end (θ = 0, Δ = 0)</td><td>Free end (V = 0, M = 0)</td></tr>
    <tr><td>Free end (θ ≠ 0, Δ ≠ 0)</td><td>Fixed end</td></tr>
    <tr><td>Pin or roller at the end</td><td>Pin or roller at the end</td></tr>
    <tr><td>Interior support (Δ = 0, θ continuous)</td><td>Internal hinge</td></tr>
    <tr><td>Internal hinge (θ jumps)</td><td>Interior roller</td></tr>
  </tbody>
</table>
<p>The \(M/EI\) load acts upward where M is positive and downward where M is negative.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 8-5 — moment-area method', html: String.raw`
<div class="ex">
  <div class="ex-head">Find the slope at B and C of the cantilever in Figure 1. E = 200 GPa, I = 360(10⁶) mm⁴, so EI = 72 000 kN·m².</div>
  <div class="ex-body">
    <ol class="steps">
      <li>The tangent at the fixed end A is horizontal, so \(\theta_B = \theta_{B/A}\) and \(\theta_C = \theta_{C/A}\).</li>
      <li>Theorem 1, area from A to B (rectangle + triangle):
        $$\theta_B = -\frac{50}{EI}(5) - \frac12\left(\frac{100 - 50}{EI}\right)(5) = -\frac{375}{EI} = -0.00521\ \text{rad}$$</li>
      <li>Whole triangle: \(\theta_C = -\tfrac12(100)(10)/EI = -500/EI = -0.00694\) rad; Theorem 2 about C gives \(\Delta_C = 500(\tfrac23\cdot10)/EI = 3333/EI = 46.3\) mm (\(= PL^3/3EI\)).
        <span class="result">θ_B = 0.00521 rad, θ_C = 0.00694 rad (clockwise), Δ_C = 46.3 mm ↓</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 8-12 — conjugate-beam method', html: String.raw`
<div class="ex">
  <div class="ex-head">A 10 m cantilever, fixed at A and free at B, carries 20 kN at mid-span (5 m from A). E = 200 GPa, I = 475(10⁶) mm⁴ (EI = 95 000 kN·m²). Find the slope and deflection at B.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Real moment: −100 kN·m at A, rising linearly to 0 at 5 m, zero beyond. Conjugate beam: free at A′, fixed at B′, loaded downward by the triangle \(M/EI\) with peak 100/EI; resultant \(250/EI\) at 1.67 m from A′ (8.33 m from B′).</li>
      <li>\(\sum F_y = 0\): \(\theta_B = V_{B'} = -250/EI = -0.00263\) rad.</li>
      <li>\(\sum M_{B'} = 0\): \(\Delta_B = M_{B'} = -250(8.33)/EI = -2083/EI = -0.0219\) m.
        <span class="result">θ_B = −0.00263 rad, Δ_B = 21.9 mm ↓</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Sketch the deflected shape first — it tells the signs and where to start the tangent.</li>
  <li>Keep units consistent: kN, m and EI in kN·m² give rad and m.</li>
  <li>For several loads, draw the M/EI diagram in parts (superposition) — areas and centroids are then simple shapes.</li>
</ul>` }
      ]
    }
  ]
});
