/* Lesson 8 — Settlement of shallow foundations (CCES Foundation Ch. 1 §XII) */
KCE_COURSE.lessons.push({
  id: 'settlement',
  num: 8,
  title: 'Settlement of Shallow Foundations',
  desc: 'Immediate settlement by elasticity, shape factor Cf and Poisson’s ratio, modulus from field tests, layered immediate settlement, the depth of influence, and consolidation settlement of clay.',
  icon: '📉',
  color: 'violet',
  meta: ['Ch. 1 §XII', 'S = S_i + S_c + S_s', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Total settlement \(S = S_i + S_c + S_s\). In sand and gravel only the <strong>immediate</strong> settlement \(S_i\) matters; in clay and silt the <strong>consolidation</strong> settlement \(S_c\) dominates and is studied with the oedometer (Soil Mechanics, Lesson 8); in organic soil the <strong>secondary</strong> settlement \(S_s\) can be large.</p>` },
        { title: 'Description', html: String.raw`
$$S_i = qB\frac{1 - \mu^2}{E}C_f$$
<table class="tbl num">
  <thead><tr><th>Shape</th><th>Flexible: centre</th><th>corner</th><th>average</th><th>Rigid</th></tr></thead>
  <tbody>
    <tr><td>Circle</td><td>1.00</td><td>0.64</td><td>0.85</td><td>0.79</td></tr>
    <tr><td>Square</td><td>1.12</td><td>0.56</td><td>0.95</td><td>0.82</td></tr>
    <tr><td>L/B = 1.5</td><td>1.36</td><td>0.68</td><td>1.15</td><td>1.06</td></tr>
    <tr><td>L/B = 5</td><td>2.10</td><td>1.05</td><td>1.83</td><td>1.70</td></tr>
    <tr><td>L/B = 10</td><td>2.54</td><td>1.27</td><td>2.25</td><td>2.10</td></tr>
  </tbody>
</table>
<p>Poisson’s ratio μ: saturated clay 0.40 – 0.50, unsaturated clay 0.10 – 0.30, silt 0.30 – 0.40, sand 0.15 – 0.40, rock 0.10 – 0.40, concrete 0.15.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Get E from tests or correlations: \(E = 766N\) (kPa, SPT), \(E = 2q_c\) (CPT), \(E = 250c_u\) (undrained clay); typical E (MPa): soft clay 2 – 4, stiff clay 7 – 20, loose sand 10 – 25, dense sand 50 – 100.</li>
  <li>Single uniform layer: use the formula above.</li>
  <li>Layered soil: split into sub-layers about 0.4B thick; for each \(S = \dfrac{\beta\sigma_vh}{E}\) with \(\sigma_v\) the average stress increase in the sub-layer (corner factors \(I_c\)).</li>
  <li>Stop at the depth where \(\sigma_v \approx 0.2\sigma'_o\) (stress increase small compared with the overburden).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 230" role="img" aria-label="Settlement example soil profile">
    <path class="dim" d="M20 40 H500"/><rect class="conc" x="190" y="70" width="140" height="20"/><rect class="conc" x="248" y="40" width="24" height="30"/>
    <path class="acc" d="M262 10 V36"/><polygon class="accf" points="262,40 257,30 267,30"/><text x="272" y="22">Q = 780 kN</text>
    <rect class="soil" x="20" y="90" width="480" height="90"/><path class="ln" d="M20 180 H500"/>
    <text x="40" y="130" class="m">saturated sand: γ_sat = 22 kN/m³, E = 35 000 kPa</text><text x="40" y="200" class="m">clay (2 m)</text>
    <path class="dim" d="M440 40 V90 M440 90 V180"/><text x="448" y="70" class="m">1.5 m</text><text x="448" y="140" class="m">4.5 m</text>
    <text x="230" y="110" class="m">B = L = 2 m</text>
  </svg>
  <figcaption>Figure 1 — Square footing on saturated sand over clay.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Does the clay layer matter?', html: String.raw`
<p>Before computing consolidation of a deep clay layer, compare the stress the footing adds there with the effective overburden: if \(\Delta\sigma_v \lesssim 0.2\sigma'_o\), the influence is negligible. With the 2:1 spread \(\Delta\sigma_v = Q/(B + z)^2\).</p>
<p>For a clay within the influence depth use the consolidation formulas with \(C_c\), \(C_s\), \(\sigma'_p\) (Soil Mechanics, Lesson 8). \(\sigma'_p\) can be estimated in the field: \(\sigma'_p = 0.193\sigma'_o(N/\sigma'_o)^{0.689}\) (Mayne & Kemper 1988), \(\sigma'_p = 7.04c_u^{0.83}\) (Mitchell 1988).</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Immediate settlement of a square footing', html: String.raw`
<div class="ex">
  <div class="ex-head">The rigid 2 m × 2 m footing of Figure 1 carries 780 kN; \(\mu = 0.4\). Is the clay at 6 m affected, and what is the immediate settlement?</div>
  <div class="ex-body">
    <ol class="steps">
      <li>At the clay: \(\Delta\sigma_v = 780/(2 + 4.5)^2 = 18.4\) kPa; \(\sigma'_o = 20(1.5) + 12(4.5) = 84\) kPa; \(0.2\sigma'_o = 16.8\) kPa ≈ \(\Delta\sigma_v\) → the clay is hardly affected.</li>
      <li>\(q = 780/4 = 195\) kPa; rigid square \(C_f = 0.82\):
        $$S_i = 195(2)\frac{1 - 0.4^2}{35\,000}(0.82) = 0.0077\ \text{m}$$
        <span class="result">S_i ≈ 7.7 mm — acceptable</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use the rigid factor for thick concrete footings, flexible factors for tanks and embankments.</li>
  <li>Typical limits: 25 mm total for isolated footings on sand, 50 mm for rafts.</li>
  <li>Differential settlement between columns usually governs damage.</li>
</ul>` }
      ]
    }
  ]
});
