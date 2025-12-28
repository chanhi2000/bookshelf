---
lang: en-US
title: "CSS Media Queries: Quick Reference & Guide"
description: "Article(s) > CSS Media Queries: Quick Reference & Guide"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS Media Queries: Quick Reference & Guide"
    - property: og:description
      content: "CSS Media Queries: Quick Reference & Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/css-media-queries.html
prev: /programming/css/articles/README.md
date: 2018-06-07
isOriginal: false
author: Alligator
cover: https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg
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
  name="CSS Media Queries: Quick Reference & Guide"
  desc="CSS media queries are the most powerful way to create responsive layouts and designs on the web. Get a quick refresher with this post. "
  url="https://digitalocean.com/community/tutorials/css-media-queries"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"/>

[Media queries](https://w3.org/TR/mediaqueries-4/) give us a very powerful way to adjust our styles according to factors like the type of device used, the viewport size, the screen’s pixel density, or even the device orientation. As media queries have been around for quite a while, you may already be familiar with the basic syntax and usage. This post therefore aims to be a good quick reference point, and hopefully you’ll also discover a few tricks you didn’t know were possible.

---

## Basic Media Queries

Media queries are defined using the `@media` at-rule followed by a media type, 0 or more media features or both a media type and media feature(s). The available media types are all, print, screen and speech, and when not specified the type of all is implied. Multiple media types can be used at once and they should be separated by commas:

```css
@media screen, print {
  /* Styles for screen and print devices */
}
```

Media types such as tv or projection have been deprecated with Media Queries level 4. As for media features, they are defined in parentheses and a vast array of features can be tested. Some of the most popular features are width, height, aspect-ratio, orientation and resolution. Many of these popular features are range features so they also have a min and max version available (eg.: min-width, max-width, min-aspect-ratio, max-aspect-ratio,…)

In the following simple example, the default background color is hotpink, but screen devices with a viewport width that’s 650px or less will have a background color of rebeccapurple instead:

```css
body {
  background: hotpink;
}

@media screen and (max-width: 650px) {
  body {
    background: rebeccapurple;
  }
}
```

Notice how, when specifying both a media type and a media feature, we need to use the and logical operator between them.

---

Here are a few more examples of simple media queries that specify either a media type, a media feature or both:

```css
@media print {
  /* styles for print media only */
}

@media (max-width: 65rem) {
  /* styles for any device that has a display width of 65rem or less */
}

@media screen and (min-width: 800px) {
  /* styles for screen viewports that have a width of 800px or more */
}
```

## Multiple Media Features

You can specify multiple media feature requirements to satisfy the media query using the and logical operator between features. When using and, the query will match only if all the features evaluate to true. For example, it’s very common to have layouts that adjust to a few different ranges of viewport widths:

```css
/* Extra-small */
@media screen and (max-width: 360px) {
  /* ... */
}

/* Small */
@media screen and (min-width: 361px) and (max-width: 480px) {
  /* ... */
}

/* Medium-only */
@media screen and (min-width: 481px) and (max-width: 960px) {
  /* ... */
}

/* ... */
```

## Or Logical Operator Using Commas

You can define multiple queries separated by commas, in which case the commas act as logical or operators and the query becomes a list of queries. The media query will apply if any of the comma separated queries matches.

In the following example, the media query will be true if the device has an orientation of portrait or if the device’s viewport has a min-width of 3rem and a max-aspect-ratio of 2/1:

```css
@media (orientation: portrait), (min-width: 3rem) and (max-aspect-ratio: 2/1) {
  /* ... */
}
```

---

## Not Logical Operator

You can use the not logical operator at the beginning of a query to toggle the truthiness of the whole query. The not operator is useful to apply styles when certain conditions are not met by the browser or device. In the following example, the media query will apply when the primary pointing device can’t hover on elements:

```css
@media not screen and (hover: hover) {
  /* ... */
}
```

Note that with not the media type is not optional. Also, not doesn’t negate an entire query list (queries separated with commas), but only one query.

---

## Only Logical Operator

The only logical operator is a little bit special and hides the entire query for older browsers. In other words, older browsers don’t understand the **only** keyword so the entire media query is ignored. Otherwise only has not effect:

```css
@media only all and (min-width: 320px) and (max-width: 480px) {
  /* ignored by older browsers */
}
```

As with the not operator, the media type is not optional when using only. Note that legacy browsers that don’t support Media Queries level 3 are rare now so in most cases the use of only is unnecessary.

---

## Additions from Media Queries Level 4

The latest edition of the media query spec (level 4) specifies quite a few new media features that can be tested:

- `pointer`: If there’s a primary pointing device (none, coarse or fine).
- `any-pointer`: If there’s any pointing device available (none, coarse or fine).
- `hover`: Can the primary pointing device hover on elements (none or hover).
- `any-hover`: Can any of the available pointing devices hover on elements (none or hover).
- `color-gamut`: The range of available colors (srgb, p3 or rec2020).
- `overflow-inline`: How potential overflow on the inline axis is treated (none, paged, optional-paged or scroll).
- `overflow-block`: How potential overflow on the block axis is treated (none, paged, optional-paged or scroll).
- `update`: At which frequency the layout can be updated (none, slow or fast).

---

## Media Queries for Retina Displays

Over the last few years we’ve started to see a proliferation of devices with displays that have a higher pixel density. It can be useful to style certain aspects of your designs differently for devices with these higher pixel densities. A good example would be providing high-resolution version of certain graphics.

We can accomplish this using the min-resolution media feature with a value of 192dpi. However, the resolution feature is not necessarily supported across all browsers and for a more foolproof approach we can also add an additional non-standard -webkit-min-device-pixel-ratio feature with a value of 2:

```css
@media screen and
  (min-resolution: 192dpi),
  (-webkit-min-device-pixel-ratio: 2) {
    /* ... */
}
```

You can track the current browser support for the resolution media feature [<VPIcon icon="iconfont icon-caniuse"/>on Can I Use](https://caniuse.com/#feat=css-media-resolution).

::: info Resources

Below are a few very useful media query-related resources:

- CSS-Tricks’ [<VPIcon icon="iconfont icon-css-tricks"/>Media Queries for Standard Devices](https://css-tricks.com/snippets/css/media-queries-for-standard-devices/).
- [<VPIcon icon="fas fa-globe"/>MQTest.io](http://mqtest.io/), to test which media features your device responds to.
- MDN’s [<VPIcon icon="fa-brands fa-firefox"/>reference of available media features](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries#Media_features).

::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Media Queries: Quick Reference & Guide",
  "desc": "CSS media queries are the most powerful way to create responsive layouts and designs on the web. Get a quick refresher with this post. ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/css-media-queries.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
