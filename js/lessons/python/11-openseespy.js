/* Lesson 11 — OpenSeesPy: finite element analysis from Python */
KCE_COURSE.lessons.push({
  id: 'openseespy',
  num: 11,
  title: 'OpenSeesPy — Truss, Frame and Modal Analysis',
  desc: 'The structure of an OpenSees model (nodes, supports, materials, elements, loads, analysis), a truss bar, a cantilever column, the portal frame of Lesson 9, and the natural frequencies of a shear building — each checked against hand or earlier results.',
  icon: '🧱',
  color: 'peach',
  meta: ['OpenSeesPy', 'Static · eigen', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>OpenSees</strong> (Open System for Earthquake Engineering Simulation, UC Berkeley / PEER) is a free finite element program widely used in earthquake engineering research and practice for non-linear and dynamic analysis. <strong>OpenSeesPy</strong> runs it as a Python package, so a model is an ordinary script: <code>pip install openseespy</code>.</p>
<p>Every model follows the same order:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Step</th><th>Commands</th></tr></thead>
  <tbody>
    <tr><td>1. Start</td><td><code>ops.wipe()</code>, <code>ops.model("basic", "-ndm", 2, "-ndf", 3)</code> — 2 dimensions, 3 DOFs per node</td></tr>
    <tr><td>2. Geometry</td><td><code>ops.node(tag, x, y)</code>, <code>ops.fix(tag, 1, 1, 1)</code>, <code>ops.mass(...)</code></td></tr>
    <tr><td>3. Materials / sections</td><td><code>ops.uniaxialMaterial("Elastic", 1, E)</code>, <code>"Steel02"</code>, <code>"Concrete02"</code></td></tr>
    <tr><td>4. Elements</td><td><code>"Truss"</code>, <code>"elasticBeamColumn"</code>, <code>"forceBeamColumn"</code>, <code>"zeroLength"</code></td></tr>
    <tr><td>5. Loads</td><td><code>ops.timeSeries</code>, <code>ops.pattern("Plain", ...)</code>, <code>ops.load(node, Fx, Fy, M)</code></td></tr>
    <tr><td>6. Analysis</td><td><code>system</code>, <code>numberer</code>, <code>constraints</code>, <code>integrator</code>, <code>algorithm</code>, <code>analysis</code>, then <code>ops.analyze(n)</code></td></tr>
    <tr><td>7. Results</td><td><code>ops.nodeDisp</code>, <code>ops.reactions()</code> + <code>ops.nodeReaction</code>, <code>ops.eleForce</code>, <code>ops.eigen</code></td></tr>
  </tbody>
</table></div>
<div class="note">OpenSees has no units. Choose a consistent set (N, m, Pa or kN, m, kPa) and use it for every input.</div>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'A truss bar', html: String.raw`
<p>A steel bar 1 m long, A = 0.01 m², E = 200 GPa, pulled by 10 kN:</p>
${kcePy(String.raw`
import openseespy.opensees as ops

ops.wipe()
ops.model("basic", "-ndm", 2, "-ndf", 2)
ops.node(1, 0.0, 0.0); ops.node(2, 1.0, 0.0)
ops.fix(1, 1, 1); ops.fix(2, 0, 1)             # node 2 may only move along the bar
E, A, P = 200.0e9, 0.01, 10000.0              # Pa, m², N
ops.uniaxialMaterial("Elastic", 1, E)
ops.element("Truss", 1, 1, 2, A, 1)
ops.timeSeries("Linear", 1); ops.pattern("Plain", 1, 1)
ops.load(2, P, 0.0)
ops.system("BandSPD"); ops.numberer("RCM"); ops.constraints("Plain")
ops.integrator("LoadControl", 1.0); ops.algorithm("Linear"); ops.analysis("Static")
ops.analyze(1)
print(f"u = {ops.nodeDisp(2, 1)*1000:.4f} mm,  PL/EA = {P * 1.0 / (E * A)*1000:.4f} mm")
`, 'truss.py')}
${kceOut(String.raw`
u = 0.0050 mm,  PL/EA = 0.0050 mm
`)}` },
        { title: 'Cantilever column', html: String.raw`
${kcePy(String.raw`
import openseespy.opensees as ops

# Cantilever column: IPE 300 about the strong axis, 3 m high, 10 kN at the top
E, A, I = 200e9, 53.81e-4, 8356e-8          # Pa, m², m⁴
H, P = 3.0, 10e3                             # m, N

ops.wipe()
ops.model("basic", "-ndm", 2, "-ndf", 3)
ops.node(1, 0.0, 0.0)
ops.node(2, 0.0, H)
ops.fix(1, 1, 1, 1)
ops.geomTransf("Linear", 1)
ops.element("elasticBeamColumn", 1, 1, 2, A, E, I, 1)

ops.timeSeries("Linear", 1)
ops.pattern("Plain", 1, 1)
ops.load(2, P, 0.0, 0.0)

ops.system("BandGeneral"); ops.numberer("RCM"); ops.constraints("Plain")
ops.integrator("LoadControl", 1.0); ops.algorithm("Linear"); ops.analysis("Static")
ops.analyze(1)

ux = ops.nodeDisp(2, 1)
ops.reactions()
print(f"Top displacement = {ux*1000:.3f} mm,  PH³/3EI = {P*H**3/(3*E*I)*1000:.3f} mm")
print(f"Base moment = {ops.nodeReaction(1, 3)/1e3:.1f} kN.m")
`, 'cantilever.py')}
${kceOut(String.raw`
Top displacement = 5.385 mm,  PH³/3EI = 5.385 mm
Base moment = 30.0 kN.m
`)}
<p>The base moment is P × H = 10 × 3 = 30 kN·m. Call <code>ops.reactions()</code> before reading reactions, otherwise they are zero.</p>` },
        { title: 'The portal frame of Lesson 9', html: String.raw`
${kcePy(String.raw`
import openseespy.opensees as ops

# Portal frame of Lesson 9 (kN, m): 4 m high, 6 m wide, fixed bases
E = 30e6
ops.wipe()
ops.model("basic", "-ndm", 2, "-ndf", 3)
for tag, x, y in [(1, 0, 0), (2, 0, 4), (3, 6, 4), (4, 6, 0)]:
    ops.node(tag, x, y)
ops.fix(1, 1, 1, 1); ops.fix(4, 1, 1, 1)
ops.geomTransf("Linear", 1)
Ic, Ib = 0.3 * 0.4**3 / 12, 0.3 * 0.5**3 / 12
ops.element("elasticBeamColumn", 1, 1, 2, 0.12, E, Ic, 1)
ops.element("elasticBeamColumn", 2, 2, 3, 0.15, E, Ib, 1)
ops.element("elasticBeamColumn", 3, 3, 4, 0.12, E, Ic, 1)

ops.timeSeries("Linear", 1); ops.pattern("Plain", 1, 1)
ops.load(2, 10.0, 0.0, 0.0)
ops.system("BandGeneral"); ops.numberer("RCM"); ops.constraints("Plain")
ops.integrator("LoadControl", 1.0); ops.algorithm("Linear"); ops.analysis("Static")
ops.analyze(1)
ops.reactions()
print(f"Sway = {ops.nodeDisp(2, 1)*1000:.3f} mm")
print(f"Base moments = {ops.nodeReaction(1, 3):.2f}, {ops.nodeReaction(4, 3):.2f} kN.m")
`, 'portal.py')}
${kceOut(String.raw`
Sway = 0.750 mm
Base moments = 11.19, 11.10 kN.m
`)}
<p class="result">Identical to the program written in Lesson 9 — two independent programs, same answer.</p>` },
        { title: 'Natural frequencies of a shear building', html: String.raw`
<p>A shear building is modelled with one horizontal DOF per floor and springs (<code>zeroLength</code> elements) for the stories. Units lb, in, s as in the Dynamics course:</p>
${kcePy(String.raw`
import math
import openseespy.opensees as ops

# Two-story shear building of the Dynamics course (lb, in, s)
k1, k2 = 30700.0, 44300.0
m1, m2 = 52500 / 386, 25500 / 386

ops.wipe()
ops.model("basic", "-ndm", 1, "-ndf", 1)     # one horizontal DOF per node
ops.node(0, 0.0); ops.fix(0, 1)
ops.node(1, 0.0, "-mass", m1)
ops.node(2, 0.0, "-mass", m2)
ops.uniaxialMaterial("Elastic", 1, k1)
ops.uniaxialMaterial("Elastic", 2, k2)
ops.element("zeroLength", 1, 0, 1, "-mat", 1, "-dir", 1)
ops.element("zeroLength", 2, 1, 2, "-mat", 2, "-dir", 1)

lam = ops.eigen("-fullGenLapack", 2)
for i, l in enumerate(lam, start=1):
    w = math.sqrt(l)
    shape = ops.nodeEigenvector(2, i, 1) / ops.nodeEigenvector(1, i, 1)
    print(f"Mode {i}: omega = {w:.2f} rad/s, T = {2*math.pi/w:.3f} s, u2/u1 = {shape:.3f}")
`, 'modal.py')}
${kceOut(String.raw`
Mode 1: omega = 11.83 rad/s, T = 0.531 s, u2/u1 = 1.264
Mode 2: omega = 32.90 rad/s, T = 0.191 s, u2/u1 = -1.629
`)}
<p>The same values as NumPy in Lesson 5. The default eigen solver needs fewer modes than DOFs; for this 2-DOF model all modes are requested, so the <code>-fullGenLapack</code> solver is used (OpenSees prints a warning that it is slow — harmless for small models).</p>` },
        { title: 'Where to go next', html: String.raw`
<ul>
  <li><strong>Non-linear materials</strong>: <code>Steel02</code>, <code>Concrete02</code> and fibre sections with <code>forceBeamColumn</code> elements for pushover analysis.</li>
  <li><strong>Time-history analysis</strong>: <code>timeSeries("Path", ..., "-filePath", "record.txt")</code>, <code>pattern("UniformExcitation", ...)</code>, <code>integrator("Newmark", 0.5, 0.25)</code> — the record from Lesson 10 can be used directly.</li>
  <li><strong>Visualisation</strong>: the <code>opsvis</code> package draws the model, deformed shapes and force diagrams.</li>
</ul>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Start every script with <code>ops.wipe()</code>.</li>
  <li>Use one unit system; masses in force·s²/length.</li>
  <li>Call <code>ops.reactions()</code> before <code>nodeReaction</code>.</li>
  <li>Check a simple version of every model against a hand result first.</li>
</ul>` }
      ]
    }
  ]
});
