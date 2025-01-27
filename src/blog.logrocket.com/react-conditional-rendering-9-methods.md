---
lang: en-US
title: "React conditional rendering: 9 methods with examples"
description: "Article(s) > React conditional rendering: 9 methods with examples"
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
      content: "Article(s) > React conditional rendering: 9 methods with examples"
    - property: og:description
      content: "React conditional rendering: 9 methods with examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-conditional-rendering-9-methods.html
prev: /programming/js-react/articles/README.md
date: 2024-01-10
isOriginal: false
author:
  - name: Esteban Herrera
    url : https://blog.logrocket.com/author/ehrrera/
cover: /assets/image/blog.logrocket.com/react-conditional-rendering-9-methods/banner.png
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
  name="React conditional rendering: 9 methods with examples"
  desc="Review popular methods to implement conditional rendering in React and determine the best choice for your project."
  url="https://blog.logrocket.com/react-conditional-rendering-9-methods"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-conditional-rendering-9-methods/banner.png"/>

::: note Editor’s note

The content of this tutorial was restructured and updated on 10 January 2024. Information was updated to reflect changes made in React v18.2.0, and code blocks were also revised.

:::

![React conditional rendering: 9 methods with examples](/assets/image/blog.logrocket.com/react-conditional-rendering-9-methods/banner.png)

Conditional rendering in React refers to the process of delivering elements and components based on certain conditions. Often, you encounter scenarios where the visual representation of your UI components needs to be adjusted using JSX, depending on varying circumstances. This is where conditional rendering comes in.

