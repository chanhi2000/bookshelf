---
lang: en-US
title: "Introduction to Cloudflare Workers for Web Apps"
description: "Article(s) > Introduction to Cloudflare Workers for Web Apps"
icon: fa-brands fa-cloudflare
category:
  - Node.js
  - DevOps
  - Cloudflare
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - node
  - nodejs
  - node-js
  - devops
  - cloudflare
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Introduction to Cloudflare Workers for Web Apps"
    - property: og:description
      content: "Introduction to Cloudflare Workers for Web Apps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/introduction-to-cloudflare-workers-for-web-apps.html
prev: /programming/js-node/articles/README.md
date: 2026-06-26
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10183
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
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
  name="Introduction to Cloudflare Workers for Web Apps"
  desc="Maybe you don't need a traditional server to run a web app that needs a node server backend. Maybe the requests that need that can go to a cloud function on demand. "
  url="https://blog.master.dev/introduction-to-cloudflare-workers-for-web-apps/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10183"/>

Welcome to the first of a two-part series about Cloudflare and using [<VPIcon icon="fa-brands fa-cloudflare"/>Cloudflare Workers](https://cloudflare.com/products/workers/) to ship web apps. In this article, we’ll look at the advantages and tradeoffs of Cloudflare Workers, then in part 2 (coming soon!) we’ll take a closer look at implementation, and some of the surprising (but manageable) things you have to do to keep Cloudflare happy.

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

---

## What are Cloudflare Workers?

Cloudflare workers are superficially similar to cloud functions as you’d run on AWS Lambda. A worker spins up on demand for as much, or as little traffic as your web application might be experiencing at any given moment in time; workers, like Lambda functions, will pop into existence as much as your traffic demands.

If you’re new to AWS Lambda as well, think of these cloud functions (Cloudflare workers, AWS Lambda functions, etc) as on-demand web servers. Traditional web servers are long-running. They start up and start serving requests for your web application. They do all the things any web server would always do: request data from a database, server render markup, render RSCs, make fetches to external HTTP endpoints, etc.  

The real *difference* with cloud functions is in scaling. As traffic exceeds certain thresholds, a single traditional web server can no longer keep up. At that point, engineers have to consider horizontally scaling their application by adding more web servers, placing them behind load balancers, etc. 

Cloud functions (Cloudflare Workers and AWS Lambdas alike) streamline this in the most turnkey way imaginable. As requests start coming in for your web application, these cloud functions spin up and come to life, and start serving requests. If the requests die off, the cloud functions die off. If the requests start coming in even faster, more cloud functions will spin up as needed to keep up with the request rate (unless you have hard spending limits set in your cloud provider). These cloud functions are, conceptually at least, normal, mini web servers that effortlessly scale up as much, or as little (down to zero) as your web application needs.

Cloudflare Workers have one big, important difference as compared to AWS Lambdas: they run on V8 isolates. Let’s unpack what that means. V8 is the JavaScript engine used by Chrome, and an isolate is a lightweight, sandboxed execution environment inside of V8. Why does that matter? Lightweight is the key point. They spin up extremely fast. AWS Lambda functions have startup costs, usually referred to as a “cold start.” When a new Lambda needs to spin up to serve a request, the worker must be provisioned and loaded with the code the developer shipped. That loading time is usually in the high two- or even low three-digit millisecond range.

While 100ms may not seem like a huge amount of time, think of it as a handicap your web app has to wait before the normal rendering pipeline even starts.

Cloudflare workers routinely spin up in single-digit milliseconds; they have extremely low latency.

If you’d like to learn more about how Cloudflare implemented this, there are some blog posts [<VPIcon icon="fa-brands fa-cloudflare"/>here](https://blog.cloudflare.com/eliminating-cold-starts-with-cloudflare-workers/) and [<VPIcon icon="fa-brands fa-cloudflare"/>here](https://blog.cloudflare.com/eliminating-cold-starts-2-shard-and-conquer/)

---

## How Much Do Cold Starts Matter?

I want to be crystal clear: cold starts are not as big a deal as you might be thinking. Lambda functions remain active for some time after serving a request and are reused for subsequent requests. Do not think that every request has to be served by a fresh Lambda that has to cold-start. Applications with steady traffic will likely see very few cold starts; however, spiking traffic will necessarily result in new functions spinning up, and cold starting.

But why tolerate any performance hit? Cloudflare’s low latency makes it an extremely compelling application host.

---

## What’s the Catch?

Historically Cloudflare Workers, since they ran on V8 isolates, had a limited runtime; they did not support many Node APIs. That’s since changed with the `node_compat` flag, which we’ll be seeing.

There’s one other tradeoff, though: Cloudflare Workers have strict rules that require requests to be completely independent. Cloudflare Workers, like AWS Lambda, stay alive between requests and are reused across them. But with Cloudflare workers, each request has to clean itself up *completely*. We’ll look at a common, frustrating example of this in part 2, when we talk about setting up database connections.

---

## Our First Cloudflare App

I’ll be using TanStack Start for this post. I’m just scaffolding a fresh app [<VPIcon icon="iconfont icon-tanstack"/>using the instructions here.](https://tanstack.com/start/latest/docs/framework/react/getting-started#start-a-new-project)

After creating an empty app and pushing it to GitHub, let’s see how easy it is to get it running on Cloudflare.

First, go to [<VPIcon icon="fa-brands fa-cloudflare"/>`dash.cloudflare.com`](https://dash.cloudflare.com/) (and create an account if needed).

In the side nav on the left under Build, Compute, you should see a Workers & Pages option. Go there, then hit the Create Application button

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img1_pre.jpg?resize=1024%2C106&ssl=1)

We’ll want to use GitHub.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img1.jpg?resize=1024%2C698&ssl=1)

Then choose our app.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img2.jpg?resize=1024%2C936&ssl=1)

The default settings should be fine.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img3.jpg?resize=1024%2C885&ssl=1)

