---
lang: en-US
title: "Understanding the CAP Theorem: Consistency, Availability, and Partition Tolerance in System Design"
description: "Article(s) > Understanding the CAP Theorem: Consistency, Availability, and Partition Tolerance in System Design"
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
      content: "Article(s) > Understanding the CAP Theorem: Consistency, Availability, and Partition Tolerance in System Design"
    - property: og:description
      content: "Understanding the CAP Theorem: Consistency, Availability, and Partition Tolerance in System Design"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/understanding-the-cap-theorem-consistency-availability-and-partition-tolerance-in-system-design.html
prev: /academics/system-design/articles/README.md
date: 2026-09-02
isOriginal: false
author:
  - name: Oluwaseyi Fatunmole
    url: https://freecodecamp.org/news/author/foluwaseyi/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9a2d1ff6-84d7-42aa-8654-15df15ad52f8.png
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
  name="Understanding the CAP Theorem: Consistency, Availability, and Partition Tolerance in System Design"
  desc="In 1999, Eric Brewer made a claim that would shape how distributed systems would be designed for decades. He proposed that any distributed data store can only guarantee two of three properties simulta"
  url="https://freecodecamp.org/news/understanding-the-cap-theorem-consistency-availability-and-partition-tolerance-in-system-design"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9a2d1ff6-84d7-42aa-8654-15df15ad52f8.png"/>

In 1999, Eric Brewer made a claim that would shape how distributed systems would be designed for decades. He proposed that any distributed data store can only guarantee two of three properties simultaneously: Consistency, Availability, and Partition Tolerance.

Two years later, Seth Gilbert and Nancy Lynch formally proved it. It became known as the CAP Theorem.

Every distributed database, cloud service, and system that stores data across multiple machines makes a choice about these three properties. Understanding what those properties actually mean, why you can't have all three at the same time, and what the choice looks like in practice is fundamental knowledge for any engineer who builds or operates systems at scale.

::: note Prerequisites

Before reading this article you should be comfortable with:

- What a database is and the basic concept of reading and writing data
- What it means for data to be stored on multiple machines (replication at a conceptual level)
- Basic networking concepts: what a network request is and what it means for two machines to communicate

You don't need experience with distributed systems. This article builds the concepts from first principles.

:::

---

## The Three Properties

### Consistency

In the context of CAP, Consistency has a specific technical meaning that's different from how the word is used in everyday conversation.

Consistency in CAP means that every read receives the most recent write or an error. Not an old value. Not a stale value. Either the latest data or an explicit failure.

If you write a value to a consistent distributed system and then immediately read it from any node in that system, you get the value you just wrote. Every node in the cluster reflects the same state at any given moment.

This is called strong consistency or linearizability. It's a strict guarantee. If node A has data that node B doesn't yet have, a consistent system will either wait until node B is updated before responding to reads, or refuse to respond until consistency is restored.

The word consistent in CAP doesn't mean the same thing as the C in ACID (Atomicity, Consistency, Isolation, Durability). ACID consistency refers to data integrity constraints. CAP consistency refers to all nodes seeing the same data at the same time.

### Availability

Availability means that every request receives a response. Not necessarily the latest data, but a response. The system never refuses a request. It never returns an error saying it can't handle the query right now.

An available system keeps responding even when some of its nodes are failing or unreachable. It prioritizes uptime over data currency. If node A can't reach node B to get the latest write, an available system will respond with whatever data it has, even if that data is slightly out of date.

From the user's perspective, the system is always on. Requests always get answers.

### Partition Tolerance

A network partition occurs when the communication link between nodes in a distributed system breaks. Node A can't reach node B. They're both running and healthy, but they can't talk to each other.

Partition Tolerance means the system continues to operate despite network partitions. If two nodes can't communicate, the system keeps working rather than shutting down entirely.

This is the property that makes CAP interesting. Network partitions aren't theoretical. They happen in production systems regularly. Network cables fail. Routers drop packets. Data centers lose connectivity. Cloud providers have outages that isolate regions from each other. Any system running across multiple machines must deal with the reality that those machines will sometimes lose the ability to communicate.

---

## Why You Can't Have All Three

Here's the scenario that proves the theorem.

You have a distributed database with two nodes: Node A and Node B. They replicate data between each other. A network partition occurs. Node A and Node B can no longer communicate.

A write comes in to Node A. Node A processes the write and stores the new value. Node B still has the old value. They're now out of sync and they can't communicate to fix it.

A read comes in to Node B.

**If you choose Consistency:** Node B knows it can't reach Node A. It knows its data might be stale. To guarantee that every read returns the most recent write, Node B must refuse to respond until it can sync with Node A. It returns an error. The system is consistent but not available during the partition.

**If you choose Availability:** Node B responds with the data it has, even though that data might be stale. The system keeps responding but the data might not reflect the latest write to Node A. The system is available but not consistent during the partition.

