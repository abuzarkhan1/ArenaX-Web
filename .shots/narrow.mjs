import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9444;
const OUT = path.resolve('.shots');
const PROFILE = path.resolve('.shots/chrome-profile-narrow');
const WIDTH = Number(process.argv[2] || 320);
const HEIGHT = Number(process.argv[3] || 800);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForTarget() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const targets = await res.json();
      const page = targets.find((t) => t.type === 'page');
      if (page) return page;
    } catch {}
    await sleep(250);
  }
  throw new Error('Chrome target did not appear');
}

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
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
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result?.value;
  }
  async shot(file) {
    const r = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT, file), Buffer.from(r.data, 'base64'));
  }
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
  const page = await waitForTarget();
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));
  const cdp = new CDP(ws);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await cdp.send('Page.navigate', { url: 'http://localhost:5173/' });
  await sleep(1500);
  for (let i = 0; i < 20; i++) {
    const len = await cdp.eval(`document.getElementById('root')?.innerHTML.length ?? -1`);
    if (len > 5000) break;
    await sleep(500);
  }
  await sleep(1500);

  const metrics = await cdp.eval(`({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    bodyScrollWidth: document.body.scrollWidth,
    innerWidth: window.innerWidth,
    dpr: window.devicePixelRatio,
  })`);
  console.log('metrics', JSON.stringify(metrics));

  const offenders = await cdp.eval(`(() => {
    const vw = document.documentElement.clientWidth;
    const out = [];
    const seen = new Set();
    const describe = (el) => {
      const cls = typeof el.className === 'string' ? el.className.split(/\\s+/).slice(0, 10).join('.') : '';
      return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (cls ? '.' + cls : '');
    };
    for (const el of document.querySelectorAll('#root *')) {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      const overRight = Math.round(r.right) - vw;
      const overLeft = Math.round(r.left);
      const tooWide = Math.round(r.width) - vw;
      if (overRight > 1 || overLeft < -1) {
        // Skip elements whose nearest scroll-clipping ancestor hides overflow
        let p = el.parentElement, clipped = false;
        while (p) {
          const cs = getComputedStyle(p);
          if (cs.overflowX !== 'visible' && (cs.overflowX === 'hidden' || cs.overflowX === 'clip')) { clipped = true; break; }
          p = p.parentElement;
        }
        const key = describe(el) + '|' + Math.round(r.left) + '|' + Math.round(r.width);
        if (!seen.has(key)) {
          seen.add(key);
          out.push({ el: describe(el), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), overRight, tooWide, clipped });
        }
      }
    }
    return out.slice(0, 40);
  })()`);
  console.log('offenders', JSON.stringify(offenders, null, 2));

  await cdp.eval('window.scrollTo(0,0)');
  await sleep(700);
  await cdp.shot(`narrow-${WIDTH}-hero.png`);

  const w = await cdp.eval(`document.getElementById('root')?.innerHTML.length ?? -1`);
  console.log('rootLen', w);
  ws.close();
} finally {
  browser.kill();
}
