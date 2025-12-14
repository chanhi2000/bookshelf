---
lang: en-US
title: "Full-bleed layout with modern CSS"
description: "Article(s) > Full-bleed layout with modern CSS"
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
      content: "Article(s) > Full-bleed layout with modern CSS"
    - property: og:description
      content: "Full-bleed layout with modern CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tip.com/full-bleed-layout.html
prev: /programming/css/articles/README.md
date: 2024-11-26
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tip.com/about
cover: https://css-tip.com/og-images/904b910a.png
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
  name="Full-bleed layout with modern CSS"
  desc="A few lines of code to make a section extend to the edges of the screen"
  url="https://css-tip.com/full-bleed-layout/"
  logo="https://css-tip.com/img/fav.png"
  preview="https://css-tip.com/og-images/904b910a.png"/>

Use modern CSS and a few lines of code to create a full-bleed layout.

**Full-bleed**? It's when an element needs to bleed outside the main container and extend to the edge of the page.

![CSS-only zig-zag borders](https://css-tip.com/img/Zu0r1t7fxP-935.png)

```css
html {
  container-type: inline-size;
}
main {
  --w: 600px; /* the max-width */
  --m: 1em;   /* margin on small screen */
  
  margin-inline: max(   var(--m),50cqw - var(--w)/2);
}
.full-bleed {
  margin-inline: min(-1*var(--m),var(--w)/2 - 50cqw);
}
```

Another more-compact syntax

```css
html {
  container-type: inline-size;
}
main {
  --_m: max(1em,50cqw - 600px/2);
  margin-inline: var(--_m);
}
.full-bleed {
  margin-inline: calc(-1*var(--_m));
}
```

<CodePen
  user="t_afif"
  slug-hash="vEBBoWj"
  title="Full-bleed layout with modern CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Check the following to understand why `margin-inline` and `max()`: [**"max-width + centering with one instruction"**](/css-tip.com/center-max-width.md)

---

Here are other variations with different margin behaviors

```css
html {
  container-type: inline-size;
}
main {
  --w: 600px; /* the max width*/
  --m: 1em;   /* minimum margin */
  
  margin-inline: max(var(--m),50cqw - var(--w)/2);
}
.full-bleed-2 {
  margin-inline: min(-1*var(--m),var(--w)/2 - 50cqw + var(--m));
}
.full-bleed-3 {
  margin-inline: min(0px        ,var(--w)/2 - 50cqw);
}
.full-bleed-4 {
  margin-inline: min(0px        ,var(--w)/2 - 50cqw + var(--m));
}
```

Resize the below demo to see the difference

<CodePen
  user="t_afif"
  slug-hash="PwYYMRX"
  title="Full-bleed layout variations"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: info More CSS Tips

- [**A new way to center block elements using place-self**](/css-tip.com/center-block-element.md) A modern way to center block elements using place-self instead of auto margin and max-width. December 06, 2024

```component VPCard
{
  "title": "Border-only breadcrumb shape using modern CSS",
  "desc": "A few lines of code to create a border-only breadcrumb shape that you can easily adjust",
  "link": "/css-tip.com/border-only-breadcrumb.md",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```

- [**Vertical rounded tabs using CSS mask**](/css-tip.com/vertical-rounded-tab.md) A few lines of code to get vertical rounded tabs using CSS mask. November 15, 2024
- [**Get the scrollbar width using only CSS**](/css-tip.com/width-scrollbar.md) A few lines of code to get the scrollbar width within a CSS variable. November 14, 2024

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Full-bleed layout with modern CSS",
  "desc": "A few lines of code to make a section extend to the edges of the screen",
  "link": "https://chanhi2000.github.io/bookshelf/css-tip.com/full-bleed-layout.html",
  "logo": "https://css-tip.com/img/fav.png",
  "background": "rgba(111,162,204,0.2)"
}
```
