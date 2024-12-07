---
lang: en-US
title: "How to Test the API Endpoints"
description: Article(s) > (13/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - cs
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: Article(s) > (13/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
    - property: og:description
      content: "How to Test the API Endpoints"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-test-the-api-endpoints.html
date: 2024-12-03
isOriginal: false
author: Isaiah Clifford Opoku
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Create a Minimal API in .NET Core – A Step By Step Handbook",
  "desc": "Minimal APIs are an exciting feature introduced in .NET 6, designed to revolutionize how you create APIs. Imagine building robust APIs with minimal code and zero boilerplate—no more wrestling with controllers, routing, or middleware. That’s what mini...",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a Minimal API in .NET Core – A Step By Step Handbook"
  desc="Minimal APIs are an exciting feature introduced in .NET 6, designed to revolutionize how you create APIs. Imagine building robust APIs with minimal code and zero boilerplate—no more wrestling with controllers, routing, or middleware. That’s what mini..."
  url="https://freecodecamp.org/news/create-a-minimal-api-in-net-core-handbook#heading-how-to-test-the-api-endpoints"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png"/>

Now we can test our endpoints using Swagger. To do this, run the application by executing the following command in the terminal:

```sh

dotnet run
```

This will run our application. You can open your browser and navigate to `https://localhost:5001/swagger/index.html` to access the Swagger documentation. You should see a list of API endpoints, request and response models, and the ability to test the endpoints directly from the browser.

If your port number is different from `5001`, don't worry – it will still work. The port might change depending on the type of machine you're using, but it will still achieve the same result.

---

## How to Test the `Get All Books` Endpoint

To test the `Get All Books` endpoint, follow these steps:

1. In the Swagger documentation, click on the `GET /api/v1/books` endpoint.
2. Click the `Try it out` button.
3. Click the `Execute` button.

This will send a request to the API to retrieve all the books in the database.

You should see the response from the API, which will include the list of books that were seeded in the database.

The image below shows the response from the API:

![Get All Books Endpoint Swagger UI ](https://cdn.hashnode.com/res/hashnode/image/upload/v1732624950148/b497bc8e-727a-43c9-910f-755b3b6f208b.png)

---

## How to Test the `Get Book by ID` Endpoint

To test the `Get Book by ID` endpoint, follow these steps:

1. In the Swagger documentation, click on the `GET /api/v1/books/{id}` endpoint.
2. Enter the ID of a book in the `id` field. You can use one of the book IDs that was seeded in the database.
3. Click the `Try it out` button.

This will send a request to the API to retrieve the book with the specified ID. You should see the response from the API, which will include the book with the specified ID.

The image below shows the response from the API:

![Get Book By ID Endpoint Swagger UI ](https://cdn.hashnode.com/res/hashnode/image/upload/v1732625042363/fe356453-afa6-4a78-b963-d0befff7bd63.png)

---

## How to Test the `Add Book` Endpoint

To test the `Add Book` endpoint, follow these steps:

1. In the Swagger documentation, click on the `POST /api/v1/books` endpoint.
2. Click the `Try it out` button.
3. Enter the book details in the request body.
4. Click the `Execute` button.

This will send a request to the API to add a new book to the database.

You should see the response from the API, which will include the newly created book.

The image below shows the response from the API:

![Add Book Endpoint Swagger UI ](https://cdn.hashnode.com/res/hashnode/image/upload/v1732625138350/faa54e57-e560-49ac-976a-b074e8eebb13.png)

---

## How to Test the `Update Book` Endpoint

To test the `Update Book` endpoint, follow these steps:

1. In the Swagger documentation, click on the `PUT /api/v1/books/{id}` endpoint.
2. Enter the ID of a book in the `id` field. You can use the id of one of the books that we just added.
3. Click the `Try it out` button.

This will send a request to the API to update the book with the specified ID.

You should see the response from the API, which will include the updated book.

The image below shows the response from the API:

![Update Book Endpoint Swagger UI ](https://cdn.hashnode.com/res/hashnode/image/upload/v1732625300781/3de90d6c-92ca-40cb-a54e-2236ec921d86.png)

---

## How to Test the `Delete Book` Endpoint

To test the `Delete Book` endpoint, follow these steps:

1. In the Swagger documentation, click on the `DELETE /api/v1/books/{id}` endpoint.
2. Enter the ID of a book in the `id` field. You can use any of the ids from the books that we just added or the seeded data.
3. Click the `Try it out` button.

This will send a request to the API to delete the book with the specified ID.

The image below shows the response from the API:

![Delete Book Endpoint Swagger UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1732625225432/3b066f4c-2bf2-4f0c-a104-a94dbbad1706.png)

Congratulations! You have implemented all the CRUD operations for books and tested the API endpoints using Swagger, verifying that they work as expected. You can now build on this foundation to add more features and functionality to your API.
