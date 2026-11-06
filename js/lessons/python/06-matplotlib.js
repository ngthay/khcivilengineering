/* Lesson 6 — Plotting with Matplotlib */
KCE_COURSE.lessons.push({
  id: 'matplotlib',
  num: 6,
  title: 'Plotting with Matplotlib — Shear, Moment and Stress–Strain Diagrams',
  desc: 'Line plots, labels, grids and legends, two plots in one figure, shading with fill_between, annotations, inverted moment axes and saving figures for reports — with an SFD/BMD of a beam and the Hognestad curve for concrete.',
  icon: '📊',
  color: 'rose',
  meta: ['pyplot', 'SFD · BMD', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Matplotlib</strong> draws graphs from arrays. The basic pattern is always the same:</p>
${kcePy(String.raw`
import matplotlib.pyplot as plt

plt.plot(x, y, label="curve 1")      # one line per call
plt.xlabel("x (m)")
plt.ylabel("M (kN·m)")
plt.title("Bending moment")
plt.grid(alpha=0.4)
plt.legend()
plt.savefig("moment.png", dpi=150)   # for reports
plt.show()                           # open a window
`)}
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Call</th><th>Purpose</th></tr></thead>
  <tbody>
    <tr><td><code>fig, (ax1, ax2) = plt.subplots(2, 1, sharex=True)</code></td><td>Two plots above each other with one x-axis</td></tr>
    <tr><td><code>ax.fill_between(x, y, alpha=0.25)</code></td><td>Shade the area — typical for SFD and BMD</td></tr>
    <tr><td><code>ax.axhline(0)</code></td><td>Horizontal reference line</td></tr>
    <tr><td><code>ax.annotate(text, xy, xytext, arrowprops=...)</code></td><td>Label a point with an arrow</td></tr>
    <tr><td><code>ax.invert_yaxis()</code></td><td>Draw sagging moments downward (on the tension side)</td></tr>
    <tr><td><code>ax.set_xscale("log")</code></td><td>Logarithmic axis (spectra, grading curves)</td></tr>
  </tbody>
</table></div>
<div class="note">With an Axes object (<code>ax</code>) the commands start with <code>set_</code>: <code>ax.set_xlabel</code>, <code>ax.set_title</code>. With <code>plt</code> they do not: <code>plt.xlabel</code>.</div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Shear force and bending moment diagrams', html: String.raw`
<p>A simply supported beam, L = 8 m, with a uniform load w = 20 kN/m and a point load P = 50 kN at a = 3 m. The term <code>(x &gt; a)</code> is 0 before the load and 1 after it, so one formula covers the whole span.</p>
${kcePy(String.raw`
import numpy as np
import matplotlib.pyplot as plt

# Simply supported beam: UDL w over the span + point load P at a
L, w, P, a = 8.0, 20.0, 50.0, 3.0           # m, kN/m, kN, m
RB = (w * L**2 / 2 + P * a) / L              # right reaction
RA = w * L + P - RB                          # left reaction

x = np.linspace(0, L, 801)
V = RA - w * x - P * (x > a)                 # shear force
M = RA * x - w * x**2 / 2 - P * (x - a) * (x > a)   # bending moment

print(f"RA = {RA:.2f} kN, RB = {RB:.2f} kN")
i = M.argmax()
print(f"M max = {M[i]:.2f} kN.m at x = {x[i]:.2f} m")

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(8, 6), sharex=True)
ax1.plot(x, V, color="tab:blue")
ax1.fill_between(x, V, alpha=0.25, color="tab:blue")
ax1.axhline(0, color="black", lw=0.8)
ax1.set_ylabel("Shear V (kN)")
ax1.set_title("Shear force and bending moment diagrams")
ax1.grid(alpha=0.4)

ax2.plot(x, M, color="tab:red")
ax2.fill_between(x, M, alpha=0.25, color="tab:red")
ax2.annotate(f"{M[i]:.1f} kN·m", xy=(x[i], M[i]), xytext=(x[i] + 0.6, M[i] - 25),
             arrowprops=dict(arrowstyle="->"))
ax2.invert_yaxis()                           # sagging moment drawn downwards
ax2.set_xlabel("x (m)")
ax2.set_ylabel("Moment M (kN·m)")
ax2.grid(alpha=0.4)

plt.tight_layout()
plt.savefig("sfd-bmd.png", dpi=150)
`, 'sfd_bmd.py')}
${kceOut(String.raw`
RA = 111.25 kN, RB = 98.75 kN
M max = 243.79 kN.m at x = 3.06 m
`)}
<figure class="fig shot"><img src="images/python/sfd-bmd.png" alt="Shear force and bending moment diagrams produced by the script" width="1200" height="900" loading="lazy"><figcaption>Figure 1 — The figure saved by the script.</figcaption></figure>
<p>Hand check: R_B = (20 × 64/2 + 50 × 3)/8 = 98.75 kN, R_A = 210 − 98.75 = 111.25 kN. V = 0 where 111.25 − 50 − 20x = 0 → x = 3.0625 m; M = 111.25 × 3.0625 − 10 × 3.0625² − 50 × 0.0625 = 243.79 kN·m ✓. With 801 points the step is 10 mm, so the printed position is 3.06 m.</p>` },
        { title: 'Stress–strain curves for concrete', html: String.raw`
<p>The Hognestad curve is a parabola up to ε₀ = 0.002 and a straight line falling by 15 % to ε_cu = 0.0038. <code>np.where</code> chooses between the two branches for every strain at once. Here the peak is taken as f′c.</p>
${kcePy(String.raw`
import numpy as np
import matplotlib.pyplot as plt

def hognestad(eps, fc, eps0=0.002, eps_cu=0.0038):
    """Concrete stress (MPa) for strain eps: parabola, then linear drop of 15 %."""
    rising = fc * (2 * eps / eps0 - (eps / eps0) ** 2)
    falling = fc * (1 - 0.15 * (eps - eps0) / (eps_cu - eps0))
    return np.where(eps <= eps0, rising, falling)

eps = np.linspace(0, 0.0038, 200)
for fc in (25, 30, 40):
    plt.plot(eps * 1000, hognestad(eps, fc), label=f"f'c = {fc} MPa")

plt.xlabel("Strain (‰)")
plt.ylabel("Stress (MPa)")
plt.title("Hognestad stress–strain curve for concrete")
plt.legend()
plt.grid(alpha=0.4)
plt.savefig("hognestad.png", dpi=150)
`, 'hognestad.py')}
<figure class="fig shot"><img src="images/python/hognestad.png" alt="Hognestad stress-strain curves for 25, 30 and 40 MPa concrete" width="960" height="720" loading="lazy"><figcaption>Figure 2 — One <code>plt.plot</code> call per curve inside a loop; the legend uses each label.</figcaption></figure>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Every axis has a label with units; every figure a title or caption.</li>
  <li>Use enough points (hundreds) so that curves and peaks are smooth.</li>
  <li>Draw moments on the tension side as your office does (invert the axis if needed).</li>
  <li>Save with <code>dpi=150</code> or more for reports; <code>.svg</code> or <code>.pdf</code> for vector output.</li>
</ul>` }
      ]
    }
  ]
});
