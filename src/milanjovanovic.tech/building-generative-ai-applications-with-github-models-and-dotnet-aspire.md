---
lang: en-US
title: "Building Generative AI Applications With GitHub Models and .NET Aspire"
description: "Article(s) > Building Generative AI Applications With GitHub Models and .NET Aspire"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - DevOps
  - Github
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - devops
  - github
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building Generative AI Applications With GitHub Models and .NET Aspire"
    - property: og:description
      content: "Building Generative AI Applications With GitHub Models and .NET Aspire"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/building-generative-ai-applications-with-github-models-and-dotnet-aspire.html
prev: /programming/cs/articles/README.md
date: 2025-08-16
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_155.png
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

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Building Generative AI Applications With GitHub Models and .NET Aspire"
  desc="Discover how to integrate AI into your .NET applications in under an hour using GitHub Models and .NET Aspire 9.4. I'll walk you through building a simple AI-powered blog analyzer that automatically categorizes your content."
  url="https://milanjovanovic.tech/blog/building-generative-ai-applications-with-github-models-and-dotnet-aspire"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_155.png"/>

I wanted to see what the simplest practical AI app I could build was, and this is what I came up with.

Every week, I publish blog posts covering different topics - architecture patterns, cloud services, programming techniques, business insights. Sometimes I write about DevOps, other times about security. After years of writing, I realized I had no systematic way to categorize my content. Sure, I could manually tag each post, but where's the fun in that?

So I built a simple AI-powered blog analyzer. It fetches any blog post, extracts the content, and uses AI to automatically categorize it. The entire thing took less than an hour to build thanks to **.NET Aspire 9.4** and it's new **GitHub Models** integration.

What surprised me wasn't just how easy it was to build, but how the integration completely removes the typical AI service complexity. No juggling API keys in configuration files, no manual HTTP client setup, no wrestling with different SDK patterns for different AI providers. You declare an AI model in your AppHost just like you would a database, and Aspire handles the rest.

Here's what I learned building this simple app, and how you can use the same patterns to add AI to your applications.

---

## What are GitHub Models?

