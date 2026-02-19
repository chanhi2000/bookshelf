---
lang: en-US
title: "Boost Your TypeScript Tests with Mutation Testing"
description: "Article(s) > Boost Your TypeScript Tests with Mutation Testing"
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
      content: "Article(s) > Boost Your TypeScript Tests with Mutation Testing"
    - property: og:description
      content: "Boost Your TypeScript Tests with Mutation Testing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/boost-your-typescript-tests-with-mutation-testing.html
prev: /programming/ts/articles/README.md
date: 2024-07-02
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
  name="Boost Your TypeScript Tests with Mutation Testing"
  desc="Mutation testing evaluates the quality of your test suite by introducing small changes (mutations) to your code and checking if your tests can detect them. This tutorial will guide you through understanding mutation testing, setting up Stryker for TypeScript, and using it to enhance your test suite and code quality."
  url="https://typescript.tv/testing/boost-your-typescript-tests-with-mutation-testing"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Mutation testing evaluates the quality of your test suite by introducing small changes (mutations) to your code and checking if your tests can detect them. This tutorial will guide you through understanding mutation testing, setting up Stryker for TypeScript, and using it to enhance your test suite and code quality.

---

## What is Mutation Testing?

Mutation testing frameworks, like [<VPIcon icon="fas fa-globe"/>Stryker](https://stryker-mutator.io/), create copies of your source code and introduce small changes to see if your test suite detects these changes. These changes are called mutants. If your tests are well-written, they will catch these mutants, resulting in what is known as "killing the mutant."

The Stryker Mutations includes mutators to make changes such as:

- [<VPIcon icon="fas fa-globe"/>Altering arithmetic operators](https://stryker-mutator.io/docs/mutation-testing-elements/supported-mutators/#arithmetic-operator) (e.g., `+` to `-`)
- [<VPIcon icon="fas fa-globe"/>Changing logical operators](https://stryker-mutator.io/docs/mutation-testing-elements/supported-mutators/#logical-operator) (e.g., `&&` to `||`)
- [<VPIcon icon="fas fa-globe"/>Modifying string literals](https://stryker-mutator.io/docs/mutation-testing-elements/supported-mutators/#string-literal) (e.g., turning strings into empty strings)

---

## Setting Up Stryker for TypeScript

To get started with Stryker, run the following command in your project:

```sh
npm init stryker
```

This command will install Stryker and set up a configuration file tailored to your project and test framework (Mocha, Jest, Vitest, etc.).

Here is an example configuration for a Node.js project using Vitest:

```json title="stryker.config.json"
{
  "$schema": "./node_modules/@stryker-mutator/core/schema/stryker-schema.json",
  "coverageAnalysis": "perTest",
  "packageManager": "npm",
  "reporters": ["html", "clear-text", "progress"],
  "testRunner": "vitest"
}
```

---

## Code Mutation Examples

After setting up Stryker, you can run mutation testing with the following command:

```sh
npx stryker run
```

This command generates a report that shows how well your test suite performs against the mutations Stryker has introduced. Let's look at an example to understand how Stryker can help improve your test quality. Consider the following simple function:

```ts title="sayHello.ts"
export function sayHello() {
  return 'Hello';
}
```

A weak test might only check if the function returns a defined value:

```ts title="sayHello.test.ts"
import { sayHello } from './sayHello.js';
 
describe('sayHello', () => {
  it('returns Hello', () => {
    const text = sayHello();
    expect(text).toBeDefined();
  });
});
```

Stryker might mutate the function to return an empty string:

```ts title="sayHello.ts"
export function sayHello() {
  return '';
}
```

The weak test would pass even with this mutation. A stronger test would check the actual value being returned:

```ts title="sayHello.test.ts"
import { sayHello } from './sayHello.js';
 
describe('sayHello', () => {
  it('returns Hello', () => {
    const text = sayHello();
    expect(text).toBeDefined();
  });
});
```

---

## Identifying Unnecessary Tests

Stryker also identifies tests that do not contribute to detecting mutations. For example:

```ts title="sayHello.test.ts"
import { sayHello } from './sayHello.js';
 
describe('sayHello', () => {
  it('returns Hello', () => {
    const text = sayHello();
    expect(text).toBeDefined();
  });
 
  it('tests the same', () => {
    const text = sayHello();
    expect(text).toBeDefined();
  });
 
  it("doesn't test anything", () => {});
});
```

Stryker will flag redundant tests (like the second one) and ineffective tests (like the third one).

---

## Finding Ineffective Source Code

Consider the following TypeScript function that prints all elements of an array:

```ts title="printArray.ts"
export function printArray(array: number[]) {
  let index = 0;
  while (index < array.length) {
    console.log(array[index]);
    index++;
  }
  return array[index - 1];
}
```

A mutation might alter the while loop, causing an infinite loop and a timeout. Stryker would flag this, allowing you to improve your code:

```ts title="printArray.ts"
export function printArray(array: number[]) {
  for (const value of array) {
    console.log(value);
  }
  return array[array.length - 1];
}
```

You can then write tests to ensure your code handles these scenarios correctly:

```ts title="printArray.test.ts"
import { printArray } from './printArray.js';
 
describe('printArray', () => {
  it('returns the last array item', () => {
    const consoleMock = vi.spyOn(console, 'log');
    const lastItem = printArray([1, 2, 3, 4]);
    expect(lastItem).toBe(4);
    expect(consoleMock).toHaveBeenCalledTimes(4);
  });
});
```

---

## Disabling Mutations

We could instruct Stryker to disable certain modifications, but that would defeat the purpose of using a mutation testing framework. However, this approach can be useful if you don't have the capacity to fix all your tests at once and prefer to upgrade them gradually:

```ts title="printArray.ts"
export function printArray(array: number[]) {
  let index = 0;
  // Stryker disable next-line BlockStatement,ConditionalExpression,EqualityOperator
  while (index < array.length) {
    console.log(array[index]);
    // Stryker disable next-line UpdateOperator
    index++;
  }
  return array[array.length - 1];
}
```

---

## Testing Large Codebases

For large codebases, Stryker offers an [<VPIcon icon="fas fa-globe"/>incremental mode](https://stryker-mutator.io/docs/stryker-js/incremental/#incremental-mode), which focuses on testing only the parts of the code that have changed since the last mutation test run. This feature is especially useful in CI environments where you may want to run tests only for new code committed in a Pull Request.

::: info Video Tutorial

<VidStack src="youtube/LCNvn4L0CWM" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Boost Your TypeScript Tests with Mutation Testing",
  "desc": "Mutation testing evaluates the quality of your test suite by introducing small changes (mutations) to your code and checking if your tests can detect them. This tutorial will guide you through understanding mutation testing, setting up Stryker for TypeScript, and using it to enhance your test suite and code quality.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/boost-your-typescript-tests-with-mutation-testing.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
