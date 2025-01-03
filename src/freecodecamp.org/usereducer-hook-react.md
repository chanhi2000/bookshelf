---
lang: en-US
title: "React Hooks Tutorial – How to Use the useReducer Hook"
description: "Article(s) > React Hooks Tutorial – How to Use the useReducer Hook"
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
      content: "Article(s) > React Hooks Tutorial – How to Use the useReducer Hook"
    - property: og:description
      content: "React Hooks Tutorial – How to Use the useReducer Hook"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/usereducer-hook-react.html
prev: /articles/README.md
date: 2023-01-31
isOriginal: false
author:
  - name: Kunal Nalawade
    url: https://freecodecamp.org/news/author/KunalN25/
cover: https://www.freecodecamp.org/news/content/images/2023/01/photo-1672309046475-4cce2039f342.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="React Hooks Tutorial – How to Use the useReducer Hook"
  desc="State is an important part of a React application. Most functionalities involve making state updates in your component. But as your application grows, state updates become more and more complex. These complex state updates might get overwhelming when..."
  url="https://freecodecamp.org/usereducer-hook-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://www.freecodecamp.org/news/content/images/2023/01/photo-1672309046475-4cce2039f342.jpeg"/>

State is an important part of a React application. Most functionalities involve making state `updates` in your component.

But as your application grows, state updates become more and more complex. These complex state updates might get overwhelming when you revisit your code.

There is a different way of handling state updates, and that's by using reducers. But what are reducers? How do you use them? What does the `useReducer` hook do? In this post, I'll answer all these questions.

---

## What Is a Reducer and Why do You Need It?

Let's take an example of a To-Do app. This app involves adding, deleting, and updating items in the todo list. The update operation itself may involve updating the item or marking it as complete.

When you implement a todo list, you'll have a state variable `todoList` and make state updates to perform each operation. However, these state updates may appear at different places, sometimes not even inside the component.

To make your code more readable, you can move all your state updates into a single function that can exist outside your component. While performing the required operations, your component just has to call a single method and select the operation it wants to perform.

The function which contains all your state updates is called the **reducer**. This is because you are reducing the state logic into a separate function. The method you call to perform the operations is the **dispatch** method.

---

## How the useReducer Hook Works

You can add a reducer to your component using the `useReducer` hook. Import the useReducer method from the library like this:

```jsx
import { useReducer } from 'react'
```

The `useReducer` method gives you a state variable and a `dispatch` method to make state changes. You can define state in the following way:

```jsx
const [state, dispatch] = useReducer(reducerMethod, initialValue)
```

The reducer method contains your state logic. You can choose which state logic to call using the `dispatch` method. The state can also have some initial value similar to the `useState` hook.

---

## `useReducer` Hook Example

Let's take a simple example where we have a list of users. We can add a new user, delete an existing user, and update user details. Normally, we would create a state variable `user` and perform state updates at different places.

Let's try doing the same using reducers:

```jsx
const [users, dispatch] = useReducer(reducerMethod, userData);
```

Use the following initial data:

```jsx
const userData = [
  {
    id:1,
    name: 'kunal',
    age: 22,
    admin: true
  },
  {
    id:2,
    name: 'rounak',
    age: 23,
    admin: false
  },
  {
    id:3,
    name: 'utkarsh',
    age: 22,
    admin: false
  },   
]
```

### How to Define the Reducer Method

The reducer method contains our state updates. The method takes two arguments, the current state value and an action object. The action object contains the type of the action and additional data needed to perform the update.

We'll perform three types of updates – for user added, updated, and deleted. We'll use switch-case to select the type of operation to be performed.

```jsx
const reducerMethod = (users, action) => {
  switch(action.type) {
    // State updates here
  }
}
```

The `type` field contains the name of the operation to be performed. This is a string and you can set any value you want. Just make sure it's relevant to the action being performed for better readability. Let's perform the add operation first:

```jsx
case 'addUser': {
  return [...users, action.newUser]
}
```

The logic for updating state is similar to `setState`. Here, you return a new state value rather than making changes to the state variable directly.

Let's perform the update operation now. While performing the update operation, the dispatch method passes an `updatedUser` object to update an existing user. This additional data is passed through the `action` object.

```jsx
case 'updateUser': {
  return users.map(user => {
    if (user.id == action.updatedUser.id)
      return action.updatedUser
    return user;
  })
}
```

Now, for the delete operation, the `dispatch` method passes only the `id` of the object so that the state array can filter it out.

```jsx
case 'deleteUser': {
  return users.filter(user => user.id !== action.id)
}
```

Let's also have a default case if an action other than the above three is specified.

```jsx
default: {
  // Handle error here
}
```

Now, let's create the components that would actually use this reducer.

Display the list of users in the `UserDetails` component with the following props:

```jsx
<UsersList users={users}
  handleUpdateUser={handleUpdateUser}
  handleDeleteUser={handleDeleteUser}
/>
```

Also, create a form to add new users in the `AddUserForm` component.

```jsx
<AddUserForm handleAddUser={handleAddUser} />
```

I have not mentioned the actual implementations of the components here, as the focus is only on the state update part.

We'll make the state updates inside the handler methods by calling the `dispatch` method and passing the type of the state update with some data. For the add operation, pass the new user to be added.

```jsx
const handleAddUser = (user) => {
  dispatch({
    type: 'addUser',
    newUser: user
  })
}
```

Similarly, you can implement `handleUpdateUser` and `handleDeleteUser`.

```jsx
const handleUpdateUser = (updatedUser) => {
    dispatch({
        type: 'updateUser',
        updatedUser: updatedUser
    })
}

const handleDeleteUser = (userId) => {
    dispatch({
        type: 'deleteUser',
        id: userId
    })
}
```

The `newUser`, `updatedUser` and `userId` are parameters passed from the `AddUserForm` and `UsersList` components. They contain the required data to make the state updates.

---

## Conclusion

For any feature you create, state updates form a crucial part of the implementation in React. As the complexity of the application increases, so does the number of state updates.

In this post, I explained what a reducer is and why we need it. With the help of an example, I showed you how convenient it is to have all the state updates in one place in a separate function. This makes the code more readable and accessible.

I hope this tutorial helped eliminate any confusion regarding the `useReducer` hook. I have tried to explain it in very simple terms.

If you are unable to understand the content or find the explanation unsatisfactory, let me know. New ideas are always appreciated! Feel free to connect with me on Twitter. Till then, goodbye!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React Hooks Tutorial – How to Use the useReducer Hook",
  "desc": "State is an important part of a React application. Most functionalities involve making state updates in your component. But as your application grows, state updates become more and more complex. These complex state updates might get overwhelming when...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/usereducer-hook-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```