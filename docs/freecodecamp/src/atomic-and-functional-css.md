---
lang: en-US
title: "How Atomic CSS and Functional Programming Are Related"
description: "Article(s) > How Atomic CSS and Functional Programming Are Related"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Atomic CSS and Functional Programming Are Related"
    - property: og:description
      content: "How Atomic CSS and Functional Programming Are Related"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/atomic-and-functional-css.html
prev: /programming/js-react/articles/README.md
date: 2026-03-20
isOriginal: false
author:
  - name: Ramazan Maksyutov
    url: https://freecodecamp.org/news/author/ramazanmaksyutov/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/64d0d72a-075e-42a9-b0fb-ca577f950999.png
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

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Atomic CSS and Functional Programming Are Related"
  desc="Hello, friends! My name is Ramazan, and I'm a front-end developer and enthusiast who loves looking at familiar things in web development from new perspectives. You might have heard of functional progr"
  url="https://freecodecamp.org/news/atomic-and-functional-css"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/64d0d72a-075e-42a9-b0fb-ca577f950999.png"/>

Hello, friends!

My name is Ramazan, and I'm a front-end developer and enthusiast who loves looking at familiar things in web development from new perspectives.

You might have heard of functional programming (FP). It's a paradigm characterised by the use of pure functions and the preservation of data immutability. There are even languages in which FP principles prevail, like Haskell, OCaml, and Elixir. Other languages like JavaScript, Python, and C++ also support this approach, although they're not limited to it.

But an attentive reader will look at the title and ask: "Functional programming is fine. But what does Atomic CSS have to do with it?" I'll answer that now!

The thing is, back when the atomic approach first appeared, it had another name: Functional CSS. Some people still use it quite often today to avoid confusion with other terms with the same [**name**](/css-tricks.com/the-atomics.md). But why is this approach to writing CSS called functional?

