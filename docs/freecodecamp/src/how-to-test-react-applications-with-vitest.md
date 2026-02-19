---
lang: en-US
title: "How to Test React Applications with Vitest"
description: "Article(s) > How to Test React Applications with Vitest"
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
      content: "Article(s) > How to Test React Applications with Vitest"
    - property: og:description
      content: "How to Test React Applications with Vitest"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-test-react-applications-with-vitest.html
prev: /programming/js-react/articles/README.md
date: 2026-02-11
isOriginal: false
author:
  - name: Aiyedogbon Abraham
    url: https://freecodecamp.org/news/author/abrahamaiyedogbon/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1770763375195/82544dec-aec2-4de9-b7f8-f90349394e81.png
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
  name="How to Test React Applications with Vitest"
  desc="Testing is one of those things that every developer knows they should do, but many put off until problems start appearing in production. If you’re building React applications with Vite, there's a testing framework that fits so naturally into your wor..."
  url="https://freecodecamp.org/news/how-to-test-react-applications-with-vitest"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1770763375195/82544dec-aec2-4de9-b7f8-f90349394e81.png"/>

Testing is one of those things that every developer knows they should do, but many put off until problems start appearing in production. If you’re building React applications with Vite, there's a testing framework that fits so naturally into your workflow that you might actually enjoy writing tests. That framework is Vitest.

In this tutorial, you’ll learn how to set up Vitest in a React project, write effective tests for your components and hooks, and understand the testing patterns that will help you build more reliable applications.

---

## What is Vitest and Why Should You Use It?

Vitest is a testing framework built on top of Vite. It uses Vite’s development server and plugin pipeline to transform and load files during testing. This means your tests use the same configuration and plugins as your app (for example, the React plugin, TypeScript support,and so on), so you don’t need a separate build or compile step.

Vitest runs tests in parallel across worker threads for maximum speed, and it automatically enables an instant “watch” mode (similar to Vite’s HMR) that reruns only the tests related to changed files. Vitest also has first-class support for modern JavaScript out of the box: it handles ESM, TypeScript, and JSX natively via Vite’s transformer (powered by Oxc).

Because Vitest provides a Jest-compatible API, you can continue to use familiar testing libraries (for example, React Testing Library, jest-dom matchers, user-event, and so on) without extra setup.

In short, Vitest tightly integrates with your Vite-powered stack (or can even run standalone) and lets you plug in existing testing tools seamlessly.

Here is why Vitest has become popular in the React ecosystem:

- **Speed**: Vitest can run tests more than four times faster than Jest in many scenarios. This speed comes from Vite's fast Hot Module Replacement and efficient caching capabilities.
- **Zero configuration**: Unlike Jest, which required Babel integration, TSJest setup, and multiple dependencies, Vitest works out of the box. It reuses your existing Vite configuration, eliminating the need to configure a separate test pipeline.
- **Native TypeScript support**: Vitest handles TypeScript and JSX natively through ESBuild, with no additional configuration needed.
- **Modern JavaScript**: Vitest offers native support for ES modules out of the box, making it ideal for modern JavaScript stacks.
- **Familiar API**: If you know Jest, you already know most of Vitest. The API is intentionally compatible, making migration straightforward.

::: note Prerequisites

To follow along with this tutorial, you should have:

- Basic knowledge of React and JavaScript
- Understanding of React Hooks
- Node.js installed (version 14 or higher)
- A React project created with Vite (or you can create one as we go)

:::

---

## How to Set Up Vitest in Your React Project

Let's start by creating a new React project with Vite and setting up Vitest.

### Step 1: Create a React Project with Vite

If you don't have an existing project, create one with the following command:

```sh
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm i
```

This creates a React project with Vite as the build tool.

### Step 2: Install Vitest and Testing Dependencies

Install Vitest along with the React Testing Library and other necessary dependencies:

```sh
npm i --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Here's what each package does:

- **vitest**: The testing framework itself
- **@testing-library/react**: Provides utilities for testing React components
- **@testing-library/jest-dom**: Adds custom matchers for DOM assertions
- **@testing-library/user-event**: Simulates user interactions
- **jsdom**: Provides a DOM environment for testing

### Step 3: Configure Vitest

Create a <VPIcon icon="fa-brands fa-js"/>`vitest.config.js` file in your project root:

```js title="vitest.config.js"
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
```

Setting `globals: true` exposes the `describe` and `it` functions on the global object, so you don't need to import them in every test file. The `environment: 'jsdom'` setting tells Vitest to use jsdom for simulating a browser environment.

### Step 4: Create the Test Setup File

Create a file at <VPIcon icon="fas fa-folder-open"/>`src/test/`<VPIcon icon="fa-brands fa-js"/>`setup.js`:

```js title="test/setup.js"
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

