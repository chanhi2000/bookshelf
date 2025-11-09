---
lang: en-US
title: "CSS Container Queries"
description: "Article(s) > CSS Container Queries"
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
      content: "Article(s) > CSS Container Queries"
    - property: og:description
      content: "CSS Container Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/css-container-queries.html
prev: /programming/css/articles/README.md
date: 2024-09-26
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2024/06/%40container.webp
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
  name="CSS Container Queries"
  desc="The main idea of CSS Container Queries is to register an element as a “container” and apply styles to other elements when the container element meets certain conditions."
  url="https://css-tricks.com/css-container-queries"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2024/06/%40container.webp"/>

Container queries are often considered a modern approach to responsive web design where traditional media queries have long been the gold standard — the reason being that we can create layouts made with elements that respond to, say, *the width of their containers* rather than *the width of the viewport*.

```css
.parent {
  container-name: hero-banner;
  container-type: inline-size;

  /* or container: hero-banner / inline-size; */
}

}

.child {
  display: flex;
  flex-direction: column;
}

/* When the container is greater than 60 characters... */
@container hero-banner (width > 60ch) {
  /* Change the flex direction of the .child element. */
  .child { 
    flex-direction: row;
  }
}
```

::: important Why care about CSS Container Queries?

1. When using a container query, we give elements the ability to change based on their *container’s size*, not the viewport.
2. They allow us to define all of the styles for a particular element in a more *predictable* way.
3. They are more *reusable* than media queries in that they behave the same no matter where they are used. So, if you were to create a component that includes a container query, you could easily drop it into another project and it will still behave in the same predictable fashion.
4. They introduce *new types of CSS length units* that can be used to size elements by their container’s size.

:::

---

## Registering Elements as Containers

```css
.cards {
  container-name: card-grid;
  container-type: inline-size;

  /* Shorthand */
  container: card-grid / inline-size;
}
```

This example registers a new container named `card-grid` that can be queried by its `inline-size`, which is a fancy way of saying its “width” when we’re working in a horizontal writing mode. It’s a [**logical property**](/css-tricks.com/css-logical-properties.md). Otherwise, “inline” would refer to the container’s “height” in a vertical writing mode.

- The `**container-name**` property is used to register an element as a container that applies styles to other elements based on the container’s size and styles.
- The `**container-type**` property is used to register an element as a container that can apply styles to other elements when it meets certain conditions.
- The `container` property is a shorthand that combines the `container-name` and `container-type` properties into a single declaration.

::: tip Some Possible Gotchas

- **The `container-name` property is optional.** An unnamed container will match any container query that does not target a specific container, meaning it could match multiple conditions.
- **The `container-type` property is required if we want to query a container by its `size` or `inline-size`.** The `size` refers to the container’s *inline* or *block* direction, whichever is larger. The `inline-size` refers to the container’s width in the default horizontal writing mode.
- **The `container-type` property’s default value is `normal`.** And by “normal” that means all elements are containers by default, only they are called *Style Containers* and can only be queried by their applied styles. For example, we can query a container’s `background-color` value and apply styles to other elements when the value is a certain color value.
- **A container cannot change its own styles.** Rather, they change the styles of their *contents* instead. In other words, we cannot change the container’s `background-color` when it is a certain size — but we can change the `background-color` of any element *inside* the container. *“You cannot style what you query”* is a way to think about it.
- **A container cannot be sized by what’s in it.** Normally, an element’s contents influence its size — as in, the more content in it, the larger it will be, and vice versa. But a container must be sized explicitly as part of a flex or grid layout.

:::

---

## Querying a Container

```css
@container my-container (width > 60ch) {
  article {
    flex-direction: row;
  }
}
```

- The `**@container**` at-rule property informs the browser that we are working with a container query rather than, say, a media query (i.e., `@media`).

- The `**my-container**` part in there refers to the container’s name, as declared in the container’s `container-name` property.

- The **`article`** element represents an item in the container, whether it’s a direct child of the container or a further ancestor. Either way, the element must be in the container and it will get styles applied to it when the queried condition is matched.

::: tip Some Possible Gotchas

- **The container’s name is optional.** If we leave it out, then *any* registered container would match when the conditions are met.
- **A container’s `width` can be queried with when the `container-type` property is set to *either* `size` or `inline-size`.** That’s because `size` can query the element’s `width` or `height`; meanwhile, `inline-size` can only refer to the `width`.
- **You can query any length.** So, in addition to `width` (i.e., `inline-size`), there’s an element’s `aspect-ratio`, `block-size` (i.e., `height`), and orientation (e.g. `portrait` and `landscape`).
- **Queries support the range syntax.** Most of the examples so far have shown “greater than” (`>`) and “less than” (`<`), but there is also “equals” (`=`) and combinations of the three, such as “more than or equal to” (`>=`) and “less than or equal to” (`<=`).
- **Queries can be chained.** That means we can write queries that meet multiple conditions with logical keywords, like `and`, `or`, and `not`.

