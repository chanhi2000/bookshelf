---
lang: en-US
title: "How to Build a To-Do List MCP Server Using TypeScript – with Auth, Database, and Billing"
description: "Article(s) > How to Build a To-Do List MCP Server Using TypeScript – with Auth, Database, and Billing"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - Data Science
  - PostgreSQL
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
  - express
  - expressjs
  - express-js
  - data-science
  - sql
  - postgres
  - postgresql
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - mcp
  - model-context-protocols
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a To-Do List MCP Server Using TypeScript – with Auth, Database, and Billing"
    - property: og:description
      content: "How to Build a To-Do List MCP Server Using TypeScript – with Auth, Database, and Billing"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-to-do-list-mcp-server-using-typescript/
prev: /programming/ts/articles/README.md
date: 2025-10-23
isOriginal: false
author:
  - name: Shola Jegede
    url : https://freecodecamp.org/news/author/sholajegede/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1761162036666/77972b3f-9dc8-404f-b40d-fb70ee73e2a5.png
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

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
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
  name="How to Build a To-Do List MCP Server Using TypeScript – with Auth, Database, and Billing"
  desc="In this tutorial, you’ll build a To-Do list MCP server using TypeScript. You’ll learn how to implement authentication, persistence, and billing, to make the server robust and functional for real users. By the end, you’ll have a working MCP server tha..."
  url="https://freecodecamp.org/news/how-to-build-a-to-do-list-mcp-server-using-typescript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1761162036666/77972b3f-9dc8-404f-b40d-fb70ee73e2a5.png"/>

In this tutorial, you’ll build a To-Do list MCP server using TypeScript. You’ll learn how to implement authentication, persistence, and billing, to make the server robust and functional for real users.

By the end, you’ll have a working MCP server that:

- Authenticates users with Kinde.
- Stores to-do data in a Neon Postgres database.
- Enforces billing limits and supports upgrades.
- Exposes all these features as MCP tools inside Cursor.

This article will walk you through each step, helping you understand design decisions that you can adapt for your own projects.

---

## What You’ll Learn

