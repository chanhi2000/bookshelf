---
lang: en-US
title: "Maximize Cloudflare's Durable Objects with TanStack Tips"
description: "Article(s) > Maximize Cloudflare's Durable Objects with TanStack Tips"
icon: iconfont icon-tanstack
category:
  - Node.js
  - React.js
  - TanStack
  - DevOps
  - Cloudflare
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
  - tanstack
  - devops
  - cloudflare
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Maximize Cloudflare's Durable Objects with TanStack Tips"
    - property: og:description
      content: "Maximize Cloudflare's Durable Objects with TanStack Tips"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/tips-and-tricks-for-using-tanstack-start-with-cloudflare-durable-objects.html
prev: /programming/js-tanstack/articles/README.md
date: 2026-10-12
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11298
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
  "title": "Cloudflare > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/cloudflare/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Maximize Cloudflare's Durable Objects with TanStack Tips"
  desc="Discover tips for using Cloudflare's Durable Objects with TanStack Start, from simplified object creation to managing WebSocket connections."
  url="https://blog.master.dev/tips-and-tricks-for-using-tanstack-start-with-cloudflare-durable-objects/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11298"/>

I’ve [**previously written**](/blog.master.dev/durable-objects-on-cloudflare.md) about Cloudflare’s [<VPIcno icon="fa-brands fa-cloudflare"/>Durable Objects](https://developers.cloudflare.com/durable-objects/) (DOs), and I’ve written about [<VPIcon icon="iconfont icon-stanstack"/>TanStack Start](https://tanstack.com/start/latest) too many times to list here (you could [**start here**](/blog.master.dev/introducing-tanstack-start.md), though, or better, [<VPIcon icon="fas fa-globe"/>take my course](https://master.dev/courses/tanstack/)).

This post covers some tips and tricks I’ve found when using them together. A few of these tips are solutions to problems that may be solved in TanStack by the time you read this. But most, like using Middleware and tagged WebSocket connections, are just ways to make the most of great features.

Let’s get started!

---

## Middleware to Simplify Durable Object Creation

Durable Objects can only be called from the server, not from the browser. A Durable Object is not a publicly addressable resource on the internet; it’s an internal resource that can only be connected to from within Cloudflare infrastructure. But since our web app is (presumably) running within Cloudflare, we can absolutely connect to it from server-side code in our web app. If your web app is hosted on a vanilla Node process, or on Vercel, Durable Objects may not be a great tool to lean on, since you’d have to stand up a new Worker just to communicate with the Durable Object.

In prior posts, I’ve shown code like this for getting an instance of the Durable Object.

```ts
export const getWorkoutTemplateAIGenerationDurableObject = async (context: AuthContext) => {
  const userId = await requireUserId(context);
  const { WorkoutTemplateAIGenerationDO } = env;
  const doId = WorkoutTemplateAIGenerationDO.idFromName(userId);
  return WorkoutTemplateAIGenerationDO.get(doId);
};
```

Code like that *could* be used like this:

```ts
export const getAiSessionsServerFn = createServerFn({ method: "POST" })
  .handler(async ({ context }): Promise<SessionSummary[]> => {
    const wtDo = await getWorkoutTemplateAIGenerationDurableObject(context);
    return wtDo.getSessions();
  });
```

But what if the signature of `getWorkoutTemplateAIGenerationDurableObject` were to change in some way? We wouldn’t want to update every call site that uses this method. Yes, of course an agent would make such a refactor trivial. Nonetheless, there’s a TanStack feature that’s built for this kind of thing: [<VPIcon icon="iconfont icon-tanstack"/>Middleware](https://tanstack.com/start/latest/docs/framework/react/guide/middleware).

### First Attempt

```ts
const withWtDo = createMiddleware({ type: "function" }).server(async ({ context, next }) => {
  const durableObject = await getWorkoutTemplateAIGenerationDurableObject(context);
  return next({
    context: {
      wtDo: durableObject,
    },
  });
});
```

Unfortunately, this creates TypeScript errors, since context is undefined. This was a surprise, since I’m using [<VPIcon icon="iconfont icon-tanstack"/>Global Middleware](https://tanstack.com/start/latest/docs/framework/react/guide/middleware#global-middleware) to add authentication info, so it should be available everywhere.

This is currently a limitation with TanStack’s static typings, but there’s an easy workaround.

### The Solution

When we created global middleware, we did so in `start.ts` at the root of our project. Inside, we have this export (this is all covered in the linked docs above)

```ts
export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, globalContextMiddleware, errorLoggingMiddleware],
  functionMiddleware: [],
}));
```

As of now, middleware can have trouble picking up things added to context in global middleware, which I’m doing here with `globalContextMiddleware`.

The workaround, for now, is to just import that very same `startInstance`, and then simply call `createMiddleware` off of `startInstance`

```ts
export const withWtDo = startInstance.createMiddleware({ type: "function" }).server(async ({ context, next }) => {
  const durableObject = await getWorkoutTemplateAIGenerationDurableObject(context);
  return next({
    context: {
      wtDo: durableObject,
    },
  });
});
```

This works like a charm.

Now we can simply add the middleware to our server functions.

```ts
export const getAiSessionsServerFn = createServerFn({ method: "POST" })
  .middleware([withWtDo])
  .handler(async ({ context }): Promise<SessionSummary[]> => {
    return context.wtDo.getSessions();
  });
```

And our Durable Object instance will be available and waiting for us in context.

---

## Tagged WebSocket Connections

Durable Objects have built-in WebSocket support. I’ve covered this in my other posts, but the short of it is, to accept and create a new WebSocket connection, you add a fetch method like so

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
```

And then, to send out a message to all WebSocket connections, you do something like this:

```ts
  sendMessage(sessionId: number, payload: Object) {
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

### Filtering WebSocket Connections

But what if you want to separate or categorize WebSocket connections? [**In my prior post**](/blog.master.dev/having-fun-with-vercels-ai-sdk-and-ai-gateway.md), I wrote about using AI to generate workouts. When the user enters a prompt, I call methods in my Durable Object to save it to a new session, then open a WebSocket connection for the results.

But what if the user has multiple sessions open at once? If a single session’s prompt results come back, when we do this

```ts
for (const socket of this.ctx.getWebSockets()) {
  try {
    socket.send(JSON.stringify(payload));
  } catch {
    // The socket may have disconnected before Cloudflare observed it.
    socket.close(1011, "Unable to send message");
  }
}
```

We’ll end up sending that prompt update to all sessions, even ones it doesn’t apply to. Sure we could add code to check and ignore irrelevant messages, but there’s a cleaner, more direct solution: tagged WebSocket connections.

### Tagging WebSocket Connections

When we create (accept) a WebSocket connection, we have the option of providing one or more tags. These let us “tag” a WebSocket connection, and we can use those tags for later retrieval.

For the AI workout generation example I just mentioned, when a new WebSocket connection is created, I include the sessionId in the URL used to set up the new connection. Remember, we have to set up our own API route, and then manually call the `fetch` method on our Durable Object, and pass in the raw request object. That raw request object contains the original URL, and you can set up whatever URL for your API route you’d like. For mine, I included the sessionId as a route param.

```ts
fetch(request: Request): Response {
  if (request.headers.get("Upgrade") !== "websocket") {
    return new Response("Expected WebSocket", {
      status: 426,
    });
  }

  const url = new URL(request.url);
  const sessionIdParam = url.pathname.split("/").at(-2) || "";
```

And then, when we call `acceptWebSocket` we can pass in a tag.

```ts
this.ctx.acceptWebSocket(server, [webSocketTag(sessionId)]);
```

The `webSocketTag` function takes in a `sessionId` and returns a string tag. Here’s the implementation:

```ts
const webSocketTag = (sessionId: number) => `session:${sessionId}`;
```

Why would I bother with a function for something so simple? Because I also use that *same* tag to *retrieve* WebSockets when I want to *send* a message, which I do like this:

```ts
sendMessage(sessionId: number, payload: Object) {
  for (const socket of this.ctx.getWebSockets(webSocketTag(sessionId))) {
    try {
      socket.send(JSON.stringify(payload));
    } catch {
      // The socket may have disconnected before Cloudflare observed it.
      socket.close(1011, "Unable to send message");
    }
  }
}
```

And with that, a given WebSocket only receives messages it cares about.

---

## Return Types, Durable Objects, and Server Functions

Here’s a Durable Object method:

```ts
export class WorkoutTemplateAIGenerationDO extends DurableObject {
  // ...
  getSessions() {
    const rows = this.db.select().from(sessionTable).all();
    return rows;
  }
  // ...
}
```

The inferred return type of this method is:

```ts
{
  id: number;
  name: string;
  createdAt: string;
}[];
```

And here’s our Server Function we use to call it:

```ts
export const getAiSessionsServerFn = createServerFn({ method: "POST" })
  .middleware([withWtDo])
  .handler(async ({ context }) => {
    return context.wtDo.getSessions();
  });
```

The inferred return type is this:

```ts
Promise<{
    id: number;
    name: string;
    createdAt: string;
}[] & Disposable
```

Note the `& Disposable`. The array of objects with `id`, `name`, etc. is what comes back from the query. `Disposable` gets added on behind the scenes, as does `Promise<T>` wrapping the whole thing.

What may be especially surprising is that setting a return type on the DO’s method does not change this.

```ts
getSessions(): SessionSummary[] {
  const rows = this.db.select().from(sessionTable).all();
  return rows;
}
```

The return type of the server function which calls the Durable Object’s function is still this:

```ts
Promise<
  {
    id: number;
    name: string;
    createdAt: string;
  }[] & Disposable
>;
```

The Durable Object result is *still* getting that `Disposable` added on. Remember, we don’t instantiate the Durable Object’s class directly; instead, we always go through this to create a proxy to the Durable Object.

```ts
const { WorkoutTemplateAIGenerationDO } = env;
const doId = WorkoutTemplateAIGenerationDO.idFromName(userId);
return WorkoutTemplateAIGenerationDO.get(doId);
```

Those utilities wrap the Durable Object and handle the network boilerplate for making requests. That’s what’s taking our actual return types and tacking on `Disposable`; and for that matter, wrapping return types with `Promise`.

### Is this a problem?

Maybe, or maybe not. For this particular example, you can probably just ignore the Disposable, and everything will probably work.

This produces no errors.

```ts
const { data: aiSessions } = useSuspenseQuery(getAiSessionsQueryOptions());

const arr: SessionSummary[] = aiSessions;
```

And `aiSessions` is of type:

```ts
{
  id: number;
  createdAt: string;
  name: string;
}[] & Disposable;
```

But thanks to the way TypeScript’s structural typing works, we can absolutely assign that to `SessionSummary[]`; the Disposable part is just ignored.

But let’s take a look at a different example.

### When the Added-On Disposable Type Gets in the Way

Have a look at this type

```ts
export type SessionPayload =
  | { status: "not-found" }
  | { status: "error" }
  | {
      status: "loaded";
      session: typeof session.$inferSelect;
      prompts: PromptPayload[];
    };
```

This Durable Object method that returns that type:

```ts
loadSession(sessionId: number): SessionPayload {
  try {
    const session = this.db.select().from(sessionTable).where(eq(sessionTable.id, sessionId)).get();
    if (!session) {
      return { status: "not-found" };
    }
    const promptsRaw = this.#queryPrompts(eq(sessionPromptTable.sessionId, sessionId)).all();

    const prompts: PromptPayload[] = promptsRaw.map(payload =>
      this.#transformQueriedPromptResult(sessionId, payload),
    );
    return { status: "loaded", session: session, prompts };
  } catch (error) {
    return { status: "error" };
  }
}
```

Simply calling and returning this method from a TanStack server function:

```ts
export const loadAiSessionServerFn = createServerFn({ method: "POST" })
  .validator((payload: { sessionId: number }) => payload)
  .middleware([withWtDo])
  .handler(async ({ data, context }) => {
    return context.wtDo.loadSession(data.sessionId);
  });
```

Produces a horrendous TypeScript error:

```plaintext
 Argument of type '({ data, context }: ServerFnCtx<Register, "POST", readonly [FunctionMiddlewareAfterServer<Register, unknown, undefined, { wtDo: DurableObjectStub<WorkoutTemplateAIGenerationDO>; }, undefined, undefined, undefined>], (payload: { ...; }) => { ...; }>) => Promise<...>' is not assignable to parameter of type 'ServerFn<Register, "POST", readonly [FunctionMiddlewareAfterServer<Register, unknown, undefined, { wtDo: DurableObjectStub<WorkoutTemplateAIGenerationDO>; }, undefined, undefined, undefined>], (payload: { ...; }) => { ...; }, Promise<...>, true>'.
  Type 'Promise<({ status: "not-found"; } & Disposable) | ({ status: "error"; } & Disposable) | ({ status: "loaded"; session: { id: number; createdAt: string; name: string; }; prompts: { ...; }[]; } & Disposable)>' is not assignable to type 'Promise<ValidateSerializableMapped<{ status: "not-found"; } & Disposable, RegisteredSerializableInput<Register>> | ValidateSerializableMapped<...> | ValidateSerializableMapped<...>>'.
    Type '({ status: "not-found"; } & Disposable) | ({ status: "error"; } & Disposable) | ({ status: "loaded"; session: { id: number; createdAt: string; name: string; }; prompts: { ...; }[]; } & Disposable)' is not assignable to type 'ValidateSerializableMapped<{ status: "not-found"; } & Disposable, RegisteredSerializableInput<Register>> | ValidateSerializableMapped<...> | ValidateSerializableMapped<...>'.
      Type '{ status: "not-found"; } & Disposable' is not assignable to type 'ValidateSerializableMapped<{ status: "not-found"; } & Disposable, RegisteredSerializableInput<Register>> | ValidateSerializableMapped<...> | ValidateSerializableMapped<...>'.
        Type '{ status: "not-found"; } & Disposable' is not assignable to type 'ValidateSerializableMapped<{ status: "not-found"; } & Disposable, RegisteredSerializableInput<Register>>'.
          Types of property '[Symbol.dispose]' are incompatible.
            Type '() => void' is not assignable to type 'SerializationError<"Function may not be serializable">'.
```

I’ll be honest, I’m not even sure why this error happened. I suspect the Union type (my `SessionPayload`) being intersected with the Disposable type produced something slightly unexpected, and incompatible with TanStack’s serialization checks. But more importantly, I *don’t care* exactly why this broke. The Disposable type is actually adding friction now, so let’s just get rid of it.

### Attempt 1

You might think something like this would be a nifty helper

```ts
export function doStrip<T>(value: T): Omit<T, typeof Symbol.dispose> {
  return value;
}
```

Take in some type, and just strip off the undesired pieces. You pass the value through this function to “clean” the type of Symbol.dispose (which is what the Disposable type adds).

When we do this:

```ts
export const loadAiSessionServerFn = createServerFn({ method: "POST" })
  .validator((payload: { sessionId: number }) => payload)
  .middleware([withWtDo])
  .handler(async ({ data, context }) => {
    return doStrip(await context.wtDo.loadSession(data.sessionId));
  });
```

The return type is now inferred as:

```ts
Omit<
  | ({
      status: "not-found";
    } & Disposable)
  | ({
      status: "error";
    } & Disposable)
  | ({
      status: "loaded";
      session: {
        id: number;
        createdAt: string;
        name: string;
      };
      prompts: {
        //.......
      };
    } & Disposable),
  typeof Symbol.dispose
>;
```

Which is… not at all what we wanted.

The problem is, `Omit<T, typeof Symbol.dispose>` doesn’t distribute over the union type that we saw before.

But TypeScript has a special type for which distributing over unions is a core feature: conditional types.

### Attempt 2

Once we realize conditional types are how we distribute over unions, we might try something like this:

```ts
type StripDisposable<T> = T extends unknown ? Omit<T, typeof Symbol.dispose> : never;

export function doStrip<T>(value: T): StripDisposable<T> {
  return value as StripDisposable<T>;
}
```

Then use it like this:

```ts
export const loadAiSessionServerFn = createServerFn({ method: "POST" })
  .validator((payload: { sessionId: number }) => payload)
  .middleware([withWtDo])
  .handler(async ({ data, context }) => {
    return doStrip(await context.wtDo.loadSession(data.sessionId));
  });
```

This works, essentially. Unfortunately, the type is reported as:

```ts
Omit<
  {
    status: "not-found";
  } & Disposable,
  typeof Symbol.dispose
> |
  Omit<
    {
      status: "error";
    } & Disposable,
    typeof Symbol.dispose
  > |
  Omit<
    {
      status: "loaded";
      session: {
        id: number;
        createdAt: string;
        name: string;
      };
      prompts: {};
    } & Disposable,
    typeof Symbol.dispose
  >;
```

It’s ugly but correct. But let’s take a step back.

### The Real Solution

The real solution is to add a return type to your server function.

Normally, with TypeScript, relying on type inference is perfectly acceptable, and frankly **preferred** most of the time. But here, we simply specify the return type we want:

```ts
export const loadAiSessionServerFn = createServerFn({ method: "POST" })
  .validator((payload: { sessionId: number }) => payload)
  .middleware([withWtDo])
  .handler(async ({ data, context }): Promise<SessionPayload> => {
    return context.wtDo.loadSession(data.sessionId);
  });
```

And that’s that. The Durable Object still returns a Disposable type. But that value, with the Disposable cruft, is still *assignable to* our return type, and anything calling into our server function will now get back solely our declared return type.

Exactly what we want.

---

## Parting Thoughts

Hopefully this post contained some useful tidbits for using Durable Objects effectively with TanStack Start.

```component VPCard
{
  "title": "Durable Objects on Cloudflare",
  "desc": "This is a post on one of Cloudflare’s coolest features: Durable Objects. We’ll introduce what they are, how they work, and walk through a reasonably realistic use case for them. Cloudflare Workers Review I’ve written about Cloudflare Workers previously, with an introduction to them and a post about some of the slightly unorthodox things you […]",
  "link": "/blog.master.dev/durable-objects-on-cloudflare.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Cloudflare Workers and Hyperdrive with TanStack Start",
  "desc": "In Part 2 of the series on using Cloudflare with Web Apps, the focus is on setting up a database and addressing key issues like performance and connection management.",
  "link": "/blog.master.dev/cloudflare-workers-and-hyperdrive-with-tanstack-start.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Create AI Workout Plans with Cloudflare Durable Objects",
  "desc": "Discover how to leverage Cloudflare's Durable Objects for managing AI workout templates, ensuring seamless user experiences and data persistence.",
  "link": "/blog.master.dev/making-the-most-of-vercels-ai-sdk-with-cloudflare-durable-objects.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Maximize Cloudflare's Durable Objects with TanStack Tips",
  "desc": "Discover tips for using Cloudflare's Durable Objects with TanStack Start, from simplified object creation to managing WebSocket connections.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/tips-and-tricks-for-using-tanstack-start-with-cloudflare-durable-objects.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
