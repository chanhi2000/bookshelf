---
lang: en-US
title: "max-width + centering with one instruction"
description: "Article(s) > max-width + centering with one instruction"
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
      content: "Article(s) > max-width + centering with one instruction"
    - property: og:description
      content: "max-width + centering with one instruction"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/center-max-width.html
prev: /programming/css/articles/README.md
date: 2021-12-10
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/0c90c27e.png
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
  name="max-width + centering with one instruction"
  desc="Use max() to center your element and set a max-width"
  url="https://css-tip.com/center-max-width/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/0c90c27e.png"/>

Set `max-width` and center your block element with one CSS declaration using `margin-inline` and `max()`.

![Centering and settin a max-width using `max()`](https://css-tip.com/img/MwCcy4QIP0-746.png)

```css
margin-inline: max(0px,50% - 800px/2);
```

You can also set a minimum margin for small screen by replacing `0px` with any value

```css
margin-inline: max(1rem,50% - 800px/2);
```

<CodePen
  user="t_afif"
  slug-hash="jOGMMMG"
  title="margin-inline"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

```component VPCard
{
  "title": "Cut your image into pieces",
  "desc": "Use CSS mask to cut your image into small pieces",
  "link": "/css-tip.com/matrix-image.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

```component VPCard
{
  "title": "One big image + thumbnails",
  "desc": "A CSS grid with a big image and thumbnails",
  "link": "/css-tip.com/image-thumbnail.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

```component VPCard
{
  "title": "Multi-line text decoration",
  "desc": "Use CSS gradients to decorate your text",
  "link": "/css-tip.com/multi-line-text-decoration.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

- [**Circular dashed border**](/css-tip.com/dashed-rounded-border.md) Use mask and gradient to create a fancy dashed border. November 25, 2021

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "max-width + centering with one instruction",
  "desc": "Use max() to center your element and set a max-width",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/center-max-width.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
