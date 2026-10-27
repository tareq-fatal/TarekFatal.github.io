// Erzeugt für das Angebot „Webseite zum Festpreis“:
//  - src/static/og/og-webseite.png (1200×630, Vorschaubild für geteilte Links)
//  - src/static/webseite/angebot-webseite.pdf, offer-website-en.pdf, angebot-webseite-ar.pdf (1 Seite A4)
//  - marketing/webseite-1000/bilder/*.png (Beiträge 1080×1080, Storys/Reels 1080×1920, DE + AR)
// Braucht playwright-core + qrcode (in C:\dev\node_modules) und lokales Chrome:  node src/tools/render-offer.mjs
import { chromium } from 'playwright-core';
import QRCode from 'qrcode';
import { readFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { T, DEMOS } from '../content/webseite.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const STATIC = join(ROOT, 'src/static');
const MKT = join(ROOT, 'marketing/webseite-1000/bilder');
mkdirSync(MKT, { recursive: true });
const URL_DE = 'https://tarekfatal.com/webseite/';
const chrome = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const b64 = (p) => readFileSync(p).toString('base64');
const font = (f) => `url(data:font/woff2;base64,${b64(join(STATIC, 'fonts', f))}) format("woff2")`;
const img = (f) => `data:image/webp;base64,${b64(join(STATIC, 'webseite', f))}`;
const qr = async (url, dark = '#1d2433') => (await QRCode.toString(url, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark, light: '#ffffff' } })).replace('<svg', '<svg class="qr"');
const mark = (s) => `<svg width="${s}" height="${s}" viewBox="0 0 36 36"><defs><linearGradient id="g${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b7bff"/><stop offset="1" stop-color="#19c3b1"/></linearGradient></defs><rect width="36" height="36" rx="10" fill="url(#g${s})"/><path d="M11 12h14M18 12v13" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="11" cy="12" r="2.7" fill="#fff"/><circle cx="25" cy="12" r="2.7" fill="#fff"/><circle cx="18" cy="25" r="2.7" fill="#fff"/></svg>`;
const tick = '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
const cross = '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';

const base = (lang) => `@font-face{font-family:Plex;src:${font('plex-sans-latin.woff2')};font-weight:100 700}
@font-face{font-family:"Plex Arabic";src:${font('plex-arabic-400.woff2')};font-weight:400}
@font-face{font-family:"Plex Arabic";src:${font('plex-arabic-600.woff2')};font-weight:500 700}
*{margin:0;box-sizing:border-box}
body{font-family:${lang === 'ar' ? '"Plex Arabic",Plex' : 'Plex'},sans-serif;color:#1d2433;background:#f8f6f1;-webkit-font-smoothing:antialiased}
.em{background:linear-gradient(90deg,#2a58c2,#12877b);-webkit-background-clip:text;color:transparent}
.brand{display:flex;align-items:center;gap:14px;font:600 30px Plex,sans-serif;direction:ltr}
.brand i{font-style:normal;color:#525b6a;font-weight:500}
.phone{border:10px solid #1d2433;border-radius:40px;overflow:hidden;background:#fff;box-shadow:0 30px 60px -20px rgba(29,36,51,.45)}
.phone img{display:block;width:100%}
.browser{border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 30px 60px -20px rgba(29,36,51,.4);border:1px solid #e5e0d5}
.browser .top{height:30px;background:#ece8df;display:flex;gap:8px;align-items:center;padding:0 14px}
.browser .top b{width:11px;height:11px;border-radius:50%;background:#d4cdbf}
.browser img{display:block;width:100%}
.ticks{list-style:none;padding:0;display:grid}
.ticks li{display:flex;gap:.55em;align-items:flex-start}
.ticks svg{color:#2d774c;flex:none;margin-top:.18em}
.oldsite{font-family:"Times New Roman",serif;color:#000;background:#c0c0c0;height:100%;direction:ltr;text-align:left}
.os-top{background:#000080;color:#ff0;font-weight:700;text-align:center;padding:14px 6px;font-family:"Comic Sans MS",cursive;font-size:24px}
.os-row{display:flex;height:100%}.os-row ul{background:#008080;margin:0;padding:12px 8px 12px 26px;color:#fff;width:120px;line-height:2;text-decoration:underline;font-size:15px}
.os-main{padding:12px;background:#fff;flex:1;font-size:15px}.os-marq{color:red;font-weight:700}.os-img{height:150px;background:repeating-linear-gradient(45deg,#ddd 0 10px,#eee 10px 20px);border:2px inset #999;margin:10px 0}
.qr{width:100%;height:auto;display:block}`;

