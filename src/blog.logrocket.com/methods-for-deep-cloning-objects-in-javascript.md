---
lang: en-US
title: "Methods for deep cloning objects in JavaScript"
description: "Article(s) > Methods for deep cloning objects in JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Methods for deep cloning objects in JavaScript"
    - property: og:description
      content: "Methods for deep cloning objects in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/methods-for-deep-cloning-objects-in-javascript.html
prev: /programming/js/articles/README.md
date: 2020-10-01
isOriginal: false
author:
  - name: Alexander Nnakwue
    url : https://blog.logrocket.com/author/alexandernnakwue/
cover: /assets/image/blog.logrocket.com/methods-for-deep-cloning-objects-in-javascript/banner.png
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
  name="Methods for deep cloning objects in JavaScript"
  desc="There are several ways to shallow clone objects in JavaScript, but deep cloning objects is trickier. We highlight several methods to do so."
  url="https://blog.logrocket.com/methods-for-deep-cloning-objects-in-javascript"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/methods-for-deep-cloning-objects-in-javascript/banner.png"/>

## Introduction

In JavaScript, objects are like a store or collection of key-value pairs. They are a kind of [<VPIcon icon="fa-brands fa-firefox"/>structural data type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures), which can be seen as a collection of properties. These properties can either be values of other data types, including primitive types like `Boolean`, `Number`, `undefined`, etc., or even other objects. Therefore, with objects, we can build even more complex data structures.

![Methods for Deep Cloning Objects in JavaScript](/assets/image/blog.logrocket.com/methods-for-deep-cloning-objects-in-javascript/banner.png)

Due to the nature of objects in JS, they are usually stored in memory and can only be copied by reference. This means that a variable does not store an object in itself, but rather an identifier, which represents an address or a reference to that particular object in memory. As such, objects cannot be treated in the same way as primitives.

With primitive data types, once variables are assigned, they cannot be copied over. Therefore, changing the value of the variable never changes the underlying primitive type. This means it is impossible to change the values of these types once they are assigned to a variable — a concept known as immutability. However, they can be combined together to derive new values.

Objects, on the other hand, are mutable data types. In this article, we will explore ways of modifying or mutating objects in JavaScript. This entails performing either shallow or deep cloning or copying with respect to general object behavior.

---

## Introducing object behavior

To reiterate, objects are reference types, and as such, when we copy an object variable, we are indirectly creating one more reference to the same object stored somewhere else in the computer’s memory. Therefore, when an object variable is copied, only a reference to the object is copied — the actual object is not!

Let’s look at an example to understand this concept better:

```js
let user = { name: "Alexander" } 

// this instead copies a reference to the previous object 
let newUser = user
```

In the above example, we have two variables, each making reference to the same object in memory. In this case, the variable `newUser` has a reference to the initially declared `user` variable in memory. Note that this is only possible for reference types like objects and arrays; for primitive types like a string or a Boolean, this is not the case.

::: note

We can make use of the `Object.is()` method to determine whether the two values are actually the same value. Running `console.log(Object.is(user, newUser))` on the browser console should return the Boolean value `true`.

:::

---

## Object copying methods

JavaScript offers many ways of copying objects, but they do not provide a deep copy. Performing shallow copies is the default behavior in most of the cases.

