---
lang: en-US
title: "How to copy objects in JavaScript: A complete guide"
description: "Article(s) > How to copy objects in JavaScript: A complete guide"
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
      content: "Article(s) > How to copy objects in JavaScript: A complete guide"
    - property: og:description
      content: "How to copy objects in JavaScript: A complete guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/copy-objects-in-javascript-complete-guide.html
prev: /programming/js/articles/README.md
date: 2022-03-09
isOriginal: false
author:
  - name: Maciej Cieślar
    url : https://blog.logrocket.com/author/maciejcieslar/
cover: /assets/image/blog.logrocket.com/copy-objects-in-javascript-complete-guide/banner.png
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

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to copy objects in JavaScript: A complete guide"
  desc="A complete guide to copying objects in JavaScript: shallow copy, deep copy, assigning, merging, and structured cloning."
  url="https://blog.logrocket.com/copy-objects-in-javascript-complete-guide"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/copy-objects-in-javascript-complete-guide/banner.png"/>

::: note Editor’s note

This post was updated on 23 March 2022 to include updated information for copying objects in JavaScript and TypeScript, including the structured cloning technique.

:::

![How To Copy Objects In JavaScript](/assets/image/blog.logrocket.com/copy-objects-in-javascript-complete-guide/banner.png)

When working with functional programming, a good rule of thumb is to always create new objects instead of changing old ones. In doing so we can be sure that our meddling with the object’s structure won’t affect some seemingly unrelated part of the application, which in turn makes the entire code more predictable.

How exactly can we be sure that the changes we make to an object do not affect the code elsewhere? Removing the unwanted references altogether seems like a good idea. To get rid of a reference we need to copy all of the object’s properties to a new object. In this article, we’ll examine five techniques we can use to copy objects in JavaScript, as well as when to use each technique. Where applicable, we’ll also demonstrate how to use each technique to copy objects in TypeScript. TypeScript is basically a subset of JavaScript with static typing, but it is the preferred option for some developers. Compared to JavaScript, Typescript is generally easier to read, understand, and debug.

---

## Shallow copy

A shallow copy of an object will have the same references as the source object from which the copy was made. As a result, when we modify either the source or the copy, we may also cause the other object to change. In other words, we may unintentionally create unexpected changes in the source or copy. It is critical to grasp the difference between selectively modifying the value of a shared property of an existing element and assigning a completely new value to an existing element.

JavaScript offers standard inbuilt object-copy operations for creating shallow copies: `Array.from()`, `Array.prototype.concat()`, `Array.prototype.slice()`, `Object.assign()`, and `Object.create()`, `spread syntax`.

Here’s an example of shallow copy in JavaScript:

```js
let profile = ["Bruce",{"language":["English","Spanish","French"]}];

let profile_copy = Array.from(profile);

profile_copy[1].language = ["Igbo","Yoruba"]
console.log(JSON.stringify(profile)); // ["Bruce",{"language":["Igbo","Yoruba"]}]

profile_copy[0] = "Pascal"
console.log(profile[0]) // Bruce

console.log(JSON.stringify(profile_copy)); // ["Pascal",{"language":["Igbo","Yoruba"]}]

console.log(JSON.stringify(profile)); // ["Bruce",{"language":["Igbo","Yoruba"]}]
```

Here’s an example of shallow copy in TypeScript. In this example, we copy the object using the spread operator (`...`).

```ts
function shallow<T extends object>(source: T): T {
  return {
    ...source,
  };
}

let profile = {
  name: "Pascal",
  age: 12,
};
const employee: {} = shallow(profile);
console.log(employee);
```

Here’s another example of shallow copy in TypeScript. In this example, we create a new object and copy every property from the `source` object:

```ts
function shallow<T extends object>(source: T): T {
  const copy = {} as T;
  Object.keys(source).forEach((key) => {
    copy[key as keyof T] = source[key as keyof T];
  });

  return copy;
}

let profile = {
  name: "Pascal",
  age: 23,
};
const employee: {} = shallow(profile);
console.log(employee);
```

### When to use shallow copy

Shallow copy can be used when we’re dealing with an object that only has properties with primitive data types (for example, strings or numbers). If our object contains non-primitive data types (for example, functions or arrays), it may disrupt our program.

---

## Deep copy

A deep copy of an object will have properties that do not share the same references as the source object from which the copy was made. As a result, we can alter either the source or the copy without changing the other object. In other words, making a change to one object will not cause unexpected changes to either the source or copy.

To make deep copies in JavaScript, we use the `JSON.stringify()` and `JSON.parse()` methods. First, we convert the object to a JSON string using the `JSON.stringify()` function. Then, we parse the string with the `JSON.parse()` method to create a new JavaScript object:

