/* Lesson 15 — Beam analysis using the stiffness method (Chhay/Hibbeler Ch. 15) */
KCE_COURSE.lessons.push({
  id: 'beam-stiffness',
  num: 15,
  title: 'Matrix Stiffness Method: Beams',
  desc: 'Beam elements and code numbers, the 4×4 beam-member stiffness matrix, the structure stiffness matrix, intermediate loads by equivalent nodal forces, and support settlement.',
  icon: '➖',
  color: 'mint',
  meta: ['Ch. 15', 'Shear & rotation DOFs', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>For a beam each node has two degrees of freedom — a vertical displacement and a rotation (axial deformation is ignored). Nodes are placed at supports, at free ends and wherever a displacement is wanted; the beam between nodes is an <strong>element</strong> with a 4×4 stiffness matrix.</p>` },
        { title: 'Description', html: String.raw`
<p>Element of length L with codes \(N_y, N_z, F_y, F_z\) (vertical shear and moment at the near and far ends):</p>
$$k = \begin{bmatrix}\dfrac{12EI}{L^3} & \dfrac{6EI}{L^2} & -\dfrac{12EI}{L^3} & \dfrac{6EI}{L^2}\\[4pt] \dfrac{6EI}{L^2} & \dfrac{4EI}{L} & -\dfrac{6EI}{L^2} & \dfrac{2EI}{L}\\[4pt] -\dfrac{12EI}{L^3} & -\dfrac{6EI}{L^2} & \dfrac{12EI}{L^3} & -\dfrac{6EI}{L^2}\\[4pt] \dfrac{6EI}{L^2} & \dfrac{2EI}{L} & -\dfrac{6EI}{L^2} & \dfrac{4EI}{L}\end{bmatrix}$$
<p>Beam elements need no transformation: local and global axes coincide.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Divide the beam into elements; number the nodes and the DOFs (free ones first).</li>
  <li>Write each \(k\), label it with its code numbers and assemble \(K\).</li>
  <li>Known loads \(Q_k\) and known displacements \(D_k\) (zero, or a settlement).</li>
  <li>Solve \(Q_k = K_{11}D_u + K_{12}D_k\) for \(D_u\); reactions \(Q_u = K_{21}D_u + K_{22}D_k\).</li>
  <li>Element end forces \(q = kd + q_0\), where \(q_0\) are the fixed-end forces of any load on the element.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="Overhanging beam of Example 15-1">
    <path class="ln" d="M60 90 H460"/><polygon class="ln" points="60,90 50,108 70,108"/><circle class="ln" cx="260" cy="100" r="9"/>
    <path class="acc" d="M460 40 V86"/><polygon class="accf" points="460,89 455,79 465,79"/><text x="468" y="54">5 kN</text>
    <text x="40" y="84">①</text><text x="252" y="80">②</text><text x="452" y="114">③</text>
    <text x="150" y="80" class="m">element 1</text><text x="340" y="80" class="m">element 2</text>
    <path class="dim" d="M60 140 H460"/><text x="150" y="156" class="m">2 m</text><text x="350" y="156" class="m">2 m</text>
    <text x="40" y="186" class="m">codes: ③ = 1 (θ), 2 (v) · ② = 3 (θ), 5 (v) · ① = 4 (θ), 6 (v)</text>
  </svg>
  <figcaption>Figure 1 — Example 15-1: pin at ①, roller at ②, 5 kN at the free end ③; EI constant.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Intermediate loads and settlement', html: String.raw`
<p>The stiffness method only accepts loads at the nodes. A load between nodes is replaced by <strong>equivalent nodal loads</strong> — the fixed-end reactions reversed: for a uniform load \(w\), \(wL/2\) and \(\pm wL^2/12\) at each end. After solving, the element’s real end forces are \(q = kd + q_0\), with \(q_0\) the fixed-end forces.</p>
<p>A support settlement is a known displacement in \(D_k\): it enters through \(K_{12}D_k\) on the right-hand side.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 15-1 — overhanging beam', html: String.raw`
<div class="ex">
  <div class="ex-head">Find the reactions of the beam in Figure 1 and the displacements of the free DOFs.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Both elements have L = 2 m: \(12EI/L^3 = 1.5EI\), \(6EI/L^2 = 1.5EI\), \(4EI/L = 2EI\), \(2EI/L = EI\).</li>
      <li>Known: \(Q_1 = 0\), \(Q_2 = -5\) kN, \(Q_3 = Q_4 = 0\); \(D_5 = D_6 = 0\). Assembled (free part):
        $$\begin{bmatrix}0\\ -5\\ 0\\ 0\end{bmatrix} = EI\begin{bmatrix}2 & -1.5 & 1 & 0\\ -1.5 & 1.5 & -1.5 & 0\\ 1 & -1.5 & 4 & 1\\ 0 & 0 & 1 & 2\end{bmatrix}\begin{bmatrix}D_1\\ D_2\\ D_3\\ D_4\end{bmatrix}$$</li>
      <li>Solving: \(D_1 = -16.67/EI\), \(D_2 = -26.67/EI\), \(D_3 = -6.67/EI\), \(D_4 = 3.33/EI\).</li>
      <li>Reactions from rows 5 and 6 of K: \(Q_5 = EI(1.5D_1 - 1.5D_2 - 1.5D_4) = -25 + 40 - 5 = 10\) kN; \(Q_6 = EI(1.5D_3 + 1.5D_4) = -10 + 5 = -5\) kN.
        <span class="result">Roller ② = 10 kN ↑, pin ① = 5 kN ↓; tip deflection 26.67/EI ↓</span></li>
    </ol>
  </div>
</div>
<p>Check by statics: \(\sum M_{①} = 0\): \(R_②(2) = 5(4)\) → \(R_② = 10\) kN ✓.</p>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Two DOFs per node: vertical displacement and rotation.</li>
  <li>Loads between nodes → equivalent nodal loads; add the fixed-end forces back at the end.</li>
  <li>Verify reactions with equilibrium of the whole beam.</li>
</ul>` }
      ]
    }
  ]
});
