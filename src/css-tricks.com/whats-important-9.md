---
lang: en-US
title: "What’s !important #9: clip-path Jigsaws, View Transitions Toolkit, Name-only Containers, and More"
description: "Article(s) > What’s !important #9: clip-path Jigsaws, View Transitions Toolkit, Name-only Containers, and More"
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
      content: "Article(s) > What’s !important #9: clip-path Jigsaws, View Transitions Toolkit, Name-only Containers, and More"
    - property: og:description
      content: "What’s !important #9: clip-path Jigsaws, View Transitions Toolkit, Name-only Containers, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-9.html
prev: /programming/css/articles/README.md
date: 2026-04-17
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/wh9.jpg
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
  name="What’s !important #9: clip-path Jigsaws, View Transitions Toolkit, Name-only Containers, and More"
  desc="This issue of What’s !important brings you clip-path jigsaws, a view transitions toolkit, name-only containers, the usual roundup of new, notable web platform features, and more."
  url="https://css-tricks.com/whats-important-9"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/wh9.jpg"/>

This issue of **What’s !important** brings you `clip-path` jigsaws, a view transitions toolkit, name-only containers, the usual roundup of new, notable web platform features, and more.

---

## Creating a jigsaw puzzle using `clip-path`

<CodePen
  link="https://codepen.io/amit_sheen/pen/yyazxZv/f10deb6b871f36edff1c2a225f974676"
  title="Puzzle - Demo 04"
  :default-tab="['css','result']"
  :theme="dark"/>

