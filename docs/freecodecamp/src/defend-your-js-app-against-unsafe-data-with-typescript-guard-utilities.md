---
lang: en-US
title: "How to Defend Your JavaScript App Against Unsafe Data with TypeScript Guard Utilities"
description: "Article(s) > How to Defend Your JavaScript App Against Unsafe Data with TypeScript Guard Utilities"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Defend Your JavaScript App Against Unsafe Data with TypeScript Guard Utilities"
    - property: og:description
      content: "How to Defend Your JavaScript App Against Unsafe Data with TypeScript Guard Utilities"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/defend-your-js-app-against-unsafe-data-with-typescript-guard-utilities.html
prev: /programming/ts/articles/README.md
date: 2026-07-02
isOriginal: false
author:
  - name: Kelechi Apugo
    url: https://freecodecamp.org/news/author/Laviedegeorge/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/45694ec7-239d-4f58-a597-9b2145bc02f5.png
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
  name="How to Defend Your JavaScript App Against Unsafe Data with TypeScript Guard Utilities"
  desc="Picture this: you hit an API endpoint, and you get an API response back. You pass the data straight into your application, and everything looks fine in development. Your mock data is clean, your types"
  url="https://freecodecamp.org/news/defend-your-js-app-against-unsafe-data-with-typescript-guard-utilities"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/45694ec7-239d-4f58-a597-9b2145bc02f5.png"/>

Picture this: you hit an API endpoint, and you get an API response back. You pass the data straight into your application, and everything looks fine in development. Your mock data is clean, your types line up, and everything checks out.

Then your code hits production. A field from the API endpoint comes back as `null` instead of a string. You were expecting an array, and it comes back as `undefined`, expecting an object and receiving a `number`. Suddenly, you're faced with an error screen, a crashed UI, or worse, silent data corruption that nobody notices until a user complains.

This is a common and preventable bug in JavaScript development. The fix doesn't require a third-party library or a complete architecture overhaul. It requires a small set of utility functions and the discipline to use them when needed.

This article shows you how to build a resilient application using four TypeScript guard utilities that'll make your codebase more reliable: `safeArray`, `safeString`, `safeNumber`, and `safeObject`. The utilities are framework-agnostic, so whether you're working in React, plain JavaScript, or anything in between, you can drop them straight into your codebase.

::: note Prerequisites

Before diving in, you should have:

- A working knowledge of TypeScript. You don't need to be an expert, but you should be comfortable with types, interfaces, and generics
- Familiarity with JavaScript and its built-in type-checking methods, like `typeof` and `Array.isArray`.

:::

---

## The Problem

JavaScript is a loosely typed language. It will let you call `.map()` on something that isn't an array, access properties on `null`, and do arithmetic with `NaN`. All of this, without throwing an error until it's too late. The language doesn't push back. It just breaks quietly.

TypeScript helps, but only up to a point. It checks types at compile time, not at runtime. So when external data arrives from an API, a form submission, local storage, or a third-party SDK, TypeScript has already left the building. Whatever your interface says, the actual value at runtime is whatever JavaScript received.

Here's what that looks like in practice:

```ts
// This looks fine. It is not fine.
type User = {
  id: number;
  name: string;
  tags: string[];
};

function displayUser(user: User) {
  const upperName = user.name.toUpperCase();
  const tagList = user.tags.map((tag) => `#${tag}`);
  return { upperName, tagList };
}
```

If `user.name` comes back as `null`, calling `.toUpperCase()` crashes your application. If `user.tags` is `undefined`, calling `.map()` crashes your application, too. Both scenarios are entirely possible when you're consuming a real API, and TypeScript won't warn you because you told it to trust the type.

Wait! I hear you saying, "I can use `optional chaining` to stop my app from crashing". This is correct, like the example below:

```ts
// This looks better. But...
type User = {
  id: number;
  name: string;
  tags: string[];
};

