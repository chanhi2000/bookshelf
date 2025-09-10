---
lang: en-US
title: "React Reference Guide: Refs and the DOM"
description: "Article(s) > React Reference Guide: Refs and the DOM"
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
      content: "Article(s) > React Reference Guide: Refs and the DOM"
    - property: og:description
      content: "React Reference Guide: Refs and the DOM"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-reference-guide-refs-dom.html
prev: /programming/js-react/articles/README.md
date: 2020-09-04
isOriginal: false
author:
  - name: Ohans Emmanuel
    url : https://blog.logrocket.com/author/ohansemmanuel/
cover: /assets/image/blog.logrocket.com/react-reference-guide-refs-dom/banner.png
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
  name="React Reference Guide: Refs and the DOM"
  desc="Refs become necessary when you want to access DOM nodes or React elements created in the render method of your components."
  url="https://blog.logrocket.com/react-reference-guide-refs-dom"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-reference-guide-refs-dom/banner.png"/>

The standard way for a parent component to interact with its child elements is via props, e.g., to modify a child, you’d re-render it with new props. That’s not news.

![React Reference Guide: Refs and the DOM](/assets/image/blog.logrocket.com/react-reference-guide-refs-dom/banner.png)

However, what happens when you need to access DOM nodes or React elements created in the render method of your components? Props don’t exactly help you out here.

Well, this is where refs come in handy.

---

## When to use refs

The best use cases for refs arise when you’re trying to perform imperative actions such as:

- Managing focus, text selection, or media playback
- Working with imperative animation
- Integrating with third-party DOM libraries

To build more consistent React apps, you should avoid using refs for anything that can be done declaratively, i.e., via the standard React data flow with state and props. For example, instead of exposing `open()` and `close()` methods on a `Modal` component, pass an `isOpen` prop and have that managed internally via React state.

---

## Don’t overuse refs

When you first encounter refs or are new to React, you may fall into the trap of thinking refs are an easy way to “get things done” in your app. They certainly fit the imperative model you may be used to working with.

If you find yourself thinking this, take a moment to re-evaluate how such data flow could be resolved via the typical React data flow i.e via state and props.

Oftentimes, the problem at hand may be solved by just lifting state to a parent component higher in the component tree and passing that state value down to the needed component/element.

::: note N.B.

