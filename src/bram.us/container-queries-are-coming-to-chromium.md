---
lang: en-US
title: "Container Queries are coming to Chromium!"
description: "Article(s) > Container Queries are coming to Chromium!"
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
      content: "Article(s) > Container Queries are coming to Chromium!"
    - property: og:description
      content: "Container Queries are coming to Chromium!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/container-queries-are-coming-to-chromium.html
prev: /programming/css/articles/README.md
date: 2020-11-05
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2020/11/container-queries.png
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
  name="Container Queries are coming to Chromium!"
  desc="Just announced on the Chromium mailing list is an “Intent to Prototype” Container Queries. Let's take a look at the proposed syntax …"
  url="https://bram.us/2020/11/05/container-queries-are-coming-to-chromium/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2020/11/container-queries.png"/>

::: note Updates

- **Update 2021-02-12:** 🎉 Thanks to the hard work by [Miriam Suzanne (<VPIcon icon="fa-brands fa-x-twitter"/>`TerribleMia`)](https://twitter.com/TerribleMia) and others [this proposal (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5796) is now officially part of the CSS Specification Process [(ref) (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5796#issuecomment-777846985) and set to be part of css-contain-3 … it’s happening, people!
- **Update 2021-03-28:** 👀 A first iteration of this implementation has landed in Chrome 91 … [**let’s take a closer look and build a demo!**](/bram.us/css-container-queries-a-first-look-and-demo.md)
- **Update 2021-05-02:** ♻️ Creating a Containment Context / Container Root also requires [<VPIcon icon="fa-brands fa-chrome"/>`style` containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment#style_containment). The code examples have been updated to include this change.
- **Update 2021.06.11:** 🚨 To create a container you no longer need to set the contain property, but instead use the container property. This post does not include these changes, but [**the first look post**](/bram.us/css-container-queries-a-first-look-and-demo.md) does.

:::

![](https://bram.us/wordpress/wp-content/uploads/2020/11/container-queries.png)

Just [<VPIcon icon="fa-brands fa-google"/>announced](https://groups.google.com/a/chromium.org/g/blink-dev/c/u1AKdrXhPGI/m/wrJb-unhAgAJ) on the Chromium mailing list is an [<VPIcon icon="fa-brands fa-chrome"/>“Intent to Prototype”](https://chromium.org/blink/launching-features) Container Queries, which is quite exciting news I must say!

::: details 🤔 Container Queries?

Container Queries allow authors to style elements according to the size of a container. This is similar to a `@media` query, except that it evaluates against a container instead of the viewport.

:::

The experimental implementation will follow [Miriam Suzanne’s proposal (<VPIcon icon="iconfont icon-github"/>`mirisuzanne`)](https://gist.github.com/mirisuzanne/748169312f110d6246e092945673b16e), which looks like this:

```css
/* (1) Create an implicit "container root" */
main,
aside {
  contain: layout style inline-size;
}

.media-object {
  display: grid;
  gap: 1em;
}

/* (2) Container Query targeting the nearest 
   "container root" ancestor. The rules nested
   inside will only be applied if the "container
   root" has a max-width of 45em */
@container (max-width: 45em) {
  .media-object {
    grid-template: 'img content' auto / auto 1fr;
  }
}
```

Applying `contain: inline-size;` *(1)* onto an element will make it an implicit *“container root”* or *“containment context”*. For this to work you also need to apply layout and style containment on the container, so the full code becomes `contain: layout style inline-size;`.

Elements contained inside a *“container root”* can then have container queries applied onto them, by use of a new at-rule `@container (*<container-media-query>*)` *(2)*. The target selector and CSS rules to apply in that case are — similar to what we do with “regular” media queries — nested within the `@container` at-rule.

In the example above extra rules will be applied to `.media-object` whenever its nearest *“container root”* ancestor — such as `<main>` or `<aside>` — has a `max-width` of `45em`.

::: info 🧑‍🔬

This proposal is experimental and has not been approved by the CSSWG yet. The expressed “intent to prototype” is meant as an experiment to see whether this idea would be worth pursuing or not. In the end, it could be that the final syntax can differ from the one listed here, if the proposal is workable in the first place.

:::

A [previous version of this proposal by L. David Baron (<VPIcon icon="iconfont icon-github"/>`dbaron/container-queries-implementability`)](https://github.com/dbaron/container-queries-implementability#proposal) required a context selector to be set, but that has been dropped here. The `@container` rule from Miriam’s version will work in any containment context *(read: the nearest parent element that has `contain: size` set)*. The syntax might still change, but that’s irrelevant to the prototype which is to be implemented:

> This is not at all finalized, but the underlying problems we need to solve in Blink are (mostly) the same regardless of how the feature is accessed, so we’ll for now use this proposal as the temporary syntax.

```component VPCard
{
  "title": "Intent to Prototype: Container Queries",
  "desc": "",
  "link": "https://groups.google.com/a/chromium.org/g/blink-dev/c/u1AKdrXhPGI/m/wrJb-unhAgAJ/",
  "logo": "https://gstatic.com/images/branding/product/1x/groups_32dp.png",
  "background": "rgba(26,115,232,0.2)"
}
```

```component VPCard
{
  "title": "Container Queries [40053788] - Chromium",
  "desc": "",
  "link": "https://issues.chromium.org/issues/40053788/",
  "logo": "https://gstatic.com/chrome-tracker/img/chromium.svg",
  "background": "rgba(26,115,232,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Container Queries are coming to Chromium!",
  "desc": "Just announced on the Chromium mailing list is an “Intent to Prototype” Container Queries. Let's take a look at the proposed syntax …",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/container-queries-are-coming-to-chromium.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
