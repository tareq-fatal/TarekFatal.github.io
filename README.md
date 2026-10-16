# tarekfatal.com

Static, dependency-free landing page for TOF Solution (TOF Solution) – SAP Field Service Management & integration.

- Languages: `/en/` (default), `/de/`, `/ar/` (RTL), `/zh/` – hreflang + x-default (`/` picks the browser language)
- Content: `src/content/*.mjs` · legal pages: `src/legal.mjs` · styles: `src/styles.css` (inlined at build)
- Build: `node src/build.mjs` → `dist/` (GitHub Actions deploys `dist/` to GitHub Pages on push to `main`)
- OG images / touch icon: `node src/tools/render-images.mjs` (needs `playwright-core` + local Chrome)
- Screenshots: `node src/tools/screenshots.mjs http://127.0.0.1:4791/`
- No cookies, no tracking, no external fonts or scripts.
