---
lang: en-US
title: "Typographic Scales in CSS with :heading(), sibling-index(), and pow()"
description: "Article(s) > Typographic Scales in CSS with :heading(), sibling-index(), and pow()"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - alwaystwisted.com
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Typographic Scales in CSS with :heading(), sibling-index(), and pow()"
    - property: og:description
      content: "Typographic Scales in CSS with :heading(), sibling-index(), and pow()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/alwaystwisted.com/building-typographic-scales-with-headings-sibling-index-and-pow.html
prev: /academics/system-design/articles/README.md
date: 2026-02-17
isOriginal: false
author:
  - name: Stuart Robson
    url: https://alwaystwisted.com/about/
cover: https://alwaystwisted.com/images/articles/meta-images/CSS-heading-2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Typographic Scales in CSS with :heading(), sibling-index(), and pow()"
  desc="Learn how to build flexible, mathematical typographic scales using :heading(), sibling-index(), and pow() for cleaner CSS design systems."
  url="https://alwaystwisted.com/articles/building-typographic-scales-with-headings-sibling-index-and-pow.html"
  logo="https://alwaystwisted.com/images/favicons/apple-touch-icon.png"
  preview="https://alwaystwisted.com/images/articles/meta-images/CSS-heading-2.png"/>

In [**my previous article**](/alwaystwisted.com/styling-with-the-heading-pseudo-class.md), I introduced the [<VPIcon icon="fa-brands fa-firefox"/>`:heading` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:heading) and showed how it can simplify styling all headings in groups, or all at once. Today, I want to take that much further and show how combining `:heading()` with two other CSS features—`sibling-index()` and `pow()` lets us build flexible, maintainable typographic scales with just a few lines of code.

::: important Important limitation

`sibling-index()` counts *siblings*, not heading levels. That means the scale only lines up if you have a clean, ordered run of `h1` → `h6`. If you repeat a heading level (for example: `h1`, `h2`, `h3`, `h3`), the second `h3` will be sized like `h4` because its sibling index is higher. Keep that in mind if you use this pattern in real layouts.

:::

There’s still a lot to like here, but the ordering limitation matters in real content.

