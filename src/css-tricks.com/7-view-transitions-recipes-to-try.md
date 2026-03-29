---
lang: en-US
title: "7 View Transitions Recipes to Try"
description: "Article(s) > 7 View Transitions Recipes to Try"
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
      content: "Article(s) > 7 View Transitions Recipes to Try"
    - property: og:description
      content: "7 View Transitions Recipes to Try"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/7-view-transitions-recipes-to-try.html
prev: /programming/css/articles/README.md
date: 2026-04-13
isOriginal: false
author:
  - name: Sunkanmi Fafowora
    url: https://css-tricks.com/author/sunkanmifafowora/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="7 View Transitions Recipes to Try"
  desc="Craving for a view transition? Sunkanmi has lots of common transitions you can drop into your website right now!"
  url="https://css-tricks.com/7-view-transitions-recipes-to-try"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

View transitions are really, really neat. Not only that, but they’re starting to pop up *everywhere*. I’m sure you’re like me and have come across more than a few in the wild that both make you go *wow* and want to instantly use them on your own site or project.

At the same time, view transitions can be tricky to “get” at first. [**They can be simple**](/css-tricks.com/snippets-css/basic-view-transition.md), sure, but most anything beyond a cross-fade involves several moving parts.

I tend to find that the best way to learn something new is to see the code, use them myself, and then build upon them. So, I’ve collected seven view transition recipes for exactly that. We’ll go over the basic setup, demo the recipes, and turn you loose to experiment!

It’s perfectly fine to go below and just copy the one you like the most, but if you want to understand what view transitions are all about, then I recommend going through a [**quick introduction first**](/css-tricks.com/toe-dipping-into-view-transitions.md) before getting to the recipes.

Oh, and before we jump in, it’s worth noting that view transitions are indeed Baseline and supported by all major browsers as I’m writing this. But some types of animations may or may not be supported by a specific browser, so keep an eye on that and test, as always.

<BaselineStatus featureid="view-transitions" />

---

## The setup

For each view transition, we’ll need to do a little setup beforehand. First off, we need to *opt in* to them using the [**`@view-transition`**](/css-tricks.com/almanac-rules/view-transition.md) at-rule on **both pages** — the page we’re on and the page we’re transitioning to. If you’re using templates on your site, then this might go in the header template so it globally applies everywhere.

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
    types: <transition-type>;
  }
}
```

That `<transition-type>` is the only part you can’t directly copy-paste. It’s a placeholder for the `types` descriptor, [**something we’ve covered in detail before**](/css-tricks.com/what-on-earth-is-the-types-descriptor-in-view-transitions.md). It’s more nuanced than this, but `types` are basically the animation name we give to a specific transition. That way, if we’re working with multiple transitions, we can be explicit about which ones are active to prevent them from conflicting with one another. But read that linked article to get deeper into it.

Notice how we have the `@view-transition` walled behind the [**`prefers-reduced-motion: no-preference`**](/css-tricks.com/almanac-rules/media/prefers-reduced-motion.md)` media query. Not everyone wants movement on their pages and that’s a preference that can be set at the OS level, so we’ll respect that where needed this way.

Lastly, we’ll apply our animation as follows:

```css
html:active-view-transition-type(<transition-type>)::view-transition-old(root) {
  animation: a-cool-outgoing-animation 1.4s ease forwards;
}

html:active-view-transition-type(<transition-type>)::view-transition-new(root) {
  animation: a-cool-incoming-animation 1.4s ease forwards;
}
```

…where the `:active-view-transtion-type()` pseudo matches the transition `type` we define in the `@view-transition` rule. For example, if we’re calling an animation that we’ve named `bounce`, then we’d use that in the at-rule like this:

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
    types: <transition-type>;
  }
}
```

…as well as the pseudo like this:

```css
/* The "current" page */
html:active-view-transition-type(bounce)::view-transition-old(root) {
  animation: bounce-in 1.4s ease forwards;
}

