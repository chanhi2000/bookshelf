---
lang: en-US
title: "How to Build Secure-by-Default Node.js APIs"
description: "Article(s) > How to Build Secure-by-Default Node.js APIs"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Secure-by-Default Node.js APIs"
    - property: og:description
      content: "How to Build Secure-by-Default Node.js APIs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-secure-by-default-node-js-apis.html
prev: /programming/js-node/articles/README.md
date: 2026-06-25
isOriginal: false
author:
  - name: Devlin Duldulao
    url: https://freecodecamp.org/news/author/devlinduldulao/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/edebad91-82e3-4d67-b136-bbb99859a393.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Secure-by-Default Node.js APIs"
  desc="Most security problems I've shipped in my career weren't exotic. They weren't nation-state attacks or clever zero-days. They were boring. A missing limit here, a forgotten timeout there, a string comp"
  url="https://freecodecamp.org/news/how-to-build-secure-by-default-node-js-apis"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/edebad91-82e3-4d67-b136-bbb99859a393.png"/>

Most security problems I've shipped in my career weren't exotic. They weren't nation-state attacks or clever zero-days. They were boring. A missing limit here, a forgotten timeout there, a string comparison that leaked a secret one millisecond at a time.

The boring stuff is what gets you, because the boring stuff is what everyone agrees to fix "later," and later has a way of never arriving.

My favorite personal example (favorite in the way a scar is your favorite) was an internal API that compared an access token with a plain equality check and had no limit on request size. It ran fine for a year. It ran fine right up until someone curious discovered they could both fingerprint the token comparison and post a body large enough to make the server sweat.

Neither bug was sophisticated. Both would have been a complete non-event if something had simply refused to let me do the wrong thing in the first place.

This tutorial shows you how to add practical guardrails around every HTTP API you build, regardless of framework. You'll write them by hand, in plain Node.js, with no dependencies. This will let you see exactly what each one does and why.

By the end, you'll have a small server that survives a lot more contact with the public internet than the version most of us shipped early in our careers.

This tutorial uses plain JavaScript so anyone can copy and run it. If you use TypeScript, you can add types afterward. You need Node 22 or newer, a basic understanding of HTTP requests and responses, and a terminal for testing the examples.

::: note Prerequisites

- Node.js 22 or newer
- Basic familiarity with HTTP requests and responses
- A terminal and curl, Postman, or a similar client

This isn't a guide to making your API unhackable. It's a practical guide to avoiding the easy attacks and building safer defaults.

:::

::: info What You'll Build

A plain Node.js API with request size limits, request timeouts, safe JSON parsing, security headers, timing-safe secret comparison, validation, and error handling.

:::

---

## How to Start with the Naïve Server

Here's the kind of server I wrote when I was younger and braver and wrong. It reads a JSON body and echoes it back. Pretend it's the start of a real API.

```ts
import http from "node:http";

const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    const data = JSON.parse(body || "{}");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ youSent: data }));
  });
});

server.listen(3000, () => console.log("listening on http://localhost:3000"));
```

It works. You can curl it and it answers. It's also a small disaster, and here's the incomplete list of why:

- It reads an unbounded body into memory. Send it a few gigabytes and you have a denial-of-service with no effort.
- `JSON.parse` throws on bad input, which here means an uncaught exception that can take the process down.
- There's no timeout. A client that sends one byte per minute can hold a connection hostage.
- It sets no security headers and happily advertises that it's a Node server.
- It parses untrusted JSON straight into an object with no checks, which opens the door to prototype pollution downstream.

You're going to fix each of these issues. The fixes are small. The point is to make them habits, not heroics.

---

## How to Limit the Request Body

The first rule of accepting input from strangers is to decide, in advance, how much input you're willing to accept. If you don't set a limit, the limit is "however much RAM the server has," and someone will find that out for you.

