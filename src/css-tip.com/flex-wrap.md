---
lang: en-US
title: "The unknown behavior of flex-wrap"
description: "Article(s) > The unknown behavior of flex-wrap"
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
      content: "Article(s) > The unknown behavior of flex-wrap"
    - property: og:description
      content: "The unknown behavior of flex-wrap"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/flex-wrap.html
prev: /programming/css/articles/README.md
date: 2025-04-14
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/0fae9733.png
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
  name="The unknown behavior of flex-wrap"
  desc="flex-wrap doesn't only control the wrapping of items but also affects the alignment"
  url="https://css-tip.com/flex-wrap/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/0fae9733.png"/>

`flex-wrap: wrap` allows items to wrap onto multiple lines but it has another function. It transforms your flex container from a single-line to a multi-line container even if at the end you have only one flex line. This means we can use `align-content` to align the content.

In other words, you need to use `flex-wrap: wrap` to align the content using `align-content` even if there is no wrapping.

![flex-wrap & align-content](https://css-tip.com/img/SWx-mwUvAs-888.png)

It's different from `align-items` which aligns the items inside the line whereas `align-content` aligns the whole line. Here is an interactive demo to see the behavior of each property:

<CodePen
  user="t_afif"
  slug-hash="EaxBevN"
  title="flex-wrap & alignment"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## More CSS Tips

- [**Arrow-like Box with rounded corners**](/css-tip.com/arrow-like-box.md) Create a rectangle with a rounded triangle shape on one side. April 22, 2025
- [**Polygon shapes with rounded corners**](/css-tip.com/rounded-polygon.md) Use modern CSS and Sass to generate the code of rounded polygon shapes. April 17, 2025
- [**Zig-Zag edges using CSS mask**](/css-tip.com/zig-zag-edge.md) One line of code to add Zig-Zag edges to any element using the mask property. March 20, 2025
- [**Split and assemble an image using CSS mask**](/css-tip.com/assemble-image.md) A few lines of code to create a fancy reveal animation for images. March 18, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The unknown behavior of flex-wrap",
  "desc": "flex-wrap doesn't only control the wrapping of items but also affects the alignment",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/flex-wrap.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
