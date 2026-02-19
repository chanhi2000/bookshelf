---
lang: en-US
title: "Private Fields vs Private Elements in TypeScript"
description: "Article(s) > Private Fields vs Private Elements in TypeScript"
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
      content: "Article(s) > Private Fields vs Private Elements in TypeScript"
    - property: og:description
      content: "Private Fields vs Private Elements in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/private-fields-in-typescript-whats-the-difference-between-private-and.html
prev: /programming/ts/articles/README.md
date: 2025-08-21
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
  name="Private Fields vs Private Elements in TypeScript"
  desc="Private fields in TypeScript can be declared with either ”private” or ”#”. The private keyword only enforces privacy at design time through the TypeScript compiler, while the ”#” syntax creates Private Elements that are also protected from outside access at runtime. Private Elements provide stronger encapsulation because their fields remain completely hidden from anything outside the class."
  url="https://typescript.tv/new-features/private-fields-in-typescript-whats-the-difference-between-private-and"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Private fields in TypeScript can be declared with either "private" or "#". The private keyword only enforces privacy at design time through the TypeScript compiler, while the "#" syntax creates Private Elements that are also protected from outside access at runtime. Private Elements provide stronger encapsulation because their fields remain completely hidden from anything outside the class.

If you have worked with classes in TypeScript for a while, you have probably used private fields. They are a neat way to say: this part of the class is not meant for the outside world. In other words, they support encapsulation, the object-oriented principle that an object should hide its inner workings and only expose a clean surface to the outside.

Then you bump into this newer syntax with a `#` in front of it. In technical terms these are called [<VPIcon icon="fa-brands fa-firefox"/>Private Elements](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Classes/Private_elements). Suddenly you are wondering, are these the same thing, and which one should you actually use?

---

## Private the TypeScript way

TypeScript introduced the `private` keyword early on, long before JavaScript itself had any concept of real privacy. It is enforced entirely by the TypeScript compiler. When you mark something `private`, TypeScript will stop you from touching it outside the class during development time:

```ts
class Counter {
  private count = 0;
 
  increment() {
    this.count++;
  }
 
  read() {
    return this.count;
  }
}
 
const c = new Counter();
c.increment();
```

At runtime, `private` is only a convention. It still shows up as a property on the object, and reflection tools like `Object.keys` will happily list it. Encapsulation here is real in the TypeScript type system, but not airtight once the code is running in JavaScript:

```ts
// Still reachable at runtime with a little mischief
console.log((c as any).count);
// Alternative
console.log(c['count']);
```

---

## Private fields in ECMAScript

The ECMAScript standard introduced true private fields using the `#` prefix. This was standardized in [ES2022 (ES13)](https://262.ecma-international.org/13.0/), much later than TypeScript’s `private` access modifier. Unlike TypeScript’s compile-time check, `#` fields are enforced by the JavaScript engine itself:

```ts
class Counter {
  #count = 0;
 
  increment() {
    this.#count++;
  }
}
 
const c = new Counter();
c.increment();
// Error: Property "count" does not exist
console.log(c['count']);
```

These fields embody encapsulation at the runtime level. The field is stored in a hidden slot. It will not show up in reflection, it will not serialize to JSON, and there is no way to reach it from the outside. Even trying to access it using `#count` won’t let you get it.

---

## The testing angle

With `private` modifiers, tests can peek inside the fields if they want to. You can cast to `any` or use bracket notation (`instance['field']`). Sometimes that is handy, sometimes it couples your tests to implementation details:

```ts
class Counter {
  private count = 0;
 
  increment() {
    return this.#count++;
  }
}
 
const c = new Counter();
c.increment();
 
// Bracket notation access works with "private" modifier
console.log(c['count']);
```

While **private elements** cannot be accessed directly from outside the class, you can still expose controlled access by defining a getter on the class. This allows you to read or update private state safely without breaking encapsulation. For example:

```ts
class Counter {
  #count = 0;
 
  get count() {
    return this.#count;
  }
 
  increment() {
    return this.#count++;
  }
}
 
const c = new Counter();
c.increment();
// Getter "count" for private field
console.log(c.count);
```

This pattern keeps the field truly private while giving consumers and tests a safe, intentional way to interact with it.

::: note A note on naming

In the ECMAScript 2022 specification, the feature is called a **private field**, referring to the `#field` syntax that JavaScript engines enforce at runtime. TypeScript communities, on the other hand, talk about the **private access modifier** when talking about private fields. That's why MDN often uses the term [<VPIcon icon="fa-brands fa-firefox"/>private element](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements), making it clear when the discussion is about JavaScript’s built-in feature versus TypeScript’s compile-time version.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Private Fields vs Private Elements in TypeScript",
  "desc": "Private fields in TypeScript can be declared with either ”private” or ”#”. The private keyword only enforces privacy at design time through the TypeScript compiler, while the ”#” syntax creates Private Elements that are also protected from outside access at runtime. Private Elements provide stronger encapsulation because their fields remain completely hidden from anything outside the class.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/private-fields-in-typescript-whats-the-difference-between-private-and.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
