---
lang: en-US
title: "How to build an inline editable UI in React"
description: "Article(s) > How to build an inline editable UI in React"
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
      content: "Article(s) > How to build an inline editable UI in React"
    - property: og:description
      content: "How to build an inline editable UI in React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-inline-editable-ui-react.html
prev: /programming/js-react/articles/README.md
date: 2022-12-15
isOriginal: false
author:
  - name: Paramanantham Harrison
    url : https://blog.logrocket.com/author/paramananthamharrison/
cover: /assets/image/blog.logrocket.com/build-inline-editable-ui-react/banner.png
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
  name="How to build an inline editable UI in React"
  desc="Explore several React inline editable UI libraries, then create an inline editing component from scratch in React."
  url="https://blog.logrocket.com/build-inline-editable-ui-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/build-inline-editable-ui-react/banner.png"/>

::: note Editor’s note

This article was last updated on 15 December 2022 to include information about TanStack Table v8 and Ag Grid, as well as to reflect updates to the react-easy-edit and `react-editext` libraries.

:::

![React Inline Editable UI](/assets/image/blog.logrocket.com/build-inline-editable-ui-react/banner.png)

As React client-side UI libraries become increasingly powerful, user interfaces become more complex. Nowadays, we can create even more exciting user experiences by experimenting with React inline editable UI components, like editable tables, lists, and text fields.

Below is an example of a basic React inline editable UI:

![React Basic Inline Editable UI Example](/assets/image/blog.logrocket.com/build-inline-editable-ui-react/react-basic-inline-editable-ui-example.gif)

