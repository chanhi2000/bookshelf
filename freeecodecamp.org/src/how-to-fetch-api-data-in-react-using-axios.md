---
lang: en-US
title: "How to Fetch API Data in React Using Axios"
description: "Article(s) > How to Fetch API Data in React Using Axios"
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
      content: "Article(s) > How to Fetch API Data in React Using Axios"
    - property: og:description
      content: "How to Fetch API Data in React Using Axios"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-fetch-api-data-in-react-using-axios.html
prev: /programming/js-react/articles/README.md
date: 2025-07-02
isOriginal: false
author:
  - name: Oluwadamisi Samuel
    url : https://freecodecamp.org/news/author/Oluwadamisi/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1751385483454/7e7949aa-4bcd-4f58-9725-36df67b866a5.png
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
  name="How to Fetch API Data in React Using Axios"
  desc="Learning how to fetch data from APIs is a must-have skill for any developer. Whether you're building a simple portfolio site or working on real-world applications, you'll often need to connect to external data sources. Being comfortable with API call..."
  url="https://freecodecamp.org/news/how-to-fetch-api-data-in-react-using-axios"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1751385483454/7e7949aa-4bcd-4f58-9725-36df67b866a5.png"/>

Learning how to `fetch` data from `APIs` is a must-have skill for any developer. Whether you're building a simple portfolio site or working on real-world applications, you'll often need to connect to external data sources. Being comfortable with API calls shows you're ready to contribute to real projects and work well in a team.

This beginner-friendly tutorial is designed for junior developers and anyone new to React. You'll learn how to `fetch data` from an API, then `store` and `display` it in your React app. No advanced knowledge required - we'll break everything down step by step, so you can follow along and build confidence as you go.

We'll be using `React`, `Vite`, `Axios`, and `Tailwind CSS` to build a simple app that retrieves and displays data from a public API. First, we’ll fetch data using the built-in fetch method. Then we’ll refactor it using Axios, a popular library that simplifies `HTTP requests`.

::: note Prerequisites

To follow along with this article, you should:

- Be familiar with basic React concepts like components and `useState`
- Know what an `API` is and that it returns data (usually in JSON)
- Have some experience with JavaScript promises and the `.then()` method. (If you’ve seen or used `.then()` before, that’s enough - we'll build on that).
- Be comfortable using `map()` to render lists from arrays (the data we get from the API)
- Be able to run a React project using tools like Vite or Create React App

:::

---

## What is an API and Why Do We Need it?

An API, or Application Programming Interface, is a way for different systems to communicate. Think of it like a waiter at a restaurant. You tell the waiter what you want from the menu (the request), they take that order to the kitchen (the server), and then bring your food back to the table (the response).

In web development, APIs let your frontend application talk to a backend service. Most of the time, this communication happens through HTTP requests. You make a request to a specific URL (called an endpoint), and you get a response, usually in `JSON (JavaScript Object Notation)` format. JSON is lightweight, easy to read, and works well with JavaScript.

Here’s a basic GET request example:

```http
GET https://jsonplaceholder.typicode.com/users
```

This GET request asks the server for a list of users. The response will look something like this:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "JohnDOe@email.com",
  },
  {
    "id": 2,
    "name": "Jane Doe",
    "email": "JaneDoe@email.com",
  },
   //...more users
]
```

Your React app can grab this JSON, store it in state, and display it in the browser. That’s the basic API cycle you’ll see again and again in real-world applications:

- Make the request
- Wait for the response
- Parse the JSON
- Use the data in your UI

Understanding `APIs` and `JSON` is essential. You’ll use them to fetch user profiles, submit forms, update dashboards, search databases, and so much more.

---

## Types of APIs You’ll Encounter

Not all APIs are the same. Understanding the types of APIs you'll come across will help you know what tools or steps you’ll need to work with them.

### 1. Public APIs (No Key Required)

These are open-access APIs that anyone can use. They don’t require authentication or an API key. They're great for testing, learning, and building demo apps.

::: tip Example:

```http
GET https://jsonplaceholder.typicode.com/users
```

### 2. Public APIs (With API Key)

Some APIs are public, but still require an API key. This helps the provider track usage and prevent abuse. You'll usually sign up to get a free key.

::: tip Example:

```http
GET https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY
```

- `https://newsapi.org/v2/top-headlines` - the actual API endpoint
- `country=us` - a query parameter specifying you want “US headlines”
- `apiKey=YOUR_API_KEY` - this is your personal API key you get after signing up on [<VPIcon icon="fas fa-globe"/>newsapi.org](http://newsapi.org)

:::

::: info To use these APIs, you’ll need to:

- Sign up on the provider’s site
- Store your key (safely) in your app (we will explore that later on)
- Pass it as a query parameter or header

:::

### 3. Private APIs

These are usually used internally in companies. They often require more advanced forms of authentication, like OAuth tokens or session cookies. You won’t typically use these unless you’re working on the backend or within a team project.

### 4. Using Bearer Tokens for API Authentication

When working with modern APIs, it's common to encounter APIs that require authentication using a `Bearer token` instead of a simple API key in the URL. The only difference here is that you pass in an `object` that contains the Bearer token instead of just the api key variable (for example, The Movie Database (TMDB) API).

This approach is more secure because it keeps the token out of the URL and browser history. It also aligns with token-based authentication standards like OAuth 2.0.

::: note

When working with third-party APIs, always check the documentation to see how authentication should be handled. Authentication methods vary - some APIs require passing the key in the URL, others expect it in the headers.

:::

---

## Tools We’ll Use

- **React:** our JavaScript UI library of choice
- **Tailwind CSS:** For quick styling
- **fetch:** Native browser method for making HTTP requests
- **Axios:** Optional library that makes requests more convenient

Learning how to use these tools and methods will make it easier to adapt to different production methods and environments.

---

## How to Fetch Data with React

Now you need to understand the basic structure and tools you need in order to fetch data with React and store that data to use in your components. To do this properly, you'll need to understand a few core tools and concepts:

- **useState hook:** Lets you create and manage local state inside your component. You'll use it to hold the data you fetch, and track things like whether you're still loading or if there was an error.
- **useEffect hook:** Allows you to perform operations that need to run after the component renders, such as fetching data, subscribing to events, or updating the DOM.
- **HTTP Requests:** These are how you talk to APIs. You can use the browser-native `fetch()` method or third-party tools like Axios.

A basic data fetching flow looks like this:

- Set up state to hold your data when it arrives
- Use the useEffect() hook to make the API call
- Handle loading and error states
- Store and display the data once it arrives

Now that you’ve got the fundamentals, let’s walk through two ways to fetch data: first using `fetch()`, then using `Axios`.

### How to Fetch Data with `fetch()`

The `fetch()` method is a native browser feature that allows you to send `HTTP` requests directly from the frontend. It’s useful for making basic API calls without any additional libraries.

To use `fetch()` in React, you'll typically follow this pattern:

- Use the `useEffect()` hook to ensure the fetch call only runs once when the component mounts.
- Call `fetch('url')` to send the HTTP GET request.
- Use `.json()` to parse the JSON response.
- Store the response in state using useState().

**Let’s see an example:**

Import the necessary hooks and make the fetch call inside useEffect.js:

```jsx title="App.jsx"
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
   // res.json() converts the raw response into JSON.
   // setUsers(data) updates the React state with that JSON and stores it in state so you can access it.

  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List (using fetch)</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map(user => (
          <li key={user.id} className="bg-white shadow p-4 rounded-xl">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
//Map through the stored data in the state and display the contents
// in a list and access the properties from the data(user.name)
  );
}

export default App;
```

### Refactor with Axios

Axios is a third-party library that makes HTTP requests easier and more reliable. While `fetch()` is built into the browser, Axios simplifies several things, like automatic JSON parsing and cleaner error handling.

#### Why Use Axios Over fetch

- Axios automatically converts the response to JSON - you don’t need to call `.json()` manually.
- It has built-in support for request and response interceptors.
- It makes it easier to send headers, handle errors, and work with non-GET requests (POST, DELETE, and so on).

**First, install Axios in your project via the terminal:**

```sh
npm install axios
```

Import the necessary hooks and Axios and make the API call inside useEffect.

```jsx title="App.jsx"
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data);
      // response.data contains the parsed JSON from the API.
      // setUsers(data) updates the React state with that JSON and stores it in state so you can access it.
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User List (using Axios)
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map(user => (
          <li key={user.id} className="bg-white shadow p-4 rounded-xl">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">{user.company.name}</p>
          </li>
        ))}
      </ul>
    </div>
// Map through the stored data in the state and display the contents
// in a list and access the properties from the data(user.name)
  );
}

export default App;
```

---

## How to Handle Loading and Error States

When working with data fetching in React, things don't always go perfectly. Sometimes data takes time to arrive and other times the request fails. Loading and Error states come in handy because they give you feedback and make it both user and developer friendly.

### What is a Loading State?

A loading state is used to show that data is being fetched. Without it, users might not know what is happening and think the request did not go through or the app isn't working. You typically use a boolean to track this.

### What is an Error State?

An error state tells you something went wrong - maybe the API is down, or the URL was incorrect. Catching and displaying these errors helps you debug faster and gives users clear feedback.

#### Code Snippet

Here's how you might add loading and error handling to a basic `fetch()` request:

```jsx
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      setUsers(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, []);

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;
```

This gives you a smoother user experience and makes your app more reliable.

---

## How to Keep Your API Keys Safe

If you're using an API that requires a key, it's critical to keep that key secure. Never hardcode your API keys directly into your React components or push them to public repositories. Instead, store them in a <VPIcon icon="fas fa-file-line"/>`.env` file at the root of your project(the same directory as your package.json file). In your <VPIcon icon="fas fa-file-line"/>`.env` file do this:

```sh title=".env"
VITE_API_KEY=your_actual_key_here
```

To access it in your app, use:

```js
const apiKey = import.meta.env.VITE_API_KEY;
```

You can then use this key in your API requests. Here's how you would include it in the Axios example:

```jsx
axios.get(`https://api.example.com/data?apikey=${apiKey}`)
  .then(response => {
    setUsers(response.data);
    setLoading(false);
  })
  .catch(error => {
    setError(error.message);
    setLoading(false);
  });
```

::: note

In Vite, all environment variables must start with VITE_ to be accessible in the browser. Make sure to add .env to your .gitignore file so it doesn’t get pushed to GitHub.

:::

Hiding your key helps prevent exposing your it to the public, especially if your project is shared on GitHub or deployed online.

::: important Why this is important:

- Exposed keys can be abused, leading to overages or bans from the API provider
- You could lose access or rack up charges depending on the service
- In secure apps, exposed keys can be a major security vulnerability

:::

Always treat your keys like passwords. If a key does get exposed, revoke it and generate a new one from your API provider’s dashboard.

---

## Fun Public APIs to Practice With

Here are some fun and free APIs you can use to build practice projects.:

### 1. JSONPlaceholder

Fake data for testing: users, posts, comments, todos. No key required.

### 2. The Dog API

Get random pictures, breed info, and search by breed. Requires a free API key.

### 3. The Cat API

Just like the Dog API, but for cats. Great for image-heavy apps. Free API key.

### 4. PokeAPI

Fetch detailed Pokémon data. Great for cards, search filters, or games. No key required.

### 5. TMDB API

Get movie data, trending shows, cast details, posters, and more. Requires a free API key from TMDB( You can clone popular streaming sites with this).

### 6. REST Countries API

Retrieve country names, capitals, regions, flags, and populations. No API key required.

### 7. Bored API

Get random activity suggestions for when you're bored. No key required.

### 8. JokeAPI

Fetch jokes by category or type (safe for work, programming, dark humor). No key needed.

### 9. Rick and Morty API

Explore characters, locations, and episodes. Perfect for fans. No key required.

### 10. NASA APIs

Explore images, astronomy data, and space facts. Requires free API key from NASA.

Play around with different data formats, add filters or search, and combine multiple APIs into one project. It's great practice for real-world app development.

---

## Conclusion

What you've just built is the foundation of countless real-world applications. The ability to fetch, manage, and display data from APIs is essential in web development.

From here, you can extend this app to:

- Add search or filter functionality
- Paginate the results
- Display details on a separate page

As you continue to grow as a developer, the patterns you practiced here will show up again and again. Mastering them now sets you up for success later.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Fetch API Data in React Using Axios",
  "desc": "Learning how to fetch data from APIs is a must-have skill for any developer. Whether you're building a simple portfolio site or working on real-world applications, you'll often need to connect to external data sources. Being comfortable with API call...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-fetch-api-data-in-react-using-axios.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
