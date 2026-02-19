---
lang: en-US
title: "When to use static methods in TypeScript?"
description: "Article(s) > When to use static methods in TypeScript?"
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
      content: "Article(s) > When to use static methods in TypeScript?"
    - property: og:description
      content: "When to use static methods in TypeScript?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/when-to-use-static-methods-in-typescript.html
prev: /programming/ts/articles/README.md
date: 2020-10-08
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
  name="When to use static methods in TypeScript?"
  desc="Static methods in programming are functions that can be called directly from a class without needing to create an instance of the class. They are useful when you have a function that doesn't rely on any internal state of the class."
  url="https://typescript.tv/best-practices/when-to-use-static-methods-in-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Static methods in programming are functions that can be called directly from a class without needing to create an instance of the class. They are useful when you have a function that doesn't rely on any internal state of the class.

When developing class functions that don't rely on an internal state, it's a good idea to turn them into static methods. This can be easily done by adding the keyword `static` to your function's declaration.

::: info Tutorial

Static methods are a great concept to share functionality from a class without instantiating the class. In the following live session Benny will show you how to implement a static method. As a bonus you will also learn how to share type definitions with TypeScript to extend the reusability of your own code:

<VidStack src="youtube/qF_iZfc22oo" />

:::

---

## Identifying static methods

When checking a function's implementation you can easily recognize whether a function should be converted into a static method. If your function doesn't use the `this` keyword or any other class member, then it can be easily converted to a static function. To create a static function simply add the `static` keyword and call it directly from the class instead of calling it from the instance of the class.

---

## Code samples

### Instance method

```ts
export class MyClass {
  myFunction(text: string) {
    return text;
  }
}
 
const instance = new MyClass();
instance.myFunction('My Text');
```

### Static method

```ts
export class MyClass {
  static myFunction(text: string) {
    return text;
  }
}
 
MyClass.myFunction('My Text');
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "When to use static methods in TypeScript?",
  "desc": "Static methods in programming are functions that can be called directly from a class without needing to create an instance of the class. They are useful when you have a function that doesn't rely on any internal state of the class.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/when-to-use-static-methods-in-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
