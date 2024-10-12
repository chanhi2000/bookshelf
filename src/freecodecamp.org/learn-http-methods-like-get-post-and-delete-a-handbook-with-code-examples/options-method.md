---
lang: ko-KR
title: "OPTIONS Method"
description: "Article(s) > (7/9) Learn HTTP Methods like GET, POST, and DELETE – a Handbook with Code Examples"
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
      content: "Article(s) > (7/9) Learn HTTP Methods like GET, POST, and DELETE – a Handbook with Code Examples"
    - property: og:description
      content: "OPTIONS Method"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-http-methods-like-get-post-and-delete-a-handbook-with-code-examples/options-method.html
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

The OPTIONS method is used to find out what actions are allowed on a specific resource. It allows a client (like a browser or an API) to ask the server, "What operations can I perform on this resource?" In response, the server lists the HTTP methods it supports for that resource, such as GET, POST, PUT, DELETE, and so on.

OPTIONS doesn’t perform any operation on the resource itself. Instead, it provides information about what the client can do. This makes it useful when you want to check what actions are allowed before actually making a request that changes or retrieves data.

For example, if you’re working with an API and want to see if it supports a DELETE method on a particular endpoint, you can send an OPTIONS request to get that information without affecting the resource.

---

## Retrieving Supported Methods

1. **Sending an OPTIONS Request**: The client sends an OPTIONS request to a server, typically targeting a specific URL. This request serves as an inquiry about what actions are permitted on the resource at that endpoint.
2. **Server’s Response**: The server responds with an `Allow` header that lists the available HTTP methods for the resource. For example, it might return `Allow: GET, POST, DELETE`, meaning those methods can be used.
3. **Testing for Methods**: If you're unsure whether a particular method (like PATCH or DELETE) is supported by a server, you can send an OPTIONS request first to check. This avoids attempting methods that the server doesn’t support, which could result in errors.

::: info Example:

```
OPTIONS /api/resource HTTP/1.1
Host: example.com
```

Server Response:

```
HTTP/1.1 200 OK
Allow: GET, POST, DELETE
```

:::

---

## How OPTIONS is Used in Cross-Origin Resource Sharing (CORS)

One of the most common uses of the OPTIONS method is in handling **Cross-Origin Resource Sharing (CORS)**. CORS is a security feature that ensures resources on one domain aren’t accessed improperly by web pages from another domain.

### CORS and Preflight Requests

When a browser needs to make a cross-origin request (for example, a request from `domainA.com` to `api.domainB.com`), the browser first sends an **OPTIONS request**, known as a **preflight request**, to the target server. The preflight request checks whether the actual request is allowed under the server’s CORS policy.

#### 1. Preflight Request

The browser sends an OPTIONS request before the actual request (such as a POST or PUT). This request asks the server which methods are allowed, which domains can access the resource, and whether specific headers or credentials are permitted.

#### 2. Server’s Response

The server responds with CORS headers, such as `Access-Control-Allow-Methods`, `Access-Control-Allow-Origin`, and `Access-Control-Allow-Headers`. This tells the browser whether the request can proceed and what methods or domains are allowed.

```
Example Response:

    HTTP/1.1 204 No Content
    Access-Control-Allow-Origin: https://domainA.com
    Access-Control-Allow-Methods: GET, POST
    Access-Control-Allow-Headers: Content-Type
```

#### 3. Ensuring Security

CORS and the preflight OPTIONS request ensure that cross-origin requests are only allowed when the server permits it. Without this security step, websites could make unauthorized requests to other domains.

#### 4. Handling Complex Requests

If a request includes custom headers, uses HTTP methods other than simple ones like GET or POST, or sends credentials like cookies, the browser automatically sends an OPTIONS preflight request. If the server denies the request (that is, returns headers disallowing the action), the browser blocks the request.

### Simplified Workflow:

- **Browser**: "Can I make this request to `api.domainB.com`?"
- **Server**: "Yes, you can use `GET` and `POST`, but only from `domainA.com` and with these headers."
- **Browser**: Proceeds with the actual request if the response permits.

---

## Use Cases for the OPTIONS Method

- **Discovering Available Methods**: Useful for developers to check which HTTP methods a resource supports before performing an operation.
- **CORS Preflight**: Critical in web security to ensure that cross-origin requests are properly authorized.
- **Improving API Efficiency**: APIs can expose the supported methods for a resource via OPTIONS, making it easier for clients to understand what operations can be performed.

The OPTIONS method is thus essential in web applications for managing request permissions and improving security, particularly in cross-domain scenarios.