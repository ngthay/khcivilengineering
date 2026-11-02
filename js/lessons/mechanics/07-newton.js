/* Lesson 7 — Newton's laws, momentum, friction */
KCE_COURSE.lessons.push({
  id: 'newton',
  num: 7,
  title: 'Newton’s Laws, Friction and Tension',
  desc: 'The three laws, linear momentum, centre of mass, friction, normal reaction, cable tension and a method for dynamics problems.',
  icon: '🍎',
  color: 'rose',
  meta: ['Dynamics §1–2', 'ΣF = ma', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Dynamics</strong> links motion to its causes, the forces. Newton’s three laws are the foundation: a body keeps its state of motion unless a net force acts (inertia); the net force equals the rate of change of momentum; and every action has an equal and opposite reaction.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <tbody>
    <tr><th>1st law (inertia)</th><td>\(\sum\vec F = \vec 0\) ⇔ rest or uniform straight-line motion</td></tr>
    <tr><th>2nd law</th><td>\(\sum\vec F = \dfrac{d\vec p}{dt} = m\vec a\), with momentum \(\vec p = m\vec v\) (kg·m/s)</td></tr>
    <tr><th>3rd law</th><td>\(\vec F_{1\to2} = -\vec F_{2\to1}\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Isolate the body and draw all external forces (weight, reactions, friction, tensions).</li>
  <li>Write \(\sum\vec F = m\vec a_G\).</li>
  <li>Choose axes along and perpendicular to the motion; project the equation.</li>
  <li>Solve; \(a = \dfrac{\text{driving forces} - \text{resisting forces}}{\text{total mass}}\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 560 220" role="img" aria-label="Block on an incline">
    <polygon class="conc" points="40,190 520,190 520,60"/>
    <g transform="rotate(-15.15 300 125)"><rect class="conc" x="270" y="95" width="60" height="30"/></g>
    <path class="acc" d="M300 110 V180"/><polygon class="accf" points="300,182 295,172 305,172"/><text x="306" y="176">P = mg</text>
    <path class="acc" d="M300 110 L282 44"/><polygon class="accf" points="281,42 278,53 287,51"/><text x="250" y="40">R</text>
    <path class="acc" d="M300 110 L370 91"/><polygon class="accf" points="372,90 361,88 363,98"/><text x="376" y="88">f = μN</text>
    <path class="thin" d="M110 190 A 70 70 0 0 0 108 172"/><text x="118" y="184" class="m">α</text>
  </svg>
  <figcaption>Figure 1 — Free-body diagram of a block on an incline: weight, normal reaction and friction.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Centre of mass', html: String.raw`
$$\overrightarrow{OG} = \frac{1}{M}\sum m_i\overrightarrow{OA_i},\qquad x_G = \frac1M\int x\,dm$$
<p>Theorem of the centre of mass: \(\dfrac{d\vec p}{dt} = M\vec a_G = \sum\vec F_{ext}\) — the centre of mass moves as if all the mass and all external forces were concentrated there.</p>` },
        { title: 'Friction, reaction, tension', html: String.raw`
<ul>
  <li><strong>Friction</strong> opposes the (tendency to) motion: \(f = \mu N\), with static coefficient \(\mu_s \ge\) kinetic coefficient \(\mu_c\).</li>
  <li><strong>Normal reaction</strong> on a horizontal plane at rest: \(\vec P + \vec R = \vec 0\); on an incline \(R = P\cos\alpha\) and the driving component is \(P\sin\alpha\).</li>
  <li><strong>Tension</strong> in a massless cable is the same at both ends: \(T_A = T_B\).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Dynamics exercise 1 — braking car', html: String.raw`
<div class="ex">
  <div class="ex-head">A car of mass 800 kg moving at 72 km/h must stop in 50 m. Find the braking force.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(v_0 = 72\) km/h = 20 m/s; \(v^2 - v_0^2 = 2ax\) → \(a = -400/100 = -4\) m/s².</li>
      <li>\(f = ma = 800(-4) = -3200\) N (opposite to the motion).
        <span class="result">Braking force = 3.2 kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Pulley systems', html: String.raw`
<div class="ex">
  <div class="ex-head">Lift a 5 kg mass at constant speed (a) with one movable pulley, (b) with two movable pulleys in series. Massless pulleys, no friction, g = 10 m/s².</div>
  <div class="ex-body">
    <ol class="steps">
      <li>(a) Two cable segments hold the load: \(2T = mg\) → \(F = T = mg/2 = 25\) N.</li>
      <li>(b) \(2T_1 = mg\), \(T_1 = 2T_2\) → \(F = T_2 = mg/4 = 12.5\) N.
        <span class="result">(a) 25 N, (b) 12.5 N</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Draw only the forces acting <em>on</em> the isolated body.</li>
  <li>Friction acts opposite to the relative motion and is at most \(\mu N\).</li>
  <li>Linked bodies: same acceleration magnitude, related by the cable geometry.</li>
</ul>` }
      ]
    }
  ]
});