In this tutorial, we’ll build basic, inline editable UI components in React using a simplified version of the [<VPIcon icon="fas fa-globe"/>Asana Create a task](https://developers.asana.com/docs/get-a-task) function. Our editable UI will have only a task name and a description field.

Feel free to check out the [<VPIcon icon="fas fa-globe"/>demo of the React editable UI](https://logrocket-inline-edit.netlify.app) we’ll build in this walkthrough. Let’s get started! 

---

## Popular inline editable UI tools

First, let’s review some of the most prominent products that use an inline editable UI with a clear UX.

- [<VPIcon icon="fas fa-globe"/>Asana](https://asana.com): One of the best custom UIs with inline editable tables and forms
- [<VPIcon icon="fa-brands fa-jira"/>Jira](https://atlassian.com/software/jira): Offers custom inline editing functionality for fields. Here’s a [<VPIcon icon="fa-brands fa-atlassian"/>design example](https://atlassian.design/components/inline-edit/examples) from the Jira design system
- [<VPIcon icon="fa-brands fa-trello"/>Trello](https://trello.com/en): You can edit a Trello card by simply clicking on it
- [<VPIcon icon="iconfont icon-airtable"/>Airtable](https://airtable.com/lp/campaign/brand) and [<VPIcon icon="iconfont icon-notion"/>Notion](https://notion.so/product) are modern apps that use inline editable UI elements
- [<VPIcon icon="iconfont icon-googledocs"/>Google Sheets](https://google.com/sheets/about/): Offers an inline editable smart table UI for the web

![Google Sheets UI](/assets/image/blog.logrocket.com/build-inline-editable-ui-react/google-sheets-ui.webp)

---

## React inline editable UI component libraries

Before getting started with our custom implementation of inline editable components, let’s consider some of the existing React component libraries that you can use to achieve various inline editable UI elements.

### <VPIcon icon="iconfont icon-json"/>`giorgosart/react-easy-edit`

The [<VPIcon icon="iconfont icon-json"/>`giorgosart/react-easy-edit`](https://github.com/giorgosart/react-easy-edit) library allows for inline editing on HTML 5 input components, meaning you can customize the styling and functionality on top of the react-easy-edit library. Below is a simple example using the `textbox` component:

```jsx title="App.jsx"
import React, { Component } from 'react';
import EasyEdit from 'react-easy-edit';

function App() {
  const save = (value) => {alert(value)}
  const cancel = () => {alert("Cancelled")}

  return (
    <EasyEdit
      type="text"
      onSave={save}
      onCancel={cancel}
      saveButtonLabel="Save Me"
      cancelButtonLabel="Cancel Me"
      attributes={{ name: "awesome-input", id: 1}}
      instructions="Star this repo!"
    />
  );
}
```

You can check out more examples on [<VPIcon icon="iconfont icon-stackblitz"/>Stackblitz](https://stackblitz.com/edit/react-pun7mm?file=src/App.js).

### Atlassian

[<VPIcon icon="fa-brands fa-atlassian"/>Atlassian](https://atlassian.com), the team that built Jira, has a design system with [<VPIcon icon="fa-brands fa-npm"/>`@atlaskit/inline-edit`](https://npmjs.com/package/@atlaskit/inline-edit) functionality. Although it depends on the Atlassian design system, it’s a solid library that you can consider if your application requires a reliable feature.

### <VPIcon icon="iconfont icon-github"/>`alioguzhan/react-editext`

[<VPIcon icon="iconfont icon-github"/>`alioguzhan/react-editext`](https://github.com/alioguzhan/react-editext) is an inline editing library that converts the `textarea` element into editable content. Below is a simple example of react-editext:

```jsx title="App.jsx"
import React, { Component } from 'react'
import EdiText from 'react-editext'

export default class App extends Component {
  onSave = val => {
    console.log('Edited Value -> ', val)
  }

  render () {
    return (
      <EdiText
        type='text'
        value='What is real? How do you define real?'
        onSave={this.onSave}
      />
    )
  }
}
```

react-editext also allows you to [**style `EdiText` with styled-components**](/blog.logrocket.com/benefits-using-styled-components-react.md). To better understand it, you can refer to the [<VPIcon icon="iconfont icon-stackblitz"/>example from Stackblitz](https://stackblitz.com/edit/react-aawg51?file=src%2FApp.js).

### <VPIcon icon="iconfont icon-github"/>`lovasoa/react-contenteditable`

[<VPIcon icon="iconfont icon-github"/>`lovasoa/react-contenteditable`](https://github.com/lovasoa/react-contenteditable) is arguably the most famous package for inline editable UI. The main difference between react-contenteditable and other component libraries is that it allows you to inline edit HTML, not just text content.

You can use react-contenteditable to edit both markup and markdown in the UI. You can also manage the height of the editable element to customize the look and feel of an input or a `textarea` element. Feel free to check out an [<VPIcon icon="iconfont icon-stackblitz"/>example on Stackblitz](https://stackblitz.com/edit/react-2aq9zw?file=src%2FApp.js).

### React Table

[React Table (<VPIcon icon="iconfont icon-github"/>`tanstack/table`)](https://github.com/tanstack/table/tree/v7) is one of the most popular UI libraries that allows you to build tables and data grids with the inline editable feature. You can create a UI that is similar to Google Sheets by customizing React Table library components.

In March 2020, React Table creator Tanner Linsley released React Table, which he described as “the culmination of over a years worth of work to refactor the entire library to a hooks-only UI/Style/Markup agnostic table building utility.” In July 2022, [TanStack Table v8 (<VPIcon icon="fa-brands fa-x-twitter"/>`tannerlinsley`)](https://x.com/tannerlinsley/status/1542925072502968320) was released, which [includes a full rewrite to TypeScript (<VPIcon icon="iconfont icon-github"/>`TanStack/table`)](https://github.com/TanStack/table). However, at the time of writing, the migration guide is not yet available.

For a closer look at what’s new in the most [recent stable React Table release (<VPIcon icon="iconfont icon-github"/>`TanStack/table`)](https://github.com/TanStack/table/releases), check out our comprehensive guide to [**building and stying tables with React Table v7**](/blog.logrocket.com/building-styling-tables-react-table-v7/README.md). Or, read on to learn how to render your own [**React table component with React Table**](/blog.logrocket.com/complete-guide-building-smart-data-table-react.md#reacttableexample). You can also check out the [<VPIcon icon="iconfont icon-stackblitz"/>React Table kitchen sink](https://stackblitz.com/edit/vitejs-vite-daemts?file=src/App.tsx) to see how this editable UI works in the table layout.

### Ag Grid

[<VPIcon icon="fas fa-globe"/>Ag Grid](https://ag-grid.com/) is another popular library for building data grids with inline editable functionality. Libraries like [<VPIcon icon="fa-brands fa-npm"/>`ag-grid-react`](https://npmjs.com/package/ag-grid-react) and React Table help us to build a data grid to visualize a large amount of data in a table structure. Inline editing is one of the functionalities included in it.

Below is a basic implementation of `ag-grid-react`:

```jsx
import { AgGridReact } from "ag-grid-react";

return (
  <AgGridReact
   rowData={mockTransactionData()}
   columnDefs={mockTransactionDataColumns()}
 />
);
```

You can check out the complete example on [<VPIcon icon="iconfont icon-stackblitz"/>Stackblitz](https://stackblitz.com/edit/react-ts-xu5kqm?file=App.tsx).

---

## How does an editable UI work?

Now that we’re familiar with some helpful component libraries, let’s explore how an editable UI works.

First, an editable UI displays a label. On hover, it will show the borders, making the UI look inline and editable. On click, it will transform the simple label into a custom input element. Some notable input elements are input fields, `textarea`, `select` components, date pickers, etc.

By clicking <kbd>Enter</kbd> or <kbd>Escape</kbd>, we’ll go back to the initial state and show the label. If you click <kbd>Tab</kbd>, it will once again switch to an input element and make the component accessible using the keyboard.

In this tutorial, we’ll build a simple version without the `Tab` functionality. You can easily add the `Tab` functionality, but I’ll leave that up to you. Feel free to create a [pull request to my repo (<VPIcon icon="iconfont icon-github"/>`learnwithparam/logrocket-inline-edit-ui`)](https://github.com/learnwithparam/logrocket-inline-edit-ui).

---

## Build a simple React component for editable UI

First, we’ll create a simple React app using Create React App. I’m using Tailwind CSS for styling. For more information, check out our article on [**Using Tailwind CSS in React to configure Create React App**](/blog.logrocket.com/create-react-app-and-tailwindcss.md).

Now, let’s create the `Editable` React component with the following code:

```jsx :collapsed-lines title="Editable.js"
import React, { useState } from "react";

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({
  text,
  type,
  placeholder,
  children,
  ...props
}) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  // Exercise: It can be made dynamic by accepting initial state as props outside the component 
  const [isEditing, setEditing] = useState(false);

  // Event handler while pressing any key while editing
  const handleKeyDown = (event, type) => {
    // Handle when key is pressed
  };

/*
- It will display a label is `isEditing` is false
- It will display the children (input or textarea) if `isEditing` is true
- when input `onBlur`, we will set the default non edit mode
Note: For simplicity purpose, I removed all the classnames, you can check the repo for CSS styles
*/
  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
        >
          <span>
            {text || placeholder || "Editable content"}
          </span>
        </div>
      )}
    </section>
  );
};

export default Editable;
```

The component is very straightforward. If the `isEditing` state is `true`, then it displays the children. Here, we pass the `input` or `textarea` elements. The input state will be managed outside of this component.

If the `isEditing` state is `false`, we display the simple label `text` or `placeholder`, depending on whether the text value is empty.

Let’s see what a simple input editable component looks like:

```jsx :collapsed-lines title="App.js"
// Input editable UI

import React, { useState } from "react";
import Editable from "./Editable";

function App() {
  // State for the input
  const [task, setTask] = useState("");

  /*
    Enclose the input element as the children to the Editable component to make it as inline editable.
  */
  return (
    <Editable
      text={task}
      placeholder="Write a task name"
      type="input"
    >
      <input
        type="text"
        name="task"
        placeholder="Write a task name"
        value={task}
        onChange={e => setTask(e.target.value)}
      />
    </Editable>
  );
}

export default App;
```

In the code above, we enclosed `input` inside of the `Editable` component. You can enclose any custom form component to make it an editable UI.

This example is pretty simple. If you want to create a more complex example for an editable UI, you can create higher order components or custom Hooks to manage all of the states outside the editable component.

Let’s see how the editable component works for a `textarea`:

```jsx
<Editable
  text={description}
  placeholder="Description for the task"
  type="textarea"
>
  <textarea
    name="description"
    placeholder="Description for the task"
    rows="5"
    value={description}
    onChange={e => setDescription(e.target.value)}
  />
</Editable&gt
```

It’s that simple. We just swapped the input element with a `textarea`. As long as we provide the proper CSS based on the type we pass the `Editable` component, it will work.

However, we’ll run into a few problems:

- When we click on the label, it won’t auto-focus on the input element
- A simple form can be navigated using the `Tab` key. However, an inline editable UI can’t be navigated without manually implementing that functionality

### Solving the focus issue

To solve the focus issue, we need to use a reference to the input element and focus it when the edit state is set:

```jsx :collapsed-lines title="App.js"
import React, { useRef, useState } from "react";
import Editable from "./Editable";

function App() {
  /* 
    1. create a reference using use reference and add the ref={inputRef} to input element
    2. pass this reference to the Editable component, use different name than ref, I used `childRef`. Its basically a normal prop carrying the input element reference.
  */
  const inputRef = useRef();
  const [task, setTask] = useState("");

  return (
    <Editable
      text={task}
      placeholder="Write a task name"
      childRef={inputRef}
      type="input"
    >
      <input
        ref={inputRef}
        type="text"
        name="task"
        placeholder="Write a task name"
        value={task}
        onChange={e => setTask(e.target.value)}
      />
    </Editable>
  );
}
export default App;
```

Next, we’ll pass the input element reference to the `Editable` component, then focus when the `isEditing` state is `true`:

```jsx title="Editable.js"
import React, { useState, useEffect } from "react";
import "./Editable.css";

const Editable = ({ childRef, ... }) => {
  const [isEditing, setEditing] = useState(false);

  /* 
   * using use effect, when isEditing state is changing, check whether it is set to true, if true, then focus on the reference element
   */ 
  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event, type) => {
    // ...
  };

  return (
    // ...
  )
};

export default Editable;
```

### Glitches with keydown events

There are a few things to be aware of when dealing with keydown events. The input element’s keys, including <kbd>Enter</kbd>, <kbd>Escape</kbd>, and <kbd>Tab</kbd> will set the `isEditing` state to `false`.

For the `textarea` element, the <kbd>Enter</kbd> key has to add a new line inside of `textarea`, so we need to handle this use case separately:

```jsx
const handleKeyDown = (event, type) => {
  const { key } = event;
  const keys = ["Escape", "Tab"];
  const enterKey = "Enter";
  const allKeys = [...keys, enterKey]; // All keys array

  /* 
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
  */
  if (
    (type === "textarea" && keys.indexOf(key) > -1) ||
    (type !== "textarea" && allKeys.indexOf(key) > -1)
  ) {
    setEditing(false);
  }
}:
```

---

## Accessibility for forms with <kbd>Tab</kbd> key navigation

By default, input and `textarea` are hidden. As a result, we can’t navigate the form fields by just hitting the <kbd>Tab</kbd> key.

To achieve keyboard support, we need to monitor the <kbd>Tab</kbd> key event on the component or the whole page and set the state manually to each element. Then, we can navigate to the next form element on the next keypress.

We didn’t implement this in our example code, but it’s worth a try to make sure you can handle keypress events on a page in React.

---

## When to use React inline editable UI

You don’t need an inline editable UI for basic form needs. However, it’s best to build both view and edit in a single place for complex React applications where you have lots of content with edit options. If you don’t, you’ll have to maintain two different UIs.

---

## Limitations of inline editable UI in React

The most significant challenges you may run into in inline editable UI involve showing errors. It would be best to account for this when thinking about the UX.

You may also have difficulty achieving the accessibility necessary to support mouse events. Touch events will likely also be an issue.

Finally, supporting mobile devices can be hard when form elements are hidden. This will be especially tricky if the UI has to support a mobile layout because there is no hover to show users whether the field is editable inline on touch screens.

---

## Conclusion

This is a simple example and overview of creating inline editable components in React. Try to use existing components, but if none fit your needs, you can create custom ones. You can check out the demo [<VPIcon icon="fas fa-globe"/>here](https://logrocket-inline-edit.netlify.com/) and the codebase [here (<VPIcon icon="iconfont icon-github"/>`learnwithparam/logrocket-inline-edit-ui`)](https://github.com/learnwithparam/logrocket-inline-edit-ui). Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to build an inline editable UI in React",
  "desc": "Explore several React inline editable UI libraries, then create an inline editing component from scratch in React.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/build-inline-editable-ui-react.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
