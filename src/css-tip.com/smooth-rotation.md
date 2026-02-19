---
lang: en-US
title: "Smooth rotation with modern CSS"
description: "Article(s) > Smooth rotation with modern CSS"
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
      content: "Article(s) > Smooth rotation with modern CSS"
    - property: og:description
      content: "Smooth rotation with modern CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/smooth-rotation.html
prev: /programming/css/articles/README.md
date: 2025-01-03
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/76de73a2.png
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
  name="Smooth rotation with modern CSS"
  desc="Create a smooth rotation of any element using modern CSS"
  url="https://css-tip.com/smooth-rotation/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/76de73a2.png"/>

Use modern CSS to control the rotation of any element smoothly. Hover to rotate, click to accelerate, unhover to return to the initial position following the shortest path!

- Single element (no pseudo-element)
- No keyframes
- Powered by `@property` and math functions

![CSS-only smooth rotation](https://css-tip.com/img/qVI02NkVhk-855.png)

```css
@property --a {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg; 
}
@property --i {
  syntax: "<number>";
  inherits: false;
  initial-value: 0; 
}
@property --j {
  syntax: "<number>";
  inherits: false;
  initial-value: 1; 
}
.box {
  --t: 1turn; /* control the modulo (the smallest angle after which you get back to the same visual) */
  --d: .8s;   /* the transition when you unhover */

  rotate: calc(mod(var(--a),var(--t)/2)*var(--i) + clamp(var(--t)/-2*var(--i),(var(--t)/2 - mod(var(--a),var(--t)))*9999,0deg));
  transition: --i var(--d),--a 0s var(--d),--j var(--d);
}
.box:hover {
  --i: 1;
  --a: calc(15turn*var(--j));
  transition: --i 0s,--a 30s linear,--j .5s;
}
.box:active {
  --j: 2; /* control the speed on click [1 infinity[ */
}
```

<CodePen
  user="t_afif"
  slug-hash="azoVpzN"
  title="Hover to rotate, click to accelerate, unhover for a smooth stop!"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

- [**Smoothly stop an infinite rotation**](/css-tip.com/stop-animation.md) Using modern CSS to stop an infinite rotation on hover. January 14, 2025
- [**Running animations without keyframes**](/css-tip.com/animation-without-keyframes.md) A new way to create animations without relying on keyframes. January 09, 2025
- [**A new way to center block elements using place-self**](/css-tip.com/center-block-element.md) A modern way to center block elements using place-self instead of auto margin and max-width. December 06, 2024
- [**Border-only breadcrumb shape using modern CSS**](/css-tip.com/border-only-breadcrumb.md) A few lines of code to create a border-only breadcrumb shape that you can easily adjust. December 05, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Smooth rotation with modern CSS",
  "desc": "Create a smooth rotation of any element using modern CSS",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/smooth-rotation.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
