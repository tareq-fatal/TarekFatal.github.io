// Static site generator for tarekfatal.com (TOF Solution) – no dependencies.
// Usage: node src/build.mjs  →  writes ./dist
import { mkdirSync, writeFileSync, readFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import en from './content/en.mjs';
import de from './content/de.mjs';
import ar from './content/ar.mjs';
import zh from './content/zh.mjs';
import { legalPages } from './legal.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'dist');
const SITE = 'https://tarekfatal.com/';
const EMAIL = 'Tarek@tarekfatal.com';
const BRAND = 'TOF Solution';
const LANGS = [en, de, ar, zh];
const TODAY = new Date().toISOString().slice(0, 10);
const YEAR = TODAY.slice(0, 4);
// Portrait: set to e.g. 'img/TOF.webp' (square, ≥264px) once a photo exists; until then initials are shown.
const PHOTO = null;
const SAME_AS = [
  'https://www.linkedin.com/in/tof-solution/',
  'https://www.freelancermap.de/profil/tof-solution',
];
const KNOWS_ABOUT = [
  'SAP Business One',
  'SAP Business One SDK',
  'SAP Business One DI API',
  'SAP Business One Service Layer',
  'Crystal Reports',
  'SQL',
  'Data migration',
  'SAP Field Service Management',
  'SAP S/4HANA',
  'System integration',
  'Cloudflare',
  'Cloudflare Tunnel',
  'Cloudflare Workers',
  'Internet of Things',
  'Angular',
  'React Native',
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

const ICONS = {
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
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
    const w = 196;
    const left = X(x) - w / 2;
    const led = rtl ? left + w - 22 : left + 22;
    const tx = rtl ? left + w - 40 : left + 40;
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
const themeScript = `var d=document.documentElement,b=document.getElementById('theme');function cur(){return d.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}function sync(){b.setAttribute('aria-pressed',cur()==='dark')}sync();b.addEventListener('click',function(){var n=cur()==='dark'?'light':'dark';d.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}sync()});document.addEventListener('click',function(e){document.querySelectorAll('details.lang[open]').forEach(function(x){if(!x.contains(e.target))x.removeAttribute('open')})});`;
const motionScript = `if(d.classList.contains('js')){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.12});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);var el=e.target,end=+el.dataset.count,f=new Intl.NumberFormat(el.dataset.locale),t0=performance.now();(function s(t){var p=Math.min(1,(t-t0)/1600);el.textContent=f.format(Math.round(end*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(s)})(t0)})},{threshold:.6});document.querySelectorAll('[data-count]').forEach(function(el){el.textContent='0';co.observe(el)})}else{document.querySelectorAll('svg.flow').forEach(function(s){s.pauseAnimations&&s.pauseAnimations()})}`;

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
<meta name="author" content="${BRAND} – TOF Solution">
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
<meta name="theme-color" content="#071226">
<link rel="icon" href="${r}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${r}apple-touch-icon.png">
${headInit}
<style>${css(depth)}</style>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>`;
}

function header(c, depth, { anchors = true, langLinks }) {
  const home = `${up(depth)}${c.lang}/`;
  const pre = anchors ? '' : home;
  const nav = anchors
    ? `<nav class="nav" aria-label="${esc(c.nav.menu)}">${[
        ['services', 'services'],
        ['work', 'cases'],
        ['pricing', 'pricing'],
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
<div>${brand(`${r}${c.lang}/`)}<p>${esc(c.footer.text)}</p></div>
<div><h2>${esc(c.footer.legal)}</h2><ul><li><a href="${r}${c.footer.imprint.href}">${esc(c.footer.imprint.label)}</a></li><li><a href="${r}${c.footer.privacy.href}">${esc(c.footer.privacy.label)}</a></li></ul></div>
<div><h2>${esc(c.footer.contact)}</h2><ul><li><a class="ltr" href="mailto:${EMAIL}">${EMAIL}</a></li><li><a href="${SAME_AS[0]}" rel="noopener" target="_blank">LinkedIn</a></li><li><a href="${SAME_AS[1]}" rel="noopener" target="_blank">freelancermap</a></li></ul></div>
</div>
<p class="copy">© ${YEAR} ${BRAND} · TOF Solution</p>
</div></footer>`;
}

function jsonLd(c) {
  const url = `${SITE}${c.lang}/`;
  const org = `${SITE}#organization`;
  const person = `${SITE}#TOF-TOF`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE}#website`, url: SITE, name: BRAND, inLanguage: LANGS.map(hl), publisher: { '@id': org } },
      {
        '@type': 'ProfessionalService',
        '@id': org,
        name: BRAND,
        url: SITE,
        email: EMAIL,
        logo: `${SITE}apple-touch-icon.png`,
        image: `${SITE}og/og-en.png`,
        description: c.schema.orgDescription,
        founder: { '@id': person },
        address: { '@type': 'PostalAddress', addressCountry: 'DE' },
        areaServed: [
          { '@type': 'Country', name: 'Germany' },
          { '@type': 'Country', name: 'Austria' },
          { '@type': 'Country', name: 'Switzerland' },
        ],
        availableLanguage: ['de', 'en', 'ar'],
        knowsAbout: KNOWS_ABOUT,
        priceRange: 'from EUR 95/h',
        contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: EMAIL, availableLanguage: ['de', 'en', 'ar'] },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: c.services.h2,
          itemListElement: c.services.items.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, description: s.text, category: s.group, provider: { '@id': org } },
          })),
        },
      },
      {
        '@type': 'Person',
        '@id': person,
        name: 'TOF Solution',
        jobTitle: c.schema.jobTitle,
        description: c.schema.personDescription,
        worksFor: { '@id': org },
        email: `mailto:${EMAIL}`,
        knowsLanguage: ['de', 'en', 'ar'],
        knowsAbout: KNOWS_ABOUT,
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          name: 'Fachinformatiker (IHK)',
          credentialCategory: 'Vocational qualification',
          recognizedBy: { '@type': 'Organization', name: 'Industrie- und Handelskammer (IHK)' },
        },
        sameAs: SAME_AS,
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

