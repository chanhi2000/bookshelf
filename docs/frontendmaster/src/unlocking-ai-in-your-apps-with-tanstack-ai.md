---
lang: en-US
title: "Getting Started with TanStack AI: Setup and Basics"
description: "Article(s) > Getting Started with TanStack AI: Setup and Basics"
icon: iconfont icon-tanstack
category:
  - Node.js
  - React.js
  - Tanstack
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - master.dev
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - tanstack
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Getting Started with TanStack AI: Setup and Basics"
    - property: og:description
      content: "Getting Started with TanStack AI: Setup and Basics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/unlocking-ai-in-your-apps-with-tanstack-ai.html
prev: /programming/js-tanstack/articles/README.md
date: 2026-10-16
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11346
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TanStack > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-tanstack/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Getting Started with TanStack AI: Setup and Basics"
  desc="Discover TanStack AI, an innovative ecosystem for integrating AI in apps, covering setup, AI requests, streaming, and persistence."
  url="https:///blog.master.dev/unlocking-ai-in-your-apps-with-tanstack-ai"
  logo="https://master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11346"/>

[<VPIcon icon="iconfont icon-tanstack"/>TanStack AI](https://tanstack.com/ai/latest) is the latest offering from the TanStack universe. It’s an ecosystem of AI libraries that lets you add virtually any AI feature you can imagine to your apps. Like other TanStack libraries, it’s fully featured and *extremely* strongly typed.

This will be a two-part post introducing some of the basic, common features you’re most likely to reach for in everyday applications. Future posts will go further and use TanStack AI to do things like spin up agents.

Part 1 will cover basic setup and AI requests, streaming, persistence, and resumability. I know that sounds like a lot, but TanStack makes this stuff incredibly simple—bordering on turnkey—so we’ll cover it fairly quickly. Part 2 *(coming soon!)* will get into structured output, also with streaming.

All code samples from both parts are in [this repo (<VPIcon icon="iconfont icon-github"/>`arackaf/tanstack-ai-blog-post`)](https://github.com/arackaf/tanstack-ai-blog-post).

::: info Article Series

```component VPCard
{
  "title": "Getting Started with TanStack AI: Setup and Basics",
  "desc": "Discover TanStack AI, an innovative ecosystem for integrating AI in apps, covering setup, AI requests, streaming, and persistence.",
  "link": "/blog.master.dev/unlocking-ai-in-your-apps-with-tanstack-ai.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Exploring Structured Output in TanStack AI: Streaming Guide",
  "desc": "Discover structured output and streaming with TanStack AI. Learn to enhance AI responses for workout generation in this insightful guide.",
  "link": "/blog.master.dev/structured-output-with-tanstack-ai.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

Let’s get started!

::: note Setting Up

Let’s install some packages.

```sh
npm i @tanstack/ai @tanstack/ai-react
```

Since I love routing all my AI requests through *one* gateway, no matter who owns the model being used, let’s also install the adapter for Vercel’s AI Gateway.

```sh
npm i @tanstack/ai-vercel-gateway
```

Then, to make requests actually work, we’ll need an entry in our <VPIcon icon="iconfont icon-dotenv"/>`.env` file.

```sh title=".env"
AI_GATEWAY_API_KEY="xyz"
```

:::

---

## Our First Back End

You’ll want a plain old API endpoint to send your AI prompts to, even if you’re using TanStack Start, which I am; we’ll use Server Routes rather than Server Functions.

Here’s the simplest possible endpoint for sending AI prompts over to the model of our choice.

```ts
import { chat, toJsonResponse } from "@tanstack/ai";
import { vercelGatewayText } from "@tanstack/ai-vercel-gateway";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ai/chat-no-streaming")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = await request.json();

        const stream = await chat({
          adapter: vercelGatewayText("anthropic/claude-opus-5"),
          messages,
          stream: false,
        });

        return toJsonResponse(stream);
      },
    },
  },
});
```

Let’s see how to process that on the front end.

---

## Our Front End

Unsurprisingly, TanStack ships bindings for most UI frameworks. Since I’m using TanStack Start, I’ll of course use the React bindings.

```tsx
import { fetchJson, useChat } from "@tanstack/ai-react";
```

We get a hook, and then an adapter for responses. Let’s fire it up.

```tsx
const { messages, sendMessage, isLoading } = useChat({
  connection: fetchJson("/api/ai/chat-no-streaming"),
});
```

It couldn’t be simpler. We have an array of current messages, a function to send a new prompt, and an `isLoading` indicator. Let’s wire up a basic UI (or have our agent do it).

```tsx
function BasicChat() {
  const [prompt, setPrompt] = useState("");

  const { messages, sendMessage, isLoading } = useChat({
    connection: fetchJson("/api/ai/chat-no-streaming"),
  });

  // ...

  return (
    <div>
      <h1>Basic Chat</h1>

      <div>
        {messages.map(message =>
          message.role === "user" ? (
            <div key={message.id}>
              {message.parts.map((part, index) => (part.type === "text" ? <p key={index}>{part.content}</p> : null))}
            </div>
          ) : (
            <div key={message.id} className="w-full">
              {message.parts.map((part, index) => (part.type === "text" ? <p key={index}>{part.content}</p> : null))}
            </div>
          ),
        )}
        {isLoading && <Loader2 />}
      </div>
      {/* ... */}
    </div>
  );
}
```

Messages have a role, and we format user prompts on the right in a nice blue bubble, since I lack the creative originality to think of a better UI than what ChatGPT does.

### Running It

And now we can send a basic prompt and get a response.

![Screenshot of a digital chat interface with a poetic prompt about a kettle, rain, and a cozy atmosphere.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/basic-chat.jpg?resize=1024%2C340&quality=89&ssl=1)

And of course you can keep the conversation going. Our back end from before already takes the existing messages from the thread, and passes them along.

```ts
const { messages } = await request.json();

