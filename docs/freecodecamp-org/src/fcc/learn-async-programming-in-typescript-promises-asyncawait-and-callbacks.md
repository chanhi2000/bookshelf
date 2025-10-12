---
lang: en-US
title: "Learn Async Programming in TypeScript: Promises, Async/Await, and Callbacks [Full Handbook]"
description: "Article(s) > Learn Async Programming in TypeScript: Promises, Async/Await, and Callbacks [Full Handbook]"
icon: iconfont icon-typescript
category:
  - TypeScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ts
  - typescript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Learn Async Programming in TypeScript: Promises, Async/Await, and Callbacks [Full Handbook]"
    - property: og:description
      content: "Learn Async Programming in TypeScript: Promises, Async/Await, and Callbacks [Full Handbook]"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-async-programming-in-typescript-promises-asyncawait-and-callbacks.html
prev: /programming/ts/articles/README.md
date: 2025-02-01
isOriginal: false
author:
  - name: Isaiah Clifford Opoku
    url : https://freecodecamp.org/news/author/Clifftech/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1737747600016/f6df015b-cc25-4c37-8c4e-bec9c8c49dc5.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TypeScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/ts/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn Async Programming in TypeScript: Promises, Async/Await, and Callbacks [Full Handbook]"
  desc="Async programming is a programming paradigm that allows you to write code that runs asynchronously. In contrast to synchronous programming, which executes code sequentially, async programming allows code to run in the background while the rest of the..."
  url="https://freecodecamp.org/news/learn-async-programming-in-typescript-promises-asyncawait-and-callbacks"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1737747600016/f6df015b-cc25-4c37-8c4e-bec9c8c49dc5.png"/>

Async programming is a programming paradigm that allows you to write code that runs `asynchronously`. In contrast to synchronous programming, which executes code sequentially, async programming allows code to run in the background while the rest of the program continues to execute. This is particularly useful for tasks that may take a long time to complete, such as fetching data from a remote API.

Async programming is essential for creating responsive and efficient applications in JavaScript. TypeScript, a superset of JavaScript, makes it even easier to work with async programming.

There are several approaches to **async programming** in TypeScript, including using `promises`, `async`/`await`, and `callbacks`. We will cover each of these approaches in detail so that you can choose the best one(s) for your use case.

---

## Why is Async Programming Important?

Async programming is crucial for building responsive and efficient web applications. It allows tasks to run in the background while the rest of the program continues, keeping the user interface responsive to input. Also, async programming can boost overall performance by letting multiple tasks run at the same time.

There are many real-world examples of async programming, such as accessing user cameras and microphones and handling user input events. Even if you don't frequently create asynchronous functions, it's important to know how to use them correctly to make sure your application is reliable and performs well.

### How TypeScript Makes Async Programming Easier

TypeScript offers several features that simplify async programming, including `type safety`, `type inference`, `type checking`, and `type annotations`.

With type safety, you can ensure your code behaves as expected, even when dealing with asynchronous functions. For instance, TypeScript can catch errors related to null and undefined values at compile time, saving you time and effort in debugging.

TypeScript's type inference and checking also reduce the amount of boilerplate code you need to write, making your code more concise and easier to read.

And TypeScript's type annotations provide clarity and documentation for your code, which is especially helpful when working with asynchronous functions that can be complex to understand.

Now let’s dive in and learn about these three key features of asynchronous programming: promises, async/await, and callbacks.

---

## How to Use Promises in TypeScript

**Promises** are a powerful tool for handling asynchronous operations in TypeScript. For instance, you might use a promise to fetch data from an external API or to perform a time-consuming task in the background while your main thread keeps running.

To use a Promise, you create a new instance of the `Promise` class and pass it a function that carries out the asynchronous operation. This function should call the resolve method with the result when the operation succeeds or the reject method with an error if it fails.

Once the Promise is created, you can attach callbacks to it using the `then` method. These callbacks will be triggered when the Promise is fulfilled, with the resolved value passed as a parameter. If the Promise is rejected, you can attach an error handler using the catch method, which will be called with the reason for the rejection.

Using Promises offers several advantages over traditional callback-based methods. For example, Promises can help prevent "callback hell," a common issue in asynchronous code where nested callbacks become hard to read and maintain.

Promises also make error handling in asynchronous code easier, as you can use the catch method to manage errors that occur anywhere in the Promise chain.