afterEach(() => {
  cleanup();
});
```

The `cleanup()` function runs after each test to clean up the DOM, ensuring tests don't interfere with each other.

### Step 5: Add Test Scripts

Add the following script to your <VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="package.json"
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest --coverage"
  }
}
```

Now you can run tests with `npm test`.

---

## How to Write Your First Test

Let's write a simple test to make sure everything is working. Create a file called <VPIcon icon="fa-brands fa-js"/>`sum.test.js` in your <VPIcon icon="fas fa-folder-open"/>`src` directory:

```js title="sum.test.js"
import { expect, test } from 'vitest';

function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Run `npm test` and you should see your test pass. A test in Vitest passes if it doesn't throw an error.

---

## How to Test React Components

Now let's test an actual React component. We'll start with a simple component and gradually build up to more complex scenarios.

### Testing a Simple Component

Create a component called <VPIcon icon="fa-brands fa-react"/>`Greeting.jsx`:

```jsx title="Greeting.jsx"
export function Greeting({ name }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to our application</p>
    </div>
  );
}
```

Now create a test file <VPIcon icon="fa-brands fa-react"/>`Greeting.test.jsx`:

```jsx title="Greeting.test.jsx"
import { render, screen } from '@testing-library/react';
import { Greeting } from './Greeting';

