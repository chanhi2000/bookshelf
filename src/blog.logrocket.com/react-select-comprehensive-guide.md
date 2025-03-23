---
lang: en-US
title: "React Select: A comprehensive guide"
description: "Article(s) > React Select: A comprehensive guide"
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
      content: "Article(s) > React Select: A comprehensive guide"
    - property: og:description
      content: "React Select: A comprehensive guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-select-comprehensive-guide.html
prev: /programming/js-react/articles/README.md
date: 2025-03-03
isOriginal: false
author:
  - name: Stephen Afam-Osemene
    url : https://blog.logrocket.com/author/stephenafamosemene/
cover: /assets/image/blog.logrocket.com/react-select-comprehensive-guide/banner.png
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
  name="React Select: A comprehensive guide"
  desc="React Select offers customization, styling, async data loading, accessibility, and more to build powerful, user-friendly dropdowns in React."
  url="https://blog.logrocket.com/react-select-comprehensive-guide"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/react-select-comprehensive-guide/banner.png"/>

React Select is an open source select control created by Jed Watson with and for React. It was inspired by the shortcomings of the native HTML select control. It offers well-designed and battle-tested components and APIs that help you build powerful yet customizable select components. Some of its features include:

- **Autocomplete**: Search as you type
- **Single and multi-select**: Select one or multiple options
- **Keyboard and touch support**: Navigate with the keyboard or touch to operate
- **Asynchronous options**: Load dynamic options on demand

![React Select: A Comprehensive Guide](/assets/image/blog.logrocket.com/react-select-comprehensive-guide/banner.png)

In this tutorial, we’ll walk through how to install, use, and customize React Select for modern React projects. We’ll also dive into various configuration options to tailor the component to our specific needs.

If you’re using an older version, you should upgrade using the [<FontIcon icon="fa-brands fa-react"/>upgrade guide](https://react-select.com/upgrade#upgrade-guide). You can also check out [<FontIcon icon="fa-brands fa-youtube"/>our video tutorial on React Select](https://youtu.be/n02t9wvd6hs).

<VidStack src="youtube/n02t9wvd6hs" />

::: note Editor’s note

This article was last updated by [<FontIcon icon="fas fa-globe"/>Nelson Michael](https://blog.logrocket.com/author/nelsonmichael/) in March 2025.

:::

---

## Why choose React Select?

The native HTML `<select>` element has several limitations:

- Limited styling options: The native element is difficult to style consistently across browsers
- No built-in search functionality
- Basic keyboard navigation: While the native `<select>` does support keyboard navigation, its functionality is basic and less customizable.
- No support for asynchronous options

React Select addresses these limitations while providing:

- Rich searching and filtering
- Customizable styling and theming
- Advanced keyboard navigation
- Async data loading
- Accessible by default
- Typescript support

---

## How to install and set up React Select in your React project

React Select works with any React framework. To install the `react-select` package, run either one of the following commands in your terminal:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add react-select
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i react-select
# OR
pnpm install react-select
```

:::

Using React Select is as easy as adding the canonical `Select` component and passing it some vital props such as `options`, `onChange`, and `defaultValue`:

```tsx
import Select from 'react-select';
import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

const options: Array<Option> = [
  { value: 'blues', label: 'Blues' },
  { value: 'rock', label: 'Rock' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'orchestra', label: 'Orchestra' }
];

export default function MusicGenreSelect() {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  return (
    <Select<Option>
      value={selectedOption}
      onChange={(option) => setSelectedOption(option)}
      options={options}
      isClearable
      isSearchable
      placeholder="Select a music genre..."
      aria-label="Music genre selector"
    />
  );
}
```

In the code snippet above, the select options are defined as music genres and passed into the `Select` component as props. `defaultValue` and `onChange` are wired to the stateful value `selectedOption` and its updater function, `setSelectedOption`. The result is a simple `Select` component:

![React Select Element Music Genre Example](https://blog.logrocket.com/wp-content/uploads/2022/12/react-select-element-music-genre-example.webp)

[<FontIcon icon="fas fa-globe"/>Props are essential to how React Select works](https://react-select.com/props). They are also essential to customizing it. Apart from the props we passed in our first example, here are some common props you can pass to the `Select` component:

```tsx
/**
 * @props placeholder: Defines the text displayed in the text input
 * @props className: Sets a className attribute on the outer or root component
 * @props classNamePrefix: If provided, all inner components will be given a prefixed className attribute
 * @props autoFocus: Focuses the control when it is mounted
 * @props isMulti: Supports multiple selected options
 * @props noOptionsMessage: Text to display when there are no options found
 * @props menuIsOpen: Opens the dropdown menu by default
 * @props isLoading: Useful for async operations. For example, to indicate a loading state during a search
*/
<Select
  {...props}
  placeholder="Select music genre"
  className="adebiyi"
  classNamePrefix="logrocket"
  autoFocus
  isMulti
  noOptionsMessage={({ inputValue }) => `No result found for "${inputValue}"`}
/>
```

---

## How to enable multi-select dropdowns in React Select

React Select can be configured to allow multiple options to be selected in a single `Select` component. This can be achieved by toggling on the `isMulti` prop on the `Select` component:

```tsx :collapsed-lines title="App.tsx"
import Select, { MultiValue } from "react-select";
import { useState } from "react";

const options = [
  { value: "blues", label: "Blues" },
  { value: "rock", label: "Rock" },
  { value: "jazz", label: "Jazz" },
  { value: "orchestra", label: "Orchestra" },
];

export default function App() {
  // We now have multiple options. Basically, an array of options.
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);

  return (
    <div>
      <Select
        defaultValue={selectedOptions}
        onChange={setSelectedOptions}
        options={options}
        isMulti
      />
    </div>
  );
}
```

![React Select Multi Option](https://blog.logrocket.com/wp-content/uploads/2022/12/react-select-multi-option.webp)

---

## Multi-select with custom styling

You can also do some styling customization on the multi-select dropdown. Here’s how:

```tsx :collapsed-lines
import Select from 'react-select';
import { useState } from 'react';

interface Tag {
  value: string;
  label: string;
  color: string;
}

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    borderColor: state.isFocused ? '#2684FF' : '#ced4da',
    boxShadow: state.isFocused ? '0 0 0 1px #2684FF' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#2684FF' : '#a1a7ae'
    }
  }),
  multiValue: (base: any, { data }: any) => ({
    ...base,
    backgroundColor: data.color,
    color: '#fff'
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: 'inherit'
  })
};