That's the question I'll try to answer in this article. First, I'll describe the basic principles of FP. Then, I'll talk about the basics of Atomic CSS (which I'll refer to here as ACSS), drawing analogies with functional programming. I'll also try to use simple examples to show what problems you can solve by applying Atomic CSS to styling.

When preparing the materials for this article, I relied a lot on [<VPIcon icon="fa-brands fa-youtube"/>this tutorial](https://youtu.be/7g0BHu0kWXo) on FP and [<VPIcon icon="fa-brands fa-youtube"/>this one](https://youtu.be/uHVqbCPnOwU) on Functional CSS.

<VidStack src="youtube/7g0BHu0kWXo" />

<VidStack src="youtube/uHVqbCPnOwU" />

Well, let's get started!

::: note Prerequisites

To follow along with this article, all you need is a basic understanding of HTML, CSS, and JavaScript. There are also some examples where we'll use the Atomic CSS framework [<VPIcon icon="fas fa-globe"/>mlut](https://mlut.style/), but you don't have to know its syntax because I've provided the text with the equivalent CSS styles.

:::

---

## The Basic Principles of Functional Programming

Functional programming is a broad field that has been the subject of numerous complex articles and an entire scientific [<VPIcon icon="fas fa-globe"/>journal](https://cambridge.org/core/journals/journal-of-functional-programming). So in my article, I'll focus on exploring only the basic principles of FP and drawing analogies with them in Atomic CSS.

This approach is based on the idea that all the actions we need to perform in a program should be done by calling certain functions and their compositions.

Let me outline the main concepts I'll use to explain the core idea of this approach:

1. Pure functions
2. Immutability
3. Function composition

### Pure Functions

A function is called pure if it:

- returns the same value for the same input parameters;
- has no side effects (changes to external values or entities).

Here are a couple of examples to illustrate this:

```js
let c = 10;
let s = 0;

// Pure function
function pureSum(a,b) {
  return a + b
}

// Impure function
function notPureSum (a) {
  s = a + c
  return s
}
```

The first function is pure because if we enter the same arguments, we'll get the same result. Also, this function doesn't change any global variables and doesn't mutate objects.

The second function doesn't meet the concept of purity on both points. It changes the external variable `s` and uses another external variable `c` for calculations, which can change.

Pure functions allow you to write more predictable code. An application can grow and a function with an implicit parameter that can change over time can lead to great difficulties in debugging and maintaining the codebase.

### Immutability

Immutability is a principle which states that data objects shouldn't change after they're created. To make changes to data, you need to create a new instance of it and then work with that new copy.

At first glance, it may seem that this approach limits flexibility in the development process and reduces the speed of the program. But in reality, if the language or runtime has optimisations for immutable data, adhering to this principle helps you avoid many errors and use parallel calculations.

Here's a fairly simple example: let's take a React component that renders a task in a to-do list. The state of the task is described by an object. And in order for React to correctly redraw the state of the task component when the user changes something in it, it's necessary to pass as the new state not the mutated old object, but a new instance of the object with the current state. Here is the example where an immutable object is used for the state of the to-do:

```js
import { useState } from "react";

function TodoItem() {
  const [todo, setTodo] = useState({
    text: "Write article",
    done: false
  });

  const toggleDone = () => {
    setTodo({
      ...todo,
      done: !todo.done
    });
  };

  return (
    <div>
      <span>
        {todo.text} — {todo.done ? "✅" : "❌"}
      </span>
      <button onClick={toggleDone}>
        Toggle
      </button>
    </div>
  );
}

export default TodoItem;
```

Here we'll see that clicking on the button will lead to changes in the state of the to-do and will cause re-rendering of the component. But we could define the function `toggleDone()` in a different way using mutations of the object:

```js
const toggleDone = () => {
  todo.done = !todo.done;
  setTodo(todo);
};
```

With such an event handler, the effect will not work because the link to the object is still the same, even though the object itself was mutated.

### Function Composition

Function composition involves using the result of one function as an argument for another function. Here's an example of a program that capitalises the first letter of each word:

```js
function compose(f1, f2) {
  return function (str) {
    return f1(f2(str));
  }
}

function makeFirstCapital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function upperEveryFirst(str) {
  return str.split(' ').map(makeFirstCapital).join(' ');
}

function lower(str) {
  return str.toLowerCase();
}

const capitalize = compose(upperEveryFirst, lower);
const string = 'this sTring should be Capitalized'

console.log(capitalize(string)) // 'This String Should Be Capitalized'
```

Here, we have defined the function `compose(f1, f2)`, which returns the composition of the functions passed to it in arguments. Next, we use this function to create the function `capitalise()`, which will capitalise only the first letters of words by composing the functions `lower()` and `upperEveryFirst()`. The first one is executed first and returns a string with all lowercase letters to the second function as an argument. The second function capitalises the first letter of each word.

In large projects and when complex calculations are required, such compositions can be larger, and the logic in them can be much richer. In such cases, this approach to calculations helps break down very large transformations into a series of relatively simple and compact functions that are applied one after the other. This makes it easier to develop, refactor, and debug code.

---

## How the Principles of FP Meet Their Incarnation in Atomic CSS

Now that we know a little about functional programming, let's try to answer the question: ‘What does Atomic CSS have to do with it?’ Let's draw an analogy between these approaches at the level of the principles described above.

### What is Atomic CSS?

But first, let's take a moment to explain what Atomic CSS is. It's a methodology of styling layouts in which we use small Atomic CSS rules, each of which performs a single action. These classes are called utilities. They usually apply one CSS property, but not necessarily just one.

For example, in the mlut framework, the `Bgc-red` utility corresponds to the `background-colour: red` property, and the `-Sz50p` utility corresponds to two properties at once: `width: 50%` and `height: 50%`.

Modern Atomic CSS frameworks, such as mlut and Tailwind, use a so-called JIT engine. This is a component that generates CSS based only on the utilities you used in your markup.

### Purity

Purity in CSS is determined by which selectors, or more specifically, classes, are used to style elements. In clean CSS, the behaviour of an element should be determined solely by the classes that are attached to it in the `class` attribute. This means that, ideally, a stylesheet should not contain selectors such as `section` or `div > ul`.

Firstly, they set too general rules, which are likely to be broken or supplemented in one part of the project or another. So when we style specific elements, we'll have to constantly keep these styles in mind in order to understand how to achieve the necessary styling without spoiling anything.

Secondly, the purity of CSS for each specific element is violated. Let's say we have the following markup:

```html
<button class="greeting">Hello!</button>
<div class="wrapper">
  <button class="greeting">Hello!</button>
</div>
```

With the CSS styles below:

```css
.wrapper > .greeting {
  background-color: green;
}
.greeting {
  background-color: red;
}
```

As a result, we get that the first button is red, and the nested one is green. It seems pretty harmless in this simple case, but it will cause inconvenience when the project structure grows significantly.

Here we see that the result of the `.greeting` class's custom styles depends on where the corresponding element is located. This is similar to a function that produces different results for the same input data depending on where it's called.

Atomic CSS allows you to avoid this effect. In this approach, in most cases, styles are applied only to those elements for which the corresponding classes are specified. If you need to make several identical elements, the same utility is specified in the `class` attribute of each such element.

A similar example can be rewritten in mlut like this:

```html
<button class="Bgc-red">Hello!</button>
<div>
  <button class="Bgc-green">Hello!</button>
</div>
```

And JIT-engine will generate the following styles:

```css
.Bgc-red {
  background-color: red;
}

.Bgc-green {
  background-color: green;
}
```

Here we can see that the styles of elements in this approach will depend only on the classes assigned to them.

It's worth noting here that the mlut syntax allows you to do things that deviate from the strict concept of CSS purity. Sometimes this is necessary to create relatively more complex effects.

Let's say we want to implement a card that changes the background colour of the button inside it when hovered. Then we would need to write the following in mlut:

```html
<div class="-Ctx">
  <button class="^:h_Bgc-red">Greeting</button>
</div>
```

CSS:

```css
.-Ctx:hover .\^\:h_Bgc-red {
  background-color: red;
}
```

### Immutability in ACSS

By CSS immutability, I mean that element styles are not rewritten. Immutability in ACSS means that utilities do not typically mutate each other.

For example, in BEM (Block Element Modifier), the main styles are set by a block or element, and a modifier mutates these styles. In other approaches that use combined selectors, such mutations occur more often and less explicitly.

Let me give you a simple example. Suppose we have a product card that can be in its default state or in a highlighted state. In BEM it would look like this:

```html
<div class="product-card">Card 1</div>
<div class="product-card product-card--selected">Card 2</div>
<div class="product-card">Card 3</div>
```

```css
.product-card {
  background-color: red;
  padding: 5px;
}

.product-card--selected {
  background-color: green;
}
```

In this example, we see that the `product-card` class sets the default background colour of the card to red. And in order to somehow mark the selected card with a different background colour we have to add a modifier class that changes the colour from red to green. It does this by rewriting the `background-color` property, that is by mutating the block styles.

In the Atomic CSS approach, this problem is solved because utilities allow you to set CSS properties independently of each other and apply modifications without resorting to mutation.

Here's what this example would look like if you used mlut:

```html
<div class="P5 Bgc-red">Card 1</div>
<div class="P5 Bgc-green">Card 2</div>
<div class="P5 Bgc-red">Card 3</div>
```

```css
.P5 {
  padding: 5px;
}

.Bgc-red {
  background-color: red;
}

.Bgc-green {
  background-color: green;
}
```

### Composition

Functional programming makes extensive use of function composition. In Atomic CSS, function composition is analogous to utility composition when styling elements. Just as in FP we obtain complex behaviour through the sequential application of a set of simple functions, so in ACSS we can obtain non-trivial styling through a set of simple utilities.

As an example, I'll show a simple smiley face made using only Atomic CSS:

```html
<div class="-Sz150 Bgc-yellow Bdrd100p M-a Ps">
  <div class="-Sz20p Bgc-gray Bdrd100p Ps-a T30p L20p"></div>
  <div class="-Sz20p Bgc-gray Bdrd100p Ps-a T30p R20p"></div>
  <div class="W50p H40p Bdb5;s;gray Bdrd100p Ps-a T40p L25p"></div>
</div>
```

```css :collapsed-lines
.-Sz150 {
  width: 150px;
  height: 150px;
}

.Bgc-yellow {
  background-color: yellow;
}

.Bdrd100p {
  border-radius: 100%;
}

.M-a {
  margin: auto;
}

.Ps {
  position: relative;
}

.-Sz20p {
  width: 20%;
  height: 20%;
}

.Bgc-gray {
  background-color: gray;
}

.Ps-a {
  position: absolute;
}

.T30p {
  top: 30%;
}

.L20p {
  left: 20%;
}

.R20p {
  right: 20%;
}

.W50p {
  width: 50%;
}

.H40p {
  height: 40%;
}

.Bdb5;s;gray {
  border-bottom: 5px solid gray;
}

.T40p {
  top: 40%;
}

.L25p {
  left: 25%;
}
```

This is how our result will look:

![Smiley face](https://cdn.hashnode.com/uploads/covers/69844106d7e8f3ad9f2dd000/de19a0ca-af4e-45f4-8a90-1a0f55db7950.png)

Thus, by applying the utilities one after another, we even made some small CSS art.

---

## Conclusion

To sum up, I will say that Atomic CSS truly embodies the basic principles of functional programming. Of course, not literally – but in the sense that is relevant for front-end developers and layout designers.

I would be happy to hear your additions and objections – it'll be interesting to read and think about them.

Finally, I would like to say: look at familiar things with a fresh perspective. And, as usual, I wish you success on your exciting journey of front-end development!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Atomic CSS and Functional Programming Are Related",
  "desc": "Hello, friends! My name is Ramazan, and I'm a front-end developer and enthusiast who loves looking at familiar things in web development from new perspectives. You might have heard of functional progr",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/atomic-and-functional-css.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
