---
lang: en-US
title: "The Future of CSS: Variable Units, powered by Custom Properties"
description: "Article(s) > The Future of CSS: Variable Units, powered by Custom Properties"
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
      content: "Article(s) > The Future of CSS: Variable Units, powered by Custom Properties"
    - property: og:description
      content: "The Future of CSS: Variable Units, powered by Custom Properties"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-variable-units-powered-by-custom-properties.html
prev: /programming/css/articles/README.md
date: 2022-07-08
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2022/07/variable-units.css.png
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
  name="The Future of CSS: Variable Units, powered by Custom Properties"
  desc="Thanks to Variable Units, authors can define Custom Properties and use them as units in their CSS"
  url="https://bram.us/2022/07/08/the-future-of-css-variable-units-powered-by-custom-properties/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2022/07/variable-units.css.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2022/07/variable-units.css.png)

Recently the CSS Working Group approved to start work on the `css-variables-2` specification. First planned addition is support for “Custom Units”. Let’s take a look.

::: info 👨‍🔬

The CSS features described in this post are still being developed and are not finalised. It might take a long time before this lands in any browser.

:::

---

## Variable Units 101

The idea behind Variable Units – [first suggested by Jonathan Neal in this tweet (<VPIcon icon="fa-brands fa-x-twitter"/>`tabatkins`)](https://x.com/jon_neal/status/1537421277882896385) and now specced by [Tab Atkins (<VPIcon icon="fa-brands fa-x-twitter"/>`tabatkins`)](https://x.com/tabatkins) – is to **allow authors to define custom properties which can be used as units**.

For example:

```css
:root {
  --size: 8px;
}
```

Here the Custom Property `--size` is set to `8px`. To use it in your CSS, you would need to write this:

```css
elem {
  width: calc(4 * (var(--size))); /* = 4 times the --size = 32px */
}
```

Thanks to Variable Units, this can become shorter and easier to write. Just like how you can use the `em` unit, you use the `--size` property as a unit, like so:

```css
elem {
  width: 4--size; /* = 4 times the --size = 32px */
}
```

Much shorter to write, and once you know how to read it, it’s fairly easy 🙂

---

## Digging deeper

Because [**you can put just about anything in Custom Properties**](/bram.us/pass-data-from-css-to-javascript-with-css-variables.md), you can make Variable Units a tad more complicated than the simple `8px` from before.

```css
:root {
  --fem: clamp(10px, 1vw + 1vh, 1rem);
}
```

Throw in [<VPIcon icon="iconfont icon-webdev"/>`@property` to register your Custom Property](https://web.dev/at-property/), and you don’t need to define the property on `:root` anymore + you will be able to animate the value. Furthermore it will fallback to the `initial` value, should you assign a non-`<length>` to it.

```css
@property --fem { /* "fluid em" */
  syntax: "<length>";
  initial: clamp(10px, 1vw + 1vh, 1rem);
  inherits: true;
}

.fluid-type {
  font-size: 1.2--fem; /* Won’t get smaller than 12px, or larger than 1.2rem. */
}
```

---

## Polyfilling New Units

The cool thing about this feature is that also opens up the way to polyfill new units, should a browser not support them yet. Take this fictitious `brm` unit for example:

1. Alias the new unit to its `--` counterpart. Browsers with support for `brm` will use the initial value.

```css
@property --brm {
  syntax: "<length>";
  initial: 1brm; /* browsers with support for `brm` will use this */
  inherits: true;
}
```

2. In case of no support for that new `brm` unit, have a JS polyfill calculate the length to use instead, and set that the initial value
3. Use the custom unit throughout the code

```css
height: 100--brm; /* Will use the real brm unit, or the polyfilled version if no support */
```

---

## In Closing

If you want to follow along, or have some feedback on the syntax, you can do so at these links:

```component VPCard
{
  "title": "CSS Custom Properties for Cascading Variables Module Level 2",
  "desc": "This module introduces cascading variables as a new primitive value type that is accepted by all CSS properties, and custom properties for defining them.",
  "link": "https://drafts.csswg.org/css-variables-2/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

<SiteInfo
  name="[css-variables-2] Custom units as simple variable desugaring · Issue #7379 · w3c/csswg-drafts"
  desc="I've had ”custom units” on the back burner of my mind for years now, and never got around to working on them - they had enough question to answer that it seemed exhausting. This morning, tho, I saw..."
  url="https://github.com/w3c/csswg-drafts/issues/7379/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/773781b59e40f34c35718311be90ca20480a320f78068b9e41714e6a081314e5/w3c/csswg-drafts/issues/7379"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Future of CSS: Variable Units, powered by Custom Properties",
  "desc": "Thanks to Variable Units, authors can define Custom Properties and use them as units in their CSS",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-variable-units-powered-by-custom-properties.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
