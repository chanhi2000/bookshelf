---
lang: en-US
title: "Building reusable UI components with React Hooks"
description: "Article(s) > Building reusable UI components with React Hooks"
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
      content: "Article(s) > Building reusable UI components with React Hooks"
    - property: og:description
      content: "Building reusable UI components with React Hooks"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-reusable-ui-components-with-react-hooks.html
prev: /programming/js-react/articles/README.md
date: 2023-05-16
isOriginal: false
author:
  - name: Peter Ekene Eze
    url : https://blog.logrocket.com/author/peterekeneeze/
cover: /assets/image/blog.logrocket.com/building-reusable-ui-components-with-react-hooks/banner.png
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
  name="Building reusable UI components with React Hooks"
  desc="Join us on this journey to unlock the full potential of React Hooks and discover the art of building reusable UI components."
  url="https://blog.logrocket.com/building-reusable-ui-components-with-react-hooks"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/building-reusable-ui-components-with-react-hooks/banner.png"/>

::: note Editor’s note

This guide to building reusable UI components with React Hooks was last updated by [<VPIcon icon="fas fa-globe"/>Daggie Douglas Mwangi](https://blog.logrocket.com/author/daggieblanqx/) on 16 May 2023 to incorporate the latest React updates and new sections on optimal usage of reusable components, development of form components and search bars, functional components usage, and best practices. For more insight on React UI, refer to our guide* [**detailing the prioritization of React UI updates**](/blog.logrocket.com/understanding-prioritize-react-ui-updates.md).

:::

![Building Reusable UI Components With React Hooks](/assets/image/blog.logrocket.com/building-reusable-ui-components-with-react-hooks/banner.png)

In web development, creating reusable UI components is essential for building scalable and maintainable applications. With the advent of React Hooks, the process of developing reusable components has become even more efficient and straightforward. In this article, we will explore the power of React Hooks and delve into the best practices for building reusable UI components.

From using `useState` for managing component state to implementing `useEffect` for handling side effects, we will uncover how Hooks revolutionize component development. Join us on this journey to unlock the full potential of React Hooks and discover the art of building reusable UI components that enhance productivity and code quality.

::: note

This post assumes that you have a [**basic understanding of React**](/blog.logrocket.com/getting-started-with-create-react-app.md). All the examples used in this project are available on this [<VPIcon icon="iconfont icon-replit"/>live Repl](https://replit.com/@DaggieBlanqx/Logrocket-Building-reusable-UI-components-with-React-Hooks) and [GitHub repository (<VPIcon icon="iconfont icon-github"/>`DaggieBlanqx/Blogpost-React-reusable-UI-components`)](https://github.com/DaggieBlanqx/Blogpost-React-reusable-UI-components). Also, in this tutorial, we will use v18 of Node.js and React.

:::

---

## Introduction to reusable components in React

In React, a reusable component is a piece of UI that can be used in various parts of an application to build more than one UI instance. For instance, we can have a button component display with different colors in several parts of our application. Although it is the same button component when we provide it with a dataset (e.g., color or a function), it modifies itself and outputs a UI instance of the element.

This pattern of creating React components is necessary for scaling. It promotes efficiency by minimizing the code needed, expediting development, simplifying the codebase, and facilitating a more effortless upkeep process. In this tutorial, we will build reusable React components that can be used throughout your projects to maintain consistency in logic and presentation. We’ll use Hooks for managing and manipulating state data.

### When to use reusable components

We all know that reusable components are important. However, you may wonder if and when you should use reusable components. By using reusable components effectively, you can create maintainable, scalable, and consistent web applications. Let’s take a look at some helpful information.

Firstly, reusable components are ideal when similar functionality or UI patterns appear in multiple parts of your application. Instead of duplicating code, you can create a reusable component that can be easily shared and reused throughout your project.

Secondly, when building large-scale applications or working in a team, reusable components promote consistency. Using the same component across different parts of the application allows you to ensure a unified [<VPIcon icon="fas fa-globe"/>UX](https://blog.logrocket.com/ux-design/) and reduce the chance of inconsistencies.

Lastly, reusable components are useful when you want to streamline development. Instead of reinventing the wheel every time, you can use existing components to speed up the development process and focus on more critical aspects of your application.

### Best practices for creating reusable components

Creating reusable components is a fundamental aspect of building scalable and maintainable code. To ensure their effectiveness, certain best practices should be followed. First, you should strive for component modularity by keeping them focused on a specific purpose and avoiding unnecessary dependencies. Additionally, make sure that design components are flexible and customizable by using props effectively.

You will also want to document your components thoroughly, providing clear explanations, usage examples, and any necessary guidelines. Lastly, consider [**testing your reusable components**](/blog.logrocket.com/testing-react-components-react-testing-library-vs-enzyme.md) to ensure their reliability and to catch any potential issues early on. By following these best practices, you can create reusable components that promote code reusability, consistency, and efficiency.

---

## Introduction to functional components and Hooks

In React, [**functional components**](/blog.logrocket.com/fundamentals-functional-programming-react.md) are pure JavaScript functions that accept an argument known as props and output a React element (JSX). The true beauty of functional components lies in their simplicity and flexibility. Functional components promote a declarative programming style, allowing developers to describe the desired UI based on input props. This leads to more predictable code and easier debugging.

Unlike class components, functional components do not use any render methods. Functional components are also referred to as stateless components because prior to React v16.8, they just accepted props and didn’t have the concept of state.

### So, what are Hooks in React?

Before React v16.8, functional components lacked state management and lifecycle methods; they were pretty much “dumb.” React v16.8 came with a new feature called Hooks. In a nutshell, [**Hooks in React**](/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.md) are functions that allow functional components to have state, perform side effects, and tap into React’s lifecycle methods.

They were introduced as a way to write reusable and stateful logic in functional components without needing class components. There are different types of in-built Hooks, as listed below, though you can also [**create your own custom Hooks**](/blog.logrocket.com/create-your-own-custom-react-hooks.md):

- State Hooks (`useState`)
- Effect Hooks (`useEffect`)
- Context Hooks (`useContext`)
- Ref Hooks (`useRef`)
- Performance Hooks (`useMemo`)

---

## Creating reusable UI components

Now that we have learned about reusable components, functional components, and Hooks, it is time to get our hands dirty by building reusable components which will use functional components and ones that will use Hooks like [**`useState`**](/blog.logrocket.com/guide-usestate-react.md).

### Input component

One advantage of creating a reusable input component is that you maintain the appearance of the input in various parts of your application. You can also determine what type of input component should be rendered by passing it a prop.

Although we won’t go deep into [**styling**](/blog.logrocket.com/styling-react-5-ways-style-react-apps.md) in this tutorial, you can customize your components to suit your visual needs. To get started quickly, use [<VPIcon icon="iconfont icon-replit"/>this Reactjs Replit template](https://replit.com/@replit/React-Javascript?v=1) to create a new project. In your newly created [<VPIcon icon="iconfont icon-replit"/>Replit](https://repl.it) project, create a <VPIcon icon="fas fa-folder-open"/>`components` folder with a <VPIcon icon="fa-brands fa-react"/>`FormInput.jsx`file, and add the following code to it:

```jsx :collapsed-lines title="components/FormInput.jsx"
import { useState } from "react";

const inputStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  color: '#333',
  backgroundColor: '#fff',
  width: '250px',
  display: 'block',
};

function FormInput(props) {
  const [inputType] = useState(props.type);
  const [inputValue, setInputValue] = useState('');

  function handleChange(event) {
    const newValue = event.target.value
    setInputValue(newValue);
    if (props.onChange) props.onChange(newValue);
  };

  return (
    <>
      <span>{props?.title? props.title : "Untitled input"}: &nbsp; </span>
      <input
        type={inputType}
        value={inputValue}
        name="input-form"
        onChange={handleChange}
        placeholder={props?.placeholder}
        autoComplete={props?.autocomplete ? props.autocomplete : "off"}
        style={inputStyle} />
      <br />
    </>
  );
};

export default FormInput;
```

For a functional component to be reusable, it has to take in data or datasets (via props) and return an output (usually through a function passed via props). It is recommended that mutable state should be kept in the `state` property of a component to ensure they work correctly. The `FormInput()` component above receives an `inputType` to determine what type of input element to render.

It also takes in a method `onChange()` to receive the value sent back out from the input. The component manages its value locally and only returns the updated state value to the component it is called from. To achieve this, we created a local function `handleChange()`. The function checks if a method to receive the state data is available via props and then sends the current state data to it for further processing.

### Custom select component

Now, in your <VPIcon icon="fas fa-folder-open"/>`components` folder, create a <VPIcon icon="fa-brands fa-react"/>`CustomSelect.jsx` file and add the following code to it:

```jsx :collapsed-lines title="components/CustomSelect.jsx"
import { useState } from "react";

const selectStyle = {
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
  color: '#333',
  backgroundColor: '#fff',
  width: '250px',
  display:'block',
};

function CustomSelect(props) {
  const [data] = useState(props.data);

  let options = data.map((item, index) => (
    <option key={index} value={item}>{item}</option>
  ));

  return (
    <>
      <select
        name="customSearch"
        onChange={(event) => props?.onSelectChange(event)}
        style={selectStyle}>
        <option value="">{props.title}</option>
        {options}
      </select>
      <br />
    </>
  );
}

export default CustomSelect;
```

In the code above, we receive the dataset needed for the `options` tag in the `select` element via props. To build the `option` tags, we looped through the dataset with props to construct it before rendering it as part of the `select` tag. The state of the tag (the currently selected option) is stored locally, updated, and then sent back as an output when it changes with our local function `handleChange()`.

### Button component

A reusable button can be used to display different color variants or sizes everywhere it is used in your application. In your <VPIcon icon="fas fa-folder-open"/>`components` folder, create a <VPIcon icon="fa-brands fa-react"/>`Button.jsx` file and add the following code to it:

```jsx :collapsed-lines title="components/Button.jsx"
import { useState } from "react";

function Button(props) {
  const [size] = useState(props.size);
  const [variant] = useState(props.variant);

  const buttonStyle = {
    border: 'none',
    borderRadius: '4px',
    fontSize: '8px',
    color: '#fff',
    backgroundColor: '#54a0ff',
    cursor: 'pointer'
  };

  if (props.size === 'lg') {
    buttonStyle.height = "40px";
    buttonStyle.fontSize = "18px";
  }else if (props.size === 'sm') {
    buttonStyle.height = "16px";
    buttonStyle.fontSize = "10px";
  }

  if (props?.variant === "warning") buttonStyle.backgroundColor = "#ff0000"
  if (props?.variant === "success") buttonStyle.backgroundColor = "#2ecc71"


  return (
    <button type={props.type} onClick={props?.onClick} style={buttonStyle}>
      {props.children}
    </button>
  );
}

export default Button;
```

Our button receives three properties through props:

- `Size` (`lg`, `sm`): To determine the size of the button and see the styling logic
- `Variant`: Used to determine the button color
- `Children`: Used to display the content of the button dynamically

### Modal component

A [**modal component**](/blog.logrocket.com/building-react-modal-module-with-react-router.md#creating-modal-component:~:text=modal%20router%20element%3A-,Creating%20a%20modal%20component,-So%20far%2C%20we%E2%80%99ve) is suitable for sending alerts in your application. In your <VPIcon icon="fas fa-folder-open"/>`components` folder, create a <VPIcon icon="fa-brands fa-react"/>`Modal.jsx` file and add the following code to it:

```jsx title="components/Modal.jsx"
import { useEffect, useRef } from "react";

function Modal(props) { 
  const ref = useRef(null);

  useEffect(() => {
    props?.isShowing? ref.current?.showModal() : ref.current?.close();
  }, [props.isShowing]);

return (
    <dialog ref={ref}> {props.children} </dialog>
  );
};

export default Modal;
```

This `Modal` component uses two React Hooks: [**`useEffect`**](/blog.logrocket.com/useeffect-react-hook-complete-guide.md) and [**`useRef`**](/blog.logrocket.com/usestate-vs-useref.md). The `useRef` Hook is used to create a reference called `ref` that will be attached to the `<dialog>` element. The `useEffect` Hook is responsible for managing the visibility of the modal dialog based on the `isShowing` prop passed to the component. It listens for changes to the `props.isShowing` value and triggers the appropriate action by calling the `showModal()` or `close()` method on the `ref.current` object.

`showModal` and `close` are methods associated with the HTML element `<dialog>`. Inside the component’s `render` function, the `<dialog>` element is used with the `ref` set to the `ref` created earlier. The `props.children` is rendered within `dialogue`, representing the content of the modal.

Our modal component receives two things, a Boolean value `isShowing` that determines if it pops up or not, and the `children` property that we will use to display the content of the modal dynamically. To close the modal, we’d need to set the `isShowing` props from `true` to `false`.

### Toggle component

A toggle component is used when an answer must be either true or false and is an essential form component. Now, create a <VPIcon icon="fa-brands fa-react"/>`ToggleSwitch.jsx` file in your `components` file and add the following code to it:

```jsx :collapsed-lines title="components/ToggleSwitch.jsx"
import { useState } from 'react';

const ToggleSwitch = (props) => {
  const [isOn, setIsOn] = useState(props.defaultChecked || false);

  const handleToggle = () => {
    const newValue = !isOn;
    setIsOn(newValue);
    props?.onToggleChange?.(newValue)
  };

  const styles = {
    switch:{
      position: 'relative',
      display: 'inline-block',
      width: '40px',
      height: '20px',
      borderRadius: '10px',
      backgroundColor: isOn ? '#2ecc71' : '#ff0000',
    },
    slider:{
      position: 'absolute',
      top: '2px',
      left: isOn ? '22px' : '2px',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      transition: 'left 0.2s ease-in-out',
    },
    checkbox:{
      position: 'absolute',
      opacity: 0,
      pointerEvents: 'none',
    },
    titles: {
      position: 'absolute',
      top:'2px',
      marginLeft: '50px',
      color: isOn ? '#2ecc71' : '#ff0000',
      fontWeight: 'bold',
    }
  };

  return (
    <>
      <label style={styles.switch} className="toggle-switch">
        <input
          type="checkbox"
          checked={isOn}
          onChange={handleToggle}
          disabled={props?.disabled}
          style={styles.checkbox}
        />
        <span style={styles.slider}></span>
        <span style={styles.titles}>{isOn ? props?.OnTitle || 'On' : props?.OffTitle || 'Off'}</span>
      </label>
      <br/>
    </>
  );
};

export default ToggleSwitch;
```

Here, the component uses `useState` to manage the state of the toggle switch. It initializes the state using the `defaultChecked` prop passed to the component, or `false` if the prop is not provided. The state variable `isOn` represents the current state of the toggle switch, and the `setIsOn` function is used to update the state.

The `handleToggle` function is responsible for toggling the state of the switch when it is clicked. It updates the state with the new value, and if the `onToggleChange` prop is provided, it invokes the function and passes the new value as an argument. The component also defines an object style that holds CSS styles for different elements of the toggle switch.

These styles control the appearance and positioning of the `switch`, `slider`, `checkbox`, and `titles`. The component then returns JSX elements representing the toggle switch. It uses a `<label>` element as the container, with an `<input>` element of `type checkbox` inside.

The checked state is bound to `isOn`, and the `onChange` event is handled by `handleToggle`. The disabled state is determined by the `disabled` prop. The switch’s appearance is controlled by applying the `styles.switch`, `styles.slider`, and `styles.titles` styles to the respective elements. `isOn` is used to conditionally set the background color, left position, and text color based on the switch’s state.

### Search bar component

A search bar component can be used in various parts of a web application where a search functionality is required — for example, navigation headers, sidebars, filters, data tables, and more. Creating a reusable search bar component in React is straightforward. In your <VPIcon icon="fas fa-folder-open"/>`components` folder, create a <VPIcon icon="fa-brands fa-react"/>`SearchBar.jsx` file and add the following code to it:

```jsx :collapsed-lines title="components/SearchBar.jsx"
const searchBarStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  color: '#333',
  backgroundColor: '#fff',
  width: '250px'
};

const SearchBar = (props) => {
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    props?.onSearch(searchTerm);
  };

  return ( 
    <input
      type="search"
      placeholder={props?.placeHolder || "Enter your search terms..."}
      onChange={handleSearch}
      style={searchBarStyle}
    /> 
  );
};

export default SearchBar;
```

The component sets a variable `searchBarStyle` that holds inline CSS styles for the search bar. These styles define properties such as `padding`, `border`, `borderRadius`, `color`, `backgroundColor`, and `width` to control the appearance of the `input` element. The `HandleSearch` function is defined within the component’s function body.

It is responsible for handling the search event when the user enters text into the input field. It retrieves the entered search term from the `event.target.value` and then invokes the `onSearch` prop function, passing the search term as an argument. The component’s render function returns JSX representing the search bar. It uses an `<input>` element of type search, allowing users to input text for searching.

The placeholder attribute is set to the value of the `props.placeHolder` prop, or a default placeholder if the prop is not provided. The default placeholder is `"Enter your search terms..."`*.* The `onChange` event is handled by `handleSearch`, which is triggered whenever the user types or modifies the input. The inline CSS styles defined in `searchBarStyle` are applied to the input element using the `style` attribute.

### Form component

A form component can be used in various scenarios where you need to encapsulate form inputs and provide additional functionality. In your <VPIcon icon="fas fa-folder-open"/>`components` folder, create a <VPIcon icon="fa-brands fa-react"/>`FormWrapper.jsx` file and add the following code to it:

```jsx title="components/FormWrapper.jsx"
const FormWrapper = (props) => {
  return (
    <form onSubmit={ event => props?.onSubmit?.({event}) }>
      <fieldset>
        <legend>{props?.title}:</legend>
        {props?.children}
      </fieldset> 
    </form>
    );
};

export default FormWrapper;
```

The `FormWrapper` component is a functional component that takes in props as its parameter. Within the function body, it returns JSX representing a form wrapper. The form wrapper consists of a `<form>` element, which has an `onSubmit` event handler.

When the form is submitted, the `props.onSubmit` function is invoked with an object containing the event parameter as its argument. The `props.onSubmit` is optional, and the conditional chaining operator `?.` is used to ensure it exists before invoking it. Inside the form, there is a `<fieldset>` element that groups related form elements together. It contains a `<legend>` element that displays the value of the `props.title`, or an empty string if the prop is not provided.

The `<legend>` serves as a caption or description for the group of form elements. The component also renders the `props.children` within `<fieldset>`. This allows any child components or elements passed to the `FormWrapper` to be rendered within the form. Now, you can easily integrate this form into different parts of your application while customizing the form submission logic based on the specific use case. Reusability enhances efficiency and reduces code duplication in form implementation.

---

## Stitching all the components into one

Now that we have defined all components we need, it is time to stitch them together. We will use the `FormWrapper` as the parent component. Therefore every component or element we put inside `FormWrapper` will be a child of `FormWrapper`. To implement this, create a file outside the <VPIcon icon="fa-brands fa-react"/>`App.jsx` components folder and add the following code inside it:

```jsx :collapsed-lines title="App.jsx"
import { useState } from "react";
import FormInput from "./components/FormInput.jsx";
import CustomSelect from "./components/CustomSelect.jsx";
import Button from "./components/Button.jsx";
import FormWrapper from "./components/FormWrapper.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Modal from "./components/Modal.jsx";
import ToggleSwitch from './components/ToggleSwitch.jsx';

function App() {
  const [formTwoSearch, modify_formTwoSearch] = useState("");
  const [isModalShowing, setIsModalShowing] = useState(false);

  const data = [ "One", "Two", "Three", "Four" ];

  const handleChange = (value)  => console.log(value);
  const onToggleChange = (status) => console.log({ toggle: status });

  const formOneSubmitter = ({ event }) => {
    console.log("Form One can be submitted");
    event.preventDefault();
  };

  const formTwoSubmitter = ({ event }) => {
    console.log("Form Two can be submitted");
    event.preventDefault();
  };

  return (
    <>
      <FormWrapper onSubmit={formOneSubmitter} title="Form One">

        <CustomSelect
          data={data}
          title="Select number of bedrooms"
          onSelectChange={(event) => console.log(`Got ${event.target.value}`)}
        />

        <FormInput title="First Name" type={"text"} onChange={handleChange} autocomplete={"given-name"} />

        <FormInput title="Last Name" type={"text"} onChange={handleChange} autocomplete={"family-name"} />

        <FormInput title="Email address" type={"email"} onChange={handleChange} autocomplete={false} />

        <FormInput title="Enter password" type={"password"} onChange={handleChange} />


        <ToggleSwitch disabled={false} defaultChecked={true} onToggleChange={onToggleChange} OnTitle="Agree" OffTitle="Disagree" />

        <Button type="submit" variant="primary" size={"lg"}> Submit data </Button>

        &nbsp;

      </FormWrapper>

      <FormWrapper onSubmit={formTwoSubmitter} title="Form Two">
        <SearchBar
          placeHolder="Find a house near me"
          onSearch={(searchTerm) => modify_formTwoSearch(searchTerm)}
        />

        &nbsp;

        <Button type="submit" variant="success" size={"sm"}> Search </Button>

        &nbsp;

        <Button type="reset" variant="warning" size={"sm"} onClick={()=>modify_formTwoSearch("")}> Clear Form </Button>

        {formTwoSearch && (
          <p>
            Searching for "<b>{formTwoSearch}</b>"
          </p>
        )}
      </FormWrapper>

      <>
        <Button onClick={() => setIsModalShowing(true)}>View modal</Button>
        <Modal isShowing={isModalShowing} onClose={() => setIsModalShowing(false)}>
          <h3>About this app</h3>
          <p> Try creating reusable components now!.</p>
          <Button>
            <a href="https://blog.logrocket.com/author/daggieblanqx/">
              See more articles
            </a>
          </Button>
          &nbsp;
          <Button onClick={() => setIsModalShowing(false)}>Close Modal</Button>
        </Modal>
      </>
    </>
  );
}
export default App;
```

First, we import all the components we created. Inside this component, there are multiple states being used, including `formTwoSearch` and `isModalShowing`, which are managed using the `useState` Hook. The `formOneSubmitter` and `formTwoSubmitter` functions are event handlers that are used for submitting `Form One` and `Form Two`, respectively.

These functions are passed as props to `FormWrapper`, specifically to the `onSubmit` prop. In `FormWrapper`, when the form is submitted, `onSubmit` is invoked with an event object. This object contains information about the form submission event. By defining `formOneSubmitter` and `formTwoSubmitter` as event handler functions and passing them to `onSubmit`, you can control the behavior of what happens when each form is submitted.

These two functions will simply log a message to the console indicating that the corresponding form can be submitted. Additionally, they prevent the default form submission behavior using `event.preventDefault()`, which prevents the page from refreshing upon form submission.

You can customize the behavior of these event handlers according to your application’s needs. For example, you can perform form validation, make API requests, or update the state based on the submitted form data.

### `<CustomSelect>`

The `<CustomSelect>` component renders a custom select input in the code snippet provided. Here’s an explanation of the props used:

- `data`: This prop specifies the options for the select input. In this case, it is an array `["One", "Two", "Three", "Four"]` containing the available options
- `title`: This prop sets the title or label for the select input. In the example, it is set to `"Select number of bedrooms"`
- `onSelectChange`: This prop is an event handler function that gets executed when the select input’s value changes. In this case, it is an arrow function that logs a message to the console, displaying the selected value using `event.target.value`. The event object contains information about the select input’s change event

When the user selects an option from the `<CustomSelect>` component, the `onSelectChange` event handler will be triggered, and the selected value will be logged to the console. You can modify `onSelectChange` to perform any desired actions based on the selected value, such as updating the state, triggering other functions, or making API calls.

### `<FormInput>`

The `<FormInput>` component renders an input field for capturing the user’s first name in the code snippet provided. Let’s break down the props used:

- `title`: This prop sets the title or label for the input field. In this case, it is set to `"First Name"`
- `type`: This prop specifies the type of input field. Here, it is set to `"text"`, indicating a standard text input
- `onChange`: This prop is an event handler function that gets executed when the input value changes. In the example, it is set to `handleChange`, which is a function defined elsewhere in the code
- `autocomplete`: This prop specifies whether autocomplete suggestions should be enabled for the input field. In this case, it is set to `"given-name"`, which is a hint for browsers to suggest names when auto-completing

Whenever the user enters or modifies text in the input field, the `onChange` event handler function `handleChange` will be triggered. You can define `handleChange` to capture and process the updated input value, such as updating the state or performing any desired actions. This same logic applies to other `FormInput` components.

By providing appropriate props, the `<FormInput>` component allows you to easily create input fields with titles, different types, autocomplete behavior, and event handling in your React application.

### `<ToggleSwitch>`

The `<ToggleSwitch>` component renders a toggle switch in the code snippet provided. Let’s break down the props used:

- `disabled`: This prop determines whether the toggle switch is disabled or not. In this case, it is set to `false`, indicating that the switch is enabled
- `defaultChecked`: This prop sets the initial state of the toggle switch. Here, it is set to `true`, indicating that the switch is initially turned on
- `onToggleChange`: This prop is a callback function that gets called when the state of the toggle switch changes. In the example, it is set to `onToggleChange`, which is a function defined elsewhere in the code
- `OnTitle`: This prop sets the title or label for the `"ON"` state of the toggle switch. In this case, it is set to `"Agree"`
- `OffTitle`: This prop sets the title or label for the `"OFF"` state of the toggle switch. Here, it is set to `"Disagree"`

When the user interacts with the toggle switch by clicking or tapping it, `onToggleChange` will be called with the updated state of the switch as a parameter. You can define `onToggleChange` to handle the state change, perform any necessary actions, or update the state of your application accordingly.

By providing these props to the `<ToggleSwitch>` component, you can easily create a customizable toggle switch in your React application, allowing users to toggle between different states or options.

### `FormWrapper`

In the second `FormWrapper` component, we added a `SearchBar` component that takes the following props:

- `placeHolder`: Sets the placeholder text for the search input field to `"Find a house near me"`
- `onSearch`: Takes a callback function that will be called when the user performs a search. The function `modify_formTwoSearch` is passed as a callback, and it will be invoked with the `searchTerm` as an argument. This function can be used to update the state or perform any necessary actions based on the search term entered by the user

Still, inside the second `FormWrapper`, we have added a `Button` component that clears our form and also a conditional rendering logic that checks if the `formTwoSearch` state variable has a truthy value. If it does, it renders a `<p>` element that displays the search term. The search term is wrapped in `<b>` tags to emphasize it.

If you stitched the components successfully, as indicated by this article, you will see a UI that looks like this:

If your UI didn’t look the same as in the video above, crossreference your code using this [GitHub repository (<VPIcon icon="iconfont icon-github"/>`DaggieBlanqx/Blogpost-React-reusable-UI-components`)](https://github.com/DaggieBlanqx/Blogpost-React-reusable-UI-components) or [Replit repl (<VPIcon icon="iconfont icon-replit"/>`@DaggieBlanqx`)](https://replit.com/@DaggieBlanqx/Logrocket-Building-reusable-UI-components-with-React-Hooks#src/App.jsx).

---

## Conclusion

In this tutorial, we learned how to create reusable React UI components. This knowledge can be applied to create highly scalable and consistent React applications. By harnessing the power of `useState`, `useEffect`, `useRef`, and other Hooks, you can create modular and customizable components that promote code reuse and maintainability.

Embracing the principles and best practices outlined in this article will help you streamline your development process, enhance code quality, and deliver exceptional UX. So, go forth and mobilize the power of React Hooks to build reusable UI components that will transform the way you approach web development. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building reusable UI components with React Hooks",
  "desc": "Join us on this journey to unlock the full potential of React Hooks and discover the art of building reusable UI components.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-reusable-ui-components-with-react-hooks.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
