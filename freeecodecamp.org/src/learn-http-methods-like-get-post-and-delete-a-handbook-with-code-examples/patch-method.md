---
lang: en-US
title: "PATCH Method"
description: "Article(s) > (4/9) Learn HTTP Methods like GET, POST, and DELETE - a Handbook with Code Examples"
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
      content: "Article(s) > (4/9) Learn HTTP Methods like GET, POST, and DELETE - a Handbook with Code Examples"
    - property: og:description
      content: "PATCH Method"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/patch-method.html
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
  url="https://freecodecamp.org/news/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/#heading-patch-method"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1727862097228/24433377-ebb8-49b5-b0ee-5736f629399d.png"/>

The **PATCH** method is used to make partial updates to a resource on the server. Unlike the PUT method, which replaces the entire resource, PATCH allows you to update specific parts of a resource without sending the complete data again. This makes PATCH ideal for scenarios where you only want to tweak certain details without affecting other parts of the resource.

For example, if you have a user profile and want to update only the phone number, PATCH enables you to send just the new phone number while leaving the rest of the profile unchanged. This approach is more efficient and reduces the risk of unintended data loss.

---

## Partial Updates with PATCH

PATCH is designed for making targeted changes to a resource. Here’s how it works:

- **Targeted Changes**: When you use PATCH, you specify only the fields you want to update. For instance, if a user updates their email address, you send a PATCH request containing just the new email, and everything else stays the same on the server.
- **Efficiency**: PATCH is more efficient than PUT because it allows you to send only the data that’s being changed. This can reduce bandwidth usage, especially when updating large resources where only a small part needs modification.
- **Does Not Overwrite**: Unlike PUT, PATCH does not replace the entire resource. It only updates the fields that are provided in the request, ensuring that other fields remain intact.

---

## Example of a PATCH Request

Here’s a basic example of how you might use the PATCH method to update a specific field, such as changing a user's email address:

```js
const updatedEmail = {
  email: 'new_email@example.com'
};

fetch('https://example.com/users/123', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updatedEmail)
})
.then(response => response.json())
.then(data => console.log('Email updated:', data))
.catch(error => console.error('Error:', error));
```

In this example, only the `email` field is being updated. The rest of the user profile, such as the username or address, remains unchanged.

---

## When to Use PATCH Instead of PUT

There are specific scenarios where PATCH is more appropriate than PUT:

### 1. Updating Specific Fields

If you need to update only a part of a resource, like changing a user’s email, adding a tag to a blog post, or modifying a single attribute, PATCH is a better choice. It allows you to send only the fields that need updating, making the request more efficient.

::: info Example

Updating a user's phone number.

```js
        const updatedPhone = { phoneNumber: '123-456-7890' };
    
        fetch('https://example.com/users/123', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPhone)
        });
```

:::

### 2. Avoiding Unintended Data Loss

When using PUT, leaving out any fields could result in the server removing or overwriting those fields. PATCH avoids this risk by only updating the specific fields provided, ensuring no accidental data loss.

::: info Example

If you only want to update a user’s username but don’t want to overwrite other fields like their address or preferences, PATCH ensures only the username is updated.

:::

### 3. Performance Considerations

PATCH is more efficient for large resources. For instance, if you're managing a database with extensive records and need to change a small portion, PATCH reduces the data sent to the server, improving performance and speeding up the process.

::: info Example

Updating the status of a large order without modifying the entire order details.

```js
const updatedStatus = { status: 'shipped' };

fetch('https://example.com/orders/987', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedStatus)
});
```

:::

### 4. Frequent Updates

In applications where data changes frequently, PATCH makes it easier to update specific parts of a resource without affecting the entire structure. For instance, in an e-commerce platform, users might regularly update their shipping address or payment method, and PATCH can handle those frequent changes without requiring the entire user profile to be re-sent.

::: info Example

Updating the delivery address for an order.

```js
const updatedAddress = {
  shippingAddress: '123 New Street, New City, Country'
};

fetch('https://example.com/orders/987', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updatedAddress)
});
```

:::

---

## Key Differences Between PUT and PATCH

Here’s a quick comparison of PATCH and PUT to clarify when each method is more appropriate:

| Feature | PUT | PATCH |
| :--- | :--- | :--- |
| **Purpose** | Replaces the entire resource. | Partially updates a resource. | 
| **Data Handling** | Requires the entire resource to be sent. | Sends only the fields that need to be updated. |
| **Efficiency** | Less efficient for large resources. | More efficient for small, specific updates. |
| **Idempotence** | Idempotent (same result if repeated). | Not necessarily idempotent (depends on the request). |
| **Risk of Data Loss** | Can overwrite fields if data is missing. | Does not overwrite existing fields unless specified. |

**PATCH** is particularly valuable when you want to make partial updates, avoid overwriting other data, and improve the efficiency of your requests.