/* Lesson 4 — Lists, dictionaries and files */
KCE_COURSE.lessons.push({
  id: 'lists-dicts-files',
  num: 4,
  title: 'Lists, Dictionaries and Files — Section Tables and Load Combinations',
  desc: 'Lists, tuples and dictionaries, list comprehensions, sorting with a key, choosing the lightest steel section from a table, load combinations, and reading and writing CSV files.',
  icon: '🗂️',
  color: 'amber',
  meta: ['list · dict · csv', 'IPE selection', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Type</th><th>Written as</th><th>Engineering example</th></tr></thead>
  <tbody>
    <tr><td><strong>list</strong> — ordered, can change</td><td><code>[12, 16, 20, 25]</code></td><td>Bar sizes, story heights, a column of results</td></tr>
    <tr><td><strong>tuple</strong> — ordered, fixed</td><td><code>(0.0, 6.0)</code></td><td>Coordinates of a node, a (name, value) pair</td></tr>
    <tr><td><strong>dict</strong> — values found by a key</td><td><code>{"D": 120, "L": 80}</code></td><td>Load cases, a section table, material properties</td></tr>
  </tbody>
</table></div>
${kcePy(String.raw`
bars = [12, 16, 20, 25]
bars.append(32)                 # add at the end
print(bars[0], bars[-1])        # first and last: 12 32
print(bars[1:3])                # slice: [16, 20]

areas = [3.1416 * d**2 / 4 for d in bars]       # list comprehension
big = [d for d in bars if d >= 20]              # with a condition

steel = {"fy": 420, "Es": 200000}
steel["fu"] = 620               # add a key
for key, value in steel.items():
    print(key, value)
`)}` },
        { title: 'Files', html: String.raw`
<p>Open files with <code>with open(...)</code>; the file is closed automatically at the end of the block. The <code>csv</code> module writes and reads comma-separated files that Excel opens directly:</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Mode</th><th>Meaning</th></tr></thead>
  <tbody>
    <tr><td><code>"r"</code></td><td>Read (default)</td></tr>
    <tr><td><code>"w"</code></td><td>Write — replaces an existing file</td></tr>
    <tr><td><code>"a"</code></td><td>Append to the end</td></tr>
  </tbody>
</table></div>
<p>For large tables and Excel files, pandas (Lesson 7) is easier; the <code>csv</code> module needs nothing installed.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Choose the lightest IPE beam', html: String.raw`
<p>A simply supported S275 beam must resist M_Ed = 150 kN·m (Eurocode 3, class 1 or 2 section, γ_M0 = 1.0, lateral buckling restrained). The required plastic modulus is \(W_{pl} \ge M_{Ed}/f_y\).</p>
${kcePy(String.raw`
# Plastic section modulus Wpl,y (cm³) and mass (kg/m) of IPE sections
ipe = {
    "IPE 200": {"Wpl": 220.6, "mass": 22.4},
    "IPE 220": {"Wpl": 285.4, "mass": 26.2},
    "IPE 240": {"Wpl": 366.6, "mass": 30.7},
    "IPE 270": {"Wpl": 484.0, "mass": 36.1},
    "IPE 300": {"Wpl": 628.4, "mass": 42.2},
    "IPE 330": {"Wpl": 804.3, "mass": 49.1},
    "IPE 360": {"Wpl": 1019.0, "mass": 57.1},
}

M_Ed = 150.0            # design moment, kN.m
fy = 275.0              # S275 steel, MPa
W_req = M_Ed * 1e6 / fy / 1e3          # cm³ (gamma_M0 = 1.0)
print(f"Required Wpl = {W_req:.1f} cm³")

# All sections that work, lightest first
ok = [name for name, p in ipe.items() if p["Wpl"] >= W_req]
ok.sort(key=lambda name: ipe[name]["mass"])
best = ok[0]
print("Sections that work:", ok)
print(f"Lightest: {best}, {ipe[best]['mass']} kg/m, "
      f"utilisation = {W_req / ipe[best]['Wpl']:.2f}")
`, 'choose_ipe.py')}
${kceOut(String.raw`
Required Wpl = 545.5 cm³
Sections that work: ['IPE 300', 'IPE 330', 'IPE 360']
Lightest: IPE 300, 42.2 kg/m, utilisation = 0.87
`)}
<ul>
  <li><code>lambda name: ipe[name]["mass"]</code> is a one-line function that tells <code>sort</code> what to sort by.</li>
  <li>The same pattern works for any table: W-shapes, rebar, bolts, anchors — keep the data in a dictionary or a CSV file and let the code choose.</li>
</ul>
<p class="result">IPE 300 (42.2 kg/m), utilisation 545.5 / 628.4 = 0.87.</p>` },
        { title: 'Load combinations and a CSV file', html: String.raw`
${kcePy(String.raw`
import csv

loads = {"D": 120.0, "L": 80.0, "W": 60.0}          # kN, axial force in a column
combos = {
    "1.4D":            {"D": 1.4},
    "1.2D + 1.6L":     {"D": 1.2, "L": 1.6},
    "1.2D + L + W":    {"D": 1.2, "L": 1.0, "W": 1.0},
    "0.9D + W":        {"D": 0.9, "W": 1.0},
}

results = []
for name, factors in combos.items():
    total = sum(f * loads[case] for case, f in factors.items())
    results.append((name, total))
    print(f"{name:15s} {total:7.1f} kN")

governing = max(results, key=lambda r: r[1])
print("Governing:", governing)

with open("combos.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["combination", "Pu_kN"])
    writer.writerows(results)

with open("combos.csv") as f:
    for row in csv.DictReader(f):
        print(row["combination"], "->", row["Pu_kN"])
`, 'combos.py')}
${kceOut(String.raw`
1.4D              168.0 kN
1.2D + 1.6L       272.0 kN
1.2D + L + W      284.0 kN
0.9D + W          168.0 kN
Governing: ('1.2D + L + W', 284.0)
1.4D -> 168.0
1.2D + 1.6L -> 272.0
1.2D + L + W -> 284.0
0.9D + W -> 168.0
`)}
<p>Each combination is a dictionary of factors, so adding snow or earthquake is one more line. Values read back from a CSV file are <strong>strings</strong>; convert them with <code>float(row["Pu_kN"])</code> before calculating.</p>
<div class="note">Here the wind force is taken as compression in this column. In a real frame, wind gives both signs, and 0.9D + W usually checks uplift or minimum compression — include both directions as separate cases.</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Keep tables (sections, materials, combinations) as data, not inside formulas.</li>
  <li>Use <code>max(..., key=...)</code> and <code>sort(key=...)</code> to find the governing case or the lightest member.</li>
  <li>Always open files with <code>with</code>.</li>
  <li>Convert text read from files to numbers before using it.</li>
</ul>` }
      ]
    }
  ]
});
