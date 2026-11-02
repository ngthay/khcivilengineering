/* Lesson 10 — Dams and retaining walls (Bansal, Ch. 10) */
KCE_COURSE.lessons.push({
  id: 'dams-walls',
  num: 10,
  title: 'Dams and Retaining Walls',
  desc: 'Water pressure on dams, base stresses, stability conditions, Rankine earth pressure and retaining walls.',
  icon: '🏞️',
  color: 'blue',
  meta: ['Bansal Ch. 10', 'Gravity structures', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A gravity dam or retaining wall resists the horizontal push of water or earth by its own weight. The resultant of the weight \(W\) and the push \(F\) cuts the base at some distance from the centre; the base stresses follow the direct-and-bending formula of lesson 9.</p>` },
        { title: 'Description', html: String.raw`
<p>Water pressure on a vertical face (per metre length): \(F = wh^2/2\), acting at \(h/3\) above the base (\(w\) = 9810 N/m³). Weight of a trapezoidal dam: \(W = w_0\frac{a + b}{2}H\). Its centroid from the vertical face: \(\bar x = \dfrac{a^2 + ab + b^2}{3(a + b)}\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Compute \(F\), \(W\) and the centroid of the section.</li>
  <li>Horizontal shift of the resultant at the base: \(x = \dfrac{F}{W}\cdot\dfrac{h}{3}\); distance from the heel \(d = \bar x + x\).</li>
  <li>Eccentricity \(e = d - b/2\); base stresses \(\sigma = \dfrac{W}{b}\left(1 \pm \dfrac{6e}{b}\right)\).</li>
  <li>Check stability: no tension (\(e \le b/6\)), no overturning, no sliding, no crushing.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 260" role="img" aria-label="Trapezoidal dam">
    <rect x="20" y="58" width="120" height="172" style="fill:rgba(91,140,214,.18)"/>
    <polygon class="conc" points="140,30 190,30 290,230 140,230"/>
    <path class="thin" d="M10 230 H330"/>
    <path class="acc" d="M60 172 H136"/><polygon class="accf" points="138,172 128,167 128,177"/><text x="80" y="166">F</text>
    <path class="acc" d="M196 150 V214"/><polygon class="accf" points="196,216 191,206 201,206"/><text x="200" y="190">W</text>
    <path class="dim" d="M140 30 V230"/><text x="150" y="22">a = 1 m</text>
    <path class="thin" d="M140 246 H290"/><text x="200" y="258">b = 3 m</text>
    <text x="300" y="130">H = 4 m</text><text x="40" y="52" class="m">water h = 3.5 m</text>
  </svg>
  <figcaption>Figure 1 — Dam of the worked example: water force F at h/3 and dam weight W.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Stability conditions', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>No tension</th><td>\(e \le b/6\) — resultant in the middle third of the base</td></tr>
    <tr><th>No overturning</th><td>Resultant within the base; factor of safety = resisting moment / overturning moment</td></tr>
    <tr><th>No sliding</th><td>\(\mu W \ge F\)</td></tr>
    <tr><th>No crushing</th><td>\(\sigma_{max} \le\) permissible stress of masonry / soil</td></tr>
  </tbody>
</table>` },
        { title: 'Rankine earth pressure', html: String.raw`
$$p = wh\,\frac{1 - \sin\phi}{1 + \sin\phi},\qquad P = \frac{wh^2}{2}\cdot\frac{1 - \sin\phi}{1 + \sin\phi}\ \text{at } h/3$$
<p>\(\phi\) = angle of repose of the soil. With a surcharge, the pressure diagram becomes a trapezium.</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Trapezoidal dam: empty and full', html: String.raw`
<div class="ex">
  <div class="ex-head">Masonry dam a = 1 m, b = 3 m, H = 4 m, water depth 3.5 m; w₀ = 19 620 N/m³, w = 9810 N/m³. Find the base stresses with the reservoir empty and full.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(F = 9810(3.5)^2/2 = 60\,086\) N at 1.167 m; \(W = 19\,620 × \frac{1 + 3}{2} × 4 = 156\,960\) N.</li>
      <li>Centroid from the heel: \(\bar x = \dfrac{1 + 3 + 9}{3(4)} = 1.083\) m.</li>
      <li><strong>Empty:</strong> \(e = 1.083 - 1.5 = -0.417\) m; \(\sigma = \dfrac{156\,960}{3}\left(1 \pm \dfrac{6(0.417)}{3}\right)\) = 95.9 kN/m² (heel) and 8.7 kN/m² (toe).</li>
      <li><strong>Full:</strong> \(x = \dfrac{60\,086}{156\,960} × 1.167 = 0.447\) m; \(d = 1.530\) m; \(e = 0.030\) m.
        \(\sigma = 52\,320(1 \pm 0.060)\) = 55.5 kN/m² (toe) and 49.2 kN/m² (heel).
        <span class="result">Empty: 95.9 / 8.7 kN/m² — Full: 55.5 / 49.2 kN/m², no tension</span></li>
    </ol>
    <div class="note"><p>The book rounds \(\bar x\) to 1.08 m and gets 96.3 / 8.4 kN/m² (empty) and 55.0 / 49.6 kN/m² (full); the small difference is rounding only.</p></div>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Check both reservoir empty and reservoir full.</li>
  <li>Resultant in the middle third → no tension at the heel.</li>
  <li>Check sliding, overturning and the maximum base stress.</li>
</ul>` }
      ]
    }
  ]
});
