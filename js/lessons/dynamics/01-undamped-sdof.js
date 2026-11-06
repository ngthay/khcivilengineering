/* Lesson 1 — Undamped single-degree-of-freedom system (Paz & Leigh, Chapter 1) */
KCE_COURSE.lessons.push({
  id: 'undamped-sdof',
  num: 1,
  title: 'Undamped Single-Degree-of-Freedom System',
  desc: 'Degrees of freedom, springs in parallel and series, Newton’s law and D’Alembert’s principle, the free-vibration solution, natural frequency, period and amplitude — with the beam-spring, one-story frame, water tower and period-tuning examples.',
  icon: '🎯',
  color: 'violet',
  meta: ['Chapter 1', 'mü + ku = 0', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Structural dynamics studies structures under loads that change with time fast enough for <strong>inertia</strong> to matter. Before any calculation the real structure is replaced by an <strong>analytical model</strong> built on assumptions about the material (elastic, homogeneous), the loading (point loads, suddenly applied, periodic) and the geometry (members as lines, continuous structures as discrete nodes).</p>
<p>The number of <strong>degrees of freedom</strong> (DOF) is the number of independent coordinates needed to describe the position of the system at any time. A one-story frame with a rigid girder, whose columns are light compared with the girder, has one DOF: the lateral displacement \(u\) of the girder. Its model is the <strong>simple oscillator</strong> — a mass \(m\) on a spring \(k\).</p>` },
        { title: 'Description', html: String.raw`
<p>The <strong>spring constant</strong> \(k\) is the force needed to produce a unit displacement. Springs combine like this:</p>
$$\text{parallel: } k_e = \sum k_i \qquad\qquad \text{series: } \frac{1}{k_e} = \sum \frac{1}{k_i}$$
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Element</th><th>Stiffness at the loaded point</th></tr></thead>
  <tbody>
    <tr><td>Cantilever, load at the tip</td><td>\(k = 3EI/L^3\)</td></tr>
    <tr><td>Simple beam, load at mid-span</td><td>\(k = 48EI/L^3\)</td></tr>
    <tr><td>Column fixed at both ends (sway)</td><td>\(k = 12EI/L^3\)</td></tr>
    <tr><td>Column fixed–pinned (sway)</td><td>\(k = 3EI/L^3\)</td></tr>
  </tbody>
</table></div>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose the DOF and draw the free body diagram, including the inertial force \(m\ddot u\) acting against the motion (D’Alembert’s principle).</li>
  <li>Write dynamic equilibrium: \(m\ddot u + ku = 0\) for free vibration.</li>
  <li>Solve with the initial conditions \(u_0, \dot u_0 = v_0\):
  $$u = u_0\cos\omega t + \frac{v_0}{\omega}\sin\omega t,\qquad \omega = \sqrt{k/m}$$</li>
  <li>Period and natural frequency: \(T = 2\pi/\omega\), \(f = 1/T = \omega/2\pi\) (cps = Hz).</li>
  <li>Amplitude and phase: \(u = C\sin(\omega t + \alpha)\) with \(C = \sqrt{u_0^2 + (v_0/\omega)^2}\), \(\tan\alpha = u_0\omega/v_0\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 200" role="img" aria-label="One-story frame and simple oscillator">
    <path class="ln" d="M40 170 V70 M200 170 V70"/><rect class="conc" x="34" y="56" width="172" height="16"/>
    <path class="thin" d="M24 170 H56 M184 170 H216"/>
    <path class="acc" d="M210 64 H250"/><polygon class="accf" points="256,64 246,59 246,69"/><text x="230" y="52" class="a">u</text>
    <text x="100" y="48" class="m">W (rigid girder)</text><text x="64" y="125" class="m">k = 12E(2I)/L³</text>
    <path class="ln" d="M300 70 V170"/><path class="ln" d="M300 120 h12 l6 -10 l10 20 l10 -20 l10 20 l6 -10 h12"/>
    <rect class="conc" x="366" y="96" width="70" height="48"/><text x="394" y="125">m</text>
    <circle class="ln" cx="382" cy="152" r="8"/><circle class="ln" cx="420" cy="152" r="8"/><path class="thin" d="M300 162 H480"/>
    <path class="acc" d="M440 84 H480"/><polygon class="accf" points="486,84 476,79 476,89"/><text x="462" y="74" class="a">u</text>
    <text x="320" y="192" class="m">simple oscillator: m = W/g</text>
  </svg>
  <figcaption>Figure 1 — A one-story frame with a rigid girder and its spring–mass model.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Natural frequency from the static deflection', html: String.raw`
<p>With \(m = W/g\), the frequency can be written with the static deflection \(u_{st} = W/k\):</p>
$$\omega = \sqrt{\frac{kg}{W}} = \sqrt{\frac{g}{u_{st}}},\qquad f = \frac{1}{2\pi}\sqrt{\frac{g}{u_{st}}}$$
<p>The book works in lb, in and s with \(g = 386\ \text{in/s}^2\), so mass is in lb·s²/in. Adding weight lengthens the period (\(T \propto \sqrt{W}\)); adding stiffness shortens it (\(T \propto 1/\sqrt{k}\)).</p>
<div data-widget="sdof-vibration" data-title="Simple oscillator — frequency, period and free vibration"></div>
<p>Set ξ = 0 for the undamped case; for example W = 50 lb, k = 37.5 lb/in gives f = 2.71 cps (Example 1.2).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 1.2 — beam and spring in series', html: String.raw`
<div class="ex">
  <div class="ex-head">A cantilever (L = 12.5 in, b = 1 in, h = ¼ in, E = 30×10⁶ psi) carries a weight W = 50 lb hung from a coil spring k₂ = 100 lb/in. Find the natural frequency.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(I = \tfrac{1}{12}(1)(\tfrac14)^3 = 1/768\ \text{in}^4\); \(k_1 = 3EI/L^3 = 3(30\times10^6)/(12.5^3 \times 768) = 60\) lb/in.</li>
      <li>Beam and coil act in series: \(1/k_e = 1/60 + 1/100\) → \(k_e = 37.5\) lb/in.</li>
      <li>\(\omega = \sqrt{37.5 \times 386/50} = 17.01\) rad/s.
        <span class="result">f = 2.71 cps</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 1.3 — one-story steel frame', html: String.raw`
<div class="ex">
  <div class="ex-head">A frame 15 ft high and 25 ft wide has two W8×24 columns (I = 82.5 in⁴) fixed at the base and a rigid girder carrying 200 lb/ft. Neglect the column mass.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(W = 200 \times 25 = 5000\) lb.</li>
      <li>Each fixed–fixed column needs \(12EI/L^3\) for a unit sway:
        $$k = \frac{12E(2I)}{L^3} = \frac{12 \times 30\times10^6 \times 165}{(15\times12)^3} = 10{,}185\ \text{lb/in}$$</li>
      <li>\(f = \frac{1}{2\pi}\sqrt{kg/W} = \frac{1}{2\pi}\sqrt{10{,}185\times386/5000}\)
        <span class="result">f = 4.46 cps</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 1.4 — water tower: find k and W', html: String.raw`
<div class="ex">
  <div class="ex-head">An elevated tank holding 5000 gallons has a lateral period of 1.0 s empty and 2.2 s full (1 gallon ≈ 8.34 lb). Find the tank weight W and the tower stiffness k.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Water: \(W_w = 5000\times8.34 = 41{,}700\) lb.</li>
      <li>\(\omega_E = 2\pi/1.0 = \sqrt{kg/W}\) and \(\omega_F = 2\pi/2.2 = \sqrt{kg/(W+41{,}700)}\). Dividing the squares:
        $$\frac{2.2^2}{1.0^2} = \frac{W+41{,}700}{W} \Rightarrow W = 10{,}860\ \text{lb}$$</li>
      <li>\(k = (2\pi/1.0)^2 W/g = 39.48 \times 10{,}860/386\)
        <span class="result">W = 10,860 lb · k = 1110 lb/in</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 1.5 — changing the period by 20 %', html: String.raw`
<div class="ex">
  <div class="ex-head">A frame with a rigid top W = 1000 lb has a measured period of 0.10 s. Find the weight to add to lengthen the period by 20 %, or the stiffness to add to shorten it by 20 %.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(2\pi/0.1 = \sqrt{k\,386/1000}\) → \(k = 10{,}228\) lb/in.</li>
      <li>Lengthen to 0.12 s: \(2\pi/0.12 = \sqrt{10{,}228\times386/(1000+\Delta W)}\) → \(\Delta W = 440\) lb.</li>
      <li>Shorten to 0.08 s: \(2\pi/0.08 = \sqrt{(10{,}228+\Delta k)386/1000}\) → \(\Delta k = 5753\) lb/in.
        <span class="result">ΔW = 440 lb or Δk = 5753 lb/in</span></li>
    </ol>
    <p>The period grows only with \(\sqrt{W}\): a 20 % longer period needs 44 % more weight, and a 20 % shorter period needs 56 % more stiffness.</p>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use consistent units: in the book m = W/g with g = 386 in/s².</li>
  <li>Combine springs correctly — elements that carry the same force are in series.</li>
  <li>Pick the column stiffness for its end conditions (12EI/L³ fixed–fixed, 3EI/L³ fixed–pinned).</li>
  <li>Report ω in rad/s and f in cps; T = 1/f.</li>
</ul>` }
      ]
    }
  ]
});