const oldSite = (o) => `<div class="oldsite"><div class="os-top">${o.welcome}</div><div class="os-row"><ul>${o.items.map((i) => `<li>${i}</li>`).join('')}</ul><div class="os-main"><p class="os-marq">+++ NEU +++</p><p>${o.text}</p><div class="os-img"></div><p>${o.update}</p><div class="os-img"></div></div></div></div>`;

// ---------- Social-Media-Vorlagen ----------
const S = {
  de: {
    p1: ['Ihre neue Webseite', 'zum Festpreis'], p1sub: 'zzgl. MwSt. · in 7 Tagen online', cta: 'tarekfatal.com/webseite',
    p2h: 'Das ist alles drin', p3h: 'Vorher → Nachher', p3sub: 'Vom Baukasten-Relikt zur Seite, die auf dem Handy verkauft.',
    p4h: 'Musterseite Handwerk', p4sub: 'Anrufen, WhatsApp, Anfrage – mit einem Daumen.',
    p5h: 'Für Praxis, Restaurant & Laden', p5sub: 'Öffnungszeiten, Speisekarte, Termin – alles auf einen Blick.',
    p6h: 'So einfach geht’s', story1: ['Webseite', 'Festpreis'], story2: 'Ihre Kunden suchen Sie zuerst auf dem Handy.', book: 'Kostenloses Erstgespräch:', scan: 'QR scannen',
    labels: ['Handwerk', 'Praxis', 'Restaurant'],
  },
  ar: {
    p1: ['موقعك الإلكتروني الجديد', 'بسعر ثابت'], p1sub: '+ ضريبة القيمة المضافة · جاهز خلال 7 أيام', cta: 'tarekfatal.com/ar/website',
    p2h: 'كل ما يشمله العرض', p3h: 'قبل ← بعد', p3sub: 'من موقع قديم إلى موقع يبيع على الجوال.',
    p4h: 'نموذج لموقع حِرفي', p4sub: 'اتصال، واتساب، طلب – بضغطة إصبع.',
    p5h: 'للعيادات والمطاعم والمحلات', p5sub: 'أوقات العمل، قائمة الطعام، المواعيد – كل شيء بنظرة واحدة.',
    p6h: 'بكل بساطة', story1: ['موقع إلكتروني', 'بسعر ثابت'], story2: 'زبائنك يبحثون عنك أولاً على الجوال.', book: 'مكالمة تعارف مجانية:', scan: 'امسح الرمز',
    labels: ['حِرف', 'عيادة', 'مطعم'],
  },
};

function frame(lang, w, h, inner, extraCss = '') {
  const t = T[lang];
  return `<!doctype html><html lang="${lang}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><style>${base(lang)}
html,body{width:${w}px;height:${h}px;overflow:hidden}
body{position:relative;padding:${w * 0.07}px;display:flex;flex-direction:column}
body::before{content:"";position:absolute;inset:0;background:radial-gradient(900px 600px at ${lang === 'ar' ? '0%' : '100%'} 0%,#dfe8fb,transparent 65%),radial-gradient(800px 600px at ${lang === 'ar' ? '100%' : '0%'} 100%,#dcefe8,transparent 65%);z-index:-1}
h1{font-weight:700;letter-spacing:${lang === 'ar' ? '0' : '-.02em'};line-height:1.08}
.price{font-weight:700;line-height:1;white-space:nowrap}
.bar{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:20px;background:#1d2433;color:#fff;border-radius:22px;padding:22px 28px;font:600 34px Plex,sans-serif;direction:ltr}
.bar span{font-weight:500;opacity:.8;font-size:26px}
${extraCss}</style></head><body>${inner}</body></html>`;
}

