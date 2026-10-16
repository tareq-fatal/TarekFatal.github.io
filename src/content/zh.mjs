export default {
  lang: 'zh',
  htmlLang: 'zh-Hans',
  hreflang: 'zh-Hans',
  dir: 'ltr',
  ogLocale: 'zh_CN',
  label: '简体中文',
  short: '中文',
  title: 'TOF Solution · SAP 现场服务管理与系统集成',
  description:
    '自由职业开发者，专注 SAP Field Service Management 及其与 SAP Business One、S/4HANA、Cloudflare 和物联网的集成。常驻德国，远程工作。',
  ogAlt: 'TOF Solution – SAP 现场服务管理与系统集成',
  nav: {
    skip: '跳至正文',
    services: '服务',
    projects: '项目',
    process: '合作流程',
    about: '关于我',
    faq: '常见问题',
    cta: '咨询项目',
    theme: '切换深色模式',
    language: '语言',
    menu: '主导航',
  },
  hero: {
    eyebrow: '自由职业 · 德国远程 · 工作语言：英语 / 德语 / 阿拉伯语',
    h1: '我将 SAP 现场服务管理与您的 ERP、设备和云端连接起来。',
    lead:
      '我是 TOF Solution，德国工商会（IHK）认证的信息技术专员（Fachinformatiker），TOF Solution 的所有者。我负责构建 SAP FSM 与 SAP Business One、S/4HANA、Cloudflare 及物联网之间的接口，并在项目需要时开发精简的 Web 平台。',
    cta: '咨询项目',
    secondary: '查看项目',
    facts: [
      ['10,000', '份检查清单通过负载测试，零错误'],
      ['数秒', '从物联网信号到反馈'],
      ['0', '个入站端口：通过 Cloudflare Tunnel 连接 SAP B1'],
    ],
  },
  services: {
    h2: '服务',
    intro: '四个领域，一个目标：让服务数据无需人工即可流转。',
    items: [
      {
        icon: 'fsm',
        title: 'SAP FSM 搭建与自动化',
        text: '为 SAP Field Service Management 生成检查清单、模板和批量数据，并以 FSM 导入格式导出，无需手工逐项录入。',
      },
      {
        icon: 'erp',
        title: 'SAP Business One 与 S/4HANA 接口',
        text: '打通 SAP FSM 与您的 ERP：主数据、服务请求和单据。具备 SAP B1 开发背景（SDK、DI API、报表、SQL）。',
      },
      {
        icon: 'cloud',
        title: 'Cloudflare 与物联网集成',
        text: '通过 Cloudflare Tunnel 安全连接，无需将系统暴露在公网；设备信号可在数秒内进入服务流程。',
      },
      {
        icon: 'web',
        title: 'Web 平台与运营软件',
        text: 'SAP 之外的原型与平台：电子政务演示、带雷达接入的海上态势软件、气象与海况公报系统。',
      },
    ],
  },
  projects: {
    h2: '精选项目',
    intro: '真实项目，不公开客户名称。',
    resultLabel: '成果',
    items: [
      {
        tag: 'SAP FSM',
        title: 'SAP FSM 检查清单生成器',
        text: '用于创建检查清单并以 SAP FSM 导入格式导出为 ZIP 文件的工具。',
        result: '负载测试中处理 10,000 份检查清单，零错误。',
      },
      {
        tag: 'IoT',
        title: '现场服务的物联网反馈',
        text: '物联网设备的反馈直接进入现场服务流程。',
        result: '数秒内获得反馈。',
      },
      {
        tag: 'SAP Business One',
        title: '通过 Cloudflare Tunnel 连接 SAP B1',
        text: '本地部署的 SAP Business One 通过仅出站的 Cloudflare 隧道连接云服务。',
        result: '安全访问，无需在防火墙上开放入站端口。',
      },
      {
        tag: '运营',
        title: '气象与海况公报系统',
        text: '用于编制和发布气象及海况公报的运营系统。',
        result: '已上线运行。',
      },
      {
        tag: '海事',
        title: '海上态势感知',
        text: '直接接入雷达的海上态势显示软件。',
        result: '雷达数据直接集成到态势图中。',
      },
      {
        tag: '电子政务',
        title: '电子政务平台（原型）',
        text: '面向公众的 Web 平台演示，包含在线拍卖流程。',
        result: '可交互原型已上线。',
        link: 'https://mot-plates-demo.pages.dev',
        linkLabel: '打开演示',
      },
    ],
  },
  process: {
    h2: '合作流程',
    items: [
      { title: '初步沟通', text: '您介绍目标和现有系统，我们一起明确范围、数据与约束条件。' },
      { title: '书面方案', text: '您将收到包含范围、里程碑和工作量估算的清晰方案。' },
      { title: '交付', text: '分阶段交付，定期演示，提供文档并完成规范交接。' },
    ],
  },
  about: {
    h2: '关于我',
    paragraphs: [
      '我是 TOF Solution，德国工商会（IHK）认证的信息技术专员，TOF Solution 的所有者，常驻德国，远程工作。',
      '我专注于 SAP Field Service Management 以及与之对接的一切系统：SAP Business One、S/4HANA、Cloudflare 和物联网设备。此外，我也开发 Web 平台和运营软件——从电子政务原型到海事与气象系统。',
      '我的工作语言为德语、英语和阿拉伯语。',
    ],
    factsTitle: '概览',
    facts: [
      ['姓名', 'TOF Solution'],
      ['角色', '自由职业开发者，SAP FSM 与系统集成 · Fachinformatiker（IHK）'],
      ['公司', 'TOF Solution（所有者）'],
      ['地点', '德国 · 远程'],
      ['专长', 'SAP Field Service Management、SAP Business One、SAP S/4HANA 接口、Cloudflare、物联网'],
      ['其他', 'Web 平台、电子政务原型、海上态势感知、气象与海况公报'],
      ['工作语言', '德语、英语、阿拉伯语'],
      ['联系方式', 'Tarek@tarekfatal.com'],
    ],
  },
  faq: {
    h2: '常见问题',
    items: [
      {
        q: 'TOF Solution 是做什么的？',
        a: 'TOF Solution 是一名来自德国的自由职业开发者，专注于 SAP Field Service Management（SAP FSM）及其与 SAP Business One、SAP S/4HANA、Cloudflare 和物联网的集成，同时开发 Web 平台和运营软件。',
      },
      {
        q: '哪些系统可以与 SAP FSM 连接？',
        a: 'ERP 方面包括 SAP Business One 和 SAP S/4HANA；此外还可连接用于实时信号的物联网设备，以及用于安全连接的 Cloudflare 等云服务。',
      },
      {
        q: '可以批量创建 SAP FSM 检查清单吗？',
        a: '可以。我的检查清单生成器以 SAP FSM 导入格式将清单导出为 ZIP 文件。在负载测试中，10,000 份检查清单全部处理无误。',
      },
      {
        q: '如何安全地连接本地部署的 SAP Business One？',
        a: '使用 Cloudflare Tunnel：连接由您的网络向外发起，因此无需在防火墙上开放任何入站端口。',
      },
      {
        q: '您只做 SAP 项目吗？',
        a: '不是。我也开发 Web 平台和原型，例如电子政务演示、带雷达接入的海上态势软件，以及气象与海况公报系统。',
      },
      {
        q: '您在哪里？使用哪些工作语言？',
        a: '我常驻德国，远程工作。工作语言为德语、英语和阿拉伯语。',
      },
      {
        q: '项目如何开始？',
        a: '请将简短的需求描述发送至 Tarek@tarekfatal.com（可使用英语、德语或阿拉伯语）。初步沟通后，您将收到包含范围、里程碑和工作量估算的书面方案。',
      },
    ],
  },
  contact: {
    h2: '咨询项目',
    lead: '请用几句话说明您的目标以及涉及的系统（建议使用英语、德语或阿拉伯语），我会尽快回复。',
    emailLabel: '直接发送邮件',
    form: {
      name: '姓名',
      email: '您的邮箱',
      company: '公司（可选）',
      message: '需要构建或连接什么？',
      submit: '生成邮件',
      note: '表单会打开您的邮件程序并预先填好内容。本网站不存储也不发送任何数据。',
      subject: 'Project request',
    },
  },
  footer: {
    imprint: { label: '法律声明（Impressum）', href: 'de/impressum/' },
    privacy: { label: '隐私政策', href: 'en/privacy/' },
    tagline: 'SAP 现场服务管理与系统集成',
  },
  schema: {
    jobTitle: '自由职业开发者 – SAP Field Service Management 与系统集成',
    personDescription:
      '德国工商会（IHK）认证的信息技术专员，TOF Solution 的所有者。专注 SAP Field Service Management 及其与 SAP Business One、SAP S/4HANA、Cloudflare 和物联网集成的自由职业开发者。',
    businessDescription:
      '提供 SAP Field Service Management、SAP Business One 与 S/4HANA 接口、Cloudflare 与物联网集成以及 Web 平台的自由职业 IT 服务。德国远程。',
  },
};
