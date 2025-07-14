---
lang: en-US
title: "A complete guide to React refs"
description: "Article(s) > A complete guide to React refs"
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
      content: "Article(s) > A complete guide to React refs"
    - property: og:description
      content: "A complete guide to React refs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/complete-guide-react-refs.html
prev: /programming/js-react/articles/README.md
date: 2023-10-24
isOriginal: false
author:
  - name: Jeremias Menichelli
    url : https://blog.logrocket.com/author/jeremiasmenichelli3/
cover: /assets/image/blog.logrocket.com/complete-guide-react-refs/banner.png
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
  name="A complete guide to React refs"
  desc="React refs, or references, allow you to reference and interact with DOM nodes or React components directly."
  url="https://blog.logrocket.com/complete-guide-react-refs"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/complete-guide-react-refs/banner.png"/>

::: note Editor’s note

This post was last updated on 24 October 2023 to include information about React callback refs, as well as common mistakes to avoid when working with refs.

:::

![A Complete Guide To React Refs](/assets/image/blog.logrocket.com/complete-guide-react-refs/banner.png)

React empowers us to reimagine a view as a component’s state, simplifying the solution to frontend challenges. While the library encourages a declarative and component-centric approach, it also offers escape hatches, like refs, enabling direct access to DOM properties. These tools prove invaluable when tasks such as auto-focusing a text box during component rendering demand direct DOM manipulation.

In this article, we will learn about React refs and explore why React allows developers to access the DOM, even though it’s meant to abstract code from DOM manipulation.

---

## React refs

Refs in React are short for references. As the name suggests, they allow you to reference and interact with DOM nodes or React components directly. Refs come in handy when you need to reference some information in a component, but you don’t want that information to trigger new renders.

Common use cases of React refs include:

- Managing focus, text selection, or media playback
- Triggering imperative animations
- Integrating with third-party DOM libraries

---

## Creating refs

In React, Refs can be created by using either the `createRef` method or the `useRef` Hook.

### Creating Refs using the `useRef` Hook

You can create refs using the `useRef` Hook, which is available as part of the React library. Here’s an example of creating a reference in a functional component:

```jsx :collapsed-lines title="ActionButton.jsx"
import React, { useRef } from "react";

function ActionButton() {
  const buttonRef = useRef(null);

  function handleClick() {
    console.log(buttonRef.current);
  }

  return (
    <button onClick={handleClick} ref={buttonRef}>
      Click me
    </button>
  );
};
export default ActionButton;
```

In the code snippet above, we used the `useRef()` Hook to create a reference to the button element, which we named `buttonRef`. This reference enables us to access the current value of `buttonRef` using `buttonRef.current`. One advantage of using a ref is that it maintains its state across renders, making it a valuable tool for storing and updating values without causing unnecessary re-renders.

### Creating refs using the `createRef`Hook

To create a ref in a class component, we use `React.createRef()`. Here’s an example:

```jsx :collapsed-lines title="ActionButton.jsx"
import React, { Component } from "react";

class ActionButton extends Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }

  handleClick = () => {
    console.log(this.buttonRef.current);
  }

  render() {
    return (
      <button onClick={this.handleClick} ref={this.buttonRef}>
        Click me
      </button>
    );
  }
}

export default ActionButton;
```

In the code snippet above, we use `React.createRef()` to create a reference that we named `buttonRef`. We then assign the reference to the button element.

### Differences between `useRef` and `createRef`

There are some key differences between the `useRef` Hook and the `createRef` method in React. Firstly, `createRef` is generally used when creating a ref in a class component, whereas `useRef` is used in function components.

Secondly, `createRef` returns a new ref object each time it is called, while `useRef` returns the same ref object on every render.

Another important difference is that `createRef` does not accept an initial value, so the current property of the ref will be initially set to `null`. In contrast, `useRef` can accept an initial value, and the current property of the ref will be set to that value.

---

## Using React refs

The concept of [**declarative views**](/blog.logrocket.com/solidjs-vs-react.md) in React revolutionized the way developers build user interfaces. Instead of directly manipulating the DOM through imperative code, React allows developers to describe what the UI should look like based on the current state. However, there are scenarios where you still need to interact with the DOM or access the underlying rendered components. That’s where React refs come in handy.

Here are a few use cases for using React refs.

### Focus control