function TagSelector() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const options: Tag[] = [
    { value: 'react', label: 'React', color: '#61dafb' },
    { value: 'typescript', label: 'TypeScript', color: '#3178c6' },
    { value: 'javascript', label: 'JavaScript', color: '#f7df1e' }
  ];

  return (
    <Select<Tag, true>
      isMulti
      options={options}
      value={selectedTags}
      onChange={(newValue) => setSelectedTags(newValue as Tag[])}
      styles={customStyles}
      placeholder="Select tags..."
      closeMenuOnSelect={false}
    />
  );
}
```

---

## Handling async data in React Select

React Select’s `options` props can be static and preselected, as shown in previous examples. They can also be dynamic and asynchronous; that is, generated on demand from an API or a database query. For this use case, React Select offers the `Async` component from `react-select/async`:

```tsx :collapsed-lines title="UserSelect.tsx"
import AsyncSelect from 'react-select/async';
import { useState } from 'react';

interface User {
  value: string;
  label: string;
}

function UserSelect() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadOptions = async (inputValue: string) => {
    try {
      const response = await fetch(
        `https://api.example.com/users?search=${inputValue}`
      );
      const data = await response.json();

      return data.map((user: any) => ({
        value: user.id,
        label: user.name
      }));
    } catch (error) {
      console.error('Error loading options:', error);
      return [];
    }
  };

  return (
    <AsyncSelect<User>
      value={selectedUser}
      loadOptions={loadOptions}
      onChange={setSelectedUser}
      isSearchable
      placeholder="Search users..."
      loadingMessage={() => "Searching..."}
      noOptionsMessage={({ inputValue }) => 
        inputValue ? `No users found for "${inputValue}"` : "Start typing to search..."
      }
    />
  );
}
```

The `Async` component extends the `Select` component with asynchronous features like loading state.

The `loadOptions` prop is an async function or a promise that exposes the search text (input value) and a callback that is automatically called once the input value changes.

The `Async` component includes provision for helpful props like:

```plaintext
cacheOptions: Caching fetched options
defaultOptions: Set default options before the remote options are loaded
```

Another component that may come in handy is the [<FontIcon icon="fas fa-globe"/>Fixed Options](https://react-select.com/home#fixed-options) component, which makes it possible to have fixed options.

---

## Fixed Options

In some scenarios, you might want certain selections to remain permanent in a multi-select dropdown — these are “fixed” options that users should not be able to remove.

In this example, we use React Select’s customization capabilities to style these fixed options distinctively and enforce their permanence through our change handler logic. Here’s an example from the docs:

```tsx :collapsed-lines title="FixedOptionsExample.tsx"
import React, { useState } from 'react';
import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';
import { ColourOption, colourOptions } from '../data';

