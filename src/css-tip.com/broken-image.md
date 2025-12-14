---
lang: en-US
title: "How to style a broken image"
description: "Article(s) > How to style a broken image"
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
      content: "Article(s) > How to style a broken image"
    - property: og:description
      content: "How to style a broken image"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/broken-image.html
prev: /programming/css/articles/README.md
date: 2025-05-22
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/f881e48b.png
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
  name="How to style a broken image"
  desc="Give a nice visual touch to images that fail to load"
  url="https://css-tip.com/broken-image/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/f881e48b.png"/>

When an image fails to load the browser will simply show you the alt text but you can change this using a cool CSS trick. Broken images accept pseudo-elements such as `::before` and `::after` so we can tweak them to add a custom error message or any visual you want.

![Custom error message for broken images](https://css-tip.com/img/kudh9WxESu-987.png)

```css
img {
  position: relative;
}
img::after {
  content: "We failed to load the image of \A'" attr(alt) "'\A 😞"/"";
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  text-align: center;
  border: 2px dashed;
  font: bold 1.6em/1.5 system-ui;
  white-space: pre-wrap;
}
```

The above style will not apply to correctly loaded images so no need for any specific selector to exclude them

<CodePen
  user="t_afif"
  slug-hash="QwbLwEb"
  title="Style broken images"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: info More CSS Tips

```component VPCard
{
  "title": "The future of hexagon shapes",
  "desc": "A new way to easily create hexagon shapes using corner-shape",
  "link": "/css-tip.com/hexagon.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

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
  "title": "SVG to CSS Shape Converter",
  "desc": "The easiest way to convert an SVG shape into a CSS one",
  "link": "/css-tip.com/svg-to-css.md",
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

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to style a broken image",
  "desc": "Give a nice visual touch to images that fail to load",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/broken-image.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
