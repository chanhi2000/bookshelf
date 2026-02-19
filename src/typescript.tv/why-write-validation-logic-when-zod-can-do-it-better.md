---
lang: en-US
title: "Why Write Validation Logic When Zod Can Do It Better?"
description: "Article(s) > Why Write Validation Logic When Zod Can Do It Better?"
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
      content: "Article(s) > Why Write Validation Logic When Zod Can Do It Better?"
    - property: og:description
      content: "Why Write Validation Logic When Zod Can Do It Better?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/why-write-validation-logic-when-zod-can-do-it-better.html
prev: /programming/ts/articles/README.md
date: 2025-07-17
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
  name="Why Write Validation Logic When Zod Can Do It Better?"
  desc="Learn how to strengthen your TypeScript applications with Zod, a powerful schema validation library. Discover how Zod enables type-safe, runtime validation with minimal boilerplate, so you can save time and effort when developing API services and data-driven applications."
  url="https://typescript.tv/best-practices/why-write-validation-logic-when-zod-can-do-it-better"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Learn how to strengthen your TypeScript applications with Zod, a powerful schema validation library. Discover how Zod enables type-safe, runtime validation with minimal boilerplate, so you can save time and effort when developing API services and data-driven applications.

[<VPIcon icon="iconfont icon-zod"/>Zod](https://zod.dev/) is a powerful, TypeScript-first validation library that combines static type safety with runtime data validation. It’s especially useful when you want to ensure that incoming data matches your expected structure without writing repetitive boilerplate code.

---

## Safe Validation with Result Types

If you prefer non-throwing validation, use `safeParse`. It returns a result object that separates success from failure:

```ts
const validation = UserSchema.safeParse(user);
 
if (validation.error) {
  console.error(validation.error.format());
} else {
  const user = validation.data;
  console.log(user.name);
}
```

This approach is useful in functional programming patterns, where you handle errors as data instead of using exceptions. It can be used for always [**returning Result Types**](/typescript.tv/error-handling-with-result-types.md).

---

## Composing Zod Schemas

Zod supports reusable and composable schemas, allowing you to build complex validations from smaller building blocks:

```ts
import { z } from 'zod';
 
const AddressSchema = z.object({
  street: z.string(),
  city: z.stringw(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
});
 
export const UserSchema = z.object({
  address: AddressSchema,
  name: z.string().default('John Doe'),
});
```

Schemas like `AddressSchema` can be reused across multiple models, improving maintainability and consistency. The Zod validator is written in TypeScript itself and also supports features like [<VPIcon icon="iconfont icon-zod"/>Literal types](https://zod.dev/api#literals) and [<VPIcon icon="iconfont icon-zod"/>readonly properties](https://zod.dev/api#readonly).

---

## Saving Time with Zod

Using Zod for this not only improves type safety and maintainability but also makes validation much easier and more reliable compared to manual checks.

### Validation without Zod

In plain TypeScript, you're responsible for manually checking for missing properties using conditionals. You also need to define fallback values on your own and validate data types explicitly, which can quickly become tedious when working with nested data structures:

```ts
type User = {
  name: string;
  age: number;
};
 
async function fetchUser(): Promise<User> {
  const res = await fetch('https://api.example.com/user');
  const data = await res.json();
 
  if (!data.age) {
    throw new Error(`User has no age`);
  }
 
  return {
    name: data.name || 'John Doe',
    age: data.age,
  };
}
```

This kind of defensive programming can quickly become repetitive, error-prone, and difficult to maintain as your data structures grow in size and complexity.

### Validation with Zod

Zod provides a much cleaner and declarative way to define and validate data shapes. It automatically infers the TypeScript type from the schema, reducing boilerplate and keeping your code [<VPIcon icon="fa-brands fa-wikipedia-w"/>DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself):

```ts
import { z } from 'zod';
 
const UserSchema = z.object({
  name: z.string().default('John Doe'),
  age: z.number(),
});
 
async function fetchUser() {
  const res = await fetch('https://api.example.com/user');
  const data = await res.json();
  return UserSchema.parse(data);
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why Write Validation Logic When Zod Can Do It Better?",
  "desc": "Learn how to strengthen your TypeScript applications with Zod, a powerful schema validation library. Discover how Zod enables type-safe, runtime validation with minimal boilerplate, so you can save time and effort when developing API services and data-driven applications.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/why-write-validation-logic-when-zod-can-do-it-better.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
