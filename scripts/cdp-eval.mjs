// Evaluate an arbitrary expression in a page at a given viewport.
// Usage: node scripts/cdp-eval.mjs 1440 900 "expression"
import { writeFileSync, mkdirSync } from 'node:fs';

const WIDTH = Number(process.argv[2] || 1440);
const HEIGHT = Number(process.argv[3] || 900);
const EXPR = process.argv[4] || 'document.title';
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
const send = (method, params = {}) => new Promise((r, rej) => {
  const msgId = ++id;
  ws.send(JSON.stringify({ id: msgId, method, params }));
  pending.set(msgId, { res: r, rej });
});
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value;

await send('Page.enable');
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: WIDTH < 834 });
await send('Page.navigate', { url: 'http://localhost:5199/' });
await sleep(2400);
await evaluate('document.fonts.ready.then(() => true)');
const out = await evaluate(EXPR);
console.log(JSON.stringify(out, null, 2));
ws.close();
process.exit(0);