The next sections show examples of how to work with Refs. These examples use `React.createRef`, the API introduced in React 16.3. If you’re using an earlier version of React, [see the section below](#callbackrefs) on using callback refs.

:::

---

## Creating refs

There are two steps to creating ref objects.

::: tabs

@tab:active 1.

**Create a ref object using `React.createRef`**

```jsx title="App.jsx"
class App extends React.Component {
  // see this 
  this.myRef = React.createRef()
}
```

You create a ref by invoking the `createRef` object and typically assign it to an instance property, e.g., `this.myRef` as seen in the example above. This is done so that the ref can be referenced throughout the component.

@tab 2.

**Reference the created `ref` in the render method**

```jsx title="App.jsx"
class App extends React.Component {
  myRef = React.createRef()
  render() {
    //look here
    return <div ref={this.myRef}>I am a div</div>
  }
}
```

After creating the ref object, you pass it on to the required element via the special `ref` attribute.

:::

---

## Accessing refs

After passing a ref to an element in the component `render` method, a reference to the DOM node becomes accessible, as seen below:

```jsx
const domNode = this.myRef.current
```

Note that the `current` property is referenced on the created ref object, where `this.myRef` represents the ref passed to a DOM node via the `ref` attribute.

Look at the code block above. What value does the variable `domNode` contain? Well, that depends on the type of node the `ref` attribute is passed to — it’s always different.

Here are the different options:

::: tabs

@tab:active 1.

**When the `ref` attribute is passed to an `HTML` element, the `ref` object receives the underlying DOM element as its `current` property.**

```jsx
//render 
<div ref={this.myRef} />

//node contains HTMLElement (div) 
const node = this.myRef.current
```

@tab 2.

**When the `ref` attribute is passed to a custom class component, the `ref` object receives the mounted instance of the component.**

```jsx
//render 
<MyClassComponent ref={this.myRef} />

//node contains MyClassComponent class instance
const node = this.myRef.current
```

@tab 3.

**Refs can’t be passed to a function component because they don’t have instances.**

```jsx
//render: don't do this. 
<MyFunctionalComponent ref={this.myRef}
```

:::

The next sections will demonstrate examples of the aforementioned node types.

### Adding a ref to a DOM element

Consider an example of focusing a text input on clicking a button:

![Focusing a Text Input on Clicking a Button](/assets/image/blog.logrocket.com/react-reference-guide-refs-dom/focus-input-example.webp)

To do this, create a ref object that holds the text input DOM node and access the DOM API to focus the input, as show below:

```jsx :collapsed-lines title="App.jsx"
class App extends React.Component {
  // create a ref to hold the textInput DOM element
  textInput = React.createRef();

  focusTextInput = () => {
    // get the input dom node from the ref object
    const inputDOMNode = this.textInput.current;
    // Use the browser imperative api: call the focus method
    inputDOMNode.focus();
  };

  render() {
    return (
      <div>
        {/* pass a ref attribute to the input element */}
        <input type="text" ref={this.textInput} />
        <input
          type="button"
          value="Focus input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

Note that when the component mounts, React assigns the current property of the ref object with the input DOM element. When the component is unmounted, this is assigned to `null`.

The ref updates are also guaranteed to happen before the `componentDidMount` or `componentDidUpdate` lifecycle methods. See a demo below.

::: sandpack#react react-ref-input-focus [rtl theme=dark]

@file /App.js

```js
import React from "react";

import "./styles.css";

class App extends React.Component {
  // create a ref to hold the textInput DOM element
  textInput = React.createRef();

  focusTextInput = () => {
    // get the input dom node from the ref object
    const inputDOMNode = this.textInput.current;
    // Use the browser imperative api: call the focus method
    inputDOMNode.focus();
  };

  render() {
    return (
      <div>
        {/* pass a ref attribute to the input element */}
        <input type="text" ref={this.textInput} />
        <input
          type="button"
          value="Focus input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

export default App;
```

:::

### Adding a ref to a class component

What if we decided to refactor the previous example to pass a ref attribute to a class component, e.g., `MyTextInput`? How much changes?

Take a look below:

```jsx :collapsed-lines title="CustomTextInput.jsx"
class CustomTextInput extends React.Component {
  myInputRef = React.createRef();
  focusTextInput = () => {
    // get dom node from ref props
    const inputDOMNode = this.myInputRef.current;
    inputDOMNode.focus();
  };

  render() {
    // pass ref on from props
    return <input type="text" ref={this.myInputRef} />;
  }
}
```

We have a class component, `CustomTextInput`, with a `focusTextInput` function. Note that the `CustomTextInput` component doesn’t invoke this function but creates and accesses the text input DOM node.

So, if you wanted to trigger this function handler from another component, e.g., to focus the input on mount or when a button is clicked, the following works perfectly:

```jsx :collapsed-lines title="App.jsx"
class App extends React.Component {
  // create a ref to hold the textInput DOM element
  textInputClassInstance = React.createRef();

  focus = () => {
    // call the child handler
    // this is possible because the ref object received the child class instance
    this.textInputClassInstance.current.focusTextInput();
  };

  componentDidMount() {
    this.focus();
  }

  render() {
    return (
      <div>
        {/* pass a ref attribute to the class component. Ref receives the class instance  */}
        <CustomTextInput ref={this.textInputClassInstance} />
        <input type="button" value="Focus input" onClick={this.focus} />
      </div>
    );
  }
}
```

See a demo below:

::: sandpack#react ohansemmanuel / ref-class-input-focus [rtl theme=dark]

@file /App.js

```js
import React from "react";

import "./styles.css";

class CustomTextInput extends React.Component {
  myInputRef = React.createRef();
  focusTextInput = () => {
    // get dom node from ref props
    const inputDOMNode = this.myInputRef.current;
    inputDOMNode.focus();
  };

  render() {
    // pass ref on from props
    return <input type="text" ref={this.myInputRef} />;
  }
}

class App extends React.Component {
  // create a ref to hold the textInput DOM element
  textInputClassInstance = React.createRef();

  focus = () => {
    // call the child handler.
    // This is possible because the ref object received the child class instance
    this.textInputClassInstance.current.focusTextInput();
  };

  componentDidMount() {
    this.focus();
  }

  render() {
    return (
      <div>
        {/* pass a ref attribute to the class component. Ref receives the class instance  */}
        <CustomTextInput ref={this.textInputClassInstance} />
        <input type="button" value="Focus input" onClick={this.focus} />
      </div>
    );
  }
}

export default App;
```

:::

### Refs and function components

Remember that you should not use the ref attribute on function components because they don’t have instances:

```jsx
class Parent extends React.Component {
  textInput = React.createRef();

  render() {
    // This will NOT work!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```

If you want to pass a ref to a function component, consider using `forwardRef`, perhaps in conjunction with `useImperativeHandle`. You could also consider converting said component to a class component.

As stated earlier, you shouldn’t pass a ref to a functional component, but you can create and use refs within functional components, as seen below:

```jsx title="CustomTextInput.jsx"
function CustomTextInput(props) {
  // create ref object using useRef
  const textInput = useRef(null);

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```

---

## Exposing DOM refs to parent components

Occasionally, you may want to access a child’s DOM node from a parent component. This is far from ideal as it breaks component encapsulation. However, there are legitimate use cases that could warrant this technique, e.g., triggering focus or measuring the size or position of a child DOM node.

So, how should you approach this problem?

Firstly, you could add a ref to the child component, as we did in an earlier example. This is not a perfect solution since you get a component instance and not the child DOM node. Also, this doesn’t work with functional components.

With React 16.3 or higher, consider using ref forwarding for such cases. Ref forwarding allows you to expose a child’s DOM node to a parent component.

With React 16.2 or lower, ref forwarding isn’t supported. So what do you do? Consider explicitly passing a ref as a differently named prop.

```jsx title="Parent.jsx"
function CustomTextInput(props) {
  return (
    <div>
      {/* Pass ref to input node*/}
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  // create ref object 
  inputElement = React.createRef();

  render() {
    return (
       {/* pass ref object as a differently named prop: inputRef*/}
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}
```

Note that the approach above requires some code to be added to the child component. In more stringent use cases, you may have no control over the child component implementation. Your best bet is to use [<VPIcon icon="fa-brands fa-react"/>`findDOMNode()`](https://reactjs.org/docs/react-dom.html#finddomnode), but note that this is discouraged and deprecated in [<VPIcon icon="fa-brands fa-react"/>`StrictMode`](https://reactjs.org/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)`.

It is highly recommended to avoid exposing DOM nodes if you don’t need do.

---

## Callback refs

In all the examples we’ve discussed, the ref object has been directly passed on via the `ref` attribute. However, React supports another way to set refs; these are called callback refs.

Instead of passing a `ref` object via the `ref` attribute:

```jsx
myRefObject = React.createRef()
// ...
<div ref={myRefObject} />
```

Pass a function:

```jsx
myRefCallback = (node) => {}
// ...
<div ref={myRefCallback} />
```

React will pass the component instance or DOM element as an argument to the function. This can then be stored and accessed elsewhere!

Callback refs give you a lot more control over actions to be performed when refs are set and unset. Remember that the ref callback is called with the DOM element when the component mounts, and it is called with `null` when it unmounts.

Consider the example below, which creates a ref callback and stores a DOM node in an instance property — a commonly implemented pattern.

```jsx :collapses-lines title="App.jsx"
class App extends React.Component {
  //create instance variable
  textInput = null;

  setTextInputRef = (element) => {
    // save DOM element received in the instance variable: textInput
    this.textInput = element;
  };

  focusTextInput = () => {
    // Focus the text input using the raw DOM API
    if (this.textInput) this.textInput.focus();
  };

  componentDidMount() {
    // autofocus the input on mount
    this.focusTextInput();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    return (
      <div>
        <input type="text" ref={this.setTextInputRef} />
        <input
          type="button"
          value="Focus  input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

See a demo below:

As with object refs, you can pass callback refs between components, e.g., parent and child. See the example below:

```jsx title="Parent.jsx"
function CustomTextInput(props) {
  return (
    <div>
      {/*child component passes ref to callback*/}
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      {/* pass a callback ref to the child component*/}
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

In the example above, the `Parent` component holds the DOM value corresponding to the child text input in the instance variable `inputElement`.

Note that the ref callback is passed to the child component, `CustomTextInput` via a differently named prop: `inputRef`. `CustomTextInput` then passes the callback on to the `ref` attribute set on the `<input>` element.

### Caveats with callback refs

If you define a `ref` callback as an inline function, a new instance of the function will be created with each render. The callback is then called twice: first will `null`, and then again with the DOM element. Essentially, React has to clear the old ref and set up a new one.

This shouldn’t matter so much in most cases, but to avoid this, define the `ref` method as a bound method on the class (for class components).

---

## Legacy API: String refs

It is worth mentioning that an older ref API supported `ref` attributes as plain strings, e.g., `myTextInput` and the DOM node accessed as `this.refs.myTextInput`.

Don’t do this anymore. String refs are now considered legacy, they have some [issues (<VPIcon icon="iconfont icon-github"/>`facebook/react`)](https://github.com/facebook/react/pull/8333#issuecomment-271648615), and they are likely going to be removed in a future release of React.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React Reference Guide: Refs and the DOM",
  "desc": "Refs become necessary when you want to access DOM nodes or React elements created in the render method of your components.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-reference-guide-refs-dom.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
