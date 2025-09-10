---
lang: en-US
title: "How to Create a Minimal API"
description: Article(s) > (2/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook
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
      content: Article(s) > (2/13) How to Create a Minimal API in .NET Core - A Step By Step Handbook
    - property: og:description
      content: "How to Create a Minimal API"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/create-a-minimal-api-in-net-core-handbook/how-to-create-a-minimal-api.html
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
  url="https://freecodecamp.org/news/create-a-minimal-api-in-net-core-handbook#heading-how-to-create-a-minimal-api"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1733158500882/9af04a12-2121-4efd-a66f-00330896e358.png"/>

Creating a minimal API is straightforward when using the `dotnet CLI`, as the default template is already a minimal API. But if you use Visual Studio, you'll need to remove the boilerplate code that comes with the project template.

Let's start by using the `dotnet CLI` to create a minimal API project.

```sh
dotnet new webapi  -n BookStoreApi
```

The `dotnet new webapi` command creates a new minimal API project named `BookStoreApi`. This project contains the necessary files and folders to get you started.

![Minimal API Project Files Structure](https://cdn.hashnode.com/res/hashnode/image/upload/v1732623879052/3db8614b-7b27-43ce-ad84-9fa66001b535.png)

Let's explore the project structure:

- <FontIcon icon="iconfont icon-csharp"/>`Program.cs`: The entry point of the application, where the host is configured.
- `bookapi-minimal.sln`: The solution file that contains the project.
- `bookapi-minimal.http`: A file that contains sample HTTP requests to test the API.
- `bookapi-minimal.csproj`: The project file that contains the project configuration.
- `appsettings.json`: The configuration file that stores application settings.
- `appsettings.Development.json` : The configuration file for the development environment.

When you open the program.cs file, you'll notice that the code is minimal. The <FontIcon icon="iconfont icon-csharp"/>`Program.cs` file contains the following code:

```cs :collapsed-lines title="Program.cs"
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
```

If you don't fully understand the code yet, don't worry—we'll cover it in detail in the upcoming sections. The key takeaway is that minimal APIs require very little code, which is one of their main advantages.

The default code sets up a simple weather forecast API that you can use to test your setup. It generates a list of weather forecasts and returns them when you make a `GET` request to the `/weatherforecast` endpoint. Also, the code includes Swagger UI to help you test the API.

Pay special attention to the `app.MapGet` method, which maps a route to a handler function. In this case, it maps the `/weatherforecast` route to a function that returns a list of weather forecasts. We'll use similar methods to create our own endpoints in the next sections.

Before we start creating our project folder structure, let's understand the HTTP methods in both Controller-based and Minimal APIs.
