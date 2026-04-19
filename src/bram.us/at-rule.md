---
lang: en-US
title: "Detect at-rule support in CSS with @supports at-rule(@keyword)"
description: "Article(s) > Detect at-rule support in CSS with @supports at-rule(@keyword)"
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
      content: "Article(s) > Detect at-rule support in CSS with @supports at-rule(@keyword)"
    - property: og:description
      content: "Detect at-rule support in CSS with @supports at-rule(@keyword)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/at-rule.html
prev: /programming/css/articles/README.md
date: 2026-03-16
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2026/03/at-rule.png
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
  name="Detect at-rule support in CSS with @supports at-rule(@keyword)"
  desc="Back in January 2022, I wrote about an exciting new CSS Working Group decision: a function to detect at-rule support using @supports at-rule(@keyword). Fast forward to today, and the CSS Conditional Rules Module Level 5 specification has solidified how this feature works and Chromium (Chrome, Edge, etc.) is about to ship it in Chromium 148!"
  url="https://bram.us/2026/03/15/at-rule/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2026/03/at-rule.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2026/03/at-rule.png)

Back in January 2022, I [**wrote**](/bram.us/detect-at-rule-support-with-the-at-rule-function.md) about an exciting new CSS Working Group decision: a function to detect at-rule support using `@supports at-rule(@keyword)`. Fast forward to today, and the CSS Conditional Rules Module Level 5 specification has solidified how this feature works and Chromium (Chrome, Edge, etc.) is about to ship it in Chromium 148!

---

## The solution (Updated)

The core idea remains the same as back in 2022: use the `at-rule()` function within an `@supports` query to check if a user agent recognizes a specific at-rule.

```css
@supports at-rule(@starting-style) {
  /* CSS for browsers that support @starting-style here … */
}
```

The function simply checks if the browser would accept an at-rule in any context. This is super useful for detecting entire new features like `@starting-style`.

You can also use `at-rule()` in the *supports-condition* when doing an `@import`:

```css
/* This CSS only gets imported when @view-transition is supported (and the browser supports at-rule() as well) */
@import "view-transitions.css" supports(at-rule(@view-transition));
```

---

## No descriptors, preludes, or full blocks!

In my [**original coverage of `at-rule()`**](/bram.us/detect-at-rule-support-with-the-at-rule-function.md), I mentioned an extension to the feature that would theoretically allow you to detect support for specific descriptors (e.g. `at-rule(@counter-style; system: fixed)`) or even pass in a full at-rule block.

This extension — along with checking for at-rule *preludes* (= the part between the at-rule and the opening `{`) — [has been dropped (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/6966#issuecomment-3205037703). The following examples will all fail, as those are not supported:

```css
/* ❌ Passing in descriptors is not supported */
@supports at-rule(@counter-style; system: fixed) { … }

/* ❌ Passing in full at-rules is not supported */
@supports at-rule(@counter-style { system: fixed }) { … }

/* ❌ Passing in preludes of at-rules is not supported */
@supports at-rule(@container style(…)) { … }
```

Because preludes are not allowed in `at-rule()`, it cannot be used to detect non-size `@container` queries support *(e.g. style queries, anchored queries, etc.)*. To detect those, fall back to sniffing out support for the various values of `container-type` — a technique you can already use today in all browsers:

```css
@supports (container-type: anchored) {
  /* CSS for browsers that support anchored queries here … */
}
```

::: note

Note that you also can’t pass `@charset` into `at-rule()`, as it technically is [<VPIcon icon="iconfont icon-w3c"/>not an at-rule](https://drafts.csswg.org/css-syntax/#charset-rule).

:::

## Browser Support

`@supports at-rule(@keyword)` is available in Chromium 148. The initial implementation was done [<VPIcon icon="fa-brands fa-chrome"/>by Google](https://chromium-review.googlesource.com/5972643) and Kevin from Microsoft [<VPIcon icon="fa-brands fa-chrome"/>pushed it over the finish line](https://chromium-review.googlesource.com/7037634) while also navigation the paperwork with the CSS Working Group.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-chrome"/> (Blink)

✅ Supported in Chromium 148 and up.

@tab <VPIcon icon="fa-brands fa-firefox"/> (Gecko)

❌ No support

Follow [<VPIcon icon="fa-brands fa-firefox"/>Issue #1751188](https://bugzilla.mozilla.org/show_bug.cgi?id=1751188) to stay up-to-date and signal interest.

@tab <VPIcon icon="fa-brands fa-safari"/> (WebKit)

❌ No support

Subscribe to [<VPIcon icon="fa-brands fa-safari"/>Issue #235400](https://bugs.webkit.org/show_bug.cgi?id=235400) to stay up-to-date and signal interest.

:::

---

## Feature Detection

You can feature detect support for `at-rule()` by checking for support for `@supports` itself.

```css
@supports at-rule(@supports) {
  /* ✅ The browser supports `@supports at-rule(…)` */
}
```

You can see it in action in the following demo:

<CodePen
  user="bramus"
  slug-hash="LERWgbe"
  title="CSS @supports at-rule() test"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Detect at-rule support in CSS with @supports at-rule(@keyword)",
  "desc": "Back in January 2022, I wrote about an exciting new CSS Working Group decision: a function to detect at-rule support using @supports at-rule(@keyword). Fast forward to today, and the CSS Conditional Rules Module Level 5 specification has solidified how this feature works and Chromium (Chrome, Edge, etc.) is about to ship it in Chromium 148!",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/at-rule.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
