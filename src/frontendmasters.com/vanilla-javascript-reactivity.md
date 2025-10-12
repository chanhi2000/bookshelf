---
lang: en-US
title: "Patterns for Reactivity with Modern Vanilla JavaScript"
description: "Article(s) > Patterns for Reactivity with Modern Vanilla JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Patterns for Reactivity with Modern Vanilla JavaScript"
    - property: og:description
      content: "Patterns for Reactivity with Modern Vanilla JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/vanilla-javascript-reactivity.html
prev: /programming/js/articles/README.md
date: 2023-08-21
isOriginal: false
author:
  - name: Marc Grabanski
    url : https://frontendmasters.com/blog/author/marcgrabanski/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/40
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Patterns for Reactivity with Modern Vanilla JavaScript"
  desc="“Reactivity” is how systems react to changes in data. There are many types of reactivity, but for this article, reactivity is when data changes, you do things."
  url="https://frontendmasters.com/blog/vanilla-javascript-reactivity/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/40"/>

“Reactivity” is how systems react to changes in data. There are many types of reactivity, but for this article, reactivity is **when data changes, you do things**.

::: info Article Series

1. [Writing a TodoMVC App with Modern Vanilla JavaScript](https://frontendmasters.com/blog/vanilla-javascript-todomvc/)
<!-- TODO: /frontendmasters.com/vanilla-javascript-todomvc.md -->

```component VPCard
{
  "title": "Patterns for Reactivity with Modern Vanilla JavaScript",
  "desc": "“Reactivity” is how systems react to changes in data. There are many types of reactivity, but for this article, reactivity is when data changes, you do things.",
  "link": "/frontendmasters.com/vanilla-javascript-reactivity.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

3. [Patterns for Memory Efficient DOM Manipulation with Modern Vanilla JavaScript](https://frontendmasters.com/blog/patterns-for-memory-efficient-dom-manipulation/)
<!-- TODO: /frontendmasters.com/patterns-for-memory-efficient-dom-manipulation.md -->

:::

---

## Reactivity Patterns are Core to Web Development

We handle a lot with JavaScript in websites and web apps since the browser is an entirely asynchronous environment. We must respond to user inputs, communicate with servers, log, perform, etc. All these tasks involve updates to the UI, Ajax requests, browser URLs, and navigation changes, making cascading data changes a core aspect of web development.

As an industry, we associate reactivity with frameworks, but you can learn a lot by implementing reactivity in pure JavaScript. We can mix and match these patterns to wire behavior to data changes.

Learning core patterns with pure JavaScript will lead to less code and better performance in your web apps, no matter what tool or framework you use.

I love learning patterns because they apply to any language and system. Patterns can be combined to solve your app’s exact requirements, often leading to more performant and maintainable code.

Hopefully, you’ll learn new patterns to add to your toolbox, no matter what frameworks and libraries you use!

---

## PubSub Pattern (Publish Subscriber)

PubSub is one of the most foundational patterns for reactivity. Firing an event out with `publish()` allows anyone to listen to that event `subscribe()` and do whatever they want in a decoupled from whatever fires that event.

```js
const pubSub = {
  events: {},
  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
  publish(event, data) {
    if (this.events[event]) this.events[event].forEach(callback => callback(data));
  }
};

pubSub.subscribe('update', data => console.log(data));
pubSub.publish('update', 'Some update'); // Some update
```

Note the publisher has *no idea* of what is listening to it, so there is no way to unsubscribe or clean up after itself with this simple implementation.

### Custom Events: Native Browser API for PubSub

The browser has a JavaScript API for firing and subscribing to custom events. It allows you to send data along with the custom events using `dispatchEvent`.

```js
const pizzaEvent = new CustomEvent("pizzaDelivery", {
  detail: {
    name: "supreme",
  },
});

window.addEventListener("pizzaDelivery", (e) => console.log(e.detail.name));
window.dispatchEvent(pizzaEvent);
```

You can scope these custom events to any DOM node. In the code example, we use the global `window` object, also known as a global event bus, so anything in our app can listen and do something with the event data.

```html
<div id="pizza-store"></div>
```

```js
const pizzaEvent = new CustomEvent("pizzaDelivery", {
  detail: {
    name: "supreme",
  },
});

const pizzaStore = document.querySelector('#pizza-store');
pizzaStore.addEventListener("pizzaDelivery", (e) => console.log(e.detail.name));
pizzaStore.dispatchEvent(pizzaEvent);
```

### Class Instance Custom Events: Subclassing EventTarget

We can subclass EventTarget to send out events on a class instance for our app to bind to:

```js
class PizzaStore extends EventTarget {
  constructor() {
    super();
  }
  addPizza(flavor) {
    // fire event directly on the class
    this.dispatchEvent(new CustomEvent("pizzaAdded", {
      detail: {
        pizza: flavor,
      },
    }));
  }
}

const Pizzas = new PizzaStore();
Pizzas.addEventListener("pizzaAdded", (e) => console.log('Added Pizza:', e.detail.pizza));
Pizzas.addPizza("supreme");
```

The cool thing about this is your events aren’t firing globally on the window. You can fire an event directly on a class; anything in your app can wire up event listeners directly to that class.

---

## Observer Pattern

The observer pattern has the same basic premise as the PubSub pattern. It allows you to have behavior “subscribed” to a Subject. And when the Subject fires the `notify` method, it notifies everything subscribed.

```js :collapsed-lines
class Subject {
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  removeObserver(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log(data);
  }
}

const subject = new Subject();
const observer = new Observer();

subject.addObserver(observer);
subject.notify('Everyone gets pizzas!');
```

The main difference between this and PubSub is that the Subject knows about its observers and can remove them. They aren’t *completely* decoupled like in PubSub.

---

## Reactive Object Properties with Proxies

Proxies in JavaScript can be the foundation for performing reactivity after setting or getting properties on an object.

```js
const handler = {
  get: function(target, property) {
    console.log(`Getting property ${property}`);
    return target[property];
  },
  set: function(target, property, value) {
    console.log(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true; // indicates that the setting has been done successfully
  }
};

const pizza = { name: 'Margherita', toppings: ['tomato sauce', 'mozzarella'] };
const proxiedPizza = new Proxy(pizza, handler);

console.log(proxiedPizza.name); // Outputs "Getting property name" and "Margherita"
proxiedPizza.name = 'Pepperoni'; // Outputs "Setting property name to Pepperoni"`
```

When you access or modify a property on the `proxiedPizza`, it logs a message to the console. But you could imagine wiring any functionality to property access on an object.

### Reactive Individual Properties: `Object.defineProperty`

You can do an identical thing for a specific property using `Object.defineProperty`. You can define getters and setters for properties and run code when a property is accessed or modified.

```js
const pizza = {
  _name: 'Margherita', // Internal property
};

Object.defineProperty(pizza, 'name', {
  get: function() {
    console.log(`Getting property name`);
    return this._name;
  },
  set: function(value) {
    console.log(`Setting property name to ${value}`);
    this._name = value;
  }
});

// Example usage:
console.log(pizza.name); // Outputs "Getting property name" and "Margherita"
pizza.name = 'Pepperoni'; // Outputs "Setting property name to Pepperoni"`
```

Here, we’re using `Object.defineProperty` to define a getter and setter for the name property of the pizza object. The actual value is stored in a private `_name` property, and the getter and setter provide access to that value while logging messages to the console.

`Object.defineProperty` is more verbose than using a `Proxy`, especially if you want to apply the same behavior to many properties. But it’s a powerful and flexible way to define custom behavior for individual properties.

### Asynchronous Reactive Data with Promises

Let’s make using the observers asynchronous! This way we can update the data and have multiple observers run asynchronously.

```js :collapsed-lines
class AsyncData {
  constructor(initialData) {
    this.data = initialData;
    this.subscribers = [];
  }

  // Subscribe to changes in the data
  subscribe(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    this.subscribers.push(callback);
  }

  // Update the data and wait for all updates to complete
  async set(key, value) {
    this.data[key] = value;

    // Call the subscribed function and wait for it to resolve
    const updates = this.subscribers.map(async (callback) => {
      await callback(key, value);
    });

    await Promise.allSettled(updates);
  }
}
```

Here’s a class that wraps a data object and triggers an update when the data changes.

#### Awaiting Our Async Observers

Let’s say we want to wait until all subscriptions to our asynchronous reactive data are processed:

```js
const data = new AsyncData({ pizza: 'Pepperoni' });

data.subscribe(async (key, value) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Updated UI for ${key}: ${value}`);
});

data.subscribe(async (key, value) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`Logged change for ${key}: ${value}`);
});

// function to update data and wait for all updates to complete
async function updateData() {
  await data.set('pizza', 'Supreme'); // This will call the subscribed functions and wait for their promises to resolve
  console.log('All updates complete.');
}

updateData();`
```

Our `updateData` function is now async, so we can await all the subscribed functions to resolve before continuing our program. This pattern allows juggling asynchronous reactivity a bit simpler.

---

## Reactive Systems

Many more complex reactive systems are at the foundations of popular libraries and frameworks: hooks in React, Signals in Solid, Observables in Rx.js, and more. They usually have the same basic premise of when data changes, re-render the components or associated DOM fragments.

### Observables (Pattern of Rx.js)

Observables and Observer Pattern are not the same despite being nearly the same word, lol.

Observables allow you to define a way to produce a sequence of values over time. Here is a simple Observable primitive that provides a way to emit a sequence of values to subscribers, allowing them to react as those values are produced.

```js :collapsed-lines
class Observable {
  constructor(producer) {
    this.producer = producer;
  }

  // Method to allow a subscriber to subscribe to the observable
  subscribe(observer) {
    // Ensure the observer has the necessary functions
    if (typeof observer !== 'object' || observer === null) {
      throw new Error('Observer must be an object with next, error, and complete methods');
    }

    if (typeof observer.next !== 'function') {
      throw new Error('Observer must have a next method');
    }

    if (typeof observer.error !== 'function') {
      throw new Error('Observer must have an error method');
    }

    if (typeof observer.complete !== 'function') {
      throw new Error('Observer must have a complete method');
    }

    const unsubscribe = this.producer(observer);

    // Return an object with an unsubscribe method
    return {
      unsubscribe: () => {
        if (unsubscribe && typeof unsubscribe === 'function') {
          unsubscribe();
        }
      },
    };
  }
}
```

Here’s how you would use them:

```js
// Create a new observable that emits three values and then completes
const observable = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();

  // Optional: Return a function to handle any cleanup if the observer unsubscribes
  return () => {
    console.log('Observer unsubscribed');
  };
});

// Define an observer with next, error, and complete methods
const observer = {
  next: value => console.log('Received value:', value),
  error: err => console.log('Error:', err),
  complete: () => console.log('Completed'),
};

// Subscribe to the observable
const subscription = observable.subscribe(observer);

// Optionally, you can later unsubscribe to stop receiving values
subscription.unsubscribe();
```

The critical component of an Observable is the `next()` method, which sends data to the observers. A `complete()` method for when the Observable stream closes. And an `error()` method when something goes wrong. Also, there has to be a way to `subscribe()` to listen for changes and `unsubscribe()` to stop receiving data from the stream.

The most popular libraries that use this pattern are [<VPIcon icon="fas fa-globe"/>Rx.js](https://rxjs.dev/) and [<VPIcon icon="fas fa-globe"/>MobX](https://mobx.js.org/).

### “Signals” (Pattern of SolidJS)

Hat tip Ryan Carniato’s [<VPIcon icon="fas fa-globe"/>Reactivity with SolidJS course](https://frontendmasters.com/courses/reactivity-solidjs/).

```js :collapsed-lines
const context = [];

export function createSignal(value) {
  const subscriptions = new Set();

  const read = () => {
    const observer = context[context.length - 1]
    if (observer) subscriptions.add(observer);
    return value;
  }
  const write = (newValue) => {
    value = newValue;
    for (const observer of subscriptions) {
      observer.execute()
    }
  }

  return [read, write];
}

export function createEffect(fn) {
  const effect = {
    execute() {
      context.push(effect);
      fn();
      context.pop();
    }
  }

  effect.execute();
}
```

Using the reactive system:

```js
import { createSignal, createEffect } from "./reactive";

const [count, setCount] = createSignal(0);

createEffect(() => {
  console.log(count());
}); // 0

setCount(10); // 10
```

Here’s the complete code for his [vanilla reactivity system (<VPIcon icon="iconfont icon-github"/>`1Marc`)](https://gist.github.com/1Marc/09e739caa6a82cc176ab4c2abd691814) with a code sample that Ryan writes in his course.

### “Observable-ish” Values (Frontend Masters)

Our Frontend Masters video player has many configurations that could change anytime to modify video playback. Kai on our team created [“Observable-ish” Values (<VPIcon icon="iconfont icon-github"/>`FrontendMasters/observablish-values`)](https://github.com/FrontendMasters/observablish-values) (many years ago now, but we just published it for this article’s sake), which is another take on a reactive system in vanilla JavaScript.

It’s less than 100 lines of code and has stood the test of time! For 7+ years, this tiny bit of code has underpinned delivering millions of hours of video. It’s a mix of PubSub with the ability to have computed values by adding the results of multiple publishers together.

Here’s how you use the “Observable-ish” values. Publish changes to subscriber functions when values change:

```js
const fn = function(current, previous) {}

const obsValue = ov('initial');
obsValue.subscribe(fn);      // subscribe to changes
obsValue();                  // 'initial'
obsValue('initial');         // identical value, no change
obsValue('new');             // fn('new', 'initial')
obsValue.value = 'silent';   // silent update
```

Modifying arrays and objects will not publish, but replacing them will.

```js
const obsArray = ov([1, 2, 3]);
obsArray.subscribe(fn);
obsArray().push(4);          // silent update
obsArray.publish();          // fn([1, 2, 3, 4]);
obsArray([4, 5]);            // fn([4, 5], [1, 2, 3]);
```

Passing a function caches the result as the value. Any extra arguments will be passed to the function. Any observables called within the function will be subscribed to, and updates to those observables will recompute the value.

Child observables must be called; mere references are ignored. If the function returns a Promise, the value is assigned async after resolution.

```js
const a = ov(1);
const b = ov(2);
const computed = ov(arg => { a() + b() + arg }, 3);
computed.subscribe(fn);
computed();                  // fn(6)
a(2);                        // fn(7, 6)
```

---

## Reactive Rendering of UI

Here are some patterns for writing and reading from the DOM and CSS.

### Render Data to HTML String Literals

Here’s a simple example of rendering some pizza UI based on data.

```js :collapsed-lines
function PizzaRecipe(pizza) {
  return `<div class="pizza-recipe">
    <h1>${pizza.name}</h1>
    <h3>Toppings: ${pizza.toppings.join(', ')}</h3>
    <p>${pizza.description}</p>
  </div>`;
}

function PizzaRecipeList(pizzas) {
  return `<div class="pizza-recipe-list">
    ${pizzas.map(PizzaRecipe).join('')}
  </div>`;
}

var allPizzas = [
  {
    name: 'Margherita',
    toppings: ['tomato sauce', 'mozzarella'],
    description: 'A classic pizza with fresh ingredients.'
  },
  {
    name: 'Pepperoni',
    toppings: ['tomato sauce', 'mozzarella', 'pepperoni'],
    description: 'A favorite among many, topped with delicious pepperoni.'
  },
  {
    name: 'Veggie Supreme',
    toppings: ['tomato sauce', 'mozzarella', 'bell peppers', 'onions', 'mushrooms'],
    description: 'A delightful vegetable-packed pizza.'
  }
];

// Render the list of pizzas
function renderPizzas() {
  document.querySelector('body').innerHTML = PizzaRecipeList(allPizzas);
}

renderPizzas(); // Initial render

// Example of changing data and re-rendering
function addPizza() {
  allPizzas.push({
    name: 'Hawaiian',
    toppings: ['tomato sauce', 'mozzarella', 'ham', 'pineapple'],
    description: 'A tropical twist with ham and pineapple.'
  });

  renderPizzas(); // Re-render the updated list
}

// Call this function to add a new pizza and re-render the list
addPizza();`
```

`addPizza` demonstrates how to change the data by adding a new pizza recipe to the list and then re-rendering the list to reflect the changes.

The main drawback of this approach is you blow away the entire DOM on every render. You can more intelligently update only the bits of DOM that change using a library like [<VPIcon icon="fa-brands fa-npm"/>`lit-html`](https://npmjs.com/package/lit-html) ([<VPIcon icon="fas fa-globe"/>lit-html usage guide](https://lit.dev/docs/libraries/standalone-templates/)). We do this with several highly dynamic components on Frontend Masters, like our data grid component.

See examples of other approaches in the [Vanilla TodoMVC repo (<VPIcon icon="iconfont icon-github"/>`1Marc/modern-todomvc-vanillajs`)](https://github.com/1Marc/modern-todomvc-vanillajs) and associated [**Vanilla TodoMVC article**](/frontendmasters.com/vanilla-javascript-todomvc.md).

### Reactive DOM Attributes: MutationObserver

One way to make DOM reactive is to add and remove attributes. We can listen to changes in attributes using the `MutationObserver` API.

```js
const mutationCallback = (mutationsList) => {
  for (const mutation of mutationsList) {
    if (
      mutation.type !== "attributes" ||
      mutation.attributeName !== "pizza-type"
    ) return;

    console.log('old:', mutation.oldValue)
    console.log('new:', mutation.target.getAttribute("pizza-type"))
  }
}
const observer = new MutationObserver(mutationCallback);
observer.observe(document.getElementById('pizza-store'), { attributes: true });
```

Now we can update the pizza-type attribute from anywhere in our program, and the element itself can have behavior attached to updating that attribute!

### Reactive Attributes in Web Components

With Web Components, there is a native way to listen and react to attribute updates.

```js
class PizzaStoreComponent extends HTMLElement {
  static get observedAttributes() {
    return ['pizza-type'];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<p>${this.getAttribute('pizza-type') || 'Default Content'}</p>`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'my-attribute') {
      this.shadowRoot.querySelector('div').textContent = newValue;
      console.log(`Attribute ${name} changed from ${oldValue} to ${newValue}`);
    }
  }
}

