// Static site generator for the TOF Solution website – no dependencies.
// Usage: node src/build.mjs  →  writes ./dist
import { mkdirSync, writeFileSync, readFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import en from './content/en.mjs';
import de from './content/de.mjs';
import ar from './content/ar.mjs';
import zh from './content/zh.mjs';
import { legalPages } from './legal.mjs';
import { caseArt } from './art.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dist');
const SITE = 'https://tarekfatal.com/';
const EMAIL = 'Tarek@tarekfatal.com';
const BRAND = 'TOF Solution';
const LANGS = [en, de, ar, zh];
const TODAY = new Date().toISOString().slice(0, 10);
const YEAR = TODAY.slice(0, 4);
const KNOWS_ABOUT = [
  'SAP Business One',
  'SAP Business One SDK',
  'SAP Business One DI API',
  'SAP Business One Service Layer',
  'SQL',
  'Crystal Reports',
  'Data migration',
  'ERP integration',
  'DATEV',
  'SAP Field Service Management',
  'SAP S/4HANA',
  'Business intelligence',
  'KPI dashboards',
  'XRechnung',
  'EN 16931',
  'Model Context Protocol (MCP)',
  'AI agents',
  'Cloudflare',
  'Cloudflare Tunnel',
  'Cloudflare Workers',
  'Internet of Things',
  'Leaflet',
  'OpenStreetMap',
  'Angular',
  'React',
  'React Native',
  'Next.js',
  '.NET',
];
const FLOW_LABEL = {
  en: 'Diagram: data flowing between IoT devices, Cloudflare, SAP Field Service Management, SAP Business One and SAP S/4HANA',
  de: 'Grafik: Datenfluss zwischen IoT-Geräten, Cloudflare, SAP Field Service Management, SAP Business One und SAP S/4HANA',
  ar: 'رسم توضيحي: تدفق البيانات بين أجهزة إنترنت الأشياء وCloudflare وSAP Field Service Management وSAP Business One وSAP S/4HANA',
  zh: '示意图：物联网设备、Cloudflare、SAP Field Service Management、SAP Business One 与 SAP S/4HANA 之间的数据流',
};

