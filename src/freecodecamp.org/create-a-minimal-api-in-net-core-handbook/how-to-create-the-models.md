---
lang: en-US
title: "How to Create the Models"
description: Article(s) > (5/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
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
      content: Article(s) > (5/13) How to Create a Minimal API in .NET Core – A Step By Step Handbook
    - property: og:description
      content: "How to Create the Models"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-create-the-models.html
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
  url="https://freecodecamp.org/news/create-a-minimal-api-in-net-core-handbook#heading-how-to-create-the-models"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png"/>

In this section, we will create models for our application. Models are the building blocks of our application, representing the data that our application will work with. For our example, we will create a model for a book.

To get started, create a folder named `Models` in your project directory. Inside this folder, create a file named `BookModel.cs` and add the following code:

```cs title="Models/BookModel.cs"
namespace bookapi_minimal.Models
{
    public class BookModel
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

This `BookModel class` defines the properties that represent the details of a book, such as its `title`, `author`, `description`, `category`, `language`, and `total pages`. Each property is designed to hold specific information about the book, making it easy to manage and manipulate book data within our application.

Now that we have created our model, let's create our database context.

---

## How to Create the Database Context

The database context is a class that represents a session with the database. It’s responsible for interacting with the database and executing database operations. In our application, we will use Entity Framework Core to interact with our database.

---

## Install the Required Packages

Before creating our database context, we need to install the following packages:

- `Microsoft.EntityFrameworkCore.Design`
- `Microsoft.EntityFrameworkCore`
- `Microsoft.EntityFrameworkCore.SqlServer`
- `Microsoft.EntityFrameworkCore.Tools`
- `FluentValidation.DependencyInjectionExtensions`

You can install these packages using the following commands:

```sh
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package FluentValidation.DependencyInjectionExtensions
```

---

## Verify Package Installation

To verify that the packages are installed, open the `bookapi-minimal.csproj` file in your project's root directory. You should see the installed packages listed as follows:

```xml title="bookapi-minimal.csproj"
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
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

This confirms that the packages have been successfully installed.

Now let's create our database context.

In the AppContext folder, create a new file named <FontIcon icon="iconfont icon-csharp"/>`ApplicationContext.cs` and add the following code:

```cs title="AppContext/ApplicationContext.cs"
using bookapi_minimal.Models;
using Microsoft.EntityFrameworkCore;

namespace bookapi_minimal.AppContext
{
    public class ApplicationContext(DbContextOptions<ApplicationContext> options) : DbContext(options)
    {
        // Default schema for the database context
        private const string DefaultSchema = "bookapi";

        // DbSet to represent the collection of books in our database
        public DbSet<BookModel> Books { get; set; }

        // Constructor to configure the database context
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.HasDefaultSchema(DefaultSchema);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationContext).Assembly);
        }
    }
}
```

Let's break down the code above:

- We define a class named `ApplicationContext` that inherits from `DbContext`. The `DbContext` class is part of Entity Framework Core and represents a session with the database.
- The constructor accepts an instance of `DbContextOptions<ApplicationContext>`. This constructor is used to configure the database context options.
- We define a property named `Books` type `DbSet<BookModel>`. This property represents the collection of books in our database.
- We override the `OnModelCreating` method to configure the database schema and apply any configurations defined in our application.

Now that we have created our database context, let's create our extension method and register our database context in the dependency injection container.

---

## Create an Extension Method

Before we create the extension method, let's understand what an extension method is in the context of ASP.NET Core.

An extension method is a static method that adds new functionality to an existing type without modifying the original type. In ASP.NET Core, extension methods are commonly used to extend the functionality of the `IServiceCollection` interface, which is used to register services in the dependency injection container.

Services are components that provide functionality to an application, such as database access, logging, and configuration. By creating an extension method for the `IServiceCollection` interface, you can simplify the process of registering your services in the dependency injection container.

Instead of putting everything in the <FontIcon icon="iconfont icon-csharp"/>`Program.cs` file, we will create an extension method to register our services in the dependency injection container. This will help us keep our code clean and organized.

In the <FontIcon icon="fas fa-foler-open"/>`Extensions` folder, create a new file named <FontIcon icon="iconfont icon-csharp"/>`ServiceExtensions.cs` and add the following code:

```cs title="Extensions/ServiceExtensions.cs"
using System.Reflection;
using bookapi_minimal.AppContext;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace bookapi_minimal.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddApplicationServices(this IHostApplicationBuilder builder)
        {
            if (builder == null) throw new ArgumentNullException(nameof(builder));
            if (builder.Configuration == null) throw new ArgumentNullException(nameof(builder.Configuration));

            // Adding the database context
            builder.Services.AddDbContext<ApplicationContext>(configure =>
            {
                configure.UseSqlServer(builder.Configuration.GetConnectionString("sqlConnection"));
            });

            // Adding validators from the current assembly
            builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
```

Let's break down the code above:

- We define a static class named `ServiceExtensions` that contains an extension method named `AddApplicationServices`. This method extends the `IHostApplicationBuilder` interface, which is used to configure the application's request processing pipeline.
- The `AddApplicationServices` method accepts an instance of `IHostApplicationBuilder` as a parameter. This parameter is used to access the application's configuration and services.
- We add the `ApplicationContext` to the dependency injection container and configure it to use SQL Server as the database provider. We retrieve the connection string from the <FontIcon icon="iconfont icon-json"/>`appsettings.json` file using the `GetConnectionString` method.
- We add `validators` from the current `assembly` using the `AddValidatorsFromAssembly` method. This method scans the current assembly for classes that implement the IValidator interface and registers them in the dependency injection container.

Next, we need to add the connection string to the <FontIcon icon="iconfont icon-json"/>`appsettings.json` file. Add the following code to your <FontIcon icon="iconfont icon-json"/>`appsettings.json` file:

```json title="appsettings.json"
{ 
    "ConnectionStrings": {
    "sqlConnection": "Server=localhost\\SQLEXPRESS02;Database=BookAPIMinimalAPI;Integrated Security=true;TrustServerCertificate=true;"
  }
  }
```

Make sure to replace `your_password` it with your actual SQL Server password.

Your <FontIcon icon="iconfont icon-json"/>`appsettings.json` file should look like this:

```json title="appsettings.json"
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "sqlConnection": "Server=localhost\\SQLEXPRESS02;Database=BookAPIMinimalAPI;Integrated Security=true;TrustServerCertificate=true;"
  },
  "AllowedHosts": "*"
}
```

Congratulations! You have successfully created the database context, extension method, and connection string for your application. In the next section, we will create a Contract.
