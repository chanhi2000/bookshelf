---
lang: en-US
title: "5 ways to make HTTP requests in Node.js"
description: "Article(s) > 5 ways to make HTTP requests in Node.js"
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
      content: "Article(s) > 5 ways to make HTTP requests in Node.js"
    - property: og:description
      content: "5 ways to make HTTP requests in Node.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/5-ways-make-http-requests-node-js.html
prev: /programming/js-node/articles/README.md
date: 2024-02-02
isOriginal: false
author:
  - name: Geshan Manandhar
    url : https://blog.logrocket.com/author/geshanmanandhar/
cover: https://blog.logrocket.com/wp-content/uploads/2024/02/5-ways-make-http-requests-node-js.png
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
  name="5 ways to make HTTP requests in Node.js"
  desc="Make HTTP requests in Node.js using the native module as well as npm packages like Axios, Got, SuperAgent, and node-fetch."
  url="https://blog.logrocket.com/5-ways-make-http-requests-node-js"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="https://blog.logrocket.com/wp-content/uploads/2024/02/5-ways-make-http-requests-node-js.png"/>

::: note Editor’s note

This article was last updated by [<VPIcon icon="fas fa-globe"/>Joseph Maw](https://blog.logrocket.com/author/josephmawa/)a on 2 February 2024 to include changes made in Node 14, as well as to add information about implementing HTTP services with Express.js, and handling Node HTTPS POST requests.

:::

![5 Ways To Make HTTP Requests In Node.js](https://blog.logrocket.com/wp-content/uploads/2024/02/5-ways-make-http-requests-node-js.png)

There are multiple ways to make HTTP requests in Node.js. We can do so by using the standard built-in HTTP/HTTPS modules provided by Node.js, leveraging the Fetch API that’s included in your Node environment, or opting for a third-party npm package to simplify the process.

In this article, we will explore the native HTTPS module and Fetch API, as well as examine popular npm packages like Axios, Got, superagent, and node-fetch to facilitate making HTTP requests efficiently.

Let’s get started!

::: note Prerequisites

Before we dive in, here are some prerequisites:

- Node.js running on your machine ([**maybe as a Docker container**](/blog.logrocket.com/node-js-docker-improve-dx.md)). All the examples require Node.js 14 or later
- Familiarity with npm commands like `npm init`, and you should be able to install npm packages with the `npm install <module-name>` command
- Know how to execute JavaScript files with the `node <filename>` command to see the example output
- Familiarity with JavaScript [**callbacks, promises, and async/await**](/blog.logrocket.com/evolution-async-programming-javascript.md)

:::

---

## The example RESTful API we will use

We will use each HTTP client to make a GET request to the [<VPIcon icon="fas fa-globe"/>JSONPlaceholder](https://jsonplaceholder.typicode.com/users) API. It will send us data for 10 users. We will log each username and ID on the console. You can find the examples from this article in [this GitHub repository (<VPIcon icon="iconfont icon-github"/>`geshan/nodejs-requests`)](https://github.com/geshan/nodejs-requests).

---

## Client options for HTTP requests in Node.js

We will explore five ways of making GET requests to the placeholder API. Let’s start with the built-in native HTTP(S) module as our first example.

### Standard Node.js HTTP(S) module

Node.js comes with built-in [<VPIcon icon="fa-brands fa-node"/>HTTP](https://nodejs.org/api/http.html) and [<VPIcon icon="fa-brands fa-node"/>HTTPS](https://nodejs.org/api/https.html) modules. In the example below, we use the HTTPS module to perform a GET request to the placeholder API:

```js
const https = require('https');

https.get('https://jsonplaceholder.typicode.com/users', res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const users = JSON.parse(Buffer.concat(data).toString());

    for(user of users) {
      console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    }
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});
```

Let’s walk through the code. We required the built-in `https` module, which is available in any standard Node.js installation. There is no need for a `package.json` file or `npm install` to start using it.

We then used the `get` method to make a network request to the JSONPlaceholder API.

Next, we initialized `data` as an empty array and logged the status code and date from the response header. Whenever we get a chunk of data, we push it into the `data` array.

After receiving all the responses, we concatenate the data array, convert it to a string, and parse the JSON to get the list of users. We looped through the users and logged the user ID and name to the console.

One thing to note here: if there is an error on the request, the error message is logged on the console. [The above code is available as a pull request (<VPIcon icon="iconfont icon-github"/>`geshan/nodejs-requests`)](https://github.com/geshan/nodejs-requests/pull/1).

You can execute the code above using the `node native-https.js` command, provided you named the file <VPIcon icon="fa-brands fa-js"/>`native-https.js`. It should show an output like so:

![Output of node native code](https://blog.logrocket.com/wp-content/uploads/2021/02/Output-of-node-native-code.png)

You can use the same method to run all the other examples in this post; they will show a similar output. We print the status code, the date from the response header, and the user ID and name from the response body.

Next, let’s explore how to make HTTP requests in Node.js using the built-in browser-compatible Fetch API.

### The built-in Fetch API

Node.js shipped an experimental version of the browser-compatible implementation of the Fetch API in v16.15.0 and it became stable in Node v21. Fetch is natively available in the environment, eliminating the need for importation or requiring it separately. This built-in API offers several benefits: there’s no need for ongoing maintenance, security concerns are minimized, and there’s no impact on the bundle size or licensing issues that are often associated with third-party packages.

You can use the Fetch API with async/await or promise chaining:

```js
(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const headerDate = res.headers && res.headers.get('date') ? res.headers.get('date') : 'no response date';
    console.log('Status Code:', res.status);
    console.log('Date in Response header:', headerDate);

    const users = await res.json();

    for(user of users) {
      console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    }
  } catch (err) {
    console.log(err.message); //can be console.error
  }
})();
```

Because the Fetch API is browser-compatible, the code you write for fetching data in the browser using the Fetch API can also be used in Node.js without modification and vice versa.

Next in line for exploration is the Axios npm package — for this, we will need a <VPIcon icon="iconfont icon-json"/>`package.json` file.

### Axios

[**Axios**](/blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios.md) is a very popular promise-based request library. It is an HTTP client available for both browsers and Node.js. It also includes handy features like intercepting request and response data, and automatically transforming request and response data to JSON.

You can install Axios with the following command:

```sh
npm install axios
```

Then you can use it like so:

```js
const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/users')
  .then(res => {
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.status);
    console.log('Date in Response header:', headerDate);

    const users = res.data;

    for(user of users) {
      console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    }
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });
```

There’s less code in the above example than in the previous one because it uses promise chaining. However, you can turn it into async/await.

Let’s explain what the above example does. We required the `axios` library and then used the `axios.get` method to make a GET request to the JSONPlaceholder API. We used promise chaining to handle the response. In the `then` method callback, we logged the status code and date to the console.

Axios transforms the response data into JSON out of the box. The response data in the above example is an array of users. We looped through it and logged the user ID and name to the console.

In case of any error, we logged the error message on the console. The above example is also accessible as a [pull request (<VPIcon icon="iconfont icon-github"/>`geshan/nodejs-requests`)](https://github.com/geshan/nodejs-requests/pull/3/files).

Next, we will look at Got, another popular and feature-rich library.

### Got

[Got (<VPIcon icon="fa-brands fa-npm"/>`got`)](https://npmjs.com/package/got) is another popular HTTP request library for Node.js. Got features a promise-based API, and its HTTP/2 support and pagination API are its unique selling points.

We can install Got with the following command:

```sh
npm install got
```

Below is a quick example illustrating how to use Got to fetch users from our mock API:

```js
const got = require('got');

got.get('https://jsonplaceholder.typicode.com/users', {responseType: 'json'})
  .then(res => {
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    const users = res.body;
    for(user of users) {
      console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    }
  })
  .catch(err => {
    console.log('Error: ', err.message);
  });
```

The code example above is similar to Axios but with two main differences:

1. We needed to pass `{responseType: 'json'}` as the second parameter to the `get` method to indicate that the response was in JSON format
2. The status code header was called `statusCode`, not `status`

Other things remained the same as the previous request with Axios. You can see the above example in [this pull request (<VPIcon icon="iconfont icon-github"/>`geshan/nodejs-requests`)](https://github.com/geshan/nodejs-requests/pull/4/files).

Next up, we will look at superagent.

### superagent

[<VPIcon icon="iconfont icon-github"/>`ladjs/superagent`](https://github.com/ladjs/superagent), first released in April 2011 by VisionMedia, is one of the oldest Node.js request packages. superagent brands itself as a “small, progressive, client-side HTTP request library and Node.js module with the same API, supporting many high-level HTTP client features.” It offers both callback- and promise-based APIs. [superagent has several plugins (<VPIcon icon="iconfont icon-github"/>`ladjs/superagent`)](https://github.com/ladjs/superagent#plugins) you can use to extend its functionality.

You can install superagent with the following command:

```sh
npm install superagent
```

Let’s look at what an API call looks like with superagent. We will use async/await with an [<VPIcon icon="fa-brands fa-firefox" />Immediately Invoked Function Expression (IIFE)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) for this illustration instead of promise chaining:

```js
const superagent = require('superagent');

(async () => {
  try {
    const res = await superagent.get('https://jsonplaceholder.typicode.com/users');
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    const users = res.body;
    for(user of users) {
      console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    }
  } catch (err) {
    console.log(err.message); //can be console.error
  }
})();
```

superagent is mature and battle-tested, which makes it reliable. We can also test superagent calls with the [SuperTest library (<VPIcon icon="iconfont icon-github"/>`ladjs/supertest`)](https://github.com/ladjs/supertest). Like with the previous examples, the superagent example above is available as a [pull request (<VPIcon icon="iconfont icon-github"/>`geshan/nodejs-requests`)](https://github.com/geshan/nodejs-requests/pull/5/files).

Now, let’s look at node-fetch.

### node-fetch

[<VPIcon icon="fa-brands fa-npm"/>`node-fetch`](https://npmjs.com/package/node-fetch) is another very popular HTTP request library for Node.js — in the first week of February 2024, it was downloaded more than 50 million times, [<VPIcon icon="fas fa-globe"/>according to npm trends](https://npmtrends.com/node-fetch).

In their own words, “node-fetch is a lightweight module that brings the Fetch API (`window.fetch`) to Node.js.” Its features include consistency with the browser-based `window.fetch` and native promise and async functions.

You can install node-fetch with the command below:

```sh
npm install node-fetch
```

Let’s look at how to use node-fetch to make HTTP requests. We will also use async/await in the example below to keep things simple:

```js
const fetch = require('node-fetch');

(async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const headerDate = res.headers && res.headers.get('date') ? res.headers.get('date') : 'no response date';
    console.log('Status Code:', res.status);
    console.log('Date in Response header:', headerDate);

    const users = await res.json();
    for(user of users) {
      console.log(`Got user with id: ${user.id}, name: ${user.name}`);
    }
  } catch (err) {
    console.log(err.message); //can be console.error
  }
})();
```

Let’s review some of the differences here compared to our example of using superagent with async/await:

1. node-fetch did not need an explicit GET method; the HTTP verb can be sent as a `method` key in the second parameter, which is an object. For instance: `{method: 'GET'}`
2. Another difference is that the header is an object with a `get` method to get header values. We called `res.headers.get('date')` to get the value of the date response header

As with the other code examples, the example above is accessible as a [pull request (<VPIcon icon="iconfont icon-github"/>`geshan/nodejs-requests`)](https://github.com/geshan/nodejs-requests/pull/6/files). Now it’s time to compare the four libraries that we just reviewed.

---

## A comparison of Node HTTP request methods

Except for the built-in HTTP/HTTPS modules and the built-in fetch API, all the other four HTTP client libraries are available as npm packages. Below is a quick overview of their weekly download statistics for the past six months according to [<VPIcon icon="fas fa-globe"/>npm trends](https://npmtrends.com/axios-vs-got-vs-superagent-vs-node-fetch):

![NPM Trends Download Statistics](https://blog.logrocket.com/wp-content/uploads/2021/02/npm-trends-download-statistics-1.png)

In terms of monthly downloads, node-fetch was the most popular, and superagent was the least popular in the past six months. To gain a more comprehensive understanding of their popularity, let’s examine additional metrics, drawing insights from the comparison table available on the [Got GitHub repository (<VPIcon icon="iconfont icon-github"/>`sindresorhus/got`)](https://github.com/sindresorhus/got#comparison):

| | **Axios** | **Got** | **superagent** | **node-fetch** |
| --- | --- | --- | --- | --- |
| **GitHub stars** | 103K | 14K | 17K | 8.6K |
| **Install size (from packagephobia)** | 2.11MB | 757kB | 1.68MB | 7.45MB |
| **npm downloads (per month)** | 213M | 84M | 38M | 222M |

From the above table, node-fetch is the most downloaded package and has the largest install size of 7.45MB. Axios has the most GitHub stars with 103K — more than all three other libraries combined.

---

## Implementing HTTP services with Express.js

Express.js is a fast, minimal, unopinionated, and feature-rich Node.js framework. It’s a very popular framework that you can use to create an HTTP server fast.

After installing Express from the npm package registry, you can create an Express instance and listen for HTTP connections as in the example below:

```js
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
```

However, the above server will return an HTTP 404 error because we haven’t declared any routes yet. A basic Express.js route takes the form below:

```js
app.METHOD(PATH, HANDLER)
```

In the above structure, `app` is an express instance, `METHOD` is an HTTP request method, `path` is a path on the server, and `handler` is a callback function that runs after matching a route.

The HTTP request methods include `get`, `post`, `put`, and `delete`. Therefore, your routes will look like so:

```js
app.get("/", (req, res) => {
  res.send("GET request from /");
});

app.post("/", (req, res) => {
  res.send("POST request from /");
});

app.put("/user", (req, res) => {
  res.send("PUT request from /user");
});

app.delete("/user", (req, res) => {
  res.send("DELETE request from /user");
});
```

Let’s add an index route, `/`, to the basic Express server we created above so that it returns “Hello world!” instead of the HTTP 404 error when you navigate to `http://localhost:3000/`:

```js
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
```

That’s how you use Express.js to implement a basic HTTP service. If you want to learn more about features such as serving static assets, mounting a middleware, user authentication, cookies and session management, and error handling in Express.js, check out this [**Express.js adoption guide**](/blog.logrocket.com/express-js-adoption-guide.md) .

---

## Handling Node HTTPS POST requests

In this section, we will explore how to handle POST requests in a Node.js server. A typical POST request occurs when a user submits an HTML form or makes an AJAX POST request.

When the POST request hits its intended endpoint, you will access the POST data, parse it in your callback function, validate and sanitize the data, and possibly send back a response. However, you should be aware that parsing an HTTP request body can be tedious when working with a plain Node.js server.

The code below is a basic implementation of a plain Node.js HTTP server. It has a basic HTML form you can use to make a POST request. The structure of the request body depends on the encoding type. These encoding types include `application/x-www-form-urlencoded`, `multipart/form-data`, and `text/plain`:

```js :collapsed-lines
const http = require("http");

const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <form action="/submit-form" enctype="application/x-www-form-urlencoded" method="POST">
      <label> Enter Name: 
        <input type="text" autocomplete="name" name="name" required />
      </label>
      <input type="submit" />
    </form>
  </body>
</html>
`;
const server = http.createServer((req, res) => {
  switch (req.method) {
    case "GET":
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page not found");
      }
      break;
    case "POST":
      if (req.url === "/submit-form") {
        let body = "";
        req.on("data", (data) => {
          body += data;
        });

        req.on("end", () => {
          console.log("Request body:  " + body);
          // Parse, validate, and sanitize
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ body }));
        });
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page not found");
      }
      break;
    default:
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method not supported");
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Your app is listening on PORT ${PORT}`);
});
```

You need to validate and sanitize the data after parsing a POST request body. You can then save the data in a database, authenticate the user, or redirect to an appropriate page.

Most backend frameworks have built-in features for parsing an HTTP request body. With Express.js, you can use the built-in `express.urlencoded()` middleware when the request body has the `application/x-www-form-urlencoded` encoding. The middleware will populate the `req.body` with key-value pairs of the request data:

```js :collapsed-lines
const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/submit-form", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
```

For `multipart/form-data` encoding, you need to use third-party packages such as busboy, Multer, or formidable.

The code below illustrates how you can use Multer. Because it is not a built-in middleware, be sure to first install it from the npm package registry:

```js :collapsed-lines
const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const upload = multer();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.post("/submit-form", upload.none(), (req, res) => {
  console.log("req.body: ", req.body);
  console.log("Content-Type: ", req.get("Content-Type"));
  res.json(req.body);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
```

Finally, Express also has a built-in middleware for parsing request bodies with `text/plain` encoding. Its usage is similar to the previous middleware we looked at. You can mount it like so:

```js
app.use(express.text());
```

---

## Conclusion

In the past, I used superagent quite extensively; after that, I moved to Axios. With its long feature list, I want to give Got a try soon. Even though node-fetch looks promising and has a small install size, I am not sure if the API is user-friendly enough — at least for me.

You might notice the omission of the [Request npm package (<VPIcon icon="fa-brands fa-npm"/>`request`)](https://npmjs.com/package/request) in my discussion. Despite its continued popularity, with 11.42 million weekly downloads, Request has been deprecated as of February 2024, rendering it an impractical choice.

All these libraries mainly do the same thing — much like which brand of coffee you prefer, in the end, you are still drinking coffee. Choose wisely depending on your use case, and make the right tradeoffs for maximum benefit.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "5 ways to make HTTP requests in Node.js",
  "desc": "Make HTTP requests in Node.js using the native module as well as npm packages like Axios, Got, SuperAgent, and node-fetch.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/5-ways-make-http-requests-node-js.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
