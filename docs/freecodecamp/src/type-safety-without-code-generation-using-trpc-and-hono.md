---
lang: en-US
title: "How to Get Type Safety Without Code Generation Using tRPC and Hono"
description: "Article(s) > How to Get Type Safety Without Code Generation Using tRPC and Hono"
icon: iconfont icon-hono
category:
  - Node.js
  - TypeScript
  - tRPC
  - Hono
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - ts
  - typescript
  - trpc
  - ts-trpc
  - hono
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Get Type Safety Without Code Generation Using tRPC and Hono"
    - property: og:description
      content: "How to Get Type Safety Without Code Generation Using tRPC and Hono"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/type-safety-without-code-generation-using-trpc-and-hono.html
prev: /programming/ts-trpc/articles/README.md
date: 2026-01-13
isOriginal: false
author:
  - name: Tarun Singh
    url : https://freecodecamp.org/news/author/tarunsinghofficial/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768240380001/79d5aa1f-438e-4a1e-a072-3166b9a36333.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "tRPC > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts-trpc/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Hono > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-hono/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Get Type Safety Without Code Generation Using tRPC and Hono"
  desc="Have you ever updated your backend API property name but neglected to also update the frontend? I'm sure you have. When this occurs, it leads to production crashes and unhappy customers, plus you've wasted your entire week fixing the problem. To reso..."
  url="https://freecodecamp.org/news/type-safety-without-code-generation-using-trpc-and-hono"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768240380001/79d5aa1f-438e-4a1e-a072-3166b9a36333.png"/>

Have you ever updated your backend API property name but neglected to also update the frontend? I'm sure you have. When this occurs, it leads to production crashes and unhappy customers, plus you've wasted your entire week fixing the problem.

To resolve this issue in the past, you typically had to create a multitude of TypeScript interfaces by hand, using GraphQL Code Generator to generate the interface files, or hope that it all worked out. Well, there’s a better way to accomplish this now, without the need for code generation.

