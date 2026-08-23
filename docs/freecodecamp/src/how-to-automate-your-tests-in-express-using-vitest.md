---
lang: en-US
title: "How to Automate Your Tests in Express Using Vitest"
description: "Article(s) > How to Automate Your Tests in Express Using Vitest"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Automate Your Tests in Express Using Vitest"
    - property: og:description
      content: "How to Automate Your Tests in Express Using Vitest"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-automate-your-tests-in-express-using-vitest.html
prev: /programming/js-express/articles/README.md
date: 2026-08-29
isOriginal: false
author:
  - name: jabo Landry
    url: https://freecodecamp.org/news/author/Arnold-Jabo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/098eaca4-3334-4a81-b6f6-ad0b167eee44.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Automate Your Tests in Express Using Vitest"
  desc="Thinking through API logic while constantly switching tabs to test application integration can be overwhelming and time-consuming. Well, you can save your time and energy by writing tests for your app"
  url="https://freecodecamp.org/news/how-to-automate-your-tests-in-express-using-vitest"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/098eaca4-3334-4a81-b6f6-ad0b167eee44.png"/>

Thinking through API logic while constantly switching tabs to test application integration can be overwhelming and time-consuming.

Well, you can save your time and energy by writing tests for your application that run whenever you add a new feature, all without leaving your IDE during development. This will help you be confident that each feature works as expected.

In this guide, I'll help you build confidence through code: you'll learn how to validate APIs with tests first, then confirm the results in Postman or any other API testing tool.

::: note Prerequisites

- **Node.js & Express basics:** You should have a working knowledge of Node.js and Express (or a similar library like `fastify`), including how to build and run a simple API.
- **Working knowledge of TypeScript:** The code snippets in this guide are written using TypeScript, so you should have a solid understanding of TypeScript basics.
- **Basic familiarity with MongoDB:** Helpful but not required. The examples in this guide use MongoDB for demonstration purposes, but the underlying logic applies to any database or data layer. Only the tooling differs.
- **Hands-on API experience:** Prior experience writing at least one backend API with Express will help you follow along more effectively.
- **Curiosity and motivation:** A willingness to deepen your backend skills by learning how to write and run tests for your APIs.
- **Environment setup:** Node.js version **20 or higher** installed on your machine.

:::

::: info

