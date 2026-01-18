---
lang: en-US
title: "Using the React Testing Library debug method"
description: "Article(s) > Using the React Testing Library debug method"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Using the React Testing Library debug method"
    - property: og:description
      content: "Using the React Testing Library debug method"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-react-testing-library-debug-method.html
prev: /programming/js-react/articles/README.md
date: 2023-11-03
isOriginal: false
author:
  - name: Ibadehin Mojeed
    url : https://blog.logrocket.com/author/ibadehinmojeed/
cover: /assets/image/blog.logrocket.com/using-react-testing-library-debug-method/banner.png
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
  name="Using the React Testing Library debug method"
  desc="Use the React Testing Library debug method, and the logRoles and logTestingPlaygroundURL() methods to identify and analyze test errors."
  url="https://blog.logrocket.com/using-react-testing-library-debug-method"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/banner.png"/>

::: note Editor’s note

This article was last updated on 3 November 2023 to offer an introduction to the `render`, `screen`, and `container` methods in the React Testing Library.

:::

![Using The React Testing Library Debug Method](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/banner.png)

Testing your application before deploying it to production guarantees an error-free product that will function as intended. Knowing how to perform the right tests and debug your code is necessary to make you a better developer.

In this article, we’ll cover how to use the React Testing Library `debug` method to identify and analyze test errors. Later in the article, we’ll also explore debugging with the RTL `logTestingPlaygroundURL()` method. To follow along with this tutorial, you should be familiar with React and the [**React Testing Library**](/blog.logrocket.com/compare-react-testing-libraries.md#integration-tests). You can find the full code for this tutorial in the [GitHub repository (<VPIcon icon="iconfont icon-github" />`Ibaslogic/react-rtl-debug`)](https://github.com/Ibaslogic/react-rtl-debug). Let’s get started!

---

## An overview of React Testing Library

React Testing Library, also called RTL, provides a solution for testing React components that mimics how users would interact with them. RTL’s approach avoids testing the implementation details, thereby making our test code easier to maintain.

Essentially, React Testing Library is a set of utilities used [**alongside a test runner like Jest**](/blog.logrocket.com/testing-react-apps-jest-react-testing-library.md) or Mocha. In React Testing Library (RTL), three essential methods are often used to interact with and test React components: `render`, `screen`, and `container`.

The `render` method is used to render a React component into a testing environment. It essentially simulates rendering a component in a controlled testing environment, allowing you to perform various tests on the rendered component.

This method returns a set of queries, including `screen` and `container`, which you can use to interact with and make assertions about the rendered DOM elements:

```jsx
import { render } from '@testing-library/react';

// Render a component
const { container } = render(<MyComponent />);
```

The `screen` object is a query interface provided by RTL that allows you to select DOM elements and make assertions about their presence, content, and attributes. It provides methods like `getBy`, `findBy`, `queryBy`, and more, which you can use to find and interact with elements in the rendered component:

```jsx
import { screen } from '@testing-library/react';

// Select an element by text
const element = screen.getByText('Hello, World!');
```

The `container` property is an object that represents the root of the rendered component’s DOM structure. You can use it to access and manipulate the entire rendered DOM tree, making it useful for advanced testing scenarios where you need to interact with the component’s structure directly:

```jsx
import { render } from '@testing-library/react';

// Render a component and access the container
const { container } = render(<MyComponent />);
```

`prettyDOM(container, maxLength, options)` helps format and display the DOM structure in a more readable way. It’s often used with `screen.container` to make the printed output more human-friendly:

```jsx
import { prettyDOM } from '@testing-library/react';

const container = screen.container;
console.log(prettyDOM(container));
```

These methods work together to provide a powerful testing framework for React applications. You can use `render` to render your components, then use `screen` and `container` to query and interact with the rendered DOM.

### React Testing Library vs. Jest

As a refresher, [**Jest is both a test runner and a testing framework**](/blog.logrocket.com/jest-testing-top-features.md) for JavaScript related libraries and frameworks. Therefore, we can write tests for our React application and debug the Jest tests using only Jest.

Jest offers a few different methods to debug an application and resolve problems if something goes wrong. Depending on the environment, we can troubleshoot Jest tests using either the [**Node.js `debugger`**](/blog.logrocket.com/debug-node-js-chrome-devtools-watchers.md#using-debugger-keyword) statement in Chrome Inspector or [**debugging in Visual Studio Code**](/blog.logrocket.com/debugging-react-native-vs-code.md).

While the methods above might come in handy if we’re only using Jest, React Testing Library provides us with methods like `debug()`, `logTestingPlaygroundURL()`, and the `logRoles` function to simplify debugging tests. Let’s dive in and implement these methods!

---

## Adding React Testing Library to React apps

To perform a test on a React app with RTL and identify test errors during debugging, we have to first add RTL to our application.

React projects created with the Create React App CLI come bundled with RTL, so no additional installation is required. Otherwise, we have to include RTL using npm as follows:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn add --dev @testing-library/react
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm i --save-dev @testing-library/react
```

:::


In addition to RTL, we’ll include the [`jest-dom` (<VPIcon icon="iconfont icon-github" />`testing-library/jest-dom`)](https://github.com/testing-library/jest-dom) utility, which lets us use custom matchers like `.toBeInTheDocument()`:

```sh
npm install --save-dev @testing-library/jest-dom
```

Next, let’s [clone the React project (<VPIcon icon="iconfont icon-github" />`Ibaslogic/react-rtl-debug`)](https://github.com/Ibaslogic/react-rtl-debug) that we’ll use in this tutorial:

```sh
git clone https://github.com/Ibaslogic/react-rtl-debug 
```

Then, head to the project folder and generate the `node_modules` folder:

```sh
cd react-rtl-debug

npm i
# or
yarn
```

Finally, run the project:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn start
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npm run start
```

:::

You should see the project open in the browser at `port 3000`. If it doesn’t open automatically, visit `http://localhost:3000/` after successfully starting the dev server:

![Initial Page Load Application Loading Message](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/binitial-page-load-app-loading-message.webp)

The application shows a loading message on the initial page load while retrieving and displaying the list of posts from a backend server.

If you need a refresher on creating the project, check out this article on how to [**fetch data in a React project**](/blog.logrocket.com/modern-api-data-fetching-methods-react.md). The project file structure should look similar to the following code:

```sh
project
  ...
  ├── src
  │    ├── components
  │    │      ├── App.js
  │    │      ├── Header.js
  │    │      └── Posts.js
  │    ├── app.css
  │    ├── index.js
  │    └── setupTest.js
  ...
```

Now, we can begin interacting with React Testing Library.

---

## Using React Testing Library

Before we get started with the `debug` method, let’s explore some of the RTL facilities.

RTL provides methods that let us query the DOM nodes and make assertions about their content. In the most straightforward implementation, we’ll write a test to assert that header text reading `Fetch asynchronous posts` displays in the UI of our application.

In a text file called <VPIcon icon="fas fa-folder-open"/>`components/`<VPIcon icon="fa-brands fa-react"/>`Header.test.jsx`, we can add the following code:

```js title="components/Header.test.jsx"
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('should display heading text', () => {
  render(<Header />);
  const headingText = screen.getByText('Fetch asynchronous posts');
  expect(headingText).toBeInTheDocument();
});
```

The `render` method from React Testing Library lets us render the React component that we want to test into the testing environment. Meanwhile, the `screen` object provides access to query methods like `getByText()` to find DOM nodes.

Then, in the test block, we assert that the text in the returned DOM node is present on the page by using the `toBeInTheDocument()` matcher from `jest-dom`.

If we save the file and run the test with the `npm run test` command, the test should pass with the following result:

![Dom Node Text Present Rtl Test Pass](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/bdom-node-text-present-rtl-test-pass.png)

---

## Debugging test failures with the React Testing Library

Sometimes, unknowingly, we may write a test to query a DOM element that doesn’t exist. For instance, let’s modify the text inside the query we wrote previously so that it doesn’t match a particular element:

```js
const headingText = screen.getByText(
  'Does not exist: Fetch asynchronous posts'
);
```

As a result of the change above, the test will fail with the following result:

![Test Fail Query Nonexistent Result](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/btest-fail-query-nonexistent-result.png)

---

## Automatic logging

When the `screen.getByText()` method doesn’t find a matching DOM node, it throws a meaningful error message, as seen in the image above. This error contains the current state of the DOM, as highlighted in the image.

Thanks to this automatic logging when a failure occurs, it’s easier for us to visualize the DOM, giving us a hint as to why an assertion failed. The image above shows that the heading text doesn’t match what we provided in the test block. Now that we’ve located the bug, we can fix the text so that our test will pass.

One testing method called [**test-driven development (TDD)**](/blog.logrocket.com/test-driven-development-methods-deno.md#what-test-driven-development) helps make development a breeze; TDD lets us write test cases based on product requirements before the product is fully developed.

---

## Using the `screen.debug()` method

React Testing Library exposes a `debug()` method from the `screen` object to print out the state of the DOM. In addition to the automatic logging we explained above, the `debug()` method can also help us visualize the DOM tree before writing an assertion.

### Understanding the `screen.debug()` syntax

Take a look at the `screen.debug()` syntax shown below:

```js
screen.debug(element, maxLengthToPrint, options);
```

The first parameter of the `debug()` method is the `element` we want the `screen.debug()` method to print out. This parameter can be a single element or multiple elements. If left undefined, it will default to printing the root node.

The second parameter lets us specify the content length to print. The default output length is `7000`, meaning the content will be truncated after seven thousand characters. We can increase or limit the output length as needed.

We may also want to configure [test formatting using the `options` parameter (<VPIcon icon="iconfont icon-github" />`jestjs/jest`)](https://github.com/jestjs/jest/tree/main/packages/pretty-format#usage-with-options). For instance, we can turn off syntax highlighting in the terminal with the `options` parameter as follows:

```js
screen.debug(undefined, null, { highlight: false });
```

### Example using the `debug()` method

Using our last test example, we’ll use the `screen.debug()` method to debug the document states and the `heading` element. First, let’s consider debugging the document states:

```js
test('should display heading text', () => {
  render(<Header />);
  screen.debug();
  // assertion
});
```

Because we didn’t pass any argument to `debug()`, it will print the state of the DOM tree as follows:

```html
<body>
  <div>
    <h1>
      Fetch asynchronous posts
    </h1>
  </div>
</body>
```

By visualizing the DOM, we can easily identify and analyze test errors, which we’ll explore later on in the article.

Next, let’s consider debugging the `heading` element. To log the `heading` element, we’ll pass the `heading` node to `debug()`:

```js
test('should display heading text', () => {
  render(<Header />);
  const headingText = screen.getByText('Fetch asynchronous posts');
  screen.debug(headingText);
  // assertion
});
```

Below is the output:

```html
<h1>
  Fetch asynchronous posts
</h1>
```

With this output printed by the `debug()` method, we’re sure that the target element is present at that development stage. This will come in handy when making a proper assertion in our test.

Environment variables like `DEBUG_PRINT_LIMIT` and `COLORS` are used to control the behavior of `screen.debug()`. `DEBUG_PRINT_LIMIT` allows you to set a limit on the printed content length, and `COLORS` can be used to enable or disable syntax highlighting in the terminal output:

```sh
# Set a limit for printed content
DEBUG_PRINT_LIMIT=10000

# Enable syntax highlighting in the output
COLORS=true
```

---

## Waiting for appearance and disappearance using `debug()`

Let’s further explore the React Testing Library `debug()` method and see how we can use it to examine the program’s state at various development stages.

Earlier in this tutorial, we saw a loading message displayed in our application while data was being fetched from the server. As soon as the data was returned, the loading message disappeared. Now, we’ll write a test for this asynchronous operation while also debugging the test code using the `debug()` method.

### Creating our test file and checking the DOM state

To render the posts, we’re using the <VPIcon icon="fas fa-folder-open"/>`components/`<VPIcon icon="fa-brands fa-react"/>`Posts.js` component file. In the same directory, we’ll create a test file called <VPIcon icon="fa-brands fa-redact"/>`Posts.test.js` and add the following code:

```js title="components/Posts.test.js"
import { render, screen } from '@testing-library/react';
import Posts from './Posts.js';

test('should display loading message', () => {
  render(<Posts />);
  screen.debug();
});
```

If we save the file, we should see the current state of the DOM:

![Test File Render Posts](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/btest-file-render-posts.png)

The current state in the DOM contains the loading message, which was expected. At this point, the data hasn’t arrived.

### Axios >0.27.2 will break Jest tests in CRA

If you’re using the latest version of Axios at the time of writing, v1.2.5, you may encounter the following error:

```plaintext title="output"
SyntaxError: Cannot use import statement outside a module
```

This Jest error is due to how newer versions of Axios emit [**ES modules instead of CommonJS**](/blog.logrocket.com/commonjs-vs-es-modules-node-js.md). A workaround for this is to update the test scripts in <VPIcon icon="iconfont icon-json"/>`package.json` to the following:

```json title="package.json"
{
  "test": "react-scripts test --transformIgnorePatterns \"node_modules/(?!axios)/\"",
}
```

Another option is to downgrade Axios to v0.27.2 using npm:

```sh
npm i axios@v0.27.2
```

Then, stop your test with <kbd>Ctrl</kbd>+<kbd>C</kbd> and rerun it with `npm run test`. You should now see the current state of the DOM tree.

### Asserting that our text is in the document

Now that we know what React Testing Library is seeing, we can assert that the string `A moment please…` is present in the document. To do so, update the test block to the following code:

```js
test('should display loading message', () => {
  render(<Posts />);
  // screen.debug();
  const loadingMessage = screen.getByText('A moment please...');
  expect(loadingMessage).toBeInTheDocument();
});
```

If we save the test file, the test should pass with the following result:

![Asserting String Document Test Pass](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/basserting-string-document-test-pass.png)

---

## Testing for appearance

Let’s perform a test to ensure that our post data returns from the server and is displayed in the client. We’ll use the `debug` method to make the testing process easier.

Because we’re fetching the post data asynchronously, we have to set up our test to wait for the posts before it displays in the DOM. For such operations, RTL provides async methods like `findBy*` and `waitFor`. These methods return promises, so we’ll treat them as such by using the `await` keyword when calling them. The code below performs an asynchronous test using the `findBy*` async method:

```js
test('should fetch and display asynchronous posts', async () => {
  render(<Posts />);
  screen.debug(); //post initially not present
  const postItemNode = await screen.findByText('qui est esse');
  screen.debug(); //post is present
});
```

`findBy*` returns a promise that will only resolve when an element is found or rejected for other cases. We’ve handled this returned promise with the `await` keyword to prevent the test from completing before the async promise settles. Doing so helps to avoid a false positive failure, which is a situation where a test passes even when the application breaks.

Notice how we strategically placed the `debug()` method to visualize the DOM tree before and after the post data arrives. See the output below:

![Visualize DOM Tree Date Before And After](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/bvirtualize-dom-tree-date-before-after.png)

As we can see, the `debug` method helps simulate the app’s behavior. When the page initially loads, it prints a loading message. When the data returns, it replaces the loading message with the data.

Now that we’re sure that the post data has arrived, we can perform an assertion that a `post` item is present in the DOM:

```js
test('should fetch and display asynchronous posts', async () => {
  render(<Posts />);
  const postItemNode = await screen.findByText('qui est esse');
  expect(postItemNode).toBeInTheDocument();
});
```

The test should pass with the following result:

![Assert Post Item Present DOM](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/bassert-post-item-present-dom.png)

### Avoid hitting the actual API

In practice, when performing a test, we should avoid hitting the actual API to prevent our test from becoming slow and fragile. Instead, we should create mock data to model the API interaction. This tutorial focuses on the `debug` method, so we won’t cover mocking an API. However, [this project’s GitHub repository (<VPIcon icon="iconfont icon-github" />`Ibaslogic/react-rtl-debug`)](https://github.com/Ibaslogic/react-rtl-debug) implements API mocking using [**Mock Service Worker (MSW)**](/blog.logrocket.com/getting-started-with-mock-service-worker.md).

---

## Testing for disappearance

To finish up our lesson on the React Testing Library `debug` method, we can test that the loading message is initially present on page load and then disappears once the post data arrives. The test code looks like the following:

```js
test('Should display loading message and disappear when posts arrive', async () => {
  render(<Posts />);
  screen.debug(); //message initially present
  await waitForElementToBeRemoved(() =>
    screen.getByText('A moment please...')
  );
  screen.debug(); //loading message not present
});
```

Though not the focus of this article, RTL provides the [<VPIcon icon="fas fa-globe"/>`waitForElementToBeRemoved`](https://testing-library.com/docs/dom-testing-library/api-async/#waitforelementtoberemoved) helper function to test that an element initially appears and later disappears asynchronously. It returns a promise that will resolve when the target node is removed from the DOM.

The `debug()` method placement lets us visualize the DOM tree before and after the loading message disappears. Below is the output:

![Debug Method Placement Visualize Dom Tree](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/bdebug-method-placement-visualize-dom-tree.png)

As seen in the image above, the first `debug` method prints the DOM tree containing the loading message, while the second `debug` informs us that the message is no longer present because the data has arrived from the server.

Keep in mind that we’ve implemented a mock API using MSW to intercept the network request and return a response. In this case, it returns the `title 1` text seen above instead of the API post’s actual data.

Now, the test should pass with the following result:

![Debug Method Print Dom Tree Test Pass](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/bdebug-method-print-dom-tree-test-pass.png)

---

## The `logRoles` function

Like the `debug()` method, [`logRoles`](https://testing-library.com/docs/dom-testing-library/api-accessibility/#logroles) can log an element’s ARIA role or a list of roles applied to elements within the DOM tree. This process can help make testing easier, as we’ll see in a moment.

---

In this tutorial, we used the `getByText` and `findByText` query methods to find elements on the page. While this works, RTL places `*ByRole` counterparts at the [<VPIcon icon="fas fa-globe"/>top of the priority list](https://testing-library.com/docs/queries/about#priority).

To use `*ByRole` queries, we must be familiar with the implicit roles placed on HTML elements. When dealing with non-semantic elements, we can manually provide a `role` attribute. A semantic element like `<button>` has an implicit role of `button`. Feel free to check out the [<VPIcon icon="iconfont icon-w3c"/>list of ARIA roles](https://w3.org/TR/html-aria/#docconformance) that apply to HTML elements.

With the `logRoles` function, we can easily log the element’s implicit ARIA roles for use in our accessibility test. If we revisit our previous test using `findByText`, we can apply the helper function to our test code like so:

```js
import {
  // ...
  logRoles,
} from '@testing-library/react';
// ...
test('should view implicit roles with logRoles', async () => {
  render(<Posts />);
  const postItemNode = await screen.findByText('title 1');
  logRoles(postItemNode);
  expect(postItemNode).toBeInTheDocument();
});
```

In the code above, we started by importing `logRoles` from the testing library. Then, we passed the target node as an argument to the function. The output will give us the ARIA role of that element:

![Logroles Target Node Output Argument Function](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/blogroles-target-node-output-argument-function.png)

As seen in the image above, the ARIA role is `heading`. We can refactor the test code to use the `findByRole` accessible query instead of `findByText`, so we have the following:

```js
test('should view implicit roles with logRoles', async () => {
  render(<Posts />);
  const postItemNode = await screen.findByRole('heading', {
    name: 'title 1',
  });
  expect(postItemNode).toBeInTheDocument();
});
```

To guarantee that our UI is accessible, we should consider using `*ByRole` before the other query types.

To print a list of ARIA roles applied to elements within the DOM tree, we can pass the rendered container element to `logRoles` as an argument. The code will look like the following:

```js
test('should view implicit roles with logRoles', async () => {
  const view = render(<Posts />);
  const postItemNode = await screen.findByRole('heading', {
    name: 'title 1',
  });
  logRoles(view.container);
  expect(postItemNode).toBeInTheDocument();
});
```

The output will now look like the image below:

![Print Aria Roles Dom Tree](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/bprint-aria-roles-dom-tree.png)

The output, as seen above, contains the DOM elements and their respective ARIA roles. We can target these elements by their implicit roles. For instance, if we want to assert that a `li` item is visible in the DOM, we can write the following test:

```js
test('should list item visible in the DOM', async () => {
  render(<Posts />);
  const postItemNode = await screen.findByRole('listitem');
  expect(postItemNode).toBeVisible();
});
```

---

## Debugging with the `logTestingPlaygroundURL()` method

The `screen` object also exposes the `logTestingPlaygroundURL()` method, which further simplifies debugging tests. When we use this method in our test code, RTL returns a link in the editor terminal [<VPIcon icon="fas fa-globe"/>pointing to a testing playground](https://testing-playground.com/).

If you know how the testing playground works, we can paste the DOM tree that we printed using the `debug()` method to find the best queries to target elements. For instance, let’s revisit our first example test. As we learned, using the `debug()` method will print the DOM tree:

```js
test('should display heading text', () => {
  render(<Header />);
  screen.debug();
});
```

Once printed, the DOM tree should look like the following:

```html
<div>
  <h1>
    Fetch asynchronous posts
  </h1>
</div>
```

Remember, in the example, we targeted the heading node and made assertions using the `screen.getByText()` method as follows:

```js
test('should display heading text', () => {
  render(<Header />);
  const headingText = screen.getByText('Fetch asynchronous posts');
  expect(headingText).toBeInTheDocument();
});
```

While this works, as we mentioned in the `logRoles` section, we should consider using accessible queries before other query types. For beginners who aren’t sure of the most appropriate query methods to use, the playground can help.

If we copy the DOM elements into the testing playground (label 1), we can select the element in the view, (label 2). Then, we’ll see a suggested query, label 3, which we can copy into our test:

![Copy Dom Elements Testing Playground](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/bcopy-demo-elements-testing-playground.png)

Now, with this query, a more accessible test will look like the following code:

```js
test('should display heading text', () => {
  render(<Header />);
  const headingText = screen.getByRole('heading', {
    name: /fetch asynchronous posts/i,
  });
  expect(headingText).toBeInTheDocument();
});
```

With this playground in mind, let’s use `screen.logTestingPlaygroundURL()` in the test block as follows:

```js
test('should display heading text', () => {
  render(<Header />);
  screen.logTestingPlaygroundURL();
});
```

Then, RTL will generate a link to the playground after we run the test:

![RTL Generate Playground Link](/assets/image/blog.logrocket.com/using-react-testing-library-debug-method/brtl-generate-playground-link.png)

If we visit the link, we’ll get the equivalent of the playground UI shown above. Therefore, we don’t have to use the `debug()` method to print and copy the DOM tree into the playground. Instead, it automatically gets added.

Without the `debug()` method, viewing the playground via the `screen.logTestingPlaygroundURL()` method lets us see at a glance what elements are visible to the user. It also suggests the most suitable query methods to target the elements.

---

## Conclusion

Testing can be cumbersome if you’re just getting started with it. However, the ability to debug can make this process a breeze.

In this article, we discussed how to use the `debug()` method from React Testing Library to identify and analyze test errors. We also learned how to use the `logTestingPlaygroundURL()` method to further ease the debugging process. If you enjoyed this lesson, be sure to leave a comment. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Using the React Testing Library debug method",
  "desc": "Use the React Testing Library debug method, and the logRoles and logTestingPlaygroundURL() methods to identify and analyze test errors.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/using-react-testing-library-debug-method.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
