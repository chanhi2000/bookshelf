---
lang: en-US
title: "Let's Stop Misusing overscroll-behavior"
description: "Article(s) > Let's Stop Misusing overscroll-behavior"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - webdevredfox.org
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Let's Stop Misusing overscroll-behavior"
    - property: og:description
      content: "Let's Stop Misusing overscroll-behavior"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/webdevredfox.org/postlets-stop-misusing-overscroll-behavior.html
prev: /programming/css/articles/README.md
date: 2026-01-28
isOriginal: false
author:
  - name: Gustavo Marquez Lainez
    url: https://gustavom.codeberg.page/#about
cover: https://webdevredfox.org/_app/immutable/assets/overscroll-behavior-snippet.Cbmt3_ZQ.png
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
  name="Let's Stop Misusing overscroll-behavior"
  desc="We're missing a key point that hurts usability!"
  url="https://webdevredfox.org/post/lets-stop-misusing-overscroll-behavior"
  logo="https://svelte.dev/favicon.png"
  preview="https://webdevredfox.org/_app/immutable/assets/overscroll-behavior-snippet.Cbmt3_ZQ.png"/>

## The Problem

In a browser like Safari or Firefox, you notice you scroll past the ends of the page, and it bounces back. This behavior can be called overscrolling.

You may find this to be annoying, others may be fine with it; or you may find that it hurts the design of your website. The user sees a part of the page that they aren’t supposed to see. Your design may not account for this!

So you go search for a solution.

You may have checked StackOverflow, or found something on MDN. What is suggested and what you may reach for is the CSS property [<VPIcon icon="fa-brands fa-firefox"/>`overscroll-behavior`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior). You may set this as `overscroll-behavior: contain;` on the `body`, and there we go! Problem solved.

No more elastic bouncing...

---

## However! 📣

There is something many developers miss about the `contain` value of this property:

::: info overscroll-behavior (<VPIcon icon="fa-brands fa-firefox"/><code>oper.mozilla.org</code>)

> The contain value **disables native browser navigation**, including the vertical pull-to-refresh gesture and horizontal swipe navigation.  

<SiteInfo
  name="overscroll-behavior - CSS | MDN"
  desc="The overscroll-behavior CSS property sets what a browser does when reaching the boundary of a scrolling area."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior#contain"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

I use my touchpad a lot! Gestures are the main way I like to navigate the web!

When you’re applying this property, you’re hurting the usability of your website by introducing unexpected behavior. This can become an annoyance, among other things like back-button-hijacking.

---

The MDN page provides [<VPIcon icon="fa-brands fa-firefox"/>one example](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior#examples), preventing a child scroller from affecting its parent scroller. But then goes on to…

::: info overscroll-behavior (<VPIcon icon="fa-brands fa-firefox"/><code>oper.mozilla.org</code>)

> We also wanted to get rid of the standard overscroll effects when the contacts are scrolled to the top or bottom

<SiteInfo
  name="overscroll-behavior - CSS | MDN"
  desc="The overscroll-behavior CSS property sets what a browser does when reaching the boundary of a scrolling area."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overscroll-behavior#examples:~:text=We%20also%20wanted%20to%20get%20rid%20of%20the%20standard%20overscroll%20effects%20when%20the%20contacts%20are%20scrolled%20to%20the%20top%20or%20bottom"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

:::

**No! Encourage the thing I've been warning about!** Have you not remembered what you've mentioned before!?

---

## What should it really be used for?

One other use I can think of for this property… is if you’re building your own pull-to-refresh feature like what is done in some PWA’s, that refreshes the relevant content rather than refreshing the entire page.

In this case, **you should only apply the `contain` value on the y-axis.** This can be done with `overscroll-behavior-y: contain;` or `overscroll-behavior: auto contain;`.

Using just `overscroll-behavior: contain;`, means that you are disabling browser gestures for *both* pull-to-refresh (y-axis), and swipe-to-navigate (x-axis)!

---

## What should we do instead?

You may need to take into account the overscroll when styling your website. Make sure you set the proper `background-color` on the `body`. Using `position: fixed;` will keep the element fixed in place during overscroll, while `position: sticky` will stop sticking once you reach past its container.

---

## What if I just don’t like overscroll?

**Firefox:** Visit `about:config`, search for `apz.overscroll.enabled` and set it to `false`

**Other Browsers:** Unfortunately, I am unsure if it is possible to disable overscroll on Safari. Nor am I aware of other browsers with this behavior.

If you don’t care about the gestures, you may apply this CSS snippet using a browser extension like [<VPIcon icon="fas fa-globe"/>Stylus](https://add0n.com/stylus.html) or (I haven’t tested) [<VPIcon icon="fas fa-globe"/>Cascadea](https://cascadea.app/) on Safari:

```css
html, body {
  overscroll-behavior: contain !important;
}
```

::: note TLDR:

`overscroll-behavior: contain` disables native browser navigation for both axis. You should only apply it if you’re doing something like building your own pull-to-refresh, in this case you should only apply it to the y-axis like so: `overscroll-behavior-y: contain;`.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Let's Stop Misusing overscroll-behavior",
  "desc": "We're missing a key point that hurts usability!",
  "link": "https://chanhi2000.github.io/bookshelf/webdevredfox.org/postlets-stop-misusing-overscroll-behavior.html",
  "logo": "https://svelte.dev/favicon.png",
  "background": "rgba(2255,127,80,0.2)"
}
```
