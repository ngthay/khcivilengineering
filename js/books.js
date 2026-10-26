/* =========================================================
   books.js
   The folders and book files shown on library.html.

   To add a book:
     1. Copy the file into a subfolder of books/
     2. Add one entry to `books` below
   A browser cannot look inside a folder by itself, so a
   file only appears on the website once it is listed here.
   ========================================================= */

window.KCE_BOOKS = {

  /* ---------- Folders (match the subfolders of books/) ----------
     color : folder and cover color, one of the --card-* names in css/variables.css */
  folders: [
    { id: "fundamentals", label: "Fundamentals", icon: "📈", color: "violet" },
    { id: "structural",   label: "Structural",   icon: "🏗️", color: "peach" },
    { id: "geotechnical", label: "Geotechnical", icon: "⛰️", color: "pink" },
    { id: "computing",    label: "Computing",    icon: "🐍", color: "sky" },
    { id: "softwares",    label: "Softwares",    icon: "🖥️", color: "amber" },
    { id: "standards",    label: "Standards",    icon: "📏", color: "mint" }
  ],

  /* ---------- Books ----------
     title  : shown on the cover and under it
     author : optional
     year   : optional
     folder : one of the folder ids above
     file   : path to the book file, starting with books/
     cover  : optional picture of the front cover (jpg/png). Without it,
              a colored cover with the title is drawn instead. */
  books: [
    { title: "ABAQUS CAE 2026 User Guide", author: "Dassault Systèmes", year: 2026, folder: "softwares", file: "books/softwares/ABAQUS CAE 2026 USER GUIDE.pdf" },

    // Examples - remove the // and change the details once the file is in the folder:
    // { title: "Reinforced Concrete Design", author: "Author Name", year: 2020, folder: "structural",   file: "books/structural/Reinforced-Concrete-Design.pdf", cover: "books/structural/Reinforced-Concrete-Design.jpg" },
    // { title: "Soil Mechanics",             author: "Author Name", year: 2018, folder: "geotechnical", file: "books/geotechnical/Soil-Mechanics.pdf" },
  ]
};
