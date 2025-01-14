---
lang: en-US
title: "Axios vs. fetch(): Which is best for making HTTP requests?"
description: "Article(s) > Axios vs. fetch(): Which is best for making HTTP requests?"
icon: iconfont icon-axios
category:
  - Node.js
  - Axios
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
      content: "Article(s) > Axios vs. fetch(): Which is best for making HTTP requests?"
    - property: og:description
      content: "Axios vs. fetch(): Which is best for making HTTP requests?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/axios-vs-fetch-best-http-requests.html
prev: /programming/js-axios/articles/README.md
date: 2024-11-21
isOriginal: false
author:
  - name: Faraz Kelhini
    url : https://blog.logrocket.com/author/farazkelhini/
cover: /assets/image/blog.logrocket.com/axios-vs-fetch-best-http-requests/banner.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Axios > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-axios/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Axios vs. fetch(): Which is best for making HTTP requests?"
  desc="Compare the Axios library and the fetch() API for HTTP requests, including error handling, CORS management, and response parsing."
  url="https://blog.logrocket.com/axios-vs-fetch-best-http-requests"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/axios-vs-fetch-best-http-requests/banner.jpg"/>

::: Editor’s note

This Axios vs. `fetch()` article was last reviewed and updated by [<FontIcon icon="fas fa-globe"/>Rosario De Chiara](https://blog.logrocket.com/author/rosariodechiara/) on 21 November 2024.

:::

---

## Is Axios better than `fetch()`?

![Axios Or Fetch(): Which Should You Use?](/assets/image/blog.logrocket.com/axios-vs-fetch-best-http-requests/banner.jpg)

In the article “[**How to make HTTP requests like a pro with Axios**](/blog.logrocket.com/http-requests-axios.md),” I discussed the benefits of using the Axios library.

However, Axios isn’t always the ideal solution for making HTTP requests. A popular alternative to Axios for handling HTTP/GET/POST/etc. requests in JavaScript is the native `fetch()` API. Understanding these technologies’ strengths, differences, and use cases is crucial for modern web development.

Here are some differences worth noting between the two solutions:

| Characteristic | `fetch()` API | Axios library |
| --- | --- | --- |
| Origin | Native JavaScript API | Third-party library |
| Installation | Natively available to browsers and Node.js v18+ | Requires npm install |
| JSON parsing (see code below) | Manual (need to use `.json()`) | Automatic |
| Error handling | Minimal (only network errors) | Comprehensive |
| Request interceptors | Not available (see [**this article to implement them in `fetch()`**](/blog.logrocket.com/intercepting-javascript-fetch-api-requests-responses.md)) | Available |
| Request cancellation (see code below) | Requires AbortController | Built-in method |
| Response transformation | Manual | Automatic |
| Platform support | Once browser-only but now available in Node.js v18+ | Browser and Node.js |

Some developers prefer Axios over built-in APIs for their ease of use. But many overestimate the need for such a library. The `fetch()` API is perfectly capable of reproducing the key features of Axios, and it has the added advantage of being readily available in all modern browsers.

In this article, we’ll compare `fetch()` and Axios to see how they can be used to perform different tasks. At the end of the article, you should have a better understanding of both APIs.

---

## Understanding the basic syntax of Axios and `fetch()`

Before we delve into more advanced features of Axios, let’s compare its basic syntax to `fetch()`.  
Here’s how you can use [**Axios to send a `POST` request**](/blog.logrocket.com/how-to-use-axios-post-requests.md) with custom headers to a URL. Axios automatically converts the data to JSON, so you don’t have to:

```js
// axios
const url = 'https://jsonplaceholder.typicode.com/posts'
const data = {
  a: 10,
  b: 20,
};
axios
  .post(url, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  })
  .then(({data}) => {
    console.log(data);
  });
```

Now compare this code to the `fetch()` version, which produces the same result:

```js
// fetch()

const url = "https://jsonplaceholder.typicode.com/todos";
const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify({
    a: 10,
    b: 20,
  }),
};
fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

Notice that:

- To send data, `fetch()` uses the `body` property for a post request to send data to the endpoint, while Axios uses the `data` property
- The data in `fetch()` is transformed into a string using the `JSON.stringify` method
- Axios automatically transforms the data returned from the server, but with `fetch()` you have to call the [<FontIcon icon="fa-brands fa-firefox"/>`response.json` method to parse the data to a JavaScript object](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)
- With Axios, the data response provided by the server can be accessed within the [data object (<FontIcon icon="iconfont icon-github"/>`axios/axios`)](https://github.com/axios/axios#response-schema), while for the `fetch()` method, the final data can be named any variable
- Axios and `fetch()` handle headers in the same way

---

## Backward compatibility

One of the main selling points of Axios is its wide browser support. Even old browsers like IE11 can run Axios without any issues. This is because it uses [<FontIcon icon="fa-brands fa-firefox"/>`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) under the hood. `fetch()`, on the other hand, only supports Chrome 42+, Firefox 39+, Edge 14+, and Safari 10.1+ (you can see the full compatibility table on [<FontIcon icon="fas fa-globe"/>CanIUse.com](https://caniuse.com/fetch)).

If your only reason for using Axios is backward compatibility, you don’t need an HTTP library. Instead, you can [use `fetch()` with a polyfill (<FontIcon icon="iconfont icon-github"/>`JakeChampion/fetch`)](https://github.com/JakeChampion/fetch) to implement similar functionality on web browsers that don’t support `fetch()`.

To use the `fetch()` polyfill, install it via the npm command like so:

```sh
npm install whatwg-fetch --save
```

Then, you can make requests like this:

```js
import 'whatwg-fetch'
window.fetch(...)
```

Keep in mind that you might also need a promise polyfill in some old browsers.

---

## Response timeouts in Axios vs. `fetch()`

The simplicity of setting a timeout in Axios is one of the reasons some developers prefer it to `fetch()`. In Axios, you can use the optional `timeout` property in the config object to set the number of milliseconds before the request is aborted.

Here’s an example:

```js
axios({
  method: 'post',
  url: '/login',
  timeout: 4000,    // 4 seconds timeout
  data: {
    firstName: 'David',
    lastName: 'Pollock'
  }
}).then(response => {
  /* handle the response */
}).catch(error => console.error('timeout exceeded'))
```

`fetch()` provides similar functionality through the `AbortController` interface. However, it’s not as simple as the Axios version:

```js
const controller = new AbortController();
const options = {
  method: 'POST',
  signal: controller.signal,
  body: JSON.stringify({
    firstName: 'David',
    lastName: 'Pollock'
  })
};  
const promise = fetch('/login', options);
const timeoutId = setTimeout(() => controller.abort(), 4000);

promise.then(response => {
  /* handle the response */
}).catch(error => console.error('timeout exceeded'));
```

Here, we created an `AbortController` object using the `AbortController.abort()` constructor, which allows us to abort the request later. `Signal` is a read-only property of `AbortController`, providing a means to communicate with a request or abort it. If the server doesn’t respond in less than four seconds, `controller.abort()` is called, and the operation is terminated.

---

## Automatic JSON data transformation

As we saw earlier, Axios automatically stringifies the data when sending requests (though you can override the default behavior and define a different transformation mechanism). When using `fetch()`, however, you’d have to do it manually.

Compare the two below:

```js
// axios
axios.get('https://api.github.com/orgs/axios')
  .then(response => {
    console.log(response.data);
  }, error => {
    console.log(error);
  });

// fetch()
fetch('https://api.github.com/orgs/axios')
  .then(response => response.json())    // one extra step
  .then(data => {
    console.log(data) 
  })
  .catch(error => console.error(error));
```

Automatic data transformation is a nice feature, but again, it’s not something you can’t do with `fetch()`.

---

## HTTP interceptors

One of Axios’s key features is its ability to intercept HTTP requests. HTTP interceptors come in handy when you need to examine or change HTTP requests from your application to the server or vice versa (e.g., logging, authentication, or retrying a failed HTTP request).

With interceptors, you won’t have to write separate code for each HTTP request. HTTP interceptors are helpful when you want to set a global strategy for how you handle requests and responses.

Here’s how you can declare a request interceptor in Axios:

```js
axios.interceptors.request.use(config => {
  // log a message before any HTTP request is sent
  console.log('Request was sent');

  return config;
});

// sent a GET request
axios.get('https://api.github.com/users/sideshowbarker')
  .then(response => {
    console.log(response.data);
  });
```

In this code, the `axios.interceptors.request.use()` method is used to define code to be run before an HTTP request is sent. Also, `axios.interceptors.response.use()` can be used to intercept the response from the server. Let’s say there is a network error; using the response interceptors, you can retry that same request using interceptors.

By default, `fetch()` doesn’t provide a way to intercept requests, but it’s not hard to come up with a workaround. You can overwrite the global `fetch()` method and define your interceptor, like this:

```js
fetch = (originalFetch => {
  return (...arguments) => {
    const result = originalFetch.apply(this, arguments);
    return result.then(console.log('Request was sent'));
  };
})(fetch);

fetch('https://api.github.com/orgs/axios')
  .then(response => response.json())
  .then(data => {
    console.log(data)
  });
```

---

## Download progress with Axios vs. `fetch()`

Progress indicators are very useful when loading large assets, especially for users with slow internet. Previously, JavaScript programmers used the `XMLHttpRequest.onprogress` callback handler to implement progress indicators.

The [**Fetch API**](https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/#:~:text=these%20alternative%20implementations.-,Using%20the%20Fetch%20API,-I%E2%80%99ve%20used%20Fetch) doesn’t have an `onprogress` handler. Instead, it provides an instance of `ReadableStream` via the body property of the response object.
<!-- END: /blog.logrocket.com/patterns-for-data-fetching-in-react.md -->

The following example illustrates the use of `ReadableStream` to provide users with immediate feedback during image download:

```html title="index.html"
<!-- Wherever you html is -->
<div id="progress" src="">progress</div>
<img id="img">
```

```js :collapsed-lines title="script.js"
'use strict'
const element = document.getElementById('progress');
fetch('https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg')
  .then(response => {
    if (!response.ok) {
      throw Error(response.status + ' ' + response.statusText)
    }
    // ensure ReadableStream is supported
    if (!response.body) {
      throw Error('ReadableStream not yet supported in this browser.')
    }
    // store the size of the entity-body, in bytes
    const contentLength = response.headers.get('content-length');
    // ensure contentLength is available
    if (!contentLength) {
      throw Error('Content-Length response header unavailable');
    }
    // parse the integer into a base-10 number
    const total = parseInt(contentLength, 10);
    let loaded = 0;
    return new Response(
      // create and return a readable stream
      new ReadableStream({
        start(controller) {
          const reader = response.body.getReader();
          read();
          function read() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              loaded += value.byteLength;
              progress({ loaded, total })
              controller.enqueue(value);
              read();
            }).catch(error => {
              console.error(error);
              controller.error(error)
            })
          }
        }
      })
    );
  }).then(response =>
    // construct a blob from the data
    response.blob()
  ).then(data => {
    // insert the downloaded image into the page
    document.getElementById('img').src = URL.createObjectURL(data);
  }).catch(error => {
    console.error(error);
  });

function progress({ loaded, total }) {
  element.innerHTML = Math.round(loaded / total * 100) + '%';
}
```

Implementing a progress indicator in Axios is simpler, especially if you use the [Axios Progress Bar (<FontIcon icon="iconfont icon-github"/>`rikmms/progress-bar-4-axios`)](https://github.com/rikmms/progress-bar-4-axios/) module. First, you need to include the following style and scripts:

```html title="index.html"
<!-- the head of your HTML -->
<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/nprogress.css" />
<!-- the body of your HTML -->
<img id="img" />
<button onclick="downloadFile()">Get Resource</button>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/index.js"></script>

<!-- add the following to customize the style -->
<style>
#nprogress .bar {
  background: red !important;
}
#nprogress .peg {
  box-shadow: 0 0 10px red, 0 0 5px red !important;
}
#nprogress .spinner-icon {
  border-top-color: red !important;
  border-left-color: red !important;
}
</style>
```

Then you can implement the progress bar like this:
  
```html
<script type="text/javascript">
  loadProgressBar();
  
  function downloadFile() {
    getRequest(
      "https://fetch-progress.anthum.com/30kbps/images/sunrise-baseline.jpg"
    );
  }
  
  function getRequest(url) {
    axios
      .get(url, { responseType: "blob" })
      .then(function (response) {
        const reader = new window.FileReader();
        reader.readAsDataURL(response.data);
        reader.onload = () => {
          document.getElementById("img").setAttribute("src", reader.result);
        };
      })
      .catch(function (error) {
        console.log(error);
      });
  }    
</script>
```

This code uses the `FileReader` API to asynchronously read the downloaded image. The `readAsDataURL` method returns the image’s data as a Base64-encoded string, which is then inserted into the `src` attribute of the `img` tag to display the image.

---

## Making simultaneous requests

To make multiple, simultaneous requests, Axios provides the `axios.all()` method. Simply pass an array of requests to this method, then use `axios.spread()` to assign the properties of the response array to separate variables:

```js
axios.all([
  axios.get('https://api.github.com/users/iliakan'),
  axios.get('https://api.github.com/users/taylorotwell')
]).then(axios.spread((obj1, obj2) => {
  // Both requests are now complete
  console.log(obj1.data.login + ' has ' + obj1.data.public_repos + ' public repos on GitHub');
  console.log(obj2.data.login + ' has ' + obj2.data.public_repos + ' public repos on GitHub');
}));
```

You can achieve the same result by using the built-in `Promise.all()` method. Pass all fetch requests as an array to `Promise.all()`. Next, handle the response by using an `async` function, like this:

```js
Promise.all([
  fetch('https://api.github.com/users/iliakan'),
  fetch('https://api.github.com/users/taylorotwell')
]).then(async ([res1, res2]) => {
  const a = await res1.json();
  const b = await res2.json();
  console.log(a.login + ' has ' + a.public_repos + ' public repos on GitHub');
  console.log(b.login + ' has ' + b.public_repos + ' public repos on GitHub');
}).catch(error => {
  console.log(error);
});
```

---

## How to configure CORS

[**Cross-Origin Resource Sharing (CORS)**](/blog.logrocket.com/the-ultimate-guide-to-enabling-cross-origin-resource-sharing-cors.md) is a mechanism available in HTTP to enable a server to permit the loading of its resources from any origins other than itself. For example, you need CORS when you want to pull data from external APIs that are public or authorized.

If the CORS mechanism is not properly enabled on the server, any request from a different server — regardless of whether or not it is made with Axios or `fetch()` — will receive the `No Access-Control-Header-Present` error.

To properly handle CORS, the first step is to configure the server, which depends on your environment/server. Once the server has been properly configured, it will automatically include the `Access-Control-Allow-Origin` header in response to all requests ([<FontIcon icon="fa-brands fa-firefox"/>see the documentation for more information](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin)).

A common error, in both Axios and `fetch()`, is to add the `Access-Control-Allow-Origin` to the request — this is a response parameter and is used by the server to specify the permitted access control for the origin.

Another aspect to be aware of, when you add the headers to your Axios request, is that the request is handled differently: the browser performs a preflight request before the actual request and this preflight request is an [<FontIcon icon="fa-brands fa-firefox"/>`OPTIONS`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) request that verifies if CORS is honored and if the actual request is safe to send the real request.

---

## Effectively handling responses

Response management is a critical part of every application invoking an API. In this section, we will briefly look at the two aspects of it: getting the error code and manipulating response data.

Error management is different in Axios and `fetch()`. Specifically, `fetch()` doesn’t automatically reject the `promise` in the event of server-side errors, such as HTTP 404 or 500 status codes. This means that these errors don’t trigger the `.catch()` block, unlike in Axios where such responses would typically be considered exceptions.

Instead, `fetch()` will resolve the `promise` normally with the `ok` status in the response set to `false`. The call to `fetch()` will only fail on network failures or if anything has prevented the request from completing.

In the following code, you can see how to handle errors in `fetch()`:

```js
try {
  const res = await fetch('...');

  if (!res.ok) {
    // Error on the response (5xx, 4xx)
    switch (res.status) {
      case 400: /* Handle */ break;
      case 401: /* Handle */ break;
      case 404: /* Handle */ break;
      case 500: /* Handle */ break;
    }
  }

  // Here the response can be properly handled
} catch (err) {
  // Error on the request (Network error)
}
```

Meanwhile, in Axios, you can discriminate all errors in a proper `catch` block as shown in the following example:

```js
try {
  let res = await axios.get('...');
  // Here the response can be properly handled
} catch (err) {
  if (err.response) {
    // Error on the response (5xx, 4xx)
  } else if (err.request) {
    // Error on the request (Network error)
  }
}
```

Once the request has been served with a proper response without any errors, you can handle the response payload that will be accessible by using two different mechanisms.

In `fetch()`, the request/response payload is accessible in the `body` field and must be stringified, while in Axios it is in the `data` field as a proper JavaScript object. This difference is captured in the following, stripped-down examples:

```js
 // Using Fetch API
fetch('...')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


// Using Axios
axios.get('...')
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));
```

The key difference in `fetch()` lies in the use of the `.json()` method. Despite the name, this method does not produce JSON but instead, it will take JSON as an input and parse it to produce a JavaScript object.

---

## Conclusion

Axios provides an easy-to-use API in a compact package for most HTTP communication needs. However, if you prefer to stick with native APIs, nothing is stopping you from implementing Axios features.

As discussed in this article, it’s possible to reproduce the key features of the Axios library using the `fetch()` method provided by web browsers. Whether it’s worth loading a client HTTP API depends on whether you’re comfortable working with built-in APIs.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Axios vs. fetch(): Which is best for making HTTP requests?",
  "desc": "Compare the Axios library and the fetch() API for HTTP requests, including error handling, CORS management, and response parsing.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/axios-vs-fetch-best-http-requests.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
