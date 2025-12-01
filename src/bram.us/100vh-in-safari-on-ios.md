---
lang: en-US
title: "100vh in Safari on iOS"
description: "Article(s) > 100vh in Safari on iOS"
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
      content: "Article(s) > 100vh in Safari on iOS"
    - property: og:description
      content: "100vh in Safari on iOS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/100vh-in-safari-on-ios.html
prev: /programming/css/articles/README.md
date: 2020-05-07
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2020/05/safari-100vh.jpg
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
  name="100vh in Safari on iOS"
  desc="Update 2021.07.08: There are new viewport units on the way that will finally solve this issue. 100dvh is the one you’re looking for. When working with Viewport Units there’s this longstanding and extremely annoying bug in Safari on iOS where it does not play nice with the vh unit. Setting a container to 100vh for … Continue reading ”100vh in Safari on iOS”"
  url="https://bram.us/2020/05/06/100vh-in-safari-on-ios/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2020/05/safari-100vh.jpg"/>

::: note Update 2021.07.08

There are [**new viewport units**](/bram.us/the-large-small-and-dynamic-viewports.md) on the way that will finally solve this issue. [**`100dvh`**](/bram.us/the-large-small-and-dynamic-viewports.md#dynamic-viewport) is the one you’re looking for.

When working with Viewport Units there’s [<VPIcon icon="fa-brands fa-safari"/>this longstanding and extremely annoying bug in Safari on iOS](https://bugs.webkit.org/show_bug.cgi?id=141832) where it does not play nice with the `vh` unit. Setting a container to `100vh` for example will actually result in an element that’s a wee bit too tall: [<VPIcon icon="fas fa-globe"/>MobileSafari ignores parts of its UI when calculating `100vh`](https://maximilianschmitt.me/posts/css-100vh-mobile-browsers/).

![Image by [<VPIcon icon="fas fa-globe"/>Max Schmitt](https://maximilianschmitt.me/posts/css-100vh-mobile-browsers/)](https://bram.us/wordpress/wp-content/uploads/2020/05/lld-minimal-vs-normal-ui@2x.png)

::: note

🤔 New to Viewport Units? [**Ahmad Shadeed has got you covered**](/bram.us/2020/03/16/the-ultimate-guide-to-css-viewport-units.md).

:::

**Apple/WebKit’s stance is that [<VPIcon icon="fa-brands fa-safari"/>it works as intended](https://bugs.webkit.org/show_bug.cgi?id=141832#c5), although it’s not what I _(and many other developers)_ expect.** As a result we have to rely on workarounds.

In the past I’ve used [**Viewport Units Buggyfill**](/bram.us/making-viewport-units-work-properly-in-mobile-safari.md) or [**Louis Hoebregts’ CSS Custom Properties Hack**](/css-tricks.com/the-trick-to-viewport-units-on-mobile.md) to fix this behavior. I was glad to see that Matt Smith recently found a way to have MobileSafari render an element at `100vh` using CSS:

As [I replied on Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`bramus`)](https://twitter.com/bramus/status/1254330220347371521): **Nice, but I’d rather have MobileSafari fix the `vh` unit**, as using `-webkit-fill-available` for this will only work to achieving `100vh`.

If you want to achieve a perfect `50vh` for example, using `-webkit-fill-available` won’t work as [you can’t use `-webkit-fill-available` in `calc()` (<VPIcon icon="fa-brands fa-codepen"/>`bramus`)](https://codepen.io/bramus/pen/dyYWNVX). Above that it won’t work when the targeted element is nested somewhere deep in your DOM tree with one its parents already having a height set.

Come ‘on Safari, stop being the new IE6 …

::: note UPDATE 2020.05.16

Apparently this `-webkit-fill-available` workaround can negatively impact the Chrome browser:

Given this it’s recommended to selectively ship `-webkit-fill-available` to only Safari using [**a `@supports` rule**](/bram.us/using-feature-queries-in-css.md) that tests for `-webkit-touch-callout` support:

```css
body {
  height: 100vh;
}

@supports (-webkit-touch-callout: none) {
  body {
    height: -webkit-fill-available;
  }
}
```

Alternatively you can still use [**Louis Hoebregts’ CSS Custom Properties Hack**](/css-tricks.com/the-trick-to-viewport-units-on-mobile.md), which uses JavaScript:

```css
.my-element {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
```

```js
const setVh = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('load', setVh);
window.addEventListener('resize', setVh);
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "100vh in Safari on iOS",
  "desc": "Update 2021.07.08: There are new viewport units on the way that will finally solve this issue. 100dvh is the one you’re looking for. When working with Viewport Units there’s this longstanding and extremely annoying bug in Safari on iOS where it does not play nice with the vh unit. Setting a container to 100vh for … Continue reading ”100vh in Safari on iOS”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/100vh-in-safari-on-ios.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
