---
lang: en-US
title: "HTTP - Overview of the Basic Concepts"
description: "Article(s) > HTTP - Overview of the Basic Concepts"
icon: fas fa-computer
category: 
  - Engineering
  - Computer
  - Article(s)
tag: 
  - blog
  - code-maze.com
  - engineering
  - coen
  - computerengineering
  - computer-engineering
head:  
  - - meta:
    - property: og:title
      content: "Article(s) > HTTP - Overview of the Basic Concepts"
    - property: og:description
      content: "HTTP - Overview of the Basic Concepts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/http-series-part-1.html
prev: /academics/coen/articles/README.md
date: 2017-06-19
isOriginal: false
author:
  - name: Vladimir Pecanac
    url : https://code-maze.com/author/codemaze_blog/
cover: /assets/image/code-maze.com/http-series-part-1/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="HTTP - Overview of the Basic Concepts"
  desc="In the world driven by the Internet, messages are being sent between clients and servers countless times per day via HTTP."
  url="https://code-maze.com/http-series-part-1/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/http-series-part-1/banner.png"/>

In this article, we will go through the basic concepts of HTTP.

---

## But why HTTP?

Why should I read about HTTP you may ask yourself?

Well, if you are a software developer, you will understand how to write better applications by learning how they communicate. If you are a system architect or network admin, you will get deeper knowledge of designing complicated network architectures.

