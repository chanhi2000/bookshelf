---
lang: en-US
title: "Solved by CSS Scroll-Driven Animations: Style an element based on the active Scroll Direction and Scroll Speed"
description: "Article(s) > Solved by CSS Scroll-Driven Animations: Style an element based on the active Scroll Direction and Scroll Speed"
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
      content: "Article(s) > Solved by CSS Scroll-Driven Animations: Style an element based on the active Scroll Direction and Scroll Speed"
    - property: og:description
      content: "Solved by CSS Scroll-Driven Animations: Style an element based on the active Scroll Direction and Scroll Speed"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-scroll-detection.html
prev: /programming/css/articles/README.md
date: 2023-10-24
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2023/10/sda-badass-short-020p-10fps.gif
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
  name="Solved by CSS Scroll-Driven Animations: Style an element based on the active Scroll Direction and Scroll Speed"
  desc="Combine Scroll-Driven Animations with @​property, transition-delay, calc(), sign() and abs() … and you can do Scroll Detection using only CSS!"
  url="https://bram.us/2023/10/23/css-scroll-detection/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2023/10/sda-badass-short-020p-10fps.gif"/>

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2023/10/sda-badass-050p.mp4" />

::: note

[<VPIcon icon="fas fa-globe"/>Scroll-Driven Animations](https://scroll-driven-animations.style/) can be used for more than driving an animation by scroll. In this post, I share how you can use Scroll-Driven Animations to detect the Scroll Velocity a user is actively scrolling in.

That means that **using only CSS you can style an element based on whether the user is scrolling _(or not scrolling)_, the direction they are scrolling in, and the speed they are scrolling with**.

:::

::: info 💁‍♂️

This article assumes you know the basics of Scroll-Driven Animations. If you don’t, then get yourself acquainted with it over at [<VPIcon icon="fas fa-globe"/>scroll-driven-animations.style](https://scroll-driven-animations.style/), which includes links to relevant articles and videos.

:::

::: warning ⚠️ Motion Warning

This article is all about animations so things will move around, often quite abruptly. When implementing these effects in your own projects, take `prefers-reduced-motion` into account.

:::

::: warning 👨‍🔬 Browser Compat Warning

The demos in this post rely on Scroll-Driven Animations and `@property` being available. In practice, this means you need a Chromium-based browser, version 115 or newer.

:::

---

## The Code

If you’re here for just the code, here it is:

```css :collapsed-lines
@property --scroll-position {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@property --scroll-position-delayed {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

@keyframes adjust-pos {
  to {
    --scroll-position: 1;
    --scroll-position-delayed: 1;
  }
}

:root {
  animation: adjust-pos linear both;
  animation-timeline: scroll(root);
}

body {
  transition: --scroll-position-delayed 0.15s linear;
  --scroll-velocity: calc(var(--scroll-position) - var(--scroll-position-delayed));
  --scroll-speed: max(var(--scroll-velocity), -1 * var(--scroll-velocity)); /* abs(var(--scroll-velocity)); */
  --scroll-direction: calc(var(--scroll-velocity) / var(--scroll-speed)); /* sign(var(--scroll-velocity)); */

  --when-scrolling: abs(var(--scroll-direction));
  --when-not-scrolling: abs(var(--when-scrolling) - 1);

  --when-scrolling-up: min(abs(var(--scroll-direction) - abs(var(--scroll-direction))),  1);
  --when-scrolling-down: min(var(--scroll-direction) + abs(var(--scroll-direction)), 1);

  --when-scrolling-down-or-when-not-scrolling: clamp(0, var(--scroll-direction) + 1, 1);
  --when-scrolling-up-or-when-not-scrolling: clamp(0, abs(var(--scroll-direction) - 1), 1);
}
```

If you want to know how to use it and why this works, keep on reading 😉  

---

## The Concept

When combining a few CSS things together, you often end up with a novel way to achieving something. A while ago, I figured out that you can detect the scroll speed and scroll direction using only CSS when combining the following:

| | |
| :--- | :--- |
| `@property` | To register two custom properties of the type `<number>` so that they can be animated. |
| Scroll-Driven Animations | To animate those custom properties from `0` to `1` on scroll. |
| `transition-delay` | To delay the computation of the 2nd custom property on a child element of the scroller. |
| `calc()` | To compute the difference between both numbers, giving you the scroll velocity (= speed + direction). |
| `sign()` | To extract the scroll direction from the velocity, leaving you with a value of `1`, `0`, or `-1`. |
| `abs()` | To extract the scroll speed from the velocity. |

If that’s all gibberish to you don’t worry, as I’ll explain it all in the next few sections.

### Animating two Custom Properties on scroll

Let’s start off at the start, by animating two custom properties on scroll. This is done using a Scroll Timeline which is attached to the root scroller.

```css
@property --scroll-position {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
@property --scroll-position-delayed {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

@keyframes adjust-pos {
  to {
    --scroll-position: 1;
    --scroll-position-delayed: 1;
  }
}

:root {
  animation: adjust-pos linear both;
  animation-timeline: scroll(root);
}
```

Both of these values will animate from `0` to `1` as you scroll the document from top to bottom. Because they are registered through [<VPIcon icon="fas fa-globe"/>`@property`](https://drafts.css-houdini.org/css-properties-values-api/#at-property-rule), [<VPIcon icon="fas fa-globe"/>they will interpolate nicely](https://drafts.css-houdini.org/css-properties-values-api/#animation-behavior-of-custom-properties) instead of [<VPIcon icon="iconfont icon-w3c"/>animating discretely](https://w3.org/TR/web-animations/#discrete).

> When referenced by animations and transitions, custom property values interpolate by computed value, in accordance with the type that they parsed as.

<CodePen
  user="bramus"
  slug-hash="LYMoMEz"
  title="Detecting Scroll Directionality with Scroll-Driven Animations (DEBUG, v0)\"
  :default-tab="['css','result']"
  :theme="dark"/>

### Delaying one of the Custom Properties

Animating two different properties in exactly the same way seems a bit stupid, but that’s where the rest of the trick comes into play. By delaying the `--scroll-position-delayed` property – using [<VPIcon icon="fas fa-globe"/>`transition-delay`](https://drafts.csswg.org/css-transitions/#transition-delay-property) – **on a child of the scroller**, you can have it lag on the parent.

```css
body {
  transition: --scroll-position-delayed 0.15s linear;
}
```

It is very important to note that I’m delaying the `--scroll-position-delayed` on the `body` element, which is a child of `html`. By doing so, I am not lagging `--scroll-position-delayed` on `--scroll-position` but, instead, I am lagging the `--scroll-position-delayed` value of the `body` element on the `--scroll-position-delayed` value of the `html` element.

::: note ☝️

This parent-child relationship is a requirement for this trick to work – it won’t work if you delay `--scroll-position-delayed` on the scroller – here `html` – itself. You can draw a parallel to [**Container Queries**](/bram.us/css-container-queries-a-first-look-and-demo.md#container-queries.md) here, which also require a parent-child relationship.

:::

The set `transition-delay` controls how much lag there is before `--scroll-position-delayed` on the `body` catches up with the value from the `html` element. Best is to keep the delay pretty low, as the resulting effect could otherwise feel slow to users.

<CodePen
  user="bramus"
  slug-hash="YzdbdyL"
  title="Detecting Scroll Directionality with Scroll-Driven Animations (DEBUG, v1)"
  :default-tab="['css','result']"
  :theme="dark"/>

Try scrolling up and down in the CodePen embedded above, and notice how `--scroll-position-delayed` lags on the `--scroll-position` variable. Repeat your test while scrolling very fast or really slow, and compare the effect of both speeds to each other.

### Calculating the Scroll Velocity

Because the computed values of the `--scroll-position` and `--scroll-position-delayed` properties differ as you scroll, you can use them to calculate the scroll velocity. By taking the difference of both values – using a regular [<VPIcon icon="iconfont icon-w3c"/>`calc()`](https://drafts.csswg.org/css-values/#funcdef-calc) – you end up with a number that will be one of these:

- A positive float, ranging from `0` to `1`, indicating the user is scrolling down
- `0`, indicating the user is not scrolling
- A negative float, ranging from `-1` to `0`, indicating the user is scrolling up

In CSS, it looks like this:

```css
body {
  transition: --scroll-position-delayed 0.15s linear;
  --scroll-velocity: calc(var(--scroll-position) - var(--scroll-position-delayed));
}
```

<CodePen
  user="bramus"
  slug-hash="VwqOqwQ"
  title="Detecting Scroll Directionality with Scroll-Driven Animations (DEBUG, v2)"
  :default-tab="['css','result']"
  :theme="dark"/>

Try scrolling up and down in the CodePen embedded above, and notice how `--scroll-velocity` is a float representing the scroll velocity. Repeat your test while scrolling very fast or really slow, and compare the effect of both speeds to each other.

🕵️ When looking really close, you might notice that the number is a bit off when quickly changing the direction or when abruptly stopping a scroll: the updated value of `--scroll-velocity` will not immediately reflect the actual state. This can be tweaked by tightening the `transition-delay` of the `--scroll-position-delayed` property, but then you end up with smaller values for `--scroll-velocity` so you might need a multiplier to counteract that.

There’s also a difference in update speed between dragging the scrollbar versus using the touchpad to scroll the scroller. The former updates much, much, faster.

### Calculating the Scroll Direction and Scroll Speed

Because Velocity is a measured Speed into a certain Direction *([<VPIcon icon="fas fa-globe"/>ref](https://britannica.com/story/whats-the-difference-between-speed-and-velocity))*, the Direction and Speed can be extracted from the Velocity.

The direction of scrolling can be derived from the `--scroll-velocity` by looking at its sign: If it’s positive, then the user is scrolling down. If it is negative, the user is scrolling up.

In CSS, you can use the [<VPIcon icon="iconfont icon-w3c"/>the `sign()` function](https://drafts.csswg.org/css-values/#sign-funcs) to extract that info:

```css
body {
  --scroll-direction: sign(var(--scroll-velocity));
}
```

The value for `--scroll-direction` is one of these:

- `1`, indicating the user is scrolling down
- `0`, indicating the user is not scrolling
- `-1`, indicating the user is scrolling up

This value will come in handy in calculations further down the road.

Extracting the scroll speed from the velocity is also easy to do, as it’s a matter of dropping sign from the value. In CSS, this can be done using [<VPIcon icon="iconfont icon-w3c"/>the `abs()` function](https://drafts.csswg.org/css-values/#sign-funcs).

```css
body {
  --scroll-speed: abs(var(--scroll-velocity));
}
```

Put together, you get this:

<CodePen
  user="bramus"
  slug-hash="LYMLoJa"
  title="Detecting Scroll Directionality with Scroll-Driven Animations (DEBUG, v3)"
  :default-tab="['css','result']"
  :theme="dark"/>

Try scrolling up and down in the CodePen above, and notice how `--scroll-direction` is an integer representing the scroll direction, unaffected by the scroll speed.

👨‍🔬 At the time of writing, `sign()` and `abs()` are available in Chrome only once you flip on the Experimental Web Platform Features feature flag on through `chrome://flags`.

Thankfully, the functionality can be polyfilled using some basic mathematics, as detailed by [<VPIcon icon="fas fa-globe"/>Ana Tudor](https://thebabydino.github.io/) in [**this post on CSS-Tricks**](/css-tricks.com/using-absolute-value-sign-rounding-and-modulo-in-css-today.md#sign).

```css
body {
  --scroll-speed: max(var(--scroll-velocity), -1 * var(--scroll-velocity));
  --scroll-direction: calc(var(--scroll-velocity) / var(--scroll-speed));
}
```

---

## Basic demos

With these computed custom properties `--scroll-velocity` and `--scroll-direction` available it’s time to get creative …

### Tilted Colored boxes

A first demos are these boxes that get skewed in a certain angle depending on the scroll. The faster you scroll, the more skewed they get, with a maximum of 25 degrees.

```css
.slider-item {
  transform: skew(calc(var(--scroll-velocity) * -25deg));
}
```

Furthermore the boxes also get the hue of their `background-color` rotated depending on the scroll direction.

```css
.slider-item {
  background: hsl(calc(0deg + (145deg * var(--scroll-direction))) 50% 50%);
  transition: background 0.15s ease;
}
```

When idle, the boxes are red. When scrolling down they become green and when scrolling up they are blue. The transition of the background is eased at `0.15s`.

<CodePen
  user="bramus"
  slug-hash="oNJeLWg"
  title="CSS scroll-direction detection with Scroll-Driven Animations"
  :default-tab="['css','result']"
  :theme="dark"/>

### Motion Blur Scroll

Things also become interesting when using the `--scroll-velocity` and `--scroll-speed` values in a `filter`, as that function has many options. With it, you can create a Motion Blur effect, that even desaturates the content as you scroll.

<CodePen
  user="bramus"
  slug-hash="XWoREjv"
  title="CSS Motion Blur Scrolling"
  :default-tab="['css','result']"
  :theme="dark"/>

The blurring and desaturating is handled by the `filter` property. Some basic translation and `opacity`-meddling also takes place, to give it a rather cinematic effect. To always have a positive float value for use within all calculations, the code relies on `--scroll-speed` instead of `--scroll-velocity` which can become negative.

```css
main {
  filter:
    blur(calc(2rem * var(--scroll-speed)))
    contrast(calc(100% - (500% * var(--scroll-speed))))
    saturate(calc(100% - (500% * var(--scroll-speed))));
  opacity: calc(1 - (var(--scroll-speed) * 4));
  translate: calc(-8rem * var(--scroll-velocity)) 0;
}
```

Furthermore the entire photostrip gets skewed a tiny bit while scrolling, similar to a previous demo.

```css
.photo {
  transform: skew(calc(var(--scroll-velocity) * 3deg));
}
```

The faster your scroll, the harder the effect is.  

---

## Intermezzo: what about Style Queries?

::: note UPDATE 2023.10.26

After chatting with [<VPIcon icon="fas fa-globe"/>Tab Atkins](https://xanthir.com/contact/) about this, it became clear that the simplification won’t happen until the custom property is registered as a `<number>` – something I wasn’t aware of. This section has been rewritten to incorporate that info.

:::

Now, you might be wondering if you can use [**Style Queries**](/bram.us/container-queries-style-queries.md) for easier styling when relying on only the scroll direction. It’s definitely a valid question, as doing the calculations can be hard to get right, with a lot of trial and error.

After all, it would be so much easier if you could do this, allowing you to put any styles in the container blocks:

```css
@container style(--scroll-direction: 0) { /* Idle */
  …
}

@container style(--scroll-direction: 1) { /* Scrolling down */
  …
}

@container style(--scroll-direction: -1) { /* Scrolling up */
  …
}
```

According [<VPIcon icon="iconfont icon-w3c"/>to the spec](https://drafts.csswg.org/css-values-4/#calc-computed-value) any mathematical expression should be simplified:

> The computed value of a math function is its calculation tree simplified, using all the information available at computed value time.

So when idling, the computed value of `--scroll-direction` should become `0`, right? Unfortunately that doesn’t seem to be the case: when checking the computed value of `--scroll-direction` when idle, it computes to `sign(calc(0 - 0))`, without any simplification applied. Huh?!

The reason why simplification doesn’t happen is that the browser doesn’t know that it can. A custom property can hold any value; It’s only when it’s being used as a value – via `var()` – that the browser tries to convert the custom property to be of a certain type that fits the property it is used in. If the type conversion doesn’t work out – e.g. when trying to set a color as the value for an `animation-duration` – the declaration will become [<VPIcon icon="iconfont icon-w3c"/>“Invalid At Computed Value Time”](https://w3.org/TR/css-variables-1/#invalid-at-computed-value-time).

### `@property` to the rescue!

So, can you force the conversion to happen, in order for the simplification to occur? Why yes you can! By registering `--scroll-direction` – using `@property` – to be a `<number>`, the browser will try to fit the declared value into that type. At that point the simplification will occur, and `sign(calc(0 - 0))` can be simplified to `0`

```css
@property --scroll-direction {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}
```

With this registration, it now becomes possible to use style queries for the styling based on the scroll direction:

```css
@container style(--scroll-direction: 0) { /* Idle */
  .slider-item {
    background: crimson;
  }
}
@container style(--scroll-direction: 1) { /* Scrolling down */
  .slider-item {
    background: forestgreen;
  }
}
@container style(--scroll-direction: -1) { /* Scrolling up */
  .slider-item {
    background: lightskyblue;
  }
}
```

<CodePen
  user="bramus"
  slug-hash="dyaYoyG"
  title="CSS scroll-direction detection with Scroll-Driven Animations (Style Queries)"
  :default-tab="['css','result']"
  :theme="dark"/>

::: details 💁‍♂️ Compare the non-registered vs registered behavior

Here’s a small CodePen that tests the simplification/seriallization of `calc()`. The value of the `--output` property eventually becomes `calc(2 * 0.5)`, because the custom property is not registered to be of a certain type.

<CodePen
  user="bramus"
  slug-hash="RwEqJye"
  title="ComputedStyle vs calc() – Unregistered Custom Property"
  :default-tab="['css','result']"
  :theme="dark"/>

Now compare this to this adjusted version where the custom property is registered as a `<number>`:

<CodePen
  user="bramus"
  slug-hash="WNPvvzm"
  title="ComputedStyle vs calc() – Registered Custom Property"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Combine multiple scroll states, thanks to more Maths

Thanks to some more basic maths, it’s possible to end up with a value of `1` in various scroll-cases.

For example, if you take the absolute value of `--scroll-direction` – which is either `-1`, `0`, or `1` – you end up with a value of `1` only when the user scrolling:

```css
body {
  --when-scrolling: abs(var(--scroll-direction));
}
```

Furthermore, if you take that value, subtract `1` from it, and absolute the result, you end up with a value of `1` only when the user is not scrolling:

```css
body {
  --when-scrolling: abs(var(--scroll-direction));
  --when-not-scrolling: abs(var(--when-scrolling) - 1);
}
```

Mix and match basic maths, `abs`, `min`, `max`, `clamp`, and you can end up with a value of `1` in any of these situations:

- When scrolling up or down
- When not scrolling
- When scrolling up
- When scrolling down
- When scrolling up or idle
- When scrolling down or idle

In code, it looks like this:

```css
body {
  --when-scrolling: abs(var(--scroll-direction));
  --when-not-scrolling: abs(var(--when-scrolling) - 1);

  --when-scrolling-up: min(abs(var(--scroll-direction) - abs(var(--scroll-direction))), 1);
  --when-scrolling-down: min(var(--scroll-direction) + abs(var(--scroll-direction)), 1);

  --when-scrolling-down-or-when-not-scrolling: clamp(0, var(--scroll-direction) + 1, 1);
  --when-scrolling-up-or-when-not-scrolling: clamp(0, abs(var(--scroll-direction) - 1), 1);
}
```

Look at the examples below for some use-cases. Don’t forget to [register these as a `<number>` if you want to use these in Style Queries](#intermezzo-what-about-style-queries).

### Demo: Moving Header

One example where you can use this is to hide the header and footer bars while the user is scrolling. This is done by translating the bars out the way in that case. For this, the code uses `--when-scrolling` – which has a value of `1` when scrolling and a value of `0` when not scrolling – as [**the condition for the calculation**](/bram.us/conditions-for-css-calculations.md).

```css
body {
  --hide-bars: var(--when-scrolling);
}

header {
  top: 0;
  translate: 0 calc(-90% * var(--hide-bars));
}

footer {
  bottom: 0;
  translate: 0 calc(90% * var(--hide-bars));
}
```

::: note

The demo below requires Chrome with the Experimental Web Platform Features feature flag enabled.

:::

<CodePen
  user="bramus"
  slug-hash="dywzeoN"
  title="CSS scroll-direction detection with Scroll-Driven Animations with moving header"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info 💭

Initially I wanted to hide the header upon scrolling down or remaining idle after having scrolled down, and only show it again once starting to scroll up again. I couldn’t immediately find a solution here – using `--when-scrolling-down-or-when-not-scrolling` also hides it on initial load, which is not what I want – but I’m sure [Johannes (<VPIcon icon="iconfont icon-mastodon"/>`@johannes`)](https://front-end.social/@johannes) will be able to tell me how to do it using [<VPIcon icon="fas fa-globe"/>Scroll-Persisted State](https://johannesodland.github.io/state/scroll-snap/scroll-driven-animations/2023/06/18/scroll-persisted-state.html).

:::

::: note

It is possible to “remember” the last scrolled direction by using a long `transition-delay`. See below for details on how to use this.

```component VPCard
{
  "title": "Solved by CSS Scroll-Driven Animations: hide a header when scrolling down, show it again when scrolling up.",
  "desc": "By adding a long transition-delay to a CSS property under certain conditions (which you can do using a Style Query), you can persist its value.",
  "link": "/bram.us/solved-by-css-scroll-driven-animations-hide-a-header-when-scrolling-up-show-it-again-when-scrolling-down.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

### Demo: Directional Chicky Scroll

When [Brecht De Ruyte (<VPIcon icon="fa-brands fa-x-twitter"/>`utilitybend`)](https://x.com/utilitybend) [<VPIcon icon="fas fa-globe"/>explored Scroll-Driven Animations back in February](https://utilitybend.com/blog/for-the-love-of-scroll-driven-animations-in-css), he built a demo where a little chicky walks across the screen as you scroll the page. While building that demo he noted that when scrolling up, the chicky is facing the wrong direction:

> The downside is that my animation seems to trigger a bit of moonwalking when scrolling back to top. Let’s just call it a feature for now, ok? 😉

With `--scroll-direction` available it’s pretty easy to flip the chicky in the other direction by passing that into `scaleX()`. However, when idling you’d end up with a `scaleX()` of `0` so to counter that I add `--when-not-scrolling` to the equation. By doing so, the `scaleX()` will also be `1` when idle, so the chicky will face forwards in that case.

```css
@keyframes moveChicky {
  …
  transform: translateX(80px) scaleX(calc(var(--scroll-direction) + var(--when-not-scrolling)));
  …
}
```

::: note

The demo below requires Chrome with the Experimental Web Platform Features feature flag enabled.

<CodePen
  user="bramus"
  slug-hash="LYMjgjB"
  title="Directional Chicky Scroll - scroll-driven-animation with CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

---

## LERP-effects

Because there is a delay happening it’s possible to create typical LERP-effects. Below are a few demos that reproduce that.

::: info 💡

LERP = [<VPIcon icon="fa-brands fa-wikipedia-w"/>**L**inear int**ERP**olation](https://en.wikipedia.org/wiki/Linear_interpolation)

:::

### Demo: LERP Reading Indicator

In this demo, the reading indicator catches up on the actual reading position. The code is easy, as it relies directly on `--scroll-position-delayed`.

```css
#progress {
  transform: scaleX(var(--scroll-position-delayed));
}
```

<CodePen
  user="bramus"
  slug-hash="VwqJObR"
  title="LERP Reading Indicator with Scroll-Driven Animations"
  :default-tab="['css','result']"
  :theme="dark"/>

Compare the behavior of the demo above to [<VPIcon icon="fas fa-globe"/>this original version](https://scroll-driven-animations.style/demos/progress-bar/css/) whose reading indicator responds directly to the scroll position change.

### Demo: LERP Scrolling

Recreating a LERP scrolling effect is a bit more difficult as you don’t want to recreate an entirely custom scroller from scratch – These always end up in the [<VPIcon icon="fa-brands fa-wikipedia-w"/>uncanny valley](https://en.wikipedia.org/wiki/Uncanny_valley). What I’ve done in the demo below is added some fake drag to the scroll by translating the contents in the opposite scrolling direction.

```css
.slider {
  animation: adjust-pos linear both;
  animation-timeline: scroll(self); /* Hook animation onto self */
}

.slider-item {
  transition: --scroll-position-delayed 0.25s linear;
  --scroll-velocity: calc(var(--scroll-position) - var(--scroll-position-delayed));
  transform: translateY(calc(var(--scroll-velocity) * 500vh)); /* Add some drag. Tweak the 500vh value to adjust how much drag */
}
```

<CodePen
  user="bramus"
  slug-hash="GRPvqrN"
  title="LERP Smooth Scrolling (CSS)"
  :default-tab="['css','result']"
  :theme="dark"/>

The effect is not entirely perfect though. For example, when hitting the end of the scroller the `--scroll-position-delayed` is still getting delayed while it should skip forwards in that case.  

---

## More Demos

I’m sure this technique will spark a lot of nice new demos. Here’s a few more that I’ve built using this technique.

### Demo: Wormhole

By nesting a bunch of boxes, you can see how the value of `--scroll-position-delayed` propagates from box to box. Add some translation + colors, and you get a wormhole effect.

<CodePen
  user="bramus"
  slug-hash="wvRqVBm"
  title="CSS Wormhole with Scroll-Driven Animations"
  :default-tab="['css','result']"
  :theme="dark"/>

The demo also includes the code to respond to a horizontal delayed scroll.

### Demo: BADASS

Back in 2017 I saw a nice scroll effect on [<VPIcon icon="fas fa-globe"/>the BADASS website](https://badassfilms.tv/). The site is no longer up in that state, but thankfully [**my blog entry about it**](/bram.us/badass.md) also included a video of the effect, which I’ve also embedded below:

![Recording of the original](https://bram.us/wordpress/wp-content/uploads/2017/10/badass_homepage_shoot_02.gif)

As I wrote back then:

> The effect is achieved by placing a duplicate (but clipped) list on top of another one, in combination with scroll velocity calculation to define the slant of the list.

Recreating this effect is now perfectly possible with just CSS:

- Move the two lists across the screen as you scroll from top to bottom
- Adjust the `clip-path` of the hotpink list as you scroll
- Adjust the slant of the outlined list depending on the scroll speed and direction

The difficult part here wasn’t to skew the list – this was already done in the other demos – but to get the `clip-path` working correctly. You can check the code for my calculations and comments.

<CodePen
  user="bramus"
  slug-hash="OJrxBaL"
  title="Scroll-Driven Animations Scroll Detection: BADASS"
  :default-tab="['css','result']"
  :theme="dark"/>

::: details 🎬 Check a recording of this demo

<VidStack src="https://bram.us/wordpress/wp-content/uploads/2023/10/sda-badass-050p.mp4" />

:::

Recording of the demo inspired upon the original animation oon the BADASS website.

---

## A note on performance

When doing a trace via Chrome DevTools you might notice that paint constantly gets triggered as you scroll.

![A Performance Trace in Chrome DevTools of the [LERP Reading Indicator Demo](#lerp-effect), riddled with rendering Tasks](https://bram.us/wordpress/wp-content/uploads/2023/10/sda-custom-property-main-thread.png)

This is because Chrome – and any other browser for that matter – animates Custom Properties on the main thread. I have [**written about this problem space before**](/bram.us/the-gotcha-with-animating-custom-properties.md), and hope to see this fixed in the future. Star [<VPIcon icon="fa-brands fa-chrome"/>Chromium Issue #1411864](https://crbug.com/1411864) to stay in the loop.  

---

## Closing Thoughts

One of the features authors have asked about at the CSS Working Group is to expose current scrolling direction in CSS *([<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts#6400`](https://github.com/w3c/csswg-drafts/issues/6400))*. Not only does the technique described in this article offer an answer to that problem, it cranks it up a notch by also exposing the scrolling speed. While it’s not entirely perfect – e.g. the scroll velocity can lag a bit on the actual situation – it can already get you quite the distance.

Personally I think it is very exciting to see that Scroll-Driven Animations yet again *([[1](https://kizu.dev/scroll-driven-animations/)], [[2](https://johannesodland.github.io/state/scroll-snap/scroll-driven-animations/2023/06/18/scroll-persisted-state.html)], [[3](https://kizu.dev/fit-to-width-text/)]. [[4](https://bram.us/2023/06/26/faking-a-snapped-selector-with-scroll-driven-animations/)], [[5](https://bram.us/2023/09/16/solved-by-css-scroll-driven-animations-detect-if-an-element-can-scroll-or-not/)], [[6](https://kizu.dev/scroll-driven-state-transfer/)])* can be used for so much more than simply animating things as you scroll. I’m very much looking forward to more unconventional uses of this feature, unlocking some age-old requests …  

```component VPCard
{
  "title": "Future CSS: Wishes Granted by Scroll-driven Animations",
  "desc": "Stuck state for sticky headers? “Proper” solution for scrolling shadows? Highlighting the currently shown sections in a Table of Contents? All these things could become possible with the new scroll-driven animations spec. Today, I gather and explain some of my experiments with this new CSS feature.",
  "link": "https://kizu.dev/scroll-driven-animations/",
  "logo": "https://kizu.dev/favicon.ico",
  "background": "rgba(9,133,206,0.2)"
}
```

```component VPCard
{
  "title": "Scroll-persisted State",
  "desc": "While working on another article, I stumbled upon a fascinating discovery: a way to manipulate and read state solely through style rules using HTML and CSS.",
  "link": "https://odland.dev/2023/06/18/scroll-persisted-state.html/",
  "logo": "https://odland.dev/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

```component VPCard
{
  "title": "Fit-to-Width Text",
  "desc": "What if I will tell you how we could solve fit-to-width text with pure CSS without any hardcoded parameters? Curiously, scroll-driven animations will allow us to do just that! Join me as I continue exploring the experimental implementations of the latest specs.",
  "link": "https://kizu.dev/fit-to-width-text/",
  "logo": "https://kizu.dev/favicon.ico",
  "background": "rgba(9,133,206,0.2)"
}
```

```component VPCard
{
  "title": "Solved by CSS Scroll-Driven Animations: A :snapped selector",
  "desc": "(Ab)using Scroll-Driven Animations to apply styles on elements that are snapped within their scroll-snapping enabled ancestor scroller.",
  "link": "/bram.us/faking-a-snapped-selector-with-scroll-driven-animations.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Solved by CSS Scroll-Driven Animations: Detect if an element can scroll or not",
  "desc": "Leverage Scroll-Driven Animations + a Space Toggle or State Query to selectively style an element based on it being scrollable or not.",
  "link": "/bram.us/solved-by-css-scroll-driven-animations-detect-if-an-element-can-scroll-or-not.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Scroll-Driven State Transfer",
  "desc": "In my fourth article about scroll-driven animations, I explore how we can transfer the state of one element to a completely different place on a page by connecting them with a unique identifier in CSS via a timeline-scope.",
  "link": "https://kizu.dev/scroll-driven-state-transfer/",
  "logo": "https://kizu.dev/favicon.ico",
  "background": "rgba(9,133,206,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Solved by CSS Scroll-Driven Animations: Style an element based on the active Scroll Direction and Scroll Speed",
  "desc": "Combine Scroll-Driven Animations with @​property, transition-delay, calc(), sign() and abs() … and you can do Scroll Detection using only CSS!",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-scroll-detection.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```