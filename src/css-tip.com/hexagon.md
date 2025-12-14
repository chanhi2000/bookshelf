---
lang: en-US
title: "The future of hexagon shapes"
description: "Article(s) > The future of hexagon shapes"
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
      content: "Article(s) > The future of hexagon shapes"
    - property: og:description
      content: "The future of hexagon shapes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/hexagon.html
prev: /programming/css/articles/README.md
date: 2025-06-12
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/de516ec0.png
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
  name="The future of hexagon shapes"
  desc="A new way to easily create hexagon shapes using corner-shape"
  url="https://css-tip.com/hexagon/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/de516ec0.png"/>

A new and easy way to create hexagon shapes using `corner-shape`. As a bonus, you can add a border to it.

It's the only method that works with borders!

![CSS-only hexagon shapes using corner-shape](https://css-tip.com/img/8ljNIW_RhN-858.png)

```css
.hexagon {
  border-radius: 50% / 25%;
  corner-shape: bevel;
  aspect-ratio: cos(30deg);
  border: 8px solid purple; /* the border will follow the shape! */
}
/* OR  */
.hexagon {
  border-radius: 25% / 50%;
  corner-shape: bevel;
  aspect-ratio: 1/cos(30deg);
  border: 8px solid purple; /* the border will follow the shape! */
}
```

::: note ⚠️ Very limited support (Chrome-only with experimental flag enabled)

<CodePen
  user="t_afif"
  slug-hash="yyNjgzR"
  title="Hexagon shapes (with border!)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

Until better support use this: [**A Modern way to create hexagon shapes**](/css-tip.com/hexagon-shape.md)

---

## More CSS Tips

- [**Get the index of an element within its parent**](/css-tip.com/element-index.md) A native CSS function to get the index of an element among its siblings within a parent element. July 10, 2025
- [**Invert CSS Shapes using shape()**](/css-tip.com/invert-shape.md) A simple trick to get the cut-out version of any shape created using shape(). July 01, 2025
- [**How to correctly use if() in CSS**](/css-tip.com/inline-if.md) Learn how to easily fix an issue you will face when using if(). June 02, 2025
- [**How to style a broken image**](/css-tip.com/broken-image.md) Give a nice visual touch to images that fail to load. May 22, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The future of hexagon shapes",
  "desc": "A new way to easily create hexagon shapes using corner-shape",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/hexagon.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