- [Database Setup with Neon PostgreSQL](#heading-database-setup-with-neon-postgresql)
- [Authentication with Kinde](#heading-authentication-with-kinde)
- [MCP Server Implementation (with Billing System Integration)](#heading-mcp-server-implementation-with-billing-system-integration)
- [Testing the Complete System](#heading-testing-the-complete-system)
- [Troubleshooting](#heading-troubleshooting)
- [Final MCP Server Architecture](#heading-final-mcp-server-architecture)

---

## Why Go Beyond Basic MCP Servers?

If you read this [**freeCodeCamp MCP handbook**](/freecodecamp.org/news/how-to-build-a-custom-mcp-server-with-typescript-a-handbook-for-developers.md), you learned how to set up a simple MCP server in TypeScript. That’s useful for learning the protocol, but it doesn’t reflect what you need in production.

A real application requires:

- **Authentication** so each user has their own data and permissions.
- **Persistence** so data is stored in a reliable database.
- **Billing** so you can enforce limits and monetize usage.

Without these, an MCP server is just a demo.

---

## What You’ll Build

In this tutorial, you’ll build a to-do MCP server with TypeScript that includes the essentials of a production-ready backend:

- **Authentication** with Kinde
- **Database persistence** with Neon Postgres
- **Billing enforcement** with a free tier and upgrade path
- **MCP tool exposure** so all of this works seamlessly

By the end, you’ll have an MCP server that feels more like the backend of a SaaS app and a template you can extend for your own ideas.

::: note Prerequisites

Before we start, you'll need:

**Accounts & Services (all free to use):**

- [<VPIcon icon="fas fa-globe"/>Kinde Account](https://kinde.com) → for authentication and billing
- [<VPIcon icon="fas fa-globe"/>Neon Account](https://neon.com) → for PostgreSQL database
- Node.js (v18+) ([<VPIcon icon="fa-brands fa-node"/>download](https://nodejs.org/en/download))
- Cursor IDE → for MCP integration and tool testing ([<VPIcon icon="iconfont icon-cursor"/>download](https://cursor.com/download))

**Development Tools:**

- Terminal/Command line access
- Git (optional, for version control)

:::

---

## Project Setup

First, create a new folder:

```sh
mkdir todo-mcp-server
cd todo-mcp-server
```

Then initialize a Node.js project:

```sh
npm init -y
```

Next, install the dependencies your server will need:

```sh
npm install @modelcontextprotocol/sdk @neondatabase/serverless @kinde-oss/kinde-typescript-sdk express jsonwebtoken jwks-client express-session
```

The `@modelcontextprotocol/sdk` package gives us everything we need to build and expose MCP servers and tools. We’re using `@neondatabase/serverless` to connect to a Neon Postgres database, and `@kinde-oss/kinde-typescript-sdk` handles authentication and billing through Kinde.

We’ll also install `express`, which makes it easy to define routes and handle middleware. To verify user tokens from Kinde, we’ll use `jsonwebtoken` together with `jwks-client`. And finally, `express-session` will take care of managing session state so users can stay logged in across requests.

Next, set up TypeScript and a few type definitions for development:

```sh
npm install -D typescript @types/node @types/express @types/express-session tsx
```

The `typescript` package enables TypeScript in your project so you can write strongly typed code. The `@types/*` packages provide type definitions for Node.js, Express, and the session middleware, giving you better autocomplete and error checking in your editor.

Finally, `tsx` makes it super easy to run TypeScript files directly without the need to pre-compile them before running your app.

Then create a <VPIcon icon="fas fa-file-lines"/>`.env` file in your project root and paste these variables:

```sh title=".env"
# Database
DATABASE_URL=postgresql://user:pass@host:port/db

# Kinde Authentication
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_CLIENT_ID=your_client_id
KINDE_CLIENT_SECRET=your_client_secret

# Security
JWT_SECRET=your_secret_key

# Environment
NODE_ENV=development
```

This stores all the credentials that you’ll be using for this project.

Next, create a <VPIcon icon="iconfont icon-json"/>`tsconfig.json` in the project root to tell the TypeScript compiler how to handle your code:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

Finally, update your <VPIcon icon="iconfont icon-json"/>`package.json` scripts

```json title="package.json"
{
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/server.ts",
    "start": "node dist/server.js",
    "auth-server": "tsx src/kinde-auth-server.ts",
    "setup-db": "tsx src/setup-db.ts"
  }
}
```

---

## Database Setup with Neon PostgreSQL

To power your to-do MCP server, you’ll use Neon, a serverless PostgreSQL platform. This gives us a fully managed, scalable database without worrying about infrastructure.

### 1. Connect your Neon Database

- Sign up or log in to your [<VPIcon icon="fas fa-globe"/>Neon account console](https://console.neon.tech).
- Create a new project.
- Copy the connection string, you’ll need it in your <VPIcon icon="fas fa-file-lines"/>`.env` file.

### 2. Create your DB File

Inside your project, create a new file in your <VPIcon icon="fas fa-folder-open"/>`src/` folder and name it <VPIcon icon="iconfont icon-typescript"/>`setup-db.ts`. This file will create the tables, indexes, and schema your app relies on.

Database Architecture Overview:

```md
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   setup-db.ts   │───▶│  Neon Database  │───▶│   PostgreSQL    │
│   (Schema)      │    │   (Serverless)  │    │   (Tables)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```
<!-- TODO: mermaid화-->

### 3. Step-by-Step Breakdown of <VPIcon icon="iconfont icon-typescript"/>`setup-db.ts`

#### Step 1: Imports and Database Connection

Start by importing the packages you’ll need and setting up your database connection:

```ts title="setup-db.ts"
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);
```

The `dotenv` package loads your environment variables from a <VPIcon icon="fas fa-file-lines"/>`.env` file so you don’t have to hardcode secrets in your code. The `neon` function connects your app to your Neon Postgres database, and the `sql` variable gives you a clean, type-safe way to run queries.

At this point, your app has everything it needs to talk to the database.

#### Step 2: Main Setup Function

Now let’s create a function to handle the database setup process:

```ts title="setup-db.ts"
async function setupDatabase() {
  console.log('Setting up database schema...');
  try {
    // Database operations here
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}
```

This function keeps all your schema creation logic in one place, making it easy to manage. It also catches and logs any errors instead of failing silently, so you’ll immediately know if something goes wrong. The console messages give you real-time feedback as the setup runs which is super helpful when you’re debugging or deploying.

#### Step 3: To-Dos Table

Next, create a table to store all user to-dos:

```ts title="setup-db.ts"
await sql`
  CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
```

This table holds every user’s tasks. The `user_id` column links each to-do to the user who created it, while the `completed` field tracks whether a task is done or still pending. The automatic `created_at` and `updated_at` timestamps make it easy to sort tasks or track their history over time.

#### Step 4: Users Table

Now, let’s define a table to manage user accounts and billing details:

```ts title="setup-db.ts"
await sql`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL,
    name TEXT,
    email TEXT,
    subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'active', 'cancelled')),
    plan TEXT DEFAULT 'free',
    free_todos_used INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;
```

This table stores each user’s basic information along with their subscription details. The `user_id` value comes directly from Kinde during authentication. The `subscription_status` and `free_todos_used` columns help you enforce billing tiers and limit how many free tasks a user can create before needing to upgrade.

#### Step 5: Performance Indexes

Next, let’s add a few indexes to make common database operations faster:

```ts title="setup-db.ts"
await sql`
  CREATE INDEX IF NOT EXISTS idx_todos_user_id ON todos(user_id)
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at)
`;

await sql`
  CREATE INDEX IF NOT EXISTS idx_users_user_id ON users(user_id)
`;
```

These indexes help speed up lookups and sorting. The first one lets the database quickly find to-dos that belong to a specific user. The second makes it faster to sort tasks by their creation date. And the last one allows fast lookups of users based on their Kinde `user_id`.

#### Step 6: Success Logging

After everything runs, it’s helpful to log a clear summary of what was created:

```ts title="setup-db.ts"
console.log('✅ Database schema created successfully!');
console.log('📋 Tables created:');
console.log('  - todos (id, user_id, title, description, completed, created_at, updated_at)');
console.log('  - users (id, user_id, subscription_status, plan, free_todos_used, created_at, updated_at)');
console.log('🔍 Indexes created for optimal performance');
```

These logs give you immediate feedback once the setup completes. They show exactly which tables and indexes were created, making it easy to confirm that your database schema is ready to go and everything ran as expected.

#### Step 7: Error Handling

```ts title="setup-db.ts"
try {
} catch (error) {
  console.error('❌ Error setting up database:', error);
  process.exit(1);
}
```

This handles any database setup errors gracefully.

#### Step 8: Update your <VPIcon icon="fas fa-file-lines"/>`.env` file in your project root

with your Neon database connection string:

```sh title=".env"
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
```

#### Step 9: Function Execution

At the bottom of <VPIcon icon="iconfont icon-typescript"/>`setup-db.ts`, run the function:

```ts
setupDatabase();
```

This immediately executes the database setup when the script runs.

Now, run this command in your CLI:

```sh
npm run setup-db
```

Expected output:

```plaintext title="output"
🚀 Setting up database schema...
✅ Database schema created successfully!
📋 Tables created:
  - todos (id, user_id, title, description, completed, created_at, updated_at)
  - users (id, user_id, subscription_status, plan, free_todos_used, created_at, updated_at)
🔍 Indexes created for optimal performance
```

### 4. Full <VPIcon icon="iconfont icon-typescript"/>`setup-db.ts` File

You can view the complete implementation of the <VPIcon icon="iconfont icon-typescript"/>`setup-db.ts` file in the [GitHub repo](https://github.com/sholajegede/todo_mcp_server/blob/main/src/setup-db.ts) and copy it directly into your project.

---

## Authentication with Kinde

To secure your MCP server, you’ll use [<VPIcon icon="fas fa-globe"/>Kinde](https://kinde.com), an authentication provider that makes it easy to handle logins, user sessions, and tokens.

You’ll also connect Kinde to your Neon database so new users are automatically created when they log in.

### 1. Create a Kinde Application

- Go to the [<VPIcon icon="fas fa-globe"/>Kinde Dashboard](https://app.kinde.com/admin).
- Create a new application.
- Note down these values (you’ll use them shortly):
  - **Domain**: [<VPIcon icon="fas fa-globe"/>`your-domain.kinde.com`](https://your-domain.kinde.com)
  - **Client ID**: `your-client-id`
  - **Client Secret**: `your-client-secret`

### 2. Configure Kinde Settings

In your Kinde dashboard, save these URLs as your:

- Redirect URL → `http://localhost:3000/callback`
- Logout URL → `http://localhost:3000`

### 3. Environment Variables

Update the <VPIcon icon="fas fa-file-lines"/>`.env` file in your project root with the credentials from your Kinde Dashboard:

```sh title=".enve"
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_CLIENT_ID=your_client_id
KINDE_CLIENT_SECRET=your_client_secret
```

### 4. Create the Kinde Auth Server

You’ll build an Express server (<VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`kinde-auth-server.ts`) to handle authentication. This server will manage OAuth login and logout with Kinde, store user sessions, and automatically create or update users in your Neon database whenever they sign in.

#### 4.1: Dependencies and Setup

Start by importing the packages you’ll need:

```ts title="kinde-auth-server.ts"
import express from 'express';
import session from 'express-session';
import { createKindeServerClient, GrantType, SessionManager } from '@kinde-oss/kinde-typescript-sdk';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
```

The `express` import powers the web server that will handle authentication routes. `express-session` manages user sessions so you can persist login state between requests. The `@kinde-oss/kinde-typescript-sdk` package is the official Kinde SDK, which handles OAuth flows and user authentication.

You’ll use `jsonwebtoken` to decode and verify user tokens, while `dotenv` loads environment variables from your <VPIcon icon="fas fa-file-lines"/>`.env` file. Finally, `@neondatabase/serverless` connects your server to the Neon Postgres database where user data will be stored.

#### 4.2: Connect to Your Database

```ts title="kinde-auth-server.ts"
const sql = neon(process.env.DATABASE_URL!);
```

This initializes a type-safe SQL client using your `DATABASE_URL`.

#### 4.3: Extend login Session

```ts title="kinde-auth-server.ts"
declare module 'express-session' {
  interface SessionData {
    accessToken?: string;
    idToken?: string;
    userInfo?: any;
    userName?: string;
    userEmail?: string;
  }
}
```

This extends `express-session` types so you can store Kinde tokens and user info directly in the session.

#### 4.4: Configure Sessions

Now, let’s configure session management so users can stay logged in across requests:

```ts title="kinde-auth-server.ts"
app.use(session({
  secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  resave: true,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    sameSite: 'lax'
  }
}));
```

The `secret` value is used to sign and verify session cookies, ensuring that sessions can’t be tampered with. The cookie settings keep users logged in for up to 7 days and make sure session tokens persist even after a browser refresh.

Setting `httpOnly` helps protect against cross-site scripting (XSS) attacks, while `sameSite: 'lax'` allows users to log in across different origins without breaking authentication.

#### 4.5: Create a Session Manager Factory

Next, you’ll define a small helper function to manage session data for each request:

```ts title="kinde-auth-server.ts"
const createSessionManager = (req: any): SessionManager => ({
  getSessionItem: async (key: string) => req.session?.[key],
  setSessionItem: async (key: string, value: any) => {
    if (!req.session) req.session = {};
    req.session[key] = value;
  },
  removeSessionItem: async (key: string) => {
    if (req.session) delete req.session[key];
  },
  destroySession: async () => {
    req.session = {};
  }
});
```

This function creates a session manager that’s tied to each request. It provides a consistent way to store, retrieve, and clear session data which is exactly what the Kinde SDK needs to keep track of tokens and user info during authentication.

#### 4.6: Create the Kinde Client

Next, set up the Kinde client that will handle the OAuth login and logout flow:

```ts title="kinde-auth-server.ts"
const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
  authDomain: process.env.KINDE_ISSUER_URL!,
  clientId: process.env.KINDE_CLIENT_ID!,
  clientSecret: process.env.KINDE_CLIENT_SECRET!,
  redirectURL: '<http://localhost:3000/callback>',
  logoutRedirectURL: '<http://localhost:3000>',
});
```

This connects your app to Kinde using the **Authorization Code** grant type which is the most secure option for server-side applications like this one.

The `redirectURL` and `logoutRedirectURL` define where users should be sent after logging in or out.

#### 4.7: Create the Home Page Route (`GET /`)

Then you’ll define a basic route for your home page that checks whether a user is logged in:

```ts title="kinde-auth-server.ts"
app.get('/', (req, res) => {
  const token = req.session?.accessToken;
  const userInfo = req.session?.userInfo;

  if (token) {
    // Show logged-in state with tokens
  } else {
    // Show login button
  }
});
```

This route reads the session to determine if a user is authenticated. If a token exists, you can display their account details or dashboard. Otherwise, you’ll show a login button that directs them to Kinde’s sign-in page.

#### 4.8: Create the Login Route (`GET /login`)

Now, add a route that starts the OAuth login process:

```ts title="kinde-auth-server.ts"
app.get('/login', async (req, res) => {
  try {
    const sessionManager = createSessionManager(req);
    const loginUrl = await kindeClient.login(sessionManager);
    res.redirect(loginUrl.toString());
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Login failed');
  }
});
```

When users visit this route, your app uses the Kinde client to generate a secure login URL and redirects them to Kinde’s hosted login page. Once they log in, Kinde will send them back to your callback route with the necessary tokens.

#### 4.9: OAuth Callback Route (`GET /callback`)

This is where Kinde redirects users back after login. First, you’ll get the authorization `code` from Kinde for token exchange:

```ts title="kinde-auth-server.ts"
const fullUrl = `http://${req.headers.host}${req.url}`;
const url = new URL(fullUrl);
const code = url.searchParams.get('code');
```

Next, you’ll exchange this code for tokens that will be needed for API calls:

```ts title="kinde-auth-server.ts"
const tokenResponse = await fetch(`${process.env.KINDE_ISSUER_URL}/oauth2/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.KINDE_CLIENT_ID!,
    client_secret: process.env.KINDE_CLIENT_SECRET!,
    code: code,
    redirect_uri: 'http://localhost:3000/callback',
  }),
});
```

Then, you’ll store these tokens in the session for future requests so users don't need to login every time:

```ts title="kinde-auth-server.ts"
req.session.accessToken = tokenData.access_token;
req.session.idToken = tokenData.id_token;
req.session.userInfo = tokenData;
```

The next thing you’ll do is to extract the user’s information from JWT and then store this in your database

```ts title="kinde-auth-server.ts"
const user = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
req.session.userName = user.given_name || user.name || 'User';
req.session.userEmail = user.email || 'user@example.com';
```

Finally, add this code that will automatically create or update the user in the database so your MCP server can track to-dos and billing:

```ts title="kinde-auth-server.ts"
const existingUser = await sql`SELECT * FROM users WHERE user_id = ${userId}`;

if (existingUser.length === 0) {
  await sql`
    INSERT INTO users (user_id, name, email, subscription_status, plan, free_todos_used)
    VALUES (${userId}, ${userName}, ${userEmail}, 'free', 'free', 0)
  `;
} else {
  await sql`
    UPDATE users 
    SET name = ${userName}, email = ${userEmail}
    WHERE user_id = ${userId}
  `;
}
```

#### 4.10: Create the Logout Route (`GET /logout`)

```ts title="kinde-auth-server.ts"
app.get('/logout', async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log('Session destroy error:', err);
      }
      res.redirect('/');
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).send('Logout failed');
  }
});
```

This route simply destroys the user’s session, removing all stored tokens and user information. Once the session is cleared, it redirects the user back to the home page, effectively logging them out of the app.

### 5. Complete Authentication Flow

```md
1. User visits / → sees login button.
2. Clicks login → goes to Kinde.
3. Logs in → redirected back to /callback.
4. Callback exchanges code for tokens.
5. Tokens stored in session.
6. User is created/updated in database.
7. User can now access the MCP server.
```

### 6. Why This Matters

By placing Kinde in front of your MCP server, you get a secure and seamless authentication layer without the extra trouble of handling passwords or tokens manually. Your users can log in safely, and their sessions persist across page refreshes without the need to log in again each time they revisit your app.

Every new user who signs in is automatically added to your Neon database, making it easy to track accounts and usage. This setup also lays the groundwork for more advanced features later on, like enforcing billing limits or managing user-specific to-dos.

### 7. Key Connections

- **Session ↔ Database**: Sync user data
- **Kinde ↔ Session**: Tokens flow from Kinde to session storage
- **Session ↔ MCP**: Tokens passed into the server for access control
- **Database ↔ MCP**: User billing + to-dos read from Neon

### 8. Full <VPIcon icon="iconfont icon-typescript"/>`kinde-auth-server.ts` File

You can view the complete implementation of the <VPIcon icon="iconfont icon-typescript"/>`kinde-auth-server.ts` file in the [GitHub repo (<VPIcon icon="iconfont icon-github"/>`sholajegede/todo_mcp_server`)](https://github.com/sholajegede/todo_mcp_server/blob/main/src/kinde-auth-server.ts) and copy it directly into your project.

---

## MCP Server Implementation (with Billing System Integration)

Now it’s time to create the main file for your MCP server. This file acts as the entry point, wiring up your database, authentication, tool handlers, and overall flow into a single server.

### 1. Create Your File

Inside your project, create a new file:

```sh
touch src/server.ts
```

This file will contain the full implementation of your MCP server.

### 2. Project Setup and Imports

At the top of the file, import the dependencies you’ll need:

```ts title="server.ts"
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
```

Each import in your MCP server has a specific purpose. The `Server` class is the foundation that powers your entire implementation. It listens for requests, manages responses, and keeps track of all registered tools. The `StdioServerTransport` handles communication between your MCP server and other tools through standard input and output, which is exactly how Cursor connects behind the scenes.

The `CallToolRequestSchema` and `ListToolsRequestSchema` act as validators, ensuring every incoming request follows the correct structure before it’s processed. This reduces errors and keeps communication between your tools and the MCP client consistent.

`neon` connects your server to the Neon PostgreSQL database, providing a clean way to manage persistent data like users and to-dos. The `jsonwebtoken` library decodes and verifies tokens from Kinde, letting you identify and authenticate users securely.

`fs` is used to read and write authentication tokens locally, which means users don’t need to log in every time. Finally, `path` helps manage file paths cleanly across different systems, keeping everything organized and portable.

Together, these imports form the backbone of your server’s logic, handling authentication, database access, and reliable communication with Cursor.

### 3. Database Connection and Configuration

Next, configure your database connection and token storage:

```ts title="server.ts"
const sql = neon(process.env.DATABASE_URL!);
const TOKEN_FILE = '.auth-token';
```

The `sql` constant creates a live connection to your Neon PostgreSQL database using the `DATABASE_URL` environment variable. Think of it as the bridge that lets your MCP server talk to your database with every query, insert, and update running through this connection.

It’s what allows your server to persist user data, to-dos, and billing information reliably without having to manage complex configurations manually.

The `TOKEN_FILE` constant, on the other hand, acts as a lightweight local storage system for authentication tokens. Whenever a user logs in, their token is saved here so they don’t have to reauthenticate every time they restart the server.

It’s a simple but effective way to maintain session continuity, especially during local development or testing.

### 4. Authentication System

To manage tokens, you’ll add three helper functions:

#### 4.1. Get Stored Token

```ts title="server.ts"
function getStoredToken(): string | null {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      return fs.readFileSync(TOKEN_FILE, 'utf8').trim();
    }
  } catch (error) {
    console.error('Error reading token file:', error);
  }
  return null;
}
```

Retrieves a saved JWT token from the local file system.

#### 4.2. Store Token

```ts title="server.ts"
function storeToken(token: string): void {
  try {
    fs.writeFileSync(TOKEN_FILE, token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
}
```

Stores a new JWT token locally so authentication persists across server restarts.

#### 4.3. Decode JWT

```ts title="server.ts"
function decodeJWT(token: string): any {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}
```

Decodes JWTs to extract user info such as ID, email, and subscription status.

### 5. Core Helper Functions

#### 5.1. Check Billing Status

```ts :collapsed-lines title="server.ts"
async function getKindeBillingStatus(userId: string, accessToken: string): Promise<{ plan: string; features: any; canCreate: boolean; reason?: string }> {
  try {
    const decoded = jwt.decode(accessToken) as any;
    console.log('🔍 JWT Token data for user:', userId, 'Decoded:', decoded);

    const subscription = await sql`
      SELECT * FROM users 
      WHERE user_id = ${userId}
    `;

    if (subscription.length === 0) {
      await sql`
        INSERT INTO users (user_id, name, email, subscription_status, plan, free_todos_used)
        VALUES (${userId}, ${decoded.given_name || decoded.name || 'User'}, ${decoded.email || 'user@example.com'}, 'free', 'free', 0)
      `;
      console.log('👤 New user created:', decoded.given_name || decoded.name, decoded.email);
    }

    const freeTodosUsed = subscription.length > 0 ? subscription[0].free_todos_used : 0;

    if (freeTodosUsed < 1) {
      return {
        plan: 'free',
        features: { maxTodos: 1, used: freeTodosUsed },
        canCreate: true,
        reason: `Free tier - ${1 - freeTodosUsed} todo remaining`
      };
    }

    return {
      plan: 'free',
      features: { maxTodos: 1, used: freeTodosUsed },
      canCreate: false,
      reason: 'You have used your free todo. Please upgrade your plan at <https://learnflowai.kinde.com/portal> to create more todos.'
    };
  } catch (error) {
    console.error('Error checking Kinde billing:', error);
    return {
      plan: 'free',
      features: { maxTodos: 1 },
      canCreate: false,
      reason: 'Error checking billing status'
    };
  }
}
```

This checks a user's billing status and enforces a 1-todo free tier. It also auto-creates a user in the database if it doesn’t exist.

#### 5.2. Check To-Do Permission

```ts title="server.ts"
async function canCreateTodo(userId: string, accessToken: string): Promise<boolean> {
  const billingStatus = await getKindeBillingStatus(userId, accessToken);
  return billingStatus.canCreate;
}
```

This is a simple wrapper that returns a boolean for permission checks.

### 6. Core Server Implementation

Initialize your MCP server:

```ts title="server.ts"
const server = new Server(
  {
    name: 'todo-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);
```

This declares a new MCP server with the capability to register tools.

### 7. Register Tools

Every tool that your Cursor IDE can use needs to be listed so it knows what’s available. In this part of the server setup, you’re registering all the tools that your MCP server will expose. Think of it like giving Cursor a menu of what your backend can do.

Here’s how that looks in code:

```ts title="server.ts"
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'login',
        description: 'Get authentication URL for Kinde login',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      // ... more tools
    ],
  };
});
```

Tools you’ll create include:

- Authentication → `login`, `save_token`, `logout`
- To-Do Management → `list_todos`, `create_todo`, `update_todo`, `delete_todo`
- Billing → `refresh_billing_status`

### 8. Tool Handlers

Each tool in your MCP server has its own handler. The handler checks if the user is authenticated, talks to the database to perform the request, and returns a clean, structured response that Cursor can display.

This keeps the server organized, secure, and easy to extend later.

#### 8.1. Login Tool

The `login` tool is responsible for starting the authentication flow with Kinde. When users call it, the server returns a short message explaining how to sign in and store their token.

Once logged in, it lists a few commands that they user can try.

Here’s the handler:

```ts :collapsed-lines title="server.ts"
case 'login': {
  return {
    content: [
      {
        type: 'text',
        text: `🔐 **Authentication Required**

To use this MCP server, you need to authenticate with Kinde:

1. **Open your browser** and go to: <http://localhost:3000>
2. **Click "Login with Kinde"** to authenticate
3. **Copy your ID Token** from the page
4. **Use the save_token tool** to store it

**Note:** Make sure the Kinde auth server is running:
\`\`\`bash
npm run auth-server
\`\`\`

After authentication, you can use commands like:
- \`list todos\` - List your todos
- \`create todo\` - Create a new todo
- \`refresh billing status\` - Check your plan status`,
      },
    ],
  };
}
```

#### 8.2. Save Token Tool

The `save_token` tool handles storing the user’s authentication token locally so they don’t need to re-authenticate each time they use the MCP server.

Here’s the handler:

```ts title="server.ts"
case 'save_token': {
  const { token } = args as { token: string };
  storeToken(token);
  return {
    content: [
      {
        type: 'text',
        text: '✅ Token saved successfully! You can now use commands like "list todos" and "create todo" without providing the token each time.',
      },
    ],
  };
}
```

When a user runs this command and passes in their token, the server saves it to a local file using the `storeToken()` function. From then on, every other command (like `list todos`, `create todo`, or `refresh billing status`) can automatically authenticate using that stored token.

This small step makes the development flow smoother and keeps authentication persistent across sessions.

#### 8.3. List To-Dos Tool

The `list_todos` tool retrieves all to-dos that belong to the currently authenticated user. It first checks for a stored authentication token and decodes it to identify the user. If the token is missing or invalid, it asks the user to log in again.

Here’s the handler:

```ts :collapsed-lines title="server.ts"
case 'list_todos': {
  const token = getStoredToken();
  if (!token) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ No authentication token found. Please:\\n1. Type "login" to get the authentication URL\\n2. Complete login at <http://localhost:3000>\\n3. Copy your token and use "save_token" to store it\\n4. Then try "list todos" again',
        },
      ],
    ];
  }

  const decoded = decodeJWT(token);
  if (!decoded || !decoded.sub) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ Invalid token. Please login again using the "login" command.',
        },
      ],
    ];
  }

  const todos = await sql`
    SELECT * FROM todos 
    WHERE user_id = ${decoded.sub} 
    ORDER BY created_at DESC
  `;

  if (todos.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: '📝 No todos found. Create your first todo using "create todo"!',
        },
      ],
    ];
  }

  const todosList = todos.map((todo: any) => 
    `**${todo.id}.** ${todo.title}${todo.description ? ` - ${todo.description}` : ''} ${todo.completed ? '✅' : '⏳'}`
  ).join('\\n');

  return {
    content: [
      {
        type: 'text',
        text: `📝 **Your Todos (${todos.length}):**\\n\\n${todosList}`,
      },
    ],
  };
}
```

Results from this tool are formatted for easy reading in the MCP client, showing each task’s title, description, and completion status. If there are no to-dos yet, it simply prompts the user to create one.

#### 8.4. Create To-Do Tool

The `create_todo` tool lets authenticated users add new to-dos to their list. It starts by verifying that a valid token exists, ensuring only logged-in users can create tasks. If the token is present, it checks billing limits otherwise, it instructs the user to log in again.

Here’s the handler:

```ts :collapsed-lines title="server.ts"
case 'create_todo': {
  const token = getStoredToken();
  if (!token) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ No authentication token found. Please login first.',
        },
      ],
    ];
  }

  const decoded = decodeJWT(token);
  if (!decoded || !decoded.sub) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ Invalid token. Please login again.',
        },
      ],
    ];
  }

  const { title, description, completed } = args as { 
    title: string; 
    description?: string; 
    completed?: boolean; 
  };

  // Check billing status before creating todo
  const canCreate = await canCreateTodo(decoded.sub, token);
  if (!canCreate) {
    const billingStatus = await getKindeBillingStatus(decoded.sub, token);
    return {
      content: [
        {
          type: 'text',
          text: `🚫 **Cannot create todo**

${billingStatus.reason}

**Upgrade your plan:** <https://learnflowai.kinde.com/portal`>,
        },
      ],
    ];
  }

  const result = await sql`
    INSERT INTO todos (user_id, title, description, completed)
    VALUES (${decoded.sub}, ${title}, ${description || null}, ${completed || false})
    RETURNING *
  `;

  // Update free todos used count
  await sql`
    UPDATE users 
    SET free_todos_used = free_todos_used + 1 
    WHERE user_id = ${decoded.sub}
  `;

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          todoId: result[0].id,
          message: 'Todo created successfully',
          title: result[0].title,
          description: result[0].description,
          completed: result[0].completed
        }, null, 2),
      },
    ],
  };
}
```

If the user has hit their limit after calling this tool, it returns a clear message explaining why and provides a link to upgrade their plan.

#### 8.5. Update To-Do Tool

The `update_todo` tool allows an authenticated user to modify an existing to-do’s title, description, or completion status. It first checks for a valid token and decodes it to identify the user. If authentication fails, the tool instructs the user to log in again.

Here’s the handler:

```ts :collapsed-lines title="server.ts"
case 'update_todo': {
  const token = getStoredToken();
  if (!token) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ No authentication token found. Please login first.',
        },
      ],
    ];
  }

  const decoded = decodeJWT(token);
  if (!decoded || !decoded.sub) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ Invalid token. Please login again.',
        },
      ],
    ];
  }

  const { todoId, title, description, completed } = args as { 
    todoId: number; 
    title?: string; 
    description?: string; 
    completed?: boolean; 
  };

  const result = await sql`
    UPDATE todos 
    SET 
      title = COALESCE(${title || null}, title),
      description = COALESCE(${description || null}, description),
      completed = COALESCE(${completed !== undefined ? completed : null}, completed),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ${todoId} AND user_id = ${decoded.sub}
    RETURNING *
  `;

  if (result.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ Todo not found or you do not have permission to update it.',
        },
      ],
    ];
  }

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          message: 'Todo updated successfully',
          todo: result[0]
        }, null, 2),
      },
    ],
  };
}
```

Once the token is verified, the server updates the specified to-do in the database, using `COALESCE` to leave any fields unchanged if no new value is provided. The `updated_at` timestamp is refreshed automatically.

If the to-do doesn’t exist or the user doesn’t have permission to modify it, the tool returns an error message. Otherwise, it responds with the updated to-do in a clean JSON format:

#### 8.6. Delete To-Do Tool

The `delete_todo` tool allows an authenticated user to remove a specific to-do. It first checks for a valid token and decodes it to identify the user. If the token is missing or invalid, the tool instructs the user to log in again.

Here’s the handler:

```ts :collapsed-lines title="server.ts"
case 'delete_todo': {
  const token = getStoredToken();
  if (!token) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ No authentication token found. Please login first.',
        },
      ],
    ];
  }

  const decoded = decodeJWT(token);
  if (!decoded || !decoded.sub) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ Invalid token. Please login again.',
        },
      ],
    ];
  }

  const { todoId } = args as { todoId: number };

  const result = await sql`
    DELETE FROM todos 
    WHERE id = ${todoId} AND user_id = ${decoded.sub}
    RETURNING *
  `;

  if (result.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ Todo not found or you do not have permission to delete it.',
        },
      ],
    ];
  }

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          message: 'Todo deleted successfully',
          deletedTodo: result[0]
        }, null, 2),
      },
    ],
  };
}
```

This ensures users can only delete their own tasks, keeps the response structured for easy consumption in Cursor, and provides immediate confirmation of the deletion.

#### 8.7. Refresh Billing Status Tool

The `refresh_billing_status` tool allows an authenticated user to force a fresh check of their billing status from Kinde. It first verifies that a valid token exists and decodes it to identify the user. If the token is missing or invalid, the tool instructs the user to log in again.

Here’s the handler:

```ts :collapsed-lines title="server.ts"
case 'refresh_billing_status': {
  const token = getStoredToken();
  if (!token) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ No authentication token found. Please login first.',
        },
      ],
    ];
  }

  const decoded = decodeJWT(token);
  if (!decoded || !decoded.sub) {
    return {
      content: [
        {
          type: 'text',
          text: '❌ Invalid token. Please login again.',
        },
      ],
    ];
  }

  console.log('🔄 Force refreshing billing status for user:', decoded.sub);
  const billingStatus = await getKindeBillingStatus(decoded.sub, token);

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({
          success: true,
          message: 'Billing status refreshed successfully!',
          kindeBilling: {
            plan: billingStatus.plan,
            features: billingStatus.features,
            canCreate: billingStatus.canCreate,
            reason: billingStatus.reason,
            upgradeUrl: '<https://learnflowai.kinde.com/portal>',
            selfServicePortal: '<https://learnflowai.kinde.com/portal>',
            lastChecked: new Date().toISOString()
          }
        }, null, 2),
      },
    ],
  };
}
```

This tool ensures that users always have an up-to-date view of their subscription status and usage limits, providing all necessary information to decide whether they need to upgrade their plan.

#### 8.8. Logout Tool

The `logout` tool lets a user end their session by clearing the locally stored authentication token. When called, it checks if the token file exists and deletes it. If successful, the tool confirms that the user has been logged out.

Here’s the handler:

```ts :collapsed-lines title="server.ts"
case 'logout': {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      fs.unlinkSync(TOKEN_FILE);
    }
    return {
      content: [
        {
          type: 'text',
          text: '✅ Logged out successfully. Authentication token cleared.',
        },
      ],
    ];
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: '⚠️ Logout completed, but there was an issue clearing the token file.',
        },
      ],
    };
  }
}
```

This ensures that the session ends cleanly, preventing further use of the MCP server until the user logs in again. It also provides immediate feedback so the user knows the logout process succeeded or if there were minor issues.

### 9. Full <VPIcon icon="iconfont icon-typescript"/>`server.ts` File

You can view the complete implementation of the <VPIcon icon="iconfont icon-typescript"/>`server.ts` file in the [GitHub repo (<VPIcon icon="iconfont icon-github"/>`sholajegede/todo_mcp_server`)](https://github.com/sholajegede/todo_mcp_server/blob/main/src/server.ts) and copy it directly into your project.

### 10. Data Flow & Integration

Now that you’ve wired up authentication, database persistence, and billing checks, let’s step back and look at how everything fits together.

Authentication Flow:

- User clicks **Login with Kinde**.
- They are redirected to the **Kinde Auth URL.**
- Kinde issues a **JWT token** after successful login.
- The user copies this token and runs `“save_token: <your-jwt-token>”` in the Cursor Chat to store it.
- The token is stored in the user’s session.
- All future requests include the token for validation.

To-do Flow:

- User sends a request (for example, to *“create todo”* to create a new todo).
- The server checks the session for a valid token.
- The server verifies the user’s billing plan and usage limits.
- If valid, the request hits the **Neon Postgres database**.
- Usage counters are updated and a success response is returned.

Complete Data Flow:

```md
User Input 
   → MCP Server 
      → Authentication Check
         → Billing Check
            → Database Operation
               → Response
