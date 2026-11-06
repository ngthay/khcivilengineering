/* Lesson 8 — Forced motion of shear buildings: modal superposition (Paz & Leigh, Chapter 8) */
KCE_COURSE.lessons.push({
  id: 'modal-superposition',
  num: 8,
  title: 'Forced Motion of Shear Buildings — Modal Superposition',
  desc: 'Uncoupling the equations with the modal matrix, modal forces, modal damping, response to impulsive floor loads, base motion and participation factors, and combining modal maxima by absolute sum or SRSS.',
  icon: '🧩',
  color: 'sky',
  meta: ['Chapter 8', 'Γ · SRSS', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The equations \([M]\{\ddot u\} + [K]\{u\} = \{F(t)\}\) are coupled through [K]. Writing the displacements as a combination of the normal modes,</p>
$$\{u\} = [\Phi]\{z\}$$
<p>and pre-multiplying by \(\{\phi\}_i^T\), orthogonality removes every cross term. With normalised modes each <strong>modal coordinate</strong> \(z_i\) obeys its own one-DOF equation:</p>
$$\ddot z_i + 2\xi_i\omega_i\dot z_i + \omega_i^2 z_i = P_i(t),\qquad P_i(t) = \{\phi\}_i^T\{F(t)\} = \sum_j \phi_{ji}F_j(t)$$
<p>Everything from Lessons 1–6 (Duhamel, pulse spectra, response spectra) now applies mode by mode.</p>` },
        { title: 'Description', html: String.raw`
<p><strong>Base motion.</strong> For a support acceleration \(\ddot u_s(t)\), the relative displacements obey \([M]\{\ddot u_r\} + [K]\{u_r\} = -[M]\{1\}\ddot u_s\), and the modal equations become</p>
$$\ddot z_i + \omega_i^2 z_i = \Gamma_i\,\ddot u_s(t),\qquad \Gamma_i = -\frac{\sum_j m_j\phi_{ji}}{\sum_j m_j\phi_{ji}^2} = -\sum_j m_j\phi_{ji}\ \text{(normalised modes)}$$
<p>\(\Gamma_i\) is the <strong>participation factor</strong>. Response spectra are computed with Γ = 1, so spectral values are multiplied by Γ_i:</p>
$$u_{ji,max} = \Gamma_i\,\phi_{ji}\,S_{Di}$$` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Solve the eigenproblem (Lesson 7) for ω_i and normalised φ_i.</li>
  <li>Modal forces P_i(t) (or Γ_i for base motion).</li>
  <li>Solve each modal equation — exactly, with a DLF chart, or from a response spectrum.</li>
  <li>Back-transform: \(u_j(t) = \sum_i \phi_{ji}z_i(t)\).</li>
  <li>The modal maxima occur at different times. Combine them by the <strong>absolute sum</strong> (upper bound) or by <strong>SRSS</strong>, \(\sqrt{\sum_i(\phi_{ji}z_{i,max})^2}\) (best estimate when frequencies are well separated).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 210" role="img" aria-label="Shear building with floor forces and base acceleration">
    <path class="ln" d="M80 190 V40 M180 190 V40"/><rect class="conc" x="74" y="110" width="112" height="12"/><rect class="conc" x="74" y="34" width="112" height="12"/>
    <path class="thin" d="M60 190 H200"/>
    <path class="acc" d="M20 116 H70 M20 40 H70"/><polygon class="accf" points="74,116 64,111 64,121"/><polygon class="accf" points="74,40 64,35 64,45"/>
    <text x="10" y="106" class="a">F₁(t)</text><text x="10" y="30" class="a">F₂(t)</text>
    <path class="acc" d="M110 202 H160"/><polygon class="accf" points="166,202 156,197 156,207"/><text x="172" y="206" class="a">ü_s(t)</text>
    <text x="250" y="60" class="m">uncoupled modal equations</text>
    <text x="250" y="90">z̈₁ + ω₁² z₁ = P₁(t)</text><text x="250" y="120">z̈₂ + ω₂² z₂ = P₂(t)</text>
    <text x="250" y="160" class="m">u = Φ z → combine by SRSS</text>
  </svg>
  <figcaption>Figure 1 — Floor forces or base acceleration are transformed into independent modal equations.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Modal damping', html: String.raw`
<p>Damping is rarely known as a matrix. Assigning a damping ratio ξ_i to each mode (2–5 % for buildings) keeps the equations uncoupled and is equivalent to a damping matrix that satisfies the same orthogonality as [M] and [K] — the usual practice.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 8.1 — triangular impulse on the floors', html: String.raw`
<div class="ex">
  <div class="ex-head">The frame of Example 7.1 is loaded at the floors by F₁ = 10,000(1 − t/t_d) and F₂ = 20,000(1 − t/t_d) lb, t_d = 0.1 s. Find the maximum floor displacements.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>From Lesson 7: ω₁ = 11.83, ω₂ = 32.89 rad/s; φ₁₁ = 0.06437, φ₂₁ = 0.08130, φ₁₂ = 0.0567, φ₂₂ = −0.0924.</li>
      <li>Modal forces: \(P_1 = 0.06437(10{,}000) + 0.0813(20{,}000) = 2270\); \(P_2 = 0.0567(10{,}000) - 0.0924(20{,}000) = -1281\):
        $$\ddot z_1 + 140z_1 = 2270f(t),\qquad \ddot z_2 + 1082.4z_2 = -1281f(t)$$</li>
      <li>\(t_d/T_1 = 0.1/0.532 = 0.188\), \(t_d/T_2 = 0.1/0.191 = 0.524\). From the triangular-pulse chart: DLF₁ = 0.590, DLF₂ = 1.22 (exact values 0.569 and 1.22).</li>
      <li>\(z_{1st} = 2270/140 = 16.3\), \(z_{2st} = -1281/1082.4 = -1.18\) → \(z_{1max} = 9.62\), \(z_{2max} = 1.44\).</li>
      <li>Absolute-sum upper bound:
        $$u_{1max} \le 0.06437(9.62) + 0.0567(1.44) = 0.70\ \text{in},\quad u_{2max} \le 0.0813(9.62) + 0.0924(1.44) = 0.92\ \text{in}$$
        <span class="result">u₁ ≤ 0.70 in · u₂ ≤ 0.92 in</span></li>
      <li>An exact time-history superposition gives 0.67 in and 0.87 in — the absolute sum is conservative by a few percent here because the modal peaks nearly coincide.</li>
    </ol>
  </div>
</div>` },
        { title: 'Example 8.2 — sudden base acceleration of 0.28 g', html: String.raw`
<div class="ex">
  <div class="ex-head">The same frame is subjected to a suddenly applied, constant base acceleration ü_s = 0.28 g. Find the relative floor displacements.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\ddot u_s = 0.28\times386 = 108.47\) in/s².</li>
      <li>\(\Gamma_1 = -(136\times0.06437 + 66\times0.0813) = -14.12\); \(\Gamma_2 = -(136\times0.0567 - 66\times0.0924) = -1.613\).</li>
      <li>With \(z_i = \Gamma_ig_i\): \(\ddot g_i + \omega_i^2g_i = 108.47\) → \(g_i = \frac{108.47}{\omega_i^2}(1 - \cos\omega_it)\), so \(g_{1max} = 1.55\), \(g_{2max} = 0.20\).</li>
      <li>Time history: \(u_{r1} = -0.7135 + 0.704\cos11.83t + 0.009\cos32.89t\), \(u_{r2} = -0.874 + 0.900\cos11.83t - 0.015\cos32.89t\).</li>
      <li>SRSS: \(u_{r1} = \sqrt{(14.12\times0.06437\times1.55)^2 + (1.613\times0.0567\times0.20)^2} = 1.409\) in; \(u_{r2} = 1.800\) in.
        <span class="result">SRSS 1.41 / 1.80 in</span></li>
      <li>Setting every cosine to −1 gives the upper bound 1.426 / 1.789 in; the true time-history peaks are 1.42 / 1.77 in. SRSS is within 2 %.</li>
    </ol>
    <p>The first mode carries almost the whole response: its effective mass is 98.7 % of the total.</p>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use normalised modes so that P_i = φᵢᵀF and Γ_i = Σ m_j φ_ji.</li>
  <li>Multiply spectral values by the participation factor.</li>
  <li>Combine modal maxima by SRSS (well-separated frequencies) or the absolute sum (upper bound).</li>
  <li>Keep enough modes — usually those carrying 90 % of the mass.</li>
</ul>` }
      ]
    }
  ]
});
