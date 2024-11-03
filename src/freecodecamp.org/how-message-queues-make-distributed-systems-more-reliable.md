---
lang: en-US
title: "How Message Queues Help Make Distributed Systems More Reliable"
description: "Article(s) > How Message Queues Help Make Distributed Systems More Reliable"
icon: fa-brands fa-aws
category:
  - DevOps
  - AWS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - aws
  - amazon-web-services
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How Message Queues Help Make Distributed Systems More Reliable"
    - property: og:description
      content: "How Message Queues Help Make Distributed Systems More Reliable"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-message-queues-make-distributed-systems-more-reliable.html
prev: /devops/aws/articles/README.md
date: 2024-10-28
isOriginal: false
author: Anant Chowdhary
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1729895479626/5d476c5d-9749-4c2a-977b-bcdd8b2b8199.jpeg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "AWS > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/aws/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How Message Queues Help Make Distributed Systems More Reliable"
  desc="Reliable systems consistently perform their intended functions under various conditions while minimizing downtime and failures. As internet users, we tend to take for granted that the systems that we use daily will operate reliably. In this article, ..."
  url="https://freecodecamp.org/news/how-message-queues-make-distributed-systems-more-reliable"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1729895479626/5d476c5d-9749-4c2a-977b-bcdd8b2b8199.jpeg"/>

Reliable systems consistently perform their intended functions under various conditions while minimizing downtime and failures.

As internet users, we tend to take for granted that the systems that we use daily will operate reliably. In this article, we’ll explore how message queues enhance flexibility and fault tolerance. We’ll also discuss some challenges that we may face while using them.

After reading through, you’ll know how to implement reliable systems and what key performance factors to keep in mind.

::: note Prerequisites

Before diving into this article, you should have a foundational understanding of cloud computing. Here are the key concepts:

1. Basic principles of Cloud Computing
2. Availability in Distributed Systems
3. An understanding of the CAP theorem.

:::

---

## What Does Reliability Mean in the Context of Distributed Systems?

Reliability, according to the OED, is “the quality of being trustworthy or of performing consistently well”. We can translate this definition to the following in the context of distributed systems:

1. The ability of a technological system, device, or component to consistently and dependably perform its intended functions under various conditions over time. For instance, in the context of online banking, reliability refers to the consistent and secure processing of transactions. Users expect to complete transfers and access their accounts without errors or outages.
2. The system being resilient to unexpected or erroneous interactions by users / other systems interacting with it. For instance, if a user tries to access a deleted file on a cloud storage system, the system can gracefully notify them and suggest alternatives, rather than crashing.
3. The system performs satisfactorily under its expected conditions of operation, as well as in the case of unexpected load and/or disruptions. An example of this is a video streaming service during a major sporting event. The system is designed to perform well under normal traffic but must also handle sudden spikes in users when a popular game starts

This is quite a general view of what reliability is, and the definition changes with time, as systems change with changing technology.

---

## What Makes Software Reliable?

There are various key components that are used industry wide to make distributed software reliable as used across large scale systems.

### Data Replication

Data replication is a fundamental concept in system design where data is intentionally duplicated and stored in multiple locations or servers.

This redundancy serves several critical purposes, including enhancing data availability, improving fault tolerance, and enabling load balancing.

By replicating data across different nodes or data centers, we may be able to ensure that, in the event of a hardware failure or network issue, the data remains accessible. This reduces downtime and enhances system reliability.

It's essential to implement replication strategies carefully, considering factors like consistency, synchronization, and conflict resolution to maintain data integrity and reliability in distributed systems.

Let’s look at a concrete example. With a primary-secondary database model such as one used with e-commerce websites, we may have the following:

1. Replication: The primary database handles all the write operations, whereas the secondary database(s) handles all the reads. This ensures that reads are spread out across multiple databases, enhancing performance and lowering the probability of a crash.
2. Consistency: The system may use eventual consistency to maintain integrity, ensuring that all replicas eventually reflect the same data. But during high-traffic periods, the website may temporarily allow for slight inconsistencies, such as showing outdated inventory levels.
3. Conflict Resolution: If two users attempt to buy a single available item at the same time, a conflict resolution strategy may be used. For instance, the system could use timestamps to determine the customer who gets assigned the product, and this may dictate database updates eventually.

### Load Distribution Across Machines

Load distribution involves distributing computational tasks and network traffic across multiple servers or resources to optimize performance and ensure system scalability.

By intelligently spreading workloads, load distribution prevents any single server from becoming overwhelmed, reducing the risk of bottlenecks and downtime.

Some very commonly used load distribution mechanisms are:

1. Using Load Balancers: A load balancer can evenly distribute incoming traffic across multiple servers, preventing any single server from becoming a bottleneck.
2. Dynamic Scaling: Dynamic or auto-scaling can be used to automatically adjust the number of active servers based on current demand, adding more resources during peak times and scaling down during low traffic.
3. Caching: Caching layers can be used to store frequently accessed data, reducing the load on backend servers by serving requests directly from the cache.

