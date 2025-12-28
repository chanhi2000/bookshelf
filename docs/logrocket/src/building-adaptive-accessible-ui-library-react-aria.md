---
lang: en-US
title: "Building an adaptive, accessible UI library with React Aria"
description: "Article(s) > Building an adaptive, accessible UI library with React Aria"
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
      content: "Article(s) > Building an adaptive, accessible UI library with React Aria"
    - property: og:description
      content: "Building an adaptive, accessible UI library with React Aria"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-adaptive-accessible-ui-library-react-aria.html
prev: /programming/js-react/articles/README.md
date: 2023-04-04
isOriginal: false
author:
  - name: Hulya Karakaya
    url : https://blog.logrocket.com/author/hulyakarakaya/
cover: /assets/image/blog.logrocket.com/building-adaptive-accessible-ui-library-react-aria/banner.png
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
  name="Building an adaptive, accessible UI library with React Aria"
  desc="Build a basic UI library with React Aria using Aria props and React Context to make your project accessible to a wide range of users."
  url="https://blog.logrocket.com/building-adaptive-accessible-ui-library-react-aria"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/building-adaptive-accessible-ui-library-react-aria/banner.png"/>

In recent years, React has become one of the most popular frontend frameworks, thanks to its component-based architecture and powerful rendering capabilities. However, building a UI library that is both adaptive and accessible can be a challenging task. But with the right tools and techniques, it’s achievable.

![Building An Adaptive, Accessible UI Library With React Aria](/assets/image/blog.logrocket.com/building-adaptive-accessible-ui-library-react-aria/banner.png)

In this post, we’ll look at how to use React Aria to create adaptive and accessible UI components in React. By leveraging the power of React Aria, you can build UI components that are accessible to all users, including those with disabilities.

---

## What is React Aria?

