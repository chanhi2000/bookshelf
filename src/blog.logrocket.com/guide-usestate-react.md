---
lang: en-US
title: "useState in React: A complete guide"
description: "Article(s) > useState in React: A complete guide"
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
      content: "Article(s) > useState in React: A complete guide"
    - property: og:description
      content: "useState in React: A complete guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/guide-usestate-react.html
prev: /programming/js-react/articles/README.md
date: 2024-10-08
isOriginal: false
author: 
  - name: Esteban Herrera
    url: https://blog.logrocket.com/author/ehrrera/
cover: /assets/image/blog.logrocket.com/guide-usestate-react/banner.png
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
  name="useState in React: A complete guide"
  desc="React useState allows you to add state to functional components, returning an array with two values: current state and a function to update it."
  url="https://blog.logrocket.com/guide-usestate-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/guide-usestate-react/banner.png"/>

::: note Editor’s note

This React `useState` Hook tutorial was last reviewed and updated on 8 October 2024.

:::

![UseState In React: A Complete Guide](/assets/image/blog.logrocket.com/guide-usestate-react/banner.png)

In React, the `useState` Hook allows you to add state to functional components. `useState` returns an array with two values: the current state and a function to update it.

The Hook takes an initial state value as an argument and returns an updated state value whenever the `setter` function is called. It can be used like this:

```jsx
const [state, setState] = useState(initialValue);
```

Here, the `initialValue` is the value you want to start with and `state` is the current state value that can be used in your component. The `setState` function can be used to update the `state`, triggering a re-render of your component.

The `useState` Hook in React is the equivalent of `this.state`/`this.setSate` for functional components.

For a visual guide to `useState`, check out the video tutorial below:

<VidStack src="youtube/4qVNaohzDWU" />

---

## React class and functional components

In React, there are two types of components:

### Class components

