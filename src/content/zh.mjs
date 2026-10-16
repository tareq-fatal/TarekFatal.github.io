export default {
  lang: 'zh',
  htmlLang: 'zh-Hans',
  hreflang: 'zh-Hans',
  dir: 'ltr',
  ogLocale: 'zh_CN',
  label: '简体中文',
  title: 'TOF Solution · SAP 现场服务管理与系统集成',
  description:
    '自由职业开发者，专注 SAP Field Service Management 及其与 SAP Business One、S/4HANA、Cloudflare 和物联网的集成，减少现场服务中的人工操作。常驻德国，远程工作。',
  ogAlt: 'TOF Solution – SAP 现场服务管理与系统集成',
  nav: {
    skip: '跳至正文',
    services: '服务',
    cases: '案例',
    pricing: '价格',
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
    lead: '减少现场服务中的人工操作：检查清单、工单和设备数据在 SAP FSM、SAP Business One 或 S/4HANA 与您的设备之间自动流转。',
    cta: '咨询项目',
    secondary: '查看案例',
    facts: [
      ['10,000', '份检查清单通过负载测试，零错误'],
      ['数秒', '从物联网信号到反馈'],
      ['防火墙保持关闭', '通过 Cloudflare Tunnel 连接 SAP B1，无需开放防火墙端口'],
    ],
  },
  audience: {
    h2: '服务对象',
    items: [
      { title: 'DACH 地区的 SAP FSM 用户', text: '您正在使用 SAP Field Service Management，希望检查清单、工单和反馈无需人工处理。' },
      { title: 'SAP 合作伙伴与系统集成商', text: '您需要在短时间内补充 SAP FSM 或 SAP Business One 方面的专业能力——远程、按项目合作。' },
      { title: '本地部署 SAP B1 的企业', text: '您的 SAP Business One 运行在自有网络中，需要与云服务、应用或 SAP FSM 安全对接。' },
    ],
  },
  services: {
    h2: '服务',
    intro: '三个领域，一个目标：让服务数据无需人工即可流转。',
    items: [
      { icon: 'fsm', title: 'SAP FSM 搭建与自动化', text: '为 SAP Field Service Management 生成检查清单、模板和批量数据，进行版本管理，并以 FSM 导入格式导出，无需手工逐项录入。' },
      { icon: 'erp', title: 'SAP Business One 与 S/4HANA 接口', text: '打通 SAP FSM 与您的 ERP：主数据、服务请求和单据。具备 SAP B1 开发背景（SDK、DI API、报表、SQL）。' },
      { icon: 'cloud', title: 'Cloudflare 与物联网集成', text: '通过 Cloudflare Tunnel 安全连接，无需开放防火墙端口；设备信号可在数秒内进入服务流程。' },
    ],
  },
  cases: {
    h2: '案例',
    intro: '真实项目，以演示数据展示，客户名称已做模糊处理。',
    labels: { situation: '背景', solution: '方案', result: '成果' },
    zoom: '查看原图',
    items: [
      {
        tag: 'SAP FSM',
        title: '带 ZIP 导出功能的 SAP FSM 检查清单生成器',
        situation: '大型检查清单模板（演示中为 10 个章节、230 多个字段）若在 SAP FSM 中手工维护和导入，既费时又容易出错。',
        solution: '在生成器中通过拖放创建章节和字段（文本、选项、是/否、数字、照片、条码、签名、设备卡片），并进行版本管理和校验。一键即可导出符合 SAP FSM 导入格式的 ZIP 文件。',
        result: '包含 10 个章节、237 个字段的模板被导出为带版本号、可直接导入的 ZIP 文件，无需在 SAP FSM 中手工补录。',
        images: [
          { src: 'case-builder', w: 1200, h: 717, alt: '检查清单生成器：左侧为字段类型，中间为模板章节（演示数据，德语界面）', caption: '生成器：字段类型与模板章节' },
          { src: 'case-export', w: 1200, h: 717, alt: '导出至 SAP FSM 的对话框，含版本号和下载 ZIP 按钮（德语界面）', caption: '以 SAP FSM 导入格式导出 ZIP' },
        ],
      },
      {
        tag: '负载测试',
        title: '负载测试：向 SAP FSM 提交 10,000 份检查清单',
        situation: '在技术人员日常向 SAP FSM 提交带照片和签名的检查清单之前，必须证明在高负载和异常情况下提交依然可靠。',
        solution: '模拟的技术人员通过与真实应用相同的路径提交含照片、签名和设备明细的检查清单，并包含发送途中断网、重复提交、两名技术人员处理同一工单以及模拟的 SAP 错误。仅在演示租户中进行。',
        result: '负载测试中处理 10,000 份检查清单，零错误。',
        images: [
          { src: 'case-belege', w: 1200, h: 495, alt: '单据概览，显示技术人员、来源和“已进入 SAP FSM”状态（演示数据，德语界面）', caption: '单据概览及向 SAP FSM 的提交状态' },
        ],
      },
    ],
  },
  projects: {
    h2: '更多 SAP 与集成项目',
    resultLabel: '成果',
    items: [
      { tag: 'IoT', title: '现场服务的物联网反馈', text: '物联网设备的反馈直接进入现场服务流程。', result: '数秒内获得反馈。' },
      { tag: 'SAP Business One', title: '通过 Cloudflare Tunnel 连接 SAP B1', text: '本地部署的 SAP Business One 通过仅出站的 Cloudflare 隧道连接云服务。', result: '安全访问，无需开放防火墙端口。' },
    ],
  },
  pricing: {
    h2: '服务套餐与价格',
    intro: '常见任务提供清晰的套餐，其余按工时计费。',
    items: [
      { title: 'FSM 检查清单导入', price: '固定价格，欢迎询价', text: '搭建或接手您的检查清单模板，完成校验，并以 SAP FSM 导入格式交付 ZIP 文件，导入过程全程协助。' },
      { title: '通过 Cloudflare Tunnel 连接 SAP B1', price: '固定价格，欢迎询价', text: '让您的 SAP Business One 安全可达，无需开放防火墙端口：部署、加固、文档与交接。' },
      { title: '开发与咨询', price: '每小时 95 欧元起', text: '围绕 SAP FSM、SAP B1 与系统集成的接口开发、功能扩展、故障排查和咨询——远程，按工时计费。' },
    ],
    note: '价格仅供参考，以书面报价为准。',
  },
  process: {
    h2: '合作流程',
    items: [
      { title: '初步沟通', text: '用 15 分钟明确您的目标、现有系统，以及我是否适合这个项目。' },
      { title: '书面方案', text: '您将收到包含范围、里程碑以及固定价格或工作量估算的清晰方案。' },
      { title: '交付', text: '分阶段交付，定期演示，提供文档并完成规范交接。' },
    ],
  },
  about: {
    h2: '关于我',
    paragraphs: [
      '我是 TOF Solution，德国工商会（IHK）认证的信息技术专员（Fachinformatiker），TOF Solution 的所有者，常驻德国，远程工作。',
      '我专注于 SAP Field Service Management 以及与之对接的一切系统：SAP Business One、S/4HANA、Cloudflare 和物联网设备。工作语言为德语、英语和阿拉伯语。',
    ],
    cert: 'SAP FSM 认证准备中',
    photoAlt: 'TOF Solution',
    profiles: '个人主页',
    factsTitle: '概览',
    facts: [
      ['姓名', 'TOF Solution'],
      ['角色', '自由职业开发者，SAP FSM 与系统集成 · Fachinformatiker（IHK）'],
      ['公司', 'TOF Solution（所有者）'],
      ['地点', '德国 · 远程'],
      ['专长', 'SAP Field Service Management、SAP Business One、SAP S/4HANA 接口、Cloudflare、物联网'],
      ['工作语言', '德语、英语、阿拉伯语'],
      ['价格', '每小时 95 欧元起 · 固定价格套餐欢迎询价'],
      ['联系方式', 'Tarek@tarekfatal.com'],
    ],
  },
  more: {
    h2: '其他工作',
    items: [
      { title: '气象与海况公报系统', text: '用于编制和发布气象及海况公报的运营系统，已上线运行。' },
      { title: '海上态势感知', text: '直接接入雷达的海上态势显示软件。' },
      { title: '电子政务原型', text: '带在线拍卖功能的公众服务平台原型。' },
    ],
  },
  faq: {
    h2: '常见问题',
    items: [
      { q: 'TOF Solution 是做什么的？', a: 'TOF Solution 是一名来自德国的自由职业开发者，专注于 SAP Field Service Management（SAP FSM）及其与 SAP Business One、SAP S/4HANA、Cloudflare 和物联网的集成。' },
      { q: '您为哪些客户服务？', a: 'DACH 地区的 SAP FSM 用户、需要在短时间内补充 FSM 或 B1 能力的 SAP 合作伙伴与系统集成商，以及希望将本地部署的 SAP Business One 接入云服务的企业。' },
      { q: '可以批量创建 SAP FSM 检查清单吗？', a: '可以。我的检查清单生成器以 SAP FSM 导入格式将模板导出为 ZIP 文件。在负载测试中，10,000 份检查清单全部处理无误。' },
      { q: '如何安全地连接本地部署的 SAP Business One？', a: '使用 Cloudflare Tunnel：连接由您的网络向外发起，因此无需开放任何防火墙端口。' },
      { q: '费用是多少？', a: '开发与咨询每小时 95 欧元起。对于 FSM 检查清单导入、通过 Cloudflare Tunnel 连接 SAP B1 等常见任务，可按需提供固定价格套餐。' },
      { q: '您在哪里？使用哪些工作语言？', a: '我常驻德国，远程工作。工作语言为德语、英语和阿拉伯语。' },
      { q: '项目如何开始？', a: '预约 15 分钟的初步沟通，或发送简短邮件至 Tarek@tarekfatal.com（可使用英语、德语或阿拉伯语），随后您将收到书面方案。' },
    ],
  },
  contact: {
    h2: '咨询项目',
    lead: '请用几句话说明您的目标以及涉及的系统（建议使用英语、德语或阿拉伯语），我会尽快回复。',
    call: '预约 15 分钟初步沟通',
    callSubject: 'Intro call (15 min)',
    callBody: 'Hi TOF,\n\nI’d like to book a 15-minute intro call.\n\nTopic:\nPossible times:\n\n',
    emailLabel: '或直接发送邮件',
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
      '提供 SAP Field Service Management、SAP Business One 与 S/4HANA 接口以及 Cloudflare 与物联网集成的自由职业 IT 服务。德国远程。',
  },
};
