---
lang: en-US
title: "What’s !important #7: random(), Folded Corners, Anchored Container Queries, and More"
description: "Article(s) > What’s !important #7: random(), Folded Corners, Anchored Container Queries, and More"
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
      content: "Article(s) > What’s !important #7: random(), Folded Corners, Anchored Container Queries, and More"
    - property: og:description
      content: "What’s !important #7: random(), Folded Corners, Anchored Container Queries, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-7.html
prev: /programming/css/articles/README.md
date: 2026-03-16
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/wi7.png
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
  name="What’s !important #7: random(), Folded Corners, Anchored Container Queries, and More"
  desc="For this issue of What’s !important, we have a healthy balance of old CSS that you might’ve missed and new CSS that you don’t want to miss. This includes random(), random-item(), folded corners using clip-path, backdrop-filter, font-variant-numeric: tabular-nums, the Popover API, anchored container queries, anchor positioning in general, DOOM in CSS, the customizable select element, :open, scroll-triggered animations, the toolbar element, and somehow, more."
  url="https://css-tricks.com/whats-important-7"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/wi7.png"/>

For this issue of **What’s !important**, we have a healthy balance of old CSS that you might’ve missed and *new* CSS that you don’t want to miss. This includes `random()`, `random-item()`, folded corners using `clip-path`, `backdrop-filter`, `font-variant-numeric: tabular-nums`, the Popover API, anchored container queries, anchor positioning in general, DOOM in CSS, customizable `<select>`, `:open`, scroll-triggered animations, `<toolbar>`, and somehow, more.

Let’s dig in.

---

## Understanding `random()` and `random-item()`

