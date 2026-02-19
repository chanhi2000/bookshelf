---
lang: en-US
title: "Why Your Cat Became a Dog (And TypeScript Finally Noticed)"
description: "Article(s) > Why Your Cat Became a Dog (And TypeScript Finally Noticed)"
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
      content: "Article(s) > Why Your Cat Became a Dog (And TypeScript Finally Noticed) "
    - property: og:description
      content: "Why Your Cat Became a Dog (And TypeScript Finally Noticed) "
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/why-your-cat-became-a-dog-and-typescript-finally-noticed.html
prev: /programming/ts/articles/README.md
date: 2026-01-22
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
  name="Why Your Cat Became a Dog (And TypeScript Finally Noticed)"
  desc="Discover how JavaScript private fields change TypeScript from structural typing to nominal typing, creating hard boundaries between classes that look identical."
  url="https://typescript.tv/best-practices/why-your-cat-became-a-dog-and-typescript-finally-noticed"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Discover how JavaScript private fields change TypeScript from structural typing to nominal typing, creating hard boundaries between classes that look identical.

TypeScript lets you assign a `Dog` to a `Cat` variable, even though they're different classes. This surprising behavior stems from TypeScript's structural type system, where identical shapes are interchangeable. But there's a simple way to prevent this: JavaScript private fields. Let's explore why TypeScript allows this seemingly broken code and how to fix it.

---

## The Surprising Problem

Look at this TypeScript code. Can you spot the issue?

```ts title="animals.ts"
class Cat {
  name: string = 'Garfield';
}
 
class Dog {
  name: string = 'Scooby-Doo';
}
 
const cat: Cat = new Dog(); // ✅ No error!
```

TypeScript happily accepts this code. A `Dog` instance is assigned to a variable typed as `Cat`, and the compiler doesn't complain. It's a fundamental feature of how the language works because TypeScript uses [<VPIcon icon="iconfont icon-typescript"/>structural typing](https://typescriptlang.org/docs/handbook/type-compatibility.html).

If two types have the same structure (the same properties and function signatures), they're considered compatible, regardless of their names or how they were declared. TypeScript doesn't care that one class is called `Cat` and the other `Dog`. It only cares about their shape.

Structural typing extends beyond objects to functions as well. TypeScript compares function types by examining their parameters and return types. Here's where things get interesting: a function with more parameters can be assigned to a type expecting fewer parameters:

```ts title="functions.ts"
let shortFunction = (value: number) => 0;
let longFunction = (value: number, index: number) => 0;
 
longFunction = shortFunction; // ✅ Allowed!
const result = shortFunction(42); // ✅ Works!
 
shortFunction = longFunction; // ❌ Error! TS2322
```

How can a function that expects two parameters be used where only one is provided? The answer lies in JavaScript's flexibility. When you call a function with fewer arguments than it expects, the extra parameters become `undefined`.

This pattern appears frequently when working with array methods. Consider [<VPIcon icon="fa-brands fa-firefox"/>Array.map()](https://developer.mozilla.org/Web/JavaScript/Reference/Global_Objects/Array/map), which passes three arguments to its callback (value, index, array), but you can use a callback that only accepts one:

```ts title="mapping.ts"
const numbers = [1, 2, 3];
const shortFunction = (value: number) => value * 2;
const doubled = numbers.map(shortFunction);
```

The callback only uses the first parameter (value), ignoring the index and array. TypeScript's structural typing makes this natural JavaScript pattern type-safe.

---

## The Problem with Structural Typing

While structural typing is useful, it can lead to bugs when you want classes to be distinct types. In our example, `Cat` and `Dog` represent different domain concepts. Allowing them to be used interchangeably could cause logic errors.

Imagine a veterinary system where cats and dogs have different medical requirements. If you accidentally pass a `Dog` to a function expecting a `Cat`, you might administer the wrong treatment. The type system should catch this mistake, but structural typing allows it.

You need a way to make objects nominally distinct while still writing idiomatic TypeScript. This is where [**branded types**](/hands-on/understanding-branded-types-in-typescript/) come in, which work well for primitive values and simple objects. For classes, you can also use private fields, which offer a JavaScript-native approach.

---

## Private Fields enforce Nominal Typing

TypeScript treats private fields as **nominally typed**. Each class's private fields are unique to that class, even if they have the same name. This makes classes with private fields structurally incompatible, even if their public interfaces are identical.

Let's add private fields to our classes:

```ts title="animals.ts"
class Cat {
  #name: string = '';
}
 
class Dog {
  #name: string = '';
}
 
// ❌ Error: Type 'Dog' is not assignable to type 'Cat'.
// Property '#name' in type 'Dog' refers to a different member
// that cannot be accessed from within type 'Cat'.
const cat: Cat = new Dog();
```

Now TypeScript throws an error. Even though both classes have a field called `#name`, they're different private fields. Cat's `#name` and Dog's `#name` are distinct, incompatible members.

This creates a hard boundary between the classes. You cannot access one class's private field from another class, and TypeScript recognizes this at the type level. The classes are no longer structurally compatible, even though they have identical public APIs.

The same effect applies when class members are marked with the `private` access modifier.

---

## Practical Use Cases

Private fields are especially valuable when modeling domain concepts that should be distinct types, even if they happen to have similar data structures.

Consider a payment processing system with different currency types:

```ts title="currencies.ts"
class USD {
  #brand!: void;
  constructor(public readonly amount: number) {}
}
 
class EUR {
  #brand!: void;
  constructor(public readonly amount: number) {}
}
 
function processUSDPayment(payment: USD) {
  console.log(`Processing $${payment.amount}`);
}
 
const dollars = new USD(100);
const euros = new EUR(100);
 
processUSDPayment(dollars); // ✅ Correct
processUSDPayment(euros); // ❌ Error
```

The `#brand` field serves as a phantom type. It's never used at runtime (note the `void` type and `!` assertion), but it makes each currency class nominally distinct. This prevents accidentally mixing currencies in calculations, a common source of bugs in financial software.

---

## When Bundlers Create Multiple Instances

PPrivate fields can hide a subtle yet serious issue with module bundlers. If the bundler unintentionally produces multiple copies of the same class, for example through different import paths or code splitting, you can end up with classes that look identical but are treated as distinct. When your code is published as a library, this can lead to unexpected type incompatibilities.

Consider this project structure:

```ts title="models/Cat.ts"
export class Cat {
  #name: string = '';
}
```

Now suppose you have two different export barrels:

```ts title="models/index.ts"
export { Cat } from './Cat';
```

```ts title="animals/index.ts"
export { Cat } from '../models/Cat';
```

If your bundler setup pulls in the `Cat` class more than once, which can happen when using multiple [<VPIcon icon="iconfont icon-rollupjs"/>bundle entry points](https://rollupjs.org/configuration-options/#input) that generate separate output chunks, each chunk may contain its own distinct copy of `Cat`.

At runtime, this can cause confusing issues where one `Cat` instance does not match the `Cat` type another function expects. This problem often surfaces as the TypeScript error "TS2345", with a message indicating that the `#private` property refers to a different member.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": " Why Your Cat Became a Dog (And TypeScript Finally Noticed) ",
  "desc": "Discover how JavaScript private fields change TypeScript from structural typing to nominal typing, creating hard boundaries between classes that look identical.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/why-your-cat-became-a-dog-and-typescript-finally-noticed.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
