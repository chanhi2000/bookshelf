---
lang: en-US
title: "The Different Ways to Select <html> in CSS"
description: "Article(s) > The Different Ways to Select <html> in CSS"
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
      content: "Article(s) > The Different Ways to Select <html> in CSS"
    - property: og:description
      content: "The Different Ways to Select <html> in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-different-ways-to-select-html-in-css.html
prev: /programming/css/articles/README.md
date: 2026-03-05
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/02/css-block-html.png
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
  name="The Different Ways to Select <html> in CSS"
  desc="Sure, we can select the <html> element in CSS with, you know, a simple element selector, html. But what other (trivial and perhaps useless) ways can we do it?"
  url="https://css-tricks.com/the-different-ways-to-select-html-in-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/02/css-block-html.png"/>

[**Temani Afif recently did this exercise**](/css-tip.com/root-selectors.md) and I thought I’d build off of it. Some of these are useful. Many of them are not. There’s a bird at the end!

---

## `html`

```css
html {
  /* I mean, duh */
}
```

---

## `:root`

```css
:root {
  /* Sarsaparilla, anyone? */
}
```

`:root` is a CSS pseudo-class that matches the root element of the current (XML) document. If the current document is a HTML document, then it matches `<html>`. The XML documents that you’ll most likely encounter as a web developer (besides HTML) are:

- SVG documents: `:root` matches `<svg>`
- RSS documents: `:root` matches `<rss>`
- Atom documents: `:root` matches `<feed>`
- MathML documents: `:root` matches `<math>`
- Other XML documents: `:root` matches the outermost element (e.g., `<note>`)

But what’s the practicality of `:root`? Well, the specificity of pseudo-classes (0-1-0) is higher than that of elements (0-0-1), so you’re less likely to run into conflicts with `:root`.

It’s conventional to declare global custom properties on `:root`, but I actually prefer `:scope` because it semantically matches the global scope. In practice though, it makes no difference.

```css
/* Global variables */
:root { --color: black; }
:scope { --color: black; }
```

Let’s talk about `:scope` some more…

---

## `:scope` or `&`

```css
:scope {
  /* Insert scope creep here */
}
```

Okay, that’s not *really* what `:scope` is for.

As I mentioned, `:scope` matches the *global* scope root (`<html>`). However, this is only true when not used within the newly baseline [**`@scope`**](/css-tricks.com/almanac-rules/scope.md) at-rule, which is used to define a *custom* scope root.

We can also do this:

```css
& {
  /* And...? */
}
```

Normally, the `&` selector is used with CSS nesting to concatenate the current selector to the containing selector, enabling us to nest selectors even when we aren’t technically dealing with nested selectors. For example:

```css :collapsed-lines
element:hover {
  /* This */
}

element {
  &:hover {
    /* Becomes this (notice the &) */
  }
}

element {
  :hover {
    /* Because this (with no &) */
  }
}

element :hover {
  /* Means this (notice the space before :hover) */
}

element {
  :hover & {
    /* Means :hover element, but I digress */
  }
}
```

When `&` isn’t nested, it simply selects the scope root, which outside of an `@scope` block is `<html>`. Who knew?

---

## `‌:has(head)` or `:has(body)`

```css
:has(head) {
  /* Nice! */
}

:has(body) {
  /* Even better! */
}
```

`<html>` elements should only contain a `<head>` and `<body>` (à la Anakin Skywalker) as direct children. Any other markup inserted here is invalid, although parsers will typically move it into the `<head>` or `<body>` anyway. More importantly, no other element is allowed to contain `<head>` or `<body>`, so when we say `:has(head)` or `:has(body)`, this can only refer to the `<html>` element, unless you mistakenly insert `<head>` or `<body>` inside of `<head>` or `<body>`. But why would you? That’s just nasty.

Is `:has(head)` or `:has(body)` practical? No. But I *am* going to plug [**`:has()`**](/css-tricks.com/almanac-pseudo-selectors/has.md), and you also learned about the illegal things that you shouldn’t do to HTML bodies.

---

## `:not(* *)`

```css
:not(* *) {
  /* (* *) are my starry eyes looking at CSS <3 */
}
```

Any element that’s contained by another element (`* *`)? Yeah, `:not()` that. The only element that’s not contained by another element is the `<html>` element. `*`, by the way, is called the [**universal selector**](/css-tricks.com/almanac-selectors/universal.md).

And if you throw a [**child combinator**](/css-tricks.com/almanac-selectors/child.md) right in the middle of them, you get a cute bird:

```css
:not(* > *) {
  /* Chirp, chirp */
}
```

“Siri, file this under *Completely Useless.*” (Ironically, Siri did no such thing).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Different Ways to Select <html> in CSS",
  "desc": "Sure, we can select the <html> element in CSS with, you know, a simple element selector, html. But what other (trivial and perhaps useless) ways can we do it?",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-different-ways-to-select-html-in-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
