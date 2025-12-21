---
lang: en-US
title: "Prevent a page from scrolling while a dialog is open"
description: "Article(s) > Prevent a page from scrolling while a dialog is open"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Prevent a page from scrolling while a dialog is open"
    - property: og:description
      content: "Prevent a page from scrolling while a dialog is open"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/prevent-a-page-from-scrolling-while-a-dialog-is-open.html
prev: /programming/css/articles/README.md
date: 2025-12-01
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2024/10/dialog-pop.jpg
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
  name="Prevent a page from scrolling while a dialog is open"
  desc="Bramus:"
  url="https://css-tricks.com/prevent-a-page-from-scrolling-while-a-dialog-is-open"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2024/10/dialog-pop.jpg"/>

::: info Bramus (<VPIcon icon="fas fa-globe"/><code>bram.us</code>)

> Chrome 144 features a small change to `overscroll-behavior`: it now also works on non-scrollable scroll containers. While this change might seem trivial, it fixes an issue developers have been dealing with for ages: prevent a page from scrolling while a *(modal)* `<dialog>` is open.

<SiteInfo
  name="Use overscroll-behavior: contain to prevent a page from scrolling while a <dialog> is open"
  desc="Chrome 144 features a small change to overscroll-behavior: it now also works on non-scrollable scroll containers. While this change might seem trivial, it fixes an issue developers have been dealing with for ages: prevent a page from scrolling while a (modal) <dialog> is open."
  url="https://bram.us/2025/11/25/use-overscroll-behavior-contain-to-prevent-a-page-from-scrolling-while-a-dialog-is-open"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2025/11/overscroll-behavior_css.png"/>

:::

YES! Way back in 2019, I worked on [**“Prevent Page Scrolling When a Modal is Open”**](/css-tricks.com/prevent-page-scrolling-when-a-modal-is-open.md) with Brad Wu about this exact thing. Apparently this was mere months before [**we got our hands on the true HTML `<dialog>` element**](/css-tricks.com/some-hands-on-with-the-html-dialog-element.md). In any case, you can see the trouble with active scrolling when a “dialog” is open:

<CodePen
  user="anon"
  slug-hash="KLGKqJ"
  title="Avoid body scrollable in safari when modal dialog shown"
  :default-tab="['css','result']"
  :theme="dark"/>

The problem is that the dialog itself is not a scroll container. If it was, we could slap `overscroll-behavior: contain` on it and be done with it. Brad demoed his solution that involved a JavaScript-y approach that sets the `<body>` to fixed positioning when the dialog is in an open state:

<CodePen
  user="anon"
  slug-hash="LogERe"
  title="Avoid body scrollable in safari when modal dialog shown"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s the tweak Bramus is talking about. In Chrome 144, that’s no longer the case. Going back to that first demo, we can do a couple of things to avoid all the JS mumbo-jumbo.

First, we declare `overscroll-behavior` on both the dialog element and the backdrop and set it to `contain`:

```css
body {
  overscroll-behavior: contain;
}

#dialog {
  overscroll-behavior: contain;
}
```

You’d think that would do it, but there’s a super key final step. That dialog needs to be a scroll container, which we can do explicitly:

```css
#dialog {
  overscroll-behavior: contain;
  overflow: hidden;
}
```

Chrome 144 needed, of course:

<CodePen
  user="anon"
  slug-hash="WbwzERb"
  title="Avoid body scrollable in safari when modal dialog shown (using overscroll-behavior)"
  :default-tab="['css','result']"
  :theme="dark"/>

The demo that Bramus provided is much, much better as it deals with the actual HTML `<dialog>` element and its [<VPIcon icon="iconfont icon-css-tricks"/>`::backdrop`](https://css-tricks.com/almanac/pseudo-selectors/b/backdrop/):

<CodePen
  user="anon"
  slug-hash="QwNMroY"
  title="Use `overscroll-behavior: contain;` on `::backdrop` to prevent a page from scrolling when a <dialog> is open!"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Prevent a page from scrolling while a dialog is open",
  "desc": "Bramus:",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/prevent-a-page-from-scrolling-while-a-dialog-is-open.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
