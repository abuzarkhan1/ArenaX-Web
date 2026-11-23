import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9334;
const OUT = path.resolve('.shots');
const PROFILE = path.resolve('.shots/chrome-profile2');
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
  throw new Error('no target');
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
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      }
      if (msg.method === 'Runtime.exceptionThrown') this.errors.push(msg.params.exceptionDetails.text);
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
  const target = await waitForTarget();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  const cdp = new CDP(ws);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await cdp.send('Page.navigate', { url: 'http://localhost:5173/' });
  for (let i = 0; i < 40; i++) {
    const len = await cdp.eval(`document.getElementById('root')?.innerHTML.length ?? 0`);
    if (len > 5000) break;
    await sleep(400);
  }
  await sleep(1200);

  // 1. Nav click -> anchor offset
  await cdp.eval(`(() => {
    const btn = [...document.querySelectorAll('nav button')].find((b) => b.textContent.trim() === 'Tournaments');
    btn?.click();
  })()`);
  await sleep(1600);
  const navResult = await cdp.eval(`(() => {
    const el = document.getElementById('tournaments');
    return el ? Math.round(el.getBoundingClientRect().top) : null;
  })()`);
  console.log('nav-click tournaments top (expect ~88):', navResult);
  await cdp.shot('int-01-nav-tournaments.png');

  // 2. Tournament tab switch
  await cdp.eval(`(() => {
    const btn = [...document.querySelectorAll('#tournaments button')].find((b) => b.textContent.includes('Clash Squad 4v4'));
    btn?.click();
  })()`);
  await sleep(700);
  console.log('clash heading:', await cdp.eval(`document.querySelector('#tournaments h3')?.textContent`));
  await cdp.shot('int-02-clashsquad.png');

  // 3. AI calculator interaction
  await cdp.eval(`window.scrollTo(0, document.getElementById('ai-vision').getBoundingClientRect().top + window.scrollY - 84)`);
  await sleep(900);
  await cdp.eval(`(() => {
    const btn = [...document.querySelectorAll('#ai-vision button')].find((b) => b.textContent.includes('Top 2'));
    btn?.click();
    const slider = document.querySelector('#ai-vision input[type="range"]');
    if (slider) {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(slider, '14');
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    }
  })()`);
  await sleep(600);
  console.log('calculator score:', await cdp.eval(`document.querySelector('#ai-vision .stat-figure')?.textContent`));
  await cdp.shot('int-03-calculator.png');

  // 4. Pinned app showcase mid-scroll
  const appTop = await cdp.eval(`document.getElementById('app-showcase').getBoundingClientRect().top + window.scrollY`);
  await cdp.eval(`window.scrollTo(0, ${Math.round(appTop)} + 450)`);
  await sleep(1200);
  console.log('pinned tab state:', await cdp.eval(`[...document.querySelectorAll('#app-showcase button[data-active="true"]')].map((b) => b.textContent.trim())`));
  await cdp.shot('int-04-pinned-mid.png');
  await cdp.eval(`window.scrollTo(0, ${Math.round(appTop)} + 1050)`);
  await sleep(1200);
  console.log('pinned tab state 2:', await cdp.eval(`[...document.querySelectorAll('#app-showcase button[data-active="true"]')].map((b) => b.textContent.trim())`));
  await cdp.shot('int-05-pinned-end.png');

  // 5. Mobile drawer
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await cdp.send('Page.navigate', { url: 'http://localhost:5173/' });
  for (let i = 0; i < 40; i++) {
    const len = await cdp.eval(`document.getElementById('root')?.innerHTML.length ?? 0`);
    if (len > 5000) break;
    await sleep(400);
  }
  await sleep(1200);
  await cdp.eval(`(() => {
    const btn = [...document.querySelectorAll('nav button')].find((b) => b.getAttribute('aria-label') === 'Open menu');
    btn?.click();
  })()`);
  await sleep(700);
  console.log('drawer:', await cdp.eval(`(() => {
    const nav = document.querySelector('nav');
    const links = [...nav.querySelectorAll('a, button')].map((b) => b.textContent.trim()).filter(Boolean);
    return links.slice(0, 16);
  })()`));
  await cdp.shot('int-06-mobile-drawer.png');

  // 6. Mobile tournament toggle
  await cdp.eval(`document.querySelector('nav button[aria-label="Close menu"], nav button[aria-label="Open menu"]')?.click()`);
  await sleep(500);
  await cdp.eval(`window.scrollTo(0, document.getElementById('tournaments').getBoundingClientRect().top + window.scrollY - 88)`);
  await sleep(900);
  await cdp.eval(`(() => {
    const btn = [...document.querySelectorAll('#tournaments button')].find((b) => b.textContent.includes('Clash Squad 4v4'));
    btn?.click();
  })()`);
  await sleep(700);
  await cdp.shot('int-07-mobile-clash.png');

  console.log('errors:', JSON.stringify(cdp.errors));
  ws.close();
} finally {
  browser.kill();
}
