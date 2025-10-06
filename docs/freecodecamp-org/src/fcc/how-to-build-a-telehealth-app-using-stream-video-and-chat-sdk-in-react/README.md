---
lang: en-US
title: "How to Build a Telehealth App Using Stream Video and Chat SDK in React"
description: "Article(s) > How to Build a Telehealth App Using Stream Video and Chat SDK in React"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
  - Express.js
  - Data Science
  - MongoDB
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
      content: "Article(s) > How to Build a Telehealth App Using Stream Video and Chat SDK in React"
    - property: og:description
      content: "How to Build a Telehealth App Using Stream Video and Chat SDK in React"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-telehealth-app-using-stream-video-and-chat-sdk-in-react.html
prev: /programming/js-react/articles/README.md
date: 2025-07-19
isOriginal: false
author:
  - name: Okoro Emmanuel Nzube
    url : https://freecodecamp.org/news/author/Derekvibe/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1752879185676/ab0574c8-d16b-41d0-8883-7df0f4bd0eb5.png
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
  name="How to Build a Telehealth App Using Stream Video and Chat SDK in React"
  desc="Remember when the COVID-19 pandemic moved everything online - doctor’s visits included - and staying home became the safest option?  That moment kicked off a massive shift in how healthcare gets delivered.  Telehealth became more than a workaround. I..."
  url="https://freecodecamp.org/news/how-to-build-a-telehealth-app-using-stream-video-and-chat-sdk-in-react"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1752879185676/ab0574c8-d16b-41d0-8883-7df0f4bd0eb5.png"/>

Remember when the COVID-19 pandemic moved everything online - doctor’s visits included - and staying home became the safest option?

That moment kicked off a massive shift in how healthcare gets delivered.

