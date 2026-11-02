/* Lesson 1 — Units, dimensions and mathematical tools */
KCE_COURSE.lessons.push({
  id: 'units',
  num: 1,
  title: 'Units, Dimensions and Mathematical Tools',
  desc: 'SI and CGS units, dimensional analysis, physical constants, and the calculus and vector tools used in mechanics.',
  icon: '📐',
  color: 'blue',
  meta: ['Book: formula summary', 'Units', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Every physical quantity has a number and a <strong>unit</strong>. Mechanics needs only three base quantities — length \(L\), mass \(M\) and time \(T\); all others (velocity, force, energy …) are derived from them. Checking the <strong>dimensions</strong> of an equation is a quick way to catch mistakes.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Base quantity</th><th>Dimension</th><th>SI unit</th><th>Symbol</th></tr></thead>
  <tbody>
    <tr><td>Length</td><td>L</td><td>metre</td><td>m</td></tr>
    <tr><td>Mass</td><td>M</td><td>kilogram</td><td>kg</td></tr>
    <tr><td>Time</td><td>T</td><td>second</td><td>s</td></tr>
    <tr><td>Electric current</td><td>I</td><td>ampere</td><td>A</td></tr>
    <tr><td>Temperature</td><td>θ</td><td>kelvin</td><td>K</td></tr>
    <tr><td>Amount of substance</td><td>N</td><td>mole</td><td>mol</td></tr>
    <tr><td>Luminous intensity</td><td>J</td><td>candela</td><td>cd</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Write the dimension of each quantity: velocity \(LT^{-1}\), acceleration \(LT^{-2}\), force \(MLT^{-2}\), work \(ML^2T^{-2}\).</li>
  <li>Both sides of a correct equation have the same dimensions.</li>
  <li>To find an unknown relation \(f = C\,m^ak^b\), equate the powers of M, L and T.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<table class="tbl">
  <thead><tr><th>Quantity</th><th>CGS</th><th>SI (MKS)</th><th>Relation</th></tr></thead>
  <tbody>
    <tr><td>Length / mass / time</td><td>cm / g / s</td><td>m / kg / s</td><td>1 m = 10² cm, 1 kg = 10³ g</td></tr>
    <tr><td>Acceleration</td><td>cm/s²</td><td>m/s²</td><td>1 m/s² = 10² cm/s²</td></tr>
    <tr><td>Force</td><td>dyne</td><td>newton (N)</td><td>1 N = 10⁵ dyne</td></tr>
    <tr><td>Work, energy</td><td>erg</td><td>joule (J)</td><td>1 J = 10⁷ erg</td></tr>
    <tr><td>Pressure</td><td>bar</td><td>pascal (Pa)</td><td>1 Pa = 10⁻⁵ bar; 1 atm = 1.013×10⁵ Pa</td></tr>
  </tbody>
</table>` }
      ]
    },
    {
      title: 'Constants and Maths Tools',
      subs: [
        { title: 'Physical constants', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><td>Speed of light \(c\)</td><td>299 792 458 m/s</td><td>Gravitational constant \(G\)</td><td>6.67×10⁻¹¹ m³/(kg·s²)</td></tr>
    <tr><td>Avogadro \(N_A\)</td><td>6.022×10²³ /mol</td><td>Elementary charge \(e\)</td><td>1.602×10⁻¹⁹ C</td></tr>
    <tr><td>Mass of Earth</td><td>6×10²⁴ kg, radius 6.4×10³ km</td><td>Mass of Sun</td><td>2×10³⁰ kg</td></tr>
    <tr><td>Mass of Moon</td><td>7.35×10²² kg</td><td>Earth–Moon distance</td><td>3.84×10⁵ km</td></tr>
  </tbody>
</table>
<p>1 astronomical unit = Earth–Sun distance = 1.50×10¹¹ m; 1 rad = 180°/π.</p>` },
        { title: 'Calculus and vectors', html: String.raw`
<ul>
  <li>Derivatives: \((x^n)' = nx^{n-1}\), \((e^u)' = u'e^u\), \((uv)' = u'v + uv'\), \((\sin u)' = u'\cos u\).</li>
  <li>First-order linear ODE \(y' + ay = 0\) → \(y = Ce^{-ax}\); second-order \(y'' + \omega^2y = 0\) → \(y = A\sin(\omega x + \varphi)\).</li>
  <li>Scalar product \(\vec a\cdot\vec b = ab\cos\theta = a_xb_x + a_yb_y + a_zb_z\); vector product \(|\vec a \wedge \vec b| = ab\sin\theta\).</li>
  <li>Cylindrical coordinates \((r, \theta, z)\) and spherical coordinates \((r, \theta, \varphi)\) for circular and orbital motion.</li>
  <li>Series: Taylor \(f(x) = f(a) + f'(a)(x - a) + \dots\); for small \(x\): \(\sin x \approx x\), \((1 + x)^n \approx 1 + nx\).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Exercise 1 — check equations dimensionally', html: String.raw`
<div class="ex">
  <div class="ex-head">Which are dimensionally correct? \(\lambda = vt\), \(F = m/a\), \(F = mv/t\), \(h = v^2/2g\) (λ, h are lengths; \([F] = MLT^{-2}\)).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\([vt] = LT^{-1} · T = L\) ✓.</li>
      <li>\([m/a] = M/(LT^{-2}) = ML^{-1}T^2 \ne MLT^{-2}\) ✗.</li>
      <li>\([mv/t] = M · LT^{-1}/T = MLT^{-2}\) ✓.</li>
      <li>\([v^2/2g] = L^2T^{-2}/(LT^{-2}) = L\) ✓.
        <span class="result">Only F = m/a is wrong</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Exercises 3–4 — find exponents', html: String.raw`
<div class="ex">
  <div class="ex-head">(a) Frequency of a mass on a spring: \(f = C\,m^ak^b\), \([f] = T^{-1}\), \([k] = MT^{-2}\). (b) Speed of a wave on a string: \(v = C\,F^a(m/\ell)^b\).</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) \(T^{-1} = M^aM^bT^{-2b}\) → \(a + b = 0\), \(-2b = -1\) → \(b = \tfrac12\), \(a = -\tfrac12\): \(f = C\sqrt{k/m}\).</li>
      <li>(b) \(LT^{-1} = (MLT^{-2})^a(ML^{-1})^b\) → \(a + b = 0\), \(a - b = 1\), \(-2a = -1\) → \(a = \tfrac12\), \(b = -\tfrac12\): \(v = C\sqrt{F\ell/m}\).
        <span class="result">f ∝ √(k/m); v ∝ √(F/(m/ℓ))</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Convert everything to SI before substituting.</li>
  <li>Check the dimensions of every final formula.</li>
  <li>Dimensional analysis cannot find pure-number constants (like 2π).</li>
</ul>` }
      ]
    }
  ]
});
