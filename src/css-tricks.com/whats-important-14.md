---
lang: en-US
title: "What’s !important #14: Gap Decorations, random(), <select> field sizing, and More"
description: "Article(s) > What’s !important #14: Gap Decorations, random(), <select> field sizing, and More"
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
      content: "Article(s) > What’s !important #14: Gap Decorations, random(), <select> field sizing, and More"
    - property: og:description
      content: "What’s !important #14: Gap Decorations, random(), <select> field sizing, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-14.html
prev: /programming/css/articles/README.md
date: 2026-06-30
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/wi14.jpg
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
  name="What’s !important #14: Gap Decorations, random(), <select> field sizing, and More"
  desc="I know you’re busy, so for What’s !important #14, I’ll be sprinting through what’s been a stacked couple of weeks despite few browser updates. From CSS Quake to CSS Gap Decorations, this isn’t one to miss!"
  url="https://css-tricks.com/whats-important-14"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/wi14.jpg"/>

I know you’re busy, so for **What’s !important #14**, I’ll be sprinting through what’s been a stacked couple of weeks despite few browser updates. From CSS Quake to CSS Gap Decorations, this isn’t one to miss!

---

## Hyperblam: Make music with HTML

Heydon Pickering created [<VPIcon icon="fas fa-globe"/>Hyperblam](https://hyperblam.how/), a HTML-driven implementation of the Web Audio API that uses Web Components to create music without JavaScript.

![A website screenshot for Hyperblam featuring a black background with a stylized white logo above navigation links, large hand-drawn text reading WRITE MUSIC NOT JAVASCRIPT, followed by a brief introductory sentence explaining that Hyperblam lets users make music with HTML.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/1-1.png?resize=1024%2C642&ssl=1)

Okay, not very CSS-y, but still pretty cool!

---

## CSS Quake

Powered by [<VPIcon icon="fas fa-globe"/>PolyCSS](https://polycss.com/), Layoutit created [<VPIcon icon="fas fa-globe"/>CSS Quake](https://cssquake.com/), a port of the groundbreaking 1996 game, Quake.

![A screenshot of the first playable moment of Quake.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/06/2.png?resize=1024%2C642&ssl=1)

*Very* CSS-y, and a perfect companion to [**CSS DOOM**](/css-tricks.com/whats-important-7.md#doom-in-css), which also shipped recently.

---

## A head-first dive into CSS Gap Decorations

[<VPIcon icon="iconfont icon-css-tricks"/>Temani Afif](https://css-tricks.com/author/afiftemani/) showed us [**how to style gap decorations**](/blog.master.dev/lets-play-with-gap-decorations.md). As you might’ve guessed, ‘gaps’ are the spaces that `gap`s take up when using flexbox, grid layout, or multi-column layout. To be honest, gap decorations have been a long time coming, but as Temani demonstrated, there’s actually a lot that we can do with them.

<CodePen
  link="https://codepen.io/t_afif/pen/xbggQgj/f8fd92ac42f4d00a63df914c70439a39"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## CSS `random()` experiments

Polypane demonstrated their [<VPIcon icon="fas fa-globe"/>CSS `random()` experiments](https://polypane.app/blog/experimenting-with-random-in-css/). If you’ve been wondering about this elusive CSS function, which still isn’t supported by any browser but Safari, Polypane has created a bokeh effect, some falling petals, an untidy stack of polaroids, a poem, an animated aurora, and more. It’s a pretty deep dive that seemingly shows us everything that we can do with `random()`.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/06/3.mp4" />
<!-- Source: [Polypane](https://polypane.app/blog/experimenting-with-random-in-css/). -->

---

## How to make `<select>`s fluid

Manuel Matuzović showed us [<VPIcon icon="fas fa-globe"/>how to set the width of `<select>`s to the width of their selected `<option>` with `field-sizing`](https://matuzo.at/blog/2026/select-fieldsize) (`field-sizing: content`, to be more specific), which became Baseline when Firefox 152 shipped it a fortnight ago.

Another thing to note is that if we use the `size` attribute (e.g., `<select size="3">`), which turns the `<select>` into a scrollable list box showing three `<option>`s by default, `field-sizing: content` overrides that to show all `<option>`s.

---

## The new standard for CSS theming

Una Kravets explained [**how modern CSS theming works**](/una.im/modern-css-theming.md). We’ve seen a whole lot of this lately, but Una talks about [**`@property`**](/css-tricks.com/almanac-rules/property.md), [**`light-dark()`**](/css-tricks.com/almanac-functions/light-dark.md), [**`contrast-color()`**](/css-tricks.com/almanac-functions/contrast-color.md)`, *and* `@container style()`, all of which are also Baseline as of recently, so this is a great opportunity to see how all of these features work together.

<CodePen
  user="anon"
  slug-hash="MYJeKdb"
  title="Baseline Newly Available color theming (no @function)"
  :default-tab="['css','result']"
  :theme="dark"/>

Speaking of which, [**I wrote up a thing about `contrast-color()`**](/css-tricks.com/exploring-the-css-contrast-color-function-a-second-time.md) after exploring it for the first time.

---

## Why websites don’t need to work the same way for everybody

Bramus explained [**why websites don’t need to work the same way for everybody**](/bram.us/do-websites-need-to-function-exactly-the-same-on-every-platform.md). For example, different platforms have different primary input modalities, and even then, users might have a secondary one hooked up that they prefer, which is why we need to abandon the idea of making websites identical across platforms.

He also talks about three incredibly interesting web platform features — interest invokers, overscroll actions, and the Document Picture-in-Picture API — that must function differently depending on the platform.

---

## Marina Aísa at Web Engines Hackfest

While everybody was still talking about CSS Day ([**including me**](/css-tricks.com/whats-important-13.md#what-happened-at-css-day-2026)), [<VPIcon icon="fas fa-globe"/>Web Engines Hackfest](https://webengineshackfest.org/) was kicking off in A Coruña, Galicia. What I love about these events (besides the talks, of course) is attendees talking about the talks, the people that they met, what else they did while they was in town, and so on.

Here’s [Marina Aísa documenting the two-day event (<VPIcon icon="fa-brands fa-bluesky"/>`marinaaisa.com`)](https://bsky.app/profile/marinaaisa.com/post/3moifdog32k23), starting off with a hike in a Galician forest, then two days of talks about web engines and web standards (interspersed with some wall climbing), then finally some discussion about what browsers can do to help improve web accessibility:

::: info From Bluesky (<VPIcon icon="fa-brands fa-bluesky"/><code>marinaaisa.com</code>)

This week I'm in A Coruña, Galicia, attending the `@webengineshackfest.org`
 👩‍💻 where we are discussing the future of web engines and standards.

Given the potential impact on future web development, I thought it would be helpful to share some of my personal notes from the event. ✍️👇

<SiteInfo
  name="Marina Aísa (@marinaaisa.com)"
  desc="I'm a software engineer at Apple , focused on making web products more accessible and enjoyable 👩🏼‍💻 🏳️‍🌈 Opinions are my own 📍 London, UK https://marinaaisa.com/"
  url="https://bsky.app/profile/marinaaisa.com/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/banner/plain/did:plc:tpem4cjgzwlpu5cvevvcsfwn/bafkreiaqdbrjbepdtzqg6evjqldi5b47v3vnmwxod6bzyn5nrqmjbjiwwu"/>

:::

Personal goal for next year: to attend one of these events!

::: note New web platform feature~s~

- [<VPIcon icon="fa-brands fa-firefox"/>Firefox 152](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/152)
  - [**`field-sizing`**](/css-tricks.com/almanac-properties/field-sizing.md) (now Baseline)

:::

Yes, it’s been a dull couple of weeks for stable browsers, but there are some really exciting things coming up. Keep your eyes on our [**Quick Hits**](/css-tricks.com/category/quick-hits.md), because that’s where I share these web platform updates first (plus those from developmental browsers). In fact, Chrome 150 will be shipping later today.

See ya’ll in two weeks!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #14: Gap Decorations, random(), <select> field sizing, and More",
  "desc": "I know you’re busy, so for What’s !important #14, I’ll be sprinting through what’s been a stacked couple of weeks despite few browser updates. From CSS Quake to CSS Gap Decorations, this isn’t one to miss!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-14.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
