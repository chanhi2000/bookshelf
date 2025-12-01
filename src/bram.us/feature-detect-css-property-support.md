---
lang: en-US
title: "Feature detect CSS @property support"
description: "Article(s) > Feature detect CSS @property support"
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
      content: "Article(s) > Feature detect CSS @property support"
    - property: og:description
      content: "Feature detect CSS @property support"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/feature-detect-css-property-support.html
prev: /programming/css/articles/README.md
date: 2024-07-04
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/10/css-custom-properties-variables.jpg
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
  name="Feature detect CSS @property support"
  desc="Awaiting browser support for at-rule(), here’s how you do it."
  url="https://bram.us/2024/07/03/feature-detect-css-property-support/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/10/css-custom-properties-variables.jpg"/>

![](https://bram.us/wordpress/wp-content/uploads/2021/10/css-custom-properties-variables-560x280.jpg)

Today on Mastodon, [<VPIcon icon="fas fa-globe"/>Nils asked](https://ruhr.social/@nilsbinder/112721678680237204) how to detect support for `@property`. While in theory you could use [**`@supports at-rule()`**](/bram.us/detect-at-rule-support-with-the-at-rule-function.md) for this, in practice you can’t because it has no browser support *(😭)*.

Thankfully, there’s a workaround … by trying to actively use registered custom properties and style things based on the outcome.

---

## Feature detecting `@property` support + Style Queries

This trick involves registering a Custom Property `--supported-sentinel` property with a specific `initial-value`. When then trying to use it inside `var()` the resulting value will either be that initial value or the fallback you provide. In the following snippet below the value for `--supported` will be either `1` in browsers with support or `0` in browsers with no support for `@property`

```css
@property --support-sentinel {
  syntax: "<number>";
  initial-value: 1;
  inherits: false;
}

:root {
  --supported: var(--support-sentinel, 0);
}
```

Using [**Style Queries**](/bram.us/container-queries-style-queries.md) you can then style children of `:root` based on the value of `--supported`:

```css
/* No support */
body {
  background: red;
}

/* Has support */
@container style(--supported: 1) {
  body {
    background: green;
  }
}
```

The downside of this method is that the browser also needs to support Style Queries, which currently are only supported in Blink/Chromium. I’m sure [<VPIcon icon="fas fa-globe"/>Jane](https://front-end.social/@JaneOri) can remix this to [**use Type Grinding**](/bram.us/ss-type-grinding-casting-tokens-smmdetc-into-useful-values-aka-style-queries-without-style-queries-thanks-to-property.md)

::: tip Demo

<CodePen
  user="bramus"
  slug-hash="mdYNoRj"
  title="CSS @property feature detection (style queries)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

---

## Feature detecting `@property` support + a Space Toggle

A detection with broader support is to use a [**Space Toggle**](/bram.us/the-future-of-css-higher-level-custom-properties-to-control-multiple-declarations.md#the-space-toggle-trick). One downside is that it requires JavaScript to register the toggler because of differences between browsers.

::: details 🤔 What’s a Space Toggle?

If you are unfamiliar with the Space Toggle Hack, it’s a hack that relies on a custom property that you toggle between two values: it’s either a space ( ) or `initial`. The former indicates that it’s ON and the latter that it’s OFF.

```css
--toggler: ; /* = ON */
```

```css
--toggler: initial; /* = OFF */
```

You use this property to generate other values: a value for when it’s ON and a value for when it’s OFF.

It relies on CSS eating spaces *(e.g. `  green` becomes simply `green`)* and CSS falling back to the fallback value when `var()` refers to a custom property that contains `initial`.

Behavior when it’s ON ( ):

```css
--toggler: ; /* = ON */
--value-when-on: var(--toggler) green; /* = `  green` = `green` */
--value-when-off: var(--toggler, red); /* = ` ` or `red` = `red` */
background: var(--value-when-on, var(--value-when-off)); /* = `green` or ` ` = `green` */
```

Behavior when it’s OFF (`initial`):

```css
--toggler: initial; /* = OFF */
--value-when-on: var(--toggler) green; /* = `initial green` = `initial` */
--value-when-off: var(--toggler, red); /* = `initial` or `red` = `red` */
background: var(--value-when-on, var(--value-when-off)); /* = `initial` or `red` = `red` */
```

:::

This trick also involves registering a custom property but you give it an `initial-value` of a single space. For reasons detailed further down, I am registering the Custom Property using JavaScript.

```js
CSS.registerProperty({
  name: '--supported',
  syntax: '*',
  initialValue: String.fromCharCode(0x20), // (or just use ' ')
  inherits: false
});
```

In browsers with support, the value for `--supported` will be that space. In browsers with no support, the value for `--supported` will be the guaranteed initial value of `initial`. Yes, a classic Space Toggle indeed!

```css
body {
  --bg-if-support: var(--supported) green;
  --bg-if-no-support: var(--supported, red);
  
  background: var(--bg-if-support, var(--bg-if-no-support));
}
```

::: details 🤔 Why can’t you rely on registering the Custom Property using CSS?

The short answer is that you can register a Custom Property with a space as its `initial-value`, but that it’s not reliable across browsers. The longer answer is that up until 2023 it wasn’t possible to register a Custom Property without an `initial-value`. Because the CSS parser eats up spaces it wouldn’t recognize a space as the `initial-value`, so the following code *wouldn’t* work.

```css
@property --supported {
  syntax: '*';
  initial-value: ;
  inherits: false;
}
```

With the spaces being eaten, the parser would think the `initial-value` was missing, and thus it would discard the entire registration. This got [fixed at the spec level (<VPIcon icon="iconfont icon-github"/>`w3c/css-houdini-drafts`)](https://github.com/w3c/css-houdini-drafts/commit/d0493e6da665e63b11905ee45854c68b04177a7d) after [I filed a CSSWG Issue for this (<VPIcon icon="iconfont icon-github"/>`w3c/css-houdini-drafts`)](https://github.com/w3c/csswg-drafts/issues/9078): the [<VPIcon icon="fas fa-globe"/>`initial-value` descriptor](https://drafts.css-houdini.org/css-properties-values-api/#initial-value-descriptor) is now optional when the syntax is set to `*`.

While the behavior got updated in Chrome 119 [<VPIcon icon="fa-brands fa-chrome"/>thanks to this commit](https://chromium-review.googlesource.com/c/chromium/src/+/4890262), you shouldn’t rely on the CSS registration because that would exclude Chrome versions 85-118. Furthermore Safari doesn’t seem to like this CSS registration variant ([<VPIcon icon="fa-brands fa-safari"/>bug report here](https://bugs.webkit.org/show_bug.cgi?id=276223)) whereas Firefox *(with feature flag at the time of writing)* OTOH does play nice with it.

Check out [this demo (<VPIcon icon="fa-brands fa-codepen"/>`bramus`)](https://codepen.io/bramus/pen/bGjQVEm): it’s red (wrong) in Safari and green in Chrome 119+ and Firefox Nightly

:::

::: tip Demo

<CodePen
  user="bramus"
  slug-hash="gOJVExQ"
  title="CSS @property feature detection (style queries)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Feature detect CSS @property support",
  "desc": "Awaiting browser support for at-rule(), here’s how you do it.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/feature-detect-css-property-support.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
