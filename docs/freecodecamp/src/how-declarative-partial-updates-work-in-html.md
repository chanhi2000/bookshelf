---
lang: en-US
title: "How Declarative Partial Updates Work in HTML"
description: "Article(s) > How Declarative Partial Updates Work in HTML"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Declarative Partial Updates Work in HTML"
    - property: og:description
      content: "How Declarative Partial Updates Work in HTML"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-declarative-partial-updates-work-in-html.html
prev: /programming/css/articles/README.md
date: 2026-05-30
isOriginal: false
author:
  - name: Sumit Saha
    url: https://freecodecamp.org/news/author/sumitsaha/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d63aaead-37ef-4218-a3db-1f507d638317.png
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
  name="How Declarative Partial Updates Work in HTML"
  desc="HTML has always supported streaming. The server doesn't need to build an entire page in memory before sending it to the browser. It can send the initial HTML first, then send more chunks as each chunk"
  url="https://freecodecamp.org/news/how-declarative-partial-updates-work-in-html"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d63aaead-37ef-4218-a3db-1f507d638317.png"/>

HTML has always supported streaming. The server doesn't need to build an entire page in memory before sending it to the browser. It can send the initial HTML first, then send more chunks as each chunk is ready. The browser parses those chunks and displays the page in order. This is one reason why HTML seems fast.

But traditional HTML streaming has a strict rule. The HTML comes in the order of the document. If the browser gets the header first, then the sidebar, and finally the main content, it parses those chunks in that order. If a slow database query blocks a chunk of the page early on, the next chunk often has to wait until it's ready on the server.

JavaScript frameworks have been solving this problem for years. Server-rendering frameworks handle shell, suspense boundaries, loading state, and late content streaming. Some frameworks use inline script to patch the existing DOM. Libraries like HTMX allow developers to update parts of a page with server-generated HTML.

But these solutions require JavaScript somewhere. Declarative Partial Updates raise a different question. What if HTML had its own way of saying,

> When this content comes in, put it there?

That's the idea behind Chrome's declarative partial updates proposal.

In this article, you'll learn what problems declarative partial updates aim to solve, how the proposed placeholder syntax works, how out-of-order HTML streaming differs from normal streaming, how the related JavaScript HTML insertion APIs fit in, and why it should be considered an experimental feature of the browser rather than production-ready HTML.

---

## What Problem Declarative Partial Updates Try to Solve

Consider a product page. The server already knows the page title, navigation, footer, and product details. But the recommendations section requires a slow database query. With traditional server-rendered HTML, you have two common options:

- First, the server waits until everything is ready, then sends a full HTML response. This keeps the code simple, but the user waits a long time before seeing anything useful.
- Second, the server streams the HTML in stages. It sends the top of the page first, then sends the rest as it's ready. This seems to improve performance, because the browser starts rendering before the full response is finished.

But streaming alone doesn't completely solve this problem. The browser still parses the HTML sequentially. If there's a slow recommendation block at the beginning of the document, the content after that block will wait behind it, unless you restructure the document, add JavaScript, or use a framework abstraction.

WICG Patching Explainer describes two limitations of traditional HTML streaming:

1. HTML content is streamed in DOM order.
2. After the initial document parsing step, streaming is no longer as active as before.

Declarative partial update attempts to relax the first limitation. It allows the server to first send a placeholder and then send the actual content in the response. The browser applies that next content over the previous placeholder. This patch doesn't require any custom client-side DOM patching code.

