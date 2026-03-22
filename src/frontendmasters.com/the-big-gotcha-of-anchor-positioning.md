---
lang: en-US
title: "The Big Gotcha of Anchor Positioning"
description: "Article(s) > The Big Gotcha of Anchor Positioning"
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
      content: "Article(s) > The Big Gotcha of Anchor Positioning"
    - property: og:description
      content: "The Big Gotcha of Anchor Positioning"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-big-gotcha-of-anchor-positioning.html
prev: /programming/css/articles/README.md
date: 2026-03-05
isOriginal: false
author:
  - name: Chris Coyier
    url: https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8803
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
  name="The Big Gotcha of Anchor Positioning"
  desc="As it stands, you have to think about the layout engine and whether an element is "
  url="https://frontendmasters.com/blog/the-big-gotcha-of-anchor-positioning/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8803"/>

Alternate Titles:

- “Something’s Rotten in The Consortium”
- “It’s Batpoop Crazy Easy To Break Anchors”

I feel like an idiot, because I’m very guilty of telling people that one of the *amazing benefits* of Anchor Positioning in CSS is that you can position elements relative to other elements *regardless* of where they are in the DOM. It’s that italic, *regardles*s, that’s the problem.

No, Chris, you can’t. Sorry about that. There are a bunch of limitations which can feel quite inscrutable at first. New types of problems that, to my knowledge, haven’t existed quite like this in CSS before.

Here’s a little rant about it:

<VidStack src="videopress/sSKz4YXg" />

::: note

I’m trying to be dramatic there on purpose because I really do think that the CSS powers that be should do something about this. I’m *sure* there are reasons why it behaves the way it does now, and I’ll bet a dollar that speed is a part of it. But it’s *way* too footgunny (as in: easy to do the wrong thing) right now. I gotta imagine the anchor-resolving part of the grand CSS machine could do a “second pass” or the like to find the anchor.

:::

If you’re logged into CodePen, [open this demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019c9cfc-d6b3-7f43-8be6-9430d3c42f63) and move the DOM positions as I did in the video to see it happen.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019c9cfc-d6b3-7f43-8be6-9430d3c42f63"
  title="Basic Anchoring"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## It’s Fixable.

It’s a *smidge* convoluted that I’d move the tooltip *before* the anchor, I suppose. You can just: not do that. But it’s symbolic that you can’t just *do whatever you want* with DOM placement of these things an expect it to work.

[**Temani Afif has a good article**](/css-tip.com/anchor-issues.md) about all this, which has a strong callout that I’ll echo:

::: note

**The anchor element must be fully laid out before the element that is anchored to it.**

:::

So you have to be thinking about the `position` value quite a bit. There is almost a 100% chance that the element you’re trying to position to an anchor is `position: absolute;`. It’s the anchor itself that’s more concerning. If they are siblings, and the anchor has any `position` value other than the default `static`, the anchor *has* to come first. If they are in other positions in the DOM, like the anchor is a parent or totally elsewhere, you need to ensure they are in the same “containing block” or that the anchor parent still has that `static` positioning. Again, Temani has [**a deeper dive**](/css-tip.com/anchor-issues.md) into this that explains it well.

[**James Stuckey Weber also has an article on this**](/oddbird.net/anchor-position-validity.md). His callout is a bit more specific:

::: tip

For the best chance of having anchor positioning work, here’s my recommendation:

1. Make the anchor and the positioned element siblings.
2. Put the anchor first in the DOM.

:::

Part of me likes that simplified advice as it’s understandable and teachable.

A bigger part of me hates that. This is a weird new problem that CSS has given us. We haven’t had to root out problems like this in CSS before and I don’t exactly welcome a new class of troubleshooting. So again: I think CSS should fix this going forward if they can.

::: tip

If you’re further confused by how to position things even if you have the anchor working…

1. First, [<VPIcon icon="fas fa-globe"/>anchor-tool](https://anchor-tool.com/) is very helpful to remember how the “span” thing works which I’ve yet to have fully sink into my briain.
2. Second, the area you’re anchoring to is *kinda* like a grid cell, so you can `align` and `justify` stuff inside of it. But where does this “cell” occupy? It’s called the Inset-Modified Containing Block (IMCB) and [**Bramus has a good explanation**](/bram.us/anchor-positioning-and-the-inset-modified-containing-block-imcb.md). The `inset` part basically means shrinking it by pushing against the cell walls. Also IMCB is so weirdly close to ICBM, but I guess they can both blow you up.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Big Gotcha of Anchor Positioning",
  "desc": "As it stands, you have to think about the layout engine and whether an element is ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-big-gotcha-of-anchor-positioning.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
