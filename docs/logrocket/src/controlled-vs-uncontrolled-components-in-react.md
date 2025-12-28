---
lang: en-US
title: "Controlled vs. uncontrolled components in React"
description: "Article(s) > Controlled vs. uncontrolled components in React"
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
      content: "Article(s) > Controlled vs. uncontrolled components in React"
    - property: og:description
      content: "Controlled vs. uncontrolled components in React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/controlled-vs-uncontrolled-components-in-react.html
prev: /programming/js-react/articles/README.md
date: 2021-09-29
isOriginal: false
author:
  - name: Chidume Nnamdi
    url : https://blog.logrocket.com/author/chidumennamdi/
cover: /assets/image/blog.logrocket.com/controlled-vs-uncontrolled-components-in-react/banner.png
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
  name="Controlled vs. uncontrolled components in React"
  desc="In this tutorial, we’ll explain the difference between controlled and uncontrolled components in React with practical examples."
  url="https://blog.logrocket.com/controlled-vs-uncontrolled-components-in-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/controlled-vs-uncontrolled-components-in-react/banner.png"/>

The `form` is one of the most-used HTML elements in web development. Since the introduction of React, the way forms have been handled has changed in many ways.

![Controlled vs. Uncontrolled Components in React](/assets/image/blog.logrocket.com/controlled-vs-uncontrolled-components-in-react/banner.png)

In React, there are two ways to handle form data in our components. The first way is by using the state within the component to handle the form data. This is called a controlled component. The second way is to let the DOM handle the form data by itself in the component. This is known as an uncontrolled component.

In this tutorial, we’ll explain the difference between controlled and uncontrolled components in React. We’ll also demonstrate how each works with practical examples.

---

## What are controlled components in React?

[<VPIcon icon="fas fa-globe"/>Controlled components](https://itnext.io/controlled-vs-uncontrolled-components-in-react-5cd13b2075f9) in React are those in which form data is handled by the component’s state.

[<VPIcon icon="fa-brands fa-react"/>Forms](https://reactjs.org/docs/forms.html#controlled-components) are used to store information in a document section. The information from this form is typically sent to a server to perform an action. This data is held by form input elements and control elements, such as `input`, `select`, `textarea`, etc., which maintain and control their states or values.

What do I mean by that?

Each form element contains a value. The value may be typed (`input`, `textarea`) or selected (`checkbox`, `select`, `radiobutton`, etc) by the user or browser. When the element’s value is changed (triggered by the act of typing or selecting), it is updated accordingly.

You can get the value of an element using the `.value` property in its `HTMLElement` instance. You can also use the `.value` property to set values in the form elements.

Now we can use state in our component to hold or manage the values of the elements in a form element. Here’s an example:

```jsx :collapsed-lines title="App.jsx"
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onSubmit() {
    console.log("Name value: " + name);
    console.log("Email value: " + email);
  }
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
```

Here we have two states: `name` and `email`. These states are assigned to the `value` property of the `name` and `email` input elements.

The `name` state holds the value of the `name` input element. When a value is being typed in the `name` input, the `onChange` event attached to it sets the value of the input to the `name` state using the `setName` updater function.

The `email` state holds the value of the `email` input element. The `onChange` event attached to the `email` input changes the `email` state via `setEmail()` to hold the value typed into the element.

As you can see, the values of our input elements `name` and `email` are controlled by the React state; the state becomes the “single source of truth” for the input elements. Therefore, the `App` component shown above is a controlled component.

The drawback to using controlled components is that the number of states in a component increases as more control elements are added to the form element.

---

## What are uncontrolled components in React?

[<VPIcon icon="fa-brands fa-react"/>Uncontrolled components](https://reactjs.org/docs/uncontrolled-components.html) are those for which the form data is handled by the DOM itself. “Uncontrolled” refers to the fact that these components are not controlled by React state.

The values of the form elements are traditionally controlled by and stored on the DOM. We will have to refer to the instance of the form elements to retrieve their values from the DOM.

```jsx title="App.jsx"
function App() {
  function onSubmit() {
    console.log("Name value: " + window.name.value);
    console.log("Email value: " + window.email.value);
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" id="name" required />
      <input type="email" name="email" id="email" required />
      <input type="submit" value="Submit" />
    </form>
  );
}
```

In the above code, we assigned ID attributes to the `name` and `email` input elements with values `name` and `email`, respectively. We used these `id` attributes to get the value of the input element when the form is being submitted.

The above component is an uncontrolled component because React has no control over the values of the form input elements.

In this example, we used DOM APIs directly. Now let’s refactor the code to do it in a React way:

```jsx title="App.jsx"
function App() {
  const nameRef = useRef();
  const emailRef = useRef();

  function onSubmit() {
    console.log("Name value: " + nameRef.current.value);
    console.log("Email value: " + emailRef.current.value);
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" ref={nameRef} required />
      <input type="email" name="email" ref={emailRef} required />
      <input type="submit" value="Submit" />
    </form>
  );
}
```

We created two [<VPIcon icon="fa-brands fa-react"/>React `refs`](https://reactjs.org/docs/refs-and-the-dom.html), `nameRef` and `emailRef`, and assigned them to the `ref` attributes of `name` and `email` inputs, respectively. This will cause the `refs` to hold the `HTMLElement` instances of the elements in their `.current` property. From `.current`, we can reference the `.value` property to get the values of the input elements.

---

## Controlled vs. uncontrolled components: Key differences

Now that we understand what React controlled and uncontrolled components are, let’s review some key differences between them:

- Controlled components are predictable because the state of the form elements is handled by the component
- Uncontrolled components are not predictable because, during the lifecycle of a component, the form elements can lose their reference and may be changed/affected by other sources
- Controlled components enable you to effectively employ form validation to your forms. It doesn’t matter what changes the form elements. Their values are safe in our local states, so that’s where we perform our validation
- With controlled components, you are very much in control of your form elements’ values. You can dictate how they go and what can and cannot be inserted

So which should you use in your React project? The question is not whether controlled are uncontrolled components are better, but which better serves your use case and fits your personal preference. Controlled components, obviously, afford you more control over your data, but if you’re more comfortable using uncontrolled components in your project, more power to you.

There are no defined rules to help you determine when and how to use uncontrolled components versus controlled components in React; it all depends on how much control you want to have over your inputs.

---

## Conclusion

In this tutorial, we zoomed in on form elements and form data, both generally and within the React framework. Next, we introduced two ways to handle form data in React components: controlled and uncontrolled. Finally, we took a deep dive into both types of component and demonstrated how they behave with practical examples.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Controlled vs. uncontrolled components in React",
  "desc": "In this tutorial, we’ll explain the difference between controlled and uncontrolled components in React with practical examples.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/controlled-vs-uncontrolled-components-in-react.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
