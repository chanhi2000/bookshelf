---
lang: en-US
title: "Container Queries: Style Queries"
description: "Article(s) > Container Queries: Style Queries"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Container Queries: Style Queries"
    - property: og:description
      content: "Container Queries: Style Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/container-queries-style-queries.html
prev: /programming/css/articles/README.md
date: 2022-10-14
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2022/10/css-style-queries.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Container Queries: Style Queries"
  desc="In CSS, Style Queries which allow querying computed values of a container. Let’s take a look at what that means …"
  url="https://bram.us/2022/10/14/container-queries-style-queries/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2022/10/css-style-queries.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2022/10/css-style-queries.png)

Did you know CSS Container Queries are more than *“check the size of a container”*? Also covered by [<VPIcon icon="fas fa-globe"/>the draft spec](https://drafts.csswg.org/css-contain-3/) are Style Queries which allow querying computed values of the container. Let’s take a look at what that means …

::: note 👨‍🔬

Style Queries are still a work in progress and only have partial experimental support in Chrome. Style Queries are **not** part of the initial Container Queries implementation that landed in Chromium and WebKit earlier this year.

:::

---

## Container Queries? Style Queries? What’s the difference?

Container Queries allow authors to style elements according to *aspects* of a Query Container. This Query Container – or Container for short – is always a parent element.

For [**Size-based Container Queries**](/bram.us/css-container-queries-a-first-look-and-demo.md), children can look at the Container’s dimensions, and act upon that. This type of Container Query works similarly to how a `@media` query would resolve, except that the condition will be checked against a parent element instead of the Viewport.

![](https://bram.us/wordpress/wp-content/uploads/2021/03/container-queries.png)

For Style-based Container Queries – or Style Queries for short – you can look at the styles applied onto a Container. That means you can style children conditionally, based on the Computed (!) Value of a CSS property from that Container.

::: note

This post only covers Style Container Queries. [**Read about Size Container Queries here**.](/bram.us/css-container-queries-a-first-look-and-demo.md)

:::

---

## Basic Example

A basic example is this one below, which changes the style of *i* and *em* elements in case the parent already is italic.

```css
@container style(font-style: italic) {
  i,
  em {
    background: lavender;
  }
}
```

Note that the `font-style: italic` matching is done against on the computed value of the parent container.

If you’re wondering how to define a style container: you don’t. All elements are style containers by default. You don’t need to manually activate this.

---

## Use Cases

My colleague [<VPIcon icon="fa-brands fa-x-twitter"/>`una`](https://twitter.com/una) has [<VPIcon icon="fas fa-globe"/>a great post up on her blog](https://una.im/style-queries/) that gives an overview of Style Queries and its use cases.

My favorite use case is **grouping styles with higher-order variables**, where you can set a bunch of CSS property values based on a Custom Property Value – Yep, just like the [**Higher Level Custom Properties**](/bram.us/the-future-of-css-higher-level-custom-properties-to-control-multiple-declarations.md) proposal I covered a long time ago.

```css
@container style(--theme: dark) {
  .card {
    background: royalblue;
    border-color: navy;
    color: white;
  }

  .card button {
    border-color: navy;
    background-color: dodgerblue;
    color: white;
  }
}
```

---

## Browser Support

::: note Last update: July, 2024

Although this post was originally published in October 2022, the section below is constantly being updated.

:::

This table below shows an up-to-date list of browser support:

### Chromium *(Blink)*

✅ Style Queries with Custom Properties shipped in Chrome 111. It was available as an experimental feature as of Chromium 107.

### Firefox *(Gecko)*

🚫 No support

### Safari *(WebKit)*

🔜 Style Queries with Custom Properties will ship in Safari 18. It was available as of [<VPIcon icon="fa-brands fa-safari"/>Safari Technology Preview 190](https://webkit.org/blog/15127/release-notes-for-safari-technology-preview-190/).

When visiting using a browser with support, the demo below will show you two different styled boxes, all controlled by the value of the `--theme` Custom Property:

<CodePen
  user="una"
  slug-hash="abGXjJZ"
  title="Style query test -- card themes"
  :default-tab="['css','result']"
  :theme="dark"/>

To stay up-to-date regarding browser support, you can follow these tracking issues:

- Blink/Chromium: [<VPIcon icon="fa-brands fa-chrome"/>Issue #1302630](https://bugs.chromium.org/p/chromium/issues/detail?id=1302630) — Fixed
- Gecko/Firefox: [<VPIcon icon="fa-brands fa-firefox" />Issue #1795622](https://bugzilla.mozilla.org/show_bug.cgi?id=1795622) — UNCONFIRMED
- WebKit/Safari: [<VPIcon icon="fa-brands fa-safari"/>Issue #246605](https://bugs.webkit.org/show_bug.cgi?id=246605) — RESOLVED FIXED

::: info More Resources

At the time of writing there are not that many resources to find, but there are some:

```component VPCard
{
  "title": "Use-Cases for Style Queries",
  "desc": "When people talk about container queries, they are often referring specifically to ‘size queries’ – which allow us to query and respond to the computed size of an ancestor container. Browsers have already started to ship size-based container queries and related container query units.",
  "link": "https://css.oddbird.net/rwd/query/style-cases//",
  "logo": "https://css.oddbird.net/favicon.svg",
  "background": "rgba(176,224,230,0.2)"
}
```

<SiteInfo
  name="una.im | Style Queries"
  desc="Exploring when and how you would use style queries in your day-to-day work."
  url="https://una.im/style-queries/"
  logo="https://una.im/favicon.svg"
  preview="https://una.im/posts/style-queries/og-style-queries.jpg"/>

<SiteInfo
  name="The CSS Podcast: 59: Container queries"
  desc="Container queries (also known as @container) are a new entrypoint for truly component-based responsive design. In this episode, Adam and Una will walk you through how to use them, what browser support looks like, and upcoming features that will give you even more control over your responsive interfaces!"
  url="https://thecsspodcast.libsyn.com/059-container-queries/"
  logo="https://thecsspodcast.libsyn.com/favicon.ico"
  preview="http://assets.libsyn.com/content/194154205?height=250&width=250&overlay=true"/>

- [**Early Days of Container Style Queries**](/css-tricks.com/early-days-of-container-style-queries.md)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Container Queries: Style Queries",
  "desc": "In CSS, Style Queries which allow querying computed values of a container. Let’s take a look at what that means …",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/container-queries-style-queries.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
