---
lang: en-US
title: "The modern guide to React state patterns"
description: "Article(s) > The modern guide to React state patterns"
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
      content: "Article(s) > The modern guide to React state patterns"
    - property: og:description
      content: "The modern guide to React state patterns"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/modern-guide-react-state-patterns.html
prev: /programming/js-react/articles/README.md
date: 2023-07-31
isOriginal: false
author:
  - name: Kapeel Kokane
    url : https://blog.logrocket.com/author/kapeelkokane/
cover: /assets/image/blog.logrocket.com/modern-guide-react-state-patterns/banner.png
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
  name="The modern guide to React state patterns"
  desc="Learn today's options for managing state in React applications, including built-in hooks and third-party libraries like Redux and MobX."
  url="https://blog.logrocket.com/modern-guide-react-state-patterns"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/modern-guide-react-state-patterns/banner.png"/>

When it comes to React applications, state is an integral part of what makes the application dynamic and interactive. Without state, applications would be static and unresponsive to user input.

![The Modern Guide To React State Patterns](/assets/image/blog.logrocket.com/modern-guide-react-state-patterns/banner.png)

State management is the process of handling the state of an application optimally. It is a crucial part of the development process. In this article, we will take a look at the different state management options available for React developers in 2023, and how to choose the right one for your project.

---

## State in React

The UI that is generated in a React app is a function of the state. To invoke reactivity in an app, all we need to do is modify the state, and the React library will take care of the rest. The graphic below sums up the relationship between the application UX, state, and props in React:

![Graphic To Demonstrate Relationship Between Application UX, State, And Props In React](/assets/image/blog.logrocket.com/modern-guide-react-state-patterns/react-state.png)

---

## React’s built-in state management

React has a variety of built-in features for state management, including the `useState` and `useReducer` Hooks, as well as the Context API. Before exploring third-party libraries for state management, let’s take a look at these built-in features.

### The `useState` and `useReducer` Hooks

Both the `useState` and `useReducer` Hooks have a different approach for how the state is updated. As mentioned above, both of these interfaces help us modify state. Beyond that, React takes care of all the heavy lifting required to faithfully represent that state on the browser DOM. The graphic below sums it up well:

![Graphic Demonstrating How UseState And UseReducer Hooks Represent State On The Browser DOM](/assets/image/blog.logrocket.com/modern-guide-react-state-patterns/react-usestate-usereducer-hooks.png)

### The `useState` Hook

The `useState` Hook is the most basic API provided by React to interact with state. To better understand how this hook works, let’s look at a counter app example. First, let’s create the state:

```jsx
const [count, setCount] = useState(0);
```

The above piece of code creates a state variable called `count` and a function called `setCount` that can be used to update the state. The initial value of the state is set to `0`. Now, we’ll update the state by incrementing the value of `count` by `1`:

```jsx
setCount(count + 1);
```

Finally, we’ll use the state:

```jsx
<p>You clicked {count} times</p>
```

In this example, we used the state by displaying the value of `count` in the UI. Learn more about the [**`useState` Hook in this guide**](/blog.logrocket.com/guide-usestate-react.md).

### The `useReducer` Hook

The `useReducer` Hook allows us to manage state by dispatching actions and then responding to them in the `reducer` function. Again, we’ll use a counter app example to understand how this hook works:

```jsx
const [state, dispatch] = useReducer(reducerFunc, 0);
```

We call the `useReducer` Hook with the `reducer` function and the initial state as arguments. It returns the current state and a `dispatch` function. Whenever we need to update the state, we can call the `dispatch` function with an action object:

```jsx
dispatch({ type: 'INCREMENT' })
```

React then calls the `reducer` function with the action object. Here’s what a common `reducer` function looks like:

```jsx
function reducerFunc(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return 0;
    case 'SET':
      return action.val;
  }
}
```

At the end of this transaction, whatever the `reducer` function returns becomes the new state and is accessible through the `state` variable. Here’s a sketch that explains the flow of data in the `useReducer` Hook:

![Graphic Demonstrating The React UseReducer Hook](/assets/image/blog.logrocket.com/modern-guide-react-state-patterns/react-usereducer-hook.png)

Read more about the [**`useReducer` Hook here**](/blog.logrocket.com/react-usereducer-hook-ultimate-guide.md).

---

## State management with the `useContext` Hook

Next, let’s look at how the `useContext` Hook comes into the picture for state management. The general idea is to store a piece of data that components can use, but the pattern and the use cases are different.

