---
lang: en-US
title: "What’s !important #18: <geolocation>, Syntax ::highlight()ing, named-feature(), and More"
description: "Article(s) > What’s !important #18: <geolocation>, Syntax ::highlight()ing, named-feature(), and More"
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
      content: "Article(s) > What’s !important #18: <geolocation>, Syntax ::highlight()ing, named-feature(), and More"
    - property: og:description
      content: "What’s !important #18: <geolocation>, Syntax ::highlight()ing, named-feature(), and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-18.html
prev: /programming/css/articles/README.md
date: 2026-08-31
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/wi18.jpg
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
  name="What’s !important #18: <geolocation>, Syntax ::highlight()ing, named-feature(), and More"
  desc="Well, that’s a wrap. No, not a flex-wrap, but rather today marks a new day, week, month, season, aaaand new edition of What’s important (#18), bringing you the best content that developers have produced over the last couple of weeks or so."
  url="https://css-tricks.com/whats-important-18"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/wi18.jpg"/>

Well, that’s a wrap. No, not a `flex-wrap`, but rather today marks a new day, week, month, season, *aaaand* new edition of **What’s !important (#18)**, bringing you the best content that CSS developers have produced over the last couple of weeks or so.

---

## How to create delayed-then-instant tooltips (and why)

Abhishek Jakhar explained [**why tooltips should be delayed then instant**](/blog.master.dev/tooltips-need-a-delay-and-then-they-need-to-skip-it.md) (basically, so that we don’t trigger them accidentally, and then when we don’t want them anymore, so that they disappear immediately). Abhishek showed us how to implement all of that, too. One thing that I’d like to point out is that if the hover-able region is too small, the tooltip can be de-triggered unintentionally, so I’d keep the delay in *that* case.

<CodePen
  user="anon"
  slug-hash="GgrYMOo"
  title="Warm Tooltips"
  :default-tab="['css','result']"
  :theme="dark"/>

Chris Coyier then responded to that with [**a modern implementation that utilizes interest invokers**](/blog.master.dev/delayed-then-instant-tooltips-with-html-css-alone.md), which come with two key CSS properties: `interest-delay-start` and `interest-delay-end`. Only Chrome supports interest invokers at the moment, but progressive enhancement, right?

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019ff341-f6c6-791f-8edd-e6043b80a6cf"
  title="Hover Tooltip with Delay"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## `<geolocation>` and how to use it today

Speaking of progressive enhancement, the Geolocation API has always been complicated because of all of the external hardware involved (GPS satellites, Wi-Fi networks, cellular towers, etc.) and how frustrating it can be to change the permission status later. `<geolocation>` fixes a lot of that but introduces a few new quirks. For example, there are some…*styling restrictions*.

![Two location permission Chrome dialogs offering options to manage location access settings.<br/>Source: [Piccalilli](/piccalil.li/a-look-at-the-geolocation-html-element-and-how-it-works.md)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/image.png?resize=1024%2C373&ssl=1)

And since only Chrome supports it, I explained [**how to use `<geolocation>` alongside the current Geolocation API**](/piccalil.li/a-look-at-the-geolocation-html-element-and-how-it-works.md), which means that you can use it today, essentially.

---

## MicroLighter: a `::highlight()`-`-based syntax highlighter

Dave Rupert made a small syntax highlighter called [<VPIcon icon="fas fa-globe"/>MicroLighter](https://davatron5000.github.io/microlighter/) using the new [**Custom Highlight API**](/piccalil.li/working-with-highlight-using-progressive-enhancement.md). He also showed us [<VPIcon icon="fas fa-globe"/>how to use MicroLighter](https://daverupert.com/2026/08/microlighter/), and [**Geoff talked a bit about it**](/css-tricks.com/microlighter-syntax-highlighter.md) too.

![A web page for MicroLighter, displaying feature highlights and installation instructions.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/08/2-1.png?resize=1024%2C643&ssl=1)

---

## How to get CSS grid information into CSS variables

[<VPIcon icon="iconfont icon-css-tricks"/>Temani Afif](https://css-tricks.com/author.md#afiftemani/) demonstrated [**how to get CSS grid information into CSS custom properties**](/css-tip.com/grid-information.md). Specifically, how to get the number of rows and columns, as well as the coordinates (x/y indexes) of each cell. The only condition is that the columns must have equal widths, but with the way that CSS has been evolving lately, that could definitely change.

<CodePen
  user="anon"
  slug-hash="vEgqgob"
  title="Grid information (chrome-only)"
  :default-tab="['css','result']"
  :theme="dark"/>

Temani also showed us how we can [**use this to determine hover proximity**](/blog.master.dev/hover-proximity-using-modern-css.md), which is *very* cool:

<CodePen
  user="anon"
  slug-hash="EaZJrEy"
  title="Hover Proximity with scroll-driven animations"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Dark mode: two-state or tri-state?

[<VPIcon icon="fas fa-globe"/>Lea Verou says two-state](https://lea.verou.me/blog/2026/dark-mode-toggles/), but [**Bramus says tri-state**](/bram.us/the-case-for-tri-state-dark-mode-toggles.md) — what do you say? Personally, I like the [<VPIcon icon="fas fa-globe"/>auto-until-overridden two-state approach](https://vale.rocks/micros/20260810-0330), as described by [<VPIcon icon="iconfont icon-css-tricks"/>Vale.Rocks](https://css-tricks.com/author/declanchidlow):

<CodePen
  link="https://codepen.io/editor/OuterVale/pen/019fe98c-2d9b-71e4-849d-726543589635"
  title="Light/Dark/System Theme Setting"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## An introduction to the class prefix selector

Bramus also introduced [**the class prefix selector**](/bram.us/the-future-of-css-target-multiple-classes-with-the-class-prefix-selector.md), which, even though it isn’t supported anywhere yet, is very simple and very useful (as you can see below), so I’m expecting a quick turnaround on this one.

```css
.something-* {
  /* ... */
}
```

This is cleaner and more performant than attribute selectors:

```css
[class^="something-"] {
  /* Matches class="something-xxx" */
}

[class*=" something-"] {
  /* Matches class="xxx something-xxx" */
}

[class*="something-"] {
  /* Matches class="my-something-xxx" */
}
```

Here’s [**what Geoff had to say about the class prefix selector**](/css-tricks.com/resolved-css-class-prefix-selector.md).

---

## ` function

Bramus (who is kind of on a roll here, to be honest), also introduced [**the `@supports named-feature()` function**](/bram.us/feature-detecting-undetectable-css-features-with-supports-named-feature.md). This one’s supported by Chrome though, and basically queries support for very specific things that would otherwise be impossible to query, such as whether the browser respects transforms when anchor positioning elements, but hopefully it makes `@supports` more capable all-round.

---

## How to balance wrapped flex items across rows or columns

What’s also new to Chrome is `flex-wrap: balance`, which is basically [<VPIcon icon="fas fa-globe"/>`text-wrap: balance`](https://blog.stephaniestimac.com/posts/2023/10/css-text-wrap/) but for flex items. Ahmad Shadeed explained [**what `flex-wrap: balance` does and what we can use it for**](/ishadeed.com/flex-wrap-balance.md).

---

## New web platform features and updates

- [<VPIcon icon="fa-brands fa-firefox"/>Firefox 154](https://firefox.com/en-GB/firefox/154.0/releasenotes/)
  - [**`sibling-count()`**](/css-tricks.com/almanac-functions/sibling-count.md) and [**`sibling-index()`**](/css-tricks.com/almanac-functions/sibling-index.md) (now Baseline)
  - [**`text-box-trim`**](/css-tricks.com/almanac-properties/text-box-trim.md), [**`text-box-edge`**](/css-tricks.com/almanac-properties/text-box-edge.md), and [**`text-box`**](/css-tricks.com/almanac-properties/text-box.md) (now Baseline)
- [<VPIcon icon="fa-brands fa-chrome"/>Chrome 152](https://developer.chrome.com/release-notes/152)
  - [<VPIcon icon="fa-brands fa-firefox"/>`autocorrect`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autocorrect) (now Baseline)
  - [<VPIcon icon="fa-brands fa-firefox"/>`alpha()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/alpha) (Safari and Firefox support to follow)
  - [OpaqueRange (<VPIcon icon="iconfont icon-github"/>`MicrosoftEdge/MSEdgeExplainers`)](https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/OpaqueRange/explainer.md) (no Safari or Firefox support)
  - [<VPIcon icon="fa-brands fa-firefox"/>`CSSPseudoElement`](https://developer.mozilla.org/en-US/docs/Web/API/CSSPseudoElement) support for `::backdrop`, `::scroll-marker`, and `::view-transition` (no Safari or Firefox support)

Autumn/fall, here we come!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #18: <geolocation>, Syntax ::highlight()ing, named-feature(), and More",
  "desc": "Well, that’s a wrap. No, not a flex-wrap, but rather today marks a new day, week, month, season, aaaand new edition of What’s important (#18), bringing you the best content that developers have produced over the last couple of weeks or so.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-18.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
