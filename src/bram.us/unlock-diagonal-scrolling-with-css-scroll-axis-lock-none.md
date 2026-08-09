---
lang: en-US
title: "Unlock Immediate Diagonal Scrolling with CSS scroll-axis-lock: none"
description: "Article(s) > Unlock Immediate Diagonal Scrolling with CSS scroll-axis-lock: none"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Unlock Immediate Diagonal Scrolling with CSS scroll-axis-lock: none"
    - property: og:description
      content: "Unlock Immediate Diagonal Scrolling with CSS scroll-axis-lock: none"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/unlock-diagonal-scrolling-with-css-scroll-axis-lock-none.html
prev: /programming/css/articles/README.md
date: 2026-08-09
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2026/08/scroll-axis-lock-comparison.gif
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
  name="Unlock Immediate Diagonal Scrolling with CSS scroll-axis-lock: none"
  desc="When you scroll a 2D scroller on a website, the browser does a lot of work behind the scenes to keep you on track. One of the things it typically does is scroll axis-locking (aka “railing”), ignoring some minor scroll deltas in the non-main scrolling axis. While helpful most of the times, this sometimes can get in the way such as in map or image zoom interfaces. With the new CSS scroll-axis-lock property you can disable the browser's default scroll axis-locking behavior, allowing users to immediately perform a diagonal scroll."
  url="https://bram.us/2026/08/09/unlock-diagonal-scrolling-with-css-scroll-axis-lock-none/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2026/08/scroll-axis-lock-comparison.gif"/>

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2026/08/scroll-axis-lock-comparison.mp4" />

