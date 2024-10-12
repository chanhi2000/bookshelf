---
lang: ko-KR
title: "DELETE Method"
description: "Article(s) > (5/9) Learn HTTP Methods like GET, POST, and DELETE – a Handbook with Code Examples"
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
      content: "Article(s) > (5/9) Learn HTTP Methods like GET, POST, and DELETE – a Handbook with Code Examples"
    - property: og:description
      content: "DELETE Method"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/delete-method.html
date: 2024-10-02
isOriginal: false
author: Ashutosh Krishna
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Learn HTTP Methods like GET, POST, and DELETE – a Handbook with Code Examples",
  "desc": "When you interact with websites or apps, a lot happens behind the scenes. A key part of this process is how your browser or app talks to a server. HTTPS methods define what action needs to happen – it could be fetching data, sending information, or m...",
  "link": "/freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn HTTP Methods like GET, POST, and DELETE – a Handbook with Code Examples"
  desc="When you interact with websites or apps, a lot happens behind the scenes. A key part of this process is how your browser or app talks to a server. HTTPS methods define what action needs to happen – it could be fetching data, sending information, or m..."
  url="https://freecodecamp.org/news/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png"/>

The DELETE method is used to remove a resource from the server. When a DELETE request is made, the server deletes the specified resource, meaning it’s no longer accessible or available. This method is used for tasks like deleting a user account, removing a product from an online store, or clearing old data from a database.

Unlike GET or POST, DELETE doesn’t require sending a body in the request—just the URL of the resource you want to remove is enough. For example, to delete a specific blog post, a DELETE request is sent to the URL of that post, and the server takes care of removing it.

---

## How DELETE Works

To delete a resource, you typically only need to provide the URL of the resource you want to remove. Unlike POST or PUT requests, DELETE requests generally don’t require a body.

::: note Example

If you want to delete a specific blog post, you can send a DELETE request to its URL:

```js
fetch('https://example.com/posts/123', {
  method: 'DELETE'
})
.then(response => response.json())
.then(data => console.log('Resource deleted:', data))
.catch(error => console.error('Error:', error));
```

:::

This tells the server to remove the blog post with ID `123`.

---

## Safely Using DELETE

DELETE requests can have a significant impact, so it’s important to use them carefully to avoid accidentally removing valuable data. Below are some key considerations for safely handling DELETE requests:

### Permanent Action

Once a DELETE request is processed, the resource is typically gone. In some cases, systems might implement "soft delete" functionality, where the resource is hidden but not completely removed. However, most use a "hard delete," where the resource is fully erased. Soft deletes can be useful for recovery purposes, allowing data to be restored if needed.

### Authentication

DELETE requests should be restricted to authorized users. Before performing a DELETE action, the server should validate that the user has permission to delete the resource. For example, only the owner of a user account should be able to delete it, not another user.

### Confirmation

Many applications prompt users to confirm their intention before processing a DELETE action. This extra step ensures users don't accidentally delete important data, especially for irreversible actions like account deletion.

::: info Example of a Confirmation Step:

```js
if (confirm("Are you sure you want to delete this post?")) {
  fetch('https://example.com/posts/123', {
    method: 'DELETE'
  })
  .then(response => console.log('Post deleted'))
  .catch(error => console.error('Error:', error));
}
```

:::

### Reversibility (Soft Delete)

For important data, it’s often useful to implement a **soft delete**, which doesn’t completely remove the data but marks it as deleted in the database. This allows the data to be restored later if needed. For example, many email systems keep deleted messages in a "Trash" folder until they are permanently removed.

---

## Best Practices for Handling DELETE Requests

### 1. Require Authentication

Only authenticated users should be able to perform DELETE actions. This prevents unauthorized users from deleting resources they don't own. For example, users should only be allowed to delete their own data, not that of others.

::: info Example

In a content management system (CMS), ensure that only the author of a post or an admin can delete it.

:::

### 2. Use Confirmation Steps

For critical actions, confirm the user’s intent before proceeding. This is especially important for actions that cannot be undone, such as deleting an account or permanently removing a file.

::: info Example

Show a prompt that says, "Are you sure you want to delete your account? This action cannot be undone."

:::

### 3. Log Deletions

Keep a record of DELETE requests, including who initiated the request and when it occurred. Logging is important for accountability, troubleshooting, and data recovery in case of accidental deletions.

::: info Example

In an e-commerce system, log details when a product is removed from the catalog, such as the user who initiated the request and the time of deletion.

:::

### 4. Soft Delete for Critical Data

Implement a soft delete mechanism for data that may need to be restored later. This is particularly useful in scenarios like user accounts, where a user might want to recover their data after deletion.

::: info Example

When a user "deletes" their account, it’s marked as inactive or hidden, rather than fully erased, allowing the user to recover it later.

:::

### 5. Handle Errors Gracefully

If a DELETE request fails, the server should return an appropriate error message. For example, if the resource doesn’t exist or the user isn’t authorized to delete it, the server should respond with a message like "Resource not found" or "Unauthorized action."

::: info Example

A DELETE request for a non-existent user could return a `404 Not Found` response.

:::

### 6. Double-Check URL Targeting

Before sending a DELETE request, ensure the URL points to the correct resource. Accidentally targeting the wrong resource could result in unintended data loss.

::: info Example

If you are managing a to-do list and want to delete a single task, ensure the URL points specifically to that task and not to the entire list.

:::

### 7. Communicate Results to the User

After a successful DELETE request, inform the user that the resource has been deleted. This can be done through a message or notification confirming the action.

::: info Example

Show a message like "Item successfully deleted" after a product or post has been removed from the system.

:::

---

## DELETE Response

Typically, a successful DELETE request returns one of the following status codes:

- **200 OK**: Indicates that the deletion was successful and includes a response body (for example, a message confirming the deletion).
- **204 No Content**: The request was successful, but no content is returned in the response body. This is common when the resource is deleted, and there’s nothing to send back.
- **404 Not Found**: Indicates that the resource to be deleted does not exist.

---

## Example of a DELETE Request Response

If the DELETE request is successful and the resource is removed, a server might respond with a `204 No Content` status:

```
HTTP/1.1 204 No Content
```

This response tells the client that the resource was successfully deleted but doesn’t return any additional data.