const cssSrc = readFileSync(join(ROOT, 'src/styles.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s*\n\s*/g, '')
  .replace(/\s*([{};,>])\s*/g, '$1');
const css = (depth) => cssSrc.replaceAll('__R__', up(depth));

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function up(depth) {
  return '../'.repeat(depth);
}
const hl = (c) => c.hreflang || c.lang;
// German is the main market: its landing page lives at the site root.
const homePath = (l) => (l.lang === 'de' ? '' : `${l.lang}/`);

const ICONS = {
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
  erp: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
  pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
  invoice: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  ai: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  plug: '<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a6 6 0 0 1-12 0V8z"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4z"/>',
  network: '<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-2h14v2"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/>',
  rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>',
  blocks: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M17.5 14v7M14 17.5h7"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  swap: '<path d="M7 4 3 8l4 4"/><path d="M3 8h14"/><path d="m17 20 4-4-4-4"/><path d="M21 16H7"/>',
  fsm: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  lifebuoy: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  server: '<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  kanban: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7v7M12 7v4M16 7v9"/>',
  landmark: '<path d="M3 21h18M5 21V10M19 21V10M9 21V10M15 21V10M12 3 3 8h18z"/>',
  weather: '<path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41M15.95 12.65A4 4 0 0 0 8.35 10"/><path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>',
  check: '<circle cx="12" cy="12" r="10"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  tick: '<path d="M20 6 9 17l-5-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  ext: '<path d="M7 17 17 7M8 7h9v9"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  burger: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
};
const icon = (name, cls = '') =>
  `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

let logoN = 0;
const logo = () => {
  const id = `lg${++logoN}`;
  return `<svg viewBox="0 0 36 36" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b7bff"/><stop offset="1" stop-color="#19c3b1"/></linearGradient></defs><rect width="36" height="36" rx="10" fill="url(#${id})"/><path d="M11 12h14M18 12v13" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/><circle cx="11" cy="12" r="2.7" fill="#fff"/><circle cx="25" cy="12" r="2.7" fill="#fff"/><circle cx="18" cy="25" r="2.7" fill="#fff"/></svg>`;
};
const brand = (href) => `<a class="brand" href="${href}" aria-label="${BRAND}">${logo()}<span><b>TOF</b> <i>Solution</i></span></a>`;

// Hero data-flow graphic. Coordinates are mirrored for RTL so the flow reads in the page direction.
function flow(c) {
  const W = 580;
  const rtl = c.dir === 'rtl';
  const X = (x) => (rtl ? W - x : x);
  const n = {
    iot: [105, 105, 'IoT', 'LIVE'],
    cf: [105, 355, 'Cloudflare', 'TUNNEL · WORKERS'],
    fsm: [290, 230],
    b1: [475, 105, 'SAP Business One', 'ERP'],
    s4: [475, 355, 'SAP S/4HANA', 'ERP'],
  };
  const curve = (a, b) => {
    const [x1, y1] = n[a];
    const [x2, y2] = n[b];
    const mx = (x1 + x2) / 2;
    return `M${X(x1)} ${y1}C${X(mx)} ${y1} ${X(mx)} ${y2} ${X(x2)} ${y2}`;
  };
  const wires = [
    ['w1', curve('iot', 'fsm')],
    ['w2', curve('cf', 'fsm')],
    ['w3', curve('fsm', 'b1')],
    ['w4', curve('fsm', 's4')],
    ['w5', `M${X(105)} 105L${X(105)} 355`],
    ['w6', `M${X(475)} 105L${X(475)} 355`],
  ];
  const particle = (id, cls, dur, begin, reverse = false) =>
    `<circle r="3.2" class="${cls}"><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite"${reverse ? ' keyPoints="1;0" keyTimes="0;1" calcMode="linear"' : ''}><mpath href="#${id}"/></animateMotion></circle>`;
  const node = ([x, y, t, s]) => {
    const w = 204;
    const left = X(x) - w / 2;
    const led = rtl ? left + w - 20 : left + 20;
    const tx = rtl ? left + w - 36 : left + 36;
    const anchor = rtl ? 'end' : 'start';
    return `<g class="node"><rect x="${left}" y="${y - 33}" width="${w}" height="66" rx="16"/><circle class="led" cx="${led}" cy="${y - 6}" r="4.5"/><text class="t" x="${tx}" y="${y - 1}" text-anchor="${anchor}">${t}</text><text class="s" x="${tx}" y="${y + 18}" text-anchor="${anchor}">${s}</text></g>`;
  };
  return `<svg class="flow" viewBox="0 0 ${W} 460" role="img" aria-label="${esc(FLOW_LABEL[c.lang])}" direction="ltr">
<defs><linearGradient id="coreGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f6bea"/><stop offset="1" stop-color="#14998c"/></linearGradient></defs>
${wires.map(([id, d]) => `<path id="${id}" class="wire" d="${d}"/><path class="dash" d="${d}"/>`).join('')}
${particle('w1', 'p', 2.6, -0.2)}${particle('w1', 'p', 2.6, -1.5)}${particle('w2', 'p', 3, -0.7)}${particle('w3', 'p', 2.6, -1.1)}${particle('w3', 'q', 2.8, -2.2, true)}${particle('w4', 'p', 3, -1.8)}${particle('w4', 'q', 3.2, -0.9, true)}${particle('w5', 'q', 4, -2.4)}${particle('w6', 'q', 4.2, -1.3, true)}
${node(n.iot)}${node(n.cf)}${node(n.b1)}${node(n.s4)}
<g class="core"><rect class="halo" x="${X(290) - 100}" y="188" width="200" height="84" rx="22"/><rect class="halo b" x="${X(290) - 100}" y="188" width="200" height="84" rx="22"/><rect x="${X(290) - 100}" y="188" width="200" height="84" rx="22" fill="url(#coreGrad)" stroke="rgba(255,255,255,.3)"/><text class="t" x="${X(290)}" y="228" text-anchor="middle">SAP FSM</text><text class="s" x="${X(290)}" y="250" text-anchor="middle">FIELD SERVICE</text></g>
</svg>`;
}

const headInit = `<script>(function(d){try{var t=localStorage.getItem('theme');if(t)d.dataset.theme=t}catch(e){}if(window.matchMedia&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window)d.classList.add('js')})(document.documentElement)</script>`;
const themeScript = `var d=document.documentElement,b=document.getElementById('theme');function cur(){return d.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}function sync(){b.setAttribute('aria-pressed',cur()==='dark')}sync();b.addEventListener('click',function(){var n=cur()==='dark'?'light':'dark';d.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}sync()});document.addEventListener('click',function(e){document.querySelectorAll('details.lang[open],details.menu[open]').forEach(function(x){if(!x.contains(e.target)||e.target.closest('.menu a'))x.removeAttribute('open')})});`;
const motionScript = `if(d.classList.contains('js')){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.12});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,end=+el.dataset.count,f=new Intl.NumberFormat(el.dataset.locale),t0=performance.now();(function s(t){var p=Math.min(1,(t-t0)/1600);el.textContent=f.format(Math.round(end*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(s)})(t0)})},{threshold:.6});document.querySelectorAll('[data-count]').forEach(function(el){el.textContent='0';co.observe(el)});setTimeout(function(){document.querySelectorAll('svg.flow').forEach(function(s){s.pauseAnimations&&s.pauseAnimations()});d.classList.add('still')},5000)}else{document.querySelectorAll('svg.flow').forEach(function(s){s.pauseAnimations&&s.pauseAnimations()})}`;

function head({ c, title, description, path, depth, alternates, robots = 'index,follow', jsonld }) {
  const url = SITE + path;
  const ogImg = `${SITE}og/og-${c.lang}.png`;
  const r = up(depth);
  const preload =
    c.lang === 'ar'
      ? ['plex-arabic-400', 'plex-arabic-600', 'plex-sans-latin']
      : ['plex-sans-latin'];
  return `<!doctype html>
<html lang="${c.htmlLang}" dir="${c.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${robots}">
<meta name="author" content="${BRAND}">
<link rel="canonical" href="${url}">
${(alternates || []).map(([h, p]) => `<link rel="alternate" hreflang="${h}" href="${SITE + p}">`).join('\n')}
${preload.map((f) => `<link rel="preload" href="${r}fonts/${f}.woff2" as="font" type="font/woff2" crossorigin>`).join('\n')}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(c.ogAlt)}">
<meta property="og:locale" content="${c.ogLocale}">
${LANGS.filter((l) => l !== c).map((l) => `<meta property="og:locale:alternate" content="${l.ogLocale}">`).join('\n')}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImg}">
<meta name="theme-color" content="#f8f6f1" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0e1522" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${r}apple-touch-icon.png">
${headInit}
<style>${css(depth)}</style>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>`;
}

function header(c, depth, { anchors = true, langLinks }) {
  const home = `${up(depth)}${homePath(c)}`;
  const pre = anchors ? '' : home;
  const LINKS = [
    ['services', 'services'],
    ['work', 'cases'],
    ['packages', 'packages'],
    ['about', 'about'],
    ['faq', 'faq'],
  ];
  const menu = anchors
    ? `<details class="menu"><summary class="icon-btn" aria-label="${esc(c.nav.menu)}">${icon('burger')}</summary><nav aria-label="${esc(c.nav.menu)}"><ul>${LINKS.map(([k, id]) => `<li><a href="#${id}">${esc(c.nav[k])}</a></li>`).join('')}<li><a href="#contact">${esc(c.nav.cta)}</a></li></ul></nav></details>`
    : '';
  const nav = anchors
    ? `<nav class="nav" aria-label="${esc(c.nav.menu)}">${[
        ['services', 'services'],
        ['work', 'cases'],
        ['packages', 'packages'],
        ['about', 'about'],
        ['faq', 'faq'],
      ]
        .map(([k, id]) => `<a href="#${id}">${esc(c.nav[k])}</a>`)
        .join('')}</nav>`
    : '';
  return `<a class="skip" href="#main">${esc(c.nav.skip)}</a>
<header class="site-header"><div class="wrap bar">
${brand(anchors ? '#top' : home)}
${nav}
<div class="tools">
${menu}
<details class="lang"><summary class="icon-btn" aria-label="${esc(c.nav.language)}: ${esc(c.label)}">${icon('globe')}</summary><ul>
${langLinks
  .map(
    ([l, href]) =>
      `<li><a href="${href}" hreflang="${hl(l)}" lang="${l.htmlLang}"${l === c ? ' aria-current="page"' : ''}>${esc(l.label)}</a></li>`
  )
  .join('')}
</ul></details>
<button class="icon-btn" id="theme" type="button" aria-label="${esc(c.nav.theme)}" aria-pressed="false">${icon('moon', 'i-moon')}${icon('sun', 'i-sun')}</button>
<a class="btn btn-primary" href="${pre}#contact">${esc(c.nav.cta)}</a>
</div></div></header>`;
}

function footer(c, depth) {
  const r = up(depth);
  return `<footer class="site-footer"><div class="wrap">
<div class="foot">
<div>${brand(`${r}${homePath(c)}`)}<p>${esc(c.footer.text)}</p></div>
<div><h2>${esc(c.footer.legal)}</h2><ul><li><a href="${r}${c.footer.imprint.href}">${esc(c.footer.imprint.label)}</a></li><li><a href="${r}${c.footer.privacy.href}">${esc(c.footer.privacy.label)}</a></li></ul></div>
<div><h2>${esc(c.footer.contact)}</h2><ul><li><a href="mailto:${EMAIL}">${esc(c.contact.mailText)}</a></li></ul></div>
</div>
<p class="copy">© ${YEAR} ${BRAND}</p>
</div></footer>`;
}

function jsonLd(c) {
  const url = `${SITE}${homePath(c)}`;
  const org = `${SITE}#organization`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE}#website`, url: SITE, name: BRAND, inLanguage: LANGS.map(hl), publisher: { '@id': org } },
      {
        '@type': 'Organization',
        '@id': org,
        name: BRAND,
        url: SITE,
        logo: `${SITE}apple-touch-icon.png`,
        image: `${SITE}og/og-en.png`,
        description: c.schema.orgDescription,
        address: { '@type': 'PostalAddress', addressCountry: 'DE' },
        areaServed: [
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'Austria' },
          { '@type': 'Country', name: 'Switzerland' },
        ],
        knowsLanguage: ['de', 'en', 'ar'],
        knowsAbout: KNOWS_ABOUT,
        contactPoint: { '@type': 'ContactPoint', contactType: 'sales', availableLanguage: ['de', 'en', 'ar'] },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: c.services.h2,
          itemListElement: [...c.services.b1.items.map((s) => ({ ...s, group: c.services.b1.group })), ...c.services.items].map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.text, category: s.group, provider: { '@id': org } },
          })),
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: c.title,
        description: c.description,
        inLanguage: hl(c),
        isPartOf: { '@id': `${SITE}#website` },
        about: { '@id': org },
        primaryImageOfPage: `${SITE}og/og-${c.lang}.png`,
        dateModified: TODAY,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: hl(c),
        isPartOf: { '@id': `${url}#webpage` },
        mainEntity: c.faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };
}

