---
lang: en-US
title: "What’s !important #10: HTML-in-Canvas, Hex Maps, E-ink Optimization, and More"
description: "Article(s) > What’s !important #10: HTML-in-Canvas, Hex Maps, E-ink Optimization, and More"
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
      content: "Article(s) > What’s !important #10: HTML-in-Canvas, Hex Maps, E-ink Optimization, and More"
    - property: og:description
      content: "What’s !important #10: HTML-in-Canvas, Hex Maps, E-ink Optimization, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-10.html
prev: /programming/css/articles/README.md
date: 2026-05-01
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/wh10.jpg
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
  name="What’s !important #10: HTML-in-Canvas, Hex Maps, E-ink Optimization, and More"
  desc="Developers have been experimenting with HTML-in-Canvas, a hexagonal world map-analytics feature, a web-based OS for e-ink devices, replacing image sources using the content property, and more. This is What’s !important #10."
  url="https://css-tricks.com/whats-important-10"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/wh10.jpg"/>

Developers have been experimenting with HTML-in-Canvas, a hexagonal world map-analytics feature, a web-based OS for e-ink devices, replacing `img` `src`s using `content`, and more. This is **What’s !important #10**.

---

## HTML-in-Canvas experiments

HTML-in-Canvas, a new API that enables us to render real semantic HTML in a `<canvas>` with visual effects, is the talk of the town right now, so let’s lead with that. [<VPIcon icon="iconfont icon-css-tricks"/>Amit Sheen](https://css-tricks.com/author/amitsheen/) showed us [**how the HTML-in-Canvas API works**](/master.dev/the-web-is-fun-again-first-experiments-with-html-in-canvas.md), and also created some [<VPIcon icon="fas fa-globe"/>demos over at the HiC Showroom](https://hicshowroom.com/), like this one (requires Chrome 146 with the `chrome://flags/#canvas-draw-element` flag enabled):

<CodePen
  link="https://codepen.io/amit_sheen/pen/dPpQmGv/42adf6e00961d1c6e5b890a30ef6e5ae"
  title="HTML-in-Canvas (Demo 17)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Building a hexagonal world map-analytics feature

Ben Schwarz (awesome name, but no relation) talked about [<VPIcon icon="fas fa-globe"/>building a hexagonal world map-analytics feature](https://calibreapp.com/blog/building-our-beloved-hex-map). While it’s more of a retrospective than a developer walkthrough, it’s a *really* interesting read about analytics, design constraints, inspiration, engineering, and of course SVG and CSS.

![Source: [<VPIcon icon="fas fa-globe"/>Calibre](https://calibreapp.com/blog/building-our-beloved-hex-map).](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/1-1.png?resize=1760%2C990&ssl=1)

---

## Rekindle — a web-based OS for e-ink devices

[<VPIcon icon="fas fa-globe"/>Rekindle](https://rekindle.ink/) is basically a web-based operating system for e-ink devices like Kindle, Kobo, and Boox, which are often low-powered with few features. Rekindle includes an insane number of features and apps, and is designed in black-and-white, with no animations, and no doubt with many more e-ink optimizations.

![A black and white user interface for Rekindle that primarily shows a grid of app icons.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/2-scaled.png?resize=2560%2C1606&ssl=1)

The takeaway isn’t a tutorial (unfortunately) or even some commentary (like with the world map retrospective above), it’s that we have a whole bunch of media queries that’d be so useful for e-ink devices if it weren’t for the fact that they’re shipping with low-powered, proprietary web browsers that don’t recognize them. [<VPIcon icon="iconfont icon-w3c"/>Media Queries Level 5](https://w3.org/TR/mediaqueries-5/) can query hover capability, the precision of pointers, display update frequency, color depth, monochromatic bit-depth, color index size, dynamic range, and more, probably.

Thoughts? Is e-ink optimization likely to break out in the coming years, or is low demand for these media queries why a dedicated service like Rekindle needs to exist? It’s worth noting that the browsers and many of the media queries are in active development, so I don’t know. Watch this space, maybe?

Either way, I’d love to see a dev deep dive on Rekindle!

---

## Replacing `img` `src`s using `content`

[Jon discovered (<VPIcon icon="fa-brands fa-bluesky"/>`scrwd.mastodon.social.ap.brid.gy`)](https://bsky.app/profile/scrwd.mastodon.social.ap.brid.gy/post/3mjwgpvgy7k32) that CSS can be used to replace image sources, like this:

```html
<img src="image.png" alt="Alt text">
```

```css
img {
  content: url(new-image.png) / "New alt text";
}
```

::: info Jon From *Bluesky* (<VPIcon icon="fa-brands fa-bluesky"/><code>bsky.app</code>)

TIL! Who knew you could change the "src" of an #HTML <img> using #CSS:

```css
img { content: url(whatever.png) }
```

NO PSEUDOS!

<CodePen
  user="jon"
  slug-hash="MYjRQje"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Seems to work in all current browsers too. How did I miss this?

<SiteInfo
  name="Jon (@scrwd.mastodon.social.ap.brid.gy)"
  desc="TIL! Who knew you could change the ”src” of an #HTML <img> using #CSS: ..."
  url="https://bsky.app/profile/did:plc:wjkfbooeb4bmapfc2op7eeza/post/3mjwgpvgy7k32/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:wjkfbooeb4bmapfc2op7eeza/bafkreibmy665fm7rzdszojyc2d27kcete5752ndhosnfi3celrtk7eghpe"/>

:::

It’s really interesting to learn this about the [**`content`**](/css-tricks.com/almanac-properties/content.md) property, which has been Baseline for 11 years now. I experimented a bit more and discovered that this trick also works with the [**`image-set()`**](/css-tricks.com/almanac-functions/image-set.md) function:

```css
img {
  content: image-set(
    url("image.png") 1x,
    url("image-2x.png") 2x
  );
}
```

So if you’re working on a website with non-responsive `<img>`s and no way to change the markup, write the logic in CSS instead.

---

## Implementing responsive images with `sizes=auto`

Having said that, if you *do* have access to the HTML, you’ll want to serve responsive images using the `srcset` and `sizes` HTML attributes. [<VPIcon icon="iconfont icon-css-tricks"/>Mat Marquis](https://css-tricks.com/author/wilto/) demonstrated [**how the new `sizes=auto` attribute-value combination replaces responsive breakpoints for images that are loaded lazily**](/piccalil.li/the-end-of-responsive-images/).

If you’re interested, Amit Sheen also talked about [**building layouts (not necessarily images) without breakpoints**](/master.dev/building-a-ui-without-breakpoints.md).

---

## New web platform features and updates

- [<VPIcon icon="fa-brands fa-firefox"/>Firefox 150](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/150)
  - [<VPIcon icon="fa-brands fa-firefox"/>`:muted`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:muted) and all other media-based pseudo-classes (no Chrome support)
  - [<VPIcon icon="fa-brands fa-firefox"/>`revert-rule`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/revert-rule) (no Safari support)
  - [**`sizes=auto`**](/piccalil.li/blog/the-end-of-responsive-images.md) (no Safari support)
  - [**`light-dark()`**](/css-tricks.com/almanac-functions/light-dark.md) with image support (no Chrome/Safari support)
  - [**`color-mix()`**](/css-tricks.com/almanac-functions/color-mix.md) with the syntax for two or more colors (no Chrome/Safari support)
  - [<VPIcon icon="fa-brands fa-firefox"/>`ariaNotify()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaNotify) (no Chrome/Safari support)
- [<VPIcon icon="fa-brands fa-apple"/>Safari TP 242](https://developer.apple.com/documentation/safari-technology-preview-release-notes/stp-release-242)
  - [<VPIcon icon="fa-brands fa-firefox"/>`closedby`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby)
  - Advanced [**`attr()`**](/css-tricks.com/almanac-functions/attr.md) (no Firefox support)

If you’re keen for more content, here’s Wes Bos and Scott Tolinski of Syntax.fm discussing [<VPIcon icon="fa-brands fa-youtube"/>10 new CSS and HTML APIs](https://youtu.be/unqPqGeJMck):

<VidStack src="youtube/unqPqGeJMck" />

Until next time!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #10: HTML-in-Canvas, Hex Maps, E-ink Optimization, and More",
  "desc": "Developers have been experimenting with HTML-in-Canvas, a hexagonal world map-analytics feature, a web-based OS for e-ink devices, replacing image sources using the content property, and more. This is What’s !important #10.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-10.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
