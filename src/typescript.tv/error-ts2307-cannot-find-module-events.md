---
lang: en-US
title: "Error TS2307: Cannot find module events"
description: "Article(s) > Error TS2307: Cannot find module events"
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
      content: "Article(s) > Error TS2307: Cannot find module events"
    - property: og:description
      content: "Error TS2307: Cannot find module events"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/error-ts2307-cannot-find-module-events.html
prev: /programming/ts/articles/README.md
date: 2020-06-04
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
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
  name="Error TS2307: Cannot find module events"
  desc="If you're extending the `EventEmitter` class from Node.js and encounter the error TS2307 or TS2339, it means you're missing the Node.js type definitions. To fix this, install the typings by running `yarn add @types/node@12 --dev --tilde`. This solution has been tested with TypeScript 3.9.3 and Node.js 12.18.0 LTS."
  url="https://typescript.tv/hands-on/error-ts2307-cannot-find-module-events"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

If you're extending the `EventEmitter` class from Node.js and encounter the error TS2307 or TS2339, it means you're missing the Node.js type definitions. To fix this, install the typings by running `yarn add @types/node@12 --dev --tilde`. This solution has been tested with TypeScript 3.9.3 and Node.js 12.18.0 LTS.

Extending the `EventEmitter` class from Node.js might cause **error TS2307**. Here is how to fix it.

---

## Problem

In Node.js you can implement an event listener system using the [<VPIcon icon="fa-brands fa-node"/>EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) class:

```ts
import { EventEmitter } from 'events';
 
enum TOPIC {
  TEST = 'EmitterTest.TOPIC.TEST',
}
 
export interface EmitterTest {
  on(event: TOPIC.TEST, listener: (message: string) => void): this;
}
 
export class EmitterTest extends EventEmitter {
  public static readonly TOPIC = TOPIC;
 
  constructor() {
    super();
  }
 
  emitSomething(): void {
    this.emit(EmitterTest.TOPIC.TEST, 'this-is-a-test');
  }
}
 
// Execution
 
const emitter = new EmitterTest();
 
emitter.on(EmitterTest.TOPIC.TEST, (message) => {
  console.log(`This callback received message: ${message}`);
});
 
emitter.emitSomething();
```

When executing the code above you may encounter the following errors:

```plaintext
Cannot find module 'events' or its corresponding type declarations.

Property 'emit' does not exist on type ...
```

---

## Solution

Most of the times these errors are symptoms of missing Node.js type definitions. You can resolve these problems by installing the following typings:

```sh
yarn add @types/node@12 --dev --tilde
```

Tested with TypeScript 3.9.3 and Node.js 12.18.0 LTS.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Error TS2307: Cannot find module events",
  "desc": "If you're extending the `EventEmitter` class from Node.js and encounter the error TS2307 or TS2339, it means you're missing the Node.js type definitions. To fix this, install the typings by running `yarn add @types/node@12 --dev --tilde`. This solution has been tested with TypeScript 3.9.3 and Node.js 12.18.0 LTS.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/error-ts2307-cannot-find-module-events.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