const alternatesHome = [...LANGS.map((l) => [hl(l), homePath(l)]), ['x-default', '']];

function h1(text) {
  const nw = (t) => esc(t).replace('SAP Business One', '<span class="nw">SAP Business One</span>');
  const i = text.indexOf(' – ');
  return i < 0 ? nw(text) : `${nw(text.slice(0, i))}&nbsp;– <em>${nw(text.slice(i + 3))}</em>`;
}

function landing(c) {
  const depth = c.lang === 'de' ? 0 : 1;
  const r = up(depth);
  const langLinks = LANGS.map((l) => [l, `${r}${homePath(l)}`]);
  const callHref = `mailto:${EMAIL}?subject=${encodeURIComponent(c.contact.callSubject)}&amp;body=${encodeURIComponent(c.contact.callBody)}`;
  return `${head({ c, title: c.title, description: c.description, path: homePath(c), depth, alternates: alternatesHome, jsonld: jsonLd(c) })}
<body id="top">
${header(c, depth, { anchors: true, langLinks })}
<main id="main">
<section class="hero" aria-labelledby="h1"><div class="wrap">
<div class="hero-grid">
<div>
<p class="pill"><span class="pulse" aria-hidden="true"></span>${esc(c.hero.eyebrow)}</p>
<h1 id="h1">${h1(c.hero.h1)}</h1>
<p class="lead">${esc(c.hero.lead)}</p>
<div class="cta-row"><a class="btn btn-primary" href="#contact">${esc(c.hero.cta)} ${icon('arrow', 'flip')}</a><a class="btn btn-ghost" href="${callHref}">${icon('calendar')} ${esc(c.hero.call)}</a></div>
<ul class="trust">${c.hero.trust.map((t) => `<li>${icon('tick')}${esc(t)}</li>`).join('')}</ul>
</div>
<div>${flow(c)}</div>
</div>
<ul class="stats">${c.stats
    .map(
      (s) =>
        `<li><strong${s.count ? ` aria-hidden="true" data-count="${s.count}" data-locale="${c.numLocale}"` : ''}>${esc(s.text)}</strong>${s.count ? `<span class="sr-only">${esc(s.text)}</span>` : ''}<span>${esc(s.label)}</span></li>`
    )
    .join('')}</ul>
</div></section>

<section id="audience" aria-labelledby="audience-h"><div class="wrap">
<div class="section-head reveal"><h2 id="audience-h">${esc(c.audience.h2)}</h2><p>${esc(c.audience.intro)}</p></div>
<div class="grid grid-3">${c.audience.items
    .map((a, i) => `<article class="card hover reveal"><div class="card-icon">${icon(['fsm', 'users', 'server'][i])}</div><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></article>`)
    .join('')}</div>
</div></section>

<section id="services" class="alt" aria-labelledby="services-h"><div class="wrap">
<div class="section-head reveal"><h2 id="services-h">${esc(c.services.h2)}</h2><p>${esc(c.services.intro)}</p></div>
<div class="grid grid-3"><article class="card feature reveal"><div class="card-icon">${icon('erp')}</div><p class="group">${esc(c.services.b1.group)}</p><h3>${esc(c.services.b1.title)}</h3><p>${esc(c.services.b1.text)}</p><ul class="sub">${c.services.b1.items
    .map((s) => `<li>${icon(s.icon)}<div><b>${esc(s.title)}</b><span>${esc(s.text)}</span></div></li>`)
    .join('')}</ul></article>${c.services.items
    .map(
      (s) =>
        `<article class="card hover reveal"><div class="card-icon">${icon(s.icon)}</div><p class="group">${esc(s.group)}</p><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`
    )
    .join('')}</div>
</div></section>

<section id="cases" aria-labelledby="cases-h"><div class="wrap">
<div class="section-head reveal"><h2 id="cases-h">${esc(c.cases.h2)}</h2><p>${esc(c.cases.intro)}</p></div>
<div class="cases">${c.cases.items
    .map(
      (k) => `<article class="case reveal"><div><span class="tag">${esc(k.tag)}</span><h3>${esc(k.title)}</h3><dl class="sar">
<dt>${esc(c.cases.labels.situation)}</dt><dd>${esc(k.situation)}</dd>
<dt>${esc(c.cases.labels.solution)}</dt><dd>${esc(k.solution)}</dd>
<dt>${esc(c.cases.labels.result)}</dt><dd class="result">${icon('check')}<span>${esc(k.result)}</span></dd></dl></div>
${caseArt(k.art, c, k.title)}</article>`
    )
    .join('')}</div>
<div class="section-head reveal more-h"><h2 id="more-h">${esc(c.projects.h2)}</h2><p>${esc(c.projects.intro)}</p></div>
<div class="grid grid-3 proj">${c.projects.items
    .map(
      (p) =>
        `<article class="card hover reveal"><div class="card-icon">${icon(p.icon)}</div><span class="tag">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>${p.tech && p.tech.length ? `<p class="tags">${p.tech.map((t) => `<span dir="ltr">${esc(t)}</span>`).join('')}</p>` : ''}</article>`
    )
    .join('')}</div>
<div class="card cta-card cta-banner reveal"><div><h3>${esc(c.projects.ctaTitle)}</h3><p>${esc(c.projects.ctaText)}</p></div><a class="btn btn-primary" href="${callHref}">${icon('calendar')} ${esc(c.hero.call)}</a></div>
</div></section>

<section id="packages" class="alt" aria-labelledby="packages-h"><div class="wrap">
<div class="section-head reveal"><h2 id="packages-h">${esc(c.packages.h2)}</h2><p>${esc(c.packages.intro)}</p></div>
<div class="grid grid-4">${c.packages.items
    .map(
      (p) =>
        `<article class="card hover pkg reveal"><div class="card-icon">${icon(p.icon)}</div><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p><ul>${p.points.map((x) => `<li>${icon('tick')}<span>${esc(x)}</span></li>`).join('')}</ul><a class="btn btn-ghost btn-sm" href="mailto:${EMAIL}?subject=${encodeURIComponent(c.packages.subject + ': ' + p.title)}">${esc(c.packages.cta)} ${icon('arrow', 'flip')}</a></article>`
    )
    .join('')}</div>
<p class="note">${esc(c.packages.note)}</p>
</div></section>

<section id="process" aria-labelledby="process-h"><div class="wrap">
<div class="section-head reveal"><h2 id="process-h">${esc(c.process.h2)}</h2></div>
<ol class="steps">${c.process.items.map((s) => `<li class="card reveal"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('')}</ol>
</div></section>

