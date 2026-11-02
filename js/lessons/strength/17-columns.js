/* Lesson 17 — Columns and struts (Bansal, Ch. 19) */
KCE_COURSE.lessons.push({
  id: 'columns',
  num: 17,
  title: 'Columns and Struts',
  desc: 'Short and long columns, Euler’s buckling load for four end conditions, effective length, slenderness and Rankine’s formula.',
  icon: '🏗️',
  color: 'rose',
  meta: ['Bansal Ch. 19', 'Buckling', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>short column</strong> fails by crushing at \(P_c = \sigma_cA\). A <strong>long column</strong> fails by <strong>buckling</strong> at a much lower load, the crippling load, which depends on its length, end conditions and stiffness \(EI\). Euler’s theory gives the crippling load of an ideal long column; Rankine’s formula covers the whole range of lengths.</p>` },
        { title: 'Description', html: String.raw`
<p>Euler’s assumptions: initially straight, axially loaded, uniform, elastic, homogeneous; self-weight ignored; failure by buckling only.</p>
<table class="tbl">
  <thead><tr><th>End conditions</th><th>Crippling load</th><th>Effective length \(L_e\)</th></tr></thead>
  <tbody>
    <tr><td>Both ends hinged</td><td>\(\pi^2EI/l^2\)</td><td>\(l\)</td></tr>
    <tr><td>One end fixed, other free</td><td>\(\pi^2EI/(4l^2)\)</td><td>\(2l\)</td></tr>
    <tr><td>Both ends fixed</td><td>\(4\pi^2EI/l^2\)</td><td>\(l/2\)</td></tr>
    <tr><td>One end fixed, other hinged</td><td>\(2\pi^2EI/l^2\)</td><td>\(l/\sqrt2\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Use the <em>least</em> moment of inertia; \(k = \sqrt{I/A}\) = least radius of gyration.</li>
  <li>Effective length from the end conditions; slenderness ratio \(L_e/k\).</li>
  <li>Euler: \(P = \pi^2EI/L_e^2\) — valid only when the Euler stress is below the crushing stress.</li>
  <li>Rankine for any length; safe load = crippling load ÷ factor of safety.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 230" role="img" aria-label="Buckled shapes for four end conditions">
    <g class="thin"><path d="M20 210 H620"/></g>
    <path class="dim" d="M80 30 V200"/><path class="acc" d="M80 30 Q 130 115 80 200"/><circle class="ln" cx="80" cy="30" r="4"/><circle class="ln" cx="80" cy="200" r="4"/><text x="50" y="226" class="m">hinged–hinged</text><text x="96" y="118" class="m">Le = l</text>
    <path class="dim" d="M240 30 V200"/><path class="acc" d="M240 200 Q 240 90 290 30"/><text x="200" y="226" class="m">fixed–free</text><text x="262" y="118" class="m">Le = 2l</text>
    <path class="dim" d="M400 30 V200"/><path class="acc" d="M400 30 C 400 80, 440 90, 440 115 C 440 140, 400 150, 400 200"/><text x="364" y="226" class="m">fixed–fixed</text><text x="446" y="118" class="m">Le = l/2</text>
    <path class="dim" d="M560 30 V200"/><path class="acc" d="M560 30 Q 610 100 590 150 Q 575 185 560 200"/><circle class="ln" cx="560" cy="30" r="4"/><text x="520" y="226" class="m">fixed–hinged</text><text x="604" y="118" class="m">l/√2</text>
  </svg>
  <figcaption>Figure 1 — Buckled shapes and effective lengths (Table 19.1 of the book).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Crippling stress and Euler’s limit', html: String.raw`
$$\sigma_{cr} = \frac{\pi^2E}{(L_e/k)^2}$$
<p>Euler applies only while \(\sigma_{cr} \le \sigma_c\) (crushing stress). For mild steel (\(E\) = 2.1×10⁵, \(\sigma_c\) = 330 N/mm²) this means \(L_e/k \ge\) about 80.</p>` },
        { title: 'Rankine’s formula', html: String.raw`
$$P = \frac{\sigma_cA}{1 + a\left(\dfrac{L_e}{k}\right)^2},\qquad a = \frac{\sigma_c}{\pi^2E}$$
<table class="tbl num">
  <thead><tr><th>Material</th><th>\(\sigma_c\) (N/mm²)</th><th>\(a\)</th></tr></thead>
  <tbody>
    <tr><td>Wrought iron</td><td>250</td><td>1/9000</td></tr>
    <tr><td>Cast iron</td><td>550</td><td>1/1600</td></tr>
    <tr><td>Mild steel</td><td>320</td><td>1/7500</td></tr>
    <tr><td>Timber</td><td>50</td><td>1/750</td></tr>
  </tbody>
</table>
<p>Other formulas in the chapter: straight-line and Johnson’s parabolic formulas, eccentric loads (secant formula), columns with initial curvature, and beam-columns with lateral load.</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Solid steel bar as a column', html: String.raw`
<div class="ex">
  <div class="ex-head">Solid mild-steel bar Ø50 mm, length 3 m, E = 2×10⁵ N/mm². Find the Euler crippling load for the four end conditions, and the Rankine load with both ends hinged (σc = 320 N/mm², a = 1/7500).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(I = \pi(50)^4/64 = 306\,796\) mm⁴; \(A = 1963.5\) mm²; \(k = \sqrt{I/A} = 12.5\) mm.</li>
      <li>Hinged–hinged: \(P = \dfrac{\pi^2(2×10^5)(306\,796)}{3000^2} = 67.3\) kN.</li>
      <li>Fixed–free (\(L_e\) = 6 m): 16.8 kN; fixed–fixed (1.5 m): 269.2 kN; fixed–hinged (2.12 m): 134.6 kN.</li>
      <li>Rankine, hinged: \(L_e/k = 3000/12.5 = 240\); \(P = \dfrac{320(1963.5)}{1 + 240^2/7500} = 72.4\) kN (crushing load alone would be 628 kN).
        <span class="result">Euler 67.3 kN (hinged); Rankine 72.4 kN — a very slender column</span></li>
    </ol>
    <div class="note"><p>This example was written for the lesson (the book gives the theory and Table 19.1 on the pages used); values checked by calculation.</p></div>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use the least \(I\) — the column buckles about its weaker axis.</li>
  <li>Choose \(L_e\) from the real end restraint, not the nominal one.</li>
  <li>Check Euler’s validity limit; otherwise use Rankine.</li>
</ul>` }
      ]
    }
  ]
});
