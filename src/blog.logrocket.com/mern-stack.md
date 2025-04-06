---
lang: en-US
title: "What is the MERN stack? Overview with examples"
description: "Article(s) > What is the MERN stack? Overview with examples"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - MongoDB
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
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is the MERN stack? Overview with examples"
    - property: og:description
      content: "What is the MERN stack? Overview with examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/mern-stack.html
prev: /programming/js-react/articles/README.md
date: 2025-02-13
isOriginal: false
author:
  - name: Nefe Emadamerho-Atori
    url : https://blog.logrocket.com/author/nefejames/
cover: /assets/image/blog.logrocket.com/mern-stack/banner.jpeg
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
  "title": "MongoDB > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is the MERN stack? Overview with examples"
  desc="Discover how the MERN stack (MongoDB, Express.js, React, Node.js) enables developers to build dynamic, performant, modern websites and apps."
  url="https://blog.logrocket.com/mern-stack"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/mern-stack/banner.jpeg"/>

The MERN stack — **M**ongoDB, **E**xpress.js, **R**eact, and **N**ode.js — is a set of JavaScript tools that enable developers to build dynamic, performant, and modern websites and applications.

![MERN Stack: Overview With Examples](/assets/image/blog.logrocket.com/mern-stack/banner.jpeg)

These four technologies are among the most popular tools in the web development space. Companies like Databricks, AWS, Netflix, Shutterstock, and Meta use one or more of these tools for their websites and other digital platforms.

In this article, we’ll explore the MERN stack in detail, learn why it’s a favorite among developers, and compare it to alternative JavaScript stacks.

::: tip

