// Fails if forbidden terms appear anywhere in the build output (text files),
// or if a raster image other than the OG images, the touch icon, an own portrait or a screenshot of our own
// (fictional) demo websites under webseite/demo-* is shipped.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const DIR = process.argv[2] || 'dist';
const RULES = [/\b95\s?€|€\s?95\b|EUR\s?95|95 يورو|95 欧元|stundensatz|hourly rate|pricerange|\d+\s?€\/h|€\d+\/h/i,/marit/i, /radar/i, /marine/i, /naval/i, /\bsea\b/i, /seebulletin/i, /küste/i, /\bcoast/i, /بحري/, /رادار/, /البحر/, /海/, /mot-plates/i, /objektus/i, /case-(builder|export|fsapp|belege)/i, /store-veröffentlichung|store release|上架应用商店|النشر في المتاجر/i, /<img\b(?![^>]*class="(portrait|shot|shot phone)")/i, /zertifizierung|certification in preparation|FSM certification|SAP FSM 认证|شهادة SAP FSM|لشهادة SAP FSM/i];
const TEXT = new Set(['.html', '.txt', '.xml', '.json', '.svg', '.webmanifest', '.mjs', '.css', '.md', '']);
const RASTER = /\.(png|jpe?g|webp|gif|avif)$/i;
const ALLOWED_RASTER = /(^|[\\/])webseite[\\/]demo-[a-z-]+\.webp$|(^|[\\/])og[\\/]og-[a-z]+\.png$|(^|[\\/])apple-touch-icon\.png$|(^|[\\/])img[\\/]portrait\.(webp|jpe?g|png)$/i;
let hits = 0, files = 0;
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { walk(p); continue; }
    if (RASTER.test(p) && !ALLOWED_RASTER.test(p)) { hits++; console.log(`${p}: unexpected raster image`); continue; }
    if (!TEXT.has(extname(p))) continue;
    files++;
    const s = readFileSync(p, 'utf8');
    for (const r of RULES) { const m = s.match(r); if (m) { hits++; console.log(`${p}: ${r} → "${s.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, ' ')}"`); } }
  }
})(DIR);
console.log(`${files} text files checked, ${hits} hits`);
process.exit(hits ? 1 : 0);
