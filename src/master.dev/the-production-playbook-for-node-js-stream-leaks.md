---
lang: en-US
title: "The Production Playbook for Node.js Stream Leaks"
description: "Article(s) > The Production Playbook for Node.js Stream Leaks"
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
      content: "Article(s) > The Production Playbook for Node.js Stream Leaks"
    - property: og:description
      content: "The Production Playbook for Node.js Stream Leaks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/the-production-playbook-for-node-js-stream-leaks.html
prev: /programming/js-node/articles/README.md
date: 2026-05-26
isOriginal: false
author:
  - name: Durgesh Rajubhai Pawar
    url: https://master.dev/blog/author/durgesh/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/9727
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
  name="The Production Playbook for Node.js Stream Leaks"
  desc="Short story: `pipeline()` over `.pipe()` and destroy what you create."
  url="https://master.dev/blog/the-production-playbook-for-node-js-stream-leaks/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/9727"/>

This is Part 2 of a two-part series. [**Part 1**](/master.dev/your-node-js-streams-arent-backpressuring-theyre-silently-eating-your-memory.md) covered the core mental model of backpressure, why `highWaterMark`isn’t a safety net, the `.pipe()`to `pipeline()` migration, and why `async/await`doesn’t solve data volume problems. We also fixed the immediate crisis: check the `.write()` return value, await the `drain` event, and use `pipeline()` instead of `.pipe()`. Memory flatlined. The pods stopped dying.

::: info Article Series

```component VPCard
{
  "title": "Your Node.js Streams Aren’t Backpressuring. They’re Silently Eating Your Memory.",
  "desc": "Memory management in Node.js streaming applications can be quite complex. Streams don't inherently protect against memory exhaustion and we get into common pitfalls developers face.",
  "link": "/master.dev/your-node-js-streams-arent-backpressuring-theyre-silently-eating-your-memory.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The Production Playbook for Node.js Stream Leaks",
  "desc": "Short story: `pipeline()` over `.pipe()` and destroy what you create.",
  "link": "/master.dev/the-production-playbook-for-node-js-stream-leaks.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

But there are failure modes that survive even correct backpressure handling. They don’t show up in tests because tests run on fast local machines with small datasets and clients that never disconnect. Production is not that polite. Here are the five leak patterns that only surface under real traffic, and the five-rule playbook for catching them before your users do.

---

## The Five Ways Your Streams Are Leaking Right Now

### 1. The client leaves, but your server doesn’t notice

A user kicks off a large CSV export, waits ten seconds, then closes the browser tab. The HTTP response emits [<VPIcon icon="fa-brands fa-node"/>`close`](https://nodejs.org/api/http.html#event-close_1). If you’re using the legacy `.pipe()` method, your upstream database query keeps running. The transform keeps processing rows. The memory keeps climbing. Nobody is listening on the other end, but your server doesn’t know that because `.pipe()` only triggers teardown on the `finish` event, which never fires on a dropped connection.

```js
// Broken: legacy pipe() leaks when the client drops the connection
db.cursor()
  .pipe(csvTransform)
  .pipe(res);
```

The fix: modern Node.js (v14+) natively monitors the destination stream if you use [<VPIcon icon="fa-brands fa-node"/>`pipeline()`](https://nodejs.org/api/stream.html#streampromisespipelinesource-transforms-destination-options). If the user closes the tab before the stream formally ends, `pipeline()` detects the premature closure of the socket, throws an [<VPIcon icon="fa-brands fa-node"/>`ERR_STREAM_PREMATURE_CLOSE`](https://nodejs.org/api/errors.html#err_stream_premature_close) error, and automatically destroys the upstream database cursor.

```js
import { pipeline } from "node:stream/promises";

