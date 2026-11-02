/* Lesson 7 — Torsion (design for torsion, combined with shear) */
KCE_COURSE.lessons.push({
  id: 'torsion',
  num: 7,
  title: 'Torsion Design',
  desc: 'Equilibrium and compatibility torsion, thin-walled tube and space truss, threshold and cracking torque, and torsion + shear reinforcement.',
  icon: '🌀',
  color: 'sky',
  meta: ['ACI 318M-19 §9.5.4, 9.6.4, 9.7.5, 22.7', 'Beams', 'Torsion'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A moment that acts about the <strong>longitudinal axis</strong> of a member is a torque, twisting moment or torsional moment \(T\). It appears in spandrel (edge) beams that carry a slab on one side, cantilever canopies, curved girders, beams loaded eccentrically and beams supporting precast slabs on one ledge. Torsion produces shear stresses that add to those from vertical shear, so torsion is always designed <strong>together with shear</strong>: closed stirrups resist the circulating shear and extra longitudinal bars resist its axial component.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Type</th><th>Cause</th><th>Design torque</th></tr></thead>
  <tbody>
    <tr><td><strong>Equilibrium (primary) torsion</strong></td><td>The load can only be carried by twisting — cantilever beam loaded off its axis, canopy on edge beams, curved girder, beam carrying precast slabs on one side.</td><td>The full \(T_u\) must be resisted; it may <em>not</em> be reduced.</td></tr>
    <tr><td><strong>Compatibility (secondary) torsion</strong></td><td>Arises in statically indeterminate structures because members must deform together — e.g. a spandrel beam restrained by the floor beams framing into it.</td><td>After cracking the beam softens and moments redistribute, so \(T_u\) may be reduced to \(\phi T_{cr}\) (§22.7.3.2).</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Find \(T_u\) and \(V_u\) at the critical section, \(d\) from the face of the support (§9.4.4.3).</li>
  <li>Compare \(T_u\) with the threshold \(\phi T_{th}\): if smaller, torsion may be neglected.</li>
  <li>Compatibility torsion only: reduce \(T_u\) to \(\phi T_{cr}\) if it is larger.</li>
  <li>Check the cross-section limit for combined shear and torsion.</li>
  <li>Design closed stirrups: \(A_v/s + 2A_t/s\); check the minimum and the maximum spacing.</li>
  <li>Design the longitudinal torsion steel \(A_\ell\), check \(A_{\ell,min}\) and distribute it around the perimeter.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 660 260" role="img" aria-label="Thin-walled tube and space truss">
    <!-- tube -->
    <polygon class="conc" points="40,90 180,90 180,230 40,230"/>
    <polygon class="thin" points="40,90 100,40 240,40 180,90"/><polygon class="thin" points="180,90 240,40 240,180 180,230"/>
    <rect class="comp" x="62" y="112" width="96" height="96" style="fill:none;stroke-dasharray:5 4"/>
    <path class="acc" d="M75 112 h70 M158 125 v70 M145 208 h-70 M62 195 v-70"/>
    <polygon class="accf" points="145,112 137,108 137,116"/><polygon class="accf" points="158,195 154,187 162,187"/><polygon class="accf" points="75,208 83,204 83,212"/><polygon class="accf" points="62,125 58,133 66,133"/>
    <text x="84" y="164" class="a">q = T/2A₀</text>
    <path class="ln" d="M240 40 l30 -14" /><text x="252" y="20">T</text>
    <text x="60" y="252" class="m">Thin-walled tube: shear flow q</text>
    <!-- space truss -->
    <rect class="conc" x="330" y="70" width="300" height="140"/>
    <g class="thin" style="stroke:#e0565b"><path d="M370 70 v140 M420 70 v140 M470 70 v140 M520 70 v140 M570 70 v140 M620 70 v140"/></g>
    <g class="acc" style="stroke-dasharray:6 4"><path d="M330 190 L385 85 M375 210 L445 75 M435 210 L505 75 M495 210 L565 75 M555 210 L625 75"/></g>
    <g fill="#e0565b"><circle cx="338" cy="78" r="5"/><circle cx="622" cy="78" r="5"/><circle cx="338" cy="202" r="5"/><circle cx="622" cy="202" r="5"/></g>
    <text x="352" y="232" class="m">closed stirrups · struts at θ · corner bars</text>
    <text x="458" y="60" class="a">Space truss</text>
  </svg>
  <figcaption>Figure 1 — Before cracking a solid beam acts like a thin-walled tube carrying a constant shear flow; after cracking it acts like a space truss of closed stirrups, longitudinal bars and inclined concrete struts.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Torsion in Structures',
      subs: [
        { title: 'Where torsion comes from', html: String.raw`
<ul>
  <li><strong>Cantilever with an eccentric load</strong>: a load \(P\) at lever arm \(z\) from the beam axis gives \(T = Pz\).</li>
  <li><strong>Edge beam supporting a slab or canopy</strong>: the slab's end moment acts on the beam as a distributed torque \(m_t\) (kN·m/m).</li>
  <li><strong>Beam supporting precast units on one side</strong>, curved girders and helical stairs.</li>
</ul>
<p>The internal forces at any section are \(N_z\), \(V_x\), \(V_y\), \(M_x\), \(M_y\) and the torque \(T_z\) about the longitudinal axis.</p>` },
        { title: 'Torsion diagrams', html: String.raw`
<table class="tbl">
  <thead><tr><th>Member and load</th><th>Support torque(s)</th></tr></thead>
  <tbody>
    <tr><td>Cantilever, torque \(T\) at the free end</td><td>\(M_t = T\), constant along the span</td></tr>
    <tr><td>Cantilever, uniform torque \(m_t\)</td><td>\(M_t = m_tL\) at the support, linear to zero at the tip</td></tr>
    <tr><td>Both ends fixed, \(T\) at midspan</td><td>\(M_{t1} = M_{t2} = T/2\)</td></tr>
    <tr><td>Both ends fixed, \(T\) at distance \(a\) (\(b = L - a\))</td><td>\(M_{t1} = Tb/L\), \(M_{t2} = Ta/L\)</td></tr>
    <tr><td>Both ends fixed, \(T_1\) at \(a\) and \(T_2\) at \(a + b\) (\(c\) to the right end)</td><td>\(M_{t1} = \dfrac{T_1(b + c) + T_2c}{L}\), \(M_{t2} = \dfrac{T_2c - T_1a}{L}\), \(M_{t3} = -\dfrac{T_1a + T_2(a + b)}{L}\)</td></tr>
    <tr><td>Both ends fixed, uniform torque \(m_t\)</td><td>\(M_{t1} = m_tL/2\) at each end, linear through zero at midspan</td></tr>
  </tbody>
</table>
<div class="note"><p>The lecture slide shows \(M_{t1} = [T_1(b - c) + T_2c]/L\) — the first term should be \(T_1(b + c)\), the share of \(T_1\) carried to the left support. With \(a = b = c = L/3\) and \(T_1 = T_2 = T\): \(M_{t1} = T\), \(M_{t2} = 0\), \(M_{t3} = -T\).</p></div>` },
        { title: 'Reducing compatibility torsion', html: String.raw`
<p>A canopy carried by an edge beam is <strong>equilibrium</strong> torsion: if the beam twists, nothing else can pick up the load, so the design torque may not be reduced. A spandrel beam in a floor with beams framing into it carries <strong>compatibility</strong> torsion: when it cracks and twists, the floor beams take more end moment, so ACI lets you design the spandrel for \(\phi T_{cr}\) — provided the adjoining members are designed for the redistributed moments and shears (§22.7.3.3).</p>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Thin-walled tube and cracking torque', html: String.raw`
<p>The core of a solid section contributes little to torsional resistance, so the beam is idealised as a tube of wall thickness \(t\). Moments about the axis of the shear flow \(q\) acting on a wall of size \(x_0 × y_0\):</p>
$$T = 2qx_0\frac{y_0}{2} + 2qy_0\frac{x_0}{2} = 2qA_0,\qquad q = \frac{T}{2A_0} = \tau t,\qquad \tau = \frac{T}{2A_0t}$$
<p>The concrete cracks when \(\tau\) reaches the tensile strength under biaxial tension–compression, taken conservatively as \(0.33\lambda\sqrt{f'_c}\). Before cracking ACI takes \(A_0 = \tfrac23 A_{cp}\) and \(t = \tfrac34 A_{cp}/p_{cp}\), which gives the <strong>cracking torque</strong> (Table 22.7.5.1):</p>
$$T_{cr} = 0.33\lambda\sqrt{f'_c}\,\frac{A_{cp}^2}{p_{cp}}$$
<p>\(A_{cp}\) = area enclosed by the outside perimeter of the concrete section; \(p_{cp}\) = that outside perimeter. One quarter of it is the <strong>threshold torque</strong> (Table 22.7.4.1(a)):</p>
$$T_{th} = 0.083\lambda\sqrt{f'_c}\,\frac{A_{cp}^2}{p_{cp}}\quad\left(× \sqrt{1 + \frac{N_u}{0.33A_g\lambda\sqrt{f'_c}}}\ \text{with axial force}\right)$$
<p>\(\sqrt{f'_c}\) is limited to 8.3 MPa (§22.7.2.1). For hollow sections \(A_g\) replaces \(A_{cp}\) in \(T_{th}\).</p>` },
        { title: 'Space truss: stirrups and longitudinal steel', html: String.raw`
<p>After cracking, the stirrups crossed by one inclined crack on a wall of height \(y_0\) number \(n = y_0\cot\theta/s\). Each carries \(A_tf_{yt}\), so the wall shear is \(V_2 = A_tf_{yt}y_0\cot\theta/s\) and its torque \(T_2 = V_2x_0/2\). Summing the four walls with \(x_0y_0 = A_{oh}\) — and using the reduced shear-flow area \(A_0 = 0.85A_{oh}\) after cracking — gives Eq. 22.7.6.1a:</p>
$$T_n = \frac{2A_0A_tf_{yt}}{s}\cot\theta$$
<p>The inclined struts also push the wall ends apart; the horizontal component \(N_i = V_i\cot\theta\) summed around the perimeter \(p_h = 2(x_0 + y_0)\) must be taken by longitudinal bars:</p>
$$A_\ell = \frac{A_t}{s}\,p_h\,\frac{f_{yt}}{f_y}\cot^2\theta$$
<p>\(A_{oh}\) = area enclosed by the centreline of the outermost closed stirrups; \(p_h\) = its perimeter; \(A_t\) = area of <em>one leg</em> of a closed stirrup. ACI permits \(\theta = 45°\) for nonprestressed members (§22.7.6.1.2), so \(\cot\theta = 1\). For T- and L-beams the flanges may be counted only if they contain closed stirrups.</p>` },
        { title: 'Combined shear and torsion', html: String.raw`
<p>Shear stress from \(V\) acts down both side walls; torsional shear circulates. On one side wall they add, on the other they subtract. With \(A_0 = 0.85A_{oh}\) and \(t = A_{oh}/p_h\):</p>
$$\tau_v = \frac{V_u}{b_wd},\qquad \tau_t = \frac{T_up_h}{1.7A_{oh}^2}$$
<p>In a <strong>hollow</strong> section the stresses act in the same thin wall and add directly; in a <strong>solid</strong> section the shear spreads over the full width while torsion stays near the surface, so they are combined as a vector sum.</p>` }
      ]
    },
    {
      title: 'ACI 318-19 Design Procedure',
      subs: [
        { title: 'Strength, threshold and cross-section limit', html: String.raw`
<p>Design requirement: \(\phi T_n \ge T_u\) with \(\phi = 0.75\). Torsional effects may be neglected if \(T_u < \phi T_{th}\) (§9.5.4.1).</p>
<p>The section must be large enough to keep diagonal cracks narrow and prevent crushing of the struts (§22.7.7.1):</p>
$$\text{Solid: }\ \sqrt{\left(\frac{V_u}{b_wd}\right)^2 + \left(\frac{T_up_h}{1.7A_{oh}^2}\right)^2} \le \phi\left(\frac{V_c}{b_wd} + 0.66\sqrt{f'_c}\right)$$
$$\text{Hollow: }\ \frac{V_u}{b_wd} + \frac{T_up_h}{1.7A_{oh}^2} \le \phi\left(\frac{V_c}{b_wd} + 0.66\sqrt{f'_c}\right)$$
<p>\(V_c\) is from lesson 5 — with stirrups, \(0.17\lambda\sqrt{f'_c}\,b_wd\). If the wall thickness \(t\) of a hollow section is less than \(A_{oh}/p_h\), use \(T_u/(1.7A_{oh}t)\) for the torsion term. If the check fails, enlarge the section.</p>` },
        { title: 'Transverse reinforcement', html: String.raw`
$$\frac{A_t}{s} = \frac{T_u}{2\phi A_0f_{yt}\cot\theta},\qquad \frac{A_v}{s} = \frac{V_u/\phi - V_c}{f_{yt}d}$$
<p>Shear stirrups count all legs; torsion uses one leg on each face, so for ordinary two-leg closed stirrups:</p>
$$\frac{A_{v+t}}{s} = \frac{A_v}{s} + 2\frac{A_t}{s} \;\ge\; \max\left(0.062\sqrt{f'_c},\ 0.35\right)\frac{b_w}{f_{yt}}\quad(\S9.6.4.2)$$
<table class="tbl">
  <tbody>
    <tr><th>Stirrup type</th><td>Closed stirrups or hoops with 135° hooks (§25.7.1.6) — open U-stirrups do not resist torsion</td></tr>
    <tr><th>Maximum spacing</th><td>\(s \le \min(p_h/8,\ 300\text{ mm})\) (§9.7.6.3.3), and the shear limits of lesson 5</td></tr>
    <tr><th>Steel strength</th><td>\(f_y\), \(f_{yt} \le 420\) MPa for torsion (§22.7.2.2, Table 20.2.2.4(a))</td></tr>
    <tr><th>Extent</th><td>At least \(b_t + d\) beyond the point where torsion steel is no longer required (§9.7.6.3.2)</td></tr>
  </tbody>
</table>` },
        { title: 'Longitudinal reinforcement', html: String.raw`
$$A_\ell = \frac{A_t}{s}\,p_h\,\frac{f_{yt}}{f_y}\cot^2\theta$$
<p>Minimum (§9.6.4.3) — the <em>lesser</em> of:</p>
$$\text{(a) } \frac{0.42\sqrt{f'_c}A_{cp}}{f_y} - \frac{A_t}{s}p_h\frac{f_{yt}}{f_y}\qquad \text{(b) } \frac{0.42\sqrt{f'_c}A_{cp}}{f_y} - \frac{0.175b_w}{f_{yt}}p_h\frac{f_{yt}}{f_y}$$
<ul>
  <li>Distribute around the perimeter of the closed stirrups, inside them, at a spacing ≤ 300 mm, with at least one bar in each corner (§9.7.5.1).</li>
  <li>Bar diameter ≥ 0.042\(s\) and ≥ 10 mm (§9.7.5.2).</li>
  <li>Add the part placed in the flexural tension zone to the flexural steel \(A_s\); in the compression zone it may be reduced by \(M_u/(0.9df_y)\).</li>
  <li>Extend at least \(b_t + d\) beyond where it is required and develop it at the face of the supports (§9.7.5.3, 9.7.5.4).</li>
</ul>
<div class="note"><p><strong>Changes from the lecture slides (ACI 318-08):</strong> the cross-section limit uses \(0.66\sqrt{f'_c}\) (written ⅔ before); \(A_{\ell,min}\) is now the lesser of two expressions; the old note "\(A_t/s \ge 0.175b_w/f_{yt}\)" became expression (b). Shear zones follow lesson 5: minimum stirrups wherever \(V_u > \phi\,0.083\sqrt{f'_c}\,b_wd\), not \(0.5\phi V_c\).</p></div>` },
        { title: 'Torsion calculator', html: String.raw`
<p>Rectangular solid beam with two-leg closed stirrups, \(\theta = 45°\), normal-weight concrete. \(c\) is the distance from the concrete face to the stirrup centreline. Defaults are the worked example below.</p>
<div data-widget="torsion-design" data-title="Combined shear and torsion — rectangular beam"></div>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Data and section properties', html: String.raw`
<div class="ex">
  <div class="ex-head">Design the stirrups and longitudinal steel for Vu = 245 kN and Tu = 50 kN·m at d from the support face; bw = 400, h = 600, c = 50 mm, f'c = 25 MPa, fy = fyt = 400 MPa</div>
  <div class="ex-body">
    <p>Assume \(c\) = 50 mm to the stirrup centreline and \(d\) = 540 mm. Treat the torque as equilibrium torsion (no reduction).</p>
    <ol class="steps">
      <li>\(A_{cp} = 400 × 600 = 240\,000\) mm², \(p_{cp} = 2(400 + 600) = 2000\) mm, \(A_{cp}^2/p_{cp} = 28.8×10^6\) mm³.</li>
      <li>\(x_1 = 400 - 2(50) = 300\), \(y_1 = 600 - 2(50) = 500\) mm → \(A_{oh} = 150\,000\) mm², \(p_h = 2(300 + 500) = 1600\) mm, \(A_0 = 0.85A_{oh} = 127\,500\) mm².</li>
      <li>Threshold: \(\phi T_{th} = 0.75(0.083)(5)(28.8×10^6) = 8.96\) kN·m &lt; 50 → torsion must be designed for. (\(\phi T_{cr}\) = 35.6 kN·m — the value \(T_u\) could be reduced to if this were compatibility torsion.)</li>
    </ol>
  </div>
</div>` },
        { title: 'Cross-section check', html: String.raw`
<div class="ex">
  <div class="ex-head">Solid section, §22.7.7.1</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(V_c = 0.17\sqrt{25}(400)(540) = 183.6\) kN.</li>
      <li>\(\tau_v = 245\,000/(400 × 540) = 1.13\) MPa; \(\tau_t = 50×10^6(1600)/(1.7 × 150\,000^2) = 2.09\) MPa.</li>
      <li>\(\sqrt{1.13^2 + 2.09^2} = 2.38\) MPa ≤ \(0.75(183\,600/216\,000 + 0.66 × 5) = 3.11\) MPa ✓
        <span class="result">Section is large enough</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Closed stirrups', html: String.raw`
<div class="ex">
  <div class="ex-head">Shear + torsion, two-leg closed stirrups</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Shear: \(V_s = 245/0.75 - 183.6 = 143.1\) kN (≤ \(0.33\sqrt{f'_c}b_wd\) = 356 kN) → \(A_v/s = 143\,100/(400 × 540) = 0.662\) mm²/mm.</li>
      <li>Torsion: \(A_t/s = 50×10^6/(2 × 0.75 × 127\,500 × 400) = 0.654\) mm²/mm per leg.</li>
      <li>Combined: \(A_v/s + 2A_t/s = 0.662 + 1.307 = 1.970\) mm²/mm ≥ minimum \(0.35(400)/400 = 0.35\) ✓.</li>
      <li>DB12 closed stirrups (2 × 113.1 = 226.2 mm²): \(s = 226.2/1.970 = 115\) mm → <strong>110 mm</strong>. Limits: \(p_h/8 = 200\), 300, \(d/2 = 270\) ✓. (DB10 would need \(s\) = 80 mm.)
        <span class="result">DB12 closed stirrups @ 110 mm</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Longitudinal steel and detailing', html: String.raw`
<div class="ex">
  <div class="ex-head">Torsional longitudinal reinforcement</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(A_\ell = 0.654(1600)(400/400)(1) = 1046\) mm².</li>
      <li>\(A_{\ell,min}\) = lesser of (a) \(0.42(5)(240\,000)/400 - 1046 = 214\) and (b) \(1260 - 0.175(400/400)(1600) = 980\) → 214 mm²; \(A_\ell\) = 1046 mm² governs.</li>
      <li>Spacing ≤ 300 mm around the perimeter: corners plus one bar at mid-height of each 500 mm side. Share \(A_\ell\) by face: ¼ top, ¼ bottom, ½ on the sides:
        top 262 mm² → 2DB16 (402); sides 262 mm² each → 1DB20 each side (314); bottom 262 mm² added to the flexural steel.</li>
      <li>Bar diameter ≥ 0.042(110) = 4.6 mm and ≥ 10 mm ✓. Extend torsion steel \(b_t + d = 400 + 540 = 940\) mm beyond the point where \(T_u < \phi T_{th}\).
        <span class="result">Al = 1046 mm²: 2DB16 top, 1DB20 each side face, +262 mm² bottom</span></li>
    </ol>
    <figure class="fig">
      <svg viewBox="-30 0 330 300" role="img" aria-label="Beam section with torsion reinforcement" style="max-width:330px">
        <rect class="conc" x="70" y="20" width="160" height="240"/>
        <rect x="90" y="40" width="120" height="200" rx="8" class="thin" style="stroke:#e0565b;stroke-width:2.5"/>
        <path d="M202 40 l-12 14 M210 48 l-14 10" style="stroke:#e0565b;stroke-width:2.5;fill:none"/>
        <g fill="#e0565b"><circle cx="100" cy="50" r="6.4"/><circle cx="200" cy="50" r="6.4"/><circle cx="98" cy="140" r="8"/><circle cx="202" cy="140" r="8"/>
          <circle cx="100" cy="230" r="8"/><circle cx="150" cy="230" r="8"/><circle cx="200" cy="230" r="8"/></g>
        <path class="thin" d="M70 282 h160 M70 276 v12 M230 276 v12 M252 20 v240 M246 20 h12 M246 260 h12"/>
        <text x="138" y="298">400</text><text x="258" y="146">600</text>
        <text x="236" y="54" class="m">2DB16</text><text x="236" y="120" class="m">DB20</text><text x="-26" y="236" class="m">flexure</text><text x="-26" y="250" class="m">+262 mm²</text>
        <text x="-26" y="100" class="m">DB12</text><text x="-26" y="114" class="m">@110</text><path class="thin" d="M12 108 L90 120"/>
      </svg>
      <figcaption>Figure 2 — Closed DB12 stirrups with 135° hooks; longitudinal torsion bars in every corner and at mid-height of the side faces.</figcaption>
    </figure>
  </div>
</div>` },
        { title: 'Design checklist', html: String.raw`
<ul class="check">
  <li>Decide equilibrium or compatibility torsion; reduce \(T_u\) to \(\phi T_{cr}\) only for compatibility torsion.</li>
  <li>Neglect torsion only if \(T_u < \phi T_{th}\).</li>
  <li>Cross-section check for combined \(V_u\) and \(T_u\) — enlarge the beam if it fails.</li>
  <li>Closed stirrups with 135° hooks: \(A_v/s + 2A_t/s\) ≥ minimum, \(s \le p_h/8\) and 300 mm.</li>
  <li>\(A_\ell\) around the perimeter, corner bars, spacing ≤ 300 mm, \(d_b \ge 0.042s\) and 10 mm; add to flexural steel.</li>
  <li>Extend torsion steel \(b_t + d\) beyond the theoretical cut-off and develop it at the supports.</li>
</ul>` }
      ]
    }
  ]
});
