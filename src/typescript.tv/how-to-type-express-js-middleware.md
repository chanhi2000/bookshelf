---
lang: en-US
title: "How to write Express.js middleware with TypeScript"
description: "Article(s) > How to write Express.js middleware with TypeScript"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Article(s)
tag:
  - blog
  - typescript.tv
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to write Express.js middleware with TypeScript"
    - property: og:description
      content: "How to write Express.js middleware with TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/how-to-type-express-js-middleware.html
prev: /programming/js-express/articles/README.md
date: 2021-11-26
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to write Express.js middleware with TypeScript"
  desc="You can extend your Express.js server by writing custom middleware functions. These functions intercept every request and allow you to add custom functionality or filters. You can also pass the request to other middleware functions."
  url="https://typescript.tv/hands-on/how-to-type-express-js-middleware"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

You can extend your Express.js server by writing custom middleware functions. These functions intercept every request and allow you to add custom functionality or filters. You can also pass the request to other middleware functions.

You can extend your Express.js server easily with [<VPIcon icon="iconfont icon-expressjs"/>custom middleware](https://expressjs.com/en/guide/writing-middleware.html). All you have to do is to write a function that accepts three parameters (`req`, `res`, `next`).

---

## Writing custom Express middleware

By writing a function that follows the `ApplicationRequestHandler` type of Express.js, you can extend your app server with custom functionality.

A "middleware" in [<VPIcon icon="iconfont icon-expressjs"/>Express](https://expressjs.com/) is just a function that intercepts every request so that you can return a custom response or apply a custom filter when a request reaches your server. You can also call the `next` function to pass on the request for processing (to another registered middleware).

::: tip Example

```ts
import { Express, Request, Response, NextFunction } from 'express';
 
// Your custom "middleware" function:
function preventCrossSiteScripting(req: Request, res: Response, next: NextFunction): void {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
}
 
export function applyServerHardening(app: Express): void {
  app.disable('x-powered-by');
  // Make your Express app use your custom middleware:
  app.use(preventCrossSiteScripting);
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to write Express.js middleware with TypeScript",
  "desc": "You can extend your Express.js server by writing custom middleware functions. These functions intercept every request and allow you to add custom functionality or filters. You can also pass the request to other middleware functions.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/how-to-type-express-js-middleware.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
