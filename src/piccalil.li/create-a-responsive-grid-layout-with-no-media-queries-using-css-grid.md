---
lang: en-US
title: "Create a responsive grid layout"
description: "Article(s) > Create a responsive grid layout"
icon: 
category:
  - 
  - Article(s)
tag:
  - blog
  - piccalil.li
  - 
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Create a responsive grid layout"
    - property: og:description
      content: "Create a responsive grid layout"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/create-a-responsive-grid-layout-with-no-media-queries-using-css-grid.html
prev: /articles/README.md
date: 2020-03-10
isOriginal: false
author:
  - name: Andy Bell
    url: https://piccalil.li/author/andy-bell
cover: https://piccalil.b-cdn.net/api/og-image?slug=create-a-responsive-grid-layout-with-no-media-queries-using-css-grid/
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Create a responsive grid layout"
  desc="Even with no media-queries, we can create a flexible and powerful responsive layout."
  url="https://piccalil.li/blog/create-a-responsive-grid-layout-with-no-media-queries-using-css-grid"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=create-a-responsive-grid-layout-with-no-media-queries-using-css-grid/"/>

Embracing the flexible nature of the web gives us resilient user interfaces. Instead of using prescribed, specific sizes, we give elements sensible boundaries and let them auto flow or resize where possible. A good way to think of this is that we provide browsers with some rules and regulations, then let them decide what’s best—using them as a guide.

---

## What we’re making

In this tutorial, we’re going to take this flexible mindset and produce a responsive grid layout that rules and regulations, then renders the best possible grid for the device that asks for it.

Here it is in action:

<CodePen
  user="piccalilli"
  slug-hash="MWwEzNe"
  title="Responsive grid layout: Example 1"
  :default-tab="['css','result']"
  :theme="dark"/>

