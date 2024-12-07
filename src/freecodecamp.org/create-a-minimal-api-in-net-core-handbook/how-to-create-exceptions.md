---
lang: en-US
title: "How to Create Exceptions"
description: Article(s) > (9/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
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
      content: Article(s) > (9/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
    - property: og:description
      content: "How to Create Exceptions"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-create-exceptions.html
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
  url="https://freecodecamp.org/news/create-a-minimal-api-in-net-core-handbook#heading-how-to-create-exceptions"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png"/>

Properly handling exceptions is crucial for ensuring the stability and reliability of an application. In the context of ASP.NET Core, there are two main types of exceptions:

- **System Exceptions**: These are exceptions thrown by the .NET runtime or the underlying system.
- **Application Exceptions**: These are exceptions thrown by the application code to handle specific errors or conditions.

In ASP.NET Core with .NET 8, a new feature called global exception handling was introduced. This feature allows you to handle exceptions globally in your application, making it easier to manage errors and provide a consistent user experience.

In our application, we will create custom exception classes to handle specific errors and conditions. We’ll also leverage the global exception handling feature to manage exceptions globally, ensuring a uniform approach to error handling across the entire application.

We are going to create the following exception classes:

- `NoBookFoundException`: Thrown when a book with the specified ID is not found.
- `BookDoesNotExistException`: Thrown when a book with the specified ID does not exist.
- `GlobalExceptionHandler`: Handles exceptions globally in the application.

In the <FontIcon icon="fas fa-foler-open"/>`Exceptions` folder, create a new file named <FontIcon icon="iconfont icon-csharp"/>`NoBookFoundException.cs` and add the following code:

```cs title="Exceptions/NoBookFoundException.cs"
namespace bookapi_minimal.Exceptions
{
    public class NoBookFoundException : Exception
    {
        public NoBookFoundException() : base("No books found")
        {}
    }
}
```

In this code, we are creating a custom exception class named `NoBookFoundException` that inherits from the `Exception` class. The `NoBookFoundException` class is used to handle the scenario where no books are found in the database. We are also providing a custom error message for the exception.

In the <FontIcon icon="fas fa-foler-open"/>`Exceptions` folder, create a new file named <FontIcon icon="iconfont icon-csharp"/>`BookDoesNotExistException.cs` and add the following code:

```cs
namespace bookapi_minimal.Exceptions
{
     public class BookDoesNotExistException : Exception
    {
        private int id { get; set; }

        public BookDoesNotExistException(int id) : base($"Book with id {id} does not exist")
        {
            this.id = id;
        } 

    }
}
```

In this code, we are creating a custom exception class named `BookDoesNotExistException` that inherits from the `Exception` class. The `BookDoesNotExistException` class is used to handle the scenario where a book with the specified ID does not exist in the database. We are also providing a custom error message for the exception.

In the <FontIcon icon="fas fa-foler-open"/>`Exceptions` folder, create a new file named <FontIcon icon="iconfont icon-csharp"/>`GlobalExceptionHandler.cs` and add the following code:

```cs :collapsed-lines title="Exceptions/GlobalExceptionHandler.cs"
using System.Net;
using bookapi_minimal.Contracts;
using Microsoft.AspNetCore.Diagnostics;

namespace bookapi_minimal.Exceptions
{
     // Global exception handler class implementing IExceptionHandler
    public class GlobalExceptionHandler : IExceptionHandler
    {
        private readonly ILogger<GlobalExceptionHandler> _logger;

        // Constructor to initialize the logger
        public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        {
            _logger = logger;
        }

        // Method to handle exceptions asynchronously
        public async ValueTask<bool> TryHandleAsync(
            HttpContext httpContext,
            Exception exception,
            CancellationToken cancellationToken)
        {
            // Log the exception details
            _logger.LogError(exception, "An error occurred while processing your request");

            var errorResponse = new ErrorResponse
            {
                Message = exception.Message,
                Title = exception.GetType().Name
            };

            // Determine the status code based on the type of exception
            switch (exception)
            {
                case BadHttpRequestException:
                    errorResponse.StatusCode = (int)HttpStatusCode.BadRequest;
                    break;

                case NoBookFoundException:
                case BookDoesNotExistException:
                    errorResponse.StatusCode = (int)HttpStatusCode.NotFound;
                    break;

                default:
                    errorResponse.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }

            // Set the response status code
            httpContext.Response.StatusCode = errorResponse.StatusCode;

            // Write the error response as JSON
            await httpContext.Response.WriteAsJsonAsync(errorResponse, cancellationToken);

            // Return true to indicate that the exception was handled
            return true;
        }
    }
}
```

Let's break down the code above:

- We define a class named `GlobalExceptionHandler` that implements the `IExceptionHandler` interface. The `IExceptionHandler` interface is used to handle exceptions globally in the application.
- The `GlobalExceptionHandler` class contains a constructor that initializes the `ILogger<GlobalExceptionHandler>` dependency. The `ILogger` is used for logging information and errors.
- The `TryHandleAsync` method is used to handle exceptions asynchronously. This method accepts the `HttpContext`, `Exception`, and `CancellationToken` as parameters.
- We log the exception details using the `ILogger` dependency.
- We create an `ErrorResponse` object to represent the error response returned by the API. The `ErrorResponse` object contains the error message, title, and status code.
- We determine the status code based on the type of exception. If the exception is a `BadHttpRequestException`, we set the status code to `BadRequest`. If the exception is a `NoBookFoundException` or `BookDoesNotExistException`, we set the status code to `NotFound`. Otherwise, we set the status code to `InternalServerError`.
- We set the response status code using the `httpContext.Response.StatusCode` property.
- We write the error response as JSON using the `httpContext.Response.WriteAsJsonAsync` method.
- We return `true` to indicate that the exception was handled successfully.

Now that we have created the exception classes, let's register the `GlobalExceptionHandler` in the dependency injection container. Since we created an Extension method for registering services in the dependency injection container, we will add the `GlobalExceptionHandler` to the `ServiceExtensions` class.

Update the `ServiceExtensions` class in the `Extensions` folder as follows:

```cs title="Extensions/ServiceExtensions.cs"
//...
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
//...
```

The `AddExceptionHandler` method registers the `GlobalExceptionHandler` in the dependency injection container. The `AddProblemDetails` method registers the `ProblemDetails` class in the dependency injection container.

Now that we have registered the `GlobalExceptionHandler` in the dependency injection container, we can use it to handle exceptions globally in our application. In the next section, we will create the API endpoints to interact with the book data.
