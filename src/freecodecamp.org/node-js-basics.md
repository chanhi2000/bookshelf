---
lang: en-US
title: "What is Node.js? Server-Side JavaScript Development Basics"
description: "Article(s) > What is Node.js? Server-Side JavaScript Development Basics"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is Node.js? Server-Side JavaScript Development Basics"
    - property: og:description
      content: "What is Node.js? Server-Side JavaScript Development Basics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/node-js-basics.html
prev: /programming/js-node/articles/README.md
date: 2023-07-26
isOriginal: false
author: David Clinton
cover: https://freecodecamp.org/news/content/images/2023/07/pexels-tomasz-filipek-1630035.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is Node.js? Server-Side JavaScript Development Basics"
  desc="Node.js is a powerful runtime environment for executing JavaScript code outside of a web browser. It brings the JavaScript language to the server-side, enabling developers to build scalable, high-performance, and event-driven applications. Let's disc..."
  url="https://freecodecamp.org/news/node-js-basics"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2023/07/pexels-tomasz-filipek-1630035.jpg"/>

Node.js is a powerful runtime environment for executing JavaScript code *outside* of a web browser. It brings the JavaScript language to the server-side, enabling developers to build scalable, high-performance, and event-driven applications.

Let's discover how Node.js code works, and how that code can be integrated within your JavaScript and then executed.