[<FontIcon icon="fa-brands fa-firefox"/>ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) that extend the built-in [<FontIcon icon="fa-brands fa-react"/>`Component`](https://legacy.reactjs.org/docs/react-component.html) and [<FontIcon icon="fa-brands fa-react"/>`lifecycle`](https://beta.reactjs.org/learn/lifecycle-of-reactive-effects) methods:

```jsx
import { Component } from "react";
class Message extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }
  componentDidMount() {
    /* ... */;
  }
  render() {
    return <div>{this.state.message}</div>;
  }
}

```

> **N.B.**, the React team recommends defining components as functions instead of classes. Here’s a [<FontIcon icon="fa-brands fa-react"/>migration guide](https://beta.reactjs.org/reference/react/Component#alternatives).

### Functional components

 Functions that accept arguments as the properties of the component and return valid JSX, as shown below:

```jsx
function Message(props) {
  return <div>{props.message}</div>;
}
// Or as an arrow function 
const Message = (props) => <div>{props.message}</div>

```

As you can see, there are no state or lifecycle methods. However, as of React v16.8, we can use Hooks. [**React Hooks**](/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.md), which tend to start with "`use`" are functions that add state variables to functional components and instrument the lifecycle methods of classes.

---

## What does `useState` do?

`useState` allows you to add state to function components. Calling `React.useState` inside a function component generates a single piece of state associated with that component.

Whereas the state in a class is always an object, with Hooks, the state can be any type. Each piece of state holds a single value: an `object`, an `array`, a `Boolean`, or any other type you can imagine.

So, when should you use the `useState` Hook? It’s beneficial for managing local component state, but for larger projects, additional [**state management solutions**](/blog.logrocket.com/guide-choosing-right-react-state-management-solution.md) may be necessary.

---

## What can `useState` hold?

In React, `useState` can store any type of value, whereas the state in a class component is limited to being an object. This includes primitive data types like `string`, `number`, and `Boolean`, as well as complex data types such as `array`, `object`, and `function`. It can even cover custom data types like class instances.

Basically, anything that can be stored in a JavaScript variable can be stored in a state managed by `useState`.

---

## Updating objects and arrays in `useState`

Never directly modify an object or array stored in `useState`. Instead, you should create a new updated version of the object or array and call [**`setState`**](/blog.logrocket.com/using-setstate-react-components.md) with the new version:

```jsx
// Objects
const [state, setState] = useState({ name: "John", age: 30 });

const updateName = () => {
  setState({ ...state, name: "Jane" });
};

const updateAge = () => {
  setState({ ...state, age: state.age + 1 });
};

// Arrays
const [array, setArray] = useState([1, 2, 3, 4, 5]);

const addItem = () => {
  setArray([...array, 6]);
};

const removeItem = () => {
  setArray(array.slice(0, array.length - 1));
};

```

---

## Declaring state in React

`useState` is a named export from `react`. To use it, you can write `React.useState` or import it by writing `useState`:

```jsx
import React, { useState } from 'react';
```

The `state` object can be declared in a class and allows you to declare more than one state variable, as shown below:

```jsx
import React from "react";
class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "", list: [] };
  }
  /* ... */
}
```

However, unlike the `state` object, the `useState` Hook allows you to declare only one state variable (of any type) at a time, like this:

```jsx
import React, { useState } from "react";
const Message = () => {
  const messageState = useState("");
  const listState = useState([]);
};
```

`useState` takes the initial value of the state variable as an argument, and you can pass it directly, as shown in the previous example. You can also use a function to [lazily initialize](https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52/) the variable. This is useful when the initial state is the result of an expensive computation:
<!-- TODO: /blog.logrocket.com/lazy-loading-components-in-react-16-6.md -->

```jsx
const Message = () => {
  const messageState = useState(() => expensiveComputation());
  /* ... */
};
```

The initial value will be assigned only on the initial render. If it’s a function, it will be executed only on the initial render. In subsequent renders (due to a change of state in the component or a parent component), the argument of the `useState` Hook will be ignored, and the current value will be retrieved.

It is important to note that if you want to update the state based on new properties the component receives, using `useState` alone won’t work. This is because `useState` only uses its initial argument the first time — not each time the property changes. [<FontIcon icon="fa-brands fa-stack-overflow"/>Check this out](https://stackoverflow.com/questions/54625831/how-to-sync-props-to-state-using-react-hooks-setstate) for the correct way to handle this. It’s demonstrated here:

```jsx
const Message = (props) => {
  const messageState = useState(props.message);
  /* ... */
};
```

But `useState` doesn’t return just a variable, as the previous examples imply. It returns an array, where the first element is the state variable and the second element is a function to update the value of the variable:

```jsx
const Message = () => {
  const messageState = useState("");
  const message = messageState[0]; // Contains ''
  const setMessage = messageState[1]; // It's a function
};
```

Usually, you’ll use array destructuring to simplify the code shown above like this:

```jsx
const Message = () => {
  const [message, setMessage] = useState("");
};
```

This way, you can use the state variable in the functional component like any other variable:

```jsx
const Message = () => {
  const [message, setMessage] = useState("");
  return (
    <p>
      <strong>{message}</strong>
    </p>
  );
};
```

But, why does `useState` return an array? This is because, compared to an object, an array is more flexible and easy to use. If the method returned an object with a fixed set of properties, you wouldn’t be able to assign custom names easily.

Instead, you’d have to do something like this (assuming the properties of the object are `state` and `setState`):

```jsx
// Without using object destructuring
const messageState = useState("");
const message = messageState.state;
const setMessage = messageState; 

// Using object destructuring
const { state: message, setState: setMessage } = useState("");
const { state: list, setState: setList } = useState([]);
```

---

## Using React Hooks to update the state

The second element returned by `useState` is a function that takes a new value to update the state variable. Here’s an example that uses a `text` box to update the state variable on every change:

```jsx
const Message = () => {
  const [message, setMessage] = useState("");
  return (
      <input
        type="text"
        value={message}
        placeholder="Enter a message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <p>
        <strong>{message}</strong>
      </p>
    </div>
  );
};
```

You can try this on [<FontIcon icon="iconfont icon-codesandbox"/>Code Sandbox here](https://codesandbox.io/p/sandbox/7z31woqo9q?from-embed).

::: sandpack#react eh3rrera / Drafts / useState 01 [rtl theme=dark]

@file /App.js

```js
import React, { useState } from "react";

import "./styles.css";

export default Message = () => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <input
        type="text"
        value={message}
        placeholder="Enter a message"
        onChange={e => setMessage(e.target.value)}
      />
      <p>
        <strong>{message}</strong>
      </p>
    </div>
  );
};
```

:::

However, this update function doesn’t update the value right away. Instead, it enqueues the update operation. Then, after re-rendering the component, the argument of `useState` will be ignored, and this function will return the most recent value.

When updating state based on its previous value, you need to pass a function to the `setter` function that updates the state. This function receives the previous state value as an argument and returns the new state value, as shown below:

```jsx
const Message = () => {
  const [message, setMessage] = useState("");
  return (
    <div>
      <input
        type="text"
        value={message}
        placeholder="Enter some letters"
        onChange={(e) => {
          const val = e.target.value;
          setMessage((prev) => prev + val);
        }}
      />
      <p>
        <strong>{message}</strong>
      </p>
    </div>
  );
};
```

> You can try this on [<FontIcon icon="iconfont icon-codesandbox"/>Code Sandbox here](https://codesandbox.io/p/sandbox/v0n08rw547?from-embed).

::: sandpack#react eh3rrera / Drafts / useState 02 [rtl theme=dark]

@file /App.js

```js
import React, { useState } from "react";

import "./styles.css";

export default Message = () => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <input
        type="text"
        value={message}
        placeholder="Enter some letters"
        onChange={e => {
          const val = e.target.value;
          setMessage(prev => prev + val)
        } }
      />
      <p>
        <strong>{message}</strong>
      </p>
    </div>
  );
};
```

:::

---

## Implementing an object as a state variable with `useState` Hook

There are two things you need to keep in mind about updates when using objects:

- The importance of [**immutability**](/blog.logrocket.com/immutability-react-should-you-mutate-objects.md)
- The fact that the setter returned by `useState` doesn’t [<FontIcon icon="fa-brands fa-react"/>merge objects like `setState()` does](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-are-merged) in class components

Regarding the first point; if you use the same value as the current state to update the state (React uses [<FontIcon icon="fa-brands fa-firefox"/>`Object.is()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) for comparing), React won’t trigger a re-render.

When working with objects, it’s easy to make the [**following mistake**](/blog.logrocket.com/avoiding-common-mistakes-in-react-hooks.md):

```jsx
const Message = () => {
  const [messageObj, setMessage] = useState({ message: "" });
  return (
    <div>
      <input
        type="text"
        value={messageObj.message}
        placeholder="Enter a message"
        onChange={(e) => {
          messageObj.message = e.target.value;
          setMessage(messageObj); // Doesn't work
        }}
      />
      <p>
        <strong>{messageObj.message}</strong>
      </p>
    </div>
  );
};
```

> Here’s the [<FontIcon icon="iconfont icon-codesandbox"/>Code Sandbox](https://codesandbox.io/p/sandbox/50n0py0p6k?from-embed).

::: sandpack#react eh3rrera / Drafts / useState 03 [rtl theme=dark]

@file /App.js

```js
import React, { useState } from "react";

import "./styles.css";

export default Message = () => {
  const [messageObj, setMessage] = useState({ message: "" });

  return (
    <div>
      <input
        type="text"
        value={messageObj.message}
        placeholder="Enter a message"
        onChange={e => {
          messageObj.message = e.target.value;
          setMessage(messageObj); // Doesn't work
        }}
      />
      <p>
        <strong>{messageObj.message}</strong>
      </p>
    </div>
  );
};
```

:::

Instead of creating a new object, the above example mutates the existing state object. To React, that’s the same object. To make it work, we must create a new object, just like we discussed earlier:

```jsx
onChange={(e) => {
  const newMessageObj = { message: e.target.value };
  setMessage(newMessageObj); // Now it works
}}
```

This leads us to the second important point you need to remember: when you update a state variable, unlike `this.setState` in a class component, the function returned by `useState` does not automatically merge update objects — it replaces them.

Following the previous example, if we add another property to the message object (`id`) as shown below:

```jsx
const Message = () => {
  const [messageObj, setMessage] = useState({ message: "", id: 1 });
  return (
    <div>
      <input
        type="text"
        value={messageObj.message}
        placeholder="Enter a message"
        onChange={(e) => {
          const newMessageObj = { message: e.target.value };
          setMessage(newMessageObj);
        }}
      />
      <p>
        <strong>
          {messageObj.id} : {messageObj.message}
        </strong>
      </p>
    </div>
  );
};
```

And we only update the `message` property like in the above example, React will replace the original `{ message: '', id: 1 }` state object with the object used in the `onChange` event, which only contains the `message` property:

```js
{ message: 'message entered' } // id property is lost
```

> You can see how the `id` property is lost [<FontIcon icon="iconfont icon-codesandbox"/>here on Code Sandbox](https://codesandbox.io/p/sandbox/qqp8qp9zzq?from-embed).

::: sandpack#react eh3rrera / Drafts / useState 04 [rtl theme=dark]

@file /App.js

```js
import React, { useState } from "react";

import "./styles.css";

export default Message = () => {
  const [messageObj, setMessage] = useState({ message: "", id: 1 });

  return (
    <div>
      <input
        type="text"
        value={messageObj.message}
        placeholder="Enter a message"
        onChange={e => {
          const newMessageObj = { message: e.target.value };
          setMessage(newMessageObj); // id property is lost
        }}
      />
      <p>
        <strong>
          {messageObj.id}: {messageObj.message}
        </strong>
      </p>
    </div>
  );
};
```

:::

You can replicate the behavior of `setState()` by using the function argument that contains the object to be replaced and the object spread syntax:

```jsx
onChange={e => {
  const val = e.target.value;
  setMessage(prevState => {
    return { ...prevState, message: val }
  });
}}
```

The `...prevState` part will get all of the properties of the object, and the `message: val` part will overwrite the `message` property. This will have the same result as using [<FontIcon icon="fa-brands fa-firefox"/>`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) (just remember to create a new object):

```jsx
onChange={e => {
  const val = e.target.value;
  setMessage(prevState => {
    return Object.assign({}, prevState, { message: val }); 
  }); 
}}
```

> Try it here on [<FontIcon icon="iconfont icon-codesandbox"/>Code Sandbox](https://codesandbox.io/p/sandbox/usestate-05-qpykz?from-embed).

::: sandpack#react eh3rrera / Drafts / useState 05 [rtl theme=dark]

@file /App.js

```js
import React, { useState } from "react";

import "./styles.css";

export default Message = () => {
  const [messageObj, setMessage] = useState({ message: "", id: 1 });

  return (
    <div>
      <input
        type="text"
        value={messageObj.message}
        placeholder="Enter a message"
        onChange={(e) => {
          const val = e.target.value;
          setMessage((prevState) => {
            return { ...prevState, message: val };
            // return Object.assign({}, prevState, { message: val }); // Also works
          });
        }}
      />
      <p>
        <strong>
          {messageObj.id}: {messageObj.message}
        </strong>
      </p>
    </div>
  );
};
```

:::

However, the spread syntax simplifies this operation, and it also works with arrays. Basically, when applied to an array, the spread syntax removes the brackets so you can create another one with the values of the original array:

```js
[ 
  ...['a', 'b', 'c'], 
  'd'
]
// Is equivalent to
[
  'a', 'b', 'c', 'd'
]
```

Here’s an example that shows how to use `useState` with arrays:

```jsx :collapsed-lines
const MessageList = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  return (
    <div>
      <input
        type="text"
        value={message}
        placeholder="Enter a message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <input
        type="button"
        value="Add"
        onClick={(e) => {
          setMessageList([
            ...messageList,
            {
              // Use the current size as ID (needed to iterate the list later)
              id: messageList.length + 1,
              message: message,
            },
          ]);
          setMessage("");
          // Clear the text box
        }}
      />
      <ul>
        {messageList.map((m) => (
          <li key={m.id}>{m.message}</li>
        ))}
      </ul>
    </div>
  );
};
```

You have to be careful when applying the spread syntax to multi-dimensional arrays because it only performs a shallow copy, meaning nested arrays won’t be fully copied and will still reference the original data.

### How to update state in a nested object in React with Hooks

In JavaScript, multi-dimensional arrays are arrays within arrays, as shown below:

```js
[
  ['value1','value2'],
  ['value3','value4']
]
```

You could use them to group all your state variables in one place. However, for that purpose, it would be better to use nested objects like this:

```js
{
  "row1": { "key1": "value1", "key2": "value2" },
  "row2": { "key3": "value3", "key4": "value4" }
}
```

But, the problem when working with multi-dimensional arrays and nested objects is that `Object.assign` and the spread syntax will create a [**shallow copy**](/blog.logrocket.com/copy-objects-in-javascript-complete-guide.md#shallow-copy:~:text=Structured%20cloning-,Shallow%20copy,-A%20shallow%20copy) instead of a [**deep copy**](/blog.logrocket.com/copy-objects-in-javascript-complete-guide.md#shallow-copy:~:text=disrupt%20our%20program.-,Deep%20copy,-A%20deep%20copy).

From the [<FontIcon icon="fa-brands fa-firefox"/>spread syntax documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax):

::: note

Spread syntax effectively goes one level deep while copying an array. Therefore, it may be unsuitable for copying multi-dimensional arrays, as the following example shows. (The same is true with `Object.assign()` and the spread syntax.)

:::

```jsx
let a = [[1], [2], [3]];
let b = [...a];

b.shift().shift(); //  1
//  Array 'a' is affected as well: [[], [2], [3]]
```

This [<FontIcon icon="fa-brands fa-stack-overflow"/>Stack Overflow query](https://stackoverflow.com/questions/43421704/why-is-a-spread-element-unsuitable-for-copying-multidimensional-arrays) offers good explanations for the above example, but the important point is that when using nested objects, we can’t just use the spread syntax to update the state object. For example, consider the following state object:

```jsx
const [messageObj, setMessage] = useState({
  author: "",
  message: { id: 1, text: "" },
});
```

The following code snippets show some incorrect ways to update the `text` field:

```jsx
// Wrong
setMessage((prevState) => ({ ...prevState, text: "My message" })); 
// Wrong
setMessage((prevState) => ({ ...prevState.message, text: "My message" })); 
// Wrong
setMessage((prevState) => ({ ...prevState, message: { text: "My message" } }));
```

To properly update the `text` field, we need to create a new object that includes all fields and nested objects from the original object:

```jsx
// Correct
setMessage((prevState) => ({
  ...prevState,             // copy all other field/objects
  message: {                // recreate the object that contains the field to update
    ...prevState.message,   // copy all the fields of the object
    text: "My message",     // overwrite the value of the field to update
  },
}));
```

In the same way, here’s how you’d update the `author` field of the `state` object:

```jsx
// Correct
setMessage((prevState) => ({
  author: "Joe",            // overwrite the value of the field to update
  ...prevState.message,     // copy all other field/objects
}));
```

However, this is assuming the `message` object doesn’t change. If it does change, you’d have to update the object this way:

```jsx
// Correct
setMessage((prevState) => ({
  author: "Joe",            // update the value of the field
  message: {                // recreate the object that contains the field to update
    ...prevState.message,   // copy all the fields of the object
    text: "My message",     // overwrite the value of the field to update
  },
}));
```

---

## Managing React state: Multiple variables vs. One state object

When working with multiple fields or values as the state of your application, you have the option of organizing the state using multiple state variables:

```jsx
const [id, setId] = useState(-1);
const [message, setMessage] = useState("");
const [author, setAuthor] = useState("");
//Or an object state variable:
const [messageObj, setMessage] = useState({
  id: 1, message: "", author: ""
});
```

However, you have to be careful when using state objects with a complex structure (nested objects). Consider this example:

```jsx
const [messageObj, setMessage] = useState({
  input: {
    author: { 
      id: -1,
      author: {
        fName: "",
        lName: ""
      } 
    },
    message: {
      id: -1,
      text: "",
      date: now() 
    },
  },
});
```

If you have to update a specific field nested deep in the object, you’ll have to copy all the other objects along with the key-value pairs of the object that contains that specific field:

```jsx
setMessage((prevState) => ({
  input: {
    ...prevState.input,
    message: {
      ...prevState.input.message,
      text: "My message" 
    },
  },
}));
```

In some cases, [**cloning deeply nested objects**](/blog.logrocket.com/methods-for-deep-cloning-objects-in-javascript.md) can be expensive because [**React may re-render**](/blog.logrocket.com/how-when-to-force-react-component-re-render.md) parts of your applications that depend on fields that haven’t even changed.

For this reason, the first thing you need to consider is trying to flatten your state object(s). In particular, the React documentation recommends [<FontIcon icon="fa-brands fa-react"/>splitting the state into multiple state variables](https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables) based on which values tend to change together.

If this is not possible, the recommendation is to use libraries that help you work with immutable objects, such as [**Immutable.js or Immer**](/blog.logrocket.com/immer-and-immutable-js-how-do-they-compare.md).

---

## Rules for using `useState`

`useState` abides by the same rules that all React Hooks follow:

- Only call hooks at the top level
- Only call hooks from React functions

The second rule is easy to follow. Don’t use `useState` in a class component:

```jsx
class App extends React.Component {
  render() {
    const [message, setMessage] = useState("");
    return (
      <p>
        <strong>{message}</strong>
      </p>
    );
  }
}
```

Or regular JavaScript functions (not called inside a functional component):

```jsx
function getState() {
  const messageState = useState("");
  return messageState;
}
const [message, setMessage] = getState();
const Message = () => {
  /* ... */
};
```

[<FontIcon icon="fa-brands fa-react"/>You’ll get an error.](https://legacy.reactjs.org/warnings/invalid-hook-call-warning.html) The first rule means that even inside functional components, you shouldn’t call `useState` in loops, conditions, or nested functions because React relies on the order in which `useState` functions are called to get the correct value for a particular state variable.

In that regard, the most common mistake is to wrap `useState` calls in a [**conditional statement**](/blog.logrocket.com/react-conditional-rendering-9-methods.md) (they won’t be executed all the time):

```jsx
if (condition) {
  // Sometimes it will be executed, making the order of the useState calls change
  const [message, setMessage] = useState("");
  setMessage(aMessage);
}
const [list, setList] = useState([]);
setList([1, 2, 3]);
```

A functional component can have many calls to `useState` or other Hooks. Each Hook is stored in a list, and there’s a variable that keeps track of the currently executed Hook.

When `useState` is executed, the state of the current Hook is read (or initialized during the first render), and then, the variable is changed to point to the next Hook. That’s why it is important to always maintain the Hook calls in the same order. Otherwise, a value belonging to another state variable could be returned.

In general terms, here’s a step-by-step example of how React handles and tracks state changes in functional components when using the `useState` Hook:

1. React initializes the list of Hooks and the variable that keeps track of the current Hook
2. React calls your component for the first time
3. React finds a call to `useState`, creates a new Hook object (with the initial state), changes the current Hook variable to point to this object, adds the object to the Hooks list, and returns the array with the initial state and the function to update it
4. React finds another call to `useState` and repeats the actions of the previous step, storing a new Hook object and changing the current Hook variable
5. The component state changes
6. React sends the state update operation (performed by the function returned by `useState`) to a queue to be processed
7. React determines it needs to re-render the component
8. React resets the current Hook variable and calls your component
9. React finds a call to `useState`, but this time, because there’s already a Hook at the first position of the list of Hooks, it just changes the current Hook variable and returns the array with the current state, and the function to update it
10. React finds another call to `useState` and because a Hook exists in the second position, once again, it just changes the current Hook variable and returns the array with the current state and the function to update it

If you like to read code, refer to the [`ReactFiberHooks` (<FontIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react/blob/fd557d453d37eab29eca18f0507750ab2093669d/packages/react-reconciler/src/ReactFiberHooks.js) class to learn how Hooks work under the hood.

<SiteInfo
  name="react/packages/react-reconciler/src/ReactFiberHooks.js at fd557d453d37eab29eca18f0507750ab2093669d · facebook/react"
  desc="The library for web and native user interfaces."
  url="https://github.com/facebook/react/blob/fd557d453d37eab29eca18f0507750ab2093669d/packages/react-reconciler/src/ReactFiberHooks.js/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/3d6ec153b5a836513f184160f2fb5eef298de54d90717f99ff87e5661a8bff53/facebook/react"/>

---

## `useState` vs. `useEffect` React Hooks

`useState` and `useEffect` allow you to manage state and side effects in your functional components. However, they serve different purposes and should be used in different ways:

### `useState`
  
- Allows you to add state to your functional component
- Returns an array with two values: the current state and a setter function for updating the state
- Used for managing state that needs to be updated and re-rendered based on user interactions or other events in the component

### `useEffect`

- Used to manage side effects in functional components. A side effect is any operation that impacts the component outside of its render, such as making an API call or setting up a timer
- Used to manage side effects that need to run after every render of the component or perform any cleanup when the component unmounts

For example, consider a component that fetches data from an API and displays it in a list:

```jsx
const [data, setData] = useState([]);
useEffect(() => {
  fetch("<https://api.example.com/data>")
    .then((res) => res.json())
    .then((data) => setData(data));
}, []);
return (
  <ul>
    {data.map((item) => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
```

In this example, the `useEffect` Hook is used to make an API call and update the `data` state whenever the component is rendered. The Hook takes a `callback` function as an argument, which will be executed after every render of the component. The second argument to `useEffect` is an array of dependencies, which determines when the effect should run. In this case, the empty array means that the effect will only run once when the component is mounted.

---

## Understanding the `useReducer` Hook

For advanced use cases, you can use the [**`useReducer` Hook**](/blog.logrocket.com/react-usereducer-hook-ultimate-guide.md) as an alternative to `useState`. This is especially useful when you have complex state logic that uses multiple sub-values or when a state depends on the previous one.

---

## Key points to remember about the `useState` React Hook

- The update function doesn’t update the value right away
- If you use the previous value to update state, you must pass a function that receives the previous value and returns an updated value, for example, `setMessage(previousVal => previousVal + currentVal)`
- If you use the same value as the current state to update the state, React won’t trigger a re-render
- Unlike `this.setState` in class components, `useState` doesn’t merge objects when the state is updated; it replaces them
- `useState` follows the same rules that all Hooks do. In particular, pay attention to the order in which these functions are called (there’s an [ESLint plugin (<FontIcon icon="fa-brands fa-npm"/>`eslint-plugin-react-hooks`)](https://npmjs.com/package/eslint-plugin-react-hooks) that will help you enforce these rules)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "useState in React: A complete guide",
  "desc": "React useState allows you to add state to functional components, returning an array with two values: current state and a function to update it.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/guide-usestate-react.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
