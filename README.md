# Guanda Wu

A small personal academic homepage at **https://wuguanda.github.io/**.
Plain HTML, CSS, and JavaScript. No build step, dependencies, tracking, or cookies.

## Files

```text
index.html                 Biography, recognition, navigation, links, metadata
styles.css                 Typography, layout, light/dark colours, print styles
content.js                 PDF documents and optional projects
script.js                  Renders the lists in content.js
assets/images/guanda-wu.jpg Optimized event photograph
assets/pdfs/               Published PDFs
assets/favicon.svg         Main favicon
assets/favicon.ico         Favicon fallback
.nojekyll                  Serve these static files directly on GitHub Pages
```

## Edit the page

- **Biography:** edit the introduction in `index.html`. If its short summary changes, update the description and Open Graph metadata in the same file.
- **Achievements:** add a `<li>` to the `recognition-list` in `index.html`, following the existing EuPhO entry. Add only verified achievements.
- **Links:** edit the footer links in `index.html`. Add an email link only when you want to publish that address.
- **Photo:** replace `assets/images/guanda-wu.jpg` with an optimized JPEG. The current uncropped event photograph is 1500 × 1000 pixels, about 175 KB, with EXIF metadata removed. For a close portrait, a 4:5 crop at 600 × 750 pixels is sufficient. Update the image and Open Graph dimensions, alt text, and caption in `index.html` when changing the image. Keep the large original outside the repository.
- **Appearance:** edit `styles.css`. Dark mode follows the visitor's system preference; no settings are stored.

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

The homepage includes only the supplied school, subjects, interests, and European Physics Olympiad Silver award. It omits age, future plans, unsupplied contact details, and unprovided projects or documents.

The earlier typing-test experiment is preserved separately as `WuGuanda/WuGuanda.github.io-old`, with its original history. This repository contains the new site only.
