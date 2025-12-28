---
lang: en-US
title: "Eliminate Render-Blocking JavaScript with Async and Defer"
description: "Article(s) > Eliminate Render-Blocking JavaScript with Async and Defer"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - digitalocean.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Eliminate Render-Blocking JavaScript with Async and Defer"
    - property: og:description
      content: "Eliminate Render-Blocking JavaScript with Async and Defer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/digitalocean.com/html-defer-async.html
prev: /programming/js/articles/README.md
date: 2016-08-20
isOriginal: false
author: Alligator
cover: https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg
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
  name="Eliminate Render-Blocking JavaScript with Async and Defer"
  desc="Async and defer are two HTML5 attributes that allow delaying execution of scripts, eliminating blocking JavaScript. A must for performance! "
  url="https://digitalocean.com/community/tutorials/html-defer-async"
  logo="https://digitalocean.com/_next/static/media/favicon.594d6067.ico"
  preview="https://digitalocean.com/_next/static/media/intro-to-cloud.d49bc5f7.jpeg"/>

With HTML5, we get two new boolean attributes for the `<script>` tag: async and defer. Async allows execution of scripts asynchronously and defer allows execution only after the whole document has been parsed.

These two attributes are a must for increasing speed and performance of websites. They allow the elimination of render-blocking JavaScript where the page would have to load and execute scripts before finishing to render the page. Here’s a usage example:

```html
<script defer src="/js/jquery.min.js">
</script>
```

## Async vs Defer

With async, the file gets downloaded asynchronously and then executed as soon as it’s downloaded.

With defer, the file gets downloaded asynchronously, but executed only when the document parsing is completed. With defer, scripts will execute in the same order as they are called. This makes defer the attribute of choice when a script depends on another script. For example, if you’re using jQuery as well as other scripts that depend on it, you’d use defer on them (jQuery included), making sure to call jQuery before the dependent scripts.

A good strategy is to use async when possible, and then defer when async isn’t an option.

::: note

Note that both attributes don’t have any effect on inline scripts.

:::

::: info Browser Support

[<VPIcon icon="iconfont icon-caniuse"/>Can I Use script-async?](http://caniuse.com/#feat=script-async) Data on support for the script-async feature across the major browsers from [<VPIcon icon="iconfont icon-caniuse"/>caniuse.com](http://caniuse.com).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Eliminate Render-Blocking JavaScript with Async and Defer",
  "desc": "Async and defer are two HTML5 attributes that allow delaying execution of scripts, eliminating blocking JavaScript. A must for performance! ",
  "link": "https://chanhi2000.github.io/bookshelf/digitalocean.com/html-defer-async.html",
  "logo": "https://digitalocean.com/_next/static/media/favicon.594d6067.ico",
  "background": "rgba(44,103,246,0.2)"
}
```