Once done, you should have a URL to view your app.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img3_a.jpg?resize=1024%2C167&ssl=1)

Which, since it’s just the default scaffolded TanStack app, will be fairly boring.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img3_b.jpg?resize=1024%2C282&ssl=1)

::: note

If you ever get Cloudflare errors about lockfiles being out of sync, just `rm -rf node_modules`, delete your lockfile and re-run `npm i` (or whatever package manager you’re using).

:::

---

## Maturing Our Setup

Clicking some buttons in the Cloudflare dashboard is simple and easy, but really our app needs a wrangler file. Wrangler is the CLI tool Cloudflare ships to manage all aspects of your app, usually through a <VPIcon icon="fas fa-file-lines"/>`wrangler.jsonc` file, which is ultimately (if present) the source of truth for your application.

---

## Creating our <VPIcon icon="fas fa-file-lines"/>`wrangler.jsonc` file

Rather than manually create the file and start filling in values, let’s let Cloudflare create this file for us.

We’ll do this by running `npx wrangler deploy`.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img4.jpg?resize=833%2C1024&ssl=1)

As we can see, this does indeed create our wrangler file, and populate it with correct values.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img5.jpg?resize=1024%2C342&ssl=1)

The `name` value is what we’d expect, and what Cloudflare already inferred when we set this repo up manually.

The compatibility date is to prevent regressions from any changes made to the Cloudflare platform at a date later than what’s listed here; this feature avoids breaking changes happening *after* this date.

The `observability` value allows any logging we do to show up in our Cloudflare logs. If anyone at Cloudflare is reading this, please consider making this true by default!

The `main` value tells Cloudflare how to execute our app, and, wonderfully, it inferred that we had a TanStack app and inserted the correct value.

Lastly, `"compatibility_flags": ["nodejs_compat"]` adds Node compatibility to our Cloudflare Worker, which, of course, allows many of TanStack Start’s features to work.

But most impressively, it also adjusted some of our scripts to be more appropriate for Cloudflare, and even installed some new packages, the Cloudflare Vite plugin in particular.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img6.jpg?resize=1024%2C799&ssl=1)

And it even *adjusted our Vite config* to remove our Nitro plugin (the agnostic deployment package for TanStack) and replaced it with the Cloudflare one.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img7.jpg?resize=1024%2C568&ssl=1)

---

## We’re Up and Running

It’s worth pausing and really noting how much Cloudflare did for us. It inferred the type of application we had, and it set everything up *for us*, from deployment scripts to adding the Cloudflare plugin. This is an incredibly impressive DX, and it’s clear a lot of love, and work went into this.

If you’re wondering how anything worked before, when we simply imported our app into Cloudflare via the dashboard, without any wrangler file existing, or Cloudflare plugin installed, or added to our Vite config, my best guess is that the `npx wrangler deploy` that was configured by default for the “Deploy Command” (scroll up and see) did all this on the Cloudflare servers. But really it doesn’t matter: just run this locally and get your local environment set up properly.

---

## Setting Secrets and Generating Types

Before we wrap up and move on to part 2, where we’ll cover some important but subtly tricky things like managing database connections, let’s cover something simple: managing secrets. This will also let us see Cloudflare’s impressive typegen functionality.

To set a secret, use the command

```sh
npx wrangler secret put SECRET_NAME
```

Wrangler will prompt you for a value, and this will be set in production, on the Cloudflare workers this app deploys to.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img8.jpg?resize=1016%2C318&ssl=1)

Now let’s add those values to your local <VPIcon icon="iconfont icon-dotenv"/>`.env` file

```sh title=".env"
SECRET_1='local secret1'  
SECRET_2='local secret2'
```

For security reasons, your local development environment pulls from here locally, not from your production secrets, which exist only on Cloudflare Workers.

---

## Using Secrets

To use our secrets, we have two options. We can simply do `process.env.SECRET_1`. But Cloudflare gives us a nifty, strongly typed alternative. Let’s add this special import

```js
import { env } from "cloudflare:workers";
```

At first, this import will error out, since no such module exists. But Cloudflare ships with a typegen command: `"wrangler types"`. In fact this was set up as an npm script `"cf-typegen": "wrangler types"`

Honestly `npx wrangler types` is easier for me to remember than `cf-typegen` but you can use either, or configure a different npm script.

However you run it, you’ll wind up with a `worker-configuration.d.ts` file generated, which looks like this, in part

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img9.jpg?resize=1024%2C560&ssl=1)

The entire file runs to over 15,000 lines, but the very top contains our secrets.

And now we can grab our secrets right off of our `env` object, in a strongly typed manner.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/img10.jpg?resize=1024%2C783&ssl=1)

---

## Onward!

We’ve barely scratched the surface of Cloudflare. Many production apps will require a database to function. In part 2, we’ll see how to set that up, and some of the special considerations Cloudflare’s platform requires.

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
  "title": "Introduction to Cloudflare Workers for Web Apps",
  "desc": "Maybe you don't need a traditional server to run a web app that needs a node server backend. Maybe the requests that need that can go to a cloud function on demand. ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/introduction-to-cloudflare-workers-for-web-apps.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
