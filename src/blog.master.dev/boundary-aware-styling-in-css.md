---
lang: en-US
title: "Boundary-Aware Styling in CSS"
description: "Article(s) > Boundary-Aware Styling in CSS"
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
      content: "Article(s) > Boundary-Aware Styling in CSS"
    - property: og:description
      content: "Boundary-Aware Styling in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/boundary-aware-styling-in-css.html
prev: /programming/css/articles/README.md
date: 2026-07-07
isOriginal: false
author:
  - name: Preethi Sam
    url: https://blog.master.dev/author/preethisam/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10341
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
  name="Boundary-Aware Styling in CSS"
  desc="You might think of the view() function as used in scroll-driven animations, but really it just pairs @keyframes animation with the current position of an element."
  url="https://blog.master.dev/boundary-aware-styling-in-css/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10341"/>

There are times we might prefer specific styles for elements located near the edges of their containers or the screen.

Different colors, sizes, or rotations based on how close they are to the edge and which side of the container they are on. Instead of relying on class names, item counts, or sibling positions, we can achieve this with *a single CSS function*.

The `view()` CSS function is known for its use in scroll-driven animations, affecting elements based on their visibility within a scroll container. However, it can be **used without involving any actual scrolling or motion effect**.

This article shows you how to do that to create more adaptive interfaces based on their closeness to their container’s boundaries.

<CodePen
  user="anon"
  slug-hash="bNgWwmr"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## How `view()` Works

The `view()` function links an animation’s progress to its visibility within its scroll container. When we apply `animation-timeline: view()`, the browser tracks the position of the element relative to its nearest scrollable container. The animation progress goes like this:

- **0% Progress (Start)**: Triggered the exact moment the top/left/leading edge of the element enters the visible boundary of the scrollport.
- **100% Progress (End)**: Reached when the bottom/right/trailing edge of the element completely exits the opposite side of the scrollport.

---

## Boundary-Aware Style on Static Elements

Here’s a group of elements that are arranged in a three-column grid.

```xml
<main>
  <div class="card">Contacts</div>
  <div class="card">Shipping information</div>
  <div class="card">Find a product</div>
  <!-- more -->
</main>
```

```css
.card {
  background: rgb(16, 111, 235);
}
```

I want the cards to have different colors based on their horizontal distribution in their container. So, first, we **turn the cards’ parent,** `<main>`**, into a scroll container**.

::: note How does an element become a scroll container?

An element automatically turns into a scroll container when you apply one of these:

- `overflow: scroll;`
- `overflow: auto;`
- `overflow: hidden;` (No scrollbars, but the content is scrollable programmatically)

:::

Let’s update `<main>` to be a scroll container:

```css
main {
  overflow: hidden;
}
```

If `<main>` doesn’t become a scroll container, the `view()` function we’ll later apply might take the `<body>` element as the nearest scroll container.

To change the cards’ colors, I’ll use the `hue-rotate()` filter. This goes into a `@keyframes` declaration.

```css
@keyframes cr {
  /* Set the color range */
  from { filter: hue-rotate(180deg); }
}
```

Use the keyframes animation on the cards with the `view(x)` timeline. `x` is the horizontal axis.

```css
.card {
  background: rgb(16, 111, 235);
  animation: cr;
  animation-timeline: view(x);
}
```

<CodePen
  user="anon"
  slug-hash="azppMgP"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

Another example:

```css
@property --a {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@keyframes cr {
  from { --a: 360deg; }
}
main {
  overflow: hidden;
}
.card {
  background: conic-gradient( from var(--a), red, pink, crimson, fuchsia, orange);
  animation: cr;
  animation-timeline: view(x);
}
```

<CodePen
  user="anon"
  slug-hash="pvRRBzp"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s what some simple style changes look like:

<CodePen
  user="anon"
  slug-hash="QwdvKBO"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="azpWmjx"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="yygbaxE"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Boundary-aware style on draggable elements

```xml
<div id="draggable-box">
  Draggable box
</div>
```

The `#draggable-box` element is a draggable (by JavaScript). Its position on screen, the default scroll container, changes as we drag it across the viewport. So does its color.

```css
@keyframes shiftColor {
  to {
    background-color: rgb(203, 49, 242);
  }
}
#draggable-box {
  background-color: rgb(41, 113, 248);
  animation: shiftColor;
  animation-timeline: view(x);
}
```

See the box’s color change as you drag it from the left to the right side of the screen.

<CodePen
  user="anon"
  slug-hash="vEggMYE"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

You can apply the same principle in HTML sliders.

```css
<input id="slider-range" type="range" min="0" max="100" value="50">
```

```css
@keyframes shiftColor {
  from { background-color: red; }
  50% { background-color: yellow; }
  to { background-color: green; }
}
#slider-range {
  /* the slider track */
  &::-webkit-slider-runnable-track{ /* Webkit */
    overflow: hidden;
  }
  &::-moz-range-track {             /* Firefox */
    overflow: hidden;
  }
 /* the slider thumb */
  &::-webkit-slider-thumb {         /* Webkit */
    animation: shiftColor;
    animation-timeline: view(x);
  }
  &::-moz-range-thumb {             /* Firefox */
    animation: shiftColor;
    animation-timeline: view(x);
  }
}
```

The slider’s track is set as the scrollable container with `overflow: hidden`, and `view(x)` is applied to the thumb. There are three color stops in the `@keyframes` animation that `view()` drives. As we slide the thumb along the track from one edge to the other, its color changes between the edges and the middle.

<CodePen
  user="anon"
  slug-hash="bNgWwmr"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s another example where an anchor-positioned element to the thumb changes.

```xml
<div id="slider-container">
  <input id="slider-range" type="range" min="0" max="100" value="50">
  <!-- the anchor-positioned custom thumb -->
  <div id="slider-thumb">&#x2B50;&#xFE0F;</div>
</div>
```

```css
@property --a {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@keyframes shiftColor {
  from { --a: 370deg }
  50%  { --a: 180deg }
  to   { --a: -10deg }
}
#slider-container {
  overflow: hidden;
}
#slider-thumb {
  background-image: conic-gradient(crimson var(--a), dodgerblue var(--a));
  animation: shiftColor;
  animation-timeline: view(x);
}
```

<CodePen
  user="anon"
  slug-hash="RNKVGqa"
  title="Boundary aware CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

You can experiment with the axes, animation range, animation steps, and more to achieve different results. Just make sure the right ancestor is set as the scroll container using the `overflow` property.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Boundary-Aware Styling in CSS",
  "desc": "You might think of the view() function as used in scroll-driven animations, but really it just pairs @keyframes animation with the current position of an element.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/boundary-aware-styling-in-css.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
