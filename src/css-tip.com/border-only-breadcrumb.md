---
lang: en-US
title: "Border-only breadcrumb shape using modern CSS"
description: "Article(s) > Border-only breadcrumb shape using modern CSS"
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
      content: "Article(s) > Border-only breadcrumb shape using modern CSS"
    - property: og:description
      content: "Border-only breadcrumb shape using modern CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/border-only-breadcrumb.html
prev: /programming/css/articles/README.md
date: 2024-12-05
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/18499411.png
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
  name="Border-only breadcrumb shape using modern CSS"
  desc="A few lines of code to create a border-only breadcrumb shape that you can easily adjust"
  url="https://css-tip.com/border-only-breadcrumb/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/18499411.png"/>

Create a border-only [**breadcrumb shape**](/css-shape.com/breadcrumb.md) using a few lines of code and modern CSS.

- No extra element
- Powered by `clip-path` & math functions
- Optimized with CSS variables

![Border-only breadcrumb shape using CSS](https://css-tip.com/img/t-QZvH0jgA-901.png)

```css
.breadcrumb {
  --b: 5px;    /* the border thickness */
  --a: 40deg;  /* control the shape */
  --c: #64908A;

  line-height: 1.8; /* control the height  */
  padding-inline: calc(.5lh*tan(var(--a)) + var(--b)/cos(var(--a)));
  position: relative;
}
.breadcrumb:before {
  content:"";
  position: absolute;
  inset: 0;
  background: var(--c);
  clip-path: polygon(0 0,calc(100% - .5lh*tan(var(--a))) 0,100% 50%,calc(100% - .5lh*tan(var(--a))) 100%,0 100%,calc(.5lh*tan(var(--a))) 50%,0 0,calc(var(--b)*(tan(var(--a)) + 1/cos(var(--a)))) var(--b), calc(.5lh*tan(var(--a)) + var(--b)/cos(var(--a))) 50%,calc(var(--b)*(tan(var(--a)) + 1/cos(var(--a)))) calc(100% - var(--b)),calc(100% - .5lh*tan(var(--a)) - var(--b)*(1/cos(var(--a)) - tan(var(--a)))) calc(100% - var(--b)),calc(100% - var(--b)/cos(var(--a))) 50%,calc(100% - .5lh*tan(var(--a)) - var(--b)*(1/cos(var(--a)) - tan(var(--a)))) var(--b),calc(var(--b)*(tan(var(--a)) + cos(var(--a)))) var(--b))
}
.breadcrumb:first-child:before {
  clip-path: polygon(0 0,calc(100% - .5lh*tan(var(--a))) 0,100% 50%,calc(100% - .5lh*tan(var(--a))) 100%,0 100%,0 0,var(--b) var(--b),var(--b) calc(100% - var(--b)),calc(100% - .5lh*tan(var(--a)) - var(--b)*(1/cos(var(--a)) - tan(var(--a)))) calc(100% - var(--b)),calc(100% - var(--b)/cos(var(--a))) 50%,calc(100% - .5lh*tan(var(--a)) - var(--b)*(1/cos(var(--a)) - tan(var(--a)))) var(--b),var(--b) var(--b)) 
}
.breadcrumb:last-child:before {
  clip-path: polygon(0 0,100% 0,100% 50%,100% 100%,0 100%,calc(.5lh*tan(var(--a))) 50%,0 0,calc(var(--b)*(tan(var(--a)) + 1/cos(var(--a)))) var(--b), calc(.5lh*tan(var(--a)) + var(--b)/cos(var(--a))) 50%,calc(var(--b)*(tan(var(--a)) + 1/cos(var(--a)))) calc(100% - var(--b)),calc(100% - var(--b)) calc(100% - var(--b)),calc(100% - var(--b)) var(--b),calc(var(--b)*(tan(var(--a)) + cos(var(--a)))) var(--b))
}
```

<CodePen
  user="t_afif"
  slug-hash="wBwMJaz"
  title="Border-only breadcrumb shape"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Shapes

<SiteInfo
  name="The Ultimate CSS Shapes Collection"
  desc="The modern way to create CSS shapes using a minimal code and a single element. A collection of CSS-only shapes created by Temani Afif."
  url="https://css-shape.com"
  logo="https://css-shape.com/fav.png"
  preview="https://css-shape.com/css-shapes.jpg"/>

:::

::: info More CSS Tips

- [**Smooth rotation with modern CSS**](/css-tip.com/smooth-rotation.md) Create a smooth rotation of any element using modern CSS. January 03, 2025
- [**Overflow/scrollbar detection using modern CSS**](/css-tip.com/overflow-detection.md) Using scroll-driven animations you can detect when an element is overflowing or has a scrollbar. December 10, 2024

```component VPCard
{
  "title": "Full-bleed layout with modern CSS",
  "desc": "A few lines of code to make a section extend to the edges of the screen",
  "link": "/css-tip.com/full-bleed-layout.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

```component VPCard
{
  "title": "How to correctly use steps() with animations",
  "desc": "The default behavior of steps() is not intuitive so learn how to use it correctly",
  "link": "/css-tip.com/steps.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Border-only breadcrumb shape using modern CSS",
  "desc": "A few lines of code to create a border-only breadcrumb shape that you can easily adjust",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/border-only-breadcrumb.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