[<VPIcon icon="fas fa-globe"/>React Aria](https://react-spectrum.adobe.com/react-aria/index.html) is a set of [<VPIcon icon="fa-brands fa-react"/>React Hooks](https://reactjs.org/docs/hooks-intro.html) designed to help developers build accessible UI components using [<VPIcon icon="iconfont icon-w3c"/>ARIA](https://w3.org/WAI/standards-guidelines/aria/) (Accessible Rich Internet Applications) patterns. It supports various input modes, such as mouse, touch, keyboard, and screen reader interactions, and provides focus management to ensure keyboard and screen reader users can navigate through UI components in an accessible way.

Key qualities of React Aria:

- **Accessible**: Supports keyboard navigation, screen reader support, and ARIA patterns for creating UI components that are accessible to all users
- **International**: Supports more than 30 languages, including bidirectional text and localized date and number formatting, to create internationalized UI components
- **Fully customizable**: Can be integrated into any design or styling framework without imposing specific rendering, DOM structure, or design details
- **Adaptive**: Supports various input modes, making UI components adaptable to different user needs and assistive technologies

With React Aria, developers can create accessible UI components that cater to a diverse global audience.

---

## What is React Spectrum?

[<VPIcon icon="fas fa-globe"/>React Spectrum](https://react-spectrum.adobe.com/react-spectrum/index.html) is a UI component library developed by Adobe. It provides a set of pre-built, accessible and customizable components built on top of React Aria. React Spectrum’s components are built using React Aria’s hooks, ensuring that they are accessible by default. React Spectrum offers a wide range of UI components, including buttons, checkboxes, text fields, and more. The library is built using React and follows modern web standards such as accessibility, responsive design, and internationalization.

By leveraging the accessibility features provided by React Aria, React Spectrum’s components are designed to be accessible by default, and its powerful theming system allows developers to easily customize the look and feel of their web page.

---

## Getting started with React Aria

To get started with React Aria, you can install it via `npm` or `yarn`, like so:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add react-aria
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm i react-aria
```

:::

Once you have installed the library, you can import the hooks you need for your project.

---

## React Aria interaction hooks

React Aria offers a variety of hooks and components, such as `useButton`, `useCheckbox`, `useSlider`, `useFocusRing`, `useCombobox`, and many others. These hooks provide you with the necessary ARIA attributes and events that you need to make your components accessible.

Let’s look at some of the examples.

### `useButton` Hook

The [<VPIcon icon="fas fa-globe"/>useButton Hook](https://react-spectrum.adobe.com/react-aria/useButton.html) provides accessibility and interaction support for button elements. It ensures that the button can be triggered using keyboard events, such as the Enter or Space keys, as well as mouse and touch events:

```jsx
import { useButton, mergeProps } from "react-aria";

function MyButton(props) {
  let { children, onPress, ...otherProps } = props;
  let { buttonProps } = useButton({ onPress }, otherProps);
  return <button {...mergeProps(buttonProps, otherProps)}>{children}</button>;
}
```

Here, we defined a functional component called `MyButton` that utilizes the `useButton` hook from `react-aria` to create an accessible button. The `useButton` Hook generates accessibility properties and event handlers for a button element, such as `aria-pressed`, `onPress`, and `onKeyUp`. These props ensure that the button is keyboard accessible and that it works with screen readers.

The [<VPIcon icon="fas fa-globe"/>`mergeProps` utility function](https://react-spectrum.adobe.com/react-aria/mergeProps.html) from `react-aria` is used to merge the accessibility properties generated by `useButton` with any additional props passed down to `MyButton` via `otherProps`. The resulting merged props are then spread onto a button element using the JSX syntax.

To use `MyButton`, you can simply import it and render it with any desired props, including `children`, `onPress`, and any other props that a regular HTML button element would accept:

```jsx
import MyButton from "./MyButton";

function App() {
  const handleClick = () => console.log("Button clicked!");

  return (
    <div>
      <MyButton onPress={handleClick}>Click me!</MyButton>
    </div>
  );
}
```

In this example, a click event handler, `handleClick`, is passed as the `onPress` prop to `MyButton`, and the text `Click me!` is passed as a child prop. When the button is clicked, the `handleClick` function will be invoked and `"Button clicked!"` will be logged to the console.

### `useToggleButton` Hook

The [<VPIcon icon="fas fa-globe"/>`useToggleButton` Hook](https://react-spectrum.adobe.com/react-aria/useToggleButton.html) helps create a toggle button component that can be used for toggling states like on/off or open/close. It manages the state of the button and returns the required props to apply to the button element:

```jsx :collapsed-lines
import { useToggleButton, mergeProps } from "react-aria";

function ToggleButton(props) {
  const { children, isPressed, onPress, ...otherProps } = props;
  const { buttonProps } = useToggleButton({ isPressed, onPress }, otherProps);
  return (
    <button {...mergeProps(buttonProps, otherProps)}>
      {isPressed ? "ON" : "OFF"} - {children}
    </button>
  );
}

export default function App() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <ToggleButton
      isPressed={isPressed}
      onPress={() => setIsPressed(!isPressed)}
    >
      Toggle Me
    </ToggleButton>
  );
}
```

In this example, we’re using the `useToggleButton` Hook to manage the state and event handling for the button. We’re passing the `isPressed` and `onPress` props to the hook to control the state of the button, and the `buttonProps` object returned by the hook is spread onto the `button` element to ensure proper accessibility attributes and event handling.

The `ToggleButton` component also accepts a `children` prop, which is used to render the content of the button, and any other additional props are spread onto the `button` element using `mergeProps` to ensure that they’re properly merged with the `buttonProps` returned by the hook.

Finally, we’re using this `ToggleButton` component in the `App` component, where we’re managing the state of the button using the `useState` Hook.

---

## Accessibility considerations for a UI library

Accessibility is an important consideration for any UI library, as it ensures that all users can access and use the components provided. To build accessible components with React Aria, you can follow best practices such as:

- Ensuring that all components have a label or accessible name
- Providing keyboard navigation and focus management
- Ensuring that components meet WCAG standards for contrast and color
- Ensuring that components are screen reader accessible

React Aria provides several hooks and components that help with accessibility, such as [<VPIcon icon="fas fa-globe"/>`useFocusRing`](https://react-spectrum.adobe.com/react-aria/useFocusRing.html). `useFocusRing` provides an accessibility feature known as the “focus ring.” When an element receives focus, a focus ring is displayed around it to indicate to the user that the element is currently in focus.

Here’s an example of how you might use `useFocusRing` to ensure keyboard navigation and focus management in your custom button component:

```jsx :collapsed-lines
import { useState } from "react";
import { useFocusRing } from "react-aria";