There are several ways you can implement conditional rendering in React. This tutorial covers the most popular options, while also reviewing some tips and best practices. You can fork all the examples in [<FontIcon icon="fas fa-globe"/>JSFiddle](https://jsfiddle.net/) to follow along.

::: note N.B.

Although class components are still supported by React and the examples below illustrate their use, I suggest that you tweak the code examples with [<FontIcon icon="fa-brands fa-react"/>functions](https://react.dev/reference/react/Component#alternatives) instead of classes.

:::

---

## `if...else` in React

An `if...else` block is one of the most basic selection constructs in most programming languages. It’s one of the simplest methods to implement conditional rendering in React.

Let’s take a look at code that illustrates its use:

```jsx :collapsed-lines title="App.jsx"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', inputText: '', mode:'view'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(e) {
    this.setState({ inputText: e.target.value });
  }

  handleSave() {
    this.setState({text: this.state.inputText, mode: 'view'});
  }

  handleEdit() {
    this.setState({mode: 'edit'});
  }

  render () {
    if(this.state.mode === 'view') {
      return (
        <div>
          <p>Text: {this.state.text}</p>
          <button onClick={this.handleEdit}>
            Edit
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p>Text: {this.state.text}</p>
            <input
              onChange={this.handleChange}
              value={this.state.inputText}
            />
          <button onClick={this.handleSave}>
            Save
          </button>
        </div>
      );
    }
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
```

Here, we first began by creating a component with the following state:

```jsx :collapsed-lines title="App.jsx"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      inputText: "",
      mode: "view",
    };
  }
}
```

We used one property for the saved text and another for the text that is being edited. A third property indicated if you were in `edit` or `view` mode. Next, we added methods for handling input text, and then `Save` and `Edit` events.

As for the `render` method, we checked the mode state property to either render an edit button or a text input and a save button, in addition to the saved text (observe the use of `if...else` here):

```jsx :collapsed-lines title="App.jsx"
class App extends React.Component {
  // …
  render () {
    if(this.state.mode === 'view') {
      return (
        <div>
          <p>Text: {this.state.text}</p>
          <button onClick={this.handleEdit}>
            Edit
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <p>Text: {this.state.text}</p>
            <input
              onChange={this.handleChange}
              value={this.state.inputText}
            />
          <button onClick={this.handleSave}>
            Save
          </button>
        </div>
      );
    }
}
```

Here’s the complete Fiddle to try it out:  

The `render` method here looks crowded, so let’s simplify it by extracting all the conditional logic into two `render` methods: one to render the input box and another to render the button:

```jsx :collapsed-lines title="App.jsx"
class App extends React.Component {
  // …
  renderInputField() {
    if(this.state.mode === 'view') {
      return <div></div>;
    } else {
      return (
          <p>
            <input
              onChange={this.handleChange}
              value={this.state.inputText}
            />
          </p>
      );
    }
  }

  renderButton() {
    if(this.state.mode === 'view') {
      return (
          <button onClick={this.handleEdit}>
            Edit
          </button>
      );
    } else {
      return (
          <button onClick={this.handleSave}>
            Save
          </button>
      );
    }
  }

  render () {
    return (
      <div>
        <p>Text: {this.state.text}</p>
        {this.renderInputField()}
        {this.renderButton()}
      </div>
    );
  }
}
```

Here’s the Fiddle to try it out:

Let’s imagine that we have more than two branches that depend on the same variable to evaluate the condition. A large `if...else` block might make your code clunky.

Instead, you can use a `switch` statement as follows:

```js
switch(this.state.mode) {
  case 'a':
    // ...
  case 'b':
    // ...
  case 'c':
    // ...
  default:
    // equivalent to the last else clause ...
}
```

### Limitations of `if…else`

You can’t use a `if...else` statement or a `switch` statement inside of a return statement with JSX (unless you use immediately invoked functions, which we’ll cover later). Also, the `switch` statement doesn’t work with multiple or different conditions.

Let’s look at some additional methods for conditional rendering to improve this code.

---

## The ternary operator in React

The [<FontIcon icon="fa-brands fa-firefox"/>ternary conditional operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) provides a cleaner and more concise alternative to an `if...else` block:

```js
condition ? expr_if_true : expr_if_false
```

The operator is wrapped in curly braces, and the expressions can contain JSX, which you can wrap in parentheses to improve readability. The operator can also be applied to different parts of the component.

Let’s apply it to this example to see it in action:

```jsx :collapsed-lines title="App.jsx"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', inputText: '', mode:'view'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(e) {
    this.setState({ inputText: e.target.value });
  }

  handleSave() {
    this.setState({text: this.state.inputText, mode: 'view'});
  }

  handleEdit() {
    this.setState({mode: 'edit'});
  }

  render () {
    const view = this.state.mode === 'view';

    return (
      <div>
        <p>Text: {this.state.text}</p>

        {
          view
          ? null
          : (
            <p>
              <input
                onChange={this.handleChange}
                value={this.state.inputText} />
            </p>
          )
        }

        <button
          onClick={
            view
              ? this.handleEdit
              : this.handleSave
          }
        >
          {view ? 'Edit' : 'Save'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

In this code, we removed `renderInputField` and `renderButton`, which were added to the `if…else` example. In the `render` method, we added a variable to know if the component is in `view` or `edit` mode.

Then, we used the ternary operator to return `null` if the view mode is set, or to set the input field otherwise:

```jsx
// ...
return (
  <div>
    <p>Text: {this.state.text}</p>
    {
      view
      ? null
      : (
        <p>
          <input
            onChange={this.handleChange}
            value={this.state.inputText} />
        </p>
      )
    }
  </div>
);
```

Using a ternary operator, you can declare one component to render either a `Save` or `Edit` button by changing its handler and label correspondingly:

```jsx
// ...
return (
  <div>
    <p>Text: {this.state.text}</p>
      {
        ...
      }
    <button
      onClick={view ? this.handleEdit : this.handleSave}>
      {view ? 'Edit' : 'Save'}
    </button>
  </div>
);
```

Here’s the Fiddle to try it out:

### Limitations of the ternary operator

As mentioned before, the ternary operator can be applied in different parts of the component, even inside return statements and JSX, acting as a one-line `if...else` statement. However, for this reason, things can get messy pretty quickly.

For example, consider a complex, nested set with the following conditions:

```jsx
return (
  <div>
    { condition1
      ? <Component1 />
      : ( condition2
        ? <Component2 />
        : ( condition3
          ? <Component3 />
          : <Component4 />
        )
      )
    }
  </div>
);
```

This can soon lead to a mess. Let’s review another technique that can help improve the code.

---

## Short-circuit AND operator `&&`

The `&&` operator is also called the logical AND operator. When it is supplied with two expressions, this operator returns the value of the second expression if both expressions are evaluated as `true`. But if either expression evaluates to false, `&&` returns the value of the first expression.

You can only use the `&&` operator when you want to generate either a specific outcome or no outcome at all. Unlike the `&` operator, `&&` doesn’t evaluate the right-hand expression if only the left-hand expression can decide the final result.

For example, if the first expression evaluates to `false`, it’s not necessary to evaluate the next expression because the result will always be `false`.

Consider the following expression:

```jsx
{
  view
  ? null
  : (
    <p>
      <input
        onChange={this.handleChange}
        value={this.state.inputText} />
    </p>
  )
}
```

The code that uses a ternary operator above can be turned into the following code snippet:

```jsx
!view && (
  <p>
    <input
      onChange={this.handleChange}
      value={this.state.inputText} />
  </p>
)
```

Here’s the complete Fiddle:  

### Limitations of the `&&` operator

There are several limitations to this operator. It can:

- Make debugging more difficult
- Limit the flexibility of the code
- Make code difficult to read and understand
- Lead to unexpected behavior (such as when evaluating a complex expression; the expected value may not always be the outcome)

---

## Prevent rendering with `null`

Notice that in an earlier code with `if...else`, the method `renderInputField` returned an empty `<div>` element when the app was in `view` mode. However, this is not necessary.

If you want to hide a component, you can make its render method return `null`, so there’s no need to render a different, empty element as a placeholder. This is another way to implement conditional rendering in React.

One important thing to keep in mind when returning `null`, however, is that even though the component doesn’t show up, its lifecycle methods are still fired. Take, for example, the following Fiddle, which implements a counter with two components:

The `Number` component only renders the counter for even values. Otherwise, it returns `null`. When you look at the console, however, you’ll see that `componentDidUpdate` is always called regardless of the value returned by render:

![The Number Component Rendering The Counter For Even Values](/assets/image/blog.logrocket.com/react-conditional-rendering-9-methods/number-component-rendering-even-numbers.png)

In our example, change the `renderInputField` method to look like the following code:

```jsx
renderInputField() {
  if(this.state.mode === 'view') {
    return null;
  } else {
    return (
      <p>
        <input
          onChange={this.handleChange}
          value={this.state.inputText}
        />
      </p>
    );
  }
}
```

The complete Fiddle is below:

::: sandpack#react From Fiddle [rtl theme=dark]

@file /App.js

```js
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: '', inputText: '', mode: 'view'};
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  
  handleChange(e) {
    this.setState({ inputText: e.target.value });
  }
  
  handleSave() {
    this.setState({text: this.state.inputText, mode: 'view'});
  }

  handleEdit() {
    this.setState({mode: 'edit'});
  }
  
  renderInputField() {
    if (this.state.mode === 'view') {
      return null;
    } else {
      return (
        <p>
          <input
            onChange={this.handleChange}
            value={this.state.inputText}
          />
        </p>
      );
    }
  }
  
  renderButton() {
    if (this.state.mode === 'view') {
      return (
        <button onClick={this.handleEdit}>
          Edit
        </button>
      );
    } else {
      return (
        <button onClick={this.handleSave}>
          Save
        </button>
      );
    }
  }
  
  render() {
    return (
      <div>
        <p>Text: {this.state.text}</p>
        {this.renderInputField()}
        {this.renderButton()}
      </div>
    );
  }
}

