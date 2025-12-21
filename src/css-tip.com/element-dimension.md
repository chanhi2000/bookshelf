---
lang: en-US
title: "Get the width & height of any element without JavaScript"
description: "Article(s) > Get the width & height of any element without JavaScript"
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
      content: "Article(s) > Get the width & height of any element without JavaScript"
    - property: og:description
      content: "Get the width & height of any element without JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/element-dimension.html
prev: /programming/css/articles/README.md
date: 2024-07-26
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/a408412a.png
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
  name="Get the width & height of any element without JavaScript"
  desc="Using modern CSS to get the size of any element as CSS variables"
  url="https://css-tip.com/element-dimension/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/a408412a.png"/>

Use modern CSS features to get the width and height of any element as CSS variables.

- Powered by Scroll-Driven animations and `@property`
- Unitless values so you can easily use them inside any formula
- You can apply the trick to multiple elements on the page
- You can make the variables available everywhere on the page

```css :collapsed-lines
@property --_x {
  syntax: "<number>";
  inherits: true;
  initial-value: 0; 
}
@property --_y {
  syntax: "<number>";
  inherits: true;
  initial-value: 0; 
}
@property --w {
  syntax: "<integer>";
  inherits: true;
  initial-value: 0; 
}
@property --h {
  syntax: "<integer>";
  inherits: true;
  initial-value: 0; 
}

.size {
  overflow: auto;
  position: relative;
  --w:calc(1/(1 - var(--_x))); /* element width */
  --h:calc(1/(1 - var(--_y))); /* element height */
  timeline-scope: --cx,--cy;
  animation: x linear,y linear;
  animation-timeline: --cx,--cy;
  animation-range: entry 100% exit 100%; 
}
.size:before {
  content:"";
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  aspect-ratio: 1;
  view-timeline: --cx inline,--cy block;
}
@keyframes x {to{--_x:1}}
@keyframes y {to{--_y:1}}
```

Resize the below demo to see how the values update in real-time:

<CodePen
  user="t_afif"
  slug-hash="MWMyYeP"
  title="Get width/height of elements using CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

Here is the particular case of the screen sizes

<CodePen
  user="t_afif"
  slug-hash="eYwZgqL"
  title="Get screen dimension using only CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More detail

[frontendmasters.com/blog/how-to-get-the-width-height-of-any-element-in-only-css](https://frontendmasters.com/blog/how-to-get-the-width-height-of-any-element-in-only-css/)

:::

---

## More CSS Tips


```component VPCard
{
  "title": "Arc shape with rounded edges",
  "desc": "a few lines of modern CSS to create an arc shape with rounded edges",
  "link": "/css-tip.com/arc-shape.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

- [**Get the width of the scrollbar using only CSS**](/css-tip.com/scrollbar-width.md) Using modern CSS features to get the scrollbar width as a CSS variable. July 31, 2024
- [**Calculate the scroll progress of the page**](/css-tip.com/scroll-progress.md) A few lines of CSS to get the scroll progress of the page inside a CSS variable. July 23, 2024
- [**Manual typography using Scroll-driven animations**](/css-tip.com/manual-typography.md) Use a range slider to manually adjust the font-size of your website (100% CSS). July 18, 2024

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Get the width & height of any element without JavaScript",
  "desc": "Using modern CSS to get the size of any element as CSS variables",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/element-dimension.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
