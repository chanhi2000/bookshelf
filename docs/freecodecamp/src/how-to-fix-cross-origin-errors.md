---
lang: en-US
title: "How to Fix Cross-Origin Errors — CORS Error Explained"
description: "Article(s) > How to Fix Cross-Origin Errors — CORS Error Explained"
icon: fas fa-shield-halved
category:
  - DevOps
  - Security
  - Node.js
  - Express.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Fix Cross-Origin Errors — CORS Error Explained"
    - property: og:description
      content: "How to Fix Cross-Origin Errors — CORS Error Explained"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-fix-cross-origin-errors.html
prev: /devops/security/articles/README.md
date: 2025-10-01
isOriginal: false
author:
  - name: Sumit Saha
    url : https://freecodecamp.org/news/author/sumitsaha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759324719020/8c59e405-107b-4e45-acab-c61cbf353d0b.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Security > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

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
  name="How to Fix Cross-Origin Errors — CORS Error Explained"
  desc="In this article, you’ll learn about an important concept: Cross-Origin Resource Sharing (CORS) policy. As a developer, you might encounter a situation where a client request to the server fails, and the browser displays a red error like ”CORS policy ..."
  url="https://freecodecamp.org/news/how-to-fix-cross-origin-errors"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759324719020/8c59e405-107b-4e45-acab-c61cbf353d0b.png"/>

In this article, you’ll learn about an important concept: Cross-Origin Resource Sharing (CORS) policy. As a developer, you might encounter a situation where a client request to the server fails, and the browser displays a red error like "CORS policy failed." Even when the request is correctly implemented, this error can still occur.

Some beginners may search online or copy temporary fixes, which may solve the issue without providing real understanding. Here, we’ll break down CORS in a clear way so you can understand why it happens and how to fix it.

