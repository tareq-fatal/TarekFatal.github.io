// Anzeigen-Landingpage „SAP Business One – Schnittstellen, Add-ons, Support“ (/sap-business-one/, nur DE, noindex).
// Bekommt die Bausteine aus build.mjs (head, header, footer, icon, esc …) übergeben, damit Design und Prüfungen gleich bleiben.
// Terminbuchung wie auf der Angebotsseite: freie Slots im Browser, fertige E-Mail, .ics – ohne Fremdkonto, ohne Cookies.
import { T, PATH } from './content/sap.mjs';
import { SLOTS } from './content/webseite.mjs';

export { PATH as SAP_PATH };

export function renderSap(h) {
  const { head, header, footer, icon, esc, up, themeScript, motionScript, LANGS, homePath, EMAIL } = h;
  const t = T;
  const b = t.book;
  const c = LANGS.find((l) => l.lang === 'de');
  const depth = PATH.split('/').filter(Boolean).length;
  const r = up(depth);
  // Sprachwahl: Deutsch bleibt auf dieser Seite, die anderen Sprachen führen zur jeweiligen Startseite.
  const langLinks = LANGS.map((l) => [l, l === c ? `${r}${PATH}` : `${r}${homePath(l)}`]);
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(t.mailSubject)}`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t.title,
    serviceType: 'SAP Business One development and support',
    description: t.description,
    provider: { '@type': 'Organization', name: 'TOF Solution', url: 'https://tarekfatal.com/' },
    areaServed: ['Germany', 'Austria', 'Switzerland'].map((name) => ({ '@type': 'Country', name })),
  };
  const cfg = { slots: SLOTS, days: b.days, loc: b.months, labels: b.labels, subject: b.mailSubject, ok: b.okText, noSlot: b.noSlot, icsTitle: b.icsTitle };
  const [h1a, h1b] = t.hero.h1;

  const body = `<main id="main">
<section class="hero offer-hero" aria-labelledby="h1"><div class="wrap"><div class="hero-grid">
<div>
<p class="pill"><span class="pulse" aria-hidden="true"></span>${esc(t.hero.pill)}</p>
<h1 id="h1"><span class="nw">${esc(h1a)}</span>&nbsp;– <em>${esc(h1b)}</em></h1>
<p class="lead">${esc(t.hero.lead)}</p>
<div class="cta-row"><a class="btn btn-primary" href="#termin">${icon('calendar')} ${esc(t.hero.cta)}</a><a class="btn btn-ghost" href="#leistungen">${esc(t.hero.more)} ${icon('arrow', 'flip')}</a></div>
<ul class="trust">${t.hero.trust.map((x) => `<li>${icon('tick')}${esc(x)}</li>`).join('')}</ul>
</div>
<aside class="card price-card" aria-label="${esc(t.glance.label)}"><p class="group">${esc(t.glance.label)}</p><p class="price">${esc(t.glance.big)}</p><p class="vat">${esc(t.glance.sub)}</p><p class="small">${esc(t.glance.note)}</p>
<ul class="mini">${t.glance.items.map((x) => `<li>${icon('tick')}${esc(x)}</li>`).join('')}</ul>
<a class="btn btn-primary" href="#termin">${icon('calendar')} ${esc(t.glance.btn)}</a><a class="pdf-link" href="${mailHref}">${icon('mail')} ${esc(t.glance.mail)}</a></aside>
</div></div></section>

<section id="leistungen" class="alt" aria-labelledby="svc-h"><div class="wrap">
<div class="section-head reveal"><h2 id="svc-h">${esc(t.servicesH)}</h2><p>${esc(t.servicesIntro)}</p></div>
<div class="grid grid-3">${t.services.map(([ic, a, d]) => `<article class="card hover reveal"><div class="card-icon">${icon(ic)}</div><h3>${esc(a)}</h3><p>${esc(d)}</p></article>`).join('')}</div>
<div class="proj reveal" style="margin-top:2.2rem"><h3 class="group">${esc(t.techH)}</h3><p class="tags">${t.tech.map((x) => `<span dir="ltr">${esc(x)}</span>`).join('')}</p></div>
</div></section>

<section id="fuer-wen" aria-labelledby="aud-h"><div class="wrap">
<div class="section-head reveal"><h2 id="aud-h">${esc(t.audienceH)}</h2></div>
<div class="grid grid-2">${t.audience.map(([ic, a, d]) => `<article class="card hover reveal"><div class="card-icon">${icon(ic)}</div><h3>${esc(a)}</h3><p>${esc(d)}</p></article>`).join('')}</div>
</div></section>