export default App;
```

:::

One advantage of returning `null` instead of an empty element is that you’ll improve the performance of your app a bit because React won’t have to unmount the component to replace it.

For example, if you open the **Inspector** tab from the [Fiddle (<FontIcon icon="fa-brands fa-jsfiddle"/>`eh3rrera`)](https://jsfiddle.net/eh3rrera/q0w1aamt/) that renders the empty `<div>` element, you’ll see how the `<div>` element under the root is always updated:

![Rendering The Empty `<div>` Element From Fiddle](/assets/image/blog.logrocket.com/react-conditional-rendering-9-methods/rendering-div-element-from-fiddle.webp)

This differs from when `null` is returned to hide the component and the `<div>` element is not updated when the **Edit** button is clicked:

![The `<div>` element is not updated when the edit button is clicked](/assets/image/blog.logrocket.com/react-conditional-rendering-9-methods/div-element-not-updated-edit-button-clicked.webp)

You can check out the React docs to learn more about how [<FontIcon icon="fa-brands fa-react"/>React preserves and resets states](https://react.dev/learn/preserving-and-resetting-state).

Although the performance improvement is insignificant in this simple example, when you are working with big components, the difference is more noticeable. Later, we’ll cover more of the performance implications of conditional rendering. For now, let’s continue to improve our example.

---

## React element variables

Another method to implement conditional rendering in React is by using variables to store elements. Through this approach, you can conditionally render a part of the component while the rest of the output remains unchanged.

For example, I’ll use a variable to store the JSX elements and only initialize it when the condition is `true`:

```jsx
renderInputField() {
  let input;
  if (this.state.mode !== 'view') {
    input = 
      <p>
        <input
          onChange={this.handleChange}
          value={this.state.inputText} />
      </p>;
  }
  return input;
}

