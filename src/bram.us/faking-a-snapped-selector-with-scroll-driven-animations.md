---
lang: en-US
title: "Solved by CSS Scroll-Driven Animations: A :snapped selector"
description: "Article(s) > Solved by CSS Scroll-Driven Animations: A :snapped selector"
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
      content: "Article(s) > Solved by CSS Scroll-Driven Animations: A :snapped selector"
    - property: og:description
      content: "Solved by CSS Scroll-Driven Animations: A :snapped selector"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/faking-a-snapped-selector-with-scroll-driven-animations.html
prev: /programming/css/articles/README.md
date: 2023-06-27
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2023/06/sda-snapped-v2.gif
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
  name="Solved by CSS Scroll-Driven Animations: A :snapped selector"
  desc="(Ab)using Scroll-Driven Animations to apply styles on elements that are snapped within their scroll-snapping enabled ancestor scroller."
  url="https://bram.us/bram.us/2023/06/26/faking-a-snapped-selector-with-scroll-driven-animations/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2023/06/sda-snapped-v2.gif"/>

<VidStack src="https://www.bram.us/wordpress/wp-content/uploads/2023/06/sda-snapped-v2.mp4" />

[<VPIcon icon="fas fa-globe"/>Scroll-Driven Animations](https://scroll-driven-animations.style/) can be used for more than driving an animation by scroll. In this post, I share how you can use Scroll-Driven Animations to fake a `:snapped` selector – a fictitious selector that matches elements that are currently snapped within their scroll-snapping enabled ancestor scroller.

---

## Intro

One of the cool and unexpected things of the upcoming Scroll-Driven Animations feature – coming in Chrome 115, which is released this July – is that it can be used well beyond its original intended use when combined with other CSS features.

[<VPIcon icon="fas fa-globe"/>Roma(n) Komarov](https://front-end.social/@kizu) for example has used them to [<VPIcon icon="fas fa-globe"/>apply styles when an element with sticky positioning is stuck](https://kizu.dev/scroll-driven-animations/) and even created [<VPIcon icon="fas fa-globe"/>text that shrinks to the available width](https://kizu.dev/fit-to-width-text/) with it. Or take [<VPIcon icon="fas fa-globe"/>Johannes Odland](https://front-end.social/@johannes)’s [<VPIcon icon="fas fa-globe"/>scroll-persisted state](https://johannesodland.github.io/state/scroll-snap/scroll-driven-animations/2023/06/18/scroll-persisted-state.html), which is quite unexpected. Or even my own [**Scroll-Triggered Animations hack**](/bram.us/scroll-triggered-animations.md) that’s built upon it.

In one of Johannes’s toots, [<VPIcon icon="fas fa-globe"/>the `:snapped` selector came up](https://front-end.social/@johannes/110578929538884564). It’s a fictitious selector that would match the element that is currently snapped within its parent scroller that has scroll-snapping applied to it. As you might have guessed already, that one too can also be faked with Scroll-Driven Animations.

---

## The Code

If you’re here just for the code, here it is. It is used in [the demo](#demo) below.

```css
@keyframes snapped {
  to {
    /* Declare your :snapped styles here */
  }
}

[data-snap-align] {
  scroll-snap-type: x mandatory;
}

[data-snap-align] > * {
  animation: snapped steps(1, start);
  animation-timeline: view(inline);
}

[data-snap-align="start"] > * {
  scroll-snap-align: start;
  animation-range: exit -1px exit 1px;
}
[data-snap-align="center"] > * {
  scroll-snap-align: center;
  animation-range: cover calc(50% - 1px) cover calc(50% + 1px);
}

[data-snap-align="end"] > * {
  scroll-snap-align: end;
  animation-range: entry calc(100% - 1px) entry calc(100% + 1px);
}
```

---

## How it works

At the core sites a scroll-driven animation that is linked to each element using a View Timeline. In the `to` keyframe block, the styles that need to apply when the element snapped are declared.

```css
@keyframes snapped {
  to {
    /* Declare your :snapped styles here */
  }
}

[data-snap-align] {
  scroll-snap-type: x mandatory;
}

[data-snap-align] > * {
  animation: snapped steps(1, start);
  animation-timeline: view(inline);
}
```

Depending on the `scroll-snap-align` property value *(`start`, `center`, or `end`)*, the `animation-range` must also be set to a different value. The thing that might trip you up here is that the `start` of scroll-snapping maps to the `exit` range of Scroll-Driven Animations. It feels like they are opposites, but in fact they are not:

- `scroll-snap-align: start` = right before the element is about to exit the scroller = around `exit 0%`
- `scroll-snap-align: center` = when the element is at the center of the scroller = around `cover 50%`
- `scroll-snap-align: end` = when the element has entered the scroller completely = around `entry 100%`

Because you can’t set the start and end range to the same value – the animation would not run in that case – you need to give it some space to run. You do this by adding/subtracting `1px` from the range-start and range-end. For the elements with `scroll-snap-align: end;`, for example, the range becomes this:

```css
[data-snap-align="end"] > * {
  scroll-snap-align: end;
  animation-range: entry calc(100% - 1px) entry calc(100% + 1px);
}
```

Finally, to prevent elements from being animated midway – which can happen as I’ve noticed – don’t use a `linear` timing function but use a `steps`-based one.

```css
[data-snap-align] > * {
  animation: snapped steps(1, start);
  animation-timeline: view(inline);
}
```

---

## Demo

Try out the code shown above in the pen below. Note that your browser needs to support Scroll-Driven Animations for it to work, which is Chrome 115 at the time of writing.

<CodePen
  user="bramus"
  slug-hash="zYMoNvg"
  title="(Ab)using Scroll-Driven Animations to fake Scroll-Snapping :snapped"
  :default-tab="['css','result']"
  :theme="dark"/>

If your browser does not support Scroll-Driven Animations, you can see a recording embedded at the top of this post.

---

## It’s not perfect

While the code allows you mimic what a hypothetical `:snapped` selector would give you, it’s not perfect:

- The state applies before the scroll has actually snapped. If you scroll quickly, you can see some items apply the animation even though the scroller is still scrolling. Same if you scroll slowly across a point where it should snap.
- It’s implemented using animations. This can have some unwanted side-effects because animations are [<VPIcon icon="iconfont icon-w3c"/>a separate origin in the cascade](https://w3.org/TR/css-cascade-5/#cascading-origins).
- It requires scroll-driven animations.

You could work around some of these with some extra JavaScript that listens for [<VPIcon icon="fa-brands fa-chrome"/>the `scrollend` event](https://developer.chrome.com/blog/scrollend-a-new-javascript-event/) and/or [**make it a Scroll-Triggered Animation**](/bram.us/scroll-triggered-animations.md), but still it would remain a hacky way to achieve all this. To me, this exactly makes the case to eventually have a proper way to to apply styles onto snapped elements built straight into CSS.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Solved by CSS Scroll-Driven Animations: A :snapped selector",
  "desc": "(Ab)using Scroll-Driven Animations to apply styles on elements that are snapped within their scroll-snapping enabled ancestor scroller.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/faking-a-snapped-selector-with-scroll-driven-animations.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