There are two layers here. The first is the `Content-Length` header, which the client sends to declare how big the body is. You can reject early based on it. But you must never trust it alone, because a client can lie or simply not send it.

The real defense is to count bytes as they stream in and stop the moment they cross your line.

```js
const MAX_BODY_BYTES = 100 * 1024; // 100 KB is plenty for most JSON APIs

function readBody(req, limit = MAX_BODY_BYTES) {
  return new Promise((resolve, reject) => {
    // Cheap early rejection if the client is honest about being too big.
    const declared = Number(req.headers["content-length"]);
    if (Number.isFinite(declared) && declared > limit) {
      reject(httpError(413, "Payload too large"));
      return;
    }

    let size = 0;
    const chunks = [];

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(httpError(413, "Payload too large"));
        req.destroy(); // stop reading; we are done with this client
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function httpError(statusCode, message) {
  return Object.assign(new Error(message), { statusCode });
}
```

A few things worth noticing here. You accumulate `Buffer` chunks and only join them at the end, rather than concatenating strings, because string concatenation forces an early decode and can mangle multibyte UTF-8 characters that happen to land on a chunk boundary.

You also call `req.destroy()` as soon as you cross the limit, so you don't keep pulling bytes you've already decided to refuse.

Pick a limit that matches the route. A JSON API that creates a user doesn't need a 50 MB body. A file upload endpoint is a different conversation, and there you would stream to disk or object storage instead of buffering in memory at all. The mistake is having no limit, not having the wrong one.

---

## How to Time Out Slow Requests

Once you have a body limit, the next trick an attacker reaches for is to be slow instead of large. This is the family of attacks named after slowloris, a sad-looking primate that moves very slowly, which is rude to the animal but accurate about the attack.

The idea is to open many connections and feed them bytes at a glacial pace, never finishing, so the server keeps each one alive waiting politely. Do that enough times and you've exhausted the connection pool without sending anything that looks malicious.

Node has built-in defenses for this, and the defaults are generous and worth tightening for an API.

```ts
const server = http.createServer(handler);

// Total time allowed to receive the entire request (headers + body).
server.requestTimeout = 30_000; // 30 seconds

// Time allowed to receive just the headers. Slowloris lives here.
server.headersTimeout = 10_000; // 10 seconds

// Idle socket timeout: kill connections that go quiet.
server.setTimeout(60_000);
```

Those three lines handle the network layer. But there's a second kind of slow: your own handler. A database query that hangs, an outbound call to a third party that never answers, a regular expression that decided to think about its life choices. You want a ceiling on how long a single request is allowed to occupy a worker, and you want to be able to cancel the work when that ceiling is hit.

The modern tool for cancellation in Node is `AbortController`. Here's a small wrapper that gives every handler a deadline and a signal it can pass down to anything that supports cancellation, like `fetch`.

```ts
function withTimeout(handler, ms = 15_000) {
  return async (req, res) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    try {
      await handler(req, res, controller.signal);
    } finally {
      clearTimeout(timer);
    }
  };
}
```

Now a handler can do `await fetch(url, { signal })` and the request gets cut off if it blows the deadline, instead of camping on a worker forever.

The discipline to learn here is that any time you talk to something outside your process, you give it a deadline. Networks fail in the most boring way possible: by hanging, not by erroring. A timeout turns a hang into a clean error you can handle.

---

## How to Parse JSON Safely and Block Prototype Pollution

This is the one people skip because it sounds theoretical, and then it shows up in a CVE with their stack in it.

First, the easy half. `JSON.parse` throws a `SyntaxError` on malformed input. In the naïve server, that throw was uncaught and could crash the process. So we wrap parsing and turn a parse failure into a clean 400.

```js
function parseJson(buffer) {
  if (buffer.length === 0) return {};
  let text = buffer.toString("utf8");
  try {
    return JSON.parse(text, reviver);
  } catch {
    throw httpError(400, "Invalid JSON body");
  }
}
```

