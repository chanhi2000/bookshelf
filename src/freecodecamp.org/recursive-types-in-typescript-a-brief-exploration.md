---
lang: en-US
title: "Recursive Types in TypeScript: A Brief Exploration"
description: "Article(s) > Recursive Types in TypeScript: A Brief Exploration"
icon: iconfont icon-typescript
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
      content: "Article(s) > Recursive Types in TypeScript: A Brief Exploration"
    - property: og:description
      content: "Recursive Types in TypeScript: A Brief Exploration"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/recursive-types-in-typescript-a-brief-exploration.html
prev: /programming/ts/articles/README.md
date: 2025-05-08
isOriginal: false
author:
  - name: Eda Eren
    url : https://freecodecamp.org/news/author/edae/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746625684891/6a4e2dae-a7b2-415d-a65d-be47c5d73253.png
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
  name="Recursive Types in TypeScript: A Brief Exploration"
  desc="It is said that there are two different worlds in TypeScript that exist side by side: the type world and the value world. Consider this line of code: const firstName: string = 'Maynard'; While firstName and 'Maynard' live in the value world, string ..."
  url="https://freecodecamp.org/news/recursive-types-in-typescript-a-brief-exploration"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746625684891/6a4e2dae-a7b2-415d-a65d-be47c5d73253.png"/>

