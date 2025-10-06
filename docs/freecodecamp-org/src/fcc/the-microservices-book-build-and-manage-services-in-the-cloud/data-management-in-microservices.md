---
lang: en-US
title: "Data Management in Microservices"
description: "Article(s) > (4/18) The Microservices Book - Learn How to Build and Manage Services in the Cloud" 
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
      content: "Article(s) > (4/18) The Microservices Book - Learn How to Build and Manage Services in the Cloud"
    - property: og:description
      content: "Data Management in Microservices"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/fcc/the-microservices-book-build-and-manage-services-in-the-cloud/data-management-in-microservices.html
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
  url="https://freecodecamp.org/news/the-microservices-book-build-and-manage-services-in-the-cloud#heading-data-management-in-microservices"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1732028836710/aedce669-1e41-4bb1-8619-6994ed741b5c.png"/>

---

## Database per Service Pattern

Each microservice has its own database, ensuring data encapsulation and independence.

And each department in a company has its own filing system, ensuring that data is kept separate and managed independently.

```js
// Simulating separate databases for User and Order services
const userDatabase = {};
const orderDatabase = {};

function addUser(user) {
  userDatabase[user.id] = user;
}

function addOrder(order) {
  orderDatabase[order.id] = order;
}
```

In this code, you can see how **separate databases** are being simulated for the `User` and `Order` services. Each microservice manages its own isolated database (`userDatabase` and `orderDatabase`), ensuring that the data for users and orders is kept separate, just like how different departments within a company manage their own filing systems to avoid interference.

1. **User Service Database**: The `userDatabase` object acts as the storage for all user-related data. The `addUser` function adds new users to this database by storing user information with a unique `user.id` as the key. This means that all user data is managed and stored by the User Service independently of any other service.
2. **Order Service Database**: Similarly, the `orderDatabase` object stores all order-related data, with the `addOrder` function adding orders using their unique `order.id`. Again, the order data is managed and stored by the Order Service independently, without any interference from the User Service.

The key concept demonstrated here is the **Database per Service** pattern, which is a fundamental aspect of microservices architectures.

By ensuring that each service (for example, User Service, Order Service) has its own database, you prevent issues related to tight coupling between services.

Each service can evolve and scale independently, managing its own data in a way that best suits its functionality.

In this scenario, if the `User` service needs to change its database schema (for example, adding more fields to the user data), it can do so without affecting the `Order` service.

Similarly, if the `Order` service needs to optimize its data management or scale independently, it can do so without relying on the `User` service's database.

This approach makes each service self-contained, thus supporting easier maintenance and greater scalability.

---

## Data Consistency and Synchronization

Ensuring consistency across services and handling data synchronization challenges are key when working with microservices.

This is like synchronizing calendars across multiple devices to ensure all appointments are up-to-date.

There are various strategies you can use to handle these issues:

### 1. Event Sourcing

Event sourcing involves storing changes to data as a sequence of events rather than a single state. It’s like keeping a diary of every change rather than just recording the final status.

```js
const events = []; // Event log

function addUserEvent(user) {
  events.push({ type: 'USER_CREATED', payload: user });
}

function replayEvents() {
  events.forEach(event => {
    if (event.type === 'USER_CREATED') {
      console.log('Replaying event:', event.payload);
    }
  });
}
```

In the code above, you can see how **events are logged and replayed** in an event-sourcing pattern:

- **Event Logging with** `addUserEvent`: The `addUserEvent` function simulates adding a "user created" event to an event log (`events` array). Each event includes a `type` property, which identifies the type of event (in this case, `'USER_CREATED'`), and a `payload` property that contains the actual data for the event. Every time a new user is created, the `addUserEvent` function captures this change as a new entry in the `events` array, keeping a record of the action.
- **Replaying Events with** `replayEvents`: The `replayEvents` function demonstrates how to go through the recorded events and process them. It iterates over each event in the `events` array, checking the `type` of each event. If an event is of type `'USER_CREATED'`, it logs the payload of the event. This replaying process is central to event sourcing, as it enables the system to "recreate" the state based on the sequence of events. Here, the `console.log` statement serves as a placeholder, which could be replaced with any logic needed to actually apply or process the event data.

This example illustrates the **event sourcing principle** of retaining a record of each significant change as a discrete event, rather than just updating the state directly.

By capturing changes as events, we gain a historical log of all actions, which can be replayed for auditing, debugging, or reconstructing the system state at any specific point in time.

This concept is similar to maintaining a detailed diary rather than just summarizing the current state—each entry preserves context about changes that occurred over time.

### 2. CQRS (Command Query ResponsibilitSegregation)

and query (read) operations.

It’s like having separate teams for handling customer service requests (commands) and handling customer inquiries (queries).

```js
// Command: Modify data
function createUser(user) {
  // Code to create user
}

// Query: Retrieve data
function getUser(userId) {
  // Code to get user
}
```

In this code, you can see **how commands and queries are separated** in CQRS:

- **Command -** `createUser`: The `createUser` function represents a command. In the context of CQRS, a command is an operation that modifies the state of the application. Here, `createUser` would include logic to add a new user to the system, modifying the database by inserting new user data. Commands in CQRS focus solely on changing the data: they don’t return the updated data or information about the system state but rather indicate an action to be performed.
- **Query -** `getUser`: The `getUser` function represents a query. In CQRS, queries are used solely to retrieve data without altering the system state. This function could contain logic to look up and return user information based on the provided `userId`. Since queries only retrieve data, they don’t impact the underlying data and can be optimized for fast reads, enabling the system to scale read operations as needed.

By separating these operations into distinct functions, CQRS helps enforce the idea that reading and modifying data should not be intermixed.

This separation improves clarity, as each function has a clear purpose and responsibility.

It also allows the system to handle high volumes of read requests without impacting write operations (and vice versa), making the architecture more resilient and scalable for complex applications.

The analogy to separate teams handling different tasks is helpful here. Just as one team might handle customer service requests (for example, resolving issues or making changes) and another team handles customer inquiries (for example, answering questions or providing information), the code separates commands and queries into distinct functions for specialized purposes.