```

Diagram:

```mermaid
flowchart LR
    A[User Input] --> B[MCP Server]
    B --> C{Authenticated?}
    C -- No --> D[Reject Request]
    C -- Yes --> E{Billing OK?}
    E -- No --> F[Reject Request]
    E -- Yes --> G[Database Operation]
    G --> H[Update Usage + Return Response]
```

This overview shows how the different components work together. Each feature you’ve added (authentication, billing, and persistence) acts as a checkpoint in the request flow.

### 11. Error Handling & Security

Authentication Security:

- JWT Validation: Every request validates JWT token
- User Isolation: Users can only access their own to-dos
- Token Storage: Tokens are stored locally, not in your database

Database Security:

- SQL Injection Prevention: Your MCP server uses parameterized queries
- User Scoping: All queries are filtered by `user_id`
- Permission Checks: Every operation validates user ownership

Error Handling:

- `try/catch` returns safe error messages

### 12. Testing & Deployment

Finally, start the MCP server:

```ts title="server.ts"
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Todo MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
```

Test it by running:

```sh
npm run dev
```

In Cursor, you can now try commands like:

```md
login
save_token: <your-jwt-token>
list todos
create todo
refresh billing status
logout
```

---

## Testing the Complete System

### 1. Start the Services

```sh
# Terminal 1: Start MCP Server
npm run dev