async function socialPages(lang) {
  const s = S[lang];
  const t = T[lang];
  const shot = { maler: img('demo-maler.webp'), malerM: img('demo-maler-mobil.webp'), physioM: img('demo-physio-mobil.webp'), restoM: img('demo-resto-mobil.webp') };
  const bar = `<div class="bar"><div class="brand" style="color:#fff">${mark(48)}<div><b>TOF</b> <i style="color:#c9d2e3">Solution</i></div></div><div>${s.cta}</div></div>`;
  const pages = [];
  pages.push(['post-1-festpreis', 1080, 1080, frame(lang, 1080, 1080, `
<div style="display:grid;grid-template-columns:1.15fr .85fr;gap:40px;flex:1">
<div><p style="font-size:30px;font-weight:600;color:#2a58c2;margin-bottom:24px">${t.hero.pill}</p>
<h1 style="font-size:78px">${s.p1[0]}<br><span class="em">${s.p1[1]}</span></h1>
<p class="price em" style="font-size:128px;margin:40px 0 14px;white-space:nowrap" dir="ltr">${t.price.amount}</p>
<p style="font-size:34px;font-weight:600">${s.p1sub}</p></div>
<div style="padding-top:20px"><div class="phone" style="width:330px;margin-inline-start:auto"><img src="${shot.malerM}"></div></div></div>${bar}`)]);
  pages.push(['post-2-inklusive', 1080, 1080, frame(lang, 1080, 1080, `
<h1 style="font-size:70px;margin-bottom:34px">${s.p2h}</h1>
<ul class="ticks" style="font-size:34px;gap:20px;font-weight:600">${t.incl.slice(0, 9).map(([a]) => `<li>${tick}<span>${a}</span></li>`).join('')}</ul>
<p class="em" style="font-size:44px;font-weight:700;margin-top:30px"><bdi dir="ltr">${t.price.amount}</bdi> · ${lang === 'ar' ? 'سعر ثابت' : 'Festpreis'}</p>${bar}`)]);
  pages.push(['post-3-vorher-nachher', 1080, 1080, frame(lang, 1080, 1080, `
<h1 style="font-size:72px">${s.p3h}</h1><p style="font-size:32px;color:#525b6a;margin:12px 0 30px">${s.p3sub}</p>
<div style="display:flex;justify-content:center;gap:70px;align-items:center;flex:1">
<div style="text-align:center"><div class="phone" style="width:290px;height:560px;position:relative"><div style="position:absolute;top:0;left:0;width:200%;height:200%;transform:scale(.5);transform-origin:0 0">${oldSite(t.old)}</div></div><p style="font-size:30px;font-weight:600;margin-top:14px">${t.before}</p></div>
<div style="text-align:center"><div class="phone" style="width:290px;height:560px"><img src="${shot.malerM}"></div><p style="font-size:30px;font-weight:600;margin-top:14px" class="em">${t.after}</p></div></div>${bar}`)]);
  pages.push(['post-4-handwerk', 1080, 1080, frame(lang, 1080, 1080, `
<h1 style="font-size:72px">${s.p4h}</h1><p style="font-size:32px;color:#525b6a;margin:12px 0 34px">${s.p4sub}</p>
<div style="position:relative;flex:1"><div class="browser" style="width:860px"><div class="top"><b></b><b></b><b></b></div><img src="${shot.maler}"></div>
<div class="phone" style="position:absolute;width:220px;${lang === 'ar' ? 'left' : 'right'}:0;bottom:-10px"><img src="${shot.malerM}"></div></div>${bar}`)]);
  pages.push(['post-5-praxis-restaurant', 1080, 1080, frame(lang, 1080, 1080, `
<h1 style="font-size:66px">${s.p5h}</h1><p style="font-size:32px;color:#525b6a;margin:12px 0 30px">${s.p5sub}</p>
<div style="display:flex;justify-content:center;gap:44px;flex:1">${[shot.physioM, shot.restoM, shot.malerM].map((x, i) => `<div style="text-align:center"><div class="phone" style="width:250px;height:520px"><img src="${x}"></div><p style="font-size:28px;font-weight:600;margin-top:12px">${s.labels[[1, 2, 0][i]]}</p></div>`).join('')}</div>${bar}`)]);
  pages.push(['post-6-ablauf', 1080, 1080, frame(lang, 1080, 1080, `
<h1 style="font-size:72px;margin-bottom:40px">${s.p6h}</h1>
<ol style="list-style:none;padding:0;display:grid;gap:28px">${t.steps.map(([a, d], i) => `<li style="display:grid;grid-template-columns:90px 1fr;gap:26px;align-items:start"><b style="display:grid;place-items:center;width:90px;height:90px;border-radius:24px;background:#2a58c2;color:#fff;font:700 40px Plex">0${i + 1}</b><div><p style="font-size:40px;font-weight:700">${a}</p><p style="font-size:27px;color:#525b6a;line-height:1.35;margin-top:6px">${d}</p></div></li>`).join('')}</ol>${bar}`)]);
  const qrSvg = await qr(lang === 'ar' ? 'https://tarekfatal.com/ar/website/#termin' : `${URL_DE}#termin`);
  const qrBox = `<div style="display:flex;gap:26px;align-items:center;background:#fff;border-radius:26px;padding:24px;border:1px solid #e5e0d5"><div style="width:190px;flex:none">${qrSvg}</div><div><p style="font-size:30px;font-weight:600">${s.book}</p><p style="font-size:34px;font-weight:700;direction:ltr" class="em">${s.cta}</p><p style="font-size:26px;color:#525b6a">${s.scan}</p></div></div>`;
  pages.push(['story-1-festpreis', 1080, 1920, frame(lang, 1080, 1920, `
<div class="brand">${mark(64)}<div><b>TOF</b> <i>Solution</i></div></div>
<h1 style="font-size:104px;margin-top:70px">${s.story1[0]}<br><span class="em">${s.story1[1]}</span></h1>
<p class="price em" style="font-size:220px;margin:40px 0 10px" dir="ltr">${t.price.amount}</p>
<p style="font-size:40px;font-weight:600">${s.p1sub}</p>
<div style="display:flex;justify-content:center;margin:56px 0"><div class="phone" style="width:400px;height:700px"><img src="${shot.malerM}"></div></div>${qrBox}`)]);
  pages.push(['story-2-vorher-nachher', 1080, 1920, frame(lang, 1080, 1920, `
<div class="brand">${mark(64)}<div><b>TOF</b> <i>Solution</i></div></div>
<h1 style="font-size:92px;margin-top:70px">${s.story2}</h1>
<div style="display:flex;justify-content:center;gap:50px;margin:70px 0;align-items:center">
<div style="text-align:center"><div class="phone" style="width:400px;height:800px;position:relative"><div style="position:absolute;top:0;left:0;width:200%;height:200%;transform:scale(.5);transform-origin:0 0">${oldSite(t.old)}</div></div><p style="font-size:38px;font-weight:600;margin-top:16px">${t.before}</p></div>
<div style="text-align:center"><div class="phone" style="width:400px;height:800px"><img src="${shot.malerM}"></div><p style="font-size:38px;font-weight:600;margin-top:16px" class="em">${t.after}</p></div></div>
<p class="em" style="font-size:64px;font-weight:700;margin-bottom:40px" dir="ltr">${t.price.amount} · 7 ${lang === 'ar' ? 'أيام' : 'Tage'}</p>${qrBox}`)]);
  return pages;
}

