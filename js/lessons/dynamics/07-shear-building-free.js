/* Lesson 7 — Free vibration of a shear building (Paz & Leigh, Chapter 7) */
KCE_COURSE.lessons.push({
  id: 'shear-building-free',
  num: 7,
  title: 'Free Vibration of a Shear Building — Frequencies and Normal Modes',
  desc: 'The shear-building model, story stiffness and floor masses, the eigenproblem [K − ω²M]{a} = 0, natural frequencies and normal modes, normalisation, orthogonality, and Rayleigh’s quotient — with the two-story steel frame example.',
  icon: '🏢',
  color: 'violet',
  meta: ['Chapter 7', 'Eigenproblem', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>shear building</strong> is a multistory frame in which (1) the mass is lumped at the floors, (2) the girders are rigid compared with the columns, and (3) axial deformation of the columns is ignored. Each floor then has one lateral DOF, and story \(i\) acts as a spring with stiffness</p>
$$k_i = \sum_{\text{columns}} \frac{12EI}{L_i^3}\quad(\text{fixed–fixed columns})$$` },
        { title: 'Description', html: String.raw`
<p>Equilibrium of each floor mass gives \([M]\{\ddot u\} + [K]\{u\} = \{0\}\), with a diagonal mass matrix and a banded stiffness matrix. For two stories:</p>
$$[M] = \begin{bmatrix} m_1 & 0\\ 0 & m_2\end{bmatrix},\qquad [K] = \begin{bmatrix} k_1+k_2 & -k_2\\ -k_2 & k_2\end{bmatrix}$$
<p>Assuming harmonic motion \(\{u\} = \{a\}\sin(\omega t - \alpha)\) gives the <strong>eigenproblem</strong></p>
$$\left([K] - \omega^2[M]\right)\{a\} = \{0\},\qquad \left|[K] - \omega^2[M]\right| = 0$$
<p>The N roots \(\omega_1 < \omega_2 < \dots\) are the natural frequencies; each has a <strong>normal mode</strong> \(\{a\}_i\) — a shape in which all floors move in phase at that frequency. The first is the fundamental mode; the others are higher modes (harmonics).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Floor weights (dead load plus tributary walls) → masses m = W/g.</li>
  <li>Story stiffnesses from the columns.</li>
  <li>Assemble [M] and [K]; expand the determinant into a polynomial in ω² and solve.</li>
  <li>For each ω, solve one equation for the amplitude ratios (set a₁ = 1).</li>
  <li>Normalise: \(\{\phi\}_i = \{a\}_i/\sqrt{\{a\}_i^T[M]\{a\}_i}\) so that \(\{\phi\}^T[M]\{\phi\} = 1\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Two-story shear building and its modes">
    <path class="ln" d="M40 200 V40 M140 200 V40"/><rect class="conc" x="34" y="110" width="112" height="12"/><rect class="conc" x="34" y="34" width="112" height="12"/>
    <path class="thin" d="M24 200 H156"/><text x="150" y="120" class="m">m₁, k₁ = 15 ft</text><text x="150" y="44" class="m">m₂, k₂ = 10 ft</text>
    <path class="dim" d="M260 200 V40"/><path class="acc" d="M260 200 L320 116 L336 40"/><circle class="accf" cx="320" cy="116" r="4"/><circle class="accf" cx="336" cy="40" r="4"/>
    <text x="274" y="214" class="m">mode 1 (1 : 1.26)</text>
    <path class="dim" d="M420 200 V40"/>    <path class="acc" d="M420 200 L460 116 L390 40"/><circle class="accf" cx="460" cy="116" r="4"/><circle class="accf" cx="390" cy="40" r="4"/>
    <text x="420" y="214" class="m">mode 2 (1 : −1.63)</text>
  </svg>
  <figcaption>Figure 1 — Two-story shear building and its two normal modes (Example 7.1).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Orthogonality and Rayleigh’s quotient', html: String.raw`
<p>By Betti’s theorem, two modes with different frequencies are <strong>orthogonal</strong> with respect to the mass and to the stiffness:</p>
$$\{\phi\}_i^T[M]\{\phi\}_j = 0,\qquad \{\phi\}_i^T[K]\{\phi\}_j = 0\qquad (i \ne j)$$
<p>while \(\{\phi\}_i^T[K]\{\phi\}_i = \omega_i^2\). This is what lets modal superposition (Lesson 8) uncouple the equations. Pre-multiplying the eigen-equation by \(\{a\}^T\) gives <strong>Rayleigh’s quotient</strong></p>
$$\omega^2 = \frac{\{a\}^T[K]\{a\}}{\{a\}^T[M]\{a\}}$$
<p>which gives a good estimate of ω₁ from any reasonable guess of the first mode (for example the static deflection under the floor weights), always from above.</p>
<div data-widget="shear-building-2dof" data-title="Two-story shear building — frequencies and modes"></div>
<p>The defaults are Example 7.1.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 7.1 — two-story steel frame', html: String.raw`
<div class="ex">
  <div class="ex-head">Frames 15 ft apart; floor load 100 psf (first floor) and 50 psf (roof), walls 20 psf. Span 30 ft. First story 15 ft with W10×45 columns (I = 248 in⁴), second story 10 ft with W10×21 columns. Girders rigid. Find the frequencies and normal modes.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(W_1 = 100\times30\times15 + 20\times12.5\times15\times2 = 52{,}500\) lb → \(m_1 = 136\) lb·s²/in; \(W_2 = 50\times30\times15 + 20\times5\times15\times2 = 25{,}500\) lb → \(m_2 = 66\) lb·s²/in.</li>
      <li>\(k_1 = 12E(2I)/L^3 = 12\times30\times10^6\times496/180^3 = 30{,}700\) lb/in; \(k_2 = 44{,}300\) lb/in. (The book prints I = 118 in⁴ for the W10×21, which would give 49,200 lb/in; its 44,300 corresponds to the actual I ≈ 106 in⁴ of a W10×21, and the results below use 44,300.)</li>
      <li>\(\begin{vmatrix} 75{,}000 - 136\omega^2 & -44{,}300\\ -44{,}300 & 44{,}300 - 66\omega^2\end{vmatrix} = 0\) → \(8976\omega^4 - 10{,}974{,}800\omega^2 + 1.36\times10^9 = 0\).</li>
      <li>\(\omega_1^2 = 140\), \(\omega_2^2 = 1082\) → \(\omega_1 = 11.83\), \(\omega_2 = 32.89\) rad/s; \(f_1 = 1.88\), \(f_2 = 5.24\) cps; \(T_1 = 0.532\), \(T_2 = 0.191\) s.</li>
      <li>Modes from \((75{,}000 - 136\omega^2)a_1 = 44{,}300a_2\): \(a_{21}/a_{11} = 1.263\), \(a_{22}/a_{12} = -1.629\).</li>
      <li>Normalised: \(\phi_{11} = 0.06437,\ \phi_{21} = 0.08130\); \(\phi_{12} = 0.0567,\ \phi_{22} = -0.0924\).
        <span class="result">ω₁ = 11.83 rad/s (T₁ = 0.53 s) · ω₂ = 32.89 rad/s (T₂ = 0.19 s)</span></li>
      <li>Orthogonality check: \(136(0.06437)(0.0567) + 66(0.0813)(-0.0924) = 0.496 - 0.496 = 0\) ✓.</li>
    </ol>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Lump each floor’s weight (slab, beams, half the walls and columns above and below).</li>
  <li>Story stiffness: sum of 12EI/L³ for fixed columns, 3EI/L³ for pinned bases.</li>
  <li>An N-story shear building has N frequencies and N modes; mode i has i − 1 sign changes.</li>
  <li>Normalise modes to φᵀMφ = 1 and check orthogonality.</li>
</ul>` }
      ]
    }
  ]
});