While `useState` and `useReducer` are used to manage state that is scoped to a component, `useContext` is used to manage state that is shared across components. Its main purpose is to avoid prop drilling when a piece of state is supposed to be accessed by a child component several levels down the component tree. One of the primary use cases of context is to manage the theme of the application. So, let’s look at the code for the same.

Inside a component near the top of the component tree, we’ll create the context:

```jsx
export const themeContext = createContext('light');
```

Notice how the newly created context object is exported from here. To use that context, we’ll import it in a component down the tree:

```jsx
import { useContext } from 'react';
import { ThemeContext } from './App.js';

export default function Button({ children }) {
  const theme = useContext(ThemeContext);
  // ...
}
```

But, for the above code to work, we need to first wrap the component tree above this consumer component with the context Provider:

```jsx
<ThemeContext.Provider value={theme}>
  {children}
</ThemeContext.Provider>
```

With that in place, the consumer component will receive the value supplied by the Provider. Whenever the value supplied to the Provider is updated, the child below will be able to access that latest updated value. For more information about how the Context API can be used with the `useContext` Hook to manage state, [**check out this article**](/blog.logrocket.com/react-context-tutorial.md).

---

## Third-party libraries for state management

While the above solution for state management makes sense when the scope of the state is just a single component (in the case of `useState` and `useReducer`), or when the state is supposed to be accessed in a downstream component (in the case of `useContext`), these restrictions make it difficult to use these solutions in larger applications where the order of creation and consumption of state is not defined. This is where third-party libraries come in.

### Redux