```js
let profile = ["Bruce",{"language":["English","Spanish","French"]}];
let profile_deep_copy = JSON.parse(JSON.stringify(profile));

// Change the value of the 'language' property
profile_deep_copy[1].language = ["Ibo","Yoruba"]

// The 'language' property does not change in profile.
console.log(profile[1].language); //[ "English", "Spanish", "French" ]
```

Now, let’s look at how to make a deep copy of an object in TypeScript.

Our first example works recursively. We write a `deep` function, which checks the type of the argument sent to it and either calls an appropriate function for the argument (if it is an array or an object) or simply returns the value of the argument (if it is neither an array nor an object).

```ts
function deep<T>(value: T): T {
  if (typeof value !== "object" || value === null) {
    return value;
  }
  if (Array.isArray(value)) {
    return deepArray(value);
  }
  return deepObject(value);
}
```

The `deepObject` function takes all of the keys of an object and iterates over them, recursively calling the `deep` function for each value.

```ts
function deepObject<T>(source: T) {
  const result = {} as T;
  Object.keys(source).forEach((key) => {
    const value = source[key as keyof T];
    result[key as keyof T] = deep(value);
  }, {});
  return result as T;
}
```

So, `deepArray` iterates over the provided array, calling `deep` for every value in it.

```ts
function deepArray<T extends any[]>(collection: T): any {
  return collection.map((value) => {
    return deep(value);
  });
}

const deep_copy = deep(["profile", {"list": ["Noodle", "Bross"]}])
console.log(deep_copy)
```

Now, let’s look at another TypeScript example taking a different approach. Our goal is to create a new object without any reference to the previous one, right? Why don’t we use the `JSON` object then? First, we `stringify` the object, then `parse` the resulting string. What we get is a new object that is totally unaware of its origin.

It’s important to note that in the prior example the methods of the object are retained, but here they are not. Since `JSON` format does not support functions, they are removed altogether.

```ts
function deep<T extends object>(source: T): T {
  return JSON.parse(JSON.stringify(source));
}

const deep_copy = deep(["profile", { list: ["Noodle", "Bross"] }]);
console.log(deep_copy);
```

### When to use deep copy

Deep copy may be used when your object contains both primitive and non-primitive data types. It can also be used anytime you feel the need to update nested objects or arrays.

---

## Assigning

The `Object.assign()` function can be used to copy all enumerable own properties from one or more source objects to a target object. This function returns the target object to the `newObject` variable.

Here’s an example of copying with the `Object.assign()` function in JavaScript:

```js
const target = {};
const source = { name: 'Pascal', age: 23 };

const newObject = Object.assign(target, source);

console.log(target); // {name: "Pascal", age: 23}

console.log(newObject); // {name: "Pascal", age: 23}
```

Here’s an example of copying by assigning in TypeScript. Here, we just take each `source` object and copy its properties to the `target`, which we normally pass as `{}` in order to prevent mutation.

```ts
const assign = (target: { [key: string]: any }, ...sources: object[]) => {
  sources.forEach((source) => {
    return Object.keys(source).forEach((key) => {
      target[key] = source[key as keyof Object];
    });
  });
  return target;
};

let target: {} = {};
assign(target, ["profile", { list: ["Noodle", "Bross"] }]);
console.log(target);
```

Here’s another example of copying by assigning in TypeScript. This example is a safe version in which, instead of mutating the `target` object, we create an entirely new one that we later assign to a variable. This means we don’t need to pass the `target` argument at all. Unfortunately, this version does not work with the keyword `this` because `this` can’t be reassigned.

```ts
const assign = (...sources: object[]) => {
  return sources.reduce((result, current) => {
    return {
      ...result,
      ...current,
    };
  }, {});
};

const target = assign({ name: "Pascal", age: 23 });
console.log(target);
```

### When to use assigning

The `Object.assign()` function may be used to replicate an object that is not modified and assign some new properties to an existing object. In the above sample code, we created an empty object, `{}`, called `target`, and assigned the properties from the `source` object.

---

## Merging

The merge method is similar to the assign method, but instead of altering properties in the target, it joins them together. If a value is an array or an object, this function merges the attributes in a recursive manner. There are two ways to merge objects in JavaScript: using the spread operator or the `Object.assign()` method.

### Spread operator

The spread operator, `...`, was implemented in ES6 and can be used to merge two or more objects into one new object that will have the properties of the merged objects. If two objects have the same property name, the latter object property will overwrite the former.

Here’s an example of merging with the spread operator in JavaScript:

