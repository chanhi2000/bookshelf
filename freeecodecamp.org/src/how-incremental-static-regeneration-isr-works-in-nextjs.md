---
lang: en-US
title: "How Incremental Static Regeneration (ISR) Works in Next.js"
description: "Article(s) > How Incremental Static Regeneration (ISR) Works in Next.js"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Incremental Static Regeneration (ISR) Works in Next.js"
    - property: og:description
      content: "How Incremental Static Regeneration (ISR) Works in Next.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-incremental-static-regeneration-isr-works-in-nextjs.html
prev: /programming/js-next/articles/README.md
date: 2025-05-02
isOriginal: false
author:
  - name: Joan Ayebola
    url : https://freecodecamp.org/news/author/joanayebola/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746114577532/94c5118c-f931-415a-932e-45b7e24b99f6.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Incremental Static Regeneration (ISR) Works in Next.js"
  desc="When you build a website, you often have two main choices for how pages are created: statically or dynamically. Static pages are created once when you build your project. They’re fast because the server doesn’t have to do any extra work when someone ..."
  url="https://freecodecamp.org/news/how-incremental-static-regeneration-isr-works-in-nextjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746114577532/94c5118c-f931-415a-932e-45b7e24b99f6.png"/>

When you build a website, you often have two main choices for how pages are created: statically or dynamically.

Static pages are created once when you build your project. They’re fast because the server doesn’t have to do any extra work when someone visits the page.

Dynamic pages are created on the fly. Every time a user asks for a page, the server builds it fresh. This can be slower, but it means the content is always up-to-date.

Both options have benefits and drawbacks. Static pages are very fast, but they can show old content if something changes after the build. Dynamic pages are always fresh, but they can be slow because the server has to work harder.

This is where Incremental Static Regeneration (ISR) comes in. ISR gives you the best of both worlds: the speed of static pages with the freshness of dynamic pages.

In this article, we will explore what ISR is, how it works in Next.js, and how you can use it to make your websites faster and smarter.

---

## What is Incremental Static Regeneration (ISR)?

Incremental Static Regeneration (ISR) is a feature in Next.js that lets you update static pages after you have built your site.

In the past, if you built a static site and needed to change something, you had to rebuild the whole site from scratch. This could take a lot of time, especially for large websites.

ISR solves this problem. With ISR, you can tell Next.js to rebuild a page in the background after a certain amount of time, or whenever you ask it to. The user still sees a fast static page, but the page can also update itself behind the scenes without you having to rebuild everything manually.

In simple words, pages are pre-rendered and served like static files. After a set time, Next.js can regenerate the page with fresh data and users always get fast, reliable pages.

---

## How ISR Works Behind the Scenes

To understand ISR, let’s first look at the three ways you can build pages in Next.js:

- **Static Generation (SSG):** Pages are built once when you deploy. They never change unless you rebuild the whole site.
- **Server-Side Rendering (SSR):** Pages are built fresh on every request. This can slow things down because the server is doing work every time.
- **Incremental Static Regeneration (ISR):** Pages are built at request time *only if needed* after a certain amount of time has passed. Otherwise, users get the already-built page instantly.

### How ISR Actually Works:

When you use ISR:

1. A user visits your page.
2. If the page is already built and not expired, Next.js serves the cached static page.
3. If the page has expired based on the time you set, Next.js rebuilds the page in the background while still serving the old page.
4. The next user who visits gets the fresh new version automatically.

You control when pages expire by setting a time limit, using the `revalidate` key inside your `getStaticProps` function.

Here is the basic setup for ISR:

```js :collapsed-lines title="pages/posts/[id].js"

export async function getStaticProps(context) {
  const { id } = context.params;

  const post = await fetch(`https://example.com/posts/${id}`).then(res => res.json());

  return {
    props: {
      post,
    },
    revalidate: 60, // Regenerate the page after 60 seconds
  };
}

