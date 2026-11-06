/* Lesson 8 — SciPy: root finding, integration, ODEs and optimisation */
KCE_COURSE.lessons.push({
  id: 'scipy',
  num: 8,
  title: 'SciPy — Root Finding, Integration, Differential Equations and Optimisation',
  desc: 'Solving implicit equations with brentq (Manning normal depth, Colebrook friction factor), integrating a stress block with quad, solving the equation of motion with solve_ivp, and finding an optimum section with minimize_scalar.',
  icon: '🧪',
  color: 'lilac',
  meta: ['brentq · quad · solve_ivp', 'Hydraulics · dynamics', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Many engineering equations cannot be rearranged for the unknown: the normal depth in Manning’s equation, the friction factor in Colebrook’s, the neutral axis of a section with a non-linear stress block. <strong>SciPy</strong> solves them numerically.</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Problem</th><th>Function</th><th>Engineering example</th></tr></thead>
  <tbody>
    <tr><td>Solve f(x) = 0 for one unknown</td><td><code>scipy.optimize.brentq(f, a, b)</code></td><td>Normal depth, friction factor, neutral axis depth</td></tr>
    <tr><td>Several equations</td><td><code>scipy.optimize.fsolve</code></td><td>Equilibrium of a section in N and M</td></tr>
    <tr><td>Integral ∫ f dx</td><td><code>scipy.integrate.quad</code></td><td>Stress-block force and centroid</td></tr>
    <tr><td>Differential equations</td><td><code>scipy.integrate.solve_ivp</code></td><td>Vibration, consolidation, water hammer</td></tr>
    <tr><td>Minimum / maximum</td><td><code>scipy.optimize.minimize_scalar</code>, <code>minimize</code></td><td>Most economical section</td></tr>
    <tr><td>Interpolation</td><td><code>numpy.interp</code>, <code>scipy.interpolate</code></td><td>Code tables, design charts</td></tr>
  </tbody>
</table></div>
<div class="note"><code>brentq</code> needs two values a and b where f has <strong>opposite signs</strong>. It is then guaranteed to find the root between them. Choose a and b from engineering limits (for example a depth between 1 cm and 10 m).</div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Normal depth in a rectangular channel', html: String.raw`
$$Q = \frac1n A R^{2/3} S^{1/2},\qquad A = by,\quad R = \frac{by}{b + 2y}$$
${kcePy(String.raw`
from scipy.optimize import brentq

# Normal depth of a rectangular channel by Manning's equation
Q, b, n, S = 10.0, 3.0, 0.015, 0.001       # m³/s, m, -, m/m

def manning_error(y):
    A = b * y
    R = A / (b + 2 * y)
    return A * R ** (2 / 3) * S ** 0.5 / n - Q   # zero at the normal depth

y = brentq(manning_error, 0.01, 10.0)
V = Q / (b * y)
Fr = V / (9.81 * y) ** 0.5
print(f"Normal depth y = {y:.3f} m, V = {V:.2f} m/s, Froude = {Fr:.2f}")
`, 'manning.py')}
${kceOut(String.raw`
Normal depth y = 1.806 m, V = 1.85 m/s, Froude = 0.44
`)}
<p>Check: A = 5.418 m², R = 5.418/6.612 = 0.819 m, Q = 5.418 × 0.876 × 0.0316/0.015 = 10.0 m³/s ✓. Fr &lt; 1, so the flow is subcritical.</p>` },
        { title: 'Friction factor from the Colebrook equation', html: String.raw`
$$\frac{1}{\sqrt f} = -2\log_{10}\!\left(\frac{\varepsilon/D}{3.7} + \frac{2.51}{Re\sqrt f}\right),\qquad h_f = f\frac{L}{D}\frac{V^2}{2g}$$
${kcePy(String.raw`
import math
from scipy.optimize import brentq

# Darcy friction factor from the Colebrook equation
D, eps, V, nu = 0.30, 0.045e-3, 2.0, 1.0e-6    # m, m, m/s, m²/s
Re = V * D / nu

def colebrook(f):
    return 1 / math.sqrt(f) + 2 * math.log10(eps / D / 3.7 + 2.51 / (Re * math.sqrt(f)))

f = brentq(colebrook, 1e-4, 0.1)
hf = f * 1000 / D * V**2 / (2 * 9.81)       # head loss over 1 km
print(f"Re = {Re:,.0f}, f = {f:.4f}, head loss = {hf:.2f} m per km")
`, 'colebrook.py')}
${kceOut(String.raw`
Re = 600,000, f = 0.0147, head loss = 9.99 m per km
`)}
<p>The value agrees with the Moody chart for ε/D = 0.00015 and Re = 6 × 10⁵ (f ≈ 0.015).</p>` },
        { title: 'Integrating a parabolic stress block', html: String.raw`
<p>The force and centroid of the parabolic stress block (ε_c = ε₀ = 0.002) are integrals of the stress over the strain:</p>
${kcePy(String.raw`
from scipy.integrate import quad

# Average stress of a parabolic stress block (Hognestad rising branch)
fc, eps0, eps_c = 30.0, 0.002, 0.002
stress = lambda e: fc * (2 * e / eps0 - (e / eps0) ** 2)

force, err = quad(stress, 0, eps_c)          # area under the curve
moment, _ = quad(lambda e: stress(e) * e, 0, eps_c)
alpha = force / (fc * eps_c)                 # average stress / fc
centroid = moment / force                    # strain at the centroid
print(f"alpha = {alpha:.4f}  (2/3 = {2/3:.4f})")
print(f"resultant at {1 - centroid / eps_c:.4f} of the depth from the top (3/8 = 0.375)")
`, 'stress_block.py')}
${kceOut(String.raw`
alpha = 0.6667  (2/3 = 0.6667)
resultant at 0.3750 of the depth from the top (3/8 = 0.375)
`)}
<p>The exact values for a full parabola are 2/3 and 3/8, so the method is verified. Change <code>eps_c</code> to 0.003 and use the full Hognestad function to get the factors for other strains.</p>` },
        { title: 'Free vibration with solve_ivp', html: String.raw`
<p>The equation of motion \(m\ddot u + c\dot u + ku = 0\) is written as two first-order equations for z = [u, v]. A one-storey frame: m = 20 t, k = 800 kN/m, ξ = 5 %, initial displacement 20 mm.</p>
${kcePy(String.raw`
import numpy as np
from scipy.integrate import solve_ivp

# Damped free vibration of a one-storey frame: m u'' + c u' + k u = 0
m, k, xi = 20e3, 800e3, 0.05            # kg, N/m, damping ratio
c = 2 * xi * np.sqrt(k * m)
wn = np.sqrt(k / m); wd = wn * np.sqrt(1 - xi**2)

def rhs(t, z):                          # z = [u, v]
    u, v = z
    return [v, -(c * v + k * u) / m]

sol = solve_ivp(rhs, (0, 2), [0.02, 0.0], max_step=0.001, rtol=1e-9, atol=1e-12)
u_num = sol.y[0, -1]
u_exact = np.exp(-xi * wn * 2) * 0.02 * (np.cos(wd * 2) + xi * wn / wd * np.sin(wd * 2))
print(f"wn = {wn:.3f} rad/s, T = {2*np.pi/wn:.3f} s")
print(f"u(2 s): solve_ivp = {u_num*1000:.4f} mm, exact = {u_exact*1000:.4f} mm")
`, 'free_vibration.py')}
${kceOut(String.raw`
wn = 6.325 rad/s, T = 0.993 s
u(2 s): solve_ivp = 10.6375 mm, exact = 10.6375 mm
`)}
<p>The numerical result equals the closed-form solution of Lesson 2 of the Dynamics course. The same code solves equations with no closed form — for example a non-linear spring <code>k * u + k3 * u**3</code>.</p>` },
        { title: 'Most economical rectangular channel', html: String.raw`
<p>For a given flow area A = by, the channel with the smallest wetted perimeter P = b + 2A/b carries the most water for the least lining:</p>
${kcePy(String.raw`
from scipy.optimize import minimize_scalar

# Rectangular channel with area A = 6 m²: which width b gives the
# smallest wetted perimeter (the most economical section)?
A = 6.0
perimeter = lambda b: b + 2 * A / b
res = minimize_scalar(perimeter, bounds=(0.5, 10), method="bounded")
b = res.x
print(f"b = {b:.3f} m, y = {A/b:.3f} m, P = {res.fun:.3f} m  ->  b = 2y")
`, 'best_channel.py')}
${kceOut(String.raw`
b = 3.464 m, y = 1.732 m, P = 6.928 m  ->  b = 2y
`)}
<p class="result">The optimiser finds the textbook result b = 2y (dP/db = 1 − 2A/b² = 0 → b = √(2A) = 3.464 m).</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Write the equation as f(x) = 0 and check that f changes sign between the limits.</li>
  <li>Verify a numerical method once against a closed-form case.</li>
  <li>For solve_ivp, set <code>max_step</code> or tolerances small enough for the fastest vibration.</li>
  <li>Give optimisers physical bounds.</li>
</ul>` }
      ]
    }
  ]
});
