---
lang: en-US
title: "All you need to know about iterators and generators"
description: "Article(s) > All you need to know about iterators and generators"
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
      content: "Article(s) > All you need to know about iterators and generators"
    - property: og:description
      content: "All you need to know about iterators and generators"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/all-you-need-to-know-about-iterators-and-generators.html
prev: /programming/ts/articles/README.md
date: 2024-05-23
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
  name="All you need to know about iterators and generators"
  desc="Learn about iterators and generators in TypeScript. Understand how to use for-of loops, iterator protocol, iterable protocol, and async generators. See examples and practical applications."
  url="https://typescript.tv/hands-on/all-you-need-to-know-about-iterators-and-generators"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn about iterators and generators in TypeScript. Understand how to use for-of loops, iterator protocol, iterable protocol, and async generators. See examples and practical applications.

---

## From For to For-of loops

One of the first things you learn when starting programming is how to use a for statement to loop over items in an array, like this:

```ts{3} title="for-loop.ts"
const letters = ['A', 'B', 'C'];
 
for (let i = 0; i < letters.length; i++) {
  const letter = letters[i];
  console.log(letter);
}
```

The variable `i` is short for "increment" and serves as a counter to track the number of iterations. It is commonly used as a temporary variable to store the index of an array, allowing access to a specific value within the array.

