---
lang: en-US
title: "A guide to choosing the right React state management solution"
description: "Article(s) > A guide to choosing the right React state management solution"
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
      content: "Article(s) > A guide to choosing the right React state management solution"
    - property: og:description
      content: "A guide to choosing the right React state management solution"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/guide-choosing-right-react-state-management-solution.html
prev: /programming/js-react/articles/README.md
date: 2022-09-09
isOriginal: false
author:
  - name: Iva Kop
    url : https://blog.logrocket.com/author/ivakop/
cover: /assets/image/blog.logrocket.com/guide-choosing-right-react-state-management-solution/banner.png
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
  name="A guide to choosing the right React state management solution"
  desc="React state management comes with challenges developers should be prepared to overcome. Learn the best approach, tool, and pattern to do so."
  url="https://blog.logrocket.com/guide-choosing-right-react-state-management-solution"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/guide-choosing-right-react-state-management-solution/banner.png"/>

::: note

This article was updated 23 September 2022 to add information on why we need state management in React, add other state management tools previously not included in the article, such as Jotai, MobX, and Zustand, and add information on which state management tool is the best for React.

:::

![An Introduction To React State Management](/assets/image/blog.logrocket.com/guide-choosing-right-react-state-management-solution/banner.png)

State management is a fundamental challenge every developer faces when building a React app — and it is not a trivial one. There are many valid ways to manage state in React, and each one solves a salient set of problems.

As developers, it is important not only to be aware of the different approaches, tools, and patterns, but to also understand their use cases and trade-offs.

A helpful way to think about state management is in terms of the problems we solve in our projects. In this article, we’ll cover common use cases for managing state in React and learn when you should consider using each solution. We’ll accomplish this by building a simple counter app.

---

## Why do I need state management in React?

First, let’s discuss the importance of state management. State in React is a JavaScript object that can change the behavior of a component as a result of a user’s action. States can also be thought of as a component’s memory.

React apps are built with components that manage their own state. This works OK for small apps, but as the app grows in complexity, dealing with shared states between components gets increasingly complex and problematic.

Here’s a simple example of how a successful transaction within a fintech application might influence several other components:

- The new transaction will change the displaying available balance on the homepage
- The new transaction will now show up as the most recent one in the user’s total transaction history

This is why state management is essential when developing a scalable React application. In the long run, if state is not managed correctly, the app will undoubtedly encounter issues. Constantly troubleshooting and rebuilding an app like this might become tedious.

---

## Local component state in React

The simplest way to implement the counter is to use local component state with the `useState` Hook.

```jsx
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={decreaseCount}>-</button>
      <button onClick={increaseCount}>+</button>
    </div>
  );
};

export default Counter;
```

So we are done, right? Article over? Not quite.

If this was a real project, it is likely that in the future, we would need more buttons and headers elsewhere in our app. And it is a good idea to make sure they all look and behave consistently, which is why we should probably turn them into reusable React components.

---

## Component props in React

Turning our `Button` and `Header` into separate components reveals a new challenge. We need some way to communicate between them and the main `Counter` component.

This is where component props come into play. For our `Header` component, we add a `text` prop. For our `Button`, we need both a `label` prop and an `onClick` callback. Our code now looks like this:

```jsx :coallpsed-lines title="Counter.jsx"
import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const Counter = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div>
      <Header text={count} />
      <Button onClick={decreaseCount} label="-" />
      <Button onClick={increaseCount} label="+" />
    </div>
  );
};

export default Counter;
```

This looks great! But imagine the following scenario: what if we need to only display the count on our home route and have a separate route `/controls` where we display both the count and the control buttons? How should we go about this?

---

## Routing in React

