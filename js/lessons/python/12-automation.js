/* Lesson 12 — Classes, reports and automating engineering software */
KCE_COURSE.lessons.push({
  id: 'automation',
  num: 12,
  title: 'Automation — Classes, Excel Reports, Abaqus and ETABS Scripting',
  desc: 'Organising members as classes, producing an Excel design report, running and post-processing Abaqus with Python (replay files, noGUI scripts, reading the ODB), and driving ETABS through its API — with the habits that keep automated work safe.',
  icon: '⚙️',
  color: 'amber',
  meta: ['class · dataclass', 'Abaqus · ETABS API', 'Advanced'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Automation pays off when the same work is repeated: checking hundreds of members, running a model for many parameters, or rebuilding a report after every design change. Three tools from this lesson cover most cases:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Tool</th><th>Typical use</th></tr></thead>
  <tbody>
    <tr><td><strong>Classes</strong></td><td>One object per beam, column or footing, holding its data and its checks</td></tr>
    <tr><td><strong>pandas + openpyxl</strong></td><td>Design tables and reports in Excel</td></tr>
    <tr><td><strong>Program APIs</strong></td><td>Abaqus (built-in Python), ETABS / SAP2000 (OAPI through <code>comtypes</code>), AutoCAD (<code>pyautocad</code>), Excel (<code>xlwings</code>)</td></tr>
  </tbody>
</table></div>` },
        { title: 'Classes', html: String.raw`
<p>A <strong>class</strong> describes a kind of object; each object (an <em>instance</em>) has its own data. A <code>@dataclass</code> writes the boring parts (storing the arguments) for you. A <code>@property</code> is a value calculated from the data and used without brackets: <code>beam.d</code>.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'A beam class', html: String.raw`
${kcePy(String.raw`
import math
from dataclasses import dataclass

@dataclass
class RCBeam:
    """Singly reinforced rectangular beam (mm, MPa, kN.m), ACI 318-19."""
    name: str
    b: float
    h: float
    cover: float
    n_bars: int
    bar: float
    fc: float = 28.0
    fy: float = 420.0

    @property
    def d(self):
        return self.h - self.cover - 10 - self.bar / 2      # 10 mm stirrup

    @property
    def As(self):
        return self.n_bars * math.pi * self.bar**2 / 4

    def phi_Mn(self):
        a = self.As * self.fy / (0.85 * self.fc * self.b)
        return 0.9 * self.As * self.fy * (self.d - a / 2) / 1e6   # assumes tension-controlled

    def check(self, Mu):
        ratio = Mu / self.phi_Mn()
        return f"{self.name}: phiMn = {self.phi_Mn():.1f} kN.m, Mu/phiMn = {ratio:.2f} {'OK' if ratio <= 1 else 'NG'}"

beams = [RCBeam("B1", 300, 600, 40, 4, 20), RCBeam("B2", 250, 500, 40, 3, 16),
         RCBeam("B3", 300, 700, 40, 5, 25, fc=32)]
moments = {"B1": 220.0, "B2": 110.0, "B3": 520.0}
for beam in beams:
    print(beam.check(moments[beam.name]))
`, 'beams.py')}
${kceOut(String.raw`
B1: phiMn = 238.9 kN.m, Mu/phiMn = 0.92 OK
B2: phiMn = 95.9 kN.m, Mu/phiMn = 1.15 NG
B3: phiMn = 532.8 kN.m, Mu/phiMn = 0.98 OK
`)}
<p>The short method assumes φ = 0.9. B3 was checked: c = 154 mm, εt = 0.0094 &gt; 0.005, so it is tension-controlled. A complete class would use the strain check of Lesson 3.</p>` },
        { title: 'An Excel design report', html: String.raw`
${kcePy(String.raw`
import pandas as pd
from beams import RCBeam, beams, moments

rows = [{"Beam": bm.name, "b (mm)": bm.b, "h (mm)": bm.h, "d (mm)": round(bm.d, 1),
         "As (mm²)": round(bm.As), "Mu (kN.m)": moments[bm.name],
         "phiMn (kN.m)": round(bm.phi_Mn(), 1),
         "Ratio": round(moments[bm.name] / bm.phi_Mn(), 2)} for bm in beams]
report = pd.DataFrame(rows)
report["Status"] = report["Ratio"].apply(lambda r: "OK" if r <= 1 else "NG")

with pd.ExcelWriter("beam_report.xlsx", engine="openpyxl") as xl:
    report.to_excel(xl, sheet_name="Beams", index=False)
    ws = xl.sheets["Beams"]
    for col in ws.columns:                       # widen the columns
        ws.column_dimensions[col[0].column_letter].width = 14
print(report.to_string(index=False))
`, 'report.py')}
${kceOut(String.raw`
B1: phiMn = 238.9 kN.m, Mu/phiMn = 0.92 OK
B2: phiMn = 95.9 kN.m, Mu/phiMn = 1.15 NG
B3: phiMn = 532.8 kN.m, Mu/phiMn = 0.98 OK
Beam  b (mm)  h (mm)  d (mm)  As (mm²)  Mu (kN.m)  phiMn (kN.m)  Ratio Status
  B1     300     600   540.0      1257      220.0         238.9   0.92     OK
  B2     250     500   442.0       603      110.0          95.9   1.15     NG
  B3     300     700   637.5      2454      520.0         532.8   0.98     OK
`)}
<p><code>from beams import ...</code> loads the classes from <code>beams.py</code> in the same folder — that file’s check lines also run once on import. In larger projects, put the test lines under <code>if __name__ == "__main__":</code> so they run only when the file is started directly.</p>` },
        { title: 'Abaqus: replay files, noGUI scripts and the ODB', html: String.raw`
<p>Abaqus/CAE is itself driven by Python. Every action in the GUI is written to <code>abaqus.rpy</code> in the working folder — copy those lines to start a script. Scripts run inside Abaqus’s own Python (Python 2.7 up to Abaqus 2023, Python 3 from 2024), not in Anaconda:</p>
${kceShell(String.raw`
abaqus cae noGUI=build_model.py
abaqus job=Beam-1 input=Beam-1.inp cpus=4 interactive
abaqus python read_odb.py
`)}
<p>The three commands build the model without opening a window, run the analysis, and post-process the output database.</p>
${kcePy(String.raw`
# read_odb.py - largest displacement and Mises stress in the last frame
from odbAccess import openOdb

odb = openOdb("Beam-1.odb", readOnly=True)
frame = odb.steps["Step-1"].frames[-1]              # last increment of the step
U = frame.fieldOutputs["U"]
S = frame.fieldOutputs["S"]
u_max = max(v.magnitude for v in U.values)
s_max = max(v.mises for v in S.values)
print("max |U| = %.4f   max Mises = %.1f" % (u_max, s_max))
odb.close()
`, 'read_odb.py')}
<p>A parametric study is then a normal Python loop (in Anaconda) that edits a value in the <code>.inp</code> text, starts the job with <code>subprocess.run([...])</code> and reads the result. See the Abaqus course for the models themselves.</p>
<div class="note">This snippet uses only long-standing Abaqus scripting objects (<code>openOdb</code>, <code>steps</code>, <code>frames</code>, <code>fieldOutputs</code>); it was not run for this page because Abaqus is not part of the course setup. Names such as “Step-1” must match your model.</div>` },
        { title: 'ETABS: the API through comtypes', html: String.raw`
<p>ETABS and SAP2000 expose an <strong>API</strong> (OAPI) that Python reaches through the <code>comtypes</code> package (<code>pip install comtypes</code>, Windows only). The pattern from the CSI documentation attaches to an ETABS window that is already open:</p>
${kcePy(String.raw`
import comtypes.client

helper = comtypes.client.CreateObject("ETABSv1.Helper")
helper = helper.QueryInterface(comtypes.gen.ETABSv1.cHelper)
etabs = helper.GetObject("CSI.ETABS.API.ETABSObject")     # the open ETABS
model = etabs.SapModel

model.SetPresentUnits(6)                                   # 6 = kN, m, °C
model.Analyze.RunAnalysis()
model.Results.Setup.DeselectAllCasesAndCombosForOutput()
model.Results.Setup.SetCaseSelectedForOutput("EQX")
res = model.Results.StoryDrifts()                          # returns a list of arrays
n, story, case, step_type, step_num, direction, drift = res[:7]
for s, d, r in zip(story, direction, drift):
    print(f"{s:8s} {d}  drift = {r:.5f}")
`, 'etabs_drifts.py')}
<div class="note">Every API function returns its outputs as a list ending with a return code (0 = success). The order of the outputs and the unit codes are listed in the CSI OAPI help file installed with ETABS — check them for your version before relying on a script. This snippet was not run for this page.</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Automate only what you have first done and checked by hand.</li>
  <li>Keep inputs (tables, parameters) separate from code, and save results with the inputs that produced them.</li>
  <li>Check API return codes and units after every call to an external program.</li>
  <li>Spot-check a few automated results in the program’s GUI.</li>
</ul>` }
      ]
    }
  ]
});
