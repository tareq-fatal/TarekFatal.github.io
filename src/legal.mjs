// Impressum / Datenschutz (DE + EN).
// TODO(TOF): Anschrift fehlt noch – ADDRESS_DE/ADDRESS_EN befüllen (z. B. 'Musterstraße 1<br>12345 Musterstadt'), dann entfällt der Hinweis.
const ADDRESS_DE = '';
const ADDRESS_EN = '';

export function legalPages(email) {
  const mail = `<a class="ltr" href="mailto:${email}">${email}</a>`;
  const addrDe = `TOF Solution<br>TOF Solution<br>${ADDRESS_DE ? ADDRESS_DE + '<br>' : ''}Deutschland${ADDRESS_DE ? '' : '<br><em>Die vollständige Anschrift wird in Kürze ergänzt.</em>'}`;
  const addrEn = `TOF Solution<br>TOF Solution<br>${ADDRESS_EN ? ADDRESS_EN + '<br>' : ''}Germany${ADDRESS_EN ? '' : '<br><em>The full postal address will be added shortly.</em>'}`;
  const imprintPair = [['de', 'de/impressum/'], ['en', 'en/imprint/']];
  const privacyPair = [['de', 'de/datenschutz/'], ['en', 'en/privacy/']];
  const github =
    'GitHub Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA';
  const githubPolicy =
    'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement';

  return [
    {
      lang: 'de',
      path: 'de/impressum/',
      pair: imprintPair,
      title: 'Impressum · TOF Solution',
      description: 'Impressum von TOF Solution, TOF Solution.',
      body: `<h1>Impressum</h1>
<h2>Angaben gemäß § 5 DDG</h2>
<address>${addrDe}</address>
<h2>Kontakt</h2>
<p>E-Mail: ${mail}</p>
<h2>Verbraucherstreitbeilegung</h2>
<p>Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
<h2>Haftung für Links</h2>
<p>Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für diese Inhalte ist der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden derartige Links umgehend entfernt.</p>`,
    },
    {
      lang: 'en',
      path: 'en/imprint/',
      pair: imprintPair,
      title: 'Imprint · TOF Solution',
      description: 'Legal notice (imprint) of TOF Solution, TOF Solution.',
      body: `<h1>Imprint</h1>
<p>Information according to § 5 of the German Digital Services Act (DDG). The <a href="../../de/impressum/" hreflang="de">German version</a> is legally binding.</p>
<h2>Provider</h2>
<address>${addrEn}</address>
<h2>Contact</h2>
<p>Email: ${mail}</p>
<h2>Consumer dispute resolution</h2>
<p>I am neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
<h2>Liability for links</h2>
<p>This website contains links to external third-party websites whose content I have no influence on. The respective provider is responsible for that content. Links will be removed promptly if any legal violation becomes known.</p>`,
    },
    {
      lang: 'de',
      path: 'de/datenschutz/',
      pair: privacyPair,
      title: 'Datenschutzerklärung · TOF Solution',
      description: 'Datenschutzerklärung von tarekfatal.com.',
      body: `<h1>Datenschutzerklärung</h1>
<p>Stand: Oktober 2026</p>
<h2>1. Verantwortlicher</h2>
<address>${addrDe}<br>E-Mail: ${mail}</address>
<h2>2. Das Wichtigste in Kürze</h2>
<ul>
<li>Diese Website setzt <strong>keine Cookies</strong>, verwendet <strong>keine Analyse- oder Tracking-Dienste</strong> und lädt <strong>keine externen Schriftarten oder Skripte</strong>.</li>
<li>Ihre Auswahl zwischen hellem und dunklem Design wird – nur wenn Sie den Schalter benutzen – im lokalen Speicher Ihres Browsers (localStorage) abgelegt. Diese Information verlässt Ihr Gerät nicht. Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG (unbedingt erforderlich für die von Ihnen gewünschte Funktion).</li>
</ul>
<h2>3. Hosting (GitHub Pages)</h2>
<p>Diese Website wird über GitHub Pages bereitgestellt, einen Dienst der ${github}. Beim Aufruf der Website verarbeitet GitHub technisch notwendige Daten, insbesondere Ihre IP-Adresse, Datum und Uhrzeit des Abrufs, die aufgerufene Seite sowie Browser- und Systeminformationen (Server-Logfiles), um die Website auszuliefern und deren Sicherheit zu gewährleisten.</p>
<p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; mein berechtigtes Interesse liegt in einer sicheren und zuverlässigen Bereitstellung der Website. Dabei können Daten in die USA übermittelt werden. GitHub ist unter dem EU-U.S. Data Privacy Framework zertifiziert; für die USA besteht insoweit ein Angemessenheitsbeschluss der EU-Kommission (Art. 45 DSGVO). Weitere Informationen: <a href="${githubPolicy}" rel="noopener">Datenschutzerklärung von GitHub</a>.</p>
<h2>4. Kontakt per E-Mail und Kontaktformular</h2>
<p>Das Kontaktformular auf dieser Website überträgt keine Daten an einen Server. Es öffnet lediglich Ihr eigenes E-Mail-Programm mit einer vorausgefüllten Nachricht, die Sie selbst absenden.</p>
<p>Wenn Sie mir eine E-Mail schreiben, verarbeite ich die darin enthaltenen Angaben (z. B. Name, E-Mail-Adresse, Unternehmen, Inhalt der Anfrage), um Ihre Anfrage zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag abzielt, im Übrigen Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Die Daten werden gelöscht, sobald sie nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
<p>Für den E-Mail-Empfang nutze ich Google Workspace der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland, als Auftragsverarbeiter (Art. 28 DSGVO). Eine Übermittlung in die USA ist nicht auszuschließen; Google LLC ist unter dem EU-U.S. Data Privacy Framework zertifiziert.</p>
<h2>5. Externe Links</h2>
<p>Diese Website verlinkt auf externe Angebote (z. B. eine Projekt-Demo). Daten werden an diese Anbieter erst übertragen, wenn Sie einen solchen Link anklicken. Dann gilt die Datenschutzerklärung des jeweiligen Anbieters.</p>
<h2>6. Ihre Rechte</h2>
<p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21). Wenden Sie sich dazu einfach per E-Mail an mich.</p>
<p>Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO), insbesondere in dem Bundesland Ihres Wohnorts oder meines Sitzes.</p>`,
    },
    {
      lang: 'en',
      path: 'en/privacy/',
      pair: privacyPair,
      title: 'Privacy policy · TOF Solution',
      description: 'Privacy policy of tarekfatal.com.',
      body: `<h1>Privacy policy</h1>
<p>Last updated: October 2026. The <a href="../../de/datenschutz/" hreflang="de">German version</a> is legally binding.</p>
<h2>1. Controller</h2>
<address>${addrEn}<br>Email: ${mail}</address>
<h2>2. Summary</h2>
<ul>
<li>This website sets <strong>no cookies</strong>, uses <strong>no analytics or tracking services</strong> and loads <strong>no external fonts or scripts</strong>.</li>
<li>Your choice between light and dark design is stored in your browser’s local storage (localStorage) – only if you use the switch. This information never leaves your device. Legal basis: § 25 (2) no. 2 TDDDG (strictly necessary for the function you requested).</li>
</ul>
<h2>3. Hosting (GitHub Pages)</h2>
<p>This website is served via GitHub Pages, a service of ${github}. When you visit the website, GitHub processes technically necessary data, in particular your IP address, date and time of access, the page requested and browser and system information (server log files), in order to deliver the website and keep it secure.</p>
<p>The legal basis is Art. 6 (1) (f) GDPR; my legitimate interest is the secure and reliable provision of the website. Data may be transferred to the USA. GitHub is certified under the EU-U.S. Data Privacy Framework, which is covered by an adequacy decision of the European Commission (Art. 45 GDPR). More information: <a href="${githubPolicy}" rel="noopener">GitHub privacy statement</a>.</p>
<h2>4. Contact by email and contact form</h2>
<p>The contact form on this website does not transmit any data to a server. It only opens your own email program with a pre-filled message that you send yourself.</p>
<p>If you email me, I process the information it contains (e.g. name, email address, company, content of your request) to handle your request. The legal basis is Art. 6 (1) (b) GDPR where your request aims at a contract, otherwise Art. 6 (1) (f) GDPR (legitimate interest in answering requests). The data is deleted once it is no longer needed and no statutory retention obligations apply.</p>
<p>For receiving email I use Google Workspace by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland, as a processor (Art. 28 GDPR). A transfer to the USA cannot be ruled out; Google LLC is certified under the EU-U.S. Data Privacy Framework.</p>
<h2>5. External links</h2>
<p>This website links to external services (e.g. a project demo). Data is only transferred to these providers when you click such a link; their privacy policies then apply.</p>
<h2>6. Your rights</h2>
<p>You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing based on Art. 6 (1) (f) GDPR (Art. 21). Simply contact me by email.</p>
<p>You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR).</p>`,
    },
  ];
}
