/* Lesson 9 — Tension members (Handbook Ch. 7) */
KCE_COURSE.lessons.push({
  id: 'tension',
  num: 9,
  title: 'Tension Members',
  desc: 'Types of tension members, gross yielding and net-section fracture, correction factor kt for end connections, combined tension and bending, steel rods and wire ropes.',
  icon: '🪝',
  color: 'mint',
  meta: ['Ch. 7', 'N_t = min(A_gf_y, 0.85k_tA_nf_u)', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Tension members — ties, hangers, bracing, truss chords — are the most efficient members: there is no buckling. They fail either by <strong>yielding of the gross section</strong> (large elongation) or <strong>fracture of the net section</strong> through the bolt holes. Uneven load transfer at the end connection reduces the fracture capacity.</p>` },
        { title: 'Description', html: String.raw`
$$N_t = \min\left(A_gf_y,\ 0.85k_tA_nf_u\right),\qquad N^* \le \varphi N_t\ (\varphi = 0.9)$$
<table class="tbl num">
  <thead><tr><th>End connection</th><th>k_t</th></tr></thead>
  <tbody>
    <tr><td>Uniform force distribution (all elements connected)</td><td>1.0</td></tr>
    <tr><td>Angle connected by one leg, unequal / equal angle</td><td>0.75 – 0.85</td></tr>
    <tr><td>Channel connected by the web</td><td>0.85</td></tr>
    <tr><td>I-section connected by both flanges only</td><td>0.85</td></tr>
  </tbody>
</table>
<p>Net area \(A_n = A_g - \sum d_ht\), adding \(s_p^2t/4s_g\) for each staggered gauge line crossed (\(s_p\) pitch, \(s_g\) gauge).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Compute \(N^*\) (and any bending from eccentric end connections or transverse loads).</li>
  <li>\(A_n\) for the worst failure path through the holes.</li>
  <li>\(N_t\) = smaller of yield and fracture; check \(\varphi N_t \ge N^*\).</li>
  <li>With bending, check the section and member moment capacities as for beam-columns in tension (Lesson 8).</li>
  <li>Limit the slenderness of light bracing (e.g. l/r ≤ 300) to avoid sag and vibration.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="Net section through bolt holes">
    <rect class="conc" x="60" y="50" width="340" height="100"/>
    <g class="ln"><circle cx="300" cy="80" r="9"/><circle cx="300" cy="120" r="9"/><circle cx="350" cy="80" r="9"/><circle cx="350" cy="120" r="9"/></g>
    <path class="acc" d="M300 50 V150"/><text x="270" y="170" class="a">net section A_n</text>
    <path class="ln" d="M60 100 H10"/><polygon class="accf" points="6,100 16,95 16,105"/><text x="14" y="90">N*</text>
    <path class="ln" d="M400 100 H480"/><polygon class="accf" points="484,100 474,95 474,105"/><text x="470" y="90">N*</text>
    <text x="120" y="104" class="m">gross section A_g yields</text>
  </svg>
  <figcaption>Figure 1 — Gross-section yielding vs. net-section fracture through the holes.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Rods and wire ropes', html: String.raw`
<ul>
  <li><strong>Steel rods</strong> (threaded bracing, sag rods): capacity on the tensile stress area of the thread; use turnbuckles to pretension.</li>
  <li><strong>Wire ropes</strong> (guys, suspended roofs): much higher strength (1570 – 1770 MPa wire) but lower modulus; designed with large safety factors on the minimum breaking load, and creep/prestretching must be considered.</li>
  <li>End fasteners (pins, eye bars, clevises) must be designed for the full member capacity.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Example 7.1 — crane runway hanger', html: String.raw`
<div class="ex">
  <div class="ex-head">A 2 m hanger made of 250UC89.5 Grade 300, connected by its flanges only (\(k_t = 0.85\)), carries \(N_G = 99\) kN and \(N_Q = 210\) kN (\(A_g = A_n = 11\,400\) mm², \(f_y = 280\), \(f_u = 440\) MPa).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(N^* = 1.2(99) + 1.5(210) = 434\) kN.</li>
      <li>Yield: \(N_{ty} = 11\,400(280) = 3190\) kN. Fracture: \(N_{tf} = 0.85(0.85)(11\,400)(440) = 3620\) kN.</li>
      <li>\(\varphi N_t = 0.9(3190) = 2870\) kN \(\ge 434\) ✓.</li>
      <li>The hanger also carries a crane surge \(H^* = 27\) kN at 2 m and the 280 mm eccentricity: \(M_x^* = 27(2) + 434(0.280) = 176\) kN·m; \(\varphi M_{rx} = 310\) kN·m and \(\varphi M_{ox} = 310\) kN·m (increased by the tension) — both ≥ 176 ✓.
        <span class="result">250UC89.5 Grade 300 is adequate in tension and bending</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Check both yield (gross) and fracture (net, with k_t).</li>
  <li>Connect all elements of the section where possible to get k_t = 1.</li>
  <li>Eccentric end connections add bending — include it.</li>
</ul>` }
      ]
    }
  ]
});
