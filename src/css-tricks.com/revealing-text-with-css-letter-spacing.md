---
lang: en-US
title: "Revealing Text With CSS letter-spacing"
description: "Article(s) > Revealing Text With CSS letter-spacing"
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
      content: "Article(s) > Revealing Text With CSS letter-spacing"
    - property: og:description
      content: "Revealing Text With CSS letter-spacing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/revealing-text-with-css-letter-spacing.html
prev: /programming/css/articles/README.md
date: 2026-05-27
isOriginal: false
author:
  - name: Preethi
    url: https://css-tricks.com/author/preethi/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/revealing-text.webp
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
  name="Revealing Text With CSS letter-spacing"
  desc="Until we get something like ::nth-letter, there are still some really cool text effects we can make from existing CSS features, like letter-spacing, ::first-word and ::first-line."
  url="https://css-tricks.com/revealing-text-with-css-letter-spacing"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/04/revealing-text.webp"/>

Some text effects are relatively hard to pull in CSS, the main reason being [**we**](/css-tricks.com/spiral-scrollytelling-in-css-with-sibling-index.md) [**are unable to target individual characters**](/css-tricks.com/spiral-scrollytelling-in-css-with-sibling-index.md) (something many of us want [**in the form of `::nth-letter()`**](/css-tricks.com/using-nonexistent-nth-letter-selector-now.md), although we have basis for it with [**`::first-letter`**](/css-tricks.com/almanac-pseudo-selectors/first-letter.md) that gives us access to a box element’s first glyph.)

But maybe there are a few things we can use today with what we already have.

For example, the CSS [**`letter-spacing`**](/css-tricks.com/almanac-properties/letter-spacing.md) property adjusts the space between all characters in a block of text. **Positive values add space** to the right side of each glyph (in a left-to-right writing mode), and **negative values shrink the width of the glyph box**, causing letters to overlap and even move the other way.

<CodePen
  user="anon"
  slug-hash="MYjZxOd"
  title="letter-spacing"
  :default-tab="['css','result']"
  :theme="dark"/>

The `letter-spacing` accepts length units, and percentage (relative to font size). It is animateable, and as we saw before, the negative values can shrink it down or reverse it. Which is something we can make use of.

---

## Overlapping and separating letters

It’s quite easy to completely overlap the characters as a starting point and setting it’s `color` to `transparent` to visually hide it.

```css
label {
  letter-spacing: -1ch;
  color: transparent;
  /* etc. */
}
```

From there, we can reveal the text by animating that `letter-spacing` value to a positive value and updating the `color` to a visible value, like when a checkbox is `:checked`:

```css
li:nth-of-type(2) label {
  text-align: center;
}
li:nth-of-type(3) label {
  text-align: right;
}
input:checked + label {
  letter-spacing: 0ch;
  color: black;
  transition: letter-spacing 0.6s, color 0.4s;
}
```

<CodePen
  user="anon"
  slug-hash="YPGdgeQ"
  title="letter-spacing w/ text alignments"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

The CSS `ch` unit is a [**relative length**](/css-tricks.com/css-length-units.md##relative-units) representing the width of the zero (0) glyph.

:::

The labels go from negative `letter-spacing` to normal spacing and the `color` updates to `black`. Both these changes happen over a `transition`.

The second and third labels are given center and right text alignments and thus when negative letter spacing is applied they bundle up at the given alignment position, center and right, respectively. When `letter``-``spacing` goes from negative to zero (or any positive value) the letters separate from that same alignment position.

Thus, we get a text reveal effect! Let’s look at some more.

---

## Showing and hiding text

Check this out. We can toggle a checkbox label as a fun interactive UI touch:

<CodePen
  user="anon"
  slug-hash="GgjPexy"
  title="Text reveal with letter-spacing 2"
  :default-tab="['css','result']"
  :theme="dark"/>

```html
<!-- Simplified for brevity; additional accessibility considerations -->
<input type="checkbox" id="cb">
<label for="cb">
  <span>Join the global club</span>
  <span>You've begun your journey!</span>
</label>
```

```css :collapsed-lines
label {
  overflow: clip;
  /* etc. */
}

span {
  /* The first label */
  &:nth-of-type(1) {
    /* Default spacing: letters are fully visible */
    letter-spacing: 0ch;
    /* When the checkbox is checked, target this text */
    :checked + * & {
      /* collapse letters on top of each other, hiding them */
      letter-spacing: -2ch;
      text-indent: -1.5ch;
      /* Use a "bouncy" cubic-bezier for spacing */
      transition: 0.4s letter-spacing cubic-bezier(.8, -.5, .2, 1.4), 
                  0.1s text-indent;
    }
  }
  
  /* The second label */
  &:nth-of-type(2) { 
    /* Initially collapsed (letters overlap) */
    letter-spacing: -1ch;
    color: transparent;
    /* When the checkbox is checked, target this text */
    :checked + * & {
      /* Returns to normal spacing */
      letter-spacing: 0ch;
      color: black;
      /* Slightly delay the appearance so it starts after the first text begins to hide */
      transition:
        0.4s letter-spacing cubic-bezier(.8, -.5, .2, 1.4) 0.3s, 
        0.8s color 0.4s;
    }
  }
}
```

When the box is checked, a negative `letter-spacing` value (`-2ch`) and `text-indent` value (`-1.5ch`) is used on the first `<span>` to slide it out of the container box. We use `overflow: clip` to completely hide the text.

Concurrently, the text in the second `<span>` text goes from a `letter-spacing` value of `-1ch` to `0ch`, which reveals it. To hide this overlapped text at `-1ch`, a `transparent` color was given that’s turned to `black` when the checkbox is checked.

---

## Using with other glyph box styling

Here’s another fun one. We can start with an acronym that reveal the full text on hover. Again, we have existing features to help us pull this off, including `::first-letter` and [**`::first-line`**](/css-tricks.com/almanac-pseudo-selectors/first-line.md).

We’ll start with this markup:

```html
<!-- Simplified for brevity -->
<p id="acronym">
  <span class="words">United</span>
  <span class="words">Nations</span>
  <span class="words">International</span>
  <span class="words">Children's</span>
  <span class="words">Emergency</span>
  <span class="words">Fund</span>
</p>
```

```css
.words {
  letter-spacing: -1ch;
  color: transparent;
  /* etc. */

  &::first-letter {
    color: black;
  }

  figure:hover + #acronym & {
    letter-spacing: 0ch;
    color: black;
    transition: letter-spacing 0.4s cubic-bezier(.8, -.5, .2, 1.4) /* etc. */;
  }
}
```

Each word in the UNICEF acronym initially has `letter-spacing: -1ch` to shrink the text, and `color: transparent` to keep the shrunk text hidden, except the `::first-letter` that has `color: black` so it remains visible even though the rest of the text is stacked beneath it.

Now, we can target the image on `:hover` and select the entire text so that the `letter-spacing` value for each word decreases to `0ch` and `color: black` is applied, showing what’s remaining of the words:

<CodePen
  user="anon"
  slug-hash="EagpvPr"
  title="Text reveal with letter-spacing 1"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## What else can we do?

I don’t know! But that’s where you come in. Obviously, a hypothetical `::nth-letter` selector would be amazing for all kinds of text effects. But it’s neat that we can create some semblance of it today with existing features, like `letter-spacing`, `::first-letter`, and `::first-line`.

What can you cook up knowing we have these constraints?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Revealing Text With CSS letter-spacing",
  "desc": "Until we get something like ::nth-letter, there are still some really cool text effects we can make from existing CSS features, like letter-spacing, ::first-word and ::first-line.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/revealing-text-with-css-letter-spacing.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
