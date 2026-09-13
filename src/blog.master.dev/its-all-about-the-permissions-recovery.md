---
lang: en-US
title: "It’s All About The Permissions Recovery"
description: "Article(s) > It’s All About The Permissions Recovery"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > It’s All About The Permissions Recovery"
    - property: og:description
      content: "It’s All About The Permissions Recovery"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/its-all-about-the-permissions-recovery.html
prev: /programming/css/articles/README.md
date: 2026-09-11
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10938
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
  name="It’s All About The Permissions Recovery"
  desc="Users who deny permissions can recover them by adjusting settings, although many may not realize this."
  url="https://blog.master.dev/its-all-about-the-permissions-recovery/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10938"/>

HTML has a `<geolocation>` element now. While it’s only [<VPIcon icon="iconfont icon-caniuse"/>supported](https://caniuse.com/mdn-html_elements_geolocation) in Chrome’n’friends for now, it’s progressive-enhancement-able. I covered it in our [**2026 HTML article**](/blog.master.dev/new-things-you-should-know-about-html-here-in-mid-2026.md#permissions-elements-like-geolocation) and also blogged about its interesting [enforced accessibility](https://blog.master.dev/the-enforced-accessibility-of-the-geolocation-element/#there-is-some-css-that-is-allowed-but-then-disables-the-button).

But the most interesting story about this element is: **permissions recovery**.

Mostly meaning: **you said no, but now you wanna say yes**.

::: info

Here’s [a demo (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/01a0909c-0647-7eb6-8158-5b0c4c6c9ac5) that you should probably open as [<VPIcon icon="fas fa-globe"/>a full-page preview](https://es-d-78729357720260913-01a0909c-0647-7eb6-8158-5b0c4c6c9ac5.codepen.dev/).

:::

---

## A Non-Supporting Browser

Let’s walk through clicking the button to do geolocation in Firefox.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/CleanShot-2026-09-11-at-7.35.57-AM%402x.png?resize=1024%2C706&ssl=1)

Firefox doesn’t support `<geolocation>`, so the fallback kicks in (i.e., call `navigator.geolocation.getCurrentPosition() and see what happens`) and we get this by default:

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/CleanShot-2026-09-11-at-7.37.27-AM%402x.png?resize=1024%2C708&ssl=1)

This is what **permissions** is.

Geolocation is sensitive information and you should only do it if you feel safe doing it.

Say I click **Block.**

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/CleanShot-2026-09-11-at-7.42.25-AM%402x.png?resize=1024%2C708&ssl=1)

In that case, no geolocation is done.

If I click it **again***,* it will ask **again.** That’s fine/good.

But notice I can remember this choice.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/CleanShot-2026-09-11-at-7.43.26-AM%402x.png?resize=1024%2C708&ssl=1)

Now what?

Now, when I press this button, from now until the end of time (in this browser), the request will be denied. That’s also maybe fine/good. But not all websites remind you that you’ve done this. In fact, I’d wager that most of them just silently fail. You try to use a feature like this, it just doesn’t work.

If you ever want to recover from this choice and allow geolocation, you’ve got to:

1. Find/open the browser settings
2. Go to the **Permissions and data** area
3. Choose **location**
4. Find the exact website you want to change your mind about
5. Adjust the permission there or delete the record to let the site try again

It’s absolutely possible, and some users will know that. I’d also wager that most don’t/won’t.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/CleanShot-2026-09-11-at-7.46.50-AM%402x.png?resize=1024%2C708&ssl=1)

---

## A Supporting Browser

Let’s do that same thing in Chrome, which is first out of the gate for supporting `<geolocation>`.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/CleanShot-2026-09-11-at-7.48.20-AM%402x.png?resize=1024%2C687&ssl=1)

The button looks a bit different. Note the “precise” language comes from using the `accuracymode="precise"` attribute.

We are still asked when we press it.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/CleanShot-2026-09-11-at-7.49.11-AM%402x.png?resize=1024%2C687&ssl=1)

The choices are interesting here. There is no **block** option at all. It’s just essentially “allow forever” or “allow once”. While that feels weird, it’s kind of the point here. The `<geolocation>` element either:

1. Works
2. Asks

I can just close this prompt here, which disallows the geolocation. And I do actually have a mechanism for blocking.

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/CleanShot-2026-09-11-at-7.58.13-AM%402x.png?resize=1024%2C687&ssl=1)

If it works, it works. If it doesn’t, at least you know why (you didn’t allow it just moments ago).

![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/09/CleanShot-2026-09-11-at-7.59.52-AM%402x.png?resize=1024%2C687&ssl=1)

---

## No More Mystery

I like that it’s easier to “recover” from a blocked state, as it’s confusing as heck when features just don’t work when you expect them to. From Chrome’s [<VPIcon icon="fa-brands fa-chrome"/>announcement post](https://developer.chrome.com/blog/geolocation-html-element), they feature some data, including:

> ZapImóveis observed a 54.4% success rate in users recovering from a “previously blocked” state when presented with the element.

Seems good.

I imagine this is even more important with [**`<usermedia>` for camera and microphone access**](/blog.master.dev/new-things-you-should-know-about-html-here-in-mid-2026.md#the-usermedia-element.md), which essentially works the same way.

```component VPCard
{
  "title": "New Things You Should Know About HTML Here in Mid 2026",
  "desc": "You've got your permissions elements, custom element registries, a potential future for HTML includes, HTML-in-Canvas, and a bunch more.",
  "link": "/blog.master.dev/new-things-you-should-know-about-html-here-in-mid-2026.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The Enforced Accessibility of the Geolocation Element",
  "desc": "It's a strange situation where some CSS is disallowed, some is allowed but breaks the button, and some is capped.",
  "link": "/blog.master.dev/the-enforced-accessibility-of-the-geolocation-element.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Reading from the Clipboard in JavaScript",
  "desc": "While it's a bit more common to *write* to the clipboard, JavaScript can also read from it. Plain text is pretty simple, while multimedia content is a bit more complex.",
  "link": "/blog.master.dev/reading-from-the-clipboard-in-javascript.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "It’s All About The Permissions Recovery",
  "desc": "Users who deny permissions can recover them by adjusting settings, although many may not realize this.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/its-all-about-the-permissions-recovery.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
