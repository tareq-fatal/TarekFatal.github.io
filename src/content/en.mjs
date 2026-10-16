export default {
  lang: 'en',
  htmlLang: 'en',
  dir: 'ltr',
  ogLocale: 'en_US',
  label: 'English',
  title: 'TOF Solution · SAP Field Service Management & Integration',
  description:
    'Freelance developer for SAP Field Service Management and integrations with SAP Business One, S/4HANA, Cloudflare and IoT. Less manual work in field service. Remote from Germany.',
  ogAlt: 'TOF Solution – SAP Field Service Management & Integration',
  nav: {
    skip: 'Skip to content',
    services: 'Services',
    cases: 'Case studies',
    pricing: 'Pricing',
    about: 'About',
    faq: 'FAQ',
    cta: 'Request a project',
    theme: 'Toggle dark mode',
    language: 'Language',
    menu: 'Main navigation',
  },
  hero: {
    eyebrow: 'Freelance · Remote from Germany · EN / DE / AR',
    h1: 'I connect SAP Field Service Management with your ERP, devices and cloud.',
    lead: 'Less manual work in field service: checklists, orders and device data flow automatically between SAP FSM, SAP Business One or S/4HANA and your devices.',
    cta: 'Request a project',
    secondary: 'See case studies',
    facts: [
      ['10,000', 'checklists in a load test – zero errors'],
      ['Seconds', 'from IoT signal to feedback'],
      ['Firewall stays closed', 'SAP B1 via Cloudflare Tunnel – no open firewall ports'],
    ],
  },
  audience: {
    h2: 'Who I work with',
    items: [
      { title: 'SAP FSM customers in DACH', text: 'You run SAP Field Service Management and want checklists, orders and feedback to work without manual effort.' },
      { title: 'SAP partners & system integrators', text: 'You need extra SAP FSM or SAP Business One know-how at short notice – remote and per project.' },
      { title: 'Companies with SAP B1 on-premise', text: 'Your SAP Business One runs in your own network and needs to talk securely to cloud services, apps or SAP FSM.' },
    ],
  },
  services: {
    h2: 'Services',
    intro: 'Three areas, one goal: field service data that flows without manual work.',
    items: [
      { icon: 'fsm', title: 'SAP FSM build & automation', text: 'Checklists, templates and bulk data for SAP Field Service Management – generated, versioned and exported in the FSM import format instead of clicked together by hand.' },
      { icon: 'erp', title: 'SAP Business One & S/4HANA interfaces', text: 'Interfaces between SAP FSM and your ERP: master data, service calls and documents. Background in SAP B1 development (SDK, DI API, reports, SQL).' },
      { icon: 'cloud', title: 'Cloudflare & IoT integration', text: 'Secure connectivity via Cloudflare Tunnel with no open firewall ports – and device signals that reach your service process within seconds.' },
    ],
  },
  cases: {
    h2: 'Case studies',
    intro: 'Real projects, shown with demo data. Client names are blurred.',
    labels: { situation: 'Situation', solution: 'Solution', result: 'Result' },
    zoom: 'Open full-size image',
    items: [
      {
        tag: 'SAP FSM',
        title: 'Checklist builder with ZIP export for SAP FSM',
        situation: 'Large checklist templates – 10 chapters with more than 230 fields in the demo – are tedious and error-prone to maintain and import into SAP FSM by hand.',
        solution: 'A builder in which chapters and fields (text, choice, yes/no, number, photo, barcode, signature, device card) are created by drag & drop, versioned and validated. One click exports a ZIP file in the SAP FSM import format.',
        result: 'A template with 10 chapters and 237 fields as an import-ready, versioned ZIP file – no manual re-entry in SAP FSM.',
        images: [
          { src: 'case-builder', w: 1200, h: 717, alt: 'Checklist builder with field types on the left and template chapters in the middle (demo data, German UI)', caption: 'Builder: field types and template chapters' },
          { src: 'case-export', w: 1200, h: 717, alt: 'Export dialog for SAP FSM with version number and “download ZIP” button (German UI)', caption: 'Export as ZIP in the SAP FSM import format' },
        ],
      },
      {
        tag: 'Load test',
        title: 'Load test: 10,000 checklists to SAP FSM',
        situation: 'Before technicians send checklists with photos and signatures to SAP FSM every day, delivery has to be proven reliable under load and when things go wrong.',
        solution: 'Simulated technicians submit checklists with photos, signature and device rows through the same path as the real app – including network drops mid-upload, duplicate submissions, two technicians on the same job and simulated SAP errors. Demo tenant only.',
        result: '10,000 checklists processed in the load test without a single error.',
        images: [
          { src: 'case-belege', w: 1200, h: 495, alt: 'Document overview with technician, source and status “in SAP FSM” (demo data, German UI)', caption: 'Document overview with delivery status to SAP FSM' },
        ],
      },
    ],
  },
  projects: {
    h2: 'More SAP & integration projects',
    resultLabel: 'Result',
    items: [
      { tag: 'IoT', title: 'IoT feedback for field service', text: 'Feedback from IoT devices is passed directly into the field service process.', result: 'Feedback arrives within seconds.' },
      { tag: 'SAP Business One', title: 'SAP B1 via Cloudflare Tunnel', text: 'An on-premise SAP Business One connected to cloud services through an outbound-only Cloudflare Tunnel.', result: 'Secure access with no open firewall ports.' },
    ],
  },
  pricing: {
    h2: 'Packages & pricing',
    intro: 'Clear packages for typical tasks, everything else on a time basis.',
    items: [
      { title: 'FSM checklist import', price: 'Fixed price on request', text: 'Build or take over your checklist template, validate it and deliver it as a ZIP in the SAP FSM import format – including support during import.' },
      { title: 'SAP B1 via Cloudflare Tunnel', price: 'Fixed price on request', text: 'Make your SAP Business One securely reachable – with no open firewall ports. Setup, hardening, documentation and handover.' },
      { title: 'Development & consulting', price: 'from €95/h', text: 'Interfaces, extensions, troubleshooting and advice around SAP FSM, SAP B1 and integration – remote, billed by time.' },
    ],
    note: 'Prices are guide values. The written proposal is binding.',
  },
  process: {
    h2: 'How we work together',
    items: [
      { title: 'Intro call', text: 'In 15 minutes we clarify your goal, your systems and whether I’m the right fit.' },
      { title: 'Written proposal', text: 'You get a clear proposal with scope, milestones and a fixed price or effort estimate.' },
      { title: 'Delivery', text: 'Iterative delivery with regular demos, documentation and a clean handover.' },
    ],
  },
  about: {
    h2: 'About me',
    paragraphs: [
      'I’m TOF Solution, an IHK-certified IT specialist (Fachinformatiker) and owner of TOF Solution, based in Germany and working remotely.',
      'My focus is SAP Field Service Management and everything it has to talk to: SAP Business One, S/4HANA, Cloudflare and IoT devices. I work in German, English and Arabic.',
    ],
    cert: 'SAP FSM certification in preparation',
    photoAlt: 'TOF Solution',
    profiles: 'Profiles',
    factsTitle: 'At a glance',
    facts: [
      ['Name', 'TOF Solution'],
      ['Role', 'Freelance developer, SAP FSM & integration · Fachinformatiker (IHK)'],
      ['Company', 'TOF Solution (owner)'],
      ['Location', 'Germany · remote'],
      ['Focus', 'SAP Field Service Management, SAP Business One, SAP S/4HANA interfaces, Cloudflare, IoT'],
      ['Languages', 'German, English, Arabic'],
      ['Rate', 'from €95/h · fixed-price packages on request'],
      ['Contact', 'Tarek@tarekfatal.com'],
    ],
  },
  more: {
    h2: 'Other work',
    items: [
      { title: 'Weather & marine bulletin system', text: 'Operational system for producing and publishing weather and sea-state bulletins – live in operation.' },
      { title: 'Maritime situational picture', text: 'Software for a maritime situational picture with direct radar integration.' },
      { title: 'E-government prototype', text: 'Prototype of a citizen platform with an online auction.' },
    ],
  },
  faq: {
    h2: 'FAQ',
    items: [
      { q: 'What does TOF Solution do?', a: 'TOF Solution is a freelance developer from Germany specialising in SAP Field Service Management (SAP FSM) and its integration with SAP Business One, SAP S/4HANA, Cloudflare and IoT.' },
      { q: 'Who do you work for?', a: 'SAP FSM customers in the DACH region, SAP partners and system integrators who need FSM or B1 know-how at short notice, and companies running SAP Business One on-premise that want to connect cloud services.' },
      { q: 'Can SAP FSM checklists be created in bulk?', a: 'Yes. My checklist builder exports templates as a ZIP file in the SAP FSM import format. In a load test, 10,000 checklists were processed without errors.' },
      { q: 'How do you connect an on-premise SAP Business One securely?', a: 'With Cloudflare Tunnel: the connection is established outbound from your network, so no firewall ports have to be opened.' },
      { q: 'What does it cost?', a: 'Development and consulting from €95 per hour. Fixed-price packages are available on request for typical tasks such as the FSM checklist import or connecting SAP B1 via Cloudflare Tunnel.' },
      { q: 'Where are you based and which languages do you work in?', a: 'I’m based in Germany and work remotely. Working languages: German, English and Arabic.' },
      { q: 'How does a project start?', a: 'With a 15-minute intro call or a short email to Tarek@tarekfatal.com. You then receive a written proposal.' },
    ],
  },
  contact: {
    h2: 'Request a project',
    lead: 'Tell me in a few sentences what you want to achieve and which systems are involved. You’ll get an answer shortly.',
    call: 'Book a 15-min intro call',
    callSubject: 'Intro call (15 min)',
    callBody: 'Hi TOF,\n\nI’d like to book a 15-minute intro call.\n\nTopic:\nPossible times:\n\n',
    emailLabel: 'Or email me directly',
    form: {
      name: 'Name',
      email: 'Your email',
      company: 'Company (optional)',
      message: 'What should be built or connected?',
      submit: 'Prepare email',
      note: 'The form opens your email program with the text pre-filled. This website does not store or send any data.',
      subject: 'Project request',
    },
  },
  footer: {
    imprint: { label: 'Imprint', href: 'en/imprint/' },
    privacy: { label: 'Privacy', href: 'en/privacy/' },
    tagline: 'SAP Field Service Management & Integration',
  },
  schema: {
    jobTitle: 'Freelance developer – SAP Field Service Management & integration',
    personDescription:
      'IHK-certified IT specialist (Fachinformatiker) and owner of TOF Solution. Freelance developer for SAP Field Service Management and integrations with SAP Business One, SAP S/4HANA, Cloudflare and IoT.',
    businessDescription:
      'Freelance IT services for SAP Field Service Management, SAP Business One and S/4HANA interfaces, and Cloudflare and IoT integration. Remote from Germany.',
  },
};
