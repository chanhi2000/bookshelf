---
lang: en-US
title: "Understanding common frustrations with React Hooks"
description: "Article(s) > Understanding common frustrations with React Hooks"
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
      content: "Article(s) > Understanding common frustrations with React Hooks"
    - property: og:description
      content: "Understanding common frustrations with React Hooks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/understanding-common-frustrations-react-hooks.html
prev: /programming/js-react/articles/README.md
date: 2021-04-26
isOriginal: false
author:
  - name: Paul Cowan
    url : https://blog.logrocket.com/author/paulcowan/
cover: /assets/image/blog.logrocket.com/understanding-common-frustrations-react-hooks/banner.png
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
  name="Understanding common frustrations with React Hooks"
  desc="React Hooks can be frustrating despite their popularity and widespread use. Learn about some of the drawbacks to using React Hooks."
  url="https://blog.logrocket.com/understanding-common-frustrations-react-hooks"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/understanding-common-frustrations-react-hooks/banner.png"/>

::: note Editor’s note

This React Hooks article was last updated on 4 August 2022 to include a section about common error messages in React Hooks.

:::

![Frustrations With React Hooks](/assets/image/blog.logrocket.com/understanding-common-frustrations-react-hooks/banner.png)

React Hooks launched through v16.8 in February of 2019. Though they aimed to allow users to use state and other React features without the need for writing a class. Though this seemed exciting at first, there are a few frustrations and pitfalls that have come with it.

In this article, we’ll go over the common frustrations with React Hooks. We’ll discuss the problem React Hooks intends to solve, what was wrong with the class component, as well as common error messages you may see in React Hooks and how to solve them. Let’s get started!

---

## What problems do React Hooks solve?

