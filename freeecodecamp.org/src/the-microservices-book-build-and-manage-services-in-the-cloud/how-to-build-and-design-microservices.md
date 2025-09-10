---
lang: en-US
title: "How to Build and Design Microservices"
description: "Article(s) > (6/18) The Microservices Book - Learn How to Build and Manage Services in the Cloud" 
category:
  - Node.js
  - RabbitMQ
  - DevOps
  - Docker
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - rabbitmq
  - rabbit-mq
  - devops
  - vm
  - docker
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (6/18) The Microservices Book - Learn How to Build and Manage Services in the Cloud"
    - property: og:description
      content: "How to Build and Design Microservices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/how-to-build-and-design-microservices.html
date: 2024-11-29
isOriginal: false
author: Adekola Olawale
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Microservices Book - Learn How to Build and Manage Services in the Cloud",
  "desc": "In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi...",
  "link": "/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Microservices Book - Learn How to Build and Manage Services in the Cloud"
  desc="In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi..."
  url="https://freecodecamp.org/news/the-microservices-book-build-and-manage-services-in-the-cloud#heading-how-to-build-and-design-microservices"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png"/>

In this section, I’ll guide you through the process of designing and developing microservices, focusing on best practices and practical techniques for creating effective, resilient services.

We’ll cover essential steps like setting up a microservices environment, structuring services for modularity, and choosing the right tools and frameworks to streamline development.

You will learn about key aspects of service creation, including defining service boundaries, establishing inter-service communication, and implementing APIs for seamless integration.

We’ll also explore important considerations like data management, security, and deployment strategies specific to microservices.

By the end of this section, you'll have a comprehensive understanding of the techniques and tools that support efficient microservices development, providing a strong foundation for creating scalable, flexible, and high-performing microservices-based applications.

---

## Define Service Boundaries

It’s important to identify the distinct business functions that each microservice will handle. This involves defining clear responsibilities and interfaces.

Think of service boundaries like different departments in a company. Each department (HR, Sales, Support) has a clear function and operates independently.

```js
// Define service boundaries
class UserService {
  constructor() {
    this.users = []; // Manages user-related data
  }

  createUser(user) {
    this.users.push(user);
    return user;
  }

  getUser(userId) {
    return this.users.find(user => user.id === userId);
  }
}

class OrderService {
  constructor() {
    this.orders = []; // Manages order-related data
  }

  createOrder(order) {
    this.orders.push(order);
    return order;
  }

  getOrder(orderId) {
    return this.orders.find(order => order.id === orderId);
  }
}
```

In this code, you can see how **each service has its own distinct responsibilities**:

1. **UserService**: This class is dedicated to managing user-related data and functionalities. The `this.users` array simulates a database, storing user data exclusively within the `UserService` scope. The `createUser` method allows for adding a new user to this array, while `getUser` retrieves a user by their ID. By defining these methods within `UserService`, the code makes sure that all user-related data is encapsulated and handled only within this service, ensuring clear separation from other services.
2. **OrderService**: Similarly, `OrderService` is exclusively responsible for order-related data and operations. It maintains its own `this.orders` array to store order data and provides `createOrder` and `getOrder` methods to add and retrieve orders, respectively. Like `UserService`, this approach confines order-related data management within `OrderService`, creating a clear boundary between the two services.

In practice, these service boundaries are like **separate departments in a company**, such as HR and Sales, where each department operates independently with its specific set of responsibilities.

`UserService` and `OrderService` can interact with users and orders without interfering with each other, thus minimizing dependencies and enabling each service to evolve independently.

This design makes it easier to scale, modify, and maintain individual services without impacting other parts of the application.

---

## Decide on Data Storage

You’ll need to choose the appropriate data storage solution for each microservice, considering factors such as scalability and consistency.

It’s just like choosing the right type of storage (for example, filing cabinet, cloud storage) based on what you need to store and how you need to access it.

```js
// Simple in-memory storage for demonstration
const userDatabase = {}; // For UserService
const orderDatabase = {}; // For OrderService

class UserService {
  createUser(user) {
    userDatabase[user.id] = user;
  }

  getUser(userId) {
    return userDatabase[userId];
  }
}

class OrderService {
  createOrder(order) {
    orderDatabase[order.id] = order;
  }

  getOrder(orderId) {
    return orderDatabase[orderId];
  }
}
```

In this code, you can see how **each service is designed to operate with its own isolated storage**:

