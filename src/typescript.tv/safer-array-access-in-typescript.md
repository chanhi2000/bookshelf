---
lang: en-US
title: "Safer Array Access with TypeScript 4.1"
description: "Article(s) > Safer Array Access with TypeScript 4.1"
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
      content: "Article(s) > Safer Array Access with TypeScript 4.1"
    - property: og:description
      content: "Safer Array Access with TypeScript 4.1"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/safer-array-access-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-06-16
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
  name="Safer Array Access with TypeScript 4.1"
  desc="The `noUncheckedIndexedAccess` compiler option in TypeScript helps catch potential errors when accessing arrays or tuples with undefined or out-of-bounds indices. Enabling this option ensures that developers handle cases where indexed accesses can result in undefined values."
  url="https://typescript.tv/best-practices/safer-array-access-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

The `noUncheckedIndexedAccess` compiler option in TypeScript helps catch potential errors when accessing arrays or tuples with undefined or out-of-bounds indices. Enabling this option ensures that developers handle cases where indexed accesses can result in undefined values.

The [<VPIcon icon="iconfont icon-typescript"/>noUncheckedIndexedAccess](https://typescriptlang.org/tsconfig#noUncheckedIndexedAccess) compiler option is designed to help catch potential errors caused by accessing arrays or tuples with possibly `undefined` or out-of-bounds indices. When this option is enabled, TypeScript assumes that indexed accesses can result in undefined values and requires developers to handle such cases explicitly.

---

## Potential errors with array ranges

For example, consider the following code:

```ts
type User = {
  name: {
    firstName: string;
    lastName: string;
  };
};
 
const array: User[] = [];
const value = array[0];
 
console.log(typeof value); // "undefined"
console.log(value.name.firstName); // TypeError: Cannot read properties of undefined
```

If `noUncheckedIndexedAccess` is disabled, TypeScript assumes that `value` will always yield a `User`, even though `array` is empty. This can result in a runtime error when trying to access an undefined value.

---

## Limitations of checking array length

Checking the array length alone is not sufficient to ensure code safety because arrays can have a length without containing any values, as demonstrated by the following code:

```ts
type User = {
  name: {
    firstName: string;
    lastName: string;
  };
};
 
const array: User[] = new Array(1);
 
if (array.length === 1) {
  const value = array[0];
  console.log(typeof value); // "undefined"
  console.log(value.name.firstName); // TypeError: Cannot read properties of undefined
}
```

---

## Using `noUncheckedIndexedAccess` for code safety

Enabling the `noUncheckedIndexedAccess` option in your TypeScript configuration provides code safety by flagging potential undefined array or tuple accesses with a **TS18048** error. To handle such cases and prevent crashes, you can use the [<VPIcon icon="fa-brands fa-firefox"/>optional chaining operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) (`?.`) in TypeScript:

```ts
type User = {
  name: {
    firstName: string;
    lastName: string;
  }
}
 
const array: User[] = new Array(1);
 
if (array.length === 1) {
  const value = array[0];
  console.log(typeof value); // "undefined"
  console.log(value?.name.firstName); // undefined
}
```

---

## Preventing errors with index signatures

Enabling `noUncheckedIndexedAccess` provides an additional advantage when working with index signatures. Index signatures allow arbitrary property names, as demonstrated in the `options` object below. With the compiler checking index access, you can avoid type errors and ensure safer code execution:

```ts
type Option = {
  // Index Signature
  [propName: string]: {
    name: string;
  };
};
 
function logOption(options: Option, key: string) {
  console.log(options[key]?.name);
}
 
logOption({}, 'key-does-not-exist');
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Safer Array Access with TypeScript 4.1",
  "desc": "The `noUncheckedIndexedAccess` compiler option in TypeScript helps catch potential errors when accessing arrays or tuples with undefined or out-of-bounds indices. Enabling this option ensures that developers handle cases where indexed accesses can result in undefined values.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/safer-array-access-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
