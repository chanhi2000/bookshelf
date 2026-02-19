---
lang: en-US
title: "Fixing TypeScript Error: Type undefined is not assignable to type string"
description: "Article(s) > Fixing TypeScript Error: Type undefined is not assignable to type string"
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
      content: "Article(s) > Fixing TypeScript Error: Type undefined is not assignable to type string"
    - property: og:description
      content: "Fixing TypeScript Error: Type undefined is not assignable to type string"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/fixing-typescript-error-type-undefined-is-not-assignable-to-type-string.html
prev: /programming/ts/articles/README.md
date: 2024-07-03
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
  name="Fixing TypeScript Error: Type undefined is not assignable to type string"
  desc="Running into the TypeScript error ”Type undefined is not assignable to type string”? It's a frequent error when variables might be undefined but functions demand strings. Fix it with string concatenation, templates, or assertion functions."
  url="https://typescript.tv/hands-on/fixing-typescript-error-type-undefined-is-not-assignable-to-type-string"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Running into the TypeScript error "Type undefined is not assignable to type string"? It's a frequent error when variables might be undefined but functions demand strings. Fix it with string concatenation, templates, or assertion functions.

In TypeScript development, encountering the error message "Type `undefined` is not assignable to type `string`" is a common scenario. It appears when you have a variable that can be either a string or undefined, and you try to use it with a function that explicitly requires a string. The issue also arises when working with environment variables in Node.js applications, where the presence of an environment variable isn't guaranteed. Let's dive into the reasons behind this error and explore strategies to fix it.

---

## Understanding the Error

Consider a TypeScript application where you retrieve environment variables using `process.env` in Node.js:

```ts
const first = process.env.FIRST_NAME;
const last = process.env.LAST_NAME;
 
function printName(first: string, last: string) {
  return `${first} ${last}`;
}
 
// TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
printName(first, last);
```

In the code snippet above, `first` and `last` are inferred as type `string | undefined` because `process.env` can return `undefined` if the environment variables are not set. The `printName` function, expects both parameters to be of type `string`. Hence, TypeScript raises the error TS2345 because it cannot guarantee that `first` and `last` are always strings.

---

## Fixing the Error

To fix error TS2345, you have several approaches, each with its advantages and considerations:

### Using String Concatenation

JavaScript and TypeScript implicitly convert `undefined` to the string `"undefined"` when concatenated with a string. This approach is called [type coercion](/glossary#type-coercion). In our example it ensures that `printName` receives always strings:

```ts
const first = process.env.FIRST_NAME;
const last = process.env.LAST_NAME;
 
function printName(first: string, last: string) {
  return `${first} ${last}`;
}
 
// Error is being fixed by using string concatenations
printName(first + '', last + '');
```

This solution has one disadvantage though: you won't be notified if there is no input for the first name or last name. This can cause your code to run in an uncontrolled state. For example, if `process.env.FIRST_NAME` is undefined, it will be converted to the string `"undefined"` resulting in values like `"undefined Walther"`.

### Using String Templates

String templates offer a cleaner syntax compared to string concatenation but share the same drawback of not validating whether the variables are actually defined:

```ts
const first = process.env.FIRST_NAME;
const last = process.env.LAST_NAME;
 
function printName(first: string, last: string) {
  return `${first} ${last}`;
}
 
// Error is being fixed by using a string template
printName(`${first}`, `${last}`);
```

### Using Assertion Functions

A much better solution to make your functions work with defined values is using an assertion function. You can write your own assertion functions by using the `asserts` keyword (see Type Checking with Assertion Functions) or using Node's built-in `assert:node` module as shown below:

```ts{11-12}
import assert from 'node:assert';
 
const first = process.env.FIRST_NAME;
const last = process.env.LAST_NAME;
 
function printName(first: string, last: string) {
  return `${first} ${last}`;
}
 
// Error is being fixed by using an assertion function
assert.ok(first);
assert.ok(last);
printName(first, last);
```

The [<VPIcon icon="fa-brands fa-node"/>assert.ok function](https://nodejs.org/api/assert.html#assertokvalue-message) verifies that your variables are truthy (not `null`, `undefined`, `NaN`, `""`, `0`, or `false`). This concept will cause your code to crash when undefined inputs are used, which is better than running in an uncontrolled state.

You can also enhance error messages by adding descriptions, making your code more informative:

```ts
import assert from 'node:assert';
 
const first = process.env.FIRST_NAME;
const last = process.env.LAST_NAME;
 
function printName(first: string, last: string) {
  return `${first} ${last}`;
}
 
// Error is being fixed by using an assertion function
assert.ok(first, 'Fist name is missing');
assert.ok(last, 'Last name is missing');
printName(first, last);
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fixing TypeScript Error: Type undefined is not assignable to type string",
  "desc": "Running into the TypeScript error ”Type undefined is not assignable to type string”? It's a frequent error when variables might be undefined but functions demand strings. Fix it with string concatenation, templates, or assertion functions.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/fixing-typescript-error-type-undefined-is-not-assignable-to-type-string.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
