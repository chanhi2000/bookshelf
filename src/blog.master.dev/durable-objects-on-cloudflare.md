---
lang: en-US
title: "Durable Objects on Cloudflare"
description: "Article(s) > Durable Objects on Cloudflare"
icon: iconfont icon-tanstack
category:
  - Node.js
  - React.js
  - Tanstack
  - DevOps
  - Cloudflare
  - Data Science
  - SQLite
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
  - devops
  - cloudflare
  - data-science
  - sql
  - db
  - sqlite
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Durable Objects on Cloudflare"
    - property: og:description
      content: "Durable Objects on Cloudflare"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/durable-objects-on-cloudflare.html
prev: /programming/js-react/articles/README.md
date: 2026-07-20
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10432
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
  "title": "Cloudflare > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/cloudflare/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "SQLite > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/sqlite/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Durable Objects on Cloudflare"
  desc="This is a post on one of Cloudflare’s coolest features: Durable Objects. We’ll introduce what they are, how they work, and walk through a reasonably realistic use case for them. Cloudflare Workers Review I’ve written about Cloudflare Workers previously, with an introduction to them and a post about some of the slightly unorthodox things you […]"
  url="https://blog.master.dev/durable-objects-on-cloudflare/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10432"/>

This is a post on one of Cloudflare’s coolest features: Durable Objects. We’ll introduce what they are, how they work, and walk through a reasonably realistic use case for them.

---

## Cloudflare Workers Review

I’ve written about Cloudflare Workers previously, with an [**introduction to them**](/blog.master.dev/introduction-to-cloudflare-workers-for-web-apps.md) and a post about some of the slightly unorthodox things you have to do to [**use a database with them**](/blog.master.dev/cloudflare-workers-and-hyperdrive-with-tanstack-start.md).

We won’t rehash all of that here, but briefly, Cloudflare Workers are like AWS Lambda functions, except they have much, much lower latency. There are significant differences between those technologies, to be clear. But the high-level elevator pitch is that workers spin up extremely quickly, with virtually no “cold start” to satisfy requests against your web application. And these workers spin up as much as needed, giving you built-in horizontal scaling, no matter how spiky your traffic is at any given time.

---

## What’s Missing From Workers Alone?

State.

Anonymous Cloudflare workers that can spin up, serve your request, and die off are fantastic for satisfying spiky, growing traffic. But they’re terrible for managing long-running state. How could they? They’re the absolute opposite of long-running, so they’re not capable of managing long-running state.

---

## What are Durable Objects?

