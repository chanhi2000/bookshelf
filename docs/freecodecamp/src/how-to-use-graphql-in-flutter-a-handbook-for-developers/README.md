---
lang: en-US
title: "How to Use GraphQL in Flutter: A Handbook for Developers"
description: "Article(s) > How to Use GraphQL in Flutter: A Handbook for Developers"
icon: fa-brands fa-dart-lang
category:
  - Dart
  - Flutter
  - Data Science
  - GraphQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - dart
  - flutter
  - data-science
  - graphql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use GraphQL in Flutter: A Handbook for Developers"
    - property: og:description
      content: "How to Use GraphQL in Flutter: A Handbook for Developers"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-graphql-in-flutter-a-handbook-for-developers.html
prev: /programming/dart/articles/README.md
date: 2026-04-06
isOriginal: false
author:
  - name: Atuoha Anthony
    url: https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/66d879b4-18e0-4ebd-9e36-320cdb9b1ac2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "GraphQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/graphql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use GraphQL in Flutter: A Handbook for Developers"
  desc="There's a moment that most Flutter developers experience at some point in their careers. You're building a screen that needs a user's name, their latest five posts, and the like count on each post. Se"
  url="https://freecodecamp.org/news/how-to-use-graphql-in-flutter-a-handbook-for-developers"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/66d879b4-18e0-4ebd-9e36-320cdb9b1ac2.png"/>

There's a moment that most Flutter developers experience at some point in their careers.

You're building a screen that needs a user's name, their latest five posts, and the like count on each post. Seems simple enough. You make a request to `/users/42`, and the server sends back twenty fields you didn't ask for.

You make another request to `/users/42/posts`, and again the server sends back everything it knows about those posts, including fields your UI will never display.

Then you realize you also need the comment count per post, so you loop through the posts and fire five more requests, one per post.

By the time the screen loads, your Flutter app has made seven network requests, downloaded kilobytes of data it immediately discarded, and your users on slower networks are staring at a spinner, wondering if the app is broken.

This isn't a rare edge case. This is the everyday reality of building complex UIs on top of conventional REST APIs, and every developer who has shipped a serious mobile app has felt this friction.

The data you need and the data the API gives you are almost never a perfect match. You either get too much or not enough, and the cost is measured in wasted bandwidth, slower screens, more complex client-side code, and frustrated users.

GraphQL was invented to solve exactly this. Not theoretically, not as an academic exercise, but because the engineers at Facebook in 2012 were building a News Feed that needed data from dozens of resources simultaneously, on mobile devices running on 2G networks, and the REST approach was simply not good enough.

Their answer was to give the client full control over the shape of the data it receives. Instead of the server deciding what you get, you tell the server exactly what you need and it gives you precisely that, in one trip.

This handbook is a complete, engineering-depth guide to understanding GraphQL from first principles and using it confidently inside Flutter applications with the `graphql_flutter` package.

You won't just learn what the APIs look like. You'll understand why the library is designed the way it is, how the pieces fit together architecturally, what the normalized cache does and why it matters, and how to structure a real production app around GraphQL so that it stays maintainable as it grows.

By the end, you'll be able to build real-world Flutter apps backed by GraphQL. You'll also be able to reason clearly about when GraphQL is and is not the right tool and avoid the pitfalls that trip up most developers making this transition for the first time.

::: note Prerequisites

Before diving into GraphQL and `graphql_flutter`, you should be comfortable with a few foundational areas. This guide doesn't assume you're an expert in any of them, but it builds on these skills throughout.

1. **Flutter and Dart fundamentals.** You should be able to build a multi-screen Flutter app with `StatefulWidget` and `StatelessWidget`. Understanding widget trees, `BuildContext`, `setState`, and Dart's async/await model is essential. If you have built a weather app or a to-do list app in Flutter, you have everything you need to follow along.
2. **HTTP and APIs.** You should understand what an API is, what an HTTP request is, and how JSON flows between a client and a server. You don't need to know the internals of HTTP, but knowing that a client sends a request and a server responds with structured data is the baseline assumption this guide builds on.
3. **Basic state management.** Familiarity with at least one state management approach such as Provider, Bloc, or Riverpod will help you understand the architecture discussions in later sections. You can follow the guide without it, but those sections will make more sense if you have seen how Flutter apps separate UI from business logic.
4. **Tools for the project.** Make sure your development environment includes the following before you begin:
    - Flutter SDK 3.x or higher
    - A code editor such as VS Code or Android Studio
    - The flutter and dart CLIs accessible from your terminal
    - An Android emulator, iOS simulator, or physical device for testing
5. **Java 17 for Android builds.** Because graphql_flutter ^5.3.0 requires Java 17 for Android, you need to confirm your JDK version before adding the package. Run `java -version` in your terminal and verify the output shows version 17. If not, install JDK 17 before proceeding. Android builds will fail with confusing errors if this requirement is not met.
6. **Packages this guide uses.** Your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` will include:

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  graphql_flutter: ^5.3.0
  flutter_hooks: ^0.20.0
```

The `flutter_hooks` dependency is needed only if you want to use the hooks-based API (`useQuery`, `useMutation`). This guide covers both the widget-based and hooks-based styles side by side.

---

## What is GraphQL?

Imagine two restaurants. In the first restaurant, you sit down and the waiter brings you a fixed platter. The kitchen decides what goes on it: a burger, fries, a side salad, and a drink. You wanted just the burger with ketchup, but that's not how this restaurant works. You take the whole platter or you leave. If you also want dessert, you have to flag the waiter down for a second trip.

In the second restaurant, the waiter hands you a blank piece of paper. You write exactly what you want: one burger patty on a toasted bun, only ketchup, and a chocolate lava cake alongside it. You hand the note to the kitchen, and they bring you precisely that in one trip. No waste. No second journey.

The first restaurant is a REST API. The second is GraphQL.

That analogy captures the core idea well, but there's more depth to it. The blank piece of paper in the second restaurant isn't unlimited freedom. The kitchen still has a menu of ingredients they know how to prepare. You can only request things that exist in their kitchen.

In GraphQL terms, that menu of available ingredients is called the schema, and it's the formal contract between the server and every client that talks to it.

GraphQL is a query language for APIs and a runtime for executing those queries against your data. It was created by Facebook (now Meta) in 2012 and open-sourced in 2015. Unlike REST, which maps operations to specific URLs and HTTP verbs, GraphQL exposes a single endpoint where every operation is sent as a structured document in the request body.

The critical shift is this: in REST, the server decides what data you get. In GraphQL, the client decides. The server exposes a schema describing everything that's available. The client sends a query describing exactly what subset of that data it needs. The server resolves the query and returns precisely that shape – nothing added, nothing withheld.

Here's a simple GraphQL query:

```graphql
query GetUser($userId: ID!) {
  user(id: $userId) {
    id
    name
    profilePic
  }
}
```

And the response:

```json
{
  "data": {
    "user": {
      "id": "42",
      "name": "Atuoha Anthony",
      "profilePic": "https://cdn.example.com/atuoha.jpg"
    }
  }
}
```

The server didn't include `email`, `createdAt`, `followersCount`, or any other field it stores. It returned exactly and only what the query asked for.

### Why Facebook Built It

GraphQL was created to solve three specific, well-documented pain points at Facebook in 2012. Understanding these problems in concrete terms matters because they're the same problems you've likely already encountered in your own apps.

The first problem was too many network requests. The Facebook News Feed required data from dozens of resources: posts, comments, likes, profiles, media attachments, and advertisements. With REST, each resource lived at a different endpoint, and assembling a single screen required hitting many of them, either sequentially (slow) or in parallel with complex client-side merging logic (also slow and fragile to maintain).

The second problem was data bloat. REST endpoints returned fixed response shapes defined by the server. The mobile client received everything the server thought might be useful, but mobile apps on 2G and 3G networks in 2012 couldn't afford to download kilobytes of fields that would never be displayed. Wasted bytes meant slower load times, higher data bills for users, and faster battery drain on their devices.

The third problem was API evolution velocity. Every time the News Feed team wanted to show a new piece of information, they either had to modify an existing API endpoint (risking breakage for other clients) or create a new one (bloating the API surface and creating versioning debt). The server and client were too tightly coupled, and every product iteration required a backend change to precede it.

GraphQL solved all three problems simultaneously: one request for any combination of data, client-defined field selection to eliminate waste, and schema evolution without endpoint versioning.

When Facebook open-sourced it in 2015, the broader developer community recognized immediately that these were not Facebook-specific problems. They were universal API problems, and GraphQL was a universal solution.

---

## Understanding the Problem: Life Before GraphQL

### How REST Works

REST (Representational State Transfer) is the architectural style that dominated API design for the better part of a decade and remains the most common approach in the industry today.

The core idea is straightforward: every resource lives at a specific URL called an endpoint. You interact with it using HTTP verbs: GET to read, POST to create, PUT or PATCH to update, and DELETE to remove.

For a typical social app, the REST API might look like this:

```plaintext
GET  /users/42            -- fetch user #42
GET  /users/42/posts      -- fetch posts by user #42
GET  /posts/17/comments   -- fetch comments on post #17
POST /posts               -- create a new post
```

Each endpoint has a fixed response shape defined by the server. When you call `GET /users/42`, you always receive the same fields regardless of which screen you are building or what data you actually need in that moment.

![REST Request/Response Lifecycle](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/d4ed65e9-5605-4eb7-8857-fe49cc9a63c2.png)

This works. For many applications and many teams, it works well. But it carries structural limitations that become increasingly painful as the application and its data requirements grow in complexity.

### Over-fetching: Too Much Data

Over-fetching happens when the API returns more data than the client needs for a given screen. Your profile screen needs a user's name and profile picture, but the server sends fifteen fields.

On a desktop with a fast connection, the extra bytes barely register. On a mobile device on a congested network, they add latency, drain the battery faster, and cost users on metered data plans real money.

Multiply this across every API call in a complex app, and the cumulative waste becomes a meaningful performance problem.

### Under-fetching: Not Enough Data

Under-fetching is the opposite. A single endpoint doesn't return enough data for a screen, so the client must make multiple requests to assemble the full picture. The scenario in the diagram above is a classic example: two requests just to render one screen.

This problem becomes dramatically worse with lists. If you need to display ten posts, each with its author's profile picture, and the posts endpoint doesn't include author details, you make one request to get the posts and then ten more requests to fetch each author's data.

This is the N+1 problem: one request to get N items, followed by N additional requests to enrich them. For a list of ten items, that is eleven network calls for a single screen.

