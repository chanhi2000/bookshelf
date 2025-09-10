---
lang: en-US
title: "GET Method"
description: "Article(s) > (1/9) Learn HTTP Methods like GET, POST, and DELETE - a Handbook with Code Examples"
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
      content: "Article(s) > (1/9) Learn HTTP Methods like GET, POST, and DELETE - a Handbook with Code Examples"
    - property: og:description
      content: "GET Method"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/get-method.html
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

The GET method is one of the most common HTTP methods and is used to request data from a server. Think of it as asking for information without changing anything.

When you visit a webpage, your browser sends a GET request to the server asking for the content of the page. The server then responds with the data (such as HTML, images, or other files) that the browser displays.

One important thing about GET is that it doesn't make any changes to the data. It simply "reads" or retrieves the information. For example, when you browse through social media or search for products online, the app or website uses GET to display data without altering it.

Another key point is that GET requests send parameters in the URL itself. This means any data you're asking for is visible in the browser's address bar. For example, if you're searching for a product on an online store, the search term is included in the URL.

---

## Example of a GET Request

Here’s a simple example of a GET request in JavaScript using the Fetch API:

```js
fetch('https://api.example.com/products?category=shoes')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

In this example, the GET request is made to the URL `https://api.example.com/products` with a query parameter `category=shoes`, asking the server to return products in the shoes category.

---

## Use Cases of the GET Method

GET is mainly used to fetch information, and there are many common scenarios where it's applied:

### 1. Loading a Webpage

Every time you type a URL into your browser or click a link, you're making a GET request. The browser asks the server for the webpage, and the server sends back the content to display.

::: info Example

`GET /index.html HTTP/1.1`

:::

### 2. Fetching Data from APIs

When developers build applications, they often use APIs (Application Programming Interfaces) to get data from external servers. For instance, a weather app uses a GET request to fetch the current temperature from a weather API.

::: info Example

```js
fetch('https://api.weather.com/current?city=Lagos')
    .then(response => response.json())
    .then(data => console.log(data));
```

:::

### 3. Search Queries

When you search for something on Google or other search engines, a GET request is made. The search term you entered is included in the URL, and the server returns a list of matching results.

::: info Example

`GET /search?q=JavaScript`

:::

### 4. Retrieving Files

Whether you're downloading an image, viewing a PDF, or playing a video, GET is used to fetch those files from a server.

::: info Example

`GET /files/image.jpg`

:::

---

## Best Practices for GET Requests

To use GET requests effectively, it's important to follow some good practices to ensure smooth and secure data handling:

### 1. Use GET Only for Retrieving Data

GET requests are meant to fetch data, not to send sensitive information like passwords or personal data. Since the parameters in a GET request are included in the URL, anyone can see them. For example, if you're logging into a website, you shouldn't use GET to send your password, because it would show up in the URL.

::: info Example of what <strong>not</strong> to do:

```js
fetch('https://example.com/login?username=john&password=secret');
```

:::

### 2. Keep URLs Short and Clean

Since GET requests include data in the URL, long URLs can become problematic. There is also a limit to how much data can be included in a GET request URL (depending on the browser and server), so avoid putting too much information there. If you need to send a lot of data, consider using a POST request instead.

### 3. Enable Caching for Performance

GET requests are often cached by browsers, meaning the browser can store the response and reuse it without contacting the server again. This improves performance, especially for static content that doesn’t change often, like images or style sheets. To take advantage of this, ensure your server sends proper cache-control headers, so frequently requested data can be loaded faster.

::: info Example of setting cache headers:

```
Cache-Control: max-age=3600
```

:::

### 4. Avoid Making GET Requests for Actions That Change Data

Since GET is a "safe" method, it should only be used for actions that don't modify data. If you want to create, update, or delete data, use methods like POST, PUT, or DELETE. For instance, if you accidentally use GET to delete a resource, someone could remove it just by clicking a link or refreshing the page, which is not safe.

::: info Example of **not** using GET for deletion:

```
GET /delete/user/123
```

:::

### 5. Be Cautious with Sensitive Data

Since GET requests are part of the URL, they can be logged or saved in a browser’s history. Avoid sending sensitive information like passwords, credit card details, or private data in a GET request. Always use methods like POST for handling such information, which keeps it hidden.