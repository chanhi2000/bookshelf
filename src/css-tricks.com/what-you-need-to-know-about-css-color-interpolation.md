---
lang: en-US
title: "What You Need to Know About CSS Color Interpolation"
description: "Article(s) > What You Need to Know About CSS Color Interpolation"
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
      content: "Article(s) > What You Need to Know About CSS Color Interpolation"
    - property: og:description
      content: "What You Need to Know About CSS Color Interpolation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/what-you-need-to-know-about-css-color-interpolation.html
prev: /programming/css/articles/README.md
date: 2025-09-05
isOriginal: false
author:
  - name: Sunkanmi Fafowora
    url : https://css-tricks.com/author/sunkanmifafowora/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/10/cloud-four-gradient.png
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
  name="What You Need to Know About CSS Color Interpolation"
  desc="Color what? Sunkanmi Fafowora explains how an everyday task for CSS can be used to create better colors experiences."
  url="https://css-tricks.com/what-you-need-to-know-about-css-color-interpolation"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/10/cloud-four-gradient.png"/>

Color interpolation, loosely speaking, is the process of determining the colors between two color points. It allows us to create unique colors, beautiful palettes, better gradients, and smooth transitions.

I recently wrote a [**Guide to CSS Color Functions**](/css-tricks.com/css-color-functions.md) but didn’t have the chance to explain color interpolation in any great depth — which is a shame, since it allows us to create cool demos like this one:

<CodePen
  user="sunkanmii-the-styleful"
  slug-hash="empgXNp"
  title="color interpolation example"
  :default-tab="['css','result']"
  :theme="dark"/>

Did you notice how `oklch(80% 0.3 340)` interpolates to `oklch(80% 0.3 60)`, then to `oklch(80% 0.3 180)`, then to `oklch(80% 0.3 270)` and back to `oklch(80% 0.3 340)` using CSS animation? Well, I did! And that’s just a powerful use of interpolation.

---

## Where can we use color interpolation?

Again, color interpolation is all over CSS. These properties and functions support color interpolation either through direct mixing, gradients, or transitions:

- [**All color gradients**](/css-tricks.com/a-complete-guide-to-css-gradients.md), like`linear-gradient()`, `conic-gradient()`, etc.
- [`color-mix()`](https://css-tricks.com/almanac/functions/c/color-mix/)
- [`animation`](https://css-tricks.com/almanac/properties/a/animation/)
- [`transition`](https://css-tricks.com/almanac/properties/t/transition/)
- [`filter`](https://css-tricks.com/almanac/properties/f/filter/)
- [**All functions in the relative color syntax**](/css-tricks.com/css-color-functions.md#the-relative-color-syntax)

In gradients and the `color-mix()` function, we even have a formal syntax for color interpolation:

```html
<color-interpolation-method> = in [ <rectangular-color-space> | <polar-color-space> <hue-interpolation-method>? ]

<color-space> = <rectangular-color-space> | <polar-color-space>
  <rectangular-color-space> = srgb | srgb-linear | display-p3 | a98-rgb | prophoto-rgb | rec2020 | lab | oklab | xyz | xyz-d50 | xyz-d65
  <polar-color-space> = hsl | hwb | lch | oklch
  <hue-interpolation-method> = [ shorter | longer | increasing | decreasing ] hue
```

Yes, that’s a convoluted definition, but if we go ahead and inspect how this syntax works in `color-mix()`, for example, we would have something like this:

```css
.element{
  color: color-mix(in lch longer hue, red, blue);
}
```

::: note

The CSS `color-mix()` function provides a way for us to mix different colors in any color space, which is all what color interpolation is about: going from color to another.

:::

Our key focus is the `in lab longer hue` part, which specifies how `color-mix()` does the interpolation. This is basically saying, “Hey CSS, interpolate the next colors in the CIELCH color space using a longer hue arc.” Yes, the `in lab` part means the interpolation is done in CIELCH, one of the many [**CSS color spaces**](/css-tricks.com/color-everything-in-css.md), but we’ll get to what `longer hue` exactly means later.

Just remember:

- The `in` keyword always precedes the color interpolation method.
- The second value is the color space used for mixing.
- The third value is an optional hue interpolation method ending with the `hue` keyword.

This same syntax appears in all gradient functions, where colors are interpolated gradually to get a smooth gradient. Look at how tweaking the gradient with the color interpolation syntax can give us a completely new gradient:

```css
.element {
  background: linear-gradient(in oklch longer hue 90deg, magenta, cyan);
}
```

<CodePen
  user="monknow"
  slug-hash="VYvbeaG"
  title="What you need to know about Color Interpolation - Example"
  :default-tab="['css','result']"
  :theme="dark"/>

Let’s backtrack a little, though. Interpolation can occur in two major color spaces: **rectangular** and **polar**.

---

## Rectangular color spaces

Rectangular color spaces represent colors using Cartesian coordinates on a three-dimensional plane, which you might already know as the X (horizontal), Y (vertical), and Z (depth) axes on a graph.

Rectangular color spaces are like the same sort of graph, but is a map of color points instead. For example, the sRGB color space has three axes, responsible for the amount of a color’s redness, blueness, and greenness.

![3D line chart with X, Y and Z points, representing different color points.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/08/s_406FF26874B0D5E502031DFB78594A5439F83972E87059DA7476D158E619DC89_1753138621135_image.png?resize=772%2C756&ssl=1)

---

## Polar color spaces

Polar color spaces also represent colors in a three-dimensional plane, just like rectangular color spaces, but it is shaped like a cylinder instead of a rectangular. A color point is represented by three values:

- The **height from the point to the center**, usually assigned to lightness or brightness.
- The **radial distance from the center**, usually assigned to chroma or saturation.
- The **angle around the center**, assigned to the hue.

![Illustration of a color space in a cylindrical shape showing points for the height, radial distance, and center angle.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/08/s_406FF26874B0D5E502031DFB78594A5439F83972E87059DA7476D158E619DC89_1753139382815_image.png?resize=695%2C699&ssl=1)

Credit: Wikipedia

What makes polar color spaces unique is the hue *angle*. Since it’s an angle, and they are cyclic (like a continuous circle), we have more options for how it can be interpolated.

---

## Hue interpolation

Think of hue interpolation like finding the distance between the two times on a clock.

![Hand clock face with time at 3:10.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/08/s_406FF26874B0D5E502031DFB78594A5439F83972E87059DA7476D158E619DC89_1753140561089_clockexample.png?resize=1200%2C900&ssl=1)

Let’s assume the clock can go clockwise (forwards) or counterclockwise (backwards) in time.

![Hand clock face with directional arrows around it pointing clockwise and counterclockwise, current time 2:10.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/08/s_406FF26874B0D5E502031DFB78594A5439F83972E87059DA7476D158E619DC89_1754041653187_clockexample-1.png?resize=1200%2C900&ssl=1)

The minute hand is at 10 minutes (2). If we want to take the shortest distance between 50 minutes (10), then we would make a counterclockwise turn, like going back in time since that is shorter than moving forward in a clockwise direction.

![Showing the clockwise and counterclockwise distance for moving from the 2 position to the 10 position on the clock face.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/09/clock-diagram-direction.png?resize=1200%2C900&ssl=1)

That’s because if you take the *longer* route, you’ll have to pass through 3, 4, 5, etc. all the way to 10. Taking the *shorter* counterclockwise) route , you would reach 10 in less time (15 minutes).

Hue interpolation works similarly. It is a CSS algorithm that determines how you want hue colors in polar color spaces to be mixed, and the direction you want to take between two hue points.

There are four types of hue interpolation in CSS. Let’s go over those next.

---

## `shorter` and `longer`

The `shorter` (default value) hue interpolation method simply takes the *shorter* route, while the `longer` hue interpolation method takes the *longer* route when mixing colors between two hue points.

Imagine blending two hue values red (`0deg`) and blue (`240deg`). There are two ways to do this:

- Go the longer route (distance of `240deg`).
- Go the shorter route (distance of `120deg`).

If `shorter` is used, the browser takes the *shorter* route (`120deg`). Otherwise, if `longer` is used, the browser takes the *longer* route (`240deg`).

<CodePen
  user="sunkanmii-the-styleful"
  slug-hash="dPYMpMv"
  title="hue interpolation methods: shorter vs longer"
  :default-tab="['css','result']"
  :theme="dark"/>

This offers up a nice and unique blend of colors depending on your preferences. Hue interpolation is useful in creating smooth color transitions and gradients, giving plenty of life to the websites using *color*.

The shorter or longer hue interpolation, depending on the shortest or longest distances between two hue value points, can either go clockwise or counterclockwise. We can also set this automatically without actually using one of these keywords, which we will look at next.

---

## `increasing` and `decreasing`

Sticking with our clock analogy, the `increasing` hue interpolation method is like moving the minutes hand from 2 to 10, always in a clockwise direction. Even if the final value is 1, it would still go in a clockwise direction, doing almost a full turn.

If, however, the hue interpolation method is set to `decreasing`, the minutes hand will always go in a counterclockwise direction. As the [<VPIcon icon="fas fa-globe"/>specification says](https://drafts.csswg.org/css-color/#hue-increasing), *“depending on the difference between the two angles, this will either look the same as shorter or as longer.”*

If the angle goes from `20deg` to `50deg` using the `increasing` hue interpolation value, the value will move *clockwise* from `20deg` to `50deg`, displaying the colors in between. However, if the hue interpolation method is set to `decreasing`, then the algorithm takes the value from `20deg` to `50deg` in a counterclockwise direction.

Since `increasing` means the clock’s minute hand is constantly moving forward, this means the value can reach up to `360deg`, a full circle. If the angle reaches `360deg`, it resets back to `0deg` until it reaches the next point. But if `decreasing` reaches `0deg`, then it resets to `360deg`, keeping the hue change consistent.

<CodePen
  user="sunkanmii-the-styleful"
  slug-hash="RNWaGLQ"
  title="hue interpolation methods: increasing vs decreasing"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## How is this useful?

Yes, all this theory is great: we can use interpolation to get the intermediary color(s) between two colors and make new kinds of colors, but how can we actually use it to create better color experiences in CSS?

### Creating gradients

Color interpolation happens frequently in all [**CSS gradient functions**](/css-tricks.com/a-complete-guide-to-css-gradients.md). Take, for example, the `conic-gradient()` function, which makes it easy to create a smooth transition of colors that rotate around a center point:

```css
background: conic-gradient(
  from 0deg,
  oklch(70% 0.3 0deg),
  oklch(70% 0.3 120deg),
  oklch(70% 0.3 240deg),
  oklch(70% 0.3 360deg)
);
```

<CodePen
  user="sunkanmii-the-styleful"
  slug-hash="JoYrjjz"
  title="color interpolation: CSS conic-gradient() example"
  :default-tab="['css','result']"
  :theme="dark"/>

Notice how the hue blends smoothly between each color stop point? It’s beautiful.

### Color mixing

Reading about [<VPIcon icon="iconfont icon-css-tricks"/>`color-mix()`](https://css-tricks.com/almanac/functions/c/color-mix/) in the CSS-Tricks Almanac will give you a basic idea of how this is done, but if you’re like me and want the raw code, here it is:

```css
/* First Box */
background-color: color-mix(in oklch, rgb(255 0 0) 50%, lch(60% 40% 220deg) 50%);

/* Second Box */
background-color: color-mix(in oklch longer hue, rgb(255 0 0) 50%, lch(60% 40% 220deg) 50%);
```

<CodePen
  user="monknow"
  slug-hash="YPyrjxX"
  title="color interpolation: CSS color-mix() example"
  :default-tab="['css','result']"
  :theme="dark"/>

A great advantage of `color-mix()` is that you gain the ability to mix colors in different color spaces within another color space, thereby producing a unique color. Again, it’s moving from one color into another and the direction we take for mixing colors matters.

### Animation

We can animate the transition between colors! So, instead of mixing two specific points, we can watch the color transition between all of the colors in between the two points!

```css
@keyframes bg-shift {
  from {
    background-color: oklch(30% 0.3 20deg); /* dark pink */
  }
  to {
    background-color: oklch(70% 0.3 200deg); /* Cool bluish */
  }
}
```

<CodePen
  user="sunkanmii-the-styleful"
  slug-hash="PwPJqNr"
  title="color interpolation: CSS animation example"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info References

```component VPCard
{
  "title": "Okay, Color Spaces —  ericportis.com",
  "desc": "Colors… in… spaaaaaaace",
  "link": "https://ericportis.com/posts/2024/okay-color-spaces//",
  "logo": "https://ericportis.com/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

```component VPCard
{
  "title": "Color Interpolation - ColorAide Documentation",
  "desc": "A library to aid in using colors",
  "link": "https://facelessuser.github.io/coloraide/interpolation//",
  "logo": "https://facelessuser.github.io/coloraide/assets/images/favicon.png",
  "background": "rgba(191,149,249,0.2)"
}
```

```component VPCard
{
  "title": "CSS Color Module Level 4 - Color Interpolation",
  "desc": "Color interpolation happens with gradients, compositing, filters, transitions, animations, and color mixing and color modification functions.",
  "link": "https://drafts.csswg.org/css-color/#interpolation/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

<SiteInfo
  name="Interpolating Colours"
  desc="Today I’ll be talking about how we can use some relatively new data types in CSS for finer control over how we use colour spaces in mixing and creating gradients from colours. "
  url="https://chrisburnell.com/article/interpolating-colours//"
  logo="https://chrisburnell.com/images/favicon-64.png"
  preview="https://chrisburnell.com/og-images/article-interpolating-colours.png"/>


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What You Need to Know About CSS Color Interpolation",
  "desc": "Color what? Sunkanmi Fafowora explains how an everyday task for CSS can be used to create better colors experiences.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/what-you-need-to-know-about-css-color-interpolation.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
