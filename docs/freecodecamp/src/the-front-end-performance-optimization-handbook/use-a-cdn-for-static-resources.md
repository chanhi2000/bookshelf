---
lang: en-US
title: "Use a CDN for Static Resources"
description: "Article(s) > (4/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
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
      content: "Article(s) > (4/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Use a CDN for Static Resources"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-front-end-performance-optimization-handbook/use-a-cdn-for-static-resources.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-use-a-cdn-for-static-resources"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

A Content Delivery Network (CDN) is a set of web servers distributed across multiple geographic locations. We all know that the further the server is from the user, the higher the latency. CDNs are designed to solve this problem by deploying servers in multiple locations, bringing users closer to servers, thereby shortening request times.

---

## CDN Principles

When a user visits a website without a CDN, the process is as follows:

1. The browser needs to resolve the domain name into an IP address, so it makes a request to the local DNS.
2. The local DNS makes successive requests to the root server, top-level domain server, and authoritative server to get the IP address of the website's server.
3. The local DNS sends the IP address back to the browser, and the browser makes a request to the website server's IP address and receives the resources.

![Diagram showing request flow without CDN: browser → DNS → root servers → top-level domain → authoritative server → website server](https://camo.githubusercontent.com/a9d8ea319521e8f560e8b68c2df8a4afaf27ed46e29e481b35bb78d013d23ca6/68747470733a2f2f6465762d746f2d75706c6f6164732e73332e616d617a6f6e6177732e636f6d2f75706c6f6164732f61727469636c65732f7a3079336a387a733733727a62617466616731342e706e67)

If the user is visiting a website that has deployed a CDN, the process is as follows:

1. The browser needs to resolve the domain name into an IP address, so it makes a request to the local DNS.
2. The local DNS makes successive requests to the root server, top-level domain server, and authoritative server to get the IP address of the Global Server Load Balancing (GSLB) system.
3. The local DNS then makes a request to the GSLB. The main function of the GSLB is to determine the user's location based on the local DNS's IP address, filter out the closest local Server Load Balancing (SLB) system to the user, and return the IP address of that SLB to the local DNS.
4. The local DNS sends the SLB's IP address back to the browser, and the browser makes a request to the SLB.
5. The SLB selects the optimal cache server based on the resource and address requested by the browser and sends it back to the browser.
6. The browser then redirects to the cache server based on the address returned by the SLB.
7. If the cache server has the resource the browser needs, it sends the resource back to the browser. If not, it requests the resource from the source server, sends it to the browser, and caches it locally.

![Diagram showing request flow with CDN: browser → DNS → root servers → GSLB → SLB → cache servers → origin server](https://camo.githubusercontent.com/1ade29f05689af94c1066bccedab884a119d2fb4cba44f08fd95357cd9abdef6/68747470733a2f2f6465762d746f2d75706c6f6164732e73332e616d617a6f6e6177732e636f6d2f75706c6f6164732f61727469636c65732f616f70776c68783778386f33726176766e3170322e706e67)

::: ino References:

<SiteInfo
  name="Content delivery network - Wikipedia"
  desc="A content delivery network (CDN) or content distribution network is a geographically distributed network of proxy servers and their data centers. The goal is to provide high availability and performance ..."
  url="https://en.wikipedia.org/wiki/Content_delivery_network/"
  logo="https://en.wikipedia.org/static/favicon/wikipedia.ico"
  preview="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/NCDN_-_CDN.svg/960px-NCDN_-_CDN.svg.png"/>

```component VPCard
{
  "title": "How to Use CDNs to Improve Performance in your Front-end Projects",
  "desc": "In web development, styling plays a crucial role in the visual presentation of web applications. According to a study by Adobe, 59% of users would choose a beautifully designed website over a “simple and plain” design. So designs that are crafted in ...",
  "link": "/freecodecamp.org/how-cdns-improve-performance-in-front-end-projects.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

:::