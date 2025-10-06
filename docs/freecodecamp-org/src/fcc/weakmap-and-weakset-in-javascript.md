---
lang: en-US
title: "How to Use WeakMap and WeakSet in JavaScript"
description: "Article(s) > How to Use WeakMap and WeakSet in JavaScript"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use WeakMap and WeakSet in JavaScript"
    - property: og:description
      content: "How to Use WeakMap and WeakSet in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/weakmap-and-weakset-in-javascript.html
prev: /programming/js/articles/README.md
date: 2024-06-08
isOriginal: false
author:
  - name: Joan Ayebola
    url : https://freecodecamp.org/news/author/joanayebola/
cover: https://freecodecamp.org/news/content/images/size/w2000/2024/06/Ivory-and-Blue-Lavender-Aesthetic-Photo-Collage-Presentation.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use WeakMap and WeakSet in JavaScript"
  desc="JavaScript offers a number of tools for organizing and managing data. And while developers often use widely recognized tools like Maps and Sets, they may often overlook certain other valuable resources.  For example, are you familiar with WeakMap and..."
  url="https://freecodecamp.org/news/weakmap-and-weakset-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/size/w2000/2024/06/Ivory-and-Blue-Lavender-Aesthetic-Photo-Collage-Presentation.png"/>


JavaScript offers a number of tools for organizing and managing data. And while developers often use widely recognized tools like Maps and Sets, they may often overlook certain other valuable resources.

For example, are you familiar with WeakMap and WeakSet? They're special tools in JavaScript that help store and manage data in unique ways.

This article explores WeakMap and WeakSet in a clear and comprehensive way. We'll start by understanding the concept of weak references and how they differ from traditional data structures. Then, we'll dive deeper into each concept, explaining what they are, how to create them, and the methods they offer.

Along the way, we'll see practical examples of how WeakMap and WeakSet can streamline your code and unlock new possibilities.

Whether you're a JavaScript pro or just starting out, understanding WeakMap and WeakSet empowers you to write cleaner, more efficient code.

---

## What is a WeakMap?

WeakMap is a built-in JavaScript data structure introduced in ECMAScript 6 (ES6). It's meant for storing key-value pairs where the keys must be objects and the values can be arbitrary.

It differs from a regular Map in that it allows for weak references to its keys. This means that if an object is used as a key and there are no other references to it, it can be garbage collected.

### Key Characteristics of WeakMap

#### Object-only Keys

WeakMap accepts only objects as keys. If you attempt to use a non-object key, such as a string or number, it will result in a TypeError.

```js
const weakMap = new WeakMap();
const key = {}; // Valid key, as it's an object
const invalidKey = 'string'; // Invalid key, as it's not an object
weakMap.set(key, 'value'); // This will work
weakMap.set(invalidKey, 'value'); // TypeError: Invalid value used as weak map key
```

#### Garbage Collection of Keys

WeakMap allows keys to be garbage collected when there are no other references to them. This means that if an object used as a key in a WeakMap is no longer referenced anywhere else in the program, it can be automatically removed from the WeakMap.

```js
let key = {name: 'John'};
const weakMap = new WeakMap();
weakMap.set(key, 'value');
key = null; // Removing the reference to the key
// At this point, since there are no other references to the key object,
// it can be garbage collected, and the key-value pair in the WeakMap will be automatically removed
```

#### No Enumeration of Keys

Unlike regular Map objects, WeakMap does not expose methods for enumerating its keys, such as `keys()`, `values()`, or `entries()`. This is because the keys might be subject to garbage collection, and exposing them would prevent their collection.

```js
const weakMap = new WeakMap();
const key = {};
weakMap.set(key, 'value');
console.log(weakMap.keys()); // TypeError: weakMap.keys is not a function
```

#### No Size Property

WeakMap does not have a `size` property like regular Map objects. Again, this is because the size of the WeakMap could change as keys are garbage collected.

```js
const weakMap = new WeakMap();
console.log(weakMap.size); // undefined
```

