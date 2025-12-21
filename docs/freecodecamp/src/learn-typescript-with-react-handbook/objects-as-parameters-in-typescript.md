---
lang: en-US
title: "Objects as Parameters in TypeScript"
description: "Article(s) > (8/13) Learn TypeScript - A Handbook for Developers"
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
      content: "Article(s) > (8/13) Learn TypeScript - A Handbook for Developers"
    - property: og:description
      content: "Objects as Parameters in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-typescript-with-react-handbook/objects-as-parameters-in-typescript.html
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
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-objects-as-parameters-in-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>

In TypeScript, functions can accept objects as parameters. This is particularly useful when dealing with multiple related values.

---

## Using Objects with Specific Properties

Here's a function that takes an object with an `id` property and returns a new object:

```ts
function createEmployee({ id }: { id: number }): { id: number; isActive: boolean } {
  return { id, isActive: id % 2 === 0 };
}

const firstEmployee = createEmployee({ id: 1 });
console.log(firstEmployee); // { id: 1, isActive: false }

const secondEmployee = createEmployee({ id: 2 });
console.log(secondEmployee); // { id: 2, isActive: true }
```

The function `createEmployee`:

- Takes an object with a single property, `id`, as a parameter.
- Returns a new object with two properties: `id` and `isActive`.

The `isActive` property is determined by checking if the `id` is even (`id % 2 === 0`).

**Destructuring** is used in the parameter:

- `{ id }` extracts the `id` property from the input object directly.

---

## Accepting More Complex Objects

Now, let’s look at a function that takes an object with multiple properties:

```ts
function createStudent(student: { id: number; name: string }): void {
  console.log(`Welcome to the course, ${student.name}!`);
}

const newStudent = { id: 1, name: "John" };
createStudent(newStudent); // "Welcome to the course, John!"
```

The function `createStudent`:

- Accepts an object with two properties: `id` and `name`.
- Logs a welcome message using the `name` property.

The `newStudent` object matches the structure expected by the function, so it’s passed directly.

---

## Why Use Objects as Parameters?

First of all, functions with objects as parameters are easier to read, especially when dealing with multiple related values. Also, using destructuring you can extract only the needed properties from an object, making the code more concise. And finally, objects can be reused across functions without creating new ones every time.

---

## Excess Property Checks in TypeScript

In TypeScript, excess property checks help ensure that objects passed to functions only contain properties defined in the function’s parameter type. If there are extra properties, TypeScript will raise an error. Let's see how this works with simple examples.

### 1. Extra Property Error

Here’s a function that accepts an object with `id` and `name`, but no extra properties:

```ts
function createStudent(student: { id: number; name: string }): void {
  console.log(`Welcome, ${student.name}!`);
}

const newStudent = { id: 1, name: "John", age: 20 }; // Extra property 'age'

createStudent(newStudent); // Error: 'age' is not expected
```

TypeScript gives an error because the `age` property is not part of the expected object structure.

### 2. Fixing the Error

To avoid the error, just remove any extra properties:

```ts
const validStudent = { id: 1, name: "John" };
createStudent(validStudent); // This works fine
```

This works because the object only has the expected properties: `id` and `name`.

### 3. Using Type Assertion (Not Recommended)

If you really need to pass an object with extra properties, you can use **type assertion** to tell TypeScript to ignore the extra properties:

```ts
const studentWithExtras = { id: 1, name: "John", age: 20 };
createStudent(studentWithExtras as { id: number; name: string }); // Bypasses the error
```

While this works, it’s better to match the expected structure instead of using type assertion.

- TypeScript expects objects to match the exact shape of the parameter type.
- Excess properties cause errors to ensure the structure is correct.
- Fix the object or use type assertion (carefully) if you need extra properties.

Excess property checks help keep your code safe and ensure only the right data is passed to functions.