const alternatesHome = [...LANGS.map((l) => [hl(l), `${l.lang}/`]), ['x-default', '']];

function h1(text) {
  const nw = (t) => esc(t).replace('SAP Business One', '<span class="nw">SAP Business One</span>');
  const i = text.indexOf(' – ');
  return i < 0 ? nw(text) : `${nw(text.slice(0, i))} – <em>${nw(text.slice(i + 3))}</em>`;
}

function shot(im, r, zoom, cls, sizes) {
  const sm = im.w >= 1200 ? 640 : im.w / 2;
  return `<a href="${r}img/${im.src}-${im.w}.webp" title="${esc(zoom)}"><img src="${r}img/${im.src}-${sm}.webp" srcset="${r}img/${im.src}-${sm}.webp ${sm}w, ${r}img/${im.src}-${im.w}.webp ${im.w}w" sizes="${sizes}" width="${im.w}" height="${im.h}" alt="${esc(im.alt)}" loading="lazy" decoding="async"></a>`;
}
function caseMedia(m, r, zoom) {
  const browser = (im, cls, sizes) =>
    `<div class="browser ${cls}"><div class="chrome" aria-hidden="true"><i></i><i></i><i></i><b></b></div>${shot(im, r, zoom, cls, sizes)}</div>`;
  const solo = !m.second && !m.phone;
  return `<div class="case-media${solo ? ' solo' : ''}${m.phone ? ' has-phone' : ''}">${browser(m.main, 'main', '(min-width:1040px) 620px, 92vw')}${
    m.second ? browser(m.second, 'second', '(min-width:1040px) 400px, 60vw') : ''
  }${m.phone ? `<div class="phone">${shot(m.phone, r, zoom, 'phone', '(min-width:1040px) 180px, 30vw')}</div>` : ''}</div>`;
}