# Terminal 2: Start Kinde Auth Server
npm run auth-server
```

### 2. Configure Cursor MCP

In your Cursor project:

- Go to Settings → Tools & MCP → New MCP Server
- Edit the `~/`<VPIcon icon="fas fa-foler-open"/>`.cursor/`<VPIcon icon="iconfont icon-json"/>`mcp.json` and paste this code below

```json title="~/.cursor/mcp.json"
{
  "mcpServers": {
    "todo-mcp-server": {
      "command": "node",
      "args": ["dist/server.js"],
      "cwd": "/path/to/your/todo-mcp-server",
      "env": {
        "DATABASE_URL": "your-neon-connection-string",
        "KINDE_ISSUER_URL": "<https://your-domain.kinde.com>",
        "KINDE_CLIENT_ID": "your-client-id",
        "KINDE_CLIENT_SECRET": "your-client-secret",
        "JWT_SECRET": "your-jwt-secret-key",
        "NODE_ENV": "development"
      }
    }
  }
}
```

### 3. Test the Complete Flow

Open your Cursor chat window and test MCP commands:

- *login* → Get authentication URL
- *save_token* → Save your token gotten from Kinde
- *list to-dos* → List to-dos
- *create to-do* - Create a to-do
- *refresh billing status* - Check billing

---

## Troubleshooting

Even with everything set up correctly, you might run into issues. Here are some common problems and how to fix them.

### 1. MCP Server Not Detected

If Cursor can’t see your server:

- Double-check the syntax of your `~/.cursor/`<VPIcon icon="iconfont icon-json"/>`mcp.json` file.
- Make sure all file paths in <VPIcon icon="iconfont icon-json"/>`mcp.json` are **absolute paths** (not relative).
- Restart Cursor after making changes to the config file.

### 2. Database Connection Issues

If your Neon database won’t connect:

- Confirm your `DATABASE_URL` environment variable is correctly formatted.
- Log into the [<VPIcon icon="fas fa-globe"/>Neon dashboard](https://console.neon.tech) and make sure your database is active and not paused.
- If you’re using SSL, verify that the SSL mode matches Neon’s connection settings.

### 3. Kinde Authentication Problems

If login isn’t working as expected:

- In your [<VPIcon icon="fas fa-globe"/>Kinde dashboard](https://app.kinde.com/admin), make sure the redirect URLs are set correctly (for example, `http://localhost:3000`).
- Double-check that your client ID and client secret are correct.
- Ensure your auth server is running locally on port `3000` before attempting login.

