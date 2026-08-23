---
lang: en-US
title: "Your Node.js Streams Aren’t Backpressuring. They’re Silently Eating Your Memory."
description: "Article(s) > Your Node.js Streams Aren’t Backpressuring. They’re Silently Eating Your Memory."
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - master.dev
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Your Node.js Streams Aren’t Backpressuring. They’re Silently Eating Your Memory."
    - property: og:description
      content: "Your Node.js Streams Aren’t Backpressuring. They’re Silently Eating Your Memory."
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/your-node-js-streams-arent-backpressuring-theyre-silently-eating-your-memory.html
prev: /programming/js-node/articles/README.md
date: 2026-05-25
isOriginal: false
author:
  - name: Durgesh Rajubhai Pawar
    url: https://blog.master.dev/author/durgesh/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/9683
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
  name="Your Node.js Streams Aren’t Backpressuring. They’re Silently Eating Your Memory."
  desc="Memory management in Node.js streaming applications can be quite complex. Streams don't inherently protect against memory exhaustion and we get into common pitfalls developers face."
  url="https://blog.master.dev/your-node-js-streams-arent-backpressuring-theyre-silently-eating-your-memory/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/9683"/>

It’s a Wednesday afternoon. You’re halfway through a PR review when a Slack message pops in from the platform team: “Hey, your export service pods keep getting OOM-killed. Memory climbs to around 3.8GB before Kubernetes restarts them. Happening a few times a day now. Can you take a look?”

You open the code. It’s clean. A database cursor pipes through a transform that formats each row as CSV, then pipes into the HTTP response. Textbook streaming. It passed code review six months ago. It has integration tests. It’s been running fine in production the entire time.

