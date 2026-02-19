---
lang: en-US
title: "Vertical rounded tabs using CSS mask"
description: "Article(s) > Vertical rounded tabs using CSS mask"
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
      content: "Article(s) > Vertical rounded tabs using CSS mask"
    - property: og:description
      content: "Vertical rounded tabs using CSS mask"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/vertical-rounded-tab.html
prev: /programming/css/articles/README.md
date: 2024-11-15
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/964b1176.png
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
  name="Vertical rounded tabs using CSS mask"
  desc="A few lines of code to get vertical rounded tabs using CSS mask"
  url="https://css-tip.com/vertical-rounded-tab/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/964b1176.png"/>

Updating the previous [**rounded tab shape**](/css-tip.com/rounded-tab.md) to create the [<VPIcon icon="fas fa-globe"/>vertical version](https://css-shape.com/vertical-rounded-tab/) using the same code structure.

- No extra element & No pseudo-element
- One variable to control the curvature
- Works with gradient coloration
- Powered by CSS mask

![CSS-only vertical rounded tabs using CSS mask](https://css-tip.com/img/aSWNYMBWnz-868.png)

```css
.rounded-tab {
  --r: .8em; /* control the radius/curvature */

  border-block: var(--r) solid #0000;
  border-radius: var(--r) 0 0 var(--r)/calc(2*var(--r));
  mask: 
    radial-gradient(var(--r) at 0 var(--r),#0000 98%,#000 101%)
      100% calc(-1*var(--r))/var(--r) 100% repeat-y,
    conic-gradient(#000 0 0) padding-box;
}
.rounded-tab.alt {
  border-radius: 0 var(--r) var(--r) 0/calc(2*var(--r));
  mask: 
    radial-gradient(var(--r) at 100% var(--r),#0000 98%,#000 101%)
      0 calc(-1*var(--r))/var(--r) 100% repeat-y,
    conic-gradient(#000 0 0) padding-box;
}
```

<CodePen
  user="t_afif"
  slug-hash="ExqrYyW"
  title="Vertical rounded tabs using CSS mask"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Shapes

<SiteInfo
  name="The Ultimate CSS Shapes Collection"
  desc="The modern way to create CSS shapes using a minimal code and a single element. A collection of CSS-only shapes created by Temani Afif."
  url="https://css-shape.com/"
  logo="https://css-shape.com/fav.png"
  preview="https://css-shape.com/css-shapes.jpg"/>

:::

::: info More CSS Tips

- [Glowing border animation with a smooth stop](/css-tip.com/glowing-border.md) Add a fancy border animation on hover that stops smoothly on mouseout. December 03, 2024
- [Full-bleed layout with modern CSS](/css-tip.com/full-bleed-layout.md) A few lines of code to make a section extend to the edges of the screen. November 26, 2024
- [Folded rectangle shapes using CSS mask](/css-tip.com/folded-rectangle.md) Create a folded rectangle shape with minimal code and a subtle 3D effect. November 08, 2024
- [Indent each line of your text](/css-tip.com/text-indent.md) A new value of text-indent that allows you to indent each line of text. November 04, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Vertical rounded tabs using CSS mask",
  "desc": "A few lines of code to get vertical rounded tabs using CSS mask",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/vertical-rounded-tab.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
