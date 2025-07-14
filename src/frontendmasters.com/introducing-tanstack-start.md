---
lang: en-US
title: "Introducing TanStack Start"
description: "Article(s) > Introducing TanStack Start"
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
      content: "Article(s) > Introducing TanStack Start"
    - property: og:description
      content: "Introducing TanStack Start"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-tanstack-start.html
prev: /programming/js-react/articles/README.md
date: 2024-12-18
isOriginal: false
author:
  - name: Adam Rackis
    url : https://frontendmasters.com/blog/author/adamrackis/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4810
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
  name="Introducing TanStack Start"
  desc="TanStack Start enhances the TanStack Router by adding a server layer that improves performance through server-side rendering (SSR) and isomorphic loaders."
  url="https://frontendmasters.com/blog/introducing-tanstack-start/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4810"/>

The best way to think about[<FontIcon icon="fas fa-globe"/>TanStack Start](https://tanstack.com/start/latest)is that it’s a thin server layer atop the[<FontIcon icon="fas fa-globe"/>TanStack Router](https://tanstack.com/router/latest)we[**already know and love**](/frontendmasters.com/introducing-tanstack-router.md); that means we don’t lose a single thing from TanStack Router. Not only that, but the nature of this server layer allows it to side-step the pain points other web meta-frameworks suffer from.

This is a post I’ve been looking forward to writing for a long time; it’s also a difficult one to write.

The goal (and challenge) will be to show why a server layer on top of a JavaScript router is valuable, andwhyTanStack Start’s implementation is unique compared to the alternatives (in a good way). From there, showing how TanStack Start actually works will be relatively straightforward. Let’s go!

::: note

Please keep in mind that, while this post discusses a lot of generic web performance issues, TanStack Start is still a React-specific meta-framework. It’s not a framework-agnostic tool like [<FontIcon icon="iconfont icon-astro"/>Astro](https://astro.build/).

:::

---

## Why Server Rendering?

Client-rendered web applications, often called “Single Page Applications” or “SPAs” have been popular for a long time. With this type of app, the server sends down a mostly empty HTML page, possibly with some sort of splash image, loading spinner, or maybe some navigation components. It also includes, very importantly, script tags that load your framework of choice (React, Vue, Svelte, etc) and a bundle of your application code.

These apps were always fun to build, and in spite of the hate they often get, they (usually) worked just fine (any kind of software can be bad). Admittedly, they suffer a big disadvantage: initial render performance. Remember, the initial render of the page was just an empty shell of your app. This displayed while your script files loaded and executed, and once*those*scripts were run, your application code would most likely need to request data before your actual app could display. Under the covers, your app is doing something like this

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/csr-perf-flow.png?resize=772%2C874&ssl=1)

The initial render of the page, from the web server, renders only an empty shell of your application. Then some scripts are requested, and then parsed and executed. When those application scripts run, you (likely) send some other requests for data. Once*that*is done, your page displays.

To put it more succinctly, with client-rendered web apps, when the user first loads your app, they’ll just get a loading spinner. Maybe your company’s logo above it, if they’re lucky.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/csr-user.png?resize=684%2C498&ssl=1)

This is perhaps an overstatement. Users may not even notice the delay caused by these scripts loading (which are likely cached), or hydration, which is probably fast. Depending on the speed of their network, and the type of application, this stuff might not matter much.

*Maybe.*

But if our tools now make it easy to do better, why not do better?

### Server Side Rendering

With SSR, the picture looks more like this

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/ssr-render.png?resize=788%2C884&ssl=1)

The server sends down the complete, finished page that the user can see immediately. We do still need to load our scripts and hydrate, so our page can be*interactive*. But that’s usually fast, and the user will still have content to see while that happens.

Our hypothetical user now looks like this, since the server is responding with a full page the user can see.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/ssr-user.png?resize=796%2C506&ssl=1)

### Streaming

We made one implicit assumption above: that our data was fast. If our data was slow to load, our server would be slow to respond. It’s bad for the user to be stuck looking at a loading spinner, but it’s even worse for the user to be stuck looking at a blank screen while the server churns.

