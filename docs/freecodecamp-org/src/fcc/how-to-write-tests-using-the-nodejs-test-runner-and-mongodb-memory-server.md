---
lang: en-US
title: "How to Write Tests Using the Node.js Test Runner and mongodb-memory-server"
description: "Article(s) > How to Write Tests Using the Node.js Test Runner and mongodb-memory-server"
icon: fa-brands fa-js
category:
  - JavaScript
  - MongoDB
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Write Tests Using the Node.js Test Runner and mongodb-memory-server"
    - property: og:description
      content: "How to Write Tests Using the Node.js Test Runner and mongodb-memory-server"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-write-tests-using-the-nodejs-test-runner-and-mongodb-memory-server.html
prev: /programming/js/articles/README.md
date: 2025-02-14
isOriginal: false
author:
  - name: Orim Dominic Adah
    url : https://freecodecamp.org/news/author/orimdominic/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1739464298236/f5d6c959-4570-4813-bdd2-28c27dae4e1f.png
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
  "title": "MongoDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Write Tests Using the Node.js Test Runner and mongodb-memory-server"
  desc="I recently migrated some tests from Jest to the Node.js test runner in two of my projects that use MongoDB. In one of those projects, test runtime was reduced from 107 seconds to 25 seconds (screenshot below). In the other project, test runtime was r..."
  url="https://freecodecamp.org/news/how-to-write-tests-using-the-nodejs-test-runner-and-mongodb-memory-server"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1739464298236/f5d6c959-4570-4813-bdd2-28c27dae4e1f.png"/>

I recently migrated some tests from Jest to the Node.js test runner in two of my projects that use MongoDB. In one of those projects, test runtime was reduced from 107 seconds to 25 seconds (screenshot below). In the other project, test runtime was reduced by about 66%.

