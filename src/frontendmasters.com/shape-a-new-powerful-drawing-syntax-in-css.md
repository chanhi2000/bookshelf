---
lang: en-US
title: "shape(): A New Powerful Drawing Syntax in CSS"
description: "Article(s) > shape(): A New Powerful Drawing Syntax in CSS"
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
      content: "Article(s) > shape(): A New Powerful Drawing Syntax in CSS"
    - property: og:description
      content: "shape(): A New Powerful Drawing Syntax in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/shape-a-new-powerful-drawing-syntax-in-css.html
prev: /programming/css/articles/README.md
date: 2025-05-07
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5662
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
  name="shape(): A New Powerful Drawing Syntax in CSS"
  desc="Don't underestimate `shape()` — it's the CSS version of SVG  that we absolutely needed."
  url="https://frontendmasters.com/blog/shape-a-new-powerful-drawing-syntax-in-css/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5662"/>

I first saw in [<VPIcon icon="fas fa-globe"/>the Safari 18.4 release notes](https://arc.net/l/quote/wnmeyzxr) that `shape()`, a new function is now supported. Then I [<VPIcon icon="fa-brands fa-firefox" />saw on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/shape) it’s actually already in Chrome, too!

The `shape()` function joins friends like `polygon()`, `circle()`, `rect()`, `inset()`, and a handful of others. These functions are used as values for a handful of things in CSS, namely:

- `clip-path` — Clipping away parts of elements
- `offset-path` — Moving elements along a path
- `shape-outside` — Applied to a `float`-ed element such that content flows along the path

::: warning Fair warning:

`shape()` only seems to work with `clip-path`. I couldn’t find a ton of information on this, but [<VPIcon icon="fa-brands fa-firefox" />the Chrome blog does state it](https://developer.chrome.com/blog/css-shape#:~:text=At%20the%20moment%2C%20it%20only%20works%20for%20clip%2Dpath.). It will probably work with the other properties in due time.

:::

Let’s focus on `clip-path` here which I might argue is the most useful anyway, as it makes an entire element into the shape described which feels like a more generally applicable thing.

I got into this [<VPIcon icon="fa-brands fa-codepen"/>on the CodePen blog](https://blog.codepen.io/2025/04/21/chris-corner-rounded-triangle-boxes-and-our-shapely-future/) where I equated `shape()` to `<path d="">` in SVG, which is surely the intention. You can actually set the `d` attribute in CSS, but it only works on `<path>` elements, and the unitless values translate *only* to pixels, which makes it not particularly CSSy or useful.

One situation I mentioned was [<VPIcon icon="fas fa-globe"/>Trys Mudford’s blog post](https://trysmudford.com/blog/rounded-triangular-boxes-in-css/) where this was the design situation at hand:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/04/motorway-cvt-1536x618-1.jpg?resize=1024%2C412&ssl=1)

Oh look, a use case.

Those light yellow boxes are basically polygons with rounded corners. In a perfect world, `polygon()` could do this with the `round` keyword, as specced, but alas that doesn’t work just yet. But because `shape()` is essentially all-powerful, that *does* work now (in Chrome and Safari anyway, and this feels like a decently progressive-enhancement thing).

[**Temani Afif saw that and did the work!**](/css-tip.com/arrow-like-box.md)

<CodePen
  user="t_afif"
  slug-hash="LEENyEq"
  title="Arrow-like Box with rounded corners"
  :default-tab="['css','result']"
  :theme="dark"/>

This is very awesome. This is quite the power tool for shape-making. I think we’re going to see a lot of fancy stuff come out of this.

It’s true we already have a `path()` function, but remember, it’s *sooooo* limited. The values are only pixels, which are some pretty big handcuffs in a responsive world full of intrinsic content (that is, elements on the web that respond to their contents and environment). [<VPIcon icon="iconfont icon-webkit"/>Simon Fraser on the WebKit blog introduces this new feature](https://webkit.org/blog/16794/the-css-shape-function/) and calls it out:

::: info

> … using`path()`in`clip-path`can’t be*responsive*; you can’t write CSS rules so that the path adapts to the size of the element. This is where the new`shape()`function comes in.

:::

Coincidentally, Simon’s demo (Jen’s demo?) also shows off an arrow shape:

<CodePen
  user="jensimmons"
  slug-hash="GgRXXMx"
  title="shape() - demo 3"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s using multiple different drawing commands (`line` and `arc`, but there are more), keywords like `top` and `left` (excellent, but I wonder why logical properties don’t work?), and, even more deliciously, [**container units**](/frontendmasters.com/container-queries-and-units/#what-are-container-query-units.md) (e.g. `cqh`). The orange border there is a good reminder that `clip-path`, well, *clips.* So it’ll lop off anything at all on this element in those areas, including content.

[<VPIcon icon="fa-brands fa-chrome"/>Noam Rosenthal got in on the fun](https://developer.chrome.com/blog/css-shape) over on the Chrome for Developers blog, underscoring just how hard this stuff used to be:

::: info

> `clip-path: shape()`lets you clip your element using arbitrary and responsive shapes, previously only possible using techniques like conic gradients or JavaScript-constructed SVG.

:::

And like all this good company, absolutely couldn’t resist peppering in other CSS goodness into a demo. His demo here uses different drawing commands than we’ve seen so far, custom properties (which are an extremely natural fit), and even animation (!!).

<CodePen
  user="noamr"
  slug-hash="OPJdjBp"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

I see Temani is hard on the case with [<VPIcon icon="fas fa-globe"/>a blob generator using `shape()`](https://css-generators.com/blob/), which, I believe as long as there are the “same number of points”, can be animated by changing the `clip-path` entirely. Like:

<CodePen
  user="t_afif"
  slug-hash="yyyPONb"
  title="Blob shape with hover effect!"
  :default-tab="['css','result']"
  :theme="dark"/>

And obviously I love this:

<CodePen
  user="t_afif"
  slug-hash="JoovLam"
  title="CodePen Logo using clip-path: shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## [](#the-actual-shape-commands)The Actual Shape Commands

[The spec covers them](https://drafts.csswg.org/css-shapes-2/#shape-function), but the best writeup I’ve seen is [Geoff’s on CSS-Tricks](https://css-tricks.com/css-shape-commands/#:~:text=I%20figured%20a%20table%20would%20help.). He’s got a bit more detail so check that out, but here’s the list:

- `line`
- `vline`
- `hline`
- `arc`
- `curve`
- `smooth`

Each of them have a bit of sub-syntax to themselves. Like the `curve` command might look like `curve to 50% 50% with 50% 0` which would continue drawing the shape to the exact center of the element in a curve in which the top center is a “control point” and so curves in that direction.

In my experience it’s quite easy to make a small mistake in the syntax and wreck the whole thing. But hey that’s understandable.

---

## Squircles with `shape()`

I get to have some fun too! It occurred to me that digital designs most elusive beast, *the squircle,* might be now achievable with reasonable normal web tech.

SVG can do it, but I wouldn’t call it particularly readable code. “[<VPIcon icon="fas fa-globe"/>Monoco](https://somonoco.com/) is a tiny JavaScript library that adds squircles” (via SVG background images) and it does a pretty good job of it I’d say, but that’s more technology than I normally like to throw at something like this. Jared White by way of Simeon Griggs has a pretty nice SVG-based solution as well, leveraging SVG-as-clip-path.

<CodePen
  user="jaredcwhite"
  slug-hash="JoPeJar"
  title="Squircle Web Component Button"
  :default-tab="['css','result']"
  :theme="dark"/>

I like how relatively chill that SVG `path` is, but still, `shape()` can allow us to squish this down into just CSS which is kinda sweet.

That is… if I was fully smart enough to do it.

I crudely drew one in Figma so that I could label the points for writing the syntax out.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/05/Screenshot-2025-05-05-at-3.49.06%E2%80%AFPM.png?resize=1008%2C1024&ssl=1)

I figured if I just did a `curve` to every one of those points with control points a bit the edges, it would… work? So basically like this:

```css
div {
  clip-path: shape(
    from 5% 3%,
    curve to 95% 3% with 50% 0,
    curve to 97% 5% with 97% 3%,
    curve to 97% 95% with 100% 50%,
    curve to 95% 97% with 97% 97%,
    curve to 5% 97% with 50% 100%,
    curve to 3% 95% with 3% 97%,
    curve to 3% 5% with 0% 50%,
    curve to 5% 3% with 3% 3%,
  );
}
```

Which basically [works (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/chriscoyier/pen/WbbOwBP). I tried playing around with `arc` and `smooth` instead but couldn’t manage to make it any better (with my like zero geometry skills). Then instead of hard coding those percentage values, I made them in custom properties with sliders to squiggle them around a little.

<CodePen
  user="chriscoyier"
  slug-hash="zxxzBPZ"
  title="Attempt at Squircle #3 with shape();"
  :default-tab="['css','result']"
  :theme="dark"/>

It’s a little janky — but I trust someone make like a real quality geometrically sound version eventually.

---

## Update #1

I heard from Peter Herbert over email:

::: info

> I found a somewhat more accurate version of the iOS squircle. Apparently the Apple squircle uses three cubic beziers in each corner. The original research that figured out the curves I found[<VPIcon icon="fas fa-globe"/>here](https://liamrosenfeld.com/posts/apple_icon_quest/),and I used[<VPIcon icon="iconfont icon-claude"/>Claude](https://claude.ai/public/artifacts/26954731-6fcd-40ac-9bd1-a6dd85b97a71)to find the points.

:::

<CodePen
  user="chriscoyier"
  slug-hash="KwwGKvY"
  title="Three Cubic Bezier Squircle"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Update #2

Matthew Morete commented below with a tool he made that converts SVG path commands into `shape()` commands, which is awesome. Squircles are one of the provided demos, and the commands are very chill:

```css
.squircle {
  clip-path: shape(
    from 0% 50%, 
    curve by 50% -50% with 0% -45% / 5% -50%, 
    smooth by 50% 50% with 50% 5%, 
    smooth by -50% 50% with -5% 50%, 
    smooth by -50% -50% with -50% -5%
  );
}
```

<CodePen
  user="chriscoyier"
  slug-hash="gbbBOXz"
  title="Another Squircle Clip Path using `smooth`"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "shape(): A New Powerful Drawing Syntax in CSS",
  "desc": "Don't underestimate `shape()` — it's the CSS version of SVG  that we absolutely needed.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/shape-a-new-powerful-drawing-syntax-in-css.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
