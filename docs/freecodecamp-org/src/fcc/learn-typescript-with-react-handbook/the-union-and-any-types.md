---
lang: en-US
title: "The Union and Any Types"
description: "Article(s) > (4/13) Learn TypeScript - A Handbook for Developers"
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
      content: "Article(s) > (4/13) Learn TypeScript - A Handbook for Developers"
    - property: og:description
      content: "The Union and Any Types"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-typescript-with-react-handbook/the-union-and-any-types.html
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
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-the-union-and-any-types"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>

In earlier examples, we used mixed types. Now, let’s properly define these concepts and expand on them with various examples:

---

## What are Union Types?

Union types allow variables or parameters to hold multiple specific types, offering flexibility while maintaining type safety. You define a union type using the pipe (`|`) symbol.

### Simple Union Type

```ts title="test.ts"
let value: string | number;

value = "Hello";  // ✅ Correct
console.log(value.toUpperCase());  // Output: HELLO

value = 42;  // ✅ Correct
console.log(value + 8);  // Output: 50

value = true;  // ❌ Error: Type 'boolean' is not assignable to type 'string | number'.
```

In this example, `value` can either be a string or a number. Any other type of assignment results in a type error.

### Union Type in Function Parameters

```ts title="test.ts"
function printId(id: string | number): void {
  console.log(`Your ID is: ${id}`);
}

printId(12345);      // ✅ Correct
printId("abc123");   // ✅ Correct
printId(true);       // ❌ Error: Type 'boolean' is not assignable to type 'string | number'.
```

Here, the `id` **the** parameter can only accept a `string` or `number`, ensuring type safety while providing flexibility.

### Custom Union Type

You can create custom types using the `type` keyword for better readability and reusability.

```ts title="test.ts"
type ID = string | number;

function getUser(id: ID): void {
  console.log(`Fetching user with ID: ${id}`);
}

getUser(12345);      // ✅ Correct
getUser("abc123");   // ✅ Correct
getUser(true);       // ❌ Error: Type 'boolean' is not assignable to type 'string | number'.
```

---

## What is the** `any` Typ

The `any` type is the most flexible type in TypeScript. It allows a variable to hold any type of value, disabling type-checking for that variable.

The `any` type sacrifices type safety for maximum flexibility. This is useful in scenarios where you are unsure about the type or you’re working with dynamic data.

::: tip Example 1: Array of any Type

```ts title="test.ts"
let mixedArray: any[] = [1, "apple", true];

console.log(mixedArray[0]);  // Output: 1
console.log(mixedArray[1].toUpperCase());  // Output: APPLE
console.log(mixedArray[2]);  // Output: true
```

Here, the `mixedArray` can hold elements of any type without triggering type errors.

:::

### When to Use Union vs. `any`

- **Union Types**: Use union types when the possible values are known or constrained to a few specific types. It provides type safety and avoids runtime errors.
- `any` **Type**: Use `any` as a last resort when the type is unknown or dynamic.

Just remember that overusing `any` can negate the benefits of TypeScript’s type system. By carefully choosing between union types and `any`, you can write TypeScript code that is both flexible and type-safe.

---

## Be Careful When Using** `any` in TypeScri

The `any` type in TypeScript is a powerful yet risky feature. While this flexibility can sometimes be useful, it often leads to unintended behaviors or errors that TypeScript cannot catch at compile time.

Let’s explore an example to understand the potential pitfalls.

Here’s a function that demonstrates the risks:

```ts
function combineValues(value: any) {
  let anotherValue: number = 10;

  return value + anotherValue;
}

const result = combineValues(5); // No error here.
const anotherResult = result;

// Attempting to call a method on `anotherResult`
anotherResult.someUndefinedMethod(); // No compile-time error!
```

What happened here?

First, we didn’t have any type checking with `any`. The parameter `value` is of type `any`, meaning it can hold any value: a string, number, object, and so on. TypeScript skips enforcing type checks on `value`.

Second, the return value assumes `any`. Since `value` is `any`, the return type of `combineValues` is also inferred as `any`.

Third, there’s no error when calling an undefined method. After the function is called, `anotherResult` is also treated as `any`. TypeScript allows calling any method (even non-existent ones) on a variable of type `any` without throwing errors. In this case, `someUndefinedMethod` doesn’t exist, but TypeScript won’t warn you.

### The Risks of Using** `an

1. **Loss of type safety**: You lose the benefits of TypeScript’s type system, like compile-time error checking. Potential runtime errors can go unnoticed during development.
2. **Accidental behavior**: The function could accept unexpected inputs (e.g., strings, arrays, or objects), leading to incorrect results or crashes.
3. **Debugging complexity**: Since the type is not enforced, debugging issues caused by incorrect types becomes more challenging.

---

## How to Fix This

### Use Explicit Types for Parameters and Return Values

Here’s an improved version with proper type annotations:

```ts
function combineValues(value: number): number {
  let anotherValue: number = 10;

  return value + anotherValue;
}

const result = combineValues(5);
// result.someUndefinedMethod(); // Error: Property 'someUndefinedMethod' does not exist on type 'number'.
```

1. **Parameter type**: The function now explicitly expects a `number` for the `value` parameter.
2. **Return type**: The return type is declared as `number`, ensuring that only numbers are returned.

This ensures that TypeScript will throw errors if you try to pass invalid types or call methods that don’t exist on the return value.

::: important Key Takeaways

- The `any` type disables TypeScript’s type checking, making your code vulnerable to runtime errors.
- Avoid using `any` whenever possible. Instead, use explicit types or stricter alternatives like `unknown` (if the type cannot be determined upfront).
- Explicit types enhance code clarity, maintainability, and reliability by leveraging TypeScript’s compile-time checks.

:::

If you’re tempted to use `any` because the type isn’t clear, consider refactoring your code or using `unknown` combined with type guards for better safety.

---

## Using `unknown` as a Safer Alternative to `any` in TypeScript

The `unknown` type in TypeScript is a stricter and safer alternative to `any`. While both `any` and `unknown` can hold values of any type, `unknown` requires you to perform type checks before using the value. This ensures greater type safety while still offering flexibility.

```ts
function processValue(input: unknown): string {
  if (typeof input === 'string') {
    return `The value is a string: ${input}`;
  } else if (typeof input === 'number') {
    return `The value is a number: ${input}`;
  } else {
    return 'The value is of an unknown type';
  }
}

console.log(processValue('Hello, TypeScript!')); // The value is a string: Hello, TypeScript!
console.log(processValue(42)); // The value is a number: 42
console.log(processValue(true)); // The value is of an unknown type
```

Using `unknown` instead of any has a few benefits:

1. **Type-safe handling**: Unlike `any`, `unknown` forces you to check the type of the value before using it. This prevents runtime errors caused by invalid operations on unexpected types.
2. **Explicit type narrowing**: TypeScript requires you to narrow `unknown` to a specific type (e.g., `string`, `number`) using type guards (`typeof`, `instanceof`, etc.) before you can access its properties or methods.
3. **Enhanced code clarity**: By using `unknown`, you signal to other developers that the type is deliberately uncertain and must be checked before use.

---

## Key Differences: `any` vs. `unknown`

| **Feature** | `any` | `unknown` |
| ---: | :--- | :--- |
| Type checking | No type checking | Requires type checks before usage |
| Flexibility | Can be used directly | Must narrow the type first |
| Common use case | Quick fixes (discouraged) | Safely handling uncertain types |

So to summarize, use `unknown` over `any` whenever you deal with values of uncertain types. It helps maintain type safety and reduces the risk of errors. And try to avoid `any` unless necessary, as it bypasses TypeScript’s safety features.
