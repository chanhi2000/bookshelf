---
lang: en-US
title: "How to Build a Secure Authentication System with JWT and Refresh Tokens"
description: "Article(s) > How to Build a Secure Authentication System with JWT and Refresh Tokens"
icon: iconfont icon-jwt
category:
  - DevOps
  - Security
  - JWT
  - Node.js
  - Express.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - sec
  - security
  - jwt
  - json-web-token
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Secure Authentication System with JWT and Refresh Tokens"
    - property: og:description
      content: "How to Build a Secure Authentication System with JWT and Refresh Tokens"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-secure-authentication-system-with-jwt-and-refresh-tokens.html
prev: /devops/security-jwt/articles/README.md
date: 2025-11-26
isOriginal: false
author:
  - name: Joan Ayebola
    url : https://freecodecamp.org/news/author/joanayebola/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1764095460886/51b9c653-fa95-42f0-8c51-37f6d6805da4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JWT > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/security-jwt/articles/README.md",
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

[[toc]]

---

<SiteInfo
  name="How to Build a Secure Authentication System with JWT and Refresh Tokens"
  desc="Every app that handles user accounts needs a way to confirm who’s who. That’s what authentication is for, making sure the person using an app is the person they claim to be. But doing this securely is harder than it sounds. Traditional methods often ..."
  url="https://freecodecamp.org/news/how-to-build-a-secure-authentication-system-with-jwt-and-refresh-tokens"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1764095460886/51b9c653-fa95-42f0-8c51-37f6d6805da4.png"/>

Every app that handles user accounts needs a way to confirm who’s who. That’s what authentication is for, making sure the person using an app is the person they claim to be. But doing this securely is harder than it sounds.

Traditional methods often rely on server sessions and cookies. Those work, but they don’t always scale well, especially when you’re building APIs or mobile apps that talk to multiple services. This is why JWTs, or JSON Web Tokens, are useful. They’re small, self-contained tokens that can carry user data safely between a client and a server.

JWTs make it easy to verify users without constantly checking a database – but they also expire fast to reduce risk. To keep users logged in without forcing them to sign in again every few minutes, we use something called a refresh token. It’s a separate, long-lived token that can request new access tokens when the old ones expire.

In this guide, we’ll walk through how to build a secure authentication system using JWTs and refresh tokens. You’ll learn how to generate tokens, validate them, handle expiry, and keep everything safe from common security threats.

---

## Understanding JWTs (JSON Web Tokens)

A JWT, short for JSON Web Token, is a compact way to share information between a client and a server. It’s often used to prove that a user is who they say they are. The token is created on the server after a user logs in and is then sent back to the client. The client then includes this token with each request, so the server knows who is making the call.

A JWT has three parts: a header, a payload, and a signature.

- The **header** usually tells the system which algorithm was used to sign the token.
- The **payload** contains the data, such as the user’s ID or role.
- The **signature** is the part that keeps everything secure. It’s created by hashing the header and payload with a secret key.

Once created, a JWT looks like a long string of random characters separated by dots. When the client sends it back to the server, the server verifies the signature using the same secret key. If it matches, the request is trusted.

One of the main benefits of JWTs is that they are stateless. The server doesn’t need to store session data. Everything needed to verify the user is already inside the token. This makes them fast and easy to use in modern APIs and microservices.

JWTs do have a downside: they cannot be revoked easily once issued. If a token is stolen, the attacker can use it until it expires. This is why short token lifetimes matter. It’s also why refresh tokens exist.

In the next section, we’ll finish the basic JWT setup. After that, we’ll add refresh tokens in **“Refresh Tokens and Rotation.”** That part shows how to handle expiry without making users log in again.

---

## Setting Up the Project

Before writing any code, let’s set up a simple backend where we can build and test our authentication system. For this guide, we’ll use Node.js with Express, since it’s lightweight and easy to follow. You can use any stack later once you understand the flow.

