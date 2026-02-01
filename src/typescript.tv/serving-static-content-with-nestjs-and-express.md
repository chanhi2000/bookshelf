---
lang: en-US
title: "Serving static content with NestJS and Express"
description: "Article(s) > Serving static content with NestJS and Express"
icon: iconfont icon-nestjs
category:
  - Node.js
  - Express.js
  - Nest.js
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
  - nest
  - nestjs
  - nest-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Serving static content with NestJS and Express"
    - property: og:description
      content: "Serving static content with NestJS and Express"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/serving-static-content-with-nestjs-and-express.html
prev: /programming/js-nest/articles/README.md
date: 2023-11-01
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-nest/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Serving static content with NestJS and Express"
  desc="NestJS can serve static content when running on an Express server. This is useful when you want to host a React frontend website through your Nest service."
  url="https://typescript.tv/hands-on/serving-static-content-with-nestjs-and-express"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

NestJS can serve static content when running on an Express server. This is useful when you want to host a React frontend website through your Nest service.

Nest is a versatile framework that works with [<VPIcon icon="fas fa-globe"/>Fastify](https://fastify.dev/) or [<VPIcon icon="iconfont icon-expressjs"/>Express](https://expressjs.com/) web servers. When it's running on an Express server, you have the convenience of serving static content. This becomes especially valuable when you intend to bundle a React web page and host it through your Nest service.

When you're building a Nest backend, it's not limited to merely providing REST endpoints. It can also serve as the host for a frontend website. Nest offers the [<VPIcon icon="iconfont icon-expressjs"/>`@nestjs/serve-static`](https://npmjs.com/package/@nestjs/serve-static) package to handle such situations. However, if your Nest framework is powered by an Express application under the hood, you have the option to serve static content using the [<VPIcon icon="iconfont icon-expressjs"/>response.sendFile](https://expressjs.com/en/api.html#res.sendFile) API from Express.

---

## Return static content with Nest Controller

Consider a controller that serves static content by returning a string:

```ts title="app.controller.ts"
import { Controller, Get } from '@nestjs/common';
 
@Controller()
export class AppController {
  @Get()
  landingPage() {
    return 'online';
  }
}
```

This can be replaced by specifying the file path to a static HTML page and utilizing the "sendFile" method:

```ts title="app.controller.ts"
import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'node:path';
import { type Response } from 'express';
 
@Controller()
export class AppController {
  @Get()
  landingPage(@Res() res: Response) {
    return res.sendFile(join(`${process.cwd()}/src/static/index.html`));
  }
}
```

Note that the `Response` type from Express is being used here.

---

## Host static directory

If your intention is to host more than just a basic HTML page, such as CSS or JavaScript files that you need to reference, it's recommended to declare the entire directory for hosting purposes:

```ts title="main.ts"
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
 
const app = await NestFactory.create<NestExpressApplication>(AppModule);
const staticDirectory = `${process.cwd()}/src/static/`;
app.useStaticAssets(staticDirectory);
```

In this case, you can remove the routing from the Nest controller.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Serving static content with NestJS and Express",
  "desc": "NestJS can serve static content when running on an Express server. This is useful when you want to host a React frontend website through your Nest service.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/serving-static-content-with-nestjs-and-express.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
