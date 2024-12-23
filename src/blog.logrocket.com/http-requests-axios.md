---
lang: en-US
title: "How to make HTTP requests with Axios"
description: "Article(s) > How to make HTTP requests with Axios"
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
      content: "Article(s) > How to make HTTP requests with Axios"
    - property: og:description
      content: "How to make HTTP requests with Axios"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/http-requests-axios.html
prev: /programming/py-django/articles/README.md
date: 2024-11-27
isOriginal: false
author:
  - name: Faraz Kelhini
    url: https://blog.logrocket.com/author/farazkelhini
cover: /assets/image/blog.logrocket.com/http-requests-axios/banner.png
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
  name="How to make HTTP requests with Axios"
  desc="Learn how to make HTTP requests with Axios, from POST requests to Axios interceptors, using examples for efficient API communication."
  url="https://blog.logrocket.com/http-requests-axios"
  logo="/images/asset/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/http-requests-axios/banner.png"/>

::: note Editor's note

This article was last updated by [<FontIcon icon="fas fa-globe"/>Rahul Chhodde](https://blog.logrocket.com/author/rahulchhodde/) on 27 November 2024 to introduce Axios interceptors and how to use them to handle API error responses, as well as to cover how to post a file from a form using Axios.

:::

Axios is a client HTTP API based on the `XMLHttpRequest` interface provided by browsers. In this tutorial, we’ll demonstrate how to make HTTP requests using Axios with clear examples, including how to make an Axios POST request with `axios.post()`, how to send multiple requests simultaneously with `Promise.all`, and much more.

If you’re more of a visual learner, check out the video tutorial below. Note that it is a few years old and may not reflect the most current information:

---

## Why use Axios?

The most common way for frontend programs to communicate with servers is through the HTTP protocol. You are probably familiar with the [**Fetch API**](/blog.logrocket.com/fetch-api-node-js.md) and the `XMLHttpRequest` interface, which allows you to fetch resources and make HTTP requests.

If you’re using a JavaScript library, chances are it comes with a client HTTP API. [**jQuery’s**](/blog.logrocket.com/the-history-and-legacy-of-jquery.md) `$.ajax()` function, for example, has been particularly popular with frontend developers. But as developers move away from such libraries in favor of native APIs, dedicated HTTP clients have emerged to fill the gap.

As with Fetch, Axios is promise-based. However, it provides a more powerful and flexible feature set. Why use Axios over the native Fetch API?

- Request and response interception
- Streamlined error handling
- Protection against XSRF
- Support for upload progress
- Support for older browsers
- Automatic JSON data transformation

---

## Installing Axios

You can install Axios using the following command for npm, Yarn, and pnpm, respectively:

```sh
npm install axios
yarn add axios
pnpm add axios
```

To install Axios using a content delivery network (CDN), run the following:

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

---

## How to make an Axios POST request

Making an HTTP request is as easy as passing a config object to the `axios` function. You can make a POST request using Axios to “post” data to a given endpoint and trigger events. To perform an HTTP POST request in Axios, call `axios.post()`.

Making a POST request in Axios requires two parameters: the URI of the service endpoint and an object that contains the properties you wish to send to the server.

For a simple Axios POST request, the config object must have a `url` property. If no method is provided, `GET` will be used as the default value.

Let’s look at a simple Axios POST example:

```js
// send a POST request
axios({
  method: 'post',
  url: '/login',
  data: { 
    firstName: 'Finn',
    lastName: 'Williams'
  }
});
```

This should look familiar to those who have worked with jQuery’s `$.ajax` function. This code instructs Axios to send a POST request to `/login` with an object of key-value pairs as its data. Axios will automatically convert the data to JSON and send it as the request body.

---

## Shorthand methods for Axios HTTP requests

Axios also provides a set of shorthand methods for performing different types of requests. The methods include:

- `axios.request(config)`
- `axios.get(url[, config])`
- `axios.delete(url[, config])`
- `axios.head(url[, config])`
- `axios.options(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.patch(url[, data[, config]])`

For example, the following code shows how the previous example could be written using the `axios.post()` method:

```js
axios.post('/login', {
  firstName: 'Finn',
  lastName: 'Williams'
});
```

---

## What does `axios.post` return?

Once an HTTP POST request is made, Axios returns a promise that is either fulfilled or rejected, depending on the response from the backend service.

To handle the result, you can use the `then()` method, like this:

axios.post('/login', { firstName: 'Finn', lastName: 'Williams' }) .then((response) => { console.log(response); }, (error) => { console.log(error); });

If the promise is fulfilled, the first argument of `then()` will be called; if the promise is rejected, the second argument will be called. According to the [Axios documentation (<FontIcon icon="fa-brands fa-npm"/>`axios`)](https://npmjs.com/package/axios#response-schema), the fulfillment value is an object containing the following properties:

```js
{ 
  // `data` is the response that was provided by the server
  data: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  // `headers` the headers that the server responded with 
  // All header names are lower cased
  headers: {},

  // `config` is the config that was provided to `axios` for the request
  config: {}, 
  // `request` is the request that generated this response 
  // It is the last ClientRequest instance in node.js (in redirects) 
  // and an XMLHttpRequest instance the browser
  request: {} 
}
```

As an example, here’s how the response looks when requesting data from the GitHub API:

```js
axios.get('https://api.github.com/users/mapbox')
  .then((response) => {
    console.log(response.data); 
    console.log(response.status); 
    console.log(response.statusText); 
    console.log(response.headers); 
    console.log(response.config);
  }); 
//
// => {login: "mapbox", id: 600935, node_id: "MDEyOk9yZ2FuaXphdGlvbjYwMDkzNQ==", avatar_url: "https://avatars1.githubusercontent.com/u/600935?v=4", gravatar_id: "", …} 
// => 200 
// => OK 
// => {x-ratelimit-limit: "60", x-github-media-type: "github.v3", x-ratelimit-remaining: "60", last-modified: "Wed, 01 Aug 2018 02:50:03 GMT", etag: "W/"3062389570cc468e0b474db27046e8c9"", …}
// => {adapter: ƒ, transformRequest: {…}, transformResponse: {…}, timeout: 0, xsrfCookieName: "XSRF-TOKEN", …}
```

---

## Using Axios with `async` and `await`

The `async` and `await` syntax is syntactic sugar around the Promise API. It helps you write cleaner, more readable, and maintainable code. With `async` and `await`, your codebase feels synchronous and easier to think about.

When using `async` and `await`, you invoke `axios` or one of its request methods inside an asynchronous function, like in the example below:

```js
const fetchData = async () => {
  try {
    const response = await axios.get("https://api.github.com/users/mapbox"); 
    console.log(response.data); 
    console.log(response.status); 
    console.log(response.statusText); 
    console.log(response.headers); 
    console.log(response.config);
  } catch (error) { 
    // Handle error console.error(error); 
  }
};

fetchData();
```

When using the `async` and `await` syntax, it’s standard practice to wrap your code in a `try...catch` block. Doing so will ensure you appropriately handle errors and provide feedback for a better user experience.

---

## Using `Promise.all` to send multiple requests

You can use Axios with `Promise.all` to make multiple requests in parallel by passing an iterable of promises to it. The `Promise.all` static method returns a single promise object that fulfills only when all input promises have been fulfilled.

Here’s a simple example of how to use `Promise.all` to make simultaneous HTTP requests:

```js
// execute simultaneous requests
Promise.all([
  axios.get("https://api.github.com/users/mapbox"),
  axios.get("https://api.github.com/users/phantomjs"),
]).then(([user1, user2]) => { 
  //this will be executed only when all requests are complete 
  console.log("Date created: ", user1.data.created_at); 
  console.log("Date created: ", user2.data.created_at); 
});
//
// => Date created:  2011-02-04T19:02:13Z 
// => Date created:  2017-04-03T17:25:46Z
```

This code makes two requests to the GitHub API and then logs the value of the `created_at` property of each response to the console. Keep in mind that if any of the input promises are rejected, the entire promise will immediately be rejected, returning the error from the first promise that encountered a rejection.

---

## Sending custom headers with Axios

Sending custom headers with Axios is straightforward. Simply pass an object containing the headers as the last argument. For example:

```js
const options = {
  headers: {'X-Custom-Header': 'value'}
};

axios.post('/save', { a: 10 }, options);
```

---

## Axios timeout settings

When making a network request to a server, it is not uncommon to experience delays when the server takes too long to respond. It is standard practice to timeout an operation and provide an appropriate error message if a response takes too long. This ensures a better user experience when the server is experiencing downtime or a higher load than usual.

With Axios, you can use the `timeout` property of your `config` object to set the waiting time before timing out a network request. Its value is the waiting duration in milliseconds. The request is aborted if Axios doesn’t receive a response within the timeout duration. The default value of the `timeout` property is `0` milliseconds (no timeout).

You can check for the `ECONNABORTED` error code and take appropriate action when the request times out:

```js
axios({ 
  baseURL: "https://jsonplaceholder.typicode.com", 
  url: "/todos/1", 
  method: "get", 
  timeout: 2000,
}).then((response) => {
  console.log(response.data);
}).catch((error) => {
  if (error.code === "ECONNABORTED") {
    console.log("Request timed out");
  } else {
    console.log(error.message);
  }
});
```

You can also timeout a network request using the `AbortSignal.timeout` static method. It takes the timeout as an argument in milliseconds and returns an `AbortSignal` instance. You need to set it as the value of the `signal` property.

The network request aborts when the timeout expires. Axios sets the value of `error.code` to `ERR_CANCELED` and `error.message` to `canceled`:

```js
const abortSignal = AbortSignal.timeout(200);

axios({ baseURL: "https://jsonplaceholder.typicode.com", 
  url: "/todos/1", 
  method: "get", 
  signal: abortSignal, 
}).then((response) => {
  console.log(response.data);
}).catch((error) => {
  if (error.code === "ERR_CANCELED" && abortSignal.aborted) {
    console.log("Request timed out");
  } else {
    console.log(error.message);
  }
});
```

---

## POST JSON with Axios

Axios automatically serializes JavaScript objects to JSON when passed to the `axios.post` function as the second parameter. This eliminates the need to serialize POST bodies to JSON.

Axios also sets the `Content-Type` header to `application/json`. This enables web frameworks to automatically parse the data:

```js
// A sample JavaScript object to be sent using Axios
const data = {
  name: 'Jane',
  age: 30
};

// The `data` object will be automatically converted to JSON
axios.post('/api/users', data);

```

If you want to send a preserialized JSON string to `axios.post()` JSON, you’ll need to make sure the `Content-Type` header is set:

```js
// A pre-serialized JSON string
const jsonData = JSON.stringify({
  name: 'John',
  age: 33 
}); 

// Need to manually set Content-Type here
axios.post('/api/users', jsonData, {
  headers: { 
    'Content-Type': 'application/json'
  }
});
```

---

## Transforming requests and responses

Although Axios automatically converts requests and responses to JSON by default, it also allows you to override the default behavior and define a different transformation mechanism. This is particularly useful when working with an API that accepts only a specific data format, such as XML or CSV.

To change request data before sending it to the server, set the `transformRequest` property in the config object. Note that this method only works for `PUT`, `POST`, `DELETE`, and `PATCH` request methods.

Here’s an example of how to use `transformRequest` in Axios to transform JSON data into XML data and post it:

```js
const options = {
  method: 'post',
  url: '/login',
  data: {
    firstName: 'Finn',
    lastName: 'Williams'
  },
  transformRequest: [(data, headers) => { 
    // Convert to XML
    const xmlData = `
    <?xml version="1.0" encoding="UTF-8"?>
      <user>
      <firstName>${data.firstName}</firstName>
      <lastName>${data.lastName}</lastName>
    </user>`; 
    
    // Set the Content-Type header to XML
    headers['Content-Type'] = 'application/xml';
    
    return xmlData; 
  }]
}; // send the request axios(options);
```

To modify the data before passing it to `then()` or `catch()`, you can set the `transformResponse` property. Leveraging both the `transformRequest` and `transformResponse`, here’s an example that transforms JSON data to CSV, posts it, and then turns the received response into JSON to use on the client:

```js
const options = {
  method: 'post',
  url: '/login',
  data: {
    firstName: 'Finn',
    lastName: 'Williams'
  },
  transformRequest: [(data, headers) => { 
    // Convert to CSV
    const csvData = `firstName,lastName\n${data.firstName},${data.lastName}`;
    
    // Set the Content-Type header to CSV
    headers['Content-Type'] = 'text/csv';
    
    return csvData;
  }],
  transformResponse: [(data) => {
    // If server responds with CSV, parse it
    const rows = data.split('\n');
    const headers = rows[0].split(',');
    const values = rows[1].split(',');
    
    return { 
      [headers[0]]: values[0], 
      [headers[1]]: values[1]
    }; 
  }]
}; 

// send the request 
axios(options);
```

---

## Intercepting requests and responses

HTTP interception is a popular feature of Axios. With this feature, you can examine and change HTTP requests from your program to the server and vice versa, which is very useful for a variety of implicit tasks, such as logging and authentication.

### What are Axios interceptors?

Axios interceptors are functions that can be executed before a request is sent or after a response is received through Axios. There are two types of interceptor methods in Axios: request and response.

At first glance, interceptors look very much like transforms, but they differ in one key way: unlike transforms, which only receive the data and headers as arguments, interceptors receive the entire response object or request config.

You can declare a request interceptor in Axios like this:

```js
// declare a request interceptor
axios.interceptors.request.use(config => {
  // perform a task before the request is sent 
  console.log('Request was sent'); return config;
}, error => {
  // handle the error
  return Promise.reject(error);
});

// sent a GET request
axios.get('https://api.github.com/users/mapbox')
  .then(response => {
    console.log(response.data.created_at);
  });
```

This code logs a message to the console whenever a request is sent and then waits until it gets a response from the server, at which point it prints the time the account was created at GitHub to the console. One advantage of using interceptors is that you no longer have to implement tasks for each HTTP request separately.

Axios also provides a response interceptor, which allows you to transform the responses from a server on their way back to the application. For example, here’s how to catch errors in an interceptor with Axios:

```js
// declare a response interceptor
axios.interceptors.response.use((response) => {
  // do something with the response data
  console.log('Response was received');
  return response;
}, error => {
  // handle the response error return Promise.reject(error);
});

// sent a GET request
axios.get('https://api.github.com/users/mapbox')
  .then(response => {
    console.log(response.data.created_at);
  });
```

---

## Client-side support for protection against XSRF

Cross-site request forgery (or XSRF for short) is a method of attacking a web-hosted app in which the attacker disguises themself as a legal and trusted user to influence the interaction between the app and the user’s browser. There are many ways to execute such an attack, including `XMLHttpRequest`.

Fortunately, Axios is designed to [**protect against XSRF**](/blog.logrocket.com/protecting-next-js-apps-csrf-attacks.md) by allowing you to embed additional authentication data when making requests. This enables the server to discover requests from unauthorized locations.

Here’s how this can be done with Axios:

```js
const options = {
  method: 'post',
  url: '/login',
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
}; 

// send the request
axios(options);
```

---

## Monitoring POST request progress

Another interesting feature of Axios is the ability to monitor request progress. This is especially useful when downloading or uploading large files. The [example provided (<FontIcon icon="iconfont icon-github"/>`axios/axios`)](https://github.com/axios/axios/blob/main/examples/upload/index.html) in the Axios documentation gives you a good idea of how that can be done. But for the sake of simplicity and style, we are going to use the [Axios Progress Bar (<FontIcon icon="iconfont icon-github"/>`rikmms/progress-bar-4-axios`)](https://github.com/rikmms/progress-bar-4-axios/) module in this tutorial.

The first thing we need to do to use this module is to include the related style and script:

```html
<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/nprogress.css" />

<script src="https://cdn.rawgit.com/rikmms/progress-bar-4-axios/0a3acf92/dist/index.js"></script>
```

Then we can implement the progress bar like this:

```js
loadProgressBar()

const url = 'https://media.giphy.com/media/C6JQPEUsZUyVq/giphy.gif';

function downloadFile(url) {
  axios.get(url)
    .then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })
}

downloadFile(url);
```

To change the default styling of the progress bar, we can override the following style rules:

```css
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
```

---

## Canceling requests with Axios

In some situations, you may no longer care about the result and want to cancel a request that’s already been sent. This can be done by using `AbortController`. You can create an `AbortController` instance and set its corresponding `AbortSignal` instance as the value of the `signal` property of the config object.

Here’s a simple example:

```js
const controller = new AbortController();

axios
  .get("https://media.giphy.com/media/C6JQPEUsZUyVq/giphy.gif", {
    signal: controller.signal,
  })
  .catch((error) => {
    if (controller.signal.aborted) {
      console.log(controller.signal.reason);
    } else {
      // handle error
    }
  });

// cancel the request (the reason parameter is optional)
controller.abort("Request canceled.");
```

Axios also has a built-in function for canceling requests. However, the built-in `CancelToken` functionality is deprecated. You may still encounter it in legacy codebase, but it is not advisable to use it in new projects.

Below is a basic example:

```js
const source = axios.CancelToken.source();

axios.get('https://media.giphy.com/media/C6JQPEUsZUyVq/giphy.gif', {
  cancelToken: source.token
}).catch(thrown => {
  if (axios.isCancel(thrown)) {
    console.log(thrown.message);
  } else {
    // handle error
  }
});

// cancel the request (the message parameter is optional)
source.cancel('Request canceled.');
```

You can also create a cancel token by passing an executor function to the `CancelToken` constructor, as shown below:

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get('https://media.giphy.com/media/C6JQPEUsZUyVq/giphy.gif', {
  // specify a cancel token
  cancelToken: new CancelToken(c => {
    // this function will receive a cancel function as a parameter
    cancel = c;
  })
}).catch(thrown => {
  if (axios.isCancel(thrown)) {
    console.log(thrown.message);
  } else {
    // handle error
  }
});

// cancel the request
cancel('Request canceled.');
```

---

## Axios error handling

An HTTP request may succeed or fail. Therefore, it is important to handle errors on the client side and provide appropriate feedback for a better user experience.

Possible causes of error in a network request may include server errors, authentication errors, missing parameters, and requesting non-existent resources.

Axios, by default, rejects any response with a status code that falls outside the successful 2xx range. However, you can modify this feature to specify what range of HTTP codes should throw an error using the `validateStatus` config option, like in the example below:

```js
axios({
  baseURL: "https://jsonplaceholder.typicode.com",
  url: "/todos/1",
  method: "get",
  validateStatus: status => status <= 500,
}).then((response) => {
  console.log(response.data);
})
```

The error object that Axios passes to the `.catch` block has several properties, including the following:

```js
.catch(error => { 
  console.log(error.name) 
  console.log(error.message) 
  console.log(error.code) 
  console.log(error.status) 
  console.log(error.stack) 
  console.log(error.config) 
})
```

In addition to the properties highlighted above, if the request was made and the server responded with a status code that falls outside the 2xx range, the error object will also have the `error.response` object.

On the other hand, if the request was made but no response was received, the error object will have an `error.request` object. Depending on the environment, the `error.request` object is an instance of `XMLHttpRequest` in the browser environment and an instance of `http.ClientRequest` in Node.

You need to check for `error.response` and `error.request` objects in your `.catch` callback to determine the error you are dealing with so that you can take appropriate action:

```js
axios.get("https://jsonplaceholder.typicode.com/todos")
  .catch(function (error) {
    if (error.response) {
      // Request was made. However, the status code of the server response falls outside the 2xx range 
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) { // Request was made but no response received 
      console.log(error.request);
    } else { // Error was triggered by something else 
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
```

### How to use Axios interceptors to handle API error responses

Sometimes, duplicating the code above in the `.catch` callback for each request can become tedious and time-consuming. You can instead intercept the error and handle it globally like so:

```js
axios.interceptors.request.use(null, function (error) {
  // Do something with request error 
  return Promise.reject(error);
});

axios.interceptors.response.use(null, function (error) {
  // Do something with response error 
  if (error.response) {
    // Request was made. However, the status code of the server response falls outside the 2xx range 
  } else if (error.request) {
    // Request was made but no response received
  } else { 
    // Error was triggered by something else
  }
  return Promise.reject(error);
});
```

A more granular, centralized error-handling approach is maintaining the API globally and managing all response and request errors with a dedicated handler function.

Let’s understand it with a simple React app that shows toast messages when a request or response error occurs. Start by creating a file called `api.js` in the `src` directory of your React app and use the `axios.create` method to create a custom Axios instance.

In this example, I’m using a placeholder API to demonstrate and use one of its endpoints as the base URL of our Axios instance:

```js title="api.js"
import axios from 'axios';
import toast from 'react-hot-toast';
// Create a custom Axios instance
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
```

Next, let’s define a handler function and call it `handleError` in the same file. This function takes one argument — expected to be the error object when we implement this with Axios interceptors. With this error object, we can categorize errors based on their type (e.g., response, request, setup) and display appropriate user feedback using a [**React toast library**](/blog.logrocket.com/react-toast-libraries-compared.md):

```js title="api.js"
// Centralized error handling 
const handleError = (error) => {
  /*
   * If request was made, but the status code 
   * of the server response falls outside 
   * the 2xx range.
   */
  if (error.response) {
    // A lookup table of different error messages 
    const messages = {
      404: 'Resource not found',
      500: 'Server error. Please try again later.',
    };

    const errorMessage = 
      messages[error.response.status] || `Unexpected error: ${error.response.status}`;
    
    toast.error(errorMessage, { id: 'api-error' });
    console.error('Full error:', error);
    return;
  }
   // If request was made but no response received 
  if (error.request) { 
    toast.error('No response from server. Check your network connection.', { id: 'api-error' });
    console.error('Full error:', error);
    return;
  } 
  // If error was triggered by something else
  toast.error('Error setting up the request', { id: 'api-error' });
  console.error('Full error:', error);
};
```

Now, we can add a response interceptor to our custom Axios instance to provide automatic success notifications for successful API responses and delegate error handling to the `handleError` function:

```js title="api.js"
// Axios interceptor
api.interceptors.response.use((response) => {
  const successMessage = response.config.successMessage || `${response.config.method.toUpperCase()} request successful`;
  toast.success(successMessage, { id: 'api-success', });
  return response;
}, (error) => {
  handleError(error);
  return Promise.reject(error);
});

export default api;
```

We can then use this custom Axios instance in a component where we want to consume the API (the placeholder API in this case) and let it handle errors by itself. [<FontIcon icon="fas fa-globe"/>Here’s the complete setup of our React app](https://stackblitz.com/edit/vitejs-vite-5hvjuf?file=src%2Futils%2Fapi.js) with HTTP error feedback following a centralized error-handling approach.

---

## How to post a file from a form with Axios

We can use Axios with the [<FontIcon icon="fa-brands fa-firefox"/>`FormData` object](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects) to streamline a file upload. To simplify the demonstration, I’m using React again to create a file upload component with basic error handling.

*N.B., we are assuming that a backend API is available to support the file upload in this example. This will make more sense with a test backend API in your local development setup.*

Let’s use [**React’s `useState` Hook**](/blog.logrocket.com/guide-usestate-react.md) to manage the file selection and its upload status. Let’s also create a handler function (`handleFileChange`) to manage the file selection, which basically updates the `selectedFile` state to the file chosen by the user:

```js
import { useState } from 'react';
import axios from 'axios';

const FileUploadBox = () => { 
  // State to manage the selected file and upload status 
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  
  // Handle file selection
  const handleFileChange = (event) => { 
    const file = event.target.files[0];
    setSelectedFile(file);
  };
}
```

We should now define a handler function (`handleFileUpload`) for file upload, which creates a `FormData` object if a file is selected. The selected file is then appended to this object, which will be sent in an Axios POST request. Uploading a file is a heavy operation, therefore this handler function should execute asynchronously to allow other operations to continue without blocking the UI thread.

*N.B., if your use case allows, you may also use an Axios PUT request to upload a file, which takes a similar approach but may also require you to add some additional steps.*

```js
const FileUploadBox = () => {
  // Previous code... 

  // Handle file upload 
  const handleFileUpload = async () => {
    // Ensure a file is selected 
    if (!selectedFile) {
      setUploadStatus('Please select a file first');
      return;
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', selectedFile);
  }
}
```

To the same function, i.e., `handleFileUpload`, we can add a `try...catch` block with a custom Axios instance pointing to our backend API’s endpoint, which is responsible for the file upload. Because it is a file upload, we must set the `Content-Type` to `multipart/form-data` to have our file properly parsed at the backend.

We may also reflect the upload progress in the frontend using the `onUploadProgress` property of our custom Axios instance. If the request is successful, we set the `uploadStatus` to something positive, which we can also show through a toast message later. Otherwise, we set a negative message to the `uploadStatus` state:

```js

const FileUploadBox = () => {
  // Previous code... 
  
  // Handle file upload 
  const handleFileUpload = async () => {
    try {
      // Send POST request using Axios 
      const response = await axios.post('/api/upload', formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }, 
        // Optional: track upload progress
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload Progress: ${percentCompleted}%`); 
        }
      }); // Handle successful upload
      setUploadStatus('File uploaded successfully!');
      console.log('Upload response:', response.data);
    } catch (error) {
      // Handle upload error
      setUploadStatus('File upload failed');
      console.error('Upload error:', error);
    }
  };
}
```

Finally, we should add some JSX to structure our file upload box and use the states, selection handlers, and file upload handlers appropriately, as shown below:

```jsx
const FileUploadBox = () => {
  // Previous code... 
  return ( 
    <div className="upload-box-container">
      <h2>File Upload</h2>
      <input 
        type="file"
        onChange={handleFileChange}
      />

      <button 
        onClick={handleFileUpload} 
        disabled={!selectedFile}
      >
        Upload File
      </button>
      
      {uploadStatus && (
        <p>
          {uploadStatus}
        </p>
      )}
    </div>
  );
}; 

export default FileUploadComponent;
```

As an assignment, you may try adding previously discussed Axios interceptors-based error handling to this example. Find the code for this example in [<FontIcon icon="fas fa-globe"/>this StackBlitz demo](https://stackblitz.com/edit/vitejs-vite-7yesynt7?file=src%2FComponents%2FFileUploadBox.jsx).

---

## Popular Axios libraries

Axios’ rise in popularity among developers has resulted in a rich selection of third-party libraries that extend its functionality. From testers to loggers, there’s a library for almost any additional feature you may need when using Axios. Here are some libraries that are currently available:

<SiteInfo
  name="nettofarah/axios-vcr:"
  desc=":vhs: Record and Replay requests in JavaScript."
  url="https://github.com/nettofarah/axios-vcr/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/a46325aa94d9dd0e0fe6e79f4c499a7fa5d1bc18bbd794346b8c62d637b12de9/nettofarah/axios-vcr"/>

<SiteInfo
  name="srph/axios-response-logger"
  desc=":mega: Axios interceptor which logs responses."
  url="https://github.com/srph/axios-response-logger/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/fe36a94148d131e0a5f5cbf63e91902d12f3e1d3a7bf836a13f7b6b7eb051c37/srph/axios-response-logger"/>

<SiteInfo
  name="jacobbuck/axios-method-override"
  desc=":boat: axios request method override plugin."
  url="https://github.com/jacobbuck/axios-method-override/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/001fe91297aa6b60d20e5d484498c731c05b1bd582c7e000c7d25a00444eb9c2/jacobbuck/axios-method-override"/>

<SiteInfo
  name="kuitos/axios-extensions"
  desc="🍱 axios extensions lib, including throttle, cache, retry features etc..."
  url="https://github.com/kuitos/axios-extensions/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/9079e7c3fb487a65d72365bbec7f0e5c6953415707ca820bcb4f8926b866fe38/kuitos/axios-extensions"/>

<SiteInfo
  name="Weffe/axios-api-versioning"
  desc=" :diamond_shape_with_a_dot_inside: Add easy to manage api versioning to Axios"
  url="https://github.com/Weffe/axios-api-versioning/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/145da79b32473c7140d7dcd08d4cb1ae6dafff566bf27a6c312783faf3ddf78d/Weffe/axios-api-versioning"/>

<SiteInfo
  name="jin5354/axios-cache-plugin"
  desc="Help you cache GET request when using axios."
  url="https://github.com/jin5354/axios-cache-plugin/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/3128b5ef6923b2c847c2a7f92307c13880795520baee67c5145fa0bc8af1cf98/jin5354/axios-cache-plugin"/>

<SiteInfo
  name="3846masa/axios-cookiejar-support"
  desc="Add tough-cookie support to axios."
  url="https://github.com/3846masa/axios-cookiejar-support/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/67123361/37eb4904-d2db-4253-bceb-19daa9afcc84"/>

<SiteInfo
  name="use-hooks/react-hooks-axios"
  desc="Custom React Hooks for Axios.js."
  url="https://github.com/use-hooks/react-hooks-axios/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/2565d0f72a3c67ff0fc5e7d68c7bc9a20b226d863fc6195cf54546c59595ab32/use-hooks/react-hooks-axios"/>

<SiteInfo
  name="axios/moxios"
  desc="Mock axios requests for testing."
  url="https://github.com/axios/moxios/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/61f4e752b7da2a9da9de0d7563927678913776df6a74c28d4857c3596cd5fc0d/axios/moxios"/>

<SiteInfo
  name="klis87/redux-requests"
  desc="Declarative AJAX requests and automatic network state management for single-page applications"
  url="https://github.com/klis87/redux-requests/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/103126229/a3ed9700-e48d-11ea-880e-a57724b7a90b"/>

<SiteInfo
  name="lifeomic/axios-fetch"
  desc="A WebAPI Fetch implementation backed by an Axios client"
  url="https://github.com/lifeomic/axios-fetch/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f501ed17217be887e72e45d47ffdaa0f4c1a27790886bfedee4403233ac3f680/lifeomic/axios-fetch"/>

<SiteInfo
  name="anthonygauthier/axios-curlirize"
  desc="axios plugin converting requests to cURL commands, saving and logging them."
  url="https://github.com/anthonygauthier/axios-curlirize/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/35b3f8038dee9f542d811cfc47555bfc099148f11cda59caaf662fee432018ab/anthonygauthier/axios-curlirize"/>

<SiteInfo
  name="davestewart/axios-actions"
  desc="Bundle endpoints as callable, reusable services."
  url="https://github.com/davestewart/axios-actions/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://repository-images.githubusercontent.com/140268692/e9425e80-66b7-11e9-851b-30d2ace56afa"/>

<SiteInfo
  name="jdrydn/mocha-axios"
  desc="http assertions for mocha using axios."
  url="https://github.com/jdrydn/mocha-axios/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4af185cb6f3c5cc692684e5297fc5cc71b7a5c7508009fda5e405cc329568dc2/jdrydn/mocha-axios"/>

<SiteInfo
  name="ctimmerm/axios-mock-adapter"
  desc="Axios adapter that allows to easily mock requests."
  url="https://github.com/ctimmerm/axios-mock-adapter/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/0b47222d83427798d677f494406ada6c283a0ea25f589bb3c82df1cad2461276/ctimmerm/axios-mock-adapter"/>

<SiteInfo
  name="Gerhut/axios-debug-log"
  desc="Axios interceptor of logging request & response with debug library."
  url="https://github.com/Gerhut/axios-debug-log/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/fec42ec6866f71872f841d699b416057b0dbfe20a5690f687765efdf8de693e6/Gerhut/axios-debug-log"/>

<SiteInfo
  name="svrcekmichal/redux-axios-middleware"
  desc="Redux middleware for fetching data with axios HTTP client"
  url="https://github.com/svrcekmichal/redux-axios-middleware/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b7305095dbd6b0520bf463b7929f6034477292f25a2bce841307090686dd9f69/svrcekmichal/redux-axios-middleware"/>

<SiteInfo
  name="Gerhut/axiosist"
  desc="Axios based supertest: convert node.js request handler to axios adapter, used for node.js server unit test."
  url="https://github.com/Gerhut/axiosist/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/a4da74d6fbad8bba9660998c062a16c30a6c24af102b0edf12825fea97516f9d/Gerhut/axiosist"/>

---

## Wrapping up

There’s a good reason Axios is so popular among developers: it’s packed with useful features. In this post, we took a look at several key features of Axios and learned how to use them in practice. But there are still many aspects of Axios that we haven’t discussed. Be sure to check out the [Axios GitHub page (<FontIcon icon="iconfont icon-github"/>`axios/axios`)](https://github.com/axios/axios) to learn more.

<SiteInfo
  name="axios/axios"
  desc="Promise based HTTP client for the browser and node.js"
  url="https://github.com/axios/axios/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4f0895f3369d5e0e04423091fd4bc4dc67de950d7c1b4d96381e0b1b14d9f9a3/axios/axios"/>

Do you have any tips on using Axios? Let us know in the comments!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to make HTTP requests with Axios",
  "desc": "Learn how to make HTTP requests with Axios, from POST requests to Axios interceptors, using examples for efficient API communication.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/http-requests-axios.html",
  "logo": "/images/asset/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
