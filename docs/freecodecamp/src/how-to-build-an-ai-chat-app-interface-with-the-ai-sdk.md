---
lang: en-US
title: "How to Build an AI Chat App Interface With the Vercel AI SDK and Shadcn/ui"
description: "Article(s) > How to Build an AI Chat App Interface With the Vercel AI SDK and Shadcn/ui"
icon: iconfont icon-shadcn
category:
  - Node.js
  - React.js
  - Shadcn
  - DevOps
  - Vercel
  - AI
  - LLM
  - Anthropic
  - Claude
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - shadcn
  - devops
  - vercel
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - anthropic
  - claude
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an AI Chat App Interface With the Vercel AI SDK and Shadcn/ui"
    - property: og:description
      content: "How to Build an AI Chat App Interface With the Vercel AI SDK and Shadcn/ui"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-chat-app-interface-with-the-ai-sdk.html
prev: /programming/js-shadcn/articles/README.md
date: 2026-09-12
isOriginal: false
author:
  - name: Vaibhav Gupta
    url: https://freecodecamp.org/news/author/vaibhavg/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c7c0df36-a134-4ea2-b307-da5c4f7d2937.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shadcn > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-shadcn/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Vercel > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/vercel/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Claude > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/claude/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an AI Chat App Interface With the Vercel AI SDK and Shadcn/ui"
  desc="Every other AI product you open today has the same screen: a message list, a text box at the bottom, and words that stream in one token at a time. It looks simple, but it's not simple to build well. Y"
  url="https://freecodecamp.org/news/how-to-build-an-ai-chat-app-interface-with-the-ai-sdk"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/c7c0df36-a134-4ea2-b307-da5c4f7d2937.png"/>

Every other AI product you open today has the same screen: a message list, a text box at the bottom, and words that stream in one token at a time. It looks simple, but it's not simple to build well.

You have to manage streaming state, partial tokens, tool calls, retries, markdown rendering, scroll position, and a dozen small UX details...all while keeping the interface accessible and fast. Do it with the wrong tools, and you'll spend more time fighting state bugs than building your actual product.

In this tutorial, you'll build a real AI chat interface using two tools that were basically made for each other: the Vercel AI SDK for the streaming and model logic, and shadcn/ui for the interface itself.

By the end, you'll have a working chat screen that streams responses, renders markdown, and looks like something you would actually ship.

You'll also see how to speed up the UI side of this even further using an MCP server, and where to grab a production-ready chat template if you'd rather skip the setup entirely.

