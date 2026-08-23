---
lang: en-US
title: "Reminder that `system-ui` is well supported, when you use it on macOS you get San Francisco which is a variable font, which is fun, and the fallbacks are pretty good."
description: "Article(s) > Reminder that `system-ui` is well supported, when you use it on macOS you get San Francisco which is a variable font, which is fun, and the fallbacks are pretty good."
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Reminder that `system-ui` is well supported, when you use it on macOS you get San Francisco which is a variable font, which is fun, and the fallbacks are pretty good."
    - property: og:description
      content: "Reminder that `system-ui` is well supported, when you use it on macOS you get San Francisco which is a variable font, which is fun, and the fallbacks are pretty good."
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/system-ui-san-francisco-fun.html
prev: /programming/css/articles/README.md
date: 2026-08-11
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10643
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
  name="Reminder that `system-ui` is well supported, when you use it on macOS you get San Francisco which is a variable font, which is fun, and the fallbacks are pretty good."
  desc="You can get pretty darn flexible with it."
  url="https://blog.master.dev/system-ui-san-francisco-fun/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10643"/>

You can use the value `system-ui` in your `font-family` in CSS, you get a font that represents the default user interface font. Meaning you get something kinda Windowsy on Windows, Linuxy on Linux, and Macsy on macOS, etc. It’s [<VPIcon icon="iconfont icon-caniuse"/>well supported](https://caniuse.com/?search=system-ui) across browsers and platforms. I think it’s a good choice for many situations.

```css
html {
  font-family: 100%/1.4 system-ui, sans-serif;
}
```

I’ve only got a Mac, so what I see when using it is [<VPIcon icon="fa-brands fa-apple"/>San Francisco.](https://developer.apple.com/fonts/) It’s a pretty fancy font, and with zero download cost, I think that’s great.

It also happens to be a *variable font*, meaning we can change certain aspects of the font programmatically. In the case of San Francisco, we’ve got a weight (`"wght"`) and width (`"wdth"`) axis that can pretty dramatically change the look of it.

```css
h1 {
  font-variation-settings: 
    "wght" 900,
    "wdth" 700;
}
```

![Same font, with changed variable font settings](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/Screen-Shot-2022-06-16-at-9.28.40-AM.webp?resize=1024%2C497&ssl=1)

Here’s a basic demo:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01825bc8-ffef-74d0-a192-9803f0350fa4"
  title="Uh you actually can use SF variable??"
  :default-tab="['css','result']"
  :theme="dark"/>

That gives us this expanded `<h1>`, narrowed and thin `<h2>`, and slightly thinned out `<p>`. On my Mac:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/mac.png?resize=754%2C560&ssl=1)

And some fallbacks:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/chrome-on-windows.png?resize=1024%2C417&ssl=1)

Chrome on Windows

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/firefox-on-android.png?resize=920%2C490&ssl=1)

Firefox on Android (sorry for low quality, that’s just what it looked like in BrowserStack, which rendered on a “real device”)

Not bad, if you ask me (websites don’t need to look the same in all browsers), and actually, it might look extra good to long-time users of those browsers/platforms, as it looks like what the UI looks like, at least somewhat. That’s kind of the point.

Here’s a spectrum of weights and widths:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/0182608d-317e-7f6d-a9ce-a49a677e8161"
  title="SF Variable Table"
  :default-tab="['css','result']"
  :theme="dark"/>

Here’s some more usage examples:

<CodePen
  link="https://codepen.io/editor/team/codepen/pen/019ff301-f404-72d9-b0eb-25cc9e429ffe"
  title="Uh you actually can use SF variable??"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Reminder that `system-ui` is well supported, when you use it on macOS you get San Francisco which is a variable font, which is fun, and the fallbacks are pretty good.",
  "desc": "You can get pretty darn flexible with it.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/system-ui-san-francisco-fun.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