function landing(c) {
  const depth = 1;
  const r = up(depth);
  const langLinks = LANGS.map((l) => [l, `${r}${l.lang}/`]);
  const callHref = `mailto:${EMAIL}?subject=${encodeURIComponent(c.contact.callSubject)}&amp;body=${encodeURIComponent(c.contact.callBody)}`;
  return `${head({ c, title: c.title, description: c.description, path: `${c.lang}/`, depth, alternates: alternatesHome, jsonld: jsonLd(c) })}
<body id="top">
${header(c, depth, { anchors: true, langLinks })}
<main id="main">
<div class="on-ink">
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
        `<li><strong${s.count ? ` data-count="${s.count}" data-locale="${c.numLocale}"` : ''}>${esc(s.text)}</strong><span>${esc(s.label)}</span></li>`
    )
    .join('')}</ul>
</div></section>
</div>

<section id="audience" aria-labelledby="audience-h"><div class="wrap">
<div class="section-head reveal"><h2 id="audience-h">${esc(c.audience.h2)}</h2><p>${esc(c.audience.intro)}</p></div>
<div class="grid grid-3">${c.audience.items
    .map((a, i) => `<article class="card hover reveal"><div class="card-icon">${icon(['fsm', 'users', 'server'][i])}</div><h3>${esc(a.title)}</h3><p>${esc(a.text)}</p></article>`)
    .join('')}</div>
</div></section>

<section id="services" class="alt" aria-labelledby="services-h"><div class="wrap">
<div class="section-head reveal"><h2 id="services-h">${esc(c.services.h2)}</h2><p>${esc(c.services.intro)}</p></div>
<div class="grid grid-3">${c.services.items
    .map(
      (s) =>
        `<article class="card hover reveal${s.wide ? ' wide' : ''}"><div class="card-icon">${icon(s.icon)}</div><div><p class="group">${esc(s.group)}</p><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></article>`
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
${caseMedia(k.media, r, c.cases.zoom)}</article>`
    )
    .join('')}</div>
<div class="section-head reveal more-h"><h2 id="more-h">${esc(c.projects.h2)}</h2><p>${esc(c.projects.intro)}</p></div>
<div class="grid grid-3 proj">${c.projects.items
    .map(
      (p) =>
        `<article class="card hover reveal"><div class="card-icon">${icon(p.icon)}</div><span class="tag">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></article>`
    )
    .join('')}<article class="card cta-card reveal"><div><h3>${esc(c.projects.ctaTitle)}</h3><p>${esc(c.projects.ctaText)}</p></div><a class="btn btn-sm" href="${callHref}">${icon('calendar')} ${esc(c.hero.call)}</a></article></div>
</div></section>

<section id="pricing" class="alt" aria-labelledby="pricing-h"><div class="wrap">
<div class="section-head reveal"><h2 id="pricing-h">${esc(c.pricing.h2)}</h2><p>${esc(c.pricing.intro)}</p></div>
<div class="grid grid-3">${c.pricing.items
    .map(
      (p, i) =>
        `<article class="card price reveal${i === 2 ? ' featured' : ''}">${i === 2 ? `<span class="badge-top">${esc(c.pricing.featured)}</span>` : ''}<h3>${esc(p.title)}</h3><p class="amount">${esc(p.price)}</p><p>${esc(p.text)}</p><a class="btn ${i === 2 ? 'btn-primary' : 'btn-ghost'} btn-sm" href="#contact">${esc(c.nav.cta)} ${icon('arrow', 'flip')}</a></article>`
    )
    .join('')}</div>
<p class="note">${esc(c.pricing.note)}</p>
</div></section>

<section id="process" aria-labelledby="process-h"><div class="wrap">
<div class="section-head reveal"><h2 id="process-h">${esc(c.process.h2)}</h2></div>
<ol class="steps">${c.process.items.map((s) => `<li class="card reveal"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('')}</ol>
</div></section>

<section id="about" class="alt" aria-labelledby="about-h"><div class="wrap about-grid">
<div class="reveal"><div class="section-head" style="margin-bottom:1.5rem"><h2 id="about-h">${esc(c.about.h2)}</h2></div>
${c.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}
<div class="facts-box"><h3>${esc(c.about.factsTitle)}</h3><dl>${c.about.facts
    .map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v.includes('@') ? `<a class="ltr" href="mailto:${EMAIL}">${EMAIL}</a>` : esc(v)}</dd>`)
    .join('')}</dl></div></div>
