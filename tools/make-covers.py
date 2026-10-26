"""
make-covers.py
Creates a cover picture for every PDF in the books/ folder, using
the first page of the PDF. The picture is saved next to the PDF
with the same name, e.g.

    books/softwares/ABAQUS CAE 2026 USER GUIDE.pdf
    books/softwares/ABAQUS CAE 2026 USER GUIDE.jpg   <- created

library.html picks up that .jpg automatically.

Run from the website folder:
    python tools/make-covers.py            (only PDFs without a cover)
    python tools/make-covers.py --force    (redo all covers)

Needs PyMuPDF:  pip install pymupdf
"""

import sys
from pathlib import Path

import pymupdf

COVER_WIDTH = 600  # pixels; enough for a sharp cover without a big file

books_dir = Path(__file__).resolve().parent.parent / "books"
force = "--force" in sys.argv

made = skipped = 0
for pdf in sorted(books_dir.rglob("*.pdf")):
    cover = pdf.with_suffix(".jpg")
    if cover.exists() and not force:
        skipped += 1
        continue
    try:
        with pymupdf.open(pdf) as doc:
            page = doc[0]
            zoom = COVER_WIDTH / page.rect.width
            pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom))
            pix.save(cover, jpg_quality=85)
        made += 1
        print(f"made     {cover.relative_to(books_dir.parent)}")
    except Exception as e:
        print(f"FAILED   {pdf.relative_to(books_dir.parent)}: {e}")

print(f"\n{made} cover(s) made, {skipped} already had one.")
