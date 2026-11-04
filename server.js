// Request Header Parser Microservice — freeCodeCamp Back End Development & APIs v8
// certification project.
//   GET /api/whoami -> { ipaddress, language, software }
//     ipaddress  : client IP (honours X-Forwarded-For, else socket address)
//     language   : the first entry of the Accept-Language header
//     software   : the User-Agent (browser "software" token when present, else the whole agent)
'use strict';

const express = require('express');

const app = express();

function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return String(forwarded).split(',')[0].trim();
  if (req.socket && req.socket.remoteAddress) return req.socket.remoteAddress;
  return '';
}

function language(req) {
  const accept = req.headers['accept-language'];
  if (!accept) return '';
  // Take the first language tag: "en-US,en;q=0.9" -> "en-US"
  return String(accept).split(',')[0].trim();
}

function software(req) {
  const agent = String(req.headers['user-agent'] || '');
  if (!agent) return '';
  // Browsers expose the product like "Chrome/120.0" or "Safari/605.1.15".
  const m = agent.match(/(Chrome|Chromium|Firefox|Safari|Edg|Opera|MSIE|Trident)\/[\d.]+/i);
  if (m) return m[1];
  return agent;
}

app.get('/api/whoami', (req, res) => {
  res.json({ ipaddress: clientIp(req), language: language(req), software: software(req) });
});

app.get('/', (req, res) =>
  res.send(
    '<!doctype html><meta charset="utf-8"><title>Request Header Parser</title>' +
    '<p>Request Header Parser Microservice — GET /api/whoami</p>'
  )
);

const PORT = process.env.PORT || 3007;
if (require.main === module) {
  app.listen(PORT, () => console.log(`request-header-parser listening on :${PORT}`));
}

module.exports = app;
