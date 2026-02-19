---
lang: en-US
title: "Type Inference & Type Annotations in TypeScript"
description: "Article(s) > Type Inference & Type Annotations in TypeScript"
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
      content: "Article(s) > Type Inference & Type Annotations in TypeScript"
    - property: og:description
      content: "Type Inference & Type Annotations in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/type-inference-type-annotations-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2023-07-22
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
  name="Type Inference & Type Annotations in TypeScript"
  desc="TypeScript has two concepts: type annotations and type inference. Type annotations involve explicitly specifying the type of a parameter or variable, while type inference occurs when TypeScript automatically determines the type based on the implementation."
  url="https://typescript.tv/hands-on/type-inference-type-annotations-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

TypeScript has two concepts: type annotations and type inference. Type annotations involve explicitly specifying the type of a parameter or variable, while type inference occurs when TypeScript automatically determines the type based on the implementation.

In this TypeScript tutorial, we explore the concepts of **type annotations** and **type inference**. We clarify the distinction between the two and discuss their significance in writing maintainable and robust code.

---

## Type Annotations vs. Type Inference

A **Type annotation** involves explicitly specifying the type of a parameter or variable using the colon symbol followed by the type we want to use.

**Type inference** occurs when TypeScript automatically determines the type. When we hover over our `add` function, we can see that TypeScript has inferred its return type to be `number`. This inference is based on the implementation of our function and knowing that its input parameters are also numbers. While we could manually annotate the return type ourselves, it's often unnecessary since TypeScript is capable of inferring it automatically.

---

## Implicitly any type

There are cases though where TypeScript cannot infer the type accurately, and we have to provide explicit annotations:

```ts
// TS7044: Parameter 'a' implicitly has an 'any' type, but a better type may be inferred from usage.
function add(a, b) {
  return a + b;
}
 
console.log(add(44, 100));
```

Although **VS Code suggested using numbers** based on our `console.log` statement, the `+` operator can be used with various other types in JavaScript. Without the annotation, any type could have been supplied as input, resulting in TypeScript inferring the type as `any`. This does not align with the idea of a strongly typed codebase, where the goal is to know the precise type being used rather than relying on `any` type.

While we could modify our [<VPIcon icon="iconfont icon-typescript"/>TSConfig](https://typescriptlang.org/tsconfig) to allow implicit typings of `any`, it is not good practice to begin with. [<VPIcon icon="iconfont icon-vscode"/>IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) even shows us a hint that suggest using a more specific type:

```ts
// TS7044: Parameter 'a' implicitly has an 'any' type, but a better type may be inferred from usage.
function add(a, b) {
  return a + b;
}
```

---

## When you need annotations

**Type inference** occurs in many scenarios. If we create a variable and assign a value to it, TypeScript will automatically infer its type based on the value. While it's possible to explicitly annotate types, which is useful for practicing type annotations, doing so can lead to higher maintenance costs when we want to change the type. Therefore, it's generally best to rely on TypeScript's type inference and only use type annotations when necessary.

VS Code offers an [<VPIcon icon="iconfont icon-vscode"/>Inlay Hints](https://code.visualstudio.com/docs/typescript/typescript-editing#_inlay-hints) functionality that displays the inferred return types, eliminating the need to constantly hover over function names to check their return types.

A case where we need explicit typings are recursive functions. Those require explicit return types to be annotated.

Let's take the [<VPIcon icon="fa-brands fa-wikipedia-w"/>calculation of the factorial](https://en.wikipedia.org/wiki/Factorial#Computation) of a number as an example. The factorial function multiplies all positive integers from our chosen number down to 1.

```ts
// TS7023: 'factorial' implicitly has return type 'any' because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
function factorial(n: number) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
 
console.log(factorial(5));
```

The factorial function takes an input number `n` and recursively calls itself with `n - 1` until it reaches the base case of `n === 0`. At that point, the function returns `1` to terminate the recursion.

The key thing to note is that the function calls itself within its own body, which is what makes it recursive.

As you can see, without specifying an explicit return type annotation, we will see [**TypeScript error 7023**](/typescript.tv/errors/#ts7023) as long as [<VPIcon icon="iconfont icon-typescript"/>noImplicitAny](https://typescriptlang.org/tsconfig#noImplicitAny) is activated in our compiler options. Let's fix this problem by adding a return type and rerun our code:

```ts
function factorial(n: number): number {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
 
console.log(factorial(5));
```

We can run the local TypeScript compiler using `npx`. Once the compilation is complete, we can execute the generated JavaScript code using `node`:

```sh
npx tsc && node src/factorial.js
```

---

## Best Practices

To conclude, here are several examples of **where type annotations can be applied**:

- To variables and constants
- To signatures of arrow function expressions
- To parameters and function return values
- To specify the context of the `this` keyword, which is particularly useful for callback functions

```ts
let myVariable: string = 'Benny';
 
const myConstant: 'Benny' = 'Benny';
 
function myFunction(a: number, b: number): number {
  return a + b;
}
 
const arrowFunctionExpression: (a: number, b: number) => number = (a: number, b: number): number => a + b;
 
function callbackFunction(this: { counter: number }, n: number): number {
  return this.counter + n;
}
 
callbackFunction.call({ counter: 1000 }, 1);
```

**To minimize code maintenance**, it is recommended to reduce the usage of type annotations and instead rely on TypeScript's type inference. Type annotations should be employed when the inferred types become overly broad or lead to implicit "any" typings.

```ts
let myVariable = 'Benny';
 
const myConstant = 'Benny';
 
function myFunction(a: number, b: number) {
  return a + b;
}
 
const arrowFunctionExpression = (a: number, b: number) => a + b;
 
function callbackFunction(this: { counter: number }, n: number) {
  return this.counter + n;
}
 
callbackFunction.call({ counter: 1000 }, 1);
```

::: info Video Tutorial

<VidStack src="youtube/nVd8jvjK4Y0" />

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Type Inference & Type Annotations in TypeScript",
  "desc": "TypeScript has two concepts: type annotations and type inference. Type annotations involve explicitly specifying the type of a parameter or variable, while type inference occurs when TypeScript automatically determines the type based on the implementation.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/type-inference-type-annotations-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
