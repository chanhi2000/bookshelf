---
lang: en-US
title: "What’s !important #11: 3D Voxel Scenes, Flying Focus, CSS Syntaxes, and More"
description: "Article(s) > What’s !important #11: 3D Voxel Scenes, Flying Focus, CSS Syntaxes, and More"
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
      content: "Article(s) > What’s !important #11: 3D Voxel Scenes, Flying Focus, CSS Syntaxes, and More"
    - property: og:description
      content: "What’s !important #11: 3D Voxel Scenes, Flying Focus, CSS Syntaxes, and More"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-11.html
prev: /programming/css/articles/README.md
date: 2026-05-15
isOriginal: false
author:
  - name: Daniel Schwarz
    url: https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/wh11.jpg
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
  name="What’s !important #11: 3D Voxel Scenes, Flying Focus, CSS Syntaxes, and More"
  desc="If 3D voxel scenes (that you can style), flying focus animations, or new CSS syntaxes sound like your kinda thing, then this issue of What’s !important is definitely for you."
  url="https://css-tricks.com/whats-important-11"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/wh11.jpg"/>

If 3D voxel scenes (that you can style), flying focus animations, or new CSS syntaxes sound like your kinda thing, then this issue of **What’s !important** is definitely for you.

Also featuring Polypane, scroll-driven animations, and the latest web platform updates from Chrome 148 and Safari 26.5. ---

## Heerich.js for 3D voxel scenes

