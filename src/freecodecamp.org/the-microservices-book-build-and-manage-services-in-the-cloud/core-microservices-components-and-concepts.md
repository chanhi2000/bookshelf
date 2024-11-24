---
lang: en-US
title: "Core Microservices Concepts and Components"
description: "Article(s) > (3/18) The Microservices Book – Learn How to Build and Manage Services in the Cloud" 
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
      content: "Article(s) > (3/18) The Microservices Book – Learn How to Build and Manage Services in the Cloud"
    - property: og:description
      content: "Core Microservices Concepts and Components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/the-microservices-book-build-and-manage-services-in-the-cloud/core-microservices-components-and-concepts.html
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
  url="https://freecodecamp.org/news/the-microservices-book-build-and-manage-services-in-the-cloud#heading-core-microservices-components-and-concepts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png"/>

In this section, we’ll delve into the essential building blocks of microservices architecture, breaking down the principles and mechanisms that make it functional, scalable, and adaptable.

This section will cover key concepts such as service boundaries, API communication, and data management. Each component plays a vital role in enabling microservices to operate independently yet cohesively as part of a larger system.

You’ll explore the architectural practices that will let you deploy, scale, and manage microservices separately, while also understanding the importance of orchestration, inter-service communication, and monitoring.

These foundational elements are crucial for building reliable microservices applications and will provide a deeper look at the architecture's inner workings. This understanding will help you apply microservices principles effectively, ensuring that they add value to complex, distributed applications.

---

## Microservices Design Principles

Here are some important principles to keep in mind when you’re designing microservices:

### Single Responsibility Principle

Each microservice should focus on a single responsibility or business capability.  
This principle ensures that each service is specialized and manageable.

Think of a microservice as a specialized department in a company. For example, a company has separate departments for HR, Finance, and Sales, each handling its specific tasks.

```js
// User Service - Manages user-related functionalities
class UserService {
  createUser(user) {
    // Code to create a user
  }
  getUser(userId) {
    // Code to get a user by ID
  }
}

// Order Service - Manages order-related functionalities
class OrderService {
  createOrder(order) {
    // Code to create an order
  }
  getOrder(orderId) {
    // Code to get an order by ID
  }
}
```

In this code, you can see how each class—`UserService` and `OrderService`—is created to focus on a single responsibility.

The `UserService` class is solely responsible for user-related tasks, such as creating a new user (`createUser(user)`) and retrieving a user by their ID (`getUser(userId)`).

By keeping these responsibilities separate, changes in user-related logic can be managed within `UserService` without affecting other services.

Similarly, `OrderService` is dedicated to managing order-related tasks, providing functions to create orders (`createOrder(order)`) and retrieve orders by their ID (`getOrder(orderId)`).

This approach aligns with the Single Responsibility Principle by ensuring that each service can evolve or scale based on its specific function without cross-dependencies.

For instance, if new features for handling complex user interactions are added, only `UserService` will require updates, leaving `OrderService` unaffected.

This isolation not only simplifies maintenance and testing but also supports independent scaling, as each service can be deployed, scaled, and optimized independently based on demand.

By encapsulating distinct business capabilities in individual services, this approach enables a cleaner, more modular, and manageable architecture—a crucial benefit for systems that may grow in complexity over time.

### Decentralized Data Management

Each microservice manages its own database or data storage, avoiding shared databases between services.

Imagine each department in a company has its own filing cabinet. HR, Finance, and Sales each store their documents separately, so they don’t interfere with each other.

```js
// Simulating a decentralized database approach
const userDatabase = {}; // Simulated database for user service
const orderDatabase = {}; // Simulated database for order service

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

In this code, you can see how each microservice independently manages its own data. Here’s how it works in detail:

1. **Separate Data Stores**: The `userDatabase` object simulates a standalone database dedicated to user data, while the `orderDatabase` object serves as a separate storage for order data. Each service accesses only its respective database, following the decentralized data management principle.
2. **UserService Class**: The `UserService` class provides methods to create and retrieve user data. The `createUser` method adds a user to the `userDatabase`, using `user.id` as the unique key, and the `getUser` method retrieves a user based on their `userId`. This class is isolated from the `OrderService`, meaning changes to user-related logic or data will not interfere with order data.
3. **OrderService Class**: Similarly, the `OrderService` class manages its own data. The `createOrder` method stores an order in the `orderDatabase`, with `order.id` serving as a unique identifier, and `getOrder` retrieves an order by its ID.

By isolating data management responsibilities to each service, this code snippet ensures that the user-related and order-related data remain distinct.

This reduces interdependencies between services, which is crucial for achieving high reliability and scalability in a microservices architecture.

In a real-world scenario, each microservice would likely use a separate database instance (for example, separate SQL or NoSQL databases) rather than simple objects, but the principle remains the same.

Each service has full ownership and control over its data, which allows for independent scaling, maintenance, and updates without affecting other services.

### API-First Design

It’s a good idea to design APIs before implementing the services to ensure clear interaction contracts between services.

Before building a bridge, engineers create detailed blueprints to define how vehicles and pedestrians will use it. Similarly, designing APIs defines how services will communicate.

```js
// Define API contract for User Service
function createUser(user) {
  // POST /users endpoint
}

