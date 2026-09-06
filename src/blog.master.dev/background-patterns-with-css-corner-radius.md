---
lang: en-US
title: "Background Patterns with CSS `corner-radius`"
description: "Article(s) > Background Patterns with CSS `corner-radius`"
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
      content: "Article(s) > Background Patterns with CSS `corner-radius`"
    - property: og:description
      content: "Background Patterns with CSS `corner-radius`"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/background-patterns-with-css-corner-radius.html
prev: /programming/css/articles/README.md
date: 2026-02-09
isOriginal: false
author:
  - name: Preethi Sam
    url: https://blog.master.dev/author/preethisam/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8505
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
  name="Background Patterns with CSS `corner-radius`"
  desc="You might need to know this someday: you can style a div, put the div into SVG, then put the SVG in to CSS and use it as a repeating background."
  url="https://blog.master.dev/background-patterns-with-css-corner-radius/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8505"/>

The `corner-shape` property in CSS can do some neat designs. [**Things like vintage tickets, with corners trimmed inwards**](/blog.master.dev/drawing-css-shapes-using-corner-shape.md), [<VPIcon icon="fas fa-globe"/>sci-fi corners](https://daverupert.com/2025/07/sci-fi-rectangles-with-corner-shape/), tags, and those types of designs are usually comes to mind when we think of the CSS property `corner-shape`.

There are a variety of nice primitive keywords we get with `corner-shape`, like `round` (the default), `bevel`, `scoop`, `squircle`, and [**the all-powerful `superellipse()`**](/blog.master.dev/understanding-css-corner-shape-and-the-power-of-the-superellipse.md). It’s actually quite easy to create interesting shapes that can be used for more than corner decorations.

Think patterned backgrounds.

![A grid of various decorative patterns featuring red shapes on a white background, including stars, crosses, and curved designs.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/mgdkr_7X.png?resize=1024%2C522&ssl=1)

::: note

When `corner-shape` isn’t supported by a browser, we can either keep or remove the default rounded corners set by the accompanying `border-radius`.

We can do that with CSS’ `@supports` statements like:

```css
@supports not (corner-shape: notch) {
  /* do something else instead */
}
```

:::

---

## The `corner-shape` Property

While `border-radius` determines the size of the corner, `corner-shape` specifies its form. Both are needed to get the style. Just as `border-radius`, `corner-shape` affects the borders and shadows of an element.

It is a shorthand for `corner-top-left-shape`, `corner-top-right-shape`, `corner-bottom-left-shape`, and `corner-bottom-right-shape`.

---

## Embedding into a Background

Here’s the trick!

We can make HTML elements into a `background` by embedding it through SVG as a data URL. Like this:

```css
.element-with-the-background {
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">Styled HTML</div></foreignObject></svg>'
}
```

The unwrapped SVG part of the URL:

```xml
<svg xmlns="http://www.w3.org">
  <foreignObject width="100%" height="100%">
    <div xmlns="http://www.w3.org/1999/xhtml">Styled HTML</div>
  </foreignObject>
</svg>
```

The trick is to style an element into a desired shape using `corner-shape` and add that markup to a background’s data URL.

---

## The Shapes

Say we want to make a pattern based on a `<div>` that has these styles on it:

```css
background: red;
width: 30px;
aspect-ratio: 1;
border-radius: 30%;
corner-shape: superellipse(-3);
```

To reduce code length in the URL, we’ll put all those styles as inline styles right onto the `<div>` we’re going to embed into the SVG:

```html
<div style='background:red;width:30px;height:30px;corner-shape:superellipse(-3);border-radius:30%;'></div>
```

All corners get the `superellipse(-3)` style (similar to the scoop design) that are sized by the given border radius of `30%`.

Now to use this styled div within SVG, which we can then use in CSS for a background, we’ll put it in a `background: url()` function with a Data URL and repeat it with standard CSS properties.

```css
.pattern {
  width: 150px;
  aspect-ratio: 1;
  background-size: 50px 50px;
  background-position:left 10px top 10px;
  background-repeat: repeat;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'><foreignObject width='30px' height='100%'><div xmlns='http://www.w3.org/1999/xhtml' style='background:deepskyblue;width:90%;aspect-ratio:1;corner-shape:superellipse(-1);border-radius:30%;'></div></foreignObject></svg>");
  background-color: ghostwhite;
  /* etc. */
}
```

<CodePen
  user="anon"
  slug-hash="gbMzYwX"
  title="Pattern with corner-shape 1"
  :default-tab="['css','result']"
  :theme="dark"/>

### A Different Design #1

Since we can target individual corners, here’s a totally different design we can try:

```css
border-top-left-radius: 12px;
corner-top-left-shape: scoop;
border-bottom-right-radius: 26px;
corner-bottom-right-shape: notch;

transform: rotate(-135deg) scale(0.8) translate(-3px);
background: conic-gradient(red 265deg, blue 265deg);
```

Only the top-left and bottom-right corners are styled, and the whole thing is rotated to a desired angle.

<CodePen
  user="anon"
  slug-hash="emzrOdw"
  title="Pattern with corner-shape 2"
  :default-tab="['css','result']"
  :theme="dark"/>

### A Different Design #2

We can also make use of borders and shadows:

```css
border-bottom-left-radius: 66%;
corner-bottom-left-shape: notch;

box-shadow: -26px 16px 0 6px blue;
background: linear-gradient(to right, blue, deepskyblue);
```

The bottom-left corner has a notch style and there’s a leftward blue shadow.

<CodePen
  user="anon"
  slug-hash="LEZmPbZ"
  title="Pattern with corner-shape 3"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## A Real Life Example

Below are a few example patterns. Since we are using HTML and CSS for the pattern design, we can work with other features, such as transform, gradients, and filters, in addition to corner shapes to get different designs.

Here we’re setting a physical product onto a pattern created this way. Remember this gives us programmatic control over the pattern, so it should be straightforward to change colors, sizing, repeating styles, etc.

<CodePen
  user="anon"
  slug-hash="wBWjwoj"
  title="Pattern with corner-shape 4"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info Gallery

<CodePen
  user="anon"
  slug-hash="wBWdwey"
  title="Background pattern with CSS corner-shape"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Background Patterns with CSS `corner-radius`",
  "desc": "You might need to know this someday: you can style a div, put the div into SVG, then put the SVG in to CSS and use it as a repeating background.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/background-patterns-with-css-corner-radius.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
