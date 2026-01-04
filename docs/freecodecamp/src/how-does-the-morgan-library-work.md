---
lang: en-US
title: "How Does the Morgan Express Middleware Library Work? Explained with Code Examples"
description: "Article(s) > How Does the Morgan Express Middleware Library Work? Explained with Code Examples"
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
      content: "Article(s) > How Does the Morgan Express Middleware Library Work? Explained with Code Examples"
    - property: og:description
      content: "How Does the Morgan Express Middleware Library Work? Explained with Code Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-does-the-morgan-library-work.html
prev: /programming/js-express/articles/README.md
date: 2025-09-30
isOriginal: false
author:
  - name: Orim Dominic Adah
    url : https://freecodecamp.org/news/author/orimdominic/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759169256698/9cb4e87a-2bc3-49ac-b1a6-b9d02d410ea1.png
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
  name="How Does the Morgan Express Middleware Library Work? Explained with Code Examples"
  desc="Morgan is an Express middleware library that examines HTTP requests and logs details of the request to an output. It is one of the most popular Express middleware libraries with over 8,000 GitHub stars and more than 9,000 npm libraries dependent on i..."
  url="https://freecodecamp.org/news/how-does-the-morgan-library-work"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759169256698/9cb4e87a-2bc3-49ac-b1a6-b9d02d410ea1.png"/>