// Fixed: pipeline() automatically tears down upstream when the client drops
try {
  await pipeline(db.cursor(), csvTransform, res);
} catch (err) {
  if (err.code === "ERR_STREAM_PREMATURE_CLOSE") {
    console.log("Client disconnected early. Cleanup handled automatically.");
  } else {
    throw err;
  }
}
```

You can also check [<VPIcon icon="fa-brands fa-node"/>`req.destroyed`](https://nodejs.org/api/http.html#requestdestroyed) proactively inside long-running handlers. If the client has already disconnected before you even start the stream, there’s no point opening the database cursor at all:

```js
// Defensive: bail before starting expensive work if the client is already gone
if (req.destroyed) {
  return res.end();
}
await pipeline(db.cursor(), csvTransform, res);
```

### 2. Manual listener teardown is a nightmare

Before async iterators, scanning a stream for a specific value and then stopping was surprisingly difficult. You had to wire up `data` events, and when you found what you needed, you couldn’t just `return`. You had to manually detach listeners and destroy the stream, or else it would keep reading in the background, consuming CPU and memory.

```js
// Broken: legacy event listeners make early exits dangerous and leaky
fileStream.on("data", (line) => {
  if (line.includes("ERROR")) {
    console.log("Found error!");
    // The stream is still reading! We have to manually:
    // fileStream.removeAllListeners("data");
    // fileStream.destroy();
  }
});
```

::: tip The fix

[<VPIcon icon="fa-brands fa-firefox"/>async iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) (`for await...of`) are actually the safest way to consume streams. Why? Because the JavaScript iterator protocol natively hooks into stream teardown. When you `break`, `return`, or `throw` out of an async iterator loop, JavaScript automatically calls the iterator’s [<VPIcon icon="fa-brands fa-firefox"/>`.return()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator/return) method. Node.js maps this directly to [<VPIcon icon="fa-brands fa-node"/>`stream.destroy()`](https://nodejs.org/api/stream.html#readabledestroyerror).

```js
// Fixed: async iterators automatically destroy the stream on break
for await (const line of fileStream) {
  if (line.includes("ERROR")) {
    console.log("Found error!");
    break; // fileStream.destroy() is called automatically behind the scenes!
  }
}
```

:::

::: tip One caveat

while `break` triggers teardown in modern Node.js, older versions (pre-v14) had bugs where the destroy signal didn’t propagate correctly. If you’re maintaining code that must run on legacy runtimes, wrap your async iterator in a `try/finally` with an explicit `.destroy()` call as insurance.

:::

### 3. Your timeout kills the response but nothing else

Your HTTP framework has a 30-second timeout. A slow client triggers it. The framework calls `res.end()` and moves on. But `res.end()` is a graceful close — it signals the end of the writable side without triggering an error. That means `pipeline()` doesn’t see it as a failure, so it doesn’t tear down the upstream chain. The fetch that’s pulling data from a third-party API? Still running. The database cursor? Still open.

```js
// Broken: timeout only closes the response, upstream keeps running
setTimeout(() => res.end(), 30000);
await pipeline(fetchStream, res);
```

::: tip The fix

On timeout, you need to destroy the stream itself, or use an [<VPIcon icon="fa-brands fa-firefox"/>`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) with a timeout, which kills the entire chain. [<VPIcon icon="fa-brands fa-firefox"/>`AbortSignal.timeout()`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static) was purpose-built for this:

```js
// Fixed: timeout aborts the entire pipeline, not just the response
const signal = AbortSignal.timeout(30000);
await pipeline(fetchStream, res, { signal });
```

When the 30 seconds expire, the signal fires, and `pipeline()` destroys every stream in the chain — upstream and downstream. The rejected promise’s error will have the code `ABORT_ERR`, which you can catch and handle distinctly from stream errors.

:::

### 4. You’re tying database teardown to network speed

This is a major architectural flaw that causes connection starvation. Developers often release their database connections when the downstream HTTP response finishes. But tying your database connection lifecycle to the HTTP client’s network speed is incredibly dangerous. If a mobile user on a slow 3G connection takes five minutes to download the export, you are holding a database worker open for five minutes just waiting for the TCP socket to close.

```js
// Broken: ties database connection to downstream network latency
res.on("close", () => db.releaseConnection());
```

The fix: decouple your upstream resources from your downstream delivery. Bind the cleanup logic directly to the database cursor’s own `close` or `end` event. The moment the database has yielded its last row, release the connection back to the pool immediately. Let Node.js buffer the remaining rows into memory or flush them to the slow network socket, but don’t starve your database.

```js
// Fixed: releases connection the moment the cursor finishes, regardless of network speed
const cursor = db.cursor();
cursor.on("close", () => db.releaseConnection());

await pipeline(cursor, csvTransform, res);
```

For even more precise lifecycle tracking, [<VPIcon icon="fa-brands fa-node"/>`stream.finished()`](https://nodejs.org/api/stream.html#streamfinishedstream-options-callback) lets you listen for when a specific stream is “done” — whether it completed normally, errored, or was destroyed. It’s the surgical version of binding to individual events:

```js
import { finished } from "node:stream/promises";

const cursor = db.cursor();

// Release connection when cursor is done for ANY reason (success, error, or destroy)
finished(cursor).then(() => db.releaseConnection());

await pipeline(cursor, csvTransform, res);
```

### 5. `pipeline()` worked, but the source kept going anyway

This is the one that catches people who did everything right. You used `pipeline()`. A downstream transform throws. `pipeline()` tears down the chain and rejects the promise. But between the moment the error fires and the moment the source receives the destroy signal, the source can push a few more chunks. The `destroy()` call is asynchronous — it schedules the internal `_destroy` callback on the next tick. In that window, an active database cursor can push chunks that allocate memory, which never gets cleaned up.

```js
// Broken: relies entirely on pipeline() for source teardown
try {
  await pipeline(source, transform, res);
} catch (err) {
  log.error("Pipeline failed");
}
```

The fix: in your `catch` block, explicitly call `source.destroy(err)` even though `pipeline()` should have handled it. Belt and suspenders. The redundant destroy call is [<VPIcon icon="fa-brands fa-node"/>a no-op](https://nodejs.org/api/stream.html#readabledestroyerror) if the source is already destroyed, and it saves you if it isn’t.

```js
// Fixed: explicit fallback teardown
try {
  await pipeline(source, transform, res);
} catch (err) {
  source.destroy(err);
  log.error("Pipeline failed");
}
```

---

## The Modern Playbook: How to Stream Without Leaking

Here’s what I do now, after learning most of this the hard way. Five rules. None of them is complicated. All of them would have saved me hours of heap snapshot archaeology.

### Rule 1: `pipeline()` over `.pipe()`, always

Every stream chain goes through [<VPIcon icon="fa-brands fa-node"/>`pipeline()`](https://nodejs.org/api/stream.html#streampromisespipelinesource-transforms-destination-options). No exceptions. It handles teardown on error, teardown on completion, and backpressure propagation across the entire chain. One import, one function call, one `try/catch`.

```js
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";

try {
  await pipeline(
    createReadStream("./input.csv"),
    createGzip(),
    createWriteStream("./output.csv.gz")
  );
} catch (err) {
  console.error("Pipeline failed:", err);
}
```

If the gzip transform fails, the read stream closes, and the write stream closes. If the write stream’s disk fills up, everything upstream stops. If the read stream hits a permission error, everything downstream gets destroyed. You don’t wire any of that yourself.

### Rule 2: Respect the boolean

Any time you call [<VPIcon icon="fa-brands fa-node"/>`.write()`](https://nodejs.org/api/stream.html#writablewritechunk-encoding-callback) manually, you check what it returns. If it returns `false`, you stop and wait for the [<VPIcon icon="fa-brands fa-node"/>`drain`](https://nodejs.org/api/stream.html#event-drain) event. This is the fundamental pattern underlying everything else in Node.js streams. Memorize it. If you’re writing a custom transform or piping data between two streams by hand, this check goes in every single write path.

#### The “Drain Hang” Trap

There is a dangerous edge case you must be aware of when waiting for drain. If you write:

```js
// Dangerous: can hang forever if the stream errors or closes
if (!ok) {
  await once(writable, "drain");
}
```

If the writable stream throws an error or closes *before* it drains, the `drain` event will never fire. Your async function will hang in memory forever, suspended in an unresolved `await`.

The intuitive fix is to race the `drain` event against the `error` event using `Promise.race()`. But doing so introduces a subtle event-loop memory leak: whichever event “loses” the race leaves a dangling listener attached to the stream via [<VPIcon icon="fa-brands fa-node"/>`events.once`](https://nodejs.org/api/events.html#eventsonceemitter-name-options). Under heavy load, this will eventually trigger a `MaxListenersExceededWarning` and leak memory.

The truly bulletproof, modern fix is to wrap the race in a `try/finally` block and pass an [<VPIcon icon="fa-brands fa-firefox"/>`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) to explicitly clean up the dangling listener:

```js
import { once } from "node:events";

// Bulletproof: races drain against errors, cleans up the losing listener
if (!ok) {
  const ac = new AbortController();

  // When ac.abort() fires in the finally block, it causes the losing
  // once() to reject with AbortError. We must catch and discard that
  // specific error, while re-throwing any real stream errors.
  const swallowAbort = (err) => { if (err.name !== "AbortError") throw err; };

  try {
    await Promise.race([
      once(writable, "drain", { signal: ac.signal })
        .catch(swallowAbort),
      once(writable, "error", { signal: ac.signal })
        .then((args) => Promise.reject(args[0]))
        .catch(swallowAbort)
    ]);
  } finally {
    ac.abort(); // Destroys the dangling listener from the losing event
  }
}
```

The part that trips people up is `swallowAbort`. Why does the losing `once()` throw at all? Because `events.once` returns a Promise, and a Promise must either resolve or reject — it can’t silently detach and disappear. When `ac.abort()` fires in the `finally` block, it forces every `once()` still waiting on an event to reject with an `AbortError`. That’s the cleanup mechanism. Without `swallowAbort`, that rejection would propagate as an unhandled error and crash your process. With it, the `AbortError` gets caught and discarded, while any real stream error from the `error` listener still propagates normally.

The result: if the downstream socket crashes, your loop immediately throws with the real error. And the losing listener leaves zero garbage behind on the stream’s event emitter.

### Rule 3: Destroy what you create

If you open a stream, you own its lifecycle. Don’t rely on garbage collection to close file descriptors. It won’t do it fast enough in a server that handles thousands of requests.

Use `try/finally` blocks around async iterators. Pass [<VPIcon icon="fa-brands fa-firefox"/>`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) signals into `pipeline()` so you can tear down entire chains from the outside. When a client disconnects, when a timeout fires, when your health check fails, you need a way to kill every stream that request touched.

```js
const ac = new AbortController();
res.on("close", () => ac.abort());

try {
  await pipeline(source, transform, res, { signal: ac.signal });
} catch (err) {
  if (err.name === "AbortError") {
    console.log("Client disconnected, pipeline aborted cleanly.");
  } else {
    throw err;
  }
}
```

Client closes the tab? `ac.abort()` fires. Every stream in the chain gets destroyed. No orphaned cursors, no dangling sockets.

For streams you consume via async iterators outside of `pipeline()`, enforce the same discipline:

```js
const fileStream = createReadStream("./large-file.log");

try {
  for await (const chunk of fileStream) {
    // process chunk
  }
} finally {
  // Belt and suspenders: ensure the stream is destroyed even if
  // the iterator's internal .return() didn't fire for some reason
  if (!fileStream.destroyed) fileStream.destroy();
}
```

### Rule 4: Profile before production

Don’t wait for Kubernetes to tell you something is wrong. Catch it locally.

Run your service with [<VPIcon icon="fa-brands fa-node"/>`--max-old-space-size=128`](https://nodejs.org/api/cli.html#--max-old-space-sizesize-in-mib) during load testing. This artificially constrains the V8 heap so memory leaks crash fast instead of simmering for hours. Take a heap snapshot right before the crash and load it in [<VPIcon icon="fa-brands fa-chrome"/>Chrome DevTools](https://developer.chrome.com/docs/devtools/memory-problems/).

Here is what you are actually looking for in that snapshot. Filter the “Summary” tab for `WritableState`. Sort by “Retained Size”. You will likely see a single instance holding 90% of your entire heap.

Expand that `WritableState` object and look for its internal queue. In modern Node, this is the `buffered` array (or a `bufferedRequest` linked list in older versions). Expand that, and you’ll find the exact archaeology you’re looking for:

![Chrome DevTools heap snapshot showing WritableState retaining majority of heap](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/05/devtools-heap-snapshot-writable-state.png?resize=1024%2C666&ssl=1)

Chrome DevTools heap snapshot filtered for `WritableState`. The single instance retaining 92% of the heap is the writable stream’s internal buffer queue — 1,834 unprocessed chunks that the producer pushed while ignoring the `false`return value.

Every single object in that array is a chunk your producer pushed, and the writable blindly accepted, while returning `false`. That is your smoking gun.

You don’t even need a heap snapshot to monitor this in real-time. Node exposes the exact size of this queue via [<VPIcon icon="fa-brands fa-node"/>`stream.writableLength`](https://nodejs.org/api/stream.html#writablewritablelength) (or `stream._writableState.length` in older versions). If you are investigating a production incident, add a quick diagnostic log:

```js
setInterval(() => {
  console.log(`[Diagnostic] writableLength: ${writable.writableLength} bytes`);
}, 1000);`
```

If backpressure is working, you’ll see that the number is bound strictly to your `highWaterMark`:

```plaintext
[Diagnostic] writableLength: 65536 bytes
[Diagnostic] writableLength: 65536 bytes
[Diagnostic] writableLength: 65536 bytes
```

But if you have a leak, you’ll see the exact moment the producer runs away from the consumer. The queue size simply detaches from reality and climbs until the process dies:

```plaintext
[Diagnostic] writableLength: 65536 bytes
[Diagnostic] writableLength: 1425890 bytes
[Diagnostic] writableLength: 5892304 bytes
[Diagnostic] writableLength: 12059382 bytes
...
[Diagnostic] writableLength: 3840192300 bytes
// FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
```

It’s that simple.

If you need to capture a heap snapshot from a running production process without restarting it, Node.js supports the [<VPIcon icon="fa-brands fa-node"/>`--heapsnapshot-signal`](https://nodejs.org/api/cli.html#--heapsnapshot-signalsignal) flag. Start your service with `--heapsnapshot-signal=SIGUSR2`, and when memory starts climbing, send `kill -USR2 <pid>` from the host. Node writes a `.heapsnapshot` file to the working directory without stopping the process. No code changes, no restarts, no attaching a debugger.

For a broader view of your whole pipeline, run your service through [<VPIcon icon="fas fa-globe"/>clinic.js Bubbleprof](https://clinicjs.org/bubbleprof/). It traces async operations and visualizes where your event loop is stalling. Backpressure stalls show up as long idle gaps between stream operations. You can see exactly which stream in the chain is the bottleneck.

### Rule 5: Test your backpressure handling

Don’t rely solely on production profiles. You can write a unit test to catch this. Create a mock writable that explicitly verifies whether the producer waited when the buffer filled up.

The strategy: set an absurdly low `highWaterMark` (2 objects), simulate a slow consumer with `setTimeout`, then feed it 100 chunks. If the producer respects backpressure, the internal queue will never grow past `highWaterMark + 1` (the one chunk being actively processed). If it doesn’t, all 100 chunks land in the queue synchronously.

```js
import { Writable } from "node:stream";
import { pipeline } from "node:stream/promises";

it("should respect backpressure", async () => {
  let maxBufferLength = 0;
  let drainEmitted = false;

  const slowWritable = new Writable({
    highWaterMark: 2,
    objectMode: true,
    write(chunk, enc, cb) {
      // Track the maximum size the internal queue reached
      if (this.writableLength > maxBufferLength) {
        maxBufferLength = this.writableLength;
      }
      setTimeout(cb, 10); // Simulate a slow consumer
    }
  });

  slowWritable.on("drain", () => {
    drainEmitted = true;
  });

  await pipeline(yourProducer(100), slowWritable);

  // If the producer ignored backpressure, Node queues all chunks
  // synchronously, and maxBufferLength will spike to 100.  expect(maxBufferLength).toBeLessThanOrEqual(3);
  
  // Confirm the stream actually paused and resumed
  expect(drainEmitted).toBe(true);
});
```

This test is your canary. Run it in CI. If someone refactors your producer and accidentally drops the drain check, this test catches it before the PR merges.

### Where this is heading

Node.js TSC member [Matteo Collina (<VPIcon icon="iconfont icon-github"/>`mcollina`)](https://github.com/mcollina) has been pushing the ecosystem toward what he calls a “stream-less future.” The idea is to replace the legacy Stream API with pure [<VPIcon icon="fa-brands fa-firefox"/>async generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator) piped through `pipeline()`. He’s advocated this approach across multiple [<VPIcon icon="fas fa-globe"/>NodeCongress](https://nodecongress.com/) and [<VPIcon icon="fas fa-globe"/>JSNation](https://jsnation.com/) keynotes, and it’s increasingly reflected in how the Node.js core team designs new streaming APIs.

Why is this the future? Because it fundamentally flips the control flow. The legacy Stream API is push-based: producers throw data downstream until the downstream yells “stop.” Generators are pull-based: the downstream requests the next chunk, and the upstream calculates it on demand.

When you pass a generator to `pipeline()`, Node’s internal machinery handles the translation. You don’t manage events. You don’t wire listeners. You write linear code that yields chunks, and `pipeline()` only pulls the next iteration when the writable side’s buffer has space.

Here’s what a fully async generator pipeline looks like in practice, seamlessly blending a database cursor, a transformation, and a downstream HTTP response:

```js
import { pipeline } from "node:stream/promises";

// Generator 1: The producer (fetches data on demand)
async function* fetchRows(dbCursor) {
  for await (const batch of dbCursor) {
    for (const row of batch) {
      yield row;
    }
  }
}

// Generator 2: The transform (processes only when pulled)
async function* formatCSV(source) {
  for await (const row of source) {
    yield `${row.id},${row.name},${row.total}\n`;
  }
}

// Pipeline handles the backpressure bridging automatically
await pipeline(
  fetchRows(cursor),
  formatCSV,
  res
);`
```

No stream classes. No `Transform` instances with confusing object mode settings. No manual drain checks. The memory profile stays entirely flat because the generator yields exactly one chunk at a time, and `pipeline()` only pulls the next iteration when `res` is ready.

That last point is the key. With legacy streams, backpressure is something your code must actively cooperate with — checking the `.write()` return value, awaiting `drain`, wiring up the whole dance. With generators, the backpressure cooperation is structural. Your generator physically cannot produce the next chunk until `pipeline()` asks for it. You don’t check a boolean because there’s no boolean to check. The pull-based model eliminates the entire category of bug.

There’s one more problem this solves. You’ve built a great generator pipeline for your CSV export endpoint. Then the reports endpoint needs the same CSV-plus-gzip transformation. Then the batch job needs it too. You copy-paste the `pipeline()` call three times. Someone fixes a bug in one copy but not the others. Now you have three pipelines that should be identical but aren’t.

[<VPIcon icon="fa-brands fa-node"/>`stream.compose()`](https://nodejs.org/api/stream.html#streamcomposestreams) (stabilized in Node.js 22) exists for exactly this. It stitches multiple streams or async generators into a single [<VPIcon icon="fa-brands fa-node"/>`Duplex`](https://nodejs.org/api/stream.html#class-streamduplex) stream — a reusable unit that you define once and plug into any pipeline:

```js
import { compose } from "node:stream";

// Define the transformation once
const csvExporter = compose(formatCSV, compressGzip);

// Use it anywhere — same behavior, single source of truth
await pipeline(fetchRows(cursor), csvExporter, res);
```

Where `pipeline()` is for *consuming* a chain, `compose()` is for *packaging* a chain into something other code can consume. The distinction matters when your streaming logic starts getting shared across endpoints.

Async generators do introduce a slight CPU and microtask overhead compared to raw streams. This is rarely a bottleneck for IO-bound tasks like CSV exports or network requests, but if you’re writing ultra-hot paths, profile the abstraction cost against your specific workload.

The harder question is teardown. This isn’t a generator-specific problem — it’s the same Rule 3 (Destroy what you create) that applies to every pipeline in this article. The internal bridging between async generators and legacy streams has a fragile history across Node.js versions: patched memory leaks in one release, premature-close regressions in the next. The defense is the same one you’d use for any `pipeline()` call — pass an `AbortSignal` so the chain tears down cleanly when the downstream socket closes:

```js
const ac = new AbortController();
res.on("close", () => ac.abort());

await pipeline(
  fetchRows(cursor),
  formatCSV,
  res,
  { signal: ac.signal }
);
```

This isn’t a weakness of generators. It’s the standard production hygiene you apply to every stream chain, regardless of how it’s built.

---

## The Fix is Simple, The System is Not

The CSV export service from Part 1? The immediate fix was four lines. Check the boolean return from `.write()`. If `false`, await the `drain` event. Resume. Memory flatlined at 180MB instead of climbing to 3.8GB. The pods stopped dying. The Slack threads went quiet.

But that four-line fix was the beginning, not the end. Every section of this article exists because someone shipped correct-looking code that passed tests, survived code review, and ran fine for months — until a client disconnected at the wrong moment, a timeout closed the wrong end of a pipeline, or a database connection sat idle for five minutes while a slow socket drained. Node.js streams are built on a trust system, and when you break that trust, nothing fails loudly. The process just quietly accumulates damage until something gives.

`pipeline()` over `.pipe()`. Check the boolean. Destroy what you create. Profile with a constrained heap before your orchestrator does it for you. Write the backpressure test that catches the regression before the PR merges. None of it is complicated. The hard part was always knowing it mattered.

::: info Article Series

```component VPCard
{
  "title": "Your Node.js Streams Aren’t Backpressuring. They’re Silently Eating Your Memory.",
  "desc": "Memory management in Node.js streaming applications can be quite complex. Streams don't inherently protect against memory exhaustion and we get into common pitfalls developers face.",
  "link": "/master.dev/your-node-js-streams-arent-backpressuring-theyre-silently-eating-your-memory.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The Production Playbook for Node.js Stream Leaks",
  "desc": "Short story: `pipeline()` over `.pipe()` and destroy what you create.",
  "link": "/master.dev/the-production-playbook-for-node-js-stream-leaks.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Production Playbook for Node.js Stream Leaks",
  "desc": "Short story: `pipeline()` over `.pipe()` and destroy what you create.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/the-production-playbook-for-node-js-stream-leaks.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
