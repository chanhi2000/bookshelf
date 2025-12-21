---
lang: en-US
title: "One big image + thumbnails"
description: "Article(s) > One big image + thumbnails"
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
      content: "Article(s) > One big image + thumbnails"
    - property: og:description
      content: "One big image + thumbnails"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/image-thumbnail.html
prev: /programming/css/articles/README.md
date: 2021-12-15
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/6c10eb48.png
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
  name="One big image + thumbnails"
  desc="A CSS grid with a big image and thumbnails"
  url="https://css-tip.com/image-thumbnail/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/6c10eb48.png"/>

A big image + thumbnails using CSS Grid. Same code for both the horizontal and vertical layout.

![A big image plus thumbnail](https://css-tip.com/img/wXkI80JM_S-439.png)

```html
<div class="grid">
  <img src="" alt="">
  <img src="" alt="">
  <img src="" alt="">
</div>
```

```css
.grid {
  display: grid;
  grid-auto-flow: row; /* it's the default value (can be omitted) */
}
.horizontal {
  grid-auto-flow: column;
}
.grid img:first-child {
  grid-area: span 3 / span 3;
}
```

<CodePen
  user="t_afif"
  slug-hash="xxLYLNW"
  title="Big Image + thumbnails"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More detail

```component VPCard
{
  "title": "Exploring CSS Grid’s Implicit Grid and Auto-Placement Powers",
  "desc": "When working with CSS Grid, the first thing to do is to set display: grid on the element that we want to be become a grid container. Then we explicitly define",
  "link": "/css-tricks.com/exploring-css-grids-implicit-grid-and-auto-placement-powers.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

---

## More CSS Tips

- [**Stick an element to the top-right corner**](/css-tip.com/stick-element-grid.md) Place an element on the top-right corner of your CSS grid. January 13, 2022
- [**A matrix of cubes using one element**](/css-tip.com/matrix-cube.md) Create a matrix of cubes using only one element. January 03, 2022
- [**max-width + centering with one instruction**](/css-tip.com/center-max-width.md) Use max() to center your element and set a max-width. December 10, 2021
- [**Hamburger menu icon**](/css-tip.com/css-menu-icon.md) Use CSS gradients to create a menu icon. December 07, 2021

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "One big image + thumbnails",
  "desc": "A CSS grid with a big image and thumbnails",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/image-thumbnail.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
