---
lang: en-US
title: "Get the scrollbar width using only CSS"
description: "Article(s) > Get the scrollbar width using only CSS"
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
      content: "Article(s) > Get the scrollbar width using only CSS"
    - property: og:description
      content: "Get the scrollbar width using only CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/width-scrollbar.html
prev: /programming/css/articles/README.md
date: 2024-11-14
isOriginal: false
author:
  - name: Temani Afif
    url: https://css-tip.com/about
cover: https://css-tip.com/og-images/34733082.png
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
  name="Get the scrollbar width using only CSS"
  desc="A few lines of code to get the scrollbar width within a CSS variable"
  url="https://css-tip.com/width-scrollbar/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/34733082.png"/>

Do you want to know the scrollbar width? It's possible using only CSS and a few lines of code! You can get the pixel value within a CSS variable and use it everywhere.

As a bonus, you can also have an integer value!

```css
@property --scrollbar {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px; 
}
html {
  container-type: inline-size;
}
body {
  --scrollbar: calc(100vw - 100cqw);
  /* 
     100cqw is the html width  
     100vw  is the viewport width 
     the difference is the scrollbar width 🤩
  */
}

/* As a bonus, you can have an interger value and show it */
body:before {
  content: counter(val) "px";
  counter-reset: val tan(atan2(var(--scrollbar),1px));
}
```

Tested on Chrome

<CodePen
  user="t_afif"
  slug-hash="MWNLNvz"
  title="CSS-only scrollbar width"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More CSS Tips

- [**Full-bleed layout with modern CSS**](/css-tip.com/full-bleed-layout.md) A few lines of code to make a section extend to the edges of the screen. November 26, 2024
- [**How to correctly use steps() with animations**](/css-tip.com/steps.md) The default behavior of steps() is not intuitive so learn how to use it correctly. November 18, 2024
- [**Indent each line of your text**](/css-tip.com/text-indent.md) A new value of text-indent that allows you to indent each line of text. November 04, 2024
- [**Select the last occurrence of an element in the whole document**](/css-tip.com/last-element-dom.md) Select the last occurrence of any element in the whole document. October 31, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Get the scrollbar width using only CSS",
  "desc": "A few lines of code to get the scrollbar width within a CSS variable",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/width-scrollbar.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
