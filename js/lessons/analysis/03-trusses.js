/* Lesson 3 — Analysis of statically determinate trusses (Chhay/Hibbeler Ch. 3) */
KCE_COURSE.lessons.push({
  id: 'trusses',
  num: 3,
  title: 'Statically Determinate Trusses',
  desc: 'Common roof and bridge trusses, simple, compound and complex trusses, determinacy and stability, the method of joints, zero-force members and the method of sections.',
  icon: '🔺',
  color: 'sky',
  meta: ['Ch. 3', 'Joints & sections', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>truss</strong> is made of slender members joined at their ends to form triangles. With loads applied only at the joints and frictionless pins assumed, every member is a <strong>two-force member</strong>: it carries a single axial force, tension (T) or compression (C).</p>` },
        { title: 'Description', html: String.raw`
<ul>
  <li><strong>Roof trusses:</strong> Howe, Pratt, Fink, scissors, fan, bowstring, three-hinged arch.</li>
  <li><strong>Bridge trusses:</strong> Pratt, Howe, Warren, parker, baltimore, subdivided Warren, K-truss.</li>
  <li><strong>Simple truss:</strong> built from a base triangle by adding two members and one joint at a time. <strong>Compound:</strong> simple trusses joined together. <strong>Complex:</strong> neither.</li>
</ul>
$$b + r = 2j\ \text{(determinate)},\qquad b + r > 2j\ \text{(indeterminate)},\qquad b + r < 2j\ \text{(unstable)}$$
<p>\(b\) = members, \(r\) = reactions, \(j\) = joints. A truss can still be unstable internally or externally (concurrent or parallel reactions) even when \(b + r \ge 2j\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the support reactions from the free-body diagram of the whole truss.</li>
  <li><strong>Method of joints:</strong> start at a joint with at most two unknown members; apply \(\sum F_x = 0\), \(\sum F_y = 0\). Assume unknown forces in tension (pulling away from the joint); a positive answer is tension.</li>
  <li><strong>Method of sections:</strong> cut through at most three members whose forces are unknown; use \(\sum M = 0\) about the point where two of the cut members meet to get the third directly.</li>
  <li>Spot zero-force members first — they simplify the work.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 250" role="img" aria-label="Roof truss of Example 3-2">
    <g class="ln">
      <path d="M50 200 H500 M50 200 L275 70 L500 200 M200 200 L162.5 135 M200 200 L275 70 L350 200 L387.5 135"/>
    </g>
    <g class="accf"><circle cx="50" cy="200" r="4"/><circle cx="200" cy="200" r="4"/><circle cx="350" cy="200" r="4"/><circle cx="500" cy="200" r="4"/><circle cx="162.5" cy="135" r="4"/><circle cx="275" cy="70" r="4"/><circle cx="387.5" cy="135" r="4"/></g>
    <polygon class="ln" points="50,200 40,218 60,218"/><circle class="ln" cx="500" cy="210" r="8"/>
    <path class="acc" d="M162.5 95 V128 M275 30 V63 M387.5 95 V128"/>
    <g class="accf"><polygon points="162.5,132 158,122 167,122"/><polygon points="275,67 270,57 280,57"/><polygon points="387.5,132 383,122 392,122"/></g>
    <text x="150" y="90">3 kN</text><text x="262" y="24">2 kN</text><text x="376" y="90">3 kN</text>
    <text x="36" y="196">A</text><text x="196" y="218">B</text><text x="346" y="218">C</text><text x="508" y="196">D</text>
    <text x="140" y="140">G</text><text x="282" y="64">F</text><text x="396" y="140">E</text>
    <text x="80" y="194" class="m">30°</text>
    <path class="dim" d="M50 236 H500"/><text x="115" y="248" class="m">3 m</text><text x="265" y="248" class="m">3 m</text><text x="415" y="248" class="m">3 m</text>
  </svg>
  <figcaption>Figure 1 — Example 3-2: symmetric roof truss, A_y = D_y = 4 kN.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Zero-force members', html: String.raw`
<ol>
  <li>If only two non-collinear members meet at an unloaded joint, both are zero-force members.</li>
  <li>If three members meet at an unloaded joint and two are collinear, the third is a zero-force member.</li>
</ol>
<p>Zero-force members still matter: they brace compression members against buckling and carry load when the loading changes.</p>` },
        { title: 'Space trusses', html: String.raw`
<p>The basic stable unit is a tetrahedron. Determinacy: \(b + r = 3j\). At each joint \(\sum F_x = \sum F_y = \sum F_z = 0\); member forces are resolved using direction cosines \(x/L,\ y/L,\ z/L\) of the member.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 3-2 — method of joints', html: String.raw`
<div class="ex">
  <div class="ex-head">Find the force in each member of the roof truss in Figure 1 and state whether it is in tension or compression.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Joint A: \(\sum F_y = 0\): \(4 - F_{AG}\sin30° = 0\) → \(F_{AG} = 8\) kN (C). \(\sum F_x = 0\): \(F_{AB} - 8\cos30° = 0\) → \(F_{AB} = 6.93\) kN (T).</li>
      <li>Joint G (axes along and across the top chord): \(F_{GB} - 3\cos30° = 0\) → \(F_{GB} = 2.60\) kN (C); \(8 - 3\sin30° - F_{GF} = 0\) → \(F_{GF} = 6.50\) kN (C).</li>
      <li>Joint B: \(F_{BF}\sin60° - 2.60\sin60° = 0\) → \(F_{BF} = 2.60\) kN (T); \(F_{BC} + 2.60\cos60° + 2.60\cos60° - 6.93 = 0\) → \(F_{BC} = 4.33\) kN (T).
        <span class="result">AG = 8 C · AB = 6.93 T · GB = 2.60 C · GF = 6.50 C · BF = 2.60 T · BC = 4.33 T (other half by symmetry)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Method of sections — check on the same truss', html: String.raw`
<div class="ex">
  <div class="ex-head">Cut through GF, BF and BC and find the three forces directly.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\sum M_F = 0\) (GF and BF pass through F): \(4(4.5) - 3(2.25) - F_{BC}(2.598) = 0\) → \(F_{BC} = 4.33\) kN (T).</li>
      <li>\(\sum M_B = 0\) (BF and BC pass through B); the lever arm of GF about B is \(3\sin30° = 1.5\) m: \(4(3) - 3(0.75) - F_{GF}(1.5) = 0\) → \(F_{GF} = 6.50\) kN (C).</li>
      <li>\(\sum F_y = 0\): \(4 - 3 - 6.50\sin30° + F_{BF}\sin60° = 0\) → \(F_{BF} = 2.60\) kN (T).
        <span class="result">Same results as the method of joints — with three equations instead of six</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Assume tension everywhere; the sign of the answer then tells T (+) or C (−).</li>
  <li>For the method of sections, pick moment centres where two unknown lines of action meet.</li>
  <li>Check \(b + r\) against \(2j\) and look for collapse mechanisms before trusting the numbers.</li>
</ul>` }
      ]
    }
  ]
});
