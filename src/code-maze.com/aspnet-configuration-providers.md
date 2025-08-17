---
lang: en-US
title: "ASP.NET Core Configuration - Configuration Providers"
description: "Article(s) > ASP.NET Core Configuration - Configuration Providers"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - Article(s)
tag:
  - blog
  - code-maze.com
  - cs
  - c#
  - csharp
  - dotnet
head:
  - - meta:
    - property: og:title
      content: "Article(s) > ASP.NET Core Configuration - Configuration Providers"
    - property: og:description
      content: "ASP.NET Core Configuration - Configuration Providers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/aspnet-configuration-providers.html
prev: /programming/cs/articles/README.md
date: 2020-09-08
isOriginal: false
author:
  - name: Vladimir Pecanac
    url : https://code-maze.com/author/codemaze_blog/
cover: /assets/image/code-maze.com/aspnet-configuration-providers/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "C# > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="ASP.NET Core Configuration - Configuration Providers"
  desc="In this article, we're going to talk about different configuration providers in ASP.NET Core applications."
  url="https://code-maze.com/aspnet-configuration-providers/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/aspnet-configuration-providers/banner.png"/>

In this article, we’re going to talk about different configuration providers in ASP.NET Core. We’ve got used to using JSON as a default format for our configuration and it’s the most commonly used format for configuring ASP.NET Core applications.

But there’s much more to it.

