---
lang: en-US
title: "Browser Support Tests in JavaScript for Modern Web Features"
description: "Article(s) > Browser Support Tests in JavaScript for Modern Web Features"
icon: fa-brands fa-js
category: 
  - JavaScript
  - Article(s)
tag: 
  - blog
  - frontendmasters.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: Article(s) > Browser Support Tests in JavaScript for Modern Web Features
    - property: og:description
      content: Browser Support Tests in JavaScript for Modern Web Features
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/browser-support-tests-in-javascript-for-modern-web-features.html
prev: /programming/js/articles/README.md
date: 2024-06-28
isOriginal: false
author: Chris Coyier
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/2865
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Browser Support Tests in JavaScript for Modern Web Features"
  desc="Sometimes it's good to know when a browser feature is supported or not so you can do something. Perhaps load a polyfill or just choose a slightly different approach. This post looks at newish features in browsers and shows the test."
  url="https://frontendmasters.com/browser-support-tests-in-javascript-for-modern-web-features"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/2865"/>

This is just a no-frills post with code snippets showing how to test support for some newish features in HTML, CSS, and JavaScript. This is in no way comprehensive and doesn’t get into what these features do, which is better covered in other posts. It also doesn’t get into testing the support in any other language than JavaScript. Look to [<FontIcon icon="fa-brands fa-firefox"/>`@supports` in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports) for that, mostly.

Feel free to chime in with more of your own so this can be as helpful of a resource as it can be!

---

## HTML Features

::: tabs

@tab:active View Transitions

<SiteInfo
  name="View Transitions API - Web APIs | MDN"
  desc="The View Transitions API provides a mechanism for easily creating animated transitions between different website views. This includes animating between DOM states in a single-page app (SPA), and animating the navigation between documents in a multi-page app (MPA)."
  url="https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Not Supported
if (!document.startViewTransition) {
  updateTheDOMSomehow();
} else {
  // Supported
  document.startViewTransition(() => {
    updateTheDOMSomehow()
  });
}
```

I’m really not sure how to test for [`@view-transition`](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition) support.

<SiteInfo
  name="@view-transition - CSS: Cascading Style Sheets | MDN"
  desc="The @view-transition CSS at-rule is used to opt in the current and destination documents to undergo a view transition, in the case of a cross-document navigation."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::

## Popovers

<SiteInfo
  name="Popover API - Web APIs | MDN"
  desc="The Popover API provides developers with a standard, consistent, flexible mechanism for displaying popover content on top of other page content. Popover content can be controlled either declaratively using HTML attributes, or via JavaScript."
  url="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if (HTMLElement.prototype.hasOwnProperty("popover")) {

}
```

::: tabs

@tab:active <code>\<dialog\></code> Element

<SiteInfo
  name="<dialog>: The Dialog element - HTML: HyperText Markup Language | MDN"
  desc="The <dialog> HTML element represents a modal or non-modal dialog box or other interactive component, such as a dismissible alert, inspector, or subwindow."
  url="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if (typeof HTMLDialogElement === 'function') {
 
}
```

@tab Declarative Shadow DOM

<SiteInfo
  name="Declarative Shadow DOM | web.dev"
  desc="Declarative Shadow DOM is a new way to implement and use Shadow DOM directly in HTML."
  url="https://web.dev/articles/declarative-shadow-dom/"
  logo="https://gstatic.com/devrel-devsite/prod/vb4766d511641fb9a17edf27ece72c6c6ca056c75a92d2c9b1f18896d7eaaa135/web/images/favicon.png"
  preview="https://web.dev/images/social-wide.jpg"/>

```js
// Supported
if (!!Element.prototype.attachShadow) {

}
```

@tab Lazy Loading Images

<SiteInfo
  name="<img>: The Image Embed element - HTML: HyperText Markup Language | MDN"
  desc="The <img> HTML element embeds an image into the document."
  url="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if ('loading' in HTMLImageElement.prototype) {

}
```

@tab Lazy Loading Iframes