#### Memory Management

WeakMap is particularly useful in scenarios where you need to associate additional data with objects but do not want to prevent those objects from being garbage collected when they are no longer needed. This makes it useful for caching, private data storage, and other memory-sensitive operations.

---

## How to Create a WeakMap using the `new WeakMap()` Constructor

Creating a WeakMap using the `new WeakMap()` constructor is straightforward. Here's how you can do it:

Firstly, let's break down the syntax of creating a WeakMap using the `new WeakMap()` constructor:

```js
const weakMap = new WeakMap();
```

- `new WeakMap()`: This is the constructor call that creates a new instance of WeakMap.
- `const weakMap`: This declares a variable named `weakMap` to hold the reference to the newly created WeakMap instance.
- `=`: This is the assignment operator, which assigns the newly created WeakMap instance to the variable `weakMap`.

Now, let's create a WeakMap example:

::: tip Example

```js
// Creating a new WeakMap
const weakMap = new WeakMap();

// Creating objects to use as keys
const user1 = { id: 1 };
const user2 = { id: 2 };

// Setting key-value pairs in the WeakMap
weakMap.set(user1, 'John');
weakMap.set(user2, 'Alice');

// Retrieving values from the WeakMap
console.log(weakMap.get(user1)); // Output: John
console.log(weakMap.get(user2)); // Output: Alice

// Deleting a key-value pair from the WeakMap
weakMap.delete(user1);

// Trying to retrieve the value after deletion
console.log(weakMap.get(user1)); // Output: undefined
```

In this example:

- We create a new WeakMap instance using the `new WeakMap()` constructor.
- Two objects `user1` and `user2` are created to serve as keys in the WeakMap.
- Key-value pairs are set in the WeakMap using the `set()` method, associating each user object with a corresponding name.
- We retrieve the values associated with `user1` and `user2` using the `get()` method.
- Then, we delete the key-value pair associated with `user1` using the `delete()` method.
- Finally, we attempt to retrieve the value associated with `user1` again, which returns `undefined` since the key-value pair has been deleted.

:::

::: note

Remember that WeakMap only accepts objects as keys. If you try to use a non-object as a key, it will result in a TypeError.

Also, WeakMap does not support methods like `keys()`, `values()`, or `entries()`, nor does it have properties like `size`. This is because WeakMap keys may be subject to garbage collection, and exposing them would interfere with this process.

:::

---

## Common Use Cases for WeakMap

WeakMap is a specialized data structure in JavaScript designed for specific use cases where you need to associate additional data with objects without preventing those objects from being garbage collected.

Here are some common scenarios where WeakMap is particularly useful:

### Private Data Storage

WeakMap can be used to store private data associated with objects. This is often used in libraries or frameworks to attach private data to objects without exposing it to the outside world.

Since WeakMap keys are weakly held, the private data will be automatically removed when the object is garbage collected.

```js
const privateData = new WeakMap();

class MyClass {
  constructor() {
    privateData.set(this, { secret: 'my secret data' });
  }

  getSecretData() {
    return privateData.get(this).secret;
  }
}

const obj = new MyClass();
console.log(obj.getSecretData()); // Output: my secret data
```

### Caching Mechanism:

WeakMap can be used for caching data where the cached values can be garbage collected if they are no longer needed.

This can be particularly useful in scenarios where you want to cache data associated with specific objects or computations but want to ensure that the cache does not prevent those objects from being garbage collected when they are no longer needed.

```js
const cache = new WeakMap();

function expensiveCalculation(obj) {
  if (!cache.has(obj)) {
    const result = // perform expensive calculation
    cache.set(obj, result);
  }
  return cache.get(obj);
}

const data = { /* some data */ };
console.log(expensiveCalculation(data)); // Performs expensive calculation
console.log(expensiveCalculation(data)); // Returns cached result
```

### DOM Element Management:

WeakMap can be used to keep track of DOM elements without preventing them from being garbage collected when they are removed from the DOM.

