---
lang: en-US
title: "How Intersection Types Replace Error Handling"
description: "Article(s) > How Intersection Types Replace Error Handling"
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
      content: "Article(s) > How Intersection Types Replace Error Handling"
    - property: og:description
      content: "How Intersection Types Replace Error Handling"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/how-intersection-types-replace-error-handling.html
prev: /programming/ts/articles/README.md
date: 2026-01-13
isOriginal: false
author:
  - name: Benny Neugebauer
    url : https://stackoverflow.com/users/451634/benny-neugebauer
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
  name="How Intersection Types Replace Error Handling"
  desc="Learn how to replace runtime validation with TypeScript intersection types for compile-time safety and cleaner code."
  url="https://typescript.tv/best-practices/how-intersection-types-replace-error-handling"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to replace runtime validation with TypeScript intersection types for compile-time safety and cleaner code.

Runtime checks are everywhere in JavaScript code. You check if a property exists, throw an error if it doesn't, and hope you caught all the edge cases. But what if TypeScript could catch these errors before your code even runs?

Intersection types let you enforce requirements at the type level, moving validation from runtime to compile-time. This means fewer bugs, cleaner code, and errors caught during development instead of production.

---

## The Problem with Runtime Validation

Here's a common pattern you've probably written dozens of times. You have a function that expects an object with a specific property, but the type system doesn't guarantee that property exists:

```ts title="formatUser.ts"
type User = {
  name: string;
  email?: string;
};
 
function sendEmail(user: User) {
  if (!user.email) {
    throw new Error('User email is required');
  }
  console.log(`Sending email to "${user.email}"`);
}
```

This code has several issues. First, you're deferring error detection to runtime. The function will compile successfully even if you pass a user without an email, and you'll only discover the problem when the code executes. Second, the type system doesn't help you catch this error during development.

---

## The Intersection Type Solution

Intersection types combine multiple types into one, requiring the result to satisfy all constraints. By using an intersection type, you can express exactly what your function needs at the type level:

```ts title="formatUser.ts"
type User = {
  name: string;
  email?: string;
};
 
function sendEmail(user: User & { email: string }): void {
  console.log(`Sending email to "${user.email}"`);
}
```

The `&` operator creates an intersection type that merges multiple types together. The resulting type has all properties from all constituent types.

The intersection `User & { email: string }` means the user must be a `User` and must have an `email` property. There's no way to call this function with a user that doesn't have an email.

This makes it possible to remove the runtime check and the error message. The code is simpler because the type system is doing the work.

---

## Best Practices

Use intersection types to encode constraints that must always be true. If a function requires a property, express that in the type signature rather than checking at runtime. This makes the contract explicit and moves errors to compile-time.

However, when building public libraries or code intended for external consumers, it’s best to pair intersection types with runtime validation. TypeScript types are erased at runtime, so you still need to verify data from sources you don't control.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Intersection Types Replace Error Handling",
  "desc": "Learn how to replace runtime validation with TypeScript intersection types for compile-time safety and cleaner code.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/how-intersection-types-replace-error-handling.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
