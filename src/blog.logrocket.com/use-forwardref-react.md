---
lang: en-US
title: "How to use forwardRef in React"
description: "Article(s) > How to use forwardRef in React"
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
      content: "Article(s) > How to use forwardRef in React"
    - property: og:description
      content: "How to use forwardRef in React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/use-forwardref-react.html
prev: /programming/js-react/articles/README.md
date: 2024-08-14
isOriginal: false
author:
  - name: Peter Ekene Eze
    url : https://blog.logrocket.com/author/peterekeneeze/
cover: /assets/image/blog.logrocket.com/use-forwardref-react/banner.png
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
  name="How to use forwardRef in React"
  desc="In this tutorial, we'll review forwarding refs in React and how it helps us manage interactions with the DOM."
  url="https://blog.logrocket.com/use-forwardref-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/use-forwardref-react/banner.png"/>

::: note Editor’s Note

This post was last updated by [<FontIcon icon="fas fa-globe"/>Jude Miracle](https://blog.logrocket.com/author/judemiracle/) on 13 August 2024 to introduce the use of the `useImperativeHandle` React Hook for customizing instance values that are exposed when using refs. It also now covers integrating `forwardRef` with functional components and class components.

:::

![How To Use ForwardRef In React](/assets/image/blog.logrocket.com/use-forwardref-react/banner.png)

In this tutorial, we will go over the concept of forwarding [**refs in React**](/blog.logrocket.com/complete-guide-react-refs.md) and understand how it helps us manage interactions with the DOM. For a more engaging experience, we’ll cover how to create refs, attach created refs to DOM elements and classes, use the `forwardRef` method, and more.

We will often reference the [<FontIcon icon="fa-brands fa-react"/>React documentation](https://react.dev/) to build on the existing information and prove our concepts with practical examples.

---

## What is `forwardRef` in React?

`forwardRef` is a utility function that passes down a `ref` through a component to one of its children. This is particularly useful when you need to access a DOM element or component instance directly in a parent component but the desired child element is wrapped by a higher-order component or a component that doesn’t expose the `ref` by default.

`forwardRef` takes a [**functional component**](/blog.logrocket.com/testing-state-changes-in-react-functional-components.md) as its argument and returns a new component with a forwarded `ref` attribute. This allows you to directly access the underlying child DOM node or instance from a parent component using the `ref`.

### Why is `forwardRef` important?

`forwardRef` allows for a more flexible and efficient component composition. When working with complex applications, there are cases where you need direct access to a child component’s DOM element or instance from a parent component. However, React’s default behavior doesn’t always allow this, especially when dealing with [**higher-order components**](/blog.logrocket.com/understanding-react-higher-order-components.md) (HOCs) or wrapper components.

By using `forwardRef`, you can pass a reference from a parent component to a child component, even if that child component is wrapped inside another component. This enables the parent component to directly interact with the child’s DOM element or instance.

---

## How do refs work in React?

To understand ref forwarding, we must first understand what refs are. Refs are a way to access and interact with a DOM element directly. Refs allow you to bypass the typical React data flow and perform actions not achievable with [**props**](/blog.logrocket.com/the-modern-guide-to-react-prop-types.md) and [**state**](/blog.logrocket.com/modern-guide-react-state-patterns.md) alone.

Refs are often used for tasks like setting focus on an input field, measuring the dimensions of an element, or triggering animations. For instance, you can use refs to give focus on an input field when a button is clicked:

```jsx :collapsed-lines title="App.jsx"
import * as React from "react";
import ReactDOM from "react-dom";

export default function App() {
  const ref = React.useRef();

  function focus() {
    ref.current.focus();
  }

  return (
    <div className="App">
      <input ref={ref} placeholder="my input" />
      <button onClick={focus}>Focus</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Similarly, we could use JavaScript to achieve a similar effect. However, it is not recommended to do this, and it is even marked as a bad practice to access the DOM directly when using React. The vanilla JavaScript equivalent to focusing an element could look like the following code snippet:

```jsx
document.getElementById('myInput').focus()
```

---

## When to use refs in React

Many refs can be pointed to using `forwardRef`. In React, it’s generally recommended to use props and state to manage your component data flow. However, there are some situations where using refs can be helpful or even necessary. Here are some common use cases for refs in React:

- **Managing focus, text selection, or media playback**: Refs can be used to manage focus on form elements, select text in an input or text area, or control media playback for audio or video elements
- **Triggering animations**: If you need to trigger animations using external libraries like [**GSAP**](//blog.logrocket.com/using-gsap-3-for-web-animation.md) or [**Anime.js**](/blog.logrocket.com/exploring-anime-js-example-site-animation-project.md), you might need a direct reference to a DOM element, which can be achieved using refs
- **Integrating with third-party DOM libraries**: When using third-party libraries that require direct access to DOM elements, refs can be useful for providing the necessary access
- **Measuring the dimensions or position of elements**: Refs can help you measure the size, position, or scroll position of an element. This can be useful for tasks like implementing a custom scrollbar, creating tooltips, or building responsive components

While refs are powerful tools, they should be used sparingly and only when necessary. Excessive use of refs can lead to code that is harder to understand and maintain. Always opt to use props and state for data flow in React components when possible.

---

## Working with refs in class components

In this section, we will focus specifically on working with refs in class components. Although React has moved towards functional components with [**React Hooks**](/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.md), it is still important to understand how to manage refs in class components, as they remain prevalent in many existing projects.

We will cover the process of creating, attaching, and using refs in class components, along with examples that illustrate common use cases. This knowledge will enable you to use refs effectively in class components and facilitate a smoother transition to functional components and Hooks when needed.

### Creating refs in React

To create a ref, React provides a function called [**`React.createRef`**](/blog.logrocket.com/react-createref-guide.md). Once created, they can be attached to React elements via the `ref` attribute. When a component is constructed, refs get assigned to instance properties of that component, ensuring that they can be referenced anywhere in the component. Here’s what that looks like:

```jsx title="MyComponent.jsx"
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.newRef = React.createRef(); //newRef is now available for use throughout our component
  }
  // ...
}
```

At this point, we have created a `Ref` called `newRef`. To use this `Ref` in our component, we simply pass it as a value to the `ref` attribute like this:

```jsx title="MyComponent.jsx"
class MyComponent extends React.Component {
  // ...
  render() {
    return <div ref={this.myRef} />;
  }
}
```

Here, we’ve attached the `Ref` and passed in the `newRef` as its value. As a result, we now can update this without changing the component’s state.

### Attaching refs

In this section, we will discuss attaching refs in React, which is the process of relating a ref to a DOM element for direct DOM manipulation. This step is crucial in order to effectively work with refs and employ their potential in various use cases, such as managing focus, measuring element dimensions, or triggering animations.

We already covered how to create refs with `createRef`, so now we will relate it to a DOM element by using the `ref` prop:

```jsx
<div ref={this.myRef} />
```

And, finally, when we are ready to access the DOM element later on in the component lifecycle, we can do something like this:

```jsx
const divWidth = this.myRef.current.offsetWidth;
```

Let’s see this behavior with a complete example where we are going to attach a reference to an HTML `video` element and use React buttons to play and pause the video using the native HTML5 APIs of the `video` element:

```jsx :collapsed-lines title="App.jsx"
import ReactDOM from "react-dom";
import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.myVideo = React.createRef();
  }
  render() {
    return (
      <div>
        <video ref={this.myVideo} width="320" height="176" controls>
          <source
            src="https://res.cloudinary.com/daintu6ky/video/upload/v1573070866/Screen_Recording_2019-11-06_at_4.14.52_PM.mp4"
            type="video/mp4"
          />
        </video>
        <div>
          <button
            onClick={() => {
              this.myVideo.current.play();
            }}
          >
            Play
          </button>
          <button
            onClick={() => {
              this.myVideo.current.pause();
            }}
          >
            Pause
          </button>
        </div>
      </div>
    );
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Here, we used `ref` to pause and play our video player by calling the `pause` and `play` methods on the video. When the **pause** or **play** button is clicked, the function will be called on the video player without a re-render.

### Using refs with functional components

Refs cannot be attached to functional components, although we can define refs and attach them to either DOM elements or class components. The bottom line is that functional components do not have instances, so you can’t reference them.

However, if you must attach a ref to a functional component, the official React team recommends converting the component to a class, just like you would do when you need [**lifecycle methods**](/blog.logrocket.com/react-lifecycle-methods-tutorial-examples.md) or state.

### Conditional refs

Aside from passing the default `ref` attribute, we can also pass functions to set refs. The major advantage of this approach is that you have more control over when refs are set and unset. That is possible because it allows us to determine the state of the ref before certain actions are fired.

Consider this snippet from the [<FontIcon icon="fa-brands fa-react"/>documentation page](https://reactjs.org/docs/refs-and-the-dom.html) below:

```jsx :collapsed-lines title="CustomTextInput.jsx"
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = null;
    this.setTextInputRef = element => {
      this.textInput = element;
    };
    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus();
    };
  }
  componentDidMount() {
    this.focusTextInput();
  }
  render() {
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

Instead of defining the `refs` in the `constructor`, we set the initial value to `null`. The benefit of this approach is that `textInput` will not reference a node until the component is loaded (when the element is created).

---

## Forwarding refs in React using `forwardRef`

When a child component needs to reference its parent component’s current node, the parent component needs a way to send down its ref to the child. The technique is called ref forwarding, and it is very useful when building [**reusable component libraries**](/blog.logrocket.com/build-react-reusable-components-faster-aspect.md). Ref forwarding can be achieved using the `forwardRef` function.

Let’s take an example of a new library with an `InputText` component that will provide a lot of functionality, though, for now, we’ll keep it simple:

```jsx
const InputText = (props) => (
  <input {...props} />
));
```

The `InputText()` component will tend to be used throughout the application similarly to a regular DOM input, therefore accessing its DOM node may be unavoidable for managing focus, selection, or animations related to it.

In the example below, other components in the application have no access to the DOM input element generated by the `InputText()` component and are thus restricting some of the operations we have already foreseen we would need to meet our application requirements, such as controlling the focus of the input programmatically.

Here is when `React.forwardRef` enters to obtain a `ref` passed as `props`, and then forwards it to the DOM `input` that it renders, as shown below:

```jsx
const InputText = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));
```

Now that our component supports `forwardRef`, let’s use it in the context of our application to build a button that will automatically focus the input when it’s clicked. The code looks as follows:

```jsx :collapsed-lines title="App.jsx"
import * as React from "react";
import ReactDOM from "react-dom";

