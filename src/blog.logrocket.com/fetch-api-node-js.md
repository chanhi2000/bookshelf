---
lang: en-US
title: "The Fetch API is finally stable in Node.js"
description: "Article(s) > The Fetch API is finally stable in Node.js"
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
      content: "Article(s) > The Fetch API is finally stable in Node.js"
    - property: og:description
      content: "The Fetch API is finally stable in Node.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/fetch-api-node-js.html
prev: /programming/js-node/articles/README.md
date: 2023-11-01
isOriginal: false
author:
  - name: Elijah Asaolu
    url: https://blog.logrocket.com/author/asaoluelijah/
cover: /assets/image/blog.logrocket.com/fetch-api-node-js/banner.png
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
  name="The Fetch API is finally stable in Node.js"
  desc="Learn about the features and drawbacks of the Fetch AP, which is now natively available in Node.js version 21."
  url="https://blog.logrocket.com/fetch-api-node-js"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/fetch-api-node-js/banner.png"/>

::: note Editor's note

This article was last updated on 1 November 2023 to announce the official stable release of the Fetch API as of Node.js v21.

:::

The stabilization of the Node.js Fetch API has been one of the most anticipated upgrades in recent years. This advancement is crucial for developers because it provides a standardized and modern approach to perform HTTP requests in both the browser and server environments. To understand why this is such a big deal, let’s explore how Fetch came to be and what this new addition means for Node developers.

---

## The history of web requests

In the early days of the web, it was difficult to perform asynchronous requests across websites; developers had to use clumsy approaches to interact across multiple networks.

Internet Explorer 5 changed this in 1998 with the introduction of the `XMLHttpRequest` API. Initially, `XMLHttpRequest` was designed to fetch XML data via HTTP, hence the name. Sometime after it was released, however, support for other data formats — primarily JSON, HTML, and plaintext — was added.

The `XMLHttpRequest` API worked like a charm back then, but as the web grew, it became so difficult to work with that JavaScript frameworks, notably jQuery, had to abstract it to make implementation easier and success/error handling smoother.

---

## Introducing the Fetch API

In 2015, the Fetch API was launched as a modern successor to `XMLHttpRequest`, and it has subsequently become the de facto standard for [**making asynchronous calls in web applications**](/blog.logrocket.com/axios-vs-fetch-best-http-requests.md). One significant advantage Fetch has over `XMLHttpRequest` is that it leverages promises, allowing for a simpler and cleaner API while avoiding callback hell.

