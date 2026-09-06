---
lang: en-US
title: "When You Need To Make a Triangle, Think Conic Gradients"
description: "Article(s) > When You Need To Make a Triangle, Think Conic Gradients"
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
      content: "Article(s) > When You Need To Make a Triangle, Think Conic Gradients"
    - property: og:description
      content: "When You Need To Make a Triangle, Think Conic Gradients"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/when-you-need-to-make-a-triangle-think-conic-gradients.html
prev: /programming/css/articles/README.md
date: 2026-07-24
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10485
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
  name="When You Need To Make a Triangle, Think Conic Gradients"
  desc="Certainly it isn't the *only* way, but you've got a lot of angular control with conic-gradient() and it's fun to work with."
  url="https://blog.master.dev/when-you-need-to-make-a-triangle-think-conic-gradients/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10485"/>

It took me a while to get it, but `conic-gradient()` in CSS is actually pretty useful. For a while I was like, how many times do you actually need a this color-picker ass look?

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f8773-1011-742a-bf37-984c6687361a"
  title="Conic OKLCH rainbow"
  :default-tab="['css','result']"
  :theme="dark"/>

Not very often.

There is a clearer use case when you set hard stops for the colors.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f8c23-c929-7728-9e65-b778c74e7447"
  title="Conic Gradient Pie Chart"
  :default-tab="['css','result']"
  :theme="dark"/>

Pie charts are cool, but honestly, you’re probably better off with `<svg>` so you have individual elements for interactivity and accessibility information and such. Backgrounds in CSS are generally decoration-only.

My brain changed a little when I thought about how you can move *where the center of the conic gradient is*, though. Here I’ll put the origin at the bottom left corner (but a little further away from it, just for fun, and I can burst out some rays!

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f9415-2fd7-78d9-8de9-560769572ec2"
  title="Burst with repeating-conic-gradient"
  :default-tab="['css','result']"
  :theme="dark"/>

I also like how [an actual gradient looks (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019f8ada-745d-70ea-aa06-0f3ac287519a) across a button.

I was thinking about this when I saw this screenshot of [<VPIcon icon="fas fa-globe"/>Studio Heyday](https://heyday.ch/) on [<VPIcon icon="fas fa-globe"/>Siteinspire](https://siteinspire.com/website/13300-studio-heyday).

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/RTMAmqmk-r_2.jpg?resize=640%2C400&ssl=1)

What are those big beautiful triangles but conic gradients with hard stops at that angle?

We can set up a syntax where we “start” at the top-left corner point horizontally. By “point horizontally” I mean instead of the great wand of conic gradient painting starting like a clock hand poinging at 12 noon, we start pointing at 3 o’clock.

```css
background: conic-gradient(
  /* start in the upper left pointing at 3 o'clock */
  from 0.25turn at 0 0,
  green 0 45deg,
  white 45deg 
);
```

Then we set our color stops in degrees, which is sometimes easier to think about when dealing in circular stuff.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f942c-057e-7089-8ec3-4bc1126783ec"
  title="Triangle with conic gradient"
  :default-tab="['css','result']"
  :theme="dark"/>

But Chris! (you say). I don’t need a `conic-gradient()` for this, this is simple an angled `linear-gradient()`! You’re correct of course. That’s easy enough to do as well. But I quite like how we’re dealing with angles here, as since we’re specifically thinking about *triangles*, we can think in degrees. And if we’re confined into a box and the color angle is < 45deg, that’s just a lot of triangular control I’d say.

When I set out to build something like the Studio Hey nav triangles, this is the approach I took. I figured if I had triangular control like this, I could also alter the angles on hover, and I used a little `linear()` easing to make them jiggle a bit.

<CodePen
  link="https://codepen.io/editor/team/codepen/pen/019f819c-7fe4-7f66-b657-cf7372097b24/f9c65f7bf0f4d4d694fa4675f109d140"
  title="Triangles with conic-gradient()"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## There are Many Other Ways To Make Triangles

- There’s [the classic technique (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/DELgOJ) using just one of four borders on a zero-dimensions box.
- You can [<VPIcon icon="fas fa-globe"/>clip one out](https://bennettfeely.com/clippy/) with `clip-path: polygon();`
- You could use [**the brand new `border-shape`**](/una.im/border-shape.md).
- You could draw one in SVG with `<polygon>`
- You could draw on on an `<canvas>` with `.lineTo()` and such
- You could use some kind of skew transform and get a triangular side and then hide the overflow or something.

Honestly there is probably a dozen more ways if you sat down and figured them all out!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "When You Need To Make a Triangle, Think Conic Gradients",
  "desc": "Certainly it isn't the *only* way, but you've got a lot of angular control with conic-gradient() and it's fun to work with.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/when-you-need-to-make-a-triangle-think-conic-gradients.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
