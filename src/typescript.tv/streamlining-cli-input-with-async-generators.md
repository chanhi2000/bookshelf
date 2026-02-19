---
lang: en-US
title: "Streamlining CLI Input with Async Generators"
description: "Article(s) > Streamlining CLI Input with Async Generators"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Streamlining CLI Input with Async Generators"
    - property: og:description
      content: "Streamlining CLI Input with Async Generators"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/streamlining-cli-input-with-async-generators.html
prev: /programming/ts/articles/README.md
date: 2025-08-12
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  name="Streamlining CLI Input with Async Generators"
  desc="Async generators in TypeScript can simplify handling user input in CLI tools. They yield values over time, making code cleaner and easier to follow. This approach can also be applied to various sources beyond CLI input."
  url="https://typescript.tv/hands-on/streamlining-cli-input-with-async-generators"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Async generators in TypeScript can simplify handling user input in CLI tools. They yield values over time, making code cleaner and easier to follow. This approach can also be applied to various sources beyond CLI input.

Reading and processing user input in a command-line tool often means juggling event listeners, state, and control flow. With Node’s `readline` module this usually involves listening for `"line"` events, parsing the incoming strings, and making sure cleanup is handled properly. This approach works, but it can lead to scattered, hard-to-follow logic. Async generators in TypeScript offer a much cleaner way to model this kind of stream.

An async generator is defined using the `async function*` syntax. The `async` keyword allows the function to use `await` inside, while the `function*` notation turns it into a generator capable of yielding multiple values over time. The combination produces an asynchronous iterator that delivers results as they become available. Consumption happens via a `for await...of` loop, which pauses between iterations until a new value is yielded. This is a natural fit for user-driven workflows such as typing input into the terminal.

To illustrate, imagine we want to read numbers from the keyboard, one per line, and update a [<VPIcon icon="fa-brands fa-wikipedia-w"/>Simple Moving Average](https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average) in real time. Instead of manually wiring events, we can wrap everything in an async generator:

```ts
import readline from 'node:readline';
 
export async function* keyboardStream(): AsyncGenerator<number> {
  const KEY_CTRL_C = '\u0003';
 
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });
 
  for await (const line of rl) {
    const trimmed = line.trim();
    if (trimmed === KEY_CTRL_C) {
      rl.close();
      break;
    }
 
    const input = parseFloat(trimmed);
    if (isNaN(input)) {
      console.log(`Invalid input: ${trimmed}`);
    } else {
      yield input;
    }
  }
}
```

Here the function produces values of type `number`. Every time the user types a valid line and presses Enter, the generator yields it. If Ctrl-C is detected, the generator closes gracefully. Invalid inputs are acknowledged with a message, but never yielded. The result is a clean, single place where all input handling logic lives.

Now that we have a typed async generator, the consumer code can work entirely with numbers and trust the type system to enforce it:

```ts
import { SMA } from 'trading-signals';
 
const sma = new SMA(3);
console.log(`Type numbers, press Enter, Ctrl+C to exit.`);
 
for await (const value of keyboardStream()) {
  sma.add(value);
 
  if (sma.isStable) {
    console.log(`SMA (${sma.interval}): ${sma.getResultOrThrow().toFixed(2)}`);
  } else {
    console.log(`Need more data...`);
  }
}
```

The `for await...of` loop reads like a narrative: wait for the next number, add it to the moving average, print the result if it is ready, or tell the user more data is needed. There are no dangling event listeners and no separate control structures for error handling or state tracking. The async generator encapsulates everything about how the values are produced.

This pattern is not limited to CLI input. The same approach works with file reading, network streams, or any other source where values arrive over time. Async generators give you a single, composable way to treat these sources uniformly, making the code easier to reason about and maintain.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Streamlining CLI Input with Async Generators",
  "desc": "Async generators in TypeScript can simplify handling user input in CLI tools. They yield values over time, making code cleaner and easier to follow. This approach can also be applied to various sources beyond CLI input.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/streamlining-cli-input-with-async-generators.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