You can find all the code snippets used in this guide in this [Git repository (<VPIcon icon="iconfont icon-github"/>`jabo-arnold-landry/testing-lesson`)](https://github.com/jabo-arnold-landry/testing-lesson). Each example has its own branch, and they're combined into a main branch if you want a full example version. Please consider starring the repository if you find it helpful.

:::

---

## Key Testing Concepts

Testing helps you build confidence in your codebase. You wrie code that tests other code in your application, or code that checks if a function or feature behaves the way that it should.

In this guide, we'll cover two types of testing:

- **Unit testing**: This is the most basic type of testing and, in my opinion, the easiest. You test a single piece of code in isolation to see how it behaves.
- **Integration testing**: This approach is used to test how different parts of the application are integrated to make sure they're working together as intended.

### Key Testing Terms

Throughout this guide, I'll be using some technical terms are related to testing which I want to explain up front:

- **Mocking**: mocking is a technique used to make a fake implementation of a real function call.
- **Spying**: spying is a way of inspecting a function to see, for example, if the function is called with a certain type of argument or how many times it's been called.
- **Assertion**: assertions check to see if the output you're getting matches the expected output.

Alright now that we have that covered, let's go over some basics of testing so you have the best practices down before we start writing tests.

### How to Name a Test File

Make sure your test files follow one of these naming conventions:

- .<VPIcon icon="fa-brands fa-js"/>`filename.test.ts`
- .<VPIcon icon="fa-brands fa-js"/>`filename.spec.ts`
- .<VPIcon icon="fa-brands fa-js"/>`filename.test.js`
- .<VPIcon icon="fa-brands fa-js"/>`filename.spec.js`

Both the `spec` and `test` keyword in a file name makes it possible to run the test file. They also help testing frameworks run the right file.

You can choose either the TypeScript or JavaScript extension on a file based on which language you're using to write the test. For this guide I'm using TypeScript so I'll be using the TypeScript (`.ts`) test file version.

### Parts of a Testing File

Typically, a test file will have four main parts that you should be familiar with, which are:

- `describe`: Used to describe which test you're going to write.
- `it`: Used to specify a condition that a function must pass when tested against.
- `expect`: Used to determine what type of results you're expecting when you call a function that's being tested
- `matchers`: These are different method available on the `expect` keyword that we use to evaluate if the function we're testing returns a value that meets the expected data or value.

Example of a test file:

```ts
import { describe, it, expect } from "vitest";
import validateEmail from "../utils/email-validation";

describe("email validation test suites", () => {
  it("must define email validation function", () => {
    expect(validateEmail).toBeDefined();
  });
});
```

The above snippet tests if the `validateEmail` function is defined.

In this test file:

- We use `describe` to specify the description of the test. `describe` receives a string description of the test and a function to handle different test cases.
- The `it` keyword specifies and defines a test for a function you're testing, `it` receives a string describing a specific test description and a callback function to execute and handle test assertion.
- Then `expect` uses the function return type to check if it matches a specific condition through the `toBeDefined` matcher method.

### List of Matchers:

There are many matchers available to you. Below are a few of them:

- `toBe`: compares the passed-in value to see if it matches the function's returned value. It's used on primitive data types like strings, numbers, and so on.
- `toEqual`: compares the passed-in value to see if it matches the function's returned value. It's used on non-primitive data types like objects, arrays, and so on.
- `toThrow`: used on a function that threw an error to check if the function threw expected error object or instance.
- `toBeCalledWith`: used to check if a function is called with a given parameter.
- `toBecalledOnce`: used to check if a function is called only once.
- `toBeDefined`: used to check if a function is defined.
- `toBeUndefined`: used to check if a function returns an undefined value.
- `toBeTruthy`: used to check if a function returns a true Boolean value.
- `toBeFalsy`: used to check if a function returns a false Boolean value.

These are few of the many matchers out there.

### Vitest Installation

Now that you know some testing basics, we can get into the actual tests. We'll start by installing `vitest`, the framework that we'll use to run and write tests for our application.

You can choose your preferred package manager to use to install `vitest` from the list below:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-pnpm"/>

```sh
pnpm add -D vitest
```

@tab <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add -D vitest
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm install -D vitest
```

@tab <VPIcon icon="iconfont icon-bun"/>

```sh
bun add -D vitest
```

:::

---

## Unit Testing

A unit test focuses on testing a small piece of code in isolation in your application. A simple example could be if you have a function that adds contact info to a database. For the test, you could check if the email is valid before adding the contact to the database.

Let's start by testing a simple email validation function so you can get comfortable with how unit tests works and how to write one:

```ts
export default function validateEmail(email: string) {
  const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

  if (regex.test(email)) {
    return true;
  } else {
    throw new Error("Invalid email format");
  }
}
```

The above snippet exports a function that receives an email and then uses regex to validate if the email is valid. It throws an error if the email is invalid.

### Tests for the `validateEmail` Function

Let's start by checking if `validateEmail` returns true for correct emails:

```ts
import { describe, it, expect } from "vitest";
import validateEmail from "../utils/email-validation";

describe("email validation test suites", () => {

  it("returns true for valid email", () => {
    const sampleEmail = "arnoldjabo@gmail.com";
    expect(validateEmail(sampleEmail)).toBeTruthy();
  });

});
```

In the above test, we're creating a variable `sampleEmail` to be used as a sample email in the `validateEmail` function. Save this and then run `npx vitest` in your terminal. You should see a terminal with the results of your test. It should look like the below screenshot:

![Passed Tests in Vitest Terminal](https://cdn.hashnode.com/uploads/covers/69c7bcff7cf27065100ae8be/84af7e2b-8344-49c8-a744-35d64ee2a1c0.png)

When you run tests, Vitest shows the list of test files you're testing, how many tests were executed, and how many passed and failed tests you have.

Let's create another test that detects an invalid email:

```ts
import { describe, it, expect } from "vitest";
import validateEmail from "../utils/email-validation";

describe("email validation test suites", () => {

    it("throws error for invalid email", () => {
    const sampleEmail = "verymasd.com";
    const invalidEmailResults = () => validateEmail(sampleEmail);
    expect(invalidEmailResults).toThrow("Invalid email format");
  });

});
```

For functions that throw errors, you need to wrap them inside another function to prevent them from stopping the test before the test reaches the assertion or `expect` section.

In our example above, the `validateEmail` function is wrapped inside another function which will hold whatever the error `validateEmail` throws is. It then assigns it to the `invalidEmailResults` variable. Next we use the `toThrow` matcher on the `expect` assertion to match a type of error `validateEmail` expects to be thrown for an invalid email.

If your run the test, you'll have two passed tests now:

![Passed test for invalid email that throws an error for an invalid email](https://cdn.hashnode.com/uploads/covers/69c7bcff7cf27065100ae8be/521702d7-073b-44e7-90dc-9a30b664b81d.png)

If you didn't wrap the `validateEmail` function inside another function when it throws an error, you'll see something like this when you run the test:

![The error message you would receive inside the test terminal if you didn't wrap a function that throws an error inside another function.](https://cdn.hashnode.com/uploads/covers/69c7bcff7cf27065100ae8be/693fec20-7f56-42ea-be18-4caa5cba3dac.png)

As you can see, the error fires before reaching the test final assertion. So when you have a function that throws errors, remember to wrap your function inside another function to avoid throwing errors mid-test.

::: tip

When writing unit tests, focus on the expected input and output of a function. You don't have to worry or need to think about the implementation of the function: the input and output are the key elements here.

:::

### Testing API Calls

By now you should understand how a unit test works. So next, let's see how you can unit test an API that makes a call to a database.

```ts
import Contacts from "../../schema/contactList";
import { Request, Response } from "express";
import validateEmail from "../../utils/email-validation";

async function addContacts(req: Request, res: Response) {
  const { contactName, phoneNumber, email } = req.body;
  validateEmail(email);

  const contact = await Contacts.create({ contactName, phoneNumber, email });

  return res.status(201).json({ message: `successfully created ${contact.contactName}` });
}

export default addContacts;
```

In the code snippet above, we have a function that creates a contact with the database. It also validates if the passed email is valid.

In this example, we're using mongo DB for the database and Mongoose for connecting the codebase with our mongo DB instance.

Unit tests for non-pure functions (that is, functions that are dependent on external services, like making API calls or calling other functions) are tested a bit differently.

For these cases, you create a mock or fake version of the original function that makes a call to the external service and then define its behavior to match the expected return value that you'd have if you used its real version.

We'll start by mocking the implementation of the email validation function. This will help solidify the understanding on how mocking works in unit testing and testing in general.

::: note

Mocking the `validateEmail` function isn't that important because it doesn't make a big difference from using the email validation function directly here. But for learning purposes, we'll mock it to help you understand how it works.

:::

When mocking the modules import, we use the `vi.mock` function which helps transform the imports of a given module into mocks or fake versions of the real ones.

```ts
vi.mock(filepath,callback);
```

`vi.mock` receives two arguments: the file path location of the module you want to mock, and a callback function called a factory function which we'll use to transform the module imports into mocks.

Let's start by mocking the `validateEmail` path and creating a factory function to transform the module into mocks:

```ts
vi.mock("../utils/email-validation", () => {
  return { default: vi.fn()};
});
import validateEmail from "../utils/email-validation";
```

In the callback function (factory function), we then return an object of the exported module, with a key of **default** and a value of `vi.fn`. For function mocking we use `vi.fn()` which automatically replaces the function's return value with `undefined`.

We use default as a key because the `validateEmail` function is exported as a default export. If it was a named export, we would have used the actual export name instead of default in the return object.

```ts
vi.mock("../utils/email-validation", () => {
  return { validateEmail: vi.fn() };
});
import { validateEmail } from "../utils/email-validation";
```

Always import your module after the mock module operation to avoid using the real module.

There are methods on `vi.fn()` that help define the implementation and behaviors of the mocked function. Some of these methods include:

- `mockReturnValue`: Used to define a return value for a mocked function
- `mockRejectsValue`: Used for promise-based functions to define the error the function will return.
- `mockResolveValue`: Used for promise-based functions to define the data the function will return.
- `mockImplementation`: Used to define a new function behavior of a mocked function.
- `mockReturnThis`: Used to return the actual instance of a function you're mocking.

These are the methods that you'll likely use most of the time when defining mock implementation and setting mock return value. Just keep in mind that there are many others.

Here, for `emailValidate`, we'll be using the `mockReturnValue` and `mockImplementation` methods.

Let's use `mockReturnValue` to make the validateEmail function return true by default, assuming the email will be formatted correctly:

```ts
vi.mock("../utils/email-validation", () => {
  return { default: vi.fn().mockReturnValue(true) };
});
import validateEmail from "../utils/email-validation";
```

We define a mock function with `vi.fn` and then chain on the `mockReturnValue(true)` to change the mock function default return value (undefined) to true in our case.

### Defining the Mocking Implementation

You can do a lot with a mocked function, like defining a new implementation for the mocked function that replaces existing logic in the original function.

Let's create a test suite with a fake email that throws an error when you pass the wrong email while creating contacts.

```ts :collapsed-lines
import { describe, expect, it, vi } from "vitest";
import mockinggoose from "mockingoose";
import Contacts from "../schema/contactList";
import addContacts from "../src/controllers/add-contacts.controller";

import { type Response, type Request } from "express";

vi.mock("../utils/email-validation", () => {
  return { default: vi.fn().mockReturnValue(true) };
});

import validateEmail from "../utils/email-validation";

const fakeContact = {
  contactName: "arnold",
  phoneNumber: 798600102,
  email: "arnoldjabo@gmail.com",
};

describe("Add contacts to the database", async () => {
  it("throws error for the wrong email address", async () => {
    const req = {
      body: { ...fakeContact, email: "fakemail" },
    } as Request;  

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any as Response;

    (validateEmail as ReturnType<typeof vi.fn>).mockImplementation(() => {
      throw new Error("invalid email!");
    });
 
    await expect(addContacts(req, res)).rejects.toThrow();
  });
});
```

In the snippet above, we're mocking or creating a fake request object that's cast as request type of `express`. We do the same with the response object – but the difference here is that with response we're also creating mocks for common methods that you'd use on an Express response (which are status and a `json` object).

We then turn the return type of the `validateEmail` function into the vitest mocking function type to avoid TypeScript warnings. Then we use the `mockImplementation` method to throw a new error inside `validateEmail`.

The assertion works differently because now we're throwing a promise-based error. We use `rejects` on the assertion and then chain on another matcher that stimulates which type of error the function will throw.

::: tip

When working with TypeScript, the response object can't be cast like we did on the request object because the response object is much stricter than request. So you'll first need to cast it as any and then cast back to the response object. That way you avoid the TypeScript warning while still keeping the type in play for your test code.

:::

### Mocking a Mongoose Model

With unit tests, we don't want to save test data to a real database. Instead we can fake the implementation of the service that calls the database service – in our case, we can use the `create` method from Mongoose. It'll save the record to a Mongo database. We can then define what it should return on success (and it should look identical to what it would return if we were using a real database).

We'll start by installing a library for mocking a Mongoose model called `mockingoose`:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-pnpm"/>

```sh
pnpm add -D mockingoose
```

@tab <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add -D mockingoose
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm install -D mockingoose
```

@tab <VPIcon icon="iconfont icon-bun"/>

```sh
bun add -D mockingoose
```

:::

After installation we'll create a mock for our contacts model:

```ts
import { describe, expect, it, vi } from "vitest";
import mockinggoose from "mockingoose";
import Contacts from "../schema/contactList";

const fakeContact = {
  contactName: "arnold",
  phoneNumber: 798600102,
  email: "arnoldjabo@gmail.com",
};

describe("Add contacts to the database", async () => {
  it("successfully create a new contact to the database", async () => {
    mockinggoose(Contacts).toReturn(fakeContact, "save");
  });

});
```

To mock a Mongoose model, we call the `mockinggoose()` function and pass the model to mock. Then we use the `toReturn` matcher to describe what it should return, `toReturn` matcher expects two arguments.

Those arguments are a fake dataset for the model and a Mongo method that we'll use to work with the data. For our example we'll use `save` because we're creating records in the document.

### Unit Testing the API

We can start by writing the first test for the add contact API call like this:

```ts :collapsed-lines
import { describe, expect, it, vi } from "vitest";
import mockinggoose from "mockingoose";
import Contacts from "../schema/contactList";
import addContacts from "../src/controllers/add-contacts.controller";
import { type Response, type Request } from "express";

vi.mock("../utils/email-validation", () => {
  return { default: vi.fn().mockReturnValue(true) };
});

import validateEmail from "../utils/email-validation";

const fakeContact = {
  contactName: "arnold",
  phoneNumber: 798600102,
  email: "arnoldjabo@gmail.com",
};

describe("Add contacts to the database", async () => {
  it("successfully create a new contact to the database", async () => {
    mockinggoose(Contacts).toReturn(fakeContact, "save");

    const req = {
      body: fakeContact,
    } as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as any as Response;

    await addContacts(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: `successfully created ${fakeContact.contactName}`,
    });
  });
 });
```

For this test assertion, we're using different matchers called **spies**. These are used on a function to inspect how many times it's been called or which parameters were used to call it (and so on).

Here we're expecting the status function of response to be called with a status of 201 as its argument. Then the JSON object is called with a message argument that we're using to send out the response.

---

## Integration Tests

Integration tests test the communication and integration of different parts of an application. For example, they might check if your database integrates well with the function that makes the API call to the database.

Unlike unit tests (where we don't need to have our test making API calls), with integration tests we're testing if parts of the application integrate together and works as expected. We don't need to mock anything, because we want to make sure that we're successfully sending a request to the backend and connecting to the database.

### Creating Integration Test Data Storage

When you're running integration tests, there are two ways to create a testing environment that acts as a database. They include:

- Creating a duplicate schema of your real database and using the copy as a testing database environment. Whenever you're running tests, you point your database connectivity to the test DB.
- Creating in-memory database storage. This approach doesn't require you to have two separate schemas (one for testing and another for production). Instead you construct the same schema shape in your codebase memory and use it as your testing environment.

Using the first approach is complicated because you have to set up and configure which database to use for which environment. But for the second approach, you can just set up the right schema structure as the original schema and use it for testing without needing to configure it in the database and remove it after use.

For Mongo DB there's a package that simplifies the in-memory storage option for us called `mongodb-memory-server`. It deletes all the data that was used for testing after the tests have finished running.

### How to Set Up the Environment for the Integration Tests

You'll need to install:

- `supertest`: a package that helps you make API calls/requests and returns back the response when testing.
- `mongodb-memory-server`: a package that makes in memory database storage for testing data.

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-pnpm"/>

```sh
pnpm add -D mongodb-memory-server supertest @types/supertest
```

@tab <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add -D mongodb-memory-server supertest @types/supertest
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm install -D mongodb-memory-server supertest @types/supertest
```

@tab <VPIcon icon="iconfont icon-bun"/>

```sh
bun add -D mongodb-memory-server supertest @types/supertest
```

:::


```sh
# command for pnpm package manager
pnpm add -D 

# command for npm package manager
npm install --save-dev mongodb-memory-server supertest @types/supertest

# command for yarn package manager
yarn add --dev mongodb-memory-server supertest @types/supertest

# command for bun package manager
bun add -d mongodb-memory-server supertest @types/supertest
```

Before moving on, we need to change the setup of our server entry file.

If you've been using Express with Node or any other framework, you may be familiar with the following type of setup for the server entry file where everything is added into a single file:

```ts
import express from "express";
import { loadEnvFile } from "node:process";
import connectToDB from "../config/dbConfig";
import addContacts from "./controllers/add-contacts.controller";

const app = express();
loadEnvFile();
async function dbConnection() {
  await connectToDB();
}
dbConnection();

app.use(express.json());
app.post("/add-contacts", addContacts);
app.listen(5000, () => console.log("the server successfully connected"));
```

This setup works fine and it's valid in certain cases. But when working with integration tests, it can be problematic. This is because in integration tests, we'll need an instance of Express to use when making the request. If we export the `app` variable here inside the main file when we make a request while testing, the production DB connection will conflict with the testing DB connection. This'll cause the tests to stop working.

The solution here is create another file, define an Express instance, and export it. Then we'll use the exported Express instance in the server to start a server. The setup looks like this:

```ts title="app.ts"
import express from "express";
import addContacts from "./controllers/add-contacts.controller";

const app = express()

app.use(express.json())
app.post("/add-contacts", addContacts);

export default app;
```

Then the main file <VPIcon icon="iconfont icon-typescript"/>`server.ts` or <VPIcon icon="iconfont icon-typescript"/>`main.ts` uses the `app` variable like this:

```ts title="main.ts"
import { loadEnvFile } from "node:process";
import connectToDB from "../config/dbConfig";
import app from "./app";

loadEnvFile();

async function bootsrap() {
  await connectToDB();
  app.listen(5000, () => console.log("the server successfully connected"));
}
bootsrap();
```

We're importing the Express instance from the `app` file and then using the `bootstrap()` function to set up the database and start the server. With this in place, we can start writing integration tests for the `addContact` module.

### How to Write the Integration Tests

::: tip

With integration test(s) you can name your file like <VPIcon icon="iconfont icon-typescript"/>`filename.integration.test.ts` this is the most commonly used naming convention for integration tests, but it is not mandatory it just a naming convention.

:::

You first need to set up the database testing data storage using the `mongoose` and `mongdb-memory-server` packages and the Express instance for making requests.

```ts
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../src/app";


describe("intergration test setup for add contact api", () => {
  let mongoServer: MongoMemoryServer;
  let server: any;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    server = app.listen(0);
  });

  afterAll(async () => {
    mongoServer.stop();
    mongoose.disconnect();
    server.close();
  });
});
```

The `beforeAll` and `afterAll` functions are `vitest` functions. `beforeAll` runs before any test starts executing and `afterAll` will run after all tests are done executing.

In the test, we set up the database and Express instance before any test runs.

First, we created the `mongoServer` variable. Then, inside the `beforeAll` block, we initialize it with `MongoMemoryServer.create` to create an in-memory database for testing data storage. We get the connection string using the `uri` variable using the `getUri` method. Finally we use Mongoose to connect to the generated in-memory connection string.

The server variable is assigned to the Express instance listening to port 0, but you can use any port number of your choice – it's just for demonstration purposes. This creates an Express instance for our testing environment.

In `afterAll`, after all tests have finished executing, we close the server and in-memory DB and then also disconnect our Mongoose instance.

Within the same `describe` block, we then add the test description and assertion (same as we did in unit testing):

```ts :collapsed-lines
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import app from "../src/app";
import request from "supertest";
import Contacts from "../schema/contactList";