const stream = chat({
  adapter: vercelGatewayText("anthropic/claude-opus-5"),
  messages,
});
```

The `useChat` hook will do the work of forwarding those messages. We can test this easily by giving a follow-up prompt that’s meaningless without the prior messages.

![A summary of top three attractions in New York City, including Central Park, The Met, and the Brooklyn Bridge.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/chat-with-context.jpg?resize=1024%2C838&quality=89&ssl=1)

---

## Adding Streaming

It’s not ideal for our UI to wait until the entire message returns before showing anything. Anyone who’s used ChatGPT has seen AI models *stream* responses, so you can start reading immediately while the model streams the rest of the message in.

Let’s add that here. The changes we have to make are surprisingly trivial.

Here’s our new back-end endpoint.

```ts
import { chat, toServerSentEventsResponse } from "@tanstack/ai";
import { vercelGatewayText } from "@tanstack/ai-vercel-gateway";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/ai/chat-streaming")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = await request.json();

        const stream = chat({
          adapter: vercelGatewayText("anthropic/claude-opus-5"),
          messages,
        });

        return toServerSentEventsResponse(stream);
      },
    },
  },
});
```

Note that we *removed* `stream: false` and changed our return value to this:

```ts
return toServerSentEventsResponse(stream);
```

TanStack gives us everything we need to establish an SSE[^1] stream that pipes our prompt results to the front end as it’s generated.

[^1]: **Server-Sent Events**: they’re like WebSockets, but only one way, from the server to the client.

On the front end, we’ll grab a new import.

```ts
import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";
```

Then we’ll tweak our hook like so:

```ts
const { messages, sendMessage, isLoading } = useChat({
  connection: fetchServerSentEvents("/api/ai/chat-streaming"),
});
```

It couldn’t be simpler. And now our UI streams.

![User interface displaying a basic chat prompt to generate a short poem.](https://i0.wp.com/assets.codepen.io/3/chat-with-streaming.gif?ssl=1)

---

## Persistence (and Resumability!)

If we refresh the page, our prompt and responses vanish into the void; nothing saves any of it anywhere.

Let’s fix that and add persistence.

First, we need a new package.

```sh
npm i @tanstack/ai-persistence
```

TanStack AI handles persistence a bit differently than you might expect. It gives you a contract to satisfy however you’d like, in whatever database you want. And of course you’re not expected to manually cobble together the needed schema definitions via DDL.

TanStack AI actually gives you an [<VPIcon icon="iconfont icon-tanstack"/>AI Skill to install](https://tanstack.com/ai/latest/docs/persistence/build-your-own-adapter#let-your-agent-write-it), which should generate all of the needed code. In fact, it’s even aware of Drizzle, and will happily generate the needed Drizzle schema objects, allowing you to just `npx drizzle-kit push` to generate the tables in your actual database. Or it can generate the needed stores against a raw database.

Here’s a sample of the Drizzle-based persistence module it one-shotted for me.

```ts :collapsed-lines
import { and, asc, desc, eq, isNotNull, lte } from "drizzle-orm";
import { defineAIPersistence } from "@tanstack/ai-persistence";
import type { SQL } from "drizzle-orm";
import type { ChatPersistence, InterruptRecord, InterruptStore, MessageStore, MetadataStore, RunRecord, RunStore } from "@tanstack/ai-persistence";

