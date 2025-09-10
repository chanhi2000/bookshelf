---
lang: en-US
title: "How Web Services Work - The Unseen Engines of the Connected World"
description: "Article(s) > How Web Services Work - The Unseen Engines of the Connected World"
icon: fas fa-computer
category:
  - Engineering
  - Computer
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - engineering
  - computer
  - coen
  - computerengineering
  - computer-engineering
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Web Services Work - The Unseen Engines of the Connected World"
    - property: og:description
      content: "How Web Services Work - The Unseen Engines of the Connected World"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-web-services-work-with-examples.html
prev: /academics/coen/articles/README.md
date: 2025-05-14
isOriginal: false
author:
  - name: Kumar Anand
    url : https://freecodecamp.org/news/author/kanand/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1747156692079/512460b1-28dc-4769-95d4-2c842a316a51.png
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
  name="How Web Services Work - The Unseen Engines of the Connected World"
  desc="Have you ever wondered how your weather app instantly knows the forecast, how you can book flights from multiple airlines on one travel site, or how logging into one service can magically log you into another? The answer often lies in a powerful, yet..."
  url="https://freecodecamp.org/news/how-web-services-work-with-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1747156692079/512460b1-28dc-4769-95d4-2c842a316a51.png"/>

Have you ever wondered how your weather app instantly knows the forecast, how you can book flights from multiple airlines on one travel site, or how logging into one service can magically log you into another?

The answer often lies in a powerful, yet often invisible, technology: **Web Services**.

Think of the internet as a bustling city. Different buildings (applications) have different functions and are built by different architects (developers) using different materials (programming languages and platforms).

So how do these distinct buildings interact efficiently? They need standardized roads, delivery services, and communication protocols. Web services are the digital equivalent of these crucial city infrastructure components.

In this article, you’ll learn what Web Services are and why they’re important. You’ll also learn about different types of Web Services, like Simple Object Access Protocol (SOAP) and Representational State Transfer (REST), and when to use each one. We’ll wrap up with some examples so you can see them in action.

---

## What Exactly is a Web Service?

At its core, a web service is a standardized way for different software applications to communicate with each other over a network - typically the internet. It allows application 'A' (running on, say, a Windows server using Java) to request information or trigger an action from application 'B' (running on a Linux machine using Python), without either application needing to know the intricate internal details of the other.

Here’s how they make this happen:

1. **Network accessibility:** They operate over standard web protocols like HTTP/HTTPS.
2. **Standardized messaging:** They use common data formats like XML (Extensible Markup Language) or JSON (JavaScript Object Notation) to structure the data being exchanged.
3. **Interface description:** They often come with a "contract" or description (like WSDL for SOAP services or OpenAPI/Swagger definitions for REST APIs) that tells other applications *how* to interact with them - what functions are available and what data format to expect.

---

## Why are Web Services So Important?

The rise of web services has revolutionized software development and the internet itself. They’re important for several key reasons.

First, **interoperability.** This is the biggest win. Web services break down technology silos. An application written in C# can seamlessly talk to one written in Ruby, as long as they agree on the web service protocol and data format.

Next, **reusability.** A company can build a specific function (like processing payments or checking stock inventory) as a web service once. Then, multiple internal or external applications can reuse that same service, saving significant development time and effort.

Also, **loose coupling.** Applications using a web service don't need to be tightly bound to it. The service provider can update the internal workings of the service without breaking the applications that consume it, as long as the communication interface remains consistent. This makes systems more flexible and easier to maintain.

And finally, **platform independence.** Because they rely on web standards, web services work across different operating systems and hardware.

---

## Types of Web Services

Web services can be broadly categorized into different types, each with its own characteristics and suitable use cases. The two most prominent types are SOAP and REST. Other types include XML-RPC, UDDI, GraphQL , and gRPC.

### SOAP (Simple Object Access Protocol)

SOAP web services are often used in enterprise-level applications requiring high security and transactional integrity, like banking, finance, and telecommunications.