> Recording of [<VPIcon icon="fas fa-globe"/>the demo](https://whole-fog-anteater.codepen.app/) comparing what the browser does with and without scroll railing.

When you scroll a 2D scroller on a website, the browser does a lot of work behind the scenes to keep you on track. One of the things it typically does is scroll axis-locking *(aka “railing”)*, ignoring some minor scroll deltas in the non-main scrolling axis. While helpful most of the times, this sometimes can get in the way such as in map or image zoom interfaces. With the new CSS `scroll-axis-lock` property you can disable the browser’s default scroll axis-locking behavior, allowing users to immediately perform a diagonal scroll.

---

## Scroll Axis Locking?

By default, a browser often “locks” a user’s scrolling gesture to a single axis when that gesture starts with significantly more movement in one axis than in the perpendicular axis.

For example, say a user drags their finger on the screen such that the element underneath the finger would be scrolled by 500px in the y-axis and 3px in the x-axis. Because the gesture is almost entirely vertical, the browser might interpret the user’s intent to be a perfectly vertical scroll. As such, the browser can ignore the 3px scroll delta and (possibly) all further x-axis deltas for the remainder of the gesture. In this case, the browser has “locked” the scroll to the y-axis — a technique also known as *“railing”*.

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2026/08/scroll-axis-lock-example.mp4" />

> Use Up/Down Arrow keys to increase or decrease volume.

Recording of [<VPIcon icon="fas fa-globe"/>the demo](https://whole-fog-anteater.codepen.app/) showing a vertical scroll performed on a trackpad. Even though the user input (the dashed red line) was not perfectly straight, the browser performed a perfect vertical scroll (solid blue line)

In many cases, this scroll-locking behavior improves the user’s experience by avoiding accidental scrolls along the other axis when the user’s intent was to scroll only one axis.

However, in cases where you wish an element to always be diagonally scrollable, this locking behavior forces the user to start their gesture at an angle that doesn’t trigger the locking, often not in alignment with the author’s intended user experience.

Thankfully, a recent change to CSS now offers control over this, namely the `scroll-axis-lock` property described in the [<VPIcon icon="iconfont icon-w3c"/>CSS Overflow 5 specification](https://drafts.csswg.org/css-overflow-5/#scroll-axis-locking).

::: note 💁‍♂️

Note that **this axis-locking behavior totally depends on the browser and platform**. Safari and Firefox on macOS for example are very strict at it, while Chrome on macOS tries to more closely reflect your scroll’s intent *(but still applies some locking)*

Compare these two screenshots of Safari and Chrome: Safari’s scroll axis-locking results in a more [<VPIcon icon="fa-brands fa-google"/>etch-a-sketch](https://google.com/search?q=etch-a-sketch)-like scroll when scrolling in the shape of a circle (or attempt thereof 😅).

![A circle-shaped scroll performed in Safari on macOS. The actual scroll (solid blue line) is much more angled the actual scroll input (dashed red line)](https://bram.us/wordpress/wp-content/uploads/2026/08/scroll-circle-safari.png)

![A circle-shaped scroll performed in Chrome on macOS. The scroll (solid blue line) resembles the scroll input (dashed red line), but is not 100% following the input.](https://bram.us/wordpress/wp-content/uploads/2026/08/scroll-circle-chrome.png)

As for touch-platforms: From what I can tell, Safari on iOS doesn’t scroll lock at all, whereas Chrome on Android does.

:::

---

## Control scroll axis-locking with `scroll-axis-lock`

The `scroll-axis-lock` property gives you control scroll axis-locking. The property accepts the following values:

- `auto` *(default)*: The browser may lock the scroll to a single axis if it determines the gesture is predominantly 1-dimensional. The browser may allow you to break out of scroll axis lock as part of your current gesture, but the thresholds to do that are different per browser and platform.
- `none`: Disables the locking mechanism entirely. The scroll container will faithfully follow the user’s exact input, allowing for unrestricted diagonal panning.

```css
.scroller {
  scroll-axis-lock: auto; /* Default */
  /* or */
  scroll-axis-lock: none;
}
```

In the following video, you can compare how both values behave. The recording show Chrome 153 on macOS, but with a different `scroll-axis-lock` value. The scroll is performed using a trackpad.

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2026/08/scroll-axis-lock-comparison.mp4" />

> Recording of [<VPIcon icon="fas fa-globe"/>the demo](https://whole-fog-anteater.codepen.app/) comparing what the browser does with and without scroll railing.

The difference also becomes very clear when doing scrolls that follow a circular motion:

![A scroll performed in Chrome on macOS with `scroll-axis-lock: auto`. The scroll (solid blue line) resembles the scroll input (dashed red line), but is not 100% following the input.](https://bram.us/wordpress/wp-content/uploads/2026/08/scroll-axi-lock-auto.png)

![A scroll performed in Chrome on macOS with `scroll-axis-lock: none`. Because scroll axis-locking is disabled, the scroll (solid blue line) is identical to the scroll input (dashed red line).](https://bram.us/wordpress/wp-content/uploads/2026/08/scroll-axis-lock-none.png)

---

## Try it yourself

To feel the difference yourself *(and to create the screenshots and videos above)*, I built [<VPIcon icon="fas fa-globe"/>a demo](https://whole-fog-anteater.codepen.app/) that samples your pointer’s X/Y input deltas and compares them against the actual `scrollLeft` and `scrollTop` output of the container.

<CodePen
  link="https://codepen.io/editor/bramus/pen/019fd676-4412-7aad-8312-47c332bf7702"
  title="Scroll Axis Locking (Scroll Railing)"
  :default-tab="['css','result']"
  :theme="dark"/>

If you try scrolling diagonally with `scroll-axis-lock: auto`, you’ll notice the status indicator flag can show a “Axis Locked” warning it detects that the browser is ignoring your perpendicular input. As mentioned before this totally depends on the browser and platform, so could be that you don’t see this warning at all.

If you set the toggle to `scroll-axis-lock: none`, and try again, scrolling straight is way more “jittery” and scrolling diagonally *immediately* pans in both directions simultaneously, exactly following your gesture.

---

## Browser Support

::: info 💡

Although this post was originally published in August 2026, the list below is constantly being updated. *Last update: Aug 9, 2026*.

:::

Support for `scroll-axis-lock` looks like this:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-chrome"/>Chromium *(Blink)*

✅ Supported in Chromium 153


@tab <VPIcon icon="fa-brands fa-firefox"/>Firefox *(Gecko)*

❌ No Support


@tab <VPIcon icon="fa-brands fa-safari"/>Safari *(WebKit)*

❌ No Support

:::

---

## Feature Detection

There is no real need to feature detect this, as you can safely use `scroll-axis-lock` today as a progressive enhancement. Since it doesn’t break anything when ignored, you can just declare it directly 🙂

If you really do need to feature detect it — perhaps to load some alternative code? — you can use an `@supports` rule in CSS or `CSS.supports()` in JS to check.

```css
@supports (scroll-axis-lock: none) {
  /* Control over scroll-axis locking supported */
}
```

```js
if (CSS.supports('scroll-axis-lock: none')) {
  /* Control over scroll-axis locking supported */
}
```

The following embed uses this feature detection to indicate whether your current browser supports `scroll-axis-lock`:

<CodePen
  user="bramus"
  slug-hash="vEgbwgr"
  title="CSS scroll-axis-lock Support test"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Unlock Immediate Diagonal Scrolling with CSS scroll-axis-lock: none",
  "desc": "When you scroll a 2D scroller on a website, the browser does a lot of work behind the scenes to keep you on track. One of the things it typically does is scroll axis-locking (aka “railing”), ignoring some minor scroll deltas in the non-main scrolling axis. While helpful most of the times, this sometimes can get in the way such as in map or image zoom interfaces. With the new CSS scroll-axis-lock property you can disable the browser's default scroll axis-locking behavior, allowing users to immediately perform a diagonal scroll.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/unlock-diagonal-scrolling-with-css-scroll-axis-lock-none.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
