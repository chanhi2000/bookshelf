---
lang: en-US
title: "Create AI Workout Plans with Cloudflare Durable Objects"
description: "Article(s) > Create AI Workout Plans with Cloudflare Durable Objects"
icon: fa-brands fa-cloudflare
category:
  - Node.js
  - React.js
  - DevOps
  - Vercel
  - Cloudflare
  - AI
  - LLM
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - devops
  - vercel
  - cloudflare
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Create AI Workout Plans with Cloudflare Durable Objects"
    - property: og:description
      content: "Create AI Workout Plans with Cloudflare Durable Objects"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/making-the-most-of-vercels-ai-sdk-with-cloudflare-durable-objects.html
prev: /devops/cloudflare/articles/README.md
date: 2026-09-28
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11162
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
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
  "title": "Cloudflare > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/vercel/articles/README.md",
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
  name="Create AI Workout Plans with Cloudflare Durable Objects"
  desc="Discover how to leverage Cloudflare's Durable Objects for managing AI workout templates, ensuring seamless user experiences and data persistence."
  url="https://blog.master.dev/making-the-most-of-vercels-ai-sdk-with-cloudflare-durable-objects/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11162"/>

I’ve written about [**Vercel’s AI SDK and AI Gateway before**](/blog.master.dev/having-fun-with-vercels-ai-sdk-and-ai-gateway.md). That post covered the basics of setting up an account in the AI Gateway (or directly in a provider of your choice), and making requests against an AI model while constraining the structure of the data it sent back, to ensure you could use it in your application: if your database is expecting a field called `weight`, things won’t work well if the LLM sends back that data in a field called `bodyweight`.

That post used an existing fitness tracker app I’ve been toying with. It set up a rudimentary UI for the user to provide the LLM with some reference workouts, and a prompt to produce new workouts. The AI SDK received the prompt, the reference workouts, and a list of all exercises; it sent back commentary along with the generated workouts. To keep things simple, I set up a basic modal that simply showed a spinner while the request was being processed (which usually takes about 30 seconds, or even more). When the request finished, the workouts displayed, along with a save button if the user wanted to save them into their account.

The limitations of this UX should be obvious. If the user refreshed the page while the request was in flight, everything would be lost. If the user even refreshed the page after those results were in the modal, they’d also be lost. Granted, the latter is easy to fix: we could save those results in our own database for later recall. But this post wraps everything into one cohesive UI with one of my favorite infrastructure primitives: Cloudflare Durable Objects.

---

## Why Durable Objects

I have also written [**about Durable Objects**](/blog.master.dev/durable-objects-on-cloudflare.md) (DOs) before.

The elevator pitch for DOs is that they’re like a regular Cloudflare Worker, except instead of being ephemeral, and spun up quickly to serve a request before dying off, they come with persistent storage (SQLite), and even have built-in WebSocket support. Oh, and as the name implies, they’re durable. They’re expected to be long-lived and hibernate (at no cost) when not in use.

You define a DO with a class, and then instantiate it with whatever unique IDs you want (one per user, or whatever you can imagine). Each one you spin up has its own dedicated SQLite database and collection of WebSocket connections.

This provides us all the missing primitives we need. When the user hits the “Generate” button to run their prompt, we run it *on* the Durable Object and save it to SQLite. When the request is finished, we again save it (in SQLite) and then use a WebSocket to *push* the result to the user’s browser. And if the user refreshes the page, we can hit up that same DO and ask it to query its SQLite db for current prompts, past prompts, etc.

