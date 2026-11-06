/* Lesson 10 — Earthquake records and response spectra */
KCE_COURSE.lessons.push({
  id: 'response-spectrum',
  num: 10,
  title: 'Earthquake Records — Computing a Response Spectrum',
  desc: 'Reading or generating an accelerogram, the Newmark average-acceleration method for a single-degree-of-freedom oscillator, building the 5 %-damped pseudo-acceleration spectrum, choosing the time step, and checking against the exact piecewise-linear method.',
  icon: '🌋',
  color: 'pink',
  meta: ['Newmark-β', 'Sa(T) spectrum', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>response spectrum</strong> gives the peak response of a single-degree-of-freedom (SDOF) oscillator with period T and damping ξ, for every T, to one ground motion (Dynamics course, Lesson 5). To compute it, the equation of motion</p>
$$\ddot u + 2\xi\omega\dot u + \omega^2u = -\ddot u_g(t),\qquad \omega = \frac{2\pi}{T}$$
<p>is integrated step by step for each period, and the peak displacement S_d is kept. The pseudo-acceleration is</p>
$$S_a = \omega^2S_d$$
<p>This lesson builds the whole calculation in Python. The same script works for a recorded earthquake, a record exported from Abaqus, or a synthetic motion.</p>` },
        { title: 'Reading a record', html: String.raw`
<p>Records from databases (PEER NGA, COSMOS, K-NET, national networks) and exports from analysis programs are text files with columns. NumPy reads them in one line:</p>
${kcePy(String.raw`
import numpy as np

data = np.loadtxt("record.txt", skiprows=1)   # columns: time (s), acceleration (g)
t, ag = data[:, 0], data[:, 1]
dt = t[1] - t[0]
# if the file is in m/s²: ag = ag / 9.81
`)}
<p>If the time step is not constant (common in Abaqus output), resample first with <code>np.interp</code> onto a uniform time grid.</p>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Newmark average-acceleration method', html: String.raw`
<p>With γ = 1/2 and β = 1/4 (constant average acceleration in each step, unconditionally stable), the incremental form for a unit mass is</p>
$$\hat k = k + \frac{2c}{\Delta t} + \frac{4m}{\Delta t^2},\qquad \Delta\hat p_i = \Delta p_i + \left(\frac{4m}{\Delta t} + 2c\right)\dot u_i + 2m\,\ddot u_i$$
$$\Delta u_i = \frac{\Delta\hat p_i}{\hat k},\qquad \Delta\dot u_i = \frac{2\Delta u_i}{\Delta t} - 2\dot u_i,\qquad \Delta\ddot u_i = \frac{4\Delta u_i}{\Delta t^2} - \frac{4\dot u_i}{\Delta t} - 2\ddot u_i$$
<div class="warn"><strong>Time step.</strong> The method is stable for any Δt, but it is accurate only when Δt ≤ T/10 or so. For short periods either sub-divide the record’s time step or use the exact piecewise-linear (Nigam–Jennings) recurrence, which is exact for a ground motion that is linear between samples.</div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Spectrum of a synthetic ground motion', html: String.raw`
<p>So that you can run the example without downloading a record, part 1 makes a realistic synthetic motion: random “white noise” is shaped by the Clough–Penzien filter (a soil layer with ω_g = 15 rad/s plus a high-pass filter), multiplied by a build-up-and-decay envelope and scaled to PGA = 0.30 g.</p>
${kcePy(String.raw`
import numpy as np
import matplotlib.pyplot as plt

# ---- 1. A synthetic ground motion (replace with np.loadtxt("record.txt") for a real one)
rng = np.random.default_rng(7)
dt = 0.01
t = np.arange(0, 20, dt)
# white noise shaped by the Clough-Penzien filter: a soil layer (wg, xg)
# that amplifies about 2.4 Hz and a high-pass (wf, xf) that removes drift
w = 2 * np.pi * np.fft.rfftfreq(len(t), dt)
wg, xg, wf, xf = 15.0, 0.6, 4.0, 0.6
H = np.sqrt((wg**4 + 4 * xg**2 * wg**2 * w**2) / ((wg**2 - w**2)**2 + 4 * xg**2 * wg**2 * w**2))
H *= w**2 / np.sqrt((wf**2 - w**2)**2 + 4 * xf**2 * wf**2 * w**2)
ag = np.fft.irfft(np.fft.rfft(rng.standard_normal(len(t))) * H, len(t))
envelope = (t / 4) ** 2 * np.exp(2 * (1 - t / 4))  # builds up, peaks at 4 s, decays
ag = ag * envelope
ag = 0.30 * ag / np.abs(ag).max()                  # scale to PGA = 0.30 g

# ---- 2. Newmark average-acceleration method for one SDOF oscillator
def peak_displacement(ag_g, dt, T, xi=0.05, g=9.81):
    w = 2 * np.pi / T
    m, c, k = 1.0, 2 * xi * w, w**2               # unit mass
    p = -ag_g * g                                  # effective force, m/s²
    u, v = 0.0, 0.0
    a = p[0] - c * v - k * u
    k_hat = k + 2 * c / dt + 4 * m / dt**2
    A = 4 * m / dt + 2 * c
    B = 2 * m
    umax = 0.0
    for i in range(len(p) - 1):
        dp = p[i + 1] - p[i] + A * v + B * a
        du = dp / k_hat
        dv = 2 * du / dt - 2 * v
        da = 4 * du / dt**2 - 4 * v / dt - 2 * a
        u, v, a = u + du, v + dv, a + da
        umax = max(umax, abs(u))
    return umax

# ---- 3. Spectrum: Sa = w² * Sd, in g
periods = np.geomspace(0.05, 4.0, 250)
Sd = np.array([peak_displacement(ag, dt, T) for T in periods])
Sa = (2 * np.pi / periods) ** 2 * Sd / 9.81

i = Sa.argmax()
print(f"PGA = {np.abs(ag).max():.3f} g")
print(f"Sa at T = 0.05 s = {Sa[0]:.3f} g")
print(f"Peak Sa = {Sa[i]:.3f} g at T = {periods[i]:.2f} s  (Sa/PGA = {Sa[i] / 0.30:.2f})")
for T in (0.5, 1.0, 2.0):
    j = np.abs(periods - T).argmin()
    print(f"T = {periods[j]:.2f} s: Sa = {Sa[j]:.3f} g, Sd = {Sd[j]*1000:.1f} mm")

fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(8, 6.5))
ax1.plot(t, ag, lw=0.7)
ax1.set_xlabel("Time (s)"); ax1.set_ylabel("Ground acceleration (g)")
ax1.set_title("Synthetic accelerogram, PGA = 0.30 g"); ax1.grid(alpha=0.4)
ax2.plot(periods, Sa, color="tab:red", lw=1.6, label="ξ = 5 %")
ax2.set_xlabel("Period T (s)"); ax2.set_ylabel("Sa (g)")
ax2.set_title("Pseudo-acceleration response spectrum"); ax2.grid(alpha=0.4); ax2.legend()
ax2.set_xlim(0, 4); ax2.set_ylim(bottom=0)
plt.tight_layout()
plt.savefig("spectrum.png", dpi=150)
np.savetxt("record.txt", np.column_stack([t, ag]), header="time(s) accel(g)", fmt="%.4f")
`, 'spectrum.py')}
${kceOut(String.raw`
PGA = 0.300 g
Sa at T = 0.05 s = 0.356 g
Peak Sa = 1.115 g at T = 0.36 s  (Sa/PGA = 3.72)
T = 0.50 s: Sa = 0.527 g, Sd = 32.9 mm
T = 1.00 s: Sa = 0.301 g, Sd = 74.1 mm
T = 2.01 s: Sa = 0.051 g, Sd = 51.5 mm
`)}
<figure class="fig shot"><img src="images/python/spectrum.png" alt="Synthetic accelerogram and its 5 percent damped response spectrum" width="1200" height="975" loading="lazy"><figcaption>Figure 1 — The accelerogram and its 5 %-damped spectrum. A single record is jagged; design spectra are smoothed envelopes of many records, with a plateau of about 2.5 × PGA.</figcaption></figure>
<p>The spectrum peaks near T = 0.36 s, close to the soil-filter period 2π/15 = 0.42 s, as expected. The last line of the script saves the record as a text file — the same format that <code>np.loadtxt</code> reads.</p>` },
        { title: 'Checking the time step', html: String.raw`
<p>The same record was run through the exact piecewise-linear (Nigam–Jennings) method:</p>
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>T (s)</th><th>Δt / T</th><th>Newmark Sa (g)</th><th>Exact Sa (g)</th><th>Difference</th></tr></thead>
  <tbody>
    <tr><td>0.10</td><td>0.10</td><td>0.545</td><td>0.583</td><td>−6.5 %</td></tr>
    <tr><td>0.20</td><td>0.05</td><td>0.565</td><td>0.554</td><td>+2.0 %</td></tr>
    <tr><td>0.36</td><td>0.028</td><td>1.114</td><td>1.114</td><td>0.0 %</td></tr>
    <tr><td>0.50</td><td>0.020</td><td>0.528</td><td>0.529</td><td>−0.2 %</td></tr>
    <tr><td>1.00</td><td>0.010</td><td>0.300</td><td>0.300</td><td>−0.1 %</td></tr>
    <tr><td>2.00</td><td>0.005</td><td>0.052</td><td>0.052</td><td>0.0 %</td></tr>
  </tbody>
</table></div>
<p class="result">For Δt/T ≤ 0.03 the two methods agree within 0.2 %; at Δt/T = 0.1 Newmark is 6.5 % off — use the exact method or a smaller step for short periods.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Check the units of the record (g, m/s², cm/s²) and the time step.</li>
  <li>Plot the record first: look for baseline drift and missing data.</li>
  <li>Keep Δt ≤ T/10 for Newmark, or use the exact piecewise-linear method.</li>
  <li>As T → 0, Sa should approach the PGA; at long periods Sd approaches the peak ground displacement.</li>
</ul>` }
      ]
    }
  ]
});
