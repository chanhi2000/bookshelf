---
lang: en-US
title: "React Server Components in TanStack"
description: "Article(s) > React Server Components in TanStack"
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
      content: "Article(s) > React Server Components in TanStack"
    - property: og:description
      content: "React Server Components in TanStack"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/react-server-components-in-tanstack.html
prev: /programming/js-react/articles/README.md
date: 2026-05-18
isOriginal: false
author:
  - name: Adam Rackis
    url: https://master.dev/blog/author/adamrackis/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/9689
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
  name="React Server Components in TanStack"
  desc="RSCs in TanStack Start are server-only executed code — perhaps a significant improvement over the Next.js implementation."
  url="https://master.dev/blog/react-server-components-in-tanstack/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/9689"/>

This post is about [<VPIcon icon="fa-brands fa-react"/>React Server Components](https://react.dev/reference/rsc/server-components) (or RSC) in [<VPIcon icon="fas fa-globe"/>TanStack Start](https://tanstack.com/start/latest). The implementation is radically different, and in my opinion, better than the RSC implementation you’ve likely seen in Next.js.

This post will not be a direct 1:1 comparison. Instead, I’ll introduce this feature from first principles, as it exists in TanStack.

---

## What are React Server Components

Server Components are normal React components with one key feature: they run on the server, *and only* on the server. This leads to a few key differences.

RSCs can be async and can request data directly from within the component. It can `await`, well, anything that yields data. That could be a fetch from a 3rd-party API, or a direct call to your database. Since RSCs only run on the server, you don’t have to worry about your browser hopelessly failing to establish a TCP connection to your Postgres box, nor do you have to worry about secrets like connection strings being exposed to end users.

The other key difference with RSC is hidden in plain sight, as we’ve already discussed: since these components only ever run on the server, their code will never be shipped to the client. RSCs simply send the final rendered markup, without the code that created it, to your client bundles.

Since RSCs only exist on the server, they cannot have any state or user-facing interactivity. They cannot use hooks like `useState`, or have event handlers like onClick. If you need to integrate interactive content like that with RSC, you can, and we’ll go over how. But the RSCs themselves are React components that exist to run on the Server, and generate static content that’s shipped to the client (possibly with client components intermixed).

---

## What RSC is Not

Don’t be mistaken: RSC is *not* a solution for loading data more conveniently. TanStack Start already ships extremely simple, streamlined data-loading options. You have nested, isomorphic loaders for every level in your routing hierarchy. These loaders run on the server for your initial render and then on the client thereafter. This enables the deep integration with [<VPIcon icon="fas fa-globe"/>react-query](https://tanstack.com/query/latest) TanStack Start offers, along with fine-grained data invalidation. I wrote all about this in a [**previous introduction to TanStack Start**](/master.dev/introducing-tanstack-start.md).

RSC is also not a way to server-render content. TanStack Start (and Next.js for that matter), *already* server renders your initial navigation, and always has. Your normal, old-school components always render on the server, and then re-render on the client, wiring up event handlers and effects in a process known as “hydration.” RSCs also render on the server, but they *only* render on the server.

---

## Where RSC Shines

By rendering only on the server, your client bundles avoid the cost of all the code required to render your content. That means component trees that are large and expensive, with minimal client-side interactivity, are a prime candidate.

The original [<VPIcon icon="fas fa-globe"/>blog post announcement](https://tanstack.com/blog/react-server-components) for TanStack’s RSCs discussed using them for content with code samples. By moving the code to parse, style, and format displayed code to the server, those libraries were removed from client-side bundles, saving non-trivial amounts of space.

In this post, we’ll simulate another good use case: content that’s mostly non-interactive, with many conditional imports and conditional rendering. Imagine an application shell, or layout, that can look lots of different ways depending on who’s viewing it: non-authenticated users, authenticated users, admin users, or even just authenticated users with varying permissions, which affect the content they’re shown.

To keep things simple, we’ll build a dirt-simple application layout, but use some trickery to bloat the component bundle, so we can see how much lighter it is when we switch to RSC. We’ll then see about adding interactivity.

---

## Getting Started

Check [<VPIcon icon="fas fa-globe"/>the docs](https://tanstack.com/start/v0/docs/framework/react/guide/server-components#setup) for instructions on configuring Vite for RSC.

The repo for what we’ll be building [is here (<VPIcon icon="iconfont icon-github"/>`arackaf/tanstack-start-rsc-blog-post`)](https://github.com/arackaf/tanstack-start-rsc-blog-post). It’s essentially an empty web application, with a skeleton layout that looks like this:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/05/img1.jpg?resize=1024%2C772&ssl=1)

If the icons in the side panel don’t make much sense, it’s because they’re randomly chosen in a way that guarantees the entirety of the [<VPIcon icon="fas fa-globe"/>lucide-react](https://lucide.dev/guide/react/) icon package cannot be tree shaken. This is how we’re simulating a large component tree that’s not needed on the client.

In the header, the avatar is clickable and opens a side panel, driven by the [<VPIcon icon="iconfont icon-shadcn"/>shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/radix/sidebar) component.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/05/img2.jpg?resize=1024%2C772&ssl=1)

---

## The Normal Way

Building out this UI with standard, non-RSC components is a familiar process for anyone who’s worked with TanStack.

We render our application shell from our root component, which handles the root layout. To simulate loading our logged-in user, we’ll add a loader to this same root layout.

```tsx
loader: async () => {
  const user = new Promise<{ name: string; avatar: string }>((res) => {
    setTimeout(() => {
      res({ name: "Adam Rackis", avatar: "https://d193qjyckdxivp.cloudfront.net/avatar.jpg" });
    }, 1000);
  });
  return { user };
},
```

We won’t mess with real data, just a (long) manual delay, and we send data back. Actually, we send our data *in* a *promise*. TanStack Start allows us to return promises from loaders, which get streamed to the UI once ready. This will be a nice opportunity for us to see Suspense-based streaming both with and without RSC.

And here’s our non-RSC application shell component

```tsx
type ApplicationShellProps = {
  user: Promise<{
    name: string;
    avatar: string;
  }>;
};

export const ApplicationShellNonRSC: FC<PropsWithChildren<ApplicationShellProps>> = props => {
  const { children, user } = props;

  return (
    <main className="h-screen">
      <header className="fixed top-0 left-0 right-0 h-12 z-10 bg-blue-200 flex items-center px-4 gap-4">
        <Suspense fallback={<span className="w-6 h-6 bg-gray-400 rounded-full"></span>}>
          <UserHeaderMenu user={user} />
        </Suspense>
        <span>Header</span>
      </header>
      <section className="fixed left-0 top-12 bottom-0 w-60 overflow-auto ">
        <SideBarContent />
      </section>
      <section className="max-w-[600px] pt-16 mx-auto h-full">
        <div className="flex flex-col gap-2 h-full">
          <section className="min-h-[200px]">{children}</section>
          <footer className="px-4 fixed bottom-0 left-0 right-0 h-12 z-10 bg-blue-200 flex gap-4 items-center"></footer>
        </div>
      </section>
    </main>
  );
};
```

Notice that we pass that same *promise* with our user data over to `UserHeaderMenu`, which itself is wrapped in a Suspense tag. Here’s that component.

```tsx
const UserHeaderMenu: FC<{ user: Promise<{ name: string; avatar: string }> }> = props => {
  const { user } = props;
  const { name, avatar } = use(user);

  return <SidePanelTrigger name={name} avatar={avatar} />;
};
```

We call `use` on the user info promise, a special pseudo-hook exported by React (version 19 and beyond). The `use` function causes our component to suspend and render the fallback from the `Suspense` tag.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/05/img3.jpg?resize=1024%2C361&ssl=1)

When the data are ready, the promise resolves, and our content shows our full UI.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/05/img4.jpg?resize=1024%2C352&ssl=1)

---

## The Non-RSC Payload

As I said above, I’ve used some trickery to force the entire Lucide React package to be bundled, simulating a deeply nested component hierarchy.

On a production build, a total of 308 KB of JavaScript is sent down.

---

## Rendering with RSC

Let’s start with the simplest possible RSC component, which takes no props. It won’t even take children, which itself is just a prop. Here’s a new version of our application shell.

```tsx
import { type FC } from "react";
import { SideBarContent } from "./SideBarContent";

type ApplicationShellProps = {};

export const ApplicationShellEmptyRSC: FC<ApplicationShellProps> = () => {
  return (
    <main className="h-screen">
      <header className="fixed top-0 left-0 right-0 h-12 z-10 bg-blue-200 flex items-center px-4 gap-4">
        <span>Header</span>
      </header>
      <section className="fixed left-0 top-12 bottom-0 w-60 overflow-auto ">
        <SideBarContent />
      </section>
      <section className="max-w-[600px] pt-16 mx-auto h-full">
        <div className="flex flex-col gap-2 h-full">
          <section className="min-h-[200px]"></section>
          <footer className="px-4 fixed bottom-0 left-0 right-0 h-12 z-10 bg-blue-200 flex gap-4 items-center"></footer>
        </div>
      </section>
    </main>
  );
};
```

To be clear, this component is useless. It does not display our header, nor does it display the actual, currently rendered page (via children). But it will let us see how to render an RSC that takes no props.

Let’s see how to render it as an RSC.

First, we’ll import it into our root layout (or any layout, or route, or component), as well as a new helper from TanStack

```tsx
import { ApplicationShellEmptyRSC } from "#/components/ApplicationShellEmptyRSC";
import { renderServerComponent } from "@tanstack/react-start/rsc";
```

Then we’ll create a `serverFn` to turn this component into an RSC stream.

```tsx
const getAppShell = createServerFn({
  method: "GET",
}).handler(async () => {
  return renderServerComponent(<ApplicationShellEmptyRSC />);
});
```

Now we just need to *call* our server function. We can do this anywhere. For our purposes, we’ll just call it in our loader and send the result down.

```tsx
loader: async () => {
    const appShell = await getAppShell();
    return { appShell };
  },
```

In our React component, we grab that payload and render it.

```tsx
function RootDocument({ children }: { children: React.ReactNode }) {
  const { appShell } = Route.useLoaderData();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {/* render the RSC */}
        {appShell}
      </body>
    </html>
  );
}
```

This works! Simple as that.

The thing I like most about TanStack Start’s RSC implementation is that it’s very explicit. You have a clear API for declaring what you want to be rendered as an RSC.

---

## Rendering Interactive Content

We could end this blog post pretty abruptly and simply render our `SidePanelTrigger` component directly from our RSC. That would work fine, so long as we do one thing: place the `"use client"` pragma at the top of the file that contains this component. That would work, and we would be done. 

But instead, let’s do it a slightly harder way, so we can explore another feature of RSC: passing props. Instead of rendering `SidePanelTrigger` from the RSC, we’ll **pass** this component to the RSC *as a prop* and render it from there. While overkill for this use case, it’ll show off some of the amazing flexibility RSC offers, enabling a single Server Component to render different content via different props passed to the RSC.

---

## Passing Props to our RSC

Let’s finish this up. We need some new helpers.

```tsx
import { createCompositeComponent, CompositeComponent } from "@tanstack/react-start/rsc";
```

### Props in RSC

It’s important to remember that, by the time our Server Function runs and we return the shell component, our component has *already rendered*.

```tsx
return renderServerComponent(<ApplicationShellEmptyRSC />);
```

It’s done. It rendered *on the server* and the thing we’re holding, returned from our server function and `renderServerComponent` (or `createCompositeComponent`) is, conceptually, the final markup for the RSC.

We’ll be putting it in our component tree, but again, and this cannot be overstated, the RSC itself has *already rendered*.

That means, if you think you can just pass some data into the RSC, and use that data to adjust the content that’s rendered, you fundamentally do not understand how RSCs work: again, by the time you attempt to display it in your component tree, the RSC component has *already rendered* on the server, and produced markup. This makes any attempt to pass props from the client to the RSC to influence said markup a non-sequitur

### So how can we pass props?

What RSCs do allow is to pass in `children` content, or other *components* as props. The RSC recognizes these props and renders “holes” or “slots” (in a generic sense) for them to be dumped into.

Let’s take a look.

### Adding Props to our RSC

Here’s our new server function.

```tsx
const getAppShell = createServerFn({
  method: "GET",
}).handler(async () => {
  return createCompositeComponent(
    (
      props: PropsWithChildren<{
        HeaderContent: FC<{ name: string; avatar: string }>;
      }>,
    ) => <ApplicationShell children={props.children} HeaderContent={props.HeaderContent} />,
  );
});
```

We’re using `createCompositeComponent` which allows us to declare props. We’re using the `PropsWithChildren` generic helper, which implicitly declares a children prop of type `ReactNode`, and we’re adding a `HeaderContent` prop, which is a component.

One neat thing about TanStack’s RSC implementation is that props passed like this are *automatically* client components; you don’t have to add `"use client"` to the file, although it’s fine if you do. Note that this applies to components you *pass* to props. Content you *render* as `children` can include RSC content if you’d like. You’d render other RSC content exactly like we did above, with `{appShell}`.

As before, we load our RSC in our loader.

```tsx
loader: async () => {
  const appShell = await getAppShell();
  return { appShell };
},
```

Then grab it in our component.

```tsx
const { appShell } = Route.useLoaderData();
```

And now we can render this with the `CompositeComponent` helper. We render `CompositeComponent` like a component, and pass the RSC result as the `src` prop, as well as any other props we may have.

```tsx
<CompositeComponent src={appShell} HeaderContent={SidePanelTrigger}>
  {children}
</CompositeComponent>
```

### Loading Data in RSC

Now let’s look at our actual RSC.

```tsx
import { Suspense, type FC, type PropsWithChildren } from "react";
import { SideBarContent } from "./SideBarContent";

type ApplicationShellProps = {
  HeaderContent: FC<{ name: string; avatar: string }>;
};

export const ApplicationShell: FC<PropsWithChildren<ApplicationShellProps>> = props => {
  const { children, HeaderContent } = props;

  return (
    <main>
      <header>
        <Suspense fallback={<span></span>}>
          <UserHeaderMenu HeaderContent={HeaderContent} />
        </Suspense>
        <span>Header</span>
      </header>
      <section>
        <SideBarContent />
      </section>
      <section>
        <div>
          <section>{children}</section>
          <footer></footer>
        </div>
      </section>
    </main>
  );
};
```

Notice this piece.

```tsx
<Suspense fallback={<span></span>}>
  <UserHeaderMenu HeaderContent={HeaderContent} />
</Suspense>
```

We’re rendering another component, `UserHeaderMenu` within a `Suspense` tag, and passing through the HeaderContent prop, which again is a React client component that takes in a name and an avatar prop. Let’s see it next

```tsx
async function UserHeaderMenu(props: { HeaderContent: FC<{ name: string; avatar: string }> }) {
  const { HeaderContent } = props;

  await new Promise(resolve => setTimeout(resolve, 1000));
  const avatar = "https://d193qjyckdxivp.cloudfront.net/avatar.jpg";
  const name = "Adam Rackis";

  return <HeaderContent name={name} avatar={avatar} />;
}
```

Since we’re in an RSC, we don’t have to use the `use` pseudo-hook. We can just `await` our data however we want, and while those data are pending, the Suspense boundary’s fallback will render without blocking the rest of the content, as before. Then, a second later, our data will be ready, and our avatar will show.

This works and produces the same experience we saw originally, with the client-rendered version, except now as an RSC.

---

## The Total Savings with RSC

What are the savings? The non-RSC version pushed 308KB of JavaScript into the client. The RSC version reduces it to 203KB (both measurements are from production builds).

---

## When to use RSC

Please don’t think this is a panacea, or even something you should use in every project. The larger and more expensive the component tree, the larger your potential savings. But if your component tree isn’t doing much, isn’t pulling in heavy dependencies (which don’t need state or interactivity), doesn’t have a wide import graph with things that are conditionally rendered, then there’s a good chance RSC will offer you minimal benefit.

This is a tool like any other, and like any other tool, you need to know when to reach for it, and when not to.

---

## Concluding Thoughts

TanStack’s implementation of RSC is what I wanted all along, without ever knowing it. Data fetching in TanStack is already simple; RSC exists to provide a more performant rendering idiom where things don’t exist on the client when they don’t need to, or when existing on the client would be expensive.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React Server Components in TanStack",
  "desc": "RSCs in TanStack Start are server-only executed code — perhaps a significant improvement over the Next.js implementation.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/react-server-components-in-tanstack.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
