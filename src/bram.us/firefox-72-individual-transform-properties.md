---
lang: en-US
title: "Individual CSS Transform Properties"
description: "Article(s) > Individual CSS Transform Properties"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Individual CSS Transform Properties"
    - property: og:description
      content: "Individual CSS Transform Properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/firefox-72-individual-transform-properties.html
prev: /programming/css/articles/README.md
date: 2020-01-09
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2020/01/css-individual-transform-props.png
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
  name="Individual CSS Transform Properties"
  desc="# Individual Transform Properties New in Firefox 72 is the ability to individually define CSS Transform Properties. You can now separately define scale, rotate, and translate CSS properties, instead of having to chuff them all into one single transform property. The translate, rotate, and scale properties allow authors to specify simple transforms independently, in a … Continue reading ”Individual CSS Transform Properties”"
  url="https://bram.us/2020/01/09/firefox-72-individual-transform-properties/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2020/01/css-individual-transform-props.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2020/01/css-individual-transform-props.png)

## Individual Transform Properties

[<VPIcon icon="fa-brands fa-firefox"/>New in Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/72) 72 is the ability to individually define CSS Transform Properties. You can now separately define [<VPIcon icon="fa-brands fa-firefox"/>`scale`](https://developer.mozilla.org/en-US/docs/Web/CSS/scale), [<VPIcon icon="fa-brands fa-firefox"/>`rotate`](https://developer.mozilla.org/en-US/docs/Web/CSS/rotate), and [<VPIcon icon="fa-brands fa-firefox"/>`translate`](https://developer.mozilla.org/en-US/docs/Web/CSS/translate) CSS properties, instead of having to chuff them all into one single `transform` property.

> The `translate`, `rotate`, and `scale` properties allow authors to specify simple transforms independently, in a way that maps to typical user interface usage, rather than having to remember the order in `transform` that keeps the actions of `transform()`, `rotate()` and `scale()` independent and acting in screen coordinates.

```css
element {
  scale: 2;
  rotate: 30deg;
  translate: -50% -50%;
}
```

By having individual transform props, this also means that we can animate and transition them separately.

```css
@keyframes individual {
  50% {
    translate: 0 50%;
  }
  75% {
    scale: 1;
  }
}
```

```css
element {
  transition:
    rotate 200ms ease-in-out,
    scale 500ms linear;
}

element:hover {
  scale: 2;
  rotate: -3deg;
}
```

---

## A note about the order in which these are applied

Unlike when using a `transform()`, the order is not applied from left to right. The order in which these are applied in is first `translate`, then `rotate`, and then `scale`. This is [<VPIcon icon="iconfont icon-w3c"/>defined in the CSS Transforms Level 2 spec](https://drafts.csswg.org/css-transforms-2/#ctm).

---

## Demo

Here’s a pen demonstrating its usage:

<CodePen
  user="bramus"
  slug-hash="mdyxwQZ"
  title="Individual CSS Transform Properties Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Browser Support

::: note 💡

Although this post was originally published in January 2020, the section below is constantly being updated. *Last update: August 2, 2022*.

:::

This table below shows an up-to-date list of browser support:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-chrome"/>*(Blink)*

✅ Support as of Chromium 104

@tab <VPIcon icon="fa-brands fa-firefox"/>*(Gecko)*

✅ Support as of Firefox 72

@tab <VPIcon icon="fa-brands fa-safari"/>*(WebKit)*

✅ Support as of Safari 14.1

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Individual CSS Transform Properties",
  "desc": "# Individual Transform Properties New in Firefox 72 is the ability to individually define CSS Transform Properties. You can now separately define scale, rotate, and translate CSS properties, instead of having to chuff them all into one single transform property. The translate, rotate, and scale properties allow authors to specify simple transforms independently, in a … Continue reading ”Individual CSS Transform Properties”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/firefox-72-individual-transform-properties.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
