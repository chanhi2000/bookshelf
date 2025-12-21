---
lang: en-US
title: "Use Server-Side Rendering"
description: "Article(s) > (3/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
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
      content: "Article(s) > (3/24) The Front-End Performance Optimization Handbook - Tips and Strategies for Devs"
    - property: og:description
      content: "Use Server-Side Rendering"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-front-end-performance-optimization-handbook/use-server-side-rendering.html
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
  url="https://freecodecamp.org/news/the-front-end-performance-optimization-handbook#heading-use-server-side-rendering"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png"/>

In client-side rendering, you get the HTML file, download JavaScript files as needed, run the files, generate the DOM, and then render.

And in server-side rendering, the server returns the HTML file, and the client only needs to parse the HTML.

- Pros: Faster first-screen rendering, better SEO.
- Cons: Complicated configuration, increases the computational load on the server.

Below, I'll use Vue SSR as an example to briefly describe the SSR process.

---

## Client-side rendering process

1. Visit a client-rendered website.
2. The server returns an HTML file containing resource import statements and `<div id="app"></div>`.
3. The client requests resources from the server via HTTP, and when the necessary resources are loaded, it executes `new Vue()` to instantiate and render the page.

::: tip Example of client-side rendered app (Vue):

```html title="index.html"
<!DOCTYPE html>
<html>
<head>
  <title>Client-side Rendering Example</title>
</head>
<body>
  <!-- Initially empty container -->
  <div id="app"></div>

  <!-- JavaScript bundle that will render the content -->
  <script src="/dist/bundle.js"></script>
</body>
</html>
```

```js title="main.js"
import Vue from 'vue';
import App from './App.vue';

// Client-side rendering happens here - after JS loads and executes
new Vue({
  render: h => h(App)
}).$mount('#app');
```

```vue title="App.vue"
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>This content is rendered client-side.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello World'
    }
  },
  // In client-side rendering, this lifecycle hook runs in the browser
  mounted() {
    console.log('Component mounted in browser');
  }
}
</script>
```

---

## Server-side rendering process

1. Visit a server-rendered website.
2. The server checks which resource files the current route component needs, then fills the content of these files into the HTML file. If there are AJAX requests, it will execute them for data pre-fetching and fill them into the HTML file, and finally return this HTML page.
3. When the client receives this HTML page, it can start rendering the page immediately. At the same time, the page also loads resources, and when the necessary resources are fully loaded, it begins to execute `new Vue()` to instantiate and take over the page.

::: tip Example of server-side rendered app (Vue):

```js title="server.js"
const express = require('express');
const server = express();
const { createBundleRenderer } = require('vue-server-renderer');

// Create a renderer based on the server bundle
const renderer = createBundleRenderer('./dist/vue-ssr-server-bundle.json', {
  template: require('fs').readFileSync('./index.template.html', 'utf-8'),
  clientManifest: require('./dist/vue-ssr-client-manifest.json')
});

// Handle all routes with the same renderer
server.get('*', (req, res) => {
  const context = { url: req.url };

  // Render our Vue app to a string
  renderer.renderToString(context, (err, html) => {
    if (err) {
      // Handle error
      res.status(500).end('Server Error');
      return;
    }
    // Send the rendered HTML to the client
    res.end(html);
  });
});

server.listen(8080);
```

```html title="index.template.html"
<!DOCTYPE html>
<html>
<head>
  <title>Server-side Rendering Example</title>
  <!-- Resources injected by the server renderer -->
</head>
<body>
  <!-- This will be replaced with the app's HTML -->
  <!--vue-ssr-outlet-->
</body>
</html>
```

```js title="entry-server.js"
import { createApp } from './app';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp();

    // Set server-side router's location
    router.push(context.url);

    // Wait until router has resolved possible async components and hooks
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      // No matched routes, reject with 404
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      // The Promise resolves to the app instance
      resolve(app);
    }, reject);
  });
}
```

From the two processes above, you can see that the difference lies in the second step. A client-rendered website will directly return the HTML file, while a server-rendered website will render the page completely before returning this HTML file.

---

## What's the benefit of doing this? It's a faster time-to-content.

Suppose your website needs to load four files (a, b, c, d) to render completely. And each file is 1 MB in size.

Calculating this way: a client-rendered website needs to load 4 files and an HTML file to complete the home page rendering, totaling 4MB (ignoring the HTML file size). While a server-rendered website only needs to load a fully rendered HTML file to complete the home page rendering, totaling the size of the already rendered HTML file (which isn't usually too large, generally a few hundred KB; my personal blog website (SSR) loads an HTML file of 400KB). **This is why server-side rendering is faster.**

::: info References:

<SiteInfo
  name="woai3c/vue-ssr-demo"
  desc="Vue 服务端渲染 demo."
  url="https://github.com/woai3c/vue-ssr-demo/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/816835668b29cced4dc41c794851a41a7e5f3a93d762a851006c899f95fd1bca/woai3c/vue-ssr-demo"/>

<SiteInfo
  name="Server-Side Rendering (SSR) | Vue.js"
  desc="Vue.js - The Progressive JavaScript Framework"
  url="https://vuejs.org/guide/scaling-up/ssr.html"
  logo="https://vuejs.org/logo.svg"
  preview="https://vuejs.org/images/logo.png"/>

:::
