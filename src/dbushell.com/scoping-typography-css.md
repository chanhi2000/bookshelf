---
lang: en-GB
title: "Scoping Typography CSS"
description: "Article(s) > Scoping Typography CSS"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - dbushell.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Scoping Typography CSS"
    - property: og:description
      content: "Scoping Typography CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/scoping-typography-css.html
prev: /programming/css/articles/README.md
date: 2012-04-18
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/assets/images/ogimage.png
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
  name="Scoping Typography CSS"
  desc="Scoping Typography CSS"
  url="https://dbushell.com/2012/04/18/scoping-typography-css/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/assets/images/ogimage.png"/>

::: note ⚠️

This post was written **14 years ago!**  

Personal opinions and technical details may have changed since writing.

:::
*I’m writing a very long article on front-end dev builds, this is a quick prelude to that!*

It’s common practice to define **global typography style** early in a stylesheet. This makes a lot of sense. After all, a good design has consistent typography with a clear hierarchy throughout. When writing this CSS, [<VPIcon icon="iconfont icon-w3c"/>type selectors](https://w3.org/TR/CSS2/selector.html#type-selectors) like:

```css
h1 { font-weight: bold; }
p { font-size: 1em; line-height: 1.5em; }
```

are necessary; adding classes to every text element isn’t feasible when you consider content managed websites and WYSIWYG editors. You’d have to be a nutter to do `<p class="paragraph">` everywhere. Global styles are great but there are a few catches:

- Unique elements exist that are exceptions to the rule.
- Many UI elements maintain semantics but are visually worlds apart from textual content, e.g. navigation with `<ul>` are rarely designed as simple bullet points.

The first example can easily be solved with small “modifier” classes like `<p class="error">`. The second example requires hard overriding of styles.

The more your website resembles an **application** over a document, the more global typography styles become a pain to build upon. Even heavily content-based websites seem more like an app in the modern world of responsive design. The solution? Just scope typographic styles:

```css
.text h1 { font-weight: bold; }
.text p { font-size: 1em; line-height: 1.5em; }
```

Simply choose a class that makes sense — I swing between `.text` and `.content` — and add it to any element that contains text-based content. This frees the rest of your HTML document from CSS pollution and effectively scopes the typographic style.

That is if you’re using a CSS reset, obviously…

Update: 7th May 2012 - I’m glad to know I’m not the only one doing this, see [**Opt-in Typography**](/css-tricks.com/opt-in-typography.md) at CSS Tricks and [<VPIcon icon="fas fa-globe"/>Global typographic styles suck](https://anthonyshort.me/2012/05/global-typographic-styles-suck) by Anthony Short.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Scoping Typography CSS",
  "desc": "Scoping Typography CSS",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/scoping-typography-css.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
