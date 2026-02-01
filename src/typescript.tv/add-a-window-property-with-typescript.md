---
lang: en-US
title: "Add a window property with TypeScript"
description: "Article(s) > Add a window property with TypeScript"
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
      content: "Article(s) > Add a window property with TypeScript"
    - property: og:description
      content: "Add a window property with TypeScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/add-a-window-property-with-typescript.html
prev: /programming/ts/articles/README.md
date: 2019-02-20
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
  name="Add a window property with TypeScript"
  desc="In TypeScript, you can define custom properties on the `window` namespace by declaring them as global properties. For example, if you want to make TypeScript aware of the property `window.__coverage__`, you can declare it in your code using the `declare global` syntax."
  url="https://typescript.tv/hands-on/add-a-window-property-with-typescript"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

In TypeScript, you can define custom properties on the `window` namespace by declaring them as global properties. For example, if you want to make TypeScript aware of the property `window.__coverage__`, you can declare it in your code using the `declare global` syntax.

Sometimes you want to define a custom property on the `window` namespace. This can be done by declaring it as a global property.

---

## Define a window property

In the following case we want to make TypeScript aware of the property `window.__coverage__` which is set by istanbul's instrumenter class.

When calling `__coverage__` on `window` the TypeScript compiler complains with the following error:

::: info TS2339

Property '**coverage**' does not exist on type 'Window'.

:::

To get along with it we have to make TypeScript aware of this new property by declaring it in our code:

```ts
declare global {
  interface Window {
    __coverage__: Object;
  }
}
```

---

## Define a global property

If you want to define a global `__coverage__` property in a Node.js environment, you will have to assign it to the `global` object because there is no `window` in Node.js:

```ts
declare global {
  namespace NodeJS {
    interface Global {
      __coverage__: {};
    }
  }
}
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Add a window property with TypeScript",
  "desc": "In TypeScript, you can define custom properties on the `window` namespace by declaring them as global properties. For example, if you want to make TypeScript aware of the property `window.__coverage__`, you can declare it in your code using the `declare global` syntax.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/add-a-window-property-with-typescript.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
