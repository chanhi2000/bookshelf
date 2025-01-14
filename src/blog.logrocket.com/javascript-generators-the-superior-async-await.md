---
lang: en-US
title: "JavaScript generators: The superior async/await"
description: "Article(s) > JavaScript generators: The superior async/await"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - typescript
  - ts
head:
  - - meta:
    - property: og:title
      content: "Article(s) > JavaScript generators: The superior async/await"
    - property: og:description
      content: "JavaScript generators: The superior async/await"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/javascript-generators-the-superior-async-await.html
prev: /programming/ts/articles/README.md
date: 2021-04-14
isOriginal: false
author:
  - name: Paul Cowan
    url : https://blog.logrocket.com/author/paulcowan/
cover: /assets/image/blog.logrocket.com/javascript-generators-the-superior-async-await/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="JavaScript generators: The superior async/await"
  desc="Generator functions can solve a whole breed of problems that nothing else can. It's time for the revolution that never happened."
  url="https://blog.logrocket.com/javascript-generators-the-superior-async-await"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/javascript-generators-the-superior-async-await/banner.png"/>

One of the biggest challenges in writing frontend code or Node.js code is dealing with asynchronicity. There was an original generator revolution when packages like [<FontIcon icon="iconfont icon-github"/>`tj/co`](https://github.com/tj/co) allowed us to write synchronous looking async code with normal constructs like `try` and `catch`:

```js
co.wrap(function*() {
  try {
    yield fetch('http://some.domain');
  } catch(err) {
    // handle
  }
});
```

---

## The dark ages (async/await)

![js generators](/assets/image/blog.logrocket.com/javascript-generators-the-superior-async-await/banner.png)

Around this time, C# and .net started shipping the original `async...await` construct that flattened async code into a more familiar shape:

```cs
public static async Task Main()
{
    Task<int> downloading = DownloadDocsMainPageAsync();
   
    int bytesLoaded = await downloading;
    Console.WriteLine($"{nameof(Main)}: Downloaded {bytesLoaded} bytes.");
}
```

Some very clever people decided that JavaScript should adopt `async...await` keywords into the JavaScript language. Babel and regenerator transpiled the keyword constructs into code that used generators to achieve the async workflow. Nodejs went one step further and made `async...await` a first-class language citizen.

What makes `async...await` code so appealing is that it looks synchronous. The code appears to stop and wait until a response returns or an error occurs. Code can be wrapped in a familiar `try..catch` block.

`async...await` gained a lot of traction, and the generator revolution was overlooked for the more limited `async...await`.

---

## Suspend and resume

What makes JavaScript generator functions so different is that they do not initially execute, and instead they return an iterator object with a `next` function. Execution in the function can suspend and resume at exactly the point that it was suspended in between `next` calls.

I have been using the npm package [<FontIcon icon="iconfont icon-github"/>`thefrontside/effection`](https://github.com/thefrontside/effection) for some time now.

Effection utilizes the magic of generators to allow us to write code like this:

```js
run(function* () {
  let socket = new WebSocket('ws://localhost:8080');

  yield throwOnErrorEvent(socket);

  yield once(socket, "open");

  let messages = yield once(socket, "message");

  while(true) {
    let message = yield messages.next();
    console.log('Got message:', message);
  }
});
```

There are some beautiful abstractions in the code above that ease the path to writing less code and simpler code.

For example:

```js
yield once(socket, "open");
```

The above code states that execution cannot proceed until the websocket `open` event has occurred.

If we were doing this in normal JavaScript, it would look something like this:

```js
const remove = socket.addEventListener('open', (event) => {
  // proceed
});
```

---

## The essence of the generator

Let us take a quick recap on what makes generators so powerful.

A generator function is an [<FontIcon icon="fas fa-globe"/>iterator](https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e) that returns an object that we can call next on. A generator appears to be a function, but it behaves like an [<FontIcon icon="fas fa-globe"/>iterator](https://codeburst.io/a-simple-guide-to-es6-iterators-in-javascript-with-examples-189d052c3d8e).

What makes generators so powerful is their ability to suspend and resume execution.

The `everySingleEvenNumber` generator function below illustrates this capability:

```js
function* everySingleEvenNumber() {
  let i = 0;
  while (true) {
    yield i += 2;
  }
}

var gen = everySingleEvenNumber();

console.log(gen.next().value); // 2
console.log(gen.next().value); // 4
console.log(gen.next().value); // 6
console.log(gen.next().value); // 8
```

The `while (true)` construct looks like an infinite loop, but execution is suspended after each `yield` and only resumed when the iterator `next` function gets called in `the console.log` code.

The current value of the local `i` variable does not reset between each call and is maintained.

Generators differ from async/await, where execution vanishes and only returns when a promise resolves or rejects.

---

## Generators as threads of execution

The ability to suspend and resume functions opens up many more doors than async/await has shut closed in its rapid adoption.

`effection` allows you to spawn separate processes as generator functions and take care of the teardown of all child processes started with effection. This technique is known as [<FontIcon icon="fa-brands fa-wikipedia-w"/>structured concurrency](https://en.wikipedia.org/wiki/Structured_concurrency#:~:text=Structured%20concurrency%20is%20a%20programming,structured%20approach%20to%20concurrent%20programming).

Effection exposes a `task` object that can `spawn` new `detached` processes:

```js
main(function* (task: Task) {
  console.log('in main');

  task.spawn(function* () {
    while (true) {
      yield sleep(100);
      console.log('awake');
    }
  });

  yield;
})
```

---

## Real-world scenario

Below is a `flakyConnection` function that will not connect until the fifth attempt:

```js
let attempt = 1;

function flakyConnection(): Promise<{ connected: boolean }> {
  return new Promise<{ connected: boolean }>((resolve) => {
    setTimeout(() => {
      attempt++;
      resolve({ connected: attempt === 5 });
    }, 100);
  });
}
```

To get a connection, a client will have to attempt five times before being successful. Good client code will also include a timeout and throw an exception if the operation takes too long.

Writing polling code that times out is annoying code to write, but effection and the suspend and resume qualities of generators make this a very nice experience:

```js
main(function* (parent: Task) {
  parent.spawn(function* (child) {
    child.spawn(function* () {
      console.log('primed to throw an Error');
      yield sleep(8000);

      throw new Error('you are out of time!  Better luck next time.');
    });

    while (true) {
      console.log(`connection attempt ${attempt}...`);
      const { connected } = yield flakyConnection();

      if (connected) {
        console.log('we are connected!');
        return true;
      }

      console.log('no cigar, we try again');

      yield sleep(2000);
    }
  });

  yield;
});
```

A new process is attached to the `parent` task object made available through `main`.

The code below elegantly takes care of setting a timeout that will throw an exception if the client cannot connect after 8000 milliseconds:

```js
child.spawn(function* () {
  console.log('primed to throw an Error');
  yield sleep(8000);

  throw new Error('you are out of time!  Better luck next time.');
});
```

The effection `sleep` function will suspend execution for 8000 milliseconds. If the parent process still exists after 8000 milliseconds, then it will throw an exception.

The code below will attempt to connect in 200 millisecond intervals until it is successful:

```js
while (true) {
  console.log(`connection attempt ${attempt}...`);
  const { connected } = yield flakyConnection();

  if (connected) {
    console.log('we are connected!');
    return true;
  }

  console.log('no cigar, we try again');

  yield sleep(300);
}
```

This code above can keep executing until a connection occurs or the timeout exception throws at which stage effection will close down all child processes.

Running the above code results in this output:

```plaintext title="output"
primed to throw an Error
connection attempt 1...
no cigar, we try again
connection attempt 2...
no cigar, we try again
connection attempt 3...
no cigar, we try again
connection attempt 4...
we are connected!
```

Here is a [repo (<FontIcon icon="iconfont icon-github"/>`dagda1/task`)](https://github.com/dagda1/task) with the above code.

You can check if the timeout works by changing the timeout code to something like this:

```js
child.spawn(function* () {
  console.log('primed to throw an Error');
  yield sleep(4000);

  throw new Error('you are out of time!  Better luck next time.');
});
```

The timeout occurring results in this output:

```js
primed to throw an Error
connection attempt 1...
no cigar, we try again
connection attempt 2...
no cigar, we try again
Error: you are out of time!  Better luck next time.
```

---

## It is time for the revolution that never happened

I still use async/await for simple one-shot async tasks with no workflow, but it is a limited paradigm.

Generator functions can solve a whole breed of problems that nothing else can. Starting and resuming threads of execution is incredibly powerful, and generators have this functionality built-in and out of the box.

Jump in! The water is warm.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "JavaScript generators: The superior async/await",
  "desc": "Generator functions can solve a whole breed of problems that nothing else can. It's time for the revolution that never happened.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/javascript-generators-the-superior-async-await.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
