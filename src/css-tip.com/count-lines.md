---
lang: en-US
title: "Count the number of lines inside a text"
description: "Article(s) > Count the number of lines inside a text"
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
      content: "Article(s) > Count the number of lines inside a text"
    - property: og:description
      content: "Count the number of lines inside a text"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/count-lines.html
prev: /programming/css/articles/README.md
date: 2024-07-29
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/2b8b0043.png
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
  name="Count the number of lines inside a text"
  desc="A CSS-only solution to count the lines of text"
  url="https://css-tip.com/count-lines/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/2b8b0043.png"/>

- [Previous CSS Tip](/element-dimension/ "Get the width & height of any element without JavaScript")
- [Next CSS Tip](/scrollbar-width/ "Get the width of the scrollbar using only CSS")

# Count the number of lines inside a text

July 29, 2024

By adjusting the code of [the previous tip (getting the width/height of any element)](/element-dimension/) we can do some intresting counting. For example, we can count the number of lines inside a text.

```css
@property --_y {  syntax: "<number>";  inherits: true;  initial-value: 0; }@property --h {  syntax: "<integer>";  inherits: true;  initial-value: 0; }body {  timeline-scope: --cy;}/* the text container  */.container {  overflow: auto;  position: relative;}.container:before {  content:"";  position: absolute;  left: 0;  top: 0;  height: 1lh; /* instead of 1px we use 1lh (the height of a line box) */  view-timeline: --cy block;}/* the element that will show the count */.count {  --h:calc(1/(1 - var(--_y)));  animation: y 1s linear;  animation-timeline: --cy;  animation-range: entry 100% exit 100%;}.count:before {  content: counter(h);  counter-reset: h var(--h);}@keyframes y {to{--_y:1}}
```

Here is a static demo:

<CodePen
  user="t_afif"
  slug-hash="preview/BagKWdm"
  title="Counting the number of lines inside a text"
  :default-tab="['css','result']"
  :theme="dark"/>

Here is a version where you can edit the content. The number of lines will adjust based on the content you will enter.

<CodePen
  user="t_afif"
  slug-hash="preview/RwzapLK"
  title="Dynamic line counting"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info More detail

```component VPCard
{
  "title": "How to Get the Width/Height of Any Element in Only CSS",
  "desc": "Unlike JavaScript, there is no simple built-in method in CSS to access an element's width and height. But using some (call it hacky) modern CSS techniques, we can get our hands on the number and even use it.",
  "link": "/frontendmasters.com/how-to-get-the-width-height-of-any-element-in-only-css.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## More CSS Tips

- [**A CSS generator for wavy circle shapes**](/css-tip.com/wavy-circles.md) Use modern CSS to create a wavy circle shape in no time. August 13, 2024

```component VPCard
{
  "title": "Arc shape with rounded edges",
  "desc": "a few lines of modern CSS to create an arc shape with rounded edges",
  "link": "/css-tip.com/arc-shape.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

- [**Calculate the scroll progress of an arbitrary element**](/css-tip.com/scroll-progress-2.md) A few lines of CSS to get the scroll progress of any element in the page. July 24, 2024
- [**Calculate the scroll progress of the page**](/css-tip.com/scroll-progress.md) A few lines of CSS to get the scroll progress of the page inside a CSS variable. July 23, 2024

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Count the number of lines inside a text",
  "desc": "A CSS-only solution to count the lines of text",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/count-lines.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
