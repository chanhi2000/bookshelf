---
lang: en-US
title: "Interfaces in TypeScript"
description: "Article(s) > (10/13) Learn TypeScript – A Handbook for Developers"
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
      content: "Article(s) > (10/13) Learn TypeScript – A Handbook for Developers"
    - property: og:description
      content: "Interfaces in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-typescript-with-react-handbook/interfaces-in-typescript.html
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
  "title": "Learn TypeScript – A Handbook for Developers",
  "desc": "This handbook will teach you the basics of TypeScript, including what it is, why it is useful, and the key features it offers. TypeScript was created by Anders Hejlsberg, a prominent software engineer at Microsoft who’s also known for his work on C# ...",
  "link": "/freecodecamp.org/learn-typescript-with-react-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn TypeScript – A Handbook for Developers"
  desc="This handbook will teach you the basics of TypeScript, including what it is, why it is useful, and the key features it offers. TypeScript was created by Anders Hejlsberg, a prominent software engineer at Microsoft who’s also known for his work on C# ..."
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-interfaces-in-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>

In TypeScript, an **interface** is a way to define the structure of an object, describing its properties and their types. Interfaces are used to enforce type-checking in your code, ensuring that objects adhere to a specific structure. Similar to type aliases, interfaces make your code more readable, reusable, and maintainable.

---

## What is an Interface?

An interface is a blueprint for an object, defining what properties and methods it should have. Interfaces can be used to define custom types for objects, functions, or classes.

Here’s a basic example:

```ts
interface User {
  name: string;
  age: number;
  address: string;
}

function getUserInfo(user: User): string {
  return `${user.name} (${user.age} years old) lives at ${user.address}`;
}

const user: User = {
  name: "Alice",
  age: 30,
  address: "123 Main St",
};

console.log(getUserInfo(user)); // Output: Alice (30 years old) lives at 123 Main St
```

In this example:

- The `User` interface defines the shape of the object.
- Any object of type `User` must have `name`, `age`, and `address` properties with the specified types.
- The `getUserInfo` function ensures the `user` parameter adheres to the `User` interface.

---

## Similarities Between Interfaces and Type Aliases

- Both interfaces and type aliases can define the structure of objects.
- Both can be extended, though the syntax differs.
- Both improve code readability and reusability.
- In most cases, you can use interfaces or type aliases interchangeably to define object types.

::: tip Example with a type alias

```ts
type User = {
  name: string;
  age: number;
  address: string;
};

const user: User = {
  name: "Bob",
  age: 25,
  address: "456 Elm St",
};
```

Both the `type` and `interface` achieve the same result in this scenario.

:::

---

## Differences Between Interfaces and Type Aliases

Let’s also summarize their key differences:

| Feature | Interface | Type Alias |
| ---: | :--- | :--- |
| **Syntax** | Uses `interface` keyword. | Uses `type` keyword. |
| **Extensibility** | Can be extended using `extends`. | Can be extended using intersection (`&`). |
| **Declaration Merging** | Supports merging across multiple declarations. | Does not support declaration merging. |
| **Union Types** | Cannot define union types. | Can define union types. |

---

## Extending with Interfaces and Type Aliases

### Extending Interfaces

```ts
interface Address {
  city: string;
  country: string;
}

interface User extends Address {
  name: string;
  age: number;
}

const user: User = {
  name: "Alice",
  age: 30,
  city: "New York",
  country: "USA",
};
```

### Using Type Alias for Intersection

```ts
type Address = {
  city: string;
  country: string;
};

type User = {
  name: string;
  age: number;
} & Address;

const user: User = {
  name: "Alice",
  age: 30,
  city: "New York",
  country: "USA",
};
```

Both approaches result in the same outcome, but the syntax is different.

---

## Advanced Concepts with Interfaces

### 1. Optional Properties:

Interfaces can define properties as optional using the `?` symbol:

```ts
interface User {
  name: string;
  age?: number; // Optional
}

const user1: User = { name: "Alice" };
const user2: User = { name: "Bob", age: 25 };
```

### 2. Readonly Properties

Use the `readonly` modifier to make properties immutable:

```ts
interface User {
  readonly id: number;
  name: string;
}

const user: User = { id: 1, name: "Alice" };
// user.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
```

### 3. Function Types

Interfaces can define function signatures:

```ts
interface Add {
  (a: number, b: number): number;
}

const add: Add = (a, b) => a + b;
console.log(add(5, 3)); // Output: 8
```

### 4. Index Signatures

Interfaces can define dynamic property names:

```ts
interface StringDictionary {
  [key: string]: string;
}

const dictionary: StringDictionary = {
  hello: "world",
  name: "Alice",
};
```

### 5. Extending Multiple Interfaces

An interface can extend multiple interfaces:

```ts
interface A {
  propA: string;
}

interface B {
  propB: number;
}

interface C extends A, B {
  propC: boolean;
}

const obj: C = {
  propA: "Hello",
  propB: 42,
  propC: true,
};
```

---

## When to Use Interfaces vs. Type Aliases

- Use **interfaces** when you need to define object shapes, especially if you plan to extend them. Also use interfaces if you need declaration merging, as type aliases don’t support it.
- Use **type aliases** for more complex types, such as unions or intersections
