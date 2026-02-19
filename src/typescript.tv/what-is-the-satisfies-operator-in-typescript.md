---
lang: en-US
title: "What is the satisfies operator in TypeScript?"
description: "Article(s) > What is the satisfies operator in TypeScript?"
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
      content: "Article(s) > What is the satisfies operator in TypeScript?"
    - property: og:description
      content: "What is the satisfies operator in TypeScript?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/what-is-the-satisfies-operator-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-07-07
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
  name="What is the satisfies operator in TypeScript?"
  desc="TypeScript 4.9 introduces the ”satisfies” operator, which allows us to verify that the type of an expression matches a specific type. This operator can be used to narrow down a union type and provide more precise type checking. In the example given, the ”satisfies” operator is used to restrict the keys and values of a record type."
  url="https://typescript.tv/new-features/what-is-the-satisfies-operator-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

TypeScript 4.9 introduces the "satisfies" operator, which allows us to verify that the type of an expression matches a specific type. This operator can be used to narrow down a union type and provide more precise type checking. In the example given, the "satisfies" operator is used to restrict the keys and values of a record type.

The introduction of the **satisfies** operator in [<VPIcon icon="fa-brands fa-microsoft"/>TypeScript 4.9](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/) enables us to verify that the type of an expression corresponds to a specific type. It can offer greater precision compared to a type annotation and assist in narrowing down a union type.

---

## Example

```ts
type TeamMembers = string | string[];
 
type TeamNames = 'Bulletproof' | 'Iconic';
 
type Teams = Record<TeamNames, TeamMembers>;
 
const AllTeams = {
  Bulletproof: ['Alex', 'Lara', 'Sofia'],
  Iconic: 'Benny',
};
```

In the given example, we define a record named `Teams` that permits keys of the `TeamNames` type and values of the `TeamMembers` type. The `TeamMembers` type represents a union of either a string or a string array. Our desired outcome for the `AllTeams` constant is to restrict the keys to the potential `TeamNames` options while offering string or string array methods for the values, depending on whether the value is an array or not.

---

## Problems with Type Annotation

When using a [**type annotation**](/typescript.tv/glossary/type-annotation.md) for `AllTeams`, we encounter a limitation in accessing specific methods based on the value types. Since the value type of the `Record` is a union, we are restricted to using intersecting functionality only:

```ts
type TeamMembers = string | string[];
 
type TeamNames = 'Bulletproof' | 'Iconic';
 
type Teams = Record<TeamNames, TeamMembers>;
 
const AllTeams: Teams = {
  Bulletproof: ['Alex', 'Lara', 'Sofia'],
  Iconic: 'Benny',
};
 
// TS2339: Property 'join' does not exist on type 'TeamMembers'.
console.log(AllTeams.Bulletproof.join(', '));
 
// TS 2339: Property 'toUpperCase' does not exist on type 'TeamMembers'.
console.log(AllTeams.Iconic.toUpperCase());
```

---

## Problems with Type Inference

When relying on [**type inference**](/typescript.tv/glossary/type-inference.md), our teams `Bulletproof` and `Iconic` will receive appropriate type inferences, so we can use their specific methods. The downside is that we no longer have restrictions on the `TeamNames`, which grants us the ability to introduce arbitrary names, such as `IsNotAllowed`:

```ts
type TeamMembers = string | string[];
 
type TeamNames = 'Bulletproof' | 'Iconic';
 
type Teams = Record<TeamNames, TeamMembers>;
 
const AllTeams = {
  Bulletproof: ['Alex', 'Lara', 'Sofia'],
  Iconic: 'Benny',
  // Key is not part of "TeamNames"
  IsNotAllowed: 'Bob',
};
 
// ok!
console.log(AllTeams.Bulletproof.join(', '));
 
// ok!
console.log(AllTeams.Iconic.toUpperCase());
```

---

## Solution with Satisfies Operator

When using the `satisfies` operator, TypeScript will infer our `AllTeams` constant based on the `Teams` type and additionally narrow the `TeamMembers` union, allowing us to use specific methods associated with the inferred type:

```ts
type TeamMembers = string | string[];
 
type TeamNames = 'Bulletproof' | 'Iconic';
 
type Teams = Record<TeamNames, TeamMembers>;
 
const AllTeams = {
  Bulletproof: ['Alex', 'Lara', 'Sofia'],
  Iconic: 'Benny',
  // Ok, no other keys possible!
} satisfies Teams;
 
// ok!
console.log(AllTeams.Bulletproof.join(', '));
// ok!
console.log(AllTeams.Iconic.toUpperCase());
```

The satisfies operator helps in inferring the type, enhancing the developer experience during design time. It does not generate any additional JavaScript code. The resulting JavaScript output for our example will be as follows:

```js
'use strict';
const AllTeams = {
  Bulletproof: ['Alex', 'Lara', 'Sofia'],
  Iconic: 'Benny',
  // Ok, no other keys possible!
};
// ok!
console.log(AllTeams.Bulletproof.join(', '));
// ok!
console.log(AllTeams.Iconic.toUpperCase());
```

---

## Alternative Solution

If you are using a TypeScript version below 4.9, you can solve the initial use case by defining an [**object literal type**](/typescript.tv/glossary/literal-types.md) for `Teams`. This approach offers less flexibility compared to defining a union for the values and relying on TypeScript to infer the specific type. Despite this limitation, using an object literal type will still enforce constraints on the key names and provide access to the specific methods available for the values:

```ts
type Teams = {
  Bulletproof: string[];
  Iconic: string;
};
 
const AllTeams: Teams = {
  Bulletproof: ['Alex', 'Lara', 'Sofia'],
  Iconic: 'Benny',
};
 
console.log(AllTeams.Bulletproof.join(', '));
console.log(AllTeams.Iconic.toUpperCase());
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is the satisfies operator in TypeScript?",
  "desc": "TypeScript 4.9 introduces the ”satisfies” operator, which allows us to verify that the type of an expression matches a specific type. This operator can be used to narrow down a union type and provide more precise type checking. In the example given, the ”satisfies” operator is used to restrict the keys and values of a record type.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/what-is-the-satisfies-operator-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
