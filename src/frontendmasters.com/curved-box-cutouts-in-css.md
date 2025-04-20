---
lang: en-US
title: "Curved Box Cutouts in CSS"
description: "Article(s) > Curved Box Cutouts in CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Curved Box Cutouts in CSS"
    - property: og:description
      content: "Curved Box Cutouts in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/curved-box-cutouts-in-css.html
prev: /programming/css/articles/README.md
date: 2025-05-01
isOriginal: false
author:
  - name: Preethi Sam
    url : https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5733
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
  name="Curved Box Cutouts in CSS"
  desc="Kinda like that "
  url="https://frontendmasters.com/blog/curved-box-cutouts-in-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5733"/>

This post explores a trick to create the illusion of an element appended to another with a gap and curved edges at the corners. It’s useful for visually demarcating supplementary elements or user controls in a card module.

An example:

<CodePen
  user="rpsthecoder"
  slug-hash="WbbZRYW"
  title="CSS rounded corners"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## The Layout

Let’s start with the HTML and code a simple design.

```html
<div class="outer">
  <div class="inner"></div>
</div>
```

Use a nested element (`.inner`) or a stacked element to create the small box. The key is for the small box to *overlap* the larger one.

```css
.outer {
  width: 375px;
  aspect-ratio: 1;
  border-radius: 12px;
  background: dodgerblue;

  .inner {
    width: 160px;
    height: 60px;
    border-radius: inherit;
    background: skyblue;
  }
}
```

The larger square box (`.outer`) and the smaller rectangle box (`.inner`) share the same `border-radius` value (`12px`).

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/pLA9AZ0M-1.png?resize=1024%2C614&ssl=1)

---

## The Smaller Box

Add an `outline` of the same color as the page.

```css
.inner {
  /* etc. */
  outline: 8px solid white;
}
```

That’s all we need to do with the inner box.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/HoXaRDoI.png?resize=1024%2C614&ssl=1)

---

## The Bigger Box

Add two small `radial-gradient()` background images to the larger box’s background.

1. Position the images where the smaller box’s corners overlap, with a negative offset equal to the *outline* size (`8px`).
2. The *border radius* (`12px`) plus the smaller box’s *outline* (`8px`) equals the images’ size (`20px 20px`).
3. The *gradients* are transparent circles the same size as the *border radius* (`12px`), with the rest white

```css
.outer {
  /* etc. */
  background: 
    -8px 60px / 20px 20px 
        radial-gradient(circle at right bottom, transparent 12px, white 12px),
    160px -8px / 20px 20px 
        radial-gradient(circle at right bottom, transparent 12px, white 12px),
    dodgerblue;
}
```

The code is complete. You’ll get the final result as is. However, let’s make the code more flexible.

---

## CSS Variables

For ease of update, I’ll move the *length* values to CSS variables, and for clarity, I’ll list each of the `background-` properties separately.

```css :collapsed-lines
.outer {
  width: 375px;
  aspect-ratio: 1;

  /* border radius */
  --r: 12px;

  /* width, height, and outline of smaller box */
  --w: 160px;
  --h: 60px;
  --o: 8px;

  /* offset and size of the radial-gradient images */
  --ofs: calc(-1 * var(--o));
  --sz: calc(var(--r) + var(--o));
  --img: radial-gradient(circle at right bottom, transparent var(--r), white var(--r));

  border-radius: var(--r);
  background-image: var(--img), var(--img);
  background-position: var(--ofs) var(--h), var(--w) var(--ofs);
  background-size: var(--sz) var(--sz);
  background-repeat: no-repeat;
  background-color: dodgerblue;

  .inner {
    width: var(--w);
    height: var(--h);
    outline: var(--o) solid white;
    border-radius: inherit;
    background: skyblue;
  }
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="NPPadJm"
  title="CSS rounded corners"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## All Four Corner Placements

Place the smaller box in the desired corner against the bigger one, and update the radial gradient image positions and circles accordingly.

```css :collapsed-lines
.outer {
  /* etc. */
  background-image:
   radial-gradient(circle at var(--cnr), transparent var(--r), white var(--r)),
   radial-gradient(circle at var(--cnr), transparent var(--r), white var(--r)),
   linear-gradient(45deg, rgb(210, 223, 246), rgb(51, 134, 242));

  &:nth-of-type(1) {
    --cnr: right bottom;
    background-position: 
      var(--ofs) var(--h), 
      var(--w) var(--ofs), 
      0 0;
    /* etc. */
  }

  &:nth-of-type(2) {
    --cnr: left bottom;
    background-position: 
      calc(100% - var(--ofs)) var(--h), 
      calc(100% - var(--w)) calc(var(--ofs)), 
      0 0;
    /* etc. */
  }

  &:nth-of-type(3) {
    --cnr: left top;
    background-position: 
      calc(100% - var(--ofs)) calc(100% - var(--h)), 
      calc(100% - var(--w)) calc( 100% - var(--ofs)), 
      0 0;
    /* etc. */
  }

  &:nth-of-type(4) {
    --cnr: right top;
    background-position: 
      var(--ofs) calc(100% - var(--h)), 
      var(--w) calc(100% - var(--ofs)), 
      0 0;
    /* etc. */
  }
}
```

The larger box in the example is a square, so `100%` is used in calculating the *radial gradient* images’ positions both vertically and horizontally where needed.

<CodePen
  user="rpsthecoder"
  slug-hash="EaaPMax"
  title="CSS rounded corners"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## How to Use The Design?

Since the design uses an *imitation* of a gap, effects like drop shadow that require cutouts won’t work. However, no extra markup or style changes are needed, only the background is affected, making it suitable for simple designs.

<CodePen
  user="rpsthecoder"
  slug-hash="WbbZRYW"
  title="CSS rounded corners"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This doesn’t have to be limited to gap-like designs, either. The outline can be used in other ways, too. The rounded corners will be a subtle touch up.

```css
.date {
  outline: var(--outline) solid navy;
  /* etc. */
}
```

<CodePen
  user="rpsthecoder"
  slug-hash="KwwXaLP"
  title="CSS rounded corners"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Curved Box Cutouts in CSS",
  "desc": "Kinda like that ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/curved-box-cutouts-in-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
