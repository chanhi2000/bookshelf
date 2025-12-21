---
lang: en-US
title: "Sequential linear() Animation With N Elements"
description: "Article(s) > Sequential linear() Animation With N Elements"
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
      content: "Article(s) > Sequential linear() Animation With N Elements"
    - property: og:description
      content: "Sequential linear() Animation With N Elements"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/sequential-linear-animation-with-n-elements.html
prev: /programming/css/articles/README.md
date: 2025-10-15
isOriginal: false
author:
  - name: Temani Afif
    url : https://css-tricks.com/author/afiftemani/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/sequential-thumb.png
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
  name="Sequential linear() Animation With N Elements"
  desc="Let’s suppose you have N elements with the same animation that should animate sequentially. Modern CSS makes this easy and it works for any number of items!"
  url="https://css-tricks.com/sequential-linear-animation-with-n-elements"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/sequential-thumb.png"/>

Let’s suppose you have `N` elements with the same animation that should animate sequentially. The first one, then the second one, and so on until we reach the last one, then we loop back to the beginning. I am sure you know what I am talking about, and you also know that it’s tricky to get such an effect. You need to define complex keyframes, calculate delays, make it work for a specific number of items, etc.

Tell you what: with modern CSS, we can easily achieve this using a few lines of code, and it works for any number of items!

::: note

