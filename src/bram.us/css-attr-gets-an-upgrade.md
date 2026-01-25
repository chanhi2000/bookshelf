---
lang: en-US
title: "CSS attr() gets an upgrade"
description: "Article(s) > CSS attr() gets an upgrade"
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
      content: "Article(s) > CSS attr() gets an upgrade"
    - property: og:description
      content: "CSS attr() gets an upgrade"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-attr-gets-an-upgrade.html
prev: /programming/css/articles/README.md
date: 2025-01-21
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2025/01/advanced-attr-2.png
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
  name="CSS attr() gets an upgrade"
  desc="You can now use `attr()` with any CSS property — not just content – and it can parse values into data types other than <string>."
  url="https://bram.us/2025/01/20/css-attr-gets-an-upgrade/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2025/01/advanced-attr-2.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2025/01/advanced-attr-2.png)

A feature shipping in Chrome 133 – which goes stable on Feb 4 – is a more powerful `attr()`. From Chrome 133 onwards you use `attr()` with *any* CSS property — not just `content` – and it can parse values into data types other than `<string>`.

Below is a simple example that parses the `data-clr` attribute into a `<color>`.

```html
<style>
  div {
     color: attr(data-clr type(<color>), red);
  }
</style>
<div data-clr="blue">My text color is blue</div>
<div>My text color is red (the fallback value)</div>
```

It’s a basic example that should give you an idea of what the function does.

Here is a more on-point example that uses `attr()` to parse an attribute into a `<custom-ident>`. Handy for View Transitions when you’ve already given the elements a unique `id` in the markup: you simply take that `id` and use that as the value for the `view-transition-name`.

```html
<style>
  .card[id] {
    view-transition-name: attr(id type(<custom-ident>), none); /* card-1, card-2, card-3, … */
    view-transition-class: card;
  }
</style>
<div class="cards">
  <div class="card" id="card-1"></div>
  <div class="card" id="card-2"></div>
  <div class="card" id="card-3"></div>
  <div class="card" id="card-4"></div>
</div>
```

For you as a web developer this means that instead of needing 100 declarations (and rules to match the elements) for 100 elements, you can dial that down to just 1. Easy peasy.

Try it out in the following embed:

<CodePen
  user="web-dot-dev"
  slug-hash="yyBKLmd"
  title="Auto view-transition-name with attr() and type(<custom-ident>)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Supporting the (upcoming) release of this more powerful `attr()` function I published a blog post on [<VPIcon icon="fa-brands fa-chrome"/>the Chrome for Developers blog](https://developer.chrome.com/) and also updated MDN:

<SiteInfo
  name="CSS attr() gets an upgrade  |  Blog  |  Chrome for Developers"
  desc="You can now use attr() with any CSS property, including custom properties. It can parse values into data types other than strings."
  url="https://developer.chrome.com/blog/advanced-attr/"
  logo="https://gstatic.com/devrel-devsite/prod/v5f5028bd8220352863507a1bacc6e2ea79a725fdb2dd736f205c6da16a3d00d1/chrome/images/favicon.png"
  preview="https://developer.chrome.com/static/blog/advanced-attr/image/advanced-attr-thumbnail.png"/>

<SiteInfo
  name="attr() - CSS | MDN"
  desc="The attr() CSS function is used to retrieve the value of an attribute of the selected element and use it in a property value, similar to how the var() function substitutes a custom property value. It can also be used with pseudo-elements, in which case the attribute's value on the pseudo-element's originating element is returned."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/attr/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS attr() gets an upgrade",
  "desc": "You can now use `attr()` with any CSS property — not just content – and it can parse values into data types other than <string>.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-attr-gets-an-upgrade.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