// Custom styles to visually differentiate fixed options
const customStyles: StylesConfig<ColourOption, true> = {
  multiValue: (base, state) =>
    state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base,
  multiValueLabel: (base, state) =>
    state.data.isFixed
      ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
      : base,
  multiValueRemove: (base, state) =>
    state.data.isFixed ? { ...base, display: 'none' } : base,
};

// Helper function to always position fixed options before non-fixed ones
const orderOptions = (values: readonly ColourOption[]): readonly ColourOption[] => {
  return values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed));
};

export default function FixedOptionsExample() {
  // Initialize with a set of fixed and non-fixed options
  const [selectedOptions, setSelectedOptions] = useState<readonly ColourOption[]>(
    orderOptions([colourOptions[0], colourOptions[1], colourOptions[3]])
  );

  // Custom change handler to prevent removal of fixed options
  const handleChange = (
    newValue: OnChangeValue<ColourOption, true>,
    actionMeta: ActionMeta<ColourOption>
  ) => {
    switch (actionMeta.action) {
      case 'remove-value':
      case 'pop-value':
        // Prevent removal if the option is fixed
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        // When clearing the selection, preserve only fixed options
        newValue = colourOptions.filter(v => v.isFixed);
        break;
    }
    // Reorder options to always show fixed ones first
    setSelectedOptions(orderOptions(newValue));
  };

  return (
    <Select
      value={selectedOptions}
      isMulti
      styles={customStyles}
      isClearable={selectedOptions.some(v => !v.isFixed)}
      name="colors"
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleChange}
      options={colourOptions}
    />
  );
}
```

---

## Creating new options in React Select with the `Creatable` component

Typically, there is a dead end when there are no options after a search. However, you can choose to let users create a new option. For this use case, React Select offers the `Creatable` component for static options and `AsyncCreatable` components for dynamic options.

Using `Creatable` is the same as using `Select`:

```tsx :collapsed-lines title="App.tsx"
import Creatable from "react-select/creatable";
import { useState } from "react";

const musicGenres = [
  { value: "blues", label: "Blues" },
  { value: "rock", label: "Rock" },
  { value: "jazz", label: "Jazz" },
  { value: "orchestra", label: "Orchestra" },
];

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div style={{ marginBlockEnd: "1rem", display: "flex" }}>
        <span>Selected option:</span>
        <pre> {JSON.stringify(selectedOption)} </pre>
      </div>
      <Creatable options={musicGenres} onChange={setSelectedOption} isMulti />
    </>
  );
}
```

![Form For Selecting Music Genre](https://blog.logrocket.com/wp-content/uploads/2025/03/selecting-music-genre.webp)

And using `AsyncCreatable` is the same as using `Async`:

```tsx :collapsed-lines title="App.tsx"
import AsyncCreatable from "react-select/async-creatable";
import { useState } from "react";

const musicGenres = [
  { value: "blues", label: "Blues" },
  { value: "rock", label: "Rock" },
  { value: "jazz", label: "Jazz" },
  { value: "orchestra", label: "Orchestra" },
];

function filterMusicGenre(inputValue) {
  return musicGenres.filter((musicGenre) => {
    const regex = new RegExp(inputValue, "gi");
    return musicGenre.label.match(regex);
  });
}

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      <AsyncCreatable
        loadOptions={(inputValue, callback) =>
          setTimeout(() => callback(filterMusicGenre(inputValue)), 1000)
        }
        onChange={setSelectedOption}
        isMulti
        isClearable
      />
    </>
  );
}
```

---

## Form integration with React Select

Integrating React Select with [**React Hook Form**](/blog.logrocket.com/react-hook-form-complete-guide.md) simplifies managing form state and validation. The example below shows how to use the `Controller` component from React Hook Form to integrate a React Select component seamlessly into your form:

```tsx :collapsed-linees title="FormSelect.tsx"
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

