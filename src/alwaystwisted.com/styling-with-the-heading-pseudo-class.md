---
lang: en-US
title: "Style Headings using the CSS :heading pseudo-class"
description: "Article(s) > Style Headings using the CSS :heading pseudo-class"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - alwaystwisted.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Style Headings using the CSS :heading pseudo-class"
    - property: og:description
      content: "Style Headings using the CSS :heading pseudo-class"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/alwaystwisted.com/styling-with-the-heading-pseudo-class.html
prev: /programming/css/articles/README.md
date: 2026-02-16
isOriginal: false
author:
  - name: Stuart Robson
    url: https://alwaystwisted.com/about/
cover: https://alwaystwisted.com/images/articles/meta-images/CSS-heading-1.png
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
  name="Style Headings using the CSS :heading pseudo-class"
  desc="Use the :heading pseudo-class to style all headings (h1-h6) with a single CSS rule. Reduce repetition in design systems and component libraries while maintaining consistency."
  url="https://alwaystwisted.com/articles/styling-with-the-heading-pseudo-class.html"
  logo="https://alwaystwisted.com/images/favicons/apple-touch-icon.png"
  preview="https://alwaystwisted.com/images/articles/meta-images/CSS-heading-1.png"/>

The `:heading` pseudo-class lets us target all heading elements (`h1` through `h6`) with a single CSS rule, rather than writing out a verbose selector group every time we need to.

It's a small change, but it represents a shift toward better, more intentional and 'semantic' CSS.

---

## The Current Approach

Before `:heading`, whenever we wanted to apply the same styles to some or all headings, we had to list every heading element:

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Georgia', serif;
  color: #333;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
```

This works perfectly fine, but it's kinda verbose, especially if we're resetting some rules for specific headings. And if we're working with a large codebase or two, we might find ourselves repeating this pattern across multiple files.

It's not exactly a disaster, but it feels a bit untidy.

---

## Enter `:heading`

The `:heading` pseudo-class solves this with a cleaner, more semantic syntax:

```css
:heading {
  font-family: 'Georgia', serif;
  color: #333;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
```

This is much nicer, it clearly reads "for all heading elements, apply these styles.". The intent should be immediately obvious. Here's what that looks like in action:

<CodePen
  user="sturobson"
  slug-hash="MYexYJq"
  title="Style Headings Using The CSS :heading pseudo-selector Example"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Targeting Specific Heading Levels

While `:heading` lets us target all headings at once, we often want to apply different styles to different heading levels. The `:heading()` functional notation lets us do this by grouping heading levels together:

```css
/* Major headings - larger and bolder */
:heading(1, 2, 3) {
  font-weight: 700;
  letter-spacing: -0.02em;
  font-size: 2rem;
}

/* Secondary headings - smaller and lighter */
:heading(4, 5, 6) {
  font-weight: 600;
  letter-spacing: -0.01em;
  font-size: 1.25rem;
}
```

This approach of grouping headings into "tiers" within the design system lets us apply different styling rules without listing out each individual heading element (h1, h2, h3, etc.).

As a working principle, use `:heading` for properties that should be universal (font-family, line-height), and `:heading()` when different levels genuinely need different treatments (font-size, font-weight).

### Specificity Considerations

One little thing to keep in mind: `:heading` has a specificity that's the same as a class selector (`0-1-0`).

Compare this to the old multi-selector approach:

- `:heading` = `0-1-0`
- `h1, h2, h3, h4, h5, h6` = `0-0-1`

This means that `:heading` should override styles on individual heading elements if both are present. This is usually what we want, but it's worth noting this for when we're debugging cascade issues.

---

## Some Possible Use Cases

### Consistent Typography

The most straightforward use case is ensuring all headings follow the same typographic rules:

```css
:heading {
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  word-wrap: break-word;
}
```

This keeps our heading hierarchy consistent without having to repeat ourselves. Line height, letter spacing, and font weight are the kinds of properties that should be uniform across all heading levels, and `:heading` lets us set them once.

### Component-Specific Heading Styles

In component systems, the same heading level (say, an h3) might need different treatments depending on where it lives. With `:heading`, we set base styles once, then customise per-component:

```css
/* Base heading styles that apply everywhere */
:heading {
  font-family: var(--font-family-heading);
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-heading);
}

/* In a card, headings get a bottom border and different color */
.card :heading {
  border-bottom: 2px solid var(--color-primary);
  color: var(--color-card-heading);
  padding-bottom: 0.5rem;
}