- **Protocol:** SOAP (Simple Object Access Protocol) is a formal protocol with strict rules defined by the W3C that relies on XML for message format and usually HTTP/HTTPS for message negotiation and transmission.
- **Structure:** SOAP messages are composed of an envelope, header, and body:
  - **Envelope:** Defines the start and end of the message, and includes namespaces for components.
  - **Header:** Contains optional attributes for message routing and quality of service.
  - **Body:** Contains the actual call and response information, wrapped in XML.
  - **Communication:** SOAP is protocol-driven and uses WSDL (Web Services Description Language) to describe the services offered and how to interact with them.
- **Use cases:** A SOAP request might be used to call a banking service to check an account balance. The response will be strictly formatted as XML, fulfilling the service’s requirements.

::: tip Example: a currency conversion web service

```http title="POST /CurrencyService.asmx"
POST /CurrencyService.asmx HTTP/1.1
Host: www.example.com
Content-Type: text/xml; charset=utf-8
Content-Length: length
SOAPAction: "http://www.example.com/ConvertCurrency"
```

```xml title="SOAP Request (XML)"
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ConvertCurrency xmlns="http://www.example.com/">
      <FromCurrency>USD</FromCurrency>
      <ToCurrency>EUR</ToCurrency>
      <Amount>100</Amount>
    </ConvertCurrency>
  </soap:Body>
</soap:Envelope>
```

```xml title="SOAP Response (XML)"
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xmlns:xsd="http://www.w3.org/2001/XMLSchema"
               xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <ConvertCurrencyResponse xmlns="http://www.example.com/">
      <ConvertCurrencyResult>92.5</ConvertCurrencyResult>
    </ConvertCurrencyResponse>
  </soap:Body>
</soap:Envelope>
```