/* The page we're transitioning to */
html:active-view-transition-type(bounce)::view-transition-new(root) {
  animation: bounce-in 1.4s ease forwards;
}
```

OK, that’s enough context to get started with the recipes. Again, feel free to use any of these in your own experiments or projects.

---

## Pixelate dissolve

This one’s sort of like a simple cross-fade, but blurs things out as the old page content fades out and the new page content fades in.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/View-transition-Pixelate-dissolve.mp4" />

::: details Full snippet

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
    types: pixelate-dissolve;
  }
}

html:active-view-transition-type(pixelate-dissolve)::view-transition-old(root) {
  animation: pixelate-out 1.4s ease forwards;
}

html:active-view-transition-type(pixelate-dissolve)::view-transition-new(root) {
  animation: pixelate-in 1.4s ease forwards;
}

@keyframes pixelate-out {
  0% {
    filter: blur(0px);
    opacity: 1;
  }
  100% {
    filter: blur(40px);
    opacity: 0;
  }
}

@keyframes pixelate-in {
  0% {
    filter: blur(40px);
    opacity: 0;
  }
  100% {
    filter: blur(0px);
    opacity: 1;
  }
}
```

:::

---

## Wipe up

Here, we’re using the [**`clip-path`**](/css-tricks.com/almanac.md#properties/c/clip-path/) property to achieve the “wipe-up” effect we’re the content for a new page slides up from the bottom, replacing the “old” content.

The process is straightforward: for the outgoing page, we move from its default `inset()` value of `0 0 0 0` (which creates a rectangle at the top, right, bottom, and left borders) of the page and change the **bottom** value to `100%`. Meaning, the page goes from **top** to **bottom**.

The incoming page starts clipping from the `top` at `100%` and goes down to `0`.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/View-transition-techniques_-Wipe-Up.mp4" />

::: details Full snippet

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
    types: wipe-up;
  }
}

html:active-view-transition-type(wipe-up)::view-transition-old(root) {
  animation: wipe-out 1.4s ease forwards;
}

html:active-view-transition-type(wipe-up)::view-transition-new(root) {
  animation: wipe-in 1.4s ease forwards;
}

@keyframes wipe-out {
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 0 100% 0);
  }
}

