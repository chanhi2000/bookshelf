---
lang: en-US
title: "Tuples and Enums"
description: "Article(s) > (11/13) Learn TypeScript - A Handbook for Developers"
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
      content: "Article(s) > (11/13) Learn TypeScript - A Handbook for Developers"
    - property: og:description
      content: "Tuples and Enums"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-typescript-with-react-handbook/tuples-and-enums.html
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
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-tuples-and-enums"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>

## Tuple

A **tuple** in TypeScript is a special type of array that has a fixed number of elements, where each element can have a different type. Tuples ensure that the order and types of values remain consistent.

```ts
// A tuple with a string and a number
let user: [string, number] = ["Alice", 25];

console.log(user[0]); // Output: Alice
console.log(user[1]); // Output: 25
```

In this example, the tuple `user` contains a string (name) and a number (age). The order and types must be followed as defined.

### Tuple with Optional Elements:

```ts
let person: [string, number, boolean?] = ["Bob", 30];

console.log(person); // Output: ["Bob", 30]
```

Here, the third element (boolean) is optional.

### Tuple with Read-Only Property:

```ts
const coordinates: readonly [number, number] = [10, 20];

// coordinates[0] = 50; // Error: Cannot assign to '0' because it is a read-only tuple
```

The `readonly` keyword prevents modifying tuple values.

---

## Enums

An **enum** in TypeScript is a way to define a set of named constants. Enums make code more readable and help manage a fixed set of values.

### Numeric Enums (Default):

```ts
enum Status {
  Pending,   // 0
  InProgress, // 1
  Completed,  // 2
}

console.log(Status.Pending);   // Output: 0
console.log(Status.Completed); // Output: 2
```

By default, TypeScript assigns numeric values starting from `0`.

### Custom Number Values in Enums

```ts
enum OrderStatus {
  Pending = 1,
  Shipped = 5,
  Delivered = 10,
}

console.log(OrderStatus.Shipped); // Output: 5
```

Here, custom values are assigned to each status.

### String Enums

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

console.log(Direction.Up); // Output: "UP"
```

String enums store fixed text values instead of numbers.

### Using Enums in a Function:

```ts
function getStatusText(status: Status): string {
  switch (status) {
    case Status.Pending:
      return "Order is pending.";
    case Status.InProgress:
      return "Order is in progress.";
    case Status.Completed:
      return "Order is completed.";
    default:
      return "Unknown status.";
  }
}

console.log(getStatusText(Status.InProgress)); // Output: "Order is in progress."
```

This function takes an enum value and returns a message based on the status.

Tuples define fixed-length arrays with different data types, while enums provide named constants for better readability, making your code more structured and type-safe.
