import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9555;
const OUT = path.resolve('.shots');
const PROFILE = path.resolve('.shots/chrome-profile-nav');
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
    this.errors = [];
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
      if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') this.errors.push(msg.params.entry.text);
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
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result?.value;
  }
  async shot(file) {
    const r = await this.send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUT, file), Buffer.from(r.data, 'base64'));
  }
}

async function gotoHome(cdp, w, h) {
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 768 });
  await cdp.send('Page.navigate', { url: 'http://localhost:5173/' });
  await sleep(1200);
  let mounted = false;
  for (let i = 0; i < 80; i++) {
    mounted = await cdp.eval(`Boolean(document.querySelector('header nav[aria-label="Primary"]'))`);
    if (mounted) break;
    await sleep(500);
  }
  console.log(`ready @${w}x${h}:`, mounted);
  await sleep(1200);
}

const barInfo = (cdp) => cdp.eval(`(() => {
  const nav = document.querySelector('header nav[aria-label="Primary"]');
  if (!nav) return null;
  const bar = nav.parentElement;
  const cs = getComputedStyle(bar);
  const r = bar.getBoundingClientRect();
  const navR = nav.getBoundingClientRect();
  const actions = nav.nextElementSibling?.getBoundingClientRect();
  return {
    bar: { top: Math.round(r.top), height: Math.round(r.height), width: Math.round(r.width) },
    maxWidth: cs.maxWidth, radius: cs.borderRadius,
    background: cs.backgroundColor, backdrop: cs.backdropFilter, transform: cs.transform,
    navVisible: navR.width > 0,
    navFits: actions ? navR.right <= actions.left + 1 : null,
    active: [...nav.querySelectorAll('button[aria-current="page"]')].map((b) => b.textContent.trim()),
  };
})()`);

const toggleInfo = (cdp) => cdp.eval(`(() => {
  const open = [...document.querySelectorAll('button')].find((b) => b.getAttribute('aria-label') === 'Open menu' || b.getAttribute('aria-label') === 'Close menu');
  if (!open) return null;
  const r = open.getBoundingClientRect();
  return { label: open.getAttribute('aria-label'), width: Math.round(r.width), height: Math.round(r.height), visible: r.width > 0 };
})()`);

const panelInfo = (cdp) => cdp.eval(`(() => {
  const toggle = [...document.querySelectorAll('button')].find((b) => b.getAttribute('aria-controls'));
  const id = toggle?.getAttribute('aria-controls');
  const panel = id ? document.getElementById(id) : null;
  if (!panel) return { exists: false, overflow: document.body.style.overflow };
  const r = panel.getBoundingClientRect();
  return {
    exists: true, top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height),
    overflow: document.body.style.overflow,
    links: [...panel.querySelectorAll('nav button')].map((b) => b.textContent.trim()),
    routes: [...panel.querySelectorAll('a')].map((a) => a.getAttribute('href')),
    downloadCta: [...panel.querySelectorAll('button')].some((b) => b.textContent.includes('Download App')),
  };
})()`);

const openMenu = (cdp) => cdp.eval(`(() => {
  const b = [...document.querySelectorAll('button')].find((x) => x.getAttribute('aria-label') === 'Open menu');
  if (b) b.click();
  return Boolean(b);
})()`);

const browser = spawn(
  CHROME,
  ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', `--remote-debugging-port=${PORT}`, `--user-data-dir=${PROFILE}`, '--window-size=1440,900', 'about:blank'],
  { stdio: 'ignore' }
);

