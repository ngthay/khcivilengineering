/* Lesson 13 — Structural framing (Handbook Ch. 10) */
KCE_COURSE.lessons.push({
  id: 'framing',
  num: 13,
  title: 'Structural Framing, Fire, Fatigue and Corrosion',
  desc: 'Mill-type buildings, roof trusses, portal frames, low-rise frames and bracing, purlins and girts, industrial floors, crane runway girders, deflection limits, fire resistance, fatigue and corrosion protection.',
  icon: '🏭',
  color: 'blue',
  meta: ['Ch. 10', 'Systems & durability', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Members and connections come together in a <strong>framing system</strong>. The choice of system — trusses, portal frames, braced or rigid frames — decides the loads in every member, the stability of the whole building and much of its cost. Durability (corrosion), fire and fatigue complete the design.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Portal frames</th><td>The most common single-storey industrial frame: rigid knee and apex, pinned or fixed bases, spans 15 – 50 m, bays 6 – 9 m; purlins and girts restrain rafters and columns.</td></tr>
    <tr><th>Roof trusses</th><td>Long spans and light loads; Pratt, Howe, Warren, fan; ratio depth/span ≈ 1/10 – 1/15; loads at panel points.</td></tr>
    <tr><th>Low-rise frames</th><td>Simple (pinned) beams with braced cores or X-bracing; or rigid frames resisting sway by bending.</td></tr>
    <tr><th>Purlins and girts</th><td>Cold-formed Z and C sections, continuous or lapped, with bridging; designed for wind uplift (0.9G + W_u).</td></tr>
    <tr><th>Crane runway girders</th><td>Wheel loads with impact, lateral surge on the top flange, fatigue, tight deflection limits.</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose the framing system and a clear load path to the foundations for vertical and horizontal loads.</li>
  <li>Provide bracing in roof and walls (or rigid frames) so every direction is stable.</li>
  <li>Design members and connections (Lessons 5 – 12).</li>
  <li>Check serviceability: deflection limits and sway.</li>
  <li>Specify fire protection, corrosion protection and fatigue details as required.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 230" role="img" aria-label="Portal frame building">
    <path class="ln" d="M80 200 V100 L260 50 L440 100 V200"/>
    <g class="thin"><path d="M100 95 L120 89 M140 84 L160 78 M180 73 L200 67 M220 62 L240 56 M280 56 L300 62 M320 67 L340 73 M360 78 L380 84 M400 89 L420 95"/></g>
    <path class="dim" d="M80 200 L440 100 M80 100 L440 200"/>
    <text x="230" y="40" class="a">apex</text><text x="40" y="96" class="m">knee</text><text x="232" y="140" class="m">wall bracing (X)</text>
    <text x="150" y="222" class="m">span 15 – 50 m · bays 6 – 9 m</text>
  </svg>
  <figcaption>Figure 1 — Portal frame with purlins and bracing.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Deflection limits (typical, AS 4100 Appendix B)', html: String.raw`
<table class="tbl num">
  <thead><tr><th>Element</th><th>Limit</th></tr></thead>
  <tbody>
    <tr><td>Beams, general</td><td>span / 250</td></tr>
    <tr><td>Beams supporting brittle finishes / masonry</td><td>span / 500 (live load)</td></tr>
    <tr><td>Cantilevers</td><td>length / 125</td></tr>
    <tr><td>Portal frame column sway (wind, service)</td><td>height / 150 (cladding dependent)</td></tr>
    <tr><td>Crane runway girders, vertical</td><td>span / 600 – 1000</td></tr>
  </tbody>
</table>` },
        { title: 'Fire, fatigue and corrosion', html: String.raw`
<ul>
  <li><strong>Fire:</strong> steel keeps about half its strength near 550 °C. AS 4100 Section 12 gives the limiting temperature from the load ratio and the time to reach it from the exposed surface area to mass ratio \(k_{sm}\); protect with boards, sprays, intumescent paint or concrete encasement to achieve the required fire resistance level.</li>
  <li><strong>Fatigue:</strong> repeated stress ranges (cranes, bridges, machinery) can crack welds at stresses far below yield. AS 4100 Section 11 gives S–N curves for detail categories; capacity depends on the stress range and number of cycles — good detailing (smooth transitions, no intermittent welds) matters most.</li>
  <li><strong>Corrosion:</strong> select the protection by environment (AS/NZS 2312): paint systems, hot-dip galvanizing, or weathering steel; avoid water traps and crevices; allow access for maintenance.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Deflection check of a roof beam', html: String.raw`
<div class="ex">
  <div class="ex-head">An 8 m simply supported roof beam (\(I_x = 238\times10^6\) mm⁴) carries a service load of 6 kN/m. Check the span/250 limit.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\delta = \dfrac{5wL^4}{384EI} = \dfrac{5(6)(8000)^4}{384(200\,000)(238\times10^6)} = 6.7\) mm.</li>
      <li>Limit \(8000/250 = 32\) mm ✓.
        <span class="result">δ = 6.7 mm ≪ 32 mm — satisfactory</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Every building needs a complete bracing system in both directions and in the roof plane.</li>
  <li>Design purlins and fixings for wind uplift.</li>
  <li>Plan fire, corrosion and fatigue protection at the concept stage — they are hard to add later.</li>
</ul>` }
      ]
    }
  ]
});
