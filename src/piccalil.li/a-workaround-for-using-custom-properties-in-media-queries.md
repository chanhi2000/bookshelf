---
lang: en-US
title: "A workaround for using custom properties in media queries"
description: "Article(s) > A workaround for using custom properties in media queries"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A workaround for using custom properties in media queries"
    - property: og:description
      content: "A workaround for using custom properties in media queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/a-workaround-for-using-custom-properties-in-media-queries.html
prev: /programming/css/articles/README.md
date: 2025-09-25
isOriginal: false
author:
  - name: Manuel Matuzović
    url : https://piccalil.li/author/manuel-matuzovi
cover: https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/22903c4f9b1e988a020cac979af3868f577731a42c442b5e0a5be84b2ce6fa62/png?url=https://piccalil.li/og/a-workaround-for-using-custom-properties-in-media-queries/&width=1024&height=526&retina=true
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
  name="A workaround for using custom properties in media queries"
  desc="One of the most frustrating aspects of media queries is that we can’t use custom properties with them. This often results in hard-coded values in otherwise, highly configurable codebases. Manuel has a novel approach to get around this."
  url="https://piccalil.li/blog/a-workaround-for-using-custom-properties-in-media-queries"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://api.urlbox.io/v1/ln9ptArKXobLRpDQ/22903c4f9b1e988a020cac979af3868f577731a42c442b5e0a5be84b2ce6fa62/png?url=https://piccalil.li/og/a-workaround-for-using-custom-properties-in-media-queries/&width=1024&height=526&retina=true"/>

I’m a big fan of custom properties and I use them almost everywhere. One of the places where I’d love to use them, but can’t, is with media queries. The following code won’t work in any browser.

```css
:root {
  --breakpoint-s: 480px;
}

@media (min-width: var(--breakpoint-s)) {
  /* do something */
}
```

