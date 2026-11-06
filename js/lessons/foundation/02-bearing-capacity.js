/* Lesson 2 — Bearing capacity of shallow foundations (CCES Foundation Ch. 1 §I) */
KCE_COURSE.lessons.push({
  id: 'bearing-capacity',
  num: 2,
  title: 'Bearing Capacity: Terzaghi’s Equation',
  desc: 'Failure zones under a strip footing, the cohesion, surcharge and self-weight terms, bearing capacity factors, local shear with reduced c and φ, and undrained clay.',
  icon: '🧱',
  color: 'mint',
  meta: ['Ch. 1', 'q_d = cN꜀ + γDN_q + ½γBN_γ', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Under a strip footing of width \(B\) at depth \(D\), the soil at failure forms three zones: an active wedge under the footing (Rankine zone I), radial shear zones (Prandtl zone II) and passive zones pushed up beside the footing (Rankine zone III). The soil above footing level is treated as a surcharge \(\gamma_sD\). Terzaghi and Caquot (1943) combined the three resistances into one equation.</p>` },
        { title: 'Description', html: String.raw`
$$q_d = cN_c + \gamma_sDN_q + \tfrac12\gamma BN_\gamma$$
<table class="tbl">
  <tbody>
    <tr><th>\(N_q\)</th><td>\(\tan^2\left(\dfrac{\pi}{4} + \dfrac{\varphi}{2}\right)e^{\pi\tan\varphi}\) (Reissner 1924)</td></tr>
    <tr><th>\(N_c\)</th><td>\((N_q - 1)\cot\varphi\) (Prandtl 1921); \(N_c = 5.14\) for \(\varphi = 0\)</td></tr>
    <tr><th>\(N_\gamma\)</th><td>\(2(N_q + 1)\tan\varphi\) (Caquot & Kérisel 1953)</td></tr>
  </tbody>
</table>
<table class="tbl num">
  <thead><tr><th>φ</th><th>0°</th><th>10°</th><th>20°</th><th>25°</th><th>30°</th><th>35°</th><th>40°</th></tr></thead>
  <tbody>
    <tr><th>N꜀</th><td>5.14</td><td>8.34</td><td>14.83</td><td>20.72</td><td>30.14</td><td>46.12</td><td>75.31</td></tr>
    <tr><th>N_q</th><td>1.00</td><td>2.47</td><td>6.40</td><td>10.66</td><td>18.40</td><td>33.30</td><td>64.20</td></tr>
    <tr><th>N_γ</th><td>0</td><td>1.22</td><td>5.39</td><td>10.88</td><td>22.40</td><td>48.03</td><td>109.41</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Get \(c\), \(\varphi\), \(\gamma\) of the soil under the footing and \(\gamma_s\) of the soil above it.</li>
  <li>Dense or stiff soil (N &gt; 30 sand, N &gt; 50 gravel): use \(c\), \(\varphi\) as measured. Medium or loose soil: <strong>local shear</strong> — \(c' = \tfrac23c\), \(\tan\varphi' = \tfrac23\tan\varphi\).</li>
  <li>Read or compute \(N_c, N_q, N_\gamma\) and evaluate \(q_d\); the load per metre of strip is \(q_dB\).</li>
  <li>Saturated clay, short term (\(\varphi_u = 0\)): \(q_d = 5.14c_u + \gamma_sD\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 230" role="img" aria-label="Failure zones under a strip footing">
    <path class="dim" d="M20 60 H540"/><rect class="conc" x="230" y="60" width="100" height="20"/><rect class="conc" x="270" y="20" width="20" height="40"/>
    <path class="ln" d="M230 80 L280 140 L330 80"/>
    <path class="ln" d="M230 80 Q 190 170, 140 140 L 60 80 M330 80 Q 370 170, 420 140 L 500 80"/>
    <path class="thin" d="M280 140 Q 220 180 140 140 M280 140 Q 340 180 420 140"/>
    <text x="270" y="110" class="a">I</text><text x="200" y="140" class="a">II</text><text x="350" y="140" class="a">II</text><text x="110" y="100" class="a">III</text><text x="440" y="100" class="a">III</text>
    <text x="40" y="52" class="m">surcharge γₛD</text><text x="268" y="200" class="m">B</text>
    <text x="60" y="210" class="m">I Rankine active · II Prandtl radial shear · III Rankine passive</text>
  </svg>
  <figcaption>Figure 1 — The three failure zones under a strip footing (general shear).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Meaning of the three terms', html: String.raw`
<ul>
  <li>\(cN_c\) — resistance from cohesion along the slip surfaces.</li>
  <li>\(\gamma_sDN_q\) — resistance from the surcharge (embedment); deeper footings gain capacity quickly.</li>
  <li>\(\tfrac12\gamma BN_\gamma\) — resistance from the weight of the soil in the failure zone; grows with the footing width.</li>
</ul>
<div data-widget="bearing-capacity" data-title="Bearing capacity — general equation"></div>
<p><em>Defaults reproduce the strip-footing example below (L = 0 means a strip). Set “Local shear” to 0 for dense soils.</em></p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Strip footing on medium sand', html: String.raw`
<div class="ex">
  <div class="ex-head">A strip footing 2 m wide is founded at 1.5 m in a medium (not dense) silty sand: \(\gamma = 18\) kN/m³, \(c = 4\) kPa, \(\varphi = 30°\). Find the ultimate bearing capacity and the ultimate load per metre.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Local shear: \(c' = \tfrac23(4) = 2.66\) kPa; \(\tan\varphi' = \tfrac23\tan30° = 0.38\) → \(\varphi' = 21°\): \(N_c = 15.82\), \(N_q = 7.07\), \(N_\gamma = 6.20\).</li>
      <li>$$q_d = 2.66(15.82) + 18(1.5)(7.07) + \tfrac12(18)(2)(6.20) = 344.6\ \text{kPa}$$</li>
      <li>Per metre: \(Q = q_dB = 344.6 \times 2 = 689\) kN/m <em>(the notes print 669.14)</em>.
        <span class="result">q_d = 344.6 kPa, Q_ult = 689 kN/m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Decide general or local shear before choosing \(c\), \(\varphi\).</li>
  <li>\(\gamma_s\) is the soil <em>above</em> the base; \(\gamma\) the soil <em>below</em>.</li>
  <li>For clay check the short-term case with \(c_u\), \(\varphi = 0\).</li>
</ul>` }
      ]
    }
  ]
});