I obviously won’t show every line of code, but [the repo is here (<VPIcon icon="iconfont icon-github"/>`arackaf/fitness-tracker`)](https://github.com/arackaf/fitness-tracker). This is currently a work in progress in the <VPIcon icon="fas fa-code-branch"/>`feature/ai-workout-template-generation` branch, but by the time you read this, it might be in `main`.

Let’s get started.

---

## Our Durable Object Definition

Here’s an initial, incomplete segment of our Durable Object; the whole thing is about 250 lines, so we’ll just show the important concepts.

```ts
import { DurableObject, env } from "cloudflare:workers";
import { drizzle, type DrizzleSqliteDODatabase } from "drizzle-orm/durable-sqlite";

export class WorkoutTemplateAIGenerationDO extends DurableObject {
  db: DrizzleSqliteDODatabase;
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);

    ctx.blockConcurrencyWhile(async () => {
      ctx.storage.sql.exec(initialWorkoutTemplateDDL);
    });

    this.db = drizzle(ctx.storage);
  }
}
```

I like using [<VPIcon icon="fas fa-globe"/>Drizzle](https://orm.drizzle.team/) for data access. It’s basically a TypeScript API that very closely mirrors actual SQL, but with auto-complete and static typings to help prevent invalid queries. That’s what this declares `db: DrizzleSqliteDODatabase;`

In the constructor, I use the `ctx.blockConcurrencyWhile` helper to essentially lock this DO until the code in the callback is finished. This ensures the current DO runs my SQL migration script, if needed, and prevents other requests from running while the DB is in an inconsistent state. I put it in the constructor, so it runs every time a Durable Object instance is created, or re-created from hibernation. The DDL is therefore structured with things like `CREATE TABLE IF NOT EXISTS` to only create schema objects if they’re not there already.

Then I instantiate the `drizzle` object.

---

## Setting Up Our WebSocket

I covered this in detail in my prior [**Durable Objects post**](/blog.master.dev/durable-objects-on-cloudflare.md), but to accept and set up WebSocket connections you need a fetch method which takes the raw request, inside of which we call some built-in Cloudflare utilities to establish and save the connection.

```ts
fetch(request: Request): Response {
  if (request.headers.get("Upgrade") !== "websocket") {
    return new Response("Expected WebSocket", {
      status: 426,
    });
  }

  // ...

  const pair = new WebSocketPair();
  const client = pair[0];
  const server = pair[1];

  this.ctx.acceptWebSocket(server);

  return new Response(null, {
    status: 101,
    webSocket: client,
  });

}
```

### Sending WebSocket Messages

To get all open sockets for this durable object, we call `this.ctx.getWebSockets()` and use the `send` method accordingly.

```ts
sendMessage(payload: Object) {
  for (const socket of this.ctx.getWebSockets()) {
    try {
      socket.send(JSON.stringify(payload));
    } catch {
      // The socket may have disconnected before Cloudflare observed it.
      socket.close(1011, "Unable to send message");
    }
  }
}
```

Simple and humble.

### Connecting to the Durable Object’s WebSocket

If you’re curious how to get a raw connection into the DO, so we can establish a WebSocket connection, the trick is to use what most meta-frameworks call an API route (and which TanStack calls a server route). You establish your connection to *that*, and that API route simply forwards (proxies) the request to the Durable Object.

```ts
import { getWorkoutTemplateAIGenerationDurableObject } from "@/durable-objects/WorkoutTemplateAIGeneration/do";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/admin/workout-templates/ai/$id/subscribe")({
  server: {
    handlers: {
      GET: async ({ request, context }) => {
        const cart = await getWorkoutTemplateAIGenerationDurableObject(context);
        return cart.fetch(request);
      },
    },
  },
});
```

along with a bit of helper code to send the request to the right place, no matter whether you’re in production or development mode.

```ts
export function openWorkoutTemplateWebSocket(sessionId: string, lastPromptId?: number) {
  return new Promise<WebSocket>((res, rej) => {
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";

    const socket = new WebSocket(
      `${protocol}//${location.host}/app/admin/workout-templates/ai/${sessionId}/subscribe${lastPromptId ? `?lastPromptId=${lastPromptId}` : ""}`,
    );

    socket.addEventListener("open", () => {
      res(socket);
    });

    socket.addEventListener("error", event => {
      rej(event);
    });
  });
}
```

---

## Running Prompts and Saving Data

When the user wants to run a prompt, we can save a new session into our SQLite database.

```ts
createSession(promptInfo: PromptInput): { id: number } {
  const result = this.db
    .insert(sessionTable)
    .values({
      name: "",
      createdAt: new Date().toISOString(),
    })
    .returning({ id: sessionTable.id })
    .all();

  const sessionId = result[0].id;

  // ...

  this.prompt(promptInfo)
    .then(promptResult => {
      // ...
    })
    .catch(() => {
      // ...
    })
    .finally(() => {
      this.sendUpdateForPromptId(sessionId, sessionPromptId);
    });

  return result[0];
}
```

The `prompt` method being called here is what interacts directly with the Vercel AI SDK.

```ts
export class WorkoutTemplateAIGenerationDO extends DurableObject {
  // ...
  async prompt(input: PromptInput): Promise<PromptResult> {
    const { workoutTemplates, prompt, exercises, model = "anthropic/claude-sonnet-4.6" } = input;

    try {
      const { output, usage, finalStep } = await generateText({
        instructions: systemPrompt(workoutTemplates, exercises),
        model,
        prompt: userPrompt(prompt, workoutTemplates),
        // ...
      });

      // ....
    } catch (err) {}
  }
}
```

See my [**prior post**](/blog.master.dev/having-fun-with-vercels-ai-sdk-and-ai-gateway.md) on the SDK for more details.

I’m deliberately leaving out some code, and in fact I’m probably showing too much. Really just understand how these pieces fit together, and build whatever UI and workflow works best for you.

---

## Reading Data

The `getSessions` method is an example of fetching data from our SQLite instance to return to our UI. Here we can pull up all sessions the user has ever started (whether in progress or complete). Note the lack of async or await; the SQLite API is synchronous, which is especially nice. Note also the lack of filters based on the current user.

```ts
getSessions() {
  const rows = this.db.select().from(sessionTable).all();
  return rows;
}
```

If you recall, we create instances of these Durable Objects *per user*, based on their userId from our authentication layer. This means each user’s Durable Object has *its own SQLite database*, and we can simply dump the table to get all sessions, or delete sessions at will. The user has access to everything in the Durable Object’s DB because of how we’ve chosen to instantiate them. To access someone else’s data, they’d have to gain access to someone else’s Durable Object, which they could only do by breaking our own authentication mechanism, in which case we’d have bigger problems!

---

## Interacting With Our Durable Object

First, here’s a helper to get a connection to a given user’s Durable Object. We saw this helper above with the server route for forwarding connections to our Durable Object’s WebSocket.

```ts
export const getWorkoutTemplateAIGenerationDurableObject = async (context: AuthContext) => {
  const userId = await requireUserId(context);
  const { WorkoutTemplateAIGenerationDO } = env;
  const doId = WorkoutTemplateAIGenerationDO.idFromName(userId);
  return WorkoutTemplateAIGenerationDO.get(doId);
};
```

Then a server function interacting with our durable object might look something like this.

```ts
export const loadAiSessionServerFn = createServerFn({ method: "POST" })
  .validator((payload: { sessionId: number }) => payload)
  .handler(async ({ data, context }): Promise<SessionPayload> => {
    const durableObject = await getWorkoutTemplateAIGenerationDurableObject(context);
    return durableObject.loadSession(data.sessionId);
  });
