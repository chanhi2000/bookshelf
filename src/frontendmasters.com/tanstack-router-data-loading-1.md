---
lang: en-US
title: "Loading Data with TanStack Router: Getting Going"
description: "Article(s) > Loading Data with TanStack Router: Getting Going"
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
      content: "Article(s) > Loading Data with TanStack Router: Getting Going"
    - property: og:description
      content: "Loading Data with TanStack Router: Getting Going"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/tanstack-router-data-loading-1.html
prev: /programming/js-react/articles/README.md
date: 2024-11-20
isOriginal: false
author:
  - name: Adam Rackis
    url : https://frontendmasters.com/blog/author/adamrackis/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4465
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
  name="Loading Data with TanStack Router: Getting Going"
  desc="TanStack Router is one of the most exciting projects in the web development ecosystem right now, and it doesn’t get nearly enough attention. It’s a fully fledged client-side application framework that supports advanced routing, nested layouts, and hooks for loading data. Best of all, it does all of this with deep type safety. This post […]"
  url="https://frontendmasters.com/blog/tanstack-router-data-loading-1/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4465"/>

[<FontIcon icon="fas fa-globe"/>TanStack Router](https://tanstack.com/router/latest) is one of the most exciting projects in the web development ecosystem right now, and it doesn’t get nearly enough attention. It’s a fully fledged client-side application framework that supports advanced routing, nested layouts, and hooks for loading data. Best of all, it does all of this with deep type safety.

::: info Article Series

```component VPCard
{
  "title": "Introducing TanStack Router",
  "desc": "TanStack Router is a comprehensive JavaScript framework for client-side applications, emphasizing type-safe routing and navigation. It includes nested layouts and efficient data loading.",
  "link": "/frontendmasters.com/introducing-tanstack-router.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Loading Data with TanStack Router: Getting Going",
  "desc": "TanStack Router is one of the most exciting projects in the web development ecosystem right now, and it doesn’t get nearly enough attention. It’s a fully fledged client-side application framework that supports advanced routing, nested layouts, and hooks for loading data. Best of all, it does all of this with deep type safety. This post […]",
  "link": "/frontendmasters.com/tanstack-router-data-loading-1.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Loading Data with TanStack Router: react-query",
  "desc": "TanStack Query, or react-query, simplifies client-side data fetching with features like caching, automatic re-fetching, and error handling. It integrates smoothly with TanStack Router, allowing efficient prefetching and loading states using hooks like useSuspenseQuery. ",
  "link": "/frontendmasters.com/tanstack-router-data-loading-2.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

This post is all about **data loading**. We’ll cover the built-in hooks TanStack Router ships with to load and invalidate data. Then we’ll cover how easily [<FontIcon icon="fas fa-globe"/>TanStack Query](https://tanstack.com/query/latest) (also known as react-query) integrates and see what the tradeoffs of each are.

The code for everything we’re covering is [in this GitHub repo (<FontIcon icon="iconfont icon-github"/>`arackaf/tanstack-router-loader-demo`)](https://github.com/arackaf/tanstack-router-loader-demo). As before, I’m building an extremely austere, imaginary Jira knockoff. There’s nothing useful in that repo beyond the bare minimum needed for us to take a close look at how data loading works. If you’re building your own thing, be sure to check out the [<FontIcon icon="fas fa-globe"/>DevTools](https://tanstack.com/router/latest/docs/framework/react/devtools) for TanStack Router. They’re outstanding.

The app does load actual data via SQLite, along with some forced delays, so we can more clearly see (and fix) network waterfalls. If you want to run the project, clone it, run `npm i`, and then open **two** terminals. In the first, run `npm run server`, which will create the SQLite database, seed it with data, and set up the API endpoints to fetch, and update data. In the second, run `npm run dev` to start the main project, which will be on `http://localhost:5173/`. There are some (extremely basic) features to edit data. If at any point you want to reset the data, just reset the server task in your terminal.

The app is contrived. It exists to show Router’s capabilities. We’ll often have odd use cases, and frankly questionable design decisions. This was purposeful, in order to simulate real-world data loading scenarios, without needing a real-world application.

---

## But what about SSR?

Router is essentially a client-side framework. There are hooks to get SSR working, but they’re very much DIY. If this disappoints you, I’d urge just a bit of patience. [<FontIcon icon="fas fa-globe"/>TanStack Start](https://tanstack.com/start/latest) (now in Beta) is a new project that, for all intents and purposes, adds SSR capabilities to the very same TanStack Router we’ll be talking about. What makes me especially excited about TanStack Start is that it adds these server-side capabilities in a very non-intrusive way, which does not change or invalidate anything we’ll be talking about in this post (or talked about in my last post on Router, linked above). If that’s not entirely clear and you’d like to learn more, stay tuned for my future post on TanStack Start.

---

## The plan

TanStack Router is an entire application framework. You could teach an entire course on it, and indeed there’s no shortage of YouTube videos out there. This blog will turn into a book if we try to cover each and every option in depth.

In this post we’ll cover the most relevant features and show code snippets where helpful. Refer to the [<FontIcon icon="fas fa-globe"/>docs](https://tanstack.com/router/latest/docs/framework/react/overview) for details. Also check out the [repo for this post (<FontIcon icon="iconfont icon-github"/>`arackaf/tanstack-router-loader-demo`)](https://github.com/arackaf/tanstack-router-loader-demo) as all the examples we use in this post are fleshed out in their entirety there.

Don’t let the extremely wide range of features scare you. The **vast** majority of the time, some basic loaders will get you exactly what you need. We’ll cover some of the advanced features, too, so you know they’re there, if you ever do need them.

---

## Starting at the top: context

When we create our router, we can give it “context.” This is global state. For our project, we’ll pass in our `queryClient` for react-query (which we’ll be using a little later). Passing the context in looks like this:

```tsx{8} title="main.tsx"
import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();
// Import the generated route tree 
import { routeTree } from "./routeTree.gen";
const router = createRouter({
  routeTree,
  context: { queryClient }
});
```

Then we’ll make sure Router integrates what we put on context into the static types. We do this by creating our root route like this:

```tsx title="routes/__root.tsx"
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});
```

This context will be available to all routes in the tree, and inside API hooks like `loader`, which we’ll get to shortly.

### Adding to context

Context can change. We set up truly global context when we start Router up at our application’s root, but different locations in the route tree can add new things to context, which will be visible from there, downward in the tree. There’s two places for this, the `beforeLoad` function, and the `context` function. Yes: route’s can take a context *function* which modifies the route tree’s context *value*.

#### beforeLoad

The `beforeLoad` method runs *always*, on each active route, anytime the URL changes in any way. This is a good place to check preconditions and redirect. If you return a value from here, that value will be merged into the router’s context, and visible from that route downward. This function **blocks** all loaders from running, so be **extremely careful** what you do in here. Data loading should generally be avoided unless absolutely needed, since any loaders will wait until this function is complete, potentially creating waterfalls.

Here’s a good example of what to avoid, with an opportunity to see why. This `beforeLoad` fetches the current user, places it into context, and does a redirect if there is no user.

```tsx title="routes/index.tsx"
export const Route = createFileRoute("/")({
  async beforeLoad() {
    const user = await getCurrentUser();
    if (!user) {
      throw redirect({
        to: "/login",
      });
    }
    document.cookie = `user=${user.id};path=/;max-age=31536000`;

    return { user };
  },

  // ...
})
```

We’ll be looking at some data loading in a bit, and measure what starts when. You can go into the `getCurrentUser` function and uncomment the artificial delay in there, and see it block *everything*. This is especially obvious if you’re running Router’s DevTools. You’ll see this path block, and only once ready, allow all loaders below to execute.

But this is a good enough example to show how this works. The `user` object is now in context, visible to routes beneath it.

::: tip

A more realistic example would be to check for a logged-in cookie, optimistically assume the user is logged in, and rely on network calls we do in the loaders to detect a logged-out user, and redirect accordingly. To make things even more realistic, those loaders for the initial render would run on the server, and figure out if a user is actually logged out before we show the user *anything*; but that will wait for a future post on TanStack Start.  
  
What we have is sufficient to show how the `beforeLoad` callback works.

:::

#### Context (function)

There’s also a context `function` we can provide routes. This is a non-async function that also gives us an opportunity to add to context. But it runs much more conservatively. This function only runs when the URL changes in a way that’s relevant to *that route*. So for a route of, say, `app/epics/$epicId`, the context function will re-run when the epicId param changes. This might seem strange, but it’s useful for modifying the context, but only when the route has changed, especially when you need to put non-primitive values (objects and functions) onto context. These non-primitive values are always compared by reference, and therefore always unique against the last value generated. As a result, they would cause render churning if added in `beforeLoad`, since React would (incorrectly) think it needed to re-render a route when nothing had changed.

For now, here’s some code in our root route to mark the time for when the initial render happens, so we can compare that to the timestamp of when various queries run in our tree. This will help us see, and fix network waterfalls.

```tsx title="routes/__root.tsx"
export const Route = createRootRouteWithContext<MyRouterContext>()({
  context({ location }) {
    const timeStarted = +new Date();
    console.log("");
    console.log("Fresh navigation to", location.href);
    console.log("-------------------");

    return { timestarted: timeStarted };
  },

  // ...
})
```

This code is in our root route, so it will never re-run, since there’s no path parameters the root route depends on.

Now everywhere in our route tree will have a `timestarted` value that we can use to detect any delays from data fetches in our tree.

---

## Loaders

Let’s actually load some data. Router provides a `loader` function for this. Any of our route configurations can accept a loader function, which we can use to load data. Loaders all run in parallel. It would be bad if a layout needed to complete loading its data before the path beneath it started. Loaders receive any path params on the route’s URL, any search params (querystring values) the route has subscribed to, the context, and a few other goodies, and loads whatever data it needs. Router will detect what you return, and allow components to retrieve that data via the `useLoaderData` hook — strongly typed.

### Loader in a route

Let’s take a look at tasks.route.tsx.

This is a route that will run for any URL at all starting with `/app/tasks`. It will run for that path, for `/app/tasks/$taskId`, for `app/tasks/$taskId/edit`, and so on.

```jsx
export const Route = createFileRoute("/app/tasks")({
  component: TasksLayout,
  loader: async ({ context }) => {
    const now = +new Date();
    console.log(`/tasks route loader. Loading task layout info at + ${now - context.timestarted}ms since start`);

    const tasksOverview = await fetchJson<TaskOverview[]>("api/tasks/overview");
    return { tasksOverview };
  },
  gcTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 2,
});
```

We receive the context, and grab the `timestarted` value from it. We request some overview data on our tasks, and send that data down.

The `gcTime` property controls how long old route data are kept in cache. So if we browse from tasks over to epics, and then come back in 5 minutes and 1 second, nothing will be there, and the page will load in fresh. `staleTime` controls how long a cached entry is considered “fresh.” This determines whether cached data are refetched in the background. Here it’s set to two minutes. This means if the user hits this page, then goes to the epics page, waits 3 minutes, then browses back to tasks, the cached data will show, while the tasks data is re-fetched in the background, and (if changed) update the UI.

You’re probably wondering if TanStack Router tells you this background re-fetch is happening, so you can show an inline spinner, and yes, you can detect this like so:

```js
const { isFetching } = Route.useMatch();
```

### Loader in a page

Now let’s take a look at the tasks page.

```tsx
export const Route = createFileRoute("/app/tasks/")({
  component: Index,
  loader: async ({ context }) => {
    const now = +new Date();
    console.log(`/tasks/index path loader. Loading tasks at + ${now - context.timestarted}ms since start`);

    const tasks = await fetchJson<Task[]>("api/tasks");
    return { tasks };
  },
  gcTime: 1000 * 60 * 5,
  staleTime: 1000 * 60 * 2,
  pendingComponent: () => <div>Loading tasks list...</div>,
  pendingMs: 150,
  pendingMinMs: 200,
});`
```

This is the route for the specific URL `/app/tasks`. If the user were to browse to `/app/tasks/$taskId` then this component would not run. This is a specific page, not a layout (which Router calls a “route”). Basically the same as before, except now we’re loading the list of tasks to display on this page.

We’ve added some new properties this time, though. The `pendingComponent` property allows us to render some content while the loader is working. We also specified `pendingMs`, which controls how long we *wait* before showing the pending component. Lastly, `pendingMinMs` allows us to force the pending component to stay on the screen for a specified amount of time, even if the data are ready. This can be useful to avoid a brief flash of a loading component, which can be jarring to the user.

If you’re wondering why we’d even want to use `pendingMs` to delay a loading screen, it’s for subsequent navigations. Rather than *immediately* transition from the current page to a new page’s loading component, this setting lets us stay on the current page for a moment, in the hopes that the new page will be ready quickly enough that we don’t have to show any pending component at all. Of course, on the initial load, when the web app first starts up, these pendingComponents do show immediately, as you’d expect.

![Let’s run our tasks page.<br/>It’s ugly, and frankly useless, but it works. Now let’s take a closer look.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/img-0-tasks-page.jpg?resize=690%2C1024&ssl=1)

### Loaders running in parallel

![If we peak in our console, we should see something like this:](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/img-1-loaders-parallel.jpg?resize=1024%2C188&ssl=1)

![If you have DevTools open, you should see something like below. Note how the route and page load and finish in parallel.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/2024-11-17-12.46.15-1.gif?ssl=1)

As we can see, these requests started a mere millisecond apart from each other, since the loaders are running in parallel (since this isn’t the real Jira, I had to manually add a delay of 750ms to each of the API endpoints).

#### Different routes using the same data

If we look at the loader for the `app/tasks/$taskId` route, and the loader to the `app/tasks/$taskId/edit` route, we see the same fetch call:

```tsx
const task = await fetchJson<Task>(`api/tasks/${taskId}`);`
```

This is because we need to load the actual task in order to display it, or in order to display it in a form for the user to make changes. Unfortunately though, if you click the edit button for any task, then go back to the tasks list (without saving anything), then click the edit button for the same task, you should notice the same exact data being requested. This makes sense. Both loaders happen to make the same `fetch()` call, but there’s nothing in our client to cache the call. This is probably fine 99% of the time, but this is one of the many things react-query will improve for us, in a bit.

---

## Updating data

If you click the edit button for any task, you should be brought to a page with an extremely basic form that will let you edit the task’s name. Once we click save, we want to navigate back to the tasks list, but most importantly, we need to tell Router that we’ve changed some data, and that it will need to invalidate some cached entries, and re-fetch when we go back to those routes.

This is where Router’s built-in capabilities start to get stretched, and where we might start to want react-query (discussed in part 2 of this post). Router will absolutely let you invalidate routes, to force re-fetches. But the API is fairly simple, and fine-grained. We basically have to describe each route we want invalidated (or removed). Let’s take a look:

```tsx
import { useRouter } from "@tanstack/react-router";

// ...

const router = useRouter();
const save = async () => {
  await postToApi("api/task/update", {
    id: task.id,
    title: newTitleEl.current!.value,
  });

  router.invalidate({
    filter: route => {
      return (
        route.routeId == "/app/tasks/" ||
        (route.routeId === "/app/tasks/$taskId/" && route.params.taskId === taskId) ||
        (route.routeId === "/app/tasks_/$taskId/edit" && route.params.taskId === taskId)
      );
    },
  });

  navigate({ to: "/app/tasks" });
};
```

Note the call to `router.invalidate`. This tells Router to mark any cached entries matching that filter as stale, causing us to re-fetch them the next time we browse to those paths. We could also pass absolutely nothing to that same `invalidate` method, which would tell Router to invalidate *everything*.

Here we invalidated the main tasks list, as well as the view and edit pages, for the individual task we just modified.

Now when we navigate back to the main tasks page we’ll immediately see the prior, now-stale data, but new data will fetch, and update the UI when present. Recall that we can use `const { isFetching } = Route.useMatch();` to show an inline spinner while this fetch is happening.

If you’d prefer to completely remove the cache entries, and have the task page’s “Loading” component show, then you can use `router.clearCache` instead, with the same exact filter argument. That will *remove* those cache entries completely, forcing Router to completely re-fetch them, and show the pending component. This is because there is no longer any stale data left in the cache; `clearCache` removed it.

There is one small caveat though: Router will prevent you from clearing the cache for the page you’re on. That means we can’t clear the cache for the edit task page, since we’re sitting on it already. To be clear, when we call clearCache, the filter function won’t even look at the route you’re on; the ability to remove it simply does not exist.

Instead, you could do something like this:

```ts
router.clearCache({
  filter: route => {
    return route.routeId == "/app/tasks/" || (route.routeId === "/app/tasks_/$taskId/edit" && route.params.taskId === taskId);
  },
});

router.invalidate({
  filter: route => {
    return route.routeId === "/app/tasks_/$taskId/edit" && route.params.taskId === taskId;
  },
});
```

But really, at this point you should probably be looking to use react-query, which we’ll cover in the next post.

::: info Article Series

```component VPCard
{
  "title": "Introducing TanStack Router",
  "desc": "TanStack Router is a comprehensive JavaScript framework for client-side applications, emphasizing type-safe routing and navigation. It includes nested layouts and efficient data loading.",
  "link": "/frontendmasters.com/introducing-tanstack-router.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Loading Data with TanStack Router: Getting Going",
  "desc": "TanStack Router is one of the most exciting projects in the web development ecosystem right now, and it doesn’t get nearly enough attention. It’s a fully fledged client-side application framework that supports advanced routing, nested layouts, and hooks for loading data. Best of all, it does all of this with deep type safety. This post […]",
  "link": "/frontendmasters.com/tanstack-router-data-loading-1.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Loading Data with TanStack Router: react-query",
  "desc": "TanStack Query, or react-query, simplifies client-side data fetching with features like caching, automatic re-fetching, and error handling. It integrates smoothly with TanStack Router, allowing efficient prefetching and loading states using hooks like useSuspenseQuery. ",
  "link": "/frontendmasters.com/tanstack-router-data-loading-2.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Loading Data with TanStack Router: Getting Going",
  "desc": "TanStack Router is one of the most exciting projects in the web development ecosystem right now, and it doesn’t get nearly enough attention. It’s a fully fledged client-side application framework that supports advanced routing, nested layouts, and hooks for loading data. Best of all, it does all of this with deep type safety. This post […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/tanstack-router-data-loading-1.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
