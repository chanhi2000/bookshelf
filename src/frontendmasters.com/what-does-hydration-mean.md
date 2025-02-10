---
lang: en-US
title: "What Does Hydration Mean?"
description: "Article(s) > What Does Hydration Mean?"
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
      content: "Article(s) > What Does Hydration Mean?"
    - property: og:description
      content: "What Does Hydration Mean?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/what-does-hydration-mean.html
prev: /programming/js-react/articles/README.md
date: 2024-09-09
isOriginal: false
author: 
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3769
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
  name="What Does Hydration Mean?"
  desc="Hydration refers to JavaScript frameworks making server-side rendered HTML interactive. "
  url="https://frontendmasters.com/blog/what-does-hydration-mean/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/3769"/>

The term **hydration** gets thrown around a bunch when talking about JavaScript frameworks.

::: tip Short answer

it’s the process which JavaScript executes, reconciles, and makes interactive the HTML that is already in the DOM via server-side rendering (SSR).

:::

I’ll elaborate for clarity.

The JavaScript framework Next.js, a React-based framework, is capable of server-side rendering and hydration, so let’s start there, knowing that [<FontIcon icon="iconfont icon-nuxt"/>other major frameworks do this too](https://nuxt.com/docs/api/composables/use-hydration). I appreciate the clarity of [<FontIcon icon="fa-brands fa-react"/>the docs](https://react.dev/reference/react-dom/client/hydrateRoot) of React itself:

> In React, “hydration” is how React “attaches” to existing HTML that was already rendered by React in a server environment. During hydration, React will attempt to attach event listeners to the existing markup and take over rendering the app on the client.

But first, let’s begin with client-side only rendering. Say we have some fruit inventory. We loop over it making buttons that, when clicked, show the inventory. Ya know, like every very real world application.

```jsx
export default function FruitPage() {
  const inventory = [
    {
      name: "Apple",
      quantity: 10
    },
    {
      name: "Orange",
      quantity: 8
    },
    {
      name: "Banana",
      quantity: 27
    }
  ];

  return (
    <div className="box">
      <h2>Check Fruit Quantities</h2>

      {inventory.map((fruit) => {
        return (
          <button
            onClick={() => {
              alert(`There are ${fruit.quantity} ${fruit.name}s.`);
            }}
            key={fruit.name}
          >
            {fruit.name}
          </button>
        );
      })}
    </div>
  );
}`
```

I’ll chuck that on CodePen here, which will run no build step here and just client side render it:

CodePen Embed Fallback

The HTML that the browser receives for that page is sometime referred to as an “empty shell”. It’s an HTML document, but it doesn’t have any of the real content that we’re intending to put there. We get this:

```html
<div id="root"></div>
```

The client-side rendered application gets rendered inside that when it’s ready. I’m not going to say that there is no place in this world for client-side-only rendering, but I’ll say it’s not ideal generally and I like that more and more it’s not the default. Why not ideal? If [<FontIcon icon="fas fa-globe"/>JavaScript doesn’t load for any reason](https://kryogenix.org/code/browser/everyonehasjs.html), there is no website at all. And there are lots of reasons why JavaScript wouldn’t load (much moreso than HTML), like a mistake is throwing an error, there was a network hiccup, it’s a large file that is taking an unexpectedly long time on the user’s network, the user is intentionally or unintentionally blocking it, etc.

If we run this is an off-the-shelf Next.js build instead, which *does* have a build step, the HTML output will look like this instead:

![Screenshot of view source of the SSR React example where the content is properly in the HTML.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/CleanShot-2024-09-09-at-06.57.52%402x.png?resize=1024%2C333&ssl=1)

I’ve highlighted the minified HTML there to show that the HTML we’ve written in React/JSX makes it’s way into the HTML that is served by the app.

This is much better! Content is being rendered here directly in HTML in that first response from the server. The browser can work with that and get it rendered immediately. And any programmatic method for hitting the URL for content (e.g. a bot, a curl, etc) will succeed.

Then JavaScript loads and **hydrates that HTML**. Remember how the buttons had `onClick` handlers on them? That interactivity will *not* be present on that first HTML render of site. That’s not ideal (and maybe makes buttons a bad example for SSR), but the point is that the *content* is there. We could be talking about the entire contents of an important marketing landing page, for example.

---

## Tradeoffs

There are tradeoffs here. We’re layering on another framework to our framework and adding a build process. We’re adding dependencies and thus long term fragility to our setup. But for the most part, serving “real HTML” to the browser is considered A Good Thing™ and I’ll go ahead and go on the record for saying you should be serving HTML with content to browsers from servers.

It could be argued that going with a framework that uses SSR then hydrates leads to more complex code. You always have to be thinking and coding around the fact that a component can be rendered both by a server and on the client. You’re writing JavaScript, and it may *feel* client-side-y. You might reach for the `window` object or a method on it and be wrist-slapped that that doesn’t exist in a server context, so you write conditionals to code around that, which can cause different issues. You might have to fetch data in a way that is server-first and perhaps handled differently than you would on the client. Not to mention: you need a server! Pure-client rendered apps can get away with being served from purely static hosting, which is much more likely to be cheap or free.

---

## What can go wrong?

The most likely problem is mis-matching HTML. Since we started with Next.js, [<FontIcon icon="fas fa-globe"/>here’s a post](https://nextjsstarter.com/blog/nextjs-hydration-errors-causes-fixes-tips/) showing off a variety of examples of how this can happen with that framework. In development, you’ll likely face show-stopping full page errors with hydration errors, because the framework really wants you to fix them, and you should. *Generally*, the production build of the site with smooth over the user-facing errors so that the site is still functional. The trouble is that then the site is quite literally doing double the work and the SSR page is being blown away entirely when the client one comes in and doesn’t match. I’ve seen user-facing hydration errors breaking a site entirely, so again: possibly fragility here. Dealing with these kind of problems is work and may introduce complexity again.

---

## Does using a JavaScript framework with SSR absolutely require hydration?

If you don’t need any interactivity at all, no. Personally, I like the component model of building sites with JavaScript-based components even if it’s largely just static content. [<FontIcon icon="fas fa-globe"/>Astro](https://astro.build/) excels at that ([<FontIcon icon="fas fa-globe"/>here’s a course](https://frontendmasters.com/courses/astro/?utm_source=boost&utm_medium=blog&utm_campaign=boost)), but other frameworks can be configured to not output any JavaScript (thus skipping any hydration process).

A blog post famously said [“Hydration is pure overhead.”](https://builder.io/blog/hydration-is-pure-overhead)

::: info Builder.io

… hydration is recovering event handlers by downloading and re-executing all components in the SSR/SSG-rendered HTML. The site is sent to the client twice, once as HTML, and again as JavaScript.

:::

Overhead indeed. Perhaps not ideal, but probably worth it.

The framework [<FontIcon icon="fas fa-globe"/>Qwik](https://qwik.dev/) avoids hydration at all with a concept it coined as “resumability”. I honestly don’t know enough about it to fully understand the tradeoffs there (I promise: there are always tradeoffs), but if you’re certain that hydration is your main problem, it’s worth a look.

You should also drink more water.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Does Hydration Mean?",
  "desc": "Hydration refers to JavaScript frameworks making server-side rendered HTML interactive. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/what-does-hydration-mean.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
