---
lang: ko-KR
title: "Blazor Server vs Blazor WebAssembly, Pros and Cons"
description: "Article(s) > Blazor Server vs Blazor WebAssembly, Pros and Cons"
icon: iconfont icon-blazor
category: 
  - C#
  - Blazor
  - Article(s)
tag: 
  - blog
  - code-maze.com
  - cs
  - c#
  - csharp
  - blazor
  - fe
head:  
  - - meta:
    - property: og:title
      content: "Article(s) > Blazor Server vs Blazor WebAssembly, Pros and Cons"
    - property: og:description
      content: "Blazor Server vs Blazor WebAssembly, Pros and Cons"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/blazor-webassembly-introduction.html
prev: /programming/cs-blazor/articles/README.md
date: 2020-06-08
isOriginal: false
author:
  - name: Marinko Spasojević
    url : https://code-maze.com/author/marinko/
cover: /assets/image/code-maze.com/blazor-webassembly-introduction/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Blazor > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/cs-blazor/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Blazor Server vs Blazor WebAssembly, Pros and Cons"
  desc="In this article, we will learn about the Blazor framework, the different Blazor projects, and compare Blazor Server vs Blazor WebAssembly"
  url="https://code-maze.com/blazor-webassembly-introduction/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/blazor-webassembly-introduction/banner.png"/>

In this article, we are going to talk about what is Blazor, we will compare Blazor Server vs Blazor WebAssembly and show some pros and cons.

Usually, while developing a web application, we create a server-side project using Java, .NET, Node.js, or some other framework or language. We want to use that server-side project to show some data in a browser by using a javascript framework like Angular, React, or Vue.js. And this is just fine, moreover, it is a great solution.

But, we can’t use the language we used for the server-side application in the client-side application. So, there is a fundamental disconnect between these two.

So, wouldn’t it be great if we could use the same language for the server and client-side applications and reuse our knowledge? Well, we believe it would. We can achieve that by using WebAssembly. It is a native part of all the major browsers and it allows us to reuse our code from the server-side applications.

To explore all the articles from this series, you can visit our [**Blazor WebAssembly Series Page**](/code-maze.com/blazor-webassembly-series.md).

Let’s start.

---

## What is Blazor and Why Should We Use It?

Blazor is a free and open-source framework that allows us to build **interactive web applications using C#**. So, we can use C# to write both server and client code in Blazor. We achieve that by having **.NET runtime compiled into the WebAssembly bytecode**. The .NET runtime executes in the browser and can run any .NET DLL we provide to it, including the C# code that we create with our Blazor applications.

So, this is one of the reasons to use Blazor.

But there are more.

With the Blazor WebAssembly, we can run our applications in many major browsers without additional plugins. Furthermore, we can use any library we want, as long as it is compatible with the [**.NET standard**](/code-maze.com/differences-between-net-framework-net-core-and-net-standard.md). This means we can use the libraries we created and a large number of NuGet packages as well.

Of course, performance plays a great role in choosing a framework for web development. That said, the ability to run Blazor in WebAssembly only proves the fact that it is pretty fast at almost native speed.

As we said, the Blazor application runs in WebAssembly, and WebAssembly runs in the JavaScript sandbox as any other JavaScript code. Because of this connection with JavaScript, **our application can access the capabilities of the browser like web sockets, file API, and DOM**. Additionally, our application can call the JavaScript code and vice versa.

---

## Different Models of Blazor Applications

So, as we already mentioned, there are different models of Blazor applications:

- The Blazor Server Application
- Blazor WebAssembly
- And Blazor Hybrid 

We will dedicate our attention to the first two models.

---

## Blazor Server

Let’s explain a server-side Blazor first.

This type of application executes fully on the server within the ASP.NET Core application. To communicate with the HTML, the server-side application uses SignalR. This is provided through the JavaScript file called <FontIcon icon="fa-brands fa-js"/>`blazor.server.js`. If you are not familiar with the SignalR, we strongly recommend reading our [**SignalR Real-Time Charts with ASP.NET Core and Angular**](/code-maze.com/netcore-signalr-angular.md) article, where you can learn more about it and its implementation.

Because the server-side application remains in the memory all the time, the instance is created per user while the client-server interaction is happening.

### Benefits of Blazor Server Applications

So, the benefit of this type of application is **that the download size is really small, significantly smaller than the Blazor WebAssembly**, which means the application loads much faster.

Because it runs on the server-side, **it uses all the advantages of server capabilities with all the server-side APIs available**.

Additionally, we have full debugging support and our application can work on browsers that don’t support WebAssembly. This means, **older browsers are supported.**

Of course, there are some downsides.

### Downsides of Blazor Server Applications

Since it runs on the server, **it must be connected to the server all the time**, so there’s no offline support.

Each interaction must go to the server which can cause network delays.

Scalability can be a challenge because an application instance is created per user. But this shouldn’t be that much of a problem because the server-side app should support thousands of concurrent users (information from the Microsoft developers).

Finally, **serverless deployment isn’t possible.** ASP.NET Core server is required to serve the app.

---

## Blazor WebAssembly

This type of application runs on the client in the browser with the help of WebAssembly. As soon as the application starts it downloads everything to the browser (HTML, CSS, and JavaScript files) and it also downloads the assembly (.NET Standard DLL) files required for the application.

So, once the application starts, it can work in offline mode, meaning, it **doesn’t require the server**. Because this type of application is composed of static files, **we can deploy it to the CDN or Server, or Azure Storage for static websites**.

So, as with the server-side Blazor application, the Blazor WebAssembly has its benefits and downsides.

### Benefits of Blazor WebAssembly Applications

