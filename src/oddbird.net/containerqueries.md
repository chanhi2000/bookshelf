---
lang: en-US
title: "ContainerQueries:aQuickStartGuide"
description: "Article(s) > ContainerQueries:aQuickStartGuide"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - oddbird.net
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > ContainerQueries:aQuickStartGuide"
    - property: og:description
      content: "ContainerQueries:aQuickStartGuide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/oddbird.net/containerqueries.html
prev: /programming/css/articles/README.md
date: 2021-04-05
isOriginal: false
author:
  - name: David A. Herron
    url : https://oddbird.net/authors/davidh/
cover: https://oddbird.net/assets/images/blog/2021/widequote-1408w.jpeg
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
  name="ContainerQueries:aQuickStartGuide"
  desc="Now is the time to begin experimenting with a long requested layout tool."
  url="https://oddbird.net/2021/04/05/containerqueries/"
  logo="https://oddbird.net/safari-pinned-tab.svg"
  preview="https://oddbird.net/assets/images/blog/2021/widequote-1408w.jpeg"/>

The `@container` query, that elusive feature developers have been requesting and proposing for years, has finally made its debut in a browser. Well, sort of. Here we’ll explain what container queries are, how they work, and what other features they might come with once fully supported in browsers.

::: note Update March 21, 2025:

🥳 Container queries have been available to use in all major browsers since February 2023. We’ve updated the guide with changes and developments that have happened since we first published.

