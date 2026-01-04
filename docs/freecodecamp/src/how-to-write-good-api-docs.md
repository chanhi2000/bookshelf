---
lang: en-US
title: "How to Write Good API Documentation"
description: "Article(s) > How to Write Good API Documentation"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Write Good API Documentation"
    - property: og:description
      content: "How to Write Good API Documentation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/how-to-write-good-api-docs.html
prev: /academics/system-design/articles/README.md
date: 2025-05-03
isOriginal: false
author:
  - name: Okoro Emmanuel Nzube
    url : https://freecodecamp.org/news/author/Derekvibe/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1746108055356/29f327c1-60a5-4d0c-baef-431c0e61c1b4.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Desgin > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Write Good API Documentation"
  desc="Imagine purchasing a standing fan straight out of the box, all parts dismantled, and you have no manual or guide to put them together. Did you imagine that just now? Cool. Here is another scenario: imagine purchasing an LG product, such as a smart TV..."
  url="https://freecodecamp.org/news/how-to-write-good-api-docs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1746108055356/29f327c1-60a5-4d0c-baef-431c0e61c1b4.png"/>

Imagine purchasing a standing fan straight out of the box, all parts dismantled, and you have no manual or guide to put them together. Did you imagine that just now? Cool.

Here is another scenario: imagine purchasing an LG product, such as a smart TV without a guide on how to set it up and use the remote. Now you get the point.

The process of you trying to mount your fan or set up your smart TV will be a very frustrating and confusing one without any guidance. And most of the time, it’ll be hard to determine the full potential of the product you bought.

Now, keeping in mind the already painted scenarios, have you ever tried picking up a new programming language or using an unfamiliar API, only to find it confusing, and you felt completely overwhelmed at the beginning? Then you probably spent hours trying to piece things together, maybe via tutorials, but nothing seems to work perfectly due to the error messages you get…and you wonder if you’re doing the right thing.

But then you might have come across the product’s official documentation or maybe a properly written and well-structured guide (like this one you’re reading). Suddenly, everything clicks, you start writing code effortlessly or using the API with confidence. That’s it - the power of clear and concise documentation.

In this article, you will learn what an API is, how it works, what API documentation is all about, and how to create standard API documentation.

Before we continue, let’s deviate a bit to learn what APIs are all about, how they work, and the types of APIs that are out there.

---

## What is an API?

You might have heard the term API before, and you’re wondering what it’s all about. API stands for Application Programming Interface. An API acts as an interface between two programs that allows them to communicate. It is a mediator between the client (browsers/mobile application) and the server (backend).

### How APIs Work

So now you know that an API acts as a bridge or middleman that allows two systems to communicate with each other. When working with APIs, you’ll come across two key terms: **requests** and **responses.** These two keywords are essential to understand because they form the core of how APIs work.

Think of requests and responses like what you use in a regular day-to-day conversation. It’s just like how you ask questions (request) and an answer is provided (response). Same thing happens with APIs, but in this case, its an interaction between software systems.

To explain better how an API works, let’s use a weather app or a stock market app. This should provide a clear view of what we are talking about.

When you open a weather app and want to check the current weather, the app doesn’t store the weather data itself. Instead, it sends a request through an API to the weather database server. When the request is sent, the API now interacts/communicates with the database server and retrieves the latest weather information, which is then sent back to the weather app as a response. Then this info is finally displayed to you.

This should be a smooth, fast, and continuous process and has to occur simultaneously for your app to run smoothly. This means that a request must be made first before a response can be received. You can’t get a response without making a request.

The same process occurs for the stock market app as well.

