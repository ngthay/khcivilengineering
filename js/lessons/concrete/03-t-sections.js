/* Lesson 3 — Analysis of T-sections */
KCE_COURSE.lessons.push({
  id: 't-sections',
  num: 3,
  title: 'Analysis of T-Sections',
  desc: 'Effective flange width, rectangular vs true T behaviour, and moment capacity of flanged beams cast with slabs.',
  icon: '⊤',
  color: 'lilac',
  meta: ['ACI 318M-19 §6.3.2, 9.6.1', 'T-beams', 'Analysis'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Beams cast monolithically with a slab act together with part of the slab. In positive bending the slab is in compression and the beam behaves as a <strong>T-section</strong> (or L-section at an edge). The wide flange gives a large compression area, so the stress block is usually shallow and the section is very ductile.</p>` },
        { title: 'Description', html: String.raw`
<p>Notation: \(b_f\) or \(b_e\) = effective flange width, \(t\) (or \(h_f\)) = slab thickness, \(b_w\) = web width, \(d\) = effective depth. In negative bending (over supports) the flange is in tension, so the section is analysed as a rectangle of width \(b_w\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find the effective flange width \(b_e\).</li>
  <li>Assume rectangular behaviour: \(a = A_s f_y/(0.85f'_c b_e)\).</li>
  <li>If \(a \le t\): rectangular section of width \(b_e\).</li>
  <li>If \(a > t\): true T — split into overhanging flange + web.</li>
  <li>Check that the beam is tension-controlled (\(\varepsilon_t \ge \varepsilon_{ty} + 0.003\)) and \(A_s \ge A_{s,min}\) (based on \(b_w\)).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 240" role="img" aria-label="T-beam with effective flange">
    <rect class="conc" x="40" y="30" width="560" height="40"/>
    <rect class="conc" x="120" y="70" width="70" height="140"/><rect class="conc" x="450" y="70" width="70" height="140"/>
    <rect class="comp" x="45" y="33" width="220" height="34"/>
    <circle class="bar" cx="135" cy="192" r="6"/><circle class="bar" cx="155" cy="192" r="6"/><circle class="bar" cx="175" cy="192" r="6"/>
    <line class="dim" x1="45" y1="18" x2="265" y2="18"/><text x="130" y="14" class="a">be</text>
    <line class="dim" x1="120" y1="226" x2="190" y2="226"/><text x="146" y="222">bw</text>
    <text x="608" y="55">t</text><line class="dim" x1="190" y1="140" x2="450" y2="140"/><text x="270" y="134" class="m">sw = clear distance to next web</text>
  </svg>
  <figcaption>Figure 1 — Interior T-beam: only the effective width be of the slab is counted as flange.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Effective flange width', html: String.raw`
<p>ACI 318-19 Table 6.3.2.1 limits the <em>overhang</em> on each side of the web (\(h\) = slab thickness \(t\), \(s_w\) = clear distance to the adjacent web, \(\ell_n\) = clear span of the beam):</p>
<table class="tbl">
  <thead><tr><th>Flange on each side of web (T-beam)</th><th>Flange on one side only (L-beam)</th></tr></thead>
  <tbody><tr>
    <td>Overhang ≤ least of \(8h\), \(s_w/2\), \(\ell_n/8\)<br>\(b_e = b_w + 2\,(\text{overhang})\)</td>
    <td>Overhang ≤ least of \(6h\), \(s_w/2\), \(\ell_n/12\)<br>\(b_e = b_w + \text{overhang}\)</td>
  </tr></tbody>
</table>
<p>Isolated T-beams (flange used only for extra area, §6.3.2.2): \(t \ge 0.5b_w\) and \(b_e \le 4b_w\).</p>
<div class="note"><p><strong>Change from ACI 318-08:</strong> the old limits were written for the total width (\(L/4\), \(b_w + 16t\), beam spacing). The 318-19 overhang limits give the same \(8h\) and spacing limits, but the span limit is \(\ell_n/8\) per side — based on the <em>clear</em> span.</p></div>` },
        { title: 'True T-section', html: String.raw`
<p>When \(a > t\), the compression zone is split:</p>
$$A_{sf} = \frac{0.85f'_c(b_e - b_w)t}{f_y},\qquad a = \frac{(A_s - A_{sf})f_y}{0.85f'_c b_w}$$
$$M_n = A_{sf}f_y\left(d - \frac{t}{2}\right) + (A_s - A_{sf})f_y\left(d - \frac{a}{2}\right)$$
<p>Net tensile strain is checked with \(c = a/\beta_1\) as before; the beam must be tension-controlled (§9.3.3.1). Minimum steel (§9.6.1.2) uses \(b_w\); for a statically determinate beam with the flange in tension, use the lesser of \(b_f\) and \(2b_w\).</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 1: floor T-beam', html: String.raw`
<div class="ex">
  <div class="ex-head">Clear span ℓn = 4.5 m, beams at 2.4 m centres, slab t = 100 mm, bw = 250, d = 405, f'c = 20, fy = 410</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(s_w = 2400 - 250 = 2150\) mm. Overhang = least of \(8(100) = 800\), \(2150/2 = 1075\), \(4500/8 = 562.5\) → 562.5 mm.
        \(b_e = 250 + 2(562.5) = 1375\) mm.</li>
      <li><strong>Case (a) As = 1520 mm²:</strong> \(a = \frac{1520(410)}{0.85(20)(1375)} = 26.7 \text{ mm} < t\) → rectangular.
        \(c = 31.4\) mm, \(\varepsilon_t = 0.036 \ge 0.00505\) → tension-controlled.
        <span class="result">\(\phi M_n = 0.9(1520)(410)(405 - 13.3)/10^6 = 219.7\) kN·m</span></li>
      <li><strong>Case (b) As = 4916 mm²:</strong> \(a = \frac{4916(410)}{0.85(20)(1375)} = 86.2 \text{ mm} < t\) → still rectangular.
        \(c = 101.4\) mm, \(\varepsilon_t = 0.00898\) → \(\phi\) = 0.90.
        <span class="result">\(\phi M_n = 0.9(4916)(410)(405 - 43.1)/10^6 = 656.5\) kN·m</span></li>
    </ol>
    <div class="note"><p>With the old ACI 318-08 width (\(b_e\) = L/4 = 1125 mm) case (b) became a true T-section with \(\phi M_n\) = 638.2 kN·m. The 318-19 clear-span rule gives a wider flange here, so the stress block stays inside the slab.</p></div>
  </div>
</div>` },
        { title: 'Example 2: given flange width', html: String.raw`
<div class="ex">
  <div class="ex-head">be = 900, t = 80, bw = 250, d = 440, As = 3882 mm², f'c = 24, fy = 410</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Trial rectangular: \(a = \frac{3882(410)}{0.85(24)(900)} = 86.7\) mm > 80 → true T.</li>
      <li>\(A_{sf} = 0.85(24)(650)(80)/410 = 2587.3\) mm²; \(a = \frac{1294.7(410)}{0.85(24)(250)} = 104.1\) mm.</li>
      <li>\(c = 122.4\) mm, \(\varepsilon_t = 0.00778 \ge \varepsilon_{ty} + 0.003 = 0.00505\) → tension-controlled, \(\phi\) = 0.90.</li>
      <li>\(M_n = 2587.3(410)(400) + 1294.7(410)(387.95) = 630.3\) kN·m
        <span class="result">\(\phi M_n = 567.2\) kN·m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Overhang = least of \(8h\), \(s_w/2\), \(\ell_n/8\) on each side (\(6h\), \(s_w/2\), \(\ell_n/12\) for L-beams).</li>
  <li>Decide rectangular vs. true T by comparing \(a\) with \(t\).</li>
  <li>Hogging regions: rectangle of width \(b_w\); distribute part of the top steel into the flange.</li>
  <li>Check \(\varepsilon_t \ge \varepsilon_{ty} + 0.003\) and \(A_{s,min}\) based on the web width.</li>
</ul>` }
      ]
    }
  ]
});
