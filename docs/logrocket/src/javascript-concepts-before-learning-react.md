---
lang: en-US
title: "JavaScript concepts to master before learning React"
description: "Article(s) > JavaScript concepts to master before learning React"
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
      content: "Article(s) > JavaScript concepts to master before learning React"
    - property: og:description
      content: "JavaScript concepts to master before learning React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/javascript-concepts-before-learning-react.html
prev: /programming/js-react/articles/README.md
date: 2020-06-23
isOriginal: false
author:
  - name: Sebastian Weber
    url : https://blog.logrocket.com/author/sebastianweber/
cover: /assets/image/blog.logrocket.com/javascript-concepts-before-learning-react/banner.png
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
  name="JavaScript concepts to master before learning React"
  desc="Before you dive into learning React, it makes good sense to master the common JavaScript patterns you'll see in virtually every React app."
  url="https://blog.logrocket.com/javascript-concepts-before-learning-react"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/javascript-concepts-before-learning-react/banner.png"/>

As you likely already know, React is a library to create UI components that can be used as the basis of web and mobile applications. What distinguishes React from some of its competitors is that its code is written entirely with JavaScript. Even the HTML-like templates are written in JS using [<VPIcon icon="fa-brands fa-youtube"/>JSX](https://facebook.github.io/jsx/), which is an extension of the JS language to structure UI components.

![JavaScript Concepts To Master Before Learning React](/assets/image/blog.logrocket.com/javascript-concepts-before-learning-react/banner.png)

The goal of this article is to help aspiring React developers get started by highlighting the JavaScript they ought to master before really diving into React. A complete introduction to JavaScript would go beyond the scope of this article, but React builds on the use of modern JavaScript features that were mainly introduced with [<VPIcon icon="fa-brands fa-wikipedia-w"/>ES2015](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_%E2%80%93_ECMAScript_2015).

Below, I give an overview of the common JavaScript patterns and language features that are heavily used in virtually every React application. For each concept, I provide external links. If you are interested, you can learn more about using it in React context.

---

## Conditional logic with `if` statements, the ternary operator, and logical operators

These operators have been part of JavaScript for a very long time. In React, they are especially useful for conditional rendering of components.

The [<VPIcon icon="fa-brands fa-firefox"/>ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) looks like this:

```js
const buttonLabel = playback === "stop" ? "play " : "stop ";
```

If the variable `playback` has the value `stop`, then the operator assigns to `buttonLabel` the string value `play ▶️` and, in all other cases, the string value `stop ⏹️` . It is basically the same as the following code:

```js
let buttonLabel;
if (playback === "stop") {
  buttonLabel = "play ";
}
else {
  buttonLabel = "stop "
}
```

Of course, you can use such an `if...else` statement, but the ternary operator is often the instrument of choice if you need to use a single line expression for [<VPIcon icon="fa-brands fa-react"/>conditionally rendering elements inline](https://reactjs.org/docs/conditional-rendering.html#inline-if-else-with-conditional-operator).

Otherwise, you have to call a [function where you put your code for conditional rendering (<VPIcon icon="fa-brands fa-codepen" />`gaearon`)](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011). In React, you can also use more complex condition logic (e.g., an [<VPIcon icon="fa-brands fa-firefox"/>`if...else` cascade](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)) and store values in variables that can be used for [conditional rendering (<VPIcon icon="fa-brands fa-codepen" />`gaearon`)](https://codepen.io/gaearon/pen/QKzAgB?editors=0010) in JSX code.

[<VPIcon icon="fa-brands fa-firefox"/>Logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators) `&&` or `||` are very handy for building React components.

```js
const isLoggedIn = true;
const userComponent = isLoggedIn && getUserComponent();
```

In our example, the left operand (`isLoggedIn`) of the `&&` operator evaluates to `true`. Therefore, the result of the right operand (the function call `getUserComponent()`) gets assigned to the `userComponent` variable.

This concept is also very useful for [conditional rendering in React (<VPIcon icon="fa-brands fa-codepen" />`gaearon`)](https://codepen.io/gaearon/pen/ozJddz?editors=0010) because `true && jsxComponent` returns `jsxComponent`, and `false && jsxComponent` returns `false`. If you return `false`, React ignores it and simply renders nothing.

It is also possible to combine multiple conditions. In the next example, the result of `getOtherUsersComponent()` is returned when both conditions are met.

```js
const otherUsers = isLoggedIn && users?.length > 0 && getOtherUsersComponent();
```

Notice the `?` in the second operand `users?.length > 0`. This is [**optional chaining**](/blog.logrocket.com/optional-chaining-and-nullish-coalescing-in-javascript.md), which is not uncommon in React projects.

If you return [<VPIcon icon="fa-brands fa-firefox"/>`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null), React doesn’t render anything. In contrast to `undefined`, `null` represents the intentional absence of any value.

```js
if (shouldRenderComponent()) {
  return getComponent();
}
else {
  return null;
}
```

This is useful to [prevent components from rendering (<VPIcon icon="fa-brands fa-codepen" />`gaearon`)](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010).

---

## Object literals and inline functions

There are [<VPIcon icon="fa-brands fa-firefox"/>multiple ways to create objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer). Initializing objects with the literal notation looks like this:

```js
const foo = { bar: 3, hello: "world" };
```

This notation is frequently used in React projects to create objects inline without assigning them to a variable, e.g., for the initial state of `useReducer`.

```js
// 2nd function argument uses inline object literal
foo("bar", { hello: "world" })
```

With ES2015 syntax, you can also use shorthand properties and method names.

```js
// instead of 
function foo(id) {
  return {
    name: "dummy",
    id: id,
    bar: function() {
      console.log("bar");
    }
  }
}
// you can do
function foo(id) {
  return {
    name: "dummy",
    id, // shorthand property name
    bar() { // shorthand method name
      console.log("bar");
    }
  }
}
```

Shorthand properties especially are used all over the place in React development since they eliminate redundant code.

That said, you have to be aware of the subtle difference between an inline object literal and a variable pointing to an object (created by an object literal). In some cases, for React performance optimization purposes, you should [**avoid passing object literals**](/digitalocean.com/react-keep-react-fast.md#avoid-object-literals) to React components because a new object is created every time, causing unnecessary re-renders.

The same principle applies to anonymous functions (i.e., inline functions), which [**should be avoided**](/digitalocean.com/react-keep-react-fast.md#avoid-anonymous-functions) in some React performance use cases.

```js
// inline function
foo(() => {console.log("bar")});
// passing variable pointing to function
const barFunc = () => console.log("bar");
foo(barFunc);
```

---

## Template literals

[<VPIcon icon="fa-brands fa-firefox"/>Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), or template strings, were introduced with ES2015 and allow for creating strings with embedded JavaScript expressions. Within backticks, you can combine “hardcoded” strings with JavaScript expressions inside of `${}`.

```js
const name = "doppelmutzi";
console.log(`Hello, my name is ${name}`); // Hello, my name is doppelmutzi
```

Expressions can, of course, be more complex, like inline calculations or function calls.

```js
const name = "doppelmutzi";
const getRandomIndex = max =>  Math.floor(Math.random() * Math.floor(max))
const food = ["", "", "", "", ""];
const getFood = index => food[index]
console.log(`Hello, my name is ${name} 
and I'm hungry for ${getFood(getRandomIndex(food.length))}`);
```

The latter example also uses the multiline feature so that the output has a line break after the expression interpolation (`${name}`).

---

## Switch statement

In medium- and large-sized React applications, you’ll most likely be confronted with the [<VPIcon icon="fa-brands fa-react"/><VPIcon icon="fa-brands fa-firefox"/>`switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement for managing state across components. Tools like the [<VPIcon icon="fa-brands fa-react"/>`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer)` Hook or [<VPIcon icon="fas fa-globe"/>Redux](https://redux.js.org/) are often used for such tasks.

The following example shows a [so-called reducer function (<VPIcon icon="fa-brands fa-medium" />`async-la`)](https://medium.com/async-la/a-short-and-sour-guide-to-reducers-b5b54d3bb018) using a `switch` statement for state management. You don’t necessarily have to use `switch` statements with a reducer, but it is a well-established pattern.

```js
export default (state, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: action.darkMode,
      };
     case "UPDATE_PLAYBACK": {
      return {
        ...state,
        currentSound: action.currentSound,
      };
    }  
    default:
      return state;
  }
};
```

The example above checks the value of `action.type` and executes the code of a `case` statement. If it evaluates to a string, `TOGGLE_DARK_MODE`, then the code of the first case statement is executed.

It is good practice to have an optional default clause. It gets executed if the `switch` expression matches none of the case clauses. Using the spread operator (e.g., `...state`) is a common practice.

In the above example, every case (and default) clause returns a new object, representing the new React state. This brings us to an important topic of React development.

---

## Object destructuring

The principle of [<VPIcon icon="fa-brands fa-firefox"/>object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) is pretty simple. With the elegant syntax below, we can extract properties into variables.

```js
const creatures = {
  human: ["", "", "", "", ""],
  supernatural: ["", "", "", "", ""]
};
const { human, supernatural } = creatures;
console.log(human); // ["", "", "", "", ""]
console.log(supernatural); // ["", "", "", "", ""]
```

If you use assignment without variable declaration, you need to use parentheses.

```js
const creatures = {
  human: ["", "", "", "", ""],
  supernatural: ["", "", "", "", ""]
};
let human, supernatural;
({human, supernatural} = creatures);
console.log(human); // ["", "", "", "", ""]
console.log(supernatural); // ["", "", "", "", ""]
```

Object destructuring offers you syntactical sugar to save extra lines of code.

```js
// you can do this
const { human, supernatural } = creatures;
// instead of
const human = creatures.human;
const supernatural = creatures.supernatural;
```

In the context of React, object destructuring is frequently used with function parameters.

```js
const infos = {name: "doppelmutzi", hobby: "React" };
function printInfos({name, hobby}) {
  console.log(name, hobby);
}
printInfos(infos);
const printName = ({name}) => console.log(name);
printName(infos);
```

For cleaner code, React developers use this pattern with [<VPIcon icon="fa-brands fa-react"/>props](https://reactjs.org/docs/components-and-props.html), which are the input for React components.

```jsx
function MyReactComponent({name, age}) {
  // ...
}
```

Assigning in combination with renaming variables might be useful to increase the readability of your code.

```js
const creatures = {
  human: ["", "", ""]
};
const { human: people  } = creatures;
console.log(people); // ["", "", ""]
```

You can also define default values while unpacking fields from the assigned object. The following example combines multiple techniques.

```js
const { human: people = [""], supernatural = ["", ""] } = {
  human: ["", "", ""]
};
console.log(people); // ["", "", ""]
console.log(supernatural); // ["", ""]
```

Nesting is also possible, but I wouldn’t recommend overdoing it; otherwise, understandability decreases.

```js
const creatures = {
  animals: {
    wildlife: ["", ""],
    pet: ["", ""]
  },
  human: ["", "", ""]
};
const { animals: { pet }} = creatures;
console.log(pet); //  ["", ""]
```

Ronald Chen provides some [more insights (<VPIcon icon="fa-brands fa-medium" />`@pyrolistical`)](https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8) on destructuring nested objects.

---

## Array destructuring

With the help of the [<VPIcon icon="fa-brands fa-firefox"/>destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), an array can be unpacked in such a way that its values are extracted into distinct variables, like this:

```js
const array = [1, 2];
const [varForVal1, varForVal2] = array;
console.log(varForVal1); // 1
console.log(varForVal2); // 2
```

As you can see, variables are assigned from the left to the right of the array, so order is maintained.

```js
const [fruit, veggie] = ["", "", "", "", "", ""];
console.log(fruit); // 
console.log(veggie); // 
```

You can also skip values under consideration of the order.

```js
const [fruit,,pizza,,,burger] = ["", "", "", "", "", ""];
console.log(fruit); // 
console.log(pizza); // 
console.log(burger); // 
```

The following “chatty code” might help to understand what exactly happened.

```js
const [
  fruit,
  /* skip entry 2 () */,
  pizza,
  /* skip entry 4 () */,
  /* skip entry 5 () */,
  burger] = ["", "", "", "", "", ""];
```

You can also assign multiple values at once with the rest pattern.

```js
const [fruit, veggie, ...junkfood] = ["", "", "", "", "", ""];
console.log(fruit); // 
console.log(veggie); // 
console.log(junkfood); // ["", "", "", ""]
```

Array destructuring allows for default values. Of course, you can combine this pattern with function calls, too.

```js
const getFood = () => ["", ""];
const [fruit, veggie, junkfood = ""] = getFood();
console.log(fruit); // 
console.log(veggie); // 
console.log(junkfood); // 
```

The elegant concept of array destructuring is used frequently with [<VPIcon icon="fa-brands fa-react"/>React Hooks](https://reactjs.org/docs/hooks-overview.html) because you can come up with a few lines of semantic code. To create a state variable along with an updater function for a React component, you can use React’s [<VPIcon icon="fa-brands fa-react"/>`useState`](https://reactjs.org/docs/hooks-reference.html#usestate) Hook.

```js
const initialValue = false;
// instead of 
const stateWithUpdater = useState(initialValue);
const darkMode = stateWithUpdater[0];
const darkModeUpdater = stateWithUpdater[1];
// you can do
const [darkMode, setDarkMode] = useState(initialValue);
```

The following example demonstrates that you can implement generic functions for concrete use cases. Array destructuring allows the function caller to use semantic variable names.

```js
const getFood = type => {
  let food = [];
  let error = false;
  if (type === "fruits") {
    food = ["", "", ""];
  }
  else if (type === "junk") {
    food = ["", "", ""];
  }
  else {
    error = true;
  }
  const addFood = newFood => food.push(newFood);
  return [food, error, addFood];
};
const [healthyFood, noFruitsAvailable, addFruitFunc] = getFood("fruits");
console.log(healthyFood); // ["", "", ""]
console.log(noFruitsAvailable); // false
console.log(addFruitFunc("")); 
console.log(healthyFood); // ["", "", "", ""]
```

For this use case, in my opinion, returning an array with the `getFood` function leads to more concise code than with object destructuring. Array destructuring allows for custom variable names. In contrast, with object destructuring, you need to rename the variables.

```js
const getFood = type => {
  // same function body as above, only different return statement
  return {food, error, addFood};
};
const {food: healthyFood, error: noFruitsAvailable, addFood: addFruitFunc} = getFood("fruits");
console.log(noFruitsAvailable); // false
console.log(addFruitFunc("")); 
console.log(healthyFood); // ["", "", "", ""]
```

That’s probably why `useState` returns an array and not an object — to be more generic.

---

## Spread operator

The [<VPIcon icon="fa-brands fa-firefox"/>spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (`...`) allows an iterable item (e.g., an array) to be extracted into its parts and plugged into places that expect individual elements. With this syntax, you can split up object properties or array elements.

In the next use case below, we pull out elements of an array and pass each element as individual function argument.

```js
const numbers = [11, 5, 3, 1, 26];
// Math.max expects to be called like Math.max(11,5,3,1,26)
console.log(Math.max(...numbers)); // 26
```

Another use case is to copy object properties and, thus, create a new object.

```js
const food = {
  breakfast: ["", ""],
  lunch: ["", "", ""]
};
const foodAndDrinks = {
  ...food,
  drinks: ["", "", "", ""],
};
console.log(foodAndDrinks); 
/* 
{
  breakfast: ["", ""],
  lunch: ["", "", ""],
  drinks: ["", "", "", ""],
} */
```

With this succinct syntax, you can conveniently create a copy of an array.

```js
  const food = ["", "", "", "", ""];
  const copy = [...food];
  console.log(copy); // ["", "", "", "", ""]
  console.log(food === copy); // false
```

Recalling the last paragraph of our subsection on the switch statement, the spread syntax is frequently used in the context of React state. With React, you should not manipulate state objects directly. Instead, you need to create a brand-new state object whenever you want to update the state. The following concept is considered good practice.

```js
const restaurantState = {
  drinks: ["", "", "", ""],
  food: ["", "", "", "", ""],
  lastOrder: null
}
// the customer ordered a 
const stateAfterOrder = {
  drinks: [...restaurantState.drinks], // copy drinks
  food: [...restaurantState.food], // copy food
  lastOrder:  "" // override lastOrder
}
```

---

## Rest operator

With the help of the [<VPIcon icon="fa-brands fa-firefox"/>rest operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) (`...`), you can merge a list of function arguments into an array. While the syntax of the rest operator is the same as the spread operator, their place of use makes all the difference.

If you use the operator inside of `{}` or `[]`, you use object or array spreading, respectively. On the other hand, if you use the operator with the last argument in a function signature, that is the rest parameter.

Its purpose is to merge a list of values into an array. In the next example, various food is provided as function arguments. With the rest operators, they are put into an array called `food`. The `findIndex` method is operating on an array and tests whether broccoli is included.

```js
const cleanFoodIncluded = (...food) => food.findIndex(f => f === "") !== -1;
console.log(cleanFoodIncluded("", "", "", "", "")); // true
```

It is a common practice to use the rest operator in combination with the spread operator. This combines multiple arguments into an array to distribute the entries again in another place inside of a React component.

```js
function renderProduct(
  // these are considered as component-specific
  {id, name}, 
/* all other arguments are relevant for container component. Therefore, consolidate them into an array with rest operator */
...containerProps) { 
  // output 0815, choco, [{margin: "10px"}, {padding: "5px"}]
    console.log(id, name, containerProps); 
  /* unpack array again with spread operator to provide them as individual args */
  renderContainer(...containerProps); 

  }
function renderContainer(margin, padding) {
  // output {margin: "10px"}, {padding: "5px"}
  console.log(margin, padding); 
}
  const product = {
    id: "0815", name: "choco"
  }
  renderProduct(product, {margin: "10px"}, {padding: "5px"} );
```

---

## Function declarations, function expressions, and arrow functions

A [<VPIcon icon="fa-brands fa-firefox"/>function declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) looks like this:

```js
function getFood(index) {
  const food = ["", "", "", "", ""];
  return food[index];
}
```

In contrast, this is a [<VPIcon icon="fa-brands fa-firefox"/>function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function):

```js
const getFood = function(index) {
  const food = ["", "", "", "", ""];
  return food[index];
}
```

An [<VPIcon icon="fa-brands fa-firefox"/>arrow function expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) constitutes an alternative to the former two. Its advantage is in its syntactical sugar, which allows you to write functions in a more concise manner.

```js
const getFood = (index) => {
  const food = ["", "", "", "", ""];
  return food[index];
}
```

If you have only one parameter, you can skip the parentheses.

```js
const getFood = index =>  {
  const food = ["", "", "", "", ""];
  return food[index];
}
```

If your function does not accept any parameter, you need to use parentheses.

```js
const getFood = () =>  {
  return ["", "", "", "", ""];
}
```

If the function body consists of a single return statement, you can replace this explicit return with an implicit return, like so:

```js
const getFood = index =>  ["", "", "", "", ""][index];
```

Only with function declarations can you invoke functions before they have even been defined. This is because function declarations are hoisted, i.e., they are moved to the top of their scope before execution.

```js
console.log(getFoodDeclaration()); // ""
console.log(getFoodExp()); // ReferenceError: Cannot access 'getFoodExp' before initialization
console.log(getFoodArrow()); // ReferenceError: Cannot access 'getFoodArrow' before initialization
function getFoodDeclaration() {
  return "";
}
const getFoodExp = () =>  {
  return "";
}
const getFoodArrow = () =>  "";
```

Another difference between function declarations/expressions and arrow function expressions is the `this` keyword, which I’ll discuss in the context of classes.

---

## Classes

A [<VPIcon icon="fa-brands fa-firefox"/>class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/class) represents a blueprint for new objects. Variables and functions can be attached to a class and are called properties and methods, respectively. In the context of a class, the [<VPIcon icon="fa-brands fa-firefox"/>`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) keyword refers to the current instance. If you are coming from an object-oriented background, you most likely have some incorrect assumptions about it; [<VPIcon icon="fas fa-globe"/>this article](https://vojtechruzicka.com/javascript-this-keyword/) helps to demystify the `this` keyword.

A class can have a [<VPIcon icon="fa-brands fa-firefox"/>constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor) method, which represents a special kind of function to initialize new objects of the blueprint. You can instantiate the class with the [<VPIcon icon="fa-brands fa-firefox"/>`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new) keyword. With this, the constructor is invoked (or the default constructor, if you do not provide any), and a new object is created.

```js
class Fruit {
  // class body
  constructor() {
    // property
    this.popular = ""
  }
  whatsPopular() {
    // method body
    console.log(this.popular) ""
  }
}
// instantiate an object from the class
const fruit = new Fruit();
// call the method on the instance
fruit.whatsPopular();
```

Another crucial concept is [<VPIcon icon="fa-brands fa-firefox"/>inheritance with the class syntax](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance). With the [<VPIcon icon="fa-brands fa-firefox"/>`super`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) keyword, you can access the parent.

```js
class Food {
  constructor() {
    this.popular = ""
  }
}
class Fruit extends Food {
  constructor() {
    // required to call constructor of parent class
    // needs to be first statement in child constructor
    super();
    // override
    this.popular = ""
  }
  whatsPopular() {
    console.log(this.popular) // ""
  }
}
const fruit = new Fruit();
fruit.whatsPopular();
```

With [<VPIcon icon="fas fa-globe"/>ES2017](https://dotnetcurry.com/javascript/1405/es8-es2017-javascript-new-features), the syntax for using class properties and methods is a [little bit more concise (<VPIcon icon="fa-brands fa-medium" />`@charpeni`)](https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1). You can use arrow functions as methods, too.

```js
class Food {
  popular = "";
}
class Fruit extends Food {
  popular = "";
  // method by arrow function expression
  whatsPopular = () => {
    console.log(this.popular)
  };
}
const fruit = new Fruit();
fruit.whatsPopular();
```

Often, when you come across [<VPIcon icon="fa-brands fa-react"/>classes in React development](https://reactjs.org/docs/components-and-props.html#function-and-class-components), you will find the ES2017 syntax.

```jsx
// class-based React components must extend React.Component (or a subclass like React.PureComponent)
class Food extends React.Component {
  // define default React state with ES2017 property syntax
  state = {
    popular = ""
  }
  render() {
    // required method by every class-based React component
  }
}
```

Note that this section is by no means a complete explanation of JavaScript classes. In my opinion, you do not need to devote too much time to learning classes if your plan is to learn React. My recommended learning path for React beginners is to understand the basics of classes as presented here to be able to read and understand class-based React components.

I think understanding classes extensively for new React developers is not necessary because the importance of classes has decreased drastically since last year. This is related to the introduction of React Hooks.

Before then, it was only possible to have sophisticated React components with the class-based approach. Only with classes was it possible to define component state and use lifecycle methods. Hooks allow similar things with functional components, too. The whole React community is strongly pushing towards only using function components.

However, if you work on legacy projects with existing class-based components or if you come across some of the [<VPIcon icon="fa-brands fa-react"/>few use cases](https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes) that require you to use classes, or even if you just like to use classes (e.g., use a specific lifecycle method), then you need to understand the React-related class foundations.

Luckily, for React development, the relevant aspects of JavaScript classes are not very complicated. I like to use the ES2017 syntax for class components and arrow functions for methods because they [do not require (<VPIcon icon="fa-brands fa-medium" />`@joespinelli_6190`)](https://medium.com/@joespinelli_6190/using-arrow-functions-to-avoid-binding-this-in-react-5d7402eec64) use of the `bind()` method. The code gets more understandable.

Consider the first example, which requires a [<VPIcon icon="fa-brands fa-firefox"/>`bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind); otherwise, the invocation of `this.setState` causes an error.

```js
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
    // this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({ clicked: true }); // ERROR this.setState is not a function
  }
  render() {
    return (
      <div>
        <p>{this.state.clicked && "clicked"}</p>
        <button onClick={this.onClick}>click</button>
      </div>
    );
  }
}
```

With the ES2017 syntax, you can write more understandable class-based components. The reason is because arrow functions have a [<VPIcon icon="fas fa-globe"/>lexical `this`](https://hackernoon.com/javascript-es6-arrow-functions-and-lexical-this-f2a3e2a5e8c4), and its value within the arrow function is determined by the surrounding scope (in our case, the `render` method that has access to state with `this`).

```js
class Button extends React.Component {
  state = {
    clicked: false
  }  
  onClick = () => {
    this.setState({ clicked: true });
  }
  render() {
    return (
      <div>
        <p>{this.state.clicked && "clicked"}</p>
        <button onClick={this.onClick}>click</button>
      </div>
    );
  }
}
```

---

## Array functions

Mastering [<VPIcon icon="fa-brands fa-firefox"/>array functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) is an important skill for React developers. [<VPIcon icon="fa-brands fa-firefox"/>`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/map) is used in basically every React application, e.g., to loop over a list of food objects and render every single entry within an `li` tag.

The `map()` function produces a new array with the same number of elements. However, for every entry of the original entry, an operation was applied to produce new entries. The following example creates a new array with duplicated fruits for every entry.

```js
const fruits = ["", "", "", ""];
const moreFruits = fruits.map(f => `${f}${f}`);
console.log(moreFruits); // ["", "", "", ""]
```

[<VPIcon icon="fa-brands fa-firefox"/>`filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/filter) is often used with state management because it returns a brand-new array containing only those elements of the original array that pass a provided condition.

```js
const people = [
  { name: "Max", sex: "male" }, 
  { name: "Jacky", sex: "female" },
  { name: "Stephanie", sex: "female" }
];
const women = people.filter(person => person.sex === "female");
console.log(women); /*  [{ name: "Jacky", sex: "female" }, { name: "Stephanie", sex: "female"}] */..
```

[<VPIcon icon="fa-brands fa-firefox"/>`findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/findIndex) returns the index of the first element that passes the test; otherwise, it returns `-1`.

```js
const fruits = ["", "", "", "", ""];  
console.log(fruits.findIndex(fruit => fruit === "")); // 1
console.log(fruits.findIndex(fruit => fruit === "")); // -1
console.log(fruits.findIndex(fruit => fruit === "")); // 2 (first match)
```

[<VPIcon icon="fa-brands fa-firefox"/>`find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/find) returns the first entry that passes the test. This is useful in the context of React state management. As an example, we have a list of users. We clicked on a particular user in a list and want to display a modal dialog showing this user’s information.

```js
const users = [
  { id: 1, name: "Max", sex: "male" },
  { id: 2, name: "Jacky", sex: "female" },
  { id: 3, name: "Stephanie", sex: "female" }
];
function logUserInfo(id) {
  console.log(users.filter(user => user.id === id));
}
logUserInfo(2); // { id: 2, name: "Jacky", sex: "female" }
```

---

## Immutable vs. mutable values

This concept is important to understand. Immutable values and objects cannot be changed afterwards, so the original remains untouched. Primitive values like strings or numbers are immutable by nature. On the other hand, objects are mutable by default. Let’s take a look what this means.

```js
// immutable use case
// Change strings won't work. Throws error in strict mode
"use strict";
const hello = "world";
hello[0] = "W"; // try to upper case the first char
console.log(hello); // world (in none-strict mode)
```

A misguided mindset about mutability can lead to bugs.

```js
// mutability use case
const meal = {
  kind: "",
  origin: {
    country: "Italy"
  }
}
const fruit = {
  kind: "",
  origin: meal.origin
};
console.log(`${fruit.kind} from ${fruit.origin.country}`); //  " from Italy"
console.log(`${meal.kind} from ${meal.origin.country}`); //   " from Italy"
// we bought new grapes from Germany
fruit.origin.country = "Germany";
console.log(`${fruit.kind} from ${fruit.origin.country}`); //   " from Germany"
// we have caused an unwanted side effect
console.log(`${meal.kind} from ${meal.origin.country}`); //  " from Germany"
```

Objects are mutable, but you can use [<VPIcon icon="fa-brands fa-firefox"/>`Object.freeze()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) or third-party libraries like [<VPIcon icon="fas fa-globe"/>Immutable.js](https://immutable-js.github.io/immutable-js/) to make them immutable.

The React team recommends you use immutable objects in multiple areas of your application design, e.g., with [<VPIcon icon="fa-brands fa-react"/><VPIcon icon="fa-brands fa-stack-overflow"/>component-based](https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly) and [<VPIcon icon="fa-brands fa-react"/><VPIcon icon="fa-brands fa-stack-overflow"/>global state](https://reactjs.org/docs/hooks-reference.html#usereducer). This is because immutability typically leads to [<VPIcon icon="fa-brands fa-stack-overflow"/>multiple architectural benefits](https://stackoverflow.com/a/34385684). And that’s why most of the developer community suggests pursuing a coding mindset of immutablity.

I need to emphasize that mutation is not bad in itself. One problem with undisciplined mutation, however, is that it can lead to unexpected side effects, which are often the cause of unexpected bugs.

In React development, do not try to mutate state variables directly; rather, use the preferred method of the state management library. As an example, the following code snippet shows how you should and how you should not update the local state of a class-based React component.

```jsx
class Button extends React.Component {
  state = {
    clicked: false
  }  
  onClick = () => {
    //  don't do this
    this.state.clicked = true;
    //  instead do this: pass a new object to setState
    this.setState({ clicked: true });
  }
  render() {
    return (
      <div>
        <p>{this.state.clicked && "clicked"}</p>
        <button onClick={this.onClick}>click</button>
      </div>
    );
  }
}
```

If you use global state management tools like `useReducer` or [<VPIcon icon="iconfont icon-redux"/>Redux](https://redux.js.org/), you should update state like this.

```js
const newState = {
  ...state, // creates a copy of the current state
  darkMode: action.darkMode, // just override to reflect the changes
};
```

---

## Callback functions

A function passed as an argument to another function is called a [<VPIcon icon="fa-brands fa-wikipedia-w" />callback](https://en.wikipedia.org/wiki/Callback_(computer_programming)) if the function invokes the argument at a later time.

[<VPIcon icon="fa-brands fa-firefox"/>setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) gets a callback function as the first argument that is called after the timer has expired (second argument).

```js
window.setTimeout(() => console.log("I'm a callback function"), 1000); // after 1s: "I'm a callback function"
```

In the context of React, [<VPIcon icon="fa-brands fa-react"/>callback functions are often passed as props](https://reactjs.org/docs/faq-functions.html) to React components. Thereby, child components can execute passed callbacks at a later time in a way that parent components can react to it (e.g., update state and, thus, update the UI).

Callback functions are also important in the context of [<VPIcon icon="fa-brands fa-react"/>React Hooks](https://reactjs.org/docs/hooks-intro.html), e.g., to trigger side effects with [<VPIcon icon="fa-brands fa-react"/>`useEffect`](https://reactjs.org/docs/hooks-effect.html).

---

## Conclusion

Since React development consists mainly of writing vanilla JavaScript code, I recommend acquiring a good understanding of JavaScript fundamentals before learning React. With this learning path, you will have a much smoother start — I promise you.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "JavaScript concepts to master before learning React",
  "desc": "Before you dive into learning React, it makes good sense to master the common JavaScript patterns you'll see in virtually every React app.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/javascript-concepts-before-learning-react.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
