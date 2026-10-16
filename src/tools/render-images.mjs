// Renders Open Graph images (1200×630) and apple-touch-icon (180×180) into src/static.
// Needs playwright-core + a local Chrome:  node src/tools/render-images.mjs
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import en from '../content/en.mjs';
import de from '../content/de.mjs';
import ar from '../content/ar.mjs';
import zh from '../content/zh.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const STATIC = join(ROOT, 'src/static');
const chrome = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const font = (f) => `url(data:font/woff2;base64,${readFileSync(join(STATIC, 'fonts', f)).toString('base64')}) format("woff2")`;
const faces = `@font-face{font-family:Plex;src:${font('plex-sans-latin.woff2')};font-weight:100 700}
@font-face{font-family:"Plex Arabic";src:${font('plex-arabic-400.woff2')};font-weight:400}
@font-face{font-family:"Plex Arabic";src:${font('plex-arabic-600.woff2')};font-weight:500 700}`;
const mark = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 36 36"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b7bff"/><stop offset="1" stop-color="#19c3b1"/></linearGradient></defs><rect width="36" height="36" rx="10" fill="url(#g)"/><path d="M11 12h14M18 12v13" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="11" cy="12" r="2.7" fill="#fff"/><circle cx="25" cy="12" r="2.7" fill="#fff"/><circle cx="18" cy="25" r="2.7" fill="#fff"/></svg>`;

const og = (c) => `<!doctype html><html lang="${c.htmlLang}" dir="${c.dir}"><head><meta charset="utf-8"><style>${faces}
*{margin:0;box-sizing:border-box}html{overflow:hidden;width:1200px;height:630px}
body{width:1200px;height:630px;background:#071226;color:#eef3fb;font-family:${c.lang === 'ar' ? '"Plex Arabic",Plex' : c.lang === 'zh' ? 'Plex,"Microsoft YaHei"' : 'Plex'},sans-serif;padding:76px 84px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
body::before{content:"";position:absolute;inset:0;background:radial-gradient(700px 420px at ${c.dir === 'rtl' ? '10%' : '90%'} 0%,rgba(47,107,234,.45),transparent 65%),radial-gradient(600px 400px at ${c.dir === 'rtl' ? '95%' : '5%'} 110%,rgba(25,195,177,.22),transparent 65%)}
body::after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:60px 60px;-webkit-mask-image:radial-gradient(ellipse 80% 80% at 50% 30%,#000,transparent 75%)}
.top,.h,.tags{position:relative;z-index:1}
.top{display:flex;align-items:center;gap:20px;font:600 34px Plex,sans-serif;direction:ltr;${c.dir === 'rtl' ? 'justify-content:flex-end' : ''}}
.top i{font-style:normal;color:#b4c0d4;font-weight:500}
.h{font-size:${c.lang === 'zh' ? 60 : c.lang === 'ar' ? 62 : 66}px;line-height:1.2;font-weight:600;letter-spacing:${c.lang === 'en' || c.lang === 'de' ? '-.02em' : '0'};max-width:1000px}
.h span{background:linear-gradient(90deg,#9cc0ff,#6fe6d8);-webkit-background-clip:text;color:transparent}
.tags{display:flex;gap:14px;flex-wrap:wrap;direction:ltr;${c.dir === 'rtl' ? 'justify-content:flex-end' : ''}}
.tags b{border:1.5px solid rgba(255,255,255,.18);background:rgba(255,255,255,.04);border-radius:999px;padding:10px 22px;font:500 24px Plex,sans-serif;color:#c9d4e6}
</style></head><body><div class="top">${mark(64)}<div><b>TOF</b> <i>Solution</i></div></div>
<div class="h">${c.tagline.replace(/(SAP FSM)/, '<span>$1</span>')}</div>
<div class="tags"><b>SAP Business One</b><b>SAP FSM</b><b>S/4HANA</b><b>Cloudflare</b><b>IoT</b></div></body></html>`;

const iconPage = `<!doctype html><html><body style="margin:0;width:180px;height:180px;background:#071226;display:grid;place-items:center">${mark(180)}</body></html>`;

const browser = await chromium.launch({ executablePath: chrome });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of [en, de, ar, zh]) {
  await page.setContent(og(c));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(STATIC, 'og', `og-${c.lang}.png`) });
}
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(iconPage);
await page.screenshot({ path: join(STATIC, 'apple-touch-icon.png') });
await browser.close();
console.log('Images rendered');
