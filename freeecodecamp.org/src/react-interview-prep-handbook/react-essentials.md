---
lang: en-US
title: "React Essentials"
description: "Article(s) > (2/6) The React Interview Prep Handbook - Essential Topics and Code Examples" 
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
      content: "Article(s) > (2/6) The React Interview Prep Handbook - Essential Topics and Code Examples"
    - property: og:description
      content: "React Essentials"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/react-interview-prep-handbook/react-essentials.html
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
  url="https://freecodecamp.org/news/react-interview-prep-handbook#heading-react-essentials"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1728643567956/00c98d19-4694-4942-9ad2-d2f25bcf05c0.png"/>

Let's go through some essential topics you need to get familiar with:

---

## What is Virtual DOM in React?

As we all know, the browser DOM (Document Object Model) is a tree-like structure of different HTML elements. Virtual DOM is an in-memory representation or a lightweight version of the real DOM. It is an abstraction created by React which is similar to the real DOM.

Why does React use the virtual DOM? Updating and re-rendering the real DOM is slow and inefficient, especially if it gets updated frequently. So, instead of updating the real DOM directly, React updates the virtual DOM.

The virtual DOM is then compared to the real DOM and once it identifies the differences, it only updates that part of the DOM, rather than rendering the entire DOM again. This process is known as [<VPIcon icon="fa-brands fa-react"/>diffing and reconciliation](https://legacy.reactjs.org/docs/reconciliation.html).

---

## What is JSX?

JSX (JavaScript XML) is a syntax extension for JavaScript that allows you to write HTML-like code in the same file as the JavaScript code. This makes it very easy for your HTML to work with JavaScript.

You can write JSX code in a `.js` or `.jsx` file. Consider the following <VPIcon icon="fa-brands fa-react"/>`MyComponent.jsx` file:

```jsx title="MyComponent.jsx"
const MyComponent = () => {
    const name = "Kunal"
    return (
        <div>
            {name}
        </div>
    )
}
```

---

## What is State?

State is a React object that contains information about the component and determines how the component behaves. State can change any time based on user behavior. Any change in state causes the entire component to re-render.

State is used to render dynamic information in the component and makes the UI interactive. State determines how a component reacts to events like user input and data manipulation, and controls what it renders on screen.

Some things you need to keep in mind while using state:

- States are immutable. Always update the state using a `setState` function. For objects/arrays, create new ones and set the state with the new array/object. This ensures proper component behavior.
- Use state only when necessary, avoid storing redundant information as it may cause unnecessary re-renders.
- Use the state locally in the same component, avoid passing state down the DOM tree, unless absolutely necessary. For global state, use context or redux.

Check the [<VPIcon icon="fa-brands fa-react"/>legacy docs](https://legacy.reactjs.org/docs/state-and-lifecycle.html) for state in class components. For functional components, refer to the [`useState`](/freecodecamp.org/react-interview-prep-handbook/react-hooks.md#usestate-hook) section.

---

## What are props?

Props (short for properties) are a way to pass data from one component to another. They can be considered as arguments passed to components. Props are passed to a child component similar to HTML attributes.

Let's take an example:

```jsx
function ParentComponent() {
  const name = "John Doe";
  const age = 30;

  const handleClick = () => {
    console.log("Button clicked")
  };

  return (
    <div>
      <ChildComponent name={name} age={age} handleClick={handleClick} />
    </div>
  );
}

function ChildComponent({ name, age, handleClick }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
```

- Here, the parent component passes down name, age and handleClick method as props to the child component.
- These props form a `props` object that contains the values passed. Every functional component takes a `props` object as an argument
- We have accessed the props by destructuring the object in the child component.

Props can only be passed one way down the component tree. That is, from parent to child component. Props are read-only, you cannot change their value directly. State values passed down as props can be updated using state update function.

---

## Difference Between Class and Functional components

React components are of two types: class and functional components. Let's understand the difference between the two:

::: tabs

@tab:active Class Components

- Class components are written using ES6 classes. Its properties and functions are accessed using the `this` keyword. They need a `render` method to return JSX.
- Class components are stateful components that contain built-in features like State and Context.
- They have methods for different stages of component lifecycle: `componentDidMount()` `componentDidUpdate()` `componentWillUnmount()`, and so on.
- Class components are verbose, hard to read and always need `this` keyword to access properties.

@tab Functional Components

- Functional components are simple JavaScript functions that take a `props` object as an argument. They don't need a `render` method, they return JSX directly.
- Functional components are stateless and do not have state of their own. Instead, they use Hooks to use class component features like State or Context.
- There are no lifecycle methods, lifecycle is be managed with `useEffect` hook.
- Functional components require less code than class components, so they are easier to read and write.

:::

Nowadays, developers prefer and recommend functional components, especially with Hooks. Class components are usually found in older codebases.

However, knowing class components is helpful as a lot of companies have old codebases written using class components.

---

## What is the Component Lifecycle?

Every React component has a lifecycle that goes through three phases: Mounting, Updating and Unmounting.

::: tabs

@tab:active Mounting

In this phase, a component is created and added to the DOM. When a component is mounted, the following methods are called:

- [`constructor()`](https://geeksforgeeks.org/react-js-constructor-method/)
- [`static getDerivedStateFromProps(props, state)`](https://geeksforgeeks.org/react-js-static-getderivedstatefromprops/) (rarely used)
- [`render()`](https://geeksforgeeks.org/react-js-render-method/)
- `componentDidMount()`

`componentDidMount()` is called only once; that is, when the component mounts. It is the preferred method for executing side effects when a component loads for the first time. In functional components, its equivalent is `useEffect` Hook.

@tab Updating

In updating phase, the component's state or props change, which causes the component to re-render. The following methods are called when component updates:

- [`shouldComponentUpdate(nextProps, nextState)`](https://geeksforgeeks.org/reactjs-shouldcomponentupdate-method/)
- `render()` (called again)
- [`getSnapshotBeforeUpdate()`](https://geeksforgeeks.org/reactjs-getsnapshotbeforeupdate-method/)
- `componentDidUpdate()`

The `componentDidUpdate` method is called following times:

- The first time when component mounts, after the `componentDidMount` method.
- Any state or props change triggering component re-render.

It is useful to execute side effects when a state updates. In functional component, the equivalent is `useEffect` with dependencies.

@tab Unmounting

In this phase, the component is removed from the DOM. The `componentWillUnmount` method is called while unmounting.

It is mostly used for cleanup tasks before the component unmounts. Refer to the [`useEffect`](/freecodecamp.org/react-interview-prep-handbook/react-hooks.md#useeffect-hook) section for its equivalent.

:::

---

## Controlled and Uncontrolled components

In controlled components, the form elements are managed by React state. This means that the values of form fields are set and updated ("controlled" by React state). All form data is stored in state before submitting the form.

Example of controlled component:

```jsx
function ControlledComponent() {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Value: ${value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="submit">Submit</button>
    </form>
  );
}
```

- The value of the `input` field is being controlled by React state variable `value`.
- When you update the input field, the state gets updated and value of the input is set accordingly.

Uncontrolled components, on the other hand, do not depend on state to manage forms. Instead, the values of form fields are managed internally, usually with refs. Refs are used to directly interact with the DOM elements and update values without updating state and causing re-renders.

Example of uncontrolled component:

```jsx
function UncontrolledComponent() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Input Value: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} />
        <button type="submit">Submit</button>
    </form>
  );
}
```

Here, we have used a ref to directly access the input element's DOM node and used its value to access form data. This makes form handling much simpler compared to using state.

When to use either:

- Use controlled components if you want more control over data that the user inputs. This is particularly useful when two form fields are dependent on each other.
- If you have multiple state dependent on the form data, using state is a good practice.
- Use uncontrolled components if your form is very simple and there's no need to manipulate the form data.

---

## What are Pure Components?

A pure component is similar to a normal component, except that it only renders if its state or props have changed.

Let's take an example:

```jsx
const PureExample = React.memo(() => {
  return <h1> Hello {this.props.name} </h1>;
});

function App() {
  const [name, setName] = useState("");
  const [toggle, setToggle] = useState(false);
  return (
    <div className="App">
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setToggle(!toggle)}> Toggle </button>
      <PureExample name={name} />
    </div>
  );
}
```

- `PureExample` is a pure component that is a child of `App` component. Pure components can be created by surrounding the function with `React.memo()`.
- In the example, we have an `input` field that updates `name`, and a button that toggles the state, `toggle`.
- `name` is passed down as props to `PureExample`, so it re-renders if `name` is updated. If you update `toggle` or any other state, `PureExample` does not re-render.

In case of class components, pure components can be created by extending the `PureComponent` class. However, functional components are recommended.

```jsx
class PureExample extends React.PureComponent {
  render() {
    return <h1> Hello {this.props.name} </h1>;
  }
}
```

Usually, when parent component re-renders, React renders all its child components again, even if none of the child components have updated.

Pure components are used for child components that only need to re-render if one of their props change. This skips unnecessary re-renders and improves performance.