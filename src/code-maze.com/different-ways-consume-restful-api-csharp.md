---
lang: ko-KR
title: "A Few Great Ways to Consume RESTful API in C#"
description: "Article(s) > A Few Great Ways to Consume RESTful API in C#"
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
      content: "Article(s) > A Few Great Ways to Consume RESTful API in C#"
    - property: og:description
      content: "A Few Great Ways to Consume RESTful API in C#"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/different-ways-consume-restful-api-csharp.html
prev: /programming/cs/articles/README.md
date: 2017-06-06
isOriginal: false
author:
  - name: Vladimir Pecanac
    url : https://code-maze.com/author/codemaze_blog/
cover: /assets/image/code-maze.com/different-ways-consume-restful-api-csharp/banner.png
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
  name="A Few Great Ways to Consume RESTful API in C#"
  desc="RESTful APIs are an integral part of our lives. Because of that is important to know how to consume a RESTful API and which tools are at your disposal."
  url="https://code-maze.com/different-ways-consume-restful-api-csharp"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/different-ways-consume-restful-api-csharp/banner.png"/>

By taking a path of Web development, you find yourself in need of dealing with external APIs (Application Programming Interface) sooner or later. In this article, my goal is to make the most comprehensive list of ways to consume RESTful APIs in your C# projects and show you how to do that with some simple examples.

