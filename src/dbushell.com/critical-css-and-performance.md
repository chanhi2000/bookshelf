---
lang: en-GB
title: "Critical CSS and Performance"
description: "Article(s) > Critical CSS and Performance"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - dbushell.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Critical CSS and Performance"
    - property: og:description
      content: "Critical CSS and Performance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/critical-css-and-performance.html
prev: /programming/css/articles/README.md
date: 2015-02-20
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/assets/images/ogimage.png
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
  name="Critical CSS and Performance"
  desc="Critical CSS and Performance"
  url="https://dbushell.com/2015/02/19/critical-css-and-performance/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/assets/images/ogimage.png"/>

::: note ⚠️

This post was written **11 years ago!**  
Personal opinions and technical details may have changed since writing.

:::

[I built my website](https://dbushell.com/2014/04/24/two-week-build/) last year with a strong focus on **front-end performance**.

This week inspired by Scott Jehl’s article [<VPIcon icon="fas fa-globe"/>“How we make RWD sites load fast as heck”](https://filamentgroup.com/lab/performance-rwd.html) and Callum Hart’s [<VPIcon icon="fas fa-globe"/>“Non-blocking UI’s with interface previews”](https://callumhart.com/blog/non-blocking-uis-with-interface-previews) I decided to revisit my code and give it another boost. The trick to getting content on screen faster is removing [<VPIcon icon="fa-brands fa-google"/>render-blocking CSS](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery). When the browser sees a stylesheet —

```html
<link rel="stylesheet" href="style.css">
```

— it will not render further until it’s downloaded.

By inlining critical CSS the browser can start to render immediately while the rest is downloaded asynchronously. What is critical CSS? Anything [<VPIcon icon="fas fa-globe"/>above the fold](http://iamthefold.com/) apparently. [<VPIcon icon="fa-brands fa-google"/>PageSpeed Insights](http://developers.google.com/speed/pagespeed/insights/) is a useful tool. My original stylesheet was only 35KB so I was skeptical that I’d see any improvements. Nevertheless, I manually extracted 10KB of typographic and layout styles to inline.

My page `<head>` now looks something like this:

```html
<noscript><link rel="stylesheet" href="combined.css"></noscript>
<style> /* 10KB of inline CSS */ </style>
<script> /* ... */ loadCSS('style.css'); </script>
```

- `<noscript>` as a fallback to provide the original stylesheet
- 10KB of inline CSS that can be rendered straight away
- JavaScript to asynchronously download more (see [<VPIcon icon="iconfont icon-github"/>`filamentgroup/loadCSS`](https://github.com/filamentgroup/loadCSS) by Filament Group)

---

## The Results

To see if this technique improves ‘time to visible content’, I’m using [<VPIcon icon="fa-brands fa-chrome"/>Chrome’s device emulator](https://developer.chrome.com/devtools/docs/device-mode) to throttle the network speed to its slowest setting: GPRS (50Kbps 500ms RTT), equivalent to an awful 2G signal.

In relatable numbers that’s a download speed of 6.25KB/s. Therefore my homepage, weighing in at 220KB, will take at least 35 seconds to download at this speed (not accounting for latency).

If you’ve been paying attention the point of this optimisation isn’t to download the entire page faster, but to render content sooner. The results are impressive. Across multiple tests I’ve found that content is on screen **at least 6 seconds earlier** than before.

Of course, with faster networks the difference becomes less apparent. Subsequent visits can benefit from browser caching which negates the main issue, but given the nature of my blog traffic a primed cache isn’t common.

I’m rather happy with that!

There’s still work to do though. I get the sense that some of the later assets are tripping over themselves. I want to ensure that non-critical, asynchronous CSS is still prioritised before other resources.

Have some thoughts? Let me know [<VPIcon icon="fa-brands fa-mastodon"/>`@dbushell`](https://social.lol/@db/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Critical CSS and Performance",
  "desc": "Critical CSS and Performance",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/critical-css-and-performance.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
