// Angebotsseite „Webseite zum Festpreis“ (/webseite/, /en/website/, /ar/website/).
// Bekommt die Bausteine aus build.mjs (head, header, footer, icon, esc …) übergeben, damit Design und Prüfungen gleich bleiben.
import { T, SLOTS, DEMOS, PATHS, PRICE_NET, VAT_RATE } from './content/webseite.mjs';

export const OFFER_LANGS = ['de', 'en', 'ar'];
export { PATHS as OFFER_PATHS };

const depthOf = (p) => p.split('/').filter(Boolean).length;

function oldSite(o) {
  // nachgestellte, typische alte Webseite (reines HTML/CSS, kein Foto eines echten Betriebs)
  return `<div class="oldsite" lang="de" dir="ltr" aria-hidden="true"><div class="os-top">${o.welcome}</div><div class="os-row"><ul>${o.items.map((i) => `<li>${i}</li>`).join('')}</ul><div class="os-main"><p class="os-marq">+++ NEU: Jetzt auch samstags geöffnet +++</p><p>${o.text}</p><div class="os-img"></div><p class="os-small">${o.update}<br>Sie sind Besucher Nr. <span class="os-ctr">004711</span></p><p>Hier finden Sie Informationen über unseren Betrieb, unsere Leistungen und Anfahrt. Bitte klicken Sie links auf einen Menüpunkt. Für Fragen rufen Sie uns an oder schreiben Sie ein Fax.</p><div class="os-img"></div><p class="os-small">Gästebuch · Impressum · Webring</p></div></div></div>`;
}