// ---------- Angebots-PDF (1 Seite A4) ----------
async function pdfPage(lang) {
  const t = T[lang];
  const rtl = lang === 'ar';
  const url = { de: URL_DE, en: 'https://tarekfatal.com/en/website/', ar: 'https://tarekfatal.com/ar/website/' }[lang];
  const qrSvg = await qr(`${url}#termin`);
  const L = {
    de: { stand: 'Stand: Oktober 2026', book: 'Kostenloses Erstgespräch buchen', mail: 'E-Mail schreiben', demos: 'Musterseiten', steps: 'Ablauf' },
    en: { stand: 'As of October 2026', book: 'Book a free intro call', mail: 'Send an email', demos: 'Sample sites', steps: 'How it works' },
    ar: { stand: 'أكتوبر 2026', book: 'احجز مكالمة تعارف مجانية', mail: 'راسلنا بالبريد', demos: 'نماذج', steps: 'الخطوات' },
  }[lang];
  return `<!doctype html><html lang="${lang}" dir="${rtl ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><style>${base(lang)}
@page{size:A4;margin:0}
html,body{width:210mm;height:297mm;background:#fff}
body{padding:11mm 14mm 10mm;display:flex;flex-direction:column;gap:4.2mm;font-size:9.3pt;line-height:1.32;overflow:hidden}
header{display:flex;justify-content:space-between;align-items:center}
.brand{font-size:15pt}
.stand{color:#525b6a;font-size:9pt}
.hero{display:grid;grid-template-columns:1.25fr .75fr;gap:6mm;align-items:center;background:linear-gradient(135deg,#eef2fa,#edf5f1);border-radius:5mm;padding:5.5mm 6mm}
h1{font-size:18pt;line-height:1.15;letter-spacing:${rtl ? '0' : '-.01em'}}
.lead{color:#525b6a;margin-top:2.5mm}
.pbox{background:#fff;border-radius:5mm;padding:5mm;text-align:center;border:1px solid #e5e0d5}
.pbox .price{font-size:30pt;font-weight:700;line-height:1;color:#2a58c2;background:none;-webkit-text-fill-color:#2a58c2}
.pbox p{margin-top:1.5mm}
.cols{display:grid;grid-template-columns:1.2fr .8fr;gap:7mm}
h2{font-size:12pt;margin-bottom:2.5mm}
.ticks{gap:1.1mm}
.ticks b{font-weight:600}
.ticks span small{display:block;color:#525b6a;font-size:8pt}
.ex li svg{color:#8a93a3}
.steps{list-style:none;padding:0;display:grid;gap:2.5mm;counter-reset:s}
.steps li{display:grid;grid-template-columns:7mm 1fr;gap:2.5mm;counter-increment:s}
.steps li::before{content:counter(s);display:grid;place-items:center;width:7mm;height:7mm;border-radius:2mm;background:#2a58c2;color:#fff;font-weight:700;font-size:9pt}
.demos{display:grid;grid-template-columns:repeat(3,1fr);gap:4mm}
.demos figure{margin:0}
.demos img{width:100%;height:27mm;object-fit:cover;object-position:top;border-radius:2mm;border:1px solid #e5e0d5;display:block}
.demos figcaption{font-size:8.5pt;color:#525b6a;margin-top:1mm;direction:ltr;text-align:${rtl ? 'right' : 'left'}}
footer{margin-top:auto;display:grid;grid-template-columns:27mm 1fr;gap:6mm;align-items:center;border-top:1px solid #e5e0d5;padding-top:4mm}
footer a{color:#2a58c2;font-weight:600;text-decoration:none}
.url{direction:ltr;display:inline-block}
</style></head><body>
<header><div class="brand">${mark(34)}<div><b>TOF</b> <i>Solution</i></div></div><span class="stand">${L.stand}</span></header>
<section class="hero"><div><h1>${t.hero.h1}</h1><p class="lead">${t.hero.lead}</p></div>
<div class="pbox"><p style="font-weight:600;color:#525b6a">${t.price.label}</p><p class="price em" dir="ltr">${t.price.amount}</p><p style="font-weight:600">${t.price.vat}</p><p style="color:#525b6a;font-size:9pt">${t.price.sub}</p></div></section>
<section class="cols"><div><h2>${t.inclH}</h2><ul class="ticks">${t.incl.map(([a, d]) => `<li>${tick}<span><b>${a}</b><small>${d}</small></span></li>`).join('')}</ul></div>
<div><h2>${t.exclH}</h2><ul class="ticks ex">${t.excl.map(([a, d]) => `<li>${cross}<span><b>${a}</b><small>${d}</small></span></li>`).join('')}</ul>
<p style="font-size:8.5pt;color:#525b6a;margin:2mm 0 5mm">${t.extraNote}</p>
<h2>${L.steps}</h2><ol class="steps">${t.steps.map(([a]) => `<li><b>${a}</b></li>`).join('')}</ol></div></section>
<section><h2>${L.demos}</h2><div class="demos">${DEMOS.map((d) => `<figure><img src="${img(`demo-${d.key}.webp`)}"><figcaption>${d.url.replace('https://', '').replace(/\/$/, '')}</figcaption></figure>`).join('')}</div></section>
<footer><div>${qrSvg}</div><div><p style="font-size:13pt;font-weight:700">${L.book}</p><p><a class="url" href="${url}#termin">${url.replace('https://', '')}#termin</a></p><p style="margin-top:1.5mm"><a href="mailto:Tarek@tarekfatal.com">${L.mail}</a> · TOF Solution</p></div></footer>
</body></html>`;
}

