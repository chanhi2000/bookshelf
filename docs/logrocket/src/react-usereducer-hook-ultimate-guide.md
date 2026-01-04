---
lang: en-US
title: "A guide to the React useReducer Hook"
description: "Article(s) > A guide to the React useReducer Hook"
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
      content: "Article(s) > A guide to the React useReducer Hook"
    - property: og:description
      content: "A guide to the React useReducer Hook"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-usereducer-hook-ultimate-guide.html
prev: /programming/js-react/articles/README.md
date: 2024-10-10
isOriginal: false
author:
  - name: Ejiro Asiuwhu
    url : https://blog.logrocket.com/author/ejiroasiuwhu/
cover: /assets/image/blog.logrocket.com/react-usereducer-hook-ultimate-guide/banner.png
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
  name="A guide to the React useReducer Hook"
  desc="The useReducer Hook, an alternative to the useState Hook, helps you manage complex state logic in React applications."
  url="https://blog.logrocket.com/react-usereducer-hook-ultimate-guide"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-usereducer-hook-ultimate-guide/banner.png"/>

::: note Editor’s note

This article was last updated on 10 October 2024 to include new sections on handling API calls with the `useReducer` Hook and discuss its role in React 19—including interactions with the `use()` and `useTransition` Hooks.*

:::

![A Guide To The React UseReducer Hook](/assets/image/blog.logrocket.com/react-usereducer-hook-ultimate-guide/banner.png)

`useReducer` is one of the additional Hooks that shipped with React v16.8. An alternative to the `useState` Hook, `useReducer` helps you manage complex state logic in React applications. When combined with other Hooks like `useContext`, [**`useReducer` can be a good alternative to Redux, Recoil, or MobX**](/blog.logrocket.com/react-hooks-vs-redux-hooks-context-replace-redux.md). In certain cases, it is an outright better option.

While Redux, Recoil, and MobX are usually the best options for managing global states in large React applications, more often than necessary, many React developers jump into these third-party state management libraries when they could have effectively handled their state with Hooks.

In this tutorial, we’ll explore the `useReducer` Hook in depth, reviewing the scenarios in which you should and shouldn’t use it. Let’s get started!

---

## How does the `useReducer` Hook work?

The `useReducer` Hook is used to store and update states, just like the `useState` Hook. It accepts a `reducer` function as its first parameter and the initial state as the second. `useReducer` returns an array that holds the current state value and a `dispatch` function to which you can pass an action and later invoke it. While this is similar to the pattern Redux uses, there are a few differences.

For example, the `useReducer` function is tightly coupled to a specific reducer. We dispatch action objects to that reducer only, whereas in Redux, the dispatch function sends the action object to the store. At the time of dispatch, the components don’t need to know which reducer will process the action.

For those who may be unfamiliar with Redux, we’ll explore this concept a bit further. There are three main building blocks in Redux:

- **Store**: An immutable object that holds the application’s state data
- **Reducer**: A function that returns some state data, triggered by an action `type`
- **Action**: An object that tells the reducer how to change the state. It must contain a `type` property and can contain an optional `payload` property

Let’s see how these building blocks compare to managing state with the `useReducer` Hook. Below is an example of a store in Redux:

```jsx
import { createStore } from "redux";

const store = createStore(reducer, [preloadedState], [enhancer]);
```

In the code below, we initialize state with the `useReducer` Hook:

```jsx
const initialState = { count: 0 };

const [state, dispatch] = useReducer(reducer, initialState)
```

The reducer function in Redux will accept the previous app state and the action being dispatched, calculate the next state, and return the new object. Reducers in Redux follow the syntax below:

```jsx
(state = initialState, action) => newState
```

Let’s consider the following example:

```jsx :collapsed-lines
// notice that the state = initialState and returns a new state
const reducer = (state = initialState, action) => { 
  switch (action.type) {
    case 'ITEMS_REQUEST': 
      return Object.assign({}, state, {
        isLoading: action.payload.isLoading 
      }); 
    case 'ITEMS_REQUEST_SUCCESS': 
      return Object.assign({}, state, {
        items: state.items.concat(action.items),
        isLoading: action.isLoading 
      });
    default:
      return state; 
  }
}

export default reducer;
```

