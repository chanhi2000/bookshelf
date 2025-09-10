---
lang: en-US
title: "POST Method"
description: "Article(s) > (2/9) Learn HTTP Methods like GET, POST, and DELETE - a Handbook with Code Examples"
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (2/9) Learn HTTP Methods like GET, POST, and DELETE - a Handbook with Code Examples"
    - property: og:description
      content: "POST Method"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/post-method.html
date: 2024-10-02
isOriginal: false
author: Ashutosh Krishna
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Learn HTTP Methods like GET, POST, and DELETE - a Handbook with Code Examples",
  "desc": "When you interact with websites or apps, a lot happens behind the scenes. A key part of this process is how your browser or app talks to a server. HTTPS methods define what action needs to happen - it could be fetching data, sending information, or m...",
  "link": "/freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn HTTP Methods like GET, POST, and DELETE - a Handbook with Code Examples"
  desc="When you interact with websites or apps, a lot happens behind the scenes. A key part of this process is how your browser or app talks to a server. HTTPS methods define what action needs to happen - it could be fetching data, sending information, or m..."
  url="https://freecodecamp.org/news/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png"/>

The POST method is used to send data to a server. Unlike the GET method, which only retrieves data, POST allows you to submit information that the server can use to process or store. POST is commonly used in forms, where users input data such as usernames, passwords, or contact details.

When a POST request is made, the data is sent in the body of the request rather than in the URL. This makes POST ideal for sending larger or more sensitive information, such as passwords, because the data is hidden and doesn’t appear in the browser's address bar.

For example, when you sign up for a website or submit a comment on a blog, the POST method is used to send your information to the server, which processes it and stores it in a database.

---

## Example of a POST Request

Here’s an example of a POST request using the Fetch API to send form data to a server:

```js
const formData = {
  username: 'john_doe',
  password: 'mypassword123'
};

fetch('https://example.com/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));
```

In this example, the POST request sends `username` and `password` as JSON data in the body of the request, making it a secure way to handle sensitive information like passwords.

---

## Differences Between GET and POST

Although GET and POST are used to communicate with a server, they serve different purposes and handle data in different ways:

### Data Transmission:

- **GET**: Data is included in the URL, making it visible in the address bar. This limits how much data can be sent.
- **POST**: Data is sent in the body of the request, which allows for sending larger amounts of information. This also keeps sensitive information hidden from the URL.

### Purpose:

- **GET**: Used for retrieving data. It doesn’t change or modify anything on the server.
- **POST**: Used to send data that may change or add to the server's resources, such as adding a new user to a database or submitting a form.

### Caching:

- **GET**: GET requests can be cached. This means that the browser may save the response, making future requests faster.
- **POST**: POST requests are not cached, as they often involve new or updated data that shouldn't be reused.

### Idempotence:

- **GET**: Sending the same GET request multiple times doesn’t change the result. It will return the same data every time.
- **POST**: Sending the same POST request multiple times may result in different outcomes. For example, submitting a form twice could create duplicate entries.

---

## Common Scenarios for Using POST

POST is ideal in situations where you need to send data to the server, often for processing or storage. Here are some common use cases:

### 1. Submitting Forms

Whenever you fill out and submit a form online, such as signing up for a newsletter or entering your details in a registration form, the POST method is used to send that information to the server. The server then processes the data, stores it, or performs another action based on it.

::: info Example

```html
<form action="https://example.com/register" method="POST">
  <input type="text" name="username" />
  <input type="password" name="password" />
  <button type="submit">Sign Up</button>
</form>
```

:::

### 2. User Authentication

When you log in to a website using a username and password, POST is often used to send your credentials securely to the server. The server checks the information and grants access to your account if the credentials match.

### 3. Uploading Files

POST is also used for uploading files, such as images, documents, or videos. Since the POST method allows sending large amounts of data, it’s perfect for uploading files that need to be processed or stored on the server.

::: info Example using a form for file uploads

```html
<form action="https://example.com/upload" method="POST" enctype="multipart/form-data">
  <input type="file" name="file" />
  <button type="submit">Upload File</button>
</form>
```

:::

### 4. Creating New Resources

POST is often used in APIs to create new resources. For example, when you add a new product to an online store, the POST method is used to send the product details to the server, which adds the product to the store's database.

::: info Example of sending product data:

```js
const product = {
  name: 'New Sneakers',
  price: 59.99,
  category: 'Footwear'
};

fetch('https://example.com/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(product)
})
.then(response => response.json())
.then(data => console.log('Product added:', data));
```

:::

### 5. Sending Data to an API

POST is widely used in APIs when you need to send data that will be processed or stored. For example, an app that tracks your fitness progress may use POST to send your workout details to a server, where it’s stored and analyzed.

### 6. Making Purchases Online

When you make an online purchase, POST is used to send the payment details to the server for processing. The server processes the transaction and updates the system with your order information.