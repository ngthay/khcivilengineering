/* Lesson 1 — Getting started: install Python, choose an editor, run a first calculation */
KCE_COURSE.lessons.push({
  id: 'getting-started',
  num: 1,
  title: 'Getting Started — Installing Python and Your First Engineering Script',
  desc: 'Why engineers use Python, installing it with Anaconda, the editors (VS Code, Jupyter, Spyder), running a script, installing packages, and a first program that checks a simply supported beam.',
  icon: '🚀',
  color: 'sky',
  meta: ['Setup', 'First script', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>Python</strong> is a free programming language that reads almost like plain English. For a civil engineer it replaces long spreadsheets, repeats the same check for hundreds of members in a second, reads and writes Excel files, draws diagrams and drives analysis programs such as OpenSees, Abaqus and ETABS.</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Task</th><th>Spreadsheet</th><th>Python</th></tr></thead>
  <tbody>
    <tr><td>One beam check</td><td>Quick</td><td>Quick</td></tr>
    <tr><td>The same check for 300 beams from an ETABS export</td><td>Copying formulas, easy to break</td><td>One loop, same code for every row</td></tr>
    <tr><td>Solve equations, eigenvalues, time histories</td><td>Hard or impossible</td><td>One line with NumPy / SciPy</td></tr>
    <tr><td>Check what was calculated</td><td>Formulas hidden in cells</td><td>Every step written in the script</td></tr>
  </tbody>
</table></div>` },
        { title: 'The tools used in this course', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Package</th><th>Used for</th><th>Lesson</th></tr></thead>
  <tbody>
    <tr><td>Python itself</td><td>Variables, decisions, loops, functions, lists, dictionaries, files</td><td>2–4</td></tr>
    <tr><td>NumPy</td><td>Arrays, matrices, linear equations, eigenvalues</td><td>5</td></tr>
    <tr><td>Matplotlib</td><td>Graphs: SFD/BMD, stress–strain curves, spectra</td><td>6</td></tr>
    <tr><td>pandas</td><td>Tables, Excel and CSV files</td><td>7</td></tr>
    <tr><td>SciPy</td><td>Root finding, integration, differential equations, optimisation</td><td>8</td></tr>
    <tr><td>OpenSeesPy</td><td>Finite element analysis of structures</td><td>11</td></tr>
  </tbody>
</table></div>` }
      ]
    },
    {
      title: 'Setup',
      subs: [
        { title: 'Install Python with Anaconda', html: String.raw`
<ol>
  <li>Download the <strong>Anaconda Distribution</strong> (free, Windows / macOS / Linux) from anaconda.com and install it with the default options. It includes Python, NumPy, SciPy, pandas, Matplotlib, scikit-learn and Jupyter.</li>
  <li>Open the <strong>Anaconda Prompt</strong> (Windows) or a terminal and check the installation:</li>
</ol>
${kceShell(String.raw`
python --version
python -c "import numpy, scipy, pandas, matplotlib; print('all good')"
`)}
<p>Packages that are not included are installed once with <code>pip</code> (or <code>conda</code>):</p>
${kceShell(String.raw`
pip install openseespy openpyxl
`)}
<div class="note">The plain installer from python.org also works. Then install the packages yourself: <code>pip install numpy scipy pandas matplotlib openpyxl openseespy</code>.</div>` },
        { title: 'Choose an editor', html: String.raw`
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Editor</th><th>Good for</th></tr></thead>
  <tbody>
    <tr><td><strong>VS Code</strong> + the Python extension</td><td>Scripts and larger programs; free; colours, auto-complete, debugger. Run a file with the ▶ button.</td></tr>
    <tr><td><strong>Jupyter Notebook / JupyterLab</strong></td><td>Step-by-step calculations with text, results and graphs together — like a calculation sheet.</td></tr>
    <tr><td><strong>Spyder</strong> (in Anaconda)</td><td>Looks like MATLAB: editor, console and a variable explorer.</td></tr>
  </tbody>
</table></div>
<p>To run a saved script from a terminal, go to its folder and type:</p>
${kceShell(String.raw`
cd C:\Projects\python
python beam.py
`)}` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Your first script — a simply supported beam', html: String.raw`
<p>Create a file called <code>beam.py</code>, type the program, save and run it. Everything after <code>#</code> is a comment for the reader; Python ignores it.</p>
${kcePy(String.raw`
# beam.py - simply supported beam under a uniform load
w = 25.0                  # uniform load, kN/m
L = 6.0                   # span, m
E = 30e6                  # Young's modulus, kN/m² (30 GPa)
b, h = 0.30, 0.50         # section, m
I = b * h**3 / 12         # second moment of area, m⁴

M_max = w * L**2 / 8
V_max = w * L / 2
delta = 5 * w * L**4 / (384 * E * I)

print("I =", I, "m4")
print("Maximum moment =", M_max, "kN.m")
print("Maximum shear  =", V_max, "kN")
print("Deflection     =", round(delta * 1000, 2), "mm")
print("Limit L/250    =", L / 250 * 1000, "mm")
`, 'beam.py')}
${kceOut(String.raw`
I = 0.0031249999999999997 m4
Maximum moment = 112.5 kN.m
Maximum shear  = 75.0 kN
Deflection     = 4.5 mm
Limit L/250    = 24.0 mm
`)}
<ul>
  <li><code>**</code> is “to the power of”; <code>30e6</code> means 30 × 10⁶.</li>
  <li>The value of I shows <code>0.0031249999999999997</code> instead of 0.003125. Computers store decimals in binary, so tiny round-off appears. It does not matter for engineering, but always <strong>format</strong> results before printing (Lesson 2).</li>
  <li>Choose one consistent set of units (here kN and m) and write them in the comments.</li>
</ul>
<p class="result">M = wL²/8 = 25 × 36 / 8 = 112.5 kN·m and δ = 4.5 mm &lt; L/250 = 24 mm — the same as a hand calculation.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Python and the packages are installed; <code>python --version</code> works.</li>
  <li>You can run a script from an editor and from the terminal.</li>
  <li>Use one unit system per script and write the units in comments.</li>
  <li>Check the first results of any new script against a hand calculation.</li>
</ul>` }
      ]
    }
  ]
});