1. **UserService**: The `UserService` class interacts solely with the `userDatabase` object. When the `createUser` method is called, it stores the user’s data in `userDatabase`, using the user’s ID as the key to make retrieval efficient. The `getUser` method retrieves user data by accessing this in-memory "database" with the user ID. This approach confines user data management entirely within the `UserService`, preventing other services from directly accessing or modifying it, which aligns with the microservices goal of encapsulating data within the responsible service.
2. **OrderService**: Similarly, the `OrderService` class interacts only with `orderDatabase`, a separate in-memory object dedicated to storing order-related data. The `createOrder` method adds order information to this object, using each order’s unique ID as a key. The `getOrder` method then retrieves orders from `orderDatabase` as needed. As with `UserService`, `OrderService` maintains strict data separation, ensuring that order data is accessible only within the context of this service.

This structure emphasizes **decoupling data management for each service**, which offers several advantages in a microservices architecture. For instance, by isolating each service’s data, this model allows each service to choose the most suitable data storage solution based on its specific requirements.

Just as an organization might choose cloud storage for accessible files and secure storage for sensitive documents, each microservice could adopt a different database type (for example, SQL, NoSQL) depending on its workload.

This separation also supports scalability, as each service can independently scale its storage layer without affecting others.

---

## Choose the Right Technology Stack

Selecting the appropriate technology stack is a crucial step in building microservices.

This decision impacts your microservices architecture's performance, scalability, maintainability, and overall success.

The flexibility of microservices allows you to choose different programming languages, frameworks, and tools for various services, optimizing each one for its specific needs.

### Programming Languages**

In a microservices architecture, you can use different programming languages for different services based on their requirements.

For instance, you might choose JavaScript (Node.js) for real-time services, Python for data processing, and Java for high-performance backend services.

**Here’s what to consider:**

- **Team Expertise:** Choose languages your team is proficient in to reduce the learning curve and increase productivity.
- **Ecosystem and Libraries:** Consider the availability of frameworks, libraries, and community support for the language.
- **Performance Needs:** Some languages offer better performance for specific tasks. For example, Go is often chosen for its concurrency capabilities in high-performance applications.

```js
// Node.js example for a simple microservice
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Service running on port 3000');
});
```

In the code above, you can see how a **basic Node.js-based microservice** works by using the Express framework to handle a simple HTTP GET request.

This example demonstrates setting up a microservice with minimal code, illustrating how microservices can efficiently serve specific functionalities.

In this code, you can see:

1. **Express Setup**: The code starts by importing the `express` module, which is a lightweight, flexible Node.js framework commonly used for building microservices and web applications. `express()` initializes an application instance named `app`, allowing us to define routes and behaviors.
2. **Defining a Route**: Next, we define a route handler using `app.get('/hello', (req, res) => { ... })`. This line sets up an endpoint, `/hello`, which will respond to HTTP GET requests. When a request is made to this endpoint, the callback function sends back a response of `"Hello, World!"`. This function demonstrates how specific endpoints can be easily created within a microservice to handle different requests and responses.
3. **Starting the Server**: The line `app.listen(3000, ...)` instructs the app to listen on port 3000, meaning it will respond to incoming requests on this port. When the server successfully starts, a message, `"Service running on port 3000"`, is logged to the console. This line is crucial for making the microservice operational, as it opens up the specified port for client communication.

This setup is a typical approach for a simple microservice, where each microservice can run independently, serve specific routes, and perform unique actions.

It demonstrates the concept of **service boundaries** by limiting the functionality of this microservice to a specific purpose: handling requests to the `/hello` endpoint and responding with a message.

This design can be expanded by adding more endpoints, handling more request types, and incorporating additional logic as needed.

### Frameworks

Depending on the complexity and requirements of your service, you might choose a lightweight framework (like Express.js for Node.js) or a more comprehensive one (like Spring Boot for Java).

Some frameworks are specifically designed for microservices, offering built-in support for service discovery, configuration management, and other essential features. Examples include Spring Boot (Java) and Micronaut (Java, Groovy, Kotlin).

**Here’s what to consider:**

- **Scalability:** Ensure the framework supports horizontal scaling and distributed systems.
- **Ease of Integration:** Choose frameworks that integrate well with your existing systems and technologies.
- **Developer Productivity:** Frameworks with higher levels of abstraction can speed up development but may also limit flexibility.

```java
// Spring Boot example for a simple microservice
@RestController
@RequestMapping("/api")
public class HelloWorldController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
}
```

This code illustrates how a simple Spring Boot microservice works, specifically by defining a REST endpoint that responds to HTTP requests.

