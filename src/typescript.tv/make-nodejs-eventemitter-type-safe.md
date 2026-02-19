---
lang: en-US
title: "Make Node.js EventEmitter Type-Safe"
description: "Article(s) > Make Node.js EventEmitter Type-Safe"
icon: fa-brands fa-node
category:
  - Node.js
  - TypeScript
  - Article(s)
tag:
  - blog
  - typescript.tv
  - node
  - nodejs
  - node-js
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Make Node.js EventEmitter Type-Safe"
    - property: og:description
      content: "Make Node.js EventEmitter Type-Safe"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/make-nodejs-eventemitter-type-safe.html
prev: /programming/js-node/articles/README.md
date: 2025-08-22
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  name="Make Node.js EventEmitter Type-Safe"
  desc="Node.js EventEmitter can be made type-safe in TypeScript using declaration merging. This ensures correct event names and listener signatures, enhancing IDE and type checker reliability. Additional libraries like ”typed-emitter” can further streamline the process."
  url="https://typescript.tv/hands-on/make-nodejs-eventemitter-type-safe"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Node.js EventEmitter can be made type-safe in TypeScript using declaration merging. This ensures correct event names and listener signatures, enhancing IDE and type checker reliability. Additional libraries like "typed-emitter" can further streamline the process.

The [<VPIcon icon="fa-brands fa-node"/>EventEmitter](https://nodejs.org/api/events.html#class-eventemitter) in Node.js is one of the most frequently used APIs. It powers streams, servers, sockets, child processes, and most third-party libraries that need to listen to events. Its design is intentionally flexible, but that flexibility has consequences when you use it in TypeScript.

---

## The Problem with EventEmitter

If you inspect the type definitions from `@types/node`, you’ll see that EventEmitter is essentially typed as follows:

```ts
on(event: string | symbol, listener: (...args: any[]) => void): this;
```

This is overly permissive. Any string is accepted as an event name, even if you misspell it. Listener arguments are typed as `any[]`, so the compiler has no idea what shape your events carry. And because `emit` shares the same weak typing, you can pass the wrong number or type of arguments and nothing will stop you until runtime.

---

## Declaration Merging to the Rescue

There is a straightforward solution. TypeScript has a feature called **declaration merging** that allows the typings of an `interface` and a `class` with the same name to be combined at design time.

This allows you to describe your events in the interface, while the class only has to extend Node’s `EventEmitter` without any boilerplate. Here is what it looks like in practice:

```ts :collapsed-lines
import { EventEmitter } from 'node:events';
 
export interface ChatRoom {
  on(event: 'join', listener: (name: string) => void): this;
  on(event: 'leave', listener: (name: string) => void): this;
}
 
export class ChatRoom extends EventEmitter {
  private users: Set<string> = new Set();
 
  public join(name: string) {
    this.users.add(name);
    this.emit('join', name);
  }
 
  public leave(name: string) {
    if (this.users.delete(name)) {
      this.emit('leave', name);
    }
  }
}
 
const room = new ChatRoom();
 
room.on('join', (user) => {
  console.log(`"${user}" joined the channel.`);
});
 
room.on('leave', (user) => {
  console.log(`"${user}" left the channel.`);
});
```

At runtime, `ChatRoom` is just a subclass of `EventEmitter`. But at design time, the interface is merged with the class. That means the compiler now knows that only "join" and "leave" are valid event names, and that listeners for those events will receive a `name` parameter.

By applying declaration merging, you get the best of both worlds. The runtime behavior is still provided by Node.js, so you don’t need to maintain your own event system. But the compiler now enforces correct event names and listener signatures, which means your IDE and TypeScript’s type checker become reliable allies when working with events.

---

## Taking It Further

One limitation of the interface-merging trick is that you need to repeat the same event definitions across all of EventEmitter’s public APIs if you want full type safety. Defining `on` and `emit` is usually enough, but if your codebase also uses `once`, `off`, `removeListener`, or other variants, you’ll have to type each one explicitly. That can become verbose if you rely heavily on the full EventEmitter API.

To avoid this boilerplate, you can use a small utility library called [typed-emitter (<VPIcon icon="iconfont icon-github"/>`andywer/typed-emitter`)](https://github.com/andywer/typed-emitter). It provides a strongly typed version of `EventEmitter` out of the box, so you only need to declare your event map once and it automatically covers all the public methods (`on`, `once`, `off`, `emit`, and so on).

::: tip Example

```ts :collapsed-lines
import { EventEmitter } from 'node:events';
import TypedEventEmitter, { type EventMap } from 'typed-emitter';
type TypedEmitter<T extends EventMap> = TypedEventEmitter.default<T>;
 
interface MyEvents {
  [event: string]: (...args: any[]) => void;
  join: (name: string) => void;
  leave: (name: string) => void;
}
 
export class ChatRoom extends (EventEmitter as new () => TypedEmitter<MyEvents>) {
  private users: Set<string> = new Set();
 
  public join(name: string) {
    this.users.add(name);
    this.emit('join', name);
  }
 
  public leave(name: string) {
    if (this.users.delete(name)) {
      this.emit('leave', name);
    }
  }
}
 
const room = new ChatRoom();
 
room.once('join', (user) => {
  console.log(`"${user}" joined the channel.`);
});
 
room.on('leave', (user) => {
  console.log(`"${user}" left the channel.`);
});
 
room.off('leave', (user) => {
  console.log(`"${user}" left the channel.`);
});
```

:::

---

## Using an EventMap

The type definitions for Node's `EventEmitter` are provided by `@types/node`. Sicne July 2024, `@types/node` includes a generic type for defining an event map (see [Add generics to static members of EventEmitter (<VPIcon icon="iconfont icon-github"/>`DefinitelyTyped/DefinitelyTyped`)](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/69997)). This event map lets you enforce strong typing between event names and their associated listener functions. By defining an event map, you can specify the exact parameter list that each listener should accept:

```ts :collapsed-lines
import EventEmitter from 'node:events';
 
interface ChatEvents {
  message: [from: string, content: string];
  join: [name: string];
  leave: [name: string];
}
 
const room = new EventEmitter<ChatEvents>();
 
room.on('message', (from, content) => {
  console.log(`${from}: ${content}`);
});
 
room.on('join', (user) => {
  console.log(`"${user}" joined the channel.`);
});
 
room.on('leave', (user) => {
  console.log(`"${user}" left the channel.`);
});
```

Which can also be written as:

```ts :collapsed-lines
import { EventEmitter } from 'node:events';
 
interface ChatEvents {
  message: [from: string, content: string];
  join: [name: string];
  leave: [name: string];
}
 
export class ChatRoom extends EventEmitter<ChatEvents> {
  private users: Set<string> = new Set();
 
  public join(name: string) {
    this.users.add(name);
    this.emit('join', name);
  }
 
  public leave(name: string) {
    if (this.users.delete(name)) {
      this.emit('leave', name);
    }
  }
}
 
const room = new ChatRoom();
 
room.on('message', (from, content) => {
  console.log(`${from}: ${content}`);
});
 
room.on('join', (user) => {
  console.log(`"${user}" joined the channel.`);
});
 
room.on('leave', (user) => {
  console.log(`"${user}" left the channel.`);
});
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Make Node.js EventEmitter Type-Safe",
  "desc": "Node.js EventEmitter can be made type-safe in TypeScript using declaration merging. This ensures correct event names and listener signatures, enhancing IDE and type checker reliability. Additional libraries like ”typed-emitter” can further streamline the process.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/make-nodejs-eventemitter-type-safe.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