<section id="about" class="alt" aria-labelledby="about-h"><div class="wrap about-grid">
<div class="reveal"><div class="section-head" style="margin-bottom:1.5rem"><h2 id="about-h">${esc(c.about.h2)}</h2></div>
${c.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
<div class="facts-box"><h3>${esc(c.about.factsTitle)}</h3><dl>${c.about.facts
    .map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v === 'MAILTO' ? `<a href="mailto:${EMAIL}">${esc(c.contact.mailText)}</a>` : esc(v)}</dd>`)
    .join('')}</dl></div></div>
<aside class="card person reveal" aria-labelledby="person-h"><div class="portrait logo" aria-hidden="true">${logo()}</div><h3 id="person-h">${esc(c.about.contactTitle)}</h3><p class="role">${esc(c.about.person.role)} · ${BRAND}</p><p class="cred">${esc(c.about.person.cred)}</p>
<p class="bio">${esc(c.about.person.text)}</p>
<a class="btn btn-primary" href="${callHref}">${icon('calendar')} ${esc(c.hero.call)}</a></aside>
</div></section>

<section id="faq" aria-labelledby="faq-h"><div class="wrap">
<div class="section-head reveal"><h2 id="faq-h">${esc(c.faq.h2)}</h2></div>
<div class="faq">${c.faq.items.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
</div></section>

<section id="contact" class="contact" aria-labelledby="contact-h"><div class="wrap contact-grid">
<div><h2 id="contact-h">${esc(c.contact.h2)}</h2><p class="lead">${esc(c.contact.lead)}</p>
<a class="btn btn-primary" href="${callHref}">${icon('calendar')} ${esc(c.contact.call)}</a>
<p class="small">${esc(c.contact.emailLabel)}</p>
<a class="mail" href="mailto:${EMAIL}?subject=${encodeURIComponent(c.contact.form.subject)}">${icon('mail')} ${esc(c.contact.mailText)}</a></div>
<div class="form-card"><h3>${esc(c.contact.form.title)}</h3>
<form class="form" id="cf" data-subject="${esc(c.contact.form.subject)}">
<div class="two"><div class="field"><label for="f-name">${esc(c.contact.form.name)}</label><input id="f-name" name="name" autocomplete="name" required></div>
<div class="field"><label for="f-email">${esc(c.contact.form.email)}</label><input id="f-email" name="email" type="email" autocomplete="email" dir="ltr" required></div></div>
<div class="field"><label for="f-company">${esc(c.contact.form.company)}</label><input id="f-company" name="company" autocomplete="organization"></div>
<div class="field"><label for="f-msg">${esc(c.contact.form.message)}</label><textarea id="f-msg" name="message" required></textarea></div>
<div><button class="btn btn-primary" type="submit">${icon('mail')} ${esc(c.contact.form.submit)}</button></div>
<p class="note">${esc(c.contact.form.note)}</p>
</form></div>
</div></section>
</main>
${footer(c, depth)}
<script>${themeScript}${motionScript}var f=document.getElementById('cf');f.addEventListener('submit',function(e){e.preventDefault();var g=function(n){return(f.elements[n].value||'').trim()},b=g('message')+'\\n\\n— '+g('name')+(g('company')?' · '+g('company'):'')+'\\n'+g('email');location.href='mailto:${EMAIL}?subject='+encodeURIComponent(f.dataset.subject+': '+g('name'))+'&body='+encodeURIComponent(b)});</script>
</body>
</html>
`;
}

