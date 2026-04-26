---
lang: en-US
title: "Workbox: your high-level service worker toolkit"
description: "Article(s) > Workbox: your high-level service worker toolkit"
icon: fa-brands fa-css3-alt
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - web.dev
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Workbox: your high-level service worker toolkit"
    - property: og:description
      content: "Workbox: your high-level service worker toolkit"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/web.dev/workbox.html
prev: /programming/js/articles/README.md
date: 2018-11-05
isOriginal: false
author:
  - name: Jeff Posnick
    url: https://github.com/jeffposnick
cover: https://web.dev/static/articles/workbox/image/workbox-logging-the-devt.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<!--
timestamp="1541404800" formattedtimestamp="November 5, 2018" project="Articles" public="true" attribution="Jeff Posnick" authorname="Jeff Posnick" type="article" displaytype="Article" categories="" durationminutes="0" formattedduration="" apireferences="" lifecyclestate="" keywords="javascript" language="javascript" display-tag-language="JavaScript" hidden=""><div class="devsite-card" dynamic-card-timestamp="1541404800"><a href="https://web.dev/articles/workbox?hl=en" class="devsite-card-image-container devsite-card-image-no-background" data-category="Site-Wide Custom Events" data-label="devsite-dynamic-content card link" data-action="click" track-type="dynamicCard" track-name="" track-metadata-elementtype="cardImage" track-metadata-position="468" aria-hidden="true" tabindex="-1"><img src="https://web.dev/static/articles/workbox/image/workbox-logging-the-devt.png" class="devsite-card-image" loading="lazy" alt=""></a><div class="devsite-card-content-wrapper"><div class="devsite-card-content"><a href="https://web.dev/articles/workbox?hl=en" data-category="Site-Wide Custom Events" data-label="devsite-dynamic-content card link" data-action="click" track-type="dynamicCard" track-name="" track-metadata-elementtype="cardHeading" track-metadata-position="468" aria-label=" - Workbox: your high-level service worker toolkit"><h3 class="no-link hide-from-toc">Workbox: your high-level service worker toolkit</h3></a><p class="devsite-card-summary">Workbox is a high-level service worker toolkit built on top of the Service Worker and Cache Storage APIs. It provides a production-ready set of libraries for adding offline support to web apps.</p></div><div class="devsite-card-section"></div></div></div></div>
-->

<SiteInfo
  name="Workbox: your high-level service worker toolkit"
  desc="Workbox is a high-level service worker toolkit built on top of the Service Worker and Cache Storage APIs. It provides a production-ready set of libraries for adding offline support to web apps."
  url="https://web.dev/articles/workbox"
  logo="https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/touchicon-180.png"
  preview="https://web.dev/static/articles/workbox/image/workbox-logging-the-devt.png"/>

