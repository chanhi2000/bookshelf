---
lang: en-US
title: "Introducing TanStack Router"
description: "Article(s) > Introducing TanStack Router"
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
      content: "Article(s) > Introducing TanStack Router"
    - property: og:description
      content: "Introducing TanStack Router"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-tanstack-router.html
prev: /programming/js-react/articles/README.md
date: 2024-09-13
isOriginal: false
author: Adam Rackis
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3821
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
  name="Introducing TanStack Router"
  desc="TanStack Router is a comprehensive JavaScript framework for client-side applications, emphasizing type-safe routing and navigation. It includes nested layouts and efficient data loading."
  url="https://frontendmasters.com/blog/introducing-tanstack-router/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3821"/>

[<FontIcon icon="fas fa-globe"/>TanStack Router](https://tanstack.com/router/latest) is an incredibly exciting project. It’s essentially a fully-featured *client-side* JavaScript application framework. It provides a mature routing and navigation system with nested layouts and efficient data loading capabilities at every point in the route tree. Best of all, it does all of this in a *type-safe* manner.

What’s especially exciting is that, as of this writing, there’s a [<FontIcon icon="fas fa-globe"/>TanStack Start](https://tanstack.com/start/latest) in the works, which will add server-side capabilities to Router, enabling you to build full-stack web applications. Start promises to do this with a server layer applied directly on top of the same TanStack Router we’ll be covering here. That makes this a perfect time to get to know Router if you haven’t already.

TanStack Router is more than just a router — it’s a full-fledged client-side application framework. So to prevent this post from getting too long, we won’t even try to cover it all. We’ll limit ourselves to routing and navigation, which is a larger topic than you might think, especially considering the type-safe nature of Router.

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

---

## Getting started

There are [<FontIcon icon="fas fa-globe"/>official TanStack Router docs](https://tanstack.com/router/latest/docs/framework/react/overview) and [a <FontIcon icon="fas fa-globe"/>quickstart guide](https://tanstack.com/router/v1/docs/framework/react/quick-start), which has a nice tool for scaffolding a fresh Router project. You can also clone [the repo used for this post (<FontIcon icon="iconfont icon-github"/>`arackaf/tanstack-router-routing-demo`)](https://github.com/arackaf/tanstack-router-routing-demo) and follow along.

<SiteInfo
  name="arackaf/tanstack-router-routing-demo"
  desc=""
  url="https://github.com/arackaf/tanstack-router-routing-demo/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/ce2149889468b8f6a3cff3fac8c363afd02d6813bae210f428ce1580778fa795/arackaf/tanstack-router-routing-demo"/>

---

## The Plan

In order to see what Router can do and how it works, we’ll pretend to build a task management system, like Jira. Like the real Jira, we won’t make any effort at making things look nice or be pleasant to use. Our goal is to see what Router can do, not build a useful web application.

We’ll cover: routing, layouts, paths, search parameters, and of course static typing all along the way.

Let’s start at the very top.

---

## The Root Route

This is our root layout, which Router calls <FontIcon icon="fa-brands fa-react"/>`__root.tsx`. If you’re following along on your own project, this will go directly under the <FontIcon icon="fas fa-folder-open"/>`routes` folder.

```tsx :collapsed-lines title="routes/__root.tsx"
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <div>
          <Link to="/">
            Home
          </Link>
          <Link to="/tasks">
            Tasks
          </Link>
          <Link to="/epics">
            Epics
          </Link>
        </div>
        <hr />
        <div>
          <Outlet />
        </div>
      </>
    );
  },
});
```

The `createRootRoute` function does what it says. The `<Link />` component is also fairly self-explanatory (it makes links). Router is kind enough to add an `active` class to Links which are currently active, which makes it easy to style them accordingly (as well as adds an appropriate `aria-current="page"` attribute/value). Lastly, the `<Outlet />` component is interesting: this is how we tell Router where to render the “content” for this layout.

---

## Running the App

We run our app with `npm run dev.` Check your terminal for the port on `localhost` where it’s running.

More importantly, the `dev` watch process monitors the routes we’ll be adding, and maintains a `routeTree.gen.ts` file. This syncs metadata about our routes in order to help build static types, which will help us work with our routes safely. Speaking of, if you’re building this from scratch [from our demo repo (<FontIcon icon="iconfont icon-github"/>`arackaf/tanstack-router-routing-demo`)](https://github.com/arackaf/tanstack-router-routing-demo), you might have noticed some TypeScript errors on our Link tags, since those URLs don’t yet exist. That’s right: **TanStack Router deeply integrates TypeScript into the route level, and will even validate that your Link tags are pointing somewhere valid.**

To be clear, this is not because of any editor plugins. The TypeScript integration itself is producing errors, as it would in your CI/CD system.

```plaintext title="log"
src/routes/\\\_\\\_root.tsx:8:17 - error TS2322: Type '"/"' is not assignable to type '"." | ".." | undefined'.
```

```html
<Link to="/" className="[&.active]:font-bold">
```

---

## Building the App

Let’s get started by adding our root page. In Router, we use the file <FontIcon icon="fa-brands fa-redact"/>`index.tsx` to represent the root `/` path, wherever we are in the route tree (which we’ll explain shortly). We’ll create <FontIcon icon="fa-brands fa-redact"/>`index.tsx`, and, assuming you have the `dev` task running, it should scaffold some code for you that looks like this:

```tsx title="index.tsx"
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => <div>Hello /!</div>,
});
```

There’s a bit more boilerplate than you might be used to with metaframeworks like Next or SvelteKit. In those frameworks, you just `export default` a React component, or plop down a normal Svelte component and everything *just works*. In TanStack Router we have have to call a function called `createFileRoute`, and pass in the route to where we are.

The route is necessary for the type safety Router has, but don’t worry, **you don’t have to manage this yourself.** The dev process not only scaffolds code like this for new files, it also keeps those path values in sync for you. Try it — change that path to something else, and save the file; it should change it right back, for you. Or create a folder called `junk` and drag it there: it should change the path to `"/junk/"`.

Let’s add the following content (after moving it back out of the junk folder).

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <h3>Top level index page</h3>
    </div>
  );
}
```

Simple and humble — just a component telling us we’re in the top level index page.

---

## Routes

Let’s start to create some actual routes. Our root layout indicated we want to have paths for dealing with tasks and epics. Router (by default) uses file-based routing, but provides you two ways to do so, which can be mixed and matched (we’ll look at both). You can stack your files into folders which match the path you’re browsing. Or you can use “flat routes” and indicate these route hierarchies in individual filenames, separating the paths with dots. If you’re thinking only the former is useful, stay tuned.

Just for fun, let’s start with the flat routes. Let’s create a <FontIcon icon="fa-brands fa-react"/>`tasks.index.tsx` file. This is the same as creating an <FontIcon icon="fa-brands fa-react"/>`index.tsx` inside of an hypothetical `tasks` folder. For content we’ll add some basic markup (we’re trying to see how Router works, not build an actual todo app).

```tsx title="tasks.index.tsx"
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/")({
  component: Index,
});

