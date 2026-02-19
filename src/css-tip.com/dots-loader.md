---
lang: en-US
title: "Dots loader using shape()"
description: "Article(s) > Dots loader using shape()"
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
      content: "Article(s) > Dots loader using shape()"
    - property: og:description
      content: "Dots loader using shape()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/dots-loader.html
prev: /programming/css/articles/README.md
date: 2025-06-24
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/83534b29.png
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
  name="Dots loader using shape()"
  desc="A classic 3 dots loader created using the new shape()"
  url="https://css-tip.com/dots-loader/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/83534b29.png"/>

Recreating a 3 dots loader using `shape()` and animating it using CSS variables and `@property`

![CSS-only dots loader](https://css-tip.com/img/PrYho_qwXv-446.png)

```css
@property --x {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 80%; 
}
@property --y {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 80%; 
}
@property --z {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 80%; 
}
.loader {
  aspect-ratio: 3;
  --d: ,arc by 0 -60% of 1px, arc by 0 60% of 1px;
  clip-path: 
    shape(
      from    calc( 50%/3) var(--x) var(--d),
      move to calc(150%/3) var(--y) var(--d),
      move to calc(250%/3) var(--z) var(--d)
    );
  animation: l 1s infinite;
}
@keyframes l {
  20%  {--x:60%; --y:80%;         }
  40%  {--x:100%;--y:60%; --z:80% }
  60%  {--x:80%; --y:100%;--z:60% }
  80%  {         --y:80%; --z:100%}
}
```

<CodePen
  user="t_afif"
  slug-hash="preview/azOPoaO"
  title="Dots loader using shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Loaders

<SiteInfo
  name="CSS Loaders: A collection of more than 600 loading animations"
  desc="The biggest collection of CSS-only loaders. More than 600 loading animations made by Temani Afif using a single element."
  url="https://css-loaders.com/"
  logo="https://css-loaders.com/fav.png"
  preview="https://css-loaders.com/css-loader-banner.jpg"/>

:::

::: info More CSS Tips

- [**Dynamic nth-child() using sibling-index() and if()**](/css-tip.com/nth-child.md) Use modern CSS to control the arguments of nth-child() and update them on the fly. July 14, 2025
- [**Get the index of an element within its parent**](/css-tip.com/element-index.md) A native CSS function to get the index of an element among its siblings within a parent element. July 10, 2025
- [**Safe align your content**](/css-tip.com/safe-align.md) Learn about the keyword "safe" and how to use it. June 10, 2025
- [**How to correctly use if() in CSS**](/css-tip.com/inline-if.md) Learn how to easily fix an issue you will face when using if(). June 02, 2025

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Dots loader using shape()",
  "desc": "A classic 3 dots loader created using the new shape()",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/dots-loader.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