You add [<VPIcon icon="fa-brands fa-node"/>`process.memoryUsage()`](https://nodejs.org/api/process.html#processmemoryusage) logging and watch a few requests. The heap doesn’t spike. It climbs. Slowly, steadily, like a bathtub filling with the drain cracked half-open. Each request adds a little more, and the garbage collector never quite catches up. Under your normal traffic patterns, the pods recycle before it matters. Nobody noticed.

But the sales team just closed a deal with a logistics company that exports 2 million rows every morning at 9:15 AM. Three concurrent requests, each pulling a dataset large enough to make the slow climb a fast one. The pods hit their memory limits and vanish.

The stream was never backpressuring. Your transform called [<VPIcon icon="fa-brands fa-node"/>`.write()`](https://nodejs.org/api/stream.html#writablewritechunk-encoding-callback) for every row, ignoring the `false` return value that begged the producer to slow down. Node.js did exactly what you told it to: it blindly buffered chunks until the process collapsed.

This failure mode is practically invisible under normal load. It sails through code review and passes all tests, sitting quietly in production until a dataset gets large enough to expose it. It’s not even a new class of bug. The [<VPIcon icon="fas fa-globe"/>historic Walmart memory leak](https://web.archive.org/web/20221206010041/https://www.joyent.com/blog/walmart-node-js-memory-leak) — one of the most famous Node.js production incidents — took engineering teams weeks to diagnose, eventually traced to a missing backpressure statement in Node.js core C++ that caused silent buffer accumulation when disk reads outpaced network writes.

That was a bug in the runtime itself. What you’re dealing with is worse: it’s correct behavior. The runtime is doing exactly what your code asked.

---

## What You Think Streams Do vs. What They Actually Do

Here’s the mental model most developers carry around: [<VPIcon icon="fa-brands fa-node"/>streams](https://nodejs.org/api/stream.html) process data “chunk by chunk,” so you never load the whole file into memory. You pipe a readable into a writable, Node.js handles the flow, and everything stays lean. You read this in a tutorial in 2019 and never questioned it.

That mental model is technically true. It’s also wildly incomplete. And the gap between what it tells you and what actually happens is exactly where your memory leaks live.

Streams don’t protect you from memory exhaustion. They give you the *tools* to protect yourself. There’s a massive difference. [<VPIcon icon="fa-brands fa-node"/>Backpressure](https://nodejs.org/learn/modules/backpressuring-in-streams) in Node.js is a cooperative protocol. The consumer can signal “I’m overwhelmed, slow down.” But that signal is just a suggestion. If the producer ignores it, nothing stops it. Node.js won’t throw an error. It won’t pause your code. It won’t kill the stream. It’ll just keep accepting data, keep allocating heap memory, and keep going until the V8 engine runs out of space and the process crashes.

This surprises people. They assume that if they’re using streams, they’re safe. That the runtime is doing something smart under the hood to prevent runaway memory growth. It isn’t. The runtime is doing exactly what you told it to do: accept data and buffer it.

Think of it like a water pipe with a pressure gauge. The gauge exists. It’s right there on the pipe, showing you the pressure is climbing. But if nobody reads the gauge and turns the valve, water pressure builds until something bursts. Streams are the pipe. Backpressure is the gauge. Your code is the hand on the valve.

The problem is that most streaming code never touches the valve. Developers call `.write()`, see that it accepts the data, and move on to the next chunk. The method always accepts data. It never throws. It never blocks. It just quietly returns a boolean that says whether you should keep going or wait. And almost nobody checks that boolean.

The tutorials don’t emphasize this. The API doesn’t force you to handle it. The code works perfectly in development where your datasets are small and your consumer is fast. The failure only shows up when the producer is faster than the consumer for long enough that the buffer grows past what your container can hold.

So what’s the gauge? It’s a single boolean return value that almost nobody checks.

---

## The `highWaterMark` Lie

Most developers encounter [<VPIcon icon="fa-brands fa-node"/>`highWaterMark`](https://nodejs.org/api/stream.html#buffering) in the docs and form a reasonable assumption: it’s a memory limit. When the buffer hits that number, Node.js stops accepting data. Maybe it throws. Maybe it pauses. Either way, the runtime protects you.

None of that is true.

`highWaterMark` is an advisory threshold. When the internal buffer reaches this value, `.write()` returns `false`. That’s it. The chunk you just wrote pushed the buffer past the threshold, so the stream is telling you to stop until it drains. There’s no exception. There’s no automatic pause. There’s no circuit breaker. If you ignore the `false` and keep calling `.write()`, Node.js keeps buffering. Every single chunk you push gets added to an internal queue that grows without limit until the V8 heap runs out of space and the process dies.

Here’s what the dangerous pattern looks like. This is real code that passes code review every day:

```js
// Broken: ignores backpressure entirely
for await (const row of databaseCursor) {
  const csv = formatRowAsCSV(row);
  writable.write(csv); // return value? what return value?
}
```

This looks fine. It’s concise, it’s readable, and it processes one row at a time. But `.write()` is returning `false` after the first few hundred rows, and nobody’s listening. The internal buffer swells to hundreds of megabytes while the loop keeps hammering it with data.

Here’s the fix. It’s four extra lines:

```js
import { once } from "node:events";

// Fixed: respects backpressure
for await (const row of databaseCursor) {
  const csv = formatRowAsCSV(row);
  const ok = writable.write(csv);
  if (!ok) await once(writable, "drain");
}
```

You check the return value. If it’s `false`, you stop and wait for the [<VPIcon icon="fa-brands fa-node"/>`drain`](https://nodejs.org/api/stream.html#event-drain) event, which fires when the buffer has been flushed and the writable is ready for more data. Then you continue. That’s it. That’s the whole pattern.

Node.js also exposes this state programmatically via [<VPIcon icon="fa-brands fa-node"/>`writable.writableNeedDrain`](https://nodejs.org/api/stream.html#writablewritableneeddrain). If you’re deep inside a callback chain where you don’t have the `.write()` return value handy, this property tells you whether the stream is currently in a backpressured state. It flips to `true` when `.write()` returns `false`, and flips back when `drain` fires. Same signal, different access pattern.

The difference between checking and ignoring that boolean is the difference between a service that hums along at 80MB of RAM and one that climbs to 4GB and gets killed by your orchestrator.

For tight write loops like this CSV export — thousands of small `.write()` calls, one per row — [<VPIcon icon="fa-brands fa-node"/>`writable.cork()`](https://nodejs.org/api/stream.html#writablecork) is a complementary optimization. Corking tells Node.js to batch all subsequent writes in memory without flushing to the underlying resource. When you call [<VPIcon icon="fa-brands fa-node"/>`writable.uncork()`](https://nodejs.org/api/stream.html#writableuncork), everything flushes in a single system call. This doesn’t change backpressure behavior — you still check the boolean and await `drain` — but it reduces context switches and can measurably improve throughput when you’re writing many small chunks per second. Cork before the loop, uncork after each batch:

```js
import { once } from "node:events";

writable.cork();
for await (const row of databaseCursor) {
  const ok = writable.write(formatRowAsCSV(row));
  if (!ok) {
    writable.uncork(); // flush what we have
    await once(writable, "drain");
    writable.cork();   // start batching again
  }
}
writable.uncork(); // flush the final batch
```

### The Node.js 22 Shift

This got more dangerous recently. In [<VPIcon icon="fa-brands fa-node"/>Node.js 22](https://nodejs.org/en/blog/announcements/v22-release-announce), the default `highWaterMark` was bumped from 16KB to 64KB (PR [`#52037` (<VPIcon icon="iconfont icon-github"/>`nodejs/node`)](https://github.com/nodejs/node/pull/52037) by Node.js core collaborator [Robert Nagy (<VPIcon icon="iconfont icon-github"/>`ronag`)](https://github.com/ronag)). The change makes sense for throughput: fewer context switches, fewer system calls, better performance on large payloads. But it also means Node.js now buffers 4x more data before it even sends the first backpressure signal.

If you’re running in constrained containers, 256MB or 512MB pods, that 4x multiplier matters. You’re burning through a bigger chunk of your memory ceiling before your code gets the first hint that it should slow down. And if your code was already ignoring that hint, the crash just comes faster.

If you need the old behavior in containerized environments, Node.js exposes [<VPIcon icon="fa-brands fa-node"/>`setDefaultHighWaterMark()`](https://nodejs.org/api/stream.html#streamsetdefaulthighwatermarkobjectmode-value) to revert the threshold globally:

```js
import { setDefaultHighWaterMark } from "node:stream";

// Revert to the pre-Node 22 default for constrained containers
setDefaultHighWaterMark(false, 16 * 1024); // 16KB for byte-mode streams
```

This is a blunt instrument — it affects every stream in the process. For surgical control, set `highWaterMark` directly on the streams that matter.

### The `objectMode` Trap

There’s one more wrinkle. When a stream runs in [<VPIcon icon="fa-brands fa-node"/>`objectMode`](https://nodejs.org/api/stream.html#object-mode), `highWaterMark` doesn’t count bytes. It counts objects. The default is 16, which means 16 objects buffered before the backpressure signal fires.

Remember that database cursor from the sales team’s export? It was likely yielding rows as objects. If each row contains 50KB of joined JSON data, a `highWaterMark` of 16 means 800KB of buffered data per stream, not 16KB. When the transform serializes those rows, the string chunks hit the writable side, compounding the memory footprint. The label says “16”, but your heap is carrying gigabytes.

### The Two-Faced Transform Stream

The mental model breaks down further with [<VPIcon icon="fa-brands fa-node"/>Transform streams](https://nodejs.org/api/stream.html#class-streamtransform). A Transform stream has two sides—a readable side and a writable side—and they have independent `highWaterMark` settings. You can have a Transform that perfectly respects backpressure on its readable side (waiting for the downstream HTTP response to drain), but continues blindly accepting data on its writable side because its internal object queue hasn’t hit the limit. It’s an accordion. It expands to absorb the pressure, masking the problem until its own buffers explode.

```js
// Broken: 'objectMode' creates massive 16-object buffers on BOTH sides
const csvTransform = new Transform({
  objectMode: true,
  transform(row, enc, cb) {
    this.push(formatToCSV(row));
    cb();
  }
});
```

The fix: don’t let the accordion expand. When bridging objects to strings, configure the limits for both sides explicitly. This forces the Transform to exert backpressure upstream the moment its downstream buffer fills.

```js
// Fixed: tightening the accordion with explicit, asymmetric limits
const csvTransform = new Transform({
  writableObjectMode: true,
  writableHighWaterMark: 4, // Pause database after 4 un-transformed rows
  readableObjectMode: false,
  readableHighWaterMark: 1024 * 4, // Strict 4KB string buffer for downstream
  transform(row, enc, cb) {
    this.push(formatToCSV(row));
    cb();
  }
});
```

### The Other Half of the Handshake

Everything so far covers the writable side of backpressure: `.write()` returns `false`, you await `drain`, the producer slows down. But Readable streams have a symmetric mechanism that matters whenever you implement a custom source — a database cursor adapter, an API paginator, a file tailer.

[<VPIcon icon="fa-brands fa-node"/>`readable.push()`](https://nodejs.org/api/stream.html#readablepushchunk-encoding) returns `false` when the readable’s own internal buffer hits its `highWaterMark`. That’s the signal to stop fetching from your upstream data source until Node.js calls `_read()` again, which it does when the consumer pulls more data and the buffer drains.

```js
import { Readable } from "node:stream";

class DatabaseCursorReadable extends Readable {
  constructor(cursor, opts) {
    super(opts);
    this.cursor = cursor;
  }

  async _read() {
    const row = await this.cursor.next();
    if (!row) {
      this.push(null); // signal end-of-stream
      return;
    }
    // push() returns false when the readable's buffer is full.
    // Stop fetching until _read() is called again by the consumer.
    if (!this.push(formatRow(row))) return;
  }
}
```

If you ignore the `push()` return value and keep fetching, memory accumulates on the *source* side — before the writable even enters the picture. And the readable’s `highWaterMark` controls how aggressively it pre-fetches: a readable with a 64KB threshold will try to keep 64KB of data queued and ready before the consumer even asks for it. Combined with the writable’s buffer, you’re carrying both thresholds in memory simultaneously.

The full mental model is: the writable says “stop sending me data.” The readable says “stop fetching data from the source.” Your custom streams need to respect both halves of that handshake.

---

## ` Is Quietly Ruining Your Production Services

[<VPIcon icon="fa-brands fa-node"/>`.pipe()`](https://nodejs.org/api/stream.html#readablepipedestination-options) was the original way to connect streams in Node.js. It handles backpressure internally, pausing the readable when the writable’s buffer fills and resuming it after drain. For simple cases, a readable piped to a writable, it works. Backpressure flows correctly. Data gets where it needs to go.

The problem is everything else.

`.pipe()` does not propagate errors. If a transform in the middle of a pipe chain throws, the source stream keeps reading. The destination stream stays open. File descriptors leak. Sockets hang. Nothing gets cleaned up. You get zero indication that anything broke.

Part of why `.pipe()` remains so pervasive is its ergonomics. It returns the destination stream, which enables the fluent chaining syntax that developers find irresistible:

```js
// Broken: errors vanish, resources leak — but the syntax is so clean
readStream
  .pipe(transformStream)
  .pipe(writeStream);
```

That chaining is why people keep reaching for it. It reads like a Unix pipeline. It feels declarative. And it hides a catastrophic flaw behind beautiful syntax.

Say `transformStream` hits a malformed record and throws. What happens? `readStream` keeps pumping data into a dead transform. `writeStream` sits open, waiting for data that will never arrive. The file descriptor behind `readStream` stays locked. The socket behind `writeStream` stays allocated. If this is an HTTP response, the client hangs until their timeout fires. You can verify this with [`lsof`](https://man7.org/linux/man-pages/man8/lsof.8.html): the file handles are still there, held open by a stream chain that half-died and half-didn’t.

The only way to make `.pipe()` safe is to attach individual `error` listeners to every single stream in the chain. Nobody does this consistently, and the moment your chain grows to three or four streams, the boilerplate becomes a mess that’s harder to maintain than the feature it supports.

While a callback-based [<VPIcon icon="fa-brands fa-node"/>`pipeline()`](https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options) has existed since Node 10, the modern, Promise-based [<VPIcon icon="fa-brands fa-node"/>`node:stream/promises`](https://nodejs.org/api/stream.html#streampromisespipelinesource-transforms-destination-options) API landed in Node 15. As of 2026, this clean, asynchronous API has been the standard for over half a decade, leaving absolutely no excuse to continue using legacy `.pipe()`:

```js
import { pipeline } from "node:stream/promises";

// Fixed: all streams destroyed on any failure
await pipeline(readStream, transformStream, writeStream);
```

`pipeline()` does exactly what `.pipe()` should have done from the start. If any stream in the chain errors, it destroys all of them. File descriptors close. Sockets release. The error propagates as a rejected promise that you can catch in one place. No per-stream listener wiring. No orphaned resources.

It also handles the happy path correctly: when the last stream finishes, everything upstream gets cleaned up in order.

Here’s the rule: if your `.pipe()` chain has more than two streams, or if any stream in the chain can error, you’re carrying risk that `pipeline()` eliminates for free. A simple `readStream.pipe(writeStream)` in a script that runs once and exits is not going to hurt you. But the moment you’re in a server, handling concurrent requests, with transforms or network sockets in the chain, `.pipe()` is a liability. Default to `pipeline()` and only reach for `.pipe()` when you have a specific, narrow reason.

---

## Async/Await Won’t Save You

If you’ve moved from callbacks to Promises, you probably carry a quiet confidence that `async/await` handles timing and flow control for you. For control flow, that’s true. For data volume, it’s not even close.

Here’s the trap. You use [<VPIcon icon="fa-brands fa-firefox"/>`for await...of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) to consume a readable stream. The async iterator pulls one chunk at a time, waits for it to arrive, then gives you the next one. This feels safe. It feels like you’re processing data at exactly the right pace. And on the reading side, you are.

But then you call `writable.write(chunk)` inside that loop, and the whole thing falls apart.

```js
// Broken: reads are paced, writes are not
for await (const chunk of readable) {
  writable.write(chunk);
}
```

The async iterator controls how fast you *read*. It does nothing about how fast you *write*. If `writable.write()` returns `false`, your loop doesn’t pause. It doesn’t know it should pause. It just grabs the next chunk from the readable and shoves it into a buffer that’s already full. You’re back to unbounded memory growth, except now it looks even more correct because you’re using modern syntax.

The fix requires adding the backpressure check right back in.

```js
import { once } from "node:events";

// Fixed: reads AND writes are paced
for await (const chunk of readable) {
  const ok = writable.write(chunk);
  if (!ok) await once(writable, "drain");
}
```

That single `await` does two things. It pauses the loop, which pauses the iterator, which stops the readable from pulling data — everything slows down together. But it also yields execution back to the event loop, which is what allows I/O callbacks — network flushes, disk writes — to actually make progress and eventually fire the `drain` event. Without that yield, the `for` loop would monopolize the current tick and `drain` could never fire. The `await` isn’t just a flow-control tool; it’s the mechanism that lets the system catch its breath.

The core mistake is thinking that Promises and backpressure solve the same problem. Promises manage *when* your code runs. Backpressure manages *how much data accumulates*. `async/await` only solves one of them.

### The Flowing Mode Trap

There’s one more way to accidentally bypass everything in this article. Attaching a [<VPIcon icon="fa-brands fa-node"/>`data`](https://nodejs.org/api/stream.html#event-data) event listener puts a readable stream into [<VPIcon icon="fa-brands fa-node"/>flowing mode](https://nodejs.org/api/stream.html#two-reading-modes):

```js
// This silently opts out of backpressure.
// Node.js pushes data as fast as the source can deliver.
readable.on("data", (chunk) => {
  writable.write(chunk); // the 'false' return is meaningless here
});
```

In flowing mode, Node.js doesn’t wait for downstream readiness before emitting the next chunk. The `data` events fire as fast as the readable’s source can produce. The writable still returns `false`, but you’re not in a loop you can pause with `await` — you’re in an event emitter that doesn’t stop unless you explicitly call [<VPIcon icon="fa-brands fa-node"/>`readable.pause()`](https://nodejs.org/api/stream.html#readablepause) and resume on `drain`.

If you’ve been applying the drain pattern correctly inside `for await` loops, you’re safe — async iterators use paused mode internally. But if you write a different handler elsewhere using `.on('data', ...)`, you’ve quietly opted out of every protection this article describes.

---

## The Hidden Cost of Pausing: Connection Starvation

Let’s say you fix the writable backpressure. You respect the boolean, wait for `drain`, and successfully pause the upstream database cursor. Memory is flat. The pods stop crashing. Problem solved, right?

Not quite. Fixing a memory leak by respecting backpressure often exposes a secondary, architectural bottleneck: resource starvation.

What exactly happens to that database connection while the Node.js stream is paused, waiting for a slow downstream client to drain? It stays open. The database cursor is held in a suspended state. If your query holds read locks, those locks remain active. If your downstream HTTP client is downloading on a spotty 3G connection and takes five minutes to drain, you have tied up a worker in your database connection pool for five entire minutes.

Node.js is incredibly efficient at handling thousands of concurrent stalled HTTP requests. Your [<VPIcon icon="fas fa-globe"/>Postgres](https://node-postgres.com/features/pooling) or [MySQL (<VPIcon icon="iconfont icon-github"/>`sidorares/node-mysql2#using-connection-pools`)](https://github.com/sidorares/node-mysql2#using-connection-pools) connection pool is not. If you have a pool size of 20, it only takes 20 users on slow hotel Wi-Fi initiating large exports to completely saturate your database pool. Your memory usage stays perfectly flat — the streams are doing exactly what they should — but your application stops serving new requests entirely. Every API endpoint that needs a database connection stalls. Health checks start failing. Your load balancer starts routing traffic to other pods, which hit their own pool limits. The cascading failure has nothing to do with memory and everything to do with a finite resource you forgot to protect.

This is the hidden trade-off of backpressure. You are trading volatile memory exhaustion for deterministic connection starvation. The memory leak was dramatic — pods crashing, Slack threads firing. Connection starvation is insidious — latency climbs, requests queue, and the whole system degrades gradually until someone notices the p99 latencies have tripled.

To fix this at production scale, you can’t just check a boolean. You must combine stream backpressure with:

1. **Strict query timeouts:** Enforce hard limits on how long a cursor can stay open. If the downstream client can’t keep up within that window, kill the query and return a partial result or an error. A dead request is better than a dead connection pool.
2. **Dedicated worker pools:** Isolate heavy export tasks to a separate database replica and connection pool so they don’t starve the main API. Your export service and your checkout API should never compete for the same 20 connections.
3. **Queue-based offloading:** For massive exports, bypass live HTTP streams entirely. Write to S3 via a background worker and email the user a [<VPIcon icon="fa-brands fa-amazon"/><VPIcon icon="fa-brands fa-aws"/>presigned URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html). The user gets their file. Your database gets its connections back. Nobody’s stream backpressures because there’s no stream.

---

You’ve stopped the bleeding. The four-line fix — check the boolean, await the drain — flatlined memory at 180MB instead of climbing to 3.8GB. Switching from `.pipe()` to `pipeline()` closed the error-propagation gap. You know that `highWaterMark` is a suggestion, not a limit. You understand that async/await paces reads, not writes. And you know that fixing the memory leak pushes pressure upstream into your database connection pool, where it needs its own set of defenses.

---

## Conclusion

That’s the foundation. These are the mechanics that every streaming service needs to get right before anything else matters. But they’re not the whole picture. Correct backpressure code can still leak when clients disconnect mid-stream, when timeouts close the wrong end of a pipeline, or when `pipeline()` itself can’t fully clean up a source that’s still pushing data. Those production-specific failure patterns. We’ll cover the testing, profiling, and async generator strategies that catch them in Part 2 (coming soon!).

::: info Article Series

```component VPCard
{
  "title": "Your Node.js Streams Aren’t Backpressuring. They’re Silently Eating Your Memory.",
  "desc": "Memory management in Node.js streaming applications can be quite complex. Streams don't inherently protect against memory exhaustion and we get into common pitfalls developers face.",
  "link": "/blog.master.dev/your-node-js-streams-arent-backpressuring-theyre-silently-eating-your-memory.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The Production Playbook for Node.js Stream Leaks",
  "desc": "Short story: `pipeline()` over `.pipe()` and destroy what you create.",
  "link": "/blog.master.dev/the-production-playbook-for-node-js-stream-leaks.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Your Node.js Streams Aren’t Backpressuring. They’re Silently Eating Your Memory.",
  "desc": "Memory management in Node.js streaming applications can be quite complex. Streams don't inherently protect against memory exhaustion and we get into common pitfalls developers face.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/your-node-js-streams-arent-backpressuring-theyre-silently-eating-your-memory.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
