// Layout audit: horizontal overflow + section heights + type scale at a viewport.
import { writeFileSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:5199';
const WIDTH = Number(process.argv[2] || 390);
const HEIGHT = Number(process.argv[3] || 844);
const CDP = process.env.CDP_URL || 'http://127.0.0.1:9333';
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

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: WIDTH < 834 });
await send('Page.navigate', { url: `${BASE}/` });
await sleep(2500);
await evaluate('document.fonts.ready.then(() => true)');

const report = await evaluate(`(() => {
  const vw = window.innerWidth;
  const sections = Array.from(document.querySelectorAll('section')).map((s, i) => {
    const h2 = s.querySelector('h2');
    const r = s.getBoundingClientRect();
    return {
      i,
      id: s.id || '(hero)',
      top: Math.round(r.top + window.scrollY),
      height: Math.round(r.height),
      heading: h2 ? h2.textContent.trim().replace(/\\s+/g, ' ') : '',
      headingSize: h2 ? getComputedStyle(h2).fontSize : '',
      headingTransform: h2 ? getComputedStyle(h2).textTransform : ''
    };
  });
  const overflowing = [];
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const right = r.left + r.width;
    if (right > vw + 1.5 || r.left < -1.5) {
      const style = getComputedStyle(el);
      if (style.position === 'fixed' || style.position === 'absolute') return;
      if (el.closest('[class*="overflow-x-auto"]') || el.closest('[class*="overflow-hidden"]')) return;
      overflowing.push({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 110),
        left: Math.round(r.left),
        right: Math.round(right),
        width: Math.round(r.width)
      });
    }
  });
  const smallTargets = Array.from(document.querySelectorAll('button, a')).filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.height < 32;
  }).slice(0, 12).map((el) => ({ tag: el.tagName, text: el.textContent.trim().slice(0, 30), h: Math.round(el.getBoundingClientRect().height) }));
  return { vw, docW: document.documentElement.scrollWidth, docH: document.documentElement.scrollHeight, sections, overflowing: overflowing.slice(0, 20), overflowCount: overflowing.length, smallTargets };
})()`);

writeFileSync(`shots/audit-${WIDTH}.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
ws.close();
process.exit(0);