[<VPIcon icon="fa-brands fa-npm"/>`morgan`](https://npmjs.com/package/morgan) is an Express middleware library that examines HTTP requests and logs details of the request to an output. It is one of the most popular Express middleware libraries with over 8,000 GitHub stars and more than 9,000 npm libraries dependent on it. GitHub reports that Morgan is used by at least 3.6 million repositories.

This guide explains the Morgan library’s code to help you understand how it works under the hood. This is helpful if you have experience with Express and you are interested in understanding the inner workings that produce Morgan log lines. An understanding of closures in JavaScript is helpful for this guide but not necessary.

---

## What is an Express Middleware?

According to [<VPIcon icon="iconfont icon-expressjs"/>Express documentation](https://expressjs.com/en/guide/writing-middleware.html), a middleware is a function that has access to the request and response objects and the `next` function of an Express request cycle. They are generally used to intercept requests to execute side-effects before or after the request is handled by its route handler.

::: info A middleware can be used to

- **Make changes to the request and the response objects**: It can make changes to the request and response objects by attaching properties like headers and cookies to them.
- **Terminate the request-response cycle**: It can terminate a request and send a response to the client before or after the request is handled by its route handler.
- **Execute the next middleware in the stack**: It can trigger the execution of the middleware after it via the `next` function argument.

:::

A function called `next` is usually the third argument of a middleware and it is used to pass the request to the next middleware. If the `next` function is not executed in a middleware and the request is not explicitly terminated by sending a response to the client, the request will be left hanging and the application will be blocked from handling consecutive incoming requests.

The interface of a middleware is shown in the code snippet below:

```js
function middleware(request, response, next) {
    // operations to be performed when this middleware is executed
    next() // execute the next middleware
}
```

A middleware can intercept and handle cases where preceding middleware or route handlers throw unhandled errors. These middlewares are usually called error handler middlewares and accept four arguments as shown below:

```js
function errorHandlerMiddleware(error, request, response, next) {}
```

The `error` argument represents the unhandled error.

Some middlewares like Morgan and [<VPIcon icon="fa-brands fa-npm"/>`cors`](https://npmjs.com/package/cors) are higher-order functions. They accept configuration arguments when initialised and return a middleware function, executed by Express when hit by a request.

```js
function initialise(...configArgs) {
    // make use of configArgs here
    return function middleware(request, response, next) {
        // can also make use of configArgs here
        // operations to perform when this middleware is hit by a request
        next() // execute the next middleware
    }
}
```

---

## A Brief Overview of How Morgan Works

```js
import morgan from "morgan"
// morgan(format, [options])
morgan("tiny") // initialise morgan and return a middleware
// Sample output: GET /tiny 200 2 - 0.188 ms
```

Morgan is initialised by executing it with a required `format` argument and an optional `options` argument. The `format` argument may be:

- A predefined Morgan format name
- A format string containing predefined tokens (a token set)
- A custom format function that returns a log output in the form of a string

The `options` argument is optional. It is an object with three properties:

- `immediate` (boolean): If `true`, the log output will be created on receiving requests and not when a response is sent. It defaults to `false`.
- `skip` (function): The function accepts the request and response objects as arguments and returns a boolean value based on the logic in it. If the value returned is `true`, the log line for a request is not logged. `skip` defaults to `false`.
- `stream` (WritableStream): Output stream for writing log lines. It defaults to `process.stdout` but it could be a file.

When Morgan is initialised, it stores its initialisation arguments in closure variables and returns a middleware function. The function is executed when a request hits it and it outputs a log line for the request. The format and where the log line is output to are determined by the initialisation arguments.

---

## What is a Morgan Token?

A Morgan token is a string prefixed by a colon, corresponding to property of the request or response objects or a user-generated value. For example, the request method’s token is `':method'` and the response status code’s token is `':status'`. A token can also accept an argument to customise its behaviour. For instance, in `':date[format]'`, `format` can be replaced with `clf`, `iso` or `web` to set the format of the date that would be in the log line. An understanding of Morgan tokens is crucial to understanding how Morgan works.

You can create new tokens using the `morgan.token` function. The code snippet below creates a new token called `':type'` which corresponds to the response `Content-Type` header:

```js
morgan.token('type', function (req, res) {
    return res.headers['content-type']
})
```

Morgan has predefined named format (`tiny`, `dev`, `short`, `combined`, `common`) strings containing a set of tokens and each named format has its specific token set and configuration. The token set for tiny is `':method :url :status :res[content-length] - :response-time ms'`. Morgan can accept these named formats as the value of the `format` argument.

Aside from accepting named formats, Morgan can also accept a token set (for example `':method :url :status :res[content-length] - :response-time ms'`) as the `format` argument. A third argument type that Morgan accepts as the `format` argument is a format function. A format function accepts three arguments and returns a string that forms the log line for each request. For example, the format function described below:

```js
morgan(function (tokens, req, res) {
    return `method: ${tokens.method(req, res)}
path: ${tokens.url(req, res)}
code: ${tokens.status(req, res)}`
})
```

This will produce a log line output like:

```plaintext
method: get
path: /
code: 200
```

`tokens.method`, `tokens.url` and `tokens.status` are examples of functions on the `morgan` object that can generate values to be logged. To illustrate, the table below shows sample token methods, their token and sample output values:

| Token method | Token | Sample output |
| --- | --- | --- |
| method | `“:method”` | get |
| url | `“:url”` | / |
| status | `”:status”` | 200 |

The next sections of this article explains how Morgan works under the hood. To follow along, open up [Morgan’s index.js file on GitHub (<VPIcon icon="iconfont icon-github"/>`expressjs/morgan`)](https://github.com/expressjs/morgan/blob/master/index.js).

---

## What Happens When Morgan is Initialised?

When Morgan is initialised, it makes a copy of the arguments provided to it. For arguments that were not provided, Morgan sets default values for them. For instance, if no `format` string argument was provided, Morgan uses the `'default'` named format and logs a deprecation notice afterwards with a suggestion of a non-deprecated way for you to initialise it afterwards.

Morgan then sets up the `formatLine` function - the function that creates and returns the log line for a request when executed. How does it do this?

First, Morgan checks if `format` is a format function. If it is, the format function is assigned to `formatLine` and next, Morgan sets up the output stream. If `format` is not a function, it is passed as an argument to `getFormatFunction`. `getFormatFunction` accepts `format` and looks up Morgan’s object store to check if `format` is:

- One of Morgan’s named formats or a user-defined named format created via `morgan.format`
- A token set

If it is neither of the two, Morgan uses the `default` named format.

```js
function getFormatFunction (name) { // `name` is also `format`
  var fmt = morgan[name] || name || morgan.default

  return typeof fmt !== 'function'
    ? compile(fmt)
    : fmt
}
```

If the named format corresponds to a format function after the lookup, Morgan returns the format function, which is then assigned to `formatLine`, else, it corresponds to a token set. Morgan compiles the token set into a format function through the `compile` function - one of the most important functions in the Morgan package.

### The `compile` Function

The `compile` function accepts a token set and returns a function that has the interface of a format function. How does it do this?

With the JavaScript `replace` method, it uses a RegEx to search for all occurrences of a token in the token set and replaces each occurrence. If the token set is `':method :res[content-length] - :response-time ms'` , the RegEx `replace` method replaces the tokens as illustrated in the table below:

| name | arg | replacement string |
| --- | --- | --- |
| ‘method’ | `undefined` | `(tokens["method"](req, res)` |
| ‘res’ | `’content-length’` | `(tokens["res"](req, res, "content-length")` |
| ‘response-time’ | `undefined` | `(tokens["response-time"](req, res)` |

The result of the RegEx replace is prefixed with `"use strict"\n return ""` and ends up producing the string below:

```plaintext
"use strict" 
    return "" +  
    (tokens["method"](req, res) || "-") + " " +   
    (tokens["res"](req, res, "content-length") || "-") + " - " + 
    (tokens["response-time"](req, res) || "-") + " ms"
```

The string above is used to create a format function using the [<VPIcon icon="fa-brands fa-firefox" />Function constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function) and returned as:

```js
function (tokens, req, res) {
  "use strict"
  return "" +
    (tokens["method"](req, res) || "-") + " " +
    (tokens["res"](req, res, "content-length") || "-") + " - " +
    (tokens["response-time"](req, res) || "-") + " ms"
}
```

The format function is eventually stored in `formatLine`.

When `formatLine` is executed with `morgan` as the `tokens` argument, it will create a log line. In the case of the sample token set, it will create a log line that will look like `GET 20 1.233 ms`.

After creating the `formatLine` function, Morgan uses the `createBufferStream` function to set up the streaming of the log lines created to the preferred output if set by `options.stream`. If `options.stream` is not set, it uses `process.stdout`.

Morgan does all this setting up so that it can create log lines quickly on capturing a request. It will be inefficient to do all of these for each request.

---

## What Happens When Morgan Captures a Request?

When Morgan captures a request, it stores the IP address of the client using the `getip` function. Next, it stores the time that the request triggered it and attaches it to the request object in the `_startAt` and `_startTime` properties*.*

- `_startAt` is used calculate the total time between time between the request coming into Morgan and when the response has finished being written out to the connection, in milliseconds.
- `_startTime` is used to calculate the response time - the time between the request being captured by Morgan and when the response headers are written.

Next, Morgan tries to generate the log line for the request and log it by executing the `logRequest` function. Morgan checks if the log line should be output on request, and if it should, Morgan executes `logRequest` and executes `next` thereafter to pass the request to the next middleware.

```js
if (immediate) {
  logRequest()
} else {
  onHeaders(res, recordStartTime)
  onFinished(res, logRequest)
}

next()
```

If the log output should be created on response, Morgan registers two functions on the response object event listeners:

- **An function to be run when when headers start to be written to the response object**: When this listener is triggered, it records the time when headers start to be written to the response object as `_startAt` and `startTime`. These values are used to calculate the response time and the total time of the request.
- **A function to be run when the request closes, finishes or errors**: It executes `logRequest` when this event occurs.

Within `logRequest`, Morgan checks the value of the `skip` option. If it is a function, it is executed and if it returns `true`, Morgan doesn’t create a log output for the request and it exits.

```js
function logRequest () {
  if (skip !== false && skip(req, res)) {
    debug('skip request')
    return
  }

  var line = formatLine(morgan, req, res)

  if (line == null) {
    debug('skip line')
    return
  }

  stream.write(line + '\n')
};
```

If `skip` is `false` or executing it evaluates to `false`, Morgan generates the log line for the request using `formatLine`. If the log line is `null`, Morgan exits, else it sends the log line to the output medium and exits.

---

## Next Steps

You have learned how the Morgan Express middleware outputs logs. You now have foundational skills to pick up another middleware or Node.js library that you use and study it to see how it works. Pick one up, study it, write about it, and share it with others.

If you have any questions, you can connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`orimdominicadah`)](https://linkedin.com/in/orimdominicadah/). I’ll be happy to respond.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Does the Morgan Express Middleware Library Work? Explained with Code Examples",
  "desc": "Morgan is an Express middleware library that examines HTTP requests and logs details of the request to an output. It is one of the most popular Express middleware libraries with over 8,000 GitHub stars and more than 9,000 npm libraries dependent on i...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-does-the-morgan-library-work.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