`useReducer` doesn’t use the `(state = initialState, action) => newState` Redux pattern, so its reducer function works a bit differently. The code below shows how you’d create reducers with React’s `useReducer`:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}
```

Below is an example of an action that can be carried out in Redux:

```jsx
// { type: ITEMS_REQUEST_SUCCESS, payload: { isLoading: false } } // action creators
export function itemsRequestSuccess(bool) {
  return {
    type: ITEMS_REQUEST_SUCCESS, 
    payload: {
      isLoading: bool
    }
  };
}

// dispatching an action with Redux
dispatch(itemsRequestSuccess(false)); // to invoke a dispatch function, you need to pass action as an argument to the dispatch function
```

Actions in `useReducer` work in a similar way:

```jsx
// not the complete code
switch (action.type) {
  case "increment":
    return { count: state.count + 1 };
  default:
    throw new Error();
}
// dispatching an action with useReducer
<button onClick={() => dispatch({ type: "increment" })}>Increment</button>;
```

If the action type in the code above is `increment`, our state object is increased by `1`.

### The reducer function

The JavaScript `reduce()` method executes a reducer function on each element of the array and returns a single value. The `reduce()` method accepts a reducer function, which itself can accept up to four arguments. The code snippet below illustrates how a reducer works:

```jsx
const reducer = (accumulator, currentValue) => accumulator + currentValue;
[2, 4, 6, 8].reduce(reducer);
// expected output: 20
```

In React, `useReducer` essentially accepts a reducer function that returns a single value:

```jsx
const [count, dispatch] = useReducer(reducer, initialState);
```

The reducer function itself accepts two parameters and returns one value. The first parameter is the current state, and the second is the action. The state is the data we are manipulating. The reducer function receives an action, which is executed by a `dispatch` function:

```jsx
function reducer(state, action) { }

dispatch({ type: 'increment' });
```

The action is like an instruction you pass to the reducer function. Based on the specified action, the reducer function executes the necessary state update. If you’ve used a state management library like Redux before, then you’ve probably come across this state management pattern.

### Specifying the initial state

The initial state is the second argument passed to the `useReducer` Hook, which represents the default state:

```jsx
const initialState = { count: 1 };

// wherever our useReducer is located
const [state, dispatch] = useReducer(reducer, initialState, initFunc);
```

If you don’t pass a third argument to `useReducer`, it will take the second argument as the initial state. The third argument, which is the `init` function, is optional. This pattern also follows one of the golden rules of Redux state management: the state should be updated by emitting actions. Never write directly to the state.

However, it’s worth noting that the Redux `state = initialState` convention doesn’t work the same way with `useReducer` because the initial value sometimes depends on props.

---

## Creating the initial state lazily

In programming, lazy initialization is the tactic of delaying the creation of an object, the calculation of a value, or some other expensive process until the first time it is needed.

As mentioned above, `useReducer` can accept a third parameter, which is an optional `init` function for creating the initial state lazily. It lets you extract logic for calculating the initial state outside of the reducer function, as seen below:

```jsx
const initFunc = (initialCount) => {
  if (initialCount !== 0) {
    initialCount = +0;
  }
  return { count: initialCount };
};

// wherever our useReducer is located
const [state, dispatch] = useReducer(reducer, initialCount, initFunc);
```

If the value is not `0` already, `initFunc` above will reset `initialCount` to `0` on page mount, then return the state object. Notice that this `initFunc` is a function, not just an array or object.

### What is `dispatch` in React

The `dispatch` function accepts an object that represents the type of action we want to execute when it is called. Basically, it sends the type of action to the reducer function to perform its job, which, of course, is updating the state. Think of `dispatch` as a messenger that delivers instructions (actions) to the state manager (reducer).

The action to be executed is specified in our reducer function, which in turn, is passed to the `useReducer`. The reducer function will then return the updated state.

The actions that will be dispatched by our components should always be represented as one object with the `type` and `payload` key, where `type` stands as the identifier of the dispatched action and `payload` is the piece of information that this action will add to the state. `dispatch` is the second value returned from the `useReducer` Hook and can be used in our JSX to update the state:

```jsx :collapsed-lines
// creating our reducer function
function reducer(state, action) {
  switch (action.type) {
    // ...
    case "reset":
      return { count: action.payload };
    default:
      throw new Error();
  }
}

// wherever our useReducer is located
const [state, dispatch] = useReducer(reducer, initialCount, initFunc);

// Updating the state with the dispatch functon on button click
<button onClick={() => dispatch({ type: "reset", payload: initialCount })}>
  Reset
