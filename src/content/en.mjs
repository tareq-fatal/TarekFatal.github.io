export default {
  lang: 'en',
  htmlLang: 'en',
  dir: 'ltr',
  ogLocale: 'en_US',
  label: 'English',
  short: 'EN',
  title: 'TOF Solution · SAP Field Service Management & Integration',
  description:
    'Freelance developer for SAP Field Service Management and integrations with SAP Business One, S/4HANA, Cloudflare and IoT. Remote from Germany. English, German, Arabic.',
  ogAlt: 'TOF Solution – SAP Field Service Management & Integration',
  nav: {
    skip: 'Skip to content',
    services: 'Services',
    projects: 'Projects',
    process: 'Process',
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
    lead:
      'I’m TOF Solution, IHK-certified IT specialist (Fachinformatiker) and owner of TOF Solution. I build integrations between SAP FSM, SAP Business One, S/4HANA, Cloudflare and IoT – and focused web platforms when a project needs one.',
    cta: 'Request a project',
    secondary: 'See projects',
    facts: [
      ['10,000', 'checklists in a load test – zero errors'],
      ['Seconds', 'from IoT signal to feedback'],
      ['0', 'open inbound ports for SAP B1 via Cloudflare Tunnel'],
    ],
  },
  services: {
    h2: 'Services',
    intro: 'Four areas, one goal: field service data that flows without manual work.',
    items: [
      {
        icon: 'fsm',
        title: 'SAP FSM build & automation',
        text: 'Checklists, templates and bulk data for SAP Field Service Management – generated and exported in the FSM import format instead of clicked together by hand.',
      },
      {
        icon: 'erp',
        title: 'SAP Business One & S/4HANA interfaces',
        text: 'Interfaces between SAP FSM and your ERP: master data, service calls and documents. Background in SAP B1 development (SDK, DI API, reports, SQL).',
      },
      {
        icon: 'cloud',
        title: 'Cloudflare & IoT integration',
        text: 'Secure connectivity via Cloudflare Tunnel without exposing your systems, and device signals that reach your service process within seconds.',
      },
      {
        icon: 'web',
        title: 'Web platforms & operational software',
        text: 'Prototypes and platforms beyond SAP: e-government demos, maritime situational awareness with radar integration, weather and marine bulletins.',
      },
    ],
  },
  projects: {
    h2: 'Selected projects',
    intro: 'Real work, described without client names.',
    resultLabel: 'Result',
    items: [
      {
        tag: 'SAP FSM',
        title: 'SAP FSM checklist builder',
        text: 'Tool that builds checklists and exports them as a ZIP file in the SAP FSM import format.',
        result: '10,000 checklists processed in a load test without a single error.',
      },
      {
        tag: 'IoT',
        title: 'IoT feedback for field service',
        text: 'Feedback from IoT devices is passed directly into the field service process.',
        result: 'Feedback arrives within seconds.',
      },
      {
        tag: 'SAP Business One',
        title: 'SAP B1 via Cloudflare Tunnel',
        text: 'An on-premise SAP Business One connected to cloud services through an outbound-only Cloudflare Tunnel.',
        result: 'Secure access without opening inbound firewall ports.',
      },
      {
        tag: 'Operations',
        title: 'Weather & marine bulletin system',
        text: 'Operational system for producing and publishing weather and sea-state bulletins.',
        result: 'Live in operation.',
      },
      {
        tag: 'Maritime',
        title: 'Maritime situational picture',
        text: 'Software for a maritime situational picture with direct radar integration.',
        result: 'Radar data integrated directly into the situational picture.',
      },
      {
        tag: 'E-Government',
        title: 'E-government platform (prototype)',
        text: 'Demo of a citizen-facing web platform with an online auction workflow.',
        result: 'Clickable prototype online.',
        link: 'https://mot-plates-demo.pages.dev',
        linkLabel: 'Open demo',
      },
    ],
  },
  process: {
    h2: 'How we work together',
    items: [
      { title: 'Intro call', text: 'You describe the goal and your systems. We clarify scope, data and constraints.' },
      { title: 'Written proposal', text: 'You get a clear proposal with scope, milestones and effort estimate.' },
      { title: 'Delivery', text: 'Iterative delivery with regular demos, documentation and a clean handover.' },
    ],
  },
  about: {
    h2: 'About me',
    paragraphs: [
      'I’m TOF Solution, an IHK-certified IT specialist (Fachinformatiker) and owner of TOF Solution, based in Germany and working remotely.',
      'My focus is SAP Field Service Management and everything it has to talk to: SAP Business One, S/4HANA, Cloudflare and IoT devices. I also build web platforms and operational software – from e-government prototypes to maritime and weather systems.',
      'I work in German, English and Arabic.',
    ],
    factsTitle: 'At a glance',
    facts: [
      ['Name', 'TOF Solution'],
      ['Role', 'Freelance developer, SAP FSM & integration · Fachinformatiker (IHK)'],
      ['Company', 'TOF Solution (owner)'],
      ['Location', 'Germany · remote'],
      ['Focus', 'SAP Field Service Management, SAP Business One, SAP S/4HANA interfaces, Cloudflare, IoT'],
      ['Also', 'Web platforms, e-government prototypes, maritime situational awareness, weather & marine bulletins'],
      ['Languages', 'German, English, Arabic'],
      ['Contact', 'Tarek@tarekfatal.com'],
    ],
  },
  faq: {
    h2: 'FAQ',
    items: [
      {
        q: 'What does TOF Solution do?',
        a: 'TOF Solution is a freelance developer from Germany specialising in SAP Field Service Management (SAP FSM) and its integration with SAP Business One, SAP S/4HANA, Cloudflare and IoT. He also builds web platforms and operational software.',
      },
      {
        q: 'Which systems can you connect to SAP FSM?',
        a: 'SAP Business One and SAP S/4HANA on the ERP side, IoT devices for real-time signals, and cloud services such as Cloudflare for secure connectivity.',
      },
      {
        q: 'Can SAP FSM checklists be created in bulk?',
        a: 'Yes. My checklist builder exports checklists as a ZIP file in the SAP FSM import format. In a load test, 10,000 checklists were processed without errors.',
      },
      {
        q: 'How do you connect an on-premise SAP Business One securely?',
        a: 'With Cloudflare Tunnel: the connection is established outbound from your network, so no inbound firewall ports have to be opened.',
      },
      {
        q: 'Do you only work on SAP projects?',
        a: 'No. I also build web platforms and prototypes, for example e-government demos, maritime situational awareness software with radar integration and weather and marine bulletin systems.',
      },
      {
        q: 'Where are you based and which languages do you work in?',
        a: 'I’m based in Germany and work remotely. Working languages: German, English and Arabic.',
      },
      {
        q: 'How does a project start?',
        a: 'Send a short description to Tarek@tarekfatal.com. After an intro call you receive a written proposal with scope, milestones and effort estimate.',
      },
    ],
  },
  contact: {
    h2: 'Request a project',
    lead: 'Tell me in a few sentences what you want to achieve and which systems are involved. You’ll get an answer within a short time.',
    emailLabel: 'Email me directly',
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
      'Freelance IT services for SAP Field Service Management, SAP Business One and S/4HANA interfaces, Cloudflare and IoT integration, and web platforms. Remote from Germany.',
  },
};
