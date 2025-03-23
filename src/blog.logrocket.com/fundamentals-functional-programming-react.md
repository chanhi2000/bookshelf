---
lang: en-US
title: "Fundamentals of functional programming with React"
description: "Article(s) > Fundamentals of functional programming with React"
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
      content: "Article(s) > Fundamentals of functional programming with React"
    - property: og:description
      content: "Fundamentals of functional programming with React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/fundamentals-functional-programming-react.html
prev: /programming/js-react/articles/README.md
date: 2021-11-15
isOriginal: false
author:
  - name: Ibadehin Mojeed
    url : https://blog.logrocket.com/author/ibadehinmojeed/
cover: /assets/image/blog.logrocket.com/fundamentals-functional-programming-react/banner.png
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
  name="Fundamentals of functional programming with React"
  desc="Learn about the functional programming concept and how React adopts it to write applications that are easier to test and maintain."
  url="https://blog.logrocket.com/fundamentals-functional-programming-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/fundamentals-functional-programming-react/banner.png"/>

Understanding the concept of functional programming is a valuable skill for React developers. It is an important topic that most React beginners often overlook, making them encounter problems when understanding how React makes some of its decisions.

![Fundamentals Of Functional Programing With React](/assets/image/blog.logrocket.com/fundamentals-functional-programming-react/banner.png)

In this post, we’ll cover the functional programming concept and how React adopts it to write applications that are easier to test and maintain.

To follow this tutorial, ensure you have a basic understanding of React.

---

## A quick overview of functional programming

