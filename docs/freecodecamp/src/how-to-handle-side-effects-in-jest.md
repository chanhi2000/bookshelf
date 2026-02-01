---
lang: en-US
title: "How to Handle Side Effects in Jest – A Guide to Effective Mocking"
description: "Article(s) > How to Handle Side Effects in Jest – A Guide to Effective Mocking"
icon: iconfont icon-expressjs
category: 
  - Node.js
  - Express.js
  - Strapi
  - Article(s)
tag: 
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Handle Side Effects in Jest – A Guide to Effective Mocking"
    - property: og:description
      content: "How to Handle Side Effects in Jest – A Guide to Effective Mocking"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-side-effects-in-jest.html
prev: /programming/js-node/articles/README.md
date: 2024-09-17
isOriginal: false
author:
  - name: ِAya Nabil Othman
    url : https://freecodecamp.org/news/author/AyaNabilOthman/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1726038899380/6210fc66-17fb-4db9-9f91-1e7d38dc256c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Angular.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

---

<SiteInfo
  name="How to Handle Side Effects in Jest – A Guide to Effective Mocking"
  desc="Unit testing is a major topic for every developer. It is a fundamental practice in building software applications. Unit testing helps you to identify bugs early and makes code maintenance easier. By isolating and testing single units or components of..."
  url="https://freecodecamp.org/news/how-to-handle-side-effects-in-jest"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1726038899380/6210fc66-17fb-4db9-9f91-1e7d38dc256c.png"/>

Unit testing is a major topic for every developer. It is a fundamental practice in building software applications. Unit testing helps you to identify bugs early and makes code maintenance easier. By isolating and testing single units or components of your application, you can ensure their reliability and functionality.

When applying unit testing, you need to focus on the main logic of a component without affecting external dependencies or causing side effects—unintended changes that occur outside a function's scope, like database queries or network requests.

Jest is a popular testing framework that offers powerful capabilities to help in effective testing. Mocking in Jest helps you test and manage external dependencies and handle side effects.

In this guide, you will learn about unit testing essentials, focusing on Jest mocks. Whether you're just starting or looking to enhance your testing strategy, this guide will equip you with the knowledge to write effective and efficient tests.

---

## What is Unit Testing?

Unit testing is a software testing technique used to test a single component of your application in isolation. This component may be a class, a method, or a module.

### Why You Should Use Unit Testing

1. You will be able to detect bugs earlier, it helps you to detect if a component behaves as expected.
2. Enables you to modify your component safely. If you update your component and, by mistake, add or modify something you should not, the test will fail if these changes introduce a new bug.
3. It can serve as a documentation that shows how individual units of your app work.
4. Encourages you to write cleaner code. The cleaner your component is, the easier and simpler your test will be.
5. It helps you to easily integrate different parts of your application, as you will be sure that every single component works correctly.
6. In the long term, you can maintain your application faster.

Let us dive-deep into some practical usages:

Let’s assume that you have a multiplication function that should take two arguments and return the result.

Here’s the code:

```js
function multiply(a,b) {
    return a*b
}
export default multiply
```

::: note