Before I detail my frustrations with [**React Hooks**](https://blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems/), I want to state for the record that I am, for the most part, a fan of React Hooks.
<!-- TODO: /blog.logrocket.com/react-hooks-cheat-sheet-unlock-solutions-to-common-problems.md -->

I often hear that the main reason for the existence of Hooks is to replace class components. Sadly, the main heading in the official React site’s post [<FontIcon icon="fa-brands fa-react"/>introducing Hooks](https://reactjs.org/docs/hooks-intro.html) undersells Hooks with this not-so-bold statement:

::: info <FontIcon icon="fa-brands fa-react"/>legacy.reactjs.org

> Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

<SiteInfo
  name="Introducing Hooks - React"
  desc="A JavaScript library for building user interfaces"
  url="https://legacy.reactjs.org/docs/hooks-intro.html/"
  logo="https://legacy.reactjs.org/favicon-32x32.png?v=f4d46f030265b4c48a05c999b8d93791"
  preview="https://legacy.reactjs.org/logo-og.png"/>

:::

“This explanation does not give me a lot of motivation to use React Hooks apart from “Classes are not cool, man!””

For my money, React Hooks allow us to address cross-cutting concerns in a much more elegant way than the previous patterns such as [<FontIcon icon="fa-brands fa-react"/>mixins](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html), [<FontIcon icon="fa-brands fa-react"/>higher-order components](https://reactjs.org/docs/higher-order-components.html), and [<FontIcon icon="fa-brands fa-react"/>render props](https://reactjs.org/docs/render-props.html). Functionalities such as logging and authentication are not component-specific and React Hooks allow us to attach this type of reusable behavior to components.

---

## What was wrong with class components?

There is something beautiful and pure about the notion of a stateless component that takes some props and returns a React element. It is a pure function and as such, side effect free.

```jsx
export const Heading: React.FC = ({ level, className, tabIndex, children, ...rest }) => {
  const Tag = `h${level}` as Taggable;

  return (
    {children}
  );
};
```

Unfortunately, the lack of side effects makes these stateless components a bit limited, and in the end, something somewhere must manipulate state. If the component needed to maintain state between render cycles, class components were the only show in town. These class components, often called container components, execute the side effects and pass props down to these pure stateless component functions.

There are several well-documented problems with [**class-based lifecycle events**](/blog.logrocket.com/react-lifecycle-methods-tutorial-examples.md). One of the biggest complaints is that you often have to repeat logic in `componentDidMount` and `componentDidUpdate`.

```js
async componentDidMount() {
  const response = await get(`/users`);
  this.setState({ users: response.data });
};

async componentDidUpdate(prevProps) {
  if (prevProps.resource !== this.props.resource) {
    const response = await get(`/users`);
    this.setState({ users: response.data });
  }
};
```

If you have used React for any length of time, you will have encountered this problem.

With React Hooks, this side effect code can be handled in one place using the [<FontIcon icon="fa-brands fa-react"/>effect Hook](https://reactjs.org/docs/hooks-effect.html).

```js
const UsersContainer: React.FC = () => {
  const [ users, setUsers ] = useState([]);
  const [ showDetails, setShowDetails ] = useState(false);

 const fetchUsers = async () => {
   const response = await get('/users');
   setUsers(response.data);
 };

 useEffect(() => {
   fetchUsers(users)
 }, [ users ]);

 // etc.
}
```

The `useEffect` Hook is a considerable improvement, but this is a big step away from the pure stateless functions we previously had. Which brings me to my first frustration.

---

## Yet another JavaScript paradigm to learn

For the record, I am a 50-year-old React fanboy. The one-way data flow will always have a place in my heart after working on an [<FontIcon icon="fas fa-globe"/>ember](https://emberjs.com/) application with the insanity of observers and computed properties.

The problem with `useEffect` and friends is that it exists nowhere else in the JavaScript landscape. It is unusual and has quirks, and the only way for me to become proficient and iron out these quirks is to use it in the real world and experience some pain.

No tutorial using counters is going to get me into the flow. I am a freelancer and use other frameworks apart from React, and this gives me fatigue. The fact that I need to set up the [<FontIcon icon="fa-brands fa-npm"/>`eslint-plugin-react-hooks`](https://npmjs.com/package/eslint-plugin-react-hooks) to keep me on the straight and narrow for this specific paradigm does make me feel a bit wary.

---

## To hell and back with the dependencies array

The [<FontIcon icon="fa-brands fa-react"/>`useEffect`](https://reactjs.org/docs/hooks-effect.html) Hook can take an optional second argument called the dependencies array that allows you to optimize when React would execute the effect callback. React will make a comparison between each of the values via [<FontIcon icon="fa-brands fa-firefox"/>`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) to determine whether anything has changed. If any of the elements are different than the last render cycle, then the effect will be run against the new values.

The comparison works great for primitive JavaScript types, but problems can arise if one of the elements is an object or an array. `Object.is` will compare objects and arrays by reference, and there is no way to override this functionality and supply a custom comparator.

Checking the equality of objects or functions by reference is a common gotcha, and I can illustrate this with the following scaled-down version of a problem I encountered:

```tsx title="App.tsx"
const useFetch = (config: ApiOptions) => { 
  const [data, setData] = useState(null);

  useEffect(() => {
    const { url, skip, take } = config;
    const resource = `${url}?$skip=${skip}&amp;take=${take}`;
    axios({ url: resource }).then(response => setData(response.data));
  }, [config]); // <-- will fetch on each render

  return data;
};

const App: React.FC = () => {
  const data = useFetch({ url: "/users", take: 10, skip: 0 });
  return <div>{data.map(d => <div>{d})}</div>;
};
```

On line 14, a new object is passed into `useFetch` on each render if we do not do something to ensure the same object is used each time. In this scenario, it would be preferable to check this object’s fields and not the object reference.

I do understand why React has not gone down the route of doing deep object compares. You can get into some serious performance problems if not careful. I do seem to revisit this problem a lot, and there are a [number of fixes for this (<FontIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react/issues/14476#issuecomment-471199055). The more dynamic your objects are, the more workarounds you start adding.

There is an [ESLint plugin (<FontIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks) that you really should be using with [<FontIcon icon="fas fa-globe"/>the automatic -fix setup](https://oprea.rocks/blog/automatically-fix-eslint-code-validation-errors-in-visual-studio-code/) in your text editor of choice to apply ESLint fixes automatically. I do worry about any new feature that requires an external plugin to check correctness.

The fact that [<FontIcon icon="iconfont icon-github"/>`kentcdodds/use-deep-compare-effect`](https://github.com/kentcdodds/use-deep-compare-effect), [<FontIcon icon="iconfont icon-github"/>`alexreardon/use-memo-one`](https://github.com/alexreardon/use-memo-one), and others exist is a testimony to this being a common enough problem, or, at the very least, a point of confusion.

---

## React relies on the order in which Hooks are called

Some of the first custom React Hooks to hit the shelves were several `useFetch` implementations that use Hooks to query a remote API. Most skirt around the issue of calling the remote API from an event handler because Hooks can only be called from the start of a functional component.

What if the data we have has pagination links and we want to rerun the effect when the user clicks a link? Below is a simple `useFetch` example:

```tsx :collapsed-lines title="App.tsx"
const useFetch = (config: ApiOptions): [User[], boolean] => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { skip, take } = config;

    api({ skip, take }).then(response => {
      setData(response);
      setLoading(false);
    });
  }, [config]);

  return [data, loading];
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<ApiOptions>({
    take: 10,
    skip: 0
  });

  const [users, loading] = useFetch(currentPage);

  if (loading) {
    return <div>loading....</div>;
  }

  return (
    <>
      {users.map((u: User) => (
        <div>{u.name}</div>
      ))}
      <ul>
        {[...Array(4).keys()].map((n: number) => (
          <li>
            <button onClick={() => console.log('what do we do now?')}>{n + 1}</button>
          </li>
        ))}
      </ul>
    </>
  );
};
```

The `useFetch` Hook will be called once on the first render with this code:

```tsx
<ul>
  {[...Array(4).keys()].map((n: number) => (
    <li>
      <button onClick={() => console.log('what do we do now?')}>{n + 1}</button>
    </li>
  ))}
</ul>
```

But how would we call the `useFetch` Hook from the event handlers of these buttons?

The rules of React Hooks clearly state:

> Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function.

React Hooks need to be called in the same order each time the component renders. [<FontIcon icon="fas fa-globe"/>Overreacted](https://overreacted.io/why-do-hooks-rely-on-call-order/) beautifully articulates several reasons why this is the case.

You definitely cannot do this:

```tsx
<button onClick={() => useFetch({ skip: n + 1 * 10, take: 10 })}>
  {n + 1}
</button>
```

Calling the `useFetch` Hook from an event handler breaks the rules of Hooks because you would break the order in which the Hooks are called on each render.

---

## Return an executable function from the Hook

Many Hooks now return a function that can be called from outside of the top-level declaration. The rules of React Hooks still hold and the call to `/api/user/1` can be triggered from an event handler.

The code below is from a package I wrote called [react-abortable-fetch (<FontIcon icon="iconfont icon-github"/>`dagda1/cuttingedge`)](https://github.com/dagda1/cuttingedge/tree/main/packages/react-abortable-fetch):

```jsx
const { run, state } = useFetch(`/api/users/1`, { executeOnMount: false });

return (
  <button
    disabled={state !== 'READY'}
    onClick={() => {
      run();
    }}
  >
    DO IT
  </button>
);
```

The call `useFetch` returns an object with both a state property and a `run` function. The `run` function will actually execute the remote query.

---

## Common error messages in React Hooks

React Hooks often throws some frustrating errors. Let’s go over some of these common error messages in React Hooks and discuss why they occur.

### “React Hook cannot be called inside a callback”

This error occurs when a React Hook is called in nested functions. Let’s see an example:

```jsx :collapsed-lines title="App.jsx"
import React, { useState } from "react";

export const WithCounter = (WrappedComponent) => {
  return (props) => {
    const [count, setCount] = useState(0);
    const increment = () => setCount((count) => count + 1);
    return <WrappedComponent count={count} increment={increment} {...props} />;
  };
};

const ClickCounter = (props) => {
  return <button onClick={props.increment}>clicked {props.count} times</button>;
};

export default function App() {
  const Comp = WithCounter(ClickCounter);
  return (
    <div className="App">
      <Comp />
    </div>
  );
}
```

See that we have a high order calculation `WithCounter`. In its callback function, notice that we are using `useState` hook. This fails the rule of React Hook.

The above code will throw `React Hook "useState" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function.` error. In line 5, `const [count, setCount] = useState(0);`, we are calling the React `useState` Hook there. Even though the function is used as component in the `App` component, React will treat the component as a callback function.

React Hooks should not be called in nested functions

### “React Hooks must be called in a React function component or a custom React Hook function”

This error is similar to the above error that we just learned. React Hooks must be called inside a React function component or a custom React hook.

Let’s say that we have a React component, `App`:

```jsx title="App.jsx"
function App() {}
```

We can call any React Hooks or custom Hooks here:

```jsx title="App.jsx"
function App() {
  const [counter, setCounter] = useState(0);
}
```

We just called a `useState` hook in the `App` component. This is in line with React’s rule of Hooks. But now, let’s say that we have a function in `App` component like this:

```jsx title="App.jsx"
function App() {
  const counterFn = () => {
    const [counter, setCounter] = useState(0);
    setCounter(counter++)
  }

  return (
    <>
      <div>
        <button onClick={counterFn}>Incr Counter</button>
      </div>
    </>
  )
}
```

This is a bad way to use React Hooks. See that we are calling `useState` inside a function. This will throw the error: `React hooks must be called in a React function component or a custom React hook function` . This is because the `onClick` function handler `counterFn` is not a functional component.

We can call a React Hook inside a custom React Hook. Now, React knows that a function is a Hook with its name starting with `use` and may call other React Hooks.

Let’s see an example:

```js
function useCounter() {
  let counter = 0
  const setCounter = () => {
    counter++
  }
  return { counter, setCounter }
}
```

The above function is a custom React Hook because its name starts with `use`.

```js
function useCounter() {
  const [counter, setCounter] = useState(0)
  return { counter, setCounter }
}
```

This also is a custom React Hook. Not only does its name start with `use`, but it calls the React `useState` hook. As much as `useCounter` is a function and not a React functional component, it is viable to call a React Hook inside it. In this case, React won’t give us the `React hooks must be called in a React function component or a custom React hook function` error.

### “React Hook `useEffect` has a missing dependency”

This error occurs if we are miss adding a necessary dependency to the `useEffect` hook dependency array. Let’s see an example:

```jsx title="List.jsx"
function List(props) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(counter)
  }, []);

  return <div>Counter: {counter} </div>;
}
```

We have a `useEffect` here. In this circumstance, the `useEffect` will run once on initial mount and will not run again. Now, looking at the callback inside the `useEffect`, we see that it calls `setCounter` with the `counter` state as a parameter.

We can see that `useEffect` is dependent on the `counter` state. In this case, React will show the warning: `Either include it or remove the dependency array. eslintreact-hooks/exhaustive-deps`.

To avoid this error, we will need to either remove the dependency array or include `counter` state in the dependency array. Let’s include the `counter` state in the `useEffect` dependency array:

```jsx title="List.jsx"
function List(props) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(counter)
  }, [counter]);

  return <div>Counter: {counter} </div>;
}
```

Now, this will clear the warning in our console.

---

## Conclusion

React Hooks have problems, and there is no getting around this fact. I have always loved React’s declarative approach, where state changes and the UI updates. The dependency arrays of `useEffect` and friends sound like a declarative way of making this happen.

If the dependency array only contains primitives, then this is great. Unfortunately, problems arise when you have objects and functions in the dependency array. Reference checking is how objects and functions are compared in JavaScript natively. An ill-placed arrow function will lead to a `useEffect` Hook spinning into an infinite loop. Developers are then left to ponder the choice between `useCallback`, `useRef`, `useMemo`, etc., to come up with the winning formula.

The fact that React Hooks can only be called from the top-level leads to workarounds that should be handled at the framework level.

React Hooks also force you into working with closures, and I have many scars from unexpected things happening when working with closures. Stale state due to code executing in a closure is one of the problems the Hooks linter sets out to cure.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding common frustrations with React Hooks",
  "desc": "React Hooks can be frustrating despite their popularity and widespread use. Learn about some of the drawbacks to using React Hooks.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/understanding-common-frustrations-react-hooks.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