describe('Greeting Component', () => {
  it('should render the greeting with the provided name', () => {
    render(<Greeting name="Alice" />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Hello, Alice!');
  });

  it('should render the welcome message', () => {
    render(<Greeting name="Bob" />);

    const paragraph = screen.getByText('Welcome to our application');
    expect(paragraph).toBeInTheDocument();
  });
});
```

The `describe` function groups related tests into a single describe block. Each `it` function contains one test case.

The `render` function from React Testing Library renders your component in a test environment. The `screen` object provides query methods to find elements in the rendered output.

### Understanding Query Functions

React Testing Library provides three types of query functions: `get`, `query`, and `find`.

#### `getBy` queries

Throw an error if the element isn't found. Use these when you expect the element to be present.

```js
const button = screen.getByRole('button', { name: /click me/i });
```

#### `queryBy` queries

Return `null` if the element isn't found. Use these when you want to assert that an element doesn't exist.

```js
const errorMessage = screen.queryByText('Error');
expect(errorMessage).not.toBeInTheDocument();
```

#### `findBy` queries

Return a promise and wait for the element to appear. Use these for asynchronous operations.

```js
const loadedData = await screen.findByText('Data loaded');
```

### Testing a Counter Component

Let's test a more interactive component. Create <VPIcon icon="fa-brands fa-react"/>`Counter.jsx`:

```jsx title="Counter.jsx"
import { useState } from 'react';

export function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

Create the test file <VPIcon icon="fa-brands fa-react"/>`Counter.test.jsx`:

```jsx :collapsed-lines title="Counter.test.jsx"
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

describe('Counter Component', () => {
  it('should render with initial count of 0', () => {
    render(<Counter />);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('should render with custom initial count', () => {
    render(<Counter initialCount={5} />);

    expect(screen.getByText('Count: 5')).toBeInTheDocument();
  });

  it('should increment count when increment button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    const incrementButton = screen.getByRole('button', { name: /increment/i });
    await user.click(incrementButton);

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('should decrement count when decrement button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={5} />);

    const decrementButton = screen.getByRole('button', { name: /decrement/i });
    await user.click(decrementButton);

    expect(screen.getByText('Count: 4')).toBeInTheDocument();
  });

  it('should reset count to 0 when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<Counter initialCount={10} />);

    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
```

In these Counter tests, we first use `render(<Counter />)` to mount the component in a virtual DOM. We then query the output using Testing Library’s `screen` object. For example, `screen.getByText('Count: 0')` finds the element displaying the initial count of 0, and `expect(...).toBeInTheDocument()` asserts that it is present. The `getByText` query will throw an error if the text isn’t found, immediately failing the test.

For interactive tests, we create a `user` with `const user = userEvent.setup()` and then call `await user.click(...)` on the increment/decrement/reset buttons. The `userEvent.click` method simulates a real user click (dispatching the sequence of events a browser would fire). We locate buttons by their accessible role and name (for example, `getByRole('button', { name: /increment/i })`), following best practices for accessible queries.

After each click, we assert that the DOM updates accordingly (for example, the count text changes to “Count: 1”). Using `async/await` with `user.click` ensures the test waits for any state changes. In this way, each test checks the user-visible behavior: that clicking the Increment button increases the count, the Decrement button decreases it, and the Reset button sets it back to zero, without depending on the component’s internal implementation.

---

## How to Test User Interactions

User interactions are a critical part of testing React applications. The `@testing-library/user-event` library provides a more realistic simulation of user behaviour than simple event dispatching.

### Testing Form Inputs

Create a <VPIcon icon="fa-brands fa-react"/>`LoginForm.jsx` component:

```jsx title="LoginForm.jsx"
import { useState } from 'react';

export function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    setError('');
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Log In</button>
    </form>
  );
}
```

Create the test file <VPIcon icon="fa-brands fa-react"/>`LoginForm.test.jsx`:

```jsx :collapsed-lines title="LoginForm.test.jsx"
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm Component', () => {
  it('should render email and password inputs', () => {
    render(<LoginForm onSubmit={() => {}} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('should update input values when user types', async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={() => {}} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should show error when form is submitted empty', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    const submitButton = screen.getByRole('button', { name: /log in/i });
    await user.click(submitButton);

    expect(screen.getByRole('alert')).toHaveTextContent('Both fields are required');
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit with form data when valid', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /log in/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

The LoginForm tests similarly use `render` and `screen` to interact with the component. We use `screen.getByLabelText(/email/i)` and `screen.getByLabelText(/password/i)` to find the input fields by their associated labels, mimicking how users identify form fields.

To simulate typing, we use `await user.type(input, text)`, which sends real keyboard events to the input (via user-event). After typing, we assert the input’s value with `expect(input).toHaveValue(...)` (a custom matcher from jest-dom).

When submitting the form empty, clicking the **Log In** button triggers the form’s validation and displays an error message. We find this error by querying `getByRole('alert')` and check its text content. We also assert that the mock `onSubmit` handler was *not* called.

In the valid submission test, we fill both fields and click **Log In**; then `expect(mockSubmit).toHaveBeenCalledWith({...})` verifies the submit handler received the correct `{ email, password }` object.

These tests focus on user actions and outcomes: typing and clicking drive the form logic, and our assertions confirm the expected outputs (visible error text or the callback arguments).

---

## How to Test Custom Hooks

Custom hooks encapsulate reusable logic, and they need testing just like components. React Testing Library provides a `renderHook` function specifically for this purpose.

### Creating and Testing a Custom Hook

Create a custom hook <VPIcon icon="fa-brands fa-js"/>`useFetch.js`:

```js title="useFetch.js"
import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

Create the test file <VPIcon icon="fa-brands fa-js"/>`useFetch.test.js`:

```js :collapsed-lines title="useFetch.test.js"
import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from './useFetch';

describe('useFetch Hook', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return loading state initially', () => {
    global.fetch.mockImplementation(() => 
      Promise.resolve({
        ok: true,
        json: async () => ({ data: 'test' }),
      })
    );

    const { result } = renderHook(() => useFetch('https://api.example.com/data'));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
  });

  it('should return data when fetch succeeds', async () => {
    const mockData = { id: 1, title: 'Test Post' };

    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: async () => mockData,
      })
    );

    const { result } = renderHook(() => useFetch('https://api.example.com/posts/1'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('should return error when fetch fails', async () => {
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const { result } = renderHook(() => useFetch('https://api.example.com/posts/1'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('Network response was not ok');
  });
});
```

The `renderHook` function from React Testing Library renders custom hooks, and `waitFor` is used to wait for asynchronous state updates in the hook.

---

## How to Mock API Calls

When testing components that make API calls, you don't want to hit real endpoints. Mocking ensures your tests are fast, reliable, and don't depend on network conditions.

### Mocking with Vitest

Vitest doesn’t auto-mock modules like Jest does, so you need to manually mock them. Let's see how to mock an Axios call.

Create a <VPIcon icon="fa-brands fa-react"/>`PostsList.jsx` component:

```jsx title="PostsList.jsx"
import { useState, useEffect } from 'react';
import axios from 'axios';

export function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://api.example.com/posts');
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

Create the test file <VPIcon icon="fa-brands fa-react"/>`PostsList.test.jsx`:

```jsx title="PostsList.test.jsx"
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { PostsList } from './PostsList';

vi.mock('axios');

describe('PostsList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state initially', () => {
    axios.get.mockImplementation(() => new Promise(() => {}));
    render(<PostsList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display posts when API call succeeds', async () => {
    const mockPosts = [
      { id: 1, title: 'First Post' },
      { id: 2, title: 'Second Post' },
    ];

    axios.get.mockResolvedValue({ data: mockPosts });
    render(<PostsList />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });

  it('should display error when API call fails', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));
    render(<PostsList />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

In these tests, we verify specific UI states: the “loading” test checks that a loading indicator shows while data is being fetched, the “success” test confirms that post items render when the API returns data, and the “error” test makes sure an error message appears if the call fails.

We mock Axios by calling `vi.mock('axios')` and then using methods like `mockResolvedValue(...)` on `axios.get` to simulate a successful response (and `mockRejectedValue(...)` to simulate a failure). This kind of mocking isolates our tests from real network calls (making them fast and reliable) and lets us control exactly what data or error the hook receives.

We use `await waitFor(...)` to pause the test until those asynchronous updates complete before making assertions. Finally, we use `screen.getByText(...)` to find elements that should be present (it will throw an error if they’re missing) and `screen.queryByText(...)` to check that elements aren’t present (it returns null if the element is not in the DOM).

### Mocking Specific Module Functions

Sometimes you only want to mock specific functions while keeping the rest of a module's behaviour intact. Here's how to do that:

```js
vi.mock('date-fns', async () => {
  const original = await vi.importActual('date-fns');
  return {
    ...original,
    format: vi.fn(() => '2025-01-01'),
  };
});
```

In Vitest, you use `vi.importActual` to retain all original methods while mocking only the `format` method.

---

## Best Practices for Testing React Components

Now that you know how to write tests, let's talk about how to write good tests.

### Test User Behaviour, Not Implementation

Focus on testing what users see and do, not internal component details. If you refactor your component's implementation without changing its behaviour, your tests shouldn't break.

#### Bad test (testing implementation):

```js
it('should set isOpen state to true', () => {
  const { result } = renderHook(() => useState(false));
  // Testing internal state directly
});
```

#### Good test (testing behaviour):

```js
it('should show menu when button is clicked', async () => {
  const user = userEvent.setup();
  render(<Menu />);

  await user.click(screen.getByRole('button', { name: /menu/i }));
  expect(screen.getByRole('navigation')).toBeVisible();
});
```

### Use Accessible Queries

React Testing Library encourages you to query elements the way users do. Prefer queries that mirror user interaction:

1. `getByRole` (best for interactive elements)
2. `getByLabelText` (for form fields)
3. `getByPlaceholderText`
4. `getByText`
5. `getByTestId` (last resort)

### Keep Tests Simple and Focused

Each test should verify one thing. If your test needs a lot of setup or has many assertions, consider splitting it into multiple tests.

### Clean Up Between Tests

Use `afterEach` to clean up the DOM after each test run, ensuring tests don't interfere with each other. This is already handled if you followed the setup steps earlier.

### Use Descriptive Test Names

Test names should clearly describe what they're testing and what the expected outcome is.

Good test names:

```js
it('should display error message when form is submitted empty');
it('should call onSubmit with email and password when form is valid');
it('should disable submit button while request is pending');
```

### Mock External Dependencies

Always mock API calls, timers, and other external dependencies. Your tests should be isolated and not depend on network conditions or external services.

---

## Conclusion

Now, you have learned how to set up Vitest in a React project and write effective tests for components, user interactions, custom hooks, and API calls. Vitest provides a powerful and efficient way to test React applications, especially when combined with modern tools like Vite.

Testing is about building confidence in your code, documenting expected behaviour, and enabling safe refactoring. Vitest's speed makes testing feel less like a chore and more like a natural part of development.

Start small. Add tests for critical user flows. Test the components that change frequently. As you build the habit, you will find that tests actually make development faster, not slower. The code will still be there tomorrow. But the bugs you catch today won't be.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Test React Applications with Vitest",
  "desc": "Testing is one of those things that every developer knows they should do, but many put off until problems start appearing in production. If you’re building React applications with Vite, there's a testing framework that fits so naturally into your wor...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-test-react-applications-with-vitest.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
