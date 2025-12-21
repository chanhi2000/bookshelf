---
lang: en-US
title: "How many elements your container has?"
description: "Article(s) > How many elements your container has?"
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
      content: "Article(s) > How many elements your container has?"
    - property: og:description
      content: "How many elements your container has?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/number-elements-has-selector.html
prev: /programming/css/articles/README.md
date: 2022-10-10
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/0ea866db.png
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
  name="How many elements your container has?"
  desc="Detect the number of elements inside a container using :has() selector"
  url="https://css-tip.com/number-elements-has-selector/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/0ea866db.png"/>

Use the `:has()` selector and style your container based on its number of elements (direct children)

::: note

It doesn't count text nodes. Only tags!

:::

```css
.container:not(:has(*)) { /* 0 elements */}.container:has(> :last-child:nth-child(1)) { /* 1 element  */}.container:has(> :last-child:nth-child(2)) { /* 2 elements */}.container:has(> :last-child:nth-child(3)) { /* 3 elements */}/*.container:has(> :last-child:nth-child(N)) { /* N elements */}*/
```

<CodePen
  user="t_afif"
  slug-hash="ZEomRYP"
  title="How many elements it :has()?"
  :default-tab="['css','result']"
  :theme="dark"/>

You can also have range selection

```css
.container:has(> :nth-child(3)) { /* 3 elements or more */ }
/* .container:has(> :nth-child(X)) : X elements or more */

.container:has(> :last-child:nth-child(-n + 3)) { /* between 1 and 3 elements */}
/* .container:has(> :last-child:nth-child(-n + X)): between 1 and X elements */

.container:has(> :nth-last-child(3):nth-child(-n + 3)) { /* between 3 and 5 elements */}
/* .container:has(> :nth-last-child(X):nth-child(-n + (Y - X + 1))): between X and Y elements */
```

<CodePen
  user="t_afif"
  slug-hash="oNVJVJq"
  title="How many elements it :has()?"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info Related

```component VPCard
{
  "title": "Quantity queries using has() selector",
  "desc": "a simple way to generate a quantity query selector using modern CSS",
  "link": "/css-tip.com/quantity-queries.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

:::

---

## More CSS Tips

- [**A rainbow gradient animation**](/css-tip.com/rainbow-gradient-animation.md) Use the new color interpolation to create an infinite rainbow gradient animation. January 31, 2023
- [**Card reveal animation**](/css-tip.com/card-reveal-animation.md) A few mask trick to create a fancy reveal animation on hover. January 23, 2023
- [**An infinite image slider**](/css-tip.com/infinite-image-slider.md) A minimal code to create an infinite image slider. September 16, 2022
- [**Cut the corners of your element**](/css-tip.com/css-cut-corners.md) Use CSS mask to cut the four corners of an element with a circular shapes. September 08, 2022

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How many elements your container has?",
  "desc": "Detect the number of elements inside a container using :has() selector",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/number-elements-has-selector.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
