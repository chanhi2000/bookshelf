---
lang: en-US
title: "How to Bypass Cloud SMTP Restrictions Using Brevo and HTTP APIs"
description: "Article(s) > How to Bypass Cloud SMTP Restrictions Using Brevo and HTTP APIs"
icon: iconfont icon-expressjs
category:
  - Node.js
  - Express.js
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Bypass Cloud SMTP Restrictions Using Brevo and HTTP APIs"
    - property: og:description
      content: "How to Bypass Cloud SMTP Restrictions Using Brevo and HTTP APIs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-bypass-cloud-smtp-restrictions-using-brevo-and-http-apis.html
prev: /programming/js-express/articles/README.md
date: 2026-05-09
isOriginal: false
author:
  - name: Okoro Emmanuel Nzube
    url: https://freecodecamp.org/news/author/Derekvibe/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/64f68792-e18c-4b90-9c65-c6d9884ab191.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": " > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Bypass Cloud SMTP Restrictions Using Brevo and HTTP APIs"
  desc="Being able to communicate by sending emails through web applications is important these days. It helps businesses stay connected with their potential customers, securely verify user identities, and de"
  url="https://freecodecamp.org/news/how-to-bypass-cloud-smtp-restrictions-using-brevo-and-http-apis"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/64f68792-e18c-4b90-9c65-c6d9884ab191.png"/>

Being able to communicate by sending emails through web applications is important these days. It helps businesses stay connected with their potential customers, securely verify user identities, and deliver crucial notifications like password resets.

But sometimes, deploying your perfectly working email function to the cloud leads to unexpected and frustrating errors. You build your backend, test it locally, and it works flawlessly. Then you deploy to the cloud, and suddenly your app stops sending emails completely.

In this article, you’ll learn exactly why your email setup fails on cloud platforms like Render or Heroku, the underlying networking rules causing the issue, and how to elegantly bypass these restrictions using Brevo's HTTP API.

Let’s dive right in.

::: note Prerequisites

To get the absolute most out of this tutorial, it’s important to have some basic knowledge of the following:

- **JavaScript and Node.js:** Having a good fundamental understanding of how JS works on the server side will make it easier to follow along with the project.
- **REST APIs:** You should have a basic understanding of how HTTP requests (like POST and GET) work using native `fetch()` in Node.js.
- **Express.js:** A little background on creating basic server routes will be helpful, as we'll build a real-world controller.
- A basic understanding of what [<VPIcon icon="fas fa-globe"/>Nodemailer](https://nodemailer.com/) is and how cloud hosting platforms (like Render or Heroku) operate.

:::

---

## Tools We’ll Be Using

In one of my recent projects, I created a complex authentication flow where users needed an OTP (One Time Password) sent to their email to complete registration. I set up Nodemailer, linked my Gmail, and tested it on `localhost`. Within seconds, the emails arrived perfectly.

But when I deployed my backend to Render, the entire signup flow broke. After doing some deep digging, I found out why it broke and how to fix it permanently. And now that I know how it works, I wanted to share it with you all.

---

## The Problem: Nodemailer and SMTP Blocking

So what exactly is the issue?

Nodemailer is a very popular Node.js module that lets you send emails efficiently. Usually, developers use it to connect to services like Gmail or Mailtrap using **SMTP** (Simple Mail Transfer Protocol). When your code tries to send an email, Nodemailer opens a connection to the mail server using Port `587` (for STARTTLS) or Port `465` (for SSL).

But cloud providers like Render, Heroku, DigitalOcean, and AWS face a massive daily battle against automated spammers. Malicious users often spin up thousands of free-tier servers specifically to blast out millions of spam emails. If a cloud provider allows this, their entire network IP address block will get blacklisted by Gmail, Outlook, and Yahoo.

To protect their network reputation, cloud providers enacted a heavy-handed, silent rule: **All outbound traffic on Ports 25, 465, and 587 is strictly blocked on free and entry-level tiers.**

This means your server is literally trapped behind a firewall. If you check your server logs, you won't see an "Invalid Password" error. Instead, you'll see a timeout error that looks like this:

```plaintext
Error: connect ETIMEDOUT 142.250.102.108:587
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1494:16)
```

Your code isn't broken – it's just being blocked at the network level!

### The "Modern" Trap: Domain Verification

When developers hit this wall, they often try modern API-based email services like Resend or SendGrid. These are amazing tools, but they introduce a new problem for beginners: **Strict Domain Authentication.**

To use Resend in production, you must own a custom domain (like `yourname.com`) and configure DNS records (SPF, DKIM, and DMARC). If you don't own a domain, Resend's sandbox mode strictly restricts you to sending emails *only* to yourself. You can't send emails to your live users.

For a developer just trying to launch a portfolio project, buying a domain just to send test emails is a huge bottleneck.

### The Ultimate Solution: Brevo and HTTP APIs

We need a solution that meets two criteria:

1. It must bypass the Port `587` firewall.
2. It must let us send emails to *anyone* without forcing us to buy a custom domain.

This is where the architectural difference between SMTP and REST APIs comes to the rescue. While SMTP is a dedicated protocol for routing mail, a REST API operates over standard web traffic using **HTTPS (Port 443)**. Cloud providers *can't* block Port 443, because doing so would prevent your server from fetching data from databases or functioning as a web server entirely.

Enter **Brevo** (formerly Sendinblue). Brevo is a powerful email platform that allows you to send emails via a standard REST API. Best of all, their free tier (300 emails/day) allows Single Sender Verification. You just verify your standard Gmail address, and they let you send to anyone!

By sending a JSON payload via HTTPS to Brevo's API, your server routes the traffic out of the unrestricted Port `443`, bypassing the Render firewall completely.

Now that you know the theory behind the tools we’ll be using, let’s move on to writing the code.

---

## Backend Setup

First things first, you have to set up your environment. If you don't already have Node.js installed on your computer, head to their [<VPIcon icon="fa-brands fa-node"/>website](https://nodejs.org/en) to download and install it.

Start by running `npm init -y` in your terminal. This creates the `package.json` file which manages your project and stores all the dependencies.

Next, run 

```sh
npm i express dotenv
```

You might be used to installing `nodemailer` for your email tasks. But because we are going to use the native Node.js `fetch()` API to talk to the Brevo API, you actually don't need to install *any* heavy email libraries at all! We want to keep our backend as lightweight as possible.

### Brevo Configuration Setup

Before you write the email function, you first need to configure Brevo to get access to your API key.

1. Go to [<VPIcon icon="fas fa-globe"/>Brevo.com](https://brevo.com/) and create a free account.
2. During setup, they will ask you to add a **Sender Email**. Make sure you input your standard Gmail address. They will send you an email with a link to verify you own this address.
3. Once verified and inside the dashboard, click on your profile name in the top right corner, and select **SMTP & API** from the dropdown menu.
4. Go to the **API Keys** tab and click **Generate a new API key**. Give it a name like "MyWebApp".

Copy this generated key and store it safely in a <VPIcon icon="iconfont icon-dotenv"/>`.env` file at the root of your project:

```sh title=".env"
# .env file
EMAIL_USER = yourverifiedemail@gmail.com
BREVO_API_KEY = xkeysib-your-generated-api-key-goes-here
```

### Creating the Email Function

Now that you’ve gotten your API key and set up your environment variables, all that remains is to start putting your backend code together.

Create a file named <VPIcon icon="fas fa-folder-open"/>`utils/`<VPIcon icon="fa-brands fa-js"/>`email.js`.

First, start by ensuring you can load your <VPIcon icon="iconfont icon-dotenv"/>`.env` file so you can easily access the credentials you generated:

```js title="utils/email.js"
require("dotenv").config();

// We'll define the function to accept dynamic options
const sendEmail = async (options) => {
  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.EMAIL_USER;

  // Validate that the keys actually exist
  if (!brevoApiKey || !senderEmail) {
    throw new Error("Missing Brevo credentials in environment variables.");
  }
```

Next on the line, you’ll need to structure your payload. This is the JSON object that tells Brevo exactly who is sending the email, who is receiving it, and what the content is. Here’s how you can do that:

```js title="utils/email.js"
  const payload = {
    sender: {
      name: "My Awesome Web App",
      email: senderEmail, // Must match your verified Brevo email
    },
    to: [
      {
        email: options.email, // The dynamic email address of the user receiving the email
      },
    ],
    subject: options.subject,
    htmlContent: options.html,
  };
```

In the code above, the `payload` object securely packages up your information. We pass in `options.email`, `options.subject`, and `options.html` so that we can reuse this single function for welcome emails, password resets, and notifications.

Now, create the actual network request that sends your data to the Brevo backend. We'll use the `POST` method. When the data is sent, it must be stringified into a JSON format.

```js title="utils/email.js"
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(`Brevo API Error: ${JSON.stringify(result)}`);
    }

    console.log(`Email successfully sent to ${options.email} via Brevo HTTP API!`);
  } catch (error) {
    console.error("Error details:", error.message);
  }
};

module.exports = sendEmail;
```

In the code above, after the payload is submitted, if the message is sent successfully, a success log will be displayed in your terminal. But if the message wasn’t successful – maybe due to a typo in your API key – an error message will be thrown to help you debug exactly what went wrong.

### Integrating the Function into an Express Route

At this point, you've successfully built a robust email function. Let's see how you would actually use this in a real Express application.

Create an <VPIcon icon="fa-brands fa-js"/>`index.js` file and set up a simple Express server route:

```js title="index.js"
const express = require("express");
const sendEmail = require("./utils/email");
const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/api/signup", async (req, res) => {
  const { username, email } = req.body;

  // 1. Save user to database (skipped for brevity)
  
  // 2. Generate a random OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  // 3. Send the email using our new Brevo function
  try {
    await sendEmail({
      email: email,
      subject: "Welcome! Here is your Verification Code",
      html: `
        <div style="font-family: sans-serif; text-align: center;">
          <h2>Welcome to My Awesome Web App, ${username}!</h2>
          <p>Please use the verification code below to complete your registration:</p>
          <h1 style="color: #2563eb; letter-spacing: 5px;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    res.status(201).json({ message: "User created and email sent!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email." });
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
```

And that is it! You can now hit this `/api/signup` endpoint from your React or Vue frontend, and it will instantly fire off a beautifully formatted email via Brevo's REST API.

---

## Conclusion

As developers, encountering a bug that works locally but fails in production is a rite of passage. But the "Email Delivery Failed" timeout error is special. It teaches you that software engineering isn't just about writing clean syntax – it's about understanding the underlying infrastructure, network layers, and the security context of the environment your code runs in.

By swapping a protocol (SMTP) for an architectural pattern (REST API over HTTPS), you didn't just fix a bug. You successfully engineered a secure, free, and robust bypass around a cloud-level firewall without relying on heavy third-party NPM modules like Nodemailer.

If you've made it this far, I hope I've successfully shown you the importance of understanding network layers and how you can use HTTP APIs to send email messages directly from your web applications safely.

Thank you for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Bypass Cloud SMTP Restrictions Using Brevo and HTTP APIs",
  "desc": "Being able to communicate by sending emails through web applications is important these days. It helps businesses stay connected with their potential customers, securely verify user identities, and de",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-bypass-cloud-smtp-restrictions-using-brevo-and-http-apis.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
