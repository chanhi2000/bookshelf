---
lang: en-US
title: "Safe align your content"
description: "Article(s) > Safe align your content"
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
      content: "Article(s) > Safe align your content"
    - property: og:description
      content: "Safe align your content"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/safe-align.html
prev: /programming/css/articles/README.md
date: 2025-06-10
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/a768b7ae.png
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
  name="Safe align your content"
  desc="Learn about the keyword ”safe” and how to use it"
  url="https://css-tip.com/safe-align/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/a768b7ae.png"/>

Do you know the `safe` keyword? In some specific cases, your content may overflow the container and you won't be able to scroll to it. It happens with some alignment configurations such as `center` and `end`.

`safe` can prevent this behavior!

```css
/* default behavior, not always good 🤨 */
.box {
  justify-content: center; 
}

/* safe alignment! 😌 */
.box {
  justify-content: safe center; 
}
```

Resize the container below and toggle the safe option to see the difference.

<CodePen
  user="t_afif"
  slug-hash="EajoLOe"
  title="Safe alignment"
  :default-tab="['css','result']"
  :theme="dark"/>

It works with all the alignment properties.

```css
.container {
  /* place-content, justify-content,  align-content */
  /* place-items, justify-items, align-items */
}
.element {
  /* place-self, justify-self, align-self: */
}
```

It's not only limited to flexbox and CSS Grid, it's also applicable to block layout:

<CodePen
  user="t_afif"
  slug-hash="QwbaBQX"
  title="Safe alignment with block containers"
  :default-tab="['css','result']"
  :theme="dark"/>

Note that `auto` margin is another alternative for safe alignment:

<CodePen
  user="t_afif"
  slug-hash="ByNJvJN"
  title="Safe alignment with auto margin"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More CSS Tips

- [**Invert CSS Shapes using shape()**](/css-tip.com/invert-shape.md) A simple trick to get the cut-out version of any shape created using shape(). July 01, 2025
- [**Dots loader using shape()**](/css-tip.com/dots-loader.md) A classic 3 dots loader created using the new shape(). June 24, 2025
- [**How to style a broken image**](/css-tip.com/broken-image.md) Give a nice visual touch to images that fail to load. May 22, 2025
- [**Arc shape with rounded edges**](/css-tip.com/arc-shape-rounded.md) A modern way to create arc shapes with rounded edges using minimal code. May 20, 2025

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Safe align your content",
  "desc": "Learn about the keyword ”safe” and how to use it",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/safe-align.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
