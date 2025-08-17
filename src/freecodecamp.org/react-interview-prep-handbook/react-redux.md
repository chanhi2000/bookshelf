---
lang: en-US
title: "React Redux"
description: "Article(s) > (5/6) The React Interview Prep Handbook - Essential Topics and Code Examples" 
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
      content: "Article(s) > (5/6) The React Interview Prep Handbook - Essential Topics and Code Examples"
    - property: og:description
      content: "React Redux"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-interview-prep-handbook/react-redux.html
date: 2024-10-11
isOriginal: false
author:
  - name: Kunal Nalawade
    url: https://freecodecamp.org/news/author/KunalN25/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1728643567956/00c98d19-4694-4942-9ad2-d2f25bcf05c0.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The React Interview Prep Handbook - Essential Topics and Code Examples",
  "desc": "Hi everyone! In the ever-changing landscape of web development, React is in very high demand. Companies are often seeking skilled React developers to build dynamic and engaging web applications. If you are a web developer or aspiring to be one, it's ...",
  "link": "/freecodecamp.org/react-interview-prep-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The React Interview Prep Handbook - Essential Topics and Code Examples"
  desc="Hi everyone! In the ever-changing landscape of web development, React is in very high demand. Companies are often seeking skilled React developers to build dynamic and engaging web applications. If you are a web developer or aspiring to be one, it's ..."
  url="https://freecodecamp.org/news/react-interview-prep-handbook#heading-react-redux"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1728643567956/00c98d19-4694-4942-9ad2-d2f25bcf05c0.png"/>

Redux is a state-management library that helps manage complex application state. It is a powerful library for managing state in large React applications.

In the context of React, let’s look at the Hooks Redux provides:

---

## `useSelector`

A selector function accepts a Redux state object as an argument and returns a part of that state. The `useSelector` Hook is used to call the selector function. Let's take the following example:

```jsx
// example state for e-commerce app
const initialState = {
  users: {  ... },
  products: { ... },
  cart: { ... },
  orders: {
    ordersList: [
      { id: 101, status: "Shipped" },
      { id: 102, status: "Processing" },
      ...
    ]
  }
}
```

Let's say you want to display list of orders on a page. We can't access this state directly from the component as it’s part of the redux store. So, we use selector functions.

```jsx
const selectAllOrders = (state) => state.orders.ordersList
```

To call this selector function, we use the `useSelector` Hook:

```jsx
const OrdersList = () => {
  const orders = useSelector(selectAllOrders);
  return (
    // display orders
  );
};
```

The main advantage of using selectors is that you get access to the Redux state object, allowing you to access any slice of the state.

---

## `useDispatch`

The `useDispatch` Hook returns a function that you can use to dispatch actions, such as updating state and calling APIs. This function takes an action object as an argument and performs the corresponding action. This function is known as a dispatch function.

Let's take an example. We’ll work with the same state and update one of the order’s status:

```jsx
function App() {
  const dispatch = useDispatch();

  const handleUpdateStatus = () => {
    dispatch({type: 'ORDER_UPDATE_STATUS', payload: {
      id: 102,
      status: "Shipped"
    }});
  };

  return (
    <div>
      <h2>Update Order Status</h2>
      <button onClick={handleUpdateStatus}>Mark as Delivered</button>
    </div>
  );
}
```

Here, the action `ORDER_UPDATE_STATUS` will be dispatched with the corresponding payload. This action will be mapped to a reducer that will perform the state update.

The advantage of using dispatch is that you can just specify the action type and pass the payload and the state update logic will be handled by the reducer, instead of the component itself.

---

## Others

I have just listed two Hooks that React provides to work with Redux. However, if you are not familiar with Redux, you should check out the [<FontIcon icon="fa-brands fa-react"/>docs](https://redux.js.org/introduction/getting-started) to get started.

Redux is much more than just these two Hooks. Make sure you are clear on the core concepts: store, slices, reducers, actions, selectors, dispatch. [<FontIcon icon="fa-brands fa-react"/>Redux Sagas](https://redux-saga.js.org/docs/introduction/GettingStarted) is another major concept you should learn. They are mainly used for async operations.