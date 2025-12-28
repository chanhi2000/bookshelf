---
lang: en-US
title: "The best React select component libraries"
description: "Article(s) > The best React select component libraries"
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
      content: "Article(s) > The best React select component libraries"
    - property: og:description
      content: "The best React select component libraries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/best-react-select-component-libraries.html
prev: /programming/js-react/articles/README.md
date: 2024-10-23
isOriginal: false
author:
  - name: Jude Miracle
    url : https://blog.logrocket.com/author/judemiracle/
cover: /assets/image/blog.logrocket.com/best-react-select-component-libraries/banner.png
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
  name="The best React select component libraries"
  desc="Explore select libraries in React, including React Select and alternatives like Downshift, Choice.js, and more."
  url="https://blog.logrocket.com/best-react-select-component-libraries"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/best-react-select-component-libraries/banner.png"/>

When building forms in React applications, React Select is a popular library that offers nearly everything you need to create customizable select inputs. Some key features include:

![The Best React Select Component Libraries](/assets/image/blog.logrocket.com/best-react-select-component-libraries/banner.png)

- Multi-select
- Async options
- Fixed options
- Full accessibility
- Advanced filtering capabilities

::: info

[**Read more about React Select and its features here**](/blog.logrocket.com/react-select-comprehensive-guide.md).

```component VPCard
{
  "title": "React Select: A comprehensive guide",
  "desc": "React Select offers customization, styling, async data loading, accessibility, and more to build powerful, user-friendly dropdowns in React.",
  "link": "/blog.logrocket.com/react-select-comprehensive-guide.md",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```

:::

Although React Select is great for many use cases, it may not be the best solution for every project. It can be too simplistic for more complex use cases, and it may cause performance or integration issues in certain cases. Consider these limitations:

- **Performance**: React Select doesn’t perform well with large datasets or complex UIs, which can affect user experience
- **Customization**: React Select is highly customizable but requires more effort for deep customization like nested select and some advanced styling options, which can bloat the codebase
- **Learning curve**: It has many features, which can introduce a steeper learning curve for developers who need something simpler or less feature-packed
- **Browser compatibility**: While React Select is generally well-supported, it may have issues with older web browsers. Some advanced features might not work in Internet Explorer or very old versions of Chrome/Firefox. Mobile browsers can also cause unexpected behavior, especially with touch events
- **Bundle size**: For projects with strict performance requirements, the 29.5kb bundle size of React Select can be a concern

> React Select has been improving over time, so these might be fixed in newer versions. Check the latest docs and community feedback for more information.

In this article, we will look at React Select and alternative select libraries, diving into their features, pros/cons, and usage.

::: note Alternatives to React Select

The following libraries are some alternatives to React Select that are actively maintained and have sizable communities. Each offers advantages and thrives in specific use cases.

:::

---

## Downshift

![Downshift Logo](/assets/image/blog.logrocket.com/best-react-select-component-libraries/downshift-logo.png)

```component VPCard
{
  "title": "Introduction | Downshift",
  "desc": "Downshift Library Documentation",
  "link": "https://downshift-js.com",
  "logo": "https://downshift-js.com/img/downshift.ico",
  "background": "rgba(46,133,85,0.2)"
}
```