export default function CustomInput() {
  const [value, setValue] = useState("");
  const { isFocusVisible, focusProps } = useFocusRing();

  function handleChange(event) {
    setValue(event.target.value);
  }
  return (
    <div>
      <label>Type something:</label>
      <input
        {...focusProps}
        value={value}
        onChange={handleChange}
        style={{
          boxShadow: isFocusVisible ? "0 0 3px 3px #4D90FE" : "none",
          padding: "5px",
          fontSize: "16px"
        }}
      />
    </div>
  );
}
```

In this example, we’re using `useFocusRing` to detect when the input is focused and to apply a custom focus style. By using these hooks, we’re able to improve the accessibility of our custom input component:

```jsx
import CustomInput from "./CustomInput";

function App() {
  return (
    <div>
      <label htmlFor="custom-input">Enter your name:</label>
      <CustomInput id="custom-input" />
    </div>
  );
}
export default App;
```

In this example, the `CustomInput` component is being imported from a file called `CustomInput.js`, and is being used inside the `App` component. The `label` element is associated with the `CustomInput` component using the `htmlFor` attribute and the `id` attribute on the `CustomInput` component.

This is important for accessibility purposes, as it enables screen readers to read the label when the input is focused:

![Focusing The Input Using The CustomInput Component](/assets/image/blog.logrocket.com/building-adaptive-accessible-ui-library-react-aria/focusing-input-using-custominput-component.webp)

---

## Adaptive design considerations

Adaptive design is another important consideration for any UI library, as it ensures that components work well on different screen sizes and device types. To build adaptive components with React Aria, you can follow best practices such as:

- Using responsive design to adjust component layout and behavior based on screen size
- Providing accessibility features like high-contrast mode and zoom support
- Using CSS media queries to adjust component styles based on screen size

---

## Customization with React Context

Customization with [React Context](https://beta.reactjs.org/learn/passing-data-deeply-with-context) allows you to easily customize the behavior and appearance of components across your entire application. React Context provides a way to pass data through the component tree without having to pass props manually at every level.

Here’s an example of how you might use React Context to allow consumers of your UI library to customize the color scheme of your custom button component:

```jsx
import { useButton, mergeProps } from "react-aria";
import { createContext, useContext } from "react";

let ButtonContext = createContext({ colorScheme: "light" });

export function MyButton(props) {
  let { children, onPress, ...otherProps } = props;
  let { colorScheme } = useContext(ButtonContext);
  let { buttonProps } = useButton({ onPress }, otherProps);
  return (
    <button
      {...mergeProps(buttonProps, otherProps)}
      style={{
        backgroundColor: colorScheme === "dark" ? "black" : "white",
        color: colorScheme === "dark" ? "white" : "black"
      }}
    >
      {children}
    </button>
  );
}


export function MyButtonProvider(props) {
  let { children, colorScheme } = props;
  return (
    <ButtonContext.Provider value={{ colorScheme }}>
      {children}
    </ButtonContext.Provider>
  );
}
```

Here, we create a `ButtonContext` using `createContext` with a default value of `colorScheme:` `"light"`. Then, we define a `MyButton` component that consumes `ButtonContext` using the `useContext` Hook.

Inside this component, we use `useButton` from `react-aria` to create an accessible button with `buttonProps`. We then merge these `buttonProps` with `otherProps` using `mergeProps` from `react-aria`. Finally, we set the `style` attribute of the button to change its `backgroundColor` and `color` based on the `colorScheme` from `ButtonContext`.

Then, in the `App` component, we wrap the `MyButton` component in a `MyButtonProvider` component with a `colorScheme` of “dark.” This changes the appearance of the button to have a dark background color and light text color:

```jsx
import { MyButtonProvider, MyButton } from "./MyButton";