After reading the article you will have more insight into which options are available to you and how to choose the right one next time you need to consume a [**RESTful API**](//code-maze.com/ultimate-aspnetcore-webapi-second-edition.md).

---

## What is a RESTful API?

So, before we start, you might be wondering what [**API**](//code-maze.com/ultimate-aspnet-core-3-web-api.md) stands for, and what is the RESTful part all about.

To put things simply, APIs are the layers between software applications. You can send the request to the API, and in return, you get a response from it. APIs hide all the nitty-gritty details of the concrete implementation of a software application and expose the interface you should use to communicate with that application.

- [**Consuming GitHub API (REST) With Flurl**](/code-maze.com/consuming-github-api-rest-with-flurl.md)
<!-- TODO: VPCard -->
- [**HTTP Series**](/code-maze.com/http-series.md)
<!-- TODO: VPCard -->
- [**Using C# and DalSoft.RestClient to Consume Any REST API**](/code-maze.com/dalsoft-restclient-consume-any-rest-api.md)
<!-- TODO: VPCard -->
- [**Basic Tips and Tricks to Boost Productivity in Visual Studio**](/code-maze.com/visual-studio-productivity.md)
<!-- TODO: VPCard -->

The whole internet is the one big spider web made of APIs. We use APIs to communicate and relate information between applications. We have an API for pretty much anything out there. Most of the services you use daily have their APIs (GoogleMaps, Facebook, Twitter, Instagram, weather portals…)

RESTful part means that API is implemented following the principles and rules of the REST (Representational State Transfer) which is the underlying architectural principle of the web. RESTful APIs in most cases return the plain text, JSON, or XML response. Explaining REST in more detail is out of the scope of this article, but you can read more about REST in our article [**Top REST API best practices**](/code-maze.com/top-rest-api-best-practices.md).

---

## How to Consume RESTful APIs

Ok, let’s go to the meaty part of this whole story.

Each has pros and cons, so let us go through them and see what they offer.

As an example, we’ll collect information about RestSharp repo releases and publish dates via GitHub API. This information is available publicly and you can see how raw JSON response looks here: [<FontIcon icon="iconfont icon-github"/>RestSharp releases](https://api.github.com/repos/restsharp/restsharp/releases)

We are going to utilize the help of the Json.NET library to deserialize the response we get. Also, for some examples, we are going to use the inbuilt deserialization mechanisms of the libraries. It’s up to you to choose which way you prefer because no way is the right way. (You can see the implementation for both mechanisms in the [source code (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/ConsumeRestfulApisExamples`)](https://github.com/CodeMazeBlog/ConsumeRestfulApisExamples)).

What I expect to get as a result of the next few examples is a deserialized `JArray` (for simplicity) that contains RestSharp release information. After that, we can iterate through it to get the following result.

![](/assets/image/code-maze.com/different-ways-consume-restful-api-csharp/RestSharp-releases.png)

---

## HttpWebRequest/Response Class

It’s the HTTP-specific implementation of `WebRequest` class which was originally used to deal with HTTP requests, but it was made obsolete and replaced by the `WebClient` class.

The `HttpWebRequest` class offers fine-grained control over every aspect of the request-making process. As you can imagine, this can be a double-edged sword and you can easily end up losing enormous amounts of time fine-tuning your requests. On the other hand, this might just be what you need for your specific case.

The `HttpWebRequest` class does not block the user interface, which is, I am sure you will agree with this one, pretty important.

The `HttpWebResponse` class provides a container for the incoming responses.

This is a simple example of how to consume an API using these classes.

```cs
public class HttpWebRequestHandler : IRequestHandler
{
    public string GetReleases(string url)
    {
        var request = (HttpWebRequest)WebRequest.Create(url);

        request.Method = "GET";
        request.UserAgent = RequestConstants.UserAgentValue;
        request.AutomaticDecompression = DecompressionMethods.Deflate | DecompressionMethods.GZip;

        var content = string.Empty;

        using (var response = (HttpWebResponse)request.GetResponse())
        {
            using (var stream = response.GetResponseStream())
            {
                using (var sr = new StreamReader(stream))
                {
                    content = sr.ReadToEnd();
                }
            }
        }

        return content;
    }
}
```

Although a simple example, it becomes much more complicated when you need to deal with more sophisticated scenarios like posting form information, authorizing etc.

---

## WebClient Class

This class is a wrapper around `HttpWebRequest`. It simplifies the process by abstracting the details of the `HttpWebRequest` from the developer. The code is easier to write and you are less likely to make mistakes this way. If you want to write less code, not worry about all the details, and the execution speed is a non-factor, consider using `WebClient` class.

This example should give you a rough idea of how much easier is to use `WebClient` compared to the `HttpWebRequest`/`HttpWebResponse` approach.

```cs
public string GetReleases(string url)
{
    var client = new WebClient();
    client.Headers.Add(RequestConstants.UserAgent, RequestConstants.UserAgentValue);

    var response = client.DownloadString(url);

    return response;
}
```

Much easier, right?

Other then `DownloadString` method, `WebClient` class offers a host of other useful methods to make our life easier. We can easily manipulate strings, files, or byte arrays using it, and for a price of just a few milliseconds slower than `HttpWebRequest`/`HttpWebResponse` approach.

Both the `HttpWebRequest`/`HttpWebResponse` and `WebClient` classes are available in the older versions of .NET. Be sure to check out the [<FontIcon icon="fa-brands fa-microsoft"/>MSDN](https://msdn.microsoft.com/en-us/library/system.net.webclient(v=vs.110).aspx) if you are interested what else `WebClient` has to offer.

---

## HttpClient Class

`HttpClient` is the “new kid on the block”, and offers some of the modern .NET functionalities that older libraries lack. For example, you can send multiple requests with a single instance, it is not tied to the particular HTTP server or host and makes use of the async/await mechanism.

You can find out about the [<FontIcon icon="fas fa-globe"/>five good reasons to use HttpClient in this video](https://channel9.msdn.com/Events/Build/2013/4-092):

- Strongly typed headers
- Shared Caches, cook­ies, and credentials
- Access to cook­ies and shared cookies
- Con­trol over caching and shared cache
- Inject your code mod­ule into the ASP.NET pipeline
- Cleaner and mod­u­lar code.

Here is `HttpClient` in action in our example:

```cs
public string GetReleases(string url)
{
    using (var httpClient = new HttpClient())
    {
        httpClient.DefaultRequestHeaders.Add(RequestConstants.UserAgent, RequestConstants.UserAgentValue);

        var response = httpClient.GetStringAsync(new Uri(url)).Result;

        return response;
    }
}
```

For simplicity’s sake, I implemented it synchronously. Every `HttpClient` method is meant to be used asynchronously and SHOULD be used that way.

Also, I need to mention one more thing. **There is a debate about whether `HttpClient` should be wrapped in a using block or statically on the app level. Although it implements `IDisposable`, it seems that by wrapping it in the using block you can [<FontIcon icon="fas fa-globe"/>make your app malfunction and get the SocketException](https://aspnetmonsters.com/2016/08/2016-08-27-httpclientwrong/).** As Ankit blogs, the performance test results are [<FontIcon icon="fas fa-globe"/>much in favor of static initialization](https://ankitvijay.net/2016/09/25/dispose-httpclient-or-have-a-static-instance/) of the `HttpClient`. **Be sure to read these blog posts** as they can help you be more informed about the correct usage of the `HttpClient` library.

This class is the base for many different libraries, so if you want to learn more about it check out our [**HttpClient series of articles**](/code-maze.com/httpclient-with-asp-net-core-tutorial.md).

---

## RestSharp

RestSharp is the open-source alternative to standard .NET libraries and one of the coolest .NET libraries out there. It is available as a NuGet package, and there are a few reasons why you should consider trying it out.

Like `HttpClient`, RestSharp is a modern and comprehensive library, easy and pleasant to use, while still having support for older versions of the .NET Framework. It has inbuilt [Authentication (<FontIcon icon="iconfont icon-github"/>`restsharp/RestSharp`)](https://github.com/restsharp/RestSharp/wiki/Authenticators) and [Serialization/Deserialization mechanisms (<FontIcon icon="iconfont icon-github"/>`restsharp/RestSharp`)](https://github.com/restsharp/RestSharp/wiki/Deserialization) but allows you to override them with your custom ones. It is [available across platforms (<FontIcon icon="iconfont icon-github"/>`restsharp/RestSharp`)](https://github.com/restsharp/RestSharp/wiki/Cross-Platform-Support) and supports OAuth1, OAuth2, Basic, NTLM, and Parameter-based Authentication. You can choose to work both synchronously or asynchronously.

There is a lot more to this library, and these are just some of the great benefits it offers. For detailed information on the usage and capabilities of RestSharp, you can visit our [**article on RestSharp in C#**](/code-maze.com/aspnetcore-using-restsharp-consume-api.md) or the RestSharp [page on GitHub (<FontIcon icon="iconfont icon-github"/>`restsharp/RestSharp`)](https://github.com/restsharp/RestSharp/wiki/Getting-Started).

Now let’s try to get a list of RestSharp releases using RestSharp 😀

```cs
public string GetReleases(string url)
{
    var client = new RestClient(url);

    var response = client.Execute(new RestRequest());

    return response.Content;
}
```

Simple enough. But don’t let that fool you, RestSharp is very flexible and has all the tools you need to achieve almost anything while working with RESTful API.

One thing to note in this example is that I didn’t use RestSharp’s deserialization mechanism due to the example consistency, which is a bit of a waste, but I encourage you to use it as it is really easy and convenient. So you can easily make a container like this:

```cs
public class GitHubRelease
{
    [JsonProperty(PropertyName = "name")]
    public string Name { get; set; }
    [JsonProperty(PropertyName = "published_at")]
    public string PublishedAt { get; set; }
}
```

After that use `Execute` method to directly deserialize the response to that container. You can add just the properties you need and use the `JsonProperty` attribute to map them to C# properties (nice touch).  Since we get the list of releases in our response, we use the `List<Release>` as a containing type.

```cs
public List<GitHubRelease> GetDeserializedReleases(string url)
{
    var client = new RestClient(url);

    var response = client.Execute<List<GitHubRelease>>(new RestRequest());

    return response.Data;
}
```

A pretty straightforward and elegant way to get our data.

There is a lot more to RestSharp than sending `GET` requests, so explore and see for yourself how cool it can be.

One final note to add to the RestSharp case is that its repository is in need of maintainers. If you want to learn more about this cool library, I urge you to head over to the [RestSharp repo (<FontIcon icon="iconfont icon-github"/>`restsharp/RestSharp`)](https://github.com/restsharp/RestSharp) and help this project stay alive and be even better.

---

## ServiceStack Http Utils

Another library, but unlike RestSharp, ServiceStack seems to be properly maintained and keeping pace with modern [**API**](/code-maze.com/ultimate-aspnet-core-3-web-api.md) trends. The list of ServiceStack features is impressive and it certainly has various applications.

What is most useful to us here is to demonstrate how to consume an external RESTful API. ServiceStack has a specialized way of dealing with 3rd Party HTTP APIs called [<FontIcon icon="fas fa-globe"/>HTTP Utils](http://docs.servicestack.net/http-utils).

Let us see what fetching RestSharp releases looks like using ServiceStack HTTP Utils first using the Json.NET parser.

```cs
public string GetReleases(string url)
{
    var response = url.GetJsonFromUrl(webReq =>
    {
        webReq.UserAgent = RequestConstants.UserAgentValue;
    });

    return response;
}
```

You can also choose to leave it to the ServiceStack parser. We can reuse the `Release` class defined earlier in the post.

```cs
public List<GitHubRelease> GetDeserializedReleases(string url)
{
    var releases = url.GetJsonFromUrl(webReq =>
    {
        webReq.UserAgent = RequestConstants.UserAgentValue;
    }).FromJson<List<GitHubRelease>>();

    return releases;
}
```

As you can see, either way works fine, and you can choose whether you get the string response or deserialize it immediately.

Although ServiceStack is the last library we stumbled upon, we were pleasantly surprised by how easy it was for me to use it, and I think it may become my go-to tool for dealing with APIs and services in the future.

---

## Flurl

One of the libraries requested by many people in the comments section, and loved by many all over the internet but still gaining traction.

Flurl stands for Fluent Url Builder, which is the way the library builds its queries. For those of you not familiar with the fluent way of doing stuff, fluent simply means that the library is built in such a way that methods are chained to achieve greater readability, similar to that of human language.

To make things even easier to understand, let’s give some examples (this one is from official docs):

```cs
// Flurl will use 1 HttpClient instance per host
var person = await "https://api.com"
    .AppendPathSegment("person")
    .SetQueryParams(new { a = 1, b = 2 })
    .WithOAuthBearerToken("my_oauth_token")
    .PostJsonAsync(new
    {
        first_name = "Claire",
        last_name = "Underwood"
    })
    .ReceiveJson<Person>();
```

You can see how the methods chain together to complete the “sentence”.

In the background, Flurl is using HttpClient or rather enhancing the HttpClient library with its own syntactic sugar. So that means Flurl is an async library and it’s good to have that in mind.

As with other advanced libraries, we can do this in two different ways:

```cs
public string GetReleases(string url)
{
    var result = url
        .WithHeader(RequestConstants.UserAgent, RequestConstants.UserAgentValue)
        .GetJsonAsync<List<GitHubRelease>>()
        .Result;

    return JsonConvert.SerializeObject(result);
}
```

This way is rather terrible since we are serializing a result only to deserialize it a little bit later. If you are using a library such as Flurl, you shouldn’t be doing things this way.

A better way of doing things would be:

```cs
public List<GitHubRelease> GetDeserializedReleases(string url)
{
    var result = url
        .WithHeader(RequestConstants.UserAgent, RequestConstants.UserAgentValue)
        .GetJsonAsync<List<GitHubRelease>>()
        .Result;

    return result;
}
```

With `.Result` we are forcing the synchronous behavior of the code. The real and intended way to use Flurl would look like this:

```cs
public async Task<List<GitHubRelease>> GetDeserializedReleases(string url)
{
    var result = await url
        .WithHeader(RequestConstants.UserAgent, RequestConstants.UserAgentValue)
        .GetJsonAsync<List<GitHubRelease>>();

    return result;
}
```

Which shows off the full potential of the Flurl library.

If you want to learn more about how to use Flurl in different real-life scenarios, check out our [**Consuming GitHub API (REST) With Flurl**](/code-maze.com/consuming-github-api-rest-with-flurl.md) article

In summary, it’s like advertised: easy to use, modern, readable, and testable. What more can you expect of a library? To be open source? Check out the [Flurl repo (<FontIcon icon="iconfont icon-github"/>`tmenier/Flurl`)](https://github.com/tmenier/Flurl) and contribute if you like it!

---

## DalSoft.RestClient

Now this one is a bit different than anything on this list so far. But this one does it a bit differently.

Let’s see how we can use DalSoft.RestClient to consume the GitHub API and then talk about what we’ve done.

First things first, you can download DalSoft.RestClient either via NuGet Package Manager by typing : `Install-Package DalSoft.RestClient`

or via .NET Core CLI: `dotnet add package DalSoft.RestClient`

Either way is fine.

Once we have our library, we can do something like this:

```cs
public string GetReleases(string url)
{
    dynamic client = new RestClient(RequestConstants.BaseUrl,
        new Headers { { RequestConstants.UserAgent, RequestConstants.UserAgentValue } });

    var response = client.repos.restsharp.restsharp.releases.Get().Result.ToString();

    return response;
}
```

or preferably by using DalSoft.RestClient to deserialize the response immediately while utilizing its full power:

```cs
public async Task<List<GitHubRelease>> GetDeserializedReleases(string url)
{
    dynamic client = new RestClient(RequestConstants.BaseUrl,
        new Headers { { RequestConstants.UserAgent, RequestConstants.UserAgentValue } });

    var response = await client.repos.restsharp.restsharp.releases.Get();

    return response;
}
```

So, let’s talk about these examples a bit.

At first glance, it doesn’t seem much simpler than some other modern libraries that we’ve used.

But it comes down to the way form our requests and that’s by utilizing the dynamic nature of our RestClient. For example, our BaseUrl is `https://api.github.com` and we need to get to the `https://api.github.com/repos/restsharp/restsharp/releases`. We can do that by creating our client dynamically and then forming the Url by chaining “parts” of the Url:

```cs
await client.repos.restsharp.restsharp.releases.Get();
```

A pretty unique way to form a request. And a very flexible one too!

So, once we have our base Url set, we can play with different endpoints easily.

It’s also worth mentioning that the JSON response we get is automatically type-casted. As you can see in the second example, the return value of our method is `Task<List<GitHubReleases>>.` So the library is smart enough to cast the response to our type (relying on Json.NET). That makes our life much easier.

Besides being easy to understand and use, DalSoft.RestClient has everything a modern library should have. It is **configurable, asynchronous, extensible, testable and it supports multiple platforms**.

We’ve demonstrated just a small portion of the DalSoft.RestClient features. If this got you interested in using DalSoft.RestClient, head over to [**our article about it**](/code-maze.com/dalsoft-restclient-consume-any-rest-api.md) to learn how to use it in different scenarios, or refer to the [official GitHub repo (<FontIcon icon="iconfont icon-github"/>`DalSoft/DalSoft`)](https://github.com/DalSoft/DalSoft.RestClient) and [<FontIcon icon="fas fa-globe"/>documentation](https://restclient.dalsoft.io/).

---

## Other Options

There are a lot of other options available for your specific problems. You can use any of these libraries to consume a specific RESTful API. For example, [<FontIcon icon="iconfont icon-github"/>`octokit/octokit.net`](https://github.com/octokit/octokit.net) is used to work with GitHub API specifically, [Facebook SDK (<FontIcon icon="iconfont icon-github"/>`facebook-csharp-sdk/facebook-csharp-sdk`)](https://github.com/facebook-csharp-sdk/facebook-csharp-sdk) is used for consuming Facebook API and there are many others for almost anything.

While these libraries are made specifically for those APIs and may be great at doing what they are meant for, their usefulness is limited because you often need to connect with more than one [**API**](/code-maze.com/ultimate-aspnet-core-3-web-api.md) in your applications. This may result in having different implementations for each one, and more dependencies which potentially leads to repetitiveness and is error-prone. The more specific the library, the less flexibility it has.

::: info Source Code on GitHub

To download the source code for this article, you can visit our [GitHub repository (<FontIcon icon="iconfont icon-github"/>`CodeMazeBlog/ConsumeRestfulApisExamples`)](https://github.com/CodeMazeBlog/ConsumeRestfulApisExamples).

<SiteInfo
  name="CodeMazeBlog/ConsumeRestfulApisExamples"
  desc="Examples included the blog post: https://www.code-maze.com/different-ways-consume-restful-api-csharp"
  url="https://github.com/CodeMazeBlog/ConsumeRestfulApisExamples/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/f17633a1488e9e328470968f96aa257ce2a27fda304eeb5dc93b4f0a156a62f0/CodeMazeBlog/ConsumeRestfulApisExamples"/>

:::
---

## Conclusion

So, to summarize, we’ve talked about different tools you can use to consume a RESTful API. We’ve mentioned some .NET libraries that can do that like `HttpWebRequest`, `WebClient`, and `HttpClient`, as well as some of the amazing third-party tools like RestSharp and ServiceStack. We’ve also given you very short introductions to those tools and made some very simple examples to show you how you can start using them.

We consider you now at least 95% ready to consume some REST. Go forth and spread your wings, explore, and find even more fancy and interesting ways to consume and connect different APIs. Sleep restfully now, you know the way 🙂

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Few Great Ways to Consume RESTful API in C#",
  "desc": "RESTful APIs are an integral part of our lives. Because of that is important to know how to consume a RESTful API and which tools are at your disposal.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/different-ways-consume-restful-api-csharp.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