### Versioning: When APIs Can't Evolve Cleanly

As your app evolves, different screens need different shapes of the same data. You can't simply change an existing endpoint because other clients depend on its current response shape.

So you create `/v2/users`, then `/v3/users`, and soon you're maintaining multiple versions of the same endpoints, afraid to delete old ones because you cannot be certain which clients still use them.

Your API documentation becomes a graveyard of deprecated routes, and your backend team spends engineering time maintaining things that serve no active user need.

---

## The Single Endpoint Approach

### One Endpoint, Client-Defined Data

GraphQL replaces the many-endpoints model with a single endpoint, typically `/graphql`. Instead of the URL encoding what you want, the **request body** encodes it. Every operation (reading data, changing data, or listening to real-time events) is sent as a structured document to that same endpoint.

Here's the profile screen scenario from above, rewritten as a single GraphQL operation:

```graphql
query GetUserProfile($userId: ID!) {
  user(id: $userId) {
    id
    name
    profilePic
    posts(last: 5) {
      id
      title
      likeCount
    }
  }
}
```

One request. One response. The data arrives in exactly the shape the query described:

```json
{
  "data": {
    "user": {
      "id": "42",
      "name": "Atuoha Anthony",
      "profilePic": "https://cdn.example.com/atuoha.jpg",
      "posts": [
        { "id": "101", "title": "My First Post", "likeCount": 42 },
        { "id": "102", "title": "Flutter Tips", "likeCount": 118 }
      ]
    }
  }
}
```

![REST vs GraphQL: Side by Side](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/f1dd4d6e-6de7-49b4-9551-085899a4f1dd.png)

### Why GraphQL Doesn't Need Versioning

GraphQL's schema-first design eliminates the versioning problem almost entirely. When you add new fields or types to the schema, existing clients that don't request those new fields continue working without modification. When you want to deprecate a field, you mark it with the `@deprecated` directive in the schema.

Developer tooling surfaces that deprecation to client developers, giving them time to migrate away from it. Meanwhile, the field continues serving data until you are confident all clients have moved on. You never need to maintain parallel versions of the same endpoint.

---

## Table of Contents

