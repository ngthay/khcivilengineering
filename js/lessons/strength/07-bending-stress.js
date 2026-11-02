/* Lesson 7 — Bending stresses in beams (Bansal, Ch. 7) */
KCE_COURSE.lessons.push({
  id: 'bending-stress',
  num: 7,
  title: 'Bending Stresses in Beams',
  desc: 'Theory of simple bending, neutral axis, section modulus, symmetrical and unsymmetrical sections, flitched beams.',
  icon: '〰️',
  color: 'violet',
  meta: ['Bansal Ch. 7', 'M/I = σ/y = E/R', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A beam bent by a moment \(M\) shortens on one side and lengthens on the other. Between them lies the <strong>neutral axis</strong>, where the bending stress is zero. The stress varies linearly with distance \(y\) from the neutral axis, reaching its maximum at the extreme fibre.</p>` },
        { title: 'Description', html: String.raw`
<p>Assumptions of the theory of simple bending: the material is homogeneous, isotropic and elastic with the same \(E\) in tension and compression; plane sections remain plane; the radius of curvature is large compared with the section depth; each layer expands or contracts freely.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the maximum bending moment \(M\) (lesson 6).</li>
  <li>Locate the neutral axis (centroid) and compute \(I\) about it (lesson 5).</li>
  <li>\(\sigma_{max} = M\,y_{max}/I = M/Z\), with \(Z = I/y_{max}\).</li>
  <li>For unsymmetrical sections check both the top and bottom fibres.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 220" role="img" aria-label="Bending stress distribution">
    <rect class="conc" x="60" y="30" width="80" height="160"/>
    <path class="dim" d="M40 110 H160"/><text x="164" y="114">N.A.</text>
    <path class="thin" d="M300 30 V190"/>
    <polygon class="comp" points="300,30 380,30 300,110"/><polygon class="comp" points="300,110 220,190 300,190" style="fill:rgba(224,86,91,.25);stroke:#e0565b"/>
    <text x="384" y="34">σc (compression)</text><text x="150" y="196">σt (tension)</text>
    <path class="thin" d="M420 110 V30 M414 30 h12"/><text x="430" y="74">ymax</text>
    <text x="330" y="140" class="a">σ = M y / I</text>
  </svg>
  <figcaption>Figure 1 — Linear bending stress across the depth, zero at the neutral axis (sagging moment).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Bending equation', html: String.raw`
$$\frac{M}{I} = \frac{\sigma}{y} = \frac{E}{R}$$
<p>The neutral axis passes through the centroid of the section (since the net axial force is zero). The <strong>moment of resistance</strong> is \(M = \sigma_{max}Z\).</p>` },
        { title: 'Section modulus', html: String.raw`
<table class="tbl">
  <thead><tr><th>Section</th><th>\(Z = I/y_{max}\)</th></tr></thead>
  <tbody>
    <tr><td>Rectangle \(b × d\)</td><td>\(bd^2/6\)</td></tr>
    <tr><td>Hollow rectangle</td><td>\((BD^3 - bd^3)/(6D)\)</td></tr>
    <tr><td>Circle \(D\)</td><td>\(\pi D^3/32\)</td></tr>
    <tr><td>Hollow circle</td><td>\(\pi(D_o^4 - D_i^4)/(32D_o)\)</td></tr>
  </tbody>
</table>
<p><strong>Flitched beams</strong> (timber with steel plates): strain is equal at equal \(y\), so \(\sigma_s = m\,\sigma_w\) with \(m = E_s/E_w\); the steel is replaced by an equivalent timber width \(m\) times larger.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Problem 7.13 — water main as a beam', html: String.raw`
<div class="ex">
  <div class="ex-head">Cast-iron water main, internal diameter 500 mm, 20 mm thick, running full, supported at two points 10 m apart. Cast iron 72 000 N/m³, water 10 000 N/m³.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(D_o = 540\) mm; \(I = \frac{\pi}{64}(540^4 - 500^4) = 1.106×10^9\) mm⁴.</li>
      <li>Weight per metre: pipe \(72\,000 × 0.0327 = 2354\) N; water \(10\,000 × 0.196 = 1960\) N; total \(w = 4314\) N/m.</li>
      <li>\(M = wL^2/8 = 4314 × 10^2/8 = 53\,925\) N·m.</li>
      <li>\(\sigma_{max} = \dfrac{53\,925×10^3}{1.106×10^9} × 270\)
        <span class="result">σmax = 13.2 N/mm²</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 7.14 — I-section bracket', html: String.raw`
<div class="ex">
  <div class="ex-head">Cast-iron bracket: bottom flange 130 × 50, web 50 × 200, top flange 200 × 50 (mm); M = 40 MN·mm.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\bar y = \dfrac{6500(25) + 10\,000(150) + 10\,000(275)}{26\,500} = 166.5\) mm from the bottom.</li>
      <li>\(I = \left[\frac{130(50)^3}{12} + 6500(141.5)^2\right] + \left[\frac{50(200)^3}{12} + 10\,000(16.5)^2\right] + \left[\frac{200(50)^3}{12} + 10\,000(108.5)^2\right] = 287.4×10^6\) mm⁴.</li>
      <li>Bottom fibre (\(y\) = 166.5): \(\sigma = 40×10^6 × 166.5/287.4×10^6 = 23.2\) N/mm².</li>
      <li>Top fibre (\(y\) = 133.5): \(\sigma = 18.6\) N/mm².
        <span class="result">N.A. 166.5 mm from base; σ = 23.2 N/mm² (bottom), 18.6 N/mm² (top)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Neutral axis through the centroid; \(I\) about that axis.</li>
  <li>Unsymmetrical sections: use the larger \(y\) for the maximum stress, and check the weaker material side.</li>
  <li>Moment of resistance = permissible stress × \(Z\).</li>
</ul>` }
      ]
    }
  ]
});
