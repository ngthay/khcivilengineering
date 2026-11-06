/* Lesson 4 — Structural analysis and second-order effects (Handbook Ch. 4) */
KCE_COURSE.lessons.push({
  id: 'analysis',
  num: 4,
  title: 'Structural Analysis and Second-Order Effects',
  desc: 'Braced and sway frames, first- and second-order analysis, the moment amplification method, elastic buckling loads, effective length factors and the factor cm for unequal end moments.',
  icon: '📐',
  color: 'sky',
  meta: ['Ch. 4', 'δ_b = c_m/(1 − N*/N_om)', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A first-order elastic analysis assumes the structure does not deform. Under axial compression, however, the deflections add extra moments (\(P\delta\) along members, \(P\Delta\) from sway). AS 4100 allows these <strong>second-order effects</strong> to be included approximately by multiplying first-order moments by an <strong>amplification factor</strong>.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Braced member</th><td>\(\delta_b = \dfrac{c_m}{1 - N^*/N_{omb}} \ge 1\), \(c_m = 0.6 - 0.4\beta_m \le 1\)</td></tr>
    <tr><th>Sway member</th><td>\(\delta_s = \dfrac{1}{1 - 1/\lambda_c}\), \(\lambda_c\) = elastic buckling load factor of the storey</td></tr>
    <tr><th>Elastic buckling load</th><td>\(N_{om} = \dfrac{\pi^2EI}{(k_el)^2}\)</td></tr>
    <tr><th>Design moment</th><td>\(M^* = \delta M_m^*\); if \(\delta &gt; 1.4\) a full second-order analysis is required</td></tr>
  </tbody>
</table>
<p>\(\beta_m\) = ratio of the smaller to the larger end moment, positive for double curvature, negative for single curvature (−1 for a uniform moment).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Run a first-order elastic analysis for the factored loads.</li>
  <li>For each column find the end restraint ratios \(\gamma = \dfrac{\sum(I/l)_{columns}}{\sum\beta_e(I/l)_{beams}}\) (pinned base γ = 10, fixed base γ = 0.6) and read \(k_e\) from the alignment chart.</li>
  <li>Compute \(N_{om}\); if \(N^*/N_{om} &lt; 0.1\) second-order effects may be neglected.</li>
  <li>Otherwise compute \(c_m\), \(\delta_b\) (and \(\delta_s\) for sway frames) and amplify the moments.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 230" role="img" aria-label="P-delta and P-Delta effects">
    <path class="ln" d="M120 40 Q 150 120 120 200"/><path class="dim" d="M120 40 V200"/>
    <path class="acc" d="M120 10 V34"/><polygon class="accf" points="120,38 115,28 125,28"/><text x="128" y="20">N*</text>
    <text x="146" y="124" class="m">δ</text><text x="70" y="226" class="m">P-δ (member)</text>
    <path class="ln" d="M330 200 L360 50 M450 200 L480 50 M360 50 H480"/><path class="dim" d="M330 200 V50 M450 200 V50"/>
    <path class="acc" d="M360 20 V44 M480 20 V44"/><polygon class="accf" points="360,48 355,38 365,38"/><polygon class="accf" points="480,48 475,38 485,38"/>
    <text x="336" y="80" class="m">Δ</text><text x="360" y="226" class="m">P-Δ (sway)</text>
  </svg>
  <figcaption>Figure 1 — Second-order effects: member curvature (P-δ) and storey sway (P-Δ).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Effective length factors', html: String.raw`
<table class="tbl num">
  <thead><tr><th>End conditions (braced member)</th><th>k_e</th></tr></thead>
  <tbody>
    <tr><td>Both ends pinned</td><td>1.0</td></tr>
    <tr><td>One fixed, one pinned</td><td>0.85</td></tr>
    <tr><td>Both ends fixed</td><td>0.7</td></tr>
    <tr><td>Sway: fixed – free (cantilever)</td><td>2.2</td></tr>
    <tr><td>Sway: fixed – fixed against rotation</td><td>1.2</td></tr>
  </tbody>
</table>
<p>The values above already include allowance for imperfect fixity (theoretical 0.5 and 2.0 become 0.7 and 2.2).</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Example 4.1 — braced frame column', html: String.raw`
<div class="ex">
  <div class="ex-head">In a braced two-storey frame, ground-floor column 1-3 (150UC30.0, \(I = 17.6\times10^6\) mm⁴, l = 4000 mm, pinned base) carries \(N^* = 194\) kN, with end moments 0 (base) and 24.8 kN·m (top). Check whether amplification is needed.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\gamma_1 = 10\) (pinned), \(\gamma_3 = 0.764\) → alignment chart \(k_e = 0.84\); \(l_e = 0.84(4000) = 3360\) mm.</li>
      <li>\(N_{om} = \dfrac{\pi^2(200\times10^3)(17.6\times10^6)}{3360^2} = 3080\) kN; \(N^*/N_{om} = 0.063 &lt; 0.1\) → second-order effects negligible.</li>
      <li>Illustration: \(\beta_m = 0\) → \(c_m = 0.6\); \(\delta_b = \dfrac{0.6}{1 - 0.063} = 0.640 &lt; 1\) → use \(\delta_b = 1.0\).
        <span class="result">δ_b = 1.0 — the first-order moments are the design moments</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Classify the frame as braced or sway before choosing \(k_e\).</li>
  <li>Never take \(\delta_b\) below 1.0.</li>
  <li>Sway frames with \(\delta_s &gt; 1.4\) need a rigorous second-order analysis.</li>
</ul>` }
      ]
    }
  ]
});