const InputText = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

export default function App() {
  const ref = React.useRef();

  function focus() {
    ref.current.focus();
  }

  return (
    <div className="App">
      <InputText ref={ref} placeholder="my input" />
      <button onClick={focus}>Focus</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

In the code above, we defined a `ref` in the component that needs the `ref` and passed it to the `button` component. React passed the `ref` through and forwarded it down to `<input ref={ref}>` by specifying it as a JSX attribute. When the `ref` was attached, `ref.current` pointed to the `<input>` DOM node.

The second `ref` argument in the `InputRef` component only existed when you defined a component with a `React.forwardRef` call. Regular functional or class components didn’t receive the `ref` argument, and `ref` was not available in `props`. Ref forwarding is not limited to DOM components; you can also forward refs to class component instances.

---

## `forwardRef` with class components

Although `forwardRef` works best with functional components, it can also be used in a class component. It comes in handy when using it with a library that uses `forwardRef`, when wrapping class components in higher-order components, accessing child component DOM nodes, or passing `ref` down through components.

Let’s look at instances where we have a class component and want to wrap it in a higher-order component while still being able to pass refs to the original class component. This can be achieved using `forwardRef`:

```jsx title="Form.jsx"
import React, { forwardRef, Component } from 'react';

class ButtonComponent extends Component {
  handleClick = () => {
    console.log('Button clicked in ButtonComponent');
  };

  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}

const Form = forwardRef((props, ref) => (
  <ButtonComponent ref={ref} {...props} />
));

export default Form;
```

In the above example, the parent component can access the methods and properties of the `ButtonComponent` by passing the ref from the parent to the `Form`, which is then forwarded to the `ButtonComponent`:

```jsx title="App.jsx"
import React, { useRef } from 'react';
import Form from './Form';

const App = () => {
  const buttonComponentRef = useRef();

  const handleButtonClick = () => {
    if (buttonComponentRef.current) {
      buttonComponentRef.current.handleClick(); // Call method in ButtonComponent
    }
  };

  return (
    <div>
      <Form ref={buttonComponentRef} />
      <button onClick={handleButtonClick}>click</button>
    </div>
  );
};

export default App;
```

You can wrap a class component in another class component and handle ref forwarding manually, but it’s more difficult and less intuitive than using `forwardRef` with a functional component.

You should also note that using `forwardRef` with class components can be complex in large codebases. It is important to use it carefully and comment on its usage clearly. Also note that debugging may become slightly more difficult when using `forwardRef`, as the component name may not appear as expected in React DevTools. You can address this by giving the forwarded component a display name.

---

## Using `useImperativeHandle` with `forwardRef`

`useImperativeHandle` is a React Hook that lets you customize the instance value that is exposed when refs are used. It works well with `forwardRef` to expose imperative methods, which allows for more control and functionality.

The `useImperativeHandle` Hook can be useful when needed to expose methods or properties such as `focus`, `toggle`, `mount`, `onClick`, or custom methods of a component to the parent while keeping the component’s implementation details encapsulated.

`useImperativeHandle` is used within a component wrapped with `forwardRef` and it takes three arguments:

- The ref to customize
- A function that returns an object containing imperative methods
- An array of optional dependencies

Let’s see how to use `useImperativeHandle` in React and how it offers enhanced component control:

```jsx :collapsed-lines title="App.jsx"
import React, { useImperativeHandle, forwardRef, useRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    },
  }));

  return <input ref={inputRef} {...props} />;
});

const App = () => {
  const inputRef = useRef();

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus Input</button>
      <button onClick={() => inputRef.current.clear()}>Clear Input</button>
    </div>
  );
};

export default App;
```

In the example code above, the `App` component can focus and clear the input field’s focus state using the exposed methods, providing precise control over the child component

`useImperativeHandle` works similarly to how `useEffect` works by allowing you to maximize speed by only recreating the imperative methods when certain dependencies change. This keeps the methods exposed to the parent component current and removes the need for pointless re-renders.

Let’s see that in action. We will create a component that exposes methods to toggle a modal’s visibility, which only re-creates the methods when the modal’s state changes:

```jsx :collapsed-lines title="App.jsx"
import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';

const Modal = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsVisible(true),
    close: () => setIsVisible(false),
    toggle: () => setIsVisible(prev => !prev),
  }), [isVisible]);

  return (
    <>
      {isVisible && (
          <div className="modal">
            <p>Modal Content</p>
            <button onClick={() => setIsVisible(false)}>Close</button>
          </div>
        )
      }
    </>
  );
});

const App = () => {
  const modalRef = useRef();

  return (
    <div>
      <button onClick={() => modalRef.current.open()}>Open Modal</button>
      <button onClick={() => modalRef.current.close()}>Close Modal</button>
      <button onClick={() => modalRef.current.toggle()}>Toggle Modal</button>
      <Modal ref={modalRef} />
    </div>
  );
};

export default App;
```

In this example, the imperative methods for managing the modal are only re-created when the `isVisible` state changes, making sure the parent component always contains the relevant methods without additional re-renders.

---

## How to use `forwardRef` with TypeScript

TypeScript is a JavaScript subset that offers the benefits of [**static typing**](/blog.logrocket.com/definitive-guide-typing-functions-typescript.md), enhanced tooling, and improved maintainability, leading to better and more reliable code in your JavaScript applications. `forwardRef`, as part of the React library, provides full support for TypeScript, though to maximize its benefits, the code we write should also be [**strongly typed**](/blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript.md).

Say, for example, that you have a functional component that uses `forwardRef` to expose the DOM reference to an HTML input element. This functional component also has its own props declared with their types. When using `forwardRef` in such an example, we’ll have to strongly type the component to avoid errors and improve code readability. One way to do this is by using generic types in `forwardRef`. Here’s an example:

```jsx title="InputText.jsx"
type IInputProps = {
  label: string;
};

const InputText = React.forwardRef<HTMLInputElement, IInputProps>((props, ref) => (
    <div>
      <span>{props.label}</span>
      <input ref={ref} placeholder="your input goes here..." />
    </div>
  )
);
```

As we can see in the code, it is important to specify the type of the `Ref` element and the `props`. Another common way to declare the same component is to assign the type directly in the parameters of the callback function, as follows:

```jsx title="InputText.jsx"
type IInputProps = {
  label: string;
};

const InputText = React.forwardRef((props: IInputProps, ref: React.Ref<HTMLInputElement>) => (
    <div>
      <span>{props.label}</span>
      <input ref={ref} placeholder="your input goes here..." />
    </div>
  )
);
```

In this case, when passing the type for the `ref` param, we need to make sure we are wrapping the `element` type with `React.Ref`. Both ways to declare the component are valid, and there is no argument for one over the other. It’s up to the developer’s style, and in my case, I prefer the first way because I believe it looks cleaner.

Similarly, when working on the `parent` component, we need to specify the `reference` type, and it needs to match the one used in `forwardRef`. To do that, you can use generic types when using `useRef` as follows:

```jsx
const ref = React.useRef<HTMLInputElement>(null);
```

Failing to do so may trigger errors when trying to use methods and properties from the element, as we can see in the image below:

![Forwardref Error Example In React](/assets/image/blog.logrocket.com/use-forwardref-react/forwardref-errors-react.png)

---

## When not to use refs in React

In React, `refs` are a powerful feature that allows developers to interact with DOM elements and components directly. However, there are certain situations where using `refs` may not be the best approach. Here are a few:

### Unnecessary DOM manipulation

React encourages a declarative approach to [**building UIs**](/blog.logrocket.com/building-adaptive-accessible-ui-library-react-aria.md), so you should avoid using refs for direct DOM manipulation unless necessary. Use component state and props to handle most UI updates.

### Overusing refs in stateless components

Functional components are often meant to be simple and stateless. If you find yourself using multiple refs in a functional component, consider if it could be split into smaller components or if state management should be lifted to a higher-level component.

### Using refs for data flow

Refs should not be used as a replacement for state management or prop passing. Data should primarily flow through component props, and when necessary, state management libraries like [Redux](https://blog.logrocket.com/understanding-redux-tutorial-examples/) or [React’s Context API](https://blog.logrocket.com/react-context-api-deep-dive-examples/) can be used.

### Using refs in place of controlled components

In form elements, use controlled components (by setting the value and handling input changes through state and event handlers) whenever possible. Refs should only be used for uncontrolled components when there is a specific need for direct access to the DOM element.

### Accessing child components’ internal state

Refs should not be used to reach into a child component’s internal state or methods. Instead, use callback functions or other state management patterns to communicate between parent and child components.

Remember, refs should generally be used only when necessary. In many cases, React’s inbuilt mechanisms for [**state and prop management**](/blog.logrocket.com/guide-choosing-right-react-state-management-solution.md) are more appropriate for handling component interaction and updates.

---

## Conclusion

Refs in React are a powerful tool that enables direct access to DOM nodes and thus open a whole new spectrum of methods and options to build more performant, feature-rich, and clean components. However, accessing DOM directly is often seen as a bad practice in React, and for a reason, when used improperly, it can turn all its benefits into real problems.

As a general rule, it should be avoided and used only under very specific circumstances and with a thorough examination. In this tutorial, we introduced the topic of refs and ref forwarding, we looked at a few use cases, and we built the code using function and class components.

Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to use forwardRef in React",
  "desc": "In this tutorial, we'll review forwarding refs in React and how it helps us manage interactions with the DOM.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/use-forwardref-react.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