![Diagram showing traditional HTML streaming.](https://cdn.hashnode.com/uploads/covers/684c97407a181815db5e3102/69771a7d-a657-47ee-be94-9a2d771bcbe8.png)

In the above diagram, the server sends HTML chunks in sequence. The browser can render early chunks before the response ends, but the rendered order still follows the response order.

---

## How Traditional HTML Streaming Works

Before studying the proposal, you need to understand its basic structure. A server sends an HTTP response body. That body contains HTML. The browser reads the response as soon as it arrives. It doesn't need to wait for the entire response body to parse the first tags.

Here's a tiny Node.js example:

```js
import http from "node:http";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const server = http.createServer(async (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
    });

    res.write(`
    <!doctype html>
    <html>
      <head>
        <title>Normal HTML Streaming</title>
      </head>
      <body>
        <h1>Normal HTML Streaming</h1>
        <p>This part arrives first.</p>
  `);

    await sleep(2000);

    res.write(`
        <p>This part arrives after two seconds.</p>
  `);

    await sleep(2000);

    res.end(`
        <p>This part arrives after four seconds.</p>
      </body>
    </html>
  `);
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
```

This example creates a small HTTP server using Node's built-in `http` module. When you visit the page, the server sends a response in three separate HTML chunks.

The first `res.write()` immediately sends the document shell, title, and first paragraph. Then `sleep(2000)` pauses the server for two seconds before the next `res.write()` sends another paragraph. After another pause, `res.end()` sends the last paragraph and closes the HTML document.

The browser starts rendering the first chunk before the entire response is complete, then adds subsequent paragraphs as more HTML arrives.

This demonstrates that simple HTML streaming works, but the content is displayed in the same order that the server sends it.

Now open this page in a browser.

```plaintext
http://localhost:3000
```

You'll see the first part of the page before the entire response is complete. As the server sends more chunks, the browser continues to load.

This behavior is old and functional. But notice its structure. The server writes the first paragraph, then the second paragraph, and then the third paragraph. The browser receives them in the same order. It also places them in the DOM in the same order.

Traditional streaming lets you send previous content first. But it doesn't give you a native way to say that this next chunk will be inside a previous placeholder. Declarative partial updates target that missing part.

---

## Why Frameworks Already Work Around This Problem

Modern frameworks already create experiences where parts of a page are rendered as they're ready. React server components and suspense-based server rendering are common examples. A framework can first send a shell, show a fallback, and then stream the full content later.

But the browser doesn't understand a React boundary as native HTML. The framework has to encode its own protocol. As the WICG patching explainer notes, React uses inline `<script>` tags to stream content out of order and modify the already parsed DOM.

This works because JavaScript has full DOM access. But it also means that the browser isn't applying the update as normal HTML. A framework runtime or framework-generated script participates in this patching.

HTMX solves a related class of problems in another way. It allows you to request server-rendered HTML and swap parts of the page. This model is practical and popular, but it still relies on a JavaScript library.

Astro popularized the islands architecture, where independently interactive parts of a page are essentially contained within a static HTML document. Chrome's article on Declarative Partial Updates mentions the island architecture as a use case for this proposal.

Declarative Partial Updates doesn't replace those tools. It proposes a low-level browser primitive. Frameworks can later adopt this primitive. Server-rendered apps can also use it directly in simpler cases.

The key change is this: instead of sending JavaScript that finds a DOM node and modifies it, the server sends HTML that declares where the node is located.

---

## What Declarative Partial Updates Add to HTML

Chrome's proposal has two main parts:

- The first part is HTML placeholders and out-of-order streaming using the `<template>` patch.
- The second part is a new set of JavaScript methods for inserting and streaming HTML into existing documents.

Chrome's announcement states that these APIs are ready for developers to test starting in Chrome 148 using the Experimental Web Platform Features flag. This status is important. It's not currently a stable cross-browser HTML. It's an active proposal and implementation test.

For the declarative streaming part, the proposal uses two HTML concepts:

1. Processing instruction placeholders.
2. The `<template>` element with the `for` attribute.

A simplified example looks like this:

```html
<div><?marker name="profile-card"></div>

<template for="profile-card">
    <article>
        <h2>Ada Lovelace</h2>
        <p>Mathematician and early computing pioneer.</p>
    </article>
</template>
```

The placeholder marks a location. The template contains the content. When the browser parses the template, it finds the matching placeholder and applies the template content there. After parsing, the final DOM behaves like this:

```html
<div>
    <article>
        <h2>Ada Lovelace</h2>
        <p>Mathematician and early computing pioneer.</p>
    </article>
</div>
```

The server sent the placeholder first and the actual content later. The browser combined them declaratively. That's the basic idea. The HTML gets a native patching instruction without any custom scripts.

![Diagram showing Declarative Partial Updates](https://cdn.hashnode.com/uploads/covers/684c97407a181815db5e3102/3dbabe3a-5dc3-4627-8641-138a64af2291.png)

In the diagram above, the browser receives and parses the placeholders first. Subsequent templates target those placeholders, so the rendered page updates specific areas without appending all the late HTML at the bottom.

---

## How Marker Placeholders Work

The simplest placeholder is `<?marker>`. A marker refers to a place in a document where HTML code will appear later. Here's a small example from the proposed model:

```html
<section>
    <h2>Team</h2>

    <ul>
        <?marker name="team-members">
    </ul>
</section>

<template for="team-members">
    <li>Ada Lovelace</li>
</template>
```

The `name` attribute of the marker connects it to the `for` attribute of the template. When the browser parses the template, it finds the marker named `team-members` and inserts the template content at the location of that marker.

The final DOM behaves like this:

```html
<section>
    <h2>Team</h2>

    <ul>
        <li>Ada Lovelace</li>
    </ul>
</section>
```

While this may seem simple, timing is important. The placeholder can come at the beginning of the response. The template can come later. This means that the browser can render a working shell first, then patch that specific location when the server sends the delayed content.

This is different from normal streaming, where the next HTML document is displayed later in the order. A marker specifies a target for the next HTML.

### Why Processing Instructions Matter

The placeholder syntax may look unusual if you mostly write HTML.

```html
<?marker name="profile">
```

This is similar to the XML Processing Instruction syntax. MDN explains that processing instructions exist in the DOM, but are currently treated as comments in HTML documents. The Declarative Partial Updates proposal gives browser-level meaning to selected processing instructions for HTML patching. This is why this feature requires browser support.

In current stable HTML, writing `<?marker name="profile">` doesn't create a patch point in all browsers. Without support, it treats content as ignored markup or comments. So you should consider this syntax as a recommended behavior, not as established HTML behavior.

---

## How Start and End Range Placeholders Work

A single marker gives you an insertion point. But many UI updates need to replace a whole region.

For example, a page might show a loading message first:

```html
<section>
  <h2>Recommendations</h2>

  <?start name="recommendations">
    <p>Loading recommendations...</p>
  <?end>
</section>
```

Later, the server sends the real content:

```html
<template for="recommendations">
  <ul>
    <li>Advanced CSS Layouts</li>
    <li>Modern HTML APIs</li>
    <li>Web Performance Basics</li>
  </ul>
</template>
```

The browser replaces the range between `<?start>` and `<?end>` with the template content.

The final DOM behaves like this:

```html
<section>
  <h2>Recommendations</h2>

  <ul>
    <li>Advanced CSS Layouts</li>
    <li>Modern HTML APIs</li>
    <li>Web Performance Basics</li>
  </ul>
</section>
```

This is near a loading boundary. The document starts with the necessary fallback content. The server finishes the slow work later. When the appropriate template arrives, the browser replaces the fallback.

The `<?end>` processing directive in the explainer is optional, but it makes the examples easier to understand. Use it when teaching or testing the feature.

### Marker Versus Range

Use markers to add content at a specific location. Use a start and end range to replace temporary content.

That means, add something here:

```html
<ul>
  <?marker name="new-item">
</ul>
```

This says, replace this whole loading region later:

```html
<div>
  <?start name="profile">
  <p>Loading profile...</p>
  <?end>
</div>
```

The second method is more suitable for real interfaces, as users see meaningful fallback content while they wait.

---

## How Multiple Updates Work

A placeholder doesn't have to be just an update. A server can send a patch, leave another marker, and then send another patch later. This is important for lists, feeds, notifications, logs, comments, and search results.

Here's a simplified example:

```html
<ul>
  <?marker name="messages">
</ul>

<template for="messages">
  <li>First message</li>
  <?marker name="messages">
</template>

<template for="messages">
  <li>Second message</li>
  <?marker name="messages">
</template>

<template for="messages">
  <li>Third message</li>
</template>
```

The final DOM behaves like this:

```html
<ul>
  <li>First message</li>
  <li>Second message</li>
  <li>Third message</li>
</ul>
```

Each patch adds content and creates the next outlet. This model is suitable for streaming data, where the server finds the results over time.

Think of a search page. The server finds the first result quickly. The second result requires another service call. The third result requires a database lookup.

Traditional HTML streaming places each result where it appears in the response. Declarative patching allows each result to target a known outlet in the document. This doesn't mean that every list should use this feature. It means that HTML will have a native primitive for this pattern.

---

## How Interleaved Updates Work

The most interesting part is interleaving.

Suppose a page has three regions:

1. A profile card.
2. A recommendations panel.
3. A notification list.

Each region requires different server management. The profile card is ready after one second. Notifications are ready after two seconds. Recommendations are ready after four seconds. In simple streaming, the order of your documents determines what the user sees first.

With declarative patching, the server sends placeholders early:

```html
<main>
  <section>
    <h2>Profile</h2>
    <?start name="profile">
    <p>Loading profile...</p>
    <?end>
  </section>

  <section>
    <h2>Recommendations</h2>
    <?start name="recommendations">
    <p>Loading recommendations...</p>
    <?end>
  </section>

  <section>
    <h2>Notifications</h2>
    <?start name="notifications">
    <p>Loading notifications...</p>
    <?end>
  </section>
</main>
```

Then the server sends templates in readiness order, not visual order:

```html
<template for="profile">
  <p>Ada Lovelace</p>
</template>

<template for="notifications">
  <ul>
    <li>You have one new message.</li>
  </ul>
</template>

<template for="recommendations">
  <ul>
    <li>Modern HTML APIs</li>
    <li>Streaming Web Apps</li>
  </ul>
</template>
```

The browser patches each target region. The user gets the profile first, the notification second, and the recommendations third, although in the main document structure the recommendations appear before the notifications.

This is why 'out-of-order streaming' is the key. The HTML response comes in as a stream. But the rendered update doesn't have to follow the same visual order as the response chunks.

The WICG Explainer describes interleaved patching across different outlets. This is one of the strongest reasons this proposal matters. It gives browser-native HTML a behavior developers usually associate with framework-level streaming.

---

## How This Compares to React, HTMX, Astro, and PHP

This feature will allow for comparisons. These comparisons can help you understand the main idea, but can also be confusing if you go too deep.

### React

React server rendering already supports streaming UI and fallback state. But the rendering model is React's own. When React needs to patch late-added content to an already parsed document, it uses framework-generated directives and JavaScript.

Declarative Partial Updates bring a low-level part of this concept to HTML. It doesn't replace React's component model, state model, event handling, reconciliation, or ecosystem.

### HTMX

HTMX allows you to request HTML from the server and replace it on the page. It's conceptually close, because it treats HTML as the main response format. But HTMX is a JavaScript library.

The goal of declarative partial updates is to make some HTML patching behavior a feature of the browser itself. HTMX still handles many interaction patterns beyond this proposal.

### Astro

Astro popularized island-based rendering. A page can consist of mostly static HTML and isolated interactive regions. Chrome cites island architecture as a use case, because independent regions of a page are often rendered at different times.

Declarative partial updates can help servers serve island HTML as each region is rendered.

### PHP

Its syntax may remind you of PHP, as server-side code and HTML have been used together for decades. But this proposal is not PHP inside the browser.

PHP runs on the server. Declarative partial updates are the browser's parsing behavior for streamed HTML. A useful workflow comparison can be made with it.

It makes it easier to stream server-generated HTML to specific locations on the page without having to send a separate JavaScript patch for each update.

---

## How the JavaScript HTML Insertion APIs Fit In

Declarative placeholders solve part of the problem. They help the browser patch the streamed HTML to a previous location in the same document.

But not every update comes as part of the original HTML response. Many apps fetch HTML after the page has loaded.

For example, a page might fetch:

- A comments section
- A cart summary
- A profile dropdown
- A notification panel
- A search result preview

Today, JavaScript has several ways to insert HTML into a document:

```js
element.innerHTML = "<p>Hello</p>";
element.outerHTML = "<section>Hello</section>";
element.insertAdjacentHTML("beforeend", "<p>Hello</p>");
```

These APIs work, but they don't behave the same way.

- Some replace content.
- Some insert beside content.
- Some parse in a specific context.
- Some interact with sanitization and security rules differently.

Chrome's declarative partial updates work also includes a revamped set of HTML insertion and streaming APIs, aiming to create a more explicit naming convention for common insertion patterns.

Here's the basic idea:

| Action | Static method | Streaming method |
| --- | --- | --- |
| Replace an element's children | `setHTML()` | `streamHTML()` |
| Replace the element itself | `replaceWithHTML()` | `streamReplaceWithHTML()` |
| Insert before the element | `beforeHTML()` | `streamBeforeHTML()` |
| Insert as first child | `prependHTML()` | `streamPrependHTML()` |
| Insert as last child | `appendHTML()` | `streamAppendHTML()` |
| Insert after the element | `afterHTML()` | `streamAfterHTML()` |

The names tell you where the HTML goes. That's the main improvement.

Instead of remembering how `innerHTML`, `outerHTML`, `insertAdjacentHTML`, and `createContextualFragment()` differ, the method name describes the action.

### Static Insertion

A static method accepts a complete HTML string.

```js
const card = document.querySelector("#profile-card");

card.setHTML(`
  <article>
    <h2>Ada Lovelace</h2>
    <p>Mathematician and early computing pioneer.</p>
  </article>
`);
```

`setHTML()` parses the string, sanitizes it, and inserts the result into the element.

MDN describes `setHTML()` as an XSS-safe way to parse and sanitize an HTML string before including it in the DOM. This is safer than assigning untrusted HTML to `innerHTML`.

### Streaming Insertion

The streaming method doesn't require the entire HTML string to begin with. It creates a writable stream. Then JavaScript writes fragments to that stream.

A simplified example looks like this:

```js
const output = document.querySelector("#output");
const writer = output.streamHTMLUnsafe().getWriter();

await writer.write("<p>First streamed chunk</p>");
await writer.write("<p>Second streamed chunk</p>");
await writer.close();
```

This model is important because streaming is one of the strengths of HTML. The browser doesn't always have to wait for a complete response before inserting meaningful markup.

Chrome also shows this pattern with `fetch()`:

```js
const output = document.querySelector("#output");
const response = await fetch("/comments");

response.body
    .pipeThrough(new TextDecoderStream())
    .pipeTo(output.streamHTMLUnsafe());
```

Here, the response body streams from the network. `TextDecoderStream` converts bytes into text. The result pipes into the element's HTML stream.

### Why the Unsafe Name Matters

Some methods have `Unsafe` versions.

For example:

```js
setHTMLUnsafe();
streamHTMLUnsafe();
appendHTMLUnsafe();
streamAppendHTMLUnsafe();
```

The name is intentional. MDN warns that `setHTMLUnsafe()` parses the input as HTML and writes the result to the DOM. If you don't pass a sanitizer, no sanitizer is used.

Use the safe versions for untrusted content. Consider the unsafe versions as a low-level tool, especially in cases where you have full control over the HTML source or pass an appropriate sanitizer.

For the demo in this article, keep the user input away from the HTML string. The goal is to teach streaming behavior, not unsafe HTML insertion.

![Diagram showing two partial update models](https://cdn.hashnode.com/uploads/covers/684c97407a181815db5e3102/b4a23dc7-6eb5-4eab-b481-09849f3eb97c.png)

In the diagram above, declarative patching begins within the streamed document. JavaScript streaming insertion begins after the script code selects an element and pipes a streamed response into it.

---

## How to Build a Small Node.js Streaming Demo

Now let's build a small demo.

You will create one Node.js server with three routes:

| Route | Purpose |
| --- | --- |
| `/normal-stream` | Shows regular in-order HTML streaming |
| `/partial-updates-demo` | Shows proposed declarative partial update syntax |
| `/stream-html-api-demo` | Shows JavaScript streaming insertion syntax |

The demo uses Node's built-in `http` module.

- No Express.
- No frontend framework.
- No build step.

That keeps the focus on HTML streaming.

### Create the Project

Create a new folder:

```sh
mkdir html-partial-updates-demo
cd html-partial-updates-demo
```

Create a <VPIcon icon="iconfont icon-json"/>`package.json` file:

```json title="package.json"
{
    "name": "html-partial-updates-demo",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
        "dev": "node server.js"
    }
}
```

Create a <VPIcon icon="fa-brands fa-js"/>`server.js` file:

```js :collapsed-lines title="server.js"
import http from "node:http";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const server = http.createServer(async (req, res) => {
    if (req.url === "/normal-stream") {
        return normalStream(req, res);
    }

    if (req.url === "/partial-updates-demo") {
        return partialUpdatesDemo(req, res);
    }

    if (req.url === "/stream-html-api-demo" || req.url === "/comments-stream") {
        return streamHtmlApiDemo(req, res);
    }

    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
    });

    res.end(`
    <!doctype html>
    <html>
      <head>
        <title>HTML Partial Updates Demo</title>
      </head>
      <body>
        <h1>HTML Partial Updates Demo</h1>

        <ul>
          <li><a href="/normal-stream">Normal HTML streaming</a></li>
          <li><a href="/partial-updates-demo">Declarative partial updates demo</a></li>
          <li><a href="/stream-html-api-demo">Streaming HTML API demo</a></li>
        </ul>
      </body>
    </html>
  `);
});

async function normalStream(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
    });

    res.write(`
    <!doctype html>
    <html>
      <head>
        <title>Normal HTML Streaming</title>
      </head>
      <body>
        <h1>Normal HTML Streaming</h1>

        <p>This paragraph arrives immediately.</p>
  `);

    await sleep(1500);

    res.write(`
        <p>This paragraph arrives after 1.5 seconds.</p>
  `);

    await sleep(1500);

    res.end(`
        <p>This paragraph arrives after 3 seconds.</p>

        <p>
          <a href="/">Back to home</a>
        </p>
      </body>
    </html>
  `);
}

async function partialUpdatesDemo(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
    });

    res.write(`
    <!doctype html>
    <html>
      <head>
        <title>Declarative Partial Updates Demo</title>
        <style>
          body {
            font-family: system-ui, sans-serif;
            max-width: 760px;
            margin: 40px auto;
            line-height: 1.5;
          }

          section {
            border: 1px solid #ddd;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
          }

          .loading {
            color: #666;
          }
        </style>
      </head>
      <body>
        <h1>Declarative Partial Updates Demo</h1>

        <p>
          This page sends placeholders first. Then the server sends
          matching templates when each piece of content is ready.
        </p>

        <section>
          <h2>Profile</h2>
          <?start name="profile">
            <p class="loading">Loading profile...</p>
          <?end>
        </section>

        <section>
          <h2>Recommendations</h2>
          <?start name="recommendations">
            <p class="loading">Loading recommendations...</p>
          <?end>
        </section>

        <section>
          <h2>Notifications</h2>
          <?start name="notifications">
            <p class="loading">Loading notifications...</p>
          <?end>
        </section>
  `);

    await sleep(1000);

    res.write(`
        <template for="profile">
          <p><strong>Ada Lovelace</strong></p>
          <p>Mathematician and early computing pioneer.</p>
        </template>
  `);

    await sleep(1000);

    res.write(`
        <template for="notifications">
          <ul>
            <li>You have one new message.</li>
            <li>Your weekly report is ready.</li>
          </ul>
        </template>
  `);

    await sleep(2000);

    res.end(`
        <template for="recommendations">
          <ul>
            <li>Modern HTML APIs</li>
            <li>Streaming Web Apps</li>
            <li>Web Performance Basics</li>
          </ul>
        </template>

        <p>
          <a href="/">Back to home</a>
        </p>
      </body>
    </html>
  `);
}

async function streamHtmlApiDemo(req, res) {
    if (req.url === "/comments-stream") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });

        res.write(`<article><p>First streamed comment.</p></article>`);

        await sleep(1000);

        res.write(`<article><p>Second streamed comment.</p></article>`);

        await sleep(1000);

        return res.end(`<article><p>Third streamed comment.</p></article>`);
    }

    res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
    });

    res.end(`
    <!doctype html>
    <html>
      <head>
        <title>Streaming HTML API Demo</title>
      </head>
      <body>
        <h1>Streaming HTML API Demo</h1>

        <button id="load-comments">Load comments</button>

        <section id="comments"></section>

        <p>
          <a href="/">Back to home</a>
        </p>

        <script>
          const button = document.querySelector("#load-comments")
          const comments = document.querySelector("#comments")

          button.addEventListener("click", async () => {
            const response = await fetch("/comments-stream")

            response.body
              .pipeThrough(new TextDecoderStream())
              .pipeTo(comments.streamHTMLUnsafe())
          })
        </script>
      </body>
    </html>
  `);
}

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
```

This file creates the main demo server. It imports Node's built-in `http` module, then defines a small `sleep()` helper for delayed streaming, and then creates an HTTP server with three planned routes.

When the request URL matches `/normal-stream`, `/partial-updates-demo`, or `/stream-html-api-demo`, the server passes the request to the corresponding function. If the user visits the root page, the server returns a simple HTML page with links to the three demos.

Finally, `server.listen(3000)` starts the server on port `3000`, so you can open the demo in your browser at `http://localhost:3000`.

Run the server:

```sh
npm run dev
```

Then open in browser:

```plaintext
http://localhost:3000
```

You now have three demos.

### Test the Normal Streaming Route

Open this route:

```plaintext
http://localhost:3000/normal-stream
```

Watch the browser.

- The first paragraph appears early.
- The second paragraph appears later.
- The third paragraph appears last.

This is useful, but it's still in-order streaming. The browser renders in the same order the server sends.

### Test the Declarative Partial Updates Route

Open this route:

```plaintext
http://localhost:3000/partial-updates-demo
```

In a browser that supports the experimental feature, the page first shows three loading regions.

- After one second, the profile region updates.
- After another second, the notifications region updates.
- After two more seconds, the recommendations region updates.

Notice the order. The recommendation section appears before the notification in the document. But the server sends the notification template before the recommendation template.

That's the point. The document structure and streaming order no longer need to be the same. The browser uses the `for` attribute on each `<template>` to find the matching processing instruction placeholder.

This example demonstrates the basic idea behind out-of-order HTML streaming.

### Test the Streaming HTML API Route

Open this route:

```plaintext
http://localhost:3000/stream-html-api-demo
```

Click the button.

- The browser fetches `/comments-stream`.
- The server sends comment HTML in chunks.
- The client pipes the streamed response body into the `#comments` element.

This isn't the same as declarative placeholder patching. Here, JavaScript starts the request and chooses the target element.

The new API improves how JavaScript inserts streamed HTML. The placeholder syntax improves how HTML itself declares later patches during document streaming. Keep those two ideas separate. They're related, but they solve different parts of the partial update story.

---

## Browser Support and Current Status

Declarative Partial Updates are experimental. Chrome says these APIs are ready for developer testing from Chrome 148 through the experimental web platform features flag.

That means you should read this proposal as active platform work, not as stable production HTML.

To test native behavior in Chrome, enable this flag:

```plaintext
chrome://flags/#enable-experimental-web-platform-features
```

Then restart the browser. The Blink developer thread describes the feature as a way to stream HTML content out of order and update an existing document with a stream of encoded patches.

The proposal also has a WICG explainer and a WHATWG HTML pull request.

That tells you where the proposal sits:

1. It has a real implementation path in Chrome.
2. It has an explainer in WICG.
3. It has standardization discussion in WHATWG.
4. It's not a finished cross-browser standard yet.

So Declarative Partial Updates are a proposed set of browser APIs for native HTML patching and streaming. Chrome has made them available for developer testing behind a flag.

---

## Security, Sanitization, and Sharp Edges

Partial updates may sound simple. But there are always security risks when adding HTML to a document.

HTML isn't just plain text. It can contain links, forms, event handlers, scripts, custom elements, and other elements that are parsed by the browser. So the source of the HTML is important.

If your server streams trusted HTML generated by your own template, the type of risk is different from the type of risk of adding HTML sent from a user's comments, profile, or chat message.

### Template Scope

Chrome's article mentions an important restriction for `<template for>`. A template only updates processing instructions within the same parent element. Adding `<template for>` directly to the `<body>` gives it access to the whole document, including the `<head>`. That behavior is powerful, so you should understand the scope before designing around it.

The main point is simple: Don't assume a late template should patch any placeholder anywhere without rules. The patch target is scoped for security and predictability.

### Dynamic Insertion Has Different Behavior

There's another sharp edge. If you insert a chunk of HTML dynamically using an API like `setHTML()` or `innerHTML`, the browser parses that HTML inside an intermediate fragment first.

That means declarative patching applies inside that parsed fragment. It doesn't automatically search the whole existing document and update old placeholders outside the fragment. This distinction matters because document streaming and dynamic HTML insertion aren't the same process.

### Safe and Unsafe HTML APIs

The JavaScript insertion APIs also separate safer and lower-level methods.

- `setHTML()` sanitizes the input before inserting it.
- `setHTMLUnsafe()` is lower level.

MDN says `setHTML()` should almost always be preferred where supported because it always removes XSS-unsafe HTML entities.

So the rules are simple:

- Use safe APIs for untrusted content.
- Treat unsafe APIs as advanced tools for trusted HTML or carefully sanitized HTML.
- Never stream user-controlled HTML into the DOM without a sanitization strategy.

---

## What This Means for Web Developers

Declarative Partial Updates matter because they move a common framework pattern closer to the web platform. For years, developers have built partial update systems with JavaScript:

- Fetch HTML.
- Find a DOM node.
- Replace its content.
- Keep loading states in sync.
- Avoid breaking event handlers.
- Handle errors.
- Handle security.

Frameworks and libraries improve this workflow. But the browser still lacks a small native language for saying: This late HTML belongs in that earlier placeholder. Declarative Partial Updates provide that language.

This doesn't mean JavaScript disappears. You still need JavaScript for interactivity, state, event handling, client-side data flows, and many app behaviors. This also doesn't mean frameworks disappear. React, HTMX, Astro, and similar tools solve larger problems than DOM patching.

The more realistic outcome is this:

- Frameworks and server-rendered tools may eventually use these primitives internally.
- Smaller server-rendered apps may use them directly for simple loading regions.
- Browsers may gain a cleaner, lower-level mechanism for streaming HTML into exact locations. That's the important part.

The proposal doesn't make HTML a full app framework. It gives HTML a better streaming patch primitive.

---

## When This Feature Would Help

Declarative Partial Updates fit pages where the server knows the layout early but some sections finish later.

Good examples include:

- Product pages with slow recommendation blocks.
- Dashboards with independent data cards.
- Search pages where results arrive from multiple services.
- Documentation sites with heavy navigation or menus.
- Profile pages with separate activity, stats, and notification regions.
- Server-rendered apps that want loading states without client-side patch scripts.

The most suitable is server-generated HTML. If your app already renders everything on the client, this proposal won't change your architecture much.

If your app emphasizes fast first renders, progressive streaming, low JavaScript overhead, and server-rendered UIs, this proposal becomes even more attractive.

---

## When You Should Avoid It Today

You should avoid production reliance on Declarative Partial Updates today.

Use it for:

- Learning.
- Local demos.
- Browser experiments.
- Framework research.
- Progressive enhancement experiments.

Don't use this as the only path for important production UIs yet. Browser support isn't yet widespread enough. The recommendation may still change. Tooling isn't mature yet. Most users won't leave the experimental flag enabled. If you're experimenting with it, create a fallback.

For example, placeholders should still make sense on the server-rendered page even if they're not patched natively. Or, you should use a small JavaScript fallback in your app until browser support improves.

---

## Conclusion

HTML streaming is old. Out-of-order HTML patching is the new idea. Traditional streaming lets the browser render chunks as they arrive, but the document still follows the order of the response.

Declarative Partial Updates propose a native way to place late HTML into earlier placeholders.

The core syntax is small:

```html
<?marker name="target">

<template for="target">
    <p>Late content</p>
</template>
```

For loading regions, the syntax uses a range:

```html
<?start name="target">
<p>Loading...</p>
<?end>

<template for="target">
    <p>Real content</p>
</template>
```

This gives HTML a browser-native patching model. It also opens the door for less custom JavaScript in some server-rendered streaming interfaces. But this is still experimental. The best way to think about Declarative Partial Updates is not HTML replaces frameworks.

A better way is this: HTML is gaining a low-level primitive that frameworks and server-rendered apps have needed for years.

If the proposal moves forward, web developers may get a cleaner way to build fast, progressively rendered pages where the server streams content as soon as each part is ready.

---

## **Final Words**

If you found the information here valuable, feel free to share it with others who might benefit from it.

I’d really appreciate your thoughts – mention me on X [<VPIcon icon="fa-brands fa-youtube"/>@sumit_analyzen (<VPIcon icon="fa-brands fa-x-twitter"/>`sumit_analyzen`)](https://x.com/sumit_analyzen) or on Facebook [<VPIcon icon="fa-brands fa-youtube"/>@sumit.analyzen](https://facebook.com/sumit.analyzen), [<VPIcon icon="fa-brands fa-youtube"/>watch my coding tutorials](https://youtube.com/@logicBaseLabs), or simply [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`sumitanalyzen`)](https://linkedin.com/in/sumitanalyzen/).

You can also checkout my official website [www.sumitsaha.me](http://www.sumitsaha.me) for more details about me.

---

## Sources

- [<VPIcon icon="fa-brands fa-chrome"/>Declarative Partial Updates, Chrome for Developers](https://developer.chrome.com/blog/declarative-partial-updates)
- [WICG Declarative Partial Updates Repository (<VPIcon icon="iconfont icon-github"/>`WICG/declarative-partial-updates`)](https://github.com/WICG/declarative-partial-updates)
- [WICG Patching Explainer (<VPIcon icon="iconfont icon-github"/>`WICG/declarative-partial-updates`)](https://github.com/WICG/declarative-partial-updates/blob/main/patching-explainer.md)
- [<VPIcon icon="fa-brands fa-google"/>Blink Dev, Ready for Developer Testing, Declarative Document Patching](https://groups.google.com/a/chromium.org/g/blink-dev/c/XHv8xd3MBdQ)
- [Chrome Platform Status, Declarative Document Patching](https://chromestatus.com/feature/5111042975465472)
- [WHATWG HTML Pull Request for Template Patching (<VPIcon icon="iconfont icon-github"/>`whatwg/html`)](https://github.com/whatwg/html/pull/11818)
- [<VPIcon icon="fa-brands fa-firefox"/>MDN, ProcessingInstruction](https://developer.mozilla.org/en-US/docs/Web/API/ProcessingInstruction)
- [<VPIcon icon="fa-brands fa-firefox"/>MDN, HTML Template Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/template)
- [<VPIcon icon="fa-brands fa-firefox"/>MDN, Element.setHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML)
- [<VPIcon icon="fa-brands fa-firefox"/>MDN, Element.setHTMLUnsafe](https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTMLUnsafe)
- [<VPIcon icon="fa-brands fa-firefox"/>MDN, HTML Sanitizer API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Declarative Partial Updates Work in HTML",
  "desc": "HTML has always supported streaming. The server doesn't need to build an entire page in memory before sending it to the browser. It can send the initial HTML first, then send more chunks as each chunk",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-declarative-partial-updates-work-in-html.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
