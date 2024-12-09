---
lang: en-US
title: "Understand How Express.js Works by Building Your Own Server Multiplexer from Scratch"
description: "Article(s) > Understand How Express.js Works by Building Your Own Server Multiplexer from Scratch"
icon: fa-brands fa-node
category:
  - Node.js
  - C++
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - c++
  - cpp
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Understand How Express.js Works by Building Your Own Server Multiplexer from Scratch"
    - property: og:description
      content: "Understand How Express.js Works by Building Your Own Server Multiplexer from Scratch"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/understand-how-expressjs-works-by-building-your-own-server-multiplexer-from-scratch.html
prev: /programming/js-node/articles/README.md
date: 2024-10-03
isOriginal: false
author: Sifundo
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/urBiLDuUhMU/upload/65f541a7f0d11691008b4e93d89f2d29.jpeg
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

```component VPCard
{
  "title": "C++ > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cpp/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Understand How Express.js Works by Building Your Own Server Multiplexer from Scratch"
  desc="Kata Machines have become the go-to method for mastering tough concepts, and it's hard to find a better tool for deliberate practice. If you haven’t come across a kata yet, trust me—you will soon enough. There’s a reason why developers love katas, wh..."
  url="https://freecodecamp.org/news/understand-how-expressjs-works-by-building-your-own-server-multiplexer-from-scratch"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/urBiLDuUhMU/upload/65f541a7f0d11691008b4e93d89f2d29.jpeg"/>

Kata Machines have become the go-to method for mastering tough concepts, and it's hard to find a better tool for deliberate practice.

If you haven’t come across a kata yet, trust me—you will soon enough.

There’s a reason why developers love katas, whether they use them to sharpen their skills for personal projects or prepare for interviews.

A kata is all about **deliberate** practice. It comes from martial arts like Karate and Judo, and, according to Wikipedia, it’s defined as a pre-determined sequence of movements, techniques, and patterns that follow a specific order (source: [<FontIcon icon="fa-brands fa-wikipedia-w"/>wikipedia](https://en.wikipedia.org/wiki/Kata)).

Kata Machines come from this idea: learning through drills and deliberate, conscious (choreographed) practice.

I realized just how perfect katas are when I was learning Haskell back in the day. If you know, you know. Haskell was a beast to learn for me back then!

So, I thought, why not do the same for the backend? Just pick one high-level concept, and drill down on it repeatedly and deliberately to its core and first principles.

In this article, I picked server-side frameworks. We're going to pick apart the idea of a "framework" using Express as an example.

We’re going to take high-level Express:

```js
const express = require("express");

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => console.log("Server listening on port:", PORT));
```

And drill all the way down, repeatedly, until we touch Node.js native code:

```js
void TCPWrap::New(const FunctionCallbackInfo<Value>& args) {
  CHECK(args.IsConstructCall());
  CHECK(args[0]->IsInt32());
  Environment* env = Environment::GetCurrent(args);
  int type_value = args[0].As<Int32>()->Value();
  TCPWrap::SocketType type = static_cast<TCPWrap::SocketType>(type_value);
  ProviderType provider;
  switch (type) {
    case SOCKET:
      provider = PROVIDER_TCPWRAP;
      break;
    case SERVER:
      provider = PROVIDER_TCPSERVERWRAP;
      break;
    default:
      UNREACHABLE();
  }
  new TCPWrap(env, args.This(), provider);
}
```

And having gained this new intuition, we’ll build back up with a custom "Express" implementation:

```js
function serverMux() {
  function hook(req, res) {
    // To be implemented
  }
  return {
    hook
  };
}

const app = serverMux();