It’s a fully responsive grid that uses **no media queries** to work across **all** viewports and it’s all thanks to [<VPIcon icon="fas fa-globe"/>CSS Grid](https://css-utilitys.com/snippets/css/complete-guide-grid/).

---

## How it works

First of all, let’s take a look at the code:

```css
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--auto-grid-min-size, 16rem), 1fr));
  grid-gap: 1rem;
}
```

CSS Grid is incredibly powerful for layout but usually, this type of flexible layout utility would use [**Flexbox**](/css-tricks.com/snippets-css/a-guide-to-flexbox.md), because of its *flexibility*. The reason we use grid for this particular utility, though, is the magic function, [<VPIcon icon="fa-brands fa-firefox"/>minmax](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax).

The minmax function allows us to clamp our grid items to maintain just the *right amount* of control. We achieve this by telling the function what the smallest size is for our items, by using a CSS Custom Property, which has a fallback of **16rem**. Then we tell it what the maximum size should be for each item. We declare that as **1fr**, which takes 1 portion of the **remaining available space**.

Because each item in this grid uses **1fr**, the remaining space is split up equally between the other items, so if there are 10 items, 1fr is equal to **10% of the remaining available space**. This is how we get that nice flexibility.

::: note FYI

The `--auto-grid-min-size` [<VPIcon icon="fa-brands fa-firefox"/>Custom Property](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) powers the minimum width. We set this as a Custom Property because we probably never know where this layout will appear, so by making the min-width easily configurable, it can be modified to work in specific contexts.

Because we’re setting a default value at the point of using `--auto-grid-min-size`, we’re reducing the risk of of creating specificity issues *and* making sure that if `--auto-grid-min-size` isn’t set: the grid will still operate as we expect it too. Now *that’s* flexibility.

:::

---

## How can we improve this layout utility?

Because this `.auto-grid` utility will keep trying to fill remaining available space, it’s useful to either give the layout itself a maximum width or wrap it with a shared wrapper utility. I prefer the latter approach because explicitly sizing the grid itself will reduce its own flexibility.

It’s fine to explicitly set a width sometimes, sure, but creating specific components that *only* deal with page-wide composition, like the wrapper element make working with flexible component systems a dream!

Here’s the HTML code for the wrapper element:

```html
<div class="wrapper">
  <ul class="auto-grid">
    <!-- items go here -->
  </ul>
</div>
```

And then the CSS:

```css
.wrapper {
  max-width: 65rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
}
```

Here it is in action:

<CodePen
  user="piccalilli"
  slug-hash="YzXrdwR"
  title="Responsive grid layout: Example 2 - Wrapper"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note FYI

The wrapper is set to be `max-width: 55rem` in this example, so you can see the effect in the context of this tutorial.

Usually I use the wrapper as a central container and limit the width to around 62rem or 1000px.

:::

Making the wrapper a separate utility means that we can use it wherever we need it, which is some good ol’ portability!

Because the wrapper has a `max-width` set, it’ll support all viewport sizes too, without using media queries. The padding provides a gutter, so at tiny viewports, you get a **1rem** sized gap at each side, which is ideal.

---

## Progressive enhancement

[<VPIcon icon="iconfont icon-caniuse"/>CSS Grid support](https://caniuse.com/#feat=css-grid), at the time of writing, is **94.69%**, so the *vast majority* of browsers have support for it. We *can* improve our code to provide a default experience for the minority of users that don’t have support for it with a [<VPIcon icon="fas fa-globe"/>minimum viable experience](https://hankchizljaw.com/wrote/the-p-in-progressive-enhancement-stands-for-pragmatism/), though.

<CodePen
  user="piccalilli"
  slug-hash="XWbeoMz"
  title="Responsive grid layout: Example 3 - Progressive Enhancement"
  :default-tab="['css','result']"
  :theme="dark"/>

For this layout, the minimum viable experience is stacked items with some vertical margin between each one, which for the **5.31%** of browsers that don’t support CSS grid:

```css
.auto-grid > * {
  max-width: 25rem;
  margin-left: auto;
  margin-right: auto;
}

.auto-grid > * + * {
  margin-top: 1rem;
}

@supports (display: grid) {
  .auto-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--auto-grid-min-size, 16rem), 1fr)
    );
    grid-gap: 1rem;
  }

  .auto-grid > * {
    max-width: unset;
    margin: unset;
  }
}
```

As the code block demonstrates, the minimum viable experience removes that default style using [**`@supports`**](/piccalil.li/solution-006-auto-scrolling-responsive-grid.md) which detects CSS Grid support. This sample will work fine all the way back to *super old* IE browser versions. You could even use floats and Flexbox if you absolutely wanted a grid-like layout for *all* browsers and a real power move would be to use something like [**this auto-scrolling approach**](/piccalil.li/solution-006-auto-scrolling-responsive-grid.md).

Utilising the forgiving nature of CSS to build up, rather than fix and break down will very likely result in you writing better, lighter code, so finding the lowest-tech approach to compatibility issues is only ever going to be a good thing.

![The minimum viable experience in IE11 shows how although the grid isn’t present, the sensible defaults make the layout look smart. The user will probably never know that it is supposed to be a grid because it’s not broken. This is the magic of progressive enhancement.](https://piccalil.b-cdn.net/images/tutorials/auto-grid-ie11.jpg?auto=format&w=1500)

---

## Wrapping up

I use this auto-grid *all the time*. I also use the wrapper utility, extensively in every project that I work on. Hopefully this tutorial has demonstrated the power of modern CSS and how we can write very little to achieve *a lot*. It really is a powerful language when you give it room to breathe.

Even the heavier, progressively enhanced version that supports *all* browsers is tiny and importantly, so much tinier than writing hacks and specific browser CSS!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Create a responsive grid layout",
  "desc": "Even with no media-queries, we can create a flexible and powerful responsive layout.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/create-a-responsive-grid-layout-with-no-media-queries-using-css-grid.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