![76% reduction in time taken to run tests in Jest vs Node.js test runner](https://cdn.hashnode.com/res/hashnode/image/upload/v1738830673460/1560f7a3-38c1-42f3-8944-df06b40d73e4.png)

I decided to share with you how I was able to implement this. I think you’ll find it helpful, as it’s more cost-effective (in terms of reducing money spent on running tests in CI/CD), and it also improves your developer experience.

::: note Prerequisites

To follow along with this guide, you should have experience working with Node.js, MongoDB, and Mongoose (or any other MongoDB object data mapper). You should also have Node.js (at least v20.18.2) and MongoDB installed on your computer.

:::

---

## The Node.js Test Runner

The Node.js test runner was introduced as an experimental feature in version 18 of Node.js. It became fully available in version 20. It gives you the ability to:

1. Run tests
2. Report test results
3. Report test coverage (still experimental at version 23)

It’s a good idea to use the in-built test runner when writing tests in Node.js because it means that you have to use fewer external dependencies. You don’t need to install an external library (and its peer dependencies) to run tests.

The built-in best runner is also faster. Based on my experience using it on two projects (which formerly used Jest), I saw improvements of at least a 66% reduction in the time taken to run tests completely.

And unlike other testing frameworks or libraries, the Node.js test runner was built specifically for Node.js projects. It doesn’t try to accommodate the specifics of other programming environments like the browser. The specifics of Node.js are its main and only priority.

---

## MongoDB In-Memory Server

For tests that involve making requests to a database, some developers prefer to mock the requests to avoid making requests to a real database. They do this because making a request to a real database requires a lot of setting up which can cost time and resources.

Writing and fetching data using a real database is slower [<VPIcon icon="iconfont icon-mongodb"/>compared to writing and fetching data from memory](https://mongodb.com/resources/basics/databases/in-memory-database). When running automated tests, using a real MongoDB server will be slower than using an in-memory database server, and that is where [<VPIcon icon="iconfont icon-github"/>`typegoose/mongodb-memory-server`](https://github.com/typegoose/mongodb-memory-server) becomes useful.

![Comparison between memory and database communication with CPU](https://cdn.hashnode.com/res/hashnode/image/upload/v1738832586702/62360547-70e8-4e74-854f-c7ad74d182ea.png)

According to its documentation, mongodb-memory-server creates and starts a real MongoDB server programmatically from within Node.js, but uses an in-memory database by default. It also allows you to connect to the database server it creates using your preferred object data mapper such as Mongoose, Prisma, or TypeORM. In this guide, we’ll use [<VPIcon icon="fas fa-globe"/>Mongoose](https://mongoosejs.com/) (v8.9.6).

Since the data stored by mongodb-memory-server resides in memory by default, it’s faster to read from and write to than when using a real database. mongodb-memory-server is also easier to set up. These benefits make it a good choice for using it as a database server for writing tests.

Note: Make sure to install v9.1.6 of mongodb-memory-server to follow this guide. v10 currently has issues with cleaning up resources after tests are done. See this issue titled [Node forking will include any `--import` from the original command (<VPIcon icon="iconfont icon-github"/>`typegoose/mongodb-memory-server`)](https://github.com/typegoose/mongodb-memory-server/issues/912).

The issue has been resolved at the time of writing this article, but the fix has not been merged for installs.

---

## How to Write the Tests

Now I’ll take you through the following steps to get you started writing tests:

1. Set up the project
2. Set up mongoose schema
3. Set up services
4. Set up tests
5. Write tests
6. Pass tests
7. Use TypeScript (Optional)

### 1. Set Up the Project

I created a GitHub repository to make it easier for you to follow this guide. Clone the repository at [<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`](https://github.com/orimdominic/nodejs-test-runner-mongoose) and checkout branch <VPIcon icon="fas fa-code-branch"/>`01-setup`.

In <VPIcon icon="fas fa-code-branch"/>`01-setup`, the dependencies for the project are in the <VPIcon icon="iconfont icon-json"/>`package.json` file. Install the dependencies using the `npm install` command to set up the project. To make sure that the setup is complete and correct, run the `node .` command in the terminal of your project. You should see your version of Node.js as an output on the terminal.

```sh
# install dependencies
npm install
node .
#
# You are running Node.js v22.13.1
```

### 2. Set up Mongoose Schema

We’ll set up the schema for two collections (Task and User) in branch [<VPIcon icon="fas fa-code-branch"/>`02-setup-schema` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/tree/02-setup-schema) using Mongoose. The [<VPIcon icon="fas fa-folder-open"/>`task/`<VPIcon icon="fa-brands fa-js"/>`model.mjs` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/blob/02-setup-schema/task/model.mjs) and [<VPIcon icon="fas fa-folder-open"/>`user/`<VPIcon icon="fa-brands fa-js"/>`model.mjs` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/blob/02-setup-schema/user/model.mjs) files contain the schema for the Task and the User collection, respectively. We’ll also set up a database connection in <VPIcon icon="fa-brands fa-js"/>`index.mjs` to ensure that the schema setup works correctly.

I won’t go into detail about Mongoose models and schema in this article because they are outside its scope.

When you run the `node .` command after implementing the changes in <VPIcon icon="fas fa-code-branch"/>`02-setup-schema`, you should see a similar result in the console as in the snippet below:

```sh
node .
# 
# You are running Node.js v22.13.1
# Created user with id 679f1d7f73fbeaf23b2007df
# Created task "Task title" for user with id "679f1d7f73fbeaf23b2007df"
```

You can see the differences between <VPIcon icon="fas fa-code-branch"/>`01-setup` and <VPIcon icon="fas fa-code-branch"/>`02-setup-schema` via the [01-setup <> 02-setup-schema diff on GitHub (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/compare/01-setup...02-setup-schema).

### 3. Set Up Services

Next, we create service files ([<VPIcon icon="fas fa-folder-open"/>`task/`<VPIcon icon="fa-brands fa-js"/>`service.mjs` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/blob/03-setup-services/task/service.mjs) and [<VPIcon icon="fas fa-fodler-open"/>`user/`<VPIcon icon="fa-brands fa-js"/>`service.mjs` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/blob/03-setup-services/user/service.mjs)) in branch [<VPIcon icon="fas fa-code-branch"/>`03-setup-services` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/tree/03-setup-services). Both files currently contain empty functions that we’ll write tests for later. These functions will contain business logic and also communicate with the database. We’re using [<VPIcon icon="fas fa-globe"/>JSDoc](https://jsdoc.app/) comments for typing parameters and return values.

Click [02-setup-schema <> 03-setup-services diff](https://github.com/orimdominic/nodejs-test-runner-mongoose/compare/01-setup...02-setup-schema) to see the code changes between <VPIcon icon="fas fa-code-branch"/>`02-setup-schema` and <VPIcon icon="fas fa-code-branch"/>`03-setup-services`.

### 4. Set Up Tests

In branch [<VPIcon icon="fas fa-code-branch"/>`04-set-up-tests` (<VPIcon icon="iconfont icon-github"/>)](https://github.com/orimdominic/nodejs-test-runner-mongoose/tree/04-set-up-tests), we set up the codebase to run tests. We create [<VPIcon icon="fa-brands fa-js"/>`test.setup.mjs` (<VPIcon icon="iconfont icon-github"/>)](https://github.com/orimdominic/nodejs-test-runner-mongoose/blob/04-set-up-tests/test.setup.mjs) which contains code that will be run before each test file is executed.

In <VPIcon icon="fa-brands fa-js"/>`test.setup.mjs`, the `connect` function creates a MongoDB In-Memory server and connects to it with Mongoose for running the tests. The `closeDatabase` function closes the database connection and cleans up all resources to free memory.

The `connect` and `closeDatabase` functions get executed in the [<VPIcon icon="fa-brands fa-node"/>`t.before`](https://nodejs.org/api/test.html#beforefn-options) hook and the [<VPIcon icon="fa-brands fa-node"/>`t.after`](https://nodejs.org/api/test.html#afterfn-options) hook respectively. This ensures that, before a test file is run, a database connection is established through `t.before`. Then after tests for the file have been completely run, the database connection is dropped and the resources used are cleared up through `t.after`.

In <VPIcon icon="iconfont icon-json"/>`package.json`, we’ll update the npm `test` script to `node --test --import ./test.setup.mjs`. This command ensures that the `test.setup.mjs` ES Module is preloaded and executed through the [`--import`](https://nodejs.org/api/cli.html#--importmodule) CLI command before each test file is run.

Then we’ll create the test files with empty tests in the <VPIcon icon="fas fa-folder-open"/>`__tests__` folders for `user` and `task`. After implementing the [new changes in <VPIcon icon="fas fa-code-branch"/>`04-set-up-tests` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/compare/03-setup-services...04-set-up-tests), running the `test` script with `npm run test` should display output similar to the snippet below:

```sh :collapsed-lines
npm run test
# 
# > nodejs-test-runner-mongoose@1.0.0 test
# > node --test --import ./test.setup.mjs
# 
# ...
# 
# ℹ tests 8
# ℹ suites 5
# ℹ pass 8
# ℹ fail 0
# ℹ cancelled 0
# ℹ skipped 0
# ℹ todo 0
# ℹ duration_ms 941.768873
```

All tests currently pass because there are no assertions that fail in them. We’ll write tests with assertions in the following section.

### 5. Write Tests

Now it’s time to write tests for the functions in the service files in the [<VPIcon icon="fas fa-code-branch"/>`05-write-tests` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/blob/05-write-tests) branch. We’re using the [Node.js assert library](https://nodejs.org/api/assert.html) to ensure that values returned from the functions are what we expect. You can view the tests we’ve written when you compare [the differences between <VPIcon icon="fas fa-code-branch"/>`04-set-up-tests` and <VPIcon icon="fas fa-code-branch"/>`05-write-tests` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/compare/04-set-up-tests...05-write-tests)

When the `tests` script is run, all tests fail because we haven’t written the functions in the service files yet. You should see output similar to the snippet below when you run the `test` script:

```sh :collapsed-lines
npm run test
# 
# > nodejs-test-runner-mongoose@1.0.0 test
# > node --test --import ./test.setup.mjs
# 
# ...
# 
# ℹ tests 8
# ℹ suites 5
# ℹ pass 0
# ℹ fail 8
# ℹ cancelled 0
# ℹ skipped 0
# ℹ todo 0
# ℹ duration_ms 1202.031961
```

### 6. Pass Tests

In [<VPIcon icon="fas fa-code-branhc"/>`06-pass-tests` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/blob/06-pass-tests), we write the functions in the service files to pass the tests. Only 6 out of 7 tests pass when the `test` script is run because we skipped the test for the `getById` function in <VPIcon icon="fas fa-folder-open"/>`user/`<VPIcon icon="fa-brands fa-js"/>`service.mjs` has with `t.skip`. We haven’t finished the `getById` function in <VPIcon icon="fas fa-folder-open"/>`user/`<VPIcon icon="fa-brands fa-js"/>`service.mjs`. I figured we could leave it as an exercise.

When you run the `test` script, you should get a similar output in the terminal as below:

```sh
npm run test
# ...
#
# ℹ tests 7
# ℹ suites 4
# ℹ pass 6
# ℹ fail 0
# ℹ cancelled 0
# ℹ skipped 1
# ℹ todo 0
# ℹ duration_ms 1287.564918
```

You can see the code we wrote to pass tests in the [code changes between <VPIcon icon="fas fa-code-branch"/>`05-write-tests` and <VPIcon icon="fas fa-code-branch"/>`06-pass-tests` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/compare/05-write-tests...06-pass-tests).

### 7. Use TypeScript (Optional)

If you intend to run tests with TypeScript, you can checkout branch [<VPIcon icon="fas fa-code-branch"/>`07-with-typescript` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/tree/07-with-typescript). You need to have Node.js `>=v22.6.0` installed because we’re using the `--experimental-strip-types` option in the `test`. To set up tests to run with TypeScript, go through the following steps:

1. Install TypeScript using the `npm install typescript --save-dev` command
2. Install tsx using the `npm install tsx` command
3. Create a default <VPIcon icon="iconfont icon-json"/>`tsconfig.json` file at the root of the project using the `npx tsc --init` command

In <VPIcon icon="iconfont icon-json"/>`package.json`, update the `test` script to this:

```json title="package.json
{
  "test": "node --test --experimental-strip-types --import tsx --import ./test.setup.mjs"
}
```

- [<VPIcon icon="fa-brands fa-node"/>`--experimental-strip-types`](https://nodejs.org/docs/latest-v22.x/api/cli.html#--experimental-strip-types) helps strip out types before each test file is executed.
- Preloading `tsx` with the `--import` helps execute the TypeScript file. Without it, the test runner will not be able to find files imported without the `.ts` extension. For example, <VPIcon icon="fas fa-folder-open"/>`user/`<VPIcon icon="fa-brands fa-js"/>`model.ts` imported with the code snippet below will not be found.

```ts
import { UserModel } from "./model";
```


The rest of the [changes from <VPIcon icon="fas fa-code-branch"/>`06-pass-tests` to <VPIcon icon="fas fa-code-branch"/>`07-with-typescript` (<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`)](https://github.com/orimdominic/nodejs-test-runner-mongoose/compare/06-pass-tests...07-with-typescript) involve updating types, changing file extensions from `.mjs` to `.ts` and updating import statements.

---

## Conclusion

In this guide, you have learned how to use the built-in Node.js test runner and why it’s often a better choice over other testing libraries and frameworks. You have also learned how to use mongodb-memory-server as a replacement for a real MongoDB server, as well as why it’s a good idea to use this instead of a real MongoDB server for tests.

Most importantly, you have learned how to set up and run tests in Node.js using the Node.js test runner and mongodb-memory-server. You should now know how to set up your projects to run the tests if you use TypeScript.

If you find the [<VPIcon icon="iconfont icon-github"/>`orimdominic/nodejs-test-runner-mongoose`](https://github.com/orimdominic/nodejs-test-runner-mongoose) repository useful, kindly give it a star. It encourages me. Thank you.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Write Tests Using the Node.js Test Runner and mongodb-memory-server",
  "desc": "I recently migrated some tests from Jest to the Node.js test runner in two of my projects that use MongoDB. In one of those projects, test runtime was reduced from 107 seconds to 25 seconds (screenshot below). In the other project, test runtime was r...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-write-tests-using-the-nodejs-test-runner-and-mongodb-memory-server.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
