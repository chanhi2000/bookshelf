---
lang: en-US
title: "JavaScript dictionary: How to use objects and maps for key-value pairs"
description: "Article(s) > JavaScript dictionary: How to use objects and maps for key-value pairs"
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
      content: "Article(s) > JavaScript dictionary: How to use objects and maps for key-value pairs"
    - property: og:description
      content: "JavaScript dictionary: How to use objects and maps for key-value pairs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/javascript-dictionary.html
prev: /programming/js/articles/README.md
date: 2025-02-25
isOriginal: false
author:
  - name: Elijah Agbonze
    url : https://blog.logrocket.com/author/elijahtrillionz/
cover: /assets/image/blog.logrocket.com/javascript-dictionary/banner.png
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
  name="JavaScript dictionary: How to use objects and maps for key-value pairs"
  desc="Learn how to use JavaScript dictionaries with Objects and Maps. Discover key differences, performance insights, and use cases with examples."
  url="https://blog.logrocket.com/javascript-dictionary"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/javascript-dictionary/banner.png"/>

When working with JavaScript, you may wonder whether it has a built-in dictionary type similar to Python. The short answer is no — JavaScript does not have a dedicated dictionary structure. However, it provides two powerful alternatives for handling key-value pairs: Objects and Maps.

![JavaScript Dictionary](/assets/image/blog.logrocket.com/javascript-dictionary/banner.png)

Objects have long been JavaScript’s primary way of storing structured data, while [**Maps were introduced in ES6**](/blog.logrocket.com/es6-keyed-collections-maps-and-sets.md) to offer more flexibility and efficiency for specific use cases. Understanding when to use an Object versus a Map is crucial for writing clean, optimized, and maintainable JavaScript code.

In this guide, we’ll break down how to use Objects and Maps, explore their differences, and help you choose the best one for your needs.

---

## Objects

An object is a JavaScript data type used to store key-value data. If we need to store a user’s information, we can use an object:

```js
const userInfo = { name: 'John Doe', age: 25, address: 'Boulevard avenue' };
```

Without objects or a key-value data type, we’d have to store each datum of John Doe separately, which would make the app tedious to maintain. From the code sample, you’ll notice we were able to store both a string and a number in the same variable. This is why objects (and key-value pairs in general) are quite important and useful.

You can store any data type in a JavaScript object, even a function or other objects:

```js
const userInfo = {
  name: "John Doe",
  age: 25,
  address: "Boulevard avenue",
  printName: function () {
    return this.name;
  },
  favoriteColors: ["Red", "Blue"],
};
```

### Creating objects

#### 1. Object literals

The examples we’ve seen so far are object literals:

```js
const userInfo = { name: 'John Doe', age: 25 };
```

#### 2. Object constructor

JavaScript provides an `Object` constructor that can be used to manage objects:

```js
const userInfo = new Object();
userInfo.name = 'John Doe'; 
userInfo.age = 25;
```

The `Object` constructor is first called before values are assigned to keys. This is useful when creating an object from an existing object:

```js
const userAppInfo = { lastLoggedIn: "2024-12-10 19:54:23", todos: 10 } 
const userInfo = new Object();
userInfo.name = 'John Doe'; 
userInfo.age = 25; 

for (let key in userAppInfo) { 
 userInfo[key] = userAppInfo[key];
}
console.log(userInfo); // { name: 'John Doe', age: 25, lastLoggedIn: "2024-12-10 19:54:23", todos: 10 }
```

Don’t worry if you’re not sure how we accessed the object values; we‘ll tackle that later. In the meantime, just keep in mind that [**an object can be can be “copied” from another**](/blog.logrocket.com/copy-objects-in-javascript-complete-guide.md). There are easier ways of doing this that we’ll go over in a bit.

#### 3. `Object.create()`

```js
const userAppInfo = { lastLoggedIn: "2024-12-10 19:54:23", todos: 10 }
const userInfo = Object.create(userAppInfo);
userInfo.name = 'John Doe'; 
userInfo.age = 25; 

console.log(userInfo); // { name: 'John Doe', age: 25 }
console.log(userInfo.__proto__) // { lastLoggedIn: "2024-12-10 19:54:23", todos: 10 }
```