Now the interesting half: that `reviver` argument. Prototype pollution is an attack where a request payload reaches up and modifies `Object.prototype`, the object that almost every object in your program inherits from. If an attacker can set a property there, they can set it on effectively everything at once.

It's easier to believe once you see it. Here's a recursive merge function, the kind people write all the time to apply updates onto an existing record:

```js
function merge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === "object") {
      if (!target[key]) target[key] = {};
      merge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}
```

Looks harmless. Now feed it a payload an attacker controls:

```js
const evil = JSON.parse('{"__proto__": {"isAdmin": true}}');
const account = {};
merge(account, evil);

console.log(account.isAdmin);   // undefined, account itself is fine
console.log(({}).isAdmin);      // true  <-- every object is now "admin"
```

That second line is the horror. You never touched `({})`. You polluted the shared prototype, so a brand new empty object now reports `isAdmin: true`. If somewhere later your code does `if (user.isAdmin)` on an object that didn't explicitly set that field, congratulations! Everyone is an admin. The `__proto__` key tricked the merge into walking up into the prototype that all objects share.

The defense is to refuse the dangerous keys before they ever get into your data. The cleanest way at parse time is the reviver, a function `JSON.parse` calls for every key as it builds the result. Return `undefined` for a key and it gets dropped.

```js
const FORBIDDEN_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function reviver(key, value) {
  if (FORBIDDEN_KEYS.has(key)) return undefined;
  return value;
}
```

That is it. Three key names, blocked at the door, and the merge above becomes harmless because the payload never carries `__proto__` past the parser.

For extra defense in depth, you can also build internal lookup objects with `Object.create(null)`, which creates an object with no prototype at all, or use a `Map` when the keys are user-controlled. And if you want a belt to go with the suspenders, `Object.freeze(Object.prototype)` early in your process start will make the whole class of attack fail loudly.

I wouldn't rely on freezing alone, because some libraries get unhappy about it, but blocking the keys costs you nothing and should be the default.

---

## How to Set Security Headers on Every Response

Browsers will defend your users for you, but only if you tell them to. That instruction comes as a small set of response headers. For an API that returns JSON, the list is short and the defaults are strict, which is exactly how you want it.

```js
function secureHeaders(res) {
  // Do not let the browser guess content types. Stops a JSON response
  // from being treated as HTML or a script.
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Clickjacking defense: do not allow this response inside a frame.
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");

  // Do not leak the full URL (which may contain ids or tokens) on navigation.
  res.setHeader("Referrer-Policy", "no-referrer");

  // Only meaningful over HTTPS: force HTTPS for two years, including subdomains.
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");

  // Stop advertising what you are running. Free reconnaissance for nobody.
  res.removeHeader("X-Powered-By");
}
```

A quick tour, because cargo-culting headers is how you end up with a Content Security Policy that does nothing.

`X-Content-Type-Options: nosniff` stops the browser from second-guessing your `Content-Type`, which closes a sneaky path where a response gets reinterpreted as something executable. `X-Frame-Options` and the `frame-ancestors` directive both refuse to let your responses be embedded in a frame, which is the heart of clickjacking. For a pure JSON API, `default-src 'none'` is a strong and appropriate CSP, because an API has no business loading scripts, styles, or images.

`Referrer-Policy: no-referrer` keeps your URLs, which sometimes carry ids you would rather not gossip about, from being sent to other sites. `Strict-Transport-Security` only matters once you're on HTTPS, but once you are, it stops downgrade attacks by telling the browser to refuse plain HTTP.

And removing `X-Powered-By` is a tiny thing that just denies an attacker a free hint about what to throw at you.

The reason to wrap this in a function and call it on every response is that "every response" is the part humans forget. Make it one call you do at the top of the request, before you can get distracted.

---

## How to Compare Secrets in Constant Time

Here's a bug that looks completely fine and is completely broken:

```ts
if (providedApiKey === expectedApiKey) {
  // grant access
}
```

The problem is that `===` on strings is allowed to be fast. It compares character by character and returns `false` the instant it finds a mismatch. That means a wrong guess that gets the first character right takes very slightly longer to reject than one that gets it wrong immediately.

That timing difference is tiny, but it's measurable over enough requests, and it lets an attacker recover a secret one character at a time. This is a real attack, it has a name (a timing attack), and the fix is built into Node.

You want a comparison whose running time doesn't depend on where the first difference is. Node gives you `crypto.timingSafeEqual` for exactly this. It has one sharp edge: it throws if the two buffers have different lengths, and length itself is a leak.

The clean way to handle both problems at once is to hash both inputs to a fixed size first, then compare the hashes.

```js
import { timingSafeEqual, createHash } from "node:crypto";

function safeCompare(a, b) {
  // Hashing normalizes length (so timingSafeEqual is happy) and hides
  // the length of the real secret from a timing observer.
  const ha = createHash("sha256").update(String(a)).digest();
  const hb = createHash("sha256").update(String(b)).digest();
  return timingSafeEqual(ha, hb);
}
```

Use this anywhere you compare a value a stranger supplied against a secret you hold: API keys, webhook signatures, password reset tokens, session identifiers. The rule of thumb is simple: if being wrong about the comparison would let someone in, don't use `===`.

One important caveat so you don't misuse this. For user passwords, don't store them and compare with this function. Passwords get hashed with a slow, purpose-built algorithm so that even if your database leaks, the hashes are expensive to crack.

Node ships `scrypt` for this in `node:crypto`, and `bcrypt` and `argon2` are popular libraries. The `safeCompare` above is for comparing high-entropy secrets like tokens and keys, not for human-chosen passwords.

---

## How to Validate Input as a Gate, Not a Suggestion

Everything so far has been about surviving hostile input at the transport level. Validation is about refusing input that doesn't match the shape your code expects, before that input reaches your business logic.

A surprising amount of "weird production behavior" is just a handler that assumed a field was a string and got an array, or assumed a number and got the string "NaN".

You can hand-roll validation for a small API, and it's healthy to see what that looks like before you reach for a library:

```js
function expect(condition, message) {
  if (!condition) throw httpError(400, message);
}

function parseCreateUser(data) {
  expect(typeof data.email === "string" && data.email.includes("@"), "email is required");
  expect(typeof data.password === "string", "password is required");
  expect(data.password.length >= 12, "password must be at least 12 characters");
  // Return only the fields you actually want. Ignore everything else.
  return { email: data.email, password: data.password };
}
```

Notice the last line. You build a fresh object with only the fields you asked for, rather than passing `data` straight through. This quietly closes a mass-assignment hole, where a client sends `{"email": "...", "password": "...", "role": "admin"}` and a careless handler writes the whole object into the database, role included. If you only copy the fields you meant to accept, the extra ones never matter.

For anything beyond a few routes, a schema library pays for itself fast. Zod and Valibot are the popular choices, and both let you describe the shape once and get validation plus inferred types out of it.

```js
import { z } from "zod";

const CreateUser = z
  .object({
    email: z.string().email(),
    password: z.string().min(12),
  })
  .strict(); // reject unknown keys instead of ignoring them

const result = CreateUser.safeParse(data);
if (!result.success) throw httpError(400, "Validation failed");
const user = result.data;
```

That `.strict()` call is doing the same mass-assignment defense as our hand-rolled version, but declaratively. Whether you hand-roll it or use a library, the principle is the same: input is guilty until proven to match a shape you defined on purpose.

---

## How to Fail Without Leaking and Log So You Can See It

Errors are going to happen. The real question is what your server says when they do, and whether you can reconstruct what went wrong afterward.

There are two common ways to get this wrong, and they are opposites. Either you hand attackers a map of your internals, or you blind yourself during an incident.