Two APIs play a crucial role in building reliable web apps: [<VPIcon icon="fa-brands fa-firefox"/>Service Worker](https://developer.mozilla.org/docs/Web/API/Service_Worker_API) and [<VPIcon icon="fa-brands fa-firefox"/>Cache Storage](https://developer.mozilla.org/docs/Web/API/Cache). But using them effectively—without introducing subtle bugs or bumping into edge cases—can be a challenge. For example, errors in your service worker code can cause caching problems; users might be shown out-of-date content or broken links.

[<VPIcon icon="fa-brands fa-chrome"/>Workbox](https://developer.chrome.com/docs/workbox) is a high-level service worker toolkit built on top of the Service Worker and Cache Storage APIs. It provides a production-ready set of libraries for adding offline support to web apps. The toolkit is structured into two collections: tools that help manage code that runs inside of your service worker, and tools that integrate with your build process.

::: info Runtime code

This is the code that runs inside of your service worker script and controls how it intercepts outgoing requests and interacts with the Cache Storage API. Workbox has a [<VPIcon icon="fa-brands fa-chrome"/>dozen or so library modules in total](https://developer.chrome.com/docs/workbox/modules), that each handle a variety of specialized use cases. The most important modules determine *whether* the service worker will respond (known as [<VPIcon icon="fa-brands fa-chrome"/>routing](https://developer.chrome.com/docs/workbox/modules/workbox-routing)), and *how* it will respond (known as the [<VPIcon icon="fa-brands fa-chrome"/>caching strategy](https://developer.chrome.com/docs/workbox/modules/workbox-strategies)).

:::

::: info Build integration

Workbox offers [<VPIcon icon="fa-brands fa-chrome"/>command line](https://developer.chrome.com/docs/workbox/modules/workbox-cli), [<VPIcon icon="fa-brands fa-chrome"/>Node.js module](https://developer.chrome.com/docs/workbox/modules/workbox-build), and [<VPIcon icon="fa-brands fa-chrome"/>webpack plugin](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin) tools that provide alternative ways to accomplish two things:

- Create a service worker script based on a set of configuration options. The generated service worker uses Workbox's runtime libraries "under the hood" to put into action the caching strategies you configure.
- Generate a list of URLs that should be "[<VPIcon icon="fa-brands fa-chrome"/>precached](https://developer.chrome.com/docs/workbox/modules/workbox-precaching)", based on configurable patterns to include and exclude files generated during your build process.

:::

---

## Why should you use Workbox?

Using Workbox when building your service worker is optional—there are a number of guides out there that walk through [**common caching strategies**](/web.dev/offline-cookbook.md) from a "vanilla" service worker perspective. If you do decide to use Workbox, here are some of its benefits.

### Cache management

Workbox handles cache updates for you, either tied in to your build process when using precaching, or via configurable size/age policies when using runtime caching. The underlying Cache Storage API is powerful, but it does not have any built-in support for cache expiration. Tools like Workbox fill that gap.

### Extensive logging and error reporting

When you're getting started with service workers, figuring out *why* something is being cached (or, equally frustrating, why it *isn't* cached) is a challenge. Workbox automatically detects when you're running a development version of your website on `localhost`, and turns on debug logging in your browser's JavaScript console.

![Workbox logging to the DevTools console](https://web.dev/static/articles/workbox/image/workbox-logging-the-devt.png)

By following along with the log messages, you can get to the root of any configuration or invalidation problems much more quickly than if you were going it alone.

### A tested, cross-browser codebase

Workbox is developed against a cross-browser test suite, and when possible, automatically falls back to alternative implementations of features that are missing from certain browsers.

- The [<VPIcon icon="fa-brands fa-chrome"/><VPIcon icon="fa-brands fa-firefox"/>`workbox-broadcast-cache-update module`](https://developer.chrome.com/docs/workbox/modules/workbox-broadcast-update) uses the [<VPIcon icon="fa-brands fa-firefox"/>Broadcast Channel API](https://developer.mozilla.org/docs/Web/API/Broadcast_Channel_API) when available, and falls back to a [<VPIcon icon="fa-brands fa-firefox"/>`postMessage()`](https://developer.mozilla.org/docs/Web/API/Window/postMessage)-based implementation on browsers that lack support.
- The [<VPIcon icon="fa-brands fa-chrome"/>workbox-background-sync module](https://developer.chrome.com/docs/workbox/modules/workbox-background-sync) uses the [<VPIcon icon="fa-brands fa-chrome"/>Background Sync API](https://developer.chrome.com/blog/background-sync) if possible, and if not, falls back to retrying queued events each time the service worker starts up.

---

## How should you use Workbox?

### Framework integration

If you're starting a new project from scratch, you can take advantage of the Workbox integration found in many popular starter kits and add-on plugins:

<SiteInfo
  name="Making a Progressive Web App | Create React App"
  desc="The production build has all the tools necessary to generate a first-class"
  url="https://create-react-app.dev/docs/making-a-progressive-web-app//"
  logo="https://create-react-app.dev/img/favicon/favicon.ico"
  preview="https://create-react-app.dev/img/logo-og.png"/>

<SiteInfo
  name="vue-cli/packages/@vue/cli-plugin-pwa/README.md at dev · vuejs/vue-cli"
  desc="🛠️ webpack-based tooling for Vue.js Development. Contribute to vuejs/vue-cli development by creating an account on GitHub."
  url="https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-plugin-pwa/README.md/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/fe41067a9fa985a79088c2106b2850607104bd300d74636b98f83bf82e7da7c0/vuejs/vue-cli"/>

<SiteInfo
  name="preact-cli-workbox-plugin/README.md at master · prateekbh/preact-cli-workbox-plugin"
  desc="Workbox plugin for preact-cli. Contribute to prateekbh/preact-cli-workbox-plugin development by creating an account on GitHub."
  url="https://github.com/prateekbh/preact-cli-workbox-plugin/blob/master/README.md/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/51acdfbb8fc971e65e9e5a3168f21fe36d96085f12010745e14d4f0ef4ea138f/prateekbh/preact-cli-workbox-plugin"/>

<SiteInfo
  name="The Best React-Based Framework | Gatsby"
  desc="Gatsby is a React-based open source framework with performance, scalability and security built-in. Collaborate, build and deploy 1000x faster on Netlify."
  url="https://gatsbyjs.com/"
  logo="https://gatsbyjs.com/favicon-32x32.png?v=3ad5294f3fa6c06e2d07ab07c76df2cf"
  preview="https://images.ctfassets.net/vkdbses00qqt/38yAjXH9hRko9noPZWrluI/4d1988b4b07acfab9ce93a87407930bd/Frame_3__2_.png"/>

<SiteInfo
  name="next-offline/readme.md at master · hanford/next-offline"
  desc="make your Next.js application work offline using service workers via Google's workbox - hanford/next-offline"
  url="https://github.com/hanford/next-offline/blob/master/readme.md/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/71f422b12fc56c30b9d45acd53adfa7b2382be5a52372a2f74be17096de1d4f3/hanford/next-offline"/>

### Add Workbox to your existing build process

If you already have a build process for your site in place, dropping in the appropriate [<VPIcon icon="fa-brands fa-chrome"/>command line](https://developer.chrome.com/docs/workbox/modules/workbox-cli), [<VPIcon icon="fa-brands fa-chrome"/>Node.js module](https://developer.chrome.com/docs/workbox/modules/workbox-build), or [<VPIcon icon="fa-brands fa-chrome"/>webpack plugin](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin) tool may be all you need to start using Workbox.

In particular, the Workbox command line interface makes it easy to get up and running, featuring a `wizard` mode that will check your local development environment and suggest a reasonable default configuration that you could use moving forward:

```plaintext
workbox wizard
? What is the root of your web app (i.e. which directory do you deploy)? src/
? Which file types would you like to precache? css, js, html
? Where would you like your service worker file to be saved? build/sw.js
? Where would you like to save these configuration options? workbox-config.js
```

To build your service worker, run `workbox generateSW workbox-config.js` as part of a build process. See the [<VPIcon icon="fa-brands fa-chrome"/>`generateSW` documentation](https://developer.chrome.com/docs/workbox?hl=ko#generatesw) for details. You can further customize your service worker by making changes to `workbox-config.js`. See the [<VPIcon icon="fa-brands fa-chrome"/>documentation of the options](https://developer.chrome.com/docs/workbox?hl=ko#options_used_by_generatesw) for details.

### Use Workbox at runtime in an existing service worker

If you have an existing service worker and want to try out Workbox's runtime libraries, [<VPIcon icon="fa-brands fa-chrome"/>import Workbox from its official CDN](https://developer.chrome.com/docs/workbox/modules/workbox-sw#using-workbox-sw-via-cdn) and start using it for runtime caching right away. This use case means that you won't be able to take advantage of precaching (which requires build-time integration), but it's great for prototyping and trying out different caching strategies on the fly.

```js
// Replace 3.6.3 with the current version number of Workbox.
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.routing.registerRoute(
  new RegExp('.png$'),
  workbox.strategies.cacheFirst({
    cacheName: 'images-cache',
  })
);
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Workbox: your high-level service worker toolkit",
  "desc": "Workbox is a high-level service worker toolkit built on top of the Service Worker and Cache Storage APIs. It provides a production-ready set of libraries for adding offline support to web apps.",
  "link": "https://chanhi2000.github.io/bookshelf/web.dev/workbox.html",
  "logo": "https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/touchicon-180.png",
  "background": "rgba(26,115,232,0.2)"
}
```
