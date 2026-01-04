---
lang: en-US
title: "The At-Rules of CSS"
description: "Article(s) > The At-Rules of CSS"
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
      content: "Article(s) > The At-Rules of CSS"
    - property: og:description
      content: "The At-Rules of CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-at-rules-of-css.html
prev: /programming/css/articles/README.md
date: 2015-05-12
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="The At-Rules of CSS"
  desc="The at-rule is a statement that provides CSS with instructions to perform or how to behave. Each statement begins with an @ followed directly by one of"
  url="https://css-tricks.com/the-at-rules-of-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

The `at-rule` is a statement that provides CSS with instructions to perform or how to behave. Each statement begins with an `@` followed directly by one of several available keywords that acts as the identifier for what CSS should do. This is the common syntax, though each `at-rule` is a variation of it.

---

## Regular Rules

Regular rules follow a regular syntax:

```css
@[KEYWORD] (RULE);
```

### `@charset`

This rule defines the character set used by the browser. It comes in handy if the stylesheet contains non-[<VPIcon icon="fas fa-globe"/>ASCII characters](https://ascii.cl/htmlcodes.htm) (e.g. [<VPIcon icon="fa-brands fa-wikipedia-w"/>UTF-8](http://en.wikipedia.org/wiki/UTF-8)). Note that a character set that is [<VPIcon icon="fa-brands fa-firefox" />placed on the HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#Attributes) will override any `@charset` rule.

```css
@charset "UTF-8";
```

### `@import`

This rule is inserted at the very top of the file and instructs the stylesheet to request and include an external CSS file as if the contents of that file were right where that line is.

```css
@import 'global.css';
```

With the popularity of CSS preprocessors that support @import, it should be noted that they work differently than native CSS `@import` is a separate HTTP request for that file.

### `@namespace`

This rule is particularly useful for applying CSS to XML HTML (XHTML) so that XHTML elements can be used as selectors in the CSS.

```css
/* Namespace for XHTML */
@namespace url(http://www.w3.org/1999/xhtml);

/* Namespace for SVG embedded in XHTML */
@namespace svg url(http://www.w3.org/2000/svg);
```

---

## Nested Rules

Nested rules contain a subset of additional statements, some of which might be conditional to a specific situation.

```css
@[KEYWORD] {
  /* Nested Statements */
}
```

### `@document`

This rule specifies conditions for styles that apply to a specific page. For example, we can provide a URL and then customize the styles for that particular page. Those styles will be ignored on other pages.

```css
@document 
  /* Rules for a specific page */
  url(https://css-tricks.com/),
  
  /* Rules for pages with a URL that begin with... */
  url-prefix(https://css-tricks.com/snippets/),
  
  /* Rules for any page hosted on a domain */
  domain(css-tricks.com),

  /* Rules for all secure pages */
  regexp("https:.*")
{
  
  /* Start styling */
  body { font-family: Comic Sans; }

}
```

The [<VPIcon icon="iconfont icon-caniuse"/>browser support for `@document` is pretty weak](https://caniuse.com/mdn-css_at-rules_document) at the time of this writing:

| Chrome | Safari | Firefox | Opera | IE | Android | iOS |
| --- | --- | --- | --- | --- | --- | --- |
| No | No | Limited | No | No | No | No |

### `@font-face`

This rule allows us to load custom fonts on a webpage. There are [**varying levels of support**](/css-tricks.com/snippets-css/using-font-face-in-css.md) for custom fonts, but this rule accepts statements that create and serve those fonts.

```css
@font-face {
  font-family: 'MyWebFont';
  src:  url('myfont.woff2') format('woff2'),
        url('myfont.woff') format('woff');
}
```

::: details Learn more about <code>@font-face</code>

<!-- TODO: /css-tricks.com/using-font-face-in-css.md -->
<!-- TODO: /css-tricks.com/the-new-bulletproof-font-face-syntax.md -->
<!-- TODO: /css-tricks.com/whats-deal-declaring-font-properties-font-face.md -->
<!-- TODO: /css-tricks.com/the-font-face-dilemma.md -->
<!-- TODO: /css-tricks.com/dont-just-copy-the-font-face-out-of-google-fonts-urls.md -->
<!-- TODO: /css-tricks.com/rename-font-css.md -->
<!-- TODO: /css-tricks.com/custom-fonts-in-emails.md -->
<!-- TODO: /css-tricks.com/fout-foit-foft.md -->
<!-- TODO: /css-tricks.com/the-best-font-loading-strategies-and-how-to-execute-them.md -->
<!-- TODO: /css-tricks.com/watch-your-font-weight.md -->

:::

### `@keyframes`

This rule is the basis for [**keyframe**](/css-tricks.com/snippets-css/keyframe-animation-syntax.md) [**animations**](/css-tricks.com/almanac-properties/animation.md) on many CSS properties, by allowing us to mark the start and stop (and in-between) marks for what is being animated.

```css
@keyframes pulse {
  0% {
    background-color: #001f3f;
  }
  100% {
    background-color: #ff4136;
  }
}
```

::: details Learn more about <code>@keyframes</code>

<!-- TODO: /css-tricks.com/snippets-css/keyframe-animation-syntax.md -->
<!-- TODO: /css-tricks.comdebugging-css-keyframe-animations.md -->
<!-- TODO: /css-tricks.comstarting-css-animations-mid-way.md -->
<!-- TODO: /css-tricks.comcss-keyframe-animation-delay-iterations.md -->
<!-- TODO: /css-tricks.coma-new-way-to-delay-keyframes-animations.md -->
<!-- TODO: /css-tricks.commdanimate-different-end-states-using-one-set-css-keyframes.md -->
<!-- TODO: /css-tricks.comhow-much-specificity-do-rules-have-like-keyframes-and-media.md -->
<!-- TODO: /css-tricks.comusing-custom-properties-to-wrangle-variations-in-keyframe-animations.md -->
<!-- TODO: /css-tricks.com/snippets-css/shake-css-keyframe-animation.md -->

:::

### `@media`

This rule contains conditional statements for targeting styles to specific screens. These statements can include screen sizes, which can be useful for [adapting styles to devices](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/):

```css
/* iPhone in Portrait and Landscape */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 480px)
  and (-webkit-min-device-pixel-ratio: 2) {

    .module { width: 100%; }

}
```

Or applying styles only to the document when it is printed:

```css
@media print {

}
```

::: details Learn more about <code>@media</code>

<!-- TODO: /css-tricks.com/a-complete-guide-to-css-media-queries.md -->
<!-- TODO: /css-tricks.com/naming-media-queries.md -->
<!-- TODO: /css-tricks.com/nested-media-queries.md -->
<!-- TODO: /css-tricks.com/the-new-css-media-query-range-syntax.md -->
<!-- TODO: /css-tricks.com/logic-in-css-media-queries.md -->

```component VPCard
{
  "title": "An Introduction to the Reduced Motion Media Query",
  "desc": "The open web's success is built on interoperable technologies. The ability to control animation now exists alongside important features such as zooming",
  "link": "/css-tricks.com/introduction-reduced-motion-media-query.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

<!-- TODO: /css-tricks.com/bandwidth-media-queries.md -->
<!-- TODO: /css-tricks.com/animated-media-queries.md -->
<!-- TODO: /css-tricks.com/css-media-queries.md -->
<!-- TODO: /css-tricks.com/how-much-specificity-do-rules-have-like-keyframes-and-media.md -->

:::

### `@page`

This rule defines styles that are to individual pages when printing the document. It specifically contains pseudo-elements for styling the `:first` page as well as the `:left` and `:right` margins of the page.

```css
@page :first {
  margin: 1in;
}
```

### `@property`

CSS variables have been around a while now. We can define them pretty easily for any values we use regularly, like colors.

```css
:root {
  --primary-color: oklch(70% 0.183 42.88);
}

body {
  color: var(--primary-color);
}
```

This is awesome, of course. But it’s not all sparkles and unicorns. For example, it’s impossible to animate between two variables, like say, the colors of a gradient. You might think it’s possible to rotate through the entire color wheel by setting up a variable for a color’s hue in a color function like this:

```css
:root {
  --hue: 0;
}

body {
  animation: hue 5s linear infinite;
  background-color: hsl(var(--hue) 80% 50%);
}

@keyframes hue {
    0% { --hue; }
  100% { --hue: 360; }
}
```

That certainly looks valid! But it just don’t work. That’s because CSS recognizes that number as a string as opposed to an actual number. We have to register what’s called a **custom property** in order to wire it all up.

That’s where `@property` comes in. It’s used to not only register a CSS variable, but also to define its *type*, the *initial value* it defaults to, and whether or not it *inherits* values from other properties. It’s a lot like defining our very own specification for a specific type of data!

Getting back to that animated gradient, let’s set up our custom property:

```css
@property --hue {
  syntax: "<number>";
  initial-value: 0;
  inherits: false;
}
```

Now we can actually use `--hue` to rotate around the full color wheel between `0deg` and `360deg`:

```css
body {
  animation: hue 5s linear infinite;
  background-color: hsl(var(--hue) 100% 50%);
}

@keyframes hue {
    0% { --hue; }
  100% { --hue: 360; }
}
```

See the article “Interpolating Numeric CSS Variables” for a complete explanation of how `@property` works as well as a demo of the animated gradient.

::: details Learn more about <code>@property</code>

<!-- TODO: /css-tricks.com/a-complete-guide-to-custom-properties.md -->
<!-- TODO: /css-tricks.com/property.md -->
<!-- TODO: /css-tricks.com/using-property-for-css-custom-properties.md -->
<!-- TODO: /css-tricks.com/exploring-property-and-its-animating-powers.md -->
<!-- TODO: /css-tricks.com/interpolating-numeric-css-variables.md -->
<!-- TODO: /css-tricks.com/custom-property-brain-twisters.md -->
<!-- TODO: /css-tricks.com/build-complex-css-transitions-using-custom-properties-and-cubic-bezier.md -->
<!-- TODO: /css-tricks.com/image-fragmentation-effect-with-css-masks-and-custom-properties.md -->

:::

### `@supports`

This rule tests whether a browser supports a feature, and then applies the styles for those elements if the condition is met. It’s sort of like [Modernizr](http://modernizr.com/) but tailored specially for CSS properties.

```css
/* Check one supported condition */
@supports selector(::thumb) {
  /* If ::thumb is supported, style away! */
}

/* Check multiple conditions */
@supports (color: oklch(50% .37 200)) and (color: color-mix(white, black)) {
  background-color: 
}
```

The `not` operator is a way to check whether a browser does *not* support a feature to set fallback styles for those cases.

```css
.element {
  color: oklch(50% .37 200);
}

/* If the oklch() color function is not support, set a fallback color */
@supports not (color: oklch(50% .37 200)) {
  .element {
    color: #0288D1;
  }
}
```

Here’s the, uh, support for `@supports`:

| Chrome | Edge | Safari | Firefox | Opera | IE | Android | iOS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 28+ | 12+ | 9+ | 22+ | 12.1+ | No | 4.4+ | 9+ |

::: details Learn more about <code>@supports</code>

supports-selector.md
can-you-nest-media-and-support-queries.md
how-supports-works.md
using-feature-detection-conditionals-and-groups-with-selectors.md

:::

### `@container`

This at-rule was introduced in February 2023 with the release of Container Queries, a feature that allows you to register an element as a `container` and apply styles to other elements when the container meets a certain condition. It’s a lot like `@media` queries, but `@container` looks at a specific element instead of the viewport size.

```css
.parent {
  container: article / inline-size;
}

.child {
  display: flex;
}

@container article (width > 800px) {
  .child {
    flex-direction: column;
  }
}
```

::: details Learn more about container queries

<!-- TODO: /css-tricks.com/a-cornucopia-of-container-queries.md -->
<!-- TODO: /css-tricks.com/the-origin-story-of-container-queries.md -->
<!-- TODO: /css-tricks.com/digging-deeper-into-container-style-queries.md -->
<!-- TODO: /css-tricks.com/container-units-should-be-pretty-handy.md -->
<!-- TODO: /css-tricks.com/container-queries-once-more-unto-the-breach.md -->
<!-- TODO: /css-tricks.com/ishadeeds-container-queries-lab.md -->
<!-- TODO: /css-tricks.com/container-query-discussion.md -->
<!-- TODO: /css-tricks.com/next-gen-css-container.md -->
<!-- TODO: /css-tricks.com/say-hello-to-css-container-queries.md -->
<!-- TODO: /css-tricks.com/snippets-css/using-font-face-in-css -->

<SiteInfo
  name="251: Container Queries are the Future - CSS-Tricks"
  desc=": First up this week, Una Kravets wrote about how marvelous the future will be with container queries:"
  url="https://css-tricks.com/newsletter/251-container-queries-are-the-future//"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/05/Kapture-2021-03-24-at-12.04.23.gif"/>

<SiteInfo
  name="256: When to use @container queries - CSS-Tricks"
  desc=": Max Böck asks when should we use @container or @media queries?"
  url="https://css-tricks.com/newsletter/256-when-to-use-container-queries//"
  logo="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/06/Frame-8.png"/>

:::

---

## Wrapping Up

The `at-rule` is where it’s at for making CSS do some crazy and interesting things. While the examples here are basic, we can see how they might be used to handcraft styles to very specific conditions, thereby creating user experiences and interactions that match a scenario.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The At-Rules of CSS",
  "desc": "The at-rule is a statement that provides CSS with instructions to perform or how to behave. Each statement begins with an @ followed directly by one of",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-at-rules-of-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
