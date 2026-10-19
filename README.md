# TOF Solution website

Static, dependency-free site for TOF Solution (SAP Business One, SAP Field Service Management, Cloudflare & IoT).

- Languages: `/en/` (default), `/de/`, `/ar/` (RTL), `/zh/` – hreflang + x-default (`/` picks the browser language)
- Content: `src/content/*.mjs` · legal pages: `src/legal.mjs` · styles: `src/styles.css` (inlined at build)
- Fonts: IBM Plex Sans + IBM Plex Sans Arabic, self-hosted in `src/static/fonts` (SIL OFL 1.1)
- Build: `node src/build.mjs` → `dist/`; `node src/tools/check-terms.mjs dist` blocks forbidden terms (runs in CI)
- OG images / touch icon: `node src/tools/render-images.mjs` (playwright-core + local Chrome)
- Screenshots: `node src/tools/screenshots.mjs <base-url>` → `.lighthouse/shots`
- Portrait: set `PHOTO` in `src/build.mjs` once a photo exists
- No cookies, no tracking, no external fonts or scripts.
