// Prüft die WCAG-Kontraste der Design-Tokens (hell + dunkel) aus src/styles.css.
// Normaler Text ≥ 4,5:1, große Schrift/Bedienelemente ≥ 3:1. Aufruf: node src/tools/check-contrast.mjs
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '..', 'styles.css'), 'utf8');
const block = (re) => Object.fromEntries([...css.match(re)[1].matchAll(/--([a-z0-9-]+):(#[0-9a-f]{3,6})/gi)].map((m) => [m[1], m[2]]));
const light = block(/:root\{([\s\S]*?)\}/);
const dark = { ...light, ...block(/:root\[data-theme=dark\]\{([\s\S]*?)\}/) };
const ALT = { light: '#efebe3', dark: '#0a101b' };

const lum = (hex) => {
  const h = hex.replace('#', '').replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

let fail = 0;
for (const [mode, t] of [['hell', light], ['dunkel', dark]]) {
  const alt = ALT[mode === 'hell' ? 'light' : 'dark'];
  const pairs = [
    ['Text / Seite', t.text, t.bg, 4.5], ['Text / Karte', t.text, t.surface, 4.5], ['Text / Abschnitt', t.text, alt, 4.5],
    ['Grau / Seite', t.muted, t.bg, 4.5], ['Grau / Karte', t.muted, t.surface, 4.5], ['Grau / Abschnitt', t.muted, alt, 4.5], ['Grau / Fläche-2', t.muted, t['surface-2'], 4.5],
    ['Link / Karte', t.accent, t.surface, 4.5], ['Link / Seite', t.accent, t.bg, 4.5], ['Knopftext / Knopf', t['on-accent'], t.accent, 4.5],
    ['Kartenrand / Abschnitt (Fläche)', t.surface, alt, 1.05],
  ];
  if (mode === 'hell') pairs.push(['Platzhalter', '#6b4b00', '#fff4d6', 4.5]);
  for (const [name, fg, bg, min] of pairs) {
    const r = ratio(fg, bg);
    const ok = r >= min;
    if (!ok) fail++;
    console.log(`${ok ? '✓' : '✗'} ${mode.padEnd(6)} ${name.padEnd(32)} ${fg} auf ${bg}  ${r.toFixed(2)}:1 (min ${min})`);
  }
}
console.log(fail ? `${fail} Kontrast-Fehler` : 'Alle Kontraste ok');
process.exit(fail ? 1 : 0);