Given that we are building a single page application, there is now a second piece of state we need to handle — the route we are on. Let’s see how this can be done with [<VPIcon icon="fas fa-globe"/>React Router](https://reactrouter.com), for example.

```jsx :collapsed-lines title="App.jsx"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const Home = ({ count }) => {
  return <Header text={count} />;
};

const Controls = ({ count, decreaseCount, increaseCount }) => {
  return (
    <>
      <Header text={count} />
      <Button onClick={decreaseCount} label="-" />
      <Button onClick={increaseCount} label="+" />
    </>
  );
};

const App = () => {
  const [count, setCount] = useState(0);
  const increaseCount = () => {
    setCount(count + 1);
  };
  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/controls">Controls</Link>
      </nav>
      <Switch>
        <Route path="/controls">
          <Controls
            increaseCount={increaseCount}
            decreaseCount={decreaseCount}
            count={count}
          />
        </Route>
        <Route path="/">
          <Home count={count} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
```

Nice! We now have our separate routes and everything works as expected. However, you may notice a problem. We are keeping our count state in `App` and using props to pass it down the component tree. But it appears that we pass down the same prop over and over again until we reach the component that needs to use it. Of course, as our app grows, it will only get worse. This is known as prop drilling.

Let’s fix it!

---

## Using React’s Context API with `useReducer`

Wouldn’t it be great if there is a way for our components to access the `count` state without having to receive it via a props? A combination of the React Context API and the `useReducer` Hook does just that:

```jsx :collapsed-lines title="App.jsx"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createContext, useContext, useReducer } from "react";

const initialState = 0;

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1 >= 0 ? state - 1 : 0;
    default:
      return state;
  }
};

const CountContext = createContext(null);

const useCount = () => {
  const value = useContext(CountContext);
  if (value === null) throw new Error("CountProvider missing");
  return value;
};

const CountProvider = ({ children }) => (
  <CountContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </CountContext.Provider>
);

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const Home = () => {
  const [state] = useCount();
  return <Header text={state} />;
};

const Controls = () => {
  const [state, dispatch] = useCount();
  return (
    <>
      <Header text={state} />
      <Button onClick={() => dispatch({ type: "DECREMENT" })} label="-" />
      <Button onClick={() => dispatch({ type: "INCREMENT" })} label="+" />
    </>
  );
};

const App = () => {
  return (
    <CountProvider>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/controls">Controls</Link>
        </nav>
        <Switch>
          <Route path="/controls">
            <Controls />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </CountProvider>
  );
};

export default App;
```

Awesome! We have solved the problem of prop drilling. We get additional points for having made our code more declarative by creating a descriptive reducer.

We are happy with our implementation, and, for many use cases, it is really all we need. But wouldn’t it be great if we could persist the count so it does not get reset to 0 every time we refresh the page? And to have a log of the application state? What about crash reports?

It would be very helpful to know the exact state that our app was in when it crashed, as well as how to take advantage of amazing dev tools while we are at it. Well, we can do exactly just that using Redux!

---

## Using Redux for state management

We can do all of the above and much more by using [<VPIcon icon="fas fa-globe"/>Redux](https://redux.js.org/) to manage the state of our app. The tool has a strong community behind it and a [<VPIcon icon="fas fa-globe"/>rich ecosystem](https://redux.js.org/introduction/ecosystem) that can be leveraged with ease.

Let’s set up our counter with [<VPIcon icon="fas fa-globe"/>Redux Toolkit](https://redux-toolkit.js.org/).

```jsx :collapsed-lines title=""
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector, useDispatch, Provider } from "react-redux";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
  },
});

const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});

const { increment, decrement } = counterSlice.actions;

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const Home = () => {
  const count = useSelector((state) => state.counter.value);
  return <Header text={count} />;
};

const Controls = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <Header text={count} />
      <Button onClick={() => dispatch(decrement())} label="-" />
      <Button onClick={() => dispatch(increment())} label="+" />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/controls">Controls</Link>
        </nav>
        <Switch>
          <Route path="/controls">
            <Controls />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
```

This looks really neat! Our state is now stored in the global Redux store and managed with pure functions (Redux Toolkit uses [<VPIcon icon="iconfont icon-github"/>`immerjs/immer`](https://github.com/immerjs/immer) under the hood to guarantee immutability). We can already take advantage of the awesome [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en).

<SiteInfo
  name="Redux DevTools"
  desc="Redux DevTools"
  url="https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en"
  logo="https://lh3.googleusercontent.com/yQq2WZi9-iZeUuBwJkrLq-7KVnaB_aIBgP8uqjT3vdIi6HC5v7Vni83rTQtk-WuSiZ_jcQ3I1hmXB03DNVFGX5nRcw=s120"
  preview="https://lh3.googleusercontent.com/ji5MEDLJ4bCt4FqacHWhcAAvC2aMXs537utkDQdTaFs4T3RgyZIwJRiXX9i9_SBcmJY219PE-lsCr0OmqJ29uC7Xbw=s1280-w1280-h800"/>

But what about things like handling side-effects, or making the state persistent, or implementing logging and/or crash reporting? This is where the Redux ecosystem we mentioned earlier comes into play.

There are multiple options to handle side-effects, including [<VPIcon icon="iconfont icon-github"/>`reduxjs/redux-thunk`](https://github.com/reduxjs/redux-thunk) and [<VPIcon icon="iconfont icon-github"/>`redux-saga/redux-saga`](https://github.com/redux-saga/redux-saga). Libraries like [<VPIcon icon="iconfont icon-github"/>`rt2zz/redux-persist`](https://github.com/rt2zz/redux-persist) are great for saving the data from the redux store in local or session storage to make it persistent.

In short, Redux is great! It’s used widely in the React world and for a good reason.

But what if we prefer a more decentralized approach to state management? Maybe we are worried about performance or have frequent data updates in different branches of the React tree, so we want to avoid unnecessary re-renders while keeping everything in sync.

Or, maybe we need a good way to derive data from our state and compute if efficiently and robustly on the client. And what if we want to achieve all of this without sacrificing the ability to have app-wide state observation? Enter Recoil.

---

## Atomic state with Recoil

It’s a bit of a stretch to suggest that we are able to hit the limits of React Context or Redux with a simple counter app. For a better atomic state management use case, check out [<VPIcon icon="fa-brands fa-youtue"/>Dave McCabe’s awesome video](https://youtu.be/ISAA_Jt9kI&t=39s) on [<VPIcon icon="fas fa-globe"/>Recoil](https://recoiljs.org/).

Nevertheless, thinking of state in terms of atoms does help expand our vocabulary of what state management could look like. Also, the Recoil API is fun to play with, so let’s reimplement our counter with it.

```jsx :collapsed-lines title="App.jsximport { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { atom, useRecoilState, RecoilRoot } from "recoil";

const countState = atom({
  key: "count",
  default: 0,
});

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const Home = () => {
  const [count] = useRecoilState(countState);
  return <Header text={count} />;
};

const Controls = () => {
  const [count, setCount] = useRecoilState(countState);
  const increaseCount = () => {
    setCount(count + 1);
  };
  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <>
      <Header text={count} />
      <Button onClick={decreaseCount} label="-" />
      <Button onClick={increaseCount} label="+" />
    </>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/controls">Controls</Link>
          </nav>
          <Switch>
            <Route path="/controls">
              <Controls />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </RecoilRoot>
  );
};

export default App;
```

Using Recoil feels very much like using React itself. A peek back at our initial examples reveals how similar the two are. Recoil also has its very own set of [<VPIcon icon="fas fa-globe"/>dev tools](https://recoiljs.org/docs/guides/dev-tools/). An important consideration to keep in mind is that this library is still experimental and subject to change. Use it with caution.

Okay, we can have a Recoil counter. But state management preferences depend on our priorities. What if the app is built by a team and it is really important that the developer, the designer, the project manager, and everyone else speak the same language when it comes to user interfaces?

What if, in addition, this language could be directly expressed with highly declarative code in our app? And what if we could guarantee that we never reach impossible states, thereby eliminating a whole class of bugs? Guess what? We can.

---

## State machines with XState

All of the above can be achieved with the help of state charts and state machines. State charts help visualize all the possible states of our app and define what is possible. They are easy to understand, share, and discuss within the entire team.

Here is our counter as a state chart:

![Counter Is Allowed To Increase, It Is Not Possible For Counter To Decrease](/assets/image/blog.logrocket.com/guide-choosing-right-react-state-management-solution/counter-state-chart.png)

Although this is a trivial implementation, we can already see one cool advantage of using state machines. Initially, it is not possible to decrement the counter, as its initial value is 0. This logic is declared right our state machine and visible on the chart, where with other approaches we explored, it was harder, generally speaking, to find the right place for it.

Here is our state machine in practice:

```jsx :collapsed-lines title="App.jsx"import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useMachine } from "@xstate/react";
import { createMachine, assign } from "xstate";

export const counterMachine = createMachine({
  initial: "active",
  context: { count: 0 },
  states: {
    active: {
      on: {
        INCREMENT: {
          actions: assign({ count: (ctx) => ctx.count + 1 }),
        },
        DECREMENT: {
          cond: (ctx) => ctx.count > 0,
          actions: assign({
            count: (ctx) => ctx.count - 1,
          }),
        },
      },
    },
  },
});

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const Home = () => {
  const [state] = useMachine(counterMachine);
  return <Header text={state.context.count} />;
};

const Controls = () => {
  const [state, send] = useMachine(counterMachine);
  return (
    <>
      <Header text={state.context.count} />
      <Button onClick={() => send("DECREMENT")} label="-" />
      <Button onClick={() => send("INCREMENT")} label="+" />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/controls">Controls</Link>
      </nav>
      <Switch>
        <Route path="/controls">
          <Controls />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
```

Wow, this is really great! However, we are only [**barely scratching the surface of state machines here**](/blog.logrocket.com/using-state-machines-with-xstate-and-react.md). To find out more about them, check out the docs for [<VPIcon icon="fas fa-globe"/>XState](https://xstate.js.org/docs/).

Alright, last scenario! What happens if our simple frontend counter app has a backend? What if we need to communicate with a server in order to get or modify the count? What if, in addition, we want to handle data-fetching-related challenges like asynchronicity, loading states, caching, and re-fetching?

---

## Primitive and flexible state management with Jotai

We’ve already covered the atomic model in the Recoil section, and Jotai follows a similar approach to this. [**Jotai is even inspired by the Recoil atomic model**](/blog.logrocket.com/jotai-vs-recoil-what-are-the-differences.md), so this should be a walk in the park for us. Let’s reimplement our counter app, but with Jotai this time.

```jsx :collapsed-lines title="App.jsx"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { atom, useAtom } from "jotai";

// Create your atoms and derivatives
const countState = atom(0);

const Header = ({ text }) => {
  text;
};

const Button = ({ label, onClick }) => {
  label;
};

const Home = () => {
  const [count] = useAtom(countState);
  return;
};

const Controls = () => {
  const [count, setCount] = useAtom(countState);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <>
    </>
  );
};


const App = () => {
  return (
    <Home />
    <Controls />
  )
}

export default App
```

We can see how fairly similar Jotai is to Recoil. Using Jotai also feels like using React’s `useState`.

With Jotai, state can be created by combining atoms, and renders are optimized according to atom dependency. This eliminates the requirement for the memoization technique and overcomes the extra rerender issue of React context.

---

## Simple, scalable state management with MobX

MobX is highly influenced by the principals of object-oriented programming and reactive programming. It allows you to identify specific pieces of data as “observable,” then wraps those up and tracks any changes made to that data, updating any other code that is observing the data.

It’s fairly easy to rewrite the state management for our counter app using MobX, so let’s do that:

```jsx :collapsed-lines title="App.jsx"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { observable, action } from "mobx";

const appState = observable({
  count: 0,
  incCounter: action("decrease", function () {
    appState.count += 1;
  }),
  decCounter: action("increase", function () {
    appState.count -= 1;
  }),
});

const Header = ({ text }) => {
  text;
};

const Button = ({ label, onClick }) => {
  label;
};

const Home = () => {
  const count = appState.count;
  return;
};

const Controls = () => {
  const count = appState.count;

  const increaseCount = appState.incCounter;

  const decreaseCount = () => {
    if (count > 0) {
      appState.decCounter;
    }
  };
  return <></>;
};

const App = () => {
  return (
    <Home />
    <Controls />
  )
}

export default App
```

---

## Using Zustand for state management

[**Zustand is a state management library that is both powerful and compact**](/blog.logrocket.com/managing-react-state-zustand.md). Its API is built around hooks, making it simple to comprehend and use. Zustand addresses common issues such as the [<VPIcon icon="fas fa-globe"/>zombie child problem](https://react-redux.js.org/api/hooks#stale-props-and-zombie-children), [React concurrency (<VPIcon icon="iconfont icon-github"/>`bvaughn/rfcs`)](https://github.com/bvaughn/rfcs/blob/useMutableSource/text/0000-use-mutable-source.md), and [context loss (<VPIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react/issues/13332) between mixed renderers.

Let’s set up our counter app using Zustand:

```jsx :collapsed-lines title="App.jsx"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import create from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

const Header = ({ text }) => {
  text;
};

const Button = ({ label, onClick }) => {
  label;
};

const Home = () => {
  const count = useStore((state) => state.count);
  return;
};

const Controls = () => {
  const count = useStore((state) => state.count);

  const increaseCount = useStore((state) => state.increment);

  const decreaseCount = () => {
    if (count > 0) {
      useStore(useStore((state) => state.decrement));
    }
  };
  return <></>;
};


const App = () => {
  return (
    <Home />
    <Controls />
  )
}

export default App
```

Zustand is simple to use and set up; all you need to do is create a store (your store is a hook! ), as seen in the example above. A store can contain anything, including functions, objects, and primitives. We can now use our hook across our application.

Both Zustand and Redux are based on an immutable state model, thus, if you understand Redux, you should be able to understand Zustand.

---

## Data fetching with React Query

The final React state management tool I want to highlight is [<VPIcon icon="fas fa-globe"/>React Query](https://react-query.tanstack.com/). It is specifically designed to make data fetching easy and to solve the problems outlined above (and more). Let’s see it in action.

```jsx :collapsed-lines title="App.jsx"import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import axios from "axios";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "react-query";

const useCount = () => {
  return useQuery("count", async () => {
    const { data } = await axios.get("https://our-counter-api.com/count");
    return data;
  });
};

const useIncreaseCount = () => {
  return useMutation(() =>
    axios.post("https://our-counter-api.com/increase", {
      onSuccess: () => {
        queryClient.invalidateQueries("count");
      },
    })
  );
};

const useDecreaseCount = () => {
  return useMutation(
    () => axios.post("https://our-counter-api.com/descrease"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("count");
      },
    }
  );
};
const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const Home = () => {
  const { status, data, error } = useCount();
  return status === "loading" ? (
    "Loading..."
  ) : status === "error" ? (
    <span>Error: {error.message}</span>
  ) : (
    <Header text={data} />
  );
};

const Controls = () => {
  const { status, data, error } = useCount();
  const increaseCount = useIncreaseCount();
  const decreaseCount = useDecreaseCount();

  return status === "loading" ? (
    "Loading..."
  ) : status === "error" ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      <Header text={data} />
      <Button onClick={() => decreaseCount.mutate()} label="-" />
      <Button onClick={() => increaseCount.mutate()} label="+" />
    </>
  );
};
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ReactQueryDevtools />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/controls">Controls</Link>
        </nav>
        <Switch>
          <Route path="/controls">
            <Controls />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
```

The above is a fairly naive implementation with plenty of room for improvement. What is important to note is the ease with which we can make server calls, cache them, and invalidate the cache when needed. In addition, with React Query the task of managing loading and error states in the component becomes much simpler.

It is a great tool that can be used with any backend. [**If you want to know how to set it up with GraphQL, check out my article about it**](/blog.logrocket.com/making-graphql-requests-easy-with-react-typescript-and-react-query.md).

---

## Which state management tool is the best for React?

All of the state management libraries discussed above try to solve the same problem, with each offering a unique method for handling shared data across an entire application.

Finding the best state management library is dependent on both the project you’re working on and your own personal preference. Some libraries might be an overkill for cases where React’s `useState` is perfect for the job.

Redux has inarguably been a longtime community favorite, and it can be found in many older React codebases. As a result of this, having a thorough understanding of Redux is really beneficial in general.

In general, learning Redux and Recoil is a good route to proceed. Recoil handles the problem of state management effectively with a very low learning curve, and a thorough understanding of Redux would substantially cut the time it would take to maintain an older React codebase.

---

## Conclusion

State management in React is an extensive topic. The list of approaches, patterns, and libraries, discussed in this article is neither comprehensive nor definitive. The goal is rather to illustrate the thought process behind solving a specific problem in a particular way.

In the end, what state management in React comes down to is being aware of the different options, understanding their benefits and trade-offs, and ultimately, going with the solution that fits our use case the best.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A guide to choosing the right React state management solution",
  "desc": "React state management comes with challenges developers should be prepared to overcome. Learn the best approach, tool, and pattern to do so.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/guide-choosing-right-react-state-management-solution.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
