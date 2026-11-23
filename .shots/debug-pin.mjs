import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9335;
const OUT = path.resolve('.shots');
const PROFILE = path.resolve('.shots/chrome-profile3');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForTarget() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const page = (await res.json()).find((t) => t.type === 'page');
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
  await sleep(1500);

  const info = await cdp.eval(`(() => {
    const el = document.getElementById('app-showcase');
    const parent = el.parentElement;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    return {
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      noPreference: matchMedia('(prefers-reduced-motion: no-preference)').matches,
      parentClass: parent.className,
      parentInline: parent.getAttribute('style'),
      sectionTop: Math.round(sectionTop),
      sectionHeight: Math.round(el.getBoundingClientRect().height),
      scrollY: Math.round(window.scrollY),
      pinSpacer: !!document.querySelector('.pin-spacer'),
      transform: getComputedStyle(el).transform,
      position: getComputedStyle(el).position,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    };
  })()`);
  console.log('initial', JSON.stringify(info, null, 2));

  // Scroll into pin range in small steps
  for (const delta of [100, 300, 500, 800]) {
    await cdp.eval(`window.scrollTo(0, ${info.sectionTop + delta})`);
    await sleep(600);
    const state = await cdp.eval(`(() => {
      const el = document.getElementById('app-showcase');
      const r = el.getBoundingClientRect();
      return {
        scrollY: Math.round(window.scrollY),
        rectTop: Math.round(r.top),
        rectHeight: Math.round(r.height),
        position: getComputedStyle(el).position,
        active: [...document.querySelectorAll('#app-showcase [data-active="true"]')].map((b) => b.textContent.trim()),
        pinSpacerH: Math.round(document.querySelector('.pin-spacer')?.getBoundingClientRect().height ?? 0),
      };
    })()`);
    console.log('delta', delta, JSON.stringify(state));
    await cdp.shot(`dbg-pin-${delta}.png`);
  }

  ws.close();
} finally {
  browser.kill();
}