REST, which is a very important architectural style nowadays is relying completely on utilizing HTTP features, which makes HTTP even more important to understand. If you want to make great [**RESTful applications**](/code-maze.com/top-rest-api-best-practices.md#whatdoesitmean), you must understand HTTP first.

I should note that REST doesn’t rely on HTTP only. It can be implemented using other protocols, but it seems that HTTP won that battle by a fair margin, and you’ll hardly find the REST implementation using other protocols.

So are you willing to pass on the chance to understand and learn the fundamental concepts of the World Wide Web and network communication?

I hope not 🙂

The article will focus on the most important parts of HTTP and attempt to explain them as simply as possible. The idea is to organize all the useful information about HTTP in one place, to save you the time of going through books and RFCs to find the information you need.

This is the first article of the [**HTTP series**](/code-maze.com/http-series.md). It gives a short introduction to the basic concepts of HTTP.

Without further ado, let’s dive in.

---

## HTTP Definition

The founder of HTTP is [<FontIcon icon="fa-brands fa-wikipedia-w"/>Tim Berners-Lee](https://en.wikipedia.org/wiki/Tim_Berners-Lee) (the guy also considered to be the inventor of the World Wide Web). Among other names important to the development of HTTP is also [<FontIcon icon="fa-brands fa-wikipedia-w"/>Roy Fielding](https://en.wikipedia.org/wiki/Roy_Fielding), who is also the originator of the REST architectural style.

**The Hypertext Transfer Protocol** is the protocol that applications use to communicate with each other. In essence, HTTP is in charge of delegating all of the internet’s media files between clients and servers. That includes HTML, images, text files, movies, and everything in between. And it does this quickly and reliably.

HTTP is the **application protocol** and not the transport protocol because we are using it for communication in the application layer. To jog your memory here is what the Network Stack looks like.

![Network stack](/assets/image/code-maze.com/http-series-part-1/Network-stack.png)

From this image, you can clearly see that HTTP is the application protocol and that TCP works on the transport layer.

---

## Resources

![](/assets/image/code-maze.com/http-series-part-1/resource-1024x475.jpg)

Everything on the internet is a resource, and HTTP works with resources. That includes files, streams, services, and everything else. An HTML page is a resource, a youtube video is a resource, your spreadsheet of daily tasks on a web application is a resource… You get the point.

And how do you differentiate one resource from another?

By giving them URLs (Uniform resource locators).

A URL points to the unique location where the resource is located.

---

## How To Exchange Messages Between a Web Client and a Web Server

Every piece of content, and every resource lives on some Web server (HTTP server). These servers are expecting requests for those resources.

But how do you request a resource from a Web server?

You need a client of course 🙂

You are using an HTTP client right now to read this article. Web browsers are HTTP clients. They communicate with HTTP servers to fetch the resources to your computer. Some of the most popular clients are Google’s Chrome, Mozilla’s Firefox, Opera, Apple’s Safari, and unfortunately still the infamous Internet Explorer.

---

## Some Message Examples

So what does an HTTP message look like?

Without talking too much about it, here are some examples of HTTP messages:

### GET request

```http
GET /repos/CodeMazeBlog/ConsumeRestfulApisExamples HTTP/1.1
Host: api.github.com
Content-Type: application/json
Authorization: Basic dGhhbmtzIEhhcmFsZCBSb21iYXV0LCBtdWNoIGFwcHJlY2lhdGVk
Cache-Control: no-cache
```

### POST request

```http
POST /repos/CodeMazeBlog/ConsumeRestfulApisExamples/hooks?access_token=5643f4128a9cf974517346b2158d04c8aa7ad45f HTTP/1.1
Host: api.github.com
Content-Type: application/json
Cache-Control: no-cache

{
  "url": "http://www.example.com/example",
  "events": [
    "push"
  ],
  "name": "web",
  "active": true,
  "config": {
    "url": "http://www.example.com/example",
    "content_type": "json"
  }
}
```

Here is an example of one `GET` and one `POST` request. Let’s go quickly through the different parts of these requests.

The first line of the request is reserved for the **request line**. It consists of the [**request method**](/code-maze.com/the-http-reference.md#requestmethods) name**, the request URI,** and **the HTTP version.**

The next few lines represent the [**request headers**](/code-maze.com/the-http-reference.mdheaders). Request headers provide additional info to the requests, like the content types the request expects in response, authorization information, etc,

For a `GET` request, the story ends right there. A `POST` request can also have a body and carry additional info in the form of a body message. In this case, it is a JSON message with additional info on how to create the GitHub webhook for the given repo specified in the URI. That message is required for the webhook creation so we are using a POST request to provide that information to the GitHub API.

The Request line and request headers must be followed by `<CR><LF>` (carriage return and line feed `\r\n`), and there is a single empty line between the message headers and the message body that contains only `CRLF`.

::: info Reference for an HTTP request

```component VPCard
{
  "title": "HTTP/1.1: Request",
  "desc": "A request message from a client to a server includes, within the first line of that message, the method to be applied to the resource, the identifier of the resource, and the protocol version in use.",
  "link": "https://w3.org/Protocols/rfc2616/rfc2616-sec5.html",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(47,93,149,0.2)"
}
```

:::

And what do we get as a response to these requests?

### Response message

```http
HTTP/1.1 200 OK
Server: GitHub.com
Date: Sun, 18 Jun 2017 13:10:41 GMT
Content-Type: application/json; charset=utf-8
Transfer-Encoding: chunked
Status: 200 OK
X-RateLimit-Limit: 5000
X-RateLimit-Remaining: 4996
X-RateLimit-Reset: 1497792723
Cache-Control: private, max-age=60, s-maxage=60

[
  {
    "type": "Repository",
    "id": 14437404,
    "name": "web",
    "active": true,
    "events": [
      "push"
    ],
    "config": {
      "content_type": "json",
      "insecure_ssl": "0",
      "url": "http://www.example.com/example"
    },
    "updated_at": "2017-06-18T12:17:15Z",
    "created_at": "2017-06-18T12:03:15Z",
    "url": "https://api.github.com/repos/CodeMazeBlog/ConsumeRestfulApisExamples/hooks/14437404",
    "test_url": "https://api.github.com/repos/CodeMazeBlog/ConsumeRestfulApisExamples/hooks/14437404/test",
    "ping_url": "https://api.github.com/repos/CodeMazeBlog/ConsumeRestfulApisExamples/hooks/14437404/pings",
    "last_response": {
      "code": 422,
      "status": "misconfigured",
      "message": "Invalid HTTP Response: 404"
    }
  },
]
```

The response message is pretty much structured the same as the request, except the first line, called the **status line,** which surprising as it is, carries information about the [**response status**](/code-maze.com/the-http-reference.md#statuscodes).

**Response headers** and **response body** come right after the status line.

::: info Reference for HTTP response

```component VPCard
{
  "title": "HTTP/1.1: Request",
  "desc": "After receiving and interpreting a request message, a server responds with an HTTP response message.",
  "link": "https://w3.org/Protocols/rfc2616/rfc2616-sec6.html",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(47,93,149,0.2)"
}
```

:::

---

## MIME Types

MIME types represent a standardized way to describe the file types on the internet. Your browser has a list of MIME types and the same goes for web servers. That way we can transfer files in the fashion regardless of the operating system.

A fun fact is that MIME stands for the Multipurpose Internet Mail Extension because they were originally developed for multimedia email. They were adapted to be used for HTTP and several other protocols since.

Every MIME type consists of a **type**, **subtype,** and a list of **optional parameters** in the following format: **type/subtype;** optional parameters.

Here are a few examples:

```plaintext
Content-Type: application/json
Content-Type: text/xml; charset=utf-8
Accept: image/gif
```

You can find the list of commonly used MIME types and subtypes in the [**HTTP reference**](/code-maze.com/the-http-reference.md#mimetypes).

---

## Request Methods

HTTP request methods (referred to also as “verbs”) define the action that will be performed on the resource. [**HTTP defines several request methods**](/code-maze.com/the-http-reference.md#requestmethods). The most commonly known/used are `GET` and `POST` methods.

A request method can be idempotent or not idempotent. This is just a fancy term for explaining that the method is safe/unsafe to be called several times on the same resources. In other words, that means that `GET` a method, that has the sole purpose of retrieving information, should by default be idempotent. Calling `GET` on the same resource over and over should not result in a different response. On the other hand, the POST method is not an idempotent method.

Prior to HTTP/1.1, there were just three methods: `GET`, `POST`, and `HEAD`, and the specification of HTTP/1.1 brought a few more methods into the play: `OPTIONS`, `PUT`, `DELETE`, `TRACE`and `CONNECT`.

Find more about how each one of these methods works in the [**HTTP Reference**](/code-maze.com/the-http-reference.md#requestmethods).

---

## Headers

Header fields are colon-separated name-value fields you can find just after the first line of a request or response message. They provide more context to the messages and inform clients and servers about the nature of the request or response.

There are five types of headers:

- **General headers:** These headers are useful to both the server and the client. One good example is the Date header field which provides information about the time of the message creation.
- **Request headers:** Specific to the request messages. They provide the server with additional information. For example, the `Accept: */*` header field informs the server that the client is willing to receive any media type.
- **Response headers:** Specific to the response messages. They provide the client with additional information. For example, the `Allow: GET, HEAD, PUT` header field informs the client which methods are allowed for the requested resource.
- **Entity headers:** These headers deal with the entity-body. For example, the `Content-Type: text/html` header lets the application know that the data is an HTML document.
- **Extension headers:** These are nonstandard headers application developers can construct. Although they are not part of HTTP, it tolerates them.

You can find the list of commonly used request and response headers in the [**HTTP Reference**](/code-maze.com/the-http-reference.md#headers).

---

## Status Codes

![404batman](/assets/image/code-maze.com/http-series-part-1/tumblr_ntqxdoCovo1udik9co2_1280-1024x683.jpg)

A **status code** is a three-digit number that denotes the result of a request. The reason **phrase** which is a humanly readable status code explanation comes right after.

Some examples include:

- `200 OK`
- `404 Not Found`
- `500 Internal Server Error`

The status codes are classified by the range in five different groups.

Both the status code classification and the entire list of status codes and their meaning can be found in the [**HTTP Reference**](/code-maze.com/the-http-reference.md#statuscodes).

---

## Conclusion

Phew, that was a lot of information.

The knowledge you gain by learning HTTP basic concepts is not the kind that helps you to solve some problems directly. But it gives you an understanding of the underlying principle of internet communication which you can apply to almost every other problem on a higher level than HTTP. Whether it is REST, APIs, web application development, or network, you can now be at least a bit more confident while solving these kinds of problems.

Of course, HTTP is a pretty large topic to talk about and there is still a lot more to it than the basic concepts.

Read about the architectural aspects of HTTP in [**part 2**](/code-maze.com/http-series-part-2.md) of the [**series**](/code-maze.com/http-series.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "HTTP - Overview of the Basic Concepts",
  "desc": "In the world driven by the Internet, messages are being sent between clients and servers countless times per day via HTTP.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/http-series-part-1.html",
  "logo": "/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```