![SOAP Architecture](https://cdn.hashnode.com/res/hashnode/image/upload/v1746789572894/08bb3d28-2552-4791-a8fd-6f560a1a5dc0.png)

### REST (Representational State Transfer)

REST web services are often used for building APIs that let apps perform CRUD operations on resources, like fetching data from a database or interacting with other services. REST is especially popular in web development because it’s relatively simplicity, quite scalable, and uses standard HTTP methods (GET, POST, PUT, DELETE).

- **Architecture:** REST (Representational State Transfer) is an architectural style rather than a protocol. It relies on standard HTTP methods like GET, POST, PUT, DELETE, to interact with resources.
- **Data Exchange:** REST usually exchanges data in JSON or XML format. JSON is more common due to its lightweight nature.
- **Structure:** REST doesn’t have a WSDL-like formal contract. Instead, resources are identified via URLs, and HTTP status codes indicate the result of requests.
- Generally considered simpler, more flexible, and scalable, making it extremely popular for web and mobile applications (these are often referred to as RESTful APIs).
- **Use cases:** A REST API might be used to retrieve data about a book in a bookstore application, using a simple HTTP GET request.

::: tip Example: a currency conversion web service

```http title="REST Request (GET)"
GET /api/convert?from=USD&to=EUR&amount=100 HTTP/1.1
Host: www.example.com
```

OR Using `POST`:

```http title="REST Request (POST)"
POST /api/convert HTTP/1.1
Host: www.example.com
Content-Type: application/json

{
  "from": "USD",
  "to": "EUR",
  "amount": 100
}
```

```json title="REST Response (JSON)"
{
  "from": "USD",
  "to": "EUR",
  "amount": 100,
  "result": 92.5
}
```

![REST Architecture](https://cdn.hashnode.com/res/hashnode/image/upload/v1746789618280/9b887c38-e350-4bda-8b4a-99437df9c90f.png)

In modern web development, particularly for public APIs and microservices, REST (especially using JSON over HTTPS) has become the most popular and often preferred approach due to its simplicity and performance benefits. But SOAP remains relevant and necessary in specific enterprise contexts.

---

## Comparing and Contrasting SOAP and REST Web Services

| **Feature** | SOAP | REST |
| --- | --- | --- |
| *Type* | Protocol | Architectural Style |
| *Standards* | Strictly defined, relies on standards like WS-Security | Loosely defined, follows HTTP standards |
| *Data Format* | Primarily XML | Supports various formats (JSON, XML, HTML, plain text), JSON is common |
| *Bandwidth/Resource* | More required due to verbose XML | Less required, lightweight |
| *Security* | Built-in security features (WS-Security), support encryption | Inherits security from underlying transport (HTTPS), additional mechanisms like OAuth can be used |
| *Business Logic* | Exposed through service interfaces | Exposed through URIs representing resources |
| *Ease of Use* | Can be complex, requires specific tools, steeper learning curve | Generally easier to build and consume, shorter learning curve |
| *Performance* | Can be slower due to XML parsing overhead | Faster performance, especially with JSON and caching |
| *Scalability* | Can be challenging to scale due to state management (if used) | Easier to scale due to stateless nature |
| *Transport* | Transport independent (HTTP, SMTP, TCP, JMS) | Primarily uses HTTP |
| *Error Handling* | Built-in error handling with standardized fault codes | Relies on HTTP status codes and sometimes custom error responses |
| *Caching* | SOAP calls are generally not cacheable (especially with POST) | REST responses can be cached |
| *Statefulness* | Supports both stateful and stateless operations | Primarily stateless |
| *Tooling* | Requires specific SOAP toolkits for development and consumption | Can be implemented with standard HTTP libraries and tools |
| *Documentation* | Uses WSDL for service description | Documentation often relies on OpenAPI Specification (Swagger) or similar tools |
| *Use Cases* | Enterprise applications, complex transactions, high security requirements, asynchronous operations, stateful operations (if needed) | Web applications, mobile apps, public APIs, simple and scalable services, scenarios with limited bandwidth |

---

## What if One Service Uses SOAP and the Other Uses REST?

By default, SOAP and REST are not directly compatible because SOAP uses XML with a strict message format, and REST uses HTTP methods and often JSON payloads.

So, they can’t communicate to each other directly without some integration layer or adapter. Here’s how you can handle this situation:

- **Use intermediary services:** You can use a middleware or API gateway that can handle both SOAP and REST protocols. These services can translate SOAP requests into REST requests and vice-versa.
- **Use adapters:** Write adapters that convert SOAP XML messages to REST JSON requests. Essentially, a piece of software acts as a translator between the two formats.
- **Direct integration:** While complex, this involves custom software development where the SOAP service can be manually configured to invoke REST endpoints.
- **Use an ESB (Enterprise Service Bus):** An ESB can integrate diverse applications and data formats within enterprise architecture, acting as a mediator that understands both SOAP and REST.
- **Expose a hybrid API:** Some modern APIs expose both SOAP and REST endpoints for the same backend logic.

::: tip Example

Amazon Web Services (AWS) used to have SOAP and REST APIs for some services. This lets clients choose which protocol they prefer.

:::

---

## Web Services in Action: Examples

- **Weather apps:** Your phone app likely calls a weather web service, sending your location and receiving back forecast data.
- **Online payments:** When you buy something online, the e-commerce site often communicates with a payment gateway's web service to securely process your credit card information.
- **Travel aggregators:** Sites like MakeMyTrip or Kayak use web services provided by airlines and hotels to fetch real-time flight and room availability and prices.
- **Social logins:** "Login with Google" or "Login with Facebook" buttons use authentication web services (often based on OAuth) to verify your identity without you needing a separate password for that site.

---

## Final Thoughts

Web services have fundamentally transformed how applications interact and exchange data over networks. Their ability to facilitate interoperability, reusability, and scalability has made them indispensable in modern software development and system integration.

While SOAP and REST represent the two dominant styles, each with its strengths and weaknesses, their choice often depends on specific project requirements, particularly concerning security, performance, and complexity.

Understanding the core functionalities, underlying technologies, common use cases, and security considerations of web services provides a solid foundation for navigating the landscape of distributed computing.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Web Services Work - The Unseen Engines of the Connected World",
  "desc": "Have you ever wondered how your weather app instantly knows the forecast, how you can book flights from multiple airlines on one travel site, or how logging into one service can magically log you into another? The answer often lies in a powerful, yet...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-web-services-work-with-examples.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
