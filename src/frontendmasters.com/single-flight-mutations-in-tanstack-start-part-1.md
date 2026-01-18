---
lang: en-US
title: "Single Flight Mutations in TanStack Start: Part 1"
description: "Article(s) > Single Flight Mutations in TanStack Start: Part 1"
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
      content: "Article(s) > Single Flight Mutations in TanStack Start: Part 1"
    - property: og:description
      content: "Single Flight Mutations in TanStack Start: Part 1"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/single-flight-mutations-in-tanstack-start-part-1.html
prev: /programming/js-react/articles/README.md
date: 2026-01-23
isOriginal: false
author:
  - name: Adam Rackis
    url : https://frontendmasters.com/blog/author/adamrackis/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8334
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
  name="Single Flight Mutations in TanStack Start: Part 1"
  desc="What if we could mutate data *and* get all the data back we need to properly update the UI in just one network round-trip?"
  url="https://frontendmasters.com/blog/single-flight-mutations-in-tanstack-start-part-1/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8334"/>

A **“single flight mutation”** is a fancy way of saying: mutate the data *and* update the UI with just *one* round trip to the network.

The beautiful thing about implementing this with TanStack is that we can leverage the tools we already know, and love: [<VPIcon icon="fas fa-globe"/>TanStack Query](https://tanstack.com/query/latest) (formerly react-query), [<VPIcon icon="fas fa-globe"/>TanStack Router](https://tanstack.com/router/latest), and [<VPIcon icon="fas fa-globe"/>TanStack Start](https://tanstack.com/start/latest).

If you’re not familiar with these tools, TanStack Router is a client-only SPA framework (see my [**three-part introduction series**](/frontendmasters.com/introducing-tanstack-router.md)). TanStack Start is a server layer for Router that enables things like SSR, API routes, and server functions (see my [**introduction for it**](/frontendmasters.com/introducing-tanstack-start.md) and [**a post on its middleware feature**](/frontendmasters.com/introducing-tanstack-start-middleware.md)).

I’ve never written about TanStack Query, but it’s one of the most widely used React libraries, and there are tons of resources about it. One of the best would be [<VPIcon icon="fas fa-globe"/>TkDodo’s blog](https://tkdodo.eu/blog/all). He’s the lead maintainer of TanStack Query, and his blog is superb.

In this first post, we’ll cover some fundamentals and then implement the simplest imaginable single flight mutation with a TanStack Start Server Function. In the next part, we’ll dive deep into middleware and implement a more serious solution, while having some fun with TypeScript in the process.

---

## Laying the Groundwork

In my [**post on TanStack Start**](/frontendmasters.com/introducing-tanstack-start.md), I included this image, which is how client-driven single-page applications (SPAs) almost always behave.

![A flow diagram illustrating the sequence of actions between a browser and a web server when loading a webpage, highlighting the steps of rendering an empty app shell, loading scripts, requesting data, and finally displaying the full page.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/img1.png?ssl=1)
<!-- TODO: mermaid화 -->

The initial request for whatever URL you’re viewing returns an empty skeleton of a page. From there, more networks requests happen to fetch scripts and styles, and most likely some data, which eventually results in your actual content page being rendered.

The network round trips will almost always be the single most expensive thing your web application will do. To look at it another way, there are few things you can do to improve performance as much as *removing* network roundtrips. And this is why server-side rendering can be so beneficial: it allows us to display content to our users *immediately*, after the initial request is responded to.

I expressed this in the Start post with this image.

![Diagram illustrating the sequence of actions in client-driven single-page applications, showing the initial GET request for an HTML document, followed by script file requests, and the transition from page display to interactivity.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/img2.png?ssl=1)
<!-- TODO: mermaid화 -->

Those scripts and styles still have to load for your page to be interactive, but that initial response from the server can immediately display content for the user.

---

## Why Single Flight Mutations

Let’s think about how you’d normally update a piece of data in a web application.

You probably make a network request to some sort of `/update` endpoint, along with a post packet for whatever you’re trying to change. The endpoint will probably return a success flag, possibly with the actual piece of data you just updated. Your UI will usually then request updated data. You might think that returning the updated piece of data you just changed is all you’d need in order to update the UI, but frequently that’s not the case.

Imagine you’re looking at a list of TODO tasks, and you just edited one of them. Just updating the item on the screen isn’t good enough; maybe the edit causes this TODO to no longer even be in this list, depending on your filters. Or perhaps your edit causes this TODO to move to a different page in your results, based on your sort order. Or maybe you just *created* a *brand new* todo. In that case, who knows where, or even *if* this todo will show up in your list, again based on your filters and sorts.

So we re-fetch whatever query produces our list. It usually looks like this

![A flowchart illustrating the interaction between a browser and web server, detailing the process of posting updated data, receiving an update result, requesting updated data, and updating the UI accordingly.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/img3.png?resize=1024%2C922&ssl=1)
<!-- TODO: mermaid화 -->

This works, and if we’re honest with ourselves, it’s usually good enough. But can we do better? We wouldn’t be good engineers if we didn’t at least *try*. Conceptually we’d like to get something like this

![A diagram illustrating the flow of data between the browser and web server during a single flight mutation. It shows a POST request to '/update-data' from the browser, followed by a response that includes both the result and new data for UI updates.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/img4.png?ssl=1)
<!-- TODO: mermaid화 -->

We’ll implement a dead simple solution to this here in part 1, and then part 2 will discuss increasingly flexible ways of accomplishing it with middleware.

---

## Our App

As with prior posts about TanStack Start and Router, this post will use our cheap, simple, and frankly ugly Jira clone. [Here’s a repo for it (<VPIcon icon="iconfont icon-github" />`arackaf/tanstack-start-single-flight-mutations-blog-post`)](https://github.com/arackaf/tanstack-start-single-flight-mutations-blog-post). It’s a trivial app that runs on an SQLite database. The epics page looks like this:

![Screenshot of a web application displaying an overview of epics with a list of tasks, including buttons for viewing and editing.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/img5.png?resize=830%2C1024&ssl=1)

As you can see, zero effort was put into the design. But there’s a few sources of data on the screen, which will help us implement single flight mutations: the main list of epics; the count of all epics (12) just above the list; and above that we have a summary list of epics, with the numbers of tasks therein.

This is the page we’ll be focusing on for this post. If you’re following along at home, you can run the app with `npm run dev` and then visit `http://localhost:3000/app/epics`.

Our queries for our list of epics and our summary data are driven by react-query. I’ve put the query options into helper utilities, like so.

```js
export const epicsQueryOptions = (page: number) => {
  return queryOptions({
    queryKey: ["epics", "list", page],
    queryFn: async () => {
      const result = await getEpicsList({ data: page });
      return result;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};
```

This allows me to query data using the normal `useQuery` or `useSuspenseQuery` hook.

```js
const { data: epicsData } = useSuspenseQuery(epicsQueryOptions(deferredPage));
```

And also prefetch these queries in TanStack loaders, without duplicating code.

```js
async loader({ context, deps }) {
    const queryClient = context.queryClient;

    queryClient.ensureQueryData(epicsQueryOptions(deps.page));
    queryClient.ensureQueryData(epicsCountQueryOptions());
  },
```

As you can see, this query (and all our other queries) are just straight calls to a single server function (`getEpicsList` in this case), with the result passed through. This is a key detail that will come in handy in part 2. 

---

## Simplest Possible Single Flight Mutation

Let’s implement a dirt simple single flight mutation, and then iterate on it, to make it more and more scalable. Our main epics page has an edit button, which allows for inline editing.

![A user interface displaying a list of epics with their respective task counts, including buttons for viewing and editing each epic.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/img6.png?resize=792%2C1024&ssl=1)

When we hit save, let’s just refetch the list of epics, as well as the epics summary data inside the edit epic server function, and send those new data down to the client, so the client can update the UI.

Here’s the entire server function:

```js
export const updateWithSimpleRefetch = createServerFn({ method: "POST" })
  .inputValidator((obj: { id: number; name: string }) => obj)
  .handler(async ({ data }) => {
    await new Promise(resolve => setTimeout(resolve, 1000 * Math.random()));
    await db.update(epicsTable).set({ name: data.name }).where(eq(epicsTable.id, data.id));

    const [epicsList, epicsSummaryData] = await Promise.all([getEpicsList({ data: 1 }), getEpicsSummary()]);

    return { epicsList, epicsSummaryData };
  });
```

We save our epic, and then fetch the updated data from the `getEpicsList`, and `getEpicsSummary` server functions, which we call in parallel with `Promise.all`. Note that a production-ready application would likely have some error handling.

Now when we call our server function, the data for those queries will be attached to the result. In fact, since we’re using server functions, these things will even be statically typed!

![Code snippet displaying a loop over result.epicsList with properties of each epic highlighted, showing 'id' and 'name' attributes.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2026/01/img7.png?resize=1024%2C150&ssl=1)

---

## Updating the UI

With updated data for our queries coming back after the save, we can now insert it back into the UI. TanStack Query makes this simple. We need a reference to the QueryClient:

```js
const queryClient = useQueryClient();
```

Then we can update the query payload for a given query with the `setQueryData` method. It takes the query key and the data.

```js
const handleSaveSimple = async () => {
  const newValue = inputRef.current?.value || "";
  const result = await runSaveSimple({
    data: {
      id: epic.id,
      name: newValue,
    },
  });

  queryClient.setQueryData(["epics", "list", 1], result.epicsList);
  queryClient.setQueryData(["epics", "list", "summary"], result.epicsSummaryData);

  setIsEditing(false);
};
```

If hard-coding those query keys feels gross to you, don’t forget about those helper utilities we added before.

```js
queryClient.setQueryData(epicsQueryOptions(1).queryKey, result.epicsList, { updatedAt: Date.now() });
queryClient.setQueryData(epicsSummaryQueryOptions().queryKey, result.epicsSummaryData, { updatedAt: Date.now() });
```

---

## Iterating

Our solution works, but it’s fragile. Our server function hard codes which data to fetch. What if our update function were to be called from different parts of the UI, which each needed different slices of data to be refetched? We certainly don’t want to redefine our server function N times, for each place it needs to be called.

Fortunately, TanStack has the perfect feature to help reduce this coupling: Middleware. We can remove the refetching from the server function, and move it to a reusable middleware which can be attached to server functions.

Stay tuned for part 2 where we’ll dive into all of this.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Single Flight Mutations in TanStack Start: Part 1",
  "desc": "What if we could mutate data *and* get all the data back we need to properly update the UI in just one network round-trip?",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/single-flight-mutations-in-tanstack-start-part-1.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
