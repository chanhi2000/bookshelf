---
lang: en-US
title: "What’s !important #16: sibling-index() Animations, Use Cases for the infinity Keyword, Container Stuck Queries, and More"
description: "Article(s) > What’s !important #16: sibling-index() Animations, Use Cases for the infinity Keyword, Container Stuck Queries, and More"
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
      content: "Article(s) > What’s !important #16: sibling-index() Animations, Use Cases for the infinity Keyword, Container Stuck Queries, and More"
    - property: og:description
      content: "What’s !important #16: sibling-index() Animations, Use Cases for the infinity Keyword, Container Stuck Queries, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-16.html
prev: /programming/css/articles/README.md
date: 2026-07-31
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/wi16.jpg
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
  name="What’s !important #16: sibling-index() Animations, Use Cases for the infinity Keyword, Container Stuck Queries, and More"
  desc="The soon-Baseline sibling-index() function for animations, CSS and the 2026 FIFA World Cup, use cases for the infinity keyword, container ”stuck” queries, and more."
  url="https://css-tricks.com/whats-important-16"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/wi16.jpg"/>

In **What’s !important #16**, see how the soon-Baseline `sibling-index()` function can be used for animations, revisit the 2026 FIFA World Cup with CSS, explore the use cases for the `infinity` keyword, learn about container ‘stuck’ queries, and much more.

---

## Using `sibling-index()` for animations

Following on from Chris Coyier’s [**In-N-Out Animations series**](/master.dev/in-n-out-animations-dialogs-part-1-3.md), [<VPIcon icon="iconfont icon-css-tricks"/>Temani Afif](https://css-tricks.com/author/afiftemani/) showed us [**how to use `sibling-index()` for animations**](/master.dev/in-n-out-animation-using-sibling-index.md), which Firefox 154 will ship on the 18th of August, 2026, making it Baseline: Newly Available. The demos are exceptionally cool, so I’ll share a couple of them below:

<CodePen
  user="anon"
  slug-hash="NPdXOXG"
  title="Add/remove items II"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="OPWzEZJ"
  title="Images around a circle"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## How to code a knockout bracket

The 2026 FIFA World Cup has concluded, which even with all of its controversies was an absolute banger. For those feeling the post-World Cup blues, Ahmad Shadeed showed us [**how to build the knockout bracket using CSS**](/ishadeed.com/fifa-layout.md). This is such a fun read — definitely don’t miss this.

![Source: [**Ahmad Shadeed**](/ishadeed.com/fifa-layout.md)](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/2.png?resize=1024%2C464&ssl=1)

---

## Use cases for the `infinity` keyword

There’s a `calc()` keyword called `infinity`, which can be negative (`-infinity`). If you’re wondering why you’d ever need such numbers, Adam Argyle explained [**the different use cases for `infinity`**](/nerdy.dev/css-infinity-use-cases.md) in this really interesting read.

There’s one that I’d like to add, though:

```css
corner-shape: square;
/* is equivalent to */
corner-shape: superellipse(infinity);

corner-shape: notch;
/* is equivalent to */
corner-shape: superellipse(-infinity);
```

Basically, `infinity` makes rounded corners like, not rounded *at all* (i.e., technically rounded but squared/notched to the naked eye).

---

## Should lazy loading be the default?

Lea Verou said this about lazy loading:

::: info "Lea Verou, Phd" *From Bluesky* (<VPIcon icon="fa-brands fa-bluesky"/><code>lea.verou.me</code>)

> This is exactly why we need something like [<VPIcon icon="fa-brands fa-blusky"/>`@tabatkins.com`](https://bsky.app/profile/tabatkins.com)'s old CAS proposal.
>
> Imagine if you could do

```css
img, video { loading: lazy; }
```

> to change the defaults, and then just use `loading="eager"` on the actual elements to override.

[\[image or embed\]](https://bsky.app/profile/did:plc:eagnfcoqnbtzpkglrtej6ayg/post/3mqrg5oqix22h?ref_src=embed)

<SiteInfo
  name="Lea Verou, PhD (@lea.verou.me)"
  desc="This is exactly why we need something like @tabatkins.com's old CAS proposal. Imagine if you could do ..."
  url="https://bsky.app/profile/lea.verou.me/post/3mqrg5oqix22h/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:eagnfcoqnbtzpkglrtej6ayg/bafkreifqblqmhftcg7nlualjssskxth7dll6q5najlfee26yuzfkq2vm64"/>

:::

What do you think? Make sure to read the comments!

---

## 3 ways to animate hand-drawn text

Johannes Bechberger showcased [<VPIcon icon="fas fa-globe"/>three ways to animate hand-drawn text](https://mostlynerdless.de/blog/2026/07/17/animating-text-as-handrawn-with-css/). SVG scares the heck out of me to be honest, but Johannes cuts right to chase in the code comments.

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/07/CleanShot-2026-07-31-at-06.07.11.mp4" />

> Source: [<VPIcon icon="fas fa-globe"/>Mostly Nerdless](https://mostlynerdless.de/blog/2026/07/17/animating-text-as-handrawn-with-css/).

---

## An introduction to container ‘stuck’ queries

Chris Coyier demonstrated [**how to query whether an element is stuck using container scroll state queries**](/master.dev/lessons-learned-rewriting-a-sticky-detector.md) (more specifically, using `@container scroll-state(stuck: <keyword>)`). This is one of those new container queries; although, neither Safari nor Firefox supports it yet.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f5d94-74b8-7052-9db1-f653635a7ceb/fabdf8101cbd5f7684ecb22c3856396b"
  title="Modernized Search Box Content Moves to Fixed Header"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## New web platform updates and features

- [<VPIcon icon="fa-brands fa-firefox"/>Firefox 153](https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/153)
  - A number of interoperability improvements
  - [<VPIcon icon="fa-brands fa-firefox"/>Picture-in-Picture API](https://developer.mozilla.org/en-US/docs/Web/API/Picture-in-Picture_API) (now Baseline)
- [<VPIcon icon="fa-brands fa-chrome"/>Chrome 151](https://developer.chrome.com/release-notes/151)
  - [<VPIcon icon="fa-brands fa-chrome"/>`<usermedia>`](https://developer.chrome.com/blog/usermedia-html-element) (no Safari or Firefox support)
  - A whole bunch of interoperability improvements too

Want to see something weird? [<VPIcon icon="fa-brands fa-chrome"/>Chrome’s roadmap](https://chromestatus.com/roadmap) appears to be scheduled up for the next 14 years, stopping right after Chrome 499 specifically.

We’ll be on **What’s !important #354** by then!

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/07/3.png?resize=1024%2C642&ssl=1)

Anyway, until next time (**What’s !important #17**).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #16: sibling-index() Animations, Use Cases for the infinity Keyword, Container Stuck Queries, and More",
  "desc": "The soon-Baseline sibling-index() function for animations, CSS and the 2026 FIFA World Cup, use cases for the infinity keyword, container ”stuck” queries, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-16.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
