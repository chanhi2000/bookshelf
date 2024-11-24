---
lang: en-US
title: "How to Implement Microservices"
description: "Article(s) > (7/18) The Microservices Book – Learn How to Build and Manage Services in the Cloud" 
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
      content: "Article(s) > (7/18) The Microservices Book – Learn How to Build and Manage Services in the Cloud"
    - property: og:description
      content: "How to Implement Microservices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/how-to-implement-microservices.html
date: 2024-11-29
isOriginal: false
author: Adekola Olawale
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "The Microservices Book – Learn How to Build and Manage Services in the Cloud",
  "desc": "In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi...",
  "link": "/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/README.md",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="The Microservices Book – Learn How to Build and Manage Services in the Cloud"
  desc="In today’s fast-paced tech landscape, microservices have emerged as one of the most efficient ways to architect and manage scalable, flexible, and resilient cloud-based systems. Whether you're working with large-scale applications or building somethi..."
  url="https://freecodecamp.org/news/the-microservices-book-build-and-manage-services-in-the-cloud#heading-how-to-implement-microservices"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png"/>

In this chapter, we will begin applying the concepts we discussed earlier as we go through the practical steps. We’ll dive into building a sample project to demonstrate the core aspects of microservices architecture. By focusing on a simple use case, we will walk through how to develop and deploy microservices that are loosely coupled, independently deployable, and scalable.

The scenario we will cover involves developing a microservice system for an e-commerce platform, where we will focus on creating RESTful APIs. These APIs will allow different services, such as product catalog, user management, and order processing, to interact seamlessly while maintaining independence.

You will learn how to design each service with clear boundaries, handle communication between them, and ensure that the services remain decoupled yet cohesive.

We’ll cover topics like designing and implementing RESTful APIs, integrating services via HTTP or message queues, and introducing important concepts such as service discovery and API gateways. Each subsection will build on the previous one, so by the end of the chapter, you’ll have a solid understanding of how to create and deploy a functioning microservices application, ready for further expansion and integration.

---

## Creating RESTful APIs

You’ll implement APIs that follow REST principles to allow communication between services.

Think of RESTful APIs as menus in a restaurant, where each menu item (API endpoint) corresponds to a specific dish (service functionality).

```js
// Node..js with Express
const express = require('express');
const app = express();
app.use(express.json());

const users = [];

app.post('/users', (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).send(user);
});

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(3000, () => console.log('User service running on port 3000'));
```

This code demonstrates how a **simple RESTful API** is implemented in Node.js using the Express framework. This API demonstrates **basic CRUD (Create and Read) operations** for a `users` resource, adhering to REST principles by providing endpoints that represent specific operations on the `users` data.

The `app.use(express.json());` line enables Express to parse incoming JSON data, allowing the server to handle `POST` requests with JSON bodies. This is essential because microservices often communicate in JSON, making it a standard format for data exchange in RESTful APIs.

The `POST /users` route allows clients to create a new user by sending JSON data representing the user. In the route, the `req.body` object captures this incoming data. The server then stores this data in the `users` array.

It responds with a status code `201` (indicating resource creation) and sends back the user object to confirm the successful addition. This design aligns with REST principles by using a standard HTTP method (`POST`) for creating resources and returning meaningful HTTP status codes.

The `GET /users/:id` route allows clients to retrieve a specific user by their `id`. This endpoint uses `req.params.id` to access the `id` parameter provided in the request URL.

The code searches the `users` array for a matching user, converts the `id` to an integer (since it’s stored as a string in the URL), and sends back the user data if found.

If no match is found, the server responds with a `404` status code, indicating that the user was not found. This standard error handling approach makes the API client-friendly by providing clear feedback.

The final part, `app.listen(3000)`, starts the server on port 3000 and logs a message to confirm the service is running. This allows other services or clients to access the API by making HTTP requests to this port.

This code exemplifies a RESTful approach to creating a simple, stateless API for managing users in a microservice, with endpoints that map intuitively to create and read operations on a user resource.