[<FontIcon icon="fas fa-globe"/>It is said](https://totaltypescript.com/books/total-typescript-essentials/the-weird-parts#the-type-and-value-worlds) that there are two different worlds in TypeScript that exist side by side: the type world and the value world.

Consider this line of code:

```ts
const firstName: string = 'Maynard';
```

While `firstName` and `'Maynard'` live in the value world, `string` belongs to the type world.

Or, consider the `typeof` operator that exists in both worlds.

Here it is in the value world:

```ts
console.log(typeof 42); // number
```

And, here it is in the type world, used for extracting the type of the function `increment`, which is then passed to [<FontIcon icon="iconfont icon-typescript"/>a utility type called `ReturnType`](https://typescriptlang.org/docs/handbook/utility-types.html#returntypetype):

```ts
function increment(n: number) {
  return n + 1;
}

type T = ReturnType<typeof increment>; // number
```

One of the wonders of the type world is the existence of recursive types - types that refer to themselves. They are somewhat similar to recursive functions that you might already be familiar with.

Here is a recursive function:

```ts
function addUpTo(n: number): number {
  if (n === 0) {
    return n;
  }

  return n + addUpTo(n - 1);
}
```

And, here is a recursive type:

```ts
type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JSONValue };
```

The function `addUpTo` calls itself, each time with a lesser value of `n`, gradually reaching the base case. (`n` is assumed to be a nonnegative number, otherwise, we'll have the `Maximum call stack size exceeded` error.)

The type `JSONValue` is a union type that has an *index signature* in one of its possible types (`{ [key: string]: JSONValue }`), and the value is a reference to itself.

To see it with an example, let's say we have an object `person` that has the properties `name`, `age`, and `friends`:

```ts
const person = {
  name: 'Alice',
  age: 25,
  friends: {
    0: {
      name: 'Bob',
      age: 23,
      friends: {
        // ...
      }
    },
    1: {
      name: 'Carol',
      age: 28,
      friends: {
        // ...
      }
    },
    // ...
  }
};
```

The value of `friends` is an object that has numbers as its properties, each having the value that looks just like the person we've just defined. So, we can create a `Person` type for it where the value of `friends` is an object that also has the value type `Person`:

```ts
type Person = {
  name: string;
  age: number;
  friends: {
    [key: number]: Person;
  };
};
```

::: note Note

In JavaScript, object keys are either strings or symbols. Even if we define `key` as a `number`, JavaScript eventually will coerce the object keys to strings.

:::

In this article, we'll not only take a look at what recursive types are in TypeScript, but we’ll also see how they can apply to recursive data structures and how they can be useful with two different use cases.

It can be an excellent tool in your toolkit for very specific circumstances such as when you need to extend a utility type or get the "inner" type of a multidimensional array.

Let's begin our exploration.

---

## Recursive Types for Trees and Linked Lists

Recursive types are probably best understood with a data structure like a tree:

![A binary tree where the root node has two children, left and right. The left child has left and right children, each of them also has left and right children of their own. The right child of the root node has a left child that has a left child of its own, and a right child that is a leaf node.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746454664280/0eed3e38-151e-403f-8d88-028519e23f3e.png)

For example, a node of a binary tree has at most two children, left and right. A child node, if it also has children, is the root of a subtree itself.

We can create a `TreeNode` type for a binary tree:

```ts
type TreeNode<T> = {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
};
```

It is a generic type, so the `value` can be any type that we pass to it. The `left` and `right` children can be either `TreeNode` themselves or `null`.

Let's say we have this binary tree:

![A binary tree that has the value 8 as its root node. It has a left child with the value 3 and a right child with the value 10. The left child has a left child node that has the value 1 and a right child node that has the value 6, which has a left child node with the value 4 and a right child node with the value 7. The right child of the root node that has the value 10 has a right child node with value 14, which has a left child node that has the value 13.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746456573014/d748d7fb-1893-44af-9e37-bffcfaffec5d.png)

We can represent it just like this, with the type of `TreeNode` that we've just defined:

```ts :collapsed-lines
const binaryTree: TreeNode<number> = {
  value: 8,
  left: {
    value: 3,
    left: {
      value: 1,
      left: null,
      right: null
    },
    right: {
      value: 6,
      left: {
        value: 4,
        left: null,
        right: null
      },
      right: {
        value: 7,
        left: null,
        right: null
      }
    }
  },
  right: {
    value: 10,
    left: null,
    right: {
      value: 14,
      left: {
        value: 13,
        left: null,
        right: null
      },
      right: null
    }
  }
};
```

Since this is a generic type, we’re passing to it the type `number` that’s used as the type of `value`.

Similarly, we can create a type for a linked list where each node has a `value` and a `next` property that either points to another node or `null`:

```ts
type LinkedList<T> = {
  value: T;
  next: LinkedList<T> | null;
};
```

So, if our linked list looks like this:

![A linked list where the head points to the node with the value 1, which points to the node with the value 2, which points to the node with the value 3 that points to null.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746456962646/9996894c-162a-4c71-b2b3-3c9369592551.jpeg)

We can represent it like this, with the type `LinkedList`:

```ts
const linkedList: LinkedList<number> = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null
    }
  }
};
```

::: note 

We used type aliases in the examples above, but we can also use an `interface` instead:

:::


```ts
interface TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

interface LinkedList<T> {
  value: T;
  next: LinkedList<T> | null;
}
```

---

## Recursion with Mapped and Conditional Types

Applying recursive types to values representing recursive data structures is a bit obvious and not too exciting, but we can explore other options where recursion can also be used, such as mapped and conditional types.

Mapped types are a convenient way to create a new type based on another one. We can, for example, create a new type using the keys of an object, where we *map* the keys to a different value type.

Let’s say we have a `colors` object that has color names and the corresponding hex values. The values are of `string` type, but let’s say we want to create an object type where the keys are the same, except that the type of the values should be `boolean`:

```ts
const colors = {
  aquamarine: '#7fffd4',
  black: '#000000',
  blueviolet: '#8a2be2',
  goldenrod: '#daa520',
  indigo: '#4b0082',
  lavender: '#e6e6fa',
  silver: '#c0c0c0'
};

type ColorsToBoolean<T> = {
  [K in keyof T]: boolean;
};

type Result = ColorsToBoolean<typeof colors>;
```

The `Result` type then will look like this:

![A screenshot of the code block that's defined above when it's hovered over the type `Result`. Keys are the same as the ones in the `colors` object, and all the values are `boolean`.](https://cdn.hashnode.com/res/hashnode/image/upload/v1746481133106/390515bd-4f98-4072-a8f8-94a3ef39cec4.png)

In order to create a *recursive* mapped type, however, we need a reference to the same type that we’re creating, like this:

```ts
type Recursive<T> = {
  [K in keyof T]: Recursive<T[K]>;
};
```

Before going further, let's also take a look at the conditional types, which look very similar to the conditional expressions that use [**the ternary operator**](/freecodecamp.org/javascript-ternary-operator-explained.md):

```ts
AType extends AnotherType ? ResultTypeIfTrue : ResultTypeIfFalse;
```

It has this familiar form:

```plaintext
condition ? resultIfTrue : resultIfFalse
```

Now, we can combine both mapped and conditional types to create a recursive mapped conditional type:

```ts
type Recursive<T> = {
  [K in keyof T]: T[K] extends number ? T[K] : Recursive<T[K]>;
};
```

We map the keys of the given object type to the same value type if it’s a `number`, otherwise, continue with the recursion.

---

## Use Cases for Recursive Types

### Use Case 1: `DeepPartial`

One use case of recursive types is extending the capabilities of the utility type `Partial`.

Let's say we have a type for an article, using an `interface` this time:

```ts
interface IArticle {
  title: string;
  description: string;
  url: string;
  author: {
    name: string;
    age: number;
  };
}
```

`Partial` makes all the properties of an object type that it's given optional.

But, if we try to do this:

```ts
const article: Partial<IArticle> = {
  title: 'Navigating the Mysteries',
  description:
    'As we walk our questions into a troubled future, storyteller and mythologist Martin Shaw invites us to subvert today’s voices of certainty and do the hard work of opening to mystery.',
  url: 'https://emergencemagazine.org/essay/navigating-the-mysteries',
  author: {
    name: 'Martin Shaw'
  }
};
```

We'll have an error: `Property 'age' is missing in type '{ name: string; }' but required in type '{ name: string; age: number; }'`. All the properties are optional as expected, except for `age` which is a property of the property `author`. So, `Partial` is not going to work for objects with more than one level of depth.

In our example, we don't want to pass in an `age` property for the `author`, so we need to find a way to make it work.

In fact, the recursive mapped conditional type that we've just defined above is a perfect use case for this. We can use recursion so that all the properties are optional, no matter their depth:

```ts
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
```

Now, if we try our example with `DeepPartial`, there are no errors, and the problem is resolved:

```ts
const article: DeepPartial<IArticle> = {
  title: 'Navigating the Mysteries',
  description:
    'As we walk our questions into a troubled future, storyteller and mythologist Martin Shaw invites us to subvert today’s voices of certainty and do the hard work of opening to mystery.',
  author: {
    name: 'Martin Shaw'
  }
};
```

### Use Case 2: `UnwrapArray`

Another use case we can take a look at is when we need to have the “inner“ type of a multidimensional array.

Consider this one:

```ts
type UnwrapArray<A> = A extends Array<infer T> ? UnwrapArray<T> : A;
```

We define an `UnwrapArray` generic type. If the type we pass to it is yet another array (`A extends Array`), then it's passed to `UnwrapArray` again until we reach a type that doesn't extend `Array`.

**Note** that we use the `infer` keyword to extract the type. `infer` is only used with conditional types when `extends` is used, so it's perfect for our purpose here.

Now, we can get the inner type:

```ts
type Result = UnwrapArray<string[][][]>; // string
```

Using the keyword `Array` will have the same result:

```ts
type Result = UnwrapArray<Array<Array<Array<string>>>>; // string
```

---

## Conclusion (and a Warning!)

The universe of recursive types in TypeScript is fascinating and very powerful. But, of course, with great power comes great responsibility. TypeScript's own documentation warns us:

::: note

Keep in mind that while these recursive types are powerful, they should be used responsibly and sparingly.

```component VPCard
{
  "title": "Documentation - TypeScript 4.1",
  "desc": "TypeScript 4.1 Release Notes",
  "link": "https://typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#recursive-conditional-types/",
  "logo": "https://typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae",
  "background": "rgba(68,118,192,0.2)"
}
```

:::

It’s not only that recursive types can result in longer time for type-checking, but with enough complexity, it can also result in a compile-time error. In fact, the documentation also tells us not to use them at all if possible.

So, was all this learning for nothing?

The answer depends on what you make of it. Recursion is a powerful concept that definitely has use cases in TypeScript as we've seen in this article, and if used responsibly, it can be an excellent tool.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Recursive Types in TypeScript: A Brief Exploration",
  "desc": "It is said that there are two different worlds in TypeScript that exist side by side: the type world and the value world. Consider this line of code: const firstName: string = 'Maynard'; While firstName and 'Maynard' live in the value world, string ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/recursive-types-in-typescript-a-brief-exploration.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