function getUser(userId) {
  // GET /users/:id endpoint
}

// Define API contract for Order Service
function createOrder(order) {
  // POST /orders endpoint
}

function getOrder(orderId) {
  // GET /orders/:id endpoint
}
```

In the code above, you can see how each function represents a different API endpoint, specifying the action that each endpoint should perform and the HTTP methods associated with each action.

This allows for an organized approach to creating APIs for our services and ensures that each service's interface is clearly defined before implementation.

Here’s how each function works and the purpose it serves:

- The functions `createUser(user)` and `getUser(userId)` are defined for the `User Service`, representing the expected API contract for handling user data. <br/>The `createUser` function corresponds to a `POST /users` endpoint, indicating that this function is designed to create a new user.<br/>The choice of the `POST` method is intentional, as it aligns with standard HTTP practices for creating resources. This endpoint would typically accept a `user` object as input in the request body and save that data in the user service's database.
- The `getUser(userId)` function, represented by a `GET /users/:id` endpoint, is designed to retrieve a user's information based on their unique identifier, `userId`.<br/>The `GET` method reflects a read operation, meaning this endpoint will fetch data rather than modify it.<br/>Similarly, the `Order Service` has two endpoint definitions, `createOrder(order)` and `getOrder(orderId)`, corresponding to `POST /orders` and `GET /orders/:id` endpoints, respectively.
- The `createOrder` function is intended to handle new order creation, taking an `order` object and saving it within the service.
- The `getOrder` function retrieves order details based on the `orderId`, providing the necessary data for the requesting client or service.

By defining these endpoints upfront, the API-First Design approach emphasizes creating a clear and well-documented blueprint for how each service should be used.

This approach is comparable to engineers designing blueprints before building a bridge—where these API “blueprints” ensure that services can reliably interact with one another.

These API contracts serve as a formalized communication agreement between services, reducing the risk of misinterpretation or errors during integration.

### Autonomous Deployment and Scaling

Each microservice can be deployed and scaled independently of others.

Imagine each department in a company has its own office space.  
If the HR department grows, it can expand its office without affecting the Sales department’s office.

```js
// Simulated deployment and scaling
class UserService {
  deploy() {
    console.log("Deploying User Service...");
  }
  scale() {
    console.log("Scaling User Service...");
  }
}

class OrderService {
  deploy() {
    console.log("Deploying Order Service...");
  }
  scale() {
    console.log("Scaling Order Service...");
  }
}

const userService = new UserService();
const orderService = new OrderService();

userService.deploy();
orderService.deploy();

userService.scale();
```

In the code above, you can see how each service is treated independently with its own methods for deployment and scaling.

- The `UserService` and `OrderService` classes both contain `deploy()` and `scale()` methods that simulate the ability to launch and adjust the resources dedicated to each service individually.
- The `deploy()` method in each class outputs a message that reflects the action of deploying the service. This action is critical in a cloud environment where services must be managed remotely, often across distributed infrastructure.<br/>Deployment here means making the service available to handle requests, such as by creating new instances of the service in the cloud.
- The `scale()` method simulates increasing the resources allocated to each service, an essential feature in microservices architectures where scaling allows a service to handle an increased load.<br/>For instance, if there is a high demand for user-related actions, only the `UserService` needs to scale, without impacting the resources or operations of `OrderService`.

This approach, much like how each department in a company might manage its office space, allows for resource allocation to be both responsive and resource-efficient.

By creating separate instances for `userService` and `orderService` and then calling the `deploy()` and `scale()` methods, the code highlights how, in practice, these services are intended to operate independently.

This independent operation is fundamental in microservices, ensuring that each service can be scaled or deployed as needed based on demand or new releases, without disrupting or overburdening other parts of the system.

---

## Service Communication: Synchronous vs Asynchronous

We’ll discuss two types of communication here: Synchronous and. Asynchronous communication. Let’s start with the synchronous variety.

In **synchronous communication**, services wait for a response from another service before continuing. This is like making a phone call where you wait for the person on the other end to respond.

```js
async function fetchUser(userId) {
  const response = await fetch(`/users/${userId}`);
  const user = await response.json();
  return user;
}
```

In the code above, you can see how the function uses the `fetch` API to send a request to a specified endpoint (`/users/${userId}`).

Here’s how it works in detail:

1. **Request Setup**: When `fetchUser` is called, it takes `userId` as a parameter and builds a request to an endpoint. The URL (`/users/${userId}`) is set up to retrieve information specifically for that user.
2. **Awaiting the Response**: Using `await`, the function pauses execution until the response arrives from the server. This is the core of synchronous communication: the function stops and waits rather than moving to the next line immediately.
3. **Extracting Data**: After the server responds, `await response.json()` extracts the user data from the response as JSON.
4. **Returning Data**: Finally, the function returns the `user` object containing the requested user data.

This synchronous approach is useful when a service depends on data from another service to continue processing.

For instance, if an e-commerce microservice needs user details before creating an order, it might pause at this point, waiting until `fetchUser` retrieves the required data. This ensures that all necessary information is available before moving forward.

In **asynchronous communication**, on the other hand, services send messages and continue processing without waiting for a response.

This is like sending a letter in the mail. You don’t wait for the recipient’s reply before continuing with your day.

```js
function sendMessage(queue, message) {
  setTimeout(() => {
    console.log(`Message sent to ${queue}: ${message}`);
  }, 1000); // Simulate asynchronous operation
}

