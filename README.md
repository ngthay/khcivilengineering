# KCE — Civil Engineering Learning Site

A static website (HTML, CSS, vanilla JavaScript — no build step) with lesson courses for civil engineers:

| Page | Course |
|---|---|
| `concrete.html` | Reinforced Concrete Design — 14 lessons, ACI 318M-19 / ASCE 7-22 |
| `strength.html` | Strength of Materials — 18 lessons (after R.K. Bansal) |
| `mechanics.html` | Mechanics: Kinematics and Dynamics — 12 lessons (translated from Hang Sim) |
| `steel.html` | Structural Steel Design — 13 lessons (after the Steel Designers’ Handbook, AS 4100) |
| `geo.html` | Geo (Ground) hub: `soil-mechanics.html` (10 lessons) and `foundation.html` (11 lessons), translated from the CCES notes of SIENG Peou (ITC) |
| `analysis.html` | Structural Analysis — 16 lessons (translated from T. Chhay’s Khmer edition of Hibbeler) |
| `abaqus.html` | Abaqus/CAE — 13 lessons, 10 projects (linear, nonlinear, dynamic) from a Udemy video course |
| `dynamics.html` | Structural Dynamics — 14 lessons (SDOF, MDOF, modal superposition, UBC-97 / IBC-2000) from Paz & Leigh |
| `etabs.html` | ETABS — 6 lessons (workflow + portal-frame example) from a Khmer ETABS 9.7 guide, with its screenshots in `images/etabs/` |
| `python.html` | Python for Civil Engineers — 12 lessons (basics to NumPy, SciPy, pandas, a frame solver, response spectra, OpenSeesPy, automation); code blocks via `js/code-blocks.js`, figures in `images/python/` |
| `ai.html` | AI and Machine Learning for Civil Engineers — 10 lessons (regression, classification, trees, neural networks, validation, clustering, computer vision, practice); figures in `images/ai/` |
| `midas-gen.html` | midas Gen — 5 lessons following the MIDAS IT tutorial “Seismic Design for Reinforced Concrete Building” (ASCE 7-10, ACI 318-11), rewritten with own drawings and hand checks; the tutorial’s screenshots are shown from support.midasuser.com, not stored here |
| `autocad.html` | AutoCAD for Engineers — 9 lessons and shortcut reference |
| `library.html` | Book library |

Lesson content lives in `js/lessons/<course>/`, one file per lesson; `js/lesson.js` renders them.
After adding, removing or renaming lessons, run `python tools/make-lesson-index.py` — it rebuilds
`js/lesson-index.js`, the lesson lists shown by the “View All” buttons on the home page.
Equations use KaTeX from a CDN, so the pages need an internet connection.

## Run locally
Open `index.html` in a browser, or serve the folder: `python -m http.server`.

## Publish with GitHub Pages
Repository → Settings → Pages → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)`.

PDF files in `books/` are not committed (see `.gitignore`).
