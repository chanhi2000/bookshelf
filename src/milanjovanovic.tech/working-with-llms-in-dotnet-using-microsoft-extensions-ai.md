---
lang: en-US
title: "Working with LLMs in .NET using Microsoft.Extensions.AI"
description: "Article(s) > Working with LLMs in .NET using Microsoft.Extensions.AI"
icon: iconfont icon-csharp
category:
  - C#
  - DotNet
  - AI
  - LLM
  - Llama
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - cs
  - c#
  - csharp
  - dotnet
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - meta
  - llama
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Working with LLMs in .NET using Microsoft.Extensions.AI"
    - property: og:description
      content: "Working with LLMs in .NET using Microsoft.Extensions.AI"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/working-with-llms-in-dotnet-using-microsoft-extensions-ai.html
prev: /programming/cs/articles/README.md
date: 2025-01-11
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_124.png
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
  "title": "Llama > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llama/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Working with LLMs in .NET using Microsoft.Extensions.AI"
  desc="Microsoft.Extensions.AI provides a unified interface for integrating LLMs into .NET applications, allowing developers to switch between providers like Ollama, Azure, or OpenAI without changing application code. Through practical examples of chat completion, article summarization, and smart categorization, this article demonstrates how to leverage the library's features while running LLMs locally using Ollama."
  url="https://milanjovanovic.tech/blog/working-with-llms-in-dotnet-using-microsoft-extensions-ai"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_124.png"/>

I've been experimenting with different approaches to integrating LLMs into .NET apps, and I want to share what I've learned about using `Microsoft.Extensions.AI`.

Large Language Models (LLMs) have revolutionized how we approach AI-powered applications. While many developers are familiar with cloud-based solutions like OpenAI's GPT models, running LLMs locally has become increasingly accessible thanks to projects like [<VPIcon icon="fa-brands fa-meta"/>Ollama](https://ollama.com/).

In this article, we'll explore how to use LLMs in .NET applications using `Microsoft.Extensions.AI`, a powerful abstraction that extends the [Semantic Kernel (<VPIcon icon="iconfont icon-github"/>`microsoft/semantic-kernel`)](https://github.com/microsoft/semantic-kernel) SDK.

---

## Understanding the Building Blocks

### Large Language Models (LLMs)

LLMs are deep learning models trained on vast amounts of data, capable of understanding and generating human-like text. These models can perform various tasks such as text completion, summarization, classification, and engaging in conversation. While traditionally accessed through cloud APIs, recent advances have made it possible to run them locally on standard hardware.

