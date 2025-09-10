---
lang: en-US
title: "Immer and Immutable.js: How do they compare?"
description: "Article(s) > Immer and Immutable.js: How do they compare?"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Immer and Immutable.js: How do they compare?"
    - property: og:description
      content: "Immer and Immutable.js: How do they compare?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/immer-and-immutable-js-how-do-they-compare.html
prev: /programming/js-node/articles/README.md
date: 2021-01-12
isOriginal: false
author:
  - name: Elizabeth Amaechi
    url : https://blog.logrocket.com/author/elizabethamaechi/
cover: /assets/image/blog.logrocket.com/immer-and-immutable-js-how-do-they-compare/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Immer and Immutable.js: How do they compare?"
  desc="Should you use Immer or Immutable.js to achieve immutability in your code? Check out this guide to make the right decision."
  url="https://blog.logrocket.com/immer-and-immutable-js-how-do-they-compare"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/immer-and-immutable-js-how-do-they-compare/banner.png"/>

Immutability is not a new concept in programming. It serves as the basis for programming paradigms, such as pure functional programming. The whole idea is to avoid direct change to data after it has been created.

![The Immer and Immutable.js logos.](/assets/image/blog.logrocket.com/immer-and-immutable-js-how-do-they-compare/banner.png)

Below is a breakdown of what we’re going to discuss in this article:

- Immutability in JavaScript
- An introduction to Immer and Immutable.js libraries
- A comparison between Immer and Immutable.js

---

## Immutability in JavaScript

JavaScript primitives like strings and numbers are known to be immutable. This is true because strings, for instance, can’t be changed by any method or operation. You can only create new strings.

Let’s consider the variable below:

```js
var name = "mark cuban"
name = "John Steve"
```

You could argue that the data is mutable because the name variable was reassigned to another string, but this is not the case.

Reassignment is different from immutability. This is because even though the variable was reassigned, it didn’t change the fact that the string “Eze Sunday” exists. It’s the same reason why adding 3 to 13 wouldn’t change the original variable 13, or you turning 18 doesn’t change the fact that you were 17 before.

Even though variables may be reassigned, the immutable data still remains the same.

We’ve established from the example above that primitives are immutable, but that isn’t the end of the story. There are data structures in JavaScript that are mutable. One of them is arrays.

To demonstrate this, let’s declare a variable and set its value to be an empty array as shown below:

```js
let arrOne = []
```

We can easily update the content of the above array by using the `.push()` function:

```js
arrOne.push(2)
```

This will add the data, 2, to the end of the array, altering the original array that we previously had.

### Intro to the Immer and Immutable.js libraries

JavaScript wasn’t written for its data to be exclusively immutable, but there are instances where you need an immutable array or map to easily keep track or keep a record of changes in a data set.

This is evident in the React framework, especially when dealing with states and props. This is where immutability libraries kick in. These libraries help optimize our application, making it easier to track changes in our application. In this article, will be looking at two major immutability libraries. Namely, Immer and Immutable.js.

---

## Immer

