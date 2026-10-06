---
lang: en-US
title: "Cloudflare Workers and Hyperdrive with SvelteKit"
description: "Article(s) > Cloudflare Workers and Hyperdrive with SvelteKit"
icon: fa-brands fa-cloudflare
category:
  - Node.js
  - Svelte.js
  - DevOps
  - Cloudflare
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - node
  - nodejs
  - node-js
  - svelte
  - sveltejs
  - svelte-js
  - devops
  - cloudflare
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Cloudflare Workers and Hyperdrive with SvelteKit"
    - property: og:description
      content: "Cloudflare Workers and Hyperdrive with SvelteKit"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/cloudflare-workers-and-hyperdrive-with-sveltekit.html
prev: /devops/cloudflare/articles/README.md
date: 2026-07-27
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10517
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Svelte.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-svelte/articles/README.md",
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
  name="Cloudflare Workers and Hyperdrive with SvelteKit"
  desc="In which Adam highlights the integration process and notes some challenges compared to the TanStack setup we covered shortly ago."
  url="https://blog.master.dev/cloudflare-workers-and-hyperdrive-with-sveltekit/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10517"/>

Let’s get into web application setup for Cloudflare Workers on [<VPIcon icon="iconfont icon-svelte"/>SvelteKit](https://svelte.dev/docs/kit/introduction). I’ve written about Cloudflare [**where we introduced workers**](/blog.master.dev/introduction-to-cloudflare-workers-for-web-apps.md), and then where we showed some of the one-off development considerations needed for [**getting Workers to work in TanStack Start**](/blog.master.dev/cloudflare-workers-and-hyperdrive-with-tanstack-start.md).

This will be similar to the latter, except we’ll look at SvelteKit rather than TanStack.

I’ve found the Cloudflare/SvelteKit integration not quite as seamless as TanStack’s, but it’s still outstanding and doesn’t take too much effort to get up and running.

---

## What are Cloudflare Workers?

Cloudflare Workers are conceptually similar to AWS Lambda functions. They’re cloud functions that spin up on demand, as much or as little as your application’s traffic demands at any given moment. Except Cloudflare Workers have very, very low latency. The “cold starts” Lambda is known to have are virtually non-existent with Workers.

---

## What’s the Catch?

Not much, really. There was a time when Cloudflare Workers had a runtime that was a subset of Node, but those days are over. Cloudflare Workers now have a Node compat mode that solves those problems.

The main limitation with Workers is that they have special rules requiring you to clean up after yourself in ways other runtimes don’t. Namely, you cannot have long-running I/O objects surviving between requests. In particular, you cannot simply have a module export a `db` object that connects to your database. Each request must spin that connection up fresh.

---

## Introducing Hyperdrive

Spinning up a fresh database connection was always a bad idea in *any* cloud function runtime, such as AWS Lambda. These functions spin up as needed, and during periods of bursting traffic, the number of Lambda functions being created could easily overwhelm your database.

But with Workers requiring a fresh connection *per request,* this is even more dangerous. To say nothing of the fact that we’d hardly want to ruin Workers’ low latency by requiring them to perform the time-consuming operation of establishing a fresh TCP connection to our database, let alone once *per request*.

To solve these problems, Cloudflare has a tool called [<VPIcno icon="fa-brands fa-cloudflare"/>Hyperdrive](https://cloudflare.com/products/hyperdrive/), which keeps a pool of pre-warmed connections to our database open. Our Workers then quickly connect to Hyperdrive and gain immediate access to these pre-warmed connections.

---

## Getting Started

Let’s scaffold an essentially empty SvelteKit application. We’ll go to the directory we want our app, and then kick things off.

```sh
npx sv create .
```

---

## Enabling Cloudflare

Let’s set up basic Cloudflare infrastructure for our project.

```sh
npx wrangler deploy
```

We’ll be asked a few questions, to which the defaults should be fine.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/img0.jpg?resize=1024%2C612&ssl=1)

This will install some new dependencies and set up the Cloudflare plugin.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/img0a.jpg?resize=1024%2C604&ssl=1)

Very nice!

---

## One Problem

If we open our Cloudflare dashboard, we will not see this new app present, and if we look in our terminal, we’ll see why.