renderButton() {
  let button;
  if (this.state.mode === 'view') {
    button =
        <button onClick={this.handleEdit}>
          Edit
        </button>;
  } else {
    button =
        <button onClick={this.handleSave}>
          Save
        </button>;
  }
  return button;
}
```

The code above gives the same result as returning `null` from those methods. Here’s the Fiddle to try it out:  

Note that the `if...else` blocks in this code can be replaced by the ternary operator for conciseness.

---

## Immediately invoked function expressions (IIFEs)

As the name implies, immediately invoked function expressions (IIFEs) are functions that are executed immediately after they are defined, so there is no need to call them explicitly.

Generally, you’d define and execute a function at a later point. But if you want to execute the function immediately after it is defined, you have to wrap the whole declaration in parentheses to convert it to an expression. You’d execute it by adding two more parentheses and passing any arguments that the function may take.

Because the function won’t be called in any other place, you can drop the name or even use arrow functions in the definition. In React, you use curly braces to wrap an IIFE, and put all the logic you want inside it, like an `if...else`, `switch`, ternary operators, etc., and return whatever you want to render.

In other words, inside an IIFE, we can use any type of conditional logic. This allows us to use `if...else` and `switch` statements inside return statements, as well as JSX if you consider it to improve the readability of the code.

For example, the logic to render the save or edit button could look like the following with an IIFE:

```jsx
{
  (() => {
    const handler = view 
                ? this.handleEdit 
                : this.handleSave;
    const label = view ? 'Edit' : 'Save';

    return (
      <button onClick={handler}>
        {label}
      </button>
    );
  })()
}
```

Here’s the complete Fiddle:  

### Limitations of IIFEs

When your code tends to become more complex, the code inside an IIFE can become large and difficult to read and maintain.

IIFEs are better suited for single-use scenarios as they can lead to unnecessary code complexity, especially in large-volume codes.

---

## React subcomponents

Sometimes, an IFFE might seem like a hacky solution. After all, we’re using React. The recommended approach is to split up the logic of your app into as many components as possible and to use [**functional programming**](https://blog.logrocket.com/react-functional-components-3-advantages-and-why-you-should-use-them-a570c83adb5e/) instead of imperative programming.
<!-- TODO: /blog.logrocket.com/react-functional-components-3-advantages-and-why-you-should-use-them.md -->

Moving the conditional rendering logic to a subcomponent that renders different things based on its props would be a good option. But, in this example, I’m going to do something a bit different to show how you can go from an imperative solution to a more declarative and functional solution.

I’ll start by creating a `SaveComponent` and an `EditComponent`:

```jsx title="SaveComponent.jsx"
const SaveComponent = (props) => {
  return (
    <div>
      <p>
        <input
          onChange={props.handleChange}
          value={props.text}
        />
      </p>
      <button onClick={props.handleSave}>
        Save
      </button>
    </div>
  );
};
```

```jsx title="EditComponent.jsx"
const EditComponent = (props) => {
  return (
    <button onClick={props.handleEdit}>
      Edit
    </button>
  );
};
```

Now, the `render` method can look like the code below:

```jsx
render() {
  const view = this.state.mode === 'view';

  return (
    <div>
      <p>Text: {this.state.text}</p>

      {
        view
          ? <EditComponent handleEdit={this.handleEdit}  />
          : (
            <SaveComponent 
              handleChange={this.handleChange}
              handleSave={this.handleSave}
              text={this.state.inputText}
            />
          )
      } 
    </div>
  );
}
```

Here’s the complete Fiddle:  

Libraries like [JSX Control Statements (<FontIcon icon="iconfont icon-github"/>`AlexGilleran/jsx-control-statements`)](https://github.com/AlexGilleran/jsx-control-statements) (which is actually a Babel plugin) extend JSX to add conditional statements.

These libraries provide more advanced components, but if we need something like a simple `if...else`, we can use a solution similar to [Michael J. Ryan’s in the comments for this issue (<FontIcon icon="iconfont icon-github"/>`facebook/jsx`)](https://github.com/facebook/jsx/issues/65#issuecomment-255484351):

```jsx
const If = (props) => {
  const condition = props.condition || false;
  const positive = props.then || null;
  const negative = props.else || null;

  return condition ? positive : negative;
};

