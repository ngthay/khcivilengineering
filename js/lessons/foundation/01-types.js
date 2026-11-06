/* Lesson 1 — Foundation types and failure modes (CCES Foundation, Introduction) */
KCE_COURSE.lessons.push({
  id: 'types',
  num: 1,
  title: 'Foundation Types and Failure Modes',
  desc: 'Shallow, semi-deep and deep foundations, spread, strip and mat footings, end-bearing, friction and floating piles, the load–settlement curve, general, local and punching shear, and types of settlement.',
  icon: '🏛️',
  color: 'peach',
  meta: ['Introduction', 'D/B ratio', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The <strong>foundation</strong> is the lowest part of a structure. It receives all the loads from the columns and walls and transfers them safely to the soil below and around it. Two conditions must always be met: the soil must not fail in shear (<strong>bearing capacity</strong>), and the settlement must stay within acceptable limits.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Group</th><th>Depth ratio</th><th>Types</th></tr></thead>
  <tbody>
    <tr><td>Shallow</td><td>\(D/B &lt; 4\)</td><td>Spread (isolated) footing \(L/B &lt; 10\); strip footing \(L/B &gt; 10\); mat (raft)</td></tr>
    <tr><td>Semi-deep</td><td>\(4 \le D/B &lt; 10\)</td><td>Deep footings, piers — side friction also counts</td></tr>
    <tr><td>Deep (piles)</td><td>\(D/B \ge 10\)</td><td>End-bearing, combined end + friction, floating (friction) piles</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Use spread footings where good soil is close to the surface; strip footings under walls.</li>
  <li>Use a mat when the soil is weak and isolated footings would cover more than about half the plan area, or to reduce differential settlement.</li>
  <li>Use piles when the good layer is deep: end-bearing on rock or dense sand, friction piles in thick soft soil.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 540 240" role="img" aria-label="Load–settlement curves">
    <path class="thin" d="M60 30 H510 M60 30 V220"/>
    <path class="acc" d="M60 30 Q 250 40, 330 80 L 340 220"/>
    <path class="ln" d="M60 30 Q 200 60, 300 140 Q 360 190, 420 220"/>
    <path class="dim" d="M60 30 Q 180 90, 240 220"/>
    <text x="300" y="72" class="m">1 dense soil (general shear)</text><text x="370" y="180" class="m">2 medium (local shear)</text><text x="160" y="200" class="m">3 loose (punching)</text>
    <text x="470" y="24" class="m">σ (kPa)</text><text x="20" y="214" class="m">S (mm)</text>
  </svg>
  <figcaption>Figure 1 — Load–settlement curves: a clear peak (dense soil) or continuing settlement (loose soil).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Failure modes', html: String.raw`
<ul>
  <li><strong>General shear failure</strong> (dense sand, stiff clay): a continuous slip surface reaches the ground surface, the soil heaves beside the footing and the footing tilts; the load–settlement curve has a clear peak.</li>
  <li><strong>Local shear failure</strong> (medium soil): slip surfaces form only near the footing; the surface heaves slightly; no clear peak.</li>
  <li><strong>Punching shear failure</strong> (loose sand, soft clay): the footing sinks vertically, shearing the soil around its edges; no heave.</li>
</ul>` },
        { title: 'Types of settlement', html: String.raw`
<p>Total settlement \(S = S_i + S_c + S_s\): immediate (elastic) settlement, primary consolidation and secondary compression. Sand settles almost entirely immediately; clay mainly by consolidation over time; organic soils have large secondary settlement.</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Choosing the foundation group', html: String.raw`
<div class="ex">
  <div class="ex-head">Classify: (a) a 2 m wide footing at 1.5 m depth; (b) a 1.2 m wide pier founded at 7 m; (c) a 0.4 m pile driven 12 m.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) \(D/B = 0.75 &lt; 4\) → shallow.</li>
      <li>(b) \(D/B = 5.8\) → semi-deep: include side friction.</li>
      <li>(c) \(D/B = 30 &gt; 10\) → deep foundation (pile).
        <span class="result">shallow · semi-deep · deep</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Check both bearing capacity and settlement — either can govern.</li>
  <li>Loose and soft soils fail by local or punching shear: use reduced strength parameters.</li>
  <li>Consider differential settlement between neighbouring footings.</li>
</ul>` }
      ]
    }
  ]
});
