---
lang: en-US
title: "What’s !important #13: @function, alpha(), CSS Wordle, and More"
description: "Article(s) > What’s !important #13: @function, alpha(), CSS Wordle, and More"
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
      content: "Article(s) > What’s !important #13: @function, alpha(), CSS Wordle, and More"
    - property: og:description
      content: "What’s !important #13: @function, alpha(), CSS Wordle, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-13.html
prev: /programming/css/articles/README.md
date: 2026-06-15
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/wi13.jpg
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
  name="What’s !important #13: @function, alpha(), CSS Wordle, and More"
  desc="CSS functions, the alpha() function, Grid Lanes, some things about Dialog that you might not know, CSS Wordle, and more — this is What’s !important right now."
  url="https://css-tricks.com/whats-important-13"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/wi13.jpg"/>

CSS functions, the `alpha()` function, Grid Lanes, some things about `<dialog>` that you might not know, CSS Wordle, and more — this is **What’s !important** right now.

---

## CSS functions, expertly explained

Jane Ori expertly explained [**how CSS functions work**](/blog.master.dev/the-fundamentals-and-dev-experience-of-css-function.md). `@function` will *probably* be the biggest CSS feature to *probably* become Baseline this year, so I definitely found it a bit intimidating at first. That is, until I read Jane’s baby-step-by-baby-step walkthrough, which eases you into it really well.

