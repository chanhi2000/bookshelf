---
lang: en-US
title: "Hexagon shapes with rounded corners"
description: "Article(s) > Hexagon shapes with rounded corners"
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
      content: "Article(s) > Hexagon shapes with rounded corners"
    - property: og:description
      content: "Hexagon shapes with rounded corners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/rounded-hexagon.html
prev: /programming/css/articles/README.md
date: 2025-04-16
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/cd3533cb.png
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
  name="Hexagon shapes with rounded corners"
  desc="Use the new shape() function to create a hexagon shape with rounded corners"
  url="https://css-tip.com/rounded-hexagon/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/cd3533cb.png"/>

We can create [**a hexagon shape**](/css-tip.com/hexagon-shape.md) using `clip-path: polygon()` but what about the rounded corners variation? It's now possible with the new `clip-path: shape()`. The code is more complex but you can easily control it using CSS variables.

![CSS-only hexagon shape with rounded corners](https://css-tip.com/img/TSxiojA-g7-835.png)

```css
.hexagon {
  --r: 0.15; /* control the radius [0 1] */
  --a: 30deg; /* control the rotation */
  
  width: 280px;
  aspect-ratio: 1;
  clip-path: shape(/* a complex code but all you have to do is to update the above variables */);
}
```

As a bonus we can animate the radius and also rotate the shape. Here is a demo with a cool hover effect.

::: note ⚠️ Chrome-only for now ⚠️

<CodePen
  user="t_afif"
  slug-hash="myydVbr"
  title="Rounded hexagon shapes with hover effect"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

---

## More CSS Tips

- [**A heart shape with modern CSS**](/css-tip.com/heart.md) Use the new shape() function to create a heart shape with minimal code. April 23, 2025
- [**Arrow-like Box with rounded corners**](/css-tip.com/arrow-like-box.md) Create a rectangle with a rounded triangle shape on one side. April 22, 2025
- [**Custom progress element using attr()**](/css-tip.com/custom-progress.md) Create a custom progress element with a dynamic coloration based on the value. March 25, 2025
- [**Zig-Zag edges using CSS mask**](/css-tip.com/zig-zag-edge.md) One line of code to add Zig-Zag edges to any element using the mask property. March 20, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Hexagon shapes with rounded corners",
  "desc": "Use the new shape() function to create a hexagon shape with rounded corners",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/rounded-hexagon.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