We should note that ES6 provides two shorter syntaxes for shallow copying objects in the language. They include [<VPIcon icon="fa-brands fa-firefox"/>`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)` and the [<VPIcon icon="fa-brands fa-firefox"/>spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax), which copies values of all [<VPIcon icon="fa-brands fa-firefox"/>enumerable own properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties). from one object to another.

::: note

A shallow copy successfully copies [<VPIcon icon="fas fa-globe"/>primitive types](https://flaviocopes.com/javascript-types/#primitive-types) like numbers and strings, but any object reference will not be recursively copied, but instead the new, copied object will reference the same initial object.

<SiteInfo
  name="JavaScript Types"
  desc="You might sometimes read that JS is untyped, but that's incorrect. It's true that you can assign all sorts of different types to a variable, but JavaScript has types. In particular, it provides primitive types, and object types."
  url="https://flaviocopes.com/javascript-types/"
  logo="https://flaviocopes.com/img/favicon-16x16.png"
  preview="https://flaviocopes.com/og.jpg"/>

:::

Let’s look at them one after the other:

### Copying an object with the `Object.assign()` method

Among the [<VPIcon icon="fa-brands fa-firefox"/>object constructor methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#), `Object.assign()` is used to copy the values and properties from one or more source objects to a target object. It returns the target object, which has properties and values copied from the source object.

Since `Object.assign()` copies property values, it is unsuitable for deep cloning. Basically, we can use this method for shallow cloning an object and for merging two or more objects into one bigger object with the same properties.

#### Syntax

```js
const copied = Object.assign(target, ...sources)
```

::: note

In using this method, if we have matching keys in both target and source objects, the matching keys in the second object would override the first one after cloning.

:::

#### Parameters

- `target`: target object to which values and properties are copied
- `sources`: source object from which values and properties are copied

#### Return value

- This method returns the target object.

Now, let’s look at a very simple example of using this method to merge two objects together:

```js
let objectA = {a: 1, b: 2}
let objectB = {c: 3, d: 4}

Object.assign(objectA, objectB)

console.log(objectA);
// → { a: 1, b: 2, c: 3, d: 4 }
```

Here, the target object is `objectA`, while the source object is `objectB`. Using `object.assign()` is similar to using the lodash `clone` method for shallow copying objects. Let’s look at another example:

```js
const clone = require('lodash.clone')
var objA = { 
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
}
var objB = clone(objA)
objA.b.c = 30
console.log(objA)
// { a: 1, b: { c: 30, d: { e: 3 } } }
console.log(objB)
// { a: 1, b: { c: 30, d: { e: 3 } } }
```

Being a shallow copy, values are cloned and object references are copied —not the objects themselves. So if we edit an object property in the original object, it is also modified in the copied object since the referenced inner object is the same in this case.

### Copying an object with the spread syntax

The [spread operator (<VPIcon icon="iconfont icon-github"/>`tc39/proposal-object-rest-spread`)](https://github.com/tc39/proposal-object-rest-spread) is an ES2018 feature that adds [<VPIcon icon="fa-brands fa-firefox"/>spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) properties to object literals. It provides a very convenient way to perform a shallow clone, equivalent to what `Object.assign()` does. With objects, the spread operator is used to create copies of existing objects with new or updated values.

It copies enumerable properties from a provided object onto a new object. Let’s see an example usage, as per the syntax:

```js
const copied = { ...original }
```

Now let’s look at a real-world example:

```js
const objA = { 
  name: 'Alexander', 
  age: 26, 
}

const objB = { 
  Licensed: true, 
  location: "Ikeja" 
}

const mergedObj = {...objA, ...objB}
console.log(mergedObj) 

// { name: 'Alexander', age: 26, Licensed: true, location: 'Ikeja' }
```

From the above, we can see that `mergedObj` is a copy of `objA` and `objB`. Actually, every enumerable property on the objects will be copied to the final `mergedObj` object. The spread operator is just a shorthand for the `Object.assign()` method, but there are some subtle differences between the two, including the fact that `Object.assign()` triggers [<VPIcon icon="fa-brands fa-firefox"/>`setters`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set), whereas the spread operator does not.

::: note

If an object references other objects when performing a shallow copy of the object, we copy the references to the external object. When performing a deep copy, those external objects are copied as well, so the new cloned object is completely independent from the old one.

:::

### Recommended method for deep cloning objects in JavaScript

Most of the time, when we decide to copy objects in our program, our intent is to actually copy by reference, which is more or less making a shallow copy of the object. However, when it comes to deeply nested objects, the behavior of `Object.assign()` or `spread` is different.

In essence, there is no one consistent way of cloning or copying objects in the language, regardless of their structure, in terms of how the objects are constructed.

A question that arises here is copying deeply nested objects up to, say, two or three levels deep in such a way that if we make changes to the new object, it doesn’t affect the original object acting as our target. So how do we correctly deep clone an object?

To perform a deep copy, our best bet is to rely on a library that’s well tested, popular, and well maintained by the community: Lodash. Lodash offers both `clone` and `cloneDeep` functions to perform shallow and deep cloning, respectively.

For example, when deep copying objects in Node.js, we can make use of the [<VPIcon icon="fas fa-globe"/>Lodash](https://lodash.com/docs/4.17.10#cloneDeep) `cloneDeep()` method. An example is shown below:

```js :collapsed-lines
const cloneDeep = require('lodash.clonedeep')

let objA = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
}

// copy objA save as new variable objB
let objB = cloneDeep(objA)

// change the values in the original object objA
objA.a = 20
objA.b.c = 30
objA.b.d.e = 40

console.log(JSON.stringify(objA))
// → {"a":20,"b":{"c":30,"d":{"e":40}}}

// objB which is the cloned object is still the same
console.log(JSON.stringify(objB))
// → {"a":1,"b":{"c":2,"d":{"e":3}}}
```

The Lodash `cloneDeep()` method is similar to `clone`, except that it recursively clones `value` while preserving object inheritance. The great thing about the library is that we can import each function individually — no need to import the entire library into our project. This can greatly reduce the size of our program dependencies.

In order to make use of Lodash clone methods in Node.js, we can install it by running `npm i lodash.clonedeep` for deep clone and `npm i lodash.clone` for shallow clone. We can use it like so:

```js
const clone = require('lodash.clone')
const cloneDeep = require('lodash.clonedeep')

const shallowCopy = clone(originalObject)
const deepCopy = clonedeep(originalObject)
```

::: note

Copying objects derived from built-in JavaScript objects will result in extra, unwanted properties.

:::

### Native deep cloning

The HTML standard includes [<VPIcon icon="fas fa-globe"/>**an internal structured cloning/serialization algorithm**](https://html.spec.whatwg.org/multipage/structured-data.html#safe-passing-of-structured-data) that can create deep clones of objects. Although still limited to certain built-in types, it can preserve references within the cloned data, allowing support for cyclical and recursive structures that would otherwise cause errors with JSON.

With support in Node.js still experimental, the `v8` module [<VPIcon icon="fa-brands fa-node"/>exposes the structured serialization API directly](https://nodejs.org/api/all.html#v8_serialization_api). For example, cloning an object is as simple as:

```js
const v8 = require('v8');

const structuredClone = obj => {
  return v8.deserialize(v8.serialize(obj));
};
```

::: info

More details can be found [<VPIcon icon="fa-brands fa-node"/>here](https://nodejs.org/api/all.html#v8_serialization_api).

```component VPCard
{
  "title": "Node.js v23.6.0 Documentation",
  "desc": "",
  "link": "https://nodejs.org/api/all.html#v8_serialization_api/",
  "logo": "https://nodejs.org/favicon.ico",
  "background": "rgba(4144,185,110,0.2)"
}
```

:::

### Other object cloning methods

#### Iterating through each object property and copying it into a new empty object

This involves iterating through a source object’s properties and copying all of them one after the other to a target object. The idea is to create a new object and replicate the structure of the existing one by iterating over its properties and copying them.

Let’s see an example:

```js :collapsed-lines
let user = {
  name: "Alexander",
  age: 26
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  if (user.hasOwnProperty(key)) {
    clone[key] = user[key];
  }
}

// now clone is a fully independent object with the same content
clone.name = "Chinedu"; // changed the data 

console.log(user.name); // still Alexander in the original object
```

#### Cloning Objects using JSON.parse/stringify

This offers a very fast way of deep cloning objects. However, it is not very reliable and standard as it comes with some data loss along the way.

Using this method, the source object *must* be JSON-safe. If we do not use `Date`, `undefined`, `Infinity`, functions, regexps, maps, sets, or other complex types within our object, a very simple way to deep clone an object is by using:

```js
JSON.parse(JSON.stringify(object))
```

Let’s look at an example:

```js :collapsed-lines
const a = {
  string: 'string',
  number: 123,
  bool: false,
  nul: null,
  date: new Date(),  // string
  undef: undefined,  // lost
  inf: Infinity,  // 'null'
  re: /.*/,  // lost
}

console.log(typeof a.date) // returns  object

const clone = JSON.parse(JSON.stringify(a))

console.log(typeof clone.date)  // returns string 

console.log(clone)
// 
// {
//   string: 'string',
//   number: 123,
//   bool: false,
//   nul: null,
//   date: '2020-09-28T15:47:23.734Z',
//   inf: null,
//   re: {}
// }
```

::: note

This method needs some sort of exception handling to keep it safe in case the source object can not be converted to JSON.

:::

---

## Conclusion

By default, JavaScript always passes by value, which means changing the value of the variable never changes the underlying primitive type. However, for non-primitive data types (arrays, functions, and objects), which are passed by reference, we can always mutate the data, causing a single object value to have different content at different times.

Cloning a JavaScript object is a task that is used mostly because we do not want to create the same object if it already exists. As we are now aware, objects are assigned and copied by reference. In other words, a variable stores not the object value, but a reference. Therefore, copying such a variable or passing it as a function argument copies that reference, not the object.

For simple objects that only store primitive types like numbers and strings, shallow copying methods discussed earlier will work. A shallow copy means the first level is copied, and deeper levels are referenced. However, if the object properties reference other nested objects, the actual object won’t be copied, as we would only be copying the reference.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Methods for deep cloning objects in JavaScript",
  "desc": "There are several ways to shallow clone objects in JavaScript, but deep cloning objects is trickier. We highlight several methods to do so.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/methods-for-deep-cloning-objects-in-javascript.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
