/* Lesson 10 — Technical soil investigation (CCES Soil Mechanics §11) */
KCE_COURSE.lessons.push({
  id: 'site-investigation',
  num: 10,
  title: 'Site Investigation and Boring Layout',
  desc: 'Purpose of a geotechnical investigation, depth of borings for isolated, strip, mat and pile foundations, spacing of borings, sampling and groundwater observations.',
  icon: '🗺️',
  color: 'peach',
  meta: ['§11', 'Borings', 'Beginner'],
  sections: [
    {
      title: 'Summary',
      subs: [
        { title: 'Overview', html: String.raw`
<p>Every foundation design starts with a <strong>site investigation</strong>: borings and in-situ tests to find the soil layers, take samples for the laboratory, measure the groundwater, and obtain the parameters for bearing capacity and settlement. Its extent depends on the size of the building and the variability of the ground.</p>` },
        { title: 'Description', html: String.raw`
<table class="tbl">
  <thead><tr><th>Foundation</th><th>Minimum boring depth below the footing</th></tr></thead>
  <tbody>
    <tr><td>Isolated footings (B = footing width)</td><td>\(Z = 4.5B\) if spacing \(C &lt; 2B\); \(3B\) if \(2B &lt; C &lt; 4B\); \(1.5B\) if \(C &gt; 4B\)</td></tr>
    <tr><td>Strip footing</td><td>\(Z \ge 6B\)</td></tr>
    <tr><td>Mat (raft)</td><td>\(Z \ge 1.5B\), B = width of the building</td></tr>
    <tr><td>Pile group (length D, group width B)</td><td>\(1.5B\) below the level at \(\tfrac23D\)</td></tr>
  </tbody>
</table>` },
        { title: 'Methodology', html: String.raw`
<ol>
  <li>Collect existing data: geological maps, nearby borings, history of the site.</li>
  <li>Lay out borings according to the building type and soil variability (table in Theory).</li>
  <li>Drill, sample and test at each change of layer and at regular intervals (1 – 1.5 m), with SPT or CPT/DCP profiles.</li>
  <li>Record the groundwater level and take water samples (chemistry can attack concrete).</li>
  <li>Write the report: logs, test results, recommended foundation type and allowable bearing pressure.</li>
</ol>` },
        { title: 'Model', html: String.raw`
<figure class="fig">
  <svg viewBox="0 0 520 250" role="img" aria-label="Boring depth below a pile group">
    <path class="ln" d="M40 60 H480"/><rect class="conc" x="180" y="30" width="160" height="30"/><text x="236" y="50">Building</text>
    <g class="ln"><path d="M200 60 V190 M225 60 V190 M250 60 V190 M275 60 V190 M300 60 V190 M320 60 V190"/></g>
    <path class="dim" d="M150 60 V190 M140 147 H360 M380 147 V230 M200 210 H320"/>
    <text x="110" y="130" class="m">D</text><text x="364" y="142" class="m">⅔D</text><text x="388" y="196" class="m">1.5B</text><text x="250" y="226" class="m">B</text>
    <path class="ln" d="M430 60 V230"/><text x="414" y="246" class="m">boring</text>
  </svg>
  <figcaption>Figure 1 — Boring depth for a pile group: 1.5B below the level at two-thirds of the pile length.</figcaption>
</figure>` }
      ]
    },
    {
      title: 'Theory',
      subs: [
        { title: 'Spacing of borings (m)', html: String.raw`
<table class="tbl num">
  <thead><tr><th>Structure</th><th>Uniform soil</th><th>Fairly uniform</th><th>Variable soil</th><th>Minimum number</th></tr></thead>
  <tbody>
    <tr><td>Multi-storey building</td><td>45</td><td>30</td><td>15</td><td>4</td></tr>
    <tr><td>1 – 2 storey building</td><td>60</td><td>30</td><td>15</td><td>3</td></tr>
    <tr><td>Bridge pier / abutment</td><td>—</td><td>—</td><td>—</td><td>1 – 2 per support</td></tr>
    <tr><td>Road</td><td>250</td><td>150</td><td>30</td><td>—</td></tr>
    <tr><td>Borrow pits</td><td>250 – 150</td><td>150 – 60</td><td>30 – 15</td><td>—</td></tr>
  </tbody>
</table>
<p>Undisturbed samples are taken in cohesive soils (soft to stiff clay); disturbed samples (1 – 3 kg each) in all soils for identification. In sand, where undisturbed sampling is difficult, rely on in-situ tests (DCP, CPT, SPT).</p>` }
      ]
    },
    {
      title: 'Worked Example',
      subs: [
        { title: 'Planning borings', html: String.raw`
<div class="ex">
  <div class="ex-head">A 6-storey building, 30 m × 45 m, on fairly uniform ground, will have isolated footings 2.0 m wide at 5 m spacing. How many borings and how deep?</div>
  <div class="ex-body">
    <ol class="steps">
      <li>Spacing 30 m (multi-storey, fairly uniform) → a 2 × 3 grid over 30 × 45 m = 6 borings (≥ 4 minimum).</li>
      <li>\(C = 5\) m lies between \(2B = 4\) m and \(4B = 8\) m → \(Z = 3B = 6\) m below the footing level.
        <span class="result">6 borings, about 6 m below footing level (deeper if soft layers appear)</span></li>
    </ol>
  </div>
</div>` },
        { title: 'Checklist', html: String.raw`
<ul class="check">
  <li>Go below every soft layer that the foundation stresses can reach.</li>
  <li>Locate borings at the corners and at heavy column groups.</li>
  <li>Record water levels at the end of drilling and again after 24 h.</li>
</ul>` }
      ]
    }
  ]
});
