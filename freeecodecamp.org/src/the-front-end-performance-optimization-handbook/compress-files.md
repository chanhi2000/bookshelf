---
lang: en-US
title: "Compress Files"
description: "Article(s) > (8/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
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
      content: "Article(s) > (8/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Compress Files"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-front-end-performance-optimization-handbook/compress-files.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-compress-files"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

Compressing files can reduce file download time, providing a better user experience.

Thanks to the development of Webpack and Node, file compression is now very convenient.

In Webpack, you can use the following plugins for compression:

- JavaScript: UglifyPlugin
- CSS: MiniCssExtractPlugin
- HTML: HtmlWebpackPlugin

In fact, we can do even better by using gzip compression. This can be enabled by adding the gzip identifier to the Accept-Encoding header in the HTTP request header. Of course, the server must also support this feature.

Gzip is currently the most popular and effective compression method. For example, the app.js file generated after building a project I developed with Vue has a size of 1.4MB, but after gzip compression, it's only 573KB, reducing the volume by nearly 60%.

Here are the methods for configuring gzip in webpack and node.

## Download plugins

```sh
npm install compression-webpack-plugin --save-dev
npm install compression
```

## Webpack configuration

```js
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [new CompressionPlugin()],
}
```

## Node configuration

```js
const compression = require('compression')
// Use before other middleware
app.use(compression())
```