function legal(page) {
  const c = page.lang === 'de' ? de : en;
  const depth = page.path.split('/').length - 1;
  const r = up(depth);
  const langLinks = page.pair.map(([l, p]) => [l === 'de' ? de : en, r + p]);
  return `${head({ c, title: page.title, description: page.description, path: page.path, depth, alternates: page.pair, robots: 'noindex,follow' })}
<body>
${header(c, depth, { anchors: false, langLinks })}
<main id="main" class="legal"><div class="wrap">
${page.body}
</div></main>
${footer(c, depth)}
<script>${themeScript}</script>
</body>
</html>
`;
}

function notFound() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found · ${BRAND}</title><meta name="robots" content="noindex">${headInit}<style>${cssSrc.replaceAll('__R__', '/')}</style></head>
<body><main id="main" class="hero"><div class="chooser"><div class="wrap"><h1>404</h1><p class="lead">Page not found · <span lang="de">Seite nicht gefunden</span> · <span lang="ar" dir="rtl">الصفحة غير موجودة</span> · <span lang="zh-Hans">页面未找到</span></p>
<ul>${LANGS.map((l) => `<li><a class="btn btn-ghost" data-p="${homePath(l)}" href="/${homePath(l)}" lang="${l.htmlLang}">${esc(l.label)}</a></li>`).join('')}</ul></div></div></main>
<script>var b=location.hostname.endsWith('github.io')?'/'+location.pathname.split('/')[1]+'/':'/';document.querySelectorAll('[data-p]').forEach(function(a){a.href=b+a.dataset.p})</script></body></html>
`;
}

function sitemap() {
  const alt = alternatesHome.map(([h, p]) => `<xhtml:link rel="alternate" hreflang="${h}" href="${SITE + p}"/>`).join('');
  const urls = LANGS.map(homePath);
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((p) => `<url><loc>${SITE + p}</loc><lastmod>${TODAY}</lastmod>${alt}</url>`).join('\n')}
</urlset>
`;
}

