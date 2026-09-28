---
lang: en-US
title: "Randomly Place an Element Along Edge of Another Element"
description: "Article(s) > Randomly Place an Element Along Edge of Another Element"
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
      content: "Article(s) > Randomly Place an Element Along Edge of Another Element"
    - property: og:description
      content: "Randomly Place an Element Along Edge of Another Element"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/blog.master.devrandomly-place-an-element-along-edge-of-another-element.html
prev: /programming/css/articles/README.md
date: 2026-09-25
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11153
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
  name="Randomly Place an Element Along Edge of Another Element"
  desc="We can animate an element along the border edge of another element to random positions... pretty easily? Might as well be a cute dog."
  url="https://master.dev/blog/blog.master.dev/randomly-place-an-element-along-edge-of-another-element/"
  logo="https://master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11153"/>

Let me show you what I saw that started my brain turning:

<VidStack src="https://videopress.com/c55a005f-49f0-4644-ad09-473c2f8fdcbb" />

This is from the website of the podcast [<VPIcon icon="fas fa-globe"/>The Midnight Rebellion](https://podcasts.wbur.org/the-midnight-rebellion) on WBUR.

It’s a cute little crab that walks around on the top of an element! I love it!

It reminded me of a very cool CSS combo I like:

```css
offset-path: border-box;
offset-distance: 20%; /* whatever */
```

I normally think of `offset-path` as literally taking a `path()` element (or `rect()` or something) that sets up a path that you place items on. Then you animate the `offset-distance` value, which moves the element along that path.

But the path can just be the border of the parent element, which really simplifies things.

Now that Safari has `random()` (and Chrome has it behind the Experimental Web Features flag), we could make that crab walk to randomized places, perhaps entirely within CSS.

::: note

If you’re looking at the demos below in a non-supporting browser, you just won’t see the movement because the offset-distance is applied via CSS `random()` which will just be ignored. You could do an `@supports` fallback with hard-coded or JavaScript-generated values if you’re serious about shipping it.

:::

Let’s start simple.

---

## Setting Up The Box

Just a box.

```css
.box {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  position: relative;
}
```

Now let’s put something simple inside it.

```xml
<div class="box">
  <div class="circle">
  </div>
</div>
```

---

## Put The Thing On The Box

Now I can place the simple circle on the path of the box. I usually think, oh, I’ll have to make a path the same size as the box like `offset-path: rect(0 200px 200px 0);`, but no, you can just say to use the broder.

```css{6-7}
.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: red;
  offset-path: border-box;
  offset-distance: 20%;
}
```

Not having to use hard pixel values for the path also makes it all nicely responsive to size changes.

---

## Move The Thing

Now let’s move the circle around the path, as that’s the whole thing we’re going for here:

```css{3}
.circle {
  ...
  animation: moveCircle 25s infinite alternate ease-in-out;
}
```

You’d think we could just set some random positions:

```css
@keyframes moveCircle {
  0%   { offset-distance: random(0%, 100%); }
  25%  { offset-distance: random(0%, 100%); }
  50%  { offset-distance: random(0%, 100%); }
  75%  { offset-distance: random(0%, 100%); }
  100% { offset-distance: random(0%, 100%); }
}
```

I can’t quite explain why that doesn’t work, but that doesn’t work. Maybe it’s the nature of the random function within one @keyframes block or something. I think all the numbers compute to the same value despite not using the `element-shared` keyword to explicitly tell it to do that (maybe it’s implied in this context).

But if we seed each function call with a unique seed it *does* work. I’ll make it go to 200% as well for more movement.

```css
@keyframes moveCircle {
  0%   { offset-distance: random(--k1, 0%, 200%); }
  25%  { offset-distance: random(--k2, 0%, 200%); }
  50%  { offset-distance: random(--k3, 0%, 200%); }
  75%  { offset-distance: random(--k4, 0%, 200%); }
  100% { offset-distance: random(--k5, 0%, 200%); }
}
```

Here we go:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01a0d0de-4746-71a6-b2b1-89db2f2fed2c"
  title="Random Position for Element on Path"
  :default-tab="['css','result']"
  :theme="dark"/>

If you only wanted it along the top, you’d randomize up to 25%.

---

## A Glowing Orb & Shadow

I was kind of mesmerized that this worked and detoured myself making other examples. For instance, we could put the circle in a track by building the “borders” with `outline` and `box-shadow` instead. Then make the circle impossibly glowy.

<CodePen
  user="https://codepen.io/editor/chriscoyier/pen/01a0d0f4-78a1-7241-8bca-d38af6de18e4"
  title="Random Position for Element on Path"
  :default-tab="['css','result']"
  :theme="dark"/>

But otherwise the same movement applies here. I figure someone could make this glowing orb go through a maze or something cool.

The thing we’re moving doesn’t have to be a circle though of course, that element could be anything. I also thought I’d try making it just a big ol’ shadow and seeing how it feels watching that move around.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01a0d103-f16d-7706-a9a4-94b453b6e7c5"
  title="Random Position for Element on Path"
  :default-tab="['css','result']"
  :theme="dark"/>

Or maybe a whole bunch of them moving differently:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01a0d8d4-5ddd-72a8-aba7-c1e607750842"
  title="Random Position for Element on Path"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## What about the little crab?

Well we can’t do a crab. It’s been done. It’s passé.

We’ll have to do a doggie.

This is more elaborate as it’s not just a “circle” anymore but a whole bunch of (animated) circles that make a dog. But the core concept isn’t any more complicated. It just moves the dog to random positions.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01a0d928-1f7f-7281-9f15-e616cb2c9e6d"
  title="Dog Randomly Walking Around Element (w CSS Only)"
  :default-tab="['css','result']"
  :theme="dark"/>

But there are enough little limitations and stuff, I found it satisfying to use a little JavaScript to calculate the new position pseudo-randomly and flip the doggie when necessary.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01a0d10a-b63f-7440-8b27-879d6e9dce1e"
  title="Dog Randomly Walking Around Element (w JavaScript)"
  :default-tab="['css','result']"
  :theme="dark"/>

I’ll leave it as an exercise for the reader to make a `<dog-yard>`.

```component VPCard
{
  "title": "Very Early Playing with random() in CSS",
  "desc": "(Only Safari Technical Preview!) Awfully cool `random()` is coming in CSS. The design possibilities are quite cool. ",
  "link": "/blog.master.dev/very-early-playing-with-random-in-css.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```


[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/highlight-glow.jpg?fit=1200%2C720&quality=89&ssl=1&resize=350%2C200)](/custom-glow-rings-inside-of-elements/?relatedposts_hit=1&relatedposts_origin=11153&relatedposts_position=1 "Custom Glow Rings Inside of Elements")

#### [Custom Glow Rings Inside of Elements](/custom-glow-rings-inside-of-elements/?relatedposts_hit=1&relatedposts_origin=11153&relatedposts_position=1 "Custom Glow Rings Inside of Elements")

A box-shadow is an obvious choice for an inner glow of an element to highlight it. But with some fancy masking, we can use any overlay style we want.

```component VPCard
{
  "title": "Boundary-Aware Styling in CSS",
  "desc": "You might think of the view() function as used in scroll-driven animations, but really it just pairs @keyframes animation with the current position of an element.",
  "link": "/blog.master.dev/boundary-aware-styling-in-css.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Randomly Place an Element Along Edge of Another Element",
  "desc": "We can animate an element along the border edge of another element to random positions... pretty easily? Might as well be a cute dog.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/blog.master.devrandomly-place-an-element-along-edge-of-another-element.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
