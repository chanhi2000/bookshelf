---
lang: en-US
title: "Stop buttons triggering zoom when they’re double tapped"
description: "Article(s) > Stop buttons triggering zoom when they’re double tapped"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Stop buttons triggering zoom when they’re double tapped"
    - property: og:description
      content: "Stop buttons triggering zoom when they’re double tapped"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/stop-buttons-triggering-zoom-when-theyre-double-tapped.html
prev: /programming/css/articles/README.md
date: 2026-09-23
isOriginal: false
author:
  - name: Andy Bell
    url: https://piccalil.li/author/andy-bell
cover: https://piccalil.b-cdn.net/api/og-image?slug=stop-buttons-triggering-zoom-when-theyre-double-tapped/
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
  name="Stop buttons triggering zoom when they’re double tapped"
  desc="It’s annoying when your browser zooms if a button is rapidly tapped. There’s actually a really simple fix and no, you don’t have to prevent all zooming with a meta tag!"
  url="https://piccalil.li/blog/stop-buttons-triggering-zoom-when-theyre-double-tapped"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=stop-buttons-triggering-zoom-when-theyre-double-tapped/"/>

I stumbled across [this great project (<VPIcon icon="fa-brands fa-bluesky"/>`renderg.host`)](https://bsky.app/profile/renderg.host/post/3mvipol2rzk2m) by [<VPIcon icon="fas fa-globe"/>Barry Prendergast](https://renderg.host/). It’s a web-based radio player with a *lush* UI. On mobile I spotted that as I was rapidly flicking through the stations to find one that was on air, the browser was zooming in and out.

Here’s a screen clip:

<VidStack src="https://vz-c0e410ca-8a4.b-cdn.net/040189f2-c87a-4fda-a3bf-c65bf2254edb/playlist.m3u8" />

I thought this behaviour was related to their viewport meta tag setup, but they have that set up perfectly:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Now, you could prevent the zooming by adding `, maximum-scale=1.0, user-scalable=no` to the `content` attribute, but **don’t do that** because it prevents zooming at all, which is a [<VPIcon icon="iconfont icon-w3c"/>WCAG violation](https://w3.org/WAI/WCAG21/Understanding/resize-text.html).

What’s actually happening here is the browser is responding to the double tap gesture, which in the case of Safari on iOS, zooms into the button element I’m tapping. Luckily there’s a CSS one-liner for us that gets the job done.

```css
.button {
  touch-action: manipulation;
}
```

As per [<VPIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action):

::: info "touch-action CSS property" *From MDN* (<VPIcon icon="fa-brands fa-firefoxe"/><code>developer.mozilla.org</code>)

> Enable panning and pinch zoom gestures, but disable additional non-standard gestures such as double-tap to zoom. Disabling double-tap to zoom removes the need for browsers to delay the generation of **click** events when the user taps the screen. This is an alias for “**pan-x pan-y pinch-zoom**” (which, for compatibility, is itself still valid).

<SiteInfo
  name="touch-action CSS property - CSS | MDN"
  desc="The touch-action CSS property sets how an element's region can be manipulated by a touchscreen user (for example, by zooming features built into the browser)."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

Let’s see it in action. First, here’s a couple of buttons without `touch-action`. Try rapidly tapping on your phone/touch device:

<CodePen
  link="https://codepen.io/piccalilli/pen/emvBdae/c0ed51c7ebc182fe12fec6967a92c584"
  title="Buttons without touch-action applied"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

[<VPIcon icon="fa-brands fa-codepen"/>This link](https://cdpn.io/pen/debug/emvBdae/c0ed51c7ebc182fe12fec6967a92c584) has no CodePen framing to make that easier for you

:::

Here are the same buttons *with* `touch-action` applied:

<CodePen
  link="https://codepen.io/piccalilli/pen/myWOrzY/1c43253e5ffc8a38d68dd7fc42cccf7a"
  title="Buttons with touch-action applied"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

Again, [<VPIcon icon="fa-brands fa-codepen"/>here’s a frameless version](https://cdpn.io/pen/debug/myWOrzY/1c43253e5ffc8a38d68dd7fc42cccf7a) for you

:::

Handy!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Stop buttons triggering zoom when they’re double tapped",
  "desc": "It’s annoying when your browser zooms if a button is rapidly tapped. There’s actually a really simple fix and no, you don’t have to prevent all zooming with a meta tag!",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/stop-buttons-triggering-zoom-when-theyre-double-tapped.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
