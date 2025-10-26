---
lang: en-US
title: "Masonry: Watching a CSS Feature Evolve"
description: "Article(s) > Masonry: Watching a CSS Feature Evolve"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Browser
  - Apple
  - Safari
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
  - browser
  - apple
  - safari
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Masonry: Watching a CSS Feature Evolve"
    - property: og:description
      content: "Masonry: Watching a CSS Feature Evolve"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/masonry-watching-a-css-feature-evolve.html
prev: /programming/css/articles/README.md
date: 2025-10-15
isOriginal: false
author:
  - name: Saleh Mubashar
    url : https://css-tricks.com/author/salehmubashar/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/08/css-tricks-logo-blur.png
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

```component VPCard
{
  "title": "Safari > Article(s)",
  "desc": "Article(s)",
  "link": "/tool/safari/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Masonry: Watching a CSS Feature Evolve"
  desc="What can CSS Masonry discussions teach us about the development of new CSS features? What is the CSSWG’s role? What influence do browsers have? What can learn from the way past features evolved?"
  url="https://css-tricks.com/masonry-watching-a-css-feature-evolve"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/08/css-tricks-logo-blur.png"/>

You’ve probably heard the buzz about [**CSS Masonry**](/css-tricks.com/css-masonry-css-grid.md). You might even be current on the ongoing debate about how it should be built, with two big proposals on the table, one from the Chrome team and one from the WebKit team.

The two competing proposals are interesting in their own right. [<VPIcon icon="fa-brands fa-chrome"/>Chrome posted about its implementation](https://developer.chrome.com/blog/masonry-update?hl=en) a while back, and [<VPIcon icon="iconfont icon-webkit"/>WebKit followed it up with a detailed post](https://webkit.org/blog/15269/help-us-invent-masonry-layouts-for-css-grid-level-3/) stating their position (which evolved out of a [<VPIcon icon="iconfont icon-webkit"/>third proposal](https://webkit.org/blog/16587/item-flow-part-1-a-new-unified-concept-for-layout/) from the Technical Architecture Group).

We’ll rehash some of that in this post, but even more interesting to me is that this entire process is an excellent illustration of how the CSS Working Group (CSSWG), browsers, and developers coalesce around standards for CSS features. There are tons of considerations that go into a feature, like technical implementations and backwards compatibility. But it can be a bit political, too.

That’s really what I want to do here: look at the CSS Masonry discussions and what they can teach us about the development of new CSS features. What is the CSSWG’s role? What influence do browsers have? What can learn from the way past features evolved?

---

## Masonry Recap

A masonry layout is different than, say Flexbox and Grid, stacking unevenly-sized items along a single track that automatically wraps into multiple rows or columns, depending on the direction. It’s called the “Pinterest layout” for the obvious reason that it’s the hallmark of Pinterest’s feed.

![Screenshot of a Pinterest collection of inspiring quotes, displaying the thumbnail of echoes quote in a masonry-style layout divided in three vertical columns.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/Screenshot-2024-09-25-at-9.42.57-AM.png?resize=2047%2C1513&ssl=1)

Pinterest’s masonry layout

We could go deeper here, but talking specifically about CSS Masonry isn’t the point. When Masonry entered CSS Working Group discussions, the first prototype actually came from Firefox back in 2019, based on an early draft that integrated masonry behavior directly into Grid.

The Chrome team followed later with a new `display: masonry` value, treating it as a distinct layout model. They argued that masonry is a different enough layout from Flexbox and Grid to deserve its own `display` value. Grid’s defaults don’t line up with how masonry works, so why force developers to learn a bunch of extra Grid syntax? Chrome pushed ahead with this idea and [<VPIcon icon="fa-brands fa-chrome"/>prototyped it in Chrome 140](https://developer.chrome.com/blog/masonry-update?hl=en):

```css
.container {
  display: masonry;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 10px;
}
```

Meanwhile, the WebKit team has proposed that masonry should be a subset of Grid, rather than its own `display` type. [<VPIcon icon="iconfont icon-webkit"/>They endorsed a newer direction](https://webkit.org/blog/16587/item-flow-part-1-a-new-unified-concept-for-layout/) based on a recommendation by the W3C Technical Architecture Group (TAG) built around a concept called **Item Flow** that unifies `flex-flow` and `grid-auto-flow` into a single set of properties. Instead of writing `display: masonry`, you’d stick with `display: grid` and use a new `item-flow` shorthand to collapse rows or columns into a masonry-style layout:

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
  item-flow: row collapse;  
  gap: 1rem;
}
```

