---
lang: en-US
title: "Split and assemble an image using CSS mask"
description: "Article(s) > Split and assemble an image using CSS mask"
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
      content: "Article(s) > Split and assemble an image using CSS mask"
    - property: og:description
      content: "Split and assemble an image using CSS mask"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/assemble-image.html
prev: /programming/css/articles/README.md
date: 2025-03-18
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/f4cd6b4a.png
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
  name="Split and assemble an image using CSS mask"
  desc="A few lines of code to create a fancy reveal animation for images"
  url="https://css-tip.com/assemble-image/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/f4cd6b4a.png"/>

Split an image into pieces using the `mask` property, then show it fully on hover. A single-element implementation using less than 10 CSS declarations.

![Assemble a broken image using CSS](https://css-tip.com/img/blR3hYCu_W-933.png)

```css
img {
  --g: 15px; /* control the gap */
  
  width: 280px;
  aspect-ratio: 1;
  box-sizing: border-box;
  --_g: var(--g)/calc(50% - var(--g)) calc(50% - var(--g)) 
    no-repeat conic-gradient(#000 0 0);
  mask: 
    left   var(--_i,) top    var(--_g),
    bottom var(--_i,) left   var(--_g),
    top    var(--_i,) right  var(--_g),
    right  var(--_i,) bottom var(--_g);
  transition: .3s linear;
}
img:hover {
  --_i: var(--g);
  padding: var(--g);
```

<CodePen
  user="t_afif"
  slug-hash="yyLvRqW"
  title="Image assembly hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

Another simpler version without the moving effect:

```css
img {
  --_g: 10%/45% 45% no-repeat conic-gradient(#000 0 0);
  mask: 
    left   var(--_i,) top    var(--_g),
    bottom var(--_i,) left   var(--_g),
    top    var(--_i,) right  var(--_g),
    right  var(--_i,) bottom var(--_g);
  transition: .3s linear;
}
img:hover {
  --_i: 10%;
}
```

<CodePen
  user="t_afif"
  slug-hash="qBpyWgK"
  title="Image mask hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

- [**The unknown behavior of flex-wrap**](/css-tip.com/flex-wrap.md) flex-wrap doesn't only control the wrapping of items but also affects the alignment. April 14, 2025
- [**Custom progress element using attr()**](/css-tip.com/custom-progress.md) Create a custom progress element with a dynamic coloration based on the value. March 25, 2025
- [**Transparent inner border for images**](/css-tip.com/inner-border.md) A simple code to add a fancy transparent inner border to image elements. March 06, 2025
- [**Get the value of an input range (without JavaScript)**](/css-tip.com/value-input.md) Use modern features to get the value of an input range using only CSS. March 05, 2025

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Split and assemble an image using CSS mask",
  "desc": "A few lines of code to create a fancy reveal animation for images",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/assemble-image.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
