---
lang: en-US
title: "Type Checking with Assertion Functions in TypeScript"
description: "Article(s) > Type Checking with Assertion Functions in TypeScript"
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
      content: "Article(s) > Type Checking with Assertion Functions in TypeScript"
    - property: og:description
      content: "Type Checking with Assertion Functions in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/type-checking-with-assertion-functions-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-01-21
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
  name="Type Checking with Assertion Functions in TypeScript"
  desc="An assertion function is a runtime check that identifies the type of unknown input. TypeScript's compiler assumes the input is of the type claimed by the assertion function's signature. Assertion functions are useful for uncertain values, like user input, and generate runtime checks. They can raise errors if the input doesn't meet criteria."
  url="https://typescript.tv/best-practices/type-checking-with-assertion-functions-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

An assertion function is a runtime check that identifies the type of unknown input. TypeScript's compiler assumes the input is of the type claimed by the assertion function's signature. Assertion functions are useful for uncertain values, like user input, and generate runtime checks. They can raise errors if the input doesn't meet criteria.

An assertion function is the implementation of a runtime check that is able to identify the type of unknown input. When the conditions of the assertion functions are passed, TypeScript's compiler will then assume that the input is of the type claimed by the signature of the assertion function.

---

## Assertion Function

The TypeScript code below examines an `input` of type `unknown`. If the `assertUser` function does not produce an error, TypeScript's compiler will assume that the `input` is of type `User` as specified in the signature of the assertion function with `asserts input is User`:

```ts :collapsed-lines
type User = {
  age: number;
  name: string;
};
 
function assertUser(input: unknown): asserts input is User {
  const isObject = input && typeof input === 'object';
 
  if (isObject) {
    const hasAge = 'age' in input && typeof input.age === 'number';
    const hasName = 'name' in input && typeof input.name === 'string';
 
    if (!hasAge) {
      throw new Error('User does not have an age.');
    }
 
    if (!hasName) {
      throw new Error('User does not have a name.');
    }
  }
 
  throw new Error('Input is not an object');
}
 
function printAge(input: unknown) {
  // My `input` is unknown here
  assertUser(input);
  // After passing the assertion function, my `input` is typed
  console.log(input.age);
}
 
// Error: User does not have an age.
printAge({ name: 'Benny' });
```

---

## Benefits

- Assertion functions are useful in situations where the type of a value is uncertain, especially when the value originates from external sources such as user input or third-party libraries.
- Unlike [**type assertions**](/typescript.tv/glossary.md#type-assertion), which are only used by the compiler to check the type of a value, assertion functions generate JavaScript code that performs the check at runtime.
- Assertion functions can check that the input meets certain criteria, and if it doesn't, they can raise an error, preventing the rest of the code from executing in an undefined state.

---

## Disadvantages

- Because the checks of an assertion function are created by the user, it is possible for them to contain errors or omitted conditions.

### Incorrect Assertion Function

```ts
type User = {
  age: number;
  name: string;
};
 
// This assertion function is insufficient and only checks whether the input exists
function assertUser(input: unknown): asserts input is User {
  if (!input) {
    throw new Error('Input is not a User.');
  }
}
 
const user = 1337;
assertUser(user);
// We have convinced TypeScript's compiler that our `number` is of type `User`
console.log(user.name);
```

---

## Assertion Functions in Node.js

If your code is running in a Node.js environment and you have installed `@types/node`, you can make use of Node's built-in module `assert:node` to do assertions on your variables:

```ts
import assert from 'node:assert';
 
function getShortenedText(text?: string): string {
  assert.ok(text, 'expected text to be defined');
  // Thanks to the "assert" from above, TypeScript knows that "text" is defined:
  return text.slice(0, 5);
}
 
getShortenedText('Benjamin');
```

::: info Video Tutorial

<VidStack src="youtube/aGUdSogECGw" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Type Checking with Assertion Functions in TypeScript",
  "desc": "An assertion function is a runtime check that identifies the type of unknown input. TypeScript's compiler assumes the input is of the type claimed by the assertion function's signature. Assertion functions are useful for uncertain values, like user input, and generate runtime checks. They can raise errors if the input doesn't meet criteria.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/type-checking-with-assertion-functions-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
