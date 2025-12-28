---
lang: en-US
title: "React Reference Guide: Context API"
description: "Article(s) > React Reference Guide: Context API"
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
      content: "Article(s) > React Reference Guide: Context API"
    - property: og:description
      content: "React Reference Guide: Context API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-reference-guide-context-api.html
prev: /programming/js-react/articles/README.md
date: 2020-09-04
isOriginal: false
author:
  - name: Ebenezer Don
    url : https://blog.logrocket.com/author/ebenezerdon/
cover: /assets/image/blog.logrocket.com/react-reference-guide-context-api/banner.png
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
  name="React Reference Guide: Context API"
  desc="React's Context API allows you to share data between multiple components without passing props down manually, thereby avoiding prop drilling."
  url="https://blog.logrocket.com/react-reference-guide-context-api"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-reference-guide-context-api/banner.png"/>

Context is React’s way of handling shared data between multiple components.

![React Reference Guide: Context API](/assets/image/blog.logrocket.com/react-reference-guide-context-api/banner.png)

---

## Why you might need Context

When working with two connected components in a React application, the easiest way to share data between them is through props. For example, if the child component needs data from the parent component, it can receive that data via props.

```jsx
const HomePage = ({ person }) => {
  // use person data from props here
  return (
    <div>
      {person.firstName}
      {person.lastName}
    </div>
  )
}

const ProfilePage = () => {
  const user = {
    firstName: 'Jane',
    lastName: 'Doe'
  }
  return (
    // call HomePage component and pass person as it's props
    <HomePage person={user}/>
  )
}
```

However, if there are more than two components at different nesting levels, it becomes a more difficult task to share data between disconnected components.

For instance, if we want to share data between a top-level component and a third-level component, we’ll have to pass the data as a prop to the second-level component even if we won’t need the data there.

This is so that the second-level component can then pass the data to the third-level component:

```jsx
const HomePage = ({ person }) => {
  // HomePage receives "person" as a prop for the
  // SettingsPage
  return (
    <SettingsPage person={person} />
  )
}
const SettingsPage = ({ person }) => {
  return (
    <div>
      {person.firstName}
      {person.lastName}
    </div>
  )
}
const ProfilePage = () => {
  const user = {
    firstName: 'Jane',
    lastName: 'Doe'
  }
  return (
    // Even though HomePage does not need the person prop, it still
    // has to be called with it for the SettingsPage component
    <HomePage person={user}/>
  )
}
```

Context solves this problem by providing a global state that every component can easily access without the need to pass data via props from a parent through multiple child components.
[](https://blog.logrocket.com/mitigating-prop-drilling-with-react-and-typescript/)

**Explore other methods of avoiding prop drilling with React and TypeScript.**

---

## API

### `React.createContext`

The `createContext` method is used to create a Context object to which components can subscribe. These components are able to get the context value from the closest matching Provider above them in the tree.

```jsx
const NewContext = React.createContext({ color: 'black' });
```

Components are usually wrapped in a Provider in order to get their context value. However, when there’s no matching Provider above a component in the tree, the component will get its context from the default argument `{ color: 'black' }` in the `createContext` method. This is especially useful when testing components in isolation.

---

### `Context.Provider`

The `React.createContext` method will return a Provider component when it is called. Providers are React components from Context objects that allow other components to access those context values and subscribe to their changes.

```jsx
const { Provider } = NewContext;
```

The Provider component accepts a `value` prop, which can then be accessed by its consuming child components. A Provider can have multiple child components or consumers.

```jsx
<Provider value={{color: 'blue'}}>
  {children}
</Provider>
```

Components will use the default context value from the `createContext` method when they have no matching parent Provider. However, once a Provider is available, even if its `value` prop is `undefined`, its child components or consumers will use its value.

Whenever a Provider’s `value` prop changes, its subscribed consumers will re-render.

---

### `Context.Consumer`

The `React.createContext` method also returns a consumer component when it is called. Consumers are React components that subscribe to context changes from Providers.

```jsx
const { Consumer } = NewContext;
```

`Context.Consumer` makes subscribing to a context within a function component possible.

```jsx
<Consumer>
  {value => <span>{value}</span>}}
</Consumer>
```

---

### `Context.displayName`

`Context.displayName` is a string property from the `React.createContext` method call. The React DevTools will use whatever `displayName` is given to a context to determine what to display for that context.

```jsx
NewContext.displayName = 'NameOfContext'
```

When `NewContext` is viewed in the React DevTools, its name should appear as `NameOfContext`:

```jsx
<NewContext.Provider> // Shows up as NameOfContext.Provider
<NewContext.Consumer> // Shows up as NameOfContext.Consumer
```

---

### `Class.contextType`

The `Class.contextType` property allows a component to consume the nearest value of a Context object that has been assigned to it.

```jsx
class newComponent extends React.Component {
  render() {
    // use the context value assigned to the class.ContextType property
    {this.context}
  }
}
newComponent.contextType = NewContext;
```

Note that the `class.contextType` property will allow you to subscribe to only one context. In the above example, `this.context` was referenced in the `render()` method. It can also be referenced in all the other lifecycle methods, including `componentDidMount()`, `componentDidUpdate()`, and `componentWillUnmount()`.

---

## Caveats

It’s important to note that with Context, components lose much of their independence. Because of this, it’s more difficult to reuse components that depend on Context. With this disadvantage, it might be easier to use component [<VPIcon icon="fa-brands fa-react"/>composition](https://reactjs.org/docs/composition-vs-inheritance.html) at times, especially when your only reason for using Context is to avoid prop drilling.

**Overusing Context can often do more harm than good. Learn why in our tutorial.**

Context also uses reference identity to determine when to re-render. Thus, there are some cases in which unintentional renders could be triggered in consumers when a Provider’s parent re-renders. Here’s an example:

```jsx
class newComponent extends React.Component {
  render() {
    return (
      <NewContext.Provider value={{color: 'blue'}}>
        <ProfilePage />
      </NewContext.Provider>
    )
  }
}
```

In the above snippet, there will always be a new object for `value`, and therefore, all the consumers will re-render every time the Provider re-renders. To get around this, you’ll have to put the value in the parent’s state and reference it in the Provider component:

```jsx
class newComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: { color: 'blue' }
    }
  }
  render() {
    return (
      <NewContext.Provider value={{this.state.value}}>
        <ProfilePage />
      </NewContext.Provider>
    )
  }
}
```

Here’s a live demo that illustrates how to handle dynamic values with Context.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React Reference Guide: Context API",
  "desc": "React's Context API allows you to share data between multiple components without passing props down manually, thereby avoiding prop drilling.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-reference-guide-context-api.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
