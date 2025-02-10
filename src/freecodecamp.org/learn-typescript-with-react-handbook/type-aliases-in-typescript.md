---
lang: en-US
title: "Type Aliases in TypeScript"
description: "Article(s) > (9/13) Learn TypeScript – A Handbook for Developers"
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
      content: "Article(s) > (9/13) Learn TypeScript – A Handbook for Developers"
    - property: og:description
      content: "Type Aliases in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-typescript-with-react-handbook/type-aliases-in-typescript.html
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
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-type-aliases-in-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>


A **type alias** in TypeScript is essentially a **short name** or an **alternative name** for an existing type. It allows you to define a simpler or more readable name for a type that may be complex or used repeatedly in your code.

This doesn't create a new type, but instead gives an existing type a new identifier. The functionality of the code doesn't change when using a type alias – it simply makes your code more readable and reusable.

Here’s an example before using a type alias:

```ts
// Without type alias
function getUserInfo(user: UserInfo) {
  console.log(`User Info: 
    Name: ${user.name}, 
    Age: ${user.age}, 
    Address: ${user.address}`);
}

const user: UserInfo = { name: 'Alice', age: 30, address: '123 Main St' };

getUserInfo(user);
```

Now, let’s use a type alias for the function parameters to make the code more readable:

```ts
// Using type alias
type UserInfo = { name: string, age: number, address: string };

function getUserInfo(user: UserInfo) {
  console.log(`User Info: 
    Name: ${user.name}, 
    Age: ${user.age}, 
    Address: ${user.address}`);
}

const user: UserInfo = { name: 'Alice', age: 30, address: '123 Main St' };

getUserInfo(user);
```

In the example above:

- Before the type alias, we define the parameters separately within the function.
- After defining a type alias (`UserInfo`), we use it in the function parameter to make the function signature simpler and more readable.

This **doesn’t change the functionality** of the code. It just makes it easier to work with by using the alias. The alias acts as a reusable reference to a complex type, and if the shape of the `UserInfo` changes, we only need to update it in one place, making the code easier to maintain.

---

## How to Use Type Aliases

A type alias allows you to define a new name for a type. This new name can represent a primitive type, an object structure, or even a union of types. The main benefit is to make your code more readable, reusable, and prevent mistakes.

You define a type alias using the `type` keyword followed by a name and the structure of the type.

```ts
type TypeName = TypeStructure;
```

For example, let’s create a type alias for a User object:

```ts
type User = {
  name: string;
  age: number;
}
```

This means `User` is a type that expects an object with two properties:

- `name` should be a string.
- `age` should be a number.

---

## Why Use Type Aliases?

There are several reasons to use type aliases in your code. First of all, a type alias explicitly defines the structure of an object, so anyone reading the code knows exactly what to expect. Second, you can reuse the `User` type anywhere in your code without repeating the structure. And finally, TypeScript will check that any object assigned to the `User` type has the required properties with the correct types.

### with Type Alias:

```ts
type User = {
  name: string;
  age: number;
};

function getUserDetails(user: User): string {
  return `${user.name} (${user.age} years old)`;
}

const user: User = { name: "Alice", age: 30 };
console.log(getUserDetails(user)); // "Alice (30 years old)"
```

In this example, we defined the `User` type alias to specify that `user` objects must have a `name` of type `string` and `age` of type `number`.

TypeScript will catch errors if you attempt to assign an object that does not match this structure, like this:

```ts
// This will result in a TypeScript error:
const invalidUser: User = { name: "Alice" }; // Missing 'age' property
```

---

## What is an **Intersection Type** in TypeScript?

An **Intersection Type** is a powerful feature in TypeScript that allows you to combine multiple types into one. When you create an intersection, the resulting type must have **all the properties** from each of the types you intersect.

You can combine any number of types, and the resulting type must satisfy every condition of all the original types.

### Syntax of Intersection Type

To define an intersection type, you use the `&` operator to combine two or more types.

```ts
type TypeA & TypeB;
```

### Example of an Intersection Type

Imagine you want to extend the `User` type to include the user’s address. Instead of modifying the original `User` type, you can use an **intersection type** to combine `User` and `Address`.

```ts
type Address = {
  city: string;
  country: string;
};

type UserWithAddress = User & Address; // Intersection of User and Address
```

Now, `UserWithAddress` will require both the properties from `User` and the properties from `Address`.

### Example with a Function

Here’s how you can use this in a function:

```ts :collapsed-lines
type User = {
  name: string;
  age: number;
};

type Address = {
  city: string;
  country: string;
};

type UserWithAddress = User & Address;

function getUserDetails(user: UserWithAddress): string {
  return `${user.name} (${user.age} years old), lives in ${user.city}, ${user.country}`;
}

const user: UserWithAddress = {
  name: "Alice",
  age: 30,
  city: "New York",
  country: "USA"
};

console.log(getUserDetails(user));
// Output: "Alice (30 years old), lives in New York, USA"
```

In this case:

- `UserWithAddress` is an intersection type, which means the `user` object must have both the properties of `User` and `Address`.
- TypeScript checks that both `name` and `age` (from `User`), as well as `city` and `country` (from `Address`), are present in the object.

If we missed any of these properties, TypeScript would show an error.

```ts
// This will result in a TypeScript error:
const incompleteUser: UserWithAddress = {
  name: "Alice",
  age: 30,
  city: "New York"
}; // Missing 'country'
```

---

## Why Use Intersection Types?

Intersection types are useful in several scenarios. First, they let you extend existing types without modifying them, making the code more modular and flexible. They’re also useful when you need to merge multiple different structures into one, such as combining a `User` with an `Address` or `OrderDetails`. And you can easily see all the required properties that an object must have when you use intersection types.

---

## Type Aliases vs Intersection Types

| Feature | Type Alias | Intersection Type |
| ---: | :--- | :--- |
| **Definition** | Defines a single type. | Combines multiple types into one. |
| **Use case** | Create reusable types for objects or primitives. | Combine multiple types, requiring all properties. |
| **Combining Types** | Not used for combining types. | Used to combine multiple types. |
| **Example** | `type User = { name: string, age: number };` | `type UserWithAddress = User & Address;` |

---

## When to Use Each One

- Use type aliases when you want to define a **single type** for an object, function, or other data structure. They help with clarity, reuse, and type safety.
- Use intersection types when you want to **combine multiple types** into one. It’s ideal for scenarios where an object needs to fulfill multiple contracts at once, such as when combining different types or extending the functionality of an existing type.

By leveraging Type Alias and Intersection Types in TypeScript, your code becomes easier to understand, safer, and more maintainable. These features provide structure to your data, helping to catch bugs earlier.
