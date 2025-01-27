---
lang: en-US
title: "Loading Data with TanStack Router: react-query"
description: "Article(s) > Loading Data with TanStack Router: react-query"
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
      content: "Article(s) > Loading Data with TanStack Router: react-query"
    - property: og:description
      content: "Loading Data with TanStack Router: react-query"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/tanstack-router-data-loading-2.html
prev: /programming/js-react/articles/README.md
date: 2024-11-21
isOriginal: false
author:
  - name: Adam Rackis
    url : https://frontendmasters.com/blog/author/adamrackis/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4492
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
  name="Loading Data with TanStack Router: react-query"
  desc="TanStack Query, or react-query, simplifies client-side data fetching with features like caching, automatic re-fetching, and error handling. It integrates smoothly with TanStack Router, allowing efficient prefetching and loading states using hooks like useSuspenseQuery. "
  url="https://frontendmasters.com/blog/tanstack-router-data-loading-2/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4492"/>

[<FontIcon icon="fas fa-globe"/>TanStack Query](https://tanstack.com/query/latest), commonly referred to as react-query, is an incredibly popular tool for managing client-side querying. You could create an entire course on react-query, and people have, but here we’re going to keep it brief so you can quickly get going.

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

2. [Loading Data with TanStack Router: Getting Going](https://frontendmasters.com/blog/tanstack-router-data-loading-1/)

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

Essentially, react-query allows us to write code like this:

```jsx
const { data, isLoading } = useQuery({
  queryKey: ["task", taskId],
  queryFn: async () => {
    return fetchJson("/api/tasks/" + taskId);
  },
  staleTime: 1000 * 60 * 2,
  gcTime: 1000 * 60 * 5,
});
```

The `queryKey` does what it sounds like: it lets you identify any particular key for a query. As the key changes, react-query is smart enough to re-run the query, which is contained in the `queryFn` property. As these queries come in, TanStack tracks them in a client-side cache, along with properties like `staleTime` and `gcTime`, which mean the same thing as they do in TanStack Router. These tools are built by the same people, after all.

There’s also a `useSuspenseQuery` hook which is the same idea, except instead of giving you an isLoading value, it relies on Suspense, and lets you handle loading state via Suspense boundaries.

This barely scratches the surface of Query. If you’ve never used it before, be sure to check out [<FontIcon icon="fas fa-globe"/>the docs](https://tanstack.com/query/latest).

We’ll move on and cover the setup and integration with Router, but we’ll stay high level to keep this post a manageable length.

---

## Setup

We need to wrap our entire app with a `QueryClientProvider` which injects a queryClient (and cache) into our application tree. Putting it around the `RouterProvider` we already have is as good a place as any.

```jsx
const queryClient = new QueryClient();

const Main: FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{ queryClient }} />
      </QueryClientProvider>
      <TanStackRouterDevtools router={router} />
    </>
  );
};
```

Recall from before that we also passed our queryClient to our Router’s context like this:

```jsx
const router = createRouter({ 
  routeTree, 
  context: { queryClient }
});
```

And:

```tsx
type MyRouterContext = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});
```

This allows us access to the `queryClient` inside of our loader functions via the Router’s context. If you’re wondering why we need loaders at all, now that we’re using react-query, stay tuned.

---

## Querying

We used Router’s built-in caching capabilities for our tasks. For epics, let’s use react-query. Moreover, let’s use the `useSuspenseQuery` hook, since managing loading state via Suspense boundaries is extremely ergonomic. Moreover, Suspense boundaries is exactly how Router’s `pendingComponent` works. So you can use `useSuspenseQuery`, along with the same pendingComponent we looked at before!

Let’s add another (contrived) summary query in our epics layout (route) component.

```tsx :collapsed-lines
export const Route = createFileRoute("/app/epics")({
  component: EpicLayout,
  pendingComponent: () => <div>Loading epics route ...</div>,
});

function EpicLayout() {
  const context = Route.useRouteContext();
  const { data } = useSuspenseQuery(epicsSummaryQueryOptions(context.timestarted));

  return (
    <div>
      <h2>Epics overview</h2>
      <div>
        {data.epicsOverview.map(epic => (
          <Fragment key={epic.name}>
            <div>{epic.name}</div>
            <div>{epic.count}</div>
          </Fragment>
        ))}
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
}
```

To keep the code somewhat organized (and other reasons we’ll get to) I stuck the query options into a separate place.

```tsx
export const epicsSummaryQueryOptions = (timestarted: number) => ({
  queryKey: ["epics", "summary"],
  queryFn: async () => {
    const timeDifference = +new Date() - timestarted;
    console.log("Running api/epics/overview query at", timeDifference);
    const epicsOverview = await fetchJson<EpicOverview[]>("api/epics/overview");
    return { epicsOverview };
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
});
```

A query key, and function, and some cache settings. I’m passing in the timestarted value from context, so we can see when these queries fire. This will help us detect waterfalls.

Let’s look at the root epics page (with a few details removed for space).

```tsx :collapsed-lines
type SearchParams = {
  page: number;
};

export const Route = createFileRoute("/app/epics/")({
  validateSearch(search: Record<string, unknown>): SearchParams {
    return {
      page: parseInt(search.page as string, 10) || 1,
    };
  },
  loaderDeps: ({ search }) => {
    return { page: search.page };
  },
  component: Index,
  pendingComponent: () => <div>Loading epics ...</div>,
  pendingMinMs: 3000,
  pendingMs: 10,
});

function Index() {
  const context = Route.useRouteContext();
  const { page } = Route.useSearch();

  const { data: epicsData } = useSuspenseQuery(epicsQueryOptions(context.timestarted, page));
  const { data: epicsCount } = useSuspenseQuery(epicsCountQueryOptions(context.timestarted));

  return (
    <div className="p-3">
      <h3>Epics page!</h3>
      <h3>There are {epicsCount.count} epics</h3>
      <div>
        {epicsData.map((e, idx) => (
          <Fragment key={idx}>
            <div>{e.name}</div>
          </Fragment>
        ))}
        <div className="flex gap-3">
          <Link to="/app/epics" search={{ page: page - 1 }} disabled={page === 1}>
            Prev
          </Link>
          <Link to="/app/epics" search={{ page: page + 1 }} disabled={!epicsData.length}>
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
```

Two queries on this page: one to get the list of (paged) epics, another to get the total count of all the epics. Let’s run it

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/img-2-epics-rendered.jpg?resize=779%2C1024&ssl=1)

It’s as silly as before, but it does show the three pieces of data we’ve fetched: the overview data we fetched in the epics layout; and then the count of epics, and the list of epics we loaded in the epics page beneath that.

What’s more, when we run this, we first see the pending component for our root route. That resolves quickly, and shows the main navigation, along with the pending component for our epics route. That resolves, showing the epics overview data, and then revealing the pending component for our epics page, which eventually resolves and shows the list and count of our epics.

Our component-level data fetching is working, and integrating, via Suspense, with the same Router pending components we already had. Very cool!

Let’s take a peak at our console though, and look at all the various logging we’ve been doing, to track when these fetches happen

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/img-3-epics-waterfall.jpg?resize=554%2C248&ssl=1)

The results are… awful. Component-level data fetching with Suspense feels really good, but if you’re not careful, these waterfalls are extremely easy to create. The problem is, when a component suspends while waiting for data, it prevents its children from rendering. This is precisely what’s happening here. The route is suspending, and not even giving the child component, which includes the page (and any other nested route components underneath) from rendering, which prevents those components’ fetches from starting.

There’s two potential solutions here: we could dump Suspense, and use the `useQuery` hook, instead, which does not suspend. That would require us to manually track multiple `isLoading` states (for each useQuery hook), and coordinate loading UX to go with that. For the epics page, we’d need to track both the count loading state, and the epics list state, and not show our UI until both have returned. And so on, for every other page.

The other solution is to start pre-fetching these queries sooner.

We’ll go with option 2.

### Prefetching

Remember previously we saw that loader functions all run in parallel. This is the perfect opportunity to start these queries off ahead of time, before the components even render. TanStack Query gives us an API to do just that.

To prefetch with Query, we take the `queryClient` object we saw before, and call `queryClient.prefetchQuery` and pass in **the exact same query options** and Query will be smart enough, when the component loads and executes `useSuspenseQuery`, to see that the query is already in flight, and just latch onto that same request. That’s also a big reason why we put those query options into the `epicsSummaryQueryOptions` helper function: to make it easier to reuse in the loader, to prefetch.

Here’s the loader we’ll add to the epics route:

```jsx
loader({ context }) {
  const queryClient = context.queryClient;
  queryClient.prefetchQuery(epicsSummaryQueryOptions(context.timestarted));
},
```

The loader receives the route tree’s context, from which it grabs the `queryClient`. From there, we call `prefetchQuery` and pass in the same options.

Let’s move on to the Epics page. To review, this is the relevant code from our Epics page:

```tsx
function Index() {
  const context = Route.useRouteContext();
  const { page } = Route.useSearch();

  const { data: epicsData } = useSuspenseQuery(epicsQueryOptions(context.timestarted, page));
  const { data: epicsCount } = useSuspenseQuery(epicsCountQueryOptions(context.timestarted));
  
  // ..
}
```

We grab the current page from the URL, and the context, for the timestarted value. Now let’s do the same thing we just did, and repeat this code in the loader, to prefetch.

```tsx
async loader({ context, deps }) {
  const queryClient = context.queryClient;

  queryClient.prefetchQuery(epicsQueryOptions(context.timestarted, deps.page));
  queryClient.prefetchQuery(epicsCountQueryOptions(context.timestarted));
},
```

Now when we check the console, we see something a lot nicer.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/img-4-waterfall-solved.jpg?resize=548%2C254&ssl=1)

