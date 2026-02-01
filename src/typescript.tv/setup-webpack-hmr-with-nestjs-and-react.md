---
lang: en-US
title: "Setup Webpack HMR with NestJS and React"
description: "Article(s) > Setup Webpack HMR with NestJS and React"
icon: iconfont icon-nestjs
category:
  - Node.js
  - Nest.js
  - React.js
  - Article(s)
tag:
  - blog
  - typescript.tv
  - node
  - nodejs
  - node-js
  - nest
  - nestjs
  - nest-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Setup Webpack HMR with NestJS and React"
    - property: og:description
      content: "Setup Webpack HMR with NestJS and React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/setup-webpack-hmr-with-nestjs-and-react.html
prev: /programming/js-nest/articles/README.md
date: 2020-12-21
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Nest.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-nest/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Setup Webpack HMR with NestJS and React"
  desc="This article explains how to set up a NestJS server with Webpack's Hot Module Replacement (HMR) to host a React web application. It provides code examples and instructions on how to access the Express instance from the NestJS framework and how to bring Webpack and its HMR plugin to your React web application."
  url="https://typescript.tv/react/setup-webpack-hmr-with-nestjs-and-react"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

This article explains how to set up a NestJS server with Webpack's Hot Module Replacement (HMR) to host a React web application. It provides code examples and instructions on how to access the Express instance from the NestJS framework and how to bring Webpack and its HMR plugin to your React web application.

Programmatically setup a [<VPIcon icon="iconfont icon-nestjs"/>Nest.JS server](https://nestjs.com/) with Webpack's Hot Module Replacement (HMR) to host a React web application.

---

## Setup

Setting up a NestJS server with Webpack's Hot Module Replacement is as simple as [setting up an Express server with Webpack's HMR](/react/setup-webpack-hmr-with-express-server-and-react). The key is to get access to the Express instance from the NestJS framework:

```ts title="server/RootModule.ts"
import { Module } from '@nestjs/common';
 
@Module({
  imports: [],
})
export class RootModule {}
```

```ts title="server.ts"
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RootModule } from './server/RootModule';
import type express from 'express';
 
const nestApp = await NestFactory.create<NestExpressApplication>(RootModule);
const httpAdapter = nestApp.getHttpAdapter();
const app: express.Express = httpAdapter.getInstance(); // Instance of your "Express" server
```

Here is a generic function to bring Webpack and its HMR plugin to your React web application served by an Express server:

```ts title="initWebpack.ts"
import express from 'express';
import { HotModuleReplacementPlugin, webpack } from 'webpack';
 
function initWebpack(app: express.Express) {
  const webpackCompiler = webpack({
    entry: ['webpack-hot-middleware/client', `${__dirname}/webapp/App.tsx`],
    mode: 'development',
    module: {
      rules: [
        {
          exclude: /node_modules/,
          test: /.[tj]sx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-class-properties'],
              presets: ['@babel/preset-react', '@babel/preset-typescript'],
            },
          },
        },
      ],
    },
    plugins: [new HotModuleReplacementPlugin()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
  });
 
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
 
  app.use(webpackDevMiddleware(webpackCompiler));
  app.use(webpackHotMiddleware(webpackCompiler));
 
  app.use(express.static(`${__dirname}/webapp`));
}
```

::: note Tested with

- `@nestjs/common` 7.6.3
- `@nestjs/core` 7.6.3
- `@nestjs/platform-express` 7.6.3

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Setup Webpack HMR with NestJS and React",
  "desc": "This article explains how to set up a NestJS server with Webpack's Hot Module Replacement (HMR) to host a React web application. It provides code examples and instructions on how to access the Express instance from the NestJS framework and how to bring Webpack and its HMR plugin to your React web application.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/setup-webpack-hmr-with-nestjs-and-react.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