[<FontIcon icon="fas fa-globe"/>Telehealth](https://getstream.io/chat/solutions/healthcare/) became more than a workaround. It’s now a core part of modern care. As demand grows, developers are stepping up to build secure, real-time platforms that connect patients and providers from anywhere.

In this article, you’ll learn how to build a telehealth application with Stream’s [<FontIcon icon="fas fa-globe"/>React Video](https://getstream.io/video/sdk/react/) and [<FontIcon icon="fas fa-globe"/>Chat](https://getstream.io/chat/sdk/react/) SDKs. You’ll set up authentication, create video calls, enable messaging, and design a functional user interface that mimics real-world telehealth workflows.

Let’s dive in.

---

## Outline

(1/8). [Introduction](#heading-introduction)
(2/8). [Prerequisites](#heading-prerequisites)
(3/8). [App Structure](#heading-app-structure)
(4/8). [Project Setup](#heading-project-setup)
(5/8). [Backend Setup](#heading-backend-setup)
(6/8). [Frontend Setup](#heading-frontend-setup)
(7/8). [Stream Chat and Video Integration](#heading-stream-chat-and-video-integration)
(8/8). [Chat and Video Function (Frontend)](#heading-chat-and-video-function-\(frontend\))

::: note Prerequisites

Before you start this tutorial, make sure you have:

- A basic understanding of React.
- Node.js and npm/yarn installed on your computer
- A [<FontIcon icon="fas fa-globe"/>free account with Stream](https://getstream.io/try-for-free/)
- Familiarity with Stream SDKs
- A basic understanding of Tailwind CSS for styling
- Experience with VS Code and Postman (for testing APIs)

:::

---

## App Structure

Before diving into the code, it’s helpful to understand how the app is structured.

```md
# App Flow Structure

- Landing Page  
  - Navigation  
    - Home  
    - About  
    - Sign Up  
      - Verify Account  
        - Log In  
          - Dashboard  
            - Stream Chat  
            - Stream Video  
            - Log Out
```

---

## Project Setup

Before getting started, create two folders: “Frontend” to handle the client-side code and “Backend” for the server-side logic. This separation allows you to manage both parts of your application efficiently.

### Set Up React for the Frontend

Once the folders are created, you can set up the React application in the Frontend folder.

First, navigate to the Frontend directory using the command `cd Frontend`.

Now you can initialize your React project. You’ll use Vite, a fast build tool for React applications.

To create your React project, run the following command:

```sh
npm create vite@latest [project name] -- --template react
```

Next, navigate to your new project folder, using the command:

```sh
cd [project name]
```

Once there, install the required dependencies by running:

```sh
npm install
```

This command installs both the <FontIcon icon="fas fa-folder-open"/>`node_modules` folder (which contains all your project's packages) and the <FontIcon icon="iconfont icon-json"/>`package-lock.json` file (which records exact versions of installed packages).

Next, you’ll need to install Tailwind CSS for styling. Follow the [<FontIcon icon="iconfont icon-tailwindcss"/>Tailwind Docs](https://v3.tailwindcss.com/docs/guides/vite) for step-by-step instructions.

Then, it’s time to set up the website. Using React, you’ll create the home sign-in/log-in pages. Both will be nested together using `React-router-dom`.

Here’s what the [home page (<FontIcon icon="iconfont icon-github"/>`Derekvibe/Telehealth_Frontend`)](https://github.com/Derekvibe/Telehealth_Frontend/tree/main/src/pages/Home) looks like:

![Telehealth Home Page](https://cdn.hashnode.com/res/hashnode/image/upload/v1752705718347/ed5dd289-2998-41f7-8d10-352aa35fe614.gif)

Now, the user has a place to land whenever they visit the website.

Let’s set up the backend.

---

## Backend Setup

### Installing Required Packages

Before setting up your project's backend, it's important to define what your project needs to offer. This will help you install all the necessary packages in one go.

Start by moving into the backend folder using the command: `cd Backend`

Inside the Backend directory, initialize your Node.js project using `npm install`

This will create a <FontIcon icon="iconfont icon-json"/>`package.json` file, which stores metadata and dependencies for your project.

Next, install all the dependencies needed to build your backend. Run the following command:

```sh
npm i bcryptjs cookie-parser cors \
dotenv express jsonwebtoken \
mongoose nodemailer validator \
nodemon
```

Here’s a brief overview of what each package does:

- bcryptjs: Encrypts user passwords for secure storage.
- Cookie-parser: Handles cookies in your application.
- CORS: Middleware that enables cross-origin requests - essential for frontend-backend communication.
- dotenv: Loads environment variables from a <FontIcon icon="fas fa-file-lines"/>`.env` file into process.env.
- Express: The core framework for building your server and API routes.
- jsonwebtoken: Generates and verifies JWT tokens for authentication.
- Mongoose: Connects your app to a MongoDB database.
- nodemailer: Handles sending emails from your application.
- Validator: Validates user inputs like email, strings, and so on.
- nodemon: Automatically restarts your server when changes are made to files.

Once your packages are installed, create two key files in the backend directory: <FontIcon icon="fa-brands fa-js"/>`App.js`, which contains your app logic, middleware, and route handlers, and <FontIcon icon="fa-brands fa-js"/>`server.js`, responsible for initializing and configuring your server.

Next, you have to update your <FontIcon icon="iconfont icon-json"/>`package.json` start script. Head to the <FontIcon icon="iconfont icon-json"/>`package.json` file in your backend directory and replace the default script:

```json title="package.json"
"scripts": {
  "test": "echo\"Error: no test specified\" && exit 1”
}
```

with this:

```json
"scripts": {
  "start": "nodemon server.js"
}
```

This setup allows you to run your server using `nodemon`, automatically reloading it when changes are made. This helps boost productivity during development.

To check if your backend setup is correct, open the <FontIcon icon="fa-brands fa-js"/>`server.js` file and add a test log: `console.log (“Any of your Log Message”)`. Then, head to your terminal in the backend directory, and run npm start. You should see the log message in the terminal, confirming that your backend is running.

![Backend Server Testing](https://cdn.hashnode.com/res/hashnode/image/upload/v1752703046663/dc06ce5a-3b6c-4846-bd33-53c423a57235.png)

### <FontIcon icon="fa-brands fa-js"/>`App.js` Setup

In the <FontIcon icon="fa-brands fa-js"/>`App.js` file, start by importing the packages you initially installed.

```js title="App.js"
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(
  cors({
origin: [
   "http://localhost:5173",
],

credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

module.exports = app;
```

Here’s what the code above does:

The require statements import `express`, `cors`, and `cookie-parser`, which are essential for creating your backend server, handling cross-origin requests, and parsing cookies.

The `const app = express();` command sets up a new instance of an Express application.

`app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));` grants permission or allows requests from your frontend and enables cookie sharing between the frontend and backend of your application. This is important for authentication.

The `app.use(express.json({ limit: "10kb" }));` command is a middleware function that ensures the server can process incoming JSON payloads and protects against overly large requests, which could be used in DoS attacks.

The `app.use(cookieParser());` command makes cookies available via `req.cookies`.

Last, the `module.exports = app;` command allows the app to be imported in other files, especially in <FontIcon icon="fa-brands fa-js"/>`server.js`, which is where the app will be started.

### <FontIcon icon="fa-brands fa-js"/>`server.js` Setup

Once <FontIcon icon="fa-brands fa-js"/>`App.js` is set up, the next step is to create and configure your server in a new file called <FontIcon icon="fa-brands fa-js"/>`server.js`.

Before doing that, ensure you have a **MongoDB database** set up. If you don’t have one yet, you can [<FontIcon icon="fa-brands fa-youtube"/>follow this video tutorial](https://youtu.be/pO6m0nmo1k0?si=Rqi_50fnsfQrM-ww) to set up a MongoDB database.

After setting up MongoDB, you will receive a `username` and `password`. Copy the password, head to your backend directory, and create a <FontIcon icon="fas fa-file-lines"/>`.env` file to store it.

After you have stored the password, head back to complete your database setup.

Next, click on the “Create Database User” button, then click on the `choose connection method` option. Since we are using Node.js for this project, choose the “Drivers” option. This gives you the database connection string (you should see it at No. 3).

![Database-String-Auth](https://cdn.hashnode.com/res/hashnode/image/upload/v1752706253668/ad0cdbb4-453c-4291-ab4c-395d14ce297c.gif)

Then head to your <FontIcon icon="fas fa-file-lines"/>`.env` and paste it there, and add `auth` immediately after you have “.net/”.

Here’s what it looks like:

```plaintext
mongodb+srv://<username>:<password>@cluster0.qrrtmhs.mongodb.net/auth?retryWrites=true&w=majority&appName=Cluster0
```

![Backend config.env file](https://cdn.hashnode.com/res/hashnode/image/upload/v1752767020758/aee4f54c-e562-4916-a8f5-b97590a671d1.png)

Lastly, whitelist your IP address. This ensures your backend can connect to MongoDB from your local machine or any environment during development.

To allow your application to connect to the database:

- Go to the "Network Access" section in the Security sidebar of your MongoDB dashboard.
- Click on “ADD IP ADDRESS.”
- Choose “Allow Access from Anywhere”, then click on Confirm.

At this point, you can set up your <FontIcon icon="fa-brands fa-js"/>`server.js`

```js :collapsed-lines title="server.js"
require("dotenv").config();
const mongoose = require("mongoose");
const dotenv = require("dotenv"); //to Manage our environment variable

dotenv.config({ path: "./config.env" });
// console.log(process.env.NODE_ENV);

const app = require("./app");

const db = process.env.DB;
//connect the application to database using MongoDB

mongoose
  .connect(db)
  .then(() => {
    console.log("DB connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;
// console.log(process.env.PORT)

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
```

The <FontIcon icon="fa-brands fa-js"/>`server.js` file is responsible for handling all server-related functions and logic. From the code above, the <FontIcon icon="fa-brands fa-js"/>`server.js` file loads the environment variables using `dotenv`, connects your backend to MongoDB using `mongoose`, and starts the Express server. It gets the database URL and port from the <FontIcon icon="fas fa-file-lines"/>`config.env` file, connects to the database, then runs your application on the specified port (`8000`).

If the specified port is not found, it falls back to port `3000` and a confirmation message is printed to the console indicating that the server is up and running on the specified port.

![<FontIcon icon="fa-brands fa-js"/>`server.js` Telehealth App](https://cdn.hashnode.com/res/hashnode/image/upload/v1752703203108/a94c724c-ad9c-4653-9081-894ac6e44dd6.png)

### Connect the Database to MongoDB Compass

First, download the MongoDB Compass app. ([<FontIcon icon="iconfont icon-mongodb"/>Go here to download and install](https://mongodb.com/try/download/compass)). The MongoDB Compass app makes it easy for us to manage our data.

Once the installation is complete, open the app and click on `Click to add new connection`. Go to your <FontIcon icon="fas fa-file-lines"/>`.env` file, copy the connection string you initially got when setting up MongoDB, paste it in the URL section, and then click on “connect.” This setup helps you manage your data when you create and delete users.

![Mongo-DB-Compass](https://cdn.hashnode.com/res/hashnode/image/upload/v1752703344533/8dff0ff6-66e9-4359-a2c0-fe7a4bd5e4ba.png)

### Set up an Advanced Error Handling Method

You’ll now create an advanced error-handling mechanism. To do so, create a utils folder in your backend, a <FontIcon icon="fa-brands fa-js"/>`catchAsync.js` file in the utils folder, and add this code:

```js title="catchAsync.js"
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
```

Next, create an <FontIcon icon="fa-brands fa-js"/>`appError.js` file still in your utils folder. In the <FontIcon icon="fa-brands fa-js"/>`appError.js` file, add the following command:

```js title="appError.js"
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
```

The code above is helpful in tracking and tracing errors. It also provides you with the URL and file location where your error might be occurring, which helps with cleaner error handling and debugging.

Next, let’s create a global error handler. Start by creating a new folder in the backend directory, and name it “controller”. In the controller folder, create your global error handling file. You can name it anything you like. In this example, it’s called <FontIcon icon="fa-brands fa-js"/>`globalErrorHandler.js`.

Your `globalErrorHandler` file will define several functions that handle specific error types, such as database issues, validation failures, or even JWT problems and return a nicely formatted error response for users. For the `globalErrorHandler` to work properly, you have to create a controller function.

So, next, create an <FontIcon icon="fa-brands fa-js"/>`errorController.js` file (still inside the controller folder). The <FontIcon icon="fa-brands fa-js"/>`errorController.js` file responds to the user whenever an error is caught, sending the error in JSON format.

```js :collapsed-lines title="globalErrorHandler.js"
const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue ? JSON.stringify(err.keyValue) : "duplicate field";
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);
const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

module.exports = {
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB,
  handleJWTError,
  handleJWTExpiredError,
};
```

Here’s what the code above does:

The `const handleCastErrorDB = (err) =>..` section handles MongoDB CastError which usually happens when an invalid ID is passed, and returns a `400 Bad Request` error response using your `AppError` class.

The `const handleDuplicateFieldsDB = (err) =>...` checks and handles MongoDB duplicate key errors, such as trying to register an email or username that’s already taken and returns a `400 Bad Request` error.

The `const handleValidationErrorDB = (err) =>...` handles Mongoose validation errors (like required fields missing or wrong data types). It gathers all the individual validation error messages and combines them into one.

The `const handleJWTError = () =>` and `const handleJWTExpiredError = () =>` handle errors which might occur as a result of invalid, tampered, or expired JWT tokens and return a `401 Unauthorized` error response.

The `module.exports = {……};` section exports all the individual error handlers so they can be used in the <FontIcon icon="fa-brands fa-js"/>`errorController.js` file.

```js title="errorController.js"
const errorHandlers = require("./globalErrorHandler");

const {
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB,
  handleJWTError,
  handleJWTExpiredError,
} = errorHandlers;

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err, message: err.message };

  if (err.name === "CastError") error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  if (err.name === "ValidationError") error = handleValidationErrorDB(err);
  if (err.name === "JsonWebTokenError") error = handleJWTError();
  if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    ...(process.env.NODE_ENV === "production" && { error, stack: err.stack }),
  });
};
```

To ensure your error-handling function works properly, head to your <FontIcon icon="fa-brands fa-js"/>`App.js` and add the command:

```js title="App.js"
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/appError");

//Catch unknown routes
app.all("/{*any}", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)); });

app.use(globalErrorHandler);
```

This ensures that all errors are properly handled and sends the error response to the user.

### Create User Model

To build a user model, create a new folder in the backend directory and name it “model.” Inside the model folder, create a new file named <FontIcon icon="fa-brands fa-js"/>`userModel.js`.

The <FontIcon icon="fa-brands fa-js"/>`userModel.js` file is built essentially for user authentication and security. It provides a validation-rich schema for managing users using Mongoose, which maps how user data is structured in the MongoDB database. It includes validations, password hashing, and methods to compare user passwords securely.

```js :collapsed-lines title="userModel.js"
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {type: String, required: [true, "Please provide username"], trim: true, minlength: 3, maxlength: 30, index: true,},
    email: {type: String, required: [true, "Please Provide an email"], unique: true, lowercase: true, validate: [validator.isEmail, "Please provide a valid email"],},
    password: {type: String, required: [true, "Please provide a Password"], minlength: 8, select: false,},
    passwordConfirm: {type: String, required: [true, "Please confirm your Password"],
     validate: {validator: function (el) {return el === this.password;},
        message: "Passwords do not match",
      },
    },
    isVerified: {type: Boolean, default: false,}, otp: String,
    otpExpires: Date,
     resetPasswordOTP: String,
      resetPasswordOTPExpires: Date,
    createdAt: {type: Date, default: Date.now,},}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // Remove passwordConfirm before saving
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
```

### Auth Controller

Now, you can create logic that regulates your user's authentication process. This authentication logic consists of the sign-up, sign-in (log-in), OTP, and so on.

To do so, first head to your controller folder and create a new file. Call it <FontIcon icon="fa-brands fa-js"/>`authController.js` because it handles the authentication flow of your project.

After you’ve created the file, you’ll create your sign-up function.

```js :collapsed-lines title="authController.js"
const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const generateOtp = require("../utils/generateOtp");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email")

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password, passwordConfirm, username } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) return next(new AppError("Email already registered", 400));

  const otp = generateOtp();

  const otpExpires = Date.now() + 24 60 60 * 1000; //when thhe otp will expire (1 day)

  const newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
    otp,
    otpExpires,
  });

  //configure email sending functionality
  try {
    await sendEmail({
      email: newUser.email,
      subject: "OTP for email Verification",
      html: `<h1>Your OTP is : ${otp}</h1>`,
    });

    createSendToken(newUser, 200, res, "Registration successful");
  } catch (error) {
    console.error("Email send error:", error);
    await User.findByIdAndDelete(newUser.id);
    return next(
      new AppError("There is an error sending the email. Try again", 500)
    );
  }
});
```

`const { email, password, passwordConfirm, username } = req.body;` extracts the necessary registration details from the incoming request: email, password, password confirmation, and username during user sign-up.

`const existingUser = await User.findOne({ email });` checks the database to see if a user already exists with the given email. If yes, it sends an error response using your `AppError` utility.

`const otp = generateOtp();` generates the OTP, and `const otpExpires = Date.now()…..` is used to set the OTP to expire at a specified time or day.

With `const newUser = await User.create({…});`, the new user is saved in MongoDB with their credentials and the OTP info, with the password automatically hashed.

`await sendEmail({…});` sends an email to the user. This email contains their sign-in OTP. If the email is sent successfully, `createSendToken(newUser, 200, res, "Registration successful");` (which is a utility function) generates a JWT token and sends it in the response with a success message.

If the email fails to send or something goes wrong, `await User.findByIdAndDelete(newUser.id);` deletes the user from the database to keep things clean, and an error message of `There is an error sending the email. Try again", 500` is returned.

### Generate OTP

To ensure that your users' OTP is successfully sent to them, in the utils folder, create a new file and name it <FontIcon icon="fa-brands fa-js"/>`generateOtp.js`. Then add the code:

```js
module.exports = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};
```

The code above is a function that generates a user's random 4-digit OTP and returns it as a string.

After completing the code above, go to your authController.js and ensure you import the <FontIcon icon="fa-brands fa-js"/>`generateOtp.js` in the import section.

### Create User Token

Next, the user sign-in token will be created, and it will be assigned to the user upon sign-in.

```js :collapsed-lines title="generateOtp.js"
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
};

//function to create the token
const createSendToken = (user, statusCode, res, message) => {
  const token = signToken(user._id);

  //function to generate the cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN 24 60 60 1000
    ),

    httponly: true,
    secure: process.env.NODE_ENV === "production", //only secure in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "Lax",
  };

  res.cookie("token", token, cookieOptions);

  user.password = undefined;
  user.passwordConfirm = undefined;
  user.otp = undefined;
```

Before the code above can work perfectly, create a JWT in your <FontIcon icon="fas fa-file-lines"/>`.env` file.

```sh title=".env"
JWT_SECRET = kaklsdolrnnhjfsnlsoijfbwhjsioennbandksd;
JWT_EXPIRES_IN = 90d
JWT_COOKIE_EXPIRES_IN = 90
```

The code above is how the <FontIcon icon="fas fa-file-lines"/>`.env` file should look. Your `JWT_SECRET` can be anything, just as you can see in the code.

Note: The user token creation logic should run before the sign-in logic. So in that case, the `signToken` and `createSendToken` logic should be placed at the top before the `signup` logic.

### Send Email

Next, you need to configure your email sending functionality so you can automatically send the user's OTP to their email whenever they sign in. To configure the email, head to the utils folder, create a new file, and give it a name. In this example, the name is <FontIcon icon="fa-brands fa-js"/>`email.js`.

In <FontIcon icon="fa-brands fa-js"/>`email.js`, we will send emails using the `nodemailer` package and Gmail as a provider.

```js title="email.js"
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.HOST_EMAIL,
      pass: process.env.EMAIL_PASS
    }
  })

  //defining email option and structure

  const mailOptions = {
    from: `"{HOST Name}" <{HOST Email} >`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
```

From the code above, the `const nodemailer = require('nodemailer');` command imports the `nodemailer` package. This is a popular Node.js library for sending emails.

The `const transporter = nodemailer.createTransport({…..})` is an email transporter. Since we will be using the Gmail service provider, `service` will be assigned to `Gmail` and `auth` pulls your Gmail address and password from the <FontIcon icon="fas fa-file-lines"/>`.env` file where it’s stored.

Note: The password is not your actual Gmail password but rather your Gmail app password. You can see how you can get your [<FontIcon icon="fa-brands fa-youtube"/>Gmail password here](https://youtu.be/MkLX85XU5rU?si=yBIj4MJDLY7-k-c4).

Once you’ve successfully gotten your Gmail app password, store it in your <FontIcon icon="fas fa-file-lines"/>`.env` file.

### Route Creation

At this point, you have finished setting up your project's signup function. Next, you need to test whether your signup works properly using Postman. But before that, let’s set up and define a route where the signup function will be executed.

To set up your route, create a new folder in your backend directory named "routes" and a file named <FontIcon icon="fa-brands fa-js"/>`userRouter.js`.

```js title="userRouter.js"
const express = require("express");
const {signup} = require(“../controller/authController”);

const router = express.Router();
router.post("/signup", signup);

module.exports = router;
```

Next, go to your <FontIcon icon="fa-brands fa-js"/>`App.js` file and add the router to it.

```js title="App.js"
const userRouter = require("./routes/userRouters"); // Route import statement
app.use("/api/v1/users", userRouter) // common route for all auth, i.e sign up, log in, forget password, etc.
```

After setting up your routes, you can test your signup to see if it works. This is a post request, and the route URL will be `http://localhost:8000/api/v1/users/signup`.

![New user Sign up Testing](https://cdn.hashnode.com/res/hashnode/image/upload/v1752704061383/380d8480-9997-4678-8ca7-0ed86ea24481.png)

The image above shows that the signup function works perfectly with a `statusCode` of `200` and an OTP code being sent to the user’s email.

Congratulations on reaching this point! You can check your MongoDB database to see if the user is displayed there.

![Mongo-DB-Compass-User-Display](https://cdn.hashnode.com/res/hashnode/image/upload/v1752703565468/0f23f8ab-d17e-4555-8347-475bb6483b8a.png)

From the image above, you can see that the user details are obtained and the password is in an encrypted form, which ensures the user credentials are safe.

### Create a Verify Account Controller Function

In this section, you’ll create a Verify Account controller function. This function verifies a user’s account using the OTP code sent to their email address.

First, go to your <FontIcon icon="fa-brands fa-js"/>`authController.js` file and add:

```js :collapsed-lines title="authController.js"
exports.verifyAccount = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new AppError("Email and OTP are required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("No user found with this email", 404));
  }

  if (user.otp !== otp) {
    return next(new AppError("Invalid OTP", 400));
  }

  if (Date.now() > user.otpExpires) {
    return next(
      new AppError("OTP has expired. Please request a new OTP.", 400)
    );
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  await user.save({ validateBeforeSave: false });

  // ✅ Optionally return a response without logging in
  res.status(200).json({
    status: "success",
    message: "Email has been verified",
  });
});
```

Next, create a middleware function to authenticate the currently logged-in user.

In your backend directory, create a new folder called `middlewares`. Inside the `middlewares` folder, create a file named <FontIcon icon="fa-brands fa-js"/>`isAuthenticated.js`.

Add the following code:

```js :collapsed-lines title="isAuthenticated.js"
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../model/userModel");

const isAuthenticated = catchAsync(async (req, res, next) => {
  let token;

  // 1. Retrieve token from cookies or Authorization header
  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(
        "You are not logged in. Please log in to access this resource.",
        401
      )
    );
  }

  // 2. Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(
      new AppError("Invalid or expired token. Please log in again.", 401)
    );
  }

// 3. Confirm user still exists in database
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return next(
      new AppError("User linked to this token no longer exists.", 401)
    );
  }

  // 4. Attach user info to request
  req.user = currentUser;
  req.user = {
    id: currentUser.id,
    name: currentUser.name,
  };

  next();
});

module.exports = isAuthenticated;
```

Now, go to your <FontIcon icon="fa-brands fa-js"/>`userRouter.js` file and add the route for the verify account function:

```js title="userRouter.js"
const { verifyAccount} = require("../controller/authController");
const isAuthenticated = require("../middlewares/isAuthenticated");
router.post("/verify", isAuthenticated, verifyAccount);
```

Here is what these two sets of code are doing:

When a user sends a request to the `/verify` route, the `isAuthenticated` middleware runs first. It checks whether a valid token exists in the cookie or authorization header. If no token is found, it throws an error: `You are not logged in. Please log in to access this resource.`

If a token is found, it verifies the token and checks if the associated user still exists. If not, another error is thrown: `"User linked to this token no longer exists."`

If the user exists and the token is valid, their details are attached to the request (`req.user`). The request then proceeds to the `verifyAccount` controller, which handles OTP verification.

You can test this endpoint using Postman with a POST request to: `http://localhost:8000/api/v1/users/verify`

![Verify-Account](https://cdn.hashnode.com/res/hashnode/image/upload/v1752703870392/a534d04f-7cb9-4f84-92e1-e9844cfa6921.png)

The image above shows that the verify token function is working well, and a status code of `200` is displayed.

### Login Function

If you’ve reached this point, you’ve successfully signed up and verified a user’s account.

Now it’s time to create the login function, which allows a verified user to access their account. Here’s how you can do that:

Go to your <FontIcon icon="fa-brands fa-js"/>`authController.js` file and create your login function by adding the following:

```js :collapsed-lines title="authController.js"
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Validate email & password presence
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // 2. Check if user exists and include password
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3. Create JWT token
  const token = signToken(user._id);

  // 4. Configure cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        (parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) || 90) 24 60 60 1000
    ),
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    // sameSite: process.env.NODE_ENV === "production" ?
    //  "None" : "Lax",

    //set to false during or for local HTTP and cross-origin
    secure: false,
    sameSite: "Lax",
  };

  // 5. Send cookie
  res.cookie("token", token, cookieOptions);

});
```

`if (!email || !password) {…}` checks if the user actually provided both an email and a password. If not, it returns the error: `Please provide email and password", 400`.

`const user = await User.findOne({ email }).select("+password");` searches the database for a user with the provided email and explicitly includes the password field, since it’s normally hidden by default in the schema.

`if (!user || !(await user.correctPassword(…))) {…}` checks if the user exists and if the password entered matches the one stored in the database (after hashing comparison). If either is wrong, it throws: `Incorrect email or password`.

The line `signToken(user._id)` generates a JWT using the user's unique ID. The `cookieOptions` object configures how the cookie behaves - it sets the cookie to expire after a specific number of days defined in the <FontIcon icon="fas fa-file-lines"/>`.env` file, marks it as `httpOnly` to prevent JavaScript access for security, sets `secure` to `false` since the app is currently in development, and uses `sameSite: "Lax"` to allow cross-origin requests during local testing.

Finally, `res.cookie(...)` sends the token as a cookie attached to the HTTP response, enabling the client to store the token for authentication purposes.

From the code above, you may have noticed that the password stored in the database is hashed for security reasons. This means it looks completely different from the user's password when logging in. So, even if a user types in the correct password, it won't match the stored hash directly through a simple comparison.

To fix this, you need to compare the entered password with the hashed one using the `bcryptjs` package.

Head over to your <FontIcon icon="fa-brands fa-js"/>`userModel.js` file and create a method that handles password comparison. This method will take the plain text password provided by the user and compare it to the hashed password stored in the database.

```js title="userModel.js"
// create a method responsible for comparing the password stored in the database

userSchema.methods.correctPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};
```

This `correctPassword` method uses `bcrypt.compare()`, which internally hashes the plain password and checks if it matches the stored hashed version. This ensures that login validation works correctly and securely, even though the actual password is not stored in plain text.

Next, add the Login functionality to the <FontIcon icon="fa-brands fa-js"/>`userRouter.js` file.

```js title="userRouter.js"
const {login} = require("../controller/authController");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/login", login);
```

You can test this endpoint using Postman with a `POST` request to: `http://localhost:8000/api/v1/users/login`

### Logout Function

At this point, you can implement the logout function to end a user's session securely. To do this, navigate to your <FontIcon icon="fa-brands fa-js"/>`authController.js` file and add the following function:

```js title="authController.js"
// creating a log out function
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("token", "loggedout", {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});
```

This function works by overwriting the authentication cookie named `token` with the value `"loggedout"` and setting its expiration time to the past using `new Date(0)`. This effectively invalidates the cookie and removes it from the browser.

The `httpOnly: true` flag ensures that the cookie cannot be accessed via JavaScript, which protects it from XSS attacks, while the `secure` flag ensures that the cookie is only sent over HTTPS in a production environment. Once the cookie is cleared, a success response is returned with the message "Logged out successfully" to confirm the action.

Next, add the `logout` functionality to your route:

```js
const {logout} = require("../controller/authController");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/logout", logout);
```

Then, head to Postman to test your logout function and see if it works.

---

## Frontend Setup

Now that your backend is up and running, you can integrate it into your frontend application.

First, navigate to the frontend directory using the command `cd Frontend`.

Create a new folder in the <FontIcon icon="fas fa-folder-open"/>`src` folder where your authentication-related files will live. Depending on your preference or app structure, you can name it something like <FontIcon icon="fas fa-folder-open"/>`auth` or <FontIcon icon="fas fa-folder-open"/>`pages`. Then, create a new file called <FontIcon icon="fa-brands fa-js"/>`NewUser.js`. This file will handle user signup functionality.

```jsx :collapsed-lines title="NewUser.js"
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setAuthUser, setPendingEmail } from '../../../../store/authSlice';

const API_URL = import.meta.env.VITE_API_URL;

function NewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/signup`, formData, {
        withCredentials: true,
      });
      const user = response.data.data.user;
      dispatch(setAuthUser(user));
      dispatch(setPendingEmail(formData.email)); // Save email for OTP
      navigate('/verifyAcct'); // Navigate to OTP verification page
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      // visit the frontend Github repository to see the remaining code for the OTP Verification
      https://github.com/Derekvibe/Telehealth_Frontend/blob/main/src/pages/Auth/Join/NewUser.jsx
    </div>
  );
}

export default NewUser;
```

The code above renders a signup form with fields for `username`, `email`, `password` and `passwordConfirm`. When the user submits the form, the frontend sends a `POST` request to the backend’s `/users/signup` endpoint using `Axios`. The `withCredentials: true` option ensures cookies like the `auth token` are properly set by the backend.

If the signup is successful, the user data is dispatched into Redux using `setAuthUser()`, and their email is saved with `setPendingEmail()` so it can be used during `OTP` verification. Then, the user is redirected to the `/verifyAcct` route, where they can enter their `OTP`.

![Frontend-Sign-Up](https://cdn.hashnode.com/res/hashnode/image/upload/v1752704266192/0d1d5891-000a-48dc-a1d8-306a0103824a.png)

### OTP Verification Page

The OTP verification page is the next step in the user authentication process. Once a user signs up, they are redirected to enter the 4-digit OTP sent to their email. This verifies their account before allowing login access.

```jsx
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { clearPendingEmail } from '../../../../store/authSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // adjust as needed

function VerifyAcct() {
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.pendingEmail);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    // visit the frontend Github repository to see the remaining code for the OTP Verification
    https://github.com/Derekvibe/Telehealth_Frontend/blob/main/src/pages/Auth/login/VerifyAcct.jsx
  }
export default VerifyAcct;
```

Here’s what the code does:

The OTP is stored as an array of 4 characters (`[‘ ‘, ‘ ‘, ‘ ‘, ‘ ‘]`). Each box only accepts digits, and focus automatically moves to the next input as the user types in the digit. The focus returns to the previous input box if the user presses the backspace button on an empty box.

When the OTP has been added and the form is submitted, the 4-digit code is joined into a string and an `HTTP POST` request is made to the backend `/user/verify/` endpoint along with the stored email and OTP. If the verification is successful, the user is alerted and redirected to the login page, and if not, an error is shown.

![Frontend-OTP](https://cdn.hashnode.com/res/hashnode/image/upload/v1752704448954/8ea46e32-c6d9-42e1-a016-f04b259eb0e7.png)

### Log In

Now you can create the login interface for your application. First, create a <FontIcon icon="fa-brands fa-jsx"/>`Login.jsx` file and input the code:

```jsx :collapsed-lines title="Login.jsx"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://telehealth-backend-2m1f.onrender.com/api/v1';

function Join() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(`${API_URL}/users/login`, formData, {
        withCredentials: true,
      });

      if (res.data.status === 'success') {
        const { token, user, streamToken } = res.data;

        // Save to localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('streamToken', streamToken);

        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {// visit the frontend Github repository to see the remaining code for the OTP Verification
      https://github.com/Derekvibe/Telehealth_Frontend/blob/main/src/pages/Auth/login/Login.jsx
    </div>
  );
}
```

The `Export default Join;` component allows a registered and verified user to log into your application using their email and password. It handles form submission, talks to the backend, and securely stores user data if login is successful.

`handleChange()` updates the email or password field as the user types.

`handleLogin()` is triggered when the login form is submitted. When the login button is triggered, it sends a `Post` request to `/users/login` with the form data, which includes `{withCredentials: true}` to enable cookie handling.

If login is successful, it extracts the JWT token, user data, and Stream Chat token from the response and stores them in the `localStorage` so the user stays logged in across sessions. Then it redirects the user to the dashboard page using `navigate(‘/dashboard’)`.

![Frontend-Login](https://cdn.hashnode.com/res/hashnode/image/upload/v1752704515845/55c6e74a-a8bc-462a-b988-67b0e8df40ac.png)

### Set Up the Frontend Route

Just as you set up the backend route, you have to do the same for the frontend.

Head to <FontIcon icon="fa-brands fa-react"/>`App.jsx`. Before adding the route, make sure you have installed the `react-router-dom` package. If not, run this command in the frontend terminal:

`npm install react-router-dom`

Then, add the command to your <FontIcon icon="fa-brands fa-react"/>`App.jsx` file:

```jsx :collapsed-lines title="App.jsx"
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeIndex from './pages/Home/HomeIndex';
import Hero from './pages/Home/Hero';

//Authentication Section
import NewUser from './pages/Auth/Join/NewUser';
import Login from './pages/Auth/login/Login'
import VerifyAcct from './pages/Auth/login/VerifyAcct';

// Dashboard
import Dashboard from './pages/Dashboard/Dashboard';
import VideoStream from './components/VideoStream';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeIndex />,
    children: [
      { index: true, element: <Hero /> }
    ],
  },

  {
    path: 'signup',
    element: <NewUser />,
    children: [
      { index: true, element: <NewUser /> }
    ],
  },

  {
    path: 'login',
    element: <Login />,
    children: [
      {index:true, element:<Login />}
    ]
  },
]);

{// visit the frontend Github repository to see the remaining code for the OTP Verification
https://github.com/Derekvibe/Telehealth_Frontend/blob/main/src/App.jsx}

function App() {
  return (
    <div className='border border-red-700 w-full min-w-[100vw] min-h-[100vh]'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
```

---

## Stream Chat and Video Integration

Before proceeding to the dashboard, let’s integrate the Stream [<FontIcon icon="fas fa-globe"/>Chat](https://getstream.io/chat/) and [<FontIcon icon="fas fa-globe"/>Video](https://getstream.io/video/) functionality into the project.

First, [<FontIcon icon="fas fa-globe"/>create a free Stream account](https://getstream.io/try-for-free/), start a new project in your dashboard, and get your `APP KEY` and `API_SECRET`.

```sh title=".env"
STREAM_API_KEY=your_app_key
STREAM_API_SECRET=your_api_secret
```

Watch the Stream [<FontIcon icon="fa-brands fa-youtube"/>Chat React Quick Start Guide](https://youtu.be/kGKq4giL4ok?si=M_nkWAiq4IzGNYD_) to see how you can set it up.

<VidStack src="youtube/kGKq4giL4ok" />

Next, store your Stream `APP KEY` and `API_SECRET` in your <FontIcon icon="fas fa-file-lines"/>`.env`.

### Install Stream Packages (Frontend)

Now, install the Stream Chat and Video packages in your terminal.

```sh
npm install stream-chat stream-chat-react
npm install @stream-io/video-react-sdk
npm install @stream-io/stream-chat-css
```

### Stream Token Handler

First, create a new file in your frontend Src directory and name it. In this example, it’s <FontIcon icon="fa-brands fa-react"/>`StreamContext.jsx`. This file sets up a context to fetch and manage the Stream Chat token on login and includes logout functionality.

```jsx :collapsed-lines title="StreamContext.jsx"
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'https://telehealth-backend-2m1f.onrender.com/api/v1';

// 1. Create the context
const StreamContext = createContext();

// 2. Provider component
export const StreamProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(`${API_URL}/stream/get-token`, {
          withCredentials: true,
        });

        if (res.data?.user && res.data?.token) {
          setUser(res.data.user);
          setToken(res.data.token);
          console.log("Stream user/token:", res.data);
        } else {
          console.error("Token or user missing in response:", res.data);
        }
      } catch (error) {
        console.error("Error fetching Stream token:", error);
      }
    };

    fetchToken();
  }, []);

  //Log out Functionality
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`, {},
        {
          withCredentials: true
        });

      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('streamToken');

      // Clear context
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Expose Logout with capital L
  return (
    <StreamContext.Provider value={{ user, token, Logout:logout }}>
      {children}
    </StreamContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useStream = () => useContext(StreamContext);
```

The code above creates a StreamContext using React’s Context API. In the `useEffect` section, it makes a `GET` request to `/stream/get-token` to fetch the authenticated user and their Stream token. Then it stores them in `user` and `token` states. It also provides the user/token through the context so that any component that needs it can make use of it.

Finally, it adds a `Logout` method that hits the logout endpoint and clears all stored auth data from `localStorage`.

Next, open your <FontIcon icon="fa-brands fa-react"/>`main.jsx` and wrap your entire application with the `StreamProvider` so all child components can access the Stream context.

```jsx title="main.jsx"
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import { StreamProvider } from './components/StreamContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StreamProvider>
      <App />
    </StreamProvider>
  </StrictMode>
);
```

### Set Up Stream API

After successfully creating the streamContent, the next step is to set up the Stream API. This will be the endpoint from which the user ID and user Stream token can be generated and fetched during login.

To set it up, navigate to your backend directory by running `cd Backend` in your terminal. Then install the Stream package using the command:

```sh
npm install getstream
npm install stream-chat stream-chat-react
```

Open your <FontIcon icon="fas fa-file-lines"/>`.env` file and add your Stream `API KEY` and `API_SECRET`:

```sh title=".env"
STREAM_API_KEY=your_app_key
STREAM_API_SECRET=your_api_secret
```

Next, open your <FontIcon icon="fa-brands fa-js"/>`authController.js` and create your Stream Chat logic:

```js :collapsed-lines title="authController.js"
//Initialize the Stream Client
const {StreamChat} = require("stream-chat");
const streamClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

// Modifies the `createSendToken to include `streamToken`
const createSendToken = (user, statusCode, res, message) => {
……
const streamToken = streamClient.createToken(user._id.toString());

  //structure of the cookie response when sent to the user
  res.status(statusCode).json({
    status: "success",
    message,
    token,
    streamToken,
    data: {
      user: {
        id: user._id.toString(),
        name: user.username,
      },
    },
  });
};

//login functionality
exports.login = catchAsync(async (req, res, next) => {
 {…………………..}

// Generate Stream token
  await streamClient.upsertUser({
    id: user._id.toString(),
    name: user.username,
  });
  const streamToken = streamClient.createToken(user._id.toString());

user.password = undefined;

  res.status(200).json({
    status: "success",
    message: "Login successful",
    token,
    user: {
      id: user._id.toString(),
      name: user.username,
    },
    streamToken,
  });
```

### `streamRoutes` Endpoint

Next, create an endpoint from which the Stream token can be called. To do this, go to your routes folder and create a new file called <FontIcon icon="fa-brands fa-js"/>`streamRoutes.js`. In <FontIcon icon="fa-brands fa-js"/>`streamRoutes.js`, add the command:

```js :collapsed-lines title="streamRoutes.js"
const express = require("express");
const { StreamChat } = require("stream-chat");

const protect = require("../middlewares/protect");

const router = express.Router();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error(
    "Missing Stream credentials. Check your environment variables."
  );
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

router.get("/get-token", protect, async (req, res) => {
  try {
    const { id, username } = req.user || {};
    console.log(req.user.id, "User");
    // TRY LOGGING THE ID AND NAME FROM YOUR REQUEST FIRST

    if (!id || !username) {
      return res.status(400).json({ error: "Invalid user data" });
    }

    // const userId = _id.toString();
    const user = { id, username };

    // Ensure user exists in Stream backend
    await streamClient.upsertUser(user);

    // Add user to my_general_chat channel
    const channel = streamClient.channel("messaging", "my_general_chat");
    await channel.addMembers([id]);


    // Generate token
    const token = streamClient.createToken(id);
    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Stream token generation error:", error);
    res.status(500).json({ error: "Failed to generate Stream token" });
  }
});

/**
 * @route   POST /api/stream/token
 * @desc    Generate a Stream token for any userId from request body (no auth)
 * @access  Public
 */
router.post("/token", async (req, res) => {
  try {
    const { userId, name } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const userName = name || "Anonymous";
    const user = { id: userId, name: userName };

    await streamClient.upsertUser(user);

    // Add user to my_general_chat channel
    const channel = streamClient.channel("messaging", "my_general_chat");
    await channel.addMembers([userId]);


    const token = streamClient.createToken(userId);

    res.status(200).json({
      token,
      user: {
        id: userId,
        name: name,
        role: "admin",
        image: `https://getstream.io/random_png/?name=${name}`,
      },
    });
  } catch (error) {
    console.error("Public token generation error:", error);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

module.exports = router;
```

---

## User Logout Endpoint

Go to your <FontIcon icon="fa-brands fa-js"/>`authController.js` and create a functionality that handles logging out the user:

```js title="authController.js"
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("token", "loggedout", {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});
```

Then register your logout route to your <FontIcon icon="fa-brands fa-js"/>`userRouters.js`:

```js title="userRouters.js"
const express = require("express");
const {logout}= require("../controller/authController");
const isAuthenticated = require("../middlewares/isAuthenticated");


router.post("/logout", isAuthenticated, logout);

module.exports = router;
```

---

## Chat and Video Function (Frontend)

After setting up your backend Stream API, the last task is setting up chat and video in your frontend application.

### <FontIcon icon="fa-brands fa-react"/>`Dashboard.jsx`

Create a new file <FontIcon icon="fa-brands fa-react"/>`Dashboard.jsx` in your frontend directory. This is where you will set up your Stream and video function.

```jsx :collapsed-lines title="Dashboard.jsx"
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { useStream } from "../../components/StreamContext";
import VideoStream from "../../components/VideoStream";
import { useNavigate } from "react-router-dom";

const apiKey = import.meta.env.VITE_STREAM_API_KEY;

const API_URL = import.meta.env.VITE_API_URL || 'https://telehealth-backend-2m1f.onrender.com/api/v1';

function App() {
  const [channel, setChannel] = useState(null);
  const [clientReady, setClientReady] = useState(false);
  const navigate = useNavigate();

  // const ChatComponent = () => {
    const { user, token, Logout } = useStream();

    // Always call the hook
    const chatClient = useCreateChatClient({
      apiKey,
      tokenOrProvider: token,
      userData: user?.id ? { id: user.id } : undefined,
    });

  // Debug: See when user/token is ready
  useEffect(() => {
    console.log("Stream user:", user);
    console.log("Stream token:", token);
  }, [user, token]);

  // Connect user to Stream
  useEffect(() => {
    const connectUser = async () => {
      if (!chatClient || !user || !token || !user?.id) {
        console.warn("Missing chat setup data:", { chatClient, token, user });
        return;
      }

      try {
        await chatClient.connectUser(
          {
            id: user.id,
            name: user.name || "Anonymous",
            image:
              user.image ||
              `https://getstream.io/random_png/?name=${user.name || "user"}`,
          },
          token
        );

        const newChannel = chatClient.channel("messaging", "my_general_chat", {
          name: "General Chat",
          members: [user.id],
        });

        await newChannel.watch();
        setChannel(newChannel);
        setClientReady(true);
      } catch (err) {
        console.error("Error connecting user:", err);
      }
    };

    connectUser();
  }, [chatClient, user, token]);

  const handleVideoCallClick = () => {
    navigate("/videoCall");
  };

  const handleLogout = async () => {
    await Logout();
    navigate("/login");
  }

  if (!user || !token) {
    return <div className="text-red-600">User or token not ready.</div>;
  }

  if (!clientReady || !channel) return <div>Loading chat...</div>;

  return (
    { checkout the github repo }
    <ChannelHeader />
    <MessageList />
    <MessageInput />
    </Window>
    <Thread />
    </Channel>
    </Chat>
    </div>
  );
}

export default App;
```

### Video Setup

You’ll now set up the video function for your frontend. To do so, create a new file <FontIcon icon="fa-brands fa-react"/>`VideoStream.jsx` and add the command:

```jsx :collapsed-lines title="VideoStream.jsx"
import React, { useEffect, useState } from "react";
import { StreamVideoClient } from "@stream-io/video-client";
import { StreamVideo, StreamCall } from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";

import { useStream } from "./StreamContext";
import { MyUILayout } from "./MyUILayout";


const apiKey = import.meta.env.VITE_STREAM_API_KEY;

function VideoStream() {

  const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);
  const { user, token } = useStream();
  const navigate = useNavigate();

  useEffect(() => {

    let clientInstance;
    let callInstance;


    const setup = async () => {
      if (!apiKey || !user || !token) return;

      clientInstance = new StreamVideoClient({ apiKey, user, token });

      callInstance = clientInstance.call("default", user.id); // Use user.id as callId


      await callInstance.join({ create: true });

      setClient(clientInstance);
      setCall(callInstance);
    };

    setup();

    return () => {
      if (callInstance) callInstance.leave();
      if (clientInstance) clientInstance.disconnectUser();

    };
  }, [user, token]);

  const handleLeaveCall = async () => {
    if (call) await call.leave();
    if (client) await client.disconnectUser();

    setCall(null);
    setClient(null);

    navigate("/dashboard"); // or any other route
  };

  if (!apiKey) return <div>Missing Stream API Key</div>;

  if (!client || !call)
    return (
  <div className="flex items-center justify-center h-screen text-xl font-semibold">
    Connecting to the video call...
  </div>
    );

  return (
    <div className="relative h-screen w-full p-2 sm:p-4 bg-gray-50">
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <MyUILayout />
        </StreamCall>
      </StreamVideo>

      <button
        onClick={handleLeaveCall}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-600 text-white text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow hover:bg-red-700 transition"
      >
        Leave Call
      </button>
    </div>
    );
  }

export default VideoStream;
```

```jsx title="MYUILayout.jsx"
import React from 'react';
import {
  useCall,
  useCallStateHooks,
  CallingState,
} from '@stream-io/video-react-sdk';

export function MyUILayout() {
  const call = useCall();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return <div>Joining call...</div>;
  }

  return (
    <div style={{ padding: '1rem', fontSize: '1.2rem' }}>
      ✅ Call "<strong>{call?.id}</strong>" has <strong>{participantCount}</strong> participants.
    </div>
  );
}
```

---

## Conclusion

And that’s a wrap!

You’ve [<FontIcon icon="fas fa-globe"/>built a telehealth app](https://getstream.io/blog/telemedicine-app-development/) with secure video, real-time chat, and user authentication - all powered by Stream’s Chat and Video SDKs.

This foundation gives you the flexibility to expand further with features like appointment scheduling, patient history, or HIPPA-compliant file sharing.

You can find the [frontend (<FontIcon icon="iconfont icon-github"/>`Derekvibe/Telehealth_Frontend`)](https://github.com/Derekvibe/Telehealth_Frontend) and [backend (<FontIcon icon="iconfont icon-github"/>`Derekvibe/Telehealth_Backend`)](https://github.com/Derekvibe/Telehealth_Backend) applications on GitHub. The frontend app is hosted using the Vercel hosting service, and the backend is hosted on Render.

Check out the [<FontIcon icon="fas fa-globe"/>repository of the application](https://telehealth-frontend.vercel.app/).

Happy coding! 🚀

### Project Demo

![Telehealth Final Project Demo](https://cdn.hashnode.com/res/hashnode/image/upload/v1752705861841/85b6d6b3-0f5e-402f-b8b5-8ab51d820403.gif)

Congratulations! You have successfully integrated Stream’s chat and video function into your application.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Telehealth App Using Stream Video and Chat SDK in React",
  "desc": "Remember when the COVID-19 pandemic moved everything online - doctor’s visits included - and staying home became the safest option?  That moment kicked off a massive shift in how healthcare gets delivered.  Telehealth became more than a workaround. I...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-build-a-telehealth-app-using-stream-video-and-chat-sdk-in-react.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