/* In a sidebar, headings are smaller and uppercase */
.sidebar :heading {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* In modals, headings get extra spacing */
.modal :heading {
  margin-bottom: 1.5rem;
}
```

Without `:heading`, we'd define the base font, weight, and line-height separately for each component selector. With `:heading`, we define them once and let components add only the differences they need.

### Font Family and Weight Enforcement Across Components

In a component system, a title in a Card, a heading in a Modal, and a subtitle in a Hero section could all share the same foundational typography—same font family, same font weight, same line height, but they just differ in font size.

With `:heading`, this is easy:

```css
/* All headings across the entire system */
:heading {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  line-height: 1.2;
}

/* Each component only customises what's unique to it */
.card :heading {
  font-size: 1.25rem;
}

.modal :heading {
  font-size: 1.5rem;
}

.hero :heading {
  font-size: 2.5rem;
}
```

Without `:heading`, we'd have to repeat the font-family, font-weight, and line-height in every component:

```css :collapsed-lines
/* Without :heading - repetitive and fragile */
.card h1,
.card h2,
.card h3,
.card h4,
.card h5,
.card h6 {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  line-height: 1.2;
}

.card h1 {
  font-size: 1.25rem;
}
.card h2 {
  font-size: 1.1rem;
}
/* ... and repeat for modal, hero, etc. */

.modal h1,
.modal h2,
.modal h3,
.modal h4,
.modal h5,
.modal h6 {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  line-height: 1.2;
}

.modal h1 {
  font-size: 1.5rem;
}
/* ... and again for hero ... */
```

---

## Composing :heading With Other Selectors

Beyond component-specific styles, `:heading` works well with other CSS patterns:

```css
/* Variant modifiers - useful for design system components */
:heading.error {
  color: var(--color-error);
}

:heading.success {
  color: var(--color-success);
}

/* Sibling combinator - manage spacing between consecutive headings */
:heading + :heading {
  margin-top: 0.5rem;
}

/* Headings inside interactive elements */
button :heading,
a :heading {
  font-size: inherit;
  margin: 0;
}
```

These patterns avoid repeating the same rule for h1, h2, h3, etc. in each context. This composability is what makes `:heading` so valuable in larger systems.

---

## Browser Support and Testing

The `:heading` pseudo-class is currently available in nightly builds only. You can test it now in:

- Firefox Nightly (behind a flag)
- Safari Technology Preview

If you want to see this in Chrome you can [<VPIcon icon="fa-brands fa-chrome"/>star this issue](https://issues.chromium.org/issues/438147580)

::: note

The more developers who test `:heading` in nightly builds and advocate for the feature, the faster it's likely to be prioritised for stable release. Browser vendors pay attention to developer adoption and demand.

:::

---

## A Cleaner Design System

If we're building a design system or component library, `:heading` can be particularly useful.

We can define base heading styles once and know they'll apply everywhere:

```css
/* Base heading styles with defaults */
:heading {
  font-family: var(--font-family-heading);
  font-weight: var(--heading-font-weight, 600);
  line-height: var(--heading-line-height, 1.2);
  color: var(--color-heading);
  margin-block: var(--spacing-heading-block);
  font-size: var(--heading-font-size, 1rem);
}

/* Heading-specific variations using custom property overrides */
h1 {
  --heading-font-size: var(--font-size-h1);
}

h2 {
  --heading-font-size: var(--font-size-h2);
}

/* And so on... */
```

::: info

This approach follows [**Mike Riethmuller's strategy**](/smashingmagazine.com/css-custom-properties-strategy-guide.md) of using CSS custom properties to create overrideable defaults. Set custom properties that cascade naturally and get picked up by the base `:heading` rule, and we'll reduce repetition while making it easier to customise individual heading levels.

:::

---

## Wrapping Up

The `:heading` pseudo-class is a small but lovely addition to CSS that will make styling headings feel less repetitive.

Combined with CSS custom properties, it can become even more powerful, letting us manage heading styles consistently across entire design systems with minimal code.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Style Headings using the CSS :heading pseudo-class",
  "desc": "Use the :heading pseudo-class to style all headings (h1-h6) with a single CSS rule. Reduce repetition in design systems and component libraries while maintaining consistency.",
  "link": "https://chanhi2000.github.io/bookshelf/alwaystwisted.com/styling-with-the-heading-pseudo-class.html",
  "logo": "https://alwaystwisted.com/images/favicons/apple-touch-icon.png",
  "background": "rgba(255,117,0,0.2)"
}
```