With `Object.create()`, we can pass a custom prototype like we just did above. By default, all objects inherit from [<FontIcon icon="fa-brands fa-firefox"/>`Object.prototype`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object). In this case, we’ve overridden the default prototype of `userInfo` with a custom one. You can always access the properties of the prototype in the created object:

```js
const userAppInfo = {
  lastLoggedIn: "2024-12-10 19:54:23",
  todos: 10,
  convertLastLoggedInToDate: function () {
    return new Date(this.lastLoggedIn);
  },
};

const userInfo = Object.create(userAppInfo);
userInfo.name = "John Doe";
userInfo.age = 25;
console.log(userInfo.convertLastLoggedInToDate()); // 2024-12-10T18:54:23.000Z
```

If you pass `null` into `Object.create`, it doesn’t come with any prototype. This is called a null-prototype object.

#### 4. `Object.assign()`

`Object.assign` is another way of copying an object — or, rather, creating another object from an existing one:

```js
const userAppInfo = { lastLoggedIn: "2024-12-10 19:54:23", todos: 10 };
const userInfo = Object.assign({ name: 'John Doe', age: 25 }, userAppInfo);
console.log(userInfo) // { name: 'John Doe', age: 25, lastLoggedIn: '2024-12-10 19:54:23', todos: 10 }
```

The `userAppInfo` object in this case is the source object while `{ name: 'John Doe', age: 25 }` is the target object. Similar properties/keys in both the target and source objects are overwritten by the source object:

```js
const userAppInfo = { lastLoggedIn: "2024-12-10 19:54:23", todos: 10 };
const userInfo = Object.assign({ name: 'John Doe', age: 25, todos: 9 }, userAppInfo);
console.log(userInfo) // { name: 'John Doe', age: 25, todos: 10, lastLoggedIn: '2024-12-10 19:54:23' }
```

#### 5. Spread operator

The spread operator is the most common way of creating a new object from an existing one:

```js
const userAppInfo = { lastLoggedIn: "2024-12-10 19:54:23", todos: 10 };
const userInfo = { ...userAppInfo, name: 'John Doe', age: 25 };
console.log(userInfo) // { lastLoggedIn: "2024-12-10 19:54:23", todos: 10, name: "John Doe", age: 25 }
```

Similar keys are overwritten by the latest item to the object:

```js
const userAppInfo = { lastLoggedIn: "2024-12-10 19:54:23", todos: 10 };
const userInfo = { ...userAppInfo, name: 'John Doe', age: 25, todos: 9 };
console.log(userInfo) // { lastLoggedIn: "2024-12-10 19:54:23", todos: 9, name: "John Doe", age: 25 }
```

In this case, the new `todos` will overwrite that of the `userAppInfo`. We can simply turn that around like so:

```js
const userAppInfo = { lastLoggedIn: "2024-12-10 19:54:23", todos: 10 };
const userInfo = { name: 'John Doe', age: 25, todos: 9, ...userAppInfo };
console.log(userInfo) // { name: "John Doe", age: 25, lastLoggedIn: "2024-12-10 19:54:23", todos: 10,  }
```

### Accessing objects

The examples show how objects are accessed as a group:

```js
const userInfo = { name: 'John Doe', age: 25 };
console.log(userInfo) // { name: 'John Doe', age: 25 }
```

There is no special order in which it will be logged; it is simply based on the order of the properties in the object.

### Accessing each item

Though items in an object may contain related pieces of data, you’d most often need them individually:

```js
const userInfo = { name: 'John Doe', age: 25 };
console.log(userInfo.name) // 'John Doe'
console.log(userInfo.createdAt) // undefined
```

There are cases where the key cannot be used like we did above. For example:

```js
const userInfo = { name: 'John Doe', age: 25, 'date-of-birth': 2000 }
console.log(userInfo.date-of-birth) // will throw an error
```

