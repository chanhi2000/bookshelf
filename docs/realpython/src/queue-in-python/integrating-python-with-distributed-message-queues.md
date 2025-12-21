---
lang: en-US
title: "Integrating Python With Distributed Message Queues"
description: "Article(s) > (7/7) Python Stacks, Queues, and Priority Queues in Practice"
category:
  - Python
  - Article(s)
tag:
  - blog
  - realpython.com
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > (7/7) Python Stacks, Queues, and Priority Queues in Practice"
    - property: og:description
      content: "Integrating Python With Distributed Message Queues"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/realpython.com/queue-in-python/integrating-python-with-distributed-message-queues.html
next: /realpython.com/queue-in-python/README.md#conclusion
date: 2022-06-29
isOriginal: false
author:
  - name: Bartosz Zaczyński
    url : https://realpython.com/team/bzaczynski/
cover: https://files.realpython.com/media/How-to-Implement-A-Queue-in-Python_Watermarked.993460fe2ffc.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python Stacks, Queues, and Priority Queues in Practice",
  "desc": "In this tutorial, you'll take a deep dive into the theory and practice of queues in programming. Along the way, you'll get to know the different types of queues, implement them, and then learn about the higher-level queues in Python's standard library. Be prepared to do a lot of coding.",
  "link": "/realpython.com/queue-in-python/README.md",
  "logo": "https://realpython.com/static/favicon.68cbf4197b0c.png",
  "background": "rgba(31,52,74,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Python Stacks, Queues, and Priority Queues in Practice"
  desc="In this tutorial, you'll take a deep dive into the theory and practice of queues in programming. Along the way, you'll get to know the different types of queues, implement them, and then learn about the higher-level queues in Python's standard library. Be prepared to do a lot of coding."
  url="https://realpython.com/queue-in-python#integrating-python-with-distributed-message-queues"
  logo="https://realpython.com/static/favicon.68cbf4197b0c.png"
  preview="https://files.realpython.com/media/How-to-Implement-A-Queue-in-Python_Watermarked.993460fe2ffc.jpg"/>


---

## Integrating Python With Distributed Message Queues

