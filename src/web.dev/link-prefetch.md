---
lang: en-US
title: "Prefetch resources to speed up future navigations"
description: "Article(s) > Prefetch resources to speed up future navigations"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - web.dev
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Prefetch resources to speed up future navigations"
    - property: og:description
      content: "Prefetch resources to speed up future navigations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/web.dev/link-prefetch.html
prev: /programming/css/articles/README.md
date: 2019-09-12
isOriginal: false
author:
  - name: Demián Renzulli
    url: https://github.com/demianrenzulli
  - name: Jeremy Wagner
    url: https://github.com/malchata
cover: https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/dynamic-content-card-default.png
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

<SiteInfo
  name="Prefetch resources to speed up future navigations"
  desc="Learn about rel=prefetch resource hint and how to use it."
  url="https://web.dev/articles/link-prefetch"
  logo="https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/touchicon-180.png"
  preview="https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/dynamic-content-card-default.png"/>

Research shows that [<VPIcon icon="fas fa-globe"/>faster load times result in higher conversion rates](https://wpostats.com/) and better user experiences. If you have insight into how users move through your website and which pages they will likely visit next, you can improve load times of future navigations by downloading the resources for those pages ahead of time.

This guide explains how to achieve that with `<link rel=prefetch>` that lets you implement prefetching in an efficient way.

---

## Improve site performance with `rel=prefetch`

Adding `<link rel=prefetch>` to a web page tells the browser to download some of the resources (like scripts or CSS files), that the user might need in the future:

```html
<link rel="prefetch" href="/css/styles.css">
```

The `prefetch` hint consumes extra bytes for resources that are not immediately needed, so this technique needs to be applied thoughtfully; only prefetch resources when you are confident that users will need them. Consider not prefetching when users are on slow connections. You can detect that with the [**Network Information API**](/web.dev/adaptive-serving-based-on-network-quality.md).

---

## Use cases

Prefetch has many use cases to speed up web pages by downloading resources in advance.

### Prefetch subsequent pages

Prefetch HTML documents when subsequent pages are predictable, so that when a link is clicked, the page is loaded instantly.

::: warning Caution

The [<VPIcon icon="fa-brands fa-chrome"/>Speculation Rules API](https://developer.chrome.com/docs/web-platform/prerender-pages) provides several advantages over prefetch for prefetching navigations for browsers that support this API including [<VPIcon icon="fa-brands fa-chrome"/>handling non-cacheable navigations](https://developer.chrome.com/docs/web-platform/prerender-pages#no-cache) and consistent cross-origin prefetch handling.

:::

For example, in a product listing page, you can prefetch the page for the most popular product in the list. In some cases, the next navigation is even easier to anticipate—on a shopping cart page, the likelihood of a user visiting the checkout page is usually high which makes it a good candidate for prefetching.

::: note

eBay implemented prefetching for the first five results on a search page to speed up future pages loads and saw a positive impact on conversion rates.

:::

While prefetching resources does use additional bandwidth, it can improve most performance metrics. [**Time to First Byte (TTFB)**](/web.dev/ttfb.md) will often be much lower, as the document request results in a cache hit. Because TTFB will be lower, subsequent time-based metrics will often be lower as well, including [**Largest Contentful Paint (LCP)**](/web.dev/lcp.md) and [**First Contentful Paint (FCP)**](/web.dev/fcp.md).

### Prefetch static assets

Prefetch static assets, like scripts or stylesheets, when subsequent sections the user might visit can be predicted. This is especially useful when those assets are shared across many pages.

For example, Netflix takes advantage of the time users spend on logged-out pages, to prefetch React, which will be used once users sign in. Thanks to this, they [reduced Time to Interactive by 30% for future navigations (<VPIcon icon="fa-brands fa-medium"/>`dev-channel`)](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9).

::: note

At the time of this writing, it is possible to share prefetched resources among pages served from different origins. When [<VPIcon icon="fa-brands fa-google"/>Double-keyed HTTP cache](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/6KKXv1PqPZ0/oguPntMGDgAJ) ships, this will only work for top-level navigations and same-origin subresources, but it won't be possible to reuse prefetched subresources among different origins. This means that, if `a.com` prefetches the resource `b.com/library.js`, it won't be available in `c.com` cache. Some browsers, such as WebKit-based ones, already [<VPIcon icon="fa-brands fa-safari"/>partition caches and HTML5 storage](https://webkit.org/blog/7675/intelligent-tracking-prevention/) for all third-party domains.

:::

The effect of prefetching static assets on performance metrics depends on the resource being prefetched:

- Prefetching images can significantly lower LCP times for LCP image elements.
- Prefetching stylesheets can improve both FCP and LCP, as the network time to download the style sheet will be eliminated. Since stylesheets are render blocking, they can reduce LCP when prefetched. In cases where the subsequent page's LCP element is a CSS background image requested using the `background-image` property, the image will also be prefetched as a dependent resource of the prefetched style sheet.
- Prefetching JavaScript will allow the processing of the prefetched script to occur much sooner than if it were required to be fetched by the network first during navigation. This can have an effect on a page's [**Interaction to Next Paint (INP)**](/web.dev/inp.md). In cases where markup is rendered on the client using JavaScript, LCP can be improved through reduced resource load delays, and client-side rendering of markup containing a page's LCP element can occur sooner.
- Prefetching web fonts that are not already used by the current page, can eliminate layout shifts. In cases where [<VPIcon icon="fa-brands fa-chrome"/>`font-display: swap;` is used](https://developer.chrome.com/docs/lighthouse/performance/font-display), the swap period for the font is eliminated, resulting in faster rendering of the text and eliminating layout shifts. If a future page uses the prefetched font and the page's LCP element is a block of text using a web font, LCP for that element will also be faster.

### Prefetch on-demand JavaScript chunks

[**Code-splitting**](/web.dev/reduce-javascript-payloads-with-code-splitting.md) your JavaScript bundles lets you initially load only parts of an app and lazy-load the rest. If you're using this technique, you can apply prefetch to routes or components that are not immediately necessary but will likely be requested soon.

For example, if you have a page that contains a button that opens a dialog which contains an emoji picker, you can divide it into three JavaScript chunks—home, dialog and picker. Home and dialog could be initially loaded, while the picker could be loaded on-demand. Tools like webpack allow you to instruct the browser to prefetch these on-demand chunks.

---

## How to implement `rel=prefetch`

The simplest way to implement `prefetch` is adding a `<link>` tag to the `<head>` of the document:

```html
<head>
  ...
  <link rel="prefetch" href="//css/styles.css">
  ...
</head>
```

You can also initiate prefetching with the [<VPIcon icon="fa-brands fa-firefox"/>`Link` HTTP header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Link):

`Link: </css/style.css>; rel=prefetch`

A benefit of specifying a prefetch hint in the HTTP Header is that the browser doesn't need to parse the document to find the resource hint, which can offer small improvements in some cases.

::: note

`prefetch` is supported in [<VPIcon icon="iconfont icon-caniuse"/>all modern browsers except Safari](https://caniuse.com/#search=prefetch). You can implement a fallback technique for Safari with [<VPIcon icon="fa-brands fa-firefox"/>XHR](https://developer.mozilla.org/docs/Web/API/XMLHttpRequest) requests or the [<VPIcon icon="fa-brands fa-firefox"/>Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API).

:::

### Prefetch JavaScript modules with webpack magic comments

webpack lets you prefetch scripts for routes or functions you're reasonably certain users will visit or use soon.

The following code snippet lazy-loads a sorting function from the [<VPIcon icon="fas fa-globe"/>lodash](https://lodash.com/) library to sort a group of numbers that will be submitted by a form:

```js
form.addEventListener("submit", e => {
  e.preventDefault()
  import('lodash.sortby')
    .then(module => module.default)
    .then(sortInput())
    .catch(err => { alert(err) });
});
```

Instead of waiting for the 'submit' event to take place to load this function, you can prefetch this resource to increase the chances of having it available in the cache by the time the user submits the form. webpack allows that using the [<VPIcon icon="iconfont icon-webpack"/>magic comments](https://webpack.js.org/api/module-methods/#magic-comments) inside `import()`:

```js
form.addEventListener("submit", e => {
  e.preventDefault()
  import(/* webpackPrefetch: true */ 'lodash.sortby')
    .then(module => module.default)
    .then(sortInput())
    .catch(err => { alert(err) });
});
```

This tells webpack to inject the `<link rel="prefetch">` tag into the HTML document:

```html
<link rel="prefetch" href="1.bundle.js">
```

The performance benefits of prefetching on-demand chunks is a bit nuanced, but generally speaking, you could expect to see faster responses to interactions which depend on those on-demand chunks, as they will be immediately available. Depending on the nature of the interaction, this could impart a benefit to a page's INP.

Prefetching in general also factors into overall [**resource prioritization**](/web.dev/prioritize-resources.md). When a resource is prefetched, it is done so at the lowest possible priority. Thus, any prefetched resources won't contend for bandwidth for resources needed by the current page.

### Smart prefetching with quicklink and Guess.js

You can also implement smarter prefetching with libraries that use `prefetch` under the hood:

- [<VPIcon icon="iconfont icon-github"/>`GoogleChromeLabs/quicklink`](https://github.com/GoogleChromeLabs/quicklink) uses [<VPIcon icon="fa-brands fa-firefox"/>Intersection Observer API](https://developer.mozilla.org/docs/Web/API/Intersection_Observer_API) to detect when links come into the viewport and prefetches linked resources during [<VPIcon icon="fa-brands fa-firefox"/>idle time](https://developer.mozilla.org/docs/Web/API/Window/requestIdleCallback). Bonus: quicklink weighs less than 1 KB!
- [Guess.js (<VPIcon icon="iconfont icon-github"/>`guess-js`)](https://github.com/guess-js) uses analytics reports to build a predictive model that is used to [**smartly prefetch**](/web.dev/predictive-prefetching.md) only what the user is likely to need.

Both quicklink and Guess.js use the [<VPIcon icon="fa-brands fa-firefox"/>Network Information API](https://developer.mozilla.org/docs/Web/API/Network_Information_API) to avoid prefetching if a user is on a slow network or has [<VPIcon icon="fa-brands fa-firefox"/>`Save-Data`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Save-Data) turned on.

---

## Prefetch under the hood

Resource hints are not mandatory instructions and it's up to the browser to decide if, and when, they get executed.

You can use prefetch multiple times in the same page. The browser queues up all hints and requests each resource when it's [<VPIcon icon="fa-brands fa-firefox"/>idle](https://developer.mozilla.org/docs/Web/HTTP/Link_prefetching_FAQ#How_is_browser_idle_time_determined.3F). In Chrome, if a prefetch has not finished loading and the user navigates to the destined prefetch resource, the in-flight load is picked up as the navigation by the browser (other browser vendors might implement this differently).

Prefetching takes place at the [**'Lowest' priority**](/web.dev/fetch-priority.md#resource-priority), so prefetched resources don't compete for bandwidth with the resources required in the current page.

Prefetched files are stored in the [<VPIcon icon="fa-brands fa-firefox"/>HTTP Cache](https://developer.mozilla.org/docs/Web/HTTP/Caching) if the resource is cacheable, otherwise it will be discarded and not be used.

---

## Conclusion

Using `prefetch` can greatly improve web performance of a site by downloading future needed resources in advance. `prefetch` is supported in most modern browsers. This technique requires loading extra bytes that might not be used, so be mindful when you use it; only do it when necessary, and ideally, only on fast networks.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Prefetch resources to speed up future navigations",
  "desc": "Learn about rel=prefetch resource hint and how to use it.",
  "link": "https://chanhi2000.github.io/bookshelf/web.dev/link-prefetch.html",
  "logo": "https://gstatic.com/devrel-devsite/prod/v579073a50c63499824df5a68b8922367066583d283ef78fdade1028efdb4ceb5/web/images/touchicon-180.png",
  "background": "rgba(26,115,232,0.2)"
}
```
