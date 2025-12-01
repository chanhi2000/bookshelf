---
lang: en-US
title: "CSS Custom Functions are coming … and they are going to be a game changer!"
description: "Article(s) > CSS Custom Functions are coming … and they are going to be a game changer!"
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
      content: "Article(s) > CSS Custom Functions are coming … and they are going to be a game changer!"
    - property: og:description
      content: "CSS Custom Functions are coming … and they are going to be a game changer!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-custom-functions-teaser.html
prev: /programming/css/articles/README.md
date: 2025-02-09
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2025/02/css-custom-functions-light-dark.png
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
  name="CSS Custom Functions are coming … and they are going to be a game changer!"
  desc="Chrome is currently prototyping CSS Functions, which is very exciting!"
  url="https://bram.us/2025/02/09/css-custom-functions-teaser/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2025/02/css-custom-functions-light-dark.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2025/02/css-custom-functions-light-dark-560x364.png)

Chrome is currently prototyping CSS Functions, which is very exciting!

::: note ⚠️

This post is about an upcoming CSS feature. You can’t use it … yet.

This feature is currently being prototyped in Chrome Canary and can be tested in Chrome Canary with the Experimental Web Platform Features flag enabled.

:::

Chrome is currently prototyping CSS Functions from the [<VPIcon icon="fas fa-globe"/>`css-mixins-1` specification](https://drafts.csswg.org/css-mixins-1/).

::: info (<VPIcon icon="fas fa-globe"/><code>drafts.csswg.org</code>)

> A custom function can be thought of as an advanced custom property, which instead of being substituted by a single fixed value, computes its substitution value based on function parameters and the value of custom properties at the point it’s invoked.

```component VPCard
{
  "title": "CSS Custom Functions and Mixins Module Level 1",
  "desc": "This module defines the ability for authors to define custom functions, acting similar to parametrized custom properties. They can use the full power of CSS’s values and conditional rules. It also defines an early form of a similar idea for CSS rule mixins, allowing parametrized substitution of entire blocks of properties into other rules.",
  "link": "https://drafts.csswg.org/css-mixins-1/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

Here’s a very simple example (taken from the spec) that should give you an idea of what a custom function looks like:

```css
@function --negate(--value) {
  result: calc(-1 * var(--value));
}
```

You *invoke* the function like by calling directly – no need for `var()` or the like – and can use it anywhere a value is accepted. For example:

```css
:root {
  padding: --negate(1px); /* = -1px */
}
```

The implementation in Chrome Canary is currently incomplete and there is no shipping date set, but you can already try out the WIP-implementation by enabling the Experimental Web Platform Features flag.

I’m very excited about this upcoming feature, as it will open up a lot of possibilities, way more impactful than that `--negate` example from the spec.

For example: a limitation of [**the CSS `light-dark()` function**](/bram.us/the-future-of-css-easy-light-dark-mode-color-switching-with-light-dark.md) is that it only works with `<color>` values. Thanks to Custom Functions you can write your own `--light-dark()` that works with *any* value.

```css
@function --light-dark(--light, --dark) {
  result: var(--light);
  
  @media (prefers-color-scheme: dark) {
    result: var(--dark);
  }
}
```

If you are visiting the site in the dark mode, the `--dark` value will be returned. Otherwise the `--light` value gets returned.

For example, you can use this `--light-dark()` to have different `font-weight` – [**something Robin suggests on doing**](/css-tricks.com/dark-mode-and-variable-fonts.md):

```css
:root {
  color-scheme: light dark;
  font-family: "Literata", serif;
  
  color: light-dark(#333, #e4e4e4);
  background-color: light-dark(aliceblue, #333);
  font-weight: --light-dark(500, 300);
}
```

Here’s a live demo that uses that code *(and which also changes the `font-size` and some `border`-related properties along with it)*:

<CodePen
  user="bramus"
  slug-hash="EaYBJJx"
  title="Custom CSS Custom Functions: --light-dark()"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: info 💁‍♂️

Note that the custom `--light-dark()` is not an exact copy of `light-dark()`. The built-in `light-dark()` can return different values based on *the used `color-scheme` of an element* whereas `--light-dark()` relies on the global light/dark preference. Being able to respond to used values is not covered by `@function` itself. For that we’d also need [<VPIcon icon="fas fa-globe"/>the CSS `if()` function](https://drafts.csswg.org/css-values-5/#if-notation), which is also in the making (but not really ready for testing, yet). Container queries inside the function also work – to take the parent context into account – but that is currently not prototyped yet.

:::

::: note UPDATE 2025.03.18

In [**CSS `@function` + CSS `if()` = 🤯**](/bram.us/css-at-function-and-css-if.md) I combine `@function` and `if()` to create a custom `--light-dark()` that behaves exactly like the built-in `light-dark()`.

:::

::: note 🏎️

Also note that for `<color>` values I am still using the built-in `light-dark()` here, but could have used my custom one as well. I have a hunch that the built-in version performs faster, but that would need [a proper benchmark (<VPIcon icon="iconfont icon-github"/>`GoogleChromeLabs/css-selector-benchmark`)](https://github.com/GoogleChromeLabs/css-selector-benchmark).

:::

In this post I’ve limited myself to only a *basic-ish* example, without covering too much details. Not mentioned for example are default values for the function parameters and how to specify the types for any of those. For that, you can [<VPIcon icon="fas fa-globe"/>dig into the spec](https://drafts.csswg.org/css-mixins-1/). Note that the spec still has a lot of moving parts, as the spec gets influenced by findings from the prototype Chrome is building.

To follow along with Chrome’s progress of the prototype, subscribe to [<VPIcon icon="fa-brands fa-chrome"/>crbug/325504770](https://issues.chromium.org/issues/325504770) by hitting the star next to its title.
urn:li:activity:7294163643791798273/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Custom Functions are coming … and they are going to be a game changer!",
  "desc": "Chrome is currently prototyping CSS Functions, which is very exciting!",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-custom-functions-teaser.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
