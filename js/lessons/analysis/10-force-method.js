/* Lesson 10 — Force method of analysis (Chhay/Hibbeler Ch. 10) */
KCE_COURSE.lessons.push({
  id: 'force-method',
  num: 10,
  title: 'Force Method for Indeterminate Structures',
  desc: 'Indeterminate structures, compatibility and flexibility coefficients, Maxwell’s reciprocal theorem, the force method for beams, frames, trusses and composite structures, symmetry and influence lines.',
  icon: '🧩',
  color: 'peach',
  meta: ['Ch. 10', 'Compatibility', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>statically indeterminate</strong> structure has more unknowns than equilibrium equations. It is stiffer and more redundant than a determinate one — smaller moments and deflections, and a second load path if a member fails — but settlement and temperature change cause stresses. The <strong>force method</strong> (method of consistent deformations) treats the extra reactions or member forces as unknowns and finds them from <em>compatibility</em> of displacements.</p>` },
        { title: 'Description', html: String.raw`
$$\Delta_i + \sum_j f_{ij}R_j = 0\qquad (i = 1 \dots n)$$
<p>\(\Delta_i\) = displacement of the <strong>primary (released) structure</strong> under the real loads at redundant \(i\); \(f_{ij}\) = <strong>flexibility coefficient</strong>, the displacement at \(i\) caused by a unit value of redundant \(j\). Maxwell’s theorem \(f_{ij} = f_{ji}\) reduces the work.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the degree of indeterminacy \(n\); choose \(n\) redundants and remove them to get a stable, determinate primary structure.</li>
  <li>Compute \(\Delta_i\) for the real loads and \(f_{ij}\) for unit redundants (tables, moment-area, virtual work).</li>
  <li>Write the compatibility equations (the real support does not move, or moves by a known settlement) and solve for the redundants.</li>
  <li>Get all other forces by equilibrium and draw the diagrams.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 260" role="img" aria-label="Propped cantilever by superposition, Example 10-1">
    <rect class="conc" x="30" y="20" width="14" height="50"/><path class="ln" d="M44 45 H244"/><polygon class="ln" points="244,45 236,60 252,60"/>
    <path class="acc" d="M144 8 V41"/><polygon class="accf" points="144,44 139,34 149,34"/><text x="150" y="16">50 kN</text>
    <text x="94" y="80" class="m">6 m</text><text x="190" y="80" class="m">6 m</text><text x="262" y="50">=</text>
    <rect class="conc" x="290" y="20" width="14" height="50"/><path class="ln" d="M304 45 H504"/><path class="dim" d="M304 45 Q 420 50 504 75"/>
    <path class="acc" d="M404 8 V41"/><polygon class="accf" points="404,44 399,34 409,34"/><text x="380" y="98" class="m">Δ_B = 9000/EI ↓</text>
    <text x="262" y="160">+</text>
    <rect class="conc" x="290" y="120" width="14" height="50"/><path class="ln" d="M304 145 H504"/><path class="dim" d="M304 145 Q 420 140 504 118"/>
    <path class="acc" d="M504 200 V152"/><polygon class="accf" points="504,148 499,158 509,158"/><text x="512" y="196">B_y</text>
    <text x="320" y="222" class="m">B_y · f_BB, with f_BB = 576/EI ↑</text>
    <text x="40" y="240" class="m">Compatibility at B: 0 = −Δ_B + B_y f_BB</text>
  </svg>
  <figcaption>Figure 1 — Example 10-1: remove the roller at B, then restore it with the redundant B_y.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Choosing redundants and using symmetry', html: String.raw`
<ul>
  <li>Any set of releases works as long as the primary structure is stable — a reaction, an internal moment (insert a hinge) or a member force (cut the member).</li>
  <li>For a truss with a redundant member, compatibility is the <em>relative</em> displacement of the cut ends: \(\Delta_{AB} + F_{AB}f_{AB\,AB} = 0\), with \(f = \sum n^2L/AE\) including the cut member itself.</li>
  <li><strong>Symmetric structures:</strong> with symmetric load, analyse half with the appropriate conditions on the axis (zero slope, zero shear); antisymmetric load gives zero moment on the axis.</li>
</ul>` },
        { title: 'Influence lines for indeterminate beams', html: String.raw`
<p>By the Müller-Breslau principle the influence line is the deflected shape after releasing the restraint, now a <strong>curve</strong> rather than straight lines. Quantitatively: apply a unit redundant to the primary structure; the influence-line ordinates are \(f_{xB}/f_{BB}\) (Maxwell). Qualitatively the shape tells which spans to load — the checkerboard pattern used for continuous beams and frames.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 10-1 — propped cantilever', html: String.raw`
<div class="ex">
  <div class="ex-head">A 12 m beam is fixed at A and supported on a roller at B, with 50 kN at mid-span (Figure 1). EI is constant. Find the reaction at B.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Primary structure: cantilever. Deflection at B from the load at \(L/2 = 6\) m:
        $$\Delta_B = \frac{P(6)^3}{3EI} + \frac{P(6)^2}{2EI}(6) = \frac{3600 + 5400}{EI} = \frac{9000}{EI}\ \downarrow$$</li>
      <li>Unit load at B: \(f_{BB} = \dfrac{L^3}{3EI} = \dfrac{12^3}{3EI} = \dfrac{576}{EI}\ \uparrow\).</li>
      <li>Compatibility: \(0 = -9000/EI + B_y(576/EI)\) → \(B_y = 15.6\) kN.</li>
      <li>Equilibrium: \(A_y = 50 - 15.6 = 34.4\) kN; \(M_A = 50(6) - 15.6(12) = 112\) kN·m; moment under the load \(15.6(6) = 93.8\) kN·m.
        <span class="result">B_y = 15.6 kN, A_y = 34.4 kN, M_A = 112 kN·m (hogging), M_C = 93.8 kN·m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Count the redundants: number of compatibility equations = degree of indeterminacy.</li>
  <li>Keep one sign convention for Δ and f (e.g. up positive) in every equation.</li>
  <li>Support settlement: put the known movement on the left-hand side instead of 0.</li>
</ul>` }
      ]
    }
  ]
});