### Fetching state

What happens when we *page up*. The page value will change in the URL, Router will send a new page value down into our loader, and our component. Then, our `useSuspenseQuery` will execute with new query values, and suspend again. That means our existing list of tasks will disappear, and show the “loading tasks” pending component. That would be a terrible UX.

Fortunately, React offers us a nice solution, with the `useDeferredValue` hook. The docs are [<FontIcon icon="fa-brands fa-react"/>here](https://react.dev/reference/react/useDeferredValue). This allows us to “defer” a state change. If a state change causes our deferred value on the page to suspend, React will keep the existing UI in place, and the deferred value will simply hold the old value. Let’s see it in action.

```tsx :collapsed-lines
function Index() {
  const { page } = Route.useSearch();
  const context = Route.useRouteContext();

  const deferredPage = useDeferredValue(page);
  const loading = page !== deferredPage;

  const { data: epicsData } = useSuspenseQuery(
    epicsQueryOptions(context.timestarted, deferredPage)
  );
  const { data: epicsCount } = useSuspenseQuery(
    epicsCountQueryOptions(context.timestarted)
  );
 
  // ...
}
```

We wrap the changing page value in `useDeferredValue`, and just like that, our page does not suspend when the new query is in flight. And to detect that a new query is running, we compare the real, correct `page` value, with the `deferredPage` value. If they’re different, we know new data are loading, and we can display a loading spinner (or in this case, put an opacity overlay on the epics list)

### Queries are re-used!

When using react-query for data management, we can now re-use the same query across different routes. Both the view epic and edit epic pages need to fetch info on the epic the user is about to view, or edit. Now we can define those options in one place, like we had before.

```tsx
export const epicQueryOptions = (timestarted: number, id: string) => ({
  queryKey: ["epic", id],
  queryFn: async () => {
    const timeDifference = +new Date() - timestarted;

    console.log(`Loading api/epic/${id} data at`, timeDifference);
    const epic = await fetchJson<Epic>(`api/epics/${id}`);
    return epic;
  },
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 5,
});`
```

We can use them in both routes, and have them be cached in between (assuming we set the caching values to allow that). You can try it [in the demo app (<FontIcon icon="iconfont icon-github"/>`arackaf/tanstack-router-loader-demo`)](https://github.com/arackaf/tanstack-router-loader-demo): view an epic, go back to the list, then edit the same epic (or vice versa). Only the first of those pages you visit should cause the fetch to happen in your network tab.

### Updating with react-query

Just like with tasks, epics have a page where we can edit an individual epic. Let’s see what the saving logic looks like with react-query.

Let’s quickly review the query *keys* for the epics queries we’ve seen so far. For an individual epic, it was:

```tsx
export const epicQueryOptions = (timestarted: number, id: string) => ({
  queryKey: ["epic", id],
  // ...
})
```

For the epics list, it was this:

```tsx
export const epicsQueryOptions = (timestarted: number, page: number) => ({
  queryKey: ["epics", "list", page],
  // ...
})
```

And the count:

```tsx
export const epicsCountQueryOptions = (timestarted: number) => ({
  queryKey: ["epics", "count"],
  // ...
})
```

Finally, the epics overview:

```tsx
export const epicsSummaryQueryOptions = (timestarted: number) => ({
  queryKey: ["epics", "summary"],
  // ...
})
```

Notice the pattern: `epics` followed by various things for the queries that affected multiple epics, and for an individual epic, we did `['epic', ${epicId}]`. With that in mind, let’s see just how easy it is to invalidate these queries after a mutation:

```jsx{8-9}
const save = async () => {
  setSaving(true);
  await postToApi("api/epic/update", {
    id: epic.id,
    name: newName.current!.value,
  });

  queryClient.removeQueries({ queryKey: ["epics"] });
  queryClient.removeQueries({ queryKey: ["epic", epicId] });

  navigate({ to: "/app/epics", search: { page: 1 } });

  setSaving(false);
};
```

The magic is on the highlighted lines.

With one fell sweep, we remove **all** cached entries for **any** query that *started with* `epics`, or started with `['epic', ${epicId}]`, and Query will handle the rest. Now, when we navigate back to the epics page (or any page that used these queries), we’ll see the suspense boundary show, while fresh data are loaded. If you’d prefer to keep stale data on the screen, while the fresh data load, that’s fine too: just use `queryClient.invalidateQueries` instead. If you’d like to detect if a query is re-fetching in the background, so you can display an inline spinner, use the `isFetching` property returned from `useSuspenseQuery`.

```tsx
const { data: epicsData, isFetching } = useSuspenseQuery(
  epicsQueryOptions(context.timestarted, deferredPage)
);
```

### Odds and ends

We’ve gone pretty deep on TanStack Route and Query. Let’s take a look at one last trick.

If you recall, we saw that pending components ship a related `pendingMinMs` that forced a pending component to stay on the page a minimum amount of time, even if the data were ready. This was to avoid a jarring flash of a loading state. We also saw that TanStack Router uses Suspense to show those pending components, which means that react-query’s `useSuspenseQuery` will seamlessly integrate with it. Well, almost seamlessly. Router can only use the `pendingMinMs` value with the promise we return from the Router’s loader. But now we don’t really return any promise from the loader; we prefetch some stuff, and rely on component-level data fetching to do the real work.

Well there’s nothing stopping you from doing both! Right now our loader looks like this:

```jsx
async loader({ context, deps }) {
  const queryClient = context.queryClient;

  queryClient.prefetchQuery(epicsQueryOptions(context.timestarted, deps.page));
  queryClient.prefetchQuery(epicsCountQueryOptions(context.timestarted));
},
```

Query also ships with a `queryClient.ensureQueryData` method, which can load query data, and return a promise for that request. Let’s put it to good use so we can use `pendingMinMs` again.

One thing you do *not* want to do is this:

```jsx
await queryClient.ensureQueryData(epicsQueryOptions(context.timestarted, deps.page)),
await queryClient.ensureQueryData(epicsCountQueryOptions(context.timestarted)),
```

That will block on each request, serially. In other words, a waterfall. Instead, to kick off both requests immediately and wait on them in the loader (without a waterfall), you can do this:

```jsx
await Promise.allSettled([
  queryClient.ensureQueryData(epicsQueryOptions(context.timestarted, deps.page)),
  queryClient.ensureQueryData(epicsCountQueryOptions(context.timestarted)),
]);
```

Which works, and keeps the pending component on the screen for the duration of `pendingMinMs`

You won’t always, or even usually need to do this. But it’s handy for when you do.

---

## Wrapping up

This has been a whirlwind route of TanStack Router and TanStack Query, but hopefully not an overwhelming one. These tools are incredibly powerful, and offer the ability to do just about anything. I hope this post will help some people put them to good use!

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

2. [Loading Data with TanStack Router: Getting Going](https://frontendmasters.com/blog/tanstack-router-data-loading-1/)

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
  "title": "Loading Data with TanStack Router: react-query",
  "desc": "TanStack Query, or react-query, simplifies client-side data fetching with features like caching, automatic re-fetching, and error handling. It integrates smoothly with TanStack Router, allowing efficient prefetching and loading states using hooks like useSuspenseQuery. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/tanstack-router-data-loading-2.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