The first benefit is that this type of application is **very fast**, with the speed almost like the native browser applications.

As we’ve said, the Blazor WebAssembly **can work in offline mode**, which means it doesn’t require a connection to the server.

Additionally, **serverless deployment is possible**, which means you don’t need a server, just something to get the files to the browser.

Finally, this type of application can run in all modern browsers without additional plugins. This makes deployment easy on all sorts of devices.

### Downsides of Blazor WebAssembly Applications

Since this type of application runs only in the browser, **it is restricted to the browser’s capabilities**.

Another thing is that everything executes in the browser. **This could be a downside if the application does some heavy lifting**, and our browser may not have enough resources to support that.

An additional downside is that Blazor WebAssembly downloads all the files to the client, meaning **loading times are longer**.

Finally, because WebAssembly is required to run this type of application, older browsers (without WebAssembly support) can’t run the Blazor WebAssembly applications. That said if our application requires running on an older browser then it is a better choice to use the Blazor server-side application.

---

## Blazor Server vs Blazor WebAssembly

To show the differences between these two application types, we are going to create both of them.

The creation process is the same as for any other ASP.NET Core application. We have to choose between the Blazor project type:

![Choosing Blazor Server or Blazor WebAssembly project type](/assets/image/code-maze.com/blazor-webassembly-introduction/02-Choosing-Blazor-Project-Type-e1624264849526.png)

And then just name the project, select the framework, and click the Create button.

For the first application, we are going to choose the Blazor Server App, and for the second, we are going to choose the Blazor WebAssembly App.

Now, let’s open both applications and inspect the differences.

If we inspect the <FontIcon icon="fas fa-folder-open"/>`www/root` folders of both applications, we can see that the WebAssembly application has the <FontIcon icon="fa-brands fa-html5"/>`index.html` file which doesn’t exist in the server-side app:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>BlazorApp2</title>
    <base href="/" />
    <link href="css/bootstrap/bootstrap.min.css" rel="stylesheet" />
    <link href="css/app.css" rel="stylesheet" />
    <link href="BlazorApp2.styles.css" rel="stylesheet" />
</head>

<body>
    <div id="app">Loading...</div>

    <div id="blazor-error-ui">
        An unhandled error has occurred.
        <a href="" class="reload">Reload</a>
        <a class="dismiss">🗙</a>
    </div>
    <script src="_framework/blazor.webassembly.js"></script>
</body>

</html>
```

This file contains the reference to the <FontIcon icon="fa-brands fa-js"/>`blazor.webassebly.js` file that is responsible for downloading all of the application’s assets. This .js file also initiates the runtime to start the application.

A similar thing happens on the server-side application in the <FontIcon icon="fas fa-folder-open"/>`Page/`<FontIcon icon="fa-brands fa-html5"/>`_Layout.cshtml` file:

```html title="Page/_Layout.cshtml"
@using Microsoft.AspNetCore.Components.Web
@namespace BlazorApp1.Pages
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base href="~/" />
    <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css" />
    <link href="css/site.css" rel="stylesheet" />
    <link href="BlazorApp1.styles.css" rel="stylesheet" />
    <component type="typeof(HeadOutlet)" render-mode="ServerPrerendered" />
</head>
<body>
    @RenderBody()

    <div id="blazor-error-ui">
        <environment include="Staging,Production">
            An error has occurred. This application may no longer respond until reloaded.
        </environment>
        <environment include="Development">
            An unhandled exception has occurred. See browser dev tools for details.
        </environment>
        <a href="" class="reload">Reload</a>
        <a class="dismiss">🗙</a>
    </div>

    <script src="_framework/blazor.server.js"></script>
</body>
</html>
```

This file references the <FontIcon icon="fa-brands fa-js"/>`blazor.server.js` file (which we talked about), and it establishes the client WebSocket connection to the server.

If we inspect the <FontIcon icon="fas fa-folder-open"/>`Pages` folder of both projects, we can see they have the same files (FetchData, Index, Counter). This means we can reuse our component files from one to another project without any problem.

### Download Files Inspection

Finally, let’s run the server-side application and inspect the downloaded files:

![Server app downloaded files](/assets/image/code-maze.com/blazor-webassembly-introduction/05-Server-app-downloaded-files.png)

We can see what files it downloads while starting.

Now, let’s run and inspect the client application:

![Blazor WebAssembly application downloaded files](/assets/image/code-maze.com/blazor-webassembly-introduction/06-Client-app-downloaded-files.png)

And, we can see a few files as well with a size of 125 KB (This can vary depending on the .NET version you use). This is very nice, but if we take a look at the console window, we are going to find the true size of the downloaded files (this can vary as well).

So why is this different, can you tell?

The answer lies in the cached files. **Blazor WebAssembly caches files for a faster application load**. We can see that in the Application tab, under the Cache section:

![Cached files in Blazor WebAssembly Project](/assets/image/code-maze.com/blazor-webassembly-introduction/07-Cached-files.png)

This helps improve the application load time a lot.

---

## Conclusion

So, that is all for this introduction part of the Blazor series.

You have learned about Blazor, about different hosting models, and what are the differences between them. With this knowledge, we are ready to dive into the project and get some practical knowledge.

That said, in the next article, we are going to learn about the [**Blazor components, different ways to use parameters in the application, and how to debug the Blazor WASM application**](/code-maze.com/blazor-components.md).

Well, see you there.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Blazor Server vs Blazor WebAssembly, Pros and Cons",
  "desc": "In this article, we will learn about the Blazor framework, the different Blazor projects, and compare Blazor Server vs Blazor WebAssembly",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/blazor-webassembly-introduction.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

