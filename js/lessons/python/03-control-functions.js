/* Lesson 3 — Decisions, loops and functions */
KCE_COURSE.lessons.push({
  id: 'control-functions',
  num: 3,
  title: 'Decisions, Loops and Functions — Writing a Code Check',
  desc: 'if / elif / else for code clauses, for loops over trial designs, while loops that iterate to a limit, and functions with docstrings that return several values — building an ACI 318 flexure check and a bar selection loop.',
  icon: '🔁',
  color: 'peach',
  meta: ['if · for · while · def', 'ACI 318 flexure', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Design codes are full of decisions (“if the section is tension-controlled, φ = 0.90”) and trials (“try 3 bars, then 4 …”). Python writes them directly:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Statement</th><th>Engineering use</th></tr></thead>
  <tbody>
    <tr><td><code>if</code> / <code>elif</code> / <code>else</code></td><td>Choose a clause, a factor or a message</td></tr>
    <tr><td><code>for x in ...:</code></td><td>Repeat for every bar size, member, load case or story</td></tr>
    <tr><td><code>while condition:</code></td><td>Repeat until a limit is satisfied (depth, spacing, convergence)</td></tr>
    <tr><td><code>def name(...):</code></td><td>Package a calculation so it can be reused and tested</td></tr>
  </tbody>
</table></div>
<div class="warn"><strong>Indentation matters.</strong> The lines that belong to an <code>if</code>, a loop or a function are indented by 4 spaces. A wrong indent changes the meaning or causes an <code>IndentationError</code>.</div>` },
        { title: 'Syntax', html: String.raw`
${kcePy(String.raw`
# decision
if eps_t >= 0.005:
    phi = 0.90
elif eps_t <= 0.002:
    phi = 0.65
else:
    phi = 0.65 + 0.25 * (eps_t - 0.002) / 0.003

# loop over values; range(2, 9) gives 2, 3, ..., 8
for n in range(2, 9):
    print(n)

# function with default arguments and several results
def section_props(b, h, E=30000):
    A = b * h
    I = b * h**3 / 12
    return A, I, E * I

A, I, EI = section_props(300, 500)
`)}
<ul>
  <li><code>break</code> leaves a loop early (the first design that works); <code>continue</code> skips to the next value.</li>
  <li>Arguments can be given by name, <code>section_props(h=500, b=300)</code>, which makes calls easy to read.</li>
  <li>The text in triple quotes after <code>def</code> is the <strong>docstring</strong>: <code>help(flexure_capacity)</code> prints it.</li>
</ul>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'The check we will program (ACI 318-19)', html: String.raw`
<p>For a singly reinforced rectangular beam:</p>
$$a = \frac{A_sf_y}{0.85f'_cb},\qquad c = \frac{a}{\beta_1},\qquad \varepsilon_t = 0.003\,\frac{d-c}{c},\qquad M_n = A_sf_y\left(d - \frac a2\right)$$
<p>with \(\beta_1 = 0.85 - 0.05(f'_c - 28)/7\) limited to 0.65–0.85, and φ = 0.90 when \(\varepsilon_t \ge \varepsilon_{ty} + 0.003\), 0.65 when \(\varepsilon_t \le \varepsilon_{ty}\), linear in between (\(\varepsilon_{ty} = f_y/E_s\)). The same check is in the Concrete course, where you can compare results with its calculator.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'A flexure-check function', html: String.raw`
${kcePy(String.raw`
def flexure_capacity(b, d, As, fc, fy):
    """Design moment phi*Mn (kN.m) of a singly reinforced
    rectangular beam by ACI 318-19. Units: mm, mm², MPa."""
    beta1 = min(0.85, max(0.65, 0.85 - 0.05 * (fc - 28) / 7))
    a = As * fy / (0.85 * fc * b)          # depth of stress block
    c = a / beta1                          # neutral axis depth
    eps_t = 0.003 * (d - c) / c            # strain in the steel
    eps_ty = fy / 200000
    if eps_t >= eps_ty + 0.003:
        phi = 0.90                         # tension-controlled
    elif eps_t <= eps_ty:
        phi = 0.65                         # compression-controlled
    else:
        phi = 0.65 + 0.25 * (eps_t - eps_ty) / 0.003
    Mn = As * fy * (d - a / 2) / 1e6       # kN.m
    return phi * Mn, eps_t, phi


phiMn, eps_t, phi = flexure_capacity(b=300, d=540, As=3 * 491, fc=28, fy=420)
print(f"eps_t = {eps_t:.4f}, phi = {phi:.2f}, phiMn = {phiMn:.1f} kN.m")
`, 'flexure.py')}
${kceOut(String.raw`
eps_t = 0.0129, phi = 0.90, phiMn = 276.5 kN.m
`)}
<p>Hand check: a = 1473 × 420 / (0.85 × 28 × 300) = 86.6 mm; c = 86.6/0.85 = 101.9 mm; εt = 0.003 × (540 − 101.9)/101.9 = 0.0129 ≥ 0.0051 → φ = 0.90; φMn = 0.9 × 1473 × 420 × (540 − 43.3) / 10⁶ = 276.5 kN·m ✓.</p>` },
        { title: 'A for loop that chooses the bars', html: String.raw`
<p>Add these lines to <code>flexure.py</code> to find the smallest number of 25 mm bars for Mu = 300 kN·m:</p>
${kcePy(String.raw`
Mu = 300.0                     # kN.m, required
bar_area = 491                 # one 25 mm bar, mm²

for n in range(2, 9):
    phiMn, eps_t, phi = flexure_capacity(300, 540, n * bar_area, 28, 420)
    status = "OK" if phiMn >= Mu else "not enough"
    print(f"{n} bars: phiMn = {phiMn:6.1f} kN.m  phi = {phi:.2f}  {status}")
    if phiMn >= Mu:
        break
`)}
${kceOut(String.raw`
2 bars: phiMn =  189.7 kN.m  phi = 0.90  not enough
3 bars: phiMn =  276.5 kN.m  phi = 0.90  not enough
4 bars: phiMn =  358.0 kN.m  phi = 0.90  OK
`)}
<p class="result">Use 4 Ø25 (φMn = 358.0 kN·m ≥ 300 kN·m). The loop stopped at the first design that works.</p>` },
        { title: 'A while loop that finds the depth', html: String.raw`
<p>Increase the depth of a 300 mm wide beam (span 8 m, w = 40 kN/m, E = 30 GPa) in 50 mm steps until the mid-span deflection \(5wL^4/384EI\) is within L/360:</p>
${kcePy(String.raw`
# Increase the depth until the deflection limit L/360 is met
L, w, E, b = 8.0, 40.0, 30e6, 0.30        # m, kN/m, kN/m², m
h = 0.30                                  # first trial depth, m
while 5 * w * L**4 / (384 * E * b * h**3 / 12) > L / 360:
    h += 0.05
print(f"Minimum depth for L/360: h = {h:.2f} m")
`, 'depth.py')}
${kceOut(String.raw`
Minimum depth for L/360: h = 0.55 m
`)}
<p>Check: δ = 0.002844/h³ m; with h = 0.50 m δ = 22.8 mm &gt; 22.2 mm; with h = 0.55 m δ = 17.1 mm ✓.</p>
<div class="warn">A <code>while</code> loop must be able to stop. If the condition can never become false (for example a limit that no depth can satisfy) the program runs forever — add a maximum, such as <code>while ... and h &lt; 2.0:</code>.</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Write one function per code check, with units in the docstring.</li>
  <li>Return every value you might want to report (φ, εt, capacity).</li>
  <li>Test the function on a hand-calculated case before using it in a loop.</li>
  <li>Give every <code>while</code> loop a guaranteed way to stop.</li>
</ul>` }
      ]
    }
  ]
});