<section id="ablauf" class="alt" aria-labelledby="steps-h"><div class="wrap">
<div class="section-head reveal"><h2 id="steps-h">${esc(t.stepsH)}</h2></div>
<ol class="steps three">${t.steps.map(([a, d]) => `<li class="card reveal"><h3>${esc(a)}</h3><p>${esc(d)}</p></li>`).join('')}</ol>
</div></section>

<section id="termin" class="contact" aria-labelledby="book-h"><div class="wrap contact-grid">
<div><h2 id="book-h">${esc(b.h)}</h2><p class="lead">${esc(b.lead)}</p>
<div class="card recap"><p class="group">${esc(b.recapLabel)}</p><p class="price sm">${esc(b.recapBig)}</p><p class="vat">${esc(b.recapSub)}</p></div>
<p class="small">${esc(c.contact.emailLabel)}</p><a class="mail" href="${mailHref}">${icon('mail')} ${esc(c.contact.mailText)}</a></div>
<div class="form-card">
<form class="form" id="book" novalidate>
<div class="two"><div class="field"><label for="b-name">${esc(b.name)}</label><input id="b-name" name="name" autocomplete="name" required></div>
<div class="field"><label for="b-company">${esc(b.company)}</label><input id="b-company" name="company" autocomplete="organization"></div></div>
<div class="field"><label for="b-topic">${esc(b.topic)}</label><select id="b-topic" name="topic">${b.topics.map((x) => `<option>${esc(x)}</option>`).join('')}</select></div>
<fieldset class="field slots"><legend>${esc(b.date)}</legend><div class="chips" id="b-days" role="radiogroup"></div></fieldset>
<fieldset class="field slots"><legend>${esc(b.time)}</legend><div class="chips" id="b-times" role="radiogroup"></div></fieldset>
<fieldset class="field slots"><legend>${esc(b.how)}</legend><div class="chips">${b.hows.map((x, i) => `<label class="chip-r"><input type="radio" name="how" value="${esc(x)}"${i === 0 ? ' checked' : ''}><span>${esc(x)}</span></label>`).join('')}</div></fieldset>
<div class="field"><label for="b-phone">${esc(b.phone)}</label><input id="b-phone" name="phone" type="tel" autocomplete="tel" dir="ltr"></div>
<div class="field"><label for="b-msg">${esc(b.msg)}</label><textarea id="b-msg" name="msg" rows="3"></textarea></div>
<label class="consent"><input type="checkbox" name="consent" required> <span>${esc(b.consent)}</span></label>
<p class="err" id="b-err" role="alert" hidden></p>
<div><button class="btn btn-primary" type="submit">${icon('calendar')} ${esc(b.submit)}</button></div>
<p class="note">${esc(b.note)}</p>
</form>
<div class="booked" id="booked" hidden><div class="card-icon">${icon('check')}</div><h3>${esc(b.okH)}</h3><p id="b-ok"></p><p class="when" id="b-when"></p><div class="cta-row"><a class="btn btn-primary" id="b-ics" href="#" download="termin-sap-business-one.ics">${icon('calendar')} ${esc(b.ics)}</a><a class="btn btn-ghost" id="b-again" href="#">${icon('mail')} ${esc(b.again)}</a></div></div>
</div>
</div></section>

