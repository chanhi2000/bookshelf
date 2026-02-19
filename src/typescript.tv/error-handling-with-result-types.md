---
lang: en-US
title: "Error Handling with Result Types"
description: "Article(s) > Error Handling with Result Types"
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
      content: "Article(s) > Error Handling with Result Types"
    - property: og:description
      content: "Error Handling with Result Types"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/error-handling-with-result-types.html
prev: /programming/ts/articles/README.md
date: 2025-07-08
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
  name="Error Handling with Result Types"
  desc="Learn how to replace traditional try & catch error handling in TypeScript with the safer and more explicit Result Type pattern. This post walks through building a minimal custom Result implementation, explains the benefits of structured error handling, and shows how to adopt the neverthrow library and ESLint configuration."
  url="https://typescript.tv/best-practices/error-handling-with-result-types"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to replace traditional try & catch error handling in TypeScript with the safer and more explicit Result Type pattern. This post walks through building a minimal custom Result implementation, explains the benefits of structured error handling, and shows how to adopt the neverthrow library and ESLint configuration.

JavaScript has traditionally used try and catch for error handling. But if you've used languages like Rust or Go, you've likely seen a cleaner approach where errors are returned as part of the function's return value.

The **Result Type** pattern can be also used in TypeScript. In this article, you’ll learn what it is, how to implement it from scratch, and how to enforce it using well-established libraries and linting rules.

---

## What Is the Result Type Pattern?

One downside of throwing errors is that TypeScript doesn't require you to handle them explicitly, which can lead to uncaught exceptions. In contrast, when a function returns one of two structured types (either a success object with a payload or an error object), TypeScript's type system enforces narrowing, ensuring that both success and failure cases are properly handled.

---

## Minimal Result Type Example

Let’s implement a minimal version of the **Result Type** pattern (`Result<T, E>`) to see it in action:

```ts :collapsed-lines
// Generic Result Type
type Result<T, E = Error> = { ok: true; data: T } | { ok: false; error: E };
 
// Custom Data Type
type User = {
  age: number;
  name: string;
};
 
// Service Function
export function getUser(id: number): Result<User> {
  if (id === 0) {
    return {
      ok: false,
      error: new Error('User not found'),
    };
  }
 
  const user = {
    age: 99,
    name: 'Test User',
  };
 
  return {
    ok: true,
    data: user,
  };
}
 
// Business Logic
const result = getUser(1337);
 
if (result.ok) {
  console.log(`User "${result.data.name}" is "${result.data.age}" years old.`);
} else {
  console.error(result.error.message);
}
```

We start by defining a generic `Result` type. It’s a union of two possible shapes: one for a successful outcome and one for an error. If the operation is successful, the function returns an object with `ok: true` and a data payload. If it fails, it returns `ok: false` along with an error. The generic parameters allow flexibility as the success type `T` can be anything, and the error type `E` defaults to the built-in Error object unless specified otherwise.

The `User` type represents the kind of data we expect to return from our function. It includes a name and an age.

The function called `getUser` simulates fetching a user by ID. If the provided ID is 0, the function will return an error wrapped in the Result type. Otherwise, it constructs a fake user and returns it as a successful result. The key detail here is that the function never throws. It returns a clearly structured result that always has the same outer shape. This allows the caller to confidently handle both cases.

Finally, we call `getUser` in our business logic and thanks to TypeScript’s control flow analysis we are forced to narrow down the type to access the payload data. This forces you to handle both the success and failure cases explicitly. There’s no silent failure, no need for try/catch blocks, and no risk of forgetting to handle an exception. Everything is out in the open, and the type system backs you up at every step.

Using this minimal version, you get a lot of benefits right away: type safety, predictable control flow, and clearer intent. However, as your application grows, this pattern can get repetitive. You'll often want to transform results, chain operations, or handle asynchronous cases. That's where dedicated libraries like `neverthrow` come in which offer an ergonomic solution while preserving the same core idea.

---

## Using neverthrow

Let’s now take the minimal Result example from earlier and refactor it using `neverthrow`, a small but powerful library that brings Rust-style result handling to TypeScript.

To get started, install the package using your package manager:

```sh
npm install neverthrow
```

Once installed, you can import its core utilities: `ok`, `err`, and the `Result` type. There’s no manual object construction and no risk of forgetting a property or making a typo as everything is based on utility functions:

```ts :collapsed-lines
// Generic Result Type and Utility Functions
import { Result, ok, err } from 'neverthrow';
 
// Custom Data Type
type User = {
  age: number;
  name: string;
};
 
// Service Function
export function getUser(id: number): Result<User, Error> {
  if (id === 0) {
    return err(new Error('User not found'));
  }
 
  const user = {
    age: 99,
    name: 'Test User',
  };
 
  return ok(user);
}
 
// Business Logic
const result = getUser(1337);
 
if (result.isOk()) {
  console.log(`User "${result.value.name}" is "${result.value.age}" years old.`);
} else {
  console.error(result.error.message);
}
```

When you call the `getUser` service function, you use neverthrow's `isOk()` or `isErr()` methods to safely unwrap the result. These methods act as type guards and let TypeScript infer whether the result contains a `value` or an `error`, depending on the branch you're in. This works almost identically to the minimal version but with standardized guardrails.

---

## Enforcing neverthrow

The real benefit of using neverthrow comes into focus as your codebase grows. Not only does it make your code easier to read and reason about, but it also integrates with tooling like ESLint. By adding `eslint-plugin-neverthrow`, you can enforce rules that ensure developers don’t accidentally throw errors inside functions that return Result, or forget to unwrap a result properly. This tightens the feedback loop and reinforces good practices across the entire team or AI Coding Agents.

---

## Example ESLint Configuration

```js title=".eslintrc.js"
module.exports = {
  plugins: ['neverthrow'],
  rules: {
    'neverthrow/must-use-result': 'error',
    'neverthrow/no-throw-in-result-function': 'error',
  },
};
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Error Handling with Result Types",
  "desc": "Learn how to replace traditional try & catch error handling in TypeScript with the safer and more explicit Result Type pattern. This post walks through building a minimal custom Result implementation, explains the benefits of structured error handling, and shows how to adopt the neverthrow library and ESLint configuration.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/error-handling-with-result-types.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
