/* =========================================================
   ETABS course (Softwares -> ETABS)
   Based on the Khmer guide "របៀបប្រើប្រាស់ ETABS" (How to use
   ETABS) by វិស្វករ ឈិន សាយ័ន្ត, 2012, written for ETABS
   Nonlinear v9.7: the general workflow (units, grid, materials,
   sections, load cases, drawing, supports, loads) and a worked
   portal-frame example. All screenshots are exported from the
   PDF into images/etabs/ (pNN-k = page NN, picture k).
   The example results were re-checked with a frame stiffness
   analysis. Same lesson format as Concrete.
   ========================================================= */
window.KCE_COURSE = {
  id: 'etabs',
  tag: 'ETB',
  title: 'ETABS: Structural Analysis and Design',
  category: 'Softwares',
  icon: '🏢',
  subtitle: 'Six lessons from a Khmer ETABS guide: the ETABS window, units and a new model; materials, frame sections, load cases and combinations; drawing beams and columns, supports and loads; then a complete portal-frame example from the grid to the bending-moment diagram, with every screenshot from the guide and a hand check of the results.',
  chips: ['ETABS 9.7', 'kN-m units', 'Portal frame example', '6 lessons'],
  lessons: []
};

/* Screenshot helpers shared by the ETABS lessons.
   etabsShot('p03-2', 453, 'Figure 2 — ...')  → one picture
   etabsRow([['p06-4', 287], ['p06-3', 340]], 'Figure 3 — ...') → pictures side by side
   etabsIco('p04-1') → a toolbar icon inside a sentence */
function etabsShot(file, w, cap) {
  const alt = cap.replace(/<[^>]+>/g, '').replace(/^Figure \d+ — /, '');
  return `<figure class="fig shot"><img src="images/etabs/${file}.png" width="${w}" alt="${alt}" loading="lazy"><figcaption>${cap}</figcaption></figure>`;
}
function etabsRow(items, cap) {
  const alt = cap.replace(/<[^>]+>/g, '').replace(/^Figure \d+ — /, '');
  return `<figure class="fig shot"><div class="shot-row">${items.map(([f, w]) =>
    `<img src="images/etabs/${f}.png" width="${w}" alt="${alt}" loading="lazy">`).join('')}</div><figcaption>${cap}</figcaption></figure>`;
}
function etabsIco(file, wide) {
  return `<img class="ico${wide ? ' wide' : ''}" src="images/etabs/${file}.png" alt="">`;
}
