---
lang: en-US
title: "Understanding Microservices: Core Concepts and Benefits"
description: "Article(s) > Understanding Microservices: Core Concepts and Benefits"
icon: fas fa-pen-ruler
category:
  - Design
  - System
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Understanding Microservices: Core Concepts and Benefits"
    - property: og:description
      content: "Understanding Microservices: Core Concepts and Benefits"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/understanding-microservices-core-concepts-and-benefits.html
prev: /academics/system-design/articles/README.md
date: 2025-04-19
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_138.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Understanding Microservices: Core Concepts and Benefits"
  desc="What are microservices, and why might they be the right architectural choice for your organization? Microservices offer independently deployable, domain-focused components that provide flexibility when applied correctly to solve the right organizational problems."
  url="https://milanjovanovic.tech/blog/understanding-microservices-core-concepts-and-benefits"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_138.png"/>

I've been revisiting Sam Newman's excellent book [<VPIcon icon="fas fa-globe"/>"Monolith to Microservices"](https://oreilly.com/library/view/monolith-to-microservices/9781492047834/) recently, and it's reminded me just how transformative this architectural approach can be **when applied correctly**.

As someone who's implemented microservices in various organizations, I wanted to share some valuable insights I've gained through both study and practical experience.

What exactly are microservices, and why might they be the right architectural choice for your organization?

Let's dive into the core concepts and benefits of microservices architecture.

---

## What Are Microservices?

Microservices are **independently deployable** services modeled around a **business domain**. Business domain is key here, but more on that later. They communicate with each other via networks and offer many options for solving complex architectural problems.

Think of microservices as small, focused teams rather than a large department. Each team has a specific responsibility, operates somewhat independently, and communicates clearly with other teams when needed. Instead of one massive codebase that handles everything, you have multiple smaller codebases, each focusing on a specific business capability.

![Microservices architecture showing an event management system.](https://milanjovanovic.tech/blogs/mnw_138/microservices_architecture.png?imwidth=3840)

As Sam Newman defines them in "Monolith to Microservices":

> Microservices are independently deployable services modeled around a business domain. They communicate with each other via networks, and as an architecture choice offer many options for solving the problems you may face.

Microservices give you a strategy to design a modular system and decompose it into bounded contexts. However, the problem I often see is that developers use microservices to enforce code boundaries. This is a mistake. We'll fix that in a moment.

---

## Key Characteristics of Microservices

Let's explore some of the key characteristics that define microservices:

### Independent Deployability

You can make changes to a microservice and deploy it to production without having to deploy anything else. This isn't just a theoretical ability - it's a discipline you practice for most of your releases.

The value here is significant: **smaller deployments** carry **less risk**, enable **faster release cycles**, and allow teams to test their changes in isolation.

When a critical bug appears in one service, you can fix and deploy just that service rather than orchestrating a full system release. This is especially valuable in large systems where coordinating releases can be a logistical nightmare.

### Business Domain Focus

Microservices are organized around [**business capabilities**](/milanjovanovic.tech/screaming-architecture.md) rather than technical layers. Instead of having separate frontend, backend, and database teams (and the coordination that requires), you might have teams dedicated to "Event Management," "Customer Accounts," or "Attendance."

This alignment makes it easier to implement business functionality changes since all the related code - from UI to data storage - is grouped together. When a business requirement changes, you can often change just one service rather than coordinating changes across multiple layers.

![Event storming whiteboard with events grouped into logical boundaries.](https://milanjovanovic.tech/blogs/mnw_138/event_storming.png?imwidth=3840)

### Data Ownership

Microservices **encapsulate data storage** and retrieval, exposing data only via [**well-defined interfaces**](/milanjovanovic.tech/internal-vs-public-apis-in-modular-monoliths.md). Databases are hidden inside the service boundary rather than shared between services.

This stands in stark contrast to traditional approaches where multiple applications share a common database, often leading to tight coupling and risky schema changes.

When a service owns its data exclusively, it can:

- Evolve its internal data model without breaking other services
- Implement the most appropriate storage technology for its needs
- Provide a stable API for other services to access its data.

It's not uncommon for multiple services to share the same database, but you're giving up some of the benefits of microservices by doing so. In practice, one database per service is the most common approach.

### Network Communication

Services communicate with each other via networks, making microservices a form of distributed system. This network-based communication could use [**REST APIs**](/milanjovanovic.tech/pragmatic-rest-apis/README.md), message queues, gRPC, GraphQL, or other protocols depending on the specific needs.

![A simple diagram with two boxes representing microservices that communicate over a network.](https://milanjovanovic.tech/blogs/mnw_138/network_communication.png?imwidth=1080)

This explicit communication over networks allows services to be deployed independently and even run on different infrastructure. But it also means dealing with network latency, potential failures, and serialization concerns.

Teams building microservices need to carefully design their [**inter-service communication patterns**](/milanjovanovic.tech/modular-monolith-communication-patterns.md) to balance performance, reliability, and flexibility.

---

## The Origins of Microservices

The term "microservices" has an interesting origin story. In 2011, a software consultant named James Lewis became interested in what he called "micro-apps" - small services optimized to be easily replaceable.

The distinguishing feature was how small in scope these services were. Some could be written or rewritten in just a few days. As discussions evolved, the term "microservices" was adopted since these weren't self-contained applications but rather services working together.

It's worth noting that while "micro" is in the name, the size of a microservice isn't its defining characteristic. Rather, it's about having services with well-defined boundaries that can be developed, deployed, and scaled independently.

---

## Key Benefits of Microservices

What are the benefits of adopting a microservices architecture?

Why should you consider it for your organization?

Let's explore some of the key advantages:

### Flexibility and Adaptability

**Microservices give you options**. They provide flexibility in how you can scale, evolve, and maintain your system over time.

- When business requirements change, you can modify just the affected services rather than risking changes to the entire system.
- New capabilities can be introduced as new services without disrupting existing functionality.
- As your understanding of the domain grows, service boundaries can evolve to better reflect that understanding.

This ability to evolve incrementally is particularly valuable in rapidly changing business environments where time-to-market is critical.

### Technology Diversity

With microservices, you can mix and match technology stacks. Each service can use the programming language, database, or framework best suited for its specific requirements. This practice is known as polyglot programming and [**polyglot persistence**](/milanjovanovic.tech/modular-monolith-data-isolation.md).

For example, a recommendation engine might use Python with specialized machine learning libraries. On the other hand, a transaction processing service might use .NET for its strong typing and performance characteristics.

A reporting service might use a columnar database optimized for analytics, while a user profile service could use a document database that better fits its data model.

![Event storming whiteboard with events grouped into logical boundaries.](https://milanjovanovic.tech/blogs/mnw_138/polyglot_persistence.png?imwidth=640)

This flexibility allows teams to choose the right tool for each job rather than compromising on a one-size-fits-all approach.

### Parallel Development

Multiple teams can work on different services simultaneously without stepping on each other's toes. This parallelization can significantly accelerate development velocity in larger organizations.

Each team can maintain its own release schedule, make technology decisions, and optimize for their specific service's needs without coordinating with every other team. I've seen firsthand how this autonomy can reduce dependencies between teams, minimizing bottlenecks and wait times.

Organizations commonly structure their teams around services or groups of related services. You might know this concept as [<VPIcon icon="fa-brands fa-wikipedia-w"/>Conway's Law](https://en.wikipedia.org/wiki/Conway%27s_law):

> Organizations, who design systems, are constrained to produce designs which are copies of the communication structures of these organizations.

### Targeted Scaling

You can scale just the services that need it, rather than scaling the entire system. This provides more efficient resource utilization and can reduce operational costs.

For example, if your product catalog needs to handle high traffic during a sale, you can scale just the catalog service without scaling your payment processing service.

This granular scaling becomes especially valuable as systems grow and different components have different performance characteristics. Some services might be CPU-intensive while others are memory-intensive, and with microservices, you can optimize the infrastructure for each service's specific needs.

This approach can lead to significant cost savings compared to [**scaling a monolith**](/milanjovanovic.tech/scaling-monoliths-a-practical-guide-for-growing-systems.md), where all components must scale together regardless of their individual requirements.

### Organizational Alignment

Microservices can help align your technical architecture with your organizational structure. Teams can own specific services that correspond to their business domain expertise, promoting clearer ownership and accountability.

![UML diagram showing the main bounded contexts in the system and their parts.](https://milanjovanovic.tech/blogs/mnw_138/evently_domain.png?imwidth=1920)

This alignment reduces handoffs and coordination costs between teams, as each team has clear boundaries of responsibility. It supports Conway's Law in a positive way. Instead of having your communication structure accidentally create your architecture, you deliberately design both your teams and your services around business capabilities.

This approach can lead to more stable team structures and software boundaries over time, as business domains tend to evolve more slowly than technical implementations.

---

## Challenges to Consider With Microservices

While microservices offer numerous benefits, they're not without challenges:

### Distributed System Complexity

Network communication introduces latency, reliability challenges, and makes debugging more difficult. Services must handle network failures gracefully, implement retries with backoff strategies, and deal with the reality that a request might succeed but the response might get lost.

[**Distributed tracing**](/milanjovanovic.tech/introduction-to-distributed-tracing-with-opentelemetry-in-dotnet.md) becomes essential to understand how requests flow through the system.

![Distributed trace.](https://milanjovanovic.tech/blogs/mnw_138/distributed_trace.png?imwidth=3840)

You'll need to develop strategies for handling partial system failures. Concepts like circuit breakers and bulkheads become part of your everyday vocabulary.

### Operational Overhead

Managing many services requires robust [**deployment pipelines**](/milanjovanovic.tech/streamlining-dotnet-9-deployment-with-github-actions-and-azure.md), monitoring, and debugging tools. You'll need to invest in automation for deployment, [**health checking**](/milanjovanovic.tech/health-checks-in-asp-net-core.md), scaling, and perhaps [**service discovery**](/milanjovanovic.tech/how-dotnet-aspire-simplifies-service-discovery.md). Each service needs monitoring, logging, and alerting.

This overhead can be substantial. Organizations successfully running microservices typically have a strong DevOps culture and tooling to manage this complexity.

### Data Consistency

Maintaining consistency across service boundaries becomes more challenging without the safety of [**database transactions**](/milanjovanovic.tech/working-with-transactions-in-ef-core.md).

Implementing business processes that span multiple services often requires eventual consistency models and compensation mechanisms to handle failures. You'll need to design your services with [**idempotency**](/milanjovanovic.tech/implementing-idempotent-rest-apis-in-aspnetcore.md) in mind and may need to implement patterns like the [**Saga pattern**](/milanjovanovic.tech/implementing-the-saga-pattern-with-masstransit.md) to manage distributed transactions.

These approaches add complexity but can actually lead to more resilient systems when implemented correctly.

### Service Coordination

Orchestrating workflows that span multiple services requires careful design. Simple processes in a monolith can become complex choreographies in a microservice architecture.

You'll need to decide whether to use [**orchestration**](/milanjovanovic.tech/orchestration-vs-choreography.md) (where a central service directs the process) or [**choreography**](/milanjovanovic.tech/orchestration-vs-choreography.md) (where services react to events without central coordination). These patterns have different trade-offs in terms of coupling, resilience, and observability.

Designing these cross-service workflows often reveals subdomain boundaries you might have missed in initial modeling.

---

## Key Takeaway

From my experience, the most important thing to remember is that microservices ultimately **buy you options**. They provide flexibility but come with costs.

Are these costs worth the options you want to exercise?

For organizations with a large engineering team working on a complex system that needs to evolve quickly, microservices may be worth the overhead. For smaller teams or systems with more stable requirements, a [**well-designed monolith**](/milanjovanovic.tech/what-is-a-modular-monolith.md) might be more appropriate. Forget about resume-driven development for a moment. It's about what solves your specific problems with **acceptable trade-offs**.

In my work, I've found that the most successful microservice adoptions start small, often by breaking off just one or two services from a monolith. Then, gradually expanding as the organization builds the necessary skills and infrastructure. This evolutionary approach reduces risk and allows teams to learn as they go.

I always like to reflect on these questions:

1. What parts of the current architecture would benefit most from independent deployability?
2. What challenges might the organization face when adopting microservices?
3. How well does the current system align with business domains?

If you want to dive deeper into building microservices - but starting from a monolith, check out [**Modular Monolith Architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md). There's an entire chapter dedicated to developing microservices, including advanced techniques such as API gateways, using message queues, and system integration testing.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding Microservices: Core Concepts and Benefits",
  "desc": "What are microservices, and why might they be the right architectural choice for your organization? Microservices offer independently deployable, domain-focused components that provide flexibility when applied correctly to solve the right organizational problems.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/understanding-microservices-core-concepts-and-benefits.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