function llms() {
  const c = en;
  return `# ${BRAND} – SAP Business One, SAP FSM & Integration

> ${c.schema.orgDescription} Working languages: English, German, Arabic. Contact: via the contact section of the website.

## Key facts
${c.about.facts.map(([k, v]) => `- ${k}: ${v}`).join('\n')}

## Who we work with
${c.audience.items.map((a) => `- ${a.title}: ${a.text}`).join('\n')}

## Services
- ${c.services.b1.title} (${c.services.b1.group}): ${c.services.b1.text}
${c.services.b1.items.map((s) => `  - ${s.title}: ${s.text}`).join('\n')}
${c.services.items.map((s) => `- ${s.title} (${s.group}): ${s.text}`).join('\n')}

## Case studies (demo data, no client names)
${c.cases.items.map((k) => `### ${k.title}\n- Situation: ${k.situation}\n- Solution: ${k.solution}\n- Result: ${k.result}`).join('\n\n')}

## More projects
${c.projects.items.map((p) => `- ${p.title} (${p.tag}): ${p.text}`).join('\n')}

## Service packages (offer on request)
${c.packages.items.map((p) => `- ${p.title}: ${p.text} (${p.points.join('; ')})`).join('\n')}

## How a project runs
${c.process.items.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join('\n')}

## FAQ
${c.faq.items.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Pages
- [English](${SITE}en/)
- [Deutsch](${SITE})
- [العربية](${SITE}ar/)
- [简体中文](${SITE}zh/)
- [Impressum](${SITE}de/impressum/) · [Imprint](${SITE}en/imprint/)
- [Datenschutz](${SITE}de/datenschutz/) · [Privacy](${SITE}en/privacy/)
`;
}

// Old /de/ URLs: instant redirect to the canonical German root (keeps query and #anchor).
function deRedirect() {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${BRAND}</title>
<link rel="canonical" href="${SITE}">
<meta http-equiv="refresh" content="0;url=../">
<script>location.replace('../'+location.search+location.hash)</script>
</head>
<body><p><a href="../">${BRAND} – tarekfatal.com</a></p></body>
</html>
`;
}

// Gentle language suggestion on the German root: no redirect, a dismissible toast at the bottom (no layout shift).
function langHint() {
  const T = {
    en: ['This page is also available in English.', 'Switch to English', 'Close'],
    ar: ['هذه الصفحة متوفرة أيضًا باللغة العربية.', 'الانتقال إلى العربية', 'إغلاق'],
    zh: ['本页面也提供简体中文版。', '切换到中文', '关闭'],
  };
  return `<div class="lang-hint" id="lang-hint" role="region" aria-label="Language" hidden><p></p><a class="btn btn-primary btn-sm" href="#"></a><button class="icon-btn" type="button"></button></div>
<script>(function(){var T=${JSON.stringify(T)},H={en:'en/',ar:'ar/',zh:'zh/'},L=navigator.languages||[navigator.language||''],k=null;for(var i=0;i<L.length;i++){var x=String(L[i]).slice(0,2).toLowerCase();if(x==='de')return;if(T[x]){k=x;break}}if(!k)return;try{if(localStorage.getItem('lang-hint')==='off')return}catch(e){}var el=document.getElementById('lang-hint'),t=T[k];el.lang=k==='zh'?'zh-Hans':k;el.dir=k==='ar'?'rtl':'ltr';el.querySelector('p').textContent=t[0];var a=el.querySelector('a');a.textContent=t[1];a.href=H[k];a.hreflang=k;var b=el.querySelector('button');b.setAttribute('aria-label',t[2]);b.innerHTML='\u00d7';b.addEventListener('click',function(){el.hidden=true;try{localStorage.setItem('lang-hint','off')}catch(e){}});el.hidden=false})()</script>
`;
}

// ---- write ----
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
const write = (p, s) => {
  const f = join(OUT, p);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, s);
};
cpSync(join(ROOT, 'src/static'), OUT, { recursive: true });
const NB = ' ';
const KEEP = ['SAP Business One', 'SAP Field Service Management', 'SAP S/4HANA', 'SAP FSM', 'SAP B1', 'Crystal Reports', 'React Native', 'Cloudflare Tunnel', 'Service Layer', 'DI API', 'EN 16931'];
// No line break inside product names, after Arabic "لـ" or before " – ". Only visible body text changes; tags, attributes and scripts stay as they are.
const keep = (html) => {
  const i = html.indexOf('<body');
  return html.slice(0, i) + html.slice(i).replace(/(<script[\s\S]*?<\/script>)|>([^<]+)(?=<)/g, (m, s, t) =>
    s ? s : '>' + KEEP.reduce((x, k) => x.replaceAll(k, k.replaceAll(' ', NB)), t).replaceAll(' – ', NB + '– ').replaceAll('لـ ', 'لـ' + NB))
    // the hero h1 keeps normal spaces: its .nw span only stays unbroken from 360px up (320px reflow)
    .replace(/<h1[\s\S]*?<\/h1>/, (h) => h.replaceAll(NB, ' '));
};
for (const c of LANGS) write(`${homePath(c)}index.html`, c.lang === 'de' ? keep(landing(c)).replace('</body>', `${langHint()}</body>`) : keep(landing(c)));
write('de/index.html', deRedirect());
for (const p of legalPages(EMAIL)) write(`${p.path}index.html`, legal(p));
write('404.html', notFound());
write('sitemap.xml', sitemap());
write('llms.txt', llms());
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
write('CNAME', 'tarekfatal.com\n');
write('.nojekyll', '');
console.log('Built →', OUT);
