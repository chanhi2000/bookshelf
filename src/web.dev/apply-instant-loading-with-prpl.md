---
lang: en-US
title: "Apply instant loading with the PRPL pattern"
description: "Article(s) > Apply instant loading with the PRPL pattern"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - web.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Apply instant loading with the PRPL pattern"
    - property: og:description
      content: "Apply instant loading with the PRPL pattern"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/web.dev/apply-instant-loading-with-prpl.html
prev: /programming/css/articles/README.md
date: 2018-11-05
isOriginal: false
author:
  - name: Houssein Djirdeh
    url: https://github.com/housseindjirdeh
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

```component VPCard
{
  "title": "Apply instant loading with the PRPL pattern",
  "desc": "PRPL is an acronym that describes a pattern used to make web pages load and become interactive, faster. In this guide, learn how each of these techniques fit together but still can be used independently to achieve performance results.",
  "link": "https://web.dev/articles/apply-instant-loading-with-prpl",
  "logo": "https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/touchicon-180.png",
  "background": "rgba(26,115,232,0.2)"
}
```

PRPL is an acronym that describes a pattern used to make web pages load and become interactive, faster:

- **Preload** the late-discovered resources.
- **Render** the initial route as soon as possible.
- **Pre-cache** remaining assets.
- **Lazy load** other routes and non-critical assets.

In this guide, learn how each of these techniques fit together but still can be used independently to achieve performance results.

---

## Audit your page with Lighthouse

Run Lighthouse to identify opportunities for improvement aligned with the PRPL techniques:

1. Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (or <kbd>⌘</kbd>+<kbd>⌥</kbd>+<kbd>J</kbd> on Mac) to open DevTools.
2. Click the **Lighthouse** tab.
3. Select the **Performance** and **Progressive Web App** checkboxes.
4. Click **Run Audits** to generate a report.

::: info

For more information, see [**Discover performance opportunities with Lighthouse**](/web.dev/discover-performance-opportunities-with-lighthouse.md).

:::

---

## Preload critical resources

Lighthouse shows the following failed audit if a certain resource is parsed and fetched late:

![Lighthouse: Preload key requests audit](https://web.devhttps://web.dev/static/articles/apply-instant-loading-with-prpl/image/lighthouse-preload-key-r-b164db4bc3faa.png)

[<VPIcon icon="fa-brands fa-firefox"/>Preload](https://developer.mozilla.org/docs/Web/HTML/Preloading_content) is a declarative fetch request that tells the browser to request a resource that is otherwise not discoverable by the browser's [**preload scanner**](/web.dev/preload-scanner), such as an image referenced by the [<VPIcon icon="fa-brands fa-firefox"/>`background-image` property](https://developer.mozilla.org/docs/Web/CSS/background-image). Preload late-discovered resources by adding a `<link>` tag with `rel="preload"` to the head of your HTML document:

```html
<link rel="preload" as="image" href="hero-image.jpg">
```

Adding a `<link rel="preload">` directive will initiate a request for that resource and store it in the cache. The browser is then able to retrieve it when needed.

For more information about preloading critical resources, refer to the [**Preload critical assets**](/web.dev/preload-critical-assets.md) guide.

 does not generally change the request's priority. To increase the priority of a resource use the [**Fetch Priority API**](/web.dev/fetch-priority.md).

---

## Render the initial route as soon as possible

Lighthouse provides a warning if there are resources that delay [**First Paint**](/web.dev/user-centric-performance-metrics.md#important_metrics_to_measure), the moment when your site renders pixels to the screen:

![Lighthouse: Eliminate render-blocking resources audit](https://web.dev/static/articles/apply-instant-loading-with-prpl/image/lighthouse-eliminate-ren-6ae3a7cc473f5.png)

To improve First Paint, Lighthouse recommends inlining critical JavaScript and deferring the rest using [**`async`**](/web.dev/critical-rendering-path/adding-interactivity-with-javascript.md), as well as inlining critical CSS used above-the-fold. This improves performance by eliminating round-trips to the server to fetch render-blocking assets. However, inline code is harder to maintain from a development perspective and cannot be cached separately by the browser.

Another approach to improve First Paint is to **server-side render** the initial HTML of your page. This displays content immediately to the user while scripts are still being fetched, parsed, and executed. However, this can increase the payload of the HTML file significantly, which can harm [**Time to Interactive**](/web.dev/tti.md), or the time it takes for your application to become interactive and can respond to user input.

There is no single correct solution to reduce the First Paint in your application, and you should only consider inlining styles and server-side rendering if the benefits outweigh the tradeoffs for your application. You can learn more about both of these concepts with the following resources.

<SiteInfo
  name="Optimize CSS Delivery  |  PageSpeed Insights  |  Google for Developers"
  desc="This rule triggers when PageSpeed Insights detects that a page includes render blocking external stylesheets, which delay the time to first render."
  url="https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery/"
  logo="https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/developers/images/favicon-new.png"
  preview="https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/developers/images/opengraph/google-blue.png"/>

<VidStack src="youtube/GQzn7XRdzxY" />

![Requests/responses with service worker](https://web.dev/static/articles/apply-instant-loading-with-prpl/image/requestsresponses-servi-9af9ccb5be804.png)
<!-- TODO: mermaid 화 -->
---

## Pre-cache assets

By acting as a proxy, **service workers** can fetch assets directly from the cache rather than the server on repeat visits. This not only allows users to use your application when they are offline, but also results in faster page load times on repeat visits.

Use a third-party library to simplify the process of generating a service worker unless you have more complex caching requirements than what a library can provide. For example, [**Workbox**](/web.dev/case-studies/aem-with-workbox.md) provides a collection of tools that allow you to create and maintain a service worker to cache assets. For more information on service workers and offline reliability, refer to the [**service worker guide**](/web.dev/service-workers-cache-storage.md) in the reliability learning path.

---

## Lazy load

Lighthouse displays a failed audit if you send too much data over the network.

![Lighthouse: Has enormous network payloads audit](https://web.dev/static/articles/apply-instant-loading-with-prpl/image/lighthouse-has-enormous-472deca8ddd28.png)

This includes all asset types, but large JavaScript payloads are especially costly due to the time it takes the browser to parse and compile them. Lighthouse also provides a warning for this when appropriate.

![Lighthouse: JavaScript boot-up time audit](https://web.dev/static/articles/apply-instant-loading-with-prpl/image/lighthouse-javascript-bo-c7df4b0ea0a67.png)

To send a smaller JavaScript payload that contains only the code needed when a user initially loads your application, split the entire bundle and [**lazy load**](/web.dev/reduce-javascript-payloads-with-code-splitting.md) chunks on demand.

Once you've managed to split your bundle, preload the chunks that are more important (see the [**Preload critical assets**](/web.dev/preload-critical-assets) guide). Preloading ensures more important resources are fetched and downloaded sooner by the browser.

Aside from splitting and loading different JavaScript chunks on demand, Lighthouse also provides an audit for lazy loading non-critical images.

![Lighthouse: Defer offscreen images audit](https://web.dev/static/articles/apply-instant-loading-with-prpl/image/lighthouse-defer-offscre-dc19a1e6b2ac6.png)

If you load many images on your web page, defer all that are below the fold, or outside the device viewport, when a page is loaded (see [**Use lazysizes to lazyload images**](/web.dev/browser-level-image-lazy-loading.md)).

---

## Next Steps

Now that you understand some of the basic concepts behind the PRPL pattern, continue to the next guide in this section to learn more. It's important to remember that not all of the techniques need to be applied together. Any efforts made with any of the following will provide noticeable performance improvements.

- **Preload** critical resources.
- **Render** the initial route as soon as possible.
- **Pre-cache** remaining assets.
- **Lazy load** other routes and non-critical assets.

You can read up more about [<VPIcon icon="fas fa-globe"/>PRPL](https://patterns.dev/posts/prpl/) patterns.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Apply instant loading with the PRPL pattern",
  "desc": "PRPL is an acronym that describes a pattern used to make web pages load and become interactive, faster. In this guide, learn how each of these techniques fit together but still can be used independently to achieve performance results.",
  "link": "https://chanhi2000.github.io/bookshelf/web.dev/apply-instant-loading-with-prpl.html",
  "logo": "https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/touchicon-180.png",
  "background": "rgba(26,115,232,0.2)"
}
```
