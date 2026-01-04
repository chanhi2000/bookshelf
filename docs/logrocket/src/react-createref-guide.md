---
lang: en-US
title: "How to use React createRef"
description: "Article(s) > How to use React createRef"
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
      content: "Article(s) > How to use React createRef"
    - property: og:description
      content: "How to use React createRef"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-createref-guide.html
prev: /programming/js-react/articles/README.md
date: 2022-11-15
isOriginal: false
author:
  - name: Glad Chinda
    url : https://blog.logrocket.com/author/gladchinda/
cover: /assets/image/blog.logrocket.com/react-createref-guide/banner.png
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
  name="How to use React createRef"
  desc="Learn how to use the React.createRef() method and useRef Hook in React to simplify creating refs and interact with the HTML DOM."
  url="https://blog.logrocket.com/react-createref-guide"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-createref-guide/banner.png"/>

::: note Editor’s note

This guide to using React `createRef` was last updated on 15 November 2022 to include information about common errors with React refs and storing mutating state with ref.

:::

![How to Use React createRef](/assets/image/blog.logrocket.com/react-createref-guide/banner.png)

If you’ve been developing web applications long enough, you’ve likely used JavaScript [<VPIcon icon="fa-brands fa-firefox" />DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) libraries such as [<VPIcon icon="iconfont icon-jQuery"/>jQuery](http://jquery.com/), [<VPIcon icon="fas fa-globe"/>Mootools](https://mootools.net/), [<VPIcon icon="fas fa-globe"/>Prototype.js](http://prototypejs.org/learn/), and more. These libraries brought about a significant shift in how interactive web applications were built. With DOM abstraction APIs, manipulating a web app’s contents became much easier.

For example, you would find yourself doing something like this with jQuery:

```js
$('#button').on('click', function(evt) {
  evt.preventDefault();
  var content = $(`
Random Post Title
Random post text.
`);

  $('#element').append(content);
});
```

These days, JavaScript frameworks like [<VPIcon icon="fas fa-globe"/>React](https://blog.logrocket.com/tag/react/), [<VPIcon icon="fas fa-globe"/>Angular](https://blog.logrocket.com/tag/angular/), and [<VPIcon icon="fas fa-globe"/>Vue.js](https://blog.logrocket.com/tag/vue/) are commonly used for building modern-day applications. These frameworks are all made with a component-based architecture. While you can do a lot by leveraging their built-in functionalities, you sometimes need to interact with the actual DOM for some native behavior. Most modern frameworks provide APIs through which you can access the native DOM representation of your app, and React is no exception.

In this tutorial, we will consider how we can interact with the DOM in a React application. We will also see how we can use the `React.createRef()` feature introduced in React v16.3, and the `useRef` Hook introduced in a later version of React. To learn more about virtual DOMs in React, check out this [**guide**](/blog.logrocket.com/virtual-dom-react.md).

---

## What are React refs and DOM?

React provides a feature known as [**refs**](/blog.logrocket.com/complete-guide-react-refs.md) that allow for DOM access from components. You simply attach a ref to an element in your application to provide access to the element’s DOM from anywhere within your component.

The [<VPIcon icon="fa-brands fa-react"/>React documentation](https://reactjs.org/docs/refs-and-the-dom.html) refers to refs as tools for providing direct access to React elements and DOM nodes created in the render method. Generally, using refs should only be considered when the required interaction cannot be achieved using the mechanisms of [state and props](https://blog.logrocket.com/the-beginners-guide-to-mastering-react-props-3f6f01fd7099/).
<!-- TODO: /blog.logrocket.com/the-beginners-guide-to-mastering-react-props.md -->

However, there are a couple of cases where using a ref is appropriate. One of which is when integrating with third-party DOM libraries. Also, deep interactions, such as handling text selections or managing media playback behavior, require refs on the corresponding elements. You can check out our [**React reference guide**](/blog.logrocket.com/react-reference-guide-refs-dom.md#creatingrefs) to learn more.

---

## Creating refs in React

There are four major ways of creating refs in React. Here is a list of the different methods, starting with the oldest:

1. String refs (legacy method)
2. Callback refs
3. `React.createRef` (from React v16.3)
4. The `useRef` Hook (from React v16.8)

### String refs in React

The legacy way of creating refs in a React application is using string refs. This is the oldest method and is considered legacy and deprecated. String refs are created by adding a `ref` prop to the desired element and passing a `string` name for the `ref` as its value.

Here is a simple example:

```jsx :collapsed-lines title="MyComponent.jsx"
class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.toggleInputCase = this.toggleInputCase.bind(this);
    this.state = { uppercase: false };
  }
  
  toggleInputCase() {
    const isUpper = this.state.uppercase;
    
    // Accessing the ref using this.refs.inputField
    const value = this.refs.inputField.value;
    
    this.refs.inputField.value =
      isUpper
        ? value.toLowerCase()
        : value.toUpperCase();
        
    this.setState({ uppercase: !isUpper });
  }

  render() {
    return (
      <div>
        {/* Creating a string ref named: inputField */}
        <input type="text" ref="inputField" />
        
        <button type="button" onClick={this.toggleInputCase}>
          Toggle Case
        </button>
      </div>
    );
  }
}
```

Here, we created a simple React component that renders an `<input>` element and a `<button>` element that allows us to toggle the case of the input between uppercase and lowercase.

We initialized the component’s state with an `uppercase` property set to `false`. This property allows us to determine the current case of the input.

The main emphasis is on the string ref we created on the `<input>` element. We also made a ref to `<input>` named `inputField`. Later, in the [**`onClick` event handler**](/blog.logrocket.com/react-onclick-event-handlers-guide.md) for the `<button>`, we accessed the ref via `this.refs.inputField`. Then, we manipulated the DOM of `<input>` to change the value of the input.

Below is a sample demo of what the interaction looks like:

![React String Ref Example](/assets/image/blog.logrocket.com/react-createref-guide/React-ref-input-example.png)

Although this is a trivial example of how to use refs, it shows us how string refs can be used in a React component. As stated earlier, using string refs in your React application should be discouraged.

### Using callback refs in React

Callback refs use a callback function for creating refs instead of passing the ref’s name as a string. If you are using versions of [<VPIcon icon="fa-brands fa-react"/>React earlier than v16.3](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs), this should be your preferred method of creating refs.

The callback function receives the `React Component` instance or `HTML DOM` element as its argument, which can be stored and accessed elsewhere. Using a callback `ref`, our previous code snippet will become the following:

```js :collapsed-lines title="MyComponent.jsx"
class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.toggleInputCase = this.toggleInputCase.bind(this);
    this.state = { uppercase: false };
  }
  
  toggleInputCase() {
    const isUpper = this.state.uppercase;
    
    // Accessing the ref using this.inputField
    const value = this.inputField.value;
    
    this.inputField.value =
      isUpper
        ? value.toLowerCase()
        : value.toUpperCase();
        
    this.setState({ uppercase: !isUpper });
  }

  render() {
    return (
      <div>
        {/* Creating a callback ref and storing it in this.inputField */}
        <input type="text" ref={elem => this.inputField = elem} />
        
        <button type="button" onClick={this.toggleInputCase}>
          Toggle Case
        </button>
      </div>
    );
  }
  
}
```

Here, we have made two major changes. First, we defined the `ref` using a callback function and stored it in `this.inputField` as follows:

```jsx
<input type="text" ref={elem => this.inputField = elem} />
```

Then, in the event handler, we access the `ref` using `this.inputField` instead of `this.refs.inputField`.

When using inline callback `refs`, as we did in our example, it is important to know that for every update to the component, the callback function is called twice — first with `null`, then again with the `DOM` element.

However, creating the callback function as a `bound` method of the component class can be used to avoid this behavior. Using a callback function for creating refs can give you more control over how a ref is created, set, and unset.

---

## Examples of using `React.createRef()`

Starting from React v16.3, the [**React API**](/blog.logrocket.com/modern-api-data-fetching-methods-react.md) included a `createRef()` method that can be used for creating refs in much the same way as we did using the callback function. Simply create a ref by calling `React.createRef()` and assign the resulting `ref` to an element.

Using `React.createRef()`, our previous example will now look like this:

```js title="MyComponent.jsx"
class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    this.toggleInputCase = this.toggleInputCase.bind(this);
    this.state = { uppercase: false };
  }
  
  toggleInputCase() {
    const isUpper = this.state.uppercase;
    
    // Accessing the ref using this.inputField.current
    const value = this.inputField.current.value;
    
    this.inputField.current.value =
      isUpper
        ? value.toLowerCase()
        : value.toUpperCase();
        
    this.setState({ uppercase: !isUpper });
  }

  render() {
    return (
      <div>
        {/* Referencing the ref from this.inputField */}
        <input type="text" ref={this.inputField} />
        
        <button type="button" onClick={this.toggleInputCase}>
          Toggle Case
        </button>
      </div>
    );
  }
  
}
```

Here, we see a couple of changes. First, in the `constructor()`, we created a `ref` using `React.createRef()` and stored it in `this.inputField` as follows:

```js
this.inputField = React.createRef();
```

Next, in the event handler, we access the `ref` using `this.inputField.current` instead of `this.inputField`. This is worth noting for refs created with `React.createRef()`. The reference to the node becomes accessible at the `current` attribute of the ref.

Finally, we pass the `ref` to the `<input>` component as follows:

```js
<input type="text" ref={this.inputField} />
```

We have explored the various methods of creating refs in our React application. In the following sections, we will take a closer look at the more interesting characteristics of `React.createRef`.

### Working with the React `useRef` Hook

With its release in React v16, the [**Hooks API**](/blog.logrocket.com/react-reference-guide-hooks-api.md) has become the de facto means of abstracting and reusing code in React applications. One such Hook is [**`useRef`**](/blog.logrocket.com/usestate-vs-useref.md), which allows us to create and use refs in [**functional components**](/blog.logrocket.com/fundamentals-functional-programming-react.md).

It’s worth noting that even with the `useRef` Hook, you still, by default, cannot use the ref attribute on functional components because we cannot create instances of functions. We will discuss how to get around this with [**ref forwarding**](/blog.logrocket.com/use-forwardref-react.md) later in this article.

To use the `useRef` Hook, you pass in the object that `ref.current` should refer to into the `useRef` Hook and call it. This Hook call should return a `ref` object you can use as if using the `createRef` method discussed earlier.

Here’s what our previous example should look like if we use the `useRef` Hook:

```js title="MyComponent.jsx"
const MyComponent = () => {
  const [uppercase, setUppercase] = React.useState(false)
  const inputField = React.useRef(null)
  const toggleInputCase = () => {
    // Accessing the ref using inputField.current
    const value = inputField.current.value;
    inputField.current.value = uppercase ? value.toLowerCase() : value.toUpperCase();
    setUppercase(previousValue => !previousValue)
  }

  return (
    <div>
      {/* Referencing the ref from this.inputField */}
      <input type="text" ref={inputField} />
      <button type="button" onClick={toggleInputCase}>
        Toggle Case  
      </button>
    </div>
  )
}
```

As you can see, the code is pretty similar to that of the `React.createRef` implementation. We create a `ref` using the `useRef` Hook and pass that `ref` to the ref attribute of `<input>`.

The process for the `<button>`‘s event handler is the same as before. We update the `value` property of the HTML element that our `ref` points (which can be accessed by using `ref.current`) depending on the current value of the state variable, `uppercase`.

---

## Building component refs in React

In the previous section, we saw how we could create refs using the `React.createRef` API. The actual reference is stored in the `current` attribute of the `ref`.

In our examples, we have only created refs to DOM nodes in our React application. But it is also possible to create refs to React components, which will give us access to the `instance`methods of such components.

Keep in mind that we can only create refs on `class` components since they create an `instance`of the class when mounted. Refs cannot be used on functional components.

Let’s consider a very simple example of using refs on React components. We will create two components in this example:

- `FormInput`: This component will wrap an `<input>` element and provide a method for knowing when the input contains some value and a method for selecting the input text
- `MyComponent`: Wraps the `FormInput` component and a button to select the text in the input when **selected**

Here are the code snippets for the components:

```js title="FormInput.jsx"
class FormInput extends React.Component {

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  
  hasText() {
    return this.textInput.current.value.length > 0;
  }
  
  selectInputText() {
    this.textInput.current.select();
  }
  
  render() {
    return (
      {/* ... */}
    )
  }
}
```

Like before, we created a `ref` using `React.createRef()` and added the `ref` to the `<input>` element in the `render` function. We created two methods:

- `hasText()`: Returns a `Boolean` indicating that the `input` element’s value is not empty. Hence, it returns `false` when empty. Otherwise, it returns `true`
- `selectInputText()`: Makes a selection of the whole text in the `input`

Notice that we get a reference to the `input` in our methods by accessing the `current` attribute of the `ref` we created: `this.textInput.current`.

Now, let’s create `MyComponent`. Here is the code snippet:

```jsx title="MyComponent.jsx"
const MyComponent = (props) => {

  const formInput = React.createRef();
  
  const inputSelection = () => {
    const input = formInput.current;
    
    if (input.hasText()) {
      input.selectInputText();
    }
  };
  
  return (
    <div>
      <button type="button" onClick={inputSelection}>
        Select Input
      </button>
      <FormInput ref={formInput} />
    </div>
  );
};
```

In this snippet, I use a functional component instead of a class component, as this is a stateless component. I also want to use this component to demonstrate how refs can be used inside functional components.

Here, we create a `ref` using `React.createRef()` and store it in the `formInput` constant. Notice that we are not using `this` since functional components are not classes and do not create instances.

Take note that in the `render()` method, we added the `ref` we created to the `<FormInput>` component we made earlier. Unlike the previous examples where we added refs to DOM nodes, here, we are adding a ref to a component.

Additionally, a ref can only be created for a class component, not a functional component. `FormInput` is a class component, so we can create a reference to it. However, we can use a ref inside a functional component as we did in this example using `formInput`.

Finally, in the `inputSelection()` function, we access the reference to our component using the `current` attribute of the `ref` as before.

We can access the `hasText()` and `selectInputText()` methods of the `FormInput` component because the reference points to an instance of the `FormInput` component. This validates why refs cannot be created for functional components.

Here is a sample demo of what the interaction looks like:

![React createRef Form Component Example](/assets/image/blog.logrocket.com/react-createref-guide/react-create-ref-current.webp)

---

## Refs in controlled and uncontrolled components

All components in React are controlled by default because React is responsible for handling updates to the component when form data changes.

When dealing with uncontrolled components in React, refs are very handy. This is because instead of using event handlers to update `state` when form data changes, you rely on refs to get form values from the DOM. You can learn more about [**uncontrolled components here**](/blog.logrocket.com/controlled-vs-uncontrolled-components-in-react.md).

### Controlled components

Let’s create a simple controlled component and then an uncontrolled component to demonstrate how we can use refs to get form values from the DOM:

```jsx title="ControlledFormInput.jsx"
class ControlledFormInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: "Glad" };
  }
    
  handleChange(evt) {
    this.setState({ value: evt.target.value });
  }
  
  render() {
    return (
      <div>
        <h1>Hello {this.state.value}!</h1>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Enter your name" />
      </div>
    )
  }
}
```

The above code snippet shows a controlled component that contains an `<input>` element. Notice that the value of the `<input>` is from the `value` property of the state. We initialized the `value` on the state to `"Glad"` (that’s my name, anyway).

Also, notice that we use the `handleChange()` event handler to update the `value` property in the `state` with the value of the `input` element we got from accessing `evt.target.value`.

Here is a sample demo of what the interaction looks like:

![React createRef Target Value Example](/assets/image/blog.logrocket.com/react-createref-guide/react-create-ref-target-value.png)

### Refs in uncontrolled components

Here is the uncontrolled version of the component:

```jsx title="UncontrolledFormInput.jsx"
class UncontrolledFormInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: "Glad" };
  }

  handleChange(evt) {
    this.setState({ value: this.inputField.current.value });
  }

  render() {
    return (
      <div>
        <h1>Hello {this.state.value}!</h1>
        {/* Attach the created ref: this.inputField */}
        <input type="text" ref={this.inputField} defaultValue={this.state.value} onChange={this.handleChange} placeholder="Enter your name" />
      </div>
    )
  }
}
```

We have made some changes for the uncontrolled version of our previous component. First, we create a `ref` using `React.createRef()` and store it in the `this.inputField` instance property. We also attach the `ref` to `<input>` in the `render()` method.

We also use the `defaultValue` prop to assign `this.state.value` as the default value of the `<input>` element —  which is only useful until the input value is first changed.

If we had used the `value` prop to specify a default value for the `input`, we would no longer get updated values from the `input`. This is because the `value` prop automatically overrides the value in the DOM in React.

Finally, in our event handler, we access the value of the `input` element using the `ref` instead of the event object:

```js
this.setState({ value: this.inputField.current.value });

// Instead of doing this:

this.setState({ value: evt.target.value });
```

The demo is the same as with the controlled version. Here is a sample demo of what the interaction looks like:

![React `createRef` Uncontrolled Component Demo](/assets/image/blog.logrocket.com/react-createref-guide/react-create-ref-uncontrolled-component-demo.webp)

---

## Ref forwarding in React

Ordinarily, React components cannot access the refs used in their children components. While, according to the [<VPIcon icon="fa-brands fa-react"/>React documentation](https://reactjs.org/docs/forwarding-refs.html), this is good as it prevents components from relying on each other’s refs, there are instances where you might need to have access to a child component’s DOM element.

For example, suppose you have a custom text field component that you use throughout your React app. In most cases, this text field component will render a standard HTML `<input>` text field with some customization, most likely through props:

```js
const TextField = ({placeholder}) => {
  return (
    <input type="text" placeholder={placeholder}. />
  );
}
```

If we wanted to access the `input` element directly in a parent component of `TextField` to perform some function like selecting the text, there’s no way to do that by default. However, we could employ two methods to achieve this.

The first method is turning `TextField` into a class component and creating a `ref` in the `TextField` component that points to the `<input>`. Because `TextField` is a class component, we can access its methods from a parent component. We can now create a method inside `TextField` that selects (highlights) the `<input>'s` text.

Our second option is to create the `ref` object in our parent component and “forward” the `ref` to the `<input>` element of `TextField`. This is called [**ref forwarding**](https://blog.logrocket.com/use-forwardref-react/).

Ref forwarding allows us to create a `ref` in a parent component and forward that `ref` to its children. This allows us to interact with HTML elements within those children components on the DOM level.

Here’s how we would use ref forwarding to achieve our objective:

```jsx title="Parent.jsx"
const Parent = () => {
  const inputRef = React.useRef(null);
  const selectInputText = (e) => {
    inputRef.current.select()
  }
  return (
    <div>
      <TextField ref = {inputRef} placeholder="I am a text field!"/>
      <button onClick={selectInputText}>Select Text</button>
    </div>
  );
}
```

As you can see, we created a ref object in `Parent` and passed it to the `TextField` component. In the `TextField` component, we used the `forwardRef` function, which receives a functional component as an argument and passes the ref as a second argument to it.

Then, we passed this `ref` to the ref attribute of our `<input>` element. The `ref` created in `Parent` now refers to this `<input>` element and can interact with it.

Note, that even though we could pass refs to a functional component, this ref cannot be used to access functions and variables local to that functional component.

Lastly, refs can also be forwarded to class components, like so:

```js title="ComponentB.jsx"
const ComponentB = React.forwardRef(({ placeholder }, ref) => {
  return (
    {/* ... */}         
  );
})
```

---

## Common errors with React refs

When working with refs in React, you may run into the problem — `"TypeError: Cannot read properties of undefined"`. This error can occur when you try to access the `.current` property of the `ref` object before any value gets assigned.

### Refs return undefined or null

Let’s understand this with an example. Have a look at the following code snippet:

```jsx title="App.jsx"
import { useEffect, useRef } from "react";

const App = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
      <input ref={inputRef} />
    </div>
  );
}

export default App;
```

Here, we have a `ref` object that references an input field. The input field is focused once the `App` component is rendered.

Let’s consider that the input field should be hidden when the page loads and only appear when clicking the **button** on the page. Simple, right? You’d use a state variable to control the visibility of the `input`:

```jsx title="App.jsx"
import { useEffect, useRef, useState } from "react";

const App = () => {
  const inputRef = useRef();
  const [isHidden, setHidden] = useState(true);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
      {!isHidden && <input ref={inputRef} />}
      <button onClick={() => setHidden((isHidden) => !isHidden)}>
        {isHidden ? "Show Input" : "Hide Input"}
      </button>
    </div>
  );
};
```

However, you’ll notice an error screen when you check the output for the above code:

![React createRef Error Message](/assets/image/blog.logrocket.com/react-createref-guide/react-create-ref-error.png)

This is because the `ref` object does not have any value until React renders the input `DOM` element, and since the default value of the `ref` is undefined, you get the error `"Cannot read property of undefined"`.

If `null` were passed as an initial value, the error would be `"Cannot read property of null"`. Both errors mean the same thing: the `ref` object does not have any value when you read the `.current` property.

To fix this problem, you can use the `isHidden` state inside the `useEffect` callback and only focus on the input field when the `isHidden` state is `false`:

```js
// ...

useEffect(() => {
  if(!isHidden) inputRef.current.focus();
}, [isHidden]);

// ...

```

---

## Storing mutating state with React ref

Besides accessing DOM elements directly, refs can also have mutable values. The ref object is mutable, which means you can update its value by assigning a new value to the `.current` property. But what makes it different from state variables?

- The ref value is persisted across component re-renders
- Unlike state variables, if the ref value changes, it does not trigger the component to re-render

Take a look at the example below:

```js :collapsed-lines title="App.jsx"
import { useEffect, useRef, useState } from "react";

const App = () => {
  const inputRef = useRef();
  const [isHidden, setHidden] = useState(true);
  const buttonClicks = useRef(0);

  useEffect(() => {
    if(!isHidden) inputRef.current.focus();
  }, [isHidden]);

  const handleToggle = () => {
    buttonClicks.current++;
    setHidden((isHidden) => !isHidden);
  };

  return (
    <div>
      <h1>Hello World!</h1>
      {!isHidden && <input ref={inputRef} />}
      <button onClick={handleToggle}>
        {isHidden ? "Show Input" : "Hide Input"}
      </button>
      <button onClick={() => alert(`button clicks: ${buttonClicks.current}`)}>
        Alert Button Clicks
      </button>
    </div>
  );
};
```

Here, the `ref` is used to track button clicks. When the value of `buttonClick` ref changes, it does not trigger a re-render. Hence, it improves the usability and performance of the component. Avoiding unnecessary re-render is trivial for optimizing the performance of UI.

You can use ref to store values not required on the UI. An important thing to note here is that since refs do not trigger re-renders, you shouldn’t use its value in the JSX of the component as it would be unpredictable and can lead to bugs. It would be best to use state variables in scenarios where you want to display or have some logic in JSX based on the data.

---

## Conclusion

In this tutorial, we have considered various methods to interact with the DOM in a React application. We’ve also seen how we can use the `React.createRef()` method and `useRef` Hook in React to simplify creating refs.

You also now know how we can use refs in uncontrolled components. You can refer to the React documentation to learn more about what you can do with refs.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to use React createRef",
  "desc": "Learn how to use the React.createRef() method and useRef Hook in React to simplify creating refs and interact with the HTML DOM.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-createref-guide.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
