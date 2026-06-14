---
lang: en-US
title: "Fluid Typography with progress()"
description: "Article(s) > Fluid Typography with progress()"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Fluid Typography with progress()"
    - property: og:description
      content: "Fluid Typography with progress()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/fluid-typography-with-progress.html
prev: /programming/css/articles/README.md
date: 2026-06-29
isOriginal: false
author:
  - name: Matthew Morete
    url: https://master.dev/blog/author/matthewmorete/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/10250
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
  name="Fluid Typography with progress()"
  desc="With the `progress()` function in CSS we've got a new way to calculate the size for type based on the viewport without problems of the past."
  url="https://master.dev/blog/fluid-typography-with-progress/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/10250"/>

::: "Reimagining Fluid Typography" *from Oddbird* (<VPIcon icon="fas fa-globe"/><code>oddbird.net</code>)

> Never do pixel math with em and rem units. That’s where we went wrong, by assuming that 16px == 1em is a reliable fact.

```component VPCard
{
  "title": "Reimagining Fluid Typography",
  "desc": "Are we responding to the right inputs?",
  "link": "/oddbird.net/fluid-type.md",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```

:::

Fluid typography has been around for a while. These days, most people reach for `clamp()` with pre-calculated values from tools like [<VPIcon icon="fas fa-globe"/>Utopia](https://utopia.fyi/type/calculator/), [<VPIcon icon="fas fa-globe"/>Fluid Type Scale](https://fluid-type-scale.com/), or Sass. It’s modern, concise, and super easy to use.

You’ve probably used a similar calculator before. You input two sizes and their corresponding breakpoints, and it generates a value that fluidly scales between them.

Usually, we input these numbers as pixels, and most good calculators will convert the font size to rems. That’s part of the appeal.

But you might not have realized that your thoughtfully chosen breakpoints have also been converted to rems and are now subject to the user’s default font size.

In practice, this means your breakpoints can be wildly different from what you imagined, and we can accidentally disregard the user’s font size choices in the process.

We’ll explore why this happens and how we can solve it with modern CSS, using range mapping to calculate everything in the browser.

::: note

Before we dive in, a quick heads-up: this technique is more complex than you might be used to, but it’s easy to reuse thanks to custom properties, and future CSS will make it much more concise.

:::

---

## A Problem with Fluid Typography

Let’s say you’ve set up some fluid type with these inputs:

| **Viewport** | **Font Size** |
| :---: | :---: |
| `600px` | `12px` |
| `1200px` | `32px` |

A calculator will then helpfully convert those values to rem units behind the scenes:

| **Viewport** | **Font Size** |
| :---: | :---: |
| `37.5rem` | `0.75rem` |
| `75rem` | `2rem` |

Now, imagine a user with a `1200px` wide screen and the **default root font size of 16px**. At 2rem, the font size is `32px`, exactly what we expected.

But what if that user increases their base font size to **32px**?

Everything is still in rems, but now 1rem = 32px. So:

| **Viewport** | **Font Size** |
| :---: | :---: |
| `1200px` | `24px` |
| `2400px` | `64px` |

At the same 1200px viewport, the font size is now only `24px`.

Despite the viewport not changing and the user increasing their font size, our fluid type has shrunk, working directly against the user’s preference.

While this is an extreme case, any pre-calculated fluid value experiences this issue to some degree.

So how do we fix it?

We need to bring the calculations back into CSS and mix our units, combining the accuracy of pixel-based breakpoints with the accessibility of rem-based font sizes.

There are several ways to perform these calculations, but range mapping stands out as a method especially well suited to CSS. It’s particularly appealing because it aligns with emerging CSS features like `progress()` and `calc-mix()`, which will simplify these calculations in the future.

While this is closely related to the similar problem of ensuring fluid type can be zoomed to 200% of its original size, it is unfortunately not addressed by this technique and will still require manual testing.

---

## Range Mapping

Range mapping is the process of converting a value from one range to another while preserving its relative position. For fluid typography, we want to take the current viewport width and calculate the corresponding value in our output range.

In this demo, you’ll see that for any value in either range, there is a corresponding value in the other:

<CodePen
  user="anon"
  slug-hash="azbWQWb"
  title="Fluid Sizing Range Mapping Visualisation"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s a rather large output range for the purposes of visualizing, so we’ll define some more sensible values in CSS:

```css
--min-size: 1rem;
--min-size-viewport: 400px;

--max-size: 1.5rem;
--max-size-viewport: 1200px;
```

First, we need to calculate the current viewport’s position within our range.

### `progress()`

Until quite recently, figuring this out was actually very tricky. We had to rely on [advanced CSS hacks (<VPIcon icon="fa-brands fa-dev"/>`janeori`)](https://dev.to/janeori/css-type-casting-to-numeric-tanatan2-scalars-582j) to convert values to unitless numbers, which greatly complicated the calculations.

Fortunately, modern CSS has delivered us a new function that does exactly that:

```css
--progress: progress(100vi, var(--min-size-viewport), var(--max-size-viewport));
```

::: info From MDN

> The **progress()** CSS function returns a `<number>` value representing the position of one value (the progress value) relative to two other values.

:::

Just what we need!

It has a few key features that make it ideal for our use:

- It accepts a mix of units, as long as they are all of the same type. This allows us to use `100vi` to measure the current viewport, and then compare it to our range defined in pixels (or any length units we choose).
- It returns a unitless number, making it much easier to work with later in our calculation.
- Since the returned number is always between 0 and 1, it also clamps our size between its minimum and maximum.

With `progress()`, we no longer need to convert our viewport breakpoints to rems, completely side-stepping the problem of traditional fluid typography discussed above.

### Finishing the Calculation

Next, we need to find the ‘span’ of our output range, how big it is. We can easily calculate that by subtracting the minimum from the maximum:

```css
/* 1.5rem - 1rem = 0.5rem */
--output-span: calc(var(--max-size) - var(--min-size));
```

Now we can scale this span based on the current viewport by multiplying by our `progress()` value:

```css
/* (0-1) * 0.5rem */
--fluid: calc(var(--progress) * var(--output-span));
```

This gives us a range that starts at 0, so let’s use our minimum size to offset that to the correct starting point:

```css
/* 1rem + (0-1) * 0.5rem */
--fluid: calc(var(--min-size) + var(--progress) * var(--output-span));
```

Now it scales correctly from the start to the end of our range, and we have our final value! Here’s it all put together:

```css
--min-size: 1rem;
--min-size-viewport: 400px;

--max-size: 1.5rem;
--max-size-viewport: 1200px;

--_progress: progress(100vi, var(--min-size-viewport), var(--max-size-viewport));
--_output-span: calc(var(--max-size) - var(--min-size));

--fluid: calc(var(--min-size) + var(--_progress) * var(--_output-span));
```

---

## Building a Scale

Let’s extend this to a full scale, with each step derived from the previous using a custom ratio. It’s popular to use different ratios for the minimum and maximum sizes, so we’ll do the same.

Here’s our ratios in CSS alongside the rest of our setup:

```css
--min-size: 1rem;
--min-size-viewport: 400px;
--min-size-ratio: 1.2;

--max-size: 1.5rem;
--max-size-viewport: 1200px;
--max-size-ratio: 1.25;

--_progress: progress(100vi, var(--min-size-viewport), var(--max-size-viewport));
```

Now for the steps of our scale. Using what we’ve already discussed, let’s create our base size:

```css
--step-0: calc(
  var(--min-size) + var(--_progress) * (var(--max-size) - var(--min-size))
);
```

To calculate our next step, we multiply every use of our min and max sizes by their ratio. Let’s use extra custom properties to store these values:

```css
--_min-1: calc(var(--min-size) * var(--min-size-ratio));
--_max-1: calc(var(--max-size) * var(--max-size-ratio));

--step-1: calc(
  var(--_min-1) + var(--_progress) * (var(--_max-1) - var(--_min-1))
);
```

What about step 2? We multiply each size by its ratio *twice*, which luckily is the same as squaring the ratio with `pow()`:

```css
--_min-2: calc(var(--min-size) * pow(var(--min-size-ratio), 2));
--_max-2: calc(var(--max-size) * pow(var(--max-size-ratio), 2));

--step-2: calc(
  var(--_min-2) + var(--_progress) * (var(--_max-2) - var(--_min-2))
);
```

In fact, since anything to the power of 1 is itself, and anything to the power of 0 is 1, we can use this same calculation for every step in our scale. It even works with negative numbers to create smaller sizes.

For any given step *n*, we raise both ratios to the power of *n.*

With that in mind, we have a few options for defining the rest of our scale:

### Per Element Value

If you’ve ever looked at the code of one of [Jhey’s demos (<VPIcon icon="fa-brands fa-codepen"/>`jh3y`)](https://codepen.io/jh3y), you might notice he often uses a fluid typography technique very similar to what we’ve done here.

He gets an infinite scale with no duplication by setting the exponent via a custom property, rather than hardcoding it at each step.

<CodePen
  user="anon"
  slug-hash="wBgezaB"
  title="Fluid Typography with Progress() (Per Element)"
  :default-tab="['css','result']"
  :theme="dark"/>

The downside is that we’re limited to a single value for the entire element, so we can’t set other properties with different steps.

### A little bit of Sass

If you’re already using Sass, then a complete scale is just a @for loop away:

<CodePen
  user="anon"
  slug-hash="RNKgGRm"
  title="Fluid Typography with Progress() (Sass)"
  :default-tab="['css','result']"
  :theme="dark"/>

### Stick to CSS

Since we’re only changing a few numbers for each step, it’s easy to copy and paste the rest of our scale.

<CodePen
  user="anon"
  slug-hash="RNKgGGm"
  title="Fluid Typography with Progress() (CSS)"
  :default-tab="['css','result']"
  :theme="dark"/>

And that’s it! All ready to copy and paste into your projects; just edit the scale config as required.

---

## Taking It Further

Our conditional value can be anything we have the units to express. I used 100vi, but we could easily swap that for 100cqi to instead respond to the width of the nearest container:

```css
--progress: progress(100qi, var(--min-size-container), var(--max-size-container));
```

If you prefer whole numbers or have a baseline grid you need to align to, then we can use round() with our preferred rounding interval:

```css
--interval: 1px;

--step-0: round(
  var(--min-size) + var(--_progress) * (var(--max-size) - var(--min-size)),
  var(--interval));
```

What if our scale decreases as the viewport increases? It’s probably not something commonly needed in practice, but fortunately, the range-mapping calculation already handles an inverse relationship. Just swap the viewport values:

```css
--min-size: 1rem;
--min-size-viewport: 1200px;

--max-size: 1.5rem;
--max-size-viewport: 400px;
```

---

## Browser Support

The biggest limiting factor is `progress()`, which is supported in all modern browsers except Firefox, so this isn’t ready for production just yet.

If you wanted to test for support and fallback to a traditional scale, it is easy to do so:

```css
@supports (opacity: progress(1px,0px,1px) {
  ...
}
```

It is possible to support all major browsers without `progress()` by manually calculating this value ourselves using some CSS hacks. Here are some demos showing how to do that if you are interested, but be warned, it’s even more verbose than what we’ve done here:

- [Per Element (<VPIcon icon="fa-brands fa-codepen"/>`matthewmorete`)](https://codepen.io/matthewmorete/pen/zxvNrEM?editors=0101)
- [Sass (<VPIcon icon="fa-brands fa-codepen"/>`matthewmorete`)](https://codepen.io/matthewmorete/pen/VYvPYqv?editors=0101)
- [CSS (<VPIcon icon="fa-brands fa-codepen"/>`matthewmorete`)](https://codepen.io/matthewmorete/pen/LEpxVPp?editors=0101)

---

## The Future

```css
@function --fluid-size(--step) {
  --min-size: 1rem;
  --min-size-viewport: 400px;
  --min-size-ratio: 1.2;

  --max-size: 1.5rem;
  --max-size-viewport: 1200px;
  --max-size-ratio: 1.25;

  --_progress: progress(100vi, var(--min-size-viewport), var(--max-size-viewport));
  --_min-size: calc(var(--min-size) * pow(var(--min-size-ratio), var(--step)));
  --_max-size: calc(var(--max-size) * pow(var(--max-size-ratio), var(--step)));

  result: calc-mix(var(--_progress), var(--_min-size), var(--_max-size));
}

h1 {
  font-size: --fluid-size(4);
}
```

What an upgrade! Here’s what’s happening:

### `@function`

As I mentioned at the start, and you’ve probably noticed, calculating a fluid scale in CSS is very verbose. But not with `@function`! Instead of calculating a separate variable for each step, we put all our calculations into a single function and call it instead.

Currently only supported in Chromium.

Juan Diego Rodríguez explains [**CSS functions**](/css-tricks.com/functions-in-css.md) in more detail.

### `calc-mix()`

In the even further future, things will get even more concise with `calc-mix()`, which completes the remaining range mapping calculations.

It takes 3 inputs: a normalized/progress() value and the start and end of the output range:

```css
calc-mix(var(--_progress), var(--_min-size), var(--_max-size))
```

No browser supports `calc-mix()` yet, but until then, we can continue to calculate this ourselves.

::: info Further Reading

<SiteInfo
  name="How to map a number between two ranges | Henry From Online"
  desc="A common task in creative web development and animation is converting a number in one range to a new range, also known as linear transformation. Here’s a basic rundown on executing that operation in a mathematical context, and how to translate that to JavaScript."
  url="https://henry.codes/writing/how-to-map-a-number-between-two-ranges//"
  logo="https://henry.codes/meta/favicon-16x16.png"
  preview="https://v1.screenshot.11ty.dev/https%3A%2F%2Fhenry.codes%2Fopengraph%2Fwriting%2Fhow-to-map-a-number-between-two-ranges/opengraph"/>

If you’re looking for more about range mapping, then check out Henry’s excellent explanation.

<SiteInfo
  name="Precise control over responsive typography - MadeByMike"
  desc="Creating fluid responsive typography with calc and viewport units."
  url="https://madebymike.com.au/writing/precise-control-responsive-typography/"
  logo="https://madebymike.com.aus/favicon-16x16.png"
  preview="https://madebymike.com.au/img/mug/mike.jpg"/>

Pre-dating most CSS math functions and even custom properties, this 2015 post from Mike is the earliest I can find describing the precise fluid type we use today. He even uses the same range mapping approach we’ve used here.


```component VPCard
{
  "title": "Responsive Type and Zoom",
  "desc": "Typography that responds to viewport width (‘fluid’ or ‘responsive’ typography) can be useful when you want to ensure text does not get clipped or spill out of some design elements. Carousels, widget controls, or my Venn diagram are some examples. I say viewport width because I rarely see responsive type…",
  "link": "/adrianroselli.com/responsive-type-and-zoom.md",
  "logo": "https://adrianroselli.com/wp-content/themes/AAR/favicon.png",
  "background": "rgba(0,0,0,0.2)"
}
```

Adrian Roselli reminds us of accessibility concerns and argues that we may not need fluid typography.

- [<VPIcon icon="iconfont icon-w3c"/>Addressing Accessibility Concerns With Using Fluid Type](https://smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/) — Maxwell Barvian gives us advice on passing [<VPIcon icon="iconfont icon-w3c"/>1.4.4 Resize text (AA)](https://w3.org/WAI/WCAG21/quickref/?showtechniques=144#resize-text) by ensuring we can zoom all text to 200% of its original size.

- [**Reimagining Fluid Typography**](/oddbird.net/fluid-type.md) & [<VPIcon icon="fas fa-globe"/>In defence of fluid typography](https://clagnut.com/blog/2441/) — A back and forth between Miriam Suzanne and Richard Rutter, considering the merits of fluid type.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fluid Typography with progress()",
  "desc": "With the `progress()` function in CSS we've got a new way to calculate the size for type based on the viewport without problems of the past.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/fluid-typography-with-progress.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
