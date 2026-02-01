---
lang: en-US
title: "What is Type Compatibility in TypeScript?"
description: "Article(s) > What is Type Compatibility in TypeScript?"
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
      content: "Article(s) > What is Type Compatibility in TypeScript?"
    - property: og:description
      content: "What is Type Compatibility in TypeScript?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/what-is-type-compatibility-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-07-12
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
  name="What is Type Compatibility in TypeScript?"
  desc="TypeScript has a structural type system, which means that types are compatible based on their shape or structure rather than their names. This allows you to interchangeably use types with different names but identical properties. You can assign one type to another if they share the same properties, including optional properties."
  url="https://typescript.tv/new-features/what-is-type-compatibility-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

TypeScript has a structural type system, which means that types are compatible based on their shape or structure rather than their names. This allows you to interchangeably use types with different names but identical properties. You can assign one type to another if they share the same properties, including optional properties.

TypeScript uses a **structural type system**, which means that type compatibility is based on the shape or structure of the types rather than their explicit declarations or names. This allows you to define two types with different names but identical properties, enabling interchangeability between them.

---

## Assignment Compatibility

One type can be assigned to another if they share at least the same properties. The assigned type must include all the required properties of the target type, with compatible types for each property.

In the example below, an instance of `Dog` can be passed to the `logCatName` function since both `Cat` and `Dog` types have the same properties:

```ts{2-3,7-8}
type Cat = {
  age: number;
  name: string;
}
 
type Dog = {
  age: number;
  name: string;
}
 
function logCatName(animal: Cat) {
  console.log(animal.name);
}
 
const bobby: Dog = {
  age: 5,
  name: 'Bobby'
};
 
logCatName(bobby);
```

---

## Optional and Additional Properties

The compatibility remains intact even when optional properties (e.g., `catTag`) don't conflict in terms of typing. Additional properties, such as `dogTag`, are compatible as long as the target type doesn't explicitly prohibit them:

```ts{4,10}
type Cat = {
  age: number;
  name: string;
  catTag?: number;
}
 
type Dog = {
  age: number;
  name: string;
  dogTag: number;
}
 
function logCatName(animal: Cat) {
  console.log(animal.name);
}
 
const bobby: Dog = {
  age: 5,
  name: 'Bobby',
  dogTag: 1337
};
 
logCatName(bobby);
```

---

## Disallowing Properties

To explicitly disallow a property, you can utilize [<VPIcon icon="fa-brands fa-youtube"/>the never type](https://youtu.be/YpT0rCWdCaE?t=306), which will require you to update your code:

```ts{5,24}
type Cat = {
  age: number;
  name: string;
  catTag?: number;
  dogTag: never;
}
 
type Dog = {
  age: number;
  name: string;
  dogTag: number;
}
 
function logCatName(animal: Cat) {
  console.log(animal.name);
}
 
const bobby: Dog = {
  age: 5,
  name: 'Bobby',
  dogTag: 1337
};
 
// TS2345: Argument of type 'Dog' is not assignable to parameter of type 'Cat'.
logCatName(bobby);
```

---

## Preventing Compatibility

Type compatibility applies not only to plain types but also to instances of classes. If you want to prevent type compatibility, you can use [**Discriminated Unions**](/typescript.tv/glossary.md#discriminated-unions) or the [**branded types programming pattern**](/typescript.tv/improve-your-type-safety-with-branded-types.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is Type Compatibility in TypeScript?",
  "desc": "TypeScript has a structural type system, which means that types are compatible based on their shape or structure rather than their names. This allows you to interchangeably use types with different names but identical properties. You can assign one type to another if they share the same properties, including optional properties.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/what-is-type-compatibility-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
