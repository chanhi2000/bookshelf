---
lang: en-US
title: "Creating Scroll-Triggered Animations by combining Scroll-Driven Animations, Custom Properties, Style Queries, and Transitions"
description: "Article(s) > Creating Scroll-Triggered Animations by combining Scroll-Driven Animations, Custom Properties, Style Queries, and Transitions"
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
      content: "Article(s) > Creating Scroll-Triggered Animations by combining Scroll-Driven Animations, Custom Properties, Style Queries, and Transitions"
    - property: og:description
      content: "Creating Scroll-Triggered Animations by combining Scroll-Driven Animations, Custom Properties, Style Queries, and Transitions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/scroll-triggered-animations.html
prev: /programming/css/articles/README.md
date: 2023-06-16
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2023/06/scroll-triggered-animations-025-10fps.gif
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
  name="Creating Scroll-Triggered Animations by combining Scroll-Driven Animations, Custom Properties, Style Queries, and Transitions"
  desc="When you combine Scroll-Driven Animations with Custom Properties, Style Queries, and Transitions you hack your way into creating Scroll-Triggered Animations."
  url="https://bram.us/bram.us/2023/06/15/scroll-triggered-animations/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2023/06/scroll-triggered-animations-025-10fps.gif"/>

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2023/06/scroll-triggered-animations-050.mp4" />

Thanks to the [<VPIcon icon="fas fa-globe"/>Scroll-Driven Animations Level 1 Specification](https://drafts.csswg.org/scroll-animations-1/) it is now possible to [**drive CSS/WAAPI animations by scroll**](/bram.us/introducing-scroll-driven-animations-style.md). Not included in that spec are Scroll-Triggered Animations: animations that run when you reach a certain scroll offset.

However, when you combine Scroll-Driven Animations with Custom Properties, Style Queries, and Transitions you can hack your way into creating Scroll-Triggered Animations.

---

## The Code

If you’re here for just the code, here it is. You can see this code in action in [the demo](#demo).

```css
@keyframes flipthebit {
  from {
    --bit: 0;
  }
  to {
    --bit: 1;
  }
}

:has(> .revealing-image) {
  display: block;
  animation: flipthebit linear both;
  animation-timeline: view();
  animation-range: contain 25% contain 25%;
}

@container style(--bit: 0) {
  .revealing-image {
    opacity: 0;
    clip-path: inset(0% 60% 0% 50%);
  }
}
@container style(--bit: 1) {
  .revealing-image {
    opacity: 1;
    clip-path: inset(0% 0% 0% 0%);
  }
}

.revealing-image {
  transition: all 0.5s ease-in-out;
}
```

If you want to know how it works, read on …

---

## How it works

The code is pretty big, and is a few things working together:

1. A [**Scroll-Driven Animation**](/bram.us/introducing-scroll-driven-animations-style.md) which toggles a [**Custom Property**](/bram.us/css-variables-var-subtitle.md) `--bit` between `0` and `1`
2. A [**Style Query**](/bram.us/container-queries-style-queries.md) responding to that Custom Property, applying different styles based the Custom Property value
3. CSS Transitions to “animate” between the two states.

Let’s go over each part individually …

### 1. The Animation

```css
@keyframes flipthebit {
  from {
    --bit: 0;
  }
  to {
    --bit: 1;
  }
}

:has(> .revealing-image) {
  display: block;
  animation: flipthebit linear both;
  animation-timeline: view();
  animation-range: contain 25% contain 25%;
}
```

The animation is a set of keyframes `flipthebit` that change a custom property from `0` to `1`. It is linked to View Timeline (`animation-timeline: view();`) tracking the parent element of the element that needs to animate.

To trigger the animation at a certain point in space, the `animation-range` is set. Its start and end are the same, as the bit flipping needs to happen in an instant.

### 2. The Style Query

```css
@container style(--bit: 0) {
  .revealing-image {
    opacity: 0;
    clip-path: inset(0% 60% 0% 50%);
  }
}
@container style(--bit: 1) {
  .revealing-image {
    opacity: 1;
    clip-path: inset(0% 0% 0% 0%);
  }
}
```

With the `--bit` flipping between `0` and `1`, the animation target can respond to that using a [**Style Query**](/bram.us/container-queries-style-queries.md). When the value is `0`, one set of styles apply. When the value is `1`, different styles apply.

Basically the styles for `style(--bit: 0)` are the `from` styles, and the styles for `style(--bit: 0)` are the `to` styles.

::: note UPDATE

Reader [<VPIcon icon="fas fa-globe"/>Ana Tudor pointed out](https://front-end.social/@anatudor@mastodon.social/110550224040867248) you can do without a Style Query, by using `--bit` directly into `calc()` to get the result.

I’ve described this [**Binary Custom Properties technique**](/bram.us/the-future-of-css-higher-level-custom-properties-to-control-multiple-declarations.md#binary-custom-properties) before but must admit I’m not a big fan of it as it makes the code harder to read and doesn’t play nice with non-numeric values. Yes, you could move on to using Space Toggles in the latter case, but then again the code still is complicated to read/understand.

:::

### 3. The Transition

```css
.revealing-image {
  transition: all 0.5s ease-in-out;
}
```

To create the illusion of an animation, CSS Transitions are used. The set `transition-duration` of `0.5s` is used to determine the “animation”’s duration.

---

## Demo

Here’s a demo that has it all together. If you don’t see any animation, that’s because your browser doesn’t support all necessary requirements. Check the [Browser support](#browser-support) section to see which browsers are supported.

<CodePen
  user="bramus"
  slug-hash="ExOxLGX"
  title="Scroll-Triggered Animations with Scroll-Driven Animations, Custom Properties, Style Queries, and Transitions (Scroll-Triggered Image Reveal)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Known limitations

While this approach works, it’s kinda nasty and has a few limitations that I see:

1. These are no true animations but transitions.
2. It requires a parent element to hook the scroll-driven animation onto.
3. Requires Style Queries with Custom Properties to be implemented as well.
4. The animations also run in reverse when scrolling back up. This is not always feasible.

Most likely there are more limitations which I’m currently overlooking.

---

## In Closing

This was a fun experiment to do. However, it’s only an experiment and to me makes the case that **we still need proper Scroll-Triggered Animations in the future** – maybe something to work one for `scroll-animations-2`? 😉

---

## Browser support

This is supported by all browsers that support Scroll-Driven Animations and Style Queries. Currently, at the time of writing, this are only Chromium-based browsers *(Google Chrome, Microsoft Edge, Brave, Arc, …)* versions 115 and up.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating Scroll-Triggered Animations by combining Scroll-Driven Animations, Custom Properties, Style Queries, and Transitions",
  "desc": "When you combine Scroll-Driven Animations with Custom Properties, Style Queries, and Transitions you hack your way into creating Scroll-Triggered Animations.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/scroll-triggered-animations.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
