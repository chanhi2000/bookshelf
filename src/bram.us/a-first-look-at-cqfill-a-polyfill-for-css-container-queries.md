---
lang: en-US
title: "A first look at CQFill, a Polyfill for CSS Container Queries"
description: "Article(s) > A first look at CQFill, a Polyfill for CSS Container Queries"
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
      content: "Article(s) > A first look at CQFill, a Polyfill for CSS Container Queries"
    - property: og:description
      content: "A first look at CQFill, a Polyfill for CSS Container Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/a-first-look-at-cqfill-a-polyfill-for-css-container-queries.html
prev: /programming/css/articles/README.md
date: 2021-04-28
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
  "link": "/articles/README.md",
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
  name="A first look at CQFill, a Polyfill for CSS Container Queries"
  desc="Let's take a look at how we can use CQFill, the Container Queries Polyfill by Jonathan Neal."
  url="https://bram.us/2021/04/27/a-first-look-at-cqfill-a-polyfill-for-css-container-queries/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/03/container-queries.png"/>

[Jonathan Neal (<VPIcon icon="fa-brands fa-x-twitter"/>)](https://x.com/jon_neal) just announced that he has been working on a polyfill for [**CSS Container Queries**](/bram.us/css-container-queries-a-first-look-and-demo.md). Let’s take a look at how it works …

::: details 🤔 Container Queries?

Container Queries allow authors to style elements according to the size or appearance of a container. For size based container queries this is similar to a `@media` query, except that it will evaluate against the size of a parent container instead of the viewport.

![](https://bram.us/wordpress/wp-content/uploads/2021/03/container-queries.png)

For style based container queries you conditionally apply styles based on the calculated value of another CSS property.

:::

::: details 🤔 Polyfill?

A polyfill is a piece of code (or plugin) that provides the technology that you, the developer, expect the browser to provide natively — [<VPIcon icon="fas fa-globe"/>What is a Polyfill?](https://remysharp.com/2010/10/08/what-is-a-polyfill/)

:::

::: note Update 2021.11.26

This polyfill does not play nice with the most recent Container Queries Syntax. Instead, please [**use the `container-query-polyfill` polyfill**](/bram.us/a-first-look-at-container-query-polyfill-a-polyfill-for-css-container-queries.md)

Unfortunately the polyfill is not a simple drop-in that will work with your existing CSS code. This is because rendering engines that don’t support Container Queries will discard those specific statements and declarations.

To work around this, the polyfill requires you to duplicate some CSS with an alternative syntax.

1. Duplicate the value for the `contain` property into a CSS Custom Property named `--css-contain`
2. Duplicate the `@container` rule as an `@media` rule bearing the text `--css-container`

Like so:

```css
/* Create a Container Root */
.container {
  contain: layout inline-size style; /* For browsers that support Container Queries */
  --css-contain: layout inline-size style; /* For the polyfill to use */
}
```

```css
/* Container Query */
@container (min-width: 700px) { /* For browsers that support Container Queries */
  .contained {
    /* … */
  }
}

@media --css-container and (min-width: 700px) { /* For the polyfill to use */
  .contained {
    /* … */
  }
}
```

As those duplicated rules are valid CSS, browsers won’t discard them and the polyfill can pick them up 🙂

::: important

It’s very import to use the naming as used in the code above. The Custom Property **must** be named `--css-contain` and the Media Query **must** contain the text `--css-container`. If named differently, the polyfill won’t be able to pick them up.

:::

Once your styles have been declared you can import the polyfill, after which it’ll do its thing:

```html
<script src="https://unpkg.com/cqfill"></script>
```

If you want a local copy of CQFill, you can install it per NPM/Yarn.

```sh
npm install cqfill
```

```js
import { cqfill } from "cqfill";
```

::: warning

I’ve noticed that loading cqfill from Skypack doesn’t seem to work unfortunately …

:::

::: note

☝️ When using Next.js or PostCSS you don’t even need to call the polyfill, as the CQFill repo includes plugins for those.

:::

Here’s my original demo, adjusted to include the polyfill:

<CodePen
  user="bramus"
  slug-hash="RwKOVRG"
  title="CSS Container Queries Demo (with Polyfill)"
  :default-tab="['css','result']"
  :theme="dark"/>

Great work Jonathan, works like a charm!

<SiteInfo
  name="jsxtools/cqfill"
  desc="Polyfill for CSS Container Queries."
  url="https://github.com/jsxtools/cqfill/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/1fe84334ce33c671a58a5d926146053e6ac748f4a168df21248306e00cd1753c/jsxtools/cqfill"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A first look at CQFill, a Polyfill for CSS Container Queries",
  "desc": "Let's take a look at how we can use CQFill, the Container Queries Polyfill by Jonathan Neal.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/a-first-look-at-cqfill-a-polyfill-for-css-container-queries.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