```plaintext
[build] ✘ [ERROR] Types file not found at worker-configuration.d.ts.  
[build]  
[build]  
[build]  
[build] 🪵  Logs were written to "/Users/arackis/Library/Preferences/.wrangler/logs/wrangler-2026-07-12_23-14-01_652.log"  
[build]  
✘ [ERROR] Error: Command failed with exit code 1: npm run build  
  
  ✘ [ERROR] Types file not found at  
  worker-configuration.d.ts.  
  
  
  🪵  Logs were written to  
  "/Users/arackis/Library/Preferences/.wrangler/logs/wrangler-2026-07-12_23-14-01_652.log"  
  
  > sveltekit-temp@0.0.1 build  
  > wrangler types --check && vite build
```

The problem is the `build` task Cloudflare scaffolded us.

```json
{
  "build": "vite build && wrangler types --check"
}
```

The problem is the latter piece: `wrangler types --check`. This asks Wrangler to confirm that the generated typings are fully aligned with the application’s needs. In my experience, this is a fickle check that fails for reasons you may not care about, such as secrets not being properly declared in your Wrangler under certain circumstances, even if not directly accessed in code. To fix this error, you can run this:

```sh
npx wranger types
```

This generates the types and passes the build. But I’d recommend just removing the `wrangler types --check` from the build script.

You’ll absolutely need to run `npx wrangler types` to get typings generated for when you start using Hyperdrive, adding secrets, using Durable Objects, etc. But I wouldn’t fail the build step if your types aren’t completely up to date, especially if those mismatches don’t actually cause TypeScript errors.

If your typings are not correct in a way that matters, you’ll see TypeScript errors pretty quickly, so the check was never all that valuable to begin with.

And that’s that. Note that if you got *this* error instead (or ever do get it)

npm error `npm ci` can only install packages when your package.json and package-lock.json or npm-shrinkwrap.json are in sync. Please update your lock file with `npm install` before continuing.

Just `rm -rf node_modules`, delete your lockfile, then re-run `npm i`.

---

## Connecting GitHub

To enable easy deployments, let’s connect GitHub to our new app. We’ll go to our [<VPIcno icon="fa-brands fa-cloudflare"/>Cloudflare dashboard](https://dash.cloudflare.com/).

Find our app under **Workers & Pages**.

<!-- ![](https://my-blog-staging.adamrackis.workers.dev/tanstack-cloudflare-sveltekit/img1.jpg) -->

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/img1.jpg?resize=1024%2C197&ssl=1)

Go to the **build** section.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/img2.jpg?resize=1024%2C155&ssl=1)

Then choose the right repo.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/img3.jpg?resize=488%2C1024&ssl=1)

Now pushes to `main` will automatically deploy to Cloudflare.

---

## Accessing Cloudflare Goodies from SvelteKit

Cloudflare manages the things we need, from secrets to Hyperdrive connection strings on the `env` object. With TanStack we imported our env directly, via a special import.

```js
import { env } from "cloudflare:workers";
```

With SvelteKit, this env object is injected into a `platform` object that shows up in server contexts. In fact, when we first ran `npx wranger deploy` that command, it adjusted our typings for this.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/img4.jpg?resize=572%2C552&ssl=1)

As we can see, `env` now exists in the platform object. This is what is passed into server loaders like `page.server.ts` for a route.

```js
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ platform, locals }) => {
  return {
    value: platform?.env.SECRET_1,
  };
};
```

Other server-only locations, like API routes, also get `env`.

Note that this does *not* work for universal loaders, since those also run on the client, and SvelteKit cannot expose things on this Cloudflare `env` object to the client.

---

## Remote Functions

To access the Cloudflare `env` object from a remote function, you import `getRequestEvent`.

```js
import { getRequestEvent, query } from "$app/server";
```

Then call it as needed.

```js
export const getPosts = query(async () => {
  const evt = getRequestEvent();
  const val = evt.platform?.env.SECRET_1;

  return [
    /* ... */
  ];
});
```

---

## Databases and Hyperdrive

Hyperdrive is Cloudflare’s answer for connecting to a database from a cloud function that can spin up as often as needed, depending on your web application’s traffic.

Since Cloudflare workers spin up quickly, on demand, to satisfy the requests they receive, they’re a poor candidate for opening a fresh TCP connection to your database for each request, since doing so would be slow and would risk overloading your database with more connections than it can support.

We also can’t just expose a top-level `db` object that’s exported from a module for reasons we’ll see shortly.

Hyperdrive solves all these problems by giving you a pre-warmed connection pool.

### Setting up Hyperdrive

Go to the Cloudflare dashboard and, under Storage and databases, find the option **Postgres & MySQL (Hyperdrive)**.