function displayUser(user: User) {
  const upperName = user?.name?.toUpperCase?.();
  const tagList = (user?.tags || [])?.map((tag) => `#${tag}`); 
  return { upperName, tagList };
}
```

But there are issues with the above approach. Firstly, `upperName` will return `undefined` if `user.name` isn't a string. Secondly, the `user?.tag || []` guards for `undefined` and `null` values alone. What if an object gets returned? `{...}?.map(...)`? Do you see the real issue now?

So `user?.name?.toUpperCase?.()` safely handles cases where `user`, `name`, or even `toUpperCase` itself might not exist. This is handy when dealing with uncertain data shapes, but it doesn't handle data mismatch.

---

## Why This Problem Exists

The blame sits squarely with JavaScript's type system, or rather, its lack of one.

JavaScript has a handful of primitive types and a few rules that seem reasonable until you look at them closely. For example, `typeof null` returns `"object"`, `typeof []` also returns `"object"`, and `typeof NaN` returns `"number"`. These aren't edge cases. They're the language.

Here's a quick illustration of how easily JavaScript misleads you:

```js
typeof null;        // "object" — not "null"
typeof [];          // "object" — not "array"
typeof NaN;         // "number" — NaN is technically a number
Array.isArray([]);  // true — this is the correct check
isNaN("hello");     // true — because "hello" coerces to NaN
Number.isNaN("hello"); // false — this is the correct check
```

TypeScript layers a static type system on top of this, catching many mistakes before your code runs. But static analysis only works on code you've already written. The moment data crosses the network boundary or comes from `localStorage`, a URL parameter, a third-party script, or any source outside your codebase, TypeScript's guarantees stop.

When you write something like this:

```ts
const data = await response.json() as User;
```

You're not validating anything. You're telling the TypeScript compiler, "I promise this is a `User`" . The compiler accepts that promise and stops checking. But if the API returns `null` for a field, sends a string where you expected a number, or omits a property entirely, JavaScript will proceed anyway and your code will break at the first operation that assumes otherwise.

This gap between "what TypeScript thinks the data is" and "what the data actually is at runtime" is where most production data bugs live. The fix is to stop trusting the type assertion and start validating the data yourself.

---

## The Solution: Safe Access Utilities

The fix is to validate data at the boundary. The moment the expected data enters your application, check it before you pass it anywhere else.

These four functions do exactly that:

```ts
export function safeArray<T>(prop: unknown): T[] {
  if (Array.isArray(prop)) {
    return prop as T[];
  } else {
    return [] as T[];
  }
}

export function safeString(prop: unknown, fallback = ""): string {
  if (typeof prop === "string") {
    return prop;
  } else {
    return fallback;
  }
}

export function safeNumber(prop: unknown, fallback = 0): number {
  if (typeof prop === "number" && !isNaN(prop)) {
    return prop;
  } else {
    return fallback;
  }
}

export function safeObject<T extends object>(
  prop: unknown,
  fallback = {} as T,
): T {
  if (prop !== null && typeof prop === "object" && !Array.isArray(prop)) {
    return prop as T;
  }
  return fallback;
}
```

Each function accepts `unknown`, which forces you to validate the value before using it. Each one returns a safe default if the input isn't what you expected. No crashes, no silent `undefined`, and no cryptic runtime errors.

You can drop these into any JavaScript or TypeScript project: React app, a Node.js API, a vanilla TypeScript module, or wherever you're handling external data.

---

## How Each Utility Works

### `safeArray`

```ts
export function safeArray<T>(prop: unknown): T[] {
  if (Array.isArray(prop)) {
    return prop as T[];
  } else {
    return [] as T[];
  }
}
```

This checks whether `prop` is actually an array using `Array.isArray`. If it is, you get it back typed as `T[]`. If it's anything other than an array like `null`, `undefined`, a string, or whatever, you get back an empty array.

This matters because of the JavaScript quirk you saw above: `typeof []` returns `"object"`, which means a naive `typeof` check wouldn't catch this. `Array.isArray` handles it correctly.

### `safeString`

```ts
export function safeString(prop: unknown, fallback = ""): string {
  if (typeof prop === "string") {
    return prop;
  } else {
    return fallback;
  }
}
```

This function uses `typeof` to confirm that the value is a string. The optional `fallback` parameter lets you specify a meaningful default. For example, `"Unknown"` instead of an empty string, when displaying a user's name.

### `safeNumber`

```ts
export function safeNumber(prop: unknown, fallback = 0): number {
  if (typeof prop === "number" && !isNaN(prop)) {
    return prop;
  } else {
    return fallback;
  }
}
```

The key detail here is `!isNaN(prop)`. Because `typeof NaN === "number"` is true in JavaScript, skipping this check means you could return `NaN` and cause downstream calculation failures. This function guards against that.

### `safeObject`

```ts
export function safeObject<T extends object>(
  prop: unknown,
  fallback = {} as T,
): T {
  if (prop !== null && typeof prop === "object" && !Array.isArray(prop)) {
    return prop as T;
  }
  return fallback;
}
```

This one requires three conditions due to JavaScript's quirks. `typeof null === "object"` is true. `typeof [] === "object"` is also true. So this function explicitly excludes both. What you get back is guaranteed to be a plain object and nothing else.

---

## How to Use Them in Practice

### Normalising API Responses (Plain TypeScript)

The best place to use these utilities is in the function that processes your API response before the data reaches any other part of your application. This works the same way, whether in a React app, a Node.js service, or a plain TypeScript module.

```ts title="lib/users.ts"
import { safeArray, safeString, safeNumber, safeObject } from "@/utils/safe";

