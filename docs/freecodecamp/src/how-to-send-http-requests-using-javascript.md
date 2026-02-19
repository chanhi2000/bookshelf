---
lang: en-US
title: "How to Send HTTP Requests Using JavaScript"
description: "Article(s) > How to Send HTTP Requests Using JavaScript"
icon: fa-brands fa-js
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
      content: "Article(s) > How to Send HTTP Requests Using JavaScript"
    - property: og:description
      content: "How to Send HTTP Requests Using JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-send-http-requests-using-javascript.html
prev: /programming/js/articles/README.md
date: 2024-07-11
isOriginal: false
author:
  - name: Eric Hu
    url: https://freecodecamp.org/news/author/huericnan/
cover: https://freecodecamp.org/news/content/images/2024/07/js-http.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Send HTTP Requests Using JavaScript"
  desc="Nowadays, the interaction between web applications relies on HTTP. For instance, let's say you have an online shop application and you want to create a new product. You have to fill in all the necessary information and probably click on a button that..."
  url="https://freecodecamp.org/news/how-to-send-http-requests-using-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2024/07/js-http.png"/>

Nowadays, the interaction between web applications relies on [**HTTP**](/freecodecamp.org/what-is-http,md). For instance, let's say you have an online shop application and you want to create a new product. You have to fill in all the necessary information and probably click on a button that says "Create".

This action will send an HTTP request to the backend, along with all the necessary data, and the backend application will use that data to make changes to the database. After the action is complete, whether successful or not, an HTTP response will be sent back to the frontend, which will act accordingly based on the status of that response.

When these requests and responses are transferred back and forth, they need to follow a certain format so that both ends can understand each other. HTTP was created for this purpose. It is a standard network protocol that enables web applications to understand and communicate with each other.

---

## What Are the HTTP Request Methods?

There are several methods you can use to send an HTTP request, and each of them serves a different purpose, as shown below:

### The `GET` Method

The `GET` method is used to request data and resources from the server. When you send a `GET` request, the query parameters are embedded in the URL in name/value pairs like this:

```plaintext
http://example.com/index.html?name1=value1&name2=value2
```

Note that the question mark (`?`) denotes the beginning of a list of parameters. Each parameter forms a key/value pair (`name=value`), and the ampersand (`&`) is used to divide two different parameters.

### The `POST` Method

The `POST` method is used to send data to the server, either adding a new resource or updating an existing resource. The parameters are stored in the body of the HTTP request.

```plaintext
POST /index.html HTTP/1.1
Host: example.com
name1=value1&name2=value2
```

### The `DELETE` Method

This method removes a resource from the server.

### The `HEAD` Method

The `HEAD` method works just like `GET` except that the HTTP response sent from the server will only contain the head but not the body. This means that if the server is "OK" with the request, it will give you a `200 OK` response but not the resource you requested. You can only retrieve the resource with the `GET` method.

This is very useful when you are testing whether the server works. Sometimes, the resource may take a long time to be transmitted, and for testing purposes, you only need a `200 OK` response to know that everything works properly.

### The `PUT` Method

The `PUT` method is used to update existing resources, and it is similar to the `POST` method with one small difference.

When you `PUT` a resource that already exists, the old resource will be overwritten. And making multiple identical `PUT` requests will have the same effect as making it once.

When you `POST` identical resources, that resource will be duplicated every time the request is made.

---

## What is the Fetch API?

For a long time, the JavaScript community lacked a standard way to send HTTP requests. Some people used `XMLHttpRequest`, aka AJAX, while others prefered external libraries such as Axios or jQuery.

The fetch API was introduced in 2015 as the modern, simplified, and standard way of making HTTP requests using JavaScript. It is natively supported, so there is no need to install any third-party libraries.

---

## How to Send a GET Request Using JavaScript

The fetch API is [<VPIcon icon="fa-brands fa-firefox"/>promise-based](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), which means that it offers a clean and concise syntax for writing asynchronous operations. For example, this is how you can send a `GET` request using the fetch API.

```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    // If the response is not 2xx, throw an error
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // If the response is 200 OK, return the response in JSON format.
    return response.json();
  })
  .then((data) => console.log(data)) // You can continue to do something to the response.
  .catch((error) => console.error("Fetch error:", error)); // In case of an error, it will be captured and logged.
```

You can also include custom options with the request, such as custom headers, authorization tokens, and so on.

```js
fetch("https://jsonplaceholder.typicode.com/users", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": "your-token-here",
  },
  credentials: "same-origin",
})
  .then(. . .);
```

---

## How to Send a POST Request Using JavaScript

When sending a `POST` request, things get a bit more complex because you need to send data to the server with the request body. This could get complicated depending on the kind of data you're sending and your specific use case.

For example, the following code sends JSON data to the backend:

```js
fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "John Doe",
    email: "johndoe@example.com",
  }),
});
```

There are a few things you must pay attention here. First of all, you must explicitly specify the request method. If you leave this out, the default `GET` method will be used.

Also, the request body only accepts string data, so you must use the `stringify()` method to convert JSON into a string before assigning it to the request body.

This is also why it is important to include the `Content-Type` header, which lets whoever is on the receiving end know how to parse the request body.

However, things are usually more complex in practice. For example, when working with web forms, instead of JSON, you are likely using the `x-www-form-urlencoded` form encoding, in which case the request can be sent like this.

The following example assumes you understand what [**event handlers**](/freecodecamp.org/dom-events-and-javascript-event-listeners.md) are.

