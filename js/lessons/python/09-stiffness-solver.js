/* Lesson 9 — Write your own frame analysis program (direct stiffness method) */
KCE_COURSE.lessons.push({
  id: 'stiffness-solver',
  num: 9,
  title: 'Write Your Own Frame Analysis — The Direct Stiffness Method',
  desc: 'A complete 2D frame program in about 50 lines: element stiffness, rotation to global axes, assembly, supports, uniform loads by fixed-end forces, reactions and member end forces — verified on a two-span beam and a portal frame.',
  icon: '🏗️',
  color: 'blue',
  meta: ['Stiffness method', '2D frame', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Commercial programs such as ETABS and SAP2000 are built on the <strong>direct stiffness method</strong>. Writing a small version yourself shows exactly what they do, and gives you a tool you can check, change and use inside other scripts (optimisation, many load cases, teaching).</p>
<ol>
  <li>For every element, form the 6 × 6 stiffness matrix in local axes and rotate it to global axes.</li>
  <li>Add (assemble) each element matrix into the global K at the element’s degrees of freedom.</li>
  <li>Build the load vector F: nodal loads, minus the fixed-end forces of member loads.</li>
  <li>Remove the supported DOFs and solve \(K_{ff}u_f = F_f\).</li>
  <li>Reactions \(R = Ku - F\); member end forces \(f = k\,T\,u_e + f_{FEF}\).</li>
</ol>` },
        { title: 'Element matrices', html: String.raw`
<p>Each node has three DOFs: u_x, u_y and θ. In local axes (x along the member) the frame element is</p>
$$[k] = \begin{bmatrix}
\tfrac{EA}{L} & 0 & 0 & -\tfrac{EA}{L} & 0 & 0\\
0 & \tfrac{12EI}{L^3} & \tfrac{6EI}{L^2} & 0 & -\tfrac{12EI}{L^3} & \tfrac{6EI}{L^2}\\
0 & \tfrac{6EI}{L^2} & \tfrac{4EI}{L} & 0 & -\tfrac{6EI}{L^2} & \tfrac{2EI}{L}\\
-\tfrac{EA}{L} & 0 & 0 & \tfrac{EA}{L} & 0 & 0\\
0 & -\tfrac{12EI}{L^3} & -\tfrac{6EI}{L^2} & 0 & \tfrac{12EI}{L^3} & -\tfrac{6EI}{L^2}\\
0 & \tfrac{6EI}{L^2} & \tfrac{2EI}{L} & 0 & -\tfrac{6EI}{L^2} & \tfrac{4EI}{L}
\end{bmatrix},\qquad [K_e] = [T]^T[k][T]$$
<p>where T contains the direction cosines c = Δx/L, s = Δy/L. A uniform load w (acting downward, perpendicular to the member) has fixed-end forces wL/2 and ±wL²/12, which are applied to the nodes with the opposite sign.</p>` }
      ]
    },
    {
      title: 'Code',
      subs: [
        { title: 'The program', html: String.raw`
${kcePy(String.raw`
import numpy as np

def frame_element(xi, yi, xj, yj, E, A, I):
    """Global stiffness matrix (6x6), transformation matrix and length
    of a 2D frame element. DOFs per node: ux, uy, rotation."""
    L = np.hypot(xj - xi, yj - yi)
    c, s = (xj - xi) / L, (yj - yi) / L
    a, b1, b2, b3 = E * A / L, 12 * E * I / L**3, 6 * E * I / L**2, E * I / L
    k = np.array([[ a,   0,    0,    -a,   0,    0   ],
                  [ 0,   b1,   b2,    0,  -b1,   b2  ],
                  [ 0,   b2,   4*b3,  0,  -b2,   2*b3],
                  [-a,   0,    0,     a,   0,    0   ],
                  [ 0,  -b1,  -b2,    0,   b1,  -b2  ],
                  [ 0,   b2,   2*b3,  0,  -b2,   4*b3]])
    T = np.zeros((6, 6))
    T[:3, :3] = T[3:, 3:] = [[c, s, 0], [-s, c, 0], [0, 0, 1]]
    return T.T @ k @ T, T, k, L

def solve_frame(nodes, elements, supports, loads, udl):
    """nodes: [(x, y)], elements: [(i, j, E, A, I)], supports: {node: (fx, fy, fr)}
    loads: {node: (Fx, Fy, M)}, udl: {element: w (local, downward +)}"""
    ndof = 3 * len(nodes)
    K = np.zeros((ndof, ndof)); F = np.zeros(ndof)
    fef_all = []
    for e, (i, j, E, A, I) in enumerate(elements):
        kg, T, k, L = frame_element(*nodes[i], *nodes[j], E, A, I)
        dofs = [3*i, 3*i+1, 3*i+2, 3*j, 3*j+1, 3*j+2]
        K[np.ix_(dofs, dofs)] += kg
        w = udl.get(e, 0.0)
        fef = np.array([0, w*L/2, w*L**2/12, 0, w*L/2, -w*L**2/12])  # fixed-end forces
        F[dofs] -= T.T @ fef                    # equivalent nodal loads
        fef_all.append((dofs, T, k, fef))
    for n, (fx, fy, m) in loads.items():
        F[3*n:3*n+3] += [fx, fy, m]
    fixed = [3*n + d for n, r in supports.items() for d in range(3) if r[d]]
    free = [d for d in range(ndof) if d not in fixed]
    U = np.zeros(ndof)
    U[free] = np.linalg.solve(K[np.ix_(free, free)], F[free])
    R = K @ U - F                                # reactions at the fixed DOFs
    forces = [k @ (T @ U[dofs]) + fef for dofs, T, k, fef in fef_all]
    return U, R, forces
`, 'frame2d.py')}
<ul>
  <li>Units must be consistent; the examples use kN and m.</li>
  <li><code>supports</code> uses 1 for a restrained DOF: a pin is <code>(1, 1, 0)</code>, a roller <code>(0, 1, 0)</code>, a fixed base <code>(1, 1, 1)</code>.</li>
  <li>Member end forces are in local axes: [N_i, V_i, M_i, N_j, V_j, M_j], positive along local x, local y and counter-clockwise.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Two-span continuous beam', html: String.raw`
<p>Two equal spans of 6 m, 300 × 600 mm, E = 30 GPa, w = 20 kN/m on both spans. Add to the end of <code>frame2d.py</code>:</p>
${kcePy(String.raw`
# Two-span continuous beam, 2 x 6 m, w = 20 kN/m (kN, m)
E, A, I = 30e6, 0.3 * 0.6, 0.3 * 0.6**3 / 12
nodes = [(0, 0), (6, 0), (12, 0)]
elements = [(0, 1, E, A, I), (1, 2, E, A, I)]
supports = {0: (1, 1, 0), 1: (0, 1, 0), 2: (0, 1, 0)}
U, R, forces = solve_frame(nodes, elements, supports, {}, udl={0: 20.0, 1: 20.0})

print("Vertical reactions (kN):", np.round(R[1::3], 2))
print("Moment over the middle support (kN.m):", round(forces[0][5], 2))
print("Hand check: 0.375wL =", 0.375*20*6, " 1.25wL =", 1.25*20*6, " wL²/8 =", 20*36/8)
`)}
${kceOut(String.raw`
Vertical reactions (kN): [ 45. 150.  45.]
Moment over the middle support (kN.m): -90.0
Hand check: 0.375wL = 45.0  1.25wL = 150.0  wL²/8 = 90.0
`)}
<p>The end moment of span 1 at the middle support is −90 kN·m, i.e. clockwise on the member end: a hogging moment of wL²/8 = 90 kN·m, exactly the textbook value.</p>` },
        { title: 'Portal frame under lateral load', html: String.raw`
<p>A portal 6 m wide and 4 m high with fixed bases; columns 300 × 400 mm, beam 300 × 500 mm, E = 30 GPa; 10 kN horizontal at the top of the left column:</p>
${kcePy(String.raw`
# Portal frame 4 m high, 6 m wide, fixed bases, 10 kN lateral load at the top
Ic, Ib = 0.3 * 0.4**3 / 12, 0.3 * 0.5**3 / 12
nodes = [(0, 0), (0, 4), (6, 4), (6, 0)]
elements = [(0, 1, E, 0.12, Ic), (1, 2, E, 0.15, Ib), (2, 3, E, 0.12, Ic)]
supports = {0: (1, 1, 1), 3: (1, 1, 1)}
U, R, forces = solve_frame(nodes, elements, supports, {1: (10.0, 0, 0)}, udl={})
print("Sway at the top (mm):", round(U[3] * 1000, 3))
print("Base moments (kN.m):", round(R[2], 2), round(R[11], 2))
`)}
${kceOut(String.raw`
Sway at the top (mm): 0.75
Base moments (kN.m): 11.19 11.1
`)}
<p>The two base moments differ slightly because the program includes axial shortening of the columns. Lesson 11 builds the same frame in OpenSeesPy and gets the same numbers.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Verify a new program on cases with known answers (continuous beams, cantilevers).</li>
  <li>Check equilibrium: the sum of reactions equals the sum of loads.</li>
  <li>Use consistent units and a stated sign convention for end forces.</li>
  <li>Extend step by step: point loads on members, releases (hinges), springs, P-Δ.</li>
</ul>` }
      ]
    }
  ]
});
