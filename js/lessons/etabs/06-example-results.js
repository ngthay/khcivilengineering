/* Lesson 6 — Example 1: analysis options, run, deformed shape, moment diagram, tables (guide pp. 27–30) */
KCE_COURSE.lessons.push({
  id: 'example-results',
  num: 6,
  title: 'Example 1 — Run the Analysis and Read the Results',
  desc: 'Analysis options for a plane frame, running the analysis, the deformed shape, member force diagrams and printed output tables, and a stiffness-method hand check of the guide’s ETABS moments, including face-of-support values and the effect of the material unit error.',
  icon: '📊',
  color: 'mint',
  meta: ['Example 1 · part 3', 'Run · results', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>The model from Lessons 4–5 is now analysed. The steps are to set the active degrees of freedom, run the analysis, look at the deformed shape, plot the bending moment for each load case, and export the result tables. The ETABS bending moments are then checked against a hand calculation by the stiffness method.</p>` }
      ]
    },
    {
      title: 'Step by step',
      subs: [
        { title: 'Analysis options', html: String.raw`
<p>Use <em>Analyze → Set Analysis Options…</em> The example is a frame in the XZ plane, so choose <strong>XZ Plane</strong>. ETABS then keeps only UX, UZ and RY active, which makes a 2D analysis. <em>Full 3D</em> is used for buildings. <em>Include P-Delta</em> adds second-order effects. <em>Dynamic Analysis</em> also calculates the mode shapes.</p>
${etabsShot('p27-1', 292, 'Figure 1 — Analyze menu: Set Analysis Options, Check Model, Run Analysis (F5).')}
${etabsShot('p27-2', 690, 'Figure 2 — Analysis Options: XZ Plane (UX, UZ, RY active).')}` },
        { title: 'Run the analysis', html: String.raw`
<p>Use <em>Analyze → Run Analysis</em>, <kbd>F5</kbd> or the Run button. When it finishes, ETABS shows the deformed shape for DEAD and locks the model. Click the lock button to unlock it and edit the model again, but doing so deletes the results.</p>
${etabsShot('p27-3', 392, 'Figure 3 — The Run Analysis button.')}
${etabsShot('p28-1', 624, 'Figure 4 — After the run: 3D view of the deformed shape (DEAD).')}` },
        { title: 'Deformed shape', html: String.raw`
<p>Use <em>Display → Show Deformed Shape…</em> and pick a load case. Under DEAD the beam sags, the columns bend, and the frame sways a little towards the pinned side, because the frame is not symmetric. Right-click any joint to read its displacements.</p>
${etabsRow([['p28-3', 259], ['p28-2', 385]], 'Figure 5 — Display → Show Deformed Shape; the deformed frame for DEAD.')}` },
        { title: 'Member force diagrams', html: String.raw`
<p>Use <em>Display → Show Member Forces/Stress Diagram → Frame/Pier/Spandrel Forces…</em> (support reactions are in the same submenu). Choose the load case, then the component: <strong>Moment 3-3</strong> is the in-plane bending moment, <strong>Shear 2-2</strong> the in-plane shear and <strong>Axial Force</strong> the axial force. Tick <em>Show Values on Diagram</em>.</p>
${etabsShot('p29-1', 467, 'Figure 6 — Display → Show Member Forces/Stress Diagram → Frame/Pier/Spandrel Forces.')}
${etabsRow([['p29-2', 259], ['p29-3', 433]], 'Figure 7 — Member Force Diagram for Frames (DEAD, Moment 3-3, Show Values) and the moment diagram.')}
<p>For DEAD, ETABS gives 56.36 kN·m at mid-span, 7.64 kN·m at the fixed base A, 25.61 and 33.25 kN·m at the tops of the columns, and 29.31 kN·m at the right end of the beam. The right base is pinned, so its moment is 0. ETABS draws each moment on the tension side of the member.</p>` },
        { title: 'Output tables', html: String.raw`
<p>To use the numbers elsewhere, go to <em>File → Print Tables → Analysis Output…</em> Tick Displacements, Reactions and Frame Forces, choose the load cases and combinations with <strong>Select Loads…</strong>, and tick <em>Print to File</em> to save a text file. <em>Display → Show Tables</em> shows the same data on screen, where it can be exported to Excel.</p>
${etabsShot('p30-1', 449, 'Figure 8 — File → Print Tables → Analysis Output.')}
${etabsShot('p30-2', 664, 'Figure 9 — Print Output Tables and Select Output (COMB1, DEAD, LIVE, WIND).')}` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Hand check of the DEAD moments', html: String.raw`
<p>The frame was solved by the stiffness method, including axial and shear deformation (as ETABS does). The DEAD line load is the 20 kN/m plus the beam self-weight that the guide entered, \(2.5 \times 0.2 \times 0.4 = 0.2\) kN/m, so <strong>q = 20.2 kN/m</strong>. At the joint centrelines this gives</p>
$$M_{A,base} = 7.64,\quad M_{A,joint} = 30.72,\quad M_{mid} = 56.36,\quad M_{B,joint} = 38.36\ \ \text{kN·m}$$
<p>The mid-span and base values match ETABS exactly. ETABS prints <strong>smaller</strong> values at the joints because it reports column moments at the beam <em>soffit</em> and beam moments at the column <em>face</em>. In ETABS the beam top is at the story level, so each column’s clear height ends 0.40 m (the beam depth) below the joint. The beam’s clear span starts 0.15 m (half the column depth) from each grid line.</p>
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>Location</th><th>At centreline</th><th>Correction</th><th>Hand check</th><th>ETABS</th></tr></thead>
  <tbody>
    <tr><td>Left column, top (z = 2.6 m)</td><td>30.72</td><td>− 12.79 × 0.40</td><td>25.60</td><td>25.61</td></tr>
    <tr><td>Right column, top (z = 2.6 m)</td><td>38.36</td><td>− 12.79 × 0.40</td><td>33.24</td><td>33.25</td></tr>
    <tr><td>Beam at face of B (0.15 m)</td><td>38.36</td><td>− 61.87 × 0.15 + 20.2 × 0.15²/2</td><td>29.31</td><td>29.31</td></tr>
    <tr><td>Mid-span</td><td>56.36</td><td>—</td><td>56.36</td><td>56.36</td></tr>
    <tr><td>Left base</td><td>7.64</td><td>—</td><td>7.64</td><td>7.64</td></tr>
  </tbody>
</table></div>
<p>Here 12.79 kN is the horizontal reaction (the column shear) and 61.87 kN is the beam shear at B. The DEAD reactions are A: V = 59.33 kN, H = 12.79 kN, M = 7.64 kN·m; B: V = 61.87 kN, H = 12.79 kN. The two horizontal reactions point inwards. Check: \(59.33 + 61.87 = 121.2 = 20.2 \times 6\) ✓.</p>
<div data-widget="portal-frame" data-title="Portal frame — moments at joint centrelines"></div>
<p>The defaults reproduce the DEAD case. Enter q = 0, P = 50 for LIVE, or q = 0, W = 10 for WIND. Enter q = 22 for the dead load with the correct concrete weight (20 + 25 × 0.2 × 0.4). Set the last field to 1 to fix the right base as well.</p>` },
        { title: 'Effect of the material unit error', html: String.raw`
<p>Lesson 4 noted that the guide entered tf-m material values while kN-m units were selected. The table shows what each value changes.</p>
<div class="tbl-wrap"><table class="tbl num">
  <thead><tr><th>DEAD case</th><th>Guide (γ = 2.5, E = 2.1e6)</th><th>Correct (γ = 25, E = 2.7e7)</th></tr></thead>
  <tbody>
    <tr><td>Beam self-weight (kN/m)</td><td>0.2</td><td>2.0</td></tr>
    <tr><td>M at mid-span (kN·m)</td><td>56.36</td><td>61.38</td></tr>
    <tr><td>M at joint A / joint B (kN·m)</td><td>30.72 / 38.36</td><td>33.46 / 41.78</td></tr>
    <tr><td>M at base A (kN·m)</td><td>7.64</td><td>8.32</td></tr>
    <tr><td>Mid-span deflection (mm)</td><td>85.8</td><td>7.3</td></tr>
    <tr><td>Sway at beam level (mm)</td><td>23.6</td><td>2.0</td></tr>
  </tbody>
</table></div>
<p>The moments change by about 9 %, because only the self-weight changes. The deflections are about 12 times too large, because E is 13 times too small. Always check the units of every material value.</p>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'All load cases and a design combination', html: String.raw`
<div class="ex">
  <div class="ex-head">Moments at the joint centrelines (kN·m) for each load case (correct γ = 25 kN/m³), and the combination 1.2D + 1.6L.</div>
  <div class="ex-body">
    <div class="tbl-wrap"><table class="tbl num">
      <thead><tr><th>Case</th><th>Base A</th><th>Joint A</th><th>Mid-span</th><th>Joint B</th></tr></thead>
      <tbody>
        <tr><td>DEAD (q = 22)</td><td>8.32</td><td>33.46 (hog)</td><td>61.38 (sag)</td><td>41.78 (hog)</td></tr>
        <tr><td>LIVE (P₁ = 50)</td><td>4.73</td><td>19.01 (hog)</td><td>53.63 (sag)</td><td>23.74 (hog)</td></tr>
        <tr><td>WIND (P₂ = 10 → +X)</td><td>13.38</td><td>9.77</td><td>1.46</td><td>6.86</td></tr>
        <tr><td><strong>1.2D + 1.6L</strong></td><td>17.55</td><td>70.57</td><td>159.46</td><td>88.12</td></tr>
      </tbody>
    </table></div>
    <ol class="steps">
      <li>The WIND reactions are horizontal: A 7.71 kN and B 2.29 kN, adding up to 10 kN. The fixed base A takes most of the wind. The vertical reactions are a couple of 2.77 kN: A is pulled down and B pushed up, so \(2.77 \times 6 + 13.38 = 30.0 = 10 \times 3\) ✓.</li>
      <li>Wind <em>reduces</em> the hogging moment at joint A and the base moment caused by gravity. So the combination with −W (wind from the right) can govern at A. Make combinations with ±W and envelope them (ENVE).</li>
      <li>The design moment for the beam is 159.5 kN·m (sagging) under 1.2D + 1.6L, at mid-span. At the column face of B it is a little less than 88.1 kN·m.
        <span class="result">M_u ≈ 159 kN·m (mid-span) · 88 kN·m (joint B) under 1.2D + 1.6L</span></li>
    </ol>
  </div>
</div>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Set the active DOF (XZ Plane) for a 2D frame, and Full 3D for a building.</li>
  <li>Check the reactions against the total load before reading the member forces.</li>
  <li>Joint moments printed by ETABS are at the faces, which are smaller than at the centrelines.</li>
  <li>Check one value by hand. A big difference usually points to the units, a section or a load case.</li>
</ul>` }
      ]
    }
  ]
});
