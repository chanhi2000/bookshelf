---
lang: en-US
title: "Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)"
description: "Article(s) > Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)"
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
      content: "Article(s) > Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)"
    - property: og:description
      content: "Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/media-queries-level-4-media-query-range-contexts.html
prev: /programming/css/articles/README.md
date: 2021-10-26
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/10/media-query-range-context.png
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
  name="Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)"
  desc="A media feature like width can take its value from a range. When used, we prefix these with min- or max- to express “minimum condition” or “maximum condition” constraints. @media (min-width: 300px) and (max-width: 750px) { … } In CSS Media Queries Level 4 these type of Media Features can now be written as a … Continue reading ”Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)”"
  url="https://bram.us/2021/10/26/media-queries-level-4-media-query-range-contexts/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/10/media-query-range-context.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2021/10/media-query-range-context.png)

A media feature like `width` can take its value from a range. When used, we prefix these with `min-` or `max-` to express *“minimum condition”* or *“maximum condition”* constraints.

```css
@media (min-width: 300px) and (max-width: 750px) {
  …
}
```

In [<VPIcon icon="iconfont icon-w3c"/>CSS Media Queries Level 4](https://w3.org/TR/mediaqueries-4/) these type of Media Features can now be written as a *“range context”*, which uses ordinary mathematical comparison operators.

```css
@media (300px <= width <= 750px) {
  …
}
```

The syntax might seem a little bit odd at first, but for me the trick is to read it as *“the `width` sits in between the two values”*

Also works with single values. This example will most likely be more readable to anyone who has *(basic)* programming knowledge:

```css
/* Old Way */
@media (max-width: 750px) {
  …
}
/* New Way */
@media (width <= 750px) {
  …
}
```

At the time for writing, only Gecko/Firefox supports Range Contexts *(ever since Firefox 63)*. There was some *(minor)* movement in the Blink/Chromium issue in September, but progress seems to have stalled. No word on WebKit/Safari.

::: note 💡

Although this post was originally published in October 2021, the list below is constantly being updated. *Last update: Nov 16, 2023*.

:::

::: tabs

@tab:active <VPIcon icon="fa-brands fa-chrome"/>Blink

✅ Shipped in Chrome 104

[<VPIcon icon="fa-brands fa-chrome"/>Issue #1034465](https://bugs.chromium.org/p/chromium/issues/detail?id=1034465)

@tab <VPIcon icon="fa-brands fa-firefox"/>Gecko

✅ Shipped in Firefox 63

[<VPIcon icon="fa-brands fa-firefox"/>Issue #1422225](https://bugzilla.mozilla.org/show_bug.cgi?id=1422225)

@tab <VPIcon icon="fa-brands fa-safari"/>WebKit

✅ Shipped in Safari 16.4

[<VPIcon icon="fa-brands fa-safari"/>Issue #180234](https://bugs.webkit.org/show_bug.cgi?id=180234)

:::

The pen embedded below will indicate if your browser supports Media Query Range Contexts or not:

<CodePen
  user="bramus"
  slug-hash="abyNdpa"
  title="CSS Media Query Range Context Test"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

If you’re using PostCSS, you can use [the `postcss-media-minmax` processor (<VPIcon icon="iconfont icon-github"/>`postcss/postcss-media-minmax`)](https://github.com/postcss/postcss-media-minmax) to already write Range Contexts:

```sh
npm i postcss-media-minmax
```

```js
var fs = require('fs')
var postcss = require('postcss')
var minmax = require('postcss-media-minmax')

var css = fs.readFileSync('input.css', 'utf8')

var output = postcss()
  .use(minmax())
  .process(css)
  .css
  
console.log('\n====>Output CSS:\n', output)  
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)",
  "desc": "A media feature like width can take its value from a range. When used, we prefix these with min- or max- to express “minimum condition” or “maximum condition” constraints. @media (min-width: 300px) and (max-width: 750px) { … } In CSS Media Queries Level 4 these type of Media Features can now be written as a … Continue reading ”Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/media-queries-level-4-media-query-range-contexts.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
