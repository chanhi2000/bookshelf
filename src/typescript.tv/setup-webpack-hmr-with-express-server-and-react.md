---
lang: en-US
title: "Setup Webpack HMR with Express server and React"
description: "Article(s) > Setup Webpack HMR with Express server and React"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - React.js
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
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Setup Webpack HMR with Express server and React"
    - property: og:description
      content: "Setup Webpack HMR with Express server and React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/setup-webpack-hmr-with-express-server-and-react.html
prev: /programming/js-express/articles/README.md
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
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
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
  name="Setup Webpack HMR with Express server and React"
  desc="You can set up an Express server with Webpack's Hot Module Replacement (HMR) to host a React web application. The article provides code examples and instructions on how to configure your server and web application."
  url="https://typescript.tv/react/setup-webpack-hmr-with-express-server-and-react"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

You can set up an Express server with Webpack's Hot Module Replacement (HMR) to host a React web application. The article provides code examples and instructions on how to configure your server and web application.

Programmatically setup an [<VPIcon icon="iconfont icon-expressjs"/>Express server](https://expressjs.com/) with Webpack's Hot Module Replacement (HMR) to host a React web application.

---

## Setup

Your Express server can become a webpack development server when configuring it the following way:

```ts title="server.ts"
import express from 'express';
import { HotModuleReplacementPlugin, webpack } from 'webpack';
 
const app = express();
 
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
 
const port = 3000;
 
app.listen(3000, async () => {
  console.log(`Started server on port "${port}".`);
});
```

The above configuration will server your web application from the static directory "webapp". Your "webapp" directory must contain the "index.html" file of your React web application:

```html title="webapp/index.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="main.js"></script>
  </body>
</html>
```

If you want to trigger the "Hot Module Replacement" feature from your React web page, you will have to activate "module.hot":

```tsx title="webapp/App.tsx"
import React from 'react';
import ReactDOM from 'react-dom';
import App from './page/App';
 
function runApp(): void {
  if (module.hot) {
    module.hot.accept();
    ReactDOM.render(<App />, document.getElementById('root'));
  }
}
 
runApp();
```

::: note Tested with

- `@babel/core` 7.12.10
- `@babel/plugin-proposal-class-properties` 7.12.1
- `@babel/preset-react` 7.12.10
- `@babel/preset-typescript` 7.12.7
- `@types/express` 4.17.9
- `babel-loader` 8.2.2
- `express` 4.17.1
- `typescript` 4.1.3
- `webpack` 5.10.1
- `webpack-dev-middleware` 4.0.2
- `webpack-hot-middleware` 2.25.0

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Setup Webpack HMR with Express server and React",
  "desc": "You can set up an Express server with Webpack's Hot Module Replacement (HMR) to host a React web application. The article provides code examples and instructions on how to configure your server and web application.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/setup-webpack-hmr-with-express-server-and-react.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