function Index() {
  const tasks = [
    { id: "1", title: "Task 1" },
    { id: "2", title: "Task 2" },
    { id: "3", title: "Task 3" },
  ];

  return (
    <div>
      <h3>Tasks page!</h3>
      <div>
        {tasks.map((t, idx) => (
          <div key={idx}>
            <div>{t.title}</div>
            <Link to="/tasks/$taskId" params={{ taskId: t.id }}>
              View
            </Link>
            <Link to="/tasks/$taskId/edit" params={{ taskId: t.id }}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
```

Before we continue, let’s add a layout file for all of our tasks routes, housing some common content that will be present on all pages routed to under `/tasks`. If we had a <FontIcon icon="fas fa-folder-open"/>`tasks` folder, we’d just throw a <FontIcon icon="fa-brands fa-react"/>`route.tsx` file in there. Instead, we’ll add a <FontIcon icon="fa-brands fa-react"/>`tasks.route.tsx` file. Since we’re using flat files, here, we can also just name it <FontIcon icon="fa-brands fa-react"/>`tasks.tsx`. But I like keeping things consistent with directory-based files (which we’ll see in a bit), so I prefer <FontIcon icon="fa-brands fa-react"/>`tasks.route.tsx`.

```tsx title="tasks.route.tsx"
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks")({
  component: () => (
    <div>
      Tasks layout <Outlet />
    </div>
  ),
});
```

As always, don’t forget the `<Outlet />` or else the actual content of that path will not render.

To repeat, <FontIcon icon="fa-brands fa-react"/>`xyz.route.tsx` is a component that renders for the entire route, all the way down. It’s essentially a layout, but Router calls them routes. And <FontIcon icon="fa-brands fa-react"/>`xyz.index.tsx` is the file for the individual path at `xyz`.

This renders. There’s not much to look at, but take a quick look before we make one interesting change.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/tasks-page.jpg?resize=398%2C470&ssl=1)

Notice the navigation links from the root layout at the very top. Below that, we see `Tasks layout`, from the tasks route file (essentially a layout). Below that, we have the content for our tasks page.

---

## Path Parameters

The `<Link>` tags in the tasks index file give away where we’re headed, but let’s build paths to view, and edit tasks. We’ll create `/tasks/123` and `/tasks/123/edit` paths, where of course `123` represents whatever the `taskId` is.

TanStack Router represents variables inside of a path as path parameters, and they’re represented as path segments that start with a dollar sign. So with that we’ll add <FontIcon icon="fa-brands fa-react"/>`tasks.$taskId.index.tsx` and <FontIcon icon="fa-brands fa-react"/>`tasks.$taskId.edit.tsx`. The former will route to `/tasks/123` and the latter will route to `/tasks/123/edit`. Let’s take a look at <FontIcon icon="fa-brands fa-react"/>`tasks.$taskId.index.tsx` and find out how we actually get the path parameter that’s passed in.

```tsx
simport { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/tasks/$taskId/")({
  component: () => {
    const { taskId } = Route.useParams();

    return (
      <div>
        <div>
          <Link to="/tasks">Back</Link>
        </div>
        <div>View task {taskId}</div>
      </div>
    );
  },
});
```

The `Route.useParams()` object that exists on our Route object returns our parameters. But this isn’t interesting on its own; every routing framework has something like this. What’s particularly compelling is that this one is statically typed. Router is smart enough to know which parameters exist for that route (including parameters from higher up in the route, which we’ll see in a moment). That means that not only do we get auto complete…

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/path-param-auto-complete.jpg?resize=1024%2C567&ssl=1)

…but if you put an invalid path param in there, you’ll get a TypeScript error.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/parath-param-typed.jpg?resize=1024%2C372&ssl=1)

We also saw this with the Link tags we used to navigate to these routes.

```tsx
<Link to="/tasks/$taskId" params={{ taskId: t.id }}>
```

if we’d left off the params here (or specified anything other than `taskId`), we would have gotten an error.

---

## Advanced Routing

Let’s start to lean on Router’s advanced routing rules (a little) and see some of the nice features it supports. I’ll stress, these are advanced features you won’t commonly use, but it’s nice to know they’re there.

The edit task route is essentially identical, except the path is different, and I put the text to say “Edit” instead of “View.” But let’s use this route to explore a TanStack Router feature we haven’t seen.

Conceptually we have two hierarchies: we have the URL path, and we have the component tree. So far, these things have lined up 1:1. The URL path:

```plaintext
/tasks/123/edit
```

Rendered:

```plaintext
root route -> tasks route layout -> edit task path
```

The URL hierarchy and the component hierarchy lined up perfectly. But they don’t have to.

Just for fun, to see how, let’s see how we can remove the main tasks layout file from the edit task route. So we want the `/tasks/123/edit` URL to render the same thing, but **without** the <FontIcon icon="fa-brands fa-firefox"/>`tasks.route.tsx` route file being rendered. To do this, we just rename <FontIcon icon="fa-brands fa-firefox"/>`tasks.$taskId.edit.tsx` to <FontIcon icon="fa-brands fa-firefox"/>`tasks_.$taskId.edit.tsx`.

Note that `tasks` became `tasks_`. We do need `tasks` in there, where it is, so Router will know how to eventually find the <FontIcon icon="fa-brands fa-firefox"/>`edit.tsx` file we’re rendering, *based on the URL*. But by naming it `tasks_`, we remove that *component* from the rendered component tree, even though `tasks` is still in the URL. Now when we render the edit task route, we get this:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/edit-task-without-tasks-layout.jpg?resize=722%2C390&ssl=1)

Notice how `Tasks layout` is gone.

What if you wanted to do the opposite? What if you have a *component* hierarchy you want, that is, you **want** some layout to render in the edit task page, but you **don’t** want that layout to affect the URL. Well, just put the underscore on the opposite side. So we have <FontIcon icon="fa-brands fa-firefox"/>`tasks_.$taskId.edit.tsx` which renders the task edit page, but without putting the tasks layout route into the *component hierarchy*. Let’s say we have a special layout we *want* to use only for task editing. Let’s create a <FontIcon icon="fa-brands fa-firefox"/>`_taskEdit.tsx`.

```tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_taskEdit")({
  component: () => (
    <div>
      Special Task Edit Layout <Outlet />
    </div>
  ),
});
```

Then we change our task edit file to this <FontIcon icon="fa-brands fa-react"/>`_taskEdit.tasks_.$taskId.edit.tsx`. And now when we browse to `/tasks/1/edit` we see the task edit page with our custom layout (which did not affect our URL).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/pathless-layout.jpg?resize=694%2C432&ssl=1)

Again, this is an advanced feature. Most of the time you’ll use simple, boring, predictable routing rules. But it’s nice to know these advanced features exist.

---

## Directory-Based Routing

Instead of putting file hierarchies into file names with dots, you can also put them in directories. I *usually* prefer directories, but you can mix and match, and sometimes a judicious use of flat file names for things like pairs of `$pathParam.index.tsx` and `$pathParam.edit.tsx` feel natural inside of a directory. All the normal rules apply, so choose what feels best *to you*.

We won’t walk through everything for directories again. We’ll just take a peak at the finished product (which is also [on GitHub](https://github.com/arackaf/tanstack-router-routing-demo)). We have an `epics` path, which lists out, well, epics. For each, we can edit or view the epic. When viewing, we also show a (static) list of milestones in the epic, which we can also view or edit. Like before, for fun, when we edit a milestone, we’ll remove the milestones route layout.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/directory-routing.jpg?resize=454%2C444&ssl=1)

So rather than <FontIcon icon="fa-brands fa-react"/>`epics.index.tsx` and <FontIcon icon="fa-brands fa-react"/>`epics.route.tsx` we have <FontIcon icon="fas fa-folder-open"/>`epics/`<FontIcon icon="fa-brands fa-react"/>`index.tsx` and <FontIcon icon="fas fa-folder-open"/>`epics/`<FontIcon icon="fa-brands fa-react"/>`route.tsx`. And so on. Again, they’re the same rules: replace the dots in the files names with slashes (and directories).

Before moving on, let’s briefly pause and look at the <FontIcon icon="fa-brands fa-react"/>`$milestoneId.index.tsx` route. There’s a `$milestoneId` in the path, so we can find that path param. But look up, higher in the route tree. There’s also an `$epicId` param two layers higher. It should come as no surprise that Router is smart enough to realize this, and set the typings up such that both are present.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/multiple-path-params.jpg?resize=1024%2C534&ssl=1)

---

## Type-Safe Querystrings

The cherry on the top of this post will be, in my opinion, one of the most obnoxious aspects of web development: dealing with search params (sometimes called querystrings). Basically the stuff that comes after the `?` in a URL: `/tasks?search=foo&status=open`. The underlying platform primitive `URLSearchParams` can be tedious to work with, and frameworks don’t usually do much better, often providing you an un-typed bag of properties, and offering minimal help in constructing a new URL with new, updated querystring values.

TanStack Router provides a convenient, fully-featured mechanism for managing search params, **which are also type-safe**. Let’s dive in. We’ll take a high-level look, but the full docs [<FontIcon icon="fas fa-globe"/>are here](https://tanstack.com/router/latest/docs/framework/react/guide/search-params).

We’ll add search param support for the `/epics/$epicId/milestones` route. We’ll allow various values in the search params that would allow the user to search milestones under a given epic. We’ve seen the `createFileRoute` function countless times. Typically we just pass a `component` to it.

```tsx
export const Route = createFileRoute("/epics/$epicId/milestones/")({
  component: ({}) => {
    // ...
```

There’s lots of other functions it supports. For search params we want `validateSearch`. This is our opportunity to tell Router *which* search params this route supports, and how to validate what’s currently in the URL. After all, the user is free to type whatever they want into a URL, regardless of the TypeScript typings you set up. It’s your job to take potentially invalid values, and project them to something valid.

First, let’s define a type for our search params.

```ts
type SearchParams = {
  page: number;
  search: string;
  tags: string[];
};
```

Now let’s implement our `validateSearch` method. This receives a `Record<string, unknown>` representing whatever the user has in the URL, and from that, we return something matching our type. Let’s take a look.

```tsx
export const Route = createFileRoute("/epics/$epicId/milestones/")({
  validateSearch(search: Record<string, unknown>): SearchParams {
    return {
      page: Number(search.page ?? "1") ?? 1,
      search: (search.search as string) || "",
      tags: Array.isArray(search.tags) ? search.tags : [],
    };
  },
  component: ({}) => {
```

Note that (unlike `URLSearchParams`) we are not limited to just string values. We can put objects or arrays in there, and TanStack will do the work of serializing and de-serializing it for us. Not only that, but you can even specify [<FontIcon icon="fas fa-globe"/>custom serialization mechanisms](https://tanstack.com/router/latest/docs/framework/react/guide/custom-search-param-serialization).

Moreover, for a production application, you’ll likely want to use a more serious validation mechanism, like [<FontIcon icon="fas fa-globe"/>Zod](https://zod.dev/). In fact, Router has a number of adapters you can use out of the box, including Zod. Check out the [<FontIcon icon="fas fa-globe"/>docs on Search Params](https://tanstack.com/router/latest/docs/framework/react/guide/search-params#zod-adapter) here.

Let’s manually browse to this path, without any search params, and see what happens. When we browse to

```plaintext
http://localhost:5173/epics/1/milestones
```

Router replaces (does not redirect) us to:

```plaintext
http://localhost:5173/epics/1/milestones?page=1&search=&tags=%5B%5D
```

TanStack ran our validation function, and then replaced our URL with the correct, valid search params. If you don’t like how it forces the URL to be “ugly” like that, stay tuned; there are workarounds. But first let’s work with what we have.

We’ve been using the `Route.useParams` method multiple times. There’s also a `Route.useSearch` that does the same thing, for search params. But let’s do something a little different. We’ve previously been putting everything in the same route file, so we could just directly reference the Route object from the same lexical scope. Let’s build a separate component to read, and update these search params.

I’ve added a <FontIcon icon="fa-brands fa-react"/>`MilestoneSearch.tsx` component. You might think you could just import the `Route` object from the route file. But that’s dangerous. You’re likely to create a circular dependency, which might or might not work, depending on your bundler. Even if it “works” you might have some hidden issues lurking.

Fortunately Router gives you a direct API to handle this, `getRouteApi`, which is exported from `@tanstack/react-router`. We pass it a (statically typed) route, and it gives us back the correct route object.

```tsx
const route = getRouteApi("/epics/$epicId/milestones/");
```

Now we can call `useSearch` on that route object and get our statically typed result.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/get-search-params.jpg?resize=1024%2C528&ssl=1)

We won’t belabor the form elements and click handlers to sync and gather new values for these search parameters. Let’s just assume we have some new values, and see how we set them. For this, we can use the `useNavigate` hook.

```tsx
const navigate = useNavigate({ 
  from: "/epics/$epicId/milestones/"
});
```

We call it and tell it where we’re navigating *from*. Now we use the result and tell it where we want to *go* (the same place we are), and are given a `search` function from which we return the new search params. Naturally, TypeScript will yell at us if we leave anything off. As a convenience, Router will pass this search function the current values, making it easy to just add / override something. So to page up, we can do

```tsx
navigate({
  to: ".",
  search: prev => {
    return { ...prev, page: prev.page + 1 };
  },
});
```

Naturally, there’s also a `params` prop to this function, if you’re browsing to a route with path parameters that you have to specify (or else TypeScript will yell at you, like always). We don’t need an `$epicId` path param here, since there’s already one on the route, and since we’re going to the same place we already are (as indicated by the `from` value in `useNavigate`, and the `to: "."` value in navigate function) Router knows to just keep what’s there, there.

If we want to set a search value and tags, we could do:

```tsx
const newSearch = "Hello World";
const tags = ["tag 1", "tag 2"];

navigate({
  to: ".",
  search: prev => {
    return { page: 1, search: newSearch, tags };
  },
});
```

Which will make our URL look like this:

```
/epics/1/milestones?page=1&search=Hello%20World&tags=%5B"tag%201"%2C"tag%202"%5D
```

Again, the search, and the array of strings were serialized for us.

If we want to *link to* a page with search params, we specify those search params on the Link tag

```tsx
<Link 
  to="/epics/$epicId/milestones" 
  params={{ epicId }} 
  search={{ search: "", page: 1, tags: [] }}>
  View milestones
</Link>
```

And as always, TypeScript will yell at us if we leave anything off. Strong typing is a good thing.

### Making Our URL Prettier

As we saw, currently, browsing to:

```
http://localhost:5173/epics/1/milestones
```

Will replace the URL with this:

```
http://localhost:5173/epics/1/milestones?page=1&search=&tags=%5B%5D
```

It will have all those query params since we specifically told Router that our page will always have a page, search, and tags value. If you care about having a minimal and clean URL, and want that transformation to *not* happen, you have some options. We can make all of these values optional. In JavaScript (and TypeScript) a value does not exist if it holds the value `undefined`. So we could change our type to this:

```ts
type SearchParams = {
  page: number | undefined;
  search: string | undefined;
  tags: string[] | undefined;
};
```

Or this which is the same thing:

```ts
ype SearchParams = Partial<{
  page: number;
  search: string;
  tags: string[];
}>;
```

Then do the extra work to put undefined values in place of default values:

```ts
validateSearch(search: Record<string, unknown>): SearchParams {
  const page = Number(search.page ?? "1") ?? 1;
  const searchVal = (search.search as string) || "";
  const tags = Array.isArray(search.tags) ? search.tags : [];

  return {
    page: page === 1 ? undefined : page,
    search: searchVal || undefined,
    tags: tags.length ? tags : undefined,
  };
},
```

This will complicate places where you *use* these values, since now they might be undefined. Our nice simple pageUp call now looks like this

```ts
navigate({
  to: ".",
  search: prev => {
    return { ...prev, page: (prev.page || 1) + 1 };
  },
});
```

On the plus side, our URL will now omit search params with default values, and for that matter, our `<Link>` tags to this page now don’t have to specify *any* search values, since they’re all optional.

### Another Option

Router actually provides you another way to do this. Currently `validateSearch` accepts just an untyped `Record<string, unknown>` since the URL can contain anything. The “true” type of our search params is what we *return* from this function. Tweaking the *return type* is how we’ve been changing things.

But Router allows you to opt into another mode, where you can specify *both* a structure of incoming search params, with optional values, *as well as* the return type, which represents the validated, finalized type for the search params that will be **used** by your application code. Let’s see how.

First let’s specify two types for these search params

```ts
type SearchParams = {
  page: number;
  search: string;
  tags: string[];
};

type SearchParamsInput = Partial<{
  page: number;
  search: string;
  tags: string[];
}>;
```

Now let’s pull in `SearchSchemaInput`:

```ts
import { SearchSchemaInput } from "@tanstack/react-router";
```

`SearchSchemaInput` is how we signal to Router that we want to specify different search params for what we’ll *receive* compared to what we’ll *produce*. We do it by intersecting our desired input type with this type, like this:

```ts
validateSearch(search: SearchParamsInput & SearchSchemaInput): SearchParams {
```

Now we perform the same original validation we had before, to produce real values, and that’s that. We can now browse to our page with a `<Link>` tag, and specify no search params at all, and it’ll accept it and not modify the URL, while still producing the same strongly-typed search param values as before.

That said, when we *update* our URL, we can’t just “splat” all previous values, plus the value we’re setting, since those params will now have values, and therefore get updated into the URL. The GitHub repo has a branch called [<FontIcon icon="fas fa-code-branch"/>`feature/optional-search-params-v2` (<FontIcon icon="iconfont icon-github"/>`arackaf/tanstack-router-routing-demo`)](https://github.com/arackaf/tanstack-router-routing-demo/tree/feature/optional-search-params-v2) showing this second approach.

Experiment and choose what works best for you and your use case.

---

## Wrapping up

TanStack Router is an incredibly exciting project. It’s a superbly-made, flexible client-side framework that promises fantastic server-side integration in the near future.

We’ve barely scratched the surface. We just covered the absolute basics of type-safe navigation, layouts, path params, and search params, but know there is much more to know, particularly around data loading and the upcoming server integration.

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
  "title": "Introducing TanStack Router",
  "desc": "TanStack Router is a comprehensive JavaScript framework for client-side applications, emphasizing type-safe routing and navigation. It includes nested layouts and efficient data loading.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/introducing-tanstack-router.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
