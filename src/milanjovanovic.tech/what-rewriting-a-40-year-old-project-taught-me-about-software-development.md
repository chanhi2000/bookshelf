---
lang: en-US
title: "What Rewriting a 40-Year-Old Project Taught Me About Software Development"
description: "Article(s) > What Rewriting a 40-Year-Old Project Taught Me About Software Development"
icon: fas fa-user-tie
category: 
  - Explore
  - Career
  - Article(s)
tag:
  - blog
  - milanjovanovic.tech
  - career
  - tips
head:
  - - meta:
    - property: og:title
      content: "Article(s) > What Rewriting a 40-Year-Old Project Taught Me About Software Development"
    - property: og:description
      content: "What Rewriting a 40-Year-Old Project Taught Me About Software Development"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/what-rewriting-a-40-year-old-project-taught-me-about-software-development.html
prev: /projects/career/articles/README.md
date: 2024-12-28
isOriginal: false
author: Milan Jovanović
cover: https://milanjovanovic.tech/blog-covers/mnw_122.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Career > Article(s)",
  "desc": "Article(s)",
  "link": "/projects/career/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="What Rewriting a 40-Year-Old Project Taught Me About Software Development"
  desc="When tasked with modernizing a 40-year-old manufacturing system written in APL, I faced both technical complexity and organizational challenges that shaped my understanding of successful software development. This article shares key lessons learned during a four-year journey of rewriting critical legacy code while keeping a $10M business running smoothly."
  url="https://milanjovanovic.tech/blog/what-rewriting-a-40-year-old-project-taught-me-about-software-development"
  logo="https://milanjovanovic.tech/profile_favicon.png"
  preview="https://milanjovanovic.tech/blog-covers/mnw_122.png"/>

"Your task is to rewrite this system. It powers our entire operation. Oh, and it's written in APL."

That's how my journey with this legacy rewrite began. For those unfamiliar with [<VPIcon icon="fa-brands fa-wikipedia-w"/>APL](https://en.wikipedia.org/wiki/APL_(programming_language)), it's a programming language from the 1960s known for its unique mathematical notation and array manipulation capabilities. Finding developers who know APL today is about as easy as finding a floppy disk drive in a modern computer.

