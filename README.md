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

## Angebot „Webseite zum Festpreis“

- Seiten: `/webseite/` (DE), `/en/website/`, `/ar/website/` – Inhalte und Preis/Slots in `src/content/webseite.mjs`, Vorlage in `src/webseite.mjs`
- Terminbuchung ohne Fremdkonto: freie Slots im Browser, fertige E-Mail an die Kontaktadresse, Bestätigung + .ics
- Demo-Screenshots `src/static/webseite/demo-*.webp` (eigene, fiktive Musterseiten; Repo `webseite-demos`), PDFs + OG-Bild: `node src/tools/render-offer.mjs`
- Werbepaket: `marketing/webseite-1000/` (nicht Teil der ausgelieferten Seite)

## Persönliche Profilseite (Branch `profil-2026`)

- Startseiten DE (`/`), EN (`/en/`), AR (`/ar/`) = persönliches Freelance-Profil (SAP Business One & SAP FSM), Vorlage `src/profile.mjs`, Texte `src/content/profil.mjs`
- **Platzhalter** (gelb gestrichelt markiert) in `PROFILE` eintragen: Name, Foto, Verfügbarkeit, Auslastung, Profil-Links, Profil-PDF
- Chinesisch entfällt; `/zh/` leitet auf `/en/` um
- Kontrast-Check: `node src/tools/check-contrast.mjs` (läuft auch in CI)
- Vorschau-Build ohne Indexierung: `PREVIEW=1 node src/build.mjs` → Cloudflare Pages Projekt `tarekfatal-vorschau`