[<VPIcon icon="iconfont icon-css-tricks"/>Amit Sheen](https://css-tricks.com/author/amitsheen/) demonstrated [**how to create a full jigsaw puzzle using `clip-path`**](/master.dev/creating-puzzle-peices-in-css.md). While I doubt that you’ll need to create a jigsaw puzzle anytime soon, Amit’s walkthrough offers a fantastic way to acquaint yourself with this evolving CSS property that’s becoming more and more popular every day.

For example, Chrome Canary shipped [rounded `clip-path` polygons (<VPIcon icon="fa-brands fa-bluesky"/>`yisibl.bsky.social`)](https://bsky.app/profile/yisibl.bsky.social/post/3mj26ecigjk2x) only last week:

::: info Bluesky (<VPIcon icon="fa-brands fa-bluesky"/><code>yisibl.bsky.social</code>)

I and Jason are currently working on implementing the CSS `polygon() round` keyword in Chrome.

This is one of my favorite CSS features! Thanks to `@lea.verou.me` for bringing it to CSS.

Enable the `enable-experimental-web-platform-features` flag in Chrome Canary

<CodePen
  user="yisi"
  slug-hash="NPRLEQN"
  title="title"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: 동영상 연결 -->

:::

And there’s also [talk of implementing other `corner-shape` keywords (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/8946) such as `bevel`, too.

Finally, since we’re on the topic, and because I somehow completely missed it for [**What’s !important #8**](/css-tricks.com/whats-important-8.md), here’s [<VPIcon icon="fas fa-globe"/>Karl Koch demonstrating some really neat `clip-path` animations](https://karlkoch.me/writing/on-clip-path-animations).

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/2.mp4" />

*Get clippin’!*

---

## View transitions toolkit

The Chrome DevRel team created a [<VPIcon icon="fa-brands fa-chrome"/>view transitions toolkit](https://chrome.dev/view-transitions-toolkit/), a collection of utilities that make working with view transitions a bit easier.

Here’s my favorite demo from the site:

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/1.mp4" />

[<VPIcon icon="fa-brands fa-chrome"/>Chrome shipped element-scoped view transitions](https://developer.chrome.com/blog/element-scoped-view-transitions) only last month, so there’s no better time to dive into this toolkit.

---

## How name-only containers can be used for scoping

Chris Coyier discussed the use of [**name-only containers for scoping**](/master.dev/name-only-containers-the-scoping-we-needed.md), and how they compare to class names and `@scope`. Personally, I prefer `@scope` because it tends to result in cleaner HTML, and it seems that Chris has updated his stance to be more `@scope`-aligned too, but it really comes down to personal preference. What’s your take on it?

---

## Hey, remember subgrid?

At one point, [**subgrid**](/css-tricks.com/complete-guide-css-grid-layout.md##subgrid) was one of the most highly-anticipated CSS features, but it’s been two and half years since it became Baseline Newly Available, and it’s barely made a dent in the CSS landscape. This is a shame, because subgrid can help us to break out of grids properly and avoid the ‘ol Michael Scofield/nested wrappers/negative margins extravaganza.

But don’t worry, David Bushell’s [**very simple explanation of subgrid**](/dbushell.com/css-subgrid-is-super-good.md) has you covered.

![Source: [**David Bushell**](/dbushell.com/css-subgrid-is-super-good.md) (although the red grid lines were added by me).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/3-1024x686.jpeg?resize=1024%2C686&ssl=1)

---

## You Might Not Need…*JavaScript?*

Remember [<VPIcon icon="fas fa-globe"/>You Might Not Need jQuery](https://youmightnotneedjquery.com/)? Pavel Laptev’s [<VPIcon icon="fas fa-globe"/>The Great CSS Expansion](https://blog.gitbutler.com/the-great-css-expansion) has a similar vibe, noting CSS alternatives to JavaScript libraries (and JavaScript in general) that are smaller and more performant.

![A screenshot of a technical article featuring the Anchor Positioning heading, a comparison table of JavaScript libraries for anchor positioning, and a CSS code example.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/4-1024x642.png?resize=1024%2C642&ssl=1)

---

## Missed hits

- [<VPIcon icon="fa-brands fa-chrome"/>Chrome 147](https://developer.chrome.com/release-notes/147)
  - [**`contrast-color()`**](/css-tricks.com/exploring-the-css-contrast-color-function-a-second-time.md) (now baseline)
  - [`border-shape`](https://una.im/border-shape) (no Safari or Firefox support)
  - [<VPIcon icon="fa-brands fa-firefox"/>`CSSPseudoElement`](https://developer.mozilla.org/en-US/docs/Web/API/CSSPseudoElement) JavaScript interface (no Safari or Firefox support)
  - `scroll` range for view timelines (no Safari or Firefox support)
  - Element-scoped view transitions, as mentioned earlier (no Safari or Firefox support)
- [<VPIcon icon="fa-brands fa-safari"/>Safari TP 240](https://developer.apple.com/documentation/safari-technology-preview-release-notes/stp-release-240)
  - `revert-rule` keyword (already supported by Chrome and Firefox)
- [<VPIcon icon="fa-brands fa-safari"/>Safari TP 241](https://developer.apple.com/documentation/safari-technology-preview-release-notes/stp-release-241)
  - [**`overflow-anchor`**](/css-tricks.com/almanac-properties/overflow-anchor.md) (already supported by Chrome and Firefox)
  - [**`stretch`**](/css-tricks.com/we-completely-missed-width-height-stretch.md) (already supported by Chrome)

It’s becoming increasingly difficult to keep up with all of these new CSS features. I attempted way too many rounds of Keith Cirkel’s new [<VPIcon icon="fas fa-globe"/>CSS or BS? quiz](https://keithcirkel.co.uk/css-or-bs/), and my best score was only 18/20. Sad times. Let me know your score in the comments (*unless it’s higher than mine…*).

![A screenshot from an online quiz titled CSS or BS? showing the CSS property font-synthesis in a speech bubble, with buttons to select whether the property is real or fake.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/5-1024x642.png?resize=1024%2C642&ssl=1)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #9: clip-path Jigsaws, View Transitions Toolkit, Name-only Containers, and More",
  "desc": "This issue of What’s !important brings you clip-path jigsaws, a view transitions toolkit, name-only containers, the usual roundup of new, notable web platform features, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-9.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
