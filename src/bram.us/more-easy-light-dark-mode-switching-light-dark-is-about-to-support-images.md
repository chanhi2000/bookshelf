---
lang: en-US
title: "More Easy Light-Dark Mode Switching: light-dark() is about to support images!"
description: "Article(s) > More Easy Light-Dark Mode Switching: light-dark() is about to support images!"
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
      content: "Article(s) > More Easy Light-Dark Mode Switching: light-dark() is about to support images!"
    - property: og:description
      content: "More Easy Light-Dark Mode Switching: light-dark() is about to support images!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/more-easy-light-dark-mode-switching-light-dark-is-about-to-support-images.html
prev: /programming/css/articles/README.md
date: 2026-03-19
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2026/03/light-dark-image-scaled.png
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
  name="More Easy Light-Dark Mode Switching: light-dark() is about to support images!"
  desc="CSS light-dark() is being extended to support images."
  url="https://bram.us/2026/03/19/more-easy-light-dark-mode-switching-light-dark-is-about-to-support-images/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2026/03/light-dark-image-scaled.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2026/03/light-dark-image.png)

Back in 2023, I wrote about [**the future of CSS color switching**](/bram.us/the-future-of-css-easy-light-dark-mode-color-switching-with-light-dark.md) using the then-novel `light-dark()` function. It was a game-changer for colors, allowing us to ditch the repetitive `@media (prefers-color-scheme: ...)` blocks for simple property declarations.

But there was one glaring limitation: it only works for colors. If you wanted to swap out a background image, a mask, or a logo based on the user’s color scheme, you were stuck doing things the “old” way.

Well, I have good news. The spec has been updated, and **`light-dark()` is being extended to support images.**

---

## The Missing Piece

As a recap, in CSS, you have to write something like this if you want to set background-images for light and dark mode:

```css
:root {
  --bg-image: url(light-pattern.png);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-image: url(dark-pattern.png);
  }
}

.element {
  background-image: var(--bg-image);
}
```

This code has downsides: The necessary parts can be scattered all over the place and it only checks the global color-scheme preference without respecting local color-scheme overrides done with [<VPIcon icon="fa-brands fa-firefox"/>the `color-scheme` CSS property](https://developer.mozilla.org/docs/Web/CSS/Reference/Properties/color-scheme).

Thanks CSS [<VPIcon icon="iconfont icon-w3c"/>`light-dark()`](https://drafts.csswg.org/css-color-5/#light-dark) we can keep our code closely together, and can respond to the local used `color-scheme` value. In it’s updated form – in which `light-dark()` now also supports `<image>` values – that whole block can be collapsed into a single rule, and we can make it respect local `color-scheme` overrides:

```css
.element {
  color-scheme: dark;
  background-image: light-dark(url(light-pattern.png), url(dark-pattern.png));
}
```

Sweet!

::: note

Note that you must pass in either two `<color>` values or two `<image>` values as arguments to `light-dark()` … you can’t mix the types — see [further down](#what-about-non-color-and-non-image-values) for an explanation why that is.

:::

---

## Browser Support

::: note 💡Last update: May 26, 2026

Although this post was originally published in March 2026, the section below is constantly being updated.

:::

It’s early days, but the engines are already moving:

::: tabs

@tab:active <VPIcon icon="fa-brands fa-chrome"/>Blink

✅ Supported in Chrome 150. Chrome 150 is expected to go stable on Jun 17, 2026

@tab <VPIcon icon="fa-brands fa-firefox"/>Gecko

✅ Supported in Firefox 150

@tab <VPIcon icon="fa-brands fa-safari"/>WebKit

❌ No support

Subscribe to [<VPIcon icon="fa-brands fa-safari"/>WebKit Bug #309689](https://bugs.webkit.org/show_bug.cgi?id=309689) for updates.

:::

---

## Feature Detection

If you want to start experimenting today while providing a fallback, you can use `@supports`. To detect support for images specifically, you can test it using `linear-gradient()` (which is treated as an `<image>` in CSS) or — another new addition — the keyword `none`:

```css
@supports (background-image: light-dark(none, none)) {
  /* Modern image-switching logic here */
}
```

You can see the code in action this CodePen:

<CodePen
  user="bramus"
  slug-hash="bNwRmgm"
  title="CSS light-dark(&lt;image&gt;, &lt;image&gt;) Support test"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## What about non-`<color>` and non-`<image>` values?

Supporting non-`<color>` and non-`<image>` values still is an unanswered question (that probably won’t get solved). As explained in my original coverage, CSS can’t just simply accept `light-dark()` anywhere because [<VPIcon icon="iconfont icon-w3c"/>the parser needs to know the value type of what it is parsing](https://w3.org/TR/css-syntax-3/#parse-grammar) ahead of time.

Internally, `light-dark()` is [about to be defined (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/12513#issuecomment-4085662455) as having two internal variants – one that accepts `<color>`s and one that accepts `<image>`s:

```plaintext
light-dark() =  <light-dark-color> | <light-dark-image>
<light-dark-color> = light-dark(<color>, <color>)
<light-dark-image> = light-dark(<image>, <image>)
```

Each variant has limitations on where it can be used: the version that does colors is only accepted where `<color>`s are allowed, and the version that does images is only accepted where `<image>`s are allowed.

```plaintext
<color> = <color-base> | currentColor | <system-color> | 
          <contrast-color()> | <device-cmyk()> | <light-dark-color>
```

```plaintext
<image> = <url> | <image()> | <image-set()> | <cross-fade()> | 
          <element()> | <gradient> | <light-dark-image>
```

If more types of values needed to be supported, that would required many more internal variants.

This split into two variants allows the CSS parser to discard invalid declarations at *parse time*. That, in turn, explains why you can’t mix the types in the arguments. Say CSS were to accept a mix of `<color>` and `<image>`, then you would be able declare something like `background: red light-dark(blue, url(dark.png));`. With a dark `color-scheme` that declaration would end up being OK, but in a light `color-scheme` you’d end up with `background: red blue` which is invalid.

### Looking ahead: `@function` + `color-scheme()` to the rescue!

In the future there will be an way to have non-`<color>` and non-`<image>` `color-scheme`-dependent values in the future: using a CSS Custom Function and `color-scheme()`. Go check out my previous post on [**implementing a custom `--light-dark()` function that works with _any_ type of value**](/bram.us/css-custom-light-dark.md) for the details. It’s just 3 lines of code, which I’ve included here as well:

```css
@function --light-dark(--l, --d) {
  result: if(color-scheme(dark): var(--d); else: var(--l));
}
```

To feature detect support for `@function`, [**check out `@supports at-rule()`**](/bram.us/at-rule.md). There currently is no easy way to detect support for `color-scheme()`, unless [you want to jump through some hoops (<VPIcon icon="fa-brands fa-codepen"/>`bramus`)](https://codepen.io/bramus/pen/bNEWZLV/2f99187f31ee53f87a1b48bb083cb41e).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "More Easy Light-Dark Mode Switching: light-dark() is about to support images!",
  "desc": "CSS light-dark() is being extended to support images.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/more-easy-light-dark-mode-switching-light-dark-is-about-to-support-images.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
