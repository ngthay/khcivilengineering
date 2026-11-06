/* Lesson 2 — Variables, numbers, strings and units */
KCE_COURSE.lessons.push({
  id: 'basics',
  num: 2,
  title: 'Variables, Numbers, Strings and Units',
  desc: 'Variables and data types, arithmetic operators, the math module, rounding up with ceil and floor division, formatted output with f-strings, and a safe way to handle units — with rebar and slab quantity examples.',
  icon: '🔢',
  color: 'mint',
  meta: ['int · float · str · bool', 'f-strings', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>variable</strong> is a name that stores a value: <code>fc = 30</code>. The name goes on the left of <code>=</code>, the value on the right. Names may contain letters, digits and <code>_</code>, must not start with a digit, and are case-sensitive (<code>As</code> and <code>as_</code> are different; <code>as</code> alone is a reserved word).</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Type</th><th>Example</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td><code>int</code></td><td><code>n_bars = 4</code></td><td>Counts: bars, stories, stirrups</td></tr>
    <tr><td><code>float</code></td><td><code>fc = 30.0</code>, <code>E = 2e5</code></td><td>Measured quantities</td></tr>
    <tr><td><code>str</code></td><td><code>grade = "C30/37"</code></td><td>Names, labels, messages</td></tr>
    <tr><td><code>bool</code></td><td><code>ok = M_u &lt;= phi_Mn</code></td><td>Results of checks: <code>True</code> / <code>False</code></td></tr>
  </tbody>
</table></div>` },
        { title: 'Operators', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr></thead>
  <tbody>
    <tr><td><code>+ - * /</code></td><td>Add, subtract, multiply, divide</td><td><code>7 / 2</code></td><td>3.5</td></tr>
    <tr><td><code>**</code></td><td>Power</td><td><code>0.5**3</code></td><td>0.125</td></tr>
    <tr><td><code>//</code></td><td>Floor division (whole part)</td><td><code>5.6 // 0.15</code></td><td>37.0</td></tr>
    <tr><td><code>%</code></td><td>Remainder</td><td><code>17 % 5</code></td><td>2</td></tr>
    <tr><td><code>== != &lt; &lt;= &gt; &gt;=</code></td><td>Comparisons, give a bool</td><td><code>4.5 &lt;= 24</code></td><td>True</td></tr>
    <tr><td><code>and or not</code></td><td>Combine conditions</td><td><code>ok1 and ok2</code></td><td>True / False</td></tr>
  </tbody>
</table></div>
<p>Python follows the usual order: powers, then × and ÷, then + and −. Use brackets when in doubt: <code>w * L**2 / 8</code> is \(wL^2/8\).</p>` }
      ]
    },
    {
      title: 'Code',
      subs: [
        { title: 'The math module', html: String.raw`
<p>Functions such as √, sin and π are in the <code>math</code> module, loaded with <code>import math</code>:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Function</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><code>math.pi</code>, <code>math.e</code></td><td>π, e</td></tr>
    <tr><td><code>math.sqrt(x)</code></td><td>√x</td></tr>
    <tr><td><code>math.sin(x)</code>, <code>math.cos(x)</code>, <code>math.tan(x)</code></td><td>Angle in <strong>radians</strong>; use <code>math.radians(30)</code> for degrees</td></tr>
    <tr><td><code>math.log(x)</code>, <code>math.log10(x)</code></td><td>ln x, log₁₀ x</td></tr>
    <tr><td><code>math.ceil(x)</code>, <code>math.floor(x)</code></td><td>Round up / down to a whole number</td></tr>
  </tbody>
</table></div>
${kcePy(String.raw`
import math

d = 16                          # bar diameter, mm
n = 4                           # number of bars
area_one = math.pi * d**2 / 4   # mm²
As = n * area_one
mass = As * 1e-6 * 7850         # kg/m  (mm² -> m², times steel density)

print(f"One bar : {area_one:.1f} mm²")
print(f"{n} bars : {As:.0f} mm²")
print(f"Mass    : {mass:.2f} kg/m")
`, 'rebar.py')}
${kceOut(String.raw`
One bar : 201.1 mm²
4 bars : 804 mm²
Mass    : 6.31 kg/m
`)}` },
        { title: 'Formatted output with f-strings', html: String.raw`
<p>Put <code>f</code> before a string and write variables in braces. After a colon you give the format:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Format</th><th>Example</th><th>Prints</th></tr></thead>
  <tbody>
    <tr><td><code>:.2f</code> — 2 decimals</td><td><code>f"{4.4999:.2f}"</code></td><td>4.50</td></tr>
    <tr><td><code>:,.0f</code> — thousands separator</td><td><code>f"{1250000:,.0f}"</code></td><td>1,250,000</td></tr>
    <tr><td><code>:.3e</code> — scientific</td><td><code>f"{0.003125:.3e}"</code></td><td>3.125e-03</td></tr>
    <tr><td><code>:.1%</code> — percent</td><td><code>f"{0.873:.1%}"</code></td><td>87.3%</td></tr>
    <tr><td><code>:8.1f</code> — width 8, for columns</td><td><code>f"{12.5:8.1f}"</code></td><td>"    12.5"</td></tr>
  </tbody>
</table></div>` },
        { title: 'Working safely with units', html: String.raw`
<p>Python numbers have no units, so mistakes such as adding mm to m are not detected. Three habits prevent them:</p>
<ol>
  <li>Pick one system per script — for example <strong>N, mm, MPa</strong> (1 MPa = 1 N/mm²) for sections, or <strong>kN, m, kPa</strong> for frames — and write it at the top.</li>
  <li>Put the unit in the comment or the name: <code>L_m = 6.0</code>, <code>As_mm2 = 804</code>.</li>
  <li>Convert in one visible place: <code>M_Nmm = M_kNm * 1e6</code>.</li>
</ol>
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>Quantity</th><th>N–mm</th><th>kN–m</th></tr></thead>
  <tbody>
    <tr><td>Stress</td><td>1 MPa = 1 N/mm²</td><td>1000 kPa = 1000 kN/m²</td></tr>
    <tr><td>Moment</td><td>1 N·mm</td><td>10⁻⁶ kN·m</td></tr>
    <tr><td>E of steel</td><td>200 000 MPa</td><td>200 × 10⁶ kN/m²</td></tr>
    <tr><td>Area</td><td>1 mm²</td><td>10⁻⁶ m²</td></tr>
  </tbody>
</table></div>
<div class="note">The package <code>pint</code> (<code>pip install pint</code>) can attach real units to numbers and raises an error when you add incompatible ones — useful for larger tools.</div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Slab concrete order and stirrup count', html: String.raw`
${kcePy(String.raw`
import math

# Slab 8.4 m x 6.0 m x 0.18 m
length, width, t = 8.4, 6.0, 0.18
volume = length * width * t                  # m³
waste = 0.05
order = math.ceil(volume * (1 + waste) * 2) / 2   # round up to 0.5 m³
price = 95.0                                 # $ per m³

# Stirrups at 150 mm along a 5.6 m beam
spacing = 0.150
n_stirrups = int(5.6 // spacing) + 1

print(f"Volume       = {volume:.3f} m³")
print(f"Order        = {order} m³  (cost ${'$'}{order * price:,.2f})")
print(f"Stirrups     = {n_stirrups}")
print(type(volume), type(n_stirrups), type("C30"), type(order > 10))
`, 'quantities.py')}
${kceOut(String.raw`
Volume       = 9.072 m³
Order        = 10.0 m³  (cost $950.00)
Stirrups     = 38
<class 'float'> <class 'int'> <class 'str'> <class 'bool'>
`)}
<ol class="steps">
  <li>Volume 8.4 × 6.0 × 0.18 = 9.072 m³; with 5 % waste 9.53 m³.</li>
  <li><code>math.ceil(9.53 × 2) / 2</code> = ceil(19.05)/2 = 20/2 = 10.0 m³ — rounding up to the next half cubic metre.</li>
  <li>Stirrups: 5.6 // 0.15 = 37 full spaces, so 37 + 1 = 38 stirrups.</li>
</ol>
<p class="result">Order 10.0 m³ of concrete ($950) and 38 stirrups.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Name variables after the engineering symbol and keep units in comments.</li>
  <li>Use <code>math.ceil</code> when quantities must be rounded up (bars, bags, trucks).</li>
  <li>Angles for <code>math.sin</code> / <code>cos</code> are in radians.</li>
  <li>Format every printed result with an f-string.</li>
</ul>` }
      ]
    }
  ]
});
