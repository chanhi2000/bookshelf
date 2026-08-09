---
lang: en-US
title: "How to Implement Role-Based Access Control in a Node.js REST API with JWT"
description: "Article(s) > How to Implement Role-Based Access Control in a Node.js REST API with JWT"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - DevOps
  - Security
  - JWT
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
  - devops
  - sec
  - security
  - jwt
  - json-web-token
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Implement Role-Based Access Control in a Node.js REST API with JWT"
    - property: og:description
      content: "How to Implement Role-Based Access Control in a Node.js REST API with JWT"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/role-based-access-control-nodejs-rest-api-jwt.html
prev: /programming/js-express/articles/README.md
date: 2026-07-09
isOriginal: false
author:
  - name: Zia Ullah
    url: https://freecodecamp.org/news/author/ziaullahzia/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d742efbd-8170-4fb6-8851-1f7c6ef9125e.png
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
  "title": "JWT > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security-jwt/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Implement Role-Based Access Control in a Node.js REST API with JWT"
  desc="The first time I built an API without thinking about roles, I gave every logged-in user the same access. It worked fine until a regular user accidentally hit a delete endpoint and wiped test data. Tha"
  url="https://freecodecamp.org/news/role-based-access-control-nodejs-rest-api-jwt"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/d742efbd-8170-4fb6-8851-1f7c6ef9125e.png"/>

The first time I built an API without thinking about roles, I gave every logged-in user the same access. It worked fine until a regular user accidentally hit a delete endpoint and wiped test data. That was the day I actually sat down and learned RBAC properly.

Role-Based Access Control sounds fancy, but the idea is simple: what you can do depends on *who you are*, not just *that you're logged in*. An admin deletes users. An editor creates posts. A regular user just reads. Same app, completely different experience depending on who's asking.

That's what we're building here. A REST API with three roles: JWT to carry those roles on every request, and a pair of middleware functions that check permissions before your route handlers even run. There's no database hit per request, and no if/else soup in your business logic.

By the end, you'll have three working roles (`admin`, `editor`, `user`) each locked to their own endpoints. More importantly, the pattern is transferable: once it clicks, you'll wire it into your next project without needing a tutorial.

::: info Full source code on GitHub

<SiteInfo
  name="ziaongit/nodejs-rbac-jwt-api"
  desc="Contribute to ziaongit/nodejs-rbac-jwt-api development by creating an account on GitHub."
  url="https://github.com/ziaongit/nodejs-rbac-jwt-api/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c915680d5e426d2b7c15cdfdded73c5495abe0df6e0fb420afc2e8e2856516aa/ziaongit/nodejs-rbac-jwt-api"/>

:::

::: info What You'll Learn

- What RBAC is and how it differs from basic authentication
- How to embed roles in JWT payloads
- How to write reusable Express middleware for token verification and role checking
- How to protect API routes based on user roles

:::

::: note Prerequisites