This is particularly useful in scenarios where you want to associate additional data or behavior with DOM elements but want to ensure that those associations do not prevent the elements from being properly cleaned up when they are no longer needed.

```js
const elementData = new WeakMap();

function attachEventListener(element, callback) {
  element.addEventListener('click', callback);
  elementData.set(element, { callback });
}

function detachEventListener(element) {
  const data = elementData.get(element);
  if (data) {
    element.removeEventListener('click', data.callback);
    elementData.delete(element);
  }
}

const button = document.getElementById('myButton');
attachEventListener(button, () => {
  console.log('Button clicked');
});
```

### Memoization:

WeakMap can be used for memoization in functions where the cached values can be automatically cleared if they are no longer needed.

This is useful in scenarios where you want to cache the results of expensive function calls but want to ensure that the cache does not grow indefinitely and consume excessive memory.

```js
const memoizationCache = new WeakMap();

function memoizedFunction(obj) {
  if (!memoizationCache.has(obj)) {
    const result = // perform expensive computation
    memoizationCache.set(obj, result);
  }
  return memoizationCache.get(obj);
}

const data = { /* some data */ };
console.log(memoizedFunction(data)); // Performs expensive computation
console.log(memoizedFunction(data)); // Returns cached result
```

---

## Methods of WeakMap

WeakMap in JavaScript has a limited set of methods compared to other data structures like Map.

Here are the methods available for WeakMap:

### `set(key, value)`

This method sets a new key-value pair in the WeakMap. The key must be an object, and the value can be any data type.

```js
const weakMap = new WeakMap();
const key = {};
weakMap.set(key, 'value');
```

### `get(key)`

This method retrieves the value associated with the specified key in the WeakMap. If the key is not found, it returns undefined.

```js
const weakMap = new WeakMap();
const key = {};
weakMap.set(key, 'value');
console.log(weakMap.get(key)); // Output: value
```

### `has(key)`

This method checks whether the specified key exists in the WeakMap. It returns true if the key exists and false otherwise.

```js
const weakMap = new WeakMap();
const key = {};
weakMap.set(key, 'value');
console.log(weakMap.has(key)); // Output: true
```

### `delete(key)`

This method removes the specified key and its associated value from the WeakMap. It returns true if the key existed and was removed successfully, and false otherwise.

```js
const weakMap = new WeakMap();
const key = {};
weakMap.set(key, 'value');
console.log(weakMap.delete(key)); // Output: true
```

Remember that WeakMap does not have methods like `keys()`, `values()`, `entries()`, or properties like `size`. This is because WeakMap keys may be subject to garbage collection, and exposing them would interfere with this process.  
Also, WeakMap does not allow iteration over its keys or values for the same reason.

---

## What is a WeakSet?

WeakSet is another specialized data structure introduced in ECMAScript 6 (ES6) alongside WeakMap. It's designed to work with collections of objects.

Unlike Set, WeakSet allows only objects to be stored, and like WeakMap, it holds weak references to these objects. This means that if an object stored in a WeakSet has no other references elsewhere in the program, it can be automatically garbage collected. This makes WeakSet particularly useful in scenarios where you need to maintain a collection of objects without preventing them from being cleaned up when they are no longer needed.

### Key Characteristics of WeakSet

#### Object-only Values

WeakSet allows only objects to be stored as values. If you attempt to add a non-object value, such as a primitive or another type of data, it will result in a TypeError.

#### Weak References

Similar to WeakMap, WeakSet holds weak references to its elements. This means that if an object stored in a WeakSet has no other references elsewhere in the program, it can be automatically garbage collected.

#### No Enumeration

WeakSet does not provide methods like `keys()`, `values()`, or `entries()`, nor does it support iteration with `forEach()`. This is because the contents of a WeakSet may change as objects are garbage collected, and exposing them would interfere with this process.

#### No Size Property

WeakSet does not have a `size` property like Set objects. This is because the size of a WeakSet could change as objects are garbage collected, and exposing the size property would not provide accurate information.

#### Memory Management