```js :collapsed-lines
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");

  const formData = new URLSearchParams();

  usernameInput.addEventListener("input", function () {
    formData.set("username", usernameInput.value);
  });

  emailInput.addEventListener("input", function () {
    formData.set("email", emailInput.value);
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission action

    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: formData.toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  });
});
```

If you need to upload files to the backend, you'll need the `multipart/form-data` form encoding instead.

```js :collapsed-lines
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const pictureInput = document.getElementById("picture");

  const formData = new FormData();

  usernameInput.addEventListener("input", function () {
    formData.set("username", usernameInput.value);
  });

  emailInput.addEventListener("input", function () {
    formData.set("email", emailInput.value);
  });

  pictureInput.addEventListener("change", function () {
    formData.set("picture", pictureInput.files[0]);
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: formData,
    });
  });
});
```

Note that when using the `FormData()` to construct the request body, the `Content-Type` will be locked into `multipart/form-data`. In this case, it is not necessary to set a custom `Content-Type` header.

---

## How to Send a PUT Request Using JavaScript

The `PUT` request works similarly to `POST`, but you must remember to set `method` to `PUT`.

```js
fetch("https://jsonplaceholder.typicode.com/users", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: "123"
    name: "John Doe",
    email: "johndoe@example.com",
  }),
});
```

Realistically, you'll have to provide an `id`, or any other key that enables you to locate the record to be updated in the backend.

---

## How to Send a DELETE Request Using JavaScript

The `DELETE` request works similarly to `PUT`, but remember to set `method` to `DELETE`.

```js
fetch("https://jsonplaceholder.typicode.com/users/123", {
  method: "DELETE",
});
```

And similarly, remember to provide an `id` so that the backend application knows which record to delete.

---

## How to Send a Request Using XMLHttpRequest (AJAX)

Besides `fetch()`, it is also possible to make an HTTP request using `XMLHttpRequest`. The following example demonstrates how to make a `GET` request to the endpoint `https://jsonplaceholder.typicode.com`

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.error("Error:", xhr.statusText);
  }
};
xhr.onerror = function () {
  console.error("Request failed");
};
xhr.send();
```

The syntax is a bit more complex, as `XMLHttpRequest` relies on callback functions to work with asynchronous operations, which means it is easy to lead to what is known as the callback hell, where you have layers upon layers of callback functions, making your code base difficult to read and maintain.

However, `XMLHttpRequest` does have some advantages. Due to the fact that `XMLHttpRequest` is much older compared to `fetch()`, it is more widely supported. You should consider using `XMLHttpRequest` when your web app needs to be compatible with older browsers.

---

## How to Send a Request Using External Libraries

Aside from the built-in methods, you can also send HTTP requests using third-party libraries. For instance, this is how you can send a `GET` request using jQuery:

```js
$.get("https://api.example.com/data", function (data) {
  console.log(data);
}).fail(function (error) {
  console.error("Error:", error);
});
```

[<VPIcon icon="iconfont icon-jQuery"/>jQuery](https://jquery.com/) is one of the most popular JavaScript libraries. It aims to fix the part of JavaScript that is difficult to use, and it has been pretty successful at that.

In recent years, jQuery has lost some popularity as vanilla JavaScript has improved over the years and the problems that used to bother people have been fixed. It is no longer the go-to choice for creating JavaScript applications, especially for newer developers.

Alternatively, you could go with Axios, which is a promise-based HTTP client just like `fetch()`, and it has been people's favorite for a very long time before `fetch()` came.

```js
axios
  .get("https://api.example.com/data")
  .then((response) => console.log(response.data))
  .catch((error) => console.error("Axios error:", error));
```

[<VPIcon icon="iconfont icon-axios"/>Axios](https://axios-http.com/docs/intro) and `fetch()` have very similar syntax as they are both promise-based. The main difference between them is that `fetch()` is built-in, while Axios requires you to install an external library. However, Axios is much more feature-rich, as it comes with request/response interceptors, automatic JSON handling, and built-in timeouts.

---

## Conclusion

We introduced four different ways you could send HTTP requests using JavaScript in this tutorial. It is up to you to decide which is best for your project.

The fetch API is the modern and standard way of making HTTP requests using JavaScript. It has a relatively simple syntax, which makes your project easier to maintain.

`XMLHttpRequest` is the legacy method of sending HTTP requests. It is generally not recommended for use in new projects, but if your project needs to be compatible with legacy browsers, `XMLHttpRequest` might still come in handy.

jQuery is an external package that can do a lot of things, including sending HTTP requests. Although the significance of jQuery has been fading in recent years, it is still used in many older projects, and you might encounter it in your work as a JavaScript developer.

Axios is a third-party library used to send HTTP requests. It has a very similar syntax to the fetch API but comes with a lot more advanced features. It is up to you to decide if you need these features. If not, it is generally recommended to use `fetch()` instead.

::: info

To learn more about JavaScript and web development, visit [<VPIcon icon="fas fa-globe"/>thedevspace.io](https://thedevspace.io)

<SiteInfo
  name="Complete Full Stack Developer Roadmap | TheDevSpace"
  desc="From coding fundamentals to modern web frameworks, from API design to building real-world projects, we help you level up every step of the way. Kick start your journey with our complete full stack dev course and production-ready SaaS boilerplate."
  url="https://thedevspace.io"
  logo="https://thedevspace.io/favicon.ico?favicon.f8e8fb89.ico"
  preview="https://thedevspace.io/opengraph-image.png?opengraph-image.6abf4a07.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Send HTTP Requests Using JavaScript",
  "desc": "Nowadays, the interaction between web applications relies on HTTP. For instance, let's say you have an online shop application and you want to create a new product. You have to fill in all the necessary information and probably click on a button that...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-send-http-requests-using-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
