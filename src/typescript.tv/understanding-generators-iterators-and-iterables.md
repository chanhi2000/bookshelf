---
lang: en-US
title: "Understanding Generators, Iterators and Iterables"
description: "Article(s) > Understanding Generators, Iterators and Iterables"
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
      content: "Article(s) > Understanding Generators, Iterators and Iterables"
    - property: og:description
      content: "Understanding Generators, Iterators and Iterables"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/understanding-generators-iterators-and-iterables.html
prev: /programming/ts/articles/README.md
date: 2020-11-30
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
  name="Understanding Generators, Iterators and Iterables"
  desc="In this tutorial, you will learn about generator functions in TypeScript. Generator functions are functions that return a generator object, which generates data on demand. You will also learn about the differences between iterators and iterables."
  url="https://typescript.tv/hands-on/understanding-generators-iterators-and-iterables"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

In this tutorial, you will learn about generator functions in TypeScript. Generator functions are functions that return a generator object, which generates data on demand. You will also learn about the differences between iterators and iterables.

A generator function returns a lazy iterator, which generates data only on demand. In the following tutorial, Benny will show you how to code your own generator functions in TypeScript. You will learn the differences between iterators and iterables and how to refactor your code to use generator functions.

::: info Terminology

- A **generator function** is a function, which returns a generator object.
- A **generator object** is an object, which has the properties of an **iterator** and an **iterable**.
- An **iterator** is an object which defines a function called `next`, which returns an object with the properties `value` and `done`.
- An **iterable** is an object which defines a key called `Symbol.iterator`, which returns a generator function.

:::

---

## Generator functions

A **generator function** is a function, which returns a generator object. Generator functions get defined with an asterisk next to the `function` keyword. The return value of a generator function is of type `IterableIterator`, because every generator object is iterable and follows the iterator protocol. Values get returned with the `yield` keyword, which returns a value on demand when calling the `next` function from a generator object. Each subsequent call to `next` continues processing from where the `yield` keyword paused.

```ts{1,6,16,20} title="generator-function.ts"
function* generateDate(timestamp: number, intervalInMillis: number): IterableIterator<Date> {
  let increment = 0;
  while (increment < 10) {
    increment += 1;
    const timeIncrement = increment * intervalInMillis;
    yield new Date(timestamp + timeIncrement);
  }
}
 
const start = new Date('2020-11-29T00:00:00.000Z').getTime();
const oneMinuteInMillis = 60_000;
 
const generatorObject = generateDate(start, oneMinuteInMillis);
 
// I am an "iterator", you can call `next` on me
const { value } = generatorObject.next();
console.log(value); // "2020-11-29T00:01:00.000Z"
 
// I am "iterable", you can run me in loops
for (const date of generatorObject) {
  console.log(date);
}
```

---

## Iterator objects

Iterators are objects implementing the [<VPIcon icon="fa-brands fa-firefox"/>iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol). In simplified terms, an iterator is an object with a `next` method. This next method has to return new objects, each of which has the properties `value` (of type `any`) and `done` (of type `boolean`).

```ts{5,10,12} title="iterator.ts"
function generateDate(timestamp: number, intervalInMillis: number) {
  let increment = 0;
 
  const dateIterator = {
    next: function () {
      while (increment < 10) {
        increment += 1;
        const timeIncrement = increment * intervalInMillis;
        const nextDate = new Date(timestamp + timeIncrement);
        return { value: nextDate, done: false };
      }
      return { value: undefined, done: true };
    },
  };
 
  return dateIterator;
}
 
const start = new Date('2020-11-29T00:00:00.000Z').getTime();
const oneMinuteInMillis = 60_000;
 
const iterator = generateDate(start, oneMinuteInMillis);
 
let result = iterator.next();
while (!result.done) {
  result = iterator.next();
  console.log(result.value);
}
```

---

## Iterable objects

An object is **iterable**, when it defines a default iterator for the key of `Symbol.iterator`.

```ts{11} title="iterable.ts"
function* generateDate(timestamp: number, intervalInMillis: number): IterableIterator<Date> {
  let increment = 0;
  while (increment < 10) {
    increment += 1;
    const timeIncrement = increment * intervalInMillis;
    yield new Date(timestamp + timeIncrement);
  }
}
 
const dateIterable = {
  [Symbol.iterator]: generateDate,
};
```

::: info Video Tutorial

<VidStack src="youtube/qZN0Lo-f3iE" />

:::

---

## Summary

- The **iterator symbol** (`Symbol.iterator`) is a factory of iterators
- **Iterators** are useful to generate (an infinite amount of) data
- **Iterables** can be run in loops or spreaded into arrays
- The `yield` keyword can be used to pause and resume a **generator function**
- **Generator functions** are a concept of ES6 and can be used in TypeScript
- The return type of a generator function in TypeScript is an **iterable iterator**

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding Generators, Iterators and Iterables",
  "desc": "In this tutorial, you will learn about generator functions in TypeScript. Generator functions are functions that return a generator object, which generates data on demand. You will also learn about the differences between iterators and iterables.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/understanding-generators-iterators-and-iterables.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
