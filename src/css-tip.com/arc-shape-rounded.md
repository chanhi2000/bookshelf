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
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/arc-shape-rounded.html
prev: /programming/css/articles/README.md
date: 2025-05-20
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
  desc="A modern way to create arc shapes with rounded edges using minimal code"
  url="https://css-tip.com/arc-shape-rounded/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/7886a50f.png"/>

[**Previously**](/css-tip.com/arc-shape.md), I used CSS mask to create an arc shape with rounded edges. Now, we can rely on the new `shape()` function that produces a more compact code and gives better rendering. A single-element implementation optimized with CSS variables.

![CSS-only arc shape with rounded edges](https://css-tip.com/img/BcsFvj3ZhR-937.png)

```css
@property --_f {
  syntax: "<number>";
  inherits: false;
  initial-value: 0; 
}
.arc {
  --v: 35; /* [0 100] */
  --b: 40px; /* thickness */
  
  --_v: min(99.99,var(--v));
  --_f: round(down,var(--_v),50);
  --_c: if(style(--_f: 0): small; else: large);
  aspect-ratio: 1;
  clip-path: shape(from top,
    arc to calc(50% + 50%*sin(var(--_v)*3.6deg)) 
           calc(50% - 50%*cos(var(--_v)*3.6deg)) of 50% var(--_c) cw,
    arc to calc(50% + (50% - var(--b))*sin(var(--_v)*3.6deg)) 
           calc(50% - (50% - var(--b))*cos(var(--_v)*3.6deg)) of 1% cw,
    arc to 50% var(--b) of calc(50% - var(--b)) var(--_c),
    arc to top of 1% cw
  );
}
```

<CodePen
  user="t_afif"
  slug-hash="pvvXJLY"
  title="Arc shape with rounded edges"
  :default-tab="['css','result']"
  :theme="dark"/>

Another implementation using styles queries instead of inline conditions:

```css
@property --_f {
  syntax: "<number>";
  inherits: false;
  initial-value: 0; 
}
.arc {
  --v: 35; /* [0 100] */
  --b: 40px; /* thickness */
  
  --_v: min(99.99,var(--v));
  --_f: round(down,var(--_v),50);
  aspect-ratio: 1;
  display: grid;
  container-name: arc;
}
.arc:before {
  content: "";
  clip-path: shape(from top,
    arc to calc(50% + 50%*sin(var(--_v)*3.6deg)) 
           calc(50% - 50%*cos(var(--_v)*3.6deg)) of 50% var(--_c,large) cw,
    arc to calc(50% + (50% - var(--b))*sin(var(--_v)*3.6deg)) 
           calc(50% - (50% - var(--b))*cos(var(--_v)*3.6deg)) of 1% cw,
    arc to 50% var(--b) of calc(50% - var(--b)) var(--_c,large),
    arc to top of 1% cw
  );
  @container style(--_f: 0) {--_c: small}
}
```

<CodePen
  user="t_afif"
  slug-hash="xbboGaO"
  title="Arc shape with rounded edges"
  :default-tab="['css','result']"
  :theme="dark"/>

And a demo with a starting animation

<CodePen
  user="t_afif"
  slug-hash="azzeOVo"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

```component VPCard
{
  "title": "Safe align your content",
  "desc": "Learn about the keyword ”safe” and how to use it",
  "link": "/css-tip.com/safe-align.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

```component VPCard
{
  "title": "How to correctly use if() in CSS",
  "desc": "Learn how to easily fix an issue you will face when using if()",
  "link": "/css-tip.com/inline-if.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

```component VPCard
{
  "title": "Blob shape with hover effect",
  "desc": "Add a blob shape to your image with a cool bouncy hover effect",
  "link": "/css-tip.com/blob-hover.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

```component VPCard
{
  "title": "A heart shape with modern CSS",
  "desc": "Use the new shape() function to create a heart shape with minimal code",
  "link": "/css-tip.com/heart.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Arc shape with rounded edges",
  "desc": "A modern way to create arc shapes with rounded edges using minimal code",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/arc-shape-rounded.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
