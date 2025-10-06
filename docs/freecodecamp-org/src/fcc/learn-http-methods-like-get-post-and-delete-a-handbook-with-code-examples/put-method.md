---
lang: en-US
title: "PUT Method"
description: "Article(s) > (3/9) Learn HTTP Methods like GET, POST, and DELETE - a Handbook with Code Examples"
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
      content: "Article(s) > (3/9) Learn HTTP Methods like GET, POST, and DELETE - a Handbook with Code Examples"
    - property: og:description
      content: "PUT Method"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/put-method.html
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

The **PUT** method is used to update or replace an existing resource on the server. It sends data to the server and tells it to create a new resource if none exists or replace the current one if it does. The key idea with PUT is that you are telling the server exactly what the resource should look like.

For example, imagine a user profile on a website. If you use PUT to update your profile, the server will replace the entire profile with the new data you provide. Every part of the profile will match exactly what you send, so if some details are missing, they will be overwritten with the new data.

---

## Example of a PUT Request

Here’s an example of a PUT request using the Fetch API to update user data:

```js
const updatedProfile = {
  username: 'john_doe_updated',
  email: 'john_updated@example.com',
  age: 30
};

fetch('https://example.com/users/123', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatedProfile)
})
.then(response => response.json())
.then(data => console.log('Updated:', data))
.catch(error => console.error('Error:', error));
```

In this example, the PUT request updates the user profile with new data. The profile will be replaced with `username`, `email`, and `age` values. If any data is missing, such as `phoneNumber`, it will be removed from the profile.

---

## When to Use PUT

PUT is mainly used when you want to update or replace a resource with specific, complete data. Here are some common situations where PUT is appropriate:

### 1. Updating a Resource

When you need to make changes to an existing resource, PUT is used to send a new version of the entire resource. For example, updating a blog post, product details, or user information would require sending a complete replacement of the resource using PUT.

::: info Example

```js
        const updatedPost = {
          title: 'New Title for My Blog',
          content: 'Updated blog content here...',
          author: 'John Doe'
        };
    
        fetch('https://example.com/blog/45', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedPost)
        });
```

:::

### 2. Creating a Resource if None Exists

If you send a PUT request to a specific URL that doesn't have a resource yet, the server will create one using the data you provide. This is useful when you're working with resources that need to be fully defined upfront.

::: info Example of creating a product if it doesn’t exist

```js
const newProduct = {
  id: 101,
  name: 'New Sneakers',
  price: 59.99,
  category: 'Footwear'
};

fetch('https://example.com/products/101', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newProduct)
});
```

:::

### 3. Working with APIs

When interacting with APIs, PUT is often used when you need to make updates to a resource like a user profile, product details, or any other structured data. For example, a to-do list app might allow you to use PUT to update an existing task with new information.

::: info Example of updating a task

```js
const updatedTask = {
  title: 'Updated Task Title',
  completed: true
};

fetch('https://example.com/tasks/67', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatedTask)
});
```

:::

## PUT vs. POST: Key Differences

Though both PUT and POST can send data to a server, they have different purposes and behaviors:

### Purpose:

- **PUT**: Primarily used for updating or replacing an existing resource. If the resource doesn’t exist, PUT can also create it.
- **POST**: Mainly used to create new resources or submit data that needs to be processed. POST doesn’t replace existing resources but adds new ones.

### Data Handling:

- **PUT**: Replaces the entire resource with the new data. If a part of the resource is missing in the request, that part gets removed or replaced.
- **POST**: Adds or updates resources without replacing the entire thing. For example, when submitting a form, POST adds new data to the server without deleting what’s already there.

### Idempotence:

- **PUT**: Is idempotent, so sending the same PUT request multiple times will always result in the same outcome. No matter how many times you update a resource using PUT, the result will be the same.
- **POST**: Is not idempotent, so submitting the same POST request multiple times could create duplicate resources or have different results.

### Use Cases:

- **PUT**: Best used for updates and full replacements of resources. For instance, if you’re updating product details in an online store, PUT ensures that all the details are replaced with the new ones you send.
- **POST**: Suited for creating new entries or sending data that requires processing. For example, submitting an online order or filling out a contact form uses POST.