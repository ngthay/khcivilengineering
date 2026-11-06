/* Lesson 7 — Axially loaded compression members (Handbook Ch. 6 §6.1–6.2, 6.4–6.8) */
KCE_COURSE.lessons.push({
  id: 'compression',
  num: 7,
  title: 'Compression Members',
  desc: 'Types of compression members, section capacity with local buckling (form factor kf), member capacity with the column curves of AS 4100, effective length, struts in trusses, battened and laced struts, and composite columns.',
  icon: '🏛️',
  color: 'peach',
  meta: ['Ch. 6 §6.2', 'N_c = α_c N_s', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A short column fails by yielding (or local buckling of thin plates); a long column fails by <strong>flexural buckling</strong> at a lower load. AS 4100 combines both effects: the section capacity \(N_s\) is reduced by the slenderness reduction factor \(\alpha_c\), which depends on the modified slenderness and on the residual stresses of the section type.</p>` },
        { title: 'Description', html: String.raw`
$$N_s = k_fA_nf_y,\qquad N_c = \alpha_cN_s \le N_s,\qquad N^* \le \varphi N_c\ (\varphi = 0.9)$$
$$\lambda_n = \frac{l_e}{r}\sqrt{k_f}\sqrt{\frac{f_y}{250}}$$
<p>\(\alpha_c\) (Table 6.3.3) uses the section constant \(\alpha_b\): −1.0 (stress-relieved hollow sections), −0.5 (cold-formed hollow sections, kf = 1), 0 (hot-rolled UB/UC with kf = 1, welded H), 0.5 (angles, channels, kf &lt; 1), 1.0 (heavy welded / thick plates).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose a trial section; compute element slenderness \(\lambda_e\) and effective widths \(b_e = b(\lambda_{ey}/\lambda_e) \le b\); form factor \(k_f = A_e/A_g\).</li>
  <li>\(N_s = k_fA_nf_y\) (holes deducted only if not filled by bolts).</li>
  <li>Effective length \(l_e = k_el\) about each axis; \(\lambda_n\); \(\alpha_b\) → \(\alpha_c\).</li>
  <li>\(\varphi N_c = 0.9\alpha_cN_s \ge N^*\) for both axes.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 230" role="img" aria-label="Column curve">
    <path class="thin" d="M60 200 H490 M60 200 V20"/>
    <path class="acc" d="M60 40 L110 42 Q 200 70, 280 130 Q 360 175, 480 190"/>
    <path class="dim" d="M110 42 C 160 42, 220 50, 250 80 M250 80 Q 330 160, 480 186"/>
    <text x="20" y="44" class="m">1.0</text><text x="270" y="110" class="a">α_c (AS 4100)</text><text x="300" y="70" class="m">Euler / yield limit</text>
    <text x="430" y="218" class="m">λ_n</text><text x="30" y="28" class="m">α_c</text>
  </svg>
  <figcaption>Figure 1 — Slenderness reduction factor α_c decreases with modified slenderness λ_n.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'The α_c formula', html: String.raw`
$$\alpha_a = \frac{2100(\lambda_n - 13.5)}{\lambda_n^2 - 15.3\lambda_n + 2050},\quad \lambda = \lambda_n + \alpha_a\alpha_b,\quad \eta = 0.00326(\lambda - 13.5) \ge 0$$
$$\xi = \frac{(\lambda/90)^2 + 1 + \eta}{2(\lambda/90)^2},\qquad \alpha_c = \xi\left[1 - \sqrt{1 - \left(\frac{90}{\xi\lambda}\right)^2}\right]$$
<div data-widget="steel-column" data-title="Column capacity — AS 4100 §6.3"></div>
<p><em>Defaults: Example 6.1 (219.1 × 6.0 CHS C350L0, l_e = 3.8 m).</em></p>` },
        { title: 'Special compression members', html: String.raw`
<ul>
  <li><strong>Truss struts:</strong> \(k_e = 1.0\) in the plane of the truss is usual; out of plane use the distance between bracing points. Single angles connected by one leg: use AS 4100 provisions for eccentric connection.</li>
  <li><strong>Battened and laced struts:</strong> two or more sections tied together act compositely if the battens/lacing are spaced so each component’s slenderness ≤ 50 (and ≤ 0.6 × the overall slenderness).</li>
  <li><strong>Composite columns:</strong> concrete-filled tubes and encased sections (AS 5100.6, Eurocode 4).</li>
  <li><strong>Economy:</strong> hollow sections and stocky sections are efficient; restraints that halve \(l_e\) about the weak axis are very effective.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 6.1 — CHS strut', html: String.raw`
<div class="ex">
  <div class="ex-head">A pin-ended tubular member, 3800 mm long, carries \(N^* = 1030\) kN. Check a 219.1 × 6.0 CHS Grade C350L0 (\(A_g = 4020\) mm², r = 75.4 mm, \(f_y = 350\) MPa).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\lambda_e = \tfrac{219.1}{6.0}\tfrac{350}{250} = 51.1 &lt; \lambda_{ey} = 82\) → fully effective, \(k_f = 1.0\); \(N_s = 4020(350) = 1410\) kN.</li>
      <li>\(l_e = 3800\) mm; \(l_e/r = 50.4\); \(\lambda_n = 50.4\sqrt{350/250} = 59.6\).</li>
      <li>Cold-formed CHS: \(\alpha_b = -0.5\) → \(\alpha_c = 0.864\).</li>
      <li>\(\varphi N_c = 0.9(0.864)(1410) = 1100\) kN \(\ge 1030\) ✓.
        <span class="result">219.1 × 6.0 CHS C350L0 is adequate (31.5 kg/m)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 6.2 — SHS alternative', html: String.raw`
<div class="ex">
  <div class="ex-head">Check a 200 × 200 × 5.0 SHS Grade C450L0 (\(A_g = 3810\) mm², r = 79.1 mm) for the same member.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(b = 200 - 2(5) = 190\) mm; \(\lambda_e = \tfrac{190}{5}\sqrt{\tfrac{450}{250}} = 51.0 &gt; 40\) → \(b_e = 190(40/51.0) = 149\) mm; \(A_e = 4(149)(5) = 2980\) mm², \(k_f = 0.784\).</li>
      <li>\(N_s = 0.784(3810)(450) = 1340\) kN; \(\lambda_n = \tfrac{3800}{79.1}\sqrt{\tfrac{0.784 \times 450}{250}} = 57.0\).</li>
      <li>\(\alpha_b = -0.5\) → \(\alpha_c = 0.876\); \(\varphi N_c = 0.9(0.876)(1340) = 1050\) kN \(\ge 1030\) ✓.
        <span class="result">200 × 200 × 5.0 SHS C450L0 is also adequate (29.9 kg/m)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Thin plates reduce \(N_s\) through \(k_f\) — check local buckling first.</li>
  <li>Check buckling about both principal axes with their own effective lengths.</li>
  <li>Choose \(\alpha_b\) from the section type and its manufacturing process.</li>
</ul>` }
      ]
    }
  ]
});
