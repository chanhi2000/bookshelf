---
lang: en-US
title: "Getting started with Vite"
description: "Article(s) > Getting started with Vite"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Getting started with Vite"
    - property: og:description
      content: "Getting started with Vite"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/getting-started-with-vite.html
prev: /programming/js-node/articles/README.md
date: 2020-07-03
isOriginal: false
author:
  - name: Anjolaoluwa Adebayo-Oyetoro
    url : https://blog.logrocket.com/author/anjolaoluwaadebayooyetoro/
cover: /assets/image/blog.logrocket.com/getting-started-with-vite/banner.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Getting started with Vite"
  desc="We'll take a look at a build tool called Vite, what it is, why we need it, how it might improve our development workflow, and how to get started with it."
  url="https://blog.logrocket.com/getting-started-with-vite"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/getting-started-with-vite/banner.webp"/>

JavaScript build tools have changed and shaped the way we build things that run on the web. Build tools are an integral part of any development workflow, they include (but are not limited to) task runners, transpilers, module bundlers, linters, package managers, and development servers.

![](/assets/image/blog.logrocket.com/getting-started-with-vite/banner.webp)

These tools help developers build efficiently and make development processes much easier(although, configuring them can get complicated).

In this article, we will take a look at a build tool called [<FontIcon icon="iconfont icon-github"/>`vitejs/vite`](https://github.com/vitejs/vite), what it is, why we need it, how it might improve our development workflow, and how to get started with it.

::: note Prerequisites

This tutorial assumes the reader has the following:

- [<FontIcon icon="fa-brands fa-node"/>Node.js 10x](https://nodejs.org/en/download/) or higher
- [<FontIcon icon="fa-brands fa-yarn"/>Yarn](https://yarnpkg.com/lang/en/) / [<FontIcon icon="fa-brands fa-npm"/>npm 5.2 or higher](https://npmjs.com/get-npm) installed on their PC
- Basic knowledge of JavaScript and how frameworks work

:::

---

## What exactly is Vite?

Vite was originally intended as a development server for just Vue single file components(SFC) but it has evolved and is now a no-bundle JavaScript development server.

Vite doesn’t bundle our projects in development environments, rather it uses native ES module imports.

According to its official [documentation (<FontIcon icon="iconfont icon-github"/>`vitejs/vite`)](https://github.com/vitejs/vite):

::: info Documentation (<code>vitejs/vite</code>)

> Vite is an opinionated web dev build tool that serves your code via native ES Module imports during development and bundles it with [<FontIcon icon="fas fa-globe"/>Rollup](https://rollupjs.org/) for production.

:::

The main difference between Vite and the other development servers currently available is the fact that it does not bundle your files during development.

It is important to note that Vite is still very much experimental and is undergoing work to make it suitable for production. It is best to not use it on critical projects until it becomes stable.

---

## How does it work?

One of the reasons module bundlers are popular today is the poor support for [<FontIcon icon="fa-brands fa-firefox"/>ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) by the browser when ES modules were first introduced in [<FontIcon icon="fa-brands fa-google"/>ES2016](https://developers.google.com/web/shows/ttt/series-2/es2015). Many modern browsers now support native ES modules and you can use the [<FontIcon icon="fa-brands fa-firefox"/>`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [<FontIcon icon="fa-brands fa-firefox"/>`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) statements natively, we can include our imports in our HTML using the `type="module"` attribute in our script tag to specify we’re importing a module:

```html
<script type="module" src="filename.js"></script>
```

According to the [documentation (<FontIcon icon="iconfont icon-github "/>`vitejs/vite`)](https://github.com/vitejs/vite), the ES import syntax in our source code is served directly to the browser and any browser that supports the native `<script module>` automatically parses them, then makes HTTP requests for each import. The dev server intercepts the HTTP requests from the browser and performs code transformations where necessary.

This makes the Vite server insanely fast, [<FontIcon icon="fas fa-globe"/>Vite Cold start clocks at around 140ms compared to Vue-CLI 1900ms](https://getrevue.co/profile/vuenewsletter/issues/180-say-hi-to-vite-a-brand-new-extremely-fast-development-setup-for-vue-so-fast-it-feels-instant-242032).

---

## What does Vite offer?

Some of the perks of using Vite include:

### Bare module resolving

Browsers do not yet support bare module imports where you import from a package name like `import { createApp } from 'vue'` because it’s not a relative path to our node_modules. Vite checks your JavaScript files for such bare import specifiers, it rewrites them and performs module resolution to locate the correct files from your project dependencies and resolves them as valid module specifiers.

### Hot module replacement(HMR)

Hot module replacement is a feature available in JavaScript bundlers where your JavaScript file changes are updated in the browser without needing a browser refresh, with Vite all your file changes are reflected in the browser almost immediately and you do not need to reload the browser. According to the [documentation (<FontIcon icon="iconfont icon-github"/>`vitejs/vite`)](https://github.com/vitejs/vite), “the hot module replacement (HMR) performance is decoupled from the total number of modules. This makes HMR in your project consistently fast no matter how big your app is”.

HMR speed is a huge pain point for developers who use Webpack.

### On-demand compilation

Vite compiles source files as they are requested by the browser so the only code that is imported and required on the current screen is compiled, and unchanged files return a [<FontIcon icon="fa-brands fa-firefox"/>304 (Not Modified)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/304#:~:text=The%20HTTP%20304%20Not%20Modified,redirection%20to%20a%20cached%20resource.&text=The%20equivalent%20200%20OK%20response,ETag%20%2C%20Expires%20%2C%20and%20Vary%20.) error code. This is different from what current bundlers do because they compile all the files in your project and bundle them before you can begin making changes to them. This makes Vite suitable for larger projects.

### Configuration option

If you like to have more controls over your project, You can extend the default configuration of your project with the `vite.config.js` or `vite.config.ts` file in the base root directory of your project or the current working directory. You can also explicitly specify a config file via `vite --config my-config.js`.

You can add support for custom file transforms by adding a [Koa middleware (<FontIcon icon="iconfont icon-github"/>`koajs/koa`)](https://github.com/koajs/koa) in your configuration file in development mode and a [Rollup plugin (<FontIcon icon="iconfont icon-github"/>`rollup/plugins`)](https://github.com/rollup/plugins) for build.

### Other features of Vite include:

- Support for `.tsx` and `.jsx` files using [<FontIcon icon="iconfont icon-github"/>`evanw/esbuild`](https://github.com/evanw/esbuild) for transpilation
- Out of the box support for TypeScript also using [<FontIcon icon="iconfont icon-github"/>`evanw/esbuild`](https://github.com/evanw/esbuild) for transpilation
- Asset URL handling
- Support for CSS Preprocessors, PostCSS, and CSS modules
- Support for mode options and environment variables

---

## Basic usage

To get started using Vite, we will be making use of [<FontIcon icon="iconfont icon-github"/>`vitejs/create-vite-app`](https://github.com/vitejs/create-vite-app), a boilerplate to bootstrap new Vite projects, we will not have to worry about configurations to get started with using our app as it comes with Vue as the default starter and we can configure what template we want to use with the `--template` flag as it also supports React and Preact.

Run this command to create a new Vite app with the boilerplate:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn create vite-app testing-vite
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npx create-vite-app testing-vite
```

:::

![create a vite app with boiler plate](/assets/image/blog.logrocket.com/getting-started-with-vite/basicusage.png)

We’re using the name “testing-vite” as the project name for this tutorial, it can be replaced with whatever name you deem fit.

Now, change to the created project directory using the command:

```sh
cd testing-vite
```

Then proceed to install the necessary packages required for our project to work:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i
```

:::

We can then spin up our development server in the browser by running the command:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn dev
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm run dev
```

:::

You should get something similar to this running on `http://localhost:3000` after running the `dev` command:

![running vite on local host](/assets/image/blog.logrocket.com/getting-started-with-vite/vite.png)

You can run the following command to bundle your app for production:

```sh
vite build
```

![vite bundling](/assets/image/blog.logrocket.com/getting-started-with-vite/vitebundling.png)

Vite uses Rollup for production builds, the production build output is in the `dist` directory located in the root of your project. It contains static assets that can be deployed anywhere (and can be polyfilled to support older browsers).

The documentation says, “the build step is configurable by passing on most options to Rollup”.

---

## Conclusion

With Vite, you have a very fast development server that would improve your development workflow and increase productivity.

The result of your file changes are instantaneous in the browser and you can bundle your app for production using Rollup. The code repository to this article can be accessed on [GitHub (<FontIcon icon="iconfont icon-github"/>`Jolaolu/vite-demo`)](https://github.com/Jolaolu/vite-demo).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Getting started with Vite",
  "desc": "We'll take a look at a build tool called Vite, what it is, why we need it, how it might improve our development workflow, and how to get started with it.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/getting-started-with-vite.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