Alvaro Montoro explains [<VPIcon icon="fas fa-globe"/>how the `random()` and `random-item()` CSS functions work](https://alvaromontoro.com/blog/68092/native-random-values-in-css). As it turns out, they’re actually quite complex:

```css
width: random(--w element-shared, 1rem, 2rem);
color: random-item(--c, red, orange, yellow, darkkhaki);
```

---

## Creating folded corners using `clip-path`

My first solution to folded corners involved actual images. Not a *great* solution, but that was the way to do it in the noughties. Since then we’ve been able to [do it with `box-shadow` (<VPIcon icon="fa-brands fa-codepen" />`abouzia`)](https://codepen.io/abouzia/pen/eBErgV), but Kitty Giraudel has come up with a [<VPIcon icon="fas fa-globe"/>CSS `clip-path` solution](https://kittygiraudel.com/2026/03/05/folded-corner-with-css/) that clips a custom shape (hover the kitty to see it in action):

<CodePen
  user="anon"
  slug-hash="raNoZLr"
  title="Folded corners"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Revisiting `backdrop-filter` and `font-variant-numeric: tabular-nums`

[<VPIcon icon="fas fa-globe"/>Stuart Robson talks about `backdrop-filter`](https://alwaystwisted.com/articles/beyond-the-blur-css-backdrop-filter). It’s not a new CSS property, but it’s very useful and hardly ever talked about. In fact, up until now, I thought that it was for the `::backdrop` pseudo-element, but we can actually use it to create all kinds of background effects for all kinds of elements, like this:

<CodePen
  user="anon"
  slug-hash="bNwEKqM"
  title="backdrop-filter: glass overlay"
  :default-tab="['css','result']"
  :theme="dark"/>

`font-variant-numeric: tabular-nums` is another one. This property and value prevents layout shift when numbers change dynamically, as they do with live clocks, counters, timers, financial tables, and so on. [<VPIcon icon="fas fa-globe"/>Amit Merchant walks you through it](https://amitmerchant.com/one-css-property-that-makes-numbers-look-instantly-better/) with this demo:

<CodePen
  user="anon"
  slug-hash="dPpMNVd"
  title="Tabular Numbers Demo"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info Getting started with the Popover API

Godstime Aburu does [**a deep dive on the Popover API**](/smashingmagazine.com/getting-started-popover-api.md), a new(ish) but everyday web platform feature that simplifies tooltip and tooltip-like UI patterns, but isn’t without its nuances.

```component VPCard
{
  "title": "Getting Started With The Popover API",
  "desc": "What happens if you rebuild a single tooltip using the browser’s native model without the aid of a library? The Popover API turns tooltips from something you simulate into something the browser actually understands. Opening and closing, keyboard interaction, Escape handling, and much of the accessibility now come from the platform itself, not from ad-hoc JavaScript.",
  "link": "/smashingmagazine.com/getting-started-popover-api.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

---

## Unraveling yet another anchor positioning quirk

Just [**another anchor positioning quirk**](/frontendmasters.com/the-big-gotcha-of-anchor-positioning.md), this time from Chris Coyier. These quirks have been piling up for a while now. *We’ve* talked about them [**time**](/css-tricks.com/anchor-positioning-quirks.md) and [**time again**](/css-tricks.com/yet-another-anchor-positioning-quirk.md), but the thing is, they’re *not* bugs. Anchor positioning works in a way that isn’t commonly understood, so Chris’ article is definitely worth a read, as are the articles that he references.

---

## Building dynamic toggletips using anchored container queries

In this walkthrough, I demonstrate [**how to build dynamic toggletips using anchored container queries**](/piccalil.li/building-dynamic-toggletips-using-anchored-container-queries.md). Also, I ran into an anchor positioning quirk, so if you’re looking to solidify your understanding of all that, I think the walkthrough will help with that too.

Demo (full effect requires Chrome 143+):

<CodePen
  user="anon"
  slug-hash="gbrMGYx"
  title="Anchored container queries demo"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info DOOM in CSS

<SiteInfo
  name="Niels Leenheer (@html5test.com)"
  desc="DOOM fully rendered in CSS. Every surface is a <div> that has a background image, with a clipping path with 3D transforms applied. Of course CSS does not have a movable camera, so we rotate and translate the scene around the user."
  url="https://bsky.app/profile/html5test.com/post/3mgxr3pcjhk2k/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://video.bsky.app/watch/did%3Aplc%3Afdu5alepkigblthylzkahr4f/bafkreifwhsqox6aybq64bhzlpb55gfb76xyj2zaf4323dmx6ch73efo2uy/thumbnail.jpg"/>

:::

---

## Safari updates, Chrome updates, and Quick Hits you missed

### <VPIcon icon="fa-brands fa-apple"/>Safari Technology Preview 238

<SiteInfo
  name="Safari Technology Preview 238 Release Notes | Apple Developer Documentation"
  desc="Learn about the latest web technology updates in Safari Technology Preview: Animations, CSS, Editing, Forms, Networking, Rendering, SVG, Scrolling, Web API, Web Inspector, WebAssembly, and WebRTC."
  url="https://developer.apple.com/documentation/safari-technology-preview-release-notes/stp-release-238/"
  logo="https://developer.apple.com/favicon.ico"
  preview="https://developer.apple.com/tutorials/developer-og.jpg"/>

- [**Customizable `<select>`**](/css-tricks.com/abusing-customizable-selects.md)
- [**`:open`**](/css-tricks.com/almanac-pseudo-selectors/open.md) (to my surprise, as I thought it was Baseline already)

### <VPIcon icon="fa-brands fa-chrome"/>Chrome 146

<SiteInfo
  name="New in Chrome 146  |  Blog  |  Chrome for Developers"
  desc="Scroll-triggered animations, Scoped custom element registries, Sanitizer API, and more."
  url="https://developer.chrome.com/blog/new-in-chrome-146/"
  logo="https://gstatic.com/devrel-devsite/prod/va845a6a69ec71f6762e80b2da8e8faa65e74307aa7e53d6c2485adee73edb48b/chrome/images/favicon.png"
  preview="https://developer.chrome.com/static/blog/new-in-chrome-146/image/thumb.png"/>

- [<VPIcon icon="fa-brands fa-chrome"/>Scroll-triggered animations](https://developer.chrome.com/blog/scroll-triggered-animations)

In addition, [<VPIcon icon="fa-brands fa-chrome"/>Chrome will ship every two weeks starting September](https://developer.chrome.com/blog/chrome-two-week-release).

From the [<VPIcon icon="iconfont icon-css-tricks"/>Quick Hits](https://css-tricks.com/category/quick-hits/) reel, you might’ve missed that Font Awesome launched a Kickstarter campaign to transform Eleventy into Build Awesome, cancelled it because their emails failed to send (*despite meeting their goal!*), and vowed to try again. You can [<VPIcon icon="fas fa-globe"/>subscribe to the relaunch notification](https://kickstarter.com/projects/fontawesome/build-awesome-pro/).

Also, [<VPIcon icon="fa-brands fa-chrome"/>`<toolbar>`](https://open-ui.org/components/toolbar.explainer/) is coming along [<VPIcon icon="fa-brands fa-chrome"/>according to Luke Warlow](https://bsky.app/profile/lukewarlow.dev/post/3mgfu6abcv22w). This is akin to [<VPIcon icon="fa-brands fa-chrome"/>`<focusgroup>`](https://developer.chrome.com/blog/focusgroup-rfc), which we can actually test in Chrome 146 with the “Experimental Web Platform features” flag enabled.

Right, I’m off to slay some demons in DOOM. Until next time!

::: note P.S.

Congratulations to [<VPIcon icon="iconfont icon-css-tricks"/>Kevin Powell](https://css-tricks.com/author/kevinpowell/) for making it to [<VPIcon icon="fa-brands fa-youtube"/>1 million YouTube subs](https://youtube.com/live/e5JY5KzrDwg)!

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #7: random(), Folded Corners, Anchored Container Queries, and More",
  "desc": "For this issue of What’s !important, we have a healthy balance of old CSS that you might’ve missed and new CSS that you don’t want to miss. This includes random(), random-item(), folded corners using clip-path, backdrop-filter, font-variant-numeric: tabular-nums, the Popover API, anchored container queries, anchor positioning in general, DOOM in CSS, the customizable select element, :open, scroll-triggered animations, the toolbar element, and somehow, more.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-7.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
