/* Lesson 6 — Web shear capacity and stiffeners (Handbook Ch. 5 §5.8–5.11) */
KCE_COURSE.lessons.push({
  id: 'web-shear',
  num: 6,
  title: 'Web Shear, Bearing and Stiffeners',
  desc: 'Shear yield and shear buckling of webs, interaction of shear and bending, bearing yield and bearing buckling under concentrated loads, load-bearing and intermediate stiffeners, composite beams and serviceability.',
  icon: '🧩',
  color: 'lilac',
  meta: ['Ch. 5 §5.8', 'V_w = 0.6f_yA_w', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The web of an I-beam carries most of the shear. A stocky web <strong>yields in shear</strong>; a slender web <strong>buckles</strong> first. Under concentrated loads and reactions the web can also crush (<strong>bearing yield</strong>) or buckle as a column (<strong>bearing buckling</strong>). Stiffeners prevent these failures.</p>` },
        { title: 'Description', html: String.raw`
$$V_w = 0.6f_yA_w\quad\text{if }\frac{d_p}{t_w}\sqrt{\frac{f_y}{250}} \le 82,\qquad V_b = \alpha_vV_w,\ \ \alpha_v = \left[\frac{82}{(d_p/t_w)\sqrt{f_y/250}}\right]^2 \le 1$$
<p>\(A_w = d\,t_w\) for hot-rolled sections. Combined shear and bending (\(M^* &gt; 0.75\varphi M_s\)): \(V_{vm} = \alpha_{vm}V_v\), \(\alpha_{vm} = 2.2 - \dfrac{1.6M^*}{\varphi M_s}\).</p>
<p>Bearing yield: \(R_{by} = 1.25b_{bf}t_wf_y\) (stiff bearing length dispersed 1:2.5 through the flange); bearing buckling: \(R_{bb} = \alpha_cA_wf_y\) with the web as a column of slenderness \(2.5d_1/t_w\).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Compute web slenderness; get \(V_v = V_w\) or \(V_b\); check \(V^* \le \varphi V_v\) (φ = 0.9).</li>
  <li>Where \(M^*\) is high at the same section, reduce with \(\alpha_{vm}\).</li>
  <li>At supports and point loads check bearing yield and bearing buckling; if not satisfied, add load-bearing stiffeners.</li>
  <li>For slender plate girders, add intermediate transverse stiffeners to raise \(\alpha_v\) (tension field action).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 220" role="img" aria-label="Web with stiffeners">
    <rect class="conc" x="40" y="40" width="440" height="12"/><rect class="conc" x="40" y="168" width="440" height="12"/>
    <rect class="comp" x="40" y="52" width="440" height="116"/>
    <path class="ln" d="M60 52 V168 M180 52 V168 M300 52 V168 M420 52 V168"/>
    <path class="dim" d="M180 168 L300 52 M300 168 L420 52"/>
    <path class="acc" d="M60 220 V184"/><polygon class="accf" points="60,182 55,192 65,192"/><text x="68" y="212">R*</text>
    <text x="70" y="34" class="m">load-bearing stiffener</text><text x="230" y="34" class="m">intermediate stiffeners · tension field</text>
  </svg>
  <figcaption>Figure 1 — Plate girder web with load-bearing and intermediate stiffeners.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Composite beams and serviceability', html: String.raw`
<ul>
  <li><strong>Composite beams:</strong> shear connectors (studs) make the concrete slab act as a compression flange, raising strength and stiffness considerably (AS 2327).</li>
  <li><strong>Deflection:</strong> typical limits span/250 under total load, span/360 – 500 under live load where brittle finishes are present; cantilevers span/125.</li>
  <li><strong>Vibration:</strong> floors with natural frequency below about 5 Hz may be lively under footfall — check for long spans.</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Shear at a plastic hinge — 360UB44.7 (Example 9.1)', html: String.raw`
<div class="ex">
  <div class="ex-head">In Handbook Example 9.1 a fixed-ended 360UB44.7 Grade 300 (\(d = 352\) mm, \(t_w = 6.9\) mm, \(f_{yw} = 320\) MPa, \(\varphi M_s = 222\) kN·m) carries \(V^* = 300\) kN at a support where \(M^* = 225\) kN·m. Check the web.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(\varphi V_w = 0.9(0.6)(320)(352)(6.9)/10^3 = 420\) kN — the web is stocky, so \(V_v = V_w\).</li>
      <li>\(V^* = 300 &gt; 0.6\varphi V_v = 252\) kN and \(M^* \approx \varphi M_s\) → interaction: \(\varphi V_{vm} = \left(2.2 - \tfrac{1.6(225)}{222}\right)420 = 243\) kN.</li>
      <li>\(300 &gt; 243\) kN ✗.
        <span class="result">Web stiffeners (or a doubler plate) are needed at the plastic-hinge supports</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Check shear at the supports and at the faces of large point loads.</li>
  <li>High moment and high shear at the same section interact.</li>
  <li>Unstiffened webs under heavy reactions: check both bearing yield and bearing buckling.</li>
</ul>` }
      ]
    }
  ]
});