### 4. Token Errors

If you’re getting token-related errors:

- Confirm the token you’re saving is in JWT format (three dot-separated parts).
- Make sure the token hasn’t expired.
- Use the ID token provided by Kinde, not the access token.

Following these steps should resolve most issues you’ll run into when setting up your MCP server with Cursor, Neon, and Kinde.

---

## Final MCP Server Architecture

```md
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Cursor IDE    │    │   MCP Server     │    │  Kinde Auth     │
│                 │◄──►│                  │◄──►│   Server        │
│ - MCP Tools     │    │ - Todo CRUD      │    │ - OAuth Flow    │
│ - Chat Interface│    │ - Billing Check  │    │ - Token Storage │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │ Neon PostgreSQL │
                       │                 │
                       │ - Users Table   │
                       │ - Todos Table   │
                       │ - Billing Data  │
                       └─────────────────┘
```
<!-- TODO: mermaid화 -->

---

## Conclusion

You’ve just built a fully functional MCP server with:

- **Authentication** → secure logins with Kinde
- **Data persistence** → to-dos stored in Neon
- **Billing enforcement** → usage limits + upgrade path
- **Tool exposure** → MCP tools accessible in Cursor

This foundation is flexible enough to power more advanced apps while keeping the core flow simple and secure.

### Next Steps

