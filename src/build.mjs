// Static site generator for tarekfatal.com – no dependencies.
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
const LANGS = [en, de, ar, zh];
const TODAY = new Date().toISOString().slice(0, 10);
const YEAR = TODAY.slice(0, 4);
const SAME_AS = [
  'https://www.linkedin.com/in/tof-solution/',
  'https://www.freelancermap.de/profil/tof-solution',
];
const KNOWS_ABOUT = [
  'SAP Field Service Management',
  'SAP Business One',
  'SAP S/4HANA',
  'SAP Business One SDK',
  'System integration',
  'Cloudflare',
  'Cloudflare Tunnel',
  'Internet of Things',
  'Web development',
  'E-government',
  'Maritime situational awareness',
  'Radar integration',
];
const DIAGRAM_LABEL = {
  en: 'Diagram: SAP FSM connected with SAP Business One, SAP S/4HANA, Cloudflare and IoT',
  de: 'Grafik: SAP FSM verbunden mit SAP Business One, SAP S/4HANA, Cloudflare und IoT',
  ar: 'رسم توضيحي: SAP FSM مرتبط مع SAP Business One وSAP S/4HANA وCloudflare وإنترنت الأشياء',
  zh: '示意图：SAP FSM 与 SAP Business One、SAP S/4HANA、Cloudflare 和物联网相连',
};

