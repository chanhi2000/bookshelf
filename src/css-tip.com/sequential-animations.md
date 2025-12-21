---
lang: en-US
title: "Sequential Animations with N elements"
description: "Article(s) > Sequential Animations with N elements"
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
      content: "Article(s) > Sequential Animations with N elements"
    - property: og:description
      content: "Sequential Animations with N elements"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/sequential-animations.html
prev: /programming/css/articles/README.md
date: 2025-08-07
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/a9ee1e91.png
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
  name="Sequential Animations with N elements"
  desc="A simple CSS code to animate different elements sequentially"
  url="https://css-tip.com/sequential-animations/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/a9ee1e91.png"/>

Using modern CSS, you can create a sequential animation that involves an unknown number of items with a simple code. No need for complex keyframes, delays, or magic numbers. A clever combination of [**the `sibling-index()`/`sibling-count()` functions**](/css-tip.com/element-index.md) and `linear()` will do the job!

![CSS-only sequential animations](https://css-tip.com/img/eTReJhp54w-663.png)

```html
<div class="container">
  <div></div>
  <div></div>
  <div></div>
  <!-- as many elements as you want -->
</div>
```

```css
.container > * {
  --d: .5s; /* animation duration */
  
  --_s: calc(100%*(sibling-index() - 1)/sibling-count());
  --_e: calc(100%*(sibling-index())/sibling-count());
  animation: x calc(var(--d)*sibling-count()) infinite linear(0,0 var(--_s),1,0 var(--_e),0);
}
@keyframes x {
  to {
    scale: .8;
  }
```

::: note ⚠️ Limited support (Chrome only for now) ⚠️

<CodePen
  user="t_afif"
  slug-hash="dPYRzKq"
  title="Sequential Animations"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

---

## More CSS Tips

- [**100 Ways to Center an element Horizontally and Vertically**](/css-tip.com/center.md) Explore all the possible ways to center a single element within a container. September 16, 2025
- [**Circular Gallery of Rounded Images**](/css-tip.com/circular-gallery.md) A fancy gallery of images created with few lines code. August 19, 2025
- [**How to place images around a circle**](/css-tip.com/images-circle.md) A simple CSS code to correctly place a set of images (or any elements) around a circle. July 17, 2025
- [**Dynamic nth-child() using sibling-index() and if()**](/css-tip.com/nth-child.md) Use modern CSS to control the arguments of nth-child() and update them on the fly. July 14, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Sequential Animations with N elements",
  "desc": "A simple CSS code to animate different elements sequentially",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/sequential-animations.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
