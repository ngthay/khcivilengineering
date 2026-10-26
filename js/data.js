/* =========================================================
   data.js
   ALL site content lives here. To add, rename or remove a
   subject, edit this file only. index.html and app.js
   never need to change.

   Loaded before app.js; it stores everything on
   `window.KCE_DATA` so app.js can read it.
   ========================================================= */

window.KCE_DATA = {

  /* ---------- Sidebar categories (menu order) ---------- */
  categories: [
    { id: "fundamentals", label: "Fundamentals" },
    { id: "structural",   label: "Structural" },
    { id: "computing",    label: "Computing" },
    { id: "softwares",    label: "Softwares" },
    { id: "library",      label: "Library" }
  ],

  /* ---------- Dashboard sections ----------
     Each section shows the subjects from one or more categories
     and gets its own bar in the "Study progress" widget.
     progress.color is the circle behind the progress icon. */
  sections: [
    {
      id: "structural",
      title: "Structural",
      categories: ["structural"],
      progress: { label: "Structural", icon: "🏗️", color: "#ffe1d3" }
    },
    {
      id: "fundamentals",
      title: "Fundamentals",
      categories: ["fundamentals"],
      progress: { label: "Fundamentals", icon: "📈", color: "#e6dcff" }
    },
    {
      id: "tools",
      title: "Computing, Softwares & Library",
      categories: ["computing", "softwares", "library"],
      progress: { label: "Computing & Tools", icon: "🖥️", color: "#ffeccc" }
    }
  ],

  /* ---------- Subjects ----------
     category : which sidebar group it belongs to (see categories above)
     icon     : emoji shown on the card and in the menu
     color    : card background, one of the --card-* names in css/variables.css
                (blue, peach, lilac, pink, violet, rose, mag, sky, mint, amber)
     href     : page the card and menu link open */
  subjects: [
    // Fundamentals
    { category: "fundamentals", title: "Dynamics",              desc: "Vibration, SDOF/MDOF and response",          icon: "📈", color: "violet", href: "dynamics.html" },
    { category: "fundamentals", title: "Mechanics",             desc: "Statics, stress, strain and deflection",      icon: "⚙️", color: "rose",   href: "mechanics.html" },
    { category: "fundamentals", title: "Strength of Materials", desc: "Axial, bending, shear and torsion",           icon: "🔩", color: "mint",   href: "strength.html" },
    { category: "fundamentals", title: "Structural Analysis",   desc: "Beams, frames, trusses and influence lines",  icon: "🌉", color: "peach",  href: "analysis.html" },

    // Structural
    { category: "structural", title: "Design",       desc: "Loads, combinations and design checks",      icon: "📐", color: "blue",  href: "design.html" },
    { category: "structural", title: "Concrete",     desc: "Reinforced concrete beams, columns, slabs",  icon: "🧱", color: "peach", href: "concrete.html" },
    { category: "structural", title: "Steel",        desc: "Members, connections and buckling",          icon: "🏗️", color: "lilac", href: "steel.html" },
    { category: "structural", title: "Geo (Ground)", desc: "Soil mechanics, foundations, consolidation", icon: "⛰️", color: "pink",  href: "geo.html" },

    // Computing
    { category: "computing", title: "AI (Artificial Intelligence)", desc: "Machine learning for engineering",   icon: "🤖", color: "mag", href: "ai.html" },
    { category: "computing", title: "Python",                       desc: "Scripts and tools for calculations", icon: "🐍", color: "sky", href: "python.html" },

    // Softwares
    { category: "softwares", title: "AutoCAD", desc: "Drafting, layers and drawing tips", icon: "🖥️", color: "amber", href: "autocad.html" },

    // Library
    { category: "library", title: "Library", desc: "Books, codes and reference documents", icon: "📚", color: "blue", href: "library.html" }
  ],

  /* ---------- Quick links (right column) ----------
     logo     : image file; if it is missing, `fallback` emoji is shown instead */
  links: [
    { title: "University", subtitle: "laboratory",             href: "https://example.com", logo: "logo-lab.png",     fallback: "🎓", color: "#e6dcff" },
    { title: "YouTube",    subtitle: "youtube",                href: "https://youtube.com", logo: "logo-youtube.png", fallback: "▶️", color: "#ffd6d6" },
    { title: "Industry",   subtitle: "Your Company Co., Ltd.", href: "https://example.com", logo: "logo-company.png", fallback: "🏢", color: "#ffe8c7" }
  ]
};