export function renderOffer(lang, h) {
  const { head, header, footer, icon, esc, up, themeScript, motionScript, LANGS_BY, EMAIL } = h;
  const t = T[lang];
  const c = LANGS_BY[lang];
  const path = PATHS[lang];
  const depth = depthOf(path);
  const r = up(depth);
  const langLinks = Object.entries(PATHS).map(([l, p]) => [LANGS_BY[l], r + p]);
  const alternates = [...Object.entries(PATHS).map(([l, p]) => [l, p]), ['x-default', PATHS.de]];
  const b = t.book;
  const pdf = `${r}webseite/${lang === 'ar' ? 'angebot-webseite-ar.pdf' : lang === 'en' ? 'offer-website-en.pdf' : 'angebot-webseite.pdf'}`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t.hero.h1,
    serviceType: 'Website design',
    description: t.description,
    provider: { '@type': 'Organization', name: 'TOF Solution', url: 'https://tarekfatal.com/' },
    areaServed: { '@type': 'Country', name: 'Germany' },
    offers: {
      '@type': 'Offer',
      price: PRICE_NET,
      priceCurrency: 'EUR',
      priceSpecification: { '@type': 'PriceSpecification', price: PRICE_NET, priceCurrency: 'EUR', valueAddedTaxIncluded: !VAT_RATE },
    },
  };
  const cfg = { slots: SLOTS, days: b.days, loc: b.months, labels: b.labels, subject: b.mailSubject, ok: b.okText, hows: b.hows, noSlot: b.noSlot, icsTitle: b.icsTitle, lang };
  const demoCard = (d) => {
    const [cat, name] = t.demoNames[d.key];
    return `<article class="card demo-card reveal"><a class="demo-shot" href="${d.url}" target="_blank" rel="noopener"><img class="shot" src="${r}webseite/demo-${d.key}.webp" alt="${esc(`${t.afterNote}: ${name}`)}" width="1000" height="630" loading="lazy" decoding="async"><img class="shot phone" src="${r}webseite/demo-${d.key}-mobil.webp" alt="" width="390" height="844" loading="lazy" decoding="async"></a><p class="group">${esc(cat)}</p><h3>${esc(name)}</h3><a class="btn btn-ghost btn-sm" href="${d.url}" target="_blank" rel="noopener">${esc(t.demoOpen)} ${icon('ext')}</a></article>`;
  };

  const body = `<main id="main">
<section class="hero offer-hero" aria-labelledby="h1"><div class="wrap"><div class="hero-grid">
<div>
<p class="pill"><span class="pulse" aria-hidden="true"></span>${esc(t.hero.pill)}</p>
<h1 id="h1">${esc(t.hero.h1)}</h1>
<p class="lead">${esc(t.hero.lead)}</p>
<div class="cta-row"><a class="btn btn-primary" href="#termin">${icon('calendar')} ${esc(t.hero.cta)}</a><a class="btn btn-ghost" href="#muster">${esc(t.hero.demos)} ${icon('arrow', 'flip')}</a></div>
<ul class="trust">${t.hero.trust.map((x) => `<li>${icon('tick')}${esc(x)}</li>`).join('')}</ul>
</div>
<aside class="card price-card" aria-label="${esc(t.price.label)}"><p class="group">${esc(t.price.label)}</p><p class="price"><span dir="ltr">${esc(t.price.amount)}</span></p><p class="vat">${esc(t.price.vat)}</p><p class="small">${esc(t.price.sub)}</p>
<ul class="mini">${t.incl.slice(0, 6).map(([a]) => `<li>${icon('tick')}${esc(a)}</li>`).join('')}</ul>
<a class="btn btn-primary" href="#termin">${icon('calendar')} ${esc(t.nav)}</a><a class="pdf-link" href="${pdf}" download>${icon('invoice')} ${esc(t.pdf)}</a></aside>
</div></div></section>

<section id="inklusive" aria-labelledby="incl-h"><div class="wrap">
<div class="section-head reveal"><h2 id="incl-h">${esc(t.inclH)}</h2></div>
<ul class="incl reveal">${t.incl.map(([a, d]) => `<li>${icon('check')}<div><b>${esc(a)}</b><span>${esc(d)}</span></div></li>`).join('')}</ul>
<div class="card excl reveal"><h3>${esc(t.exclH)}</h3><ul>${t.excl.map(([a, d]) => `<li>${icon('x')}<div><b>${esc(a)}</b><span>${esc(d)}</span></div></li>`).join('')}</ul><p class="note">${esc(t.extraNote)}</p></div>
</div></section>

<section id="ablauf" class="alt" aria-labelledby="steps-h"><div class="wrap">
<div class="section-head reveal"><h2 id="steps-h">${esc(t.stepsH)}</h2></div>
<ol class="steps three">${t.steps.map(([a, d]) => `<li class="card reveal"><h3>${esc(a)}</h3><p>${esc(d)}</p></li>`).join('')}</ol>
</div></section>

<section id="muster" aria-labelledby="demos-h"><div class="wrap">
<div class="section-head reveal"><h2 id="demos-h">${esc(t.demosH)}</h2><p>${esc(t.demosIntro)}</p></div>
<div class="grid grid-3">${DEMOS.map(demoCard).join('')}</div>
</div></section>

<section id="vorher-nachher" class="alt" aria-labelledby="ba-h"><div class="wrap">
<div class="section-head reveal"><h2 id="ba-h">${esc(t.baH)}</h2><p>${esc(t.baIntro)}</p></div>
<div class="ba-pair reveal">
<figure><div class="phone-frame">${oldSite(t.old)}</div><figcaption><b>${esc(t.before)}</b> · ${esc(t.beforeNote)}</figcaption></figure>
<div class="ba-arrow" aria-hidden="true">${icon('arrow', 'flip')}</div>
<figure><div class="phone-frame"><img class="shot" src="${r}webseite/demo-maler-mobil.webp" alt="${esc(`${t.after}: ${t.demoNames.maler[1]}`)}" width="390" height="844" loading="lazy" decoding="async"></div><figcaption><b>${esc(t.after)}</b> · ${esc(t.afterNote)}</figcaption></figure>
</div>
</div></section>

<section id="vertrauen" aria-labelledby="trust-h"><div class="wrap">
<div class="section-head reveal"><h2 id="trust-h">${esc(t.trustH)}</h2></div>
<div class="grid grid-3">${t.trust.map(([ic, a, d]) => `<article class="card hover reveal"><div class="card-icon">${icon(ic)}</div><h3>${esc(a)}</h3><p>${esc(d)}</p></article>`).join('')}</div>
</div></section>

<section id="termin" class="contact" aria-labelledby="book-h"><div class="wrap contact-grid">
<div><h2 id="book-h">${esc(b.h)}</h2><p class="lead">${esc(b.lead)}</p>
<div class="card recap"><p class="group">${esc(t.price.label)}</p><p class="price sm"><span dir="ltr">${esc(t.price.amount)}</span></p><p class="vat">${esc(t.price.vat)}</p><a class="pdf-link" href="${pdf}" download>${icon('invoice')} ${esc(t.pdf)}</a></div>
<p class="small">${esc(c.contact.emailLabel)}</p><a class="mail" href="mailto:${EMAIL}?subject=${encodeURIComponent(b.mailSubject)}">${icon('mail')} ${esc(c.contact.mailText)}</a></div>
<div class="form-card">
<form class="form" id="book" novalidate>
<div class="two"><div class="field"><label for="b-name">${esc(b.name)}</label><input id="b-name" name="name" autocomplete="name" required></div>
<div class="field"><label for="b-phone">${esc(b.phone)}</label><input id="b-phone" name="phone" type="tel" autocomplete="tel" dir="ltr" required></div></div>
<div class="field"><label for="b-branch">${esc(b.branch)}</label><select id="b-branch" name="branch">${b.branches.map((x) => `<option>${esc(x)}</option>`).join('')}</select></div>
<fieldset class="field slots"><legend>${esc(b.date)}</legend><div class="chips" id="b-days" role="radiogroup"></div></fieldset>
<fieldset class="field slots"><legend>${esc(b.time)}</legend><div class="chips" id="b-times" role="radiogroup"></div></fieldset>
<fieldset class="field slots"><legend>${esc(b.how)}</legend><div class="chips">${b.hows.map((x, i) => `<label class="chip-r"><input type="radio" name="how" value="${esc(x)}"${i === 0 ? ' checked' : ''}><span>${esc(x)}</span></label>`).join('')}</div></fieldset>
<div class="field"><label for="b-msg">${esc(b.msg)}</label><textarea id="b-msg" name="msg" rows="3"></textarea></div>
<label class="consent"><input type="checkbox" name="consent" required> <span>${esc(b.consent)}</span></label>
<p class="err" id="b-err" role="alert" hidden></p>
<div><button class="btn btn-primary" type="submit">${icon('calendar')} ${esc(b.submit)}</button></div>
<p class="note">${esc(b.note)}</p>
</form>
<div class="booked" id="booked" hidden><div class="card-icon">${icon('check')}</div><h3>${esc(b.okH)}</h3><p id="b-ok"></p><p class="when" id="b-when"></p><div class="cta-row"><a class="btn btn-primary" id="b-ics" href="#" download="termin-webseite.ics">${icon('calendar')} ${esc(b.ics)}</a><a class="btn btn-ghost" id="b-again" href="#">${icon('mail')} ${esc(b.again)}</a></div></div>
</div>
</div></section>

<section id="faq" class="alt" aria-labelledby="faq-h"><div class="wrap">
<div class="section-head reveal"><h2 id="faq-h">${esc(t.faqH)}</h2></div>
<div class="faq">${t.faq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
<div class="card cta-card cta-banner reveal"><div><h3>${esc(t.finalH)}</h3><p>${esc(t.finalText)}</p></div><a class="btn btn-primary" href="#termin">${icon('calendar')} ${esc(t.hero.cta)}</a></div>
</div></section>
</main>`;

  // Buchung: freie Termine im Browser erzeugen (Werktage, feste Uhrzeiten, Vorlauf), dann fertige E-Mail an TOF Solution öffnen.
  const script = `(function(){var C=${JSON.stringify(cfg)},f=document.getElementById('book'),D=document.getElementById('b-days'),Tm=document.getElementById('b-times'),sel={d:null,t:null};
function berlinNow(){return new Date()}
function pad(n){return(n<10?'0':'')+n}
function days(){var out=[],d=new Date();d.setHours(0,0,0,0);while(out.length<C.slots.days){d.setDate(d.getDate()+1);if(C.slots.weekdays.indexOf(d.getDay())>-1)out.push(new Date(d))}return out}
function slotDate(d,hm){var x=new Date(d);var p=hm.split(':');x.setHours(+p[0],+p[1],0,0);return x}
function times(d){var min=Date.now()+C.slots.minLeadHours*36e5;return C.slots.times.filter(function(hm){return slotDate(d,hm).getTime()>min})}
function chip(box,label,val,sub,on){var b=document.createElement('button');b.type='button';b.className='chip-b';b.setAttribute('role','radio');b.setAttribute('aria-checked','false');b.dataset.v=val;b.innerHTML='<b></b>'+(sub?'<small></small>':'');b.querySelector('b').textContent=label;if(sub)b.querySelector('small').textContent=sub;b.addEventListener('click',function(){box.querySelectorAll('.chip-b').forEach(function(x){x.setAttribute('aria-checked','false')});b.setAttribute('aria-checked','true');on(val)});box.appendChild(b)}
var dl=days().filter(function(d){return times(d).length});
dl.forEach(function(d){chip(D,C.days[d.getDay()],d.toISOString(),d.toLocaleDateString(C.loc,{day:'2-digit',month:'2-digit'}),function(v){sel.d=new Date(v);sel.t=null;Tm.innerHTML='';times(sel.d).forEach(function(hm){chip(Tm,hm,hm,'',function(v2){sel.t=v2})})})});
function val(n){var e=f.elements[n];return e?(e.value||'').trim():''}
function when(){var s=slotDate(sel.d,sel.t);return C.days[s.getDay()]+', '+s.toLocaleDateString(C.loc,{day:'2-digit',month:'2-digit',year:'numeric'})+' · '+sel.t}
function ics(){var s=slotDate(sel.d,sel.t),e=new Date(s.getTime()+C.slots.minutes*6e4);function z(x){return x.getUTCFullYear()+pad(x.getUTCMonth()+1)+pad(x.getUTCDate())+'T'+pad(x.getUTCHours())+pad(x.getUTCMinutes())+'00Z'}var t=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//TOF Solution//Webseite//DE','BEGIN:VEVENT','UID:'+Date.now()+'@tarekfatal.com','DTSTAMP:'+z(new Date()),'DTSTART:'+z(s),'DTEND:'+z(e),'SUMMARY:'+C.icsTitle,'STATUS:TENTATIVE','END:VEVENT','END:VCALENDAR'].join('\\r\\n');return URL.createObjectURL(new Blob([t],{type:'text/calendar'}))}
var mail='';
f.addEventListener('submit',function(ev){ev.preventDefault();var err=document.getElementById('b-err');err.hidden=true;
if(!sel.d||!sel.t){err.textContent=C.noSlot;err.hidden=false;return}
if(!f.checkValidity()){f.reportValidity();return}
var how=(f.querySelector('input[name=how]:checked')||{}).value||'',L=C.labels;
var sd=slotDate(sel.d,sel.t),iso=sd.getFullYear()+'-'+pad(sd.getMonth()+1)+'-'+pad(sd.getDate())+' '+sel.t;var body=[L.when+': '+when()+' ('+C.slots.minutes+' Min.) · '+iso,L.name+': '+val('name'),L.phone+': '+val('phone'),L.branch+': '+val('branch'),L.how+': '+how,val('msg')?L.msg+': '+val('msg'):'','','('+location.href.split('#')[0]+' · '+C.lang.toUpperCase()+')'].filter(function(x,i){return x||i>5}).join('\\n');
mail='mailto:Tarek@tarekfatal.com?subject='+encodeURIComponent(C.subject+': '+val('name')+' – '+when())+'&body='+encodeURIComponent(body);
location.href=mail;
document.getElementById('b-ok').textContent=C.ok.replace('{how}',how);document.getElementById('b-when').textContent=when();
document.getElementById('b-ics').href=ics();f.hidden=true;var bk=document.getElementById('booked');bk.hidden=false;bk.scrollIntoView({behavior:'smooth',block:'center'})});
document.getElementById('b-again').addEventListener('click',function(e){e.preventDefault();if(mail)location.href=mail})})();`;

  return `${head({ c, title: t.title, description: t.description, path, depth, alternates, jsonld, ogImage: 'og/og-webseite.png' })}
<body id="top">
${header(c, depth, { anchors: false, langLinks, cta: { href: '#termin', label: t.nav } })}
${body}
${footer(c, depth)}
<script>${themeScript}${motionScript}${script}</script>
</body>
</html>
`;
}
