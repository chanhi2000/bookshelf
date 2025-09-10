---
lang: en-US
title: "Objects in TypeScript"
description: "Article(s) > (5/13) Learn TypeScript - A Handbook for Developers"
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
      content: "Article(s) > (5/13) Learn TypeScript - A Handbook for Developers"
    - property: og:description
      content: "Objects in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-typescript-with-react-handbook/objects-in-typescript.html
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
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-objects-in-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>


In TypeScript, objects are collections of properties where each property has a name (key) and a value. TypeScript allows us to define types for these properties, ensuring that objects conform to a specific structure.

```ts title="test.ts"
let car = { car: 'Toyota', brand: 2024 };
console.log(car);
```

This works fine because TypeScript infers the types for `car` and `brand` automatically based on the values provided.

---

## Explicit Object Types

When we want to define the shape of an object explicitly, we can use inline type annotations. This makes it clear what type each property should have. For example:

```ts title="test.ts"
let carOne: { car: string; brand: number } = { car: 'Evil Spirit', brand: 2025 };
console.log(carOne);
```

This ensures that `carOne` always has a `car` property of type `string` and a `brand` property of type `number`.

Let’s say we want to add a `color` property to `carOne`:

```ts title="test.ts"
let carOne: { car: string; brand: number } = { car: 'Evil Spirit', brand: 2025, color: 'Black' };
```

The code above will show a redline because `color` is not part of the defined type `{ car: string; brand: number }`.

![The error will look something like this](https://cdn.hashnode.com/res/hashnode/image/upload/v1736933755272/8a3d48dd-3ae0-4769-9e13-fa1f6ca37331.png)

```plaintext title="output"
Type '{ car: string; brand: number; color: string; }' is not assignable to type '{ car: string; brand: number; }'. Object literal may only specify known properties, and 'color' does not exist in type '{ car: string; brand: number; }'.
```

Similarly, if you try to change the type of `brand` to a `string`:

```ts title="test.ts"
carOne.brand = "2026";
```

You’ll get another error:

```plaintext title="output"
Type 'string' is not assignable to type 'number'.
```

Having to write the full object type each time can get repetitive, especially for objects with many properties or when the same structure is used in multiple places. But don’t worry - I’ll soon introduce **type aliases**, which make defining and reusing object types much simpler. You’ll see how to use type aliases to simplify object types and make your code cleaner. After that, we’ll explore how to apply these concepts in React.

For now, focus on understanding the basics and how TypeScript enforces structure. It’s like peeking under the hood to see how TypeScript works behind the scenes.

---

## Objects and Arrays

In TypeScript, we often deal with arrays of objects, where each object has a specific structure. TypeScript helps ensure that every object in the array conforms to the expected type.

Imagine you are managing a grocery store, and you want to keep track of your vegetables. Here’s how you might start:

```ts
let tomato = { name: 'Tomato', price: 2 };
let potato = { name: 'Potato', price: 1 };
let carrot = { name: 'Carrot' };

let vegetables: { name: string; price: number }[] = [tomato, potato, carrot];
```

When TypeScript checks this code, it throws an error because `carrot` doesn’t have a `price` property. The expected type for each item in the `vegetables` array is `{ name: string; price: number }`. Since `carrot` is missing the `price`, TypeScript flags it as an error.

```plaintext title="output"
Type '{ name: string; }' is not assignable to type '{ name: string; price: number; }'. Property 'price' is missing in type '{ name: string; }' but required in type '{ name: string; price: number; }'.
```

If the `price` is not always known or applicable (for example, maybe the carrot's price is still being negotiated), you can make the `price` property optional. You can do this by adding a `?` after the property name:

```ts
let vegetables: { name: string; price?: number }[] = [tomato, potato, carrot];
```

Now, TypeScript knows that the `price` property is optional. This means objects in the `vegetables` array can either include `price` or omit it without causing errors.

When a property is optional, TypeScript allows it to be either:

1. Present with the specified type.
2. Absent altogether.

This flexibility eliminates the error for objects like `carrot`, which lack the `price` property.

---

## The** `readonly` Modifi

In TypeScript, the `readonly` modifier is a great way to ensure that certain properties or entire objects remain immutable. This is particularly useful when you want to prevent accidental changes to your data.

Let’s continue with our vegetable store example and see how `readonly` works.

### The Problem of Mutability

Imagine we have this setup:

```ts
let tomato = { name: 'Tomato', price: 2 };
let potato = { name: 'Potato', price: 1 };
let carrot = { name: 'Carrot' };

let vegetables: { name: string; price?: number }[] = [tomato, potato, carrot];
```

If someone accidentally tries to change the `name` of the `tomato` object or remove the `carrot` object from the `vegetables` array, TypeScript won’t complain:

```ts
vegetables[0].name = 'Cucumber'; // No error, but this could be unintended!
vegetables.pop(); // Removes the last vegetable, no warning.
```

We can use `readonly` to make these objects and arrays immutable, ensuring their original state cannot be altered.

---

## Readonly on Object Properties

To make the properties of each vegetable immutable, you can do the following:

```ts
let vegetables: { readonly name: string; readonly price?: number }[] = [
  { name: 'Tomato', price: 2 },
  { name: 'Potato', price: 1 },
  { name: 'Carrot' },
];
```

Now, if you try to change the `name` or `price` of any vegetable, TypeScript throws an error:

```ts
typescriptCopy codevegetables[0].name = 'Cucumber'; // Error: Cannot assign to 'name' because it is a read-only
```

---

## Readonly Arrays

You can also make the entire `vegetables` array immutable by declaring it as `readonly`:

```ts
let vegetables: readonly { name: string; price?: number }[] = [
  { name: 'Tomato', price: 2 },
  { name: 'Potato', price: 1 },
  { name: 'Carrot' },
];
```

This prevents operations that modify the array itself, such as `push`, `pop`, or `splice`:

```ts
vegetables.push({ name: 'Onion', price: 3 }); // Error: Property 'push' does not exist on type 'readonly { name: string; price?: number; }[]'.
vegetables.pop(); // Error: Property 'pop' does not exist on type 'readonly { name: string; price?: number; }[]'.
```

---

## When to Use** `readonl

1. **Immutable data**: Use `readonly` when you want to enforce immutability for objects or arrays, especially in contexts where data should remain constant (e.g., configurations, initial states, constants).
2. **Prevent bugs**: Protect your data from accidental changes caused by other parts of the code.

---

## Complete Example

Here’s an updated example with `readonly` in action:

```ts
let vegetables: readonly { readonly name: string; readonly price?: number }[] = [
  { name: 'Tomato', price: 2 },
  { name: 'Potato', price: 1 },
  { name: 'Carrot' },
];

// Attempting to modify data
vegetables[0].name = 'Cucumber'; // Error: Cannot assign to 'name' because it is a read-only property.
vegetables.pop(); // Error: Property 'pop' does not exist on type 'readonly { readonly name: string; readonly price?: number; }[]'.

console.log(vegetables);
```

Here’s what you should know about readonly, summarized:

- `readonly` on properties ensures individual fields of objects cannot be changed.
- `readonly` on arrays makes the array itself immutable, preventing operations like `push` and `pop`.
- Combining both provides full immutability for objects within an array.

By using `readonly`, you create safer, more predictable code, reducing bugs caused by unintended mutations.