<section id="faq" class="alt" aria-labelledby="faq-h"><div class="wrap">
<div class="section-head reveal"><h2 id="faq-h">${esc(t.faqH)}</h2></div>
<div class="faq">${t.faq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
<div class="card cta-card cta-banner reveal"><div><h3>${esc(t.finalH)}</h3><p>${esc(t.finalText)}</p></div><a class="btn btn-primary" href="#termin">${icon('calendar')} ${esc(t.nav)}</a></div>
</div></section>
</main>`;

  // Buchung: freie Termine im Browser (Werktage, feste Uhrzeiten, Vorlauf), dann fertige E-Mail an TOF Solution.
  // „Quelle“ zeigt nur, ob der Besuch von einer Google-Anzeige kam (Parameter in der Adresse) – es wird nichts gespeichert oder übertragen.
  const script = `(function(){var C=${JSON.stringify(cfg)},f=document.getElementById('book'),D=document.getElementById('b-days'),Tm=document.getElementById('b-times'),sel={d:null,t:null};
function pad(n){return(n<10?'0':'')+n}
function days(){var out=[],d=new Date();d.setHours(0,0,0,0);while(out.length<C.slots.days){d.setDate(d.getDate()+1);if(C.slots.weekdays.indexOf(d.getDay())>-1)out.push(new Date(d))}return out}
function slotDate(d,hm){var x=new Date(d);var p=hm.split(':');x.setHours(+p[0],+p[1],0,0);return x}
function times(d){var min=Date.now()+C.slots.minLeadHours*36e5;return C.slots.times.filter(function(hm){return slotDate(d,hm).getTime()>min})}
function chip(box,label,val,sub,on){var b=document.createElement('button');b.type='button';b.className='chip-b';b.setAttribute('role','radio');b.setAttribute('aria-checked','false');b.dataset.v=val;b.innerHTML='<b></b>'+(sub?'<small></small>':'');b.querySelector('b').textContent=label;if(sub)b.querySelector('small').textContent=sub;b.addEventListener('click',function(){box.querySelectorAll('.chip-b').forEach(function(x){x.setAttribute('aria-checked','false')});b.setAttribute('aria-checked','true');on(val)});box.appendChild(b)}
days().filter(function(d){return times(d).length}).forEach(function(d){chip(D,C.days[d.getDay()],d.toISOString(),d.toLocaleDateString(C.loc,{day:'2-digit',month:'2-digit'}),function(v){sel.d=new Date(v);sel.t=null;Tm.innerHTML='';times(sel.d).forEach(function(hm){chip(Tm,hm,hm,'',function(v2){sel.t=v2})})})});
var first=D.querySelector('.chip-b');if(first)first.click();
function val(n){var e=f.elements[n];return e?(e.value||'').trim():''}
function when(){var s=slotDate(sel.d,sel.t);return C.days[s.getDay()]+', '+s.toLocaleDateString(C.loc,{day:'2-digit',month:'2-digit',year:'numeric'})+' · '+sel.t}
function ics(){var s=slotDate(sel.d,sel.t),e=new Date(s.getTime()+C.slots.minutes*6e4);function z(x){return x.getUTCFullYear()+pad(x.getUTCMonth()+1)+pad(x.getUTCDate())+'T'+pad(x.getUTCHours())+pad(x.getUTCMinutes())+'00Z'}var t=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//TOF Solution//SAP Business One//DE','BEGIN:VEVENT','UID:'+Date.now()+'@tarekfatal.com','DTSTAMP:'+z(new Date()),'DTSTART:'+z(s),'DTEND:'+z(e),'SUMMARY:'+C.icsTitle,'STATUS:TENTATIVE','END:VEVENT','END:VCALENDAR'].join('\\r\\n');return URL.createObjectURL(new Blob([t],{type:'text/calendar'}))}
var L=C.labels,src=/[?&](gclid|gbraid|wbraid)=|[?&]utm_source=google/i.test(location.search)?L.ad:L.direct,mail='';
f.addEventListener('submit',function(ev){ev.preventDefault();var err=document.getElementById('b-err');err.hidden=true;
if(!sel.d||!sel.t){err.textContent=C.noSlot;err.hidden=false;return}
if(!f.checkValidity()){f.reportValidity();return}
var how=(f.querySelector('input[name=how]:checked')||{}).value||'',sd=slotDate(sel.d,sel.t),iso=sd.getFullYear()+'-'+pad(sd.getMonth()+1)+'-'+pad(sd.getDate())+' '+sel.t;
var lines=[L.when+': '+when()+' ('+C.slots.minutes+' Min.) · '+iso,L.name+': '+val('name'),val('company')?L.company+': '+val('company'):'',val('phone')?L.phone+': '+val('phone'):'',L.topic+': '+val('topic'),L.how+': '+how,val('msg')?L.msg+': '+val('msg'):''].filter(Boolean);
lines.push('','('+location.host+location.pathname+' · '+L.src+': '+src+')');
mail='mailto:${EMAIL}?subject='+encodeURIComponent(C.subject+': '+val('name')+' – '+when())+'&body='+encodeURIComponent(lines.join('\\n'));
location.href=mail;
document.getElementById('b-ok').textContent=C.ok.replace('{how}',how);document.getElementById('b-when').textContent=when();
document.getElementById('b-ics').href=ics();f.hidden=true;var bk=document.getElementById('booked');bk.hidden=false;bk.scrollIntoView({behavior:'smooth',block:'center'})});
document.getElementById('b-again').addEventListener('click',function(e){e.preventDefault();if(mail)location.href=mail})})();`;

  return `${head({ c, title: t.title, description: t.description, path: PATH, depth, robots: 'noindex,follow', jsonld })}
<body id="top">
${header(c, depth, { anchors: false, langLinks, cta: { href: '#termin', label: t.nav } })}
${body}
${footer(c, depth)}
<script>${themeScript}${motionScript}${script}</script>
</body>
</html>
`;
}
