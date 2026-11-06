/* Lesson 8 — Beam-columns (Handbook Ch. 6 §6.3) */
KCE_COURSE.lessons.push({
  id: 'beam-columns',
  num: 8,
  title: 'Beam-Columns: Combined Axial Force and Bending',
  desc: 'Minimum eccentricities of beam reactions, design moments with amplification, section capacity reduced by axial force, in-plane and out-of-plane member capacity, and biaxial bending.',
  icon: '➕',
  color: 'violet',
  meta: ['Ch. 6 §6.3', 'M_r = M_s(1 − N*/φN_s)', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Most columns carry moment as well as axial load: beam reactions act at an eccentricity, frames are continuous, and wind pushes sideways. A <strong>beam-column</strong> must satisfy three checks: the cross-section under N and M together, buckling <strong>in the plane</strong> of bending, and lateral-torsional/flexural buckling <strong>out of the plane</strong>.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Section (general)</th><td>\(M_{rx} = M_{sx}\left(1 - \dfrac{N^*}{\varphi N_s}\right)\)</td></tr>
    <tr><th>Section (compact, doubly symmetric I)</th><td>\(M_{rx} = 1.18M_{sx}\left(1 - \dfrac{N^*}{\varphi N_s}\right) \le M_{sx}\)</td></tr>
    <tr><th>In-plane member</th><td>\(M_i = M_s\left(1 - \dfrac{N^*}{\varphi N_c}\right)\) (N_c for the in-plane axis)</td></tr>
    <tr><th>Out-of-plane member</th><td>\(M_{ox} = M_{bx}\left(1 - \dfrac{N^*}{\varphi N_{cy}}\right)\)</td></tr>
    <tr><th>Biaxial (section)</th><td>\(\dfrac{N^*}{\varphi N_s} + \dfrac{M_x^*}{\varphi M_{rx}} + \dfrac{M_y^*}{\varphi M_{ry}} \le 1\) (or the power-law interaction)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Loads: \(N^*\) from the beam reactions plus self-weight; moments from eccentricities — beam reactions act at least 100 mm from the face of the column (or the actual cap/bracket position).</li>
  <li>Amplify the moments with \(\delta_b\) (Lesson 4).</li>
  <li>Section check with \(M_r\); member checks with \(M_i\) and \(M_o\), each \(\ge M^*\) with φ = 0.9.</li>
  <li>For biaxial bending combine the x- and y-checks.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 250" role="img" aria-label="Beam-column with eccentric reaction">
    <path class="ln" d="M200 30 V230"/><rect class="conc" x="180" y="22" width="40" height="10"/>
    <path class="thin" d="M220 30 H360"/><path class="acc" d="M240 4 V26"/><polygon class="accf" points="240,30 235,20 245,20"/>
    <text x="250" y="16">R* (beam B1)</text><path class="dim" d="M200 40 H240"/><text x="210" y="54" class="m">e_x</text>
    <path class="dim" d="M190 130 H210"/><text x="120" y="134" class="m">brace</text>
    <rect class="conc" x="170" y="230" width="60" height="10"/><text x="240" y="240" class="m">fixed base</text>
    <text x="300" y="120" class="m">M* = R* e (top)</text><text x="300" y="140" class="m">N* = Σ R* + self-weight</text>
  </svg>
  <figcaption>Figure 1 — Beam reaction at an eccentricity produces a moment at the column top.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Why three checks?', html: String.raw`
<p>The section check limits yielding at the most stressed cross-section. The in-plane check covers buckling in the plane of bending, where amplified moments and axial force interact along the member. The out-of-plane check covers flexural-torsional buckling — usually critical for I-sections bent about the major axis without lateral restraint. In tension members the out-of-plane capacity can even <em>increase</em>: \(M_{ox} = M_{bx}\left(1 + \dfrac{N^*}{\varphi N_t}\right) \le M_{rx}\).</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Example 6.3 — braced column with eccentric beams', html: String.raw`
<div class="ex">
  <div class="ex-head">A 9 m column (fixed base, pinned top, braced at mid-height about the minor axis) supports beams B1 (\(R_G = 260\), \(R_Q = 190\) kN at \(e_x = 200\) mm) and B2 (\(R_G = 78.1\), \(R_Q = 60\) kN at \(e_y = 80\) mm); self-weight 8.5 kN. Trial 250UC89.5 Grade 300 (\(A = 11\,400\) mm², \(I_x = 143\times10^6\), \(I_y = 48.4\times10^6\) mm⁴, \(f_y = 280\) MPa, \(\varphi M_{sx} = 310\) kN·m).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(N^* = 1.2(260 + 78.1 + 8.5) + 1.5(190 + 60) = 791\) kN.</li>
      <li>Top moments: \(M_x^* = (1.2 \times 260 + 1.5 \times 190)(0.200) = 119\) kN·m; \(M_y^* = (1.2 \times 78.1 + 1.5 \times 60)(0.080) = 14.7\) kN·m.</li>
      <li>\(N_{omx} = \dfrac{\pi^2EI_x}{(0.85 \times 9000)^2} = 4820\) kN, \(N_{omy} = \dfrac{\pi^2EI_y}{4500^2} = 4720\) kN; \(\beta_{mx} = 0.5\) → \(c_{mx} = 0.4\), \(\delta_{bx} = 0.479\); \(\beta_{my} = -0.5\) → \(c_{my} = 0.8\), \(\delta_{by} = 0.961\) → both taken as 1.0.</li>
      <li>Section: \(\varphi N_s = 0.9(11\,400)(280) = 2870\) kN; \(\varphi M_{rx} = 1.18(310)(1 - 791/2870) = 265\) kN·m \(\ge 119\) ✓.</li>
      <li>Axial member capacity: \(\lambda_{nx} = 72.3\), \(\lambda_{ny} = 73.0\), \(\alpha_b = 0\) → \(\alpha_c \approx 0.73\); \(\varphi N_c \approx 2090\) kN \(\ge 791\) ✓. The in-plane and out-of-plane moment checks follow with \(M_i\) and \(M_{ox}\).
        <span class="result">N* = 791 kN, M*_x = 119 kN·m, M*_y = 14.7 kN·m; section check satisfied with margin</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Always include the minimum eccentricity of beam reactions on simple-construction columns.</li>
  <li>Do all three checks; the out-of-plane one often governs UC columns bent about x.</li>
  <li>Moments are distributed between the column lengths above and below the floor by stiffness.</li>
</ul>` }
      ]
    }
  ]
});
