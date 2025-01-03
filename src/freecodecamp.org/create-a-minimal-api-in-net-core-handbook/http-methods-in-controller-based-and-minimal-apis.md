---
lang: en-US
title: "HTTP Methods in Controller-based and Minimal APIs"
description: Article(s) > (3/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
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
      content: Article(s) > (3/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
    - property: og:description
      content: "HTTP Methods in Controller-based and Minimal APIs"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/http-methods-in-controller-based-and-minimal-apis.html
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
  url="https://freecodecamp.org/news/create-a-minimal-api-in-net-core-handbook#heading-http-methods-in-controller-based-and-minimal-apis"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png"/>


In a Controller-based approach, which is the traditional way of creating web APIs, you need to create a controller class and define methods for each HTTP method. For example:

- To create a `GET` method, you use the `[HttpGet]` attribute.
- To create a `POST` method, you use the `[HttpPost]` attribute.
- To create a `PUT` method, you use the `[HttpPut]` attribute.
- To create a `DELETE` method, you use the `[HttpDelete]` attribute.

This is how endpoints are created in a Controller-based approach.

In contrast, Minimal APIs use methods like `app.MapGet`, `app.MapPost`, `app.MapPut`, and `app.MapDelete` to create endpoints. This is the main difference between the two approaches: Controller-based APIs use attributes to define endpoints, while Minimal APIs use methods.

Now that you understand how to handle HTTP requests in both Controller-based and Minimal APIs, let's create our project folder structure.

Before we create our project folder structure, let's first run what we have. As we learned earlier, when you create a project with either Visual Studio or .NET CLI, it comes with a default WeatherForecast project which we can run and see on the UI. Let's run it to ensure everything works before we go on to create our project folder.

Run this command:

```sh
dotnet run
#
# info: Microsoft.Hosting.Lifetime[14]
#       Now listening on: http://localhost:5228
# info: Microsoft.Hosting.Lifetime[0]
#       Application started. Press Ctrl+C to shut down.
# info: Microsoft.Hosting.Lifetime[0]
#       Hosting environment: Development
# info: Microsoft.Hosting.Lifetime[0]
#       Content root path: D:\Devolopemnt\Dotnet\bookapi-minimal
```

This means the application is running and listening on `http://localhost:5228`. As I mentioned above, since we are using the `dotnet CLI` and Visual Studio Code, the application will not automatically open the browser for us. We need to do this manually.

Open your browser and navigate to `http://localhost:5228/swagger/index.html` to see the default response from the API.

You should see something like this:

![Swagger UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1732623894640/b882a1ee-3957-4958-8f59-20b44fe7fb7d.png)

Now the next thing for us to do is find a way to structure our project and create the necessary files and folders to get us started.