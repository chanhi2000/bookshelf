---
lang: en-US
title: "HTTP Authentication Mechanisms"
description: "Article(s) > HTTP Authentication Mechanisms"
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
      content: Article(s) > HTTP Authentication Mechanisms
    - property: og:description
      content: HTTP Authentication Mechanisms
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/code-maze.com/http-authentication.html
prev: /academics/coen/articles/README.md
date: 2017-07-18
isOriginal: false
author:
  - name: Vladimir Pecanac
    url : https://code-maze.com/author/codemaze_blog/
cover: /assets/image/code-maze.com/http-authentication/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Computer Engineering > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/coen/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="HTTP Authentication Mechanisms"
  desc="HTTP has its own authentication mechanisms that allow the servers to issue challenges and get the proof they need to identify the users."
  url="https://code-maze.com/http-authentication/"
  logo="/assets/image/code-maze.com/favicon.png"
  preview="/assets/image/code-maze.com/http-authentication/banner.png"/>

In the [**previous part**](/code-maze.com/http-series-part-3.md), we’ve talked about the different ways that websites can use to identify the visiting user. But identification itself represents **just a claim**. When you identify yourself, you are **claiming** that you are someone. But there is no proof of that. Authentication, on the other hand, is **showing proof** that you are what you claim to be, like showing your personal ID or typing in your password.

More often than not, the websites need that proof to serve you sensitive resources.

HTTP has its own authentication mechanisms that allow the servers to issue challenges and get the proof they need. In this article, you are going to learn about what they are and how they work. We’re also going to cover the pros and cons of each one and find out if they are really good enough to use on their own (spoilers: they are not).

Before venturing deeper into the concrete HTTP authentication mechanisms, let’s explore what the HTTP authentication is.

---

## How Does the HTTP Authentication Work?

Authentication is a way to identify yourself to the Web server. You need to show proof that you have the right to access the requested resources. Usually, this is done by using a combination of username and password (key and secret) which the server validates and then decides if you can access the resource.

HTTP offers two authentication protocols:

- **Basic Authentication**
- **Digest Authentication**

Before learning more about each one, let’s go through some of the basic concepts.

### Challenge/Response Authentication Framework

What does this mean?

It means that when someone sends a request, instead of responding to it immediately, the server sends a **challenge**. It challenges the user to provide proof of identity by entering the secret information (username and password).

After that, the request is repeated using the provided credentials, and if they are correct, the user gets the expected response. In case the credentials are wrong, the server can reissue the challenge or just send the error message.

### Authentication Related request/response headers)

The server issues the challenge by utilizing the **WWW-Authenticate response header.** It contains information about the protocol and the security realm.

After the client inputs the credentials, the request is sent again. This time with the **Authorization header** containing the algorithm and the username/password combination.

If the credentials are correct, the server returns the response and additional info in an optional **Authentication-Info response header**.

### Security Realms

Security realms provide a **way to associate different access rights to different resource groups** on the server. These are called protection spaces.

What this means effectively is that depending on the resource you want to access, you might need to enter different credentials.

The server can have multiple realms. For example, one would be for website statistics information that only website admins can access. Another would be for website images that other users can access and upload images to.

```plaintext
/admin/statistics/financials.txt -> Realm=”Admin Statistics”
```

```plaintext
/images/img1.jpg -> Realm = “Images”
```

When you try to access the financials.txt the server will challenge you and the response would look like this:

```plaintext
HTTP/1.0 401 Unauthorized
WWW-Authenticate: Basic realm="Admin Statistics"
```

::: info More about security realms

<SiteInfo
  name="RFC 7235: Hypertext Transfer Protocol (HTTP/1.1): Authentication"
  desc="The Hypertext Transfer Protocol (HTTP) is a stateless application- level protocol for distributed, collaborative, hypermedia information systems. This document defines the HTTP Authentication framework."
  url="https://datatracker.ietf.org/doc/html/rfc7235/"
  logo="https://static.ietf.org/dt/12.47.0/ietf/images/ietf-logo-nor-16.png"
  preview="https://static.ietf.org/dt/12.47.0/ietf/images/ietf-logo-card.png"/>

:::

### Simple HTTP Authentication example

Now let’s connect the dots by looking at the simplest HTTP authentication **example** (Basic authentication, explained below):

::: tip 1. User Agent -> Server

The user requests access to an image on the server.

