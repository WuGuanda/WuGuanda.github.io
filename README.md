# Guanda Wu

A small personal academic homepage at **https://wuguanda.github.io/**.
Plain HTML, CSS, and JavaScript. No build step, dependencies, tracking, or cookies.

## Files

```text
index.html                 Biography, awards, photographs, links, metadata
styles.css                 Typography, layout, light/dark colours, print styles
content.js                 PDFs, optional projects, and optional YouTube URL
script.js                  Document/project lists and accessible photo controls
assets/images/guanda-wu.jpg Main portrait and social preview
assets/images/eupho-event.jpg Second carousel photograph
assets/pdfs/               Published PDFs
assets/favicon.svg         Main favicon
assets/favicon.ico         Favicon fallback
.nojekyll                  Serve these static files directly on GitHub Pages
```

## Edit the page

- **Biography:** edit the introduction in `index.html`. If its short summary changes, update the description and Open Graph metadata in the same file.
- **Achievements:** edit the six entries in `recognition-list` in `index.html`, or add another `<li>` in the same format. Keep the award, medal, and year factual.
- **LinkedIn:** edit its footer link in `index.html`. External profile links open a new tab with `noopener noreferrer`.
- **YouTube:** set `youtubeUrl` in `content.js` to your real channel URL. The link stays hidden while this value is empty; no dummy address is published.
- **Photos:** replace the JPEGs in `assets/images/`. The main portrait is 593 × 724 pixels (about 60 KB); the event photo is 1500 × 1000 pixels (about 191 KB). Both have no EXIF metadata. The carousel uses a fixed 4:5 display frame with CSS `object-fit: cover`, so changing slides never shifts the page. Update each image's dimensions and alt text in `index.html` when replacing it; also update Open Graph metadata if replacing the main portrait. Keep full-resolution originals outside the repository.
- **Appearance:** edit `styles.css`. Dark mode follows the visitor's system preference; no settings are stored.

## Photo carousel

The carousel has no autoplay or external library. Use the Previous/Next buttons, Left/Right arrow keys while focus is inside the carousel, or a horizontal swipe/drag across the photograph. Home/End select the first/last slide. Vertical touch scrolling and pinch zoom remain available.

To add a photograph, place its optimized file in `assets/images/` and copy a `.photo-slide` block in `index.html`, updating its `src`, meaningful `alt`, and actual `width`/`height`. All slides after the first should start with `hidden`. JavaScript calculates the count and accessible slide labels. The `.event-photo` rule in `styles.css` controls the event photo's crop position. Without JavaScript, the main portrait remains visible and the inactive controls stay hidden.

## Add a PDF

1. Place the file in `assets/pdfs/`, preferably using a clear filename such as `probability-notes.pdf`.
2. Add its details to `documents` in `content.js`:

```js
documents: [
  {
    title: "Your document title",
    filename: "probability-notes.pdf",
    description: "A short description, if useful.",
    category: "Mathematics",
    date: "2026-09"
  }
],
```

Only `title` and `filename` are required. The filename must be a PDF directly inside `assets/pdfs/`, without directory separators. Names with spaces or Unicode are URL-encoded automatically. Use the exact filename and letter case. Dates may be `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`; a short descriptive date is also accepted. Entries appear in the order written.

**View** opens the same-origin PDF in a new tab using the browser's normal PDF handling. **Download** links to the same file with the HTML `download` attribute. Browser preferences can affect PDF handling. No custom PDF viewer is loaded.

The Documents section and its navigation link appear automatically once the array contains a valid entry. Empty arrays publish no placeholders. The static biography and recognition remain readable without JavaScript; document and project lists require JavaScript.

## Add a project later

Add a real project to `projects` in `content.js`:

```js
projects: [
  {
    title: "Your project title",
    description: "A brief factual description.",
    date: "2026",
    url: "https://your-project-url.example/"
  }
]
```

Only `title` is required; omit optional fields that are not relevant. Use an HTTP(S) URL or a relative page path. The Projects section and link appear automatically. These examples are documentation, not published homepage entries.

## Preview and publish

Open `index.html` directly, or run a local server from this directory:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Then open http://127.0.0.1:8000/.

GitHub Pages uses **Deploy from a branch → main → / (root)**. Commit changes to `main` using GitHub's editor/upload page or an authenticated Git client. GitHub redeploys automatically; check the Pages deployment in Actions and then the public URL. There is no build command.

## Content and preservation

The homepage includes only the supplied school, subjects, interests, six awards and years, photographs, and LinkedIn profile. It omits age, future plans, unsupplied contact details, and unprovided projects or documents. The GitHub profile is not advertised on the visible page. YouTube remains hidden until its real URL is supplied.

The earlier typing-test experiment is preserved separately as `WuGuanda/WuGuanda.github.io-old`, with its original history. This repository contains the new site only.
