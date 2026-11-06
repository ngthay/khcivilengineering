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
     href     : page the card and menu link open
     logo     : (optional) company logo shown on the card and in the menu instead
                of the emoji; if the file is missing, the emoji is shown
     image    : (optional) realistic picture filling the card; `color` shows while it loads
     navLogo  : (optional) square logo for the small menu icon, when `logo` is a
                wide wordmark that would be unreadable at that size */
  subjects: [
    // Fundamentals
    { category: "fundamentals", title: "Dynamics",              desc: "Vibration, SDOF/MDOF and response",          icon: "📈", color: "violet", href: "dynamics.html", image: "images/cards/v2/dynamics.jpg" },
    { category: "fundamentals", title: "Mechanics",             desc: "Kinematics, dynamics, energy and rigid bodies",      icon: "⚙️", color: "rose",   href: "mechanics.html", image: "images/cards/v2/mechanics.jpg" },
    { category: "fundamentals", title: "Strength of Materials", desc: "Axial, bending, shear and torsion",           icon: "🔩", color: "mint",   href: "strength.html", image: "images/cards/v2/strength.jpg" },
    { category: "fundamentals", title: "Structural Analysis",   desc: "Beams, frames, trusses and influence lines",  icon: "🌉", color: "peach",  href: "analysis.html", image: "images/cards/v2/structural-analysis.jpg" },

    // Structural
    { category: "structural", title: "Design",       desc: "Loads, combinations and design checks",      icon: "📐", color: "blue",  href: "design.html", image: "images/cards/v2/design.jpg" },
    { category: "structural", title: "Concrete",     desc: "Reinforced concrete beams, columns, slabs",  icon: "🧱", color: "peach", href: "concrete.html", image: "images/cards/v2/concrete.jpg" },
    { category: "structural", title: "Steel",        desc: "Members, connections and buckling",          icon: "🏗️", color: "lilac", href: "steel.html", image: "images/cards/v2/steel.jpg" },
    { category: "structural", title: "Geo (Ground)", desc: "Soil mechanics and foundation engineering", icon: "⛰️", color: "pink",  href: "geo.html", image: "images/cards/v2/geo.jpg", pages: ["soil-mechanics.html", "foundation.html"] },

    // Computing
    { category: "computing", title: "AI (Artificial Intelligence)", desc: "Machine learning for engineering",   icon: "🤖", color: "mag", href: "ai.html", image: "images/cards/ai.jpg" },
    { category: "computing", title: "Python",                       desc: "Scripts and tools for calculations", icon: "🐍", color: "sky", href: "python.html", image: "images/cards/python.jpg", logo: "images/logos/python.svg" },

    // Softwares
    { category: "softwares", title: "AutoCAD",   desc: "Drafting, layers and drawing tips",        icon: "🖥️", color: "amber", href: "autocad.html", image: "images/cards/autocad.jpg", logo: "images/logos/autocad.svg" },
    { category: "softwares", title: "Abaqus",    desc: "Finite element analysis and simulation",   icon: "🧊", color: "lilac", href: "abaqus.html", image: "images/cards/abaqus.jpg",  logo: "images/logos/abaqus-cae.svg" },
    { category: "softwares", title: "ETABS",     desc: "Building analysis and design",             icon: "🏢", color: "mint",  href: "etabs.html", image: "images/cards/etabs.jpg",     logo: "images/logos/etabs-icon.svg" },
    { category: "softwares", title: "Midas Gen", desc: "General structural analysis and design",   icon: "🏛️", color: "rose",  href: "midas-gen.html", image: "images/cards/midas-gen.jpg", logo: "images/logos/midas-gen.png" },

    // Library
    { category: "library", title: "Library", desc: "Books, codes and reference documents", icon: "📚", color: "blue", href: "library.html", image: "images/cards/library.jpg", navIcon: "images/icons/library.svg" }
  ],

  /* ---------- Quick links (right column) ----------
     logo     : image file; if it is missing, `fallback` emoji is shown instead */
  links: [
    { title: "University", subtitle: "laboratory",             href: "https://example.com", logo: "logo-lab.png",     fallback: "🎓", color: "#e6dcff" },
    { title: "YouTube",    subtitle: "youtube",                href: "https://youtube.com", logo: "logo-youtube.png", fallback: "▶️", color: "#ffd6d6" },
    { title: "Industry",   subtitle: "Your Company Co., Ltd.", href: "https://example.com", logo: "logo-company.png", fallback: "🏢", color: "#ffe8c7" }
  ]
};
