// Neutral, self-drawn SVG illustrations for the case studies (no client screenshots).
// Colours come from CSS classes (.art …) so they follow the light/dark theme.
// All x coordinates are mirrored for RTL pages.
const W = 600;
const H = 400;

function kit(rtl, id) {
  const X = (x) => (rtl ? W - x : x);
  const rx = (x, w) => (rtl ? W - x - w : x);
  const rect = (x, y, w, h, r, cls, extra = '') => `<rect x="${rx(x, w)}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${cls}"${extra}/>`;
  const circle = (cx, cy, r, cls) => `<circle cx="${X(cx)}" cy="${cy}" r="${r}" class="${cls}"/>`;
  // path from a list of [cmd, ...points]; points are [x, y]
  const path = (cmds, cls, extra = '') =>
    `<path d="${cmds.map(([c, ...pts]) => c + pts.map(([x, y]) => `${X(x)} ${y}`).join(' ')).join('')}" class="${cls}"${extra}/>`;
  const text = (x, y, t, cls, anchor = 'start') => {
    const a = rtl ? { start: 'end', end: 'start', middle: 'middle' }[anchor] : anchor;
    return `<text x="${X(x)}" y="${y}" text-anchor="${a}" class="${cls}">${t}</text>`;
  };
  // check marks are never mirrored
  const check = (cx, cy, s = 1, cls = 'tick') => { const x = X(cx); return `<path d="M${x - 7 * s} ${cy}L${x - 2 * s} ${cy + 5 * s}L${x + 8 * s} ${cy - 6 * s}" class="${cls}"/>`; };
  const marker = `<marker id="ah-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" class="ah"/></marker>`;
  const arrow = (cmds) => path(cmds, 'arrow', ` marker-end="url(#ah-${id})"`);
  return { X, rx, rect, circle, path, text, check, marker, arrow };
}

const svg = (id, label, defs, body) =>
  `<svg class="art" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}" direction="ltr"><defs>${defs}<linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a58c2"/><stop offset="1" stop-color="#12877b"/></linearGradient></defs>${body}</svg>`;

// 1 · checklist builder: chapters → ZIP → SAP FSM
function builder(rtl, label) {
  const k = kit(rtl, 'b');
  const rows = [120, 172, 224, 276];
  const bars = [104, 84, 118, 72];
  let b = '';
  b += k.rect(24, 52, 236, 288, 18, 'panel');
  b += k.rect(24, 52, 236, 46, 18, 'panel-head');
  b += k.rect(24, 80, 236, 18, 0, 'panel-head');
  b += [44, 58, 72].map((x) => k.circle(x, 75, 4, 'dot')).join('');
  b += k.rect(96, 70, 92, 10, 5, 'bar');
  rows.forEach((y, i) => {
    if (i === 1) {
      b += k.rect(42, y, 200, 38, 10, 'row ghost');
      return;
    }
    b += k.rect(42, y, 200, 38, 10, 'row');
    b += k.rect(54, y + 11, 16, 16, 5, 'chip');
    b += k.rect(80, y + 14, bars[i], 10, 5, 'bar');
    b += k.rect(206, y + 12, 26, 14, 7, 'chip');
  });
  // dragged chapter
  b += k.rect(50, 160, 200, 38, 10, 'row drag');
  b += k.rect(62, 171, 16, 16, 5, 'chip-acc');
  b += k.rect(88, 174, 84, 10, 5, 'bar-acc');
  b += k.rect(214, 172, 26, 14, 7, 'chip');
  b += k.arrow([['M', [270, 196]], ['L', [306, 196]]]);
  // ZIP file
  b += k.path([['M', [316, 126]], ['L', [378, 126]], ['L', [404, 152]], ['L', [404, 266]], ['L', [316, 266]], ['Z']], 'file');
  b += k.path([['M', [378, 126]], ['L', [378, 152]], ['L', [404, 152]]], 'fold');
  b += [138, 150, 162, 174, 186].map((y, i) => k.rect(i % 2 ? 356 : 350, y, 8, 8, 2, 'zip')).join('');
  b += k.rect(342, 196, 30, 18, 4, 'zip-lock');
  b += k.text(360, 248, 'ZIP', 'label', 'middle');
  b += k.arrow([['M', [414, 196]], ['L', [446, 196]]]);
  // SAP FSM target
  b += k.rect(454, 146, 128, 100, 20, 'target', ` fill="url(#g-b)"`);
  b += k.text(518, 192, 'SAP FSM', 'target-t', 'middle');
  b += k.circle(518, 218, 11, 'target-ok');
  b += k.check(518, 218, 0.8);
  return svg('b', label, k.marker, b);
}