---

## Handling Authentication and Authorization

You’ll want to implement mechanisms to secure access to your microservices.

This is like issuing badges to employees to ensure only authorized personnel can enter specific areas of a building.

```js
// Using JWT for Authentication
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
app.use(express.json());

// Generate JWT Token
app.post('/login', (req, res) => {
  const user = req.body; // Assume user validation here
  const token = jwt.sign({ userId: user.id }, 'secret_key');
  res.send({ token });
});

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});

app.listen(3000, () => console.log('Authentication service running on port 3000'));
```

In this snippet, you can see that JWT (JSON Web Tokens) are used to handle **authentication and authorization** in a Node.js application. The code demonstrates the entire flow, from generating a JWT token when a user logs in, to using that token to protect specific routes in the application.

First, in the `POST /login` route, the application generates a JWT token for a user. Here, the user’s information is expected to be provided in `req.body`, simulating a login process. In a real-world scenario, this step would include user validation (such as checking the username and password against a database).

Upon a successful "login," the `jwt.sign()` method creates a token using the `user.id` as the payload and a `secret_key`. This token is returned to the user and serves as a kind of "badge" that represents their identity and access rights. The client can store this token and send it with future requests to authenticate themselves.

The `authenticateToken` middleware function demonstrates how the server can validate this token on protected routes. When a request is made to a secured route, the middleware checks for a token in the `Authorization` header (`req.headers['authorization']`).

If no token is found, the server responds with a `401 Unauthorized` status, indicating that the client has not authenticated. If a token is present, the `jwt.verify()` method checks its validity using the same `secret_key` that was used to create it.

If the token is invalid (for example, expired or tampered with), the server sends a `403 Forbidden` status. If the token is valid, the middleware adds the `user` information to `req.user` and calls `next()` to allow the request to proceed to the protected route.

The protected route `GET /protected` demonstrates the benefit of using JWT for securing routes. Only requests containing a valid token can reach this route, providing controlled access to sensitive parts of the application.

This approach centralizes the responsibility for verifying the token, streamlining authentication across different services if used in a microservices context. It allows other services to quickly verify user access by using the token without needing to query a central user database on each request, a critical efficiency in distributed systems.

By including this kind of token-based authentication, developers create a more secure and efficient system for controlling access within their microservices architecture.

---

## API Gateway Pattern

The API Gateway pattern is a crucial design pattern in microservices architecture.  
It acts as an entry point for all client requests, routing them to the appropriate microservices. The API Gateway abstracts the underlying complexity of microservices, providing a unified interface for clients to interact with.

Think of the API Gateway as a receptionist in a large office building.  
The receptionist directs visitors to the appropriate office based on their needs, ensuring they don’t have to navigate the entire building on their own.

### Responsibilities of an API Gateway

- **Request Routing:** The gateway directs incoming requests to the appropriate microservice based on the request's endpoint.
- **Authentication and Authorization:** It handles authentication, ensuring that only authorized users can access specific services.
- **Rate Limiting:** The gateway can limit the number of requests a client can make in a given time to prevent abuse.
- **Load Balancing:** It can distribute incoming requests across multiple instances of a service to ensure a balanced load and high availability.
- **Caching:** The gateway can cache responses from services to reduce load and improve response times for frequently requested data.
- **Protocol Translation:** It can translate between different protocols (e.g., HTTP to WebSocket) to enable communication between services using different protocols.

```js
const express = require('express');
const app = express();

app.use('/users', (req, res) => {
    // Forward the request to the user service
    const userServiceUrl = 'http://user-service:3001';
    // Example: proxy the request to the user service
    req.pipe(request({ url: userServiceUrl + req.url })).pipe(res);
});

app.listen(3000, () => {
    console.log('API Gateway running on port 3000');
});
```

Here, you can see how an API Gateway is set up in Node.js using Express to act as an entry point for all client requests, routing them to the appropriate microservice—in this case, a user service.