The leaking version looks like this, and yes, I've shipped it:

```js
catch (err) {
  res.writeHead(500);
  res.end(err.stack); // please do not
}
```

That stack trace can include file paths, library versions, query fragments, and sometimes secrets that got interpolated into an error message. It's a free briefing for whoever is poking at you.

The rule is blunt: a 500 should tell the client nothing useful, and tell you everything, through your logs.

The opposite failure is hiding the error so thoroughly that when it happens in production at 2am you have nothing to go on.

The fix for both problems is the same small idea: a request id. It's a short unique value you attach to each request, return to the client in a header, and include in every log line for that request. When a user reports "I got an error and it said request abc123," you can find exactly that request in your logs in seconds.

```js
import { randomUUID } from "node:crypto";

function withRequestId(req, res) {
  const requestId = req.headers["x-request-id"] ?? randomUUID();
  res.setHeader("X-Request-Id", requestId);
  return requestId;
}

function log(level, requestId, message, extra = {}) {
  // Structured logs: one JSON object per line, easy to search and ship.
  console.log(
    JSON.stringify({ level, requestId, message, ...extra, at: new Date().toISOString() }),
  );
}

function sendError(res, err, requestId) {
  const status = err.statusCode ?? 500;
  const message = status === 500 ? "Internal Server Error" : err.message;
  if (status === 500) {
    log("error", requestId, "unhandled error", { stack: err.stack });
  }
  if (!res.headersSent) {
    res.writeHead(status, { "Content-Type": "application/json" });
  }
  res.end(JSON.stringify({ error: message, requestId }));
}
```

The client gets the `requestId` but never the details. They can quote it to support, but they can't read your stack trace. Accept an incoming `X-Request-Id` when a trusted upstream set one, so a single request keeps the same id as it moves across your services, but generate your own whenever it is missing. Structured logs, one JSON object per line, are worth the slight ugliness, because they're trivial to filter and feed into a log aggregator, which a pile of freeform `console.log` calls is not.

One note on environments. It's fine, even helpful, to return richer error detail when you run locally. Just gate it on an explicit environment check and make production the strict default, so the worst outcome of a misconfiguration is too little information leaked, never too much.

---

## How to Put It All Together

None of these guardrails is impressive on its own. The power is in having all of them on, by default, on every route, so that the safe path is the path of least resistance.

Here is the naïve server from the start, rebuilt with everything we covered. It's still tiny. It's just no longer naïve.