WeakSet is useful for scenarios where you need to maintain a collection of objects but do not want to prevent those objects from being garbage collected when they are no longer needed.

This can be particularly useful in scenarios such as event handling, where objects may be added to the set temporarily and then removed later.

---

## How to Create a WeakSet using the `new WeakSet()` Constructor

Firstly, let's break down the syntax:

```js
const weakSet = new WeakSet();
```

- `new WeakSet()`: This is the constructor call that creates a new instance of WeakSet.
- `const weakSet`: This declares a variable named `weakSet` to hold the reference to the newly created WeakSet instance.
- `=`: This is the assignment operator, which assigns the newly created WeakSet instance to the variable `weakSet`.

Now, let's create a WeakMap example:

::: tip Example

```js
// Creating a new WeakSet
const weakSet = new WeakSet();

// Creating some objects to add to the WeakSet
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };

// Adding objects to the WeakSet
weakSet.add(obj1);
weakSet.add(obj2);
weakSet.add(obj3);

// Checking if an object exists in the WeakSet
console.log(weakSet.has(obj1)); // Output: true
console.log(weakSet.has(obj2)); // Output: true
console.log(weakSet.has(obj3)); // Output: true

// Deleting an object from the WeakSet
weakSet.delete(obj2);

// Checking if the deleted object still exists
console.log(weakSet.has(obj2)); // Output: false
```

In this example:

- We first create a new WeakSet instance using the `new WeakSet()` constructor.
- Then, we create three different objects `obj1`, `obj2`, and `obj3` that we want to add to the WeakSet.
- We add these objects to the WeakSet using the `add()` method.
- We check if each object exists in the WeakSet using the `has()` method.
- Next, we delete `obj2` from the WeakSet using the `delete()` method.
- Finally, we check if `obj2` still exists in the WeakSet, which returns `false` since it has been deleted.

:::

---

## Common Use Cases for WeakSet

WeakSet in JavaScript serves specific purposes due to its ability to hold weak references to objects.

Here are some common use cases where WeakSet can be particularly useful:

### Object Membership Checking

WeakSet is useful for tracking the membership of objects in a collection without preventing them from being garbage collected when they are no longer needed.

This can be helpful in scenarios where you need to keep track of a dynamic set of objects, such as managing event handlers or tracking temporary data associations.

```js
const eventHandlers = new WeakSet();

function addEventHandler(element, handler) {
  eventHandlers.add(handler);
  element.addEventListener('click', handler);
}

function removeEventHandler(element, handler) {
  eventHandlers.delete(handler);
  element.removeEventListener('click', handler);
}
```

### Preventing Object Duplication

WeakSet can be used to ensure that objects are not duplicated within a collection. Since WeakSet can only hold unique objects, attempting to add the same object multiple times will have no effect.

```js
const uniqueObjects = new WeakSet();

function addObject(obj) {
  if (!uniqueObjects.has(obj)) {
    uniqueObjects.add(obj);
    console.log('Object added:', obj);
  } else {
    console.log('Object already exists:', obj);
  }
}

const obj1 = { id: 1 };
const obj2 = { id: 2 };
addObject(obj1); // Output: Object added: { id: 1 }
addObject(obj1); // Output: Object already exists: { id: 1 }
addObject(obj2); // Output: Object added: { id: 2 }
```

### Managing Weak References in Caches:

WeakSet can be used to hold weak references to objects stored in a cache. This allows the cached objects to be garbage collected when they are no longer needed, preventing memory leaks.

```js
const cache = new WeakSet();

function addToCache(obj) {
  cache.add(obj);
}

function isCached(obj) {
  return cache.has(obj);
}

const cachedObj = { data: 'cached data' };
addToCache(cachedObj);
console.log(isCached(cachedObj)); // Output: true

// After removing all references to cachedObj
cachedObj = null;
console.log(isCached(cachedObj)); // Output: false (cachedObj is garbage collected)
```

### Managing Object References in Data Structures:

WeakSet can be used to manage object references in various data structures, such as graphs or tree-like structures, where objects may be dynamically added and removed.

```js
const references = new WeakSet();

function addReference(obj) {
  references.add(obj);
}

function removeReference(obj) {
  references.delete(obj);
}

const obj1 = { id: 1 };
const obj2 = { id: 2 };
addReference(obj1);
addReference(obj2);
removeReference(obj1);
```

---

## Methods of WeakSet

WeakSet in JavaScript has a limited set of methods compared to other data structures like Set. Here are the methods available for WeakSet:

### `add(value)`

This method adds the specified value (which must be an object) to the WeakSet. If the value is already present in the WeakSet, the method has no effect.

```js
const weakSet = new WeakSet();
const obj = { id: 1 };
weakSet.add(obj);
```

### `delete(value)`

This method removes the specified value from the WeakSet, if it exists. It returns `true` if the value was successfully removed, and `false` otherwise.

```js
const weakSet = new WeakSet();
const obj = { id: 1 };
weakSet.add(obj);
console.log(weakSet.delete(obj)); // Output: true
```

### `has(value)`

This method checks whether the specified value exists in the WeakSet. It returns `true` if the value is present, and `false` otherwise.

```js
const weakSet = new WeakSet();
const obj = { id: 1 };
weakSet.add(obj);
console.log(weakSet.has(obj)); // Output: true
```

WeakSet does not have methods like `values()` or `forEach()` for iteration, nor does it have properties like `size`. This is because WeakSet is designed for holding weak references to objects, and exposing its contents would interfere with this process. Also, WeakSet does not allow iteration over its values for similar reasons.

---

## `WeakSet` vs. `WeakMap`

Both WeakSet and WeakMap are specialized data structures in JavaScript that hold weak references to objects, but they serve slightly different purposes.

Here's a comparison between the two:

### 1. Purpose

**WeakSet:** Designed for storing a collection of objects where each object may occur only once in the set. WeakSet is useful when you need to track the existence of objects without storing additional data associated with them.

**WeakMap:** Designed for storing key-value pairs where the keys must be objects and the values can be arbitrary. WeakMap is useful when you need to associate additional data with objects but want to allow those objects to be garbage collected when they are no longer needed.

### 2. Contents

**WeakSet:** Holds only objects as values. The values in a WeakSet can be checked for existence, but there is no associated data.

**WeakMap:** Holds key-value pairs, where the keys must be objects and the values can be any data type. Each key-value pair represents an association between an object and some data.

### 3. Iteration

**WeakSet:** Does not support methods like `keys()`, `values()`, or `forEach()`. WeakSet does not allow direct iteration over its values, as exposing the values would interfere with the weak reference mechanism.

**WeakMap:** Also does not support methods like `keys()`, `values()`, or `forEach()` for similar reasons. WeakMap does not allow direct iteration over its keys or values to avoid interference with the weak reference mechanism.

### 4. Usage

**WeakSet:** Commonly used for managing collections of objects, such as tracking event handlers, managing unique object references, or preventing object duplication within a collection.

**WeakMap:** Commonly used for associating additional data with objects, such as caching data related to specific objects, storing private data associated with objects, or managing object references in data structures like graphs or trees.

---

## Conclusion

While familiar data structures like Map and Set excel in JavaScript, WeakMap and WeakSet offer a unique approach. These structures utilize weak references to automatically manage memory associated with objects.

This can be particularly beneficial for short-lived objects or those involved in circular references.

In this article, we explored how to create and use WeakMap and WeakSet, along with their common use cases, empowering you to write cleaner, more memory-efficient JavaScript code.

Connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`joan-ayebola`)](https://ng.linkedin.com/in/joan-ayebola).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use WeakMap and WeakSet in JavaScript",
  "desc": "JavaScript offers a number of tools for organizing and managing data. And while developers often use widely recognized tools like Maps and Sets, they may often overlook certain other valuable resources.  For example, are you familiar with WeakMap and...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/weakmap-and-weakset-in-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