Finally, Promises can simplify your code by providing a consistent, composable way to handle asynchronous operations, regardless of their underlying implementation.

### How to Create a Promise

Promise syntax:

```ts
const myPromise = new Promise((resolve, reject) => {
  // Do some asynchronous operation
  // If the operation is successful, call resolve with the result
  // If the operation fails, call reject with an error object
});

myPromise
  .then((result) => {
    // Handle the successful result
  })
  .catch((error) => {
    // Handle the error
  });
```

::: tip Example 1. How to create a promise

```ts :collapsed-lines
function myAsyncFunction(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    // Some asynchronous operation
    setTimeout(() => {
      // Successful operation resolves promiseCheck out my latest blog post on mastering async programming in TypeScript! Learn how to work with Promises, Async/Await, and Callbacks to write efficient and scalable code. Get ready to take your TypeScript skills to the next level!
      const success = true;

      if (success) {
        // Resolve the promise with the operation result if the operation was successful
        resolve(
          `The result is success and your operation result is ${operationResult}`
        );
      } else {
        const rejectCode: number = 404;
        const rejectMessage: string = `The result is failed and your operation result is ${rejectCode}`;
        // Reject the promise with the operation result if the operation failed
        reject(new Error(rejectMessage));
      }
    }, 2000);
  });
}

// Use the promise
myAsyncFunction()
  .then((result) => {
    console.log(result); // output : The result is success and your operation result is 4
  })
  .catch((error) => {
    console.error(error); // output : The result is failed and your operation result is 404
  });
```

In the example above, we have a function called `myAsyncFunction()` that returns a `promise`. We use the `Promise` constructor to create the promise, which takes a **callback function** with `resolve` and `reject` arguments. If the asynchronous operation is successful, we call the resolve function. If it fails, we call the reject function.

The promise object returned by the constructor has a `then()` method, which takes success and failure callback functions. If the promise resolves successfully, the success callback function is called with the result. If the promise is rejected, the failure callback function is called with an error message.

The promise object also has a `catch()` method used to handle errors that occur during the promise chain. The `catch()` method takes a callback function, which is called if any error occurs in the promise chain.

:::

Now, let's move on to how to chain promises in TypeScript.

### How to Chain Promises

Chaining promises allows you to perform **multiple asynchronous operations** in sequence or in parallel. This is helpful when you need to carry out several async tasks one after another or at the same time. For instance, you might need to fetch data asynchronously and then process it asynchronously.

Let's look at an example of how to chain promises:

::: tip Example 2. How chaining promises works

```ts :collapsed-lines
// First promise
const promise1 = new Promise((resolve, reject) => {
  const functionOne: string = "This is the first promise function";
  setTimeout(() => {
    resolve(functionOne);
  }, 1000);
});

// Second promise
const promise2 = (data: number) => {
  const functionTwo: string = "This is the second second promise  function";
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(` ${data}  '+'  ${functionTwo} `);
    }, 1000);
  });
};

// Chaining first and second promises together
promise1
  .then(promise2)
  .then((result) => {
    console.log(result); // output: This is the first promise function + This is the second second promise function
  })
  .catch((error) => {
    console.error(error);
  });
```

In the example above, we have two promises: `promise1` and `promise2`. `promise1` resolves after 1 second with the string "This is the first promise function." `promise2` takes a number as input and returns a promise that resolves after 1 second with a string that combines the input number and the string "This is the second promise function."

We chain the two promises together using the `then` method. The output `promise1` is passed as input to `promise2`. Finally, we use the `then` method again to log the output of `promise2` to the console. If either `promise1` or `promise2` rejects, the error will be caught by the `catch` method.

:::

Congratulations! You have learned how to create and chain promises in TypeScript. You can now use promises to perform asynchronous operations in TypeScript. Now, let's explore how `Async/Await` works in TypeScript.

---

## How to Use Async / Await in TypeScript

**Async/await** is a syntax introduced in ES2017 to make working with Promises easier. It allows you to write asynchronous code that looks and feels like synchronous code.

In TypeScript, you can define an asynchronous function using the `async` keyword. This tells the compiler that the function is asynchronous and will return a Promise.

Now, let's see how to use async/await in TypeScript.

Async / Await Syntax:

```ts
// Async / Await Syntax in TypeScript
async function functionName(): Promise<ReturnType> {
  try {
    const result = await promise;
    // code to execute after promise resolves
    return result;
  } catch (error) {
    // code to execute if promise rejects
    throw error;
  }
}
```

In the example above, `functionName` is an async function that returns a Promise of `ReturnType`. The `await` the keyword is used to wait for the promise to resolve before moving to the next line of code.

The `try/catch` block is used to handle any errors that occur while running the code inside the async function. If an error happens, it will be caught by the catch block, where you can handle it appropriately.

### Using Arrow Functions with Async / Await

You can also use arrow functions with async/await syntax in TypeScript:

```ts
const functionName = async (): Promise<ReturnType> => {
  try {
    const result = await promise;
    // code to execute after promise resolves
    return result;
  } catch (error) {
    // code to execute if promise rejects
    throw error;
  }
};
```

In the example above, `functionName` is defined as an arrow function that returns a Promise of `ReturnType`. The async keyword indicates that this is an asynchronous function, and the await keyword is used to wait for the promise to resolve before moving to the next line of code.

### Async / Await with an API Call

Now, let's go beyond the syntax and fetch some data from an API using async/await.

```ts :collapsed-lines
interface User {
  id: number;
  name: string;
  email: string;
}

const fetchApi = async (): Promise<void> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(
        `Failed to fetch users (HTTP status code: ${response.status})`
      );
    }

    const data: User[] = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

fetchApi();
```

Here, we’re fetching data from the JSONPlaceholder API, converting it to JSON, and then logging it to the console. This is a real-world example of how to use async/await in TypeScript.