In distributed systems with a lot of moving parts, it’s often desirable to decouple your application components using an intermediate [message broker](https://en.wikipedia.org/wiki/Message_broker), which takes the burden of resilient message delivery between the producer and consumer services. It typically requires its own infrastructure, which is both an advantage and a disadvantage.

On the one hand, it’s yet another abstraction layer that adds complexity and needs maintenance, but when configured correctly, it can provide these benefits:

- **Loose Coupling:** You can modify or replace one component with another without affecting the rest of your system.
- **Flexibility:** You can alter your system’s business rules by changing the broker configuration and message delivery rules without writing code.
- **Scalability:** You can dynamically add more components of a given kind to handle the increased workload in a specific functional area.
- **Reliability:** Consumers may need to acknowledge a message before the broker removes it from a queue to ensure safe delivery. Running the broker in the cluster may provide additional fault tolerance.
- **Persistence:** The broker may keep some messages in the queue while the consumers are offline due to a failure.
- **Performance:** Using a dedicated infrastructure for the message broker offloads your application services.

There are many different types of message brokers and scenarios in which you can use them. In this section, you’ll get a taste of a few of them.

### RabbitMQ: `pika`

[RabbitMQ](https://rabbitmq.com/) is probably one of the most popular open source message brokers, which lets you route messages from producers to consumers in several ways. You can conveniently start a new RabbitMQ broker without installing it on your computer by running a temporary [Docker](https://realpython.com/docker-continuous-integration/) container:

```sh
$ docker run -it --rm --name rabbitmq -p 5672:5672 rabbitmq
```

Once it’s started, you can connect to it on your localhost and the default port 5672. The official documentation recommends using the [Pika](https://pypi.org/project/pika/) library for connecting to a RabbitMQ instance in Python. This is what a rudimentary producer can look like:

```py
# producer.py

import pika

QUEUE_NAME = "mailbox"

with pika.BlockingConnection() as connection:
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME)
    while True:
        message = input("Message: ")
        channel.basic_publish(
            exchange="",
            routing_key=QUEUE_NAME,
            body=message.encode("utf-8")
        )
```

You open a connection using the default parameters, which assume that RabbitMQ is already running on your local machine. Then, you create a new channel, which is a lightweight abstraction on top of a TCP connection. You can have multiple independent channels for separate transmissions. Before entering the loop, you make sure that a queue named `mailbox` exists in the broker. Finally, you keep publishing messages read from the user.

The consumer is only slightly longer, as it requires defining a [callback function](https://en.wikipedia.org/wiki/Callback_(computer_programming)) to process the messages:

```py
# consumer.py

import pika

QUEUE_NAME = "mailbox"

def callback(channel, method, properties, body):
    message = body.decode("utf-8")
    print(f"Got message: {message}")

with pika.BlockingConnection() as connection:
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME)
    channel.basic_consume(
        queue=QUEUE_NAME,
        auto_ack=True,
        on_message_callback=callback
    )
    channel.start_consuming()
```

Most of the boilerplate code looks similar to your producer. However, you don’t need to write an explicit loop because the consumer will listen for messages indefinitely.

Go ahead and start a few producers and consumers in separate terminal tabs. Notice what happens when the first consumer connects to RabbitMQ after the queue already has some unconsumed messages or if you have more than one consumer connected to the broker.

### Redis: `redis`

[Redis](https://redis.io/) is short for Remote Dictionary Server, but it’s really many things in disguise. It’s an in-memory key-value data store that usually works as an ultra-fast cache between a traditional [SQL](https://en.wikipedia.org/wiki/SQL) database and a server. At the same time, it can serve as a persistent [NoSQL](https://en.wikipedia.org/wiki/NoSQL) database and also a message broker in the [publish-subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) model. You can start a local Redis server with Docker:

```sh
$ docker run -it --rm --name redis -p 6379:6379 redis
```

When you do, you’ll be able to connect to a running container using the Redis command-line interface:

```sh
$ docker exec -it redis redis-cli
127.0.0.1:6379>
```

Take a look at the [list of commands](https://redis.io/commands/) in the official documentation and try them out while you’re connected to the Redis server. Alternatively, you can jump right into Python. The first library listed on the official Redis page is [`redis`](https://pypi.org/project/redis/), but it’s worth noting that you can choose from many alternatives, including asynchronous ones.

Writing a bare-bones publisher doesn’t take more than a couple of lines of Python code:

```py
# publisher.py

import redis

with redis.Redis() as client:
    while True:
        message = input("Message: ")
        client.publish("chatroom", message)
```

You connect to a local Redis server instance and immediately start publishing messages on the `chatroom` channel. You don’t have to create the channels, because Redis will do it for you. Subscribing to a channel requires one extra step, creating the `PubSub` object to call the `.subscribe()` method on:

```py
# subscriber.py

import redis

with redis.Redis() as client:
    pubsub = client.pubsub()
    pubsub.subscribe("chatroom")
    for message in pubsub.listen():
        if message["type"] == "message":
            body = message["data"].decode("utf-8")
            print(f"Got message: {body}")
```

Messages received by a subscriber are Python dictionaries with some metadata, which lets you decide how to deal with them. If you have multiple active subscribers listening on a channel, then all of them will receive the same message. On the other hand, messages aren’t persisted by default.

Check out [How to Use Redis With Python](https://realpython.com/python-redis/) to learn more.

### Apache Kafka: `kafka-python3`

[Kafka](https://kafka.apache.org/) is by far the most advanced and complicated of the three message brokers you’ll meet in this tutorial. It’s a distributed streaming platform used in real-time event-driven applications. Its main selling point is the ability to handle large volumes of data with almost no performance lag.

To run Kafka, you’ll need to set up a distributed cluster. You may use [Docker Compose](https://docs.docker.com/compose/) to start a multi-container Docker application in one go. For example, you can grab [Apache Kafka packaged by Bitnami](https://hub.docker.com/r/bitnami/kafka):

YAML

`# docker-compose.yml

version: "3"
services:
 zookeeper:
 image: 'bitnami/zookeeper:latest'
 ports:
 - '2181:2181'
 environment:
 - ALLOW_ANONYMOUS_LOGIN=yes
 kafka:
 image: 'bitnami/kafka:latest'
 ports:
 - '9092:9092'
 environment:
 - KAFKA_BROKER_ID=1
 - KAFKA_CFG_LISTENERS=PLAINTEXT://:9092
 - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://127.0.0.1:9092
 - KAFKA_CFG_ZOOKEEPER_CONNECT=zookeeper:2181
 - ALLOW_PLAINTEXT_LISTENER=yes
 depends_on:
 - zookeeper
```

When you save this configuration in a file named `docker-compose.yml`, then you can start the two services by running the command below:

```sh
$ docker-compose up
```

Sometimes, you may run into issues when the Kafka version doesn’t match the version of your client library. The Python library that seems to support a fairly recent Kafka is [`kafka-python3`](https://pypi.org/project/kafka-python3/), modeled on the Java client.

Your producer can send messages on a given topic like so:

```py
# producer.py

from kafka3 import KafkaProducer

producer = KafkaProducer(bootstrap_servers="localhost:9092")
while True:
    message = input("Message: ")
    producer.send(
        topic="datascience",
        value=message.encode("utf-8"),
    )
```

The `.send()` method is asynchronous because it returns a [future object](https://en.wikipedia.org/wiki/Futures_and_promises) that you can await by calling its blocking `.get()` method. On the consumer’s side, you’ll be able to read the sent messages by iterating over the consumer:

```py
# consumer.py

from kafka3 import KafkaConsumer

consumer = KafkaConsumer("datascience")
for record in consumer:
    message = record.value.decode("utf-8")
    print(f"Got message: {message}")
```

The consumer’s constructor takes one or more topics that it might be interested in.

Naturally, you barely scratched the surface with what’s possible with these powerful message brokers. Your goal in this section was to get a quick overview and a starting point in case you’d like to explore them on your own.
