---
lang: en-US
title: "The JSON Web Token Handbook: Learn to Use JWTs for Web Authentication"
description: "Article(s) > The JSON Web Token Handbook: Learn to Use JWTs for Web Authentication"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
  - DevOps
  - Security
  - JWT
  - Data Science
  - MongoDB
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
  - data-science
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The JSON Web Token Handbook: Learn to Use JWTs for Web Authentication"
    - property: og:description
      content: "The JSON Web Token Handbook: Learn to Use JWTs for Web Authentication"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-json-web-token-handbook-learn-to-use-jwts-for-web-authentication.html
prev: /programming/js-express/articles/README.md
date: 2025-10-09
isOriginal: false
author:
  - name: Sumit Saha
    url : https://freecodecamp.org/news/author/sumitsaha/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1759947512495/9c8aee78-1a83-4958-8c01-110e2247286d.png
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
  name="The JSON Web Token Handbook: Learn to Use JWTs for Web Authentication"
  desc="JWT stands for JSON Web Token, and it’s one of those terms you’ll constantly come across in modern web development. At its core, a JWT is a JSON-based open standard format that allows you to represent specific claims securely between two parties. The..."
  url="https://freecodecamp.org/news/the-json-web-token-handbook-learn-to-use-jwts-for-web-authentication"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1759947512495/9c8aee78-1a83-4958-8c01-110e2247286d.png"/>

JWT stands for JSON Web Token, and it’s one of those terms you’ll constantly come across in modern web development.

At its core, a JWT is a JSON-based open standard format that allows you to represent specific claims securely between two parties. The exciting part is how widely JWT is used, especially in microservice architectures and modern authentication systems.

In this article, we’ll break down what JWTs really are, explore their structure, and see exactly how they help secure web applications. By the end, you’ll understand why developers rely on JWTs every single day.

---

## Here’s What We’ll Cover