The API Gateway abstracts the complexity of microservices architecture by providing a single unified interface, ensuring that clients do not have to know about or navigate the underlying service endpoints directly.

The code begins by setting up an Express application, which represents the gateway service. The route `'/users'` is defined to handle requests to the user service. When a request is made to this route, the code dynamically forwards (or "proxies") the request to the designated URL of the user service, which in this example is `http://user-service:3001`.

The `req.pipe(request({ url: userServiceUrl + req.url })).pipe(res);` line forwards the client's request to the user service's endpoint, waits for the response, and then sends it back to the client.

This forwarding mechanism uses streams (`req.pipe` and `.pipe(res)`) to efficiently pass data between the client and the user service, enabling the API Gateway to seamlessly route requests and responses without needing to manually handle each request component.

In this setup, the API Gateway could also potentially handle other responsibilities like authentication, rate limiting, caching, or load balancing by adding relevant middleware before or after forwarding the request to the user service.

By centralizing these responsibilities in the gateway, developers can ensure consistency and simplify configuration across microservices. Furthermore, this design is highly flexible: the API Gateway could be extended to route requests to other services (e.g., order, payment) as the architecture grows, without exposing the direct endpoints of these services to the client.

This way, the API Gateway efficiently manages communication between clients and the underlying microservices, while also allowing for streamlined security and protocol management across the system.

::: tabs

@tab Advantages of API Gateway

- Simplifies client interactions by providing a single entry point.
- Centralizes cross-cutting concerns like security, logging, and monitoring.
- Improves security by hiding the internal architecture of microservices from external clients.

@tab Challenges of API Gateway

- The API Gateway can become a bottleneck if not properly scaled.
- It introduces additional latency due to the extra network hop.
- Complexity in managing and configuring the gateway increases as the number of services grows.

:::

---

## Strangler Fig Pattern

The Strangler Fig pattern is a strategy for gradually replacing a legacy monolithic application with a new microservices-based architecture. The pattern is named after the strangler fig tree, which grows around and eventually replaces its host tree.

Imagine a vine slowly growing around a tree. Over time, the vine strengthens and eventually replaces the tree. Similarly, the new microservices gradually replace the old monolithic system until the legacy application is completely phased out.

### Steps to Implement Strangler Fig:

- **Identify Components:** Begin by identifying the components of the monolithic application that can be isolated and replaced by microservices.
- **Build and Deploy New Services:** Develop microservices that replicate the functionality of the identified components.
- **Route Traffic:** Use an API Gateway or similar routing mechanism to direct relevant traffic to the new microservices while the rest of the traffic continues to flow to the monolith.
- **Incremental Replacement:** Gradually replace more components of the monolith with microservices, routing traffic accordingly until the entire monolithic application is replaced.
- **Decommission the Monolith:** Once all functionality has been transferred to microservices, the legacy system can be decommissioned.

### Example of Using the Strangler Fig Pattern:

- **Phase 1:** A monolithic e-commerce application handles product listing, user authentication, and order processing. You’d start by creating a microservice for user authentication.
- **Phase 2:** Traffic related to authentication is routed to the new microservice while the rest continues to be handled by the monolith.
- **Phase 3:** Over time, you’d add more microservices for product listing and order processing, gradually strangling the monolith until it's completely replaced.

::: tabs

@tab:active Advantages of the Strangler Fig Pattern

- Minimizes risk by allowing a gradual transition to microservices.
- Reduces downtime and disruption since changes are made incrementally.
- Allows for continuous improvement and refactoring during the transition.

@tab Challenges of the Strangler Fig Pattern

- Requires careful planning and coordination to avoid disrupting the existing application.
- The coexistence of monolithic and microservices components can complicate deployment and operations.
- Managing data consistency between the monolith and microservices during the transition can be challenging.

:::

---

## Backend for Frontend (BFF) Pattern

The Backend for Frontend (BFF) pattern involves creating separate backend services tailored to the needs of different user interfaces or client types (for example, web, mobile, IoT).

