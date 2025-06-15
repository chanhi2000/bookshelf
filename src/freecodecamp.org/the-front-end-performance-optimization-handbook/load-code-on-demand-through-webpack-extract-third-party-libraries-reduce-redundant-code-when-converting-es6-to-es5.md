---
lang: en-US
title: "Load Code on Demand Through Webpack, Extract Third-Party Libraries, Reduce Redundant Code When Converting ES6 to ES5"
description: "Article(s) > (10/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
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
      content: "Article(s) > (10/24) The Front-End Performance Optimization Handbook – Tips and Strategies for Devs"
    - property: og:description
      content: "Load Code on Demand Through Webpack, Extract Third-Party Libraries, Reduce Redundant Code When Converting ES6 to ES5"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-front-end-performance-optimization-handbook/load-code-on-demand-through-webpack-extract-third-party-libraries-reduce-redundant-code-when-converting-es6-to-es5.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-load-code-on-demand-through-webpack-extract-third-party-libraries-reduce-redundant-code-when-converting-es6-to-es5"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

The following quote from the official Webpack documentation explains the concept of lazy loading:

::: info Lazy Loading (<FontIcon icon="fas fa-globe"/><code>webpack.docschina.org</code>)

> "Lazy loading or on-demand loading is a great way to optimize a website or application. This approach actually separates your code at some logical breakpoints, and then immediately references or is about to reference some new code blocks after completing certain operations in some code blocks. This speeds up the initial loading of the application and lightens its overall volume because some code blocks may never be loaded." 

<SiteInfo
  name="Lazy Loading | webpack"
  desc="webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset."
  url="https://webpack.js.org/guides/lazy-loading//"
  logo="https://webpack.js.org/icon_512x512.png"`
  preview="https://webpack.js.org/icon-pwa-512x512.934507c816afbcdb.png"/>

:::

::: note

While image lazy loading (discussed in section 9.1) delays the loading of image resources until they're visible in the viewport, code lazy loading splits JavaScript bundles and loads code fragments only when they're needed for specific functionality. They both improve initial load time, but they work at different levels of resource optimization.

:::

---

## Generate File Names Based on File Content, Combined with Import Dynamic Import of Components to Achieve On-Demand Loading

This requirement can be achieved by configuring the filename property of output. One of the value options in the filename property is `[contenthash]`, which creates a unique hash based on file content. When the file content changes, `[contenthash]` also changes.

```js
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].js',
  path: path.resolve(__dirname, '../dist'),
},
```

::: tip Example of code lazy loading in a Vue application:

```js
// Instead of importing synchronously like this:
// import UserProfile from './components/UserProfile.vue'

// Use dynamic import for route components:
const UserProfile = () => import('./components/UserProfile.vue')

// Then use it in your routes
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: UserProfile }
  ]
})
```

This ensures the `UserProfile` component is only loaded when a user navigates to that route, not on initial page load.

:::

---

## Extract Third-Party Libraries

Since imported third-party libraries are generally stable and don't change frequently, extracting them separately as long-term caches is a better choice. This requires using the cacheGroups option of Webpack4's splitChunk plugin.

```js :collapsed-lines
optimization: {
  runtimeChunk: {
    name: 'manifest' // Split webpack's runtime code into a separate chunk.
  },
  splitChunks: {
    cacheGroups: {
      vendor: {
        name: 'chunk-vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: 'initial'
      },
      common: {
        name: 'chunk-common',
        minChunks: 2,
        priority: -20,
        chunks: 'initial',
        reuseExistingChunk: true
      }
    },
  }
},
```

- `test`: Used to control which modules are matched by this cache group. If passed unchanged, it defaults to select all modules. Types of values that can be passed: `RegExp`, `String`, and `Function`.
- `priority`: Indicates extraction weight, with higher numbers indicating higher priority. Since a module might meet the conditions of multiple `cacheGroups`, extraction is determined by the highest weight.
- `reuseExistingChunk`: Indicates whether to use existing chunks. If true, it means that if the current chunk contains modules that have already been extracted, new ones won't be generated.
- `minChunks` (default is 1): The minimum number of times this code block should be referenced before splitting (note: to ensure code block reusability, the default strategy doesn't require multiple references to be split).
- `chunks` (default is async): initial, async, and all.
- `name` (name of the packaged chunks): String or function (functions can customize names based on conditions).

---

## Reduce Redundant Code When Converting ES6 to ES5

To achieve the same functionality as the original code after Babel conversion, some helper functions are needed. For example this:

```js
class Person {}
```

will be converted to this:

```js
"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Person = function Person() {
  _classCallCheck(this, Person);
};
```

Here, `_classCallCheck` is a `helper` function. If classes are declared in many files, then many such `helper` functions will be generated.

The `@babel/runtime` package declares all the helper functions needed, and the role of `@babel/plugin-transform-runtime` is to import all files that need `helper` functions from the `@babel/runtime package`:

```js
"use strict";

var _classCallCheck2 = require("@babel/runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Person = function Person() {
  (0, _classCallCheck3.default)(this, Person);
};
```

Here, the `helper` function `classCallCheck` is no longer compiled, but instead references `helpers/classCallCheck` from `@babel/runtime`.

**Installation:**

```sh
npm i -D @babel/plugin-transform-runtime @babel/runtime
```

**Usage:**

In the <FontIcon icon="fas fa-file-lines"/>`.babelrc` file,

```json title=".babelrc"
"plugins": [
  "@babel/plugin-transform-runtime"
]
```

::: info References:

```component VPCard
{
  "title": "Babel · Babel",
  "desc": "The compiler for next generation JavaScript",
  "link": "https://babeljs.io/",
  "logo": "https://babeljs.io/img/favicon.png",
  "background": "rgba(245,218,85,0.2)"
}
```

```component VPCard
{
  "title": "Lazy Loading Routes | Vue Router",
  "desc": "The official Router for Vue.js",
  "link": "https://router.vuejs.org/guide/advanced/lazy-loading.html",
  "logo": "https://router.vuejs.org/logo.png",
  "background": "rgba(61,214,140,0.2)"
}
```

<SiteInfo
  name="SplitChunksPlugin | webpack"
  desc="webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset."
  url="https://webpack.js.org/plugins/split-chunks-plugin//"
  logo="https://webpack.js.org/icon_512x512.png"
  preview="https://webpack.js.org/icon-pwa-512x512.934507c816afbcdb.png"/>

:::