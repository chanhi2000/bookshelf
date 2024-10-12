---
lang: en-US
title: "JavaScript Optional Chaining `?.` Explained - How it Works and When to Use it"
description: "Article(s) > JavaScript Optional Chaining `?.` Explained - How it Works and When to Use it"
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
      content: "Article(s) > JavaScript Optional Chaining `?.` Explained - How it Works and When to Use it"
    - property: og:description
      content: "JavaScript Optional Chaining `?.` Explained - How it Works and When to Use it"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/javascript-optional-chaining-explained.html
prev: /programming/js/articles/README.md
date: 2020-08-26
isOriginal: false
author: Shruti Kapoor
cover: https://cdn-media-2.freecodecamp.org/w1280/5f9c990e740569d1a4ca1d97.jpg
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
  name="JavaScript Optional Chaining `?.` Explained - How it Works and When to Use it"
  desc="What is optional chaining? Optional chaining, represented by ?. in JavaScript, is a new feature introduced in ES2020.  Optional chaining changes the way properties are accessed from deeply nested objects. It fixes the problem of having to do multiple..."
  url="https://freecodecamp.org/news/javascript-optional-chaining-explained"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn-media-2.freecodecamp.org/w1280/5f9c990e740569d1a4ca1d97.jpg"/>

## What is optional chaining?

Optional chaining, represented by `?.` in JavaScript, is a new feature introduced in ES2020. Optional chaining changes the way properties are accessed from deeply nested objects. It fixes the problem of having to do multiple null checks when accessing a long chain of object properties in JavaScript.

::: info Current Status

ECMAScript proposal at stage 4 of the process.

<SiteInfo
  name="tc39/proposal-optional-chaining"
  desc="https://tc39.github.io/proposal-optional-chaining"
  url="https://github.com/tc39/proposal-optional-chaining"
  logo="https://avatars.githubusercontent.com/u/1725583?s=48&v=4"
  preview="https://opengraph.githubassets.com/baa7cc56411ab06caaa23cd87a78ef3fc3c4d342eb0c4809eb43cc7423521d5e/tc39/proposal-optional-chaining"/>

---

## Use cases

1. Accessing potentially `null` or `undefined` properties of an object.
2. Getting results from a variable that may not be available yet.
3. Getting default values.
4. Accessing long chains of properties.

Imagine you are expecting an API to return an object of this sort:

```js
obj = {
  prop1: {
    prop2: {
      someProp: "value"
    }
  }
};
```

But you may not know if each of these fields are available ahead of time. Some of them may not have been sent back by the API, or they may have come back with null values.

Here is an example:

```js
//expected
obj = {
  id: 9216,
  children: [
    { id: 123, children: null },
    { id: 124, children: [{ id: 1233, children: null }] }
  ]
};

//actual
obj = {
  id: 9216,
  children: null
};
```

This happens very often with functions that call APIs. You may have seen code in React that tries to safeguard against these issues like this:

```jsx
render = () => {
  const obj = {
    prop1: {
      prop2: {
        someProp: "value",
      },
    },
  };

  return (
    <div>
      {obj && obj.prop1 && obj.prop1.prop2 && obj.prop1.prop2.someProp && (
        <div>{obj.prop1.prop2.someProp}</div>
      )}
    </div>
  );
};
```

In order to better prepare for this issue, often times in the past we have used `Lodash`, specifically the `_.get` method:

```js
_.get(obj, prop1.prop2.someProp);
```

This outputs `undefined` if either of those properties are `undefined`. **Optional chaining is exactly that**! Now instead of using an external library, this functionality is built-in.

---

## How does optional chaining work?

`?.` can be used to chain properties that may be `null` or `undefined`.

```js
const propNeeded = obj?.prop1?.prop2?.someProp;
```

If either of those chained properties is `null` or `undefined`, JavaScript will return `undefined`.

What if we want to return something meaningful? Try this:

```js
let familyTree = {
    us: {
        children: {}
    }
}

// with _.get
const grandChildren = _.get(familyTree, 'us.children.theirChildren', 'got no kids' );

//with optional chaining and null coalescing 
const nullCoalescing = familyTree?.us?.children?.theirChildren ?? 'got no kids'
console.log(nullCoalescing) //got no kids
```

It also works for objects that may be `null` or `undefined`:

```js
let user;
console.log(user?.id) // undefined
```

---

## How to get this newest feature

1. Try it in your browser's console: This is a recent addition and old browsers may need polyfills. You can try it in Chrome or Firefox in the browser's console. If it doesn't work, try turning on JavaScript experimental features by visiting `chrome://flags/` and enabling "Experimental JavaScript".
2. Try it in your Node app by using Babel:

```json
{
  "plugins": ["@babel/plugin-proposal-optional-chaining"]
}
```

---

## Resources

<SiteInfo
  name="How to Use JavaScript Optional Chaining"
  desc="Optional chaining accesses properties from deep of nested objects without prop existence verification and intermediate variables boilerplates."
  url="https://dmitripavlutin.com/javascript-optional-chaining/"
  logo="https://dmitripavlutin.com/favicon.ico"
  preview="https://dmitripavlutin.com/javascript-optional-chaining/cover.png"/>

```component VPCard
{
  "title": "@babel/plugin-transform-optional-chaining · Babel",
  "desc": "This plugin is included in @babel/preset-env, in ES2020",
  "link": "https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining",
  "logo": "https://babeljs.io/img/favicon.png",
  "background": "rgba(241,219,108,0.2)"
}
```

---

## TL;DR

Use optional chaining `?.` for objects or long chain properties that may be `null` or `undefined`. The syntax is as follows:

```js
let user = {};
console.log(user?.id?.name)
```

---

Interested in more tutorials and JSBytes from me? [<FontIcon icon="fas fa-globe"/>Sign up for my newsletter.](https://tinyletter.com/shrutikapoor) or [follow me on Twitter (<FontIcon icon="fa-brands fa-x-twitter"/>`shrutikapoor08`)](https://x.com/shrutikapoor08)

<!-- START: ARTICLE CARD -->
```component VPCard
{
  "title": "JavaScript Optional Chaining `?.` Explained - How it Works and When to Use it",
  "desc": "What is optional chaining? Optional chaining, represented by ?. in JavaScript, is a new feature introduced in ES2020.  Optional chaining changes the way properties are accessed from deeply nested objects. It fixes the problem of having to do multiple...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/javascript-optional-chaining-explained.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
