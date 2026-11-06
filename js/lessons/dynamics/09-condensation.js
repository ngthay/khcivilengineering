/* Lesson 9 — Reduction of dynamic matrices: static condensation (Paz & Leigh, Chapter 9) */
KCE_COURSE.lessons.push({
  id: 'condensation',
  num: 9,
  title: 'Reduction of Dynamic Matrices — Static Condensation',
  desc: 'Primary and secondary coordinates, the transformation matrix and reduced stiffness by Gauss–Jordan elimination, reduced mass and damping matrices (Guyan reduction), and its accuracy for a three-story building.',
  icon: '🗜️',
  color: 'amber',
  meta: ['Chapter 9', '[K̄] = [T]ᵀ[K][T]', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Finite-element models have many DOF — rotations at every joint, internal nodes — but only a few are needed to describe the dynamic response. <strong>Static condensation</strong> eliminates the <em>secondary</em> coordinates \(\{u_s\}\) (no external force on them) in favour of the <em>primary</em> ones \(\{u_p\}\):</p>
$$\begin{bmatrix} K_{ss} & K_{sp}\\ K_{ps} & K_{pp}\end{bmatrix}\begin{Bmatrix} u_s\\ u_p\end{Bmatrix} = \begin{Bmatrix} 0\\ F_p\end{Bmatrix}$$` },
        { title: 'Description', html: String.raw`
<p>The first row gives \(\{u_s\} = [\bar T]\{u_p\}\) with \([\bar T] = -[K_{ss}]^{-1}[K_{sp}]\). Substituting in the second row:</p>
$$[\bar K]\{u_p\} = \{F_p\},\qquad [\bar K] = [K_{pp}] - [K_{ps}][K_{ss}]^{-1}[K_{sp}]$$
<p>No inverse is actually computed: Gauss–Jordan elimination of the secondary rows turns the stiffness equation into \(\begin{bmatrix} I & -\bar T\\ 0 & \bar K\end{bmatrix}\), giving both matrices at once.</p>` },
        { title: 'Methodology', html: String.raw`
<p>For dynamics, assume the same static relation between secondary and primary coordinates, \(\{u\} = [T]\{u_p\}\) with \([T] = \begin{bmatrix}\bar T\\ I\end{bmatrix}\). Equating strain energy, kinetic energy and damping work gives</p>
$$[\bar K] = [T]^T[K][T],\qquad [\bar M] = [T]^T[M][T],\qquad [\bar C] = [T]^T[C][T]$$
<ol>
  <li>If the condensed DOF have <strong>no mass</strong> (for example joint rotations with lumped masses), the reduction is exact: condense [K] and drop those rows of [M].</li>
  <li>If they carry mass, the reduction is approximate (Guyan): the lowest frequencies stay accurate; the error grows for higher modes and when massive DOF are condensed.</li>
  <li>Choose as primary the DOF with large mass and small stiffness.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="Three-story building for Example 9.2">
    <path class="ln" d="M80 180 V30 M200 180 V30"/>
    <rect class="conc" x="74" y="132" width="132" height="10"/><rect class="conc" x="74" y="82" width="132" height="10"/><rect class="conc" x="74" y="30" width="132" height="10"/>
    <path class="thin" d="M60 180 H220"/>
    <text x="220" y="140" class="m">m₁ = 25, k₁ = 30,000 (condensed)</text><text x="220" y="90" class="m">m₂ = 50, k₂ = 10,000</text><text x="220" y="38" class="m">m₃ = 100, k₃ = 10,000</text>
    <text x="220" y="196" class="m">m in lb·s²/in, k in lb/in</text>
  </svg>
  <figcaption>Figure 1 — Three-story shear building of Example 9.2; the first-floor coordinate is condensed.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Dynamic condensation', html: String.raw`
<p>Static condensation ignores the inertia of the secondary DOF. <strong>Dynamic condensation</strong> instead uses \([D] = [K] - \omega^2[M]\), starting with an estimate of ω and iterating mode by mode, which gives practically exact eigenvalues at a modest cost. A modified version updates only the eigenvalue and is cheaper still.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 9.1 — two springs', html: String.raw`
<div class="ex">
  <div class="ex-head">Two masses connected by springs k (ground–m₁) and k (m₁–m₂); force on m₂ only. Condense u₁.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\begin{bmatrix}2k & -k\\ -k & k\end{bmatrix}\begin{Bmatrix}u_1\\ u_2\end{Bmatrix} = \begin{Bmatrix}0\\ F_2\end{Bmatrix}\).</li>
      <li>Eliminate u₁: \(\begin{bmatrix}1 & -1/2\\ 0 & k/2\end{bmatrix}\) → \(\bar T = 1/2\), \(\bar K = k/2\).</li>
      <li>Check: \([T]^T[K][T] = [\tfrac12\ \ 1]\begin{bmatrix}2k & -k\\ -k & k\end{bmatrix}\begin{bmatrix}\tfrac12\\ 1\end{bmatrix} = k/2\) ✓ — two equal springs in series.
        <span class="result">K̄ = k/2, u₁ = u₂/2</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 9.2 — condensing a three-story building', html: String.raw`
<div class="ex">
  <div class="ex-head">m = 25, 50, 100 lb·s²/in and k = 30,000, 10,000, 10,000 lb/in (floors 1 to 3). Find the frequencies and modes, then condense the first floor and compare.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Full problem: \(\begin{vmatrix} 40{,}000 - 25\omega^2 & -10{,}000 & 0\\ -10{,}000 & 20{,}000 - 50\omega^2 & -10{,}000\\ 0 & -10{,}000 & 10{,}000 - 100\omega^2\end{vmatrix} = 0\) → ω = 6.005, 20.00, 40.79 rad/s.</li>
      <li>Condense u₁: \(\bar T = -K_{ss}^{-1}K_{sp} = [0.25\ \ 0]\), so \([T] = \begin{bmatrix}0.25 & 0\\ 1 & 0\\ 0 & 1\end{bmatrix}\).</li>
      <li>\([\bar K] = \begin{bmatrix}17{,}500 & -10{,}000\\ -10{,}000 & 10{,}000\end{bmatrix}\), \([\bar M] = \begin{bmatrix}51.56 & 0\\ 0 & 100\end{bmatrix}\) (m₂ + 0.25²m₁ = 50 + 1.56).</li>
      <li>Reduced eigenproblem: ω = 6.005 and 20.08 rad/s.</li>
    </ol>
    <div class="tbl-wrap"><table class="tbl num">
      <thead><tr><th>Mode</th><th>Exact ω (rad/s)</th><th>Condensed ω (rad/s)</th><th>Error</th><th>Exact shape (u₁ : u₂ : u₃)</th><th>Condensed shape</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>6.005</td><td>6.005</td><td>0.01 %</td><td>1 : 3.91 : 6.11</td><td>1 : 4 : 6.26</td></tr>
        <tr><td>2</td><td>20.00</td><td>20.08</td><td>0.4 %</td><td>1 : 3 : −1</td><td>1 : 4 : −1.32</td></tr>
        <tr><td>3</td><td>40.79</td><td>—</td><td>—</td><td>1 : −0.16 : 0.01</td><td>—</td></tr>
      </tbody>
    </table></div>
    <p class="result">Frequencies are excellent; mode shapes less so, and the third mode is lost.</p>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Condense only DOF with no external load and small mass (rotations, internal nodes).</li>
  <li>Massless DOF condense exactly; massive ones introduce error in higher modes.</li>
  <li>Keep at least twice as many primary DOF as the modes you need.</li>
  <li>Recover the condensed displacements with {u_s} = [T̄]{u_p}.</li>
</ul>` }
      ]
    }
  ]
});
