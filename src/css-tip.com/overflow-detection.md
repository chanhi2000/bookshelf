---
lang: en-US
title: "Overflow/scrollbar detection using modern CSS"
description: "Article(s) > Overflow/scrollbar detection using modern CSS"
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
      content: "Article(s) > Overflow/scrollbar detection using modern CSS"
    - property: og:description
      content: "Overflow/scrollbar detection using modern CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/overflow-detection.html
prev: /programming/css/articles/README.md
date: 2024-12-10
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/7184f9cf.png
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
  name="Overflow/scrollbar detection using modern CSS"
  desc="Using scroll-driven animations you can detect when an element is overflowing or has a scrollbar"
  url="https://css-tip.com/overflow-detection/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/7184f9cf.png"/>

Do you want to detect if an element is having an overflow or if it's scrollable? It's possible with scroll-driven animation! You can also store this information within a variable at `:root` level and do whatever you want (like styling any elements on the page)

```css
:root {
  timeline-scope: --scroll;
  animation: --scroll forwards;
  animation-timeline: --scroll;
  container-name: --scroll;
}
.box { /* the concerned element */
  overflow: auto; /* or hidden */
  scroll-timeline: --scroll y; /* OR --scroll x for horizontal overflow */
}
@keyframes --scroll {
  0%,to{--scroll: 1;}
}
@container --scroll style(--scroll: 1) {
  /* The CSS when .box is overflowing 
     you can target any element on the page!
  */
}
/* Yes you can use --scroll everywhere! */
```

Resize the `.box` element in the demo below and see the magic! (chrome only for now)

<CodePen
  user="t_afif"
  slug-hash="GgKZBWX"
  title="Overflow detection using only CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

You can also combine the detection of both horizontal and vertical scrolling:

```css
:root {
  timeline-scope: --scroll-x,--scroll-y;
  animation: --scroll-x forwards,--scroll-y forwards;
  animation-timeline: --scroll-x, --scroll-y;
  container-name: --scroll;
}
.box { /* the concerned element */
  overflow: auto; /* or hidden */
  scroll-timeline: --scroll-x x,--scroll-y y;
}
@keyframes --scroll-x {
  0%,to{--scroll-x: 1;}
}
@keyframes --scroll-y {
  0%,to{--scroll-y: 1;}
}
@container --scroll style(--scroll-x: 1) {
 /* The CSS when .box is overflowing horizontally */
}
@container --scroll style(--scroll-y: 1) {
 /* The CSS when .box is overflowing vertically */
}
@container --scroll style(--scroll-x: 1) and (style(--scroll-y: 1)) {
 /* The CSS when .box is overflowing horizontally AND vertically */
}
```

<CodePen
  user="t_afif"
  slug-hash="jEWeOzN"
  title="Overflow detection using only CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

The use of style query is not mandatory and you can have a simpler version if you want to target the concerned element.

```css
.box {
  overflow: auto; /* or hidden */
  animation: scrolling forwards;
  animation-timeline: scroll(y self); /* OR scroll(x self) for horizontal overflow  */
}
@keyframes scrolling {
  0%,to{
    /* the CSS applied to .box when it has overflow */
  }
}
```

Or a child element

```css
.box {
  overflow: auto; /* or hidden */
}
.box .child {
  animation: scrolling forwards;
  /* it will consider the ancestor having overflow: auto/hidden  */
  animation-timeline: scroll(y); /* or scroll(x) for horizontal scroll */ 
}
@keyframes scrolling {
  0%,to{
    /* the CSS applied to .child when .box has overflow */
  }
}
```

<CodePen
  user="t_afif"
  slug-hash="ZYzOaZp"
  title="Overflow detection using only CSS (simple version)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: info More CSS Tips

- [**Running animations without keyframes**](/css-tip.com/animation-without-keyframes.md) A new way to create animations without relying on keyframes. January 09, 2025
- [**A CSS-only clock showing the current time**](/css-tip.com/clock.md) Use modern CSS (and some hacks) to show the current time using only CSS. January 07, 2025

```component VPCard
{
  "title": "Border-only breadcrumb shape using modern CSS",
  "desc": "A few lines of code to create a border-only breadcrumb shape that you can easily adjust",
  "link": "/css-tip.com/border-only-breadcrumb.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

- [**Glowing border animation with a smooth stop**](/css-tip.com/glowing-border.md) Add a fancy border animation on hover that stops smoothly on mouseout. December 03, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Overflow/scrollbar detection using modern CSS",
  "desc": "Using scroll-driven animations you can detect when an element is overflowing or has a scrollbar",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/overflow-detection.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
