---
lang: en-US
title: "Arrow-like Box with rounded corners"
description: "Article(s) > Arrow-like Box with rounded corners"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tip.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Arrow-like Box with rounded corners"
    - property: og:description
      content: "Arrow-like Box with rounded corners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/arrow-like-box.html
prev: /programming/css/articles/README.md
date: 2025-04-22
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/85d76f77.png
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
  name="Arrow-like Box with rounded corners"
  desc="Create a rectangle with a rounded triangle shape on one side"
  url="https://css-tip.com/arrow-like-box/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/85d76f77.png"/>

Another experimentation using the new `shape()` function to add rounded corners to a box with a triangular shape.

![A CSS-only arrow-like rectangle](https://css-tip.com/img/9HYAgNFCP0-994.png)

A complex-looking code but all you have to do is to update a few variables.

```css
.box {
  --h: 200px; /* element height */
  --s: 90px;  /* triangle size */
  --r: 10px;  /* radius */
  
  height: var(--h);
  border-radius: var(--r) 0 0 var(--r);
  --_a: atan2(var(--s),var(--h)/2);
  clip-path: 
   shape(from 0 0,
    line  to calc(100% - var(--s) - var(--r)) 0,
    curve to calc(100% - var(--s) + var(--r)*sin(var(--_a))) 
             calc(var(--r)*cos(var(--_a)))
    with calc(100% - var(--s)) 0,
    line  to calc(100% - var(--r)*sin(var(--_a))) 
             calc(50%  - var(--r)*cos(var(--_a))),
    curve to calc(100% - var(--r)*sin(var(--_a)))
             calc(50%  + var(--r)*cos(var(--_a))) 
    with 100% 50%,
    line  to calc(100% - var(--s) + var(--r)*sin(var(--_a))) 
             calc(100% - var(--r)*cos(var(--_a))),
    curve to calc(100% - var(--s) - var(--r)) 100%
    with calc(100% - var(--s)) 100%,
    line to 0 100%
   );
}
```

<CodePen
  user="t_afif"
  slug-hash="preview/LEENyEq"
  title="Rounded Triangle Boxes"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

```component VPCard
{
  "title": "SVG to CSS Shape Converter",
  "desc": "The easiest way to convert an SVG shape into a CSS one",
  "link": "/css-tip.com/svg-to-css.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

```component VPCard
{
  "title": "Blob shape with hover effect",
  "desc": "Add a blob shape to your image with a cool bouncy hover effect",
  "link": "/css-tip.com/blob-hover.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

```component VPCard
{
  "title": "Hexagon shapes with rounded corners",
  "desc": "Use the new shape() function to create a hexagon shape with rounded corners",
  "link": "/css-tip.com/rounded-hexagon.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

```component VPCard
{
  "title": "The unknown behavior of flex-wrap",
  "desc": "flex-wrap doesn't only control the wrapping of items but also affects the alignment",
  "link": "/css-tip.com/flex-wrap.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Arrow-like Box with rounded corners",
  "desc": "Create a rectangle with a rounded triangle shape on one side",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/arrow-like-box.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
