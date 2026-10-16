// Full-page screenshots (desktop + mobile, light + dark) → .lighthouse/shots
import { chromium } from 'playwright-core';
const base = process.argv[2] || 'http://localhost:4173/';
const out = process.argv[3] || '.lighthouse/shots';
const browser = await chromium.launch({ executablePath: process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const views = [['desktop', { width: 1440, height: 900 }, 1], ['mobile', { width: 390, height: 844 }, 2]];
for (const lang of ['en', 'de', 'ar', 'zh']) for (const [name, viewport, dpr] of views) for (const scheme of ['light', 'dark']) {
  if (scheme === 'dark' && lang !== 'en' && lang !== 'ar') continue;
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: dpr, colorScheme: scheme, isMobile: name === 'mobile', hasTouch: name === 'mobile' });
  const p = await ctx.newPage();
  await p.goto(base + lang + '/', { waitUntil: 'networkidle' });
  await p.evaluate(async () => { document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager')); await Promise.race([Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))), new Promise((r) => setTimeout(r, 5000))]); });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await p.screenshot({ path: `${out}/${lang}-${name}-${scheme}.png`, fullPage: true });
  console.log(lang, name, scheme, 'horizontal overflow px:', overflow);
  await ctx.close();
}
await browser.close();
