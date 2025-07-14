---
lang: en-US
title: "Intercepting JavaScript Fetch API requests and responses"
description: "Article(s) > Intercepting JavaScript Fetch API requests and responses"
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
  - axios
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Intercepting JavaScript Fetch API requests and responses"
    - property: og:description
      content: "Intercepting JavaScript Fetch API requests and responses"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/intercepting-javascript-fetch-api-requests-responses.html
prev: /programming/js-node/articles/README.md
date: 2022-02-08
isOriginal: false
author:
  - name: Indermohan Singh
    url : https://blog.logrocket.com/author/indermohansingh/
cover: /assets/image/blog.logrocket.com/intercepting-javascript-fetch-api-requests/banner.png
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
  name="Intercepting JavaScript Fetch API requests and responses"
  desc="We demonstrate intercepting JavaScript Fetch API calls using monkey patching and the fetch-intercept library."
  url="https://blog.logrocket.com/intercepting-javascript-fetch-api-requests-responses"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/intercepting-javascript-fetch-api-requests/banner.png"/>

Interceptors are code blocks that you can use to preprocess or post-process HTTP calls, helping with global error handling, authentication, logging, and more.In this article, you’ll learn how to [**intercept JavaScript Fetch API calls**](/blog.logrocket.com/axios-vs-fetch-best-http-requests.md).

![JavaScript Intercept Fetch API Responses](/assets/image/blog.logrocket.com/intercepting-javascript-fetch-api-requests/banner.png)

There are two types of events for which you may want to intercept HTTP calls, request and response events. The request interceptor should be executed before the actual HTTP request is sent, whereas the response interceptor should be executed before it reaches the application code that made the call.