As a solution for this, we can use something called “streaming,” or “out of order streaming” to be more precise. The user still requests all the data, as before, but we tell our server “don’t wait for this/these data, which are slow: render everything else, now, and send that slow data to the browser when it’s ready.”

All modern meta-frameworks support this, and our picture now looks like this

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/ssr-streaming-user.png?resize=822%2C500&ssl=1)

To put a finer point on it, the server does still initiate the request for our slow data*immediately*, on the server during our initial navigation. It just doesn’t block the initial render, and instead*pushes down*the data when ready. We’ll look at streaming with Start later in this post.

### Why did we ever do client-rendering?

I’m not here to tear down client-rendered apps. They were, and frankly*still are*an incredible way to ship deeply interactive user experiences with JavaScript frameworks like React and Vue. The fact of the matter is, server rendering a web app built with React was tricky to get right. You not only needed to server render and send down the HTML for the page the user requested, but also send down the*data*for that page, and hydrate everything*just right*on the client.

It’s hard to get right. But here’s the thing:**getting this right is the one of the primary purposes of this new generation of meta-frameworks**. Next, Nuxt, Remix, SvelteKit, and SolidStart are some of the more famous examples of these meta-frameworks. And now TanStack Start.

---

## Why is TanStack Start different?

Why do we need a new meta-framework? There’s many possible answers to that question, but I’ll give mine. Existing meta-frameworks suffer from some variation on the same issue. They’ll provide some mechanism to load data on the server. This mechanism is often called a “loader,” or in the case of Next, it’s just RSCs (React Server Components). In Next’s (older) pages directory, it’s the`getServerSideProps`function. The specifics don’t matter. What matters is, for each route, whether the initial load of the page, or client-side navigation via links, some server-side code will run, send down the data, and then render the new page.

### An Impedance Mismatch is Born

Notice the two worlds that exist: the server, where data loading code will always run, and the client. It’s the difference and separation between these worlds that can cause issues.

For example, frameworks always provide some mechanism to mutate data, and then re-fetch to show updated state. Imagine your loader for a page loads some tasks, user settings, and announcements. When the user edits a task, and revalidates, these frameworks will almost always re-run the entire loader, and superfluously re-load the user’s announcements and user settings, in addition to tasks, even though tasks are the only thing that changed.

Are there fixes? Of course. Many frameworks will allow you to create extra loaders to spread the data loading across, and revalidate only*some*of them. Other frameworks encourage you to cache your data. These solutions all work, but come with their own tradeoffs. And remember, they’re solutions to a problem that meta-frameworks *created*, by having server-side loading code for every path in your app.

Or what about a loader that loads 5 different pieces of data? After the page loads, the user starts browsing around, occasionally coming back to that first page. These frameworks will usually cache that previously-displayed page, for a time. Or not. But it’s all or none. When the loader re-runs, all 5 pieces of data will re-fire, even if 4 of them can be cached safely.

You might think using a component-level data loading solution like react-query can help. react-query is great, but it doesn’t eliminate these problems. If you have two different pages that each have 5 data sources, of which 4 are shared in common, browsing from the first page to the second will cause the second page to re-request all 5 pieces of data, even though 4 of them are already present in client-side state from the first page. The server is unaware of what happens to exist on the client. The server is not keeping track of what state you have in your browser; in fact the “server” might just be a Lambda function that spins up, satisfies your request, and then dies off.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/extra-data.png?resize=724%2C800&ssl=1)

In the picture, we can see a loader from the server sending down data for `queryB`, which we already have in our TanStack cache.

### Where to, from here?

The root problem is that these meta-frameworks inevitably have server-only code running on each path, integrating with long-running client-side state. This leads to conflicts and inefficiencies which need to be managed. There’s ways of handling these things, which I touched on above. But it’s not a completely clean fit.

### How much does it matter?

