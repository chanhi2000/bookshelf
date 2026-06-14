---
lang: en-US
title: "How to Build a Reliable SSE Client in TypeScript"
description: "Article(s) > How to Build a Reliable SSE Client in TypeScript"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Reliable SSE Client in TypeScript"
    - property: og:description
      content: "How to Build a Reliable SSE Client in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-reliable-sse-client-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2026-06-26
isOriginal: false
author:
  - name: timothy ogbemudia
    url: https://freecodecamp.org/news/author/glamboyosa/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3c13d795-15e8-452a-b490-89528d58efd2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Reliable SSE Client in TypeScript"
  desc="When you build a feature that streams data, like an AI chat response or a live notification feed, the network is rarely as cooperative as fetch makes it look. Connections drop, proxies buffer response"
  url="https://freecodecamp.org/news/how-to-build-a-reliable-sse-client-in-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3c13d795-15e8-452a-b490-89528d58efd2.png"/>

When you build a feature that streams data, like an AI chat response or a live notification feed, the network is rarely as cooperative as `fetch` makes it look.

Connections drop, proxies buffer responses, and mobile networks switch from WiFi to cellular mid-stream. If your streaming code doesn't plan for this, the user sees a response that just stops, with no error and no recovery.

In this article, you'll use an open source TypeScript library called [<VPIcon icon="iconfont icon-github"/>`glamboyosa/ore`](https://github.com/glamboyosa/ore) as a practical example of how to build a streaming client that handles real-world network conditions: automatic retries, the official Server-Sent Events (SSE) parsing spec, and clean integration with React and React Server Components.

By the end, you'll understand how async generators, the Fetch API, and the SSE spec fit together to build something far more reliable than a basic `fetch` and `response.body.getReader()` loop.

::: note Prerequisites

To follow along, you should have:

- A working understanding of TypeScript
- Familiarity with `fetch`, `ReadableStream`, and `async`/`await`
- Basic knowledge of React (for the React-specific sections)

:::

::: info What You Will Learn

- How to stream raw text or bytes from a `fetch` response using async generators
- How to parse the Server-Sent Events spec by hand, field by field
- How to implement automatic reconnection with `Last-Event-ID` so you don't lose events
- How to handle retries with exponential backoff
- How to integrate a streaming client with React state and React Server Components

:::

---

## What Is Server-Sent Events?

Server-Sent Events (SSE) is a web standard for one-way streaming from server to client over a single HTTP connection. Unlike WebSockets, it's plain HTTP, which means it works through existing infrastructure like load balancers and proxies without special configuration.

An SSE response looks like this on the wire:

```plaintext
event: update
id: 42
data: {"status": "processing"}

event: update
id: 43
data: {"status": "complete"}
```

Each event is separated by a blank line. The `data` field carries the payload, `event` names the event type, and `id` lets the client track its position in the stream for reconnection.

The browser has a built-in `EventSource` API for this, but it has real limitations: no custom headers, no POST requests, and inconsistent reconnection behavior across browsers. For anything beyond the simplest case, you often need to parse the stream yourself.

---

## Why Build a Custom Streaming Client?

Many streaming use cases, like AI chat responses, don't use the SSE spec at all. They're just raw chunks of text arriving over time. Other cases, like live notifications, genuinely benefit from the structure SSE provides: named events, IDs for resumption, and a server-controlled retry interval.

Ore handles both with two separate functions:

- `stream()` for raw text or byte streaming, with no assumptions about format
- `streamSSE()` for spec-compliant SSE parsing

Both are async generators, so consuming either looks the same from the call site:

```ts
for await (const chunk of stream("https://api.example.com/chat")) {
  console.log(chunk);
}
```

---

## How to Stream Raw Chunks with an Async Generator

The simplest case is streaming raw text. This is useful for AI responses or log tails where there's no event structure, just a sequence of bytes arriving over time.

Here's the core of `stream()`:

```ts :collapsed-lines
export async function* stream(
  url: string,
  options?: StreamOptions
): AsyncGenerator<string | Uint8Array, void, unknown> {
  const { headers, retries = 3, signal, decode = true } = options || {};

  let retryCount = 0;

  while (retryCount <= retries) {
    try {
      const response = await fetch(url, { method: "GET", headers, signal });

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          yield decode ? decoder.decode(value, { stream: true }) : value;
        }
      } finally {
        reader.releaseLock();
      }

      return;
    } catch (error: any) {
      if (signal?.aborted) throw error;
      retryCount++;
      if (retryCount > retries) {
        throw new Error(`Max retries exceeded. Last error: ${error.message}`);
      }
      await new Promise((r) => setTimeout(r, 1000 * retryCount));
    }
  }
}
```

A few design decisions are worth calling out.

The function is an async generator (`async function*`), so the caller can use `for await...of` instead of managing a reader and a loop manually. That's the difference between exposing a raw `ReadableStream` and exposing something pleasant to consume.

The `finally` block always releases the reader lock, even if the loop exits early through a `break` or an exception. Forgetting this is a common source of stream leaks.

The retry loop only catches errors from the `fetch` call and the read loop. If the `AbortSignal` was the cause of the failure, it rethrows immediately rather than retrying, since retrying a deliberate cancellation makes no sense.

---

## How to Parse Server-Sent Events by Hand

The SSE spec is a simple text format, but parsing it correctly means handling several edge cases: events split across multiple data lines, comment lines starting with a colon, fields with no value, and incomplete lines at the end of a chunk.

Here's the core state machine inside `streamSSE()`:

```ts :collapsed-lines
let buffer = "";
let currentEvent: Partial<SSEEvent> = { data: "", event: null, id: null };
let hasData = false;

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split(/\r\n|\r|\n/);
  buffer = lines.pop() || ""; // keep the last incomplete line for the next chunk

  for (const line of lines) {
    if (line === "") {
      if (hasData) {
        const event: SSEEvent = {
          id: currentEvent.id ?? lastEventId,
          event: currentEvent.event ?? null,
          data: currentEvent.data!.endsWith("\n")
            ? currentEvent.data!.slice(0, -1)
            : currentEvent.data!,
          retry: currentEvent.retry,
        };
        if (event.id) lastEventId = event.id;
        yield event;
        currentEvent = { data: "", event: null, id: null };
        hasData = false;
      }
      continue;
    }

    if (line.startsWith(":")) continue; // comment line, ignore

    const colonIndex = line.indexOf(":");
    const field = colonIndex === -1 ? line : line.slice(0, colonIndex);
    let valueStr = colonIndex === -1 ? "" : line.slice(colonIndex + 1);
    if (valueStr.startsWith(" ")) valueStr = valueStr.slice(1);

    switch (field) {
      case "data":
        currentEvent.data += valueStr + "\n";
        hasData = true;
        break;
      case "event":
        currentEvent.event = valueStr;
        break;
      case "id":
        if (valueStr.indexOf("\0") === -1) currentEvent.id = valueStr;
        break;
      case "retry":
        const retry = parseInt(valueStr, 10);
        if (!isNaN(retry)) retryInterval = retry;
        break;
    }
  }
}
```

A network chunk doesn't respect line boundaries. A single `read()` call might end mid-line, so the last, possibly incomplete line is held back in `buffer` and prepended to the next chunk rather than processed early. This is the part of SSE parsing that's easy to get wrong if you reach for a naïve `response.text()` and a string split.

The blank line is what ends an event. SSE events don't have a fixed-length header. The spec says a blank line marks the boundary, so the parser only yields an event once it has seen one.

The `id` field is rejected outright if it contains a null byte, per the spec. That's a small detail that almost no hand-rolled implementation gets right on the first try.

---

## How to Implement Reconnection with Last-Event-ID

This is the part of SSE that gives it a real advantage over a plain `fetch` stream: built-in support for resuming after a disconnect without losing your place.

```ts
let lastEventId: string | null = null;

while (retryCount <= retries) {
  const headers = { ...customHeaders };
  if (lastEventId) {
    (headers as any)["Last-Event-ID"] = lastEventId;
  }

  const response = await fetch(url, { method: "GET", headers, signal });
  // ... read and parse events, updating lastEventId as they arrive
}
```

