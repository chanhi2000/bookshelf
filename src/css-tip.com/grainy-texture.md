---
lang: en-US
title: "Grainy texture using CSS gradients"
description: "Article(s) > Grainy texture using CSS gradients"
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
      content: "Article(s) > Grainy texture using CSS gradients"
    - property: og:description
      content: "Grainy texture using CSS gradients"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/grainy-texture.html
prev: /programming/css/articles/README.md
date: 2024-07-02
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/f5a3bace.png
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
  name="Grainy texture using CSS gradients"
  desc="A simple code to create a random-style background to simulate a grainy texture"
  url="https://css-tip.com/grainy-texture/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/f5a3bace.png"/>

Create a random-style background (grainy texture) using a few lines of code.

![grainy background texture](https://css-tip.com/img/XgE-360PzK-857.png)

```css
html {
  --s: 6px; /* control the size */
  
  --g: repeating-conic-gradient(#774F38 0 25%,#ECE5CE 0 50%) 0/;
  background:
    var(--g) calc(1*var(--s)) calc(7*var(--s)),
    var(--g) calc(2*var(--s)) calc(5*var(--s)),
    var(--g) calc(3*var(--s)) calc(3*var(--s)),
    var(--g) calc(5*var(--s)) calc(2*var(--s)),
    var(--g) calc(7*var(--s)) calc(1*var(--s));
  background-blend-mode: darken;
}
```

<CodePen
  user="t_afif"
  slug-hash="QWReqEx"
  title="Random CSS background"
  :default-tab="['css','result']"
  :theme="dark"/>

Another example

![CSS-only random background texture](https://css-tip.com/img/bAw2fJ0Lj--857.png)

<CodePen
  user="t_afif"
  slug-hash="mdYNxzo"
  title="grainy-random CSS background II"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

- [**Border gradient with border-radius**](/css-tip.com/border-gradient.md) The modern way to add gradient to borders while having rounder corners. July 10, 2024
- [**Inverted border-radius using CSS mask**](/css-tip.com/inverted-radius.md) One property and 4 gradients to invert the corner of any element with a radius. July 09, 2024
- [**Cut-out shapes using clip-path**](/css-tip.com/cut-out-shapes.md) Invert any kind of polygon shapes following simple steps. June 19, 2024
- [**Custom range slider with tooltip II**](/css-tip.com/range-slider-tooltip-2.md) Using modern CSS features to create a fancy range slider with tooltop. June 11, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Grainy texture using CSS gradients",
  "desc": "A simple code to create a random-style background to simulate a grainy texture",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/grainy-texture.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
