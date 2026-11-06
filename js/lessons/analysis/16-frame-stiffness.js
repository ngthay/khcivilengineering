/* Lesson 16 — Plane frame analysis using the stiffness method (Chhay/Hibbeler Ch. 16) */
KCE_COURSE.lessons.push({
  id: 'frame-stiffness',
  num: 16,
  title: 'Matrix Stiffness Method: Plane Frames',
  desc: 'The 6×6 frame-member stiffness matrix, displacement and force transformation matrices, the global member matrix, and the step-by-step analysis of a plane frame.',
  icon: '🏛️',
  color: 'violet',
  meta: ['Ch. 16', 'k = Tᵀk′T', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A frame member resists axial force, shear and bending, so each node of a plane frame has three degrees of freedom: \(x\), \(y\) and rotation. The member matrix combines the truss term \(AE/L\) with the beam terms; a transformation matrix rotates it from the member’s own axes into the global axes.</p>` },
        { title: 'Description', html: String.raw`
<p>Local stiffness matrix \(k'\) (order: \(N_{x'}, N_{y'}, N_{z'}, F_{x'}, F_{y'}, F_{z'}\)):</p>
$$k' = \begin{bmatrix}\tfrac{AE}{L} & 0 & 0 & -\tfrac{AE}{L} & 0 & 0\\ 0 & \tfrac{12EI}{L^3} & \tfrac{6EI}{L^2} & 0 & -\tfrac{12EI}{L^3} & \tfrac{6EI}{L^2}\\ 0 & \tfrac{6EI}{L^2} & \tfrac{4EI}{L} & 0 & -\tfrac{6EI}{L^2} & \tfrac{2EI}{L}\\ -\tfrac{AE}{L} & 0 & 0 & \tfrac{AE}{L} & 0 & 0\\ 0 & -\tfrac{12EI}{L^3} & -\tfrac{6EI}{L^2} & 0 & \tfrac{12EI}{L^3} & -\tfrac{6EI}{L^2}\\ 0 & \tfrac{6EI}{L^2} & \tfrac{2EI}{L} & 0 & -\tfrac{6EI}{L^2} & \tfrac{4EI}{L}\end{bmatrix}$$
<p>Displacement transformation \(d' = TD\) with</p>
$$T = \begin{bmatrix}\lambda_x & \lambda_y & 0 & 0 & 0 & 0\\ -\lambda_y & \lambda_x & 0 & 0 & 0 & 0\\ 0 & 0 & 1 & 0 & 0 & 0\\ 0 & 0 & 0 & \lambda_x & \lambda_y & 0\\ 0 & 0 & 0 & -\lambda_y & \lambda_x & 0\\ 0 & 0 & 0 & 0 & 0 & 1\end{bmatrix},\qquad k = T^Tk'T,\qquad q' = k'TD$$` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Number nodes, members and DOFs (free first); choose near and far ends; compute \(\lambda_x, \lambda_y\) and the stiffness terms \(AE/L\), \(12EI/L^3\), \(6EI/L^2\), \(4EI/L\), \(2EI/L\).</li>
  <li>Form each \(k = T^Tk'T\) (6×6), label with code numbers, assemble \(K\).</li>
  <li>Add equivalent nodal loads for member loads; solve \(Q_k = K_{11}D_u\) (zero settlements) for \(D_u\).</li>
  <li>Reactions \(Q_u = K_{21}D_u\); member end forces \(q' = k'TD + q'_0\) in local axes.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 280" role="img" aria-label="L-shaped frame of Example 16-1">
    <path class="ln" d="M80 60 H320 V240"/>
    <circle class="ln" cx="80" cy="74" r="8"/><path class="ln" d="M64 84 H96"/>
    <rect class="conc" x="300" y="240" width="40" height="14"/>
    <path class="acc" d="M330 60 H380"/><polygon class="accf" points="384,60 374,55 374,65"/><text x="390" y="64">20 kN</text>
    <text x="60" y="52">①</text><text x="300" y="52">②</text><text x="344" y="234">③</text>
    <text x="180" y="52" class="m">member 1 (6 m)</text><text x="230" y="160" class="m">member 2 (6 m)</text>
    <text x="40" y="120" class="m">① roller: x and rotation free</text><text x="40" y="140" class="m">③ fixed</text>
  </svg>
  <figcaption>Figure 1 — Example 16-1: E = 200 GPa, A = 6000 mm², I = 180(10⁶) mm⁴ for both members.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Global member stiffness matrix', html: String.raw`
<p>Multiplying out \(T^Tk'T\) gives the global matrix directly in terms of \(\lambda_x, \lambda_y\); for example the first diagonal term is \(\dfrac{AE}{L}\lambda_x^2 + \dfrac{12EI}{L^3}\lambda_y^2\) and the rotational terms are \(\pm\dfrac{6EI}{L^2}\lambda_y\), \(\pm\dfrac{6EI}{L^2}\lambda_x\), \(4EI/L\), \(2EI/L\). A horizontal member (\(\lambda_x = 1\)) gives back \(k'\); a vertical member swaps the axial and shear terms.</p>
<p>Programs such as ETABS, SAP2000 or Midas run exactly this procedure, with more DOFs.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 16-1 — L-shaped frame', html: String.raw`
<div class="ex">
  <div class="ex-head">Find the loads at the joints of the frame in Figure 1 (20 kN horizontal at ②).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Both members, L = 6 m: \(AE/L = 200(10^3)\), \(12EI/L^3 = 2(10^3)\), \(6EI/L^2 = 6(10^3)\), \(4EI/L = 24(10^3)\), \(2EI/L = 12(10^3)\) (kN, m). <em>The Khmer edition prints I = 1800(10⁶) mm⁴ in the statement but calculates with 180(10⁶).</em></li>
      <li>Member 1 (① → ②) is horizontal, so \(k_1 = k'\); member 2 (② → ③) is vertical (\(\lambda_x = 0\), \(\lambda_y = -1\)). Assemble the 9×9 \(K\); the free DOFs are ②: x, y, θ and ①: x, θ.</li>
      <li>Solving \(Q_k = K_{11}D_u\) with only \(Q = 20\) kN in x at ②: horizontal sway of ① and ② = 17.5 mm, \(\theta_② = -0.00250\) rad, \(\theta_① = 0.00124\) rad, \(\Delta_{y②} = -0.04\) mm.</li>
      <li>Member forces: member 1 — shear 7.50 kN, moment at ② 45.0 kN·m, no axial force; member 2 — axial 7.50 kN (C), shear 20 kN, moment 45.0 kN·m at ② and 75.0 kN·m at the base.
        <span class="result">① vertical reaction 7.50 kN ↓ · base ③: 20 kN ←, 7.50 kN ↑, 75.0 kN·m</span></li>
    </ol>
  </div>
</div>
<p>Check by statics: \(\sum M_③ = 0\): \(20(6) - 7.50(6) = 75\) kN·m ✓.</p>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Three DOFs per node; members carry axial force, shear and moment.</li>
  <li>Compute member forces in local axes with \(q' = k'TD\), not with the global \(k\).</li>
  <li>Check reactions against the equilibrium of the whole frame.</li>
</ul>` }
      ]
    }
  ]
});
