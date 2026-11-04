# Request Header Parser Microservice

A freeCodeCamp **legacy back end certification project** — written from scratch against the project's published requirements and proven by its own local test suite.

## What it does

Legacy Back-End variant of the Request Header Parser (identical spec).

_shared with back-end-v8 (identical spec)._

## Endpoints
- `GET /api/whoami`

## How to run

```bash
npm install
npm start            # or: PORT=3456 npm start
```

The server listens on port 3007 by default (override with the PORT environment variable).

## How to test

```bash
node test_local.js
```

Boots the app on a throwaway port, exercises every required endpoint with the spec-critical assertions, and prints `PASS — N local assertions`. A captured green run is in `local-test.log`.

## Notes

See back-end-v8/request-header-parser-microservice.

## Tech stack

Node.js + Express (a single runtime dependency); plain `assert` for the test suite. No browser, no external services, no public deployment — proven entirely locally.

## License

MIT — see [LICENSE](LICENSE). © FiredMosquito831

## Verification

Built and proven locally: the server is booted on a throwaway port and every endpoint above is
hit with real HTTP requests; **3/3 local assertions passing**
(`node test_local.js`, exit 0). Captured output in [`local-test.log`](local-test.log).

``
  - `GET /api/whoami`
``

> This service is a per-curriculum copy; the shared logic is mirrored with **back-end-v8** (see each README).

## Source

Written from scratch against the project's published freeCodeCamp specification. No freeCodeCamp
starter or reference-solution code was used.
