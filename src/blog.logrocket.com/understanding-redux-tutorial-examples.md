---
lang: en-US
title: "Understanding Redux: A tutorial with examples"
description: "Article(s) > Understanding Redux: A tutorial with examples"
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
      content: "Article(s) > Understanding Redux: A tutorial with examples"
    - property: og:description
      content: "Understanding Redux: A tutorial with examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/understanding-redux-tutorial-examples.html
prev: /programming/js-react/articles/README.md
date: 2024-10-17
isOriginal: false
author:
  - name: Neo Ighodaro
    url : https://blog.logrocket.com/author/nighodaro/
cover: /assets/image/blog.logrocket.com/understanding-redux-tutorial-examples/banner.png
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
  name="Understanding Redux: A tutorial with examples"
  desc="This guide provides a foundational understanding of Redux and why you should use it for state management in a React app."
  url="https://blog.logrocket.com/understanding-redux-tutorial-examples"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/understanding-redux-tutorial-examples/banner.png"/>

::: note Editor’s note

This React Redux tutorial was last updated by [<FontIcon icon="fas fa-globe"/>Rahul Chhodde](https://blog.logrocket.com/author/rahulchhodde/) on 17 October 2024 to revise the code examples, add a comparison between Redux, the Context API, and `useState`, and provide additional details on Redux middleware. You can find the project’s source code in this [GitHub repository (<FontIcon icon="iconfont icon-github"/>`c99rahul/ts-react-redux`)](https://github.com/c99rahul/ts-react-redux).

:::

---

## An introduction to state management and Redux

![Understanding Redux: A Tutorial With Examples](/assets/image/blog.logrocket.com/understanding-redux-tutorial-examples/banner.png)

Redux is a predictable state container designed to help you write JavaScript apps that behave consistently across client, server, and native environments. Redux is also used to create JavaScript apps that are easy to test, and it allows you to see otherwise invisible states while working with different components.

But is Redux part of React? No — although it’s commonly used as a state management tool with React, you can use Redux with any other JavaScript framework or library. The core Redux library is lightweight, weighing about 2kB (including dependencies), so you don’t have to worry about it making your application’s asset size bigger.

With Redux, the state of your application is kept in a centralized store, from where any component can access the state it needs. If you are new to Redux, [<FontIcon icon="fa-brands fa-youtube"/>this video](https://youtu.be/5yEG6GhoJBs) is a great resource for beginners.

---

## What is Redux used for?

Now that we have a basic idea of what Redux is, let’s dive a bit deeper into the general functioning of Redux as a state management library.

Redux is used to maintain and update data across your application for multiple components to share while also remaining independent of them. A large application often demands storing the state at a central location and sharing it among the different components. That is where the Redux store comes into the picture.

As we progress, we’ll look at Redux more closely. For now, here’s the general idea of how Redux facilitates states in a JavaScript app:

![Sharing State Between Components With Redux](/assets/image/blog.logrocket.com/understanding-redux-tutorial-examples/sharing-state-between-components-redux.png)

---

## When to use Redux

Redux allows you to manage your app’s state in a single place and makes the changes in your app easier to understand by keeping them more predictable and traceable. But with all of these benefits comes a set of challenges.

Not long after its release, Redux became one of the hottest topics of debate in the frontend world, mostly because of the complexity it used to add.

Some developers argue that Redux introduces unnecessary boilerplate code, potentially complicating otherwise simple tasks. This is no longer the case, as Redux has made some improvements in the past few updates, especially in this specific area. It has [**solved the boilerplate problem with Redux Toolkit**](/blog.logrocket.com/redux-toolkit-adoption-guide.md), making state management relatively easy.

So, when should you use Redux? This mostly depends on the architectural decisions of the project. A simple answer to this question is that you will organically realize whether or not you need Redux or a similar solution with the growing size of your application.

Knowing some of the benefits that Redux offers might help you make that decision.

---

## The Benefits of Using Redux

When using Redux with React, states no longer need to be lifted. This makes it easier to predict and trace which action causes what change. We’ll discuss this more thoroughly in a later section.

With states managed entirely by Redux, components don’t have to provide any state or method for its children components to share data among themselves. This greatly simplifies state management in big applications and makes them easier to maintain.

This is not the only benefit that Redux provides. Here’s a list summarizing what you stand to gain by using Redux for state management.

### Redux makes the state predictable

In Redux, the state is always predictable because of immutability. If the same state and action are passed to a reducer, they will always produce the same results because the state is immutable, as reducers are pure functions that won’t cause any side effects.

The immutability of states makes it possible to implement difficult tasks like infinite undo and redo. It is also possible to implement time travel — that is, the ability to move back and forth between the previous states and view the results in real time.

### Redux is maintainable

It’s critical for large-scale apps to keep your app more predictable and maintainable. Redux is strict about code organization, making it easier for someone with prior knowledge of the library to understand the structure of any Redux-based application. This generally simplifies the maintainability and helps you segregate the business logic from the component tree.

### Debugging is easy in Redux

For medium to large-scale apps, debugging takes more time than developing features. Managing states with Redux makes it easier for you to debug your applications because of its centralized stores and predictable changes in state.

With the ability to log dispatched actions, one can easily understand coding errors, network errors, and other bugs that might come up during production. Besides Redux Logger, [**Redux DevTools**](/blog.logrocket.com/redux-devtools-tips-tricks-for-faster-debugging.md) allow you to time travel actions, persist actions on page refresh, compare previous and current states with snapshots, and more.

### Performance benefits

You might assume that keeping the app’s state global would result in some performance degradation. To a large extent, that’s not the case. React Redux handles performance optimizations internally so that the connected components only re-render when they actually need to.

### Ease of testing

It is easy to test Redux apps because they rely on pure functions, resulting in immutable and predictable states. The tests can simply call a pure function with specific parameters and check if the return value matches the expected result.

### State persistence

With Redux, you can persist some of the app’s state to the `localStorage` object, allowing you to restore the state even after the page is refreshed.

### Server-side rendering

Redux can also be used to facilitate server-side rendering. With it, you can handle the initial render of the app by sending necessary action from the server to the Redux store to load data and produce the initial state. Based on this initial state, the server can render the components in HTML and send them with the app’s initial state to the client.

---

## Using Redux with React

As mentioned earlier, Redux is a standalone library that can be used with different JavaScript frameworks including Angular, Inferno, Vue, Preact, and more. It is known for being most commonly used with React.

Redux pairs well with React because of its uni-directional flow of data. That means data cannot be sent from a child to a parent; it has to flow downward from the parent to the child.

Redux works particularly well with the systems incorporating this design pattern where we cannot directly modify the state. Instead, we dispatch actions that intend to change the state, and then separately, we observe the resulting state changes.

### Redux vs. `useState`

Most libraries, such as React and Angular, provide built-in features for components to internally manage their state without needing an external library or tool. This works well for applications with few components, but managing states shared across components becomes a hassle as an application grows larger.

It might be confusing to know where a state should live in an app where data is shared among several components. Ideally, the data to be shared should live in just one common parent component to facilitate data sharing among sibling components. This technique is commonly known as “lifting state up” and can become challenging when dealing with many such sibling components.

In simpler words, to share data among siblings in React, a state has to live in the parent component. A method for updating that state is provided by the parent component and passed as props to these sibling components.

Here’s a simple example of a React app using some components to set up a login form. The input of the login component affects how its sibling component behaves. This behavior is handled by managing a couple of `useState` hooks, which provide states for the two components as shown below:

```jsx title="App.jsx"
// Associated imports...
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // A real app would perform actual authentication here
    if (username.trim() !== '') {
      setIsLoggedIn(true);
    }
  }

  return (
    <div>
      <StatusDisplay isLoggedIn={isLoggedIn} username={username} />
      <LoginForm 
        onLogin={handleLogin} 
        username={username} 
        setUsername={setUsername}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}

export default App;
```

::: note

Remember, the parent component does not need this data, but because its children must share some data, it has to provide a state.

:::

It’s not hard to imagine what happens when a state has to be shared between components that are far apart in the component tree. In that case, the state will have to be lifted to the nearest parent component and upwards until it gets to the closest common ancestor of both components needing the state, and then it is passed down. This makes the state difficult to maintain and less predictable.

It’s evident now that state management gets messy as the app gets more complex and demands a state management tool like Redux to simplify state maintainability.

### Redux vs. The Context API

Let’s look at another practice in modern JavaScript frontend solutions, called [**prop drilling**](/blog.logrocket.com/solving-prop-drilling-react-apps.md), that can lead to problems in growing applications.

In a frontend solution like React, if the data needs to be passed from a parent to a child deep down the tree while also avoiding prop drilling, this can still be accomplished using the built-in state features like the [**Context API**](/blog.logrocket.com/react-context-tutorial.md).

Paired with the native `useReducer` Hook, the Context API might be sufficient to handle states locally in smaller to medium-sized apps.

But as the app grows, adding more such contexts and hooks will unnecessarily complicate the task of state management. At this point, sharing states between components regardless of their relationships becomes inevitable, and demands a more structural approach, which is exactly what Redux offers.

### Redux Toolkit (RTK)

Redux is indeed a great state management utility, especially for React-based apps. However, as mentioned before, it is known to add a lot of boilerplate to your application due to its verbose API.

To cut down the boilerplate, Redux provides a handy extension, popularly known as the [<FontIcon icon="fas fa-globe"/>Redux Toolkit](https://redux-toolkit.js.org/), which is recommended for use in a React-Redux setup. We’ll cover the advantages of RTK and its utilities as we discuss the core concepts of Redux.

---

## How Redux works

The way Redux works is simple. There is a central store that holds the entire state of the application. Each component can access the stored state without sending down props from one component to another.

There are five core Redux components — store, actions, reducers, dispatch, and selectors. Let’s briefly discuss what each of them does and form a working state management pattern together.

To explain these components, we’ll implement a simple React component and manage its state using Redux. For simplicity, I’ll cover all the code in the article in JavaScript, however, [the main branch of this project on GitHub (<FontIcon icon="iconfont icon-github"/>`c99rahul/ts-react-redux`)](https://github.com/c99rahul/ts-react-redux) covers everything in TypeScript as well. For JavaScript-only code, [see the JavaScript branch (<FontIcon icon="iconfont icon-github"/>`c99rahul/ts-react-redux`)](https://github.com/c99rahul/ts-react-redux/tree/javascript).

::: note

`store` refers to the object that holds the application data shared between components.

:::

### Redux actions

Redux actions can be seen as events and are the only way to send data from your application to your Redux store. The data can be based on any event such as user interactions like form submissions, or API calls.

Actions are plain JavaScript objects that must have:

- A `type` property (required in every Redux action) to indicate the type of action to be carried out
- A `payload` object (optional but important) that contains the information that should be used to change the state

Actions are created via an action creator, which is a function that returns an action. Actions are generally executed using the `dispatch()` method to get sent to the store:

![An Action In Redux](/assets/image/blog.logrocket.com/understanding-redux-tutorial-examples/action-redux.png)

Here’s a simple example of a Redux action:

```js
{ 
  type: "INCREMENT",
  payload: {
    incrementBy: 5,
  }
}
```

Below is an example of a Redux action creator, which is just a helper function returning the action, and we can export it to further dispatch the associated action to the store as needed (more on that later):

```js
export const increment = (numberToIncrement) => {
  type: "INCREMENT",
  payload: {
    incrementBy: numberToIncrement,
  }
};
```

### Creating an action using Redux Toolkit

As discussed above, actions are just normal objects with a `type` and a `payload` field. Redux Toolkit’s `createAction` utility saves us some effort by returning a function that takes an optional payload object as an argument.

This function, when called, returns an object with `type` and `payload` properties as specified. Here’s a simple example demonstrating the same:

```js
const incrementByFive = createAction('INCREMENTBY5');
incrementByFive({ incrementBy: 5 });
//
// { type : "INCREMENT", payload : { incrementBy : 5 } }
```

Or you may structure the payload for dynamic values like this:

```js
const increment = createAction(INCREMENT, (numberToIncrement = 1) => ({
  payload: {
    incrementBy: numberToIncrement,
  },
}));
```

### Redux reducers

Reducers are pure functions that take the current state of an application, perform an action, and return a new state. The reducer handles how the application data (i.e., the state) will change in response to an action:

![Render Function In Redux](/assets/image/blog.logrocket.com/understanding-redux-tutorial-examples/render-function-redux.png)

::: note

A pure function is a function that will always return the same value if given the same parameters, i.e., the function depends on only the parameters and no external data.

:::

Reducers are based on the `reduce` function in JavaScript, where a single value is calculated from multiple values after a callback function has been carried out. React reducers also inspired React makers to develop and introduce the [**`useReducer` Hook**](/blog.logrocket.com/react-usereducer-hook-ultimate-guide.md), which is pretty useful in managing local component states.

### Creating a reducer with Redux Toolkit

The reducer in Redux is a normal, pure function that takes care of the various possible values of state using the `switch` case syntax. But that means several things need to be taken care of — most importantly, keeping the state immutable.

Redux Toolkit provides the `createReducer` utility, which internally uses immer to handle the following three tasks:

- Creates a mutable draft state
- Allows you to write a reducer logic to modify this created draft state
- Eventually converts the draft state to the final immutable version, replacing the older state

The above three tasks define how Redux doesn’t allow you to modify the state directly.

This is how a reducer defined with Redux Toolkit would look like:

```js :collapsed-lines title="counterReducer.js"
import { INCREMENT, DECREMENT } from "./actions";

const initialState = {
  value: 0,
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return 
        { ...state, value: state.value + action.payload.incrementBy };
    case DECREMENT:
      return 
        { ...state, value: state.value - action.payload.decrementBy };
    default:
      return state;
  }
};
```

Clearly, it makes the task of handling the state more structural and much more manageable, even when the state is more complex with several nested objects.

::: note

Reducers take the previous state of the app and return a new state based on the action passed to it. As pure functions, they do not change the data in the object passed to them or perform any side effect in the application. Given the same object, they should always produce the same result.

:::

---

## Redux Store

A Redux store is the single source of truth that acts as a “container” object to hold the application state. The only way to change the state in Redux is through dispatching associated actions to the store. Redux allows individual components to connect to the store to grab the required state using selectors.

::: note

Although Redux allows you to create and manage multiple stores, the best practices *recommend keeping only one store in any Redux-powered* application.

:::

You can access the stored state with selectors, update the state by dispatching actions, register or unregister listeners via helper methods, and subscribe to the changes to the store so they know when to re-render:

![Store In Redux](/assets/image/blog.logrocket.com/understanding-redux-tutorial-examples/store-redux.png)

### Setting up a store with Redux Toolkit

While setting up a store with pure Redux can be quite cumbersome, with Redux Toolkit, it is a single call to the `configureStore` function. This is how we can set up a store that has a `counterReducer` slice in it:

```js title="store.jsx"
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterReducer'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

---

## Redux selectors

After establishing a store, it’s always a good practice to create a selector to improve code organization and facilitate easy fetching of state value for components:

```js title="store/counter/selectors.js"
export const selectCount = (state) => state.counter.value;
```

---

## Redux Dispatch

Finally, we can read the state value using the selector in our component and dispatch changes to the store with the `useDispatch` Hook offered by Redux Toolkit:

```js :collapsed-lines title="components/Counter.jsx"
// Associated imports...
export const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Count +1</button>
    </div>
  );
};
```

And that’s it! You now have a fully functional counter component with its states fully managed by Redux. Consider cloning [this project (<FontIcon icon="iconfont icon-github"/>`/c99rahul/ts-react-redux`)](https://github.com/c99rahul/ts-react-redux/) in your local environment and test it out yourself.

---

## Redux slices

Redux recently introduced a new pattern that combines action creation and reducer logic in a single “slice” for one feature. If that feature is our counter, here’s how we can combine associated actions and reducer to create a slice for it:

```js
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      state.value += 1,
    },
    decrement: state => {
      state.value -= 1,
    }
  }
})

