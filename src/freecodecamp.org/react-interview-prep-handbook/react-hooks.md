---
lang: en-US
title: "React Hooks"
description: "Article(s) > (3/6) The React Interview Prep Handbook - Essential Topics and Code Examples" 
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
      content: "Article(s) > (3/6) The React Interview Prep Handbook - Essential Topics and Code Examples"
    - property: og:description
      content: "React Hooks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-interview-prep-handbook/react-hooks.html
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
  url="https://freecodecamp.org/news/react-interview-prep-handbook#heading-react-hooks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1728643567956/00c98d19-4694-4942-9ad2-d2f25bcf05c0.png"/>

React Hooks is a game-changing feature introduced to React in 2016. Hooks provide a way to implement class component features in functional components. Because of hooks, developers nowadays prefer functional to class components.

---

## `useState` Hook

We have already seen what state is. Let's understand how to implement state in functional components with a simple example:

```jsx
const [count, setCount] = useState(0);
const increment = () => {
  setCount(count + 1);
};
const decrement = () => {
  setCount(count - 1);
};
return (
    <div>
        <h1>Count: {count}</h1>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
    </div>
);
```

- `useState` function takes an initial value as an argument and returns an array containing two elements: the current state, and a state update function.
- In this example, we have two buttons that increment and decrement the count. On click of the button, the increment/decrement operations are performed by updating the `count` state.
- The component re-renders and displays the updated `count`.

For more examples of its usages, check out my post below:

<SiteInfo
  name="4 Different Examples of the useState Hook in React | by Kunal Nalawade | Level Up Coding"
  desc="useState is a widely used hook in React. Almost every component you develop in React involves state. In this post, I am going to show you four different use cases of the useState hook. As a reminder…"
  url="https://levelup.gitconnected.com/4-different-examples-of-the-usestate-hook-in-react-5504ce011a20"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*MMpkJtmeCME-6BmGNH5l8A.png"
  preview="https://miro.medium.com/v2/da:true/resize:fit:1200/0*Nr90Dbpz1AobB6FB"/>

---

## `useEffect` Hook

The `useEffect` hook is used to implement side effects in a component. Side effects include API calls, subscription to a service and DOM manipulation. `useEffect` can also be used to conditionally update a state based on another state change.

Let's understand how to use it, with an example:

```jsx
function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.example.com/data?page=${page}`);
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, [page]);

  return (
    <div>
      <div> {JSON.stringify(data)} </div>
      <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
```

- `useEffect` takes two arguments: a function that performs side effects and a dependency array.
- In this example, we display paginated data by including the fetching logic inside a `useEffect` and including the current page in the dependency.
- `useEffect` makes the API call on the first render, loading the first page of data. After that, it loads additional data every time user changes the page.

How to implement lifecycle methods in `useEffect`:

- To implement `componentDidMount()`, pass an empty dependency array
- To implement `componentDidUpdate()`, pass dependencies to run the `useEffect` if one of those dependencies changes
- For `componentWillUnmount()`, return a callback function from `useEffect` containing the cleanup code

`useEffect` can be used in a lot of ways. The React [<FontIcon icon="fa-brands fa-react"/>docs](https://react.dev/reference/react/useEffect#usage) contain several examples of usages.

---

## `useContext` Hook

States are used to store information about a component and controls how the component behaves. In some cases, child components need access to the parent component’s state.

To achieve this we pass down the state data as props. However, passing data through props may lead to issues. Let’s understand the biggest issue:

### What is Prop Drilling?

To pass data from parent to child component, we use props. But what if a component deep within the component tree needs access to a prop. You would need to pass it through several components that don't even need the prop.

The same issue arises when multiple components in different branches of the tree need access to the same prop.

Passing down props through numerous components leads to a situation known as prop drilling.

### How does React context solve the problem?

Context lets parent components pass data to all components in the tree without drilling props through them. This eliminates the need to pass down props through multiple components in the tree.

Context was introduced as a [<FontIcon icon="fa-brands fa-react"/>class component feature](https://legacy.reactjs.org/docs/context.html) initially, but now it can be used in functional components with the `useContext` hook.

Let's see how to use the hook:

```jsx
import React, {useContext} from "react";

const DataContext = React.createContext(null);

export default function App() {
  return (
    <DataContext.Provider value="Some value">
      <MainComponent />
    </DataContext.Provider>
  );
}

function MainComponent() {
  const data = useContext(DataContext);
  return <div> Data: {data} </div>;
}
```

- We used `React.createContext` method to create a context and then created a provider function that wraps around the main component.
- The `value` prop of `DataContext.Provider` is used the pass data to the entire component tree under `MainComponent`.
- The `useContext` Hook consumes this data inside components. It returns the data that was passed to the `value` prop of the provider.

`useContext` can only be used if the component or one of its parents has a context provider wrapped around it. Examples use cases are themes, user info, language preferences and localization, and so on.

Check out additional usages of `useContext` in the [<FontIcon icon="fa-brands fa-react"/>docs](https://react.dev/reference/react/useContext#usage).

---

## `useRef` Hook

Refs (short for references) are a way to interact directly with DOM elements. They give you direct access to the JavaScript DOM object and its [<FontIcon icon="fas fa-globe"/>methods](https://tutorialspoint.com/javascript/javascript_dom_methods.htm).

Visit the [<FontIcon icon="fa-brands fa-react"/>legacy docs](https://legacy.reactjs.org/docs/refs-and-the-dom.html) for using refs in class components. In functional components, we have the `useRef` Hook. Let's take an example:

```jsx
export function App(props) {
  const myRef = useRef(null);

  useEffect(() => {
    myRef.current.focus();
  }, []);

  return <input type="text" ref={myRef} />;
}
```

- `useRef` takes an initial value as an argument and returns a `ref` object.
- When this `ref` object is passed to the `ref` prop of an element, we get a direct reference to the element's DOM node.
- The value of a `ref` is stored inside its `current` property.
- Since `ref` is a JavaScript DOM object, we can call the [<FontIcon icon="fa-brands fa-firefox"/>`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) method to focus on the `input` element when the component mounts.

