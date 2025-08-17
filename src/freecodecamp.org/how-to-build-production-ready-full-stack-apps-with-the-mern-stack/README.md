---
lang: en-US
title: "How to Build Production-Ready Full Stack Apps with the MERN Stack"
description: "Article(s) > How to Build Production-Ready Full Stack Apps with the MERN Stack"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Express.js
  - Data Science
  - MongoDb
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
  - express
  - expressjs
  - express-js
  - data-science
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Production-Ready Full Stack Apps with the MERN Stack"
    - property: og:description
      content: "How to Build Production-Ready Full Stack Apps with the MERN Stack"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-production-ready-full-stack-apps-with-the-mern-stack/
prev: /programming/js-react/articles/README.md
date: 2025-07-07
isOriginal: false
author:
  - name: Mohit Menghnani
    url : https://freecodecamp.org/news/author/menghnani/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1751502709499/b43b3607-f01b-45c0-9797-75eef92497c6.png
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

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MongoDb > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Production-Ready Full Stack Apps with the MERN Stack"
  desc="As developers, we’re always looking for more efficient tools. The MERN stack (MongoDB, Express.js, React, and Node.js) stands out for its JavaScript-centric nature, offering a unified language across the entire application. In this guide, you'll buil..."
  url="https://freecodecamp.org/news/how-to-build-production-ready-full-stack-apps-with-the-mern-stack"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1751502709499/b43b3607-f01b-45c0-9797-75eef92497c6.png"/>

As developers, we’re always looking for more efficient tools. The MERN stack (MongoDB, Express.js, React, and Node.js) stands out for its JavaScript-centric nature, offering a unified language across the entire application.

In this guide, you'll build a complete Task Manager app with user authentication, protected routes, and full CRUD functionality, built with React on the frontend and Express/MongoDB on the backend.

This article will serve as your hands-on, code-first guide to building, securing, and deploying a MERN application, drawing from my own practical experience. Every section has code you can run, and I’ll give concise explanations along the way.

It doesn’t matter if you're just getting started with MERN or looking to level up your architecture and production deployment knowledge - this article is designed to get you from zero to production with confidence.

