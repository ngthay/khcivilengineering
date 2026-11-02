/* Lesson 12 — Two-way slabs */
KCE_COURSE.lessons.push({
  id: 'two-way-slab',
  num: 12,
  title: 'Two-Way Slabs',
  desc: 'Slabs on beams and flat plates: thickness, Direct Design Method, column/middle strips, punching shear and the coefficient method.',
  icon: '▦',
  color: 'mint',
  meta: ['ACI 318M-19 Ch.8, §22.6', 'Slabs', 'DDM'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>When a panel is supported on all four sides and \(L/S \le 2\), it bends in both directions and load is shared between the two spans — a <strong>two-way slab</strong>. Types: slab on beams, flat plate (no beams, no drops), flat slab (drop panels and/or column capitals) and waffle slab.</p>` },
        { title: 'Description', html: String.raw`
<p>ACI 318-19 §8.2.1 allows any analysis that satisfies equilibrium and compatibility, and names the Direct Design Method and the Equivalent Frame Method as acceptable. Both treat the floor as a series of <strong>equivalent frames</strong> in each direction. Each frame is a column line with a slab strip of width equal to the panel width \(\ell_2\). The total static moment of each span is distributed to negative and positive sections, and then across the width to the <strong>column strip</strong> (width ¼ of the smaller span on each side of the column line) and the <strong>middle strips</strong>.</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Thickness \(h\) from ACI 318-19 Tables 8.3.1.1 / 8.3.1.2 (with beam stiffness \(\alpha_{fm}\)).</li>
  <li>Check DDM limits; compute \(M_0 = w_u\ell_2\ell_n^2/8\).</li>
  <li>Longitudinal distribution (negative / positive).</li>
  <li>Transverse distribution to column strip, beam and middle strip.</li>
  <li>Steel per metre of strip; check \(A_{s,min} = 0.0018A_g\) and \(s \le 2h\) at critical sections.</li>
  <li>Shear: one-way (beams) and punching (flat plates).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 640 260" role="img" aria-label="Column and middle strips">
    <rect class="conc" x="60" y="30" width="520" height="200"/>
    <rect class="comp" x="60" y="30" width="520" height="50"/><rect class="comp" x="60" y="180" width="520" height="50"/>
    <g class="accf"><rect x="52" y="22" width="16" height="16"/><rect x="572" y="22" width="16" height="16"/><rect x="52" y="222" width="16" height="16"/><rect x="572" y="222" width="16" height="16"/></g>
    <text x="250" y="60" class="a">column strip</text><text x="250" y="135">middle strip</text><text x="250" y="210" class="a">column strip</text>
    <line class="dim" x1="60" y1="248" x2="580" y2="248"/><text x="300" y="244" class="m">ℓ1</text>
    <line class="dim" x1="598" y1="30" x2="598" y2="230"/><text x="604" y="135" class="m">ℓ2</text>
    <text x="590" y="58" class="m">ℓ2/4</text>
  </svg>
  <figcaption>Figure 1 — Panel divided into column strips (each side of the column line, width = ¼ of the shorter span) and a middle strip.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Minimum thickness', html: String.raw`
<p>Relative beam stiffness \(\alpha_f = E_{cb}I_b/(E_{cs}I_s)\), averaged over the four edges as \(\alpha_{fm}\). ACI 318-19 §8.3.1.1 and Table 8.3.1.2:</p>
<table class="tbl">
  <tbody>
    <tr><td>\(\alpha_{fm} \le 0.2\)</td><td>Table 8.3.1.1 (no interior beams): \(\ell_n/30\) exterior panel without edge beams, \(\ell_n/33\) interior panel (\(f_y\) = 420); ≥ 125 mm without drop panels, ≥ 100 mm with drop panels</td></tr>
    <tr><td>\(0.2 < \alpha_{fm} \le 2.0\)</td><td>\(h = \dfrac{\ell_n(0.8 + f_y/1400)}{36 + 5\beta(\alpha_{fm} - 0.2)}\) ≥ 125 mm</td></tr>
    <tr><td>\(\alpha_{fm} > 2.0\)</td><td>\(h = \dfrac{\ell_n(0.8 + f_y/1400)}{36 + 9\beta}\) ≥ 90 mm</td></tr>
  </tbody>
</table>
<p>\(\beta\) = long / short clear span; \(\ell_n\) = clear span in the long direction. The beam section includes the slab on each side equal to its projection above or below the slab, whichever is greater, but not more than 4\(h_f\) (§8.4.1.8). At discontinuous edges, provide an edge beam with \(\alpha_f \ge 0.80\) or increase \(h\) by 10 % (§8.3.1.2.1).</p>` },
        { title: 'Direct Design Method', html: String.raw`
<div class="note"><p>ACI 318-19 no longer prints the DDM coefficients (they were removed after ACI 318-14 §8.10), but §6.2.4.1 and §8.2.1 still permit the method. The values below are the ACI 318-14 coefficients.</p></div>
<p><strong>Limits:</strong> at least 3 spans each way; panels rectangular with \(\ell_{long}/\ell_{short} \le 2\); successive spans differ by ≤ ⅓; column offset ≤ 10 %; gravity load only with \(L \le 2D\); for beams \(0.2 \le \alpha_1\ell_2^2/(\alpha_2\ell_1^2) \le 5\).</p>
$$M_0 = \frac{w_u\,\ell_2\,\ell_n^2}{8},\qquad \ell_n \ge 0.65\ell_1$$
<p>Interior span: \(M^- = 0.65M_0\), \(M^+ = 0.35M_0\). End spans use the ACI 318-14 Table 8.10.4.2 (e.g. slab with beams between all supports: exterior −0.16, positive 0.57, interior −0.70).</p>
<table class="tbl num">
  <thead><tr><th>Column-strip share</th><th>\(\ell_2/\ell_1\) = 0.5</th><th>1.0</th><th>2.0</th></tr></thead>
  <tbody>
    <tr><td>Interior negative, \(\alpha_1\ell_2/\ell_1 = 0\)</td><td>75 %</td><td>75 %</td><td>75 %</td></tr>
    <tr><td>Interior negative, \(\alpha_1\ell_2/\ell_1 \ge 1\)</td><td>90 %</td><td>75 %</td><td>45 %</td></tr>
    <tr><td>Positive, \(\alpha_1\ell_2/\ell_1 = 0\)</td><td>60 %</td><td>60 %</td><td>60 %</td></tr>
    <tr><td>Positive, \(\alpha_1\ell_2/\ell_1 \ge 1\)</td><td>90 %</td><td>75 %</td><td>45 %</td></tr>
  </tbody>
</table>
<p>When \(\alpha_1\ell_2/\ell_1 \ge 1\), the beam takes 85 % of the column-strip moment; the rest goes to the slab part of the column strip. The middle strip takes what the column strip does not.</p>` },
        { title: 'Punching shear', html: String.raw`
<p>Critical perimeter \(b_0\) at \(d/2\) from the column face (§22.6.4.1). ACI 318-19 Table 22.6.5.2:</p>
$$v_c = \min\left\{0.33\lambda_s,\ 0.17\left(1 + \frac{2}{\beta}\right)\lambda_s,\ 0.083\left(2 + \frac{\alpha_s d}{b_0}\right)\lambda_s\right\}\lambda\sqrt{f'_c},\qquad V_c = v_cb_0d$$
<p>\(\beta\) = long/short side of the column; \(\alpha_s\) = 40 interior, 30 edge, 20 corner columns; \(\lambda_s = \sqrt{2/(1 + 0.004d)} \le 1\) is the size-effect factor (new in 318-19 — it reduces punching strength of slabs thicker than about 280 mm). If \(v_{uv} > \phi\,0.17\lambda_s\lambda\sqrt{f'_c}\) at a column, §8.6.1.2 adds a larger top-steel minimum over that column.</p>` },
        { title: 'Coefficient method (ACI 318-63 Method 3)', html: String.raw`
<p>For slabs supported on stiff beams or walls, many offices still use the older coefficient tables: \(M_a = C_a w\ell_a^2\), \(M_b = C_b w\ell_b^2\) with \(m = \ell_a/\ell_b\) (short/long). Negative moments use the total load; positive moments are computed separately for dead and live load.</p>
<div class="tbl-wrap"><table class="tbl num">
  <thead>
    <tr><th rowspan="2">m</th><th colspan="2">Negative — Case 2 (all edges continuous)</th><th colspan="2">Positive — Case 1 (all edges discontinuous)</th></tr>
    <tr><th>\(C_{a,neg}\)</th><th>\(C_{b,neg}\)</th><th>\(C_a\)</th><th>\(C_b\)</th></tr>
  </thead>
  <tbody>
    <tr><td>1.00</td><td>0.045</td><td>0.045</td><td>0.036</td><td>0.036</td></tr>
    <tr><td>0.90</td><td>0.055</td><td>0.037</td><td>0.045</td><td>0.029</td></tr>
    <tr><td>0.80</td><td>0.065</td><td>0.027</td><td>0.056</td><td>0.023</td></tr>
    <tr><td>0.70</td><td>0.074</td><td>0.017</td><td>0.068</td><td>0.016</td></tr>
    <tr><td>0.60</td><td>0.081</td><td>0.010</td><td>0.081</td><td>0.010</td></tr>
    <tr><td>0.50</td><td>0.086</td><td>0.006</td><td>0.095</td><td>0.006</td></tr>
  </tbody>
</table></div>
<div class="note"><p>Abridged table. Cases 3 – 9 (different combinations of continuous and discontinuous edges) and the load-distribution ratios \(w_a/w_b\) are given in the full ACI 318-63 tables in the lecture notes. At discontinuous edges use ⅓ of the positive moment as negative moment.</p></div>` }
      ]
    },
    {
      title: 'Worked Example — DDM',
      subs: [
        { title: 'Data, beam stiffness and thickness', html: String.raw`
<div class="ex">
  <div class="ex-head">Interior panel 7 m × 6 m, columns 500 × 500, beams 400 × 550 (total depth), h = 160, LL = 4.8 kPa, finishes 1.1 kPa, f'c = 20, fy = 420</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Beam flange: 400 + 2(550 − 160) = 1180 mm (≤ 400 + 8h = 1680). Centroid \(\bar y\) = 204 mm from top, \(I_b = 8.84×10^9\) mm⁴.</li>
      <li>Long-direction beams (slab width 6 m): \(I_s = 6000(160^3)/12 = 2.05×10^9\) → \(\alpha = 4.32\). Short-direction beams (slab width 7 m) → \(\alpha = 3.70\). \(\alpha_{fm} = 4.01\).</li>
      <li>\(\ell_n\) = 7.0 − 0.5 = 6.5 m, \(\beta = 6.5/5.5 = 1.18\). \(\alpha_{fm} > 2\): \(h = \frac{6500(0.8 + 420/1400)}{36 + 9(1.18)} = 153.4\) mm → <strong>h = 160 mm</strong> ✓.</li>
      <li>\(w_u = 1.2(0.16 × 24 + 1.1) + 1.6(4.8) = 13.61\) kPa.</li>
      <li>Slab one-way shear at \(d\) from the long beams (tributary trapezoid) \(V_u\) = 36.3 kN/m. No stirrups, so Table 22.5.5.1(c) applies with the short-direction top steel DB12 @ 250 (\(\rho_w = 452/(1000 × 118) = 0.00383\)), \(d\) = 118 mm, \(\lambda_s\) = 1:
        \(\phi V_c = 0.75(0.66)(0.00383)^{1/3}\sqrt{20}(1000)(118)/10^3 = 40.9\) kN/m ≥ 36.3 ✓ (ACI 318-08 gave 72.7 kN/m).</li>
    </ol>
  </div>
</div>` },
        { title: 'Static moments and distribution', html: String.raw`
<p>Long direction (\(\ell_1 = 7,\ \ell_2 = 6\)): \(M_0 = 13.61(6)(6.5^2)/8 = 431.3\) kN·m → \(M^- = 280.3\), \(M^+ = 150.9\). \(\ell_2/\ell_1 = 0.857\), \(\alpha_1\ell_2/\ell_1 > 1\) → column strip 79.2 %.</p>
<p>Short direction (\(\ell_1 = 6,\ \ell_2 = 7\)): \(M_0 = 13.61(7)(5.5^2)/8 = 360.2\) kN·m → \(M^- = 234.2\), \(M^+ = 126.1\). \(\ell_2/\ell_1 = 1.167\) → column strip 70.0 %.</p>
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>Direction / moment</th><th>Total</th><th>Beam (85 % of CS)</th><th>Slab part of CS</th><th>Middle strip</th></tr></thead>
  <tbody>
    <tr><td>Long, negative</td><td>280.3</td><td>188.7</td><td>33.3</td><td>58.3</td></tr>
    <tr><td>Long, positive</td><td>150.9</td><td>101.6</td><td>17.9</td><td>31.4</td></tr>
    <tr><td>Short, negative</td><td>234.2</td><td>139.3</td><td>24.6</td><td>70.3</td></tr>
    <tr><td>Short, positive</td><td>126.1</td><td>75.0</td><td>13.2</td><td>37.8</td></tr>
  </tbody>
</table></div>` },
        { title: 'Slab reinforcement', html: String.raw`
<p>Column strip width 3.0 m (slab part 2.6 m after the 0.4 m beam web); middle strip 3.0 m (long direction) and 4.0 m (short direction). Effective depths: long 130 mm, short 118 mm. \(A_{s,min} = 0.0018(1000)(160) = 288\) mm²/m (§8.6.1.1); \(s_{max} = 2h = 320\) mm at critical sections, \(3h\) elsewhere (§8.7.2.2).</p>
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>Strip</th><th>\(M_u\) (kN·m/m)</th><th>\(A_s\) (mm²/m)</th><th>Bars</th></tr></thead>
  <tbody>
    <tr><td>Long CS, negative</td><td>12.81</td><td>288 (min)</td><td>DB10 @ 250</td></tr>
    <tr><td>Long CS, positive</td><td>6.88</td><td>288 (min)</td><td>DB10 @ 250</td></tr>
    <tr><td>Long MS, negative</td><td>19.44</td><td>412</td><td>DB12 @ 250</td></tr>
    <tr><td>Long MS, positive</td><td>10.47</td><td>288 (min)</td><td>DB10 @ 250</td></tr>
    <tr><td>Short CS, negative</td><td>9.46</td><td>288 (min)</td><td>DB10 @ 250</td></tr>
    <tr><td>Short CS, positive</td><td>5.08</td><td>288 (min)</td><td>DB10 @ 250</td></tr>
    <tr><td>Short MS, negative</td><td>17.57</td><td>412</td><td>DB12 @ 250</td></tr>
    <tr><td>Short MS, positive</td><td>9.45</td><td>288 (min)</td><td>DB10 @ 250</td></tr>
  </tbody>
</table></div>
<p>The beams are then designed as T-beams (lesson 4) for 188.7 / 101.6 kN·m (long) and 139.3 / 75.0 kN·m (short), plus their own self-weight.</p>` },
        { title: 'Design checklist', html: String.raw`
<ul class="check">
  <li>\(L/S \le 2\) → two-way; check DDM limits or use the Equivalent Frame Method.</li>
  <li>Thickness from \(\alpha_{fm}\) and \(\beta\); ≥ 125 mm (flat plates) / 90 mm (stiff beams).</li>
  <li>Distribute \(M_0\) longitudinally, then to column strip, beam and middle strip.</li>
  <li>Steel ≥ 0.0018\(bh\), spacing ≤ 2h at critical sections; corner reinforcement at exterior corners (§8.7.3).</li>
  <li>Flat plates: punching shear at \(d/2\) with the size-effect factor \(\lambda_s\) is usually the governing check.</li>
  <li>One-way shear in slabs uses the no-stirrup \(V_c\) of Table 22.5.5.1(c).</li>
</ul>` }
      ]
    }
  ]
});