![Image of How an API works](https://cdn.hashnode.com/res/hashnode/image/upload/v1745908659843/7aaad1e5-a18d-43fc-a74c-a416b9e19ce2.png)

### Types of APIs

APIs are categorised into two major types:

- By Use/Function
- By Access

#### Types of APIs by Use

- **Web APIs**: These are the most commonly used type of APIs and are also known as HTTP (Hypertext Transfer Protocol) APIs. This API enables communication over the internet with the use of HTTP. Examples of these APIs are REST APIs, GraphQL APIs, and so on.
- **Library or Framework APIs**: These are APIs provided by libraries or frameworks and are made use of by developers to build applications without having to build everything from scratch. Examples of this are React, JQuery, and so on.
- **Operating System APIs**: These are APIs built to allow systems/applications to communicate with operating systems. These APIs helps provide access to system-level resources, which is important for the application to function properly. Examples of these APIs are Android SDK, Windows API, and so on.
- **Hardware APIs**: These are APIs built to enable systems to communicate with the physical components of a hardware device. Examples of these APIs are Bluetooth APIs, Camera APIs, and so on.
- **Database APIs**: Just as the name states, they are APIs that allow applications to interact with the database. These APIs are essential and mostly used to store, retrieve, manage and update the database. Examples of these APIs are SQL-based APIs, NoSQL APIs, and so on.

#### Types of APIs by Access

- **Open APIs**: This can be seen as a public API and is also referred to as an external APIs. These are the types of APIs built and made available for anyone to use, therefore making them need little to no authorization and authentication. Based on the number of calls made to these APIs, some of them APIs are available for free while others are available at a specific cost (paid subscription).
- **Partner APIs**: These are types of APIs built and made available for just businesses that collaborate together. When this type of APIs are built, strong authentication and authorization process are put into consideration so as to avoid it from being accessed by the public.
- **Internal APIs**: The internal APIs can also be referred to as private APIs. These APIs are built and internally used by organization and are restricted from the public. These APIs are mostly used when there is communication between systems or Applications within the organization.
- **Composite APIs**: This is a type of API built in a way that it combines multiple API requests into a bundle and allows users to get one single response from different servers. This type of APIs is most commonly used when Devs needs to fetch data from multiple servers or data sources.

Now that we have broken down what APIs are, how they work, and their various types, let's move on to the main reason we’re here: learning about creating good API documentation.

---

## What is API Documentation?

API documentation is also referred to as developer documentation. It is a well-written and organized guide or manual that explains how an API works. It’s designed to help developers (or even non-developers) understand what the API does, how to use it, and how to integrate it into their own projects.

By using API documentations, you can explore and take full advantage of everything an API has to offer. API documentation also aims at speeding up the development process and boosting the overall productivity of a product.

API documentation provides a detailed explanation of the complete functionality of the API, which can include:

- The most efficient way to use the API
- How to integrate the API with your project.
- The purpose of the API and the inputs to be passed for developers to make good use of it.

---

## Examples of API Documentation

Here are some examples of API documentation to give you a better idea of what’s involved and what information these docs should provide.

### Stripe API Docs

This is an example of a Web/HTTP API. Stripe is a payment processing tool, and the [<VPIcon icon="fas fa-globe"/>Stripe API documentation](https://docs.stripe.com/api) provides a clean, interactive, and developer-friendly guide on how to make use of the API for payment integrations.

![Stripe API documentation Image](https://cdn.hashnode.com/res/hashnode/image/upload/v1745908370335/eb50afc2-30b8-41ba-8c53-fd47b0f643a4.png)

### React Docs

The [<VPIcon icon="fa-brands fa-react"/>React docs](https://react.dev/learn) are an example of a library or framework API. They provide a detailed guide to how you can use React in building your web project

![React API documentation image](https://cdn.hashnode.com/res/hashnode/image/upload/v1745908586648/b366b340-004b-4b88-8d6e-ab8eab8b04c1.png)

### Android SDK

This is an example of an Operating System API. The [<VPIcon icon="fa-brands fa-android"/>Android SDK Documentation](https://developer.android.com/reference) provides a detailed guide on how you can make use of the Android SDK API to build your Android app.

![Andriod SDK API documentation](https://cdn.hashnode.com/res/hashnode/image/upload/v1745908800051/c0707d78-6d29-4bf8-ace4-fa07d38e58bd.png)

### Web Bluetooth API

This is an example of a hardware API. The [<VPIcon icon="fa-brands fa-firefox" />Web Bluetooth API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API) provide a detailed guide on how to make use of the API to connect and interact with Bluetooth low energy peripherals.

![Web Bluetooth API Documentation](https://cdn.hashnode.com/res/hashnode/image/upload/v1745909018248/70c028d5-5c70-4441-949d-a89b2ba9a183.png)

### PostgreSQL API

This is an example of a Database API. The [<VPIcon icon="iconfont icon-postgresql"/>PostgreSQL API Docs](https://postgresql.org/docs/current/libpq-connect.html) provide developers with full details on what the API is all about, how they can effortlessly connect it with their application, and also the roadblocks they can encounter while using the API and how to overcome them.

![PostgreSQL API documentation](https://cdn.hashnode.com/res/hashnode/image/upload/v1745909167138/3004c153-8a7a-4814-b824-31fca6d11433.png)

---

## Benefits of Clear API Documentation

### Enhances the Developer Experience

Great API documentation makes a developer’s life much easier. It clearly explains what the API does, how it works, and how to use it - all of which help developers get up to speed quickly.

Instead of wasting time figuring things out or getting stuck, they can focus on building. It reduces frustration, boosts productivity, and even makes it easier to collaborate with teammates.

### Reduces the Learning Curve

Good API documentation helps reduce the learning curve for developers trying to use the API. This, in turn, leads to faster onboarding, saves time and money, and encourages higher adoption rates.

### Easy to Maintain

Good API documentation makes it easier to maintain both the API and any application the API is used in. Up-to-date docs help developers understand changes, fix bugs, and update features in their application with confidence.

### Provides Visibility for Your Product

Good API documentation increases the visibility of your product and encourages frequent use by making it easier for developers to understand and integrate it. It also promotes third-party integration, helping your product reach a wider audience.

---

## Key Components of API Documentation

There are many components that make up a good API documentation. In this section, we will walk through a real-world example of properly prepared API documentation: the Spotify Web API.

### Overview/Description and Uses of the API

This is the very first stage in writing good API documentation. This section explains to users what the API is all about and also has information about the type of resources it provides.

The overview section is usually short, perhaps 3-4 sentences, and it describes what the API is does, the available resources, its endpoints, and the methods attached to each endpoint. This helps bring you up to speed as to whether that particular API provides what you need to complete your project.

![Overview Example of an API Doc's description section](https://cdn.hashnode.com/res/hashnode/image/upload/v1745909576601/ad916148-11df-4c8f-985e-8f9714173e04.png)

As you can see, the Spotify API’s description explains how it helps you create applications that “can interact with Spotify’s streaming service, such as retrieving content metadata, creating and managing playlists, or controlling playback.”

### Endpoints

Endpoints are an important component in API documentation. Developers use them to communicate with other servers. They’re also used for data transfers. An Endpoint is referred to as the “touch point” in the communication channel between two servers.

When documenting an endpoint, it’s important to take note of the various components of the endpoints, as this increases the quality of your API documentation. The components of an endpoint include its `name`, `description`, `url`, `methods`, `parameters`, and so on.

For example, if you want to get the details of a user’s top artist, here’s how the endpoint looks:

```plaintext
GET https://api.spotify.com/v1/me/top/artists
```

Remember, we previously mentioned the key components that make up an API endpoint, such as the name, description, URL, and HTTP method. Let's take the Spotify endpoint URL above to see how these components are presented:

- **Name:** Get User's Top Artists
- **Description:** Retrieves the current user's most listened-to artists.
- **URL:** [<VPIcon icon="fa-brands fa-spotify"/>`https://api.spotify.com/v1/me/top/artists`](https://api.spotify.com/v1/me/top/artists)
- **Method:** `GET`

This endpoint demonstrates how a well-documented API provides all the necessary details a developer needs to understand and use it effectively.

Response:

```json
{
  "rank": 1,
  "name": "Eminem",
},
{
  "rank": 2,
  "name": "NF",
},
{
  "rank": 3,
  "name": "Adele",
},
```

Now the code above indicates the response I should get from my initial request and it is displayed in a JSON format.

### Authorization and Authentication:

Both authorization and authentication are important tools used for checking the access that’s been given to sensitive data.

APIs receive thousands of responses and handle huge amounts of data. Authentication and Authorization are ways to ensure that your API data and your users are safe and secure from hackers.

Note that authentication and authorization are two different concepts. Authentication is mainly all about verifying the identity of someone who wants to use your API. Authorization, on the other hand, describes the level of access that an already verified user has when interacting with the API.

There are three major types of API Authentication. Each type is used at different stages or levels, but in some scenarios, no authentication is used at all.

- **Basic Authentication:** This is the type of API auth that is usually used for testing internal APIs. It’s not recommended for publicly used APIs because it’s not fully secure. This API sends a username and password with every API call made to the client.
- **Key Authentication:** In this type of auth, the client generates and sends a very long key. The API key is a long string that contains unique authorization tokens. This type of auth is more secure than the basic auth - but if the key is leaked, anyone can access the API until it’s revoked. Note: This type of Authentication is used for light applications.
- **OAuth Authentication:** OAuth is the most common and more secure token-based type of authentication. In this type of authentication, instead of sending a username and password, an authorization is first requested, which is approved by the user. After the user approves the request, a token is generated which can be used to make an API request. This method is secure, and the tokens generated have an expiration time as well.

Let’s look at an example from the Spotify API.

Spotify uses **OAuth 2.0** for authentication and access control. To use most of Spotify’s Web API endpoints, you must first authenticate your application and obtain permission from the user:

```plaintext
GET https://accounts.spotify.com/authorize
```

Here are the key details of the Authorization endpoint:

- **Name:** Authorization
- **Description:** Initiates the OAuth 2.0 flow to authorize users and allow your application to access Spotify data on their behalf.
- **URL:** [<VPIcon icon="fa-brands fa-spotify"/>`https://accounts.spotify.com/authorize`](https://accounts.spotify.com/authorize)
- **Method:** `GET`

![Sportify Authentication and Authorization Image](https://cdn.hashnode.com/res/hashnode/image/upload/v1745909858569/5785d44b-642b-400c-b3b5-c12508faac43.png)

### Parameters and Headers:

Parameters are the variable part of a resource and comprise a name, value, and description. Some parameters are required and are used in making API calls, while some are just optional.

When writing an API documentation, you should list out all the parameters and descriptions alongside each parameter. It’s also a good idea to specify why such a parameter is needed and state if it is required or optional in the documentation.

Headers, on the other hand, are similar to parameters. They have key-value pairs and are used to send additional information (metadata) about a request to the server. If there are any headers used in your API, then it is important you include them when documenting the API.

![Parameters and headers](https://cdn.hashnode.com/res/hashnode/image/upload/v1746181055214/dbf02273-71ef-472e-94d1-7b49c78f9751.png)

As you can see in the image above, we have some Body Parameters and Header Parameters. For body parameters, there’s `grant_type` (which is required), `code` (also required), and `redirect_uri` (also required). You can also see that they have descriptions of the value listed.

For header parameters, we have `Authorization` (required) and `Content-Type` (also required), again with descriptions of their values.

### Error Handling Codes and Troubleshooting Guidance:

Errors are inevitable, they’ll always occur despite how careful you are. That’s why good API documentation should include guidance to help developers recover quickly when things go wrong.

Your documentation should provide a section that;

- Suggest possible fixes or troubleshooting tips for some specific errors.
- Include sample error response codes and logs, which help in debugging.

When it comes to API calls, two key components to understand are the **request** and the **response**. When an API call is made, a request is sent to the server, and a response is returned. This response includes a **status code** and, if applicable, an **error code** and both are essential for understanding what happened during the request.

For example, there are situations when you make an API call and the response you get is a code 404, which means that the request you made was not found. But when things go smoothly, you should see a code 200, which means your request was successful.

Here is what this section looks like:

```json
{
  "error": {
    "status": 404,
    "message": "Not Found"
  }
}
```

By properly documenting these status and error codes with their explanations, developers can easily identify issues and take appropriate actions to solving it those issues.

Here are some common Response Code Statuses and what they mean:

#### Response Code Status

| Status Code | Description |
| ---: | --- |
| 200 | OK |
| 201 | Created |
| 202 | Accepted |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |

The table above shows some of the most common code response statuses you’ll come across when using an API and its description.

---

## Best Practices for Writing Concise API Documentation

Here are some best practices that can help guide you while writing API documentation:

1. You want to make sure users clearly understand what the API is, how they can use it, and the limits of use for the API.
2. Know your target audience and focus on what they need most to get started with the API docs.
3. Always stick to the essential information and use clear and consistent language.
4. Structure your documentation properly and make it standard.
5. Examples are important. Always use them in your documentation and make sure you clearly explain them.
6. Avoid repetition in your documentation.
7. Always document your error codes clearly. It’s recommended that you put them in tabular format.
8. Always provide a link to outsourced files in situations when more details are needed. This helps keep your documentation short and on point.
9. Review and regularly update the documentation.
10. Incorporate user feedback for continuous improvement.

---

## Conclusion

API documentation has become a critical component in today's technology landscape. Clear and concise documentation is not just helpful - it’s essential. It often determines whether an API succeeds in the tech ecosystem and whether developers can fully leverage its power.

This is a call to action for developers, organizations, and technical writers: prioritize high-quality, well-structured API documentation. The clarity of your documentation directly impacts the usability, adoption, and long-term success of your product in the industry.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Write Good API Documentation",
  "desc": "Imagine purchasing a standing fan straight out of the box, all parts dismantled, and you have no manual or guide to put them together. Did you imagine that just now? Cool. Here is another scenario: imagine purchasing an LG product, such as a smart TV...",
  "link": "https://chanhi2000.github.io/bookshelf/fcc/how-to-write-good-api-docs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
