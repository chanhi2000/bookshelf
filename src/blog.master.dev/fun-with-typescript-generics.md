---
lang: en-US
title: "Fun with TypeScript Generics"
description: "Article(s) > Fun with TypeScript Generics"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - master.dev
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Fun with TypeScript Generics"
    - property: og:description
      content: "Fun with TypeScript Generics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/fun-with-typescript-generics.html
prev: /programming/ts/articles/README.md
date: 2026-02-13
isOriginal: false
author:
  - name: Adam Rackis
    url: https://blog.master.dev/author/adamrackis/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/8524
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
  name="Fun with TypeScript Generics"
  desc="Generics, combined with conditional types can make for an incredibly powerful combination. When you look at things the right way, you can ask very useful questions about your types that allow you to build the precise API you want."
  url="https://blog.master.dev/fun-with-typescript-generics/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/8524"/>

Generics are an incredibly powerful feature of [<VPIcon icon="iconfont icon-typescript"/>TypeScript](https://typescriptlang.org/). There’s endless content on TypeScript in general, and generics in particular. This post will differ a bit and cover things more deeply.

This won’t be a generic introduction to generics (pun intended). Instead, we’ll implement a very, very niche use case, and in the process cover some advanced uses for generics, plus conditional types, and some other goodies.

---

## A Quick Refresher on Generics & Conditional Types

Let’s take a very, very fast introduction to the key concepts of this post. We’ll use extremely contrived examples to keep everything as brief as possible.

If you’re already an expert, just scroll past. If you’re not sure, give it a read, and if what’s in this section isn’t old hat, you might want to read some refresher materials before tackling the rest of this post.

### Generics

Think of generics as function parameters that are types. What do I mean by that? Normally function parameters are *values* (or references to a value, but we won’t bother with that).

```ts
function arrayLength(arr: any[]) {
  return arr.length;
}
```

Here, `arr` is an array. Right now, it’s an array of `any`. If we wanted, we could type this array a bit more accurately by adding a generic argument.

```ts
function arrayLengthTyped<T>(arr: T[]) {
  return arr.length;
}
```

Now, whenever we call this method and pass an array, the generic argument `T` will infer to whatever the type of the array is. Make no mistake, even though `T` makes this method definition more accurate, it’s completely pointless. The original method was perfectly fine. The value of `arr` is an array of `any`, but it doesn’t matter; no matter what the elements of the array are, the `.length` property will always be there.

Let’s go from one pointless function to another. Let’s implement our own filter.

```ts
function filterUntyped(array: any[], predicate: (item: any) => boolean): any[] {
  return array.filter(predicate);
}
```

This time we actually have a problem. There’s absolutely no checking done on the predicate function we pass in.

```ts
type User = {
  name: string;
};

const users: User[] = [];

filterUntyped(users, user => user.nameX === "John");
```

We’re passing in a function that takes each member of the array, but we’re clearly misusing it; there is no nameX property on each user. This is where generics shine.

```ts
function filterTyped<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}
```

Now TypeScript will verify everything.

```plaintext
filterTyped(users, user => user.nameX === "John");  
*// -----------------------------^^^^^*  
*// Property 'nameX' does not exist on type 'User'. Did you mean 'name'?*
```

We can even limit generic arguments. What if we have a bunch of different user types?

```ts
type User = {
  name: string;
};

type AdminUser = User & {
  role: string;
};

type BannedUser = User & {
  reason: string;
};
```

For whatever strange reason, we wanted to take the `filterTyped` function from before.

```ts
function filterTyped<T>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}
```

But this time have it only works with any `User` type.

If you’re thinking *just ditch the generics altogether and…*

```ts
function filterUser(array: User[], predicate: (item: User) => boolean): User[] {
  return array.filter(predicate);
}
```

…not so fast. This function, while appealing, winds up erasing our return type.

```ts
const adminUsers: AdminUser[] = [];
const adminUsersNamedAdam = filterUser(adminUsers, user => user.name === "Adam");
```

The variable `adminUsersNamedAdam` is typed as `User[]`, and how could it not be? `filterUser` is explicitly typed to return `User[].`

The correct solution is to go back to the generic version, but *restrict* the acceptable values for T.

```ts
function filterUserCorrect<T extends User>(array: T[], predicate: (item: T) => boolean): T[] {
  return array.filter(predicate);
}
```

Now our return type is correctly inferred: it’s the exact same type that we pass in for the array. But we’re only able to invoke it with a type that matches the `User` type, which is to say, has a `name` property that’s a string.

### Conditional Types

Conditional types allow us to, essentially, *ask questions* about types and form new types based on the answers.

```ts
type IsArray<T> = T extends any[] ? true : false;

type YesIsArray = IsArray<number[]>;
type NoIsNotArray = IsArray<number>;
```

Here `YesIsArray` is the literal type `true` while `NoIsNotArray` is the literal type `false`. This is obviously pointless; the real value of conditional types usually comes with inferred types.

```ts
type ArrayOf<T> = T extends Array<infer U> ? U : never;

type NumberType = ArrayOf<number[]>;
type NeverType = ArrayOf<number>;
```

Here the `Number` type is `number` and the NeverType type is, predictably, `never`. And yes, we can (and should) use generic constraints with these helper types

```ts
type ArrayOf2<T extends Array<any>> = T extends Array<infer U> ? U : never;

type NumberType2 = ArrayOf2<number[]>;
type NeverType2 = ArrayOf2<number>;
// ------------------------^^^^^^^
// Type 'number' does not satisfy the constraint 'any[]'
```

Now we’re forbidden from using `ArrayOf2` with any type that’s not an array of something, so we’ll never have to worry about getting `never` back.

---

## Let’s Get Started

I recently wrote [**a two-part post on single flight mutations**](/blog.master.dev/single-flight-mutations-in-tanstack-start-part-1.md) using [<VPIcon icon="iconfont icon-tanstack"/>TanStack Start](https://tanstack.com/start/latest). In order to make that work, we very carefully put together react-query options. Our query functions (which do the actual data fetching) were purposefully designed to be a single call against a TanStack Server Function. Then that same query function, as well as the argument payload it takes, were placed on react-query’s `meta` option.

Then, in middleware on the server, we received query keys and looked up the server function and argument payload for a query so we could refetch its data.

As part of those efforts, we built a simple helper to remove the duplication between the query function and the meta option.

```ts
export function refetchedQueryOptions(queryKey: QueryKey, serverFn: any, arg?: any) {
  const queryKeyToUse = [...queryKey];
  if (arg != null) {
    queryKeyToUse.push(arg);
  }
  return queryOptions({
    queryKey: queryKeyToUse,
    queryFn: async () => {
      return serverFn({ data: arg });
    },
    meta: {
      __revalidate: {
        serverFn,
        arg,
      },
    },
  });
}
```

It’s a helper that takes in the query key, the server function, and argument payload, if any, and returns back *some* of our query options. It does this so the query function, and meta option will always be in sync with whatever server function is fetching our data. Then we compose it like this.

```ts
export const epicsQueryOptions = (page: number) => {
  return queryOptions({
    ...refetchedQueryOptions(["epics", "list"], getEpicsList, page),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};
```

This proof-of-concept version worked fine, but nothing was typed. Our server function and argument payload were both marked as `any`, which didn’t just fail to restrict invalid argument payloads, but also, disastrously, led all query hooks that used this to report the queried data as `any`.

This post will implement a fully typed version of our `refetchedQueryOptions` function. It’s much harder than it might appear!

---

## Our Success Criteria

Here’s our complete test setup.

```ts :collapsed-liens
import { QueryKey, queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";

// ============================ Current Implementation ============================

export function refetchedQueryOptions(queryKey: QueryKey, serverFn: any, arg?: any) {
  const queryKeyToUse = [...queryKey];
  if (arg != null) {
    queryKeyToUse.push(arg);
  }
  return queryOptions({
    queryKey: queryKeyToUse,
    queryFn: async () => {
      return serverFn({ data: arg });
    },
    meta: {
      __revalidate: {
        serverFn,
        arg,
      },
    },
  });
}

// ============== Server Functions for testing ==============

const serverFnWithArgs = createServerFn({ method: "GET" })
  .inputValidator((arg: { value: string }) => arg)
  .handler(async () => {
    return { value: "Hello World" };
  });

const serverFnWithoutArgs = createServerFn({ method: "GET" }).handler(async () => {
  return { value: "Hello World" };
});

// ============================ Tests ============================

refetchedQueryOptions(["test"], serverFnWithArgs, { value: "" });
refetchedQueryOptions(["test"], serverFnWithoutArgs);

// wrong argument type
// FAILS - Unused '@ts-expect-error' directive.
// @ts-expect-error
refetchedQueryOptions(["test"], serverFnWithArgs, 123);

// need an argument
// FAILS - Unused '@ts-expect-error' directive.
// @ts-expect-error
refetchedQueryOptions(["test"], serverFnWithArgs);
```

At the top we have the current iteration of our `refetchedQueryOptions` method. Beneath that, we have some server functions that will help us test this, one with an argument, the other without. And beneath that, we see four calls to `refetchedQueryOptions` to validate that our type checking is working properly. The top two we expect to succeed, and the bottom two we expect to error, which we verify with the `// @ts-expect-error` directive. This directive, well, *expects* an error on the very next line. If there is an error on the very next line, all is well; if there is no error on the next line, the `@ts-expect-error` directive will itself raise an error.

Above, with our initial implementation, we see our expected errors fail to error out. This makes sense, since everything is typed as `any`, and our `arg` parameter is optional, so really anything goes.

Even if you’re more than willing to live with imperfect typings, this current solution isn’t good for much. Since `serverFn` is typed as any, our `queryFn` will return `any`. That means any application code that’s using `useQuery` or `useSuspenseQuery` will now spit out `any` for your data.

The rest of this post will get everything typed properly. We’ll have to do some unhinged things, so hopefully we’ll learn something new and maybe even have some fun.

---

## Iteration 1

How’s this for a minimal improvement? Right now, the lack of a return type for the server function is absolutely killing us. Any usage of this query data will give use `any`. We *really* want our data properly typed in application code.

TanStack Server functions are just… *functions*. They’re special in that you can call them from the client or the server, but at the end of the day, they’re functions. They always take in a single argument that has a `data` property for the standard arguments your function has defined (it also allows you to pass things like headers, but we won’t worry about that, here).

Couldn’t we add a generic to our function, representing the server function? Once we have a function, we can use TypeScript’s built-in `Parameters` and `ReturnType` helpers. Let’s see what that looks like.

```ts{4,12}
export function refetchedQueryOptions<T extends (arg: { data: any }) => Promise<any>>(
  queryKey: QueryKey,
  serverFn: T,
  arg: Parameters<T>[0]["data"],
) {
  const queryKeyToUse = [...queryKey];
  if (arg != null) {
    queryKeyToUse.push(arg);
  }
  return queryOptions({
    queryKey: queryKeyToUse,
    queryFn: async (): Promise<Awaited<ReturnType<T>>> => {
      return serverFn({ data: arg });
    },
    meta: {
      __revalidate: {
        serverFn,
        arg,
      },
    },
  });
}
```

We constrain our generic to be a function that takes in an `arg` with a `data` property. Moreover, we can now *use* our `T` generic in the parameter definition of `arg`, here `arg: Parameters<T>[0]["data"]`. Whatever our function is, we say that `arg` is the same type as the `data` property on the main argument that the function takes in.

How does this look? Let’s check our tests

```ts
refetchedQueryOptions(["test"], serverFnWithArgs, { value: "" });
refetchedQueryOptions(["test"], serverFnWithoutArgs);
// Error: Expected 3 arguments, but got 2. // wrong argument type
// @ts-expect-error
refetchedQueryOptions(["test"], serverFnWithArgs, 123);

// need an argument
// @ts-expect-error
refetchedQueryOptions(["test"], serverFnWithArgs);
```

We have one problem. It seems we need to pass an argument for the query function which… doesn’t take any parameters. It makes sense: `refetchedQueryOptions` does indeed define an `arg` parameter, which needs to be passed. I’ll be quick to note that simply passing `undefined` for that arg works perfectly.

```ts
refetchedQueryOptions(["test"], serverFnWithoutArgs, undefined);
```

This solves all our problems; our test code now has zero errors. For the vast, vast majority of apps, this will likely be fine. It’s entirely possible the work I’m about to show you to improve on this may not be worth the effort. *But*, going through that effort will likely teach us some neat things about TypeScript, and if we’re a special kind of strange, may even be fun.

---

## False Prophets

You might think making arg optional would solve all our problems. Unfortunately, when we do that, `arg` becomes optional *everywhere*, including places we want to require it

```ts
// need an argument
// FAILS - Unused '@ts-expect-error' directive.
// @ts-expect-error
refetchedQueryOptions(["test"], serverFnWithArgs);
```

If you’re an advanced TypeScript user you might think a conditional type is what we need. Detect the inferred arg type (what’s in the `data` arg), and if it’s not undefined, require it, but if it *is* undefined, then *don’t* require it. Unfortunately, there’s not really an easy way to represent “pass nothing” as the result of a conditional type. I’ve tried, and I was never able to get things fully working. I may have been missing something (feel free to drop a comment if you can figure it out), but even if there’s a trick to make it work, there’s a much more straightforward, idiomatic solution.

We essentially want different function signatures in different circumstances: we want an arg when the server function we pass in takes an arg, and we want no arg when the server function we pass in takes no arg. Different function signatures is usually referred to as function overloading in computer science, and TypeScript supports this.

### Function Overloading in TypeScript

As the simplest possible example, imagine you wanted to write an `add` function with two versions: one that takes in two numbers, and adds them; and one that takes in two strings, and concatenates them. Conceptually, we want this:

```ts
function add(x: number, y: number): number {
  return x + y;
}

function add(x: string, y: string): string {
  return x + y;
}
```

But that’s not valid; since JavaScript is a dynamically typed language, you can’t have more than one function of the same name, in the same scope. *TypeScript* does, however, allow us to overload functions, but the mechanics are a bit different. Here’s how we do this:

```ts
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: string | number, y: string | number): string | number {
  if (typeof x === "string" && typeof y === "string") {
    return x + y;
  }
  if (typeof x === "number" && typeof y === "number") {
    return x + y;
  }
  throw new Error("Invalid arguments");
}
```

We start with the function *definitions*. This one:

```ts
function add(x: number, y: number): number;
```

And this one:

```ts
function add(x: string, y: string): string;
```

These define the actual API of our function. We declare that this function can take in two numbers and return a number, or two strings and return a string.

Then we have the actual implementation of the function.

```ts
function add(x: string | number, y: string | number): string | number {
  if (typeof x === "string" && typeof y === "string") {
    return x + y;
  }
  if (typeof x === "number" && typeof y === "number") {
    return x + y;
  }
  throw new Error("Invalid arguments");
}
```

The inputs and return types all have to be a union of every definition. In other words, the actual implementation has to accept any of the definitions.

And now, when we try to call this function, we only see the definitions available to us.

![Code snippet showing TypeScript function definition for adding two numbers, with parameters x and y typed as number.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/img1.png?resize=674%2C174&ssl=1)

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/02/img2.png?resize=678%2C188&ssl=1)

The implementation is a little weird. You might wonder why we need

```ts
throw new Error("Invalid arguments");
```

The only valid invocations for this function are two strings or two numbers; that’s all TypeScript will allow. So why does TypeScript require us to have that throw at the end? If both arguments are not strings, and neither argument is a number, the function will never be allowed. Unfortunately, TypeScript isn’t quite smart enough to understand that. The function implementation has x and y both as `string | number` so as far as it’s concerned, `x` could be a string and `y` could be a number. Understanding that this combination is disallowed by the prior overload definitions isn’t currently within TypeScript’s capabilities.

---

## Building Our Solution

So we want to overload `refetchedQueryOptions` twice: once for a server function that takes in an argument, and once for a server function that takes no arguments. How do we define either case? This is where things get fun.

To start, let’s define a type representing any async function

```ts
type AnyAsyncFn = (...args: any[]) => Promise<any>;
```

This seems like a waste of time, but it’ll save us some typing and add a lot of clarity soon.

Let’s define a type that takes in an async function and just strips out the argument type. A conditional type is perfect for this. We saw something similar before with a conditional type that strips out the type of an array’s elements.

```ts
type ArrayOf<T extends Array<any>> = T extends Array<infer U> ? U : never;
```

We check that T extends an array, and then we plopped `infer U` right into the generic slot the Array type already has. Let’s do something similar to get the parameter type of an async function.

```ts
type ServerFnArgs<TFn extends AnyAsyncFn> = Parameters<TFn>[0] extends { data: infer TResult } ? TResult : undefined;
```

There’s a `Parameters<T>` type that can pluck parameters out of a function type. We grab the zero’th parameter (functions can have multiple parameters, but server functions only have one). On that single, 0th parameter, look for a `data` property, and if present, infer that. Otherwise return undefined.

From there we can start to ask questions about our types.

```ts
type ServerFnHasArgs<TFn extends AnyAsyncFn> = ServerFnArgs<TFn> extends undefined ? false : true;
```

And we can then make other type helpers.

```ts
type ServerFnWithArgs<TFn extends AnyAsyncFn> = ServerFnHasArgs<TFn> extends true ? TFn : never;
type ServerFnWithoutArgs<TFn extends AnyAsyncFn> = ServerFnHasArgs<TFn> extends false ? TFn : never;
```

We’ve built some helper types that take a function type in, and tests whether that function has, or does not have server function arguments.

One major bummer of TypeScript overloading is that we can’t rely on inferred return types, so we’ll have to define our return type manually.

```ts
type RefetchQueryOptions<T> = {
  queryKey: QueryKey;
  queryFn: (_?: any) => Promise<T>;
  meta: any;
};
```

And with that, we should be ready to define our overload signatures.

```ts
export function refetchedQueryOptions<TFn extends AnyAsyncFn>(
  queryKey: QueryKey,
  serverFn: ServerFnWithArgs<TFn>,
  arg: Parameters<TFn>[0]["data"],
): RefetchQueryOptions<Awaited<ReturnType<TFn>>>;
export function refetchedQueryOptions<TFn extends AnyAsyncFn>(
  queryKey: QueryKey,
  serverFn: ServerFnWithoutArgs<TFn>,
): RefetchQueryOptions<Awaited<ReturnType<TFn>>>;
```

One version for a Server Function that takes an argument, as well as the argument, and a version for a Server Function that takes no argument, with no such argument passed.

The full implementation:

```ts
export function refetchedQueryOptions<TFn extends AnyAsyncFn>(
  queryKey: QueryKey,
  serverFn: ServerFnWithoutArgs<TFn> | ServerFnWithArgs<TFn>,
  arg?: Parameters<TFn>[0]["data"],
): RefetchQueryOptions<Awaited<ReturnType<TFn>>> {
  const queryKeyToUse = [...queryKey];
  if (arg != null) {
    queryKeyToUse.push(arg);
  }
  return {
    queryKey: queryKeyToUse,
    queryFn: async () => {
      return serverFn({ data: arg });
    },
    meta: {
      __revalidate: {
        serverFn,
        arg,
      },
    },
  };
}
```

And that’s that.

Generics, combined with conditional types, can make for an incredibly powerful combination. When you look at things the right way, you can ask very useful questions about your types that allow you to build the precise API you want.

---

## Concluding Thoughts

I hope this deep dive into a niche use case has taught you at least something useful about TypeScript. Even if you never need to solve this particular problem — and let’s face it, you probably won’t — these tools and skills are widely applicable.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fun with TypeScript Generics",
  "desc": "Generics, combined with conditional types can make for an incredibly powerful combination. When you look at things the right way, you can ask very useful questions about your types that allow you to build the precise API you want.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/fun-with-typescript-generics.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