Before diving into the code, we need to understand a few important factors. For one, the [<FontIcon icon="fa-brands fa-firefox"/>Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) doesn’t support interceptors natively. Additionally, extra packages are required to [use the Fetch API in Node.js](#node).

---

## The JavaScript Fetch API

First, let’s cover some fundamentals of the Fetch API, for example, the syntax:

```js
const fetchResponsePromise = fetch(resource [, init])
```

`resource` defines the resource you want to fetch, which can be either a [<FontIcon icon="fa-brands fa-firefox"/>`Request`object](https://developer.mozilla.org/en-US/docs/Web/API/Request)) or a URL. `init` is an optional object that will contain any custom configuration you want to apply to this particular request.

The Fetch API is promise-based. Therefore, when you call the Fetch method, you’ll get a response promise back. Here, it is referred to as `fetchResponsePromise`, as seen in the example above.

By default, Fetch uses the `GET` method for API calls, as shown below:

```js
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((json) => console.log(json));
```

Below is an example of a `POST` request with Fetch:

```js
fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  body: JSON.stringify({
    completed: false,
    id: 1,
    title: 'New Todo',
    userId: 1,
  }),
  headers: new Headers({
    'Content-Type': 'application/json; charset=UTF-8',
  }),
})
.then((response) => response.json())
.then((json) => console.log(json));
```

The `POST` call must have a `body`. Take a look at the [<FontIcon icon="fa-brands fa-firefox"/>Fetch documentation](https://developer.mozilla.org/en-US/docs/Web/API/fetch) for more details.

---

## Implementing interceptors

There are two ways to add interceptors to our Fetch API calls; we can either use monkey patching or the [<FontIcon icon="iconfont icon-github"/>`werk85/fetch-intercept`](https://github.com/werk85/fetch-intercept).

---

## Monkey patching with Fetch

One way to create an interceptor for any JavaScript function or method is to monkey patch it. Monkey patching is an approach to override the original functionality with your version of the function.

Let’s take a step-by-step look at how you can create an interceptor for the Fetch API with monkey patching:

```js
const { fetch: originalFetch } = window;

window.fetch = async (...args) => {
  let [resource, config ] = args;
  // request interceptor here
  const response = await originalFetch(resource, config);
  // response interceptor here
  return response;
};
```

The code above overrides the original Fetch method with a custom implementation and calls the original Fetch method inside it. You’ll use this boilerplate code to create request and response interceptors.

### Request interceptor

In the following example, we’ll create a simple request interceptor that changes the resource URL of an illustration:

```js
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
  let [resource, config ] = args;

  // request interceptor starts
  resource = 'https://jsonplaceholder.typicode.com/todos/2';
  // request interceptor ends

  const response = await originalFetch(resource, config);

  // response interceptor here
  return response;
};


fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((json) => console.log(json));
//
// {
//   "userId": 1,
//   "id": 2,
//   "title": "quis ut nam facilis et officia qui",
//   "completed": false
// }
```

This API call would fetch data from `https://jsonplaceholder.typicode.com/todos/2` instead of `https://jsonplaceholder.typicode.com/todos/1`, as shown by the ID `2` of the `todo`.

::: note

One of the most common use cases for request interceptors is to change the headers for authentication.

:::

### Response interceptor

The response interceptor would intercept the API response before it is delivered to the actual caller. Let’s take a look at the following code:

```js
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
  let [resource, config] = args;

  let response = await originalFetch(resource, config);

  // response interceptor
  const json = () =>
    response
      .clone()
      .json()
      .then((data) => ({ ...data, title: `Intercepted: ${data.title}` }));

  response.json = json;
  return response;
};

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((json) => console.log(json));
//
// {
//     "userId": 1,
//     "id": 1,
//     "title": "Intercepted: delectus aut autem",
//     "completed": false
// }
```

In the code above, we changed the JSON method to return some custom data instead of the original data. Check out the documentation to learn more about the [<FontIcon icon="fa-brands fa-firefox"/>properties that you can change](https://developer.mozilla.org/en-US/docs/Web/API/Response).

::: note

Responses are only allowed to be consumed once. Therefore, you need to [<FontIcon icon="fa-brands fa-firefox"/>clone the response](https://developer.mozilla.org/en-US/docs/Web/API/Response/clone) each time you want to use it.

:::

### Handling errors

You can easily handle errors for requests by checking the values for `response.ok` and `response.status`. In the code snippet below, you can intercept `404` errors:

```js
const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
  let [resource, config] = args;
  let response = await originalFetch(resource, config);
  if (!response.ok && response.status === 404) {
    // 404 error handling
    return Promise.reject(response);
  }
  return response;
};

fetch('https://jsonplaceholder.typicode.com/todos/1000000')
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((error) => console.error(error));
```

### Node.js

You can use the same approach in Node.js. However, Node.js doesn’t support the Fetch API natively (though native support for the Fetch API will be [available in future versions of Node.js (<FontIcon icon="iconfont icon-github"/>`nodejs/node`)](https://github.com/nodejs/node/pull/41749)). For now, you need to install the [<FontIcon icon="iconfont icon-github"/>`node-fetch/node-fetch`](https://github.com/node-fetch/node-fetch) package, then monkey patch the `fetch` method.

---

## Using fetch-intercept library

If you’re not a fan of doing the `dirty` work (pun intended), the [<FontIcon icon="iconfont icon-github"/>`werk85/fetch-intercept`](https://github.com/werk85/fetch-intercept) library allows you to register interceptors with a cleaner API. You can use npm or Yarn to install the library as follows:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn install fetch-intercept whatwg-fetch
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```js
npm install fetch-intercept whatwg-fetch --save
```

:::

::: note

The fetch-intercept library only supports browsers and won’t work in Node.js. Also, it requires [<FontIcon icon="iconfont icon-github"/>`whatwg/fetch`](https://github.com/whatwg/fetch) as dependency to work.

:::

With the code below, we can implement the same request and response interceptors as in our monkey patching example:

```js :collapsed-lines
import * as fetchIntercept from 'fetch-intercept';

const unregister = fetchIntercept.register({
  request: function (url, config) {
    const modifiedUrl = `https://jsonplaceholder.typicode.com/todos/2`;
    return [modifiedUrl, config];
  },

  requestError: function (error) {
    return Promise.reject(error);
  },

  response: function (response) {
    const clonedResponse = response.clone();
    const json = () =>
      clonedResponse
        .json()
        .then((data) => ({ ...data, title: `Intercepted: ${data.title}` }));

    response.json = json;
    return response;
  },

  responseError: function (error) {
    return Promise.reject(error);
  },
});

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then((response) => response.json())
  .then((json) => console.log(json));

// unregister interceptors
unregister();
```

The `register` method allows you to register the interceptors for Fetch API calls. It takes an object with the `request`, `requestError`, `response`, and `responseError` callbacks. The `register` method returns another method that can be used to unregister the interceptors.

The Fetch API doesn’t support interceptors natively. However, there are other libraries for making HTTP calls that support interceptors. Take a look at [<FontIcon icon="fas fa-globe"/>Axios](https://axios-http.com/docs/interceptors), which provides this functionality out of the box.

---

## Summary

In this article, we covered what JavaScript interceptors are, learning how to create interceptors both by monkey patching the Fetch API and using the fetch-intercept library.

Originally introduced by Angular, interceptors are helpful for a wide variety of use cases, like helping with global error handling, authentication, logging, and more. You can use the methods described in this article to add interceptors to your JavaScript applications, however, keep in mind the additional required dependencies for Node.js.

I hope you enjoyed this article, be sure to leave a comment if you have any questions. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Intercepting JavaScript Fetch API requests and responses",
  "desc": "We demonstrate intercepting JavaScript Fetch API calls using monkey patching and the fetch-intercept library.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/intercepting-javascript-fetch-api-requests-responses.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