</button>;
```

Notice how our reducer function uses the payload that is passed from the `dispatch` function. It sets our state object to the payload, i.e., whatever the `initialCount` is. Note that we can pass the `dispatch` function to other components through props, which alone is what allow us to replace Redux with `useReducer`.

Let’s say we have a component that we want to pass as props to our dispatch function. We can easily do that from the parent component:

```jsx
<Increment
  count={state.count}
  handleIncrement={() => dispatch({ type: "increment" })}
/>;
```

Now, in the child component, we receive the props, which, when emitted, will trigger the dispatch function and update the state:

```jsx
<button onClick={handleIncrement}>Increment</button>;
```

### Bailing out of a dispatch

If the `useReducer` Hook returns the same value as the current state, React will bail out without rendering the children or firing effects because it uses the [<VPIcon icon="fa-brands fa-firefox" />`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) comparison algorithm.

---

## Building a simple counter app with the `useReducer` Hook

Now, let’s put our knowledge to use by building a simple counter app with the `useReducer` Hook:

```jsx :collapsed-lines
import React, { useReducer } from "react";

const initialState = { count: 0 };

// The reducer function
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: (state.count = 0) };
    default:
      return { count: state.count };
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      {" "}
      Count: {state.count} <br /> <br />{" "}
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>{" "}
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>{" "}
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>{" "}
    </div>
  );
};
export default Counter;
```

First, we initialize the state with `0`, then we create a reducer function that accepts the current state of our count as an argument and an action. The state is updated by the reducer based on the action type. `increment`, `decrement`, and `reset` are all action types that, when dispatched, update the state of our app accordingly.

To increment the state count `const initialState = { count: 0 }`, we simply set `count` to `state.count + 1` when the `increment` action type is dispatched.

---

## `useState` vs. `useReducer`