### Prerequisites

Make sure you have:

- Node.js and npm installed
- A text editor (VS Code works great)
- Basic knowledge of JavaScript and APIs

### 1. Initialize the Project

Create a new folder and open it in your terminal.

```sh
mkdir jwt-auth-demo
cd jwt-auth-demo
npm init -y
```

This creates a `package.json` file that will track your dependencies.

### 2. Install Dependencies

You’ll need a few packages to get started:

- `express`: the web framework
- `jsonwebtoken`: to create and verify tokens
- `bcryptjs`: to hash passwords
- `dotenv`: to manage environment variables

Install them all at once like this:

```sh
npm install express jsonwebtoken bcryptjs dotenv
```

If you want auto-reloading while developing, install nodemon as a dev dependency:

```sh
npm install --save-dev nodemon
```

### 3. Project Structure

Here’s a clean structure to keep things organized:

```sh title="file structure"
jwt-auth-demo/
│
├── server.js
├── .env
├── package.json
│
├── config/
│   └── db.js
│
├── middleware/
│   └── auth.js
│
├── routes/
│   └── auth.js
│
└── models/
    └── user.js
```

### 4. Basic Express Setup

In <VPIcon icon="fa-brands fa-js"/>`server.js`, start with a minimal Express server.

```js title="server.js"
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('JWT Auth API running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

You can now run it using:

```sh
node server.js
```

or, if you’re using nodemon:

```sh
npx nodemon server.js
```

If everything is set up correctly, visiting `http://localhost:5000` should display **“JWT Auth API running”:**

