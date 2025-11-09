---
lang: en-US
title: "The “Most Hated” CSS Feature: asin(), acos(), atan() and atan2()"
description: "Article(s) > The “Most Hated” CSS Feature: asin(), acos(), atan() and atan2()"
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
      content: "Article(s) > The “Most Hated” CSS Feature: asin(), acos(), atan() and atan2()"
    - property: og:description
      content: "The “Most Hated” CSS Feature: asin(), acos(), atan() and atan2()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-most-hated-css-feature-asin-acos-atan-and-atan2.html
prev: /programming/css/articles/README.md
date: 2025-11-17
isOriginal: false
author:
  - name: Juan Diego Rodríguez
    url : https://css-tricks.com/author/monknow/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/css-trig-unit-circle-diagram.jpg
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
  name="The “Most Hated” CSS Feature: asin(), acos(), atan() and atan2()"
  desc="If we have a ratio that represents the sine, cosine or tangent of an angle, how can we get the original angle? This is where inverse trigonometric functions come in!"
  url="https://css-tricks.com/the-most-hated-css-feature-asin-acos-atan-and-atan2"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/css-trig-unit-circle-diagram.jpg"/>

This is a series! It all started a [**couple of articles ago**](https://css-tricks.com/the-most-hated-css-feature-cos-and-sin.md), when we found out that, according to the [<VPIcon icon="fas fa-globe"/>State of CSS 2025](https://2025.stateofcss.com/en-US/) survey, trigonometric functions were the “Most Hated” CSS feature.

![Most Hated Feature: trigonometric functions](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/most_hated_feature.jpg?resize=1920%2C1080&ssl=1)

I’ve been trying to change that perspective, so I showcased several uses for trigonometric functions in CSS: one for [**`sin()` and `cos()`**](/css-tricks.com/the-most-hated-css-feature-cos-and-sin.md) and another on [**`tan()`**](/css-tricks.com/the-most-hated-css-feature-tan.md). However, that’s only half of what trigonometric functions can do. So today, we’ll poke at the *inverse* world of trigonometric functions: `asin()`, `acos()`, `atan()` and `atan2()`.

::: info CSS Trigonometric Functions: The “Most Hated” CSS Feature

```component VPCard
{
  "title": "The “Most Hated” CSS Feature: cos() and sin()",
  "desc": "I want to look at practical uses for CSS trigonometric functions. And we'll start with what may be the most popular functions of the ”worst” feature: sin() and cos().",
  "link": "/css-tricks.com/the-most-hated-css-feature-cos-and-sin.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The “Most Hated” CSS Feature: tan()",
  "desc": "Last time, we discussed that, sadly, according to the State of CSS 2025 survey, trigonometric functions are deemed the ”Most Hated” CSS feature.",
  "link": "/css-tricks.com/the-most-hated-css-feature-tan.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The “Most Hated” CSS Feature: asin(), acos(), atan() and atan2()",
  "desc": "If we have a ratio that represents the sine, cosine or tangent of an angle, how can we get the original angle? This is where inverse trigonometric functions come in!",
  "link": "/css-tricks.com/the-most-hated-css-feature-asin-acos-atan-and-atan2.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

---

## Inverse functions?

Recapping things a bit, given an angle, the `sin()`, `cos()` and `tan()` functions return a ratio presenting the sine, cosine, and tangent of that angle, respectively. And if you read the last two parts of the series, then you already know what each of those quantities represents.

*What if we wanted to go the other way around?* If we have a ratio that represents the sine, cosine or tangent of an angle, how can we get the original angle? This is where **inverse trigonometric functions** come in! Each inverse function asks what the necessary angle is to get a given value for a specific trigonometric function; in other words, it *undoes* the original trigonometric function. So…

- `**acos()**` is the inverse of `cos()`,
- `**asin()**` is the inverse of `sin()`, and
- `**atan()**` and `atan2()` are the inverse of `tan()`.

They are also called “arcus” functions and written as `arcos()`, `arcsin()` and `arctan()` in most places. This is because, in a circle, each angle corresponds to an arc in the circumference.

<CodePen
  user="anon"
  slug-hash="xbZabae"
  title="Unit circle - Arc length"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The length of this arc is the angle times the circle’s radius. Since trigonometric functions live in a **unit circle**, where the radius is equal to 1, the arc length is also the angle, expressed in radians.

Their mathy definitions are a little boring, to say the least, but they are straightforward:

- `y = acos(x)` such that `x = cos(y)`
- `y = asin(x)` such that `x = sin(y)`
- `y = atan(x)` such that `x = tan(y)`

---

### `acos()` and `asin()`

Using `acos()` and `asin()`, we can undo `cos(θ)` and `sin(θ)` to get the starting angle, `θ`. However, if we try to graph them, we’ll notice something odd:

![`acos()` and `asin()` graphed. The inverse sine curve crosses the x-axis at -1 and 1. The inverse cosine curve also crosses at -1 and 1.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/acos_asin_ljn9cu.png?resize=1920%2C1080&ssl=1)

The functions are only defined from `-1` to `1`!

Remember, `cos()` and `sin()` can take any angle, but they will always return a number between `-1` and `1`. For example, both `cos(90°)` and `cos(270°)` (not to mention others) return `0`, so which value should `acos(0)` return? To answer this, both `acos()` and `asin()` have their domain (their input) and range (their output) restricted:

- `acos()` can only take numbers between `-1` and `1` and return angles between `0°` and `180°`.
- `asin()` can only take numbers between `-1` and `1` and return angles between `-90°` and `90°`.

This limits *a lot* of the situations where we can use `acos()` and `asin()`, since something like `asin(1.2)` doesn’t work in CSS[^1] 

[^1]: [<VPIcon icon="fas fa-globe"/>according to the spec](https://drafts.csswg.org/css-values/#trig-infinities), going outside `acos()` and `asin()` domain returns `NaN` — which leads us to our next inverse function…

---

### `atan()` and `atan2()`

Similarly, using `atan()`, we can undo `tan(θ)` to get `θ`. But, unlike `asin()` and `acos()`, if we graph it, we’ll notice a big difference:

![`atan()` graphed. The curve's midpoint is positioned at 0 and 0, and the curve extends infinitely in the X direction.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/atan_j3sq9g-1.png?resize=1920%2C1080&ssl=1)

This time it is defined on the whole number line! This makes sense since `tan()` can return any number between `-Infinity` and `Infinity`, so `atan()` is defined in that domain.

::: note

`atan()` can take any number between `-Infinity` and `Infinity` and returns angles `-90°` and `90°`.

:::

This makes `atan()` incredibly useful to find angles in all kinds of situations, and a lot more versatile than `acos()` and `asin()`. That’s why we’ll be using it, along `atan2()`, going forward. Although don’t worry about `atan2()` for now, we’ll get to it later.

---

## Finding the perfect angle

In the [**last article**](/css-tricks.com/the-most-hated-css-feature-tan.md), we worked a lot with triangles. Specifically, we used the `tan()` function to find one of the sides of a right-angled triangle from the following relationships:

![The tangent of theta is equal to the opposite side divided by the adjacent side.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/tan_formula_2_fpi7fx.png?resize=1920%2C1080&ssl=1)
<!-- TODO: LaTeX 화 -->

To make it work, we needed to know one of its sides and the angle, and by solving the equation, we would get the other side. However, in most cases, we do know the lengths of the triangle’s sides and what we are actually looking for is the angle. In that case, the last equation becomes:

![Theta is equal to the atan of opposite side divided by the adjacent side.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/atan_formula_avbrtg.png?resize=1920%2C1080)
<!-- TODO: LaTeX 화 -->

---

## Triangles and Conic Gradients

Finding the angle comes in handy in lots of cases, like in gradients, for instance. In a [<VPIcon icon="iconfont icon-css-tricks"/>linear gradient](https://css-tricks.com/almanac/functions/l/linear-gradient/), for example, if we want it to go from corner to corner, we’ll have to match the gradient’s angle depending on the element’s dimensions. Otherwise, with a fixed angle, the gradient won’t change if the element gets resized:

```css
.gradient {
  background: repeating-linear-gradient(ghostwhite 0px 25px, darkslategray 25px 50px);
}
```

<CodePen
  user="anon"
  slug-hash="GgoXpYL"
  title="Finding the perfect angle I"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This may be the desired look, but I think that most often than not, you want it to match the element’s dimensions.

Using `linear-gradient()`, we can easily solve this using `to top right` or `to bottom left` values for the angle, which automatically sets the angle so the gradient goes from corner to corner.

```css
.gradient {
  background: repeating-linear-gradient(to top right, ghostwhite 0px 25px, darkslategray 25px 50px);
}
```

<CodePen
  user="anon"
  slug-hash="pvgQyzr"
  title="Finding the perfect angle II"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

However, we don’t have that type of syntax for other gradients, like a [<VPIcon icon="iconfont icon-css-tricks"/>`conic-gradient()`](https://css-tricks.com/almanac/functions/c/conic-gradient/). For example, the next conic gradient has a fixed angle and won’t change upon resizing the element.

```css
.gradient {
  background: conic-gradient(from 45deg, #84a59d 180deg, #f28482 180deg);
}
```

<CodePen
  user="anon"
  slug-hash="wBMQWWj"
  title="Finding the perfect angle III"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Luckily, we can fix this using `atan()`! We can look at the gradient as a right-angled triangle, where the width is the adjacent side and the height the opposite side:

![A square bisected diagonally from the bottom-left corner to the top-right corner, creating two right triangles. The theta angle is labeled in the bottom-left corner and the width is labeled along the bottom edge.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/right-triangle_fgmad0.png?resize=1920%2C1080&ssl=1)

Then, we can get the angle using this formula:

```css
.gradient {
  --angle: atan(var(--height-gradient) / var(--width-gradient));
}
```

Since `conic-gradient()` starts from the top edge — `conic-gradient(from 0deg)` — we’ll have to shift it by `90deg` to make it work.

```css
.gradient {
  --rotation: calc(90deg - var(--angle));
  background: conic-gradient(from var(--rotation), #84a59d 180deg, #f28482 180deg);
}
```

<CodePen
  user="anon"
  slug-hash="MYKzrMv"
  title="Finding the perfect angle IV"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

You may be wondering: can’t we do that with a linear gradient? And the answer is, yes! But this was just an example to showcase `atan()`. Let’s move on to more interesting stuff that’s unique to conic gradients.

I got the next example from Ana Tudor’s post on [**“Variable Aspect Ratio Card With Conic Gradients”**](/css-tricks.com/variable-aspect-ratio-card-with-conic-gradients-meeting-along-the-diagonal.md):

<CodePen
  user="anon"
  slug-hash="XWpyowX"
  title="Variable ratio cards"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Pretty cool, right?. Sadly, Ana’s post is from 2021, a time when trigonometric functions were specced out but not implemented. As she mentions in her article, it wasn’t possible to create these gradients using `atan()`. Luckily, we live in the future! Let’s see how simple they become with trigonometry and CSS.

We’ll use two conic gradients, each of them covering half of the card’s background.

![A square bisected in the middle with a diagonal line going from the top-right corner to the bottom-left, creating two right triangles, each with a different conic gradient applied to it.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/conic-gradient_taoqul.png?resize=1920%2C1080)

To save time, I’ll gloss over exactly how to make the original gradient, so here is a quick little step-by-step guide on how to make one of those gradients in a square-shaped element:

<CodePen
  user="anon"
  slug-hash="PwZxQXp"
  title="Cool Gradients Tutorial"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Since we’re working with a perfect square, we can fix the `--angle` and `--rotation` to be `45deg`, but for a general use case, each of the conic-gradients would look like this in CSS:

```css
.gradient {
  background: 
    /* one below */
    conic-gradient(
      from var(--rotation) at bottom left,
      #b9eee1 calc(var(--angle) * 1 / 3),
      #79d3be calc(var(--angle) * 1 / 3) calc(var(--angle) * 2 / 3),
      #39b89a calc(var(--angle) * 2 / 3) calc(var(--angle) * 3 / 3),
      transparent var(--angle)
    ),
    /* one above */
    conic-gradient(
      from calc(var(--rotation) + 180deg) at top right,
      #fec9d7 calc(var(--angle) * 1 / 3),
      #ff91ad calc(var(--angle) * 1 / 3) calc(var(--angle) * 2 / 3),
      #ff5883 calc(var(--angle) * 2 / 3) calc(var(--angle) * 3 / 3),
      transparent var(--angle)
    );
}
```

And we can get those `--angle` and `--rotation` variables the same way we did earlier — using `atan()`, of course!

```css
.gradient {
  --angle: atan(var(--height-gradient) / var(--width-gradient));
  --rotation: calc(90deg - var(--angle));
}
```

<CodePen
  user="anon"
  slug-hash="wBMQWQR"
  title="Finding the perfect angle V"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## What about `atan2()`?

The last example was all abou `atan()`, but I told you we would also look at the `atan2()` function. With `atan()`, we get the angle when we divide the opposite side by the adjacent side and pass that value as the argument. On the flip side, `atan2()` takes them as separate arguments:

- `atan(opposite/adjacent)`
- `atan2(opposite, adjacent)`

What’s the difference? To explain, let’s backtrack a bit.

We used `atan()` in the context of triangles, meaning that the adjacent and opposite sides were always positive. This may seem like an obvious thing since lengths are always positive, but we won’t always work with lengths.

Imagine we are in a x-y plane and pick a random point on the graph. Just by looking at its position, we can know its x and y coordinates, which can have both negative and positive coordinates. What if we wanted its angle instead? Measuring it, of course, from the positive x-axis.

![Showing a coordinate located at 3, 2 on an x-y graph. A line is drawn between it and the center point located at 0, 0, and the angle of the line is labeled as theta.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/point_in_place_fpy00c.png?resize=1920%2C1080)

Well, remember from the last article in this series that we can also define `tan()` as the quotient between `sin()` and `cos()`:

![The tangent of an angle is equal to the sine of the angle divided by the cosine of the angle.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/formula_tan_b1klgj.png?resize=1920%2C1080&ssl=1)
<!-- TODO: LaTex화 -->

Also recall that when we measure the angle from the positive x-axis, then `sin()` returns the y-coordinate and `cos()` returns the x-coordinate. So, the last formula becomes:

![The tangent of an angle equals the y coordinate divided by the x coordinate.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/formula_tan_xy_rtsyvk.png?resize=1920%2C1080&ssl=1)
<!-- TODO: LaTex화 -->

And applying `atan()`, we can directly get the angle!

![And angle is equal to the a-tangent times the value of the y-coordinate divided by the x-coordinate.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/atan_formula_xy_vylqms.png?resize=1920%2C1080)
<!-- TODO: LaTex화 -->

This formula has one problem, though. It should work for any point in the x-y plane, and since both x and y can be negative, we can confuse some points. Since we are dividing the y-coordinate by the x-coordinate, in the eyes of `atan()`, the negative y-coordinate looks the same as the negative x-coordinate. And if both coordinates are negative, it would look the same as if both were positive.

![The negative y-coordinate divided by the negative x-coordinate is equal to the y-coordinate divided by the x-coordinate. Also, the negative y-coordinate divided by the x-coordxinate is equal to the y-coordinate divided by the negative x-coordinate. ](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/xy_equivalences_ox4w9w.png?resize=1920%2C1080)
<!-- TODO: LaTex화 -->

To compensate for this, we have `atan2()`, and since it takes the y-coordinate and x-coordinate as separate arguments, it’s smart enough to return the angle everywhere in the plane!

Let’s see how we can put it to practical use.

---

## Following the mouse

Using `atan2()`, we can make elements react to the mouse’s position. Why would we want to do that? Meet my friend Helpy, [<VPIcon icon="fa-brands fa-wikipedia-w"/>Clippy’s](https://en.wikipedia.org/wiki/Office_Assistant) uglier brother from Microsoft.

<CodePen
  user="anon"
  slug-hash="VYeNBXJ"
  title="Inverse functions: atan2() I"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Helpy wants to always be looking at the user’s mouse, and luckily, we can help him using `atan2()`. I won’t go into too much detail about how Helpy is made, just know that his eyes are two pseudo-elements:

```css
.helpy::before,
.helpy::after {
  /* eye styling */
}
```

To help Helpy, we first need to let CSS know the mouse’s current x-y coordinates. And while I may not like using JavaScript here, it’s needed in order to pass the mouse coordinates to CSS as two custom properties that we’ll call `--m-x` and `--m-y`.

```js
const body = document.querySelector("body");

// listen for the mouse pointer
body.addEventListener("pointermove", (event) => {
  // set variables for the pointer's current coordinates
  let x = event.clientX;
  let y = event.clientY;

  // assign those coordinates to CSS custom properties in pixel units
  body.style.setProperty("--m-x", `${Math.round(x)}px`);
  body.style.setProperty("--m-y", `${Math.round(y)}px`);
});
```

Helpy is currently looking away from the content, so we’ll first move his eyes so they align with the positive x-axis, i.e., to the right.

```css
.helpy::before,
.helpy::after {
  rotate: 135deg;
}
```

Once there, we can use `atan2()` to find the exact angle Helpy has to turn so he sees the user’s mouse. Since Helpy is positioned at the top-left corner of the page, and the x and y coordinates are measured from there, it’s time to plug those coordinates into our function: `atan2(var(--m-y), var(--m-x))`.

```css
.helpy::before,
.helpy::after {
  /* rotate the eyes by it's starting position, plus the atan2 of the coordinates */
  rotate: calc(135deg + atan2(var(--m-y), var(--m-x)));
}
```

We can make one last improvement. You’ll notice that if the mouse goes on the little gap behind Helpy, he is unable to look at the pointer. This happens because we are measuring the coordinates exactly from the top-left corner, and Helpy is positioned a little bit away from that.

To fix this, we can translate the origin of the coordinate system directly on Helpy by subtracting the padding and half its size:

![Showing the range of Helpy's eyesight, going from left-to-right to top-to-bottom. A diagonal line bisects that range revealing an angle that is labeled theta.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/11/helpy_moved_a95vee.png?resize=1920%2C1080&ssl=1)

Which looks like this in CSS:

```css
.helpy::before,
.helpy::after  {
  rotate: calc(
    135deg +
      atan2(
        var(--m-y) - var(--spacing) - var(--helpy-size) / 2,
        var(--m-x) - var(--spacing) - var(--helpy-size) / 2
      )
  );
}
```

<CodePen
  user="anon"
  slug-hash="KwdJORo"
  title="Inverse functions: atan2() II"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This is a somewhat minor improvement, but moving the coordinate origin will be vital if we want to place Helpy in any other place on the screen.

---

## Extra: Getting the viewport (and anything) in numbers

I can’t finish this series without mentioning a trick to typecast different units into simple numbers using `atan2()` and `tan()`. It isn’t directly related to trigonometry but it’s still super useful. It was first [described amazingly by Jane Ori (<VPIcon icon="fa-brands fa-dev"/>`janeori`)](https://dev.to/janeori/css-type-casting-to-numeric-tanatan2-scalars-582j) in 2023, and goes as follows.

If we want to get the viewport as an integer, then we can…

```css
@property --100vw {
  syntax: "<length>;";
  initial-value: 0px;
  inherits: false;
}

:root {
  --100vw: 100vw;
  --int-width: calc(10000 * tan(atan2(var(--100vw), 10000px)));
}
```

And now: the `--int-width` variable holds the viewport width as an integer. This looks like magic, so I really recommend reading Jane Ori’s post to understand it. I also have an article using it to create [**animations as the viewport is resized**](/css-tricks.com/typecasting-and-viewport-transitions-in-css-with-tanatan2.md)!

<CodePen
  user="anon"
  slug-hash="WbePJvW"
  title="What can we do with tan(atan2())? - Initial Viewport Animations"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## What about reciprocals?

I noticed that we are still lacking the reciprocals for each trigonometric function. The reciprocals are merely 1 divided by the function, so there’s a total of three of them:

- The secant, or `**sec(x)**`, is the reciprocal of `cos(x)`, so it’s `1 / cos(x)`.
- The cosecant, or `**csc(x)**`, is the reciprocal of `sin(x)`, so it’s `1 / sin(x)`.
- The cotangent, or `**cot(x)**` is the reciprocal of `tan(x)`, so it’s `1 / tan(x)`.

The beauty of `sin()`, `cos()` and `tan()` and their reciprocals is that they all live in the unit circle we’ve looked at in other articles in this series. I decided to put everything together in the following demo that shows all of the trigonometric functions covered on the same unit circle:

<CodePen
  user="anon"
  slug-hash="MYKLpLy"
  title="Unit Circle - All Trig!"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## That’s it!

Welp, that’s it! I hope you learned and had fun with this series just as much as I enjoyed writing it. And thanks so much for those of you who have shared your own demos. I’ll be rounding them up in <VPIcon icon="fas fa-globe"/>[my Bluesky page](https://bsky.app/profile/monknow.bsky.social).

::: info CSS Trigonometric Functions: The “Most Hated” CSS Feature

```component VPCard
{
  "title": "The “Most Hated” CSS Feature: cos() and sin()",
  "desc": "I want to look at practical uses for CSS trigonometric functions. And we'll start with what may be the most popular functions of the ”worst” feature: sin() and cos().",
  "link": "/css-tricks.com/the-most-hated-css-feature-cos-and-sin.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The “Most Hated” CSS Feature: tan()",
  "desc": "Last time, we discussed that, sadly, according to the State of CSS 2025 survey, trigonometric functions are deemed the ”Most Hated” CSS feature.",
  "link": "/css-tricks.com/the-most-hated-css-feature-tan.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The “Most Hated” CSS Feature: asin(), acos(), atan() and atan2()",
  "desc": "If we have a ratio that represents the sine, cosine or tangent of an angle, how can we get the original angle? This is where inverse trigonometric functions come in!",
  "link": "/css-tricks.com/the-most-hated-css-feature-asin-acos-atan-and-atan2.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The “Most Hated” CSS Feature: asin(), acos(), atan() and atan2()",
  "desc": "If we have a ratio that represents the sine, cosine or tangent of an angle, how can we get the original angle? This is where inverse trigonometric functions come in!",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-most-hated-css-feature-asin-acos-atan-and-atan2.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