Let’s be clear right away: if this situation is killing performance of your site, you have bigger problems. If these extra calls are putting undue strain on your services, you have bigger problems.

That said, one of the first rules of distributed systems is to never trust your network. The more of these calls we’re firing off, the better the chances that some of them might randomly be slow for some reason beyond our control. Or fail.

We typically tolerate requesting more than we need in these scenarios because it’s hard to avoid with our current tooling. But I’m here to show you some new, better tooling that side-steps these issues altogether.

### Isomorphic Loaders

In TanStack, we do have loaders. These are defined by TanStack Router. I wrote [**a three-part series on Routerhere**](/frontendmasters.com/introducing-tanstack-router.md). If you haven’t read that, and aren’t familiar with Router, give it a quick look.

Start takes what we already have with Router, and adds server handling to it. On the initial load, your loader will run on the server, load your data, and send it down. On all subsequent client-side navigations, your loader will run*on the client*, like it already does. That means all subsequent invocations of your loader will run on the client, and have access to any client-side state, cache, etc. If you like react-query, you’ll be happy to know that’s integrated too. Your react-query client can run on the server, to load, and send data down on the initial page load. On subsequent navigations, these loaders will run on the client, which means your react-query `queryClient` will have full access to the usual client-side cache react-query always uses. That means it will know what does, and does not need to be loaded.

