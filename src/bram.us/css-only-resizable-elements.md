---
lang: en-US
title: "CSS-Only Resizable Elements"
description: "Article(s) > CSS-Only Resizable Elements"
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
      content: "Article(s) > CSS-Only Resizable Elements"
    - property: og:description
      content: "CSS-Only Resizable Elements"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/css-only-resizable-elements.html
prev: /programming/css/articles/README.md
date: 2020-05-15
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2020/05/css-resize.png
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
  name="CSS-Only Resizable Elements"
  desc="In Playing With (Fake) Container Queries Chris used the <resize-asaurus> web component to make the elements resizable. Curious to see how that worked I dug into its source. As I was expecting a truckload of JavaScript to make it work, I was very surprised to see that it basically revolved around using just one single … Continue reading ”CSS-Only Resizable Elements”"
  url="https://bram.us/2020/05/15/css-only-resizable-elements/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2020/05/css-resize.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2020/05/css-resize.png)

In [**Playing With (Fake) Container Queries**](/css-tricks.com/playing-with-fake-container-queries-with-watched-box-resizeasaurus.md) Chris used [the `<resize-asaurus>` web component (<VPIcon icon="iconfont icon-github"/>`filamentgroup/resizeasaurus`)](https://github.com/filamentgroup/resizeasaurus) to make the elements resizable. Curious to see how that worked I dug into its source.

As I was expecting a truckload of JavaScript to make it work, I was very surprised to [see (<VPIcon icon="iconfont icon-github"/>`filamentgroup/resizeasaurus`)](https://github.com/filamentgroup/resizeasaurus/blob/master/resizeasaurus.js#L4) that it basically revolved around using just one single CSS property: [<VPIcon icon="fa-brands fa-firefox"/>`resize`](https://developer.mozilla.org/en-US/docs/Web/CSS/resize)

> The `resize` CSS property sets whether an element is resizable, and if so, in which directions.

Accepted values for `resize` are `none`, `horizontal`, `vertical`, and `both`.

To play nice with [**CSS Logical Properties**](/bram.us/css-logical-properties-and-values-the-next-step-of-css-evolution.md) the values `block` and `inline` will also be supported.

::: note 😅

Up until then I thought `resize` was a thing reserved for `<textarea>` only.

:::

### Demo

To get `resize` working, one must apply it on a block level element + also set `overflow` to any value but `visible`. Below is a demo with `resize` set to `both`:

<CodePen
  user="bramus"
  slug-hash="mdeGgJR"
  title="Resizable Element (Pure CSS)"
  :default-tab="['css','result']"
  :theme="dark"/>

Don’t forget to set `min-width`/`min-height`/`max-width`/`max-height` in case you want to prevent the resizable box from becoming too small/big.

### Resizing `iframe`s *(and other replaced elements)*

A very practical use-case for this is resizable `iframe` elements: As many embedded CodePen pens are responsive, you want your visitor to be able to resize them.

Could this be a task for CSS `resize` property you ask? Why yes, but there’s one big problem though: **`resize` and `<iframe>` don’t play nice together** as an `<iframe>` is a replaced element.

::: details 🙋‍♂️ Replaced Elements?

As per [<VPIcon icon="iconfont icon-w3c"/>spec](https://w3.org/TR/css-display-3/#replaced-element):

> A replaced element is **an element whose content is outside the scope of the CSS formatting model**, such as an image or embedded document. For example, the content of the HTML `img` element is often replaced by the image that its `src` attribute designates.

Apart from the `img` mentioned in the defintion, `iframe`, `canvas`, etc. also are Replaced Elements.

:::

Of course, as with many web things, there’s a little workaround we can use:

1. Wrap the `<iframe>` in a `<div>`, and make the `<div>` resizable.
2. Have `<iframe>` strech along with the `<div>`‘s dimensions, using Flexbox.

Like so:

<CodePen
  user="bramus"
  slug-hash="KKdxyxo"
  title="Resizable iframe (Pure CSS)"
  :default-tab="['css','result']"
  :theme="dark"/>

As images also are replaced elements *(see above)*, you need to apply a similar trick to be able to resize them:

<CodePen
  user="bramus"
  slug-hash="mdrJgwy"
  title="Resizable image (Pure CSS)"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note ☝️

Note that I also added [**an `object-fit` rule**](/bram.us/css-object-fit.md) in there, to prevent aspect ratio distortion.

:::

### Browser Support

Resize is supported in all major browsers, except for MobileSafari (e.g. Safari on iOS). A shame though, as this once again pushes MobileSafari into the “(Mobile)Safari is the new IE6” corner …

 ![Data on support for the css-resize feature across the major browsers from caniuse.com](https://caniuse.bitsofco.de/image/css-resize.jpg) 

::: note 💡

Shown above is [**a dynamic CanIUse.com image**](/bram.us/embeddable-caniuse-images.md), showing an always up-to-date support table. By the time you are reading this browser support might have become better.

:::

::: details Sidenote: <code>@supports</code> vs. <code>resize: both;</code> vs. MobileSafari

In the demo above I wanted to show a warning in browsers that don’t support `resize: both;`. For that I tried using `@supports`, which has proven to be successful [**before**](/bram.us/firefox-72-individual-transform-properties.md).

```css
.warning {
  display: block;
}

/* Hide warning in case browser supports resize: both; */
@supports (resize: both) {
  .warning {
    display: none;
  }
}
```

MobileSafari however also hides the warning and thus falsely claims to support `resize: both`.

I’ve reported a bug on this:

```component VPCard
{
  "title": "211994 – MobileSafari falsely claims CSS resize property support",
  "desc": "",
  "link": "https://bugs.webkit.org/show_bug.cgi?id=211994/",
  "logo": "/images/favicon.ico",
  "background": "rgba(102,187,255,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS-Only Resizable Elements",
  "desc": "In Playing With (Fake) Container Queries Chris used the <resize-asaurus> web component to make the elements resizable. Curious to see how that worked I dug into its source. As I was expecting a truckload of JavaScript to make it work, I was very surprised to see that it basically revolved around using just one single … Continue reading ”CSS-Only Resizable Elements”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/css-only-resizable-elements.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
