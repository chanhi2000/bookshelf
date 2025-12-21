---
lang: en-US
title: "When to Use Async/Await vs Promises in JavaScript"
description: "Article(s) > When to Use Async/Await vs Promises in JavaScript"
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
      content: "Article(s) > When to Use Async/Await vs Promises in JavaScript"
    - property: og:description
      content: "When to Use Async/Await vs Promises in JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/when-to-use-asyncawait-vs-promises-in-javascript/
prev: /programming/js/articles/README.md
date: 2025-07-02
isOriginal: false
author:
  - name: Henry Adepegba
    url : https://freecodecamp.org/news/author/henrywinnerman/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1751402055038/f0954bc1-e528-4add-a659-4750c6d8eb33.png
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
  name="When to Use Async/Await vs Promises in JavaScript"
  desc="JavaScript is an asynchronous programming language, which means it can handle multiple operations at the same time without blocking the main thread. When working with asynchronous operations like API calls, file reading, or database queries, you have..."
  url="https://freecodecamp.org/news/when-to-use-asyncawait-vs-promises-in-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1751402055038/f0954bc1-e528-4add-a659-4750c6d8eb33.png"/>

JavaScript is an asynchronous programming language, which means it can handle multiple operations at the same time without blocking the main thread. When working with asynchronous operations like API calls, file reading, or database queries, you have two main approaches: Promises and Async/Await.

In this article, you will learn the differences between these two approaches, when to use each one, and how to make the right choice for your specific use case.

### Here’s what we’ll cover:

(1/10) [What Are Asynchronous Operations?](#heading-what-are-asynchronous-operations)
(2/10) [What Are Promises?](#heading-what-are-promises)
(3/10) [What Is Async/Await?](#heading-what-is-asyncawait)
(4/10) [Practical Examples: Promises vs Async/Await](#heading-practical-examples-promises-vs-asyncawait)
(5/10) [When to Use Promises](#heading-when-to-use-promises)
(6/10) [When to Use Async/Await](#heading-when-to-use-asyncawait)
(7/10) [Performance Considerations](#heading-performance-considerations)
(8/10) [Error Handling Patterns](#heading-error-handling-patterns)
(9/10) [Best Practices](#heading-best-practices)
(10/10) [Making the Right Choice](#heading-making-the-right-choice)

---

## What Are Asynchronous Operations?

Before explaining what Promises and Async/Await mean, it is important to understand what asynchronous operations are.

**Synchronous operations** execute one after another, blocking the next operation until the current one completes. Here’s an example in JavaScript:

```js
console.log("First");
console.log("Second");
console.log("Third");
```

```plaintext title="Output"
First
Second
Third
```

**Asynchronous operations**, on the other hand, can start an operation and continue executing other code while waiting for the first operation to complete. Here’s an example in JavaScript:

```js
console.log("First");

setTimeout(() => {
    console.log("Second (after 2 seconds)");
}, 2000);

console.log("Third");
```

```plaintext title="Output"
First
Third
Second (after 2 seconds)
```

In this example, `setTimeout()` is an asynchronous function that schedules code to run after a specified delay without blocking the execution of subsequent code.

---

## What Are Promises?

A **Promise** is a JavaScript object that represents the eventual completion (or failure) of an asynchronous operation. Think of it as a placeholder for a value that will be available in the future.

### Promise States

A Promise can be in one of three states:

1. **Pending**: The initial state - the operation hasn't been completed yet
2. **Fulfilled (Resolved)**: The operation completed successfully
3. **Rejected**: The operation failed

### Basic Promise Syntax

Here's how you create and use a basic Promise:

```js
// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  // Simulate an asynchronous operation
  setTimeout(() => {
    const success = true;

    if (success) {
      resolve("Operation completed successfully!");
    } else {
      reject("Operation failed!");
    }
  }, 2000);
});

// Using the Promise
myPromise
  .then((result) => {
    console.log(result); // "Operation completed successfully!"
  })
  .catch((error) => {
    console.log(error);
  });
```

Let's break down this code:

- `new Promise()` creates a new Promise object
- The Promise constructor takes a function with two parameters: `resolve` and `reject`
- `resolve()` is called when the operation succeeds
- `reject()` is called when the operation fails
- `.then()` handles the successful case
- `.catch()` handles the error case

### Chaining Promises

Promise chaining is a powerful technique that allows you to link multiple asynchronous operations together in a sequence. When you want to perform multiple operations where each depends on the result of the previous one, promise chaining provides an elegant solution. You can chain multiple Promises together using `.then()`:

```js :collapsed-lines
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John Doe" });
    }, 1000);
  });
}

function fetchUserPosts(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { title: "Post 1", author: user.name },
        { title: "Post 2", author: user.name }
      ]);
    }, 1000);
  });
}

// Chaining Promises
fetchUserData(123)
  .then((user) => {
    console.log("User:", user);
    return fetchUserPosts(user);
  })
  .then((posts) => {
    console.log("Posts:", posts);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
```

In this example:

- `fetchUserData()` returns a Promise that resolves with user information
- `fetchUserPosts()` returns a Promise that resolves with the user's posts
- We chain these operations using `.then()`
- Each `.then()` receives the resolved value from the previous Promise

#### Downsides of Promise Chaining

While promise chaining is powerful, it does have some potential drawbacks:

1. **"Callback Hell" in disguise**: Complex chains can become difficult to read and debug, especially with nested logic
2. **Complex error handling**: Each step in the chain needs proper error handling, and errors can propagate in unexpected ways
3. **Debugging challenges**: Stack traces through promise chains can be harder to follow
4. **Mixing synchronous and asynchronous logic**: It can be tempting to put synchronous operations inside `.then()` blocks, which can lead to confusion

---

## What Is Async/Await?

**Async/Await** is syntactic sugar built on top of Promises. It allows you to write asynchronous code that looks and behaves more like synchronous code, making it easier to read and understand.

### Basic Async/Await Syntax

Here's the same Promise example rewritten using Async/Await:

```js
// Creating an async function
async function performOperation() {
  try {
    const result = await myPromise;
    console.log(result); // "Operation completed successfully!"
  } catch (error) {
    console.log(error);
  }
}

performOperation();
```

Let's break down this code:

- The `async` keyword before a function declaration makes it an asynchronous function
- The `await` keyword pauses the function execution until the Promise resolves
- The `try/catch` blocks handle errors, similar to `.catch()` in Promises

### Converting Promise Chains to Async/Await

Here's the previous chaining example using Async/Await:

```js
async function getUserDataAndPosts(userId) {
  try {
    const user = await fetchUserData(userId);
    console.log("User:", user);

    const posts = await fetchUserPosts(user);
    console.log("Posts:", posts);

    return posts;
  } catch (error) {
    console.log("Error:", error);
    throw error; // Re-throw the error if needed
  }
}

getUserDataAndPosts(123);
```

This code is much more readable and follows a linear flow that's easier to understand.

---

## Practical Examples: Promises vs Async/Await

Let's compare both approaches with real-world scenarios.

### Example 1: Making API Calls

::: tabs

@tab:active Using Promises

```js
function fetchDataWithPromises() {
  fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(user => {
      console.log('User data:', user);
      return fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
    })
    .then(response => response.json())
    .then(posts => {
      console.log('User posts:', posts);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
```

@tab Using Async/Await:

```js
async function fetchDataWithAsyncAwait() {
  try {
    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');

    if (!userResponse.ok) {
      throw new Error('Network response was not ok');
    }

    const user = await userResponse.json();
    console.log('User data:', user);

    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
    const posts = await postsResponse.json();
    console.log('User posts:', posts);

  } catch (error) {
    console.error('Error:', error);
  }
}
```

The Async/Await version is more readable and follows a natural top-to-bottom flow.

### Example 2: Handling Multiple Asynchronous Operations

::: tabs

@tab:active Using Promises:

```js
function processMultipleOperations() {
  const promise1 = fetch('https://jsonplaceholder.typicode.com/users/1');
  const promise2 = fetch('https://jsonplaceholder.typicode.com/users/2');
  const promise3 = fetch('https://jsonplaceholder.typicode.com/users/3');

  Promise.all([promise1, promise2, promise3])
    .then(responses => {
      return Promise.all(responses.map(response => response.json()));
    })
    .then(users => {
      console.log('All users:', users);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
```

@tab Using Async/Await

```js
async function processMultipleOperationsAsync() {
  try {
    const promise1 = fetch('https://jsonplaceholder.typicode.com/users/1');
    const promise2 = fetch('https://jsonplaceholder.typicode.com/users/2');
    const promise3 = fetch('https://jsonplaceholder.typicode.com/users/3');

    const responses = await Promise.all([promise1, promise2, promise3]);
    const users = await Promise.all(responses.map(response => response.json()));

    console.log('All users:', users);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

Both approaches use `Promise.all()` to wait for multiple operations to complete simultaneously.

---

## When to Use Promises

Promises are still useful in several scenarios:

### 1. Working with Existing Promise-Based APIs

Popular libraries like Axios, fetch(), and many Node.js modules return Promises.

#### How to identify promise-based APIs:

- The function returns an object with `.then()` and `.catch()` methods
- The documentation mentions "returns a Promise"
- The function doesn't require a callback parameter

Many libraries and APIs return Promises directly:

```js
// Axios library returns Promises
axios.get('/api/users')
  .then(response => response.data)
  .then(users => console.log(users))
  .catch(error => console.error(error));

// fetch() API returns Promises
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));

// Node.js fs.promises returns Promises
import { readFile } from 'fs/promises';
readFile('./config.json', 'utf8')
  .then(data => JSON.parse(data))
  .then(config => console.log(config));
```

### 2. Functional Programming Patterns

Promises are immutable objects that represent future values, making them perfect for functional programming approaches. They can be easily composed, chained, and transformed without side effects. The `.then()` method essentially maps over the future value, similar to how `Array.map()` works with collections.

Promises work well with functional programming approaches because they are composable and can be easily passed around as first-class objects:

```js :collapsed-lines
// Functional composition with Promises
const processUsers = (userIds) => {
  return Promise.all(
    userIds.map(id => fetchUser(id))  // Transform each ID to a Promise
  )
    .then(users => users.filter(user => user.active))  // Filter active users
    .then(activeUsers => activeUsers.map(user => user.email));  // Extract emails
};

// Pipeline approach
const createUserPipeline = (userId) => {
  return fetchUser(userId)
    .then(validateUser)
    .then(enrichUserData)
    .then(formatUserResponse)
    .then(logUserActivity);
};

// Composing multiple Promise-returning functions
const compose = (...fns) => (value) =>
  fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(value));

const userProcessor = compose(
  fetchUser,
  validateUser,
  enrichUserData,
  saveUser
);
```

### 3. Creating Reusable Promise Utilities

Reusable promise utilities are helper functions that abstract common asynchronous patterns into reusable components. They're particularly useful for cross-cutting concerns like retries, timeouts, rate limiting, and caching. These utilities can be used across different parts of your application without being tied to specific business logic.

**When they're useful:**

- When you need the same asynchronous pattern in multiple places
- For handling common failure scenarios (network timeouts, retries)
- When building middleware or interceptors
- For performance optimizations like batching or debouncing

```js :collapsed-lines
// Timeout utility
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry utility with exponential backoff
function retry(fn, retries = 3, delay = 1000) {
  return fn().catch(error => {
    if (retries > 0) {
      console.log(`Retrying... ${retries} attempts left`);
      return timeout(delay).then(() => retry(fn, retries - 1, delay * 2));
    }
    throw error;
  });
}

// Rate limiting utility
function rateLimit(fn, maxCalls, timeWindow) {
  let calls = [];

  return function (...args) {
    const now = Date.now();
    calls = calls.filter(time => now - time < timeWindow);

    if (calls.length >= maxCalls) {
      const waitTime = timeWindow - (now - calls[0]);
      return timeout(waitTime).then(() => fn.apply(this, args));
    }

    calls.push(now);
    return fn.apply(this, args);
  };
}

// Usage examples
const apiCall = () => fetch('/api/data').then(r => r.json());
const resilientApiCall = retry(apiCall, 3);
const rateLimitedApiCall = rateLimit(apiCall, 5, 60000); // 5 calls per minute
```

---

## When to Use Async/Await

Async/Await is preferred in most modern JavaScript applications. It has various advantages over Promises, such as:

1. **Improved readability**: Code reads like synchronous code, making it easier to understand the flow
2. **Better debugging**: Stack traces are cleaner and easier to follow
3. **Simplified error handling**: Single try/catch block can handle multiple async operations
4. **Reduced nesting**: Eliminates the "pyramid of doom" that can occur with promise chains
5. **Easier testing**: Async functions are easier to test and mock
6. **Better IDE support**: Better autocomplete and type inference in modern editors

Let’s look at some examples that demonstrate when async/await would be a better choice.

### 1. Sequential Operations

When you need to perform operations one after another:

```js
async function processUserData(userId) {
  try {
    const user = await fetchUser(userId);
    const preferences = await fetchUserPreferences(user.id);
    const recommendations = await generateRecommendations(user, preferences);

    return {
      user,
      preferences,
      recommendations
    };
  } catch (error) {
    console.error('Failed to process user data:', error);
    throw error;
  }
}
```

::: important Why this is better than promises

With promise chaining, you'd need to nest `.then()` calls or return values through the chain, making it harder to track data flow.

:::

### 2. Complex Error Handling

Async/await allows you to use familiar try/catch syntax and handle errors at the exact point where they might occur. You can have multiple try/catch blocks for different error scenarios, and the error handling logic is co-located with the code that might throw the error.

```js :collapsed-lines
async function complexOperation(data) {
  try {
    // First level: preprocessing errors
    const processedData = await preprocessData(data);

    try {
      // Second level: critical operation errors
      const result = await performCriticalOperation(processedData);
      return result;
    } catch (criticalError) {
      // Handle critical operation errors specifically
      console.error('Critical operation failed:', criticalError);

      // We can make decisions based on the error type
      if (criticalError.code === 'TEMPORARY_FAILURE') {
        console.log('Attempting fallback operation...');
        const fallbackResult = await performFallbackOperation(processedData);
        return fallbackResult;
      } else {
        // Re-throw if it's not recoverable
        throw new Error(`Critical failure: ${criticalError.message}`);
      }
    }

  } catch (preprocessError) {
    // Handle preprocessing errors differently
    console.error('Preprocessing failed:', preprocessError);

    // We can inspect the error and decide how to handle it
    if (preprocessError.code === 'INVALID_DATA') {
      throw new Error('Invalid input data provided');
    } else {
      throw new Error('Unable to process data');
    }
  }
}
```

::: info Explanation of the code

- The outer try/catch handles preprocessing errors
- The inner try/catch specifically handles critical operation errors
- Each error handler can make different decisions based on error types
- The code clearly shows the error-handling strategy at each level
- You can easily add logging, metrics, or recovery logic at each level

:::

### 3. Conditional Asynchronous Logic

Async/await makes it natural to use standard control flow (if/else, loops, switch statements) with asynchronous operations. This is much cleaner than trying to implement conditional logic within promise chains.

```js :collapsed-lines
async function smartUserProcess(userId) {
  try {
    // First, get the user data
    const user = await fetchUser(userId);
    console.log(`Processing user: ${user.name} (Premium: ${user.isPremium})`);

    // Make decisions based on the async result
    if (user.isPremium) {
      console.log('User is premium - fetching premium features');

      // Premium users get additional data
      const premiumData = await fetchPremiumFeatures(user.id);

      // We can make further decisions based on premium data
      if (premiumData.analyticsEnabled) {
        console.log('Analytics enabled - generating premium analytics');
        const analytics = await generatePremiumAnalytics(user, premiumData);
        return { user, premiumData, analytics };
      } else {
        return { user, premiumData };
      }

    } else {
      console.log('User is basic - fetching basic features');

      // Basic users get different treatment
      const basicData = await fetchBasicFeatures(user.id);

      // Check if user qualifies for upgrade prompts
      if (basicData.usageLevel > 0.8) {
        console.log('User has high usage - checking upgrade eligibility');
        const upgradeOffer = await checkUpgradeEligibility(user);
        return { user, basicData, upgradeOffer };
      } else {
        return { user, basicData };
      }
    }
  } catch (error) {
    console.error('User processing failed:', error);

    // Even error handling can be conditional
    if (error.code === 'USER_NOT_FOUND') {
      throw new Error('User does not exist');
    } else if (error.code === 'NETWORK_ERROR') {
      throw new Error('Network connectivity issue');
    } else {
      throw error;
    }
  }
}
```

::: info Explanation of the code:

- We await the user fetch and immediately use the result in an if statement
- Each branch of the conditional can perform different async operations
- We can nest conditions naturally (like checking analyticsEnabled)
- Standard control flow works seamlessly with async operations
- Error handling can also be conditional based on error types
- The code reads like synchronous code but handles async operations correctly

:::

---

## Performance Considerations

Understanding the performance implications of different asynchronous patterns is crucial for building efficient JavaScript applications. The main performance consideration is whether your asynchronous operations can run in parallel or must be executed sequentially.

When working with multiple asynchronous operations, you have two main execution patterns: sequential (one after another) and parallel (multiple operations at the same time). The choice between these patterns can significantly impact your application's performance and user experience.

### Sequential vs Parallel Execution

#### Sequential Execution (slower but sometimes necessary)

Sequential execution means waiting for each operation to complete before starting the next one. This is slower but necessary when operations depend on each other.

```js
// This takes ~3 seconds total (1 + 1 + 1)
async function sequentialOperations() {
  console.time('Sequential Operations');

  const result1 = await operation1(); // 1 second - must complete first
  console.log('Operation 1 completed:', result1);

  const result2 = await operation2(); // 1 second - starts after operation1
  console.log('Operation 2 completed:', result2);

  const result3 = await operation3(); // 1 second - starts after operation2
  console.log('Operation 3 completed:', result3);

  console.timeEnd('Sequential Operations');
  return [result1, result2, result3];
}
```

::: info Use sequential execution when

- Each operation depends on the result of the previous one
- You need to process results in a specific order
- Operations must be rate-limited (for example, API calls with rate limits)
- You want to avoid overwhelming external services

:::

#### Parallel Execution (faster when possible):

Parallel execution means starting all operations at the same time and waiting for all of them to complete. This is much faster when operations are independent.

```js :collapsed-lines
// This takes ~1 second total (all operations run simultaneously)
async function parallelOperations() {
  console.time('Parallel Operations');

  // Start all operations immediately - they run concurrently
  const promise1 = operation1(); // starts immediately
  const promise2 = operation2(); // starts immediately  
  const promise3 = operation3(); // starts immediately

  console.log('All operations started, waiting for completion...');

  // Wait for all operations to complete
  const [result1, result2, result3] = await Promise.all([
    promise1,
    promise2,
    promise3
  ]);

  console.log('All operations completed');
  console.timeEnd('Parallel Operations');
  return [result1, result2, result3];
}
```

::: info Use parallel execution when

- Operations are independent of each other
- You want to minimize total execution time
- Dealing with I/O operations (file reads, API calls, database queries)
- The order of completion doesn't matter

:::

#### Advanced Example - Mixed Approach

Sometimes you need a combination of both approaches:

```js :collapsed-lines
async function mixedApproach(userIds) {
  console.time('Mixed Approach');

  // Step 1: Fetch all users in parallel (they're independent)
  console.log('Fetching users in parallel...');
  const users = await Promise.all(
    userIds.map(id => fetchUser(id))
  );

  // Step 2: Process each user sequentially (to avoid overwhelming the recommendation service)
  console.log('Processing users sequentially...');
  const results = [];
  for (const user of users) {
    const preferences = await fetchUserPreferences(user.id);
    const recommendations = await generateRecommendations(user, preferences);
    results.push({ user, preferences, recommendations });

    // Small delay to be respectful to the API
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.timeEnd('Mixed Approach');
  return results;
}
```

Use `Promise.all()` when operations can run independently and simultaneously.

---

## Error Handling Patterns

Proper error handling is crucial for building robust applications. Different asynchronous patterns offer different approaches to error handling, each with their own advantages and use cases.

Error handling in asynchronous JavaScript can be challenging because errors can occur at different points in the execution flow. Understanding how to properly catch, handle, and recover from errors in both Promise and async/await patterns is essential for building reliable applications.

### Promise Error Handling

With Promises, errors are handled using the `.catch()` method. This approach provides fine-grained control over error handling at different points in the chain.

```js :collapsed-lines
function promiseErrorHandling() {
  return fetchData()
    .then(data => {
      console.log('Data fetched successfully');
      return processData(data);
    })
    .then(result => {
      console.log('Data processed successfully');
      return saveResult(result);
    })
    .then(savedResult => {
      console.log('Result saved successfully');
      return savedResult;
    })
    .catch(error => {
      console.error('Error occurred in the chain:', error);

      // Handle different types of errors
      if (error.name === 'NetworkError') {
        console.log('Network issue detected, attempting retry...');
        return retryOperation();
      } else if (error.name === 'ValidationError') {
        console.log('Data validation failed:', error.message);
        return handleValidationError(error);
      } else if (error.name === 'StorageError') {
        console.log('Storage operation failed, using fallback');
        return saveToFallbackStorage(error.data);
      } else {
        console.log('Unknown error type:', error);
        throw error; // Re-throw if we can't handle it
      }
    });
}
```

**Here’s what’s going on in this code:**

- The `.catch()` method catches any error that occurs in the entire chain
- You can inspect the error object to determine the appropriate response
- Returning a value from `.catch()` recovers from the error
- Throwing an error or not returning anything propagates the error further
- The error handler has access to the original error context

### Async/Await Error Handling

With async/await, errors are handled using try/catch blocks, which provide more familiar and flexible error-handling patterns.

```js :collapsed-lines
async function asyncAwaitErrorHandling() {
  try {
    console.log('Starting data processing...');

    const data = await fetchData();
    console.log('Data fetched successfully');

    const result = await processData(data);
    console.log('Data processed successfully');

    const savedResult = await saveResult(result);
    console.log('Result saved successfully');

    return savedResult;

  } catch (error) {
    console.error('Error occurred during processing:', error);

    // Handle different types of errors with more complex logic
    if (error.name === 'NetworkError') {
      console.log('Network issue detected');

      // We can use async operations in error handling
      const retryCount = await getRetryCount();
      if (retryCount < 3) {
        console.log(`Retrying... (attempt ${retryCount + 1})`);
        await incrementRetryCount();
        return await retryOperation();
      } else {
        console.log('Max retries reached, switching to offline mode');
        return await switchToOfflineMode();
      }

    } else if (error.name === 'ValidationError') {
      console.log('Data validation failed:', error.message);

      // Handle validation errors with user feedback
      await logValidationError(error);
      return handleValidationError(error);

    } else if (error.name === 'StorageError') {
      console.log('Storage operation failed');

      // Try multiple fallback options
      try {
        return await saveToFallbackStorage(error.data);
      } catch (fallbackError) {
        console.log('Fallback storage also failed, using cache');
        return await saveToCache(error.data);
      }

    } else {
      console.log('Unknown error type, logging for analysis');
      await logErrorForAnalysis(error);
      throw error; // Re-throw unknown errors
    }
  }
}
```

::: info Here’s what’s going on in the code

- The try/catch block handles all errors in the async function
- You can use await inside catch blocks for error recovery operations
- Multiple nested try/catch blocks can handle different scenarios
- Error handling code can be as complex as needed, including loops and conditions
- The error handling logic is co-located with the code that might throw

:::

### Advanced Error Pattern - Specific Error Handling:

```js
async function advancedErrorHandling(userId) {
  try {
    const user = await fetchUser(userId);

    try {
      const sensitiveData = await fetchSensitiveData(user.id);
      return { user, sensitiveData };
    } catch (sensitiveError) {
      // Handle sensitive data errors specifically
      if (sensitiveError.code === 'PERMISSION_DENIED') {
        console.log('User lacks permission for sensitive data');
        return { user, sensitiveData: null, reason: 'permission_denied' };
      } else {
        // For other sensitive data errors, we still want to return the user
        console.warn('Sensitive data unavailable:', sensitiveError.message);
        return { user, sensitiveData: null, reason: 'data_unavailable' };
      }
    }

  } catch (userError) {
    // Handle user fetching errors
    if (userError.code === 'USER_NOT_FOUND') {
      throw new Error(`User ${userId} does not exist`);
    } else if (userError.code === 'NETWORK_ERROR') {
      throw new Error('Unable to connect to user service');
    } else {
      throw new Error(`Failed to fetch user: ${userError.message}`);
    }
  }
}
```

---

## Best Practices

Following these best practices will help you write more reliable, maintainable, and performant asynchronous JavaScript code.

### Always Handle Errors

One of the most common mistakes in asynchronous JavaScript is forgetting to handle errors. When an async operation fails without proper error handling, it can lead to unhandled promise rejections, application crashes, or silent failures that are difficult to debug.

Don't do this:

```js
// Missing error handling - this is dangerous!
async function badExample() {
    const data = await fetchData(); // What if this fails?
    const processed = await processData(data); // What if this fails?
    return await saveData(processed); // What if this fails?
}

// Usage - user has no idea if something went wrong
const result = await badExample();
console.log(result); // Could be undefined or cause a crash
```

::: warning Why this is problematic

- If `fetchData()` fails, the entire function crashes
- The caller has no way to know what went wrong
- In production, this could lead to a poor user experience
- Debugging becomes much harder without proper error context

:::

Do this instead:

```js :collapsed-lines
// Proper error handling with context and recovery
async function goodExample() {
  try {
    console.log('Starting data processing...');

    const data = await fetchData();
    console.log('Data fetched successfully');

    const processed = await processData(data);
    console.log('Data processed successfully');

    const result = await saveData(processed);
    console.log('Data saved successfully');

    return result;
  } catch (error) {
    // Log the error with context
    console.error('Data processing failed:', {
      error: error.message,
      step: error.step || 'unknown',
      timestamp: new Date().toISOString()
    });

    // Re-throw with more context or handle appropriately
    throw new Error(`Data processing failed: ${error.message}`);
  }
}

// Usage - caller knows how to handle failures
try {
  const result = await goodExample();
  console.log('Success:', result);
} catch (error) {
  console.error('Failed to process data:', error.message);
  // Handle the error appropriately for your application
  showErrorToUser('Data processing failed. Please try again.');
}
```

::: info Why this is better:

- Every async operation is wrapped in try/catch
- Errors are logged with useful context
- The caller receives meaningful error messages
- The application can gracefully handle failures

:::

### Use `Promise.all()` for Independent Operations

A common performance anti-pattern is making independent async operations run sequentially when they could run in parallel. This unnecessarily increases the total execution time.

Don't do this:

```js
// Sequential when it could be parallel - this is inefficient!
async function inefficient() {
    console.time('Inefficient Approach');

    // These operations are independent but run one after another
    const user = await fetchUser();        // 500ms
    const posts = await fetchPosts();      // 300ms  
    const comments = await fetchComments(); // 400ms
    // Total time: ~1200ms

    console.timeEnd('Inefficient Approach');
    return { user, posts, comments };
}
```

::: warning Why this is problematic:

- Each operation waits for the previous one to complete
- Total execution time is the sum of all individual times
- Network resources are underutilized
- Users experience unnecessary delays

:::

This is particularly common when fetching data for a dashboard or page that needs multiple pieces of information. Developers often write the code sequentially without considering that these operations can run simultaneously.

Do this instead:

```js
// Parallel execution - much more efficient!
async function efficient() {
  console.time('Efficient Approach');

  // Start all operations simultaneously
  const userPromise = fetchUser();        // starts immediately
  const postsPromise = fetchPosts();      // starts immediately
  const commentsPromise = fetchComments(); // starts immediately

  // Wait for all to complete
  const [user, posts, comments] = await Promise.all([
    userPromise,
    postsPromise,
    commentsPromise
  ]);
  // Total time: ~500ms (longest individual operation)

  console.timeEnd('Efficient Approach');
  return { user, posts, comments };
}
```

#### Advanced example with error handling:

```js
async function efficientWithErrorHandling() {
  try {
    console.log('Starting parallel data fetch...');

    // Start all operations and handle individual failures
    const results = await Promise.allSettled([
      fetchUser().catch(error => ({ error: error.message, type: 'user' })),
      fetchPosts().catch(error => ({ error: error.message, type: 'posts' })),
      fetchComments().catch(error => ({ error: error.message, type: 'comments' }))
    ]);

    // Process results and handle partial failures
    const [userResult, postsResult, commentsResult] = results;

    return {
      user: userResult.status === 'fulfilled' ? userResult.value : null,
      posts: postsResult.status === 'fulfilled' ? postsResult.value : [],
      comments: commentsResult.status === 'fulfilled' ? commentsResult.value : [],
      errors: results
        .filter(result => result.status === 'rejected' || result.value?.error)
        .map(result => result.reason || result.value?.error)
    };

  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
```

::: info Why this is better

- Operations run in parallel, reducing total execution time
- Network and CPU resources are used more efficiently
- The application feels more responsive to users
- Can handle partial failures gracefully

:::

---

## Don't Mix Patterns Unnecessarily

Mixing Promise chains with async/await in the same function creates inconsistent code that's harder to read, debug, and maintain. It can also lead to subtle bugs and makes the code flow less predictable.

Avoid this:

```js
// Mixing async/await with `.then()` - this is confusing!
async function mixedPattern() {
  const data = await fetchData();

  // Suddenly switching to Promise chain style
  return processData(data).then(result => {
    console.log('Processing complete');
    return saveResult(result);
  }).then(savedResult => {
    return savedResult.id;
  }).catch(error => {
    console.error('Error in promise chain:', error);
    throw error;
  });
}
```

::: warning Why this is problematic

- Inconsistent error handling patterns (try/catch vs .catch())
- Harder to follow the execution flow
- Different debugging experiences
- More opportunities for bugs
- Team members need to understand multiple patterns

:::

This often happens when developers are working with existing Promise-based code and try to gradually introduce async/await without fully converting the function.

Do this instead:

```js
// Consistent async/await - much clearer!
async function consistentPattern() {
  try {
    const data = await fetchData();
    console.log('Data fetched');

    const result = await processData(data);
    console.log('Processing complete');

    const savedResult = await saveResult(result);
    console.log('Result saved');

    return savedResult.id;
  } catch (error) {
    console.error('Error in async function:', error);
    throw error;
  }
}
```

::: tip Alternative consistent Promise approach:

```js
// If you prefer Promises, be consistent with that too
function consistentPromisePattern() {
  return fetchData()
    .then(data => {
      console.log('Data fetched');
      return processData(data);
    })
    .then(result => {
      console.log('Processing complete');
      return saveResult(result);
    })
    .then(savedResult => {
      console.log('Result saved');
      return savedResult.id;
    })
    .catch(error => {
      console.error('Error in promise chain:', error);
      throw error;
    });
}
```

### Use Descriptive Variable Names in Async Functions

```js
// Poor naming
async function process(id) {
  const d = await fetch(id);
  const r = await transform(d);
  return r;
}

// Better naming
async function processUserProfile(userId) {
  const userData = await fetchUserData(userId);
  const transformedProfile = await transformUserData(userData);
  return transformedProfile;
}
```

### Handle Timeouts for Long-Running Operations

```js
// Add timeout wrapper for reliability
function withTimeout(promise, timeoutMs) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
  });

  return Promise.race([promise, timeout]);
}

// Usage
async function reliableDataFetch(userId) {
  try {
    // Timeout after 5 seconds
    const userData = await withTimeout(fetchUserData(userId), 5000);
    return userData;
  } catch (error) {
    if (error.message === 'Operation timed out') {
      console.log('Request timed out, using cached data');
      return getCachedUserData(userId);
    }
    throw error;
  }
}
```

---

## Making the Right Choice

Here's a decision framework to help you choose:

### Choose Promises When

- Working with libraries that return Promises
- Writing functional programming style code
- Creating utility functions that other code will chain
- You need fine-grained control over Promise behavior
- Working with existing Promise-based codebases

### Choose Async/Await When

- Writing new application code
- You need sequential operations with a clear flow
- Complex error handling is required
- Working with conditional asynchronous logic
- Code readability is a priority
- You're building modern JavaScript applications

### Consider Both When

- Using `Promise.all()`, `Promise.race()`, or `Promise.allSettled()`
- Building complex asynchronous flows
- You need both the power of Promises and the readability of Async/Await

---

## Conclusion

Both Promises and Async/Await are powerful tools for handling asynchronous operations in JavaScript. Promises provide flexibility and fine-grained control, while Async/Await offers cleaner, more readable code that's easier to debug and maintain.

In modern JavaScript development, Async/Await is generally preferred for application code due to its readability and ease of use. However, understanding Promises is still crucial since Async/Await is built on top of them, and many libraries and APIs still use Promises directly.

The key is to understand both approaches and choose the one that best fits your specific use case, team preferences, and project requirements. Remember that you can always mix both approaches when it makes sense - use Async/Await for your main application logic and Promises for utility functions and library integrations.

By mastering both techniques very well, you will be well-equipped to handle any asynchronous programming challenge in JavaScript.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "When to Use Async/Await vs Promises in JavaScript",
  "desc": "JavaScript is an asynchronous programming language, which means it can handle multiple operations at the same time without blocking the main thread. When working with asynchronous operations like API calls, file reading, or database queries, you have...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/when-to-use-asyncawait-vs-promises-in-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