There is no third option. During a network partition, a distributed system must choose between returning potentially stale data (available, not consistent) or refusing to respond (consistent, not available).

Partition Tolerance isn't really a choice in this sense. If your system runs across multiple machines connected by a network, partitions will happen. You can either handle them (be partition tolerant) or not handle them, which means your system simply stops working when a partition occurs.

Most real systems can't afford to simply stop working. Partition Tolerance is therefore effectively mandatory for any distributed system that needs to remain operational.

This is why the real choice in distributed systems is between Consistency and Availability during a partition, not a free choice among all three.

---

## The Real Choice: CP or AP

### CP Systems: Consistency over Availability

A CP system chooses to be consistent during a partition at the cost of availability. When nodes can't communicate, the system refuses to respond rather than risk returning stale data.

This is the right choice when correctness is more important than uptime. This is key for financial systems, inventory management, or any domain where serving wrong data is worse than serving no data.

Imagine a payment system. A customer initiates a transfer. The network partitions. The destination node can't reach the source node to confirm the transfer completed. A CP system refuses to show the updated balance until it can confirm the state across all nodes. The user might see a timeout or an error. But they won't see a balance that doesn't reflect reality.

The trade-off is real. During the partition, some requests fail. Users experience errors. But the data they eventually see is correct.

### AP Systems: Availability over Consistency

An AP system chooses to remain available during a partition at the cost of consistency. When nodes can't communicate, the system keeps responding with whatever data it has, even if that data is stale.

This is the right choice when uptime is more important than having the absolute latest data. This is important for social media feeds, product catalogues, user profile reads, or any domain where a slightly stale response is acceptable.

Imagine a social media platform. During a network partition, you view your feed. The AP system serves you content from the nearest available node even if that node hasn't received the last few minutes of posts from across the network. You might miss three posts temporarily. When the partition heals and nodes resynchronize, your feed catches up. No data is lost. You just saw slightly stale data for a short window.

The trade-off is also real. Different users might see different states of the data at the same time. Data written during a partition might create conflicts that need to be resolved when the partition heals. The system must have a strategy for handling these conflicts.

#### Systems that lean AP:

Cassandra, CouchDB, and DynamoDB are examples of systems that lean toward availability. They prioritize uptime and use eventual consistency: a guarantee that if no new writes occur, all nodes will eventually converge to the same value. Eventually is the key word. Not immediately. Not during the partition. But eventually.

Amazon DynamoDB's design philosophy explicitly acknowledges this trade-off. Amazon's shopping cart is a famous example: it's better to let a user add items to their cart (even if the cart state is slightly inconsistent across nodes) than to refuse the add operation because nodes can't reach each other.

---

## CA Systems: The Special Case

You might wonder about a system that chooses Consistency and Availability but not Partition Tolerance. Such a system would need to guarantee that it never experiences a network partition.

The only way to guarantee no network partitions is to run on a single machine. A single machine can't partition from itself. Traditional relational databases running on a single server, like a standalone PostgreSQL instance, are effectively CA. They're consistent (all reads return the latest data) and available (they keep responding) because there are no network partitions to worry about.

But a single-machine database isn't a distributed system. It can't scale horizontally. It has a single point of failure. The moment you replicate that database across multiple machines, you have a distributed system and network partitions become a reality you must handle.

This is why the CAP Theorem is specifically about distributed systems. The CA category is largely theoretical for systems that need to scale beyond a single machine.

---

## Real Systems and Their Choices

Real distributed systems don't simply label themselves CP or AP and call it done. The reality is more nuanced. Most systems make different choices for different operations, configure their behavior through tunable consistency levels, and optimize for specific use cases.

### Apache Cassandra

Cassandra is fundamentally AP. It prioritizes availability and uses eventual consistency as its default model. But Cassandra gives developers control through consistency levels on every read and write operation.

A write with consistency level ALL requires all replicas to acknowledge the write before it succeeds. This is strong consistency at the cost of availability. A write fails if any replica is unreachable.

A write with consistency level ONE requires only one replica to acknowledge. Highly available, eventually consistent.

A write with consistency level QUORUM requires a majority of replicas to acknowledge. This is the most common production choice: a balance between consistency and availability.

Cassandra's design acknowledges that different operations in the same system may have different consistency requirements. A financial transaction might use QUORUM. An analytics event write might use ONE.

### Amazon DynamoDB

DynamoDB offers both eventually consistent reads (AP) and strongly consistent reads (CP) on every read operation. The developer chooses per request.

Eventually consistent reads are cheaper and faster. Strongly consistent reads cost more and take longer but guarantee the latest data.

### Google Spanner

Spanner is an interesting case. Google built it to provide strong consistency across a globally distributed system. It achieves this through a combination of atomic clocks, GPS receivers, and a carefully designed protocol called TrueTime.

