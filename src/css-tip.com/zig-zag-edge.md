---
lang: en-US
title: "Zig-Zag edges using CSS mask"
description: "Article(s) > Zig-Zag edges using CSS mask"
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
      content: "Article(s) > Zig-Zag edges using CSS mask"
    - property: og:description
      content: "Zig-Zag edges using CSS mask"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/zig-zag-edge.html
prev: /programming/css/articles/README.md
date: 2025-03-20
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/3dab4fa6.png
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
  name="Zig-Zag edges using CSS mask"
  desc="One line of code to add Zig-Zag edges to any element using the mask property"
  url="https://css-tip.com/zig-zag-edge/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/3dab4fa6.png"/>

Add Zig-Zag edges to your element using the `mask` property and one gradient.

![zig-zag edges using mask](https://css-tip.com/img/atLBXBjx11-782.png)

```css
.zig-zag {
  --s: 30px;  /* control the size (height of the spikes) */
  --a: 90deg; /* control the angle */
  
  mask: 
    repeating-conic-gradient(from calc(180deg - var(--a)/2) at 50% var(--s),#000 0 var(--a),#0000 0 180deg) 
    50% calc(-1*var(--s))/calc(2*var(--s)*tan(var(--a)/2));
}
```

<CodePen
  user="t_afif"
  slug-hash="QwWmXPw"
  title="Zig-Zag edges"
  :default-tab="['css','result']"
  :theme="dark"/>

Use my online generator to get the code of the different variations: [<VPIcon icon="fas fa-globe"/>css-generators.com/custom-borders](https://css-generators.com/custom-borders/)

![CSS-only zig-zag borders](https://css-tip.com/img/H4IUpnAkSq-860.png)

::: info More detail

```component VPCard
{
  "title": "Fancy CSS Borders Using Masks (Zig-Zag, Wavy, and More)",
  "desc": "In this article, we look at modern CSS mask techniques to create three fancy CSS borders without having to use a background image.",
  "link": "/css-tricks.com/css-borders-using-masks.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

::: info More CSS Tips

- [**Hexagon shapes with rounded corners**](/css-tip.com/rounded-hexagon.md) Use the new shape() function to create a hexagon shape with rounded corners. April 16, 2025
- [**The unknown behavior of flex-wrap**](/css-tip.com/flex-wrap.md) flex-wrap doesn't only control the wrapping of items but also affects the alignment. April 14, 2025
- [**An infinite logos animation**](/css-tip.com/infinite-logos-animation.md) Using the offset property to create a CSS-only infinite logos animation. March 13, 2025
- [**Transparent inner border for images**](/css-tip.com/inner-border.md) A simple code to add a fancy transparent inner border to image elements. March 06, 2025

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Zig-Zag edges using CSS mask",
  "desc": "One line of code to add Zig-Zag edges to any element using the mask property",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/zig-zag-edge.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
