---
lang: en-US
title: "React Context for Beginners – The Complete Guide (2021)"
description: "Article(s) > React Context for Beginners – The Complete Guide (2021)"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > React Context for Beginners – The Complete Guide (2021)"
    - property: og:description
      content: "React Context for Beginners – The Complete Guide (2021)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-context-for-beginners.html
prev: /programming/js-react/articles/README.md
date: 2021-07-22
isOriginal: false
author: Reed
cover: https://freecodecamp.org/news/content/images/2021/07/react-context-for-beginners.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="React Context for Beginners – The Complete Guide (2021)"
  desc="React context is an essential tool for every React developer to know. It lets you easily share state in your applications. In this comprehensive guide, we will cover what React context is, how to use it, when and when not to use context, and lots mor..."
  url="https://freecodecamp.org/news/react-context-for-beginners"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2021/07/react-context-for-beginners.png"/>

React context is an essential tool for every React developer to know. It lets you easily share state in your applications.

In this comprehensive guide, we will cover what React context is, how to use it, when and when not to use context, and lots more.

Even if you've never worked with React context before, you're in the right place. You will learn everything you need to know with simple, step-by-step examples.

Let's get started!

---

## What is React context?

React context allows us to pass down and use (consume) data in whatever component we need in our React app without using props.

*In other words, React context allows us to share data (state) across our components more easily.*

---

## When should you use React context?

React context is great when you are passing data that can be used in any component in your application.

**These types of data include:**

- Theme data (like dark or light mode)
- User data (the currently authenticated user)
- Location-specific data (like user language or locale)

Data should be placed on React context that does not need to be updated often.

Why? Because context was not made as an entire state management system. It was made to make consuming data easier.

*You can think of React context as the equivalent of global variables for our React components.*

---

## What problems does React context solve?

React context helps us avoid the problem of props drilling.

**Props drilling** is a term to describe when you pass props down multiple levels to a nested component, through components that don't need it.

Here is an example of props drilling. In this application, we have access to theme data that we want to pass as a prop to all of our app's components.

As you can see, however, the direct children of `App`, such as `Header`, also have to pass the theme data down using props.

```jsx
export default function App({ theme }) {
  return (
    <>
      <Header theme={theme} />
      <Main theme={theme} />
      <Sidebar theme={theme} />
      <Footer theme={theme} />
    </>
  );
}

function Header({ theme }) {
  return (
    <>
      <User theme={theme} />
      <Login theme={theme} />
      <Menu theme={theme} />
    </>
  );
}
```

*What is the issue with this example?*

The issue is that we are drilling the `theme` prop through multiple components that don't immediately need it.

The `Header` component doesn't need `theme` other than to pass it down to its child component. In other words, it would be better for `User` , `Login` and `Menu` to consume the `theme` data directly.

This is the benefit of React context – we can bypass using props entirely and therefore avoid the issue of props drilling.

---

## How do I use React context?

Context is an API that is built into React, starting from React version 16. This means that we can create and use context directly by importing React in any React project.

**There are four steps to using React context:**

1. Create context using the `createContext` method.
2. Take your created context and wrap the context provider around your component tree.
3. Put any value you like on your context provider using the `value` prop.
4. Read that value within any component by using the context consumer.

*Does all this sound confusing?* It's simpler than you think.

Let's take a look at a very basic example. In our `App`, let's pass down our own name using Context and read it in a nested component: `User`.

```jsx
import React from 'react';

export const UserContext = React.createContext();

export default function App() {
  return (
    <UserContext.Provider value="Reed">
      <User />
    </UserContext.Provider>
  )
}

function User() {
  return (
    <UserContext.Consumer>
      {value => <h1>{value}</h1>} 
      {/* prints: Reed */}
    </UserContext.Consumer>
  )
}
```

Let's break down what we are doing, step-by-step:

1. Above our `App` component, we are creating context with `React.createContext()` and putting the result in a variable, `UserContext`. In almost every case, you will want to export it as we are doing here because your component will be in another file. Note that we can pass an initial value to our `value` prop when we call `React.createContext()`.
2. In our `App` component, we are using `UserContext`. Specifically `UserContext.Provider`. The created context is an object with two properties: `Provider` and `Consumer`, both of which are components. To pass our value down to every component in our App, we wrap our Provider component around it (in this case, `User`).
3. On `UserContext.Provider`, we put the value that we want to pass down our entire component tree. We set that equal to the `value` prop to do so. In this case, it is our name (here, Reed).
4. In `User`, or wherever we want to consume (or use) what was provided on our context, we use the consumer component: `UserContext.Consumer`. To use our passed down value, we use what is called the **render props pattern**. It is just a function that the consumer component gives us as a prop. And in the return of that function, we can return and use `value`.

