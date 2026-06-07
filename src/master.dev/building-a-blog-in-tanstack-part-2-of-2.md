---
lang: en-US
title: "Building a Blog in TanStack (Part 2 of 2)"
description: "Article(s) > Building a Blog in TanStack (Part 2 of 2)"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Tanstack
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building a Blog in TanStack (Part 2 of 2)"
    - property: og:description
      content: "Building a Blog in TanStack (Part 2 of 2)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/building-a-blog-in-tanstack-part-2-of-2.html
prev: /programming/js-react/articles/README.md
date: 2026-04-20
isOriginal: false
author:
  - name: Adam Rackis
    url: https://master.dev/blog/author/adamrackis/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/9365
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

[[toc]]

---

<SiteInfo
  name="Building a Blog in TanStack (Part 2 of 2)"
  desc="A blog is a perfect use case for pre-rendering, so that the static build files can render all on their own. TanStack Start can even help with the server functions via middleware."
  url="https://master.dev/blog/building-a-blog-in-tanstack-part-2-of-2/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/9365"/>

We left off this series with a functional blog in TanStack Start. We set up [Shiki](https://shiki.matsu.io/) for code syntax highlighting and created server functions to inspect the file system, discover blog posts (in Markdown files), and build the final blog pages for all posts.

::: info Article Series

```component VPCard
{
  "title": "Building a Blog in TanStack (Part 1 of 2)",
  "desc": "A site building framework like TanStack Start can be used to make a server-side rendered blog, no problemo. ",
  "link": "/master.dev/building-a-blog-in-tanstack-part-1-of-2.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Building a Blog in TanStack (Part 2 of 2)",
  "desc": "A blog is a perfect use case for pre-rendering, so that the static build files can render all on their own. TanStack Start can even help with the server functions via middleware.",
  "link": "/master.dev/building-a-blog-in-tanstack-part-2-of-2.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

But we’ve still got work to do.

---

## Performance Issues

It turns out that the Shiki setup, which lives in the top-level `async function getMarkdownIt()` method takes no small amount of time to set up. It’s not that the function is slow to call; it’s quite fast. But the initial parsing of this module is extremely slow. On my own modern MacBook Pro, it takes about 2 *seconds* (2000ms) to parse. This is because a lot of WASM is being loaded, which is what powers the parsing and formatting of any code we pass in.

This means that when your web server first spins up and processes the import graph, this particular function will block the process for about two seconds. You might think, for a blog, this is an unimportant cost: it’s just spin-up time, after all, which happens only once.

---

## Cold Starts

Or does it? What if you deploy this site to Netlify, Vercel, or any other serverless platform, like AWS Lambda. With that runtime model, cloud functions will constantly be spinning up, to process requests. This spin-up time is called a “cold start,” and is a well-known issue with Serverless. Usually, cold start times are reasonable, and modern platforms like Netlify and Vercel will “pre-warm” serverless functions to minimize this cost from happening at all.

---

## Going Static

Rather than debate the importance of minimizing cold starts for a blog that likely has few readers, let’s take a step back: do we even need a server? Blogs are inherently static. Any modern web framework provides a way to pre-render content statically: this is exactly what we need. Why not just pre-render our blog pages so we can render them anywhere without any server processing? We could even just toss the built static assets onto a CDN.

---

## Pre-Rendering Pages

To start, let’s get into the <VPIcon icon="iconfont icon-typescript"/>`vite.config.ts` file and add a setting to the TanStack plugin:

```ts title="vite.config.ts"
tanstackStart({
  prerender: {
    enabled: true,
  },
}),
```

This enables pre-rendering. Now, during the build process, TanStack will crawl routes and the links within them. So it will start with our home `/` route, build the page with all our blog posts, and then find each `<Link>` tag and crawl those. If those pages had links, they’d be crawled as well.

When we run our build, we can see this in action during the build process:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img5.png?resize=606%2C566&ssl=1)

We can look at the output of this build by peeking inside the <VPIcon icon="fas fa-folder-open"/>`.output` folder, which is where the Nitro plugin (the default deployment adapter) creates our output:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img6.png?resize=504%2C972&ssl=1)

The <VPIcon icon="fas fa-folder-open"/>`/public` folder will contain everything that can be routed to directly. Our <VPIcon icon="fa-brands fa-html5"/>`index.html` is in there, as well as paths to both blogs, and the images from blog `post-2`.

---

## Running Content as a Static Website

Uploading these files to an S3 bucket would be a bit over the top for this post. To test true static rendering more simply, I’ve put together these two scripts on this post’s repo.

```json
{
  "generate-static-site": "npm run build && rm -rf static-site && mkdir -p static-site && cp -r .output/. static-site",
  "start-static-server": "npx tsx static-server.ts"
}
```

This is a script to build and copy the contents to a folder called <VPIcon icon="fas fa-fodler-open"/>`static-site`. Then another to run <VPIcon icon="iconfont icon-typescript"/>`static-server.ts`, which looks like this, in its entirety.

```ts title="static-server.ts"
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3003;

// Serve static files from the static-site directory
app.use(express.static(path.join(__dirname, "static-site/public")));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});`
```