```plaintext
GET /gallery/personal/images/image1.jpg HTTP/1.1
Host: www.somedomain.com
```

:::

::: tip 2. Server -> User Agent

The server sends the challenge to the user.

```plaintext
HTTP/1.1 401 Access Denied
WWW-Authenticate: Basic realm="gallery"
```

:::

::: tip 3. User Agent -> Server

The user identifies itself via form input.

```plaintext
GET /gallery/personal/images/image1.jpg HTTP/1.1
Authorization: Basic Zm9vOmJhcg==
```

:::

::: tip 4. Server -> User Agent

The server checks the credentials and sends the [**200 OK status code**](/code-maze.com/the-http-reference.md#status-codes) and the image data.

```plaintext
HTTP/1.1 200 OK
Content-type: image/jpeg
...<image data>
```

:::

Not that complicated, right?

Now let’s drill down and look into basic authentication.

---

## Basic Authentication

The most prevalent and supported protocol out there. It has been around since HTTP/1.0 and every major client implements it.

The example above depicts how to authenticate by using Basic authentication. It’s [<VPIcon icon="fas fa-globe"/>rather simple to implement and use](https://rdegges.com/2015/why-i-love-basic-auth/), but it has some security flaws.

Before going to the security issues, let’s see how the Basic authentication deals with username and password.

Basic authentication packs the username and password into one string and separates them using the colon (:). After that, it encodes them using the [<VPIcon icon="fa-brands fa-wikipeida-w"/>Base64 encoding](https://en.wikipedia.org/wiki/Base64). Despite what it looks like, the scrambled sequence of characters is **not secure** and you can **decode it easily**.

The purpose of the Base64 encoding is not to encrypt, but to make the username and password HTTP compatible. The main reason for that is that you can’t use international characters in HTTP headers.

```plaintext
GET /gallery/personal/images/image1.jpg HTTP/1.1
Authorization: Basic Zm9vOmJhcg==
```

The “Zm9vOmJhcg==” from this example is nothing more than the Base64 encoded “foo:bar” string.

So anyone listening to the requests can easily decode and use the credentials.

Even worse than that, encoding the username and password wouldn’t help. A malicious third party **could still send the scrambled sequence to achieve the same effect**.

There is also **no protection against proxies** or any other type of attack that changes the request body and leaves the request headers intact.

So, as you can see, Basic authentication is a less-than-perfect authentication mechanism.

Still, despite that, you can use it to prevent accidental access to protected resources, and it offers a degree of personalization.

To make it more secure and usable, Basic authentication can be implemented by using HTTPS over SSL which we talk about in part 5 of the series.

Some would argue it’s only [<VPIcon icon="fas fa-globe"/>as secure as your transport mechanism](https://skorks.com/2009/08/is-basic-authentication-really-insecure).

---

## Digest Authentication

Digest authentication is a more secure and reliable alternative to simple but insecure Basic authentication.

So, how does it work?

Digest authentication uses **MD5 cryptographic hashing** combined with the usage of **nonces.** That way it hides the password information to prevent different kinds of malicious attacks.

This might sound a bit complicated, but it will get clearer when you see how it works on a simple example.

### Example

::: tip 1. User Agent -> Server

```plaintext
GET /dir/index.html HTTP/1.0
Host: localhost
```

The client sends an unauthenticated request.

:::

::: tip 2. Server -> User Agent

```plaintext
HTTP/1.0 401 Unauthorized
WWW-Authenticate: Digest realm="shire@middleearth.com",
                        qop="auth,auth-int",
                        nonce="cmFuZG9tbHlnZW5lcmF0ZWRub25jZQ",
                        opaque="c29tZXJhbmRvbW9wYXF1ZXN0cmluZw"
Content-Type: text/html
Content-Length: 153

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Error</title>
  </head>
  <body>
    <h1>401 Unauthorized.</h1>
  </body>
</html>
```

The server challenges the client to authenticate using the Digest authentication and sends the required information to the client.

:::

::: tip 3. User Agent -> Server

```plaintext
GET /dir/index.html HTTP/1.0
Host: localhost
Authorization: Digest username="Gandalf",
                     realm="shire@middleearth.com",
                     nonce="cmFuZG9tbHlnZW5lcmF0ZWRub25jZQ",
                     uri="/dir/index.html",
                     qop=auth,
                     nc=00000001,
                     cnonce="0a4f113b",
                     response="5a1c3bb349cf6986abf985257d968d86",
                     opaque="c29tZXJhbmRvbW9wYXF1ZXN0cmluZw"
```

The client calculates the response value and sends it together with username, realm, URI, nonce, opaque, qop, nc, and cnonce. A lot of stuff.

:::

### Detailed Explanation

Let’s define these:

- **nonce** and **opaque** – the server-defined strings that the client returns upon receiving them
- **qop (quality of protection)** – one or more of the predefined values (“auth” | “auth-int” | token). These values affect the computation of the digest.
- **cnonce** – client nonce, must be generated if qop is set. It is used to avoid [<VPIcon icon="fa-brands fa-wikipedia-w"/>chosen plaintext attacks](https://en.wikipedia.org/wiki/Chosen-plaintext_attack) and to provide message integrity protection.
- **nc** – nonce count, must be sent if qop is set.  This directive allows the server to detect request replays by maintaining its own copy of this count – if the same nc value appears twice, then the request is a replay.

The response attribute is calculated in the following way:

```plaintext
HA1 = MD5("Gandalf:shire@middleearth.com:Lord Of The Rings")
       = 681028410e804a5b60f69e894701d4b4

HA2 = MD5("GET:/dir/index.html")
       = 39aff3a2bab6126f332b942af96d3366

Response = MD5( "681028410e804a5b60f69e894701d4b4:
                 cmFuZG9tbHlnZW5lcmF0ZWRub25jZQ:
                 00000001:0a4f113b:auth:
                 39aff3a2bab6126f332b942af96d3366" )
         = 5a1c3bb349cf6986abf985257d968d86
```

If you are interested in learning how to compute the response depending on qop, you can find it in [<VPIcon icon="fas fa-globe"/>RFC 2617](https://ietf.org/rfc/rfc2617.txt).

4. Server -> User Agent

```plaintext
HTTP/1.0 200 OK
Content-Type: text/html
Content-Length: 2345
... <content data>
```

The server computes the hash on its own and compares the two. If they match it serves the client with the requested data.

### Short Summary

As you can see the Digest authentication is more complicated to understand and implement.

It is also more secure than Basic authentication, but still vulnerable to a [<VPIcon icon="fa-brands fa-wikipedia-w"/>man-in-the-middle attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack). [<VPIcon icon="fas fa-globe"/>RFC 2617](https://ietf.org/rfc/rfc2617.txt) recommends that **Digest authentication is used instead of Basic authentication** since it remedies some of its weaknesses. It also doesn’t hide the fact that **Digest authentication is still weak by modern cryptographic standards.** Its strength largely depends on the implementation.

So in summary digest authentication:

- Doesn’t send plain text passwords over the network
- Prevents replay attacks
- Guards against message tampering

Some of the weaknesses:

- Vulnerability to the man-in-the-middle attack
- Many of the security options are not required and thus make Digest authentication function in a less secure manner if not set
- Prevents the use of strong password hashing algorithms when storing passwords

Due to these facts, the Digest authentication still hasn’t gained major traction. The Basic authentication is much simpler and combined with SSL still more secure than the Digest authentication.

---

## Conclusion

That’s it for this part of the HTTP series.

We’ve gone through different authentication mechanisms that HTTP offers by default and talked about their advantages and disadvantages.

These concepts are hopefully not just the letters on the screen anymore, and the next time you hear about them you will know precisely what they are and when to apply them.

You are also aware that there are security risks that haven’t been solved by these authentication mechanisms. That’s why concepts like HTTPS and SSL/TLS exist. We talk more about security risks and how to solve them in the [**next part**](/code-maze.com/http-series-part-5.md) of the series.

If you found some of the concepts in this part unclear, refer to [**part 1**](/code-maze.com/http-series-part-1.md), [**part 2**](/code-maze.com/http-series-part-2.md), and [**part 3**](/code-maze.com/http-series-part-3.md) of the [**HTTP series**](/code-maze.com/http-series.md).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "HTTP Authentication Mechanisms",
  "desc": "HTTP has its own authentication mechanisms that allow the servers to issue challenges and get the proof they need to identify the users.",
  "link": "https://chanhi2000.github.io/bookshelf/code-maze.com/http-authentication.html",
  "logo": "https://chanhi2000.github.io/bookshelf/assets/image/code-maze.com/favicon.png",
  "background": "rgba(22,22,22,0.2)"
}
```

