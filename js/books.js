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
    { title: "មេកានិច · Mechanics", author: "Hang Sim, RUPP", year: 2011, folder: "fundamentals", file: "books/fundamentals/Mechanics-Khmer-Hang-Sim.pdf", cover: "books/fundamentals/Mechanics-Khmer-Hang-Sim.jpg" },
    { title: "Structural Analysis", author: "Hibbeler · Khmer, T. Chhay", year: 2010, folder: "fundamentals", file: "books/fundamentals/Structural-Analysis-Khmer-T-Chhay.pdf", cover: "books/fundamentals/Structural-Analysis-Khmer-T-Chhay.jpg" },
    { title: "Soil Mechanics (CCES)", author: "SIENG Peou, ITC", year: 2016, folder: "geotechnical", file: "books/geotechnical/CCES-Soil-Mechanics.pdf", cover: "books/geotechnical/CCES-Soil-Mechanics.jpg" },
    { title: "Foundation (CCES)",     author: "SIENG Peou, ITC", year: 2016, folder: "geotechnical", file: "books/geotechnical/CCES-Foundation.pdf",     cover: "books/geotechnical/CCES-Foundation.jpg" },

    // Examples - remove the // and change the details once the file is in the folder:
    // { title: "Reinforced Concrete Design", author: "Author Name", year: 2020, folder: "structural",   file: "books/structural/Reinforced-Concrete-Design.pdf", cover: "books/structural/Reinforced-Concrete-Design.jpg" },
    // { title: "Soil Mechanics",             author: "Author Name", year: 2018, folder: "geotechnical", file: "books/geotechnical/Soil-Mechanics.pdf" },
  ]
};

/* On the live site, keep only the books whose file is really there.
   Book PDFs are not published (see .gitignore), so they are hidden
   online but still shown when the site is opened from this computer. */
window.kceAvailableBooks = function () {
  const books = window.KCE_BOOKS.books;
  if (!/^https?:$/.test(location.protocol)) return Promise.resolve(books);
  return Promise.all(books.map((b) =>
    fetch(encodeURI(b.file), { method: 'HEAD' }).then((r) => r.ok, () => false)
  )).then((ok) => books.filter((b, i) => ok[i]));
};