Each BFF acts as a specialized API Gateway that aggregates data from various microservices and presents it in a format optimized for the specific client.

Imagine different versions of a product manual for various audiences—one for engineers, one for customers, and one for marketing.

Each version presents the same core information but is tailored to meet the specific needs and language of its audience.

### Steps to Implement the BFF Pattern:

- **Client-Specific Backends:** Develop a separate BFF for each client type. For example, you might have one BFF for a web application and another for a mobile app.
- **Aggregation of Data:** Each BFF aggregates and processes data from multiple microservices to provide a cohesive response to the client. This reduces the number of requests a client needs to make and tailors the response to the client’s needs.
- **Custom Business Logic:** Each BFF can include custom business logic that is specific to the client type, such as formatting data differently for mobile versus web or implementing client-specific optimizations.

```js :collapsed-lines
const express = require('express');
const app = express();

// BFF for mobile clients
app.get('/mobile/products', async (req, res) => {
    const productData = await fetchProductService();
    const reviewData = await fetchReviewService();
    res.json({ products: productData, reviews: reviewData });
});

// BFF for web clients
app.get('/web/products', async (req, res) => {
    const productData = await fetchProductService();
    const reviewData = await fetchReviewService();
    const recommendationData = await fetchRecommendationService();
    res.json({ products: productData, reviews: reviewData, recommendations: recommendationData });
});

app.listen(4000, () => {
    console.log('BFF for Frontend running on port 4000');
});

async function fetchProductService() {
    // Logic to fetch product data
}

async function fetchReviewService() {
    // Logic to fetch review data
}

async function fetchRecommendationService() {
    // Logic to fetch recommendation data
}
```

In this implementation, you can see how the Backend for Frontend (BFF) pattern is implemented using Node.js and Express, creating tailored endpoints specifically for different types of clients (such as mobile and web).

The BFF pattern is useful when different clients—such as a mobile app and a web app—need to access similar but customized data from the backend. Here, the server defines two routes: `/mobile/products` for mobile clients and `/web/products` for web clients.

Both endpoints retrieve product and review data, but the web client’s endpoint fetches additional recommendation data to enhance the user experience with recommendations only relevant to web-based interactions.

In the first route, `app.get('/mobile/products')`, a request is handled by fetching product and review data through the helper functions `fetchProductService` and `fetchReviewService`, which are async functions that simulate calls to backend services or databases.

The results are then aggregated and sent as a single JSON response back to the mobile client, reducing the number of requests the client needs to make. This approach optimizes the experience for mobile users by delivering only essential information, which minimizes data usage and speeds up response times.

Similarly, in the second route, `app.get('/web/products')`, the server fetches the same product and review data but also includes recommendation data via `fetchRecommendationService`.

This endpoint is more tailored to the needs of a web interface, where users might benefit from additional recommendations displayed alongside product listings. This custom response aggregation, specific to each client, embodies the BFF pattern by structuring responses based on client requirements, optimizing the client-server interaction, and making backend processing more efficient.

The server listens on port 4000, acting as a dedicated layer for frontend communication that hides the complexity of backend services from clients.

By using distinct BFFs, each client’s needs are met directly through dedicated logic paths, improving efficiency, reducing overhead, and allowing each client to access precisely the data it needs in a single request.

This code provides a clear example of how data aggregation and client-specific tailoring can simplify and streamline API interactions in a microservices architecture.

::: tabs

@tab:active Advantages of the BFF Pattern

- Tailors the backend services to the specific needs of each client, improving performance and user experience.
- Reduces the complexity of front-end code by offloading aggregation and transformation tasks to the BFF.
- Allows for independent evolution of different clients and their corresponding backends.

@tab Challenges of the BFF Pattern

- Increases the number of services to maintain, as each client type requires its own BFF.
- Potential for code duplication if similar logic is required across multiple BFFs.
- Coordination between BFFs and the underlying microservices is required to ensure consistency and efficiency.

:::