```

---

## Putting It All Together

Once you understand how these pieces fit together, you can clearly instruct your preferred agent and harness of choice to build whatever UX and workflow you’d like.

Mine looks something like this. The main page lets you prompt for new workout templates, along with links to prior prompting sessions.

![User interface for creating workout plans with AI, showing template selection and prompt input areas.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-01-main-page.jpg?resize=862%2C1024&quality=89&ssl=1)

After we fill out our prompt and hit generate, we call a server function, which calls into our durable object to create the session, start the prompt, and then immediately returns the session ID (without waiting for the prompt).

With the session ID, I then redirect to a page for that dedicated session. That page has the session ID in the URL, and I use it to load the full prompt and response history for that session, as well as set up a WebSocket connection.

![Screenshot of an AI workout session layout, displaying session details, referenced workout templates for Back & Biceps Day and Shoulder Day, and a prompt requesting workouts focused on growth.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-03a-session-waiting.jpg?resize=1024%2C647&quality=89&ssl=1)

In the session in the screenshot above, we’re still waiting on the prompt response from the AI model. When that finally comes in, the WebSocket sends the update, and we update the UI.

![A workout plan for back and biceps focused on muscle hypertrophy, featuring 4 sets of exercises with 8-12 rep range and final sets to failure for optimal growth.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-03b-results.jpg?resize=894%2C1024&quality=89&ssl=1)

I display the model’s response, along with the proposed workouts. Since I’m using a Zod schema to force these workout templates into the same structure used by the rest of the application, I can put them directly into the same form components I usually use to let the user set up their own workout templates manually.

![Screenshot of a workout planning interface showing exercises for Preacher Curl and Dumbbell Curl, with fields for sets, reps, weights, and options for failure.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-03c-results-save-button.jpg?resize=1024%2C942&quality=89&ssl=1)

When the user hits the save button, I use the save endpoints I already have, notify the durable object that the workout has been saved, and then render it in my existing component for read-only display of workout templates.

![Workout plan focused on hypertrophy for back and biceps, outlining exercises and reps for muscle growth.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/img-03d-results-template-saved.jpg?resize=926%2C1024&quality=89&ssl=1)

---

## Wrapping Up

I hope I’ve shown why Cloudflare’s Durable Objects are such a good fit for managing long-running AI sessions. To be clear, their feature sets make them a great fit for a *ton* of use cases. Durable Objects come with

- Dedicated SQLite storage scoped to each individual DO instance you choose to create
- Built-in WebSocket support
- All the normal benefits Cloudflare Workers offer, like low latency

In this post, we put those features together to build a feature that tracks AI prompts. We stored the prompts and results in SQLite and pushed results to the user as they came in via the built-in WebSocket.

---

## Parting Thoughts

Vercel’s AI SDK is a great tool for making model-agnostic requests. I’ve found Cloudflare’s Durable Objects to be a fantastic feature for making the most of it. From dedicated storage to built-in WebSocket support, it has plenty of features that make implementing real use cases as straightforward as possible.

```component VPCard
{
  "title": "Having Fun with Vercel’s AI SDK and AI Gateway",
  "desc": "The why and how to get it installed and use it with different models, then actually build something. Plus a little Zod type safety for good measure.",
  "link": "/blog.master.dev/having-fun-with-vercels-ai-sdk-and-ai-gateway.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2025/05/rag.png?fit=1200%2C706&quality=80&ssl=1&resize=350%2C200)](/blog.master.dev/cloudflare-autorag/ "Cloudflare AutoRAG")

#### [Cloudflare AutoRAG](/blog.master.dev/cloudflare-autorag/ "Cloudflare AutoRAG")

I enjoyed this video from Kristian Freeman from Cloudflare on building something quickly with their AutoRAG feature. RAG (Retrieval-Augmented Generation), as I understand it, means that you're going to ask an AI model a question, but you want that answer informed by a whole corpus of documents. As in, ask…

```component VPCard
{
  "title": "Durable Objects on Cloudflare",
  "desc": "This is a post on one of Cloudflare’s coolest features: Durable Objects. We’ll introduce what they are, how they work, and walk through a reasonably realistic use case for them. Cloudflare Workers Review I’ve written about Cloudflare Workers previously, with an introduction to them and a post about some of the slightly unorthodox things you […]",
  "link": "/blog.master.dev/durable-objects-on-cloudflare.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Create AI Workout Plans with Cloudflare Durable Objects",
  "desc": "Discover how to leverage Cloudflare's Durable Objects for managing AI workout templates, ensuring seamless user experiences and data persistence.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/making-the-most-of-vercels-ai-sdk-with-cloudflare-durable-objects.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
