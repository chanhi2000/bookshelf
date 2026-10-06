---
lang: en-US
title: "Fallbacks for CSS `progress()`"
description: "Article(s) > Fallbacks for CSS `progress()`"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Fallbacks for CSS `progress()`"
    - property: og:description
      content: "Fallbacks for CSS `progress()`"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/fallbacks-for-css-progress.html
prev: /programming/css/articles/README.md
date: 2026-10-02
isOriginal: false
author:
  - name: Matthew Morete
    url: https://blog.master.dev/author/matthewmorete/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11189
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
  name="Fallbacks for CSS `progress()`"
  desc="The new CSS progress() function calculates a value between 0 and 1, representing its position within a defined range. While awaiting broader browser support, users can manually implement this using other methods."
  url="https://blog.master.dev/fallbacks-for-css-progress/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11189"/>

The new [<VPIcon icon="fa-brands fa-firefox"/>CSS `progress()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/progress) calculates where a value sits between a start and end bound, returning a unitless number between `0` and `1`.

While we wait for browser support to grow, we can manually calculate progress and use its underlying mechanics.

The math behind `progress(value, start, end)` is simple:

$$
\begin{align*}
\text{progress}=\frac{\left(\text{current value}-\text{start}\right)}{\left(\text{end}-\text{start}\right)}
\end{align*}
$$

This is also known as **normalization**.

Depending on the types of values you are working with, implementing this in CSS ranges from a straightforward `calc()` to some more complicated CSS tricks.

---

## All Unitless Numbers

If you are working purely with unitless numbers ([**like in Preethi Sam’s article**](/blog.master.dev/comparing-values-with-css-progress.md)), you can implement the formula directly in `calc()`. To match the default behavior of `progress()`, we’ll use `clamp()`.

For example, to find where `50` sits between `10` and `100`:

```css
--progress: clamp(0, (50 - 10) / (100 - 10), 1);
```

That’s it, almost as easy as `progress()`.

---

## Working with Units

Most of the time, we want to use units like `px`, `rem`, or `vw` while still outputting a unitless value.

Browsers that support typed arithmetic can already do this. Both these lines should produce the same result:

```css
--progress: clamp(0, (100vw - 20rem)/(100rem - 20rem), 1);
--progress: progress(100vw, 20rem, 100rem);
```

Sadly, this still isn’t cross-browser (looking at you, Firefox).

Enter the [`tan(atan2())` trick (<VPIcon icon="fa-brands fa-dev"/>`janeori`)](https://dev.to/janeori/css-type-casting-to-numeric-tanatan2-scalars-582j).

We could wrap every value in this, but we can optimize it further.

The progress formula requires division, and `atan2(y, x)` already divides its values. Pass the **offset** (`value - start`) as the first argument and the **span** (`end - start`) as the second.

If all your values use the same unit, you can plug them straight in:

```css
/* Where does 500px sit between 320px and 1200px? */
--progress: tan(atan2(500px - 320px, 1200px - 320px));
```

---

## Mixing Units

Usually, your units *won’t* match. In theory, `atan2()` should handle mixed units, and in some browsers, it does. But for cross-browser support, we need to do a little more work.

Let’s look at fluid typography.

For fluid type, we want the progress value to be based on the viewport width (`100vw`), relative to lower and upper bounds (`320px` and `1200px`).

Here we’re mixing `vw` and `px`, so we need to convert `100vw` to pixels for the math to work everywhere.

We can do this by registering the viewport width as a `<length>` custom property, with `100vw` as its initial value:

```css
@property --vw {
  syntax: "<length>";
  inherits: true;
  initial-value: 100vw;
}

:root {
  --progress: clamp(0, tan(atan2(var(--vw) - 320px, 1200px - 320px)), 1);
}
```

Registering `--vw` as a `<length>` makes the browser resolve `100vw` to its `px` equivalent. Now all values passed to `atan2()` share the same unit, making this work cross-browser.

---

## The Robust Approach

What if you want to use `rem` for your bounds?

Registering a custom property as `<length>` resolves it to pixels; you can’t force it to resolve to `rem`. To avoid mixing units, we’d have to register every value so they all resolve to pixels.

Fortunately, we can optimize this. We don’t need to register the value, start, and end separately, only the two values passed to `atan2()`: the offset and the span.

Let’s make those values custom properties and register them with `@property`:

```css
@property --offset {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px;
}

@property --span {
  syntax: "<length>";
  inherits: true;
  initial-value: 0px;
}

:root {
  --offset: calc(100vw - 20rem);
  --span: calc(80rem - 20rem);
  --progress: clamp(0, tan(atan2(var(--offset), var(--span))), 1);
}
```

And that’s it: the same calculation as `progress()`, with much better browser support.

If you want to emulate the unclamped version of `progress()`, remove the `clamp()`.

---

## Which method should you use?

Your approach depends on the units you are using:

- **All unitless numbers:** Calculate the value directly with `calc()` or `clamp()`.
- **Using units:** Use the `tan(atan2())` trick.
- **One unit:** You don’t need to register any custom properties.
- **Pixels + one non-pixel unit:** Register the non-pixel value as a `<length>`. This is the most common case in fluid typography.
- **Multiple non-pixel units:** Make the offset and span custom properties, register both as `<length>`, and pass them to `atan2()`.

The `progress()` function is already in modern browsers, so it won’t be long until you can use it natively without worry. Until then, hopefully this helps you choose the simplest fallback for your situation.

```component VPCard
{
  "title": "Fluid Typography with progress()",
  "desc": "With the `progress()` function in CSS we've got a new way to calculate the size for type based on the viewport without problems of the past.",
  "link": "/blog.master.dev/fluid-typography-with-progress.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Comparing Values With CSS progress()",
  "desc": "The new CSS progress() function maps a given value to a range. Super useful for responsive layouts, responsive typography, and fun tricks. ",
  "link": "/blog.master.dev/comparing-values-with-css-progress.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Using CSS Scroll-Driven Animations for Section-Based Scroll Progress Indicators",
  "desc": "A scroll progress indicator is a pretty straightforward thing to build with a scroll()-style scroll-driven animation. But here, we'll build indicators for each section of a page using the view() style.",
  "link": "/blog.master.dev/using-css-scroll-driven-animations-for-section-based-scroll-progress-indicators.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fallbacks for CSS `progress()`",
  "desc": "The new CSS progress() function calculates a value between 0 and 1, representing its position within a defined range. While awaiting broader browser support, users can manually implement this using other methods.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/fallbacks-for-css-progress.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