customElements.define('pizza-store', PizzaStoreComponent);`
```

```html
<pizza-store pizza-type="Supreme"></pizza-store>
```

```js
document.querySelector('pizza-store').setAttribute('pizza-type', 'BBQ Chicken!');
```

This is a bit simpler, but we have to use Web Components to use this API.

### Reactive Scrolling: IntersectionObserver

We can wire reactivity to DOM elements scrolling into view. I’ve used this for slick animations on our marketing pages.

```js
var pizzaStoreElement = document.getElementById('pizza-store');

var observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    } else {
      entry.target.classList.remove('animate-in');
    }
  });
});

observer.observe(pizzaStoreElement);
```

Here’s an example [scrolling animation CodePen (<VPIcon icon="fa-brands fa-codepen"/>`1Marc`)](https://codepen.io/1Marc/pen/wvEKOEr) in very few lines of code using `IntersectionObserver`.

### Animation & Game Loop: requestAnimationFrame

When working with game development, Canvas, WebGL, or those wild marketing sites, animations often require writing to a buffer and then writing the results on a given loop when the rendering thread becomes available. We do this with `requestAnimationFrame`.

```js
function drawStuff() {
  // This is where you'd do game or animation rendering logic
}

// function to handle the animation
function animate() {
  drawStuff();
  requestAnimationFrame(animate); // Continually calls animate when the next render frame is available
}

// Start the animation
animate();
```

This is the method games and anything that involves real-time rendering use to render the scene when frames become available.

### Reactive Animations: Web Animations API

You can also create reactive animations with the Web Animations API. Here we will animate an element’s scale, position, and color using the animation API.

```js
const el = document.getElementById('animatedElement');

// Define the animation properties
const animation = el.animate([
  // Keyframes
  { transform: 'scale(1)', backgroundColor: 'blue', left: '50px', top: '50px' },
  { transform: 'scale(1.5)', backgroundColor: 'red', left: '200px', top: '200px' }
], {
  // Timing options
  duration: 1000,
  fill: 'forwards'
});

// Set the animation's playback rate to 0 to pause it
animation.playbackRate = 0;

// Add a click event listener to the element
el.addEventListener('click', () => {
  // If the animation is paused, play it
  if (animation.playbackRate === 0) {
    animation.playbackRate = 1;
  } else {
    // If the animation is playing, reverse it
    animation.reverse();
  }
});
```

What’s reactive about this is that the animation can play relative to where it is located when an interaction occurs (in this case, reversing its direction). Standard CSS animations and transitions aren’t relative to their current position.

### Reactive CSS: Custom Properties and `calc`

Lastly, we can write CSS that’s reactive by combining custom properties and `calc`.

```js
barElement.style.setProperty('--percentage', newPercentage);
```

In JavaScript, you can set a custom property value.

```css
.bar {
  width: calc(100% / 4 - 10px);
  height: calc(var(--percentage) * 1%);
  background-color: blue;
  margin-right: 10px;
  position: relative;
}
```

And in the CSS, we can now do calculations based on that percentage. It’s pretty cool that we can add calculations right into the CSS and let CSS do its job of styling without having to keep all that rendering logic in JavaScript.

FYI: You can also read these properties if you want to create changes relative to the current value.

```js
getComputedStyle(barElement).getPropertyValue('--percentage');
```

---

## The Many Ways to Achieve Reactivity

It’s incredible how many ways we can achieve reactivity using very little code in modern vanilla JavaScript. We can combine these patterns in any way we see fit for our apps to reactively render, log, animate, handle user events, and all the things that can happen in the browser.

::: note Frontend Masters Team

Next, check out the [<VPIcon icon="fas fa-globe"/>JavaScript Learning Path](https://frontendmasters.com/learn/javascript/) and learn JavaScript deeply from awesome instructors like Anjana Vakil, Will Sentance and Kyle Simpson! Or dive right into the most loved course on the platform, [<VPIcon icon="fas fa-globe"/>JavaScript: The Hard Parts](https://frontendmasters.com/courses/javascript-hard-parts-v2/)!

:::

::: info Article Series

1. [Writing a TodoMVC App with Modern Vanilla JavaScript](https://frontendmasters.com/blog/vanilla-javascript-todomvc/)
<!-- TODO: /frontendmasters.com/vanilla-javascript-todomvc.md -->

```component VPCard
{
  "title": "Patterns for Reactivity with Modern Vanilla JavaScript",
  "desc": "“Reactivity” is how systems react to changes in data. There are many types of reactivity, but for this article, reactivity is when data changes, you do things.",
  "link": "/frontendmasters.com/vanilla-javascript-reactivity.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

3. [Patterns for Memory Efficient DOM Manipulation with Modern Vanilla JavaScript](https://frontendmasters.com/blog/patterns-for-memory-efficient-dom-manipulation/)
<!-- TODO: /frontendmasters.com/patterns-for-memory-efficient-dom-manipulation.md -->

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Patterns for Reactivity with Modern Vanilla JavaScript",
  "desc": "“Reactivity” is how systems react to changes in data. There are many types of reactivity, but for this article, reactivity is when data changes, you do things.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/vanilla-javascript-reactivity.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