const css = readFileSync(join(ROOT, 'src/styles.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s*\n\s*/g, '')
  .replace(/\s*([{};,>])\s*/g, '$1');

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const up = (depth) => '../'.repeat(depth);
const hl = (c) => c.hreflang || c.lang;

const ICONS = {
  fsm: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  erp: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="m10 13 2 2 3-3"/>',
  web: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/>',
  check: '<circle cx="12" cy="12" r="10"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  ext: '<path d="M7 17 17 7M8 7h9v9"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
};
const icon = (name, cls = '') =>
  `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

const diagram = (c) => {
  const nodes = [
    [110, 92, 'SAP B1'],
    [330, 92, 'S/4HANA'],
    [110, 348, 'Cloudflare'],
    [330, 348, 'IoT'],
  ];
  return `<svg class="diagram" viewBox="0 0 440 440" role="img" aria-label="${esc(DIAGRAM_LABEL[c.lang])}" direction="ltr">
<circle class="ring" cx="220" cy="220" r="118"/><circle class="ring" cx="220" cy="220" r="190" stroke-dasharray="2 10"/>
${nodes.map(([x, y]) => `<path class="ln" d="M220 220L${x} ${y}"/>`).join('')}
${nodes
  .map(
    ([x, y, t]) =>
      `<g><rect class="node" x="${x - 62}" y="${y - 24}" width="124" height="48" rx="14"/><text x="${x}" y="${y + 5}" text-anchor="middle">${t}</text></g>`
  )
  .join('')}
<circle class="core" cx="220" cy="220" r="62"/><text class="core-t" x="220" y="214" text-anchor="middle" font-size="17">SAP</text><text class="core-t" x="220" y="238" text-anchor="middle" font-size="17">FSM</text>
</svg>`;
};

const themeInit = `<script>try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>`;
const themeScript = `var d=document.documentElement,b=document.getElementById('theme');function cur(){return d.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}function sync(){b.setAttribute('aria-pressed',cur()==='dark')}sync();b.addEventListener('click',function(){var n=cur()==='dark'?'light':'dark';d.dataset.theme=n;try{localStorage.setItem('theme',n)}catch(e){}sync()});document.addEventListener('click',function(e){document.querySelectorAll('details.lang[open]').forEach(function(x){if(!x.contains(e.target))x.removeAttribute('open')})});`;

function head({ c, title, description, path, alternates, robots = 'index,follow', jsonld }) {
  const url = SITE + path;
  const ogImg = `${SITE}og/og-${c.lang}.png`;
  return `<!doctype html>
<html lang="${c.htmlLang}" dir="${c.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${robots}">
<meta name="author" content="TOF Solution">
<link rel="canonical" href="${url}">
${(alternates || []).map(([h, p]) => `<link rel="alternate" hreflang="${h}" href="${SITE + p}">`).join('\n')}
<meta property="og:type" content="website">
<meta property="og:site_name" content="TOF Solution">
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
<meta name="theme-color" content="#f7f8fa" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0a101d" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${up(path.split('/').length - 1)}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${up(path.split('/').length - 1)}apple-touch-icon.png">
${themeInit}
<style>${css}</style>
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>`;
}

function header(c, depth, { anchors = true, langLinks }) {
  const pre = anchors ? '' : `${up(depth)}${c.lang}/`;
  const nav = anchors
    ? `<nav class="nav" aria-label="${esc(c.nav.menu)}">${['services', 'projects', 'process', 'about', 'faq']
        .map((k) => `<a href="${pre}#${k}">${esc(c.nav[k])}</a>`)
        .join('')}</nav>`
    : '';
  return `<a class="skip" href="#main">${esc(c.nav.skip)}</a>
<header class="site-header"><div class="wrap bar">
<a class="brand" href="${anchors ? '#top' : `${up(depth)}${c.lang}/`}"><span class="mark" aria-hidden="true">TF</span><span>TOF Solution</span></a>
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
  return `<footer class="site-footer"><div class="wrap foot">
<p style="margin:0">© ${YEAR} TOF Solution · TOF Solution · ${esc(c.footer.tagline)}</p>
<nav aria-label="Footer"><a href="${r}${c.footer.imprint.href}">${esc(c.footer.imprint.label)}</a><a href="${r}${c.footer.privacy.href}">${esc(c.footer.privacy.label)}</a><a class="ltr" href="mailto:${EMAIL}">${EMAIL}</a></nav>
</div></footer>`;
}

function jsonLd(c) {
  const url = `${SITE}${c.lang}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE}#website`,
        url: SITE,
        name: 'TOF Solution',
        inLanguage: LANGS.map(hl),
        publisher: { '@id': `${SITE}#business` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE}#person`,
        name: 'TOF Solution',
        url: SITE,
        email: `mailto:${EMAIL}`,
        jobTitle: c.schema.jobTitle,
        description: c.schema.personDescription,
        worksFor: { '@id': `${SITE}#business` },
        address: { '@type': 'PostalAddress', addressCountry: 'DE' },
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
        '@type': 'ProfessionalService',
        '@id': `${SITE}#business`,
        name: 'TOF Solution',
        alternateName: 'TOF Solution – SAP FSM & Integration',
        url: SITE,
        email: EMAIL,
        image: `${SITE}og/og-en.png`,
        logo: `${SITE}apple-touch-icon.png`,
        description: c.schema.businessDescription,
        founder: { '@id': `${SITE}#person` },
        address: { '@type': 'PostalAddress', addressCountry: 'DE' },
        areaServed: [{ '@type': 'Country', name: 'Germany' }, { '@type': 'Place', name: 'Remote' }],
        availableLanguage: ['de', 'en', 'ar'],
        knowsAbout: KNOWS_ABOUT,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: c.services.h2,
          itemListElement: c.services.items.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.title,
              description: s.text,
              provider: { '@id': `${SITE}#business` },
              areaServed: { '@type': 'Country', name: 'Germany' },
            },
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
        about: { '@id': `${SITE}#person` },
        primaryImageOfPage: `${SITE}og/og-${c.lang}.png`,
        dateModified: TODAY,
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: hl(c),
        isPartOf: { '@id': `${url}#webpage` },
        mainEntity: c.faq.items.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

const alternatesHome = [...LANGS.map((l) => [hl(l), `${l.lang}/`]), ['x-default', '']];

function landing(c) {
  const depth = 1;
  const r = up(depth);
  const langLinks = LANGS.map((l) => [l, `${r}${l.lang}/`]);
  return `${head({ c, title: c.title, description: c.description, path: `${c.lang}/`, alternates: alternatesHome, jsonld: jsonLd(c) })}
<body id="top">
${header(c, depth, { anchors: true, langLinks })}
<main id="main">
<section class="hero" aria-labelledby="h1"><div class="wrap hero-grid">
<div>
<p class="eyebrow"><span class="dot" aria-hidden="true"></span>${esc(c.hero.eyebrow)}</p>
<h1 id="h1">${esc(c.hero.h1)}</h1>
<p class="lead">${esc(c.hero.lead)}</p>
<div class="cta-row"><a class="btn btn-primary" href="#contact">${esc(c.hero.cta)} ${icon('arrow', 'arrow')}</a><a class="btn btn-ghost" href="#projects">${esc(c.hero.secondary)}</a></div>
<ul class="facts">${c.hero.facts.map(([n, t]) => `<li><strong>${esc(n)}</strong><span>${esc(t)}</span></li>`).join('')}</ul>
</div>
<div>${diagram(c)}</div>
</div></section>

<section id="services" aria-labelledby="services-h"><div class="wrap">
<div class="section-head"><h2 id="services-h">${esc(c.services.h2)}</h2><p>${esc(c.services.intro)}</p></div>
<div class="grid grid-2">${c.services.items
    .map((s) => `<article class="card"><div class="card-icon">${icon(s.icon)}</div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></article>`)
    .join('')}</div>
</div></section>

<section id="projects" class="alt" aria-labelledby="projects-h"><div class="wrap">
<div class="section-head"><h2 id="projects-h">${esc(c.projects.h2)}</h2><p>${esc(c.projects.intro)}</p></div>
<div class="grid grid-3">${c.projects.items
    .map(
      (p) => `<article class="card"><span class="tag">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p><div class="result-wrap"><p class="result">${icon('check')}<span><span class="sr-only">${esc(c.projects.resultLabel)}: </span>${esc(p.result)}</span></p>${
        p.link
          ? `<a class="more" href="${p.link}" rel="noopener" target="_blank">${esc(p.linkLabel)} ${icon('ext')}</a>`
          : ''
      }</div></article>`
    )
    .join('')}</div>
</div></section>

<section id="process" aria-labelledby="process-h"><div class="wrap">
<div class="section-head"><h2 id="process-h">${esc(c.process.h2)}</h2></div>
<ol class="steps grid grid-3">${c.process.items
    .map((s) => `<li class="card"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`)
    .join('')}</ol>
</div></section>

<section id="about" class="alt" aria-labelledby="about-h"><div class="wrap about-grid">
<div><h2 id="about-h">${esc(c.about.h2)}</h2>${c.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
<aside class="facts-box" aria-labelledby="facts-h"><h3 id="facts-h">${esc(c.about.factsTitle)}</h3><dl>${c.about.facts
    .map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v.includes('@') ? `<a class="ltr" href="mailto:${EMAIL}">${EMAIL}</a>` : esc(v)}</dd>`)
    .join('')}</dl></aside>