try {
  const page = await waitForTarget();
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));
  const cdp = new CDP(ws);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Log.enable');

  // ---------- Desktop 1440 ----------
  await gotoHome(cdp, 1440, 900);
  console.log('desk overflow', JSON.stringify(await cdp.eval(`({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })`)));
  await cdp.shot('nav-desk-top.png');
  console.log('desk top bar', JSON.stringify(await barInfo(cdp)));
  await cdp.eval('window.scrollTo(0, 240)');
  await sleep(1000);
  console.log('desk condensed bar', JSON.stringify(await barInfo(cdp)));
  await cdp.shot('nav-desk-condensed.png');
  // click Tournaments, wait for smooth scroll, check anchor offset + active state
  await cdp.eval(`[...document.querySelectorAll('header nav[aria-label="Primary"] button')].find((b) => b.textContent.trim() === 'Tournaments')?.click()`);
  await sleep(2000);
  console.log('desk anchor', JSON.stringify(await cdp.eval(`({ top: Math.round(document.getElementById('tournaments').getBoundingClientRect().top), active: [...document.querySelectorAll('header nav[aria-label="Primary"] button[aria-current="page"]')].map((b) => b.textContent.trim()), progress: document.querySelector('header .rounded-full .bg-gradient-to-r')?.style.width })`)));
  await cdp.eval('window.scrollTo(0, 0)');
  await sleep(1000);
  console.log('desk expanded again', JSON.stringify(await barInfo(cdp)));

  // ---------- 1024 ----------
  await gotoHome(cdp, 1024, 800);
  console.log('1024 toggle', JSON.stringify(await toggleInfo(cdp)));
  console.log('1024 bar top', JSON.stringify(await barInfo(cdp)));
  await cdp.eval('window.scrollTo(0, 300)');
  await sleep(1000);
  console.log('1024 bar condensed', JSON.stringify(await barInfo(cdp)));
  await cdp.shot('nav-1024-condensed.png');

  // ---------- 768 ----------
  await gotoHome(cdp, 768, 900);
  console.log('768 toggle', JSON.stringify(await toggleInfo(cdp)));
  console.log('768 bar', JSON.stringify(await barInfo(cdp)));
  console.log('768 overflow', JSON.stringify(await cdp.eval(`({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })`)));
  await cdp.shot('nav-768-top.png');

  // ---------- Mobile 390 ----------
  await gotoHome(cdp, 390, 844);
  console.log('mob overflow', JSON.stringify(await cdp.eval(`({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })`)));
  console.log('mob toggle', JSON.stringify(await toggleInfo(cdp)));
  await cdp.shot('nav-mob-top.png');
  console.log('mob open', await openMenu(cdp));
  await sleep(900);
  console.log('mob panel', JSON.stringify(await panelInfo(cdp)));
  await cdp.shot('nav-mob-open.png');
  // Outside press closes
  await cdp.eval(`document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))`);
  await sleep(700);
  console.log('mob after outside press', JSON.stringify(await panelInfo(cdp)));
  // Re-open and tap a nav link
  await openMenu(cdp);
  await sleep(800);
  await cdp.eval(`(() => { const p = document.getElementById([...document.querySelectorAll('button')].find((b) => b.getAttribute('aria-controls'))?.getAttribute('aria-controls')); [...p.querySelectorAll('nav button')].find((b) => b.textContent.includes('Tournaments'))?.click(); })()`);
  await sleep(2000);
  console.log('mob after nav tap', JSON.stringify(await cdp.eval(`({ overflow: document.body.style.overflow, scrollY: Math.round(window.scrollY), top: Math.round(document.getElementById('tournaments').getBoundingClientRect().top), panel: Boolean(document.querySelector('[aria-controls]') && document.getElementById(document.querySelector('[aria-controls]').getAttribute('aria-controls'))) })`)));
  // Re-open and follow About route
  await openMenu(cdp);
  await sleep(800);
  await cdp.eval(`(() => { const p = document.getElementById([...document.querySelectorAll('button')].find((b) => b.getAttribute('aria-controls'))?.getAttribute('aria-controls')); [...p.querySelectorAll('a')].find((a) => a.getAttribute('href') === '/about')?.click(); })()`);
  await sleep(1000);
  console.log('mob about route', JSON.stringify(await cdp.eval(`({ path: location.pathname, overflow: document.body.style.overflow })`)));

  // ---------- 320 ----------
  await gotoHome(cdp, 320, 720);
  console.log('320 overflow', JSON.stringify(await cdp.eval(`({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })`)));
  console.log('320 toggle', JSON.stringify(await toggleInfo(cdp)));
  await cdp.shot('nav-320-top.png');

  if (cdp.errors.length) console.log('console-errors', JSON.stringify(cdp.errors.slice(0, 10)));
  else console.log('console-errors none');
  ws.close();
} finally {
  browser.kill();
}