:::

---

## Container Queries Properties & Values

### `container-name`

```css
container-name: none | <custom-ident>+;
```

::: details Value Descriptions

- **`none`:** The element does not have a container name. This is true by default, so you will likely never use this value, as its purpose is purely to set the property’s default behavior.
- **`<custom-ident>`:** This is the name of the container, which can be anything, except for words that are reserved for other functions, including `default`, `none`, `at`, `no`, and `or`. Note that the names are not wrapped in quotes.

:::

[<VPIcon icon="iconfont icon-css-tricks"/>Open in Almanac](https://css-tricks.com/almanac/properties/c/container-name/)

::: info

- **Initial value:** `none`
- **Applies to:** All elements
- **Inherited:** No
- **Percentages:** N/A
- **Computed value:** `none` or an ordered list of identifiers
- **Canonical order:** Per grammar
- **Animation:** Not animatable

:::

### `container-type`

```css
container-type: normal | size | inline-size;
```

::: details Value Descriptions

- **`normal`:** This indicates that the element is a container that can be queried by its styles rather than size. [**All elements are technically containers by default**](/css-tricks.com/digging-deeper-into-container-style-queries/), so we don’t even need to explicitly assign a `container-type` to define a style container.
- **`size`:** This is if we want to query a container by its size, whether we’re talking about the inline or block direction.
- **`inline-size`:** This allows us to query a container by its inline size, which is equivalent to `width` in a standard horizontal writing mode. This is perhaps the most commonly used value, as we can establish responsive designs based on element size rather than the size of the viewport as we would normally do with [**media queries**](/css-tricks.com/a-complete-guide-to-css-media-queries.md).

:::

[<VPIcon icon="iconfont icon-css-tricks"/>Open in Almanac](https://css-tricks.com/almanac/properties/c/container-type/)

::: info

- **Initial value:** `normal`
- **Applies to:** All elements
- **Inherited:** No
- **Percentages:** N/A
- **Computed value:** As specified by keyword
- **Canonical order:** Per grammar
- **Animation:** Not animatable

:::

### `container`

```css
container: <'container-name'> [ / <'container-type'> ]?
```

::: details Value Definitons

If `<'container-type'>` is omitted, it is reset to its initial value of `normal`which defines a style container instead of a size container. In other words, all elements are style containers by default, unless we explicitly set the `container-type` property value to either `size` or `inline-size` which allows us to query a container’s size dimensions.

:::

[<VPIcon icon="iconfont icon-css-tricks"/>Open in Almanac](https://css-tricks.com/almanac/properties/c/container/)

::: info

- **Initial value:** `none` / `normal`
- **Applies to:** All elements
- **Inherited:** No
- **Percentages:** N/A
- **Computed value:** As specified
- **Canonical order:** Per grammar
- **Animation:** Not animatable

:::

---

## Container Length Units

### Container Width & Height Units

| Unit | Name | Equivalent to… |
| --- | --- | --- |
| `cqw` | Container query width | 1% of the queried container’s width |
| `cqh` | Container query height | 1% of the queried container’s height |

![](https://css-tricks.com/wp-content/uploads/2024/05/container-query-units-cqw-cqh.svg)

### Container Logical Directions

| Unit | Name | Equivalent to… |
| --- | --- | --- |
| `cqi` | Container query inline size | 1% of the queried container’s inline size, which is its width in a horizontal writing mode. |
| `cqb` | Container query block size | 1% of the queried container’s inline size, which is its height in a horizontal writing mode. |

![](https://css-tricks.com/wp-content/uploads/2024/05/container-units-1.svg)

### Container Minimum & Maximum Lengths

| Unit | Name | Equivalent to… |
| --- | --- | --- |
| `cqmin` | Container query minimum size | The value of `cqi` or `cqb`, whichever is smaller. |
| `cqmax` | Container query maximum size | The value of `cqi` or `cqb`, whichever is larger. |

![](https://css-tricks.com/wp-content/uploads/2024/05/container-queries-units-cqmin-cqmax.svg)

---

## Container Style Queries

Container Style Queries is another piece of the CSS Container Queries puzzle. Instead of querying a container by its `size` or `inline-size`, we can query a container’s CSS styles. And when the container’s styles meet the queried condition, we can apply styles to other elements. This is the sort of “conditional” styling we’ve wanted on the web for a long time: *If these styles match over here, then apply these other styles over there.*

CSS Container Style Queries are only available as an experimental feature in modern web browsers at the time of this writing, and even then, style queries are only capable of evaluating CSS custom properties (i.e., variables).

Browser Support

The feature is still considered **experimental** at the time of this writing and is not supported by any browser, unless enabled through feature flags.

This browser support data is from [Caniuse](http://caniuse.com/#feat=css-container-queries-style), which has more detail. A number indicates that browser supports the feature at that version and up.

### Desktop

| Chrome | Firefox | IE | Edge | Safari |
| --- | --- | --- | --- | --- |
| 145 | No | No | 142 | TP |

### Mobile / Tablet

| Android Chrome | Android Firefox | Android | iOS Safari |
| --- | --- | --- | --- |
| 142 | No | 142 | 26.1 |

### Registering a Style Container

```css
article {
  container-name: card;
}
```

That’s really it! Actually, we don’t even need the `container-name` property unless we need to target it specifically. Otherwise, we can skip registering a container altogether.

And if you’re wondering why there’s no `container-type` declaration, that’s because **all elements are already considered containers**. It’s a lot like how all elements are `position: static` by default; there’s no need to declare it. The only reason we would declare a `container-type` is if we want a CSS Container Size Query instead of a CSS Container Style Query.

So, really, **there is no need to register a container style query** because all elements are already style containers right out of the box! The only reason we’d declare `container-name`, then, is simply to help select a specific container by name when writing a style query.

### Using a Style Container Query

```css
@container style(--bg-color: #000) {
  p { color: #fff; }
}
```

In this example, we’re querying any matching container (because all elements are style containers by default).

Notice how the syntax it’s a lot like a traditional [media query](https://css-tricks.com/a-complete-guide-to-css-media-queries/)? The biggest difference is that we are writing `@container` instead of `@media`. The other difference is that we’re calling a `style()` function that holds the matching style condition. This way, a style query is differentiated from a size query, although there is no corresponding `size()` function.

In this instance, we’re checking if a certain custom property named `--bg-color` is set to black (`#000`). If the variable’s value matches that condition, then we’re setting paragraph (`p`) text `color` to white (`#fff`).

### Custom Properties & Variables

```css
.card-wrapper {
  --bg-color: #000;
}
.card {
  @container style(--bg-color: #000) {
    /* Custom CSS */
  }
}
```

### Nesting Style Queries

```css
@container style(--featured: true) {
  article {
    grid-column: 1 / -1;
  }
  @container style(--theme: dark) {
    article {
      --bg-color: #000;
      --text: #fff;
    }
  }
}
```

---

## Specification

CSS Container Queries are defined in the [<VPIcon icon="fas fa-globe"/>CSS Containment Module Level 5 specification](https://drafts.csswg.org/css-conditional-5/#container-queries), which is currently in Editor’s Draft status at the time of this writing.

---

## Browser Support

Browser support for CSS Container Size Queries is great. It’s just style queries that are lacking support at the time of this writing.

- [<VPIcon icon="fa-brands fa-chrome"/>Chrome 105](https://developer.chrome.com/blog/new-in-chrome-105/) shipped on August 30, 2022, with support.
- [<VPIcon icon="fa-brands fa-safari"/>Safari 16](https://webkit.org/blog/13152/webkit-features-in-safari-16-0/) shipped on September 12, 2022, with support.
- [<VPIcon icon="fa-brands fa-firefox"/>Firefox 110](https://mozilla.org/en-US/firefox/110.0/releasenotes/) shipped on February 14, 2023, with support.

This browser support data is from [<VPIcon icon="fas fa-globe"/>Caniuse](http://caniuse.com/#feat=css-container-queries), which has more detail. A number indicates that browser supports the feature at that version and up.

### Desktop

| Chrome | Firefox | IE | Edge | Safari |
| --- | --- | --- | --- | --- |
| 106 | 110 | No | 106 | 16.0 |

### Mobile / Tablet

| Android Chrome | Android Firefox | Android | iOS Safari |
| --- | --- | --- | --- |
| 142 | 144 | 142 | 16.0 |

---

## Demos!

Many, many examples on the web demonstrate how container queries work. The following examples are not unique in that regard in that they illustrate the general concept of applying styles when a container element meets a certain condition.

You will find plenty more examples listed in the [References](#references) at the end of this guide, but check out [<VPIcon icon="fas fa-globe"/>Ahmad Shadeed’s Container Queries Lab](https://lab.ishadeed.com/container-queries/) for the most complete set of examples because it also serves as a collection of clever container query use cases.

### Card Component

In this example, a “card” component changes its layout based on the amount of available space in its container.

### Call to Action Panel

This example is a lot like those little panels for signing up for an email newsletter. Notice how the layout changes three times according to how much available space is in the container. This is what makes CSS Container Queries so powerful: you can quite literally drop this panel into any project and the layout will respond as it should, as it’s based on the space it is in rather than the size of the browser’s viewport.

<CodePen
  user="geoffgraham"
  slug-hash="BaeRvBL"
  title="Container Queries: Call to Action Panel"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Stepper Component

This component displays a series of “steps” much like a timeline. In wider containers, the stepper displays steps horizontally. But if the container becomes small enough, the stepper shifts things around so that the steps are vertically stacked.

<CodePen
  user="geoffgraham"
  slug-hash="PovmymB"
  title="Container Queries: Stepper Component"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Icon Button

Sometimes we like to decorate buttons with an icon to accentuate the button’s label with a little more meaning and context. And sometimes we don’t know just how wide that button will be in any given context, which makes it tough to know when exactly to hide the icon or re-arrange the button’s styles when space becomes limited. In this example, an icon is displayed to the right edge of the button as long as there’s room to fit it beside the button label. If room runs out, the button becomes a square tile that stacks the icons above the label. Notice how the `border-radius` is set in **container query units**, `4cqi`, which is equal to 4% of the container’s inline-size (i.e. width) and results in rounder edges as the button grows in size.

<CodePen
  user="geoffgraham"
  slug-hash="VwObEZp"
  title="Container Queries: Icon Button"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Pagination

Pagination is a great example of a component that benefits from CSS Container Queries because, depending on the amount of space we have, we can choose to display links to individual pages, or hide them in favor of only two buttons, one to paginate to older content and one to paginate to newer content.

<CodePen
  user="geoffgraham"
  slug-hash="VwObVxR"
  title="Container Queries: Pagination"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Articles & Tutorials

### General Information

Say Hello to CSS Container Queries
https://css-tricks.com/say-hello-to-css-container-queries/

The Origin Story of Container Queries
https://css-tricks.com/the-origin-story-of-container-queries/

A Cornucopia of Container Queries
https://css-tricks.com/a-cornucopia-of-container-queries/

Container Query Discussion
https://css-tricks.com/container-query-discussion/

Container Queries: Once More Unto the Breach
https://css-tricks.com/container-queries-once-more-unto-the-breach/

Next Gen CSS: @container
https://css-tricks.com/next-gen-css-container/

251: Container Queries are the Future
https://css-tricks.com/newsletter/251-container-queries-are-the-future/

Let’s Not Forget About Container Queries
https://css-tricks.com/lets-not-forget-about-container-queries/

Minimal Takes on Faking Container Queries
https://css-tricks.com/minimal-takes-on-faking-container-queries/

The Raven Technique: One Step Closer to Container Queries
https://css-tricks.com/the-raven-technique-one-step-closer-to-container-queries/

### Container Size Query Tutorials

Media Queries in Times of @container
https://css-tricks.com/media_queries_in_times_of_container/

Can We Create a “Resize Hack” With Container Queries?
https://css-tricks.com/can-we-create-a-resize-hack-with-container-queries/

A Few Times Container Size Queries Would Have Helped Me Out
https://css-tricks.com/a-few-times-container-size-queries-would-have-helped-me-out/

A New Container Query Polyfill That Just Works
https://css-tricks.com/a-new-container-query-polyfill-that-just-works/

256: When to use @container queries
https://css-tricks.com/newsletter/256-when-to-use-container-queries/

iShadeed’s Container Queries Lab
https://css-tricks.com/ishadeeds-container-queries-lab/

Minimal Takes on Faking Container Queries
https://css-tricks.com/minimal-takes-on-faking-container-queries/

Playing With (Fake) Container Queries With watched-box & resizeasaurus
https://css-tricks.com/playing-with-fake-container-queries-with-watched-box-resizeasaurus/

### Container Style Queries

Early Days of Container Style Queries
https://css-tricks.com/early-days-of-container-style-queries/

Digging Deeper Into Container Style Queries
https://css-tricks.com/digging-deeper-into-container-style-queries/

### Almanac References

<SiteInfo
  name="container | CSS-Tricks"
  desc="The CSS container property is a shorthand that combines the container-name and container-type properties into a single declaration."
  url="https://css-tricks.com/almanac/properties/c/container//"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/css-tricks-logo-gradient-outline.png"/>

<SiteInfo
  name="container-name | CSS-Tricks"
  desc="The CSS container-name property is used to register an element as a container that applies styles to other elements based on the container's size and styles."
  url="https://css-tricks.com/almanac/properties/c/container-name//"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/css-tricks-logo-gradient-outline.png"/>

<SiteInfo
  name="container-type | CSS-Tricks"
  desc="The CSS container-type property is part of the Container Queries feature used to register an element as a container that can apply styles to other elements"
  url="https://css-tricks.com/almanac/properties/c/container-type//"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/12/css-tricks-logo-gradient-outline.png"/>

### Related Guides

CSS Media Queries Guide
https://css-tricks.com/a-complete-guide-to-css-media-queries/

CSS Custom Properties Guide
https://css-tricks.com/a-complete-guide-to-custom-properties/

---

## References

<SiteInfo
  name="Container Queries: a Quick Start Guide"
  desc="Now is the time to begin experimenting with a long requested layout tool."
  url="https://oddbird.net/2021/04/05/containerqueries//"
  logo="https://oddbird.net/favicon-16x16.png"
  preview="https://oddbird.net/assets/images/blog/2021/widequote-1408w.jpeg"/>

<SiteInfo
  name="CSS Containers, What Do They Know?"
  desc="A deep-dive introduction to CSS container queries"
  url="https://oddbird.net/talks/containers//"
  logo="https://oddbird.net/favicon-16x16.png"
  preview="https://oddbird.net/assets/images/talks/mudturtles-1600w.jpeg"/>

- [A Primer On CSS Container Queries](https://smashingmagazine.com/2021/05/complete-guide-css-container-queries/) (Smashing Magazine)
- [CSS Container Queries: Use-Cases And Migration Strategies](https://smashingmagazine.com/2021/05/css-container-queries-use-cases-migration-strategies/) (Smashing Magazine)

<SiteInfo
  name="An Interactive Guide to CSS Container Queries"
  desc="Learn how to use CSS container queries today."
  url="https://ishadeed.com/article/css-container-query-guide//"
  logo="https://ishadeed.com/assets/favicon-32x32.png"
  preview="https://ishadeed.com/assets/container-query/twitter-card.jpg"/>

 <SiteInfo
  name="iShadeed Lab - CSS Container Queries"
  desc="Demos and examples for CSS container queries."
  url="https://lab.ishadeed.com/container-queries/"
  logo="https://lab.ishadeed.com/img/favicon.png"
  preview="https://lab.ishadeed.com/container-queries/img/twitter-card.jpg"/>

```component VPCard
{
  "title": "Container queries - Designing in the Browser  |  web.dev",
  "desc": "Container queries are an experimental API that unlocks intrinsic component-level styling based on an element’s containing parent. This episode goes over how to use container queries, to highlight the responsive possibilities of tomorrow.",
  "link": "https://web.dev/shows/designing-in-the-browser/gCNMyYr7F6w/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v893b810958a0a119aa54e87c6f4f7fb5af7eacc01ad7a1f488382f3791697b7d/web/images/favicon.png",
  "background": "rgba(42,100,246,0.2)"
}
```

<SiteInfo
  name="CSS container queries - CSS | MDN"
  desc="Container queries enable you to apply styles to an element based on certain attributes of its container:"
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<VidStack src="youtube/3_-Je5XpbqY" />

```component VPCard
{
  "title": "Container Queries and Units",
  "desc": "Container queries are similar to media queries but allow you set styles based on a particular element’s current size, typically the width. This is super handy because you can write CSS in a way that gives flexibility to the layout! With @media queries, there’s a tight coupling of the styling of a component’s content and […]",
  "link": "/frontendmasters.com/container-queries-and-units.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<SiteInfo
  name="Container Query Units and Fluid Typography | Modern CSS Solutions"
  desc="To learn more about the behaviors of container query units, we'll explore three fluid typography techniques applied via a ”mixin” using custom properties. These upgraded methods will produce truly responsive typography, regardless of context."
  url="https://moderncss.dev/container-query-units-and-fluid-typography//"
  logo="https://moderncss.dev/favicon.png"
  preview="https://moderncss.dev/img/social/container-query-units-and-fluid-typography.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Container Queries",
  "desc": "The main idea of CSS Container Queries is to register an element as a “container” and apply styles to other elements when the container element meets certain conditions.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/css-container-queries.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
