/* Lesson 5 — Cables and arches (Chhay/Hibbeler Ch. 5) */
KCE_COURSE.lessons.push({
  id: 'cables-arches',
  num: 5,
  title: 'Cables and Arches',
  desc: 'Cables under concentrated and uniformly distributed loads, the parabolic cable, arch types, funicular arches and the three-hinged arch.',
  icon: '🌉',
  color: 'amber',
  meta: ['Ch. 5', 'Tension & thrust', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>cable</strong> is perfectly flexible: it carries load only in tension and takes the shape of the load (straight segments under point loads, a parabola under a load uniform along the horizontal). An <strong>arch</strong> is the cable turned upside down — shaped to the same <em>funicular</em> curve it carries the load mainly in compression, with little bending.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Cable, point loads</th><td>Straight segments; joint equilibrium plus the known geometry (one sag or the length) closes the problem.</td></tr>
    <tr><th>Cable, uniform load \(w_0\)</th><td>\(y = \dfrac{w_0}{2F_H}x^2\) (parabola), \(F_H = \dfrac{w_0L^2}{8h}\), \(T_{max} = \sqrt{F_H^2 + (w_0L/2)^2}\)</td></tr>
    <tr><th>Arches</th><td>Fixed (indeterminate ×3), two-hinged (×1), tied, and three-hinged (determinate)</td></tr>
  </tbody>
</table>
<p>The horizontal component of tension \(F_H\) is the same everywhere along a cable carrying only vertical loads.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Cable:</strong> take moments about one support for the whole cable (or a segment) to find a tension; then go joint by joint with \(\sum F_x = 0\), \(\sum F_y = 0\).</li>
  <li><strong>Three-hinged arch:</strong> use the whole arch (\(\sum M = 0\) about one support) plus one half (\(\sum M = 0\) about the crown hinge, where M = 0) to get all four reactions.</li>
  <li>Cut the arch at any section to get N, V, M; for a funicular arch V = M = 0.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 310" role="img" aria-label="Cable with two point loads, Example 5-1">
    <rect class="conc" x="40" y="24" width="20" height="30"/><rect class="conc" x="390" y="140" width="20" height="40"/>
    <path class="ln" d="M60 40 L180 204 L300 280 L390 160"/>
    <path class="acc" d="M180 210 V250 M300 286 V306"/><polygon class="accf" points="180,254 175,244 185,244"/><polygon class="accf" points="300,309 295,299 305,299"/>
    <text x="150" y="268">3 kN</text><text x="312" y="304">8 kN</text>
    <text x="70" y="30">A</text><text x="160" y="200">B</text><text x="304" y="270">C</text><text x="414" y="164">D</text>
    <path class="dim" d="M60 40 H470 M60 40 V204 H180 M300 160 H470 M300 280 H470"/>
    <text x="70" y="196" class="m">h = 2.74 m</text><text x="476" y="104" class="m">2 m</text><text x="476" y="224" class="m">2 m</text>
    <text x="110" y="20" class="m">2 m · 2 m · 1.5 m (horizontal spacing)</text>
  </svg>
  <figcaption>Figure 1 — Example 5-1: cable ABCD; the sag h of B is the unknown.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Cable under a uniform load', html: String.raw`
<p>For an element of cable: \(\dfrac{d(T\cos\theta)}{dx} = 0\) and \(\dfrac{d(T\sin\theta)}{dx} = w_0\). Hence \(T\cos\theta = F_H\) (constant) and \(\dfrac{dy}{dx} = \dfrac{w_0}{F_H}x\), giving the parabola above. The tension is largest at the highest support where the slope is steepest.</p>` },
        { title: 'Three-hinged arch', html: String.raw`
<p>Hinges at both supports and at the crown make the arch statically determinate, so settlement and temperature change cause no stresses. A parabolic three-hinged arch under a uniform load is funicular: every section is in pure compression \(N = \sqrt{F_H^2 + V_{beam}^2}\).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 5-1 — cable with point loads', html: String.raw`
<div class="ex">
  <div class="ex-head">Find the tension in each segment of the cable in Figure 1 and the sag h at B.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Segment CD has slope 3-4-5 (1.5 m across, 2 m up). Whole cable, \(\sum M_A = 0\):
        $$T_{CD}\left(\tfrac35\right)(2) + T_{CD}\left(\tfrac45\right)(5.5) - 3(2) - 8(4) = 0 \ \Rightarrow\ T_{CD} = 6.79\ \text{kN}$$</li>
      <li>Joint C: \(6.79(\tfrac35) = T_{BC}\cos\theta_{BC}\), \(6.79(\tfrac45) - 8 + T_{BC}\sin\theta_{BC} = 0\) → \(\theta_{BC} = 32.3°\), \(T_{BC} = 4.82\) kN.</li>
      <li>Joint B: \(T_{BA}\cos\theta_{BA} = 4.82\cos32.3°\), \(T_{BA}\sin\theta_{BA} = 4.82\sin32.3° + 3\) → \(\theta_{BA} = 53.8°\), \(T_{BA} = 6.90\) kN.</li>
      <li>\(h = 2\tan53.8° = 2.74\) m.
        <span class="result">T_CD = 6.79 kN, T_BC = 4.82 kN, T_BA = 6.90 kN, h = 2.74 m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 5-5 — three-hinged tied trussed arch', html: String.raw`
<div class="ex">
  <div class="ex-head">A 12 m tied arch (pins A and E at the ends, crown hinge C, tie AE) carries 15 kN at 3 m, 20 kN at 6 m and 15 kN at 9 m on its top chord; the crown C is 5 m above the tie. Find the tie force and the forces in members CH and CB.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Whole arch: \(E_y(12) - 15(3) - 20(6) - 15(9) = 0\) → \(E_y = 25\) kN; \(A_y = 25\) kN, \(A_x = 0\).</li>
      <li>Left half, \(\sum M_C = 0\): \(F_{AE}(5) - 25(6) + 15(3) = 0\) → tie \(F_{AE} = 21.0\) kN (T); then \(C_x = 21.0\) kN, \(C_y = 10\) kN.</li>
      <li>Joint G: \(F_{GC} = 20\) kN (C). Joint C — H is at (3, 6), B at (3, 4) and C at (6, 5), so CH and CB both slope 1 : 3 (direction cosines \(3/\sqrt{10}\), \(1/\sqrt{10}\)):
        \(F_{CB}\tfrac{3}{\sqrt{10}} - 21.0 - F_{CH}\tfrac{3}{\sqrt{10}} = 0\), \(F_{CB}\tfrac{1}{\sqrt{10}} + F_{CH}\tfrac{1}{\sqrt{10}} - 20 + 10 = 0\)
        <em>(the Khmer edition prints \(2/\sqrt{10}\) in the first equation; \(3/\sqrt{10}\) is what gives its answers)</em>.
        <span class="result">Tie AE = 21.0 kN (T), F_CB = 26.9 kN (C), F_CH = 4.74 kN (T)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Cable forces are always tension; a negative answer means a wrong geometry assumption.</li>
  <li>The horizontal tension component is constant when all loads are vertical.</li>
  <li>For a three-hinged arch, use M = 0 at the crown hinge as the fourth equation.</li>
</ul>` }
      ]
    }
  ]
});