type User = {
  id: number;
  name: string;
  email: string;
  tags: string[];
};

function normaliseUser(raw: unknown): User {
  const obj = safeObject<Record<string, unknown>>(raw);

  return {
    id: safeNumber(obj.id),
    name: safeString(obj.name, "Unknown User"),
    email: safeString(obj.email),
    tags: safeArray<string>(obj.tags),
  };
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return normaliseUser(data);
}
```

By the time your code receives the `User` object, every field is guaranteed to be the type you declared. Nothing downstream has to wonder whether `name` might be `null` or `tags` might be `undefined`.

### In a React Component (Defensive Rendering)

Sometimes you receive data directly in a component, from props, context, or a query result, and you don't control normalisation upstream. In that case, wrap the values at the point of use.

```ts
import { safeArray, safeString, safeNumber, safeObject } from "@/utils/safe";

type ProductProps = {
  product: unknown;
};

function ProductCard({ product }: ProductProps) {
  const p = safeObject<Record<string, unknown>>(product);
  const name = safeString(p.name, "Unnamed Product");
  const price = safeNumber(p.price);
  const tags = safeArray<string>(p.tags);

  return (
    <div className="product-card">
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}
```

Even if `product` arrives as `null` or a completely unexpected shape, this component will render a fallback state instead of crashing.

### With React Query

If you're using React Query, you can normalise data inside the `select` option, which transforms the raw API response before it reaches your component.

```ts
import { useQuery } from "@tanstack/react-query";
import { safeArray, safeString, safeNumber, safeObject } from "@/utils/safe";

type Order = {
  id: number;
  status: string;
  total: number;
  items: string[];
};

function normaliseOrder(raw: unknown): Order {
  const obj = safeObject<Record<string, unknown>>(raw);
  return {
    id: safeNumber(obj.id),
    status: safeString(obj.status, "pending"),
    total: safeNumber(obj.total),
    items: safeArray<string>(obj.items),
  };
}

function useOrder(orderId: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () =>
      fetch(`/api/orders/${orderId}`).then((res) => res.json()),
    select: normaliseOrder,
  });
}
```

The `select` callback runs after the query resolves and before the data is cached. Your `useOrder` hook always returns a properly shaped `Order`, regardless of what the API actually sent back.

### With a React Context Provider

Context is a place where unsafe data can silently propagate through your entire component tree. Normalise it at the provider level so every consumer is protected.

```tsx :collapsed-lines
import { createContext, useContext, useEffect, useState } from "react";
import { safeArray, safeString, safeObject } from "@/utils/safe";

type AppConfig = {
  theme: string;
  features: string[];
};

const defaultConfig: AppConfig = {
  theme: "light",
  features: [],
};

const ConfigContext = createContext<AppConfig>(defaultConfig);

function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((raw: unknown) => {
        const obj = safeObject<Record<string, unknown>>(raw);
        setConfig({
          theme: safeString(obj.theme, "light"),
          features: safeArray<string>(obj.features),
        });
      });
  }, []);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
```

One normalisation step at the provider level protects every component that consumes the context.

### In a Node.js API Route

These utilities are just as useful on the backend. If your Node.js API receives a request body, you can't trust that the client sent what you expected. Validate it at the point of entry.

```ts title="routes/orders.ts (Express)"
import { safeArray, safeString, safeNumber, safeObject } from "../utils/safe";

type OrderPayload = {
  userId: number;
  notes: string;
  itemIds: number[];
};

function parseOrderPayload(raw: unknown): OrderPayload {
  const obj = safeObject<Record<string, unknown>>(raw);
  return {
    userId: safeNumber(obj.userId),
    notes: safeString(obj.notes),
    itemIds: safeArray<number>(obj.itemIds),
  };
}

