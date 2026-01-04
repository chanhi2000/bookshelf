---
lang: en-US
title: "How to Assign Unique IDs to Express API Requests for Tracing"
description: "Article(s) > How to Assign Unique IDs to Express API Requests for Tracing"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Assign Unique IDs to Express API Requests for Tracing"
    - property: og:description
      content: "How to Assign Unique IDs to Express API Requests for Tracing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-assign-unique-ids-to-express-api-requests-for-tracing.html
prev: /programming/js-express/articles/README.md
date: 2025-08-20
isOriginal: false
author:
  - name: Orim Dominic Adah
    url : https://freecodecamp.org/news/author/orimdominic/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1755625819738/b5d45868-c770-4878-8c49-63011507ef56.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Assign Unique IDs to Express API Requests for Tracing"
  desc="The ability to track what happens with API requests is an important aspect of monitoring, tracing and debugging back-end applications. But how do you differentiate between the reports of two consecutive API requests to the same API endpoint? This art..."
  url="https://freecodecamp.org/news/how-to-assign-unique-ids-to-express-api-requests-for-tracing"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1755625819738/b5d45868-c770-4878-8c49-63011507ef56.png"/>

The ability to track what happens with API requests is an important aspect of monitoring, tracing and debugging back-end applications. But how do you differentiate between the reports of two consecutive API requests to the same API endpoint?

This article aims to show you how to:

- Properly assign a unique ID to API requests in your Express applications,
- Store and access the ID using the [<VPIcon icon="fa-brands fa-node"/>`AsyncLocalStorage`](https://nodejs.org/docs/latest-v18.x/api/async_context.html#class-asynclocalstorage) API in Node.js, and
- Use it in request logging.

Experience in creating API endpoints and using middleware in Express will be helpful as you follow along with this guide. You can also apply ideas from this article to frameworks like NestJS and Koa.

---

## Getting Started with the Starter Repository

To make it easier to follow along, I’ve created a starter project and hosted it on GitHub. You can [clone it from here (<VPIcon icon="iconfont icon-github"/>`orimdominic/freecodecamp-express-request-ids`)](https://github.com/orimdominic/freecodecamp-express-request-ids). To get it up and running on your local computer, install its dependencies using your preferred JavaScript package manager (npm, yarn, pnpm, bun). Then start the application by running the `npm start` command in the terminal of the project.

If the application starts successfully, it should log the snippet below on the terminal:

```plaintext tilte="output"
Listening on port 3333
```

The application has only one API endpoint currently - a `GET /` . When you make an API request to the endpoint using `curl` or a browser by visiting `http://localhost:3333`, you will get an “OK” string as the payload response:

```sh
$ curl -i http://localhost:3333

OK%
```

If the snippet above is what you see, then congratulations! You have set the project up correctly.

---

## Set Up Logger Utilities

The first step is to set up custom loggers for logging messages to the terminal. The loggers will log the events that occur during the process of handling an API request and log the summary of the request.

To achieve this, you’ll need to install two Express middlewares - [<VPIcon icon="fa-brands fa-npm"/>`morgan`](https://npmjs.com/package/morgan) and [<VPIcon icon="fa-brands fa-npm"/>`winston`](https://npmjs.com/package/winston) - using your preferred package manager. If you use `npm`, you can run the command below in the folder terminal of the project:

```sh
npm install morgan winston
```

If the above command is successful, morgan and winston will be added to the `dependencies` object in <VPIcon icon="iconfont icon-json"/>`package.json`. Create a file named <VPIcon icon="fa-brands fa-js"/>`logger.js` in the root folder of the project. <VPIcon icon="fa-brands fa-js"/>`logger.js` will contain the code for the custom logger utilities.

The first logger utility you will create is `logger`, created from the winston package you installed earlier. `logger` is an object with two methods:

- `info` for logging non-error messages to the terminal
- `error` for logging error messages to the terminal

```js title="logger.js"
const winston = require("winston");

const { combine, errors, json, timestamp, colorize } = winston.format;

const logHandler = winston.createLogger({
  level: "debug",
  levels: winston.config.npm.levels,
  format: combine(
    timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }), // set the format of logged timestamps
    errors({ stack: true }),
    json({ space: 2 }),
    colorize({
      all: true,
      colors: {
        info: "gray", // all info logs should be gray in colour
        error: "red", // all error logs should be red in colour     
        },
    })
  ),
  transports: [new winston.transports.Console()],
});

exports.logger = {
  info: function (message) {
    logHandler.child({}).info(message);
  },

  error: function (message) {
    logHandler.child({}).error(message);
  },
};
```

In the code snippet above, `winston.createLogger` is used to create `logHandler`. `logger` is exported out of the <VPIcon icon="fa-brands fa-js"/>`logger.js` module and `logger.info` and `logger.error` are functions that use `logHandler` to log messages to the terminal.

The second logger utility will be a middleware that will log information about the request just before the request response is sent to the client. It will log information such as how long it took to run the request and the status code of the request. It will be called `logRequestSummary` and will use the morgan package and the `http` method of `logHandler`.

```js :collapsed-lines title="logger.js"
const winston = require("winston");
const morgan = require("morgan");

const { combine, errors, json, timestamp, colorize } = winston.format;

const logHandler = winston.createLogger({
  // ...
  format: combine(
    // ...
    colorize({
      all: true,
      colors: {
        // ...
        http: "blue", // 👈🏾 (new line) logs from logRequestSummary will be blue in colour
      },
    })
  ),
  // ...
});

exports.logger = {
    // ...
};

exports.logRequestSummary = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      url: tokens.url(req, res),
      method: tokens.method(req, res),
      status_code: Number(tokens.status(req, res) || "500"),
      content_length: tokens.res(req, res, "content-length") + " bytes",
      response_time: Number(tokens["response-time"](req, res) || "0") + " ms",
    });
  },
  {
    stream: {
      // use logHandler with the http severity
      write: (message) => {
        const httpLog = JSON.parse(message);
        logHandler.http(httpLog);
      },
    },
  }
);
```

The JSON string returned by the first function when the `morgan` function is executed is received by the `write` function of the `stream` object in the second argument passed to the organ function. It’s then parsed to JSON and passed to `logHandler.http` to be logged with the `winston.npm` `http` severity level.

At this point, two objects are exported from <VPIcon icon="fa-brands fa-js"/>`logger.js`: `logger` and `logRequestSummary`.

In <VPIcon icon="fa-brands fa-js"/>`index.js`, create a new controller to handle `GET` requests to the `/hello` path. Also import and use the exported objects from <VPIcon icon="fa-brands fa-js"/>`logger.js`. Use `logger` to log information when events occur in controllers and include `logRequestSummary` as a middleware for the application.

```js title="index.js"
const express = require("express");
const { logRequestSummary, logger } = require("./logger");

const app = express();

app.use(
  express.json(),
  express.urlencoded({ extended: true }),
  logRequestSummary // logger middleware utility
);

app.get("/", function (req, res) {
  logger.info(`${req.method} request to ${req.url}`); // logger utility for events
  return res.json({ method: req.method, url: req.url });
});

app.get("/hello", function (req, res) {
  logger.info(`${req.method} request to ${req.url}`); // logger utility for events
  return res.json({ method: req.method, url: req.url });
});

// ...
```

Stop the application (with <kbd>CTRL</kbd>+<kbd>C</kbd> or <kbd>OPTION</kbd>+<kbd>C</kbd>), and start it again with `npm start`. Make API requests to both API endpoints, you’ll see output similar to the snippet below in the terminal - an event log first and a log of the summary of the request after.

```json
{
  "level": "info",
  "message": "GET request to /",
  "timestamp": "2025-08-16 10:35:06.831 PM"
}
{
  "level": "http",
  "message": {
    "content_length": "26 bytes",
    "method": "GET",
    "response_time": "9.034 ms",
    "status_code": 200,
    "url": "/"
  },
  "timestamp": "2025-08-16 10:35:06.844 PM"
}
```

You can view the latest state of the code by switching to the <VPIcon icon="fas fa-code-branch"/>`2-custom-logger-middleware` branch using `git checkout 2-custom-logger-middleware` or by visiting branch [<VPIcon icon="fas fa-code-branch"/>`2-custom-logger-middleware` (<VPIcon icon="iconfont icon-github"/>`orimdominic/freecodecamp-express-request-ids`)](https://github.com/orimdominic/freecodecamp-express-request-ids/tree/2-custom-logger-middleware) of the repository.

Now that you’re able to log and view events that occur for each API request, how do you differentiate between two consecutive requests to the same endpoint? How do you figure out which API request logged a specific message? How do you specify the API request to trace when communicating with your teammates? By attaching a unique ID to each request, you’ll be able to answer all these questions.

---

## What is `AsyncLocalStorage` and Why is it Important?

Before [<VPIcon icon="fa-brands fa-node"/>`AsyncLocalStorage`](https://nodejs.org/docs/latest-v18.x/api/async_context.html#class-asynclocalstorage), users of Express stored request context information in the `res.locals` object. With AsyncLocalStorage, Node.js provides a native way to store information that’s necessary for executing asynchronous functions. According to its documentation, it’s a performant and memory-safe implementation that involves significant optimizations that would be difficult for you to implement by yourself.

When you use AsyncLocalStorage, you can store and access information in a similar manner to [<VPIcon icon="fa-brands fa-firefox" />`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) in the browser. You pass the store value (usually an object, but it can be a primitive value, too) as the first argument and the asynchronous function that should access the store value as the second argument when you execute the `run` method.

James Snell, one of the leading contributors of Node.js explains it further in this video [<VPIcon icon="fa-brands fa-youtube"/>Async Context Tracking in Node with Async Local Storage API](https://youtu.be/ukefzxZ_G9U).

<VidStack src="youtube/ukefzxZ_G9U" />

---

## Store the Request ID in AsyncLocalStorage

In the project, create a file with the name <VPIcon icon="fa-brands fa-js"/>`context-storage.js`. In this file, you’ll create an instance of AsyncLocalStorage (if it hasn’t been created yet) and export it. This instance of AsyncLocalStorage will be used in storing and retrieving the request IDs for the logger and any other context that needs the request ID.

```js title="context-storage.js"
const { AsyncLocalStorage } = require("node:async_hooks");

let store;

module.exports.contextStorage = function () {
  if (!store) {
    store = new AsyncLocalStorage();
  }

  return store;
};
```

You’ll create another file called <VPIcon icon="fa-brands fa-js"/>`set-request-id.js` which will create and export a middleware. The middleware will intercept API requests, generate a request ID, and store it in the instance of AsyncLocalStorage from <VPIcon icon="fa-brands fa-js"/>`context-storage.js` if it doesn’t exist in it already.

You can use any ID-generating library you want, but here we’ll use `randomUUID` from the Node.js `crypto` package.

```js title="set-request-id.js"
const { randomUUID } = require("node:crypto");
const { contextStorage } = require("./context-storage");

/**
 * Preferably your first middleware.
 *
 * It generates a unique ID and stores it in the AsyncLocalStorage
 * instance for the request context.
 */
module.exports.setRequestId = function () {
  return function (_req, _res, next) {
    requestId = randomUUID();
    const store = contextStorage().getStore();

    if (!store) {
      return contextStorage().run({ requestId }, next);
    }

    if (store && !store.requestId) {
      store.requestId = requestId;
      return next();
    }

    return next();
  };
};
```

In the `setRequestId` function in the snippet above, the instance of AsyncLocalStorage created in `context-storage.js` is retrieved from the return value of executing `contextStorage` as `store`. If `store` is falsy, the `run` method executes the `next` Express callback, providing `requestId` in an object for access anywhere within `next` from `contextStorage`.

If `store` has a value but doesn’t have the `requestId` property, set the `requestId` property and its value on it and return the executed `next` function.

Lastly, place `setRequestId` as the first middleware of the Express application in <VPIcon icon="fa-brands fa-js"/>`index.js` so that every request can have an ID before carrying out other operations.

```js title="index.js"
const express = require("express");
const { logRequestSummary, logger } = require("./logger");
const { setRequestId } = require("./set-request-id");

const app = express();

app.use(
  setRequestId(), // 👈🏾 set as first middleware
  express.json(),
  express.urlencoded({ extended: true }),
  logRequestSummary
);

// ...
```

You can check the current state of this project if you run the `git checkout 3-async-local-storage-req-id` command on your terminal or by visiting [<VPIcon icon="fas fa-code-branch"/>`3-async-local-storage-req-id` (<VPIcon icon="iconfont icon-github"/>`orimdominic/freecodecamp-express-request-ids`)](https://github.com/orimdominic/freecodecamp-express-request-ids/tree/3-async-local-storage-req-id) of the GitHub repository.

---

## Use the Request ID in the Logger Utilities

Now that the `requestId` property has been set in the store, you can access it from anywhere within `next` using `contextStorage`. You’ll access it within the functions in <VPIcon icon="fa-brands fa-js"/>`logger.js` and attach it to the logs so that when messages are logged to the terminal for a request, the request ID will appear with the logged message.

```js title="logger.js"
const winston = require("winston");
const morgan = require("morgan");
const { contextStorage } = require("./context-storage");

const { combine, errors, json, timestamp, colorize } = winston.format;

const logHandler = winston.createLogger({
  level: "debug",
  levels: winston.config.npm.levels,
  format: combine(

    // 👇🏽 retrieve requestId from contextStorage and attach it to the logged message
    winston.format((info) => {
      info.request_id = contextStorage().getStore()?.requestId;
      return info;
    })(),
    // 👆🏽 retrieve requestId from contextStorage and attach it to the logged message

    timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
    errors({ stack: true }),
    // ...
  ),
  transports: [new winston.transports.Console()],
});

// ...
```

In the `combine` function from winston, you’ll include a function argument that accepts the message to be logged - `info` - as an argument and attach the `request_id` property to it. Its value is the value of `requestId` retrieved from `contextStorage`. With this modification, any message logged for a request will have the request ID for that request attached to it.

With this complete, stop the project from running if it’s running already and run it again with the `npm start` command. Make API requests to the two endpoints and you’ll see output similar to the snippet below on the terminal:

```json
{
  "level": "info",
  "message": "GET request to /hello",
  "request_id": "c80e92d0-eafe-42c7-b093-e5ffce014819",
  "timestamp": "2025-08-17 07:58:13.571 PM"
}, {
  "level": "http",
  "message": {
    "content_length": "31 bytes",
    "method": "GET",
    "response_time": "9.397 ms",
    "status_code": 200,
    "url": "/hello"
  },
  "request_id": "c80e92d0-eafe-42c7-b093-e5ffce014819",
  "timestamp": "2025-08-17 07:58:13.584 PM"
}
```

Unlike the previous log output, this one contains the request ID of each request. By using `AsyncLocalStorage` to efficiently store the value of the request ID and access it for use in the loggers, you can accurately trace logged messages to their API requests.

You can access the current state of the project if you run the `git checkout 4-use-context-in-logger` command on the terminal or by visiting [<VPIcon icon="fas fa-code-branch"/>`4-use-context-in-logger` (<VPIcon icon="iconfont icon-github"/>`orimdominic/freecodecamp-express-request-ids`)](https://github.com/orimdominic/freecodecamp-express-request-ids/tree/4-use-context-in-logger) of the GitHub repository.

---

## Set Header to have X-Request-Id (Optional Challenge)

You have been able to store, access, and attach a request’s ID to its logged message. Can you set the request ID as a header on the response? The challenge is to set a header, `X-Request-Id`, on the response so that every request response has the value of the request ID as the value of the `X-Request-Id` response header.

This is useful for communicating with the frontend when trying to debug requests.

---

## Conclusion

When API requests can be monitored, you can track performance metrics to discover areas that need improvement and attention, identify issues like failed requests and server errors and why they happened, and study patterns in request volume metrics for planning and scalability.

When you attach a unique identifier to an API request, you can use it to trace the events that occurred within the lifetime of the request and differentiate it from other requests of the same type.

Aside from using AsyncLocalStorage to store request IDs, you can also use it to store other request context information such as the authenticated user details. Using AsyncLocalStorage to store request context information is considered a best practice.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Assign Unique IDs to Express API Requests for Tracing",
  "desc": "The ability to track what happens with API requests is an important aspect of monitoring, tracing and debugging back-end applications. But how do you differentiate between the reports of two consecutive API requests to the same API endpoint? This art...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-assign-unique-ids-to-express-api-requests-for-tracing.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