The following demo is currently limited to Chrome and Edge, but will work in other browsers as the [<VPIcon icon="iconfont icon-css-tricks"/>`sibling-index()`](https://css-tricks.com/almanac/functions/s/sibling-index/) and [<VPIcon icon="iconfont icon-css-tricks"/>`sibling-count()`](https://css-tricks.com/almanac/functions/s/sibling-count/) functions gain broader support. You can track Firefox support in [<VPIcon icon="fa-brands fa-firefox"/> Ticket `#1953973`](https://bugzilla.mozilla.org/show_bug.cgi?id=1953973) and WebKit’s position in [Issue `#471` (<VPIcon icon="iconfont icon-github"/>`WebKit/standards-positions`)](https://github.com/WebKit/standards-positions/issues/471).

:::
<CodePen
  user="t_afif"
  slug-hash="dPYRzKq"
  title="Sequential Animations"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/10/sequential-2.mov" />

In the above demo, [**the elements are animated sequentially**](/css-tip.com/sequential-animations.md) and the keyframes are as simple as a single `to` frame changing an element’s background color and scale:

```css
@keyframes x {
  to {
    background: #F8CA00;
    scale: .8;
  }
}
```

You can add or remove as many items as you want and everything will keep running smoothly. Cool, right? That effect is made possible with this strange and complex-looking code:

```css
.container > * {
  --_s: calc(100%*(sibling-index() - 1)/sibling-count());
  --_e: calc(100%*(sibling-index())/sibling-count());

  animation: 
    x calc(var(--d)*sibling-count()) infinite 
    linear(0, 0 var(--_s), 1, 0 var(--_e), 0);
}
```

It’s a bit scary and unreadable, but I will dissect it with you to understand the logic behind it.

---

## The CSS `linear()` function

When working with animations, we can define timing functions (also called easing functions). We can use predefined keyword values — such as `linear`, `ease`, `ease-in`, etc. — or [<VPIcon icon="iconfont icon-css-tricks"/>`steps()`](https://css-tricks.com/almanac/functions/s/steps/) to define discrete animations. There’s also [<VPIcon icon="iconfont icon-css-tricks"/>`cubic-bezier()`](https://css-tricks.com/almanac/functions/c/cubic-bezier/).

But we have a newer, more powerful function we can add to that list: [<VPIcon icon="iconfont icon-css-tricks"/>`linear()`](https://css-tricks.com/almanac/functions/l/linear/).

::: info From the specificiation (<VPIcon icon="fas fa-globe"/><code>drafts.csswg.org</code>)

> A linear easing function is an [<VPIcon icon="fas fa-globe"/>easing function](https://drafts.csswg.org/css-easing/#easing-function) that interpolates linearly between its [<VPIcon icon="fas fa-globe"/>control points](https://drafts.csswg.org/css-easing/#linear-control-point). Each control point is a pair of numbers, associating an [<VPIcon icon="fas fa-globe"/>input progress value](https://drafts.csswg.org/css-easing/#easing-function-input-progress-value) to an [<VPIcon icon="fas fa-globe"/>output progress value](https://drafts.csswg.org/css-easing/#easing-function-output-progress-value).

![](https://i0.wp.com/paper-attachments.dropboxusercontent.com/s_D7C506D941AC3C214CD2FE195EBB3F00739042815EE8ED245A8FE510EA4EFFFB_1759588782612_image.png?ssl=1)

```component VPCard
{
  "title": "CSS Easing Functions Module Level 2",
  "desc": "This CSS module describes a way for authors to define a transformation that controls the rate of change of some value. Applied to animations, such transformations can be used to produce animations that mimic physical phenomena such as momentum or to cause the animation to move in discrete steps producing robot-like movement. Level 2 adds more sophisticated functions for custom easing curves.",
  "link": "https://drafts.csswg.org/css-easing/#the-linear-easing-function/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

`animation-timing-function: linear` creates a linear interpolation between two points — the **start** and **end** of the animation — while the `linear()` function allows us to define as many points as we want and have a “linear” interpolation between two consecutive points.

It’s a bit confusing at first glance, but once we start working with it, things becomes clearer. Let’s start with the first value, which is nothing but an equivalent of the `linear` value.

```css
linear(0 0%, 1 100%)
```

We have two points, and each point is defined with two values (the “output” progress and “input” progress). The “output” progress is the animation (i.e., what is defined within the keyframes) and the “input” progress is the time.

Let’s consider the following code:

```css
.box {
  animation: move 2s linear(0 0%, 1 100%);
}

@keyframes move {
  0%   {translate: 0px }
  100% {translate: 80px}
}
```

In this case, we want `0` of the animation (`translate: 0px`) at `t=0%` (in other words, `0%` of `2s`, so `0s`) and `1` of the animation (`translate: 80px`) at `t=100%` (which is `100%` of `2s`, so `2s`). Between these points, we do a linear interpolation.
<CodePen
  user="t_afif"
  slug-hash="zxrNrZx"
  title="linear with linear()"
  :default-tab="['css','result']"
  :theme="dark"/>

Instead of percentages, we can use numbers, which means that the following is also valid:

```css
linear(0 0, 1 1)
```

But I recommend you stick to the percentage notation to avoid getting confused with the first value which is a number as well. The `0%` and `100%` are implicit, so we can remove them and simply use the following:

```css
linear(0, 1)
```

Let’s add a third point:

```css
linear(0, 1, 0)
```

As you can see, I am not defining any “input” progress (the percentage values that represent the time) because they are not mandatory; however, introducing them is the first thing to do to understand what the function is doing.

The first value is always at `0%` and the last value is always at `100%`.

```css
linear(0 0%, 1, 0 100%)
```

The value will be `50%` for the middle point. When a control point is missing its “input” progress, we take the mid-value between two adjacent points. If you are familiar with gradients, you will notice the same logic applies to color stops.

```css
linear(0 0%, 1 50%, 0 100%)
```

Easier to read, right? Can you explain what it does? Take a few minutes to think about it before continuing.

Got it? I am sure you did!

It breaks down like this:

1. We start with `translate: 0px` at `t=0s` (`0%` of `2s`).
2. Then we move to `translate: 80px` at `t=1s` (`50%` of `2s`).
3. Then we get back to `translate: 0px` at `t=2s` (`100%` of `2s`).
<CodePen
  user="t_afif"
  slug-hash="ZYQLQeg"
  title="back and forth"
  :default-tab="['css','result']"
  :theme="dark"/>

Most of the timing functions allow us to only move forward, but with `linear()` we can move in both directions as many times as we want. That’s what makes this function so powerful. With a “simple” keyframes you can have a “complex” animation.

I could have used the following keyframes to do the same thing:

```css
@keyframes move {
  0%, 100% { translate: 0px }
  50% { translate: 80px }
}
```

However, I won’t be able to update the percentage values on the fly if I want a different animation. There is no way to control keyframes using CSS so I need to define new keyframes each time I need a new animation. But with `linear()`, I only need one keyframes.

In the demo below, all the elements are using the same keyframes and yet have completely different animations!
<CodePen
  user="t_afif"
  slug-hash="Qwydygz"
  title="many animations"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Add a delay with `linear()`

Now that we know more about `linear()`, let’s move to the main trick of our effect. Don’t forget that the idea is to create a sequential animation with a certain number (`N`) of elements. Each element needs to animate, then “wait” until all the others are done with their animation to start again. That waiting time can be seen as a delay.

The intuitive way to do this is the following:

```css
@keyframes move {
  0%, 50% { translate: 0px }
  100% { translate: 80px }
}
```

We specify the same value at `0%` and `50%`; hence nothing will happen between `0%` and `50%`. We have our delay, but as I said previously, we won’t be able to control those percentages using CSS. Instead, we can express the same thing using `linear()`:

```css
linear(0 0%, 0 50%, 1 100%)
```

The first two control points have the same “output” progress. The first one is at `0%` of the time, and the second one at `50%` of the time, so nothing will “visually” happen in the first half of the animation. We created a delay without having to update the keyframes!

```css
@keyframes move {
  0% { translate: 0px }
  100% { translate: 80px }
}
```

<CodePen
  user="t_afif"
  slug-hash="EaPZPvV"
  title="adding a delay"
  :default-tab="['css','result']"
  :theme="dark"/>

Let’s add another point to get back to the initial state:

```css
linear(0 0%, 0 50%, 1 75%, 0 100%)
```

Or simply:

```css
linear(0, 0 50%, 1, 0)
```

<CodePen
  user="t_afif"
  slug-hash="yyegeoW"
  title="complete animation"
  :default-tab="['css','result']"
  :theme="dark"/>

Cool, right? We’re able to create a complex animation with a simple set of keyframes. Not only that, but we can easily adjust the configuration by tweaking the `linear()` function. This is what we will do for each element to get our sequential animation!

---

## The full animation

Let’s get back to our first animation and use the previous `linear()` value we did before. We will start with two elements.
<CodePen
  user="t_afif"
  slug-hash="qEbRRKe"
  title="two elements"
  :default-tab="['css','result']"
  :theme="dark"/>

Nothing surprising yet. Both elements have the exact same animation, so they animate the same way at the same time. Now, let’s update the `linear()` function for the first element to have the opposite effect: an animation in the first half, then a delay in the second half.

```css
linear(0, 1, 0 50%, 0)
```

This literally inverts the previous value:

<CodePen
  user="t_afif"
  slug-hash="QwyddZQ"
  title="sequential animation with 2 elements"
  :default-tab="['css','result']"
  :theme="dark"/>

*Tada!* We have established a sequential animation with two elements! Are you starting to see the idea? The goal is to do the same with any number (`N`) of elements. Of course, we are not going to assign a different `linear()` value for each element — we will do it programmatically.

First, let’s draw a figure to understand what we did for two elements.

![Two square graphs fside by side showing the lines of the first two items. It's the same upward pointing spike, only shifting along the x-axis as you compare the graphs.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/sequential-diagram-1.png?resize=955%2C445&ssl=1)

When one element is waiting, the other one is animating. We can identify two ranges. Let’s imagine the same with three elements.

![Three square graphs from right to left showing the lines of the first three items. It's the same upward pointing spike, only shifting along the x-axis as you compare the graphs.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/sequential-diagram-2.png?resize=1321%2C443&ssl=1)

This time, we need three ranges. Each element animates in one range and waits in two ranges. Do you see the pattern? For `N` elements, we need `N` ranges, and the `linear()` function will have the following syntax:

```css
linear(0, 0 S, 1, 0 E, 0)
```

The **start** and the **end** are equal to `0`, which is the initial state of the animation, then we have an animation between `S` and `E`. An element will wait from `0%` to `S`, animate from `S` to `E`, then wait again from `E` to `100%`. The animation time equals to `100%/N`, which means `E - S = 100%/N`.

The first element starts its animation at the first range (`0 * 100%/N`), the second element at the second range (`1 * 100%/N`), the third element at the third range (`2 * 100%/N`), and so on. `S` is equal to:

```plaintext
S = (i - 1) * 100%/N
```

…where `i` is the index of the element.

Now, you may ask, *how do we get the value of `N` and `i`*?* The answer is as simple as using the `sibling-count()`and `sibling-index()` functions! Again, these are currently supported in Chromium browsers, but we can expect them to roll out in other browsers down the road.

```plaintext
S = calc(100%*(sibling-index() - 1)/sibling-count())
```

And:

```plaintext
E = S + 100%/N
E = calc(100%*sibling-index()/sibling-count())
```

We write all this with some good CSS and we are done!

```css
.box {
  --d: .5s; /* animation duration */
  --_s: calc(100%*(sibling-index() - 1)/sibling-count());
  --_e: calc(100%*(sibling-index())/sibling-count());

  animation: x calc(var(--d)*sibling-count()) infinite linear(0, 0 var(--_s), 1, 0 var(--_e), 0);
}
@keyframes x {
  to {
    background: #F8CA00;
    scale: .8;
  }
}
```

I used a variable (`--d`) to control the duration, but it’s not mandatory. I wanted to be able to control the amount of time each element takes to animate. That’s why I multiply it later by `N`.
<CodePen
  user="t_afif"
  slug-hash="dPYRzKq"
  title="Sequential Animations"
  :default-tab="['css','result']"
  :theme="dark"/>

Now all that’s left is to define your animation. Add as many elements as you want, and watch the result. No more complex keyframes and magic values!

::: note

For unknown reasons (probably a bug) you need to register the variables with [<VPIcon icon="iconfont icon-css-tricks"/>`@property`](https://css-tricks.com/almanac/rules/p/property/).

::::

---

## More variations

We can extend the basic idea to create more variations. For example, instead of having to wait for an element to completely end its animation, the next one can already start its own.
<CodePen
  user="t_afif"
  slug-hash="bNEgOpL"
  title="sequential animation with N elements"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/10/sequential-3.mov" />

This time, I am defining `N + 1` ranges, and each element animates in two ranges. The first element will animate in the first and second range, while the second element will animate in the second and third range; hence an overlap of both animations in the second range, etc.

I will not spend too much time explaining this case because it’s one example among many we create, so I let you dissect the code as a small exercise. And here is another one for you to study as well.
<CodePen
  user="t_afif"
  slug-hash="VYePqbm"
  title="sequential animation with N elements"
  :default-tab="['css','result']"
  :theme="dark"/>

<VidStack src="https://css-tricks.com/wp-content/uploads/2025/10/sequential-1.mov" />

---

## Conclusion

The `linear()` function was mainly introduced to create [<VPIcon icon="fas fa-globe"/>complex easing such as bounce and elastic](https://linear-easing-generator.netlify.app/), but combined with other modern features, it unlocks a lot of possibilities. Through this article, we got a small overview of its potential. I said “small” because we can go further and create even more complex animations, so stay tuned for more articles to come!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Sequential linear() Animation With N Elements",
  "desc": "Let’s suppose you have N elements with the same animation that should animate sequentially. Modern CSS makes this easy and it works for any number of items!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/sequential-linear-animation-with-n-elements.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
