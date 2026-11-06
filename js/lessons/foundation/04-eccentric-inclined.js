/* Lesson 4 — Eccentric and inclined loads (CCES Foundation Ch. 1 §V) */
KCE_COURSE.lessons.push({
  id: 'eccentric-inclined',
  num: 4,
  title: 'Eccentric and Inclined Loads',
  desc: 'Effective width B′ = B − 2e, pressure distribution for e < B/6 and e > B/6, two-way eccentricity and effective area, inclination factors, and the sliding check.',
  icon: '↘️',
  color: 'lilac',
  meta: ['Ch. 1 §V', 'B′ = B − 2e', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Footings often carry a moment (wind, earthquake, crane) as well as a vertical load, or a load inclined to the vertical. The resultant then acts at an <strong>eccentricity</strong> \(e = M/Q\) from the centre: the contact pressure is no longer uniform and only part of the footing — the <strong>effective area</strong> — works in bearing (Meyerhof).</p>` },
        { title: 'Description', html: String.raw`
$$q_{max,min} = \frac{Q}{BL}\left(1 \pm \frac{6e}{B}\right)\quad (e \le B/6),\qquad q_{max} = \frac{4Q}{3L(B - 2e)}\quad (e > B/6)$$
<p>Bearing capacity with the effective width \(B' = B - 2e_B\) (and \(L' = L - 2e_L\)):</p>
$$q_{net} = \left(1 + 0.2\tfrac{B'}{L'}\right)cN_c + \gamma_sD(N_q - 1)\left(1 + \tfrac{B'}{L'}\tan\varphi\right) + \left(1 - 0.4\tfrac{B'}{L'}\right)\tfrac{\gamma B'}{2}N_\gamma$$` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>\(e_B = M_B/Q\), \(e_L = M_L/Q\); effective dimensions \(B'\), \(L'\) (if \(L' < B'\), swap them).</li>
  <li>Compute \(q_{net}\) with \(B'\), \(L'\) and \(q^{all}_{net} = q_{net}/F\).</li>
  <li>Compute \(q_{max}\) from the pressure distribution; require \(q^{all}_{net} \ge q_{max}\).</li>
  <li>For inclined loads multiply each term by an inclination factor and check sliding.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 240" role="img" aria-label="Eccentric load and pressure distribution">
    <rect class="conc" x="150" y="70" width="220" height="24"/><rect class="conc" x="248" y="20" width="24" height="50"/>
    <path class="acc" d="M290 10 V64"/><polygon class="accf" points="290,68 285,58 295,58"/><text x="296" y="22">Q</text>
    <path class="dim" d="M260 110 H290"/><text x="268" y="126" class="m">e</text>
    <path class="ln" d="M150 140 L370 140 L370 210 L150 165 Z"/>
    <text x="110" y="168" class="m">q_min</text><text x="378" y="200" class="m">q_max</text>
    <path class="dim" d="M150 228 H370"/><text x="256" y="240" class="m">B</text>
    <text x="400" y="90" class="a">B′ = B − 2e</text>
  </svg>
  <figcaption>Figure 1 — Eccentric load: trapezoidal contact pressure (e < B/6).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Inclined loads', html: String.raw`
<p>For a resultant \(R\) at angle \(\alpha\) to the vertical (Meyerhof):</p>
$$q_{net} = \lambda_{ci}\left(1 + 0.2\tfrac BL\right)cN_c + \lambda_{qi}\gamma_sD(N_q - 1)\left(1 + \tfrac BL\tan\varphi\right) + \lambda_{\gamma i}\left(1 - 0.4\tfrac BL\right)\tfrac{\gamma B}{2}N_\gamma$$
<p>\(\lambda_{ci} = \lambda_{qi} = (1 - \alpha/90°)^2\), \(\lambda_{\gamma i} = (1 - \alpha/\varphi)^2\). <strong>Sliding:</strong> \(H \le \dfrac1F(V\tan\delta + c_aB)\), with \(\delta = \tfrac23\varphi\) and adhesion \(c_a = \tfrac23c\) (drained) or \(c_a = \beta c_u\), \(\beta = 16.715c_u^{-0.7765}\) (undrained).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Footing with a moment', html: String.raw`
<div class="ex">
  <div class="ex-head">A 1.8 m × 1.8 m footing at D = 1.8 m carries Q = 1780 kN and \(M_B = 270\) kN·m. Loose soil: \(\gamma = 18\) kN/m³, \(c = 9.5\) kPa, \(\varphi = 36°\); F = 3.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(e_B = 270/1780 = 0.15\) m; \(B' = 1.80 - 0.30 = 1.50\) m.</li>
      <li>Local shear: \(c' = 6.33\) kPa, \(\varphi' = 26°\): \(N_c = 22.25\), \(N_q = 11.85\), \(N_\gamma = 12.54\).</li>
      <li>\(q_{net} = (1 + 0.2\tfrac{1.5}{1.8})6.33(22.25) + 18(1.8)(10.85)(1 + \tfrac{1.5}{1.8}\tan26°) + (1 - 0.4\tfrac{1.5}{1.8})18\tfrac{1.5}{2}(12.54) = 771.6\) kPa → \(q^{all}_{net} = 257.2\) kPa.</li>
      <li>\(6e = 0.9 &lt; B\): \(q_{max} = \dfrac{1780}{1.8^2}\left(1 + \dfrac{6(0.15)}{1.8}\right) = 824\) kPa.
        <span class="result">257 kPa &lt; 824 kPa — the footing is NOT safe; enlarge it</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Inclined load', html: String.raw`
<div class="ex">
  <div class="ex-head">A 2 m × 3 m footing at D = 2 m carries R = 1000 kN inclined at 30° to the vertical; \(\gamma_s = 20\), \(\gamma = 19.5\) kN/m³, \(c' = 15\) kPa, \(\varphi' = 28°\); F = 2.5.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(H = 1000\sin30° = 500\) kN, \(V = 1000\cos30° = 866\) kN.</li>
      <li>\(\lambda_{ci} = \lambda_{qi} = (1 - 30/90)^2 = 0.44\); \(\lambda_{\gamma i} = (1 - 30/28)^2 = 0.005\); \(N_c = 25.8\), \(N_q = 14.72\), \(N_\gamma = 16.72\).</li>
      <li>\(q_{net} \approx 521\) kPa → \(q_{all} = 208\) kPa \(&gt; V/BL = 866/6 = 144.3\) kPa ✓.</li>
      <li>Sliding: \(\tau = 144.3\tan18.67° + 10 = 58.8\) kPa → \(\tau_{all} = 29.4\) kPa \(&lt; H/BL = 83.3\) kPa ✗.
        <span class="result">Bearing is OK but the footing slides — add a key, tie beams or reduce H</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Keep \(e \le B/6\) where possible so the whole base stays in compression.</li>
  <li>Always check sliding when there is a horizontal load.</li>
  <li>For two-way eccentricity use the effective-area charts (Highter & Anders 1985).</li>
</ul>` }
      ]
    }
  ]
});
