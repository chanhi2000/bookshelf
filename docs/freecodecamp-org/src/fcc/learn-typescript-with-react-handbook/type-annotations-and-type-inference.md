---
lang: en-US
title: "Type Annotations and Type Inference"
description: "Article(s) > (3/13) Learn TypeScript - A Handbook for Developers"
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
      content: "Article(s) > (3/13) Learn TypeScript - A Handbook for Developers"
    - property: og:description
      content: "Type Annotations and Type Inference"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-typescript-with-react-handbook/type-annotations-and-type-inference.html
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
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-type-annotations-and-type-inference"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>

---

## What are Type Annotations?

Type annotations in TypeScript enable you to explicitly specify the type of a variable. This ensures that the variable is assigned only values of the specified type, enhancing type safety and making your code easier to maintain.

To define a type annotation in TypeScript, you simply append a colon `:` followed by the desired type after the variable name. This allows you to specify the type that a variable will hold, adding a layer of clarity and precision to your code. For instance, let’s specify a variable of type `string` in our <VPIcon icon="iconfont icon-typescript"/>`test.ts` file, ensuring that only a string value is assigned:

```ts title="test.ts"
let name: string = 'Stephen';
```

In this example, we have declared a variable `name` and specified that its type must be `string`. TypeScript will now ensure that only a string value can be assigned to `name`.

::: note

All code snippets are in a file called <VPIcon icon="iconfont icon-typescript"/>`test.ts` for demonstration purposes. You can rename the file or copy the snippets into your TypeScript project as needed. I don’t follow consistent file naming in this article.

:::

---

## Commonly Used Type Annotations

Here are some of the most commonly used type annotations in TypeScript:

- `string`: Represents text values.
- `number`: Represents numeric values (both integers and floating-point numbers).
- `boolean`: Represents a value that is either `true` or `false`.
- `any`: A fallback type that allows any value to be assigned to a variable, disabling type checking.
- `void`: Typically used for functions that do not return a value.
- `null` and `undefined`: Used to represent the absence of a value.

Once you define a variable with a type annotation, TypeScript ensures that it can only hold values of that specified type. You can also access the methods associated with that type. For example, if you declare a string variable, TypeScript provides access to all string methods, such as `.toUpperCase()`.

```ts title="test.ts"
let name: string = 'Stephen';  // Type is explicitly set as string
name = 'John';  // This is fine, as it's still a string

// Accessing string method
console.log(name.toUpperCase());  // Output: JOHN
```

Here, the variable `name` is re-assigned to a new string value, `'John'`. Since the type is still `string`, you can use string methods like `.toUpperCase()` without any issues.

You can also define arrays with type annotations. This ensures that the array only contains elements of a specific type. For example, if you define an array of numbers, TypeScript will allow you to use array methods that are specific to numbers.

```ts title="test.ts"
let numbers: number[] = [1, 2, 3];  // Type is explicitly set as an array of numbers
numbers.push(4);  // This is fine, as 4 is a number

// Accessing array method
console.log(numbers.length);  // Output: 4
```

In this case, `numbers` is an array of numbers. You can safely use array methods like `.push()` and `.length`, which are valid for number arrays.

If you try to reassign a variable to a value of an incompatible type, TypeScript will catch the error immediately during development, before the code is even run.

For instance:

```ts title="test.ts"
let name: string = 'Stephen';
name = 2;  // Error: Type '2' is not assignable to type 'string'
```

Here, you're trying to assign a number (`2`) to a variable that was previously declared as a string. TypeScript throws an error immediately, indicating that a number cannot be assigned to a string variable.

Similarly, for an array:

```ts title="test.ts"
let numbers: number[] = [1, 2, 3];
numbers = 'Hello';  // Error: Type 'string' is not assignable to type 'number[]'
```

Here, you're trying to assign a string (`'Hello'`) to a variable that was previously declared as an array of numbers. TypeScript catches this error and highlights the mismatch.

