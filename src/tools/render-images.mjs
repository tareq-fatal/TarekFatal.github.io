// Renders Open Graph images (1200×630) and apple-touch-icon (180×180) into src/static.
// Needs playwright-core + a local Chrome:  node src/tools/render-images.mjs
import { chromium } from 'playwright-core';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import en from '../content/en.mjs';
import de from '../content/de.mjs';
import ar from '../content/ar.mjs';
import zh from '../content/zh.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const STATIC = join(ROOT, 'src/static');
const chrome = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const og = (c) => `<!doctype html><html lang="${c.htmlLang}" dir="${c.dir}"><head><meta charset="utf-8"><style>
*{margin:0;box-sizing:border-box}html{overflow:hidden;width:1200px;height:630px}
body{width:1200px;height:630px;background:#0a101d;color:#e9eef6;font-family:${c.lang === 'ar' ? '"Segoe UI",Tahoma' : c.lang === 'zh' ? '"Microsoft YaHei","PingFang SC"' : '"Segoe UI",system-ui'},sans-serif;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
body::after{content:"";position:absolute;right:-160px;top:-160px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(106,174,255,.35),transparent 65%)}
.top{display:flex;align-items:center;gap:18px;font-size:30px;font-weight:700}
.m{width:64px;height:64px;border-radius:16px;background:#6aaeff;color:#06121f;display:grid;place-items:center;font-weight:800;font-size:28px}
h1{font-size:${c.lang === 'en' || c.lang === 'de' ? 62 : 58}px;line-height:1.25;max-width:980px;font-weight:750;position:relative}
.tags{display:flex;gap:14px;flex-wrap:wrap;direction:ltr;justify-content:${c.dir === 'rtl' ? 'flex-end' : 'flex-start'}}
.tags span{border:2px solid #24324d;border-radius:999px;padding:10px 22px;font-size:24px;color:#a6b3c6;font-family:"Segoe UI",system-ui,sans-serif}
</style></head><body><div class="top"><div class="m">TF</div><div>TOF Solution · TOF Solution</div></div>
<h1>${c.footer.tagline}</h1>
<div class="tags"><span>SAP FSM</span><span>SAP Business One</span><span>S/4HANA</span><span>Cloudflare</span><span>IoT</span></div></body></html>`;

const icon = `<!doctype html><html><body style="margin:0;width:180px;height:180px;background:#0a5bc4;display:grid;place-items:center;font:800 78px 'Segoe UI',system-ui,sans-serif;color:#fff">TF</body></html>`;

const browser = await chromium.launch({ executablePath: chrome });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of [en, de, ar, zh]) {
  await page.setContent(og(c));
  await page.screenshot({ path: join(STATIC, 'og', `og-${c.lang}.png`) });
}
await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(icon);
await page.screenshot({ path: join(STATIC, 'apple-touch-icon.png') });
await browser.close();
console.log('Images rendered');