Instead, we use the square brackets with the key as a string:

```js
console.log(userInfo['date-of-birth']) // 2000
```

Another use case for square brackets is for dynamic keys.

### Looping through an object

There are times when you need to perform actions on each item. In this case, you’d need to go through each item. That’s where loops come in:

```js
const userInfo = { name: 'John Doe', age: 25 };

for (let key in userInfo) {
  console.log(userInfo[key]);
}
// John Doe
// 25
```

Unlike [**arrays**](/blog.logrocket.com/javascript-array-methods.md) and maps in JavaScript, there is no default way of getting the size of an object. We can do that with the `for…in` loop:

```js
const userInfo = { name: "John Doe", age: 25, "date-of-birth": 2000 };

const getSizeOfObject = (obj) => {
  let length = 0;
  for (let key in obj) {
    length++;
  }
  return length;
};

console.log(getSizeOfObject(userInfo)); // 3
```

### Accessing keys and values in an object

With the `for…in` loop, we can access both the keys and values of an object separately:

```js
const userInfo = { name: 'John Doe', age: 25 };

const keys = [];
const values = []
for (let key in userInfo) {
  keys.push(key);
  values.push(userInfo[key]);
}

console.log(keys) // ['name', 'age']
console.log(values) // ['John Doe', 25];
```

JavaScript provides an easier way to access the keys and values of an object separately:

```js
const userInfo = { name: 'John Doe', age: 25 };
const keys = Object.keys(userInfo);
const values = Object.values(userInfo);

console.log(keys) // ['name', 'age']
console.log(values) // ['John Doe', 25];
```

### Updating objects

Created objects are easy to update. You can update an existing property:

```js
const userInfo = { name: 'John Doe', age: 25, todos: 9 };

userInfo.todos = 11;
console.log(userInfo) // { name: 'John Doe', age: 25, todos: 11 }
```

Also, new properties can be added to the objects:

```js
const userInfo = { name: 'John Doe', age: 25, todos: 9 };

userInfo.lastLoggedIn = "2024-12-10 19:54:23";
console.log(userInfo) // { name: 'John Doe', age: 25, todos: 9, lastLoggedIn: "2024-12-10 19:54:23" }
```

### Deleting objects

In JavaScript, it is possible to either delete items of an object or the object entirely:

```js
const userInfo = { name: 'John Doe', age: 25, todos: 9 };
delete userInfo.todos;

console.log(userInfo.todos) // undefined
```

`delete` is used to remove a property from an object. To delete an entire object, we’d have to pass `null` or `undefined` as the value:

```js
let userInfo = { name: 'John Doe', age: 25, todos: 9 };

userInfo = undefined;
console.log(userInfo) // undefined
```

### Null-prototype objects

Almost all objects inherit the Object.prototype except a custom prototype is passed. Passing `null` or `undefined` as a prototype for an object doesn’t throw an error. Instead, it simply has no prototype whatsoever:

```js
const userInfo = Object.create(null);
userInfo.name = 'John Doe';
userInfo.age = 25;
console.log(userInfo.__proto__); // undefined
```

When debugging, this can be confusing as the common methods and properties from the Object.prototype would not be available, for example converting an object to a string:

```js
const userAppInfo = Object.create({ lastLoggedIn: "2024-12-10 19:54:23", todos: 10 });
userAppInfo.name = 'John Doe';
userAppInfo.age = 25;
console.log(`${userAppInfo}`) // [object Object]

const userInfo = Object.create(null);
userInfo.name = 'John Doe';
userInfo.age = 25;
console.log(`${userInfo}`); // TypeError: Cannot convert object to primitive value
```

You can also set `null` on object literals using the `__proto__` key:

```js
const userInfo = { name: 'John Doe', age: 25, __proto__: null } 
console.log(`${userInfo}`); // TypeError: Cannot convert object to primitive value
```

One good use of setting `null` as your prototype is that it is immune to prototype pollution attacks. If there is a malicious script added to Object.prototype, all of your objects inheriting that prototype will have access to that script except null-prototype objects.

