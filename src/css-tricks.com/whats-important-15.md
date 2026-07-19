---
lang: en-US
title: "What’s !important #15: Boundary-aware CSS, Time-based CSS, Full-bleed CSS, and More"
description: "Article(s) > What’s !important #15: Boundary-aware CSS, Time-based CSS, Full-bleed CSS, and More"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What’s !important #15: Boundary-aware CSS, Time-based CSS, Full-bleed CSS, and More"
    - property: og:description
      content: "What’s !important #15: Boundary-aware CSS, Time-based CSS, Full-bleed CSS, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-15.html
prev: /programming/css/articles/README.md
date: 2026-07-15
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/wi15.jpg
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
  name="What’s !important #15: Boundary-aware CSS, Time-based CSS, Full-bleed CSS, and More"
  desc="Read all about boundary-aware CSS, accessible grid lanes, time-based web designs, full-bleed, the customizable select, and new web platform features."
  url="https://css-tricks.com/whats-important-15"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/wi15.jpg"/>

Similar to [**last time**](/css-tricks.com/whats-important-14.md), **What’s !important #15** is pretty stacked — read all about boundary-aware CSS, making grid lanes accessible, creating time-based web designs, fixing full-bleed CSS, improving customizable `<select>`, new web platform features, and more.

---

## Using `view()` for boundary-aware CSS

