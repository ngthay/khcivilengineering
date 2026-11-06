/* Lesson 11 — Welded connections (Handbook Ch. 8 §8.5–8.10) */
KCE_COURSE.lessons.push({
  id: 'welded',
  num: 11,
  title: 'Welded Connections',
  desc: 'Welding processes and electrodes, butt and fillet welds, weld categories SP and GP, fillet weld capacity, weld groups under eccentric load, and design of connections as a whole (beam-to-column, base plates, splices).',
  icon: '⚡',
  color: 'amber',
  meta: ['Ch. 8 §8.5–8.10', 'φv_w = φ0.6f_uwt_tk_r', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Welding fuses steel parts into one piece — ideal for shop fabrication, rigid joints and clean appearance. The two main weld types are <strong>butt welds</strong> (complete or incomplete penetration, as strong as the parent plate when complete) and <strong>fillet welds</strong> (triangular, loaded in shear through the throat).</p>` },
        { title: 'Description', html: String.raw`
$$\varphi v_w = \varphi\,0.6f_{uw}t_tk_r\quad (\text{kN/mm of weld}),\qquad t_t = \frac{t_w}{\sqrt2}\ \text{(equal-leg fillet)}$$
<table class="tbl num">
  <tbody>
    <tr><th>Electrode E41XX / E48XX</th><td>\(f_{uw}\) = 410 / 480 MPa</td></tr>
    <tr><th>φ — SP category</th><td>0.8 (structural purpose; 0.9 complete-penetration butt welds)</td></tr>
    <tr><th>φ — GP category</th><td>0.6 (general purpose)</td></tr>
    <tr><th>k_r</th><td>1.0 for welds up to 1.7 m long (reduced for longer lap joints)</td></tr>
  </tbody>
</table>
<p>Minimum fillet leg (AS 4100 Table 9.7.3.2), by the thicker part joined: 3 mm (≤ 7 mm), 4 mm (7 – 10 mm), 5 mm (10 – 15 mm), 6 mm (&gt; 15 mm).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose weld type, electrode and category; pick a leg size matching the thinner part.</li>
  <li>Capacity per mm \(\varphi v_w\); required length \(l_w = N^*/\varphi v_w\).</li>
  <li>Arrange the weld so its centroid is close to the member’s centroidal axis (balanced welds), especially under fatigue.</li>
  <li>For eccentric weld groups use the elastic method: treat the weld as lines, compute polar moment \(I_{wp}\), and the resultant force per mm at the critical point.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Fillet weld throat">
    <rect class="conc" x="60" y="140" width="300" height="30"/><rect class="conc" x="180" y="40" width="30" height="100"/>
    <polygon class="comp" points="210,140 240,140 210,110"/><polygon class="comp" points="180,140 150,140 180,110"/>
    <path class="acc" d="M210 140 L225 125"/><text x="232" y="122" class="a">t_t = t_w/√2</text>
    <path class="dim" d="M210 154 H240"/><text x="214" y="168" class="m">t_w</text>
    <text x="300" y="70" class="m">equal-leg fillet welds</text>
  </svg>
  <figcaption>Figure 1 — Fillet weld: leg size t_w and design throat t_t.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Quality and practice', html: String.raw`
<ul>
  <li>Processes: manual metal arc (MMAW), gas metal arc (GMAW), flux-cored (FCAW), submerged arc (SAW, used for welded I-sections).</li>
  <li>Defects — porosity, lack of fusion, cracking, undercut — are controlled by procedures, qualified welders and inspection (visual, MT, UT, RT) per AS/NZS 1554.</li>
  <li>Prefer shop welds and site bolting; avoid overhead site welding.</li>
  <li><strong>Connections as a whole:</strong> simple (web cleats, flexible end plates, fin plates), rigid (full-depth end plates, welded moment joints with stiffeners), base plates with holding-down bolts, column splices.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Example 8.4 — angle tie to a gusset', html: String.raw`
<div class="ex">
  <div class="ex-head">A 100 × 100 × 8 EA Grade 300 truss diagonal carries \(N_t^* = 190\) kN. Size the fillet welds to the gusset (E48XX, SP category).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Minimum action \(0.3\varphi N_t = 0.3(430) = 129\) kN &lt; 190 → design for 190 kN.</li>
      <li>Try a 6 mm fillet: \(\varphi v_w = 0.8(0.6)(480)\tfrac{6}{\sqrt2}(1.0) = 978\) N/mm.</li>
      <li>\(l_w = 190\,000/978 = 194\) mm; available 100 + 60 + 80 = 240 mm ✓.</li>
      <li>Place the longer weld near the angle’s centroid (heel side) to balance the group.
        <span class="result">6 mm fillet weld, 240 mm total length — satisfactory</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Weld strength comes from the throat, not the leg.</li>
  <li>Specify SP category for structural welds (φ = 0.8).</li>
  <li>Balance weld groups about the member axis, essential under fatigue.</li>
</ul>` }
      ]
    }
  ]
});
