/* Lesson 1 — Types of structures and loads (Chhay/Hibbeler Ch. 1) */
KCE_COURSE.lessons.push({
  id: 'structures-loads',
  num: 1,
  title: 'Types of Structures and Loads',
  desc: 'Structural elements and systems, dead and live loads, live-load reduction, wind, snow and earthquake loads (ASCE 7-22), and the design process.',
  icon: '🏗️',
  color: 'peach',
  meta: ['Ch. 1', 'ASCE 7-22', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>A <strong>structure</strong> is a system of connected parts that supports loads. Structural analysis predicts how it responds — the reactions, internal forces and deflections — so that each member can be designed. Before any analysis the engineer must know two things: what kind of structure it is, and which <strong>loads</strong> it must carry.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Element</th><th>Carries load by</th><th>Examples</th></tr></thead>
  <tbody>
    <tr><td>Tie rod</td><td>Axial tension only</td><td>Bracing, hangers</td></tr>
    <tr><td>Beam</td><td>Bending and shear (mainly perpendicular loads)</td><td>Floor beams, girders</td></tr>
    <tr><td>Column</td><td>Axial compression (beam-column if also bending)</td><td>Building columns</td></tr>
  </tbody>
</table>
<p>Elements combine into <strong>systems</strong>: trusses (slender members in tension or compression), cables and arches (tension or compression along a curved shape), frames (beams and columns joined rigidly) and surface structures (plates, shells, membranes).</p>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Choose the structural system and form (truss, frame, arch …) and idealise it as a line model.</li>
  <li>Collect the loads from the building code: dead, live, snow, wind, earthquake, and others.</li>
  <li>Distribute floor loads to members by <strong>tributary area</strong>, and reduce live load where the code allows.</li>
  <li>Analyse for each load case, then combine them using the code’s load combinations.</li>
  <li>Size the members; if the stiffness changed much, repeat the analysis (design is iterative).</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 270" role="img" aria-label="Tributary area of an interior column">
    <rect class="comp" x="150" y="60" width="200" height="150"/>
    <g class="ln">
      <rect x="40" y="20" width="12" height="12"/><rect x="244" y="20" width="12" height="12"/><rect x="448" y="20" width="12" height="12"/>
      <rect x="40" y="129" width="12" height="12"/><rect x="244" y="129" width="12" height="12"/><rect x="448" y="129" width="12" height="12"/>
      <rect x="40" y="238" width="12" height="12"/><rect x="244" y="238" width="12" height="12"/><rect x="448" y="238" width="12" height="12"/>
    </g>
    <path class="dim" d="M46 26 H454 M46 135 H454 M46 244 H454 M46 26 V244 M250 26 V244 M454 26 V244"/>
    <text x="160" y="84" class="a">Aₜ = 6.71 × 6.71</text>
    <text x="160" y="102" class="a">= 45 m²</text>
    <text x="130" y="16" class="m">6.71 m</text><text x="334" y="16" class="m">6.71 m</text>
    <text x="462" y="86" class="m">6.71 m</text><text x="462" y="196" class="m">6.71 m</text>
  </svg>
  <figcaption>Figure 1 — Tributary area of an interior column: half-way to each neighbouring column (Example 1-2).</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Dead and live loads', html: String.raw`
<p><strong>Dead loads</strong> are the self-weights of the members and of everything permanently attached: slabs, finishes, walls, ceilings, services. They are found from unit weights (kN/m³) or weights per area (kN/m²).</p>
<p><strong>Live loads</strong> vary in magnitude and position: occupants, furniture, vehicles, stored goods. Minimum uniform floor live loads (ASCE 7-22 Table 4.3-1) include:</p>
<table class="tbl num">
  <thead><tr><th>Occupancy</th><th>kN/m²</th><th>Occupancy</th><th>kN/m²</th></tr></thead>
  <tbody>
    <tr><td>Office</td><td>2.40</td><td>Lobbies, first-floor corridors</td><td>4.79</td></tr>
    <tr><td>Residential (dwellings)</td><td>1.92</td><td>Classrooms</td><td>1.92</td></tr>
    <tr><td>Corridors above first floor (schools)</td><td>3.83</td><td>Assembly, movable seats</td><td>4.79</td></tr>
    <tr><td>Light storage</td><td>6.00</td><td>Heavy storage</td><td>11.97</td></tr>
  </tbody>
</table>` },
        { title: 'Live-load reduction (ASCE 7-22 §4.7)', html: String.raw`
<p>A large area is unlikely to be fully loaded at once, so members with a large <strong>influence area</strong> \(K_{LL}A_T \ge 37.16\ \text{m}^2\) may use a reduced live load:</p>
$$L = L_o\left(0.25 + \frac{4.57}{\sqrt{K_{LL}A_T}}\right)$$
<p>\(K_{LL}\) = live-load element factor (4 for interior columns, 2 for interior beams …); \(A_T\) = tributary area (m²). The result may not be less than \(0.50L_o\) for members supporting one floor, nor \(0.40L_o\) for members supporting two or more floors. Loads above 4.79 kN/m², garages and assembly uses are not reduced (except a 20 % reduction for members supporting two or more floors).</p>
<div data-widget="live-load-reduction" data-title="Live-load reduction — ASCE 7-22"></div>` },
        { title: 'Environmental loads (ASCE 7-22)', html: String.raw`
<ul>
  <li><strong>Wind:</strong> velocity pressure \(q_z = 0.613K_zK_{zt}K_eV^2\) (N/m², \(V\) in m/s from the risk-category map); design pressure on the main system \(p = qK_dGC_p - q_iK_d(GC_{pi})\). The book’s example uses the older ASCE 7-02 form \(q_z = 0.613K_zK_{zt}K_dV^2I\).</li>
  <li><strong>Snow:</strong> flat-roof snow load \(p_f = 0.7C_eC_tp_g\), where \(p_g\) comes from the ASCE 7-22 risk-category ground-snow maps.</li>
  <li><strong>Earthquake:</strong> base shear \(V = C_sW\) with \(C_s = S_{DS}/(R/I_e)\) (equivalent lateral force procedure).</li>
  <li><strong>Others:</strong> hydrostatic and soil pressure, temperature, settlement, impact (bridges and cranes).</li>
</ul>` }
      ]
    },
    {
      title: 'Worked Examples',
      subs: [
        { title: 'Example 1-1 — dead load on a floor beam', html: String.raw`
<div class="ex">
  <div class="ex-head">A floor beam carries a 1.83 m width of 102 mm lightweight plain concrete slab with a plastered underside, plus a 2.44 m high, 305 mm thick lightweight concrete block wall on its top flange. Find the dead load per metre.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Slab: \((0.015\ \text{kN/m}^2\text{/mm})(102)(1.83) = 2.80\) kN/m <em>(the Khmer edition prints 0.012, but its 2.80 needs 0.015)</em>.</li>
      <li>Plaster ceiling: \((0.24)(1.83) = 0.44\) kN/m.</li>
      <li>Block wall: \((16.5\ \text{kN/m}^3)(2.44)(0.305) = 12.28\) kN/m.
        <span class="result">w = 2.80 + 0.44 + 12.28 ≈ 15.5 kN/m</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Example 1-2 — reduced live load on a column', html: String.raw`
<div class="ex">
  <div class="ex-head">An interior column of a two-storey office building has columns at 6.71 m both ways (Figure 1). The flat roof load is 0.96 kN/m². Find the live load the column carries at ground level from the first floor and the roof.</div>
  <div class="ex-body">
    <ol class="steps">
      <li>\(A_T = (6.71)(6.71) = 45.0\) m². Roof (not reduced): \(F_R = 0.96(45.0) = 43.1\) kN.</li>
      <li>Office floor \(L_o = 2.40\) kN/m²; interior column \(K_{LL} = 4\) → \(K_{LL}A_T = 180 > 37.2\) m², so reduce:
        $$L = 2.40\left(0.25 + \frac{4.57}{\sqrt{180}}\right) = 1.42\ \text{kN/m}^2$$</li>
      <li>\(1.42/2.40 = 59 \% > 50 \%\) — OK. \(F_F = 1.42(45.0) = 63.9\) kN.
        <span class="result">F = 43.1 + 63.9 = 107.0 kN</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Use the tributary area for load collection, but \(K_{LL}A_T\) (influence area) for the reduction test.</li>
  <li>Never reduce below \(0.5L_o\) (one floor) or \(0.4L_o\) (two or more floors).</li>
  <li>Check which edition of the load code the numbers come from — wind and snow maps changed in ASCE 7-22.</li>
</ul>` }
      ]
    }
  ]
});
