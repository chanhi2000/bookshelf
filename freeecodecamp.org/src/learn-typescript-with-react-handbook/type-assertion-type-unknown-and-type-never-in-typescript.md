---
lang: en-US
title: "Type Assertion, Type Unknown, and Type Never in TypeScript"
description: "Article(s) > (12/13) Learn TypeScript - A Handbook for Developers"
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
      content: "Article(s) > (12/13) Learn TypeScript - A Handbook for Developers"
    - property: og:description
      content: "Type Assertion, Type Unknown, and Type Never in TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-typescript-with-react-handbook/type-assertion-type-unknown-and-type-never-in-typescript.html
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
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-type-assertion-type-unknown-and-type-never-in-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>

---

## Type Assertion

Type assertion tells TypeScript to treat a value as a specific type. It does not change the value but helps the compiler understand the type.

```ts
let value: unknown = "Hello, TypeScript!";

// Using type assertion to treat 'value' as a string
let strLength: number = (value as string).length;

console.log(strLength); // Output: 18
```

Here, `value` is initially `unknown`, but type assertion (`as string`) allows treating it as a string.

And here’s an alternative way to write type assertion:

```ts
let num = <number>(10);
console.log(num); // Output: 10
```

The `<number>` syntax also performs type assertion.

---

## Type Unknown

Let’s briefly revisit the `unknown` type now. Remember that it’s a safer alternative to `any` and can hold any value - but TypeScript requires type checking before using it.

```ts
let data: unknown;

data = "Hello";
data = 42;
data = true;

// Type checking before using the value
if (typeof data === "string") {
  console.log(data.toUpperCase()); // Works only if data is a string
}
```

Since `data` is `unknown`, TypeScript does not allow direct operations without checking its type first.

---

## Type Never

The `never` type represents values that never occur. It is often used for functions that never return or always throw an error.

```ts
function throwError(message: string): never {
  throw new Error(message);
}

// throwError("Something went wrong!"); // This function never returns
```

Here, `throwError` does not return anything because it always throws an error.

### Example of Type Never in a Switch Case:

```ts
type Status = "success" | "failure";

function checkStatus(status: Status): void {
  switch (status) {
    case "success":
      console.log("Operation was successful.");
      break;
    case "failure":
      console.log("Operation failed.");
      break;
    default:
      const unexpected: never = status; // Ensures all cases are handled
  }
}
```

This ensures that all possible values of `Status` are handled, preventing unexpected behavior.

Here’s a quick comparison of these different approaches:

| **Feature** | **Description** |
| ---: | :--- |
| **Type Assertion** | Tells TypeScript to treat a value as a specific type. |
| **Unknown Type** | Allows storing any value but requires type checking before use. |
| **Never Type** | Represents values that never occur, used for functions that never return. |