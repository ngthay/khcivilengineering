/* Lesson 5 — Example 1: draw columns and beam, loads, supports, checks (guide pp. 16–26) */
KCE_COURSE.lessons.push({
  id: 'example-model',
  num: 5,
  title: 'Example 1 — Drawing the Frame, Loads and Supports',
  desc: 'Drawing the two columns and the beam, assigning the 20 kN/m dead load, the 50 kN live point load and the 10 kN wind joint load, fixed and pinned supports, relabelling, and checking the model on screen.',
  icon: '📏',
  color: 'amber',
  meta: ['Example 1 · part 2', 'Draw · Assign', 'Intermediate'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>With the grid, sections, material and load cases ready (Lesson 4), the frame is now drawn and loaded:</p>
<ol>
  <li>Columns C20X30 at grid lines A and B.</li>
  <li>Beam B20X40 from A to B at STORY1.</li>
  <li>DEAD q = 20 kN/m on the beam; LIVE P₁ = 50 kN at mid-span; WIND P₂ = 10 kN at the top-left joint.</li>
  <li>Fixed support at A, pinned support at B.</li>
  <li>Relabel the objects, then check the sections and loads on screen.</li>
</ol>` }
      ]
    },
    {
      title: 'Step by step',
      subs: [
        { title: 'Draw the columns', html: String.raw`
<p>In the plan view of STORY1, click <em>Create Columns in Region or at Clicks</em> (the red arrow in the figure) and set Property = <strong>C20X30</strong> in Properties of Object. Then drag a window around the grid intersection where the column goes. Repeat at the second intersection.</p>
${etabsShot('p16-2', 690, 'Figure 1 — Drawing a column C20X30 in the plan view.')}
${etabsRow([['p17-1', 592], ['p17-2', 291]], 'Figure 2 — Draw → Draw Line Objects → Create Columns in Region or at Clicks (Plan), with Property = C20X30.')}` },
        { title: 'Draw the beam', html: String.raw`
<p>Use <em>Draw → Draw Line Objects → Draw Lines (Plan, Elev, 3D)</em> or its button. Set Property = <strong>B20X40</strong>, then click grid point A-1 and then grid point B-1. The status tip shows L = 6.</p>
${etabsShot('p17-3', 594, 'Figure 3 — Draw → Draw Line Objects → Draw Lines (Plan, Elev, 3D).')}
${etabsShot('p18-1', 628, 'Figure 4 — Drawing beam B20X40 from A to B (L = 6 m).')}
${etabsShot('p18-2', 624, 'Figure 5 — The frame in elevation 1 and in 3D.')}` },
        { title: 'Dead load q = 20 kN/m', html: String.raw`
<p>Select the beam, then <em>Assign → Frame/Line Loads → Distributed…</em></p>
${etabsShot('p19-1', 415, 'Figure 6 — Assign → Frame/Line Loads → Distributed.')}
<ul>
  <li>Load Case Name: <strong>DEAD</strong>.</li>
  <li>Load Type: <strong>Forces</strong>, because this is a force and not a moment. Direction: <strong>Gravity</strong>, because the load acts downwards.</li>
  <li>Uniform Load = <strong>20</strong>. Leave the trapezoidal loads at 0.</li>
</ul>
${etabsShot('p19-2', 424, 'Figure 7 — Frame Distributed Loads: DEAD, Forces, Gravity, uniform 20 kN/m.')}
${etabsShot('p20-1', 451, 'Figure 8 — The 20 kN/m dead load on the beam.')}` },
        { title: 'Live load P₁ = 50 kN', html: String.raw`
<p>Select the beam again, then <em>Assign → Frame/Line Loads → Point…</em></p>
${etabsShot('p20-2', 413, 'Figure 9 — Assign → Frame/Line Loads → Point.')}
<p>Set Load Case = <strong>LIVE</strong>, Forces, Gravity, relative distance <strong>0.5</strong> (mid-span) and Load <strong>50</strong>. Choose <strong>Add to Existing Loads</strong>. <em>Replace Existing Loads</em> would delete any other load in the same case on that member.</p>
${etabsShot('p21-1', 423, 'Figure 10 — Frame Point Loads: LIVE, 50 kN at relative distance 0.5, Add to Existing Loads.')}
${etabsShot('p21-2', 445, 'Figure 11 — The 50 kN live load at mid-span.')}` },
        { title: 'Wind load P₂ = 10 kN', html: String.raw`
<p>The wind load acts on a <strong>joint</strong>. Select the top-left joint, then <em>Assign → Joint/Point Loads → Force…</em></p>
${etabsShot('p22-1', 441, 'Figure 12 — Select the top-left joint.')}
${etabsShot('p22-2', 357, 'Figure 13 — Assign → Joint/Point Loads → Force.')}
<p>Set Load Case = <strong>WIND</strong> and Force Global X = <strong>10</strong>. The wind acts in the +X direction, so the value is positive; a load acting the other way would be −10. Choose Add to Existing Loads.</p>
${etabsShot('p22-3', 421, 'Figure 14 — Point Forces: WIND, Force Global X = 10.')}
${etabsShot('p23-1', 456, 'Figure 15 — The 10 kN wind load at the top-left joint.')}` },
        { title: 'Supports', html: String.raw`
<p>Supports can be assigned at any stage. Select the base joint, click <em>Assign Restraints (Supports)</em> and choose the type. The two bases are different, so assign them one at a time.</p>
${etabsShot('p23-2', 431, 'Figure 16 — Select the base joints and click Assign Restraints.')}
${etabsShot('p24-1', 690, 'Figure 17 — Left base: Fixed (all six DOF); right base: Pinned (translations only).')}
${etabsShot('p24-2', 429, 'Figure 18 — Fixed support at A, pinned support at B.')}
<p>Then use <em>Edit → Auto Relabel All</em> to renumber the objects (C1, C2, B1). Relabelling can’t be undone, so click OK only when you’re sure.</p>
${etabsShot('p24-3', 403, 'Figure 19 — Auto Relabel All: “Relabeling cannot be undone”.')}` },
        { title: 'Check the model', html: String.raw`
<p>Open <em>View → Set Building View Options</em> (the toolbar button marked in red) and tick <em>Line Labels</em> and <em>Line Sections</em>.</p>
${etabsShot('p25-1', 580, 'Figure 20 — View → Set Building View Options.')}
${etabsShot('p25-2', 645, 'Figure 21 — Set Building View Options with Line Labels and Line Sections ticked.')}
<p>The screen now shows the beam B1 as B20X40 and the columns C1 and C2 as C20X30, as required.</p>
${etabsShot('p26-1', 428, 'Figure 22 — Labels and sections: B1 = B20X40, C1 and C2 = C20X30.')}
<p>Check the loads with <em>Display → Show Loads → Joint/Point…</em> or <em>Frame/Line…</em>, one load case at a time. When nothing is missing, the model is ready to analyse.</p>
${etabsShot('p26-2', 379, 'Figure 23 — Display → Show Loads → Joint/Point or Frame/Line.')}` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Frame loads and joint loads', html: String.raw`
<p>A <strong>frame load</strong> is attached to a member and is placed by a relative (0–1) or absolute distance from end I. The I-end is where you started drawing. A <strong>joint load</strong> acts on a node. A wind or seismic story force is applied at the floor level, so here it goes on the joint. A joint load can’t be applied part-way along a beam unless there is a joint there.</p>` }
      ]
    },
    {
      title: 'Checklist',
      subs: [
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Each load is in the right load case: q → DEAD, P₁ → LIVE, P₂ → WIND.</li>
  <li>Use Add to Existing Loads when a member already carries a load in that case.</li>
  <li>The support types match the drawing: A fixed, B pinned.</li>
  <li>Check the sections and loads on screen before you run.</li>
</ul>` }
      ]
    }
  ]
});