If you want the version that works regardless of heading order, skip to [What Works in Real Layouts](#what-works-in-real-layouts).

---

## The Problem with Traditional Typographic Scales

When you implement a typographic scale in CSS today, you may end up with something like this.

```css
h1 {
  font-size: 3.052rem;
}
h2 {
  font-size: 2.441rem;
}
h3 {
  font-size: 1.953rem;
}
h4 {
  font-size: 1.563rem;
}
h5 {
  font-size: 1.25rem;
}
h6 {
  font-size: 1rem;
}
```

This works, but it's repetitive.

Separate declarations for what's essentially a mathematical pattern. It may be inflexible too. Want to try a different ratio? You'll need to recalculate all the values manually, which could be error prone when dealing with exponential calculations. The relationship between values isn't expressed in the code itself, which could make it harder to understand and maintain.

What we really want is to define the pattern once and let CSS calculate the individual values for us.

---

## Understanding Typographic Scales

Typographic scales use ratios (mostly) borrowed from musical intervals. These ratios create "harmonious" proportions because they're based on the same mathematical relationships that make good music feel right.

Common scales:

- Minor Third (1.200) - Subtle
- Major Third (1.250) - Balanced
- Perfect Fourth (1.333) - Slightly more dramatic
- Perfect Fifth (1.500) - Bold
- Golden Ratio (1.618) - Not a musical interval, but commonly used

These scales are exponential, not linear. Each heading level multiplies the previous level by the ratio, rather than adding to it.

::: info Exponential vs Linear

With a linear scale, each step adds the same fixed amount. With an exponential scale, each step multiplies by the ratio—so you get bigger jumps between larger sizes. That's why h1 is so much bigger than h2, which is bigger than h3, and so on, and so on, and so on.

:::

Here's what that exponential growth looks like across heading levels with a Major Third scale (1.25):

```plaintext
h6: 1rem × 1.25⁰ = 1rem
h5: 1rem × 1.25¹ = 1.25rem
h4: 1rem × 1.25² = 1.563rem
h3: 1rem × 1.25³ = 1.953rem
h2: 1rem × 1.25⁴ = 2.441rem
h1: 1rem × 1.25⁵ = 3.052rem
```

The pattern, base-size × ratio ^ exponent.

This is where `pow()` comes in.

---

## Enter `pow()`: Exponentiation in CSS

The [<VPIcon icon="fa-brands fa-firefox"/>`pow()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/pow) is part of [<VPIcon icon="iconfont icon-w3c"/>CSS Values and Units Level 4](https://w3.org/TR/css-values-4/). It calculates a number raised to a power ([<VPIcon icon="fa-brands fa-wikipedia-w"/>exponentiation](https://en.wikipedia.org/wiki/Exponentiation)) in CSS.

```css
pow(base, exponent)
```

For example:

- `pow(2, 3) = 2³ = 8`
- `pow(1.25, 4) = 1.25⁴ = 2.441`

This is exactly what we need to help calculate typographic scales. Instead of manually computing 1.25 × 1.25 × 1.25 × 1.25, we can write `pow(1.25, 4)`.

---

## The Missing Piece: sibling-index()

Here's how it works in the ideal case. The [<VPIcon icon="fa-brands fa-firefox"/>`sibling-index()` function](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/sibling-index) returns the position of an element among its siblings, starting from 1 (it works with any elements, not just `:heading`).

In a typical demo where `h1` through `h6` are siblings in order, that index lines up with the heading level:

- h1 has `sibling-index() = 1`
- h2 has `sibling-index() = 2`
- h3 has `sibling-index() = 3`
- And so on...

This means we can use `sibling-index()` to calculate the size dynamically for each heading level.

---

## Putting It All Together

Here's the full pattern in action:

```css
:root {
  --font-size-base: 1rem;
  --scale-major-third: 1.25;
  --typographic-scale: var(--scale-major-third);
}

:heading {
  font-size: calc(
    var(--font-size-base) * pow(var(--typographic-scale), 6 - sibling-index())
  );
}
```

That's it. Three custom properties and one font-size rule.

Let's break down what's happening. First, `6 - sibling-index()` calculates the exponent for each heading. For h1 (index 1) it becomes `6 - 1 = 5`, for h2 it becomes `6 - 2 = 4`, and for h6 it becomes `6 - 6 = 0`.

Next, `pow(var(--typographic-scale), ...)` raises the scale ratio to that exponent. With a 1.25 ratio, h1 becomes `pow(1.25, 5) = 3.052`, h2 becomes `pow(1.25, 4) = 2.441`, and h6 becomes `pow(1.25, 0) = 1`.

Finally, `var(--font-size-base) * ...` multiplies that result by the base size so the whole scale can move up or down together.

The result is that h1 is the largest, h6 is the base size, and everything in between follows the exponential scale perfectly.

If you want a one-line mental model, it's this: **font-size = base-size x ratio^(6 - sibling-index())**. With a Perfect Fourth scale (1.333), that gives you a range from h1 at 4.209rem down to h6 at 1rem, with each heading level stepping down by the same ratio.

---

## Building a Complete Scale System

Let's expand this into a practical system with multiple scale options:

```css
:root {
  /* Scale ratios based on musical intervals */
  --scale-minor-second: 1.067;
  --scale-major-second: 1.125;
  --scale-minor-third: 1.2;
  --scale-major-third: 1.25;
  --scale-perfect-fourth: 1.333;
  --scale-augmented-fourth: 1.414;
  --scale-perfect-fifth: 1.5;
  --scale-golden-ratio: 1.618;

  /* Active scale - change this to switch globally */
  --typographic-scale: var(--scale-major-third);

  /* Base size and max level for clarity */
  --heading-base-size: 1rem;
  --heading-max-level: 6;
}

:heading {
  font-size: calc(
    var(--heading-base-size) *
      pow(var(--typographic-scale), var(--heading-max-level) - sibling-index())
  );
}
```

Now you can experiment with different scales by changing a single variable. Want to try a Perfect Fourth scale? Just update `--typographic-scale`:

```css
:root {
  --typographic-scale: var(--scale-perfect-fourth);
}
```

Every heading on your site instantly updates to the new scale.

You can also nudge the overall size up or down by adjusting `--heading-base-size`.

---

## Responsive Typography

Several years ago I attended an amazing workshop from [<VPIcon icon="fas fa-globe"/>Rich](https://clagnut.com) on responsive web typography, and one thing stuck with me. You don't have to use the same scale across all devices. Narrow viewports can use a tighter scale, while larger viewports can breathe a little more. Using the system we've created, we can adjust the scale based on viewport size.

```css
:root {
  --typographic-scale: var(--scale-minor-third);
}

/* Smaller scale on mobile to prevent oversized headings */
@media (width >= 768px) {
  :root {
    --typographic-scale: var(--scale-major-third);
  }
}

/* Larger scale on big screens where you have more space */
@media (width >= 1400px) {
  :root {
    --typographic-scale: var(--scale-perfect-fourth);
  }
}
```

---

## Practical Example: A Complete Design System

Here's how you might structure this in a real design system:

```css :collapsed-lines
:root {
  /* Color tokens */
  --color-heading: #2c3e50;
  --color-heading-secondary: #546e7a;

  /* Typography scales */
  --scale-minor-third: 1.2;
  --scale-major-third: 1.25;
  --scale-perfect-fourth: 1.333;
  --scale-augmented-fourth: 1.414;
  --scale-perfect-fifth: 1.5;
  --scale-golden-ratio: 1.618;

  /* Active scale */
  --typographic-scale: var(--scale-minor-third);

  /* Base values */
  --heading-base-size: 0.9375rem;
  --heading-max-level: 6;
  --heading-font-weight: 600;
  --heading-font-weight--strong: 700;
  --heading-line-height: 1.2;
  --heading-letter-spacing: -0.02em;
  --heading-letter-spacing--tight: -0.03em;
  --heading-letter-spacing--loose: -0.01em;
  --heading-letter-spacing--caps: 0.05em;

  /* Spacing */
  --spacing-heading-block: 1.5rem 0.5rem;
}

/* Base heading styles */
:heading {
  font-size: calc(
    var(--heading-base-size) *
      pow(var(--typographic-scale), var(--heading-max-level) - sibling-index())
  );
  font-family: var(--font-family-heading, 'Georgia', serif);
  font-weight: var(--heading-font-weight);
  line-height: var(--heading-line-height);
  letter-spacing: var(--heading-letter-spacing);
  color: var(--color-heading);
  margin-block: var(--spacing-heading-block);
  word-wrap: break-word;
}

/* Tiered weights */
:heading(1, 2, 3) {
  --heading-font-weight: var(--heading-font-weight--strong);
  --heading-letter-spacing: var(--heading-letter-spacing--tight);
}

:heading(4, 5, 6) {
  --heading-font-weight: var(--heading-font-weight);
  --heading-letter-spacing: var(--heading-letter-spacing--loose);
  color: var(--color-heading-secondary);
}

/* Special case for h6 */
:heading(6) {
  text-transform: uppercase;
  --heading-letter-spacing: var(--heading-letter-spacing--caps);
}

/* Responsive adjustments */
@media (width >= 768px) {
  :root {
    --typographic-scale: var(--scale-major-third);
    --heading-base-size: 1rem;
  }
}

@media (width >= 1400px) {
  :root {
    --typographic-scale: var(--scale-perfect-fourth);
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-heading: #ecf0f1;
    --color-heading-secondary: #bdc3c7;
  }
}
```

::: note

This follows Mike's [**cascading custom property strategy**](/smashingmagazine.com/css-custom-properties-strategy-guide.md), so css custom properties can be overridden contextually without duplicating rules.

:::

This gives you a complete, flexible, maintainable heading system. It keeps mathematical precision for sizing, adapts to different contexts, responds to viewport size, supports theming, and can be updated globally with a single variable change.

---

## What Works in Real Layouts

If you want the scale to work even when headings repeat or skip levels, you can assign the level explicitly and keep the maths intact. This removes the dependency on sibling order.

```css :collapsed-lines
:root {
  --heading-base-size: 1rem;
  --typographic-scale: 1.25; /* Major Third */
}

:heading {
  font-size: calc(
    var(--heading-base-size) *
      pow(var(--typographic-scale), var(--heading-level))
  );
}

:heading(1) {
  --heading-level: 5;
}
:heading(2) {
  --heading-level: 4;
}
:heading(3) {
  --heading-level: 3;
}
:heading(4) {
  --heading-level: 2;
}
:heading(5) {
  --heading-level: 1;
}
:heading(6) {
  --heading-level: 0;
}
```

It’s a few more lines, but it behaves correctly no matter how your headings are ordered in the markup.

<CodePen
  user="sturobson"
  slug-hash="KwMLKLg"
  title="Typographic Scales with :heading(), pow, and sibling-index()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Why This Matters

This approach nudges how we think about CSS. Instead of declaring individual values, we're defining systems and letting CSS calculate the details.

Values update based on context, viewport, and user preferences. The mathematical relationship is expressed once and applied everywhere. Want to try a different scale? Change one variable. Want to adjust all heading sizes? Change the base size. The relationships remain consistent.

---

## Browser Support and Testing

Safari Technology Preview is currently the only browser that supports all three features used here.

If you want to track progress or add support signals, here are the two issues to star or follow:

```component VPCard
{
  "title": "[css-selectors-5] Implement :heading() selector [438147580] - Chromium",
  "desc": "",
  "link": "https://issues.chromium.org/issues/438147580/",
  "logo": "https://gstatic.com/chrome-tracker/img/chromium.svg",
  "background": "rgba(26,115,232,0.2)"
}
```

```component VPCard
{
  "title": "1953973 - [css-values] Add sibling-count() and sibling-index()",
  "desc": "NEW (nobody) in Core - CSS Parsing and Computation. Last updated 2026-02-27.",
  "link": "https://bugzilla.mozilla.org/show_bug.cgi?id=1953973/",
  "logo": "https://bugzilla.mozilla.org/extensions/BMO/web/images/favicon.svg",
  "background": "rgba(27,106,184,0.2)"
}
```

```component VPCard
{
  "title": "296994 – Implement :heading and :heading()",
  "desc": "",
  "link": "https://bugs.webkit.org/show_bug.cgi?id=296994/",
  "logo": "https://bugs.webkit.org/images/favicon.ico",
  "background": "rgba(102,187,255,0.2)"
}
```

---

## Wrapping Up

The combination of `:heading()`, `sibling-index()`, and `pow()` can transform typographic scales from a tedious process into an elegant, mathematical system.

You define the rules once, and CSS handles the calculations.

This is more than a convenience feature.

It's a glimpse into a future where we can express design systems as mathematical relationships rather than exhaustive declarations. The code becomes more maintainable and more flexible.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Typographic Scales in CSS with :heading(), sibling-index(), and pow()",
  "desc": "Learn how to build flexible, mathematical typographic scales using :heading(), sibling-index(), and pow() for cleaner CSS design systems.",
  "link": "https://chanhi2000.github.io/bookshelf/alwaystwisted.com/building-typographic-scales-with-headings-sibling-index-and-pow.html",
  "logo": "https://alwaystwisted.com/images/favicons/apple-touch-icon.png",
  "background": "rgba(255,117,0,0.2)"
}
```