- Node.js (v18+) installed
- Basic knowledge of Express.js
- Familiarity with how JWTs work (we'll cover the relevant parts)
- npm installed

:::

---

## What We'll Build

We'll build a REST API for a simple content management system with three user roles:

| Role | Permissions |
| --- | --- |
| `user` | Read content |
| `editor` | Read + create content |
| `admin` | Full access — read, create, delete content, manage users |

The API will expose these endpoints:

| Method | Endpoint | Access |
| --- | --- | --- |
| POST | /api/auth/register | Public |
| POST | /api/auth/login | Public |
| GET | /api/content | user, editor, admin |
| POST | /api/content | editor, admin |
| DELETE | /api/content/:id | admin only |
| GET | /api/admin/users | admin only |

---

## Project Setup

Create a new folder and initialize the project:

```sh
mkdir nodejs-rbac-jwt-api
cd nodejs-rbac-jwt-api
npm init -y
```

Install the dependencies:

```sh
npm i express jsonwebtoken bcryptjs dotenv
npm i --save-dev nodemon
```

Here's what each package does:

- **express**: web framework for building the API
- **jsonwebtoken**: creates and verifies JWTs
- **bcryptjs**: securely hashes passwords
- **dotenv**: reads your <VPIcon icon="iconfont icon-dotenv"/>`.env` file so you're not hardcoding secrets in your source code

Update <VPIcon icon="iconfont icon-json"/>`package.json` to add start scripts:

```json
{
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  }
}
```

Create the project structure:

```sh title="file structure"
📂nodejs-rbac-jwt-api/
├── 📂src/
│   ├── 📂middleware/
│   │   └── auth.js
│   ├── 📂routes/
│   │   ├── auth.js
│   │   ├── content.js
│   │   └── admin.js
│   ├── 📂data/
│   │   └── users.js
│   └── app.js
├── .env
├── .env.example
└── package.json
```

Create your <VPIcon icon="iconfont icon-dotenv"/>`.env` file:

```sh title=".env"
JWT_SECRET=your_super_secret_key_change_this_in_production
PORT=3000
```

::: important

Never commit your <VPIcon icon="iconfont icon-dotenv"/>`.env` file to version control. Add it to <VPIcon icon="iconfont icon-git"/>`.gitignore`.

:::

---

## Setting Up the In-Memory Data Store

We don't have a database here, just an array in memory. The point was to keep the focus on RBAC, not spend half the tutorial on database config. In a real project, swap the array for whatever database you're already using.

Create <VPIcon icon="fas fa-folder-open"/>`src/data/users.js`:

```js title="data/users.js"
// In-memory users store
// In production, replace this with a real database (MongoDB, PostgreSQL, etc.)
const users = [];

const findUserByEmail = (email) => users.find((u) => u.email === email);
const findUserById = (id) => users.find((u) => u.id === id);
const createUser = (user) => {
  users.push(user);
  return user;
};
const getAllUsers = () => users.map(({ password, ...user }) => user);

module.exports = { findUserByEmail, findUserById, createUser, getAllUsers };
```

One thing worth noting: `getAllUsers` uses destructuring to drop the password before returning anything. Never send password fields in API responses, even hashed ones.

---

## Building the Auth Routes

The auth routes handle registration and login. Login is where roles first enter the picture — we embed the user's role directly into the JWT payload.

Create <VPIcon icon="fas fa-folder-open"/>`src/routes/auth.js`:

```js :collapsed-lines title="routes/auth.js"
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../data/users');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  if (findUserByEmail(email)) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  // Only allow valid roles — default to 'user' if none provided
  const validRoles = ['user', 'editor', 'admin'];
  const assignedRole = validRoles.includes(role) ? role : 'user';

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
    role: assignedRole,
  };

  createUser(newUser);

  res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Issue JWT — embed role in the payload
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,   // ← This is the key part for RBAC
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Login successful',
    token,
  });
});

module.exports = router;
```

The most important line is the JWT payload:

```js
jwt.sign({ id, email, role }, process.env.JWT_SECRET, { expiresIn: '24h' })
```

By embedding `role` in the token, every subsequent request carries the user's permissions without requiring a database lookup. The server just verifies the token and reads the role from the payload.

---

## Building the RBAC Middleware

This is the core of the system. We need two separate middleware functions:

1. `verifyToken` confirms the JWT is valid and attaches the decoded payload to `req.user`
2. `checkRole` confirms the user has the required role for a specific route

Keeping them separate gives you flexibility. Some routes only need authentication. Others need both authentication and a specific role.

Create <VPIcon icon="fas fa-folder-open"/>`src/middleware/auth.js`:

```js :collapsed-lines title="middleware/auth.js"
const jwt = require('jsonwebtoken');

// Middleware 1: Verify the JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expects: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded payload (including role) to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// Middleware 2: Check if user has one of the required roles
const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}. Your role: ${req.user.role}`,
      });
    }

    next();
  };
};

module.exports = { verifyToken, checkRole };
```

`checkRole` uses a rest parameter (`...allowedRoles`) so you can pass in one or multiple roles:

```js
checkRole('admin')                  // only admin
checkRole('editor', 'admin')        // editor or admin
checkRole('user', 'editor', 'admin') // all roles
```

This makes route definitions clean and readable — the permissions are visible right at the route level.

---

## Building the Protected Routes

Now let's wire up routes that use the middleware.

Create <VPIcon icon="fas fa-folder-open"/>`src/routes/content.js`:

```js :collapsed-lines title="routes/content.js"
const express = require('express');
const { verifyToken, checkRole } = require('../middleware/auth');

const router = express.Router();

// In-memory content store
const content = [
  { id: '1', title: 'Getting Started with Node.js', author: 'admin' },
  { id: '2', title: 'Express Middleware Explained', author: 'editor' },
];

// GET /api/content — all authenticated users
router.get('/', verifyToken, checkRole('user', 'editor', 'admin'), (req, res) => {
  res.json({ content });
});

// POST /api/content — editors and admins only
router.post('/', verifyToken, checkRole('editor', 'admin'), (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newItem = {
    id: Date.now().toString(),
    title,
    author: req.user.email,
  };

  content.push(newItem);
  res.status(201).json({ message: 'Content created', item: newItem });
});

// DELETE /api/content/:id — admin only
router.delete('/:id', verifyToken, checkRole('admin'), (req, res) => {
  const index = content.findIndex((c) => c.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: 'Content not found' });
  }

  content.splice(index, 1);
  res.json({ message: 'Content deleted successfully' });
});

