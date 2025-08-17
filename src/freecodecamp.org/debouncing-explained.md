---
lang: en-US
title: "Debouncing in React - How to Delay a JS Function"
description: "Article(s) > Debouncing in React - How to Delay a JS Function"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Debouncing in React - How to Delay a JS Function"
    - property: og:description
      content: "Debouncing in React - How to Delay a JS Function"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/debouncing-explained.html
prev: /programming/js-react/articles/README.md
date: 2022-06-15
isOriginal: false
author: Nishant Kumar
cover: https://freecodecamp.org/news/content/images/2022/06/How-to-Build-a-Weather-Application-using-React--14-.png
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
  name="Debouncing in React - How to Delay a JS Function"
  desc="By Nishant Kumar There are some heavy tasks in software development. Take calling an API, for example. Suppose we have an API that searches a list of users, and we can't afford to fire it too often. We want to search only when we have typed the whole..."
  url="https://freecodecamp.org/news/debouncing-explained"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/06/How-to-Build-a-Weather-Application-using-React--14-.png"/>

There are some heavy tasks in software development. Take calling an API, for example. Suppose we have an API that searches a list of users, and we can't afford to fire it too often. We want to search only when we have typed the whole search query.

Well, [**debouncing is a practice in software development**](/freecodecamp.org/javascript-debounce-example.md) which makes sure that certain heavy tasks like the one above don't get fired so often.

---

## When to Use Debouncing

Let's understand this with an example. Suppose we have an input element that gets some data when we type something. For example, let's say we type any pin-code, and it returns some data.

But there is a catch here. Let's say our pin-code is 800001. If we type the first character, that is 8, we will send request to the backend server. Then we type 0, and we will send another request to the server, and so on.

This calls the API so many times, and in turn overuses the requests. So, to prevent this, we use something called a debounce function.

So to achieve this, we have a feature in JavaScript called Debouncing.

---

## Debouncing in JavaScript - a Practical Example

In the below example, we are simply calling an API using the **axios.get** method when we type any numeric character in the input box.

The input character is getting passed to the function as an argument and we are passing the value as path parameters. We are also logging the response in the console.

```jsx
import axios from "axios";
import React from "react";
import "./styles.css";

export default function App() {
  const setInput = (value) => {
    axios
      .get(`https://api.postalpincode.in/pincode/${value}`)
      .then((response) => {
        console.log(response.data[0]?.PostOffice[0]);
      });
  };
  return (
    <div className="app">
      <input
        placeholder="Search Input.."
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
```

But the catch here is, every time we write a character, our API will get triggered. So going back to our example above, let's say we want to type 800001. Again, as soon as we type 8, the API will be triggered and it will search the character 8. Then we will type 0 (zero), and the API will search for 80, and so on.

Now, let's change the whole flow in order to add debouncing. In the case of Debouncing, the API will trigger only once after 2 seconds, after we type our whole pin-code.

First of all, create a state using the **useState** hook in React.

```jsx
const [pinCode, setPinCode] = React.useState("");
```

Now, we need to set the data in the **pinCode** state when we type something, using the **onChange** event handler.

```jsx
<input
  placeholder="Search Input.."
  onChange={(event) => setPinCode(event.target.value)}
/>
```

Now, let's have a **useEffect Hook** that will run every time our pin-code changes, or when we type something in the search input.

```jsx
React.useEffect(() => {

}, [pinCode])
```

In this useEffect Hook, we will have a function called **getData**. This function getData will have a callback function called **setTimeOut**. And we will set the timer for 2 seconds.

```jsx
React.useEffect(() => {
  const getData = setTimeout(() => {

  }, 2000)
}, [pinCode])
```

And now in this **getData** function, let's call our API.

```jsx
React.useEffect(() => {
  const getData = setTimeout(() => {
    axios
    .get(`https://api.postalpincode.in/pincode/${pinCode}`)
    .then((response) => {
      console.log(response.data[0]);
    });
  }, 2000)
}, [pinCode])
```

We will also need to destroy the instance of the **useEffect hook** using **return**, followed by **clearTimeout**, every time it finishes.

```jsx
React.useEffect(() => {
  const getData = setTimeout(() => {
    axios
    .get(`https://api.postalpincode.in/pincode/${pinCode}`)
    .then((response) => {
      console.log(response.data[0]);
    });
  }, 2000)

  return () => clearTimeout(getData)
}, [pinCode])
```

And we are done. Let's type something in the input, and after 2 seconds we will get our results.

![](https://freecodecamp.org/news/content/images/2022/06/Screenshot-2022-06-11-200335.png)

And there you have it!

---

## Wrapping Up

Now you know how and why to use the debounce function. So simple and easy right?

Now, if we type any search query in the input, it will display after 2 seconds just when we stop changing the input. And we used **debouncing** to do this.

There are multiple applications of debouncing. We can use it to keep from hitting our API over and over. And we can use it to make sure the the form data gets submitted only once, even if we click the submit button multiple times.

You can also check out my video on Youtube on [<FontIcon icon="fa-brands fa-youtube"/>React Debounce Function in 100 Seconds - Delay a function in React](https://youtu.be/EApDvKguG_0).

Get the code [<FontIcon icon="iconfont icon-codesandbox"/>here](https://codesandbox.io/s/react-debouncing-k5qdlv?file=/src/App.js).

Happy learning.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Debouncing in React - How to Delay a JS Function",
  "desc": "By Nishant Kumar There are some heavy tasks in software development. Take calling an API, for example. Suppose we have an API that searches a list of users, and we can't afford to fire it too often. We want to search only when we have typed the whole...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/debouncing-explained.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