```js
let employee = {
  position: "Frontend Developer",
  country: "USA",
};

let location = {
  city: "Asaba",
  country: "Nigeria",
};

let profile = {
  ...employee,
  ...location,
};

console.log(profile);

// {
//    position: 'Frontend Developer',
//    city: 'Asaba',
//    country: 'Nigeria'
// }
```

Now, let’s look at an example of merging in TypeScript.

The function `mergeValues` accepts two arguments: `target` and `source`. If both values are objects we call and return `mergeObjects` with the aforementioned `target` and `source` as arguments. Analogically, when both values are arrays we call and return `mergeArrays`. If the `source` is `undefined` we just keep whatever value was previously there which means we return the `target` argument. If none of the above applies we just return the `source` argument.

```ts
function mergeValues(target: any, source: any) {
  if (typeof target === "object" && typeof source === "object") {
    return mergeObjects(target, source);
  }
  if (Array.isArray(target) && Array.isArray(source)) {
    return mergeArrays(target, source);
  }
  if (source === undefined) {
    return target;
  }
  return source;
}
```

Both `mergeArrays` and `mergeObjects` work the same way: we take the `source` properties and set them under the same key in the `target`.

```ts
function mergeObjects(
  target: { [key: string]: any },
  source: { [key: string]: any }
) {
  Object.keys(source).forEach((key) => {
    const sourceValue = source[key];
    const targetValue = target[key];
    target[key] = mergeValues(targetValue, sourceValue);
  });

  return target;
}
function mergeArrays(target: any[], source: any[]) {
  source.forEach((value, index) => {
    target[index] = mergeValues(target[index], value);
  });

  return target;
}
```

Now all that is left to do is to create a TypeScript `merge` function:

```ts
const merge = (target: object, ...sources: object[]) => {
  sources.forEach((source) => {
    return mergeValues(target, source);
  });
  return target;
};

console.log(
  merge({ position: "Technical Writer" }, { name: "Pascal", age: 23 })
);
```

### `Object.assign()` method

The `Object.assign()` method can be used to merge two objects and copy the result to a new target. Just like the spread operator, If the source objects have the same property name, the latter object will replace the preceding object.

Here’s an example:

```js
let employee = {
  firstName: "Pascal",
  lastName: "Akunne",
  age: 23,
};

let job = {
  position: "Frontend Developer",
  country: "Nigeria",
};

let profile = Object.assign(employee, job);
console.log(profile);

// {
//    firstName: 'Pascal',
//    lastName: 'Akunne',
//    age: 23,
//    position: 'Frontend Developer',
//    country: 'Nigeria'
// }
```

Now, let’s look at another example of merging in Typescript. With this approach, we want to first get all the properties of the `source` object , even if they are nested three objects deep ,  and save a `path` to the properties. This will later allow us to set the value at the proper path inside the `target` object.

A `path` is an array of strings that looks something like this: `[‘firstObject’,‘secondObject’, ‘propertyName’]`.

Here’s an example of how this works:

```ts
const source = {
  firstObject: {
    secondObject: {
      property: 5,
    },
  },
};
console.log(getValue(source));

// [[[{ value: 5, path: ['firstObject', 'secondObject', 'property']}]]]
```

We call the `getValue` function to get an array of objects that contain paths and values of the properties. If the argument `value` is `null` or is not object-like, we can’t go any deeper so we return an object containing the argument `value` and its path.

Otherwise, if the argument is object-like and not `null`, we can be sure it is either an array or an object. If it is an array, we call `getArrayValues`. If it is an object , we call  `getObjectValues`.

```ts
function getValue(value: any, path: (number | string)[] = []) {
  if (value === null || typeof value !== "object") {
    return {
      value,
      path: [...path],
    };
  }
  if (Array.isArray(value)) {
    return getArrayValues(value, path);
  }
  return getObjectValues(value, path);
}
```

Both `getArrayValues` and `getObjectValues` iterate over properties calling `getValue` for each with the current `index`/`key` now appended to the `path`.

```ts
function getArrayValues(
  collection: any[],
  path: (number | string)[] = []
): any {
  return collection.map((value, index) => {
    return getValue(value, [...path, index]);
  });
}
function getObjectValues(
  source: { [key: string]: any },
  path: (number | string)[] = []
): any {
  return Object.keys(source).map((key) => {
    const value = source[key];

    return getValue(value, [...path, key]);
  });
}
```

After getting the paths and values of an entire `source` object we can see that they are deeply nested. Still, we’d like to keep all of them in a single array. This means that we need to `flatten` the array.

Flattening an array boils down to iterating over each item to check if it is an array. If it is we `flatten` it and then `concat` the value to the result array.

