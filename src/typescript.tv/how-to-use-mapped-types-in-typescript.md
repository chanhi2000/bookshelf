---
lang: en-US
title: "How to use Mapped Types in TypeScript"
description: "Article(s) > How to use Mapped Types in TypeScript"
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
      content: "Article(s) > How to use Mapped Types in TypeScript"
    - property: og:description
      content: "How to use Mapped Types in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/how-to-use-mapped-types-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-01-05
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
  name="How to use Mapped Types in TypeScript"
  desc="TypeScript 2.1 introduced mapped types, which allow you to create new types based on the properties of an existing type. For example, you can create a mapped type that has the same keys as an existing type, but with optional values."
  url="https://typescript.tv/new-features/how-to-use-mapped-types-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

TypeScript 2.1 introduced mapped types, which allow you to create new types based on the properties of an existing type. For example, you can create a mapped type that has the same keys as an existing type, but with optional values.

TypeScript 2.1 introduced mapped types which allow you to build new types based on the properties of an existing type.

---

## Mapped Types in Action

For example, you can create a mapped type that is the same keys as an existing type, except that all values are optional:

```ts title="mapped-type.ts"
interface User {
  age: number;
  firstName: string;
  lastName: string;
}
 
type PartialUser = {
  [P in keyof User]?: User[P];
};
 
// The following assignments are allowed now
const user: PartialUser = {
  age: 35,
};
```

The `PartialUser` from the code listed above is called a **mapped type** because it defines a mapping of existing properties to optional properties.

---

## Using Utility Types

TypeScript already provides so-called utility types such as `Partial` or `Required` to transform the modifiers of all properties of a given type. We can make use of this to minimize our code example:

```ts{7} title="mapped-type.ts"
interface User {
  age: number;
  firstName: string;
  lastName: string;
}
 
type PartialUser = Partial<User>;
 
// The following assignments are allowed now
const user: PartialUser = {
  age: 35,
};
```

---

## Mapped Type Modifiers

In [<VPIcon icon="iconfont icon-typescript"/>TypeScript 2.8](https://typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html) property modifiers have been added to extend the capabilities of mapped types. In addition to the optional modifier (`?`), a removing (`-`) and adding (`+`) have been introduced. This makes it possible to remove or add a previously added modifier.

::: tip Example

```ts
interface User {
  age: number;
  firstName: string;
  lastName: string;
}
 
type PartialUser = {
  [P in keyof User]?: User[P];
};
 
type NonPartialUser = {
  [P in keyof PartialUser]-?: PartialUser[P];
};
 
// TS2739: Type '{ age: number; }' is missing the following properties from type 'NonPartialUser': firstName, lastName
const user: NonPartialUser = {
  age: 35,
};
```

:::

---

## Advanced Mapping

It is possible to use [**type assertions**](/typescript.tv/glossary/type-assertion.md) in order to change property names of types completely.

---

## Example

The following code makes use of the built-in Template Literal Type `Capitalize` to change the property names of `UserValidation`:

```ts
interface User {
  age: number;
  firstName: string;
  lastName: string;
}
 
type UserValidation = {
  [P in keyof User as `has${Capitalize<P>}`]: boolean;
};
```

The mapped `UserValidation` type is equivalent to:

```ts
type UserValidation = {
  hasAge: boolean;
  hasFirstName: boolean;
  hasLastName: boolean;
};
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to use Mapped Types in TypeScript",
  "desc": "TypeScript 2.1 introduced mapped types, which allow you to create new types based on the properties of an existing type. For example, you can create a mapped type that has the same keys as an existing type, but with optional values.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/how-to-use-mapped-types-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
