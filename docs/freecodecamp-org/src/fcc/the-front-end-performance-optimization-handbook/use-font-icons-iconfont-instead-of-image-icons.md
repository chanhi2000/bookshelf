---
lang: en-US
title: "Use Font Icons (iconfont) Instead of Image Icons"
description: "Article(s) > (6/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
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
      content: "Article(s) > (6/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Use Font Icons (iconfont) Instead of Image Icons"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-front-end-performance-optimization-handbook/use-font-icons-iconfont-instead-of-image-icons.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-use-font-icons-iconfont-instead-of-image-icons"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

A font icon is an icon made into a font. When using it, it's just like a font, and you can set attributes such as font-size, color, and so on, which is very convenient. Font icons are also vector graphics and won't lose clarity. Another advantage is that the generated files are particularly small.

---

## Compress Font Files

Use the [<FontIcon icon="iconfont icon-github"/>`patrickhulce/fontmin-webpack`](https://github.com/patrickhulce/fontmin-webpack) plugin to compress font files (thanks to [<FontIcon icon="fas fa-globe"/>Frontend Xiaowei](https://juejin.im/user/237150239985165) for providing this).

![Showing difference between uncompressed and compressed files](https://camo.githubusercontent.com/8aec44850415bdf6f23aa59cae5daa0c6d06ec9414766ddfe34c294b663fcde4/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f696d675f636f6e766572742f37376232656235653365303933323030383765333337303638366461393330302e706e67)

::: info References:

<SiteInfo
  name="patrickhulce/fontmin-webpack"
  desc="Minifies icon fonts to just the used glyphs."
  url="https://github.com/patrickhulce/fontmin-webpack/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e8ab55f84c1edc71092a9adfda08401626815e6847dac529840e56657a6ed221/patrickhulce/fontmin-webpack"/>

```component VPCard
{
  "title": "iconfont-阿里巴巴矢量图标库",
  "desc": "iconfont-国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造，设计和前端开发的便捷工具",
  "link": "https://iconfont.cn/?lang=en-us/",
  "logo": "https://iconfont.cn//img.alicdn.com/imgextra/i4/O1CN01XZe8pH1USpiUNT1QN_!!6000000002517-2-tps-114-114.png",
  "background": "rgba(0,249,229,0.2)"
}
```

:::