```ts
function flatten(collection: any[]) {
  return collection.reduce((result, current) => {
    let value = current;

    if (Array.isArray(current)) {
      value = flatten(current);
    }
    return result.concat(value);
  }, []);
}
```

Now that we’ve covered how to get the `path`, let’s consider how to set all these properties in the `target` object.

Let’s talk about the `setAtPath` function that we are going to use to set the values at their respective paths. We want to get access to the last property of the path to set the value. To do so, we need to go over the path’s items, its properties’ names, and each time get the property’s value.  
We start the `reduce` function with the target object which is then available as the `result` argument.

Each time we return the value under `result[key]` it becomes the `result` argument in the next iteration. This way, when we get to the last item of the path the `result` argument is the object or array where we set the value.

In our example the `result` argument, for each iteration, would be: `target` -> `firstObject` -> `secondObject`.

We have to keep in mind that the `target` might be an empty object whereas sources can be many levels deep. This means we might have to recreate an object’s or an array’s structure ourselves before setting a value.

```ts
function setAtPath(target: object, path: (string | number)[], value: any): any {
  return path.reduce((result: { [key: string]: any }, key, index) => {
    if (index === path.length - 1) {
      result[key] = value;
      return target;
    }
    if (!result[key]) {
      const nextKey = path[index + 1];
      result[key] = typeof nextKey === "number" ? [] : {};
    }
    return result[key];
  }, target);
}
```

We set the value at the last item of the `path` and return the object we started with.

```ts
if (index === path.length - 1) {
  result[key] = value;
  return target;
}
```

If inside the `firstObject` there were no `secondObject`, we would get `undefined` and then an error if we tried to set `undefined[‘property’]`. To prevent this, we first check if `result[key]` exists. If it does not exist, we’ll need to create it  as either an object or as an array. If the type of the next item is a `'number'` (effectively an index), then we’ll need to create an array. If it is a string, we’ll create an object.

```ts
if (!result[key]) {
  const nextKey = path[index + 1];
  result[key] = typeof nextKey === "number" ? [] : {};
}
```

Now, all that is left to do is to create the `merge` function which ties everything together.

```ts
const result = function merge(target: object, ...sources: object[]) {
  return flatten(
    sources.map((source) => {
      return getValue(source);
    })
  ).reduce((result: object, path: [], value: any) => {
    if (value === undefined) {
      return result;
    }
    return setAtPath(result, path, value);
  }, target);
};

console.log(result(source));
```

### When to use merging

Merging objects is not a typical practice in JavaScript, but this method enables us to combine object properties, even with very deeply nested objects.

---

## Structured cloning

Structured cloning is a new technique for copying objects in JavaScript. It is a global method that uses the structured clone algorithm to create a deep copy of a specified item. Rather than cloning objects, it transfers objects from their original source to a new source where they are no longer accessible in the original source.

This technique may be used with [<VPIcon icon="fa-brands fa-firefox" />transferable objects](https://developer.mozilla.org/en-US/docs/Glossary/Transferable_objects), which is a type of object that owns resources. These objects can only be transferred using the original parameter’s transfer value. As a result of the transfer, the original object will be rendered unusable.

In the below example, the code would would transfer `Pascal` from the passed in value, but not `Akunne`:

```js
const transferred = structuredClone(
  { profile: { name: { first: Pascal, last: Akunne } } },
  { transfer: [Pascal] }
);
```

### When to use structured cloning

Structured cloning can be useful for cases when you need to asynchronously validate data in a buffer before saving the data. To avoid the buffer being modified before the data is saved, you can clone the buffer and validate that data. This technique can also be useful if you are transferring the data. With structured cloning, any attempts to modify the original buffer will fail, preventing its accidental misuse.

---

## Conclusion

In this article, we discussed five useful techniques to copy an object in JavaScript as well as TypeScript. We use shallow copy when dealing with an object that only has properties with primitive data types (strings or numbers). Deep copy ensures that there are no references to the source object or any of its properties. Assign is a great way to replicate an object or just to assign some new properties to an existing object. Merge allows us to merge properties of objects, even if the objects are deeply nested. Finally, structured cloning allows us to asynchronously validate and `transfer` object data, which then renders the original object unusable.

Objects are the basic method by which we organize and transmit data in JavaScript. They are represented in TypeScript via object types (`result: object`). Whether you choose to copy objects in JavaScript or TypeScript, hopefully, this guide has provided you with options to consider for multiple use cases. If you are familiar with other techniques for copying objects in JavaScript, please share them in the comments section.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to copy objects in JavaScript: A complete guide",
  "desc": "A complete guide to copying objects in JavaScript: shallow copy, deep copy, assigning, merging, and structured cloning.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/copy-objects-in-javascript-complete-guide.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```