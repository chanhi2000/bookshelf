---
lang: en-US
title: "Quantity queries using has() selector"
description: "Article(s) > Quantity queries using has() selector"
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
      content: "Article(s) > Quantity queries using has() selector"
    - property: og:description
      content: "Quantity queries using has() selector"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/quantity-queries.html
prev: /programming/css/articles/README.md
date: 2024-08-26
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/f5170c21.png
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
  name="Quantity queries using has() selector"
  desc="a simple way to generate a quantity query selector using modern CSS"
  url="https://css-tip.com/quantity-queries/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/f5170c21.png"/>

Adjust the below to get your quantity query selector!

Select `.container` if it has  Exactly At least At most Between   and  child elements
<!-- TODO: 구현 -->

```css
.container:has(> :nth-last-child(3):nth-child(-n + 8)) {
  /*                */
  /* your CSS here  */
  /*                */
}
```

::: note

"At most N" is the same as "Between 1 and N" (0 is not included)

:::

Here are two special quantity selectors that can be useful

```css
/* select .container if it has an even number of child elements */
.container:has(> :last-child:nth-child(even)) {
  /* your CSS here */
}
/* select .container if it has an odd number of child elements */
.container:has(> :last-child:nth-child(odd)) {
  /* your CSS here */
}
```

::: info Related

```component VPCard
{
  "title": "How many elements your container has?",
  "desc": "Detect the number of elements inside a container using :has() selector",
  "link": "/css-tip.com/number-elements-has-selector.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

:::

---

## More CSS Tips

- [**Progress element with a tooltip**](/css-tip.com/progress-with-tooltip.md) Adding a tooltip to the native progress element showing the precentage of progress. September 10, 2024
- [**Curved avatar header with hover effect**](/css-tip.com/fancy-avatar-header.md) Create a fancy curved header with a cool hover effect. August 29, 2024
- [**A CSS generator for wavy circle shapes**](/css-tip.com/wavy-circles.md) Use modern CSS to create a wavy circle shape in no time. August 13, 2024
- [**Arc shape with rounded edges**](/css-tip.com/arc-shape.md) a few lines of modern CSS to create an arc shape with rounded edges. August 07, 2024

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Quantity queries using has() selector",
  "desc": "a simple way to generate a quantity query selector using modern CSS",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/quantity-queries.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