It’s honestly such a refreshing, simple, and most importantly, effective pattern that it’s hard not being annoyed none of the other frameworks thought of it first. Admittedly, [<FontIcon icon="iconfont icon-svelte"/>SvelteKit does have universal loaders](https://svelte.dev/tutorial/kit/universal-load-functions) which are isomorphic in the same way, but without a component-level query library like react-query integrated with the server.

---

## TanStack Start

Enough setup, let’s look at some code. TanStack Start is still in beta, so some of the setup is still a bit manual, for now.

::: info

[The repo for this postis here. (<FontIcon icon="iconfont icon-github"/>`arackaf/tanstack-start-blog-dataloading`)](https://github.com/arackaf/tanstack-start-blog-dataloading)

<SiteInfo
  name="arackaf/tanstack-start-blog-dataloading"
  desc="Contribute to arackaf/tanstack-start-blog-dataloading development by creating an account on GitHub."
  url="https://github.com/arackaf/tanstack-start-blog-dataloading/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/bd24744c9732dfdb919a8f6a44e49c9c3cfae96574c37f0e146f39fd531c23da/arackaf/tanstack-start-blog-dataloading"/>

:::

If you’d like to set something up yourself, check out[<FontIcon icon="fas fa-globe"/>the getting started guide](https://tanstack.com/router/latest/docs/framework/react/start/getting-started). If you’d like to use react-query, be sure to add the library for that. You can see an example[here (<FontIcon icon="iconfont icon-github"/>`TanStack/router`)](https://github.com/TanStack/router/blob/main/examples%2Freact%2Fstart-basic-react-query%2Fapp%2Frouter.tsx). Depending on when you read this, there might be a CLI to do all of this for you.

This post will continue to use the same code I used in my[**prior posts**](/frontendmasters.com/introducing-tanstack-router.md)on TanStack Router. I set up a new Start project, copied over all the route code, and tweaked a few import paths since the default Start project has a slightly different folder structure. I also removed all of the artificial delays, unless otherwise noted. I want our data to be fast by default, and slow in a few places where we’ll use streaming to manage the slowness.

We’re not building anything new, here. We’re taking existing code, and moving the data loading up to the server in order to get it requested sooner, and improve our page load times. This means everything we already know and love about TanStack Router is still 100% valid.

Start does not replace Router; Start*improves*Router.

### Loading Data

All of the routes and loaders we set up with Router are still valid. Start sits on top of Router and adds server processing. Our loaders will execute on the server for the first load of the page, and then on the client as the user browses. But there’s a small problem. While the server environment these loaders will execute in does indeed have a`fetch`function, there are differences between client-side fetch, and server-side fetch—for example, cookies, and fetching to relative paths.

To solve this, Start lets you define a[<FontIcon icon="fas fa-globe"/>server function](https://tanstack.com/router/latest/docs/framework/react/start/server-functions). Server functions can be called from the client, or from the server; but the server function itself always*executes on*the server. You can define a server function in the same file as your route, or in a separate file; if you do the former, TanStack will do the work of ensuring that server-only code does not ever exist in your client bundle.

Let’s define a server function to load our tasks, and then call it from the tasks loader.

```jsx :collapsed-lines title="getTaskList.jsx"
import { getCookie } from "vinxi/http";
import { createServerFn } from "@tanstack/start";
import { Task } from "../../types";

export const getTasksList = createServerFn({ method: "GET" }).handler(async () => {
  const result = getCookie("user");

  return fetch(`http://localhost:3000/api/tasks`, { method: "GET", headers: { Cookie: "user=" + result } })
    .then(resp => resp.json())
    .then(res => res as Task[]);
});
```

We have access to a`getCookie`utility from the [<FontIcon icon="iconfont icon-github"/>`nksaraf/vinxi`](https://github.com/nksaraf/vinxi) library on which Start is built. Server functions actually provide a lot more functionality than this simple example shows. Be sure to check out[<FontIcon icon="fas fa-globe"/>the docs](https://tanstack.com/router/latest/docs/framework/react/start/server-functions)to learn more.

If you’re curious about this fetch call:

```js
fetch(`http://localhost:3000/api/tasks`, {
  method: "GET", 
  headers: { Cookie: "user=" + result } 
});
```

That’s how I’m loading data for this project, on the server. I have a separate project running a set of Express endpoints querying a simple SQLite database. You can fetch your data however you need from within these server functions, be it via an ORM like Drizzle, an external service endpoint like I have here, or you could connect right to a database and query what you need. But that latter option should probably be discouraged for production applications.

Now we can call our server function from our loader.

```js
loader: async ({ context }) => {
  const now = +new Date();
  console.log(`/tasks/index path loader. Loading tasks at + ${now - context.timestarted}ms since start`);
  const tasks = await getTasksList();
  return { tasks };
},
```

That’s all there is to it. It’s almost anti-climactic. The page loads, as it did in the last post. Except now it server renders. You can shut JavaScript off, and the page will still load and display (and hyperlinks will still work).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/tasks-page.png?resize=671%2C1024&ssl=1)

### Streaming

Let’s make the individual task loading purposefully slow (we’ll just keep the delay that was already in there), so we can see how to stream it in. Here’s our server function to load a single task.

```js
export const getTask = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data }) => {
    return fetch(`http://localhost:3000/api/tasks/${data}`, { method: "GET" })
      .then(resp => resp.json())
      .then(res => res as Task);
  });
```

Note the`validator`function, which is how we strongly type our server function (and validate the inputs). But otherwise it’s more of the same.

Now let’s call it in our loader, and see about enabling streaming

Here’s our loader:

```js
loader: async ({ params, context }) => {
  const { taskId } = params;

  const now = +new Date();
  console.log(`/tasks/${taskId} path loader. Loading at + ${now - context.timestarted}ms since start`);
  const task = getTask({ data: taskId });

  return { task };
},
```

Did you catch it? We called`getTask`**without**awaiting it. That means `task` is a promise, which Start and Router allow us to return from our loader (you could name it`taskPromise` if you like that specificity in naming).

But how do we*consume*this promise, show loading state, and`await`the real value? There are two ways. TanStack Router defines an[<FontIcon icon="fas fa-globe"/>`Await`component](https://tanstack.com/router/latest/docs/framework/react/api/router/awaitComponent#await-component) for this. But if you’re using React 19, you can use the new`use`psuedo-hook.

```jsx :collapsed-lines title="TaskView.jsx"
import { use } from "react";

