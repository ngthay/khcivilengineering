/* Lesson 5 — Centre of gravity and moment of inertia (Bansal, Ch. 5) */
KCE_COURSE.lessons.push({
  id: 'centroid-inertia',
  num: 5,
  title: 'Centroid and Moment of Inertia',
  desc: 'Centroids of composite areas, area moment of inertia, parallel and perpendicular axis theorems, radius of gyration.',
  icon: '⊕',
  color: 'peach',
  meta: ['Bansal Ch. 5', 'Section properties', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Bending stresses, deflections and buckling loads all depend on two properties of the cross-section: where its <strong>centroid</strong> is, and its <strong>second moment of area</strong> (area moment of inertia) \(I\) about axes through that centroid. Composite sections are handled by splitting them into rectangles, triangles and circles.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Shape</th><th>Centroid</th><th>\(I\) about centroidal axis</th></tr></thead>
  <tbody>
    <tr><td>Rectangle \(b × d\)</td><td>\(d/2\)</td><td>\(bd^3/12\) (about base: \(bd^3/3\))</td></tr>
    <tr><td>Triangle base \(b\), height \(h\)</td><td>\(h/3\) from base</td><td>\(bh^3/36\) (about base: \(bh^3/12\))</td></tr>
    <tr><td>Circle diameter \(D\)</td><td>centre</td><td>\(\pi D^4/64\)</td></tr>
    <tr><td>Semicircle radius \(r\)</td><td>\(4r/3\pi\) from diameter</td><td>\(0.11r^4\) (about diameter: \(\pi r^4/8\))</td></tr>
    <tr><td>Hollow circle</td><td>centre</td><td>\(\pi(D^4 - d^4)/64\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Split the section into simple parts; choose a reference axis (usually the bottom edge and the axis of symmetry).</li>
  <li>\(\bar y = \sum A_iy_i/\sum A_i\) (subtract the area of holes).</li>
  <li>For each part \(I = I_G + Ah^2\) about the centroidal axis (parallel axis theorem), then add.</li>
  <li>Radius of gyration \(k = \sqrt{I/A}\); polar moment \(I_{zz} = I_{xx} + I_{yy}\).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 260" role="img" aria-label="Unsymmetrical I-section">
    <rect class="conc" x="210" y="20" width="80" height="12"/>
    <rect class="conc" x="244" y="32" width="12" height="128"/>
    <rect class="conc" x="190" y="160" width="120" height="10"/>
    <path class="dim" d="M150 100 H360"/><text x="364" y="104">X</text><text x="130" y="104">X</text>
    <path class="thin" d="M330 170 V100 M324 170 h12 M324 100 h12"/><text x="336" y="140">ȳ = 69.8</text>
    <path class="thin" d="M210 12 h80"/><text x="236" y="8">80 × 12</text>
    <text x="262" y="70" class="m">web 12 × 128</text>
    <path class="thin" d="M190 186 h120"/><text x="214" y="200">120 × 10</text>
    <path class="thin" d="M170 20 V170 M164 20 h12 M164 170 h12"/><text x="132" y="60">150</text>
  </svg>
  <figcaption>Figure 1 — Unsymmetrical I-section of the worked example (mm).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Parallel and perpendicular axis theorems', html: String.raw`
$$I_{AB} = I_G + Ah^2\qquad\text{(parallel axis)}$$
$$I_{zz} = I_{xx} + I_{yy}\qquad\text{(perpendicular axis, for plane areas)}$$
<p>\(h\) is the distance between the centroidal axis and the parallel axis AB.</p>` },
        { title: 'Product of inertia and principal axes', html: String.raw`
<p>\(I_{xy} = \int xy\,dA\); it is zero if either axis is an axis of symmetry. The principal axes (where \(I_{xy} = 0\)) are at</p>
$$\tan 2\theta = \frac{2I_{xy}}{I_{yy} - I_{xx}},\qquad I_{max,min} = \frac{I_{xx} + I_{yy}}{2} \pm \sqrt{\left(\frac{I_{xx} - I_{yy}}{2}\right)^2 + I_{xy}^2}$$` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Unsymmetrical I-section', html: String.raw`
<div class="ex">
  <div class="ex-head">Top flange 80 × 12, web 12 × 128, bottom flange 120 × 10 (mm); overall depth 150 mm. Find the centroid, Ixx, Iyy and Izz.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Areas and centroids from the bottom: \(A_1 = 960,\ y_1 = 144\); \(A_2 = 1536,\ y_2 = 74\); \(A_3 = 1200,\ y_3 = 5\).</li>
      <li>\(\bar y = \dfrac{960(144) + 1536(74) + 1200(5)}{3696} = 69.78\) mm.</li>
      <li>\(I_{xx} = \left[\frac{80(12)^3}{12} + 960(74.22)^2\right] + \left[\frac{12(128)^3}{12} + 1536(4.22)^2\right] + \left[\frac{120(10)^3}{12} + 1200(64.78)^2\right] = 12.47×10^6\) mm⁴.</li>
      <li>\(I_{yy} = \frac{12(80)^3}{12} + \frac{128(12)^3}{12} + \frac{10(120)^3}{12} = 1.97×10^6\) mm⁴.</li>
      <li>\(I_{zz} = I_{xx} + I_{yy} = 14.44×10^6\) mm⁴.
        <span class="result">ȳ = 69.78 mm, Ixx = 12.47×10⁶, Iyy = 1.97×10⁶, Izz = 14.44×10⁶ mm⁴</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Problem 5.16 — rectangle with semicircular cut-out', html: String.raw`
<div class="ex">
  <div class="ex-head">Rectangle 20 cm wide × 25 cm deep with a semicircle of radius 10 cm removed from the top edge. Find I about the bottom edge AB.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Rectangle about AB: \(bd^3/3 = 20(25)^3/3 = 104\,167\) cm⁴.</li>
      <li>Semicircle: \(I_{DC} = \pi r^4/8 = 3927\) cm⁴; area 157.1 cm²; centroid \(4r/3\pi = 4.24\) cm below DC.</li>
      <li>About its own centroid: \(3927 - 157.1(4.24)^2 = 1101\) cm⁴; about AB (centroid 20.76 cm above AB): \(1101 + 157.1(20.76)^2 = 68\,807\) cm⁴.</li>
      <li>\(I_{AB} = 104\,167 - 68\,807\)
        <span class="result">I_AB ≈ 35 360 cm⁴</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Always transfer to the <em>centroidal</em> axis of the whole section.</li>
  <li>Subtract holes and cut-outs (negative area and negative \(I\)).</li>
  <li>Use consistent units (mm⁴ or cm⁴).</li>
</ul>` }
      ]
    }
  ]
});
