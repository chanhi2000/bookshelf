---
lang: en-US
title: "The Future of CSS: Construct <custom-ident> and <dashed-ident> values with ident()"
description: "Article(s) > The Future of CSS: Construct <custom-ident> and <dashed-ident> values with ident()"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Future of CSS: Construct <custom-ident> and <dashed-ident> values with ident()"
    - property: og:description
      content: "The Future of CSS: Construct <custom-ident> and <dashed-ident> values with ident()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-construct-custom-idents-and-dashed-idents-with-ident.html
prev: /programming/css/articles/README.md
date: 2024-12-19
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2024/12/css-ident-function-bramus.png
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
  name="The Future of CSS: Construct <custom-ident> and <dashed-ident> values with ident()"
  desc="Uniquely name a bunch elements in CSS in one go! Instead of assigning 100 unique names through 100 declarations, write only 1 and use ident() to construct the names."
  url="https://bram.us/2024/12/18/the-future-of-css-construct-custom-idents-and-dashed-idents-with-ident/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2024/12/css-ident-function-bramus.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2024/12/css-ident-function-bramus.png)

CSS uses a lot of so called *idents* to name things – think of the values that you put in for `view-transition-name`, `view-timeline-name`, `container-name`, etc.

Constructing these unique values for a lot of elements in one go is often a lot of repetitive work, in which you find yourself repeating selectors and `*-name` declarations for each and every element. Got 100 elements? That’s 100 declarations *(as part of 100 rules)* please. Ugh.

