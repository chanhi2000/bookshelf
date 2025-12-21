---
lang: en-US
title: "animation"
description: "Article(s) > animation"
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
      content: "Article(s) > animation"
    - property: og:description
      content: "animation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/almanac-properties/animation.html
prev: /programming/css/articles/README.md
date: 2024-09-09
isOriginal: false
author:
  - name: Ryan Trimble
    url : https://css-tricks.com/author/ryantrimble/
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
  name="animation"
  desc="The animation property in CSS can be used to animate many other CSS properties such as color, background-color, height, or width. Each animation needs to be"
  url="https://css-tricks.com/almanac/properties/a/animation"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

The `animation` property in CSS can be used to animate many other CSS properties such as [**`color`**](/css-tricks.com/almanac-properties/color.md), [**`background-color`**](/css-tricks.com/almanac-properties/background-color.md), [**`height`**](/css-tricks.com/almanac-properties/height.md), or [**`width`**](/css-tricks.com/almanac-properties/width.md). Each animation needs to be defined with the `@keyframes` [**at-rule**](/css-tricks.com/at-rule-css.md) which is then called with the `animation` property, like so:

```css
.element {
  animation: pulse 5s infinite;
}

@keyframes pulse {
  0% {
    background-color: #001F3F;
  }
  100% {
    background-color: #FF4136;
  }
}
```

<CodePen
  user="anon"
  slug-hash="ZGYZBx"
  title="A simple animation"
  :default-tab="['css','result']"
  :theme="dark"/>

Each `@keyframes` at-rule defines what should happen at specific moments during the animation. For example, 0% is the beginning of the animation and 100% is the end. These keyframes can then be controlled either by the shorthand `animation` property, or its eight sub-properties, to give more control over how those keyframes should be manipulated.

---

## Sub-properties