import { chatInterrupts, chatMetadata, chatRuns, chatThreads } from "#/drizzle/schema";
import { db, type DB } from "#/data/db";

// Records omit absent optionals so they compare cleanly against the reference
// in-memory back end.
function mapRun(row: typeof chatRuns.$inferSelect): RunRecord {
  return {
    runId: row.runId,
    threadId: row.threadId,
    status: row.status,
    startedAt: row.startedAt,
    ...(row.finishedAt != null ? { finishedAt: row.finishedAt } : {}),
    ...(row.error != null
      ? {
          error: {
            message: row.error,
            ...(row.errorCode != null ? { code: row.errorCode } : {}),
          },
        }
      : {}),
    ...(row.usageJson != null ? { usage: row.usageJson } : {}),
    ...(row.sandboxKey != null ? { sandboxKey: row.sandboxKey } : {}),
    ...(row.detachedSince != null ? { detachedSince: row.detachedSince } : {}),
    ...(row.cancelRequested != null ? { cancelRequested: row.cancelRequested } : {}),
    ...(row.driverEpoch != null ? { driverEpoch: row.driverEpoch } : {}),
    ...(row.parentRunId != null ? { parentRunId: row.parentRunId } : {}),
    ...(row.subagentRunId != null ? { subagentRunId: row.subagentRunId } : {}),
    ...(row.name != null ? { name: row.name } : {}),
  };
}

function mapInterrupt(row: typeof chatInterrupts.$inferSelect): InterruptRecord {
  return {
    interruptId: row.interruptId,
    runId: row.runId,
    threadId: row.threadId,
    status: row.status,
    requestedAt: row.requestedAt,
    payload: row.payloadJson,
    ...(row.resolvedAt != null ? { resolvedAt: row.resolvedAt } : {}),
    ...(row.responseJson != null ? { response: row.responseJson } : {}),
  };
}

function createMessageStore(db: DB): MessageStore {
  // ....
}

// ...

/** The four chat state stores backed by the app's Drizzle database. */
export const persistence: ChatPersistence = defineAIPersistence({
  stores: {
    messages: createMessageStore(db),
    runs: createRunStore(db),
    interrupts: createInterruptStore(db),
    metadata: createMetadataStore(db),
  },
});
```

If using an AI skill to generate code that lives in your repo for you to tweak seems crazy, just remember: substitute “CLI” for “AI skill,” and you’re basically left with ShadCN.

That said, I don’t think this current AI skill is the final form of persistence code generation for TanStack AI, and I’d love to see it replaced with a proper CLI. But for a new project, this is an outstanding solution for now.

Let’s put this persistence code to good use!

### Adding Middleware

Step one is adding our new persistence store as middleware on the server. I know I haven’t covered middleware yet, and won’t be for this post, but TanStack AI supports a full middleware chain for processing, modifying, or, in this case, persisting AI threads. We’ll add it in our server route.

We’ll also forward along any `threadId` or `runId` passed from the frontend. This will allow the frontend to request a persisted thread, or even resume an interrupted thread—more on that soon.

```ts
import { chat, chatParamsFromRequest, toServerSentEventsResponse } from "@tanstack/ai";
import { reconstructChat, withPersistence } from "@tanstack/ai-persistence";

    POST: async ({ request }) => {
      const params = await chatParamsFromRequest(request);

      const stream = chat({
        adapter: vercelGatewayText("anthropic/claude-opus-5"),
        messages: params.messages,
        threadId: params.threadId,
        runId: params.runId,
        middleware: [withPersistence(persistence)],
      });

      return toServerSentEventsResponse(stream);
    },
```

### Front-End Changes

On the front end, we need to send over a `threadId` and tell our hook that we’re using persistence.

```ts
const { messages, sendMessage, isLoading } = useChat({
  connection: fetchServerSentEvents("/api/ai/chat-with-persistence"),
  persistence: true,
  threadId: "123",
});
```

For a real app, we’d generate a meaningful (and unique!) `threadId`, but for now, “123” will work just fine. Now when we run a prompt and get results, we can check our database and see our threads being saved!

![Screenshot of a database console displaying chat thread information, including thread ID, messages in JSON format, and updated timestamp.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/persisting.jpg?resize=1024%2C231&quality=89&ssl=1)

But when we refresh, our page is empty. Why isn’t the saved thread loading in the UI?

---

## Adding a GET Endpoint

Whatever back-end endpoint we set up for our prompts is a POST, which TanStack AI uses to submit a new prompt. To load a saved thread, we need to set up a GET handler at the same place, and use TanStack’s helpers to load the thread in question (the front end will include the `threadId` with the request).

```ts
import { reconstructChat, withPersistence } from "@tanstack/ai-persistence";

  GET: async ({ request }) => {
    return reconstructChat(persistence, request, {
      // WITHOUT this, anyone who guesses a thread id gets the whole transcript.
      authorize: async (threadId, req) => true,
    });
  },