- You have a `HelloWorldController` class, annotated with `@RestController`, which marks it as a RESTful web service controller in Spring Boot. This annotation allows the class to handle incoming HTTP requests and automatically converts responses into JSON, making it ideal for building microservices.
- The `@RequestMapping("/api")` annotation specifies a base URI for all endpoints in this controller. In this case, all routes managed by `HelloWorldController` will begin with `/api`, organizing the API endpoints under a single base path.
- Within the class, the `@GetMapping("/hello")` annotation is used on the `hello()` method, designating it as an HTTP `GET` endpoint. This means that whenever the `/api/hello` route is accessed with a `GET` request, the `hello()` method will be triggered.
- The `hello()` method is a simple function that returns the string `"Hello, World!"`. When a client makes a request to `/api/hello`, Spring Boot processes this request and sends back the `"Hello, World!"` response, formatted according to HTTP standards.

This setup forms the basis of a simple microservice endpoint, as it defines a clear URI path, method type, and response format, encapsulated within a RESTful API.

The example provided explains how Spring Boot's annotations streamline the development process for RESTful services. The `@RestController` and route-mapping annotations handle much of the boilerplate, allowing developers to focus on building individual endpoints.

This simplicity is especially beneficial in microservices architecture, where small, single-purpose services can be rapidly developed, tested, and scaled independently.

### Technology Stack Alignment**

While microservices allow for different stacks across services, it’s important to strike a balance between consistency (to avoid operational overhead) and flexibility (to optimize individual services). For example, you might standardize certain tools for monitoring, logging, and CI/CD, even if you use different languages.

You should also consider how your chosen technology stack works within containers (like Docker). Containerization enables consistent environments across development, testing, and production.

---

## Defining APIs and Contracts

Defining clear and well-structured APIs is a cornerstone of successful microservices architecture.

APIs serve as the communication bridge between microservices, enabling them to work together while remaining loosely coupled.

### API Design Principles: RESTful vs. gRPC

::: tabs

@tab:active RESTful APIs

REST (Representational State Transfer) is widely used due to its simplicity, human-readability, and ease of integration with HTTP. RESTful APIs are typically designed around resources and use standard HTTP methods (GET, POST, PUT, DELETE).

```http
GET /api/users/{id}
```

In this HTTP code, you can see how a **RESTful API request** is structured to retrieve user information by ID. This endpoint, represented by `GET /api/users/{id}`, is a commonly used RESTful pattern for accessing specific resources, in this case, user data.

Here’s a breakdown of what this endpoint does and how it works:

1. The `GET` method is used to request data from the server, and it’s specifically designed to retrieve information without modifying any data on the server. In this context, the `GET` request is directed to the `/api/users/{id}` endpoint, where `{id}` represents a variable placeholder for the specific user’s unique identifier.
2. When a request is made to this endpoint (for example, `GET /api/users/123`), the server interprets `{id}` as the ID of the user whose data is being requested.
3. The server then retrieves the relevant user information from its database and sends it back to the client, typically in JSON format.

This approach aligns with the principles of REST (Representational State Transfer), which emphasizes stateless communication and the use of standard HTTP methods (like GET, POST, PUT, DELETE) to interact with resources.

By separating the endpoint path (`/api/users`) and the method (`GET`), this design provides a clear, intuitive interface for retrieving data, making it easy for clients to understand that this request will fetch user information based on the unique user ID provided.

Using specific paths with parameters like `{id}` keeps the API flexible, allowing clients to dynamically request data for any user by substituting the appropriate ID in the request URL.

This is especially useful in microservice or RESTful architectures, where clear, predictable endpoints improve communication efficiency and maintain data access consistency across distributed services.

@tab gRPC

gRPC is a high-performance, open-source RPC (Remote Procedure Call) framework developed by Google. It uses HTTP/2 and Protocol Buffers for efficient communication, making it suitable for low-latency, high-throughput systems.

```plaintext
service UserService {
    rpc GetUser (UserRequest) returns (UserResponse);
}
```

In this code, you can see how **gRPC service definitions** are created to specify the RPC (Remote Procedure Call) interface for the `UserService`.

This example uses Protocol Buffers (protobuf) syntax, a language-neutral format for defining service contracts in gRPC.

Here’s a detailed breakdown of how this code works and what it represents:

1. The `service UserService` declaration defines a service named `UserService`. In gRPC, a "service" is essentially a collection of remotely callable functions. It organizes these functions (or RPC methods) under a single service name, which can be easily referenced by clients wishing to interact with it.
2. Inside `UserService`, the line `rpc GetUser (UserRequest) returns (UserResponse);` defines a specific RPC method called `GetUser`. The keyword `rpc` indicates that this function will be accessible remotely via gRPC calls. The name `GetUser` indicates its purpose—to retrieve user information—and helps to standardize the naming of this action.
3. The `GetUser` method specifies two important details: the request and response types, represented here as `(UserRequest)` and `(UserResponse)`. `UserRequest` is the type of data the client must send when calling `GetUser`, which could include user identifiers (like a user ID) or any necessary parameters. `UserResponse` defines the format of the data that will be returned by the server, such as the user’s profile or account details.