![You should see user information in the console. This image shows the output](https://cdn.hashnode.com/res/hashnode/image/upload/v1737554438217/a1b865ea-0903-4749-a079-c8401be05787.png)

### Async/Await with Axios API call

::: tip Example 3. How to use async / await in typescript

```ts
const fetchApi = async (): Promise<void> => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const data = await response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

fetchApi();
```

In the example above, we define the `fetchApi()` function using async/await and the `Axios.get()` method to make an HTTP GET request to the specified URL. We use await to wait for the response, then extract the data using the data property of the response object. Finally, we log the data to the console with `console.log()`. Any errors that occur are caught and logged to the console with `console.error()`.

:::

We can achieve this using Axios, so you should see the same result in the console.

![This image shows the output when using Axios in the console](https://cdn.hashnode.com/res/hashnode/image/upload/v1737554631796/4f85a12d-6a9b-4eaa-9ab9-910a8a463dc6.png)

Before you try the code above, you need to install Axios using npm or yarn.

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add axios
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm install axios
```

:::

If you're not familiar with Axios, you can [learn more about it here (<VPIcon icon="fa-brands fa-npm"/>`axios`)](https://npmjs.com/package/axios).

You can see that we used a `try` and `catch` block to handle errors. The `try` and `catch` block is a method for managing errors in TypeScript. So, whenever you make API calls like we just did, make sure you use a `try` and `catch` block to handle any errors.

Now, let's explore a more advanced use of the `try` and `catch` block in TypeScript:

::: tip Example 4. How to use async / await in typescript

```ts
interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

const fetchRecipes = async (): Promise<Recipe[] | string> => {
  const api = "https://dummyjson.com/recipes";
  try {
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }

    const { recipes } = await response.json();
    return recipes; // Return the recipes array
  } catch (error) {
    console.error("Error fetching recipes:", error);
    if (error instanceof Error) {
      return error.message;
    }
    return "An unknown error occurred.";
  }
};

// Fetch and log recipes
fetchRecipes().then((data) => {
  if (Array.isArray(data)) {
    console.log("Recipes fetched successfully:", data);
  } else {
    console.error("Error message:", data);
  }
});
```

In the example above, we define an `interface Recipe` that outlines the structure of the data we expect from the API. We then create the `fetchRecipes()` function using async/await and the fetch() method to make an HTTP GET request to the specified API endpoint.

We use a `try/catch` block to handle any errors that might occur during the API request. If the request is successful, we extract the data property from the response using await and return it. If an error occurs, we check for an error message and return it as a string if it exists.

Finally, we call the `fetchRecipes()` function and use `.then()` to log the returned data to the console. This example demonstrates how to use `async/await` with `try/catch` blocks to handle errors in a more advanced scenario, where we need to extract data from a response object and return a custom error message.

![This image shows the output result of the code](https://cdn.hashnode.com/res/hashnode/image/upload/v1737557515062/922592da-e9a6-4792-9d22-d5f8f8e84889.png)

:::

### Async / Await with `Promise.all`

`Promise.all()` is a method that takes an array of promises as input (an iterable) and returns a single Promise as output. This Promise resolves when all the input promises have been resolved or if the input iterable contains no promises. It rejects immediately if any of the input promises are rejected or if non-promises throw an error, and it will reject with the first rejection message or error.

::: tip Example 5. Using async / await with Promise.all

```ts :collapsed-lines
interface User {
  id: number;
  name: string;
  email: string;
  profilePicture: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const fetchApi = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Network response was not ok for ${url}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching data from ${url}`);
  }
};

const fetchAllApis = async (): Promise<[User[], Post[], Comment[]]> => {
  try {
    const [users, posts, comments] = await Promise.all([
      fetchApi<User[]>("https://jsonplaceholder.typicode.com/users"),
      fetchApi<Post[]>("https://jsonplaceholder.typicode.com/posts"),
      fetchApi<Comment[]>("https://jsonplaceholder.typicode.com/comments"),
    ]);
    return [users, posts, comments];
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching data from one or more APIs");
  }
};

fetchAllApis()
  .then(([users, posts, comments]) => {
    console.log("Users: ", users);
    console.log("Posts: ", posts);
    console.log("Comments: ", comments);
  })
  .catch((error) => console.error(error));
```

In the code above, we used `Promise.all` to fetch multiple APIs at the same time. If you have several APIs to fetch, you can use `Promise.all` to get them all at once. As you can see, we used `map` to loop through the array of APIs and then pass it to `Promise.all` to fetch them simultaneously.

![The image below shows the output from the API calls](https://cdn.hashnode.com/res/hashnode/image/upload/v1737560380441/14bbecbb-7dad-464e-b412-028f56e9d679.png)

:::

Let's see how to use `Promise.all` with Axios:

::: tip Example 6. Using async / await with axios and <code>Promise.all</code>

```ts
const fetchApi = async () => {
  try {
    const urls = [
      "https://jsonplaceholder.typicode.com/users",
      "https://jsonplaceholder.typicode.com/posts",
    ];
    const responses = await Promise.all(urls.map((url) => axios.get(url)));
    const data = await Promise.all(responses.map((response) => response.data));
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

fetchApi();
```

In the example above, we're using `Promise.all` to fetch data from two different URLs at the same time. First, we create an array of URLs, then use the map to create an array of Promises from the `axios.get` calls. We pass this array to `Promise.all`, which returns an array of responses. Finally, we use the map again to get the data from each response and log it to the console.

:::

---

## How to Use Callbacks in TypeScript

A **callback** is a function passed as an argument to another function. The callback function is executed inside the other function. Callbacks ensure that a function doesn't run before a task is completed - but that it then runs right after the task finishes. They help us write asynchronous JavaScript code and prevent problems and errors.

::: tip Example 7. Using callbacks in typescript

```ts 
const add = (a: number, b: number, callback: (result: number) => void) => {
  const result = a + b;
  callback(result);
};

add(10, 20, (result) => {
  console.log(result);
});
```

![The image below shows the callback function](https://cdn.hashnode.com/res/hashnode/image/upload/v1737560660649/80203145-d053-49b8-a160-a1d72ed17a7a.png)

:::

Let's see another example of using callbacks in TypeScript:

::: tip Example 8. Using a callback function in TypeScript

```ts :collapsed-lines
type User = {
  name: string;
  email: string;
};

const fetchUserData = (
  id: number,
  callback: (error: Error | null, user: User | null) => void
) => {
  const api = `https://jsonplaceholder.typicode.com/users/${id}`;
  fetch(api)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => {
      const user: User = {
        name: data.name,
        email: data.email,
      };
      callback(null, user);
    })
    .catch((error) => {
      callback(error, null);
    });
};

// Usage of fetchUserData with a callback function
fetchUserData(1, (error, user) => {
  if (error) {
    console.error(error);
  } else {
    console.log(user);
  }
});
```

In the example above, we have a function called `fetchUserData` that takes an `id` and a `callback` as parameters. This `callback` is a function with two parameters: an error and a user.

The `fetchUserData` function retrieves user data from a JSONPlaceholder API endpoint using the `id`. If the fetch is successful, it creates an `User` object and passes it to the callback function with a null error. If there's an error during the fetch, it sends the error to the callback function with a null user.

To use the `fetchUserData` function with a callback, we provide an `id` and a callback function as arguments. The callback function checks for errors and logs the user data if there are no errors.

![The image below shows the output of the API calls](https://cdn.hashnode.com/res/hashnode/image/upload/v1737560996613/2b37fa46-1ee4-4dee-8d50-82c09a235aec.png)

:::

### How to Use Callbacks Responsibly

While callbacks are fundamental to asynchronous programming in TypeScript, they require careful management to avoid **"callback hell"** - the pyramid-shaped, deeply nested code that becomes hard to read and maintain. Here's how to use callbacks effectively:

#### 1. Avoid deep nesting

- Flatten your code structure by breaking complex operations into named functions
- Use promises or async/await for complex async workflows (more on this below)

#### 2. Error handling first

- Always follow the Node.js convention of `(error, result)` parameters
- Check for errors at every level of nested callbacks

```ts
function processData(input: string, callback: (err: Error | null, result?: string) => void) {
  // ... always call callback with error first
}
```

#### 3. Use type annotations

- Leverage TypeScript's type system to enforce callback signatures
- Define clear interfaces for callback parameters

```ts
type ApiCallback = (error: Error | null, data?: ApiResponse) => void;
```

#### 4. Consider control flow libraries

For complex async operations, use utilities like <VPIcon icon="fa-brands fa-js"/>`async.js` for:

- Parallel execution
- Series execution
- Error handling pipelines
        

### When to Use Callbacks vs. Alternatives

There are times when callbacks are a great choice, and other times when they’re not.

Callbacks are helpful when you’re working with async operations (single completion), interfacing with older libraries or APIs that expect callbacks, handling event listeners (like click listeners or websocket events) or creating lightweight utilities with simple async needs.

In other scenarios where you need to focus on writing maintainable code with a clear async flow, callbacks cause trouble and you should prefer promises or async-await. For example, when you need to chain multiple operations, handle complex error propagation, work with modern APIs (like the Fetch API or FS Promises), or use `promise.all()` for parallel execution.

::: tip Example migration from callbacks to promises:

```ts
// Callback version
function fetchUser(id: number, callback: (err: Error | null, user?: User) => void) {
  // ... 
}
```

```ts
// Promise version
async function fetchUserAsync(id: number): Promise<User> {
  // ...
}
```

```ts
// Usage with async/await
try {
  const user = await fetchUserAsync(1);
} catch (error) {
  // Handle error
}
```

:::

### The Evolution of Async Patterns

| Pattern | Pros | Cons |
| ---: | :--- | :--- |
| Callbacks | Simple, universal | Nested complexity |
| Promises | Chainable, better error flow | Requires .then() chains |
| Async/Await | Sync-like readability | Requires transpilation |

Modern TypeScript projects often use a mix: callbacks for event-driven patterns and promises/async-await for complex async logic. The key is choosing the right tool for your specific use case while maintaining code clarity.

---

## Conclusion

In this article, we have learned about the different ways to handle asynchronous code in TypeScript. We have learned about callbacks, promises, async/await, and how to use them in TypeScript. We have also learned about this concept.

If you want to learn more about programming and how to become a better software engineer, you can subscribe to my YouTube channel [<VPIcon icon="fa-brands fa-youtube"/>`@CliffTech`](https://youtube.com/@CliffTech/videos).

Thank you for reading my article. I hope you enjoyed it. If you have any questions, feel free to reach out to me.

Connect with me on social media:

- [Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`Clifftech_Dev`)](https://twitter.com/Clifftech_Dev)
- [Github (<VPIcon icon="iconfont icon-github"/>`Clifftech123`)](https://github.com/Clifftech123)
- [Linkedin (<VPIcon icon="fa-brands fa-linkedin"/>`isaiah-clifford-opoku-a506a51b2`)](https://linkedin.com/in/isaiah-clifford-opoku-a506a51b2/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn Async Programming in TypeScript: Promises, Async/Await, and Callbacks [Full Handbook]",
  "desc": "Async programming is a programming paradigm that allows you to write code that runs asynchronously. In contrast to synchronous programming, which executes code sequentially, async programming allows code to run in the background while the rest of the...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/learn-async-programming-in-typescript-promises-asyncawait-and-callbacks.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