function TaskView() {
  const { task: taskPromise } = Route.useLoaderData();
  const { isFetching } = Route.useMatch();

  const task = use(taskPromise);

  return (
    <div>
      <Link to="/app/tasks">Back to tasks list</Link>
      <div className="flex flex-col gap-2">
        <div>
          Task {task.id} {isFetching ? "Loading ..." : null}
        </div>
        <h1>{task.title}</h1>
        <Link 
          params={{ taskId: task.id }}
          to="/app/tasks/$taskId/edit"
        >
          Edit
        </Link>
        <div />
      </div>
    </div>
  );
}
```

The `use` hookwill cause the component to suspend, and show the nearest`Suspense`boundary in the tree. Fortunately, the`pendingComponent`you set up in Router also doubles as a Suspense boundary. TanStack is impressively well integrated with modern React features.

Now when we load an individual task’s page, we’ll first see the overview data which loaded quickly, and server rendered, above the Suspense boundary for the task data we’re streaming

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/streaming-tasks.png?resize=692%2C662&ssl=1)

When the task comes in, the promise will resolve, the server will push the data down, and our`use`call will provide data for our component.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/12/streaming-tasks-finish.png?resize=754%2C764&ssl=1)

---

## React Query

As before, let’s integrate react-query. And, as before, there’s not much to do. Since we added the<FontIcon icon="fa-brands fa-npm"/>`@tanstack/react-router-with-query`package when we got started, our`queryClient`will be available on the server, and will sync up with the `queryClient` on the client, and put data (or in-flight streamed promises) into cache.

Let’s start with our main epics page. Our loader looked like this before:

```js
async loader({ context, deps }) {
  const queryClient = context.queryClient;

  queryClient.ensureQueryData(
    epicsQueryOptions(context.timestarted, deps.page)
  );
  queryClient.ensureQueryData(
    epicsCountQueryOptions(context.timestarted)
  );
}
```

That would kick off the requests on the server, but let the page render, and then suspend in the component that called`useSuspenseQuery`—what we’ve been calling streaming.

Let’s change it to actually load our data in our loader, and server render the page instead. The change couldn’t be simpler.

```js
async loader({ context, deps }) {
  const queryClient = context.queryClient;

  await Promise.allSettled([
    queryClient.ensureQueryData(
      epicsQueryOptions(context.timestarted, deps.page)
    ),
    queryClient.ensureQueryData(
      epicsCountQueryOptions(context.timestarted)
    ),
  ]);
},
```

Note we’re awaiting a `Promise.allSettled` call here so the queries can run together. Make sure you don’t sequentially`await`each individual call, as that would create a waterfall, or use `Promise.all`, as that will quit immediately if any of the promises error out.

### Streaming with react-query

As I implied above, to stream data with react-query, do the exact same thing, but*don’t*`await`the promise. Let’s do that on the page for viewing an individual epic.

```js
loader: ({ context, params }) => {
  const { queryClient, timestarted } = context;

  queryClient.ensureQueryData(
    epicQueryOptions(timestarted, params.epicId)
  );
},
```

Now if this page is loaded initially, the query for this data will start on the server and stream to the client. If the data are pending, our suspense boundary will show, triggered automatically by react-query’s`useSuspenseBoundary`hook.

If the user browses to this page from a different page, the loader will instead run on the client, but still fetch those same data from the same server function, and trigger the same suspense boundary.

---

## Parting Thoughts

I hope this post was useful to you. It wasn’t a deep dive into [<FontIcon icon="fas fa-globe"/>TanStack Start](https://tanstack.com/start/latest) — the docs are a better venue for that. Instead, I hope I was able to showwhyserver rendering can offer almost any web app a performance boost, and why TanStack Start is a superb tool for doing so. Not only does it simplify a great deal of things by running loaders isomorphically, but it even integrates wonderfully with react-query.

The react-query integration is especially exciting to me. It delivers component-level data fetching while still allowing for server fetching, and streaming—all without sacrificing one bit of convenience.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Introducing TanStack Start",
  "desc": "TanStack Start enhances the TanStack Router by adding a server layer that improves performance through server-side rendering (SSR) and isomorphic loaders.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-tanstack-start.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
