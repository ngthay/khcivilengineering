/* Lesson 9 — Deflections using energy methods (Chhay/Hibbeler Ch. 9) */
KCE_COURSE.lessons.push({
  id: 'energy-methods',
  num: 9,
  title: 'Deflections Using Energy Methods',
  desc: 'External work and strain energy, conservation of energy, the principle of virtual work for trusses, beams and frames, temperature and fabrication effects, and Castigliano’s theorem.',
  icon: '⚡',
  color: 'mint',
  meta: ['Ch. 9', 'Virtual work', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Energy methods find the displacement at <em>any</em> point in <em>any</em> direction of trusses, beams and frames. The <strong>method of virtual work</strong> (unit-load method) applies an imaginary unit load where the displacement is wanted and equates its external virtual work to the internal virtual work stored in the members.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>Truss</th><td>\(1\cdot\Delta = \displaystyle\sum\frac{nNL}{AE}\)</td></tr>
    <tr><th>Beam / frame (bending)</th><td>\(1\cdot\Delta = \displaystyle\int_0^L\frac{mM}{EI}dx\), \(\quad 1\cdot\theta = \displaystyle\int_0^L\frac{m_\theta M}{EI}dx\)</td></tr>
    <tr><th>Temperature (truss)</th><td>\(1\cdot\Delta = \sum n\,\alpha\,\Delta T\,L\)</td></tr>
    <tr><th>Fabrication error</th><td>\(1\cdot\Delta = \sum n\,\Delta L\)</td></tr>
  </tbody>
</table>
<p>\(n,\ m\) = internal force / moment from the unit (virtual) load; \(N,\ M\) = from the real loads.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li><strong>Virtual load:</strong> put a unit force (for Δ) or a unit couple (for θ) at the point, in the direction wanted; find \(n\) or \(m\) everywhere.</li>
  <li><strong>Real load:</strong> find \(N\) or \(M\) with the same sign convention and the same \(x\) coordinates.</li>
  <li>Sum (truss) or integrate (beams) the products; tabulate members for trusses.</li>
  <li>A positive result means the displacement is in the direction of the unit load.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 220" role="img" aria-label="Truss of Example 9-1">
    <g class="ln"><path d="M60 170 H480 M60 170 L200 50 H340 L480 170 M200 50 V170 M340 50 V170 M340 50 L200 170"/></g>
    <g class="accf"><circle cx="60" cy="170" r="4"/><circle cx="200" cy="170" r="4"/><circle cx="340" cy="170" r="4"/><circle cx="480" cy="170" r="4"/><circle cx="200" cy="50" r="4"/><circle cx="340" cy="50" r="4"/></g>
    <polygon class="ln" points="60,170 50,188 70,188"/><circle class="ln" cx="480" cy="180" r="8"/>
    <path class="acc" d="M200 176 V206 M340 176 V206"/><polygon class="accf" points="200,210 195,200 205,200"/><polygon class="accf" points="340,210 335,200 345,200"/>
    <text x="208" y="208">20 kN</text><text x="348" y="208">20 kN</text>
    <text x="44" y="166">A</text><text x="186" y="166">B</text><text x="346" y="166">C</text><text x="488" y="166">D</text><text x="196" y="42">F</text><text x="336" y="42">E</text>
    <text x="120" y="164" class="m">3 m</text><text x="260" y="164" class="m">3 m</text><text x="400" y="164" class="m">3 m</text><text x="490" y="110" class="m">3 m</text>
  </svg>
  <figcaption>Figure 1 — Example 9-1: A = 300 mm², E = 200 GPa; find the vertical deflection of C.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Work and strain energy', html: String.raw`
<p>A force applied gradually does external work \(U_e = \tfrac12P\Delta\). The strain energy stored is</p>
$$U_i = \frac{N^2L}{2AE}\ \text{(axial)},\qquad U_i = \int\frac{M^2}{2EI}dx\ \text{(bending)},\qquad U_i = \int\frac{f_sV^2}{2GA}dx,\qquad U_i = \int\frac{T^2}{2GJ}dx$$
<p>Conservation of energy \(U_e = U_i\) gives a displacement only under a single load in its own direction — hence virtual work. Shear and torsion terms are usually small for beams and frames.</p>` },
        { title: 'Castigliano’s theorem', html: String.raw`
<p>The displacement at a point equals the partial derivative of the strain energy with respect to a force \(P\) acting there in that direction:</p>
$$\Delta = \frac{\partial U_i}{\partial P}:\qquad \Delta = \sum N\frac{\partial N}{\partial P}\frac{L}{AE}\ \text{(truss)},\qquad \Delta = \int M\frac{\partial M}{\partial P}\frac{dx}{EI}\ \text{(beam)}$$
<p>If no real force acts there, add a variable \(P\), differentiate, then set \(P = 0\). \(\partial N/\partial P\) plays the role of \(n\), so the arithmetic matches virtual work.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 9-1 — truss by virtual work', html: String.raw`
<div class="ex">
  <div class="ex-head">Find the vertical displacement of joint C of the truss in Figure 1.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Virtual forces \(n\) from 1 kN down at C; real forces \(N\) from the two 20 kN loads (method of joints).</li>
      <li>Table (kN, m):
        <div class="tbl-wrap"><table class="tbl num">
          <thead><tr><th>Member</th><th>n</th><th>N</th><th>L</th><th>nNL</th></tr></thead>
          <tbody>
            <tr><td>AB</td><td>0.333</td><td>20</td><td>3</td><td>20</td></tr>
            <tr><td>BC</td><td>0.667</td><td>20</td><td>3</td><td>40</td></tr>
            <tr><td>CD</td><td>0.667</td><td>20</td><td>3</td><td>40</td></tr>
            <tr><td>DE</td><td>−0.943</td><td>−28.3</td><td>4.24</td><td>113</td></tr>
            <tr><td>FE</td><td>−0.333</td><td>−20</td><td>3</td><td>20</td></tr>
            <tr><td>EB</td><td>−0.471</td><td>0</td><td>4.24</td><td>0</td></tr>
            <tr><td>BF</td><td>0.333</td><td>20</td><td>3</td><td>20</td></tr>
            <tr><td>AF</td><td>−0.471</td><td>−28.3</td><td>4.24</td><td>56.6</td></tr>
            <tr><td>CE</td><td>1</td><td>20</td><td>3</td><td>60</td></tr>
            <tr><th colspan="4">Σ</th><th>369.6</th></tr>
          </tbody>
        </table></div></li>
      <li>\(1\cdot\Delta_{C_v} = \dfrac{369.6}{AE} = \dfrac{369.6}{(300\times10^{-6})(200\times10^6)} = 0.00616\) m
        <em>(the Khmer edition copies the sum as 396.6 in this line; its 6.16 mm uses 369.6)</em>.
        <span class="result">Δ_Cv = 6.16 mm ↓</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 9-4 — beam by virtual work', html: String.raw`
<div class="ex">
  <div class="ex-head">A 10 m cantilever AB, fixed at A, carries 12 kN/m over its whole length. E = 200 GPa, I = 500(10⁶) mm⁴. Find the deflection at the free end B.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Measure \(x\) from B. Virtual unit load down at B: \(m = -1x\). Real load: \(M = -12x(x/2) = -6x^2\).</li>
      <li>$$1\cdot\Delta_B = \int_0^{10}\frac{(-x)(-6x^2)}{EI}dx = \frac{6}{EI}\cdot\frac{10^4}{4} = \frac{15\,000}{EI}$$</li>
      <li>\(EI = 200(10^6)(500)(10^{-6}) = 100\,000\) kN·m² → \(\Delta_B = 0.150\) m (\(= wL^4/8EI\)).
        <span class="result">Δ_B = 150 mm ↓</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use the same \(x\) origin and sign convention for \(m\) and \(M\) in each region.</li>
  <li>For a rotation use a unit couple; the answer is in radians.</li>
  <li>Temperature and fabrication errors add \(\sum n\alpha\Delta TL\) and \(\sum n\Delta L\) — they need no AE.</li>
</ul>` }
      ]
    }
  ]
});