The debate here really comes down to mental models and how you think about masonry. WebKit sees it as a natural extension of Grid, not a brand-new system. Their thinking is that developers shouldn’t need to learn an entirely new model when most of it already exists in Grid. With `item-flow`, you’re not telling the browser “this is a whole new layout system,” you’re more or less adjusting the way elements flow in a particular context.

---

## How CSS Features Evolve

This sort of horse-trading isn’t new. Both Flexbox and Grid went through years of competing drafts before becoming the specs we use today. Flexbox, in particular, had a rocky rollout in the early 2010s. Those who were in the trenches at the time likely remember [**multiple conflicting syntaxes floating around at once**](/css-tricks.com/old-flexbox-and-new-flexbox.md). The initial release had missing gaps and browsers implemented the features differently, leading to all kinds of things, like proprietary properties, experimental releases, and different naming conventions that made the learning curve rather steep, and even [**Frankenstein-like usage in some cases**](/css-tricks.com/using-flexbox.md) to get the most browser support.

In other words, Flexbox (nor Grid, for that matter) did not enjoyed a seamless release, but we’ve gotten to a place where the browsers implementations are interoperable with one another. That’s a big deal for developers like us who often juggle inconsistent support for various features. Heck, [<VPIcon icon="fas fa-globe"/>Rob O’Leary recently published the rabbit hole he traveled](https://roboleary.net/blog/baseline-text-wrap-pretty/) trying to use [**`text-wrap: pretty`**](/css-tricks.com/pretty-is-in-the-eye-of-the-beholder.md) in his work, and that’s considered “Baseline” support that is “widely available.”

But I digress. It’s worth noting that Flexbox faced unique challenges early on, and masonry has benefitted from those lessons learned. I reached out to CSSWG member [<VPIcon icon="fas fa-globe"/>Tab Atkins-Bittner](https://xanthir.com/contact/) for a little context since they were heavily involved in editing the [<VPIcon icon="iconfont icon-w3c"/>Flexbox specification](https://w3.org/TR/css-flexbox-1/).

::: info (<VPIcon icon="fas fa-globe"/><code>w3.org</code>)

> “Flexbox was the first of the modern layout algorithms; we made a lot of mistakes and missteps while writing it, because we were trying to figure out how a modern layout model should work.”

:::

In other words, Flexbox was sort of a canary in the coal mine as the CSSWG considered what a modern CSS layout syntax should accomplish. This greatly benefited the work put into defining CSS Grid because a lot of the foundation for things like tracks, intrinsic sizing, and proportions were already tackled. Atkins-Bittner goes on further to explain that the Grid specification process also forced the CSSWG to rethink several of Flexbox’s design choices in the process.

> “We found a lot of decisions that made sense on their own in Flexbox needed to be changed if we wanted them to apply more generally.”

This also explains why Flexbox underwent [<VPIcon icon="iconfont icon-w3c"/>several revisions](https://w3.org/standards/history/css-flexbox-1/) following its initial release.

It also highlights another key point: **CSS features are** **always** **evolving**. Early debate and iteration are essential because they reduce the need for big breaking changes. Still, some of the Flexbox mistakes ([**which do happen**](/css-tricks.com/the-mistakes-of-css.md)) became widely adopted. Browsers had widely implemented their approaches and the specification caught up to it while trying to establish a consistent language that helps both user agents and developers implemented and use the features, respectively.

All this to say: Masonry is in a much better spot than Flexbox was at its inception. It benefits from the 15+ years that the CSSWG, browsers, and developers contributed to Flexbox and Grid over that time. The discussions are now less about fixing under-specified details and more about high-level design choices. Hence, novel ideas born from Masonry that combine the features of Flexbox and Grid into the new Item Flow proposal.

It’s messy. And weird. But it’s how things get done.

---

## The CSSWG’s Role

Getting to this point requires process. And in CSS, that process runs through the Working Group. The CSS Working Group (CSSWG) runs on consensus: members debate in the open, weigh pros and cons, and push browsers towards common ground.

[<VPIcon icon="fas fa-globe"/>Miriam Suzanne](https://oddbird.net/authors/miriam/), an invited expert with the CSSWG (and [<VPIcon icon="iconfont icon-css-tricks"/>CSS-Tricks alumni](https://css-tricks.com/author/miriam/)), describes the process like this:

> “The group runs on a consensus model, so everyone has to eventually come to an agreement — or at least agree not to block the most popular path forward.”

**But consensus only applies to the specifications.** Browsers still decide when and how to those features are shipped, as Suzanne continues:

> “Browsers make their own decisions about how strictly they follow a spec, and sometimes release features that haven’t been fully specified. That can lead to situations where the group decides to change a spec years later to match what browsers actually implemented.”

So, while the CSSWG facilitates discussions around features, it can’t actually stop browsers from shipping those features, let alone how they’re implemented. It’s a consensus-driven system, but consensus is only about publishing a specification. In practice, momentum can shift if one vendor is the first to ship or prototype a feature.

In most cases, though, the specification adoption process results in a stronger proposal overall. By the time features ship, the idea is that they’ve already been thoroughly debated, which in theory, reduces the need for significant revisions later that could lead to breaking changes. Backwards compatibility is always at the forefront of CSSWG discussions.

Developer feedback also plays an important role, though there isn’t a single standardized way that it is solicited, collected, or used. For the CSSWG, the [csswg-drafts GitHub repo (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts) is the primary source of feedback and discussion, while browsers also run their own surveys and gather input through various other channels such as Chrome’s [<VPIcon icon="fa-brands fa-chrome"/>technical discussion groups](https://chromium.org/developers/technical-discussion-groups/) and Webkit’s [<VPIcon icon="iconfont icon-webkit"/>mailing lists](https://lists.webkit.org/mailman/listinfo).

---

## The Bigger Picture

Browsers are in the business of shaping new features. It’s also in their best interest for a number of reasons. Proposing new ideas gives them a seat at the table. Prototyping new features gets developers excited and helps further refine edge cases. Implementing new features (particularly first) gives them a competitive edge in the consumer market.

All that said, prototyping features ahead of consensus is a bit of a tightrope walk.

And that’s where Masonry comes back into the bigger picture. Chrome shipped a prototype of the feature that leans heavily into the first proposal for a new `display: masonry` value. Other browsers have yet to ship competing prototypes, but have openly discussed their positions, [<VPIcon icon="iconfont icon-webkit"/>as WebKit did in subsequent blog posts](https://webkit.org/blog/16026/css-masonry-syntax/).

At first glance, that might suggest that Chrome is taking a heavy-handed approach to tip the scales in its favorable direction. But there’s a lot to like about prototyping features because it’s proof in the pudding for real-world uses by allowing developers early access to experiment.

Atkins-Bittner explains it nicely:

> “Prototyping before consensus is an important part of building consensus. You get early implementation feedback, you get more eyes on the problem (the implementing engineers rather than just the spec authors).”

This kind of “soft” commit moves conversations forward while leaving room to change course, if needed, based on real-world use.

But there’s obviously a tension here as well. Browsers may be custodians of web standards and features, but they’re still employed by massive companies that are selling a product at the end of the day. It’s easy to get cynical. And political.

In theory, though, allowing browsers to voluntarily adopt features gives everyone choice: browsers compete in the market based on what they implement, developers gain new features that push the web further, and everyone gets to choose the browser that best fits their browsing needs.

If one company controls access to a huge share of users, however, those choices feel less accessible. Standards often get shaped just as much by market power as by technical merit.

---

## Where We’re At

At the end of the day, standards get shaped by a mix of politics, technical trade-offs, and developer feedback. Consensus is messy, and it’s rarely about one side “winning.” With masonry, it might look like Google got its way, but in reality the outcome reflects input from both proposals, plus ideas from the wider community.

As of this writing:

- Masonry will be a **new display type**, but must include the word “grid” in the name. The exact keyword is still being debated.
- The CSSWG has resolved to proceed with the proposed `item-flow` approach.
- Grid will be used for layout templates and explicitly placing items in them.
- Some details, like a possible shorthand syntax and track listing defaults, are still being discussed.

::: info Further reading

This is a big topic, one that goes much deeper and further than we’ve gone here. While working on this article, a few others popped up that are very much worth your time to see the spectrum of ideas and opinions about the CSS standards process:

- Alex Russell’s [<VPIcon icon="fas fa-globe"/>post](https://infrequently.org/series/effective-standards-work/) about the standards adoption process in browsers.
- Rob O’Leary’s [<VPIcon icon="fas fa-globe"/>article](https://roboleary.net/blog/baseline-text-wrap-pretty/) about struggling with `text-wrap: pretty`, explaining that “Baseline” doesn’t always mean consistent support in practice.
- David Bushell’s [<VPIcon icon="fas fa-globe"/>piece](https://dbushell.com/2025/09/08/trillion-dollar-elephants/) about the WHATWG. It isn’t about the CSSWG specifically, but covers similar discussions on browser politics and standards consensus.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Masonry: Watching a CSS Feature Evolve",
  "desc": "What can CSS Masonry discussions teach us about the development of new CSS features? What is the CSSWG’s role? What influence do browsers have? What can learn from the way past features evolved?",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/masonry-watching-a-css-feature-evolve.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
