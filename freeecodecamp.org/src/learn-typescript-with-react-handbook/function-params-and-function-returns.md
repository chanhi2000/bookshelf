---
lang: en-US
title: "Function Params And Function Returns"
description: "Article(s) > (6/13) Learn TypeScript - A Handbook for Developers"
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
      content: "Article(s) > (6/13) Learn TypeScript - A Handbook for Developers"
    - property: og:description
      content: "Function Params And Function Returns"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-typescript-with-react-handbook/function-params-and-function-returns.html
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
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-function-params-and-function-returns"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>

Functions in TypeScript allow you to define both the **parameters** and the **return types** explicitly. This ensures that the function behaves as expected and avoids runtime errors. Let's break this down with a simple example.

---

## Inferred Return Type

```ts
function arithmeticOp(price: number) {
  return price * 9;
}

const FP = arithmeticOp(2); // The result is 18.
```

1. The parameter `price` is explicitly defined as a `number`.
2. The return type is not explicitly stated, but TypeScript **infers** it to be a `number` because the function returns `price * 9`, which is a numeric operation.

TypeScript is smart enough to infer the return type of the function based on the return statement. In this case, it correctly infers that `arithmeticOp` returns a `number`.

---

## Explicit Return Type

```ts
function arithmeticOp(price: number): number {
  return price * 9;
}

const FP = arithmeticOp(2); // The result is still 18.
```

1. The function explicitly declares the return type as `number` using the syntax `functionName(parameters): returnType`.
2. This doesn’t change the result but makes the function declaration clearer.

So why should you use explicit return types? Well, first of all it improves code readability and ensures that future changes don’t accidentally alter the return type. And second, it serves as documentation for other developers.

---

## Return Type Mismatch

```ts
function arithmeticOp(price: number): number {
  if (hasDiscount) {
    return 'discount'; // Error here!
  }
  return price * 9;
}

const FP = arithmeticOp(2);
```

In the code above, the return type is explicitly declared as `number`. But the function attempts to return a `string` (`'discount'`) in certain cases. This causes TypeScript to throw an error:

```plaintext title="output"
Type 'string' is not assignable to type 'number'.
```

This happens because TypeScript enforces the declared return type. If you say a function returns a `number`, it **must always** return a `number`, regardless of the logic inside the function.

If you want the function to return multiple types (for example, `number` or `string`), use a **union type**:

```ts
function arithmeticOp(price: number): number | string {
  if (hasDiscount) {
    return 'discount'; // Now valid!
  }
  return price * 9;
}

const FP = arithmeticOp(2);
```

The return type `number | string` tells TypeScript that the function can return either a `number` or a `string`. This resolves the type mismatch error.

::: important Key Takeaways:

1. TypeScript **infers** return types when they are not explicitly defined but encourages explicit return types for clarity and maintainability.
2. The declared return type ensures the function only returns values of the specified type.
3. Type mismatches, like returning a `string` from a function expected to return a `number`, result in TypeScript errors.
4. Union types (`type1 | type2`) allow functions to return multiple types when needed.

:::

---

## Handling Optional, Default in TypeScript

When working with TypeScript functions, specifying parameter behavior is crucial for flexibility and preventing runtime errors. Let's explore how to handle optional and default parameters effectively with practical examples.

---

## Example 1: Understanding the Problem with Missing Arguments

Consider the following function:

```ts
function calculateFinalScore(baseScore: number, deductions: number): number {
  return baseScore - deductions;
}

let scoreWithDeductions = calculateFinalScore(50, 10);
let scoreWithoutDeductions = calculateFinalScore(50); // Error
```

The first call to `calculateFinalScore` works perfectly. But the second call throws a TypeScript error:

```plaintext title="output"
⚠ Error (TS2554) | Expected 2 arguments, but got 1.
Tutorial.ts(7, 47): An argument for 'deductions' was not provided.
```

This happens because TypeScript expects both `baseScore` and `deductions` to be provided, as they are both required parameters. If the `deductions` value is omitted, TypeScript will not allow the function call.

---

## Example 2: Fixing the Issue with Default Parameters

To resolve this issue, we can define a default value for the `deductions` parameter. Default parameters provide a fallback value if no argument is passed.

```ts
function calculateFinalScore(baseScore: number, deductions: number = 0): number {
  return baseScore - deductions;
}

let scoreWithDeductions = calculateFinalScore(50, 10); // 40
let scoreWithoutDeductions = calculateFinalScore(50);  // 50
```

In this updated example:

- The `deductions` parameter defaults to `0` if it is not explicitly provided.
- Both calls now work without errors.

---

## Why This Solution Works

By defining `deductions` as a default parameter, TypeScript ensures that the function has all the arguments it needs to execute, even if some are omitted in the call. This approach increases the flexibility of the function while maintaining type safety.

Use default parameters when a value is required for the function to work but can safely have a fallback value if omitted. This approach improves code clarity and reduces the likelihood of runtime errors.