You can achieve focus in an element programmatically by calling `focus()` on the node instance. Because the DOM exposes this as a function call, the best way to do this in React is to create a ref and manually do it when we think it’s suitable, as shown below:

```jsx :collapsed-lines title="InputModal.jsx"
import React, { useState } from "react";

const InputModal = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  
  const onChange = (e) => {
    setValue(e.target.value);
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="modal--overlay">
      <div className="modal">
        <h1>Insert a new value</h1>
        <form action="?" onSubmit={onSubmit}>
          <input type="text" onChange={onChange} value={value} />
          <button>Save new value</button>
        </form>
      </div>
    </div>
  );
};
export default InputModal;
```

In this modal, we allow the user to modify a value already set in the screen below. It would be a [**better UX**](/blog.logrocket.com/improve-react-ux-skeleton-ui.md) if the input was on focus when the modal opens, which would enable a smooth keyboard transition between the two screens. The first thing we need to do is get a reference for `input`:

```jsx :collapsed-lines title="InputModal.jsx"
import React, { useRef, useState } from "react";

const InputModal = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);
  
  const onChange = (e) => {
    setValue(e.target.value);
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="modal--overlay">
      <div className="modal">
        <h1>Insert a new value</h1>
        <form action="?" onSubmit={onSubmit}>
          <input ref={inputRef} type="text" onChange={onChange} value={value} />
          <button>Save new value</button>
        </form>
      </div>
    </div>
  );
};
export default InputModal;
```

Next, when `modal` mounts, we imperatively call `focus` on our `input ref` within a `useEffect` Hook:

```js :collapsed-lines title="InputModal.jsx"
import React, { useEffect, useRef, useState } from "react";

const InputModal = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, [])

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="modal--overlay">
      <div className="modal">
        <h1>Insert a new value</h1>
        <form action="?" onSubmit={onSubmit}>
          <input ref={inputRef} type="text" onChange={onChange} value={value} />
          <button>Save new value</button>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
```

So, when you open the `modal`, you should see the text box focused by default:

![Opening a Modal Focuses the Text Box](/assets/image/blog.logrocket.com/complete-guide-react-refs/opened-modal-react-useref.png)

Remember that you need to access the element through the `current` property.

