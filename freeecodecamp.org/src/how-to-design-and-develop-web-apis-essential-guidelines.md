---
lang: en-US
title: "How to Design and Develop Web APIs: Essential Guidelines for Developers"
description: "Article(s) > How to Design and Develop Web APIs: Essential Guidelines for Developers"
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
      content: "Article(s) > How to Design and Develop Web APIs: Essential Guidelines for Developers"
    - property: og:description
      content: "How to Design and Develop Web APIs: Essential Guidelines for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-design-and-develop-web-apis-essential-guidelines.html
prev: /academics/system-design/articles/README.md
date: 2024-10-07
isOriginal: false
author: Anjan Baradwaj
cover: https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/ZM55FiQB8ig/upload/709f2a6f6de426904c95b785196f8736.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Design and Develop Web APIs: Essential Guidelines for Developers"
  desc="Software applications have made our lives easier and better in many ways. We use them almost daily, and some people find themselves using applications more frequently than they interact with other people. But how do applications interact with each ot..."
  url="https://freecodecamp.org/how-to-design-and-develop-web-apis-essential-guidelines"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/ZM55FiQB8ig/upload/709f2a6f6de426904c95b785196f8736.jpeg"/>

Software applications have made our lives easier and better in many ways. We use them almost daily, and some people find themselves using applications more frequently than they interact with other people.

But how do applications interact with each other? Well, they do it through APIs - Application Programming Interfaces. In this article, you’ll learn what APIs are. We’ll specifically focus on Web APIs and their design and development.

---

## What is a Web API?

Web APIs are a type of API designed to be used over the web. In other words, web-based software applications, systems, and services use Web APIs to exchange information over the internet. They send requests and receive responses, typically in formats such as JSON or XML.

Web APIs play a crucial role in modern software development for the following reasons:

1. **Interoperability**: APIs are technology-agnostic, meaning they allow different software systems to communicate with each other regardless of the technology stack. This enables developers to integrate various applications seamlessly.
2. **Scalability**: Web APIs support modular development, enabling different components of an application to be built, debugged, and scaled independently. This greatly improves the system's scalability.
3. **Flexibility and Extensibility**: By following standard practices and well-defined rules, Web APIs help applications extend their functionality. They are also flexible enough to allow developers to create dynamic applications.

---

## Approaches to Developing Web APIs

Web APIs can be developed using various methods based on the requirements. Here are some commonly followed approaches:

- **REST**: Representational State Transfer (REST) APIs use the HTTP protocol to perform operations. They operate in a stateless manner, meaning each request must include all the necessary information for the receiver to process and respond.
- **SOAP**: Simple Object Access Protocol uses XML to exchange information in a structured way.
- **GraphQL**: used for querying and manipulating APIs.
- **gRPC**: a Remote Procedure Call framework that uses HTTP/2 for transporting information.

In the upcoming sections, we will explore the design and development of APIs, focusing on REST APIs as the protocol central to our discussion.

---

## Understanding the Requirements and Objectives

In any software development process, it's crucial to understand the requirements and intended use-case before starting. This helps you plan and estimate the cost, time, and other resources you’ll need for the project.

The same applies when building RESTful APIs. You need to determine if the applications will exchange information in a stateless manner, if the entities involved can be represented as resources, and if the services are flexible enough to work with different data formats.

---

## Defining the Resources and Endpoints

REST APIs revolve around *resources*, which are entities representing the data or objects in the system. Each resource is identified by a unique URI called a *resource identifier*. These resources can be accessed and manipulated via *endpoints*, which are specific URLs that receive and process requests from the client.

Best practices suggest using nouns for resources in the endpoints instead of verbs that might indicate an operation on the resource.

Consider the following example: `https://api.example.com/products`

The endpoint follows the best practice of using a noun for the resource (in this case, `products`). Notice how I used the plural form - products? It is also advisable to use plurals if you are working with a collection of objects.

However, the following endpoint `https://api.example.com/add-product` is not recommended because it uses a verb and tries to describe an action on the resource. This approach can become complicated for more complex operations.

Another important aspect of standard endpoint naming convention is using a hierarchical structure. This helps to clearly represent the relationship between resources.

For example: `https://api.example.com/categories/{categoryId}/products/{productId}`.  
Here, we define an endpoint that maintains a clear hierarchy between the `category` and `product` resources.

---

## Using HTTP Methods and Status Codes

