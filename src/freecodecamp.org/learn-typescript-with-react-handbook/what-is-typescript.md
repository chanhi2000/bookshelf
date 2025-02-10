---
lang: en-US
title: "What is TypeScript?"
description: "Article(s) > (1/13) Learn TypeScript – A Handbook for Developers"
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
      content: "Article(s) > (1/13) Learn TypeScript – A Handbook for Developers"
    - property: og:description
      content: "What is TypeScript?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-typescript-with-react-handbook/what-is-typescript.html
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
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-what-is-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>

Before diving into what TypeScript is, it's important to understand why it was created. JavaScript is a **loosely typed language**, meaning variables are defined and their types are determined at runtime. This flexibility can lead to unexpected behavior, especially in larger projects.

For example, you might accidentally assign a value of the wrong type to a variable, resulting in errors that you only discover when the code is executed.

Here’s an example of JavaScript that demonstrates this issue:

```js
let userName = "Alice";
userName = 42; // No error during assignment, but this might break the code later.

function greetUser(name) {
  console.log("Hello, " + name.toUpperCase()); // Error at runtime if `name` is not a string.
}

greetUser(userName); // Throws an error because `userName` is a number, not a string.
```

This error can be challenging to debug, as it only surfaces at runtime, making large projects harder to maintain and more prone to bugs.

This is where TypeScript comes into the picture. TypeScript is a programming language that builds on JavaScript by adding **static typing**. Static typing means you can explicitly specify the types of variables, function arguments, return values, and more. Unlike **dynamic typing**, where types are determined at runtime, static typing allows TypeScript to catch type-related errors early during development, improving code quality and reducing bugs.

For example, here’s the same code written in TypeScript:

```js
let userName: string = "Alice";
// userName = 42; // Error: Type 'number' is not assignable to type 'string'.

function greetUser(name: string): void {
  console.log("Hello, " + name.toUpperCase());
}

greetUser(userName); // Works perfectly since `userName` is correctly typed.
```
