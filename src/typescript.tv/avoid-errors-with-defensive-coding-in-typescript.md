---
lang: en-US
title: "Avoid Errors with Defensive Coding in TypeScript"
description: "Article(s) > Avoid Errors with Defensive Coding in TypeScript"
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
      content: "Article(s) > Avoid Errors with Defensive Coding in TypeScript"
    - property: og:description
      content: "Avoid Errors with Defensive Coding in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/avoid-errors-with-defensive-coding-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-05-09
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
  name="Avoid Errors with Defensive Coding in TypeScript"
  desc="Defensive coding is a programming practice that helps make TypeScript applications more reliable and robust. It involves checking input data for errors, handling errors gracefully, respecting data boundaries, enforcing assumptions, and providing fail-safe defaults. By following these principles, developers can reduce the risk of bugs and security vulnerabilities."
  url="https://typescript.tv/best-practices/avoid-errors-with-defensive-coding-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Defensive coding is a programming practice that helps make TypeScript applications more reliable and robust. It involves checking input data for errors, handling errors gracefully, respecting data boundaries, enforcing assumptions, and providing fail-safe defaults. By following these principles, developers can reduce the risk of bugs and security vulnerabilities.

Defensive code refers to a programming practice where a developer writes code that anticipates and handles potential issues or errors that might occur during the execution of a TypeScript application.

The goal of defensive coding is to improve the reliability, robustness, and maintainability of TypeScript applications by ensuring it can handle unexpected or incorrect input, recover gracefully from failures, and provide meaningful error messages or responses.

---

## Input Validation

Checking input data for correctness, completeness, and sanity before processing it. This helps prevent unexpected behavior due to invalid or malicious input.

::: tip Example

```ts
function greet(name: string): string {
  if (!name || name.trim().length === 0) {
    throw new Error('Name cannot be empty.');
  }
  return `Hello, ${name}!`;
}
```

In this example, the `greet` function checks if the provided name is empty or consists only of whitespace characters. If so, it throws an error with a clear message. For more robust input validation, this logic could be replaced with [**Zod schema validation**](typescript.tv/why-write-validation-logic-when-zod-can-do-it-better).

:::

---

## Error Handling

Using exception handling or error codes to deal with errors that may occur during the execution of the program. This includes providing clear, helpful error messages to users and logging relevant information for debugging purposes.

::: tip Example

```ts
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}
 
function getResult(a: number, b: number): number | null {
  try {
    return divide(a, b);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return null;
  }
}
```

Here, the `getResult` uses a try-catch block to handle any errors that might occur, logging the error message and returning a default value of `null`.

:::

---

## Boundary Checks

Ensuring that array indices, buffer sizes, and other data boundaries are respected to avoid buffer overflows, index out-of-bounds errors, and other issues related to memory access.

::: tip Example

```ts
function getArrayElement<T>(arr: T[], index: number): T | null {
  if (index < 0 || index >= arr.length) {
    console.error('Index out of bounds.');
    return null;
  }
  return arr[index];
}
```

In code above, the `getArrayElement` function checks if the provided index is within the valid range for the `arr` array. If the index is out of bounds, it logs an error message and returns `null`.

:::

---

## Invariants and Assertions

Invariants are conditions or assumptions that should always hold true at certain points in a program's execution. They serve as a way to ensure that the program's state remains consistent and predictable. Using **assertion functions** can enforce assumptions about the state of the program at various points in its execution. These help catch programming errors early and can serve as a form of documentation for the expected behavior of the code.

::: tip Example

```ts
import assert from 'node:assert';
 
function squareRoot(x: number): number {
  assert.ok(x >= 0, 'Cannot compute the square root of a negative number');
  return Math.sqrt(x);
}
 
console.log(squareRoot(0));
```

The `squareRoot` function asserts that the input `x` is non-negative. If the input is negative or zero, it throws an error with a clear message.

:::

---

## Fail-safe Defaults

Providing default values or behaviors for situations where the program cannot determine the appropriate action to take due to an error or unexpected input.

::: tip Example

```ts
interface User {
  name: string;
  age: number;
}
 
function createUser(name: string, age: number = 0): User {
  return {
    name,
    age,
  };
}
 
const user = createUser('Benny');
```

In the `createUser` function, a fail-safe default `age` is set if no value is provided. This ensures that the function will always return a valid `User` object.

:::

By incorporating these principles, defensive coding helps to minimize the risk of software bugs, security vulnerabilities, and other issues that can lead to crashes, data loss, or incorrect program behavior. Remember, these are just simple examples to illustrate various defensive coding practices.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Avoid Errors with Defensive Coding in TypeScript",
  "desc": "Defensive coding is a programming practice that helps make TypeScript applications more reliable and robust. It involves checking input data for errors, handling errors gracefully, respecting data boundaries, enforcing assumptions, and providing fail-safe defaults. By following these principles, developers can reduce the risk of bugs and security vulnerabilities.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/avoid-errors-with-defensive-coding-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
