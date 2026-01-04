---
lang: en-US
title: "The Future of CSS: Detect at-rule support with @supports at-rule(@keyword)"
description: "Article(s) > The Future of CSS: Detect at-rule support with @supports at-rule(@keyword)"
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
      content: "Article(s) > The Future of CSS: Detect at-rule support with @supports at-rule(@keyword)"
    - property: og:description
      content: "The Future of CSS: Detect at-rule support with @supports at-rule(@keyword)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/detect-at-rule-support-with-the-at-rule-function.html
prev: /programming/css/articles/README.md
date: 2022-01-20
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2022/01/at-supports-at-rule.css.png
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
  name="The Future of CSS: Detect at-rule support with @supports at-rule(@keyword)"
  desc="Using the at-rule() function we'll soon be able to detect support for at-rules and their descriptors."
  url="https://bram.us/bram.us/2022/01/20/detect-at-rule-support-with-the-at-rule-function/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2022/01/at-supports-at-rule.css.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2022/01/at-supports-at-rule.css.png)

In CSS you can do feature detection using `@supports`. With it you can detect support for property-value pairs and selectors. What currently isn’t possible though, is to detect support for certain at-rules (such as `@layer`, `@scroll-timeline`, etc.)

[Hot off the press (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/2463#issuecomment-1016720310) is a new CSS Working Group decision that defines the `at-rule` function — to be combined with `@supports` — which will allow just that.

---

## The problem

The `@scroll-timeline` at-rule mentioned in this post has been discontinued in favor of [<VPIcon icon="fas fa-globe"/>scroll-driven animations with `scroll()` and `view()`](https://scroll-driven-animations.style/). The problem laid out here still applies to other at-rules though. Think of feature detecting `@property`, `@starting-style`, `@container`, etc.

While working on [**my articles and demos that use `@scroll-timeline`**](/bram.us/the-future-of-css-scroll-linked-animations-part-1.md, I ran into an issue: how do I feature detect support for this at-rule?

Thankfully I could use a workaround by checking for support of a “telltale” property: `animation-timeline`: Browsers that have implemented `@scroll-timeline`, also have implemented the `animation-timeline` property. By checking for `animation-timeline`‘s existence, we can feature detect support for `@scroll-timeline`.

```css
@supports (animation-timeline: works) {
  /* @scroll-timeline compatible code here */ 
}
```

But detecting a telltale property isn’t always 100% accurate or possible. Take [**the wonderful `@layer`**](/bram.us/the-future-of-css-cascade-layers-css-at-layer.md) for example: that one doesn’t come with a telltale property. How do we detect support for it?

~

---

## The solution

To solve this, the CSS Working Group just [decided (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/2463#issuecomment-1016720310) to introduce a new function that be used in conjunction with `@supports`: `at-rule()`.

With it, we can feature detect at-rule support as follows:

```css
@supports at-rule(@foo) {
  /* @foo is supported */
}
```

It’s also possible to detect support for certain descriptors. For `@scroll-timeline` this will come in handy, as the descriptors changed over time.

```css
@supports at-rule(@foo; desc: val) {
  /* @foo is supported. The descriptor `desc` with value `val` parses as part of that at-rule. */
}
```

Winging back to detect support for `@layer`, the CSS would look like this:

```css
@supports at-rule(@layer) {
  /* @layer is supported */
}
```

---

## The solution, bis

Apart from the syntax above, there’s [a follow-up issue (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/6966) that will allow you to pass in a full at-rule into `at-rule()`:

```css
@supports at-rule(@foo bar {baz: qux}) {
  /* The entire at-rule with all its descriptors is supported. Unknown descriptors are ignored. */
}
```

Note that in this form you’ll have to pass in a valid — thus, complete — at-rule.

---

## Browser Support

This is hot off the press. Currently, no browser supports this. I’ve filed issues at all browser engines to add support for this:

- WebKit/Safari: [<VPIcon icon="fa-brands fa-safari"/>Issue #235400](https://bugs.webkit.org/show_bug.cgi?id=235400)
- Gecko/Firefox: [<VPIcon icon="fa-brands fa-firefox" />Issue #1751188](https://bugzilla.mozilla.org/show_bug.cgi?id=1751188)
- Blink/Chromium: [<VPIcon icon="fa-brands fa-chrome"/>Issue #1289224](https://bugs.chromium.org/p/chromium/issues/detail?id=1289224)

::: note UPDATE 2024.10.04

The Chromium bug got assigned … expect this to be worked on in Q4 🙂

:::

To help spread the contents of this post, feel free to retweet the announcement tweet:

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Future of CSS: Detect at-rule support with @supports at-rule(@keyword)",
  "desc": "Using the at-rule() function we'll soon be able to detect support for at-rules and their descriptors.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/detect-at-rule-support-with-the-at-rule-function.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
