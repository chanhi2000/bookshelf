---
lang: en-US
title: "Advanced page transitions with Next.js and Framer Motion"
description: "Article(s) > Advanced page transitions with Next.js and Framer Motion"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Advanced page transitions with Next.js and Framer Motion"
    - property: og:description
      content: "Advanced page transitions with Next.js and Framer Motion"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/advanced-page-transitions-next-js-framer-motion.html
prev: /programming/js-next/articles/README.md
date: 2023-12-28
isOriginal: false
author:
  - name: Francois Brill
    url : https://blog.logrocket.com/author/francoisbrill/
cover: /assets/image/blog.logrocket.com/advanced-page-transitions-next-js-framer-motion/banner.png
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
  name="Advanced page transitions with Next.js and Framer Motion"
  desc="Here's a look at how to use Next.js and Famer Motion to apply subtle, elegant page transitions that add personality and style to your site."
  url="https://blog.logrocket.com/advanced-page-transitions-next-js-framer-motion"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/advanced-page-transitions-next-js-framer-motion/banner.png"/>

::: note Editor’s note

This article was updated by [<VPIcon icon="fas fa-globe"/>Paul Akinyemi](https://blog.logrocket.com/author/paulakinyemi/) on 28 December 2023 to add relevant information about the Next.js App Router, the new mode for `AnimatePresence`, and dealing with scroll issues.

:::

![Advanced Page Transitions With Next Js And Framer Motion](/assets/image/blog.logrocket.com/advanced-page-transitions-next-js-framer-motion/banner.png)

Users have come to expect more interactivity on the web to grab their attention and entice them to engage. A key way to capture attention is by using movement and page transitions. This may sound like PowerPoint slides with clipart-style transitions, but I can assure you that’s not what I’m referring to!

In this article, we’ll see how to use Next.js and Framer Motion to apply subtle, elegant page transitions that add personality and style to your site.

---

## Using page transitions to indicate a loading state

Page transitions are just one of several tools in a frontend developer’s toolbox. When used appropriately, page transitions can increase user engagement and even hold a user’s attention while pages or content load.

Webpage content generally loads quickly, but if you’re fetching data from a server, a page transition with just the right level of motion applied could help keep the user engaged.

One option is to add a quick loading bar, which provides feedback to the user regarding the page load progress. This feedback informs them to stay put and not navigate away when content takes an extra couple of seconds to load.

Anything faster than 200ms is perceived by the brain to be instant. Meanwhile, slower page load times — even a delay of just three seconds — have been shown to [<VPIcon icon="fas fa-globe"/>negatively impact UX](https://blog.logrocket.com/ux-design/finding-fixing-rage-clicks/#why-do-users-rage-click). However, it’s really hard to get a page to load that fast.

Adding a page transition that lasts between half a second to two seconds buys you time to load data and get things ready. Then, when the next page is revealed to the user, you can just deliver the requested content.

---

## Determining when to use page transitions

To provide the best website UX, you’ll need to consider things from the user’s perspective. Think about the context of the user’s needs when visiting your website and use this information to evaluate what level of page transitions are acceptable.

The loading bar mentioned previously could be used on nearly any type of website to indicate that the next page is loading. Your loading bar could look like anything from a full-page experience to a slim component that’s only visible at the top of the webpage.

However, when users visit an information-rich website to consume content, they don’t want to be slowed down by too many page transitions. This is especially true of sites where users browse several pages.

So, don’t get too excited and add page transitions to your corporate website! More flamboyant page transitions should be reserved for websites with a more creative purpose since their site visitors likely expect more entertainment.

### I’ve added some page transitions, am I done?

In general, animations are most successful when they are subtle, feel natural, and mesh well with the entire overall user experience. Simply adding page transitions without considering the overall on-page experience would probably feel out of place.

For example, you might want to add some movement to elements as users enter the page. You can also include interactive hover effects and other strategic page transitions to keep the user engaged throughout their visit to your website.

---

## Building page transitions with Next.js and Framer Motion

Page transitions can be built in just about any frontend framework or library, such as React. In this demonstration, we’ll use Next.js to provide the cue for when pages transition to trigger the animation. We’ll also use [<VPIcon icon="fas fa-globe"/>Framer Motion](https://framer.com/motion/) to perform the actual page transitions.

Framer Motion has dubbed itself “[**the production-ready motion library for React**](/blog.logrocket.com/react-scroll-animations-framer-motion.md),” and it’s a real treat to use. What I like most about this library is its declarative way of achieving animations. You can simply declare what you want the start and end to look like, and Framer Motion fills in the gaps.

Creating animations from scratch is really difficult. For example, using CSS or almost any other language to animate something in React becomes very tricky. React immediately unmounts the element that is exiting the DOM and, because the element is dropped, you can’t animate it on the way “out”.

A page transition wouldn’t feel right if there was an abrupt jump when the page changed. This is part of the magic that Framer Motion automatically takes care of for us, although there is a trick to implementing it that I’ll cover below.

OK, let’s jump in and put this all to use!

---

## Page transitions demo using Next.js, Framer Motion, and Tailwind CSS

To demonstrate creating page transitions, we’ll build a Next.js site with Framer Motion. We’ll style the site with my preferred method: Tailwind CSS.

Here’s what we’ll end up with:

![Web View Of Final Page Transitions Project Preview Using Next Js With Framer Motion To Animate Transition From Page To Page](/assets/image/blog.logrocket.com/advanced-page-transitions-next-js-framer-motion/Final-Next-js-Framer-Motion-page-transitions-project-demo.gif)

Each photo page is a new dynamic page in Next.js. You can see the Framer Motion page transitions at work as we navigate between the list and detail pages.

If you’d like, you can also grab the [source code for the above example (<VPIcon icon="iconfont icon-github"/>`fbrill/react-page-transitions`)](https://github.com/fbrill/react-page-transitions) to browse and follow along.

### Setting the scene

To set up our Next.js and Framer Motion page transitions demo, we need to understand the internal workings of Next.js. Your setup will look slightly different depending on whether you’re using [**the Pages Router or the App Router**](/blog.logrocket.com/next-js-13-app-router.md).

#### Using the Pages Router

When using the Pages Router, you should first know there is an `_app.js` file that is persisted — in other words, doesn’t rerender — between page loads.

Second, we need to use the Next.js `<Link>` component to link to pages. With this, Next.js performs a shallow render and essentially mounts the new page component while it unmounts the previous component.

This gives us an SPA-like feel and the ability to change between pages without having to reload the page. We need this functionality to achieve page transitions in Next.js.

As mentioned previously, the most difficult part of trying to animate React components that leave the DOM is that React doesn’t provide a method that notifies components when they’re about to be unmounted or allows them to delay the unmounting. Instead, the components simply disappear from the DOM, making them nearly impossible to animate.

Framer Motion solves this with an `<AnimatePresence>` component that does some magic to make it possible to declare an `exit` state that can be animated

#### Using the App Router

In the new App Router, there’s no longer an `_app.js` file. Its job is instead done by `layout.js` and `template.js` files.

The `template.js` files wrap the page components and re-render on navigation. The `layout.js` files wrap the `template.js` files and page components in that order, and they preserve state and do not rerender on navigation.

As of Next.js 14, using [`AnimatePresence` for page transitions doesn’t work (<VPIcon icon="iconfont icon-github"/>`vercel/next.js`)](https://github.com/vercel/next.js/issues/49279) because of the way Next.js renders pages. There’s a [fragile workaround (<VPIcon icon="iconfont icon-github"/>`vercel/next.js`)](https://github.com/vercel/next.js/issues/49279#issuecomment-1674914893), but it relies on unexposed Next.js internal methods to freeze the routing state and can break at any time.

That said, let’s look at how you can implement page transitions in Next.js, starting with the Pages Router. Later in this tutorial, we’ll explore how to [implement page transitions with the App Router.](#implementing-page-transitions-app-router)

### Starting a new Next.js site

To showcase how we can achieve animated page transitions, let’s create a quick [<VPIcon icon="iconfont icon-tailwindcss"/>Next.js site with the Tailwind CSS starter](https://tailwindcss.com/docs/guides/nextjs) to handle our styling.

Next, we’ll need to install Framer Motion, like so:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add framer-motion
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm i framer-motion
```

:::

### Adding `AnimatePresence`

Now, we’ll work on setting up the page transitions using Framer Motion. First, we add `AnimatePresence` to <VPIcon icon="fa-brands fa-js"/>`_app.js`:

```js title="_app.js"
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Component {...pageProps} key={router.asPath} />
    </AnimatePresence>
  );
}
```

Next, we need to wrap our `<Component>` with `<AnimatePresence>`.

Here are two additional, but optional, settings that I enabled for this demo:

- `mode="wait"`: This just tells Framer Motion to complete any exit animations (exiting page) before starting a new animation (new page) on the new component
- `initial`: Setting this to `false` means it’s not going to play the animation on the first page load, which just feels better

Depending on the effect you’re going for, you can also choose to enable `mode="popLayout"` instead of `wait`. When you do this, the exiting page will be removed from the app’s layout, like if `position: absolute;` was applied to it. Then, it will perform its exit animation while the entering page performs its entering animation.

Note that if you’re using `mode="popLayout"` and the direct child of `AnimatePresence` is a custom component, you have to wrap it with React’s `forwardRef` function. This will forward a ref provided by `AnimatePresence` to the component you want to pop out of the layout. Here’s how that might look:

```jsx
import { AnimatePresence, motion } from 'framer-motion';
import React, { forwardRef } from 'react';

const MyComponent = forwardRef((props, ref) => (
  <motion.div ref={ref} {...props} />
));

<AnimatePresence mode="popLayout">
  <MyComponent key="someKey" />
</AnimatePresence>
```

One key point here is to make sure your animated elements are direct children of `AnimatePresence` so that it can take over and animate any exit events before removing the element from the React tree.

Because we’re declaring `AnimatePresence` in the`_app.js` and `AnimatePresence` animates the direct children, we need to provide the `<Component>` to which we’re returning a unique key.

Initially, this tripped me up. I resolved this issue by adding the page path as a key to ensure it’s always unique. This way, React will register each page as a different component and can animate the exit before animating the entry of a new component.

### Creating a shared layout component

Once the wrapper is in place inside `_app.js`, we’ll need to create the child page element that is actually animated. Instead of doing this on every page, we can create a shared `<Layout>` component that we can use to wrap all the pages we want to animate:

```jsx title="components/Layout/index.js"
import { motion } from "framer-motion";

const Layout = ({ children }) => (
  <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}
  >
    {children}
  </motion.div>
);
export default Layout;
```

These are some great default settings to start with, but you can [explore other declarative properties](https://framer.com/docs/component/) too.

For example, you could use `initial` to specify a transition starting point, or where the element should “come from.” While `animate` would specify the “end state,” or where you want things to end up, `exit` is used to specify the target of where the animated component should end up.

These properties can be used to fine-tune any Framer Motion page transitions in your Next.js project, as well as the `transition` properties. If these names sound confusing, you can also [<VPIcon icon="fas fa-globe"/>define your own `variants`](https://framer.com/docs/component/###variants) to make it easier to follow.

### Using the layout component

Next, we need to use the layout component on all the pages we want to animate. It doesn’t matter whether these are static pages or dynamic routes.

Make this the first component, wrapping any child component to ensure it’s a direct descendant of `<AnimatePresence>`:

```js title="pages/index.js"
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
        // ....
        // Page content goes here
        // ....
    </Layout>
  );
}
```

With the above stripped-down homepage markup, I’m just showing you what is required to get the Next.js page transitions working. Performing this on multiple pages and linking to them will result in a page transition, and any content in the actual component will animate with our page transition.

### Dealing with scroll issues

You’re not quite done yet! The default behavior of the `Link` component in Next.js is to scroll to the top of the page before changing pages, which is obviously not what you want. Instead, you want the navigation and the transition to start immediately after the `Link` is clicked.

One solution to this is to add the `scroll={false}` prop on all `Link` components. There’s no way to change the default behavior of `Link` components.

Unfortunately, that creates a new problem. With the preview of the final project we looked at earlier, this problem was hard to see, as the pages weren’t that long. However, looking at the mobile view makes clearer what is happening:

![Mobile View Of Final Page Transitions Project Preview Using Next Js With Framer Motion To Animate Transition From Page To Page](/assets/image/blog.logrocket.com/advanced-page-transitions-next-js-framer-motion/Final-Next-js-Framer-Motion-page-transitions-project-mobile-view.gif)

Once we scroll down and transition to the new page, Next.js persists the scroll position and we land in the middle of the new page. This is clearly not a great user experience.

Fixing this issue is easy with the attribute on our root `<AnimatePresence>`, where we can add any `onExitComplete` function. All we have to do is scroll the window back to the top once the exit animation is complete. Then, regardless of the page length, the new page will start from the top:

```js title="_app.js"
<AnimatePresence
  mode="wait"
  initial={false}
  onExitComplete={() => window.scrollTo(0, 0)}
>
```

---

## Bonus tip: Loading page transitions

As I alluded to at the beginning of this guide, page transitions that also serve as loading state indicators help keep a user’s attention while you’re fetching data. Next.js makes it easy to create this feature by providing us with some `Router` events.

We can use the Next.js `Router` events to set a local state variable to indicate the loading state. From there, we can decide what to do with that indicator.

In the example below, there is a different component that will be rendered as a whole page loader:

```js :collapsed-lines title="_app.js"
import { useState, useEffect } from "react"
import Router from "next/router"
import PageLoader from "@/components/PageLoader"

const App = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    // Used for page transition
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  return loading ? <PageLoader /> : <Component {...pageProps} />
}
export default App
```

You can then style and animate this page loader separately.

---

## Implementing page transitions with the App Router

That’s everything you need to know about Next.js page transitions with the Pages Router! But what if you need to use the App Router? The big ideas are the same, but here’s what’s different.

First, all Next.js components that use Framer Motion need to be designated as client components by adding `"use client";` as the first line of the component file.

Next, `AnimatePresence` doesn’t play well with the App Router, so you don’t get exit animations on your pages. However, the entry animations on `Layout` will still work as they should.

Instead of manually wrapping every page with the `Layout` component, you can create a <VPIcon icon="fa-brands fa-js"/>`template.js` file in the root of the `app` folder and use it to wrap all your pages:

```jsx title="template.js"
import Layout from "@/components/Layout";

export default function rootTemplate({ children }) {
  return <Layout>{children}</Layout>;
}
```

Loading Framer Motion page transitions with the Next.js App Router is even easier than with the Pages Router. All you have to do is create a `loading.js` file and put your `PageTransition` component in it.

---

## Conclusion

In this article, we looked at when and why you may want to consider adding page transitions on your site. We demonstrated how to create and add page transitions using Next.js and Framer Motion, with both the Pages and App Routers.

We also looked at a different approach for using a page loader as an interstitial loading state that serves as a page transition. If you try out this approach, use the comments below to let me know how you find it!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Advanced page transitions with Next.js and Framer Motion",
  "desc": "Here's a look at how to use Next.js and Famer Motion to apply subtle, elegant page transitions that add personality and style to your site.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/advanced-page-transitions-next-js-framer-motion.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