<SiteInfo
  name="<iframe>: The Inline Frame element - HTML: HyperText Markup Language | MDN"
  desc="The <iframe> HTML element represents a nested browsing context, embedding another HTML page into the current one."
  url="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if ('loading' in HTMLIFrameElement.prototype) {

}
```

:::

---

## CSS Features

CSS selectors and property: value pairs can be tested with `CSS.supports()` from JavaScript.

::: tabs

@tab:active <code>:where()</code>

<SiteInfo
  name=":where() - CSS: Cascading Style Sheets | MDN"
  desc="The :where() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/:where/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if (CSS.supports('selector(:where(h1))')) {
  document.documentElement.classList.add("supports-where");
}
```

@tab <code>:has()</code>

<SiteInfo
  name=":has() - CSS: Cascading Style Sheets | MDN"
  desc="The functional :has() CSS pseudo-class represents an element if any of the relative selectors that are passed as an argument match at least one element when anchored against this element. This pseudo-class presents a way of selecting a parent element or a previous sibling element with respect to a reference element by taking a relative selector list as an argument."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/:has/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if (CSS.supports('selector(:has(h1))')) {
  document.documentElement.classList.add("supports-has");
}
```

@tab <code>@layer</code>

<SiteInfo
  name="@layer - CSS: Cascading Style Sheets | MDN"
  desc="The @layer CSS at-rule is used to declare a cascade layer and can also be used to define the order of precedence in case of multiple cascade layers."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/@layer/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if (typeof CSSLayerBlockRule !== "undefined") {

}
```

@tab Anchor Positioning

<SiteInfo
  name="CSS anchor positioning - CSS: Cascading Style Sheets | MDN"
  desc="The CSS anchor positioning module defines features that allow you to tether elements together. Certain elements are defined as anchor elements; anchor-positioned elements can then have their size and position set based on the size and location of the anchor elements to which they are bound."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if (CSS.supports("anchor-name: --anchor-el")) {

}
```

@tab Subgrid

<SiteInfo
  name="Subgrid - CSS: Cascading Style Sheets | MDN"
  desc="Level 2 of the CSS grid layout specification includes a subgrid value for grid-template-columns and grid-template-rows. This guide details what subgrid does and gives some use cases and design patterns that the feature solves."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if (CSS.supports("grid-template-columns", "subgrid")) {
  
}
```

@tab <code>light-dark()</code>

<SiteInfo
  name="light-dark() - CSS: Cascading Style Sheets | MDN"
  desc="The light-dark() CSS <color> function enables setting two colors for a property - returning one of the two colors options by detecting if the developer has set a light or dark color scheme or the user has requested light or dark color theme - without needing to encase the theme colors within a prefers-color-scheme media feature query.
  Users are able to indicate their color-scheme preference through their operating system settings (e.g. light or dark mode) or their user agent settings. The light-dark() function enables providing two color values where any <color> value is accepted. The light-dark() CSS color function returns the first value if the user's preference is set to light or if no preference is set and the second value if the user's preference is set to dark."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if (CSS.supports('color: light-dark(black, white)')) {

}
```

@tab OKLCH Color

<SiteInfo
  name="oklch() - CSS: Cascading Style Sheets | MDN"
  desc="The oklch() functional notation expresses a given color in the Oklab color space. oklch() is the cylindrical form of oklab(), using the same L axis, but with polar Chroma (C) and Hue (h) coordinates."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if (CSS.supports("color: oklch(0% 0 0")) {

}
```

:::

---

## JavaScript Features

::: tabs

@tab:active AbortController

<SiteInfo
  name="AbortController - Web APIs | MDN"
  desc="The AbortController interface represents a controller object that allows you to abort one or more Web requests as and when desired."
  url="https://developer.mozilla.org/en-US/docs/Web/API/AbortController/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if (typeof AbortController === "function") {

}
```

@tab <code>Promise.finally()</code>

<SiteInfo
  name="Promise.prototype.finally() - JavaScript | MDN"
  desc="The finally() method of Promise instances schedules a function to be called when the promise is settled (either fulfilled or rejected). It immediately returns another Promise object, allowing you to chain calls to other promise methods."
  url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally/"
  logo="https://developer.mozilla.org/favicon-48x48.bc390275e955dacb2e65.png"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

```js
// Supported
if (typeof Promise.prototype.finally === 'function') {
  
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Browser Support Tests in JavaScript for Modern Web Features",
  "desc": "Sometimes it's good to know when a browser feature is supported or not so you can do something. Perhaps load a polyfill or just choose a slightly different approach. This post looks at newish features in browsers and shows the test.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/browser-support-tests-in-javascript-for-modern-web-features.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