The system has grown over four decades. It started as a simple inventory management tool and evolved into a comprehensive [<VPIcon icon="fa-brands fa-wikipedia-w"/>ERP](https://en.wikipedia.org/wiki/Enterprise_resource_planning) system. More than 460+ database tables. Countless business rules embedded in the code. Complex integrations with every part of the business process. The system is the backbone of a manufacturing operation, that generates over $10 million in annual revenue.

Our mission was clear but daunting: modernize this system using .NET, PostgreSQL, and React.

The catch? The business needed to keep running during the transition. No downtime. No data loss. No disruption to daily operations.

This wasn't just a technical challenge. It was a lesson in managing complexity, understanding legacy business processes, and navigating organizational dynamics.

So here's that story and the lessons learned.

---

## Initial State: Understanding the Legacy

The first challenge was understanding how this massive system actually worked. The codebase had grown organically over four decades, maintained by a single development team. They were now in their 60s and looking to retire.

Walking into the first codebase review was like opening a time capsule. APL's concise syntax meant that complex business logic could be written in just a few lines. Beautiful, if you could read it. Terrifying, if you couldn't. And most of us couldn't.

The original team was invaluable during the knowledge transfer. They knew every quirk, every special case, every business rule that had been added over the decades. But there's only so much you can learn from conversations. Documentation was sparse. What existed was outdated. The real documentation was in the heads of the original developers.

We spent weeks mapping the system's functionality:

- The core manufacturing process was spread across 50+ tables with complex interdependencies
- Inventory management touched nearly every part of the system
- Custom reporting tools have been built over decades to meet specific business needs
- Integration points with external components were handled through a maze of stored procedures

Tables that started with basic schemas had grown to include hundreds of columns. Some columns were no longer used but couldn't be removed because no one was sure if some obscure report still needed them.

What made this particularly challenging was the disconnect between the business processes and their technical implementation. The business would describe a simple workflow, but the technical implementation would reveal layers of complexity added over years of edge cases and special requirements.

We needed a systematic approach to understanding this beast. We started by mapping business processes and their corresponding technical implementations. This helped us identify the core domains that would later influence our modular architecture. More importantly, it helped us understand the true scope of what we were dealing with.

---

## The Product vs. Engineering Conflict

Management wanted quick wins. They pushed us to start with the simplest components. This created tension between product management and the development team.

Product management's perspective was straightforward: show progress to the business. They needed visible results to justify the investment in the rewrite. The business was spending significant money, and they wanted to see returns quickly.

The development team saw a different reality. We knew that starting with peripheral features meant building on shaky ground. The core business logic would remain in the legacy system, making every integration point more complex. This technical debt would compound over time.

As a technical lead, I strongly opposed this approach. My argument was simple: the core manufacturing process was the heart of the system. Every peripheral feature depended on it. By postponing its migration, we created a tangled web of dependencies between old and new systems. Each new feature we migrated would need complex synchronization with the legacy core. We were building on quicksand.

I advocated for focusing on the core domain first. Yes, it would take longer to show the first results. But it would create a solid foundation for everything that followed. The business would have to wait longer for visible progress, but the overall migration would be faster and more reliable.

Neither side was wrong in their objectives. Product management had valid concerns about showing progress. The development team had valid concerns about technical sustainability. But this misalignment led to compromises that impacted the project timeline. To this day, I believe we would have finished the migration sooner if we had started with the core business logic.

---

## Software Architecture: Building for the Future

During the discovery phase, we identified distinct business domains within the system. This led us to implement a [**modular monolith architecture**](/milanjovanovic.tech/what-is-a-modular-monolith.md). Each module would be self-contained but able to communicate with others through a shared event bus:

![Modular monolith architecture with legacy system and a message broker for communication.](https://milanjovanovic.tech/blogs/mnw_122/legacy_system_with_modular_monolith.png?imwidth=3840)

::: important Key architectural decisions

1. [**Modular monolith**](/milanjovanovic.tech/monolith-to-microservices-how-a-modular-monolith-helps.md): Each module represented a distinct business domain. This provided a clear path to potential future microservices if needed.
2. [**Asynchronous communication**](/milanjovanovic.tech/modular-monolith-communication-patterns.md): Modules communicated through events using RabbitMQ. This reduced coupling and improved system resilience.
3. [**Shared database with boundaries**](/milanjovanovic.tech/modular-monolith-data-isolation.md): While all modules used the same PostgreSQL database, each had its own set of tables and schemas. This helped us maintain logical separation.
4. [**Cloud-ready design**](/milanjovanovic.tech/dotnet-aspire-a-game-changer-for-cloud-native-development.md): The system was deployed to AWS using containerization. A Jenkins pipeline enabled deployments to multiple environments in minutes.

:::

---

## The Data Sync Challenge

The two-way data synchronization was more complex than initially anticipated. Here's why we couldn't use existing [<VPIcon icon="fa-brands fa-wikipedia-w"/>change data capture](https://en.wikipedia.org/wiki/Change_data_capture) (CDC) solutions like [<VPIcon icon="fas fa-globe"/>Debezium](https://debezium.io/):

1. **Complex transformations**: Many legacy tables required data from multiple new tables. This wasn't a simple one-to-one mapping that CDC tools excel at.
2. **Business logic in sync**: The sync process needed to apply business rules during transformation. This went beyond what most replication tools provide.
3. **Bidirectional requirements**: We needed to sync both ways while preventing infinite loops. The legacy system remained the source of truth for non-migrated components.

![Data sync flow between modern and legacy system.](https://milanjovanovic.tech/blogs/mnw_122/data_sync.png?imwidth=3840)

We built a custom solution using RabbitMQ for message transport. While this worked for us, the lesson remains: evaluate existing tools thoroughly before building custom solutions. Even if you can't use them entirely, you might learn valuable patterns from their approaches.

---

## Key Technical Lessons

1. **Modular architecture pays off**: The modular monolith approach made the system easier to understand and maintain. Each module had clear boundaries and responsibilities.
2. **Invest in deployment automation**: The CI/CD pipeline was crucial. It allowed us to deploy confidently and frequently, reducing the risk of each change.
3. **Message-based integration**: Async communication between modules provided the flexibility needed for the gradual migration.
4. **Data sync complexity**: Don't underestimate the complexity of data synchronization in legacy migrations. Whether using existing tools or building custom solutions, this will be a major challenge.

---

## The Human Factor

Technical challenges are only part of the story. The success of legacy rewrites depends heavily on managing different stakeholders:

1. Product Management needs to see progress
2. Development teams need time to do things right
3. The business needs to keep running
4. The legacy team needs to transfer knowledge

Finding the right balance between these competing needs can be tricky.

We found several approaches that helped:

- Regular stakeholder meetings where each group could voice concerns
- Transparent project tracking visible to all parties
- Clear communication about technical decisions and their business impact
- Celebration of both technical and business milestones
- Documentation of both technical and institutional knowledge

I can't stress enough how important it was to document the knowledge acquired over four decades of operating the legacy system. When the original team retired, we had a comprehensive set of documents that explained every business rule and every edge case.

---

## Results That Matter

Four years later, the system is thriving. The cloud infrastructure provides reliability and scalability. The [**modular monolith architecture**](/milanjovanovic.tech/modular-monolith-architecture/README.md) makes it maintainable. The automated deployment pipeline enables rapid updates.

But the journey taught us valuable lessons about balancing technical needs with business pressures. Success in legacy rewrites requires more than just technical excellence. It requires understanding the business domain, managing stakeholder expectations, and making pragmatic architectural decisions.

Software architecture matters, but so does the human factor. Plan for both.

Thanks for reading.

And stay awesome!

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What Rewriting a 40-Year-Old Project Taught Me About Software Development",
  "desc": "When tasked with modernizing a 40-year-old manufacturing system written in APL, I faced both technical complexity and organizational challenges that shaped my understanding of successful software development. This article shares key lessons learned during a four-year journey of rewriting critical legacy code while keeping a $10M business running smoothly.",
  "link": "https://chanhi2000.github.io/bookshelf/milanjovanovic.tech/what-rewriting-a-40-year-old-project-taught-me-about-software-development.html",
  "logo": "https://milanjovanovic.tech/profile_favicon.png",
  "background": "rgba(79,70,229,0.2)"
}
```
