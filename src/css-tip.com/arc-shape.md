---
lang: en-US
title: "Arc shape with rounded edges"
description: "Article(s) > Arc shape with rounded edges"
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
      content: "Article(s) > Arc shape with rounded edges"
    - property: og:description
      content: "Arc shape with rounded edges"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/arc-shape.html
prev: /programming/css/articles/README.md
date: 2024-08-07
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/7886a50f.png
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
  name="Arc shape with rounded edges"
  desc="a few lines of modern CSS to create an arc shape with rounded edges"
  url="https://css-tip.com/arc-shape/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/7886a50f.png"/>

Create an [**arc shape**](/css-shape.com/arc.md) with rounded edges using a few lines of CSS

- Single element (no pseudo-element)
- Less than 10 CSS declarations
- Supports gradient coloration
- Optimized with CSS variables

![A 3D shine animation on image](https://css-tip.com/img/jFTRMClVU9-827.png)

```css
.arc {
  --b: 30px; /* the boder thickness */
  --a: 220deg; /* control the progression */
  
  width: 200px;
  aspect-ratio: 1;
  padding: var(--b);
  box-sizing: border-box;
  border-radius: 50%;
  background: linear-gradient(#CC333F,#8A9B0F);
  --_g:/var(--b) var(--b) no-repeat
    radial-gradient(50% 50%,#000 calc(100% - 1px),#0000);
  mask:
    top var(--_g),
     calc(50% + 50%*sin(var(--a))) 
     calc(50% - 50%*cos(var(--a))) var(--_g),
    linear-gradient(#0000 0 0) content-box intersect,
    conic-gradient(#000 var(--a),#0000 0);
}
```

<CodePen
  user="t_afif"
  slug-hash="oNrwRqP"
  title="Arc shape with rounded edges"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Shapes

<SiteInfo
  name="The Ultimate CSS Shapes Collection"
  desc="The modern way to create CSS shapes using a minimal code and a single element. A collection of CSS-only shapes created by Temani Afif."
  url="https://css-shape.com/"
  logo="https://css-shape.com/fav.png"
  preview="https://css-shape.com/css-shapes.jpg"/>

:::

---

## More CSS Tips

- [**Quantity queries using has() selector**](/css-tip.com/quantity-queries.md) a simple way to generate a quantity query selector using modern CSS. August 26, 2024
- [**A decorative line with rounded dashes**](/css-tip.com/line-rounded-dashes.md) A few lines of code to create a nice decoratinve line with rounded dashes. August 15, 2024

```component VPCard
{
  "title": "Count the number of lines inside a text",
  "desc": "A CSS-only solution to count the lines of text",
  "link": "/css-tip.com/count-lines.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

```component VPCard
{
  "title": "Get the width & height of any element without JavaScript",
  "desc": "Using modern CSS to get the size of any element as CSS variables",
  "link": "/css-tip.com/element-dimension.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Arc shape with rounded edges",
  "desc": "a few lines of modern CSS to create an arc shape with rounded edges",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/arc-shape.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