The [Custom Properties specification](https://w3.org/TR/css-variables-1/#using-variables) explains:

::: info 3. Using Cascading Variables: the var() notation (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> The `var()` function can be used in place of any part of a value in any property on an element. **The `var()` function can not be used as property names, selectors, or anything else besides property values.** (Doing so usually produces invalid syntax, or else a value whose meaning has no connection to the variable.)

```component VPCard
{
  "title": "CSS Custom Properties for Cascading Variables Module Level 1",
  "desc": "The value of a custom property can be substituted into the value of another property with the var() function. The syntax of var() is:",
  "link": "https://w3.org/TR/css-variables-1/#using-variables/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(0,90,156,0.2)"
}
```

:::

That’s unfortunate, but I recently found a workaround that I’d love to share with you. Instead of using a media query, you can use a [<VPIcon icon="fas fa-globe"/>container style query](https://matuzo.at/blog/2023/100daysof-day80).

```css
@property --inline-size-s {
  syntax: "<length-percentage>";
  inherits: true;
  initial-value: 100vi;
}

:root {
  --breakpoint-s: 48em;
  --inline-size-s: min(var(--breakpoint-s), 100vi);
}

body {
  background-color: var(--bg-color);

  --bg-color: oklch(0.94 0.01 99);

  @container style(--inline-size-s: var(--breakpoint-s)) {
    --bg-color: oklch(0.87 0.21 95.82);
  }
}
```

::: note Reminder

A `vi` unit represents the size of the viewport’s inline axis, which by default equals `vw` in left to right languages.

:::

Let me guide you through the steps I took to come up with this solution.

---

## Breakdown

The first step is to define a custom property for the breakpoint. Then, query the viewport’s width and check whether it matches or exceeds the breakpoint. As already teased with the title of this article, you have to use container style queries for that, rather than media queries. Container style queries enable you to check whether a container has a specific property and computed value assigned.

```css
:root {
  --breakpoint-s: 48em;
  --inline-size-s: 100vw;
}

@container style(--inline-size-s: var(--breakpoint-s)) {
  body {
    --bg-color: oklch(0.87 0.21 95.82);
  }
}
```

That looks good but it doesn’t work for two reasons.

You’re comparing two strings: does “48em” match “100vi”? That, of course, will never be true. What you actually want to do is compare the computed values of two lengths. Using the `@property` at-rule you can define an explicit type for your custom properties.

From the [<VPIcon icon="fas fa-globe"/>specification for the `min-width` property](https://drafts.csswg.org/css-sizing-3/#min-size-properties), we know that its value can be a `<length-percentage>`, so you can use that for the `syntax` property, which defines the types. You also have to provide an initial value; `100vi` is a good default for our wannabe media queries.

The property should also be [**inheritable**](/piccalil.li/css-inheritance.md), so you set `inherits` accordingly.

```css
@property --inline-size-s {
  syntax: "<length-percentage>";
  inherits: true;
  initial-value: 100vw;
}
```

::: note FYI

You can also register the second custom property (`--breakpoint-s`), but it’s not required, as in a container style query it’s sufficient if one of the two values has a specific type.

:::

Your query now works, but only if the viewport width is **exactly** 48em (roughly 768px, depending on the user’s preferred root font size).

You want it to work at **at least** 48em, though. The problem there is that if the computed value of `--inline-size-s` exceeds 48em it can’t match your breakpoint `--breakpoint-s`. That’s why you want `--inline-size-s` to match the viewport width but only until it reaches 48em. You can use the `min()` function for that. It takes the smaller of the provided values.

```css
:root {
  --breakpoint-s: 48em;
  --inline-size-s: min(var(--breakpoint-s), 100vi);
}
```

`--inline-size-s` matches 100vi as long as the computed value of 100vi is lower than 48em. Otherwise, it matches 48em.

::: note FYI

If you want to query the `max-inline-size` instead of the `min-inline-size`, use the `max()` function.

:::

Here’s the whole snippet.

```css
@property --inline-size-s {
  syntax: "<length-percentage>";
  inherits: true;
  initial-value: 100vi;
}

:root {
  --breakpoint-s: 48em;
  --inline-size-s: min(var(--breakpoint-s), 100vi);
}

body {
  background-color: var(--bg-color);

  --bg-color: oklch(0.94 0.01 99);

  @container style(--inline-size-s: var(--breakpoint-s)) {
    --bg-color: oklch(0.87 0.21 95.82);
  }
}
```

::: tip Tip

Toggle the CSS panel to see the effect

:::

<CodePen
  user="matuzo"
  slug-hash="PwZwgwb"
  title="A workaround for using custom properties in media queries (Demo 1)"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note FYI

Depending on the screen size of the device you’re reading this article on, the background colour of the demos will be yellow or light grey. It’s best to view these demos on a large screen so that you can compare results at different viewport sizes.

:::

---

## Performance

You may wonder if there are any performance issues. I haven’t tested this solution on a large scale, but I can’t imagine so. Unlike container size queries, which query the size of the query container’s [principal box,](https://w3.org/TR/css-display-3/#principal-box) container style queries only query computed values of its container. That is much safer and harmless in terms of performance, which is also one of the reasons why every element is a style container by default. In the following demo, you can even change the breakpoint on the fly using a range slider.

<CodePen
  user="matuzo"
  slug-hash="MYKYRJP"
  title="A workaround for using custom properties in media queries (Demo 2)"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Downsides

That’s a great solution to a problem probably many of us had, but there are also some downsides.

### Browser Support

Container style queries are [<VPIcon icon="iconfont icon-caniuse"/>currently not supported by Firefox](https://caniuse.com/css-container-queries-style), at the time of writing, but I’ve heard from trustworthy sources that they’re being prioritised. Unfortunately, there isn’t a great way to progressively enhance this solution because there’s [no feature detection for at-rules in CSS (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/2463). If you really want to make it work, read [<VPIcon icon="fas fa-globe"/>this post by Bramus](https://bram.us/2024/10/06/feature-detect-style-queries-support-in-css/).

### Verbosity

That isn’t really an issue, but it’s annoying that for every breakpoint, you need two custom properties, and you have to register one of them.

```css
@property --inline-size-s {
  syntax: "<length-percentage>";
  inherits: true;
  initial-value: 100vi;
}

@property --inline-size-m {
  syntax: "<length-percentage>";
  inherits: true;
  initial-value: 100vi;
}

:root {
  --breakpoint-s: 48em;
  --inline-size-s: min(var(--breakpoint-s), 100vi);

  --breakpoint-m: 64em;
  --inline-size-m: min(var(--breakpoint-m), 100vi);
}
```

That will change when browsers start supporting [<VPIcon icon="fas fa-globe"/>style ranges](https://drafts.csswg.org/css-conditional-5/#style-range).

```css
@container style(100vi <= --inline-size-s) {
  /* The rest of your CSS */
}
```

### Container queries

With this solution, you can only query the viewport, not a container. If you write `min(var(--breakpoint-s), 100cqi)`, the 100cqi doesn’t refer to the style container but to a parent container. So, the only way to make it work would be to wrap the style container in another inline-size container.

<CodePen
  user="matuzo"
  slug-hash="OPMPYXw"
  title="A workaround for using custom properties in media queries (Demo 3)"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note FYI

You probably see that the background colour of the container is still light grey. If you open the [CodePen in a new tab (<VPIcon icon="fa-brands fa-codepen"/>`matuzo`)](https://codepen.io/matuzo/pen/OPMPYXw) or window with a large enough viewport, the background colour turns yellow. That’s because your custom media query only kicks in when the container has a minimum width of 768px, not the viewport.

:::

---

## Wrapping up

I love this solution. Not just because it solves a problem I recently had, but also because it showcases the power of modern CSS features like `@container`, `@property` or `min()` really well.

Browser support may be a topic for you *right now*, but hopefully, it will soon be a thing of the past.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A workaround for using custom properties in media queries",
  "desc": "One of the most frustrating aspects of media queries is that we can’t use custom properties with them. This often results in hard-coded values in otherwise, highly configurable codebases. Manuel has a novel approach to get around this.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/a-workaround-for-using-custom-properties-in-media-queries.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