If you’re more of a hands-on learner, check out our [**MERN stack tutorial**](/blog.logrocket.com/mern-stack-tutorial.md), which walks you through **[**building a CRUD app from scratch**](/blog.logrocket.com/mern-stack-tutorial.md#building-restful-apis-mern-stack)**.

:::

---

## What is the MERN stack?

The MERN stack is a JavaScript stack consisting of four technologies:

- [<FontIcon icon="iconfont icon-mongodb"/>**M**ongoDB](https://mongodb.com/) — A NoSQL-based document database that stores data in flexible, JSON-like BSON format, ideal for modern applications that need scalability and speed
- [<FontIcon icon="iconfont icon-express"/>**E**xpress.js](https://expressjs.com/) — A lightweight Node.js framework that simplifies backend development by handling routing, middleware, and API requests efficiently
- [<FontIcon icon="fa-brands fa-react"/>**R**eact](https://react.dev/) — A popular frontend library for building dynamic user interfaces, allowing developers to create fast, interactive, and reusable UI components
- [<FontIcon icon="fa-brands fa-node"/>**N**ode.js](https://nodejs.org/en) — A JavaScript runtime environment that enables server-side execution of JavaScript, allowing developers to build scalable backend services using a single programming language

![Components and architecture of the MERN stack](https://paper-attachments.dropboxusercontent.com/s_B5A9487B8E93C2D596818BB443FFECA3635AB7A655E8B0A316EC63944E48D7A3_1738373583500_1.+MERN+stack+architecture.png)

### React (frontend framework)

[<FontIcon icon="fas fa-globe"/>React](https://blog.logrocket.com/tag/react/) is a popular JavaScript framework for handling the frontend and user interface of websites and web apps. It was released on May 29, 2013, and has become one of the leading [**frontend solutions in web development**](/blog.logrocket.com/history-of-frontend-frameworks.md). It has also led to the creation of meta frameworks such as [**Next.js**](/blog.logrocket.com/next-js-vs-react-developer-experience.md), [**Remix**](/blog.logrocket.com/guide-to-remix-react-framework.md), and [**Preact**](https://blog.logrocket.com/introduction-to-preact-a-smaller-faster-react-alternative-ad5532eb6d79/), which all use React as their foundation.
<!-- TODO: /blog.logrocket.com/introduction-to-preact-a-smaller-faster-react-alternative.md -->

The [<FontIcon icon="fa-brands fa-stack-overflow"/>2024 Stack Overflow developer survey](https://survey.stackoverflow.co/2024/technology#1-web-frameworks-and-technologies) ranks React as the second most popular web framework, while the [<FontIcon icon="fas fa-globe"/>State of JavaScript 2024](https://2024.stateofjs.com/en-US/libraries/front-end-frameworks/#front_end_frameworks_ratios) places it as the most-used web framework.

React is used by various top brands, including Dropbox, Yahoo, Airbnb, and Netflix. A major reason for React’s wide and continued adoption is the features it provides. The latest version of React, [**React 19**](/blog.logrocket.com/how-react-19-can-help-you-make-faster-websites.md), includes the following features:

1. **[`useOptimistic`](/blog.logrocket.com/understanding-optimistic-ui-react-useoptimistic-hook.md) hook** — Allows for optimistic UI updates that automatically revert if an operation fails
2. **`useActionState` hook** — Simplifies form submissions and actions by automating state updates and error management with a single hook
3. **[`useFormStatus**`](/blog.logrocket.com/understanding-react-useformstate-useformstatus-hooks.md) hook** — Gives you real-time insight into a form’s status from the last submission
4. **[Server components](/blog.logrocket.com/react-server-components-comprehensive-guide.md)** — Allows components to be pre-rendered on the server for efficiency and [**optimized performance**](/blog.logrocket.com/optimizing-performance-react-app.md)
5. **[Document metadata](/blog.logrocket.com/guide-react-19-new-document-metadata-feature/) support** — Allows you to define and manage SEO metadata within components

### MongoDB (database management)

[<FontIcon icon="iconfont icon-mongodb"/>MongoDB](https://mongodb.com/) is an open-source [**NoSQL**](/blog.logrocket.com/nosql-wide-column-stores-guide.md) document database. Since it release in 2009, MongoDB has become the [<FontIcon icon="fa-brands fa-stack-overflow"/>most popular NoSQL database](https://survey.stackoverflow.co/2024/technology#most-popular-technologies).

Companies like L’Oréal, Adobe, Delivery Hero, and Forbes use MongoDB to meet their data storage needs.

While it has several applications, MongoDB is mainly used to store structured, semi-structured, and unstructured data. Its [<FontIcon icon="iconfont icon-mongodb"/>features](https://mongodb.com/resources/products/capabilities/features) include:

- **Document model** — A document-oriented structure that allows for flexible schema designs
- **Sharding** — Helps with horizontal scalability by distributing large datasets across multiple servers. Sharding improves query performance and load management for large-scale applications
- **Database triggers** — Code that runs when an event occurs in the database.
- **Indexing** — MongoDB’s indexing capabilities enhance query performance by allowing efficient data retrieval without scanning each document

MongoDB stores data in a JSON-like format called BSON (Binary JSON). This format allows for nested objects, arrays, and flexible data types, making it ideal for handling complex data in modern applications.

Here’s a sample of employee data in BSON format:

```js
{
  "_id": ObjectId("650d2b7e8c9b3f001e3f4a2d"),
  "name": "John Doe",
  "age": 30,
  "position": "Software Engineer",
  "hire_date": "2022-06-15",
  "skills": ["JavaScript", "React", "Node.js"],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001"
  },
  "is_active": true
}
```

### Node.js (runtime environment)

[<FontIcon icon="fas fa-globe"/>Node.js](https://blog.logrocket.com/tag/node/) is an open-source runtime environment that runs on various platforms, including Windows, Unix, Mac OS X, Linux, etc. Created in May 2009, Node.js has become the most popular web framework out there, according to [<FontIcon icon="fas fa-globe"/>Statista](https://statista.com/statistics/1124699/worldwide-developer-survey-most-used-frameworks-web/) and [<FontIcon icon="fas fa-globe"/>Stack Overflow](https://survey.stackoverflow.co/2024/technology#1-web-frameworks-and-technologies).

Node.js enables developers to execute JavaScript outside the browser. This is a game-changer because, before Node.js, JavaScript was mostly limited to web pages. With Node.js, you can use JavaScript for server-side scripting, file system operations, and even building full-fledged applications.

Common use cases for Node.js include creating [**microservices**](/blog.logrocket.com/building-microservices-node-js.md), [**real-time apps**](/blog.logrocket.com/building-real-time-location-app-node-js-socket-io.md), and collaborative tools. You can also use Node.js to build backend services, [**RESTful APIs**](/blog.logrocket.com/build-rest-api-node-express-mysq.md), and [**GraphQL**](/blog.logrocket.com/graphql-vs-rest-api-why-you-shouldnt-use-graphql.md) servers.

Node.js powers applications for companies like WhatsApp, Slack, LinkedIn, and GitLab. Its features include:

- **Asynchronous and event-driven** — Node.js is designed to manage various operations simultaneously. This makes it great for applications that need to process multiple requests, like chat apps or real-time updates
- **Single-threaded with scalability** — Though it is [**single-threaded**](/blog.logrocket.com/complete-guide-threads-node-js.md), Node.js handles numerous simultaneous connections through its event loop and [**worker threads**](/blog.logrocket.com/multithreading-node-js-worker-threads.md)
- **NPM (Node Package Manager)** — Node.js includes npm, a vast library of [<FontIcon icon="fa-brands fa-node"/>over 2.1 million JavaScript packages](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager) developers can integrate into their projects
- **Built on the V8 JavaScript engine** — Node.js operates on the fast [**V8 engine**](/blog.logrocket.com/how-javascript-works-optimizing-the-v8-compiler-for-efficiency.md), which provides high performance by compiling JavaScript directly into native machine code
- **Universal JavaScript** — Node.js supports universal JavaScript, which allows you to use JavaScript code on both the server and the client

### Express (backend framework)

[**Express.js**](/blog.logrocket.com/express-js-adoption-guide.md) is an open-source, lightweight Node.js framework for creating backend apps. Released in 2010, Express has emerged as the most popular Node.js framework among other alternatives like [**Nest**](/blog.logrocket.com/nestjs-vs-express-js.md) and [**Koa**](/blog.logrocket.com/first-steps-with-koa-js.md).

What’s the point of using a framework like Express.js instad of just using Node.js? While Node.js allows you to run JavaScript outside the browser and handle web servers, it doesn’t have built-in tools to manage things like routing or request handling efficiently. That’s where Express comes in.

Instead of writing repetitive code to handle requests, routes, and responses, Express simplifies the process with a minimal and flexible API. It also supports [**middleware**](/blog.logrocket.com/express-middleware-a-complete-guide.md), which allows you to add features such as [**authentication**](/blog.logrocket.com/node-js-server-side-authentication-tokens-vs-jwt.md), logging, and error handling without cluttering your core application logic.

Let’s consider the example of a login form to see just how much Express.js improves backed code. Here’s the login form’s logic written in Node.js:

```js :collapsed-lines
const http = require('http'); // Import the built-in HTTP module
const querystring = require('querystring'); // Import module to parse form data

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/login') {
    let body = '';

    // Collect incoming data chunks
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Once all data is received, process it
    req.on('end', () => {
      const { username, password } = querystring.parse(body); // Parse form data

      // Simple authentication check (Replace this with database logic)
      if (username === 'admin' && password === 'password123') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Login successful');
      } else {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Invalid credentials');
      }
    });
  } else {
    // Handle other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Start the server on port 3000
server.listen(3000, () => console.log('Server running on http://localhost:3000'));
```

Now, here’s the Express.js version, which is shorter and easier to write and read:

```js
const express = require('express'); // Import Express framework
const bodyParser = require('body-parser'); // Middleware to parse request body

const app = express();

// Middleware to parse form data (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Define a login route
app.post('/login', (req, res) => {
  const { username, password } = req.body; // Extract username and password from request

  // Simple authentication check (Replace this with database logic)
  if (username === 'admin' && password === 'password123') {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Start the Express server on port 3000
app.listen(3000, () => console.log('Express server running on http://localhost:3000'));
```

So, while you *could* build everything from scratch with just Node.js, Express saves time, improves code organization, and helps you build scalable applications faster. This is why companies like ChatGPT, Substack, Salesforce, and Codesandbox use Express.js for their applications.

---

## Frontend, backend, and database integration

We’ve learned about the components in the MERN stack and what they do. Now, let’s understand how they work together by considering a real-life web development scenario: a user signing up for an application.

Each technology in the MERN stack plays a specific role in this process:

- React handles the user interface, collect the user input, and send it to the backend
- Express manages the API routes and process requests between the client and the server
- Node runs the server and handle the authentication logic
- MongoDB stores the user information securely

### MERN stack signup flow

#### Step 1: React collects user input

The user fills a signup form with their name, email, and password. There are various ways to capture the user’s input, including the `useState` hook, [**Context API**](/blog.logrocket.com/react-context-tutorial.md), or third-party [**state management solutions**](/blog.logrocket.com/guide-choosing-right-react-state-management-solution.md).

When they click “Sign up,” React sends this data to the backend via a POST request.

#### Step 2: Express.js and Node.js handles the request

Express.js receives the POST request from React, processes it, and parses the incoming JSON data. [**Middleware**](/blog.logrocket.com/express-middleware-a-complete-guide.md) like `express.json()` (built-in in Express 4.16+) or `body-parser` helps handle request bodies.

The backend code validates the data, checks whether the email is already in use, and sanitizes the input. You can use `express-validator` or custom validation logic.

If everything is correct, it [**hashes the password**](/blog.logrocket.com/password-hashing-node-js-bcrypt.md) for security using the `bcrypt` library or similar tools and sends it to MongoDB. If there are errors, the server responds with an error message.

#### Step 3: MongoDB stores the data

MongoDB stores the user’s details, including the hashed password, in a “users” collection. You can use [<FontIcon icon="fas fa-globe"/>Mongoose](https://mongoosejs.com/), a popular ODM library, to define a schema for the user data and ensure the required fields, such as email and password, are always present.

Once the user data is stored, the backend sends a “success” response.

#### Step 4: Response sent to React

If the signup is successful, Express sends a response to React, confirming account creation. React then updates the UI and redirects the user to their dashboard.

There’s so much more that goes into a signup flow, but this example gives you an idea of how the MERN stack can help you achieve such a flow.

---

## Use cases of the MERN stack

There’s no limit to what you can build with the MERN stack — except maybe a time machine. Common applications include:

- **Product management tools** — For the frontend, you can create the drag-and-drop effect seen on tools like Trello and Asana with third-party libraries such as [**React DnD**](/blog.logrocket.com/drag-and-drop-react-dnd.md). Express.js and Node.js handles the API requests for collaboration features, while MongoDB stores project data, user roles and data, and task progress. *[**Learn how to build a Trello Clone from scratch**](/blog.logrocket.com/building-trello-clone-react-dnd.md)*.
- **Real-time chat apps** — React handles the Chat UI on the frontend. You can use Node.js and Socket.IO for real-time communication, while Express.js manages authentication and MongoDB stores chat history and user data. _[**Learn how to implement WebSockets with Node.js and React**](/blog.logrocket.com/websocket-tutorial-real-time-node-react.md) and [**how to build a real-time chat app**](/blog.logrocket.com/remix-supabase-real-time-chat-app.md)_.
- **Ecommerce marketplaces** — React ensures users get a fast and interactive shopping experience; Express.js and Node.js manage payments and authentication, while MongoDB stores product catalogs, user orders, and payments. _[**Learn how to build a high-performance ecommerce website**](/blog.logrocket.com/building-high-performance-ecommerce-sites-astro.md)_.

---

## Real-world MERN stack success stories

### Expedia

Here’s how [<FontIcon icon="iconfont icon-mongodb"/>Expedia](https://mongodb.com/solutions/customer-case-studies/expedia) uses the MERN stack to deliver personalized travel recommendations:

- MongoDB: Manages travel data, user preferences, and booking information, ensuring travelers get tailored recommendations
- Node.js and Express.js handle different backend operations. They provide real-time pricing updates and ensure fast and secure [**API**](/blog.logrocket.com/build-rest-api-node-express-mysql.md) communication between Expedia’s booking system and external travel providers
- React handles all frontend aspects, including enabling a seamless, interactive search experience

### Sega

[<FontIcon icon="iconfont icon-mongodb"/>Sega](https://mongodb.com/solutions/customer-case-studies/sega) uses the MERN stack to personalize gaming experiences:

- MongoDB handles dynamic gaming data, enabling Sega to enhance player engagement by providing real-time, personalized stats that users can track and share
- Node.js and Express.js enable instant updates for player achievements and leaderboards and ensure smooth data flow between game servers and the database
- React creates an interactive, data-driven UI, allowing players to see their stats in real time

### Verizon

[<FontIcon icon="iconfont icon-mongodb"/>Verizon](https://mongodb.com/solutions/customer-case-studies/verizon) uses the MERN stack to power 5G and IoT data:

- With the rise of 5G and IoT, Verizon needed a robust data pipeline to handle billions of data points from connected devices. MongoDB became the core of their real-time data storage and processing
- Node.js and Express.js support millions of simultaneous device connections, ensuring Verizon can scale its 5G infrastructure without bottlenecks
- React delivers real-time analytics [**dashboards**](/blog.logrocket.com/build-react-dashboard-tremor.md) where customers can monitor their data usage

### Coinbase

[<FontIcon icon="iconfont icon-mongodb"/>Coinbase](https://mongodb.com/solutions/customer-case-studies/coinbase?tck=customer) uses the MERN stack to scale cryptocurrency trading:

- To handle unpredictable trading surges, Coinbase turned to [<FontIcon icon="fas fa-globe"/>MongoDB](https://coinbase.com/blog/how-we-do-mongodb-migrations-at-coinbase) for its scalable, flexible database
- They use Node.js and Express.js to keep API calls secure and optimized, process real-time buy/sell orders, and prevent delays in price updates and order execution
- React powers the interactive trading dashboard, giving users up-to-the-second market data.

### eBay

[<FontIcon icon="iconfont icon-mongodb"/>eBay](https://mongodb.com/blog/post/ebay-building-mission-critical-multi-data-center-applications-with-mongodb) uses the MERN stack to handle high-volume transactions:

- MongoDB acts as their scalable database that powers mission-critical, multi-user applications. This helps them manage millions of daily transactions.
- Node.js ensures fast API responses, allowing users to browse, bid, and make purchases in real-time.
- React.js provides a smooth, responsive UI, making it easier for buyers and sellers to navigate listings.
- Express.js streamlines API communication between MongoDB and the frontend, keeping everything running efficiently.

---

## Advantages of the MERN stack

Benefits of working with the MERN stack include:

- **Full-stack JavaScript development** — The MERN stack allows developers to use a single language — JavaScript — across the frontend and backend of an application. This consistency means developers don’t need to switch between different languages, improving productivity
- **Component-based development with React** — Instead of rewriting code for the same UI elements, React allows you to build [**reusable components**](/blog.logrocket.com/building-reusable-ui-components-with-react-hooks.md) that manage their own state, styling, and logic. This helps keep your code DRY and organized
- **Efficient JSON data exchange** — MongoDB stores data in a JSON-like BSON format, making it a natural fit for JavaScript applications. This simplifies [**API**](/blog.logrocket.com/modern-api-data-fetching-methods-react.md) interactions between the frontend and backend and eliminates the need for complex data transformation processes
- **Battle-tested** — MERN is widely adopted and has been used in many production-ready applications across various industries. Its proven reliability makes it a solid choice for [<FontIcon icon="fas fa-globe"/>startups](https://blog.logrocket.com/product-management/incubators-guide/) and enterprises alike
- **Strong community support and ecosystem** — Every tool in the MERN stack has a large and active community that gives you access to a wealth of documentation, tutorials, open-source libraries, and third-party tools

---

## Disadvantages of the MERN stack

Like every technological approach, the MERN stack has its limitations and disadvantages, including:

- **Steeper learning curve** — Mastering the entire MERN stack requires familiarity with multiple technologies. This can be challenging for beginners, especially when it comes to learning the advanced features.
- **Lack of built-in structure** — MERN doesn’t enforce a rigid [**project structure**](/blog.logrocket.com/structure-scalable-next-js-project-architecture/), meaning you must define your own [**architecture**](/blog.logrocket.com/node-js-project-architecture-best-practices.md). This can lead to inconsistencies, especially when scaling and maintaining large applications. However, you can address this by following established best practices and adopting an agreed-upon folder structure
- **Maintenance and updates** — Managing a full MERN stack application means keeping up with updates for four separate technologies. Each technology is actively developed, so updates or breaking changes in any one of them can affect the whole application.

---

---

## How to build an app using the MERN stack

To show the MERN stack in action, let’s talk through how to build a full-stack to-do app where users can create, read, and delete to-do items.

To follow along with this step-by-step guide, you’ll need:

- Node.js version 14 or higher installed
- MongoDB installed locally or a MongoDB Atlas account
- npm or yarn package manager
- Basic knowledge of all MERN stack technologies
- A new React app

You can structure the app to suit your preferences. However, if you’d like to use my folder structure, use the image below as a reference:

![Folder structure for MERN to-do app](https://paper-attachments.dropboxusercontent.com/s_B5A9487B8E93C2D596818BB443FFECA3635AB7A655E8B0A316EC63944E48D7A3_1739283808182_image.png)

_Here’s the [GitHub repo (<FontIcon icon="iconfont icon-github"/>`nefejames/logrocket-mern-todo-app`)](https://github.com/nefejames/logrocket-mern-todo-app) for the complete app if you’d like to jump straight to the code._

### Step 1: Set up the MongoDB schema

First, we need to define the structure of our to-do items. Create a <FontIcon icon="fa-brands fa-js"/>`todoSchema.js` file and update it with the below code:

```js title="todoSchema.js"
const mongoose = require('mongoose');

// Define the Todo schema with a label and status field
const todoSchema = new mongoose.Schema({
  label: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
});

// Create and export the Todo model
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
```

The code above does the following:

- Defines a schema using Mongoose for MongoDB
- Creates a model from the schema
- Exports the model so other parts of the application can use it

### Step 2: Set up the server with Express.js and MongoDB

Now, let’s set up our backend server using Node.js, Express, and MongoDB.

Run the following command to install the required packages:

::: code-tabs#sh

@tab:active <FontIcon icon="fa-brands fa-yarn"/>

```sh
yarn add express mongoose cors body-parser
```

@tab <FontIcon icon="fa-brands fa-npm"/>

```sh
npm i express mongoose cors body-parser
```

:::

#### Create an express server

Create a `server.js` file and add the following:

```js :collapsed-lines title="server.js"
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Todo = require('./models/todoSchema');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const dbURI = 'your-mongodb-uri-here';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3001, () => {
      console.log('Server is running on port 3001 and connected to MongoDB');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Routes for CRUD operations

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Unable to retrieve todos', error });
  }
});

// Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const { label, status } = req.body;
    const todo = new Todo({ label, status });
    const savedTodo = await todo.save();
    res.status(201).json({ message: 'Todo successfully created', todo: savedTodo });
  } catch (error) {
    res.status(500).json({ message: 'Unable to create todo', error });
  }
});

// Update an existing todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { label, status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { label, status },
      { new: true, runValidators: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo successfully updated', todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: 'Unable to update todo', error });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo successfully deleted', todo: deletedTodo });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete todo', error });
  }
});

module.exports = app;
```

This step sets up the backend server and API endpoints for handling to-do tasks. It:

- Initializes an Express server to handle HTTP requests
- Uses CORS middleware to allow frontend requests from different origins
- Connects to a MongoDB database using Mongoose
- Defines API routes
- Starts the server on a specified port (3001 in this case)

### Step 3: Build the frontend with React

Create a `TodoApp.js` file and update it with the following code:

```jsx :ollapsed-lines title="TodoApp.js"
<div className="min-h-screen bg-gray-100 flex items-center justify-center">
  <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
    <h1 className="text-2xl font-bold mb-4 text-center text-orange-500">Todo App</h1>
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Type todo here..."
        className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
      />
      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 focus:outline-none">
        Add
      </button>
    </form>
    <ul>
      {tasks.map((task) => (
        <li
          key={task._id}
          className={
            `flex items-center justify-between p-2 mb-2 rounded-md \${task.status === 'completed' ? 'bg-orange-100' : 'bg-gray-50'}`
          }
        >
          <input
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={() => toggleCompletion(task._id, task.status)}
            className="form-checkbox h-5 w-5 text-orange-500"
          />
          <span
            className={
              `flex-1 ml-2 cursor-pointer \${task.status === 'completed' ? 'line-through text-gray-500' : ''}`
            }
            onClick={() => toggleCompletion(task._id, task.status)}
          >
            {task.label}
          </span>
          <button
            onClick={() => handleDelete(task._id)}
            className="text-red-500 hover:text-red-700 focus:outline-none"
            aria-label="Delete"
          >
            X
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>
```

The code above does the following:

- Uses React state (`useState`) to store the list of tasks and the new task input
- Fetches to-dos from the backend using `useEffect`
- Implements four functions for handling to-do operations
- Renders the UI, which includes a form for adding new tasks and a list of to-do items

This is a basic project demonstrating how to build an app with the MERN stack. You can create something more complex or extend this further by adding user authentication, drag-and-drop sorting, and also deploying it to your preferred platform.

> _For a deeper dive, check out our [**comprehensive tutorial**](/blog.logrocket.com/mern-stack-tutorial.md) on developing a simple CRUD application from scratch using the MERN stack._

---

---

## MERN stack vs. other JavaScript stacks

The MERN stack is a popular choice for full-stack JavaScript development. However, it’s not the only alternative JavaScript stack. Let’s see how they “stack” up against each other — *pun intended*:

![Comparing technology stacks for web development](https://paper-attachments.dropboxusercontent.com/s_B5A9487B8E93C2D596818BB443FFECA3635AB7A655E8B0A316EC63944E48D7A3_1738377257385_rsz_mern_stack_architecture_2.png)

### MERN stack vs. MEAN stack

The first and most obvious difference between the MERN and MEAN stacks is their frontend framework. MERN uses React as its frontend framework, while [**Angular**](/blog.logrocket.com/enhancing-two-way-data-binding-angular.md) handles MEAN’s frontend. While both tools handle the UI, they have their distinctions.

React is a flexible, non-opinionated framework, while Angular is heavily opinionated and comes with conventions that dictate how applications should be structured. Angular provides more structure, but it also comes with a steeper learning curve.

MEAN is well-suited for enterprise applications that need strict architectural guidelines, while MERN is better for projects that need more flexibility.

### MERN stack vs. MEVN

MERN and MEVN are similar, except for their frontend framework, as MEVN uses [**Vue.js**](/blog.logrocket.com/exploring-advanced-design-patterns-vue-js.md). Vue.js is known for its simplicity and ease of learning compared to React, making it a great choice for smaller projects.

React has a larger ecosystem and more third-party components than Vue.js. However, Vue.js is easier to learn and is more beginner-friendly.

### MERN stack vs. JAMstack

A core difference between the MERN stack and [**JAMstack**](/blog.logrocket.com/why-you-should-be-using-jamstack.md) (JavaScript, APIs, and Markup) is their purpose. While MERN is tailored towards building data-intensive web apps, the JAMstack approach is used to create static or content-heavy sites — with little or no dynamic interactions — like blogs, documentation sites, and ecommerce stores, where speed and [**SEO**](/blog.logrocket.com/manage-seo-next-js-with-next-seo.md) are major priorities.

Unlike the MERN stack, which is a collection of tools you should work with, JAMstack doesn’t suggest any technologies. Instead, it’s an architectural approach that deals with serving prebuilt static files through a [**CDN**](/blog.logrocket.com/using-cdns-to-optimize-website-performance.md) to reduce server load and improve performance.

JAMstack uses JavaScript for interactivity, APIs for backend services, and [**Markdown**](/blog.logrocket.com/how-to-safely-render-markdown-using-react-markdown.md) or headless [**CMS**](/blog.logrocket.com/best-headless-cms-platforms-astro.md) solutions for content management.

### MERN stack vs. PERN stack

When it comes to MERN vs. PERN, the database is the differentiator, as the PERN stack uses [**PostgreSQL**](/blog.logrocket.com/crud-rest-api-node-js-express-postgresql.md) as its database. PostgreSQL is an open-source relational database that uses SQL for queries. It is currently [<FontIcon icon="fa-brands fa-stack-overflow"/>the most popular database](https://survey.stackoverflow.co/2024/technology#1-databases) out there for the second year in a row.

PostgreSQL is a schema-based database that supports structured data. This means the structure of the data must be defined before it is stored. Meanwhile, MongoDB is schema-less and offers greater flexibility on how you store and modify your data.

### MERN stack vs. T3 stack

The [T3 stack](https://create.t3.gg/) takes a completely different approach from the other stacks we’ve explored. It introduces a completely new set of tools and is built around [TypeScript](https://blog.logrocket.com/how-to-use-typescript-react-tutorial-examples/), [**Next.js**](/blog.logrocket.com/using-next-js-with-typescript.md), [**tRPC**](/blog.logrocket.com/trpc-vs-graphql-better-projects.md), [**Tailwind CSS**](/blog.logrocket.com/getting-ready-tailwind-v4/), and [**Prisma**](/blog.logrocket.com/prisma-orm-adoption-guide.md). Companies like [<FontIcon icon="fas fa-globe"/>Zoom](https://developers.zoom.us/blog/why-we-chose-to-build-with-the-t3-stack/) are already using this stack in production.

The T3 stack was created as a modern alternative that uses the latest technologies and prioritizes type safety and developer experience.

However, this stack is not as popular or battle-tested as other stacks. I recommend experimenting with it on personal projects before adopting it for larger-scale or production applications. Also, [<FontIcon icon="fa-brands fa-reddit"/>review online discussions](https://reddit.com/r/nextjs/comments/13u8se0/t3_stack_in_the_future/) to learn what the community is saying about the T3 stack.

Here’s a tabular summary of how the MERN stack compared with other JavaScript stacks:

::: tabs

@tab:active Learning curve

- **MERN Stack (MongoDB, Express.js, React, Node.js)**: Moderate
- **MEAN Stack (MongoDB, Express.js, Angular, Node.js)**: Steep
- **MEVN Stack (MongoDB, Express.js, Vue.js, Node.js)**: Easy
- **JAMstack (JavaScript, APIs, Markup)**: Moderate
- **PERN Stack (PostgreSQL, Express.js, React, Node.js)**: Moderate
- **T3 Stack (TypeScript, Next.js, tRPC, Tailwind, Prisma)**: Moderate

@tab Flexibility

- **MERN Stack (MongoDB, Express.js, React, Node.js)**: High
- **MEAN Stack (MongoDB, Express.js, Angular, Node.js)**: Low (Opinionated)
- **MEVN Stack (MongoDB, Express.js, Vue.js, Node.js)**: High
- **JAMstack (JavaScript, APIs, Markup)**: High
- **PERN Stack (PostgreSQL, Express.js, React, Node.js)**: Moderate
- **T3 Stack (TypeScript, Next.js, tRPC, Tailwind, Prisma)**: High

@tab Best for

- **MERN Stack (MongoDB, Express.js, React, Node.js)**: Dynamic web apps, SPAs
- **MEAN Stack (MongoDB, Express.js, Angular, Node.js)**: Enterprise apps, structured projects
- **MEVN Stack (MongoDB, Express.js, Vue.js, Node.js)**: Small and large-scale projects, beginner-friendly apps
- **JAMstack (JavaScript, APIs, Markup)**: Static sites, content-heavy apps
- **PERN Stack (PostgreSQL, Express.js, React, Node.js)**: Apps needing relational data & SQL
- **T3 Stack (TypeScript, Next.js, tRPC, Tailwind, Prisma)**: Type-safe, modern development

@tab Ecosystem & support

- **MERN Stack (MongoDB, Express.js, React, Node.js)**: Large community, many libraries
- **MEAN Stack (MongoDB, Express.js, Angular, Node.js)**: Strong Angular ecosystem
- **MEVN Stack (MongoDB, Express.js, Vue.js, Node.js)**: Strong community
- **JAMstack (JavaScript, APIs, Markup)**: Large ecosystem
- **PERN Stack (PostgreSQL, Express.js, React, Node.js)**: Large ecosystem
- **T3 Stack (TypeScript, Next.js, tRPC, Tailwind, Prisma)**: Large and growing community

@tab SEO

- **MERN Stack (MongoDB, Express.js, React, Node.js)**: Moderate
- **MEAN Stack (MongoDB, Express.js, Angular, Node.js)**: Moderate
- **MEVN Stack (MongoDB, Express.js, Vue.js, Node.js)**: Moderate
- **JAMstack (JavaScript, APIs, Markup)**: High (Pre-built static files)
- **PERN Stack (PostgreSQL, Express.js, React, Node.js)**: Moderate
- **T3 Stack (TypeScript, Next.js, tRPC, Tailwind, Prisma)**: High (Server-side rendering)

@tab Use in production

- **MERN Stack (MongoDB, Express.js, React, Node.js)**: Widely used
- **MEAN Stack (MongoDB, Express.js, Angular, Node.js)**: Common in enterprise settings
- **MEVN Stack (MongoDB, Express.js, Vue.js, Node.js)**: Used for simple to large projects
- **JAMstack (JavaScript, APIs, Markup)**: Popular for blogs & eCommerce
- **PERN Stack (PostgreSQL, Express.js, React, Node.js)**: Popular in data-heavy apps
- **T3 Stack (TypeScript, Next.js, tRPC, Tailwind, Prisma)**: Not widely adopted yet

@tab Dynamic vs static content

- **MERN Stack (MongoDB, Express.js, React, Node.js)**: Dynamic
- **MEAN Stack (MongoDB, Express.js, Angular, Node.js)**: Dynamic
- **MEVN Stack (MongoDB, Express.js, Vue.js, Node.js)**: Dynamic
- **JAMstack (JavaScript, APIs, Markup)**: Static
- **PERN Stack (PostgreSQL, Express.js, React, Node.js)**: Dynamic
- **T3 Stack (TypeScript, Next.js, tRPC, Tailwind, Prisma)**: Dynamic & static (SSG & SSR)

@tab Third-party libraries

- **MERN Stack (MongoDB, Express.js, React, Node.js)**: Extensive React ecosystem
- **MEAN Stack (MongoDB, Express.js, Angular, Node.js)**: Angular has built-in solutions
- **MEVN Stack (MongoDB, Express.js, Vue.js, Node.js)**: Vue has a growing library base
- **JAMstack (JavaScript, APIs, Markup)**: Uses APIs & third-party services
- **PERN Stack (PostgreSQL, Express.js, React, Node.js)**: Strong SQL-based tool support
- **T3 Stack (TypeScript, Next.js, tRPC, Tailwind, Prisma)**: Type-safe libraries available

@tab Third-party libraries

- **MERN Stack (MongoDB, Express.js, React, Node.js)**: One-way (React)
- **MEAN Stack (MongoDB, Express.js, Angular, Node.js)**: Two-way (Angular)
- **MEVN Stack (MongoDB, Express.js, Vue.js, Node.js)**: Two-way (Vue)
- **JAMstack (JavaScript, APIs, Markup)**: API-based
- **PERN Stack (PostgreSQL, Express.js, React, Node.js)**: One-way (React)
- **T3 Stack (TypeScript, Next.js, tRPC, Tailwind, Prisma)**: One-way (React-based)

:::

---

## How to deploy MERN stack applications

Deploying a MERN stack app requires hosting for the frontend (React), backend (Node.js and Express), and database (MongoDB), which can make it complex. However, it’s not impossible. Let’s explore several deployment routes you can use.

### Cloud platforms (PaaS)

Cloud platforms like [**Vercel**](/blog.logrocket.com/deploy-react-app-for-free-using-vercel.md), AWS, [**Heroku**](/blog.logrocket.com/heroku-alternatives-deploy-node-js-app.md), Azure, and Render are one of the most straightforward deployment methods. They handle most of the infrastructure and provide automatic scaling, [**CI/CD pipelines**](//blog.logrocket.com/best-practices-ci-cd-pipeline-frontend.md), and managed databases with minimal configuration.

### Virtual private server (VPS)

If you need greater control, then VPS hosting on platforms like [**DigitalOcean**](/blog.logrocket.com/zero-downtime-deploys-with-digitalocean-github-and-docker.md), AWS EC2, or Linode is the way to go. It requires manual setup, but offers provides greater flexibility and cost control, making it a good choice for growing applications with specific backend requirements.

### Docker and Kubernetes

Docker allows you to package the frontend, backend, and database into containers, while Kubernetes helps orchestrate, scale, and manage these containers efficiently. *Learn more about [**Docker for frontend developers**](/blog.logrocket.com/docker-for-front-end-developers.md) and [**how to deploy a React app to Kubernetes using Docker**](/blog.logrocket.com/deploy-react-app-kubernetes-using-docker.md)_.

---

## When to use (and not to use) the MERN stack

We’ve learned a lot about the MERN stack and seen various reasons why it’s a great stack to work with. However, at the end of the day, it’s not suitable for every project — that’s why alternative stacks exist.

Let’s explore when to use the MERN stack and when to consider other options.

::: tabs

@tab The MERN stack is great for building:

- **Single-page applications (SPAs)** — React is a great tool for creating [**SPAs**](/blog.logrocket.com/core-web-vitals-best-practices-spas.md), like [**dashboards**](/blog.logrocket.com/top-react-dashboard-libraries.md), as it allows users to interact with a web app without performing full page reloads
- **Full-stack JavaScript applications** — As mentioned earlier, the MERN stack allows you to take the full-stack JavaScript approach, which reduces context-switching and eliminates the need to learn different backend languages like [**Python**](/blog.logrocket.com/node-js-vs-python-how-to-choose-the-best-technology-develop-backend.md) or [**PHP**](/blog.logrocket.com/modern-tools-php-developers.md)
- **Real-time applications** — You can use Node.js and Express.js to create real-time applications by combining them with tools like Socket.io
- **Rapid prototyping and MVPs** — The MERN stack is excellent for startups and early-stage products that need quick development and iteration

@tab The MERN stack is less suitable for building:

- **Applications with complex transactions (ACID compliance)** — MERN may not be the best choice if your application needs *strict relational data integrity since* MongoDB doesn’t handle complex transactions as well as relational databases like PostgreSQL
- **Enterprise-level applications with complex queries** — Apps that require complex *joins, reporting, or analytics* may struggle with MongoDB, as it’s a NoSQL database optimized for flexibility, not complex querying. In such cases, it’s better to use PostgreSQL
- **Server-rendered applications (Static and SEO-focused websites)** — MERN is not the best fit for applications that need server-side rendering (SSR) for SEO purposes. It is better to use SSR frameworks like Next.js that render websites on the server and provide built-in components like the `image` and `script` component that further [**improve SEO**](/blog.logrocket.com/manage-seo-next-js-with-next-seo.md) and performance

:::

---

## MERN stack resources: Templates, certifications, and roadmap

If you’ve made it this far, congratulations! You’ve learned why the MERN stack is so popular and the benefits it provides.

Now, let’s explore the answer to a question many developers ask: “*How do I become a MERN stack developer?*”

### MERN stack developer roadmap

The first step to becoming a MERN stack developer is gaining the right knowledge, which involves learning the following technologies — preferably in descending order, as your understanding of one will act as a foundation for further learning:

1. Learn HTML, CSS, and JavaScript — the big three of web development
2. Learn Git, GitHub, and terminal commands. Git is a big bad wolf many devs are scared of — myself included — but you’ll definitely need it
3. Master frontend with React. This includes learning about state management, React Hooks, React Router, and Next.js, among others
4. After that, it’s time to move to the backend. This is where you’ll learn about Node.js and Express.js
5. Next up, learn about MongoDB, its features, and how to navigate the platform

::: note

In truth, this is just a low-level overview of a MERN stack developer roadmap. For a more detailed guide, check out the [<FontIcon icon="fas fa-globe"/>Roadmap.sh](https://roadmap.sh/full-stack) *full-stack developer roadmap*.

:::

### MERN stack developer certifications

There are varying opinions about certificates in the tech space. Some believe they’re not needed, and others believe they are.

Regardless of what segment you fall into, one thing is certain: it doesn’t hurt to grab a few certificates, especially in today’s competitive job market. Anything that gives you an edge above other job applicants is definitely good. These are some certifications you should consider getting:

- [<FontIcon icon="fas fa-globe"/>IBM Full-stack software developer professional certificate](https://coursera.org/professional-certificates/ibm-full-stack-cloud-developer)
- [<FontIcon icon="fas fa-globe"/>Simplilearn Full-stack (MERN Stack) developer Masters program](https://simplilearn.com/full-stack-developer-course-mern-certification-training)
- [<FontIcon icon="fas fa-globe"/>Noble Desktop Full-stack web development certificate](https://nobledesktop.com/certificates/full-stack-development)

### MERN stack developer roles and skills

Many roles require MERN stack expertise, but the most common ones include:

- **Full-stack developer** — Expected to handle both frontend (React) and backend (Node.js/Express) while managing databases (MongoDB)
- **Frontend developer (React)** — While the priority is experience with React, many employers prefer candidates who understand Node.js for API integration
- **Backend developer (Node.js)** — Companies hiring for Node.js roles often expect experience with Express.js and MongoDB (or some database solution)
- **JavaScript developer** — A broad role that involves working with JavaScript-based technologies like the MERN stack across different projects
- **Freelance/contract developer** — Many startups and agencies look for MERN developers to build MVPs, web apps, or SaaS products quickly

Potential employers expect MERN stack developers to have numerous skills. Some of them include building responsive UIs with React, handling RESTful APIs with Express.js, managing authentication and authorization with Nodejs, understanding MongoDB’s document-based structure, securing databases, using Git for version control, and deploying applications on platforms like Vercel, Netlify, Heroku, or DigitalOcean.

### MERN stack projects and templates

One of the best ways to learn is by studying what others have built. You can dive into these projects, study their codebase, and gain inspiration:

- [Social media web app (<FontIcon icon="iconfont icon-github"/>`Faizan2911/Social-Media-Web-App-Mern-Stack-`)](https://github.com/Faizan2911/Social-Media-Web-App-Mern-Stack-)
- [Ecommerce platform project (<FontIcon icon="iconfont icon-github"/>`ajaybor0/MERN-eCommerce`)](https://github.com/ajaybor0/MERN-eCommerce)
- [Chat stream (<FontIcon icon="iconfont icon-github"/>`ankanmitra2002/Chat_Stream`)](https://github.com/ankanmitra2002/Chat_Stream)
- [ERP CRM software (<FontIcon icon="iconfont icon-github"/>`idurar/idurar-erp-crm`)](https://github.com/idurar/idurar-erp-crm)
- [Full-stack doctor appointment website (<FontIcon icon="iconfont icon-github"/>`Ujjalzaman/Doctor-Appointment`)](https://github.com/Ujjalzaman/Doctor-Appointment)
- [Todo web app (<FontIcon icon="iconfont icon-github"/>`himanshu1221/To-Do-Web-App`)](https://github.com/himanshu1221/To-Do-Web-App)

Explore the [mern-project GitHub topic](https://github.com/topics/mern-project) to see more great projects and templates.

### MERN stack developer courses and tutorials

The World Wide Web is saturated with many resources for learning about the MERN stack — and anything, really — but these are some great ones to start with:

- [**How to build a MERN stack CRUD app from scratch**](/blog.logrocket.com/mern-stack-tutorial.md)
- [<FontIcon icon="fa-brands fa-youtube"/>Book store project](https://youtu.be/-42K44A1oMA) by FreeCodeCamp
- [<FontIcon icon="fa-brands fa-youtube"/>MERN stack crash course tutorial](https://youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE) by Net Ninja
- [<FontIcon icon="fa-brands fa-youtube"/>Build and deploy a Full-stack MERN social media app](https://youtu.be/VsUzmlZfYNg) with auth, pagination, and comments by JavaScript Mastery
- [<FontIcon icon="fas fa-globe"/>CareerFoundry Full-stack developer program](https://careerfoundry.com/en/courses/become-a-web-developer/)

---

## Are MERN stack developers in demand today?

While knowing the roadmap for becoming a MERN stack developer is important, understanding the job market demand is just as critical. Many people pursue MERN stack development not just for personal projects but also to secure a job in the field. So, how in-demand are MERN stack developers today?

There are no recent stats specifically tracking the demand for MERN stack developers. However, after searching various job boards — [<FontIcon icon="fas fa-globe"/>Glassdoor](https://glassdoor.com/Job/united-states-mern-stack-jobs-SRCH_IL.0,13_IN1_KO14,24.htm), [<FontIcon icon="fas fa-globe"/>Himalayas](https://himalayas.app/jobs/mern-stack), [<FontIcon icon="fas fa-globe"/>Indeed](https://indeed.com/jobs?q=mern+stack&l=new+york%2C+ny&from=searchOnDesktopSerp%2Cwhatautocomplete&cf-turnstile-response=0.G_5_JBvJ6s4byXQiwIQLc22Vc3Srpx8El34Bgu8UClRXEeVOlnw2lKGsmzxMevZ9iAIuy0DpsdBdAtD3PjUFcRBmf-fMyLlwi8xN2PYMiKMeSW-zx9t7i8L7KvVaiBKc9-fH63uvy3mf52R2TnHezVtnuzuN780DcEhP5Nvy3AKZcBbt82ZXehvGA4fnlNaB_qsi0VJXMf67AMj17jcZme3lMrSy6JsJoeipqqW-PvXamCoJnXCPDfS5kRmwt-zhq6IG9DrDfJrQFQj8-GoIiYLgY-ilCtd-N-DxGlsPtzS2zgJDDr-WoWdqg1R-QV5o6BOG0zsFKt-JNIgEdyGi4awNmqt5u21BmstIiBdgkPw2Yv8P5AhR93TlbzR1FPhBk4BZBDM-hpR8WsmEuT-a6GqsRCf8Mw5Q8cemV5fUYqD1Otv5OSvUD1iHNwqlTeSmIBeGMfNcQxP5wZqw21jwJd26VSYn-UhyMiXhj2Q2kOqQt2vJC1-qspOsc8vrHQzo2Sjn-BpqPS3zjMQ8RpMkh4E1H0-7deJhSFmkmAx0iDt-F86gU36ZZ5ensevHmnEusHzH0bqS_MO-k9D9wVWoDAO2ACej6bE7sTtjjkBHzwrnfPhXZWujrNdSWdQonT7Zte2MkcnQ9FMZDRcDkJ8ZJKm0YssJnayaB18h7QDYyDLtQb4_e9a0HGITsT9OeKgsdFu7Eioj1KKp4OYkF9nEaFKTD3469ixIFSSs-Ent4dauxmxWZKhrVRmazLEn452irBOblhkk7XvxJAxPX1JJfj5FilotGlkIIlsdirCLhXOXF2wys2RpH-zdbXTFQsBHatbBQ8vxdfWY9t01hXUEFg.C769ApksE2--i4KEt8VGCg.6285e17777c8a1e26fd0cc6898fa75dde00b2f8758cba6f3cf99a5037fad6697&vjk=85b6ee5eae1f676f), [<FontIcon icon="fa-brands fa-linkedin"/>LinkedIn](https://linkedin.com/jobs/search/?currentJobId=4141666084&geoId=103644278&keywords=mern%20stack%20developer&origin=JOB_SEARCH_PAGE_SEARCH_BUTTON&refresh=true), and [<FontIcon icon="fas fa-globe"/>Y Combinator’s Work at a Startup](https://workatastartup.com/companies?demographic=any&hasEquity=any&hasSalary=any&industry=any&interviewProcess=any&jobType=any&layout=list-compact&query=MERN&role=eng&sortBy=keyword&tab=any&usVisaNotRequired=any) — for terms like “mern stack developer,” “fullstack developer,” and “web developer,” I noticed that less than 25 percent of job postings requested the MERN stack, and these are conservative figures.

This suggests that demand for the MERN stack as a whole has declined compared to a few years or a decade ago.

The insights I gathered from the job boards match [<FontIcon icon="fa-brands fa-google"/>Google search trends](https://trends.google.com/trends/explore?date=today%205-y&geo=US&q=mern%20stack,fullstack&hl=en), which show that the search volume for “mern stack developers” far outweighs that of “full stack developer”:

![Google search trends for MERN stack vs full stack developer](https://paper-attachments.dropboxusercontent.com/s_B5A9487B8E93C2D596818BB443FFECA3635AB7A655E8B0A316EC63944E48D7A3_1739036073955_image.png)

Why the drop in demand? The web development space is consistently evolving as new tools emerge. Certain technologies gain popularity while others fade. For example, jQuery was once the industry standard for JavaScript libraries, which is no longer the case.

One thing is obvious: putting all your eggs in one basket is risky. The MERN stack as a whole may not be as requested, but individual technologies within it are still highly relevant.

For example, a company might need MongoDB or NoSQL experience, and another might require React and Node.js but use PostgreSQL instead of MongoDB.

So, while you may not see “MERN stack” as a job requirement, you will find React, Node, or MongoDB appearing in different combinations across job descriptions.

Because new tools emerge constantly, limiting yourself to a single stack can affect your career path. Instead, focus on:

- Gaining experience with multiple frameworks and tools across frontend and backend
- Learning how to quickly adapt to new frameworks as they become popular
- Understanding the fundamentals so its easier to switch between tools

At the end of the day, startups and midsized companies will always need databases, frontend frameworks, and server-side libraries — but they won’t always choose the tools in the MERN stack. Some will prefer PostgreSQL, Vue, Next.js, or something entirely new. The key is to become a versatile developer who can adapt and learn new technologies quickly to stay ahead of trends.

---

## Final thoughts: Who’s hiring MERN stack developers?

While the MERN stack may not be as in-demand as before, certain types of companies still hire MERN developers. Startups and mid-sized tech companies, especially those building MVPs and scalable web applications, will likely choose the MERN stack because of its JavaScript-only ecosystem, which speeds up development.

If you’re targeting MERN stack roles, smaller tech companies, digital agencies, and fast-growing startups are where you’re likely to find the most opportunities.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is the MERN stack? Overview with examples",
  "desc": "Discover how the MERN stack (MongoDB, Express.js, React, Node.js) enables developers to build dynamic, performant, modern websites and apps.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/mern-stack.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
