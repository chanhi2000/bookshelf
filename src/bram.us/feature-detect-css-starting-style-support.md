---
lang: en-US
title: "Feature detect CSS @starting-style support"
description: "Article(s) > Feature detect CSS @starting-style support"
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
      content: "Article(s) > Feature detect CSS @starting-style support"
    - property: og:description
      content: "Feature detect CSS @starting-style support"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/feature-detect-css-starting-style-support.html
prev: /programming/css/articles/README.md
date: 2024-07-12
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2024/07/css-scrollable-detection.png
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
  name="Feature detect CSS @starting-style support"
  desc="Awaiting browser support for at-rule(), here’s how you do it."
  url="https://bram.us/2024/07/11/feature-detect-css-starting-style-support/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2024/07/css-scrollable-detection.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2024/07/css-scrollable-detection.png)

The other day on Mastodon, [<VPIcon icon="fas fa-globe"/>Ryan wondered](https://webperf.social/@ryantownsend/112722554445494335) how he can detect support for [<VPIcon icon="fa-brands fa-chrome"/>`@starting-style`](https://developer.chrome.com/blog/entry-exit-animations#the_starting-style_rule_for_entry_animations). While in theory you could use [**`@supports at-rule()`**](/bram.us/detect-at-rule-support-with-the-at-rule-function.md) for this, in practice you can’t because it has no browser support (😭).

Drawing inspiration from [**my previous post on how to detect support for `@property`**](/bram.us/feature-detect-css-property-support.md), I came up with a similar method to detect `@starting-style` support

---

## The Code

The code I landed on is this:

```css :collapsed-lines
@property --supported {
  syntax: "*";
  initial-value: ;
  inherits: false;
}

:root {
  --supported: initial;
  transition: --supported 0s calc(infinity * 1s) step-end;
  transition-behavior: allow-discrete;
}

@starting-style {
  :root {
    --supported: ;
  }
}

/* Usage: */
:root {
  --bg-if-support: var(--supported) green;
  --bg-if-no-support: var(--supported, red);
}
body { 
  background: var(--bg-if-support, var(--bg-if-no-support));
}
```

The code uses `@starting-style` to set up a Space Toggle with the `--supported` property. In browsers without support the value is `initial`. You can use the computed value of `--supported` as a classic Space Toggles but also with Style Queries [<VPIcon icon="fas fa-globe"/>or other types of conditionals](https://lea.verou.me/blog/2024/css-conditionals-now/).

---

## How it works

The code works by registering a custom property with an `initial-value` that is not `initial`. The value of that property gets changed to `initial` in `:root` but `@starting-style` also changesit.

To prevent the value from swapping back to `initial`, the property is given a transition delay that lasts for all eternity. For this to work, it relies on `transition-behavior`.

🌟 Shout-out to [<VPIcon icon="fas fa-globe"/>Schepp](https://mastodon.social/@Schepp) who mentioned this “long transition delay”-approach at CSS Day. The idea got stuck in my head and I’m happy I was able to use it here.

---

## Demo

Embedded below is a demo that uses this technique. In browsers with support for `@starting-style` the background is green, otherwise it will be red.

<CodePen
  user="bramus"
  slug-hash="gONQEKV"
  title="Detect @starting-style support"
  :default-tab="['css','result']"
  :theme="dark"/>

Note that it doesn’t properly detect Chrome versions 117-118 because of the `@property` bug I detailed in [**the previous post on feature detecting `@property`**](/bram.us/feature-detect-css-property-support.md). I think this is acceptable.

---

## Alternative Approach: Style Queries

The following demo is a variant that uses Style Queries to respond to the change instead of a Space Toggle. The core mechanism under the hood is still the the same: a `transition-delay` mechanism on the custom property.

<CodePen
  user="bramus"
  slug-hash="QWReXaW"
  title="Detect @starting-style support"
  :default-tab="['css','result']"
  :theme="dark"/>

Unfortunately, because Style Queries are not widely supported at this moment, the test is incomplete and incorrectly excludes many browser versions because they simply don’t support Style Queries. On the other hand the code is easier to read and understand.

```css
@property --supported {
  syntax: "<number>";
  initial-value: 0;
  inherits: false;
}
:root {
  transition: --supported 0s calc(infinity * 1s);
}
@starting-style {
  :root {
    --supported: 1;
  }
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Feature detect CSS @starting-style support",
  "desc": "Awaiting browser support for at-rule(), here’s how you do it.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/feature-detect-css-starting-style-support.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