@keyframes wipe-in {
  from {
    clip-path: inset(100% 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

:::

We could just as easily make things wipe right, wipe bottom, and wipe left simply by changing the inset values. For example, here’s things wiping right:

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/wipe-right-edit.mp4" />

```css
@keyframes wipe-out {
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(0 0 0 100%);
  }
}

@keyframes wipe-in {
  from {
    clip-path: inset(0 100% 0 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

The wipe right works similarly to wipe up, except that the outgoing page goes from the center and cuts towards the right. That’s why the second value goes from `0` to `100%`. Similarly, the incoming page goes from `100%` from the left to `0`.

Same sort of deal with wiping downward:

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/View-Transition-Techniques_-Wipe-down.mp4" />

```css
@keyframes wipe-out {
  from {
    clip-path: inset(0 0 0 0);
  }
  to {
    clip-path: inset(100% 0 0 0);
  }
}

@keyframes wipe-in {
  from {
    clip-path: inset(0 0 100% 0);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

You get the idea!

---

## Rotate in-out

This one’s a little, um, weird. Definitely not the most practical thing in the world, but it does demonstrate how far you can go with view transitions.

We use the the [**`scale()` and `rotate()`**](/css-tricks.com/almanac.md#properties/t/transform/#aa-values) functions to zoom and rotate the page content, where the “old” page scales down to `0` and rotates clockwise by `180deg`. Following that, the “new” page content scales up to `1` and rotates counter-clockwise by `-180deg`. A little `opacity` is thrown in to help give the illusion that stuff is going out and coming in.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/View-Transition-Zoom-rotate.mp4" />

::: details Full snippet

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
    types: zoom-rotate;
  }
}

html:active-view-transition-type(zoom-rotate)::view-transition-old(root) {
  animation: zoom-rotate-out 1.4s ease forwards;
  transform-origin: center;
}

html:active-view-transition-type(zoom-rotate)::view-transition-new(root) {
  animation: zoom-rotate-in 1.4s ease forwards;
  transform-origin: center;
}

@keyframes zoom-rotate-out {
  to {
    transform: scale(0) rotate(180deg);
    opacity: 0;
  }
}

@keyframes zoom-rotate-in {
  from {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
}
```

:::

---

## Circle wipe-out

This one’s a lot more subtle than the last one. It could be a lot more noticeable if the content we’re transitioning to is more distinct. But as you’ll see in the following video, the “background between “old” and “new” pages share the same background, making for a more seamless transition.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/View-Transitions-Circular-Wipe-1.mp4" />

The circle comes courtesy of the [**`clip-pat`h**](/css-tricks.com/almanac-properties/clip-path.md) property, draws the shape from the center using the `circle()` function, going from from 0% (no size) to 150% (sized beyond the content), making it encapsulate the entire page.

::: details Full snippet

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
    types: circular-wipe;
  }
}

html:active-view-transition-type(circular-wipe)::view-transition-old(root) {
  animation: circle-wipe-out 1.4s ease forwards;
}

html:active-view-transition-type(circular-wipe)::view-transition-new(root) {
  animation: circle-wipe-in 1.4s ease forwards;
}

@keyframes circle-wipe-out {
  to {
    clip-path: circle(0% at 50% 50%);
  }
}

@keyframes circle-wipe-in {
  from {
    clip-path: circle(0% at 50% 50%);
  }
  to {
    clip-path: circle(150% at 50% 50%);
  }
}
```

:::

---

## Diagonal push

This one pushes out the “old” page with the “new” page from the bottom-right corner of the screen to the top-right corner — or, really, any corner we want by adjusting values.

For the bottom-right, I set the animation to translate to `-100%` on the X and Y axes, which pushes it away from the screen. Then it comes in from the opposite corner to its default position at `0%`. A little `opacity` helps smooth things out.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/View-Transitions-Diagonal-Slide.mp4" />

::: details lFull snippet

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
    types: diagonal-push;
  }
}

html:active-view-transition-type(diagonal-push)::view-transition-old(root) {
  animation: diagonal-out 1.4s ease forwards;
}

html:active-view-transition-type(diagonal-push)::view-transition-new(root) {
  animation: diagonal-in 1.4s ease forwards;
}

@keyframes diagonal-out {
  to {
    transform: translate(-100%, -100%);
    opacity: 0;
  }
}

@keyframes diagonal-in {
  from {
    transform: translate(100%, 100%);
    opacity: 0;
  }
}
```

:::

---

## Curtain reveal

This one’s like the a curtain is closing on the “old” page and opens up with the “new” page. It’s another one where the `inset()` function comes into play. We define rectangles placed 50% at the right and left. This increases to 50% when the page is going out and reduces to 0 when the page is coming in, making the image appear from the middle going to left and right like a curtain!

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/View-Transitions-Curtain-Reveal-1.mp4" />

::: details Full snippet

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
    types: curtain;
  }
}

html:active-view-transition-type(curtain)::view-transition-old(root) {
  animation: curtain-out 1.4s ease forwards;
}

html:active-view-transition-type(curtain)::view-transition-new(root) {
  animation: curtain-in 1.4s ease forwards;
}

@keyframes curtain-out {
  from {
    clip-path: inset(0 0 0 0);
  }
}

@keyframes curtain-in {
  from {
    clip-path: inset(0 50% 0 50%);
  }
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

:::

---

## 3D flip

We’re sort of faking one page “flipping” out like a two-sided card while the next page flips in, both along the Z axis.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/02/View-Transitions-Flip-3D-1.mp4" />

::: details Full snippet

```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition {
    navigation: auto;
    types: flip-3d;
  }
}

html:active-view-transition-type(flip-3d)::view-transition-old(root) {
  animation: flip-out 1.4s ease forwards;
}

html:active-view-transition-type(flip-3d)::view-transition-new(root) {
  animation: flip-in 1.4s ease forwards;
}

@keyframes flip-out {
  0% {
    transform: rotateY(0deg) translateX(0vw);
  }
  100% {
    transform: rotateY(-90deg) translateX(-100vw);
    opacity: 1;
  }
}

@keyframes flip-in {
  0% {
    transform: rotateY(90deg) translateX(100vw);
  }
  100% {
    transform: rotateY(0deg) translateX(0vw);
  }
}
```

:::

---

## Any cool recipes you want to share?

I would *love* to see more examples and ideas if you have them! Bramus (or Brandi, as I call him) took the time to [<VPIcon icon="fas fa-globe"/>create a bunch of view transition examples](https://page-transitions.style/spa/) in an interactive demo that are definitely worth looking at.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "7 View Transitions Recipes to Try",
  "desc": "Craving for a view transition? Sunkanmi has lots of common transitions you can drop into your website right now!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/7-view-transitions-recipes-to-try.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
