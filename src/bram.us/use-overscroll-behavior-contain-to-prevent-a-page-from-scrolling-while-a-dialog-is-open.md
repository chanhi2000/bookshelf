---
lang: en-US
title: "Use overscroll-behavior: contain to prevent a page from scrolling while a <dialog> is open"
description: "Article(s) > Use overscroll-behavior: contain to prevent a page from scrolling while a <dialog> is open"
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
      content: "Article(s) > Use overscroll-behavior: contain to prevent a page from scrolling while a <dialog> is open"
    - property: og:description
      content: "Use overscroll-behavior: contain to prevent a page from scrolling while a <dialog> is open"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/use-overscroll-behavior-contain-to-prevent-a-page-from-scrolling-while-a-dialog-is-open.html
prev: /programming/css/articles/README.md
date: 2025-11-26
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2025/11/overscroll-behavior_css.png
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
  name="Use overscroll-behavior: contain to prevent a page from scrolling while a <dialog> is open"
  desc="Chrome 144 features a small change to overscroll-behavior: it now also works on non-scrollable scroll containers. While this change might seem trivial, it fixes an issue developers have been dealing with for ages: prevent a page from scrolling while a (modal) <dialog> is open."
  url="https://bram.us/2025/11/25/use-overscroll-behavior-contain-to-prevent-a-page-from-scrolling-while-a-dialog-is-open/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2025/11/overscroll-behavior_css.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2025/11/overscroll-behavior_css.png)

Chrome 144 features a small change to `overscroll-behavior`: it now also works on non-scrollable scroll containers. While this change might seem trivial, it fixes an issue developers have been dealing with for ages: prevent a page from scrolling while a *(modal)* `<dialog>` is open.

CSS `overscroll-behavior` – which I first [**covered here in 2017**](/bram.us/customizing-pull-to-refresh-and-overflow-effects-with-css-overscroll-behavior.md) – allows you to control what a browser should do when reaching the boundary of a scrolling area.

For example, if you set it to `overscroll-behavior: contain`, it will *prevent* scroll chaining from happening, so that underlying elements don’t scroll.

<CodePen
  user="aaroniker"
  slug-hash="ZEzmzxj"
  title="overscroll-behavior: contain"
  :default-tab="['css','result']"
  :theme="dark"/>

The problem with `overscroll-behavior` is that it only works when the scroll container is actually scrollable. For example, if you set `overscroll-behavior: contain` on a `<dialog>` that doesn’t scroll, then `overscroll-behavior` won’t do anything. There must at least be 1 pixel of overflow before `overscroll-behavior` kicks in.

In Chrome 144 this changed, and [<VPIcon icon="fa-brands fa-chrome"/>`overscroll-behavior` now also works on non-scrollable scroll containers](https://chromestatus.com/feature/5129635997941760), as intended by [the specification](https://drafts.csswg.org/css-overscroll/#overscroll-behavior-properties). A non-scrollable scroll container gets created when you set `overflow: auto` but there is no overflow, or when using `overflow: hidden`.

While this change might go unnoticed at first, it unlocks a problem developers have been having for a long time: prevent a page from scrolling when a (modal) `<dialog>` is open. In Chrome 144+, all it takes is this CSS snippet:

```css
dialog {
  overscroll-behavior: contain;
}

dialog::backdrop {
  overflow: hidden;
  overscroll-behavior: contain;
}
```

The key to the code is the `overflow: hidden;` that you must set on the `::backdrop`, as that makes it a *(non-scrollable)* scroll container.

Try it out in this demo (in Chrome 144+):

<CodePen
  user="bramus"
  slug-hash="QwNMroY"
  title="Use `overscroll-behavior: contain;` on `::backdrop` to prevent a page from scrolling when a <dialog> is open!"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

If the page is scrolling underneath the open `<dialog>`, you are not using Chrome 144+ ;

:::

I hope that other browser vendors follow suit here, as this solves a real problem developers have been struggling with, and [**setting `overflow: hidden` on `html` as a workaround ain’t exactly cutting it**](/frontendmasters.com/scroll-locked-dialogs.md).

For reference, here’s the [<VPIcon icon="fa-brands fa-firefox" />Gecko/Firefox Bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1837436) and the [<VPIcon icon="fa-brands fa-safari"/>WebKit/Safari Bug](https://bugs.webkit.org/show_bug.cgi?id=243452).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Use overscroll-behavior: contain to prevent a page from scrolling while a <dialog> is open",
  "desc": "Chrome 144 features a small change to overscroll-behavior: it now also works on non-scrollable scroll containers. While this change might seem trivial, it fixes an issue developers have been dealing with for ages: prevent a page from scrolling while a (modal) <dialog> is open.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/use-overscroll-behavior-contain-to-prevent-a-page-from-scrolling-while-a-dialog-is-open.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
