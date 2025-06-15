---
lang: en-US
title: "Use HTTP2"
description: "Article(s) > (2/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
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
      content: "Article(s) > (2/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
    - property: og:description
      content: "Use HTTP2"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-front-end-performance-optimization-handbook/use-http2.html
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
  "title": "The Front-End Performance Optimization Handbook – Tips and Strategies for Devs",
  "desc": "When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to...",
  "link": "/freecodecamp.org/the-front-end-performance-optimization-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
  desc="When you’re building a website, you’ll want it to be responsive, fast, and efficient. This means making sure the site loads quickly, runs smoothly, and provides a seamless experience for your users, among other things. So as you build, you’ll want to..."
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-use-http2"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

Compared to HTTP1.1, HTTP2 has several advantages:

---

## Faster parsing

When parsing HTTP1.1 requests, the server must continuously read bytes until it encounters the CRLF delimiter. Parsing HTTP2 requests isn't as complicated because HTTP2 is a frame-based protocol, and each frame has a field indicating its length.

---

## Multiplexing

With HTTP1.1, if you want to make multiple requests simultaneously, you need to establish multiple TCP connections because one TCP connection can only handle one HTTP1.1 request at a time.

In HTTP2, multiple requests can share a single TCP connection, which is called multiplexing. Each request and response is represented by a stream with a unique stream ID to identify it.  
Multiple requests and responses can be sent out of order within the TCP connection and then reassembled at the destination using the stream ID.

---

## Header compression

HTTP2 provides header compression functionality.

For example, consider the following two requests:

```plaintext
:authority: unpkg.zhimg.com
:method: GET
:path: /za-js-sdk@2.16.0/dist/zap.js
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9
cache-control: no-cache
pragma: no-cache
referer: https://www.zhihu.com/
sec-fetch-dest: script
sec-fetch-mode: no-cors
sec-fetch-site: cross-site
user-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36
```

```plaintext
:authority: zz.bdstatic.com
:method: GET
:path: /linksubmit/push.js
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9
cache-control: no-cache
pragma: no-cache
referer: https://www.zhihu.com/
sec-fetch-dest: script
sec-fetch-mode: no-cors
sec-fetch-site: cross-site
user-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36
```

From the two requests above, you can see that a lot of data is repeated. If we could store the same headers and only send the differences between them, we could save a lot of bandwidth and speed up the request time.

HTTP/2 uses "header tables" on the client and server sides to track and store previously sent key-value pairs, and for identical data, it's no longer sent through each request and response.

Here's a simplified example. Suppose the client sends the following header requests in sequence:

```plaintext
Header1:foo
Header2:bar
Header3:bat
```

When the client sends a request, it creates a table based on the header values:

| Index | Header Name | Value |
| --- | --- | --- |
| 62 | Header1 | foo |
| 63 | Header2 | bar |
| 64 | Header3 | bat |

If the server receives the request, it will create the same table.  
When the client sends the next request, if the headers are the same, it can directly send a header block like this:

```plaintext
62 63 64
```

The server will look up the previously established table and restore these numbers to the complete headers they correspond to.

---

## Priority

HTTP2 can set a higher priority for more urgent requests, and the server can prioritize handling them after receiving such requests.

---

## Flow control

Since the bandwidth of a TCP connection (depending on the network bandwidth from client to server) is fixed, when there are multiple concurrent requests, if one request occupies more traffic, another request will occupy less. Flow control can precisely control the flow of different streams.

---

## Server push

A powerful new feature added in HTTP2 is that the server can send multiple responses to a single client request. In other words, in addition to responding to the initial request, the server can also push additional resources to the client without the client explicitly requesting them.

For example, when a browser requests a website, in addition to returning the HTML page, the server can also proactively push resources based on the URLs of resources in the HTML page.

Many websites have already started using HTTP2, such as Zhihu:

![show hot to check HTTP1 and HTTP2 protocols](https://camo.githubusercontent.com/17c8f78f0341150240e6719ed82ee794e5c569404861581ccad306b88d9b6f6c/68747470733a2f2f696d672d626c6f672e6373646e696d672e636e2f696d675f636f6e766572742f39636165316532313931613035393466393833373636646635636265373562352e706e67)

Where "h2" refers to the HTTP2 protocol, and "http/1.1" refers to the HTTP1.1 protocol.

::: info References:

```component VPCard
{
  "title": "HTTP: HTTP/2 - High Performance Browser Networking (O'Reilly)",
  "desc": "What every web developer must know about mobile networks, protocols, and APIs provided by browser to deliver the best user experience.",
  "link": "https://hpbn.co/http2/",
  "logo": "https://hpbn.co/assets/icons/icon-192.png",
  "background": "rgba(39,39,39,0.2)"
}
```

<SiteInfo
  name="HTTP: Hypertext Transfer Protocol | MDN"
  desc="HTTP is an application-layer protocol for transmitting hypermedia documents, such as HTML.
It was designed for communication between web browsers and web servers, but it can also be used for other purposes, such as machine-to-machine communication, programmatic access to APIs, and more."
  url="https://developer.mozilla.org/en-US/docs/Web/HTTP/"
  logo="https://developer.mozilla.org/favicon.ico"
  preview="https://developer.mozilla.org/mdn-social-share.d893525a4fb5fb1f67a2.png"/>

:::