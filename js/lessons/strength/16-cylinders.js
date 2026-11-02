/* Lesson 16 — Thin and thick cylinders and spheres (Bansal, Ch. 17–18) */
KCE_COURSE.lessons.push({
  id: 'cylinders',
  num: 16,
  title: 'Thin and Thick Cylinders',
  desc: 'Hoop and longitudinal stresses, joint efficiency, change of dimensions, thin spheres, and Lamé’s equations for thick cylinders.',
  icon: '🛢️',
  color: 'violet',
  meta: ['Bansal Ch. 17–18', 'Pressure vessels', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Pipes, tanks and boilers carry internal pressure \(p\). If the wall thickness \(t\) is less than about 1/20 of the diameter \(d\), the stresses can be taken as uniform through the wall — a <strong>thin cylinder</strong>. The circumferential (<strong>hoop</strong>) stress is twice the longitudinal stress, so cylinders split along their length.</p>` },
        { title: 'Description', html: String.raw`
$$\sigma_1 = \frac{pd}{2t}\ (\text{hoop}),\qquad \sigma_2 = \frac{pd}{4t}\ (\text{longitudinal}),\qquad \sigma_{sphere} = \frac{pd}{4t}$$
<p>With riveted joints of efficiency \(\eta_l\) (longitudinal joint) and \(\eta_c\) (circumferential joint): \(\sigma_1 = \dfrac{pd}{2t\eta_l}\), \(\sigma_2 = \dfrac{pd}{4t\eta_c}\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Convert pressure to N/mm² (water head: \(p = wh\)).</li>
  <li>Thickness from the hoop stress (it governs), or the larger result if joint efficiencies differ.</li>
  <li>Maximum diameter or pressure: check both hoop and longitudinal conditions and take the smaller result.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 600 200" role="img" aria-label="Thin cylinder stresses">
    <rect class="conc" x="60" y="50" width="300" height="100" rx="20"/>
    <path class="acc" d="M200 50 V20 M200 150 V180"/><polygon class="accf" points="200,18 195,28 205,28"/><polygon class="accf" points="200,182 195,172 205,172"/>
    <path class="acc" d="M360 100 H400 M60 100 H20"/><polygon class="accf" points="402,100 392,95 392,105"/><polygon class="accf" points="18,100 28,95 28,105"/>
    <text x="210" y="24">σ₁ hoop = pd/2t</text><text x="404" y="96">σ₂ = pd/4t</text>
    <circle class="conc" cx="510" cy="100" r="60"/><circle class="thin" cx="510" cy="100" r="50"/><text x="492" y="104" class="m">p</text>
  </svg>
  <figcaption>Figure 1 — Hoop stress acts around the circumference; longitudinal stress acts along the axis.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Change of dimensions', html: String.raw`
$$\frac{\delta d}{d} = \frac{pd}{2tE}\left(1 - \frac{\mu}{2}\right),\qquad \frac{\delta L}{L} = \frac{pd}{2tE}\left(\frac12 - \mu\right),\qquad \frac{\delta V}{V} = \frac{pd}{2tE}\left(\frac52 - 2\mu\right)$$
<p>Thin sphere: \(\dfrac{\delta V}{V} = \dfrac{3pd}{4tE}(1 - \mu)\).</p>` },
        { title: 'Thick cylinders — Lamé’s equations', html: String.raw`
$$p_x = \frac{b}{x^2} - a,\qquad \sigma_x = \frac{b}{x^2} + a$$
<p>\(p_x\) = radial pressure and \(\sigma_x\) = hoop stress at radius \(x\); constants \(a\), \(b\) from the boundary pressures (e.g. \(p_x = p\) at the inner radius, 0 at the outer radius). The hoop stress is largest at the inner surface. Compound cylinders (shrink fits) reduce that peak.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Problem 17.5 — water main', html: String.raw`
<div class="ex">
  <div class="ex-head">Water main Ø800 mm, pressure head 100 m, permissible stress 20 N/mm². Find the wall thickness.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(p = wh = 9810 × 100 = 0.981×10^6\) N/m² = 0.981 N/mm².</li>
      <li>\(t = \dfrac{pd}{2\sigma_1} = \dfrac{0.981(800)}{2(20)} = 19.6\) mm.
        <span class="result">t ≈ 20 mm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problems 17.6–17.7 — boiler with riveted joints', html: String.raw`
<div class="ex">
  <div class="ex-head">(a) Boiler p = 2 N/mm², t = 20 mm, σ = 120 N/mm², η_l = 90 %, η_c = 40 %: maximum diameter. (b) t = 15 mm, η_l = 70 %, η_c = 30 %, σ = 120 N/mm²: maximum diameter at p = 2 N/mm², and maximum pressure for d = 1.5 m.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) Hoop: \(d = \dfrac{2\sigma t\eta_l}{p} = \dfrac{2(120)(20)(0.9)}{2} = 2160\) mm; longitudinal: \(d = \dfrac{4\sigma t\eta_c}{p} = 1920\) mm → <strong>1920 mm</strong>.</li>
      <li>(b) Hoop: \(d = 1260\) mm; longitudinal: 1080 mm → <strong>1080 mm</strong>.</li>
      <li>(b) For d = 1500 mm: \(p = \dfrac{2(120)(15)(0.7)}{1500} = 1.68\) and \(p = \dfrac{4(120)(15)(0.3)}{1500} = 1.44\) N/mm² → <strong>1.44 N/mm²</strong>.
        <span class="result">(a) d = 1.92 m; (b) d = 1.08 m, p = 1.44 N/mm²</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Thin theory only if \(t \le d/20\); otherwise use Lamé.</li>
  <li>Use the joint efficiencies with the matching stress direction.</li>
  <li>Take the smaller allowable diameter or pressure from the two checks.</li>
</ul>` }
      ]
    }
  ]
});