export const { increment, decrement } = counterSlice.actions;
```

We can then easily utilize the above-defined slice in our store as shown below:

```js
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
});
```

Once you get comfortable with Redux and its core concepts, consider implementing slices instead of managing actions and reducers separately.

---

## Redux middleware

Redux allows developers to intercept all actions dispatched from components before they are passed to the `reducer` function. This interception is done via [<FontIcon icon="fas fa-globe"/>middleware](https://redux.js.org/understanding/history-and-design/middleware) functions, which can help you modify the intercepted actions, dispatch new actions, or perform side effects as and when required.

A middleware function receives the `next` method as an argument, which it can call to pass the action to the next middleware or reducer. It can process the action before and or after calling next, modify the action, dispatch additional actions, or even decide not to call next at all — it’s totally up to the task at hand.

Here’s what a simple middleware looks like:

```js
function simpleMiddleware({ getState, dispatch }) {
  return function(next){
    return function(action){
      // processing
      const nextAction = next(action);
      // read the next state
      const state = getState();
      // return the next action or you can dispatch any other action
      return nextAction;  
    }
  }
}
```

Understanding middleware might look a bit overwhelming right now. In most cases, you won’t need to create your own middleware because the Redux community has already made many of them available. If you feel middleware is required, you will appreciate its capacity to enable great work with the best abstraction.

Let’s look at more such pre-made middleware solutions for Redux that allow advanced usage and should be installed separately before implementation.

### Redux Thunk

[Redux Thunk (<FontIcon icon="iconfont icon-github"/>`reduxjs/redux-thunk`)](https://github.com/reduxjs/redux-thunk) is the simplest and most commonly used middleware for handling asynchronous logic. It’s super easy to understand and implement, great for making simple API calls and async logic, and requires no additional learning curve if you are familiar with asynchronous JavaScript:

```js
const fetchUserWithThunk = (id) => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_USER_START' });
    try {
      const response = await api.fetchUser(id);
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'FETCH_USER_ERROR', error });
    }
  };
};
```

Despite being simple to implement, thunks may lead to complex, nested action creators, making testing more challenging. Let’s move on to some advanced Redux middleware solutions that can handle more complex async flow.

### Redux Saga

[Redux Saga (<FontIcon icon="iconfont icon-github"/>`redux-saga/redux-saga`)](https://github.com/redux-saga/redux-saga) uses [**generator functions**](/blog.logrocket.com/javascript-iterators-and-generators-a-complete-guide.md) to manage side effects in Redux. The code below illustrates the use of `yield put`, which basically acts as the Saga effect creator used to dispatch actions to the Redux store:

```js
function* fetchUserSaga(action) {
  try {
    yield put({ type: 'FETCH_USER_START' });
    const user = yield call(api.fetchUser, action.payload.id);
    yield put({ type: 'FETCH_USER_SUCCESS', user });
  } catch (error) {
    yield put({ type: 'FETCH_USER_ERROR', error });
  }
}
```

Redux Saga is better suited for handling race conditions, time outs, etc. It provides better overall handling of complex async flows compared to thunks, and makes it easy to test async code.

However, it can be overkill for simpler apps as it adds another layer of complexity to your Redux setup. Also, note that it requires an understanding of JavaScript generator functions.

### Redux Observable

[Redux Observables (<FontIcon icon="iconfont icon-github"/>`redux-observable/redux-observable`)](https://github.com/redux-observable/redux-observable) use RxJS to create streams of actions that can be processed, transformed, and dispatched to the store:

```js
const fetchUserEpic = (action$) => action$.pipe(
  ofType('FETCH_USER_REQUEST'),
  mergeMap((action) => 
    from(api.fetchUser(action.payload.id)).pipe(
      map(response => ({ type: 'FETCH_USER_SUCCESS', payload: response.data })),
      catchError(error => of({ type: 'FETCH_USER_ERROR', error }))
    )
  )
);
```

This workflow provides powerful RxJS operators for transforming action streams and is best suited for complex, event-based features.

It has a steeper learning curve compared to the other middleware solutions we covered above and requires an understanding of RxJS and reactive programming.

---

## Conclusion

In this guide, we discussed the core features of Redux and how Redux can be beneficial in managing states for your app.

One major benefit of Redux is the ability to navigate through a state’s history, allowing developers to observe how the state has changed throughout the app’s lifecycle.

While Redux has many helpful features, that does not mean you should add Redux to all your apps. It is recommended to use Redux only when it fits your requirements and your project needs a state management tool. Here’s a dedicated guide to know [**when and when not to use Redux**](https://blog.logrocket.com/when-and-when-not-to-use-redux-41807f29a7fb/).
<!-- TODO: /blog.logrocket.com/when-and-when-not-to-use-redux.md -->

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding Redux: A tutorial with examples",
  "desc": "This guide provides a foundational understanding of Redux and why you should use it for state management in a React app.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/understanding-redux-tutorial-examples.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