<aside class="card person reveal" aria-labelledby="person-h"><p class="kicker">${esc(c.about.contactTitle)}</p>${
    PHOTO
      ? `<img class="portrait" src="${r}${PHOTO}" width="132" height="132" alt="${esc(c.about.photoAlt)}">`
      : `<div class="portrait" role="img" aria-label="${esc(c.about.photoAlt)}">TF</div>`
  }<h3 id="person-h">${esc(c.about.person.name)}</h3><p class="role">${esc(c.about.person.role)} · ${BRAND}</p><p class="cred">${esc(c.about.person.cred)}</p>
<p class="badge">${icon('award')}${esc(c.about.person.cert)}</p>
<p class="bio">${esc(c.about.person.text)}</p>
<p class="profiles"><a class="btn btn-ghost btn-sm" href="${SAME_AS[0]}" rel="me noopener" target="_blank">LinkedIn ${icon('ext')}</a><a class="btn btn-ghost btn-sm" href="${SAME_AS[1]}" rel="me noopener" target="_blank">freelancermap ${icon('ext')}</a></p>
<a class="btn btn-primary" href="${callHref}">${icon('calendar')} ${esc(c.contact.call)}</a></aside>
</div></section>

<section id="faq" aria-labelledby="faq-h"><div class="wrap">
<div class="section-head reveal"><h2 id="faq-h">${esc(c.faq.h2)}</h2></div>
<div class="faq">${c.faq.items.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
</div></section>

<div class="on-ink"><section id="contact" class="contact" aria-labelledby="contact-h"><div class="wrap contact-grid">
<div><h2 id="contact-h">${esc(c.contact.h2)}</h2><p class="lead">${esc(c.contact.lead)}</p>
<a class="btn btn-primary" href="${callHref}">${icon('calendar')} ${esc(c.contact.call)}</a>
<p class="small">${esc(c.contact.emailLabel)}</p>
<a class="mail ltr" href="mailto:${EMAIL}?subject=${encodeURIComponent(c.contact.form.subject)}">${EMAIL}</a></div>
<div class="form-card"><h3>${esc(c.contact.form.title)}</h3>
<form class="form" id="cf" data-subject="${esc(c.contact.form.subject)}">
<div class="two"><div class="field"><label for="f-name">${esc(c.contact.form.name)}</label><input id="f-name" name="name" autocomplete="name" required></div>
<div class="field"><label for="f-email">${esc(c.contact.form.email)}</label><input id="f-email" name="email" type="email" autocomplete="email" dir="ltr" required></div></div>
<div class="field"><label for="f-company">${esc(c.contact.form.company)}</label><input id="f-company" name="company" autocomplete="organization"></div>
<div class="field"><label for="f-msg">${esc(c.contact.form.message)}</label><textarea id="f-msg" name="message" required></textarea></div>
<div><button class="btn btn-primary" type="submit">${icon('mail')} ${esc(c.contact.form.submit)}</button></div>
<p class="note">${esc(c.contact.form.note)}</p>
</form></div>
</div></section></div>
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

function chooser() {
  const c = en;
  const langLinks = LANGS.map((l) => [l, `${l.lang}/`]);
  return `${head({ c, title: c.title, description: en.description, path: '', depth: 0, alternates: alternatesHome })}
<body>
<script>(function(){var m={de:'de',ar:'ar',zh:'zh',en:'en'},l=(navigator.languages||[navigator.language||'en']);for(var i=0;i<l.length;i++){var k=String(l[i]).slice(0,2).toLowerCase();if(m[k]){location.replace(m[k]+'/');return}}location.replace('en/')})();</script>
${header(c, 0, { anchors: false, langLinks })}
<main id="main" class="on-ink"><div class="chooser"><div class="wrap">
<h1>${BRAND}</h1>
<p class="lead">SAP Business One · SAP Field Service Management · Cloudflare &amp; IoT</p>
<ul>${LANGS.map((l) => `<li><a class="btn btn-ghost" href="${l.lang}/" hreflang="${hl(l)}" lang="${l.htmlLang}">${esc(l.label)}</a></li>`).join('')}</ul>
</div></div></main>
${footer(c, 0)}
<script>${themeScript}</script>
</body>
</html>
`;
}

function notFound() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found · ${BRAND}</title><meta name="robots" content="noindex">${headInit}<style>${cssSrc.replaceAll('__R__', '/')}</style></head>
<body><main id="main" class="on-ink"><div class="chooser"><div class="wrap"><h1>404</h1><p class="lead">Page not found · Seite nicht gefunden · الصفحة غير موجودة · 页面未找到</p>
<ul>${LANGS.map((l) => `<li><a class="btn btn-ghost" data-p="${l.lang}/" href="/${l.lang}/" lang="${l.htmlLang}">${esc(l.label)}</a></li>`).join('')}</ul></div></div></main>
<script>var b=location.hostname.endsWith('github.io')?'/'+location.pathname.split('/')[1]+'/':'/';document.querySelectorAll('[data-p]').forEach(function(a){a.href=b+a.dataset.p})</script></body></html>
`;
}

function sitemap() {
  const alt = alternatesHome.map(([h, p]) => `<xhtml:link rel="alternate" hreflang="${h}" href="${SITE + p}"/>`).join('');
  const urls = [...LANGS.map((l) => `${l.lang}/`), ''];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((p) => `<url><loc>${SITE + p}</loc><lastmod>${TODAY}</lastmod>${alt}</url>`).join('\n')}
</urlset>
`;
}