[<VPIcon icon="fa-brands fa-react"/>`useState` is a basic Hook](https://reactjs.org/docs/hooks-reference.html#basic-hooks) for managing simple state transformation, and [<VPIcon icon="fa-brands fa-react"/>`useReducer` is an additional Hook](https://reactjs.org/docs/hooks-reference.html#additional-hooks) for managing more complex state logic. However, it’s worth noting that `useState` uses `useReducer` internally, implying that you could use `useReducer` for everything you can do with `useState`.

However, there are some major differences between these two Hooks. With `useReducer`, you can avoid passing down callbacks through different levels of your component. Instead, `useReducer` allows you to pass a provided `dispatch` function, which in turn will improve performance for components that trigger deep updates.

However, this does not imply that the `useState` updater function is newly called on each render. When you have a complex logic to update state, you simply won’t use the setter directly to update state. Instead, you’ll write a complex function, which in turn would call the setter with updated state.

Therefore, it’s recommended to use `useReducer`, which returns a `dispatch` method that doesn’t change between re-renders, and lets you have the manipulation logic in the reducers.

It’s also worth noting that, with `useState`, the state updater function is invoked to update state, but with `useReducer`, the `dispatch` function is invoked instead, and an action with at least a type is passed to it. Now, let’s take a look at how both Hooks are declared and used.

### Declaring state with `useState`

`useState` returns an array that holds the current state value and a `setState` method for updating the state:

```jsx
const [state, setState] = useState('default state');
```

### Declaring state with `useReducer`

`useReducer` returns an array that holds the current state value and a `dispatch` method that logically achieves the same goal as `setState`, updating the state:

```jsx
const [state, dispatch] = useReducer(reducer, initialState)
```

Updating state with `useState` is as follows:

```jsx
<input
  type="text"
  value={state}
  onChange={(e) => setState(e.currentTarget.value)}
/>;
```

Updating state with `useReducer` is as follows:

```jsx
<button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>;
```

We’ll discuss the `dispatch` function in greater depth later in the tutorial. Optionally, an action object may also have a `payload`:

```jsx
<button onClick={() => dispatch({ type: "decrement", payload: 0 })}>
  Decrement
</button>;
```

`useReducer` can be handy when managing complex state shapes, for example, when the state consists of more than primitive values, like nested arrays or objects:

```jsx
const [state, dispatch] = useReducer(loginReducer, {
  users: [
    { username: "Philip", isOnline: false },
    { username: "Mark", isOnline: false },
    { username: "Tope", isOnline: true },
    { username: "Anita", isOnline: false },
  ],
  loading: false,
  error: false,
});
```

It’s easier to manage this local state because the parameters depend on each other, and all the logic could be encapsulated into one reducer.

---

## When to use the `useReducer` Hook

As your application grows in size, you’ll most likely deal with more complex state transitions, at which point you’ll be better off using `useReducer`. `useReducer` provides more predictable state transitions than `useState`, which becomes more important when state changes become so complex that you want to have one place to manage state, like the render function.

`useReducer` is the better option when you move past managing primitive data, i.e., a string, integer, or Boolean, and instead must manage a complex object, like with arrays and additional primitives.

If you’re more of a visual learner, the video below gives a detailed explanation with practical examples of when to use the `useReducer` Hook:

<VidStack src="youtube/o-nCM1857AQ" />

### Creating a login component

For a better understanding of when to use `useReducer`, let’s create a login component and compare how we’d manage state with both the `useState` and `useReducer` Hooks.

First, let’s create the login component with `useState`:

```jsx :collapsed-lines
import React, { useState } from "react";

export default function LoginUseState() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, showLoader] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    showLoader(true);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "ejiro" && password === "password") {
            resolve();
          } else {
            reject();
          }
        }, 1000);
      });
      setIsLoggedIn(true);
    } catch (error) {
      setError("Incorrect username or password!");
      showLoader(false);
      setUsername("");
      setPassword("");
    }
  };
  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button onClick={() => setIsLoggedIn(false)}>Log Out</button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>} <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
```

Notice how we are dealing with all these state transitions, like `username`, `password`, `isLoading`, `error`, and `isLoggedIn`, when we really should be more focused on the action that the user wants to take on the login component.

We used five `useState` Hooks, and we had to worry about when each of these states is transitioned. We can refactor the code above to use `useReducer` and encapsulate all our logic and state transitions in one reducer function:

```jsx :collapsed-lines
import React, { useReducer } from "react";

function loginReducer(state, action) {
  switch (action.type) {
    case "field": {
      return { ...state, [action.fieldName]: action.payload };
    }
    case "login": {
      return { ...state, error: "", isLoading: true };
    }
    case "success": {
      return { ...state, isLoggedIn: true, isLoading: false };
    }
    case "error": {
      return {
        ...state,
        error: "Incorrect username or password!",
        isLoggedIn: false,
        isLoading: false,
        username: "",
        password: "",
      };
    }
    case "logOut": {
      return { ...state, isLoggedIn: false };
    }
    default:
      return state;
  }
}
const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

export default function LoginUseReducer() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const { username, password, isLoading, error, isLoggedIn } = state;
  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "ejiro" && password === "password") {
            resolve();
          } else {
            reject();
          }
        }, 1000);
      });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };
  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>Welcome {username}!</h1>
            <button onClick={() => dispatch({ type: "logOut" })}>
              
              Log Out
            </button>
          </>
        ) : (
          <form className="form" onSubmit={onSubmit}>
            {error && <p className="error">{error}</p>} <p>Please Login!</p>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "username",
                  payload: e.currentTarget.value,
                })
              }
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  fieldName: "password",
                  payload: e.currentTarget.value,
                })
              }
            />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
```

Notice how the new implementation with `useReducer` has made us more focused on the action the user is going to take. For example, when the `login` action is dispatched, we can see clearly what we want to happen. We want to return a copy of our current state, set our `error` to an empty string, and set `isLoading` to true:

```js
case 'login':
  return {
    ...state, 
    error: '', 
    isLoading: true,
  }; 
```

The beautiful thing about our current implementation is that we no longer have to focus on state transition. Instead, we are keen on the actions to be executed by the user.

Let’s extend the existing example to show how to handle API Calls with `useReducer` by including an actual API call and update a table with the response data:

```jsx :collapsed-lines
import React, { useReducer, useEffect } from "react";
import axios from "axios";

const initialState = { users: [], loading: false, error: null };

function userReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function UserList() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await axios.get("https://api.example.com/users");
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR", payload: error.message });
      }
    };
    fetchUsers();
  }, []);
  const { users, loading, error } = state;
  if (loading) 
    return <div>Loading...</div>;
  if (error) 
    return <div>Error: {error}</div>;
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td> <td>{user.name}</td> <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

The above example shows how to use `useReducer` to manage the state of an API call, including its loading and error states, and how to update a table with the fetched data.

Remember, the choice between `useState` and `useReducer` often comes down to the complexity of your state logic and personal preference. Don’t be afraid to start with `useState` and refactor to `useReducer` if you find your state logic becoming too complex.

---

## When not to use the `useReducer` Hook

Despite being able to use the `useReducer` Hook to handle complex state logic in our app, it’s important to note that there are some scenarios where a third-party state management library like [Redux may be a better option](https://blog.logrocket.com/understanding-redux-tutorial-examples.md):

1. When your application needs a single source of truth
2. When you want a more predictable state
3. When state-lifting to the top-level component no longer suffices
4. When you need to persist state even after a page refresh

With all these benefits, it’s also worth noting that using a library like Redux, as opposed to using pure React with `useReducer`, comes with some tradeoffs. For example, Redux has a hefty learning curve that is minimized by [**using Redux Toolkit**](/blog.logrocket.com/smarter-redux-redux-toolkit.md), and it’s definitely not the fastest way to write code. Rather, it’s intended to give you an absolute and predictable way of managing state in your app.

---

## Troubleshooting common issues with `useReducer`

The following are the most common issues you might encounter when using `useReducer`. They are mostly caused by developer errors and not the Hook issue:

### Inconsistent action

This could be caused by dispatching incorrect or inconsistent types or payload for the same action, leading to errors. To solve this issue and ensure that all actions are consistent across the entire app, you could try using a concept like Redux’s [<VPIcon icon="fas fa-globe"/>Action Creators](https://read.reduxbook.com/markdown/part1/04-action-creators.html)

### Wrong state update

Another common mistake that happens is how the state is updated within the reducer function. This occurs when the initial state is manipulated directly within the function:

```jsx
state.count += 1;
return state;
```

This can lead to errors. The solution would be using the spread operation or other immutable techniques, so that the initial state isn’t affected:
  
```jsx
return { ...state, count: state.count + 1 }
```

### Overly complex function

Another issue is that the state might become too complex, making it difficult to manage. In this case, consider breaking it into separate functions to simplify it

---

## useReducer in the React 19

While `useReducer` didn’t receive any update in the new React 19 release, it’s important to understand its place in the broader React ecosystem.

### Server Components and `useReducer`

With the introduction of React Server Components in React 19, it’s worth noting that `useReducer` (like all Hooks) can only be used in client components. Server components are stateless and can’t use Hooks.

### `useReducer` and `use()`

React 19 introduces the new [<VPIcon icon="fa-brands fa-react"/>`use()`](https://react.dev/reference/react/use) Hook, which can be used to consume promises or context. While not directly related to `useReducer`, the `use()` Hook can complement `useReducer` when dealing with asynchronous data in your reducers.

```jsx
import { use, useReducer } from "react";

// ...
const [state, dispatch] = useReducer(reducer, initialState);
function fetchUser() {
  dispatch({ type: "FETCH_USER_START" });
  try {
    const user = use(fetchUserData(userId));
    dispatch({ type: "FETCH_USER_SUCCESS", payload: user });
  } catch (error) {
    dispatch({ type: "FETCH_USER_ERROR", payload: error.message });
  }
}
// ...
```

### `useReducer` and `useTransition` Hook

With the introduction of [<VPIcon icon="fa-brands fa-react"/>`useTransition`](https://react.dev/reference/react/useTransition) in React 18 and its enhanced capabilities in React 19, we can combine it with `useReducer` to create more concise logic, especially when dealing with data mutations and asynchronous operations.

`useTransition` allows us to mark updates as transitions, which tells React that they can be interrupted and don’t need to block the UI. This is particularly useful when combined with `useReducer` for handling complex state updates that might involve API calls or other time-consuming operations.

---

## Conclusion

In this article, we explored React’s `useReducer` Hook, reviewing how it works, when to use it, and comparing it to the `useState` Hook.

Remember, the goal is not to use `useReducer` everywhere, but to use it where it makes your code clearer and more manageable. As with all patterns in software development, the key is to understand the trade-offs and choose the right tool for the job.

I hope you enjoyed this article, and be sure to leave a comment if you have any questions. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A guide to the React useReducer Hook",
  "desc": "The useReducer Hook, an alternative to the useState Hook, helps you manage complex state logic in React applications.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-usereducer-hook-ultimate-guide.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