[<VPIcon icon="fas fa-globe"/>Downshift](https://downshift-js.com/) is a select component library designed to improve the accessibility and functionality of combobox or autocomplete inputs by following the [ARIA accessibility](https://blog.logrocket.com/ux-design/accessibility-apis-use-case-ux/) pattern. It manages user interactions and state, enabling developers to create combobox/autocomplete and select components with a minimal API.
<!-- TODO: /blog.logrocket.com/accessibility-apis-use-case-ux.md -->

Downshift offers a set of [**React hooks**](/blog.logrocket.com/react-hooks-cheat-sheet-solutions-common-problems.md) that provide stateful logic for making components functional and accessible. These hooks include `useSelect` for custom select components, `useCombobox` for combobox/autocomplete inputs, and `useMultipleSelection` for selecting multiple items in select or comboboxes.

Downshift also provides logic for making components accessible and functional while giving developers complete freedom when building the UI.

### Downshift pros

- Highly customizable and provides built-in accessibility features out of the box
- Offers fine-grained control over component behavior without enforcing a specific design
- Good for creating complex and custom select interactions, rendering, and styles
- Supports controlled and uncontrolled forms in React, allowing developers to choose the form management style that best suits their use case. Controlled forms store input values in the component’s state, while uncontrolled forms allow the DOM to manage form data, using a `ref` to access input values when needed
- Integrates well with React, React Native, and Preact

### Downshift cons

- Implementing the UI requires more work than implementing more opinionated libraries
- It may not be the best choice for developers who want quick solutions without customizing
- Requires more boilerplate code to set up

### Downshift usage

Use the command below to install Downshift:

```sh
npm i --save downshift
```

Then, import and make use of Downshift as shown:

```jsx :collapsed-lines
import React, { useState } from 'react';
import Downshift from 'downshift';

const items = [
  {value: 'apple'},
  {value: 'pear'},
  {value: 'orange'},
  {value: 'grape'},
  {value: 'banana'},
]

function MySelect() {
  return (
  <Downshift
    onChange={selection =>
      alert(selection ? `You selected ${selection.value}` : 'Selection Cleared')
    }
    itemToString={item => (item ? item.value : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
      getRootProps,
    }) => (
      <div>
        <label {...getLabelProps()}>Enter a fruit</label>
        <div
          style={{display: 'inline-block'}}
          {...getRootProps({}, {suppressRefError: true})}
        >
          <input {...getInputProps()} />
        </div>
        <ul {...getMenuProps()}>
          {isOpen
            ? items
                .filter(item => !inputValue || item.value.includes(inputValue))
                .map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {item.value}
                  </li>
                ))
            : null}
        </ul>
      </div>
    )}
  </Downshift>
  );
}

export default MySelect;
```

---

## Choices.js

![Choice.js Homepage](/assets/image/blog.logrocket.com/best-react-select-component-libraries/choices-js-homepage.png)

```component VPCard
{
  "title": "Choices",
  "desc": "A lightweight, configurable select box/text input plugin. Similar to Select2 and Selectize but without the jQuery dependency.",
  "link": "https://choices-js.github.io/Choices",
  "logo": "https://choices-js.github.io/assets/images/favicon.ico",
  "background": "rgba(0,95,117,0.2)"
}
```

[<VPIcon icon="fas fa-globe"/>Choices.js](https://choices-js.github.io/Choices/) is a JavaScript library for creating custom select boxes, text inputs, and multi-select inputs. It is popular for its flexibility and ability to handle complex select components without relying on jQuery. It is like [Select2 (<VPIcon icon="iconfont icon-github" />`select2/select2`)](https://github.com/select2/select2) and [Selectize (<VPIcon icon="iconfont icon-github" />`selectize/selectize.js`)](https://github.com/selectize/selectize.js) but written in vanilla JavaScript so it is lighter and more modern.

Choices.js allows developers to create dynamic select inputs, whether single or multi-select, while controlling behaviors like sorting, searching, placeholder text, and the ability to add custom options. Developers can customize the styling of select elements to match their app design. Additionally, Choices.js has callback functions for user interactions and extends text inputs with features like tagging, validation, and limiting entries.

### Choices.js pros

- Has a bundle size of ~20kb gzipped, making it best for performance-conscious projects
- Easy to use; it provides a simple API for quick integration and customization
- Highly configurable; it allows developers to adjust almost every aspect, from styles to behavior
- Adheres to modern JavaScript practices, integrating well into React or Vue frameworks including Laravel

### Choices.js cons

- Lacks built-in AJAX support, requiring additional work for dynamic data loading
- Limited documentation and community support compared to React Select
- Has fewer advanced features out of the box

### Choices.js usage

Install Choices.js with the following command:

```sh
npm i choices.js
```

Then, import and make use of the Choices.js library as shown below:

```jsx :collapsed-lines
import React, { useEffect, useRef } from 'react';
import Choices from 'choices.js';

function MySelect() {
  const selectRef = useRef(null);

  useEffect(() => {
    const choices = new Choices(selectRef.current, {
      choices: ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'],
      placeholder: 'Select an item',
      searchChoices: true,
    });

    return () => {
      choices.destroy();
    };
  }, []);

  return (
    <select ref={selectRef}>
      <option value="">Select an item</option>
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="cherry">Cherry</option>
      <option value="durian">Durian</option>
      <option value="elderberry">Elderberry</option>
    </select>
  );
}

export default MySelect;
```

---

## React Mobile Picker

![React Mobile Picker Homepage](/assets/image/blog.logrocket.com/best-react-select-component-libraries/react-mobile-picker-homepage.png)

Not a direct alternative to React Select per se, [React Mobile Picker (<VPIcon icon="iconfont icon-github" />`adcentury/react-mobile-picker`)](https://github.com/adcentury/react-mobile-picker) is a lightweight component library that offers a customizable and user-friendly interface for selecting items from a list. It is useful for applications that require users to make selections from options like dates, times, or custom lists. It is inspired by iOS-style select boxes, and it provides a visually appealing and intuitive interface for selecting options.

### React Mobile Picker pros

- Improves user experience on mobile devices with a smooth, intuitive interface
- Allows developers to customize the picker to fit their app design and functionality requirements
- Supports multiple data types, including dates, times, etc.
- Optimized for mobile devices, ensuring consistent user experience across various screen sizes and orientations
- Provides APIs and documentation for easy integration into existing codebases
- Minimizes rendering overhead and provides a smooth experience with large datasets

### React Mobile Picker cons

- Introduces additional dependencies, potentially increasing bundle size and impacting performance
- Complex customization requires effort and familiarity with the library’s API
- Has limited community support

### React Mobile Picker usage

Install the library using the following command:

```sh
npm i react-mobile-picker
```

Then, import and use React Mobile Picker as shown below:

```jsx :collapsed-lines
import { useState } from 'react'
import Picker from 'react-mobile-picker'

const selections = {
  title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
  firstName: ['John', 'Micheal', 'Elizabeth'],
  lastName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
}

function MyPicker() {
  const [pickerValue, setPickerValue] = useState({
    title: 'Mr.',
    firstName: 'Micheal',
    lastName: 'Jordan'
  })

  return (
    <Picker value={pickerValue} onChange={setPickerValue}>
      {Object.keys(selections).map(name => (
        <Picker.Column key={name} name={name}>
          {selections[name].map(option => (
            <Picker.Item key={option} value={option}>
              {option}
            </Picker.Item>
          ))}
        </Picker.Column>
      ))}
    </Picker>
  )
}
```

---

## rc-select

![Rc-Select Homepage](/assets/image/blog.logrocket.com/best-react-select-component-libraries/rc-select-homepage.png)

```component VPCard
{
  "title": "@rc-component/select",
  "desc": "React Select Component.",
  "link": "https://select-react-component.vercel.app//",
  "logo": "https://avatars0.githubusercontent.com/u/9441414?s=200&v=4",
  "background": "rgba(144,213,255,0.2)"
}
```

[<VPIcon icon="fas fa-globe"/>rc-select](https://select-react-component.vercel.app/) is a select component library designed for React applications that provides various modes, including single-select, multi-select, tags, etc. It offers cross-browser compatibility with IE11+, Chrome, Firefox, and Safari, and ensures accessibility for all users.

rc-select also allows keyboard navigation, allowing users to open the select menu by focusing or clicking on the input field, and supports `keyDown`, `keyUp`, and `enter` keys for menu navigation, which makes it a popular choice for building advanced React form fields.

### rc-select pros

- Offers extensive customization options for application design
- Provides smooth animations and quick rendering
- Supports keyboard navigation and screen reader compatibility
- Includes advanced features like grouping, filtering, sorting, and custom renders
- Has active community support; regular library updates

### rc-select cons

- Steeper learning curve compared to simpler select components
- Large bundle size of 38.6Kb, which may impact load times

### rc-select usage

Install the library using the following command:

```sh
npm i rc-select
```

Then, import and use rc-select as shown below:

```jsx :collapsed-lines
import React from 'react';
import Select, { Option } from 'rc-select';

const App = () => {
  function onChange(value) {
    console.log(`selected ${value}`);
  }
  return (
      <div>
        <div style={{ height: 150 }} />
        <h2>Single Select</h2>

        <div style={{ width: 300 }}>
          <Select
            allowClear
            placeholder="placeholder"
            defaultValue="lucy"
            style={{ width: '100%' }}
            animation="slide-up"
            showSearch
            onChange={onChange}
            dropdownStyle={{
              width: 'auto',
            }}
          >
            <Option value="jack">
              <b
                style={{
                  color: 'red',
                }}
              >
                jack
              </b>
            </Option>
            <Option value="lucy">lucy</Option>
            <Option value="disabled" disabled>
              disabled
            </Option>
            <Option value="yiminghe">yiminghe</Option>
          </Select>
        </div>
      </div>
  );
};
```

---

## React dropdown select

![React Dropdown Select](/assets/image/blog.logrocket.com/best-react-select-component-libraries/react-dropdown-select_371941.png)

```component VPCard
{
  "title": "React dropdown select on GitHub",
  "desc": "",
  "link": "https://react-dropdown-select.netlify.app",
  "logo": "https://react-dropdown-select.netlify.app/favicon.ico",
  "background": "rgba(0,116,217,0.2)"
}
```

[<VPIcon icon="fas fa-globe"/>React dropdown select](https://react-dropdown-select.netlify.app/) is a lightweight alternative to React Select that provides an easy-to-use and customizable dropdown select and multi-select component for React. It is configurable via props and allows for the total customization of components through render prop callbacks, with access to internal props, state, and methods. It can be styled using CSS or custom components and supports rendering the dropdown outside the local DOM tree using portal support. It also has auto-position functionality and a small bundle size of just 16.7kb.

React dropdown select is perfect for projects requiring a straightforward dropdown select component without the complexity of more feature-rich libraries, while still prioritizing performance.

### React dropdown select pros

- Lightweight and easy to integrate
- Provides a simple API and good accessibility features
- Easy to customize for basic use cases

### React dropdown select cons

- Limited features compared to more complex libraries like React Select
- Lacks advanced functionalities required for complex applications

### React dropdown select usage

Install the library with the following command:

```sh
npm i --save react-dropdown-select
```

Then, import and use the library as shown:

```jsx
import Select from 'react-dropdown-select';

const items = ['Apple', 'Banana', 'Cherry', 'Durian', 'Elderberry'];

function MySelectDropdown() {

  return (
    <Select
      options={items}
      values={[]}
      dropdownHandleRenderer={({ state }) => (
              <span>{state.dropdown ? '–' : '+'}</span>
      )}
      onChange={(value) => console.log(value)}
    />
  )
}
```

---

## Other options: Headless UI (e.g., Mantine, Radix UI, MUI Select)

Some libraries offer headless select components. These components focus on logic and behavior without imposing specific styles, making them suitable for integrating into your existing design systems. Popular options include Mantine, Radix UI, and MUI Select (part of Material-UI).

### Mantine

[**Mantine**](/blog.logrocket.com/build-responsive-themes-components-mantine.md) is a fully-featured library that includes headless components along with pre-styled options. It offers extensive UI components and a high level of customizability.

### Radix UI

[**Radix UI**](/blog.logrocket.com/radix-ui-adoption-guide.md) provides headless components with a focus on accessibility and unstyled design, allowing developers to customize them freely.

### MUI Select

MUI Select is part of the Material UI library, offering a built-in select component that adheres to Google’s Material Design principles.

These headless select components offer highly customizable, fully accessible UI components, allowing for the creation of modern, polished UIs with full control over appearance.

#### Pros

- Flexible and can be easily integrated into any design system
- Take care of the component logic without pre-imposed styles
- Highly accessible, well-maintained, and have a larger community

#### Cons

- Styling these requires more effort compared to using pre-styled libraries
- May be too advanced for simpler projects that don’t need much customization

---

## Comparing the React select component libraries

| Library | Lightweight | Customizable | Advanced features | Accessibility | Ideal use case |
| --- | --- | --- | --- | --- | --- |
| React Select | No | High | High | Good | Feature-rich, customizable selects |
| Choices | Yes | Moderate | Moderate | Good | High performance select component that doesn’t require extensive customization |
| Downshift | No | Very high | High | Excellent | Custom select components |
| React dropdown select | Yes | Low | Basic | Good | Simple dropdowns with minimal setup |
| React Mobile Picker | Yes | High | Moderate | Good | Select components targeting mobile applications |
| rc-select | No | High | High | Moderate | Feature-rich, customizable selects |
| Headless UI | Yes | Very high | Varies | Excellent | Custom design systems |

---

## Conclusion

In this article, we explored some of the best React select component libraries, including React Select and its alternatives like Downshift, Choices.js, React Mobile Picker, rc-select, and headless UI libraries such as Mantine and Radix UI.

While React Select remains a popular choice because of its rich features, it has limitations in performance with large datasets and customization complexity. Alternatives like Downshift offer more customization, while Choices.js is lightweight and ideal for performance-focused projects. Each library serves specific use cases, making it important to choose the right one based on your project’s needs.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The best React select component libraries",
  "desc": "Explore select libraries in React, including React Select and alternatives like Downshift, Choice.js, and more.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/best-react-select-component-libraries.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