interface Option {
  value: string;
  label: string;
}

interface FormData {
  category: Option | null;
}

const options: Option[] = [
  { value: 'news', label: 'News' },
  { value: 'sports', label: 'Sports' },
  { value: 'entertainment', label: 'Entertainment' }
];

function FormSelect() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data.category);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="category"
        control={control}
        rules={{ required: 'Please select a category' }}
        render={({ field, fieldState: { error } }) => (
          <div>
            <Select
              {...field}
              options={options}
              isClearable
              placeholder="Select a category..."
            />
            {error && <span className="error">{error.message}</span>}
          </div>
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## Performance optimization

For large datasets or frequent updates, optimizing React Select’s performance is crucial. This example demonstrates how to use memoization with [**`useMemo` and `useCallback`**](/blog.logrocket.com/react-usememo-vs-usecallback.md) to ensure that expensive operations and custom filtering are executed efficiently:

```tsx :collapsed-lines title="OptimizedSelect.tsx"
import React, { useMemo, useCallback } from 'react';
import Select from 'react-select';

function generateLargeOptionsList() {
  // Example: generate a list of options dynamically
  return Array.from({ length: 1000 }, (_, i) => ({
    value: `option-${i}`,
    label: `Option ${i}`
  }));
}

function CustomOption(props: any) {
  // Custom option component logic
  return <div {...props.innerProps}>{props.data.label}</div>;
}

function CustomMultiValue(props: any) {
  // Custom multi-value component logic
  return <div {...props.innerProps}>{props.data.label}</div>;
}

function OptimizedSelect() {
  const options = useMemo(() => generateLargeOptionsList(), []);

  const filterOptions = useCallback((inputValue: string) => {
    return options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [options]);

  const customComponents = useMemo(() => ({
    Option: CustomOption,
    MultiValue: CustomMultiValue
  }), []);

  return (
    <Select
      options={options}
      filterOption={filterOptions}
      components={customComponents}
      isSearchable
      isClearable
    />
  );
}
```

---

## React Select events

React Select also exposes several events to manage your select components (`Select`, `Async`, etc.). You’ve seen `onChange` and `autoFocus`. Some others include:

```tsx
onBlur
onMenuOpen
onMenuClose
onInputChange
onMenuScrollToBottom
onMenuScrollToTop
```

These events are describable by name and are fairly straightforward to understand. For example, you could use `onBlur` to validate the select component. Additionally, if you have a long list of options, you can detect when the menu is scrolled to the bottom or top using `onMenuScrollToBottom` and `onMenuScrollToTop`.

Each of these events will expose the event to the callback function as in the case of `onBlur` in the code snippet below:

```tsx
<Select
  {...props}
  onMenuOpen={() => console.log("Menu is open")}
  onMenuClose={() => console.log("Menu is close")}
  onBlur={(e) => console.log(e)}
  onMenuScrollToBottom={() =>
    console.log("Menu was scrolled to the bottom.")
  }
/>
```

---

## Styling React Select components

The `Select` component is composed of other child components, each with base styles that can be extended or overridden distinctly. These are [<FontIcon icon="fas fa-globe"/>components](https://react-select.com/styles#inner-components) like `control`, `placeholder`, `options`, `noOptionsMessage`, etc:

![Add Custom Styles React Select](https://blog.logrocket.com/wp-content/uploads/2025/03/add-custom-styles-react-select.png)

There are three APIs for styling these components: the `styles` prop, the `classNames` prop, and the `classNamePrefix` prop.

### The `styles` prop

You can pass an object of callback functions to the `styles` prop. Each callback function represents a child component of `Select`, and automatically exposes the corresponding base or default styling and state.

::: note N.B.

you don’t have to expressly name the function arguments `defaultStyles` and `state`.

:::

```tsx :collapsed-lines title="App.tsx"
import Select from "react-select";
import { useState } from "react";

const options = [
  { value: "blues", label: "Blues" },
  { value: "rock", label: "Rock" },
  { value: "jazz", label: "Jazz" },
  { value: "orchestra", label: "Orchestra" },
];

const customStyles = {
  option: (defaultStyles, state) => ({
    // You can log the defaultStyles and state for inspection
    // You don't need to spread the defaultStyles
    ...defaultStyles,
    color: state.isSelected ? "#212529" : "#fff",
    backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
  }),

  control: (defaultStyles) => ({
    ...defaultStyles,
    // Notice how these are all CSS properties
    backgroundColor: "#212529",
    padding: "10px",
    border: "none",
    boxShadow: "none",
  }),
  singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
};

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        styles={customStyles}
      />
    </div>
  );
}
```

In the code below, the `Select` component has been styled to have a dark appearance using the `control`, `option`, and `singleValue` child components. Here is the result:

![Select Component Dark Mode](https://blog.logrocket.com/wp-content/uploads/2022/12/select-component-dark-mode.png)

### The `classNames` prop

With the `classNames` props, you can add class names to each child component like so:

```tsx
<Select
  {...props}
  classNames={{
    control: (state) =>
      `border ${state.isFocused ? "border-red-800" : "border-red-400"}`,
    option: () => "menu-item",
  }}
/>
```

In the code snippet above, the `control` component’s border is styled with respective class names based on the `isFocused` state of the `Select` component. This is typically how you’d use Tailwind CSS with React Select.

### The `classNamePrefix` prop

While the `className` prop is used to apply a class name on the root element of the `Select` component, the `classNamePrefix` is used to namespace every child component:

```tsx
<Select
  defaultValue={selectedOption}
  onChange={setSelectedOption}
  options={options}
  className="for-root-component"
  classNamePrefix="for-child-components"
/>
```

The code snippet above, with `className` and `classNamePrefix`, will generate a DOM structure similar to this:

```tsx
<div class="for-root-component react-select-container">
  <div class="for-child-components__control">
    <div class="for-child-components__value-container">...</div>
    <div class="for-child-components__indicators">...</div>
  </div>
  <div class="for-child-components__menu">
    <div class="for-child-components__menu-list">
      <div class="for-child-components__option">...</div>
    </div>
  </div>
</div>
```

You can then target each distinct class name property for styling, for example, in a `.css` file.

### The `unstyled` prop

If you need to completely restyle the `Select` component, you can apply the `unstyled` prop to strip it clean to only the essentials, like so:

```tsx
<Select
  {...props}
  unstyled
/>
```

Then you can use one of the three styling APIs mentioned above to restyle `Select`:

```tsx
<Select props
```

If you use either one of the `styles` or `classNames` APIs, you can get access to any custom prop you pass to the `Select` component through the `state` argument, like so:

```tsx
<Select
  {...props}
  customProps={true} // You can pass a custom prop...
  styles={{
    control: (defaultStyles, state) => {
      // ...then access the props through `selectProps`
      // You can use it to style the component
      console.log(state.selectProps["customProps"]);
      return {
        ...defaultStyles,
        color: state.isSelected ? "#212529" : "#fff",
        backgroundColor: state.isSelected ? "#a0a0a0" : "#212529",
      };
    },
  }}
/>
```

Effectively styling the `Select` requires that you know the [<FontIcon icon="fas fa-globe"/>component(s)](https://react-select.com/components) you intend to style and choose one of the styling APIs above to achieve your goal. If you break a component down for your bare metal needs, let [<FontIcon icon="fas fa-globe"/>cx and custom components](https://react-select.com/styles#cx-and-custom-components) be your styling guide.

---

## Conclusion

React Select is a powerful component that can significantly enhance your application’s user experience. By following this guide and implementing the examples above, you can create accessible, performant, and feature-rich select components that meet modern web application requirements.

For more advanced use cases and detailed API documentation, visit the [<FontIcon icon="fas fa-globe"/>official React Select documentation](https://react-select.com/home). If you’re evaluating different select libraries for your project, check out our guide to the [**best React Select component libraries**](/blog.logrocket.com/best-react-select-component-libraries.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "React Select: A comprehensive guide",
  "desc": "React Select offers customization, styling, async data loading, accessibility, and more to build powerful, user-friendly dropdowns in React.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/react-select-comprehensive-guide.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
