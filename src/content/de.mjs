export default {
  lang: 'de',
  htmlLang: 'de',
  dir: 'ltr',
  ogLocale: 'de_DE',
  label: 'Deutsch',
  title: 'TOF Solution · SAP Field Service Management & Integration',
  description:
    'Freelancer für SAP Field Service Management und Schnittstellen zu SAP Business One, S/4HANA, Cloudflare und IoT. Weniger Handarbeit im Service. Remote aus Deutschland.',
  ogAlt: 'TOF Solution – SAP Field Service Management & Integration',
  nav: {
    skip: 'Zum Inhalt springen',
    services: 'Leistungen',
    cases: 'Fallbeispiele',
    pricing: 'Preise',
    about: 'Über mich',
    faq: 'FAQ',
    cta: 'Projekt anfragen',
    theme: 'Dunkelmodus umschalten',
    language: 'Sprache',
    menu: 'Hauptnavigation',
  },
  hero: {
    eyebrow: 'Freelance · Remote aus Deutschland · DE / EN / AR',
    h1: 'Ich verbinde SAP Field Service Management mit Ihrem ERP, Ihren Geräten und der Cloud.',
    lead: 'Weniger Handarbeit im Service: Checklisten, Aufträge und Gerätedaten fließen automatisch zwischen SAP FSM, SAP Business One bzw. S/4HANA und Ihren Geräten.',
    cta: 'Projekt anfragen',
    secondary: 'Fallbeispiele ansehen',
    facts: [
      ['10.000', 'Checklisten im Lasttest – fehlerfrei'],
      ['Sekunden', 'vom IoT-Signal bis zur Rückmeldung'],
      ['Firewall bleibt zu', 'SAP B1 per Cloudflare-Tunnel – ohne offene Firewall-Ports'],
    ],
  },
  audience: {
    h2: 'Für wen ich arbeite',
    items: [
      { title: 'SAP-FSM-Kunden im DACH-Raum', text: 'Sie nutzen SAP Field Service Management und wollen Checklisten, Aufträge und Rückmeldungen ohne Handarbeit abbilden.' },
      { title: 'SAP-Partner & Systemhäuser', text: 'Sie brauchen kurzfristig zusätzliches Know-how für SAP FSM oder SAP Business One – remote und projektbezogen.' },
      { title: 'Firmen mit SAP B1 on-premise', text: 'Ihr SAP Business One läuft im eigenen Netz und soll sicher mit Cloud-Diensten, Apps oder SAP FSM sprechen.' },
    ],
  },
  services: {
    h2: 'Leistungen',
    intro: 'Drei Bereiche, ein Ziel: Servicedaten, die ohne Handarbeit fließen.',
    items: [
      { icon: 'fsm', title: 'SAP FSM Aufbau & Automatisierung', text: 'Checklisten, Vorlagen und Massendaten für SAP Field Service Management – generiert, versioniert und im FSM-Importformat exportiert statt von Hand zusammengeklickt.' },
      { icon: 'erp', title: 'Schnittstellen zu SAP Business One & S/4HANA', text: 'Integration zwischen SAP FSM und Ihrem ERP: Stammdaten, Serviceabrufe und Belege. Hintergrund in der SAP-B1-Entwicklung (SDK, DI API, Berichte, SQL).' },
      { icon: 'cloud', title: 'Cloudflare- & IoT-Integration', text: 'Sichere Anbindung per Cloudflare-Tunnel ohne offene Firewall-Ports – und Gerätesignale, die in Sekunden im Serviceprozess ankommen.' },
    ],
  },
  cases: {
    h2: 'Fallbeispiele',
    intro: 'Echte Projekte, gezeigt mit Demo-Daten. Kundennamen sind unkenntlich gemacht.',
    labels: { situation: 'Ausgangslage', solution: 'Lösung', result: 'Ergebnis' },
    zoom: 'Bild in voller Größe öffnen',
    items: [
      {
        tag: 'SAP FSM',
        title: 'Checklisten-Builder mit ZIP-Export für SAP FSM',
        situation: 'Umfangreiche Checklisten-Vorlagen – in der Demo 10 Kapitel mit über 230 Feldern – von Hand in SAP FSM zu pflegen und zu importieren ist mühsam und fehleranfällig.',
        solution: 'Ein Builder, in dem Kapitel und Felder (Text, Auswahl, Ja/Nein, Zahl, Foto, Barcode, Unterschrift, Geräte-Karte) per Drag & Drop angelegt, als Fassung versioniert und geprüft werden. Der Export erzeugt per Klick eine ZIP-Datei im SAP-FSM-Importformat.',
        result: 'Vorlage mit 10 Kapiteln und 237 Feldern als importfertige ZIP-Datei mit Versionsnummer – ohne manuelles Nachpflegen in SAP FSM.',
        images: [
          { src: 'case-builder', w: 1200, h: 717, alt: 'Checklisten-Builder mit Feldtypen links und Kapiteln der Vorlage in der Mitte (Demo-Daten)', caption: 'Builder: Feldtypen und Kapitel der Vorlage' },
          { src: 'case-export', w: 1200, h: 717, alt: 'Dialog „Für SAP FSM exportieren“ mit Versionsnummer und Schaltfläche „ZIP herunterladen“', caption: 'Export als ZIP im SAP-FSM-Importformat' },
        ],
      },
      {
        tag: 'Lasttest',
        title: 'Lasttest: 10.000 Checklisten an SAP FSM',
        situation: 'Bevor Monteure im Alltag Checklisten mit Fotos und Unterschrift an SAP FSM senden, muss feststehen, dass die Zustellung auch unter Last und bei Störungen zuverlässig funktioniert.',
        solution: 'Simulierte Monteure reichen über denselben Weg wie die echte App Checklisten mit Fotos, Unterschrift und Gerätezeilen ein – inklusive Netzabbrüchen mitten im Senden, doppelten Einreichungen, zwei Monteuren am selben Auftrag und nachgestellten SAP-Fehlern. Ausschließlich im Demo-Mandanten.',
        result: '10.000 Checklisten im Lasttest fehlerfrei verarbeitet.',
        images: [
          { src: 'case-belege', w: 1200, h: 495, alt: 'Belegübersicht mit Monteur, Herkunft und Status „in SAP FSM“ (Demo-Daten)', caption: 'Belegübersicht mit Zustellstatus nach SAP FSM' },
        ],
      },
    ],
  },
  projects: {
    h2: 'Weitere SAP- & Integrationsprojekte',
    resultLabel: 'Ergebnis',
    items: [
      { tag: 'IoT', title: 'IoT-Rückmeldung für den Außendienst', text: 'Rückmeldungen von IoT-Geräten fließen direkt in den Serviceprozess.', result: 'Rückmeldung innerhalb von Sekunden.' },
      { tag: 'SAP Business One', title: 'SAP B1 über Cloudflare-Tunnel', text: 'Ein lokal betriebenes SAP Business One, angebunden an Cloud-Dienste über einen ausgehenden Cloudflare-Tunnel.', result: 'Sicherer Zugriff ohne offene Firewall-Ports.' },
    ],
  },
  pricing: {
    h2: 'Pakete & Preise',
    intro: 'Klare Pakete für typische Aufgaben, alles andere nach Aufwand.',
    items: [
      { title: 'FSM-Checklisten-Import', price: 'Festpreis auf Anfrage', text: 'Ihre Checklisten-Vorlage aufbauen oder übernehmen, prüfen und als ZIP im SAP-FSM-Importformat liefern – inklusive Begleitung beim Import.' },
      { title: 'SAP B1 per Cloudflare-Tunnel', price: 'Festpreis auf Anfrage', text: 'Ihr SAP Business One sicher erreichbar machen – ohne offene Firewall-Ports. Einrichtung, Absicherung, Dokumentation und Übergabe.' },
      { title: 'Entwicklung & Beratung', price: 'ab 95 €/h', text: 'Schnittstellen, Erweiterungen, Fehlersuche und Beratung rund um SAP FSM, SAP B1 und Integration – remote, nach Aufwand.' },
    ],
    note: 'Preise sind Richtwerte. Verbindlich ist das schriftliche Angebot.',
  },
  process: {
    h2: 'So arbeiten wir zusammen',
    items: [
      { title: 'Kennenlerngespräch', text: 'In 15 Minuten klären wir Ziel, Systemlandschaft und ob ich der Richtige dafür bin.' },
      { title: 'Schriftliches Angebot', text: 'Sie erhalten ein klares Angebot mit Umfang, Meilensteinen und Festpreis oder Aufwandsschätzung.' },
      { title: 'Umsetzung', text: 'Schrittweise Umsetzung mit regelmäßigen Demos, Dokumentation und sauberer Übergabe.' },
    ],
  },
  about: {
    h2: 'Über mich',
    paragraphs: [
      'Ich bin TOF Solution, Fachinformatiker (IHK) und Inhaber von TOF Solution, mit Sitz in Deutschland und remote tätig.',
      'Mein Schwerpunkt ist SAP Field Service Management und alles, womit es sprechen muss: SAP Business One, S/4HANA, Cloudflare und IoT-Geräte. Ich arbeite auf Deutsch, Englisch und Arabisch.',
    ],
    cert: 'SAP-FSM-Zertifizierung in Vorbereitung',
    photoAlt: 'TOF Solution',
    profiles: 'Profile',
    factsTitle: 'Auf einen Blick',
    facts: [
      ['Name', 'TOF Solution'],
      ['Rolle', 'Freelance-Entwickler, SAP FSM & Integration · Fachinformatiker (IHK)'],
      ['Unternehmen', 'TOF Solution (Inhaber)'],
      ['Standort', 'Deutschland · remote'],
      ['Schwerpunkt', 'SAP Field Service Management, SAP Business One, SAP-S/4HANA-Schnittstellen, Cloudflare, IoT'],
      ['Sprachen', 'Deutsch, Englisch, Arabisch'],
      ['Preis', 'ab 95 €/h · Festpreis-Pakete auf Anfrage'],
      ['Kontakt', 'Tarek@tarekfatal.com'],
    ],
  },
  more: {
    h2: 'Weitere Arbeiten',
    items: [
      { title: 'Wetter- & Seebulletin-System', text: 'Operatives System zur Erstellung und Veröffentlichung von Wetter- und Seebulletins – live im Betrieb.' },
      { title: 'Maritimes Lagebild', text: 'Software für ein maritimes Lagebild mit direkter Radar-Anbindung.' },
      { title: 'E-Government-Prototyp', text: 'Prototyp einer Bürgerplattform mit Online-Auktion.' },
    ],
  },
  faq: {
    h2: 'Häufige Fragen',
    items: [
      { q: 'Was macht TOF Solution?', a: 'TOF Solution ist Freelance-Entwickler aus Deutschland mit Schwerpunkt SAP Field Service Management (SAP FSM) und dessen Integration mit SAP Business One, SAP S/4HANA, Cloudflare und IoT.' },
      { q: 'Für wen arbeiten Sie?', a: 'Für SAP-FSM-Kunden im DACH-Raum, für SAP-Partner und Systemhäuser, die kurzfristig FSM- oder B1-Know-how brauchen, und für Firmen mit SAP Business One on-premise, die Cloud-Dienste anbinden wollen.' },
      { q: 'Lassen sich SAP-FSM-Checklisten in großer Menge erstellen?', a: 'Ja. Mein Checklisten-Builder exportiert Vorlagen als ZIP-Datei im SAP-FSM-Importformat. Im Lasttest wurden 10.000 Checklisten fehlerfrei verarbeitet.' },
      { q: 'Wie binden Sie ein lokal betriebenes SAP Business One sicher an?', a: 'Über einen Cloudflare-Tunnel: Die Verbindung wird ausgehend aus Ihrem Netzwerk aufgebaut, daher müssen keine Firewall-Ports geöffnet werden.' },
      { q: 'Was kostet die Zusammenarbeit?', a: 'Entwicklung und Beratung ab 95 € pro Stunde. Für typische Aufgaben wie den FSM-Checklisten-Import oder die SAP-B1-Anbindung per Cloudflare-Tunnel gibt es Festpreis-Pakete auf Anfrage.' },
      { q: 'Wo sitzen Sie und in welchen Sprachen arbeiten Sie?', a: 'Ich sitze in Deutschland und arbeite remote. Arbeitssprachen: Deutsch, Englisch und Arabisch.' },
      { q: 'Wie startet ein Projekt?', a: 'Mit einem 15-minütigen Kennenlerngespräch oder einer kurzen E-Mail an Tarek@tarekfatal.com. Danach erhalten Sie ein schriftliches Angebot.' },
    ],
  },
  contact: {
    h2: 'Projekt anfragen',
    lead: 'Beschreiben Sie in wenigen Sätzen, was Sie erreichen möchten und welche Systeme beteiligt sind. Sie erhalten zeitnah eine Antwort.',
    call: 'Kennenlerngespräch (15 Min) vereinbaren',
    callSubject: 'Kennenlerngespräch',
    callBody: 'Hallo TOF,\n\nich möchte ein 15-minütiges Kennenlerngespräch vereinbaren.\n\nThema:\nMögliche Termine:\n\n',
    emailLabel: 'Oder direkt per E-Mail',
    form: {
      name: 'Name',
      email: 'Ihre E-Mail-Adresse',
      company: 'Unternehmen (optional)',
      message: 'Was soll gebaut oder verbunden werden?',
      submit: 'E-Mail vorbereiten',
      note: 'Das Formular öffnet Ihr E-Mail-Programm mit vorausgefülltem Text. Diese Website speichert oder versendet keine Daten.',
      subject: 'Projektanfrage',
    },
  },
  footer: {
    imprint: { label: 'Impressum', href: 'de/impressum/' },
    privacy: { label: 'Datenschutz', href: 'de/datenschutz/' },
    tagline: 'SAP Field Service Management & Integration',
  },
  schema: {
    jobTitle: 'Freelance-Entwickler – SAP Field Service Management & Integration',
    personDescription:
      'Fachinformatiker (IHK) und Inhaber von TOF Solution. Freelance-Entwickler für SAP Field Service Management und Schnittstellen zu SAP Business One, SAP S/4HANA, Cloudflare und IoT.',
    businessDescription:
      'Freiberufliche IT-Leistungen für SAP Field Service Management, Schnittstellen zu SAP Business One und S/4HANA sowie Cloudflare- und IoT-Integration. Remote aus Deutschland.',
  },
};