[Hot off the press (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/9141#issuecomment-2551910531) is a new CSS Working Group resolution to adopt a solution I proposed to solving this problem: the `ident()` function.

::: warning ⚠️ This post is about a future CSS feature. You can’t use it … yet.

This post is about an upcoming CSS feature and is more of an explainer outlining the problem space + solution, showing what you you will *(~ should)* be able to do with once it gets shipped.

:::

::: note UPDATE 2024.01.14

The [Pull Request that adds this to the spec (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/pull/11422) got merged. You can now [<VPIcon icon="fas fa-globe"/>find `ident()` in the `css-values-5` specification](https://drafts.csswg.org/css-values-5/#funcdef-ident). Browser support remains unchanged: this is not in any browser yet.

:::

::: note UPDATE 2025.05.14

This is now being prototyped in Blink/Chrome, [<VPIcon icon="fa-brands fa-chrome"/>as per Intent to Prototype announcement](https://groups.google.com/a/chromium.org/g/blink-dev/c/pAqsAGZIIjw/m/oHt9GSH7AQAJ?e=48417069).

:::

---

## The Problem

In many CSS features, you need to give elements a certain name so that you can later refer to those elements. Think of `container-name`, `view-transition-name`, `view-timeline-name`, `scroll-timeline-name`, etc.

Depending on the property these names are a `<custom-ident>` or a `<dashed-ident>`. These names need to be unique (within the feature that’s being used). In case of View Transitions and Scroll-Driven Animations this uniqueness can become burden for authors.

Take [<VPIcon icon="fas fa-globe"/>this Scroll-Driven Animations example](https://scroll-driven-animations.style/demos/carousel-with-markers/css/view-timeline), where I set a unique `view-timeline-name` – a `<dashed-ident<` for the occasion – per targeted element and also refer to that timeline later on:

```css
.parent {
  timeline-scope: all;
}

main {
  div:nth-child(1) { view-timeline-name: --tl-1; }
  div:nth-child(2) { view-timeline-name: --tl-2; }
  div:nth-child(3) { view-timeline-name: --tl-3; }
}

nav {
  li:nth-child(1) { animation-timeline: --tl-1; }
  li:nth-child(2) { animation-timeline: --tl-2; }
  li:nth-child(3) { animation-timeline: --tl-3; }
}
```

Same with View Transitions, where I’ve seen this code [in the wild (<VPIcon icon="fa-brands fa-codepen"/>`argyleink`)](https://codepen.io/argyleink/pen/BaGrXmv):

```css
&:nth-child(1) {
  view-transition-name: opt-1;
  & > label {
    view-transition-name: opt-1-label;
  }
  & > input {
    view-transition-name: opt-1-input;
  }
}
&:nth-child(2) {
  view-transition-name: opt-2;
  & > label {
    view-transition-name: opt-2-label;
  }
  & > input {
    view-transition-name: opt-2-input;
  }
}
&:nth-child(3) {
  view-transition-name: opt-3;
  & > label {
    view-transition-name: opt-3-label;
  }
  & > input {
    view-transition-name: opt-3-input;
  }
}
```

While both examples are limited to only 3 items, you can easily tell that this becomes a burden when there are more items at play.

---

## The Solution: `ident()`

To make things easier when it comes to naming elements *en masse*, I [proposed (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/9141) the `ident()` function to the CSS Working Group. It’s a function to dynamically construct `<custom-ident>` and `<dashed-ident>` values.

```
<ident()> = ident( <ident-arg>+ )
<ident-arg> = <string> | <integer> | <ident>
```

The function accepts an arbitrary number of space-separated arguments, but needs at least 1. The arguments are of the type `<string>`, `<integer>` or another `<ident>`. The result of the function is an `<ident>` that consists of the passed in arguments concatenated together.

For example, with [<VPIcon icon="fas fa-globe"/>`sibling-index()`](https://drafts.csswg.org/css-values-5/#tree-counting), the first example shared earlier can be rewritten as follows:

```css
.parent {
  timeline-scope: all;
}

nav li {
  animation-timeline: ident("--tl-" sibling-index()); /* --tl-1, --tl-2, … */
}

main div {
  view-timeline-name: ident("--tl-" sibling-index()); /* --tl-1, --tl-2, … */
}
```

This code auto-scales, regardless of how many elements are being used in the markup.

---

## More Examples

The `ident()` function shines when you combine it with other functions/features. I’ve already mentioned `sibling-index()` and another such one is the `attr()` function which you can use to get values of HTML attributes into CSS.

::: tip For example:

```css
.item { 
  view-timeline-name: ident("--item-" attr(id) "-tl");
}

label { 
  animation-name: ident("--item-" attr(for) "-tl");
}
```

With `.item` elements that have `id`s like `beach`, `house`, and `bike`; the resulting `view-timeline-name`s would be `--item-beach-tl`, `--item-house-tl`, and `--item-bike-tl` respectively.

:::

Or here’s a more advanced example that first reads the `id` attribute from a `.card` and stores it into a custom property. Because custom properties compute before they inherit, the children can refer to that custom property just fine.

```css
.card[data-view-transition-id] {
  --id: attr(data-view-transition-id); /* E.g. card1, card2, card3, … */

  view-transition-name: var(--id);
  view-transition-class: card;

  h1 {
    view-transition-name: ident(var(--id) "-title"); /* E.g. card1-title, card2-title, card3-title, … */
    view-transition-class: card-title;
  }

  .content {
    view-transition-name: ident(var(--id) "-content"); /* E.g. card1-content, card2-content, card3-content, … */
    view-transition-class: card-content;
  }
}
```

---

## FAQ

As part of the discussion at the CSS WG today, I prepared a short list of Frequently Asked Questions:

::: details Q. Why do we need a function? Can’t one directly glue things together, e.g. `view-transition-name: var(--id) "title";`?

Parsing purposes. Think of shorthands, such as `scroll-timeline`, where it would be hard to detect the longhands it consists of.

Without `ident()` it’s not clear which parts make up the ident:

- `scroll-timeline: inline "tl-" var(--id)`
- `scroll-timeline: "tl-" var(--id) inline`

With `ident()` it’s clear what goes together:

- `scroll-timeline: inline ident("tl-" var(--id))`
- `scroll-timeline: ident("tl-" var(--id)) inline`

:::

::: details Q. Why not use the redesigned `attr()` for this, which can parse to idents? E.g. `attr(foo type(<custom-ident>))`?

The `ident()` function goes beyond `atrr()` as it allows you to glue pieces of string together, e.g. `ident("view-" attr(data-vt-id))` or `ident("view-" attr(data-type) "-" attr(data-sequence))`.

The pieces that need to be glued can come from other elements as well, by storing those into custom properties.

:::

::: details Q. What about constructing `<dashed-ident>`s?

Prepend `"--"` at the start, e.g. `ident("--item-tl-" attr(data-itemnum))`

:::

::: details Q. Doesn’t the `attr()` function need `type(<custom-ident>)` added to it *(which now makes your examples look shorter)*?

No, when no `<attr-type>` is given, the `<attr-name>` gets parsed to a CSS string *(see [<VPIcon icon="fas fa-globe"/>spec](https://drafts.csswg.org/css-values-5/#typedef-attr-type))*. Because `ident()` is designed to accept `<string>` values as well, it works just fine.

:::

::: details Q. Why not rely on something like `…-name: auto` to auto-generate idents?

The problem with `…-name: auto` solutions is that:

- These only work for that specific feature, whereas `ident()` can be used for all features that use idents.
- They generate an ident that is not observable by you. This means that you can’t refer to that generated ident later on. For features like Containers, Scroll Timelines, etc. you need to be able to refer to that ident from somewhere else in your markup.
- They are only meaningful on the targeted element itself. With `ident()` you can store the value in a Custom Property to pass values down to children.
- The don’t work when multiple elements need to use the same ident *(at different times of the page’s lifecycle)*. See an aspirational demo like [<VPIcon icon="fa-brands fa-codepen"/>codepen.io/bramus/pen/PogVZwb](https://codepen.io/bramus/pen/PogVZwb) in which the `title-item-1` generated name is conditionally applied to two different elements.

The proposed `ident()` does not have these limitations; It transcends per-feature solutions like `…-name: auto`.

---

## Browser Support

::: info 💡

Although this post was originally published in December 2024, the list below is constantly being updated. *Last update: Dec 18, 2024*.

:::

This feature is not supported in any browser. To follow along with the progress – if any – you can follow these browser issues:

### Chromium *(Blink)*

❌ No Support

[<VPIcon icon="fa-brands fa-chrome"/>CrBug #384930424](https://crbug.com/384930424)

### Firefox *(Gecko)*

❌ No Support

[<VPIcon icon="fa-brands fa-firefox"/>Issue #1942078](https://bugzilla.mozilla.org/show_bug.cgi?id=1942078)

### Safari *(WebKit)*

❌ No Support

[<VPIcon icon="fa-brands fa-safari"/>Issue #284895](https://webkit.org/b/284895)

Don’t expect any movement on these soon, though. This feature came into existence *just today* and still needs to be formally specified *(as part of [<VPIcon icon="fas fa-globe"/>css-values-5](https://drafts.csswg.org/css-values-5/))*. This can take a long time.

The embed below will color green when `ident()` support is enabled in your browser.

<CodePen
  link="https://codepen.io/bramus/pen/raBypox/e0bb688b379f9bc8ca5cb5f98ef6c4ae"
  title="CSS ident() Support test"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Future of CSS: Construct <custom-ident> and <dashed-ident> values with ident()",
  "desc": "Uniquely name a bunch elements in CSS in one go! Instead of assigning 100 unique names through 100 declarations, write only 1 and use ident() to construct the names.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-construct-custom-idents-and-dashed-idents-with-ident.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