// ---------- OG-Bild ----------
function ogPage() {
  const t = T.de;
  return frame('de', 1200, 630, `
<div style="display:grid;grid-template-columns:1.3fr .7fr;gap:30px;flex:1;align-items:center">
<div><div class="brand" style="margin-bottom:26px">${mark(52)}<div><b>TOF</b> <i>Solution</i></div></div>
<h1 style="font-size:62px">Webseite zum <span class="em">Festpreis</span></h1>
<p class="price em" style="font-size:96px;margin:18px 0 8px">${t.price.amount}</p>
<p style="font-size:26px;font-weight:600;color:#3a4252">zzgl. MwSt. · in 7 Tagen online · 1 Jahr Hosting inklusive</p></div>
<div><div class="phone" style="width:250px;height:470px;margin-inline-start:auto"><img src="${img('demo-maler-mobil.webp')}"></div></div></div>`, 'body{padding:56px 70px}');
}

const browser = await chromium.launch({ executablePath: chrome });
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(ogPage(), { waitUntil: 'load' });
await page.screenshot({ path: join(STATIC, 'og/og-webseite.png') });
console.log('og-webseite.png');
for (const lang of ['de', 'ar']) {
  for (const [name, w, h, html] of await socialPages(lang)) {
    await page.setViewportSize({ width: w, height: h });
    await page.setContent(html, { waitUntil: 'load' });
    await page.screenshot({ path: join(MKT, `${name}-${lang}.png`) });
    console.log(`${name}-${lang}.png`);
  }
}
const pdfNames = { de: 'angebot-webseite.pdf', en: 'offer-website-en.pdf', ar: 'angebot-webseite-ar.pdf' };
for (const lang of ['de', 'en', 'ar']) {
  await page.setContent(await pdfPage(lang), { waitUntil: 'load' });
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: join(STATIC, 'webseite', pdfNames[lang]), format: 'A4', printBackground: true, pageRanges: '1' });
  console.log(pdfNames[lang]);
}
await browser.close();
