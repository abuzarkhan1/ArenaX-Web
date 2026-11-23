import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9666;
const OUT = path.resolve('.shots');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function target() {
  for (let i = 0; i < 80; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page;
    } catch {}
    await sleep(250);
  }
  throw new Error('no target');
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
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
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
  async shotClip(file, clip, scale = 2) {
    const r = await this.send('Page.captureScreenshot', { format: 'png', clip: { ...clip, scale } });
    fs.writeFileSync(path.join(OUT, file), Buffer.from(r.data, 'base64'));
  }
}

const browser = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.resolve('.shots/chrome-profile-panel')}`, '--window-size=900,900', 'about:blank'], { stdio: 'ignore' });

try {
  const page = await target();
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  const cdp = new CDP(ws);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await cdp.send('Page.navigate', { url: 'http://localhost:5173/' });
  for (let i = 0; i < 80; i++) {
    if (await cdp.eval(`Boolean(document.querySelector('header nav[aria-label="Primary"]'))`)) break;
    await sleep(500);
  }
  await sleep(1200);
  await cdp.eval(`[...document.querySelectorAll('button')].find((b) => b.getAttribute('aria-label') === 'Open menu')?.click()`);
  await sleep(1000);
  const panel = await cdp.eval(`(() => {
    const toggle = [...document.querySelectorAll('button')].find((b) => b.getAttribute('aria-controls'));
    const p = document.getElementById(toggle.getAttribute('aria-controls'));
    const cs = getComputedStyle(p);
    const r = p.getBoundingClientRect();
    return { bg: cs.backgroundColor, opacity: cs.opacity, filter: cs.backdropFilter, top: r.top, bottom: r.bottom, height: r.height };
  })()`);
  console.log('panel style', JSON.stringify(panel));
  await cdp.shotClip('nav-mob-panel-2x.png', { x: 16, y: 70, width: 358, height: 600 }, 2);
  ws.close();
} finally {
  browser.kill();
}