Every program or application we write follows an approach or style(s) of writing, otherwise called [<FontIcon icon="fa-brands fa-wikipedia-w"/>a paradigm](https://en.wikipedia.org/wiki/Programming_paradigm). Functional programming, therefore, is a [<FontIcon icon="fa-brands fa-wikipedia-w"/>declarative programming paradigm](https://en.wikipedia.org/wiki/Declarative_programming) where programs are constructed by composing pure functions.

Let’s pay attention to the words “composing” and “pure,” because they form the building blocks of functional programming, and we will discuss them in the following section.

---

## Functions in mathematics

To understand the functional programming concept better, let’s take a quick look at the usual functions in mathematics. For instance, we have a given function:

$$
y=f\left(x\right)
$$

In this function, the output, `y`, computes solely on the input, `x`. That means every time we call the function with the same input, `x`, we always get the same output, `y`.

The function does not affect anything outside of itself and never modifies the input that passes in. Hence, it is called a deterministic or [**pure function**](/blog.logrocket.com/react-pure-components-functional.md).

Let’s see an example:

::: tip Example

$$
y=f\left(x\right)=4x
$$

if $x=2$, $y=4(2)=8$

:::

As seen above, for every input, $x=2$, the output $y$ will always be $8$. Functions like this are always easier to understand and reason about because we know exactly what we expect.

Let’s go a step further and write a more complex function like this:

$$
z=c\left(f\left(x\right)right
$$

Here, we have two functions, `c` and `f`, that are composed together to form a more complex function. In mathematics, we say that `c` is a function of $f\left(x\right)$, meaning we must first evaluate $f\left(x\right)$ separately, like so:

$$
y=f\left(x\right)
$$

Then, we pass the result as an argument to the $c$ function, like so:

$$
z=c\left(y\right)
$$

This functional concept is called function composition. It encourages code reusability and maintainability.

With this mathematical concept in mind, understanding the functional concept in computer science programming is a piece of cake.

---

## Functional programming in React

Going forward, we will explain how the functional programming concept is applied in React. We will also see examples in JavaScript because it is the underlying language of React.

Let’s start by taking a look at the following JavaScript code:

```js
const arr = [2, 4, 6];

function addElement(arr, ele) {
  arr.push(ele);
}

addElement(arr, 8);

console.log("original data", arr); // Expected Output: [2, 4, 6, 8]
```

Here, we defined a function called `addElement` that adds an element to an array. The code works as seen in the output, and [you can try it for yourself on CodeSandbox](https://codesandbox.io/s/unruffled-sutherland-z4ujd?file=/src/index.js).

This code looks similar to the functional concept in mathematics explained earlier. That is, a function operates only on the input argument to create an output.

But looking closer into the code, we’ll see that it violates a purely functional concept that says a function should never affect anything outside of it and never modify the argument that passes in.

A function that does this is an impure function and has side effects, such as manipulating the input argument, in this case, the global `arr` array.

In the code, the global `arr` array is mutated, meaning the function changes the global variable from the initial `[2,4,6]` to `[2,4,6,8]`.

Now, imagine we want to reuse the global variable to compose another function. If we proceed with this, we get an unintended output that may lead to bugs in our program.

This brings us to the first tenet of functional programming: pure functions.

---

## Using pure functions

In functional programming, we write pure functions, which are functions that return an output solely on the input value and never affect anything outside of them. This helps prevent bugs in our code.

By applying this functional concept to the code above, we get the following:

```js
const arr = [2, 4, 6];

function addElement(arr, ele) {
  return [...arr, ele];
}

console.log("modified data", addElement(arr, 8)); // Expected Output: [2, 4, 6, 8]
console.log("original data", arr); // Expected Output: [2, 4, 6]
```

The function above is pure, and it computes the output only on the input arguments and never changes the global `arr` array as we can see in the result.

[You can try it for yourself on CodeSandbox](https://codesandbox.io/s/kind-wozniak-liqhj?file=/src/index.js).

Be aware that the code also uses the immutability concept to make the function pure (we will get to that in a moment).

This type of function is predictable and easier to test because we will always get the intended output.

### How React implements the pure functional concept

A React app component in its simplest form looks like this:

```js
const Counter = ({ count }) => {
  return <h3>{`Count: ${count}`}</h3>;
};
```

This is similar to a pure function in JavaScript where a function receives an argument (in this case, a `count` prop) and uses the prop to render an output.

React, however, has unidirectional data flow from the parent to child component. When state data passes to a child component, it becomes an immutable prop that cannot be modified by the receiving component.

Therefore, given the same prop, this type of component always renders the same JSX. And, because of this, we can reuse the component on any page section without fear of uncertainty. This type of component is a purely functional component.

### Improving app performance

React capitalizes on the pure functional concept [to improve app performance](https://blog.logrocket.com/5-react-performance-optimization-techniques/). Due to the nature of React, whenever a component’s state changes, React re-renders the component and its child component, even when the state change does not directly affect the child component.

In this case, React allows us to wrap the pure functional component in `React.memo` to prevent unnecessary re-renders if the prop it receives never changes.

By memoizing the above pure function, we only re-render the function if the `count` prop changes:

```js
const CounterComponent = React.memo(function Counter({ count }) {
  return <h3>{`Count: ${count}`}</h3>;
});
```

### A pure functional concept in the state update

React also implements the functional concept when updating a state variable, especially when a value is based on the previous, like in the case of a counter or checkbox.

Take a look at the following code:

```js
import { useState } from "react";
const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => setCount(count + 1);

  return (
    // ...
  );
};

const Counter = ({ count }) => {
  // ...
};

export default App;
```

Here, we removed some parts of the code for brevity but expanded our previous `Counter` component to [display a button to increment a count](https://codesandbox.io/s/sad-dawn-erel6?file=/src/App.js).

This is a familiar code for React beginners. While the code works, we can add improvements by following the functional programming concept.

Let’s focus on this part of the code:

```js
const handleClick = () => setCount(count + 1);
```

Inside the `setCount` updater function, we use a `count` variable that does not pass as an argument. As we’ve learned, this is against the concept of functional programming.

One improvement React provides is passing a callback to the updater function. In this callback, we can access the previous version of the state, and from there, we can update the state value:

```js
const handleClick = () => setCount((prev) => prev + 1);
```

As we can see in the `setCount` callback, the output computes solely on the `prev` input argument. That is the pure functional concept in action.

---

## Avoiding mutating data (immutability)

When a function mutates or changes a global variable, it can lead to a bug in our program.

In functional programming, we treat mutable data structures like arrays and objects as immutable data. This means we never modify them, rather, we make a copy when passing to a function so the function can compute its output based on the copy.

Let’s revisit the following code:

```js
const arr = [2, 4, 6];

function addElement(arr, ele) {
  return [...arr, ele];
}

console.log("modified data", addElement(arr, 8)); // Expected Output: [2, 4, 6, 8]
console.log("original data", arr); // Expected Output: [2, 4, 6]
```

We’ve seen this code earlier, but this time we’ll shift our focus towards the immutable functional aspect.

Here, we have a function that only uses a copy of the global variable to compute the output. We use the ES6 spread operator (`…`) to copy existing data into a new array and then add the new element. This way, we keep the original array input data immutable, as seen in the result.

### How React handles mutable state

Since React is a reactive library, it must “react” to state changes to keep the DOM up to date. Obviously, the state value must update as well.

In React, we do not modify the state directly. Instead, we update the state using the `setState()` method in a class component or the updater function in a functional component.

Take a look at an excerpt from our previous code:

```js
const handleClick = () => setCount((prev) => prev + 1);
```

Here, we use the updater function, `setCount`, to update the count number. When working with immutable data like numbers and strings, we must only pass the updated value to the updater function or invoke a callback function whenever the next state depends on the previous.

Let’s see another example that updates a string value:

```js
import { useState } from "react";

const App = () => {
  const [person, setPerson] = useState("");

  const handleChange = (e) => {
    setPerson(e.target.value);
  };

  return (
    // ...
  );
};

export default App;
```

Here, we removed some of the code for brevity again.

The above code updates a form’s text field, which involves working with immutable string data. So, we must [update the input field by passing the current input value to the updater function](https://codesandbox.io/s/proud-framework-dcnlr?file=/src/App.js).

However, whenever we pass mutable data like an array and object, we must make a copy of the state data and compute the output based on the copy. Note that we must never modify the original state data.

In the following code, the `handleChange` triggers to update the state variable on every keystroke in the form:

```js
import { useState } from "react";

const App = () => {
  const [person, setPerson] = useState({
    fName: "",
    lName: ""
  });

  const handleChange = (e) => {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  };

  return (
    // ...
  );
};

export default App;
```

As seen in the code, we [are working with a mutable object](https://codesandbox.io/s/vibrant-meninsky-9iwdk?file=/src/App.js), hence, we must treat the state as immutable. Again, we do this by making a copy of the state using the ES6 spread operator and updating the affected property:

```js
setPerson({
  ...person,
  [e.target.name]: e.target.value
});
```

One more improvement is ensuring that the updater function, `setPerson`, uses a state variable that passes as an argument of a callback function:

```js
const handleChange = (e) => {
  setPerson((person) => ({
    ...person,
    [e.target.name]: e.target.value
  }));
};
```

Now, what will happen if we don’t follow this functional concept and we directly mutate the state. Obviously, we’ll experience a bug in our application.

To see a clearer picture, [visit this CodeSandbox](https://codesandbox.io/s/vibrant-meninsky-9iwdk?file=/src/App.js) again and temporarily comment-out `…person` from the function, like so:

```js
setPerson((person) => ({
  // ...person,
  [e.target.name]: e.target.value
}));
```

Now, by trying to write something in the form fields, the text will override each other. That is a bug that we want to prevent and we can do this by treating the state as immutable data.

---

## Avoiding side effects

Functional programming codes are meant to be pure. A pure component in React can receive a prop as an argument and compute the output based on the input prop.

But sometimes, the component can make computations that affect and modify some state outside of its scope. These computations are called side effects. Examples of these effects include data fetching and manually manipulating the DOM.

These are tasks we often perform in our application, thus making side effects inevitable.

The snippet below is based on our previous `Counter` example:

```js
const Counter = ({ count }) => {
  document.title = `Number of click: ${count}`;
  return <h3>{`Count: ${count}`}</h3>;
};
```

In the code, we update the document title to reflect the updated count value. This is a side-effect because we modify the DOM element that does not belong to the component, thereby making the component impure.

Performing side effects directly inside the body of a component is not allowed to avoid inconsistencies in our app. Instead, we must isolate this effect from the rendering logic. React provides us with a [**Hook called `useEffect` to manage our side effects**](/blog.logrocket.com/useeffect-react-hook-complete-guide.md).

The following code implements this Hook:

```js
const Counter = ({ count }) => {
  useEffect(() => {
    document.title = `Number of click: ${count}`;
  }, [count]);

  return <h3>{`Count: ${count}`}</h3>;
};
```

[By placing the side effect in the React `useEffect` Hook](https://codesandbox.io/s/admiring-hoover-s52eg?file=/src/App.js) means we can easily test and maintain the rendering logic.

<!-- TODO: sandpack  -->
<!-- ::: sandpack#react eh3rrera / Drafts / useState 02 [rtl theme=dark]
::: -->

---

## Composition in React

In functional programming, a composition is an act of building complex functions by combining or chaining multiple smaller functions.

If we recall from the beginning of this article, we mentioned that for a given function, $c$ and $f$, we can compose them to form a more complex function, demonstrated like so:

$$
z=c\left(f\left(x\right)\right)
$$

But now, we will look at this concept of composition in the context of React.

Similar to the above functional pattern, we can build a complex component in React by injecting other components using the `children` prop from React. This prop also allows a component to render a varying amount of content without needing to be aware of the content ahead of time.

This gives us the flexibility to decide what goes inside a component and customize the content to get the desired output.

A good example of components that implement this concept includes `Hero` and [**`Sidebar`**](/blog.logrocket.com/create-sidebar-menu-react.md).

### Building a reusable `Hero` component

Let’s say we want to create a `Hero` component that contains varying content and we can reuse it anywhere in our application.

We can start by writing the component like so:

```jsx
function Hero({ children }) {
  return <section>{children}</section>;
}
```

The `children` prop used in this code allows us to inject content between the opening and closing tags of a component; in our case, a `Hero` component.

So, we can have something like this:

```jsx
<Hero>
  <Banner>
    <h1>Home Page</h1>
    <p>This is the home page description</p>
  </Banner>
</Hero>
```

Now, everything in between `<Hero>` is considered its `children` prop, and thus appears between the `section` tags in the `Hero` component.

Likewise, the content inside the `<Banner>` JSX tag passes into the `Banner` component as `children` prop:

```jsx
function Banner({ children }) {
  return (
    <div>
      {children}
      <button>Subscribe to newsletter</button>
    </div>
  );
}
```

The content between the `<Banner>` tag (that is, `h1` and `p`) replaces `children` within the JSX.

In this code, the `Banner` component only knows about the `button` element because we’ve manually added the element; it doesn’t know what is coming to replace the `children` prop.

This makes the component reusable and flexible to customize because we have control over the content that comes in as the `children`. We can now decide not to render the banner heading, `h1`, on another page of our application.

All we must do is [<FontIcon icon="iconfont icon-codesandbox"/>exclude it from the content in between the `Banner` tag](https://codesandbox.io/s/angry-chebyshev-69hiw?file=/src/App.js).

<!-- TODO: sandpack  -->
<!-- ::: sandpack#react eh3rrera / Drafts / useState 02 [rtl theme=dark]
::: -->

By comparing the React composition to the mathematical definition, we can say the output of a `Banner` component becomes the input to the `Hero` component. In other words, the `Hero` is composed with the `Banner` component to form a whole component.

And that is composition in action.

---

## Conclusion

I’m glad you are here! Throughout this post, we learned with practical examples how React applies the functional programming concept to making some of its decisions.

I hope you enjoyed reading this post. If you have questions or contributions, please share your thought in the comment section, I will be happy to entertain them. Finally, endeavor to share this guide around the web.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Fundamentals of functional programming with React",
  "desc": "Learn about the functional programming concept and how React adopts it to write applications that are easier to test and maintain.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/fundamentals-functional-programming-react.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