[<VPIcon icon="iconfont icon-css-tricks"/>Preethi Sam](https://css-tricks.com/author/preethi/) very expertly walked us through [**the concept of boundary-aware CSS**](/master.dev/boundary-aware-styling-in-css.md). Using `view()`, Preethi was able to create a range of really useful effects, some of which I’ll share below:

<CodePen
  user="anon"
  slug-hash="bNgWwmr"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="yygbaxE"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="vEggMYE"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

I *also* wrote a little something for the Master.dev blog, about [**making interactive elements invisible but accessible**](/master.dev/how-to-make-an-interactive-element-invisible-but-accessible.md). It sounds like more work is needed to make it *fully* accessible, and that a new value for the `hidden` attribute could be the answer.

---

## Accessibility: A Grid Lanes Story

Dan Holloran wrote about [<VPIcon icon="fas fa-globe"/>grid lanes layout](https://danholloran.me/posts/css-grid-lanes-native-masonry-has-landed) (formerly [**“masonry layout”**](/css-tricks.com/masonry-layout-is-now-grid-lanes.md) or “that thing that Pinterest did”).

Manuel Matuzović said that [<VPIcon icon="fas fa-globe"/>it isn’t accessible](https://matuzo.at/blog/2026/grid-lanes-accessibility) (grid lanes layout, that is, not Dan’s article, which is great and gets straight to the point).

In a follow-up article a few days later, MM suggested [<VPIcon icon="fas fa-globe"/>using `reading-flow` to make grid lanes accessible](https://matuzo.at/blog/2026/grid-lanes-progressive-enhancement), which seems like the right call but hasn’t been tested yet.

---

## How to create time-based website designs

Sophie Koonin demonstrated [how to make a website change according to the time of day](https://localghost.dev/blog/time-based-background-colour-transitions-with-temporal-and-css-color-mix/) using the Temporal API and `color-mix()`. Enough said, that’s just awesome (like macOS’s dynamic wallpapers).

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/1-scaled.png?resize=2560%2C1606&ssl=1)

---

## A fix for full-bleed CSS

David Bushell showed us [**how to fix full-bleed CSS**](/dbushell.com/fixing-full-bleed-css.md). That is, how to make something span the entire horizontal viewport (*without any overflow — that’s the tricky part!*) despite being nested within another element. I just love to see old problems being solved with modern CSS (hint: it’s container query units).

![Source: [**David Bushell**](/dbushell.com/fixing-full-bleed-css.md)](https://css-tricks.com/wp-content/uploads/2026/07/2.avif)

And if that isn’t already cool enough, [**Temani Afif recently shared another breakout technique**](/css-tricks.com/get-ready-for-the-powerful-css-border-shape-property.md#breakout-decorations) right here on CSS-Tricks that uses the new `border-shape` property.

---

## A fix for CSS

Don’t you wish you could travel back in time and change a few things? We all do. In fact, [<VPIcon icon="fa-brands fa-css3-alt"/>the CSS Working Group lists some of the things it would change about CSS](https://wiki.csswg.org/ideas/mistakes/).

And that’s why [<VPIcon icon="iconfont icon-css-tricks"/>Declan Chidlow](https://css-tricks.com/author/declanchidlow/) created [<VPIcon icon="fas fa-globe"/>FixCSS](https://tangled.org/vale.rocks/FixCSS), which… *well*… fixes CSS in accordance with that. Now we can finally swap `border-radius` (the Ethan Tremblay of CSS) for `corner-radius`. All is right with the world again.

---

## How to improve customizable `<select>`

Jake Archibald demonstrated [<VPIcon icon="fas fa-globe"/>how to improve the UX of customizable `<select>`s](https://jakearchibald.com/2026/goldilocks-select-height/), addressing some sizing-related issues. It’s a must-read for anybody thinking about using customizable `<select>`.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/07/3.mp4" />
<!-- Source: [Jake Archibald](https://jakearchibald.com/2026/goldilocks-select-height/). -->

---

## 35 new web platform features

By “new” I mean anything from still-not-fully-supported-yet to recently released to upcoming. Either way, here’s Bramus and Una Kravets at Google I/O 2026 with [<VPIcon icon="fa-brands fa-chrome"/>35 web platform features](https://developer.chrome.com/blog/new-in-web-ui-io26) that you might not have heard of yet or might want to be reminded of:

<VidStack src="youtube/uT7MVcCQ4rw" />

::: info New web platform features and updates

- [<VPIcon icon="fa-brands fa-chrome"/>Chrome 150](https://developer.chrome.com/release_notes/150)
  - [<VPIcon icon="fa-brands fa-firefox"/>`AccentColor` and `AccentColorText`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/system-color#:~:text=AccentColor,Text%20of%20accented%20user%20interface%20controls) (now Baseline)
  - `<image>` support for [**`light-dark()`**](/css-tricks.com/almanac-functions/light-dark.md) (no Safari support)
  - Comma-separated [**container queries**](/css-tricks.com/css-container-queries.md) (no Safari support)
  - [<VPIcon icon="fa-brands fa-safari"/>`background-clip: border-area`](https://webkit.org/blog/16214/background-clip-border-area/) (no Firefox support)
    - Corner rounding for [<VPIcon icon="iconfont icon-w3c"/>`polygon()`](https://drafts.csswg.org/css-shapes-1/#funcdef-basic-shape-polygon) (no Safari or Firefox support)
    - Animatable [**`zoom`**](/css-tricks.com/almanac-properties/zoom.md) (no Safari or Firefox support)
    - [<VPIcon icon="iconfont icon-w3c"/>`text-fit`](https://drafts.csswg.org/css-text-5/#text-fit-property) (no Safari or Firefox support)
  - `flex-wrap: balance` (no Safari or Firefox support)
  - [<VPIcon icon="fa-brands fa-chrome"/>`named-feature()`](https://chromestatus.com/feature/5153932394102784) (no Safari or Firefox support)
  - The [<VPIcon icon="fa-brands fa-chrome"/>`focusgroup`](https://developer.chrome.com/blog/focusgroup-rfc) attribute (no Safari or Firefox support)
  - `overscroll-behavior: chain` (chaining with no overscroll, no Safari or Firefox support)

:::

What a couple of weeks! See you in another two!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #15: Boundary-aware CSS, Time-based CSS, Full-bleed CSS, and More",
  "desc": "Read all about boundary-aware CSS, accessible grid lanes, time-based web designs, full-bleed, the customizable select, and new web platform features.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-15.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