</div></section>

<section id="faq" aria-labelledby="faq-h"><div class="wrap">
<div class="section-head"><h2 id="faq-h">${esc(c.faq.h2)}</h2></div>
<div class="faq">${c.faq.items
    .map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join('')}</div>
</div></section>

<section id="contact" aria-labelledby="contact-h"><div class="wrap">
<div class="contact-box">
<div><h2 id="contact-h">${esc(c.contact.h2)}</h2><p class="lead">${esc(c.contact.lead)}</p>
<p style="margin:0 0 .4rem;color:var(--muted)">${esc(c.contact.emailLabel)}</p>
<a class="mail ltr" href="mailto:${EMAIL}?subject=${encodeURIComponent(c.contact.form.subject)}">${EMAIL}</a></div>
<form class="form" id="cf" data-subject="${esc(c.contact.form.subject)}">
<div class="two"><div class="field"><label for="f-name">${esc(c.contact.form.name)}</label><input id="f-name" name="name" autocomplete="name" required></div>
<div class="field"><label for="f-email">${esc(c.contact.form.email)}</label><input id="f-email" name="email" type="email" autocomplete="email" dir="ltr" required></div></div>
<div class="field"><label for="f-company">${esc(c.contact.form.company)}</label><input id="f-company" name="company" autocomplete="organization"></div>
<div class="field"><label for="f-msg">${esc(c.contact.form.message)}</label><textarea id="f-msg" name="message" required></textarea></div>
<div><button class="btn btn-primary" type="submit">${icon('mail')} ${esc(c.contact.form.submit)}</button></div>
<p class="note">${esc(c.contact.form.note)}</p>
</form>
</div>
</div></section>
</main>
${footer(c, depth)}
<script>${themeScript}var f=document.getElementById('cf');f.addEventListener('submit',function(e){e.preventDefault();var g=function(n){return(f.elements[n].value||'').trim()},b=g('message')+'\\n\\n— '+g('name')+(g('company')?' · '+g('company'):'')+'\\n'+g('email');location.href='mailto:${EMAIL}?subject='+encodeURIComponent(f.dataset.subject+': '+g('name'))+'&body='+encodeURIComponent(b)});</script>
</body>
</html>
`;
}

function legal(page) {
  const c = page.lang === 'de' ? de : en;
  const depth = page.path.split('/').length - 1;
  const r = up(depth);
  const langLinks = page.pair.map(([l, p]) => [l === 'de' ? de : en, r + p]);
  return `${head({
    c,
    title: page.title,
    description: page.description,
    path: page.path,
    alternates: page.pair.map(([l, p]) => [l, p]),
    robots: 'noindex,follow',
  })}
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
  return `${head({
    c,
    title: 'TOF Solution · SAP Field Service Management & Integration',
    description: en.description,
    path: '',
    alternates: alternatesHome,
  })}
<body>
<script>(function(){var m={de:'de',ar:'ar',zh:'zh',en:'en'},l=(navigator.languages||[navigator.language||'en']);for(var i=0;i<l.length;i++){var k=String(l[i]).slice(0,2).toLowerCase();if(m[k]){location.replace(m[k]+'/');return}}location.replace('en/')})();</script>
${header(c, 0, { anchors: false, langLinks })}
<main id="main" class="chooser"><div class="wrap">
<h1>TOF Solution</h1>
<p class="lead" style="margin-inline:auto">SAP Field Service Management &amp; Integration – SAP Business One, S/4HANA, Cloudflare, IoT.</p>
<ul>${LANGS.map((l) => `<li><a class="btn btn-ghost" href="${l.lang}/" hreflang="${hl(l)}" lang="${l.htmlLang}">${esc(l.label)}</a></li>`).join('')}</ul>
</div></main>
${footer(c, 0)}
<script>${themeScript}</script>
</body>
</html>
`;
}