```js :collapsed-lines
import http from "node:http";
import { timingSafeEqual, createHash } from "node:crypto";

const MAX_BODY_BYTES = 100 * 1024;
const FORBIDDEN_KEYS = new Set(["__proto__", "constructor", "prototype"]);

function httpError(statusCode, message) {
  return Object.assign(new Error(message), { statusCode });
}

function reviver(key, value) {
  return FORBIDDEN_KEYS.has(key) ? undefined : value;
}

function readBody(req, limit = MAX_BODY_BYTES) {
  return new Promise((resolve, reject) => {
    const declared = Number(req.headers["content-length"]);
    if (Number.isFinite(declared) && declared > limit) {
      return reject(httpError(413, "Payload too large"));
    }
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(httpError(413, "Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function parseJson(buffer) {
  if (buffer.length === 0) return {};
  try {
    return JSON.parse(buffer.toString("utf8"), reviver);
  } catch {
    throw httpError(400, "Invalid JSON body");
  }
}

function secureHeaders(res) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Strict-Transport-Security", "max-age=63072000; includeSubDomains");
  res.removeHeader("X-Powered-By");
}

function safeCompare(a, b) {
  const ha = createHash("sha256").update(String(a)).digest();
  const hb = createHash("sha256").update(String(b)).digest();
  return timingSafeEqual(ha, hb);
}

function sendJson(res, status, payload) {
  if (!res.headersSent) {
    res.writeHead(status, { "Content-Type": "application/json" });
  }
  res.end(JSON.stringify(payload));
}

function sendError(res, err) {
  const status = err.statusCode ?? 500;
  // Never leak internal error details on a 500. Log them, do not ship them.
  const message = status === 500 ? "Internal Server Error" : err.message;
  if (status === 500) console.error(err);
  sendJson(res, status, { error: message });
}

const API_KEY = process.env.API_KEY ?? "dev-only-key";

async function handler(req, res) {
  secureHeaders(res);

  // A single protected route, as an example.
  if (req.method === "POST" && req.url === "/users") {
    const provided = req.headers["x-api-key"] ?? "";
    if (!safeCompare(provided, API_KEY)) {
      throw httpError(401, "Unauthorized");
    }

    const data = parseJson(await readBody(req));

    if (typeof data.email !== "string" || !data.email.includes("@")) {
      throw httpError(400, "email is required");
    }
    if (typeof data.password !== "string" || data.password.length < 12) {
      throw httpError(400, "password must be at least 12 characters");
    }

    // Only the fields we asked for. No mass assignment.
    const user = { email: data.email };
    return sendJson(res, 201, { created: user });
  }

  throw httpError(404, "Not found");
}

const server = http.createServer((req, res) => {
  handler(req, res).catch((err) => sendError(res, err));
});

server.requestTimeout = 30_000;
server.headersTimeout = 10_000;
server.setTimeout(60_000);

server.listen(3000, () => console.log("listening on http://localhost:3000"));
```

Read that top to bottom and notice how the security isn't a separate "security middleware" bolted on at the end. It's woven into the normal flow.

The body has a limit. The JSON is parsed safely. The headers go out every time. The API key check is timing-safe. The validation runs before any logic. The error handler refuses to leak internals. And the whole thing is still small enough to hold in your head, which matters, because security you can't understand is security you'll eventually disable by accident.

Try breaking it. Send a huge body and watch the 413. Send `{"__proto__": {"isAdmin": true}}` and confirm `({}).isAdmin` is still `undefined` afterward. Send a wrong API key and notice you can't tell from the response time how close you were. That last one is invisible by design, which is the whole point.

---

## How to Handle CORS Correctly

CORS, which stands for Cross-Origin Resource Sharing, is one of the most misunderstood security features in web development, and the misunderstanding is the dangerous kind.

Here's the part people get wrong: CORS doesn't protect your server. It's not a firewall. It's a browser feature that decides whether JavaScript running on one website is allowed to read the response from your API on another. Your server stays perfectly reachable from curl, from Postman, and from any other server, CORS headers or not.

What that means in practice is that the most common "fix" people apply is also the most common mistake:

```js
res.setHeader("Access-Control-Allow-Origin", "*"); // understand this before you ship it
```

A wildcard says "any website's JavaScript may read my responses." For a genuinely public, read-only API with no credentials, that can be perfectly fine. For anything that uses cookies or returns data tied to a logged-in user, it's a mistake, and browsers will refuse to combine `*` with credentials anyway.

The correct approach is to allow only the origins you actually trust:

```js
const ALLOWED_ORIGINS = new Set(["https://app.example.com"]);

function applyCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin"); // so a cache does not mix origins up
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
}
```

Keep this mental model: CORS loosens the browser's default protection in a controlled way. Setting it to `*` doesn't make your API more exposed to attacks from other servers, because servers were never restricted in the first place. It makes your data readable by any web page a victim happens to visit, which is a privacy and data-exposure decision, not a "make the console error go away" decision. Decide it on purpose, origin by origin.

---

## What This Tutorial Doesn't Cover

Honesty time, because a tutorial that pretends to be totally complete is doing you a disservice. The guardrails above are the baseline, not the finish line.

Here's what's deliberately out of scope and where to look next:

- **Authentication and authorization:** You checked one API key. Real apps need sessions or tokens, and a real story for who is allowed to do what. That is a whole topic on its own.
- **Rate limiting:** A single client shouldn't be able to hammer your login route ten thousand times a minute. In-memory counters work for one instance. Behind a load balancer you need a shared store like Redis.
- **Outbound request safety (SSRF):** The moment your server makes requests to URLs a user supplied, you have a new attack surface: someone can point you at internal addresses or the cloud metadata endpoint. That deserves its own article.
- **TLS:** Everything HSTS-related assumes you actually terminate HTTPS somewhere, whether that's the runtime, a reverse proxy, or your platform.
- **Logging and monitoring:** You can't respond to what you can't see. Structured logs with request ids are the unglamorous foundation of every incident response that went well.

Each of these is a future tutorial, and each one follows the same philosophy as this one: make the safe choice the default, and make the unsafe choice something you have to go out of your way to do.

---

## Why Defaults Beat Checklists

You might be wondering why I keep saying "by default" instead of just handing you a checklist and wishing you luck. The reason is that I've watched a lot of checklists lose to a deadline.

A checklist is a list of things a human has to remember to do, correctly, every single time, forever. That includes the junior dev who joined last week, and the senior dev who's exhausted and shipping a hotfix at midnight.

Security that depends on perfect human memory is security that quietly degrades the moment the team gets busy, which is precisely the moment an attacker is hoping for.

A default is a different kind of thing. A default is what happens when nobody does anything at all. If the safe behavior is the default, then forgetting produces a safe app. If the unsafe behavior is the default, then forgetting produces a vulnerability, and people forget constantly, because they're human and they have forty other things on their plate.

This is exactly why the helpers in this article are wrappers you call once at the top of a request, instead of steps you sprinkle through your handlers and hope you got them all. It's the same reason frameworks that take security seriously turn protections on and make you opt out, rather than leaving them off and making you opt in.

The wording sounds like a small difference. Measured across a real team over a real year, the difference in outcomes is enormous. Design it so the lazy path and the safe path are the same path, and you'll be surprised how secure "lazy" can be.

---

## An Honest Note on Frameworks

If wiring all of this by hand every time sounds tedious, that's exactly the right instinct, and it's why some frameworks ship these protections on by default so you don't have to remember them.

Full disclosure: I maintain one of them, an open-source project called DaloyJS. I'm not here to sell it, and everything in this article is plain Node that works the same no matter what you build on.

I mention it only because the lesson that produced it is the lesson of this whole piece: the defaults are the product. A framework that makes you opt into safety will, statistically, be run by someone who forgot to.

Whether you use a framework or roll your own, copy the helpers above into your project today. They're dependency-free and they will quietly prevent a category of bad days.

::: important The Takeaway Checklist

If you remember nothing else, remember this list and put it somewhere your team will see it:

- **Limit the body:** Count bytes as they stream, reject past your cap, never trust `Content-Length` alone.
- **Time out everything:** Tighten Node's request and header timeouts, and give every outbound call a deadline with `AbortController`.
- **Parse JSON defensively:** Catch parse errors into a clean 400, and strip `__proto__`, `constructor`, and `prototype` with a reviver.
- **Set security headers on every response:** Wrap them in one function so "every response" actually means every response.
- **Compare secrets in constant time:** Use `crypto.timingSafeEqual` on hashed inputs, never `===`, and use a real password hash for passwords.
- **Validate input as a gate:** Define the shape on purpose, reject what doesn't match, and copy only the fields you asked for.

:::

None of this is clever. That's the best thing about it. The boring stuff is what gets you, so make the boring stuff automatic, and go spend your cleverness on the parts of your product that actually need it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Secure-by-Default Node.js APIs",
  "desc": "Most security problems I've shipped in my career weren't exotic. They weren't nation-state attacks or clever zero-days. They were boring. A missing limit here, a forgotten timeout there, a string comp",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-secure-by-default-node-js-apis.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
