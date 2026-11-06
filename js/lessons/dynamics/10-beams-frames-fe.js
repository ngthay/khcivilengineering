/* Lesson 10 — Dynamic analysis of beams and frames by finite elements (Paz & Leigh, Chapters 10–14) */
KCE_COURSE.lessons.push({
  id: 'beams-frames-fe',
  num: 10,
  title: 'Beams, Frames and Trusses as Discrete Systems — Stiffness and Mass Matrices',
  desc: 'Hermitian shape functions, the beam element stiffness, lumped and consistent mass matrices, assembly of the system matrices, transformation for plane frames, grids and trusses, and the four-element fixed beam example compared with the exact frequencies.',
  icon: '📏',
  color: 'rose',
  meta: ['Chapters 10–14', 'Consistent mass', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Framed structures are divided into elements joined at nodes, as in static matrix analysis. A uniform beam element has four nodal coordinates — a deflection and a rotation at each end — and the displacement inside the element is interpolated with the static <strong>shape functions</strong> (cubic Hermitian polynomials):</p>
$$y(x) = N_1\delta_1 + N_2\delta_2 + N_3\delta_3 + N_4\delta_4,\quad N_1 = 1 - 3\xi^2 + 2\xi^3,\ N_2 = L\xi(1-\xi)^2,\ N_3 = 3\xi^2 - 2\xi^3,\ N_4 = L\xi^2(\xi-1)$$
<p>with \(\xi = x/L\).</p>` },
        { title: 'Description', html: String.raw`
<p>The element <strong>stiffness</strong> \(k_{ij} = \int_0^L EI\,N_i''N_j''\,dx\) and the <strong>consistent mass</strong> \(m_{ij} = \int_0^L \bar m\,N_iN_j\,dx\) are</p>
$$[k] = \frac{EI}{L^3}\begin{bmatrix}12 & 6L & -12 & 6L\\ 6L & 4L^2 & -6L & 2L^2\\ -12 & -6L & 12 & -6L\\ 6L & 2L^2 & -6L & 4L^2\end{bmatrix},\qquad [m] = \frac{\bar mL}{420}\begin{bmatrix}156 & 22L & 54 & -13L\\ 22L & 4L^2 & 13L & -3L^2\\ 54 & 13L & 156 & -22L\\ -13L & -3L^2 & -22L & 4L^2\end{bmatrix}$$
<p>The simpler <strong>lumped mass</strong> matrix puts \(\bar mL/2\) at each translational coordinate and zero on the rotations; it is diagonal, so the rotations can be condensed exactly (Lesson 9).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Divide the structure into elements; number the free and fixed nodal coordinates.</li>
  <li>Form [k] and [m] for each element; for frames add the axial terms (\(EA/L\) and \(\bar mL/6\,[2\ 1;1\ 2]\)) and rotate to global axes with \([k] = [T]^T[k'][T]\).</li>
  <li>Assemble the system [K] and [M] by adding element terms at matching coordinates; delete the fixed coordinates.</li>
  <li>Solve \(|[K] - \omega^2[M]| = 0\) for frequencies and modes; then use modal superposition or direct integration for loads.</li>
  <li>Element end forces: \(\{P\} = [k]\{\delta\} + [m]\{\ddot\delta\}\) (the inertial part is often small).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 170" role="img" aria-label="Fixed beam with four elements">
    <path class="thin" d="M50 50 V120 M470 50 V120"/><path class="dim" d="M40 55 L50 65 M40 75 L50 85 M40 95 L50 105 M470 65 L480 55 M470 85 L480 75 M470 105 L480 95"/>
    <path class="ln" d="M50 85 H470" style="stroke-width:5"/>
    <g class="accf"><circle cx="50" cy="85" r="5"/><circle cx="155" cy="85" r="5"/><circle cx="260" cy="85" r="5"/><circle cx="365" cy="85" r="5"/><circle cx="470" cy="85" r="5"/></g>
    <text x="96" y="70" class="m">①</text><text x="200" y="70" class="m">②</text><text x="305" y="70" class="m">③</text><text x="410" y="70" class="m">④</text>
    <text x="90" y="112" class="m">50 in</text><text x="195" y="112" class="m">50 in</text><text x="300" y="112" class="m">50 in</text><text x="405" y="112" class="m">50 in</text>
    <text x="130" y="150" class="m">L = 200 in, I = 100 in⁴, E = 6.58×10⁶ psi, m̄ = 0.10 lb·s²/in²</text>
  </svg>
  <figcaption>Figure 1 — Fixed–fixed beam modelled with four elements (Examples 10.7–10.8): six free coordinates.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Plane frames, grids, space frames and trusses', html: String.raw`
<ul>
  <li><strong>Plane frame</strong> (Chapter 11): six coordinates per element (u, v, θ at each end); bending and axial matrices combined, then rotated by the member angle.</li>
  <li><strong>Grid</strong> (Chapter 12): out-of-plane deflection, bending rotation and <em>torsional</em> rotation at each node; torsion stiffness \(JG/L\) and mass \(I_m L/6\,[2\ 1;1\ 2]\) with \(I_m\) the polar mass moment per length.</li>
  <li><strong>Space frame</strong> (Chapter 13): twelve coordinates per element — the combination of the above about two axes.</li>
  <li><strong>Truss</strong> (Chapter 14): axial bars only; \(k = EA/L\) and consistent mass \(\bar mL/6\,[2\ 1;1\ 2]\) in both directions.</li>
  <li><strong>Geometric stiffness</strong>: an axial force N changes the bending stiffness by \(N/30L\,[36\ 3L\ \dots]\); compression lowers the frequencies (P-Δ effect).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 10.7–10.8 — four-element fixed beam', html: String.raw`
<div class="ex">
  <div class="ex-head">A uniform fixed–fixed beam, L = 200 in, I = 100 in⁴, E = 6.58×10⁶ psi, m̄ = 0.10 lb·s²/in per in, four equal elements with consistent mass. Find the natural frequencies.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Element L = 50 in: \(12EI/L^3 = 12\times6.58\times10^8/50^3 = 63{,}168\) → diagonal \(K_{vv} = 2\times63{,}168 = 126{,}336\) lb/in, \(K_{\theta\theta} = 2\times4EI/L = 1.0528\times10^8\) lb·in.</li>
      <li>Consistent mass diagonal: \(2\times156\bar mL/420 = 3.714\) and \(2\times4\bar mL^3/420 = 238.1\) — as printed by the book’s Program 13.</li>
      <li>Solve the 6 × 6 eigenproblem (Program 8):</li>
    </ol>
    <div class="tbl-wrap"><table class="tbl num">
      <thead><tr><th>Mode</th><th>FE, 4 elements (cps)</th><th>Exact, continuous (cps)</th><th>Error</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>7.23</td><td>7.22</td><td>0.1 %</td></tr>
        <tr><td>2</td><td>20.09</td><td>19.91</td><td>0.9 %</td></tr>
        <tr><td>3</td><td>39.86</td><td>39.02</td><td>2.1 %</td></tr>
        <tr><td>4</td><td>75.40</td><td>64.51</td><td>17 %</td></tr>
      </tbody>
    </table></div>
    <p class="result">Four elements give the first three frequencies within 2 %; higher modes need a finer mesh.</p>
    <p>The exact values come from \(f_n = \frac{(\beta_nL)^2}{2\pi}\sqrt{EI/\bar mL^4}\) with βL = 4.730, 7.853, 10.996, 14.137 (Lesson 11). Consistent-mass results are always above the exact ones (upper bounds).</p>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use consistent mass for accuracy, lumped mass for simplicity and condensation.</li>
  <li>Use at least 2–3 elements per half-wave of the highest mode you need.</li>
  <li>Transform element matrices to global axes before assembling.</li>
  <li>Check the fundamental frequency against a hand formula.</li>
</ul>` }
      ]
    }
  ]
});
