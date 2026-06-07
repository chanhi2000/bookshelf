---
lang: en-US
title: "Responsive Infinite Logo Marquee"
description: "Article(s) > Responsive Infinite Logo Marquee"
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
      content: "Article(s) > Responsive Infinite Logo Marquee"
    - property: og:description
      content: "Responsive Infinite Logo Marquee"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/logo-marquee.html
prev: /programming/css/articles/README.md
date: 2025-07-29
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/85c88950.png
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
  name="Responsive Infinite Logo Marquee"
  desc="Use modern CSS and a few lines of code to create an infinite scroll animation"
  url="https://css-tip.com/logo-marquee/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/85c88950.png"/>

With [**the powerful `shape()` function**](/css-tricks.com/better-css-shapes-using-shape-part-1-lines-and-arcs.md) and the new [**`sibling-index()`/`sibling-count()` functions**](/css-tip.com/element-index.md), we can create an infinite logo marquee using a few lines of code.

- Responsive (It doesn't depend on the container width)
- Works with any number of images
- Easy to control using CSS variables
- No magic numbers

![A CSS-only arrow-like rectangle](https://css-tip.com/img/7RMGBAeIfn-831.png)

```html
<div class="container">
  <img src="">
  <img src="">
  <!-- as many images as you want -->
</div>
```

```css
.container {
  --s: 150px; /* size of the logos */
  --d: 8s; /* animation duration */
  --n: 4; /* number of visible logos */
  
  display: flex;
  overflow: hidden;
}
img {
  width: var(--s);
  offset: shape(from calc(var(--s)/-2) 50%,hline by calc(sibling-count()*max(100%/var(--n),var(--s))));
  animation: x var(--d) linear infinite calc(-1*sibling-index()*var(--d)/sibling-count());
}
@keyframes x { 
  to {offset-distance: 100%}
}
```

::: warning ⚠️ Limited support (Chrome only for now) ⚠️

<CodePen
  user="t_afif"
  slug-hash="QwjGqEJ"
  title="Responsive infinite logo marquee"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

The technique is not limited to image elements. It works with any kind of content.

The only requirement is to have equal-width items:

<CodePen
  user="t_afif"
  slug-hash="vENyead"
  title="Infinite scroll animation"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="t_afif"
  slug-hash="vENyewr"
  title="Responsive Infinite marquee animation"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info Related

```component VPCard
{
  "title": "Infinite Marquee Animation using Modern CSS",
  "desc": "A row of logos that animate forever perfectly and don't have any duplicated HTML or JavaScript at all is quite a trick. Thanks modern CSS! ",
  "link": "/master.dev/infinite-marquee-animation-using-modern-css.md",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

::: info More CSS Tips

- [**Circular Gallery of Rounded Images**](/css-tip.com/circular-gallery.md) A fancy gallery of images created with few lines code. August 19, 2025
- [**Dynamic media/container queries using if()**](/css-tip.com/dynamic-queries.md) Use modern CSS to express media queries and container queries differently. August 14, 2025
- [**Dynamic nth-child() using sibling-index() and if()**](/css-tip.com/nth-child.md) Use modern CSS to control the arguments of nth-child() and update them on the fly. July 14, 2025
- [**Get the index of an element within its parent**](/css-tip.com/element-index.md) A native CSS function to get the index of an element among its siblings within a parent element. July 10, 2025

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Responsive Infinite Logo Marquee",
  "desc": "Use modern CSS and a few lines of code to create an infinite scroll animation",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/logo-marquee.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
