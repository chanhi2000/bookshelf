---
lang: en-US
title: "How to Create a Contract"
description: Article(s) > (7/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook
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
      content: Article(s) > (7/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook
    - property: og:description
      content: "How to Create a Contract"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/create-a-minimal-api-in-net-core-handbook/how-to-create-a-contract.html
date: 2024-12-03
isOriginal: false
author:
  - name: Isaiah Clifford Opoku
    url: https://freecodecamp.org/news/author/Clifftech/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "desc": "Minimal APIs are an exciting feature introduced in .NET 6, designed to revolutionize how you create APIs. Imagine building robust APIs with minimal code and zero boilerplate—no more wrestling with controllers, routing, or middleware. That’s what mini...",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a Minimal API in .NET Core - A Step By Step Handbook"
  desc="Minimal APIs are an exciting feature introduced in .NET 6, designed to revolutionize how you create APIs. Imagine building robust APIs with minimal code and zero boilerplate—no more wrestling with controllers, routing, or middleware. That’s what mini..."
  url="https://freecodecamp.org/news/create-a-minimal-api-in-net-core-handbook#heading-how-to-create-a-contract"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png"/>

Contracts are Data Transfer Objects (DTOs) that define the structure of the data exchanged between the client and the server. In our application, we will create contracts to represent the data sent and received by our API endpoints.

Here are the contracts we are going to create:

- CreateBookRequest: This represents the data sent when creating a new book.
- UpdateBookRequest: tHI Represents the data sent when updating an existing book.
- BookResponse: Represents the data returned when retrieving a book.
- ErrorResponse: Represents the error response returned when an exception occurs.
- ApiResponse: Represents the response returned by the API.

In the <FontIcon icon="fas fa-foler-open"/>`Contracts` folder, create a new file named `CreateBookRequest` and add the following code:

```cs title="Contracts/CreateBookRequest.cs"
namespace bookapi_minimal.Contracts
{
    public record CreateBookRequest
    { 
        public string Title { get; init; }
        public string Author { get; init; }
        public string Description { get; init; }
        public string Category { get; init; }
        public string Language { get; init; }
        public int TotalPages { get; init; }
    }
}
```

In the <FontIcon icon="fas fa-foler-open"/>`Contracts` folder, create a new file named `UpdateBookRequest` and add the following code:

```cs title="Contracts/UpdateBookRequest.cs"
namespace bookapi_minimal.Contracts
{
    public record UpdateBookRequest
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Language { get; set; }
        public int TotalPages { get; set; }
    }
}
```

In the <FontIcon icon="fas fa-foler-open"/>`Contracts` folder, create a new file named `BookResponse` and add the following code:

```cs title="Contracts/BookResponse.cs"
namespace bookapi_minimal.Contracts
{
    public record BookResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Language { get; set; }
        public int TotalPages { get; set; }
    }
}
```

In the <FontIcon icon="fas fa-foler-open"/>`Contracts` folder, create a new file named `ErrorResponse` and add the following code:

```cs


// Contracts/ErrorResponse.cs
namespace bookapi_minimal.Contracts
{
    public record ErrorResponse
    {
        public string Title { get; set; }
        public int StatusCode { get; set; }
        public string Message { get; set; }
    }
}
```

In the <FontIcon icon="fas fa-foler-open"/>`Contracts` folder, create a new file named `ApiResponse` and add the following code:

```cs title="Contracts/ApiResponse.cs"
namespace bookapi_minimal.Contracts
{
    public class ApiResponse<T>
    {
        public T Data { get; set; }
        public string Message { get; set; }

        public ApiResponse(T data, string message)
        {
            Data = data;
            Message = message;
        }
    }
}
```

These contracts help us define the structure of the data exchanged between the client and the server, making it easier to work with the data in our application.

In the next section, we will create services to implement the business logic of our application.
