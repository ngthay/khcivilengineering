/* Lesson 11 — Slope stability (CCES Foundation Ch. 4) */
KCE_COURSE.lessons.push({
  id: 'slope-stability',
  num: 11,
  title: 'Slope Stability',
  desc: 'Types of slope failure, plane failure of vertical cuts and the critical height, Culmann’s method, circular failure with Taylor’s chart and Bishop’s method, the method of slices (Fellenius), and infinite slopes.',
  icon: '⛰️',
  color: 'mint',
  meta: ['Ch. 4', 'FS = resisting / driving', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Where a retaining wall cannot be built (long roads, dams, canals), earth slopes must stand by themselves. Slopes fail by falls at the foot of steep cliffs, sliding of weak layers over a firm base, flows after rain or deforestation, and creep. Stability is measured by the <strong>factor of safety</strong> — resisting shear strength over the driving shear stress along the most critical surface.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Vertical cut, critical height</th><td>\(H_c = \dfrac{4c}{\gamma}\tan\left(\dfrac\pi4 + \dfrac\varphi2\right)\); \(FS = H_c/H\)</td></tr>
    <tr><th>Plane slope (Culmann)</th><td>\(H_{max} = \dfrac{4c}{\gamma}\cdot\dfrac{\sin\theta\cos\varphi}{1 - \cos(\theta - \varphi)}\); for \(\varphi = 0\): \(H_{max} = \dfrac{4c}{\gamma\tan(\theta/2)}\)</td></tr>
    <tr><th>Infinite slope</th><td>\(H = \dfrac{c}{\gamma\cos\beta\sin(\beta - \varphi)}\) (cohesive); \(FS = \tan\varphi/\tan\beta\) (sand)</td></tr>
    <tr><th>Method of slices (Fellenius)</th><td>\(FS = \dfrac{\sum\left[c_i\Delta L_i + W_i\cos\alpha_i\tan\varphi_i\right]}{\sum W_i\sin\alpha_i}\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose a trial slip circle (centre O, radius R).</li>
  <li>Divide the sliding mass into vertical slices; for each slice find its weight \(W_i\), base angle \(\alpha_i\), base length \(\Delta L_i\) and the soil parameters at its base.</li>
  <li>Compute FS with the slices formula; with water subtract \(u_i\Delta L_i\) from the normal force: \(FS = \dfrac{\sum[c\Delta L + (W\cos\alpha - u\Delta L)\tan\varphi]}{\sum W\sin\alpha}\).</li>
  <li>Repeat for other circles; the lowest FS is the factor of safety of the slope (require FS ≥ 1.5).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 540 250" role="img" aria-label="Method of slices">
    <path class="ln" d="M20 210 H160 L360 60 H520"/>
    <path class="acc" d="M130 210 A 230 230 0 0 0 470 60"/>
    <g class="dim"><path d="M190 186 V222 M240 150 V230 M290 112 V226 M340 76 V212 M390 60 V188 M440 60 V128"/></g>
    <text x="250" y="200" class="m">W_i</text><text x="300" y="150" class="m">slice i</text>
    <text x="380" y="40" class="m">slip circle</text>
    <text x="40" y="236" class="m">FS = Σ(cΔL + W cosα tanφ) / Σ W sinα</text>
  </svg>
  <figcaption>Figure 1 — Sliding mass divided into slices along a trial circle.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Charts for circular failure', html: String.raw`
<p>For simple homogeneous slopes, Taylor’s and Bishop’s charts give the critical circle directly from the slope angle β (e.g. for β &gt; 53° the circle passes through the toe; below 53° it may go deeper), and the stability number \(c/\gamma H\) as a function of φ and β. FS by Bishop’s simplified method is usually 5 – 10 % higher than by Fellenius.</p>
<p>FS definitions: cohesive \(FS = c/c_{required}\); frictional \(FS = \tan\varphi/\tan\varphi_{required}\); clean sand \(FS = \tan\varphi/\tan\theta\).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Critical height of a vertical cut', html: String.raw`
<div class="ex">
  <div class="ex-head">How deep can a vertical trench be cut in clay with \(c = 10\) kPa, \(\varphi = 0\), \(\gamma = 18\) kN/m³ without support?</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(H_c = \dfrac{4(10)}{18}\tan45° = 2.22\) m. With FS = 1.5: \(H = 1.48\) m.
        <span class="result">Unsupported depth ≈ 1.5 m — deeper trenches need shoring</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Method of slices — three-layer slope', html: String.raw`
<div class="ex">
  <div class="ex-head">A 60° cut through three layers (top \(\gamma = 19\), φ = 10°, c = 15; middle \(\gamma = 18\), φ = 28°, c = 0; bottom \(\gamma = 20\), φ = 14°, c = 25 kPa). The critical circle from the chart is divided into six slices.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Slice table (kN/m):
        <div class="tbl-wrap"><table class="tbl num">
          <thead><tr><th>Slice</th><th>W</th><th>α</th><th>ΔL</th><th>W sin α</th><th>W cos α</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>87.76</td><td>5.65°</td><td>2.30</td><td>8.61</td><td>87.42</td></tr>
            <tr><td>2</td><td>171.62</td><td>13.75°</td><td>1.73</td><td>40.79</td><td>166.69</td></tr>
            <tr><td>3</td><td>227.84</td><td>21.66°</td><td>1.67</td><td>84.30</td><td>211.89</td></tr>
            <tr><td>4</td><td>408.83</td><td>35.86°</td><td>3.72</td><td>239.57</td><td>331.15</td></tr>
            <tr><td>5</td><td>115.44</td><td>54.4°</td><td>2.08</td><td>93.85</td><td>67.19</td></tr>
            <tr><td>6</td><td>8.93</td><td>66°</td><td>0.627</td><td>8.15</td><td>3.63</td></tr>
          </tbody>
        </table></div></li>
      <li>\(\sum c\,\Delta L = 285.1\); \(\sum W\cos\alpha\tan\varphi = 235.1\); \(\sum W\sin\alpha = 475.3\).</li>
      <li>$$FS = \frac{285.1 + 235.1}{475.3} = 1.09$$
        <span class="result">FS = 1.09 &lt; 1.5 — the cut is unsafe: flatten it or support it</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Try many circles — the answer is the minimum FS.</li>
  <li>Include pore pressure; rain and rising water are the usual triggers of failure.</li>
  <li>Use the parameters of the layer in which each slice base lies.</li>
</ul>` }
      ]
    }
  ]
});