When a client makes a call to `GetUser`, they send a `UserRequest` message, and the server responds with a `UserResponse` message.

This structure allows for a well-defined and efficient way for clients to retrieve user information without dealing with the details of network communication.

By defining service contracts at this level, gRPC enables type safety, performance optimization, and scalability across distributed systems.

:::

**Choosing Between REST and gRPC:** REST is more flexible and easier to use for external APIs, while gRPC offers better performance and is often preferred for internal microservices communication.

---

## Versioning

APIs evolve over time, and maintaining backward compatibility is crucial. API versioning strategies include path versioning (for example, `/v1/users`) and query parameter versioning (for example, `/users?version=1`).

```http
GET /api/v1/users/123
```

In the HTTP code above, you can see how a **RESTful API endpoint** is defined to retrieve a resource, specifically a user, using the HTTP `GET` method.

This is a simple and effective way to interact with web services over HTTP, which is the backbone of REST (Representational State Transfer) design.

RESTful APIs are structured around the concept of resources—objects or data that can be accessed or manipulated via standard HTTP methods like `GET`, `POST`, `PUT`, and `DELETE`.

The endpoint `GET /api/users/{id}` follows this design pattern. Here's how it works in detail:

- `GET` is the HTTP method used to request data from the server. In RESTful design, the `GET` method is used for **retrieving data** from a server without making any changes. In this case, the `GET` request is specifically used to fetch the details of a user.
- `/api/users/{id}` is the **resource path** that identifies the target resource—in this case, a user. The `{id}` part is a **variable path parameter**, which means the client must provide a specific user identifier (ID) when making the request. This allows the server to understand which user's data is being requested. For example, `GET /api/users/123` would fetch the user with the ID of `123`.
- The resource, in this case, is a **user**. RESTful APIs focus on representing data in the form of resources, which are typically accessed using URLs. The `GET` method on the `/users/{id}` path tells the server to return the data associated with the user corresponding to the given ID.

In RESTful design, the simplicity and human-readability of the HTTP protocol make it easy to integrate with other systems. Each endpoint can be understood in terms of standard HTTP methods and the structure of the resource being accessed, which makes it intuitive for both developers and clients.

The resource-oriented approach is scalable, and by using HTTP status codes, developers can communicate the results of each request (such as `200 OK` for success or `404 Not Found` when the resource doesn’t exist).

Thus, `GET /api/users/{id}` is an example of how RESTful APIs allow clients to easily query specific resources with clear, readable paths and standard methods for interaction.

---

## Error Handling

You’ll need to define a consistent approach to handling errors in your APIs. Use standardized error codes and messages to make troubleshooting easier for clients.

```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "The user with ID 123 was not found."
  }
}
```

In this code, you can see how **error handling** works within an API response by providing standardized error information.

The JSON object returned represents an error response when a client attempts to access a resource, such as a user, that cannot be found.

The structure of the error is consistent, making it easier for both the server and client to handle errors effectively.

The outer structure of the response is an object containing an `error` key, which signifies that this is an error response, as opposed to a successful one. This helps clients easily distinguish between regular data responses and error responses.

Inside the `error` object, there are two key elements:

- `code`: The error code (`USER_NOT_FOUND`) is a **standardized identifier** that describes the type of error. It helps developers and clients understand exactly what went wrong. In this case, `USER_NOT_FOUND` indicates that the user could not be found in the system based on the provided identifier (`ID 123`).
- `message`: The error message (`The user with ID 123 was not found.`) provides a **human-readable explanation** of the error. This message offers clarity to the user or developer about the nature of the problem, giving a more detailed description of what happened. In this case, it explicitly informs the client that the requested user is missing from the database.

By using this approach, the error response is **consistent**, and clients can easily handle errors in a standardized way.

This might involve logging the error, displaying the message to the user, or retrying the operation if necessary.

The standardized error codes and messages make troubleshooting and debugging easier, as developers and clients can quickly identify the nature of the issue.

Moreover, this structure can be extended with additional information, such as timestamps or stack traces, to provide even more context if needed.

This consistent method for error handling ensures that both the client and server maintain clear communication, allowing developers to create more reliable and user-friendly APIs.

