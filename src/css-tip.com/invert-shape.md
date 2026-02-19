---
lang: en-US
title: "Invert CSS Shapes using shape()"
description: "Article(s) > Invert CSS Shapes using shape()"
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
      content: "Article(s) > Invert CSS Shapes using shape()"
    - property: og:description
      content: "Invert CSS Shapes using shape()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/invert-shape.html
prev: /programming/css/articles/README.md
date: 2025-07-01
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/8c1e791c.png
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
  name="Invert CSS Shapes using shape()"
  desc="A simple trick to get the cut-out version of any shape created using shape()"
  url="https://css-tip.com/invert-shape/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/8c1e791c.png"/>

Do you want to invert a shape created using `clip-path: shape()`? With a simple code, you can have both the main shape and its cut-out version.

![CSS-only Cut-out shapes using `shape()`](https://css-tip.com/img/X0BlK4Ody9-837.png)

```css
.shape {
  /* You add "evenodd" at the start and "var(--i,)" at the end */
  clip-path: shape(evenodd from .... var(--i,));
}
.invert { /* by adding the "invert" class, the shape is inverted! */
  --i:,move to 0 0, hline to 100%, vline to 100%, hline to 0;
}
```

<CodePen
  user="t_afif"
  slug-hash="ogXOmWa"
  title="Inverting shapes using shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

We can add an extra variable and control the space around the shape when inverted:

```css
.shape {
  clip-path: shape(evenodd from ... var(--i,)) content-box; /* content-box at the end */
}
.invert {
  --d: 20px; /* this will control the space around the inverted shape */
  padding: var(--d);
  --i: ,move to calc(-1*var(--d)) calc(-1*var(--d)),
        hline to calc(100% + var(--d)),
        vline to calc(100% + var(--d)),
        hline to calc(-1*var(--d));
  box-sizing: content-box;
}
```

<CodePen
  user="t_afif"
  slug-hash="ZYGZwXJ"
  title="Inverting shapes using shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

If you want to do the same with `clip-path: polygon()`, check this: [**Cut-out shapes using clip-path**](/css-tip.com/cut-out-shapes.md)

::: info More CSS Tips

- [**How to place images around a circle**](/css-tip.com/images-circle.md) A simple CSS code to correctly place a set of images (or any elements) around a circle. July 17, 2025
- [**Dynamic nth-child() using sibling-index() and if()**](/css-tip.com/nth-child.md) Use modern CSS to control the arguments of nth-child() and update them on the fly. July 14, 2025
- [**The Future of Hexagon Shapes**](/css-tip.com/hexagon.md) A new way to easily create hexagon shapes using corner-shape. June 12, 2025
- [**Safe align your content**](/css-tip.com/safe-align.md) Learn about the keyword "safe" and how to use it. June 10, 2025

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Invert CSS Shapes using shape()",
  "desc": "A simple trick to get the cut-out version of any shape created using shape()",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/invert-shape.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
