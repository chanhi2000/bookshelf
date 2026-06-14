---
lang: en-US
title: "A custom --light-dark() function in CSS that works with any type of value (not just colors!) in just 3 LOC"
description: "Article(s) > A custom --light-dark() function in CSS that works with any type of value (not just colors!) in just 3 LOC"
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
      content: "Article(s) > A custom --light-dark() function in CSS that works with any type of value (not just colors!) in just 3 LOC"
    - property: og:description
      content: "A custom --light-dark() function in CSS that works with any type of value (not just colors!) in just 3 LOC"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-custom-light-dark.html
prev: /programming/css/articles/README.md
date: 2025-10-01
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2025/09/custom-light-dark-with-color-scheme-bramus-scaled.png
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
  name="A custom --light-dark() function in CSS that works with any type of value (not just colors!) in just 3 LOC"
  desc="CSS Custom Functions (@function) + CSS if() + CSS color-scheme() = one sweet combo!"
  url="https://bram.us/2025/09/30/css-custom-light-dark/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2025/09/custom-light-dark-with-color-scheme-bramus-scaled.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2025/09/custom-light-dark-with-color-scheme-bramus.png)

In [**CSS `@function` + CSS `if()` = 🤯**](/bram.us/css-at-function-and-css-if.md) I explored combining CSS custom functions and CSS `if()`, leading to the creation of a custom `--light-dark()` CSS function that works with any value *(not just colors!)*.

The built function relied on a style query that query a custom property `--scheme`, which itself was set to mirror the value of the `color-scheme` property.

Thanks to the recently resolved `color-scheme()` function, this indirection is no longer needed, and the code can become much, much simpler.

::: note ⚠️ This post is about an upcoming CSS feature. You can’t use it … yet.

While custom functions with `@function` and CSS `if()` are available in Chrome *(and only Chrome, for now)*, the mentioned `color-scheme()` only exists on paper right now.

:::

---

## The Code

If you are here just for the code, here it is:

```css
@function --light-dark(--l, --d) {
  result: if(color-scheme(dark): var(--d); else: var(--l));
}
```

Usage is similar to the built-in `light-dark()`, but difference is that it can be used with *any* type of value:

```css
#element {
  color-scheme: light dark;
  color: light-dark(#333, #e4e4e4);
  background-image: --light-dark(url(light.svg), url(dark.svg));
}
```

---

## The `color-scheme()` function

Powering this custom `--light-dark()` function is the new `color-scheme()` function. It’s a new addition to CSS which [we only recently resolved on adding (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/10577#issuecomment-3329616811) with the CSS Working Group.

The `color-scheme()` function allows you to query the *used* color scheme of an element. The function can be used in both `@container` queries and [<VPIcon icon="fa-brands fa-chrome"/>the new `if()`](https://developer.chrome.com/blog/if-article).

In the following example I am using the function directly on an element *(instead of placing it into a custom function)*:

```css
#element {
  color-scheme: light dark;
  background-image: if(color-scheme(dark): url(dark.svg); else: url(light.svg));
}
```

The reason we need this new `color-scheme()` *function* is because the `color-scheme` *property* only lists which color schemes are supported. When set to `light dark`, you are indicating the element can adapt its rendering to either a light or dark version. This is controlled by your light/dark setting, with the resulting used value being one of those listed values.

::: note FYI

You can also force a component into a specific mode by listing only 1 value for `color-scheme`, e.g. `color-scheme: light` will force the component into `light` mode, regardless of your OS setting.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A custom --light-dark() function in CSS that works with any type of value (not just colors!) in just 3 LOC",
  "desc": "CSS Custom Functions (@function) + CSS if() + CSS color-scheme() = one sweet combo!",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-custom-light-dark.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
