/* Lesson 11 — Analysis of perfect frames (Bansal, Ch. 11) */
KCE_COURSE.lessons.push({
  id: 'frames',
  num: 11,
  title: 'Analysis of Perfect Frames (Trusses)',
  desc: 'Perfect, deficient and redundant frames; method of joints, method of sections and cantilever trusses.',
  icon: '🔺',
  color: 'mint',
  meta: ['Bansal Ch. 11', 'Trusses', 'Statics'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>frame</strong> (truss) is made of members pinned together at their ends and loaded only at the joints, so each member carries only axial tension or compression. The member forces are found from equilibrium alone if the frame is <strong>perfect</strong>.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Perfect frame</th><td>\(n = 2j - 3\) (\(n\) members, \(j\) joints) — just enough members to be stable</td></tr>
    <tr><th>Deficient frame</th><td>\(n < 2j - 3\) — a mechanism</td></tr>
    <tr><th>Redundant frame</th><td>\(n > 2j - 3\) — statically indeterminate</td></tr>
  </tbody>
</table>
<p>Assumptions: pin-jointed, loads at joints only, self-weight of members neglected.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the support reactions (not needed for cantilever trusses — start at the free end).</li>
  <li><strong>Method of joints:</strong> start at a joint with at most two unknowns; \(\sum F_x = 0\), \(\sum F_y = 0\); move joint to joint.</li>
  <li><strong>Method of sections:</strong> cut through at most three members with unknown forces and take moments about the intersection of two of them.</li>
  <li>Assume all unknown forces tensile (away from the joint); a negative answer means compression.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 230" role="img" aria-label="Cantilever truss">
    <path class="ln" d="M60 40 H260 H460 M60 40 L260 190 M260 40 L260 190 M460 40 L260 190 M260 190 L60 210"/>
    <path class="thin" d="M50 20 V230"/><g class="thin"><path d="M50 30 l-10 10 M50 60 l-10 10 M50 90 l-10 10 M50 120 l-10 10 M50 150 l-10 10 M50 180 l-10 10 M50 210 l-10 10"/></g>
    <circle class="accf" cx="60" cy="40" r="4"/><circle class="accf" cx="260" cy="40" r="4"/><circle class="accf" cx="460" cy="40" r="4"/><circle class="accf" cx="260" cy="190" r="4"/><circle class="accf" cx="60" cy="210" r="4"/>
    <text x="64" y="32">A</text><text x="254" y="30">B</text><text x="466" y="34">C</text><text x="268" y="204">D</text><text x="64" y="226">E</text>
    <path class="acc" d="M260 40 V90 M460 40 V90"/><polygon class="accf" points="260,92 255,82 265,82"/><polygon class="accf" points="460,92 455,82 465,82"/>
    <text x="266" y="104">1000 N</text><text x="466" y="104">1000 N</text>
    <text x="150" y="30" class="m">2 m</text><text x="350" y="30" class="m">2 m</text><text x="474" y="150" class="m">3 m deep at D</text>
  </svg>
  <figcaption>Figure 1 — Cantilever truss of Problem 11.7 (support wall on the left).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Problem 11.6 — triangular cantilever truss', html: String.raw`
<div class="ex">
  <div class="ex-head">Equilateral cantilever truss ACD (60° angles), BD tie to the wall, 1000 N vertical load at C. Find all member forces.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Joint C: \(F_{CD}\sin 60° = 1000\) → \(F_{CD} = 1154.7\) N (tension); \(F_{CA} = 1154.7\cos 60° = 577.4\) N (compression).</li>
      <li>Joint D: \(F_{AD}\cos 30° = 1154.7\cos 30°\) → \(F_{AD} = 1154.7\) N (compression); \(F_{BD} = 1154.7(0.5) + 1154.7(0.5) = 1154.7\) N (tension).
        <span class="result">AC 577.4 C, CD 1154.7 T, AD 1154.7 C, BD 1154.7 T (N)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 11.7 — two-bay cantilever truss', html: String.raw`
<div class="ex">
  <div class="ex-head">Truss of Figure 1: top chord ABC, panels 2 m, depth 3 m at D; 1000 N at B and at C. cos θ = 0.8, sin θ = 0.6.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Joint C: \(F_{CD}\sin\theta = 1000\) → \(F_{CD} = 1666.7\) N (C); \(F_{CB} = 1666.7(0.8) = 1333.3\) N (T).</li>
      <li>Joint B: \(F_{BD} = 1000\) N (C); \(F_{BA} = 1333.3\) N (T).</li>
      <li>Joint D: \(F_{AD} + F_{ED} = 1000/0.6 + 1666.7 = 3333.3\); \(F_{ED} - F_{AD} = 1666.7\) → \(F_{ED} = 2500\) N (C), \(F_{AD} = 833.3\) N (T).
        <span class="result">AB 1333.3 T, BC 1333.3 T, CD 1666.7 C, DE 2500 C, AD 833.3 T, BD 1000 C (N)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Check \(n = 2j - 3\) before analysing.</li>
  <li>Never start at a joint with more than two unknowns.</li>
  <li>Tabulate member, force and nature (tension/compression).</li>
</ul>` }
      ]
    }
  ]
});
