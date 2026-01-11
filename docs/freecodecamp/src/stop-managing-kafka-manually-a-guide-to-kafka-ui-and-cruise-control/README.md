---
lang: en-US
title: "Why You Should Stop Managing Kafka Manually – A Guide to Kafka UI and Cruise Control"
description: "Article(s) > Why You Should Stop Managing Kafka Manually – A Guide to Kafka UI and Cruise Control"
icon: fa-brands fa-docker
category:
  - DevOps
  - Docker
  - Java
  - Kafka
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - devops
  - docker
  - java
  - kafka
  - apachekafka
  - apache-kafka
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Why You Should Stop Managing Kafka Manually – A Guide to Kafka UI and Cruise Control"
    - property: og:description
      content: "Why You Should Stop Managing Kafka Manually – A Guide to Kafka UI and Cruise Control"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/stop-managing-kafka-manually-a-guide-to-kafka-ui-and-cruise-control/
prev: /devops/docker/articles/README.md
date: 2026-01-15
isOriginal: false
author:
  - name: Ramesh Sinha
    url : https://freecodecamp.org/news/author/justramesh2000/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1768353949324/18ce4a43-fb21-4e9b-9285-7c4db7b7ae2e.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Kafka > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-kafka/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Why You Should Stop Managing Kafka Manually – A Guide to Kafka UI and Cruise Control"
  desc="Over 80% of Fortune 100 companies use Apache Kafka. That's not surprising, as Kafka has revolutionized how we build real-time data pipelines and streaming applications. If you're working in software engineering today, chances are you've encountered K..."
  url="https://freecodecamp.org/news/stop-managing-kafka-manually-a-guide-to-kafka-ui-and-cruise-control"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1768353949324/18ce4a43-fb21-4e9b-9285-7c4db7b7ae2e.png"/>

Over 80% of Fortune 100 companies use Apache Kafka. That's not surprising, as Kafka has revolutionized how we build real-time data pipelines and streaming applications. If you're working in software engineering today, chances are you've encountered Kafka in some capacity.

But here's the thing: while Kafka itself is incredibly powerful, managing Kafka clusters is notoriously challenging. This isn't a flaw in Kafka – it's just the reality of distributed systems. The bigger your cluster grows, the more complex operations become.

The most painful aspect? Manual cluster management. It's tedious, error-prone, and doesn't scale. What starts as simple topic creation with a few brokers turns into hours of carefully orchestrating partition reassignments across dozens of machines. One typo in a JSON file at 3 AM can take down production.

Sound familiar? You're not alone.

In this guide, you'll learn how two tools can transform Kafka operations from a manual slog into a manageable process:

- **Kafka UI**: A modern web interface that replaces cryptic CLI commands with visual cluster management
- **Cruise Control**: LinkedIn's automation engine that handles cluster balancing and self-healing

We'll start by experiencing the pain of manual management firsthand, then see how these tools solve real-world operational challenges. You'll set up everything locally with `Docker` and by the end you’ll know exactly how to manage Kafka clusters without the headache.

---

## The Problem: Manual Kafka Management

Let’s dive right in. First, I'm going to show you what managing a Kafka cluster looks like without any tools – just you, the command line, and dozens of manual operations.

You’ll spin up a small cluster locally, create some topics, and simulate the kind of growth you'd see in a real production environment. By the end of this section, you'll understand exactly why teams spend thousands of engineering hours just keeping Kafka clusters running smoothly.

Fair warning: this is going to feel tedious but it’s ok – *that’s the point*.

::: note Prerequisites

Before we dive in, make sure you have:

1. Docker Desktop installed and running
    - Mac and Windows users: [<VPIcon icon="fa-brands fa-docker"/>https://docker.com/products/docker-desktop/](https://docker.com/products/docker-desktop/)
    - Linux users can install Docker Engine via their package manager
2. **Basic Kafka knowledge.** You should understand:
    - **Topics**: Categories for organizing messages
    - **Partitions**: How topics are divided for parallelism
    - **Brokers**: The Kafka servers that store data
    - **Producers and Consumers**: Applications that write to and read from Kafka
    - **KRaft**: Kafka consensus based discovery?

If these terms are new to you, [**here’s a great handbook about them**](/freecodecamp.org/apache-kafka-handbook/README). I’d also recommend reading [<VPIcon icon="iconfont icon-apachekafka"/>Kafka's Introduction](https://kafka.apache.org/intro) first.

3. **System Requirements**
    - At least 8GB Ram
    - 10GB Free Disk space
4. Some basic understanding of **containers** is good to have:
    - Docker
    - Images
    - Volumes
    - Networks

:::

---

## What We’ll Cover:

- [Setting Up Our Unmanaged Cluster](#heading-setting-up-our-unmanaged-cluster)
- [Starting the Cluster & Verification](#heading-starting-the-cluster-amp-verification)
- [Creating Topics: The Manual Way](#heading-creating-topics-the-manual-way)
- [Kafka UI](#heading-kafka-ui)
- [Cruise Control](#heading-cruise-control)

---

## Setting Up Our Unmanaged Cluster

Let’s go ahead and build the cluster so that we can see the problems firsthand. We’ll use Docker to spin up three Kafka brokers running in `KRaft` mode (the modern, ZooKeeper-free approach).

Start by creating a file called <VPIcon icon="iconfont icon-yaml"/>`docker-compose-basic.yml`:

```yaml :collapsed-lines title="docker-compose-basic.yml"
version: '3.8'

services:
  kafka-1:
    image: confluentinc/cp-kafka:7.6.0
    container_name: kafka-1
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka-1:29093,2@kafka-2:29093,3@kafka-3:29093
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:29092,CONTROLLER://0.0.0.0:29093,PLAINTEXT_HOST://0.0.0.0:9092
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-1:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
      KAFKA_LOG_DIRS: /var/lib/kafka/data
    volumes:
      - kafka-1-data:/var/lib/kafka/data

  kafka-2:
    image: confluentinc/cp-kafka:7.6.0
    container_name: kafka-2
    ports:
      - "9093:9093"
    environment:
      KAFKA_NODE_ID: 2
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka-1:29093,2@kafka-2:29093,3@kafka-3:29093
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:29092,CONTROLLER://0.0.0.0:29093,PLAINTEXT_HOST://0.0.0.0:9093
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-2:29092,PLAINTEXT_HOST://localhost:9093
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
      KAFKA_LOG_DIRS: /var/lib/kafka/data
    volumes:
      - kafka-2-data:/var/lib/kafka/data

  kafka-3:
    image: confluentinc/cp-kafka:7.6.0
    container_name: kafka-3
    ports:
      - "9094:9094"
    environment:
      KAFKA_NODE_ID: 3
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka-1:29093,2@kafka-2:29093,3@kafka-3:29093
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:29092,CONTROLLER://0.0.0.0:29093,PLAINTEXT_HOST://0.0.0.0:9094
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-3:29092,PLAINTEXT_HOST://localhost:9094
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
      KAFKA_LOG_DIRS: /var/lib/kafka/data
    volumes:
      - kafka-3-data:/var/lib/kafka/data

volumes:
  kafka-1-data:
  kafka-2-data:
  kafka-3-data:
```

In the above configuration file, we’re creating three Kafka brokers (`kafka-1, kafka-2, kafka-3`). Each one uses the `confluentinc/cp-kafka:7.6.0` image and has its port opened (`9092, 9093, 9094`).

The environment variables are:

- **KAFKA_NODE_ID**: A unique identifier for each broker (1,2,3). No two brokers can have the same ID.
- **KAFKA_PROCESS_ROLES: broker, controller**: This tells Kafka to run in `KRaft` mode (without ZooKeeper). Each broker acts as both a data broker and a controller for cluster coordination.
- **KAFKA_CONTROLLER_QUORUM_VOTERS**: The membership list that tells each broker how to find the others. All three brokers must have the identical list: `1@kafka-1:29093,2@kafka-2:29093,3@kafka-3:29093`. This is how they discover each other and elect a leader.
- **CLUSTER_ID**: A unique identifier for the entire cluster. All brokers must use the **exact same value** or they won't recognize each other as part of the same cluster. The actual value (`MkU3OEVBNTcwNTJENDM2Qk`) doesn't matter as long as long as it is consistent across brokers. One important thing to note is that CLUSTER_ID must be a valid `base64-encoded UUID` per Kafka’s requirement.
- **KAFKA_LISTENERS** - Defines which network interfaces and ports Kafka listens on. We have three listeners:
  - **PLAINTEXT://0.0.0.0:29092**: For inter-broker communication (brokers talking to each other)
  - **CONTROLLER://0.0.0.0:29093**: For controller communication in `KRaft` mode
  - **PLAINTEXT_HOST://0.0.0.0:9092** (varies per broker): For external connections from your machine
- **KAFKA_ADVERTISED_LISTENERS**: Tells clients (producers/consumers) how to connect to this broker. This is what gets returned when a client asks "`where should I connect?`" The PLAINTEXT_HOST://localhost:9092 part is what allows you to connect from your Mac.

Note: **Listener configuration is critical.** Incorrect settings will prevent clients from connecting even when brokers are running. These settings work for local Docker environments where Docker's internal DNS resolves broker names (`kafka-1, kafka-2, kafka-3`). For production, replace hostnames with actual IP addresses or FQDNs - (Fully Qualified Domain Name):

- **KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 2**: How many copies of consumer offset data to keep. We use 2 instead of 3 because with only three brokers, this prevents issues during rolling restarts. In production with more brokers, you'd use 3 or more.
- **The Volumes**: `kafka-x-data:/var/lib/kafka/data` creates persistent storage for each broker’s data. Without volumes you will lose your topics and messages if you stop or restart your containers. Volumes are assigned to each broker so they don’t accidentally share data.

Note: For a restart from scratch you need to delete the volumes using the following command. The -v flag removes volumes. Without it, old data persists even after down.

```sh
docker compose -f docker-compose-basic.yml down -v
```

If you're using the legacy `docker-compose` tool (V1), replace `docker compose` with `docker-compose` in all commands throughout this tutorial.

### Ports

Three ports are used for any given broker. Their purposes are:

| Port | Purpose |
| --- | --- |
| **9092** | external connections (producers, consumers from you Mac) |
| **29092** | Internal broker-to-broker communication |
| **29093** | Cluster coordination via KRaft |

---

## Starting the Cluster & Verification

Now that we have the basic docker configuration for Kafka, let’s run it and verify the results.

Run the following command in the same directory where you saved <VPIcon icon="iconfont icon-yaml"/>`docker-compose-basic.yml`:

```sh
docker compose -f docker-compose-basic.yml up -d
```

The `-d` flag runs the containers in detached mode (in the background), so you get your terminal back.

You should see output like this:

![Docker compose command result](https://cdn.hashnode.com/res/hashnode/image/upload/v1767554351786/4500c108-e9b6-403f-98cf-15198b3a9831.png)

Using the following command, check if the containers running Kafka brokers are up:

```sh
docker ps
```

You should see three Kafka containers (kafka-1, kafka-2, kafka-3) with status “`Up`” – something like this:

![Running Kafka Containers](https://cdn.hashnode.com/res/hashnode/image/upload/v1767554452185/4e605547-8153-4a85-9903-e3b1132889a8.png)

Run the following command to verify that all three brokers are registered in the cluster:

```sh
docker exec -it kafka-1 kafka-broker-api-versions --bootstrap-server kafka-1:29092,kafka-2:29092,kafka-3:29092
```

You should see API version information for all three brokers (IDs 1, 2, 3) without any connection errors.

Note that we’re using `kafka-1:29092,kafka-2:29092,kafka-3:29092` here (the internal Docker addresses) instead of localhost:9092 because this command runs inside the `kafka-1` container by virtue of `docker exec -it kafka-1`, where `localhost` only refers to that specific container.

If any of the above verification returns errors or doesn’t show expected result as shown in screenshots, you can run the following command to see logs and debug:

```sh
docker logs kafka-1
```

---

## Creating Topics: The Manual Way

Now that we have a cluster running, let’s simulate a real production use case where different teams need Kafka topics for their applications – payments, logs, events, metrics notifications, you name it.

Let’s start by creating a topic for logs. The command to do this is:

```sh
docker exec -it kafka-1 kafka-topics \
--create \
--topic freecodecamp-logs \
--bootstrap-server kafka-1:29092,kafka-2:29092,kafka-3:29092 \
--partitions 12 \
--replication-factor 2 \
--config retention.ms=604800000 \
--config compression.type=snappy
```

You’ll need to specify some command parameters, which are:

1. The exact broker address `kafka-1:29092,kafka-2:29092,kafka-3:29092` (or the IP address of your servers in production)
2. The number of partitions – I have used `12` in the above command. Creating too few partitions creates bottlenecks, while creating too many adds overhead.
3. Retention policy – I have used 7 days (that is, 604800000 milliseconds)
4. Compression type

Manually managing these parameters and running the command a handful of times is okay – but what if you have to run this for every team in your enterprise? Each team will have different requirements. The grind of copy, paste, adjust becomes painful if you have 100+ topics and multiple clusters (dev, staging, prod).

Feel the pain yet? Well, let’s just go on for a minute and we’ll address this issue shortly. For now, if you run the above command you should see the “**Created topic**” message:

![Create Kafka Topic result](https://cdn.hashnode.com/res/hashnode/image/upload/v1767554860337/81937532-b88b-4d9a-bfca-f2f9b0433e4d.png)

Note: We’re using `kafka-1:29092,kafka-2:29092,kafka-3:29092` to reach Kafka brokers because we’re running the command inside of broker kafka-1 by running using `docker exec`.

Let's keep going. We’ll create more topics using the same command by changing the topic name and partitions. Copy, paste, update, and run the above commands a couple times. On my machine, I ran it 3 more times like below (you can choose to run couple more times with changed values – it won’t matter because concrete values are not important for this tutorial):

```sh
docker exec -it kafka-1 kafka-topics \
--create \
--topic freecodecamp-views \    
--bootstrap-server kafka-1:29092,kafka-2:29092,kafka-3:29092 \
--partitions 20 \
--replication-factor 2 \
--config retention.ms=604800000 \
--config compression.type=snappy


docker exec -it kafka-1 kafka-topics \
--create \
--topic freecodecamp-analytics \
--bootstrap-server kafka-1:29092,kafka-2:29092,kafka-3:29092 \
--partitions 3 \ 
--replication-factor 2 \
--config retention.ms=604800000 \
--config compression.type=snappy


docker exec -it kafka-1 kafka-topics \
--create \
--topic freecodecamp-articles \ 
--bootstrap-server kafka-1:29092,kafka-2:29092,kafka-3:29092 \
--partitions 5 \ 
--replication-factor 2 \
--config retention.ms=604800000 \
--config compression.type=snappy
```

After creating the topics, let’s see all the ones you have now by running the following command:

```sh
docker exec -it kafka-1 kafka-topics \
--list \
--bootstrap-server kafka-1:29092,kafka-2:29092,kafka-3:29092
```

You should see a list of topics like this:

![Kafka list of Topics](https://cdn.hashnode.com/res/hashnode/image/upload/v1767555021681/451f69bc-5f91-432a-9c74-ca56b79aa179.png)

Notice that you just get the list of topics but no meaningful information, like:

- How many partitions does each have?
- Which brokers are hosting them?
- Are they evenly distributed?
- What are their configurations?

### Partition Information

Let’s try to get information about our partitions. For this tutorial, I have created 4 topics and a total of 40 partitions spread across three brokers. I want to see which broker has the most partitions.

In a well-managed cluster, you’d want them roughly evenly distributed. But how can we check that?

Maybe the describe command shown below can help. Let’s run it:

```sh
docker exec -it kafka-1 kafka-topics \
--describe \
--bootstrap-server kafka-1:29092,kafka-2:29092,kafka-3:29092
```

It will return a wall of text, something like this:

![Kafka describe Topics](https://cdn.hashnode.com/res/hashnode/image/upload/v1767555186583/e50948e9-48f8-4431-8008-38f24da98373.png)

So, we have partition information but:

- No summary or aggregation
- No visual representation
- It’s difficult to scan and compare
- It gets exponentially worse with more topics

### Counting Leaders

The Leader field in the above screenshot tells you which broker is the leader for each partition. Leaders handle all read and write requests, so you want them evenly distributed or else some brokers will become overloaded.

Let’s try to count how many partitions each broker leads. To do that, run the following command:

```sh
docker exec -it kafka-1 kafka-topics \
--describe \
--bootstrap-server kafka-1:29092,kafka-2:29092,kafka-3:29092 | grep "Leader: 1" | wc -l
```

It will show something like this:

![Kafka Leader Count result](https://cdn.hashnode.com/res/hashnode/image/upload/v1767555304446/6a58be3a-e21f-4209-8165-1544c5bc6c20.png)

Per my topic creation, `14` is the count of partitions where `broker 1 (Leader : 1)` is the leader. You might see a different number depending on how many topics and how many partitions you have created.

You can repeat this command to see the count of partitions led by other brokers. To do so, just change `Leader: 1` to `Leader: 2` or `Leader: 3.`. I get `14, 12, 14`:

![Kafka Leader Count for all Topics](https://cdn.hashnode.com/res/hashnode/image/upload/v1767555418151/8c66afe7-b5db-4106-800f-f6e7e8926ba2.png)

That’s somewhat balanced, but you had to run the command multiple times, parse using `grep` and `wc`, and this is just 3 brokers. What if you had 100+? Also, what if you have to get the replicas’ information?

I could go on and on with the data we need and the commands to get that information. But the point I’m trying to make here is that sooner or later this becomes impossible to manage. Your team is going to need an army, and to be honest there isn’t much value in doing all of this manually.

So far, you’ve seen only simple operational commands, but the problems don’t stop there. In a real production environment there are more complex and challenging operations like:

- **Consumer Lag Monitoring**: When consumers fall behind, you need to track which partitions are lagging, which consumer instances own them, and where the lag is growing or shrinking. With CLI tools, you get raw numbers but no trends or context.
- **Broker Failures**: When a broker fails, you need to identify under-replicated partitions, trigger leader elections, and create partition reassignment `JSON` files manually. One mistake in that JSON can cause data loss.
- **Cluster rebalancing**: You’ll see that when you add new brokers, they sit empty until you manually redistribute partitions. Similarly for removing brokers, you need to move all their partitions first. These operations require calculating optimal placement and creating complex reassignment plans.

If you’re still with me, you’re probably thinking that there has to be a better way. Fortunately, there is – actually, there are a couple complimentary ways and we are going to talk about those next.

---

## Kafka UI

Kafka UI is a modern, open-source web interface for managing Kafka clusters. It replaces the `command line chaos` we just experienced with a clean, visual dashboard.

Kafka UI provides the following features:

- `Visual cluster Overview`: see all brokers, topics, and partitions at a glance.
- `Topic management`: create, configure, and delete topics with a GUI
- `Consumer group monitoring`: track lags, offsets, and consumer health in real-time
- `Message browsing`: view actual messages in topics without command line tools

Without further ado, let’s set up Kafka UI.

### Setting Up Kafka UI

To setup up Kafka UI, let’s modify our existing <VPIcon icon="iconfont icon-yaml"/>`docker-compose-basic.yml` like this:

```yaml :collapsed-lines title="docker-compose-basic.yml"
version: '3.8'

services:
  kafka-1:
    image: confluentinc/cp-kafka:7.6.0
    container_name: kafka-1
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka-1:29093,2@kafka-2:29093,3@kafka-3:29093
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:29092,CONTROLLER://0.0.0.0:29093,PLAINTEXT_HOST://0.0.0.0:9092
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-1:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
      KAFKA_LOG_DIRS: /var/lib/kafka/data
    volumes:
      - kafka-1-data:/var/lib/kafka/data

  kafka-2:
    image: confluentinc/cp-kafka:7.6.0
    container_name: kafka-2
    ports:
      - "9093:9093"
    environment:
      KAFKA_NODE_ID: 2
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka-1:29093,2@kafka-2:29093,3@kafka-3:29093
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:29092,CONTROLLER://0.0.0.0:29093,PLAINTEXT_HOST://0.0.0.0:9093
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-2:29092,PLAINTEXT_HOST://localhost:9093
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
      KAFKA_LOG_DIRS: /var/lib/kafka/data
    volumes:
      - kafka-2-data:/var/lib/kafka/data

  kafka-3:
    image: confluentinc/cp-kafka:7.6.0
    container_name: kafka-3
    ports:
      - "9094:9094"
    environment:
      KAFKA_NODE_ID: 3
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka-1:29093,2@kafka-2:29093,3@kafka-3:29093
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:29092,CONTROLLER://0.0.0.0:29093,PLAINTEXT_HOST://0.0.0.0:9094
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-3:29092,PLAINTEXT_HOST://localhost:9094
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
      KAFKA_LOG_DIRS: /var/lib/kafka/data
    volumes:
      - kafka-3-data:/var/lib/kafka/data
# Adding kafka-UI service start
  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    container_name: kafka-ui
    ports:
      - "8080:8080"
    environment:
      DYNAMIC_CONFIG_ENABLED: 'true'
      KAFKA_CLUSTERS_0_NAME: freecodecamp-cluster
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka-1:29092,kafka-2:29092,kafka-3:29092
    depends_on:
      - kafka-1
      - kafka-2
      - kafka-3
# Adding kafka-UI service end
volumes:
  kafka-1-data:
  kafka-2-data:
  kafka-3-data:
```

The yaml file is pretty much the same as before except that we have added a new service called `kafka-ui` (for better clarity, I have added the changes in between start and end comments).

Key Configurations are:

- **Port 8080**: You can access the UI at `http://localhost:8080` from your machine.
- **KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS**: This environment variable tells Kafka UI where to connect your cluster (using internal Docker addresses).
- **KAFKA_CLUSTERS_0_NAME**: A friendly name for your cluster in the UI.

Let’s first clean up the old cluster while keeping the topic data intact. Go ahead and run the following command to do so:

```sh
docker compose -f docker-compose-basic.yml down
```

Note that we’re not using `-v` here, so volumes (topic data) will remain intact.

Wait for couple seconds and then run the following docker up command to bring up our cluster with Kafka UI:

```sh
docker compose -f docker-compose-basic.yml up -d
```

Now open a browser and visit `http://localhost:8080`. You’ll see the UI like this:

![Kafka UI](https://cdn.hashnode.com/res/hashnode/image/upload/v1767556151144/f0dd2a51-79c5-4906-a32d-d7732f9fd242.png)

You can click around and see all information about the cluster we have created, like:

- Your 3 brokers
- The topics you created earlier
- Partition counts

For comparison with manual commands, let's look at the Brokers tab. You can see the partition leader count for each broker at a glance – remember that we had to run multiple commands to get this information earlier. Beyond this, the UI provides many other useful metrics that would require separate command-line queries.

![Kakfa UI Brokers](https://cdn.hashnode.com/res/hashnode/image/upload/v1767556236480/c99ba704-47b9-42da-b135-e1f9503ee1ab.png)

Remember the CLI commands we had to run to create topics? If you go to the `Topics` tab, you will notice that Topic management (`creation, deletion, data cleanup` and so on) are just a few button clicks.

Similarly, managing Consumers only requires a few button clicks.

After exploring the Kafka UI, you'll see how much easier it is to monitor your cluster compared to running individual CLI commands.

### Drawbacks of Kafka UI

That said, Kafka UI does have some limitations:

- **Automatic rebalancing**: One or few brokers having more partitions that others, you must manually reassign them.
- **Self-healing**: If a broker fails, you have to manually create reassignment plans.
- **Performance optimization**: The UI can’t recommend intelligent partition placement.
- **Alerts**: The UI doesn’t warn you before problems happen.

For small clusters (3 - 10 brokers ), Kafka UI and some command execution might be enough. You’ll be able to see problems clearly and fix them when needed.

For large clusters, manual operations are still not scalable, so we need some kind of a complementary tool…and that tool is **Cruise Control**.

---

## Cruise Control

Cruise Control is an automation engine for Kafka clusters. While Kafka UI gives you visibility and manual control, Cruise Control provides intelligent automation and self-healing. You can think of Kafka UI as a dashboard with manual controls and Cruise Control as an autopilot. In other words, they complement each other.

Let’s try to create some imbalance in our cluster and fix it manually. This will help you learn how to reason through why you need Cruise Control.

To keep things simple, let’s start from scratch. We will first delete all the Docker resources we have created so far by running the following command:

```sh
docker compose -f docker-compose-basic.yml down -v
```

Running `docker-compose down -v` will delete all the topics and messages we created so far, but don’t worry –we’ll create them again.

### How Cruise Control Works

You can think of Cruise Control as a metric-monitoring and action-taking tool. Kafka brokers collect internal metrics (CPU, disk, network traffic, partition sizes), and a metric reporter running inside each broker sends these metrics to a Kafka topic.

Cruise Control then reads from that topic and analyzes the data. Based on that analysis, it proposes partition movements. We’ll see this in action shortly.

### Setting Up Cruise Control

As of this writing, I couldn’t find a compatible Kafka and Cruise Control image that supports `KRaft` (Kafka Consensus Algorithm), so I decided to create Kafka and Cruise Control public images that will help with the tutorial. I don’t recommend using these images in production. For production usage, you should either wait for community to provide an image or create one of your own.

Change the <VPIcon icon="iconfont icon-yaml"/>`docker-compose-basic.yml` file to look like the below:

```yaml :collapsed-lines title="docker-compose-basic.yml"
version: '3.8'

services:
  kafka-1:
    image: justramesh2000/kafka-apache-cc:3.8.1
    container_name: kafka-1
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka-1:29093,2@kafka-2:29093,3@kafka-3:29093
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:29092,CONTROLLER://0.0.0.0:29093,PLAINTEXT_HOST://0.0.0.0:9092
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-1:29092,PLAINTEXT_HOST://localhost:9092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
      KAFKA_LOG_DIRS: /var/lib/kafka/data
      # Cruise Control Metrics Reporter
      KAFKA_METRIC_REPORTERS: 'com.linkedin.kafka.cruisecontrol.metricsreporter.CruiseControlMetricsReporter'
      KAFKA_CRUISE_CONTROL_METRICS_REPORTER_BOOTSTRAP_SERVERS: 'kafka-1:29092,kafka-2:29092,kafka-3:29092'
      KAFKA_CRUISE_CONTROL_METRICS_TOPIC_AUTO_CREATE: 'true'
      KAFKA_CRUISE_CONTROL_METRICS_TOPIC_NUM_PARTITIONS: '1'
      KAFKA_CRUISE_CONTROL_METRICS_TOPIC_REPLICATION_FACTOR: '2'
      KAFKA_CRUISE_CONTROL_METRICS_REPORTER_KUBERNETES_MODE: 'false'
      KAFKA_CRUISE_CONTROL_METRICS_REPORTER_METRICS_REPORTING_INTERVAL_MS: '60000'
    volumes:
      - kafka-1-data:/var/lib/kafka/data

  kafka-2:
    image: justramesh2000/kafka-apache-cc:3.8.1
    container_name: kafka-2
    ports:
      - "9093:9093"
    environment:
      KAFKA_NODE_ID: 2
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka-1:29093,2@kafka-2:29093,3@kafka-3:29093
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:29092,CONTROLLER://0.0.0.0:29093,PLAINTEXT_HOST://0.0.0.0:9093
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-2:29092,PLAINTEXT_HOST://localhost:9093
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
      KAFKA_LOG_DIRS: /var/lib/kafka/data
      KAFKA_METRIC_REPORTERS: com.linkedin.kafka.cruisecontrol.metricsreporter.CruiseControlMetricsReporter
      KAFKA_CRUISE_CONTROL_METRICS_REPORTER_BOOTSTRAP_SERVERS: kafka-1:29092,kafka-2:29092,kafka-3:29092
      KAFKA_CRUISE_CONTROL_METRICS_REPORTER_KUBERNETES_MODE: 'false'
      KAFKA_CRUISE_CONTROL_METRICS_TOPIC: __CruiseControlMetrics
      KAFKA_CRUISE_CONTROL_METRICS_TOPIC_AUTO_CREATE: 'true'
      KAFKA_CRUISE_CONTROL_METRICS_TOPIC_NUM_PARTITIONS: '1'
      KAFKA_CRUISE_CONTROL_METRICS_TOPIC_REPLICATION_FACTOR: '2'
      KAFKA_CRUISE_CONTROL_METRICS_REPORTER_METRICS_REPORTING_INTERVAL_MS: '60000'
    volumes:
      - kafka-2-data:/var/lib/kafka/data

  kafka-3:
    image: justramesh2000/kafka-apache-cc:3.8.1
    container_name: kafka-3
    ports:
      - "9094:9094"
    environment:
      KAFKA_NODE_ID: 3
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka-1:29093,2@kafka-2:29093,3@kafka-3:29093
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:29092,CONTROLLER://0.0.0.0:29093,PLAINTEXT_HOST://0.0.0.0:9094
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka-3:29092,PLAINTEXT_HOST://localhost:9094
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 2
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
      KAFKA_LOG_DIRS: /var/lib/kafka/data
      KAFKA_METRIC_REPORTERS: com.linkedin.kafka.cruisecontrol.metricsreporter.CruiseControlMetricsReporter
      KAFKA_CRUISE_CONTROL_METRICS_REPORTER_BOOTSTRAP_SERVERS: kafka-1:29092,kafka-2:29092,kafka-3:29092
      KAFKA_CRUISE_CONTROL_METRICS_REPORTER_KUBERNETES_MODE: 'false'
      KAFKA_CRUISE_CONTROL_METRICS_TOPIC: __CruiseControlMetrics
      KAFKA_CRUISE_CONTROL_METRICS_TOPIC_AUTO_CREATE: 'true'
      KAFKA_CRUISE_CONTROL_METRICS_TOPIC_NUM_PARTITIONS: '1'
      KAFKA_CRUISE_CONTROL_METRICS_TOPIC_REPLICATION_FACTOR: '2'
      KAFKA_CRUISE_CONTROL_METRICS_REPORTER_METRICS_REPORTING_INTERVAL_MS: '60000'
    volumes:
      - kafka-3-data:/var/lib/kafka/data
  # Adding kafka-UI service start
  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    container_name: kafka-ui
    ports:
      - "8080:8080"
    environment:
      DYNAMIC_CONFIG_ENABLED: 'true'
      KAFKA_CLUSTERS_0_NAME: freecodecamp-cluster
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka-1:29092,kafka-2:29092,kafka-3:29092
    depends_on:
      - kafka-1
      - kafka-2
      - kafka-3
    volumes:
      - ./config:/opt/cruise-control/config  
  # Adding kafka-UI service end
  # Adding cruise-control start
  cruise-control:
    image: justramesh2000/cruise-control-kraft:2.5.142
    container_name: cruise-control
    ports:
      - "9090:9090"
    volumes:
      - ./config/cruisecontrol.properties:/opt/cruise-control/config/cruisecontrol.properties
      - ./config/capacityJBOD.json:/opt/cruise-control/config/capacityJBOD.json:ro
      - ./config/log4j.properties:/opt/cruise-control/config/log4j.properties:ro
    depends_on:
      - kafka-1
      - kafka-2
      - kafka-3
   # Adding cruise-control end    
volumes:
  kafka-1-data:
  kafka-2-data:
  kafka-3-data:
```

You should have made the following changes to the file:

- Changed Kafka image from `confluentinc/cp-kafka:7.6.0` to `justramesh2000/kafka-apache-cc:3.8.1`. The new image contains the Cruise Control metrics exporter which will export metrics data from Kafka brokers to be used by Cruise Control.
- Added the following environment variables:
  - **KAFKA_METRIC_REPORTERS**: This variable tells Kafka to load a plugin called the `Cruise Control Metrics Reporter`. It runs inside each Kafka broker process, and hooks into Kafka’s internal metrics system. This helps with data collection.
  - **KAFKA_CRUISE_CONTROL_METRICS_REPORTER_BOOTSTRAP_SERVERS**: This tells the `Cruise Control Metrics Reporter` where to send metrics to, meaning which Kafka brokers and which port.
  - **KAFKA_CRUISE_CONTROL_METRICS_REPORTER_KUBERNETES_MODE**: This disables specific Kubernetes behaviors (Pod name, id instead of Host). We are using Docker, so we don’t need K8s behaviors.
  - **KAFKA_CRUISE_CONTROL_METRICS_TOPIC**: Specifies the name of the topic where metrics will be published. Default is `__CruiseControlMetrics` but you can customize using this variable if you want to.
  - **KAFKA_CRUISE_CONTROL_METRICS_TOPIC_AUTO_CREATE**: Automatically creates a `__CruiseControlMetrics` topic if it doesn’t exist. Without this metric, the reporter will fail reporting until you manually create this topic.
  - **KAFKA_CRUISE_CONTROL_METRICS_TOPIC_NUM_PARTITIONS**: Defines the number of partitions for the topic `__CruiseControlMetrics`.
  - **KAFKA_CRUISE_CONTROL_METRICS_TOPIC_REPLICATION_FACTOR**: Tells Kafka how many copies of metrics data to keep. In our case, we’re keeping 2 copies of the data.
  - **KAFKA_CRUISE_CONTROL_METRICS_REPORTER_METRICS_REPORTING_INTERVAL_MS**: Tells Kafka how often to send metrics. We’re sending every minute.
- Added Cruise-control service using image `justramesh2000/cruise-control-kraft:2.5.142`. For clarity, I have kept this change between the `start` and `end` comments.
- Under cruise control, we’ve mounted `three` Cruise Control configurations files. We’ll talk about those files next.

### Cruise Control Configuration File

To run Cruise Control, we need to provide several configuration files. Among the key pieces of information are:

- Where the Kafka cluster is located
- The capacity of each broker

Create a config directory and add the following files:

```sh
mkdir config
```

#### cruisecontrol.properties

This is Cruise Control’s main configuration file.

Save the following content as `cruisecontrol.properties` in the config directory:

```sh :collapsed-lines title="cruisecontrol.properties"
# Kafka cluster. Tells how to connect to brokers
bootstrap.servers=kafka-1:29092,kafka-2:29092,kafka-3:29092

# Topic from which metrics are to be read
metric.reporter.topic=__CruiseControlMetrics

# Aggregated partition data
partition.metric.sample.store.topic=__KafkaCruiseControlPartitionMetricSamples

#Aggregated broker data
broker.metric.sample.store.topic=__KafkaCruiseControlModelTrainingSamples

# Enable broker failure detection for KRaft mode (no ZooKeeper)
kafka.broker.failure.detection.enable=true

# Capacity. Tells where the capacity file is 
capacity.config.file=config/capacityJBOD.json

# Goals. What to optimize for during cluster balancing. These are the riles for CC to abide to during rebalancing
default.goals=com.linkedin.kafka.cruisecontrol.analyzer.goals.RackAwareGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.ReplicaCapacityGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.DiskCapacityGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.NetworkInboundCapacityGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.NetworkOutboundCapacityGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.CpuCapacityGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.ReplicaDistributionGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.DiskUsageDistributionGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.LeaderReplicaDistributionGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.LeaderBytesInDistributionGoal

# hard goals. 
hard.goals=com.linkedin.kafka.cruisecontrol.analyzer.goals.RackAwareGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.ReplicaCapacityGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.DiskCapacityGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.NetworkInboundCapacityGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.NetworkOutboundCapacityGoal,\
com.linkedin.kafka.cruisecontrol.analyzer.goals.CpuCapacityGoal

# Webserver. For WebApi access
webserver.http.port=9090
webserver.http.address=0.0.0.0

# Execution
num.broker.metrics.windows=1
num.partition.metrics.windows=1
```

I’ve added in line comments to explain much of the above configuration, but I think the `Goals` need special attention. These are the rules that we as users have set for Cruise Control to abide by.

By defining goals, we tell Cruise Control to do the following:

- `RackAwareGoal` – Spread replicas across racks (or in our case, brokers)
- `ReplicaCapacityGoal` – Don't overload brokers with too many replicas
- `DiskCapacityGoal` – Don't fill up disk
- `NetworkInboundCapacityGoal` – Balance incoming network traffic
- `NetworkOutboundCapacityGoal` – Balance outgoing network traffic
- `CpuCapacityGoal` – Balance CPU usage
- `ReplicaDistributionGoal` – Evenly distribute replicas
- `DiskUsageDistributionGoal` – Ensure even disk usage across brokers
- `LeaderReplicaDistributionGoal` – Evenly distribute leader replicas
- `LeaderBytesInDistributionGoal` – Balance data flowing to leaders

Via Cruise Control configuration, you can define two types of goals: `Default goals` and `Hard goals`. Hard goals must be met. Default goals that aren’t part of the hard goals become soft goals. This means that Cruise Control will give its best effort to satisfy them but won’t reject a proposal if it can’t.

Here’s a little summary:

| Type | Meaning | What CC Does |
| --- | --- | --- |
| **Hard Goals** | Must-haves (capacity limits) | **Never violates**: rejects proposal if can't satisfy |
| **Soft Goals** | Nice-to-haves (better balance) | **Tries to satisfy**: skips if conflicts with hard goals |
| **Default Goals** | Hard + Soft together | **Optimizes for all**: prioritizes hard over soft |

Cruise control collects metrics for a defined period (default: 5 minutes) and creates a monitoring window. The following settings control how many windows Cruise Control needs before it’s ready to generate proposals (shortly, we will see what proposals are):

- `num.broker.metrics.windows=1`: Wait for 1 monitoring window before generating proposals. Each window in Cruise Control is 5 minutes by default. This means that Cruise Control will be ready after 5 minutes. I’ve set this to 1 for quick testing. The recommendation is to use a large window in production to avoid false proposals from temporary spikes.
- `num.partition.metrics.windows=1`: Wait for 1 window of partition metrics. Same reasoning as above.

#### Capacity

This informs cruise control about the capacity (CPU, DISK) of each broker, which then helps it to make decisions. Using the below file, we’re telling Cruise Control the following:

- What are the brokerIds
- What is the disk path `/var/lib/kafka/data` and disk capacity (`100000000` MB = 100 GB). This is used by `DiskCapacityGoal` that we set up in the above `cruisecontrol.properties` file.
- What is the CPU 100% (1 Core). Used by `CpuCapacityGoal`.
- What is the `NW_IN` Network Inbound Capacity (125,000 KB/s = 1 MB/s –Megabytes per second) = 1 Gbps – Giga `bits` per second. Used by `NetworkInboundCapacityGoal`.
- What is the `NW_OUT` Network Outbound Capacity (125,000 KB/s). Used by `NetworkOutboundCapacityGoal`

Save the following content as <VPIcon icon="iconfont icon-json"/>`capacityJBOD.json` in the config directory:

```json title="capacityJBOD.json"
{
  "brokerCapacities":[
    {
      "brokerId": "1",
      "capacity": {
        "DISK": {"/var/lib/kafka/data": "100000000"},
        "CPU": "100",
        "NW_IN": "125000",
        "NW_OUT": "125000"
      }
    },
    {
      "brokerId": "2",
      "capacity": {
        "DISK": {"/var/lib/kafka/data": "100000000"},
        "CPU": "100",
        "NW_IN": "125000",
        "NW_OUT": "125000"
      }
    },
    {
      "brokerId": "3",
      "capacity": {
        "DISK": {"/var/lib/kafka/data": "100000000"},
        "CPU": "100",
        "NW_IN": "125000",
        "NW_OUT": "125000"
      }
    }
  ]
}
```

#### Logging

This is not important for Cruise Control to work properly, but it’ll help you debug if there are issues. Save the following content as <VPIcon icon="fas fa-file-lines"/>`log4j.properties` in the config directory. When you execute commands to start Cruise Control and If you see unexpected behaviors like container exiting, you can use the `docker logs` command to see what happened.

```sh title="log4j.properties"
# Root logger - INFO level, output to console
rootLogger.level=INFO
appenders=console

# Console output (for docker logs)
appender.console.type=Console
appender.console.name=STDOUT
appender.console.layout.type=PatternLayout
appender.console.layout.pattern=[%d] %p %m (%c)%n

# Send root logger to console
rootLogger.appenderRef.console.ref=STDOUT
```

Now that we have all the configurations in place, let’s run the following command to start Kafka brokers with Kafka UI and Cruise Control:

```sh
docker compose -f docker-compose-basic.yml up -d
```

Using the following command, verify that the three Kafka brokers, Kafka UI, and Cruise Control containers are running:

```sh
docker ps
```

You should see something like this:

![Docker running containers](https://cdn.hashnode.com/res/hashnode/image/upload/v1768085885265/b196c5ce-77b3-4563-b72a-20c6de7123f0.png)

Now that we have Cruise Control up and running, let’s create some Imbalance and see how much better of an experience we get by using Cruise Control versus mitigating the imbalance manually.

### Creating the Imbalance

An imbalance is a scenario where some brokers are handling more messages than others – and they may run into high disk usage or high IOPS.

To create the imbalance in our cluster, we’ll have to create a few topics and then produce messages unevenly. Now that you have Kafka UI running, you can create topics using that method or you can create topics using commands. I’m going to use the commands because it’ll be easier for you to reproduce my work (but I recommend UI for production operations because it prevents typos).

If you also decide to use commands, run the following command. Then using UI, verify that the topics have been created.

Note: You’ll find that the commands are different from previous commands. This is because, previously in our <VPIcon icon="iconfont icon-yaml"/>`docker-compose-basic.yml` file, we were using the `confluentinc/cp-kafka:7.6.0` image for Kafka. But now we’re using the `justramesh2000/kafka-apache-cc:3.8.1 title="docker-compose-basic.yml` file, w"` image which is based off of the `apache/kafka:3.8.1` image. For different images, the tools are located at different places, so the command needs to be adjusted to account for that.

```sh
docker exec -it kafka-1 bash -c '
/opt/kafka/bin/kafka-topics.sh --create \
  --topic freecodecamp-logs \
  --bootstrap-server kafka-1:29092 \
  --partitions 12 \
  --replication-factor 2 \
  --config retention.ms=604800000 \
  --config compression.type=snappy

/opt/kafka/bin/kafka-topics.sh --create \
  --topic freecodecamp-views \
  --bootstrap-server kafka-1:29092 \
  --partitions 20 \
  --replication-factor 2 \
  --config retention.ms=604800000 \
  --config compression.type=snappy

/opt/kafka/bin/kafka-topics.sh --create \
  --topic freecodecamp-analytics \
  --bootstrap-server kafka-1:29092 \
  --partitions 3 \
  --replication-factor 2 \
  --config retention.ms=604800000 \
  --config compression.type=snappy

/opt/kafka/bin/kafka-topics.sh --create \
  --topic freecodecamp-articles \
  --bootstrap-server kafka-1:29092 \
  --partitions 5 \
  --replication-factor 2 \
  --config retention.ms=604800000 \
  --config compression.type=snappy
'
```

Run the following command to produce uneven messages on different topics we created above.

Heavy Load on `freecodecamp-logs`:

```sh
docker exec -it kafka-1 bash -c "
for i in {1..100000}; do 
  echo '{\"log_id\":\"'\$i'\",\"level\":\"INFO\",\"message\":\"Log entry '\$i'\"}'
done | /opt/kafka/bin/kafka-console-producer.sh --topic freecodecamp-logs --bootstrap-server kafka-1:29092"
```

Heavy load on `freecodecamp-views`:

```sh
docker exec -it kafka-1 bash -c "
for i in {1..80000}; do 
  echo '{\"view_id\":\"'\$i'\",\"page\":\"/article/'\$((i % 100))'\",\"user\":\"user_'\$((i % 1000))'\"}'
done | /opt/kafka/bin/kafka-console-producer.sh --topic freecodecamp-views --bootstrap-server kafka-1:29092"
```

Moderate load on `freecodecamp-analytics`:

```sh
docker exec -it kafka-1 bash -c "
for i in {1..30000}; do 
  echo '{\"event\":\"page_view\",\"user\":\"user_'\$i'\"}'
done | /opt/kafka/bin/kafka-console-producer.sh --topic freecodecamp-analytics --bootstrap-server kafka-1:29092"
```

Now, produce a message with a `fixed key` to force all data into one Partition. This is a fast way to create strong disk imbalance. Run the following command:

```sh
docker exec -it kafka-1 bash -c "
for i in {1..300000}; do
  echo 'hotkey:{\"log_id\":'\$i',\"msg\":\"big payload\"}'
done | /opt/kafka/bin/kafka-console-producer.sh \
  --topic freecodecamp-logs \
  --bootstrap-server kafka-1:29092 \
  --property parse.key=true \
  --property key.separator=:"
```

After running the above commands, come back to the UI, refresh, and you will see a number of messages like this:

![Kafka Topics with Message Count](https://cdn.hashnode.com/res/hashnode/image/upload/v1768088817389/13c285b2-308a-4e6c-80f1-4de774f34662.png)

Now, go to brokers tab and see the imbalance in Disk Usage:

![Kafka Brokers Disk usage](https://cdn.hashnode.com/res/hashnode/image/upload/v1768088880398/5e615012-a35f-4820-8daa-b46746b65b56.png)

You should be able to see that **Broker-2 has only about 47% of the data that Broker-1 has**, and **Broker-3 has about 11% more data than Broker-1**. Broker-2 is significantly underutilized, while Broker-1 and Broker-3 hold most of the data.

### Attempting Manual Rebalancing

**Step 1**: First, we need to find out which topic is heavy – meaning which one handles more data. My setup shows the `freecodecamp-logs` topic with 8MB of data:

![Kafka Topics with Message Count](https://cdn.hashnode.com/res/hashnode/image/upload/v1768089339438/e57c1b10-ebac-4824-ad0d-1c8d3ec6ff71.png)

**Step 2**: Let’s see where the heavy partitions are.

Click on **freecodecamp-logs** in Kafka UI and see the partition table. Look at the message count: partition 4 is bigger than the others. The table also gives information about replicas of partitions: partition 4 has replicas on Broker 1 and 3. Broker 2 doesn’t have partition 4 at all. This explains why Broker 2 was underutilized.

![Kafka Topic Partitions](https://cdn.hashnode.com/res/hashnode/image/upload/v1768089513001/8993d5ce-c70f-45e3-b643-b8a759dda138.png)

**Step 3:** To balance the cluster, we need to move partition 4 around.

We can move partition 4 to Broker 2. But before that, let’s do some math to be able to rationalize our decision. Note that the calculation doesn’t have to be precise – we just want a relative sense of data between brokers.

Current state:

- **Broker 1**: 4.55 MB
- **Broker 2**: 2.29 MB (underutilized)
- **Broker 3**: 5.11 MB (over-utilized)

Note that roughly the compressed data size for partition 4 is 2.25 MB (exact size is not critical).

If we move partition 4 from \[1,3\] to \[2,3\]:

- **Broker 1:** Loses partition 4, so 4.55 + 2.25 = **~2.3 MB**
- **Broker 2:** Gains Partition 4, so 2.33 + 2.25 = ~**4.58 MB**
- **Broker 3:** Already has partition 4, so = **5.11 MB (no change)**

The result is that Broker 1 becomes underutilized.

How about if we move partition 4 from \[1,3\] to \[1,2\]?

- **Broker 1:** Already has partition 4 = **4.55 MB (no change)**
- **Broker 2:** Gains Partition 4, so 2.33 + 2.25 = ~**4.58 MB**
- **Broker 3:** Loses partition 4, so 5.11 + 2.25 = ~**2.8 MB**

Hmm, this still creates an imbalance (broker 3 becomes too light).

So basically, manual rebalancing requires complex calculations. Moving a single partition impacts disk usage, leader distribution, and network traffic across multiple brokers. One poorly planned move can create a new imbalance elsewhere.

But, let’s say you somehow landed on a perfect mathematical calculation and you’re ready to make the move to balance. We’ll assume that the perfect plan is to move Partition 4 from [1, 3] to [2, 3]. I know it’s not the perfect move but the point is to see the pain afterwards.

**Step 4**: it’s time to move the partition manually.

We need to tell Kafka to move partition 4's replicas from brokers \[1,3\] to brokers \[2,3\].

To do that, you need create a file called <VPIcon icon="iconfont icon-json"/>`reassignment.json` on your machine:

```json title="reassignment.json"
{
  "version": 1,
  "partitions": [
    {
      "topic": "freecodecamp-logs",
      "partition": 4,
      "replicas": [2, 3],
      "log_dirs": ["any", "any"]
    }
  ]
}
```

::: info What this means

- `"partition": 4`: Target Partition
- `"replicas": [2, 3]`: New placement: brokers 2 and 3
- `"log_dirs": ["any", "any"]`: Let Kafka choose the disk directory

:::

Save this file somewhere accessible.

Then run the following command to copy the JSON to the Kafka cluster:

```sh
docker cp reassignment.json kafka-1:/tmp/reassignment.json
```

This copies your local file into the kafka-1 container's /tmp directory.

Run following command to verify the file is there:

```sh
docker exec -it kafka-1 cat /tmp/reassignment.json
```

You should see your JSON file content.

Now run the actual reassignment command:

```sh
docker exec -it kafka-1 \
/opt/kafka/bin/kafka-reassign-partitions.sh \
--bootstrap-server kafka-1:29092,kafka-2:29092,kafka-3:29092 \
--reassignment-json-file /tmp/reassignment.json \
--execute
```

You will get a message from Kafka that will tell you if Kafka has accepted the reassignment and started moving the data.

You can monitor the reassignment using the following command:

```sh
docker exec -it kafka-1 \
/opt/kafka/bin/kafka-reassign-partitions.sh \
--bootstrap-server kafka-1:29092,kafka-2:29092,kafka-3:29092 \
--reassignment-json-file /tmp/reassignment.json \
--verify
```

I’m not going to run the manual reassignment because I want to keep the imbalance and show how Cruise Control can help reduce the manual steps. Next, let’s see how Cruise Control handles the same imbalance automatically.

### Rebalancing Using Cruise Control

After creating the topic and messages, I have let Cruise Control run for a couple minutes. During that time, it collected metrics and trained its linear regression model. You can run the following command to verify if Cruise Control is running fine and it has data (following is a REST API call using curl):

```sh
curl http://localhost:9090/kafkacruisecontrol/state
```

You will get multiple JSON object outputs as part of the response. Each JSON object holds some information about the state of Cruise Control and the Kafka cluster. Let’s see each of these one at a time:

```json
MonitorState: {
  state: RUNNING(20.000% trained),
  NumValidWindows: (1/1) (100.000%),
  NumValidPartitions: 105/105 (100.000%),
  flawedPartitions: 0
}
```

This tells about the state of monitoring based on data collected by Cruise Control:

- `state: RUNNING(20.000% trained)` – Cruise Control is **actively collecting metrics** from your Kafka cluster. Right now it has **trained its model on 20% of the expected monitoring data**.
- `NumValidWindows: (1/1) (100%)` – Cruise Control has collected 1 complete monitoring window out of 1 required (100% ready). Remember, we had set `num.broker.metrics.windows=1` in the `cruisecontrol.properties` configuration file.
- `NumValidPartitions: 105/105 (100%)` – Cruise Control analyzed all 105 partitions and has metrics for **all.**
- `flawedPartitions: 0` – None of the partitions have problematic or missing metrics.

```json
ExecutorState: {state: NO_TASK_IN_PROGRESS}
```

The above response indicates the execution engine is idle – no partition moves or leadership changes are currently in progress. This makes sense since we haven't asked Cruise Control to do anything yet.

```json
AnalyzerState: {
  isProposalReady: true,
  readyGoals: [
    NetworkInboundCapacityGoal,
    LeaderBytesInDistributionGoal,
    DiskCapacityGoal,
    ReplicaDistributionGoal,
    RackAwareGoal,
    NetworkOutboundCapacityGoal,
    CpuCapacityGoal,
    DiskUsageDistributionGoal,
    LeaderReplicaDistributionGoal,
    ReplicaCapacityGoal
  ]
}
```

AnalyzerState tells whether Cruise Control is ready to show a proposal or not. In this case it’s ready.

- `isProposalReady: true` – Cruise Control has **calculated a potential rebalancing plan** (a proposal) that satisfies the configured goals.
- `readyGoals` – These are the goals that are considered **ready and valid** for rebalancing. Examples:
  - `DiskCapacityGoal`: balance disk usage among brokers
  - `ReplicaDistributionGoal`: balance number of replicas per broker
  - `RackAwareGoal`: maintain replicas across racks for fault tolerance
  - `LeaderBytesInDistributionGoal`: balance network traffic from leaders
  - `DiskUsageDistributionGoal`: ensures partitions are spread to prevent skew

::: note

Note that these are the goals we had set earlier in the <VPIcon icon="fas fa-file-lines"/>`cruisecontrol.properties` file.

:::

```json
AnomalyDetectorState: {
  selfHealingEnabled:[],
  selfHealingDisabled:[BROKER_FAILURE, DISK_FAILURE, GOAL_VIOLATION, METRIC_ANOMALY, TOPIC_ANOMALY, MAINTENANCE_EVENT],
  selfHealingEnabledRatio:{...},
  recentGoalViolations:[],
  recentBrokerFailures:[],
  recentMetricAnomalies:[],
  recentDiskFailures:[],
  recentTopicAnomalies:[],
  recentMaintenanceEvents:[],
  metrics:{...},
  ongoingSelfHealingAnomaly:None,
  balancednessScore:100.000
}
```

Anomaly detection shows information about any existing anomaly and healing properties.

- `selfHealingEnabled: []` – Automatic self-healing is **currently off**. Cruise Control will **not move partitions automatically** in response to anomalies.
- `selfHealingDisabled: [...]` – Lists the anomaly types that are **disabled for automatic self-healing**, including broker failures, disk failures, and goal violations.
- `recentGoalViolations: []` – No goals have been violated recently.
- `balancednessScore: 100.000` – This is **how balanced the cluster is according to Cruise Control’s hard goals**. 100% means the cluster is perfectly balanced according to the metrics and hard goals currently active. This metric only cares about Hard Goals (Disk Capacity, CPU capacity) being violated – that’s why it shows 100% even though we know there are some disk usage imbalances in our cluster.

#### The Proposal

Via AnalyzerState information, Cruise Control told us that it has a proposal for the cluster. Let’s see what it is. We can fetch the proposal using the proposal end point:

```sh
curl -s "http://localhost:9090/kafkacruisecontrol/proposals?json=true"
```

The JSON response is quite large. Let's focus on the key parts that show our cluster's imbalance and how Cruise Control plans to fix it:

```json
{
  "summary": {
    "numReplicaMovements": 13,    // CC wants to move 13 partition replicas
    "numLeaderMovements": 6,      // And reassign 6 partition leaders
    "onDemandBalancednessScoreBefore": 84.67,   // Current: 84.67% balanced
    "onDemandBalancednessScoreAfter": 89.76.   // After: 89.76% balanced
  },
  "goalSummary": [
    {
      "goal": "DiskUsageDistributionGoal",
      "status": "VIOLATED"
    },
    {
      "goal": "LeaderBytesInDistributionGoal",
      "status": "VIOLATED"
    }
  ]
}
```

Based on the calculations, Cruise Control thinks:

1. Moving 13 partition replicas will help. Note that manually we decided to move just 1 partition, that is partition 4.
2. Reassigning 6 partition leaders will help. Manually we didn’t account for any leadership reassignment.
3. `DiskUsageDistributionGoal` has been violated. We know that the disk usage is not distributed perfectly.
4. `LeaderBytesInDistributionGoal` has also been violated. We couldn’t find this out manually. Technically, you could find out but it would take a decent amount of manual calculations and would still be error-prone.

::: note

While we're focusing on disk usage imbalance, Cruise Control optimizes for 10 different goals (disk, CPU, network, leaders, and so on). This holistic approach gives it a better chance of achieving true cluster balance versus balancing manually.

:::

#### Executing the proposal

Let’s run the actual rebalancing using Cruise Control. The command is:

```sh
curl -X POST 'http://localhost:9090/kafkacruisecontrol/rebalance?dryrun=false&json=true'
```

Again, you’ll get a huge JSON file similar to the proposal.

You can track the status using following API call:

```sh
curl "http://localhost:9090/kafkacruisecontrol/user_tasks"
```

You will get something like this:

![Cruise Control Tasks](https://cdn.hashnode.com/res/hashnode/image/upload/v1768095347466/64131c47-5884-4894-95df-d46e9eb8cd97.png)

Note that the 4th item in the list is our rebalance API call and it’s complete. This was quick for our small Dev cluster, but in large clusters you may see status as `InExecution`.

Let’s look at the UI to see what is the state of Imbalance now that Cruise Control has completed its execution of the proposal. The UI shows the following for me:

![Kafka balanced Disk Usage](https://cdn.hashnode.com/res/hashnode/image/upload/v1768095510743/16db64f7-d14b-4120-95c9-ac9b1d43f47e.png)

#### Comparison

::: tabs

@tab:active Before rebalancing

- Broker 1: 4.52 MB, 69 partitions, 35 leaders
- Broker 2: 2.22 MB, 69 partitions, 35 leaders (**underutilized**)
- Broker 3: 5.05 MB, 72 partitions, 35 leaders (**overutilized**)
- **Disk range:** 2.83 MB (5.05 - 2.22)

@tab After rebalancing:

- Broker 1: 4.66 MB, 69 partitions, 38 leaders
- Broker 2: 3.87 MB, 77 partitions, 31 leaders
- Broker 3: 4.87 MB, 64 partitions, 36 leaders
- **Disk range:** 1.00 MB (4.87 - 3.87)

:::

Results:

- **Disk usage balanced**: Range reduced from 2.83 MB to 1.00 MB (64% improvement!)
- **Replicas redistributed**: Broker 2 gained 8 replicas, Broker 3 lost 8 replicas
- **Leaders balanced**: Changed from 35-35-35 to 38-31-36. Cruise Control prioritized balancing actual network traffic over leader count.

The cluster is now more balanced across all metrics. Congrats!

---

## Conclusion

We covered a lot in this tutorial, so let’s take a step back and look at what we did.

You started by experiencing the reality of manual Kafka management – the endless CLI commands, the tedious calculations, the JSON files, and the potential for costly mistakes. If you felt frustrated during that section, that’s to be expected. That frustration is exactly what thousands of engineering teams deal with every day.

Then you were presented with two complementary tools:

1. **Kafka UI** gave you visibility. No more grepping through command outputs or manually counting partition leaders. Everything you need, broker health, topic configurations, consumer lag is right there in a clean web interface. For small teams and development environments, this alone is a game-changer.
2. **Cruise Control** gave you intelligence. It didn't just automate what you'd do manually – it also did a fundamentally better job. While you were focused on moving one partition (partition 4), Cruise Control analyzed all 105 partitions across 10 different optimization goals and proposed a comprehensive rebalancing plan. That's the difference between human effort and automated intelligence.

I want to call out that this tutorial used a simplified setup. For production, you’ll expect complex configurations like”

- Kafka and Cruise Control running on separate machines
- Larger monitoring window for Cruise Control
- Some self healing capabilities enabled

If there's one thing you take away from this article, let it be this: you should stop managing your Kafka cluster manually. You've seen there's a better way. Use it. Thanks for reading!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Why You Should Stop Managing Kafka Manually – A Guide to Kafka UI and Cruise Control",
  "desc": "Over 80% of Fortune 100 companies use Apache Kafka. That's not surprising, as Kafka has revolutionized how we build real-time data pipelines and streaming applications. If you're working in software engineering today, chances are you've encountered K...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/stop-managing-kafka-manually-a-guide-to-kafka-ui-and-cruise-control/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
