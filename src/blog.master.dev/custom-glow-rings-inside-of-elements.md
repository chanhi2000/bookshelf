---
lang: en-US
title: "Enhance Page Elements with Custom Glow Effects and Masks"
description: "Article(s) > Enhance Page Elements with Custom Glow Effects and Masks"
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
      content: "Article(s) > Enhance Page Elements with Custom Glow Effects and Masks"
    - property: og:description
      content: "Enhance Page Elements with Custom Glow Effects and Masks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/custom-glow-rings-inside-of-elements.html
prev: /programming/css/articles/README.md
date: 2026-09-18
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11076
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
  name="Enhance Page Elements with Custom Glow Effects and Masks"
  desc="Learn to highlight elements with custom styles using box-shadow and mask techniques for unique glowing effects. Enhance your design today!"
  url="https://blog.master.dev/custom-glow-rings-inside-of-elements/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11076"/>

I had a situation where I wanted to highlight an arbitrary element on a page. Like, call attention to it briefly.

There is a pretty obvious and straightforward way to do this. We could apply an `inset` style `box-shadow` to whatever, and that would apply a nice glow that works just fine:

```css
.highlighted-element {
  box-shadow:
    inset 0 0 40px 8px oklch(0.5574 0.2911 312.88 / 0.55),
    inset 0 0 12px 2px oklch(0.5574 0.2911 312.88 / 0.88);
}
```

We could improve the experience by applying the `box-shadow` in a `@keyframes` animation so it can fade in and grow nicely, as well as only appear for a few seconds. Here’s that, done with a `:hover` state.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01a0b66f-0c02-7ad1-916b-bcc677b3a886"
  title="Hover Glows"
  :default-tab="['css','result']"
  :theme="dark"/>

But I had something more special in mind!

I didn’t want just a single color. I wanted to use something like a `conic-gradient()` look. Or maybe a texture or image of some kind. I just wanted a bit more freedom for the look. Still a glow of sorts, and you should still be able to see the (arbitrary) element underneath, but with a custom design.

So first I put this cover over the highlighted element:

```css
.highlighted-element {
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: ... whatever! 
  }
}
```

That puts a right-sized cover over the entire element.

So now how do we turn that into a glow that only comes in from the edges?

Masking!

First, we’ll apply an image over the highlighted element using the same code as above.

<CodePen
  user="https://codepen.io/editor/chriscoyier/pen/01a0b696-a077-738c-b9db-10ed17f3fa16"
  title="Hover Glows"
  :default-tab="['css','result']"
  :theme="dark"/>

Then we can mask that pseudo-element, starting on the left and right:

```css
--inset: 30px;
mask-image: linear-gradient(
  to right,
  black 0%,
  transparent var(--inset),
  transparent calc(100% - var(--inset)),
  black 100%
);
```

<CodePen
  user="https://codepen.io/editor/chriscoyier/pen/01a0b698-e53c-715c-b870-6fc0b53877b0"
  title="Hover Glows"
  :default-tab="['css','result']"
  :theme="dark"/>

The cool part is that we can *also* mask the top and bottom with a second mask, then *combine* the masks with `mask-composite: add;`.

```css{5,11,17}
--inset: 20px;
mask-image:
  linear-gradient(
    to right,
    black 0%,
    transparent var(--inset),
    transparent calc(100% - var(--inset)),
    black 100%
  ),
  linear-gradient(
    to bottom,
    black 0%,
    transparent var(--inset),
    transparent calc(100% - var(--inset)),
    black 100%
  );
mask-composite: add; /* union of both edge bands */
```

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01a0b69b-ff60-704d-906f-f7089036e331"
  title="Hover Glows"
  :default-tab="['css','result']"
  :theme="dark"/>

Now that’s freedom!

That’s the whole idea.

Above we used an image, but we could use anything we want. In my case, I was shooting for a rainbow conic-gradient thing like I mentioned.

Here’s an example with both types of glows (the `box-shadow` kind and the “whatever” kind) applied to random elements for a few seconds.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01a0b4c1-f596-787d-bc0e-bdc27371dd1a"
  title="Random Element Glow #1"
  :default-tab="['css','result']"
  :theme="dark"/>

```component VPCard
{
  "title": "Expanding CSS Shadow Effects - Frontend Masters Blog",
  "desc": "Shadows don't have to be used for... shadows. Inset shadows can layer over backgrounds and because they are animatable, it's just another tool for drawing what we want to the page.",
  "link": "/blog.master.dev/expanding-css-shadow-effects.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Using `animation-composition` in CSS to Avoid Redeclaring Other Values",
  "desc": "Here's an example. You can list multiple comma-separated box-shadows, but if you apply a *new* box-shadow, it overrides anything set before. Not true here.",
  "link": "/blog.master.dev/using-animation-composition-in-css-to-avoid-redeclaring-other-values.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Inset Shadows Directly on img Elements (Part 1)",
  "desc": "Inset `box-shadow` doesn't work directly on image elements. There are work-arounds, but this SVG filter can do it directly. Don't run! There is powerful stuff to learn here through interactive demos. ",
  "link": "/blog.master.dev/inset-shadows-directly-on-img-elements-part-1.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Enhance Page Elements with Custom Glow Effects and Masks",
  "desc": "Learn to highlight elements with custom styles using box-shadow and mask techniques for unique glowing effects. Enhance your design today!",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/custom-glow-rings-inside-of-elements.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