- `animation-name`: declares the name of the `@keyframes` at-rule to manipulate.
- `animation-duration`: the length of time it takes for an animation to complete one cycle.
- `animation-timing-function`: establishes preset acceleration curves such as `ease` or `linear`.
- `animation-delay`: the time between the element being loaded and the start of the animation sequence ([cool examples (<VPIcon icon="fa-brands fa-x-twitter"/>`jh3yy`)](https://x.com/jh3yy/status/1246533538884845568)).
- `animation-direction`: sets the direction of the animation after the cycle. Its default resets on each cycle.
- `animation-iteration-count`: the number of times the animation should be performed.
- `animation-fill-mode`: sets which values are applied before/after the animation.
  - For example, you can set the last state of the animation to remain on screen, or you can set it to switch back to before when the animation began.
- `animation-play-state`: pause/play the animation.
- `animation-composition`: specifies how keyframes composite when animations affect the same property.

These sub-properties can then be used like so:

```css
@keyframes stretch {
  /* declare animation actions here */
}

.element {
  animation-name: stretch;
  animation-duration: 1.5s; 
  animation-timing-function: ease-out; 
  animation-delay: 0s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-composition: add;
}

/*
  is the same as:
*/

.element {
  animation: 
    stretch
    1.5s
    ease-out
    0s
    alternate
    infinite
    none
    running;
}
```

<CodePen
  user="anon"
  slug-hash="EjaJNd"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s a full list of which values each of these sub-properties can take:

::: info <code>animation-timing-function</code>

`ease`, `ease-out`, `ease-in`, `ease-in-out`, `linear`, `cubic-bezier(x1, y1, x2, y2)` (e.g. `cubic-bezier(0.5, 0.2, 0.3, 1.0)`)

:::

::: info `animation-duration`

`Xs` or `Xms`

:::

::: info `animation-delay`

`Xs` or `Xms`

:::

::: info `animation-iteration-count`

`X`

:::

::: info `animation-fill-mode`

`forwards`, `backwards`, `both`, `none`

:::

::: info `animation-direction`

`normal`, `alternate`

:::

::: info `animation-play-state`

`paused`, `running`

:::

::: info `animation-composition`

`accumulate`, `add`, `replace`

:::

---

## Multiple steps

If an animation has the same starting and ending properties, it’s useful to comma-separate the 0% and 100% values inside `@keyframes`:

```css
@keyframes pulse {
  0%, 100% {
    background-color: yellow;
  }
  50% {
    background-color: red;
  }
}
```

---

## Multiple animations

You can comma-separate the values to declare multiple animations on a selector as well. In the example below, we want to change the color of the circle in a `@keyframe` whilst also nudging it from side to side with another.

```css
.element {
  animation: 
    pulse 3s ease infinite alternate, 
    nudge 5s linear infinite alternate;
}
```

<!-- <CodePen
  link="https://codepen.io/anon/pen/xGbeRm/c6d27fda8e1244d44bf04728049d7c1d"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/> -->

---

## Composite operations

Defining a property in CSS also sets what is considered the *underlying* value of the property. By default, keyframe animations will ignore the underlying value, as they only consider the effect values defined within the animation. Keyframes create a stack of effect values, which determines the order in which the animation renders to the browser. Composite operations are how CSS handles the underlying effect *combined* with the keyframe effect value.

We have a few options for combining animation effects.

### Replace

The default value for the `animation-composition` property, `replace` will *replace* the underlying property value in favor of the effect value defined in keyframes.

```css
.toast {
  /* Underlying values */
  opacity: 1;
  transform: translateY(0);
  animation: fade-in 0.25s ease-in;
  
  /* Replace is the default value */
  /* for animation-composition
  animation-composition: replace; */
}

@keyframes fade-in {
  0% {
    /* Effect values */
    opacity: 0;
    transform: translateY(50px);
  }
}
```

<!-- <CodePen
  link="https://codepen.io/mrtrimble/pen/NWZoxab/572a975e10d44ac4f0765569e6d4bfda"
  title="animation-composition: replace"
  :default-tab="['css','result']"
  :theme="dark"/> -->

### Add

The `add` composite operation will be *added* to the underlying property value with the current keyframe’s effect value. Some properties may be added together differently depending on the type of value. Transforms, for example, stack effect values on top of the underlying effect value.

```css
.toast {
  /* Underlying values */
  transform: translateY(20px);
  animation: fade-in 0.25s ease-in;
  
  /* Adds the underlying value to */
  /* the current effect value */
  animation-composition: add;
}

@keyframes fade-in {
  0% {
    /* Effect values */
    transform: translateY(50px);
  }
}
```

This would composite by adding the effect value of `translateY(50px)` on top of the underlying `translateY(20px)`.

```css
/* Start of animation */
transform: translateY(20px) translateY(50px);

/* End of animation */
transform: translateY(20px) translateY(0);
```

Using `animation-composition: add` when animating colors offers an interesting effect. For example, instead of replacing an underlying `background-color` property value with the keyframe’s effect value, the color type values are combined, creating new colors.

```css
.toast {
  /* Underlying values */
  background-color: #3498db;
  animation: changeColor 2s ease-out infinite;
  animation-composition: add;
}

@keyframes changeColor {
  0% {
    /* Effect values */
    background-color: #2ecc71;
  }

  100% {
    background-color: #c0392b;
  }
}
```

<!-- <CodePen
  link="https://codepen.io/mrtrimble/pen/Rwzvaoo/3f821823778558cddb544215f97066db"
  title="animation-composition: add"
  :default-tab="['css','result']"
  :theme="dark"/> -->

### Accumulate

The `accumulate` and `add` composite operations may seem rather similar as both combine property values together, however they differ in interesting ways.

```css
.toast {
  /* Underlying values */
  transform: translateX(20px);
  animation: slideX 0.25s ease-in;
  
  /* Combines similar underlying values */
  /* with the current effect value */
  animation-composition: accumulate;
}

@keyframes slideX {
  0% {
    /* Effect values */
    transform: translateX(50px);
  }
}
```

In this example, the underlying `transform: translateX(20px);` will combine with the keyframe’s effect value of `transform: translateY(50px);`to become `transform: translateX(70px);` at the start of the animation.

```css
/* Start of animation */
transform: translateX(70px);

/* End of animation */
transform: translateX(20px);
```

This effectively isn’t different than `animation-composition: add`, where `accumulate` really helps is when animations affect multiple properties.

```css
.toast {
  /* Underlying values */
  transform: translateX(20px) rotate(45deg);
  animation: fade-in 0.25s ease-in;
  
  /* Combines the underlying value */
  /* with the currently effect value */
  animation-composition: accumulate;
}

@keyframes fade-in {
  0% {
    /* Effect values */
    transform: translateX(50px);
  }
}
```

For this example, the underlying `transform` property contains `translateY` as well as `rotate`, however the keyframe’s effect value only animates the `translateX` value. The `accumulate` composite operation will combine `translateX(20px)` and `translateX(50px)` into `translateX(70px`), causing the element to animate only on the x-axis.

```css
/* Start of animation */
transform: translateX(70px) rotate(45deg);

/* End of animation */
transform: translateX(20px) rotate(45deg);
```

<!-- <CodePen
  link="https://codepen.io/mrtrimble/pen/OJedNdZ/7e7f805cabf6944d662926b5ac160c5d"
  title="animation-composition: accumulate"
  :default-tab="['css','result']"
  :theme="dark"/> -->

---

## Performance

Animating most properties [<VPIcon icon="fas fa-globe"/>is a performance concern](https://html5rocks.com/en/tutorials/speed/high-performance-animations/), so we should proceed with caution before animating any property. However, there are certain combinations that can be animated safely:

- `transform: translate()`
- `transform: scale()`
- `transform: rotate()`
- `opacity`

---

## Which properties can be animated?

MDN has [<VPIcon icon="fa-brands fa-firefox"/>a list of CSS properties which can be animated](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties). Animatable properties tend to colors and numbers. An example a non-animatable property is `background-image`.

::: info Browser support

<BaselineStatus featureid="animations-css" />

:::

::: info More information

<SiteInfo
  name="Using CSS animations - CSS | MDN"
  desc="CSS animations make it possible to animate transitions from one CSS style configuration to another. Animations consist of two components: a style describing the CSS animation and a set of keyframes that indicate the start and end states of the animation's style, as well as possible intermediate waypoints."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations/Using/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```component VPCard
{
  "title": "CSS Animations Module Level 1",
  "desc": "This CSS module describes a way for authors to animate the values of CSS properties over time, using keyframes. The behavior of these keyframe animations can be controlled by specifying their duration, number of repeats, and repeating behavior.",
  "link": "https://drafts.csswg.org/css-animations-1//",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

<!-- TODO: /digitalocean.com/css-animation-shorthand.md -->

<SiteInfo
  name="Web Animation at Work"
  desc="We use HTML to tell stories and communicate vast amounts of information—and animation helps us do both better. Just as hierarchy guides users through content, animation guides them through interact…"
  url="https://alistapart.com/article/web-animation-at-work//"
  logo="https://i0.wp.com/alistapart.com/wp-content/uploads/2019/03/cropped-icon_navigation-laurel-512.jpg?fit=192%2C192&ssl=1"
  preview="https://i0.wp.com/alistapart.com/wp-content/uploads/2014/02/ALA390_webanimation_300.png?fit=1200%2C533&ssl=1"/>

<SiteInfo
  name="Five Ways to Animate Responsibly"
  desc="Rachel Nabors clears the snowy drift of delight from web animation to reveal the need for necessity and usefulness when we decide to animate web interactions. The box it comes in is as important as the gift."
  url="https://24ways.org/2014/five-ways-to-animate-responsibly//"
  logo="https://24ways.org/assets/icons/icon.ico"
  preview="https://cloud.24ways.org/authors/rachelnabors280.jpg"/>

:::

::: details Related tricks!

<!-- TODO: /css-tricks.com/comparison-animation-technologies.md -->
<!-- TODO: /css-tricks.com/a-css-only-animated-wrapping-underline.md -->
<!-- TODO: /css-tricks.com/a-handy-little-system-for-animated-entrances-in-css.md -->
<!-- TODO: /css-tricks.com/a-new-way-to-delay-keyframes-animations.md -->
<!-- TODO: /css-tricks.com/advanced-css-animation-using-cubic-bezier.md -->
<!-- TODO: /css-tricks.com/tale-of-animation-performance.md -->
<!-- TODO: /css-tricks.com/accessible-web-animation-the-wcag-on-animation-explained.md -->
<!-- TODO: /css-tricks.com/additive-animations-in-css.md -->
<!-- TODO: /css-tricks.com/animate-to-an-inline-style.md -->
<!-- TODO: /css-tricks.com/animate-different-end-states-using-one-set-css-keyframes.md -->
<!-- TODO: /css-tricks.com/animated-knockout-letters.md -->
<!-- TODO: /css-tricks.com/animated-matryoshka-dolls-in-css.md -->
<!-- TODO: /css-tricks.com/animated-position-of-focus-ring.md -->
<!-- TODO: /css-tricks.com/animated-svg-radial-progress-bars.md -->
<!-- TODO: /css-tricks.com/animated-svgs.md -->
<!-- TODO: /css-tricks.com/animating-border.md -->
<!-- TODO: /css-tricks.com/animating-css-width-and-height-without-the-squish-effect.md -->
<!-- TODO: /css-tricks.com/animating-number-counters.md -->
<!-- TODO: /css-tricks.com/animating-svg-css.md -->
<!-- TODO: /css-tricks.com/animating-a-css-gradient-border.md -->
<!-- TODO: /css-tricks.com/animating-the-content-property.md -->
<!-- TODO: /css-tricks.com/animation-techniques-for-adding-and-removing-items-from-a-stack.md -->
<!-- TODO: /css-tricks.com/animation-css-triangles-work.md -->
<!-- TODO: /css-tricks.com/comma-separated-webkit-animation-keyframes.md -->
<!-- TODO: /css-tricks.com/controlling-css-animations-transitions-javascript.md -->
<!-- TODO: /css-tricks.com/creating-an-animated-menu-indicator-with-css-selectors.md -->
<!-- TODO: /css-tricks.com/css-animation-libraries.md -->
<!-- TODO: /css-tricks.com/css-animation-tricks.md -->
<!-- TODO: /css-tricks.com/css-animations-and-transitions-in-email.md -->
<!-- TODO: /css-tricks.com/css-animations-vs-web-animations-api.md -->
<!-- TODO: /css-tricks.com/css-animate-fromto-auto.md -->
<!-- TODO: /css-tricks.com/using-multi-step-animations-transitions.md -->
<!-- TODO: /css-tricks.com/snippets-css/shake-css-keyframe-animation.md -->

:::

::: info Related

<!-- TODO: /css-tricks.com/almanac-properties/transition.md -->

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "animation",
  "desc": "The animation property in CSS can be used to animate many other CSS properties such as color, background-color, height, or width. Each animation needs to be",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/almanac-properties/animation.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
