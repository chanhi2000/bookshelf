---
lang: en-US
title: "How to Build Your Own MCP Server and Publish Your ChatGPT App with Supabase Auth and DigitalOcean"
description: "Article(s) > How to Build Your Own MCP Server and Publish Your ChatGPT App with Supabase Auth and DigitalOcean"
icon: iconfont icon-mcp
category:
  - Node.js
  - Next.js
  - Supabase
  - DevOps
  - ngrok
  - Data Science
  - Microsoft
  - Microsoft SQL Server
  - AI
  - LLM
  - MCP
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
  - supabase
  - data-science
  - sql
  - db
  - microsoft
  - mssql
  - microsoft-sql-server
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - mcp
  - model-context-protocols
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Your Own MCP Server and Publish Your ChatGPT App with Supabase Auth and DigitalOcean"
    - property: og:description
      content: "How to Build Your Own MCP Server and Publish Your ChatGPT App with Supabase Auth and DigitalOcean"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-own-mcp-server-and-publish-your-chatgpt-app/
prev: /ai/mcp/articles/README.md
date: 2026-07-10
isOriginal: false
author:
  - name: Abdurrahman Rajab
    url: https://freecodecamp.org/news/author/a0m0rajab/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f7fdd4f8-d0c0-44ee-aaf5-f3277522e32c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Supabase > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-supbase/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "ngrok > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/ngrok/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Microsoft SQL Server > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mssql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MCP > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/mcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Your Own MCP Server and Publish Your ChatGPT App with Supabase Auth and DigitalOcean"
  desc="A new type of app is emerging with the development of LLMs and AI-native apps. It lives inside an AI chat (like ChatGPT) rather than being a fully native web or mobile app. In this tutorial, you'll le"
  url="https://freecodecamp.org/news/how-to-build-your-own-mcp-server-and-publish-your-chatgpt-app"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f7fdd4f8-d0c0-44ee-aaf5-f3277522e32c.png"/>

A new type of app is emerging with the development of LLMs and AI-native apps. It lives inside an AI chat (like ChatGPT) rather than being a fully native web or mobile app.

In this tutorial, you'll learn how to build an MCP (Model Context Protocol) server from scratch, including a UI you can use as a ChatGPT app with authentication and a database.

You'll go through the process of building, testing, adding the ChatGPT app as a connector, and submitting it to publish to the app directory. This will let you build the app on three levels:

- Level one: you will build your basic MCP Server that returns textual data.
- Level two: you will build a UI for your MCP Server to be used within an LLM UI.
- Level three: you will add authentication and a database to your MCP Server.

To fully understand this article, you'll need to have basic knowledge of:

- Web development
- JavaScript
- React and React Native
- SQL and databases

### What We'll Cover:

- [Level 1: How to Build Your Own MCP Server](#heading-level-1-how-to-build-your-own-mcp-server)
- [How to Test Your MCP Server](#heading-how-to-test-your-mcp-server)
- [Level 2: How to Build the UI](#heading-level-2-how-to-build-the-ui)
- [How to Test Your ChatGPT App](#heading-how-to-test-your-chatgpt-app)
- [Level 3: How to Add Supabase (Auth and Database) to the MCP Server](#heading-level-3-how-to-add-supabase-auth-and-database-to-the-mcp-server)
- [How to Deploy Your MCP Server to DigitalOcean](#heading-how-to-deploy-your-mcp-server-to-digitalocean)
- [How to Publish Your ChatGPT App](#heading-how-to-publish-your-chatgpt-app)

---

## What is an MCP Server?

A [**Model Context Protocol**](/freecodecamp.org/how-the-model-context-protocol-works.md) (MCP) server is a program that exposes tools, resources, and prompts to an AI application through a standard protocol. An MCP server can provide read-only context, callable tools, or reusable prompt templates that help extend what an AI application can do.

A developer builds or configures the MCP server, and an MCP client inside a host application connects to it. The application can then allow the model to discover available capabilities and, when appropriate, invoke tools or fetch resources via the MCP protocol to help complete a task.

### What Can You Do with an MCP Server?

An MCP server lets an AI application work with information and systems outside the model itself. For example, it can help the model look up current information, save and retrieve user data, search documents, or trigger actions in another application.

In practice, one MCP server might connect to an online database, while another might work with files on your local machine. This makes it possible to build AI workflows that are more useful, practical, and connected to real tools.

---

## Level 1: How to Build Your Own MCP Server

In this tutorial, you'll learn how to build an MCP server using the default HTTP server from Node.js, Supabase for the database and authentication, and the official MCP server SDK. Then you'll deploy it to DigitalOcean and publish your app on ChatGPT.

That means you'll do two steps here:

- First step: connect your deployed MCP server to ChatGPT as an app/connector so it can be used within ChatGPT.
- Second step: submit the app for review and, if approved, publish it to the ChatGPT app directory.

The MCP server SDK isn't the only tool or framework for building your own MCP server. You can use other SDKs and tools for that if you prefer. But to simplify the first steps, here I've decided to use the more straightforward tools.

### Step 0: Prepare your project

You're going to write a full project here, so you should start by creating packages and initializing the project. To do this, follow these steps:

- Create a new folder with the project name. For this example, you can use `mcp_todo`.
- Navigate to this new folder.
- Open the terminal in this folder.
- Initialize the npm project with `npm init --init-type=module -y` to create a JavaScript package file and add the packages to the project with ES6 support.
- Initialize Git with `git init` in the project to enable version control and track changes.
- Install related packages that you're going to use in your project:
  - The packages are Supabase, the MCP SDK (which we'll cover in step 2), and the zod validation package for validating LLM inputs and data.
  ```sh
  npm install @modelcontextprotocol/sdk zod @supabase/supabase-js
  ```
  - Create a <VPIcon icon="iconfont icon-git"/>`.gitignore` file and add the <VPIcon icon="fas fa-folder-open"/>`node_modules` to it so that it won't be tracked by Git.
- Add the current state of the project to your Git tracker by writing the following:
  - `git add .`
  - `git commit -m "init project"`

With this, you've created a new project for yourself that you can use as a starting point for managing and following the project.

### Step 1: Create a Node.js Server

To start the project, you'll need to create a simple Node.js server, which you can do by creating a new file named <VPIcon icon="fa-brands fa-js"/>`server.js` and writing the following code:

```js title='server.js"
import { createServer } from "node:http";

const port = Number(process.env.PORT ?? 8787);

const httpServer = createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);
  res.writeHead(404).end("Not Found");
});

httpServer.listen(port, () => {
  console.log(`Todo MCP server listening on http://localhost:${port}, press Ctrl+C to stop`);
});
```

This is a simple Node server that you'll use as the base for building your MCP Server.

To build your MCP server, you'll need to set it up using the MCP Server SDK. After that, you'll need to define two things: the tools you'll show the LLM and the UI and resources the LLM will use to render.

To define the tools and UI concepts, you'll use the MCP Server SDK.

### Step 2: Setting Up MCP Server SDK

To set up and start the MCP server, you need to have the following:

- Tools: The functions exposed by MCP Server to an LLM, enabling the LLM to interact with the server and external systems. Like calling an API, performing a computation, or querying a database.
- Resources (optional): Data the MCP Server shares with an LLM. For example, a file, database schema, or an HTML UI to use inside the LLM Chat UI as an embedded frame.

You can start the server by adding this line of code at the top of the <VPIcon icon="fa-brands fa-js"/>`server.js` file:

```js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

function createTodoServer() {
  const server = new McpServer({ name: "todo-app", version: "0.1.0" });
  return server;
}
```

Then add a tool and resources using the following function signature:

```js
server.registerTool(
  "NAME",
  {},
  async (args, meta) => { }
);
```

You can think about the tool registrar as your endpoint to the MCP Server. The LLM will check it and, based on the name and metadata, start processing the data using the arguments and results you have in this tool.

Today, you're going to build three simple tools:

- Add todo
- Update todo
- List todos

They all look a bit similar, but you'll see how to write them all to understand the concepts in the next sections.

### Step 3: Add MCP Server Tools – Create and Add a Todo

To start with, when adding todos, you'll need a simple in-memory array to manipulate. You can create the array outside the create server function to access it throughout the server.

```js
let todos = [];// outside the createTodoServer function block
let nextId = 1; // outside the createTodoServer function block (this is a mock id for your todos)
```

After the array, you'll need to have two more supporting functions: first, the validator for the tools, which specifies the expected input types from the LLM.

At the top of the file, you should import the zod library:

```js
import { z } from "zod";
```

Then you can write the helper function to validate it and tell the LLM what to expect from them:

```js
const addTodoInputSchema = {
  title: z.string().min(1),
}; // outside the createTodoServer function block
```

Next, you'll need the return function, which you can use with other functions to have a unified return function for the tools

```js
const replyWithTodos = (message) => ({
  content: message ? [{ type: 'text', text: message }] : [],
  structuredContent: { tasks: todos },
}); //outside the createTodoServer function block
```

Then you can register the add todo function in the server, inside the createTodoServer function block, before `return server`:

```js
server.registerTool(
  'add_todo',
  {
    title: 'Add todo',
    description: 'Creates a todo item with the given title.',
    inputSchema: addTodoInputSchema,
    _meta: {
      'openai/toolInvocation/invoking': 'Adding todo',
      'openai/toolInvocation/invoked': 'Added todo',
    },
  },
  async (args) => {
    const title = args?.title?.trim?.() ?? '';
    if (!title) return replyWithTodos('Missing title.');
    const todo = { id: `todo-${nextId++}`, title, completed: false };
    todos = [...todos, todo];
    return replyWithTodos(`${todo.title}`);
  },
); // inside the createTodoServer function block
```

In the above code, you've added the tool name and used a simple approach to add the todos to the in-memory array you already identified. The trick here is to validate the data before adding it and create the related object for it.

In the metadata, you've added the title, description, inputSchema, and _meta for OpenAI to use while rendering this. You'll get a rendering, add a todo when the AI adds it, and have the latest version of the added todo when it’s finished.

At the same time, you've added the input schema so the LLM knows what to provide when invoking your server, and you've added a reply helper function to handle your todos. It’s a simple function that shows the todos in a structured way for LLMs to understand.

### Step 4: List Todos from MCP Server

To list the todos, you can use a simple list function to show the todos without any changes. In the code below, you use the same concept for naming, metadata, and description context as you provided before. You're also using the previous helper function to return the todos that you have in memory. You should write this code inside the createTodoServer function block.

```js
server.registerTool(
  'list_todos',
  {
    title: 'List todos',
    description: 'Lists all todo items.',
    _meta: {
      'openai/toolInvocation/invoking': 'Listing todos',
      'openai/toolInvocation/invoked': 'Listed todos',
    },
  },
  async () => {
    return replyWithTodos();
  },
);
```

### Step 5: Add Todo Complete Functions

To complete and edit todos, you can create a new tool with that name that takes the todo ID and returns the updated todos. To do this, you need to add the helper function for validating the request outside the createTodoServer:

```js
const completeTodoInputSchema = {
  id: z.string().min(1),
};
```

Then inside the createTodoServer function, you can add the following:

```js
server.registerTool(
  'complete_todo',
  {
    title: 'Complete todo',
    description: 'Marks a todo as done by id.',
    inputSchema: completeTodoInputSchema,
    _meta: {
      'openai/toolInvocation/invoking': 'Completing todo',
      'openai/toolInvocation/invoked': 'Completed todo',
    },
  },

  async (args) => {
    const id = args?.id;
    if (!id) return replyWithTodos('Missing todo id.');
    const todo = todos.find((task) => task.id === id);
    if (!todo) {
      return replyWithTodos(`Todo ${id} was not found.`);
    }
    todos = todos.map((task) =>
      task.id === id ? { ...task, completed: true } : task,
    );
    return replyWithTodos(`Completed "${todo.title}".`);
  },
);
```

In this tool, you used the same function definition as for list todos, while adding extra guards to check whether the LLM has returned the ID and whether that ID is correct. You should always manually check the data you have before processing it, since LLMs can hallucinate and aren't required to validate their inputs.

Now you can commit your code to Git and track it in the tree:

- `git add .`
- `git commit -m "feat: add MCP todo server"`

### Step 6: Connect Your MCP Server with the Node.js Server

Since you have written the main functions for the MCP server, you need to connect your MCP server to the Node.js HTTP server.

To do that, you need to write the streamable function and the related code. You will use this code on top of the server code from step 1 as a replacement, since it includes more functions to handle the MCP server.

First, import the StreamableHTTPServerTransport function:

```js
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
```

Then you can copy the next code and replace it with the server code, which has the server's structure, to use in your project.

```js :collapsed-lines
const port = Number(process.env.PORT ?? 8787);
const MCP_PATH = '/mcp';

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end('Missing URL');
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? 'localhost'}`);

  // handle the options call for the endpoint
  if (req.method === 'OPTIONS' && url.pathname === MCP_PATH) {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'content-type, mcp-session-id',
      'Access-Control-Expose-Headers': 'Mcp-Session-Id',
    });
    res.end();
    return;
  }

  // handles normal get method for the main link
  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'content-type': 'text/plain' }).end('Todo MCP server');
    return;
  }
  // here you are handling your MCP calls with streamable HTTP
  const MCP_METHODS = new Set(['POST', 'GET', 'DELETE']);
  if (url.pathname === MCP_PATH && req.method && MCP_METHODS.has(req.method)) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'Mcp-Session-Id');
    const server = createTodoServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless mode
      enableJsonResponse: true,
    });
    res.on('close', () => {
      transport.close();
      server.close();
    });
    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error('Error handling MCP request:', error);
      if (!res.headersSent) {
        res.writeHead(500).end('Internal server error');
      }
    }
    return;
  }
  res.writeHead(404).end('Not Found');
});

httpServer.listen(port, () => {
  console.log(
    `Todo MCP server listening on http://localhost:${port}${MCP_PATH}`,
  );
});
```

In this code, you're running the main HTTP server to handle the requests. The server exposes a /mcp endpoint for MCP clients and connects each request to a stateless MCP server using Streamable HTTP.

Now you can commit your code to Git and track it in the tree:

- `git add .`
- `git commit -m "feat: add MCP server functions"`

---

## How to Test Your MCP Server

Now you can test the basic structure of your MCP server by running the following code:

```sh
node server.js
```

By using this command, you'll run the server you created in the previous steps. It will make it active and listen to changes at `http://localhost:8787/mcp`. After running <VPIcon icon="fa-brands fa-js"/>`server.js`, you need to open the inspector, a tool that helps you see the MCP server registration and the endpoints and tools you need to use and run in a secure environment.

```sh
npx @modelcontextprotocol/inspector@latest --server-url http://localhost:8787/mcp --transport http
```

When you run the previous command, you can see that you have a connection to your MCP, and you need to run it and use it through the inspector UI. Using the inspector UI will help you test your MCP server without connecting it to any external services and test the inputs and outputs locally.

![Showing MCP Server Inspector Too](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/ebe3380f-e95e-48dd-a3e5-9236ec72e8f1.png)

To test your tools, connect to the server first, and then you can see and explore them.

After writing this code, you may wonder: what UI could I show the user through an LLM? If you run your project right now, you'll only get text results as LLM chat answers. But if you build a UI, you can improve your LLM's experience. In the next section, that's what we'll tackle.

---

## Level 2: How to Build the UI

With the previous code, you built a simple MCP server that adds todos to a todo list and marks them as complete from the app. Now you're going to explore the registerResource tool, which registers a UI resource of your design so ChatGPT can use it.

Resources are the LLM-specific data provided by your MCP Server. You can share your UI with the LLM so it can use it to display additional data and widgets in the chat.

To share the UI, you need to have an HTML file that relies on your MCP server data and uses the MCP server. So for that, you'll create a new HTML file.

### Step 1: Create the HTML File to Show the UI

The TodoHTML you provided earlier should be an HTML file that can communicate with the Server and the ChatGPT UI. The UI will look like the following image:

![UI Style Inside ChatGPT](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/40db34a6-d29c-4304-9dd9-895252fb071b.png)

To build such a UI you saw previously, you need to create a <VPIcon icon="fas fa-folder-open"/> `public/`<VPIcon icon="fa-brands fa-html5"/>`todo-widget.html` file and write the following structured code:

```html title="public/todo-widget.html"
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Todo list</title>
    <style></style>
  </head>
  <body>
    <main>
    </main>
    <script type="module"></script>
  </body>
</html>
```

Then inside `<main>` tag, you should add the following:

```html
<h2>Todo list</h2>
<form id="add-form" autocomplete="off">
  <input id="todo-input" name="title" placeholder="Add a task" />
  <button type="submit">Add</button>
</form>
<ul id="todo-list"></ul>
```

You can see it’s just simple HTML tags that allow you to have the header, form with an input, and an unordered list with `id = todo-list`. But the tricky part is the JavaScript module you're going to add to it.

### Step 2: Add a JavaScript Module to Handle MCP Server Data.

To add the JavaScript module and code, you'll write all the code below inside the `<script type="module"></script>` tag.

First, you need to identify the elements by selecting the HTML tag IDs you provided to them in the HTML code:

```js
const listEl = document.querySelector("#todo-list");
const formEl = document.querySelector("#add-form");
const inputEl = document.querySelector("#todo-input");
```

Then you can use these elements to extract data from the ChatGPT response using some special `windows.openai` code. This will allow you to receive results and responses from ChatGPT while using your MCP server.

For this case, you'll use the following:

- `window.openai.callTool`
- `window.openai?.toolOutput`

`callTool` calls the tools from your MCP server by name, and `toolOutput` is the result of the tools you get from your MCP.

To create the first todos and show them, you can use the `toolOutput` and get the output from there to use in your UI. Here's a code example:

```js
let tasks = [...(window.openai?.toolOutput?.tasks ?? [])];
```

You can then loop through all tasks to add them to the list element:

```js
const render = () => {
  listEl.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.dataset.completed = String(Boolean(task.completed));
    const label = document.createElement('label');
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.gap = '10px';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = Boolean(task.completed);
    const span = document.createElement('span');
    span.textContent = task.title;
    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    listEl.appendChild(li);
  });
};
```

You can call this function to loop through the tasks from the OpenAI result and print them on the screen.

You can add the update function to update tasks to be completed with the following code:

```js
const updateFromResponse = (response) => {
  if (response?.structuredContent?.tasks) {
    tasks = response.structuredContent.tasks;
    render();
  }
};
```

In the code above, you received a new response from the AI and an update form via the function. This function will get the todos list from the LLM and re-render the HTML to show the todos:

```js
const handleSetGlobals = (event) => {
  const globals = event.detail?.globals;
  if (!globals?.toolOutput?.tasks) return;
  tasks = globals.toolOutput.tasks;
  render();
};
```

In the next code block, you'll handle the form response in the updateFormResponse function and set event listeners to update the code when changes are detected:

```js :collapsed-lines
window.addEventListener("openai:set_globals", handleSetGlobals, {
  passive: true,
});

const mutateTasksLocally = (name, payload) => {
  if (name === "add_todo") {
    tasks = [
      ...tasks,
      { id: crypto.randomUUID(), title: payload.title, completed: false },
    ];
  }

  if (name === "complete_todo") {
    tasks = tasks.map((task) =>
      task.id === payload.id ? { ...task, completed: true } : task
    );
  }

  if (name === "set_completed") {
    tasks = tasks.map((task) =>
      task.id === payload.id
        ? { ...task, completed: payload.completed }
        : task
    );
  }
  render();
};

const callTodoTool = async (name, payload) => {
  if (window.openai?.callTool) {
    const response = await window.openai.callTool(name, payload);
    updateFromResponse(response);
    return;
  }
  mutateTasksLocally(name, payload);
};

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = inputEl.value.trim();
  if (!title) return;
  await callTodoTool("add_todo", { title });
  inputEl.value = "";
});

listEl.addEventListener("change", async (event) => {
  const checkbox = event.target;
  if (!checkbox.matches('input[type="checkbox"]')) return;
  const id = checkbox.closest("li")?.dataset.id;
  if (!id) return;
  if (!checkbox.checked) {
    if (window.openai?.callTool) {
      checkbox.checked = true;
      return;
    }
    mutateTasksLocally("set_completed", { id, completed: false });
    return;
  }
  await callTodoTool("complete_todo", { id });
});

render();
```

### Step 3: Styling your UI

Since you've created the HTML tags and JavaScript code for your UI, you can improve the look of it by styling it the way you like with CSS. For that, you can use the following code and add it inside the `style` tag in the HTML file.

```css :collapsed-lines
:root {
  color: #0b0b0f;
  font-family:
    "Inter",
    system-ui,
    -apple-system,
    sans-serif;
}

html,
body {
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 16px;
  background: #f6f8fb;
}

main {
  width: 100%;
  max-width: 360px;
  min-height: 260px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
}

h2 {
  margin: 0 0 16px;
  font-size: 1.25rem;
}

form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

form input {
  flex: 1;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #cad3e0;
  font-size: 0.95rem;
}

form button {
  border: none;
  border-radius: 10px;
  background: #111bf5;
  color: white;
  font-weight: 600;
  padding: 0 16px;
  cursor: pointer;
}

input[type="checkbox"] {
  accent-color: #111bf5;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

li {
  background: #f2f4fb;
  border-radius: 12px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
}

li span {
  flex: 1;
}

li[data-completed="true"] span {
  text-decoration: line-through;
  color: #6c768a;
}
```

Now you can commit your code to Git and track it in the tree:

- `git add .`
- `git commit -m "feat: add MCP server UI"`

### Step 4: Add the UI to your MCP Server:

Writing the HTML file isn't enough to add resources to your project. You also need to upload the HTML and resources to the MCP server and configure the server to use them using the tools you provided.

To make your MCP server aware of the UI and HTML, you need to add extra functions to the MCP server and some _meta keys to the server tools.

Here's the signature of the resources function that the MCP server will use. This signature tells the LLM what type of file to read and which resources to use when it returns the output template. You'll add this code to your <VPIcon icon="fa-brands fa-js"/>`server.js` and your MCP server, then create your own HTML file that includes the design and UI.

```js
registerResource(name: string, uriOrTemplate: string, config: ResourceMetadata, readCallback: ReadResourceCallback): RegisteredResource;
```

To use the signature function, you can use the following simple code at the top of your file, which will read the HTML file you created:

```js
import { readFileSync } from "node:fs";

const todoHtml = readFileSync("public/todo-widget.html", "utf8");
```

And this resources registration code in the `createTodoServer` function, which will tell the LLM the type of HTML to use and where to find it.

```js
server.registerResource(
  "todo-widget",
  "ui://widget/todo.html",
  {},
  async () => ({
    contents: [
      {
        uri: "ui://widget/todo.html",
        mimeType: "text/html+skybridge",
        text: todoHtml,
        _meta: { "openai/widgetPrefersBorder": true },
      },
    ],
  })
);
```

In the above code, you've added the following parameters:

- The name of the resource
- The sources of the resource or the template as a string

You kept the config empty to simplify the example

You only used the contents of the callback to show the information about the resources with the following details:

- mimeType: the type of the file you provided. You added Skybridge, which is the OpenAI protocol that renders the HTML inside an iframe in the ChatGPT UI.
- URI: a specific name of your widget
- Text: Which is your HTML file
- _meta: specific details for ChatGPT

### Step 5: Update Your MCP Server to Handle the UI

Now that you've written the HTML pages to show a simple UI for your data and added the HTML as a resource to your MCP server, you'll add the following code to the _meta section in the MCP server tools so it can handle and render the HTML output when needed. Without this, the LLM will only return the output without returning the UI:

```js
_meta: {
  "openai/outputTemplate": "ui://widget/todo.html",
  "openai/toolInvocation/invoking": "Listing todos",
  "openai/toolInvocation/invoked": "Listed todos",
},
```

So the _meta tag in your tools functions will look like the following:

```js
    server.registerTool(
  'list_todos',
  {
    title: 'List todos',
    description: 'Lists all todo items.',
    _meta: {
      "openai/outputTemplate": "ui://widget/todo.html",
      'openai/toolInvocation/invoking': 'Listing todos',
      'openai/toolInvocation/invoked': 'Listed todos',
    },
  },
  async () => {
    return replyWithTodos();
  },
);
```

Now you can commit your code to Git and track it in the tree:

- `git add .`
- `git commit -m "feat: add _meta outputTemplate tag to MCP server tools"`

---

## How to Test Your ChatGPT App

After adding the UI to your MCP server, you can run and test the project on ChatGPT by doing the following:

First, run your server normally with:

```sh
node server.js
```

Then run your server through ngrok to enable online access, since you need OpenAI servers to be able to access your local machine:

```sh
ngrok http 8787
```

::: note

You need to have an ngrok account and log in to it via the CLI.

:::

To add your resources to ChatGPT, you need to enable dev mode and add it as a connector:

- Click on your profile in the ChatGPT UI
- Click on Apps
- Click on Advanced settings to create your own app

![Showing how to add a connector from ChatGPT Interface](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/cd78be7e-05e0-435e-86a6-9613b08f4e53.png)

Then you can add your server to ChatGPT and test it thoroughly.

You'll need to write the following data in this input:

- App name
- Descripiton
- Connection: as a server URL with your ngrok link from the terminal, with the `mcp` slash
- No authentication, since we haven't implemented it yet

![the app input data for OpenAI](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/005ab434-a487-469a-9500-b4e64175e870.png)

After adding the app, you can use it in the conversation by calling it with the app name by writing `@app_name`

Here are the examples from ChatGPT:

![Example of using the app inside ChatGPT](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/0b36e741-e7c9-4d18-aa63-0fd419a68896.png)

Here is the example of completing a step:

![Example of completing a task inside the app in ChatGPT](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/b19c338d-4b1b-4786-b514-40f0d586fbe5.png)

In the next section, you'll add authentication and a database to your project to move it to the next level.

---

## Level 3: How to Add Supabase (Auth and Database) to the MCP Server

To add authentication and a backend, you'll need a backend/SQL server and an authentication server. The easiest current way is to use a service that can provide that. For this, you'll use Supabase.

To start, you'll create a new Supabase project for your backend. The project will include a simple table for the todos you have created in your MCP server and use it as the backend. Then you'll implement authentication.

### Step 1: Create the Todos Table

To create the table, navigate through your project on Supabase and use the SQL editor to write the following code to add the todos:

```sql :collapsed-lines
-- Enable pgcrypto for gen_random_uuid
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create todos table
CREATE TABLE IF NOT EXISTS public.todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Function to keep updated_at current
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Attach trigger
DROP TRIGGER IF EXISTS set_updated_at_trigger ON public.todos;

CREATE TRIGGER set_updated_at_trigger
BEFORE UPDATE ON public.todos
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
```

At the end, set the table to row-level security. This allows related users to see their data:

```sql :collapsed-lines
-- Enable Row Level Security
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- Users can read only their own todos
CREATE POLICY "Users can view their own todos"
ON public.todos
FOR SELECT
TO authenticated
USING (user_id = (SELECT auth.uid()));

-- Users can insert only their own todos
CREATE POLICY "Users can insert their own todos"
ON public.todos
FOR INSERT
TO authenticated
WITH CHECK ((user_id IS NOT NULL) 
AND (user_id = (SELECT auth.uid())));

-- Users can update only their own todos
CREATE POLICY "Users can update their own todos"
ON public.todos
FOR UPDATE
TO authenticated 
USING (user_id = (SELECT auth.uid())) 
WITH CHECK (user_id = (SELECT auth.uid()));

-- Users can delete only their own todos
CREATE POLICY "Users can delete their own todos"
ON public.todos
FOR DELETE
USING (auth.uid() = user_id);

-- Index for faster user-specific queries
CREATE INDEX IF NOT EXISTS idx_todos_user_id
ON public.todos(user_id);
```

Since your database is now ready, you can integrate authentication with your server. First, you need to authenticate the server, get the token, and use it on the server. Then you can test the app again.

To authenticate, you need to implement the following endpoints on your server (and add your own information in place of the example info):

- GET: [https://your-mcp.example.com/.well-known/oauth-protected-resource](https://your-mcp.example.com/.well-known/oauth-protected-resource)
- OAuth 2.0 metadata: [https://auth.yourcompany.com/.well-known/oauth-authorization-server](https://auth.yourcompany.com/.well-known/oauth-authorization-server)
- OpenID Connect metadata: [https://auth.yourcompany.com/.well-known/openid-configuration](https://auth.yourcompany.com/.well-known/openid-configuration)

The OAuth-protected resource communicates with the server about how to use and register the tools, how to run them, and what to call them. The other two endpoints share the related metadata from the server

You'll need to implement those endpoints on your server and use them as a proxy to fetch data from Supabase, since it will be your main auth server.

### Step 2: Enabling the MCP Server to Connect with Supabase Auth

For this, you need to do the following:

- Enable the OAuth server at Supabase and enable the dynamic registration of tools
- Implement a page for login to use for OAuth permission

To enable the OAuth server on your Supabase, you need to go to [<VPIcon icon="iconfont icon-supabase"/>supabase.com/dashboard/project/_/auth/oauth-server](https://supabase.com/dashboard/project/_/auth/oauth-server), then follow the next steps:

- Toggle Enable OAuth server
- Allow dynamic apps
- Create your consent page: the page that LLM tools will show users when they need to grant access to the data.

![Showing how to enable dynamic apps from Supabase](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/136c2185-2d74-45f6-b981-2af946e1b330.png)

To use the consent page and see it in action, you'll need to implement the OAuth server in your MCP server first. This is what you'll do in the next section.

### Step 3: Create a Proxy Server for the MCP Server to Handle the Auth.

After enabling the OAuth server in Supabase, you can start implementing the OAuth code on the MCP server. To do that, you need a proxy code on your MCP server and to create a logging endpoint to use it. The proxy server will allow your MCP server to use Supabase's OAuth server.

You'll continue by adding the next code to the MCP server you've created earlier. At the top of your code, after the imports in the <VPIcon icon="fa-brands fa-js"/>`server.js` file, you should define the following variables:

```js title='server.js"
const SUPABASE_URL = "https://YOURPORJECT.supabase.co";
const MCP_SERVER_URL = "http://localhost:8787/mcp";
const SUPABASE_AUTH_URL = `${SUPABASE_URL}/auth/v1`;
```

Note: Don't forget to enter your own project URL for the Supabase URL. You can find it in the Supabase UI by clicking Connect at the top of the page.

Inside the createServer function and after the `if (req.method === 'OPTIONS')` condition, add the following proxy code to link your Supabase project:

```js
const OIDC_DISCOVERY_URL = `${SUPABASE_AUTH_URL}/.well-known/openid-configuration`;

if (req.method === "GET" && url.pathname === "/.well-known/openid-configuration") {
  const response = await fetch(OIDC_DISCOVERY_URL);
  const data = await response.json();
  res.writeHead(200, {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  });
  res.end(JSON.stringify(data));
  return;
}
```

Then you can add this code for the OAuth authorities server:

```js
const OAUTH_DISCOVERY_URL = `${SUPABASE_URL}/.well-known/oauth-authorization-server/auth/v1`;

if (req.method === "GET" && url.pathname === "/.well-known/oauth-authorization-server") {
  const response = await fetch(OAUTH_DISCOVERY_URL);
  const data = await response.json();
  res.writeHead(200, {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  });
  res.end(JSON.stringify(data));
  return;
}
```

Then add this code for the well-known server:

```js
// OPTIONS /.well-known/oauth-protected-resource/mcp
// GET /.well-known/oauth-protected-resource/mcp
if (req.method === "GET" && (url.pathname === "/.well-known/oauth-protected-resource/mcp" || url.pathname === "/.well-known/oauth-protected-resource")) {
  const metadata = {
    resource: MCP_SERVER_URL,
    authorization_servers: [SUPABASE_AUTH_URL],
    // Use standard OIDC scopes. Custom resource scopes are enforced server-side, not by Supabase.
    scopes_supported: ["openid", "profile", "email", "phone"],
  };
  res.writeHead(200, {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, MCP-Protocol-Version, mcp-protocol-version, authorization",
  });
  res.end(JSON.stringify(metadata));
  return;
}
```

By adding the previous code snippets, you've implemented a proxy server that fetches data from Supabase and relays it to the MCP protocol as if it were your own server.

Now you can commit your code to Git and track it in the tree:

- `git add .`
- `git commit -m "feat: add supabase proxy server"`

Since you've implemented your proxy server, you can use authentication and authorization from your MCP server to retrieve data in your tools.

### Step 4: Implementing the Consent and Login Page

On the OAuth server, you might have noticed a consent page. The goal of this page is to inform the user that they are authorizing the LLM to connect to a database or an external resource. In the next section, you will implement this page by making two steps:

- First, create a login page that lets users log in to the app.
- Second, you will create a consent page that allows the logged-in user to communicate with the LLM

You'll start by creating a new Next.js server, which gives you more flexibility when working with pages.

You can create your NextJS app with the command:

```sh
npx create-next-app@latest mcp_consent --yes
```

Navigate to the mcp_consent folder and add Supabase:

```sh
npm i @supabase/ssr
```

Add the current state of the project to your Git tracker by writing the following:

- `git add .`
- `git commit -m "init nextjs project"`

Add <VPIcon icon="iconfont icon-dotenv"/>`.env` file from your Supabase, which will include the following code:

```sh title=".env"
NEXT_PUBLIC_SUPABASE_URL=YOUR_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_KEY
```

Now you can create a login page in the next path:

The login page:

```tsx :collapsed-lines title="app/login/page.tsx"
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr/dist/module/createBrowserClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setError(null);
        alert(
          "Sign up successful! Please check your email to confirm your account.",
        );
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-8">
          Authentication
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
              placeholder="••••••••"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            Password reset or other options available upon request.
          </p>
        </div>
      </div>
    </div>
  );
}
```

The OAuth decision page:

```tsx title="app/api/oauth/decision/route.ts"
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
export async function POST(request: Request) {
  const formData = await request.formData()
  const decision = formData.get('decision')
  const authorizationId = formData.get('authorization_id') as string
  if (!authorizationId) {
    return NextResponse.json({ error: 'Missing authorization_id' }, { status: 400 })
  }
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: async () => (await cookies()).getAll(),
        setAll: async (cookiesToSet) => {
          const cookieStore = await cookies()
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    }
  )
  if (decision === 'approve') {
    const { data, error } = await supabase.auth.oauth.approveAuthorization(authorizationId)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    // Redirect back to the client with authorization code
    return NextResponse.redirect(data.redirect_url)
  } else {
    const { data, error } = await supabase.auth.oauth.denyAuthorization(authorizationId)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    // Redirect back to the client with error
    return NextResponse.redirect(data.redirect_url)
  }
}
```

The OAuth Consent page:

```tsx :collapsed-lines title="app/oauth/consent/page.tsx"
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ConsentPage({
  searchParams,
}: {
  searchParams: { authorization_id?: string };
}) {
  const authorizationId = (await searchParams).authorization_id;

  if (!authorizationId) {
    return <div>Error: Missing authorization_id</div>;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: async () => (await cookies()).getAll(),
        setAll: async (cookiesToSet) => {
          try {
            const cookieStore = await cookies();
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch (error) {
            // In Server Components, cookie writes can fail during render.
            // Route Handlers/Server Actions should handle persistence.
            console.warn(
              "Skipping cookie write in Server Component render context",
              error,
            );
          }
        },
      },
    },
  );

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to login, preserving authorization_id
    redirect(
      `/login?redirect=/oauth/consent?authorization_id=${authorizationId}`,
    );
  }

  // Get authorization details using the authorization_id
  const { data: authDetails, error } =
    await supabase.auth.oauth.getAuthorizationDetails(authorizationId);
  console.log("Auth Details: ", authDetails);
  if (error || !authDetails) {
    return (
      <div>Error: {error?.message || "Invalid authorization request"}</div>
    );
  }
  if (
    "redirect_url" in authDetails &&
    authDetails.redirect_url &&
    typeof authDetails.redirect_url === "string"
  ) {
    const redirectUrl = authDetails.redirect_url;
    console.log("Redirect URL:", redirectUrl);
    return redirect(redirectUrl);
  }
  if (!("client" in authDetails)) {
    return <div>Error: Invalid authorization details format</div>;
  }
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-4">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-md animate-fade-in-up">
        {/* Gradient border effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000" />

          {/* Content Card */}
          <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-block mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Authorization Required
              </h1>
              <p className="text-slate-400 text-sm">
                Review and authorize access to your account
              </p>
            </div>

            {/* Client Information */}
            <div className="space-y-4 mb-8 bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-slate-500 uppercase tracking-widest">
                    Application
                  </p>
                  <p className="text-lg font-semibold text-white">
                    {authDetails.client.name}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-widest">
                    Redirect URI
                  </p>
                  <p className="text-xs text-slate-300 break-all font-mono mt-1">
                    {authDetails.redirect_uri}
                  </p>
                </div>
              </div>
            </div>

            {/* Permissions Section */}
            {authDetails.scope && authDetails.scope.length > 0 && (
              <div className="mb-8">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-3 font-semibold">
                  Requested Permissions
                </p>
                <div className="space-y-2">
                  {authDetails.scope.split(" ").map((scope, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-slate-300 bg-slate-800/30 rounded-lg p-3 border border-slate-700/20"
                    >
                      <svg
                        className="w-4 h-4 text-blue-400 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{scope}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <form
              action="/api/oauth/decision"
              method="POST"
              className="space-y-3"
            >
              <input
                type="hidden"
                name="authorization_id"
                value={authorizationId}
              />

              <button
                type="submit"
                name="decision"
                value="approve"
                className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 ease-out active:scale-95"
              >
                Authorize Access
              </button>

              <button
                type="submit"
                name="decision"
                value="deny"
                className="w-full py-3 px-4 rounded-lg font-semibold text-slate-300 border-2 border-slate-600 hover:border-slate-500 hover:text-white hover:bg-slate-800/50 transition-all duration-300 ease-out active:scale-95"
              >
                Cancel
              </button>
            </form>

            {/* Security Info */}
            <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                Your data is protected with industry-standard encryption
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Now you can add the current state of the project to your Git tracker by writing the following:

- `git add .`
- `git commit -m "feat: add consent page"`

### Step 5: Testing the OAuth Implementation with MCP Server Inspector

Since you've implemented the consent page, now you can test it and check the authorization in the MCP Server Inspector. This step will help you see how OAuth works and how to test it with the inspector.

First, create a new user in Supabase for login and authentication.

- Go to: [<VPIcon icon="iconfont icon-supabase"/>supabase.com/dashboard/project/_/auth/users](https://supabase.com/dashboard/project/_/auth/users)  
    (Auth -> users from the UI)
- Click Add User -> Create a new user, then add the new user email and password.

After creating the user, you can run the projects by typing the following in different terminals:

Run your MCP server:

```sh
node server.js
```

Open your inspector:

```sh
npx @modelcontextprotocol/inspector@latest --server-url http://localhost:8787/mcp --transport http
```

Run the Next.js project to get access to the consent page:

```sh
cd mcp_consent
npm run dev
```

When you run the inspector, you can connect to your MCP Server on the left and navigate to Auth on the top tab. This will show you the authentication flow to test and run.

![OAuth Flow inside the MCP Server Inspector](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/f06db9f1-bdfa-4757-8177-21651c291666.png)

When you click Connect, go to Auth to check your options. The guided OAuth flow will show you a step-by-step guide to how the MCP Server obtains OAuth authorization and will help you debug your code if issues arise. The Check OAuth Flow button lets you connect directly and see the latest result immediately.

For the sake of speed, you can just click on the "Check OAuth Flow". This will redirect you to the login page:

![Login page screenshot](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/3a7c5090-41d2-489f-b46b-5554ebcfc149.png)

After you log in, you'll get redirected again to the consent page so that you can give consent to the LLM to access your data:

![Consent page screenshot](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/c9caa39b-4750-43ef-9c77-603898914e90.png)

Then you'll be redirected again to the MCP Server and you can check the results of the OAuth flow:

![Correct MCP Server OAuth flow](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/e43e2096-901e-4669-b965-0019810704b4.png)

In the next step, you'll harden your MCP Server functions to take your app to the next level by using OAuth for MCP Server.

### Step 6: Adding OAuth Security to Your MCP Server Tools

Congrats on implementing your OAuth flow and getting it to work! Now you'll add this flow to your MCP Server tools so it runs only when the user is authenticated.

Before updating the tools, you'll write a few helper functions to assist you during the process. First, you'll write a verification token to process every request. Then you'll update the list of MCP server tools to use the verification function instead of implementing it for each function by itself.

Inside your <VPIcon icon="fa-brands fa-js"/>`server.js` file, you'll implement a function that verifies the token with Supabase. First, import the Supabase client to use it:

```js title='server.js"
import { SupabaseClient } from "@supabase/supabase-js";
```

Then add the Supabase publishable key to use it in the client at the top of the server:

```js
const SUPABASE_PUBLISHABLE_KEY = "YOUR_KEY";
```

And update the reply todos list to get an argument of todos, instead of the in-memory array.

```js
const replyWithTodos = (message, todos) => ({
  content: message ? [{ type: 'text', text: message }] : [],
  structuredContent: { tasks: todos },
}); //outside the createTodoServer function block
```

Then you'll need to create a helper function to verify the user tokens:

```js
const verifyToken = async (token) => {
  if (!token || !token.startsWith("Bearer ")) {
    return { isValid: false, error: "Missing or invalid Authorization header" };
  }
  // Verify token with Supabase
  try {
    // use supabase client to verify token
    const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      global: {
        headers: {
          Authorization: token,
        },
      },
    });
    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user) {
      return { isValid: false, error: "Token verification failed" + (error?.message || "") };
    }
    console.log("Token verified for user:", user);
    return { isValid: true, token, user, supabase };
  } catch (error) {
    console.error("Token verification failed:", error);
    return { isValid: false, error: "Token verification failed" + (error?.message || "") };
  }
};
```

In this function, you get the token as a string, check Supabase, and return an error if the token isn't provided. If it's correct, you return the token, user data, and Supabase client.

After this, you need to have a helper function to adhere to MCP Server specs:

```js
/**
 * Build WWW-Authenticate header for 401/403 responses
 * Per RFC 9728 OAuth 2.1 Protected Resource Metadata specification
 */
function buildWwwAuthenticateHeader(error, errorDescription) {
  const resourceMetadataUrl = `${MCP_SERVER_URL}/.well-known/oauth-protected-resource`

  let header = `Bearer resource_metadata="${resourceMetadataUrl}"`

  if (error) {
    header += `, error="${error}"`
  }

  if (errorDescription) {
    header += `, error_description="${errorDescription}"`
  }

  return header
}

function returnAuthErrorResponse(resOrMessage, error = "unauthorized", errorDescription = "Missing or invalid authorization token.") {
  const wwwAuthenticate = buildWwwAuthenticateHeader(error, errorDescription);

  if (resOrMessage && typeof resOrMessage.writeHead === "function") {
    resOrMessage.writeHead(401, {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "WWW-Authenticate": wwwAuthenticate,
    });
    resOrMessage.end(JSON.stringify({ error, error_description: errorDescription }));
    return;
  }

  const message = typeof resOrMessage === "string" && resOrMessage.length > 0
    ? resOrMessage
    : errorDescription;

  return {
    content: [{ type: "text", text: message }],
    isError: true,
    statusCode: 401,
    _meta: {
      "mcp/www_authenticate": wwwAuthenticate,
    },
  };
}


function returnErrorResponse(message) {
  return {
    content: [
      {
        type: "text",
        text: message
      }
    ],
    isError: true
  };
}
```

In these helper functions, you create unique functions for errors and the OAuth error return function. At the same time, you define the OAuth-protected resources discovery specs.

Add the current state of the project to your Git tracker by writing the following:

- `git add .`
- `git commit -m "feat: add helper functions"`

Now you can apply them to your MCP Server tools, making them easier to read.

### Step 7: Updating the MCP Server Function to Handle the Authentication

After you've built the proxy to handle authentication requests, you need to update the MCP server functions and metadata to indicate whether the tool can be used with or without authentication.

Here you'll add two main things:

- The security schema.
- The logic for the function to handle.

```js
 server.registerTool(
  "list_todos",
  {
    title: "List todos",
    description: "Lists all todo items.",
    _meta: {
      "openai/outputTemplate": "ui://widget/todo.html",
      "openai/toolInvocation/invoking": "Listing todos",
      "openai/toolInvocation/invoked": "Listed todos",
    },
    securitySchemes: [
      { type: "oauth2", scopes: ["todos.read"] }
    ],
    "annotations": {
      "readOnlyHint": true,
      "openWorldHint": false,
      "destructiveHint": false,
    }
  },
  async (meta) => {
    const authHeader = meta.requestInfo.headers?.authorization;
    const authResult = await verifyToken(authHeader);
    if (!authResult?.isValid) {
      return returnAuthErrorResponse(authResult?.error);
    }
    const { data, error } = await authResult.supabase
      .from("todos")
      .select("*")
      .eq("user_id", authResult.user.user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Error listing todos:", error);
      return returnErrorResponse(error.message);
    }
    return replyWithTodos(null, data ?? []);
  }
)
```

In this code, you've done the following:

- Updated the metadata to have a security schema that tells the MCP server to request authentication when invoking these tools.
- Added an annotation, which helps the LLM model know how this function will perform. The annotations declare three types of changes that the tool can make:
  - Read Only Hint: tells the LLM whether the tool is read-only and only shows data
  - Open World Hint: tells the LLM whether the tool can access external data, websites, or the internet.
  - Destructive Hint: tells the LLM if this is a destructive function, like deleting data permanently for the user
- Then, in the function itself, you retrieved the metadata from the callback and verified the token using the Supabase helper function. After that, you used the basic Supabase functions to retrieve the data and any errors that might occur.

You can get the authorization from the metadata in the callback function itself.

In the previous function, you used the Supabase client to access the todos table, select all columns where the user_id condition is met, and order them by creation time. If the Supabase client returns an error, you return an error. Here's the code snippet that relates to Supabase:

```js
const { data, error } = await authResult.supabase
  .from("todos")
  .select("*")
  .eq("user_id", authResult.user.user.id)
  .order("created_at", { ascending: false });

if (error) {
  console.error("Error listing todos:", error);
  return returnErrorResponse(error.message);
}
```

For the other function, you have the same logic applied, yet instead of select, you'll use either `insert` or `update`.

For the other functions, you can follow the same principles and use the same code. The only change is that first you get the data, then the metadata in the callback function:

```js
  server.registerTool(
  "add_todo",
  {
    title: "Add todo",
    description: "Creates a todo item with the given title.",
    inputSchema: addTodoInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/todo.html",
      "openai/toolInvocation/invoking": "Adding todo",
      "openai/toolInvocation/invoked": "Added todo",
    },
    securitySchemes: [
      { type: "oauth2", scopes: ["todos.write"] }
    ],
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true,
    }
  },
  async (args, meta) => {
    const authorizationHeader = meta.requestInfo.headers?.authorization;
    console.log("Authorization header:", authorizationHeader);
    const authResult = await verifyToken(authorizationHeader);
    console.log("Auth result:", authResult);
    if (!authResult?.isValid) {
      return returnAuthErrorResponse(authResult?.error);
    }
    const title = args?.title?.trim?.() ?? "";
    if (!title) return returnErrorResponse("Missing title.");
    let { data, error } = await authResult.supabase
      .from("todos")
      .insert({ title, user_id: authResult.user.user.id })
      .select("*");
    if (error) {
      console.error("Error adding todo:", error);
      return returnErrorResponse(error.message);
    }
    return replyWithTodos(`"${title}"`, data);
  }
);
```

Here's the updated function code:

```js
   server.registerTool(
  "complete_todo",
  {
    title: "Complete todo",
    description: "Marks a todo as done by id.",
    inputSchema: completeTodoInputSchema,
    _meta: {
      "openai/outputTemplate": "ui://widget/todo.html",
      "openai/toolInvocation/invoking": "Completing todo",
      "openai/toolInvocation/invoked": "Completed todo",
    },
    securitySchemes: [
      { type: "oauth2", scopes: ["todos.write"] }
    ],
    "annotations": {
      "readOnlyHint": false,
      "openWorldHint": false,
      "destructiveHint": true,
    }
  },
  async (args, meta) => {
    const authorizationHeader = meta.requestInfo.headers?.authorization;
    const authResult = await verifyToken(authorizationHeader);
    if (!authResult?.isValid) {
      return returnAuthErrorResponse(authResult?.error);
    }
    const id = args?.id;
    if (!id) return replyWithTodos("Missing todo id.");
    const { data, error } = await authResult.supabase
      .from("todos")
      .update({ completed: true })
      .eq("id", id)
      .eq("user_id", authResult.user.user.id)
      .select("*");
    if (error) {
      console.error("Error completing todo:", error);
      return returnErrorResponse(error.message);
    }
    if (!data || data.length === 0) {
      return replyWithTodos(`Todo ${id} was not found.`);
    }
    return replyWithTodos(`Completed "${data[0].title}".`, data);
  }
);
```

By applying this, you already have a fully functioning MCP server connected to your Supabase, and you can rely on it to run.

Add the current state of the project to your Git tracker by writing the following:

- `git add .`
- `git commit -m "feat: update tools to use database"`

### Step 8: Testing the Server with Supabase:

To do this, you can follow the same steps as in "Testing the OAuth implementation with MCP Server Inspector." But as an extra point, keep an eye on your database table in the Supabase UI, where you can see the added and updated todos. Then you can check the tools, test your todos, and even use ngrok to test them in the ChatGPT UI.

---

## How to Deploy your MCP Server to DigitalOcean

Since you have your MCP server running and working well, you can now deploy it to DigitalOcean using their App service.

First, upload your code to GitHub and commit it with the following command:

```sh
gh repo create todo_mcp_server --private --source=. --remote=upstream
git push
```

This command creates a new repo on GitHub, sets your stream to GitHub, and pushes the current branches to GitHub.

Then log in to your DigitalOcean account and go to Apps ([<VPIcno icon="fa-brands fa-digital-ocean"/>cloud.digitalocean.com/apps)](https://cloud.digitalocean.com/apps)).

Click on Create app:

![](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/b306ee0f-ccd1-4d3c-b928-cadb0c78d760.png)

Choose the source as GitHub:

![Digital Ocean showing how to get a repo from GitHub](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/e6a3c368-d5e4-4529-8e98-22023ca285df.png)

Then you need to select your repository and your branch. Write the source directories as: `/` and `mcp_consent`. You're doing this because you'll be running two apps: the MCP Server and the consent and login page frontend.

Next, enable auto-deploy if you want the app to update whenever you push your code to GitHub:

![](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/a16462f9-41fb-4412-885e-f91eb6b4958a.png)

Since we've created two source directories, you'll have two apps and will have to manage them separately.

![](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/71bc8d47-2098-41ca-b168-aba6a3a5e3a9.png)

You'll use the MCP server in the first app and the frontend for the second app. For that reason, you'll update the network to have the server under the `/server` route:

![](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/2b58cf42-6ed2-4c91-9395-f3114060d2a9.png)

And you'll downsize the CPU to minimize the cost for this demo:

![](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/d7a57963-7b4d-415b-bd8a-e02ea14b044e.png)

You can update the size later based on your needs for the app.

As for the last step here, you'll update the run command to `node server.js` to ensure the app is running correctly.

![](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/8a8c0357-bd33-445a-a25a-cb90a3682bdd.png)

For the frontend project, you'll have to click on the second app, update the inputs as well, and add the environment variables:

First, you can downsize the app:

![](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/f82e0305-d3a2-4fc7-bc14-08d6c34a7174.png)

Update the build and run commands for the Next js server:

![](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/1341f752-85e3-4e94-b816-b3c1413a7b73.png)

Then you can check the route of this web app and set it as the main one:

![](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/2f4e4e0f-20bf-46c8-ba1e-80ccb9c11167.png)

At the end, you need to add the <VPIcon icon="iconfont icon-dotenv"/>`.env` variables from your <VPIcon icon="iconfont icon-dotenv"/>`.env` file to the project. You can copy and paste them directly from your <VPIcon icon="fas fa-folder-open"/>`mcp_const/`<VPIcon icon="iconfont icon-dotenv"/>`.env` file to the project.

![](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/4dd9ac38-ed69-4c0d-b5da-eb2dfef41be8.png)

After setting them up, you can create and run the app, which will generate a public URL from DigitalOcean that you can use in the ChatGPT UI again to test it and run the project.

![Showing how to copy the link from Digital Ocean](https://cdn.hashnode.com/uploads/covers/66e02a4159bd66d90e61a22c/ef889fa2-bdd5-47ed-84e7-816cb0c71a30.png)

Before adding the project to test it in ChatGPT, you need to update the consent page URL in Supabase [from here](https://supabase.com/dashboard/project/_/auth/url-configuration).

Instead of having`localhost:300`, you can add the link from your DigitalOcean account.

At this point, you can test the server with your DigitalOcean by using the following links:

- YOUR_DIGITAL_OCEAN.com/server/mcp
- YOUR_DIGITAL_OCEAN.com/login
- YOUR_DIGITAL_OCEAN.com/oauth/consent

---

## How to Publish Your ChatGPT App

After running your app, you need to host it. You can simply upload it to GitHub and host it on DigitalOcean as a JavaScript app. You can get the URL from DigitalOcean, then go to your OpenAI [<VPIcon icon="iconfont icon-openai"/>dashboard](https://platform.openai.com/apps-manage), verify yourself as a company or a solo developer, and upload the file there.

To publish your app to ChatGPT, you'll need to provide the following information:

- **App Info:** the basic information about your app, including the logo, description, a video demo, website, support, privacy policy, and terms of service URLs (plus a few more details about monetizing your app if you have done that).
- **MCP Server:** the links to your MCP server, the tools you have, and how you'll use them, plus a verification token for your URL that you'll need to add to your project as a path.
- **Testing:** you'll need to provide at least 5 test cases for your MCP server so OpenAI can test its functionality. They require you to have coverage over all the major use cases that you intend to support and include all information required to successfully run the test case.<br/>In the tests you share:
  - Scenario: where you describe the use case to test (for example, “Research flights”, “Create a slideshow”, “Find a hiking trail”).
  - User prompt: The exact prompt or interaction you should conduct to begin the test.
  - Tool triggered: Which tools should be called? You have already implemented them.
  - Expected output: The output or experience you should expect to receive back from the MCP server.
  - Then you share the negative cases with the same examples.
- **Screenshots:** App screenshots for the directory. You can use this public [<VPIcon icon="fa-brands fa-figma"/>Figma](https://figma.com/design/SIiC9BoS6Jkr2oz9JoGFlt/-Public--ChatGPT-Apps---Screenshots?node-id=0-1&p=f&t=npK72eKLrTmXAiZ0-0) to help you with your design. Here, you should upload 1–4 screenshots of your app widget UI in PNG or JPG format, each with a width of 706px and a height of 400–860px (at least one must be 2× retina quality). The first three screenshots are publicly visible in install views across all screen sizes and locales. Ensure the images show only your widget UI – no ChatGPT interface, user prompts, model responses, or embedded text.
- **Global:** shows the text and localization for your app. You can also select specific countries to publish to.
- **Submit:** This requires you to write the release notes and run a few compliance checks on your app.

After uploading and updating your project, you can wait for OpenAI to review your project and get the results from them.

---

## What to Do Next

You now have the basic knowledge you need to explore MCP servers and ChatGPT apps. You can dive deeper by reading the documentation and checking the related tools and platforms for building apps like [Skybridge (<VPIcon icon="iconfont icon-github"/>`alpic-ai/skybridge`)](https://github.com/alpic-ai/skybridge).

If you liked this tutorial, you can follow me on [<VPIcon icon="fa-brands fa-youtube"/>Twitter (<VPIcon icon="fa-brands fa-x-twitter"/>`a0m0rajab`)](https://twitter.com/a0m0rajab) or [<VPIcon icon="fa-brands fa-youtube"/>YouTube](https://youtube.com/@hadithtech/live) and run the full project demo script on [GitHub (<VPIcon icon="iconfont icon-github"/>`a0m0rajab/OpenAi_MCP_Supabase`)](https://github.com/a0m0rajab/OpenAi_MCP_Supabase).

::: note Acknowledgments:

Thanks to [Ahmed Saleh (<VPIcon icon="fa-brands fa-linkedin"/>`ahmedmukbilsaleh`)](https://linkedin.com/in/ahmedmukbilsaleh/) for supporting me with the ChatGPT Apps concept, Abbey from freeCodeCamp for her patience during the editorial process, and the Supabase and OpenAI teams for their awesome work and documentation!

:::

::: info References:

This blog would not have been written without the hard work of the OpenAI, Supabase, and DigitalOcean teams that they put into the following documentation:

```component VPCard
{
  "title": "How to Deploy from Monorepos | DigitalOcean Documentation",
  "desc": "Deploy applications from monorepos in App Platform.",
  "link": "https://docs.digitalocean.com/products/app-platform/how-to/deploy-from-monorepo//",
  "logo": "https://docs.digitalocean.com/favicon.png",
  "background": "rgba(148,198,204,0.2)"
}
```

<SiteInfo
  name="Apps SDK | OpenAI Developers"
  desc="Learn how to use Apps SDK by OpenAI. Our framework to build apps for ChatGPT."
  url="https://developers.openai.com/apps-sdk"
  logo="https://developers.openai.com/favicon.png"
  preview="https://developers.openai.com/apps-og-card.png"/>

<SiteInfo
  name="Getting Started with OAuth 2.1 Server | Supabase Docs"
  desc="Learn how to enable OAuth 2.1 and register client applications in your Supabase project"
  url="https://supabase.com/docs/guides/auth/oauth-server/getting-started?queryGroups=oauth-setup&oauth-setup=programmatically"
  logo="https://supabase.com/docs/favicon/favicon-196x196.png"
  preview="https://obuldanrptloktxcffvn.supabase.co/functions/v1/og-images?site=docs&type=auth&title=Getting%20Started%20with%20OAuth%202.1%20Server&description=Learn%20how%20to%20enable%20OAuth%202.1%20and%20register%20client%20applications%20in%20your%20Supabase%20project"/>

<SiteInfo
  name="Authorization - Model Context Protocol"
  desc="The Model Context Protocol provides authorization capabilities at the transport level, enabling MCP clients to make requests to restricted MCP servers on behalf of resource owners. This specification defines the authorization flow for HTTP-based transports."
  url="https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization/"
  logo="https://modelcontextprotocol.io/mintlify-assets/_mintlify/favicons/mcp/ebiVJzri-bsiCfVZ/_generated/favicon-dark/favicon.ico"
  preview="https://raw.githubusercontent.com/modelcontextprotocol/docs/2eb6171ddbfeefde349dc3b8d5e2b87414c26250/images/og-image.png"/>

<SiteInfo
  name="Rodriguespn/mcp-auth-edge"
  desc="MCP server with auth served on Edge Functions."
  url="https://github.com/Rodriguespn/mcp-auth-edge/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4a7a36718b404dc7c03e178c87b440fe7ada614ec599e04722a1f47c1682c8cf/Rodriguespn/mcp-auth-edge"/>


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Your Own MCP Server and Publish Your ChatGPT App with Supabase Auth and DigitalOcean",
  "desc": "A new type of app is emerging with the development of LLMs and AI-native apps. It lives inside an AI chat (like ChatGPT) rather than being a fully native web or mobile app. In this tutorial, you'll le",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-your-own-mcp-server-and-publish-your-chatgpt-app/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
