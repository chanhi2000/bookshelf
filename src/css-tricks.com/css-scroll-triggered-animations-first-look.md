---
lang: en-US
title: "A First Look at Scroll-Triggered Animations"
description: "Article(s) > A First Look at Scroll-Triggered Animations"
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
      content: "Article(s) > A First Look at Scroll-Triggered Animations"
    - property: og:description
      content: "A First Look at Scroll-Triggered Animations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-scroll-triggered-animations-first-look.html
prev: /programming/css/articles/README.md
date: 2026-06-19
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/sceroll-triggered-squares.webp
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
  name="A First Look at Scroll-Triggered Animations"
  desc="Let's poke at the differences between scroll-driven and scroll-triggered animations."
  url="https://css-tricks.com/css-scroll-triggered-animations-first-look"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/sceroll-triggered-squares.webp"/>

Chrome has shipped scroll-triggered animations, and is the first browser to do so. If you update to [<VPIcon icon="fa-brands fa-chrome"/>Chrome 146](https://developer.chrome.com/release-notes/146), you can view the demo below, where the background of a square fades in over the duration of `300ms`, but only once the whole element is within the viewport.

<CodePen
  user="anon"
  slug-hash="WbGdJRe"
  title="Scroll-triggered animation demo (while fully visibile)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/1-1.mp4" />

This is a bit different to how [**scroll-_driven_ animations**](/css-tricks.com/scroll-driven-scroll-triggered-scroll-states-and-view-transitions.md) work, so in this article I’ll compare them, and then show you how scroll-triggered animations work.

---

## Scroll-triggered animations vs. scroll-driven animations

Scroll-triggered animations play for a fixed duration once a certain scroll threshold has been surpassed. (Think JavaScript’s [**Intersection Observer API**](/css-tricks.com/an-explanation-of-how-the-intersection-observer-watches.md) but for CSS animations.)

This differs from scroll-driven animations, where animation progression is synchronized with scroll progression (`animation-timeline: scroll()`) or the degree of intersection (`animation-timeline: view()`), and thus has no duration.

---

## Basic scroll-triggered animation example

The key part is `timeline-trigger: view()` instead of `animation-timeline: view()`, which waits for the element to be within the threshold instead of measuring *how much* it’s within it and doing something accordingly. However, let’s start with the actual `@keyframes` animation, which sets the `background`:

```css
/* Define the animation */
@keyframes fade-bg-in {
  to {
    background: currentColor;
  }
}
```

It’s set on the `.square` over the duration of `300ms`:

```css
.square {
  /* Declare animation */
  animation: fade-bg-in 300ms;
}
```

By default, CSS animations trigger when the declaration is applied, but in the expanded snippet below, `timeline-trigger` overwrites that behavior. Now the animation triggers when the element comes into `view()`. The `--trigger` is simply a dashed ident that acts as an identifier for the trigger, whereas `entry 100% exit 0%` is a timeline range. A timeline range specifies the scroll zone in which the animation activates and is allowed to remain active.

In this case, the animation triggers when the bottom edge of the `.square` enters the (`entry 100%`) and untriggers (assuming that it’s still running) when the top edge exits the scrollport (`exit` `0%`). For clarity, `entry 0%` would trigger the animation when the *top* edge enters. `entry` handles the element coming in from the bottom of the scrollport, whereas `exit` handles it leaving through the top. It’s a bit confusing, but it’s easier to understand if I don’t over-explain it.

```css
.square {
  /* Declare animation */
  animation: fade-bg-in 300ms;

  /* Animation trigger conditions */
  timeline-trigger: --trigger view() entry 100% exit 0%;
}
```

For `animation-trigger`, we first specify which trigger we’re talking about, and then we declare some settings (e.g., `play-forwards`):

```css
.square {
  /* Declare animation */
  animation: fade-bg-in 300ms;

  /* Animation trigger conditions */
  timeline-trigger: --trigger view() entry 100% exit 0%;

  /* Animation trigger settings */
  animation-trigger: --trigger play-forwards;
}
```

<CodePen
  user="anon"
  slug-hash="jEMmLPz"
  title="Scroll-triggered animation demo (play-forwards, none)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/scroll-triggered-2.mp4" />

The `play-forwards` keyword triggers the animation whenever the square becomes completely visible, and since we haven’t declared a fill mode for the animation (using `animation-fill-mode` or as part of the `animation` shorthand), which means that the square won’t retain the background after, the animation is more of a flash.

So, we need to build upon this to achieve different results.

---

## `animation-fill-mode` vs. `<animation-action>`

First, a recap of what the different fill mode values do for `animation-fill-mode` or as part of the `animation` shorthand:

- **`forwards`:** the styles are retained *after* the animation.
- **`backwards`:** the styles are applied *before* the animation.
- **`both`:** both behaviors are applied.

Now, let’s assume that the `<animation-action>` is `play-forwards` (like before) and the fill mode is `forwards` (`both` would be redundant because `background` isn’t even set to begin with):

```css
.square {
  animation: fade-bg-in 300ms forwards;
  timeline-trigger: --trigger view() entry 100% exit 0%;
  animation-trigger: --trigger play-forwards;
}
```

<CodePen
  user="anon"
  slug-hash="wBzYaaP"
  title="Scroll-triggered animation demo (play-forwards, forwards)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/scroll-triggered-3.mp4" />

This causes the styles to be retained, but, if the square partially or completely exits the viewport and then reenters it, the animation restarts, which can cause a flash depending on how the animation ends, which is what happens in this instance.

There are two different ways to solve this…

The “lock-in” method: Use `play-once` instead of `play-forwards`, which, when combined with `forwards`, results in the animation playing once, never to restart, and then retaining the styles afterward.

```css
.square {
  /* Play once */
  animation-trigger: --trigger play-once;

  /* Retain the styles */
  animation: fade-bg-in 300ms forwards;

  timeline-trigger: --trigger view() entry 100% exit 0%;
}
```

<CodePen
  user="anon"
  slug-hash="myrzJLB"
  title="Scroll-triggered animation demo (play-once, forwards)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/scroll-triggered.mp4" />

The “back-and-forth” method: `play-forwards play-backwards` animates the element normally when fully visible and in reverse when no longer fully visible. There’s no flash because the element animates backward as smoothly as it animates forward. In addition, even though the direction of the animation can change, the fill mode can remain at `forwards` instead of being set to `both`.

*Why?*

`play-forwards` means “play the animation from 0% to 100%” whereas `play-backwards` means “play the animation from 100% to 0%.” Meanwhile, as I mentioned earlier, the `forwards` fill mode means “retain the styles when the animation completes’”— well, this is regardless of whether the final keyframe is 0% or 100%.

```css
.square {
  /* Play forward and backward, as appropriate */
  animation-trigger: --trigger play-forwards play-backwards;

  /* Retain the styles either way */
  animation: fade-bg-in 300ms forwards;

  timeline-trigger: --trigger view() entry 100% exit 0%;
}
```

<CodePen
  user="anon"
  slug-hash="XJjxbwX"
  title="Scroll-triggered animation demo (play-forwards play-backwards, forwards)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/scroll-triggered-5.mp4" />


`play-forwards`, `play-once`, and `play-backwards` aren’t the only keywords for `<animation-action>`. Here’s a quick rundown:

| **`<animation-action>`** | **Effect** |
| --- | --- |
| `none` | For disabling triggers conditionally, on entry but not exit (or vice-versa), or handling multiple triggers with one `animation-trigger` |
| `play-forwards` | Allows the animation to play forward |
| `play-backwards` | Allows the animation to play backward |
| `play-once` | Forward or backward (whichever comes first) |
| `play` | Plays in the last specified direction, or forward if neither has been specified |
| `pause` | Pauses the animation |
| `reset` | Pauses the animation and sets progress to 0 |
| `replay` | Sets progress to 0 but doesn’t pause the animation |

These `<animation-action>`s not only allow for a significant amount of control over animations while scrolling, but different combinations of actions, fill modes, timeline ranges, and the fact that we can bake exit animations into `@keyframes` rules means that there are often multiple ways to achieve an outcome.

---

## Scroll-triggering multiple elements

While scroll-triggered animations being made up of animation actions, fill modes, timeline ranges, and maybe more, might seem overcomplicated, the fact that these mechanics are decoupled enable us to reuse logic while maintaining flexibility, reducing repetition and making the mechanics more design system-friendly.

Consider three squares this time, and for a bit of added complexity, we declare `scale: 70%` (animates to `initial`) and define two rotative animations.

```html
<div id="squares">
  <div class="square rotate-left"></div>
  <div class="square"></div>
  <div class="square rotate-right"></div>
</div>
```

```css
/* Define animations */
@keyframes intensify {
  to {
    scale: initial;
    background: currentColor;
  }
}

@keyframes rotate-left {
  to {
    rotate: -5deg;
  }
}

@keyframes rotate-right {
  to {
    rotate: 5deg;
  }
}

.square {
  /* Set starting value */
  scale: 70%;
}
```

After that it’s more of the same, and while it’s obviously a more complex example, being able to merge values into shorthand properties and decouple them into longhand properties, as well as the decoupled nature of the different mechanics, facilitates flexibility but also reusability (in this case, to stagger various animations using the same animation trigger settings):

```css :collapsed-lines
.square {
  /* Set starting value */
  scale: 70%;

  /* Define animation name */
  --base-animation: intensify;

  /* Declare animation */
  animation: var(--base-animation) 300ms forwards;

  /* Define animation trigger settings */
  --animation-trigger: --trigger play-forwards play-backwards;

  /* Declare for intensify, then for one of either rotate animations */
  animation-trigger: var(--animation-trigger), var(--animation-trigger);

  /* Declare animation trigger conditions (without timeline ranges) */
  timeline-trigger: --trigger view();

  /* Declare active range end */
  timeline-trigger-active-range-end: normal;

  /* Append other animations */
  &.rotate-left {
    animation-name: var(--base-animation), rotate-left;
  }

  &.rotate-right {
    animation-name: var(--base-animation), rotate-right;
  }

  /* Stagger activation ranges */
  &:first-child {
    timeline-trigger-activation-range-start: entry 33.3333%;
  }

  &:nth-child(2) {
    timeline-trigger-activation-range-start: entry 66.6666%;
  }

  &:last-child {
    timeline-trigger-activation-range-start: entry 99.9999%;
  }
}
```

<CodePen
  user="anon"
  slug-hash="RNGvRWo"
  title="Scroll-triggered animation demo (staggered animations)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/scroll-triggered-6.mp4" />

Here’s a cleaner, more robust version that uses [**`sibling-count()`**](/css-tricks.com/almanac-functions/sibling-count.md) and [**`sibling-index()`**](/css-tricks.com/almanac-functions/sibling-index.md) (which lack Firefox support) to stagger the animations:

<CodePen
  user="anon"
  slug-hash="ogzOjEN"
  title="Scroll-triggered animation demo (staggered animations using sibling-count() and sibling-index())"
  :default-tab="['css','result']"
  :theme="dark"/>

In this version, instead of setting `timeline-trigger-activation-range-start` on each individual square, we simply target `.square` and calculate the entry values on the fly:

```css
/* Maximum entry ÷ number of squares */
--stagger-interval: calc(100% / sibling-count());

/* Current square’s index × stagger interval */
--entry: calc(sibling-index() * var(--stagger-interval));

/* Declare animation trigger conditions */
timeline-trigger: --trigger view() entry var(--entry) exit 0%;
```

---

## Making one element trigger other elements

In this case, we’ll shift the trigger and its ranges to the first square, and have the other squares follow according to a staggered animation delay. As you can see, all animations are triggered by `animation-trigger` once 50% of the first square has entered (`entry 50%`) the viewport (`view()`). `animation-trigger` is triggered by `timeline-trigger` because the dashed ident (the aptly named `--trigger`) links them:

```css :collapsed-lines
/* Define animations */
@keyframes intensify {
  to {
    scale: initial;
    background: currentColor;
  }
}

@keyframes rotate-left {
  to {
    rotate: -5deg;
  }
}

@keyframes rotate-right {
  to {
    rotate: 5deg;
  }
}

.square {
  /* Set starting value */
  scale: 70%;

  /* Define animation name */
  --base-animation: intensify;

  /* Maximum delay ÷ number of squares */
  --stagger-interval: calc(300ms / sibling-count());

  /* Current square’s index × stagger interval */
  --animation-delay: calc(sibling-index() * var(--stagger-interval));

  /* Declare animation */
  animation: var(--base-animation) 300ms var(--animation-delay) forwards;

  /* Define animation trigger settings */
  --animation-trigger: --trigger play-forwards play-backwards;

  /* Declare for intensify, then for one of either rotate animations */
  animation-trigger: var(--animation-trigger), var(--animation-trigger);

  &:first-child {
    /* Declare animation trigger conditions */
    timeline-trigger: --trigger view() entry 50%;

    /* Declare active range end */
    timeline-trigger-active-range-end: normal;
  }

  /* Append other animations */
  &.rotate-left {
    animation-name: var(--base-animation), rotate-left;
  }

  &.rotate-right {
    animation-name: var(--base-animation), rotate-right;
  }
}
```

<CodePen
  user="anon"
  slug-hash="raMbbyX"
  title="Scroll-triggered animation demo (one element triggers other elements)"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/04/scroll-triggered-7.mp4" />

One downside is that when `animation-trigger` is in `play-backwards` mode, the animations don’t stagger. This is because, *I think*, when the animation is reversed, the delay is included in that. This seems like an oversight to me, especially as that isn’t the case with `animation-direction: reverse`, but I could be completely wrong on this.

---

## Understanding timeline ranges

Timeline ranges are a big part of scroll-triggered animations, but they’re a separate mechanic. For scroll-*driven* animations, you’ll want `animation-range` and its longhand properties. With scroll-*triggered* animations, the syntax is fundamentally the same but uses different properties and two different ranges. The activation range determines the scroll zone in which the animation triggers, while the active range determines the zone in which it holds up (even if not in the activation range anymore).

Timeline ranges are a bit heavy. However, `view() entry 100% exit 0%` (when fully visible) and `view() contain` (the same but also if larger than the viewport) will suffice most of the time.

But if you’re keen to dive in, [**`animation-range`**](/css-tricks.com/almanac-properties/animation-range.md), although it’s for scroll-*driven* animations, is lighter and offers a novice-level understanding of timeline ranges. After that, I recommend reading the [<VPIcon icon="iconfont icon-w3c"/>Animation Triggers spec](https://drafts.csswg.org/animation-triggers-1/) to cover the many intricacies of timeline ranges within the context of these scroll-triggered animations.

Another ingredient of scroll-triggered animations that’s also its own thing is the [**`view()`**](/css-tricks.com/almanac-functions/view.md) function, but this one’s easier to summarize here. Basically, when it comes to scroll-triggered animations, `view()` is the viewport. So if you had a `5rem` sticky header, `view(y 0 5rem)` would make the timeline range factor that in along the y-axis.

---

## Final thoughts

Scroll-triggered animations can be tricky because they’re similar to scroll-driven animations, they leverage older CSS features (mainly `animation`) as well as mechanics from other newer features (dashed idents, `view()`, timeline ranges), in addition to the CSS properties that are specific to scroll-triggered animations. There’s a whole lot happening at once.

I’m not sure how I feel about them, to be honest. They’re definitely cool, fun, and useful, but they’re also complicated, and it’ll be a while before I really start to rave about them.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A First Look at Scroll-Triggered Animations",
  "desc": "Let's poke at the differences between scroll-driven and scroll-triggered animations.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-scroll-triggered-animations-first-look.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
