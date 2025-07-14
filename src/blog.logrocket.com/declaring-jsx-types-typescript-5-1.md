---
lang: en-US
title: "Declaring JSX types in TypeScript 5.1"
description: "Article(s) > Declaring JSX types in TypeScript 5.1"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - ts
  - typesccript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Declaring JSX types in TypeScript 5.1"
    - property: og:description
      content: "Declaring JSX types in TypeScript 5.1"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/declaring-jsx-types-typescript-5-1.html
prev: /programming/ts/articles/README.md
date: 2023-06-26
isOriginal: false
author:
  - name: John Reilly
    url : https://blog.logrocket.com/author/johnreilly/
cover: /assets/image/blog.logrocket.com/declaring-jsx-types-typescript-5-1/banner.png
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

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Declaring JSX types in TypeScript 5.1"
  desc="We discuss a new TypeScript 5.1 feature: decoupled type-checking between JSX elements and JSX tag types. Learn what it is and why it matters."
  url="https://blog.logrocket.com/declaring-jsx-types-typescript-5-1"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/declaring-jsx-types-typescript-5-1/banner.png"/>

A new feature, described as “[<FontIcon icon="iconfont icon-typescript"/>decoupled type-checking between JSX elements and JSX tag types](https://devblogs.microsoft.com/typescript/announcing-typescript-5-1-beta/#decoupled-type-checking-between-jsx-elements-and-jsx-tag-types)”, arrives with TypeScript 5.1. This feature enables libraries to control what types are used for JSX elements. In this article, I’ll discuss why this matters and how this new feature works.

![Declaring JSX Types TypeScript](/assets/image/blog.logrocket.com/declaring-jsx-types-typescript-5-1/banner.png)

---

## Working with JSX in TypeScript

Until version 5.1, TypeScript did an imperfect job of representing what is possible with JSX. The JSX decoupled type-checking feature allows libraries to do a better job of that, by handing them control of JSX type definitions.

It’s probably worth noting that JSX decoupled type-checking is a complicated feature. If you don’t understand it, that’s okay! I’ll confess that as the author of this post, I had to work quite hard to fully comprehend it.

This is a low-level feature that is only likely to be used by library and type definition authors. It’s a primitive that will unlock possibilities for those who are writing JSX without requiring any extra action on their part. In some cases, people writing JSX may not even notice that things have changed for the better.

---

## Understanding the problem

TypeScript creates a type system that sits on top of JavaScript and provides static typing capabilities. As TypeScript has grown more sophisticated, it’s been able to get closer and closer to representing the full range of possibilities that JavaScript offers.

An example of this evolution was the introduction of [**union types**](/blog.logrocket.com/understanding-discriminated-union-intersection-types-typescript.md). If you remember the early days of TypeScript, you’ll recall a time before union types. Back then, we had to use `any` to represent a value that could be one of a number of types. Union types solved this imperfect representation of JavaScript:

```ts
function printStringOrNumber(stringOrNumber: any) { // [!code --]
function printStringOrNumber(stringOrNumber: string | number) { // [!code ++]
    console.log(stringOrNumber);
}
```

The problem we’re looking at in this article is in the same vein, but it specifically applies to JSX — which is widely used in libraries, like React. Prior to v5.1, TypeScript lacked the ability to accurately represent all JSX possibilities. This is because the type of JSX element returned from a function component was always `JSX.Element | null`. This is a type that is defined in the TypeScript compiler; it cannot be changed by a library author.

Let’s take a look at a simple example to see how this plays out. Say we have a function component that returns a number. We might write something like this:

```tsx
function ComponentThatReturnsANumber() {
  return 42;
}

<ComponentThatReturnsANumber />;
```

The above code is legitimate JSX, but it is not legitimate TypeScript. As a result, the TypeScript compiler will complain:

![TypeScript Error Message Return Type Number Invalid JSX Element](/assets/image/blog.logrocket.com/declaring-jsx-types-typescript-5-1/typescript-playground-error-message-return-type-number-invalid-jsx-element.png)

You can view this in the [<FontIcon icon="iconfont icon-typescript"/>TypeScript Playground](https://typescriptlang.org/play?#code/JYWwDg9gTgLgBAJQKYEMDG8BmUIjgIilQ3wG4AoczAVwDsNgJa4BhXSWpWmAFQAsUMZDGpRaAZwCCAOWogARkigAKAJRwA3uThwiIsXAAsAJgoBfSgB424Jl14ChSfRJlzFUOAHoAfOSA). The error is thrown because, according to TypeScript, function components that return anything except`JSX.Element | null` are not allowed as element types in React.

However, in React, function components can return a `ReactNode`. This type includes `number | string | Iterable<ReactNode> | undefined` and will likely also [include (<FontIcon icon="iconfont icon-github"/>`reactjs/rfcs`)](https://github.com/reactjs/rfcs/pull/229) `Promise<ReactNode>(` in the future.

As an aside, a return value of `number` would be perfectly fine in class components since the restrictions are different there. I spoke to [Sebastian Silbermann (<FontIcon icon="fa-brands fa-x-twitter"/>`sebsilbermann`)](https://x.com/sebsilbermann), who wrote the PR requesting the new feature, about this and he said:

::: info Sebastian Silbermann (<FontIcon icon="fa-brands fa-x-twitter"/>`sebsilbermann`)

> “An interesting note is that before function components we did have full control. Due to `ElementClass`, class components already could return `ReactNode` at the type level. It was just function components that were missing full control (or any other component types Suspense or Profiler).”

<SiteInfo
  name="Sebastian Silbermann (@sebsilbermann) / X"
  desc=""
  url="https://x.com/sebsilbermann/"
  logo="https://abs.twimg.com/favicons/twitter.3.ico"
  preview="https://abs.twimg.com/responsive-web/client-web/icon-ios.77d25eba.png"/>

:::

So here’s the crux of the problem: it is not possible to represent in TypeScript today what is actually possible in React (or in other JSX libraries). Furthermore, what’s returned from JSX may change over time, and TypeScript needs to be able to represent that.

---

## The arrival of `JSX.ElementType`

In an effort to address the issue described in the previous section, Sebastian opened a pull request to TypeScript: “[RFC: Consult new JSX.ElementType for valid JSX element types (<FontIcon icon="iconfont icon-github"/>`microsoft/TypeScript`)](https://github.com/microsoft/TypeScript/pull/51328)“. In that PR, Sebastian explained the issue and proposed a solution — introducing a new type, `JSX.ElementType`.

Here’s an illustration that helps explain what the `JSX.ElementType` is compared to a JSX element:

```jsx
// <Component />
//  ^^^^^^^^^    JSX element type
// ^^^^^^^^^^^^^ JSX element
```

The significance of `JSX.ElementType` is that it is used to represent a JSX element’s type and to allow library authors to control what types are used for JSX elements. This control was not previously available.

The TypeScript pull request was merged, so Sebastian (who helps maintain the React type definitions) exercised new powers in [this pull request to the DefinitelyTyped repository for the React type definitions (<FontIcon icon="iconfont icon-github"/>`DefinitelyTyped/DefinitelyTyped`)](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/65135). At the time of writing, this pull request is still open, but once merged and shipped the React community we will feel its benefits.

The changes associated with this new feature are subtle; you can see in this pull request that `ReactElement | null` is generally replaced with `ReactNode`:

```ts
    type JSXElementConstructor<P> =
     | ((props: P) => ReactElement<any, any> | null) // [!code --]
         | ((props: P) => ReactNode) // [!code ++]
         | (new (props: P) => Component<any, any>);
```

Remember how we mentioned earlier that function components couldn’t return numbers? Let’s look at the updated tests in the PR:

```ts
    const ReturnNumber = () => 0xeac1;
+   const FCNumber: React.FC = ReturnNumber; // [!code ++]
    class RenderNumber extends React.Component {
        render() {
          return 0xeac1;
        }
    }
```

With this change, React components that return numbers are now valid JSX elements. This is because `JSX.ElementType` is now `ReactNode`, which includes numbers. New things are possible as a consequence of this change. The library and type definition author now has more control over what is possible in JSX.

To quote Sebastian again, “Now we have control over any potential component type.”

Let’s take another look at our component that produces a number:

```tsx
function ComponentThatReturnsANumber() {
  return 42;
}

<ComponentThatReturnsANumber />;
```

With Sebastian’s changes, this becomes valid TypeScript. And as React and other JSX libraries evolve, TypeScript compatibility will evolve as well.

---

## Summary

The TL;DR of this post is that TypeScript will better allow for the modeling of JSX in TypeScript 5.1. I’m indebted to [Sebastian Silbermann (<FontIcon icon="iconfont icon-github"/>`eps1lon`)](https://github.com/eps1lon) and [Daniel Rosenwasser (<FontIcon icon="iconfont icon-github"/>`DanielRosenwasser`)](https://github.com/DanielRosenwasser) for their explanations of the decoupled type-checking between JSX elements and JSX tag types feature.

A special thanks to Sebastian for implementing this feature and for reviewing this article. I hope this post helps improve your understanding of this new TypeScript feature.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Declaring JSX types in TypeScript 5.1",
  "desc": "We discuss a new TypeScript 5.1 feature: decoupled type-checking between JSX elements and JSX tag types. Learn what it is and why it matters.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/declaring-jsx-types-typescript-5-1.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
