---
lang: en-US
title: "Using React Hooks for state management"
description: "Article(s) > Using React Hooks for state management"
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
      content: "Article(s) > Using React Hooks for state management"
    - property: og:description
      content: "Using React Hooks for state management"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-hooks-state-management.html
prev: /programming/js-react/articles/README.md
date: 2021-05-11
isOriginal: false
author:
  - name: Ovie Okeh
    url : https://blog.logrocket.com/author/ovieokeh/
cover: /assets/image/blog.logrocket.com/react-hooks-state-management/banner.png
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
  name="Using React Hooks for state management"
  desc="Using the useReducer Hook for state management in React enables you to share state between components without Redux."
  url="https://blog.logrocket.com/react-hooks-state-management"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-hooks-state-management/banner.png"/>

::: note Editor’s note

This React Hooks state management tutorial was last updated on 25 May 2021.

:::

![Using React Hooks for State Management Without Redux](/assets/image/blog.logrocket.com/react-hooks-state-management/banner.png)

The [<VPIcon icon="fa-brands fa-react"/>React Hooks API](https://reactjs.org/docs/hooks-reference.html) has introduced a whole new way of writing and thinking about React apps. One of my favorite React Hooks is [**`useReducer`**](/blog.logrocket.com/react-usereducer-hook-ultimate-guide.md), which you can use to share states between components.

In this tutorial, we’ll show you how to handle complex state updates in React using the `useReducer` Hook.

---

## Why use React Hooks for shared state management?

Managing state in React, particularly in large apps, used to involve pulling in third-party libraries such as Redux and MobX. These third-party tools made it easier to update your application’s state in a more predictable and fine-grained way, but they usually came with extra overhead and a steep learning curve.

Thanks to `useReducer`, one of the [**custom Hooks**](/blog.logrocket.com/create-your-own-custom-react-hooks.md) introduced with [<VPIcon icon="fa-brands fa-react"/>React v16.8](https://reactjs.org/docs/hooks-intro.html), you can now reap the benefits of using third-party libraries without the extra packages and learning curve — OK, maybe just a tiny curve.

By the end of this tutorial, you’ll be able to manage and share your application’s state in a predictable manner with React Hooks.

Before we begin, I’d like to state that I don’t mean to bash other state management methods or packages such as [**Redux**](/blog.logrocket.com/understanding-redux-tutorial-examples.md), [**MobX**](/blog.logrocket.com/introduction-to-mobx-with-react.md), [**Recoil**](https://blog.logrocket.com/simple-state-management-react-recoil.md), [**Zustand**](/blog.logrocket.com/managing-react-state-zustand.md), etc. Each solution has its strengths and shines in certain use cases. The aim of this tutorial is to demonstrate how to use React Hooks for state management and help you understand how the `useReducer` Hook works so you can add it to your toolbox.

---

## What is `useReducer`?

Before we get into how to use `useReducer` to manage shared state in React, let’s deconstruct it so we can understand it better.

The `useReducer` Hook allows you to update parts of your React component’s state when certain actions are dispatched. The process is very similar to how Redux works: `useReducer` takes in a reducer function and an initial state as arguments and then provides a state variable and a dispatch function, which enables you to update the state.

If you’re familiar with how Redux updates the store through reducers and actions, then you already know how `useReducer` works.

---

## How the `useReducer` Hook works

`useReducer` requires two things to work: an initial state and a reducer function. We’ll see how they look below and then explain in detail what each is used for.

Consider the following snippet of code:

```jsx
// we have to define the initial state of the component's state
const initialState = { count: 0 }

// this function will determine how the state is updated
function reducer(state, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    case 'REPLACE':
      return { count: action.newCount }
    case 'RESET':
      return { count: 0 }
    default:
      return state
  }
}

// inside your component, initialize your state like so
const [state, dispatch] = useReducer(reducer, initialState);
```

In the code snippet above, we defined an initial state for our component — a reducer function that updates that state depending on the action dispatched — and we initialized the state for our component on line 21. If you’ve never worked with Redux, below is a breakdown of how the process works.

### `initialState`

The `initialState` variable is the default value of our component’s state when it gets mounted for the first time.

### The reducer function

We want to update our component’s state when certain actions occur. This function takes care of specifying what the state should contain depending on an action. It returns an object, which is then used to replace the state.

The reducer function takes in two arguments: `state` and `action`.

- `state` is your application’s current state
- `action` is an object that contains details of the action currently happening. It usually contains a `type:` that denotes what the action is. `action` can also contain more data, which is usually the new value to be updated in the state

An action may look like this:

```jsx
const replaceAction = {
  type: 'REPLACE',
  newCount: 42,
}
```

Looking back at our reducer function, we can see a switch statement checking the value of `action.type`. If we had passed `replaceAction` as the current action to our reducer, the reducer would return an object `{ count: 42 }`, which would then be used to replace the component’s state.

### Dispatching an action

We know what a reducer is now and how it determines the next state for your component through actions being dispatched. How, though, do we dispatch such an action?

Go back to the code snippet and check line 21. You’ll notice that `useReducer` returns two values in an array. The first one is the state object, and the second one is a function called `dispatch`. This is what we use to dispatch an action.

For instance, if we wanted to dispatch `replaceAction` defined above, we’d do this:

```jsx
dispatch(replaceAction)

// or

dispatch({
  type: 'REPLACE',
  newCount: 42,
})
```

Dispatch is nothing more than a function, and since functions in JavaScript are first-class citizens, we can pass them around to other components through props. This simple fact is the reason why you can use `useReducer` to replace Redux in your application.

---

## Using React Hooks to share state between components

When you use React Hooks to share state between components, you eliminate the need to use Redux. In this section, we’ll show you how to do React state management without Redux.

Now that you know how to dispatch an action to update a component’s state, let’s look at a scenario where the root component’s state acts as the replacement for the Redux store.

First, we’ll define the initial state of our store:

```jsx
const initialState = {
  user: null,
  permissions: [],
  isAuthenticating: false,
  authError: null,
}
```

Now our reducer function:

```jsx :collapsed-lines
function reducer(state, action) {
  switch(action.type) {
    case 'AUTH_BEGIN':
      return {
        ...state,
        isAuthenticating: true,
      }

    case 'AUTH_SUCCESS':
      return {
        isAuthenticating: false,
        user: action.user,
        permissions: action.permissions
        authError: null,
      }

    case 'AUTH_FAILURE':
      return {
        isAuthenticating: false,
        user: null,
        permissions: []
        authError: action.error,
      }

    default:
      return state
  }
}
```

And, finally, our root component. This is going to hold the store and pass the required data and the dispatch function down to the components that need them. This will allow the children components to read from and update the store as required.

Let’s see how it looks in code:

```jsx
function App() {
  const [store, dispatch] = useReducer(initialState)

  return (
    <React.Fragment>
      <Navbar user={store.user} />
      <LoginPage store={store} dispatch={dispatch} />
      <Dashboard user={store.user} />
      <SettingsPage permissions={store.permissions} />
    </React.Fragment>
  )
}
```

We have `App` set up to handle the store, and this is where we pass the store values down to the children components. If we were using Redux, we’d have had to use `Provider` to wrap all the components, create a separate store, and then for each component that needs to connect to the store, wrap them in a HOC with `connect`.

With this approach, however, we can bypass using all that boilerplate and just pass in the store values directly to the components as props. We could have as many stores, reducers, `initialStates`, etc. as is required without having to bring in Redux.

OK, let’s write a login function, call it from the `<LoginPage />` component, and watch how the store gets updated.

```jsx
async function loginRequest(userDetails, dispatch) {
  try {
    dispatch({ type: 'AUTH_BEGIN' })
    const { data: { user, permissions } } = await axios.post(url, userDetails)
    dispatch({ type: 'AUTH_SUCCESS', user, permissions }) 
  } catch(error) {
    dispatch({ type: 'AUTH_FAILURE', error: error.response.data.message })
  }
}
```

And we’d use it like this in the `LoginPage` component:

```jsx
function LoginPage(props) {
  // ...omitted for brevity
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    await loginRequest(userDetails, props.dispatch)
    const { authError } = props.store
    authError
      ? handleErrors(authError)
      : handleSuccess()
  }
  // ...omitted for brevity
}
```

We’ve now been able to update a store variable that is being read from several other components. These components get the new value of `user` and `permissions` as soon as the reducer returns the new state determined by the action.

This is a very modular way to share dynamic data between different components while still keeping the code relatively simple and free from boilerplate. You could improve on this further by using the [<VPIcon icon="fa-brands fa-react"/>`useContext` Hook](https://reactjs.org/docs/hooks-reference.html#usecontext) to make the store and dispatch function available to all components without having to manually pass it down by hand.

---

## Limitations to using React Hooks for state management

There are some rather important limitations to `useReducer` that we need to talk about if we’re being objective. These limitations are what may hinder you from managing all your application’s state with `useReducer`.

### Store limitations

Your store is not truly global. Redux’s implementation of a global store means that the store itself isn’t tied to any component; it’s separate from your app.

The state you get from `useReducer` is component-dependent, along with its dispatch function. This makes it impossible to use the dispatch from one `useReducer` call on a different reducer. For instance, take these two separate stores and their dispatch functions:

```jsx
const [notificationStore, dispatch1] = useReducer(initialState, notificationReducer)
const [authStore, dispatch2] = useReducer(initialState, authReducer)
```

Because of the dependence of the dispatch function on the `useReducer` call that returned it, you can’t use `dispatch1` to trigger state updates in `authStore`, nor can you use `dispatch2` to trigger state updates in `notificationStore`.

This limitation means you have to manually keep track of which dispatch function belongs to which reducer, and it may ultimately result in more bloat. As of the time of writing this article, there is no known way to combine dispatch functions or reducers.

### Extensibility

One of my favorite features of Redux is how extensible it is. For instance, you can add a logger middleware that logs all the actions dispatched, and you can use the Chrome extension to view your store and even diff changes between dispatches.

These are all things that you’d give up if you decide to replace Redux with `useReducer`. Or you could implement these yourself, but you’d be reintroducing the boilerplate that Redux brings with it.

---

## Conclusion

The `useReducer` Hook is a nice addition to the React library. It allows for a more predictable and organized way to update your component’s state and, to an extent, when [**coupled with `useContext`**](/blog.logrocket.com/react-hooks-vs-redux-hooks-context-replace-redux.md), makes sharing data between components a bit easier.

`useReducer` has its shortcomings, too, which we discussed above. If you find a way to get around them, please let me know in the comments.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using React Hooks for state management",
  "desc": "Using the useReducer Hook for state management in React enables you to share state between components without Redux.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-hooks-state-management.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
