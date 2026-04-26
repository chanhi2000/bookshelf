---
lang: en-US
title: "Stop Type Drift with Linked Typing"
description: "Article(s) > Stop Type Drift with Linked Typing"
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
      content: "Article(s) > Stop Type Drift with Linked Typing"
    - property: og:description
      content: "Stop Type Drift with Linked Typing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/stop-type-drift-with-linked-typing.html
prev: /programming/ts/articles/README.md
date: 2026-04-08
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp
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
  name="Stop Type Drift with Linked Typing"
  desc="Use keyof typeof to derive types from runtime objects. One source of truth, zero drift, and TypeScript catches mistakes at compile time."
  url="https://typescript.tv/best-practices/stop-type-drift-with-linked-typing"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Z1JxPnr.webp"/>

Use keyof typeof to derive types from runtime objects. One source of truth, zero drift, and TypeScript catches mistakes at compile time.

I recently reviewed a component library where every variant map had a matching union type written by hand. Button had one, Badge had one, Tag had one. Every time someone added a variant to the object, they had to remember to update the type too. They didn't always remember.

There's a simple fix with TypeScript which I call **linked typing**: derive your types from the runtime values they describe, so the two can never fall out of sync.

---

## The Problem: Manual Union Types

Here's a common pattern in React component libraries. You define a union type for the allowed variant names and then write a map of CSS classes per variant:

```tsx{1-4,6} title="button.tsx"
// union type for the allowed variant names
type ButtonVariant = 'default' | 'secondary' | 'outline' | 'ghost';
 
// map of CSS classes
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default: 'bg-blue-600 text-white',
  ghost: 'bg-transparent',
  outline: 'border border-gray-300',
  secondary: 'bg-gray-200 text-gray-900',
};
```

This works, but you now have two sources of truth for the list of variants. Add `"destructive"` to the object and forget the union? TypeScript won't catch it because `Record<ButtonVariant, string>` only enforces that the four declared keys exist. Extra keys in the object literal are caught, but missing keys in the union are not.

---

## The Fix: keyof typeof

Instead of defining the type first and then the object, flip it around. Define the object first, then extract the type from it:

```ts{9} title="button.tsx"
const VARIANT_CLASSES = {
  default: 'bg-blue-600 text-white',
  destructive: 'border border-red-300 text-red-600',
  ghost: 'bg-transparent',
  outline: 'border border-gray-300',
  secondary: 'bg-gray-200 text-gray-900',
} as const;
 
type ButtonVariant = keyof typeof VARIANT_CLASSES;
// Resolves to: "default" | "destructive" | ...
```

Now the type is derived from the object. Add a key to the object, and the type updates. Remove a key, and the type shrinks. There is exactly one source of truth.

The `as const` assertion is important here. Without it, TypeScript widens the object's type to `Record<string, string>`, and `keyof typeof` gives you `string` instead of the specific union. With `as const`, TypeScript preserves the literal key names.

---

## Using It in Component Props

This pattern is especially useful in React components where props need to accept a specific set of values:

```ts{14} title="button.tsx"
const VARIANT_CLASSES = {
  default: 'bg-blue-600 text-white',
  ghost: 'bg-transparent',
  outline: 'border border-gray-300',
  secondary: 'bg-gray-200 text-gray-900',
} as const;
 
const SIZE_CLASSES = {
  sm: 'h-8 px-3 text-xs',
  default: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
} as const;
 
interface ButtonProps {
  variant?: keyof typeof VARIANT_CLASSES;
  size?: keyof typeof SIZE_CLASSES;
}
```

When someone uses this component, their editor autocompletes the exact values from the object keys. If they pass an invalid string, TypeScript errors immediately. And when a developer adds a new size or variant to the object, the props type accepts it automatically.

---

## Beyond Component Variants

The pattern applies anywhere you have a fixed set of runtime values that should map to a type. Configuration objects are a common case:

```ts title="config.ts"
const ENDPOINTS = {
  settings: '/api/settings',
  threads: '/api/threads',
  users: '/api/users',
} as const;
 
type EndpointName = keyof typeof ENDPOINTS;
// "settings" | "threads" | "users"
 
type EndpointPath = (typeof ENDPOINTS)[EndpointName];
// "/api/settings" | "/api/threads" | "/api/users"
```

Notice the second type: `typeof ENDPOINTS[EndpointName]` gives you a union of the values and not the keys. You can derive both directions from the same object.

Error code maps work the same way:

```ts title="errors.ts"
const ERROR_MESSAGES = {
  NOT_FOUND: 'The requested resource was not found',
  RATE_LIMITED: 'Too many requests, please try again later',
  UNAUTHORIZED: 'You must be signed in to access this resource',
} as const;
 
type ErrorCode = keyof typeof ERROR_MESSAGES;
```

Add a new error code to the object and every function that accepts `ErrorCode` automatically knows about it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Stop Type Drift with Linked Typing",
  "desc": "Use keyof typeof to derive types from runtime objects. One source of truth, zero drift, and TypeScript catches mistakes at compile time.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/stop-type-drift-with-linked-typing.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