Experiment with different types to see how TypeScript enforces type safety. For example, try using boolean, number, or other types in your arrays and variables.

Now that you've seen how type annotations work with strings and arrays, it's time to experiment with other types. TypeScript allows you to define arrays and variables with various types, ensuring type safety across your code. Try creating arrays with other data types such as `boolean`, `number`.

::: tip Example: Boolean Array

```ts title="test.ts"
let booleanArray: Array<boolean> = [true, false, true];

// Accessing array method
console.log(booleanArray.length);  // Output: 3
```

In this example, the array `booleanArray` is explicitly declared to hold only `boolean` values. Try adding `string` or `number` elements to see how TypeScript catches type errors.

:::

::: tip Example: Number Array

```ts title="test.ts"
let numberArray: Array<number> = [1, 2, 3];

// Accessing array method
console.log(numberArray[0] * 2);  // Output: 2
```

Feel free to play around with these examples and observe how TypeScript provides strong type safety and catches errors in real time. The more you explore, the better you'll understand how to leverage TypeScript's type system to write cleaner and more reliable code.

:::

---

## What is Type Inference?

Type inference in TypeScript is a powerful feature that allows the TypeScript compiler to automatically determine the type of a variable based on the value assigned to it. TypeScript is designed to be smart enough to infer types in many cases, reducing the need for explicit type annotations. This enhances code conciseness while maintaining the benefits of type safety.

With type inference, TypeScript can predict the type of a variable by analyzing the value assigned to it, ensuring that you don’t need to specify the type manually, yet still receive all the advantages of type checking.

::: tip Example 1: Inferred String Type

```ts title="test.ts"
let message = "Hello, TypeScript!";  // TypeScript infers 'message' as a string
console.log(message.toUpperCase());  // Output: HELLO, TYPESCRIPT!
```

In this example, TypeScript automatically infers the type of `message` as a `string` because the assigned value is a string.

:::

::: tip Example 2: Inferred Number Type

```ts title="test.ts"
let count = 42;  // TypeScript infers 'count' as a number
console.log(count + 8);  // Output: 50
```

Here, TypeScript infers the type of `count` as a `number` based on the value `42`, and you can perform arithmetic operations on it without type errors.

:::

::: tip Example 3: Inferred Array Type

```ts title="test.ts"
let numbers = [1, 2, 3];  // TypeScript infers 'numbers' as an array of numbers (number[])
console.log(numbers.length);  // Output: 3
```

In this case, TypeScript infers that `numbers` is an array of type `number[]` because the array contains numbers.

:::

### Incorrect Examples:

::: tip Example 4: Mismatched Type Assignment

```ts title="test.ts"
let count = 42;  // TypeScript infers 'count' as a number
count = "Not a number";  // Error: Type 'string' is not assignable to type 'number'
```

Even though TypeScript inferred that `count` is a number, attempting to assign a `string` to it results in an error. TypeScript catches this as a type mismatch because `count` was initially inferred as a `number`.

:::

::: tip Example 5: Inferred Array Type with Mixed Types

```ts title="test.ts"
let mixedArray = [1, "apple", true];  // TypeScript infers 'mixedArray' as (string | number | boolean)[]
console.log(mixedArray[0].toFixed(2));  // Error: Property 'toFixed' does not exist on type 'string | boolean'.
```

In this example, TypeScript infers `mixedArray` as an array containing multiple types (`string | number | boolean`). While this is allowed, accessing methods like `.toFixed()` on elements may result in errors because not all array elements support that method (for example, `boolean` and `string` do not have `.toFixed()`).

:::

::: tip Example 6: Inferred Type with Incorrect Operation

```ts title="test.ts"
let price = 99.99;  // TypeScript infers 'price' as a number
price = "Free";  // Error: Type 'string' is not assignable to type 'number'
```

Here, TypeScript infers that `price` is a `number`, but trying to reassign it to a `string` leads to a type error, ensuring that the variable maintains its inferred type.

:::
