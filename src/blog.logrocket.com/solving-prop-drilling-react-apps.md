---
lang: en-US
title: "A better way of solving prop drilling in React apps"
description: "Article(s) > A better way of solving prop drilling in React apps"
icon: fa-brands fa-react
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
      content: "Article(s) > A better way of solving prop drilling in React apps"
    - property: og:description
      content: "A better way of solving prop drilling in React apps"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/solving-prop-drilling-react-apps.html
prev: /programming/js-react/articles/README.md
date: 2022-01-14
isOriginal: false
author:
  - name: David Herbert
    url : https://blog.logrocket.com/author/davidherbert/
cover: /assets/image/blog.logrocket.com/solving-prop-drilling-react-apps/banner.png
---

# {{ $frontmatter.title }} 관련

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
  name="A better way of solving prop drilling in React apps"
  desc="In the spirit of ”using the platform,” learn how the React library provides a workaround for prop drilling without Redux or the Context API."
  url="https://blog.logrocket.com/solving-prop-drilling-react-apps"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/solving-prop-drilling-react-apps/banner.png"/>

Dealing with state management in React applications can be a tricky thing, especially when data needs to be passed from a root component down to deeply-nested components. We, as React developers, often tend to over-engineer our applications by relying too heavily on the Context API and Redux in situations that they aren’t actually needed. We reach out too quickly for these tools — even in basic situations that simply require passing state/data to deeply-nested components — all in an attempt to overcome prop drilling.

![A better way of solving prop drilling in React apps](/assets/image/blog.logrocket.com/solving-prop-drilling-react-apps/banner.png)

This is completely fine in some cases, but in others, it adds redundancy to our application. Every component that consumes or uses these providers is re-rendered whenever there is a state change.

Very few developers stop to look at the React library itself for solutions to some of its problems — or even consider the possibility of a better alternative to passing data down the component tree — and as a result, we fail to see past React’s surface definition of being a JavaScript library for building user interfaces.

But React itself is also a state management library, one that provides its own convenient solution to state management, especially for such a thing as passing data down to deeply-nested components. This article aims to provide you with a clear guide on how to go about doing just that — and showcases the benefits of more selectively relying on the Context API or Redux.

---

## What is prop drilling, and why is it a problem?

We can’t look at a solution to a problem without first looking at the problem itself. So, what exactly is prop drilling, and why is it a problem?

Prop drilling is the unofficial term for passing data through several nested children components, in a bid to deliver this data to a deeply-nested component. The problem with this approach is that most of the components through which this data is passed have no actual need for this data. They are simply used as mediums for transporting this data to its destination component.

This is where the term “drilling” comes in, as these components are forced to take in unrelated data and pass it to the next component, which in turn passes it, and so on, until it reaches its destination. This can cause major issues with component reusability and app performance, which we’ll explain later on.

For now, let’s look at an example set of circumstances that could lead to prop drilling.

---

## Building a deeply-nested app for prop drilling

Imagine for a second that we are building an app that welcomes a user by name when they log in. Below is the visual representation of the demo app we’ll be looking at.