Unlike state, refs do not cause component re-renders and unlike local variables, refs retain their values between renders.

Some things to remember about refs:

- Components can expose their DOM nodes to parent components by using [<FontIcon icon="fa-brands fa-react"/>`forwardRef`](https://react.dev/reference/react/forwardRef).
- Only use refs when you absolutely need to access DOM elements. Example use cases could be for tasks like focusing on input elements, selecting tests, triggering animations, determining elements positions, and so on.
- Avoid over-using them, prefer state and props over refs. Avoid modifying DOM elements explicitly to control component behavior, use state instead.

---

## `useMemo` Hook

If your component needs to perform an intensive calculation while rendering something, it slows down website performance since the component executes the calculation on every render.

This may be acceptable for a state value dependent on it, but it's inefficient if the expensive function executes again on other, unrelated state updates. To tackle this, we memoize the result of the calculation and re-calculate it only when the relevant state changes.

`useMemo` Hook is used to memoize the result of this calculation, so that it doesn't run on every render. Let's take an example:

```jsx
const MemoExample = () => {
  const [computedValue, setComputedValue] = useState(value);
  const [otherState, setOtherState] = useState('Initial State');

  const expensiveFunction = () => {
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
      result += i * 2;
    }
    return result;
  }

  const value = useMemo(expensiveFunction, [computedValue]);

  return (
    <div>
      <button onClick={() => setComputedValue(computedValue + 1)}>
        Re-calculate
      </button>
      <button onClick={() => setOtherState('State Changed')}>
        Change Other State
      </button>
    </div>
  );
};
```

- `useMemo` takes in the function and a dependency array as arguments, and returns the result of this function. It memoizes the result for the next render and returns the memoized value unless some dependency changes.
- We have passed `computedValue` state inside the array, so, after running on the first render, the function will run only when `computedValue` changes.
- If you update any other state, the component re-renders, but the function does not run again.

When to use:

- If you do not want to run a function on every render, except for the state dependent on it.
- To maintain referential equality of arrays and object across renders. Array/object references change each time they are declared.
- When rendering lists with `Array.map` that do not need to change except for relevant state updates.

---

## `useCallback` Hook

`useCallback` is similar to `useMemo`, the only difference is that `useCallback` caches the function definition itself, rather than memoizing its return value.

Similar to arrays or objects, a function reference changes each time it is declared. So, wrapping it around a `useCallback` maintains referential equality of the function across renders.

Let's understand it with an example:

```jsx
function ParentComponent() {
  const [toggle, setToggle] = useState(false);

  const handleSubmit = useCallback(() => {
    console.log('Child component form submitted');
  }, []); // Add props or state that this function depends on
  return (
    <div className={toggle ? 'dark' : ''}>
      <button onClick={() => setToggle(!toggle)}> Toggle Theme </button>
      <Child handleSubmit={handleSubmit} />
    </div>
  );
}

const Child = React.memo(({ handleSubmit }) => {
  for (let i = 0; i < 1000000000; i++) {
    // Assume component is slow
  }
  return (
    <div>
      <h2> Child component </h2>
      <button onClick={handleSubmit}> Click Me </button>
    </div>
  );
});
```

- Here, we deliberately slow down the child component to simulate slow renders. Since it's wrapped inside `React.memo()`, it only re-renders if its only prop `handleSubmit` changes.
- But when `toggle` state changes, it triggers a re-render for the child component as well, even if it's not passed down to the child component.
- This is because, every time the parent component renders, the `handleSubmit` function is created with a new reference. So, technically `handleSubmit` has changed and thus, the child component re-renders.
- To avoid this behaviour, we wrap the `handleSubmit` function declaration inside a `useCallback`. This ensures that the function reference remains the same between renders.
- In our example, the function is created only once, since there are no dependencies. If you add dependencies, the function is re-created only if one of them changes.

When to use:

- When you have event handlers defined for an element inside your component, wrap them inside a `useCallback` to avoid unnecessary re-creations of event handlers.
- When you call a function inside a `useEffect`, you would usually pass the function as a dependency. To avoid running `useEffect` unnecessarily on every render, wrap the function definition inside a `useCallback`.
- If your custom Hook is returning a function, it is recommended to wrap it inside a `useCallback`. So, the users don't have to optimize the Hook - rather, they can focus on their own code.

If you want to learn more about `useMemo` and `useCallback` hooks, check out my post below:

```component VPCard
{
  "title": "What's the Difference Between the useMemo and useCallback Hooks?",
  "desc": "React provides various hooks that make it easier to manage application state and other React features in functional components. Hooks provide class component features to functional components, and they don't need a lot of code compared to class components. Hooks also make your life easier by providing some convenient features...",
  "link": "/freecodecamp.org/difference-between-usememo-and-usecallback-hooks.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,10,0.2)"
}
```

---

## useReducer Hook

The `useReducer` Hook is another way to manage state in React applications. As your application grows, its state gets more and more complex. With time, it becomes difficult to handle complex state logic with `useState` Hook.

useReducer offers a more structured way to manage complex state by handling all state updates in a reducer function. This makes state management easier since all the state update logic is at one place.

Let's see how to use this hook with an example:

```jsx
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export function App(props) {
  const initialState = { count: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='App'>
      State: {state.count}
      <div>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      </div>
    </div>
  );
}
```

- This example contains a simple counter state with three actions: increment, decrement and reset.
- We define a reducer function that accepts the current state and an action object as arguments. The action object contains the action type (a string) and payload (data passed to the action).
- The `useReducer` Hook accepts the reducer function and an initial state, and returns an array containing the current state and a `dispatch` method.
- To update state, we call the `dispatch` method and pass the action type and payload in an object. We call this process, "dispatching an action".

When to use `useReducer`:

- Use this hook only when your component has complex state update logic. Since it involves writing more code, prefer `useState` for simpler state updates. The simple example provided is just for demonstration purpose.
- When there are a lot of state update actions with different logic, it makes sense to have them all in a separate function. With this, you just pass the action type and payload to a `dispatch` function and the reducer handles the state update.

If you want to understand more about the `useReducer` hook, check out my post:


```component VPCard
{
  "title": "React Hooks Tutorial - How to Use the useReducer Hook",
  "desc": "State is an important part of a React application. Most functionalities involve making state updates in your component. But as your application grows, state updates become more and more complex. These complex state updates might get overwhelming when...",
  "link": "/freecodecamp.org/usereducer-hook-react.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

So far, we have covered the most common hooks that React provides. Besides these, React also offers additional, less commonly uses hooks. So, if you are interested, read about them in the [<FontIcon icon="fa-brands fa-react"/>docs](https://react.dev/reference/react/hooks). However, learning the above hooks should be enough for your interviews.

---

## Custom Hooks

There are some situations where you may need to create your own hooks on top of the existing ones. Custom hooks provide re-usable functionality across multiple components and contribute to cleaner, maintainable code.

To create a custom Hook, first identify a piece of functionality that you want to re-use. Then, you can export it as a function with its name starting with the prefix 'use'.

Let's say you have multiple components that need to fetch data from APIs. You can export the fetching logic as a Hook to avoid duplicating code.

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

- In the `useFetch` custom hook, we fetched the data inside a `useEffect` Hook, just as would inside a component. We also handled loading and error states in the Hook.
- Finally, we return the data, with the loading and error states, allowing the component to use them for handling the rendering logic.

Let's use this in a component:

```jsx
const UserList = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

The `UsersList` component displays a list of users fetched from an API, and also renders “Loading” text and an error if any. To use the custom Hook, we called `useFetch` just like any other hook, and passed an API endpoint. We can further modify the `useFetch` custom hook to include request headers, request body, etc.

This way, custom Hooks help you abstract the logic from a component and make it re-usable throughout the application. There are several other use cases:

- Event listeners for events like window resizing, mouse movements or keyboard presses.
- Form handling, including form validation and submission.
- Themes, caches, transitions, and so on.

Check out the [<FontIcon icon="fa-brands fa-react"/>docs](https://react.dev/learn/reusing-logic-with-custom-hooks) to learn more about custom hooks.