- [Core GraphQL Concepts: A Deep Dive](#heading-core-graphql-concepts-a-deep-dive)
- [GraphQL Architecture in Flutter](#heading-graphql-architecture-in-flutter)
- [Setting Up GraphQL in Flutter](#heading-setting-up-graphql-in-flutter)
- [Using GraphQL in Flutter: Queries, Mutations, and Subscriptions](#heading-using-graphql-in-flutter-queries-mutations-and-subscriptions)
- [Advanced Concepts](#heading-advanced-concepts)
- [Best Practices in Real Apps](#heading-best-practices-in-real-apps)
- [When to Use GraphQL and When Not To](#heading-when-to-use-graphql-and-when-not-to)
- [Common Mistakes](#heading-common-mistakes)
- [Mini End-to-End Example](#heading-mini-end-to-end-example)

---

## Core GraphQL Concepts: A Deep Dive

### The Schema: The Contract Between Client and Server

The schema is the foundation of every GraphQL API. Written in the Schema Definition Language (SDL), it's a formal declaration of every type of data your server can provide and every operation a client can perform. Both the server and the client read from it.

When you write a query in your Flutter app, your tooling validates it against the schema before a single network request is made. If you request a field that doesn't exist in the schema, the error is caught immediately at the query level, not at runtime in production.

Here is what a schema for a blog application looks like:

```graphql :collapsed-lines
type User {
  id: ID!
  name: String!
  email: String!
  bio: String
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  likeCount: Int!
  comments: [Comment!]!
  publishedAt: String!
}

type Comment {
  id: ID!
  text: String!
  author: User!
}

type Query {
  user(id: ID!): User
  post(id: ID!): Post
  allPosts(page: Int, limit: Int): [Post!]!
}

type Mutation {
  createPost(title: String!, content: String!): Post!
  likePost(postId: ID!): Post!
  deletePost(postId: ID!): Boolean!
}

type Subscription {
  postAdded: Post!
  commentAdded(postId: ID!): Comment!
}
```

The `!` after a type name means the field is non-nullable: it will never return null. `[Post!]!` means a non-null list of non-null `Post` objects. `Query`, `Mutation`, and `Subscription` are the root types: special types that define the entry points into the API.

As a Flutter developer you won't write the schema (that is the backend's job). But you must be able to read it fluently, because it tells you exactly what you can query and what shape the response will carry.

### Types: The Building Blocks

GraphQL has two broad categories of types: scalar types and object types.

**Scalar types** are the leaf values in a query. They have no sub-fields and can't be broken down further.

The five built-in scalars are `String`, `Int`, `Float`, `Boolean`, and `ID`. `ID` is special in that it represents a unique identifier and is serialized as a string. Servers can also define custom scalars like `DateTime`, `URL`, or `JSON` to represent domain-specific value types.

**Object types** have named fields that resolve to either scalars or other object types. They form the graph in GraphQL, where you traverse relationships by nesting your field selections:

```graphql
query {
  post(id: "17") {
    title       # scalar
    author {    # object type -- traversing a relationship
      name      # scalar nested inside the relationship
    }
  }
}
```

**Enum types** constrain a field to a defined set of values, preventing arbitrary strings from being used where only specific values are valid:

```graphql
enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}
```

**Input types** are used specifically as complex arguments in mutations. Because regular object types can't be used as arguments, you define separate input types for structured mutation inputs:

```graphql
input CreatePostInput {
  title: String!
  content: String!
  status: PostStatus!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
}
```

### Queries: Reading Data

A query is the GraphQL operation for reading data. It's the GET of the GraphQL world. You declare the exact fields you want and the server returns exactly those.

```graphql
query GetPostDetails($postId: ID!) {
  post(id: $postId) {
    id
    title
    content
    publishedAt
    author {
      id
      name
    }
    comments {
      id
      text
      author {
        name
      }
    }
    likeCount
  }
}
```

Let's break this down line by line so the structure is clear:

The word `query` declares the operation type, telling the server you're reading data, not writing it.

`GetPostDetails` is the operation name. It's optional but strongly recommended for debugging, logging, and code generation.

`(\(postId: ID!)` is the variable declaration: `\)postId` is a placeholder of type `ID!` whose actual value will be supplied at runtime when the query is executed. `post(id: $postId)` calls the `post` field on the root `Query` type, passing the variable as the argument.

Everything inside curly braces is the selection set, the exact fields you want the server to return. Notice how `author` and `comments` are nested with their own selection sets. You're traversing the graph, following relationships declared in the schema, and the server resolves each relationship and includes it in the single response.

The response mirrors your query's shape exactly:

```json
{
  "data": {
    "post": {
      "id": "17",
      "title": "Getting Started With GraphQL",
      "content": "GraphQL is a query language for APIs...",
      "publishedAt": "2024-01-15T10:30:00Z",
      "author": { "id": "42", "name": "Franklin Oladipo" },
      "comments": [
        {
          "id": "201",
          "text": "Great article!",
          "author": { "name": "Bede Hampo" }
        }
      ],
      "likeCount": 247
    }
  }
}
```

### Mutations: Changing Data

A mutation is the GraphQL operation for modifying data: creating, updating, or deleting records. The syntax is identical to a query, with the single difference that you use the `mutation` keyword instead of `query`.

```graphql
mutation CreateNewPost(\(title: String!, \)content: String!) {
  createPost(title: \(title, content: \)content) {
    id
    title
    publishedAt
    author {
      name
    }
  }
}
```

One of the most powerful aspects of mutations is that they return data. After creating a post, you can immediately ask for any fields from the newly created object within the same operation. Your UI can then update with the server's authoritative data without making a separate query afterward.

Unlike queries, **mutations execute serially by default**. If you send multiple mutations in a single request, they run one after another, not in parallel. This prevents race conditions when one mutation depends on the result of the previous one.

### Subscriptions: Real-Time Data

A subscription is GraphQL's built-in mechanism for real-time updates. Instead of the client polling for new data, the server **pushes** data to the client whenever a relevant event occurs. Subscriptions are implemented over WebSockets and are a first-class part of the GraphQL specification.

```graphql
subscription OnNewComment($postId: ID!) {
  commentAdded(postId: $postId) {
    id
    text
    author {
      name
      profilePic
    }
  }
}
```

When a client subscribes to `commentAdded` for a specific post, the server keeps the WebSocket connection open. Every time a new comment is added to that post, the server pushes the comment data to all connected subscribers instantly.

This is the right tool for chat applications, live notification feeds, real-time collaboration features, or any scenario where users expect the UI to react to server-side events without manually refreshing.

### Variables: Making Queries Safe and Reusable

Variables are how you pass dynamic values into a GraphQL operation without embedding them directly in the query string. This separation is not just a convention but a strict requirement enforced by every GraphQL library for safety and efficiency reasons.

Without variables, dynamic values would have to be interpolated into the query string, which opens the door to injection attacks and prevents query-level caching. With variables, the query string is a fixed, immutable template. Only the variables change per request:

```graphql
# The query is always this exact string. It never changes.
query GetUser($userId: ID!) {
  user(id: $userId) {
    name
  }
}
```

```json
// The variables object changes per request.
{ "userId": "42" }
```

The server receives both and processes them separately. It never interpolates your variable values into the query string. This is the safe, correct pattern for dynamic data, and the `graphql_flutter` library enforces it throughout its API.

### Fragments: Reusable Field Sets

As queries grow in complexity, you'll find yourself selecting the same set of fields from the same type across multiple queries. Fragments solve this with named, reusable chunks of a selection set:

```graphql
# Define the fragment once on a specific type
fragment UserBasicInfo on User {
  id
  name
  profilePic
}

# Use it in as many queries as needed
query GetPost($postId: ID!) {
  post(id: $postId) {
    title
    author {
      ...UserBasicInfo   # spread the fragment here
    }
    comments {
      text
      author {
        ...UserBasicInfo  # and here
      }
    }
  }
}
```

The `...UserBasicInfo` spread tells the server to replace that spread with the full set of fields defined in the fragment. Fragments are especially valuable in component-driven UIs like Flutter, where each widget can define a fragment for the exact data it needs, and screen-level queries can be assembled by composing fragments from their child widgets.

### Resolvers: How the Server Fulfills Queries

You won't write resolvers as a Flutter developer, but understanding them conceptually makes you a more effective consumer of GraphQL APIs and helps you reason about performance implications.

A resolver is a function on the server that knows how to fetch the data for one specific field. Every field in the schema has a resolver. When a query arrives, the GraphQL runtime walks through the selection set and calls the appropriate resolver for each requested field, assembling the results into the shape the client declared.

```graphql
Query: { user(id: "42") { name posts { title } } }

Server execution:
  1. Call resolver for Query.user("42")  -> { id: "42", name: "Tony" }
  2. Call resolver for User.posts("42") -> [{ title: "Post 1" }]
  3. Assemble result                    -> { user: { name: "Tony", posts: [...] } }
```

Each resolver independently fetches its piece of data, which might come from a relational database, a microservice, a third-party API, or an in-memory cache. The GraphQL runtime stitches all the pieces together. The client never knows or cares about the implementation details. It declares what it wants and receives the assembled result.

---

## GraphQL Architecture in Flutter

### How the Pieces Connect

When you use GraphQL in a Flutter app, four distinct layers work together. Understanding their roles and the boundaries between them is essential before writing a single line of application code.

1. **The Flutter UI layer** contains your widgets. They declare what data they need using `Query`, `Mutation`, and `Subscription` widgets (or hooks). They know nothing about HTTP, WebSockets, or caching. They describe their data requirements and react to results.
2. **The GraphQL Client** is the engine at the center of everything. The `graphql_flutter` package manages the connection to your server, the normalized cache, request queuing, deduplication, and reactive result broadcasting to widgets.
3. **The Link Chain** is a composable middleware pipeline that every request passes through before reaching the server. Links can add authentication headers, log requests, handle errors, retry failed requests, and route traffic between HTTP and WebSocket connections based on operation type.
4. **The GraphQL Server** receives the operation, validates it against the schema, executes the resolvers, and returns the JSON response.

![Flutter GraphQL Architecture: Request/Response Lifecycle](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/e565bad8-985f-48e1-b3c9-aa1974ea4709.png)

### The Normalized Cache: GraphQL's Secret Weapon

The GraphQL client's cache is one of its most powerful features and one of the most commonly misunderstood.

Unlike a simple HTTP cache that stores raw response blobs, the GraphQL cache is a **normalized object store**. Every object is stored once, identified by its type and ID. The cache key for a post with id "17" of type `Post` is `Post:17`. If that same post appears in ten different query results across ten different screens, it's stored only once.

The consequence of this is significant. When a mutation updates that post, the cache updates its single stored copy. Every widget in your app that previously fetched that post immediately receives the updated data and rebuilds. A like count updated on a post detail screen is reflected on the feed screen, the user profile screen, and anywhere else that post was displayed, all without re-fetching, all automatically, triggered by a single cache write.

This shared, reactive normalized store is what makes well-built GraphQL apps feel so fluid. It's also what enables optimistic UI updates to work across the entire widget tree simultaneously.

---

## Setting Up GraphQL in Flutter

### Adding the Dependency

Open your <VPIcon icon="iconfont icon-yaml"/>`pubspec.yaml` and add the package:

```yaml title="pubspec.yaml"
dependencies:
  flutter:
    sdk: flutter
  graphql_flutter: ^5.3.0
```

Then run:

```sh
flutter pub get
```

### Android Build Configuration

This step is non-negotiable for Android targets and is easy to miss. Open <VPIcon icon="fas fa-folder-open"/>`android/app/`<VPIcon icon="iconfont icon-gradle"/>`build.gradle` and ensure the Java compatibility settings are present:

```groovy title="android/app/build.gradle"
android {
    compileSdkVersion 34

    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}
```

Also update <VPIcon icon="fas fa-folder-open"/>`android/gradle/wrapper/`<VPIcon icon="fas fa-gears"/>`gradle-wrapper.properties` to use Gradle 8.4:

```properties title="android/gradle/wrapper/gradle-wrapper.properties"
distributionUrl=https\://services.gradle.org/distributions/gradle-8.4-bin.zip
```

Skipping this step results in cryptic Java compatibility errors at build time that are difficult to diagnose if you don't know to look here.

### Initializing Hive for Persistent Caching

`graphql_flutter` uses Hive (via `hive_ce`) for on-disk persistent caching. This means the cache survives app restarts: a user who opens your app without an internet connection will still see previously loaded data rather than an empty screen.

To enable this, you must call `initHiveForFlutter()` before `runApp()`, and it must be awaited:

```dart
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

void main() async {
  // Required before calling any Flutter plugin code before runApp().
  // initHiveForFlutter() uses platform channels internally to locate
  // the correct storage directory on each platform.
  WidgetsFlutterBinding.ensureInitialized();

  // Sets up the Hive storage directory and registers necessary adapters.
  // After this call, HiveStore is ready to be used inside GraphQLCache.
  await initHiveForFlutter();

  runApp(const MyApp());
}
```

If you prefer not to persist the cache across sessions, you can skip this initialization and use `InMemoryStore` instead of `HiveStore` when creating the cache. For production apps, `HiveStore` is almost always the right choice.

### Creating the GraphQL Client

The `GraphQLClient` is the central object in the entire system. It's created once and provided to the widget tree through `GraphQLProvider`.

Here is a full setup with a line-by-line explanation of every decision:

```dart :collapsed-lines
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // HttpLink is the terminating link: the final link in the chain
    // that actually sends the HTTP POST request to your server.
    // It takes your GraphQL endpoint URL as its only required argument.
    final HttpLink httpLink = HttpLink(
      'https://api.yourapp.com/graphql',
    );

    // AuthLink is a non-terminating link that runs before HttpLink.
    // Its sole job is to attach an Authorization header to every request.
    // getToken is async, so you can read from secure storage, a token
    // refresh service, or any other async source.
    final AuthLink authLink = AuthLink(
      getToken: () async {
        // In production, read this from FlutterSecureStorage or
        // your auth state management layer, never from plain storage.
        final token = await _getTokenFromStorage();
        return 'Bearer $token';
      },
    );

    // concat() assembles the link chain. Requests flow left to right:
    // AuthLink runs first (attaching the header), then HttpLink runs
    // (sending the actual HTTP request). You can insert as many
    // non-terminating links as needed between them.
    final Link link = authLink.concat(httpLink);

    // ValueNotifier<GraphQLClient> is required by GraphQLProvider.
    // Wrapping the client in a ValueNotifier allows you to replace
    // the entire client at runtime (for example, on user logout to
    // clear the cache) and GraphQLProvider will rebuild all its
    // descendants automatically with the new client.
    final ValueNotifier<GraphQLClient> client = ValueNotifier(
      GraphQLClient(
        link: link,
        // HiveStore provides persistent on-disk caching.
        // Swap HiveStore() for InMemoryStore() if you want the
        // cache to be cleared on every app restart.
        cache: GraphQLCache(store: HiveStore()),
      ),
    );

    // GraphQLProvider injects the client into the widget tree via
    // InheritedWidget. Any descendant can access the client through
    // GraphQLProvider.of(context). Wrapping MaterialApp means the
    // client is available on every screen in your app.
    return GraphQLProvider(
      client: client,
      child: MaterialApp(
        title: 'My GraphQL App',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
          useMaterial3: true,
        ),
        home: const HomePage(),
      ),
    );
  }

  Future<String> _getTokenFromStorage() async {
    // Replace with your actual secure storage implementation.
    return 'your-auth-token';
  }
}
```

### Adding WebSocket Support for Subscriptions

If your app uses real-time subscriptions, you need a `WebSocketLink` alongside the `HttpLink`. The two are joined using `Link.split`, which routes each request to the correct transport based on its operation type:

```dart
final HttpLink httpLink = HttpLink('https://api.yourapp.com/graphql');

final WebSocketLink webSocketLink = WebSocketLink(
  // Use wss:// for secure WebSockets in production.
  // Use ws:// only for local development.
  'wss://api.yourapp.com/graphql',
  config: const SocketClientConfig(
    autoReconnect: true,
    delayBetweenConnectAttempts: Duration(seconds: 5),
  ),
);

// Link.split evaluates its predicate for each incoming request.
// If the predicate returns true, the first (left) link handles it.
// If false, the second (right) link handles it.
// request.isSubscription is true for subscription operations.
final Link link = authLink.concat(
  Link.split(
    (request) => request.isSubscription,
    webSocketLink,  // subscriptions go here
    httpLink,       // queries and mutations go here
  ),
);
```

The `authLink` sits before the split so it runs for all operation types. Both HTTP and WebSocket transports typically require authentication.

---

## Using GraphQL in Flutter: Queries, Mutations, and Subscriptions

### Queries: Fetching and Displaying Data

The `Query` widget executes a GraphQL query and rebuilds whenever the result state changes. It's the primary mechanism for loading data on a screen.

```dart :collapsed-lines
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

// Always define query strings as top-level constants, never inside build().
// The `r` prefix creates a raw string so dollar signs and backslashes
// are not treated as Dart escape sequences or string interpolations.
// gql() parses this string into a DocumentNode AST that the client executes.
const String fetchPostsQuery = r'''
  query FetchPosts(\(limit: Int!, \)page: Int!) {
    allPosts(limit: \(limit, page: \)page) {
      id
      title
      publishedAt
      likeCount
      author {
        name
        profilePic
      }
    }
  }
''';

class PostListScreen extends StatelessWidget {
  const PostListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Posts')),
      body: Query(
        options: QueryOptions(
          document: gql(fetchPostsQuery),

          // Variables are passed as a plain Dart Map<String, dynamic>.
          // The library serializes them to JSON and sends them alongside
          // the query string as a separate field in the request body.
          variables: const {'limit': 10, 'page': 1},

          // cacheAndNetwork: return cached data immediately if available,
          // then fire a background network request and rebuild with fresh
          // data when it arrives. Users get instant perceived load time
          // from the cache while staying current with the server.
          fetchPolicy: FetchPolicy.cacheAndNetwork,
        ),

        // The builder function is called on every state change:
        // when loading begins, when data arrives, when an error occurs,
        // and when cached data is updated by another operation.
        //
        // result  -- current state: loading status, data, exceptions
        // refetch -- callback to manually re-execute the query
        // fetchMore -- callback for pagination (covered later)
        builder: (QueryResult result, {VoidCallback? refetch, FetchMore? fetchMore}) {

          // Always check for exceptions first.
          // OperationException wraps both network-level and GraphQL-level errors.
          if (result.hasException) {
            return Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.error_outline, size: 48, color: Colors.red),
                  const SizedBox(height: 12),
                  Text(
                    result.exception?.graphqlErrors.firstOrNull?.message
                        ?? result.exception?.linkException.toString()
                        ?? 'An error occurred',
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: refetch,
                    child: const Text('Try Again'),
                  ),
                ],
              ),
            );
          }

          // isLoading is true only on the initial load when no cached data
          // exists. With cacheAndNetwork, if cache data is available,
          // isLoading is false even while a background request is running.
          if (result.isLoading && result.data == null) {
            return const Center(child: CircularProgressIndicator());
          }

          // result.data is a Map<String, dynamic> that mirrors
          // the shape you declared in your query's selection set.
          final List<dynamic>? posts =
              result.data?['allPosts'] as List<dynamic>?;

          if (posts == null || posts.isEmpty) {
            return const Center(child: Text('No posts found.'));
          }

          return RefreshIndicator(
            onRefresh: () async => refetch?.call(),
            child: ListView.builder(
              itemCount: posts.length,
              itemBuilder: (context, index) {
                final post = posts[index] as Map<String, dynamic>;
                return PostCard(post: post);
              },
            ),
          );
        },
      ),
    );
  }
}

class PostCard extends StatelessWidget {
  final Map<String, dynamic> post;

  const PostCard({super.key, required this.post});

  @override
  Widget build(BuildContext context) {
    final author = post['author'] as Map<String, dynamic>?;

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: ListTile(
        leading: author?['profilePic'] != null
            ? CircleAvatar(
                backgroundImage:
                    NetworkImage(author!['profilePic'] as String),
              )
            : const CircleAvatar(child: Icon(Icons.person)),
        title: Text(post['title'] as String? ?? ''),
        subtitle: Text('By ${author?['name'] ?? 'Unknown'}'),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.favorite, color: Colors.red, size: 16),
            const SizedBox(width: 4),
            Text('${post['likeCount'] ?? 0}'),
          ],
        ),
      ),
    );
  }
}
```

The `cacheAndNetwork` fetch policy is worth emphasizing. When a user navigates to this screen for the second time, the cached data renders with zero network wait. Simultaneously, a network request runs in the background. When it completes, the widget rebuilds with the fresh data.

The builder is called twice: once with the cached data and once with the updated network data. For most feed-style screens, this produces the best user experience: instant perceived performance combined with freshness.

### Using Hooks for Queries

If your team prefers a more functional style, `graphql_flutter` provides the `useQuery` hook that works with `flutter_hooks`. The behavior is identical to the `Query` widget, but the API avoids deeply nested builder functions:

```dart :collapsed-lines
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

// HookWidget replaces StatelessWidget when using hooks.
class PostListScreen extends HookWidget {
  const PostListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // useQuery returns a QueryHookResult containing the result and helpers.
    final queryResult = useQuery(
      QueryOptions(
        document: gql(fetchPostsQuery),
        variables: const {'limit': 10, 'page': 1},
        fetchPolicy: FetchPolicy.cacheAndNetwork,
      ),
    );

    final result = queryResult.result;
    final refetch = queryResult.refetch;

    if (result.hasException) {
      return Scaffold(
        body: Center(child: Text(result.exception.toString())),
      );
    }

    if (result.isLoading && result.data == null) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    final posts = result.data?['allPosts'] as List<dynamic>? ?? [];

    return Scaffold(
      appBar: AppBar(title: const Text('Posts')),
      body: RefreshIndicator(
        onRefresh: () async => refetch(),
        child: ListView.builder(
          itemCount: posts.length,
          itemBuilder: (context, index) {
            final post = posts[index] as Map<String, dynamic>;
            return PostCard(post: post);
          },
        ),
      ),
    );
  }
}
```

Both styles are fully supported and functionally equivalent. The widget-based API is more approachable for developers coming from non-React backgrounds. The hooks API produces cleaner code when a widget composes multiple operations, because it avoids the callback nesting that builders introduce.

### Mutations: Triggering Data Changes

The `Mutation` widget gives you a `RunMutation` function in its builder. Unlike `Query`, which executes automatically on render, `Mutation` waits for you to call `runMutation`. Mutations are triggered by user actions, not automatically on widget construction.

```dart :collapsed-lines
const String likePostMutation = r'''
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likeCount
      viewerHasLiked
    }
  }
''';

class LikeButton extends StatelessWidget {
  final String postId;
  final bool initiallyLiked;
  final int likeCount;

  const LikeButton({
    super.key,
    required this.postId,
    required this.initiallyLiked,
    required this.likeCount,
  });

  @override
  Widget build(BuildContext context) {
    return Mutation(
      options: MutationOptions(
        document: gql(likePostMutation),

        // update runs after the mutation completes.
        // Because our mutation returns the updated post with its id,
        // likeCount, and viewerHasLiked, the cache can normalize the result.
        // It updates the cached Post:postId object automatically, and any
        // Query widget that previously fetched this post rebuilds with the
        // new like count. Manual cache writes are only needed when you are
        // adding or removing items from cached lists.
        update: (GraphQLDataProxy cache, QueryResult? result) {
          // Automatic normalization handles this case cleanly.
        },

        // onCompleted runs after a successful mutation.
        // Use it for side effects: snackbars, navigation, analytics events.
        onCompleted: (dynamic resultData) {
          if (resultData != null) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text('Post liked!')),
            );
          }
        },

        // onError handles mutation failures.
        onError: (OperationException? error) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(
                error?.graphqlErrors.firstOrNull?.message
                    ?? 'Failed to like post',
              ),
            ),
          );
        },
      ),

      // runMutation: call this to fire the mutation.
      // result: the state of the last mutation run, null before the first call.
      builder: (RunMutation runMutation, QueryResult? result) {
        final isLoading = result?.isLoading ?? false;
        final hasLiked = result?.data?['likePost']?['viewerHasLiked'] as bool?
            ?? initiallyLiked;
        final currentCount =
            result?.data?['likePost']?['likeCount'] as int? ?? likeCount;

        return GestureDetector(
          onTap: isLoading
              ? null
              : () => runMutation({'postId': postId}),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              isLoading
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : Icon(
                      hasLiked ? Icons.favorite : Icons.favorite_border,
                      color: hasLiked ? Colors.red : Colors.grey,
                    ),
              const SizedBox(width: 4),
              Text('$currentCount'),
            ],
          ),
        );
      },
    );
  }
}
```

The relationship between `update`, `onCompleted`, and `onError` is a frequent source of confusion. Think of them this way: `update` is for cache operations and runs even for optimistic results, `onCompleted` is for side effects after success, and `onError` is for side effects after failure.

Never put navigation logic inside `update` because it runs before the widget rebuild cycle is complete, which leads to navigation errors.

### Subscriptions: Receiving Real-Time Events

The `Subscription` widget opens a WebSocket connection and calls its builder function every time the server pushes a new event. Each call to the builder receives the latest single event, not an accumulated history of all past events. Accumulating and managing state over time is your responsibility as the developer.

```dart :collapsed-lines
const String commentAddedSubscription = r'''
  subscription CommentAdded($postId: ID!) {
    commentAdded(postId: $postId) {
      id
      text
      author {
        id
        name
        profilePic
      }
    }
  }
''';

class CommentsSection extends StatefulWidget {
  final String postId;
  const CommentsSection({super.key, required this.postId});

  @override
  State<CommentsSection> createState() => _CommentsSectionState();
}

class _CommentsSectionState extends State<CommentsSection> {
  final List<Map<String, dynamic>> _comments = [];

  @override
  Widget build(BuildContext context) {
    return Subscription(
      options: SubscriptionOptions(
        document: gql(commentAddedSubscription),
        variables: {'postId': widget.postId},
      ),
      builder: (QueryResult result) {
        if (result.isLoading) {
          // For subscriptions, isLoading means the WebSocket connection
          // is being established, not that server data is loading.
          return const Center(child: CircularProgressIndicator());
        }

        if (result.hasException) {
          return Text('Subscription error: ${result.exception}');
        }

        if (result.data != null) {
          final newComment =
              result.data!['commentAdded'] as Map<String, dynamic>?;
          if (newComment != null) {
            // addPostFrameCallback prevents calling setState during
            // the current build phase, which would throw a Flutter error.
            WidgetsBinding.instance.addPostFrameCallback((_) {
              if (mounted) {
                setState(() {
                  final exists =
                      _comments.any((c) => c['id'] == newComment['id']);
                  if (!exists) _comments.insert(0, newComment);
                });
              }
            });
          }
        }

        if (_comments.isEmpty) {
          return const Center(child: Text('No comments yet. Be the first!'));
        }

        return ListView.builder(
          itemCount: _comments.length,
          itemBuilder: (context, index) {
            final comment = _comments[index];
            final author = comment['author'] as Map<String, dynamic>?;
            return ListTile(
              leading: CircleAvatar(
                backgroundImage: author?['profilePic'] != null
                    ? NetworkImage(author!['profilePic'] as String)
                    : null,
                child: author?['profilePic'] == null
                    ? const Icon(Icons.person)
                    : null,
              ),
              title: Text(author?['name'] as String? ?? 'Anonymous'),
              subtitle: Text(comment['text'] as String? ?? ''),
            );
          },
        );
      },
    );
  }
}
```

In production code, you wouldn't manage subscription state in a `StatefulWidget`. Instead, you would stream subscription events into a Bloc or provider that accumulates them, and the widget would simply render the state emitted by that Bloc.

---

## Advanced Concepts

### Caching Strategies: Choosing the Right Policy

Picking the correct fetch policy for each query is one of the most impactful decisions you make in a GraphQL Flutter app. The wrong policy makes your app feel slow or shows stale data at the wrong moment. The right policy makes it feel native.

`FetchPolicy.cacheFirst` checks the cache before touching the network. If the data is already cached, it returns immediately without making a network request. A network call only happens if the cache has nothing.

Use this for data that almost never changes during a session, like a list of countries, a user's account settings, or configuration values loaded at startup.

`FetchPolicy.cacheAndNetwork` returns cached data immediately while firing a background network request simultaneously. When the network response arrives, the cache updates and the widget rebuilds with fresh data.

This is the right default for most content screens: fast perceived load from the cache, with freshness guaranteed by the background fetch.

`FetchPolicy.networkOnly` always goes to the network and ignores the cache completely for reading. The response is still written to the cache for future use.

Use this when data freshness is non-negotiable, such as a bank balance, live inventory count, or the result of a payment operation.

`FetchPolicy.cacheOnly` reads exclusively from the cache and never makes a network request. If the data isn't cached, it returns null.

This is primarily useful in offline-first apps where you have pre-populated the cache and want to guarantee no network calls.

`FetchPolicy.noCache` always goes to the network and does not read from or write to the cache. Use this for one-time operations where caching would be actively harmful.

```dart
// Account settings -- loaded once, changes rarely during a session
QueryOptions(
  document: gql(getUserSettingsQuery),
  fetchPolicy: FetchPolicy.cacheFirst,
)

// News feed -- instant load from cache, background refresh for freshness
QueryOptions(
  document: gql(getNewsFeedQuery),
  fetchPolicy: FetchPolicy.cacheAndNetwork,
)

// Payment history -- must always reflect the server's current state
QueryOptions(
  document: gql(getPaymentHistoryQuery),
  fetchPolicy: FetchPolicy.networkOnly,
)
```

### Pagination with fetchMore

Most real apps deal with lists too large to load at once. The `fetchMore` function exposed in the `Query` builder handles pagination by executing a new query and merging its results with the existing ones.

```dart :collapsed-lines
const String fetchPostsWithPaginationQuery = r'''
  query FetchPosts(\(cursor: String, \)limit: Int!) {
    postsConnection(after: \(cursor, first: \)limit) {
      edges {
        node {
          id
          title
          likeCount
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
''';

class PaginatedPostList extends StatelessWidget {
  const PaginatedPostList({super.key});

  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document: gql(fetchPostsWithPaginationQuery),
        variables: const {'limit': 10, 'cursor': null},
        fetchPolicy: FetchPolicy.cacheAndNetwork,
      ),
      builder: (QueryResult result, {VoidCallback? refetch, FetchMore? fetchMore}) {
        if (result.isLoading && result.data == null) {
          return const Center(child: CircularProgressIndicator());
        }

        final connection =
            result.data?['postsConnection'] as Map<String, dynamic>?;
        final edges = connection?['edges'] as List<dynamic>? ?? [];
        final pageInfo =
            connection?['pageInfo'] as Map<String, dynamic>?;
        final hasNextPage = pageInfo?['hasNextPage'] as bool? ?? false;
        final endCursor = pageInfo?['endCursor'] as String?;

        return ListView.builder(
          itemCount: edges.length + (hasNextPage ? 1 : 0),
          itemBuilder: (context, index) {
            if (index == edges.length) {
              return Padding(
                padding: const EdgeInsets.all(16),
                child: ElevatedButton(
                  onPressed: () {
                    final FetchMoreOptions opts = FetchMoreOptions(
                      variables: {'cursor': endCursor, 'limit': 10},

                      // updateQuery merges the new page with all previous data.
                      // You must return the merged dataset from this function.
                      // previousResultData: everything fetched so far.
                      // fetchMoreResultData: the data from this new page only.
                      updateQuery: (previousResultData, fetchMoreResultData) {
                        final List<dynamic> allEdges = [
                          ...previousResultData['postsConnection']['edges']
                              as List<dynamic>,
                          ...fetchMoreResultData['postsConnection']['edges']
                              as List<dynamic>,
                        ];
                        // Assign the merged list into fetchMoreResultData
                        // and return it. The library uses the returned
                        // value as the new authoritative result for the query.
                        fetchMoreResultData['postsConnection']['edges'] = allEdges;
                        return fetchMoreResultData;
                      },
                    );

                    fetchMore!(opts);
                  },
                  child: const Text('Load More'),
                ),
              );
            }

            final node = edges[index]['node'] as Map<String, dynamic>;
            return PostCard(post: node);
          },
        );
      },
    );
  }
}
```

The most common mistake with `fetchMore` is mutating `previousResultData` directly instead of building a new list. Always treat both arguments as read-only, construct the merged list as a new object, assign it into `fetchMoreResultData`, and return `fetchMoreResultData`.

### Optimistic UI Updates

[**Optimistic UI**](/freecodecamp.org/how-to-use-the-optimistic-ui-pattern-with-the-useoptimistic-hook-in-react.md) is a pattern where the interface updates immediately after a user action, before the server has confirmed the change. If the server confirms, the optimistic data is silently replaced with the authoritative server data. If the server rejects the change, the cache rolls back to its pre-mutation state automatically.

The result is an app that feels dramatically faster. The user taps a like button, the heart turns red, and the count increments instantly. No spinner, no wait. If the network request fails, the UI reverts cleanly without any manual rollback code.

```dart :collapsed-lines
Mutation(
  options: MutationOptions(
    document: gql(likePostMutation),
    update: (GraphQLDataProxy cache, QueryResult? result) {
      // When the real server response arrives, the cache normalizes
      // it automatically, replacing the optimistic values with the
      // server's authoritative data.
    },
  ),
  builder: (RunMutation runMutation, QueryResult? result) {
    return IconButton(
      onPressed: () {
        runMutation(
          {'postId': postId},
          // optimisticResult must exactly match the shape of your
          // mutation's return type, including __typename.
          // The cache uses __typename + id as the normalization key.
          optimisticResult: {
            'likePost': {
              '__typename': 'Post',
              'id': postId,
              'likeCount': currentLikeCount + 1,
              'viewerHasLiked': true,
            }
          },
        );
      },
      icon: const Icon(Icons.favorite_border),
    );
  },
);
```

When `runMutation` is called with an `optimisticResult`, the cache immediately applies those values and broadcasts updates to every widget that holds data for that cached object. When the real network response arrives moments later, the cache updates once more with the server's values, triggering a final rebuild.

### Error Handling: A Production-Grade Approach

GraphQL errors come in two distinct categories, and handling both correctly is essential for a reliable production app.

**Network errors** occur at the transport layer: no internet connection, DNS failure, server unreachable, or connection timeout. These surface as a `LinkException` inside `result.exception`.

**GraphQL errors** occur inside the GraphQL execution layer: authentication failures, authorization violations, schema validation errors, or custom business logic errors defined by your server team. These surface as a list of `GraphQLError` objects.

Importantly, GraphQL allows partial results where a response contains both `data` and `errors` simultaneously, if some fields resolved successfully and some failed.

```dart :collapsed-lines
Widget _buildFromResult(
    BuildContext context, QueryResult result, VoidCallback? refetch) {
  if (result.hasException) {
    final exception = result.exception!;

    // Check for network-level errors first
    if (exception.linkException != null) {
      if (exception.linkException is NetworkException) {
        return _NoInternetWidget(onRetry: refetch);
      }
      return _ServerErrorWidget(onRetry: refetch);
    }

    // Check for GraphQL-level errors
    if (exception.graphqlErrors.isNotEmpty) {
      final firstError = exception.graphqlErrors.first;
      // Many servers include a machine-readable code in the extensions map
      final errorCode = firstError.extensions?['code'] as String?;

      switch (errorCode) {
        case 'UNAUTHENTICATED':
          WidgetsBinding.instance.addPostFrameCallback((_) {
            Navigator.of(context).pushReplacementNamed('/login');
          });
          return const SizedBox.shrink();

        case 'FORBIDDEN':
          return const _AccessDeniedWidget();

        case 'NOT_FOUND':
          return const _NotFoundWidget();

        default:
          return _GenericErrorWidget(
            message: firstError.message,
            onRetry: refetch,
          );
      }
    }
  }

  // success state handled here...
  return const SizedBox.shrink();
}
```

### Authentication: Transparent Token Refresh

In production apps, access tokens expire. Rather than letting expired tokens cause request failures that users must recover from manually, you can build a custom link that intercepts authentication errors and refreshes the token transparently before retrying the original request.

```dart
class AuthRefreshLink extends Link {
  final Future<String?> Function() refreshToken;
  final Future<void> Function() onAuthFailure;

  AuthRefreshLink({required this.refreshToken, required this.onAuthFailure});

  @override
  Stream<Response> request(Request request, [NextLink? forward]) async* {
    await for (final result in forward!(request)) {
      final isAuthError = (result.errors ?? [])
          .any((e) => e.extensions?['code'] == 'UNAUTHENTICATED');

      if (isAuthError) {
        final newToken = await refreshToken();

        if (newToken == null) {
          await onAuthFailure(); // Trigger logout
          return;
        }

        // Retry the original request with the new token
        final retryRequest = request.updateContextEntry<HttpLinkHeaders>(
          (headers) => HttpLinkHeaders(
            headers: {
              ...headers?.headers ?? {},
              'Authorization': 'Bearer $newToken',
            },
          ),
        );

        yield* forward(retryRequest);
      } else {
        yield result;
      }
    }
  }
}
```

This link sits in the chain before `HttpLink`. When an `UNAUTHENTICATED` error arrives, it refreshes the token, replays the original request, and the widget receives the successful data as if nothing unusual occurred. If the token refresh itself fails, `onAuthFailure` is called, which triggers a logout flow.

---

## Best Practices in Real Apps

### Project Structure That Scales

Scattering query strings across widget files is one of the fastest ways to create an unmaintainable codebase. Here's a folder structure that keeps GraphQL operations organized and consistently discoverable:

```sh title="file structure"
lib/
  graphql/
    client.dart              # GraphQLClient setup, exported globally
    queries/
      post_queries.dart      # All post-related queries
      user_queries.dart      # All user-related queries
    mutations/
      post_mutations.dart
      auth_mutations.dart
    subscriptions/
      comment_subs.dart
    fragments/
      post_fragments.dart    # Reusable post field sets
      user_fragments.dart    # Reusable user field sets

  models/
    post.dart                # Typed Dart models parsed from GraphQL data
    user.dart

  repositories/
    post_repository.dart     # Data access abstraction layer

  blocs/
    post_bloc.dart           # Business logic and state

  screens/
    post_list/
      post_list_screen.dart
      widgets/
        post_card.dart
        like_button.dart
```

### Composing Queries from Fragments

Define fragments in dedicated files and compose queries by string interpolation. This ensures that field sets stay consistent across queries and schema changes propagate from a single definition:

```dart title="lib/graphql/fragments/post_fragments.dart"
const String postBasicFieldsFragment = r'''
  fragment PostBasicFields on Post {
    id
    title
    publishedAt
    likeCount
  }
''';

const String postAuthorFragment = r'''
  fragment PostAuthorFields on Post {
    author {
      id
      name
      profilePic
    }
  }
''';
```

```dart title="lib/graphql/queries/post_queries.dart"
import 'package:your_app/graphql/fragments/post_fragments.dart';

const String fetchPostsQuery = '''
  $postBasicFieldsFragment
  $postAuthorFragment

  query FetchPosts(\\(limit: Int!, \\)page: Int!) {
    allPosts(limit: \\(limit, page: \\)page) {
      ...PostBasicFields
      ...PostAuthorFields
    }
  }
''';
```

### Parsing GraphQL Data into Typed Models

Working directly with `Map<String, dynamic>` throughout your business logic is fragile and error-prone. A typo in a string key causes a silent null at runtime, not a compile-time error. Define typed model classes and parse the GraphQL response at the data layer boundary:

```dart title="lib/models/post.dart"
class Post {
  final String id;
  final String title;
  final String content;
  final int likeCount;
  final DateTime publishedAt;
  final User author;

  const Post({
    required this.id,
    required this.title,
    required this.content,
    required this.likeCount,
    required this.publishedAt,
    required this.author,
  });

  factory Post.fromMap(Map<String, dynamic> map) {
    return Post(
      id: map['id'] as String,
      title: map['title'] as String,
      content: map['content'] as String,
      likeCount: map['likeCount'] as int? ?? 0,
      publishedAt: DateTime.parse(map['publishedAt'] as String),
      author: User.fromMap(map['author'] as Map<String, dynamic>),
    );
  }
}
```

### Integrating with Bloc and a Repository Layer

For production apps, placing `Query` and `Mutation` widgets directly in your screens couples your UI tightly to GraphQL. Introducing a repository layer that wraps GraphQL operations, with Bloc mediating between the repository and the UI, gives you proper separation of concerns:

```dart :collapsed-lines title="lib/repositories/post_repository.dart"
class PostRepository {
  final GraphQLClient _client;

  PostRepository(this._client);

  Future<List<Post>> fetchPosts({int page = 1, int limit = 10}) async {
    final result = await _client.query(
      QueryOptions(
        document: gql(fetchPostsQuery),
        variables: {'page': page, 'limit': limit},
        fetchPolicy: FetchPolicy.cacheAndNetwork,
      ),
    );

    if (result.hasException) throw _mapException(result.exception!);

    return (result.data!['allPosts'] as List<dynamic>)
        .cast<Map<String, dynamic>>()
        .map(Post.fromMap)
        .toList();
  }

  Future<Post> likePost(String postId) async {
    final result = await _client.mutate(
      MutationOptions(
        document: gql(likePostMutation),
        variables: {'postId': postId},
      ),
    );

    if (result.hasException) throw _mapException(result.exception!);

    return Post.fromMap(
      result.data!['likePost'] as Map<String, dynamic>,
    );
  }

  Stream<Post> watchNewPosts() {
    return _client
        .subscribe(
            SubscriptionOptions(document: gql(postAddedSubscription)))
        .where((result) => !result.hasException && result.data != null)
        .map((result) => Post.fromMap(
              result.data!['postAdded'] as Map<String, dynamic>,
            ));
  }

  Exception _mapException(OperationException e) {
    if (e.linkException != null) {
      return NetworkException('No internet connection');
    }
    return ApiException(
      e.graphqlErrors.firstOrNull?.message ?? 'Unknown error',
    );
  }
}
```

With this architecture, your Bloc knows nothing about GraphQL. Your screens know nothing about GraphQL. GraphQL is an implementation detail of the repository. Your UI and business logic can be unit tested without mocking GraphQL at all, which is the mark of a well-structured data layer.

---

## When to Use GraphQL and When Not To

### Where GraphQL Excels

GraphQL is the right choice when your application is genuinely complex and data-intensive. If your screens need data from multiple related entities simultaneously, and different screens need different subsets of the same underlying data, client-driven fetching pays for itself almost immediately.

Mobile apps are a particularly strong fit because bandwidth and battery are constrained resources, and the precision of GraphQL queries has a direct, measurable impact on both.

It also makes excellent sense when you serve multiple client types: a web app, a mobile app, a tablet layout, and perhaps a smartwatch companion, all consuming the same API. With REST, you either build bespoke endpoints for each client or force every client to over-fetch from a generic endpoint. With GraphQL, each client queries precisely what it needs from a single unified schema.

Real-time features are a natural fit as well. Subscriptions are a first-class part of the GraphQL protocol, not an afterthought. Combined with the normalized cache, new data arriving over a subscription can update cached objects that multiple screens share simultaneously.

And if your team values strong typing and self-documenting APIs, GraphQL delivers in a way that REST can't match without substantial additional tooling. The schema is a living, explorable contract. Combined with code generation tools like `graphql_codegen`, you can achieve end-to-end type safety from the schema definition all the way to your Dart widgets.

### Where GraphQL is the Wrong Choice

GraphQL adds genuine complexity: a schema to maintain, resolvers to write, a link chain to configure, and a normalized cache whose behavior you must understand deeply to use correctly.

For simple CRUD applications like a settings screen, a contact form, or a basic registration flow, that complexity rarely pays off. REST is simpler to set up, simpler to debug, and more familiar to a wider range of developers.

If your team has no prior GraphQL experience and you're under a tight delivery deadline, the learning curve is real and legitimate. GraphQL can slow a team down before it speeds them up. That tradeoff deserves honest consideration before committing to the technology.

File uploads, while technically possible in GraphQL via the multipart request spec, are more complex to implement than a straightforward multipart POST to a REST endpoint. If uploading files is a core part of your app's functionality, REST handles it more naturally.

GraphQL is also harder to explore for third-party developers who want to test your API with simple curl commands. For public-facing developer APIs intended to be accessible to a broad audience with diverse tooling, REST is the more approachable and conventional choice.

---

## Common Mistakes

### Ignoring How the Normalized Cache Works

The most widespread mistake among developers new to GraphQL is not understanding normalization and then fighting the cache. You run a mutation, the server updates the data, but the UI doesn't refresh.

This typically happens for one of three reasons:

1. The mutation doesn't return the updated fields, so the cache receives no new data to normalize. Always return the full set of fields your UI needs from every mutation response.
2. The returned object doesn't include an `id` field, and often `__typename` as well, so the cache can't identify which stored object to update. The cache uses `__typename` concatenated with `id` as the cache key. If either is missing, normalization fails silently and the update has no visible effect.
3. The mutation adds or removes an item from a list, and the cache doesn't update the list automatically. The cache only updates objects it can identify by their key. It has no mechanism for knowing that a new comment should be appended to a post's comment list. You must handle list mutations manually in the `update` callback using `cache.writeQuery` or `cache.writeFragment`.

### Defining Query Strings Inside the Build Method

When a query string is defined as a local variable inside `build()`, Dart recreates it on every rebuild, and `gql()` re-parses the string into an AST document object on every call. For simple widgets this is inconsequential in isolation, but it's unnecessary work that compounds across a complex widget tree. Always define query strings as top-level `const` values:

```dart
// Wrong -- recreated and re-parsed on every build() call
Widget build(BuildContext context) {
  final query = '''
    query { ... }
  ''';
  return Query(options: QueryOptions(document: gql(query)), ...);
}

// Right -- parsed once at startup, reused across every rebuild
const String myQuery = r'''
  query { ... }
''';

Widget build(BuildContext context) {
  return Query(options: QueryOptions(document: gql(myQuery)), ...);
}
```

### Using `networkOnly` for Everything

Some developers, burned by stale cache bugs, set every single query to `networkOnly`. This solves the staleness problem by creating several others: slower perceived performance (no instant cached data), higher data consumption, faster battery drain, and a broken offline experience where every screen shows an error instead of previously loaded content.

The correct approach is to choose the appropriate fetch policy for each query based on how time-sensitive that data is. Don't apply a blanket policy across all queries.

### Forgetting to Cancel Subscriptions

The `Subscription` widget manages its WebSocket connection automatically: it opens when the widget enters the tree and closes when the widget leaves.

But if you use the client's `subscribe()` method directly inside a Bloc or any long-lived object, you receive a `Stream` that you must manage yourself. Subscriptions that are never cancelled are memory leaks that accumulate silently with every navigation event:

```dart
class PostBloc extends Bloc<PostEvent, PostState> {
  StreamSubscription? _commentSubscription;

  void startListeningToComments(String postId) {
    _commentSubscription = _repository
        .watchNewComments(postId)
        .listen((comment) => add(CommentReceived(comment)));
  }

  @override
  Future<void> close() {
    _commentSubscription?.cancel(); // Always cancel before closing
    return super.close();
  }
}
```

### Not Handling Partial GraphQL Results

A GraphQL response can carry both `data` and `errors` simultaneously. This is a partial result: some resolvers succeeded and some failed. If you check only `result.hasException`, you may miss GraphQL errors that accompanied successfully resolved data.

Always inspect both `result.data` and `result.exception` and decide explicitly how your UI should behave in each combination.

---

## Mini End-to-End Example

Let's build a complete, runnable application to put everything in context. We'll use the GitHub GraphQL API so you can run this immediately without setting up your own server. The app fetches the authenticated user's repositories and allows starring and unstarring them, demonstrating queries, mutations, and optimistic UI together in a single working codebase.

Generate a GitHub personal access token at `https://github.com/settings/tokens` with at least `read:user` and `repo` scopes before running the example.

### The GraphQL Client

```dart title="lib/graphql/client.dart"
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

// Never hardcode tokens in production.
// Use flutter_secure_storage or an equivalent secure mechanism.
const _githubToken = 'YOUR_GITHUB_TOKEN_HERE';

ValueNotifier<GraphQLClient> buildGitHubClient() {
  final httpLink = HttpLink('https://api.github.com/graphql');

  final authLink = AuthLink(
    getToken: () => 'Bearer $_githubToken',
  );

  return ValueNotifier(
    GraphQLClient(
      link: authLink.concat(httpLink),
      cache: GraphQLCache(store: HiveStore()),
    ),
  );
}
```

This file sets up a **GraphQL client** that our Flutter app will use to talk to GitHub’s GraphQL API.

It creates an HTTP connection to `https://api.github.com/graphql`, then adds an authentication layer using your GitHub token so every request includes a `Bearer` token.

These two parts are combined so requests are both authenticated and correctly sent to GitHub.

Finally, it enables caching using `GraphQLCache` with `HiveStore`, so data can be stored locally and reused instead of always fetching from the network.

In simple terms: it connects our app to GitHub, attaches our login token, and adds local caching for performance.

### The Queries

```dart title="lib/graphql/queries/repo_queries.dart"
const String fetchViewerReposQuery = r'''
  query FetchViewerRepos($count: Int!) {
    viewer {
      login
      name
      avatarUrl
      repositories(
        first: $count
        orderBy: { field: STARGAZERS, direction: DESC }
        ownerAffiliations: [OWNER]
      ) {
        nodes {
          id
          name
          description
          stargazerCount
          primaryLanguage {
            name
            color
          }
          viewerHasStarred
        }
      }
    }
  }
''';
```

This file defines a **GraphQL query** that fetches data from GitHub about the currently authenticated user and their repositories.

The query is named `FetchViewerRepos` and it takes one variable, `$count`, which controls how many repositories to return.

It starts by asking for the `viewer`, which represents the logged-in user. From the viewer, it retrieves basic profile information like `login`, `name`, and `avatarUrl`.

Then it fetches the user’s `repositories`, limited by the `$count` variable. The repositories are sorted by the number of stars in descending order, and it only includes repositories where the user is the owner.

For each repository, it requests:

- `id` (used for identifying and caching),
- `name`,
- `description`,
- `stargazerCount` (number of stars),
- `primaryLanguage` (including its name and color),
- `viewerHasStarred` (whether the current user has starred it).

In simple terms, this query is asking: “Give me the logged-in user’s profile and a list of their most popular repositories, along with key details for each one.”

### The Mutations

```dart title="lib/graphql/mutations/repo_mutations.dart"
const String addStarMutation = r'''
  mutation AddStar($repoId: ID!) {
    addStar(input: { starrableId: $repoId }) {
      starrable {
        ... on Repository {
          id
          stargazerCount
          viewerHasStarred
        }
      }
    }
  }
''';

const String removeStarMutation = r'''
  mutation RemoveStar($repoId: ID!) {
    removeStar(input: { starrableId: $repoId }) {
      starrable {
        ... on Repository {
          id
          stargazerCount
          viewerHasStarred
        }
      }
    }
  }
''';
```

This file defines two **GraphQL mutations** that let our app star and unstar repositories on GitHub.

The first mutation, `addStarMutation`, is used to **star a repository**. It takes a variable called `$repoId`, which is the unique ID of the repository. When executed, it calls `addStar` with that ID. The response returns the updated repository data, specifically:

- the `id`,
- the updated `stargazerCount` (number of stars),
- and `viewerHasStarred` (which becomes `true` after starring).

The second mutation, `removeStarMutation`, does the opposite. It **removes a star** from a repository using the same `$repoId`. It calls `removeStar`, and the response again returns:

- `id`,
- updated `stargazerCount`,
- and `viewerHasStarred` (which becomes `false` after unstarring).

Both mutations use a GraphQL concept called **inline fragments** (`... on Repository`) to ensure the returned data is specifically treated as a `Repository` type.

In simple terms: one mutation adds a star, the other removes it, and both return the updated repository state so your UI can update immediately.

### The Entry Point

```dart title="lib/main.dart"
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'graphql/client.dart';
import 'screens/repos_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await initHiveForFlutter();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GraphQLProvider(
      client: buildGitHubClient(),
      child: MaterialApp(
        title: 'GitHub Repos',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
          useMaterial3: true,
        ),
        home: const ReposScreen(),
      ),
    );
  }
}
```

This is the **entry point of our Flutter app**, and it wires everything together.

The `main()` function first ensures Flutter is initialized with `WidgetsFlutterBinding.ensureInitialized()`, which is required before doing any async setup. Then it calls `initHiveForFlutter()`, which prepares Hive for local storage. This is needed because our GraphQL client uses Hive for caching. After that, it runs the app by calling `runApp()`.

The `MyApp` widget sets up the app’s structure. The most important part here is the `GraphQLProvider`, which injects your GraphQL client (from `buildGitHubClient()`) into the entire widget tree. This allows any widget in the app to make GraphQL queries and mutations without manually passing the client around.

Inside the `GraphQLProvider`, you define a `MaterialApp` with basic app settings like the title, theme, and disabling the debug banner. The home screen is set to `ReposScreen`, which means that screen will be the first thing users see when the app launches.

### The Repos Screen

```dart :collapsed-lines title="lib/screens/repos_screen.dart"
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import '../graphql/queries/repo_queries.dart';
import '../graphql/mutations/repo_mutations.dart';

class ReposScreen extends StatelessWidget {
  const ReposScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document: gql(fetchViewerReposQuery),
        variables: const {'count': 15},
        fetchPolicy: FetchPolicy.cacheAndNetwork,
      ),
      builder: (QueryResult result,
          {VoidCallback? refetch, FetchMore? fetchMore}) {
        if (result.isLoading && result.data == null) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }

        if (result.hasException) {
          return Scaffold(
            body: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.error_outline,
                      size: 48, color: Colors.red),
                  const SizedBox(height: 12),
                  Text(
                    result.exception?.graphqlErrors.firstOrNull?.message
                        ?? 'An error occurred',
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: refetch,
                    child: const Text('Retry'),
                  ),
                ],
              ),
            ),
          );
        }

        final viewer =
            result.data?['viewer'] as Map<String, dynamic>?;
        final repos =
            (viewer?['repositories']?['nodes'] as List<dynamic>?)
                    ?.cast<Map<String, dynamic>>() ??
                [];

        return Scaffold(
          appBar: AppBar(
            title: Row(
              children: [
                if (viewer?['avatarUrl'] != null)
                  CircleAvatar(
                    backgroundImage:
                        NetworkImage(viewer!['avatarUrl'] as String),
                    radius: 16,
                  ),
                const SizedBox(width: 8),
                Text(viewer?['name'] as String? ??
                    viewer?['login'] as String? ??
                    ''),
              ],
            ),
            // A subtle indicator that a background refresh is running
            bottom: result.isLoading
                ? const PreferredSize(
                    preferredSize: Size.fromHeight(2),
                    child: LinearProgressIndicator(),
                  )
                : null,
          ),
          body: RefreshIndicator(
            onRefresh: () async => refetch?.call(),
            child: ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: repos.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (context, index) =>
                  RepoCard(repo: repos[index]),
            ),
          ),
        );
      },
    );
  }
}

class RepoCard extends StatelessWidget {
  final Map<String, dynamic> repo;

  const RepoCard({super.key, required this.repo});

  @override
  Widget build(BuildContext context) {
    final language =
        repo['primaryLanguage'] as Map<String, dynamic>?;
    final isStarred = repo['viewerHasStarred'] as bool? ?? false;
    final starCount = repo['stargazerCount'] as int? ?? 0;
    final repoId = repo['id'] as String;
    final mutationDoc = isStarred ? removeStarMutation : addStarMutation;
    final mutationKey = isStarred ? 'removeStar' : 'addStar';

    return Mutation(
      options: MutationOptions(
        document: gql(mutationDoc),
        // The mutation returns id, stargazerCount, and viewerHasStarred.
        // The cache normalizes the updated repository by id and broadcasts
        // the change to all widgets holding data for this repository.
        onError: (error) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(
              content: Text(
                error?.graphqlErrors.firstOrNull?.message
                    ?? 'Action failed',
              ),
            ),
          );
        },
      ),
      builder: (RunMutation runMutation, QueryResult? mutationResult) {
        final isMutating = mutationResult?.isLoading ?? false;

        // Prefer values from the mutation result (including optimistic)
        // over the original query data so the UI reflects the latest state.
        final starrable =
            (mutationResult?.data?[mutationKey] as Map<String, dynamic>?)?[
                'starrable'] as Map<String, dynamic>?;

        final currentStarred =
            starrable?['viewerHasStarred'] as bool? ?? isStarred;
        final currentCount =
            starrable?['stargazerCount'] as int? ?? starCount;

        return Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        repo['name'] as String? ?? '',
                        style: Theme.of(context)
                            .textTheme
                            .titleMedium
                            ?.copyWith(fontWeight: FontWeight.bold),
                      ),
                    ),
                    isMutating
                        ? const SizedBox(
                            width: 24,
                            height: 24,
                            child: CircularProgressIndicator(
                                strokeWidth: 2),
                          )
                        : IconButton(
                            onPressed: () => runMutation(
                              {'repoId': repoId},
                              // Optimistic result: update the UI instantly
                              // before the server responds.
                              optimisticResult: {
                                mutationKey: {
                                  'starrable': {
                                    '__typename': 'Repository',
                                    'id': repoId,
                                    'stargazerCount': isStarred
                                        ? starCount - 1
                                        : starCount + 1,
                                    'viewerHasStarred': !isStarred,
                                  }
                                }
                              },
                            ),
                            icon: Icon(
                              currentStarred
                                  ? Icons.star
                                  : Icons.star_border,
                              color: currentStarred
                                  ? Colors.amber
                                  : Colors.grey,
                            ),
                            tooltip:
                                currentStarred ? 'Unstar' : 'Star',
                          ),
                  ],
                ),
                if (repo['description'] != null)
                  Padding(
                    padding: const EdgeInsets.only(top: 4),
                    child: Text(
                      repo['description'] as String,
                      style: Theme.of(context).textTheme.bodySmall,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    if (language != null) ...[
                      Container(
                        width: 12,
                        height: 12,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: _parseColor(
                              language['color'] as String?),
                        ),
                      ),
                      const SizedBox(width: 4),
                      Text(
                        language['name'] as String? ?? '',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      const SizedBox(width: 16),
                    ],
                    const Icon(Icons.star, size: 14, color: Colors.amber),
                    const SizedBox(width: 4),
                    Text(
                      _formatCount(currentCount),
                      style: Theme.of(context).textTheme.bodySmall,
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Color _parseColor(String? hex) {
    if (hex == null) return Colors.grey;
    final hexValue = hex.replaceFirst('#', '');
    return Color(int.parse('FF$hexValue', radix: 16));
  }

  String _formatCount(int count) {
    if (count >= 1000) return '${(count / 1000).toStringAsFixed(1)}k';
    return count.toString();
  }
}
```

This code is building a GitHub-like repository screen in Flutter using `graphql_flutter`, and it relies heavily on GraphQL queries, mutations, and caching behavior to keep the UI in sync with remote data.

At the top level, the `ReposScreen` widget uses a `Query` widget from `graphql_flutter` to fetch data from a GraphQL endpoint. The query (`fetchViewerReposQuery`) requests the current user (the “viewer”) and a list of their repositories. It passes a variable (`count: 15`) to limit how many repositories are returned. The fetch policy `cacheAndNetwork` means it first tries to show cached data immediately, then updates it with fresh data from the network.

When the query is still loading and there's no cached data, the screen shows a loading spinner. If an error occurs, it displays an error message and a retry button that triggers `refetch`, which re-runs the query.

Once data is available, the screen extracts the `viewer` object and the list of repositories from the response. It then renders a `Scaffold` with an `AppBar` showing the user’s avatar and name, and a `ListView` that displays each repository using a `RepoCard`.

Each `RepoCard` represents a single repository and wraps its UI in a `Mutation` widget. This mutation handles starring and unstarring a repository. Depending on whether the repo is already starred (`viewerHasStarred`), it dynamically chooses either the “add star” or “remove star” mutation.

When the star button is pressed, the `runMutation` function is called with the repository ID. At the same time, an `optimisticResult` is provided so the UI updates immediately before the server responds. This is why the star count and icon change instantly, giving a smooth user experience.

The mutation also defines an `onError` handler that shows a `SnackBar` if something goes wrong during the mutation.

Inside the `Mutation` builder, the UI prefers data from the mutation result (if available) instead of the original query data. This ensures that once the mutation completes (or even during optimistic updates), the UI reflects the most recent state.

The repository card itself displays the repository name, optional description, primary language (with a colored dot), and star count. The star count is formatted to show values like “1.2k” for large numbers.

There's also a loading indicator on the star button while the mutation is in progress, so the user gets feedback that something is happening.

Finally, the key idea in this code is that GraphQL’s normalized cache is doing a lot of work behind the scenes. When a mutation updates a repository, the cache automatically updates all parts of the UI that depend on that repository’s `id`, keeping everything consistent without manually refreshing the entire list.

This complete, runnable application demonstrates every major concept in one cohesive codebase:

- client setup with `AuthLink` and `HiveStore`,
- a `Query` widget with proper loading, error, and data states with both pull-to-refresh and a background refresh indicator,
- a `Mutation` widget inside each list item with optimistic UI that makes starring feel instant,
- and the normalized cache propagating updates across the list automatically when a star operation completes.

---

## Conclusion

GraphQL is not simply a different way to write APIs. It's a different philosophy about the relationship between a server and the clients that consume it.

The shift from server-driven to client-driven data fetching has real, measurable consequences: less bandwidth consumed, fewer network round trips, faster perceived screen loads, and more autonomy for frontend teams to build the UIs they need without waiting for backend changes.

For Flutter developers specifically, these benefits are amplified by the mobile context. Every saved byte is real bandwidth. Every eliminated round trip is real latency on the user's device. Every cache hit that avoids a re-fetch is real battery life preserved.

These aren't theoretical improvements. They show up in app metrics, in crash rates on poor connections, and in the reviews users leave when an app feels fast versus when it makes them wait.

The `graphql_flutter` package brings GraphQL into Flutter in a way that respects Flutter's reactive, widget-tree-based architecture. The `Query`, `Mutation`, and `Subscription` widgets fit naturally into how Flutter apps are built. The normalized cache, the composable link chain, and optimistic UI support provide the building blocks for the full complexity of production apps, not just toy examples.

Understanding the problem first is what makes everything else click. GraphQL's design decisions only make sense once you've felt the friction of over-fetching and the N+1 request problem.

Respecting the schema as the source of truth, rather than skimming it as documentation, gives you a development feedback loop that catches errors before they reach production. Embracing the normalized cache rather than fighting it with blanket network-only policies unlocks the reactive, fluid UX that separates great apps from merely functional ones. And structuring your codebase with a clean repository layer, combined with a proper state management solution, produces a system that stays maintainable as the product and the team grow.

GraphQL isn't the right tool for every project. Simple apps, small teams with tight timelines, and file-heavy workflows are all legitimate reasons to stay with REST. But for the right project, a data-intensive Flutter app with complex entity relationships, multiple screen types, and real-time requirements, GraphQL is an exceptionally strong choice.

With the foundations this handbook has built, you have everything you need to make that judgment confidently and to implement GraphQL correctly when it earns its place in your stack.

---

## References

### Official Package Documentation

<SiteInfo
  name="graphql_flutter | Flutter package"
  desc="A GraphQL client for Flutter, bringing all the features from a modern GraphQL client to one easy to use package."
  url="https://pub.dev/packages/graphql_flutter/"
  logo="https://pub.dev/static/hash-qdshfgq0/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-qdshfgq0/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="graphql-flutter/packages/graphql_flutter at main · zino-hofmann/graphql-flutter"
  desc="A GraphQL client for Flutter, bringing all the features from a modern GraphQL client to one easy to use package. - zino-hofmann/graphql-flutter"
  url="https://github.com/zino-hofmann/graphql-flutter/tree/main/packages/graphql_flutter/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6cc94e6c9f344e6433c864c41f9bcace34313e9437c6789f952f23c959101022/zino-hofmann/graphql-flutter"/>

<SiteInfo
  name="graphql-flutter/packages/graphql/README.md at main · zino-hofmann/graphql-flutter"
  desc="A GraphQL client for Flutter, bringing all the features from a modern GraphQL client to one easy to use package. - zino-hofmann/graphql-flutter"
  url="https://github.com/zino-hofmann/graphql-flutter/blob/main/packages/graphql/README.md"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6cc94e6c9f344e6433c864c41f9bcace34313e9437c6789f952f23c959101022/zino-hofmann/graphql-flutter"/>

```component VPCard
{
  "title": "GraphQLCache class - graphql library - Dart API",
  "desc": "API docs for the GraphQLCache class from the graphql library, for the Dart programming language.",
  "link": "https://pub.dev/documentation/graphql/latest/graphql/GraphQLCache-class.html",
  "logo": "https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8",
  "background": "rgba(19,185,253,0.2)"
}
```

```component VPCard
{
  "title": "GraphQLDataProxy class - graphql library - Dart API",
  "desc": "API docs for the GraphQLDataProxy class from the graphql library, for the Dart programming language.",
  "link": "https://pub.dev/documentation/graphql/latest/graphql/GraphQLDataProxy-class.html",
  "logo": "https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8",
  "background": "rgba(19,185,253,0.2)"
}
```

### GraphQL Language and Specification

```component VPCard
{
  "title": "GraphQL Specification Versions",
  "desc": "",
  "link": "https://spec.graphql.org/",
  "logo": "https://spec.graphql.org/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

```component VPCard
{
  "title": "Learn | GraphQL",
  "desc": "Get hands-on with the fundamentals of GraphQL. Start with the basics and see how it compares to other technologies.",
  "link": "https://graphql.org/learn/",
  "logo": "https://graphql.org/favicon.ico",
  "background": "rgba(255,153,224,0.2)"
}
```

```component VPCard
{
  "title": "GraphQL: A data query language | GraphQL",
  "desc": "When we built Facebook’s mobile applications, we needed a data-fetching API powerful enough to describe all of Facebook, yet simple and easy to learn so product developers can focus on building things quickly. We developed GraphQL three years ago to fill this need. Today it powers hundreds of billions of API calls a day. This year we’ve begun the process of open-sourcing GraphQL by drafting a specification, releasing a reference implementation, and forming a community around it here at graphql.org.",
  "link": "https://graphql.org/blog/2015-09-14-graphql/",
  "logo": "https://graphql.org/favicon.ico",
  "background": "rgba(255,153,224,0.2)"
}
```

### Tooling and Ecosystem

<SiteInfo
  name="graphql_codegen | Dart package"
  desc="Simple, opinionated, codegen library for GraphQL. It allows you to generate serializers and client helpers to easily call and parse your data."
  url="https://pub.dev/packages/graphql_codegen/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-qdshfgq0/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="hive_ce | Dart package"
  desc="Hive Community Edition - A spiritual continuation of Hive v2"
  url="https://pub.dev/packages/hive_ce/"
  logo="https://pub.dev/favicon.ico?hash=nk4nss8c7444fg0chird9erqef2vkhb8"
  preview="https://pub.dev/static/hash-qdshfgq0/img/pub-dev-icon-cover-image.png"/>

### Related Flutter Packages

<SiteInfo
  name="flutter_hooks | Flutter package"
  desc="A flutter implementation of React hooks. It adds a new kind of widget with enhanced code reuse."
  url="https://pub.dev/packages/flutter_hooks/"
  logo="https://pub.dev/static/hash-qdshfgq0/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-qdshfgq0/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="flutter_bloc | Flutter package"
  desc="Flutter widgets that make it easy to implement the BLoC (Business Logic Component) design pattern. Built to be used with the bloc state management package."
  url="https://pub.dev/packages/flutter_bloc/"
  logo="https://pub.dev/static/hash-qdshfgq0/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-qdshfgq0/img/pub-dev-icon-cover-image.png"/>

<SiteInfo
  name="flutter_secure_storage | Flutter package"
  desc="A Flutter plugin for securely storing sensitive data using encrypted storage."
  url="https://pub.dev/packages/flutter_secure_storage/"
  logo="https://pub.dev/static/hash-qdshfgq0/img/flutter-logo-32x32.png"
  preview="https://pub.dev/static/hash-qdshfgq0/img/pub-dev-icon-cover-image.png"/>


### Learning Resources

<SiteInfo
  name="How to GraphQL - The Fullstack Tutorial for GraphQL"
  desc="Fullstack GraphQL Tutorial to go from zero to production covering all basics and advanced concepts."
  url="https://howtographql.com/"
  logo="https://howtographql.com/favicon.ico"
  preview="https://howtographql.com/social.png"/>

<SiteInfo
  name="Using GraphQL Clients - GitHub Docs"
  desc="You can run queries on real GitHub data using various GraphQL clients and libraries."
  url="https://docs-internal.github.com/en/graphql/guides/using-graphql-clients/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/graphql.png"/>

<SiteInfo
  name="GitHub GraphQL API documentation - GitHub Docs"
  desc="To create integrations, retrieve data, and automate your workflows, use the GitHub GraphQL API. The GitHub GraphQL API offers more precise and flexible queries than the GitHub REST API."
  url="https://docs-internal.github.com/en/graphql/"
  logo="https://docs-internal.github.com/assets/cb-345/images/site/favicon.png"
  preview="https://docs.github.com/assets/cb-345/images/social-cards/graphql.png"/>

:::

::: note

This handbook was written for* `graphql_flutter: ^5.3.0` with Flutter 3.x and Dart 3.x. API details may differ in earlier or later versions. Always refer to the official package documentation for the most current information.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use GraphQL in Flutter: A Handbook for Developers",
  "desc": "There's a moment that most Flutter developers experience at some point in their careers. You're building a screen that needs a user's name, their latest five posts, and the like count on each post. Se",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-graphql-in-flutter-a-handbook-for-developers.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