### Capacity Planning

Capacity planning entails analyzing factors such as expected user growth, data storage requirements, and processing capabilities to ensure that the system can handle increased loads without performance degradation or downtime.

By accurately forecasting resource needs and scaling infrastructure accordingly, such planning helps optimize costs, maintain reliability, and provide a seamless user experience. Being proactive can help ensure a system is well-prepared to adapt to changing requirements and remains robust and efficient throughout its lifecycle.

A lot of modern systems can scale automatically with projected loads. When traffic or processing requirements increase, such auto scaling automatically provisions additional resources to handle the load. Conversely, when demand decreases, it scales down resources to optimize cost efficiency.

### Metrics and Automated Alerting

Metrics involve collecting and analyzing data points that provide insights into various aspects of system behavior, such as resource utilization, response times, error rates, and more.

Automated alerting complements metrics by enabling proactive monitoring. This involves setting predefined thresholds or conditions based on metrics. When a metric crosses or exceeds these thresholds, automated alerts get triggered. These alerts can notify system administrators or operators, allowing them to take immediate action to address potential issues before they impact the system or users.

When used together, metrics and automated alerting create a robust monitoring and troubleshooting system, helping ensure that anomalies or problems are quickly detected and resolved.

Now that you know a bit about what reliability means in the context of Distributed Systems, we can move on to Message Queues.

---

## What is a Message Queue?

A message queue is a communication mechanism used in distributed systems to enable asynchronous communication between different components or services. It acts as an intermediary that allows one component to send a message to another without the need for direct, synchronous communication.

