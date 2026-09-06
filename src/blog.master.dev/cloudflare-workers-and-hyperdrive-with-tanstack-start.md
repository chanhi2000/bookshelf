---
lang: en-US
title: "Cloudflare Workers and Hyperdrive with TanStack Start"
description: "Article(s) > Cloudflare Workers and Hyperdrive with TanStack Start"
icon: iconfont icon-tanstack
category:
  - Node.js
  - React.js
  - Tanstack
  - DevOps
  - Cloudflare
  - Data Science
  - PostgreSQL
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
  - data-science
  - sql
  - db
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Cloudflare Workers and Hyperdrive with TanStack Start"
    - property: og:description
      content: "Cloudflare Workers and Hyperdrive with TanStack Start"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/cloudflare-workers-and-hyperdrive-with-tanstack-start.html
prev: /programming/js-react/articles/README.md
date: 2026-07-02
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10270
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
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgres/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Cloudflare Workers and Hyperdrive with TanStack Start"
  desc="In Part 2 of the series on using Cloudflare with Web Apps, the focus is on setting up a database and addressing key issues like performance and connection management."
  url="https://blog.master.dev/cloudflare-workers-and-hyperdrive-with-tanstack-start/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10270"/>

Welcome to Part 2 of our series on using Cloudflare for Web Apps (and specifically TanStack Start). [**In Part 1**](/blog.master.dev/introduction-to-cloudflare-workers-for-web-apps.md), we covered the absolute basics. We deployed a web app to Cloudflare, saw how our Wrangler file works, set up some secrets, and we saw Cloudflare generate typings to keep TypeScript happy.

::: info Article Series

```component VPCard
{
  "title": "Introduction to Cloudflare Workers for Web Apps",
  "desc": "Maybe you don't need a traditional server to run a web app that needs a node server backend. Maybe the requests that need that can go to a cloud function on demand. ",
  "link": "/blog.master.dev/introduction-to-cloudflare-workers-for-web-apps.md",
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

:::

Now, we’ll set up a database. We’ll look at [<VPIcon icon="fa-brands fa-cloudflare"/>Hyperdrive](https://cloudflare.com/products/hyperdrive/) and why it’s needed, as well as some potentially counterintuitive ways we need to set up our database object (or any I/O object). We’ll use TanStack Start specifically here, but these principles apply to any web framework, though some implementation details might differ slightly.

---

## Preliminaries

I love [<VPIcon icon="fas fa-globe"/>Drizzle](https://orm.drizzle.team/) and use it for all my projects. It’s an outstanding, unique ORM that’s essentially a thin TypeScript layer on top of SQL. I’ve written about it [**here**](/blog.master.dev/introducing-drizzle.md) and [**here**](/blog.master.dev/drizzle-database-migrations.md).

I’ll be using Postgres, so we’ll also install some utilities.

```sh
npm i drizzle-orm@rc drizzle-kit@rc pg @types/pg
```

Next, add a <VPIcon icon="iconfont icon-typescript"/>`drizzle.config.ts` file.

```ts title="drizzle.config.ts"
import { defineConfig } from "drizzle-kit";

const connectionString = process.env.POSTGRES!;

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: connectionString,
  },
  out: "./src/drizzle",
});
```

Then run:

```sh
npx drizzle-kit pull
```

That will generate our Drizzle schema. We won’t cover those specifics here. See the Drizzle posts above if you’re curious, but really you can query your data however you want; for the purposes of this post, it makes no difference which, if any, ORM you use.

<SiteInfo
  name="Full-Stack React with TanStack Start & Query"
  desc="Leverage the full TanStack ecosystem to master everything from server-side rendering and type-safe routing, caching strategies, and React Server Components. Learn TanStack Router, Start, & Query and confidently ship high-performance, full-stack React apps."
  url="https://master.dev/courses/tanstack/"
  logo="https://master.dev/favicon-16x16.png"
  preview="https://cdn.master.dev/assets/courses/2026-06-10-tanstack/posterframe.jpg"/>

Adam Rackis *From Spotify*

---

## The Wrong Way (for Cloudflare)

For now, let’s do something fairly common that usually works well enough. We’ll add a `db.ts` module, with this code

```js
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES!,
});

