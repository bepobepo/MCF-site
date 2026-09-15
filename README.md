# Mooncow Fest 2026 website

A single-file static site for Mooncow Fest 2026 (5–7 June, East Sussex).

# Updates
updates are welcome, please get in touch if you think anything should change.

## MOOWS / CowZine

The first web-edition preview lives at `cowzine.html`. The original submission
portal is preserved at `cowzine-submit.html`.

- `cowzine/issue-01/read/`: all 76 printed pages, rendered to JPEG for on-demand
  loading. Desktop spreads pair even and odd pages; mobile shows one page.
- `cowzine/issue-01/letters-from-the-editors/`: the first HTML article, with both
  editors' letters and social-preview metadata. Remaining contents links open
  the corresponding printed pages pending individual article adaptation.
- `assets/moows/moows.css` and `reader.js`: shared styling and reader behavior.
- `assets/moows/issue-01/page-01.jpg` through `page-76.jpg`: 1800px page renders.

Run a local static server from the repository root (for example,
`python -m http.server 8080`) and open `/cowzine.html`.

The reader uses images rather than downloading the entire PDF on entry. It offers
page navigation, keyboard arrows, touch swipes, zoom, fullscreen where supported,
and reduced-motion support. Selectable text remains available in the original PDF
and in the HTML article. The download and open-PDF links use `assets/cowzine issue 1/Cowzine LQ.pdf`
(38,894,246 bytes, 76 pages). The original high-resolution PDF is retained locally.
This preview does not publish any changes.