Every time an event with an `id` field arrives, `lastEventId` is updated. If the connection drops and the client reconnects, it sends `Last-Event-ID` in the request headers. A well-behaved server can use that header to resume the stream from the right point instead of replaying everything or skipping ahead.

This only works if the server actually honors the header, so it's a contract between client and server, not something the client can guarantee alone. But having the client track and send it correctly is the necessary half of that contract.

---

## How to Handle Retries with Backoff

Both `stream()` and `streamSSE()` retry on failure, but they do it slightly differently based on what failed.

`stream()` uses a simple linear backoff tied to the retry count:

```ts
await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
```

`streamSSE()` respects the server-specified `retry` field from the SSE spec when one is provided, falling back to a default otherwise:

```ts
let retryInterval = 1000;
// ... updated from the "retry" field if the server sends one
await new Promise((r) => setTimeout(r, retryInterval));
```

Letting the server influence the retry interval matters in practice. A server under load can tell clients to back off longer, which is exactly the kind of cooperative behavior the SSE spec was designed to support.

In both functions, an aborted `AbortSignal` always short-circuits the retry loop. Treating a deliberate cancellation as a retryable failure is a common bug, and the fix is just checking `signal?.aborted` before deciding to retry.

---

## How to Use This with React

Because both functions are async generators, integrating with React state is a matter of looping and calling `setState` per chunk:

```ts
function ChatComponent() {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        for await (const chunk of stream("/api/chat", { signal: controller.signal })) {
          setMessages((prev) => prev + chunk);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") console.error(err);
      }
    })();

    return () => controller.abort();
  }, []);

  return <div>{messages}</div>;
}
```

The cleanup function calling `controller.abort()` is doing real work here. Without it, navigating away from the component while a stream is still active leaves the fetch running in the background, updating state on an unmounted component.

---

## How to Use This with React Server Components

Because the generator yields values one at a time, you can also drive a recursive Suspense boundary directly from the async iterator, streaming HTML to the client as each chunk arrives:

```ts
async function StreamViewer({ iterator }: { iterator: AsyncIterator<string> }) {
  const { value, done } = await iterator.next();
  if (done) return null;

  return (
    <span>
      {value}
      <Suspense>
        <StreamViewer iterator={iterator} />
      </Suspense>
    </span>
  );
}

export default function Page() {
  const dataStream = stream("https://api.example.com/stream");
  const iterator = dataStream[Symbol.asyncIterator]();

  return (
    <Suspense fallback="Loading...">
      <StreamViewer iterator={iterator} />
    </Suspense>
  );
}
```

Each recursive call awaits the next chunk and renders a nested `Suspense` boundary for the rest. React streams each piece of HTML to the client as it resolves, rather than waiting for the entire response.

---

## Conclusion

A reliable streaming client needs to handle more than the success path. Connections drop, chunks arrive split across line boundaries, and cancellation needs to be distinguished from failure.

Ore's approach to this is built from a small set of ideas:

- Expose streams as async generators so consumers can use `for await...of`
- Parse SSE by hand, field by field, respecting the spec's blank-line event boundaries and buffering incomplete lines across chunks
- Track `Last-Event-ID` so reconnection can resume rather than restart
- Treat retries and cancellation as separate concerns
- Stay framework-agnostic at the core, with thin integration points for React and React Server Components

::: info

That combination is what separates a streaming client that works in a demo from one that holds up against real network conditions. You can explore the full source code at below

<SiteInfo
  name="glamboyosa/ore"
  desc="Fully typed SSE library for handling server-sent events on the client and in React Server Components."
  url="https://github.com/glamboyosa/ore/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6f4ef00b6b5d32e2c800b3c6eb06f8ec05a0245a0b5b9f8365fa6a2bc31ba9d1/glamboyosa/ore"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Reliable SSE Client in TypeScript",
  "desc": "When you build a feature that streams data, like an AI chat response or a live notification feed, the network is rarely as cooperative as fetch makes it look. Connections drop, proxies buffer response",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-reliable-sse-client-in-typescript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