Here are some ideas to extend what you’ve built:

- **Role-based access control (RBAC):** create admin vs normal user permissions (see my [two-part RBAC guide (<VPIcon icon="fa-brands fa-dev"/>`sholajegede`)](https://dev.to/sholajegede/part-1-master-authentication-and-role-based-access-control-rbac-with-kinde-and-convex-in-a-h3c) for reference).
- **Billing tiers:** offer free, pro, and enterprise plans with different limits.
- **Features:** add search, tags, or sharing to to-dos.
- **Deployment:** run the service on a cloud platform with HTTPS and a production-grade database.

### Resources

You can find the complete source code for this tutorial in [this GitHub repository (<VPIcon icon="iconfont icon-github"/>`sholajegede/todo_mcp_server`)](https://github.com/sholajegede/todo_mcp_server). If it helped you in any way, consider giving it a star (⭐) to show your support!

Also, if you found this tutorial valuable, feel free to share it with others who might benefit from it. I’d really appreciate your thoughts, you can mention me on X [<VPIcon icon="fa-brands fa-x-twitter"/>`@wani_shola`](https://x.com/wani_shola) or [connect with me on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`sholajegede`)](https://linkedin.com/in/sholajegede).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a To-Do List MCP Server Using TypeScript – with Auth, Database, and Billing",
  "desc": "In this tutorial, you’ll build a To-Do list MCP server using TypeScript. You’ll learn how to implement authentication, persistence, and billing, to make the server robust and functional for real users. By the end, you’ll have a working MCP server tha...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-to-do-list-mcp-server-using-typescript/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