This script fires up an Express web server and points the static middleware at <VPIcon icon="fas fa-folder-open"/>`/public` inside the <VPIcon icon="fas fa-fodler-open"/>`static-site` folder we just copied our build output into.

When we run this app, all of our pages work when we browse directly to them.

![index page](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img7.png?resize=990%2C968&ssl=1)

![blog post page](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img8.png?resize=1024%2C453&ssl=1)

These pages work if we navigate directly to them in our browser’s URL bar. But if we click around in our app, these pages fail.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img9.png?resize=1024%2C294&ssl=1)

Looking in the network tab makes this even clearer.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img10.png?resize=1024%2C119&ssl=1)

As we navigate, our server function is being called. Didn’t we pre-render these pages?

---

## How TanStack Start Does Pre-Rendering

Our pre-rendered HTML file is indeed rendered by our Express server. But when it is, script tags containing the normal TanStack app will spin up and take over. At the end of the day, TanStack Start generates the same kind of application either way, except that, in this case, the initial render is served from a pre-generated HTML file rather than being server-rendered.

From there on, `Link` tags trigger normal client-side loading, which triggers the server functions, as usual.

TanStack Start does not try to morph itself into a full MPA framework just to handle static web apps. Instead, it gives you the primitives to achieve this yourself.

We already saw the first, which was static pre-rendering. Now let’s look at the other.

---

## Static Server Functions

Our client navigation will run either way, but the real problem is our server functions. To solve this, TanStack provides static middleware that we can apply to server functions. This causes our server functions, during the build, to record invocations and results, then save those payloads to simple JSON files in the build output.

Let’s try it! Install it:

```sh
npm i @tanstack/start-static-server-functions
```

Then import it:

```js
import { staticFunctionMiddleware } from "@tanstack/start-static-server-functions";
```

Then apply it to our server functions:

```js
export const getPostContent = createServerFn()
  .inputValidator((data: { slug: string }) => data)
  .middleware([staticFunctionMiddleware])
  .handler(async ({ data }) => {
```

Now, when we run our build, we see something new in there.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img11.png?resize=862%2C532&ssl=1)

The <VPIcon icon="fas fa-folder-open"/>`__tsr` folder naming refers to TanStack Router, and the `staticServerFnCache` contains the 3 server function calls from parsing our blog: one for the index page, and one each for the two posts we have.

The plugin recorded those invocations and results, and more importantly, replaced those call sites with fetches to the JSON files in the <VPIcon icon="fas fa-folder-open"/>`__tsr` folder.

If we run our blog again, we can navigate and see much simpler fetches to those JSON files.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/04/img12.png?resize=1024%2C137&ssl=1)

---

## Concluding Thoughts

TanStack Start is a superb framework. It’s better known for features like strong static typing and flexible data loading. But as we saw here, it also offers creative ways to support static generation.

::: info Article Series

```component VPCard
{
  "title": "Building a Blog in TanStack (Part 1 of 2)",
  "desc": "A site building framework like TanStack Start can be used to make a server-side rendered blog, no problemo. ",
  "link": "/master.dev/building-a-blog-in-tanstack-part-1-of-2.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Building a Blog in TanStack (Part 2 of 2)",
  "desc": "A blog is a perfect use case for pre-rendering, so that the static build files can render all on their own. TanStack Start can even help with the server functions via middleware.",
  "link": "/master.dev/building-a-blog-in-tanstack-part-2-of-2.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building a Blog in TanStack (Part 2 of 2)",
  "desc": "A blog is a perfect use case for pre-rendering, so that the static build files can render all on their own. TanStack Start can even help with the server functions via middleware.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/building-a-blog-in-tanstack-part-2-of-2.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