![A visual diagram of our app's structure](/assets/image/blog.logrocket.com/solving-prop-drilling-react-apps/app-structure-visual.png)

We won’t be covering the styling to keep our code minimal; this is just to provide a solid idea of what our app would look like.

Now, let’s look at the component hierarchy to understand the relationship between the components.

![Diagram of our component hierarchy](/assets/image/blog.logrocket.com/solving-prop-drilling-react-apps/component-hierarchy-diagram.png)

As you can probably see now, the problem we have is that the `user` object that holds the user’s name is only available at the root component level (**App**), whereas the component rendering the welcome message is nested deep within our app (**Message**). This means we somehow have to pass this `user` object down to the component that renders the welcome message.

The blue arrows represent the actual `user` object prop as it’s drilled down from the root **App** component, through several nested components, to the actual **Message** component in need of it. It then finally renders the welcome message with the logged-in user’s name.

This is a typical case of prop drilling. This is where developers often resort to the Context API as a means of bypassing this supposed problem, without giving much thought to the potential problems created therein.

Now that we have a visual map of the project, let’s get our hands dirty with actual code.

```jsx title="App.jsx"
import { useState } from "react";

function App() {
  const [user, setUser] = useState({ name: "Steve" });
  return (
    <div>
      <Navbar />
      <MainPage user={user} />
    </div>
  );
}
export default App;

function Navbar() {
  return (
    <nav 
      style={{ background: "#10ADDE", color: "#fff" }}
    >
      Demo App
    </nav>
  );
}

function MainPage({ user }) {
  return (
    <div>
      <h3>Main Page</h3>
      <Content user={user} />
    </div>
  );
}

function Content({ user }) {
  return (
    <div>
      <Message user={user} />
    </div>
  );
}

function Message({ user }) {
  return <p>Welcome {user.name}</p>;
}
```

Notice that, rather than splitting our components into different files and then importing each individual component, we put them all in the same file as their own, individual function components. We can now use them without any external imports.

Our resulting output would be:

![Our basic demo app view](/assets/image/blog.logrocket.com/solving-prop-drilling-react-apps/basic-app-demo.png)

Now that we have a basic working app, let’s compare this solution to prop drilling by solving it once more, this time using the Context API.

---

## Solving prop drilling by using the Context API

For those unfamiliar with [<FontIcon icon="fa-brands fa-react"/>the Context API](https://reactjs.org/docs/context.html), we’ll start with a quick overview of what it does.

The Context API basically lets you broadcast your state/data to multiple components by wrapping them with a context provider. It then passes this state to the context provider using its value attribute. The children components can then tap into this provider using a context consumer or the `useContext` Hook when needed, and access the state provided by the context provider.

Let’s create a context and pass the `user` object to the context provider. We’ll then go ahead and wrap our desired components with the context provider, and access the state it holds inside the specific component that needs it.

```jsx :collapsed-lines title="App.jsx"
import "./App.css";
import { createContext, useContext } from "react";

//Creating a context
const userContext = createContext();

function App() {
  return (
    <div>
      <Navbar />
      <userContext.Provider value={{ user: "Steve" }}>
        <MainPage />
      </userContext.Provider>
    </div>
  );
}
export default App;

function Navbar() {
  return (
    <nav 
      style={{ background: "#10ADDE", color: "#fff" }}
    >
      Demo App
    </nav>
  );
}

function MainPage() {
  return (
    <div>
      <h3>Main Page</h3>
      <Content />
    </div>
  );
}

function Content() {
  return (
    <div>
      <Message />
    </div>
  );
}

function Message() {
  // Getting access to the state provided by the context provider wrapper
  const { user } = useContext(userContext);
  return <p>Welcome {user} :)</p>;
}
```

We start by importing a `createContext` Hook, which is used for creating a context, and a `useContext` Hook, which will extract the state provided by a context provider.

We then call the `createContext` Hook function, which returns a context object with an empty value. That is then stored in a variable called `userContext`.

Moving forward, we proceed to wrap the `MainPage` component with the `Context.Provider` and pass the `user` object to it, which provides it to every component nested within the `MainPage` component.

Lastly, we extract this user in the `Message` component nested within the `MainPage` component, using the `useContext` Hook and a bit of destructuring.

We have completely nullified the need to pass down the user prop through the intermediary components. As a result, we’ve solved the issue of prop drilling.

![The rendered output of our app remains the same when using the Context API](/assets/image/blog.logrocket.com/solving-prop-drilling-react-apps/rendered-output-context-api.png)

Our rendered output remains the same, but the code underneath is a bit leaner and cleaner.

So, why is this a problem?

---

## The two major drawbacks of relying heavily on the Context API

Although we have completely solved the issue of prop drilling by introducing the Context API into our application, it doesn’t come without its own caveats, like problems with component reusability and performance.

These caveats, although negligible in small-scale applications, can equally result in unwanted outcomes. The [<FontIcon icon="fa-brands fa-react"/>Context docs themselves](https://reactjs.org/docs/context.html#before-you-use-context) warn of these caveats:

::: note Before You Use Context

Context is primarily used when some data needs to be accessible by *many* components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.

**If you only want to avoid passing some props through many levels, component composition is often a simpler solution than context.**

:::

### Problems with component reusability

When a context provider is wrapped over multiple components, we implicitly pass whatever state or data that is stored in that provider to the children components it wraps.

Notice I said implicitly? We don’t *literally* pass the state to these components — not until we initiate an actual context consumer or `useContext` Hook — but we have implicitly made these components dependent on the state provided by this context provider.

The problem stems from trying to reuse any of these components outside the boundaries of our context provider. The component first tries to confirm whether that implicit state provided by the context provider still exists before rendering. When it doesn’t find this state, it throws a render error.

Still not clear? Imagine our previous example for a second. Let’s say that we wanted to reuse the `Message` component to display a different message based on a different condition, and this `Message` component was to be placed outside the boundaries of the context provider wrapper.

```jsx :collapsed-lines title="App.jsx"
import { createContext, useContext } from "react";
//Creating a context
const userContext = createContext();
function App() {
  return (
    <>
      <div>
        <Navbar />
        <userContext.Provider value={{ user: "Steve" }}>
          <MainPage />
        </userContext.Provider>
      </div>
      {/* Trying to use the message component outside the Context Provider*/}
      <Message />
    </>
  );
}
export default App;

function Navbar() {
  return (
    <nav 
      style={{ background: "#10ADDE", color: "#fff" }}
    >
      Demo App
    </nav>
  );
}

function MainPage() {
  return (
    <div>
      <h3>Main Page</h3>
      <Content />
    </div>
  );
}

function Content() {
  return (
    <div>
      <Message />
    </div>
  );
}

function Message() {
  // Getting access to the state provided by the context provider wrapper
  const { user } = useContext(userContext);
  return <p>Welcome {user} :)</p>;
}
```

Our output from the above would be:

![You'll receive a TypeError from the above code snippet](/assets/image/blog.logrocket.com/solving-prop-drilling-react-apps/type-error-context-api.png)

As seen above, any attempt to do this will also lead to a render error because the `Message` component is now dependent on the user object in the context provider’s state. Attempts to reach into it for any existing `user` object provided by the context provider will fail. Below is a visual illustration of the above snippet.

![Visualizing our render error](/assets/image/blog.logrocket.com/solving-prop-drilling-react-apps/visualizing-render-error.png)

Some would suggest bypassing the issue by wrapping the entire app with the context. That would be fine with smaller apps, but with larger or more complex apps that might not be a practical solution, as we often want to scope multiple context providers in our app, depending on what needs to be managed.

### Problems with performance

The Context API uses a comparison algorithm that compares the value of its current state to any update it receives, and whenever a change occurs, the Context API broadcasts this change to every component consuming its provider, which in turn results in a re-render of these components.

This would seem trivial at first glance, but when we rely heavily on Context for basic state management, we over-engineer our application by needlessly pushing all of our states into a context provider. As you’d expect, this isn’t very performant when many components depend on this Context Provider, as they’ll re-render whenever there is an update to the state regardless of whether the change concerns or affects them or not.

---

## Introducing component composition

Let’s recall some advice from the creators of React that we’ve already seen here:

> If you only want to avoid passing some props through many levels, component composition is often a simpler solution than context.

You might recognize this quote from the React docs I referenced earlier — it’s in [<FontIcon icon="fa-brands fa-react"/>the Context API section](https://reactjs.org/docs/context.html#before-you-use-context), to be exact.

Newer React devs might wonder what “component composition” means. Component composition isn’t a newly added feature, I daresay it’s the fundamental principle behind React and many JavaScript frameworks.

When we build React applications, we do so by building multiple reusable components that can be viewed almost like independent Lego blocks. Each Lego block (component) is then considered to be one piece of our final interface — which, when assembled or composed together, form the complete interface of our application.

It is this process of assembling components as Lego blocks that is known as component composition.

If you’ve built a React application before (and I’m sure you have), you have probably used component composition without recognizing it for what it is: an alternative for managing the state of our application. We’ll focus mainly on two types of component composition in this article: [container components](#container-components) and [specialized components](#specialized-components).

---

## Container components

As with everything in JavaScript (except primitive data types), components in React are nothing but objects, and like typical objects, components can contain different varieties of properties, including other components. There are two ways of achieving this feat:

1. By explicitly passing one or more component(s) to another component as that component’s prop, which can then be extracted and rendered within that component
2. By wrapping a parent component around one or more children component(s), and then catching these children components using the default children prop

Let’s look at the first way:

```jsx title="App.jsx"
import {useState} from 'react'

function App() {
  const [data, setData] = useState("some state");
  return <ComponentOne ComponentTwo={<ComponentTwo data={data} />} />;
}

function ComponentOne({ ComponentTwo }) {
  return (
    <div>
      <p>This is Component1, it receives component2 as a prop and renders it</p>
      {ComponentTwo}
    </div>
  );
}

function ComponentTwo({ data }) {
  return <h3>This is Component two with the received state {data}</h3>;
}
```

Rather than nesting components within components, and then struggling to pass data to them through prop drilling, we can simply lift these components to our root app, and then manually pass the intended child components to the parent component with the intended data attached directly to the child component. Then, the parent component will render it as a prop.

Now, let’s look at the second way:

```jsx title="App.jsx"
function App() {
  const [data, setData] = useState("some state");

  return (
    <ParentComponent>
      <ComponentOne>
        <ComponentTwo data={data} />
      </ComponentOne>
    </ParentComponent>
  );
}

function ParentComponent({ children }) {
  return <div>{children}</div>;
}
function ComponentOne({ children }) {
  return (
    <>
      <p>This is Component1, it receives component2 as a child and renders it</p>
      {children}
    </>
  );
}

function ComponentTwo({ data }) {
  return <h3>This is Component two with the received {data}</h3>;
}
```

At this point the code should be self-explanatory — whenever we wrap a component around another, the *wrapping* component becomes a parent component to the *wrapped* one. The child component can then be received within the parent component using the default children prop, which is responsible for rendering child components.

---

## Specialized components

A specialized component is a generic component that is conditionally created to render specialized variants of itself by passing in props that match the conditions for a specific variant.

This form of component composition doesn’t necessarily solve prop drilling, but is more concerned with reusability and creating fewer components, which can efficiently play a key role in composing a stateful interface when mixed in with container components.

Below is an example of a specialized component and how it facilitates reusability.

```jsx title="App.jsx"
function App() {
  return (
    <PopupModal title="Welcome" message="A popup modal">
      <UniqueContent/>
    </PopupModal>
  );
}

function PopupModal({title, message, children}) {
  return (
    <div>
      <h1 className="title">{title}</h1>
      <p className="message">{message}</p>
      {children && children}
    </div>
  );
}

function UniqueContent() {
  return<div>Unique Markup</div>
}
```

---

## Why component composition is important

Now that you understand a bit about component composition, it shouldn’t be rocket science to figure out how useful component composition can be. To list a few reasons:

- It encourages the reusability of our components
- It easily solves the supposed problem of prop drilling without external libraries
- By lifting most of our components to the root level and intelligently combining the various composition methods, it can be an effective alternative for state management
- Composition makes your code more predictable and easier to debug
- It easily enhances the ability to share state and functionalities with other components
- It is fundamentally the React way of building interfaces

I could go on about the various ways component composition is important, but you should already see a pattern to it. We’ll also cover each of them in the next section, so, onwards.

---

## Recreating our app using component composition

Let’s refactor our app to use component composition. We’ll do it two ways to demonstrate its flexibility.

```jsx title="App.jsx"
import { useState } from "react";

function App() {
  const [user, setState] = useState({ name: "Steve" });
  return (
    <div>
      <Navbar />
      <MainPage content={<Content message={<Message user={user} />} />} />
    </div>
  );
}
export default App;

function Navbar() {
  return (
    <nav 
      style={{ background: "#10ADDE", color: "#fff" }}
    >
      Demo App
    </nav>
  );
}

function MainPage({ content }) {
  return (
    <div>
      <h3>Main Page</h3>
      {content}
    </div>
  );
}

function Content({ message }) {
  return <div>{message}</div>;
}

function Message({ user }) {
  return <p>Welcome {user.name} :)</p>;
}
```

or

```jsx
function App() {
  const [user, setState] = useState({ name: "Steve" });
  return (
    <div>
      <Navbar />
      <MainPage>
        <Content>
          <Message user={user} />
        </Content>
      </MainPage>
    </div>
  );
}
export default App;

function Navbar() {
  return (
    <nav 
      style={{ background: "#10ADDE", color: "#fff" }}
    >
      Demo App
    </nav>
  );
}

function MainPage({ children }) {
  return (
    <div>
      <h3>Main Page</h3>
      {children}
    </div>
  );
}

function Content({ children }) {
  return <div>{children}</div>;
}

function Message({ user }) {
  return <p>Welcome {user.name} :)</p>;
}
```

As seen in both snippets above, there are several ways to go about component composition. In the first snippet, we took advantage of React’s props feature to pass the component into each parent as a simple object, with the data attached to the component of interest.

In the second snippet, we took advantage of the `children` property to create a pure composite of our layout, with the data directly passed to the component of interest. We could easily come up with more ways to refactor this app using just component composition, but by now you should clearly see the possibilities of solving prop drilling by relying only on component composition.

---

## Conclusion

React provides a powerful composition modal for managing not only components but also state within our app. As written in React’s Context docs:

> Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

You are often advised to rely less on Context or other libraries for local state management, especially if it’s in a bid to avoid prop drilling and component composition is easily your best bet.

---

## References

<SiteInfo
  name="Composition vs Inheritance - React"
  desc="A JavaScript library for building user interfaces"
  url="https://legacy.reactjs.org/docs/composition-vs-inheritance.html/"
  logo="https://legacy.reactjs.org/favicon-32x32.png?v=f4d46f030265b4c48a05c999b8d93791"
  preview="https://legacy.reactjs.org/logo-og.png"/>


<SiteInfo
  name="Context - React"
  desc="A JavaScript library for building user interfaces"
  url="https://legacy.reactjs.org/docs/context.html/"
  logo="https://legacy.reactjs.org/favicon-32x32.png?v=f4d46f030265b4c48a05c999b8d93791"
  preview="https://legacy.reactjs.org/logo-og.png"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A better way of solving prop drilling in React apps",
  "desc": "In the spirit of ”using the platform,” learn how the React library provides a workaround for prop drilling without Redux or the Context API.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/solving-prop-drilling-react-apps.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
