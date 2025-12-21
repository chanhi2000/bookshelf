---
lang: en-US
title: "A first look at container-query-polyfill, a polyfill for CSS Container Queries"
description: "Article(s) > A first look at container-query-polyfill, a polyfill for CSS Container Queries"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Node.js
  - Article(s)
tag:
  - blog
  - bram.us
  - css
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A first look at container-query-polyfill, a polyfill for CSS Container Queries"
    - property: og:description
      content: "A first look at container-query-polyfill, a polyfill for CSS Container Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/a-first-look-at-container-query-polyfill-a-polyfill-for-css-container-queries.html
prev: /programming/css/articles/README.md
date: 2021-11-26
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/03/container-queries.png
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

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="A first look at container-query-polyfill, a polyfill for CSS Container Queries"
  desc="Surma has been working on container-query-polyfill, a lightweight polyfill for CSS Container Queries. Let’s take a look at how it works and how it differs from cqfill … What Unlike cqfill —which was covered here before— this Polyfill for Container Queries: Does not require you to declare a separate Custom Property --css-contain that duplicates the … Continue reading ”A first look at container-query-polyfill, a polyfill for CSS Container Queries”"
  url="https://bram.us/2021/11/26/a-first-look-at-container-query-polyfill-a-polyfill-for-css-container-queries/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/03/container-queries.png"/>

[Surma (<VPIcon icon="fa-brands fa-x-twitter"/>`DasSurma`)](https://twitter.com/DasSurma) has been working on [<VPIcon icon="iconfont icon-github"/>`GoogleChromeLabs/container-query-polyfill`](https://github.com/GoogleChromeLabs/container-query-polyfill), a lightweight polyfill for [**CSS Container Queries**](/bram.us/css-container-queries-a-first-look-and-demo.md). Let’s take a look at how it works and how it differs from `cqfill` …

::: details

🤔 Container Queries?

Container Queries allow authors to style elements according to the size or appearance of a container. For size based container queries this is similar to a `@media` query, except that it will evaluate against the size of a parent container instead of the viewport.

![](https://bram.us/wordpress/wp-content/uploads/2021/03/container-queries.png)

For style based container queries you conditionally apply styles based on the calculated value of another CSS property.

:::

::: details 🤔 Polyfill?

A polyfill is a piece of code (or plugin) that provides the technology that you, the developer, expect the browser to provide natively — [<VPIcon icon="fas fa-globe"/>What is a Polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill/)

:::

---

## What

Unlike `cqfill` —[**which was covered here before**](/bram.us/a-first-look-at-cqfill-a-polyfill-for-css-container-queries.md)— this Polyfill for Container Queries:

- Does not require you to declare a separate Custom Property `--css-contain` that duplicates the value of the `contain` property
- Does not require you to duplicate your `@container` rule into a `@media` rule
- Parses the newer Container Queries Syntax that uses the `container-type` + `container-name` properties *(shorthanded to `container`)*

Because of this, the polyfill is a drop-in piece of code that will *automagically* do its thing 🙂

> It transpiles CSS code on the client-side and implements Container Query functionality using `ResizeObserver` and `MutationObserver`.

Additionally this polyfill does not rely on `requestAnimationFrame`, which makes it more performant.

---

## Installation + Usage

Installation per NPM:

```sh
npm i container-query-polyfill
```

To use, import the polyfill when no support for container queries is detected:

```js
const supportsContainerQueries = "container" in document.documentElement.style;
if (!supportsContainerQueries) {
  import("container-query-polyfill");
}
```

Alternatively, load it via a *(self-invoking)* remote script:

```html
<script src="https://unpkg.com/container-query-polyfill/dist/container-query-polyfill.modern.js"></script>
```

Supported are all modern browsers: Chrome 88+, Firefox 78+, and Safari 14+.

👨‍🏫 Unfamiliar with the syntax of CSS Container Queries itself? No worries, you can [**learn CSS Container Queries here**](/bram.us/css-container-queries-a-first-look-and-demo.md).

---

## Demo

I’ve updated [**my original Container Queries Demo**](/bram.us/css-container-queries-a-first-look-and-demo.md) to include this polyfill. Works like a charm:

<CodePen
  user="bramus"
  slug-hash="LYxNpeE"
  title="CSS Container Queries Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

Do note that this polyfill comes with a few limitations:

- Only a subset of queries is supported for now. Specifically, only `min-width`, `max-width`, `min-height` and `max-height` are supported.
- Only top-level Container Queries are supported — no nesting of CQs in other Media Queries.
- Container query thresholds can only be specified using pixels.

:::

These limitations are the result of a design choice:

> My aim is to make the polyfill work correctly for the majority of use-cases, but cut corners where possible to keep the polyfill simple(-ish), small and efficient.

Sounds totally reasonable.

<SiteInfo
  name="GoogleChromeLabs/container-query-polyfill"
  desc="A polyfill for CSS Container Queries."
  url="https://github.com/GoogleChromeLabs/container-query-polyfill/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b3d493e977bfd965f15ee685aef111840e7a195fb495da5ff7d241ba9b23031e/GoogleChromeLabs/container-query-polyfill"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A first look at container-query-polyfill, a polyfill for CSS Container Queries",
  "desc": "Surma has been working on container-query-polyfill, a lightweight polyfill for CSS Container Queries. Let’s take a look at how it works and how it differs from cqfill … What Unlike cqfill —which was covered here before— this Polyfill for Container Queries: Does not require you to declare a separate Custom Property --css-contain that duplicates the … Continue reading ”A first look at container-query-polyfill, a polyfill for CSS Container Queries”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/a-first-look-at-container-query-polyfill-a-polyfill-for-css-container-queries.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