- [Project Setup: Laying the Groundwork](#heading-project-setup-laying-the-groundwork)
- [Testing: Ensuring Robustness](#heading-testing-ensuring-robustness)
- [How to Build the Task Manager](#heading-how-to-build-the-task-manager)
- [Deployment: From Localhost to Live](#heading-deployment-from-localhost-to-live)
- [Security Best Practices: Fortifying Your Application](#heading-security-best-practices-fortifying-your-application)
- [Monitoring and Logging with Winston and Morgan](#heading-monitoring-and-logging-with-winston-and-morgan)

::: note Prerequisites

Before jumping in the project, here’s what you’ll need to get the most out of this tutorial:

**Tools & Tech Stack**

You’ll be using the following technologies throughout the project:

- **Node.js & npm** - Backend runtime and package manager
- **Express.js** - Web framework for Node
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose** - ODM for MongoDB
- **React** - Frontend UI library
- **React Router** - For client-side routing
- **Axios** - For making API requests
- **Jest & Supertest** - For backend tests
- **React Testing Library & Cypress** - For Frontend unit and E2E tests
- **ESLint + Prettier** - For code formatting, linting
- **Husky** - To setup pre-commit hooks
- **Helmet, Joi, express-rate-limit, cors** - For security, validation, and best practices
- **PM2 & NGINX** - For backend deployment
- **Sentry** - For error monitoring

**Skills & Setup**

- Basic knowledge of JavaScript, React, and Node.js
- Familiarity with REST APIs and HTTP request/response flows
- Git and a GitHub account for version control
- A free MongoDB Atlas account
- Node.js and npm installed locally (Node 18+ recommended)

:::

---

## Project Setup: Laying the Groundwork

A well-structured project is crucial for maintainability. We'll adopt a clear separation between the front end and the back end here.

### Project Structure

This structure clearly separates the React front end (<FontIcon icon="fas fa-folder-open"/>`client/`) from the Node.js/Express.js back end (<FontIcon icon="fas fa-folder-open"/>`server/`), promoting modularity and easier management.

```plaintext title="file structure"
my-mern-app/                # Root folder
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js/Express.js backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── package.json
```

### Code Quality: Linting and Formatting

Consistency is key when you’re building a production-grad application like this one. We'll use ESLint with Airbnb style and Prettier for automated code quality and formatting.

To install these tools, run this in your terminal:

```sh
npm install --save-dev eslint prettier eslint-config-airbnb-base eslint-plugin-prettier
```

And here are some setups with their recommended configurations:

This configuration sets up ESLint for a Node.js project using the Airbnb and Prettier style guides, with custom rules to relax strict linting constraints like allowing `console.log` and disabling mandatory function names.

#### <FontIcon icon="fa-brands fa-js"/>`.eslintrc.js` (server-side example)

```js title=".eslintrc.js"
module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies": "off",
  },
};
```

#### <FontIcon icon="iconfont icon-json"/>`.prettierrc`

This config enforces consistent formatting: add semicolons, use trailing commas where valid, and prefer single quotes for strings.

```json title=".prettierrc"
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true
}
```

### Version Control: Git Essentials

Git is indispensable. You can use feature branches and pull requests for collaborative development, making it easier to work on large projects with coworkers. Consider using Husky for pre-commit hooks to enforce linting and testing.

#### Install Husky

Install Husky to easily manage Git hooks, allowing you to automate tasks like linting and testing before commits.

```sh
npm install husky --save-dev
```

#### package.json (add script)

This <FontIcon icon="iconfont icon-json"/>`package.json` file sets up a Node.js project named `my-mern-app`, and configures a `prepare` script to install Git hooks using Husky (v7). It's ready for adding pre-commit automation, such as linting or testing.

```json title="package.json"
{
  "name": "my-mern-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "prepare": "husky install"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "husky": "^7.0.0"
  }
}
```

#### Create a pre-commit hook

The below command sets up a pre-commit hook that automatically runs your tests and linter before each commit, ensuring code quality and preventing errors from entering your codebase.

```sh
npx husky add .husky/pre-commit "npm test && npm run lint"
```

---

## Testing: Ensuring Robustness

Automated testing is vital. We'll cover unit, integration, and end-to-end testing in this guide.

### Backend Testing (Node.js/Express.js)

You’ll use Jest for unit testing and Supertest for API integration tests.

#### Install them like this:

```sh
npm install --save-dev jest supertest
```

You’ll use Jest to write unit tests for your JavaScript code and Supertest to test HTTP requests against your Express.js API.

::: tip Example Test (<FontIcon icon="fas fa-folder-open"/>`server/tests/`<FontIcon icon="fa-brands fa-js"/>`auth.test.js`)

This test suite uses Supertest to simulate API calls for user registration and login, asserting that the responses have the expected status codes and properties.

```js :collapsed-lines title="server/tests/auth.test.js"
const request = require('supertest');
const app = require('../app'); // Your Express app instance
describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.headers['set-cookie']).toBeDefined();
  });
});
```

### Frontend Testing (React Testing Library + Cypress)

You’ll use Jest and the React Testing Library for unit/integration tests, and Cypress for E2E tests.

#### You can install these like this:

```sh
npm install --save-dev @testing-library/react @testing-library/jest-dom jest cypress
```

React Testing Library will help you test your React components, and Cypress will provide comprehensive end-to-end testing of your frontend application.

::: tip Example Component Test (<FontIcon icon="fas fa-folder-open"/>`client/src/components/`<FontIcon icon="fa-brands fa-js"/>`Button.test.js`):

This unit test uses the React Testing Library to render a Button component and verifies that the specified text content is present in the rendered output.

```js title="client/src/components/Button.test.js"
import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});
```

The following Cypress test simulates a complete user authentication flow, from registration to login and logout, asserting expected URL changes and page content.

```js title="cypress/e2e/auth.cy.js"
// Example E2E Test
describe('Authentication Flow', () => {
  it('should allow a user to register and login', () => {
    cy.visit('/register');
    cy.get('input[name="username"]').type('e2euser');
    cy.get('input[name="email"]').type('e2e@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, e2euser');
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type('e2e@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
```

---

## How to Build the Task Manager

We'll build a simple Task Manager with user authentication and CRUD operations for tasks so you can see how the whole thing comes together.

### Backend Implementation (Node.js/Express.js)

#### Dependencies

Start by installing our core backend libraries: Express for routing, Mongoose for MongoDB interactions, dotenv for environment variables, bcrypt/jsonwebtoken/cookie-parser for secure authentication, and helmet for setting secure HTTP headers:

```sh
npm install express mongoose dotenv bcryptjs jsonwebtoken cookie-parser
```

#### <FontIcon icon="fas fa-folder-open"/>`server/`<FontIcon icon="fa-brands fa-js"/>`app.js` (Entry Point)

Next, we’ll set up the first or the main entry point for the backend. This is the main Express.js application file, which configures middleware, establishes a MongoDB connection, and sets up API routes for authentication and task management.

```js title="server/app.js"
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('MERN Task Manager API is running!');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### <FontIcon icon="fas fa-folder-open"/>`server/`<FontIcon icon="fas fa-file-lines"/>`.env`

To avoid hardcoding secrets, we’ll add a <FontIcon icon="fas fa-file-lines"/>`.env` file where we can securely store environment variables, such as our database URI and JWT secret. This file stores sensitive environment variables such as your MongoDB connection string, server port, and JWT secret, keeping them secure and separate from your codebase.

```sh title="server/.env"
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
JWT_SECRET=supersecretjwtkey
```

#### <FontIcon icon="fas fa-folder-open"/>`server/models/`<FontIcon icon="fa-brands fa-js"/>`User.js`

Now, let’s define our User model using MongoDB. This schema includes fields for username, email, and password, with pre-save hooks for password hashing and a method for password comparison.

```js :collapsed-lines title="server/models/User.js"
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
```

#### <FontIcon icon="fas fa-folder-open"/>`server/models/`<FontIcon icon="fa-brands fa-js"/>`Task.js`

Next, we’ll create the Task model. This schema defines the Task model, which links each task to a user and includes fields for title, description, completion status, and creation timestamp.

```js title="server/models/Task.js"
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
```

#### <FontIcon icon="fas fa-folder-open"/>`server/controllers/`<FontIcon icon="fa-brands fa-js"/>`authController.js`

Let’s build out the authentication controller. This controller handles user authentication flows, including registration, login, logout, and fetching user profiles, using JWTs and secure HTTP-only cookies.

```js :coillapsed-lines title="server/controllers/authController.js"
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ username, email, password });
    if (user) {
      const token = generateToken(user._id);
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });
      res.status(201).json({ id: user.id, username: user.username, email: user.email });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });
      res.json({ id: user.id, username: user.username, email: user.email });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logoutUser = (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### <FontIcon icon="fas fa-folder-open"/>`server/controllers/`<FontIcon icon="fa-brands fa-js"/>`taskController.js`

Now it’s time to implement the task controller. This controller provides the logic for fetching, creating, updating, and deleting tasks, ensuring that users can only interact with their tasks.

```js :collapsed-lines title="server/controllers/taskController.js"
const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Please add a title' });
  try {
    const task = await Task.create({ title, description, user: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

    await Task.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

#### <FontIcon icon="fas fa-folder-open"/>`server/middleware/`<FontIcon icon="fa-brands fa-js"/>`authMiddleware.js`

To protect private routes**,** we will create a middleware that verifies the JWT from the request's cookies, ensuring that only authenticated users can access specific endpoints.

```js title="server/middleware/authMiddleware.js"
const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.protect = async (req, res, next) => {
  let token;
  if (req.cookies.token) {
    try {
      token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
```

#### <FontIcon icon="fas fa-folder-open"/>`server/middleware/`<FontIcon icon="fa-brands fa-js"/>`errorMiddleware.js`

To handle errors cleanly across our backend, we’ll add global error-handling middleware that can handle 404 Not Found errors and provide a centralized error-handling mechanism for consistent API error responses.

```js title="server/middleware/errorMiddleware.js"
exports.notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
```

#### <FontIcon icon="fas fa-folder-open"/>`server/routes/`<FontIcon icon="fa-brands fa-js"/>`authRoutes.js`

Next, let’s define our authentication routes. These endpoints enable user authentication and map HTTP methods to their corresponding controller functions.

```js title="server/routes/authRoutes.js"
const express = require('express');
const { registerUser, loginUser, logoutUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
```

#### <FontIcon icon="fas fa-folder-open"/>`server/routes/`<FontIcon icon="fa-brands fa-js"/>`taskRoutes.js`

Now we’ll add the routes for task operations. This file defines the API routes for task management, applying the protect middleware to secure all task-related operations.

```js title="server/routes/taskRoutes.js"
const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
router.route('/').get(protect, getTasks).post(protect, createTask);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
```

### Frontend Implementation (React)

#### Dependencies

Now, you’ll need to initialize a new React project and install your essential libraries: Axios for HTTP requests, React Router for navigation, and React Toastify for displaying notifications.

```sh
npm install axios react-router-dom react-toastify
```

#### <FontIcon icon="fas fa-folder-open"/>`client/src/`<FontIcon icon="fa-brands fa-js"/>`index.js`

Let’s start the frontend by setting up the entry point. Here we are rendering the main App component and wrapping it with AuthProvider to provide authentication context globally.

```jsx title="client/src/index.js"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

#### <FontIcon icon="fas fa-folder-open"/>`client/src/`<FontIcon icon="fa-brands fa-js"/>`App.js`

Next, we’ll define our main App component. This sets up the client-side routing for the application, and defines public and private routes, and includes a navigation bar and toast notification system.

```jsx title="client/src/App.js"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <div className="container">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/" element={<h1>Welcome to Task Manager!</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

#### <FontIcon icon="fas fa-folder-open"/>`client/src/context/`<FontIcon icon="fa-brands fa-js"/>`AuthContext.js`

We’ll create an authentication context that manages the global authentication state. It provides functions for user login, registration, and logout, and automatically loads user data on component mount.

```jsx title="client/src/context/AuthContext.js"
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get('/api/auth/profile');
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setUser(res.data);
      return true;
    } catch (err) {
      console.error(err.response.data.message);
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { username, email, password });
      setUser(res.data);
      return true;
    } catch (err) {
      console.error(err.response.data.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/auth/logout');
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;
```

#### <FontIcon icon="fas fa-folder-open"/>`client/src/components/`<FontIcon icon="fa-brands fa-js"/>`Navbar.js`

Here’s a dynamic navigation bar component that dynamically displays links based on the user's authentication status, showing either login/register options or a welcome message and logout button.

```jsx :collapsed-lines title="client/src/components/Navbar.js"
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <h1>Task Manager</h1>
      <div>
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button onClick={logout}>Logout</button>
            <Link to="/dashboard">Dashboard</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
```

#### <FontIcon icon="fas fa-folder-open"/>`client/src/components/`<FontIcon icon="fa-brands fa-js"/>`PrivateRoute.js`

To protect certain pages, we can create a Private Route component. This will be a guard for private routes, ensuring that only authenticated users can access them and redirecting unauthenticated users to the login page.

```js title="client/src/components/PrivateRoute.js"
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
```

#### <FontIcon icon="fas fa-folder-open"/>`client/src/pages/`<FontIcon icon="fa-brands fa-js"/>`Register.js`

Now, let’s create the Register component, which provides a user registration form, handles input state and form submission, and displays success or error messages using toast notifications.

```js :collapsed-lines title="client/src/pages/Register.js"
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(username, email, password);
    if (success) {
      toast.success('Registration successful!');
      navigate('/dashboard');
    } else {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
```

#### <FontIcon icon="fas fa-folder-open"/>`client/src/pages/`<FontIcon icon="fa-brands fa-js"/>`Login.js`

Now, for the login form, it works similarly to the register page but logs users into the system instead. This page manages input fields, handles form submissions, and provides feedback via toast notifications.

```jsx :collapsed-lines title="client/src/pages/Login.js"
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error('Login failed. Invalid credentials.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
```

#### <FontIcon icon="fas fa-folder-open"/>`client/src/pages/`<FontIcon icon="fa-brands fa-js"/>`Dashboard.js`

Finally, we’ll build the Dashboard page. This dashboard component displays a user's tasks, allowing them to create new tasks, mark tasks as complete or incomplete, and delete tasks, with real-time updates.

```jsx :collapsed-lines title="client/src/pages/Dashboard.js"
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      toast.error('Failed to fetch tasks.');
      console.error(err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', { title: newTaskTitle, description: newTaskDescription });
      setNewTaskTitle('');
      setNewTaskDescription('');
      toast.success('Task created successfully!');
      fetchTasks();
    } catch (err) {
      toast.error('Failed to create task.');
      console.error(err);
    }
  };

  const handleUpdateTask = async (id, completed) => {
    try {
      await axios.put(`/api/tasks/${id}`, { completed });
      toast.success('Task updated successfully!');
      fetchTasks();
    } catch (err) {
      toast.error('Failed to update task.');
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      toast.success('Task deleted successfully!');
      fetchTasks();
    } catch (err) {
      toast.error('Failed to delete task.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Welcome, {user ? user.username : 'Guest'}!</h2>
      <h3>Your Tasks</h3>
      <form onSubmit={handleCreateTask}>
        <input
          type="text"
          placeholder="New Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}: {task.description}
            </span>
            <button onClick={() => handleUpdateTask(task._id, !task.completed)}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
```

---

## Deployment: From Localhost to Live

Deploying a MERN stack application involves deploying the backend API and the frontend React application separately.

Let’s talk about why we do it separately. As you have seen from above, in a MERN stack app, the frontend and backend are separate by design. React handles the UI, while Express and Node handle server logic and API calls. Because they serve different roles, you'll need to deploy them separately.

The backend runs on a Node.js compatible server, which connects to a database such as MongoDB Atlas. The frontend, once it is built, becomes static files that can be hosted from anywhere, from NGINX to hosting platforms like Netlify or Vercel.

This separation provides you with flexibility and improved scalability. Let’s walk through how to deploy each part.

### Backend Deployment (Node.js/Express.js)

For backend deployment, platforms like Heroku, Render, or AWS EC2 are common choices. Here, I’ll outline a general approach for a cloud VM on AWS EC2

#### 1. Prepare for Production

To start, set the environment to `production` and install only the dependencies your app needs to run, optimizing your application's performance. Skipping devDependencies helps reduce its footprint.

```sh
export NODE_ENV=production
npm install --production
```

#### 2. Process Manager (PM2)

Next, we’ll set up a process manager to keep our backend server running reliably. PM2 is a popular tool that handles automatic restarts if your Node.js application crashes, manages multiple app instances, and also helps ensure high availability in production environments.

```sh
npm install -g pm2
pm2 start server/app.js --name mern-api
pm2 save
pm2 startup
```

#### 3. NGINX as a Reverse Proxy

Now that our backend is running with PM2, we need a way to handle incoming web traffic. That’s where NGINX comes in. We'll install NGINX to serve as a high-performance reverse proxy directing incoming web traffic to your Node.js backend and serving static frontend files.

```sh
sudo apt update
sudo apt install nginx
```

Once NGINX is installed, it’s time to configure it (<FontIcon icon="fas fa-folder-open"/>`/etc/nginx/sites-available/`<FontIcon icon="iconfont icon-nginx"/>`default` or a new config file). We’ll set it up to forward API requests to the backend and serve the React app, acting as the single entry point. You can update the default configuration file or create a new one:

```conf title="/etc/nginx/sites-available/default"
server {
    listen 80;
    server_name your_domain_or_ip;

    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/my-mern-app/client/build; # Path to your React build folder
        try_files $uri /index.html;
    }
}
```

With the NGINX configuration created, we’ll enable it and restart the service to apply the changes, making your application go live:

```sh
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

#### 4. HTTPS with Certbot (Let's Encrypt)

To secure your app with HTTPS, we can install Certbot and use it to automatically obtain and configure a free SSL/TLS certificate from Let’s Encrypt, enabling secure HTTPS connections for your domain.

```sh
sudo snap install --classic certbot
sudo certbot --nginx -d your_domain_or_ip
```

### Frontend Deployment (React)

With the backend deployed, let’s move to the frontend. For the React frontend, we’ll build the application and serve the static files via NGINX (as shown above) or a dedicated static site hosted on platforms like Netlify, Vercel, or AWS S3 + CloudFront.

#### Build the React App

This command compiles and optimizes your React application into a build folder containing static assets, ready for efficient deployment to any web server or static hosting service.

```sh
cd client
npm run build
```

### Database Deployment (MongoDB Atlas)

For production, we’ll use a managed MongoDB service like MongoDB Atlas. It handles replication, sharding, and backups, simplifying database management significantly.

#### Create a Cluster on MongoDB Atlas

- Sign up/Log in to MongoDB Atlas.
- Create a new cluster (choose a cloud provider and region).
- Set up a database user with appropriate permissions.
- Configure network access (allow connections from your server's IP address).
- Get your connection string and update MONGO_URI in your server/.env file.

#### 1. <FontIcon icon="fas fa-file-lines"/>`.env` Configuration Example

After creating the cluster and user in MongoDB Atlas, you’ll receive a connection string. You need to update your <FontIcon icon="fas fa-file-lines"/>`.env` file with it

```sh title="server/.env"
JWT_SECRET=your_secret_jwt_key
```

#### 2. Connect to MongoDB in <FontIcon icon="fa-brands fa-js"/>`app.js`

Next, in the <FontIcon icon="fas fa-folder-open"/>`server/`<FontIcon icon="fa-brands fa-js"/>`app.js` file, make sure you're using the connection string from the environment variable:

```js title="server/app.js"
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('Connection error:', err));
```

### Other Deployment Options

While this article drives you through manual deployment with EC2 and NGINX, other platforms can simplify the process:

- **Render**, **Railway**, and **Heroku** offer easy full-stack deployment with GitHub integration.
- **Vercel** and **Netlify** are ideal for hosting the React frontend.
- You may consider using **Docker** to maintain consistent environments across development and production.
- For CI/CD, Linting, Testing, & Deployment can be automated on every push using tools like **GitHub Actions**

There is no right or wrong choice here. Select the setup that best suits your project’s scale, team experience, and desired level of control.

---

## Security Best Practices: Fortifying Your Application

Security is paramount. You can implement these best practices to protect your MERN application.

### Setup Input Validation and Sanitization

Always validate and sanitize input on the server side. You can use libraries like Joi or Zod to make this process easier.

#### Example with Joi

To validate and sanitize incoming data on the server, we will utilize Joi, a powerful library for defining schemas and enforcing input rules.

```sh
npm install joi
```

Now that we’ve installed Joi, we will use it to define strict validation rules for user registration and login inputs. This ensures data quality and prevents common injection attacks.

```js title="server/validators/authValidator.js"
const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
```

Next, we’ll integrate these schemas directly into our authentication controller to automatically validate incoming request bodies against predefined schemas.

```js title="server/controllers/authController.js"
const { registerSchema, loginSchema } = require('../validators/authValidator');

exports.registerUser = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  // ... rest of the registration logic
};

exports.loginUser = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  // ... rest of the login logic
};
```

### Add Authentication and Authorization

You can use JWTs for authentication and implement middleware for protected routes.

#### JWT Implementation (covered in authController.js and authMiddleware.js above)

::: important Key aspects:

- HttpOnly Cookies: Store JWTs in HttpOnly cookies to prevent client-side JavaScript access, mitigating XSS attacks.
- Secure Flag: Use secure: true in production to ensure cookies are only sent over HTTPS.

:::

These practices ensure that authentication tokens are securely transmitted and stored, protecting against common web vulnerabilities like Cross-Site Scripting (XSS).

### Implement Rate Limiting

To protect our API from abuse and malicious intent, we will implement basic rate limiting. This helps protect against brute-force login attempts and DDoS attacks.

#### Installation

We will install express-rate-limit package for it

```sh
npm install express-rate-limit
```

#### <FontIcon icon="fas fa-folder-open"/>`server/`<FontIcon icon="fa-brands fa-js"/>`app.js` (snippet)

Once it is installed, let’s configure the rate limiter and apply it to all incoming requests. This ensures that no single IP can overwhelm your server with repeated calls. The following middleware limits each IP address to 200 requests within a 15-minute window.

```js title="server/app.js"
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

app.use(limiter); // Apply to all requests
```

### Setup CORS Configuration (Cross-Origin Resource Sharing)

Next, we move our focus to enable secure communication between your frontend and backend. By default, all browsers block cross-origin requests, so we need to configure CORS (Cross-Origin Resource Sharing) to permit the React app to communicate with the Express API.

#### Installation

```sh
npm install cors
```

#### <FontIcon icon="fas fa-folder-open"/>`server/`<FontIcon icon="fa-brands fa-js"/>`app.js` (snippet)

Once installed**,** we can configure CORS for our Express application, specifying allowed origins and enabling credential sharing for secure cross-origin requests. Remember to replace the origin with your actual production URL when deploying.

```js title="server/app.js"
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL in production
  credentials: true,
}));
```

### Use Environment Variables

To keep sensitive information secure and out of your codebase, we will use environment variables. This allows us to efficiently manage secrets, such as database connection strings and JWT keys, without hardcoding them or including them in the source code.

Create a <FontIcon icon="fas fa-file-lines"/>`.env` file in your <FontIcon icon="fas fa-folder-open"/>`server/` directory:

#### <FontIcon icon="fas fa-file-lines"/>`.env` (example)

This <FontIcon icon="fas fa-file-lines"/>`.env` file stores sensitive configuration details like database connection strings and API keys

```sh title=".env"
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

NODE_ENV=production
```

---

## Monitoring and Logging with Winston and Morgan

Once the application is live, it's critical to monitor the behavior and catch issues promptly. Monitoring and logging help you measure performance, find bugs, and keep a log of all server activity.

We’ll use Morgan for logging HTTP requests and Winston for more general-purpose application logging.

### Installation

We will install Morgan for logging HTTP requests and Winston for comprehensive and customizable application logging.

```sh
npm install morgan winston
```

### <FontIcon icon="fas fa-folder-open"/>`server/config/`<FontIcon icon="fa-brands fa-js"/>`logger.js`

Next, let’s configure Winston to handle our application logs. This will output logs to the console by default, with options to enable file-based logging for errors and general information.

```js title="server/config/logger.js"
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log', level: 'info' }),
  ],
});

module.exports = logger;
```

### <FontIcon icon="fas fa-folder-open"/>`server/`<FontIcon icon="fa-brands fa-js"/>`app.js` (snippet)

With Winston and Morgan set up, now let’s integrate them into our <FontIcon icon="fa-brands fa-js"/>`app.js` file. We’ll use Morgan for request logging during development and replace standard `console.log` calls with Winston logs for structured and configurable application logging.

```js title="server/app.js"
const morgan = require('morgan');
const logger = require('./config/logger');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Replace console.log with logger.info for database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info('MongoDB connected!'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Replace console.log in app.listen
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
```

### Frontend Error Monitoring (Sentry)

To monitor errors in the frontend, we’ll integrate Sentry. It’s a fantastic tool for tracking exceptions and performance issues in real time. It helps us capture and report client-side errors.

#### Installation

```sh
npm install @sentry/react @sentry/tracing
```

#### <FontIcon icon="fas fa-folder-open"/>`client/src/`<FontIcon icon="fa-brands fa-js"/>`index.js` (snippet)

After installation, let’s initialize Sentry in the React application so that it can automatically capture errors and performance data. We’ll add this to our <FontIcon icon="fa-brands fa-js"/>`index.js` file.

```js title="client/src/index.js"
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: "YOUR_SENTRY_DSN", // Replace with your Sentry DSN
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

And that’s it! Congratulations on building and deploying a full-stack MERN app.

---

## Conclusion

This article provided a code-first walkthrough of building, securing, and deploying a MERN stack application. By focusing on practical code examples and essential configurations, you now have a solid foundation for your MERN projects.

Remember, continuous learning and adaptation are key in the ever-evolving world of web development. Happy coding!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Production-Ready Full Stack Apps with the MERN Stack",
  "desc": "As developers, we’re always looking for more efficient tools. The MERN stack (MongoDB, Express.js, React, and Node.js) stands out for its JavaScript-centric nature, offering a unified language across the entire application. In this guide, you'll buil...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-production-ready-full-stack-apps-with-the-mern-stack.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