[<VPIcno icon="fa-brands fa-cloudflare"/>Durable Objects](https://cloudflare.com/products/durable-objects/) are Cloudflare’s answer to this. Durable Objects are stateful worker instances that include their own persistent storage (either SQLite or Cloudflare’s key-value storage). Durable Objects are, well, durable. They go idle when not in use, but when requests against them resume, they come back to life with access to their persistent storage.

Cloudflare guarantees that each Durable Object instance is active in only one location at a time. While active, it can cache state in memory for fast access, with the source of truth in its persistent storage (SQLite or KV storage).

### Plus, WebSocket Support

We’ll get into the specifics, but Durable Objects also ship with *built-in* WebSocket support. You can set up multiple socket connections, post and receive messages, and so on.

---

## Our Use Case: a Shopping Cart

Let’s set up a Durable Object to hold the shopping cart for a hypothetical e-commerce site. We’ll create one Durable Object instance for each user. The user’s cart contents will follow them around to any browser on any device (so long as they’re logged in).

Sure, you could do the same thing with Postgres, but our Durable Object will come with some other nice features: anytime a user adds an item to the cart, we’ll use that web socket feature we just mentioned to broadcast to all devices that the cart has changed, and that the cart contents should refresh.

Plus, our Durable Object will cache the cart’s contents in memory while active, avoiding what would otherwise be a round trip to the database powering your web app.

---

## Setting Up a Durable Object

As we did [**in the intro**](/blog.master.dev/introduction-to-cloudflare-workers-for-web-apps.md), we’ll use [<VPIcon icon="iconfont icon-tanstack"/>TanStack Start](https://tanstack.com/start/latest) here too. [The repo for everything is here (<VPIcon icon="iconfont icon-github"/>`arackaf/cloudflare-do-blog-post`)](https://github.com/arackaf/cloudflare-do-blog-post) in case I don’t explain or show anything clearly.

![Adam Rackis](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/adam.webp?fit=250%2C250&ssl=1)

<SiteInfo
  name="Full-Stack React with TanStack Start & Query"
  desc="Leverage the full TanStack ecosystem to master everything from server-side rendering and type-safe routing, caching strategies, and React Server Components. Learn TanStack Router, Start, & Query and confidently ship high-performance, full-stack React apps."
  url="https://master.dev/courses/tanstack/"
  logo="https://master.dev/favicon-16x16.png"
  preview="https://cdn.master.dev/assets/courses/2026-06-10-tanstack/posterframe.jpg"/>

### Create the Durable Object

A Durable Object is created from a JavaScript class with the appropriate base class.

```js
import { DurableObject } from "cloudflare:workers";

export class CartDO extends DurableObject {}
```

We’ll add methods to it in a bit.

### Custom Server Entrypoint

We need to ensure our Durable Object is exported with our application bundle. The recommended way of doing that is with a custom server entrypoint. We’ll create a `src/server.ts` file.

```ts
import handler from "@tanstack/react-start/server-entry";

export default {
  fetch: handler.fetch,
};
```

This alone does nothing and simply recreates what TanStack Start does out of the box. The point of that is so we can *export* our Durable Object from this same entrypoint. We do that with a standard old JavaScript export.

```ts
import handler from "@tanstack/react-start/server-entry";

// Export Durable Objects
export { CartDO } from "./durable-obj/Cart";

export default {
  fetch: handler.fetch,
};
```

And now we change the `main` field in our Wrangler file (remember: [<VPIcno icon="fa-brands fa-cloudflare"/>Wrangler](https://developers.cloudflare.com/workers/wrangler/) is the CLI tool from Cloudflare for managing our Workers settings) from the default of:

```json
"main": "@tanstack/react-start/server-entry",
```

To:

```json
"main": "src/server.ts",
```

### More Wrangler Additions

That custom server entrypoint was a one-time change that *allows us* to then start adding in Cloudflare goodies like durable objects (naturally), queues, or cron schedules. Check [<VPIcno icon="fa-brands fa-cloudflare"/>Cloudflares docs](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/?utm_source=chatgpt.com#custom-entrypoints) for more info.

So now we’ll add a `durable_objects` section with a binding to the Durable Object we added above.

```json
{
  /* ... */
  "durable_objects": {
    "bindings": [
      {
        "name": "CART_DO",
        "class_name": "CartDO",
      },
    ],
  },
}
```

Then, somewhat annoyingly, we need to add a migration for it as well.

```json
{
  /* ... */
  "migrations": [
    {
      "tag": "v1",
      "new_sqlite_classes": ["CartDO"],
    },
  ],
}
```

---

## Building our Durable Object

To avoid dumping too much code at you all at once, let’s sketch out a minimal version of our Shopping Cart, just to see how everything works and fits together. Let’s create the following methods:

- `getCart()` to retrieve cart contents. We’ll hard-code static data for now, and wire up SQLite in a moment.
- `addItem()` to add an item to the cart, and then broadcast a WebSocket message that the cart has updated, so any browser tabs this user has open will update. Again, we’ll only do the latter for now, before setting up SQLite in a moment.

Then we’ll need a method to set up a WebSocket connection.

And even though we won’t need to send WebSocket messages from the browser to the Durable Object (only from the Durable Object to the browser), we’ll set that up too so we can see how it works.

With that, here’s the initial sketch of our Durable Object.

```ts :collapsed-lines
import { DurableObject } from "cloudflare:workers";

export class CartDO extends DurableObject {
  getCart() {
    return {
      items: [
        { id: 1, name: "Building Microservices" },
        { id: 2, name: "Standing Desk" },
      ],
    };
  }
  addItem() {
    for (const socket of this.ctx.getWebSockets()) {
      try {
        socket.send(
          JSON.stringify({
            type: "cart-updated",
          }),
        );
      } catch {
        // The socket may have disconnected before Cloudflare observed it.
        socket.close(1011, "Unable to send cart update");
      }
    }
  }
  fetch(request: Request): Response {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket", {
        status: 426,
      });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];

    this.ctx.acceptWebSocket(server);

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  }
  webSocketMessage(socket: WebSocket, message: string | ArrayBuffer) {
    console.log("received on DO", message);
    socket.send(JSON.stringify({ message: "Message received", originalMessage: message }));
  }
}
```

Let’s walk through that.

The `getCart()` method, for now, just returns some static data. We’ll fix that in a moment. The `addItem()` method is where we broadcast our WebSocket message. We access all subscribed sockets like this:

```js
for (const socket of this.ctx.getWebSockets()) {
```

Then call `socket.send`. Simple and humble.

The `fetch` method may seem surprising, but that’s how we set up a new WebSocket subscriber against our Durable Object. We check the headers to ensure it is indeed a WebSocket setup and error out if not; we’re free to accept and reply to any manner of fetch requests, of course, but none apply to this use case.

Cloudflare provides the primitives for creating WebSockets.

```js
const pair = new WebSocketPair();
const client = pair[0];
const server = pair[1];

this.ctx.acceptWebSocket(server);
```

The `WebSocketPair` function is a Cloudflare runtime global. We set up the connection, and then call `this.ctx.acceptWebSocket(server);`

Lastly, `webSocketMessage` is the method we use to *receive* WebSocket messages from the client. This is a special, reserved name Durable Objects classes have for this purpose.

---

## Using Our Durable Object

How do we consume those Durable Object methods from our app?

First, let’s write a helper function to get an instance of our Durable Object.

```js
import { getCurrentUser } from "./current-user";
import { env } from "cloudflare:workers";

export const getCartForCurrentUser = async () => {
  const user = await getCurrentUser();

  const { CART_DO } = env;
  const cartId = CART_DO.idFromName(user.id);
  const cart = CART_DO.get(cartId);

  return cart;
};
```

For our use case, we want one Durable Object per user to hold that user’s cart contents. So we grab our user (this isn’t a post on auth, so user credentials are just hard-coded) grab our `env` object, and pull out our `CART_DO` object from there. Remember, `CART_DO` was wired up in Wrangler.

```json
{
  /* ... */
  "durable_objects": {
    "bindings": [
      {
        "name": "CART_DO",
        "class_name": "CartDO",
      },
    ],
  },
}

```

`CART_DO.idFromName` allows us to retrieve a globally unique, internal ID for the durable Object instance we want from a string identifier, and then `CART_DO.get` takes that internal ID and gets us the actual, live proxy to interact with the Durable Object instance.

We handle this interaction on the server, so we’ll need some server functions. Here are two for the `getCart` / `addItem` calls.

```ts
const addItem = createServerFn({ method: "POST" }).handler(async () => {
  const cart = await getCartForCurrentUser();
  await cart.addItem();
});

const getCart = createServerFn({ method: "GET" }).handler(async () => {
  const cart = await getCartForCurrentUser();
  const result = await cart.getCart();
  return { items: result.items };
});
```

Get the cart object and call the methods. Simple.

### Setting Up the Socket Connection

To set up the WebSocket connection, we need to send an HTTP request that upgrades the connection to WebSocket. So we’ll create a TanStack API endpoint that receives that HTTP request, and simply forwards it to the Durable Object

```tsx title="routes/api/cart/subscribe.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { getCartForCurrentUser } from "#/server/getCartForCurrentUser";

export const Route = createFileRoute("/api/cart/subscribe")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const cart = await getCartForCurrentUser();
        return cart.fetch(request);
      },
    },
  },
});
```

Then a little boilerplate to call into the right place.

```ts
export function openWebSocket() {
  return new Promise<WebSocket>((res, rej) => {
    const protocol = location.protocol === "https:" ? "wss:" : "ws:";

    const socket = new WebSocket(`${protocol}//${location.host}/api/cart/subscribe`);

    socket.addEventListener("open", () => {
      console.log("WebSocket connected");
      res(socket);
    });

    socket.addEventListener("error", event => {
      console.error("WebSocket error:", event);
      rej(event);
    });

    socket.addEventListener("close", event => {
      console.error("WebSocket closed:", event);
    });
  });
}
```

We can call this from the browser and get back our socket object.

```js
openWebSocket().then(socket => {
  setSocket(socket);
  console.log("Socket open");

  socket.addEventListener("message", event => {
    console.log(event);
  });
});
```

Once we have our socket, we can call `.send` on it as desired.

If you’d like to see the full code as of this initial setup, check out the tag initial-setup in the [repo (<VPIcon icon="iconfont icon-github"/>`arackaf/cloudflare-do-blog-post`)](https://github.com/arackaf/cloudflare-do-blog-post).

---

## Wiring Up SQLite

The only missing piece is [<VPIcon icon="iconfont icon-sqlite"/>SQLite](https://sqlite.org/) from within our Durable Object. To interact with our SQLite database, we access the `ctx` object that exists on our object, as a result of inheriting from the `DurableObject` base class.

The `ctx.storage.sql` function gives us an object with an `exec` method which we can use to execute SQL commands. In our constructor, we’ll set up our table.

```ts
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);

    ctx.blockConcurrencyWhile(async () => {
      ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS cart_items (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          description TEXT NOT NULL,
          price REAL NOT NULL,
          category TEXT NOT NULL,
          image TEXT NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 1
        )
      `);
    });
  }
```

This isn’t the most resilient design, but it should suffice for a simplified blog post.

The `ctx.blockConcurrencyWhile` function ensures no other requests are served by this individual Durable Object instance until the code inside has completed.

In this example `sql.exec()` is synchronous, so nothing could interleave while it’s running anyway. But we still wrap initialization in `blockConcurrencyWhile` because constructors often grow over time (loading state, awaiting storage, migrations, etc.), and this guarantees no requests are dispatched until initialization is finished.

### Running Queries

From here, we can implement our `getCart()` method

```ts
  getCart(): CartContents {
    const rows = this.ctx.storage.sql
      .exec<CartItemRow>(
        `
        SELECT
          id,
          name,
          description,
          price,
          category,
          image,
          quantity
        FROM cart_items
        ORDER BY name
      `,
      )
      .toArray();

    const items: CartItem[] = rows.map((row) => ({
      ...row,
      lineTotal: row.price * row.quantity,
    }));

    return {
      items,
      totalItems: rows.reduce((sum, row) => sum + row.quantity, 0),
      totalPrice: rows.reduce((sum, row) => sum + row.price * row.quantity, 0),
    };
  }
```

And our `addItem` method:

```ts
async addItem(item: Product) {
  this.ctx.storage.sql.exec(
    `
      INSERT INTO cart_items (
        id,
        name,
        description,
        price,
        category,
        image,
        quantity
      )
      VALUES (?, ?, ?, ?, ?, ?, 1)

      ON CONFLICT(id) DO UPDATE SET quantity = quantity + 1
    `,
    item.id,
    item.name,
    item.description,
    item.price,
    item.category,
    item.image,
  );

  this.#sendCartUpdatedEvent();
}
```

Having a `clearCart` method is pretty handy.

```ts
async clearCart() {
  this.ctx.storage.sql.exec(`DELETE FROM cart_items`);
  this.#sendCartUpdatedEvent();
}
```

---

## Other Details

There’s plenty of other small details to handle: setting up the web socket connection when the app loads, wiring up react-query to read the cart contents, invalidating the query whenever we get a socket notification that the cart changed, and of course, wiring up the UI for things like adding an item, clearing the cart, etc.

This post is already long, so [check the repo (<VPIcon icon="iconfont icon-github"/>`arackaf/cloudflare-do-blog-post`)](https://github.com/arackaf/cloudflare-do-blog-post) if you’re curious how I implemented those things.

---

## Future Tweaks

Remember, Durable Objects are single-threaded and only run in one location at a time. That means it would be safe for us to cache our cart in memory. Our SQLite queries are incredibly fast, but if we ever wanted to, we could add something like `this.cachedCartContent` (or `this.#cachedCartContents` to make it private), update it whenever we modify the cart, and return it, if present, instead of querying SQLite.

---

## Wrapping Up

We’ve already seen all the big pieces here: how to set up WebSocket connections; how to send and receive WebSocket messages; how to set up and manage our SQLite database; and how to grab and call methods on our durable object from our TanStack app.

From here, it’s just a matter of connecting everything. As I said, you can [check the repo (<VPIcon icon="iconfont icon-github"/>`arackaf/cloudflare-do-blog-post`)](https://github.com/arackaf/cloudflare-do-blog-post) for those details, but to show that this does in fact work, here’s a video of the browser tabs all syncing their carts correctly.

---

## What About Unauthenticated Users?

We faked authentication for this app to show how each user would grab their own Durable Object. But what about a real e-commerce site where you’re much more likely to just buy things without logging in.

One likely solution would be to set a cookie with some manner of UUID for the user, use that as their temporary `userId`, and use that to sync their shopping cart between tabs. Sure, it won’t work across devices, but that’s more than fine for typical usage, and better than some actual websites I’ve shopped from — I’m looking at you, Bonobos.

---

## Concluding Thoughts

Cloudflare is a delight to develop with. Workers are already a fantastic primitive to ship web applications on top of. With durable objects, a whole host of additional use cases are beautifully unlocked.

Hopefully, this post has given you the tools necessary to take advantage.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Durable Objects on Cloudflare",
  "desc": "This is a post on one of Cloudflare’s coolest features: Durable Objects. We’ll introduce what they are, how they work, and walk through a reasonably realistic use case for them. Cloudflare Workers Review I’ve written about Cloudflare Workers previously, with an introduction to them and a post about some of the slightly unorthodox things you […]",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/durable-objects-on-cloudflare.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
