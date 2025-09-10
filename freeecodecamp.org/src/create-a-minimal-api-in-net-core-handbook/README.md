---
lang: en-US
title: "How to Create a Minimal API in .NET Core - A Step By Step Handbook"
description: "Article(s) > How to Create a Minimal API in .NET Core - A Step By Step Handbook"
icon: iconfont icon-csharp
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
      content: "Article(s) > How to Create a Minimal API in .NET Core - A Step By Step Handbook"
    - property: og:description
      content: "How to Create a Minimal API in .NET Core - A Step By Step Handbook"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-a-minimal-api-in-net-core-handbook.html
prev: /programming/cs/articles/README.md
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
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Create a Minimal API in .NET Core - A Step By Step Handbook"
  desc="Minimal APIs are an exciting feature introduced in .NET 6, designed to revolutionize how you create APIs. Imagine building robust APIs with minimal code and zero boilerplate—no more wrestling with controllers, routing, or middleware. That’s what mini..."
  url="https://freecodecamp.org/news/create-a-minimal-api-in-net-core-handbook"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png"/>

Minimal APIs are an exciting feature introduced in .NET 6, designed to revolutionize how you create APIs.

Imagine building robust APIs with minimal code and zero boilerplate—no more wrestling with controllers, routing, or middleware. That’s what minimal APIs allow you to do. The idea with these APIs is to streamline the development process, making it incredibly easy and efficient.

In this article, we'll dive into the world of minimal APIs in .NET 8 and guide you through creating a fully functional bookstore API. You'll learn how to get all books, retrieve a book by its ID, add new books, and even delete books. Let’s get started.

```component VPCard
{
  "title": "Introduction to Minimal APIs",
  "desc": "(1/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/introduction-to-minimal-apis.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Create a Minimal API",
  "desc": "(2/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-create-a-minimal-api.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "HTTP Methods in Controller-based and Minimal APIs",
  "desc": "(3/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/http-methods-in-controller-based-and-minimal-apis.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "Minimal API Project Files",
  "desc": "(4/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/minimal-api-project-files.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Create the Models",
  "desc": "(5/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-create-the-models.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Create the Database Context",
  "desc": "(6/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-create-the-database-context.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Create a Contract",
  "desc": "(7/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-create-a-contract.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Add Services",
  "desc": "(8/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-add-services.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Create Exceptions",
  "desc": "(9/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-create-exceptions.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Create the API Endpoints",
  "desc": "(10/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-create-the-api-endpoints.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Add Seed Data to the Database",
  "desc": "(11/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-add-seed-data-to-the-database.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Perform a Migration",
  "desc": "(12/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-perform-a-migration.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

```component VPCard
{
  "title": "How to Test the API Endpoints",
  "desc": "(13/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "link": "/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-test-the-api-endpoints.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

::: note Prerequisites

Before we get going, make sure you have the following prerequisites installed on your machine:

- [<FontIcon icon="fa-brands fa-microsoft"/>.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [<FontIcon icon="iconfont icon-vscode"/>Visual Studio Code](https://code.visualstudio.com/download) or any other code editor of your choice
- [<FontIcon icon="iconfont icon-vscode"/>C# Dev Kit](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp) for Visual Studio Code

:::

Alternatively, you can use Visual Studio 2022, which comes with built-in support for .NET 8. But in this article, we'll be using Visual Studio Code. It’s lightweight, easy to use, and cross-platform.

We’ll use Swagger UI to test our API. Swagger UI is a powerful tool that allows you to interact with your API directly from your browser. It provides a user-friendly interface to test your API endpoints, making it easier to test and debug your API.

When you create a new project, it will automatically install the necessary packages and configure the project to use Swagger UI. .NET 8 includes Swagger UI by default, so whether you create your application in Visual Studio or with .NET, Swagger UI will be configured for you.

Run your application, and the Swagger UI will automatically open in your browser - but since we are using VS Code, we need to click on the port number on our terminal.

You can find the source code for this project on [GitHub (<FontIcon icon="iconfont icon-github"/>`Clifftech123/bookapi-minimal`)](https://github.com/Clifftech123/bookapi-minimal).

<SiteInfo
  name="Clifftech123/bookapi-minimal"
  desc="Creating minimal API using ASP.NET Core 8.0."
  url="https://github.com/Clifftech123/bookapi-minimal/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e7c18458522fcb784f03e52342d6a77ffec4da0fc63bea89cd3ba6be9d73c983/Clifftech123/bookapi-minimal"/>

---

## Conclusion

This handbook explored how to create a minimal API in ASP.NET Core with .NET 8. We built a comprehensive book API that supports CRUD operations, implemented custom exceptions, defined and registered API endpoints, and enabled Swagger documentation for easy testing.

Following this tutorial, you have gained a solid foundation for building minimal APIs with ASP.NET Core. You can now apply this knowledge and create robust APIs for various domains and industries.

I hope you found this tutorial both helpful and informative. Thank you for reading!

Feel free to connect with me on social media:

- [X (<FontIcon icon="fa-brands fa-x-twitter"/>`Clifftech_Dev`)](https://x.com/Clifftech_Dev)
- [LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`isaiah-clifford-opoku`)](https://linkedin.com/in/isaiah-clifford-opoku/)
- [GitHub (<FontIcon icon="iconfont icon-github"/>`Clifftech123`)](https://github.com/Clifftech123)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a Minimal API in .NET Core - A Step By Step Handbook",
  "desc": "Minimal APIs are an exciting feature introduced in .NET 6, designed to revolutionize how you create APIs. Imagine building robust APIs with minimal code and zero boilerplate—no more wrestling with controllers, routing, or middleware. That’s what mini...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-a-minimal-api-in-net-core-handbook.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
