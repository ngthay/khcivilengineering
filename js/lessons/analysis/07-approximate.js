/* Lesson 7 — Approximate analysis of statically indeterminate structures (Chhay/Hibbeler Ch. 7) */
KCE_COURSE.lessons.push({
  id: 'approximate',
  num: 7,
  title: 'Approximate Analysis of Indeterminate Structures',
  desc: 'Why approximate methods are used, trusses with diagonals sharing shear, building frames under vertical loads, and lateral loads by the portal and cantilever methods.',
  icon: '🏢',
  color: 'blue',
  meta: ['Ch. 7', 'Portal & cantilever', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>An exact analysis of an indeterminate structure needs the member sizes, which are not known at the start of design. <strong>Approximate methods</strong> add one assumption for each redundant so that statics alone gives the forces. They are used for preliminary sizing and to check computer results.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Trusses with two diagonals per panel</th><td>Slender diagonals: the tension diagonal takes all the panel shear (compression diagonal = 0). Stocky diagonals: each takes half the shear.</td></tr>
    <tr><th>Frames, vertical load</th><td>Inflection points at \(0.1L\) from each end of a girder; girder axial force = 0. The middle \(0.8L\) acts as a simply supported beam.</td></tr>
    <tr><th>Portal method (lateral load)</th><td>Hinges at mid-height of columns and mid-span of girders; interior columns take twice the shear of exterior columns.</td></tr>
    <tr><th>Cantilever method (lateral load)</th><td>Hinges as above; column axial stress is proportional to the distance from the centroid of the column areas (frame acts like a cantilever beam).</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Place the assumed hinges (inflection points) to make the structure determinate.</li>
  <li><strong>Portal:</strong> cut through the column hinges of a storey; storey shear = sum of loads above; exterior columns take \(V\), interior \(2V\).</li>
  <li><strong>Cantilever:</strong> take moments of the storey about the centroid of the column areas; column axial forces are \(\propto\) area × distance.</li>
  <li>Go member by member from the top left: girder shears, column axial forces, end moments.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 230" role="img" aria-label="Portal method frame of Example 7-5">
    <path class="ln" d="M80 60 H480 M80 60 V190 M213 60 V190 M347 60 V190 M480 60 V190"/>
    <g class="ln"><path d="M68 190 H92 M201 190 H225 M335 190 H359 M468 190 H492"/></g>
    <g class="accf"><circle cx="80" cy="125" r="4"/><circle cx="213" cy="125" r="4"/><circle cx="347" cy="125" r="4"/><circle cx="480" cy="125" r="4"/>
      <circle cx="146" cy="60" r="4"/><circle cx="280" cy="60" r="4"/><circle cx="413" cy="60" r="4"/></g>
    <path class="acc" d="M28 60 H74"/><polygon class="accf" points="78,60 68,55 68,65"/><text x="24" y="52">6 kN</text>
    <text x="64" y="212" class="m">V = 1</text><text x="194" y="212" class="m">2V = 2</text><text x="328" y="212" class="m">2V = 2</text><text x="462" y="212" class="m">V = 1</text>
    <text x="132" y="50" class="m">4 m</text><text x="266" y="50" class="m">4 m</text><text x="400" y="50" class="m">4 m</text>
    <text x="490" y="130" class="m">3 m</text>
  </svg>
  <figcaption>Figure 1 — Example 7-5: assumed hinges (dots) at column mid-height and girder mid-span; fixed bases.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Why the assumptions work', html: String.raw`
<ul>
  <li>A girder fixed at both ends has inflection points at \(0.211L\); pinned ends give 0. A real joint lies between, so \(0.1L\) is a reasonable average.</li>
  <li>Under lateral load, columns of a low frame bend in double curvature with near-zero moment at mid-height; the portal method suits low, wide buildings.</li>
  <li>Tall, slender frames bend overall like a cantilever; the cantilever method suits them better.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 7-2 — truss with crossed diagonals', html: String.raw`
<div class="ex">
  <div class="ex-head">A 20 m, four-panel truss (5 m panels, 5 m deep) has crossed diagonals that cannot carry compression. Top-chord loads 10, 20, 20, 20, 10 kN; reactions 40 kN each. Find the forces in the first panel.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Panel 1 shear \(V = 40 - 10 = 30\) kN, carried by the tension diagonal only (\(F_{AI} = 0\)): \(F_{JB}\cos45° = 30\) → \(F_{JB} = 42.4\) kN (T).</li>
      <li>\(\sum M_A = 0\): \(-42.4\sin45°(5) + F_{JI}(5) = 0\) → \(F_{JI} = 30\) kN (C); joint A: \(F_{JA} = 40\) kN (C), \(F_{AB} = 0\).</li>
      <li>Panel 2: \(V = 40 - 10 - 20 = 10\) kN → \(F_{IC} = 14.1\) kN (T), \(F_{IH} = 40\) kN (C), \(F_{BC} = 30\) kN (T).
        <span class="result">JB = 42.4 T, JI = 30 C, JA = 40 C · IC = 14.1 T, IH = 40 C, BC = 30 T</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 7-5 — portal method', html: String.raw`
<div class="ex">
  <div class="ex-head">The one-storey, three-bay frame in Figure 1 (fixed bases, 3 m columns, 4 m bays) carries 6 kN at roof level. Find the reactions by the portal method.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Cut through the column hinges: \(V + 2V + 2V + V = 6\) → \(V = 1\) kN. Exterior columns 1 kN, interior 2 kN.</li>
      <li>Base moments: exterior \(M = 1(1.5) = 1.5\) kN·m, interior \(M = 2(1.5) = 3\) kN·m.</li>
      <li>Top-left segment, moments about the girder hinge (2 m away): \(I_y(2) = 1(1.5)\) → column axial force \(I_y = 0.75\) kN; the interior columns get 0, the right column 0.75 kN (opposite sign).
        <span class="result">A_x = H_x = 1 kN, C_x = E_x = 2 kN · M_A = M_H = 1.5, M_C = M_E = 3 kN·m · A_y = H_y = 0.75 kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>One assumption per degree of indeterminacy — no more, no less.</li>
  <li>Portal method: interior column shear = 2 × exterior.</li>
  <li>Use the results for preliminary sizes, then run an exact analysis.</li>
</ul>` }
      ]
    }
  ]
});
