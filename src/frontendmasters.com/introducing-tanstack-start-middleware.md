---
lang: en-US
title: "Introducing TanStack Start Middleware"
description: "Article(s) > Introducing TanStack Start Middleware"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Introducing TanStack Start Middleware"
    - property: og:description
      content: "Introducing TanStack Start Middleware"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-tanstack-start-middleware.html
prev: /programming/css/articles/README.md
date: 2025-10-24
isOriginal: false
author:
  - name: Adam Rackis
    url : https://frontendmasters.com/blog/author/adamrackis/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7452
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Introducing TanStack Start Middleware"
  desc="TanStack Start is one of the most exciting full-stack web development frameworks I’ve seen. I’ve written about it before. In essence, TanStack Start takes TanStack Router, a superb, strongly-typed client-side JavaScript framework, and adds server-side support. This serves two purposes: it gives you a place to execute server-side code, like database access; and it enables […]"
  url="https://frontendmasters.com/blog/introducing-tanstack-start-middleware/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7452"/>

[<VPIcon icon="iconfont icon-tanstack"/>TanStack Start](https://tanstack.com/start/latest) is one of the most exciting full-stack web development frameworks I’ve seen. [**I’ve written about it before**](/frontendmasters.com/introducing-tanstack-start.md).

In essence, TanStack Start takes [<VPIcon icon="iconfont icon-tanstack"/>TanStack Router](https://tanstack.com/router/latest), a superb, strongly-typed client-side JavaScript framework, and adds server-side support. This serves two purposes: it gives you a place to execute server-side code, like database access; and it enables server-side rendering, or SSR.

This post is all about one particular, especially powerful feature of TanStack Start: **Middleware**.

The elevator pitch for Middleware is that it allows you to execute code in conjunction with your server-side operations, executing code on both the client and the server, both before and after your underlying server-side action, and even passing data between the client and server.

This post will be a gentle introduction to Middleware. We’ll build some *very* rudimentary observability for a toy app. Then, in a future post, we’ll really see what Middleware can do when we use it to achieve single-flight mutations.

---

## Why SSR?

SSR will usually improve LCP (Largest Contentful Paint) render performance compared to a client-rendered SPA. With SPAs, the server usually sends down an empty shell of a page. The browser then parses the script files, and fetches your application components. Those components then render and, usually, *request some data*. Only *then* can you render actual content for your user.

These round trips are neither free nor cheap; SSR allows you to send the initial content down directly, via the *initial* request, which the user can see *immediately*, without needing those extra round trips. See the post above for some deeper details; this post is all about Middleware.

---

## Prelude: Server Functions

Any full-stack web application will need a place to execute code on the server. It could be for a database query, to update data, or to validate a user against your authentication solution. Server functions are the main mechanism TanStack Start provides for this purpose, and are documented [<VPIcon icon="iconfont icon-tanstack"/>here](https://tanstack.com/start/latest/docs/framework/react/server-functions). The quick introduction is that you can write code like this:

```jsx
import { createServerFn } from "@tanstack/react-start";

export const getServerTime = createServerFn().handler(async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return new Date().toISOString();
});
```

Then you can call that function from *anywhere* (client or server), to get a value computed on the server. If you call it from the server, it will just execute the code. If you call that function from the browser, TanStack will handle making a network request to an internal URL containing that server function.

---

## Getting Started

All of my prior posts on TanStack Start and Router used the same contrived Jira clone, and this one will be no different. [The repo is here (<VPIcon icon="iconfont icon-github"/>`arackaf/tanstack-start-middleware-blog-post`)](https://github.com/arackaf/tanstack-start-middleware-blog-post), but the underlying code is the same. If you want to follow along, you can `npm i` and then `npm run dev` and then run the relevant portion of the app at `http://localhost:3000/app/epics?page=1`.

The epics section of this app uses server functions for all data and updates. We have an overview showing:

- A count of all tasks associated with each individual epic (for those that contain tasks).
- A total count of all epics in the system.
- A pageable list of individual epics which the user can view and edit.

![This is a contrived example. It’s just to give us a few different data sources along with mutations.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/img3-1.png?resize=715%2C1024&ssl=1)

---

## Our Middleware Use Case

We’ll explore middleware by building a rudimentary observability system for our Jira-like app.

What is observability? If you think of basic logging as a caterpillar, observability would be the beautiful butterfly it matures into. Observability is about setting up systems that allow you to holistically observe how your application is behaving. High-level actions are assigned a globally unique trace id, and the pieces of work that action performs are logged against that same trace id. Then your observability system will allow you to intelligently introspect that data, and discover where your problems or weaknesses are.

I’m no observability expert, so if you’d like to learn more, Charity Majors [<VPIcon icon="fa-brands fa-amazon"/>co-authored a superb book on this very topic](https://amazon.com/Observability-Engineering-Achieving-Production-Excellence/dp/1492076449). She’s the co-founder of [<VPIcon icon="iconfont icon-honeycomb"/>Honeycomb IO](https://honeycomb.io/), a mature observability platform.

We won’t be building a mature observability platform here; we’ll be putting together some rudimentary logging with trace id’s. What we’ll be building is not suitable for use in a production software system, but it *will* be a great way to explore TanStack Start’s Middleware.

---

## Our First Server Function

This is a post about Middleware, which is applied to server functions. Let’s take a very quick look at a server function

```tsx
export const getEpicsList = createServerFn({ method: "GET" })
  .inputValidator((page: number) => page)
  .handler(async ({ data }) => {
    const epics = await db
      .select()
      .from(epicsTable)
      .offset((data - 1) * 4)
      .limit(4);
    return epics;
  });
```

This is a simple server function to query our epics. We configure it to use the GET http verb. We specify and potentially validate our input, and then the handler function runs our actual code, which is just a basic query against our SQLite database. This particular code uses [<VPIcon icon="iconfont icon-drizzle"/>Drizzle](https://orm.drizzle.team/) for the data access, but you can of course use whatever you want.

Server functions by definition always run on the server, so you can do things like connect to a database, access secrets, etc.

---

## Our First Middleware

Let’s add some empty middleware so we can see what it looks like.

```tsx :collapsed-lines
import { createMiddleware } from "@tanstack/react-start";

export const middlewareDemo = createMiddleware({ type: "function" })
  .client(async ({ next, context }) => {
    console.log("client before");

    const result = await next({
      sendContext: {
        hello: "world",
      },
    });

    console.log("client after", result.context);

    return result;
  })
  .server(async ({ next, context }) => {
    console.log("server before", context);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = await next({
      sendContext: {
        value: 12,
      },
    });

    console.log("server after", context);

    return result;
  });
```

Let’s step through it.

```tsx
export const middlewareDemo = createMiddleware({ type: "function" });
```

This declares the middleware. `type: "function"` means that this middleware is intended to run against server “functions” – there’s also “request” middleware, which can run against either server functions, or server routes (server routes are what other frameworks sometimes call “API routes”). But “function” middleware has some additional powers, which is why we’re using them here.

```tsx
.client(async ({ next, context }) => {
```

This allows us to run code on the client. Note the arguments: `next` is how we tell TanStack to proceed with the rest of the middlewares in our chain, as well as the underlying server function this middleware is attached to. And `context` holds the mutable “context” of the middleware chain.

```tsx
console.log("client before");

const result = await next({
  sendContext: {
    hello: "world",
  },
});

console.log("client after", result.context);
```

We do some logging, then tell TanStack to run the underlying server function (as well as any other middlewares we have in the chain), and then, after everything has run, we log again.

Note the `sendContext` we pass into the call to `next`

```tsx
sendContext: {
  hello: "world",
},
```

This allows us to pass data from the client, up to the server. Now this `hello` property will be in the context object on the server.

And of course don’t forget to return the actual result.

```tsx
return result;
```

You can `return next()`, but separating the call to `next` with the return statement allows you to do additional work after the call chain is finished: modify context, perform logging, etc.

And now we essentially restart the same process on the server.

```tsx
.server(async ({ next, context }) => {
    console.log("server before", context);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = await next({
      sendContext: {
        value: 12
      }
    });

    console.log("server after", context);

    return result;
```

We do some logging and inject an artificial delay of one second to simulate work. Then, as before, we call `next()` which triggers the underlying server function (as well as any *other* Middleware in the chain), and then return the result.

Note again the `sendContext`.

```tsx
const result = await next({
  sendContext: {
    value: 12,
  },
});
```

This allows us to send data from the server back down to the client.

### Let’s Run It

We’ll add this middleware to the server function we just saw.

```tsx
export const getEpicsList = createServerFn({ method: "GET" })
  .inputValidator((page: number) => page)
  .middleware([middlewareDemo])
  .handler(async ({ data }) => {
    const epics = await db
      .select()
      .from(epicsTable)
      .offset((data - 1) * 4)
      .limit(4);
    return epics;
  });
```

When we run it, this is what the *browser’s* console shows:

```plaintext title="output"
client before  
client after {value: 12}
```

With a one second delay before the final client log, since that was the time execution was on the server with the delay we saw.

Nothing too shocking. The client logs, then sends execution to the server, and then logs again with whatever context came back from the server. Note we use `result.context` to get what the server sent back, rather than the `context` argument that was passed to the `client` callback. This makes sense: that context was created before the server was ever invoked with the `next()` call, so there’s no way for it to magically, mutably update based on whatever happens to get returned from the server. So we just read `result.context` to get what the server sent back.

### The Server

Now let’s see what the server console shows.

```plaintext title="output"
server before { hello: 'world' }  
server after { hello: 'world' }
```

Nothing too interesting here, either. As we can see, the server’s `context` argument does in fact contain what was sent to it from the client.

### When Client Middleware Runs on the Server

Don’t forget, TanStack Start will server render your initial path by default. So what happens when a server function executes as a part of that process, with Middleware? How can the client middleware possibly run, when there’s no client in existence yet—only a request, currently being executed on the server.

During SSR, client Middleware will run on the server. This makes sense: whatever functionality you’re building will still work, but the client portion of it will run on the server. So be sure not to use any browser-only APIs like `localStorage`.

Let’s see this in action, but during the SSR run. The prior logs I showed were the result of browsing to a page via navigation. Now I’ll just refresh that page, and show the *server* logs.

```plaintext title="output"
client before  
server before { hello: 'world' }  
server after { hello: 'world' }  
client after { value: 12 }
```

This is the same as before, but now server, and client logs are together, since this code all runs during the server render phase. The server function is called from the server, while it generates the HTML to send down for the initial render. And as before, there’s a one second delay while the server is working.

---

## Building Real Middleware

Let’s build some actual logging Middleware with an observability flair. If you want to look at real observability solutions, please check out [<VPIcon icon="fa-brands fa-amazon"/>the book](https://amazon.com/Observability-Engineering-Achieving-Production-Excellence/dp/1492076449) I mentioned above, or a real Observability solution like [<VPIcon icon="iconfont icon-honeycomb"/>Honeycomb](https://honeycomb.io/). But our focus will be on TanStack Middleware, not a robust observability solution.

### The Client

Let’s start our Middleware with our client section. It will record the local time that this Middleware began. This will allow us to measure the total end-to-end time that our action took, including server latency.

```tsx
export const loggingMiddleware = (name: string) =>
  createMiddleware({ type: "function" })
    .client(async ({ next, context }) => {
      console.log("middleware for", name, "client", context);

      const clientStart = new Date().toISOString();
```

Now let’s call the rest of our Middleware chain and our server function.

```tsx
const result = await next({
  sendContext: {
    clientStart,
  },
});
```

Once the `await next` completes, we know that everything has finished on the server, and we’re back on the client. Let’s grab the date and time that everything finished, as well as a logging id that was sent back from the server. With that in hand, we’ll call `setClientEnd`, which is just a simple server function to update the relevant row in our log table with the `clientEnd` time.

```tsx
const clientEnd = new Date().toISOString();
const loggingId = result.context.loggingId;

await setClientEnd({ data: { id: loggingId, clientEnd } });

return result;
```

For completeness, that server function looks like this:

```tsx
export const setClientEnd = createServerFn({ method: "POST" })
  .inputValidator((payload: { id: string; clientEnd: string }) => payload)
  .handler(async ({ data }) => {
    await db.update(actionLog).set({ clientEnd: data.clientEnd }).where(eq(actionLog.id, data.id));
  });
```

### The Server

Let’s look at our server handler.

```tsx
    .server(async ({ next, context }) => {
      const traceId = crypto.randomUUID();

      const start = +new Date();

      const result = await next({
        sendContext: {
          loggingId: "" as string
        }
      });
```

We start by creating a `traceId`. This is the single identifier that represents the entirety of the action the user is performing; it’s not a log id. In fact, for real observability systems, there will be many, many log entries against a single `traceId`, representing all the sub-steps involved in that action.

For now, there’ll just be a single log entry, but in a bit we’ll have some fun and go a little further.

Once we have the `traceId`, we note the start time, and then we call `await next` to finish our work on the server. We add a `loggingId` to the context we’ll be sending *back down* to the client. It’ll use this to update the log entry with the `clientEnd` time, so we can see the total end-to-end network time.

```tsx
const end = +new Date();

const id = await addLog({
  data: { actionName: name, clientStart: context.clientStart, traceId: traceId, duration: end - start },
});
result.sendContext.loggingId = id;

return result;
```

Next we get the end time after the work has completed. We add a log entry, and then we update the context we’re sending back down to the client (the `sendContext` object) with the correct `loggingId`. Recall that the client callback used this to add the `clientEnd` time.

And then we return the result, which then finishes the processing on the server, and allows control to return to the client.

The `addLog` function is pretty boring; it just inserts a row in our log table with Drizzle.

```tsx
export const addLog = createServerFn({ method: "POST" })
  .inputValidator((payload: AddLogPayload) => payload)
  .handler(async ({ data }) => {
    const { actionName, clientStart, traceId, duration } = data;

    const id = crypto.randomUUID();
    await db.insert(actionLog).values({
      id,
      traceId,
      clientStart,
      clientEnd: "",
      actionName,
      actionDuration: duration,
    });

    return id as string;
  });
```

The value of `clientEnd` is empty, initially, since the client callback will fill that in.

Let’s run our Middleware. We’ll add it to a serverFn that updates an epic.

```tsx
export const updateEpic = 
  createServerFn({ method: "POST" })
    .middleware([loggingMiddleware("update epic")])
    .inputValidator((obj: { id: number; name: string }) => obj)
    .handler(async ({ data }) => { await new Promise(resolve => setTimeout(resolve, 1000 * Math.random()));

  await db.update(epicsTable)
    .set({ name: data.name })
    .where(eq(epicsTable.id, data.id));
});
```

And when this executes, we can see our logs!

![A database logging table displaying columns for id, trace_id, client_start, client_end, action_name, and action_duration, with several entries showing recorded data.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/img1-1.png?resize=1024%2C97&ssl=1)

---

## The Problem

There’s one small problem: we have a TypeScript error.

Here’s the entire middleware, with the TypeScript error pasted as a comment above the offending line

```tsx{17-18} :collapsed-lines
import { createMiddleware } from "@tanstack/react-start";
import { addLog, setClientEnd } from "./logging";

export const loggingMiddleware = (name: string) =>
  createMiddleware({ type: "function" })
    .client(async ({ next, context }) => {
      console.log("middleware for", name, "client", context); 
      
      const clientStart = new Date().toISOString(); 
      
      const result = await next({
        sendContext: { 
          clientStart,
        },
      }); 
      const clientEnd = new Date().toISOString(); 
      // ERROR: 'result.context' is possibly 'undefined'
      const loggingId = result.context.loggingId; 
      
      await setClientEnd({ data: { id: loggingId, clientEnd } }); 
      
      return result;
    }).server(async ({ next, context }) => {
      const traceId = crypto.randomUUID(); 
      
      const start = +new Date(); 
      
      const result = await next({
        sendContext: {
          loggingId: "" as string,
        },
      }); 
    const end = +new Date(); 
    const id = await addLog({
      data: { 
        actionName: name,
        clientStart: context.clientStart,
        traceId: traceId,
        duration: end - start 
      },
    }); 
    result.sendContext.loggingId = id; 
    
    return result; 
  });
```

Why does TypeScript dislike this line?

We call it on the client, after we call `await next`. Our server does in fact add a `loggingId` to its `sendContext` object. And it’s there: the value is logged.

The problem is a technical one. Our server callback can see the things the client callback added to `sendContext`. But the client callback is *not* able to “look ahead” and see what the server callback added to *its* `sendContext` object. The solution is to split the Middleware up.

Here’s a version 2 of the same Middleware. I’ve added it to a new loggingMiddlewareV2.ts module.

I’ll post the entirety of it below, but it’s the same code as before, except all the stuff in the `.client` handler *after* the call to `await next` has been moved to a second Middleware. This new, second Middleware, which only contains the second half of the `.client` callback, then takes the other Middleware as its *own* Middleware input.

Here’s the code:

```tsx
import { createMiddleware } from "@tanstack/react-start";
import { addLog, setClientEnd } from "./logging";

const loggingMiddlewarePre = (name: string) =>
  createMiddleware({ type: "function" })
    .client(async ({ next, context }) => {
      console.log("middleware for", name, "client", context);

      const clientStart = new Date().toISOString();

      const result = await next({
        sendContext: {
          clientStart,
        },
      });

      return result;
    })
    .server(async ({ next, context }) => {
      const traceId = crypto.randomUUID();

      const start = +new Date();

      const result = await next({
        sendContext: {
          loggingId: "" as string,
        },
      });

      const end = +new Date();

      const id = await addLog({
        data: { actionName: name, clientStart: context.clientStart, traceId: traceId, duration: end - start },
      });
      result.sendContext.loggingId = id;

      return result;
    });

export const loggingMiddleware = (name: string) =>
  createMiddleware({ type: "function" })
    .middleware([loggingMiddlewarePre(name)])
    .client(async ({ next }) => {
      const result = await next();

      const clientEnd = new Date().toISOString();
      const loggingId = result.context.loggingId;

      await setClientEnd({ data: { id: loggingId, clientEnd } });

      return result;
    });
```

We export that *second* Middleware. It takes the other one as *its own* middleware. That runs everything, as before. But now when the `.client` callback calls `await next`, it knows what’s in the resulting context object. It knows this because that other Middleware is now *input* to *this* Middleware, and the typings can readily be seen.

---

## Going Deeper

We could end the post here. I don’t have anything new to show with respect to TanStack Start. But let’s make our observability system just a *little* bit more realistic, and in the process see a cool Node feature that’s not talked about enough, and also has the distinction of being the worst named API in software engineering history: `asyncLocalStorage`.

You’d be forgiven for thinking `asyncLocalStorage` was some kind of async version of your browser’s `localStorage`. But no: it’s a way to set and maintain context for the entirety of an async operation in Node.

### When Server Functions Call Server Functions

Let’s imagine our `updateEpic` server function also wants to *read* the epic it just updated. It does this by calling the `getEpic` serverFn. So far so good, but if our `getEpic` serverFn also has logging Middleware configured, we really would want it to use the `traceId` we already created, rather than create its own.

Think about React context: it allows you to put arbitrary state onto an object that can be read by any component in the tree. Well, Node’s `asyncLocalStorage` allows this same kind of thing, except instead of being read anywhere inside of a component tree, the state we set can be read anywhere within the current async operation. This is exactly what we need.

Note that TanStack Start did have a `getContext` / `setContext` set of api’s in an earlier beta version, which maintained state for the current, entire *request*, but they were removed. If they wind up being re-added at some point (possibly with a different name) you can just use them.

Let’s start by importing `AsyncLocalStorage`, and creating an instance.

```tsx
import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();
```

Now let’s create a function for *reading* the traceId that some middleware *higher up* in our callstack *might* have added

```tsx
function getExistingTraceId() {
  const store = asyncLocalStorage.getStore() as any;
  return store?.traceId;
}
```

All that’s left is to *read* the `traceId` that was *possibly* set already, and if none was set, create one. And then, crucially, use `asyncLocalStorage` to *set* our `traceId` for any other Middleware that will be called during our operation.

```tsx
    .server(async ({ next, context }) => {
      const priorTraceId = getExistingTraceId();
      const traceId = priorTraceId ?? crypto.randomUUID();

      const start = +new Date();

      const result = await asyncLocalStorage.run({ traceId }, async () => {
        return await next({
          sendContext: {
            loggingId: "" as string
          }
        });
      });
```

The magic line is this:

```tsx
const result = await asyncLocalStorage.run({ traceId }, async () => {
  return await next({
    sendContext: {
      loggingId: "" as string,
    },
  });
});
```

Our call to next is wrapped in `asyncLocalStorage.run`, which means *virtually anything* that gets called in there can see the `traceId` we set. There are a few exceptions at the margins, for things like WorkerThreads. But any normal async operations which happen inside of the run callback will see the `traceId` we set.

The rest of the Middleware is the same, and I’ve saved it in a loggingMiddlewareV3 module. Let’s take it for a spin. First, we’ll add it to our `getEpic` serverFn.

```tsx
export const getEpic = createServerFn({ method: "GET" })
  .middleware([loggingMiddlewareV3("get epic")])
  .inputValidator((id: string | number) => Number(id))
  .handler(async ({ data }) => {
    const epic = await db.select().from(epicsTable).where(eq(epicsTable.id, data));
    return epic[0];
  });
```

Now let’s add it to `updateEpic`, and update it to also call our `getEpic` server function.

```tsx
export const updateEpic = createServerFn({ method: "POST" })
  .middleware([loggingMiddlewareV3("update epic")])
  .inputValidator((obj: { id: number; name: string }) => obj)
  .handler(async ({ data }) => {
    await new Promise(resolve => setTimeout(resolve, 1000 * Math.random()));
    await db.update(epicsTable).set({ name: data.name }).where(eq(epicsTable.id, data.id));

    const updatedEpic = await getEpic({ data: data.id });
    return updatedEpic;
  });
```

Our server function now updates our epic, and then *calls* the other serverFn to *read* the newly updated epic.

Let’s clear our logging table, then give it a run. I’ll edit, and save an individual epic. Opening the log table now shows this:

![A screenshot of a database table displaying log entries with columns for id, `trace_id`, `client_start`, `client_end`, `action_name`, and `action_duration`.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/10/img2-1.png?resize=1024%2C98&ssl=1)

Note there’s *three* log entries. In order to edit the epic, the UI first *reads* it. That’s the first entry. Then the update happens, and then the second read, from the `updateEpic` serverFn. Crucially, notice how the last two rows, the update and the last read, both share the same `traceId`!

Our “observability” system is pretty basic right now. The `clientStart` and `clientEnd` probably don’t make much sense for these secondary actions that are all fired off from the server, since there’s not really any end-to-end latency. A real observability system would likely have separate, isolated rows just for client-to-server latency measures. But combining everything together made it easier to put something simple together, and showing off TanStack Start Middleware was the goal, not creating a real observability system.

Besides, we’ve now seen all the pieces you’d need if you wanted to actually build this into something more realistic: TanStack’s Middleware gives you everything you need to do anything you can imagine.

---

## Parting Thoughts

We’ve barely scratched the surface of Middleware. Stay tuned for a future post where we’ll push middleware to its limit and achieve single-flight mutations.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing TanStack Start Middleware",
  "desc": "TanStack Start is one of the most exciting full-stack web development frameworks I’ve seen. I’ve written about it before. In essence, TanStack Start takes TanStack Router, a superb, strongly-typed client-side JavaScript framework, and adds server-side support. This serves two purposes: it gives you a place to execute server-side code, like database access; and it enables […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-tanstack-start-middleware.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
