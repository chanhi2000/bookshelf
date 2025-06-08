---
lang: en-US
title: "How to Harden Your Node.js APIs – Security Best Practices"
description: "Article(s) > How to Harden Your Node.js APIs – Security Best Practices"
icon: fa-brands fa-node
category:
  - Node.js
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Harden Your Node.js APIs – Security Best Practices"
    - property: og:description
      content: "How to Harden Your Node.js APIs – Security Best Practices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-harden-your-nodejs-apis-security-best-practices.html
prev: /programming/js-node/articles/README.md
date: 2025-04-26
isOriginal: false
author:
  - name: Manish Shivanandhan
    url : https://freecodecamp.org/news/author/manishshivanandhan/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1745597082780/c803850d-f482-4fcc-a744-4de8fd8a02d8.png
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

[[toc]]

---

<SiteInfo
  name="How to Harden Your Node.js APIs – Security Best Practices"
  desc="If you’ve built an API with Node.js, chances are you’ve thought about security – at least a little. Maybe you’ve heard about SQL injection, brute force attacks, or data leaks. But here’s the thing: it’s not just about big hacks. Even small gaps in yo..."
  url="https://freecodecamp.org/news/how-to-harden-your-nodejs-apis-security-best-practices"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1745597082780/c803850d-f482-4fcc-a744-4de8fd8a02d8.png"/>

If you’ve built an API with Node.js, chances are you’ve thought about security – at least a little.

Maybe you’ve heard about SQL injection, brute force attacks, or data leaks.

But here’s the thing: it’s not just about big hacks. Even small gaps in your API can lead to big problems. And no one wants to get that “your data’s been exposed” message.

In this article, I’ll walk you through seven ways to harden your Node.js API.

These are practical tips you can apply right away. I’ll keep the code examples simple and the language even simpler. Let’s get into it.

---

## 1. Use Environment Variables

Storing sensitive data like database credentials, API keys, or JWT secrets directly in your code is risky. If your code ends up in the wrong hands, so does everything else.

Instead, store this data in a <FontIcon icon="fas fa-file-lines"/>`.env` file and use the `dotenv` package to access it:

```js
require('dotenv').config();
```

```js
const dbPassword = process.env.DB_PASSWORD;
```

Make sure you **never** commit your <FontIcon icon="fas fa-file-lines"/>`.env` file. Add it to your `.gitignore` file to keep it private.

---

## 2. Validate All Input

Attackers love user input.

If you don’t check what comes into your API, they’ll sneak in commands, inject code, or crash your app.

The best way to stop them is by validating every piece of input. Use a package like `Joi` or `zod` to define what your API expects:

```js
const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required()
});
const { error } = schema.validate(req.body);
if (error) {
  return res.status(400).send(error.details[0].message);
}
```

In the above code, we have defined the exact data type the schema expects. This way, wrong data gets blocked before it reaches your logic or database.

---

## 3. Rate Limit Your Endpoints

Bots and brute force attacks work by flooding your server with requests. Once your server reaches it limit, your API will crash.

Set a limit on how often a user can hit your API using middleware like `express-rate-limit` Here is an example.

```js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

The above code restricts API requests coming from an IP address to 100 per 15 minutes. This is like putting a speed bump in front of a runaway car.

---

## 4. Always Use HTTPS

HTTP sends data in plain text. That means anyone between your server and the user can read it. HTTPS encrypts everything. It’s not optional anymore.

If you’re using a platform like Heroku or Vercel, HTTPS is automatic. If you’re self-hosting, you can set it up with services like Let’s Encrypt.

Also, force HTTPS on all incoming traffic. You can use middleware like this:

```js
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});
```

Encrypt the ride. Always.

---

## 5. Use Helmet to Secure HTTP Headers

HTTP headers are key-value pairs sent in requests and responses over the web. They give extra information about what’s being sent – like who’s sending it, what type it is, how it should be handled, and more.

HTTP headers are small, but they can be powerful tools to protect your app. `Helmet` is a Node.js middleware that sets secure headers for you.

```js
const helmet = require('helmet');
app.use(helmet());
```

Helmet helps prevent attacks like cross-site scripting (XSS), clickjacking, and others just by setting the right headers.

One line of code, a big step up in security.

---

## 6. Sanitize Data to Prevent Injection Attacks

Injection attacks happen when you blindly trust input and plug it into a command or query.

For example, an attacker might submit a piece of text that turns into a command in your database.

You should sanitize data before it gets to any sensitive function. Libraries like `express-mongo-sanitize` or `xss-clean` help clean up malicious input.

```js
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

app.use(mongoSanitize());
app.use(xss());
```

This strips out dangerous characters and scripts that could do real damage.

---

## 7. Use Strong Authentication and Authorisation

Authentication is about knowing who the user is, and authorisation is about what they can do. You need both, and you need them to be strong.

Use JWT (JSON Web Tokens) or sessions to manage logged-in users. Here’s a quick JWT example:

```js
const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: '1h'
});
```

Always verify the token before letting a user access protected routes:

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

And don’t forget roles. A user who can view data shouldn’t be able to delete it unless they’re supposed to.

---

## Final Thoughts

Security isn’t just a feature – it’s a habit. You can’t do everything all at once, but you can start with a few key changes.

Use environment variables. Validate your inputs. Add rate limiting. Move to HTTPS. Install Helmet. Sanitize everything. Lock down your authentication.

Each of these steps is a small lock on a big door. The more you add, the harder it is for someone to break in. So take a little time now. Your future self and your users will thank you.

::: info

For more cybersecurity tutorials,* [<FontIcon icon="fas fa-globe"/>join our newsletter](https://newsletter.stealthsecurity.sh/). To learn the basics of Offensive Cybersecurity, check out our [<FontIcon icon="fas fa-globe"/>Security Starter Course](https://start.stealthsecurity.sh/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Harden Your Node.js APIs – Security Best Practices",
  "desc": "If you’ve built an API with Node.js, chances are you’ve thought about security – at least a little. Maybe you’ve heard about SQL injection, brute force attacks, or data leaks. But here’s the thing: it’s not just about big hacks. Even small gaps in yo...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-harden-your-nodejs-apis-security-best-practices.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