// …

render() {
  const view = this.state.mode === 'view';
  const editComponent = <EditComponent handleEdit={this.handleEdit} />;
  const saveComponent = <SaveComponent 
    handleChange={this.handleChange}
    handleSave={this.handleSave}
    text={this.state.inputText}
  />;

  return (
    <div>
      <p>Text: {this.state.text}</p>
      <If
        condition={ view }
        then={ editComponent }
        else={ saveComponent }
      />
    </div>
  );
}
```

Here’s the complete Fiddle:  

### Limitations of using React subcomponents

The syntax of React subcomponents is complex, which might prove to be a hindrance during learning.

---

## Enum objects

An enum is a type that groups constant values. JavaScript doesn’t support enums natively, but we can use an object to group all the properties of the enum and freeze that object to avoid accidental changes.

You might be wondering why we’re not using constants. The main benefit is that we can use a dynamically generated key to access the property of the object.

Enum objects are a great option when you want to use or return a value based on multiple conditions, making them a great replacement for `if...else` and `switch` statements in many cases.

Applying this to our example, we can declare an enum object with the two components for saving and editing:

```jsx
const Components = Object.freeze({
  view: <EditComponent handleEdit={this.handleEdit} />,
  edit: <SaveComponent 
          handleChange={this.handleChange}
          handleSave={this.handleSave}
          text={this.state.inputText}
        />
});

// ...

const key = this.state.mode;