function llms() {
  const c = en;
  return `# ${BRAND} – SAP Business One, SAP FSM & Integration

> ${c.schema.orgDescription} Founder and contact: TOF Solution, IHK-certified IT specialist (Fachinformatiker). Working languages: English, German, Arabic. Contact: ${EMAIL}

## Key facts
${c.about.facts.map(([k, v]) => `- ${k}: ${v}`).join('\n')}

## Who we work with
${c.audience.items.map((a) => `- ${a.title}: ${a.text}`).join('\n')}

## Services
${c.services.items.map((s) => `- ${s.title} (${s.group}): ${s.text}`).join('\n')}

## Case studies (demo data, no client names)
${c.cases.items.map((k) => `### ${k.title}\n- Situation: ${k.situation}\n- Solution: ${k.solution}\n- Result: ${k.result}`).join('\n\n')}

## More projects
${c.projects.items.map((p) => `- ${p.title}: ${p.text}`).join('\n')}

## Pricing
${c.pricing.items.map((p) => `- ${p.title}: ${p.price}. ${p.text}`).join('\n')}
- ${c.pricing.note}

## How a project runs
${c.process.items.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join('\n')}

## FAQ
${c.faq.items.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Pages
- [English](${SITE}en/)
- [Deutsch](${SITE}de/)
- [العربية](${SITE}ar/)
- [简体中文](${SITE}zh/)
- [Impressum](${SITE}de/impressum/) · [Imprint](${SITE}en/imprint/)
- [Datenschutz](${SITE}de/datenschutz/) · [Privacy](${SITE}en/privacy/)

## Profiles (TOF Solution)
${SAME_AS.map((u) => `- ${u}`).join('\n')}
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
write('index.html', chooser());
for (const c of LANGS) write(`${c.lang}/index.html`, landing(c));
for (const p of legalPages(EMAIL)) write(`${p.path}index.html`, legal(p));
write('404.html', notFound());
write('sitemap.xml', sitemap());
write('llms.txt', llms());
write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
write('CNAME', 'tarekfatal.com\n');
write('.nojekyll', '');
console.log('Built →', OUT);