When errors are returned in a consistent and structured format like this, it also promotes better integration between different services or teams that might consume the API.

---

## API Contracts

### Contracts as Agreements

An API contract defines the rules for how services interact, specifying the expected inputs, outputs, and behavior. It serves as an agreement between teams, ensuring that changes in one service do not break others.

### Schema Definition

Use schema definition tools like OpenAPI (formerly Swagger) or Protocol Buffers (for gRPC) to formally define your API contracts. These tools allow for the automatic generation of client libraries, documentation, and testing tools.

```yaml
openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
paths:
  /users/{id}:
    get:
      summary: Get a user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        email:
          type: string
```

In this code, you can see how **OpenAPI schema definition** works by specifying a formal structure for a REST API endpoint.

This YAML example uses OpenAPI 3.0 to define the structure and behavior of an endpoint that retrieves a user by their ID.

OpenAPI, formerly known as Swagger, is a popular tool for defining API contracts, which are essentially agreements about how API requests and responses should look.

This helps create consistency, enables the automatic generation of client libraries, documentation, and testing tools, and makes integration smoother for clients who interact with the API.

The `openapi: 3.0.0` line specifies the OpenAPI version, ensuring compatibility with OpenAPI 3.0 tools.

Under `info`, details about the API itself are defined, including the title (`User API`) and version (`1.0.0`), helping clients and developers understand what API version they are working with.

The `paths` section details the available endpoints, with `/users/{id}` representing a path to retrieve a user by their unique identifier.

The `get` section describes the specifics of this GET request, including:

- The `summary` field (`Get a user by ID`), which briefly explains the purpose of this endpoint.
- The `parameters` list specifies that this endpoint accepts a single parameter, `id`, which is required, will appear in the path (`in: path`), and must be of type `string`.

The `responses` section specifies possible responses:

- A `200` status indicates a successful retrieval of the user data.
- Under `content`, the schema of the JSON response is defined, referencing a reusable `User` schema from the `components` section.

In the `components` section, a `User` schema is defined to outline the structure of the user data returned by this API. The `User` schema is defined as an object with `id`, `name`, and `email` properties, each with specific types (`string`), detailing the expected structure of the user data.

This formal schema helps API clients understand exactly how to use the endpoint and what kind of data they will receive in response.

By defining the API in OpenAPI, this schema also enables automated documentation tools to generate visual documentation for developers. It also allows client libraries to be automatically generated to interact with the API, reducing errors and improving efficiency.

This example showcases how OpenAPI enables clear, consistent, and reusable API contracts that facilitate easier integration and maintenance.

---

## API Gateways and Security

Implementing an API gateway allows you to manage cross-cutting concerns such as authentication, rate limiting, logging, and request routing. It acts as a single entry point for clients accessing microservices.

Security is also an important concern. You can secure your APIs using authentication mechanisms like OAuth2, API keys, or JWT (JSON Web Tokens). Also, ensure that sensitive data is encrypted both in transit and at rest.

```js
// Example of securing a route in Express.js
const jwt = require('jsonwebtoken');

app.get('/api/secure-data', authenticateToken, (req, res) => {
    res.json({ data: 'This is secured data' });
});

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
```

Here, the code illustrates how **route security and authentication** are implemented in an Express.js application using **JSON Web Tokens (JWT)**, which are a common method of securing API endpoints.

Here, the route `'/api/secure-data'` is configured to be accessible only to authenticated users, managed by the middleware function `authenticateToken`.

In the `authenticateToken` function, the code extracts the token from the request headers (`req.headers['authorization']`).

If no token is present, it sends a `401 Unauthorized` status, indicating that access is denied. This check is crucial for restricting access to sensitive endpoints, ensuring that only requests with a valid authorization token proceed.

Next, the code uses the `jwt.verify()` function to verify the token against a secret key (`process.env.ACCESS_TOKEN_SECRET`). This secret is known only to the server, which makes it possible to authenticate the validity of the token. If the token is invalid or expired, `jwt.verify` will throw an error, and the function will return a `403 Forbidden` response, blocking access.

When verification succeeds, the decoded user information from the token is attached to the `req` object (`req.user = user`), enabling subsequent middleware or route handlers to access user-specific data.

The `next()` function then passes control to the actual route handler, which, in this case, sends back a JSON object with secured data (`res.json({ data: 'This is secured data' })`).

This approach is often part of a larger API gateway or security strategy, as it ensures that sensitive routes can only be accessed by authenticated clients.

It aligns with secure API gateway practices by enforcing token-based authentication at the gateway level, enhancing security without needing to modify each microservice individually.