[<FontIcon icon="iconfont icon-github"/>GitHub Models](https://docs.github.com/en/github-models) is a service that provides access to AI models from OpenAI, Microsoft, Meta, and others through a single API. You get free tier access for prototyping (with rate limits), an interactive playground for testing prompts, and pay-per-use billing when you're ready for production.

The models range from cost-effective options like **GPT-4o-mini** to more advanced models. Each model has different strengths - some excel at reasoning, others at code generation or creative writing.

When you combine GitHub Models with .NET Aspire's orchestration, you get:

- Automatic API key management via [<FontIcon icon="fa-brands fa-microsoft"/>external parameters](https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/external-parameters)
- [**Service discovery**](/milanjovanovic.tech/how-dotnet-aspire-simplifies-service-discovery.md) between your components
- Built-in [**health checks**](/milanjovanovic.tech/health-checks-in-asp-net-core.md) and [**telemetry**](/milanjovanovic.tech/introduction-to-distributed-tracing-with-opentelemetry-in-dotnet.md)
- Consistent configuration patterns

---

## Setting Up the Integration

The GitHub Models integration splits into two parts: configuring models in your `AppHost` and consuming them in your services.

### AppHost Configuration

In your AppHost project, you define AI models as resources alongside your other services:

```cs
var builder = DistributedApplication.CreateBuilder(args);

var blogService = builder.AddExternalService("dotnet-blog", "https://www.milanjovanovic.tech/blog");
var aiModel = builder.AddGitHubModel("ai-model", "openai/gpt-4o-mini");

builder.AddProject<Projects.GitHub_Models_Demo>("github-models-demo")
    .WithReference(blogService)
    .WithReference(aiModel);
```

Notice how the AI model sits alongside the external blog service. Both are resources that your main application depends on. Aspire handles the connection details - you just declare what you need.

Make sure to install the [<FontIcon icon="fas fa-globe"/>Aspire.Hosting.GitHub.Models](https://nuget.org/packages/Aspire.Hosting.GitHub.Models) NuGet package to enable this integration.

To call the GitHub Models inference API you need a personal access token with the `models:read` permission. When you call `AddGitHubModel`, Aspire automatically creates a parameter named `{resourceName}-gh-apikey` (for example, `ai-model-gh-apikey`)

You can populate the parameter through user secrets for local development:

```json
{
  "Parameters": {
    "ai-model-gh-apikey": "github_pat_YOUR_PERSONAL_ACCESS_TOKEN"
  }
}
```

If you don't provide this value from configuration, Aspire will prompt you to enter it when you run the application. You'll have an option to store the access token securely in user secrets.

### Client Setup

In your consuming service, add the Azure AI client (which works with GitHub Models):

```cs
builder
    .AddAzureChatCompletionsClient("ai-model")
    .AddChatClient();
```

That's it. No manual HTTP client configuration, no hardcoded endpoints. The `ai-model` name matches what you defined in the AppHost, and Aspire wires everything together.

You'll need to install the [<FontIcon icon="fas fa-globe"/>Aspire.Azure.AI.Inference](https://nuget.org/packages/Aspire.Azure.AI.Inference) NuGet package to enable this integration. It also exposes an integration with [**MEAI**](/milanjovanovic.tech/working-with-llms-in-dotnet-using-microsoft-extensions-ai.md) using the `AddChatClient` method. This simplifies the process of interacting with LLMs in your applications.

---

## Building the Blog Analyzer

Now let's build something useful. We'll create a service that fetches blog posts and uses AI to categorize them.

### Fetching Blog Content

First, we need to extract readable content from blog posts:

```cs
public async Task<string> GetBlogContentAsync(string slug)
{
    var response = await httpClient.GetAsync(slug);
    response.EnsureSuccessStatusCode();
    var htmlContent = await response.Content.ReadAsStringAsync();

    return ExtractArticleContent(htmlContent);
}
```

The `ExtractArticleContent` method (not shown) uses [<FontIcon icon="fas fa-globe"/>HtmlAgilityPack](https://nuget.org/packages/htmlagilitypack/) to pull out the main article text, stripping away navigation, ads, and other page elements.

### AI-Powered Categorization

Here's where it gets interesting. We'll use the AI model to analyze the content and assign a category:

```cs :collapsed-lines
public async Task<string> SummarizeBlogAsync(string blogContent)
{
    var prompt =
        @"""
        You are a blog content assistant. Summarize the following blog post
        as one of the following categories: Technology, Business, Programming,
        Architecture, DevOps, Cloud, Security, General.
        Only those eight values are allowed. Be as concise as possible.
        I want a 1-word response with one of these options: Technology, Business,
        Programming, Architecture, DevOps, Cloud, Security, General.

        The blog content is: {blogContent}
        """;

    var response = await chatClient.GetResponseAsync(prompt);

    if (!response.Messages.Any())
    {
        return "General";
    }

    var category = response.Messages.First().Text switch
    {
        var s when s.Contains("Technology", StringComparison.OrdinalIgnoreCase) => "Technology",
        var s when s.Contains("Business", StringComparison.OrdinalIgnoreCase) => "Business",
        var s when s.Contains("Programming", StringComparison.OrdinalIgnoreCase) => "Programming",
        var s when s.Contains("Architecture", StringComparison.OrdinalIgnoreCase) => "Architecture",
        var s when s.Contains("DevOps", StringComparison.OrdinalIgnoreCase) => "DevOps",
        var s when s.Contains("Cloud", StringComparison.OrdinalIgnoreCase) => "Cloud",
        var s when s.Contains("Security", StringComparison.OrdinalIgnoreCase) => "Security",
        var s when s.Contains("General", StringComparison.OrdinalIgnoreCase) => "General",
        _ => "General"
    };

    return category;
}
```

A few things make this work reliably:

- The prompt is explicit about allowed categories
- We request a single-word response to avoid parsing complex output
- The switch expression handles variations in the AI's response
- There's always a fallback to "General"

### Exposing the API

Finally, we wrap everything in a simple API endpoint:

```cs
app.MapPost("/summarize-blog", async (
    string slug,
    BlogService blogService,
    BlogSummarizer blogSummarizer) =>
{
    var content = await blogService.GetBlogContentAsync(slug);
    var category = await blogSummarizer.SummarizeBlogAsync(content);

    return Results.Ok(new
    {
        slug,
        category,
        content = $"{content.Substring(0, 50)}..."
    });
});
```

Call this endpoint with a blog post URL slug, and you get back the category and a preview of the content. The dependency injection handles service resolution, and Aspire manages the AI model connection behind the scenes.

Here's an example response:

```json
{
  "slug": "screaming-architecture", // https://www.milanjovanovic.tech/blog/screaming-architecture
  "category": "Architecture",
  "content": "If you were to glance at the folder structure of y..."
}
```

Here's the distributed trace in Aspire showing the request and response flow. You can see the request to the blog service and the AI model.

![Distributed trace in Aspire showing the request and response flow using GitHub Models](https://milanjovanovic.tech/blogs/mnw_155/distributed_trace.png?imwidth=1920)

---

## Wrapping Up

The GitHub Models integration with .NET Aspire removes much of the complexity from adding AI to your applications. You get:

- Simple configuration through the AppHost pattern
- Automatic service discovery and connection management
- Access to multiple AI models without vendor lock-in
- The same observability and deployment benefits as other Aspire resources

Whether you're [**adding AI to an existing system**](/milanjovanovic.tech/working-with-llms-in-dotnet-using-microsoft-extensions-ai.md) or building something new, this integration provides the foundation you need. Start with simple categorization or summarization, then expand as you learn what works for your use case.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building Generative AI Applications With GitHub Models and .NET Aspire",
  "desc": "Discover how to integrate AI into your .NET applications in under an hour using GitHub Models and .NET Aspire 9.4. I'll walk you through building a simple AI-powered blog analyzer that automatically categorizes your content.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/building-generative-ai-applications-with-github-models-and-dotnet-aspire.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