In addition, [<VPIcon icon="iconfont icon-css-tricks"/>Declan Chidlow](https://css-tricks.com/author/declanchidlow/) wrote our [**`@function` documentation**](/css-tricks.com/almanac-rules/function.md), which you might want to bookmark for quick reference in the future.

---

## The `alpha()` function

Speaking of functions, the `alpha()` function caught me by surprise. Firstly, because I hadn’t heard of it, and secondly, because…*why?* We can already change the alpha channel:

```css
/* This */
color: alpha(from var(--color) / 0.5);

/* Instead of this */
color: oklch(from var(--color) l c h / 0.5);
```

Well, [this comment (<VPIcon icon="iconfont icon-github"/>`mozilla/standards-positions`)](https://github.com/mozilla/standards-positions/issues/1396#issuecomment-4363280736) from Jason Leo sums it up. Firstly, it means that we won’t need to hard-code color values when we already have CSS variables. For years I’ve circumvented this by only storing the actual values in CSS variables, but having to wrap them in the color function every single time is *really* monotonous:

```css
/* Just the values */
--color: 0.65 0.23 230;

/* Then use them flexibly */
color: oklch(var(--color));
color: oklch(var(--color) / 0.5);
```

But it’s better than this (in my opinion):

```css
/* Function and values */
--color: oklch(0.65 0.23 230);

/* Delightful */
color: var(--color);

/* Delightless */
color: oklch(from var(--color) l c h / 0.5);
```

`alpha()` offers the best of both worlds:

```css
/* Less delightless */
color: alpha(from var(--color) / 0.5);
```

Secondly, the color format is actually irrelevant in this context, so `alpha(from var(--color) / 0.5)` communicates the intention more clearly than `oklch(from var(--color) l c h / 0.5)` does. It also makes the declaration inherently shorter.

Credit to Adam Argyle for [**bringing `alpha()` up**](/nerdy.dev/relative-alpha.md).

---

## The Field Guide to Grid Lanes

WebKit launched the [<VPIcon icon="fas fa-globe"/>Field Guide to Grid Lanes](https://gridlanes.webkit.org/) (formerly known as CSS masonry layout). If you’ve ever read one of our [**CSS-Tricks Guides**](/css-tricks.com/guides), it’s similar to that (*[<VPIcon icon="fa-brands fa-safari"/>their words](https://webkit.org/blog/18098/introducing-the-field-guide-to-grid-lanes/) — just sayin’*). It’s a smooth introduction with a variety of barebones and real-world demos.

![Six CSS Grid Lanes demos organized in a three-by-two grid — Photos, Recipes, Newspaper, Mega Menu, Timeline, and Pinboard.<br/>Source: [<VPIcon icon="fas fa-globe"/>WebKit](https://gridlanes.webkit.org/).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/1-scaled.png?resize=2560%2C1539&ssl=1)

---

## Quality-of-life upgrades for `<dialog>`

Una Kravets talked about two [quality-of-life upgrades for `<dialog>` (<VPIcon icon="fa-brands fa-bluesky"/>`una.im`)](https://bsky.app/profile/una.im/post/3mnf4c2gb5s2m) — the new `closedby` attribute, which isn’t supported by Safari yet, and `overscroll-behavior: contain`. There are some nuggets in the comments too, including a tip about `scrollbar-gutter: stable`.

Also, Chris Coyier showed us [**how to animate `<dialog>`s**](/blog.master.dev/in-n-out-animations-dialogs-part-1-3.md), which I think many of us know how to do already, but it’s so easy to mess up. I have to Google it every time (it’s those bleeping `@starting-style`s).

---

## What happened at CSS Day 2026?

[<VPIcon icon="fas fa-globe"/>CSS Day](https://cssday.nl/), the annual CSS community conference, was held in Amsterdam on the 11th and 12th of this month (so two days, technically). While there wasn’t a livestream this year, recordings will become available in late June. Until then, check out [CSS Day on Bluesky (<VPIcon icon="fa-brands fa-bluesky"/>`cssday.nl`)](https://bsky.app/profile/cssday.nl) as well as the [<VPIcon icon="fa-brands fa-bluesky"/>#CSSDay Bluesky feed](https://bsky.app/search?q=%23cssday) to see what happened on stage, what happened behind the scenes, and even the slides from some of the talks.

![Portrait photos of the event speakers for CSS Day 2026.<br/>Source: [<VPIcon icon="fas fa-globe"/>CSS Day](https://cssday.nl/).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/2.webp?resize=1200%2C656&ssl=1)

And no, there weren’t any flamethrowers this year, but it wasn’t DOOM-free either (if you know, you know).

---

## CSS Wordle

What a week it’s been, especially with everything that transpired at CSS Day, but if you have any energy left I highly recommend a round (or several rounds) of [<VPIcon icon="iconfont icon-css-tricks"/>Sunkanmi Fafowora](https://css-tricks.com/author/sunkanmifafowora/)’s [<VPIcon icon="fas fa-globe"/>CSS Wordle](https://css-questions.com/css-wordle), which I’ve literally been obsessed with for the last week.

![An online game interface for CSS Wordle featuring a completed puzzle.<br/>Source: [<VPIcon icon="fas fa-globe"/>CSS-Questions](https://css-questions.com/css-wordle) (don’t worry, this was yesterday’s answer).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/3-scaled.png?resize=2560%2C1607&ssl=1)

::: info New web platform features and updates

- [<VPIcon icon="fa-brands fa-chrome"/>Chrome 149](https://developer.chrome.com/release-notes/149)
  - [<VPIcon icon="fa-brands fa-chrome"/>Gap decorations](https://developer.chrome.com/blog/gap-decorations-stable) (now Baseline)
  - [**`image-rendering: crisp-edges`**](/css-tricks.com/almanac-properties/image-rendering.md#:~:text=crisp%2Dedges%3A%20the%20contrast%2C%20colors%20and%20edges%20of%20the%20image%20will%20be%20preserved%20without%20any%20smoothing%20or%20blurring.%20This%20is%20intended%20for%20icons%2C%20data%20visualizations%2C%20diagrams%2C%20maps%2C%20pixel%20art%2C%20and%20anything%20with%20lines.%20This%20value%20applies%20to%20images%20scaled%20up%20or%20down.) (now Baseline)
  - [<VPIcon icon="fa-brands fa-firefox"/>`rect()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/basic-shape/rect) and [**`xywh()`**](/css-tricks.com/almanac-functions/xywh.md) for [**`shape-outside`**](/css-tricks.com/almanac.md#properties/s/shape-outside/) (now Baseline)
  - [**`path()`**](/css-tricks.com/almanac-functions/path.md) and [**`shape()`**](/css-tricks.com/almanac-functions/shape.md) for [**`shape-outside`**](/css-tricks.com/almanac-properties/shape-outside.md) (no Safari or Firefox support)

Until next time!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #13: @function, alpha(), CSS Wordle, and More",
  "desc": "CSS functions, the alpha() function, Grid Lanes, some things about Dialog that you might not know, CSS Wordle, and more — this is What’s !important right now.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-13.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
