---
lang: en-US
title: "How to place images around a circle"
description: "Article(s) > How to place images around a circle"
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
      content: "Article(s) > How to place images around a circle"
    - property: og:description
      content: "How to place images around a circle"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/images-circle.html
prev: /programming/css/articles/README.md
date: 2025-07-17
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/4a268668.png
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
  name="How to place images around a circle"
  desc="A simple CSS code to correctly place a set of images (or any elements) around a circle"
  url="https://css-tip.com/images-circle/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/4a268668.png"/>

Using `offset` combined with [**the new `sibling-index()` and `sibling-count()` functions**](/css-tip.com/element-index.md), we can easily and precisely place images (or any elements) around a circle using a few lines of code.

![CSS-only images around a circle](https://css-tip.com/img/Ehk00eu8JV-850.png)

```css
.container {
  display: inline-grid;
}
.container img {
  --s: 150px; /* image size */
  --g: 10px;  /* control the gap */
  
  width: var(--s);
  grid-area: 1/1;
  offset: 
    circle(calc(var(--s)/(2*sin(.5turn/sibling-count())) + var(--g))) 
    calc(100%*sibling-index()/sibling-count()) 0deg;
}
```

Add/remove images in the demo below, and see how they are perfectly placed regardless of their number.

<CodePen
  user="t_afif"
  slug-hash="jEbbLZb"
  title="Images around a circle"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

If you don't want to be precise, you can simplify the code like below

```css
.container {
  display: inline-grid;
}
.container img {
  width: 150px;
  grid-area: 1/1;
  /* adjust the 180px to control the placement */
  offset: circle(180px) calc(100%*sibling-index()/sibling-count()) 0deg;
}
```

<CodePen
  user="t_afif"
  slug-hash="myeeMMQ"
  title="Images around a circle"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We go fancy by adding a nice entry animation using `@starting-style`

```css
.container img {
  transition: 1s 1s;
  @starting-style {
    offset: circle(0px) 0% 0deg;
  }
}
```

<CodePen
  user="t_afif"
  slug-hash="wBKKqjw"
  title="Images around a circle + animations"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## More CSS Tips

- [**Dynamic media/container queries using if()**](/css-tip.com/dynamic-queries.md) Use modern CSS to express media queries and container queries differently. August 14, 2025
- [**Sequential Animations with N elements**](/css-tip.com/sequential-animations.md) A simple CSS code to animate different elements sequentially. August 07, 2025
- [**Get the index of an element within its parent**](/css-tip.com/element-index.md) A native CSS function to get the index of an element among its siblings within a parent element. July 10, 2025
- [**Invert CSS Shapes using shape()**](/css-tip.com/invert-shape.md) A simple trick to get the cut-out version of any shape created using shape(). July 01, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to place images around a circle",
  "desc": "A simple CSS code to correctly place a set of images (or any elements) around a circle",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/images-circle.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
