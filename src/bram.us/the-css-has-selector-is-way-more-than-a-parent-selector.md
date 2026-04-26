---
lang: en-US
title: "The CSS :has() selector is way more than a “Parent Selector”"
description: "Article(s) > The CSS :has() selector is way more than a “Parent Selector”"
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
      content: "Article(s) > The CSS :has() selector is way more than a “Parent Selector”"
    - property: og:description
      content: "The CSS :has() selector is way more than a “Parent Selector”"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/the-css-has-selector-is-way-more-than-a-parent-selector.html
prev: /programming/css/articles/README.md
date: 2021-12-21
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2021/12/styles.css.png
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
  name="The CSS :has() selector is way more than a “Parent Selector”"
  desc="Safari TP 137 just dropped with unflagged support for :has(). Often dubbed ”the parent selector”, :has() is way more than that …"
  url="https://bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2021/12/styles.css.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2021/12/styles.css.png)

[<VPIcon icon="fa-brands fa-safari"/>Safari Technology Preview 137](https://webkit.org/blog/12156/release-notes-for-safari-technology-preview-137/) just dropped, with **unflagged** support for CSS `:has()`. Often dubbed “the parent selector”, CSS `:has()` is way more than that …

---

## CSS `:has()`?

As per [<VPIcon icon="iconfont icon-w3c"/>selectors-4 specification](https://drafts.csswg.org/selectors-4/#has-pseudo):

> The `:has()` CSS pseudo-class represents an element if any of the selectors passed as parameters match at least one element.

This selector is dubbed “the parent selector”, as the default cases indeed allow you to select a parent element that has certain children.

```css
/* Matches <a> elements that contain an <img> child */
a:has(img) { … }

/* Matches <a> elements that directly contain an <img> child */
a:has(> img) { … }

/* Matches <section> elements that don’t contain any heading elements: */
section:not(:has(h1, h2, h3, h4, h5, h6))
```

Cool!

---

## More than a parent selector

The `:has()` selector is way more than that just a parent selector though. As [Adrian Bece (<VPIcon icon="fa-brands fa-x-twitter" />`AdrianBeceDev`)](https://x.com/AdrianBeceDev) shared in [**his post on Smashing Magazine**](/smashingmagazine.com/has-native-css-parent-selector.md#css-has-pseudo-class-specification):

```css
/*  Matches <figure> elements that have a <figcaption> as a child element */
figure:has(figcaption) { … }

/* Matches <img> elements that is a child of a <figure> that contains a <figcaption> child element */
figure:has(figcaption) img { … }
```

The `figure:has(figcaption)` selector matches the `figure` that has a `figcaption`. The `figure:has(figcaption) img` selector OTOH matches the `img` inside of the `figure` that has as `figcaption`

Here’s a pen:

<CodePen
  user="bramus"
  slug-hash="MWEvKEg"
  title="The CSS :has() selector is way more than a “Parent Selector”"
  :default-tab="['css','result']"
  :theme="dark"/>

In browsers that support `:has()` you should see a red dashed border around the top image.

Here’s another example from the spec which uses a relative selector. It selects the `h1` that is followed by a `p`, showing that selection is not limited to parents only.

```css
/* Matches <h1> elements only if they have a <p> element directly following them */
h1:has(+ p) { … }
```

This works because the `:has()` relational pseudo-class selector accepts a `<relative-selector-list>` as an argument. That’s a list of `<relative-selector>`s which can contain any of the combinators we already know: `+`, `~`, `>`, …

::: note Update

My colleague [<VPIcon icon="fa-brands fa-chrome"/>Jhey (<VPIcon icon="fa-brands fa-x-twitter" />`jh3yy`)](https://twitter.com/jh3yy) has [<VPIcon icon="fa-brands fa-chrome"/>a nice article up on developer.chrome.com](https://developer.chrome.com/blog/has-m105/) where he calls it “The Family Selector” – I like this name!

:::

---

## Other peculiar traits

Just like [**CSS `:is()`**](/bram.us/three-important-things-you-should-know-about-css-is.md), CSS `:has()` has these specific traits:

1. ~The selector list of `:has()` is forgiving~ As [per CSSWG resolution on 2022.12.07 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/7676#issuecomment-1341347244), the argument now is a (non-forgiving) `<relative-selector-list>` list – This to not break jQuery.
2. The specificity of `:has()` is that of its most specific argument

Hit [**the post on CSS `:is()`**](/bram.us/three-important-things-you-should-know-about-css-is.md) for more info on this.

---

## Browser Support

::: note 💡 Last update: Dec 19, 2023 

Although this post was originally published in December 2021, the section below is constantly being updated.

:::

Here is an up-to-date list of browser support for the CSS `:has()` selector:

::: tabs#

@tab:active <VPIcon icon="fa-brands fa-chrome"/> (Blink)

✅ Available in Chromium 105 and up.

Experimental support first appeared in Chromium 103.

@tab <VPIcon icon="fa-brands fa-firefox"/> (Gecko)

✅ Available in Firefox 121 and up.

Experimental support first appeared in Firefox 103.

@tab <VPIcon icon="fa-brands fa-safari"/> (WebKit)

✅ Available in Safari 15.4 and up.

Experimental support first appeared in Safari Technology Preview 137. 

:::

The pen embedded below will indicate if the browser you are currently using supports CSS `:has()` or not:

<CodePen
  user="bramus"
  slug-hash="poWJXGY"
  title="CSS :has Selector Support test"
  :default-tab="['css','result']"
  :theme="dark"/>

To stay up-to-date regarding browser support, you can follow these tracking issues:

- WebKit/Safari: [<VPIcon icon="fa-brands fa-safari"/>Issue #227702](https://bugs.webkit.org/show_bug.cgi?id=227702) — RESOLVED FIXED
- Blink/Chromium: [<VPIcon icon="fa-brands fa-chrome"/>Issue #669058](https://bugs.chromium.org/p/chromium/issues/detail?id=669058) — Fixed (Closed)
- Gecko/Firefox: [<VPIcon icon="fa-brands fa-firefox"/>Issue #418039](https://bugzilla.mozilla.org/show_bug.cgi?id=418039) — NEW

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The CSS :has() selector is way more than a “Parent Selector”",
  "desc": "Safari TP 137 just dropped with unflagged support for :has(). Often dubbed ”the parent selector”, :has() is way more than that …",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/the-css-has-selector-is-way-more-than-a-parent-selector.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
