/* Lesson 4 — Strain energy and impact loading (Bansal, Ch. 4) */
KCE_COURSE.lessons.push({
  id: 'strain-energy',
  num: 4,
  title: 'Strain Energy and Impact Loading',
  desc: 'Resilience and proof resilience; stresses from gradual, sudden and impact loads; shear strain energy.',
  icon: '⚡',
  color: 'amber',
  meta: ['Bansal Ch. 4', 'Energy methods', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Work done by a load in deforming a body is stored as <strong>strain energy</strong> \(U\) and released when the load is removed (within the elastic limit). The way a load is applied changes the stress: a <strong>suddenly applied</strong> load produces twice the stress of the same load applied gradually, and a load <strong>falling from a height</strong> can produce many times more.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Resilience</th><td>Total strain energy stored in a body, \(U = \dfrac{\sigma^2}{2E}V\)</td></tr>
    <tr><th>Proof resilience</th><td>Strain energy stored at the elastic limit</td></tr>
    <tr><th>Modulus of resilience</th><td>Proof resilience per unit volume, \(\sigma_{el}^2/(2E)\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Decide how the load is applied: gradually, suddenly or with impact.</li>
  <li>Equate work done by the load to the strain energy stored, \(\frac{\sigma^2}{2E}AL\).</li>
  <li>Solve for the instantaneous stress; then \(\delta L = \sigma L/E\) and \(U = \sigma^2AL/(2E)\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 600 240" role="img" aria-label="Load falling on a collar">
    <rect class="thin" x="40" y="10" width="140" height="8"/><path class="ln" d="M110 18 V200"/>
    <rect class="conc" x="96" y="18" width="28" height="180"/>
    <rect class="ln" x="86" y="198" width="48" height="10"/>
    <rect class="comp" x="88" y="70" width="44" height="22"/><text x="138" y="86">P</text>
    <path class="dim" d="M150 92 V198"/><text x="156" y="150">h</text>
    <text x="20" y="232" class="m">bar L, A, E; collar at the end</text>
    <line class="thin" x1="300" y1="210" x2="580" y2="210"/><line class="thin" x1="300" y1="210" x2="300" y2="30"/>
    <path class="acc" d="M300 210 L520 60"/><path class="dim" d="M520 60 V210"/>
    <text x="400" y="184" class="m">U = ½ P δL (area)</text><text x="560" y="228">δL</text><text x="272" y="40">P</text>
  </svg>
  <figcaption>Figure 1 — Impact load P falling through h onto a collar; the strain energy is the area under the load–extension line.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Gradual, sudden and impact loads', html: String.raw`
<table class="tbl">
  <thead><tr><th>Loading</th><th>Stress</th></tr></thead>
  <tbody>
    <tr><td>Gradually applied</td><td>\(\sigma = P/A\)</td></tr>
    <tr><td>Suddenly applied (\(h = 0\))</td><td>\(\sigma = 2P/A\)</td></tr>
    <tr><td>Impact, falling through \(h\)</td><td>\(\sigma = \dfrac{P}{A}\left(1 + \sqrt{1 + \dfrac{2AEh}{PL}}\right)\)</td></tr>
    <tr><td>Impact, \(\delta L \ll h\)</td><td>\(\sigma = \sqrt{2EPh/(AL)}\)</td></tr>
  </tbody>
</table>
<p>Impact formula derivation: \(P(h + \delta L) = \dfrac{\sigma^2}{2E}AL\) with \(\delta L = \sigma L/E\).</p>` },
        { title: 'Shear strain energy', html: String.raw`
$$U = \frac{\tau^2}{2G}V$$
<p>For a body with both direct and shear stresses, the energies add.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Problem 4.9 — 10 kN falling 30 mm', html: String.raw`
<div class="ex">
  <div class="ex-head">10 kN falls 30 mm onto a collar on a bar 4 m long, A = 1000 mm², E = 210 GPa. Find the instantaneous expansion.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\sigma = \dfrac{10\,000}{1000}\left(1 + \sqrt{1 + \dfrac{2 × 1000 × 2.1×10^5 × 30}{10\,000 × 4000}}\right) = 10(1 + \sqrt{316}) = 187.8\) N/mm².</li>
      <li>\(\delta L = \sigma L/E = 187.8 × 4000/2.1×10^5 = 3.58\) mm.
        <span class="result">σ = 187.8 N/mm², δL = 3.58 mm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 4.10 — 100 N falling 20 mm', html: String.raw`
<div class="ex">
  <div class="ex-head">100 N falls 2 cm onto a collar at the end of a bar 1.5 m long, A = 1.5 cm², E = 2×10⁵ N/mm².</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\sigma = \frac{100}{150}\left(1 + \sqrt{1 + \frac{2 × 150 × 2×10^5 × 20}{100 × 1500}}\right) = 60.3\) N/mm².</li>
      <li>\(\delta L = 60.3 × 1500/2×10^5 = 0.452\) mm.</li>
      <li>\(U = \frac{60.3^2}{2 × 2×10^5} × 225\,000 = 2045\) N·mm = 2.045 N·m.
        <span class="result">σ = 60.3 N/mm², δL = 0.452 mm, U = 2.05 N·m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 4.11 — unknown falling weight', html: String.raw`
<div class="ex">
  <div class="ex-head">Maximum extension 2.1 mm in a bar 3 m long, A = 5 cm², when a weight falls 4 cm. E = 2×10⁵ N/mm².</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\sigma = E\,\delta L/L = 2×10^5 × 2.1/3000 = 140\) N/mm².</li>
      <li>\(P(h + \delta L) = \frac{\sigma^2}{2E}V\): \(P(40 + 2.1) = \frac{140^2}{4×10^5} × 1.5×10^6 = 73\,500\) → \(P = 1746\) N.
        <span class="result">σ = 140 N/mm², P = 1.75 kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Include the extension \(\delta L\) in the fall height unless it is very small.</li>
  <li>Sudden load = twice the static stress.</li>
  <li>Check the instantaneous stress is within the elastic limit.</li>
</ul>` }
      ]
    }
  ]
});
