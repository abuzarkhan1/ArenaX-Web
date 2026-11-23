import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
const OUT = path.resolve('.shots');
const PROFILE = path.resolve('.shots/chrome-profile');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForTarget() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const targets = await res.json();
      const page = targets.find((t) => t.type === 'page');
      if (page) return page;
    } catch {
      // not up yet
    }
    await sleep(250);
  }
  throw new Error('Chrome target did not appear');
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.errors = [];
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
      if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
        this.errors.push(msg.params.entry.text);
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        this.errors.push(msg.params.exceptionDetails.text);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return r.result?.value;
  }
  async shot(file) {
    const r = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT, file), Buffer.from(r.data, 'base64'));
  }
}

const SECTIONS = [
  ['statement', '#statement'],
  ['app-showcase', '#app-showcase'],
  ['tournaments', '#tournaments'],
  ['ai-vision', '#ai-vision'],
  ['wallet', '#wallet'],
  ['ranks', '#ranks'],
  ['organizers', '#organizers'],
  ['how-it-works', '#how-it-works'],
  ['comparison', '#comparison'],
  ['scout-rewards', '#scout-rewards'],
  ['download', '#download'],
];

async function run(viewport, prefix) {
  const page = await waitForTarget();
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));
  const cdp = new CDP(ws);

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Log.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
  });
  await cdp.send('Page.navigate', { url: 'http://localhost:5173/' });
  await sleep(1500);
  for (let i = 0; i < 20; i++) {
    const ready = await cdp.eval(`({ state: document.readyState, title: document.title, rootLen: document.getElementById('root')?.innerHTML.length ?? -1, url: location.href })`);
    if (i === 0 || ready.state === 'complete') console.log(prefix, 'load', JSON.stringify(ready));
    if (ready.rootLen > 1000) break;
    await sleep(500);
  }
  await sleep(1500);

  const metrics = await cdp.eval(`({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    scrollHeight: document.documentElement.scrollHeight,
    innerWidth: window.innerWidth,
  })`);
  console.log(prefix, 'metrics', JSON.stringify(metrics));

  // Hero at top
  await cdp.eval('window.scrollTo(0,0)');
  await sleep(900);
  await cdp.shot(`${prefix}-00-hero.png`);

  for (const [name, selector] of SECTIONS) {
    const info = await cdp.eval(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: r.height };
    })()`);
    if (!info) {
      console.log(prefix, 'MISSING', name, selector);
      continue;
    }
    await cdp.eval(`window.scrollTo(0, ${Math.max(0, info.top - 84)})`);
    await sleep(1100);
    await cdp.shot(`${prefix}-${String(SECTIONS.findIndex(([n]) => n === name) + 1).padStart(2, '0')}-${name}.png`);
    console.log(prefix, name, 'top', Math.round(info.top), 'h', Math.round(info.height));
  }

  // Footer
  await cdp.eval('window.scrollTo(0, document.documentElement.scrollHeight)');
  await sleep(1000);
  await cdp.shot(`${prefix}-99-footer.png`);

  // Geometry checks
  const geom = await cdp.eval(`(() => {
    const out = {};
    const badge = document.querySelector('.animate-cine-badge-right');
    const wa = document.querySelector('[data-testid="whatsapp-button"]');
    if (badge && wa) {
      const b = badge.getBoundingClientRect();
      const w = wa.getBoundingClientRect();
      out.badge = { left: Math.round(b.left), top: Math.round(b.top), right: Math.round(b.right), bottom: Math.round(b.bottom) };
      out.wa = { left: Math.round(w.left), top: Math.round(w.top), right: Math.round(w.right), bottom: Math.round(w.bottom) };
      out.overlap = !(b.right < w.left || b.left > w.right || b.bottom < w.top || b.top > w.bottom);
    }
    const offenders = [];
    for (const el of document.querySelectorAll('section, footer, header')) {
      const r = el.getBoundingClientRect();
      if (r.width > window.innerWidth + 2) offenders.push({ tag: el.tagName, id: el.id, w: Math.round(r.width) });
    }
    out.offenders = offenders;
    return out;
  })()`);
  console.log(prefix, 'geometry', JSON.stringify(geom));
  if (cdp.errors.length) console.log(prefix, 'console-errors', JSON.stringify(cdp.errors.slice(0, 10)));
  ws.close();
}

const browser = spawn(
  CHROME,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${PROFILE}`,
    '--window-size=1440,900',
    'about:blank',
  ],
  { stdio: 'ignore' }
);

try {
  if (process.argv[2] !== 'mob') await run({ width: 1440, height: 900, mobile: false }, 'desk');
  if (process.argv[2] !== 'desk') await run({ width: 390, height: 844, mobile: true }, 'mob');
} finally {
  browser.kill();
}
