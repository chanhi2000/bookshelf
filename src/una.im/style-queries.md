---
lang: en-US
title: "Style Queries"
description: "Article(s) > Style Queries"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - una.im
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Style Queries"
    - property: og:description
      content: "Style Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/una.im/style-queries.html
prev: /programming/css/articles/README.md
date: 2022-06-27
isOriginal: false
author:
  - name: Una Kravets
    url : https://una.im/about
cover: https://una.im/posts/style-queries/og-style-queries.jpg
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
  name="Style Queries"
  desc="Exploring when and how you would use style queries in your day-to-day work."
  url="https://una.im/style-queries/"
  logo="https://una.im/favicon.svg"
  preview="https://una.im/posts/style-queries/og-style-queries.jpg"/>

![](https://una.im/posts/photo-1583316174775-bd6dc0e9f298.avif)

You may have heard of [**container queries**](https://una.im/css-tricks.com/next-gen-css-container.md) and the new [<VPIcon icon="fas fa-globe"/>contain-level-3 spec](https://drafts.csswg.org/css-contain-3/) which is currently in [<VPIcon icon="iconfont icon-caniuse"/>experimental browsers](https://caniuse.com/css-container-queries), but have you heard of style container queries, which are also a part of this (very exciting) spec?

::: note ⚠️ Important Note

While a part of the contain-level-3 spec, style queries are *not* landing in the initial implementations of container queries in Chromium and Webkit. [<VPIcon icon="fa-brands fa-safari"/>Both browser engines](https://webkit.org/blog/12522/release-notes-for-safari-technology-preview-142/) currently [<VPIcon icon="fa-brands fa-gogle"/>plan to ship](https://groups.google.com/a/chromium.org/g/blink-dev/c/gwzxnTJDLJ8) with size query and container query unit support[^1].

:::

[^1]: Twitter by [<VPIcon icon="fa-brands fa-x-twitter"/>`jensimmons`](https://twitter.com/jensimmons/status/1506969133509980163)

Style queries let you query the *style* of any parent element within a page and apply styles to its children based on the styles of its parent. This sounds really cool, but in practice, why would you use this over something like a class or data attribute to apply the styles (both of which are much more performant than a container query)?. I want to investigate *why* and *when* style queries really make sense to use, and provide a capability previously unavailable to us.

---

## Container Queries: a quick summary

TLDR; container queries let you query a parent selector for its size and styling information, and enable a child to own its intrinsic responsive logic no matter where it lives on a web page.

![diagram of a media query vs. a container query](https://una.im/posts/style-queries/cq-illi.png)

Instead of relying on the viewport for styling input (a blunt hammer), users now have the ability to query in-page elements (a much finer tool) that are more relevant and specific to the target element to apply UI styles to it. This capability enables a new entry-point to query and inject responsive styles, and empowers a component to own its responsive styling logic. This makes the component much more resilient, as the styling logic is intrinsically attached to it, no matter where it appears on the page. (Did I say “styles” enough in this paragraph?)

::: info

I recorded a [<VPIcon icon="fa-brands fa-youtube"/>few videos](https://youtu.be/gCNMyYr7F6w) on container queries if you want to learn more.

<VidStack src="youtube/gCNMyYr7F6w" />

:::

You write container queries like so:

**One.** Define a container on the parent element you want to query

```css
.parent {
  /* query the inline-direction size of this parent */
  container-type: inline-size;
}
```

**Two.** Write the container styles on the element you want to target

```css
@container (min-width: 420px) {
  .card {
    /* styles to apply when the card container is >= 420px */
    /* I.e. shift from 1-column to 2-column layout: */
    grid-template-columns: 1fr 1fr;
  }
}
```

---

## Style Queries

Much like size-based container queries, you can query the computed style of a parent element using [<VPIcon icon="fas fa-globe"/>style queries](https://drafts.csswg.org/css-contain-3/#style-container). These must be wrapped in `style()` to differentiate style queries from size queries.

Why? If you’re querying `@container (min-width: 420px)`, you want to apply styles if the *rendered size* is greater than or equal to 420px at any given time. If you’re querying `@container style(min-width: 420px)`, you’re looking for a *computed value* of `min-width` to equal `420px`. The style query looks at the computed *style* value — not the value of the element when it’s rendered on the page. Style and size are different types of [<VPIcon icon="fa-brands fa-firefox" />CSS containment](https://developer.mozilla.org/en-US/docs/Web/CSS/contain).

```css
@container style(color: hotpink) {
  .card {
    /* styles to apply when the card container has a color of hotpink */
    /* I.e. change the background to white: */
    background: white;
  }
}
```

Okay, but where does this actually become useful? There are a few situations in which style queries provide unique capabilities.

---

## 1. Immediate parent style queries

As of this week’s CSSWG resolution (June 22,2022), unlike with size queries, where you need to set `container-type`, all elements are [style containers by default (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/7066#issuecomment-1163348533). This means you can query an immediate parent to apply styles to a child. One example of where you would want to use an immediate parent style query is with inline text styling.

Say you want to make something stand out inline, *like an italicised quote in a paragraph*. The previous sentence is italic, and wrapped in an `<i>` tag.

> This is a blockquote that has italic text as a part of the block quote styling.

If I have an element within it that I want to stand out using the `<i>` tag, it will not stand out because they’ll look the same. This is such an element. But maybe I want to give it a pink background to stand out.

> This can be achieved with style queries.

Regardless of the type of element (`span`, `i`, `p`, etc.), style queries let you look at the specific style of any parent element to make styling decisions. This enables “chained styles”. *If style X, then apply style Y.* The code might look like:

```css
@container style(font-style: italic) {
  span,
  i,
  .etc {
    background: var(--peach);
  }
}
```

---

## 2. Styling non-inheritable properties

This example shows color selection based on a parent’s styles (including non-inherited styles). `border-color` is an example of a property that doesn’t inherit. With style queries, we can query a parent’s non-inheritable styles to apply to its children. For example, we can query `border-color` to apply styles to the button:

```css
@container style(border-color: lightblue) {
  button {
    border-color: lightblue;
  }
}
```

<!-- TODO: 데모 -->

We’ve now “inherited” the `lightblue` border-color and passed it on to button.

---

## 3. Chained styles

This is neat, but you could do the above example with a custom property in both places:

```css
.card {
  border-color: var(--colorBorder);
}

.card button {
  border-color: var(--colorBorder);
}
```

So let’s take it a step further and do something we can’t do with a shared custom property: apply unique values. instead of using the same value, adjust the value to `royalblue`.

```css
@container style(border-color: lightblue) {
  button {
    border-color: royalblue;
  }
}
```

<!-- TODO: 데모 -->

Now, when the card has a `lightblue` border color, we want to set the button within the card’s border color to `royalblue`. This kind of chaining is something you couldn’t do with custom properties, since they’re two distinct values.

---

## 4. Grouping styles with higher-order variables

Taking that a step further, we can abstract these values to [higher-order variables (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5624) like `—theme: light` or `—theme: dark`, and apply the styles throughout the card:

<!-- TODO: 데모 -->

```css
@container style(--theme: dark) {
  .card {
    background: royalblue;
    border-color: navy;
    color: white;
  }

  .card button {
    border-color: navy;
    background-color: dodgerblue;
    color: white;
  }
}
```

You could take this further to apply states that might have to do with card interactions or types such as `—highlight: true` for a card that should be highlighted to stand out from the rest, or `—type: post` if you have content cards and want to style blog posts differently from videos or other types of content.

If you write your styles using primarily custom properties, you can be even more succinct with higher-order variables by using them to update a series of other custom properties.

---

## 5. Interactions in CSS

One more way style queries can be really useful is integrating them with behaviors we already use CSS to style, such as `:hover` and `:focus` states. You can quickly and easily update a CSS custom property with a CSS state, and using the above technique, update a grouping of values in one place.

```css
/* update the theme on hover */
.card:hover,
.card:focus {
  --theme: darkHover;
}

/* apply darkHover theme styles */
@container style(--theme: darkHover) {
  .card {
    background: dodgerblue;
    border-color: navy;
  }

  .card button {
    border-color: lightblue;
    background-color: royalblue;
  }
}
```

<!-- TODO: 데모 -->

---

## 6. Combinator queries

If you want to get really crazy, you can even combine size queries with style queries to apply some really specific styling logic.

For example, you can use the approach of higher-order variables to group styles (in this example a “highlight” card), with logic based on its intrinsic size:

```css
@container (min-width: 420px) and style(--highlight: true) {
  /* styles for only highlight components at a minmimum width of 420px */
}
```

---

## Conclusion

These are just some ideas on how to use style queries in ways that enable a better developer experience and more flexible component-owned styles. They really shine when integrated within a larger system where these components are reused in multiple places. For more, check out:

<SiteInfo
  name="CSS container queries - CSS | MDN"
  desc="Container queries enable you to apply styles to an element based on certain attributes of its container:"
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```component VPCard
{
  "title": "Container queries - Designing in the Browser  |  web.dev",
  "desc": "Container queries are an experimental API that unlocks intrinsic component-level styling based on an element’s containing parent. This episode goes over how to use container queries, to highlight the responsive possibilities of tomorrow.",
  "link": "https://web.dev/shows/designing-in-the-browser/gCNMyYr7F6w/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v210625d4186b230b6e4f2892d2ebde056c890c9488f9b443a741ca79ae70171d/web/images/favicon.png",
  "background": "rgba(26,115,232,0.2)"
}
```

```component VPCard
{
  "title": "Macro & micro layouts - Designing in the Browser  |  web.dev",
  "desc": "n this episode of Designing in the Browser, we will be elaborating on some concepts introduced in the Container Queries episode and expanding beyond on how to use container queries into the question of when to use them.",
  "link": "https://web.dev/shows/designing-in-the-browser/sdjT0K4sR4k/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v210625d4186b230b6e4f2892d2ebde056c890c9488f9b443a741ca79ae70171d/web/images/favicon.png",
  "background": "rgba(26,115,232,0.2)"
}
```

<SiteInfo
  name="Container Queries & The Future of CSS"
  desc="Modernizing the cascade for responsive design systems"
  url="https://miriamsuzanne.com/speaking/responsive-components//"
  logo="https://miriamsuzanne.com/favicon.svg"
  preview="https://miriamsuzanne.com/images/talks/7TrmlKJqvk-1279.jpeg"/>

```component VPCard
{
  "title": "Next Gen CSS: @container",
  "desc": "Chrome is experimenting with @container, a property within the CSS Working Group Containment Level 3 spec being championed by Miriam Suzanne of Oddbird, and a",
  "link": "/css-tricks.com/next-gen-css-container.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Style Queries",
  "desc": "Exploring when and how you would use style queries in your day-to-day work.",
  "link": "https://chanhi2000.github.io/bookshelf/una.im/style-queries.html",
  "logo": "https://una.im/favicon.svg",
  "background": "rgba(156,90,242,0.2)"
}
```
