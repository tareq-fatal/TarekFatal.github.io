// Fails if a personal name shows up in the build output. The domain itself and the mailto target are ignored.
// Patterns are stored base64-encoded so that this file does not contain the names itself.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const dec = (s) => Buffer.from(s, 'base64').toString('utf8');
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const NAMES = ['dGFyZWs=', 'ZmF0YWw=', 'bWhk', 'bW9oYW1tZWQ=', '2LfYp9ix2YI=', '2YHYqtin2YQ=', '5aGU6YeM5YWL'].map(dec);
const NAME = new RegExp(NAMES.map(esc).join('|'), 'gi');
const LATIN = new RegExp(NAMES.slice(0, 2).map(esc).join('|'), 'i');
const MAILTO = new RegExp(esc(dec('bWFpbHRvOlRhcmVrQHRhcmVrZmF0YWwuY29t')), 'gi');
const DOMAIN = new RegExp(esc(dec('dGFyZWtmYXRhbC5jb20=')), 'gi');
const DIR = process.argv[2] || 'dist';
let hits = 0;
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (LATIN.test(f)) { hits++; console.log('file name:', p); }
    if (/\.(png|woff2)$/i.test(f)) {
      if (LATIN.test(readFileSync(p).toString('latin1'))) { hits++; console.log('binary/metadata:', p); }
      continue;
    }
    const s = readFileSync(p, 'utf8').replace(MAILTO, 'mailto:[ADDR]').replace(DOMAIN, '[DOMAIN]');
    for (const m of s.matchAll(NAME)) { hits++; console.log(`${p}: "${s.slice(Math.max(0, m.index - 40), m.index + 30).replace(/\s+/g, ' ')}"`); }
  }
})(DIR);
console.log(`name hits (excluding domain and mailto target): ${hits}`);
process.exit(hits ? 1 : 0);