module.exports = router;
```

Notice how readable each route is:

```js
router.delete('/:id', verifyToken, checkRole('admin'), handler)
```

You can understand the access control without reading the handler body. This is one of the key advantages of middleware-based RBAC: permissions live at the routing layer, not buried in business logic.

Create <VPIcon icon="fas fa-folder-open"/>`src/routes/admin.js`:

```js title="routes/admin.js"
const express = require('express');
const { verifyToken, checkRole } = require('../middleware/auth');
const { getAllUsers } = require('../data/users');

const router = express.Router();

// GET /api/admin/users — admin only
router.get('/users', verifyToken, checkRole('admin'), (req, res) => {
  res.json({ users: getAllUsers() });
});

module.exports = router;
```

---

## Putting It All Together

Create <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="fa-brands fa-js"/>`app.js`:

```js title="app.js"
require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'RBAC API is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Testing the API

Start the server:

```sh
npm run dev
```

### Step 1: Register Users with Different Roles

Register an admin:

```sh
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "Admin User", "email": "admin@example.com", "password": "password123", "role": "admin"}'
```

Register an editor:

```sh
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "Editor User", "email": "editor@example.com", "password": "password123", "role": "editor"}'
```

Register a regular user (no role specified — defaults to `user`):

```sh
curl -X POST http://localhost:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name": "Regular User", "email": "user@example.com", "password": "password123"}'
```

### Step 2: Log in and Get a Token

```sh
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email": "user@example.com", "password": "password123"}'
#
# {
#   "message": "Login successful",
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
# }
```

Copy the token.

### Step 3: Test Role-based Access

**Read content as a regular user (should succeed):**

```sh
curl http://localhost:3000/api/content \
-H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Try creating content as a regular user (should fail — 403):**

```sh
curl -X POST http://localhost:3000/api/content \
-H "Authorization: Bearer YOUR_TOKEN_HERE" \
-H "Content-Type: application/json" \
-d '{"title": "New Article"}'
#
# {
#   "message": "Access denied. Required role: editor or admin. Your role: user"
# }
```

Now log in as an editor and try the same POST request. It succeeds. Log in as admin and try the DELETE route. Only the admin token will work.

### Step 4: Decode the JWT to See the Role

You can paste any token into [<VPIcon icon="fas fa-globe"/>jwt.io](https://jwt.io) to inspect the payload. You'll see something like:

```json
{
  "id": "1720300000000",
  "email": "admin@example.com",
  "role": "admin",
  "iat": 1720300000,
  "exp": 1720386400
}
```

The `role` field is exactly what `checkRole` reads on every protected request.

---

## Key Takeaways

Roles live in the JWT payload. The role travels with the token — no extra DB call needed every time someone hits a protected route. It gets embedded at login and verified cryptographically on each request.

Middleware is composable. `verifyToken` and `checkRole` are separate, reusable functions. You can chain them on any route in any combination.

Permissions are visible at the route level. `router.delete('/:id', verifyToken, checkRole('admin'), handler)` tells you everything about access control before you even read the handler.

::: note Before you ship this to production:

- The in-memory array was just to keep this tutorial focused — replace it with a real database before anything goes near production. A server restart wipes all your users right now.
- That 24h token expiry is too long. Cut it to 15 minutes and add refresh token rotation. A stolen token becomes useless fast.
- Re-validate roles from the DB on sensitive operations. A role change won't reflect in an existing token until it expires
- HTTPS, always
- If your permission logic grows beyond "check a role", look at [<VPIcon icon="fas fa-globe"/>casl](https://casl.js.org/). It handles attribute-level rules cleanly

:::

---

## Conclusion

The core of it fits in two middleware functions and a JWT payload. I've used this same pattern across several projects. And once you've built it yourself, you'll start spotting it everywhere, because almost every multi-user app needs some version of it.

::: info Full source code on GitHub

<SiteInfo
  name="ziaongit/nodejs-rbac-jwt-api"
  desc="Contribute to ziaongit/nodejs-rbac-jwt-api development by creating an account on GitHub."
  url="https://github.com/ziaongit/nodejs-rbac-jwt-api/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/c915680d5e426d2b7c15cdfdded73c5495abe0df6e0fb420afc2e8e2856516aa/ziaongit/nodejs-rbac-jwt-api"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Implement Role-Based Access Control in a Node.js REST API with JWT",
  "desc": "The first time I built an API without thinking about roles, I gave every logged-in user the same access. It worked fine until a regular user accidentally hit a delete endpoint and wiped test data. Tha",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/role-based-access-control-nodejs-rest-api-jwt.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
