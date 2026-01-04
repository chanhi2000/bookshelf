---
lang: en-US
title: "Use Flexbox Instead of Earlier Layout Models"
description: "Article(s) > (22/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
category:
  - Node.js
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (22/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Use Flexbox Instead of Earlier Layout Models"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-front-end-performance-optimization-handbook/use-flexbox-instead-of-earlier-layout-models.html
date: 2025-05-07
isOriginal: false
author:
  - name: Gordan Tan
    url : https://freecodecamp.org/news/author/woai3c/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Front-End Performance Optimization Handbook - Tips and Strategies for Devs",
  "desc": "When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to...",
  "link": "/freecodecamp.org/the-front-end-performance-optimization-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
  desc="When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to..."
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-use-flexbox-instead-of-earlier-layout-models"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

In early CSS layout methods, we could position elements absolutely, relatively, or using floats. Now, we have a new layout method called [<VPIcon icon="fa-brands fa-firefox" />Flexbox](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox), which has an advantage over earlier layout methods: better performance.

The screenshot below shows the layout cost of using floats on 1300 boxes:

![layout timeline in dev tool](https://camo.githubusercontent.com/ff6a96a175ccd6a4a55e0a0ea2932833cae4f639ddfda73c330f056eb2311efa/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f696d675f636f6e766572742f37343264613262643539656537613331396239363036643461393539323234392e706e67)

Then we recreate this example using Flexbox:

![layout timeline in dev tool](https://camo.githubusercontent.com/18ad08d69431cc0ef0d60b3aa748aa1e0220329cb6043046eeb744ad3ec64abe/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f696d675f636f6e766572742f63633831663131613634643232613863656334643935616638633136376537362e706e67)

Now, for the same number of elements and the same visual appearance, the layout time is much less (3.5 milliseconds versus 14 milliseconds in this example).

But Flexbox compatibility is still an issue, as not all browsers support it, so use it with caution.

Browser compatibility:

- Chrome 29+
- Firefox 28+
- Internet Explorer 11
- Opera 17+
- Safari 6.1+ (prefixed with -webkit-)
- Android 4.4+
- iOS 7.1+ (prefixed with -webkit-)

::: info Reference:

<SiteInfo
  name="Avoid large, complex layouts and layout thrashing | Articles | web.dev"
  desc="Layout is where the browser figures out the geometric information for elements - their size and location in the page. Each element will have explicit or implicit sizing information based on the CSS that was used, the contents of the element, or a parent element. The process is called Layout in Chrome."
  url="https://web.dev/articles/avoid-large-complex-layouts-and-layout-thrashing/"
  logo="https://gstatic.com/devrel-devsite/prod/v31bf0d5ece3babea9777b807f088a03e9bb2225d007f11b8410e9c896eb213a6/web/images/favicon.png"
  preview="https://web.dev/static/articles/avoid-large-complex-layouts-and-layout-thrashing/image/thumb.png"/>

:::
