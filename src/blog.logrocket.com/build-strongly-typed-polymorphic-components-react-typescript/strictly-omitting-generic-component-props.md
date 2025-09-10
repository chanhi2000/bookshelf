---
lang: en-US
title: "Strictly omitting generic component props"
description: "Article(s) > (8/10) Build strongly typed polymorphic components with React and TypeScript" 
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (8/10) Build strongly typed polymorphic components with React and TypeScript"
    - property: og:description
      content: "Strictly omitting generic component props"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript//strictly-omitting-generic-component-props.html
date: 2022-05-25
isOriginal: false
author:
  - name: Ohans Emmanuel
    url : https://blog.logrocket.com/author/ohansemmanuel/
cover: /assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Build strongly typed polymorphic components with React and TypeScript",
  "desc": "Learn how to build strongly typed polymorphic React components with TypeScript, using familiar Chakra UI and MUI component props as guides.",
  "link": "/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/README.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Build strongly typed polymorphic components with React and TypeScript"
  desc="Learn how to build strongly typed polymorphic React components with TypeScript, using familiar Chakra UI and MUI component props as guides."
  url="https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript#strictly-omitting-generic-component-props"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png"/>

There’s just one thing I’m not particularly comfortable with: `color` turns out to also be a valid attribute for numerous HTML tags, as was the case pre-HTML5. So, if we removed `color` from our type definition, it’ll be accepted as any valid string.

See below:

```tsx
type TextProps<C extends React.ElementType> = {
  as?: C;
  // remove color from the definition here
};
```

![Removing The Color Type Definition](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/removing-color-type-definition.png)

Now, if you go ahead to use `Text` as before, it’s equally valid:

```tsx
<Text color="violet">Hello world</Text>
```

The only difference here is how it is typed. `color` is now represented by the following definition:

```tsx
color?: string | undefined
```

![The Default Color Type](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/default-color-type.png)

Again, this is NOT a definition we wrote in our types!

This is a default HTML typing, where `color` is a valid attribute for most HTML elements. See [<VPIcon icon="fa-brands fa-stack-overflow"/>this Stack Overflow question](https://stackoverflow.com/questions/67142430/why-color-appears-as-html-attribute-on-a-div) for some more context.

---

## Two potential solutions

Now, there are two ways to go here. The first one is to keep our initial solution, where we explicitly declared the `color` prop:

```tsx
type TextProps<C extends React.ElementType> = {
  as?: C;
  color?: Rainbow | "black"; // 👈 look here
};
```

The second option arguably provides some more type safety. To achieve this, you must realize where the previous default `color` definition came from: the `React.ComponentPropsWithoutRef<C>`. This is what adds other props based on what the type of `as` is.

So, with this information, we can explicitly remove any definition that exists in our component types from `React.ComponentPropsWithoutRef<C>`.

This can be tough to understand before you see it in action, so let’s take it step by step.

`React.ComponentPropsWithoutRef<C>`, as stated earlier, contains every other valid prop based on the type of `as`, e.g., `href`, `color`, etc., where these types have all of their own definitions, e.g., `color?: string | undefined`, etc.:

![The `ComponentPropsWithoutRef` Type](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/componentpropswithoutref-type.png)

It is possible that some values that exist in `React.ComponentPropsWithoutRef<C>` also exist in our component props type definition. In our case, `color` exists in both!

![`ComponentPropsWithoutRef` And TextProps](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/componentpropswithoutref-and-textprops.png)

Instead of relying on our `color` definition to override what’s coming from `React.ComponentPropsWithoutRef<C>`, we will explicitly remove any type that also exists in our component types definition.

![Removing existing props from `ComponentPropsWithoutRef`](https://i.imgur.com/Vd2YT3K.png)

So, if any type exists in our component types definition, we will explicitly remove those types from `React.ComponentPropsWithoutRef<C>`.

---

## Removing types from `React.ComponentPropsWithoutRef<C>`

Here’s what we had before:

```tsx
type Props <C extends React.ElementType> = 
React.PropsWithChildren<TextProps<C>> & 
React.ComponentPropsWithoutRef<C>
```

Instead of having an intersection type where we add everything that comes from `React.ComponentPropsWithoutRef<C>`, we will be more selective. We will use the `Omit` and `keyof` TypeScript utility types to perform some TypeScript magic.

Take a look:

```tsx
// before 
type Props <C extends React.ElementType> = 
React.PropsWithChildren<TextProps<C>> & 
React.ComponentPropsWithoutRef<C>

// after
type Props <C extends React.ElementType> = 
React.PropsWithChildren<TextProps<C>> &   
Omit<React.ComponentPropsWithoutRef<C>, keyof TextProps<C>>;
```

This is the important bit:

```tsx
Omit<React.ComponentPropsWithoutRef<C>, keyof TextProps<C>>;
```

`Omit` takes in two generics. The first is an object type, and the second is a union of types you’d like to “omit” from the object type.

Here’s my favorite example. Consider a `Vowel` object type as follows:

```tsx
type Vowels = {
  a: 'a',
  e: 'e',
  i: 'i',
  o: 'o',
  u: 'u'
}
```

This is an object type of key and value. Let’s say that I wanted to derive a new type from `Vowels` called `VowelsInOhans`.

Well, I do know that the name `Ohans` contains two vowels, `o` and `a`. Instead of manually declaring these:

```tsx
type VowelsInOhans = {
  a: 'a',
  o: 'o'
}
```

I can go ahead to leverage `Omit` as follows:

```tsx
type VowelsInOhans = Omit<Vowels, 'e' | 'i' | 'u'>
```

![The VowelsInOhans Type Using Omit](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/vowelsinohans.png)

`Omit` will “omit” the `e`, `i` and `u` keys from the object type `Vowels`.

On the other hand, [**TypeScript’s `keyof` operator**](/blog.logrocket.com/how-to-use-keyof-operator-typescript/) works as you would imagine. Think of `Object.keys` in JavaScript: given an `object` type, `keyof` will return a union type of the keys of the object.

Phew! That’s a mouthful. Here’s an example:

```tsx
type Vowels = {
  a: 'a',
  e: 'e',
  i: 'i',
  o: 'o',
  u: 'u'
}

type Vowel = keyof Vowels 
```

Now, `Vowel` will be a union type of the keys of `Vowels`, i.e.:

```jsx
type Vowel = 'a' | 'e' | 'i' | 'o' | 'u'
```

If you put these together and take a second look at our solution, it’ll all come together nicely:

```jsx
Omit<React.ComponentPropsWithoutRef<C>, keyof TextProps<C>>;
```

`keyof TextProps<C>` returns a union type of the keys of our component props. This is in turn passed to `Omit` to omit them from `React.ComponentPropsWithoutRef<C>`.

Sweet! 🕺

To finish, let’s go ahead and actually pass the `color` prop down to the rendered element:

```jsx
export const Text = <C extends React.ElementType = "span">({
  as,
  color, // 👈 look here
  children,
  ...restProps
}: Props<C>) => {
  const Component = as || "span";

  // 👇 compose an inline style object
  const style = color ? { style: { color } } : {};

  // 👇 pass the inline style to the rendered element
  return (
    <Component {...restProps} {...style}>
      {children}
    </Component>
  );
};
```
