---
lang: en-US
title: "Get the width of the scrollbar using only CSS"
description: "Article(s) > Get the width of the scrollbar using only CSS"
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
      content: "Article(s) > Get the width of the scrollbar using only CSS"
    - property: og:description
      content: "Get the width of the scrollbar using only CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/scrollbar-width.html
prev: /programming/css/articles/README.md
date: 2024-07-31
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/987f74c0.png
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
  name="Get the width of the scrollbar using only CSS"
  desc="Using modern CSS features to get the scrollbar width as a CSS variable"
  url="https://css-tip.com/scrollbar-width/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/987f74c0.png"/>

::: info

You can find a better implementation here

```component VPCard
{
  "title": "Get the scrollbar width using only CSS",
  "desc": "A few lines of code to get the scrollbar width within a CSS variable",
  "link": "/css-tip.com/width-scrollbar.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

:::

"What is the width of the scrollbar?" A question we can answer using a few lines of modern CSS! No need for JavaScript and you get the value as a CSS variable defined at `:root` level.

```css
@property --w {
  syntax: "<integer>";
  inherits: true;
  initial-value: 0; 
}
@property --_x {
  syntax: "<number>";
  inherits: true;
  initial-value: 0; 
}
@property --_w {
  syntax: '<length>';
  inherits: true;
  initial-value: 100vw; 
}
html {
  /* --w will contain the width in pixel of the scrollbar 
     it's a unitless value (integer) */
  --w: calc(tan(atan2(var(--_w),1px)) - 1/(1 - var(--_x)));
  timeline-scope: --cx;
  animation: x linear;
  animation-timeline: --cx;
  animation-range: entry 100% exit 100%;
}
html:before {
  content:"";
  position: fixed;
  left: 0;
  width: 1px;
  view-timeline: --cx inline;
}
@keyframes x {to{--_x:1}}
```

Chrome-only for now

<CodePen
  user="t_afif"
  slug-hash="rNEjyNj"
  title="CSS-only scrollbar width"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More detail

[**How to Get the Width/Height of Any Element in Only CSS**](/blog.master.dev/how-to-get-the-width-height-of-any-element-in-only-css.md)

:::

::: info More CSS Tips

- [**A decorative line with rounded dashes**](/css-tip.com/line-rounded-dashes.md) A few lines of code to create a nice decoratinve line with rounded dashes. August 15, 2024
- [**A CSS generator for wavy circle shapes**](/css-tip.com/wavy-circles.md) Use modern CSS to create a wavy circle shape in no time. August 13, 2024
- [**Get the width & height of any element without JavaScript**](/css-tip.com/element-dimension.md) Using modern CSS to get the size of any element as CSS variables. July 26, 2024
- [**Calculate the scroll progress of an arbitrary element**](/css-tip.com/scroll-progress-2.md) A few lines of CSS to get the scroll progress of any element in the page. July 24, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Get the width of the scrollbar using only CSS",
  "desc": "Using modern CSS features to get the scrollbar width as a CSS variable",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/scrollbar-width.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
