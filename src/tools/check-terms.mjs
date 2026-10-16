// Fails if forbidden terms appear anywhere in the build output (text files).
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const DIR = process.argv[2] || 'dist';
const RULES = [/\b95\s?€|€\s?95\b|EUR\s?95|95 يورو|95 欧元|stundensatz|hourly rate|pricerange|\d+\s?€\/h|€\d+\/h/i,/marit/i, /radar/i, /marine/i, /naval/i, /\bsea\b/i, /seebulletin/i, /küste/i, /\bcoast/i, /بحري/, /رادار/, /البحر/, /海/, /mot-plates/i, /objektus/i];
const TEXT = new Set(['.html', '.txt', '.xml', '.json', '.svg', '.webmanifest', '.mjs', '.css', '.md', '']);
let hits = 0, files = 0;
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (!TEXT.has(extname(p))) continue;
    files++;
    const s = readFileSync(p, 'utf8');
    for (const r of RULES) { const m = s.match(r); if (m) { hits++; console.log(`${p}: ${r} → "${s.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, ' ')}"`); } }
  }
})(DIR);
console.log(`${files} text files checked, ${hits} hits`);
process.exit(hits ? 1 : 0);