return (
  <div>
    <p>Text: {this.state.text}</p>
    {
      Components[key]
    } 
  </div>
);
```

Here, we used the mode state variable to indicate which component to show.

You can see the complete code in the following Fiddle:  

### Limitations of enum objects

Type safety can be a potential issue when [**working with enum objects**](/blog.logrocket.com/typescript-enums-vs-types.md).

---

## Higher-order components in React

A [**higher-order component (HOC)**](/blog.logrocket.com/understanding-react-higher-order-components.md) is a function that takes an existing component and returns a new one with some added functionality.

Applied to conditional rendering, a HOC could return a different component than the one passed based on some condition. However, this conditional rendering approach is now legacy and not commonly used in newer versions of React.

For this article, I’m going to borrow the concepts of the [<FontIcon icon="fas fa-globe"/>`EitherComponent` from Robin Wieruch](https://robinwieruch.de/react-higher-order-components/).

In functional programming, the `Either` type is commonly used as a wrapper to return two different values. Let’s begin by creating a function that accepts two arguments: the first is a function that yields a Boolean value as a result of a conditional evaluation, and the second is a component that will be returned if the Boolean value is true.

It’s a convention to start the name of the HOC with the word “with.” This function will return another function that will take the original component to return a new one.

The component or function returned by this inner function is the one you’ll use in your app, so it will take an object with all the properties that it will need to work.

The inner functions have access to the outer functions’ parameters. Now, based on the value returned by the `conditionalRenderingFn` function, you either return `EitherComponent` or the original `Component`. Alternatively, you could use arrow functions.

Thus, the code for the HOC will be:

```jsx
function withEither(conditionalRenderingFn, EitherComponent) {
  return function buildNewComponent(Component) {
    return function FinalComponent(props) {
      return conditionalRenderingFn(props)
          ? <EitherComponent { ...props } />
          : <Component { ...props } />;
    }
  }
}
```

Using the previously defined `SaveComponent` and `EditComponent`, you can create a `withEditConditionalRendering` HOC and, with this, create an `EditSaveWithConditionalRendering` component:

```jsx
const isViewConditionFn = (props) => props.mode === 'view';
const withEditContionalRendering = withEither(isViewConditionFn, EditComponent);
const EditSaveWithConditionalRendering = withEditContionalRendering(SaveComponent);
```

You can now use the HOC in the `render` method, passing it all the necessary properties:

```jsx
render() {
  return (
    <div>
      <p>Text: {this.state.text}</p>
      <EditSaveWithConditionalRendering 
             mode={this.state.mode}
             handleEdit={this.handleEdit}
             handleChange={this.handleChange}
             handleSave={this.handleSave}
             text={this.state.inputText}
      />
    </div>
  );
}
```

Here’s the complete Fiddle:  

### Limitations of higher-order components

HOCs wrap a component and potentially alter its behavior. This process, however, can result in “wrapper hell,” a situation where multiple HOCs wrap around a single component, complicating the code structure.

Additionally, the likelihood of prop collisions is another cause for concern. As HOCs introduce new props to a component, there’s a possibility of collisions between these injected props and the component’s existing props.

The outcome of this may result in harder-to-identify bugs. If the component that is wrapped by a HOC includes static methods, they must be copied over to the returned component so that they can be preserved. Failing this, they could be lost when the component is wrapped.

---

## Conditional rendering with Fragments

How do you render multiple child components depending on a certain condition? The answer is by using [<FontIcon icon="fa-brands fa-react"/>Fragments](https://react.dev/reference/react/Fragment). Fragments allow you to return multiple elements by grouping them without adding an extra node to the DOM.

You can use Fragments with their traditional syntax:

```jsx
return (
  <React.Fragment>
    <Button />
    <Button />
    <Button />
  </React.Fragment>
);
```

You can also use them with their shorter syntax:

```jsx
return (
  <>
    <Button />
    <Button />
    <Button />
  </>
);
```

When it comes to rendering multiple elements with Fragments depending on a condition, you can use any of the techniques described in this article. For example, you could use a short-circuit `&&` operator:

```jsx
{ 
  condition &&
  <React.Fragment>
    <Button />
    <Button />
    <Button />
  </React.Fragment>
}
```

You could also encapsulate the rendering of the child elements in a method and use an `if` or `switch` statement to decide what to return:

```jsx
render() {
  return <div>{ this.renderChildren() }</div>;
}

renderChildren() {
  if (this.state.children.length === 0) {
    return <p>Nothing to show</p>;
  } else {
    return (
      <React.Fragment>
        {this.state.children.map(child => (
          <p>{child}</p>
        ))}
      </React.Fragment>
    );
 }
}
```

### Limitations of conditionally rendering Fragments

Fragments should contain more than one child. Failing to meet this criterion will not allow a Fragment to be created. Fragment only supports one attribute — the key attribute that is used when mapping a collection to an array of components.

---

## Conditional rendering with React Hooks

Nowadays, most experienced React developers use Hooks to write components. So, instead of having a class like the following:

```jsx :collapsed-lines title="Doubler.jsx"
import React, { Component } from 'react';

class Doubler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.num}</p>
        <button onClick={() =>
          this.setState({ num: this.state.num * 2 })
        }>
          Double
        </button>
      </div>
    );
  }
}
```

You can write the component with a function using the `useState` Hook:

```jsx title="Doubler.jsx"
import React from 'react';