// 2 · field service app: IoT signal → app (2FA, scan, checklist) → cloud → SAP FSM
function fsapp(rtl, label) {
  const k = kit(rtl, 'f');
  let b = '';
  // IoT device + signal
  b += k.rect(34, 158, 74, 96, 16, 'panel');
  b += k.rect(48, 174, 46, 30, 8, 'chip');
  b += [56, 71, 86].map((x, i) => k.circle(x, 226, 4.5, i === 2 ? 'dot-acc' : 'dot-ok')).join('');
  b += [0, 1, 2].map((i) => k.path([['M', [122 + i * 14, 176 - i * 10]], ['Q', [142 + i * 18, 206], [122 + i * 14, 236 + i * 10]]], 'wave')).join('');
  // phone
  b += k.rect(196, 34, 176, 332, 30, 'device');
  b += k.rect(208, 52, 152, 296, 20, 'screen');
  b += k.rect(220, 66, 90, 12, 6, 'bar');
  b += k.circle(344, 72, 11, 'lock-bg');
  b += k.rect(339, 70, 10, 8, 2, 'lock');
  b += k.path([['M', [341, 70]], ['L', [341, 66]], ['Q', [344, 62], [347, 66]], ['L', [347, 70]]], 'lock-arc');
  b += k.rect(220, 92, 128, 62, 12, 'row');
  b += k.rect(232, 104, 60, 10, 5, 'bar');
  b += k.rect(232, 130, 104, 8, 4, 'track');
  b += k.rect(232, 130, 83, 8, 4, 'fill-ok');
  [168, 200, 232, 264].forEach((y, i) => {
    b += k.rect(220, y, 128, 26, 8, 'row');
    b += k.circle(234, y + 13, 5, i === 2 ? 'dot-warn' : 'dot-ok');
    b += k.rect(246, y + 9, [70, 86, 60, 78][i], 8, 4, 'bar');
  });
  // scan frame
  const sx = 266;
  const sy = 302;
  b += k.path([['M', [sx, sy + 10]], ['L', [sx, sy]], ['L', [sx + 10, sy]], ['M', [sx + 26, sy]], ['L', [sx + 36, sy]], ['L', [sx + 36, sy + 10]], ['M', [sx + 36, sy + 22]], ['L', [sx + 36, sy + 32]], ['L', [sx + 26, sy + 32]], ['M', [sx + 10, sy + 32]], ['L', [sx, sy + 32]], ['L', [sx, sy + 22]]], 'scan');
  b += k.rect(sx + 8, sy + 15, 20, 3, 1.5, 'scan-line');
  // cloud + FSM
  b += k.arrow([['M', [382, 168]], ['C', [410, 168], [410, 132], [432, 132]]]);
  // cloud: outline layer first, fill layer on top, so only the outer edge shows
  for (const cls of ['cloud-o', 'cloud']) {
    b += k.circle(462, 128, 22, cls);
    b += k.circle(492, 118, 28, cls);
    b += k.circle(522, 132, 20, cls);
    b += k.rect(446, 128, 92, 26, 13, cls);
  }
  b += k.arrow([['M', [492, 162]], ['L', [492, 214]]]);
  b += k.rect(426, 222, 132, 88, 20, 'target', ` fill="url(#g-f)"`);
  b += k.text(492, 262, 'SAP FSM', 'target-t', 'middle');
  b += k.circle(492, 286, 10, 'target-ok');
  b += k.check(492, 286, 0.75);
  return svg('f', label, k.marker, b);
}

// 3 · load test: cumulative deliveries, disruptions handled, ends with a check
function load(rtl, label, total) {
  const k = kit(rtl, 'l');
  let b = '';
  b += k.rect(24, 30, 552, 330, 20, 'panel');
  b += '<g transform="translate(0 14)">';
  [110, 160, 210, 260, 310].forEach((y) => (b += k.path([['M', [64, y]], ['L', [548, y]]], 'grid')));
  const hs = [18, 26, 22, 34, 30, 42, 38, 46, 40, 52, 48, 58, 50, 62, 56, 66, 60, 70, 64, 74];
  hs.forEach((h, i) => (b += k.rect(72 + i * 23.5, 310 - h, 12, h, 3, 'col')));
  const pts = [[72, 302], [120, 286], [168, 268], [216, 246], [264, 226], [312, 204], [360, 180], [408, 158], [456, 136], [504, 116], [536, 104]];
  const line = [['M', pts[0]], ...pts.slice(1).map((p) => ['L', p])];
  b += k.path([...line, ['L', [536, 310]], ['L', [72, 310]], ['Z']], 'area');
  b += k.path(line, 'trend');
  // disruptions (network drop, duplicate, SAP error) – all recovered
  [[216, 246], [312, 204], [408, 158]].forEach(([x, y]) => {
    b += k.circle(x, y, 9, 'warn-halo');
    b += k.circle(x, y, 5, 'warn');
  });
  b += k.circle(536, 104, 17, 'ok');
  b += k.check(536, 104, 1, 'tick tick-ok');
  b += k.text(64, 78, total, 'big');
  b += k.rect(64, 88, 40, 6, 3, 'bar-acc');
  b += '</g>';
  return svg('l', label, '', b);
}

export function caseArt(kind, c, title) {
  const rtl = c.dir === 'rtl';
  const label = `${c.cases.artLabel}${c.lang === 'zh' ? '：' : ' – '}${title}`.replace(/"/g, '&quot;');
  const body = kind === 'builder' ? builder(rtl, label) : kind === 'fsapp' ? fsapp(rtl, label) : load(rtl, label, c.stats[0].text);
  return `<div class="case-art">${body}</div>`;
}
