// Local proof for the Request Header Parser Microservice.
'use strict';

const assert = require('node:assert');
const app = require('./server.js');

let passed = 0;
let srv = null;
const ok = (msg) => {
  passed += 1;
  console.log(`  ok ${passed} ${msg}`);
};

(async () => {
  srv = await new Promise((resolve) => resolve(app.listen(0, '127.0.0.1')));
  const base = `http://127.0.0.1:${srv.address().port}`;

  const r1 = await (await fetch(`${base}/api/whoami`, {
    headers: { 'Accept-Language': 'en-US,en;q=0.9', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0) Chrome/120.0.0.0 Safari/537.36' }
  })).json();
  assert.ok(r1.ipaddress && r1.ipaddress.length > 0, `ipaddress ${JSON.stringify(r1.ipaddress)}`);
  assert.strictEqual(r1.language, 'en-US');
  assert.strictEqual(r1.software, 'Chrome');
  ok('ipaddress / language / software parsed from real headers');

  const r2 = await (await fetch(`${base}/api/whoami`, {
    headers: { 'X-Forwarded-For': '8.8.8.8, 1.1.1.1', 'User-Agent': 'node/24.6.0' }
  })).json();
  assert.strictEqual(r2.ipaddress, '8.8.8.8');
  assert.ok(r2.software.length > 0, 'falls back to the whole user agent');
  ok('X-Forwarded-For honoured, UA fallback works');

  const r3 = await (await fetch(`${base}/api/whoami`)).json();
  assert.ok(typeof r3.ipaddress === 'string' && r3.ipaddress.length > 0);
  assert.ok(typeof r3.software === 'string');
  ok('plain fetch still returns the three keys');

  srv.closeAllConnections();
  srv.close(() => {
    console.log(`\nPASS — ${passed} local assertions`);
  });
})().catch((err) => {
  console.error('FAIL', err);
  if (srv) { srv.closeAllConnections(); srv.close(); }
  process.exitCode = 1;
});
