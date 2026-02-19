---
lang: en-US
title: "A Modern way to create hexagon shapes"
description: "Article(s) > A Modern way to create hexagon shapes"
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
      content: "Article(s) > A Modern way to create hexagon shapes"
    - property: og:description
      content: "A Modern way to create hexagon shapes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/hexagon-shape.html
prev: /programming/css/articles/README.md
date: 2024-01-11
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/4e7f670b.png
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
  name="A Modern way to create hexagon shapes"
  desc="Two lines of CSS code an no magic number for an hexagon shape"
  url="https://css-tip.com/hexagon-shape/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/4e7f670b.png"/>

An easy and modern way to create Hexagon Shapes

- Only 2 CSS declarations
- No magic numbers
- A simple 4-point polygon for the clip-path

![CSS-only hexagon shapes](https://css-tip.com/img/Pu0FVteBwx-725.png)

```css
.hex {
  aspect-ratio: 1/cos(30deg);
  clip-path: polygon(50% -50%,100% 50%,50% 150%,0 50%);
}

.hex-alt {
  aspect-ratio: cos(30deg);
  clip-path: polygon(-50% 50%,50% 100%,150% 50%,50% 0);
  /* Notice how I simply switched the x/y 
     of the previous polygon, easy! */
}
```

<CodePen
  user="t_afif"
  slug-hash="KKEMjxV"
  title="CSS-only hexagon shapes (the modern way)"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Shapes

<SiteInfo
  name="The Ultimate CSS Shapes Collection"
  desc="The modern way to create CSS shapes using a minimal code and a single element. A collection of CSS-only shapes created by Temani Afif."
  url="https://css-shape.com"
  logo="https://css-shape.com/fav.png"
  preview="https://css-shape.com/css-shapes.jpg"/>

:::

::: info More CSS Tips

- [**A fancy frame with wavy borders (wavy box)**](/css-tip.com/image-wavy-borders.md) Place your image inside a wavy box using modern CSS. January 23, 2024
- [**Triangle shape with rounded corners**](/css-tip.com/triangle-rounded-corner.md) A few lines of code to create a triangle with rounded corner using only CSS. January 19, 2024
- [**Fancy corner decoration for your images**](/css-tip.com/fancy-corner-decoration.md) A few lines of code for a cool corner decoration. January 05, 2024
- [**Border with inner radius for your images**](/css-tip.com/inner-radius-image.md) Two lines of code to add an inner radius to your images. January 03, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Modern way to create hexagon shapes",
  "desc": "Two lines of CSS code an no magic number for an hexagon shape",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/hexagon-shape.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