---

## Maps

JavaScript maps provide a unique way to store data in key-value pairs. Each item is unique and remembers the order of insertion. One other edge that Maps have over objects is that any data type can be used as both the key or value:

```js
const userInfo = new Map();

const ageFunc = () => {
  return "age";
};

userInfo.set("name", "John Doe");
userInfo.set(ageFunc(), 25);

console.log(userInfo.get(ageFunc())); // 25
```

### Creating maps

Unlike objects, creating maps is limited to the `Map` constructor. But it can be also created from objects:

```js
const userInfo = { name: 'John Doe', age: 25 };
const userMapInfo = new Map(Object.entries(userInfo));
console.log(userMapInfo) // Map { 'name' => 'John Doe', 'age' => 25 }
```

The `set` method as we’ve seen earlier is used to assign properties and values to a map:

```js
const userInfo = new Map();

userInfo.set("name", "John Doe");
userInfo.set("age", 25);
userInfo.set("name", "Jonathan Doe");
console.log(userInfo); // Map { 'name' => 'Jonathan Doe', 'age' => 25 }
```

As seen in the example above, duplicate keys are overwritten by the latest addition to the map. So when you think of representing key-value pairs where each key has to be unique, then `Map` is what you need.

### Accessing maps

We use the `get` method to access an item in Map:

```js
const userInfo = new Map();

userInfo.set("name", "John Doe");
userInfo.set("age", 25);

const userName = userInfo.get("name");
console.log(userName); // John Doe
```

The `size` property gives us access to the size of the map; we don’t need to create a custom function for that:

```js
const userInfo = new Map();

userInfo.set("name", "John Doe");
userInfo.set("age", 25);

console.log(userInfo.size); // 2
```

### Looping through a map

The `for…of` loop can be used to loop through each item of a map. Each iteration returns an array of the `key` and `value`:

```js
const userInfo = new Map();
userInfo.set("name", "John Doe");
userInfo.set("age", 25);

const keys = [];
const values = [];
for (const [key, value] of userInfo) {
  keys.push(key);
  values.push(value);
}

console.log(keys); // ['name', 'age']
console.log(values); // ['John Doe', 25]
```

Alternatively, we can use the `forEach` method to loop through each item of a map:

```js
const userInfo = new Map();
userInfo.set("name", "John Doe");
userInfo.set("age", 25);

const keys = [];
const values = [];

userInfo.forEach((value, key) => {
  keys.push(key);
  values.push(value);
});

console.log(keys); // ['name', 'age']
console.log(values); // ['John Doe', 25]
```

The order of each iteration will always be based on the order in which they were inserted.

### Accessing keys and values in a map

Though, as we’ve seen, you can access the keys and values of a map using loops, JavaScript does provide a custom way of accessing the keys and values:

```js
const userInfo = new Map();
userInfo.set("name", "John Doe");
userInfo.set("age", 25);

const keysIterator = userInfo.keys();
console.log(keysIterator) // MapIterator { 'name', 'age' }

const valuesIterator = userInfo.values();
console.log(valuesIterator) // MapIterator { 'John Doe', 25 }
```

You can access each item of both the keys and values by iterating on them:

```js
const values = [];
const keys = [];

for (const value of valuesIterator) {
  values.push(value);
}
console.log(values) // ['John Doe', 25]

for (const key of keysIterator) {
  keys.push(key);
}
console.log(keys) // ['name', 'age']
```

Or, you can simply access them with the `next()` function:

```js
console.log(keysIterator.next().value) // 'name'
console.log(keysIterator.next().value) // 'age'

console.log(valuesIterator.next().value) // 'John Doe'
console.log(valuesIterator.next().value) // 25
```

### Updating maps

Because keys in maps can only occur once, we can use the `set` method for updating existing items in the map:

```js
const userInfo = { name: 'John Doe', age: 25 };
const userMapInfo = new Map(Object.entries(userInfo));
userMapInfo.set('name', 'Jonathan Doe');

console.log(userMapInfo) // Map { 'name' => 'Jonathan Doe', 'age' => 25 }
```

Also, as we’ve seen, the `set` method is used for adding new items:

```js
const userInfo = { name: 'John Doe', age: 25 };
const userMapInfo = new Map(Object.entries(userInfo));
userMapInfo.set('name', 'Jonathan Doe');
userMapInfo.set('todos', 12);

console.log(userMapInfo) // Map { 'name' => 'Jonathan Doe', 'age' => 25, 'todos' => 12 }
```

### Deleting maps

We use the `delete` method to delete an item of a map with its key:

```js
const userInfo = { name: 'John Doe', age: 25, todos: 12 };
const userMapInfo = new Map(Object.entries(userInfo));

userMapInfo.delete('todos');

console.log(userMapInfo) // Map { 'name' => 'Jonathan Doe', 'age' => 25 }
console.log(userMapInfo.get('todos')); // undefined
```

JavaScript also offers a `clear` method to clear out all properties in a map:

```js
const userInfo = { name: 'John Doe', age: 25, todos: 12 };
const userMapInfo = new Map(Object.entries(userInfo));
userMapInfo.clear();

console.log(userMapInfo) // Map {}
```

---

## Key differences between objects and maps

| Feature | Objects | Maps |
| ---: | --- | --- |
| **Key types** | Strings & Symbols only | Any data type (e.g., objects, functions, numbers) |
| **Iteration order** | Not guaranteed (keys follow insertion order in modern browsers, but older implementations differ) | Guaranteed (keys maintain insertion order) |
| **Performance** | Faster for small datasets | Optimized for frequent additions and deletions |
| **Size retrieval** | Requires `Object.keys(obj).length` | Uses `map.size` property |
| **Prototype inheritance** | Objects inherit from `Object.prototype`, which may cause unintended behavior | Maps do not inherit properties from `Object.prototype` |
| **Key existence check** | Uses `"key" in obj` or `obj.hasOwnProperty("key")` | Uses `map.has(key)` |
| **Serialization** | Supports `JSON.stringify()` | Needs manual conversion to an Object first |
| **Use case** | Best for structured, static data (e.g., API responses, user profiles) | Best for dynamic, frequently updated data (e.g., caching, lookup tables) |

---

## Choosing the best dictionary

When it comes to choosing the best dictionary-like structure for your use case, the shape of the data and how you want it to be handled is paramount.

### Shape of data

The shape of your data determines whether an Object or a Map is more appropriate.

- **Objects** are ideal for structured, fixed-key data where you have predefined properties
- **Maps** are better suited for dynamic key-value pairs where keys may change frequently or need to support different data types

### Managing data

How you manage data (insertion, lookup, deletion) also plays a key role.

#### Performance considerations

- Objects provide fast lookups but suffer from key collision risks
- Maps are optimized for frequent insertions and deletions

#### Memory usage

- Maps can be more memory-efficient for large datasets
- Objects have a higher memory footprint due to their default prototype chain

Use objects when you need simple, structured data with string keys. Use maps when you need efficient insertions, deletions and complex keys.

---

## Conclusion

While JavaScript does not have a dedicated dictionary type, Objects and Maps provide robust solutions for handling key-value pairs. The choice between them depends on your specific needs:

- Use **Objects** when dealing with **structured data with predefined keys**, such as API responses or configuration settings
- Use **Maps** when working with **dynamic key-value pairs**, especially if keys are not always strings or performance is a concern

Understanding the strengths and weaknesses of Objects and Maps in JavaScropt will help you write more efficient and maintainable JavaScript code. Whether you’re storing user preferences, managing application state, or implementing a caching mechanism, choosing the right structure will improve your application’s performance and readability.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "JavaScript dictionary: How to use objects and maps for key-value pairs",
  "desc": "Learn how to use JavaScript dictionaries with Objects and Maps. Discover key differences, performance insights, and use cases with examples.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/javascript-dictionary.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
