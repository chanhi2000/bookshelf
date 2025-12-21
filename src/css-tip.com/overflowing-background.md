---
lang: en-US
title: "Extend the background to the edge of the screen"
description: "Article(s) > Extend the background to the edge of the screen"
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
      content: "Article(s) > Extend the background to the edge of the screen"
    - property: og:description
      content: "Extend the background to the edge of the screen"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/overflowing-background.html
prev: /programming/css/articles/README.md
date: 2022-06-09
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/ac16c397.png
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
  name="Extend the background to the edge of the screen"
  desc="Use a border-image trick to create an overflowing background"
  url="https://css-tip.com/overflowing-background/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/ac16c397.png"/>

Extend the background of an element outside of its container to cover the full screen width

- No extra element
- No pseudo-element
- No overflow issue
- Only one CSS declaration

![An overflowing background](https://css-tip.com/img/hluZLXzrbs-1353.png)

```css
.full-background {
  border-image: conic-gradient(pink 0 0) fill 0//0 100vw;
}

```

<CodePen
  user="t_afif"
  slug-hash="oNEaqQX"
  title="Full screen background color"
  :default-tab="['css','result']"
  :theme="dark"/>

Related: [smashingmagazine.com/2024/01/css-border-image-property/](https://smashingmagazine.com/2024/01/css-border-image-property/)

Another idea more versbose using `box-shadow`

```css
.full-background {
  --c: pink;
  background: var(--c);
  /* a big box-shadow */
  box-shadow: 0 0 0 100vw var(--c);
  /* clip only the top and bottom part of it */
  clip-path: inset(0 -100vw);
}
```

<CodePen
  user="t_afif"
  slug-hash="LYQgPgM"
  title="Full screen background color"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More CSS Tips

- [**Extend your underline to the edge of the screen II**](/css-tip.com/overflowing-underline-2.md) Use a border-image trick to create an overflowing underline. June 20, 2022
- [**Extend your underline to the edge of the screen**](/css-tip.com/overflowing-underline.md) Use a border-image trick to create an overflowing underline. June 16, 2022
- [**Responsive grid of Hexagon shapes**](/css-tip.com/responsive-hexagon-grid.md) Using a shape-outside trick to create a reponsive grid of hexagon shapes. June 03, 2022
- [**Wavy text animation II**](/css-tip.com/wavy-text-animation-2.md) Use CSS gradients to create a wavy text animation. April 20, 2022

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Extend the background to the edge of the screen",
  "desc": "Use a border-image trick to create an overflowing background",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/overflowing-background.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