const server = http.createServer((req, res) => {
  app.hook(req, res);
});
```

It’s going to be quite the journey – and a rewarding one at that!

I'm assuming you have some backend knowledge and classify yourself as an advanced beginner who’s looking to level up.

If that sounds like you, we’re ready to proceed.

---

## Form 1: Server-Side Frameworks

The term "server-side framework" is broad. Think about it: `mysql2` could be considered a framework depending on how you classify frameworks and libraries. Even <FontIcon icon="fa-brands fa-js"/>`sharp.js` for image editing could fit under the umbrella of server-side frameworks, right?

But the question is, what type of framework is Express.js?

Express is a multiplexer—specifically, a server multiplexer (server mux). I promise, the term isn’t as complex as it sounds. The implementation, though—that’s a whole different story.

In simple terms, a server mux is a router. Of course, Express and other server muxes handle more than just routing, but that’s the core idea.

Express takes in `request` and `response` objects from the server and routes them. Don’t worry, we’ll dive into routing soon.

Here’s an interesting point: if Express isn’t the server, then what exactly is the server?

To answer that, we need to look at the Express.js source code, which you can clone from GitHub:

```sh
git clone https://github.com/expressjs/express.git
```

Once you’re set, we can dive right in with our first deep dive.

### First Drill: Unpacking Express.js

Open your Express source code in an editor. You’ll find the entry file <FontIcon icon="fa-brands fa-js"/>`express.js` in the <FontIcon icon="fas fa-folder-open"/>`lib` folder.

You can skim the file, but we’re going to focus on lines 42 and 43—the heart of it all:

```js
mixin(app, EventEmitter.prototype, false);
mixin(app, proto, false);
```

What you’re looking at is object composition: a design pattern where an object is created by combining the properties and methods of other objects.

Our target object here is `proto`, which is imported from <FontIcon icon="fa-brands fa-js"/>`application.js`, the core of Express.

Let’s open that file. There’s a lot of code, but remember, our goal is to figure out where the server is within Express.

If there’s one function in Express that everyone likely knows, it’s `listen`. The essence of a server is to "listen" over a network. So, do a quick <kbd>Ctrl</kbd>+<kbd>F</kbd> for "listen," and you’ll find the definition on line 633:

```js
app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```

There it is, the famous `listen` function. Did we just find the server?

```js
var server = http.createServer(this);
```

We’ve already seen a version of this in the intro:

```js
const server = http.createServer((req, res) => {
  app.hook(req, res);
});
```

This confirms that Express is indeed a server mux, and the actual server is returned by the Node.js `createServer` function from the `http` package.

That’s some solid progress!

We’ve peeled back a layer, but we can go deeper. What exactly does `createServer` do, and what is this `server` object?

### The Server

A server is the basic unit of the backend. At its core, the concept is simple: how can two or more processes communicate over a network?

This is the fundamental idea behind network programming. We have devices equipped with IP addresses for identification and ports for data exchange over a network.

The communication itself is complex, which is where protocols come in to facilitate the process.

The most common protocols are UDP and TCP:

- **UDP** is a connectionless protocol and does not guarantee reliable communication, but allows for low-latency and efficient data transfer. This is ideal for time-sensitive applications such as video conferencing, online gaming, and voice over IP (VoIP) (source [<FontIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia](https://en.wikipedia.org/wiki/User_Datagram_Protocol)).
- **TCP** is a connection-oriented protocol with reliable, ordered, and error-checked data transmission between applications on networked devices. It’s a major part of internet applications (source [<FontIcon icon="fa-brands fa-wikipedia-w"/>Wikipedia](https://en.wikipedia.org/wiki/Transmission_Control_Protocol)).

TCP is the most widely used protocol due to its reliability, and most server-side applications you’ll work with, including Express, are TCP-based.

Although I love the quirks and power of UDP, we’ll focus on TCP, tracing its roots in Node.js.

We’ve already seen a glimpse of this:

```cpp
void TCPWrap::New(const FunctionCallbackInfo<Value>& args) {
  // some code
  new TCPWrap(env, args.This(), provider);
}
```

Before we dig into that, we need to answer a key question: What does it really mean to be a server process?

Without getting too deep into file descriptors, sockets, or network layers, a server is an OS-level object responsible for handling communication between nodes. When you call:

```js
const http = require("node:http");

const something = http.createServer({});
```

You’re creating an OS-level object, commonly known as a **socket**. This socket facilitates network communication between devices, along with handling data encoding and decoding.

In short, `createServer` abstracts and returns this socket object.

And, yes, we can implement this socket in Node.js. Remember, Node.js has native access to the OS, allowing JavaScript to function at the system level.

### The Socket in Node.js

Here’s some code that creates a server socket:

```js
// Using Node v20
const net = require('node:net');

const server = net.createServer((c) => {
  console.log('client connected', c.remoteAddress);
  c.write("Hello; world");

  c.on('end', () => {
    console.log('client disconnected');
  });
});

server.on('error', (err) => {
  throw err;
});

