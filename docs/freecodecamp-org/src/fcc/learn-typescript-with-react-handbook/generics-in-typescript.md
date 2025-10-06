---
lang: en-US
title: "Generics in TypeScript"
description: "Article(s) > (13/13) Learn TypeScript - A Handbook for Developers"
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typesccript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (13/13) Learn TypeScript - A Handbook for Developers"
    - property: og:description
      content: "Generics in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-typescript-with-react-handbook/generics-in-typescript.html
next: /freecodecamp.org/learn-typescript-with-react-handbook/README.md#conclusion
date: 2025-02-08
isOriginal: false
author:
  - name: oghenekparobo Stephen
    url : https://freecodecamp.org/news/author/Xtephen/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Learn TypeScript - A Handbook for Developers",
  "desc": "This handbook will teach you the basics of TypeScript, including what it is, why it is useful, and the key features it offers. TypeScript was created by Anders Hejlsberg, a prominent software engineer at Microsoft who’s also known for his work on C# ...",
  "link": "/freecodecamp.org/learn-typescript-with-react-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn TypeScript - A Handbook for Developers"
  desc="This handbook will teach you the basics of TypeScript, including what it is, why it is useful, and the key features it offers. TypeScript was created by Anders Hejlsberg, a prominent software engineer at Microsoft who’s also known for his work on C# ..."
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-generics-in-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>

Generics allow writing flexible, reusable, and type-safe code. Instead of specifying a fixed type, generics let a function, class, or interface work with multiple types while maintaining type safety.

---

## Basic Generics

A generic function works with any type while keeping type safety.

```ts
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("Hello")); // Output: "Hello"
console.log(identity<number>(42));      // Output: 42
```

Here, `<T>` is a **generic type parameter**, allowing `identity` to work with any type.

---

## Generics with Arrays

Generics help enforce type safety in arrays.

Here’s an example of reversing an array with generics:

```ts
function reverseArray<T>(arr: T[]): T[] {
  return arr.reverse();
}

console.log(reverseArray<number>([1, 2, 3]));  // Output: [3, 2, 1]
console.log(reverseArray<string>(["A", "B", "C"])); // Output: ["C", "B", "A"]
```

This ensures that the function always returns the same type of array it receives.

---

## Generics with Interfaces

Generics can be used in interfaces to define flexible object structures.

```ts
interface StorageBox<T> {
  content: T;
}

let numberBox: StorageBox<number> = { content: 100 };
let stringBox: StorageBox<string> = { content: "TypeScript" };

console.log(numberBox.content); // Output: 100
console.log(stringBox.content); // Output: "TypeScript"
```

Here, `StorageBox<T>` allows storing different types while ensuring consistency.

---

## Generics with Classes

Generics also work in classes, making them more reusable.

Here’s an example of a generic queue class:

```ts
lass Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }
}

let numberQueue = new Queue<number>();
numberQueue.enqueue(10);
numberQueue.enqueue(20);
console.log(numberQueue.dequeue()); // Output: 10

let stringQueue = new Queue<string>();
stringQueue.enqueue("Hello");
stringQueue.enqueue("World");
console.log(stringQueue.dequeue()); // Output: "Hello"
```

This class works with any type while maintaining type safety.

---

## Generics with Multiple Type Parameters

A function or class can accept more than one generic type.

Here’s an example of a function that swaps two values:

```ts
function swap<T, U>(first: T, second: U): [U, T] {
  return [second, first];
}

console.log(swap<string, number>("Age", 25)); // Output: [25, "Age"]
console.log(swap<boolean, string>(true, "Yes")); // Output: ["Yes", true]
```

Here, `<T, U>` allows the function to work with different types at the same time.

---

## Generics with Constraints

Sometimes, a generic type should follow certain rules. **Constraints** ensure that a type has specific properties.

Here’s an example of ensuring that a type has a `length` property:

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log(getLength("Hello"));   // Output: 5
console.log(getLength([1, 2, 3])); // Output: 3
```

Here, `T extends { length: number }` ensures that `T` has a `length` property.

---

## Advanced: Generics with the `keyof` Operator

The `keyof` operator can be used to ensure valid property names.

Here’s an example of getting a property value by name:

```ts
typescriptCopyEditfunction getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let user = { name: "Alice", age: 30 };

console.log(getProperty(user, "name")); // Output: "Alice"
console.log(getProperty(user, "age"));  // Output: 30
```

Here, `K extends keyof T` ensures that `key` is a valid property of `T`.