Inspired by the [<VPIcon icon="fa-brands fa-google"/>sculptures of Erwin Heerich](https://google.com/search?q=erwin+heerich+sculptures&udm=2), [<VPIcon icon="fas fa-globe"/>David Aerne](https://elastiq.ch/) created [<VPIcon icon="fas fa-globe"/>Heerich.js](https://meodai.github.io/heerich/), a tiny engine for creating 3D voxel scenes. They’re rendered as SVG, and because we can use CSS variables in SVG, the scenes are basically styleable using CSS.

![A clean, minimal isometric visualization of a large 3D grid with a small black cube, accompanied by explanatory text about alignment logic and visual styles.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/1-1024x642.png?resize=1024%2C642&ssl=1)

---

## Polypane snippets

Polypane, widely considered to be the best browser for web development, launched a [<VPIcon icon="fas fa-globe"/>snippet store](https://polypane.app/snippets/). So, if you wanted to click on a component and copy the basic HTML without all of the “bloaty crap”, the [1-Click De-crapulator](https://polypane.app/snippets/?snippet=1-click-de-crapulator) is what you’d want. Fantastic name, by the way.

![A card-based web interface for the Polypane Snippet Store featuring a sidebar with various filters and a collection of snippets for web development and accessibility.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/05/2-1024x642.png?resize=1024%2C642&ssl=1)

---

## Animating focus with view transitions

Chris Coyier showed us [**how to animate focus with view transitions**](/frontendmasters.com/animating-focus-with-view-transitions.md). He also contrasted “unnecessary motion” with WebAIM’s conditional `prefers-reduced-motion` implementation, which I think is the right approach, because I find it difficult to keep track of focus even when it’s really visible.

<CodePen
  user="https://codepen.io/editor/chriscoyier/pen/019dff8d-6d05-725b-beba-10710e805dab"
  title="View Transition Focus Movement (3)"
  :default-tab="['css','result']"
  :theme="dark"/>

Either way, it’s a fantastic exploration of techniques. In addition, way down in the comments, Kilian Valkhof (founder of Polypane, actually) shared his [<VPIcon icon="fas fa-globe"/>CSS-only technique for floating focus](https://polypane.app/blog/css-only-floating-focus-with-anchor-positioning/) (or, as Chris calls it, “flying focus”).

---

## The `of <selector>` syntax

[Paweł Grzybek mentioned (<VPIcon icon="fa-brands fa-bluesky"/>`pawelgrzybek.com`)](https://bsky.app/profile/pawelgrzybek.com/post/3ml4nheptqc2z) that the `of <selector>` syntax is actually well supported (Baseline) now, but honestly, I hadn’t even heard of it.

::: info Pawel Grzybek (<VPIcon icon="fa-brands fa-bluesky"/><code>pawelgrzybek.com</code>)

I knew that the CSS :nth-child(n of selector) is a thing, but I didn’t know how well supported it is nowadays. Another thing I didn’t know is that I can use CSS nesting with it like in the example below. Modern CSS is incredible ❣️

<SiteInfo
  name=":nth-child() CSS pseudo-class - CSS | MDN"
  desc="The :nth-child() CSS pseudo-class matches elements based on the indexes of the elements in the child list of their parents. In other words, the :nth-child() selector selects child elements according to their position among all the sibling elements within a parent element."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:nth-child#of_selector_syntax_vs_selector_nth-child"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

[<VPIcon icon="fa-brands fa-bluesky"/>#css](https://bsky.app/hashtag/css)

<SiteInfo
  name="Paweł Grzybek (@pawelgrzybek.com)"
  desc="I knew that the CSS :nth-child(n of selector) is a thing, but I didn’t know how well supported it is nowadays. Another thing I didn’t know is that I can use CSS nesting with it like in the example below. Modern CSS is incredible ❣️ ..."
  url="https://bsky.app/profile/pawelgrzybek.com/post/3ml4nheptqc2z"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:mdzzw3bmt7jyif4bcvuyeboj/bafkreihrzifp537itra3b5d3jlxqgdivvraazf6x4svhzlovetvtfvatfu"/>

:::

The following selector means, “from all siblings, select the second `.intro`, but only if it’s a `<div>`.” It’s kind of like `div:nth-of-type(2)`, except *that* can only select elements of the same type, whereas `of <selector>` works with any selector.

```css
div:nth-child(2 of .intro) {
  /* ... */
}
```

Given that `&` is equivalent to the *parent selector* (so, `.intro`), the second example means “from all siblings, select the second `.intro` within `.intro`. Also, because there isn’t anything before `:nth-child()`, `.intro` can be anything this time around.

```css
.intro {
  :nth-child(2 of &) {
    /* ... */
  }
}
```

There’s so much happening with CSS right now, so I find it really useful when something I’ve missed comes back around like this. Though funnily enough, as I’m typing this, I’m seeing that [**Preethi Sam**](/css-tricks.com/author.md#preethi/) wrote an article on the [**`of <selector>` syntax**](/frontendmasters.com/css-n-of-selectors-for-conditional-validation.md) a bit over a week ago (*\*adds to reading list\**).

---

## Understanding the range syntax

The range syntax is a new(ish), more readable syntax with comparison operators (`>`, `<`, `>=`, and `<=`) for media queries and container queries. Ahmad Shadeed expertly explained [**how the range syntax works**](/ishadeed.com/range-syntax.md), but keep a close eye on browser support. Web browsers are still shipping container queries and the range syntax for those queries has to be shipped independently. For example, container style queries are shipping in Firefox 151 next week, but the range syntax for container style queries will ship with a flag.

It’s an easy thing to miss (don’t ask me how I know).

---

## Understanding scroll-driven animations

Scroll-driven animations can be kinda tough (especially those with `view()` timelines), but Josh Comeau’s expert [<VPIcon icon="fas fa-gobe"/>explanation of scroll-driven animations](https://joshwcomeau.com/animation/scroll-driven-animations/) makes them so much easier to understand. With scroll-*triggered* animations on the way, I highly recommend mastering scroll-driven animations first (if you haven’t already). Again, don’t ask me how I know (*\*cries in CSS\**).

::: note New web platform updates

- [<VPIcon icon="fa-brands fa-chrome"/>Chrome 148](https://developer.chrome.com/release-notes/148)
  - Name-only [**container queries**](/css-tricks.com/css-container-queries.md) (now Baseline)
  - [<VPIcon icon="fa-brands fa-firefox"/>`revert-rule`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/revert-rule) keyword (no *stable* Safari support)
  - [**`at-rule()`**](/css-tricks.com/almanac-rules/supports.md#the-future-and-present-of-feature-support-queries:~:text=%40supports%20at%2Drule(%40layer)%20%7B%0A%20%20/*%20%40layer%20is%20supported%20*/%0A%7D) function for feature queries (no Safari or Firefox support)
  - [**`loading`**](/web.dev/browser-level-image-lazy-loading.md) attribute for `<video>`/`<audio>` (no Safari or Firefox support)
- [<VPIcon icon="fa-brands fa-safari"/>Safari 26.5](https://webkit.org/blog/17938/webkit-features-for-safari-26-5/)
  - [**`:open`**](/css-tricks.com/almanac-pseudo-selectors/open.md) pseudo-class (now Baseline)
  - Updated [**`random()`**](/css-tricks.com/almanac-functions/random.md) function (no Chrome or Firefox support)

:::

Inspired by [this lovely comment (<VPIcon icon="fa-brands fa-bluesky"/>`georgerodier.com`)](https://bsky.app/profile/georgerodier.com/post/3mkptwxibxc2u/), we’d just like to thank our authors for all of the incredible work that they do, as well as the many other educators out there that we undoubtably learn from and become inspired by. Keep on keeping on, CSS-Tricksters!

::: info George Rodier (<VPIcon icon="fa-brands fa-bluesky"/><code>georgeroider.com</code>)

I'm not a CSS expert, but expert CSS educators are my favorite. Their design skills, ability to take full advantage of the web platform, AND general enthusiasm for building for the web is unmatched by other types of developers!

<SiteInfo
  name="George Rodier (@georgerodier.com)"
  desc="I'm not a CSS expert, but expert CSS educators are my favorite. Their design skills, ability to take full advantage of the web platform, AND general enthusiasm for building for the web is unmatched by other types of developers!"
  url="https://bsky.app/profile/did:plc:dk66belhjtfadbud2kpbq6sc/post/3mkptwxibxc2u"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/avatar_thumbnail/plain/georgeroider.com/bafkreicsmacnv6omeh3ojag4u2daotenc272hhbdcuczchtr765td5ocya"/>

:::

Until next time!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What’s !important #11: 3D Voxel Scenes, Flying Focus, CSS Syntaxes, and More",
  "desc": "If 3D voxel scenes (that you can style), flying focus animations, or new CSS syntaxes sound like your kinda thing, then this issue of What’s !important is definitely for you.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/whats-important-11.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
