---
lang: en-US
title: "What is an API and How Does it Work? APIs for Beginners"
description: "Article(s) > What is an API and How Does it Work? APIs for Beginners"
icon: iconfont icon-api
category:
  - API
  - Swagger
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - api
  - swagger
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What is an API and How Does it Work? APIs for Beginners"
    - property: og:description
      content: "What is an API and How Does it Work? APIs for Beginners"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-apis-work.html
prev: /explore/api/articles/README.md
date: 2022-12-06
isOriginal: false
author: Tooba Jamal
cover: https://freecodecamp.org/news/content/images/2022/12/api-article.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "API > Article(s)",
  "desc": "Article(s)",
  "link": "/explore/api/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What is an API and How Does it Work? APIs for Beginners"
  desc="When I started learning to code, the term API would always haunt me. I couldn't make sense of what it actually meant because I would hear people talking about APIs in different contexts.  The biggest challenge was that I couldn't find resources to le..."
  url="https://freecodecamp.org/news/how-apis-work"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://freecodecamp.org/news/content/images/2022/12/api-article.png"/>

When I started learning to code, the term API would always haunt me. I couldn't make sense of what it actually meant because I would hear people talking about APIs in different contexts.

The biggest challenge was that I couldn't find resources to learn about APIs in simple terms.

Now that I know how APIs work, I decided to write this guide for any newbies out there who are struggling to make sense of this not-so-complicated but still confusing topic in web development and software engineering.

---

## What is an API?

API stands for Application Programming Interface. The application can be any software that performs a specific task and the interface is a point where two applications communicate.

One application acts as a client and the other acts as a server. A client asks for some resource, say for example a photo, and the server sends that photo to the client.

The client here can be your mobile phone, desktop or laptop computer, or any device you use to surf the internet. And the server is a bigger computer that stores the data you want (a photo in our case).

![Unsplash search example](https://freecodecamp.org/news/content/images/2022/12/unsplash-1.png)

Suppose I want a nature photograph to upload to my travel blog. I might go onto the Unsplash website, type "nature: in the search bar, and it would return a large number of nature photographs.

That's an API working behind the scenes to make the conversation between Unsplash and me happen.

---

## How Do APIs Work?

Computers follow a protocol to communicate with each other. A protocol is nothing but a set of rules that computers follow to communicate. Any computer that doesn't follow the protocol breaks the communication thread.

You might have used Bluetooth to share data back in the day. Bluetooth is nothing but a protocol for mobile devices to communicate with each other at a shorter distance.

When you ask your friend to send you photos of their last trip, your device acts as a client, and your friend's device (the one that sends photos) is the server.

This is just an example of a protocol. We have a large number of protocols in the world of computer science – one for almost anything.

On the web, we use the HTTP protocol (which stands for Hyper Text Transfer Protocol). APIs available on the web use the HTTP protocol for a number of reasons - it's easy to use and it's popular, for example.

Communications that take place over the **HTTP protocol** are also known as the request-response cycle because this is exactly how the protocol works. The client sends a request to the server and the server responds to the client regarding that request.

Unlike humans, computers have to be rigid to communicate with each other or they break the communication. For this reason, a client (requesting computer/ device) needs a set of information to send with the request so the server responds accordingly. This information includes:

1. URL – a web address where you want to make a request
2. Method – whether you want data already stored somewhere or want to save new data in a database
3. Header – all the relevant information about your request including in what format the client device expects to receive the data
4. Body – the body contains the actual request data

In our Unsplash example, the URL is [https://unsplash.com/s/photos/nature](https://unsplash.com/s/photos/england). The method is GET because we want the server to get nature images back. The header includes information like the format our computer expects to get and accept – like language meaning, the language of the device, our operating system, and so on. The body includes the data we need to send to the server, the nature keyword for example.

There are four types of methods for HTTP requests which we will get back to in a moment. For now, just know that a method indicates what you want to do with the data available on the server. For example, whether you want that data as documents or you want to save a new entry in data saved somewhere.

When a client makes a request, the server responds to that request. The response might be the data the client requested or an error.

Just like a response, a request has a structure including a URL, status code, header and body. In a request, we have a method, which has four types. And in the response, we have a status code which indicates whether a request has been accepted or declined.

### HTTP methods

There are four available HTTP methods, and each has its unique functionality.

1. GET: as already discussed, this indicates that the client is requesting data to be sent from the server.
2. POST: this method tells the server that the client wants to create a new entry in a database. For example, saving a new blog post in a database of all previous blogs.
3. DELETE: as the name suggests, the client wants to delete a data record from a database.
4. PUT: this method is used when a client wants to update or edit a data record. For example, changing your Facebook password.

### HTTP status codes

There is a huge list of HTTP status codes, but let's look at a few of the most common:

1. 200 OK: this indicates that the request was successfully fulfilled by the server
2. 201 CREATED: the data entry that you requested to create was created
3. 404 NOT FOUND: this indicates that the resource you requested wasn't found by the server
4. 500 INTERNAL SERVER ERROR: this means that an error occured at the server's end and it couldn't fulfill your request

There is no need to memorize these status codes, as the list is huge and you will subconsciously learn them as you encounter them in your development journey.

Still, there is a range of status codes that indicates a generic response, as you can see here:

1. 100s: Informational responses, indicating the request's progress
2. 200s: Success, indicating the request's success
3. 300s: Redirection, indicating the request had to redirect somewhere else
4. 400s: Client errors, indicating errors that occurred on the client side
5. 500s: Server errors, when the server fails to respond to a valid client request

---

## Types of APIs

Remember how I told you that I got confused when people would talk about APIs in different contexts? That's because we have different types of APIs available as well.

The ones we talked about in this article are web APIs that use the HTTP protocol. Developers can use them to create a better user experience for their users.

Other types include internal APIs that are hidden from external users and that are used within a company only.

There are also open APIs that are available to be used by anyone for free (like the open weather map API). You can have partner APIs that are shared among business partners only to carry out their business tasks, and composite APIs that sequentially combine multiple API requests into a single API call to reduce server load and create a faster experience.

::: info Resources to learn more about APIs

If you want to learn more about how to design APIs, [here's a full book for you to get started](/freecodecamp.org/rest-api-design-best-practices-build-a-rest-api.md).

And you can learn more about [types of APIs, testing tools, and documentation here](/freecodecamp.org/what-is-an-api-and-how-to-test-it.md).

Here's a tutorial that'll [teach you all about REST APIs](/freecodecamp.org/rest-api-tutorial-rest-client-rest-service-and-api-calls-explained-with-code-examples.md).

And here's a [Fetch API cheatsheet](/freecodecamp.org/fetch-api-cheatsheet.md) to get you started learning about Fetch.

:::

---

## Conclusion

An API is an interface for two computers to communicate in order to carry out tasks on the internet.

APIs follow the HTTP protocol to communicate, which has a specific request and response structure.

Different methods exist to perform different tasks and numerous status codes are available that indicate whether the request is successful, declined, or in a pending state.

Interested in connecting on LinkedIn? Hit me up at [Tooba Jamal (<FontIcon icon="fa-brands fa-linkedin"/>`tooba-jamal`)](https://linkedin.com/in/tooba-jamal/).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What is an API and How Does it Work? APIs for Beginners",
  "desc": "When I started learning to code, the term API would always haunt me. I couldn't make sense of what it actually meant because I would hear people talking about APIs in different contexts.  The biggest challenge was that I couldn't find resources to le...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-apis-work.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
