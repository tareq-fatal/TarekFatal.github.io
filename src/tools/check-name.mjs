// Reports any occurrence of the owner's name in the build output, ignoring the domain itself.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const DIR = process.argv[2] || 'dist';
const NAME = /TOF|TOF|TOF|TOF|TOF|TOF/gi;
let hits = 0;
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (/(^|[\/])(TOF|TOF)/i.test(f)) { hits++; console.log('file name:', p); }
    if (/\.(png|woff2)$/i.test(f)) {
      const b = readFileSync(p).toString('latin1');
      if (/TOF|TOF/i.test(b)) { hits++; console.log('binary/metadata:', p); }
      continue;
    }
    const s = readFileSync(p, 'utf8').replace(/mailto:TOF@TOFTOF\.com/g, 'mailto:[ADDR]').replace(/TOFTOF\.com/gi, '[DOMAIN]');
    for (const m of s.matchAll(NAME)) { hits++; console.log(`${p}: "${s.slice(Math.max(0, m.index - 40), m.index + 30).replace(/\s+/g, ' ')}"`); }
  }
})(DIR);
console.log(`name hits (excluding domain and mailto target): ${hits}`);
process.exit(hits ? 1 : 0);