app.post("/orders", (req, res) => {
  const payload = parseOrderPayload(req.body);

  if (!payload.userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  // proceed with validated payload
});
```

The same four utilities, the same pattern. Just a different runtime environment.

---

## Best Practices

As with anything, there are some best practices that'll help you use these utilities well and correctly.

First, normalise at the boundary, not inside every function. The best place to call these utilities is in your data-fetching layer, API handlers, or integration points, just once, before the data spreads. If you're calling `safeString` in five different places for the same field, that's a sign the normalisation belongs upstream.

Second, use meaningful fallbacks. The default fallbacks (empty string, `0`, empty array, and empty object) are safe, but sometimes misleading. For a user's display name, `safeString(name, "Anonymous")` is more informative than `safeString(name)`. Think about what makes sense for each field in your domain.

Third, keep your type definitions honest. If a field can realistically be `null` or `undefined` from your data source, reflect that in your types and use these utilities to handle it. Typing a field as `string` when it might be `null` just papers over the problem. These utilities work best when your types reflect the reality of what you receive.

Finally, create a normalisation module. Put all your normaliser functions in one place, for example, `src/lib/normalise.ts`. This keeps the defensive logic centralised, easy to test, and out of your application logic.

---

## Things to Avoid

Likewise, there are some practices you should avoid.

First, don't use these utilities as a substitute for a proper data contract. If your entire codebase is wrapping every value in `safeString` because your data sources are wildly inconsistent, the real fix is a contract, an OpenAPI spec, a shared schema, Zod validation, or at minimum, documented response shapes. These utilities handle edge cases and runtime surprises, not systemic chaos.

Second, don't skip the `safeObject` wrapper. It's tempting to cast straight to `any` and access properties directly. Avoid this. The `as any` cast defeats TypeScript entirely, and accessing properties on an `unknown` value will cause a compile error anyway. Use `safeObject` to unwrap the value first, then access its fields safely.

Next, don't chain these utilities without extracting intermediate values. Something like `safeString(safeArray(raw)[0])` might seem compact, but it's harder to read and debug. Extract intermediate values into clearly named variables instead.

And finally, don't skip validation just because you control the data source. "I wrote the API, so I know what it returns" is a reasonable position right up until a schema migration, a nullable column addition, or an unconsidered edge case proves otherwise. Trust the utilities, not your memory.

---

## Bonus: Combine Them into a `safeData` Helper

If you find yourself calling all four utilities together frequently, which you will once you start normalising API responses consistently, you can compose them into a single fluent helper.

```ts title="utils/safeData.ts"
import { safeArray, safeString, safeNumber, safeObject } from "./safe";

type SafeDataAccessors = {
  string: (key: string, fallback?: string) => string;
  number: (key: string, fallback?: number) => number;
  array: <T>(key: string) => T[];
  object: <T extends object>(key: string, fallback?: T) => T;
};

export function safeData(raw: unknown): SafeDataAccessors {
  const obj = safeObject<Record<string, unknown>>(raw);

  return {
    string: (key, fallback = "") => safeString(obj[key], fallback),
    number: (key, fallback = 0) => safeNumber(obj[key], fallback),
    array: <T>(key: string) => safeArray<T>(obj[key]),
    object: <T extends object>(key: string, fallback = {} as T) =>
      safeObject<T>(obj[key], fallback),
  };
}
```

Your normalisation functions then read cleanly, whether you're in a React hook, an Express route, or anywhere else:

```ts
import { safeData } from "@/utils/safeData";

function normaliseUser(raw: unknown) {
  const d = safeData(raw);
  return {
    id: d.number("id"),
    name: d.string("name", "Unknown User"),
    email: d.string("email"),
    tags: d.array<string>("tags"),
  };
}
```

This is a thin abstraction: no magic, just less repetition. Use it if your normalisation functions are getting verbose. Skip it if the direct utility calls are clear enough for your team.

---

## Conclusion

JavaScript's loose type system and TypeScript's compile-time-only guarantees leave a gap at every data boundary. External data — from APIs, request bodies, local storage, third-party scripts — arrives at runtime with no guarantee it matches the shape you declared. These four utilities close that gap.

`safeArray`, `safeString`, `safeNumber`, and `safeObject` each accept `unknown`, validate the actual type, and return a safe fallback if the value isn't what you expected. They work in React components, Node.js routes, custom hooks, context providers, and any other JavaScript or TypeScript context where data enters your application.

The pattern is simple: validate at the boundary, trust inside. Normalise your data once, at the point it enters your codebase, and everything downstream can focus on its actual job instead of defending against bad inputs.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Defend Your JavaScript App Against Unsafe Data with TypeScript Guard Utilities",
  "desc": "Picture this: you hit an API endpoint, and you get an API response back. You pass the data straight into your application, and everything looks fine in development. Your mock data is clean, your types",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/defend-your-js-app-against-unsafe-data-with-typescript-guard-utilities.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