4. [JWT Structure: Header, Payload & Signature](#heading-jwt-structure-header-payload-amp-signature)
5. [Example: Decoding a JWT](#heading-example-decoding-a-jwt)
6. [How JWTs Ensure Security: The Signature](#heading-how-jwts-ensure-security-the-signature)
7. [Security Considerations and Token Management](#heading-security-considerations-and-token-management)
8. [How to Create JWTs in Different Languages](#heading-how-to-create-jwts-in-different-languages)
9. [Practical Implementation: JWT Authentication with Express + MongoDB](#heading-practical-implementation-jwt-authentication-with-express-mongodb)

::: note Prerequisites

To follow along and get the most out of this guide, you should have:

1. Basic familiarity with JavaScript / Node.js
2. Node.js and npm installed on your local machine
3. Basic understanding of HTTP and REST APIs
4. Understanding of JSON and how to parse/serialize it
5. Basic knowledge of Express (or ability to follow along)
6. A running instance of MongoDB (local or remote)
7. Experience with asynchronous code / Promises / async-await
8. Familiarity with environment variables / .env setup

:::

I’ve also created a video to go along with this article. If you’re the type who likes to learn from video as well as text, you can check it out here:

---

## What is a JWT?

JWTs are most commonly used for authentication today, but that wasn’t actually their original purpose. They were created to provide a standard way for two parties to securely exchange information. In fact, there’s even an industry standard specification ([<VPIcon icon="fas fa-globe"/>RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)) that lays out exactly how JWTs should be structured and how they’re meant to be used for data exchange. Think of it like [<VPIcon icon="fa-brands fa-wikipedia-w"/>ECMAScript](https://en.wikipedia.org/wiki/ECMAScript), or ES, which defines the standard for JavaScript.

![Client Server Secure Communication](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525281325/62565bc2-dc09-4565-8e5b-12b6333e6ff6.jpeg)

In real-world applications, JWTs are primarily used for authentication, and that’s the angle we’ll focus on in this article.

But remember that JWTs weren’t designed only for authentication. There are other ways to handle authentication too, and one of the most popular alternatives is session tokens.

---

## Why Do We Need Tokens?

Whatever authentication strategy we use, whether it’s a session token or a JWT, the underlying reason is the same: the stateless nature of the HTTP protocol.

When we exchange requests and responses from a browser to a server or between servers using HTTP, the protocol itself does not retain any information.

*Stateless* means that during interactions between the client and the server, HTTP doesn’t remember any previous requests or data. In other words, every request must carry all the necessary information separately. HTTP doesn’t store any data on its own. Once it receives information, it forgets it. That’s why we say HTTP is stateless, as it has no inherent state or persistent information.

Think of it this way: when we access a webpage from a server, what information do we actually send to the server? If it’s a simple static website, we don’t need to send much. We just send the URL of the page to the server, and the server responds by delivering the corresponding HTML page. This means the server doesn’t need to remember any information or maintain any state, which is exactly how HTTP is designed to work, because HTTP itself is stateless.

![Simple HTML Response from a Static Website](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525352836/7e6081f5-7d34-462a-9a7d-bcffd0242e00.jpeg)

But if the web application provides different responses for each user – in other words, if the website is dynamic – then sending only the URL is not sufficient. The user must also send their identity along with the URL to the server.

For example, if a user wants to access `page-1`, they must tell the server: “*I am User A, please give me page-1.*” The server will then respond with `page-1` accordingly. But next time, if the user requests, “*Now give me page-2*”, what will the server do? Since HTTP is stateless, if the request doesn’t include the user’s identity, the server won’t know which response to provide. This means that with every request, the user must provide their identity, right?

But if we look at the websites around us, do we really have to provide our identity every single time? Take Facebook as an example. Once we authenticate and log in, the server shows us the homepage when we request it, or our profile page when we request that, without requiring us to authenticate with every single request.

So the question is, if HTTP is stateless, how is this possible? How does the web application remember our browsing session? The answer is that, web applications can maintain sessions in different ways, and one of the most common methods is by using **tokens**.

![How Server Remember our Browsing Session?](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525399836/7b7cdeab-4baa-4cda-bbeb-aaf4e4d4170c.jpeg)

### Session Tokens: The Classic Approach

There are two popular options for this. One is a **Session Token**, and the other is a **JSON Web Token (JWT)**. Let’s understand both so that it becomes clear what JWTs are and why they’re used.

Imagine a scenario in a company’s customer care department. A customer calls in with a complaint. The customer support representative listens to the issue and tries various troubleshooting steps but is unable to resolve the problem.

At this point, they forward the case to their higher management team and create a case file for the customer. This file contains all conversations with the customer and details of the troubleshooting attempts. The customer is then given a case ID or ticket ID, so that the next time they call, they don’t have to go through the same steps all over again.

![Customer Care Scenerio 1 - Session Token Analogy](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525453002/c56bb7da-f6dd-4afe-b16b-966149bc7f91.jpeg)

The next day, when the customer calls again, they give their ticket ID to the customer care representative. The representative searches the system using that ticket ID, retrieves the details, and is able to respond accurately to the customer.

![Customer Care Scenerio 2 - Session Token Analogy](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525515798/426af5fa-ff38-4ce2-ae1b-48ca1a8f1e6c.jpeg)

This scenario illustrates how authentication works in a web application using a session token. When a user authenticates, the server creates a session and keeps track of it. A session ID is generated for that session and sent back to the user, similar to the support ticket in the earlier example. From then on, whenever the user sends a request to the server, they include this session ID or token. The server looks up the session using that ID and identifies the client. Since the server has to handle multiple clients, this session token method has become an effective and widely used strategy for authentication.

And how the client sends the session ID to the server can vary depending on the implementation. The most common method is to store the session ID in the browser’s cookies. The advantage of this approach is that whenever the browser sends a request to the same server, it automatically adds the cookie information to the request header. This is a built-in behaviour of browsers, so no extra steps are needed.

![Session Token Example](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525561275/5881de41-571d-40ca-a0f7-4022d8c41754.jpeg)

When the user authenticates, the server saves data in the browser’s cookie, and from then on, that cookie information is sent automatically with every request, allowing the server to recognize the user. This was a very popular method, although in modern applications it has become a bit outdated.

But this mechanism has some issues. The biggest problem is that it assumes there is only a single server. In modern web applications, there are usually multiple servers. In such cases, a load balancer sits in front and decides which server will handle the user’s request.

Let’s say the session token method is being used. When the user sends the first request, the load balancer forwards it to `Server-1`. `Server-1` creates a session ID and sends it back to the client. Later, when the user sends another request, the load balancer routes it to `Server-2`. But `Server-2` doesn’t have that session ID stored, so how will it know which user the request belongs to?

The common solution to this is to store session IDs not on a specific server but in a shared [<VPIcon icon="iconfont icon-redis"/>Redis](https://redis.io/) database, so that any server can verify the session ID from there. This is what’s called a **Redis cache**. But in a microservice architecture, this approach has a weakness. If for some reason the Redis cache goes down, the servers may still be running, but the authentication mechanism will fail. This is exactly where JSON Web Tokens come in, offering a slightly different approach.

![Session Token Handling Multiple Servers with Redis Cache](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525611999/a970e2d9-6663-4a4e-9c63-37ea13470b90.jpeg)

### JWT: The Modern Solution

Let’s revisit the customer care department example. This time, imagine there’s no phone or system. The customer comes directly to the office and meets the support agent in person. Since the agent doesn’t have any system this time, they can’t store all the information like before. Instead, they write everything down on a piece of paper and tell the customer, “*Next time you come, bring this with you.*”

This means the method is a bit different from the previous concept, right? But there’s still a problem: “**validity**”. If the customer isn’t legitimate and acts maliciously, how can the support representative trust them? The next day, if the customer comes in with the same information written on a blank sheet of paper, how can the agent verify the validity of their identity?

In this case, a possible solution is for the customer care executive to sign the paper when giving it to the customer. Then, when the customer brings the paper back, the support representative can verify the signature and confidently provide the service.

JSON Web Tokens work in a similar way. Here, when the client authenticates, instead of the server saving all the information, it sends all the user’s information as a JSON token along with a signature. Later, with each subsequent request, the client sends the entire token along with the request, which contains information like which user it is, their name, and other necessary details.

In this case, the server doesn’t save anything, and all the information stays with the client. Each time the client sends a request with this token, the server can read it, identify which user made the request, and provide the necessary data.

This token is not just a simple ID. It’s a JSON object containing all the information, and this is what we call a JSON Web Token. How the client stores this JWT is entirely up to the client. The most common methods are storing it in the browser’s cookies or local storage.

![JSON Web Token Analogy](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525648690/691848c9-e4c2-4b3f-b3f5-06623627e38f.jpeg)

### JWT Structure: Header, Payload, & Signature

As mentioned, the server receives a JSON object, but a JWT doesn’t look like a regular JSON.

![JWT Structure](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525702339/f74219b8-4a01-4ac4-920b-449faf103520.png)

In the image above, it may seem a bit unusual. In fact, it’s an encoded version of the JSON object, a kind of scrambled or compact representation. If you look closely, you’ll see that a JWT is divided into three parts, separated by dots. The first part is the **header**, the second part is the **JSON payload,** which essentially holds our data, and the third part is the **signature**.

If we examine each part individually:

- The **header** is a separate JSON object.
- The **payload** is also a separate JSON object containing our data.
- The third part is the **signature**.

But what does the signature mean here? Simply put, the signature is a hash value. Our data is hashed using a secret key to create the signature. This secret key is kept on the server. So, when this JSON Web Token is sent to the server, the server can use that secret key to verify the signature. This ensures that the token is valid and has not been tampered with.

---

## Example: Decoding a JWT

Let’s look at an example. The best website for working with JWTs and understanding their structure is [jwt.io](http://jwt.io)[.](https://jwt.io/) If you paste a JWT into the site, three sections appear: the header, payload, and signature. The payload is shown in the “Decoded Payload” section, which contains content and data. You’ll see there’s an ID, a JSON object with a name, and an expiration time.

![Decoding a JWT](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525738886/84c2532f-dc09-4a96-83de-ecd4a24d958f.jpeg)

The header is also a completely valid JSON object, which specifies an algorithm and shows the type –essentially indicating which algorithm will be used to create or verify this JWT.

So, the main data is in the “Decoded Payload” section, and the third part is the signature. Now there’s an important point to note: you might wonder where this scrambled-looking token comes from. It’s actually very simple. The data in the “Decoded Payload” is **Base64 encoded**, and that’s what forms the appearance of this scrambled token.

If you copy this part of the JWT and paste it into any online Base64 decoder, you’ll immediately see the data.

![Base64 Encode Decode](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525794705/4ee950a2-2ad0-40b4-8287-fdfea9543a6f.png)

What does this mean? It means that if this data is encoded again using Base64, the same token will be generated. The header works the same way as well.

And the final point: the scrambled or encoded part. Is it done for security? No, it’s not for security. It’s done purely for convenience. JSON objects can be quite large, and not all programming languages handle them in the same way. In JavaScript it’s easy, but in other languages, it can sometimes cause issues. So to make it easier to handle, the data is Base64 encoded. This is not for security, as encoding it like this doesn’t make the data secure, because the information can still be viewed publicly.

As you can see in the diagram above, the moment you enter it on this site, your data is immediately visible. This means that no sensitive information should be stored here, only user identification details, like a user ID or other public information. **Passwords or any secret keys should never be stored in the token, because they can be easily read.** Even though it looks scrambled or encoded, it is actually public.

---

## How JWTs Ensure Security: The Signature

Now let’s move to the security part, which is ensured by the signature. In our earlier paper example, a person could simply add a signature by hand.

But for data, the process of creating a signature is different. For data, the signature is created cryptographically using a secret key, which is the actual signature. The process of creating the signature is as follows:

1. The data is Base64 encoded.
2. It is concatenated with the secret key.
3. It is encoded again in Base64.

The configuration specifies an algorithm. This algorithm can be changed, but the same algorithm used to create the token must be used to verify it. In other words, the algorithm for generating and verifying the token must always be the same.

Finally, the data is hashed using a secret key. This secret key is not available to the public. Instead, it’s kept only on the server, usually stored securely in a server vault. When this JWT reaches the server, the server uses the secret key to verify whether the token is valid. If it doesn’t match correctly, it will display “invalid signature.” This ensures that the server can confirm whether the token has been tampered with and that its integrity is intact.

![The Big Formula](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525829955/bf017016-d9fd-43cb-836a-eafe4f35540b.jpeg)

For example, if you use `love-you-all-from-logicbaselabs` as the signature, and the server verifies it, it will show “*signature verified*”. This demonstrates that the secret key exists only on the server. This ensures that even though public information is displayed, the token’s validity can be confirmed.

JSON Web Tokens aren’t like a password, though. They primarily serve to identify the user. The server can check the JWT to determine whether it belongs to a valid user. In other words, the JWT represents the user’s identity. It’s a very important token, containing secure content along with the signature.

![Signature Verification](https://cdn.hashnode.com/res/hashnode/image/upload/v1759525873387/a434b453-0a38-41a5-93f3-bd12b46806f3.jpeg)

---

## Security Considerations and Token Management

One important thing to remember: if someone gets hold of your JWT, meaning they have the exact same token, they can easily log in as that user. They just need to send requests with that token to gain the necessary access.

You could think of it like this: if someone gets hold of your Facebook password, they can log in to your Facebook account. Similarly, if someone obtains your PayPal account PIN, they can easily access your account. In other words, if someone gets hold of your most secure information, there’s no way to protect it.

The same applies to JWTs: keeping the token safely on the client side is absolutely crucial. In this regard, we are somewhat vulnerable.

There is, though, one key difference. In the case of session tokens, if we assume an account has been compromised, the server can invalidate that session. In other words, no one can log in using that session ID anymore.

But with a JWT, the token remains valid until its expiration time. So there’s no direct way to invalidate it. Since the token is cryptographically self-contained and signed with the server’s secret key, once it’s created, it cannot be directly revoked by the server.

The only way to handle this is what’s done on the web: denylisting the token. In other words, the server maintains a separate database listing all JWT tokens that are denylisted. Whenever a request comes in, the server first verifies whether the token is valid. Then, through middleware, it checks whether the token is on the denylist. Only if it’s not on that list is the user allowed access.

So, these are the rules for using JSON Web Tokens. JWTs can be used in any programming language, especially in the context of REST APIs. They are extremely popular and widely used in microservice architectures.

---

## How to Create JWTs in Different Languages

How you create a JWT depends on the programming language you’re using. For example, in Node.js, there are specialized libraries available, like [<VPIcon icon="fa-brands fa-npm"/>`jsonwebtoken`](https://npmjs.com/package/jsonwebtoken), so it’s straightforward. And in PHP, there are easy-to-use options for creating JWTs as well. So, JWTs are a universal tool, not limited to any specific programming language. Many people think they’re only for JavaScript, but that’s not true.

And remember that JWTs aren’t just used for authentication purposes. You can use them to represent any kind of identity. For example, if you’re going to a concert, access could be granted using a JWT instead of a regular ticket. When your client uses that JWT, the gateway or server can read the token, provide access to the information, and verify it using the signature.

---

## Practical Implementation: JWT Authentication with Express + MongoDB

In this section, we will put into practice all the concepts we have learned so far. Using [**Express.js**](/freecodecamp.org/the-express-handbook/README.md) and [**MongoDB**](/freecodecamp.org/how-to-start-using-mongodb.md), we will build a complete JWT authentication system step by step.

Don’t worry if it feels overwhelming at first. We will go carefully, one step at a time, and by the end, you will have a fully working project. Think of it as entering a building floor by floor: we’ll explore each section thoroughly and come out with a solid understanding.

### 1. Project Setup & Dependencies

Before writing any code, we need to set up our Node.js project and install the required dependencies.

#### Initialize the Node.js Project

Open your terminal and run:

```sh
mkdir jwt-auth-demo
cd jwt-auth-demo
npm init -y
```

This will create a <VPIcon icon="iconfont icon-json"/>`package.json` file with default settings.

#### Install Dependencies

We need some packages to build our JWT authentication system:

```sh
npm install express mongoose bcryptjs jsonwebtoken dotenv
```

- `express`: Fast and minimal Node.js web framework to create API routes.
- `mongoose`: ODM (Object Data Modeling) library to interact with MongoDB easily.
- `bcryptjs`: Library to hash and compare passwords securely.
- `jsonwebtoken`: Library to generate and verify JWT tokens.
- `dotenv`: Loads environment variables from a <VPIcon icon="fas fa-file-lines"/>`.env` file to keep secrets secure.

#### Install Dev Dependencies (Optional)

For development convenience, install **nodemon** to auto-restart the server on file changes:

```sh
npm install --save-dev nodemon
```

Update <VPIcon icon="iconfont icon-json"/>`package.json` scripts:

```json title="package.json"
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

- `npm start` runs the server normally.
- `npm run dev` runs the server with auto-restart using **nodemon**.

### 2. Project Folder Structure

```sh title-="file structure"
jwt-auth-demo/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── authController.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── auth.js
│
├── services/
│   ├── hashService.js
│   └── jwtService.js
│
├── .env
├── server.js
├── package.json
```

::: info What goes where?

- `config/`: Database connection and environment config.
- `controllers/`: Main logic for each endpoint.
- `middlewares/`: Functions that run before controllers (for example, auth checks).
- `models/`: Mongoose schemas.
- `routes/`: API endpoint definitions.
- `services/`: Reusable logic (hashing, JWT).
- <VPIcon icon="fas fa-file-lines"/>`.env`: Secrets and config variables.
- `server.js`: Entry point of the app.

:::

### 3. Step-by-Step Implementation

#### Initialize the Express Server

Before doing anything complex, we need to set up a simple server using Express. Think of this as the heart of our application. This server will be responsible for listening to incoming requests (like user login or register) and sending back responses.

```js title="server.js"
// Import the express library to build our server
const express = require("express");

// Create an instance of express
const app = express();

// Middleware to parse JSON request bodies (important for APIs)
app.use(express.json());

// Default route to test server
app.get("/", (req, res) => {
  res.send("Hello World! Your server is working 🚀");
});

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

- We import Express and create an app instance.
- We use middleware to parse JSON requests (important for APIs).
- We define a simple route `/` to test if our server works.
- We start the server on port 5000 and log a message when it's running.

Now, let’s test it:

- Run `node server.js` or `npm run dev`.
- Open your browser at `http://localhost:5000`.
- You should see: `Hello World! Your server is working 🚀`

#### Connect MongoDB with Mongoose

In this step, we want to store users in a database. For that, we will use MongoDB. To interact with MongoDB in Node.js easily, we use Mongoose, which is an ODM library.

```js title="config/db.js"
// Import mongoose
const mongoose = require("mongoose");

// Connect to MongoDB using environment variable
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDB;
```

Now our server is connected to MongoDB. Whenever we insert, update, or query data, it will go into this database.

```sh title=".env"
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/jwt-auth-demo
JWT_SECRET=your_super_secret_key
```

The .env file stores sensitive information like your database URI, JWT secret, and server port. By using environment variables, you can keep secrets out of your code and easily change configuration without modifying your source files. Never commit .env to public repositories to protect your credentials.

#### Create User Model

In this step, we need to define how a User looks in our database. Each user will have a **name, email, and password**.

```js title="models/User.js"
const mongoose = require("mongoose");

// Define a schema (blueprint of user data)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create and export the model
module.exports = mongoose.model("User", userSchema);
```

As you can see, each user now has a name, email, and hashed password. This ensures that every user we save has these three fields.

#### Hashing & JWT Services

In this step, we will handle password hashing and JWT management using separate services. This keeps our code organized and reusable.

```js title="services/hashService.js"
const bcrypt = require("bcryptjs");

// Function to hash a plain password
exports.hashPassword = async (plainPassword) => {
  // bcrypt.hash generates a hashed version of the password
  // The number 10 is the salt rounds, which affects the hashing complexity
  return await bcrypt.hash(plainPassword, 10);
};

// Function to compare a plain password with a hashed password
exports.comparePassword = async (plainPassword, hashedPassword) => {
  // bcrypt.compare checks if the plain password matches the hashed one
  return await bcrypt.compare(plainPassword, hashedPassword);
};
```

- `hashPassword(plainPassword)`: Takes a plain text password and returns a hashed version using bcrypt. Never store plain passwords directly.
- `comparePassword(plainPassword, hashedPassword)`: Compares a user-entered password with the hashed password stored in the database. Returns `true` if they match.

```js title="services/jwtService.js"
const jwt = require("jsonwebtoken");

// Function to generate a JWT
exports.generateToken = (payload) => {
  // jwt.sign creates a signed token using our secret key from environment variables
  // expiresIn defines how long the token is valid (1 hour here)
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Function to verify a JWT
exports.verifyToken = (token) => {
  // jwt.verify checks if the token is valid and not expired
  return jwt.verify(token, process.env.JWT_SECRET);
};
```

- `generateToken(payload)`: Generates a JWT for a user. The `payload` typically contains user ID and email.
- `verifyToken(token)`: Verifies that the JWT is valid and returns the decoded payload if successful.
- Using a separate JWT service keeps token logic centralized and easy to manage.

#### Auth Controller

In this step, we will handle all authentication-related logic in a separate controller. This keeps routes clean and separates business logic from endpoint definitions.

```js :collapsed-lines title="controllers/authController.js"
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../services/hashService");
const { generateToken } = require("../services/jwtService");

// Register new user
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Get user input

    // Step 1: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists!" });

    // Step 2: Hash password using hashService
    const hashedPassword = await hashPassword(password);

    // Step 3: Save user to database
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Step 4: Send success response
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    // Handle errors gracefully
    res.status(500).json({ error: err.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body; // Get user input

    // Step 1: Find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Step 2: Compare provided password with hashed password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Step 3: Generate JWT using jwtService
    const token = generateToken({ id: user._id, email: user.email });

    // Step 4: Send success response with token
    res.json({ message: "Login successful!", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Protected profile route
exports.profile = (req, res) => {
  // req.user is set by auth middleware after token verification
  res.json({
    message: "Welcome to your profile!",
    user: req.user,
  });
};
```

**File:** <VPIcon icon="fas fa-folder-open"/>`controllers/`<VPIcon icon="fa-brands fa-js"/>`authController.js`: Contains all logic related to authentication.

- `exports.register` handles user registration:
  - Checks if the user exists.
  - Hashes the password using `hashService`.
  - Saves the new user to MongoDB.
  - Returns a success message.
- `exports.login` handles user login:
  - Finds the user by email.
  - Compares passwords using `hashService.comparePassword`.
  - Generates a JWT token if valid.
  - Returns the token in the response.
- `exports.profile` handles protected profile route:
  - Returns user information from `req.user`, which is set by the auth middleware.
- Using a controller keeps route definitions clean and separates business logic from endpoint handling.

#### Auth Middleware

In this step, we create a middleware to protect routes by verifying JWTs. Only authenticated users can access protected endpoints.

```js title="middlewares/authMiddleware.js"
const { verifyToken } = require("../services/jwtService");

// Middleware to protect routes
module.exports = (req, res, next) => {
  // Step 1: Get Authorization header
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  // Step 2: Extract token from format 'Bearer <token>'
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Malformed token" });

  try {
    // Step 3: Verify token using jwtService
    const decoded = verifyToken(token);

    // Step 4: Attach decoded user info to request object
    req.user = decoded;

    // Proceed to next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid or expired
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
```

**File:** <VPIcon icon="fas fa-folder-open"/>`middlewares/`<VPIcon icon="fa-brands fa-js"/>`authMiddleware.js` – Middleware for protecting routes.

- Step 1: Checks if the `Authorization` header is present.
- Step 2: Extracts the token from the `Bearer <token>` format.
- Step 3: Verifies the token using `jwtService.verifyToken`.
- Step 4: Attaches the decoded user info to `req.user` for use in subsequent route handlers.
- If the token is missing, malformed, invalid, or expired, the middleware responds with **401 Unauthorized**. This ensures only authenticated users can access protected routes.

#### Auth Routes

In this step, we will define authentication-related routes and connect them with the controller and middleware.

```js title="routes/auth.js"
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Step 1: Register route
// Users send their name, email, and password to this endpoint
router.post("/register", authController.register);

// Step 2: Login route
// Users send email and password to receive JWT
router.post("/login", authController.login);

// Step 3: Protected profile route
// Only accessible to authenticated users with a valid JWT
router.get("/profile", authMiddleware, authController.profile);

module.exports = router;
```

**File:** <VPIcon icon="fas fa-folder-open"/>`routes/`<VPIcon icon="fa-brands fa-js"/>`auth.js`: Central file to define authentication endpoints.

- `router.post("/register", authController.register)`: Handles user registration.
- `router.post("/login", authController.login)`: Handles user login and token generation.
- `router.get("/profile", authMiddleware, authController.profile)`: Protected route, requires JWT. The `authMiddleware` ensures only authenticated users can access it.
- Using routes with controllers and middleware keeps the application organized and professional.

#### Main Server File

This is the main entry point of our application. It sets up the server, connects to the database, and mounts all routes.

```js title="server.js"
require("dotenv").config(); // Step 1: Load environment variables from .env
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Step 2: Connect to MongoDB
connectDB();

// Step 3: Middleware to parse JSON request bodies
app.use(express.json());

// Step 4: Mount auth routes
// All auth-related routes will start with /api/auth
app.use("/api/auth", require("./routes/auth"));

// Step 5: Default route to test server
app.get("/", (req, res) => {
  res.send("Hello World! Your server is working 🚀");
});

// Step 6: Start server on PORT from .env or default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

- **Load environment variables:** Using `dotenv` to keep secrets and configuration separate from code.
- **Connect to MongoDB:** Calls `connectDB()` from <VPIcon icon="fas fa-folder-open"/>`config/`<VPIcon icon="fa-brands fa-js"/>`db.js`.
- **Middleware:** `express.json()` allows Express to parse JSON request bodies.
- **Mount routes:** `app.use("/api/auth", ...)` registers all authentication routes.
- **Default route:** A simple GET endpoint to verify server is running.
- **Start server:** `app.listen` starts listening on the configured port.

### 4. How to Test Your API

In this section, you’ll learn how to test your JWT authentication API using tools like Postman or any HTTP client.

Before testing, make sure your server is running. If it’s not running, open a terminal and run:

```sh
npm run dev
```

or

```sh
node server.js
```

This will start your server on the port defined in <VPIcon icon="fas fa-file-lines"/>`.env` (default `5000`).

Make sure your MongoDB is running. If using local MongoDB, start it with:

```sh
mongod
```

or ensure your MongoDB service is active.

Always check the terminal for any errors. If the server or database fails to start, your API requests will not work.

#### Register a User

```http title="Request"
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "sumit",
  "email": "sumit@example.com",
  "password": "mypassword"
}
```

```json title="Response"
{
  "message": "User registered successfully!"
}
```

This sends a POST request to `http://localhost:5000/api/auth/register` with user details. If successful, you get a confirmation message.

#### Login

```http title="Request"
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "sumit@example.com",
  "password": "mypassword"
}
```

```json title="Response"
{
  "message": "Login successful!",
  "token": "<JWT_TOKEN>"
}
```

This sends a POST request to `http://localhost:5000/api/auth/login` with email and password. If the credentials are correct, you receive a JWT to access protected routes.

#### Access Protected Route

```http title="Request"
GET http://localhost:5000/api/auth/profile
Authorization: Bearer <JWT_TOKEN>
```

```json title="Response"
{
  "message": "Welcome to your profile!",
  "user": {
    "id": "...",
    "email": "sumit@example.com",
    "iat": ...,
    "exp": ...
  }
}
```

This sends the JWT in the `Authorization` header using the `Bearer` scheme.

- Only valid tokens will allow access to this protected route.
- `iat` and `exp` indicate issued-at and expiry time of the token.

::: note

Always include `Authorization: Bearer <token>` for protected routes.

:::

---

## Summary

This article gave you a comprehensive overview of JSON Web Tokens (JWTs) and their role in web authentication. It explained the stateless nature of HTTP, the need for tokens, and compares classic session tokens with JWTs.

We covered JWT structure, security mechanisms, and practical implementation using Node.js, Express, and MongoDB. We also discussed security considerations, token management, and how to test a JWT authentication API.

### Here’s a Summary of the Key Points:

#### 1. What is JWT?

- JWT is a JSON-based open standard for securely representing claims between two parties, defined by RFC 7519.
- Widely used for authorization in modern web applications and microservice architectures.
- Alternative to session tokens for maintaining user state.

#### 2. Stateless Nature of HTTP

- HTTP does not retain information between requests, requiring each request to carry necessary data.
- Tokens (session or JWT) are used to maintain user sessions in dynamic web applications.

#### 3. Session Tokens

- Classic approach where the server creates and stores a session ID, typically in cookies.
- Works well for single-server setups but requires shared storage (for example, Redis) in multi-server environments.
- Vulnerable if the shared cache goes down.

#### 4. JWT: The Modern Solution

- Server sends a signed JSON token to the client, which stores and sends it with each request.
- No server-side storage required – all user info is in the token.
- Signature ensures validity and integrity.

#### 5. JWT Structure

- Three parts: Header, Payload, Signature (separated by dots).
- Header and payload are Base64 encoded JSON objects. Signature is a hash using a secret key.
- Base64 encoding is for convenience, not security.

#### 6. Decoding JWTs

- Tools like [<VPIcon icon="iconfont icon-jwt"/>jwt.io](https://jwt.io/) can decode JWTs to show header, payload, and signature.
- Sensitive data should not be stored in JWTs, as payload is publicly readable.

#### 7. JWT Security

- Signature is created using a secret key and cryptographic algorithm.
- Server verifies token integrity using the secret key.
- JWTs identify users but do not act as passwords.

#### 8. Security Considerations & Token Management

- If a JWT is compromised, the attacker can impersonate the user until the token expires.
- JWTs cannot be directly revoked; blacklisting is used to invalidate compromised tokens.
- Session tokens can be invalidated by the server.

#### 9. JWTs in Different Languages

- JWTs are language-agnostic and can be implemented in Node.js, PHP, and other languages.
- Useful for authentication and representing any kind of identity.

#### 10. Practical Implementation: JWT Authentication with Express + MongoDB
  
- Step-by-step guide to building a JWT authentication system:
  - Project setup and dependencies
  - Folder structure
  - Express server initialization
  - MongoDB connection
  - User model creation
  - Password hashing and JWT services
  - Auth controller and middleware
  - Auth routes
  - Main server file
  - API testing instructions

#### 11. Testing the API

- Instructions for registering users, logging in, and accessing protected routes using tools like Postman.
- Example requests and responses provided.

#### 12. Summary & Final Words

- JWTs are secure, stateless, and widely used for authorization.
- Security depends on safe token storage and proper management.

---

## Final Words

You can find all the source code from this tutorial in [this GitHub repository (<VPIcon icon="iconfont icon-github"/>`logicbaselabs/jwt-auth-demo`)](https://github.com/logicbaselabs/jwt-auth-demo). If it helped you in any way, consider giving it a star to show your support!

Also, if you found the information here valuable, feel free to share it with others who might benefit from it. I’d really appreciate your thoughts – mention me on X [<VPIcon icon="fa-brands fa-x-twitter"/>`@sumit_analyzen`](https://x.com/sumit_analyzen) or on Facebook [@sumit.analyzen](https://facebook.com/sumit.analyzen), [watch my coding tutorials (<VPIcon icon="fa-brands fa-youtube"/>`@logicBaseLabs`)](https://youtube.com/@logicBaseLabs), or simply [connect with me (<VPIcon icon="fa-brands fa-linkedin"/>`sumitanalyzen`)](https://linkedin.com/in/sumitanalyzen/) on LinkedIn.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The JSON Web Token Handbook: Learn to Use JWTs for Web Authentication",
  "desc": "JWT stands for JSON Web Token, and it’s one of those terms you’ll constantly come across in modern web development. At its core, a JWT is a JSON-based open standard format that allows you to represent specific claims securely between two parties. The...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-json-web-token-handbook-learn-to-use-jwts-for-web-authentication.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