To improve the developer experience, the [<VPIcon icon="fas fa-globe"/>6th Edition of the ECMAScript Language Specification](https://262.ecma-international.org/6.0/) (ES6) introduced `for-of` loops. A `for-of` statement allows iterating over values without needing to keep track of the increment:

```ts{3} title="for-of-loop.ts"
const letters = ['A', 'B', 'C'];
 
for (const letter of letters) {
  console.log(letter);
}
```

In addition to the shorter syntax, `for-of` statements have another key feature: they can work with all types of **iterables**. It's important to understand that iterables are quite specific and follow the [<VPIcon icon="fa-brands fa-firefox"/>iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol).

To make an object following the iterable protocol, it must implement a function called `Symbol.iterator` That function should return an object which adheres to the [<VPIcon icon="fa-brands fa-firefox"/>iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterator_protocol).

---

## The Iterator Protocol

In simple terms, the iterator protocol requires an object to provide a method called `next`. This method must return a result in the form of `{ value: any, done: boolean }`. While values are being iterated, the `done` property will be `false`. When iteration ends, `done` turns `true` and `value` becomes nullish:

```ts{5,10,12} title="iterator.ts"
function getIterator() {
  let i = 0;
  const letters = ['A', 'B', 'C'];
 
  const iterator: Iterator<string> = {
    next() {
      while (i < letters.length) {
        const letter = letters[i];
        i += 1;
        return { value: letter, done: false };
      }
      return { value: null, done: true };
    },
  };
 
  return iterator;
}
 
const iterator = getIterator();
console.log(iterator.next()); // { value: 'A', done: false }
```

Notice TypeScript's built-in `Iterator` type, which can be used to ensure that your objects conform to the iterator protocol. It can also be implemented by classes:

```ts{1,5,9,11} title="iterator-oop.ts"
class MyIterator implements Iterator<string, null> {
  private i = 0;
  private letters = ['A', 'B', 'C'];
 
  next(): IteratorResult<string, null> {
    while (this.i < this.letters.length) {
      const letter = this.letters[this.i];
      this.i += 1;
      return { value: letter, done: false };
    }
    return { value: null, done: true };
  }
}
 
function getIterator() {
  return new MyIterator();
}
 
const iterator = getIterator();
console.log(iterator.next()); // { value: 'A', done: false }
```

---

## The Iterable Protocol

The iterable protocol is built upon the iterator protocol. It simply states that an object must have a `[Symbol.iterator]` property that returns a function which, in turn, returns an iterator:

```ts{4} title="iterable.ts"
// ...
 
const letters: Iterable<string> = {
  [Symbol.iterator]: getIterator,
};
 
for (const letter of letters) {
  console.log(letter);
}
```

You can implement the `Iterable` interface also in an object-oriented manner:

```ts{1} title="iterable-oop.ts"
class MyIterable implements Iterable<string> {
  [Symbol.iterator] = () => getIterator();
}
 
const letters = new MyIterable();
 
for (const letter of letters) {
  console.log(letter);
}
```

By following the iterable protocol, objects (or instances of classes) can be iterated using a `for-of` statement since it calls the `[Symbol.iterator]` method.

---

## TypeScript's Downlevel Iteration

TypeScript can downlevel the `for-of` syntax to a casual `for`-loop when targeting ES5 (released in 2009!) platforms. All it takes is setting the [<VPIcon icon="iconfont icon-typescript"/>target](https://typescriptlang.org/tsconfig/#target) to "ES5" in TypeScript's compiler configuration:

```json{4} title="tsconfig.json"
{
  "compilerOptions": {
    "lib": ["ES2022"],
    "target": "ES5"
    // ...
  }
}
```

Having the above configuration in place will downlevel a modern code snippet like this:

```ts{3} title="src/for-of-loop.ts"
const letters = ['A', 'B', 'C'];
 
for (const letter of letters) {
  console.log(letter);
}
```

Into an ES5-compatible JavaScript output:

```js{3} title="dist/for-of-loop.js"
var letters = ['A', 'B', 'C'];
 
for (var _i = 0, letters_1 = letters; _i < letters_1.length; _i++) {
  var letter = letters_1[_i];
  console.log(letter);
}
```

TypeScript is great at downleveling syntax, but it does not offer polyfills for newer APIs. If you want to work with modern built-in iterables such as `Map` and `Set` on older platforms, you'll need to enable the [<VPIcon icon="iconfont icon-typescript"/>downlevelteration](https://typescriptlang.org/tsconfig/#downlevelIteration) compiler flag:

```json{5} title="tsconfig.json"
{
  "compilerOptions": {
    "lib": ["ES2022"],
    "target": "ES5",
    "downlevelIteration": true
    // ...
  }
}
```

This way you can use a `Set` when targeting ES5 runtimes:

```ts{1} title="set.ts"
const letters = new Set(['A', 'B', 'C']);
 
for (const letter of letters) {
  console.log(letter);
}
```

---

## The Perfect Composition: Iterable Iterators

Objects can be turned into **iterable iterators** by following the iteration protocol and the iterable protocol. In practical terms this means we need to provide a `next` method to comply with the iterator protocol and a `[Symbol.iterator]` property to comply with the iterable protocol:

```ts{6,9} title="iterable-iterator.ts"
function getIterable() {
  let i = 0;
  const letters = ['A', 'B', 'C'];
 
  const iterable: IterableIterator<string> = {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      while (i < letters.length) {
        const letter = letters[i];
        i += 1;
        return { value: letter, done: false };
      }
      return { value: null, done: true };
    },
  };
 
  return iterable;
}
 
const letters = getIterable();
 
for (const letter of letters) {
  console.log(letter);
}
```

Since TypeScript is a multiparadigm language, this can also be achieved using classes:

```ts{1,5,9} title="iterable-iterator-oop.ts"
class MyIterableIterator implements IterableIterator<string> {
  private i = 0;
  private letters = ['A', 'B', 'C'];
 
  [Symbol.iterator](): IterableIterator<string> {
    return this;
  }
 
  next(): IteratorResult<string, null> {
    while (this.i < this.letters.length) {
      const letter = this.letters[this.i];
      this.i += 1;
      return { value: letter, done: false };
    }
    return { value: null, done: true };
  }
}
 
function getIterable() {
  return new MyIterableIterator();
}
 
const letters = getIterable();
 
for (const letter of letters) {
  console.log(letter);
}
```

---

## Handling Promises with Async Iterables

Similar to the former protocols for iterators and iterables, there are async counterparts. Just like the `[Symbol.iterator]` property, an async iterable must define a `[Symbol.asyncIterator]` method that returns an async iterator. An async iterator can be created by returning a `Promise` that yields the iteration result:

```ts{1,5,9} title="async-iterable-iterator-oop.ts"
class MyIterableIterator implements AsyncIterableIterator<string> {
  private i = 0;
  private letters = ['A', 'B', 'C'];
 
  [Symbol.asyncIterator](): AsyncIterableIterator<string> {
    return this;
  }
 
  next(): Promise<IteratorResult<string, null>> {
    while (this.i < this.letters.length) {
      const letter = this.letters[this.i];
      this.i += 1;
      return new Promise((resolve) => {
        // Return one result per second
        const callback = () => resolve({ value: letter, done: false });
        const timeout = 1_000;
        setTimeout(callback, timeout);
      });
    }
    return Promise.resolve({ value: null, done: true });
  }
}
 
function getAsyncIterable() {
  return new MyIterableIterator();
}
 
const letters = getAsyncIterable();
 
for await (const letter of letters) {
  console.log(letter);
}
```

Using async iterables allows you to use [<VPIcon icon="fa-brands fa-firefox"/>for-await-of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of) statements.

---

## Making everything simpler: Generator Functions

When creating custom iterable iterators, context is often required (such as temporary variables to store the latest index). In our previous examples, we needed to monitor an increment named `i` and adhere to the iterator protocol by returning an **iterator result object** in the format `{ value: any, done: boolean }`. Managing all these aspects becomes simpler with a generator function.

A **generator function** conforms to the iterator protocol and the iterable protocol. It is defined using the `function*` keyword (note the asterisk!) and makes use of the `yield` keyword. By using the `yield` keyword, your returned value will be packed in the form of an **iterator result object**. This ensures that your returned values follow the iteration protocol:

```ts{1,3} title="generator.ts"
function* getGenerator(): Generator<string> {
  for (const letter of ['A', 'B', 'C']) {
    yield letter;
  }
  return null;
}
 
const iterator = getGenerator();
console.log(iterator.next()); // { value: 'A', done: false }
```

The generator object, returned by a generator function, also includes an implementation of `[Symbol.iterator]`, making it iterable:

```ts title="generator-iteration.ts"
// ...
 
const letters = getGenerator();
 
for (const letter of letters) {
  console.log(letter);
}
```

Generators also allow you to provide initial values from which they begin generating subsequent values:

```ts{1,13} title="generator-argument.ts"
function* generateDate(timestamp: number, intervalInMillis: number): Generator<Date> {
  let i = 0;
  while (i < 10) {
    i += 1;
    const timeIncrement = i * intervalInMillis;
    yield new Date(timestamp + timeIncrement);
  }
}
 
const start = new Date().getTime();
const oneMinuteInMillis = 60_000;
 
const dates = generateDate(start, oneMinuteInMillis);
 
for (const date of dates) {
  console.log(date);
}
```

---

## Real-world coding with Async Generators

Similar to async iterators, there are async generators which can be implemented using an `async function*` declaration. They enable iterations using the `for-await-of` statement:

```ts{1,10} title="async-generator.ts"
async function* getGenerator(): AsyncGenerator<string> {
  for (const letter of ['A', 'B', 'C']) {
    yield letter;
  }
  return null;
}
 
const letters = getGenerator();
 
for await (const letter of letters) {
  console.log(letter);
}
```

Async generators are highly beneficial in real-world scenarios as they enable iteration over large datasets without the need to load them into memory. They are also helpful for managing resource-intensive computations as they allow for easy storage of context.

Let's explore this through the examples below.

---

## Real-World Scenarios

### Case 1: Streaming data

As mentioned earlier, iterables are beneficial for looping over large datasets since they can yield values in chunks, conserving memory space. The [<VPIcon icon="fa-brands fa-firefox"/>ReadableStream API](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) implements the async iterable protocol, allowing you to use `for-await-of` statements right away:

```ts{4,12,17} title="readable-stream.ts"
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import split2 from 'split2';
 
// ESM globals
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
const getReadableStream = (): NodeJS.ReadableStream => {
  const filePath = path.join(__dirname, 'data.txt');
  return fs.createReadStream(filePath, 'utf8').pipe(split2());
};
 
const data = getReadableStream();
 
for await (const chunk of data) {
  console.log(chunk);
}
```

In the above example the [split2 (<VPIcon icon="iconfont icon-github"/>`mcollina/split2`)](https://github.com/mcollina/split2) library is being used to split the data into multiple lines by separating them at the end of each line. You also have to install the `@types/node` package to receive typings for `NodeJS.ReadableStream`.

### Case 2: Fetching remote content

Generators can also be very useful for fetching data from paginated REST endpoints. Since generators are essentially functions, you can effortlessly share them throughout your code. Another significant advantage is that they encapsulate the iteration context (such as the next URL), resulting in clean-looking consuming code without the need for extra boilerplate for the iteration process:

```ts ollapsed-lines title="fetch-generator.ts"
// Schema validation
import { z } from 'zod';
 
const ResponseDataSchema = z.object({
  next_url: z.union([z.string(), z.undefined()]),
  results: z.array(
    z.object({
      c: z.number(),
      o: z.number(),
    })
  ),
});
 
// Providing Code
export async function* fetchData(address: string, apiKey: string) {
  let url: URL | null = new URL(address);
 
  while (url) {
    url.searchParams.append('limit', '200');
    url.searchParams.append('apiKey', apiKey);
 
    const response = await fetch(url);
    const payload = await response.json();
    const data = ResponseDataSchema.parse(payload);
    yield data;
 
    if (data.next_url) {
      url = new URL(data.next_url);
    } else {
      url = null;
    }
  }
}
 
// Consuming Code
const resource = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/minute/2023-01-09/2023-01-09';
const apiKey = 'top-secret';
 
const data = fetchData(resource, apiKey);
 
for await (const chunk of data) {
  console.log(chunk, chunk.results.length);
}
```

---

## Iterables vs. Enumberables

We have seen that iterables can be iterated over using the `for-of` loop. There are also so called enumerables which can be iterated over using the `for-in` statement. Iterables and Enumerables are closely related but serve different purposes: Iterables return values, while enumerables return properties / indexes:

```ts title="enumerable-object.ts"
const object = { a: 1, b: 2, c: 3 };
 
for (const index in object) {
  console.log(index); // a, b, c
}
```

```ts title="enumerable-array.ts"
const array = [1, 2, 3];
 
for (const index in array) {
  console.log(index); // 0, 1, 2
}
```

You can use the `for-of` statement by turning an object into an `Array` which itself is iterable:

```ts title="iterable-object.ts"
const object = { a: 1, b: 2, c: 3 };
 
for (const [index, value] of Object.entries(object)) {
  console.log(index, value); // a 1, b 2, c 3
}
```

::: info Video Tutorial

<VidStack src="youtube/DwRS6f-UzaA" />

:::

::: info ECMAScript References

As this article covers ES5, ES6, and future versions, I want to provide an overview of when each specification was released. This information will help you determine whether to support a specific runtime or not:

| Name | Short |
| :--- | :---: |
| [<VPIcon icon="fas fa-globe"/>ECMAScript 2015](https://262.ecma-international.org/6.0/) | ES6 |
| [<VPIcon icon="fas fa-globe"/>ECMAScript 2016](https://262.ecma-international.org/7.0/) | ES7 |
| [<VPIcon icon="fas fa-globe"/>ECMAScript 2017](https://262.ecma-international.org/8.0/) | ES8 |
| [<VPIcon icon="fas fa-globe"/>ECMAScript 2018](https://262.ecma-international.org/9.0/) | ES9 |
| [<VPIcon icon="fas fa-globe"/>ECMAScript 2019](https://262.ecma-international.org/10.0/) | ES10 |
| [<VPIcon icon="fas fa-globe"/>ECMAScript 2020](https://262.ecma-international.org/11.0/) | ES11 |
| [<VPIcon icon="fas fa-globe"/>ECMAScript 2021](https://262.ecma-international.org/12.0/) | ES12 |
| [<VPIcon icon="fas fa-globe"/>ECMAScript 2022](https://262.ecma-international.org/13.0/) | ES13 |
| [<VPIcon icon="fas fa-globe"/>ECMAScript 2023](https://262.ecma-international.org/14.0/) | ES14 |

:::


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "All you need to know about iterators and generators",
  "desc": "Learn about iterators and generators in TypeScript. Understand how to use for-of loops, iterator protocol, iterable protocol, and async generators. See examples and practical applications.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/all-you-need-to-know-about-iterators-and-generators.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
