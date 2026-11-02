/* Lesson 3 — Principal stresses and strains (Bansal, Ch. 3) */
KCE_COURSE.lessons.push({
  id: 'principal-stresses',
  num: 3,
  title: 'Principal Stresses and Mohr’s Circle',
  desc: 'Stresses on oblique planes, principal planes and stresses, maximum shear stress and Mohr’s circle.',
  icon: '⭕',
  color: 'lilac',
  meta: ['Bansal Ch. 3', '2D stress', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A point in a loaded member usually carries normal stresses \(\sigma_1\), \(\sigma_2\) and a shear stress \(\tau\) on two perpendicular planes. On a plane inclined at \(\theta\) the stresses are different. The planes where the shear stress is zero are the <strong>principal planes</strong>, and the normal stresses on them are the <strong>principal stresses</strong> — the largest and smallest normal stresses at the point.</p>` },
        { title: 'Description', html: String.raw`
<p>Sign convention used in the book: tensile stresses positive; \(\theta\) measured from the plane carrying \(\sigma_1\) (the normal cross-section). Three cases build up the general one: (1) uniaxial stress, (2) two perpendicular direct stresses, (3) two direct stresses plus shear.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Identify \(\sigma_1\), \(\sigma_2\) (with signs) and \(\tau\).</li>
  <li>Oblique plane: use the transformation equations for \(\sigma_n\) and \(\sigma_t\).</li>
  <li>Principal stresses: \(\frac{\sigma_1 + \sigma_2}{2} \pm \sqrt{\left(\frac{\sigma_1 - \sigma_2}{2}\right)^2 + \tau^2}\); planes from \(\tan 2\theta = 2\tau/(\sigma_1 - \sigma_2)\).</li>
  <li>Check graphically with Mohr’s circle.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 250" role="img" aria-label="Mohr's circle">
    <line class="thin" x1="60" y1="130" x2="620" y2="130"/><line class="thin" x1="200" y1="20" x2="200" y2="240"/>
    <text x="604" y="122">σ</text><text x="206" y="30">τ</text>
    <circle class="acc" cx="330" cy="130" r="100"/>
    <circle class="accf" cx="230" cy="130" r="4"/><circle class="accf" cx="430" cy="130" r="4"/><circle class="accf" cx="330" cy="130" r="3"/>
    <path class="ln" d="M410 70 L250 190"/><circle class="accf" cx="410" cy="70" r="4"/><circle class="accf" cx="250" cy="190" r="4"/>
    <text x="414" y="64">(σ₁, τ)</text><text x="214" y="208">(σ₂, −τ)</text>
    <text x="434" y="150" class="a">σmajor</text><text x="166" y="150" class="a">σminor</text>
    <path class="dim" d="M330 130 V30"/><text x="336" y="40" class="m">τmax = R</text>
    <text x="300" y="148" class="m">(σ₁+σ₂)/2</text><text x="370" y="124" class="m">2θ</text>
  </svg>
  <figcaption>Figure 1 — Mohr’s circle: centre at (σ₁+σ₂)/2, radius R = √[((σ₁−σ₂)/2)² + τ²]. The ends of the horizontal diameter are the principal stresses.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Stresses on an oblique plane', html: String.raw`
$$\sigma_n = \frac{\sigma_1 + \sigma_2}{2} + \frac{\sigma_1 - \sigma_2}{2}\cos 2\theta + \tau\sin 2\theta$$
$$\sigma_t = \frac{\sigma_1 - \sigma_2}{2}\sin 2\theta - \tau\cos 2\theta,\qquad \sigma_R = \sqrt{\sigma_n^2 + \sigma_t^2}$$
<p>With \(\sigma_2 = \tau = 0\) (uniaxial): \(\sigma_n = \sigma\cos^2\theta\), \(\sigma_t = \tfrac{\sigma}{2}\sin 2\theta\), so the maximum shear is \(\sigma/2\) on the 45° plane — which is why ductile bars fail on 45° cones in tension.</p>` },
        { title: 'Principal stresses and maximum shear', html: String.raw`
$$\sigma_{major,\,minor} = \frac{\sigma_1 + \sigma_2}{2} \pm \sqrt{\left(\frac{\sigma_1 - \sigma_2}{2}\right)^2 + \tau^2},\qquad \tan 2\theta = \frac{2\tau}{\sigma_1 - \sigma_2}$$
$$\tau_{max} = \sqrt{\left(\frac{\sigma_1 - \sigma_2}{2}\right)^2 + \tau^2} = \frac{\sigma_{major} - \sigma_{minor}}{2}$$
<p>The planes of maximum shear are at 45° to the principal planes.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 1 — two direct stresses', html: String.raw`
<div class="ex">
  <div class="ex-head">A point carries tensile stresses σ₁ = 20 N/mm² and σ₂ = 10 N/mm² on perpendicular planes. Find σn and σt on a plane at θ = 30°.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\sigma_n = 15 + 5\cos 60° = 17.5\) N/mm².</li>
      <li>\(\sigma_t = 5\sin 60° = 4.33\) N/mm²; resultant \(\sqrt{17.5^2 + 4.33^2} = 18.03\) N/mm².
        <span class="result">σn = 17.5 N/mm², σt = 4.33 N/mm²</span></li>
    </ol>
    <div class="note"><p>Examples 1 and 2 were written for this lesson in the style of the book’s Chapter 3 problems; the numbers were checked by calculation.</p></div>
  </div>
</div>` },
        { title: 'Example 2 — principal stresses with shear', html: String.raw`
<div class="ex">
  <div class="ex-head">σ₁ = 60 N/mm² (tension), σ₂ = 40 N/mm² (compression), τ = 20 N/mm². Find the principal stresses, their planes and τmax.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Centre \(= (60 - 40)/2 = 10\); radius \(R = \sqrt{50^2 + 20^2} = 53.85\) N/mm².</li>
      <li>\(\sigma_{major} = 10 + 53.85 = 63.85\) N/mm² (tension); \(\sigma_{minor} = 10 - 53.85 = -43.85\) N/mm² (compression).</li>
      <li>\(\tan 2\theta = 2(20)/100 = 0.4\) → \(\theta = 10.9°\) and 100.9°.</li>
      <li>\(\tau_{max} = R = 53.85\) N/mm² on planes at 55.9° and 145.9°.
        <span class="result">σ = +63.85 / −43.85 N/mm², θ = 10.9°, τmax = 53.85 N/mm²</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Keep signs: compression negative.</li>
  <li>\(\sigma_{major} + \sigma_{minor} = \sigma_1 + \sigma_2\) — a quick check.</li>
  <li>Principal planes are 90° apart; maximum-shear planes are at 45° to them.</li>
  <li>Use Mohr’s circle to sketch and check the analytical answer.</li>
</ul>` }
      ]
    }
  ]
});
