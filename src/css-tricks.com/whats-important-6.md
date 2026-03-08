---
lang: en-US
title: "What’s !important #6: :heading, border-shape, Truncating Text From the Middle, and More"
description: "Article(s) > What’s !important #6: :heading, border-shape, Truncating Text From the Middle, and More"
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
      content: "Article(s) > What’s !important #6: :heading, border-shape, Truncating Text From the Middle, and More"
    - property: og:description
      content: "What’s !important #6: :heading, border-shape, Truncating Text From the Middle, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-6.html
prev: /programming/css/articles/README.md
date: 2026-02-27
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/important-color.png
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
  name="What’s !important #6: :heading, border-shape, Truncating Text From the Middle, and More"
  desc="Despite what’s been a sleepy couple of weeks for new Web Platform Features, we have an issue of What’s !important that’s prrrretty jam-packed. The web community had a lot to say, it seems, so fasten your seatbelts!"
  url="https://css-tricks.com/whats-important-6"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/important-color.png"/>

Despite what’s been a sleepy couple of weeks for new Web Platform Features, we have an issue of What’s !important that’s ***prrrretty jam-packed***. The web community had a lot to say, it seems, so fasten your seatbelts!

---

## `@keyframes` animations can be strings

Peter Kröner shared [an interesting fact about `@keyframes` animations (<VPIcon icon="fa-brands fa-bluesky"/>`sirpepe.bsky.social`)](https://bsky.app/profile/sirpepe.bsky.social/post/3mf4uwrbnkk2j) — that they can be strings:

```css
@keyframes "@animation" {
  /* ... */
}

#animate-this {
  animation: "@animation";
}
```

I don’t know why you’d want to do that, but it’s certainly an interesting thing to learn about `@keyframes` after 11 years of cross-browser support!

---

## `:` vs. `=` in style queries

Another hidden trick, this one from [<VPIcon icon="iconfont icon-css-tricks"/>Temani Afif](https://css-tricks.com/author/afiftemani/), has revealed that we can [**replace the colon in a style query with an equals symbol**](/css-tip.com/if-trick.md). Temani does a great job at explaining the difference, but here’s a quick code snippet to sum it up:

```css
.Jay-Z {
  --Problems: calc(98 + 1);

  /* Evaluates as calc(98 + 1), color is blueivy */
  color: if(style(--Problems: 99): red; else: blueivy);

  /* Evaluates as 99, color is red */
  color: if(style(--Problems = 99): red; else: blueivy);
}
```

In short, `=` evaluates `--Problems` differently to `:`, even though Jay-Z undoubtably has 99 of them (he said so himself).

---

## Declarative `<dialog>`s (and an updated `.visually-hidden`)

David Bushell demonstrated [**how to create `<dialog>`s declaratively using invoker commands**](/dbushell.com/declarative-dialog-menu-invoker-commands.md), a useful feature that allows us to skip some J’Script in favor of HTML, and works in all web browsers as of recently.

Also, thanks to an inquisitive question from Ana Tudor, the article spawned a spin-off about the [**minimum number of styles needed for a visually-hidden utility class**](/dbushell.com/visually-hidden.md). Is it still seven?

*Maybe not…*

---

## How to truncate text from the middle

Wes Bos shared a clever trick for [truncating text from the middle](https://bsky.app/profile/wesbos.com/post/3megy3ywotc2h) using only CSS:

[Donnie D’Amato attempted a more-native solution using `::highlight()` (<VPIcon icon="fa-brands fa-bluesky"/>`donnie.damato.design`)](https://bsky.app/profile/donnie.damato.design/post/3meoz3lzdjc2q), but `::highlight()` has some limitations, unfortunately. [As Henry Wilkinson mentioned (<VPIcon icon="fa-brands fa-bluesky"/>`wilkinson.graphics`)](https://bsky.app/profile/wilkinson.graphics/post/3meh4neyktk2y), [Hazel Bachrach’s 2019 call for a native solution (<VPIcon icon="iconfont icon-github" />`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/3937) is still an open ticket, so fingers crossed!

---

## How to manage color variables with relative color syntax

Theo Soti demonstrated [<VPIcon icon="fas fa-globe"/>how to manage color variables with relative color syntax](https://theosoti.com/blog/css-relative-colors/). While not a new feature or concept, it’s frankly the best and most comprehensive walkthrough I’ve ever read that addresses these complexities.

---

## How to customize lists (the modern way)

In a similar article for Piccalilli, Richard Rutter comprehensively showed us [**how to customize lists**](/piccalil.li/an-in-depth-guide-to-customising-lists-with-css.md), although this one has some nuggets of what I can only assume is modern CSS. What’s `symbols()`? What’s `@counter-style` and `extends`? Richard walks you through *everything*.

<!-- ![A table with headings titled CSS and USE CASE detailing HTML list customizations. It lists the property list-style for basic bullet styles; the pseudo-element li::marker for coloring numbering; the function symbols() for Firefox-specific styles; the at-rule @counter-style for custom numbering systems; the descriptor extends for modifying existing systems; and the pseudo-element li::before for advanced marker positioning.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/customizing-lists.png?resize=2358%2C1715&ssl=1) -->
<!-- TODO: 테이블 화 -->

Can’t get enough on counters? Juan Diego put together [**a comprehensive guide right here on CSS-Tricks**](/css-tricks.com/styling-counters-in-css.md).

---

## How to create typescales using `:heading`

Safari Technology Preview 237 recently began trialing `:heading`/`:heading()`, [**as Stuart Robson explains**](/alwaystwisted.com/styling-with-the-heading-pseudo-class.md). [**The follow-up**](/alwaystwisted.com/building-typographic-scales-with-headings-sibling-index-and-pow.md) is even better though, as it shows us how `pow()` can be used to write cleaner typescale logic, although I ultimately settled on the old-school `<h1>`–`<h6>` elements with a simpler implementation of `:heading` and no `sibling-index()`:

```css
:root {
  --font-size-base: 16px;
  --font-size-scale: 1.5;
}

:heading {
  /* Other heading styles */
}

/* Assuming only base/h3/h2/h1 */

body {
  font-size: var(--font-size-base);
}

h3 {
  font-size: calc(var(--font-size-base) * var(--font-size-scale));
}

h2 {
  font-size: calc(var(--font-size-base) * pow(var(--font-size-scale), 2));
}

h1 {
  font-size: calc(var(--font-size-base) * pow(var(--font-size-scale), 3));
}
```

---

## Una Kravets introduced `border-shape`

Speaking of new features, `border-shape` came as a surprise to me considering that we already have — or *will* have — [**`corner-shape`**](/css-tricks.com/almanac-properties/corner-shape.md). However, `border-shape` is different, [**as Una explains**](/una.im/border-shape.md). It addresses the issues with borders (because it *is* the border), allows for more shapes and even the [**`shape()` function**](/css-tricks.com/almanac.md#functions/s/shape/), and overall it works differently behind the scenes.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/border-shape.mp4" />

<!-- Source: [Una Kravets](https://una.im/border-shape/). -->

---

## modern.css wants you to stop writing CSS like it’s 2015

It’s time to start using all of that modern CSS, and that’s exactly what [<VPIcon icon="fas fa-globe"/>modern.css](https://modern-css.com/) wants to help you do. All of those awesome features that weren’t supported when you first read about them, that you forgot about? Or the ones that you missed or skipped completely? Well, modern.css has 75 code snippets and counting, and all you have to do is copy ‘em.

![Screenshot of a website titled modern.css showing browser compatibility filters and six code snippets, labeled with their category (e.g., SELECTORS or LAYOUT), difficulty level, topic, an example of outdated code to avoid, a browser support percentage, and a link to view the modern solution.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/02/modern-css-scaled.png?resize=2560%2C1607&ssl=1)

---

## Kevin Powell also has some CSS snippets for you

And the commenters? They have some too!

<VidStack src="youtube/dQ8_F4LPCs8" />

Honestly, [Kevin (<VPIcon icon="fa-brands fa-youtube"/>`@KevinPowell`)](https://youtube.com/@KevinPowell) is the only web dev talker that I actually follow on YouTube, and [he’s *so* close to a million followers (<VPIcon icon="fa-brands fa-bluesky"/>`kevinpowell.co`)](https://bsky.app/profile/kevinpowell.co/post/3meo3mlzyfc2y) right now, so make sure to hit ‘ol K-Po’s “Subscribe” button.

---

## In case you missed it

Actually, you didn’t miss that much! [<VPIcon icon="fa-brands fa-firefox"/>Firefox 148](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/148) released the [**`shape()` function**](/css-tricks.com/almanac-functions/shape.md), which was being held captive by a flag, but is now a baseline feature. [<VPIcon icon="fa-brands fa-apple"/>Safari Technology Preview 237](https://developer.apple.com/documentation/safari-technology-preview-release-notes/stp-release-237) became the first to trial [**`:heading`**](/css-tricks.com/headings-semantics-fluidity-and-styling-oh-my.md#style-headings). Those are all we’ve seen from our beloved browsers in the last couple of weeks (not counting the usual flurry of smaller updates, of course).

That being said, [<VPIcon icon="iconfnot icon-webdev"/>Chrome](https://web.dev/blog/interop-2026), [<VPIcon icon="fa-brands fa-safari"/>Safari](https://webkit.org/blog/17818/announcing-interop-2026/), and [<VPIcon icon="fa-brands fa-firefox"/>Firefox](https://hacks.mozilla.org/2026/02/launching-interop-2026/) announced their targets for [**Interop 2026**](/css-tricks.com/interop-2026.md), revealing which Web Platform Features they intend to make consistent across all web browsers this year, which *more than* makes up for the lack of shiny features this week.

Also coming up (but testable in Chrome Canary now, just like `border-shape`) is the `scrolled` keyword for scroll-state container queries. [**Bramus talks about `scrolled` scroll-state queries here**](/bram.us/solved-by-css-scroll-state-queries-hide-a-header-when-scrolling-down-show-it-again-when-scrolling-up.md).

Remember, if you don’t want to miss anything, you can catch these [<VPIcon icon="iconfont icon-css-tricks"/>Quick Hits](https://css-tricks.com/category/quick-hits) as the news breaks in the sidebar of [<VPIcon icon="iconfont icon-css-tricks"/>css-tricks.com](https://css-tricks.com/).

See you in a fortnight!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #6: :heading, border-shape, Truncating Text From the Middle, and More",
  "desc": "Despite what’s been a sleepy couple of weeks for new Web Platform Features, we have an issue of What’s !important that’s prrrretty jam-packed. The web community had a lot to say, it seems, so fasten your seatbelts!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-6.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