export async function getStaticPaths() {
  const posts = await fetch('https://example.com/posts').then(res => res.json());

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}
```

::: info What this does:

- The page is built and cached the first time someone visits it.
- After 60 seconds, if someone visits again, Next.js will rebuild the page in the background with new data.
- Users always get a page immediately. They never have to wait.

:::

---

## When Does ISR Trigger a New Page Generation?

Now that you know what ISR is, let’s look at when and how a page actually gets regenerated.

Here is the flow:

1. A user requests a page.
2. Next.js checks if a cached (already built) page exists.
3. If the page is still "fresh" (inside the `revalidate` time), it simply serves the cached page.
4. If the page is "stale" (outside the `revalidate` time), it **serves the old cached page** immediately but also starts rebuilding the page in the background.
5. Once the rebuild is done, the next user gets the new updated page.

::: important

No one ever waits. ISR always serves something instantly, either the fresh page or the previous version.

```plaintext
User visits page --> Is page fresh?
         |
    Yes  |  No
    Serve cached page  Serve cached page + Start background regeneration
                           |
                  Regeneration finished
                           |
                  Next user sees updated page
```

:::

::: tip Quick Example

Let’s say you set `revalidate: 30` seconds for your page.

- At 12:00:00 PM → Page is built and cached.
- At 12:00:10 PM → A user visits. Page is served from cache (still fresh).
- At 12:00:35 PM → Another user visits. Cache is stale, so Next.js serves the old page but triggers a rebuild.
- At 12:00:36 PM → Rebuild finishes. New page is ready.
- At 12:00:40 PM → Next visitor gets the new fresh page.

**In short:**

The page is always available fast, and it quietly updates itself without users even noticing.

:::

---

## Common Use Cases for ISR

You might be wondering, when you should actually use ISR?

Here are the most common situations where ISR is the perfect choice:

### 1. Blogs and News Sites

If you run a blog or a news website, new articles are added often. You want your readers to see fresh content, but you also want the pages to load fast.

With ISR:

- Articles are built as static pages.
- When you publish a new article, it quietly updates after a short time.
- Readers always get fast loading speeds.

::: tip Example

A tech blog updates every few hours. You set `revalidate: 3600` (1 hour) so pages refresh with new content once every hour.

:::

### 2. E-commerce Product Pages

In online stores, product information like prices, availability, and descriptions change often. You want the data to be pretty fresh, but you also need fast page loads for good sales.

With ISR:

- Product pages load instantly.
- If something changes (like a sale), the page quietly updates without hurting the shopping experience.

::: tip Example

You set `revalidate: 300` (5 minutes) for your products so that changes show up quickly without slowing down the store.

:::

### 3. Dashboards and User-Generated Content

If your site has dashboards, reviews, forums, or user profiles that do not change every second, ISR can be a smart choice.

With ISR:

- You can show updated posts, comments, or stats without making the server work too hard.
- The content refreshes at intervals you decide.

::: tip Example:

A review site refreshes its "Top Products" list every day using `revalidate: 86400` (24 hours).

**In short:**

If your page changes sometimes (not every second) and you want great speed and fresh content, use ISR.

:::

---

## Best Practices for Using ISR

To get the best results with ISR, you need to set it up correctly. Here are some important tips to make sure everything works smoothly.

### 1. Choose the Right `revalidate` Time

Think about how often your content really changes.

- If your content changes **hourly**, you might set `revalidate: 3600` (which is 1 hour).
- If your content changes **daily**, you might set `revalidate: 86400` (which is 24 hours).
- If your content changes **every few minutes**, you might set `revalidate: 300` (which is 5 minutes).

::: tip

Pick a `revalidate` time that balances newness and server load. Shorter times mean fresher data but can put more pressure on your server.

:::

### 2. Handle Errors Efficiently

Sometimes, your data source (like an API) might fail when regenerating a page.

To avoid breaking your page:

- Always use a try-catch block in your `getStaticProps`.
- Show a fallback message or a simple error page if the fetch fails.

::: tip Example

```js
export async function getStaticProps() {
  try {
    const data = await fetch('https://example.com/data').then(res => res.json());

    return {
      props: { data },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Failed to fetch data:', error);

    return {
      props: { data: null },
      revalidate: 60,
    };
  }
}
```

:::

### 3. Think About SEO

Since ISR serves static pages fast, it is great for SEO.

Just remember:

- Always return meaningful content even if data fetching fails.
- Avoid showing "Loading..." states when using ISR. The page should feel complete to both users and search engines.

---

## Potential Pitfalls and How to Avoid Them

Even though ISR is amazing, there are a few things that can trip you up if you are not careful. Here is what to watch out for.

### 1. Stale Data Issues

Sometimes users might see old data if the page has not revalidated yet. This happens because ISR serves the cached version until a new one is built.

**How to handle it:**

- Set a `revalidate` time that makes sense for your content.
- If your content is very sensitive (like stock prices), you might want to use Server-Side Rendering (SSR) instead of ISR.

### 2. Deployment Misconfigurations

ISR needs server support to work correctly. If you are hosting your site on platforms like Vercel or Netlify, they handle this for you.

But if you use a custom server or different hosting, make sure:

- You have serverless functions or backend support running.
- You do not turn your site into static-only hosting by mistake (like plain S3 buckets without any backend).

::: tip

Always check your hosting provider’s docs to confirm they support **Next.js ISR** properly.

:::

### 3. Big Rebuilds Can Cause Load Spikes

If your `revalidate` is too short and you have thousands of pages, the server might get flooded with background regeneration requests.

::: info How to handle it:

- Be smart with your `revalidate` values.
- For very big sites, consider On-Demand ISR (where you control when pages rebuild manually - we’ll talk about this next).

:::

---

## Advanced Tips: On-Demand ISR

Normally, with ISR, pages regenerate after a set time that you define with `revalidate`.

But sometimes you want full control. You want to regenerate a page immediately after something happens, like:

- A new blog post is published
- A product is updated
- A user submits new content

This is where On-Demand ISR comes in.

With On-Demand ISR, you manually trigger a page to rebuild using an API route. No waiting for the timer - you decide when it happens.

### How to Set Up On-Demand ISR

You need two simple things:

1. An API Route that tells Next.js to revalidate a page.
2. A secret token to protect your API so not just anyone can trigger it.

### Example: Basic API Route for On-Demand ISR

Create a file like this:

```js title="pages/api/revalidate.js"

export default async function handler(req, res) {
  // Secret token check for security
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const pathToRevalidate = req.query.path;

    await res.revalidate(pathToRevalidate);

    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: 'Error revalidating' });
  }
}
```

### How to Trigger It

You can make a **POST** request to your API route like this:

```plaintext
POST /api/revalidate?secret=YOUR_TOKEN&path=/your-page-path
```

For example:

```plaintext
POST /api/revalidate?secret=MY_SECRET_TOKEN&path=/posts/my-new-post
```

Next.js will immediately rebuild `/posts/my-new-post`, no need to wait for the timer.

::: important

- Always use a secret token and store it safely (like in <VPIcon icon="fas fa-file-lines"/>`.env` files).
- Make sure only trusted systems (like your CMS or admin panel) can call the revalidate API.

:::

---

## Conclusion

Incremental Static Regeneration (ISR) is one of the best features in Next.js. It gives you the speed of static pages and the newness of dynamic content at the same time.

With ISR:

- Your pages load instantly.
- Your content stays up-to-date without full rebuilds.
- Your website feels smooth, modern, and professional.

If you use ISR wisely, you can build websites that are faster and smarter without making things complicated.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Incremental Static Regeneration (ISR) Works in Next.js",
  "desc": "When you build a website, you often have two main choices for how pages are created: statically or dynamically. Static pages are created once when you build your project. They’re fast because the server doesn’t have to do any extra work when someone ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-incremental-static-regeneration-isr-works-in-nextjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