![Multiple producers adding messages to a message queue that in turn are consumed by a consumer.](https://cdn.hashnode.com/res/hashnode/image/upload/v1701696280571/8697cb07-c765-4f9e-b709-a7a03adf3e11.png?auto=compress,format&format=webp)

Above, you can see that there are multiple nodes (called Producers) that create messages that are sent to a message queue. These messages are processed by a node called the Consumer node, which may perform a series of actions (for instance database reads, or writes) as a part of each message being processed.

Now let’s look at an actual example where a message queue may be useful. Let’s assume we have an e-commerce website that allows millions of orders to be processed.

Processing an order may take place in the following steps:

1. A user creates an order. This sets off a request to a web server, that in turn creates a message that is placed in the orders queue.
2. A consumer reads the message, and in turn calls different services while processing the message (for instance the inventory checks, the payment service, the shipping service)
3. Once all processing steps have completed, the consumer removes the message from the queue.

Note that in case there are parts of the system that fail, the message can be left in the queue to be re-processed.

Even in cases where there is a total outage on the processing side of things, messages can simply pile up in the queue and be consumed once services are functional again. This is an example of a queue being useful in multiple failure scenarios.

Let’s look at some code for this scenario using AWS SQS, which is a popular message queue service that allows users to create queues, send messages to the queue, and also consume messages from queues for processing.

The below example uses [<FontIcon icon="fa-brands fa-aws"/>Boto3](http://boto3.amazonaws.com) which is a Python Client for AWS SQS.

First, we’ll place an order, assuming we already have an SQS queue called OrderQueue in place.

```py
import boto3
import json

# Create an SQS client
sqs = boto3.client('sqs')

# Let's assume the queue is called OrderQueue
# This is the queue in which orders are placed
queue_url = 'https://sqs.us-east-1.amazonaws.com/2233334/OrderQueue'

# Function to send an order message
# This places an order in the queue, which can at any time be
# picked up by a consumer and then processed
def send_order(order_details):
    message_body = json.dumps(order_details)
    response = sqs.send_message(
        QueueUrl=queue_url,
        MessageBody=message_body
    )
    print(f'Order sent with ID: {response["MessageId"]}')

# Using the queue to place an order
# Defining a sample order

order = {
    'order_id': '12345',
    'customer_id': '67890',
    'items': [
        {'product_id': 'abc123', 'quantity': 2},
        {'product_id': 'xyz456', 'quantity': 1}
    ],
    'total_price': 59.99
}

# Sending the order to the queue which is expected to be picked up 
# by a consumer and processed eventually.
send_order(order)
```

Then once the order has been placed, here’s some code that illustrates how it’ll be picked up for processing:

```py
import boto3
import json

# Create an SQS client
sqs = boto3.client('sqs')

# Processing orders from the same queue defined above
queue_url = 'https://sqs.us-east-1.amazonaws.com/2233334/OrderQueue'

# Function to receive and process orders
# Picking up a maximum of 10 messages at a time to process
def receive_orders():
    response = sqs.receive_message(
        QueueUrl=queue_url,
        MaxNumberOfMessages=10,  # Up to 10 messages
        WaitTimeSeconds=10
    )

    messages = response.get('Messages', [])

    for message in messages:
        order_details = json.loads(message['Body'])
        print(f'Processing order: {order_details}')

        # Processing the order with details such as 
        # processing payments, updating the inventory levels,
        # processing shipping etc.

        # Delete the message after processing
        # This is important since we don't want an
        # order to be processed multiple times.
        sqs.delete_message(
            QueueUrl=queue_url,
            ReceiptHandle=message['ReceiptHandle']
        )

# Receive a batch of orders
receive_orders()
```

### What is an Intermediary in a Distributed System?

In the context of what we’re discussing here, a message queue is an intermediary. Quoting Amazon AWS’ definition of a message queue:

::: info Amazon Simple Queue Service (Amazon SQS)

> “[Amazon Simple Queue Service (Amazon SQS)](https://aws.amazon.com/sqs/) lets you send, store, and receive messages between software components at any volume, without losing messages or requiring other services to be available.”

:::

This is a wonderfully succinct and accurate description of why a message queue (an intermediary) is important.

In a message queue, messages are placed in a queue data structure, which you can think of as a temporary storage area. The producer places messages in the queue, and the consumer retrieves and processes them at its own pace. This decoupling of producers and consumers allows for greater flexibility, scalability, and fault tolerance in distributed systems.

---

## How Message Queues Help Make Distributed Systems More Reliable

Now let's discuss how Message Queues help make Distributed Systems more reliable.

### 1. Message Queues Provide Flexibility

Message queues allow for [<FontIcon icon="fa-brands fa-wikipedia-w"/>**asynchronous communication**](https://en.wikipedia.org/wiki/Asynchrony_(computer_programming)) between components. This means that producers can send messages to the queue without waiting for immediate processing by consumers. This allows components to work independently and at their own pace, providing flexibility in terms of processing times. So this is a great way to make designs flexible, and as self contained as possible.

### 2. Message Queues Make Systems Scalable

Message queues are often the bread and butter of scalable distributed systems for the following reasons:

1. Multiple producers can add messages to a message queue. This raises the ceiling and allows us to easily horizontally scale applications.
2. Multiple consumers can read from a message queue. This again allows us to easily scale throughput if needed in a lot of scenarios.

### 3. Message Queues Make Systems Fault Tolerant

What happens if a distributed system is overwhelmed? We sometimes need to have the ability to *cut the cord* in order to get the system back to a working state. We’d ideally want the ability to process requests that weren’t processed when the system was down.

This is exactly what a message queue can help us with. We may have hundreds of thousands of requests that weren’t processed, but are still in the queue. These can be processed once our system is back online.

---

## Challenges with Message Queues

As with life, using message queues in distributed systems isn’t a silver bullet to scaling problems.

Here are some situations where message queues may be useful:

1. Asynchronous Processing: Messages queues are generally an excellent choice in infrastructure wherever asynchronous processing is required. In workflows such as sending confirmation emails or generating reports after an order is placed, message queues can decouple these tasks from the primary application flow.
2. Load Balancing: As we saw in our example for message queues, in scenarios where traffic spikes occur, message queues can buffer incoming requests, allowing multiple consumers to process messages concurrently. This helps distribute the load evenly across available resources.
3. Fault Tolerance: In systems where reliability is crucial, message queues provide a mechanism for handling failures. If a service is temporarily down, messages can be retained in the queue until the service is available again, ensuring that no data is lost unless intended.

Here are a some situations where message queues may not be useful:

1. Message queues can be great in scenarios where ordering of messages does not matter. But in situations where order does matter, they can sometimes be slow and more expensive to use.
2. Designing systems with queues that have multiple consumers isn’t trivial. What happens if a message is processed twice? Is [<FontIcon icon="fa-brands fa-wikipedia-w"/>**idempotency**](https://en.wikipedia.org/wiki/Idempotence) a requirement? Or does it break our use case? These complexities can often lead us to situations where message queues may not be the best solution.

---

## Summary

In this article, you learned about reliability in distributed systems, and how message queues can help make such systems more reliable. Here’s a summary of the key takeaways:

1. Reliability is central to distributed systems and there are a few common ways this is handled across the tech industry. Data replication, load distribution, and capacity planning are some ways that can improve the reliability of a system.
2. Message Queues are intermediaries that can store messages from producers. They can be picked up by consumers at a rate that's generally independent of the rate of production.
3. Queues are flexible, allowing us to immediately stem the flow of unwanted event processing in case of an unforeseen event.
4. Despite the versatility of message queues, they're not a panacea for reliability issues. There are often multiple considerations to be kept in mind while processing messages in a message queue.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How Message Queues Help Make Distributed Systems More Reliable",
  "desc": "Reliable systems consistently perform their intended functions under various conditions while minimizing downtime and failures. As internet users, we tend to take for granted that the systems that we use daily will operate reliably. In this article, ...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-message-queues-make-distributed-systems-more-reliable.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
