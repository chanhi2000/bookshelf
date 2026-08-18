---
lang: en-US
title: "High-Frequency Real-Time Data in React: From Ring Buffers to OffscreenCanvas"
description: "Article(s) > High-Frequency Real-Time Data in React: From Ring Buffers to OffscreenCanvas"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > High-Frequency Real-Time Data in React: From Ring Buffers to OffscreenCanvas"
    - property: og:description
      content: "High-Frequency Real-Time Data in React: From Ring Buffers to OffscreenCanvas"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/high-frequency-real-time-data-in-react-from-ring-buffers-to-offscreencanvas.html
prev: /programming/js/articles/README.md
date: 2026-08-19
isOriginal: false
author:
  - name: Vineeth Pawar
    url: https://freecodecamp.org/news/author/vpawar/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c3ffaae8-51d5-4add-9a9e-e49443e49746.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="High-Frequency Real-Time Data in React: From Ring Buffers to OffscreenCanvas"
  desc="React is great at many things. But if you've ever tried pushing thousands of data points per second through it, you'll quickly learn that React isn't a firehose. It's more like a garden hose. Try forc"
  url="https://freecodecamp.org/news/high-frequency-real-time-data-in-react-from-ring-buffers-to-offscreencanvas"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c3ffaae8-51d5-4add-9a9e-e49443e49746.png"/>

React is great at many things. But if you've ever tried pushing thousands of data points per second through it, you'll quickly learn that React isn't a firehose. It's more like a garden hose.

Try forcing too much through it, and either the lawn floods (your DOM) or the pipe bursts (your app).

There's a second observation that pairs with the first. Your laptop has 8 to 16 CPU cores. Your React app uses 1 of them, almost always. The main thread handles JavaScript, the DOM, layout, and paint setup. The other cores sit idle while the main thread struggles to keep a 60fps frame budget.

Both problems have the same shape: you need to keep React out of the hot path, and you need to use more than one thread. The patterns that get you there also happen to be the patterns behind Figma's canvas engine, Bloomberg's trading dashboards, and every biosignal viewer you've seen.

In one project, I had to visualise 19 EEG (brainwave) channels, each sending about 1,000 data points per second. That's almost 19,000 updates per second. If you feed all of that directly into React, the UI doesn't just slow down. It faints dramatically.

This article is the end-to-end architecture I landed on: the ring buffers, workers, shared memory, off-main rendering, and specific patterns that hold up under sustained multi-hour load.

::: note Prerequisites

To get the most out of this article, you'll want:

- **Working knowledge of React 18 or 19.** You should be comfortable with `useState`, `useEffect`, `useRef`, and the difference between mounting and re-rendering.
- **TypeScript basics.** Most examples are in TypeScript. You should be able to read type annotations without stopping.
- **A rough sense of the browser main thread and event loop.** You don't need to have written a Web Worker, but knowing what "blocking the main thread" means will make Step 3 easier.
- **Familiarity with Canvas 2D or a chart library** is a plus, not a requirement. If you've drawn anything on a canvas, you're ready.
- **A laptop that can run modern Chrome or Edge.** The examples rely on `SharedArrayBuffer`, `OffscreenCanvas`, and Atomics, which need a Chromium-based browser and cross-origin isolation (covered later in the article).

You don't need prior experience with Web Workers, ring buffers, or WebGL. This article introduces each in the context of a real problem.

:::

---

## Who's Already Doing This?

The patterns in this article aren't experimental. They're the architecture behind production apps that ingest and render high-frequency data:

- **Trading and finance dashboards** (Bloomberg, Hyperliquid, dYdX, every serious market viewer) push thousands of price ticks per second through canvas-rendered grids.
- **Figma** runs its entire canvas engine in WebAssembly inside a worker. The main thread renders React for the chrome only.
- **Google Docs and Microsoft Loop** run their document models in workers, with the DOM as the projection.
- **Charting libraries** like LightningChart, uPlot, Plotly, and ECharts draw on Canvas or WebGL and treat React as a wrapper.
- **Biosignal, ECG, EEG, and motion-capture apps** routinely process samples at 1kHz or higher and stream them to live plots.
- **Observability and APM tools** (Datadog live tail, Grafana real-time panels) decouple ingestion from render to keep tabs responsive.
- **Audio editors and visualisers**, plus anything using the Web Audio API with a waveform display.
- **transformers.js and ONNX Runtime Web** place ML inference in workers by default.

Different domains, same trick: React owns what changes rarely, something else owns what changes at refresh rate, and heavy work happens on threads that aren't the main one.

---

## The 1kHz Math

Some numbers to make the problem concrete.

- A sample arrives every 1ms.
- A 60Hz display refreshes every 16.67ms.
- So in one frame, you'll receive roughly **16 to 17 samples per stream**.
- With 19 active streams (the EEG case), that's **300 to 320 samples per frame**.

If you `setState` on each sample, React tries to do around 19,000 renders per second. It can't, so it skips frames. The UI stutters and your laptop fans take off.

If you `setState` once per frame with the batch of ~320 samples, React does 60 renders per second, which is easy.

That single reframe is the entire trick, and it will echo through every step below.

---

## Where it Usually Goes Wrong

Here's the version of the code I see in most real-time React apps the first time they try this. It looks reasonable. It's also the source of every bit of jank the team will spend the next two weeks tracking down.

```tsx
import { useEffect, useState } from "react";

export default function NaiveChart({ socket }) {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    socket.on("newPoint", (point: number) => {
      setData((prev) => [...prev, point]); // re-renders every time
    });
  }, [socket]);

  return <div>{data.length} points</div>;
}
```

Three problems baked into seven lines:

1. **Every incoming sample triggers a re-render:** At 1kHz that's 1,000 renders per second. React was never going to be happy about that.
2. `[...prev, point]` **allocates a new array on every push:** At 1kHz that's a new array per millisecond, all of which the garbage collector has to clean up. The heap climbs, GC pauses lengthen, the fan kicks in.
3. **There's no upper bound on the array:** Run this for an hour and you have 3.6 million numbers in memory, all of which React has to consider on every render.

The fix isn't one trick. It's a stack of small ones, each addressing one of those failure modes and, eventually, the deeper problem of the main thread being the only thread.

---

## The Mental Model: Air Traffic Control Plus a Kitchen Brigade

Before the code, two metaphors that will keep the pieces straight.

**First, air traffic control:** Three roles, one airport.

- The **control tower** (your store) sees every plane (every sample) and tracks where it is.
- The **ground crew** (React) sets up the runways and gates: the layout that planes use.
- The **pilots** (the draw loop) actually fly. They look at the tower for clearance and act every few seconds.

The control tower doesn't pull a gate from the ground crew every time a plane moves. It just holds the data. The ground crew rearranges gates when the schedule changes, which is rare. The pilots act constantly, at their own rate, off the tower's data.

**Second, a kitchen brigade:** A restaurant kitchen at peak hour. One head chef can't make every dish. The classical brigade has stations: sauce, fish, pastry, garde manger, plating, and service. Each station owns a slice of the meal. The expediter coordinates timing.

- The **expediter** is your main thread.
- The **stations** are your workers.
- The **plating window** is your shared memory.
- The **dishes going to tables** are your rendered frames.

A single chef trying to do everything serially is your main-thread-only frontend. A brigade is your worker-based one. The brigade is faster because cuts, sauces, and sears happen in parallel, not because any one cook is faster than the soloist. The expediter doesn't cook, they orchestrate.

Everything below is a specific application of these two ideas.

---

## Step 1: Stop Putting Samples in React State

The single biggest mistake in real-time React apps is treating every sample as state, which it isn't. State is what determines *which components exist and how they're arranged*. A live plot is one component. The 60,000 samples scrolling across it aren't 60,000 pieces of state. They're one buffer.

You want a store that lives outside React. A ring buffer over a typed array gives you constant-time inserts and a bounded heap:

```tsx
type Listener = () => void;

export function createSampleStore(capacity: number) {
  const buf = new Float32Array(capacity);
  let head = 0;
  let size = 0;
  const listeners = new Set<Listener>();

  return {
    push(sample: number) {
      buf[head] = sample;
      head = (head + 1) % capacity;
      if (size < capacity) size++;
    },
    pushBatch(samples: Float32Array) {
      for (let i = 0; i < samples.length; i++) {
        buf[head] = samples[i];
        head = (head + 1) % capacity;
        if (size < capacity) size++;
      }
    },
    read(): Float32Array {
      if (size < capacity) return buf.subarray(0, size);
      const out = new Float32Array(capacity);
      out.set(buf.subarray(head));
      out.set(buf.subarray(0, head), capacity - head);
      return out;
    },
    subscribe(l: Listener) {
      listeners.add(l);
      return () => listeners.delete(l);
    },
  };
}
```

Notice what's not here: no `useState`, no setter, no React anything. It's just plain JavaScript. The store can accept a million pushes per second and React won't care, because React isn't subscribed.

Here are the ring buffer mechanics, visualised:

![Ring buffer with eight indexed slots, a head pointer advancing each push and wrapping around when it reaches the end, providing constant-time inserts and a bounded heap](https://cdn.hashnode.com/res/hashnode/image/upload/v1779361162753/2374fc6e-429c-4a8a-8b31-30fb51c6052c.png)
<!-- TODO: mermaid화 -->

We have head advances on every push and wraps at capacity. Reads pull a window of the last N samples in chronological order. The result is constant time and a bounded heap.

A simpler stop-gap, when you don't want a typed buffer yet, is to put the rolling window in a ref instead of state:

```tsx
import { useEffect, useRef } from "react";

export default function RefChart({ socket }) {
  const bufferRef = useRef<number[]>([]);

  useEffect(() => {
    socket.on("newPoint", (point: number) => {
      bufferRef.current.push(point);
      if (bufferRef.current.length > 1000) {
        bufferRef.current.shift();
      }
    });
  }, [socket]);

  return <div>Streaming {bufferRef.current.length} points</div>;
}
```

This is the "10x faster than `NaiveChart`, still not great" version. The render doesn't trigger on every push, but you also won't see updates unless something else re-renders. For real plotting, pair the ref with a `requestAnimationFrame` draw loop (see Step 2).

---

## Step 2: Separate Shape from Values

React renders when the *shape* of the UI changes. New plot? Re-render. Removed plot? Re-render. Switched from line to bar? Re-render. None of those happen at 1000Hz. They happen a few times a minute, when the user clicks something.

The *values* inside each plot change at the data rate. Those should never touch React.

Concretely:

```tsx
function LivePlot({ store }: { store: SampleStore }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let raf = 0;
    const draw = () => {
      const samples = store.read();
      drawSeries(ctx, samples);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [store]);

  return <canvas ref={canvasRef} width={1200} height={300} />;
}
```

React renders this component once. The `useEffect` runs once. The `requestAnimationFrame` loop reads from the store on every frame.

The store can be pushed to at any rate the source can manage. The user sees a smooth 60fps line whether the source is sending 100 samples per second or 100,000. The instinct to wire `samples` into `useState` is wrong, so resist it.

### Selective Subscriptions When You Do Need React in the Loop

Sometimes a component genuinely depends on the data (summary stats, axis labels, or a live value badge). For that, use a store with selective subscriptions so only the components that care re-render. Zustand makes this trivial:

```ts
import { create } from "zustand";

const useDataStore = create<{ latest: number | null; setLatest: (v: number) => void }>((set) => ({
  latest: null,
  setLatest: (v) => set({ latest: v }),
}));

function LatestBadge() {
  // Only re-renders when latest changes, not when other store fields do.
  const latest = useDataStore((state) => state.latest);
  return <div>Latest: {latest?.toFixed(2)}</div>;
}
```

Pair this with RAF coalescing on the writes (call `setLatest` once per frame, not once per sample) and you get a React component that updates smoothly at 60fps no matter what the data rate is.

`useSyncExternalStore` is the native equivalent and works against any pub-sub store, including the ring buffer above. Use whichever feels lighter for your team.

---

## Step 3: Move Heavy Work Off the Main Thread

The store and imperative draw loop handle React's contribution to the bottleneck. The main thread itself is still doing all the ingest, parsing, and math. Everything past ~50,000 samples per second per stream needs more.

The browser gives you four escape hatches: Web Workers, transferable objects, `SharedArrayBuffer` + Atomics, and `OffscreenCanvas`. Each solves a specific problem.

![Browser process model with the renderer process containing the main thread, dedicated workers, shared workers, a service worker, and a compositor thread; the GPU process containing the GPU thread for WebGL and WebGPU; and the network process containing the network thread for fetch and WebSocket, with communication between main and worker types happening via postMessage](https://cdn.hashnode.com/res/hashnode/image/upload/v1779369113008/d1d608c9-8078-4339-91e1-c9ee221bf014.png)
<!-- TODO: mermaid화 -->

The main thread runs JavaScript, the DOM, layout, and paint setup. Workers are isolated JavaScript contexts with their own event loops. They can't touch the DOM, they can't share memory by default, and every cross-thread message is async and copied unless you transfer it.

Three properties matter as you design against this model:

- **Workers can't touch the DOM:** That's the point. They run pure JavaScript. Perfect for data work, network parsing, math, codecs, ML inference.
- **Communication is async:** No shared variable to read in the middle of a function. Plan APIs around requests and events.
- **Data copies, unless you transfer or share it:** Structured clone is the default, transferable objects skip the copy, and `SharedArrayBuffer` skips it permanently.

### Dedicated Workers in Practice

Here's a minimal worker for ingest:

```ts title="worker.ts"
self.onmessage = (event) => {
  const { samples } = event.data;
  // Decode, filter, decimate. The main thread doesn't see any of this.
  const summary = computeStats(samples);
  postMessage(summary);
};
```

```tsx
// main thread
import { useEffect, useRef } from "react";

export default function WorkerChart({ socket, store }) {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });

    workerRef.current.onmessage = (event) => {
      store.pushBatch(event.data); // pre-processed, cheap to ingest
    };

    socket.on("newPoint", (point: number) => {
      workerRef.current?.postMessage({ point });
    });

    return () => workerRef.current?.terminate();
  }, [socket, store]);

  return <LivePlot store={store} />;
}
```

Three things to internalise about workers.

First, workers are real processes from the runtime's perspective. Each has its own heap, event loop, and `globalThis`. Starting one costs about 1 to 5ms. Don't spin them up inside hot paths.

Second, module workers are the modern default. `type: "module"` enables ES modules inside the worker, including `import`. The legacy `importScripts` is for classic workers, so avoid it for new code.

Finally, bundlers know about workers. Vite, Webpack, esbuild, and Rspack all detect the `new Worker(new URL("./x.ts", import.meta.url))` pattern and produce a separate chunk for the worker.

### A Worker Pool That Scales with Cores

For CPU-bound work (parsing binary frames, decoding audio, computing FFTs), a pool spreads jobs across all available cores:

```ts
class WorkerPool {
  private workers: Worker[];
  private next = 0;
  private pending = new Map<string, (result: unknown) => void>();

  constructor(scriptUrl: URL, size = Math.max(1, navigator.hardwareConcurrency - 1)) {
    this.workers = Array.from({ length: size }, () => {
      const w = new Worker(scriptUrl, { type: "module" });
      w.onmessage = (event) => {
        const cb = this.pending.get(event.data.id);
        if (!cb) return;
        this.pending.delete(event.data.id);
        cb(event.data.result);
      };
      return w;
    });
  }

  async run<T>(kind: string, payload: unknown, transferables: Transferable[] = []): Promise<T> {
    const id = crypto.randomUUID();
    const result = new Promise<T>((resolve) => this.pending.set(id, resolve as (r: unknown) => void));
    const worker = this.workers[this.next];
    this.next = (this.next + 1) % this.workers.length;
    worker.postMessage({ id, kind, payload }, transferables);
    return result;
  }
}

export const pool = new WorkerPool(new URL("./decoder.worker.ts", import.meta.url));
```

Round-robin distribution with one worker per core minus one. Pending requests resolve when the matching response arrives. It's cheap, predictable, and scales linearly until you hit memory bandwidth limits.

### Transferable Objects, the No-copy Path

`postMessage` clones the payload by default. Cloning a 10MB buffer takes milliseconds and doubles your memory use. The fix is to **transfer** the buffer instead.

![Side-by-side comparison of postMessage modes: default postMessage clones the buffer with a copy landing in both the main heap and the worker heap via structured clone, while Transferable transfers ownership so the same buffer exists once with ownership moving from main to worker](https://cdn.hashnode.com/res/hashnode/image/upload/v1779369124743/0a53c521-618c-48ec-a5c5-935e1acdbf1a.png)
<!-- TODO: mermaid화 -->

The semantics: when you transfer a buffer, the sender loses access. The receiver gains it, with no copy and an O(1) handoff.

```ts
const buf = new ArrayBuffer(10 * 1024 * 1024); // 10 MB
new Uint8Array(buf).set(somePayload);

worker.postMessage({ buf }, [buf]); // second arg = list of transferables
// `buf` is now detached on this side. Accessing it throws.
```

The list of transferable types in 2026 includes `ArrayBuffer` (and any typed-array view backed by one), `MessagePort`, `ImageBitmap`, `OffscreenCanvas`, the stream types (`ReadableStream`, `WritableStream`, `TransformStream`), `RTCDataChannel`, `VideoFrame`, `AudioData`, and the WebTransport streams. The most useful for React plus real-time work are `ArrayBuffer`, `OffscreenCanvas`, and `MessagePort`.

A common pitfall is that forgetting to transfer creates silent slowness. The app works, but it copies every message. Profile worker `postMessage` calls. If they're showing milliseconds for "small" payloads, you're cloning when you should be transferring.

```ts
// Bad: copies every frame.
worker.postMessage({ samples: float32Array });

// Good: transfers the underlying buffer.
worker.postMessage({ samples: float32Array }, [float32Array.buffer]);
```

The buffer is detached after transfer, so the sender needs to re-allocate (or pull from a pool of pre-allocated buffers) if it wants to keep producing.

### SharedArrayBuffer and Atomics

Transfer hands a buffer off. **Sharing** lets both threads see the same memory simultaneously.

```ts
const sab = new SharedArrayBuffer(1024 * 1024); // 1 MB shared
worker.postMessage({ sab });

// Both main and worker now hold references to the same memory.
const viewMain = new Int32Array(sab);
// Inside worker:
// const viewWorker = new Int32Array(event.data.sab);
```

Three properties matter.

`SharedArrayBuffer` needs cross-origin isolation. Your page must be served with `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`. Without these headers, `SharedArrayBuffer` is undefined in the browser. Covered in more detail later in the article.

You also need `Atomics` for synchronisation. Multiple threads writing to the same memory without coordination produces undefined results. `Atomics` gives you compare-and-swap, load, store, add, sub, wait, and notify operations on typed array views.

```ts
const sab = new SharedArrayBuffer(8);
const view = new Int32Array(sab);

// Main thread: wake any worker that's waiting on slot 0.
Atomics.store(view, 0, 1);
Atomics.notify(view, 0, 1);

// Worker: block until slot 0 changes from 0.
const result = Atomics.wait(view, 0, 0); // "ok", "not-equal", or "timed-out"
```

And lock-free ring buffers are the killer app. A producer-consumer queue between two threads with no locking, no `postMessage` round-trip, and no GC pressure. The data sits in the shared buffer. Atomics coordinate read/write positions.

Here's a minimal SPSC (single-producer, single-consumer) ring buffer:

```ts
type SharedRing = {
  data: Float32Array;          // payload
  control: Int32Array;         // [head, tail]
};

function createSharedRing(capacity: number): SharedRing {
  const sab = new SharedArrayBuffer(capacity * 4 + 16);
  const control = new Int32Array(sab, 0, 4);   // [head, tail, ...]
  const data = new Float32Array(sab, 16, capacity);
  return { data, control };
}

function push(ring: SharedRing, value: number): boolean {
  const head = Atomics.load(ring.control, 0);
  const tail = Atomics.load(ring.control, 1);
  const next = (head + 1) % ring.data.length;
  if (next === tail) return false; // full
  ring.data[head] = value;
  Atomics.store(ring.control, 0, next);
  return true;
}

function pop(ring: SharedRing): number | null {
  const tail = Atomics.load(ring.control, 1);
  const head = Atomics.load(ring.control, 0);
  if (tail === head) return null; // empty
  const value = ring.data[tail];
  Atomics.store(ring.control, 1, (tail + 1) % ring.data.length);
  return value;
}
```

The producer writes from one thread. The consumer reads from another, neither blocks, and there's no `postMessage` between them. At signal rates, this is the only architecture that scales.

![Single-producer single-consumer ring buffer over SharedArrayBuffer: the producer (ingest worker) writes at the head pointer and increments it, the consumer (render thread) reads from the tail pointer and increments it, both pointers stored in the shared buffer and updated with atomic operations](https://cdn.hashnode.com/res/hashnode/image/upload/v1779369132294/fcefe558-040e-41d3-b759-a8c10c5d5502.png)
<!-- TODO: mermaid화 -->

For multi-producer or multi-consumer queues, you need compare-and-swap loops (`Atomics.compareExchange`). They get fiddly fast. Most production setups use SPSC where they can and fall back to message-passing where they can't.

### In Electron, Ingest in the Main Process

The same idea applies one level up. With Electron and a native SDK, you can ingest samples in the **main process**, buffer there, and forward batches across IPC at the renderer's refresh cadence. One IPC message per sample at 1kHz will saturate IPC. One IPC message per frame with a batch of 16 samples is trivial.

```ts
// electron main: buffer in Node, flush at 60Hz
let pending: number[] = [];

device.on("sample", (value) => pending.push(value));

setInterval(() => {
  if (pending.length === 0) return;
  const batch = new Float32Array(pending);
  pending = [];
  // Transferable to avoid the structured-clone copy.
  mainWindow.webContents.send("device:samples", batch.buffer, [batch.buffer]);
}, 1000 / 60);
```

```ts
// preload: expose a thin subscription API to the renderer
contextBridge.exposeInMainWorld("device", {
  onSamples: (cb: (samples: Float32Array) => void) => {
    const handler = (_: unknown, buf: ArrayBuffer) => cb(new Float32Array(buf));
    ipcRenderer.on("device:samples", handler);
    return () => ipcRenderer.removeListener("device:samples", handler);
  },
});
```

```tsx
// renderer: feed the store from the bridge
useEffect(() => {
  return window.device.onSamples((batch) => store.pushBatch(batch));
}, []);
```

The renderer thread of the renderer touches only one batch per frame, no matter how fast the device is. The data work happens upstream.

---

## Step 4: Render Off Main with `OffscreenCanvas`

The DOM is single-threaded. The Canvas API used to be too. `OffscreenCanvas` breaks that: a canvas you can transfer to a worker, where it draws independently of main.

```ts
// Main thread
const canvas = canvasRef.current!;
const offscreen = canvas.transferControlToOffscreen();
worker.postMessage({ canvas: offscreen }, [offscreen]);
```

```ts
// Worker
let ctx: OffscreenCanvasRenderingContext2D | null = null;

self.onmessage = (event) => {
  if (event.data.canvas) {
    ctx = event.data.canvas.getContext("2d");
    return;
  }
  if (event.data.samples && ctx) {
    drawSeries(ctx, event.data.samples);
  }
};
```

The main thread is now free to handle clicks, hover, and other interaction without competing with the draw loop. The worker draws at its own rate, against whatever data it has.

Combined with `SharedArrayBuffer`, you get the cleanest real-time rendering pipeline available in the browser:

![Rendering pipeline off the main thread: a data source feeds an ingest worker which writes into a SharedArrayBuffer, which a render worker owning an OffscreenCanvas reads to issue GPU commands that update the DOM, while the main thread reads a summary from the SharedArrayBuffer for React UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1779369135331/1a205236-981d-4df7-8b21-698d15b84a63.png)
<!-- TODO: mermaid화 -->

The ingest worker writes samples into the shared buffer. The render worker reads them and draws. Main only reads summaries (FPS, latest value, channel labels) and renders chrome. No data ever crosses through main's event loop.

For 19-channel signal at 1kHz, this is the only architecture that keeps a guaranteed 60fps on a laptop, with headroom.

---

## Step 5: Decimate Before You Draw

A 1200-pixel-wide canvas can show, at best, 1200 distinct X positions. If you have 60,000 samples in your window and you draw all of them, you do 50 times more work than the user can see.

Pick the right point per pixel column. The "min-max" pattern works well for signals: for each pixel column, find the minimum and maximum value in that range and draw a vertical line between them. This is visually identical to drawing every point, but it's much cheaper.

```ts
function drawDecimated(
  ctx: CanvasRenderingContext2D,
  samples: Float32Array,
  width: number,
) {
  const samplesPerPixel = samples.length / width;
  ctx.beginPath();
  for (let x = 0; x < width; x++) {
    const start = Math.floor(x * samplesPerPixel);
    const end = Math.floor((x + 1) * samplesPerPixel);
    let min = Infinity;
    let max = -Infinity;
    for (let i = start; i < end; i++) {
      const v = samples[i];
      if (v < min) min = v;
      if (v > max) max = v;
    }
    ctx.moveTo(x, scale(min));
    ctx.lineTo(x, scale(max));
  }
  ctx.stroke();
}
```

[<VPIcon icon="fa-brands fa-wikipedia-w"/>Decimation](https://en.wikipedia.org/wiki/Downsampling_(signal_processing)) is the single biggest CPU win in real-time visualisation, and almost nobody does it.

A more visually faithful variant is **LTTB (Largest Triangle Three Buckets)**, an algorithm that picks one representative sample per bucket while preserving the visual shape better than min-max. It's worth the read if you're plotting non-signal data like stock charts where peaks and dips matter individually. Most good chart libraries (uPlot, Plotly, ECharts) include decimation out of the box.

---

## Step 6: Wrap an External Renderer

You don't always need to write the draw loop yourself. React is great at lifecycle management. Imperative chart libraries are great at raw performance. The right move is often to let React mount and unmount the chart while the library handles the fast inner loop.

```tsx
import Uplot from "uplot";
import "uplot/dist/uPlot.min.css";
import { useEffect, useRef } from "react";

export default function UPlotChart({ data }: { data: AlignedData }) {
  const ref = useRef<HTMLDivElement>(null);
  const plotRef = useRef<Uplot | null>(null);

  useEffect(() => {
    const opts = {
      title: "Realtime Chart",
      width: 600,
      height: 300,
      series: [{}, { label: "Signal" }],
    };
    plotRef.current = new Uplot(opts, data, ref.current!);
    return () => plotRef.current?.destroy();
  }, []);

  useEffect(() => {
    plotRef.current?.setData(data); // imperative update, no React render
  }, [data]);

  return <div ref={ref} />;
}
```

uPlot, TimeChart, ECharts, Plotly, LightningChart, and the others all follow this shape: instantiate inside `useEffect`, call `setData` imperatively, and destroy on unmount. React orchestrates and the library renders.

The general pattern, for any imperative renderer, looks like this:

```tsx
function ChartWrapper({ config, data }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = new SomeFastChartLib(ref.current, config);
    chart.setData(data);
    return () => chart.destroy();
  }, [config, data]);

  return <div ref={ref} />;
}
```

This is the highest-ROI move if you're not in a domain where you need pixel-level control over the drawing. Reach for a library first, and only write your own draw loop when no library fits.

---

## Step 7: When Canvas isn't Enough, Reach for WebGL

Canvas 2D handles a few thousand line segments per frame comfortably. Past that, you start spending milliseconds in `stroke()` itself.

WebGL (or its higher-level wrappers like `regl`, `twgl`, `pixi.js`, `deck.gl`) moves the rendering to the GPU. You pay an upfront cost (writing shaders and managing buffers) for the ability to draw millions of points without breaking a sweat.

Here's a minimal WebGL "line strip with a single vertex shader" sketch:

```ts
const gl = canvas.getContext("webgl2")!;

const program = gl.createProgram()!;
// ... compile vertex + fragment shaders, link, get attribute location ...

const samplesBuffer = gl.createBuffer();
function drawWebGL(samples: Float32Array) {
  gl.bindBuffer(gl.ARRAY_BUFFER, samplesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, samples, gl.STREAM_DRAW);
  gl.useProgram(program);
  gl.drawArrays(gl.LINE_STRIP, 0, samples.length);
}
```

The pattern is the same as Canvas 2D: an imperative draw call inside the RAF loop. The difference is the GPU does the actual rasterising. Most real-time charting libraries that claim "millions of points" are doing exactly this under the hood.

![Decision tree comparing rendering options: Canvas 2D for up to a few thousand points, WebGL for tens of thousands or more, and WebGPU for 3D, custom shaders, or compute once stable](https://cdn.hashnode.com/res/hashnode/image/upload/v1779361166770/22241c5c-446b-4026-88fb-33e3caad3831.png)
<!-- TODO: mermaid화 -->

Default to Canvas 2D, and escalate to WebGL only when you can prove Canvas is the bottleneck on the Profiler.

---

## Step 8: Keep Memory Flat

Real-time apps die slowly. They run smoothly for an hour and then the laptop fan kicks in. The cause is almost always memory.

There are three rules that keep the heap calm.

First, use typed arrays for numeric data. A `Float32Array` of 60,000 floats is 240KB. A plain JavaScript array of the same size is around 1.4MB and creates GC pressure on every push.

Second, bound everything. Use ring buffers, not growing arrays. Put caps on history, queues, and pending work. Anything that *can* grow unbounded eventually will.

Third, reuse buffers. Allocate once in setup, and reuse across frames. Allocating a fresh array per frame at 60fps is 60 allocations per second per plot. Multiply by plot count.

```ts
// Bad: fresh array every frame.
function drawFrame() {
  const snapshot = store.read(); // returns a new Float32Array
  drawDecimated(ctx, snapshot, width);
}

// Better: reuse a draw buffer.
const drawBuf = new Float32Array(WINDOW_SIZE);

function drawFrame() {
  store.readInto(drawBuf); // writes into the existing buffer
  drawDecimated(ctx, drawBuf, width);
}
```

These rules aren't React-specific. They're the rules any real-time system follows. The reason they need stating is that React-shaped thinking ("derive a new array each render") is the opposite of what real-time wants.

---

## Step 9: Scheduling Strategies

A worker pool with no scheduling is just a queue. Sometimes you want priority: a user-driven action should jump ahead of a background sweep.

### Priority Queues

A small priority scheduler:

```ts
type Priority = "high" | "normal" | "low";

class PriorityPool {
  private queues: Record<Priority, Job[]> = { high: [], normal: [], low: [] };
  private idle: Worker[];

  enqueue(job: Job, priority: Priority = "normal") {
    if (this.idle.length > 0) {
      const worker = this.idle.pop()!;
      this.dispatch(worker, job);
    } else {
      this.queues[priority].push(job);
    }
  }

  private next(): Job | null {
    for (const p of ["high", "normal", "low"] as const) {
      const j = this.queues[p].shift();
      if (j) return j;
    }
    return null;
  }

  private dispatch(worker: Worker, job: Job) {
    worker.postMessage(job.payload, job.transferables);
    worker.onmessage = (event) => {
      job.resolve(event.data);
      const next = this.next();
      if (next) this.dispatch(worker, next);
      else this.idle.push(worker);
    };
  }
}
```

Three buckets are usually enough: high (user-initiated), normal (steady-state work), low (background sweeps, prefetch, telemetry flushing).

### Chunkable Work

A job that takes 2 seconds blocks a worker for 2 seconds. If you want to keep workers responsive to higher-priority jobs, the job has to be chunkable.

```ts
// In the worker:
self.onmessage = async (event) => {
  const { id, kind, payload } = event.data;
  if (kind === "decode_large") {
    const total = payload.byteLength;
    for (let i = 0; i < total; i += CHUNK) {
      const chunk = decodeChunk(payload, i, Math.min(i + CHUNK, total));
      self.postMessage({ id, kind: "progress", chunk, offset: i });
      // Yield so the worker can check its message queue.
      await new Promise((r) => setTimeout(r, 0));
    }
    self.postMessage({ id, kind: "done" });
  }
  if (kind === "cancel") {
    // ... abort the current job
  }
};
```

Yielding inside a worker isn't free, but it lets the worker process cancellation messages or higher-priority jobs interleaved with the big task. For long jobs (like a firmware flash, large file decode, or big render), this is essential.

### Fan-out and Fan-in

Split a big job into N pieces, dispatch each to a different worker, and gather the results.

```ts
async function decodeFile(buffer: ArrayBuffer): Promise<DecodedFrame[]> {
  const chunks = splitBuffer(buffer, 8);
  const results = await Promise.all(
    chunks.map((chunk) => pool.run<DecodedFrame[]>("decode", chunk, [chunk])),
  );
  return results.flat();
}
```

This gives you linear speedup on parallelisable workloads, up to the worker count. It's critical for batch operations like decoding a recording, summarising a long document, or computing embeddings for a folder.

---

## Step 10: Measure Sustained Performance

A spike on the Profiler is one thing. A slow heap creep over an hour is another. For real-time apps, you measure two things.

First, frame consistency. Are you holding 60fps consistently, or dropping occasional frames? A simple FPS meter:

```ts
let lastTime = performance.now();
let frames = 0;

function rafLoop(now: number) {
  frames++;
  if (now - lastTime >= 1000) {
    const fps = (frames * 1000) / (now - lastTime);
    frames = 0;
    lastTime = now;
    console.log(`fps: ${fps.toFixed(1)}`);
  }
  requestAnimationFrame(rafLoop);
}
requestAnimationFrame(rafLoop);
```

A more honest measure is the worst frame in a window. Average frame time hides the jank.

Second, heap stability. Open DevTools Memory tab, take a heap snapshot, run the app for ten minutes, take another snapshot, and then compare. The diff should be flat. If it's growing, you have a leak: retained listeners, growing arrays, or closures holding onto large objects.

For real apps, wire heap usage and FPS into your analytics so you spot regressions before users complain.

---

## Case Study: 19 EEG Channels

Back to the project that started this article: we have nineteen channels, each at 1kHz, all rendered simultaneously, and all needing to stay smooth across multi-hour recording sessions.

The first build used **LightningChart**. It's powerful, capable, and beautiful. But it's also heavy. Memory usage climbed noticeably, the chart's own internals were doing a lot of work for our use case (which was 19 simple line plots, not full multi-axis financial charts), and the licensing was a friction point.

We switched to **uPlot**. It's tiny, fast, and written specifically for time-series. Memory usage dropped, render time per frame went from "occasionally over budget" to "always under," and my machine stopped sounding like it was about to take off. The chart library change alone bought us most of the headroom we needed.

The architecture around the chart did the rest. The pipeline runs on four threads:

- **One ingest worker** reads from the device SDK over IPC (Electron main process to renderer).
- **One** `SharedArrayBuffer` holds the rolling window for all 19 channels.
- **One render worker** reads the SAB and draws to an `OffscreenCanvas`.
- **Main thread** renders chrome: channel labels, controls, and the FPS meter.

The shared buffer layout is one big `Float32Array` indexed as `[channel * samplesPerChannel + sampleIndex]`. The ingest worker writes new samples and advances per-channel head pointers (stored in an `Int32Array` slice of the SAB). The render worker reads the latest window each frame.

```ts
const CHANNELS = 19;
const WINDOW_SAMPLES = 60_000;

const sab = new SharedArrayBuffer(CHANNELS * WINDOW_SAMPLES * 4 + CHANNELS * 4);
const heads = new Int32Array(sab, 0, CHANNELS);
const samples = new Float32Array(sab, CHANNELS * 4, CHANNELS * WINDOW_SAMPLES);

function writeSample(channel: number, value: number) {
  const head = Atomics.load(heads, channel);
  samples[channel * WINDOW_SAMPLES + head] = value;
  Atomics.store(heads, channel, (head + 1) % WINDOW_SAMPLES);
}
```

The renderer reads the channel buffers, decimates per pixel column, and draws:

```ts title="render.worker.ts"
function drawFrame() {
  const ctx = offscreenCtx;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let ch = 0; ch < CHANNELS; ch++) {
    const start = ch * WINDOW_SAMPLES;
    drawDecimatedRow(ctx, samples.subarray(start, start + WINDOW_SAMPLES), ch);
  }
  requestAnimationFrame(drawFrame);
}
```

On a 2024 M3 MacBook Pro, this holds 60fps with 19 channels at 1kHz, and 144fps if the display supports it. The main thread stays under 1% utilisation. Workers consume the spare cores. The user feels something that used to require a native app.

The lesson, in short: most of the work is choosing the right tool for the inner loop, and getting out of its way.

---

## Benchmarks: Single Thread vs Multi-Thread

Here are numbers from running comparable workloads on a 2024 M3 MacBook Pro. They're indicative, not promissory.

| Workload | Main thread only | Worker pool | Workers + SAB | Workers + SAB + OffscreenCanvas |
| --- | --- | --- | --- | --- |
| Parse 100MB binary file | 4.2s (UI frozen) | 1.1s | 1.0s | 1.0s |
| Decode 1,000 frames | 920ms | 280ms | 240ms | 240ms |
| Render 1M-point chart | 24fps | 24fps | 28fps | 60fps |
| Telemetry: 4 streams x 1000Hz | 22fps | 38fps | 55fps | 60fps |
| EEG: 19 channels x 1kHz | 12fps | 25fps | 48fps | 60fps (144fps possible) |
| Main-thread JS time per frame | 22ms | 8ms | 4ms | < 1ms |
| Memory overhead | baseline | +50MB | +20MB | +20MB |
| Worker spin-up latency (first call) | 0 | 2-5ms | 2-5ms | 5-10ms |

The pattern: workers alone help, and workers plus shared memory help more. Workers plus shared memory plus `OffscreenCanvas` is what gets you to "the main thread is doing nothing and the chart is still smooth."

For chart-heavy apps, the leap from "workers" to "workers plus `OffscreenCanvas`" is the biggest single architectural improvement available without leaving the browser.

---

## The COOP/COEP Catch

`SharedArrayBuffer` and high-resolution timers were tightened in 2020 after Spectre/Meltdown. To use them, your page must be served with two HTTP headers:

```plaintext
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

This opts your page into "cross-origin isolation." Within an isolated context, `SharedArrayBuffer` exists, `performance.now()` is high-resolution, and various other restricted APIs work.

Outside an isolated context, `SharedArrayBuffer` is undefined, `performance.now()` is throttled to about 1ms precision, and Atomics throw.

The cost is significant. `require-corp` means every cross-origin resource (images from a CDN, embedded YouTube videos, third-party fonts, analytics scripts) must explicitly opt in by setting `Cross-Origin-Resource-Policy: cross-origin` or `Cross-Origin-Embedder-Policy: credentialless`. Many third-party services don't, which breaks their embedding.

There are two practical options:

- **For an Electron app:** the renderer process can be configured to use these headers easily. Most production Electron apps that want real-time visualisation enable them by default.
- **For a browser app:** weigh the embeds you'd lose against the performance you'd gain. If your app is the main attraction (Figma, Google Docs), opt in. If you depend on third-party widgets, the cost is real.

For chart-heavy or signal-heavy apps that need SAB, the Electron path is usually cleaner.

---

## Production Tradeoffs

Here are the five real costs of everything above.

- **Code complexity:** A worker-driven app has 2 to 4 times the source files of a single-threaded one (main + workers + shared types). It's worth it for the right scale, but painful for a trivial app.
- **Debugging:** Stack traces split across threads. Chrome DevTools handles this well in 2026 (each worker has its own debugger panel), but it's still more work than a single-thread bug.
- **Bundle size:** Each worker is a separate chunk. Tree-shaking inside workers is sometimes worse than in main (less mature). Audit worker bundles separately.
- **Startup latency:** Spinning up workers at app start adds 50 to 200ms. Pre-warm them during the splash screen, or accept the first-frame delay.
- **Browser API gaps:** `localStorage`, `document`, and most DOM APIs aren't available in workers. Some libraries silently rely on them and break. Test in a worker context before bundling a library you haven't tried there.

There are three trade-offs specific to the imperative rendering pattern:

- **Declarative animation of the data:** The chart frame, labels, and controls all stay declarative. The data inside the chart becomes imperative.
- **Easy snapshot testing of the rendered output:** A canvas has no DOM you can query. Test the data path separately from the draw path. Snapshot the store output, not the pixels.
- **React's component story for the inner loop:** The draw loop is a closure. Composing draw loops is harder than composing components. Pick your component boundary carefully so each canvas does one thing.

For most apps these costs aren't worth paying. For an app that has to render 1kHz data smoothly, they're the price of admission.

---

## Should You Build Like This?

If your data rate is below 30 updates per second per stream, none of this is needed. Naïve `setState` per batch will work. Profile first, optimise second.

This architecture earns its keep when:

- You have many streams or sensors
- Ingestion is sustained, not bursty
- The UX promise is smooth motion for hours, not seconds
- You'd rather not rewrite the UI in a native language to get there

The boring rule: start with `requestAnimationFrame` coalescing and external stores. Promote to workers when those aren't enough. Promote to shared memory when worker `postMessage` is the bottleneck. Promote to `OffscreenCanvas` when the render loop itself becomes the bottleneck. Each step is a real architectural investment. Take them in order.

---

## Wrapping Up

React can handle real-time visualisation if you use it the right way. Instead of pushing React to do everything, use it as the conductor. Let specialised libraries and workers handle the heavy lifting.

These are the three rules that hold up across every high-frequency React app I've built:

1. **Workers do the work, while main does the UI.** If main is doing math, you've put the math in the wrong place.
2. **Transfer if you can, share if you must.** Both beat cloning. Sharing is more complex than transferring.
3. **Let React orchestrate. Let specialised tools render.** The store owns the data, the draw loop owns the values, and React owns the shape.

Get those right and your React app stops being a one-core system that flinches at high-frequency data. It becomes a real multi-core system that scales with the hardware, ingests without dropping, and renders without stuttering.

The cores are right there. Use them.

::: info References

<SiteInfo
  name="leeoniya/uPlot"
  desc="📈 A small, fast chart for time series, lines, areas, ohlc & bars"
  url="https://github.com/leeoniya/uPlot/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c8893a806e3002a73114a2c27edc5d4ebfd51af80fb3edf7a146939940097287/leeoniya/uPlot"/>

<SiteInfo
  name="huww98/TimeChart"
  desc="An chart library specialized for large-scale time-series data, built on WebGL."
  url="https://github.com/huww98/TimeChart/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/7001b3850ef745fdf1261d9f13e86bf3a9bca6c94bf467567143c348db4d9040/huww98/TimeChart"/>

<SiteInfo
  name="Using Web Workers - Web APIs | MDN"
  desc="Web Workers are a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. In addition, they can make network requests using the fetch() or XMLHttpRequest APIs. Once created, a worker can send messages to the JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa)."
  url="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

> Using Web Workers in React: MDN reference.

<SiteInfo
  name="SharedArrayBuffer - JavaScript | MDN"
  desc="The SharedArrayBuffer object is used to represent a generic raw binary data buffer, similar to the ArrayBuffer object, but in a way that they can be used to create views on shared memory. A SharedArrayBuffer is not a Transferable Object, unlike an ArrayBuffer which is transferable."
  url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

> SharedArrayBuffer on MDN: the shared-memory primitive.

<SiteInfo
  name="OffscreenCanvas - Web APIs | MDN"
  desc="When using the <canvas> element or the Canvas API, rendering, animation, and user interaction usually happen on the main execution thread of a web application.
The computation relating to canvas animations and rendering can have a significant impact on application performance."
  url="https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

> OffscreenCanvas on MDN: rendering off the main thread.

- [**COOP and COEP explainer**](/web.dev/coop-coep.md): what cross-origin isolation buys you.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "High-Frequency Real-Time Data in React: From Ring Buffers to OffscreenCanvas",
  "desc": "React is great at many things. But if you've ever tried pushing thousands of data points per second through it, you'll quickly learn that React isn't a firehose. It's more like a garden hose. Try forc",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/high-frequency-real-time-data-in-react-from-ring-buffers-to-offscreencanvas.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