---

## What is the useContext hook?

Looking at the example above, the render props pattern for consuming context may look a bit strange to you.

Another way of consuming context became available in React 16.8 with the arrival of React hooks. We can now consume context with the **useContext hook**.

Instead of using render props, we can pass the entire context object to `React.useContext()` to consume context at the top of our component.

Here is the example above using the useContext hook:

```jsx
import React from 'react';

export const UserContext = React.createContext();

export default function App() {
  return (
    <UserContext.Provider value="Reed">
      <User />
    </UserContext.Provider>
  )
}

function User() {
  const value = React.useContext(UserContext);  

  return <h1>{value}</h1>;
}
```

*The benefit of the `useContext` hook is that it makes our components more concise and allows us to create our own custom hooks.*

You can either use the consumer component directly or the `useContext` hook, depending on which pattern you prefer.

---

## You may not need context

The mistake many developers make is reaching for context when once they have to pass props down several levels to a component.

Here is an application with a nested `Avatar` component that requires two props `username` and `avatarSrc` from the `App` component.

```js
export default function App({ user }) {
  const { username, avatarSrc } = user;

  return (
    <main>
      <Navbar username={username} avatarSrc={avatarSrc} />
    </main>
  );
}

function Navbar({ username, avatarSrc }) {
  return (
    <nav>
      <Avatar username={username} avatarSrc={avatarSrc} />
    </nav>
  );
}

function Avatar({ username, avatarSrc }) {
  return <img src={avatarSrc} alt={username} />;
}
```

If possible, we want to avoid passing multiple props through components that don't need it.

*What can we do?*

Instead of immediately resorting to context because we are prop drilling, we should better compose our components.

Since only the top most component, `App`, needs to know about the `Avatar` component, we can create it directly within `App`.

This allows us to pass down a single prop, `avatar`, instead of two.

```jsx
export default function App({ user }) {
  const { username, avatarSrc } = user;

  const avatar = <img src={avatarSrc} alt={username} />;

  return (
    <main>
      <Navbar avatar={avatar} />
    </main>
  );
}

function Navbar({ avatar }) {
  return <nav>{avatar}</nav>;
}
```

::: important In short

don't reach for context right away. See if you can better organize your components to avoid prop drilling.

:::

---

## Does React context replace Redux?

Yes and no.

For many React beginners, Redux is a way of more easily passing around data. This is because Redux comes with React context itself.

However, if you are not also *updating* state, but merely passing it down your component tree, you do not need a global state management library like Redux.

---

## React context caveats

*Why it is not possible to update the value that React context passes down?*

While it is possible to combine React context with a hook like useReducer and create a makeshift state management library without any third-party library, it is generally not recommended for performance reasons.

The issue with this approach lies in the way that React context triggers a re-render.

If you are passing down an object on your React context provider and any property on it updates, what happens? *Any component which consumes that context will re-render.*

This may not be a performance issue in smaller apps with few state values that are not updated very often (such as theme data). But it is a problem if you will be performing many state updates in an application with a lot of components in your component tree.

---

## Conclusion

I hope this guide gave you a better understanding of how to use React context from front to back.

If you want an even more in-depth grasp of how to use React context to build amazing React projects, check out [<FontIcon icon="fas fa-globe"/>The React Bootcamp](https://thereactbootcamp.com).

---

## Become a Professional React Developer

React is hard. You shouldn't have to figure it out yourself.

I've put everything I know about React into a single course, to help you reach your goals in record time:

[**Introducing: The React Bootcamp**](https://thereactbootcamp.com)

**It’s the one course I wish I had when I started learning React.**

Click below to try the React Bootcamp for yourself:

[![Click to join the React Bootcamp](https://reedbarger.nyc3.digitaloceanspaces.com/reactbootcamp/react-bootcamp-cta-alt.png)](https://thereactbootcamp.com)

<!-- START: ARTICLE CARD -->
```component VPCard
{
  "title": "React Context for Beginners – The Complete Guide (2021)",
  "desc": "React context is an essential tool for every React developer to know. It lets you easily share state in your applications. In this comprehensive guide, we will cover what React context is, how to use it, when and when not to use context, and lots mor...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-context-for-beginners.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
