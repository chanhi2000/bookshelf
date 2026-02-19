---
lang: en-US
title: "Manual typography using Scroll-driven animations"
description: "Article(s) > Manual typography using Scroll-driven animations"
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
      content: "Article(s) > Manual typography using Scroll-driven animations"
    - property: og:description
      content: "Manual typography using Scroll-driven animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/manual-typography.html
prev: /programming/css/articles/README.md
date: 2024-07-18
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/f4b99d55.png
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
  name="Manual typography using Scroll-driven animations"
  desc="Use a range slider to manually adjust the font-size of your website (100% CSS)"
  url="https://css-tip.com/manual-typography/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/f4b99d55.png"/>

Add a slider to adjust the `font-size` of your website using modern CSS features.

- 0 JavaScript required (100% CSS)
- Powered by Scroll-driven animations & @property
- Easy to control using CSS variables

```css
@property --i {
  syntax: "<number>";
  inherits: true;
  initial-value: 1; 
}
html {
  --min: 14px;
  --max: 64px;
  --step: 2px;
  
  timeline-scope: --thumb-view;
  animation: i 1s linear;
  animation-timeline: --thumb-view;
  animation-range: entry 100% exit 0%;
  font-size: round(var(--min) + (var(--max) - var(--min))*var(--i),var(--step));
}
@keyframes i {
  to{--i: 0}
}
input[type="range" i]::-webkit-slider-thumb{
  view-timeline: --thumb-view inline;
}
```

Adjust the slider on the left to control the `font-size`

<CodePen
  user="t_afif"
  slug-hash="yLdeEqa"
  title="Fluid typography with slider (CSS-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

::: info More CSS Tips

- [**Get the width & height of any element without JavaScript**](/css-tip.com/element-dimension.md) Using modern CSS to get the size of any element as CSS variables. July 26, 2024
- [**Calculate the scroll progress of an arbitrary element**](/css-tip.com/scroll-progress-2.md) A few lines of CSS to get the scroll progress of any element in the page. July 24, 2024
- [**Get the screen width & height without JavaScript**](/css-tip.com/screen-dimension.md) A few lines of CSS to get the screen width/height as integer values. July 16, 2024

```component VPCard
{
  "title": "Border gradient with border-radius",
  "desc": "The modern way to add gradient to borders while having rounder corners",
  "link": "/css-tip.com/border-gradient.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Manual typography using Scroll-driven animations",
  "desc": "Use a range slider to manually adjust the font-size of your website (100% CSS)",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/manual-typography.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
