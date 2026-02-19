---
lang: en-US
title: "Gallery of Skewed Images with Hover Effect"
description: "Article(s) > Gallery of Skewed Images with Hover Effect"
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
      content: "Article(s) > Gallery of Skewed Images with Hover Effect"
    - property: og:description
      content: "Gallery of Skewed Images with Hover Effect"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/skewed-images.html
prev: /programming/css/articles/README.md
date: 2025-12-02
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/382adfdf.png
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
  name="Gallery of Skewed Images with Hover Effect"
  desc="Using modern CSS and corner-shape to add a fancy gallery of images with a reveal hover effect"
  url="https://css-tip.com/skewed-images/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/382adfdf.png"/>

Another classic component made easy with modern CSS and the new `corner-shape`. A gallery of skewed images with a reveal effect on hover using a few lines of code. The skewing adjusts accordingly to the direction of the text. Another direction-aware shape!

![CSS-only gallery of skewed images](https://css-tip.com/img/zYNoqNCT6h-1210.png)

```css
.gallery {
  --s: 50px; /* control the skewing */
  
  display: flex;
  gap: 10px;
}
.gallery > img {
  flex: 1;
  border-start-start-radius: var(--s) 100%;
  border-end-end-radius: var(--s) 100%;
  margin-inline-end: calc(-1*var(--s));
  corner-shape: bevel;
  transition: .3s linear;
}
.gallery > img:hover {
  flex: 1.6;
}
.gallery > img:is(:first-child,:hover),
.gallery > img:hover + * {
  border-start-start-radius: 0 100%;
}
.gallery > img:is(:last-child,:hover),
.gallery > img:has(+ :hover) {
  border-end-end-radius: 0 100%;
  margin-inline-end: 0;
}
```

<CodePen
  user="t_afif"
  slug-hash="NPNBVYq"
  title="Gallery of skewed images (with hover effect)"
  :default-tab="['css','result']"
  :theme="dark"/>

Another implementation using `clip-path` with better, support but not direction-aware.

<CodePen
  user="t_afif"
  slug-hash="XJdBwxz"
  title="Gallery of skewed images (with hover effect) II"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

- [**Connecting Circles With Anchor Positioning**](/css-tip.com/connected-circles.md) Using modern CSS to create a dynamic link that connects two circles, whatever their position. December 16, 2025
- [**Fizz Buzz using Modern CSS (no HTML)**](/css-tip.com/fizz-buzz.md) A fun experiment using modern CSS to create the classic Fizz Buzz. December 06, 2025
- [**Direction-Aware Arrow Shape using corner-shape**](/css-tip.com/arrow.md) Combining corner-shape and logical properties to create direction-aware shapes.. November 25, 2025
- [**Dynamic Tooltip Position with Anchor Positioning IV**](/css-tip.com/tooltip-anchor-4.md) A tooltip with a stretchy arrow that follows its anchor. November 20, 2025

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Gallery of Skewed Images with Hover Effect",
  "desc": "Using modern CSS and corner-shape to add a fancy gallery of images with a reveal hover effect",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/skewed-images.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
