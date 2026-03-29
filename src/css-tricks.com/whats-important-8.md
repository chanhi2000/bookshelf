---
lang: en-US
title: "What’s !important #8: Light/Dark Favicons, @mixin, object-view-box, and More"
description: "Article(s) > What’s !important #8: Light/Dark Favicons, @mixin, object-view-box, and More"
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
      content: "Article(s) > What’s !important #8: Light/Dark Favicons, @mixin, object-view-box, and More"
    - property: og:description
      content: "What’s !important #8: Light/Dark Favicons, @mixin, object-view-box, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-8.html
prev: /programming/css/articles/README.md
date: 2026-03-31
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/wh8.png
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
  name="What’s !important #8: Light/Dark Favicons, @mixin, object-view-box, and More"
  desc="Short n’ sweet but ever so neat, this issue covers light/dark favicons, @mixin, anchor-interpolated morphing, object-view-box, new web features, and more."
  url="https://css-tricks.com/whats-important-8"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/wh8.png"/>

Short n’ sweet but ever so neat, this issue covers light/dark favicons, `@mixin`, anchor-interpolated morphing, `object-view-box`, new web features, and more.

---

## SVG favicons that respect the color scheme

I’m a sucker for colorful logos with about 50% lightness that look awesome on light *and* dark backgrounds, but not all logos can be like that. Paweł Grzybek showed us [<VPIcon icon="fas fa-globe"/>how to implement SVG favicons that respect the color scheme](https://pawelgrzybek.com/svg-favicons-that-respect-theme-preference/), enabling us to display favicons conditionally, but the behavior isn’t consistent across web browsers. It’s an interesting read and there appears to be a campaign to get it working correctly.

And once that happens, here’s a [skeuomorphic egg-themed CSS toggle (<VPIcon icon="fa-brands fa-bluesky"/>`freefrontend.bsky.social`)](https://bsky.app/profile/freefrontend.bsky.social/post/3mhxjk6qnqc2j) that I found last week. Perfect timing, honestly.

<SiteInfo
  name="FreeFrontend (@freefrontend.bsky.social)"
  desc="Skeuomorphic Egg Toggle Switch [HTML + CSS + JS] Organic mechanics. Complex box-shadow layering and border-radius manipulation. Tactile feedback through depth. Source code: https://freefrontend.com/code/skeuomorphic-egg-toggle-switch-2026-03-26/"
  url="https://bsky.app/profile/did:plc:7wef2htaxqe5rkxf62htfkun/post/3mhxjk6qnqc2j/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://video.bsky.app/watch/did%3Aplc%3A7wef2htaxqe5rkxf62htfkun/bafkreid7yfoqq7wzpqe7qakz4wlvugr52efgafq3tdofuv225vhckdpo7y/thumbnail.jpg"/>

::: info Help the CSS WG shape <code>@mixin</code>

It seems that `@mixin` is taking a step forward. [Lea Verou showed us a code snippet and asked what we think of it (<VPIcon icon="iconfont icon-github"/>`LeaVerou/blog`)](https://github.com/LeaVerou/blog/discussions/137).

<SiteInfo
  name="Lea Verou, PhD (@lea.verou.me)"
  desc="🚨 Want mixins in CSS? Help the CSS WG by telling us what feels natural to you! Look at the code in the screenshot. What resulting widths would *you* find least surprising for each of div, div > h2, div + p? Polls: Github: https://github.com/LeaVerou/blog/discussions/137 Mastodon: https://front-end.social/@leaverou/116297811172593173"
  url="https://bsky.app/profile/did:plc:eagnfcoqnbtzpkglrtej6ayg/post/3mhyr2rw2ls2r/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:eagnfcoqnbtzpkglrtej6ayg/bafkreia6yuxhgj2tkqpq353xz334mfgz5s7xjav74l4ajvljzarjg24nqe"/>

:::

---

## Anchor-interpolated morphing tutorial

Chris Coyier showed us [**how to build an image gallery using popovers and something called AIM**](/frontendmasters.com/image-gallery-with-popovers-and-aim-anchor-interpolated-morph.nd) (Anchor-Interpolated Morphing). I’m only hearing about this now but [<VPIcon icon="fas fa-globe"/>Adam Argyle talked about AIM](https://argyle.ink/anchor-interpolated-morphing/) back in January. It’s not a new CSS feature but rather the idea of animating something from its starting position to an anchored position. Don’t miss this one.

<CodePen
  link="https://codepen.io/editor/team/CodePenTemplates/pen/019cb5ec-807e-727a-b18a-5eb41b0fc901"
  title="Photo Grid"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Also, do you happen to remember [Temani’s demo (<VPIcon icon="fa-brands fa-codepen" />`t_afif`)](https://codepen.io/t_afif/pen/wBWWKxP) that I shared a few weeks ago? Well, Frontend Masters have published [**the tutorial for that**](/frontendmasters.com/two-circles-one-arrow-and-anchor-positioning.md) too!

<CodePen
  user="anon"
  slug-hash="wBWWKxP"
  title="Connected Circles with Anchor Positioning II"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Remember `object-view-box`? Me neither

CSS `object-view-box` allows an element to be zoomed, cropped, or framed in a way that resembles how SVG’s `viewBox` works, but since Chrome implemented it back in August 2022, there’s been no mention of it. To be honest, I don’t remember it at all, which is a shame because it sounds useful. In a Bluesky thread, Victor Ponamariov explains [how `object-view-box` works (<VPIcon icon="fa-brands fa-bluesky"/>`vpon.me`)](https://bsky.app/profile/vpon.me/post/3mhsxu4bcpd23). Hopefully, Safari and Firefox implement it soon.

<SiteInfo
  name="Victor (@vpon.me)"
  desc="Wouldn't it be great to have native image cropping in CSS? It actually exists: object-view-box."
  url="https://bsky.app/profile/did:plc:k5j6zg5xqnaady5e77smdiaz/post/3mhsxu4bcpd23/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:k5j6zg5xqnaady5e77smdiaz/bafkreicbprzncfpuvt2rsbavz2zgfeqortndbd2f55ghuib376yhbayr2a"/>

---

## `corner-shape` for everyday UI elements

Much has been said about [<VPIcon icon="iconfont icon-css-tricks"/>CSS `corner-shape`](https://css-tricks.com/?s=corner-shape), by us and the wider web dev community, despite only being supported by Chrome for now. It’s such a fun feature, offering so many ways to turn boxes into interesting shapes, but [**Brecht De Ruyte’s `corner-shape` article**](/smashingmagazine.com/beyond-border-radius-css-corner-shape-property-ui.md) focuses more on how we might use `corner-shape` for everyday UI elements/components.

![Source: [**Smashing Magazine**](/smashingmagazine.com/beyond-border-radius-css-corner-shape-property-ui.md)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/1-1024x576.png?resize=1024%2C576&ssl=1)

---

## The Layout Maestro

Ahmad Shadeed’s course — [<VPIcon icon="fas fa-globe"/>The Layout Maestro](https://thelayoutmaestro.com/) — teaches you how to plan and build CSS layouts using modern techniques. Plus, you can learn how to master building the bones of websites using an extended trial of the web development browser, [<VPIcon icon="fas fa-globe"/>Polypane](https://polypane.app/), which comes free with the course.

![Source: [<VPIcon icon="fas fa-globe"/>The Layout Maestro](https://thelayoutmaestro.com/)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/2-1024x419.png?resize=1024%2C419&ssl=1)

---

## New web platform features

Firefox and Safari shipped new features (none baseline, sadly):

- [<VPIcon icon="fa-brands fa-firefox"/>Firefox 149](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/149)
  - [**`popover=hint`**](/una.im/popover-hint.md) (also supported by Chrome)
  - Name-only [**containers**](/css-tricks.com/css-container-queries.md#) (e.g., `@container name { }`)
- [<VPIcon icon="fa-brands fa-apple"/>Safari 26.4](https://developer.apple.com/documentation/safari-release-notes/safari-26_4-release-notes)
  - Name-only containers (as above)
  - [**`display: grid-lanes`**](/css-tricks.com/masonry-layout-is-now-grid-lanes.md) and [<VPIcon icon="iconfont icon-w3c"/>`flow-tolerance`](https://w3.org/TR/css-grid-3/#placement-tolerance)
- [<VPIcon icon="fa-brands fa-apple"/>Safari TP 240](https://developer.apple.com/documentation/safari-technology-preview-release-notes/stp-release-240)
  - [`revert-rule` (<VPIcon icon="iconfont icon-github"/>`WebKit/WebKit`)](https://github.com/WebKit/WebKit/commit/cdf824701b8c4d6c2047d7318deb2a9da0e0fbd2)

Also, Bramus said that Chrome 148 will have [**at-rule feature queries**](/bram.us/at-rule.md), while Chrome 148 and Firefox 150 will allow [**`background-image` to support `light-dark()`**](/bram.us/more-easy-light-dark-mode-switching-light-dark-is-about-to-support-images.md). In any case, there’s a new website called [<VPIcon icon="fas fa-globe"/>BaseWatch](https://basewatch.dev/) that tracks baseline status for all of these CSS features.

Ciao!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #8: Light/Dark Favicons, @mixin, object-view-box, and More",
  "desc": "Short n’ sweet but ever so neat, this issue covers light/dark favicons, @mixin, anchor-interpolated morphing, object-view-box, new web features, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-8.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