sendMessage('orderQueue', 'New order created');
```

In this code example, the `sendMessage` function takes two arguments: `queue` and `message`. Here:

- **queue**: Represents the name of the message queue, which is the target for the message. Think of it as the destination where the message will be processed asynchronously, like "orderQueue" in this example.
- **message**: The content or payload of the message being sent, here being `"New order created"`.

The `setTimeout` function is used to simulate an asynchronous operation by delaying the `console.log` output for 1 second (1000 milliseconds).

This delay represents the time it might take for the message to be sent and processed, though, in reality, the actual sending happens instantly, allowing the program to continue processing other tasks without waiting.

After calling `sendMessage`, the program doesn’t wait for any confirmation and immediately continues with its other operations, reflecting the **non-blocking nature** of asynchronous communication in microservices.

And in this code, you can see how `setTimeout` simulates asynchronous behavior by delaying the message output to demonstrate that `sendMessage` doesn’t hold up any further actions while it "sends" the message.

This mirrors the real-world asynchronous messaging between microservices, where they communicate by posting messages to queues or topics without waiting for an immediate reply.

This approach helps systems stay decoupled and scalable by allowing different services to operate independently, even if they depend on one another for data.

---

## RESTful APIs

REST (Representational State Transfer) uses standard HTTP methods (GET, POST, PUT, DELETE) for service communication.

Think of RESTful APIs like a menu in a restaurant. Each item on the menu (endpoint) corresponds to a specific request (for example, GET to retrieve, POST to create).

```js
// Fetch user using RESTful API
async function getUser(userId) {
  const response = await fetch(`/api/users/${userId}`);
  const user = await response.json();
  return user;
}
```

This code demonstrates the use of a **RESTful API** to fetch user data based on a unique `userId` identifier.

RESTful APIs rely on a standardized set of HTTP methods—such as `GET`, `POST`, `PUT`, and `DELETE`—to interact with resources.

In this example, the `fetch` API is used to retrieve user data from a specified endpoint (`/api/users/${userId}`) by issuing a `GET` request.

This method is asynchronous, which allows the code to wait for the response without blocking other processes.

Here’s how each part of the code functions:

1. **Function Definition**: `getUser` is an `async` function, meaning it returns a Promise and can utilize the `await` keyword for asynchronous operations, making it ideal for handling HTTP requests that may take time to return.
2. **Fetching Data**: Within `getUser`, the `fetch` function initiates an HTTP `GET` request to the specified URL endpoint (`/api/users/${userId}`). This URL is dynamically generated based on the `userId` provided when the function is called. Here, `fetch` represents an API request to retrieve a user's information, acting similarly to ordering a specific item from a menu in a restaurant based on a user-supplied request.
3. **Parsing JSON**: After receiving the response from the server, `await response.json()` is used to parse the JSON data, which contains the user’s information. JSON (JavaScript Object Notation) is the most common format for data exchange in REST APIs, making it easy for different services to communicate with one another.
4. **Return Value**: Once the data is parsed, it’s returned as a JavaScript object containing the user’s information, which can then be utilized elsewhere in the application.

In this code, you can see how the asynchronous nature of `fetch` and `await` works to ensure that the function doesn’t block the program while waiting for the response.

This approach allows the function to perform RESTful communication efficiently, reflecting how microservices interact seamlessly via HTTP requests to fetch, update, or delete resources without impacting the rest of the system.

---

## gRPC and Protocol Buffers

gRPC is a high-performance RPC framework that uses Protocol Buffers for serialization.

gRPC and Protocol Buffers are like a highly efficient postal service that uses a compact and precise form to send messages quickly.

```js
// gRPC server setup
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('user.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

function getUser(call, callback) {
  // Implementation here
}

const server = new grpc.Server();
server.addService(userProto.UserService.service, { getUser });
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure());
server.start();
```

This code sets up a basic **gRPC server** using Protocol Buffers to define the structure and communication format of messages between the client and server.

gRPC (Google Remote Procedure Call) is a high-performance framework that uses **Protocol Buffers** (protobuf) for efficient serialization and deserialization of data.

This setup allows for fast and secure communication between microservices, particularly useful in distributed systems.

Here’s how each part of the code works:

1. **Library Imports**: The code first imports the necessary gRPC library (`grpc`) and a Protocol Buffer loader (`@grpc/proto-loader`). These tools are essential for creating a gRPC server and handling Protocol Buffer files.
2. **Loading Protocol Buffer Definition**: The line `protoLoader.loadSync('user.proto')` loads a Protocol Buffer file called `user.proto`. This file defines the structure of the `UserService` and its `getUser` method. After loading the Protocol Buffer file, the `grpc.loadPackageDefinition()` function converts the package definition into a usable JavaScript object, making the `userProto` service available to the server.
3. **Defining the getUser Function**: The `getUser` function is a placeholder for handling incoming `getUser` requests. The function uses two parameters: `call`, which contains request data sent by the client, and `callback`, which sends back a response. In a production implementation, this function would interact with a database or perform other business logic before responding.
4. **Setting up the Server**: The code initializes a new gRPC server with `const server = new grpc.Server()`. This server will listen for client requests and respond according to the services and methods defined in the Protocol Buffer.
5. **Adding the Service**: The line `server.addService(userProto.UserService.service, { getUser })` registers the `UserService` service and assigns it the `getUser` function as the handler for its requests.
6. **Binding the Server to an Address**: The server is then bound to the local address `127.0.0.1` and port `50051` for listening to incoming requests. Here, `grpc.ServerCredentials.createInsecure()` sets up an insecure connection. In a real-world application, you’d typically use SSL/TLS certificates for secure communication.
7. **Starting the Server**: Finally, `server.start()` begins listening for requests on the specified address and port.

In the code, you can see how the gRPC framework, along with Protocol Buffers, is used to create an efficient and structured server-client communication channel.

This setup enables microservices to communicate rapidly and precisely by using protobuf, which is more compact than JSON or XML and allows for faster message parsing.

This is similar to a well-organized postal service where both the sender and receiver understand the same structured language, ensuring quick and accurate message delivery between services.

---

## Message Brokers (like RabbitMQ and Kafka)

Message brokers manage and route messages between services, enabling asynchronous communication.

A message broker is like a post office that handles and delivers messages between senders and receivers.

```js
const amqp = require('amqplib');

