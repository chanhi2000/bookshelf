---
lang: en-US
title: "Node.js Authentication With Twilio Verify"
description: "Article(s) > Node.js Authentication With Twilio Verify"
icon: fa-brands fa-node
category:
  - Node.js
  - Express.js
  - Twilio
  - Data Science
  - MongoDB
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - node
  - nodejs
  - node-js
  - express
  - expressjs
  - express-js
  - twilio
  - data-science
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Node.js Authentication With Twilio Verify"
    - property: og:description
      content: "Node.js Authentication With Twilio Verify"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/nodejs-authentication-twilio-verify.html
prev: /programming/js-express/articles/README.md
date: 2022-10-07
isOriginal: false
author:
  - name: Alexander Godwin
    url : https://smashingmagazine.com/author/alexander-godwin/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e77a7ee4-c2ed-4b4c-a147-16df351a6b31/nodejs-authentication-twilio-verify-sharing-card.jpg
---

# {{ $frontmatter.title }} 

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
  "title": "Twilio > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-twilio/articles/README.md",
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
  name="Node.js Authentication With Twilio Verify"
  desc="Integrate two-factor authentication into your Express.js app by building an application that authenticates users using password-based authentication and OTPs powered by the Twilio Verify service."
  url="https://smashingmagazine.com/2022/10/nodejs-authentication-twilio-verify/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e77a7ee4-c2ed-4b4c-a147-16df351a6b31/nodejs-authentication-twilio-verify-sharing-card.jpg"/>

In this tutorial, you’ll learn how to integrate two-factor authentication into your Express.js application. You will build an express application that authenticates users using traditional password-based authentication with an extra layer of security using OTPs powered by the Twilio Verify service. You’ll learn how to build an express backend from scratch and implement authentication while learning about the MVC architecture. MongoDB is the database of choice, and the Ui is built using EJS. By the end of this tutorial, you’ll have a fully functional express application that implements OTPs and passwords for user authentication.

Building authentication into an application is a tedious task. However, making sure this authentication is bulletproof is even harder. As developers, it’s beyond our control what the users do with their passwords, how they protect them, who they give them to, or how they generate them, for that matter. All we can do is get close enough to ensure that the authentication request was made by our user and not someone else. OTPs certainly help with that, and services like *Twilio Verify* help us to generate secured OTPs quickly without having to bother about the logic.

---

## What’s Wrong With Passwords?

There are several problems faced by developers when using password-based authentication alone since it has the following issues:

1. Users might forget passwords and write them down (making them steal-able);
2. Users might reuse passwords across services (making all their accounts vulnerable to one data breach);
3. Users might use easy passwords for remembrance purposes, making them relatively easy to hack.

---

## Enter OTPs

A **one-time password (OTP)** is a password or PIN valid for only one login session or transaction. Once it can only be used once, I’m sure you can already see how the usage of OTPs makes up for the shortcomings of traditional passwords.

OTPs add an extra layer of security to applications, which the traditional password authentication system cannot provide. OTPs are randomly generated and are only valid for a short period of time, avoiding several deficiencies that are associated with traditional password-based authentication.

OTPs can be used to substitute traditional passwords or reinforce the passwords using the two-factor authentication (2FA) approach. Basically, OTPs can be used wherever you need to ensure a user’s identity by relying on a personal communication medium owned by the user, such as phone, mail, and so on.

This article is for developers who want to learn about:

1. Learn how to build a Full-stack express.js application;
2. Implement authentication with passport.js;
3. How to [<VPIcon icon="iconfont icon-twilio"/>Twilio Verify](https://twilio.com/verify) for phone-based user verification.

To achieve these objectives, we’ll build a full-stack application using [<VPIcon icon="fa-brands fa-node"/>node.js](https://nodejs.org/), [<VPIcon icon="iconfont icon-expressjs"/>express.js](https://expressjs.com/), [<VPIcon icon="fas fa-globe"/>EJS](https://ejs.co/) with authentication done using [<VPIcon icon="fas fa-globe"/>passport.js](https://passportjs.org/) and protected routes that require OTPs for access.

::: note

I’d like to mention that we’ll be using some 3rd-party (built by other people) packages in our application. This is a common practice, as there is no need to re-invent the wheel. Could we create our own node server? Yes, of course. However, that time could be better spent on building logic specifically for our application.

:::

::: note Requirements

- Node.js
- MongoDB
- A text editor (e.g. VS Code)
- A web browser (e.g. Chrome, Firefox)
- An understanding of HTML, CSS, JavaScript, Express.js

Although we will be building the whole application from scratch, here’s the [GitHub Repository (<VPIcon icon="iconfont icon-github" />`oviecodes/authwithTwilioVerify`)](https://github.com/oviecodes/authwithTwilioVerify) for the project.

:::

---

## Basic Overview Of Authentication In Web Applications

### What Is Authentication?

**Authentication** is the whole process of identifying a user and verifying that a user has an account on our application.

> Authentication is not to be confused with authorization. Although they work hand in hand, there’s no authorization without authentication.

That being said, let’s see what authorization is about.

### What Is Authorization?

**Authorization** at its most basic, is all about user permissions — what a user is allowed to do in the application. In other words:

1. Authentication: Who are you?
2. Authorization: What can you do?

> Authentication comes before Authorization.  
> There is no Authorization without Authentication.

The most common way of authenticating a user is via `username` and `password`.

### Setting Up Our Application

To set up our application, we create our project directory:

```sh
mkdir authWithTwilioVerify
```

### Building An Express Server

We’ll be using [<VPIcon icon="iconfont icon-expressjs"/>Express.js](https://expressjs.com/) to build our server.

---

## Why Do We Need Express?

Building a server in `Node` could be tedious, but frameworks make things easier for us. `Express` is the most popular `Node` web framework. It enables us to:

- Write handlers for requests with different `HTTP` verbs at different `URL` paths (routes);
- Integrate with `view` rendering engines in order to generate responses by inserting data into templates;
- Set common web application settings — like the `port` used for connecting, and the location of templates used for rendering the response;
- Add additional request processing `middleware` at any point within the request handling pipeline.

In addition to all of these, developers have created compatible middleware packages to address almost any web development problem.

In our `authWithTwilioVerify` directory, we initialize a <VPIcon icon="iconfont icon-json"/>`package.json` that holds information concerning our project.

```sh
cd authWithTwilioVerify
npm init -y
```

In Keeping with the Model View Controller(MVC) architecture, we have to create the following folders in our `authWithTwilioVerify` directory:

```sh
mkdir public controllers views routes config models
```

Many developers have different reasons for using the MVC architecture, but for me personally, it’s because:

1. It encourages separation of concerns;
2. It helps in writing clean code;
3. It provides a structure to my codebase, and since other developers use it, understanding the codebase won’t be an issue.

- `Controllers` directory houses the controllers;
- `Models` directory holds our database models;
- `Public` directory holds our static assets e.g. CSS files, images e.t.c.;
- `Views` directory contains the pages that will be rendered in the browser;
- `Routes` directory holds the different routes of our application;
- `Config` directory holds information that is peculiar to our application.  

We need to install the following packages to build our app:

- `nodemon` automatically restarts our server when we make changes;
- `express` gives us a nice interface to handle routes;
- `express-session` allows us to handle sessions easily in our express application;
- `connect-flash` allows us to display messages to our users.

```sh
npm i nodemon -D
```

Add the script below in the <VPIcon icon="iconfont icon-json"/>`package.json` file to start our server using `nodemon`.

```json title="package.json"
"scripts": {
  "dev": "nodemon index"
},
```

```sh
npm i express express-session connect-flash --save
```

Create an <VPIcon icon="fa-brands fa-js"/>`index.js` file and add the necessary packages for our app.

We have to `require` the installed packages into our <VPIcon icon="fa-brands fa-js"/>`index.js` file so that our application runs well then we configure the packages as follows:

```js :collapsed-lines title="index.js"
const path = require('path')
const express = require('express');
const session = require('express-session')
const flash = require('connect-flash')

const port = process.env.PORT || 3000
const app = express();

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(session({ 
    secret: "please log me in",
    resave: true,
    saveUninitialized: true
    }
));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user
    next();
});

//define error handler
app.use(function(err, req, res, next) {
    res.render('error', {
        error : err
    })
})

//listen on port
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});
```

Let’s break down the segment of code above.

Apart from the `require` statements, we make use of the `app.use()` function — which enables us to use application level `middleware`.

Middleware functions are functions that have access to the request object, response object, and the next middleware function in the application’s request and response cycle.

> Most packages that have access to our application’s state (request and response objects) and can alter those states are usually used as middleware. Basically, middleware adds functionality to our express application.

It’s like handing the application state over to the middleware function, saying here’s the state, do what you want with it, and call the `next()` function to the next middleware.

Finally, we tell our application server to listen for requests to port 3000. Then in the terminal run:

```sh
npm run dev
```

If you see `app is running on port 3000` in the terminal, that means our application is running properly.

---

## Integrating MongoDB Into Our Express Application

MongoDB stores data as documents. These documents are stored in MongoDB in JSON (JavaScript Object Notation) format. Since we’re using Node.js, it’s pretty easy to convert data stored in MongoDB to JavaScript objects and manipulate them.

To install MongoDB in your machine visit the MongoDB [<VPIcon icon="iconfont icon-mongodb"/>documentation](https://mongodb.com/docs/manual/installation/).

In order to integrate MongoDB into our express application, we’ll be using [<VPIcon icon="fas fa-globe"/>Mongoose](https://mongoosejs.com/). Mongoose is an ODM(which is the acronym for `object data mapper`).

Basically, Mongoose makes it easier for us to use MongoDB in our application by creating a wrapper around Native MongoDB functions.

```sh
npm i mongoose --save
```

In <VPIcon icon="fa-brands fa-js"/>`index.js`, it requires `mongoose`:

```js title='index.js"
const mongoose = require('mongoose')

const app = express()

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/authWithTwilio', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  console.log(`connected to mongodb`)
}).catch(e =>
  console.log(e)
)
```

The `mongoose.connect()` function allows us to set up a connection to our MongoDB database using the connection string.

The format for the connection string is `mongodb://localhost:27017/{database_name}`.

`mongodb://localhost:27017/` is MongoDB’s default host, and the `database_name` is whatever we wish to call our database.

Mongoose connects to the database called `database_name`. If it doesn’t exist, it creates a database with `database_name` and connects to it.

`Mongoose.connect()` is a promise, so it’s always a good practice to log a message to the console in the `then()` and `catch()` methods to let us know if the connection was successful or not.

We create our user model in our `models` directory:

```sh
cd models
touch user.js
```

<VPIcon icon="fa-brands fa-js"/>`user.js` requires mongoose and create our user schema:

```js :collapsed-lines title="user.js"
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  username : {
    type: String,
    required: true
  },
  password : {
    type: String,
    required: true
  },
  phonenumber : {
    type: String,
    required: true
  },
  email : {
    type: String,
    required: true
  },
  verified: Boolean
})

module.exports = mongoose.model('user', userSchema)
```

A `schema` provides a structure for our data. It shows how data should be structured in the database. Following the code segment above, we specify that a user object in the database should always have `name`, `username`, `password`, `phonenumber`, and `email`. Since those fields are required, if the data pushed into the database lack any of these required fields, mongoose throws an error.

Though you could create schemaless data in MongoDB, it is not advisable to do so — trust me, your data would be a mess. Besides, schemas are great. They allow you to dictate the structure and form of objects in your database — who wouldn’t want such powers?

---

## Encrypting Passwords

::: warning

Never store users’ passwords as plain text in your database.  

Always encrypt the passwords before pushing them to the database.

:::

The reason we need to encrypt user passwords is this: in case someone somehow gains access to our database, we have some assurance that the user passwords are safe — because all this person would see would be a `hash`. This provides some level of security assurance, but a sophisticated hacker may still be able to crack this `hash` if they have the right tools. Hence the need for OTPs, but let’s focus on encrypting user passwords for now.

`bcryptjs` provides a way to encrypt and decrypt users’ passwords.

```sh
npm i bcryptjs
```

In <VPIcon icon="fas fa-folder-open"/>`models/`<VPIcon icon="fa-brands fa-js"/>`user.js`, it requires `bcryptjs`:

```js title="models/user.js"
//after requiring mongoose
const bcrypt = require('bcryptjs')

//before module.exports
//hash password on save
userSchema.pre('save', async function () {
  return new Promise(async (resolve, reject) => {
    await bcrypt.genSalt(10, async (err, salt) => {
      await bcrypt.hash(this.password, salt, async (err, hash) => {
        if (err) {
          reject(err)
        } else {
          resolve(this.password = hash)
        }
      });
    });
  })
})
userSchema.methods.validPassword = async function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    });
  })
}
```

The code above does a couple of things. Let’s see them.

The `userSchema.pre('save', callback)` is a `mongoose hook` that allows us to manipulate data before saving it to the database. In the `callback function`, we return a promise which tries to `hash(encrypt) bcrypt.hash()` the password using the `bcrypt.genSalt()` we generated. If an error occurs during this `hashing`, we `reject` or we `resolve` by setting `this.password = hash`. `this.password` being the `userSchema password`.

Next, `mongoose` provides a way for us to append methods to schemas using the `schema.methods.method_name`. In our case, we’re creating a method that allows us to validate user passwords. Assigning a function value to `*userSchema.methods.validPassword*`, we can easily use bcryptjs compare method `bcryprt.compare()` to check if the password is correct or not.

`bcrypt.compare()` takes two arguments and a callback. The `password` is the password that is passed when calling the function, while `this.password` is the one from userSchema.

::: note

I prefer this method of validating users’ password because it’s like a property on the user object. One could easily call `User.validPassword(password)` and get true or false as a response.

:::

Hopefully, you can see the usefulness of mongoose. Besides creating a schema that gives structure to our database objects, it also provides nice methods for manipulating those objects — that would have been otherwise somewhat though using native MongoDB alone.

::: note

Express is to Node, as Mongoose is to MongoDB.

:::

---

## Building The Views Of Our Application Using EJS Templating Engine

Before we start building the views of our application, let’s take a look at the front-end architecture of our application.

---

## Front-end Architecture

`EJS` is a templating engine that works with Express directly. There’s no need for a different front-end framework. `EJS` makes the passing of data very easy. It also makes it easier to keep track of what’s going on since there is no switching from back-end to front-end.

We’ll have a `views` directory, which will contain the files to be rendered in the browser. All we have to do is call the `res.render()` method from our controller. For example, if we wish to render the login page, it’s as simple as `res.render('login')`. We could also pass data to the views by adding an additional argument — which is an object to the `render()` method, like `res.render('dashboard', { user })`. Then, in our `view`, we could display the data with the `evaluation syntax <%= %>`. Everything with this tag is evaluated — for instance, `<%= user.username %>` displays the value of the username property of the user object. Aside from the evaluation syntax, `EJS` also provides a **control syntax** (`<% %>`), which allows us to write program control statements such as conditionals, loops, and so forth.

Basically, `EJS` allows us to embed JavaScript in our HTML.

```sh
npm i ejs express-ejs-layouts --save
```

In <VPIcon icon="fa-brands fa-js"/>`index.js`, it requires `express-ejs-layouts`:

```js title="index.js"
//after requiring connect-flash
const expressLayouts = require('express-ejs-layouts')

//after the mongoose.connect logic
app.use(expressLayouts);
app.set('view engine', 'ejs');
```

Then:

```sh
cd views
touch layout.ejs
```

In <VPIcon icon="fas fa-folder-open"/>`views/`<VPIcon icon="fa-brands fa-js"/><VPIcon icon="fa-brands fa-js"/>`layout.ejs`,

```html :collapsed-lines title="views/layout.ejs"
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">
        <link rel="stylesheet" href="/static/css/app.css">
        <link rel="stylesheet" href="/static/css/intlTelInput.css">
    <title>Node js authentication</title>
    </head>
    <body>
    
    <div class="ui container">
        <%- body %>
    </div>
    <script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"
    ></script>
    <script src="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.js"></script>
    </body>
</html>
```

The <VPIcon icon="fa-brands fa-js"/>`layout.ejs` file serves like an <VPIcon icon="fa-brands fa-html5"/>`index.html` file, where we can include all our scripts and stylesheets. Then, in the `div` with classes `ui container`, we render the `body` — which is the rest of our application views.

We’ll be using [<VPIcon icon="fas fa-globe"/>semantic UI](https://semantic-ui.com/) as our CSS framework.

---

## Building The Partials

Partials are where we store re-usable code, so that we don’t have to rewrite them every single time. All we do is *include* them wherever they are needed.

::: note

You could think of partials like components in front-end frameworks: they encourage DRY code, and also code re-usability. Think of partials as an earlier version of components.

:::

For example, we want partials for our menu, so that we do not have to write code for it every single time we need the menu on our page.

```sh
cd views
mkdir partials
```

We’ll create two files in the <VPIcon icon="fas fa-folder-open"/>`/views/partials` folder:

```sh
cd partials
touch menu.ejs message.ejs
```

In <VPIcon icon="fa-brands fa-js"/>`menu.ejs`,

```html title="views/partials/menu.ejs"
<div class="ui secondary menu">
  <a class="active item" href="/"> Home </a>
  <% if(locals.user) { %>
  <a class="ui item" href="/users/dashboard"> dashboard </a>
  <div class="right menu">
    <a class="ui item"> <%= user.username %> </a>
    <a class="ui item" href="/users/logout"> Logout </a>
  </div>
  <% } else {%>
  <div class="right menu">
    <a class="ui item" href="/users/signup"> Sign Up </a>
    <a class="ui item" href="/users/login"> Login </a>
  </div>
  <% } %>
</div>
```

In <VPIcon icon="fa-brands fa-js"/>`message.ejs`,

```html title="views/partials/message.ejs"
<% if(typeof errors != 'undefined'){ %> <% errors.forEach(function(error) { %>
<div class="ui warning message">
  <i class="close icon"></i>
  <div class="header">User registration unsuccessful</div>
  <%= error.msg %>
</div>
<% }); %> <% } %> <% if(success_msg != ''){ %>
<div class="ui success message">
  <i class="close icon"></i>
  <div class="header">Your user registration was successful.</div>
  <%= success_msg %>
</div>
<% } %> <% if(error_msg != ''){ %>
<div class="ui warning message">
  <i class="close icon"></i>
  <div class="header"></div>
  <%= error_msg %>
</div>
<% } %> <% if(error != ''){ %>
<div class="ui warning message">
  <i class="close icon"></i>
  <div class="header"></div>
  <%= error %>
</div>
<% } %>
```

---

## Building The Dashboard Page

In our views folder, we create a <VPIcon icon="fa-brands fa-js"/>`dashboard.ejs` file:

```html title="view/dashboard.ejs"
<%- include('./partials/menu') %>
<h1>
  DashBoard
</h1>
```

Here, we include the `menu partials` so we have the menu on the page.

---

## Building The Error Page

In our views folder, we create an <VPIcon icon="fa-brands fa-js"/>`error.ejs` file:

```html title="view/error.ejs"
<h1>Error Page</h1>
<p><%= error %></p>
```

---

## Building The Home Page

In our views folder, we create a <VPIcon icon="fa-brands fa-js"/>`home.ejs` file:

```html title="view/home.ejs"
<%- include('./partials/menu') %>
<h1>
  Welcome to the Home Page
</h1>
```

---

## Building The Login Page

In our views folder, we create a <VPIcon icon="fa-brands fa-js"/>`login.ejs` file:

```html title="view/login.ejs"
<div class="ui very padded text container segment">
  <%- include ('./partials/message') %>
  <h3>Login Form</h3>

  <form class="ui form" action="/users/login" method="POST">
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" placeholder="Email address" />
    </div>
    <div class="field">
      <label>Password</label>
      <input type="password" name="password" placeholder="Password" />
    </div>
    <button class="ui button" type="submit">Login</button>
  </form>
</div>

```

---

## Building The Verify Page

In our views folder, we create a <VPIcon icon="fa-brands fa-js"/>`login.ejs` file:

```html title="view/login.ejs"
<%- include ('./partials/message') %>
<h1>Verify page</h1>
<p>please verify your account</p>
<form class="ui form" action="/users/verify" method="POST">
  <div class="field">
    <label>verification code</label>
    <input type="text" type="number" name="verifyCode" placeholder="code" />
  </div>
  <button class="ui button" type="submit">Verify</button>
</form>
<br />
<a class="ui button" href="/users/resend">Resend Code</a>
```

Here, we provide a form for users to enter the verification code that will be sent to them.

---

## Building The Sign Up Page

We need to get the user’s mobile number, and we all know that country codes differ from country to country. Therefore, we’ll use the [<VPIcon icon="fas fa-globe"/>`intl-tel-input`](https://intl-tel-input.com/) to help us with the country codes and validation of phone numbers.

```sh
npm i intl-tel-input
```

1. In our public folder, we create a <VPIcon icon="fas fa-folder-open"/>`css` directory, <VPIcon icon="fas fa-folder-open"/>`js` directory and <VPIcon icon="fas fa-folder-open"/>`img` directory:

```sh
cd public
mkdir css js img
```

2. We copy the <VPIcon icon="fa-brands fa-css3-alt"/>`intlTelInput.css` file from <VPIcon icon="fas fa-folder-open"/>`node_modules\intl-tel-input\build\css` file into our <VPIcon icon="fas fa-folder-open"/>`public/css` directory.
3. We copy both the <VPIcon icon="fa-brands fa-js"/>`intlTelInput.js` and <VPIcon icon="fa-brands fa-js"/>`utils.js` from <VPIcon icon="fas fa-folder-open"/>`node_modules\intl-tel-input\build\js` folder into our <VPIcon icon="fas fa-folder-open"/>`public/js` directory.
4. We copy both the <VPIcon icon="fas fa-file-image"/>`flags.png` and <VPIcon icon="fas fa-file-image"/>`flags@2x.png` from <VPIcon icon="fas fa-folder-open"/>`node_modules\intl-tel-input\build\img` folder into our <VPIcon icon="fas fa-folder-open"/>`public/img` directory.

We create an app.css in our <VPIcon icon="fas fa-folder-open"/>`public/css` folder:

```sh
cd public
touch app.css
```

In `app.css`, add the styles below:

```css
.iti__flag {
  background-image: url("/static/img/flags.png");
}

@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .iti__flag {
    background-image: url("/static/img/flags@2x.png");
  }
}
.hide {
  display: none;
}
.error {
  color: red;
  outline: 1px solid red;
}
.success {
  color: green;
}
```

Finally, we create a <VPIcon icon="fa-brands fa-js"/>`signup.ejs` file in our views folder:

```html :collapsed-lines title="view/signup.ejs"
<div class="ui very padded text container segment">
  <%- include ('./partials/message') %>
  <h3>Signup Form</h3>

  <form class="ui form" action="/users/signup" method="POST">
    <div class="field">
      <label>Name</label>
      <input type="text" name="name" placeholder="name" />
    </div>
    <div class="field">
      <label>Username</label>
      <input type="text" name="username" placeholder="username" />
    </div>
    <div class="field">
      <label>Password</label>
      <input type="password" name="password" placeholder="Password" />
    </div>
    <div class="field">
      <label>Phone number</label>
      <input type="tel" id="phone" />
      <span id="valid-msg" class="hide success">✓ Valid</span>
      <span id="error-msg" class="hide error"></span>
    </div>
    <div class="field">
      <label>Email</label>
      <input type="email" name="email" placeholder="Email address" />
    </div>

    <button class="ui button" type="submit">Sign up</button>
  </form>
</div>
<script src="/static/js/intlTelInput.js"></script>
<script>
  const input = document.querySelector("#phone");
  const errorMsg = document.querySelector("#error-msg");
  const validMsg = document.querySelector("#valid-msg");

  const errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
  ];
  const iti = window.intlTelInput(input, {
    separateDialCode: true,
    autoPlaceholder: "aggressive",
    hiddenInput: "phonenumber",
    utilsScript: "/static/js/utils.js?1590403638580", // just for formatting/placeholders etc
  });
  var reset = function () {
    input.classList.remove("error");
    errorMsg.innerHTML = "";
    errorMsg.classList.add("hide");
    validMsg.classList.add("hide");
  };
  // on blur: validate
  input.addEventListener("blur", function () {
    reset();
    if (input.value.trim()) {
      if (iti.isValidNumber()) {
        validMsg.classList.remove("hide");
      } else {
        input.classList.add("error");

        var errorCode = iti.getValidationError();
        errorMsg.innerHTML = errorMap[errorCode];
        errorMsg.classList.remove("hide");
      }
    }
  });
  // on keyup / change flag: reset
  input.addEventListener("change", reset);
  input.addEventListener("keyup", reset);

  document.querySelector(".ui.form").addEventListener("submit", (e) => {
    if (!iti.isValidNumber()) {
      e.preventDefault();
    }
  });
</script>
```

![Sign up page.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a3bb8259-123b-4148-8963-efed0bfd2007/1-nodejs-authentication-twilio-verify.jpg))](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a3bb8259-123b-4148-8963-efed0bfd2007/1-nodejs-authentication-twilio-verify.jpg)

---

## Basic Authentication With Passport

Building authentication into an application can be really complex and time-draining, so we need a package to help us with that.

::: note

Remember: do not re-invent the wheel, except if your application has a specific need.

:::

`passport` is a package that helps out with authentication in our express application.

`passport` has many strategies we could use, but we’ll be using the `local-strategy` — which basically does `username and password authentication`.

::: note

One advantage of using passport is that, since it has many strategies, we can easily extend our application to use its other strategies.

:::

```sh
npm i passport passport-local
```

In <VPIcon icon="fa-brands fa-js"/>`index.js` we add the following code:

```js title="index.js"
//after requiring express
const passport = require('passport')

//after requiring mongoose
const { localAuth } = require('./config/passportLogic')

//after const app = express()
localAuth(passport)

//after app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());
```

We’re adding some `application level middleware` to our <VPIcon icon="fa-brands fa-js"/>`index.js` file — which tells the application to use the `passport.initialize()` and the `passport.session()` middleware.

`Passport.initialize()` initializes `passport`, while the `passport.session()` middleware let’s `passport` know that we’re using `session` for authentication.

Do not worry much about the `localAuth()` function. That takes the `passport` object as an argument, and we’ll create the function just below.

Next, we create a <VPIcon icon="fas fa-folder-open"/>`config` folder and create the needed files:

```sh
mkdir config
touch passportLogic.js middleware.js
```

In <VPIcon icon="fa-brands fa-js"/>`passportLogic.js`,

```js title="passportLogic.js"
//file contains passport logic for local login
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const User = require('../models/user')
const localAuth = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' }, async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email })

          if (!user) {
            return done(null, false, { message: 'Incorrect email' });
          }
          //validate password
          const valid = await user.validPassword(password)
          if (!valid) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        } catch (error) {
          return done(error)
        }
      }
    ));
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
module.exports = {
  localAuth
}
```

Let’s understand what is going on in the code above.

Apart from the require statements, we create the `localAuth()` function, which will be exported from the file. In the function, we call the `passport.use()` function that uses the `LocalStrategy()` for `username` and `password` based authentication.

We specify that our `usernameField` should be `email`. Then, we find a user that has that particular `email` — if none exists, then we return an error in the `done()` function. However, if a user exists, we check if the password is valid using the `validPassword` method on the `User` object. If it’s invalid, we return an error. Finally, if everything is successful, we return the `user` in `done(null, user)`.

`passport.serializeUser()` and `passport.deserializeUser()` helps in order to support login sessions. Passport will serialize and deserialize `user` instances *to* and *from* the session.

In <VPIcon icon="fa-brands fa-js"/>`middleware.js`,

```js title="middleware.js"
//check if a user is verified
const isLoggedIn = async (req, res, next) => {
  if (req.user) {
    return next()
  } else {
    req.flash(
      'error_msg',
      'You must be logged in to do that'
    )
    res.redirect('/users/login')
  }
}
const notLoggedIn = async (req, res, next) => {
  if (!req.user) {
    return next()
  } else {
    res.redirect('back')
  }
}


module.exports = {
  isLoggedIn,
  notLoggedIn
}
```

Our middleware file contains two(2) `route level middleware`, which will be used later in our routes.

::: note

Route-level middleware is used by our routes, mostly for route protection and validation, such as authorization, while application level middleware is used by the whole application.

:::

`isLoggedIn` and `notLoggedIn` are `route level middleware` that checks if a user is logged in. We use these middlewares to block access to routes that we want to make accessible to logged-in users.

---

## Building The Sign-Up Controllers

```sh
cd controllers
mkdir signUpController.js loginController.js
```

In <VPIcon icon="fa-brands fa-js"/>`signUpController.js`, we:

1. Check for users’ credentials;
2. Check if a user with that detail(email or phone-number) exists in our database;
3. Create an error if the user exists;
4. Finally, if such a user does not exist, we create a new user with the given details and redirect to the `login` page.

```js title="signUpController.js"
const mongoose = require('mongoose')
const User = require('../models/user')

//sign up Logic
const getSignup = async (req, res, next) => {
  res.render('signup')
}
const createUser = async (req, res, next) => {
  try {
    const { name, username, password, phonenumber, email } = await req.body
    const errors = []
    const reRenderSignup = (req, res, next) => {
      console.log(errors)
      res.render('signup', {
        errors,
        username,
        name,
        phonenumber,
        email
      })
    }
    if (!name || !username || !password || !phonenumber || !email) {
      errors.push({ msg: 'please fill out all fields appropriately' })
      reRenderSignup(req, res, next)
    } else {
      const existingUser = await User.findOne().or([{ email: email }, { phonenumber: phonenumber }])
      if (existingUser) {
        errors.push({ msg: 'User already exists, try changing your email or phone number' })
        reRenderSignup(req, res, next)
      } else {
        const user = await User.create(
          req.body
        )
        req.flash(
          'success_msg',
          'You are now registered and can log in'
        );
        res.redirect('/users/login')
      }

    }
  } catch (error) {
    next(error)
  }
}
module.exports = {
  createUser,
  getSignup
}
```

::: info In <VPIcon icon="fa-brands fa-js"/>`loginController.js`,

1. We use the `passport.authenticate()` method with the local scope (email and password) to check if the user exists;
2. If the user doesn’t exist, we give out an error message and redirect the user to the same route;
3. if the user exists, we log the user in using the `req.logIn` method, send them a verification using the `sendVerification()` function, then redirect them to the `verify` route.

:::

```js title="loginController.js"
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/user')
const { sendVerification } = require('../config/twilioLogic')
const getLogin = async (req, res) => {
  res.render('login')
}
const authUser = async (req, res, next) => {
  try {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err)
      }
      if (!user) {
        req.flash(
          'error_msg',
          info.message
        )
        return res.redirect('/users/login')
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err)
        }
        sendVerification(req, res, req.user.phonenumber)
        res.redirect('/users/verify');
      });
    })(req, res, next);
  } catch (error) {
    next(error)
  }

}
module.exports = {
  getLogin,
  authUser
}
```

Right now, `sendVerification()` doesn’t exactly work. That’s because we’ve not written the function, so we need `Twilio` for that. Let’s install Twilio and get started.

---

## Using Twilio Verify To Protect Routes

In order to use Twilio Verify, you:

1. Head over to `https://twilio.com/`;
2. Create an account with Twilio;
3. Login to your dashboard;
4. Select create a new project;
5. Follow the steps to create a new project.

To install the `Twilio SDK` for node.js:

```sh
npm i twilio
```

Next, we need to install `dotenv` to help us with `environment variables`.

```sh
npm i dotenv
```

We create a file in the root of our project and name it <VPIcon icon="fas fa-file-lines"/>`.env`. This file is where we keep our `credentials`, so we don’t push it to git. In order to do that, we create a <VPIcon icon="iconfont icon-git"/>`.gitignore` file in the root of our project, and add the following lines to the file:

```sh
node_modules
.env
```

This tells git to ignore both the <VPIcon icon="fas fa-folder-open"/>`node_modules` folder and the <VPIcon icon="fas fa-file-lines"/>`.env` file.

To get our Twilio account credentials, we login into our Twilio console, and copy our `ACCOUNT SID` and `AUTH TOKEN`. Then, we click on `get trial number` and Twilio generates a trial number for us, click `accept number`. Now from the console copy, we copy our trial number.

In <VPIcon icon="fas fa-file-lines"/>`.env`

```sh title=".env"
TWILIO_ACCOUNT_SID=<YOUR_ACCOUNT_SID>  
TWILIO_AUTH_TOKEN=<YOUR_AUTH_TOKEN>  
TWILIO_PHONE_NUMBER=<TOUR_TWILIO_NUMBER>  
```

Don’t forget to replace `<YOUR_ACCOUNT_SID>`, `<YOUR_AUTH_TOKEN>`, and `<TOUR_TWILIO_NUMBER>` with your actual credentials.

We create a file named <VPIcon icon="fa-brands fa-js"/>`twilioLogic.js` in the <VPIcon icon="fas fa-folder-open"/>`config` directory:

```sh
cd cofig
touch twilioLogic.js
```

In <VPIcon icon="fa-brands fa-js"/>`twilioLogic.js`,

```js title="config/twilioLogic.js"
require('dotenv').config()
const twilio = require('twilio')
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
//create verification service
const createService = async (req, res) => {
  client.verify.services.create({ friendlyName: 'phoneVerification' })
    .then(service => console.log(service.sid))
}

createService();
```

In the code snippet above, we create a new `verify` service.

Run:

```sh
node config/twilioLogic.js
```

The string that gets logged to our screen is our `TWILIO_VERIFICATION_SID` — we copy that string.

In <VPIcon icon="fas fa-file-lines"/>`.env`, add the line `TWILIO_VERIFICATION_SID=<YOUR_TWILIO_VERIFICATION_SID>`.

In <VPIcon icon="fas fa-folder-open"/>`config/`<VPIcon icon="fa-brands fa-js"/>`twilioLogic.js`, we remove the `createService()` line, since we need to create the `verify` service only once. Then, we add the following lines of code:

```js title="config/twilioLogic.js"
//after createService function creation

//send verification code token
const sendVerification = async (req, res, number) => {

  client.verify.services(process.env.TWILIO_VERIFICATION_SID)
    .verifications
    .create({ to: `${number}`, channel: 'sms' })
    .then(verification =>
      console.log(verification.status)
    );
}

//check verification token
const checkVerification = async (req, res, number, code) => {
  return new Promise((resolve, reject) => {
    client.verify.services(process.env.TWILIO_VERIFICATION_SID)
      .verificationChecks
      .create({ to: `${number}`, code: `${code}` })
      .then(verification_check => {
        resolve(verification_check.status)
      });
  })
}
module.exports = {
  sendVerification,
  checkVerification
}
```

`sendVerification` is an asynchronous function that returns a promise that sends a verification OTP to the number provided using the `sms` channel.

`checkVerification` is also an asynchronous function that returns a promise that checks the status of the verification. It checks if the `OTP` provided by the users is the same `OTP` that was sent to them.

In <VPIcon icon="fas fa-folder-open"/>`config/`<VPIcon icon="fa-brands fa-js"/>`middleware.js`, add the following:

```js title="config/middleware.js"
//after notLoggedIn function declaration

//prevents an unverified user from accessing '/dashboard'
const isVerified = async (req, res, next) => {
  if (req.session.verified) {
    return next()
  } else {
    req.flash(
      'error_msg',
      'You must be verified to do that'
    )
    res.redirect('/users/login')
  }
}

//prevent verified User from accessing '/verify'
const notVerified = async (req, res, next) => {
  if (!req.session.verified) {
    return next()
  } else {
    res.redirect('back')
  }
}


module.exports = {
  //after notLoggedIn
  isVerified,
  notVerified
}
```

We’ve created two more `route level middleware`, which will be used later in our routes.

`isVerified` and `notVerified` check if a user is verified. We use these middlewares to block access to routes that we want to make accessible to only verified users.

```sh
cd controllers
touch verifyController.js
```

In <VPIcon icon="fa-brands fa-js"/>`verifyController.js`,

```js title="controllers/verifyController.js"
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/user')
const { sendVerification, checkVerification } = require('../config/twilioLogic')
const loadVerify = async (req, res) => {
  res.render('verify')
}
const resendCode = async (req, res) => {
  sendVerification(req, res, req.user.phonenumber)
  res.redirect('/users/verify')
}
const verifyUser = async (req, res) => {
  //check verification code from user input
  const verifyStatus = await checkVerification(req, res, req.user.phonenumber, req.body.verifyCode)

  if (verifyStatus === 'approved') {
    req.session.verified = true
    res.redirect('/users/dashboard')
  } else {
    req.session.verified = false
    req.flash(
      'error_msg',
      'wrong verification code'
    )
    res.redirect('/users/verify')
  }

}
module.exports = {
  loadVerify,
  verifyUser,
  resendCode
}
```

`resendCode()` re-sends the verification code to the user.

`verifyUser` uses the `checkVerification` function created in the previous section. If the status is `approved`, we set the `verified` value on `req.session` to true.

`req.session` just provides a nice way to access the current session. This is done by express-session, which adds the session object to our request object.

> Hence the reason I said that most application level middleware **do** affect our applications state (request and response objects)

---

## Building The User Routes

Basically, our application is going to have the following routes:

1. `/user/login`: for user login;
2. `/user/signup`: for user registration;
3. `/user/logout`: for log out;
4. `/user/resend`: to resend a verification code;
5. `/user/verify`: for input of verification code;
6. `/user/dashboard`: the route that is protected using `Twilio Verify`.

```sh
cd routes
touch user.js
```

In `routes/`<VPIcon icon="fa-brands fa-js"/>`user.js`, it requires the needed packages:

```js :collapsed-lines title="routes/user.js"
const express = require('express')
const router = express.Router()
const { createUser, getSignup } = require('../controllers/signUpController')
const { authUser, getLogin } = require('../controllers/loginController')
const { loadVerify, verifyUser, resendCode } = require('../controllers/verifyController')
const { isLoggedIn, isVerified, notVerified, notLoggedIn } = require('../config/middleware')

//login route
router.route('/login')
  .all(notLoggedIn)
  .get(getLogin)
  .post(authUser)

//signup route
router.route('/signup')
  .all(notLoggedIn)
  .get(getSignup)
  .post(createUser)
//logout
router.route('/logout')
  .get(async (req, res) => {
    req.logout();
    res.redirect('/');
  })
router.route('/resend')
  .all(isLoggedIn, notVerified)
  .get(resendCode)
//verify route
router.route('/verify')
  .all(isLoggedIn, notVerified)
  .get(loadVerify)
  .post(verifyUser)
//dashboard
router.route('/dashboard')
  .all(isLoggedIn, isVerified)
  .get(async (req, res) => {
    res.render('dashboard')
  })

//export router
module.exports = router
```

We’re creating our routes in the piece of code above, let’s see what’s going on here:

`router.route()` specifies the route. If we specify `router.route('/login')`, we target the `login` route. `.all([middleware])` allows us specify that all request to that route should use those `middleware`.

The `router.route('/login').all([middleware]).get(getController).post(postController)` syntax is an alternative to the one most developers are used to.

It does the same thing as `router.get('/login', [middleware], getController)` and `router.post('/login, [middleware], postController)`.

::: note

The syntax used in our code is nice because it makes our code very DRY — and it’s easier to keep up with what’s going on in our file.

:::

Now, if we run our application by typing the command below in our terminal:

```sh
npm run dev 
```

Our full-stack express application should be up and running.

---

## Conclusion

What we have done in this tutorial was to:

1. Build out an express application;
2. Add passport for authentication with sessions;
3. Use Twilio Verify for route protection.

I surely hope that after this tutorial, you are ready to rethink your password-based authentication and add that extra layer of security to your application.

What you could do next:

1. Try to explore passport, using JWT for authentication;
2. Integrate what you’ve learned here into another application;
3. Explore more Twilio products. They provide services that make development easier(Verify is just one of the many services).

::: info Further Reading On Smashing Magazine

- “[**How To Build A Group Chat App With Vanilla JS, Twilio And Node.js**](/smashingmagazine.com/build-group-chat-app-vanillajs-twilio-nodejs.md),” Zara Cooper
- “[**Keeping Node.js Fast: Tools, Techniques, And Tips For Making High-Performance Node.js Servers**](/smashingmagazine.com/nodejs-tools-techniques-performance-servers.md),” David Mark Clements
- “[**How To Protect Your API Key In Production With Next.js API Route**](/smashingmagazine.com/protect-api-key-production-nextjs-api-route.md),” Caleb Olojo
- “[**How To Build A Node.js API For Ethereum Blockchain**](/smashingmagazine.com/nodejs-api-ethereum-blockchain.md),” John Agbanusi

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Node.js Authentication With Twilio Verify",
  "desc": "Integrate two-factor authentication into your Express.js app by building an application that authenticates users using password-based authentication and OTPs powered by the Twilio Verify service.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/nodejs-authentication-twilio-verify.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
