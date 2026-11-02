/* Lesson 10 — Motion in fields, gravitation and Kepler's laws */
KCE_COURSE.lessons.push({
  id: 'gravitation',
  num: 10,
  title: 'Motion in Fields, Gravitation and Kepler’s Laws',
  desc: 'Motion in uniform gravitational, electric and magnetic fields; universal gravitation, g with altitude, satellites and Kepler’s laws.',
  icon: '🪐',
  color: 'blue',
  meta: ['Dynamics §6, §10–11', 'Satellites', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A field exerts a force on a particle wherever it is. In a uniform field the force is constant, so the motion is the same as a projectile’s. Newton’s law of <strong>universal gravitation</strong> explains the weight of bodies, the motion of satellites and Kepler’s laws of planetary motion.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Field</th><th>Force</th><th>Acceleration</th></tr></thead>
  <tbody>
    <tr><td>Gravity</td><td>\(\vec P = m\vec g\)</td><td>\(\vec a = \vec g\)</td></tr>
    <tr><td>Electric</td><td>\(\vec F = q\vec E\)</td><td>\(\vec a = q\vec E/m\)</td></tr>
    <tr><td>Magnetic</td><td>\(\vec F = q\vec v\wedge\vec B\)</td><td>\(\vec a = \frac qm\vec v\wedge\vec B\) (circular motion)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>For a satellite, gravitation is the centripetal force: \(G\dfrac{mM}{r^2} = m\dfrac{v^2}{r}\).</li>
  <li>Use \(g_0R^2 = GM_T\) to avoid needing \(G\) and \(M_T\).</li>
  <li>Period \(T = 2\pi r/v\); Kepler’s third law relates \(T\) and the orbit size.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 240" role="img" aria-label="Satellite orbit">
    <circle class="conc" cx="200" cy="120" r="60"/><text x="186" y="124">Earth</text>
    <circle class="acc" cx="200" cy="120" r="100"/><circle class="accf" cx="300" cy="120" r="7"/><text x="310" y="114">m</text>
    <path class="ln" d="M300 120 L240 120"/><polygon class="accf" points="238,120 248,115 248,125"/><text x="252" y="112" class="m">F</text>
    <path class="ln" d="M300 120 V60"/><polygon class="accf" points="300,58 295,68 305,68"/><text x="306" y="70">v</text>
    <path class="dim" d="M200 120 L253 205"/><text x="230" y="180" class="m">r = R + z</text>
    <text x="350" y="160" class="m">v = √(GM/r)</text><text x="350" y="185" class="m">escape: √(2GM/r₀)</text>
  </svg>
  <figcaption>Figure 1 — Circular orbit: gravitation supplies the centripetal force.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Gravitation and g with altitude', html: String.raw`
$$F = G\frac{mM_T}{(R + z)^2},\qquad g = g_0\left(\frac{R}{R + z}\right)^2,\qquad M_T = \frac{g_0R^2}{G}$$
<p>Circular orbit at altitude \(z\): \(v = R\sqrt{\dfrac{g_0}{R + z}}\), \(T = \dfrac{2\pi}{R\sqrt{g_0}}(R + z)^{3/2}\). Escape speed \(\sqrt{2GM/r_0}\); orbital speed \(\sqrt{GM/r_0}\); below the orbital speed the body falls back.</p>` },
        { title: 'Kepler’s laws', html: String.raw`
<ol>
  <li>Planets move on ellipses with the Sun at one focus.</li>
  <li>The radius vector sweeps equal areas in equal times: areal velocity \(dS/dt = C/2\) = constant.</li>
  <li>\(\dfrac{T^2}{a^3} = \dfrac{4\pi^2}{GM_S}\) — the same for all planets.</li>
</ol>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Satellite in orbit', html: String.raw`
<div class="ex">
  <div class="ex-head">A 300 kg satellite orbits at r = 6600 km from the centre of the Earth (M = 6×10²⁴ kg). Find the gravitational force and its orbital speed.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(F = G\dfrac{mM}{r^2} = 6.67×10^{-11}\dfrac{300 × 6×10^{24}}{(6.6×10^6)^2} = 2756\) N.</li>
      <li>\(F = m\dfrac{v^2}{r}\) → \(v = \sqrt{Fr/m} = \sqrt{2756 × 6.6×10^6/300} = 7.8×10^3\) m/s.
        <span class="result">F = 2756 N, v = 7.8 km/s; period 2πr/v ≈ 89 min</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use \(r\) from the Earth’s centre, not the altitude.</li>
  <li>Orbital speed does not depend on the satellite’s mass.</li>
  <li>In a magnetic field the force does no work — speed stays constant.</li>
</ul>` }
      ]
    }
  ]
});
