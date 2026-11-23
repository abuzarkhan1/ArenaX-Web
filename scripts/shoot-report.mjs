// Capture clean viewport shots (fixed chrome visible) for the report assets.
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const CDP = process.env.CDP_URL || 'http://127.0.0.1:9333';
const OUT = resolve('report-assets');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(OUT, { recursive: true });

async function openPage(width, height, mobile, dpr = 1) {
  const target = await (await fetch(`${CDP}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  const pending = new Map();
  let id = 0;
  await new Promise((ok, err) => { ws.onopen = ok; ws.onerror = err; });
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
    }
  };
  const send = (method, params = {}) => new Promise((r, rej) => {
    const msgId = ++id;
    ws.send(JSON.stringify({ id: msgId, method, params }));
    pending.set(msgId, { res: r, rej });
  });
  const evaluate = async (expression) =>
    (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value;
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: dpr, mobile });
  await send('Page.navigate', { url: 'http://localhost:5199/' });
  await sleep(2800);
  await evaluate('document.fonts.ready.then(() => true)');
  await evaluate('window.scrollTo(0, 0); true');
  await sleep(200);
  return { send, evaluate, close: () => ws.close() };
}

async function shot(page, name) {
  const res = await page.send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(res.data, 'base64'));
  console.log('saved', name);
}

// Desktop hero
const d = await openPage(1440, 960, false);
await shot(d, 'after-hero-desktop');
await d.evaluate(`document.getElementById('wallet').scrollIntoView({ block: 'start', behavior: 'instant' }); true`);
await sleep(2200);
await shot(d, 'after-wallet-desktop');
await d.evaluate(`document.getElementById('ranks').scrollIntoView({ block: 'start', behavior: 'instant' }); true`);
await sleep(2200);
await shot(d, 'after-ranks-desktop');
await d.evaluate(`document.querySelector('footer').scrollIntoView({ block: 'end', behavior: 'instant' }); true`);
await sleep(2200);
await shot(d, 'after-footer-desktop');
d.close();

// Mobile hero + menu + wallet
const m = await openPage(390, 844, true, 2);
await shot(m, 'after-hero-mobile');
await m.evaluate(`document.getElementById('wallet').scrollIntoView({ block: 'start', behavior: 'instant' }); true`);
await sleep(2200);
await shot(m, 'after-wallet-mobile');
await m.evaluate('window.scrollTo(0, 0); true');
await sleep(300);
await m.evaluate(`document.querySelector('[aria-controls="mobile-navigation"]')?.click(); true`);
await sleep(700);
await shot(m, 'after-menu-mobile');
m.close();

process.exit(0);
