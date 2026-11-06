/* Lesson 5 — NumPy: arrays, vectorised calculations and linear algebra */
KCE_COURSE.lessons.push({
  id: 'numpy',
  num: 5,
  title: 'NumPy — Arrays, Vectorised Calculations and Linear Algebra',
  desc: 'Creating arrays, calculating along a whole beam in one line, max and argmax, matrices, solving K u = F, and natural frequencies and mode shapes from the eigenvalue problem of a two-story shear building.',
  icon: '🧮',
  color: 'violet',
  meta: ['np.array · linalg', 'K u = F · eigen', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>NumPy</strong> adds the <em>array</em>: a table of numbers on which arithmetic works element by element, without loops. It is the base of SciPy, pandas, Matplotlib, scikit-learn and OpenSeesPy. Import it as <code>np</code>:</p>
${kcePy(String.raw`
import numpy as np

x = np.array([0.0, 1.5, 3.0])       # from a list
x = np.linspace(0, 6, 13)           # 13 equal points from 0 to 6
x = np.arange(0, 6.01, 0.5)         # 0, 0.5, ..., 6.0 (step 0.5)
z = np.zeros(10); one = np.ones((3, 3)); I3 = np.eye(3)

y = 2 * x**2 + 1                    # element by element, no loop
print(y.max(), y.argmax(), y.sum(), y.mean())
print(x[x > 3])                     # elements that satisfy a condition
`)}` },
        { title: 'Matrices', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Operation</th><th>NumPy</th></tr></thead>
  <tbody>
    <tr><td>Matrix product A·B</td><td><code>A @ B</code> (<code>A * B</code> is element by element!)</td></tr>
    <tr><td>Transpose</td><td><code>A.T</code></td></tr>
    <tr><td>Solve A x = b</td><td><code>np.linalg.solve(A, b)</code> — faster and more accurate than the inverse</td></tr>
    <tr><td>Inverse, determinant</td><td><code>np.linalg.inv(A)</code>, <code>np.linalg.det(A)</code></td></tr>
    <tr><td>Eigenvalues and vectors</td><td><code>np.linalg.eig(A)</code>; for symmetric problems <code>scipy.linalg.eigh(K, M)</code></td></tr>
    <tr><td>Pick rows and columns</td><td><code>K[np.ix_(free, free)]</code></td></tr>
  </tbody>
</table></div>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Structures as matrix equations', html: String.raw`
<p>A structure with n degrees of freedom has a stiffness matrix K (n × n). Static analysis solves</p>
$$[K]\{u\} = \{F\}$$
<p>and free vibration (Dynamics course, Lesson 7) leads to the generalised eigenvalue problem</p>
$$[K]\{\phi\} = \omega^2[M]\{\phi\}\quad\Longleftrightarrow\quad [M]^{-1}[K]\{\phi\} = \omega^2\{\phi\}$$
<p>For a shear building with story stiffnesses k₁, k₂ and floor masses m₁, m₂:</p>
$$[K] = \begin{bmatrix}k_1 + k_2 & -k_2\\ -k_2 & k_2\end{bmatrix},\qquad [M] = \begin{bmatrix}m_1 & 0\\ 0 & m_2\end{bmatrix}$$` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Moment and deflection along a beam', html: String.raw`
<p>The beam of Lesson 1 (w = 25 kN/m, L = 6 m, EI = 30×10⁶ × 0.003125 kN·m²). With an array of positions, the formulas \(M = wx(L-x)/2\) and \(y = wx(L^3 - 2Lx^2 + x^3)/24EI\) are evaluated everywhere at once:</p>
${kcePy(String.raw`
import numpy as np

w, L, E, I = 25.0, 6.0, 30e6, 0.003125       # kN/m, m, kN/m², m⁴
x = np.linspace(0, L, 7)                      # 7 points: 0, 1, ..., 6 m
M = w * x * (L - x) / 2                       # bending moment, kN.m
y = w * x * (L**3 - 2 * L * x**2 + x**3) / (24 * E * I)   # deflection, m

print("x (m):", x)
print("M (kN.m):", M)
print("y (mm):", np.round(y * 1000, 2))
print("max M =", M.max(), "at x =", x[M.argmax()], "m")
`, 'beam_numpy.py')}
${kceOut(String.raw`
x (m): [0. 1. 2. 3. 4. 5. 6.]
M (kN.m): [  0.   62.5 100.  112.5 100.   62.5   0. ]
y (mm): [0.   2.28 3.91 4.5  3.91 2.28 0.  ]
max M = 112.5 at x = 3.0 m
`)}` },
        { title: 'Static and modal analysis of a shear building', html: String.raw`
<p>The two-story frame of Example 7.1 in the Dynamics course (lb, in, s; g = 386 in/s²): k₁ = 30,700 lb/in, k₂ = 44,300 lb/in, W₁ = 52,500 lb, W₂ = 25,500 lb.</p>
${kcePy(String.raw`
import numpy as np

# Two-story shear building (Dynamics course, Example 7.1), lb, in, s
k1, k2 = 30700.0, 44300.0                   # story stiffness, lb/in
m1, m2 = 52500 / 386, 25500 / 386           # floor mass, lb.s²/in

K = np.array([[k1 + k2, -k2],
              [-k2,      k2]])
M = np.diag([m1, m2])

# Static: lateral forces 1000 lb and 500 lb -> floor displacements
F = np.array([1000.0, 500.0])
u = np.linalg.solve(K, F)
print("u (in) =", np.round(u, 4))

# Free vibration: K phi = w² M phi
w2, phi = np.linalg.eig(np.linalg.solve(M, K))
order = np.argsort(w2)
omega = np.sqrt(w2[order])
phi = phi[:, order] / phi[0, order]          # scale so the first floor = 1
print("omega (rad/s) =", np.round(omega, 2))
print("T (s)         =", np.round(2 * np.pi / omega, 3))
print("modes (floor 2 / floor 1) =", np.round(phi[1], 3))
`, 'shear_building.py')}
${kceOut(String.raw`
u (in) = [0.0489 0.0601]
omega (rad/s) = [11.83 32.9 ]
T (s)         = [0.531 0.191]
modes (floor 2 / floor 1) = [ 1.264 -1.629]
`)}
<ol class="steps">
  <li>Static check by hand: the first story carries 1500 lb → u₁ = 1500/30,700 = 0.0489 in; the second carries 500 lb → u₂ = u₁ + 500/44,300 = 0.0601 in ✓.</li>
  <li><code>np.linalg.eig</code> does not sort its results, so <code>np.argsort</code> puts the modes in order of frequency.</li>
  <li>The frequencies 11.83 and 32.9 rad/s and the mode shapes 1.263 / −1.629 agree with the book example in the Dynamics course.</li>
</ol>
<p class="result">ω₁ = 11.83 rad/s (T₁ = 0.531 s), ω₂ = 32.90 rad/s (T₂ = 0.191 s)</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Replace loops over numbers with array expressions.</li>
  <li>Use <code>@</code> for matrix products and <code>np.linalg.solve</code> instead of the inverse.</li>
  <li>Sort eigenvalues before using them; normalise mode shapes in a stated way.</li>
  <li>Check the matrix result for one simple case by hand.</li>
</ul>` }
      ]
    }
  ]
});
