---
lang: en-US
title: "What are Generics and why you should use them?"
description: "Article(s) > What are Generics and why you should use them?"
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
      content: "Article(s) > What are Generics and why you should use them?"
    - property: og:description
      content: "What are Generics and why you should use them?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/what-are-generics-and-why-you-should-use-them.html
prev: /programming/ts/articles/README.md
date: 2024-04-30
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
  name="What are Generics and why you should use them?"
  desc="Generics in TypeScript help create reusable components that work with different data types while keeping type safety. They use placeholders for types, like in the example of managing animals in a zoo, making code adaptable and efficient."
  url="https://typescript.tv/hands-on/what-are-generics-and-why-you-should-use-them"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Generics in TypeScript help create reusable components that work with different data types while keeping type safety. They use placeholders for types, like in the example of managing animals in a zoo, making code adaptable and efficient.

Generics in TypeScript enable developers to create components—such as functions, classes, and interfaces—that can work with a variety of data types while maintaining type safety. They introduce placeholders for types that are specified when the component is used, allowing for code reusability.

---

## Generics Example

Let's apply generics to a real-world scenario: managing animals in a zoo. We'll start by defining interfaces for generic animals (`Animal`) and their specifications of `Dog` and `Fish`. The `Animal` interface will hold properties shared between `Dog` and `Fish` while their specific interfaces hold properties and methods applicable only to a `Dog` or a `Fish`.

```ts
interface Animal {
  name: string;
  makeSound(): void;
}
 
interface Dog extends Animal {
  breed: string;
  bark(): void;
}
 
interface Fish extends Animal {
  finColor: string;
  spawn(): void;
}
```

---

## Generic Functions

Next, we'll create a generic function called `printDetails` to print specific details of any animal.

```ts
function printDetails<T extends Animal>(animal: T) {
  console.log(`Name: ${animal.name}`);
  animal.makeSound();
 
  if ('breed' in animal) {
    console.log(`Dog: Breed - ${animal.breed}`);
  } else if ('finColor' in animal) {
    console.log(`Fish: Fin Color - ${animal.finColor}`);
  }
}
```

Notice that the generic Type (`T`) is being used as a placeholder for the type to be used when calling the `printDetails` function. You can chose any other name than `T` but historically `T` is often chosen to mark a generic type.

---

## Type Arguments

Now, let's create instances of dogs and fish and use our `printDetails` function:

```ts
const labrador: Dog = {
  name: 'Max',
  breed: 'Labrador',
  bark: () => console.log('Woof!'),
  makeSound: () => console.log('Barking...'),
};
 
const goldfish: Fish = {
  name: 'Nemo',
  finColor: 'orange',
  spawn: () => console.log('More Nemos incoming.'),
  makeSound: () => console.log('Glub glub...'),
};
 
printDetails(labrador);
printDetails(goldfish);
```

If you like, you can also supply the **type argument** explicitly to the `printDetails` function. This is necessary in cases where TypeScript cannot infer the type argument for you.

```ts
printDetails<Dog>(labrador);
printDetails<Fish>(goldfish);
```

As shown above you can now use the `printDetails` function with various types without having to adjust the business logic. This makes Generics a powerful tool when building applications for diverse domains.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What are Generics and why you should use them?",
  "desc": "Generics in TypeScript help create reusable components that work with different data types while keeping type safety. They use placeholders for types, like in the example of managing animals in a zoo, making code adaptable and efficient.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/what-are-generics-and-why-you-should-use-them.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
