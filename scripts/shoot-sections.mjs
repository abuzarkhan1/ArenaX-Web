// Visual QA: per-section viewport captures (scroll-triggered reveals fire naturally).
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const BASE = process.argv[2] || 'http://localhost:5199';
const OUT = resolve(process.argv[3] || 'shots');
const LABEL = process.argv[4] || 'home';
const WIDTH = Number(process.argv[5] || 1440);
const HEIGHT = Number(process.argv[6] || 900);
const DPR = Number(process.argv[7] || 1);
const MOBILE = process.argv[8] === 'mobile';
const CDP = process.env.CDP_URL || 'http://127.0.0.1:9333';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const res = await fetch(`${CDP}/json/new?about:blank`, { method: 'PUT' });
const target = await res.json();

const ws = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
let id = 0;
await new Promise((ok, err) => { ws.onopen = ok; ws.onerror = err; });
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    const { res: r, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? rej(new Error(JSON.stringify(msg.error))) : r(msg.result);
  }
};
const send = (method, params = {}) =>
  new Promise((r, rej) => {
    const msgId = ++id;
    ws.send(JSON.stringify({ id: msgId, method, params }));
    pending.set(msgId, { res: r, rej });
  });

const evaluate = async (expression) => {
  const out = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  return out.result?.value;
};

mkdirSync(OUT, { recursive: true });
await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: WIDTH, height: HEIGHT, deviceScaleFactor: DPR, mobile: MOBILE,
});
await send('Emulation.setTouchEmulationEnabled', { enabled: MOBILE });
await send('Page.navigate', { url: `${BASE}/` });
await sleep(2500);
await evaluate('document.fonts.ready.then(() => true)');

const sections = await evaluate(`
  Array.from(document.querySelectorAll('section')).map((s, i) => ({
    i,
    id: s.id || '',
    label: s.getAttribute('aria-label') || s.querySelector('h2')?.textContent?.trim().slice(0, 60) || '',
    top: Math.round(s.getBoundingClientRect().top + window.scrollY),
    height: Math.round(s.getBoundingClientRect().height)
  }))
`);
console.log(JSON.stringify(sections));

for (const s of sections) {
  // Scroll so the section top sits just below the fixed nav.
  await evaluate(`window.scrollTo({ top: Math.max(0, ${s.top} - 8), behavior: 'instant' }); true`);
  await sleep(1100);
  const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
  const name = `${String(s.i).padStart(2, '0')}-${(s.id || s.label || 'section').toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30)}`;
  writeFileSync(`${OUT}/${LABEL}-${name}.jpg`, Buffer.from(shot.data, 'base64'));
  console.log(`saved ${name} (h=${s.height})`);
  // second capture mid-section for tall sections
  if (s.height > HEIGHT * 1.35) {
    await evaluate(`window.scrollTo({ top: ${s.top + Math.round(s.height * 0.55)}, behavior: 'instant' }); true`);
    await sleep(900);
    const shot2 = await send('Page.captureScreenshot', { format: 'jpeg', quality: 85 });
    writeFileSync(`${OUT}/${LABEL}-${name}-b.jpg`, Buffer.from(shot2.data, 'base64'));
  }
}

ws.close();
process.exit(0);