The source code for this article can be found on the [ASP.NET Core Configuration repo on GitHub (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/aspnet-core-configuration`)](https://github.com/CodeMazeBlog/aspnet-core-configuration). If you wish to follow along, use the [options-validation  (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/aspnet-core-configuration`)](https://github.com/CodeMazeBlog/aspnet-core-configuration/tree/options-validation) branch. To check out the finished source code, check out the [configuration-providers (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/aspnet-core-configuration`)](https://github.com/CodeMazeBlog/aspnet-core-configuration/tree/configuration-providers) branch.

Let’s dive in.

---

## What are the Configuration Providers?

When we create an ASP.NET Core application from a template we’re presented by a configuration in form of a JSON file appsetting.json. **This file is commonly used** to configure ASP.NET Core applications and there’s **absolutely nothing wrong with it**.

We can even extend it to override its values depending on the environment our application is running in. So, for example, we can create an **apsettings.Production.json file to override a connection string for the [production environment](/code-maze.com/multiple-environments-in-asp-net-core.md)**.

But there are more ways to configure our application. We can even use multiple configuration sources.

We can also configure both the host and the application itself, but in this case, we’re going to focus on application configuration.

That said, it’s important to know that **different configuration providers can override each other.** The order in which they are executed is important!

So which configuration providers are available to us?

---

## Which Configuration Providers are Available by Default?

Here’s the list of all the configuration providers in ASP.NET Core:

- File configuration provider *(default)*
- Secret Manager *(default)*
- Environment Variables configuration provider *(default)*
- Command-line configuration provider *(default)*
- Memory configuration provider
- Azure Key Vault configuration provider
- Azure App configuration provider
- Key-per-file configuration provider
- Custom configuration provider

The **first four providers** from this list **are the providers we get by default**. These are **implemented by the host builder**. Others, we need to implement ourselves.

The custom configuration provider is a very powerful mechanism. It gives us the freedom to implement whichever configuration provider we want. Say, for example, we want to keep our configuration in a database table. No problem, a few lines of code, and we can add our custom provider to the application.

A file configuration provider is by far the most used one, but there are some cases where we need to use others. It’s not uncommon for developers to work in big development teams on large projects, where even **putting the sensitive information in the apsettings.json file can cause problems for others** and commit rollbacks.

We’ve all been there. Environment variables and user secrets can help us with that.

There’s also the issue of [**production environment**](/code-maze.com/multiple-environments-in-asp-net-core.md) configuration values sensitivity. **We just can’t use sensitive information in files in production**. Azure key vault might be just the perfect solution for us in that case.

We’ve mentioned that configuration providers are executed in a specific order.

Let’s learn in which order they are executed in.

---

## Default Order of Execution of Configuration Providers in ASP.NET Core Application

You know that simple method `CreateDefaultBuilder()` in Program.cs?

```cs
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        });
```

It turns out that it does a lot of things for us. Including the initial configuration of our host and application.

Since we’re talking about application configuration this time, let’s focus on that part of the implementation:

```cs
public static IHostBuilder CreateDefaultBuilder(string[] args)
{
    var builder = new HostBuilder();
    
    //trimmed

    builder.ConfigureAppConfiguration((hostingContext, config) =>
    {
        var env = hostingContext.HostingEnvironment;
        
        config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true, reloadOnChange: true);
                
        if (env.IsDevelopment() && !string.IsNullOrEmpty(env.ApplicationName))
        {
            var appAssembly = Assembly.Load(new AssemblyName(env.ApplicationName));
            
            if (appAssembly != null)
            {
                config.AddUserSecrets(appAssembly, optional: true);
            }
        }
        
        config.AddEnvironmentVariables();
        
        if (args != null)
        {
            config.AddCommandLine(args);
        }
    })
    
    //trimmed

    return builder;
}
```

From this implementation, we can see the configuration providers order of execution. The host builder uses the `ConfigureAppConfiguration()` method to define the order in which our providers are loaded.

First, the file configuration provider adds both appsettings.json and appsettings.{EnvironmentName}.json files. Next, if we’re in the [**development environment**](/code-maze.com/multiple-environments-in-asp-net-core.md), the host builder adds user secrets. After that, it applies environment variables, and finally, command-line arguments are used if we need to override anything else.

Understanding this implementation will help us later on when we try to implement our custom provider.

We can also use this knowledge to our benefit if we want to **remove certain configuration providers or even reorder them**. Also, calling the `ConfigureAppConfiguration()` method multiple times **will have an additive effect**.

### Adding a Simple ini Configuration File

We can demonstrate this by adding another configuration source by creating a simple ini file in the solution root, `appsettings.ini`:

```ini title="appsettings.ini"
[Logging:Level]
Default=Information
Microsoft=Warning
Microsoft.Hosting.Lifetime=Information

[ConnectionStrings]
sqlConnection=server=.; database=CodeMazeCommerce; Integrated Security=true
```

Now we can simply extend the host builder:

```cs
public static IHostBuilder CreateHostBuilder(string[] args) =>
    Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder =>
        {
            webBuilder.UseStartup<Startup>();
        })
        .ConfigureAppConfiguration((hostingContext, config) =>
        {
            var env = hostingContext.HostingEnvironment;

            config.AddIniFile("appsettings.ini", optional: true, reloadOnChange: true)
                .AddIniFile($"appsettings.{env.EnvironmentName}.ini", optional: true, reloadOnChange: true);
        });
```

If we run the application now, we’ll see two more sources added to our existing ones.

But what if we want to use just a single source and not worry about overriding our values with different providers, like environment or command-line?

We can simply do that by clearing the sources before we add our provider:

```cs
.ConfigureAppConfiguration((hostingContext, config) =>
{
    var env = hostingContext.HostingEnvironment;

    config.Sources.Clear();

    config.AddIniFile("appsettings.ini", optional: true, reloadOnChange: true)
        .AddIniFile($"appsettings.{env.EnvironmentName}.ini", optional: true, reloadOnChange: true);
});
```

Now if we run the application we’ll only see appsettings.ini and appsettings.{EnvironmentName}.ini as the sources of configuration:

![single configuration provider](/assets/image/code-maze.com/aspnet-configuration-providers/single-configuration-provider.png)

Awesome.

But, other configuration providers exist and we should not discard them, so let’s revert that `Clear()` command. Let’s see how we can use them. They might come in handy.

---

## Using Default Configuration Providers

We’ve seen how to add a simple ini configuration file by using the file configuration provider and the host builder. But we have three more ways to set the configuration values out-of-the-box.

### User Secrets

User secrets are a convenient mechanism to store sensitive configuration data while in development. They are easy to use and you won’t have to create environment variables for each project you develop locally. It’s a good way to keep things clean and simple.

By default, the application uses secrets after the <FontIcon icon="iconfont icon-json"/>`appsetting.json` and <FontIcon icon="iconfont icon-json"/>`appsettings.{Environment}.json` files, and right before environment variables and command-line arguments by default. If you find yourself wondering why your secret isn’t working, it might be worthwhile to check your environment variables.

To be able to use secrets we can initialize the secret manager by navigating to the project root (`ProjectConfigurationDemo`) and typing:

```sh
dotnet user-secrets init
```

This will create UserSecretsId element in our `csproj` file within the PropertyGroup element:

```xml title="ProjectConfigurationDemo.csproj"
<PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
    <UserSecretsId>06219bf2-6545-49db-b255-908d1fabd932</UserSecretsId>
</PropertyGroup>
```

Now we can set a user secret to set a connection string:  

```sh
dotnet user-secrets set "ConnectionStrings:sqlConnection" "server=.; database=CodeMazeCommerce; Integrated Security=true"
```

Once we see the “Successfully saved … to the secret store”, we can check out all our secrets by typing:  

```sh
dotnet user-secrets list
```

Or we can remove it by typing:  

```sh
dotnet user-secrets remove "ConnectionStrings:sqlConnection"
```

We can also right-click on the project itself inside the Visual Studio and then go to the “Manage User Secrets” option to open the secrets.json file and check or modify our secrets:

```json
{
    "ConnectionStrings:sqlConnection": "server=.; database=CodeMazeCommerce; Integrated Security=true"
}
```

Now if we run our application, our configuration values will be available at runtime.

There are more useful commands for user secrets, so if you’re interested, you can check out the [<FontIcon icon="fa-brands fa-microsoft"/>documentation pages](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-3.1&tabs=windows).

Just remember, we should use user secrets just for the development environment. We should not use them in other environments.

### Environment Variables

We can do the same thing using environment variables. Environment variables although less convenient to use, are more appropriate for any environment, and therefore we can use them in production. However, they are unencrypted and if the machine gets compromised they are free for all to see.

The only thing we should be aware of is that when defining hierarchical configuration data we need to use double underscore __ instead of “:” as we do in a JSON file.

For example, we can define the connection string:

```sh
set ConnectionStrings__sqlConnection "server=.; database=CodeMazeCommerce; Integrated Security=true"
```

And we can check if the variable is set by typing … you’ve guessed it `set`.

### Command-line Arguments

We can use command-line arguments to set configuration values too. It’s not that common thing to do though. We can use it to test if certain values work correctly.

We can set the configuration via command-line in three different ways:  

```sh
dotnet run ConnectionStrings:sqlConnection=server=.; database=CodeMazeCommerce; Integrated Security=true  
# or 
dotnet run /ConnectionStrings:sqlConnection=server=.; database=CodeMazeCommerce; Integrated Security=true  
# or 
dotnet run --ConnectionStrings:sqlConnection=server=.; database=CodeMazeCommerce; Integrated Security=true`
```

These commands are the same but we should mix them together.

---

## Conclusion

In this article, we’ve learned what configuration providers are. We’ve learned about the default ones, and how to use them to configure our application. In the next part, we’re going to implement a [**custom configuration provider**](/code-maze.com/aspnet-configuration-creating-custom-provider.md) that reads our configuration values from the database.

You can find other parts of this series on the [**ASP.NET Core Web API page**](/code-maze.com/net-core-series.md#configuration).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "ASP.NET Core Configuration - Configuration Providers",
  "desc": "In this article, we're going to talk about different configuration providers in ASP.NET Core applications.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/https:code-maze.comaspnet-configuration-providers.html",
  "logo": "https://chanhi2000.github.io/bookshelf/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