function App() {
  return (
    <MyButtonProvider colorScheme="dark">
      <div>
        <MyButton onPress={() => console.log("Button pressed")}>
          Click me!
        </MyButton>
      </div>
    </MyButtonProvider>
  );
}
export default App;
```

By using React Context, we can easily customize the appearance of components throughout our entire application by simply changing the values in the `Provider` component:

![Customizing The Appearance Of Comoponents Using The Provider Component](/assets/image/blog.logrocket.com/building-adaptive-accessible-ui-library-react-aria/customizing-component-appearance-provider-component.webp)

---

## Testing for accessibility

Testing for accessibility is crucial when building a UI library, as it ensures that the components you provide are accessible to all users. There are many accessibility testing tools available, such as [<VPIcon icon="iconfont icon-github"/>`dequelabs/axe-core`](https://github.com/dequelabs/axe-core) and [<VPIcon icon="fas fa-globe"/>pa11y](https://pa11y.org/). To test your components, you can use these tools in combination with React testing libraries like [<VPIcon icon="fas fa-globe"/>react-testing-library](https://testing-library.com/docs/react-testing-library/intro/), [<VPIcon icon="fas fa-globe"/>Jest](https://jestjs.io/), or [<VPIcon icon="fas fa-globe"/>Enzyme](https://enzymejs.github.io/enzyme/). Check out this comparison post between the [**rest-testing-library and Jest**](/blog.logrocket.com/testing-react-apps-jest-react-testing-library.md) or this article comparing [**react-testing-library and Enzyme**](/blog.logrocket.com/react-testing-library-vs-enzyme.md).

---

## Documentation and examples

To make your UI library accessible to others, it’s important to provide documentation and examples. Use tools like [**Storybook**](/blog.logrocket.com/using-storybook-to-develop-react-components-faster.md) to create a living style guide that documents your components and shows how to use them. You can also include documentation and examples on your website or in your repository’s README file.

Here’s an example of how you might provide documentation and examples for your custom button component:

````md
# MyButton

A customizable button component.

---

## Props

| Prop   | Type      | Description                  | Default Value |
| ------ | --------- | ---------------------------- | ------------- |
| onPress | function | Function to call when button is pressed | none |
| colorScheme | string | The color scheme for the button (either 'light' or 'dark') | 'light' |

---

## Example

```jsx
import { MyButton } from "my-ui-library";

<MyButton onPress={() => console.log("Clicked!")}>Click me</MyButton>
```

````

This is an example of a documentation for a React component called “MyButton.” It lists the props that can be passed to the component, along with their types and descriptions, as well as their default values if applicable. The example code shows how to use the component with the `onPress` prop and a text child element. This kind of documentation can help developers understand how to use a component and what kind of functionality it provides.

---

## Conclusion

Building an adaptive, accessible UI library with React Aria can seem like a daunting task, but it is a valuable investment in providing an inclusive user experience. By leveraging the power of React Aria, you can build UI components that are accessible to all users, including those with disabilities.

In this post, we covered the basics of building a UI library with React Aria, including using Aria props, providing customization with React Context, testing for accessibility, and providing documentation and examples.

By following these best practices, you can build a UI library that is not only accessible, but also flexible and customizable to suit the needs of a wide range of users.

We hope this post has provided you with some valuable insights into building an adaptive, accessible UI library with React Aria.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building an adaptive, accessible UI library with React Aria",
  "desc": "Build a basic UI library with React Aria using Aria props and React Context to make your project accessible to a wide range of users.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-adaptive-accessible-ui-library-react-aria.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