export const db = drizzle({ client: pool });
```

Again, this has nothing to do with Drizzle. Export a connection to your database however you’d like. The issues will be the same.

### Issue 1: Performance

Remember, Cloudflare workers spin up very quickly, on demand, as needed to serve requests. As these (potentially numerous) workers come into existence, each of them establishing a connection to your database poses two problems.

The first is performance. Opening a fresh database connection is a relatively slow operation. We don’t want that happening every time a worker spins up. This is not a concern limited to Cloudflare; any cloud function solution would have the same problem. A web application running atop AWS Lambda would not want to exacerbate existing cold starts by adding TCP database connection overhead, and, of course, low-latency Cloudflare workers would not want to introduce cold-start characteristics in this way.

The second is the sheer *number of* connections that would be stood up in this way. Again, this applies to any platform that works via cloud functions. As your app grows in traffic, the number of cloud functions (Cloudflare workers, AWS Lambda, etc) would grow to a large number, as would the number of connections open on your database. And databases always have a limit on the number of connections they support.

This is, of course, a solved problem. Solutions like PgBouncer pool pre-warm connections and act as a proxy to your database. Your application connects to PgBouncer, and PgBouncer provides an open connection. Cloudflare provides its own version of this called Hyperdrive, which we’ll look at shortly.

### Issue 2: Per-Request Cleanup

Here’s this code again:

```js
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES!,
});

export const db = drizzle({ client: pool });
```

The second issue with this code is that it violates Cloudflare’s rule on what is allowed to persist between requests. Long-lived I/O resources such as Node.js connection pools do not fit the Workers execution model and can trigger runtime errors like this

![Cloudflare Error](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img1-1.jpg?resize=1024%2C143&ssl=1)

Let’s solve both of these problems.

---

## Hyperdrive

No matter *how* we create our database object in code, we don’t want to connect directly to our source database; we want to connect to a pre-warmed connection pool. Cloudflare provides one for us called Hyperdrive. To get started, go to the Cloudflare dashboard, and under Storage and databases, find the option for “Postgres & MySQL (Hyperdrive)”.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img2-1.jpg?resize=488%2C508&ssl=1)

Amusingly, the Hyperdrive in the menu option may be truncated with how they display it.

Hit the connect to database button.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img3-1.jpg?resize=1024%2C105&ssl=1)

You’ll be greeted with a few options for how to proceed. For this post, I’ll be using [<VPIcon icon="fas fa-globe"/>PlanetScale](https://planetscale.com/).

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img3a.jpg?resize=1024%2C778&ssl=1)

Follow the prompts, authenticate if needed, select your database, and most importantly, be sure to fill in your database name; you almost certainly do not want the default value of the `postgres`.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img3b.jpg?resize=1024%2C1019&ssl=1)

Once complete, you should be greeted with a new Wrangler entry.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img4-1.jpg?resize=1024%2C1010&ssl=1)

That’s what mine looks like, and no, there’s nothing secret or private about that data. In fact, you’ll need it in your Wrangler file and to have committed in Git if you want Cloudflare’s GitHub integration to work.

Copy that into your Wrangler file.

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "fitness-tracker",
  "compatibility_date": "2025-09-02",
  "compatibility_flags": ["nodejs_compat"],
  "main": "@tanstack/react-start/server-entry",
  "hyperdrive": [
    {
      "binding": "HYPERDRIVE",
      "id": "dd0103f82a11410b91c8fb5752050a21"
    }
  ],
  "observability": {
    "enabled": true
  },
  "upload_source_maps": true
}
```

Now update your typings by running `npx wrangler types`.

### Connect to Hyperdrive

And now, via your same `env` object, you can connect to your database through Hyperdrive.

::: note