![What we'll build - AI chat interface screenshot](https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1d8974cc-4cc4-41e9-a1b0-7a81c184fcaf.webp)

::: note Prerequisites

You will need:

- Node.js 18 or later
- Basic familiarity with React and Next.js, specifically the App Router
- An API key from an LLM provider such as OpenAI, Anthropic, or Google. You can follow along without one, more on that later.

:::

---

## What You'll Build

You're going to build a Next.js chat app with:

- A streaming API route that talks to an LLM provider
- A client-side chat interface built with `useChat`
- Message bubbles, an auto-growing input, and a scrollable conversation, all styled with shadcn/ui components
- A simple tool call so the model can do more than just talk
- A fallback state that works even before you add an API key, so you can build the UI first and wire up the model later

Let's start from an empty folder and work up to something you would be comfortable showing a teammate.

---

## Step 1: Scaffold the Next.js App

Create a new Next.js project with TypeScript and Tailwind enabled:

```sh
npx create-next-app@latest ai-chat-app --typescript --tailwind --eslint --app
cd ai-chat-app
```

Keep the defaults for everything else the CLI asks you. You'll be working almost entirely inside the `app` directory.

---

## Step 2: Install the Vercel AI SDK

The [<VPIcon icon="iconfont icon-vercel"/>Vercel AI SDK](https://vercel.com/docs/ai-sdk) is what does the heavy lifting here. It gives you one API for calling different model providers, streaming text and structured data, and handling tool calls, so you're not rewriting your chat logic every time you switch models.

Install the core package, the React bindings, and an OpenAI-compatible provider:

```sh
npm i ai @ai-sdk/react @ai-sdk/openai-compatible
```

`@ai-sdk/openai-compatible` is worth calling out specifically: instead of installing a separate package per provider, it lets you point at any provider that speaks the OpenAI-style API (OpenAI itself, Gemini, Groq, and plenty of self-hosted setups) just by swapping a base URL. Combined with an `AI_PROVIDER` environment variable, you get provider switching without touching your route handler at all, which is exactly the pattern you'll build in the next step.

---

## Step 3: Why shadcn/ui Pairs So Well With AI Chat UIs

Before you write any UI code, it's worth understanding why so many AI chat products lean on shadcn/ui instead of a traditional component library.

Most component libraries hand you a compiled package and hide the internals behind props. That works fine for a settings page, but it works badly for a chat interface. For chat, you need to control exactly how a message bubble animates while it streams, how a "thinking" indicator behaves, or how a tool call renders differently from plain text.

shadcn/ui takes a different approach: instead of installing a package, you copy the component's actual source code into your project. You own it completely, with no fighting an abstraction to bend it to your use case and no waiting on a maintainer to expose the one prop you need. That ownership model is exactly what a chat interface needs, since almost no two AI products render messages, reasoning, or tool output the same way.

It's also why an entire ecosystem has grown up around it. If you want a wider set of production-ready blocks and templates beyond the default registry, including dashboards, marketing sections, and full chat UIs, the [<VPIcon icon="iconfont icon-shadcn"/>shadcn/ui](https://shadcnspace.com/) community hub at Shadcn Space is worth bookmarking. You'll come back to it later in this tutorial.

---

## Step 4: Set Up shadcn/ui in Your Project

Since you already have a Next.js project from Step 1, apply the Shadcn Space preset to it directly:

```sh
npx shadcn@latest apply --preset b0
```

This sets up `components.json`, your Tailwind config, and <VPIcon icon="fas fa-folder-open"/>`lib/`<VPIcon icon="iconfont icon-typescript"/>`utils.ts` inside your existing project. From there, pull in the components you need for a chat screen:

```sh
npx shadcn@latest add button input textarea scroll-area avatar separator
```

Each `add` call copies real, readable component source into <VPIcon icon="fas fa-folder-open"/>`components/ui/`, ready to import and edit like any other file in your project, with no compiled package to fight with later.

If you'd rather not assemble the message list and composer from individual primitives, Shadcn Space also has ready-made [<VPIcon icon="iconfont icon-shadcn"/>AI chat blocks](https://shadcnspace.com/blocks/dashboard-ui/ai-chat) that you can add directly:

```sh
npx shadcn@latest add @shadcn-space/ai-chat-01

npx shadcn@latest add @shadcn-space/ai-chat-03
```

`ai-chat-01` provides the conversation interface with a welcome screen, suggested prompts, a scrollable message thread, and a composer with attachments and a model picker.

::: info Live Preview of AI Chat 01:

![Live Preview of AI Chat 01](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/6369c5c8-9ad3-4725-89d1-7e077581aa8b.webp)

`ai-chat-03` provides the surrounding application shell with a collapsible sidebar, pinned and recent chats, search, and a topbar.

:::

::: info Live Preview of AI Chat 03:

![Live Preview of AI Chat 03](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/96cb68c3-85b8-405b-9f20-82fe2d378bb4.webp)

:::

You can install either block separately, or install both if you want the complete chat layout without building the surrounding interface from scratch.

Both blocks are Premium. If you want a free sidebar for your chat interface, the standard shadcn `sidebar-07` block is a lightweight, no-cost alternative:

```sh
npx shadcn@latest add sidebar-07
```

---

## Step 5: Build the Streaming API Route

Create <VPIcon icon="fas fa-folder-open"/>`app/api/chat/`<VPIcon icon="iconfont icon-typescript"/>`route.ts`. This server-side piece talks to the model and streams the response back to the browser.

```ts :collapsed-lines title="app/api/chat/route.ts"
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const PROVIDERS: Record<string, { baseURL: string; model: string }> = {
  openai: {
    baseURL: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
  },
  gemini: {
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
    model: "gemini-2.5-flash",
  },
  groq: {
    baseURL: "https://api.groq.com/openai/v1",
    model: "llama-3.3-70b-versatile",
  },
};

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const providerName =
    process.env.AI_PROVIDER?.trim().toLowerCase() ?? "openai";

  const { baseURL, model } =
    PROVIDERS[providerName] ?? PROVIDERS.openai;

  const provider = createOpenAICompatible({
    name: providerName,
    baseURL: process.env.AI_BASE_URL ?? baseURL,
    apiKey: process.env.AI_API_KEY,
  });

  const result = streamText({
    model: provider(process.env.AI_MODEL ?? model),
    system: "You are a concise, helpful assistant.",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

A few things worth calling out:

- `createOpenAICompatible` gives you one provider instance that works against any OpenAI-style API. Swap `AI_PROVIDER` between `openai`, `gemini`, or `groq` and your route handler doesn't change at all.
- `convertToModelMessages` bridges the UI message format, which the client sends, with the format the model provider expects.
- `streamText` starts the model generating and returns a stream you can pipe straight to the client.
- `toUIMessageStreamResponse()` wraps that stream in a response your `useChat` hook on the client knows how to consume, token by token.

Set your provider and key in <VPIcon icon="iconfont icon-dotenv"/>`.env`:

```sh title=".env"
AI_PROVIDER=openai
AI_API_KEY=
```

If you don't have a key yet, you can still build the UI. Just have this route return a canned streamed response until you're ready to wire up a real provider. The client code below doesn't care where the stream comes from.

---

## Step 6: Wire Up the Client With useChat

Now, let’s build the chat interface. Create a <VPIcon icon="fas fa-folder-open"/>`components/`<VPIcon icon="fa-brands fa-react"/>`chat.tsx` file:

```tsx :collapsed-lines title="components/chat.tsx"
"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function Chat() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading =
    status === "submitted" || status === "streaming";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="flex h-screen flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" && "justify-end"
              )}
            >
              {message.role !== "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.parts.map((part, i) =>
                  part.type === "text" ? (
                    <span key={i}>{part.text}</span>
                  ) : null
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message the assistant..."
            className="min-h-11 flex-1 resize-none"
            disabled={isLoading}
          />

          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
```

Drop `<Chat />` into <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` and run `npm run dev`. You now have a working, streaming chat interface. Every message the model sends back appears word by word instead of all at once, and `status` gives you a clean way to disable the input while a response is in flight.
 title=" :collapsed-linesthat `useChat` is doing a lot of quiet work here:" it owns the message list, handles the streaming reassembly as chunks arrive, and manages the submitted, streaming, and ready lifecycle so you don't have to track any of that by yourself.

::: info Live Preview:

![Live Preview of Chat](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/8fb95a2f-68c8-4449-bf74-5baa0bde59e1.webp)

:::

---

## Step 7: Let the Model Call Tools

A chat box that can only talk is limiting. The AI SDK lets your model call real functions in your code, with a JSON schema describing the input it's allowed to send.

Add this to your route handler, right next to the provider setup from Step 5:

```ts :collapsed-lines title="app/api/chat/route.ts"
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
  convertToModelMessages,
  jsonSchema,
  streamText,
  tool,
  type UIMessage,
} from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const provider = createOpenAICompatible({
    name: "openai",
    baseURL: "https://api.openai.com/v1",
    apiKey: process.env.AI_API_KEY,
  });

  const result = streamText({
    model: provider("gpt-4o-mini"),
    messages: convertToModelMessages(messages),

    tools: {
      getWeather: tool({
        description: "Get the current weather for a city",

        inputSchema: jsonSchema<{ city: string }>({
          type: "object",

          properties: {
            city: {
              type: "string",
              description: "The city to get the weather for",
            },
          },

          required: ["city"],
        }),

        execute: async ({ city }) => {
          // Call a real weather API here in production
          return {
            city,
            temperature: 22,
            condition: "clear",
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
```

The model decides when to call `getWeather`, the SDK routes that call to your `execute` function, and the result streams back into the conversation as a message part. No extra plumbing is needed on the client beyond checking `part.type` for tool parts if you want to render them differently from plain text.

---

## Step 8: Prototype the UI Without a Backend

Here's a problem you'll hit constantly: you want to polish the chat UI, including spacing, animations, and how a reasoning block collapses, before your backend or API keys are even ready. Rebuilding that UI against a live model every time you tweak a pixel is slow and burns tokens.

This is exactly what the [<VPIcon icon="iconfont icon-shadcn"/>shadcn AI SDK helper](https://ui.shadcn.com/docs/helpers/ai-sdk) package solves. It lets you script out a fake conversation and stream it through the same `useChat` hook you're already using, with no server, model, or API key involved:

```sh
npm install @shadcn/helpers
```

```tsx
import { createChat } from "@shadcn/helpers";
import { useChat } from "@ai-sdk/react";

const chat = createChat()
  .user("What changed in the last release?")
  .assistant("The release added keyboard shortcuts and faster search.");

function ChatPreview() {
  const { messages } = useChat({
    messages: chat.get(0),
    transport: chat.transport(),
  });

  // render `messages` exactly like you would with a real backend
}
```

It supports every part type the AI SDK understands, including reasoning, tool calls, files, and sources, and streams deterministically every time. This also makes it genuinely useful for writing reproducible demos or UI tests.

You can build and refine your entire interface this way, then swap in the real `/api/chat` route the moment your backend is ready.

---

## Turning Your Chat Into a Full Product

A chat window rarely ships alone. Once yours works, you'll usually need a sidebar for past conversations, a settings panel for model selection, and maybe an admin view to see usage across your users. That's a different problem than streaming text. It's application shell and data-table territory.

Rather than hand-rolling that shell, most teams reach for a pre-built admin layout. A ready-made [<VPIcon icon="iconfont icon-shadcn"/>shadcn dashboard](https://shadcnspace.com/admin-dashboard), like the one at Shadcn Space, ships with the layouts, data tables, charts, and navigation patterns an internal tool needs, so you're not rebuilding a sidebar and settings page from scratch just to give your chat feature a home.

And if you'd rather skip building the chat screen itself too, that's a real option. Some teams start straight from a ready-made [<VPIcon icon="iconfont icon-shadcn"/>shadcn AI chat app](https://shadcnspace.com/templates/ai-chatbox) template that already has a conversation sidebar, markdown and code rendering, and tool-call visualization built in. We'll come back to that at the end.

::: info Live Preview of full Chat App

![Live Preview of full Chat App](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/80b2e6a0-4f2f-4223-a060-9e1e5172f0e3.webp)

:::

---

## Speed Up shadcn Development With an MCP Server

However you build your chat UI, there's a faster way to pull in components than copy-pasting from docs: an MCP (Model Context Protocol) server that gives your AI coding assistant live access to a component registry.

The Shadcn MCP server connects tools like Claude Code, Cursor, and Windsurf directly to the [<VPIcon icon="iconfont icon-shadcn"/>Shadcn Space](https://shadcnspace.com/) component catalog. Instead of you searching docs and pasting install commands, you just ask your assistant for what you need, such as "add a message bubble component with an avatar and timestamp", and it pulls real, current component definitions instead of guessing from outdated training data.

Setting it up is a one-line command for Claude Code:

```sh
claude mcp add shadcnspace-mcp -- npx -y shadcnspace-mcp@latest
```

Other editors just need the same command dropped into their MCP config file, for example <VPIcon icon="fas fa-folder-open"/>`.cursor/`<VPIcon icon="iconfont icon-json"/>`mcp.json` in Cursor. The full [<VPIcon icon="iconfont icon-shadcn"/>getting started guide for the MCP server](https://shadcnspace.com/docs/getting-started/mcp-server-docs) walks through configuration for each supported editor, and the [<VPIcon icon="iconfont icon-shadcn"/>Shadcn MCP](https://shadcnspace.com/mcp) page covers exactly what it can search, install, and generate once it's connected.

If you'd rather watch the setup than read it, there's a short walkthrough that covers the same steps end to end.

<VidStack src="youtube/ymTlzbkvvPk" />

---

## A Few Things to Handle Before You Ship

The tutorial version above is intentionally minimal. Before this goes anywhere near production, add:

- **Rate limiting** on your `/api/chat` route. A chat endpoint with no limits is an easy way to run up a very large model bill.
- **Abort handling** so users can stop a response mid-stream, which `useChat` supports out of the box via its `stop()` function.
- **Error boundaries** around the chat component, since a dropped stream or provider outage shouldn't crash the whole page.
- **Auth**, if responses or conversation history should be scoped to a specific user.

None of these are exotic. They're the same production basics you'd apply to any API route. Chat endpoints just make it easier to forget them because the happy path looks so smooth in development.

---

## Skip the Boilerplate With a Ready-Made Template

Everything above gets you a real, working chat interface, but it's the tutorial version. A production chat product usually also needs a conversation sidebar, project grouping, markdown and syntax-highlighted code blocks, a reasoning panel, voice input, and a settings screen for switching models. Building all of that from scratch can be a multi-week job on its own.

If you'd rather not build that shell yourself, it's worth checking out the [<VPIcon icon="iconfont icon-shadcn"/>shadcn AI chat app](https://shadcnspace.com/templates/ai-chatbox) template at Shadcn Space. It's built on the same foundation covered in this article (Next.js, the Vercel AI SDK, and shadcn ui) but ships with the sidebar, reasoning and tool-call UI, file attachments, and multi-provider model switching already wired up. You set `AI_PROVIDER` and `AI_API_KEY` and you're talking to a real model through a finished interface.

You can check out the [<VPIcon icon="iconfont icon-shadcn"/>live demo](https://shadcnspace.com/templates/preview/ai-chatbox-nextjs) to see exactly how the sidebar, streaming, and tool calls behave before deciding whether to build it yourself or start from the template.

---

## Wrapping Up

You now have a chat interface that streams real responses, calls tools, and is built entirely on components you own and can freely edit. And for an AI product, all this matters more than it sounds like it should. The Vercel AI SDK handles the hard streaming and model logic while shadcn/ui gives you full control over how that logic actually looks on screen.

From here, the natural next steps are hooking up a real provider, adding the production basics above, and deciding whether to keep extending your own UI or lean on a finished template to get the surrounding product built faster. Either way, you now understand what's actually happening under the hood, which makes both paths a lot easier.

::: info Resources

- [**Vercel AI SDK**](https://vercel.com/docs/ai-sdk)
- [**Shadcn AI SDK**](https://vercel.com/docs/ai-sdk)
- [**shadcn dashboard**](https://shadcnspace.com/admin-dashboard)
- [**Shadcn ui**](https://shadcnspace.com/)
- [**shadcn AI chat app**](https://shadcnspace.com/templates/ai-chatbox)

:::

::: info About Author

I wrote this article with the help of Ashutosh Rada (Sr. Frontend Developer). [Connect on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`ashutosh-rada`)](https://linkedin.com/in/ashutosh-rada/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an AI Chat App Interface With the Vercel AI SDK and Shadcn/ui",
  "desc": "Every other AI product you open today has the same screen: a message list, a text box at the bottom, and words that stream in one token at a time. It looks simple, but it's not simple to build well. Y",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-ai-chat-app-interface-with-the-ai-sdk.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
