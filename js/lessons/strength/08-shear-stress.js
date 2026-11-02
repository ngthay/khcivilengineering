/* Lesson 8 — Shear stresses in beams (Bansal, Ch. 8) */
KCE_COURSE.lessons.push({
  id: 'shear-stress',
  num: 8,
  title: 'Shear Stresses in Beams',
  desc: 'Shear stress at a section, τ = FAȳ/Ib, and distributions for rectangular, circular, triangular and I-sections.',
  icon: '✂️',
  color: 'pink',
  meta: ['Bansal Ch. 8', 'τ = FAȳ/(Ib)', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The shear force at a section produces <strong>shear stresses</strong> that are not uniform over the depth: they are zero at the top and bottom fibres and usually largest at the neutral axis. Horizontal shear stress at a level equals the vertical shear stress there (complementary shear).</p>` },
        { title: 'Description', html: String.raw`
$$\tau = \frac{F\,A\bar y}{I\,b}$$
<p>\(F\) = shear force; \(A\bar y\) = first moment, about the neutral axis, of the area above the level considered; \(I\) = moment of inertia of the whole section; \(b\) = width at that level.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the maximum shear force \(F\) (lesson 6) and \(I\) (lesson 5).</li>
  <li>At each level of interest compute \(A\bar y\) of the area above it.</li>
  <li>Divide by \(Ib\); where the width changes abruptly (flange–web), compute with both widths.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 700 240" role="img" aria-label="Shear stress distributions">
    <rect class="conc" x="30" y="30" width="60" height="160"/>
    <path class="thin" d="M110 30 V190"/><path class="acc" d="M110 30 Q 190 110 110 190"/><text x="158" y="114" class="m">1.5 τavg</text>
    <text x="40" y="218" class="m">Rectangle</text>
    <circle class="conc" cx="300" cy="110" r="80"/>
    <path class="thin" d="M400 30 V190"/><path class="acc" d="M400 30 Q 470 110 400 190"/><text x="442" y="114" class="m">4/3 τavg</text>
    <text x="276" y="218" class="m">Circle</text>
    <path class="conc" d="M540 30 H640 V45 H595 V175 H640 V190 H540 V175 H585 V45 H540 Z"/>
    <path class="thin" d="M660 30 V190"/><path class="acc" d="M660 30 L666 45 L674 45 Q 692 110 674 175 L666 175 L660 190"/>
    <text x="540" y="218" class="m">I-section</text>
  </svg>
  <figcaption>Figure 1 — Shear stress distributions: parabolic in rectangles and circles; in an I-section a small value in the flanges jumps to a large value in the web.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Standard sections', html: String.raw`
<table class="tbl">
  <thead><tr><th>Section</th><th>\(\tau_{max}\)</th><th>Where</th></tr></thead>
  <tbody>
    <tr><td>Rectangle</td><td>\(1.5\,\tau_{avg}\)</td><td>Neutral axis</td></tr>
    <tr><td>Circle</td><td>\(\tfrac43\,\tau_{avg}\)</td><td>Neutral axis</td></tr>
    <tr><td>Triangle</td><td>\(1.5\,\tau_{avg}\)</td><td>Mid-height (at N.A.: \(\tfrac43\tau_{avg}\))</td></tr>
  </tbody>
</table>
<p>Circular section at distance \(y\): \(\tau = \dfrac{F}{3I}(R^2 - y^2)\).</p>` },
        { title: 'I-section', html: String.raw`
<p>Overall \(B × D\), web thickness \(b\), web depth \(d\):</p>
$$\text{Flange (at depth } y): \tau = \frac{F}{2I}\left(\frac{D^2}{4} - y^2\right)$$
$$\text{Web, at junction: } \tau = \frac{FB}{8Ib}(D^2 - d^2),\qquad \text{at N.A.: } \tau_{max} = \frac{F}{Ib}\left[\frac{B(D^2 - d^2)}{8} + \frac{bd^2}{8}\right]$$` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Circular section', html: String.raw`
<div class="ex">
  <div class="ex-head">Circular section D = 100 mm, shear force F = 5 kN. Find average and maximum shear stress, and τ at 40 mm from the N.A.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\tau_{avg} = 5000/(\pi × 50^2) = 0.637\) N/mm²; \(\tau_{max} = \tfrac43(0.637) = 0.849\) N/mm².</li>
      <li>\(I = \pi(100)^4/64\); at \(y\) = 40: \(\tau = \dfrac{5000}{3I}(50^2 - 40^2) = 0.306\) N/mm².
        <span class="result">τavg = 0.637, τmax = 0.849, τ(40 mm) = 0.306 N/mm²</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 8.7 — I-section', html: String.raw`
<div class="ex">
  <div class="ex-head">I-section 350 × 150 mm, web 10 mm, flanges 20 mm; F = 40 kN. Find the maximum shear stress.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(d = 350 - 2(20) = 310\) mm; \(I = \dfrac{150(350)^3}{12} - \dfrac{140(310)^3}{12} = 188.38×10^6\) mm⁴.</li>
      <li>\(\tau_{max} = \dfrac{40\,000}{188.38×10^6 × 10}\left[\dfrac{150(350^2 - 310^2)}{8} + \dfrac{10(310)^2}{8}\right]\)
        <span class="result">τmax = 13.06 N/mm² at the neutral axis</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>\(A\bar y\) is of the area <em>beyond</em> the level considered.</li>
  <li>Use the width \(b\) at that level — flange or web.</li>
  <li>In I-sections nearly all shear is carried by the web; \(F/(d\,b)\) is a quick estimate.</li>
</ul>` }
      ]
    }
  ]
});
