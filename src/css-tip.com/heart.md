---
lang: en-US
title: "A heart shape with modern CSS"
description: "Article(s) > A heart shape with modern CSS"
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
      content: "Article(s) > A heart shape with modern CSS"
    - property: og:description
      content: "A heart shape with modern CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/heart.html
prev: /programming/css/articles/README.md
date: 2025-04-23
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/70ffd2c0.png
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
  name="A heart shape with modern CSS"
  desc="Use the new shape() function to create a heart shape with minimal code"
  url="https://css-tip.com/heart/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/70ffd2c0.png"/>

Another classic shape made easy with the new `shape()` function. A heart shape with a simple code.

![CSS-only heart shape](https://css-tip.com/img/kDYcuzrfNS-901.png)

```css
.heart {
  aspect-ratio: 1;
  clip-path: 
    shape(
      from 50% 91%,
      line to 90% 50%,
      arc to 50% 9%  of 1%,
      arc to 10% 50% of 1%
    );
}
```

<CodePen
  user="t_afif"
  slug-hash="LEEbdrw"
  title="Heart shape using shape()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

For better support check this: [**Turn your image into a heart**](/css-tip.com/image-heart-shape.md)

---

## More CSS Tips

- [**Arc shape with rounded edges**](/css-tip.com/arc-shape-rounded.md) A modern way to create arc shapes with rounded edges using minimal code. May 20, 2025
- [**SVG to CSS Shape Converter**](/css-tip.com/svg-to-css.md) The easiest way to convert an SVG shape into a CSS one. May 12, 2025
- [**Polygon shapes with rounded corners**](/css-tip.com/rounded-polygon.md) Use modern CSS and Sass to generate the code of rounded polygon shapes. April 17, 2025
- [**Hexagon shapes with rounded corners**](/css-tip.com/rounded-hexagon.md) Use the new shape() function to create a hexagon shape with rounded corners. April 16, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A heart shape with modern CSS",
  "desc": "Use the new shape() function to create a heart shape with minimal code",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/heart.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
