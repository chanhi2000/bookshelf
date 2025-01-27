---
lang: en-US
title: "Simplify Lazy Loading With Intersection Observer’s ScrollMargin"
description: "Article(s) > Simplify Lazy Loading With Intersection Observer’s ScrollMargin"
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
      content: "Article(s) > Simplify Lazy Loading With Intersection Observer’s ScrollMargin"
    - property: og:description
      content: "Simplify Lazy Loading With Intersection Observer’s ScrollMargin"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/simplify-lazy-loading-with-intersection-observers-scrollmargin.html
prev: /programming/js/articles/README.md
date: 2025-01-20
isOriginal: false
author:
  - name: Ingvild Forseth
    url : https://frontendmasters.com/blog/author/ingvild-forseth/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4990
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
  name="Simplify Lazy Loading With Intersection Observer’s ScrollMargin"
  desc="This helps load in data just *before* a user gets to it, and it works with non-root containers and horizontal scrolling."
  url="https://frontendmasters.com/blog/simplify-lazy-loading-with-intersection-observers-scrollmargin/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4990"/>

The [<FontIcon icon="fa-brands fa-firefox"/>Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) has since December 2023 in Chrome and Edge 120 been shipped with the new `options` property `scrollMargin`. However, **its convenience seems to be understated.** Even the [<FontIcon icon="fa-brands fa-firefox"/>MDN documentation on the Intersection Observer constructor](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) has yet to be updated with information about this property. It is definitely an upgrade to the Intersection Observer API, so I want to tell you more about it, particularly because it has already helped with with projects at work.

---

## The Problem with Intersection Observer’s `rootMargin`

The Intersection Observer API is a JavaScript API that makes it possible to know whether a DOM element is in the viewport or not. An intersection observers constructor takes an options object, in which a `rootMargin` can be specified. Its value is *“a string which specifies a set of offsets to add to the root’s bounding box when calculating intersections, effectively shrinking or growing the root […] The syntax is approximately the same as that for the CSS margin property” ([<FontIcon icon="fa-brands fa-firefox"/>MDN](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#rootmargin)).*

To give you an example: if you want some code to run *before* the element is actually in view, `rootMargin: "25%"` will make the Intersection Observer report an intersection when the observed element is 25% away from the viewport.

However, **a problem arises** if the Intersection Observer:

1. uses the default root (the document’s viewport)
2. is specified with a `rootMargin`
3. observes an element inside a scroll container

In that case, the intersection in the scroll direction is reported **as if no `rootMargin` has been specified.** This makes it impossible to get an intersection *before* the element in a scroll container is actually visible, which is a problem when trying to lazy load thing *just **before*** they are visible.

The workaround is to use the scroll container as the root instead of Intersection Observer’s default root. But it would be convenient if it was possible to keep using the default root!

---

## `scrollMargin` is the New Solution

The new Intersection Observer options property `scrollMargin` aims to rectify this. Without it, when the root is the document viewport, the scroll containers are clipped away. This is the cause of the aforementioned problem. With the new Intersection Observer property, each scroll container is expanded by the `scrollMargin` when calculating the intersection.

---

## A Typical Use Case

The use case for the `scrollMargin` property is using it as an indicator to request data when it is *about* to be scrolled into view. That’s called lazy loading, the point of which is to *not* load data that is so far off screen it’s possible the user never scrolls to see it.

The following Pen lazy loads data *both* in the vertical and horizontal directions. The UI/UX is like a streaming service, which is exactly where my use case and thus learning of this feature comes from. Similar use cases are scrolling carousels for eCommerce, news, images, etc.

<CodePen
  user="ingvild"
  slug-hash="zxOPWMZ"
  title="no_scroll_margin_streaming"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Video Examples

This is what lazy loading looks like *without* `scrollMargin` in place. Notice how you can see the element before the data is ready, and there is a noticable loading delay.

<VidStack src="https://videos.files.wordpress.com/8Da5aNMP/no-scrollmargin_mp4_hd_1080p.mp4" />

Here’s a video example of when we have `scrollMargin` in place in a supporting browser. Notice that the data is loaded ahead of time and it’s ready to go when the user gets there.

<VidStack src="https://videos.files.wordpress.com/OaPINqKl/with-scrollmargin_mp4_hd.mp4" />

In the video above it looks like we’re just horizontally scrolling some elements that are already loaded, but rest assured, they are being loaded *just in time* and are still properly lazy loading.

---

## Browser Support

At the time of writing (January 2025), only Chrome and Edge since version 120 support this new property. The status of the feature can be followed on the [<FontIcon icon="fa-brands fa-chrome"/>Chrome Platform Status Feature: Intersection Observer Scroll Margin page](https://chromestatus.com/feature/5091020593430528). It is already a part of the [<FontIcon icon="iconfont icon-w3c"/>W3C’s Intersection Observer specification](https://w3c.github.io/IntersectionObserver/#dom-intersectionobserver-scrollmargin). When it comes to Safari, it has been reported as [<FontIcon icon="fas fa-globe"/>a missing feature on the Webkit Bugzilla platform](https://bugs.webkit.org/show_bug.cgi?id=264864) since Nov 2023. Unfortunately, I will caution against using `scrollMargin` as a progressive enhancement. The consequence is that in Safari, the data will not load before it is scrolled into view, and the user will see the data appearing. This sounds innocent enough, but there is a problem with VoiceOver in Safari. It’s a “vicious circle” type of problem: in order for the screen reader to navigate to the element, it needed to have its data loaded, but in order to load its data, it needed to be scrolled into view.

In spite of the lacking Safari support, I wanted to write about this property. The reason is that I think we as web developers should all push for [<FontIcon icon="fas fa-globe"/>web browser interoperability](https://wpt.fyi/interop-2024), and from my experience, I think the web platform would benefit from having `scrollMargin` supported.

*Thanks to Johannes Odland.*

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Simplify Lazy Loading With Intersection Observer’s ScrollMargin",
  "desc": "This helps load in data just *before* a user gets to it, and it works with non-root containers and horizontal scrolling.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/simplify-lazy-loading-with-intersection-observers-scrollmargin.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