![Screenshot of a terminal running nodemon server.js next to a browser window showing the text “JWT Auth API running” at `http://localhost:5000`, confirming the server started correctly.](https://cdn.hashnode.com/res/hashnode/image/upload/v1760559643076/8fb7dcbf-50ca-44bc-b2a3-32273d82957f.png)

---

## How to Implement JWT Authentication

Now that your server is up, let’s add real authentication. We’ll start with user registration, password hashing, and login. Each user will get a token after logging in, which they can use to access protected routes.

### 1. Set Up the User Model

We’ll store users in a simple database. For this demo, let’s use MongoDB with Mongoose, since it’s quick to set up and easy to scale later.

Install the required packages:

```sh
npm install mongoose
```

Then create <VPIcon icon="fas fa-folder-open"/>`models/`<VPIcon icon="fa-brands fa-js"/>`user.js`:

```js title="models/user.js"
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
```

We store users with a unique email and a hashed password. The database never sees the raw password. Hashing makes stolen data harder to use.

### 2. Connect to MongoDB

Inside <VPIcon icon="fas fa-folder-open"/>`config/`<VPIcon icon="fa-brands fa-js"/>`db.js`:

```js title="config/db.js"
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

`mongoose.connect` reads the connection string from <VPIcon icon="iconfont icon-doitenv" />`.env`. If the connection fails, we exit the process so we don’t continue in a broken state.

Update your <VPIcon icon="fa-brands fa-js"/>`server.js` to include the connection:

```js title="server.js"
const connectDB = require('./config/db');
connectDB();
```

And don’t forget to add your MongoDB URI in the <VPIcon icon="iconfont icon-doitenv" />`.env` file:

```sh title=".env"
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/auth
JWT_SECRET=your_jwt_secret_key
```

### 3. Create Registration and Login Routes

In <VPIcon icon="fas fa-folder-open"/>`routes/`<VPIcon icon="fa-brands fa-js"/>`auth.js`:

```js :collapsed-lines title="routes/auth.js"
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login and issue JWT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { id: user._id, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
```

Add it to your server in <VPIcon icon="fa-brands fa-js"/>`server.js`:

```js title="server.js"
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
```

### 4. Test It Out

You can now test these routes using Postman or Insomnia.

Send a `POST` request to `/api/auth/register` with a JSON body:

```json
{
  "username": "demoUser",
  "email": "demo@email.com",
  "password": "mypassword"
}
```

![Screenshot of a Postman request sending a POST call to `http://localhost:3000/api/auth/register` with a JSON body containing a username, email, and password. The response area shows a 201 Created status and the message “User created successfully."](https://cdn.hashnode.com/res/hashnode/image/upload/v1760713863394/c13ddbd5-ebb1-47d1-9b6d-06bc0f33eb7d.png)

The register route checks for an existing user by email. It hashes the password with a cost factor of 10 and then returns a 201 on success. We don’t log the password or include it in the response.

Then log in at `/api/auth/login` to receive a JWT.

![Screenshot of a Postman request sending a POST call to `http://localhost:3000/api/auth/login` with a JSON body containing a username, email, and password. The response panel shows a 200 OK status and a JSON object with a generated JWT token.](https://cdn.hashnode.com/res/hashnode/image/upload/v1760713960135/58eeaa4e-d652-4509-ad6e-756baf19ff8c.png)

The login route finds the user by email and compares the password with bcrypt.compare. If it matches, we sign a token with a small payload: the user ID and email. The JWT_SECRET signs the token so the server can verify it later. The expiresIn: '15m' setting keeps the token short-lived to limit risk. The response only includes the token. User data can be fetched from a protected route.

Once you get the token, copy it, you’ll use it to access protected routes later.

---

## How to Verify JWTs and Protect Routes

Now that login returns a token, we should verify it on each request that needs auth. We will write a small middleware that checks the `Authorization` header, validates the token, and adds the user info to the request.

### 1. Create the Auth Middleware

Create <VPIcon icon="fas fa-folder-open"/>`middleware/`<VPIcon icon="fa-brands fa-js"/>`auth.js`:

```js title="middleware/auth.js"
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = auth;
```

::: info What it does:

- Reads the `Authorization` header.
- Checks for the `Bearer <token>` format.
- Verifies the token with the secret.
- Attaches a simple `user` object to `req` for later use.

:::

### 2. Create the Protected Route

Create a small profile route that returns the current user. Add <VPIcon icon="fas fa-folder-open"/>`routes/`<VPIcon icon="fa-brands fa-js"/>`profile.js`:

```js title="routes/profile.js"
const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
```

Wire it in <VPIcon icon="fa-brands fa-js"/>`server.js`:

```js title="server.js"
const profileRoutes = require('./routes/profile');
app.use('/api/profile', profileRoutes);
```

Now a `GET /api/profile/me` call will only work with a valid token.

### 3. Handle Token Expiry Clearly

Short access tokens reduce damage if they leak. We set `expiresIn: '15m'` during login. When a token expires, the middleware returns a 401 with `Access token expired`.

We won’t refresh the token here because refresh requires its own endpoint, storage, and rotation rules. You’ll add that in **“Refresh Tokens and Rotation.”** For now, the 401 proves that the expiry is enforced.

### 4. Testing the Flow

In this section, we’ll test that the server blocks requests without a valid token and allows requests with a valid token.

Log in at `/api/auth/login` and copy the token. Then call `/api/profile/me` with:

```ts
Authorization: Bearer <paste_token_here>
```

You should see the current user without the password field.

![Screenshot of a Postman GET request to `http://localhost:3000/api/profile/me` using a valid JWT. The response shows a 200 OK status and returns the user’s `_id`, `username`, and `email`, confirming that the protected route works when a proper token is included.](https://cdn.hashnode.com/res/hashnode/image/upload/v1760715340324/13779fe0-304c-460b-87ac-c86133eea2a4.png)

Then remove the header or change the token and call again. You should get a 401. Next, wait for the token to expire or change `expiresIn` to a very short value for a quick test. Call again and confirm you get `Access token expired`.

#### Tips for debugging

- 401 with “Missing or invalid Authorization header” means the header format is wrong. Use `Authorization: Bearer <token>`.
- 401 with “Invalid token” means the token string is wrong, signed with the wrong secret, or corrupted.
- 401 with “Access token expired” means the expiry check works. You will fix the client experience with the refresh endpoint later.
- If all calls fail, confirm your `JWT_SECRET` is set in <VPIcon icon="iconfont icon-doitenv" />`.env` and that the server was restarted after changes.

### 5. Optional Cookie Support

You can store tokens in HTTP-only cookies. The browser sends them automatically. Scripts cannot read HTTP-only cookies, which reduces the risk from XSS.

Install and enable cookies:

```sh
npm install cookie-parser
```

```js title="server.js"
const cookieParser = require('cookie-parser');
app.use(cookieParser());
```

Read the access token from a cookie as a fallback:

```js title="middleware/auth.js"
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, tokenFromHeader] = header.split(' ');
  const tokenFromCookie = req.cookies?.access_token;

  const token = scheme === 'Bearer' && tokenFromHeader ? tokenFromHeader : tokenFromCookie;

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    const msg = err.name === 'TokenExpiredError' ? 'Access token expired' : 'Invalid token';
    return res.status(401).json({ message: msg });
  }
}

module.exports = auth;
```

How this works:

- The access token can live in a cookie named `access_token`.
- Mark the cookie as `httpOnly` and `secure` in production.
- Set `sameSite: 'strict'` to reduce CSRF risk.
- For APIs used by browsers, cookies simplify sending tokens. For SPAs that call many domains, an `Authorization` header may be simpler.

In the next section, we’ll use the same cookie approach for the refresh token. That section explains why refresh belongs in a cookie and how rotation blocks replay.

---

## Refresh Tokens and Rotation

Access tokens are short-lived and used on every request. They prove the user identity quickly. Refresh tokens live longer and are used only to get new access tokens when the old ones expire. This split keeps day-to-day requests fast and limits the damage if a token leaks.

We will store the refresh token in an HTTP-only cookie. This reduces exposure to scripts and keeps the flow smooth.

### 1. Install and Setup

We already have `cookie-parser`. We won’t add anything new for now, but we will use [<VPIcon icon="fa-brands fa-node"/>Node’s built-in `crypto` module](https://nodejs.org/api/crypto.html) to hash the refresh token before storing it. As a reminder, hashing means the raw token is never saved. If the database leaks, attackers cannot use the hashes to log in.

Create <VPIcon icon="fas fa-folder-open"/>`models/`<VPIcon icon="fa-brands fa-js"/>`refreshToken.js`:

```js title="models/refreshToken.js"
const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  tokenHash: { type: String, required: true, unique: true },
  jti: { type: String, required: true, index: true },
  expiresAt: { type: Date, required: true, index: true },
  revokedAt: { type: Date, default: null },
  replacedBy: { type: String, default: null }, // new jti when rotated
  createdAt: { type: Date, default: Date.now },
  ip: String,
  userAgent: String
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);
```

### 2. Token Helpers

Create `utils/`<VPIcon icon="fa-brands fa-js"/>`tokens.js` for clean, reusable logic.

```js :collapsed-lines title="utils/tokens.js"
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const RefreshToken = require('../models/refreshToken');

const ACCESS_TTL = '15m';
const REFRESH_TTL_SEC = 60 * 60 * 24 * 7; // 7 days

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function createJti() {
  return crypto.randomBytes(16).toString('hex');
}

function signAccessToken(user) {
  const payload = { id: user._id.toString(), email: user.email };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: ACCESS_TTL });
}

function signRefreshToken(user, jti) {
  const payload = { id: user._id.toString(), jti };
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TTL_SEC });
  return token;
}

async function persistRefreshToken({ user, refreshToken, jti, ip, userAgent }) {
  const tokenHash = hashToken(refreshToken);
  const expiresAt = new Date(Date.now() + REFRESH_TTL_SEC * 1000);
  await RefreshToken.create({ user: user._id, tokenHash, jti, expiresAt, ip, userAgent });
}

function setRefreshCookie(res, refreshToken) {
  const isProd = process.env.NODE_ENV === 'production';
  res.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'strict',
    path: '/api/auth/refresh',
    maxAge: REFRESH_TTL_SEC * 1000
  });
}

async function rotateRefreshToken(oldDoc, user, req, res) {
  // revoke old
  oldDoc.revokedAt = new Date();
  const newJti = createJti();
  oldDoc.replacedBy = newJti;
  await oldDoc.save();

  // issue new
  const newAccess = signAccessToken(user);
  const newRefresh = signRefreshToken(user, newJti);
  await persistRefreshToken({
    user,
    refreshToken: newRefresh,
    jti: newJti,
    ip: req.ip,
    userAgent: req.headers['user-agent'] || ''
  });
  setRefreshCookie(res, newRefresh);
  return { accessToken: newAccess };
}

module.exports = {
  hashToken,
  createJti,
  signAccessToken,
  signRefreshToken,
  persistRefreshToken,
  setRefreshCookie,
  rotateRefreshToken
};
```

::: info In this code,

- signAccessToken creates a short token with the user ID and email.
- signRefreshToken creates a long-lived token with a jti value. The jti lets us rotate and track tokens.
- persistRefreshToken hashes the refresh token and stores metadata like expiry and device info.
- setRefreshCookie writes the HTTP-only cookie so the browser sends it to the refresh endpoint automatically.
- rotateRefreshToken revokes the old token, issues a new pair, and saves the new record. Rotation blocks replay if an old refresh token is stolen.

:::

### 3. Issue Refresh Token on Login

Update your <VPIcon icon="fas fa-folder-open"/>`routes/`<VPIcon icon="fa-brands fa-js"/>`auth.js` login handler to create and store a refresh token, then set the cookie.

```js :collapsed-lines title="routes/auth.js"
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const {
  createJti,
  signAccessToken,
  signRefreshToken,
  persistRefreshToken,
  setRefreshCookie
} = require('../utils/tokens');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const accessToken = signAccessToken(user);

    const jti = createJti();
    const refreshToken = signRefreshToken(user, jti);

    await persistRefreshToken({
      user,
      refreshToken,
      jti,
      ip: req.ip,
      userAgent: req.headers['user-agent'] || ''
    });

    setRefreshCookie(res, refreshToken);

    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
```

On login, we issue both tokens. The access token goes to the JSON response. The refresh token goes to an HTTP-only cookie scoped to `/api/auth/refresh`. This keeps the refresh token away from frontend code while still letting the browser send it to the refresh endpoint.

### 4. The Refresh Endpoint

Create an endpoint that reads the refresh cookie, verifies it, checks the database entry, and rotates it. If all checks pass, it returns a new access token and sets a new refresh cookie.

Add to <VPIcon icon="fas fa-folder-open"/>`routes/`<VPIcon icon="fa-brands fa-js"/>`auth.js`:

```js :collapsed-lines title="routes/auth.js"
const { hashToken, rotateRefreshToken } = require('../utils/tokens');

router.post('/refresh', async (req, res) => {
  try {
    const token = req.cookies?.refresh_token;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }

    const tokenHash = hashToken(token);
    const doc = await RefreshToken.findOne({ tokenHash, jti: decoded.jti }).populate('user');

    if (!doc) {
      return res.status(401).json({ message: 'Refresh token not recognized' });
    }
    if (doc.revokedAt) {
      return res.status(401).json({ message: 'Refresh token revoked' });
    }
    if (doc.expiresAt < new Date()) {
      return res.status(401).json({ message: 'Refresh token expired' });
    }

    const result = await rotateRefreshToken(doc, doc.user, req, res);
    return res.json({ accessToken: result.accessToken });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
```

The refresh endpoint verifies the cookie, checks the database record, confirms it is not expired or revoked, then rotates it. Rotation sets `revokedAt` on the old record and creates a new one with a fresh `jti`. The response returns a new access token and sets a new refresh cookie.

### 5. Logout and Revoke

On logout, revoke the current refresh token and clear the cookie.

```js
router.post('/logout', async (req, res) => {
  try {
    const token = req.cookies?.refresh_token;
    if (token) {
      const tokenHash = hashToken(token);
      const doc = await RefreshToken.findOne({ tokenHash });
      if (doc && !doc.revokedAt) {
        doc.revokedAt = new Date();
        await doc.save();
      }
    }
    res.clearCookie('refresh_token', { path: '/api/auth/refresh' });
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
```

Logout revokes the matching refresh token if present and clears the cookie. This ends the session cleanly on the server side and the client side.

### 6. Client Flow

Here is how the browser app should behave:

- Keep the access token in memory. Do not put it in localStorage.
- Call protected APIs with the `Authorization` header or let cookies handle it if you chose the cookie approach for access.
- If a call fails with `Access token expired`, call `/api/auth/refresh`. The browser sends the refresh cookie automatically.
- Replace the in-memory access token with the new one.
- Retry the original request.
- On logout, call `/api/auth/logout` and clear any local state.

### 7. Security Notes

There are some key steps you can take to make sure everything is secure:

#### Separate secrets

Use a different secret for access and refresh tokens. If the access secret leaks, refresh tokens still use a different key. Set `JWT_SECRET` and `REFRESH_TOKEN_SECRET` in <VPIcon icon="iconfont icon-doitenv" />`.env`.

#### HTTPS only

Serve production traffic over HTTPS. Cookies marked `secure: true` only travel over HTTPS. This protects tokens in transit.

#### Rotate on every refresh

Issue a new refresh token and revoke the old one each time you refresh. Rotation makes a stolen old token useless after the next refresh.

#### Hash refresh tokens in the database

Store a SHA-256 hash, not the raw token. This way a database leak does not give attackers the actual token string.

#### Scope and flags for cookies

Use `httpOnly: true`, `secure: true` in production, `sameSite: 'strict'`, and a narrow `path` such as `/api/auth/refresh`. These flags reduce XSS and CSRF risk and limit where the cookie is sent.

#### Short access TTL and moderate refresh TTL

Keep access tokens short, such as 15 minutes. Use a refresh lifetime like 7 days. This keeps risk low without annoying users.

#### Device awareness

Store `ip` and `userAgent`. If patterns change in a suspicious way, you can revoke or challenge the session.

#### Auditing and limits

Log refresh events and consider rate limits on the refresh endpoint. This helps detect abuse.’

Add to <VPIcon icon="iconfont icon-doitenv" />`.env`:

```sh title=".env"
REFRESH_TOKEN_SECRET=your_refresh_secret_key
```

---

## Conclusion

You now have a working authentication system that uses JWTs and refresh tokens to keep users logged in safely. The access token handles quick verification. The refresh token quietly renews access when it expires. Together, they strike a balance between security and convenience.

You built user registration, login, protected routes, and a full refresh flow. You also learned how to rotate refresh tokens, store them securely, and handle logout cleanly. Each step adds another layer of safety that keeps your app and users protected.

From here, you can expand this setup to match your real project. You can add role-based permissions, track user sessions by device, or move the logic into a dedicated authentication service. What matters most is understanding the flow and keeping tokens short-lived and well-guarded.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Secure Authentication System with JWT and Refresh Tokens",
  "desc": "Every app that handles user accounts needs a way to confirm who’s who. That’s what authentication is for, making sure the person using an app is the person they claim to be. But doing this securely is harder than it sounds. Traditional methods often ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-secure-authentication-system-with-jwt-and-refresh-tokens.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
