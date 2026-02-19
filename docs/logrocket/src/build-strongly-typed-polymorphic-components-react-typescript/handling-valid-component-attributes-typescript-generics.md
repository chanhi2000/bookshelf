---
lang: en-US
title: "Handling valid component attributes with TypeScript generics"
description: "Article(s) > (5/10) Build strongly typed polymorphic components with React and TypeScript" 
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
      content: "Article(s) > (5/10) Build strongly typed polymorphic components with React and TypeScript"
    - property: og:description
      content: "Handling valid component attributes with TypeScript generics"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript//handling-valid-component-attributes-typescript-generics.html
date: 2022-05-25
isOriginal: false
author:
  - name: Ohans Emmanuel
    url: https://blog.logrocket.com/author/ohansemmanuel/
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
  url="https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript#handling-valid-component-attributes-typescript-generics"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/banner.png"/>

In solving this second use case, you’ll come to appreciate how powerful generics truly are. First, let’s understand what we’re trying to accomplish here.

Once we receive a generic `as` type, we want to make sure that the remaining props passed to our component are relevant, based on the `as` prop.

So, for example, if a user passed in an `as` prop of `img`, we’d want `href` to equally be a valid prop!

![As Prop And Href](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/as-prop-and-href.png)

To give you a sense of how we’d accomplish this, take a look at the current state of our solution:

```tsx
export const Text = <C extends React.ElementType>({
  as,
  children,
}: {
  as?: C;
  children: React.ReactNode;
}) => {
  const Component = as || "span";

  return <Component>{children}</Component>;
};
```

The prop of this component is now represented by the object type:

```tsx
{
  as?: C;
  children: React.ReactNode;
}
```

In pseudocode, what we’d like would be the following:

```tsx
{
  as?: C;
  children: React.ReactNode;
} & {
  ...otherValidPropsBasedOnTheValueOfAs
}
```

![Pseudocode](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/pseudocode.png)

This requirement is enough to leave one grasping at straws. We can’t possibly write a function that determines appropriate types based on the value of `as`, and it’s not smart to list out a union type manually.

Well, what if there was a provided type from `React` that acted as a “function” that’ll return valid element types based on what you pass it?

Before introducing the solution, let’s have a bit of a refactor. Let’s pull out the props of the component into a separate type:

```tsx
// 👇 See TextProps pulled out below 
type TextProps<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
} 

export const Text = <C extends React.ElementType>({
  as,
  children,
}: TextProps<C>) => { // 👈 see TextProps used 
  const Component = as || "span";
  return <Component>{children}</Component>;
};
```

What’s important here is to note how the generic is passed on to `TextProps<C>`. Similar to a function call in JavaScript — but with angle braces.

The magic wand here is to leverage the `React.ComponentPropsWithoutRef` type as shown below:

```tsx
type TextProps<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>; // 👈 look here 

export const Text = <C extends React.ElementType>({
  as,
  children,
}: TextProps<C>) => {
  const Component = as || "span";
  return <Component>{children}</Component>;
};
```

Note that we’re introducing an intersection here. Essentially, we’re saying, the type of `TextProps` is an object type containing `as`, `children`, and some other types represented by `React.ComponentPropsWithoutRef`.

![`React.ComponentPropsWithoutRef`](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/react-componentpropswithoutref.png)

If you read the code, it perhaps becomes apparent what’s going on here.

Based on the type of `as`, represented by the generic `C`, `React.componentPropsWithoutRef` will return valid component props that correlate with the string attribute passed to the `as` prop.

There’s one more significant point to note.

![Different `ComponentProps` Type Variants](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/different-componentprops-type-variants.png)

If you just started typing and rely on IntelliSense from your editor, you’d realize there are three variants of the `React.ComponentProps...` type:

1. `React.ComponentProps`
2. `React.ComponentPropsWithRef`
3. `React.ComponentPropsWithoutRef`

If you attempted to use the first, `ComponentProps`, you’d see a relevant note that reads:

> *Prefer `ComponentPropsWithRef`, if the `ref` is forwarded, or `ComponentPropsWithoutRef` when refs are not supported.*

![Note To Prefer ComponentPropsWithRef Or ComponentPropsWithoutRef](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/prefer-componentpropswithref-or-without.png)

This is precisely what we’ve done. For now, we will ignore the use case for supporting a `ref` prop and stick to `ComponentPropsWithoutRef`.

Now, let’s give the solution a try!

If you go ahead and use this component wrongly, e.g., passing a valid `as` prop with other incompatible props, you’ll get an error.

```tsx
<Text as="div" href="www.google.com">Hello Text world</Text>
```

A value of `div` is perfectly valid for the `as` prop, but a `div` should not have an `href` attribute.

That’s wrong, and rightly caught by TypeScript with the error: `Property 'href' does not exist on type ...`.

![Property Href Does Not Exist Error](/assets/image/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/property-href-doesnt-exist-error.png)

This is great! We’ve got an even better, more robust solution.

Finally, make sure to [**pass other props down**](/blog.logrocket.com/solving-prop-drilling-react-apps.md) to the rendered element:

```tsx
type TextProps<C extends React.ElementType> = {
  as?: C;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>; 

export const Text = <C extends React.ElementType>({
  as,
  children,
  ...restProps, // 👈 look here
}: TextProps<C>) => {
  const Component = as || "span";

  // see restProps passed 👇
  return <Component {...restProps}>{children}</Component>;
};
```

Let’s keep going.