Check out the [<FontIcon icon="iconfont icon-codesandbox"/>CodeSandbox](https://codesandbox.io/s/adoring-haibt-v8u28p) for the example above.

### Detect if an element is contained

Similarly, you want to know if any element dispatching an event should trigger some action on your app. For example, our `modal` component could be closed if the user clicked outside of it, like so:

```jsx :collapsed-lines title="InputModal.jsx"
import React, { useEffect, useRef, useState } from "react";

const InputModal = ({ initialValue, onClose, onSubmit }) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    document.body.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  const onClickOutside = (e) => {
    const element = e.target;
    if (modalRef.current && !modalRef.current.contains(element)) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSub = (e) => {
    e.preventDefault();
    onSubmit(value);
    onClose();
  };

  return (
    <div className="modal--overlay">
      <div className="modal" ref={modalRef}>
        <h1>Insert a new value</h1>
        <form action="?" onSubmit={onSub}>
          <input ref={inputRef} type="text" onChange={onChange} value={value} />
          <button>Save new value</button>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
```

Here, we check if the element `click` is outside the `modal` limits. It will work like this:

![Checking the Element Click in React](/assets/image/blog.logrocket.com/complete-guide-react-refs/check-element-click-react-useref.gif)

If it is, then we are preventing further actions and calling the `onClose` callback because the `modal` component expects to be controlled by its parent. Remember to check if the DOM element’s current reference still exists, as state changes in React are asynchronous.

To achieve this, we are adding a [**global click listener**](/blog.logrocket.com/detect-click-outside-react-component-how-to.md) on the `body` element. It’s important to remember to clean the `listener` when the element is unmounted.

### Integrating with DOM-based libraries

React is a great library, but there are many [**other useful libraries and utilities**](/blog.logrocket.com/top-react-ui-libraries-kits.md) outside of its ecosystem that have been used on the web for years. For example, by using refs, we can seamlessly combine React with a top-notch animation library. It’s always beneficial to leverage the stability and resolution provided by these external tools to tackle specific issues.

One such library is the GreenSock Animating Platform, or [**GSAP**](/blog.logrocket.com/animations-react-hooks-greensock.md), which is widely used for animation examples. To use it, we simply need to pass a DOM element to any of its methods. Let’s enhance the appearance of our modal by adding some animations with GSAP:

```jsx :collapsed-lines title="InputModal.jsx"
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const InputModal = ({ initialValue, onClose, onSubmit }) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  const onComplete = () => {
    inputRef.current.focus();
  };

  const timeline = gsap.timeline({ paused: true, onComplete });

  useEffect(() => {
    timeline
      .from(overlayRef.current, {
        duration: 0.25,
        autoAlpha: 0,
      })
      .from(modalRef.current, {
        duration: 0.25,
        autoAlpha: 0,
        y: 25,
      });
    timeline.play();
    document.body.addEventListener("click", onClickOutside);
    return () => {
      timeline.kill();
      document.removeEventListener("click", onClickOutside);
    };
  }, []);

  const onClickOutside = (e) => {
    const element = e.target;
    if (modalRef.current && !modalRef.current.contains(element)) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSub = (e) => {
    e.preventDefault();
    onSubmit(value);
    onClose();
  };

  return (
    <div className="modal--overlay" ref={overlayRef}>
      <div className="modal" ref={modalRef}>
        <h1>Insert a new value</h1>
        <form action="?" onSubmit={onSub}>
          <input ref={inputRef} type="text" onChange={onChange} value={value} />
          <button>Save new value</button>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
```

![Adding Animations to Our React Modal](/assets/image/blog.logrocket.com/complete-guide-react-refs/animations-react.webp)

At the constructor level, we are setting up the initial animation values, which will modify the styles of our DOM references. The timeline only plays when the component mounts. When the element is unmounted, we’ll clean the DOM state and actions by terminating any ongoing animation with the `kill()` method supplied by the `Timeline` instance.

Now, we’ll turn our focus to the `input` after the `timeline` has been completed.

### When should you use the `useRef` Hook?

There are some instances where you would want to use the `useRef` Hook, including the following:

- **Accessing DOM elements**: You can use the `useRef` Hook when you need to interact with a specific DOM element in your component, such as setting the focus on an input field or measuring an element’s size
- **Storing values that don’t trigger re-renders**: When you have a value that changes frequently but doesn’t trigger a re-render, you can use `useRef` to store that value. For example, if you have a timer in your component, you could use `useRef` to store the current time without triggering a re-render
- **Caching expensive computations**: If you need to avoid repeating an expensive computation on every render, you can use `useRef` to store the result of that computation

---

## Using `forwardRef`

As we’ve discussed, refs are useful for specific actions. The examples shown are more simple than what we would find in a web application codebase nowadays — components are more complex, and we barely use plain HTML elements directly.

It’s common to include more than one node to encapsulate more logic around the view behavior. Here’s an example:

```jsx title="LabelledInput.jsx"
import React from 'react'

const LabelledInput = (props) => {
  const { id, label, value, onChange } = props

  return (
    <div class="labelled--input">
      <label for={id}>{label}</label>
      <input id={id} onChange={onChange} value={value} />
    </div>
  )
}

export default LabelledInput
```

The issue now is that passing a ref to this component will return its instance, a React component reference, and not the `input` element we want to focus on, like in our first example. Luckily, React provides an inbuilt solution for this called [**`forwardRef`**](/blog.logrocket.com/use-forwardref-react.md), which allows you to define internally what element the `ref` will point at:

```js title="LabelledInput.jsx"
import React from 'react'

const LabelledInput = (props, ref) => {
  const { id, label, value, onChange } = props

  return (
    <div class="labelled--input">
      <label for={id}>{label}</label>
      <input id={id} onChange={onChange} value={value} ref={ref}/>
    </div>
  )
}

export default React.forwardRef(LabelledInput)
```

See this [<FontIcon icon="iconfont icon-codesandbox"/>example in action](https://codesandbox.io/s/input-modal-example-l2wst?module=%2Fsrc%2Flabelled-input.js).

::: sandpack#react jeremenichelli / Drafts / input-modal-example [rtl theme=dark]

@file /App.js

```js
import React, { useState } from "react";
import InputModal from "./input-modal.js";
import "./styles.css";

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(6);

  const price = 20;
  const onClose = () => setModalOpen(false);
  const onSubmit = value => setQuantity(value);
  return (
    <div className="app">
      <h1>Checkout</h1>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Unit price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quantity}</td>
            <td>${price}</td>
            <td>${price * quantity}</td>
            <td>
              <button onClick={() => setModalOpen(!isModalOpen)}>
                Edit quantity
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {isModalOpen && (
        <InputModal
          onSubmit={onSubmit}
          initialValue={quantity}
          onClose={onClose}
        />
      )}
    </div>
  );
}
```

@file /labelled-input.js

```js
import React from "react";

const LabelledInput = (props, ref) => {
  const { id, label, value, onChange } = props;

  return (
    <div class="labelled--input">
      <label for={id}>{label}</label>
      <input id={id} onChange={onChange} value={value} ref={ref} />
    </div>
  );
};

export default React.forwardRef(LabelledInput);
```

@file /input-modal.js

```js
import React, { createRef } from "react";
import LabelledInput from "./labelled-input";
import gsap from "gsap";

class InputModal extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.modalRef = createRef();
    this.overlayRef = createRef();
    this.state = { value: props.initialValue };

    const onComplete = () => {
      this.inputRef.current.focus();
    };
    const timeline = gsap.timeline({ paused: true, onComplete });

    this.timeline = timeline;
  }

  componentDidMount() {
    this.timeline
      .from(this.overlayRef.current, {
        duration: 0.25,
        autoAlpha: 0
      })
      .from(this.modalRef.current, {
        duration: 0.25,
        autoAlpha: 0,
        y: 25
      });

    this.timeline.play();

    document.body.addEventListener("click", this.onClickOutside);
  }

  componentWillUnmount() {
    this.timeline.kill();

    document.removeEventListener("click", this.onClickOutside);
  }

  onClickOutside = e => {
    const { onClose } = this.props;
    const element = e.target;

    if (this.modalRef.current && !this.modalRef.current.contains(element)) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  onChange = e => {
    this.setState({ value: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    const { onSubmit, onClose } = this.props;
    onSubmit(value);
    onClose();
  };

  render() {
    const { value } = this.state;

    return (
      <div className="modal--overlay" ref={this.overlayRef}>
        <div className="modal" ref={this.modalRef}>
          <h1>Insert a new value</h1>
          <form action="?" onSubmit={this.onSubmit}>
            <LabelledInput
              label="quantity"
              ref={this.inputRef}
              type="text"
              onChange={this.onChange}
              value={value}
            />
            <button>Save new value</button>
          </form>
        </div>
      </div>
    );
  }
}

export default InputModal;
```

@file /styles.css

```css
.app {
  font-family: sans-serif;
  font-size: 15px;
}

table {
  width: 100%;
  text-align: left;
}

button {
  background-color: black;
  color: white;
  border-radius: 3px;
  border-width: 0;
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 700;
}

form,
input {
  font-size: inherit;
}

label {
  color: gray;
  display: block;
  font-weight: 700;
  margin: 0 0 0.5rem;
  text-transform: uppercase;
}

input {
  border-color: black;
  border-style: solid;
  font-weight: 700;
  padding: 0.5rem;
  margin: 0 0 1rem;
}

.modal {
  background-color: white;
  border-radius: 3px;
  top: 2rem;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 2rem;
  position: fixed;
  max-width: 90vw;
  z-index: 2;
}

.modal--overlay {
  background-color: rgba(0, 0, 0, 0.5);
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 2;
}
```

@setup

```js
{
  dependencies: {
    "gsap": "3.0.5",
  }
}
```

:::

To achieve this, we’ll pass a second argument to our function and place it in the desired element. Now, when a parent component passes a `ref` value, it will obtain the `input`, which is helpful to avoid exposing the internals and properties of a component and breaking its encapsulation. The example of our form that we saw failing to achieve focus will now work as expected.

---

## Using callback refs

In React, there is another way to use refs: callback refs. Callback refs provide customization for a component’s behavior during component mounting and unmounting.

Unlike traditional refs, which store direct references to DOM elements, callback refs use functions that receive the DOM element or component instance as their argument. This approach offers several advantages:

- **Control**: Callback refs allow precise control over when refs are set and unset, which is particularly valuable when dealing with dynamic content or conditional rendering
- **Encapsulation**: With callback refs, you can encapsulate logic related to DOM interactions within the ref callback function. This promotes code reusability and maintainability
- **Flexibility**: Callback refs are versatile and can be used to access both DOM nodes and component instances

### Creating a callback ref

To use a callback ref, define a function within your component and pass it as the `ref` attribute to an element. Here’s an example:

```js :collapsed-lines title="MyComponent.jsx"
import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const myRef = useRef(null);

  // Callback ref function
  const handleRef = (element) => {
    if (element) {
      // Access the DOM element
      console.log('Accessing the DOM element:', element);

      // Perform actions on mount
      console.log('Component mounted');
    } else {
      // Perform actions on unmount
      console.log('Component unmounted');
    }
  };

  return (
    <div>
      {/* Attach the callback ref */}
      <div ref={handleRef}>This is a DOM element.</div>
    </div>
  );
}

export default MyComponent;
```

In this example, we define the `handleRef` function as a callback ref. When the component mounts, `handleRef` is called with the DOM element as its argument. You can access the DOM element or perform any necessary actions. When the component unmounts, the callback ref is called again with `null`, allowing you to perform cleanup or additional actions.

Callback refs differ from normal refs in how they are defined and how they provide access to elements or component instances. Callback refs use functions to grant more flexibility and customization, while normal refs store direct references using the `.current` property.

---

## Common mistakes when working with React refs

React refs are a powerful feature that allows you to access and manipulate the DOM directly. However, they can also lead to various common mistakes if not used carefully.

### Overusing refs

Overusing refs is a common mistake that can make your code more difficult to read and maintain. It can also lead to performance problems, as refs can cause unnecessary re-renders. As a rule of thumb, use refs only when you need to directly access the DOM node or manipulate its properties.

Here is an example of how to overuse refs:

```jsx :collapsed-lines title="MyComponent.jsx"
import React, { useRef } from 'react';

function MyComponent() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;

    // Do something with the form values
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={firstNameRef} placeholder="First Name" />
      <input type="text" ref={lastNameRef} placeholder="Last Name" />
      <input type="email" ref={emailRef} placeholder="Email" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyComponent;
```

Using refs to directly access the input values is not in line with React’s best practices. Here’s a better approach using controlled components and state:

```jsx :collapsed-lines title="MyComponent.jsx"
import React, { useState } from 'react';

function MyComponent() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        placeholder="First Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        placeholder="Last Name"
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        placeholder="Email"
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default MyComponent;
```

### Not initializing refs correctly

To avoid potential errors, it’s crucial to initialize refs properly by creating them using `React.createRef()` for class components or `useRef()` for functional components and assigning them to the intended targets.

Here is an example of how to correctly initialize refs:

```jsx title="MyComponent.jsx"
// Initializing refs correctly
class MyComponent extends React.Component {
  myRef = React.createRef();
  // ...
}

// Initializing refs correctly in a functional component
function MyFunctionalComponent() {
  const myRef = useRef();
  // ...
}
```

### Memory leaks

Failing to clean up refs properly can result in memory leaks. When a component unmounts, React removes the corresponding DOM elements from the page. However, if the component still maintains a reference to the DOM element through a ref, the JavaScript engine won’t garbage collect the element, even though it’s no longer visible or interactive.

This can lead to memory leaks over time. To prevent this, ensure that you set the ref to `null` or remove it when the component unmounts to avoid memory leaks.

Here’s a code sample that demonstrates how to set a ref to `null` when a component unmounts:

```jsx :collapsed-lines title="MyComponent.jsx"
import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const myRef = useRef();

  useEffect(() => {
    // Cleanup when the component unmounts
    return () => {
      myRef.current = null;
    };
  }, []);

  return (
    <div>
      <h1>My Component</h1>
      <div ref={myRef}>This is a DOM element.</div>
    </div>
  );
}

export default MyComponent;
```

---

## Conclusion

React refs are a powerful and versatile feature that empowers developers to break away from the confines of a purely declarative paradigm when necessary. This “escape hatch” allows us to interact with the DOM, integrate with third-party libraries, manage focus and selection, create animations, and facilitate custom component communication without compromising the fundamental principles of React.

While refs can be helpful in specific scenarios, it’s essential to exercise caution and use them sparingly, as overuse can lead to complex and less maintainable code.

For more information, read the [<FontIcon icon="fas fa-globe"/>official React documentation](https://beta.reactjs.org/reference/react/createRef) about refs.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A complete guide to React refs",
  "desc": "React refs, or references, allow you to reference and interact with DOM nodes or React components directly.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/complete-guide-react-refs.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
