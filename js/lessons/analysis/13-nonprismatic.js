/* Lesson 13 — Beams and frames having nonprismatic members (Chhay/Hibbeler Ch. 13) */
KCE_COURSE.lessons.push({
  id: 'nonprismatic',
  num: 13,
  title: 'Nonprismatic Members',
  desc: 'Haunched and stepped members, loading properties (stiffness, carry-over factor, fixed-end moments) by the conjugate-beam method and from tables, and their use in moment distribution and slope-deflection.',
  icon: '📏',
  color: 'sky',
  meta: ['Ch. 13', 'Haunches', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Members are often deeper near the supports — <strong>haunched</strong> (tapered) or <strong>stepped</strong> — where the moments are largest. Their moment of inertia varies along the length, so the prismatic values \(4EI/L\), carry-over \(\tfrac12\) and \(wL^2/12\) no longer apply. Once these <strong>loading properties</strong> are known, moment distribution and slope-deflection work exactly as before.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Stiffness factor</th><td>\(K_A\) = moment at A to rotate A by 1 rad with B fixed; written \(K = k\,EI_C/L\) (\(I_C\) = smallest section)</td></tr>
    <tr><th>Carry-over factor</th><td>\(C_{AB}\) = moment at B ÷ moment at A for that rotation; Maxwell–Betti gives \(C_{AB}K_A = C_{BA}K_B\)</td></tr>
    <tr><th>Fixed-end moments</th><td>Depend on the haunch shape and the load position; no single formula</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Get \(K\), \(C\) and the FEMs, either from published tables (e.g. the PCA <em>Handbook of Frame Constants</em>, parameters \(a_A, a_B, r_A, r_B\)) or by the conjugate-beam method.</li>
  <li><strong>Conjugate beam:</strong> load the conjugate beam with \(M/EI\) using the actual \(I(x)\); impose zero slope and deflection at both ends of the real (fixed-fixed) beam, i.e. zero shear and moment in the conjugate beam.</li>
  <li>Use the properties in moment distribution (DF = K/ΣK, carry-over C) or in the generalised slope-deflection equation.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 200" role="img" aria-label="Stepped fixed-ended beam of Example 13-2">
    <rect class="conc" x="40" y="40" width="16" height="110"/><rect class="conc" x="500" y="40" width="16" height="110"/>
    <path class="ln" d="M56 60 H500 V100 H392 V140 H56 Z"/>
    <path class="acc" d="M392 14 V56"/><polygon class="accf" points="392,59 387,49 397,49"/><text x="400" y="24">10 kN</text>
    <text x="44" y="170">A</text><text x="386" y="160">C</text><text x="504" y="170">B</text>
    <path class="dim" d="M56 180 H392 M392 180 H500"/><text x="200" y="196" class="m">2.7 m</text><text x="434" y="196" class="m">0.9 m</text>
    <text x="150" y="106" class="m">h = 600 mm</text><text x="408" y="86" class="m">h = 300 mm</text>
  </svg>
  <figcaption>Figure 1 — Example 13-2: stepped beam fixed at both ends, width 300 mm.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Generalised slope-deflection equation', html: String.raw`
$$M_N = K_N\left[\theta_N + C_N\theta_F - \psi(1 + C_N)\right] + (FEM)_N$$
<p>For a prismatic member \(K_N = 4EI/L\) and \(C_N = \tfrac12\), which gives back \(M_N = 2EI/L\,(2\theta_N + \theta_F - 3\psi) + FEM\).</p>
<p>A deeper end attracts more moment: the stiff end of a haunched beam has a larger stiffness factor and a larger fixed-end moment than the shallow end.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 13-2 — FEMs of a stepped beam', html: String.raw`
<div class="ex">
  <div class="ex-head">Find the fixed-end moments of the stepped beam in Figure 1 (10 kN at C, 2.7 m from A). E is constant.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(I_{AC} = 0.3(0.6)^3/12 = 5.4(10^{-3})\) m⁴, \(I_{CB} = 0.3(0.3)^3/12 = 0.675(10^{-3})\) m⁴ (8 times smaller).</li>
      <li>By superposition the real beam = simple beam with 10 kN (moment peak 6.75 kN·m at C) + end moment \(M_A\) + end moment \(M_B\). Divide each moment diagram by the local \(EI\) to load the conjugate beam.</li>
      <li>Conjugate beam free at both ends: \(\sum F_y = 0\) and \(\sum M_{A'} = 0\) give
        $$6187.5 - 479.17M_A - 1354.17M_B = 0,\qquad -16537.5 + 837.5M_A + 4037.5M_B = 0$$</li>
      <li>Solving: \(M_A = 3.25\) kN·m, \(M_B = 3.42\) kN·m (an exact stiffness check gives 3.23 and 3.43).
        <span class="result">(FEM)_AB = 3.25 kN·m, (FEM)_BA = 3.42 kN·m — a prismatic beam would give Pab²/L² = 1.69 and Pa²b/L² = 5.06</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Check \(C_{AB}K_A = C_{BA}K_B\) when using tabulated or computed properties.</li>
  <li>Use the same reference \(I_C\) for every member in a moment-distribution table.</li>
  <li>The stiffer (deeper) end attracts the larger fixed-end moment.</li>
</ul>` }
      ]
    }
  ]
});
