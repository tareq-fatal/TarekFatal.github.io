// Persönliche Profilseite (Startseite DE / EN / AR) für Freelance-Projekte und Jobs.
import { P, PROFILE, PROFILE_SKILLS } from './content/profil.mjs';

export const PROFILE_LANGS = ['de', 'en', 'ar'];

export function renderProfile(lang, h) {
  const { head, header, footer, icon, esc, up, themeScript, motionScript, caseArt, LANGS_BY, EMAIL, homePath, alternates, jsonLd } = h;
  const t = P[lang];
  const c = LANGS_BY[lang];
  const path = homePath(c);
  const depth = lang === 'de' ? 0 : 1;
  const r = up(depth);
  const langLinks = ['de', 'en', 'ar'].map((l) => [LANGS_BY[l], r + homePath(LANGS_BY[l])]);
  const ph = (text) => `<span class="ph" title="${esc(t.ph)}">${esc(text)}</span>`;
  const name = PROFILE.name ? esc(PROFILE.name) : ph(t.namePh);
  const photo = PROFILE.photo
    ? `<img class="portrait" src="${r}${esc(PROFILE.photo)}" alt="${esc(PROFILE.name)}" width="320" height="320" fetchpriority="high">`
    : `<div class="portrait-ph" role="img" aria-label="${esc(t.photoPh)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg><span class="ph">${esc(t.photoPh)}</span></div>`;
  const available = PROFILE.availableFrom ? esc(PROFILE.availableFrom) : `${esc(t.availOnRequest)}`;
  const workload = `<bdi dir="ltr">${PROFILE.workload ? esc(PROFILE.workload) : ph('20–40 h')}</bdi>`;
  const links = Object.entries(PROFILE.links);
  const linkList = links
    .map(([k, url]) => (url ? `<li><a href="${esc(url)}" rel="me noopener" target="_blank">${esc(t.linkLabels[k])} ${icon('ext')}</a></li>` : `<li><span class="ph">${esc(t.linkLabels[k])}</span></li>`))
    .join('');
  const cvBtn = PROFILE.cv
    ? `<a class="btn btn-ghost" href="${r}${esc(PROFILE.cv)}" download>${icon('invoice')} ${esc(t.cv)}</a>`
    : `<a class="btn btn-ghost" href="#kontakt">${icon('invoice')} ${esc(t.cvOnRequest)}</a>`;
  const nav = [...t.nav.map(([l, id]) => [l, `#${id}`])];

  const body = `<main id="main">
<section class="hero profile-hero" aria-labelledby="h1"><div class="wrap">
<div class="profile-grid">
<div class="profile-card card">
${photo}
<p class="pname">${name}</p>
<p class="prole">${esc(t.role)}</p>
<dl class="pfacts">
<div><dt>${esc(t.avail)}</dt><dd><span class="dot-live" aria-hidden="true"></span>${available}</dd></div>
<div><dt>${esc(t.workload)}</dt><dd>${workload}</dd></div>
</dl>
<ul class="pchips">${t.chips.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
</div>
<div>
<h1 id="h1">${esc(t.h1)}</h1>
<p class="lead">${esc(t.lead)}</p>
<div class="cta-row"><a class="btn btn-primary" href="#kontakt">${icon('mail')} ${esc(t.cta)}</a><a class="btn btn-ghost" href="#projekte">${esc(t.ctaProjects)} ${icon('arrow', 'flip')}</a></div>
<ul class="stats compact">${c.stats.map((s) => `<li><strong>${esc(s.text)}</strong><span>${esc(s.label)}</span></li>`).join('')}</ul>
</div>
</div></div></section>

<section id="schwerpunkte" aria-labelledby="skills-h"><div class="wrap">
<div class="section-head reveal"><h2 id="skills-h">${esc(t.skillsH)}</h2><p>${esc(t.skillsIntro)}</p></div>
<div class="grid grid-3">${PROFILE_SKILLS.map((s) => {
    const [title, text] = t.skills[s.key];
    return `<article class="card skill reveal"><div class="card-icon">${icon(s.icon)}</div><h3>${esc(title)}</h3><p>${esc(text)}</p><p class="tags">${s.tags.map((x) => `<span dir="ltr">${esc(x)}</span>`).join('')}</p></article>`;
  }).join('')}</div>
</div></section>

<section id="projekte" class="alt" aria-labelledby="cases-h"><div class="wrap">
<div class="section-head reveal"><h2 id="cases-h">${esc(t.casesH)}</h2><p>${esc(t.casesIntro)}</p></div>
<div class="cases">${c.cases.items
    .map(
      (k) => `<article class="case reveal"><div><span class="tag">${esc(k.tag)}</span><h3>${esc(k.title)}</h3><dl class="sar">
<dt>${esc(c.cases.labels.situation)}</dt><dd>${esc(k.situation)}</dd>
<dt>${esc(c.cases.labels.solution)}</dt><dd>${esc(k.solution)}</dd>
<dt>${esc(c.cases.labels.result)}</dt><dd class="result">${icon('check')}<span>${esc(k.result)}</span></dd></dl></div>
${caseArt(k.art, c, k.title)}</article>`
    )
    .join('')}</div>
<div class="section-head reveal more-h"><h2>${esc(t.moreH)}</h2></div>
<div class="grid grid-3 proj">${c.projects.items
    .map((p) => `<article class="card hover reveal"><div class="card-icon">${icon(p.icon)}</div><span class="tag">${esc(p.tag)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>${p.tech && p.tech.length ? `<p class="tags">${p.tech.map((x) => `<span dir="ltr">${esc(x)}</span>`).join('')}</p>` : ''}</article>`)
    .join('')}</div>
</div></section>

<section id="werdegang" aria-labelledby="tl-h"><div class="wrap tl-grid">
<div class="section-head reveal"><h2 id="tl-h">${esc(t.timelineH)}</h2><p>${esc(t.timelineIntro)}</p>${cvBtn}</div>
<ol class="timeline reveal">${t.timeline.map(([a, d, yph]) => `<li><span class="tl-year">${yph ? ph(t.yearPh) : ''}</span><div><h3>${esc(a)}</h3><p>${esc(d)}</p></div></li>`).join('')}</ol>
</div></section>

<section id="arbeitsweise" class="alt" aria-labelledby="how-h"><div class="wrap">
<div class="section-head reveal"><h2 id="how-h">${esc(t.howH)}</h2><p>${esc(t.conditions)}</p></div>
<div class="grid grid-4">${t.how.map(([ic, a, d]) => `<article class="card reveal"><div class="card-icon">${icon(ic)}</div><h3>${esc(a)}</h3><p>${esc(d)}</p></article>`).join('')}</div>
</div></section>

<section id="kontakt" class="contact" aria-labelledby="contact-h"><div class="wrap contact-grid">
<div><h2 id="contact-h">${esc(t.contactH)}</h2><p class="lead">${esc(t.contactLead)}</p>
<a class="mail" href="mailto:${EMAIL}?subject=${encodeURIComponent(t.form.subject)}">${icon('mail')} ${esc(c.contact.mailText)}</a>
<h3 class="profiles-h">${esc(t.profiles)}</h3><ul class="plinks">${linkList}</ul>
<p class="small offer-note"><a href="${r}${lang === 'de' ? 'webseite/' : `${lang}/website/`}">${esc(t.offerLink)} ${icon('arrow', 'flip')}</a></p></div>
<div class="form-card"><form class="form" id="pf" data-subject="${esc(t.form.subject)}" novalidate>
<div class="two"><div class="field"><label for="p-name">${esc(t.form.name)}</label><input id="p-name" name="name" autocomplete="name" required></div>
<div class="field"><label for="p-email">${esc(t.form.email)}</label><input id="p-email" name="email" type="email" autocomplete="email" dir="ltr" required></div></div>
<div class="field"><label for="p-company">${esc(t.form.company)}</label><input id="p-company" name="company" autocomplete="organization"></div>
<div class="field"><label for="p-role">${esc(t.form.role)}</label><input id="p-role" name="role" required></div>
<div class="three"><div class="field"><label for="p-start">${esc(t.form.start)}</label><input id="p-start" name="start"></div>
<div class="field"><label for="p-dur">${esc(t.form.duration)}</label><input id="p-dur" name="duration"></div>
<div class="field"><label for="p-load">${esc(t.form.load)}</label><input id="p-load" name="load"></div></div>
<fieldset class="field slots"><legend>${esc(t.form.mode)}</legend><div class="chips">${t.form.modes.map((m, i) => `<label class="chip-r"><input type="radio" name="mode" value="${esc(m)}"${i === 0 ? ' checked' : ''}><span>${esc(m)}</span></label>`).join('')}</div></fieldset>
<div class="field"><label for="p-msg">${esc(t.form.message)}</label><textarea id="p-msg" name="message" rows="4" required></textarea></div>
<div><button class="btn btn-primary" type="submit">${icon('mail')} ${esc(t.form.submit)}</button></div>
<p class="note">${esc(t.form.note)}</p>
</form></div>
</div></section>
</main>`;

  const L = t.form;
  const script = `var pf=document.getElementById('pf');pf.addEventListener('submit',function(e){e.preventDefault();if(!pf.checkValidity()){pf.reportValidity();return}var g=function(n){var x=pf.elements[n];return x?(x.value||'').trim():''},m=(pf.querySelector('input[name=mode]:checked')||{}).value||'';var b=[${JSON.stringify(L.role)}+': '+g('role'),${JSON.stringify(L.start)}+': '+g('start'),${JSON.stringify(L.duration)}+': '+g('duration'),${JSON.stringify(L.load)}+': '+g('load'),${JSON.stringify(L.mode)}+': '+m,'',g('message'),'','— '+g('name')+(g('company')?' · '+g('company'):''),g('email')].join('\\n');location.href='mailto:${EMAIL}?subject='+encodeURIComponent(pf.dataset.subject+': '+g('role'))+'&body='+encodeURIComponent(b)});`;

  return `${head({ c, title: t.title, description: t.description, path, depth, alternates, jsonld: jsonLd(c) })}
<body id="top">
${header(c, depth, { anchors: true, langLinks, links: nav, cta: { href: '#kontakt', label: t.cta } })}
${body}
${footer(c, depth)}
<script>${themeScript}${motionScript}${script}</script>
</body>
</html>
`;
}
