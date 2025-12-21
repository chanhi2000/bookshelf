---
lang: en-US
title: "Rest Parameters"
description: "Article(s) > (7/13) Learn TypeScript - A Handbook for Developers"
category:
  - TypeScript
  - Article(s)
tag:
  - blog- freecodecamp.org
  - ts
  - typesccript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (7/13) Learn TypeScript - A Handbook for Developers"
    - property: og:description
      content: "Rest Parameters"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-typescript-with-react-handbook/rest-parameters.html
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
  url="https://freecodecamp.org/news/learn-typescript-with-react-handbook#heading-rest-parameters"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1738941922431/cfb485ae-1c59-415a-ad56-393a9803d4d8.png"/>

Rest parameters in TypeScript let you handle multiple arguments without knowing how many you’ll get in advance. You can pass as many arguments as you want—TypeScript will handle them. They’re perfect for situations where the number of inputs isn’t fixed.

To use rest parameters, you write three dots (`...`) before the parameter name, which gathers all the extra arguments into an array.

Let’s say you want to combine multiple words into a single sentence:

```ts
function joinWords(...words: string[]): string {
  return words.join(" ");
}

let sentence = joinWords("TypeScript", "makes", "coding", "fun");
console.log(sentence); // "TypeScript makes coding fun"
```

- `...words` collects all the arguments into an array (`["TypeScript", "makes", "coding", "fun"]`).
- The `join` method combines them into a single string, separated by spaces.

---

## Rest Parameters with Numbers

Now, suppose you want to add multiple numbers:

```ts
function sumNumbers(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

let total = sumNumbers(10, 20, 30);
console.log(total); // 60
```

- `...numbers` gathers all the numbers into an array (`[10, 20, 30]`).
- The `reduce` method adds them together to get the total.

We can also use rest parameters to merge multiple arrays into one:

```ts
function mergeArrays(...arrays: number[][]): number[] {
  return arrays.flat();
}

let combined = mergeArrays([1, 2], [3, 4], [5, 6]);
console.log(combined); // [1, 2, 3, 4, 5, 6]
```

- `...arrays` collects each argument as an array into an array of arrays (`[[1, 2], [3, 4], [5, 6]]`).
- The `flat` method combines them into one array.

Rest parameters must always come last in the parameter list. For example:

```ts
function example(a: string, ...others: number[]): void {
  console.log(a, others);
}
```

This ensures all remaining arguments go into the rest parameter.
