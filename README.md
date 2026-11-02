# KCE — Civil Engineering Learning Site

A static website (HTML, CSS, vanilla JavaScript — no build step) with lesson courses for civil engineers:

| Page | Course |
|---|---|
| `concrete.html` | Reinforced Concrete Design — 14 lessons, ACI 318M-19 / ASCE 7-22 |
| `strength.html` | Strength of Materials — 18 lessons (after R.K. Bansal) |
| `mechanics.html` | Mechanics: Kinematics and Dynamics — 12 lessons (translated from Hang Sim) |
| `autocad.html` | AutoCAD for Engineers — 9 lessons and shortcut reference |
| `library.html` | Book library |

Lesson content lives in `js/lessons/<course>/`, one file per lesson; `js/lesson.js` renders them.
Equations use KaTeX from a CDN, so the pages need an internet connection.

## Run locally
Open `index.html` in a browser, or serve the folder: `python -m http.server`.

## Publish with GitHub Pages
Repository → Settings → Pages → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)`.

PDF files in `books/` are not committed (see `.gitignore`).