This article comes from [<FontIcon icon="fas fa-globe"/>my Complete LPI Web Development Essentials Study Guide course](https://udemy.com/course/complete-lpi-web-development-essentials-exam-study-guide/?referralCode=C92570BCBB38302A9257). If you'd like, you can follow the video version here:

<VidStack src="youtube/pSvvqaXCL30" />

Node.js allows developers to use JavaScript both on the client-side and the server-side, providing a unified language and ecosystem. This eliminates the need for context switching and enables code reuse between the front-end and back-end. This results in improved productivity and reduced development time.

Node.js has a vast and active ecosystem of modules and libraries available through the Node Package Manager (npm). This rich ecosystem offers ready-to-use tools and packages for various functionalities, such as web frameworks, database connectors, authentication, and testing frameworks.

Developers can leverage these modules to accelerate development and enhance application functionality.

Given all that, Node.js is particularly well-suited for building:

- Web applications
- Scalable APIs
- Real-time applications requiring instant data updates and bidirectional communication like chat applications and multiplayer games
- Streaming applications like audio or video processing or real-time analytics
- Single-page applications
- Internet of Things deployments

All that sound like a good match for some useful web applications? I thought it would. So let's see how it all works.

---

## How to Build a Node.js Server Environment

First off, you won't need to set up and run a third-party web server like Apache HTTPD or NGINX or place your content within the <FontIcon icon="fas fa-folder-open"/>`/var/www/html` directory hierarchy. That's because Node.js is, among other things, a web server framework.

Let me show you what that means. You'll need to make sure you've got Node.js installed along with the necessary dependencies. By and large, you'll use the NPM package manager to get that done. There's excellent documentation for installing Node on your OS [<FontIcon icon="fa-brands fa-node"/>from the official website](https://nodejs.org/en/download).

You can confirm that both Node and NPM are live and waiting for action by running these commands:

```sh
node -v
#
# v18.16.0
npm -v
#
# 9.5.1
```

Just to have some HTML to work with, you should find or create a simple <FontIcon icon="fa-brands fa-html5"/>`index.html` file and save it to a local directory on your machine. This command will download the `html` of an LPI page from my own website if you need something quick and small:

```sh
wget https://bootstrap-it.com/lpi/
```

Let's take a look at the <FontIcon icon="fa-brands fa-js"/>`server.js` code we used for our Node server.

```js title="server.js"
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // Read the HTML file
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading HTML file');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

Now let's work through that code, one section at a time. We begin by loading two necessary modules: `http` to manage the website hosting, and `fs` to read the HTML files.

```js
const http = require('http');
const fs = require('fs');
```

We then create a server function - called `server`. When called, it will either read and serve our <FontIcon icon="fa-brands fa-html5"/>`index.html` file (generating a 200 success code) or, if there's a problem reading the file, it'll generate a 500 error message.

```js
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error loading HTML file');
      return;
    }
```

The code continues by setting 3000 as the listening port for our application - although, technically, you could change that to any value you like between 1 and 65535. 

```js
const port = 3000;
```

Finally, we call the `server` function using the `listen` method and specifying the port number, and then writing an entry to `console.log`.

```js
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
```

---

## How to Execute Your Node.js Server

Running the `npm init` command in the same directory were your program files will live is used to initialize a new Node.js project and create a <FontIcon icon="iconfont icon-json"/>`package.json` file.

The <FontIcon icon="iconfont icon-json"/>`package.json` file serves as the manifest for the project, containing metadata and configuration information about the project, its dependencies, scripts, and other details.

You can manually add dependencies to the file or use:

```sh
npm install <PACKAGE-NAME>
```

...to add packages and their versions to the dependencies section of the <FontIcon icon="iconfont icon-json"/>`package.json`.

When you actually run `npm init` to initialize a directory for a new project, a script will ask you some questions. The default values npm suggests for you will include `1.0.0` as a version number and an entry point of <FontIcon icon="fa-brands fa-js"/>`index.js`.

You'll also have the option of setting a git repo, keywords, and a choice of user license models. All the defaults should work just fine.

When that's done, the script will show you the proposed JSON-formatted version of your settings and ask for your approval. The <FontIcon icon="iconfont icon-json"/>`package.json` file that was created will reflect those settings.

For our project, install the MySQL database connector module along with express.js:

```sh
npm install mysql
npm install express.js
```

Neither takes more than a few seconds. When that's all done, I'll see that there's now a new file in town: <FontIcon icon="iconfont icon-json"/>`package-lock.json`.

Peeking inside that file will show you an awful lot of JSON goodness. What's that all about? The package-lock.json file is automatically generated by npm when you install dependencies for your project. It serves as a lockfile that ensures deterministic and reproducible builds of your project across different environments.

It's important to include the package-lock.json file in version control systems like Git so that other developers or deployment environments can reproduce the exact dependency tree and versions used in the project. This ensures consistency and avoids potential conflicts or surprises when working with dependencies.

There will also be a new <FontIcon icon="fas fa-folder-open"/>`node_modules` directory that was automatically created and populated by that init operation. This directory is a storage location for all the packages and modules our project relies on. When you install packages using `npm install`, the downloaded packages are placed here.

npm automatically resolves and installs the required dependencies of each package. It creates a hierarchical structure in the <FontIcon icon="fas fa-folder-open"/>`node_modules` directory that reflects the dependency tree of your project.

Launching your server is straightforward:

```sh
node server.js
```

To view the service, open your browser and direct it to the application URL, using port `3000`. When your browser is on the same machine as the Node server, this is how that'll look:

```plaintext
localhost:3000
```

Of course, you don't really need Node.js just for that. The value of Node.js comes from building user interactivity by integrating it with a backend database. That can happen using Express.js, but it'll have to wait for another time.

---

## Wrapping Up

What we *have* seen here is how the magic behind building a Node.js environment can provide all the infrastructure and backend functionality you need to launch and maintain an interactive and dynamic server.

::: note

This article comes from [<FontIcon icon="fas fa-globe"/>my Complete LPI Web Development Essentials Study Guide course](https://udemy.com/course/complete-lpi-web-development-essentials-exam-study-guide/?referralCode=C92570BCBB38302A9257). And there's much more technology goodness available at [<FontIcon icon="fas fa-globe"/>bootstrap-it.com](https://bootstrap-it.com/)*

<SiteInfo
  name="The Complete LPI Web Development Essentials Exam Study Guide"
  desc="Learn the basics of HTML, CSS, JavaScript, Express.js, and Node.js and launch your career in full stack web development"
  url="https://udemy.com/course/complete-lpi-web-development-essentials-exam-study-guide"
  logo="/staticx/udemy/images/v8/favicon-16x16.png"
  preview="https://img-c.udemycdn.com/course/480x270/5365660_b73e.jpg"/>

```component VPCard
{
  "title": "Bootstrap IT - A division of DBC Technology Services Inc",
  "desc": "A division of DBC Technology Services Inc",
  "link": "https://bootstrap-it.com/",
  "logo": "https://bootstrap-it.com/wp-content/uploads/logo_no_text-300x300.png",
  "background": "rgba(129,39,114,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Node.js? Server-Side JavaScript Development Basics",
  "desc": "Node.js is a powerful runtime environment for executing JavaScript code outside of a web browser. It brings the JavaScript language to the server-side, enabling developers to build scalable, high-performance, and event-driven applications. Let's disc...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/node-js-basics.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