Though the Fetch API has been around for a while now, it wasn’t included in the Node.js core because of some limitations. In a [<VPIcon icon="fa-brands fa-y-combinator"/>question answered](https://news.ycombinator.com/item?id=30162332) by one of Node’s core contributors, it was noted that the browser’s Fetch API implementation is dependent on a browser-based Web Streams API and the `AbortController` interface (for aborting fetch requests), which wasn’t available in Node until recently. As such, it was difficult to choose the best approach to include it in the Node core.

Long before the addition of the Fetch API, the [request module (<VPIcon icon="fa-brands fa-npm"/>`request`)](https://npmjs.com/package/request) was the most popular method for making HTTP requests in Node. But the JavaScript ecosystem at large quickly evolved, and newly introduced patterns made request obsolete. A crucial example here is async/await; there was no provision for this in the request API, and the project was later deprecated due to these limitations.

### Undici

In 2018, [<VPIcon icon="fas fa-globe"/>Undici](https://undici.nodejs.org/#/) was introduced as a newer and faster HTTP/1.1 client for Node.js, with support for pipelining and pooling, among other features. The Node core team worked hard on Undici, fixing performance issues, guaranteeing stability, and aligning the library with the Node project’s goals.

Undici served as the foundation for Node.js’ native `fetch()` implementation, which provided a high-performance, standards-compliant solution for performing HTTP requests. With the integration of Undici into the Node core, developers obtained access to a strong and fast HTTP client, laying the foundation for the reliable Fetch API in Node.js v21 and later releases.

---

## The Fetch API finds stability in Node.js v21

The stable release of the Fetch API in Node.js v21 signifies a maturation of the Node.js ecosystem, offering developers a reliable and standardized tool for handling HTTP requests. This long-awaited release adds several improved features and benefits to the Fetch API, confirming its position as a reliable and standardized option for making HTTP requests in Node environments.

### Enhanced stability

The most notable feature of Node.js v21 is the stabilization of the Fetch API. Developers can now utilize this API with ease because it has been rigorously tested and refined to assure stability and dependability in a variety of usage scenarios.

### Improved compatibility

The stable release fixes compatibility issues that may have arisen in previous updates. The Fetch API in Node.js v21, with an emphasis on seamless integration, guarantees a consistent experience across multiple environments, making it a versatile solution for developers working on both client and server-side applications.

### Performance optimizations

The Fetch API has been optimized for speed in Node.js v21, increasing the efficiency of HTTP queries. This results in faster response times and better overall application performance, which is especially important for applications that handle a high amount of concurrent requests.

---

## Benefits of using the Fetch API in Node.js

The fact that the Fetch API now comes prepackaged as an inbuilt Node module is extremely beneficial to the developer community. Some of these benefits include:

### No extra fetch package

Inbuilt Fetch for Node.js might mean the end for packages like node-fetch, got, cross-fetch, and many others that were built for the same purpose. This means you won’t have to do an `npm install` before performing network operations in Node.

Furthermore, node-fetch, currently the most popular fetch package for Node.js, was recently switched to an ESM-only package. This means you’re unable to import it with the Node `require()` function. The native Fetch API will make HTTP fetching in Node environments feel much smoother and more natural.

### Cross-platform familiarity

Developers who have previously used the Fetch API on the frontend will feel right at home using the inbuilt `fetch()` method in Node. It’ll be much simpler and more intuitive than using external packages to achieve the same functionality in a Node environment.

### Faster implementation

As mentioned previously, the new Fetch implementation is also based on Undici, a fast, reliable, and spec-compliant HTTP client for Node.js. As a result, you should anticipate improved performance from the Fetch API as well.

### Code maintainability

The stability of the Fetch API in Node.js v21 helps to improve code maintainability. When developers use a standardized technique to generate HTTP requests, it becomes easier to manage and update codebases, promoting long-term stability and lowering the risk of errors.

---

## Drawbacks

The browser’s Fetch API has some drawbacks in and of itself, and these will undoubtedly be transferred to the new Node.js Fetch implementation:

### Lack of built-in progress events

The Node.js Fetch API does not have built-in support for progress events during file uploads or downloads. Developers who want fine-grained control over monitoring progress may find this limitation difficult to overcome and may need to look into alternative libraries or solutions.

### Limited support for older Node.js versions

While the Fetch API is stable in newer Node.js versions, projects using earlier Node.js versions may encounter compatibility difficulties. Developers working in environments where upgrading Node.js is not possible may be forced to rely on alternative libraries or develop workarounds.

### Complexity in handling cookies

The Fetch API’s approach to cookie management is based on browser behavior, which may result in unexpected outcomes in a Node.js environment. When dealing with cookies, developers must exercise caution and ensure accurate configuration for specific use cases.

---

## How to use the Fetch API

The Fetch API is provided as a high-level function, and in its most basic version, it takes a URL and produces a promise that resolves to the response:

```js
fetch("http://example.com/api/endpoint")
  .then((response) => {
    // Do something with response 
  }).catch(function (err) {
    console.log("Unable to fetch -", err);
  });
```

You may also change how the `fetch` process is carried out by appending an optional object after the URL, which allows you to change things like request methods, request headers, and other options. The request’s response is an object that contains the returned metadata for our request, which consists of elements like response data, headers, request date, and more.

---

## Migrating to the official, stable Fetch

Migrating to the official, stable Node.js Fetch API requires modifying your current codebase to utilize the native Fetch implementation. Follow these steps to migrate your code:

### Update Node.js version

Ensure that your Node.js version is at least v21 or higher. You can check your current Node.js version using the following command:

```sh
node -v
```

If your Node.js version is below v21, upgrade to the latest version. You can use a version manager like nvm (Node Version Manager) or download the latest version directly from the official Node.js website.

### Remove dependency on external libraries

If you were using an external library for making requests in Node.js, such as `node-fetch` or another custom HTTP library, you can remove those dependencies now that the stable Fetch API is available natively:

```sh
npm uninstall node-fetch
```

### Update code to use native Fetch

Replace any code that currently utilizes an external library with the native `fetch` implementation. Be careful to update the syntax and handle promises correctly.

::: tabs

@tab:active Before

```js
const fetch = require('node-fetch');

fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

@tab After

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

:::

### Adjust options and headers

As required, review and adjust any options or headers in your requests. The native Fetch API may differ in behavior or provide extra functionality, so consult the official documentation for any specific requirements.

### Testing and debugging

After you’ve made these changes, thoroughly test your application to check that the migration to the native Fetch API didn’t cause any problems. Take great care with error handling, timeouts, and any custom logic associated with HTTP requests.

---

## Conclusion

The stabilization of the Node.js Fetch API, made possible by the tireless efforts of the Node.js core team and the key role played by the high-performance HTTP client library Undici, represents a big step forward for developers.

This stable release offers several benefits including the ability to make HTTP requests in both browser and server environments. Using the Fetch API’s simplicity, versatility, and speed optimizations, developers can now enjoy a simplified and consistent experience.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Fetch API is finally stable in Node.js",
  "desc": "Learn about the features and drawbacks of the Fetch AP, which is now natively available in Node.js version 21.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/fetch-api-node-js.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