[<VPIcon icon="fas fa-globe"/>Immer](https://immerjs.github.io/immer/docs/introduction)is one of the many immutability libraries out there that you can use in your application. According to its official website, Immer is based on the copy-on-write mechanism. The whole idea revolves around applying changes to a temporary `draftState`, which serves as a proxy to the current state. Immer will let you easily interact with your data while keeping all the benefits that come with immutability.

### Installation

To use Immer instantly in your application use the following command:

```html
<script src="https://cdn.jsdelivr.net/npm/immer"></script>
```

It can also be installed in your application using NPM;

::: code-tabs#sh

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm install immer
```

@tab <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add immer
```

:::

### Usage

With Immer, most immutability works are done with the help of a default function:

```js
produce(currentState, producer: (draftState) => void): nextState
```

This function takes in the `currentState` and `draftState` and updates the `nextState` to reflect changes made to the `draftState`.

::: tip Example

Consider the code below:

```js
import produce from "immer"
const baseState = [
  {
    todo: "Learn typescript",
    done: true
  },
  {
    todo: "Try immer",
    done: false
  }
]
```

New data can be added to the state using the Immer default function, as follows:

```js
const nextState = produce(baseState, draftState => {
  draftState.push({ todo: "Tweet about it" })
  draftState[1].done = true
})
```

The `baseState` in this case stays untouched, while the `nextState` would be updated to reflect changes made to `draftState`. You can learn more about Immer from its official website [<VPIcon icon="fas fa-globe"/>here](https://immerjs.github.io/immer/docs/introduction).

---

## Immutable.js

[<VPIcon icon="fas fa-globe"/>Immutable.js](https://immutable-js.github.io/immutable-js)is another option to consider when looking for an immutability library. Immutable.js serves the same purpose as Immer, but it takes a different approach. It provides you with an API for data structures like maps and lists.

### Installation

Immutable.js can be installed using npm:

```sh
npm install immutable
```

::: tip Example

We can perform mapping operations with Immutable.js by requiring `map` from the installed package and making use of it, like this:

```js
const { Map } = require('immutable');

const map1 = Map({ a: 1, b: 2, c: 3 });

const map2 = map1.set('b', 50);

map1.get('b') + " vs. " + map2.get('b'); // 2 vs. 50
```

From the example above, our object `{ a: 1, b: 2, c: 3 }` is wrapped with the `Map()` function. we went on to perform `get` and `set` operations on it while keeping the data Immutable.

:::

In addition to objects, we can create immutable arrays using the `List` function as shown below:

```js
List(['apple','orange','grape'])
```

The above is an array implementation in Immutable.js using the `List` function.

`fromJS function` helps bypass the need for wrapping our objects and arrays with `Map({})` and `List([])` functions by converting them directly into immutable data.

```js
fromJS(['apple','orange','grape'])
```

The above converts the array directly into immutable data.

### Immer v. Immutable.js: Which should you choose?

Now here is the big question: which should you choose between these two libraries? To start, let’s list out the benefits and downsides to these libraries individually. We’ll start with Immer.

---

## Benefits that comes with Immer

There are lots of benefits that come with using Immer as opposed to making use of other libraries like Immutable.js. Some of these include:

- Boilerplate reduction: With Immer, you write more precise code with no extra boilerplate, leading to an overall reduction in codebase
- Immutability works with normal JavaScript data types and structures: Immer allows for the use of normal JavaScript, objects, maps and arrays without any need to learn a new API
- Immer is strongly typed with no string-based paths selectors
- Support for patches

### Downsides to Immer as a library

There are a couple things that make using Immer difficult. For one thing, you need an environment that supports proxy objects to use Immer. Also, Immer does not provide support for complex object types like class instance.

### Benefits that comes with Immutable.js

Just like Immer, Immutable.js has its benefits. Some of them includes:

- In addition to other conventional javaScript data structures, Immer provides you with data structures that are not native to JavaScript. Some of them include ordered maps and record
- Immutable,js lets you know the precise data that have been changed in your reducer, making development easier
- Immutable.js writes data at record speed when compared to other immutable libraries

### Downsides to Immutable.js

Though Immutable.js is fast at writing data, it is much slower when performing read operations.

Also, Immutable.js forces you to learn new and sometimes complex syntax and APIs just to perform basic operations. For instance, adding an extra data to an array will require the use of a `.set()` method, which isn’t traditional for JavaScript.

Immutable.js also forces you to use a unique construction type everywhere in your application. This means that for every immutable collection that you construct, you must make use of the appropriate Immutable.js collection rather than the traditional ones. This can cause a lot of stress, especially when migrating your code to another codebase that doesn’t use these collections.

Immer, on the other hand, offers roughly the same thing with much more flexibility. This is why many developers stick with it. It lets you create collections with classical objects that you’re already used to.

---

## Conclusion

If you need faster writing speed in your application, you can go for Immutable.js. On the other hand, if you want to write less code while sticking with traditional JavaScript data structures and object types, then Immer is for you.

Overall, both Immer and Immutable.js are great libraries that you should try using in your application.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Immer and Immutable.js: How do they compare?",
  "desc": "Should you use Immer or Immutable.js to achieve immutability in your code? Check out this guide to make the right decision.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/immer-and-immutable-js-how-do-they-compare.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
