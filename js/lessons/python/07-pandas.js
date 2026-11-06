/* Lesson 7 — pandas and Excel */
KCE_COURSE.lessons.push({
  id: 'pandas',
  num: 7,
  title: 'pandas and Excel — Tables of Loads, Results and Reports',
  desc: 'DataFrames and columns, reading CSV and Excel exports from analysis programs, new calculated columns, filtering rows, groupby summaries, and writing the results back to Excel — sizing tied columns story by story.',
  icon: '📑',
  color: 'mint',
  meta: ['DataFrame', 'read_excel · groupby', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p><strong>pandas</strong> handles tables — what you would otherwise do in Excel — with code that can be re-run when the analysis changes. A table is a <code>DataFrame</code>; each column is a <code>Series</code>.</p>
<div class="tbl-wrap"><table class="tbl">
  <thead><tr><th>Task</th><th>pandas</th></tr></thead>
  <tbody>
    <tr><td>Read a CSV / Excel export</td><td><code>pd.read_csv("frames.csv")</code>, <code>pd.read_excel("etabs.xlsx", sheet_name="Column Forces", skiprows=[0, 2])</code></td></tr>
    <tr><td>Look at the data</td><td><code>df.head()</code>, <code>df.info()</code>, <code>df.describe()</code>, <code>df.columns</code></td></tr>
    <tr><td>Pick columns</td><td><code>df["P"]</code>, <code>df[["Story", "P", "M3"]]</code></td></tr>
    <tr><td>Filter rows</td><td><code>df[df["P"] &lt; 0]</code>, <code>df[(df["Story"] == "S1") &amp; (df["Combo"] == "ULS1")]</code></td></tr>
    <tr><td>New column</td><td><code>df["Pu"] = 1.2 * df["P_D"] + 1.6 * df["P_L"]</code></td></tr>
    <tr><td>Group and summarise</td><td><code>df.groupby("Story")["P"].min()</code>, <code>.agg(["min", "max"])</code></td></tr>
    <tr><td>Envelope over combinations</td><td><code>df.groupby(["Story", "Column"])["M3"].agg(["min", "max"])</code></td></tr>
    <tr><td>Write</td><td><code>df.to_excel("out.xlsx", index=False)</code>, <code>df.to_csv("out.csv")</code></td></tr>
  </tbody>
</table></div>
<div class="note">ETABS, SAP2000, Midas and Abaqus can export tables to Excel or CSV. Exports often have a title row and a units row: use <code>skiprows</code> and <code>header</code> in <code>read_excel</code> to start at the column names. Writing <code>.xlsx</code> files needs <code>openpyxl</code> (included in Anaconda).</div>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'The column sizing rule used', html: String.raw`
<p>For a tied column, ACI 318 limits the axial strength to</p>
$$\phi P_{n,max} = 0.80\,\phi\,[0.85f'_c(A_g - A_{st}) + f_yA_{st}],\qquad \phi = 0.65$$
<p>With a steel ratio ρ = A_st/A_g this gives the required gross area</p>
$$A_g = \frac{P_u}{0.80 \times 0.65\,[0.85f'_c(1-\rho) + f_y\rho]}$$
<p>This is a preliminary size for axial load only; moments and slenderness are checked later.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Preliminary column sizes from a load table', html: String.raw`
${kcePy(String.raw`
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "story":  ["S3", "S3", "S2", "S2", "S1", "S1"],
    "column": ["C1", "C2", "C1", "C2", "C1", "C2"],
    "P_D":    [310, 420, 640, 860, 970, 1300],      # kN
    "P_L":    [ 90, 130, 190, 260, 290,  390],      # kN
})

fc, fy, rho = 30.0, 420.0, 0.01                     # MPa, MPa, steel ratio
df["Pu"] = 1.2 * df["P_D"] + 1.6 * df["P_L"]
# ACI 318 tied column: phiPn,max = 0.80*0.65*[0.85 fc (1 - rho) + fy rho] Ag
df["Ag_req"] = (df["Pu"] * 1e3 / (0.80 * 0.65 * (0.85 * fc * (1 - rho) + fy * rho))).round()
df["side_mm"] = (np.ceil(df["Ag_req"] ** 0.5 / 50) * 50).astype(int)   # square, 50 mm steps

print(df)
print()
print(df.groupby("story")[["Pu", "side_mm"]].max())
print()
print("Columns with Pu > 2000 kN:")
print(df[df["Pu"] > 2000][["story", "column", "Pu"]])

df.to_excel("columns.xlsx", index=False, sheet_name="Columns")
back = pd.read_excel("columns.xlsx")
print("\nRead back:", back.shape)
`, 'columns.py')}
${kceOut(String.raw`
  story column   P_D  P_L      Pu    Ag_req  side_mm
0    S3     C1   310   90   516.0   33700.0      200
1    S3     C2   420  130   712.0   46501.0      250
2    S2     C1   640  190  1072.0   70013.0      300
3    S2     C2   860  260  1448.0   94570.0      350
4    S1     C1   970  290  1628.0  106326.0      350
5    S1     C2  1300  390  2184.0  142639.0      400

           Pu  side_mm
story
S1     2184.0      400
S2     1448.0      350
S3      712.0      250

Columns with Pu > 2000 kN:
  story column      Pu
5    S1     C2  2184.0

Read back: (6, 7)
`)}
<ol class="steps">
  <li>Row 0 by hand: Pu = 1.2 × 310 + 1.6 × 90 = 516 kN; the denominator is 0.52 × (0.85 × 30 × 0.99 + 420 × 0.01) = 15.31 MPa; Ag = 516,000/15.31 = 33,700 mm² → √ = 184 mm → 200 mm.</li>
  <li>Each new column is calculated for all rows at once — no loop.</li>
  <li><code>groupby("story")</code> gives the largest load and size on each story — the size to use for all columns of that story if you want one size per floor.</li>
</ol>
<p class="result">Ground story 400 × 400 mm, second 350 × 350 mm, top 250 × 250 mm (axial load only, ρ = 1 %).</p>` },
        { title: 'Reading a real export', html: String.raw`
<p>A typical pattern for an ETABS “Column Forces” table exported to Excel (title in row 1, names in row 2, units in row 3):</p>
${kcePy(String.raw`
import pandas as pd

forces = pd.read_excel("Column Forces.xlsx", header=1, skiprows=[2])
forces = forces[forces["Station"] == 0]                   # bottom of each column
env = (forces.groupby(["Story", "Column"])
             .agg(P_min=("P", "min"), M3_max=("M3", "max"), M3_min=("M3", "min"))
             .reset_index())
env.to_excel("column_envelope.xlsx", index=False)
`, 'etabs_envelope.py')}
<p>Check the column names with <code>print(forces.columns)</code> first — they depend on the program and the version. In ETABS compression is negative, so the largest compression is the <em>minimum</em> P.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Look at <code>df.head()</code> and <code>df.columns</code> after reading any file.</li>
  <li>Know the sign convention of the program that produced the export.</li>
  <li>Calculate with whole columns; filter with conditions in brackets joined by <code>&amp;</code> and <code>|</code>.</li>
  <li>Write results to Excel so that others can check them.</li>
</ul>` }
      ]
    }
  ]
});
