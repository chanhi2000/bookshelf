---
lang: en-US
title: "7. Asynchronous Programming"
description: "Article(s) > (7/12) How to Learn Python for JavaScript Developers [Full Handbook]"
category:
  - Python
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
  - javascript
  - js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (7/12) How to Learn Python for JavaScript Developers [Full Handbook]"
    - property: og:description
      content: "7. Asynchronous Programming"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-python-for-javascript-developers-handbook/7-asynchronous-programming.html
date: 2024-11-22
isOriginal: false
author:
  - name: German Cocca
    url : https://freecodecamp.org/news/author/GerCocca/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Learn Python for JavaScript Developers [Full Handbook]",
  "desc": "As a developer with experience in JavaScript, you likely know how versatile the language is, especially when it comes to web development. JavaScript powers both frontend and backend development (thanks to Node.js) and has grown to become one of the m...",
  "link": "/freecodecamp.org/learn-python-for-javascript-developers-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Learn Python for JavaScript Developers [Full Handbook]"
  desc="As a developer with experience in JavaScript, you likely know how versatile the language is, especially when it comes to web development. JavaScript powers both frontend and backend development (thanks to Node.js) and has grown to become one of the m..."
  url="https://freecodecamp.org/news/learn-python-for-javascript-developers-handbook#heading-7-asynchronous-programming"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732278833514/c23ea6ad-25b9-45c9-a7a7-c32499ca1d8b.jpeg"/>

Asynchronous programming is essential for handling tasks like network requests, file I/O, or any operation that takes time to complete.

Both Python and JavaScript support asynchronous programming, but their implementations differ significantly. JavaScript is inherently asynchronous and event-driven, while Python introduced asynchronous programming more recently with the `asyncio` library and `async/await` syntax.

---

## Event Loop and Promises in JavaScript

JavaScript’s asynchronous model is based on the **event loop**, which processes tasks in a non-blocking manner. This makes it ideal for web applications where responsiveness is key. JavaScript uses **callbacks**, **Promises**, and **async/await** to handle asynchronous tasks.

::: tip Example: Fetching Data with Promises

A common asynchronous operation is fetching data from an API.

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

:::

::: info How it works:

1. The `fetch` function returns a Promise.
2. The `.then` method is used to handle the resolved Promise, where `response.json()` parses the JSON data.
3. The `.catch` method handles errors, such as network issues.

:::

::: tip Example: Using Async/Await

Async/await simplifies the syntax for working with Promises.

```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
```

In this example, `await` pauses the execution of the `fetchData` function until the Promise is resolved or rejected, providing a more synchronous-like flow.

:::

---

## Asyncio and Await Syntax in Python

Python’s asynchronous programming revolves around the `asyncio` library, which introduced the `async` and `await` keywords to handle asynchronous operations. Unlike JavaScript, Python does not have a built-in event loop - it relies on `asyncio` to create and manage one.

::: tip Example: Fetching Data with Asyncio

Using Python’s `aiohttp` library for asynchronous HTTP requests:

```py
import asyncio
import aiohttp

async def fetch_data():
  async with aiohttp.ClientSession() as session:
    async with session.get('https://api.example.com/data') as response:
        data = await response.json()
        print(data)

asyncio.run(fetch_data())
```

:::

::: info How it works:

1. The `async def` syntax defines an asynchronous function.
2. `await` is used to pause execution until the `get` request completes.
3. `asyncio.run()` starts the event loop and runs the asynchronous function.

:::

::: important Key Differences from JavaScript

- Python explicitly defines asynchronous functions with `async def`.
- The `asyncio` library is required to run the event loop.
- Python’s `async/await` syntax is more structured but requires more setup compared to JavaScript.

:::

---

## Use Cases and Performance Considerations

Asynchronous programming is suitable for tasks that involve waiting, such as network requests, file I/O, or database queries. Here’s how Python and JavaScript handle common use cases:

### <FontIcon icon="fa-brands fa-js"/>Real-Time Applications (JavaScript)

JavaScript’s event-driven model makes it ideal for real-time applications like chat systems, live streaming, or collaborative tools.

::: tip Example: WebSocket in JavaScript

```js
const socket = new WebSocket('ws://example.com/socket');

socket.onmessage = (event) => {
  console.log('Message from server:', event.data);
};
```

:::

### <FontIcon icon="fa-brands fa-python"/>I/O-Bound Tasks (Python)

Python’s asynchronous model excels at handling I/O-bound tasks such as file processing, web scraping, or database queries.

::: tip Example: Asynchronous File Reading in Python

```py
import aiofiles
import asyncio

async def read_file():
    async with aiofiles.open('example.txt', mode='r') as file:
        content = await file.read()
        print(content)

asyncio.run(read_file())
```

:::

::: note Performance Considerations

1. **Concurrency**: Both languages handle concurrency well, but JavaScript’s event loop and non-blocking I/O model are better suited for high-throughput, real-time applications.
2. **Threading**: Python’s `asyncio` works best for I/O-bound tasks. For CPU-bound tasks, Python relies on multi-threading or multi-processing.
3. **Ease of Use**: JavaScript’s async/await is simpler to implement for beginners, while Python requires familiarity with `asyncio` for similar functionality.

:::

::: important Key Takeaways:

- **JavaScript**: Asynchronous programming is central to JavaScript’s design. Its event loop and Promises make it highly efficient for real-time, event-driven applications.
- **Python**: Asynchronous programming is a newer addition to Python, focused on handling I/O-bound tasks efficiently with `asyncio`.
- **Syntax**: Both languages use `async/await`, but Python requires explicit setup with `asyncio`, while JavaScript integrates it natively.

:::