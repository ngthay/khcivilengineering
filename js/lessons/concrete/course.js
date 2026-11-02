/* =========================================================
   Reinforced Concrete course (Structural -> Concrete)
   Each lesson file in this folder pushes one lesson:
     { id, num, title, desc, icon, color, meta: [...],
       sections: [ { title, subs: [ { title, html } ] } ] }
   Section 1 is always "Summary" (Overview, Description,
   Methodology, Model), following the article template.
   ========================================================= */
window.KCE_COURSE = {
  id: 'concrete',
  tag: 'RC',
  title: 'Reinforced Concrete Design',
  category: 'Structural',
  icon: '🧱',
  subtitle: 'Fourteen lessons from material properties to footings — strength design to ACI 318M-19 with loads and load combinations from ASCE/SEI 7-22, in SI units, with fully worked and checked examples.',
  chips: ['ACI 318M-19', 'ASCE/SEI 7-22', 'SI units', 'Strength design', '14 lessons'],
  lessons: []
};