If you haven’t read Part 1 of this, you can grab the `env` object in a TanStack project with this special import 

```js
import { env } from "cloudflare:workers";
```

:::

```js
const pool = new Pool({
  connectionString: env.HYPERDRIVE.connectionString,
});
```

But there’s one more thing to do. When you attempt to run your app, you’ll likely see this error

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img5-1.jpg?resize=1024%2C50&ssl=1)

To fix this, add this connection string to your dev database with that key to your <VPIcon icon="iconfont icon-dotnev"/>`.env` file.

```sh title=".env"
CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE='postgresql://docker:docker@localhost:5432/your_db'
```

---

## Fixing Per-Request Cleanup

Our database connections will be much snappier now. But Cloudflare will still error out since our database object is created and exported by a module. That means it will continue to live between requests.

Let’s see how to fix that.

What we need is a fresh database connection *per request*. And it turns out TanStack Start has a feature just for that: [<VPIcon icon="iconfont icon-tanstack"/>global request middleware](https://tanstack.com/start/latest/docs/framework/react/guide/middleware#global-middleware)

::: note

Note that I’m using the word “connection” loosely here. We’re creating a conceptual “connection” to our database per request, but we’re really connecting through Hyperdrive, which pools and reuses actual database TCP connections between requests. The goal is not to literally create a fresh TCP connection to our database for each request; it’s to avoid long-lived I/O resources between requests.

:::

The focus of this post is Cloudflare, so we’ll breeze through the code; check the docs for more info.

```ts :collapsed-lines title="src/start.ts"
import { Pool } from "pg";
import { createCsrfMiddleware, createMiddleware, createStart } from "@tanstack/react-start";
import { getDb } from "./data/db";

const globalContextMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    const pool = new Pool({
      connectionString: process.env.POSTGRES!,
    });

    const db = getDb(pool);

    return next({
      context: {
        db,
      },
    });
  } catch (error) {
    console.log({ msg: "Error in root context middleware", error });
    throw error;
  }
});

const csrfMiddleware = createCsrfMiddleware({
  filter: ctx => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, globalContextMiddleware],
  functionMiddleware: [],
}));
```

This middleware will run once *per request*, which is exactly what we want. We create our database object and then add it to the context.

```js
return next({
  context: {
    db,
  },
});
```

Now you can access the `db` object from any server functions, or server routes (API routes) via the `context` object that’s passed in.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img6-1.jpg?resize=1024%2C154&ssl=1)

---

## Odds and Ends

If you’re connecting to a database that’s hosted in a particular region, you’ll almost always want your web app served from the same region. Putting the workers serving your app closer to your users might seem appealing, but that only serves to make the workers further from your database, increasing the latency of your queries and updates, and your app will likely need to make *multiple* requests to your database in the process of serving a request.

My PlanetScale database is in AWS’s us-east-1 region, and so I can pin my Cloudflare app to the same region with this entry in my Wrangler file.

```json
"placement": {
  "region": "aws:us-east-1",
},
```

It can make a large difference. I saw the latency in running a very simple query against a small table explode from about 7ms when placed in the same region as my database, up to over 10X (about 80ms) when placed on the United States West Coast.

---

## Concluding Thoughts

I absolutely love Cloudflare’s development platform. Workers are an outstanding, low-latency way to host your web application. I hope this post has provided the tools you need to get your first app up and running there.

::: info Article Series

```component VPCard
{
  "title": "Introduction to Cloudflare Workers for Web Apps",
  "desc": "Maybe you don't need a traditional server to run a web app that needs a node server backend. Maybe the requests that need that can go to a cloud function on demand. ",
  "link": "/blog.master.dev/introduction-to-cloudflare-workers-for-web-apps.md",
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

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Cloudflare Workers and Hyperdrive with TanStack Start",
  "desc": "In Part 2 of the series on using Cloudflare with Web Apps, the focus is on setting up a database and addressing key issues like performance and connection management.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/cloudflare-workers-and-hyperdrive-with-tanstack-start.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