async function sendMessage(queue, message) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue);
  channel.sendToQueue(queue, Buffer.from(message));
  console.log(`Message sent to ${queue}: ${message}`);
  await connection.close();
}

sendMessage('orderQueue', 'New order created');
```

This code demonstrates how to send a message to a **RabbitMQ** message queue using the `amqplib` library in Node.js. Message brokers like RabbitMQ act as intermediaries, managing and routing messages between services asynchronously.

They help decouple services, meaning that services don’t need to wait for responses to continue functioning. RabbitMQ is particularly useful in microservices architectures for distributing tasks, such as order processing or notifications.

Here’s how each part of this code works:

In the code above, you can see how message passing between services is accomplished using RabbitMQ. The `sendMessage` function encapsulates the message-sending process:

1. **Connecting to RabbitMQ**: The line `const connection = await amqp.connect('amqp://localhost`; establishes a connection to the RabbitMQ server. Here, `amqp://localhost` refers to a locally hosted RabbitMQ instance. In a production environment, this would typically be a remote server URL.
2. **Creating a Channel**: The `await connection.createChannel();` line creates a **channel** for sending messages. Channels are lightweight connections over which data can be sent and received. Each channel operates independently, so multiple channels can be used simultaneously without interfering with each other.
3. **Declaring the Queue**: By calling `await channel.assertQueue(queue);`, the code ensures that the specified queue (`orderQueue` in this case) exists. If it doesn’t exist, RabbitMQ will create it. This declaration helps RabbitMQ know where the message should be sent.
4. **Sending the Message**: The line `channel.sendToQueue(queue, Buffer.from(message));` sends the message to the specified queue by converting it to a `Buffer`. Buffers handle binary data, which is how RabbitMQ expects messages to be sent. In this case, the message `"New order created"` is sent to `orderQueue`.
5. **Closing the Connection**: Finally, `await connection.close();` closes the connection to RabbitMQ, ensuring that resources are freed up after the message has been sent.

This setup is similar to a post office that receives and distributes mail. Just as a post office routes letters to their recipients, RabbitMQ ensures messages reach the correct service queues, allowing services to process them when they’re ready.

This code shows how RabbitMQ’s asynchronous communication helps prevent services from blocking each other, enabling a more scalable, reliable application design.
