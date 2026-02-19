---
lang: en-US
title: "A new way to center block elements using place-self"
description: "Article(s) > A new way to center block elements using place-self"
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
      content: "Article(s) > A new way to center block elements using place-self"
    - property: og:description
      content: "A new way to center block elements using place-self"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/center-block-element.html
prev: /programming/css/articles/README.md
date: 2024-12-06
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/7eec60d2.png
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
  name="A new way to center block elements using place-self"
  desc="A modern way to center block elements using place-self instead of auto margin and max-width"
  url="https://css-tip.com/center-block-element/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/7eec60d2.png"/>

A modern and more intuitive way to center block elements is available! One line of code and you can replace the use of `margin: auto` combined with `width`/`max-width`.

```css
.box {
  place-self: center; /* OR justify-self: center */
}
```

The support is still not good. Use the latest version of Chrome to test:

<CodePen
  user="t_afif"
  slug-hash="yBKNPP"
  title="justify-self on block element"
  :default-tab="['css','result']"
  :theme="dark"/>

Using `place-items: center` on a parent element will do the same. It's useful if you want to center all the elements inside a container.

```css
.container {  
  place-items: center; /* OR justify-items: center */
}
```

<CodePen
  user="t_afif"
  slug-hash="BwGKaN"
  title="justify-items on block elements"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

- [**A CSS-only clock showing the current time**](/css-tip.com/clock.md) Use modern CSS (and some hacks) to show the current time using only CSS. January 07, 2025
- [**Smooth rotation with modern CSS**](/css-tip.com/smooth-rotation.md) Create a smooth rotation of any element using modern CSS. January 03, 2025
- [**Glowing border animation with a smooth stop**](/css-tip.com/glowing-border.md) Add a fancy border animation on hover that stops smoothly on mouseout. December 03, 2024
- [**Full-bleed layout with modern CSS**](/css-tip.com/full-bleed-layout.md) A few lines of code to make a section extend to the edges of the screen. November 26, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A new way to center block elements using place-self",
  "desc": "A modern way to center block elements using place-self instead of auto margin and max-width",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/center-block-element.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