```

You should fill in the `authorize` callback with actual verification logic, but otherwise, with that, reloading the page re-renders the same thread you just saw above.

If you’d like to render a loading indicator while the existing thread is being loaded from persistence, use the `isHydrating` boolean returned from the `useChat` hook.

---

## Resumability

What happens if we refresh the page *while* the response is being generated? Right now, that disconnects the SSE stream, and we lose our results completely. To fix this, we need to make our response stream resumable by buffering results into an in-memory stream on the server, then checking that in the GET endpoint before returning what’s in our database.

Unsurprisingly, TanStack makes this easy.

First we’ll modify our POST handler like this:

```ts
import { chat, chatParamsFromRequest, toServerSentEventsResponse, memoryStream, resumeServerSentEventsResponse } from "@tanstack/ai";

  POST: async ({ request }) => {
    const params = await chatParamsFromRequest(request);

    const stream = chat({
      adapter: vercelGatewayText("anthropic/claude-opus-5"),
      messages: params.messages,
      threadId: params.threadId,
      runId: params.runId,
      middleware: [withPersistence(persistence)],
    });

    return toServerSentEventsResponse(stream, {
      durability: { adapter: memoryStream(request) },
    });
  },
```

That buffers our output into a memory stream. And now we can consult that memory stream when loading a thread in our GET handler.

```ts
  GET: async ({ request }) => {
    const durability = memoryStream(request);
    if (durability.resumeFrom() !== null) {
      return resumeServerSentEventsResponse({ adapter: durability });
    }

    return reconstructChat(persistence, request, {
      // WITHOUT this, anyone who guesses a thread id gets the whole transcript.
      authorize: async (threadId, req) => true,
    });
  },
```

Be sure to repeat whatever security check you (hopefully) added in the `authorize` callback before resuming anything from that memory stream.

It’s surprisingly little boilerplate, and it’s incredibly flexible if you ever want to tweak anything.

And now, when we refresh the page mid-response, it resumes where it left off and keeps going.

![Screenshot of a chat interface displaying a prompt asking to generate a medium length poem.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/with-interrupt-1.gif?resize=1024%2C544&ssl=1)

::: note

For this demo, we’re using an in-memory stream, which works great locally (or when connecting to something like a Cloudflare Durable Object with a consistent identity). In production, you may want a durable stream back end so that resuming works across server instances and restarts.

:::

---

## Wrapping Up

TanStack AI is an exciting addition to the growing list of AI tools. We set up basic prompting with persistence and resumability with little effort. And yet we’ve barely scratched the surface of what this library can do.

Stay tuned for part two, where we’ll dive into structured output, and future posts where we’ll go even deeper.

::: info Article Series

```component VPCard
{
  "title": "Getting Started with TanStack AI: Setup and Basics",
  "desc": "Discover TanStack AI, an innovative ecosystem for integrating AI in apps, covering setup, AI requests, streaming, and persistence.",
  "link": "/blog.master.dev/unlocking-ai-in-your-apps-with-tanstack-ai.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Exploring Structured Output in TanStack AI: Streaming Guide",
  "desc": "Discover structured output and streaming with TanStack AI. Learn to enhance AI responses for workout generation in this insightful guide.",
  "link": "/blog.master.dev/structured-output-with-tanstack-ai.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

```component VPCard
{
  "title": "Exploring Structured Output in TanStack AI: Streaming Guide",
  "desc": "Discover structured output and streaming with TanStack AI. Learn to enhance AI responses for workout generation in this insightful guide.",
  "link": "/blog.master.dev/structured-output-with-tanstack-ai.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Single Flight Mutations in TanStack Start: Part 1",
  "desc": "What if we could mutate data *and* get all the data back we need to properly update the UI in just one network round-trip?",
  "link": "/blog.master.dev/single-flight-mutations-in-tanstack-start-part-1.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Building a Blog in TanStack (Part 2 of 2)",
  "desc": "A blog is a perfect use case for pre-rendering, so that the static build files can render all on their own. TanStack Start can even help with the server functions via middleware.",
  "link": "/blog.master.dev/building-a-blog-in-tanstack-part-2-of-2.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting Started with TanStack AI: Setup and Basics",
  "desc": "Discover TanStack AI, an innovative ecosystem for integrating AI in apps, covering setup, AI requests, streaming, and persistence.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/unlocking-ai-in-your-apps-with-tanstack-ai.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