![CORS Error](https://cdn.hashnode.com/res/hashnode/image/upload/v1758399944364/ea17ff8c-3791-45df-bcc6-276eeeab0af1.png)

::: note Prerequisites

To follow along and get the most out of this guide, you should have:

1. Basic knowledge of JavaScript — You should be familiar with JavaScript syntax, functions, and the fetch API to make HTTP requests from the client side.
2. Node.js and `npm` installed — You will use Node.js for the server-side setup and `npm` to manage packages. You can download Node.js from [<VPIcon icon="fa-brands fa-node"/>here](https://nodejs.org).
3. A code editor (like VS Code) — You will need a code editor like [<VPIcon icon="iconfont icon-vscode"/>VS Code](https://code.visualstudio.com/) to write and run your client and server files.
4. Basic knowledge of HTTP methods — Knowledge of GET, POST, PUT, DELETE requests will help you understand how the browser and server communicate.
5. A browser with Developer Tools — Chrome, Firefox, or Edge with Developer Tools.
6. Optional but helpful: VS Code Live Server extension — This helps run your HTML files locally for testing client-server requests.

:::

I’ve also created a video to go along with this article. If you’re the type who likes to learn from video as well as text, you can check it out here:

---

## Project Setup

Before exploring CORS, let's set up a basic client and server.

### Initialize the Server

First, create a project folder named <VPIcon icon="fas fa-folder-open"/><VPIcon icon="fas fa-folder-open"/>`cors-tutorial`, and inside that folder, create another folder called <VPIcon icon="fas fa-folder-open"/>`server`. Then, navigate into the <VPIcon icon="fas fa-folder-open"/>`server` folder and initialize a Node project. Run the commands below one by one:

```sh
mkdir cors-tutorial
cd cors-tutorial
mkdir server
cd server
npm init -y
```

### Install Required Packages

For the basic server setup, you will use a popular Node.js framework, [<VPIcon icon="iconfont icon-expressjs"/>Express.js](https://expressjs.com/). Install it with the following command:

```sh
npm i express
```

### Create Server File

Create a <VPIcon icon="fas fa-folder-open"/>`server/`<VPIcon icon="fa-brands fa-js"/>`app.js` file. Inside the file, import the installed Express package and initialize the app using the `express()` function. Then, create a route `/data` that returns a simple JSON object.

```js title="server/app.js"
const express = require("express");
const app = express();

app.get("/data", (req, res) => {
  res.json({
    name: "Bangladesh",
    description: "Land of emotions",
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

### Run The Server

Now start the server with the following command:

```sh
node app.js
```

### Client Setup

It’s time to setup the Client. Create an <VPIcon icon="fa-brands fa-html5"/>`index.html` and <VPIcon icon="fa-brands fa-js"/>`script.js` file inside the <VPIcon icon="fas fa-folder-open"/>`cors-tutorial` folder.

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>What is CORS</title>
  </head>
  <body>
    <div>
      <button onclick="fetchData()">Fetch Data</button>
    </div>

    <script src="./script.js"></script>
  </body>
</html>
```

```js title="script.js"
async function fetchData() {
  const response = await fetch("http://localhost:3000/data", {
    method: "GET",
  });

  const data = await response.json();
  console.log(data);
}
```

---

## Demonstration: Client-Server Interaction

### Client Side

- <VPIcon icon="fa-brands fa-html5"/>`index.html` has a single button labeled `Fetch Data`.
- The client runs on `127.0.0.1:5500` using VS Code Live Server.
- Browser console is open to view logs.

### Server Side

- A minimal Express server is in the <VPIcon icon="fas fa-folder-open"/>`server` folder.
- <VPIcon icon="fa-brands fa-js"/>`app.js` contains the `/data` route that returns:

```json
{
  "name": "Bangladesh",
  "description": "Land of emotions"
}
```

- Server is running on `localhost:3000`

### How it Works

- Clicking the **Fetch Data** button calls `fetchData()` from <VPIcon icon="fa-brands fa-js"/>`script.js`.
- `fetchData()` sends a GET request to the server and logs the JSON response.
- Directly visiting `localhost:3000/data` also shows the JSON output.
- Since client and server ports differ, you may see a CORS-related error message in the console.

![Access-Control-Allow-Origin CORS error](https://cdn.hashnode.com/res/hashnode/image/upload/v1758400085132/e5dbc478-b6c4-429a-b113-3e0b24db7f55.png)

::: note

- Python, PHP or other backend languages can be used similarly to create an API.
- This demonstration shows how the client interacts with the server before handling CORS issues.

:::

---

## What is Origin?

Origin means the source where the request is coming from. I made the request from `127.0.0.1:5500` and I'm trying to access data on `localhost:3000`. Both are URLs but they are different, right? When we say URL we mean the domain part, not the full path. `localhost` and `127.0.0.1` look the same but they are different as far as origin is concerned. The ports are also different. Because of that, the URL or origin is considered different.

So the source and the server are different, and that's why it says "has been blocked by CORS policy" and "No 'Access-Control-Allow-Origin' header is present on the requested resource." When a beginner sees this, they may not understand the whole process: why it happens and how it happens. We'll learn that now and how to solve it.

---

## What Does the Browser Mean by CORS Policy?

Imagine your website is `xyz.com` and that's our frontend. And your server is `www.abc.com`, a different domain, These two are different domains. We expect `xyz.com` to make a request to `abc.com` and `abc.com` to send a response — simple.

![Request - Response Visualisation](https://cdn.hashnode.com/res/hashnode/image/upload/v1758400245846/8e04ca91-073a-4da5-a19b-355a9178be85.jpeg)

The code we wrote should work, but sometimes it doesn't, which can be confusing. Why does this happen? The reason is simple: the CORS policy is blocking the request. CORS policy is a browser policy. Its full form is Cross-Origin Resource Sharing (CORS).

![Cross-Origin Resource Sharing (CORS)](https://cdn.hashnode.com/res/hashnode/image/upload/v1758400326775/22ebc6fd-9479-4fe9-aad7-0a752dadef8c.jpeg)

In simple terms, if the domain of the requester is different from the domain of the receiver, then by default, the browser will reject the request. Although it may reach the server, the browser will refuse to deliver the response to the client. That's why we see this behaviour.

---

## How to Fix CORS Policy Errors

This task needs to be handled on the server side. First, open the browser Network tab. When you make the request, reload and clear everything, then click `fetchData`. Notice the request details. Each request has two parts: Request Headers and Response Headers.

Request headers are sent by the browser and include metadata and browser-related information. Response headers are generated by the server and also contain metadata, while the request headers are created by the client (the browser).

If you inspect the response side, the error says: "No 'Access-Control-Allow-Origin' header is present on the requested resource". So you need to look for this header in the response. In the Network tab, if you check the response headers, you’ll see that there is no `Access-Control-Allow-Origin`. If the response had that header, the browser would allow access. So you have to add the appropriate header to the response.

![Missing Access-Control-Allow-Header](https://cdn.hashnode.com/res/hashnode/image/upload/v1758400366863/51da88e4-b44d-4d99-b50c-9dd0064b9236.png)

So what should we do? If you want to fix this in a Node.js/Express setup, go to the <VPIcon icon="fa-brands fa-js"/>`app.js` file in the <VPIcon icon="fas fa-folder-open"/>`server` folder. Stop the server and install the `cors` package:

```sh
npm i cors
```

After installing the package, restart the server. Next import the package and tell the app to use it. The `cors()` function can accept an `origin` option. If we set `origin` to `localhost:5500`, which is our client's URL, the server will allow only that origin. If you want to allow multiple origins, you can pass an array of URLs. Here, I'm setting a single URL because the client runs on port 5500. That means requests from other addresses won't be allowed.

You can now reload, clear the console, and click `fetchData` again, but you’ll still have an issue. Why? Because the client URL was using `127.0.0.1` instead of `localhost`. That's a variation, and the origin must match exactly. So you can change it to `127.0.0.1:5500` in the server config.

Now you can reload, clear, and click `fetchData`. Everything should work as expected now: there's no error the response was sent, and the data was printed to the console.

If you inspect the network response headers for the data request, you should see `Access-Control-Allow-Origin: http://127.0.0.1:5500`. That means the server responded with the CORS header and allowed that origin. Since the origin matched, the request succeeded. The takeaway: the server must include an `Access-Control-Allow-Origin` header specifying the allowed domain. If you want to allow every origin (for a public API) you can use `*`. In Express, you can also simply call `app.use(cors())` to allow all origins. That will make the server accept requests from any origin.

```js title="server/app.js"
const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for the client origin
app.use(cors({ origin: "http://127.0.0.1:5500" }));

app.put("/data", (req, res) => {
  res.json({
    name: "Bangladesh",
    description: "Land of emotions",
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

This ensures the server explicitly allows the client origin, resolving CORS policy errors.

---

## Additional Notes on CORS

One more thing to note. The request we were sending from the client was a GET request. For GET, POST, DELETE, the process is straightforward. But for methods like PUT, which modify data on the server, CORS behaves slightly differently. If you change the client to send a PUT request and the server defines an `app.put` route, you'll notice two requests in the network panel. The browser sends a preflight request first. This is the browser’s way of checking whether it's allowed to send the actual request. That preflight request is an `OPTIONS` request sent automatically by the browser before the actual PUT request.

```js title="server/app.js"
const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
  })
);

app.put("/data", (req, res) => {
  res.json({
    name: "Bangladesh",
    description: "Land of emotions",
  });
});

app.listen(3000);
```

```js title="script.js"
async function fetchData() {
  const response = await fetch("http://localhost:3000/data", {
    method: "PUT",
  });

  const data = await response.json();

  console.log(data);
}
```

When you look at the preflight request in the Network tab, you will see response headers that include `Access-Control-Allow-Methods` and other CORS headers. The default `cors` package allows all methods like `GET`, `POST`, `PUT`, `HEAD`, `PATCH`, and so on. If you want tighter security, you can specify allowed methods in the CORS configuration. For example, set the `methods` option to `['GET', 'POST']` to allow only GET and POST and disallow PUT and DELETE. Even if the origin matches, if the method is not allowed, the preflight will fail and the actual request will be blocked.

![Preflight Request Example](https://cdn.hashnode.com/res/hashnode/image/upload/v1758400423187/0186a5b6-b3fb-4ead-8ee8-aac847d28852.png)

If you perform the same request with disallowed methods, it will fail. The console will show the exact CORS error message. Now that you understand the flow, you'll be able to explain in an interview:  
"Access to fetch at \[URL-1\] from origin \[URL-2\] has been blocked by CORS policy: The PUT method is not allowed by Access-Control-Allow-Methods in preflight response." The preflight check saw `Access-Control-Allow-Methods: GET, POST` and therefore blocked the PUT request.

So you can control CORS behaviour using two main things: `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods`. If you understand these and configure them on the server, you can control which origins and methods are allowed. This is ultimately what the CORS policy is: a browser-enforced security measure. Browsers implement this standard pattern so that if the server does not send the proper headers, the browser will not allow the client to access the response.

---

## Summary

- CORS (Cross-Origin Resource Sharing) is a browser-enforced security mechanism that blocks requests from different origins unless explicitly allowed by the server.
- Origin is determined by protocol, domain, and port. Even small differences like `localhost` vs `127.0.0.1` or different ports make the origin different.
- Browsers block responses if the server does not include the `Access-Control-Allow-Origin` header for the requesting origin.
- The Node.js `cors` package can help handle CORS easily. Using `app.use(cors({ origin: "http://127.0.0.1:5500" }))` allows only the specified client origin.
- For methods like PUT, DELETE, and PATCH, browsers send a preflight `OPTIONS` request first to check if the method and origin are allowed.
- The `Access-Control-Allow-Methods` header defines which HTTP methods the server permits. If a method is disallowed, the preflight fails, and the request is blocked.
- Proper configuration of `Access-Control-Allow-Origin` and `Access-Control-Allow-Methods` ensures safe and functional client-server communication.
- Always match the client origin exactly and allow only necessary methods for security. Public APIs can use `*` to allow all origins.

---

## Final Words

You can find all the source code for this tutorial in [this GitHub repository (<VPIcon icon="iconfont icon-github"/>`logicbaselabs/cors-tutorial`)](https://github.com/logicbaselabs/cors-tutorial). If it helped you in any way, consider giving it a star to show your support!

Also, if you found the information here valuable, feel free to share it with others who might benefit from it. I’d really appreciate your thoughts – mention me on X [<VPIcon icon="fa-brands fa-x-twitter"/>`@sumit_analyzen`](https://x.com/sumit_analyzen) or on Facebook [<VPIcon icon="fa-brands fa-meta"/>`@sumit.analyzen`](https://facebook.com/sumit.analyzen), [watch my coding tutorials (<VPIcon icon="fa-brands fa-youtube"/>`logicBaseLabs`)](https://youtube.com/@logicBaseLabs), or simply [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`sumitanalyzen`)](https://linkedin.com/in/sumitanalyzen/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Fix Cross-Origin Errors — CORS Error Explained",
  "desc": "In this article, you’ll learn about an important concept: Cross-Origin Resource Sharing (CORS) policy. As a developer, you might encounter a situation where a client request to the server fails, and the browser displays a red error like ”CORS policy ...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-fix-cross-origin-errors.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