[tRPC](https://trpc.io/) and [Hono](https://hono.dev/) are two applications that are changing how we develop TypeScript-based applications throughout the entirety of the full-stack.

By the end of this tutorial, you’ll understand:

- Why traditional REST APIs fail at type safety
- How tRPC provides full end-to-end type inference between backend and frontend
- How Hono delivers type-safe APIs while staying REST-friendly
- When to choose tRPC vs Hono for your projects
- How these tools improve developer experience, team velocity, and reliability

If you’re building full-stack TypeScript applications and want fewer runtime bugs and faster iteration, this guide is for you.

::: note Prerequisites

To follow along comfortably, you should have:

- Basic knowledge of TypeScript
- Familiarity with REST APIs and how frontend-backend communication works
- Some experience with Node.js and modern JavaScript frameworks
- A general understanding of frontend frameworks like React or Next.js (helpful, but not required)

You don’t need prior experience with tRPC, Hono, or GraphQL.

:::

---

## The Problem with Traditional APIs

You’ve probably written something like this a hundred times:

```ts
// Backend (Express)
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  // Do stuff with user
  res.json({ id: 1, name, email });
});

// Frontend
const createUser = async (name: string, email: string) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  return response.json(); 
};
```

The backend knows the shape of the data. But the frontend...it hopes it gets it right. You end up writing interfaces manually, like:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

If you change the backend tomorrow to return `userId` instead of `id`, TypeScript won't catch it. Your types and reality have diverged, and you won't know until runtime.

[<VPIcon icon="iconfont icon-graphql"/>GraphQL](https://graphql.org/) tried to solve this with schemas and codegen, but honestly? Setting up GraphQL feels like assembling IKEA furniture without instructions. You need a schema, resolvers, code generation tools, and suddenly your "simple" API has a 30-minute setup process.

---

## What Makes tRPC Different?

tRPC flips the script entirely. Instead of defining your API in a separate schema language, your TypeScript code is the schema. Here's the same API in tRPC:

```ts
// Backend (tRPC router)
import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
  createUser: t.procedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
    }))
    .mutation(({ input }) => {
      // Do stuff with user
      return { id: 1, name: input.name, email: input.email };
    }),
});

export type AppRouter = typeof appRouter;
```

This is where it gets cool. On your frontend:

```ts
// Frontend - fully type-safe!
import { createTRPCClient } from '@trpc/client';
import type { AppRouter } from './server';

const client = createTRPCClient<AppRouter>({
  url: 'http://localhost:3000/trpc',
});

// TypeScript knows EVERYTHING about this call
const user = await client.createUser.mutate({
  name: 'Alice',
  email: 'alice@example.com'
});

// user is automatically typed as { id: number; name: string; email: string; }
```

No code generation or build step, or GraphQL schema. Just pure TypeScript inference doing its thing. If you rename `id` to `userId` in your backend, your frontend will immediately show a TypeScript error. You'll catch it before you even save the file.

This is what we call end-to-end type safety, and it's honestly a great transition.

---

## Hono: The Lightweight Challenger

While tRPC is amazing for full-stack TypeScript apps where you control both ends, [<VPIcon icon="iconfont icon-hono"/>Hono](https://hono.dev/) takes a slightly different approach. It's a lightweight web framework that gives you type safety while still being a traditional HTTP framework.

Here's the same example in Hono:

```ts
import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const app = new Hono();

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

app.post('/api/users', zValidator('json', userSchema), (c) => {
  const { name, email } = c.req.valid('json');
  return c.json({ id: 1, name, email });
});

export type AppType = typeof app;
```

On the frontend, you can use Hono’s RPC client:

```ts
import { hc } from 'hono/client';
import type { AppType } from './server';

const client = hc<AppType>('http://localhost:3000');

const response = await client.api.users.$post({
  json: { name: 'Bob', email: 'bob@example.com' }
});

const user = await response.json();
// user is fully typed!
```

Hono is incredibly fast (it runs on Cloudflare Workers, Deno, Bun, and Node.js), and it gives you that sweet type safety while still being a "regular" HTTP framework. You get RESTful routes, middleware, and all the familiar patterns – just with TypeScript powers.

---

## Why This Matters These Days

You might think to yourself, “Okay, I know what you mean, but why should I care about it?” There’s a reason why these tools are being utilized more now than ever before.

### Developer experience is essential

In 2026 and beyond, we’ll no longer accept long feedback loops. The ability to modify your backend code and see what might break on your frontend application without having to run the application will be fantastic for productivity. We’ll spend less time fixing bugs and more time creating new functionalities.

### Smaller teams, better apps

With tRPC or Hono, one developer can create an entire full-stack application with type safety at a very fast pace because they don’t have to switch back and forth between REST documentation and TypeScript interfaces – all the data is flowing to and from their backend code directly to their frontend.

### The end of “Works on my machine“

With type safety, errors are caught at compile time instead of at the time your end-user clicks on a button. This is especially impactful when working in larger teams, when the backend developers and front-end developers may not be in constant communication with one another.

---

## Getting Started

Want to try this out? Here's the fastest way:

For tRPC:

```sh
npm create @trpc/next-app@latest
```

This scaffolds a Next.js app with tRPC already configured. Check out the [<VPIcon icon="iconfont icon-trpc"/>official tRPC docs](https://trpc.io/docs/client/nextjs) for more.

For Hono:

```sh
npm create hono@latest
```

Pick your runtime (Node.js, Cloudflare Workers, etc.), and you're off to the races. The [<VPIcon icon="iconfont icon-hono"/>Hono documentation](https://hono.dev/) is excellent and super approachable.

---

## The Future is Type-Safe

Look, REST isn't going anywhere, and GraphQL has its place. But for full-stack TypeScript developers, tRPC and Hono represent something special: type safety without the ceremony. No code generation or no schema duplication, just TypeScript doing what it does best.

In the future, when you start a new project, give one of these a shot. Your future self – the one who's refactoring code at 2 AM – will thank you.

Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Get Type Safety Without Code Generation Using tRPC and Hono",
  "desc": "Have you ever updated your backend API property name but neglected to also update the frontend? I'm sure you have. When this occurs, it leads to production crashes and unhappy customers, plus you've wasted your entire week fixing the problem. To reso...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/type-safety-without-code-generation-using-trpc-and-hono.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