To use Jest with Node.js ECMAScript modules, check out this [<VPIcon icon="fas fa-globe"/>article](https://ayanabilothman.hashnode.dev/configure-jest-to-use-it-with-nodejs-ecmascript-modules) for configuration.

<SiteInfo
  name="Configure Jest to use it with NodeJS ECMAScript Modules"
  desc="Initialize your application:
  npm init To use ES modules, add type: ”module” to package.json file. Install Jest npm i jest Initialize Jest npm init jest@latest In jest.config.mjs file: de-comment transform key and assign it a value like tr..."
  url="https://ayanabilothman.hashnode.dev/configure-jest-to-use-it-with-nodejs-ecmascript-modules/"
  logo="https://ayanabilothman.hashnode.dev/favicon.ico"
  preview="https://ayanabilothman.hashnode.dev/api/og/post?og=eyJhdXRob3IiOiIlRDklOTBBeWElMjBOYWJpbCUyME90aG1hbiIsImlzRGVmYXVsdE1vZGVEYXJrIjpmYWxzZSwicmVhZFRpbWUiOjEsImNvbW1lbnRzIjowLCJyZWFjdGlvbnMiOjAsImRvbWFpbiI6ImF5YW5hYmlsb3RobWFuLmhhc2hub2RlLmRldiIsInRpdGxlIjoiQ29uZmlndXJlJTIwSmVzdCUyMHRvJTIwdXNlJTIwaXQlMjB3aXRoJTIwTm9kZUpTJTIwRUNNQVNjcmlwdCUyME1vZHVsZXMiLCJwaG90byI6Imh0dHBzOi8vY2RuLmhhc2hub2RlLmNvbS9yZXMvaGFzaG5vZGUvaW1hZ2UvdXBsb2FkL3YxNzI1NDMxNTc4ODIwL2QxNTZjODNlLTBiY2YtNDM5ZS1iMzJlLWFlMTYwYzY1ZTBhOS5wbmc/dz01MDAmaD01MDAmZml0PWNyb3AmY3JvcD1lbnRyb3B5JmF1dG89Y29tcHJlc3MsZm9ybWF0JmZvcm1hdD13ZWJwIiwibG9nbyI6bnVsbCwiZmF2aWNvbiI6bnVsbCwicHVibGlzaGVkQXQiOiIyMDI0LTA5LTExVDA2OjM3OjA4LjIwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA5LTExVDE5OjQwOjU4LjE0OVoifQ=="/>

:::

So how can you test this function using Jest?

1. Create <VPIcon icon="fas fa-folder-open"/>`__tests__` folder in the root folder.
2. Create file <VPIcon icon="fa-brands fa-js"/>`multiply.test.js` inside <VPIcon icon="fas fa-folder-open"/>`__tests__`.<br/>Note that any file ending with `*.test.js` will be executed by Jest.
3. Start writing your tests by calling the `it("",()=>{})` Jest method.

Let's understand what ``it("",()=>{})`` does:

The `it` method is a Jest function used to test certain behaviors in your function.  
The first argument should be the test name, which can be an assertion text for what you expect from this test.

For example, if you need to test whether the `multiply` function returns the right result using the arguments and if they are numbers, you can write `it("should return the multiplication of inputs of type number",()=>{})`.

The second argument is a function for your test logic. It gets invoked once you run your test**.**

To effectively write your tests, you should apply the AAA (Arrange-Act-Assert) Pattern.

1. **Arrange**: Setup the data or configure any dependencies you will use in this test.
2. **Act:** Call the function you are testing.
3. **Assert:** Write your expectations—how you are expecting the function you are testing to behave. For assertion, you will always use the `expect` Jest method.

Think of every `it("",()=>{})` statement as a different scenario of your function.

Here’s an example:

```js :collapsed-lines
import multiply from './../multiply.js'

it("should return the multiplication of inputs of type number", () => {
  // Arrange
  const testArg1 = 5;
  const testArg2 = 2;
  // Act
  const result = multiply(testArg1, testArg2);
  // Assert
  expect(result).toBe(10);
});

it("should returns NaN if no arguments are passed", () => {
  // Arrange
  // Act
  const result = multiply();
  // Assert
  expect(result).toBeNaN();
});

it("should returns NaN if only one argument is passed", () => {
  // Arrange
  const arg = 5;
  // Act
  const result = multiply(arg);
  // Assert
  expect(result).toBeNaN();
});

it("should returns Zero if one of the arguments is empty string", () => {
  // Arrange
  const testArg1 = "";
  const testArg2 = 5;
  // Act
  const result = multiply(testArg1, testArg2);
  // Assert
  expect(result).toBe(0);
});
```

These tests are some of the tests you can add to your file. You can add more tests or eliminate some depending on the different scenarios of the function you are testing.

---

## What are External Dependencies?

External dependencies are modules or functions that your code relies on, which originates outside your own codebase. These can include libraries, APIs, databases, functions or any service that your application interacts with.

Testing with external dependencies can be challenging because:

- They can slow down tests due to network or processing delays.
- They might not be available during the testing, which in turn causes failures.

As shown in the following function, what if your function calls another function? Most of the functions you write daily actually call other functions.

That is:

```js
function processNumbers(numbers, callback) {
    // numbers: array
    // callback: function
  return numbers.map(callback);
}

export default processNumbers;
```

When applying unit testing, units should be tested in isolation. `processNumbers` function depends on another function `callback`.

So what should you do in this case? Mocking is the solution and we’ll talk about it later in a different section.

---

## What are Side Effects?

Side effects occur when a function modifies some state outside its own scope or has observable interactions with the outside world apart from returning a value.

Examples include modifying a global variable, changing a file system, or sending an HTTP request.

Side effects can make tests unpredictable and difficult to manage because they:

- Might interact with other systems, causing alteration of external states.
- Can lead to flaky tests if not isolated properly.

Here’s an example that returns a user from a database using their `id`:

```js
async function getUserFromDatabase(userId) {
  // Simulates fetching from a database
  return { id: userId, name: 'John' };
}

export {getUserFromDatabase}
```

Here’s another function that makes use of `getUserFromDatabase` in the code above:

```js
async function getProfile(userId) {
  return await getUserFromDatabase(userId);
}

export default getProfile
```

While testing this function, you should not actually send a real request, all you need is to test the behavior of the `getProfile` function without hitting any external system.

You can also use mocking to solve this situation.

---

## What is Mocking?

Mocking is about simulation—you need to isolate a function that you are testing. If the function relies on any external dependency or may cause any side effect, you should simulate the behavior of those aspects.

Mocking involves creating a fake version of a function, object, or module to control its behavior during testing. This allows you to simulate different scenarios and verify interactions without relying on actual implementations.

We will focus on two approaches to mocking:

### 1. Function Mocks (also called Spies)

You can use `jest.fn()` to create a mock function that can be used to track a function or replace real implementations. Or use `jest.spyOn(object, methodName)` to track the calls of `object[methodName]`.

### 2. Module Mocks

You can use `jest.mock(“path-of-your-module”)` to mock entire modules or specific imports. By using it, all functions inside this module become mock functions. In addition, during testing, modules you are testing will receive a fake mocked version of this module.

Any mock function has methods that you can use to simulate the behavior of the function. Some of the most used methods are:

- `mockFn.mockImplementation(fn)` : Used to replace the actual implementation of a function. `fn` is the replacement implementation.
- `mockFn.mockReturnValue(value)` : You can use this if all you care about is the return value of a function.
- `mockFn.mockResolvedValue(value)`: You can use this if the mock function returns a promise.

### Example Usage 1

Let’s test `processNumbers` by using function mocks. The challenge here is that `processNumbers` takes a callback function as an argument. What if you need to test if this callback function get invoked inside `processNumbers`?

Here’s the code:

```js
import processNumbers from 'file-path';

test('processNumbers applies callback and return the right result', () => {
    // Arrange
    const arr = [2, 3]
    const mockedCallback = jest.fn().mockImplementation(x => x + 2);
    // Act
    const result = processNumbers(arr, mockedCallback);
    // Assert
    expect(result).toEqual([4, 5]);
    expect(mockedCallback).toHaveBeenCalledTimes(arr.length);
});
```

We started by arranging the arguments:

- `arr` variable is an array of numbers. We assigned it an array with random numbers in the test.
- The `callback` variable is a callback function. This function should be mocked in the test.

You may ask yourself why you should mock `callback`, why not assign it as a normal function?

The answer is that, without mocking the `callback` argument, you will not be able to track it inside `processNumbers` while you are testing it. Because mocking creates a fake version of the function, it creates a spy that has a tracker through which you can assert any action taken in this mocked function, whether it gets called or any arguments are passed to it.

The `jest.fn()` creates a mock function. You can pass a function to `fn` in place of the real function.

Next, we “act” by calling the function we are testing: `processNumbers`.

Finally, we wrote the assertions, which are expectations about how `processNumbers` should behave and if `processNumbers` applied `callback` and returned the result.

### Example Usage 2

Side effects are another aspect you need to handle in testing. In the `getProfile` function, an external system is called, which calls a database to retrieve data, and this is a side effect.

In another scenario, a function may connect a database to create a user, and through testing you will not need to add or change actual data in the database.

To simulate the behavior of `getUserFromDatabase` without actually hitting the database, you should mock its module, and by default, `getUserFromDatabase` will be an empty mock function that can be tracked during your test.

Here’s the code:

```js
import getProfile from 'file-path';
import { getUserFromDatabase } from 'file-path';

// Mock the module of getUserFromDatabase method
jest.mock('./../DB/databaseMethods.js');

describe('getProfile', () => {
  it('should call getUserFromDatabase with the correct userId and return the result', async () => {
    // Arrange    
    const userId = '123';
    const dummyUser = { id: userId, name: 'John' };
    getUserFromDatabase.mockResolvedValue(dummyUser);
    // Act
    const result = await getProfile(userId);
    // Assert
    expect(result).toEqual(dummyUser);
    expect(getUserFromDatabase).toHaveBeenCalledWith(userId);
    expect(getUserFromDatabase).toHaveBeenCalledTimes(1);
  });
});
```

We started by arranging the arguments:

- `userId` is just a number.
- `dummyUser` is an object that simulates a fake user data.
- We returned `dummyUser` from `getUserFromDatabas` by using `mockResolvedValue`.

Similar to the last example, we “act” by calling the function being tested: `getProfile`.

Finally, we wrote the assertions, you expectations about how `getProfile` should behave and if the `getUserFromDatabase` got called correctly and the result returned as expected.

---

## Use Case: Login Express Controller

Here is a login controller that receives the email and password of a user through the `req` object, and then searches for the user in the database. It does some checks, then returns a `res` if everything is ok, or call `next` with an error object.

```js
import User from "file-path";

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return next(new Error("Invalid Email!"));

  const checkPassword = user.checkPassword(password);
  if (!checkPassword) return next(new Error("Invalid Password!"));

  const token = user.generateToken();

  return res.status(200).json({ success: true, results: { token } });
};
```

Think about the steps you can use to test the login function. You can ask some questions that’ll help you come up with ideas:

What are the scenarios of `login` function workflow?

1. The user is not found.
2. Password is incorrect.
3. Everything is ok, and a response is returned with a token.

So you may assert `login` to do the following:

- `login` should call `next` if user not found.
- `login` should call `next` if password doesn't match.
- `login` should call **res.json** with the token and call **res.status** with 200 if everything is ok.

What are the arguments that `login` method should receive?

1. `req` object with `body` property.
2. `res` object with `status` and `json` property.
3. `next` function.

`res.json()` or `res.status()` or `next()` all are functions that `login` needs to do its work. During testing, you have no access to these arguments so you should mock them.

- `req` can be defined as `{body: { email: "test@foo.com", password: "bar" }}`
- `res` can be defined as `{json: jest.fn().mockReturnThis(), status: jest.fn().mockReturnThis()}`
- `next` can be defined as `jest.fn()`

Are there any interactions with external systems or any dependencies?

1. `User.findOne()`
2. `user.checkPassword()`
3. `user.generateToken()`

Thus, mocking is the solution:

- For `User.findOne()`, you should mock the entire `User` module and set up the fake `findOne()` to return a fake `user`. The challenge here is that `findOne` is an object method. How can you track it? `jest.spyOn(object, methodName)` is the soultion.<br/>The `spyOn` method is used to track the calls of `object[methodName]`, which, in our case, is `User.findOne`
- `user.checkPassword()` and `user.generateToken()` should be mock functions.

To apply all of these concepts and put blocks with each other, the final test should be:

```js :collaped-lines
import User from "file-path";
import { login } from "file-path";

jest.mock("../DB/models/user.model.js");

let mockReq, mockRes, mockNext, dummyUser;
describe("login controller", () => {
  beforeEach(() => {
    mockReq = { body: { email: "test@foo.com", password: "bar" } };
    mockRes = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();

    dummyUser = {
      checkPassword: jest.fn(() => true),
      generateToken: jest.fn(() => "token"),
    };
  });

  it("should call next if user not found", async () => {
    // Arrange
    jest.spyOn(User, "findOne").mockResolvedValueOnce(null);
    // Act
    await login(mockReq, mockRes, mockNext);
    // Assert
    expect(mockNext).toHaveBeenCalledWith(new Error("Invalid Email!"));
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should call next if password doesn't match", async () => {
    // Arrange
    dummyUser.checkPassword.mockReturnValueOnce(false);
    jest.spyOn(User, "findOne").mockResolvedValue(dummyUser);
    // Act
    await login(mockReq, mockRes, mockNext);
    // Assert
    expect(mockNext).toHaveBeenCalledWith(new Error("Invalid Password!"));
    expect(dummyUser.generateToken).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });

  it("should call res.json with the token and call res.status with 200 if everything is ok", async () => {
    // Arrange
    jest.spyOn(User, "findOne").mockResolvedValue(dummyUser);
    // Act
    await login(mockReq, mockRes, mockNext);
    // Assert
    expect(mockNext).not.toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith({ email: mockReq.body.email });

    expect(dummyUser.checkPassword).toHaveBeenCalledWith(mockReq.body.password);
    expect(dummyUser.generateToken).toHaveBeenCalled();

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      results: { token: "token" },
    });
  });
});
```

::: note Final note

`beforeEach` is a Jest hook, you can use it to implement some code before each test. Inside `beforeEach` function, you can write any common variables your tests may need instead of writing them independently for each test.

:::

---

## Summary

In this tutorial you learned the basics of unit testing with Jest, focusing on how to use mocks. Unit testing helps ensure that individual parts of your code work correctly by testing them in isolation.

Handling external dependencies, managing side effects, and utilizing mocking are essential skills for robust testing. Jest provides powerful tools to address these challenges, making your tests more reliable, faster, and easier to maintain.

Understanding these concepts will help you write better tests and produce more resilient applications.

This tutorial explained how to use Jest’s mocking features to simulate external dependencies and manage side effects. It includes a practical example of testing an Express.js login controller, showing how to mock functions and control test scenarios.

This approach helps you create reliable tests and maintain code quality by isolating and managing dependencies effectively.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Handle Side Effects in Jest – A Guide to Effective Mocking",
  "desc": "Unit testing is a major topic for every developer. It is a fundamental practice in building software applications. Unit testing helps you to identify bugs early and makes code maintenance easier. By isolating and testing single units or components of...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-handle-side-effects-in-jest.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
