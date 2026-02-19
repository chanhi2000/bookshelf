---
lang: en-US
title: "One column to control the height of another"
description: "Article(s) > One column to control the height of another"
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
      content: "Article(s) > One column to control the height of another"
    - property: og:description
      content: "One column to control the height of another"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/equal-height-column.html
prev: /programming/css/articles/README.md
date: 2021-11-05
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/cb4cc2ec.png
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
  name="One column to control the height of another"
  desc="Make one column control the height of another one with a simple property"
  url="https://css-tip.com/equal-height-column/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/cb4cc2ec.png"/>

Make one column control the height of another column whatever its content using the `contain` prorperty. No JavaScript is needed.

Below, the right column will follow the height of the left column.

![CSS-only equal height column](https://css-tip.com/img/VwWaJVwIuv-617.png)

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.grid .right {
  contain: size; /* Disable the size contribution of the content inside the right column */
}
.grid .left {
  /* nothing here */
}
```

We can also replace `contain: size` with the below:

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.grid .right {
  height: 0; /* No size contribution */
  min-height: 100%; /* force the element to be full height after size calculation */
}
.grid .left {
  /* nothing here */
}
```

<CodePen
  user="t_afif"
  slug-hash="poraqNz"
  title="CSS grid - dynamic columns"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

- [**Circular dashed border**](/css-tip.com/dashed-rounded-border.md) Use mask and gradient to create a fancy dashed border. November 25, 2021
- [**CSS-only scrolling shadow**](/css-tip.com/css-scrolling-shadow.md) Create a scrolling shadow effect using only CSS gradients. November 24, 2021
- [**Corner-only border around an image**](/css-tip.com/corner-only-border.md) Use CSS gradient and mask to create a Corner-only border around your image. November 03, 2021

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "One column to control the height of another",
  "desc": "Make one column control the height of another one with a simple property",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/equal-height-column.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
