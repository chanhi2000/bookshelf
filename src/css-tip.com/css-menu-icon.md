---
lang: en-US
title: "Hamburger menu icon"
description: "Article(s) > Hamburger menu icon"
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
      content: "Article(s) > Hamburger menu icon"
    - property: og:description
      content: "Hamburger menu icon"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/css-menu-icon.html
prev: /programming/css/articles/README.md
date: 2021-12-07
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/ea0512a9.png
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
  name="Hamburger menu icon"
  desc="Use CSS gradients to create a menu icon"
  url="https://css-tip.com/css-menu-icon/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/ea0512a9.png"/>

Create a CSS-only hamburger menu icon with 2 gradients. Adjust one value to control the size.

![A CSS-only menu icon](https://css-tip.com/img/rjTIoal23k-228.png)

```css
.menu {
  width:80px; /* update this to control the size */
  aspect-ratio:1;
  background:
    radial-gradient(closest-side at 50% 25%,#000 96%,#0000) top/20% 40%,
    linear-gradient(#000 50%,#0000 0) top/80% 40% repeat-y;
}
```

<CodePen
  user="t_afif"
  slug-hash="zYEqGgR"
  title="Hamburger menu"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More detail

<SiteInfo
  name="How to create a responsive sidebar menu using CSS"
  desc="Use modern CSS techniques to create a responsive sidebar menu."
  url="https://verpex.com/blog/how-to-create-a-responsive-sidebar-menu-using-css/"
  logo="https://verpex.com/assets/brand/favicons/16x16.png"
  preview="https://verpex.com/assets/brand/favicons/open-graph.png"/>

:::

::: info More CSS Tips

- [One big image + thumbnails](/css-tip.com/image-thumbnail.md) A CSS grid with a big image and thumbnails. December 15, 2021
- [Full screen height container](/css-tip.com/full-screen-height.md) Make your container fill all the screen height. December 15, 2021
- [Circular dashed border](/css-tip.com/dashed-rounded-border.md) Use mask and gradient to create a fancy dashed border. November 25, 2021
- [CSS-only scrolling shadow](/css-tip.com/css-scrolling-shadow.md) Create a scrolling shadow effect using only CSS gradients. November 24, 2021

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Hamburger menu icon",
  "desc": "Use CSS gradients to create a menu icon",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/css-menu-icon.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