function notFound() {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found · TOF Solution</title><meta name="robots" content="noindex">${themeInit}<style>${css}</style></head>
<body><main id="main" class="chooser"><div class="wrap"><h1>404</h1><p class="lead" style="margin-inline:auto">Page not found · Seite nicht gefunden · الصفحة غير موجودة · 页面未找到</p>
<ul>${LANGS.map((l) => `<li><a class="btn btn-ghost" data-p="${l.lang}/" href="/${l.lang}/" lang="${l.htmlLang}">${esc(l.label)}</a></li>`).join('')}</ul></div></main>
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
  return `# TOF Solution – SAP Field Service Management & Integration

> ${c.schema.personDescription} Based in Germany, working remotely. Working languages: German, English, Arabic. Contact: ${EMAIL}

## Key facts
${c.about.facts.map(([k, v]) => `- ${k}: ${v}`).join('\n')}

## Services
${c.services.items.map((s) => `- ${s.title}: ${s.text}`).join('\n')}

## Selected projects (no client names)
${c.projects.items.map((p) => `- ${p.title}: ${p.text} Result: ${p.result}${p.link ? ` Demo: ${p.link}` : ''}`).join('\n')}

## How a project starts
${c.process.items.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join('\n')}

## FAQ
${c.faq.items.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}

## Pages
- [English](${SITE}en/): Main page in English
- [Deutsch](${SITE}de/): Hauptseite auf Deutsch
- [العربية](${SITE}ar/): الصفحة الرئيسية بالعربية
- [简体中文](${SITE}zh/): 中文主页
- [Impressum](${SITE}de/impressum/) · [Imprint](${SITE}en/imprint/)
- [Datenschutz](${SITE}de/datenschutz/) · [Privacy](${SITE}en/privacy/)

## Profiles
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