![Amusingly, the Hyperdrive in the menu option may be truncated due to how it’s displayed.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/img1-1.jpg?resize=488%2C508&ssl=1)

Hit the **connect to database** button.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/img2-1.jpg?resize=1024%2C105&ssl=1)

You’ll be greeted with a few options for how to proceed. For this post, I’ll be using PlanetScale.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/img3a.jpg?resize=1024%2C778&ssl=1)

Follow the prompts, authenticate if needed, select your database, and most importantly, be sure to fill in your database name; you almost certainly do not want the default value of the `postgres`.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/img3b.jpg?resize=1024%2C1019&ssl=1)

Once complete, you should see a new Wrangler entry.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/img4-1.jpg?resize=1024%2C1010&ssl=1)

That’s what mine looks like, and no, there’s nothing secret or private about that data. In fact, you’ll need it in your Wrangler file and committed to git if you want Cloudflare’s GitHub integration to work.

Copy that into your Wrangler file and add a `localConnectionString` for use during local development.

```json
{
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "cabc3adcf4c44c03b55e2d17aaef7d99",
      "localConnectionString": "postgresql://docker:docker@localhost:5432/my_library"
    }
  ]
}
```

You can now update your typings via `npx wrangler types`.

### Connect to Hyperdrive

Now, via your same `env` object, you can connect to your database through Hyperdrive.

```js
const pool = new Pool({
  connectionString: env.HYPERDRIVE.connectionString,
});
```

---

## Managing Database Connections

As with TanStack, the same Cloudflare rules apply. We cannot keep a long-running I/O object open between requests. Doing so would cause errors with Cloudflare; that’s why we can’t just `export` a live `db` object from a TypeScript module that contains a database connection when we use Cloudflare Workers.

With TanStack Start we solved this with global request middleware, which ran once per request, and allowed us to open a database connection (via Hyperdrive), and put that db object on context, which is present in all server-only contexts.

With SvelteKit, we can do similarly with a server hook. If we add a `src/`<VPIcon icon="fa-brands fa-js"/>`hooks.server.js` file, the `handle` function exported therefrom is invoked once *per request*, making it a perfect place to set up our database connection.

```js title="hooks.server.js"
export async function handle({ event, resolve }) {
  const pool = new Pool({
    connectionString: event.platform!.env.HYPERDRIVE.connectionString,
  });
  const db = getDb(pool);

  if (event.url.pathname.includes("/.well-known/appspecific/com.chrome.devtools")) {
    return new Response(null, { status: 204 }); // Return empty response with 204 No Content
  }

  event.locals.db = db;

  const response = await resolve(event);
  return response;
}
```

As you can see, we added our `db` object to the `event.locals` object. This is a standard feature with SvelteKit; in fact, there’s already a `Locals` interface in the `src/app.d.ts` to hold any of these things we manually add.

```ts
import type { DB } from "./data/db";

declare global {
  namespace App {
    interface Platform {
      env: Env;
      ctx: ExecutionContext;
      caches: CacheStorage;
      cf?: IncomingRequestCfProperties;
    }

    // interface Error {}
    interface Locals {
      db: DB;
    }
    // interface PageData {}
    // interface PageState {}
  }
}
```

In server-only contexts like Server loaders, we can access our `db` object

```ts
export const load: PageServerLoad = async ({ platform, locals }) => {
  const users = await locals.db.select().from(user).limit(10);

  return {
    users,
  };
};
```

Similarly in Remote Functions, use the `getRequestEvent` to get the request object, on which you’ll find the same `locals` object, with the `db` object.

```ts
import { eq } from "drizzle-orm";
import { getRequestEvent, query } from "$app/server";
import { books as booksTable } from "$drizzle/schema";

export const getBooks = query(async () => {
  const evt = getRequestEvent();
  const books = await evt.locals.db.select().from(booksTable).where(eq(booksTable.userId, "106394015208813116232")).limit(5);

  return books;
});
```

---

## Concluding Thoughts

I’m extremely excited about web development with Cloudflare’s platform. Workers are an outstanding, low-latency way to host web applications. The SvelteKit integration is great, and with just a few tricks, you can be up and running quickly.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Cloudflare Workers and Hyperdrive with SvelteKit",
  "desc": "In which Adam highlights the integration process and notes some challenges compared to the TanStack setup we covered shortly ago.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/cloudflare-workers-and-hyperdrive-with-sveltekit.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
