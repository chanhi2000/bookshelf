---
lang: en-US
title: "How to Create the API Endpoints"
description: Article(s) > (10/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook
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
      content: Article(s) > (10/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook
    - property: og:description
      content: "How to Create the API Endpoints"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/create-a-minimal-api-in-net-core-handbook/how-to-create-the-api-endpoints.html
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
  url="https://freecodecamp.org/news/create-a-minimal-api-in-net-core-handbook#heading-how-to-create-the-api-endpoints"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png"/>

In the context of minimal APIs in ASP.NET Core, there are many ways to set up your endpoints.

You can define them directly in your <VPIcon icon="iconfont icon-csharp"/>`Program.cs` file. But as your project grows and you need to add more endpoints or functionality, it’s helpful to organize your code better. One way to achieve this is by creating a separate class to handle all the endpoints.

As we’ve discussed above, minimal APIs don’t use controllers or views like traditional ASP.NET Core applications. Instead, they use methods such as `MapGet`, `MapPost`, `MapPut`, and `MapDelete` to define HTTP methods and routes for API endpoints.

To get started, navigate to the <VPIcon icon="fas fa-folder-open"/>`Endpoints` folder and create a new file named <VPIcon icon="iconfont icon-csharp"/>`BookEndpoints.cs`. Add the following code to the file:

```cs title="Endpoints/BookEndpoints.cs"
namespace bookapi_minimal.Endpoints
{
     public static class BookEndPoint
     {
        public static IEndpointRouteBuilder MapBookEndPoint(this IEndpointRouteBuilder app)
        {
            return app;
        }
    }
}
```

The `BookEndpoints` class contains a `MapBookEndPoint` method that returns an `IEndpointRouteBuilder` object. The `IEndpointRouteBuilder` object is used to define the HTTP methods and routes for the API endpoints. In the next sections, we will define the API endpoints for `creating`, `reading`, `updating`, and `deleting` books.

---

## How to Create the `AddBookAsync` Books Endpoint

In this section, we will create the `AddBookAsync` endpoint. This endpoint will accept a `Book` object as a JSON payload and add it to the database. We will use the `MapPost` method to define the HTTP method and route for this endpoint.

Add the following code to the `BookEndpoints` class:

```cs title="Endpoints/BookEndpoints.cs"
//...

    // Endpoint to add a new book
    app.MapPost("/books", async (CreateBookRequest createBookRequest, IBookService bookService) =>
    {
        var result = await bookService.AddBookAsync(createBookRequest);
        return Results.Created($"/books/{result.Id}", result); 
    });


//...
```

- **Route Definition**: The MapPost method defines the route for the endpoint as `/books`.
- **Request Model**: The endpoint accepts an `CreateBookRequest` object as a JSON payload. The `CreateBookRequest` object contains the data required to create a new book.
- **Response Model**: The endpoint returns a `Book` object as a JSON payload. The `Book` object contains the data for the newly created book.
- **Return Value**: The endpoint returns a `Created` result. The `Created` result contains the location of the newly created book and the `Book` object.

---

## How to Create the `GetBookAsync` Book Endpoint

In this section, we will create the `GetBookAsync` endpoint. This endpoint will accept a book ID as a query parameter and return the book with the specified ID. We will use the `MapGet` method to define the HTTP method and route for this endpoint.

Add the following code to the `BookEndpoints` class:

```cs title="Endpoints/BookEndpoints.cs"
// ...

    // Endpoint to get all books
    app.MapGet("/books", async (IBookService bookService) =>
    {
        var result = await bookService.GetBooksAsync();
        return Results.Ok(result);
    });


//...
```

- **Route Definition**: The MapGet method defines the route for the endpoint as `/books`.
- **Request Model**: The endpoint accepts a `Book` object as a JSON payload. The `Book` object contains the data required to create a new book.
- **Response Model**: The endpoint returns a `Book` object as a JSON payload. The `Book` object contains the data for the newly created book.
- **Return Value**: The endpoint returns an `Ok` result. The `Ok` result contains the `Book` object.

---

## How to Create the `GetBookByIdAsync` Book Endpoint

In this section, we will create the `GetBookByIdAsync` endpoint. This endpoint will accept a book ID as a route parameter and return the book with the specified ID. We will use the `MapGet` method to define the HTTP method and route for this endpoint.

Add the following code to the `BookEndpoints` class:

```cs title="Endpoints/BookEndpoints.cs"
//...
    // Endpoint to get a book by ID
    app.MapGet("/books/{id:guid}", async (Guid id, IBookService bookService) =>
    {
        var result = await bookService.GetBookByIdAsync(id);
        return result != null ? Results.Ok(result) : Results.NotFound();
    });

//...
```

- **Route Definition**: The MapGet method defines the route for the endpoint as `/books/{id:guid}`. The `{id:guid}` parameter specifies that the `id` parameter should be a GUID.
- **Request Model**: The endpoint accepts a `Book` object as a JSON payload. The `Book` object contains the data required to create a new book.
- **Response Model**: The endpoint returns a `Book` object as a JSON payload. The `Book` object contains the data for the newly created book.
- **Return Value**: The endpoint returns an `Ok` result if the book is found. The `NotFound` result is returned if the book is not found.

---

## How to Create the `UpdateBookAsync` Book Endpoint

In this section, we will create the `UpdateBookAsync` endpoint. This endpoint will accept a book ID as a route parameter and an `Book` object as a JSON payload and update the book with the specified ID. We will use the `MapPut` method to define the HTTP method and route for this endpoint.

Add the following code to the `BookEndpoints` class:

```cs title="Endpoints/BookEndpoints.cs"
//...

     // Endpoint to update a book by ID
    app.MapPut("/books/{id:guid}", async (Guid id, UpdateBookRequest updateBookRequest, IBookService bookService) =>
    {
        var result = await bookService.UpdateBookAsync(id, updateBookRequest);
        return result != null ? Results.Ok(result) : Results.NotFound();
    });

//...
```

- **Route Definition**: The MapPut method defines the route for the endpoint as `/books/{id:guid}`. The `{id:guid}` parameter specifies that the `id` parameter should be a GUID.
- **Request Model**: The endpoint accepts a `Book` object as a JSON payload. The `Book` object contains the data required to create a new book.
- **Response Model**: The endpoint returns a `Book` object as a JSON payload. The `Book` object contains the data for the newly created book.
- **Return Value**: The endpoint returns an `Ok` result if the book is found. The `NotFound` result is returned if the book is not found.

---

## How to Create the `DeleteBookAsync` Book Endpoint

In this section, we will create the `DeleteBookAsync` endpoint. This endpoint will accept a book ID as a route parameter and delete the book with the specified ID. We will use the `MapDelete` method to define the HTTP method and route for this endpoint.

Add the following code to the `BookEndpoints` class:

```cs title="Endpoints/BookEndpoints.cs"
//...
    // Endpoint to delete a book by ID
    app.MapDelete("/books/{id:guid}", async (Guid id, IBookService bookService) =>
    {
        var result = await bookService.DeleteBookAsync(id);
        return result ? Results.NoContent() : Results.NotFound();
    });

//...
```

- **Route Definition**: The MapDelete method defines the route for the endpoint as `/books/{id:guid}`. The `{id:guid}` parameter specifies that the `id` parameter should be a GUID.
- **Request Model**: The endpoint accepts a `Book` object as a JSON payload. The `Book` object contains the data required to create a new book.
- **Response Model**: The endpoint returns a `Book` object as a JSON payload. The `Book` object contains the data for the newly created book.
- **Return Value**: The endpoint returns a `NoContent` result if the book is deleted successfully. The `NotFound` result is returned if the book is not found.

Now we have defined all the methods for the book endpoints. So your endpoint class should look like this:

```cs :collapsed-lines title="Endpoints/BookEndpoints.cs"
using bookapi_minimal.Contracts;
using bookapi_minimal.Interfaces;

namespace bookapi_minimal.Endpoints
{
     public static class BookEndPoint
    {
        public static IEndpointRouteBuilder MapBookEndPoint(this IEndpointRouteBuilder app)
        {
            // Define the endpoints

            // Endpoint to add a new book
            app.MapPost("/books", async (CreateBookRequest createBookRequest, IBookService bookService) =>
            {
                var result = await bookService.AddBookAsync(createBookRequest);
                return Results.Created($"/books/{result.Id}", result); 
            });

            // Endpoint to get all books
            app.MapGet("/books", async (IBookService bookService) =>
            {
                var result = await bookService.GetBooksAsync();
                return Results.Ok(result);
            });

            // Endpoint to get a book by ID
            app.MapGet("/books/{id:guid}", async (Guid id, IBookService bookService) =>
            {
                var result = await bookService.GetBookByIdAsync(id);
                return result != null ? Results.Ok(result) : Results.NotFound();
            });


            // Endpoint to update a book by ID
            app.MapPut("/books/{id:guid}", async (Guid id, UpdateBookRequest updateBookRequest, IBookService bookService) =>
            {
                var result = await bookService.UpdateBookAsync(id, updateBookRequest);
                return result != null ? Results.Ok(result) : Results.NotFound();
            });

            // Endpoint to delete a book by ID
            app.MapDelete("/books/{id:guid}", async (Guid id, IBookService bookService) =>
            {
                var result = await bookService.DeleteBookAsync(id);
                return result ? Results.NoContent() : Results.NotFound();
            });

            return app;
        }
    }
}
```

Congratulations! You have created all the endpoints for the book API. The endpoints handle the CRUD operations for books and return the appropriate responses based on the request and data.

---

## How to Register the Endpoints

After defining the API endpoints for the book API, the next step is to register these endpoints in the <VPIcon icon="iconfont icon-csharp"/>`Program.cs` file. We will use the `MapBookEndpoints` method to register the book endpoints.

We should also clean up our <VPIcon icon="iconfont icon-csharp"/>`Program.cs` class to ensure it remains organized and maintainable.

```cs title="Program.cs"
using System.Reflection;
using bookapi_minimal.Endpoints;
using bookapi_minimal.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.AddApplicationServices();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c=>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Mimal API", Version = "v1", Description = "Showing how you can build minimal " +
        "api with .net" });

    // Set the comments path for the Swagger JSON and UI.
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);

});
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseExceptionHandler();


app.MapGroup("/api/v1/")
   .WithTags(" Book endpoints")
   .MapBookEndPoint();

app.Run();
```

Let's break down the key components of the <VPIcon icon="iconfont icon-csharp"/>`Program.cs` file:

- **AddApplicationServices**: This method registers the necessary services for the API. It is an extension method we created earlier to add services to the dependency injection container.
- **AddSwaggerGen**: This method registers the Swagger generator, which is used to create the Swagger documentation for the API. We specify the title, version, and description of the API in the Swagger document.
- **MapGroup**: This method groups the endpoints. It takes a path as a parameter and returns an `IEndpointRouteBuilder` object. We use the `WithTags` method to add tags to the endpoints and the `MapBookEndpoints` method to register the book endpoints.
- **Run**: This method starts the application.

To enable Swagger documentation, you need to add the `GenerateDocumentationFile` property to your `.csproj` file. In this example, the file is named `bookapi-minimal.csproj`, but the name may vary based on your project.

Add the following line to your `.csproj` file:

```xml title="bookapi-minimal.csproj"
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
</PropertyGroup>
```

By the end, <VPIcon icon="iconfont icon-code"/>`bookapi-minimal.csproj` should look like this:

```xml :collapsed-lines title="bookapi-minimal.csproj"
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
     <GenerateDocumentationFile>true</GenerateDocumentationFile>
    <RootNamespace>bookapi_minimal</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
   <PackageReference Include="FluentValidation.DependencyInjectionExtensions" Version="11.9.2" />
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="8.0.6" />
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.8" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.8">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
    <PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.8" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.8">
      <IncludeAssets>runtime; build; native; contentfiles; analyzers; buildtransitive</IncludeAssets>
      <PrivateAssets>all</PrivateAssets>
    </PackageReference>
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.4.0" />
  </ItemGroup>

</Project>
```

Now that we have registered the book endpoints in the <VPIcon icon="iconfont icon-csharp"/>`Program.cs` file, we can run the application and test the API endpoints using Swagger.

When you run the application, you should see the Swagger documentation at the following URL: `https://localhost:5001/swagger/index.html`. The Swagger documentation provides information about the API endpoints, request and response models, and allows you to test the endpoints directly from the browser. You should see something like this:

![Book API Endpoints Swagger UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1732624213627/e1e3b3d1-2ecb-486a-b95b-28b958f52462.png)

Congratulations! You have implemented the business logic for the book service, created custom exceptions, defined API endpoints, and registered the endpoints in the <VPIcon icon="iconfont icon-csharp"/>`Program.cs` file. You have also enabled Swagger documentation to test the API endpoints.
