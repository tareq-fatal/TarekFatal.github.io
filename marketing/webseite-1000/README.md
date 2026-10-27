# Werbepaket „Webseite zum Festpreis 1.000 €“

Alles für Facebook, Instagram und WhatsApp – auf Deutsch und Arabisch. Ziel: Erstgespräche über
**https://tarekfatal.com/webseite/** (DE), **/ar/website/** (AR), **/en/website/** (EN).

| Datei | Inhalt |
|---|---|
| [posts.md](posts.md) | 6 Beiträge mit Text (DE + AR), Hashtags, passendem Bild |
| [reels.md](reels.md) | 2 Reel-Skripte (je ca. 30 Sekunden), Szenen, Texteinblendungen, Sprechertext |
| [gruppen.md](gruppen.md) | 15 Facebook-Gruppen-Suchen (Emsdetten/Münsterland + arabischsprachige Unternehmer in DE) |
| [plan.md](plan.md) | Posting-Plan für 2 Wochen |
| `bilder/post-*-de.png`, `bilder/post-*-ar.png` | 6 Beitragsbilder je Sprache, 1080 × 1080 |
| `bilder/story-*-de.png`, `bilder/story-*-ar.png` | 2 Story-/Reel-Titelbilder je Sprache, 1080 × 1920, mit QR-Code |
| Angebots-PDF (1 Seite) | https://tarekfatal.com/webseite/angebot-webseite.pdf · AR: `angebot-webseite-ar.pdf` · EN: `offer-website-en.pdf` |

Bilder neu erzeugen (z. B. nach Preisänderung in `src/content/webseite.mjs`):
`NODE_PATH=C:/dev/node_modules node src/tools/render-offer.mjs` (braucht playwright-core + qrcode + Chrome).

## Musterseiten (fiktive Betriebe)

- Handwerk: https://demo-malerbetrieb.pages.dev/
- Praxis: https://demo-physio-dhm.pages.dev/
- Restaurant: https://demo-trattoria-8pb.pages.dev/

## Wichtig vor dem Posten

1. **Gruppenregeln lesen.** Viele lokale Gruppen verbieten Werbung oder erlauben sie nur an bestimmten Tagen. Im Zweifel die Admins kurz fragen.
2. **Nicht spammen:** pro Gruppe höchstens 1 Beitrag pro Woche, Kommentare persönlich beantworten.
3. **Preis ehrlich:** 1.000 € zzgl. 19 % MwSt. (1.190 € brutto). Falls TOF Solution Kleinunternehmer (§ 19 UStG) ist: in `src/content/webseite.mjs` `VAT_RATE = 0` setzen, Seite + Bilder + PDF neu bauen und in den Texten „zzgl. MwSt.“ durch „Endpreis“ ersetzen.
4. **Keine Vergleichswerbung** mit Namen anderer Anbieter (rechtlich heikel) – „Festpreis statt Überraschungen“ reicht.
5. **Fotos von Kunden** erst nach schriftlicher Erlaubnis verwenden.

## Terminbuchung

Auf der Angebotsseite gibt es ein eigenes, schlankes Buchungsformular (kein Fremdkonto, keine Daten auf einem Server):
Kunde wählt Tag + Uhrzeit aus freien Slots → sein E-Mail-Programm öffnet eine fertige Anfrage an die bekannte Adresse →
Bestätigungsseite + Kalenderdatei (.ics, „vorläufig“). **Bestätigung des Termins erfolgt persönlich per WhatsApp/Telefon.**
Freie Zeiten ändern: `SLOTS` in `src/content/webseite.mjs` (Wochentage, Uhrzeiten, Tage im Voraus, Vorlauf in Stunden).

Grenze: Die Slots kennen keine schon vergebenen Termine (kein Server). Bei Doppelbuchung einfach einen anderen Termin vorschlagen.

### Optional: Cal.com (kostenlos) statt eigenem Formular

Nur falls gewünscht – **Konto selbst anlegen**, nichts davon ist eingerichtet:
1. Auf cal.com kostenlos registrieren, Kalender (Google/Outlook) verbinden, Ereignistyp „Erstgespräch Webseite, 15 Min.“ anlegen.
2. Link kopieren (z. B. `https://cal.com/<name>/erstgespraech`).
3. Einfachste Variante: In `src/webseite.mjs` im Abschnitt `#termin` zusätzlich einen Knopf „Termin direkt im Kalender wählen“ mit diesem Link einfügen (externer Link, kein eingebettetes Skript → keine Cookies auf tarekfatal.com).
4. Datenschutzerklärung um Cal.com ergänzen (Anbieter, Zweck, Datenübermittlung), bevor der Knopf live geht.
