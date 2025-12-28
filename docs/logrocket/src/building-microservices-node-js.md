---
lang: en-US
title: "Building microservices with Node.js"
description: "Article(s) > Building microservices with Node.js"
icon: fa-brands fa-node
category:
  - Node.js
  - MongoDB
  - Article(s)
tag:
  - blog
  - blog.logrocket.com
  - node
  - nodejs
  - node-js
  - mongodb
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Building microservices with Node.js"
    - property: og:description
      content: "Building microservices with Node.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-microservices-node-js.html
prev: /programming/js-node/articles/README.md
date: 2024-10-22
isOriginal: false
author:
  - name: Frank Joseph
    url : https://blog.logrocket.com/author/frankjoseph/
cover: /assets/image/blog.logrocket.com/building-microservices-node-js/banner.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "MongoDb > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/mongodb/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Building microservices with Node.js"
  desc="Build efficient Node.js microservices with MongoDB, exploring the architecture, real-time updates, and seamless communication strategies."
  url="https://blog.logrocket.com/building-microservices-node-js"
  logo="/assets/image/blog.logrocket.com/favicon.png"
  preview="/assets/image/blog.logrocket.com/building-microservices-node-js/banner.png"/>

::: note Editor’s note

This article was last updated by [<VPIcon icon="fas fa-globe"/>Muhammed Ali](https://blog.logrocket.com/author/muhammedali/) on 22 October 2024 to cover using MongoDB change streams to enable real-time data synchronization between microservices.

:::

![Building Microservices With Node.js](/assets/image/blog.logrocket.com/building-microservices-node-js/banner.png)

In early software development, applications were built as monolithic structures, tightly coupling all components into a single system. This approach makes even minor changes challenging, as any fault in one component can disrupt the entire system.

Today, we can avoid these issues by [**using microservices**](/blog.logrocket.com/improve-microservice-architecture-graphql-api-gateways.md). Microservices allow us to develop each component independently, so faults in one part don’t impact the whole application. In this article, we’ll dive into microservices, demonstrate how to create a microservice with Node.js, and explore how this approach is reshaping software development.

::: note Prerequisites

To follow along, you’ll need:

- Node.js installed in your machine
- Basic knowledge of JavaScript and Node.js

:::

---

## Microservices vs. monolithic applications

### What are monolithic applications?

A monolithic application is a single-tiered software where all components (e.g., `books` and `users` in a library management system) are interconnected and dependent on a single codebase. Any fault in one component affects the entire system.

::: tabs

@tab:active Pros of monolithic architecture

- **Cost-effective to build**: Less expensive initial development because all components share the same environment
- **Simplicity**: Easier to develop, test, and deploy when all components are unified

@tab Cons of monolithic architecture

- **Lack of scalability**: Scaling usually means scaling the entire application
- **Flexibility issues**: Any modification requires redeploying the entire system
- **Reliability concerns**: A single point of failure can bring down the entire system

:::

### What are microservices?

Microservices architecture consists of small, autonomous services where each feature (e.g., `payment`, `cart` in an ecommerce store) operates independently with its own server and database. Applications built with this kind of architecture are loosely coupled, also referred to as distributed applications.

In the ecommerce store example, models for `cart` and `customers` would communicate with each other using APIs like REST. Because we’ll develop our store features independently from each other, if our system develops a fault, we can easily identify which feature to debug and avoid having to bring down the entire application.

::: tabs

@tab:active Pros of microservices

- **Scalability**: Unlike monolithic applications, apps developed using microservices can be scaled independently based on demand
- **Flexibility**: Individual components can be developed, tested, and deployed independently. You can even use different languages to develop different features in a microservice application

@tab Cons of microservices

- **Complexity in management**: Requires expertise in handling distributed systems because integration and end-to-end testing can be challenging
- **Higher operational costs**: Each microservice may become bulky, resulting in high maintenance costs
- **Migration challenges**: Transitioning from monolithic to microservices can be challenging, particularly in locating services within a distributed network

:::

---

## Communication between microservices

Choosing a microservice architectural pattern comes with some challenges; one of these is service-to-service communication. Services are a loosely coupled part of an application that together contribute to the application’s overall performance.

To achieve effective performance, there has to be a [**means of communication between the microservices**](/blog.logrocket.com/methods-for-microservice-communication.md). In a microservice application, communication is made possible through an inter-service communication protocol like HTTP(s), gRPC, or message brokers.

Let’s review some of the ways in which services establish communication in a microservice architecture.

### HTTP communication

HTTP communication is a kind of synchronous communication pattern where a service is dependent on another to perform:

![HTTP Communication Request Response Diagram](/assets/image/blog.logrocket.com/building-microservices-node-js/http-communication-request-response-diagram.png)

The image above represents the HTTP request-response cycle, where the client makes a request and waits for a response from the server-side application.

### Event-driven communication pattern

The event-driven communication pattern entails an interaction between a service provider and a service consumer. The service consumer requires a resource from an external source. It then performs some computations and relays the response to the client:

![Event-Driven Communication Pattern Diagram](/assets/image/blog.logrocket.com/building-microservices-node-js/event-driven-communication-pattern-diagram.png)

---

## Using Node.js for our microservice

You can use any programming language to develop a microservice, like Java, C#, or Python, but Node.js is a good choice for a few reasons:

- Node uses an event-driven architecture, enabling efficient, real-time application development
- [**Node.js’ single-threading and asynchronous capabilities**](/blog.logrocket.com/complete-guide-threads-node-js.md) support a non-blocking mechanism
- Developers benefit from an uninterrupted workflow, enjoying Node’s speed, scalability, and easy maintenance

---

## Build a simple microservice application with Node.js

In this section, we’ll develop two microservices for a simple blog application using Node.js and MongoDB. One service will manage posts, while the other will handle comments.

We’ll also implement real-time communication between these services using MongoDB change streams, which enable you to listen to real-time data changes in your MongoDB collections. By using `db.collection.watch()`, you can react to data updates, inserts, or deletes as they occur. In our case, the comment microservice will notify the post microservice whenever a comment is added, and the post will update accordingly.

::: note Prerequisites

- **MongoDB**: Ensure that your MongoDB instance is set up as a replica set, as change streams require this configuration
- **Node.js** **and** **npm**: Make sure Node.js and npm are installed on your system

:::

### Setting up the post microservice

Create a new folder called `blog` and initialize a Node.js project:

```sh
npm init -y
npm install express mongoose cors
```

Then, create <VPIcon icon="fa-brands fa-js"/>`postService.js` and <VPIcon icon="fa-brands fa-js"/>`commentService.js` files in the <VPIcon icon="fas fa-folder-open"/>`blog` folder. In the <VPIcon icon="fa-brands fa-js"/>`postService.js` file, paste in the following code, which will handle the post microservice:

```js :collapsed-lines title="blog/postService.js"
const express = require('express');
const mongoose = require('./db');
const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    comments: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    createdAt: { type: Date, default: Date.now },
  });
const Post = mongoose.model('Post', PostSchema);
const app = express();
app.use(express.json());
// Listen to MongoDB Change Streams for the comments collection
mongoose.connection.once('open', () => {
    console.log('Post service connected to MongoDB');

    const changeStream = mongoose.connection.collection('comments').watch();

    changeStream.on('change', async (change) => {
      if (change.operationType === 'insert') {
        const comment = change.fullDocument;
        try {
          // Find the associated post and update its comments array
          await Post.findByIdAndUpdate(
            comment.postId,
            { $push: { comments: { text: comment.text, createdAt: comment.createdAt } } },
            { new: true }
          );
          console.log(`Updated post with new comment: ${comment.text}`);
        } catch (error) {
          console.error('Failed to update post with new comment:', error);
        }
      }
    });
  }); 
app.post('/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).send(post);
});
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.send(posts);
});
app.listen(process.env.PORT, () => {
  console.log(`Post service running on port ${process.env.PORT}`);
});
```

The code defines a `Post` model with fields for the title, content, an array of comments, and timestamps. The application connects to MongoDB and establishes a change stream on the `comments` collection, listening for insert events to update the corresponding post’s comments array in real time.

Now, let’s create a file to handle the database (<VPIcon icon="fa-brands fa-js"/>`db.js`) and paste in the following code:

```js title="db.js"
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
module.exports = mongoose;
```

Next, create the <VPIcon icon="fas fa-file-lines"/>`.env` file, which will contain the database URI and port:

```sh title=".env"
MONGO_URI=mongodb://localhost:27017,localhost:27018,localhost:27019/test?replicaSet=rs0
PORT=4000
```

Next, paste the following code in the file for `CommentService` (<VPIcon icon="fa-brands fa-js"/>`commentService.js`):

```js title="commentService.js"
const express = require('express');
const mongoose = require('./db');
const CommentSchema = new mongoose.Schema({
  postId: mongoose.Schema.Types.ObjectId,
  text: String,
  createdAt: { type: Date, default: Date.now },
});
const Comment = mongoose.model('Comment', CommentSchema);
const app = express();
app.use(express.json());
app.post('/comments', async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.status(201).send(comment);
});
app.get('/comments/:postId', async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId });
  res.send(comments);
});
app.listen(4001, () => {
  console.log('Comment service running on port 4001');
});
```

The code above defines a `CommentSchema` that includes fields for `postId`, `text`, and `createdAt`, with `postId` being a reference to the ID of the related post. A Mongoose model named `Comment` is created based on this schema.

The Express app is configured to parse JSON requests and includes two routes: a `POST` route at `/comments` that saves a new comment to the database and responds with the created comment and a `GET` route at `/comments/:postId` that retrieves and returns all comments associated with a specified `postId`.

Now you can run each microservice in separate terminal/command line windows:

```sh
node commentService.js
node postService.js
```

On another terminal, run the following command to create a new post:

```sh
curl -X POST http://localhost:4000/posts \
-H "Content-Type: application/json" \
-d '{
  "title": "My First Post",
  "content": "This is the content of my first post."
}'
```

Now run the following command to check the list of posts and get the ID of the post you just created:

```sh
curl http://localhost:4000/posts
```

![The Generated ID Of The Post You Created](/assets/image/blog.logrocket.com/building-microservices-node-js/generated-id-post-you-created.png)

Now we can create a comment by attaching the associated post using its ID:

```sh
curl -X POST http://localhost:4001/comments \
-H "Content-Type: application/json" \
-d '{
  "postId": "672a2b5ab2c87aa17bd7b49b",
  "text": "This is a comment on the post."
}'
```

Now, when you check the post lists again, you should see the comment you just added:

![The New Comment You Added In The Post Lists](/assets/image/blog.logrocket.com/building-microservices-node-js/new-comment-post-list.png)

---

## Conclusion

In this guide, we explored the advantages of microservices over monolithic applications, especially for flexibility, scalability, and independent service management. We demonstrated how to build a simple microservice with Node.js, connecting two independent services — a `posts` service and a `comments` service — using MongoDB change streams for real-time updates.

Using Node.js’ event-driven architecture and MongoDB’s real-time capabilities, microservices can offer efficient, scalable solutions adaptable to complex applications.

We’d love to hear your experiences and insights on microservices in the comments below!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Building microservices with Node.js",
  "desc": "Build efficient Node.js microservices with MongoDB, exploring the architecture, real-time updates, and seamless communication strategies.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.logrocket.com/building-microservices-node-js.html",
  "logo": "/assets/image/blog.logrocket.com/favicon.png",
  "background": "rgba(112,76,182,0.2)"
}
```