![Timeline of large language models.<br/>Source: [<VPIcon icon="fas fa-globe"/>Weights & Biases](https://wandb.ai/vincenttu/blog_posts/reports/A-Survey-of-Large-Language-Models--VmlldzozOTY2MDM1)](https://milanjovanovic.tech/blogs/mnw_124/large_language_models.png?imwidth=3840)

### Ollama

Ollama is an open-source project that simplifies running LLMs locally. It provides a Docker container that can run various open-source models like Llama, making it easy to experiment with AI without depending on cloud services. Ollama handles model management and optimization and provides a simple API for interactions.

### Microsoft.Extensions.AI

[<VPIcon icon="fas fa-globe"/>Microsoft.Extensions.AI](https://nuget.org/packages/Microsoft.Extensions.AI) is a library that provides a unified interface for working with LLMs in .NET applications. Built on top of Microsoft's Semantic Kernel, it abstracts away the complexity of different LLM implementations, allowing developers to switch between providers (like Ollama, Azure, or OpenAI) without changing application code.

---

## Getting Started

Before diving into the examples, here's what you need to run LLMs locally:

::: tabs

@tab:active 1.

Docker running on your machine

@tab 2.

Ollama container running with the `llama3` model:

```sh
# Pull the Ollama container
docker run --gpus all -d -v ollama_data:/root/.ollama \
-p 11434:11434 \
--name ollama ollama/ollama

# Pull the llama3 model
docker exec -it ollama ollama pull llama3
```

@tab 3.

A few NuGet packages (I built this using a .NET 9 console application):

```powershell
Install-Package Microsoft.Extensions.AI # The base AI library
Install-Package Microsoft.Extensions.AI.Ollama # Ollama provider implementation
Install-Package Microsoft.Extensions.Hosting # For building the DI container
```

:::

---

## Simple Chat Completion

Let's start with a basic example of chat completion. Here's the minimal setup:

```cs
var builder = Host.CreateApplicationBuilder();

builder.Services.AddChatClient(new OllamaChatClient(new Uri("http://localhost:11434"), "llama3"));

var app = builder.Build();

var chatClient = app.Services.GetRequiredService<IChatClient>();

var chatCompletion = await chatClient.CompleteAsync("What is .NET? Reply in 50 words max.");

Console.WriteLine(chatCompletion.Message.Text);
```

Nothing fancy here - we're just setting up dependency injection and asking a simple question. If you're used to using raw API calls, you'll notice how clean this feels.

The `AddChatClient` extension method registers the chat client with the DI container. This allows you to inject `IChatClient` into your services and interact with LLMs using a simple API. The implementation uses the `OllamaChatClient` to communicate with the Ollama container running locally.

---

## Implementing Chat with History

Building on the previous example, we can create an interactive chat that maintains conversation history. This is useful for context-aware interactions and real-time chat applications. All we need is a `List<ChatMessage` to store the chat history:

```cs :collapsed-lines
var chatHistory = new List<ChatMessage>();

while (true)
{
   Console.WriteLine("Enter your prompt:");
   var userPrompt = Console.ReadLine();
   chatHistory.Add(new ChatMessage(ChatRole.User, userPrompt));

   Console.WriteLine("Response from AI:");
   var chatResponse = "";
   await foreach (var item in chatClient.CompleteStreamingAsync(chatHistory))
   {
       // We're streaming the response, so we get each message as it arrives
       Console.Write(item.Text);
       chatResponse += item.Text;
   }
   chatHistory.Add(new ChatMessage(ChatRole.Assistant, chatResponse));
   Console.WriteLine();
}
```

The cool part here is the streaming response - you get that nice, gradual text appearance like in ChatGPT. We're also maintaining chat history, which lets the model understand context from previous messages, making conversations feel more natural.

---

## Getting Practical: Article Summarization

Let's try something more useful - automatically summarizing articles. I've been using this to process blog posts:

```cs :collapsed-lines
var posts = Directory.GetFiles("posts").Take(5).ToArray();
foreach (var post in posts)
{
   string prompt = $$"""
         You will receive an input text and the desired output format.
         You need to analyze the text and produce the desired output format.
         You not allow to change code, text, or other references.

         # Desired response

         Only provide a RFC8259 compliant JSON response following this format without deviation.

         {
            "title": "Title pulled from the front matter section",
            "summary": "Summarize the article in no more than 100 words"
         }

         # Article content:

         {{File.ReadAllText(post)}}
         """;

   var chatCompletion = await chatClient.CompleteAsync(prompt);
   Console.WriteLine(chatCompletion.Message.Text);
   Console.WriteLine(Environment.NewLine);
}
```

Pro tip: Being specific about the output format (like requesting [<VPIcon icon="fas fa-globe"/>RFC8259](https://datatracker.ietf.org/doc/html/rfc8259) compliant JSON) helps get consistent results. I learned this the hard way after dealing with occasionally malformed responses!

---

## Taking It Further: Smart Categorization

Here's where it gets really interesting - we can get strongly typed responses directly from our LLM:

```cs :collapsed-lines
class PostCategory
{
    public string Title { get; set; } = string.Empty;
    public string[] Tags { get; set; } = [];
}

var posts = Directory.GetFiles("posts").Take(5).ToArray();
foreach (var post in posts)
{
    string prompt = $$"""
          You will receive an input text and the desired output format.
          You need to analyze the text and produce the desired output format.
          You not allow to change code, text, or other references.

          # Desired response

          Only provide a RFC8259 compliant JSON response following this format without deviation.

          {
             "title": "Title pulled from the front matter section",
             "tags": "Array of tags based on analyzing the article content. Tags should be lowercase."
          }

          # Article content:

          {{File.ReadAllText(post)}}
          """;

    var chatCompletion = await chatClient.CompleteAsync<PostCategory>(prompt);

    Console.WriteLine(
      $"{chatCompletion.Result.Title}. Tags: {string.Join(",",chatCompletion.Result.Tags)}");
}
```

The strongly typed approach provides compile-time safety and better IDE support, making it easier to maintain and refactor code that interacts with LLM responses.

---

## Flexibility with Different LLM Providers

One of the key advantages of `Microsoft.Extensions.AI` is support for different providers. While our examples use Ollama, you can easily switch to other providers:

```cs :collapsed-lines
// Using Azure OpenAI
builder.Services.AddChatClient(new AzureOpenAIClient(
        new Uri("AZURE_OPENAI_ENDPOINT"),
        new DefaultAzureCredential())
            .AsChatClient());

// Using OpenAI
builder.Services.AddChatClient(new OpenAIClient("OPENAI_API_KEY").AsChatClient());
```

::: note This flexibility allows you to:

- Start development with local models
- Move to production with cloud providers
- Switch between providers without changing application code
- Mix different providers for different use cases (categorization, image recognition, etc.)

:::

---

## Takeaway

`Microsoft.Extensions.AI` makes it very simple to integrate LLMs into .NET applications. Whether you're building a chat interface, processing documents, or adding AI-powered features to your application, the library provides a clean, consistent API that works across different LLM providers.

I've only scratched the surface here. Since integrating this into my projects, I've found countless uses:

- Automated content moderation for user submissions
- Automated support ticket categorization
- Content summarization for newsletters

I'm also planning a small side project that will use LLMs to process images from a camera feed. The idea is to detect anything unusual and trigger alerts in real-time.

What are you planning to build with this? I'd love to hear about your projects and experiences. The AI space is moving fast, but with tools like `Microsoft.Extensions.AI`, we can focus on building features rather than wrestling with infrastructure.

Good luck out there, and see you next week.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Working with LLMs in .NET using Microsoft.Extensions.AI",
  "desc": "Microsoft.Extensions.AI provides a unified interface for integrating LLMs into .NET applications, allowing developers to switch between providers like Ollama, Azure, or OpenAI without changing application code. Through practical examples of chat completion, article summarization, and smart categorization, this article demonstrates how to leverage the library's features while running LLMs locally using Ollama.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/working-with-llms-in-dotnet-using-microsoft-extensions-ai.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