In REST APIs, [<VPIcon icon="fa-brands fa-cloudflare"/>HTTP](https://cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/) is used for communication between the client and the server. HTTP has standard methods that are primarily used to perform operations on resources. Below is a list of these methods along with their purposes:

- `GET`: Fetch the details of the resource. These details are returned by the server in the response message body.
- `POST`: Create a new resource. The details of the resource to be created are sent in the request message body.
- `PUT`: Create or update a resource, depending on its availability. The details of the resource to be created or updated are sent in the request message body.
- `DELETE`: Remove a resource.
- `PATCH`: Partially update a resource. The changes to be made to the resource are sent in the request message body.

The recommended approach to developing a well-defined REST API is to use these HTTP methods correctly for performing the corresponding CRUD (Create, Read, Update, Delete) operations on the resource. Also, you should make sure that the API responds back to the client with an appropriate HTTP status code in the response message body.

Status codes reflect the end result of a request. Below are some of the common HTTP status codes you can use:

- `200` OK
- `201` Created
- `204` No Content
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `500` Internal Server Error
- `503` Service Unavailable
- `504` Gateway Timeout

Use a suitable HTTP status code that accurately represents the outcome of the request your API endpoint is processing. You can also implement custom HTTP status code to describe application-specific behavior.

---

## Versioning Strategies

Over time, the API you develop will evolve, and you will make changes to it. This is where versioning strategies become important. You must ensure that the clients already using your APIs are not affected by the changes you make.

Maintaining different versions will make your APIs backward compatible and allow clients to use the preferred version of the API based on their needs. An excerpt from this [informative blog on the Postman website](https://postman.com/api-platform/api-versioning/) explains when it is ideal to version your APIs:

> “You should version your API whenever you make a change that will require consumers to modify their codebase in order to continue using the API. This type of change is known as a “breaking change,” and it can be made to an API's input and output data structures, success and error feedback, and security mechanisms.“

API versioning can be done in different ways. Here are some methods:

- **URI Versioning**: Include the version number in the URL path. For example, [`https://api.example.com/v1/products`](https://api.example.com/v1/products).
- **Query Parameter Versioning**: Specify the version number as a query parameter in the URL. For example, [`https://api.example.com/products?version=1`](https://api.example.com/products?version=1).
- **Header Versioning**: Include the version number in the HTTP headers of the request. For example, using a custom header like `X-API-Version: 1`.
- **Content Negotiation**: Specify the version in the `Accept` header of the request, often using media types. For example, `Accept: application/vnd.example.v1+json`.
- **Embedded Versioning**: Embed the version number within the media type of the response. For example, `application/vnd.example.product-v1+json`.

---

## Security Considerations

Another important aspect to consider when developing an API is security. Here are some key points to remember:

1. Implement HTTPS to encrypt the information exchanged between the client and the server.
2. Implement authentication and authorization to ensure that only users with the right privileges can perform operations on the resources. Common methods include Basic authentication, Bearer or Token authentication, JWT, and OAuth 2.0. Also, implement role-based access control to manage resource access.
3. Implement input validation and sanitization to prevent vulnerability attacks like SQL injection and Cross-Site Scripting (XSS).
4. Implement rate limiting and throttling to control the number of requests a client can make to the server within a specific time frame. This helps prevent excessive load on the server.

---

## Documentation

One key but often overlooked aspect of API development is documentation. It is crucial to document your API so users understand its features and functionalities.

The documentation must be comprehensive, easy to understand, and follow standard practices. Include examples of request and response bodies, HTTP status codes used, and more. You can follow the [<VPIcon icon="fas fa-globe"/>Open API specification](https://openapis.org/) for describing your RESTful APIs.

---

## Sorting, Filtering and Pagination Strategies

The API you develop might cause performance issues if it returns too many records. It's inefficient to retrieve large amounts of data and then sort or filter it.

To address this, you should enable sorting and filtering of records. You should also implement pagination to break down the number of records being fetched and set a limit for easier navigation and processing.

---

## Monitoring Usage, Logging, and Health

It’s a good idea to log your API requests and responses to help with debugging. Monitoring API usage will help you understand the overall performance and behavior of the application. Performing regular health checks can help you take necessary action if there are any issues. All these steps will make the API more robust and reliable.

---

## Conclusion

APIs, specifically Web APIs, are essential for software applications to communicate over the internet.

This article explained what Web APIs are, why they’re important, and different approaches for developing them, focusing on REST APIs. You also learned about key topics like defining resources and endpoints, using standard HTTP methods and status codes, versioning strategies, security considerations, documentation, and more.

If you found this article interesting, feel free to check out my other articles on freeCodeCamp and connect with me on [LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`abaradwaj`)](https://linkedin.com/in/abaradwaj/).