server.listen(3000, () => {
  console.log('server bound');
});
```

While `net.createServer((c)` is still a high-level abstraction like `http.createServer`, it returns the raw socket.

The `c` object represents the client that made the connection (dial). Beyond writing to it, we can do much more.

For instance, here’s a simple write operation:

```js
c.write("Hello world");
```

Our socket is running on `localhost:3000`. If you make a request (or use `curl`):

```sh
curl localhost:3000
```

The OS-level network stack encodes not only your data but also information about who you are and where to find you—in the form of a response, among other things.

This is what the server receives, and it’s important to know where to send the response (like IP, and so on).

So, the `c` object represents all of that!

We’ve covered a lot of the surface-level concepts, but before we wrap up this part, here’s a bonus challenge:

Try writing a class on the server to manage multiple connections. You could store these connections in a data structure and periodically send data to them while the connection remains open.

We’re about three layers deep now, but the journey isn’t over. Remember the goal?

Now it’s time to clone the Node.js source code. Don’t worry, we’ll only focus on the relevant parts.

```sh
git clone https://github.com/nodejs/node.git
```

### The Socket in Node.js Source Code

Let the tracing begin! Node.js is a massive codebase – it’s an entire engine that does way more than just handle sockets. But we only care about the networking part today.

First, navigate to the `lib` folder, and inside you’ll find a file called `net.js`. This is where most of the work happens for network applications. If you scroll down to line 210, you’ll see a familiar sight:

```sh
function createServer(options, connectionListener) {
  return new Server(options, connectionListener);
}
```

That’s it! Every time we create a server, it calls this function and returns a `Server` object. Anytime you see `new` in JavaScript, you should have a lightbulb moment—it means a new object or class (blueprint) is being created.

So we can trace and find the `Server` definition:

On line 1737

At first glance, it might seem like nothing special is happening. But JavaScript has a sneaky way of hiding complexity.

Here’s the thing: JavaScript is a prototype-based language. This means that objects can inherit features from other objects through prototypes. On line 1791, we see this in action:

```js
ObjectSetPrototypeOf(Server.prototype, EventEmitter.prototype);
```

In plain English: our `Server` object is inheriting all the behavior from other objects like `EventEmitter`, for example. This is a common pattern in JavaScript libraries – remember the mixin in Express?

At this point, if you’ve never worked with prototypes or Object-Oriented JavaScript (OOJS), this might feel like advanced territory. But don’t worry – the good folks at [<FontIcon icon="fa-brands fa-wikipedia-w"/>MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) have an excellent guide on prototypes to get you up to speed.

Now, what’s one thing we know for sure about a Node.js server? It has a `listen` function. We use it all the time in server-side code (even in frameworks like Express). So, let’s check if our `Server` object has a `listen` function.

Scroll down a bit more, and there it is on line 2006:

```js
Server.prototype.listen = function(...args) {}
```

This function handles a lot of stuff—like validating the port number—but the key part starts around line 2016, where the comment clearly tells us:

```js
// start TCP server listening on host:port
```

We know what TCP is!

The important functions here are `lookupAndListen` and `listenInCluster`. They are responsible for starting the actual TCP server:

```js
// start TCP server listening on host:port
if (options.host) {
  lookupAndListen(this, options.port | 0, options.host, backlog, options.exclusive, flags);
} else {
  listenInCluster(this, null, options.port | 0, 4, backlog, undefined, options.exclusive);
}
```

Digging into `lookupAndListen` (line 2156), we find that it calls `listenInCluster`, which leads us to another function: `server._listen2` (yep, more tracing!):

```js
server._listen2(address, port, addressType, backlog, fd, flags);
```

As the comments explain, this is all about backward compatibility:

```js
// _listen2 sets up the listened handle, it is still named like this
// to avoid breaking code that wraps this method
```

I know this might feel like a wild goose chase, but trust me, tracing through a large codebase like Node.js requires patience. We’re getting close.

So, `._listen2` is defined in our `Server` object’s prototype and points to a function called `setupListenHandle` (line 1856). This function is the real hub where everything comes together.

Around line 1870 and 1883, you’ll find the function `createServerHandle`:

```js
function createServerHandle(address, port, addressType, fd, flags) {
    handle = new TCP(TCPConstants.SERVER);
    isTCP = true;
    return handle;
}
```

Finally! We’ve hit the core: the `TCP` object. This is where the actual TCP server is created, the core. We could stop here, satisfied that we’ve found the TCP server, but why not dig deeper?

Remember that `new TCP` is creating an object, so we need to figure out what `TCP` actually represents.

Go back up to line 68, where you’ll see the following import:

```js
const {
  TCP,
  TCPConnectWrap,
  constants: TCPConstants,
} = internalBinding('tcp_wrap');
```

This is where things get interesting. You might wonder: “What kind of import is that? It’s not your regular `require` or `import` statement.” That’s because JavaScript alone can’t handle TCP servers—it needs help from C++.

Node.js, which is built on the V8 engine, relies on C++ bindings to do the heavy lifting. These bindings are like a bridge, allowing JavaScript to communicate with low-level system functions (like creating a TCP server). `internalBinding('tcp_wrap')` is one of these bridges.

To truly trace things to their source, we need to dive into the Node.js C++ code. You’ll find `tcp_wrap.cc` in the `src` folder (among others like `crypto`, `streams`, `async`, `fs`). Open it, and you’ll find this function:

```cpp
void TCPWrap::New(const FunctionCallbackInfo<Value>& args) {
  CHECK(args.IsConstructCall());
  CHECK(args[0]->IsInt32());
  Environment* env = Environment::GetCurrent(args);
  int type_value = args[0].As<Int32>()->Value();
  TCPWrap::SocketType type = static_cast<TCPWrap::SocketType>(type_value);
  ProviderType provider;
  switch (type) {
    case SOCKET:
      provider = PROVIDER_TCPWRAP;
      break;
    case SERVER:
      provider = PROVIDER_TCPSERVERWRAP;
      break;
    default:
      UNREACHABLE();
  }
  new TCPWrap(env, args.This(), provider);
}
```

This is where the TCP server is _actually_ created. You can see more familiar functions like `bind`, and everything JavaScript does is just a mirror of these lower-level operations.

We’ve traced our way from high-level JavaScript all the way down to C++—the true beginning of a TCP server in Node.js.

We've completed the first part of the introduction: "And drill all the way down repeatedly until we touch Node.js native code" and now it's time to build up.

---

## Form 2: Implementing a Custom Server Mux

Before diving into the code, the goal isn’t to focus on the complexity of mux (multiplexer) development (because that can get complicated). Instead, it’s to show how the **server** and **mux** fit together.

If anything, this is the key takeaway: the flow from the server to the router, and ultimately to the caller (the client that made the request).

Remember, we've already seen a similar concept in Express:

```js
// Express app inherits from Node's EventEmitter
mixin(app, EventEmitter.prototype, false);
// Implements the server mux with functions like listen, handle, middleware
mixin(app, proto, false);
```

Behind the scenes, a lot of complex code is abstracted away. This helps simplify things and makes the code cleaner, but for teaching purposes, we’ll take a more verbose approach. This way, you can see how everything connects.

### Creating Our Custom Router

Let's start simple and build a basic server. You probably already know how to create a native server in Node.js:

```js
const server = http.createServer((req, res) => {
  app.hook(req, res);
});
```

Here, we’re introducing an object `app` with a `hook` function (which we’ll implement shortly). This is where the server redirects the `req` and `res` to our custom router. This **hook** is the meeting point—the interaction between the server and the router (mux).

### Basic Mux Skeleton

Let's start by creating the structure of our mux:

```js
function serverMux() {
  function hook(req, res) {
    // To be implemented
  }
  return {
    hook
  };
}

const app = serverMux();

const server = http.createServer((req, res) => {
  app.hook(req, res);
});
```

### The Hook Function

The `hook` function is our middleman between the server and the mux. It receives the request (`req`) and response (`res`) objects from the server and passes them to our mux:

```js
function hook(req, res) {
  requestsQueue.push(requestWrapper(req, res));
  console.log("new request!");
  processRequests();
}
```

Here, we introduced a few new things:

- `requestWrapper`: A function to wrap the `req` and `res`.
- `processRequests`: A function to handle the request processing.
- `requestsQueue`: A basic JavaScript array that will act as our queue for handling requests.

Let's update `serverMux` to reflect this:

```js
function serverMux() {
  const requestsQueue = [];

  async function processRequests() {
    // To be implemented
  }

  function hook(req, res) {
    requestsQueue.push(requestWrapper(req, res));
    console.log("new request!");
    processRequests();
  }

  return {
    hook
  };
}
```

### Why Use a Queue?

You might be wondering why we’re using a queue instead of handling requests immediately like Express does with `app.handle`. Well, storing requests in a queue helps simulate an event loop. This will give us better visibility into how requests are processed, one at a time.

#### Queue Operations

A queue is a first-in, first-out (FIFO) data structure. Just like a line at the store, the request that arrives first gets processed first.

In our case, the `requestsQueue` is an array. Here’s how we’ll handle enqueueing and dequeueing:

- **Enqueue (push)**: We push requests into the queue with `requestsQueue.push(requestWrapper(req, res));`
- **Dequeue (shift)**: We pull the next request out of the queue with `const c = requestsQueue.shift();`

### Request Wrapper

The `requestWrapper` function is a simple utility that wraps the incoming `req` and `res` objects, and extracts some useful information:

```js
function requestWrapper(req, res) {
  return {
    url: req.url,
    method: req.method,
    req,
    res
  };
}
```

In more advanced frameworks like [<FontIcon icon="fas fa-globe"/>Hono.js](https://hono.dev/), the request wrapper might add additional functionality, such as helper methods for setting headers or parsing body content. For now, we’re keeping things simple and just returning the request and response with the URL and method.

### Testing the Queue

Let’s test this out by logging the request queue on every new request. Update your `hook` function:

```js
function hook(req, res) {
  requestsQueue.push(requestWrapper(req, res));
  console.log("New request queued!", requestsQueue);
  processRequests();
}
```

Start the server with:

```sh
node index.js
```

Now, open another terminal and make a request to the server:

```sh
curl http://localhost:3000
```

You should see the queue logged in the console. The terminal might look like it's hanging because we haven’t responded to the request yet. You can exit the process manually for now.

### Processing Requests

Here’s the full `processRequests` function:

```js
async function processRequests() {
  while (requestsQueue.length > 0) {
    const c = requestsQueue.shift();
    if (c) {
      const handler = lookupTable[c.url] || lookupTable["/notfound"];
      if (handler) {
        (async function() {
          handler(c.req, c.res);
        })();
      } else {
        console.log("Missing not found handler!");
      }
    }
  }
}
```

Let’s break it down:

1. **Queue processing**: We loop through the queue, dequeueing each request one by one.
2. **Handler lookup**: For each request, we check if a handler exists in the `lookupTable` for the URL. If it doesn’t, we fall back to a `/notfound` handler.
3. **Handler execution**: We execute the handler, passing the request and response objects.

### Lookup Table and Handlers

We need a way to map URLs to their respective handlers. This is where the `lookupTable` comes in:

```js
const lookupTable = {
  "/": (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!\n');
  },
  "/notfound": (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found\n');
  }
};
```

When a request comes in, we check if the URL matches an entry in the table. If it does, we call the corresponding handler function.

For example, calling `curl http://localhost:3000` will hit the `/` route and return "Hello, World!". If you hit a non-existent route like `/random`, it will trigger the 404 handler.

### Registering Handlers

Finally, let’s add a method to register new handlers dynamically:

```js
function serverMux() {
  const lookupTable = {};

  function registerHandler(path, handler) {
    if (typeof path !== 'string' || !path) {
      throw new Error("Path must be a non-empty string");
    }
    if (typeof handler !== 'function') {
      throw new Error("Handler must be a function");
    }
    lookupTable[path] = handler;
  }

  return {
    hook,
    registerHandler
  };
}
```

Now, we can dynamically register new routes with their handlers:

```js
app.registerHandler("/", (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Home Page\n');
});

app.registerHandler("/about", (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('About Us\n');
});
```

Here's a full example of `registerHandler` in action:

```js
const app =  serverMux()
app.registerHandler("/", (req, res)=> {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!');
})

app.registerHandler("/about", (req, res)=> {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>About Us</h1>');
})


app.registerHandler("/contact", (req, res)=> {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Contact Us</h1>');
})

app.registerHandler("/api/data", (req, res)=> {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Some data from the API' }));
})

app.registerHandler("/notfound", (req, res)=> {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found');
})

const server = http.createServer((req, res) => {
  console.log(req.url)
  app.hook(req, res)
});
```

Notice how similar it is to Express?

```js
app.get("/", (req, res)=> {

})
```

Just a bit more verbose!

Now, run the server and put it to the test by pasting this into your terminal:

```sh
for /l %i in (1,1,100) do curl -X GET http://localhost:3000
```

This will send 100 requests. Try opening two or more terminals and running the same command concurrently to see how your server handles the load.

Congratulations! You’ve built a basic server multiplexer (mux). It may not revolutionize the world, but it's a solid starting point to understand how routing works in web frameworks.

---

## Wrapping Up

In this article, we took a deep dive into the concept of server-side frameworks, using Express as our primary example. We traced it from its high-level abstractions all the way down to the native TCP server built in C++. Then, to cement these ideas, we built our own simple server mux.

It’s a powerful learning exercise, because we stripped away the magic and dug into the core of how things work. While this example is just the tip of the iceberg, it gives you the tools to explore even deeper. For a challenge, look into how Express handles pattern matching and registering routes—try improving our simple mux!

I left out more advanced topics like updating our queue with a linked list and simulating concurrent requests, so this is something you can explore.

Thanks for reading! I hope you enjoyed this exploration as much as I did writing it. If you have any thoughts, questions, or just want to connect I am on [x (<FontIcon icon="fa-brands fa-x-twitter"/>`codelit09`)](https://x.com/codelit09), feel free to reach out.

And of course, enjoy your timezone!
