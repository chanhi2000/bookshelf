---
lang: en-US
title: "Native Aspect Ratio Boxes in CSS thanks to aspect-ratio"
description: "Article(s) > Native Aspect Ratio Boxes in CSS thanks to aspect-ratio"
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
      content: "Article(s) > Native Aspect Ratio Boxes in CSS thanks to aspect-ratio"
    - property: og:description
      content: "Native Aspect Ratio Boxes in CSS thanks to aspect-ratio"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/native-aspect-ratio-boxes-in-css-thanks-to-aspect-ratio.html
prev: /programming/css/articles/README.md
date: 2020-11-30
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2020/11/aspect-ratio-boxes.png
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
  name="Native Aspect Ratio Boxes in CSS thanks to aspect-ratio"
  desc="In “CSS Box Sizing Module Level 4” a new aspect-ratio CSS property is defined. Let's take a look on how to use it …"
  url="https://bram.us/2020/11/30/native-aspect-ratio-boxes-in-css-thanks-to-aspect-ratio/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2020/11/aspect-ratio-boxes.png"/>

![Old vs. New. Image by [<VPIcon icon="fa-brands fa-x-twitter"/>`@una`](https://x.com/Una/status/1260980901934137345)](https://bram.us/wordpress/wp-content/uploads/2020/11/aspect-ratio-boxes.png)  

Back in May 2020 I was very delighted to [<VPIcon icon="iconfont icon-w3c"/>read](https://w3.org/blog/CSS/2020/05/26/css-sizing-4-fpwd/) that the first Working Draft of the [<VPIcon icon="iconfont icon-w3c"/>CSS Box Sizing Module Level 4](https://w3.org/TR/css-sizing-4/) got published, as it featured an addition to CSS that I’ve been wanting for a long time now: native support for aspect ratio boxes through the new `aspect-ratio` CSS property.

With Chromium 89 *(current Canary)* and Firefox 85 *(current Nightly)* already supporting `aspect-ratio` unflagged, it’s time to start playing with this new addition and start thinking about dropping [**all those nasty hacks to mimic aspect ratios in CSS**](/bram.us/aspect-ratios-in-css-are-a-hack.md). Let’s take a look …

::: details 🤔 Working Draft (WD)?

The *Working Draft (WD)* Maturity Level is the first official phase of the W3C Recommendation Track, and is considered **the design phase of a W3C spec**. In this phase the CSS Working Group will explore, revise and refine the contents of the module. The first published version of the WD is called the “First Public Working Draft”, which kicks off the WD phase.

From thereon a spec can become a *Candidate Recommendation (CR)* to finally land on being a *Recommendation (REC)*. In between those three stages there are two transition stages: *Last Call Working Draft (LCWD)* and *Proposed Recommendation (PR)*

In visual form, the Recommendation Track looks something like this:

![](https://bram.us/wordpress/wp-content/uploads/2020/11/W3C-recommendation-track.png)

See [<VPIcon icon="fas fa-globe"/>An Inside View of the CSS Working Group at W3C](http://fantasai.inkedblade.net/weblog/2011/inside-csswg/process) for more details on all phases.

:::

::: info If you’re wondering about Browser Support, here’s an up-to-date list

- Chromium: Shipped in Chromium 88, Jan 2021 *([<VPIcon icon="fa-brands fa-chrome"/>announcement](https://developer.chrome.com/blog/new-in-chrome-88/#aspect-ratio))*
- Gecko (Firefox): Shipped with Firefox 89, Jun 2021 *([<VPIcon icon="fa-brands fa-firefox"/>tracking bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1672073))*
- Webkit (Safari): Shipped with Safari 15, Sept 2021 *([<VPIcon icon="fa-brands fa-apple"/>release notes](https://developer.apple.com/documentation/safari-release-notes/safari-15-release-notes))*

:::

## aspect-ratio) Welcome `aspect-ratio`

In short, the `aspect-ratio` property allows you to define a preferred aspect ratio on elements:

```css
.box {
  width: 20vw;
  aspect-ratio: 16 / 9;
}
```

<CodePen
  user="bramus"
  slug-hash="yLayXxo"
  title="Aspect Ratio with Fallback"
  :default-tab="['css','result']"
  :theme="dark"/>

In the example above the `.box` will have a preferred aspect ratio of `16:9`. Since its `width` is set to `20vw`, the resulting height will be `20vw / 16 * 9` = `11.25vw`. Easy, right?

::: note 🤞

Psst, further down this you can find [a demo that includes a fallback for browsers that don’t support `aspect-ratio`](#using-aspect-ratio-with-a-fallback-for-older-browsers) 😉

:::
---

## Allowed values for `aspect-ratio`

The value as set in the example above for `aspect-ratio` is of [<VPIcon icon="iconfont icon-w3c"/>the `<ratio>` type](https://drafts.csswg.org/css-values-4/#ratio-value):

- It typically consists of two numbers separated by a `/`. The first parameter targets the width and the second one the height.
- It’s also allowed to pass in just a single number. In that case the second number will be we considered to be `1`. E.g. a `<ratio>` of `2` will translate to `2 / 1`.
- Passing in a `0` for either of the numbers is not allowed.
- The spaces around the `/` are not required, so `2/1` is also a valid `<ratio>` value.

Another allowed value for the `aspect-ratio` property — which also is the default — is `auto`. This indicates that the box has no preferred aspect ratio and should size itself as it normally would.

🙋‍♂️ Hold up! How come images already behave correctly, without needing to define an `aspect-ratio`?

Images may be commonly used, but they are a quite uncommon type of HTML element:

1. Images are [<VPIcon icon="iconfont icon-w3c"/>replaced elements](https://w3.org/TR/css-display-3/#replaced-element):

> A replaced element is **an element whose content is outside the scope of the CSS formatting model**, such as an image or embedded document. For example, the content of the HTML `<img>` element is often replaced by the image that its `src` attribute designates.

Just check your DevTools: the browser will make an extra HTTP request for any image and fetch its contents separately. Once loaded, the browser will replace the original `img` tag with the actual image contents.

2. Images have an [<VPIcon icon="iconfont icon-w3c"/>intrinsic aspect ratio](https://w3.org/TR/css-images-3/#intrinsic-dimensions):

> The intrinsic dimensions represent a preferred or **natural size of the object itself**; that is, they are not a function of the context in which the object is used.

Each photo that you take with your phone results in an image that has a certain width and height, which is referred to as the intrinsic or natural width/height. The intrinsic aspect ratio is the ratio between the intrinsic width and intrinsic height.

When the browser has fetched the image and needs to draw it on screen it will take its intrinsic aspect ratio into account to know how big it should be drawn.

3. When you define `width` and `height` attributes on an `img`, the browser will take those into account when drawing the image on screen. Nowadays browsers even internally map those properties to CSS sizing properties.

☝️ Do note that you can still set an `aspect-ratio` on an element that has an intrinsic aspect ratio. In that case your defined `aspect-ratio` will override the intrinsic aspect ratio.

---

## The fine print

### Aspect of what?

Depending upon which of `width` or `height` you set, the box dimensions will be calculated against that.

```css
.box {
  width: 20vw;
  aspect-ratio: 16 / 9; /* Dimensions will be calculated against the width,
                           yielding a height of 11.25vw (20vw / 16 * 9) */
}
```

```css
.box {
  height: 20vw;
  aspect-ratio: 16 / 9; /* Dimensions will be calculated against the height,
                           yielding a width of 35.55vw (20vw / 9 * 16) */
}
```

### note-dont-set-both-width-and-height) `aspect-ratio`+`width`+`height` = 🚫

Setting an `aspect-ratio` won’t have effect on elements that have both a CSS `width` and CSS `height` set to a value other than `auto`. Only one of `width` or `height` can be explicitly set, and the other should remain set to `auto`.

```css
.box {
  width: 20vw;
  height: 20vw;
  aspect-ratio: 16 / 9; /* won't have any effect! */
}
```

### note-parent) `aspect-ratio` + percentage based `width`/`height`

In case one of the `width` and `height` should be set to a percentage based value such as `100%`, the targeted box will take a look at the direct parent element’s dimensions to define its value upon that.

```css
.parent {
  height: 100px;
}
.parent .box {
  height: 100%;
  aspect-ratio: 1 / 1; /* .box will be 100px by 100px */
}
```

There’s some more edge cases here too, but let’s not get too deep into the spec 😉

### note-preferred) `aspect-ratio` sets a *preferred* aspect ratio

Setting an `aspect-ratio` will tell the browser that this is a *preferred* aspect ratio. Should the content of the box be larger, then the box will simply grow.

```css
div {
  aspect-ratio: 1/1;
  /* 'width' and 'height' both default to 'auto' */
}
+----------+  +----------+  +----------+
| ~~~~~~~~ |  | ~~~~~~~~ |  | ~~~~~~~~ |
| ~~~~~~~~ |  | ~~~~~~~~ |  | ~~~~~~~~ |
| ~~~~~~~  |  | ~~~~~~~~ |  | ~~~~~~~~ |
|          |  | ~~~      |  | ~~~~~~~~ |
+----------+  +----------+  | ~~~~~~~~ |
                            | ~~~~~~   |
                            +----------+
```

To maintain the `aspect-ratio`, you can set `overflow` to `auto` so that a scrollbar will be shown should the contents be larger:

```css
div {
  overflow: auto;
  aspect-ratio: 1/1;
}
+----------+  +----------+  +----------+
| ~~~~~~~~ |  | ~~~~~~~~ |  | ~~~~~~~~^|
| ~~~~~~~~ |  | ~~~~~~~~ |  | ~~~~~~~~ |
| ~~~~~~~  |  | ~~~~~~~~ |  | ~~~~~~~~ |
|          |  | ~~~      |  | ~~~~~~~~v|
+----------+  +----------+  +----------+
```

What also works, is setting `min-height`

> Overriding the `min-height` property also maintains the 1:1 aspect ratio, but will result in content overflowing the box if it is not otherwise handled.

```css
div {
  aspect-ratio: 1/1;
  min-height: 0;
}
+----------+  +----------+  +----------+
| ~~~~~~~~ |  | ~~~~~~~~ |  | ~~~~~~~~ |
| ~~~~~~~~ |  | ~~~~~~~~ |  | ~~~~~~~~ |
| ~~~~~~~  |  | ~~~~~~~~ |  | ~~~~~~~~ |
|          |  | ~~~      |  | ~~~~~~~~ |
+----------+  +----------+  +-~~~~~~~~-+
                              ~~~~~~    
```

---

## Demos

### Using `aspect-ratio` with a fallback for older browsers

Thanks to [**the powerful `@supports`**](/bram.us/using-feature-queries-in-css.md) it’s possible to add a fallback for browsers that don’t support `aspect-ratio`. In the demo below *(based upon [this demo by Una (<VPIcon icon="fa-brands fa-codepen"/>`una`)](https://codepen.io/una/pen/BazyaOM))* a fallback using the `padding-top` hack is applied:

<CodePen
  user="bramus"
  slug-hash="zYKxyrm"
  title="Aspect Ratio with Fallback"
  :default-tab="['css','result']"
  :theme="dark"/>

### Using `aspect-ratio` with CSS Custom Properties

By introducing a [**CSS Custom Property**](/bram.us/css-variables-var-subtitle.md) it’s possible to make your code more generic and extract away a `.aspect-ratio` class.

<CodePen
  user="bramus"
  slug-hash="LYREXXM"
  title="Aspect Ratio with Fallback"
  :default-tab="['css','result']"
  :theme="dark"/>

To use it, add apply the `.aspect-ratio` on the element you want, and pass in a `--aspect-ratio` CSS Custom Property:

```html
<div
  class="aspect-ratio"
  style="--aspect-ratio: 16/9;"
>I am an aspect ratio box</div>
```

The code is written so that it will use the value for `--aspect-ratio` in both the fallback and the modern version.

### Automatically setting `aspect-ratio` on `iframe`s and the like

When you embed an `iframe` you most likely set its `width` and `height` HTML attribute.

```html
<iframe
  src="https://www.youtube.com/embed/e7BkmF8CJpQ"
  width="560"
  height="315"></iframe>
```

~~It’s possible to use the values of these attributes to automatically set the `aspect-ratio`.~~

::: note UPDATE

This once was proposed, but it’s not how it was implemented. [<VPIcon icon="fas fa-globe"/>Read this post to know how it actually works.](https://jakearchibald.com/2022/img-aspect-ratio/#how-does-it-actually-work)

:::

```css
iframe[width][height] {
  aspect-ratio: attr(width) / attr(height);
}
```

~~Heck, you could even target `[width][height]` if you’d want!~~

::: note 💁‍♂️ FYI

This is also what browsers nowadays do for images: [**they map the values from the `width` and `height` HTML attributes from images to a `aspect-ratio` in order to prevent Cumulative Layout Shift**](/web.dev/optimize-cls.md#images-without-dimensions).

~Firefox’s internal stylesheet for example looks like this:~

```css
img, input[type="image"], video, embed, iframe, marquee, object, table {
  aspect-ratio: attr(width) / attr(height);
}
```

[**marquee**](/bram.us/css3-marquee.md), lol 😆

:::

<CodePen
  user="bramus"
  slug-hash="gOwbQBO"
  title="Aspect Ratio with Fallback"
  :default-tab="['css','result']"
  :theme="dark"/>

🐛 I’ve noticed that reading the `width`/`height` attribute values using `attr()` to pass them into `aspect-ratio` doesn’t seem to work in current Chromium. To cater for that I’m also passing their values by means of a CSS Custom Property …

```html
<iframe
  src="https://www.youtube.com/embed/e7BkmF8CJpQ"
  width="560"
  height="315"
  style="--aspect-ratio: 560 / 315"
></iframe> 
```

🙋‍♂️ Why doesn’t this iframe demo have a `padding-top` fallback injected using `:after`?

Just like images, iframes also are replaced elements. It’s not possible to inject contents using `:before`/`:after` on replaced elements.

If you really need to have a fallback, you need to wrap the `iframe` in a container and apply the `aspect-ratio` on the container. See [<VPIcon icon="fas fa-globe"/>Embed Responsively](https://embedresponsively.com/) and adjust were needed.

---

## In Closing

After 8 years of wanting this feature to land in CSS *([ref (<VPIcon icon="fa-brands fa-x-twitter"/>`bramus`)](https://x.com/bramus/status/229489411333705730))* I’m very happy to see this addition make it into the spec. It’s still a Working Draft right now, but that doesn’t stop me from being excited about it already. I hope you are too 🙂

::: info 📚

This post is part of a series called **[custom-tax id=”serie”]**. More posts in this series:

```component VPCard
{
  "title": "CSS Custom Functions are coming … and they are going to be a game changer!",
  "desc": "Chrome is currently prototyping CSS Functions, which is very exciting!",
  "link": "/bram.us/css-custom-functions-teaser.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The Future of CSS: Construct <custom-ident> and <dashed-ident> values with ident()",
  "desc": "Uniquely name a bunch elements in CSS in one go! Instead of assigning 100 unique names through 100 declarations, write only 1 and use ident() to construct the names.",
  "link": "/bram.us/the-future-of-css-construct-custom-idents-and-dashed-idents-with-ident.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Help choose the syntax for CSS Nesting!",
  "desc": "The CSS Working Group is continuing a debate over the best way to define nesting in CSS. And if you are someone who writes CSS, we’d like your help.",
  "link": "/bram.us/help-choose-the-syntax-for-css-nesting.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The Future of CSS: Variable Units, powered by Custom Properties",
  "desc": "Thanks to Variable Units, authors can define Custom Properties and use them as units in their CSS",
  "link": "/bram.us/the-future-of-css-variable-units-powered-by-custom-properties.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 4)",
  "desc": "🚨 UPDATE: The Scroll-Linked Animations Specification and its proposed syntax have undergone a major rewrite. This post details an older version of the syntax and has not been updated to reflect these changes. Do note that the concept of a Scroll-Linked Animation still stands, it’s only the syntax that has changed since writing this. Please … Continue reading ”The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 4)”",
  "link": "/bram.us/scroll-linked-animations-with-the-web-animations-api-waapi-and-scrolltimeline.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)",
  "desc": "A media feature like width can take its value from a range. When used, we prefix these with min- or max- to express “minimum condition” or “maximum condition” constraints. @media (min-width: 300px) and (max-width: 750px) { … } In CSS Media Queries Level 4 these type of Media Features can now be written as a … Continue reading ”Media Queries Level 4: Media Query Range Contexts (Media Query Ranges)”",
  "link": "/bram.us/media-queries-level-4-media-query-range-contexts.md",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The Future of CSS: Cascade Layers (CSS @layer)",
  "desc": "When authoring CSS we have to carefully think about how we write and structure our code. Cascade Layers (CSS @layer) aim to ease this task.",
  "link": "/bram.us/the-future-of-css-cascade-layers-css-at-layer.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 3)",
  "desc": "🚨 UPDATE: The Scroll-Linked Animations Specification and its proposed syntax have undergone a major rewrite. This post details an older version of the syntax and has not been updated to reflect these changes. Do note that the concept of a Scroll-Linked Animation still stands, it’s only the syntax that has changed since writing this. Please … Continue reading ”The Future of CSS: Scroll-Linked Animations with @scroll-timeline (Part 3)”",
  "link": "/bram.us/practical-use-cases-for-scroll-linked-animations-with-css-scroll-timeline.md",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "The Large, Small, and Dynamic Viewports",
  "desc": "There are some changes being proposed regarding viewport units, finally solving that ”100vh in Safari on iOS” issue …",
  "link": "/bram.us/the-large-small-and-dynamic-viewports.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "Create a color theme with CSS Relative Color Syntax, CSS color-mix(), and CSS color-contrast()",
  "desc": "Fabio Giolito explores three new CSS color features that landed in Safari Technology Preview: Relative color syntax, e.g. .bg-primary-100 { background-color: hsl(from var(--theme-primary) h s 90%); } .bg-primary-200 { background-color: hsl(from var(--theme-primary) h s 80%); } .bg-primary-300 { background-color: hsl(from var(--theme-primary) h s 70%); } ... CSS color-contrast, e.g. .text-contrast-primary { color: color-contrast(var(--theme-primary) vs white, … Continue reading ”Create a color theme with CSS Relative Color Syntax, CSS color-mix(), and CSS color-contrast()”",
  "link": "/bram.us/create-a-color-theme-with-css-relative-color-syntax-css-color-mix-and-css-color-contrast.md",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Native Aspect Ratio Boxes in CSS thanks to aspect-ratio",
  "desc": "In “CSS Box Sizing Module Level 4” a new aspect-ratio CSS property is defined. Let's take a look on how to use it …",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/native-aspect-ratio-boxes-in-css-thanks-to-aspect-ratio.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
