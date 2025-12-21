---
lang: en-US
title: "Circular dashed border"
description: "Article(s) > Circular dashed border"
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
      content: "Article(s) > Circular dashed border"
    - property: og:description
      content: "Circular dashed border"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/dashed-rounded-border.html
prev: /programming/css/articles/README.md
date: 2021-11-25
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/338a1ff1.png
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
  name="Circular dashed border"
  desc="Use mask and gradient to create a fancy dashed border"
  url="https://css-tip.com/dashed-rounded-border/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/338a1ff1.png"/>

Create a circular dashed border with full control over the dashes. Only one element and a few lines of code are required. Simply update the CSS variables to control the design of the border.

![Circular dashed border](https://css-tip.com/img/CUX7aRZ0ZR-437.png)

```css
.box {
  --n: 20;   /* control the number of dashes */
  --d: 8deg; /* control the distance between dashes */
  --t: 5px;  /* control the thickness of border*/
  --c: red;  /* control the coloration (can be a gradient) */
  
  width: 120px;
  aspect-ratio: 1;
  position: relative;
}
.box::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  padding: var(--t);
  background: var(--c);
  mask:
      linear-gradient(#0000 0 0) content-box,
      repeating-conic-gradient(
         from calc(var(--d)/2),
         #000  0 calc(360deg/var(--n) - var(--d)),
         #0000 0 calc(360deg/var(--n))
       );
  mask-composite: intersect;
}
```

<CodePen
  user="t_afif"
  slug-hash="KKvjjZN"
  title="Dashed border"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More CSS Tips

- [**max-width + centering with one instruction**](/css-tip.com/center-max-width.md) Use max() to center your element and set a max-width. December 10, 2021
- [**Hamburger menu icon**](/css-tip.com/css-menu-icon.md) Use CSS gradients to create a menu icon. December 07, 2021
- [**Progress bar with dynamic coloration**](/css-tip.com/progress-bar-dynamic-color.md) Create a scrolling shadow effect using only CSS gradients. November 15, 2021
- [**One column to control the height of another**](/css-tip.com/equal-height-column.md) Make one column control the height of another one with a simple property. November 05, 2021

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Circular dashed border",
  "desc": "Use mask and gradient to create a fancy dashed border",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/dashed-rounded-border.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
