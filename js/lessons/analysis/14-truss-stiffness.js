/* Lesson 14 — Truss analysis using the stiffness method (Chhay/Hibbeler Ch. 14 + Appendix A) */
KCE_COURSE.lessons.push({
  id: 'truss-stiffness',
  num: 14,
  title: 'Matrix Stiffness Method: Trusses',
  desc: 'Matrix algebra review, member and global stiffness matrices, transformation matrices, assembling the structure stiffness matrix, solving for displacements, thermal and fabrication effects, and space trusses.',
  icon: '🧮',
  color: 'rose',
  meta: ['Ch. 14 & App. A', 'K·D = Q', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The <strong>stiffness method</strong> is the displacement method written in matrix form — the basis of every structural analysis program. Each member’s stiffness is expressed in global coordinates, the members are assembled into one structure stiffness matrix \(K\), and \(Q = KD\) is solved for the unknown joint displacements. Member forces follow from the displacements.</p>` },
        { title: 'Description', html: String.raw`
<p>Truss member with direction cosines \(\lambda_x = (x_F - x_N)/L\), \(\lambda_y = (y_F - y_N)/L\), code numbers \(N_x, N_y, F_x, F_y\):</p>
$$k = \frac{AE}{L}\begin{bmatrix}\lambda_x^2 & \lambda_x\lambda_y & -\lambda_x^2 & -\lambda_x\lambda_y\\ \lambda_x\lambda_y & \lambda_y^2 & -\lambda_x\lambda_y & -\lambda_y^2\\ -\lambda_x^2 & -\lambda_x\lambda_y & \lambda_x^2 & \lambda_x\lambda_y\\ -\lambda_x\lambda_y & -\lambda_y^2 & \lambda_x\lambda_y & \lambda_y^2\end{bmatrix}$$
<p>Member force (tension positive): \(q_F = \dfrac{AE}{L}\begin{bmatrix}-\lambda_x & -\lambda_y & \lambda_x & \lambda_y\end{bmatrix}\begin{bmatrix}D_{Nx}\\ D_{Ny}\\ D_{Fx}\\ D_{Fy}\end{bmatrix}\)</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Number the joints and members; give each member a near and far end. Number the degrees of freedom: <strong>unconstrained first</strong> (lowest code numbers), constrained last.</li>
  <li>Write each member’s \(k\) (4×4) and label rows and columns with its code numbers.</li>
  <li>Assemble \(K\) by adding each entry into the row/column of its code numbers.</li>
  <li>Partition \(\begin{bmatrix}Q_k\\ Q_u\end{bmatrix} = \begin{bmatrix}K_{11} & K_{12}\\ K_{21} & K_{22}\end{bmatrix}\begin{bmatrix}D_u\\ D_k\end{bmatrix}\); solve \(D_u = K_{11}^{-1}(Q_k - K_{12}D_k)\), then \(Q_u = K_{21}D_u + K_{22}D_k\) (reactions).</li>
  <li>Member forces from the formula for \(q_F\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 290" role="img" aria-label="Two-member truss of Examples 14-1 and 14-3">
    <path class="ln" d="M100 220 H340 L340 220 M100 220 L340 40"/>
    <rect class="conc" x="340" y="28" width="16" height="24"/><rect class="conc" x="340" y="208" width="16" height="24"/>
    <g class="accf"><circle cx="100" cy="220" r="5"/><circle cx="340" cy="40" r="5"/><circle cx="340" cy="220" r="5"/></g>
    <path class="acc" d="M100 226 V250"/><polygon class="accf" points="100,256 95,246 105,246"/><text x="110" y="252">2 kN</text>
    <text x="78" y="214">②</text><text x="322" y="34">①</text><text x="322" y="244">③</text>
    <text x="210" y="212" class="m">member 1</text><text x="190" y="118" class="m">member 2</text>
    <path class="dim" d="M100 240 H340 M380 40 V220"/><text x="210" y="238" class="m">3 m</text><text x="386" y="134" class="m">4 m</text>
    <text x="150" y="284" class="m">DOF: ② = 1 (x), 2 (y); ③ = 3, 4; ① = 5, 6</text>
  </svg>
  <figcaption>Figure 1 — Examples 14-1 and 14-3: joint ② is free; ① and ③ are pinned. AE constant.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Matrix algebra review (Appendix A)', html: String.raw`
<ul>
  <li><strong>Product:</strong> \((AB)_{ij} = \sum_k A_{ik}B_{kj}\) — columns of A must equal rows of B; \(AB \ne BA\) in general; \((AB)^T = B^TA^T\).</li>
  <li><strong>Determinant</strong> (2×2): \(|A| = a_{11}a_{22} - a_{12}a_{21}\); larger by cofactor expansion. \(|A| = 0\) means singular — for a structure, unstable.</li>
  <li><strong>Inverse:</strong> \(A^{-1} = \dfrac{\text{adj}A}{|A|}\), \(AA^{-1} = I\).</li>
  <li><strong>Gauss elimination</strong> solves \(KD = Q\) without forming the inverse — what programs do.</li>
</ul>` },
        { title: 'Transformation, temperature and fabrication errors', html: String.raw`
<p>Local member stiffness \(k' = \dfrac{AE}{L}\begin{bmatrix}1 & -1\\ -1 & 1\end{bmatrix}\); with \(T = \begin{bmatrix}\lambda_x & \lambda_y & 0 & 0\\ 0 & 0 & \lambda_x & \lambda_y\end{bmatrix}\) the global matrix is \(k = T^Tk'T\).</p>
<p>A member heated by \(\Delta T\) or made too long by \(\Delta L\) is treated like a load: its fixed-end forces \(\pm AE\,\alpha\Delta T\) (or \(\pm AE\,\Delta L/L\)), resolved by \(\lambda_x, \lambda_y\), are subtracted from \(Q_k\); afterwards add \((q_F)_0 = -AE\alpha\Delta T\) to the member force.</p>
<p><strong>Space trusses:</strong> the same procedure with \(\lambda_z\) and a 6×6 member matrix.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 14-1 — structure stiffness matrix', html: String.raw`
<div class="ex">
  <div class="ex-head">Find the structure stiffness matrix of the two-member truss in Figure 1. AE is constant.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Member 1 (② → ③, L = 3 m): \(\lambda_x = 1\), \(\lambda_y = 0\); codes 1, 2, 3, 4:
        $$k_1 = AE\begin{bmatrix}0.333 & 0 & -0.333 & 0\\ 0 & 0 & 0 & 0\\ -0.333 & 0 & 0.333 & 0\\ 0 & 0 & 0 & 0\end{bmatrix}$$</li>
      <li>Member 2 (② → ①, L = 5 m): \(\lambda_x = 0.6\), \(\lambda_y = 0.8\); codes 1, 2, 5, 6:
        $$k_2 = AE\begin{bmatrix}0.072 & 0.096 & -0.072 & -0.096\\ 0.096 & 0.128 & -0.096 & -0.128\\ -0.072 & -0.096 & 0.072 & 0.096\\ -0.096 & -0.128 & 0.096 & 0.128\end{bmatrix}$$</li>
      <li>Assemble into 6×6: e.g. \(K_{11} = 0.333 + 0.072 = 0.405\), \(K_{12} = 0.096\), \(K_{22} = 0.128\) (× AE).
        <span class="result">K is 6×6; the free part K₁₁ = AE [0.405 0.096; 0.096 0.128]</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 14-3 — displacements, reactions and forces', html: String.raw`
<div class="ex">
  <div class="ex-head">The same truss carries 2 kN downward at joint ②. Find the displacements of ②, the reactions and the member forces.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Known: \(D_3 = D_4 = D_5 = D_6 = 0\); \(Q_1 = 0\), \(Q_2 = -2\) kN.
        $$\begin{bmatrix}0\\ -2\end{bmatrix} = AE\begin{bmatrix}0.405 & 0.096\\ 0.096 & 0.128\end{bmatrix}\begin{bmatrix}D_1\\ D_2\end{bmatrix}\ \Rightarrow\ D_1 = \frac{4.505}{AE},\ D_2 = \frac{-19.003}{AE}$$</li>
      <li>Reactions \(Q_u = K_{21}D_u\): \(Q_3 = -0.333(4.505) = -1.5\) kN, \(Q_4 = 0\), \(Q_5 = -0.072(4.505) - 0.096(-19.003) = 1.5\) kN, \(Q_6 = -0.096(4.505) - 0.128(-19.003) = 2.0\) kN.</li>
      <li>Member 1: \(q = \tfrac{AE}{3}[-1\ \ 0\ \ 1\ \ 0]\cdot\tfrac1{AE}[4.505,\ -19.003,\ 0,\ 0] = -1.5\) kN; member 2: \(q = \tfrac{AE}{5}[-0.6\ \ -0.8\ \ 0.6\ \ 0.8]\cdot\tfrac1{AE}[4.505,\ -19.003,\ 0,\ 0] = 2.5\) kN.
        <span class="result">D₁ = 4.505/AE (→), D₂ = −19.003/AE (↓) · member 1 = 1.5 kN (C), member 2 = 2.5 kN (T)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>K is symmetric, and its diagonal entries are positive.</li>
  <li>Number the free DOFs first so that \(K_{11}\) is the upper-left block.</li>
  <li>Check the reactions with \(\sum F_x = 0\) and \(\sum F_y = 0\) for the whole truss.</li>
</ul>` }
      ]
    }
  ]
});