function Doubler() {
  const [num, setNum] = React.useState(1);

  return (
    <div>
      <p>{num}</p>
      <button onClick={() => setNum(num * 2)}>
        Double
      </button>
    </div>
  );
}
```

Just like Fragments, you can use any of the techniques described in this article to conditionally render a component that uses Hooks:

```jsx
function Doubler() {
  const [num, setNum] = React.useState(1);
  const showButton = num <= 8;
  const button = <button onClick={() => setNum(num * 2)}>Double</button>;

  return (
    <div>
      <p>{num}</p>
      {showButton && button}
    </div>
  );
}
```

### Limitations to React Hooks

The only caveat is that you can’t conditionally call a Hook so it isn’t always executed. According to the [<FontIcon icon="fa-brands fa-react"/>modern React documentation](https://react.dev/learn/manipulating-the-dom-with-refs#how-to-manage-a-list-of-refs-using-a-ref-callback), you shouldn’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function.

By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple `useState` and `useEffect` calls.

With the `useEffect` Hook, you can’t put a condition that could prevent the Hook from being called every time the component is rendered, like this:

```jsx
if (shouldExecute) {
  useEffect(() => {
    // ...
  }
}
```

You have to put the condition inside the Hook:

```jsx
useEffect(() => {
  if (shouldExecute) {
    // ...
  }
}, [shouldExecute])
```

With this, we are done exploring different methods to achieve conditional rendering in React. Now let’s look at how performance is impacted.

---

## Performance considerations for conditional rendering

Conditional rendering can be tricky. In many cases, the performance impact achieved by different conditional rendering options may not be significant. But, in scenarios where performance is crucial, you’ll need a good understanding of how React works with the virtual DOM and strategies to [<FontIcon icon="fa-brands fa-react"/>optimize performance](https://react.dev/reference/react/memo#skipping-re-rendering-when-props-are-unchanged).

The essential idea is that changing the position of the components due to conditional rendering can cause a reflow that will unmount/mount the components of the app. Based on the example of the article, I created two JSFiddles.

The first one uses an `if...else` block to show/hide the `Subheader` component:  

The second one uses the short-circuit `&&` operator to do the same:  

Open the **Inspector** and click on the button. Then, repeat the click operation a few more times. You’ll see how the `Content` component is treated differently by each implementation.

The `if...else` block treats the component with the code below:

![Changing the position of the content using the if...else block](/assets/image/blog.logrocket.com/react-conditional-rendering-9-methods/content-component-if-else-block.webp)

The short-circuit operator uses the following approach:

![Changing the content position using the short-circuit operator](/assets/image/blog.logrocket.com/react-conditional-rendering-9-methods/content-component-using-short-circuit-operator.webp)

---

## Inline conditional expressions

With inline conditional expressions in React, we can write the condition in a single line, eliminating verbose statements featuring `if…else`, ternary operators, or other conditional rendering methods. Inline conditional expressions lead to cleaner code (JSX) while increasing code readability. They make it easier to generate dynamic UIs conditionally. Eliminate unnecessary nesting by making use of inline conditional expressions.

A simple example of inline conditional expression is shown below:

```jsx
<button
  onClick={
    view
      ? this.handleEdit
      : this.handleSave
  }
>
```

---

## What’s the best way to implement conditional rendering in React?

As with most things in programming, there are many ways to implement conditional rendering in React. It’s generally recommended to use any of the methods discussed, except for a `if…else` block that involves multiple return statements. This specific approach is typically less favored due to potential complexities in readability and maintainability.

Some factors to include in your decision are your programming style, how complex the conditional logic is, and how comfortable you are with JavaScript, JSX, and advanced React concepts like HOCs.

And you should always favor simplicity and readability. I hope you enjoyed this article, and be sure to leave a comment if you have any questions.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React conditional rendering: 9 methods with examples",
  "desc": "Review popular methods to implement conditional rendering in React and determine the best choice for your project.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-conditional-rendering-9-methods.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