describe("intergration test for add contact api", () => {
  /*
    Here we do server setup and database in memory setup that was discussed,
    in the previous snippets for setting up integration data storage testing environment 
   */
  const fakeContact = {
    contactName: "arnold",
    phoneNumber: 798600102,
    email: "arnoldjabo@gmail.com",
  };

  describe("POST /add-contacts", () => {
    it("creates a new record to the database", async () => {
      const response = await request(app)
        .post("/add-contacts")
        .send(fakeContact);

       const contactList = await Contacts.findOne({
        email: "arnoldjabo@gmail.com",
      })!;
      expect(contactList?.email).toBe("arnoldjabo@gmail.com");
      console.log(contactList);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        message: `successfully created ${fakeContact.contactName}`,
      });
    });
  });
});
```

Here in the test file, we're describing the test as a post method test for the add-contact endpoint. Then we test if it adds data to the database.

Within the `it` body, we use `request` from `supertest` to make a request to the server we've created. We also chain on an HTTP method with the endpoint we want to test.

For methods that send data to the backend like POST, PATCH, or PUT, we use the `send`() method on `request` to add an object of the data that we're sending.

We'll use the response to assert what the response could look like. For example, we're expecting the server to give a status code of 201 on successful data entry and a JSON object with a message property that confirms that it has added a contact.

We're using an assertion to check if the response's status matches what we expect, as well as if the response body matches the expected message we should be getting.

To test if the data are really being added to the database, I've added `contactList` to get the contact we just added by finding it by email. Then we log the `contactList` to the console to show how in-memory works. It's pretty much the same as a real Mongo DB instance. If we were to run the tests, we would have something that looks like this:

![Out-put for integration test with the console log showing how that stored using in memory database looks like when printed to the screen.](https://cdn.hashnode.com/uploads/covers/69c7bcff7cf27065100ae8be/e20082ae-0d06-48e2-b40b-8c66846c7ed4.png)

You can see from the console the in-memory stores and retrieves data as a regular Mongo database does.

::: note When to Use Unit vs Integration Tests

So when do you use each type of test?

Use unit tests when you have pure functions like the email validation example we had earlier.

And use Integration tests for functions that makes external API calls that are dependent on external service like database calls to avoid mocking every function that you're importing.

:::

---

## Summary

This guide explains how two types of testing work: unit tests and integration tests.

Unit tests are code that tests specific pieces of your codebase in isolation, and are best for pure functions. Integration test are code that tests successful integration and communication between parts of your application, and they're best for non-pure functions.

::: info

If you found the article helpful, you can [buy me coffee (<VPIcon icon="iconfont icon-buymeacoffee"/>`jabo1200`)](https://buymeacoffee.com/jabo1200).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Automate Your Tests in Express Using Vitest",
  "desc": "Thinking through API logic while constantly switching tabs to test application integration can be overwhelming and time-consuming. Well, you can save your time and energy by writing tests for your app",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-automate-your-tests-in-express-using-vitest.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
