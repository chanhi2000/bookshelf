---
lang: en-US
title: "Reduce HTTP Requests"
description: "Article(s) > (1/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
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
      content: "Article(s) > (1/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Reduce HTTP Requests"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-front-end-performance-optimization-handbook/reduce-http-requests.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-reduce-http-requests"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

A complete HTTP request needs to go through DNS lookup, TCP handshake, browser sending the HTTP request, server receiving the request, server processing the request and sending back a response, browser receiving the response, and other processes. Let's look at a specific example to understand how HTTP works:

![HTTP request waterfall showing timing breakdown](https://camo.githubusercontent.com/7988c06bb7b698dcc66ac8f2556cbe03b239ba2c8bf17ecddb29004c74b0eb36/68747470733a2f2f692d626c6f672e6373646e696d672e636e2f626c6f675f6d6967726174652f64333736643731343630633763376331316462316338353134366230343164632e706e67)

This is an HTTP request, and the file size is 28.4KB.

Terminology explained:

- Queueing: Time spent in the request queue.
- Stalled: The time difference between when the TCP connection is established and when data can actually be transmitted, including proxy negotiation time.
- Proxy negotiation: Time spent negotiating with the proxy server.
- DNS Lookup: Time spent performing DNS lookup. Each different domain on a page requires a DNS lookup.
- Initial Connection / Connecting: Time spent establishing a connection, including TCP handshake/retry and SSL negotiation.
- SSL: Time spent completing the SSL handshake.
- Request sent: Time spent sending the network request, usually a millisecond.
- Waiting (TFFB): TFFB is the time from when the page request is made until the first byte of response data is received.
- Content Download: Time spent receiving the response data.

From this example, we can see that the actual data download time accounts for only `13.05 / 204.16 = 6.39%` of the total. The smaller the file, the smaller this ratio - and the larger the file, the higher the ratio. This is why it's recommended to combine multiple small files into one large file, which reduces the number of HTTP requests.

---

## How to combine multiple files

There are several techniques to reduce the number of HTTP requests by combining files:

### 1. Bundle JavaScript files with Webpack

```js title="webpack.config.js"
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```

This will combine all JavaScript files imported in your entry point into a single bundle.

### 2. Combine CSS files

Using CSS preprocessors like Sass:

```scss main.scss
@import 'reset';
@import 'variables';
@import 'typography';
@import 'layout';
@import 'components';
```

Then compile to a single CSS file:

```sh
sass main.scss:main.css
```

::: info Reference:

<SiteInfo
  name="Resource timing - Web APIs | MDN"
  desc="Resource Timing is part of the Performance API and enables retrieving and analyzing detailed network timing data for the loading of an application's resources. An application can use the timing metrics to determine, for example, the length of time it takes to load a specific resource (such as an image or a script) either implicitly as part of page load or explicitly from JavaScript, for example using the fetch() API."
  url="https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Resource_timing/"
  logo="https://developer.mozilla.org/favicon.ico"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::