Spanner essentially narrows the window of uncertainty about the ordering of events across data centers to the point where strong consistency becomes practical even across continents.

Spanner challenges the conventional wisdom that CP systems must sacrifice significant availability. But it does so through extraordinary infrastructure investment rather than by violating the CAP theorem.

### ZooKeeper

ZooKeeper is explicitly CP. It's designed for coordination: distributed locks, leader election, and configuration management. In these use cases, returning stale data would be actively harmful. If two nodes both believe they hold a distributed lock because they read stale state, you have a serious problem. ZooKeeper accepts reduced availability to guarantee that every read reflects the latest committed write.

---

## The Nuance CAP Doesn't Capture

The CAP Theorem is a useful mental model, but it has known limitations that the distributed systems community has spent years articulating.

### Partitions are Rare. Latency is Constant.

Network partitions happen, but they're relatively infrequent in well-operated systems. What happens all the time, in every request, in every system, is latency: the time it takes for data to replicate from one node to another. The time it takes for a consensus protocol to complete. The time it takes to confirm that all replicas have received a write.

CAP treats the choice between consistency and availability as a binary decision made only during a partition. But in practice, engineers are making trade-offs between consistency and latency on every operation, partition or not.

### Not All Inconsistency is the Same.

CAP treats consistency as binary: either every read returns the most recent write or it doesn't. But there's a spectrum between strong consistency and complete chaos. Eventual consistency, monotonic read consistency, read-your-writes consistency, and causal consistency: these are all weaker than strong consistency but stronger than no consistency guarantee at all. The CAP model doesn't distinguish between them.

---

## How to Think About This When Designing Systems

When you're making architectural decisions about data storage in a distributed system, the CAP Theorem gives you a framework for asking the right questions rather than a formula that gives you the right answer.

### 1. Start with the failure mode that matters.

What happens if two nodes in your system disagree about the state of the data? Is it worse to show the user wrong data or to show them an error?

For a bank account balance, showing wrong data is far worse than showing an error. For a social media like count, being off by a few for a few seconds is completely acceptable.

### 2. Think about what "stale" means for your data.

How quickly does your data change? If you're storing product descriptions that change once a month, serving data that's five seconds old during a partition is completely harmless. If you're storing stock prices that change hundreds of times per second, five seconds of staleness is a significant problem.

### 3. Consider the frequency and duration of partitions in your environment.

If your system runs in a single data center on a reliable network, partitions are rare and brief. If your system spans multiple geographic regions, partitions are more frequent and potentially longer. The less reliable your network, the more important your partition strategy becomes.

### 4. Recognize that most systems need both, just for different operations.

A well-designed system often uses strong consistency for writes that must be correct (financial transactions, inventory deductions, or user authentication) and eventual consistency for reads where slight staleness is acceptable (feed generation, analytics, or non-critical reads). The choice isn't always system-wide. It can be operation-specific.

### 5. Accept that the trade-off is real and can't be engineered away.

There's no architectural trick that gives you strong consistency, perfect availability, and partition tolerance simultaneously. Engineers who believe they have found one have usually either not thought through the failure scenarios carefully or are operating in an environment where the constraints are gentler than they appear. The CAP Theorem is a mathematical proof. The constraints it describes are fundamental, not implementation details to be optimized away.

---

## Conclusion

The CAP Theorem states that a distributed system can guarantee at most two of three properties: Consistency, Availability, and Partition Tolerance. Because network partitions are an unavoidable reality in any system running across multiple machines, the practical choice is between Consistency and Availability during a partition.

CP systems choose correctness over uptime. During a partition, they refuse to respond rather than risk returning stale data. They're the right choice when serving wrong data causes serious harm.

AP systems choose uptime over correctness. During a partition, they keep responding with whatever data they have, accepting that some responses may be stale. They're the right choice when availability matters more than having the absolute latest data, and when temporary inconsistency can be resolved after the partition heals.

Most real distributed systems don't make a single system-wide choice. They offer tunable consistency levels, make different choices for different operations, and optimize for their specific use cases. Cassandra, DynamoDB, and Spanner all sit on different points of the spectrum and all made deliberate engineering decisions about where to be.

The value of understanding CAP isn't that it gives you the answer. It's that it gives you the right questions. What does consistency mean for this data? What happens if nodes disagree? What's the cost of an error versus the cost of stale data? What does my system need to do during a partition?

Answering those questions honestly, for your specific use case, is how you make the right architectural decision for the system you're actually building.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding the CAP Theorem: Consistency, Availability, and Partition Tolerance in System Design",
  "desc": "In 1999, Eric Brewer made a claim that would shape how distributed systems would be designed for decades. He proposed that any distributed data store can only guarantee two of three properties simulta",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/understanding-the-cap-theorem-consistency-availability-and-partition-tolerance-in-system-design.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
