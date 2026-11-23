// Capture a page in page-space viewport slices (scroll-independent, animation-free).
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = process.argv[2] || 'http://localhost:5199';
const PATH = process.argv[3] || '/';
const NAME = process.argv[4] || 'page';
const WIDTH = Number(process.argv[5] || 1440);
const HEIGHT = Number(process.argv[6] || 900);
const DPR = Number(process.argv[7] || 1);
const MOBILE = process.argv[8] === 'mobile';
const OUT = resolve(process.argv[9] || 'shots/pages');
const CDP = process.env.CDP_URL || 'http://127.0.0.1:9333';
const MAX_SLICES = Number(process.env.MAX_SLICES || 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
const send = (method, params = {}) =>
  new Promise((r, rej) => {
    const msgId = ++id;
    ws.send(JSON.stringify({ id: msgId, method, params }));
    pending.set(msgId, { res: r, rej });
  });
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value;

mkdirSync(OUT, { recursive: true });
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: HEIGHT, deviceScaleFactor: DPR, mobile: MOBILE });
await send('Page.navigate', { url: `${BASE}${PATH}` });
await sleep(2600);
await evaluate('document.fonts.ready.then(() => true)');

// Force all reveal-style scroll animations to their visible state.
await evaluate(`(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += window.innerHeight * 0.8) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 90));
  }
  window.scrollTo(0, 0);
  await new Promise(r => setTimeout(r, 400));
  return true;
})()`);

const doc = await evaluate(`({ h: document.documentElement.scrollHeight, w: document.documentElement.scrollWidth })`);
const slices = Math.min(Math.ceil(doc.h / HEIGHT), MAX_SLICES);
for (let i = 0; i < slices; i++) {
  const y = i * HEIGHT;
  const h = Math.min(HEIGHT, doc.h - y);
  const shot = await send('Page.captureScreenshot', {
    format: 'jpeg', quality: 85, captureBeyondViewport: true,
    clip: { x: 0, y, width: WIDTH, height: h, scale: 1 },
  });
  writeFileSync(`${OUT}/${NAME}-${i}.jpg`, Buffer.from(shot.data, 'base64'));
  console.log(`saved ${NAME}-${i} (y=${y})`);
}
ws.close();
process.exit(0);