- New [containment types](#syntax-and-an-example) have been added and other implied or planned containment behavior has been adjusted or removed.
- Some [features that were being considered](#what%E2%80%99s-next%3F) have landed in browsers, while some are only partially implemented.

:::

In the latest version of [<VPIcon icon="fa-brands fa-google"/>Chrome Canary](https://google.com/chrome/canary/), the most recent `@container` query proposal is available for use behind an experimental flag. Developed by OddBird’s own [<VPIcon icon="iconfont icon-oddbird"/>Miriam Suzanne](https://oddbird.net/authors/miriam/), the [draft (<VPIcon icon="iconfont icon-github" />`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5796) builds upon the ideas previously proposed by other web standards experts like David Baron, who wrote the [original draft (<VPIcon icon="iconfont icon-github" />`dbaron/container-queries-implementability`)](https://github.com/dbaron/container-queries-implementability).

---

## Background

`@Media` queries sparked a responsive design revolution by allowing authors to change the style of elements based on the size of the entire viewport. Up until now, what could not be done was changing the style of an element based on the size of one of its nearest containers.

---

## Syntax and an example

The proposed `@container` query syntax feels a lot like writing a `@media` query, but a main difference is that a `@container` query has to be implemented in two parts.

In this demo (which only works in the latest version of [<VPIcon icon="fa-brands fa-google"/>Chrome Canary](https://google.com/chrome/canary/)), a `blockquote` is styled differently depending on the size of its container.

https://codepen.io/dvdherron/pen/YzpywrZ
container query demo with blockquotes

### Define a containment context

To achieve this, first define a containment context. This lets the browser know which container to query against later and how exactly to query that specific container.

```scss
article,
section {
  container-type: inline-size;
}
```

The `container-type`[^1] property turns on containment for the selected elements, allowing for the testing of aspects such as style, size, and state.

[^1]: Syntax for establishing a containment context was updated **July 14, 2021** to use the new `container-type` and `container-name` properties instead of `contain`.

The `inline-size` value specifies that, in this case, queries will be made against the containing element’s [<VPIcon icon="fas fa-globe"/>inline axis](https://drafts.csswg.org/css-writing-modes-4/#inline-axis). [<VPIcon icon="fas fa-globe"/>`Layout`](https://drafts.csswg.org/css-contain/#valdef-contain-layout) and [<VPIcon icon="fas fa-globe"/>`size`](https://drafts.csswg.org/css-contain/#size-containment)[^2] containment are applied automatically as well.

[^2]: A previous version of this article listed `style` and `layout` as required values for the `contain` property when establishing a containment context. These values are now automatically applied when using the new `container-type` and `container-name` properties. Updated **July 14, 2021**.

(`Block-size` is also being considered as a containment type in the new proposal. `Inline-size` seemed to satisfy more use-cases, so is being developed first.)

::: note Update March 21, 2025

- `Inline-size` containment has been well-supported since container queries were supported in stable versions of browsers.
- `Layout` containment was previously applied automatically when `container-type` and `container-name` properties were used. It has since been removed from the container queries specification, but is still applied in some browsers that have not updated their implementation of container queries.
- Single-axis `block-size` containment proved to be impossible and has since been abandoned.
- The `size` containment type, which queries in both the inline and block axes, has been available as a containment type in all browsers since February 2023. Setting `container-type: size` allows for querying the container’s orientation and aspect-ratio in addition to its size.

:::

Containers can also be named:

```scss
article,
section {
  container-name: demo;
  container-type: inline-size;
}
```

And the `container-type` and `container-name` properties can be combined by using the `container` shorthand property:[^3]

[^3]: The two values of the shorthand were originally reversed, with `container-type` and then `container-name`. Updated **August 18, 2022**.

```scss
article,
section {
  container: demo / inline-size;
}

 @container demo (min-width: 30em) {
   .element {
      /* styles to apply */
   }
 }
```

### Apply @-rules at desired breakpoints

Now that a containment context has been defined, the `@container` rule is used to tell the browser when and how styles should change inside each container.

With a narrow parent container, the `blockquote` features the image stacked on top of the text.

![The profile image sits on top of the quote in narrow containers.](https://oddbird.net/assets/images/blog/2021/narrowquote-480w.jpeg)

At the first breakpoint, the layout for the `blockquote` changes so that the profile image moves from being above the quote to sitting next to it, and the text describing the speaker gets a heavier weight applied.

![The profile image changes position at the first breakpoint to sit next to the quote.](https://oddbird.net/assets/images/blog/2021/break1-480w.jpeg)

```scss
/* change styles according to container size */
@container (min-width: 35em) {
  .quote {
    grid-gap: 1rem;
    grid-template: "media quote" auto/ max-content 1fr;
  }

  .media {
    align-items: center;
  }

  .source {
    font-weight: bold;
  }
}
```

At the second breakpoint, the size of the text for the quote and the attribution grows, the background changes color, and the overall shape of the `blockquote` changes by way of a `clip-path`.

![At a wider breakpoint, the blockquote gets a clip-path and a different background color.](https://oddbird.net/assets/images/blog/2021/break2-480w.jpeg)

```scss
@container (min-width: 60em) {

  .quote {
    --quote-size: 1.5rem;
    --quote-background: darkmagenta;
    clip-path: polygon(
      -0.04% 100.6%,
      1.12% -0.52%,
      95.65% 11.18%,
      96.46% 90.05%
    );
    padding: 1.25em 3em;
    max-width: unset;
  }

  .source {
    font-size: 1.1rem;
  }
}
```

Any styles inside of one of these `@container` blocks will be applied when the container fulfills the condition of the query.

Just as with `@media` queries, authors can write as many `@container` queries as needed.

---

## All together now

With each `blockquote` sitting in a different sized container, they all look slightly different, at the same viewport size.

![The same blockquote component gets styled differently depending on its container size.](https://oddbird.net/assets/images/blog/2021/allquotes-480w.jpeg)

---

## What’s next?

It’s still very early in the proposal process, so a lot regarding how container queries work could change.

- There might be a way to contain only the block axis.
- Queries could also be made against properties like `aspect-ratio`, `orientation,` or even [custom properties and layout states (<VPIcon icon="iconfont icon-github" />`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5989).
- We already have viewport-relative units like `vh` and `vw`. [Container-relative units (<VPIcon icon="iconfont icon-github" />`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5888) could be on the horizon as well.

::: note Update March 21, 2025

- [<VPIcon icon="fa-brands fa-firefox" />Container-relative units](https://developer.mozilla.org/en-US/docs/Web/CSS/length#container_query_length_units) have been available to use in all major browsers since February 2023.
- Most Chromium based browsers added support for [<VPIcon icon="fa-brands fa-firefox" />`scroll-state`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_conditional_rules/Container_scroll-state_queries) containment in February of 2025. As of this update, it’s available in a browser preview version of Opera.
- Style queries – the ability to query a computed value of a containing element – have been partially implemented by most browsers (no support in Firefox yet). The current implementation allows for the querying of custom property values:

```css
    @container style(--theme: light) {
      /* styles to apply here */
    }
```

Browsers are still working on adding support for using style queries to evaluate booleans (`@container style(gap) {...}`) and property-value pairs (`@container style(display: flex) {...}`).
- Size queries have made it possible to now query a containing element’s `aspect-ratio` and orientation.

:::

Bookmark Miriam’s scratch site for updates: [<VPIcon icon="iconfont icon-oddbird"/>Miriam’s CSS Sandbox](https://css.oddbird.net/rwd/query/).

To participate in discussions and implementation questions related to `container` queries, visit this project board: [Open Issues & Work on the Contain 3 Spec (<VPIcon icon="iconfont icon-github" />`orgs/w3c`)](https://github.com/orgs/w3c/projects/108).

---

## Experiment and share

Follow these steps to get started experimenting and making your own demos:

- Download [<VPIcon icon="fa-brands fa-google"/>Chrome Canary](https://google.com/chrome/canary/) or update to the latest version.
- Navigate to `chrome://flags`.
- Search for “CSS container queries” and select `Enabled`.
- Restart the browser.

The OddBird team would love to see what you come up with. Tag us on [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`OddBird`)](https://x.com/OddBird) with a link to whatever you create. In the meantime, check out our collection of demos on [<VPIcon icon="fa-brands fa-codepen"/>CodePen](https://codepen.io/collection/XQrgJo?grid_type=grid&sort_by=item_created_at&sort_order=desc) for inspiration.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "ContainerQueries:aQuickStartGuide",
  "desc": "Now is the time to begin experimenting with a long requested layout tool.",
  "link": "https://chanhi2000.github.io/bookshelf/oddbird.net/containerqueries.html",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```