[<VPIcon icon="fas fa-globe"/>Redux](https://redux.js.org/) is one of the oldest and most popular libraries for state management in React. It has a large ecosystem of libraries and tools that make it easy to use in modern applications. The paradigm is similar to what we saw in the `useReducer` Hook, with the added advantage that the state is now global and can be accessed by any component in the application.

We’ll look into the [<VPIcon icon="iconfont icon-github"/>`reduxjs/react-redux`](https://github.com/reduxjs/react-redux) library because that is the official binding for React. We’ll also need the [<VPIcon icon="fas fa-globe"/>redux-toolkit](https://redux-toolkit.js.org/) library, which will help us accomplish common Redux patterns while minimizing boilerplate code.

Similar to how the `useContext` Hook creates a context, which is a central place where the state is saved, the Redux library has a parallel concept called the store, which is the central state that is shared across components and acts as the source of truth. Let’s create the store:

```jsx
import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './features/todos/todosSlice'
import userReducer from './features/user/userSlice'

export default configureStore({
  reducer: {
    todo: todosReducer,
    user: userReducer
  },
})
```

The `configureStore` function from redux-toolkit does something similar to Redux’s store. It creates a single store by combining several reducer-like functions that your entire application can have.

Notice the `todosReducer` and the `userReducer`, which are being imported from separate slices. A slice is nothing but an abstraction, provided by redux-toolkit, that helps us specify a name, an initial state, and a reducer function for a particular piece (or slice) of the entire app state.

Now that the central store is created, it needs to be accessible throughout the application. The way to accomplish that is via a Provider:

```jsx title="index.jsx"
import { Provider } from 'react-redux'
import store from './store'

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

We import the previously created state and the `Provider` component from react-redux and wrap the entire application with it. With that set up, we are now ready to access the state inside our function components using the hooks that react-redux provides:

```jsx title="Counter.jsx"
import { useSelector, useDispatch } from 'react-redux'
import { markDone } from './todosSlice'

export function Counter() {
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  // ...
  dispatch(markDone(id));
}
```

The `useSelector` Hook lets us get ahold of a particular slice of state from the store. It also gets the latest value by re-rendering the component when that slice of state is updated. The `useDispatch()` Hook gives us access to the `dispatch` function, which is used to dispatch actions to the store exactly the same as we did in the `useReducer` Hook.With that, we have a React app that uses Redux for state management. It can be scaled up by adding more slices whenever the app adds more features.

### MobX

[<VPIcon icon="fas fa-globe"/>MobX](https://mobx.js.org/) is another alternative for state management in React. It relies on the concept of observables. State is segregated into pure values and computed values. The core belief of MobX is that “Anything that can be derived from the application state, should be. Automatically.”

Let’s look at an example to better understand this. The state of the application is defined in the form of a JavaScript class. Here is an example of how a Todo item can be represented in state:

```jsx title="Todo.jsx"
import { makeObservable, observable, action } from "mobx"

class Todo {
  id = Math.random()
  label = ""
  done = false

  constructor(label) {
    makeObservable(this, {
      label: observable,
      done: observable,
      toggle: action,
      summary: computed
    })
    this.label = label
  }

  toggle() {
    this.done = !this.done
  }

  get summary() {
    console.log("summarizing...")
    return `${this.label} ${this.done ? "is" : "is not"} done.`
  }
}
```

We can see that the class has three properties: `id`, `label`, and `done`. Notice how the constructor calls the `makeObservable` function imported from Mobx, which defines the properties as observables. The `summary` property is being defined as `computed`, which means it will be re-calculated every time an observable dependency changes. The `toggle` function is defined as `action`.

With that general understanding of how Mobx works, let’s try to use it in a React application. We will use the [mobx-react-lite (<VPIcon icon="iconfont icon-github"/>`mobxjs/mobx`)](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite) package, which provides lightweight bindings for React to interact with Mobx.

If we don’t want to make the class defining the state more complex, we can use a utility like `makeAutoObservable`:

```jsx
constructor() {
  makeAutoObservable(this)
}
```

With this utility, we need not individually specify the types for individual properties (e.g. observable, action, computed) like we did in the previous example. When we call `makeAutoObservable` in the constructor, all own properties inside the class are marked as observable, all getters are marked as computed, and all setters as actions.

Once that is set, we can move on to integrating this with our React component. This is where the `observer` utility from Mobx comes into play. We just need to wrap our React component with the `observer` HOC and everything else is taken care of for us:

```jsx
const Task = observer(({ todo }) => (
  <>
    <h1>Task: {todo.summary}</h1>
    <button onClick={() => todo.toggle()}>Toggle</button>
  </>
))
```

In the example above, we can see that the `Task` component is being passed a `todo` prop, which is an instance of the Mobx store we created above. As we are accessing the `summary` property of the `todo` object, Mobx automatically takes care of re-rendering the component whenever the value of `summary` changes. We don’t need to do anything extra. Isn’t that great?

This is the core concept around reactivity in Mobx. Based on the property that we access, Mobx will re-render our component whenever only the accessed property changes. For example, we are currently accessing the `summary` observable, which means this component will re-render only when that particular observable from the class changes. If there was another observable in the class that never gets accessed in this component, it would not have any impact on the re-rendering of the component. This mimics the behavior of subscribing to changes in the state, similar to Redux, and without the need to explicitly do so.

### Recoil

[<VPIcon icon="fas fa-globe"/>Recoil](https://recoiljs.org/) is a newer library for state management in React that takes the atomic approach to state management. Atomic state management is a paradigm where the state of an application, instead of being stored in a single, large object, is broken down into smaller independent units of state called atoms.

An atom represents a piece of state that can be read to or written from any component. Any component that reads the value of an atom is automatically subscribed to that atom and will be re-rendered whenever the value of the atom changes.

For the application to be able to read and write to Recoil state, we need to wrap our parent component in `RecoilRoot`:

```jsx title="App.jsx"
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <SayHi />
    </RecoilRoot>
  );
}
```

With that in place, we can create and consume state. We can use the `atom` utility provided by Recoil to create atoms:

```jsx
const firstNameState = atom({
  key: 'firstNameState',
  default: 'Bob',
});
```

We can also create a derived state that depends on the two states above and returns a transformed output:

```jsx
const introductionState = selector({
  key: 'introductionState',
  get: ({get}) => {
    const name = get(firstNameState);
    return `My name is ${name}!`;
  },
});
```

In the example above, we created a `greetingState` derived state using the `selector` utility provided by Recoil. Now, to access these in the component and make modifications, we can use the `useRecoilState` Hook:

```jsx :collapsed-lines title="SayHi.jsx"
function SayHi() {
  // firstNameState & introductionState is the atom we created above
  const [firstname, setFirstName] = useRecoilState(firstNameState); 
  const introduction = useRecoilValue(introductionState);

  const onChange = (event) => {
    setFirstName(event.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      <h1>Hello from {firstname}!</h1>
      <h2>{introduction}</h2>
    </div>
  );
}
```

Notice that we also used the `useRecoilValue` tool to access the value of the derived state. The core philosophy is that when any name is typed in the input box, `setFirstName` gets called, which updates `firstName`. This also triggers an update on the derived state `introductionState`, and we can see the latest results on the page. Jotai does something similar while bringing a few special capabilities to the table.

### Jotai

Similar to Recoil, [<VPIcon icon="fas fa-globe"/>Jotai](https://jotai.org/) is a state management library that also takes an atomic approach to state management but in a slightly different way. This library also provides an `atom` utility to create atoms:

```jsx
const firstNameAtom = atom('Bob');

const personAtom = atom({
  firstName: 'Bob',
  lastName: 'Ross',
  age: 35
});
```

There is also a provision to create a derived state:

```jsx
const greetingAtom = atom((get) => {
  const firstName = get(firstNameAtom);

  return `My name is ${firstName}!`;
})
```

Once created, this atom can be consumed and updated inside a React component similar to the `useState` Hook:

```jsx
const [firstName, setFirstName] = useAtom(firstNameAtom);
```

There are a few functionalities that make Jotai unique when compared to Recoil. For example, the `atomWithStorage` utility is exported from `jotai/utils` and persists the state onto LocalStorage so we don’t lose the value even after a refresh! This is useful when we need to store something like a user’s dark mode preference.

Jotai also provides separate integrations with libraries like Immer, Query, XState, etc. For instance, `atomWithImmer` exported from `jota-immer` lets us create an atom with an immer-based write function. These utilities are what make Jotai a unique choice as a state management library.

### Signia

[<VPIcon icon="fas fa-globe"/>Signia](https://signia.tldraw.dev/) is an alternate library for state management in React. Instead of using observables like Mobx, or atoms like Recoil and Jotai, it uses the concept of signals. A signal is a pure, reactive value that can be observed for changes.

Even though the underlying entity is a signal, the Signia library allows us to create atoms that are based on signals:

```jsx
import { atom } from 'signia'
const fruit = atom('fruit', 'Apple');
```

Updating the value of a signal is done by calling the `set` method on the atom:

```jsx
fruit.set('Banana');
console.log(fruit.value); // Banana
```

Signia also has the concept of computed state, similar to Recoil and Jotai. It is created by using the `atom.value` property of any atom inside the `compute` function:

```jsx
const fruits = atom('fruits', 'Apples')
const numberOf = atom('numberOf', 10)
const display = computed('display', () => {
  return `${numberOf.value} ${fruits.value}`
})
```

Read more about [**state management with Signia in this article**](/blog.logrocket.com/implement-react-state-management-signia.md).

---

## State machines in React

Although state machines are not explicitly used in React, they can be powerful tools for managing state in React applications. A state machine is an entity that has a current state and can transition to other states based on certain events. This is similar to the concept of Redux, where we have a state and can dispatch actions on that state. But state machines have added advantages, like the ability to have parallel states, hierarchical states, and more.

### XState

Working with states and managing transitions between them natively is a complicated affair. [<VPIcon icon="fas fa-globe"/>XState](https://xstate.js.org/docs/) is a library that provides primitives that help us work with state machines. It also provides React bindings so that the state machine can be used in a React component.

Here’s what a general state machine defined with XState looks like:

```jsx
import { createMachine } from 'xstate';

const todoMachine = createMachine({
  id: 'todo',
  initial: 'pending',
  states: {
    pending: { on: { TOGGLE: 'done' } },
    done: { on: { TOGGLE: 'pending' } }
  }
});
```

Notice how this is a neat way to define all the states, the initial state, and also the actions that lead to particular states. This state machine can then be used inside a React component using the hooks exposed by `@xstate/react`:

```jsx title="Toggle.jsx"
import { useMachine } from '@xstate/react';
import { todoMachine } from '../todoMachine';

function Toggle() {
  const [current, send] = useMachine(todoMachine);

  return (
    <button onClick={() => send('TOGGLE')}>
      {current.matches('pending') ? 'Mark done' : 'Mark pending'}
    </button>
  );
}
```

This is an example of a simple state, but we can make the state machine as complex as we want. The machine holds our application state and can act as a capable state management alternative to the libraries that we discussed above.

---

## Conclusion

In this article, we explored the general concept of state in React, as well as tools for managing state. We reviewed the built-in options for local component state management, like `useState` and `useReducer`. We also explored `useContext` as a means to store slow-changing application-level state.

Then, we looked into the different external libraries available, including Redux, Mobx, Recoil, Jotai, and Signia. Finally, we looked at state machines as a means to store state and how they can be used in React applications courtesy of the XState library.

I hope you now have a better idea about the state of state management in React and can make an informed decision about which library to use for your next project.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The modern guide to React state patterns",
  "desc": "Learn today's options for managing state in React applications, including built-in hooks and third-party libraries like Redux and MobX.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/modern-guide-react-state-patterns.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
